'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Key, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

type Step = 'email' | 'otp' | 'done'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [otpToken, setOtpToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Step 1 — send OTP
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'forgot' }),
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

  // Step 2 — verify OTP and set new password
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return }
    if (newPassword.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: otpToken, otp, purpose: 'forgot', newPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setStep('done')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Verification failed.')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose: 'forgot' }),
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
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-500" />
          
          <div className="px-8 py-10">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-[#0f172a] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/20">
                <Key className="text-blue-400" size={28} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {step === 'email' && 'Access Recovery'}
                {step === 'otp' && 'Reset Password'}
                {step === 'done' && 'Reset Complete!'}
              </h1>
              <p className="text-slate-500 text-sm mt-1 font-medium leading-relaxed">
                {step === 'email' && "Enter your email to receive a secure recovery code"}
                {step === 'otp' && `Code sent to ${email}. Set your new credentials.`}
                {step === 'done' && 'Your professional workspace access is restored.'}
              </p>
            </div>

            {/* Step indicator */}
            {step !== 'done' && (
              <div className="flex items-center gap-2 mb-8">
                {['email', 'otp'].map((s, i) => (
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

            {/* ── STEP 1: Email ── */}
            {step === 'email' && (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recovery Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@clinical.unit"
                      className="w-full pl-11 pr-4 py-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                  </div>
                </div>
                <button id="forgot-submit" type="submit" disabled={loading}
                  className="w-full py-3.5 bg-[#0f172a] hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 active:scale-[0.98]">
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Request Code <ArrowRight size={16} /></>}
                </button>
                <p className="text-center">
                  <Link href="/login" className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider">Back to Login</Link>
                </p>
              </form>
            )}

            {/* ── STEP 2: OTP + new password ── */}
            {step === 'otp' && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Verification Code</label>
                  <input id="reset-otp" type="text" inputMode="numeric" maxLength={6} required value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="0 0 0 0 0 0"
                    className="w-full px-4 py-4 text-center text-3xl font-bold tracking-[0.4em] bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type={showPassword ? 'text' : 'password'} required value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min. 8 characters"
                      className="w-full pl-11 pr-12 py-3.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" tabIndex={-1}>
                      <Sparkles size={18} />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Confirm Update</label>
                  <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat password"
                    className={`w-full px-4 py-3.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium ${confirmPassword && confirmPassword !== newPassword ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`} />
                </div>
                <button type="submit" disabled={loading || otp.length < 6}
                  className="w-full py-3.5 bg-[#0f172a] hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 active:scale-[0.98]">
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Apply New Password'}
                </button>
                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setStep('email')} className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider">← Back</button>
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
                  <h2 className="text-xl font-bold text-slate-900">Security Updated</h2>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Your recovery is successful. You can now use your new password to sign in.</p>
                </div>
                <Link href="/login" className="inline-flex items-center gap-2 px-8 py-3 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-900/10">
                  Sign In <ArrowRight size={16} />
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
