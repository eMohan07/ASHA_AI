'use client'
import Link from 'next/link'
import { MapPin, Phone, Calendar, ChevronRight, Wifi, WifiOff } from 'lucide-react'

export default function PatientCard({ patient }: { patient: any }) {
  const { id, name, age, gender, village, phone, created_at, synced } = patient

  const initials = name
    ? name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : '??'

  const formattedDate = created_at
    ? new Date(created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'Unknown'

  const avatarColors = [
    'from-blue-400 to-indigo-500',
    'from-emerald-400 to-teal-500',
    'from-violet-400 to-purple-500',
    'from-amber-400 to-orange-500',
    'from-rose-400 to-pink-500',
  ]
  const colorIdx = name ? name.charCodeAt(0) % avatarColors.length : 0

  return (
    <Link href={`/patients/${id}`} className="block group">
      <div className="card-hover p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarColors[colorIdx]} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm`}>
            {initials}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-slate-900 text-sm truncate group-hover:text-emerald-700 transition-colors">
                {name}
              </h3>
              <ChevronRight size={15} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>

            <p className="text-xs text-slate-400 mt-0.5">
              {gender || 'Unknown'} · {age ? `${age} years` : 'Age N/A'}
            </p>

            <div className="mt-3 space-y-1.5">
              {village && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin size={11} className="text-slate-400 shrink-0" />
                  <span className="truncate">{village}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Phone size={11} className="text-slate-400 shrink-0" />
                  <span>{phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Calendar size={10} />
            {formattedDate}
          </div>
          {synced === false ? (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              <WifiOff size={9} /> Offline
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
              <Wifi size={9} /> Synced
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
