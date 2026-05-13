import React from 'react'
import { Search, Filter, ChevronLeft, ChevronRight, AlertTriangle, Clock, Activity, Users } from 'lucide-react'

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [syncing, setSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const on = () => setIsOnline(true)
    const off = () => setIsOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  useEffect(() => { loadPatients() }, [])

  async function loadPatients() {
    setLoading(true)
    try {
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        // Online: fetch from Supabase
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setPatients(data || [])
        setLoadError(null)
      } else {
        // Offline: fetch from IndexedDB
        const offlineData = await getAllPatientsOffline()
        offlineData.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        setPatients(offlineData)
        setLoadError(null)
      }
    } catch (err: any) {
      console.error('Failed to load patients:', err)
      setLoadError(err?.message || 'Failed to load patients. The database table may not exist yet.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSync() {
    setSyncing(true); setSyncMsg(null)
    try {
      await syncToSupabase()
      setSyncMsg('Sync complete!')
      loadPatients()
    } catch {
      setSyncMsg('Sync failed — check your connection.')
    } finally {
      setSyncing(false)
      setTimeout(() => setSyncMsg(null), 3000)
    }
  }

  const filtered = patients.filter(p =>
    !query ||
    p.name?.toLowerCase().includes(query.toLowerCase()) ||
    p.village?.toLowerCase().includes(query.toLowerCase()) ||
    p.phone?.includes(query)
  )

  const offline = patients.filter(p => p.synced === false).length

export default function PatientRegistry() {
  return (
    <div className="space-y-6 animate-fade-in max-w-[1200px] mx-auto">
      
      {/* ─── Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0f172a] tracking-tight">Patient Registry</h1>
          <p className="text-slate-600 text-base mt-1">Active field roster for Sector 7-G</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-md p-1 border border-slate-200">
            <button className="px-4 py-1.5 text-sm font-semibold bg-white text-slate-900 rounded-md shadow-sm">All Patients</button>
            <button className="px-4 py-1.5 text-sm font-semibold text-slate-600 rounded-md">Recent</button>
            <button className="px-4 py-1.5 text-sm font-semibold text-slate-600 rounded-md">Flagged</button>
          </div>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-semibold text-slate-700 flex items-center gap-2 hover:bg-slate-50">
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      {/* ─── Table ─── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Details</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Vitals</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Unit/Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${p.initialsBg}`}>
                        {p.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{p.name}</p>
                        <p className="text-xs text-slate-500">ID: {p.id} • {p.age}y, {p.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.riskColor.replace('text-', 'bg-')}`} />
                      <span className={`text-sm font-semibold ${p.riskColor}`}>{p.risk}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">BP</p>
                         <p className="text-sm font-bold text-slate-900">{p.bp}</p>
                       </div>
                       <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase">HR</p>
                         <p className="text-sm font-bold text-slate-900">{p.hr} <span className="text-[10px] font-normal text-slate-400">bpm</span></p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {p.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Error banner */}
      {loadError && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex items-start gap-2">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium">Database error</p>
            <p className="text-red-600 mt-0.5">{loadError}</p>
            <p className="text-red-500 mt-1 text-xs">👉 Create the <strong>patients</strong> table in your Supabase dashboard first.</p>
          </div>
        </div>
      )}

      {/* Offline banner */}
      {isMounted && !navigator.onLine && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-700">
          You are offline. Showing locally saved patients.
        </div>
      )}

      {/* Search + filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name, village, or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>
        <button className="btn-md btn-secondary gap-2">
          <Filter size={14} /> Filter
        </button>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total',   value: patients.length,               color: 'text-slate-900' },
          { label: 'Offline', value: offline,                        color: offline > 0 ? 'text-amber-600' : 'text-slate-900' },
          { label: 'Results', value: filtered.length,               color: 'text-emerald-600' },
        ].map(s => (
          <div key={s.label} className="card px-4 py-3 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] text-slate-400 font-medium">{s.label}</p>
          </div>
        </div>
      </div>

      {/* ─── Bottom Stats ─── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Total Enrolled</p>
          <p className="text-2xl font-bold text-slate-900 mb-2">1,204</p>
          <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1"><Activity size={12} /> +12% this month</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Critical Cases</p>
          <p className="text-2xl font-bold text-red-600 mb-2">08</p>
          <p className="text-xs font-semibold text-red-600 flex items-center gap-1"><AlertTriangle size={12} /> Action Required</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Avg. Triage Time</p>
          <p className="text-2xl font-bold text-slate-900 mb-2">14 <span className="text-sm font-medium text-slate-500">min</span></p>
          <p className="text-xs font-semibold text-slate-500 flex items-center gap-1"><Clock size={12} /> Stable efficiency</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-200">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">System Health</p>
          <p className="text-2xl font-bold text-amber-600 mb-2">Optimum</p>
          <p className="text-xs font-semibold text-emerald-600 flex items-center gap-1"><Activity size={12} /> Sync active</p>
        </div>
      </div>

    </div>
  )
}
