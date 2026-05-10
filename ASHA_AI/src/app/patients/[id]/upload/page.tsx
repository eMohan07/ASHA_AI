'use client'

import React, { useState } from 'react'
import { Camera, Upload, FileText, CheckCircle2, ChevronLeft, Scan, Search, Loader2 } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function OCRUpload() {
  const router = useRouter()
  const params = useParams()
  const [status, setStatus] = useState<'idle' | 'uploading' | 'scanning' | 'done'>('idle')
  const [preview, setPreview] = useState<string | null>(null)

  const handleUpload = () => {
    setStatus('uploading')
    // Simulate process
    setTimeout(() => {
      setStatus('scanning')
      setTimeout(() => {
        setStatus('done')
      }, 3000)
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      
      {/* Header */}
      <div className="flex flex-col gap-6">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Scan size={12} />
            Smart OCR
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Upload Documents</h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Scan prescriptions, lab reports, or health IDs. The AI will extract vitals 
            and medical history to the patient's record.
          </p>
        </div>
      </div>

      {/* Upload Interface */}
      <div className="bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/50 overflow-hidden">
        
        {status === 'idle' ? (
          <div className="p-12 flex flex-col items-center text-center space-y-8">
             <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 mb-2">
                <FileText size={40} strokeWidth={2.5} />
             </div>
             <div className="space-y-2">
               <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">No document selected</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                 Supports JPG, PNG, and PDF (Max 10MB)
               </p>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
               <button 
                 onClick={handleUpload}
                 className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
               >
                 <Camera size={24} className="text-slate-400 group-hover:text-emerald-600" />
                 <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Use Camera</span>
               </button>
               <button 
                 onClick={handleUpload}
                 className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group"
               >
                 <Upload size={24} className="text-slate-400 group-hover:text-emerald-600" />
                 <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Browse Files</span>
               </button>
             </div>
          </div>
        ) : (
          <div className="relative">
            {/* Simulated Scanning UI */}
            <div className="aspect-[3/4] bg-slate-900 relative flex items-center justify-center">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-40"></div>
               
               {status === 'scanning' && (
                 <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
               )}

               <div className="relative z-10 text-center space-y-4">
                  {status === 'uploading' && <Loader2 size={48} className="text-white animate-spin mx-auto" />}
                  {status === 'scanning' && <Search size={48} className="text-white animate-pulse mx-auto" />}
                  {status === 'done' && <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />}
                  
                  <div className="text-white font-black text-lg uppercase tracking-widest">
                    {status === 'uploading' && 'Uploading...'}
                    {status === 'scanning' && 'Scanning Document...'}
                    {status === 'done' && 'Scan Complete'}
                  </div>
               </div>
            </div>

            {status === 'done' && (
               <div className="p-8 space-y-6 bg-white animate-in slide-in-from-bottom-8 duration-500">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Extracted</span>
                       <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">98% Accuracy</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Heart Rate</span>
                          <span className="text-lg font-black text-slate-900">72 BPM</span>
                       </div>
                       <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">SPO2</span>
                          <span className="text-lg font-black text-slate-900">98%</span>
                       </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => router.push(`/patients/${params.id}`)}
                    className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-base shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all"
                  >
                    SAVE TO MEDICAL RECORD
                  </button>
               </div>
            )}
          </div>
        )}

      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(400px); }
          100% { transform: translateY(0); }
        }
      `}</style>

    </div>
  )
}
