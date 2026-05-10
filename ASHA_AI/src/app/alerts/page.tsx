'use client'

import React, { useState } from 'react'
import { AlertTriangle, Clock, MapPin, Phone, Activity, Search, Filter, ShieldAlert, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const referrals = [
  { id: 'REF-8924', patient: 'Meena Devi', age: 45, village: 'Sector 4', status: 'Pending Transport', priority: 'Critical', time: '10m ago', condition: 'Suspected Pneumonia' },
  { id: 'REF-8921', patient: 'Lakshmi Bai', age: 28, village: 'Sector 2', status: 'Doctor Assigned', priority: 'High', time: '1h ago', condition: 'Maternal Complication' },
  { id: 'REF-8919', patient: 'Rahul Kumar', age: 12, village: 'Sector 4', status: 'En Route', priority: 'High', time: '2h ago', condition: 'Severe Malaria' },
  { id: 'REF-8915', patient: 'Sunita Sharma', age: 62, village: 'Sector 1', status: 'Admitted', priority: 'Moderate', time: '5h ago', condition: 'Hypertension' },
]

export default function AlertsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-red-500/10 px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest text-red-400 border border-red-500/20">
            <ShieldAlert size={12} />
            Emergency Protocol
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Referral Queue</h1>
          <p className="text-sm font-bold text-[#bac9cc] uppercase tracking-widest">
            Manage active medical escalations and transport logistics.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-[#111318] border border-white/10 flex items-center px-4 py-3 rounded-sm w-full md:w-64">
            <Search size={16} className="text-[#bac9cc]/50" />
            <input 
              type="text" 
              placeholder="Search ID or Name" 
              className="bg-transparent border-none focus:outline-none text-xs font-bold text-white px-3 w-full placeholder-[#bac9cc]/30"
            />
          </div>
          <button className="bg-[#1e2024] border border-white/10 p-3 rounded-sm text-[#bac9cc] hover:text-white transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-white/5">
        {['All', 'Critical', 'Pending Transport', 'Admitted'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-6 py-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors relative",
              activeFilter === filter ? "text-[#00e5ff]" : "text-[#bac9cc]/50 hover:text-[#bac9cc]"
            )}
          >
            {filter}
            {activeFilter === filter && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]" />
            )}
          </button>
        ))}
      </div>

      {/* Referral List */}
      <div className="space-y-4">
        {referrals.map((ref) => (
          <div key={ref.id} className="glass-card flex flex-col md:flex-row border border-white/5 hover:border-white/10 transition-colors group">
            
            {/* Status Column */}
            <div className={cn(
              "p-6 md:w-48 flex flex-col justify-center gap-2 border-b md:border-b-0 md:border-r border-white/5",
              ref.priority === 'Critical' ? "bg-red-500/5" : "bg-[#111318]/50"
            )}>
              <div className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-widest">{ref.id}</div>
              <div className={cn(
                "inline-flex self-start items-center gap-1.5 px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest border",
                ref.priority === 'Critical' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                ref.priority === 'High' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
              )}>
                {ref.priority === 'Critical' && <AlertTriangle size={10} />}
                {ref.priority}
              </div>
            </div>

            {/* Patient Info */}
            <div className="p-6 flex-1 flex flex-col justify-center space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-xl font-black text-white uppercase tracking-tighter">{ref.patient}</div>
                  <div className="text-xs font-bold text-[#bac9cc] uppercase tracking-widest">{ref.age} Yrs</div>
                </div>
                <div className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-widest flex items-center gap-1">
                  <Clock size={12} />
                  {ref.time}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-xs font-bold text-[#bac9cc]">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-[#00e5ff]" />
                  {ref.village}
                </div>
                <div className="flex items-center gap-1.5">
                  <Activity size={14} className="text-[#cdbdff]" />
                  {ref.condition}
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="p-6 md:w-64 flex flex-col justify-center gap-3 bg-[#111318]/50 border-t md:border-t-0 md:border-l border-white/5">
              <div className="text-[10px] font-black text-[#bac9cc] uppercase tracking-widest mb-1">{ref.status}</div>
              {ref.status === 'Pending Transport' && (
                <button className="w-full bg-[#00e5ff] text-[#00363d] py-3 rounded-sm font-black text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:bg-[#00daf3] transition-colors flex items-center justify-center gap-2">
                  <Phone size={12} />
                  Dispatch Ambulance
                </button>
              )}
              {ref.status === 'Doctor Assigned' && (
                <button className="w-full bg-[#cdbdff]/10 text-[#cdbdff] border border-[#cdbdff]/30 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-[#cdbdff]/20 transition-colors flex items-center justify-center gap-2">
                  View Doctor Notes
                  <ArrowRight size={12} />
                </button>
              )}
               {(ref.status === 'En Route' || ref.status === 'Admitted') && (
                <button className="w-full bg-white/5 text-[#bac9cc] border border-white/10 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  View Status
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
