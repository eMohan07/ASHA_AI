import type { Metadata } from 'next'
import './globals.css'
import SidebarNav from '../components/SidebarNav'

export const metadata: Metadata = {
  title: 'ASHA AI — Frontline Health Intelligence',
  description: 'AI-powered clinical tools for frontline community health workers across rural India',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased">
        <div className="flex h-screen overflow-hidden">
          <SidebarNav />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
