'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
<<<<<<< HEAD
import PatientCard from '../../components/PatientCard'
import { supabase } from '../../lib/supabase'
import { getAllPatientsOffline, syncToSupabase } from '../../lib/offlineDB'

export default function PatientsPage() {
=======
import PatientCard from '@/components/PatientCard'
import { supabase } from '@/lib/supabase'
import { getAllPatientsOffline, syncToSupabase } from '@/lib/offlineDB'
import { Search, PlusCircle, RefreshCcw, UserPlus, Users, Loader2, ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function PatientsPage() {
  const router = useRouter()
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [syncing, setSyncing] = useState(false)
<<<<<<< HEAD
  const [syncMessage, setSyncMessage] = useState<string | null>(null)
=======
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    loadPatients()
  }, [])

  async function loadPatients() {
    setLoading(true)
    try {
      if (typeof navigator !== 'undefined' && navigator.onLine) {
<<<<<<< HEAD
        // Online: fetch from Supabase
=======
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .order('created_at', { ascending: false })
<<<<<<< HEAD

        if (error) throw error
        setPatients(data || [])
      } else {
        // Offline: fetch from IndexedDB
=======
        if (error) throw error
        setPatients(data || [])
      } else {
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
        const offlineData = await getAllPatientsOffline()
        offlineData.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        setPatients(offlineData)
      }
    } catch (err) {
      console.error('Failed to load patients:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleSync() {
    setSyncing(true)
<<<<<<< HEAD
    setSyncMessage(null)
    try {
      const result = await syncToSupabase(supabase)
      setSyncMessage(`Synced ${result.synced} patient(s). ${result.failed > 0 ? `${result.failed} failed.` : ''}`)
      await loadPatients()
    } catch (err) {
      setSyncMessage('Sync failed. Please try again.')
=======
    try {
      await syncToSupabase(supabase)
      await loadPatients()
    } catch (err) {
      console.error('Sync failed:', err)
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
    } finally {
      setSyncing(false)
    }
  }

  const filtered = patients.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.village?.toLowerCase().includes(search.toLowerCase())
  )

  return (
<<<<<<< HEAD
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Patients</h1>
          <p className="text-sm text-gray-500">{patients.length} total records</p>
        </div>
        <Link href="/patients/new" className="btn-primary">
          + Add Patient
        </Link>
      </div>

      {/* Search + Sync row */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by name or village..."
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          className="input-field flex-1"
        />
=======
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors mb-6"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <Users size={12} />
            Community Records
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Patient Directory</h1>
          <p className="text-slate-500 font-medium leading-relaxed mt-2">
            Managing <span className="text-slate-900 font-bold">{patients.length} records</span> across your assigned villages.
          </p>
        </div>
        <Link 
          href="/patients/new" 
          className="bg-green-700 hover:bg-green-600 text-white px-8 py-5 rounded-[2rem] font-black text-sm shadow-xl shadow-green-200 transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          <UserPlus size={20} />
          ADD PATIENT
        </Link>
      </div>

      {/* Search & Sync Row */}
      <div className="flex gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search by name or village..."
            value={search}
            onChange={(e: any) => setSearch(e.target.value)}
            className="w-full bg-white border-2 border-slate-100 focus:border-blue-600 rounded-[2rem] py-5 pl-14 pr-6 text-base font-bold text-slate-900 shadow-sm transition-all outline-none"
          />
        </div>
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
        {isMounted && navigator.onLine && (
          <button
            onClick={handleSync}
            disabled={syncing}
<<<<<<< HEAD
            className="btn-secondary flex-shrink-0"
          >
            {syncing ? 'Syncing...' : 'Sync'}
=======
            className="w-16 sm:w-auto bg-white border-2 border-slate-100 hover:border-blue-600 px-6 rounded-[2rem] shadow-sm transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <RefreshCcw size={20} className={cn(syncing && "animate-spin text-blue-600")} />
            <span className="hidden sm:inline font-black text-xs uppercase tracking-widest text-slate-900">Sync Data</span>
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
          </button>
        )}
      </div>

<<<<<<< HEAD
      {/* Sync message */}
      {syncMessage && (
        <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          {syncMessage}
        </div>
      )}

      {/* Offline banner */}
      {isMounted && !navigator.onLine && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-700">
          You are offline. Showing locally saved patients.
        </div>
      )}

      {/* Patient list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-2 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">👥</div>
          <h3 className="font-semibold text-gray-700">
            {search ? 'No patients found' : 'No patients yet'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {search ? 'Try a different search term' : 'Add your first patient to get started'}
          </p>
          {!search && (
            <Link href="/patients/new" className="btn-primary inline-block mt-4">
              Add First Patient
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
=======
      {/* Patient List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 text-slate-400">
            <Loader2 size={40} className="animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-widest">Loading clinical records...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white border border-slate-100 rounded-[3rem] shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
               <Users size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
              {search ? 'No patients found' : 'Directory is empty'}
            </h3>
            <p className="text-slate-500 font-medium text-sm">
              {search ? 'Try searching for a different name or village.' : 'Start by adding your first patient profile.'}
            </p>
            {!search && (
              <Link href="/patients/new" className="inline-block mt-8 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">
                Add First Patient
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {filtered.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        )}
      </div>
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)

    </div>
  )
}
