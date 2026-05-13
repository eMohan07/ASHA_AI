'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ChatMessage from '../../components/ChatMessage'
import { getSymptomAssessment } from '../../lib/claudeAPI'
import { 
  Send, Trash2, MessageSquare, Sparkles, 
  AlertTriangle, Shield, ShieldCheck, Zap
} from 'lucide-react'

const QUICK_SYMPTOMS = [
  'High fever with chills and headache',
  'Chest pain and difficulty breathing',
  'Severe vomiting and diarrhea',
  'Rash with swelling',
  'Unconscious or unresponsive patient',
  'Severe headache and stiff neck',
]

const WELCOME: any = {
  id: 'welcome',
  role: 'assistant',
  content: "Hello! I'm CareLink Pro AI, your clinical triage assistant.\n\nDescribe the patient's symptoms in detail and I'll give you:\n• A severity level (Low / Moderate / High / Critical)\n• Whether the condition is potentially FATAL or MILD\n• Possible conditions and immediate next steps\n• Warning signs to watch for\n\nYou can type in English, Hindi, or Tamil.",
  timestamp: new Date().toISOString(),
}

function SymptomCheckerContent() {
  const searchParams = useSearchParams()
  const patientName  = searchParams.get('patientName')
  const patientId    = searchParams.get('patientId')

  const [messages, setMessages]                 = useState<any[]>([WELCOME])
  const [input, setInput]                       = useState('')
  const [loading, setLoading]                   = useState(false)
  const [latestAssessment, setLatestAssessment] = useState<any>(null)
  const [patient]                               = useState<any>(
    patientName ? { name: patientName, id: patientId } : null
  )

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend(overrideText?: string) {
    const text = (overrideText ?? input).trim()
    if (!text || loading) return
    const userMsg = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const result = await getSymptomAssessment(text, {
        patientName: patient?.name,
        conversationHistory: messages.slice(-6),
      })
      const aiMsg = { 
        id: (Date.now() + 1).toString(), 
        role: 'assistant', 
        content: result.message, 
        assessment: result, 
        timestamp: new Date().toISOString() 
      }
      setMessages(prev => [...prev, aiMsg])
      setLatestAssessment(result)
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), role: 'assistant',
        content: 'Sorry, I encountered an error. Please check your API key configuration and try again.',
        timestamp: new Date().toISOString(),
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const latFat = latestAssessment?.fatalityRisk
  const alertBg = latFat === 'FATAL' ? 'bg-red-600' : latFat === 'POTENTIALLY_FATAL' ? 'bg-orange-500' : 'bg-emerald-600'
  const AlertIcon = latFat === 'FATAL' ? AlertTriangle : latFat === 'POTENTIALLY_FATAL' ? Shield : ShieldCheck

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto">

      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-sm">
            <MessageSquare size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900">
              Symptom AI {patient ? `— ${patient.name}` : ''}
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Zap size={10} className="text-blue-500" />
              CareLink Pro · Clinical Triage Assistant · EN / HI / TA
            </p>
          </div>
        </div>
        <button
          onClick={() => { setMessages([WELCOME]); setLatestAssessment(null) }}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
        >
          <Trash2 size={13} /> Clear Chat
        </button>
      </div>

      {/* ── Fatality Alert Banner ── */}
      {latestAssessment && (
        <div className={`mb-3 ${alertBg} text-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-md`}>
          <AlertIcon size={18} strokeWidth={2.5} />
          <div>
            <p className="text-sm font-bold">
              {latFat === 'FATAL' ? 'EMERGENCY — Potentially Fatal Condition Detected' : 
               latFat === 'POTENTIALLY_FATAL' ? 'Caution — Could Become Dangerous' : 
               'Non-Fatal — Manageable with Basic Care'}
            </p>
            {latestAssessment.fatalityExplanation && (
              <p className="text-xs opacity-90 mt-0.5">{latestAssessment.fatalityExplanation}</p>
            )}
          </div>
        </div>
      )}

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-5 pb-4 px-1">
        {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shrink-0">
              <Sparkles size={12} className="text-white" />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm">
              <div className="flex gap-1.5 items-center h-4">
                {[0, 150, 300].map(delay => (
                  <span key={delay} className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Quick Symptom Chips ── */}
      {messages.length <= 1 && (
        <div className="pb-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Examples</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_SYMPTOMS.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                disabled={loading}
                className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent text-slate-600 rounded-full px-3 py-1.5 font-medium transition-colors disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Input Area ── */}
      <div className="pt-3 border-t border-slate-100">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/15 transition-all overflow-hidden">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the patient's symptoms in detail... (e.g. 'Patient has high fever for 3 days, severe headache, stiff neck and is confused')"
            rows={3}
            disabled={loading}
            className="w-full px-4 pt-3 pb-1 bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 resize-none focus:ring-0 focus:outline-none"
          />
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/60 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 font-medium">Enter to send · Shift+Enter for new line</span>
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="flex items-center gap-1.5 bg-[#0f172a] hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
            >
              <Send size={12} /> Assess Symptoms
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SymptomCheckerPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-8">Loading symptom checker...</div>}>
      <SymptomCheckerContent />
    </Suspense>
  )
}
