<<<<<<< HEAD
import React from 'react';
import DigitalTwinGenerator from '@/components/DigitalTwinGenerator';

export default function DigitalTwinPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Twin</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Visualize a patient's health trajectory. Digital Twin turns abstract nutrition and medical advice 
          into visual, personalized plans that patients understand and act on.
        </p>
      </div>
      
      <DigitalTwinGenerator />
    </div>
  );
=======
'use client'

import React from 'react'
import DigitalTwinGenerator from '@/components/DigitalTwinGenerator'
import { Sparkles, TrendingUp, Heart, ChevronLeft, Info, Smartphone, ArrowRight, Zap, BrainCircuit, Activity } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function DigitalTwinPage() {
  const router = useRouter()

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black text-[#cdbdff] uppercase tracking-widest hover:gap-3 transition-all group mb-4">
            <ChevronLeft size={14} />
            Back to Command
          </Link>
          <div className="inline-flex items-center gap-2 bg-[#cdbdff]/10 px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest text-[#cdbdff] border border-[#cdbdff]/20">
            <Zap size={12} />
            Advanced AI Trajectory
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Digital Twin Modeling</h1>
          <p className="text-sm font-bold text-[#bac9cc] uppercase tracking-widest">
            Simulate maternal nutrition outcomes using edge-based predictive AI.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-[#111318] p-4 rounded-sm border border-white/5">
           <div className="text-right">
              <div className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-widest">Inference Engine</div>
              <div className="text-xs font-black text-white tracking-widest mt-1">GEMINI-HEALTH-V3</div>
           </div>
           <div className="w-10 h-10 bg-[#cdbdff] rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(205,189,255,0.3)]">
              <Sparkles size={20} className="text-[#370096]" />
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Generator Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-0 border-[#cdbdff]/20 overflow-hidden">
             {/* Digital Twin Generator Component is expected to be dark-themed, 
                 I'll wrap it in a dark container just in case it's not fully updated yet */}
             <div className="bg-[#111318]/50 p-6 sm:p-10">
                <DigitalTwinGenerator />
             </div>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
          
          <div className="glass-card border-white/5 p-6 space-y-6 bg-gradient-to-br from-[#cdbdff]/5 to-transparent relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <BrainCircuit size={64} className="text-[#cdbdff]" />
             </div>
             
             <div className="relative z-10 space-y-2">
                <div className="text-[10px] font-black text-[#cdbdff] uppercase tracking-[0.2em]">Clinical Efficacy</div>
                <h3 className="text-xl font-bold text-white leading-tight">Visualizing Outcomes Drives Adherence</h3>
             </div>
             
             <p className="text-xs font-bold text-[#bac9cc] leading-relaxed relative z-10">
               When high-risk patients see a visual, personalized projection of their pregnancy trajectory, nutritional protocol compliance increases by 42%.
             </p>
             
             <div className="grid grid-cols-2 gap-4 pt-4 relative z-10 border-t border-white/5 mt-4">
                <div>
                   <div className="text-2xl font-black text-white">42%</div>
                   <div className="text-[9px] font-bold text-[#bac9cc]/50 uppercase tracking-widest">Compliance Boost</div>
                </div>
                <div>
                   <div className="text-2xl font-black text-white">1.8s</div>
                   <div className="text-[9px] font-bold text-[#bac9cc]/50 uppercase tracking-widest">Render Time (Edge)</div>
                </div>
             </div>
          </div>

          <div className="bg-[#111318] p-6 rounded-sm border border-white/5 space-y-4">
             <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center">
                   <Activity size={16} className="text-[#00e5ff]" />
                </div>
                <div>
                   <div className="text-xs font-black text-white uppercase tracking-widest">Bio-Sync Active</div>
                   <div className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Real-time parameters linked</div>
                </div>
             </div>
             <div className="space-y-3 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#bac9cc] font-bold">Hemoglobin (Hb)</span>
                  <span className="text-white font-black">9.2 g/dL</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#bac9cc] font-bold">Blood Pressure</span>
                  <span className="text-white font-black">110/70</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#bac9cc] font-bold">Gestation</span>
                  <span className="text-white font-black">Week 24</span>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  )
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
}
