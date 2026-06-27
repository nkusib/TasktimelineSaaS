import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { disburseMobilePayment, type MobileMoneyProvider } from '@/lib/mobile-money'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  let user
  try { user = await requireAuth() }
  catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }

  const { transactionId, provider, mobileNumber, country } = await req.json()

  if (!transactionId || !provider || !mobileNumber) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const txn = db.prepare(
    'SELECT * FROM transactions WHERE id = ? AND user_id = ?'
  ).get(transactionId, user.id) as any

  if (!txn) return NextResponse.json({ error: 'Transaction not found' }, { status: 404 })
  if (txn.status !== 'processing') {
    return NextResponse.json({ error: 'Transaction not in processing state' }, { status: 400 })
  }

  try {
    const result = await disburseMobilePayment(
      provider as MobileMoneyProvider,
      txn.receive_amount,
      txn.receive_currency,
      mobileNumber,
      country ?? txn.recipient_country,
      txn.reference
    )

    if (result.status === 'SUCCESSFUL') {
      db.prepare(
        'UPDATE transactions SET status = ?, provider_reference = ?, completed_at = ?, updated_at = ? WHERE id = ?'
      ).run('completed', result.transactionId, Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000), transactionId)
    }

    return NextResponse.json({ result, transactionId })
  } catch (err) {
    console.error('[MoMo disburse error]', err)
    return NextResponse.json({ error: 'Payment provider error' }, { status: 502 })
  }
}
