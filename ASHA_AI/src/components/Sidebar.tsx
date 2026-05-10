'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Activity, 
  Wind, 
  GraduationCap, 
  Package, 
  BarChart3, 
  Mic, 
  Zap,
  Home,
  Users,
  Bell,
  RefreshCcw,
  BarChart2,
  ShieldCheck,
  ChevronRight,
  Settings,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

const mainNav = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Patient Directory', href: '/patients', icon: Users },
  { name: 'Emergency Alerts', href: '/alerts', icon: Bell },
  { name: 'Public Health', href: '/analytics', icon: BarChart2 },
  { name: 'Clinical Center', href: '/admin', icon: ShieldCheck }
]

const aiSuite = [
  { name: 'AI Triage', href: '/symptom-checker/voice', icon: Activity },
  { name: 'Respiratory AI', href: '/respiratory-assessment', icon: Wind },
  { name: 'Inventory AI', href: '/supply-chain', icon: Package },
  { name: 'Digital Twin', href: '/digital-twin', icon: Zap },
  { name: 'Sync Engine', href: '/sync', icon: RefreshCcw }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-72 bg-[#111318] border-r border-white/5 h-screen sticky top-0 flex-col overflow-hidden">
      {/* Brand Header */}
      <div className="p-8 border-b border-white/5 bg-[#0a0c10]">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00e5ff] rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Activity className="text-[#00363d]" size={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-white uppercase tracking-tighter leading-none">ASHA AI</span>
            <span className="text-[10px] font-bold text-[#00e5ff] uppercase tracking-widest mt-1">Companion</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-10 scrollbar-hide">
        
        {/* Core Nav */}
        <div className="space-y-4">
          <div className="px-4 text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em]">
            Primary Care
          </div>
          <div className="space-y-1">
            {mainNav.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className={cn(
                    "group flex items-center justify-between px-4 py-3 rounded-sm text-xs font-bold transition-all",
                    isActive 
                      ? "bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20" 
                      : "text-[#bac9cc] hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={16} className={isActive ? "text-[#00e5ff]" : "text-[#bac9cc] group-hover:text-white"} />
                    <span className="uppercase tracking-widest">{item.name}</span>
                  </div>
                  {isActive && <ChevronRight size={14} />}
                </Link>
              )
            })}
          </div>
        </div>

        {/* AI Suite */}
        <div className="space-y-4">
          <div className="px-4 text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em]">
            AI Intelligence
          </div>
          <div className="space-y-1">
            {aiSuite.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className={cn(
                    "group flex items-center justify-between px-4 py-3 rounded-sm text-xs font-bold transition-all",
                    isActive 
                      ? "bg-[#7c4dff]/10 text-[#cdbdff] border border-[#7c4dff]/20" 
                      : "text-[#bac9cc] hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={16} className={isActive ? "text-[#cdbdff]" : "text-[#bac9cc] group-hover:text-white"} />
                    <span className="uppercase tracking-widest">{item.name}</span>
                  </div>
                  {isActive && <ChevronRight size={14} />}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* User / Settings Footer */}
      <div className="p-6 border-t border-white/5 space-y-4 bg-[#0a0c10]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-mesh border border-white/10 flex items-center justify-center text-white font-black text-xs">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black text-white uppercase tracking-tighter truncate">Jyoti Devi</div>
            <div className="text-[10px] font-bold text-[#00e5ff] uppercase tracking-widest opacity-70">ASHA #2492</div>
          </div>
          <Settings size={16} className="text-[#bac9cc] hover:text-white cursor-pointer transition-colors" />
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-sm border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-[#bac9cc] hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all">
          <LogOut size={14} />
          End Session
        </button>
      </div>
    </aside>
  )
}
