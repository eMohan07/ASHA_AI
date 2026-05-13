'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users,
  Activity, BookOpen,
  LogOut, Plus, MessageSquare
} from 'lucide-react'

const nav = [
  { href: '/',                       label: 'Dashboard',      icon: LayoutDashboard },
  { href: '/patients',               label: 'Patients',       icon: Users },
  { href: '/symptom-checker',        label: 'Symptom AI',     icon: MessageSquare },
  { href: '/respiratory-assessment', label: 'Clinical Tools', icon: Activity },
  { href: '/health-education',       label: 'Education',      icon: BookOpen },
]

export default function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 bg-[#f8f9fa] border-r border-slate-200 flex flex-col h-screen sticky top-0 overflow-hidden">
      {/* Logo */}
      <div className="px-8 pt-8 pb-6">
        <h1 className="text-xl font-bold text-slate-900 leading-tight tracking-tight">CareLink Pro</h1>
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mt-1">Field Unit 04</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto scrollbar-thin">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link 
              key={href} 
              href={href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                active 
                  ? 'bg-[#e5edff] text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              <Icon size={18} className={active ? 'text-slate-900' : 'text-slate-500'} strokeWidth={active ? 2.5 : 2} />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-6 pb-8 pt-4 space-y-4">
        <Link href="/patients/new" className="w-full bg-[#0f172a] hover:bg-slate-800 text-white shadow-md justify-center rounded-xl py-3 flex items-center gap-2 text-sm font-medium transition-colors">
          <Plus size={16} />
          Start New Triage
        </Link>
        
        {/* Profile */}
        <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60 pb-2">
          <div className="w-10 h-10 rounded-full bg-[#e5edff] flex items-center justify-center font-bold text-[#0f172a]">
            AT
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">Dr. Aris Thorne</p>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide truncate">Field Surgeon</p>
          </div>
        </div>

        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            <LogOut size={16} className="text-slate-400" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
