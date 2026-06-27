import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  let admin
  try { admin = await requireAdmin() }
  catch { return NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }

  try {
    const body = await req.json().catch(async () => {
      const text = await req.text()
      const params = new URLSearchParams(text)
      return Object.fromEntries(params)
    })

    const { userId, action } = body
    if (!userId || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const newStatus = action === 'approve' ? 'verified' : 'rejected'
    const newLevel = action === 'approve' ? 2 : 0

    db.prepare(
      'UPDATE users SET kyc_status = ?, kyc_level = ?, updated_at = ? WHERE id = ?'
    ).run(newStatus, newLevel, Math.floor(Date.now() / 1000), userId)

    db.prepare(`
      INSERT INTO admin_logs (id, admin_id, action, target_type, target_id, details)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(nanoid(), admin.id, `kyc_${action}`, 'user', userId, JSON.stringify({ action }))

    if (action === 'approve') {
      db.prepare(`
        INSERT INTO notifications (id, user_id, type, title, message)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        nanoid(), userId, 'kyc_approved',
        'Identity verified!',
        'Your identity has been verified. You can now send money up to £5,000 per day.'
      )
    }

    return NextResponse.redirect(new URL('/admin/kyc', req.url))
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
