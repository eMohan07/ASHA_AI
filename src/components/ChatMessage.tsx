'use client'
import { Sparkles, UserCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

const SEV_CONFIG: Record<string, { badge: string; dot: string; label: string }> = {
  LOW:      { badge: 'badge-green',  dot: 'bg-emerald-500', label: 'Low Risk' },
  MEDIUM:   { badge: 'badge-amber',  dot: 'bg-amber-500',   label: 'Moderate' },
  HIGH:     { badge: 'badge-orange', dot: 'bg-orange-500',  label: 'High Risk' },
  CRITICAL: { badge: 'badge-red',    dot: 'bg-red-500',     label: 'Critical' },
}

export default function ChatMessage({ message }: { message: any }) {
  const isAI = message.role === 'assistant'
  const assessment = message.assessment
  const [expanded, setExpanded] = useState(true)

  const time = new Date(message.timestamp).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit',
  })

  if (!isAI) {
    return (
      <div className="flex items-end gap-2.5 justify-end animate-fade-in">
        <div className="flex flex-col items-end gap-1 max-w-[78%]">
          <div className="bg-emerald-600 text-white rounded-2xl rounded-br-sm px-4 py-3 shadow-sm">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>
          <span className="text-[10px] text-slate-400 pr-1">{time}</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mb-5">
          <UserCircle size={15} className="text-slate-500" />
        </div>
      </div>
    )
  }

  const sev = assessment?.severity ? SEV_CONFIG[assessment.severity] : null

  return (
    <div className="flex items-start gap-2.5 animate-fade-in">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
        <Sparkles size={12} className="text-white" />
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        {/* Message bubble */}
        <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm max-w-[88%]">
          <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Assessment card */}
        {assessment?.severity && (
          <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden max-w-[88%]">
            {/* Header */}
            <button
              onClick={() => setExpanded(e => !e)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {sev && (
                  <>
                    <span className={`w-2 h-2 rounded-full ${sev.dot}`} />
                    <span className={`${sev.badge} text-[11px]`}>{sev.label}</span>
                  </>
                )}
                {assessment.summary && (
                  <span className="text-xs text-slate-500 truncate max-w-[200px]">{assessment.summary}</span>
                )}
              </div>
              {expanded ? <ChevronUp size={13} className="text-slate-400" /> : <ChevronDown size={13} className="text-slate-400" />}
            </button>

            {expanded && (
              <div className="px-4 pb-4 border-t border-slate-50 pt-3 space-y-3">
                {/* Next steps */}
                {assessment.nextSteps?.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Recommended Steps
                    </p>
                    <ol className="space-y-1.5">
                      {assessment.nextSteps.map((step: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="text-xs text-slate-600 leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Referral */}
                {assessment.referralNeeded && (
                  <div className="flex items-start gap-2.5 px-3 py-2.5 bg-red-50 border border-red-100 rounded-xl">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0" />
                    <p className="text-xs text-red-700 font-medium leading-relaxed">
                      <span className="font-bold">Referral needed: </span>
                      {assessment.referralReason || 'Recommend immediate PHC evaluation.'}
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
