'use client'
<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react'
=======
import { useState, useRef, useEffect, Suspense } from 'react'
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
import { useSearchParams } from 'next/navigation'
import ChatMessage from '../../components/ChatMessage'
import AlertBanner from '../../components/AlertBanner'
import { getSymptomAssessment } from '../../lib/claudeAPI'

const WELCOME_MESSAGE = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hello! I am ASHA AI. Please describe the patient\'s symptoms and I will help you assess the situation. You can type in English, Tamil, or Hindi.',
  timestamp: new Date().toISOString(),
}

export default function SymptomCheckerPage() {
<<<<<<< HEAD
=======
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SymptomCheckerContent />
    </Suspense>
  )
}

function SymptomCheckerContent() {
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
  const searchParams = useSearchParams()
  const patientId   = searchParams.get('patientId')
  const patientName = searchParams.get('patientName')

  const [messages, setMessages]         = useState<any[]>([WELCOME_MESSAGE])
  const [input, setInput]               = useState('')
  const [loading, setLoading]           = useState(false)
  const [latestAssessment, setLatestAssessment] = useState<any>(null)
  const [patient, setPatient]           = useState<any>(
    patientName ? { name: patientName, id: patientId } : null
  )

  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const result = await getSymptomAssessment(text, {
        patientName: patient?.name,
        conversationHistory: messages.slice(-6), // last 3 exchanges
      })

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.message,
        assessment: result,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, aiMessage])

      if (result.referralNeeded) {
        setLatestAssessment(result)
      }
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I could not process that. Please check your connection and try again.',
          timestamp: new Date().toISOString(),
        },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e: any) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleClear() {
    setMessages([WELCOME_MESSAGE])
    setLatestAssessment(null)
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 140px)' }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Symptom Checker</h1>
          {patient ? (
            <p className="text-sm text-green-700">Checking for: <strong>{patient.name}</strong></p>
          ) : (
            <p className="text-sm text-gray-500">AI-assisted triage for frontline workers</p>
          )}
        </div>
        <button onClick={handleClear} className="btn-secondary text-xs">
          Clear Chat
        </button>
      </div>

      {/* Alert banner for critical/high cases */}
      {latestAssessment?.referralNeeded && (
        <div className="mb-3">
          <AlertBanner assessment={latestAssessment} patient={patient} />
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-center gap-2 ml-9">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm">
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 pt-3 mt-auto">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe symptoms... (e.g. fever for 3 days, 39°C, headache, no rash)"
            rows={2}
            disabled={loading}
            className="input-field flex-1 resize-none text-sm"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="btn-primary px-5 flex-shrink-0 self-end"
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Press Enter to send · Shift+Enter for new line · Available in English, Tamil, Hindi
        </p>
      </div>

    </div>
  )
}
