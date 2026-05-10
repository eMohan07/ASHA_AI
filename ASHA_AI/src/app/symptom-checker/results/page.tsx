'use client'

import React from 'react'
import { AlertTriangle, ChevronRight, Activity, Thermometer, Wind, BrainCircuit, CheckCircle2, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function TriageResults() {
  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#ffb4ab]/10 px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest text-[#ffb4ab] border border-[#ffb4ab]/20">
            <ShieldAlert size={12} />
            AI Diagnostic Alert
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Triage Assessment</h1>
          <p className="text-sm font-bold text-[#bac9cc] uppercase tracking-widest">
            Patient: Meena Devi (ID: PT-8924)
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-[#1e2024] p-4 rounded-sm border border-white/5">
          <div className="w-12 h-12 bg-red-500 rounded-sm flex items-center justify-center">
             <AlertTriangle size={24} className="text-[#111318]" />
          </div>
          <div>
            <div className="text-[10px] font-black text-[#bac9cc] uppercase tracking-widest">Calculated Risk Score</div>
            <div className="text-2xl font-black text-red-400 leading-none">84/100</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Diagnosis Card */}
          <div className="glass-card border-red-500/20 p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            
            <div className="space-y-2 relative z-10">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                <BrainCircuit className="text-red-400" size={24} />
                Suspected Pneumonia
              </h2>
              <p className="text-sm font-bold text-[#bac9cc] leading-relaxed">
                Based on linguistic patterns, symptom duration, and demographic data, the edge model indicates a high probability of bacterial pneumonia.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 relative z-10">
              <div className="bg-[#111318] p-4 rounded-sm border border-white/5">
                <div className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em] mb-2">Key Indicators</div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs font-bold text-white">
                    <CheckCircle2 size={12} className="text-red-400" />
                    Productive cough {'>'} 3 days
                  </li>
                  <li className="flex items-center gap-2 text-xs font-bold text-white">
                    <CheckCircle2 size={12} className="text-red-400" />
                    High grade fever
                  </li>
                </ul>
              </div>
              <div className="bg-[#111318] p-4 rounded-sm border border-white/5">
                <div className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em] mb-2">Confidence Level</div>
                <div className="text-3xl font-black text-white">92%</div>
                <div className="h-1.5 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-red-500 w-[92%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Protocol */}
          <div className="space-y-4">
            <div className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em] px-1">Action Required</div>
            <div className="space-y-3">
              {[
                { step: '1', title: 'Immediate Referral', desc: 'Patient requires chest X-Ray and antibiotic therapy.', critical: true },
                { step: '2', title: 'Oxygen Assessment', desc: 'Measure SpO2 levels if pulse oximeter is available.', critical: false },
                { step: '3', title: 'Isolate Patient', desc: 'Provide N95 mask to prevent potential spread.', critical: false }
              ].map(action => (
                <div key={action.step} className={cn(
                  "p-5 rounded-sm flex items-start gap-5 border",
                  action.critical ? "bg-red-500/10 border-red-500/20" : "glass-card border-white/5"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-sm flex items-center justify-center font-black text-sm",
                    action.critical ? "bg-red-500 text-[#111318]" : "bg-white/5 text-white"
                  )}>
                    {action.step}
                  </div>
                  <div>
                    <div className={cn("text-sm font-black uppercase tracking-widest", action.critical ? "text-red-400" : "text-white")}>
                      {action.title}
                    </div>
                    <div className="text-xs font-bold text-[#bac9cc] mt-1">{action.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-6 border-[#00e5ff]/20">
            <div className="text-[10px] font-black text-[#00e5ff] uppercase tracking-[0.2em]">Command Center Link</div>
            <div className="space-y-3">
              <Link 
                href="/alerts" 
                className="w-full bg-red-500 text-[#111318] py-4 rounded-sm font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-400 transition-all active:scale-95"
              >
                Send Emergency Alert
                <AlertTriangle size={16} />
              </Link>
              <button className="w-full bg-transparent border border-white/10 text-white py-4 rounded-sm font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/5 transition-all active:scale-95">
                Request Teleconsult
              </button>
            </div>
          </div>

          <div className="bg-[#111318] p-6 rounded-sm border border-white/5 space-y-4">
             <div className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em]">Contextual History</div>
             <div className="space-y-4">
               <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                 <span className="text-[#bac9cc] font-bold">Past Admissions</span>
                 <span className="text-white font-black">None</span>
               </div>
               <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                 <span className="text-[#bac9cc] font-bold">Known Allergies</span>
                 <span className="text-white font-black">Penicillin</span>
               </div>
               <div className="flex justify-between items-center text-xs">
                 <span className="text-[#bac9cc] font-bold">Vaccination</span>
                 <span className="text-white font-black">Up to date</span>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}
