'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Upload, User, CreditCard, FileText } from 'lucide-react'

const STEPS = [
  { id: 'personal', icon: User, label: 'Personal info' },
  { id: 'id', icon: CreditCard, label: 'ID document' },
  { id: 'selfie', icon: FileText, label: 'Selfie' },
]

export default function VerifyPage() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    dob: '', nationality: '', address: '', city: '', postcode: '',
    idType: 'passport', idNumber: '',
  })

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }))

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-gray-100 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Verification submitted!</h2>
          <p className="text-gray-500 text-sm mb-6">
            We&apos;re reviewing your documents. This usually takes 1-2 hours.
            We&apos;ll notify you once it&apos;s complete.
          </p>
          <Link href="/dashboard" className="block w-full py-3 rounded-xl text-white font-semibold text-sm" style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/settings" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <span className="font-bold text-gray-900">Identity verification</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1">
              <div className={`flex items-center gap-2 flex-1 ${i < STEPS.length - 1 ? '' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                  i < step ? 'bg-emerald-500 text-white' :
                  i === step ? 'bg-violet-600 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-violet-700' : 'text-gray-400'}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? 'bg-emerald-400' : 'bg-gray-200'}`}></div>}
            </div>
          ))}
        </div>

        {/* Step 0: Personal info */}
        {step === 0 && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg mb-1">Personal information</h2>
            <p className="text-gray-500 text-sm mb-5">We need this to comply with anti-money laundering regulations.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of birth</label>
                <input type="date" value={form.dob} onChange={update('dob')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nationality</label>
                <input type="text" value={form.nationality} onChange={update('nationality')} placeholder="e.g. British, Nigerian"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Home address</label>
                <input type="text" value={form.address} onChange={update('address')} placeholder="Street address"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                  <input type="text" value={form.city} onChange={update('city')} placeholder="London"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Postcode</label>
                  <input type="text" value={form.postcode} onChange={update('postcode')} placeholder="SW1A 1AA"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep(1)}
              disabled={!form.dob || !form.nationality || !form.address}
              className="w-full mt-5 py-3.5 rounded-xl text-white font-bold text-sm disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 1: ID Document */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg mb-1">Identity document</h2>
            <p className="text-gray-500 text-sm mb-5">Upload a clear photo of your government-issued ID.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Document type</label>
                <select value={form.idType} onChange={update('idType')}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500">
                  <option value="passport">Passport</option>
                  <option value="national_id">National ID card</option>
                  <option value="driving_license">Driving licence</option>
                  <option value="residence_permit">Residence permit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Document number</label>
                <input type="text" value={form.idNumber} onChange={update('idNumber')} placeholder="e.g. 123456789"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Front of document</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-violet-300 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">Click to upload or drag & drop</div>
                  <div className="text-xs text-gray-400 mt-1">JPG, PNG or PDF · Max 10MB</div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setStep(0)} className="px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50">Back</button>
              <button
                onClick={() => setStep(2)}
                disabled={!form.idNumber}
                className="flex-1 py-3 rounded-xl text-white font-bold text-sm disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Selfie */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <h2 className="font-bold text-gray-900 text-lg mb-1">Take a selfie</h2>
            <p className="text-gray-500 text-sm mb-5">Take a clear photo of yourself holding your ID next to your face.</p>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center hover:border-violet-300 transition-colors cursor-pointer mb-5">
              <div className="text-5xl mb-3">🤳</div>
              <div className="text-sm font-medium text-gray-700">Upload selfie with ID</div>
              <div className="text-xs text-gray-400 mt-1">Make sure your face and ID are clearly visible</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-xs text-amber-800 mb-5 space-y-1">
              <div className="font-semibold mb-1">Tips for a good selfie:</div>
              <div>✓ Good lighting — no shadows on face</div>
              <div>✓ Hold ID next to your face, not covering it</div>
              <div>✓ All ID text must be readable</div>
              <div>✗ No sunglasses or hats</div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50">Back</button>
              <button
                onClick={() => setSubmitted(true)}
                className="flex-1 py-3 rounded-xl text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}
              >
                Submit verification
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 text-center text-xs text-gray-400">
          Your data is encrypted and handled in accordance with GDPR · FCA regulated
        </div>
      </div>
    </div>
  )
}
