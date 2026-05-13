import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import { Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ASHA AI Health Companion',
  description: 'Clinical-grade AI diagnostics for frontline health workers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-[#111318]">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 relative">
          <header className="hidden lg:flex h-20 border-b border-white/5 px-8 items-center justify-between sticky top-0 bg-[#111318]/80 backdrop-blur-md z-40">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#bac9cc]">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                Network: 4G Connectivity Stable
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#bac9cc]">
                Location: Sector 4, Gurgaon
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group cursor-pointer">
                <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold group-hover:bg-[#00e5ff]/10 group-hover:border-[#00e5ff]/30 transition-all">
                  <Activity size={18} />
                </div>
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-[#111318] rounded-full" />
              </div>
            </div>
          </header>

          <main className="flex-1 pb-24 lg:pb-0 relative z-10">{children}</main>

          <MobileNav />
        </div>
      </body>
    </html>
  )
}

