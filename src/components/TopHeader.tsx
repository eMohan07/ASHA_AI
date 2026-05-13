import { Search, Bell, History } from 'lucide-react'

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
      <div className="flex items-center gap-6">
        <button className="bg-[#a03d31] hover:bg-[#863127] text-white text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-2">
          Register Patient
        </button>
        <div className="flex items-center gap-4 border-r border-slate-200 pr-6">
          <button className="text-slate-500 hover:text-slate-800 transition-colors">
            <Bell size={20} />
          </button>
          <button className="text-slate-500 hover:text-slate-800 transition-colors">
            <History size={20} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Dr. Aris Thorne" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 leading-tight">Dr. Aris Thorne</p>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Field Surgeon</p>
          </div>
        </div>
      </div>
    </header>
  )
}
