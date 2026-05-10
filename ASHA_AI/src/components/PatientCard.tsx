'use client'
import Link from 'next/link'
<<<<<<< HEAD
=======
import { MapPin, Phone, ChevronRight, Clock, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)

export default function PatientCard({ patient }: { patient: any }) {
  const { id, name, age, gender, village, phone, created_at, synced } = patient

  const initials = name
    ? name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
      })
    : 'Unknown date'

  return (
    <Link href={`/patients/${id}`}>
<<<<<<< HEAD
      <div className="card hover:border-green-300 hover:shadow-md transition-all cursor-pointer group">
        <div className="flex items-start gap-3">

          {/* Avatar */}
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-green-700 font-semibold text-sm">{initials}</span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-green-700">
=======
      <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-green-200 transition-all cursor-pointer group mb-4">
        <div className="flex items-center gap-6">

          {/* Avatar */}
          <div className="w-14 h-14 bg-slate-50 text-slate-400 font-black text-sm rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-50 group-hover:text-green-700 transition-colors">
            {initials}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-black text-slate-900 text-lg truncate group-hover:text-green-700 transition-colors">
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
                {name}
              </h3>
              {/* Sync status */}
              {synced === false && (
<<<<<<< HEAD
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex-shrink-0">
                  Offline
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
              {age && (
                <span className="text-xs text-gray-500">{age} yrs</span>
              )}
              {gender && (
                <span className="text-xs text-gray-500 capitalize">{gender}</span>
              )}
              {village && (
                <span className="text-xs text-gray-500">📍 {village}</span>
              )}
            </div>

            {phone && (
              <div className="text-xs text-gray-400 mt-0.5">📞 {phone}</div>
            )}
          </div>

          {/* Date + arrow */}
          <div className="text-right flex-shrink-0">
            <div className="text-xs text-gray-400">{formattedDate}</div>
            <svg className="w-4 h-4 text-gray-300 group-hover:text-green-500 ml-auto mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
=======
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full flex-shrink-0 border border-amber-100">
                  <ShieldCheck size={10} />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em]">Local Cache</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Clock size={12} />
                {age ? `${age} yrs` : 'N/A'} · {gender || 'Other'}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <MapPin size={12} className="text-green-600" />
                {village || 'Central'}
              </div>
              {phone && (
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Phone size={12} />
                  {phone}
                </div>
              )}
            </div>
          </div>

          {/* Date + arrow */}
          <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{formattedDate}</div>
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-green-50 group-hover:text-green-700 group-hover:translate-x-1 transition-all">
               <ChevronRight size={18} />
            </div>
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
          </div>

        </div>
      </div>
    </Link>
  )
}
