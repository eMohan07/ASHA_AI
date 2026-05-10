'use client'

import React, { useState, useEffect } from 'react'
import { Mic, Square, Play, RefreshCcw, CheckCircle2, ChevronLeft, Volume2, BrainCircuit, Activity, Waves } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function VoiceSymptomEntry() {
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [hasTranscript, setHasTranscript] = useState(false)
  const [status, setStatus] = useState<'idle' | 'recording' | 'processing' | 'done'>('idle')

  const startRecording = () => {
    setIsRecording(true)
    setStatus('recording')
  }

  const stopRecording = () => {
    setIsRecording(false)
    setStatus('processing')
    // Simulate processing
    setTimeout(() => {
      setStatus('done')
      setHasTranscript(true)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-12">
      
      {/* Header */}
      <div className="space-y-6">
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[10px] font-black text-[#00e5ff] uppercase tracking-widest hover:gap-3 transition-all group"
        >
          <ChevronLeft size={14} />
          Back to Patient
        </button>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#cdbdff]/10 px-2 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest text-[#cdbdff] mb-2 border border-[#cdbdff]/20">
              <Mic size={10} />
              Protocol: Multimodal Intake
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Ambient Listening</h1>
            <p className="text-sm font-bold text-[#bac9cc] uppercase tracking-widest">
              Record symptoms naturally. AI will extract structured medical data.
            </p>
          </div>
          
          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center justify-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
              <Volume2 size={16} className="text-[#cdbdff]" />
              Detecting: Hindi / English Mixed
            </div>
          </div>
        </div>
      </div>

      {/* Recording Interface */}
      <div className="glass-card border-[#cdbdff]/10 p-12 flex flex-col items-center text-center space-y-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#cdbdff]/5 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
        
        {/* Status indicator */}
        <div className="space-y-3 relative z-10">
          <div className={cn(
            "text-2xl font-black uppercase tracking-tighter",
            status === 'recording' ? "text-red-400 animate-pulse" : "text-white"
          )}>
            {status === 'idle' && 'Ready for Intake'}
            {status === 'recording' && 'Recording Audio...'}
            {status === 'processing' && 'Processing NLP...'}
            {status === 'done' && 'Extraction Complete'}
          </div>
          <p className="text-xs text-[#bac9cc] font-bold uppercase tracking-widest">
            {status === 'idle' && 'Tap the microphone to begin'}
            {status === 'recording' && 'Speak clearly into the device'}
            {status === 'processing' && 'Converting to structured clinical terms'}
            {status === 'done' && 'Review AI-generated tags below'}
          </p>
        </div>

        {/* Action Button & Waveform */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto">
          {/* Simulated Waveform Background */}
          {status === 'recording' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-30">
               <div className="w-[150%] h-32 flex items-center gap-1.5 justify-center">
                {[...Array(40)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-1.5 rounded-sm bg-red-400 animate-bounce"
                    style={{ 
                      height: `${10 + Math.random() * 90}%`,
                      animationDelay: `${i * 0.05}s` 
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={status === 'idle' ? startRecording : status === 'recording' ? stopRecording : undefined}
            className={cn(
              "relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 active:scale-95 group",
              status === 'recording' ? "bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)]" : "bg-[#cdbdff]/10 border border-[#cdbdff]/30 hover:bg-[#cdbdff]/20"
            )}
          >
            {status === 'recording' ? (
              <Square size={36} className="text-[#111318] fill-[#111318]" />
            ) : (
              <Mic size={36} className="text-[#cdbdff] group-hover:scale-110 transition-transform" />
            )}
          </button>
        </div>

        {/* Results Preview */}
        {status === 'done' && (
          <div className="w-full pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 border-t border-white/5 relative z-10">
            <div className="bg-[#111318] border border-white/10 rounded-sm p-8 text-left space-y-6">
              <div className="flex items-center gap-3 text-[#cdbdff]">
                <BrainCircuit size={20} />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Clinical Entities Extracted</span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {[
                  { tag: 'Severe Cough', cat: 'Symptom' },
                  { tag: 'Fever (3 days)', cat: 'Duration' },
                  { tag: 'Chest Pain', cat: 'Symptom' },
                  { tag: 'Shortness of Breath', cat: 'Symptom' }
                ].map(s => (
                  <div key={s.tag} className="bg-white/5 border border-white/10 px-4 py-2 rounded-sm flex flex-col gap-1">
                     <span className="text-[9px] font-bold text-[#bac9cc]/50 uppercase tracking-widest">{s.cat}</span>
                     <span className="text-sm font-black text-white">{s.tag}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 flex justify-end">
                <Link 
                  href="/symptom-checker/results" 
                  className="bg-[#cdbdff] text-[#370096] py-4 px-8 rounded-sm font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#e0d4ff] transition-all"
                >
                  Proceed to AI Triage
                  <Activity size={16} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
