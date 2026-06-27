'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react'

const COUNTRIES = [
  { code: 'GB', name: '🇬🇧 United Kingdom' },
  { code: 'DE', name: '🇩🇪 Germany' },
  { code: 'FR', name: '🇫🇷 France' },
  { code: 'BE', name: '🇧🇪 Belgium' },
  { code: 'NL', name: '🇳🇱 Netherlands' },
  { code: 'ES', name: '🇪🇸 Spain' },
  { code: 'IT', name: '🇮🇹 Italy' },
  { code: 'US', name: '🇺🇸 United States' },
  { code: 'NG', name: '🇳🇬 Nigeria' },
  { code: 'KE', name: '🇰🇪 Kenya' },
  { code: 'GH', name: '🇬🇭 Ghana' },
  { code: 'ZA', name: '🇿🇦 South Africa' },
  { code: 'TZ', name: '🇹🇿 Tanzania' },
]

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: 'GB', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const r = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await r.json()
      if (!r.ok) { setError(data.error || 'Registration failed'); return }
      router.push('/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const pwStrong = form.password.length >= 8

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col p-12 text-white" style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 60%, #24243e 100%)' }}>
        <Link href="/" className="flex items-center gap-2 mb-16">
          <div className="w-9 h-9 rounded-xl bg-violet-500 flex items-center justify-center font-bold text-sm">RF</div>
          <span className="font-bold text-lg">RemitFlow</span>
        </Link>
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Send money home in minutes</h2>
          <p className="text-violet-200 mb-10">Join 2 million people who trust RemitFlow to send money to Africa.</p>
          <div className="space-y-4">
            {[
              'Free to sign up, no hidden fees',
              'Best exchange rates — up to 8x cheaper than banks',
              'Send to 20+ African countries',
              'Mobile money, bank transfer, cash pickup',
              'FCA regulated and fully licensed',
            ].map(f => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm text-white/90">{f}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 p-4 rounded-xl bg-white/10 border border-white/20">
            <p className="text-sm text-white/80 italic">&ldquo;RemitFlow cut my transfer cost by 70%. My family in Lagos gets the money in 5 minutes now.&rdquo;</p>
            <p className="text-xs text-white/50 mt-2">— Emeka O., London</p>
          </div>
        </div>
        <p className="text-xs text-white/40">© 2025 RemitFlow Ltd. FCA regulated.</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center font-bold text-xs text-white">RF</div>
            <span className="font-bold text-gray-900">RemitFlow</span>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
            <p className="text-gray-500 text-sm mb-6">Start sending money in under 2 minutes</p>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
            )}

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                <input type="text" required value={form.name} onChange={update('name')} placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input type="email" required value={form.email} onChange={update('email')} placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone number</label>
                <input type="tel" value={form.phone} onChange={update('phone')} placeholder="+44 7700 000000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Country of residence</label>
                <select value={form.country} onChange={update('country')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm">
                  {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPw ? 'text' : 'password'} required value={form.password} onChange={update('password')}
                    placeholder="At least 8 characters" minLength={8}
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm" />
                  <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className={`mt-1.5 flex items-center gap-1.5 text-xs ${pwStrong ? 'text-emerald-600' : 'text-amber-600'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${pwStrong ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                    {pwStrong ? 'Strong password' : 'Use at least 8 characters'}
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                By creating an account you agree to our{' '}
                <a href="#" className="text-violet-600 hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-violet-600 hover:underline">Privacy Policy</a>.
              </p>

              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>
                {loading
                  ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  : <><span>Create account</span> <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-violet-600 font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
