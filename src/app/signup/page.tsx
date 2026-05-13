'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

type Step = 'form' | 'otp' | 'done'

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [otp, setOtp] = useState('')
  const [otpToken, setOtpToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const passwordStrength = () => {
    if (!password.length) return 0
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  }
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-500']
  const strength = passwordStrength()

  // Step 1 — send OTP
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'signup' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setOtpToken(data.token)
      setStep('otp')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP.')
    } finally {
      setLoading(false)
    }
  }

  // Step 2 — verify OTP and create account
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: otpToken, otp, purpose: 'signup', newPassword: password, name }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStep('done')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'OTP verification failed.')
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP
  async function handleResend() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'signup' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setOtpToken(data.token)
      setOtp('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-500" />
          
          <div className="px-8 py-10">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-[#0f172a] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/20">
                <Sparkles className="text-blue-400" size={28} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {step === 'form' && 'Create account'}
                {step === 'otp' && 'Verify email'}
                {step === 'done' && 'Ready to go! 🎉'}
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium">
                {step === 'form' && 'Join the CareLink Pro clinical network'}
                {step === 'otp' && `Enter the code sent to ${email}`}
                {step === 'done' && 'Your professional account is ready.'}
              </p>
            </div>

            {/* Step indicator */}
            {step !== 'done' && (
              <div className="flex items-center gap-2 mb-8">
                {['form', 'otp'].map((s, i) => (
                  <div key={s} className="flex items-center flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 ${step === s || (step === 'otp' && i === 0) ? 'bg-[#0f172a] text-white border-[#0f172a]' : 'bg-white text-slate-300 border-slate-200'}`}>
                      {i === 0 && step === 'otp' ? <CheckCircle2 size={14} /> : i + 1}
                    </div>
                    {i < 1 && <div className={`flex-1 h-0.5 mx-2 rounded-full ${step === 'otp' ? 'bg-[#0f172a]' : 'bg-slate-100'}`} />}
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm flex items-center gap-2 animate-shake">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* ── STEP 1: Form ── */}
            {step === 'form' && (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Dr. Jane Doe"
                      className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@clinical.unit"
                      className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type={showPassword ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters"
                      className="w-full pl-11 pr-12 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" tabIndex={-1}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                      </svg>
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div className="mt-3">
                      <div className="flex gap-1">{[1,2,3,4].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor[strength] : 'bg-slate-100'}`} />)}</div>
                      <p className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase tracking-wider">{strengthLabel[strength]} Security</p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Confirm Password</label>
                  <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Re-enter password"
                    className={`w-full px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium ${confirm && confirm !== password ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`} />
                  {confirm && confirm !== password && <p className="text-xs text-red-500 mt-1 font-medium">Passwords don&apos;t match</p>}
                </div>
                <button id="signup-submit" type="submit" disabled={loading}
                  className="w-full py-3.5 bg-[#0f172a] hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 active:scale-[0.98]">
                  {loading ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Sending OTP…</> : <>Continue <ArrowRight size={16} /></>}
                </button>
              </form>
            )}

            {/* ── STEP 2: OTP ── */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Verification Code</label>
                  <input id="otp-input" type="text" inputMode="numeric" maxLength={6} required value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="0 0 0 0 0 0"
                    className="w-full px-4 py-4 text-center text-3xl font-bold tracking-[0.4em] bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900" />
                  <p className="text-xs text-slate-400 mt-3 font-medium">Check your clinical email inbox</p>
                </div>
                <button id="otp-verify" type="submit" disabled={loading || otp.length < 6}
                  className="w-full py-3.5 bg-[#0f172a] hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 active:scale-[0.98]">
                  {loading ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Verifying…</> : 'Complete Setup'}
                </button>
                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setStep('form')} className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider">← Back</button>
                  <button type="button" onClick={handleResend} disabled={loading} className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider disabled:opacity-50">Resend Code</button>
                </div>
              </form>
            )}

            {/* ── STEP 3: Done ── */}
            {step === 'done' && (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
                  <CheckCircle2 size={40} className="text-emerald-500" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-900">Account Verified</h2>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Your professional credentials have been confirmed. You can now access the full CareLink Pro clinical suite.</p>
                </div>
                <Link href="/login" className="inline-flex items-center gap-2 px-8 py-3 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-900/10">
                  Enter Workspace <ArrowRight size={16} />
                </Link>
              </div>
            )}

            {step === 'form' && (
              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500 font-medium">
                  Already have an account?{' '}
                  <Link href="/login" className="text-blue-600 font-bold hover:underline">Sign in</Link>
                </p>
              </div>
            )}
          </div>
        </div>
        
        <p className="text-center text-[11px] text-slate-400 mt-8 font-bold uppercase tracking-widest">
          CareLink Pro · Professional Network Enrollment
        </p>

      </div>
    </div>
  )
}
