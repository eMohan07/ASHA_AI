'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import PatientCard from '../../components/PatientCard'
import { supabase } from '../../lib/supabase'
import { getAllPatientsOffline, syncToSupabase } from '../../lib/offlineDB'
import { Search, Plus, RefreshCw, Users, Filter, CloudOff, CheckCircle2, Loader2 } from 'lucide-react'

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
