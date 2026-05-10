'use client'

import React, { useState } from 'react'
import { Activity, BarChart2, TrendingUp, TrendingDown, Map, ShieldAlert, FileText, CheckCircle2, ChevronDown, DownloadCloud, BrainCircuit } from 'lucide-react'
import { cn } from '@/lib/utils'

const diseases = [
  { name: 'Pneumonia', cases: 145, trend: '+12%', status: 'Warning', risk: 'High' },
  { name: 'Diarrhea', cases: 89, trend: '-5%', status: 'Stable', risk: 'Medium' },
  { name: 'Malaria', cases: 34, trend: '+2%', status: 'Stable', risk: 'Medium' },
  { name: 'Tuberculosis', cases: 12, trend: '0%', status: 'Monitoring', risk: 'High' },
]

export default function PublicHealthAnalytics() {
  const [timeRange, setTimeRange] = useState('Last 30 Days')

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#cdbdff]/10 px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest text-[#cdbdff] border border-[#cdbdff]/20">
            <BarChart2 size={12} />
            Population Health
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Epidemiology Dashboard</h1>
          <p className="text-sm font-bold text-[#bac9cc] uppercase tracking-widest">
            AI-powered disease surveillance and outbreak prediction.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="bg-[#111318] border border-white/10 px-4 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/5 transition-colors flex items-center gap-2">
              {timeRange} <ChevronDown size={14} />
            </button>
          </div>
          <button className="bg-[#00e5ff] text-[#00363d] px-6 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:bg-[#00daf3] transition-colors flex items-center gap-2">
            <DownloadCloud size={14} />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Assessments', value: '4,892', change: '+14% vs last mo', icon: FileText, color: 'text-[#00e5ff]', bg: 'bg-[#00e5ff]/10' },
          { label: 'Outbreak Alerts', value: '2', change: 'Action Required', icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/10' },
          { label: 'AI Accuracy', value: '97.4%', change: 'Clinical Grade', icon: CheckCircle2, color: 'text-[#cdbdff]', bg: 'bg-[#cdbdff]/10' },
          { label: 'Active Clusters', value: '18', change: '85% Coverage', icon: Map, color: 'text-green-400', bg: 'bg-green-500/10' }
        ].map(kpi => (
          <div key={kpi.label} className="glass-card p-6 flex flex-col justify-between h-36">
            <div className="flex items-start justify-between">
              <div className={cn("p-2 rounded-sm", kpi.bg)}>
                <kpi.icon size={18} className={kpi.color} />
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">{kpi.value}</div>
              <div className="flex items-center justify-between mt-1">
                 <div className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-widest">{kpi.label}</div>
                 <div className="text-[9px] font-bold text-[#bac9cc] uppercase tracking-widest">{kpi.change}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Chart Area (Simulated) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card border-white/5 p-8 space-y-8">
             <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-black text-white uppercase tracking-widest">Regional Disease Spread</h2>
                  <p className="text-[10px] font-bold text-[#bac9cc] uppercase tracking-widest mt-1">Confirmed vs AI Predicted Cases</p>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                   <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#00e5ff]" /> Confirmed</div>
                   <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#cdbdff]" /> Predicted</div>
                </div>
             </div>

             {/* Simulated Chart */}
             <div className="h-64 flex items-end justify-between gap-2 border-b border-white/10 pb-4 relative">
                {/* Y-Axis lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-4">
                  {[100, 75, 50, 25, 0].map(val => (
                    <div key={val} className="flex items-center gap-4 w-full opacity-20">
                      <span className="text-[9px] font-bold text-[#bac9cc] w-6 text-right">{val}</span>
                      <div className="h-px bg-[#bac9cc] flex-1" />
                    </div>
                  ))}
                </div>

                <div className="w-6" /> {/* Spacer for Y-axis */}
                
                {[45, 60, 40, 75, 85, 65, 90, 80, 50, 70, 85, 95].map((val, i) => (
                  <div key={i} className="w-full flex justify-center group relative z-10">
                     <div 
                       className="w-full max-w-[24px] bg-gradient-to-t from-[#00e5ff]/50 to-[#00e5ff] rounded-t-sm transition-all group-hover:opacity-80"
                       style={{ height: `${val}%` }}
                     />
                     <div 
                       className="w-full max-w-[24px] absolute bottom-0 bg-[#cdbdff]/30 border-t-2 border-[#cdbdff] rounded-t-sm"
                       style={{ height: `${val + 15}%`, zIndex: -1 }}
                     />
                  </div>
                ))}
             </div>
             
             {/* X-Axis */}
             <div className="flex justify-between pl-10 pr-2 text-[9px] font-bold text-[#bac9cc] uppercase tracking-widest">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
             </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-sm space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-sm bg-red-500 flex items-center justify-center animate-pulse">
                   <ShieldAlert size={16} className="text-[#111318]" />
                 </div>
                 <div className="text-xs font-black text-white uppercase tracking-widest">Outbreak Alert</div>
              </div>
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider leading-relaxed">
                Pneumonia cases in Cluster 12 exceeding expected threshold by 24%. Recommended mobilizing mobile health unit.
              </p>
            </div>
            <div className="glass-card border-white/5 p-6 rounded-sm space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-sm bg-[#cdbdff]/20 flex items-center justify-center">
                   <BrainCircuit size={16} className="text-[#cdbdff]" />
                 </div>
                 <div className="text-xs font-black text-white uppercase tracking-widest">AI Insight</div>
              </div>
              <p className="text-[10px] font-bold text-[#bac9cc] uppercase tracking-wider leading-relaxed">
                Correlating recent respiratory spikes with declining air quality index (AQI &gt; 300) in northern sectors.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Data */}
        <div className="space-y-6">
          <h2 className="text-sm font-black text-[#bac9cc]/50 uppercase tracking-[0.2em]">Disease Surveillance</h2>
          
          <div className="glass-card border-white/5 divide-y divide-white/5">
            {diseases.map((disease) => (
              <div key={disease.name} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div>
                  <div className="text-sm font-black text-white uppercase tracking-widest">{disease.name}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="text-xs font-bold text-[#bac9cc]">{disease.cases} Cases</div>
                    <div className={cn(
                      "text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-widest border flex items-center gap-1",
                      disease.trend.startsWith('+') && disease.status === 'Warning' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                      disease.trend.startsWith('-') ? "bg-green-500/10 text-green-400 border-green-500/20" :
                      "bg-white/5 text-[#bac9cc] border-white/10"
                    )}>
                      {disease.trend.startsWith('+') ? <TrendingUp size={8} /> : disease.trend.startsWith('-') ? <TrendingDown size={8} /> : null}
                      {disease.trend}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    disease.status === 'Warning' ? "text-red-400" : "text-[#bac9cc]"
                  )}>{disease.status}</div>
                  <div className="text-[9px] font-bold text-[#bac9cc]/50 uppercase tracking-widest mt-1">
                    Risk: {disease.risk}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#111318] p-6 rounded-sm border border-white/5 space-y-6">
             <div className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em]">Data Quality</div>
             <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1.5">
                    <span className="text-white">Offline Sync Completion</span>
                    <span className="text-[#00e5ff]">98%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00e5ff] w-[98%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1.5">
                    <span className="text-white">Voice Transcription Accuracy</span>
                    <span className="text-[#cdbdff]">94%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#cdbdff] w-[94%]" />
                  </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}
