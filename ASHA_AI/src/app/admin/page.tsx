'use client'

import React from 'react'
import { Activity, Users, AlertTriangle, ShieldCheck, TrendingUp, MapPin, Search, Bell, Clock, ChevronRight, Stethoscope } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const activeAlerts = [
  { id: 'ALT-101', patient: 'Meena Devi', aia: 'ASHA-2492', location: 'Cluster 12', risk: '92%', condition: 'Suspected Pneumonia', time: '10m ago' },
  { id: 'ALT-102', patient: 'Ramesh Patel', aia: 'ASHA-2495', location: 'Cluster 08', risk: '88%', condition: 'Acute Gastroenteritis', time: '45m ago' }
]

const fieldWorkers = [
  { id: 'ASHA-2492', name: 'Jyoti Devi', location: 'Cluster 12', status: 'Active', patients: 14, sync: '2m ago' },
  { id: 'ASHA-2493', name: 'Sarita Sharma', location: 'Cluster 12', status: 'Offline', patients: 8, sync: '4h ago' },
  { id: 'ASHA-2495', name: 'Kiran Verma', location: 'Cluster 08', status: 'Active', patients: 22, sync: '1m ago' },
]

export default function DoctorDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#00e5ff]/10 px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest text-[#00e5ff] border border-[#00e5ff]/20">
            <ShieldCheck size={12} />
            Clinical Command Center
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Medical Officer Dashboard</h1>
          <div className="flex items-center gap-4 text-sm font-bold text-[#bac9cc] uppercase tracking-widest">
            <span>Dr. Rajesh Kumar</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>Region: Rajasthan North</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button className="bg-[#1e2024] border border-white/10 px-4 py-3 rounded-sm text-xs font-black uppercase tracking-widest text-white hover:bg-white/5 transition-colors flex items-center gap-2">
            <Bell size={16} />
            Notifications <span className="bg-red-500 text-[#111318] px-1.5 rounded-sm ml-2">3</span>
          </button>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'High Risk Patients', value: '18', sub: '+2 since yesterday', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
          { label: 'Active Field Workers', value: '42/45', sub: '93% Coverage', icon: Users, color: 'text-[#00e5ff]', bg: 'bg-[#00e5ff]/10' },
          { label: 'AI Triage Accuracy', value: '96.2%', sub: 'Last 30 days', icon: Activity, color: 'text-[#cdbdff]', bg: 'bg-[#cdbdff]/10' },
          { label: 'Pending Consults', value: '5', sub: 'Average wait: 14m', icon: Clock, color: 'text-orange-400', bg: 'bg-orange-500/10' }
        ].map(kpi => (
          <div key={kpi.label} className="glass-card p-6 flex flex-col justify-between h-36">
            <div className="flex items-start justify-between">
              <div className={cn("p-2 rounded-sm", kpi.bg)}>
                <kpi.icon size={18} className={kpi.color} />
              </div>
              <div className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-widest text-right">
                {kpi.label}
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">{kpi.value}</div>
              <div className="text-[10px] font-bold text-[#bac9cc] uppercase tracking-widest mt-1">{kpi.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Critical Alerts Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-[#bac9cc]/50 uppercase tracking-[0.2em]">Priority Escalations</h2>
            <Link href="/alerts" className="text-[10px] font-black text-[#00e5ff] uppercase tracking-widest hover:underline">View All Pipeline</Link>
          </div>
          
          <div className="space-y-4">
            {activeAlerts.map(alert => (
              <div key={alert.id} className="bg-[#111318] border border-red-500/20 rounded-sm p-6 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 blur-[50px] -mr-24 -mt-24 pointer-events-none" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-widest">
                         AI Confidence: {alert.risk}
                       </span>
                       <span className="text-[10px] font-bold text-[#bac9cc] uppercase tracking-widest flex items-center gap-1">
                         <Clock size={10} /> {alert.time}
                       </span>
                    </div>
                    <div>
                      <div className="text-xl font-black text-white uppercase tracking-tighter">{alert.patient}</div>
                      <div className="text-sm font-bold text-[#bac9cc] uppercase tracking-widest mt-1">
                        {alert.condition}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Users size={12} /> {alert.aia}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {alert.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col gap-3 w-full md:w-auto">
                     <button className="flex-1 md:flex-none bg-red-500 text-[#111318] py-3 px-6 rounded-sm font-black text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:bg-red-400 transition-colors">
                       Approve Transport
                     </button>
                     <button className="flex-1 md:flex-none bg-[#1e2024] border border-white/10 text-white py-3 px-6 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-colors">
                       Review AI Logs
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Field Worker Status */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-[#bac9cc]/50 uppercase tracking-[0.2em]">Fleet Telemetry</h2>
          </div>
          
          <div className="glass-card border-white/5 divide-y divide-white/5">
            <div className="p-4 bg-[#111318]/50">
              <div className="bg-[#111318] border border-white/10 flex items-center px-3 py-2 rounded-sm w-full">
                <Search size={14} className="text-[#bac9cc]/50" />
                <input 
                  type="text" 
                  placeholder="Filter ASHA Workers" 
                  className="bg-transparent border-none focus:outline-none text-[10px] font-bold uppercase tracking-widest text-white px-2 w-full placeholder-[#bac9cc]/30"
                />
              </div>
            </div>
            
            {fieldWorkers.map(worker => (
              <div key={worker.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-white/5 rounded-sm flex items-center justify-center text-[10px] font-black text-white">
                      {worker.name.charAt(0)}
                    </div>
                    <div className={cn(
                      "absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-[#1e2024]",
                      worker.status === 'Active' ? "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" : "bg-slate-500"
                    )} />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white uppercase tracking-widest">{worker.name}</div>
                    <div className="text-[9px] font-bold text-[#bac9cc] uppercase tracking-widest">{worker.id} • {worker.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-white">{worker.patients}</div>
                  <div className="text-[8px] font-bold text-[#bac9cc]/50 uppercase tracking-widest">Today</div>
                </div>
              </div>
            ))}
            
            <div className="p-4 bg-[#111318]/50">
               <button className="w-full py-2 text-[10px] font-black text-[#00e5ff] uppercase tracking-widest hover:bg-[#00e5ff]/5 rounded-sm transition-colors">
                 View Full Map
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
