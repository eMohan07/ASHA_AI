'use client'
import { useState } from 'react'
import { sendCriticalAlert } from '../lib/sendAlert'
import { AlertTriangle, CheckCircle2, Send, Phone, X } from 'lucide-react'

export default function AlertBanner({ assessment, patient }: { assessment?: any; patient?: any }) {
  const [sending, setSending]       = useState(false)
  const [sent, setSent]             = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [doctorPhone, setDoctorPhone] = useState('')
  const [dismissed, setDismissed]   = useState(false)

  if (!assessment?.referralNeeded || dismissed) return null

  const isCritical = assessment.severity === 'CRITICAL'
  const colors = isCritical
    ? { bar: 'bg-red-600', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900', sub: 'text-red-700', btn: 'bg-red-600 hover:bg-red-700' }
    : { bar: 'bg-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900', sub: 'text-orange-700', btn: 'bg-orange-500 hover:bg-orange-600' }

  async function handleSend() {
    if (!doctorPhone.trim()) { setError("Enter the doctor's WhatsApp number"); return }
    setSending(true); setError(null)
    try {
      await sendCriticalAlert({
        patientName: patient?.name || 'Unknown Patient',
        patientAge: patient?.age || 'Unknown',
        village: patient?.village || 'Unknown',
        symptoms: assessment.summary,
        severity: assessment.severity,
        referralReason: assessment.referralReason,
        doctorPhone: doctorPhone.trim(),
      })
      setSent(true)
    } catch (err: any) {
      setError(err.message || 'Failed to send.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className={`rounded-xl border ${colors.bg} ${colors.border} overflow-hidden animate-slide-up`}>
      {/* Colored top bar */}
      <div className={`h-1 w-full ${colors.bar}`} />

      <div className="px-4 py-4 space-y-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colors.bar} shadow-sm`}>
              <AlertTriangle size={15} className="text-white" />
            </div>
            <div>
              <h3 className={`font-semibold text-sm ${colors.text}`}>
                {isCritical ? 'Critical — Immediate Referral Required' : 'High Priority Referral Needed'}
              </h3>
              <p className={`text-xs mt-0.5 leading-relaxed ${colors.sub}`}>
                {assessment.referralReason}
              </p>
            </div>
          </div>
          <button onClick={() => setDismissed(true)} className="text-slate-400 hover:text-slate-600 mt-0.5 shrink-0">
            <X size={15} />
          </button>
        </div>

        {/* WhatsApp dispatch */}
        <div className="bg-white/70 rounded-xl p-3 border border-white/80">
          {sent ? (
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-emerald-800">WhatsApp alert sent successfully</p>
                <p className="text-[11px] text-emerald-600">Doctor has been notified via WhatsApp.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Phone size={11} /> Send WhatsApp Alert to Doctor
              </p>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={doctorPhone}
                  onChange={e => setDoctorPhone(e.target.value)}
                  placeholder="+91 doctor's number"
                  className="input text-xs py-2 flex-1"
                />
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className={`btn-sm text-white ${colors.btn} px-4 rounded-lg transition-colors`}
                >
                  {sending ? 'Sending...' : <><Send size={12} /> Send</>}
                </button>
              </div>
              {error && (
                <p className="text-[11px] text-red-600 flex items-center gap-1">
                  <AlertTriangle size={11} /> {error}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
