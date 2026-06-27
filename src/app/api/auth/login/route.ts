import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { createToken, setSessionCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const user = db.prepare(
      'SELECT id, email, password_hash, role, is_active FROM users WHERE email = ?'
    ).get(email.toLowerCase().trim()) as {
      id: string; email: string; password_hash: string; role: string; is_active: number
    } | undefined

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    if (!user.is_active) {
      return NextResponse.json({ error: 'Account suspended. Contact support.' }, { status: 403 })
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = await createToken(user.id)
    const res = NextResponse.json({ ok: true, role: user.role })
    res.cookies.set(setSessionCookie(token))
    return res
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
