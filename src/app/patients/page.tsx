'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import PatientCard from '../../components/PatientCard'
import { supabase } from '../../lib/supabase'
import { getAllPatientsOffline, syncToSupabase } from '../../lib/offlineDB'
import { Search, Plus, RefreshCw, Users, Filter, CloudOff, CheckCircle2, Loader2 } from 'lucide-react'

export default function PatientsPage() {
  const [patients, setPatients]     = useState<any[]>([])
  const [loading, setLoading]       = useState(true)
  const [syncing, setSyncing]       = useState(false)
  const [syncMsg, setSyncMsg]       = useState<string | null>(null)
  const [query, setQuery]           = useState('')
  const [isOnline, setIsOnline]     = useState(true)

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
      if (isOnline) {
        const { data } = await supabase.from('patients').select('*').order('created_at', { ascending: false })
        if (data?.length) { setPatients(data); return }
      }
    } catch {}
    try {
      const offline = await getAllPatientsOffline()
      setPatients(offline || [])
    } catch { setPatients([]) }
    finally { setLoading(false) }
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

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Users size={16} className="text-emerald-600" />
            <h1 className="text-lg font-bold text-slate-900">Patient Registry</h1>
          </div>
          <p className="text-xs text-slate-500">
            {patients.length} patients · {isOnline ? (
              <span className="text-emerald-600 font-medium">Online</span>
            ) : (
              <span className="text-amber-600 font-medium flex items-center gap-1 inline-flex"><CloudOff size={10} /> Offline mode</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {offline > 0 && (
            <button
              onClick={handleSync}
              disabled={syncing || !isOnline}
              className="btn-sm btn-secondary gap-1.5"
            >
              {syncing ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
              Sync {offline > 0 && `(${offline})`}
            </button>
          )}
          <Link href="/patients/new" className="btn-md btn-primary">
            <Plus size={14} /> New Patient
          </Link>
        </div>
      </div>

      {/* Sync message */}
      {syncMsg && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium animate-slide-up ${
          syncMsg.includes('failed') ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
        }`}>
          <CheckCircle2 size={15} />
          {syncMsg}
        </div>
      )}

      {/* Search + filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name, village, or phone..."
            value={query}
            onChange={e => setQuery(e.target.value)}
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
        ))}
      </div>

      {/* Patient grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
          <Loader2 size={24} className="animate-spin" />
          <p className="text-sm">Loading patients...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(p => <PatientCard key={p.id} patient={p} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
            <Users size={28} className="text-slate-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              {query ? 'No patients match your search' : 'No patients yet'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {query ? 'Try a different name or village' : 'Register your first patient to get started'}
            </p>
          </div>
          {!query && (
            <Link href="/patients/new" className="btn-md btn-primary">
              <Plus size={14} /> Register First Patient
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
