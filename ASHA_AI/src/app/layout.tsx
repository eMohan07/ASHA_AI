import type { Metadata } from 'next'
import './globals.css'
<<<<<<< HEAD
import Link from 'next/link'
import NotificationPopover from '../components/NotificationPopover'

export const metadata: Metadata = {
  title: 'ASHA AI',
  description: 'Empowering frontline health workers with AI-assisted tools',
=======
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import { Activity } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ASHA AI Health Companion',
  description: 'Clinical-grade AI diagnostics for frontline health workers.',
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
}

export default function RootLayout({
  children,
<<<<<<< HEAD
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">

        {/* ── Navbar ── */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div>
                <span className="text-green-700 font-bold text-base">ASHA AI</span>
                <span className="hidden sm:block text-xs text-gray-400 leading-none">
                  Frontline Health Assistant
                </span>
              </div>
            </Link>

            {/* Nav links */}
            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/patients"
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg font-medium transition-colors"
              >
                Patients
              </Link>
              <Link
                href="/symptom-checker"
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg font-medium transition-colors"
              >
                Symptom Checker
              </Link>
              <NotificationPopover />
            </div>

          </div>
        </nav>

        {/* Page content */}
        <main className="max-w-5xl mx-auto px-4 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-12 py-6 text-center text-xs text-gray-400">
          ASHA AI — Built for rural frontline health workers · Hackathon 2025
        </footer>

=======
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-[#111318]">
        {/* Fixed Desktop Sidebar */}
        <Sidebar />
        
        {/* Main Scrollable Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          
          {/* Top Global Header (Visible on Desktop) */}
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

          <main className="flex-1 pb-24 lg:pb-0 relative z-10">
            {children}
          </main>
          
          {/* Mobile Navigation */}
          <MobileNav />
        </div>
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
      </body>
    </html>
  )
}
<<<<<<< HEAD

=======
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
