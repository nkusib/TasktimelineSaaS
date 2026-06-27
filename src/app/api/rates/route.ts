import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  if (from && to) {
    const rate = db.prepare(
      'SELECT * FROM exchange_rates WHERE from_currency = ? AND to_currency = ?'
    ).get(from.toUpperCase(), to.toUpperCase())

    if (!rate) return NextResponse.json({ error: 'Rate not found' }, { status: 404 })
    return NextResponse.json(rate)
  }

  const rates = db.prepare('SELECT * FROM exchange_rates ORDER BY from_currency, to_currency').all()
  return NextResponse.json(rates)
}
