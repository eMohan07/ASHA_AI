'use client'
import { Sparkles, UserCircle, ChevronDown, ChevronUp, AlertTriangle, ShieldCheck, Shield } from 'lucide-react'
import { useState } from 'react'

const SEV_CONFIG: Record<string, { bg: string; border: string; text: string; label: string; dot: string }> = {
  LOW:      { bg: 'bg-emerald-50',  border: 'border-emerald-200', text: 'text-emerald-700', label: 'Low Risk',  dot: 'bg-emerald-500' },
  MEDIUM:   { bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   label: 'Moderate',  dot: 'bg-amber-500' },
  HIGH:     { bg: 'bg-orange-50',  border: 'border-orange-200',  text: 'text-orange-700',  label: 'High Risk', dot: 'bg-orange-500' },
  CRITICAL: { bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     label: 'Critical',  dot: 'bg-red-500' },
}

const FATALITY_CONFIG: Record<string, { bg: string; border: string; text: string; icon: any; label: string }> = {
  FATAL:            { bg: 'bg-red-600',     border: 'border-red-700',     text: 'text-white',        icon: AlertTriangle, label: '⚠ POTENTIALLY FATAL — Seek emergency care immediately' },
  POTENTIALLY_FATAL:{ bg: 'bg-orange-500',  border: 'border-orange-600',  text: 'text-white',        icon: Shield,        label: 'Could become dangerous — Monitor closely & consult a doctor' },
  NON_FATAL:        { bg: 'bg-emerald-100', border: 'border-emerald-200', text: 'text-emerald-800',  icon: ShieldCheck,   label: 'Non-fatal — Manageable with basic care' },
}

export default function ChatMessage({ message }: { message: any }) {
  const isAI = message.role === 'assistant'
  const assessment = message.assessment
  const [expanded, setExpanded] = useState(true)

  const time = new Date(message.timestamp).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit',
  })

  // ─── User message ───
  if (!isAI) {
    return (
      <div className="flex items-end gap-2.5 justify-end animate-fade-in">
        <div className="flex flex-col items-end gap-1 max-w-[80%]">
          <div className="bg-[#0f172a] text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          <span className="text-[10px] text-slate-400 pr-1">{time}</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mb-5">
          <UserCircle size={15} className="text-blue-600" />
        </div>
      </div>
    )
  }

  const sev = assessment?.severity ? SEV_CONFIG[assessment.severity] : null
  const fat = assessment?.fatalityRisk ? FATALITY_CONFIG[assessment.fatalityRisk] : null

  return (
    <div className="flex items-start gap-2.5 animate-fade-in">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
        <Sparkles size={12} className="text-white" />
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        {/* Message bubble */}
        <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm max-w-[90%]">
          <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Assessment card */}
        {assessment?.severity && (
          <div className="max-w-[90%] rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            
            {/* ── Fatality Banner ── */}
            {fat && (
              <div className={`${fat.bg} ${fat.border} ${fat.text} px-4 py-2.5 flex items-center gap-2.5 border-b`}>
                <fat.icon size={16} className={fat.text} strokeWidth={2.5} />
                <span className="text-xs font-bold tracking-wide">{fat.label}</span>
              </div>
            )}

            {/* ── Collapsible details ── */}
            <button
              onClick={() => setExpanded(e => !e)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100"
            >
              <div className="flex items-center gap-3">
                {sev && (
                  <>
                    <span className={`w-2 h-2 rounded-full ${sev.dot} shrink-0`} />
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${sev.bg} ${sev.border} ${sev.text} border`}>
                      {sev.label}
                    </span>
                  </>
                )}
                {assessment.summary && (
                  <span className="text-xs text-slate-500 truncate max-w-[200px]">{assessment.summary}</span>
                )}
              </div>
              {expanded ? <ChevronUp size={13} className="text-slate-400" /> : <ChevronDown size={13} className="text-slate-400" />}
            </button>

            {expanded && (
              <div className="px-4 pb-4 pt-3 space-y-4">
                
                {/* Fatality explanation */}
                {assessment.fatalityExplanation && (
                  <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-3 border border-slate-100 leading-relaxed italic">
                    {assessment.fatalityExplanation}
                  </div>
                )}

                {/* Possible Conditions */}
                {assessment.possibleConditions?.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Possible Conditions</p>
                    <div className="flex flex-wrap gap-2">
                      {assessment.possibleConditions.map((c: string, i: number) => (
                        <span key={i} className="text-[11px] bg-blue-50 text-blue-700 border border-blue-100 rounded-full px-2.5 py-0.5 font-semibold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next steps */}
                {assessment.nextSteps?.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Recommended Steps</p>
                    <ol className="space-y-1.5">
                      {assessment.nextSteps.map((step: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-xs text-slate-600 leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Warning signs */}
                {assessment.warningSigns?.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">⚠ Watch For These Warning Signs</p>
                    <ul className="space-y-1">
                      {assessment.warningSigns.map((sign: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full shrink-0 mt-1.5" />
                          <span className="text-xs text-slate-600 leading-relaxed">{sign}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Referral */}
                {assessment.referralNeeded && (
                  <div className="flex items-start gap-2.5 px-3 py-2.5 bg-red-50 border border-red-200 rounded-xl">
                    <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
                    <p className="text-xs text-red-700 font-medium leading-relaxed">
                      <span className="font-bold">Referral needed: </span>
                      {assessment.referralReason || 'Recommend immediate PHC/hospital evaluation.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <span className="text-[10px] text-slate-400 pl-1">{time}</span>
      </div>
    </div>
  )
}
