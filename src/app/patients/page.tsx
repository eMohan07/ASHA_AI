'use client'
import React, { useState, useEffect } from 'react'
import { Search, Filter, AlertTriangle, Clock, Activity, Users, Plus, Download, RefreshCw, Smartphone } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { syncToSupabase, getAllPatientsOffline } from '@/lib/offlineDB'

export default function PatientsPage() {
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [syncing, setSyncing] = useState(false)
  const [syncMsg, setSyncMsg] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const on = () => setIsOnline(true)
    const off = () => setIsOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    loadPatients()
    return () => { 
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off) 
    }
  }, [])

  async function loadPatients() {
    setLoading(true)
    try {
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setPatients(data || [])
        setLoadError(null)
      } else {
        const offlineData = await getAllPatientsOffline()
        offlineData.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        setPatients(offlineData)
        setLoadError(null)
      }
    } catch (err: any) {
      console.error('Failed to load patients:', err)
      setLoadError(err?.message || 'Failed to load patients. Database may be initializing.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSync() {
    setSyncing(true)
    setSyncMsg(null)
    try {
      await syncToSupabase(supabase)
      setSyncMsg('Sync complete!')
      loadPatients()
    } catch {
      setSyncMsg('Sync failed — check connection.')
    } finally {
      setSyncing(false)
      setTimeout(() => setSyncMsg(null), 3000)
    }
  }

  const filtered = patients.filter(p =>
    !search ||
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.village?.toLowerCase().includes(search.toLowerCase()) ||
    p.phone?.includes(search)
  )

  const offlineCount = patients.filter(p => p.synced === false).length

  return (
    <div className="space-y-8 animate-fade-in max-w-[1400px] mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Patient Registry</h1>
          <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
            <Users size={16} />
            {filtered.length} Active Records in Field Unit 04
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSync}
            disabled={syncing}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
              syncing ? 'bg-slate-100 text-slate-400' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
            {syncing ? 'Syncing...' : 'Sync Offline Data'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-900/10">
            <Plus size={18} />
            Enroll Patient
          </button>
        </div>
      </div>

      {/* Sync Message */}
      {syncMsg && (
        <div className={`px-4 py-3 rounded-xl border text-sm font-bold animate-fade-in ${syncMsg.includes('complete') ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
          {syncMsg}
        </div>
      )}

      {/* Status Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Network Status', value: isOnline ? 'Online' : 'Offline', icon: Activity, color: isOnline ? 'text-emerald-500' : 'text-amber-500', bg: isOnline ? 'bg-emerald-50/50' : 'bg-amber-50/50' },
          { label: 'Unsynced Records', value: offlineCount, icon: Smartphone, color: offlineCount > 0 ? 'text-blue-600' : 'text-slate-400', bg: 'bg-slate-50' },
          { label: 'Critical Triage', value: '08', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50/50' },
          { label: 'Avg Triage Time', value: '14 min', icon: Clock, color: 'text-slate-600', bg: 'bg-slate-50' },
        ].map(stat => (
          <div key={stat.label} className={`p-4 rounded-2xl border border-slate-100 ${stat.bg} flex items-center gap-4`}>
            <div className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <p className={`text-lg font-black tracking-tight ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Name, Village, ID, or Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-medium text-slate-800 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Clinical Subject</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Village / Unit</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Last Triage</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sync</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-400 font-bold uppercase tracking-widest text-sm">
                    Accessing Secure Datastore...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-slate-400 font-bold uppercase tracking-widest text-sm">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-sm border border-blue-100 group-hover:scale-105 transition-transform">
                          {p.name?.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-tight">{p.name}</p>
                          <p className="text-[11px] font-semibold text-slate-400 mt-1">{p.gender} • {p.age} years • ID: {p.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-slate-700">{p.village || 'Sector 04'}</p>
                      <p className="text-[11px] font-medium text-slate-400">Unit 7-G</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        p.status === 'Critical' ? 'bg-red-50 text-red-600 border border-red-100' :
                        p.status === 'Stabilized' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}>
                        {p.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 font-medium">
                      {p.created_at ? new Date(p.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-5">
                      {p.synced === false ? (
                        <div className="flex items-center gap-2 text-amber-500 font-bold text-[10px] uppercase tracking-widest">
                          <Smartphone size={12} /> Local
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-widest">
                          <Activity size={12} /> Synced
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
