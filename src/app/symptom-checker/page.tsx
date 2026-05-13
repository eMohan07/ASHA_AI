'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ChatMessage from '../../components/ChatMessage'
import AlertBanner from '../../components/AlertBanner'
import { getSymptomAssessment } from '../../lib/claudeAPI'
import { Send, Trash2, MessageSquare, UserCircle, Sparkles, Zap } from 'lucide-react'

const WELCOME: any = {
  id: 'welcome',
  role: 'assistant',
  content: "Hello! I'm ASHA AI, your clinical triage assistant. Describe the patient's symptoms in English, Hindi, or Tamil and I'll provide an instant severity assessment with recommended next steps.",
  timestamp: new Date().toISOString(),
}

function SymptomCheckerInner() {
  const searchParams = useSearchParams()
  const patientName  = searchParams.get('patientName')
  const patientId    = searchParams.get('patientId')

  const [messages, setMessages]                   = useState<any[]>([WELCOME])
  const [input, setInput]                         = useState('')
  const [loading, setLoading]                     = useState(false)
  const [latestAssessment, setLatestAssessment]   = useState<any>(null)
  const [patient]                                 = useState<any>(
    patientName ? { name: patientName, id: patientId } : null
  )

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    const text = input.trim()
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
      const aiMsg = { id: (Date.now() + 1).toString(), role: 'assistant', content: result.message, assessment: result, timestamp: new Date().toISOString() }
      setMessages(prev => [...prev, aiMsg])
      if (result.referralNeeded) setLatestAssessment(result)
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), role: 'assistant',
        content: 'Sorry, I encountered an error. Please check your connection and try again.',
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

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto">

      {/* ── Header ── */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
            <MessageSquare size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900">Symptom AI</h1>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Zap size={10} className="text-emerald-500" />
              {patient ? `Patient: ${patient.name}` : 'Powered by Gemini · EN / HI / TA'}
            </p>
          </div>
        </div>
        <button
          onClick={() => { setMessages([WELCOME]); setLatestAssessment(null) }}
          className="btn-sm btn-ghost flex items-center gap-1.5 text-slate-400 hover:text-red-500"
        >
          <Trash2 size={13} /> Clear
        </button>
      </div>

      {/* ── Alert ── */}
      {latestAssessment?.referralNeeded && (
        <div className="mb-3 animate-slide-up">
          <AlertBanner assessment={latestAssessment} patient={patient} />
        </div>
      )}

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-5 pb-4 px-1">
        {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shrink-0">
              <Sparkles size={13} className="text-white" />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3.5 shadow-sm">
              <div className="flex gap-1.5 items-center h-4">
                {[0, 150, 300].map(delay => (
                  <span key={delay} className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div className="pt-3 border-t border-slate-100">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-500/15 transition-all overflow-hidden">
          {patient && (
            <div className="px-4 pt-3 pb-1 flex items-center gap-2">
              <UserCircle size={12} className="text-emerald-600" />
              <span className="text-[11px] font-semibold text-emerald-700">Assessing: {patient.name}</span>
            </div>
          )}
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the patient's symptoms in detail..."
            rows={3}
            disabled={loading}
            className="w-full px-4 pt-3 pb-1 bg-transparent border-none text-sm text-slate-900 placeholder:text-slate-400 resize-none focus:ring-0 focus:outline-none"
          />
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/60 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 font-medium">Enter to send · Shift+Enter for new line</span>
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="btn-sm btn-primary gap-1.5 px-3.5"
            >
              <Send size={12} /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SymptomCheckerPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400 text-sm">Loading...</div>}>
      <SymptomCheckerInner />
    </Suspense>
  )
}
