'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Bell, RefreshCcw, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'Patients', href: '/patients', icon: Users },
  { name: 'Triage', href: '/symptom-checker/voice', icon: Activity },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Sync', href: '/sync', icon: RefreshCcw }
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
      <div className="bg-[#1e2024]/80 backdrop-blur-xl border border-white/10 rounded-2xl h-20 px-6 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1.5 transition-all duration-300 relative",
                isActive ? "text-[#00e5ff]" : "text-[#bac9cc] hover:text-white"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                isActive && "bg-[#00e5ff]/20 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
              )}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.name}</span>
              
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-[#00e5ff] rounded-full shadow-[0_0_10px_#00e5ff]" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
