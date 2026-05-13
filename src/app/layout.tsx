import type { Metadata } from 'next'
import './globals.css'
import SidebarNav from '../components/SidebarNav'
import TopHeader from '../components/TopHeader'

export const metadata: Metadata = {
  title: 'CareLink Pro — Field Unit 04',
  description: 'Clinical overview and patient management system',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#fcfcfd] min-h-screen text-slate-900 flex overflow-hidden">
        <SidebarNav />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <TopHeader />
          <main className="flex-1 overflow-y-auto scrollbar-thin p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
