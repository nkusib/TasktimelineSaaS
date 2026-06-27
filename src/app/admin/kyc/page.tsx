import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import Link from 'next/link'
import { ArrowLeft, AlertCircle } from 'lucide-react'

export default async function AdminKycPage() {
  try { await requireAdmin() }
  catch { redirect('/auth/login') }

  const pendingUsers = db.prepare(
    "SELECT * FROM users WHERE kyc_status = 'pending' ORDER BY created_at DESC"
  ).all() as any[]

  const allKycUsers = db.prepare(
    "SELECT * FROM users WHERE kyc_status != 'unverified' ORDER BY created_at DESC"
  ).all() as any[]

  const kycColors: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/admin" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-gray-900">KYC Review</span>
          </div>
          {pendingUsers.length > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
              {pendingUsers.length} pending
            </span>
          )}
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {pendingUsers.length > 0 && (
          <div>
            <h2 className="font-bold text-gray-900 mb-3">Awaiting Review</h2>
            <div className="space-y-3">
              {pendingUsers.map((u: any) => (
                <div key={u.id} className="bg-white rounded-2xl p-5 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{u.name}</div>
                        <div className="text-sm text-gray-500">{u.email}</div>
                        <div className="text-xs text-gray-400">{u.country} · Joined {new Date(u.created_at * 1000).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <form action="/api/admin/kyc" method="POST">
                        <input type="hidden" name="userId" value={u.id} />
                        <input type="hidden" name="action" value="approve" />
                        <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700">
                          Approve
                        </button>
                      </form>
                      <form action="/api/admin/kyc" method="POST">
                        <input type="hidden" name="userId" value={u.id} />
                        <input type="hidden" name="action" value="reject" />
                        <button type="submit" className="px-4 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-semibold hover:bg-red-200">
                          Reject
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="font-bold text-gray-900 mb-3">All KYC Submissions</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">User</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">Country</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">KYC Level</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {allKycUsers.map((u: any) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-gray-900">{u.name}</div>
                      <div className="text-xs text-gray-400">{u.email}</div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{u.country}</td>
                    <td className="px-5 py-3.5 text-gray-600">Level {u.kyc_level}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${kycColors[u.kyc_status] ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        {u.kyc_status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">
                      {new Date(u.created_at * 1000).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {allKycUsers.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-sm">No KYC submissions yet</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
