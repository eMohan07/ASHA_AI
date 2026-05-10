<<<<<<< HEAD
import React from 'react';
import SupplyChainDashboard from '@/components/SupplyChainDashboard';

export default function SupplyChainPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supply Chain AI</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Predictive inventory management to eliminate stock-outs before they happen, 
          restoring patient trust at scale.
        </p>
      </div>
      
      <SupplyChainDashboard />
    </div>
  );
=======
'use client'

import React from 'react'
import { Package, TrendingDown, TrendingUp, AlertTriangle, Box, Truck, BarChart2, ShieldCheck, CheckCircle2, Activity, BrainCircuit } from 'lucide-react'
import { cn } from '@/lib/utils'

const inventoryData = [
  { item: 'Amoxicillin 500mg', category: 'Antibiotics', current: 450, minRequired: 500, status: 'Critical', trend: -12, daysLeft: 4 },
  { item: 'IFA Tablets (Iron)', category: 'Nutrition', current: 1200, minRequired: 800, status: 'Optimal', trend: +5, daysLeft: 24 },
  { item: 'ORS Packets', category: 'Rehydration', current: 320, minRequired: 400, status: 'Warning', trend: -8, daysLeft: 7 },
  { item: 'Paracetamol 250mg', category: 'Analgesics', current: 890, minRequired: 500, status: 'Optimal', trend: +2, daysLeft: 18 }
]

export default function SupplyChainAI() {
  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#00e5ff]/10 px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest text-[#00e5ff] border border-[#00e5ff]/20">
            <Package size={12} />
            Supply Chain Intelligence
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Inventory Predictor</h1>
          <p className="text-sm font-bold text-[#bac9cc] uppercase tracking-widest">
            AI-driven stockout forecasting for frontline medicine distribution.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="bg-[#00e5ff] text-[#00363d] px-6 py-3 rounded-sm font-black text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(0,229,255,0.2)] hover:bg-[#00daf3] transition-colors flex items-center gap-2">
            <Truck size={14} />
            Request Resupply
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Overall Inventory Health', value: '78%', status: 'Warning', icon: Activity, color: 'text-orange-400', bg: 'bg-orange-500/10' },
          { label: 'Predicted Stockouts', value: '2 Items', status: 'Next 7 Days', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
          { label: 'Supply Chain Efficiency', value: '94%', status: 'Optimal', icon: TrendingUp, color: 'text-[#00e5ff]', bg: 'bg-[#00e5ff]/10' }
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
              <div className="text-[10px] font-bold text-[#bac9cc] uppercase tracking-widest mt-1">{kpi.status}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Inventory List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-[#bac9cc]/50 uppercase tracking-[0.2em]">Live Inventory Telemetry</h2>
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#bac9cc] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Live Sync Active
            </div>
          </div>

          <div className="glass-card border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#111318]/50 border-b border-white/5 text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-widest">
                    <th className="p-4">Item & Category</th>
                    <th className="p-4">Current Stock</th>
                    <th className="p-4">Threshold</th>
                    <th className="p-4">Prediction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {inventoryData.map((row) => (
                    <tr key={row.item} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="text-sm font-black text-white uppercase tracking-tighter">{row.item}</div>
                        <div className="text-[10px] font-bold text-[#bac9cc] uppercase tracking-widest">{row.category}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-black text-white">{row.current}</div>
                        <div className={cn(
                          "text-[10px] font-bold uppercase tracking-widest flex items-center gap-1",
                          row.trend > 0 ? "text-green-400" : "text-red-400"
                        )}>
                          {row.trend > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                          {Math.abs(row.trend)}%
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-bold text-[#bac9cc]">{row.minRequired}</div>
                      </td>
                      <td className="p-4">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest border",
                          row.status === 'Critical' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                          row.status === 'Warning' ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                          "bg-green-500/10 text-green-400 border-green-500/20"
                        )}>
                          {row.status === 'Critical' ? <AlertTriangle size={10} /> : <CheckCircle2 size={10} />}
                          {row.daysLeft} Days Left
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* AI Insight Panel */}
        <div className="space-y-6">
          <h2 className="text-sm font-black text-[#bac9cc]/50 uppercase tracking-[0.2em]">Predictive Insights</h2>
          
          <div className="glass-card border-red-500/20 p-6 space-y-6 relative overflow-hidden bg-gradient-to-b from-red-500/5 to-transparent">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <AlertTriangle size={64} className="text-red-500" />
            </div>
            
            <div className="space-y-2 relative z-10">
               <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-400">
                 <BrainCircuit size={12} />
                 Action Required
               </div>
               <h3 className="text-xl font-bold text-white leading-tight">Amoxicillin Stockout Imminent</h3>
            </div>
            
            <p className="text-xs font-bold text-[#bac9cc] leading-relaxed relative z-10">
               Due to a recent 15% spike in suspected respiratory cases in Cluster 12, current Amoxicillin stocks will be depleted in 4 days.
            </p>
            
            <div className="relative z-10 space-y-3">
              <button className="w-full bg-red-500 text-[#111318] py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-red-400 transition-colors">
                Approve Auto-Restock
              </button>
              <button className="w-full bg-transparent border border-white/10 text-white py-3 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-colors">
                View Disease Trend
              </button>
            </div>
          </div>

          <div className="bg-[#111318] border border-white/5 p-6 rounded-sm space-y-4">
             <div className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em]">Restock Logistics</div>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#bac9cc] font-bold">Nearest Hub</span>
                  <span className="text-white font-black">PHC Alwar</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#bac9cc] font-bold">Est. Delivery</span>
                  <span className="text-white font-black">Tomorrow, 10:00 AM</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#bac9cc] font-bold">Route Status</span>
                  <span className="text-green-400 font-black flex items-center gap-1"><CheckCircle2 size={12} /> Clear</span>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  )
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
}
