'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Users, 
  UserPlus,
  Activity,
  AlertTriangle,
  Clock,
  Package,
  FileText,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar,
  Zap,
  Mic,
  ArrowUpRight,
  Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'

const stats = [
  { label: 'Total Patients', value: '1,284', change: '+12%', icon: Users, color: 'text-[#00e5ff]', bg: 'bg-[#00e5ff]/10' },
  { label: 'Pending Triage', value: '18', change: 'High Priority', icon: Activity, color: 'text-[#cdbdff]', bg: 'bg-[#cdbdff]/10' },
  { label: 'Follow-ups Today', value: '42', change: 'Due by 6pm', icon: Clock, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { label: 'Stock Level', value: 'Low', change: '5 Items', icon: Package, color: 'text-red-400', bg: 'bg-red-400/10' }
]

const recentActivity = [
  { id: 1, name: 'Lakshmi Bai', age: 28, village: 'Sector 4', status: 'High Risk', time: '10m ago', type: 'Maternal Care' },
  { id: 2, name: 'Rahul Sharma', age: 45, village: 'Sector 2', status: 'Healthy', time: '1h ago', type: 'General Checkup' },
  { id: 3, name: 'Sunita Devi', age: 34, village: 'Sector 4', status: 'Moderate', time: '3h ago', type: 'Respiratory' }
]

export default function WorkerDashboard() {
  return (
    <div className="p-6 lg:p-10 space-y-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Field Command</h1>
          <p className="text-xs font-bold text-[#bac9cc] uppercase tracking-widest flex items-center gap-2">
            <MapPin size={12} className="text-[#00e5ff]" />
            District: Alwar, Rajasthan • Cluster 12
          </p>
        </div>
        
        <div className="flex gap-3">
          <Link href="/sync" className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
            Last Sync: 2m ago
          </Link>
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest text-[#bac9cc]">
            ID: ASHA_2492
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-6 space-y-4 group hover:border-[#00e5ff]/20 transition-all">
            <div className="flex items-center justify-between">
              <div className={cn("p-2.5 rounded-sm", stat.bg)}>
                <stat.icon className={stat.color} size={20} />
              </div>
              <div className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-1 group-hover:text-white transition-colors">
                Details
                <ArrowUpRight size={10} />
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-white tracking-tighter">{stat.value}</div>
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-black text-[#bac9cc] uppercase tracking-[0.15em]">{stat.label}</div>
                <div className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-sm bg-white/5 uppercase tracking-tighter", stat.color)}>
                  {stat.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Actions Column */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-4">
            <div className="text-xs font-black text-[#bac9cc]/50 uppercase tracking-[0.2em] px-1">Quick Deployment</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'Register Patient', icon: UserPlus, href: '/patients/new', color: 'bg-[#00e5ff]' },
                { name: 'Start AI Triage', icon: Activity, href: '/symptom-checker/voice', color: 'bg-[#cdbdff]' },
                { name: 'Stock Inventory', icon: Package, href: '/supply-chain', color: 'bg-orange-400' },
                { name: 'View Alerts', icon: Bell, href: '/alerts', color: 'bg-red-400' }
              ].map((action) => (
                <Link 
                  key={action.name} 
                  href={action.href}
                  className="glass-card p-6 flex flex-col items-center justify-center gap-4 group hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <div className={cn("w-12 h-12 rounded-sm flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]", action.color)}>
                    <action.icon className="text-[#111318]" size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-tighter text-center leading-tight">{action.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="text-xs font-black text-[#bac9cc]/50 uppercase tracking-[0.2em]">Recent Diagnostics</div>
              <Link href="/patients" className="text-[10px] font-black text-[#00e5ff] uppercase tracking-widest hover:underline">View Directory</Link>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((patient) => (
                <div key={patient.id} className="glass-card p-5 flex items-center justify-between group hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-sm bg-mesh border border-white/5 flex items-center justify-center text-sm font-black text-white">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-black text-white uppercase tracking-tighter">{patient.name}</div>
                      <div className="text-[10px] font-bold text-[#bac9cc] uppercase tracking-widest mt-0.5">
                        {patient.age}y • {patient.village} • {patient.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className={cn(
                      "text-[9px] font-black px-2 py-1 rounded-sm uppercase tracking-widest border",
                      patient.status === 'High Risk' ? "bg-red-500/10 text-red-400 border-red-500/20" : 
                      patient.status === 'Moderate' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                      "bg-green-500/10 text-green-400 border-green-500/20"
                    )}>
                      {patient.status}
                    </div>
                    <div className="text-[10px] font-bold text-[#bac9cc]/50 uppercase tracking-tighter hidden md:block">
                      {patient.time}
                    </div>
                    <ChevronRight size={16} className="text-white/20 group-hover:text-[#00e5ff] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets Column */}
        <div className="space-y-8">
          
          {/* AI Insights Card */}
          <div className="glass-card bg-gradient-to-br from-[#1e2024] to-[#111318] p-8 space-y-6 relative overflow-hidden border border-[#00e5ff]/10">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap size={80} className="text-[#00e5ff]" />
            </div>
            
            <div className="space-y-2 relative z-10">
              <div className="text-[10px] font-black text-[#00e5ff] uppercase tracking-[0.2em]">AI Pulse Insight</div>
              <h3 className="text-xl font-bold text-white leading-tight">Maternal Health Risk Rising in Cluster 12</h3>
            </div>
            
            <p className="text-xs text-[#bac9cc] leading-relaxed relative z-10">
              Based on recent nutrition reports, 4 patients in your cluster are trending towards Iron deficiency. Consider prioritized home visits this week.
            </p>
            
            <button className="w-full btn-primary text-xs relative z-10">
              Generate Route Plan
            </button>
          </div>

          {/* Emergency Alert Widget */}
          <div className="space-y-4">
            <div className="text-xs font-black text-[#bac9cc]/50 uppercase tracking-[0.2em] px-1">Critical Alerts</div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-red-500 flex items-center justify-center animate-pulse">
                  <AlertTriangle className="text-[#111318]" size={20} />
                </div>
                <div>
                  <div className="text-xs font-black text-white uppercase tracking-tighter">3 Referrals Pending</div>
                  <div className="text-[10px] font-bold text-red-400/80 uppercase tracking-widest">Medical Officer Waiting</div>
                </div>
              </div>
              <Link href="/alerts" className="block w-full py-2 bg-red-500 text-[#111318] text-[10px] font-black uppercase tracking-widest text-center rounded-sm hover:bg-red-400 transition-colors">
                Action Referrals Now
              </Link>
            </div>
          </div>

          {/* Weather / Ambient Info */}
          <div className="glass-card p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Calendar className="text-[#cdbdff]" size={20} />
              <div>
                <div className="text-[10px] font-black text-white uppercase tracking-tighter">Monday, 10 May</div>
                <div className="text-[10px] font-bold text-[#bac9cc] uppercase tracking-widest mt-0.5">Visits Scheduled: 12</div>
              </div>
            </div>
            <div className="text-lg font-black text-white">32°C</div>
          </div>

        </div>

      </div>

    </div>
  )
}
