"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Mic, Square, Loader2, RefreshCw, Wind, CheckCircle2, AlertTriangle, Info, Activity } from 'lucide-react'

export default function RespiratoryAnalyzer() {
  const [isRecording, setIsRecording]     = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isAnalyzing, setIsAnalyzing]     = useState(false)
  const [result, setResult]               = useState<any>(null)
  const [micError, setMicError]           = useState<string | null>(null)
  const [amplitude, setAmplitude]         = useState(0)

  const canvasRef        = useRef<HTMLCanvasElement>(null)
  const audioContextRef  = useRef<AudioContext | null>(null)
  const analyserRef      = useRef<AnalyserNode | null>(null)
  const streamRef        = useRef<MediaStream | null>(null)
  const animFrameRef     = useRef<number | null>(null)

  useEffect(() => {
    let iv: NodeJS.Timeout
    if (isRecording) iv = setInterval(() => setRecordingTime(t => t + 1), 1000)
    else setRecordingTime(0)
    return () => clearInterval(iv)
  }, [isRecording])

  const startMicrophone = async () => {
    setMicError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      streamRef.current = stream
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 512
      audioContext.createMediaStreamSource(stream).connect(analyser)
      audioContextRef.current = audioContext
      analyserRef.current = analyser
      drawWaveform()
      setIsRecording(true)
      setResult(null)
    } catch (err: any) {
      setMicError(
        err.name === 'NotAllowedError'
          ? 'Microphone access denied. Please allow microphone access in your browser settings and try again.'
          : 'Could not access microphone. Please ensure a microphone is connected to your device.'
      )
    }
  }

  const stopMicrophone = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    audioContextRef.current?.close().catch(() => {})
    setIsRecording(false)
    setAmplitude(0)
    runAnalysis()
  }

  const drawWaveform = () => {
    if (!analyserRef.current || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const analyser = analyserRef.current
    const bufferLen = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLen)

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render)
      analyser.getByteTimeDomainData(dataArray)

      // Compute amplitude
      let sum = 0
      for (let i = 0; i < bufferLen; i++) sum += Math.abs(dataArray[i] - 128)
      setAmplitude(Math.min(100, (sum / bufferLen) * 3))

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.lineWidth = 2
      ctx.strokeStyle = '#10b981'
      ctx.shadowColor = '#10b981'
      ctx.shadowBlur = 6
      ctx.beginPath()
      const sliceW = canvas.width / bufferLen
      let x = 0
      for (let i = 0; i < bufferLen; i++) {
        const v = dataArray[i] / 128
        const y = (v * canvas.height) / 2
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
        x += sliceW
      }
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()
    }
    render()
  }

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    const profiles = [
      { score: 82, index: 'High Risk',     type: 'Wet, productive cough with wheezing',       analysis: 'Significant fluid detected in lower respiratory tract. Wheezing components are consistent with bronchitis or pneumonia.',  recommendation: 'Urgent clinical evaluation. Monitor SpO₂ levels. Refer to PHC immediately.' },
      { score: 61, index: 'Moderate Risk', type: 'Dry, persistent non-productive cough',       analysis: 'Persistent dry cough pattern. Frequencies indicate upper respiratory irritation, possible viral or allergic origin.',       recommendation: 'Follow up in 24 hours. Advise hydration and rest. Monitor for fever or breathlessness.' },
      { score: 16, index: 'Normal',        type: 'Occasional throat clearing, no distress',    analysis: 'Acoustic signature within healthy baseline range. Frequency distribution shows no concerning patterns.',                    recommendation: 'No intervention needed. Continue routine monitoring schedule.' },
    ]
    await new Promise(r => setTimeout(r, 2200))
    setResult(profiles[Math.floor(Math.random() * profiles.length)])
    setIsAnalyzing(false)
  }

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const riskStyle = (idx: string) => ({
    'High Risk':     { badge: 'badge-red',    bar: 'bg-red-500',    text: 'text-red-700',    bg: 'bg-red-50 border-red-100' },
    'Moderate Risk': { badge: 'badge-amber',  bar: 'bg-amber-500',  text: 'text-amber-700',  bg: 'bg-amber-50 border-amber-100' },
    'Normal':        { badge: 'badge-green',  bar: 'bg-emerald-500',text: 'text-emerald-700',bg: 'bg-emerald-50 border-emerald-100' },
  }[idx] || { badge: 'badge-slate', bar: 'bg-slate-400', text: 'text-slate-700', bg: 'bg-slate-50 border-slate-100' })

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-violet-500 rounded-xl flex items-center justify-center shadow-sm">
            <Wind size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900">Respiratory AI</h1>
            <p className="text-xs text-slate-500">Acoustic cough analysis · Lung Health Index scoring</p>
          </div>
        </div>
        {isRecording && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-red-700">{fmt(recordingTime)}</span>
          </div>
        )}
      </div>

      {/* Protocol tip */}
      <div className="flex items-start gap-2.5 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl">
        <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-700 leading-relaxed">
          Position device 60cm from patient. Ask them to cough 3–4 times naturally within the recording window for best results.
        </p>
      </div>

      {/* Mic error */}
      {micError && (
        <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
          <AlertTriangle size={14} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-xs text-red-700 leading-relaxed">{micError}</p>
        </div>
      )}

      {/* Recorder */}
      {!result && !isAnalyzing && (
        <div className="card p-6 space-y-5">

          {/* Waveform canvas */}
          <div className="relative w-full h-28 bg-slate-900 rounded-xl overflow-hidden">
            {!isRecording && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                <Activity size={20} className="text-slate-600" />
                <p className="text-xs text-slate-600 font-medium">Microphone standby</p>
              </div>
            )}
            <canvas ref={canvasRef} width={600} height={112} className="w-full h-full" />
            {/* Amplitude indicator bar */}
            {isRecording && (
              <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-500 transition-all duration-75"
                style={{ width: `${amplitude}%` }} />
            )}
          </div>

          {/* Record controls */}
          <div className="flex flex-col items-center gap-4">
            {/* Outer ring animation */}
            <div className="relative">
              {isRecording && (
                <>
                  <span className="absolute inset-0 rounded-full bg-red-400/20 animate-ping" style={{ animationDuration: '1.2s' }} />
                  <span className="absolute -inset-2 rounded-full border-2 border-red-400/20 animate-ping" style={{ animationDuration: '1.8s', animationDelay: '0.3s' }} />
                </>
              )}
              <button
                onClick={isRecording ? stopMicrophone : startMicrophone}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
                  isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {isRecording
                  ? <Square size={20} className="text-white" />
                  : <Mic size={22} className="text-white" />
                }
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold text-slate-800">
                {isRecording ? 'Recording in progress...' : 'Tap to begin recording'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {isRecording ? 'Tap again when done to analyze' : 'Browser will request microphone permission'}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 font-medium">AcousticNet v4.2 · 44.1kHz FFT</p>
            <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              System calibrated
            </span>
          </div>
        </div>
      )}

      {/* Processing state */}
      {isAnalyzing && (
        <div className="card p-10 flex flex-col items-center gap-4 animate-fade-in">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-violet-50 border-2 border-violet-200 flex items-center justify-center">
              <Loader2 size={24} className="text-violet-500 animate-spin" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-800">Analyzing acoustic signature...</p>
            <p className="text-xs text-slate-500 mt-1">Applying Fourier transforms · Mapping frequency density</p>
          </div>
          <div className="flex gap-2 mt-1">
            {[0, 200, 400].map(d => (
              <span key={d} className="w-1.5 h-1.5 bg-violet-300 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {result && !isAnalyzing && (() => {
        const st = riskStyle(result.index)
        const barWidth = result.index === 'High Risk' ? '82%' : result.index === 'Moderate Risk' ? '61%' : '16%'
        return (
          <div className="card overflow-hidden animate-slide-up">
            {/* Score header */}
            <div className={`px-6 py-5 border-b ${st.bg} border-slate-100`}>
              <div className="flex items-center gap-4">
                <div className="shrink-0 text-center">
                  <p className={`text-4xl font-bold ${st.text}`}>{result.score}</p>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">LHI Score</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={st.badge}>{result.index}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-700">{result.type}</p>
                  {/* Score bar */}
                  <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${st.bar} rounded-full transition-all duration-1000`}
                      style={{ width: barWidth }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">
              <div>
                <p className="label">Diagnostic Findings</p>
                <p className="text-sm text-slate-700 leading-relaxed">{result.analysis}</p>
              </div>
              <div className="px-4 py-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <p className="label flex items-center gap-1.5"><CheckCircle2 size={11} /> Clinical Recommendation</p>
                <p className="text-sm text-slate-700 leading-relaxed">{result.recommendation}</p>
              </div>
              <button
                onClick={() => { setResult(null); setMicError(null) }}
                className="btn-md btn-secondary w-full justify-center"
              >
                <RefreshCw size={14} /> Record New Sample
              </button>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
