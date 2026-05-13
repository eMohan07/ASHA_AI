'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, MessageSquare,
  Activity, Wind, BookOpen, AlertCircle,
  Bell, ChevronRight, Dot
} from 'lucide-react'

const nav = [
  { href: '/',                       label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/patients',               label: 'Patients',       icon: Users },
  { href: '/symptom-checker',        label: 'Symptom AI',     icon: MessageSquare },
  { href: '/health-monitor',         label: 'Health Monitor', icon: Activity },
  { href: '/respiratory-assessment', label: 'Respiratory AI', icon: Wind },
  { href: '/health-education',       label: 'Education',      icon: BookOpen },
]

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 gradient-slate flex flex-col h-screen sticky top-0 overflow-hidden">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg glow-emerald">
            <Activity size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">ASHA AI</p>
            <p className="text-slate-400 text-[10px] font-medium">Health Intelligence</p>
          </div>
        </div>
      </div>

      {/* Worker card */}
      <div className="mx-4 mt-4 px-3 py-3 rounded-xl bg-white/5 border border-white/8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            AW
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">ASHA Worker</p>
            <p className="text-slate-400 text-[10px] truncate">Sector A · Online</p>
          </div>
          <Dot size={20} className="text-emerald-400 shrink-0 animate-pulse" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
        <p className="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Main Menu
        </p>
        {nav.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link key={href} href={href} className={active ? 'nav-item-active' : 'nav-item'}>
              <Icon size={15} className={active ? 'text-emerald-400' : ''} />
              <span>{label}</span>
              {active && <ChevronRight size={13} className="ml-auto text-slate-500" />}
            </Link>
          )
        })}
      </nav>

      {/* Emergency */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <button className="w-full btn-sm btn-danger justify-center rounded-xl py-2.5">
          <AlertCircle size={13} />
          Emergency Referral
        </button>
        <p className="text-center text-[10px] text-slate-600">v2.4.1 · Last sync 2m ago</p>
      </div>
    </aside>
  )
}
