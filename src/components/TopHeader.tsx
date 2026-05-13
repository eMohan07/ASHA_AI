import { Search, Bell, History } from 'lucide-react'
import AuthNav from './AuthNav'
import NotificationPopover from './NotificationPopover'

export default function TopHeader() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search patient ID or clinical history..." 
            className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-96 focus:ring-2 focus:ring-primary/20 outline-none" 
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 border-r border-slate-200 pr-4">
          <NotificationPopover />
          <button className="text-slate-500 hover:text-slate-800 transition-colors">
            <History size={20} />
          </button>
        </div>
        
        {/* Auth Section */}
        <AuthNav />
      </div>
    </header>
  )
}
