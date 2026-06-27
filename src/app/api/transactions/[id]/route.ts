import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSession()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const txn = db.prepare(
    'SELECT * FROM transactions WHERE id = ? AND user_id = ?'
  ).get(id, user.id)

  if (!txn) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(txn)
}
