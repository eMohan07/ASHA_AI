"use client"
import React, { useState, useEffect, useRef } from 'react'
import { Mic, Square, Loader2, Play, Pause, Upload, Settings, RotateCcw, Zap, TrendingUp, CheckCircle2, AlertTriangle, FileText, ChevronRight, Activity, Info, ArrowRight } from 'lucide-react'

export default function RespiratoryAnalyzer() {
  const [isRecording, setIsRecording]     = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isAnalyzing, setIsAnalyzing]     = useState(false)
  const [result, setResult]               = useState<any>(null)
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
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      streamRef.current = stream
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      audioContext.createMediaStreamSource(stream).connect(analyser)
      audioContextRef.current = audioContext
      analyserRef.current = analyser
      drawWaveform()
      setIsRecording(true)
      setResult(null)
    } catch (err: any) {
      console.error(err)
    }
  }

  const stopMicrophone = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    audioContextRef.current?.close().catch(() => {})
    setIsRecording(false)
    setAmplitude(0)
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

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      
      const sliceW = canvas.width / 30
      let x = 0
      for (let i = 0; i < 30; i++) {
        const v = dataArray[i * 4] || 128
        const height = Math.max(10, Math.abs(v - 128) * 2)
        
        // Randomly color some bars rust red or dark blue for visual effect from the design
        ctx.strokeStyle = i % 7 === 0 ? '#9e3b33' : i % 5 === 0 ? '#0f172a' : '#cbd5e1'
        
        ctx.beginPath()
        ctx.moveTo(x + sliceW/2, canvas.height/2 - height/2)
        ctx.lineTo(x + sliceW/2, canvas.height/2 + height/2)
        ctx.stroke()
        x += sliceW
      }
    }
    render()
  }

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/analyze-cough', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coughType: 'Acoustic waveform analysis from microphone',
          duration: recordingTime + ' seconds'
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({
        index: 'Error',
        score: 0,
        analysis: 'Failed to analyze recording.',
        recommendation: 'Please try again.'
      });
    } finally {
      setIsAnalyzing(false)
    }
  }

  const fmt = (s: number) => `00:${String(Math.min(s, 30)).padStart(2, '0')}`

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 animate-fade-in">

      {/* ─── Breadcrumbs & Header ─── */}
      <div>
        <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-2 uppercase tracking-wider">
          Clinical Tools <ChevronRight size={12} /> <span className="text-slate-900">Respiratory Diagnostic Tool</span>
        </p>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0f172a] tracking-tight">Lung Health Analysis</h1>
            <p className="text-slate-600 text-base mt-1">Real-time acoustic analysis and AI diagnostic assistant.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-200/50 rounded-full border border-slate-200">
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            <span className="text-xs font-bold text-slate-700">Device Connected: CL-Steth V4</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ─── Left Column: Audio Acquisition ─── */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mic size={20} /> Audio Acquisition
            </h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-full hover:bg-slate-50">Clear</button>
              <button className="px-4 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-full hover:bg-slate-50">Settings</button>
            </div>
          </div>

          <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 flex flex-col items-center justify-center py-12 relative overflow-hidden">
            <canvas ref={canvasRef} width={400} height={100} className="mb-4 w-full max-w-[400px] opacity-80" />
            
            {/* Mock static waveform if not recording */}
            {!isRecording && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] flex items-center justify-center gap-1.5 pointer-events-none opacity-40">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className={`w-2 rounded-full ${i % 5 === 0 ? 'bg-[#9e3b33] h-12' : i % 3 === 0 ? 'bg-[#0f172a] h-16' : 'bg-slate-400 h-8'}`} />
                ))}
              </div>
            )}

            <div className="bg-slate-200/80 px-4 py-1 rounded-full text-xs font-bold text-slate-600 backdrop-blur-sm z-10">
              {fmt(recordingTime)} / 00:30 SEC
            </div>
            
            <div className="flex items-center gap-4 mt-8 z-10">
              <button className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-transform active:scale-95">
                <Upload size={18} />
              </button>
              <button 
                onClick={isRecording ? stopMicrophone : startMicrophone}
                className={`w-16 h-16 ${isRecording ? 'bg-[#9e3b33]' : 'bg-[#0f172a]'} rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95`}
              >
                {isRecording ? <Square size={24} className="fill-current" /> : <Mic size={24} />}
              </button>
              <button className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-transform active:scale-95">
                <Square size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Gain</p>
                <p className="text-sm font-bold text-slate-900">+12dB</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Filter</p>
                <p className="text-sm font-bold text-slate-900">High-Pass 50Hz</p>
              </div>
            </div>
            <button 
              onClick={runAnalysis}
              disabled={isRecording || isAnalyzing}
              className="px-6 py-2.5 bg-[#0f172a] hover:bg-slate-800 text-white rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors disabled:opacity-50"
            >
              {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Activity size={16} />}
              {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
            </button>
          </div>
        </div>

        {/* ─── Right Column: Patient & Insight ─── */}
        <div className="space-y-6 flex flex-col">
          {/* Patient Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex gap-4 mb-6">
              <div className="relative">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Patient" className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-400 border-2 border-white rounded-full flex items-center justify-center text-white font-bold text-[10px]">!</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">Marcus T. Vance</h3>
                <p className="text-xs text-slate-500 mb-1.5">ID: 4492-BX-0</p>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded">62 Y/O</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">ASTHMA HX</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-500">Last Diagnostic</span>
                <span className="text-sm font-bold text-slate-900">14 Oct 2023</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-500">Primary Symptom</span>
                <span className="text-sm font-bold text-slate-900">Dyspnea</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs font-semibold text-slate-500">Assigned Unit</span>
                <span className="text-sm font-bold text-slate-900">Chest Clinic C</span>
              </div>
            </div>
          </div>

          {/* Real-time Insight */}
          <div className="bg-[#1e293b] rounded-xl p-6 shadow-sm text-white flex-1 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} className="text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Real-time Insight</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Preliminary detection shows rhythmic wheezing patterns in the lower-left lobe. Consider checking SP02 saturation levels before final diagnostic submission.
            </p>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-slate-700 pt-4">
              <span className="text-xs font-bold text-slate-400">AI CONFIDENCE: <span className="text-white">88%</span></span>
              <Info size={14} className="text-slate-500" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Diagnostic Report Generation ─── */}
      {result && (
        <div className="mt-8 animate-slide-up">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Diagnostic Report Generation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-slate-500 uppercase">Lung Health Index</p>
                <Activity size={16} className="text-[#9e3b33]" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">{result.score} <span className="text-sm font-semibold text-slate-500">/ 100</span></p>
              <p className="text-xs font-semibold text-[#9e3b33]">AI Computed Score</p>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-slate-500 uppercase">Sound Clarity</p>
                <CheckCircle2 size={16} className="text-slate-900" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">94 <span className="text-sm font-semibold text-slate-500">%</span></p>
              <p className="text-xs font-semibold text-slate-600">Optimal Acquisition</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 relative">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-slate-500 uppercase">AI Classification</p>
                <AlertTriangle size={16} className="text-amber-500" />
              </div>
              <p className="text-lg font-bold text-slate-900 mb-1 leading-tight">{result.index.toUpperCase()}</p>
              <p className="text-xs font-semibold text-amber-600">Pattern Match Found</p>
              
              <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#9e3b33] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                <FileText size={20} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Acoustic Analysis Details</p>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                {result.analysis}
              </p>
            </div>

            <div className="flex-1 bg-amber-50 rounded-xl p-5 border border-amber-100">
              <p className="text-xs font-bold text-amber-800 mb-3">Clinical Suggestion</p>
              <div className="flex items-start gap-2 text-sm text-amber-900 font-medium">
                  <ArrowRight size={16} className="mt-0.5 shrink-0" />
                  <p className="leading-relaxed">{result.recommendation}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
              Download PDF
            </button>
            <button className="px-6 py-2.5 bg-[#0f172a] text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors">
              Finalize & Save to EHR
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
