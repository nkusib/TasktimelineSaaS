import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { createToken, setSessionCookie } from '@/lib/auth'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  try {
    const { email, name, password, phone, country } = await req.json()

    if (!email || !name || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase())
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    const id = nanoid()
    const hash = await bcrypt.hash(password, 10)

    db.prepare(
      'INSERT INTO users (id, email, name, password_hash, phone, country) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(id, email.toLowerCase().trim(), name.trim(), hash, phone || null, country || 'GB')

    // Create default wallets based on country
    const currencyMap: Record<string, string> = {
      GB: 'GBP', DE: 'EUR', FR: 'EUR', BE: 'EUR', NL: 'EUR',
      ES: 'EUR', IT: 'EUR', US: 'USD', NG: 'NGN', KE: 'KES',
      GH: 'GHS', ZA: 'ZAR', TZ: 'TZS',
    }
    const primaryCurrency = currencyMap[country || 'GB'] || 'GBP'
    db.prepare(
      'INSERT INTO wallets (id, user_id, currency, balance, is_primary) VALUES (?, ?, ?, ?, ?)'
    ).run(nanoid(), id, primaryCurrency, 0, 1)

    // Also add USD wallet
    if (primaryCurrency !== 'USD') {
      db.prepare(
        'INSERT INTO wallets (id, user_id, currency, balance, is_primary) VALUES (?, ?, ?, ?, ?)'
      ).run(nanoid(), id, 'USD', 0, 0)
    }

    const token = await createToken(id)
    const res = NextResponse.json({ ok: true, role: 'user' })
    res.cookies.set(setSessionCookie(token))
    return res
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
