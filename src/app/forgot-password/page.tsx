'use client'
import { useState } from 'react'
import Link from 'next/link'

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
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />
          <div className="px-8 py-10">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                {step === 'email' && 'Forgot password?'}
                {step === 'otp' && 'Enter your OTP'}
                {step === 'done' && 'Password updated!'}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {step === 'email' && "We'll send a 6-digit OTP to your email"}
                {step === 'otp' && `Code sent to ${email}. Set your new password below.`}
                {step === 'done' && 'You can now log in with your new password.'}
              </p>
            </div>

            {/* Step indicator */}
            {step !== 'done' && (
              <div className="flex items-center gap-2 mb-6">
                {['email', 'otp'].map((s, i) => (
                  <div key={s} className="flex items-center flex-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step === s || (step === 'otp' && i === 0) ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {i === 0 && step === 'otp' ? '✓' : i + 1}
                    </div>
                    {i < 1 && <div className={`flex-1 h-0.5 mx-1 ${step === 'otp' ? 'bg-green-700' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-5 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {/* ── STEP 1: Email ── */}
            {step === 'email' && (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="forgot-email">Email address</label>
                  <input id="forgot-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
                </div>
                <button id="forgot-submit" type="submit" disabled={loading}
                  className="w-full py-2.5 bg-green-700 hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2">
                  {loading ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Sending OTP…</> : 'Send OTP'}
                </button>
                <p className="text-center text-sm text-gray-500">
                  <Link href="/login" className="text-green-700 font-semibold hover:underline">Back to Login</Link>
                </p>
              </form>
            )}

            {/* ── STEP 2: OTP + new password ── */}
            {step === 'otp' && (
              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="reset-otp">6-digit OTP</label>
                  <input id="reset-otp" type="text" inputMode="numeric" maxLength={6} required value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="_ _ _ _ _ _"
                    className="w-full px-4 py-3 text-center text-2xl font-bold tracking-[0.5em] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="new-password">New password</label>
                  <div className="relative">
                    <input id="new-password" type={showPassword ? 'text' : 'password'} required value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min. 8 characters"
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" tabIndex={-1}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="confirm-password">Confirm password</label>
                  <input id="confirm-password" type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter new password"
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${confirmPassword && confirmPassword !== newPassword ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
                  {confirmPassword && confirmPassword !== newPassword && <p className="text-xs text-red-500 mt-1">Passwords don&apos;t match</p>}
                </div>
                <button type="submit" disabled={loading || otp.length < 6}
                  className="w-full py-2.5 bg-green-700 hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2">
                  {loading ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Resetting…</> : 'Reset Password'}
                </button>
                <div className="flex items-center justify-between text-sm">
                  <button type="button" onClick={() => setStep('email')} className="text-gray-500 hover:text-gray-700">← Back</button>
                  <button type="button" onClick={handleResend} disabled={loading} className="text-green-700 hover:underline font-medium disabled:opacity-50">Resend OTP</button>
                </div>
              </form>
            )}

            {/* ── STEP 3: Done ── */}
            {step === 'done' && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Password updated successfully!</p>
                <Link href="/login" className="inline-block px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white font-semibold text-sm rounded-lg transition-colors">
                  Login Now
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
