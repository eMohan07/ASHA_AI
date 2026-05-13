import Link from 'next/link'
import {
  Activity, MessageSquare, Wind, Users,
  ArrowUpRight, TrendingUp, TrendingDown,
  Heart, Zap, Calendar, Clock
} from 'lucide-react'

const tools = [
  {
    href: '/symptom-checker',
    icon: MessageSquare,
    label: 'Symptom AI',
    desc: 'AI triage in English, Hindi & Tamil. Instant severity assessment with referral guidance.',
    tag: 'Multilingual AI',
    iconBg: 'bg-blue-500',
    cardAccent: 'from-blue-500/5 to-transparent',
  },
  {
    href: '/health-monitor',
    icon: Activity,
    label: 'Health Monitor',
    desc: 'Log food intake and symptoms. Receive AI-generated risk scores and actionable reports.',
    tag: 'Risk Analysis',
    iconBg: 'bg-emerald-500',
    cardAccent: 'from-emerald-500/5 to-transparent',
  },
  {
    href: '/respiratory-assessment',
    icon: Wind,
    label: 'Respiratory AI',
    desc: 'Record patient cough for acoustic spectral analysis and Lung Health Index scoring.',
    tag: 'Audio Model',
    iconBg: 'bg-violet-500',
    cardAccent: 'from-violet-500/5 to-transparent',
  },
  {
    href: '/patients',
    icon: Users,
    label: 'Patient Registry',
    desc: 'Full offline-first patient records with automatic cloud sync when connected.',
    tag: 'Offline Ready',
    iconBg: 'bg-amber-500',
    cardAccent: 'from-amber-500/5 to-transparent',
  },
]

const stats = [
  { label: 'Total Patients',      value: '248',  delta: '+12',  up: true,  icon: Users,    color: 'text-blue-500',    bg: 'bg-blue-50' },
  { label: 'Assessments Today',   value: '14',   delta: '+3',   up: true,  icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Critical Referrals',  value: '2',    delta: '0',    up: false, icon: Heart,    color: 'text-red-500',     bg: 'bg-red-50' },
  { label: 'AI Accuracy Rate',    value: '94%',  delta: '+1.2%',up: true,  icon: Zap,      color: 'text-amber-500',   bg: 'bg-amber-50' },
]

const recent = [
  { name: 'Priya Devi',   age: 34, status: 'HIGH',     time: '12 min ago', village: 'Rampur' },
  { name: 'Kavitha R.',   age: 28, status: 'LOW',      time: '38 min ago', village: 'Nagercoil' },
  { name: 'Mohammed A.',  age: 51, status: 'CRITICAL',  time: '1 hr ago',   village: 'Sindhpur' },
  { name: 'Sunita B.',    age: 22, status: 'MEDIUM',    time: '2 hrs ago',  village: 'Khandwa' },
]

const BADGE: Record<string, string> = {
  LOW:      'badge-green',
  MEDIUM:   'badge-amber',
  HIGH:     'badge-orange',
  CRITICAL: 'badge-red',
}

export default function HomePage() {
  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ─── Page Header ─── */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            Frontline Dashboard
          </p>
          <h1 className="text-2xl font-bold text-slate-900">{greeting}, ASHA Worker</h1>
          <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-2">
            <Calendar size={13} /> Sector A · Regional Block 4
            <span className="text-slate-300">·</span>
            <Clock size={13} />
            {now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <Link href="/patients?action=new" className="btn-md btn-primary">
          + Register Patient
        </Link>
      </div>

      {/* ─── Stats Row ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center`}>
                  <Icon size={17} className={s.color} />
                </div>
                <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${s.up ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {s.delta}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mb-0.5">{s.value}</p>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* ─── Tools + Activity ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Tools grid */}
        <div className="xl:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 flex items-center justify-between">
            Clinical Tools
            <span className="text-xs font-normal text-slate-400">4 available</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tools.map((t) => {
              const Icon = t.icon
              return (
                <Link
                  key={t.href}
                  href={t.href}
                  className="card-hover group p-5 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${t.cardAccent} pointer-events-none`} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${t.iconBg} flex items-center justify-center shadow-sm`}>
                        <Icon size={18} className="text-white" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="badge-slate text-[10px]">{t.tag}</span>
                        <ArrowUpRight
                          size={15}
                          className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        />
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{t.label}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{t.desc}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Recent activity */}
        <div className="xl:col-span-1">
          <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center justify-between">
            Recent Assessments
            <Link href="/patients" className="text-xs font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5">
              View all <ArrowUpRight size={11} />
            </Link>
          </h2>
          <div className="card divide-y divide-slate-50">
            {recent.map((r, i) => (
              <div key={i} className="px-4 py-3.5 flex items-center gap-3 hover:bg-slate-50/50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                  {r.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{r.name}</p>
                  <p className="text-[11px] text-slate-400">{r.village} · {r.age} yrs</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`${BADGE[r.status]} text-[10px]`}>{r.status}</span>
                  <p className="text-[10px] text-slate-400 mt-1">{r.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ─── Quick actions ─── */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-slate-700 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/symptom-checker" className="btn-md btn-primary">
            <MessageSquare size={14} /> Start Triage
          </Link>
          <Link href="/respiratory-assessment" className="btn-md btn-secondary">
            <Wind size={14} /> Lung Check
          </Link>
          <Link href="/health-monitor" className="btn-md btn-secondary">
            <Activity size={14} /> Risk Assessment
          </Link>
          <Link href="/patients" className="btn-md btn-secondary">
            <Users size={14} /> Patient List
          </Link>
        </div>
      </div>

    </div>
  )
}
