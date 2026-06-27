import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { nanoid } from 'nanoid'

export async function GET() {
  const user = await getSession()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const txns = db.prepare(
    'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 50'
  ).all(user.id)

  return NextResponse.json(txns)
}

export async function POST(req: NextRequest) {
  const user = await getSession()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const {
      sendAmount, sendCurrency, receiveAmount, receiveCurrency,
      exchangeRate, fee, totalAmount, paymentMethod, deliveryMethod,
      recipientName, recipientCountry, recipientDetails,
    } = body

    if (!sendAmount || !sendCurrency || !receiveAmount || !receiveCurrency) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (sendAmount <= 0 || receiveAmount <= 0) {
      return NextResponse.json({ error: 'Invalid amounts' }, { status: 400 })
    }

    const id = nanoid()
    const reference = `RF${Date.now().toString(36).toUpperCase()}`

    const estimatedDelivery = deliveryMethod === 'mobile_money'
      ? 'Under 30 minutes'
      : '1-2 business hours'

    db.prepare(`
      INSERT INTO transactions (
        id, user_id, type, status, send_amount, send_currency,
        receive_amount, receive_currency, exchange_rate, fee, total_amount,
        payment_method, delivery_method, recipient_name, recipient_country,
        recipient_details, reference, estimated_delivery
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, user.id, 'send', 'processing',
      sendAmount, sendCurrency,
      receiveAmount, receiveCurrency,
      exchangeRate, fee, totalAmount,
      paymentMethod, deliveryMethod,
      recipientName, recipientCountry,
      recipientDetails, reference, estimatedDelivery
    )

    // Simulate async completion (in production, use a webhook from payment processor)
    setTimeout(() => {
      try {
        db.prepare(
          'UPDATE transactions SET status = ?, completed_at = ?, updated_at = ? WHERE id = ?'
        ).run('completed', Math.floor(Date.now() / 1000), Math.floor(Date.now() / 1000), id)

        db.prepare(`
          INSERT INTO notifications (id, user_id, type, title, message)
          VALUES (?, ?, ?, ?, ?)
        `).run(
          nanoid(), user.id, 'transfer_complete',
          'Transfer completed!',
          `Your transfer of ${sendCurrency} ${sendAmount} to ${recipientName} is complete.`
        )
      } catch {}
    }, 15000)

    return NextResponse.json({ id, reference, status: 'processing' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
