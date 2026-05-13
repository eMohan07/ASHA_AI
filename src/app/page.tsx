'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  Users, FileText, Send, Activity,
  HeartPulse, Wind, Brain, MessageSquare, Lightbulb,
  ArrowRight, CheckCircle2, ChevronDown, ChevronUp
} from 'lucide-react'

const stats = [
  { label: 'Active Patients', value: '1,284', suffix: '+12%', icon: Users, iconColor: 'text-blue-500', iconBg: 'bg-blue-100' },
  { label: 'Assessments', value: '42', suffix: '3 urgent', suffixColor: 'text-red-500', icon: FileText, iconColor: 'text-red-500', iconBg: 'bg-red-100' },
  { label: 'Referrals', value: '18', suffix: 'this week', icon: Send, iconColor: 'text-amber-600', iconBg: 'bg-amber-100' },
]

const recentActivity = [
  { 
    patient: 'Patient #8294 (S. Mehta)', 
    desc: 'Abnormal HR (118 bpm) detected via ASHA Remote Monitor.',
    details: 'Patient has a history of hypertension. The remote monitor detected a sustained heart rate of 118 bpm over a 15-minute period. Recommend immediate follow-up and possible adjustment of beta-blocker dosage.',
    time: '2 mins ago',
    icon: HeartPulse,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-100'
  },
  { 
    patient: 'K. Roberts', 
    desc: 'Submitted Daily Wellness Survey - Mentions increased fatigue.',
    details: 'Survey indicates a score of 8/10 for fatigue, up from 3/10 last week. Also reports mild shortness of breath. Review respiratory trends and schedule a tele-consultation.',
    time: '15 mins ago',
    icon: FileText,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100'
  },
  { 
    patient: 'Triage #0412', 
    desc: 'Completed by Field Worker: Sarah J. Stable status confirmed.',
    details: 'Routine maternal health checkup completed. Blood pressure is 120/80, fetal heart rate is normal. No signs of pre-eclampsia. Next visit scheduled in 2 weeks.',
    time: '1 hour ago',
    icon: CheckCircle2,
    iconColor: 'text-slate-500',
    iconBg: 'bg-slate-200'
  },
]

export default function HomePage() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly'>('monthly')
  const [expandedPatient, setExpandedPatient] = useState<number | null>(null)

  const togglePatient = (index: number) => {
    setExpandedPatient(expandedPatient === index ? null : index)
  }

  const chartData = timeframe === 'monthly'
    ? {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        values: [40, 60, 50, 90, 70, 45, 65, 100, 75, 55, 45, 40]
      }
    : {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'],
        values: [30, 45, 35, 60, 55, 40, 50, 80, 65, 45, 35, 30]
      }

  return (
    <div className="space-y-6 animate-fade-in max-w-[1200px] mx-auto">

      {/* ─── Page Header ─── */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0f172a] tracking-tight">Clinical Overview</h1>
        <p className="text-slate-600 text-base mt-1">
          Welcome back, Dr. Aris. You have 3 urgent assessments today.
        </p>
      </div>

      {/* ─── Top Stats Row ─── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-200" />
              <div className="flex items-start justify-between mb-4 pl-2">
                <span className="text-sm font-semibold text-slate-700">{s.label}</span>
                <div className={`w-8 h-8 ${s.iconBg} rounded-md flex items-center justify-center`}>
                  <Icon size={16} className={s.iconColor} />
                </div>
              </div>
              <div className="flex items-baseline gap-2 pl-2">
                <span className="text-2xl font-bold text-slate-900">{s.value}</span>
                <span className={`text-xs font-semibold ${s.suffixColor || 'text-slate-500'}`}>{s.suffix}</span>
              </div>
            </div>
          )
        })}
        
        {/* Performance Card */}
        <div className="bg-[#0f172a] rounded-xl p-5 shadow-sm text-white relative overflow-hidden">
           <div className="relative z-10 flex flex-col h-full justify-between">
              <span className="text-sm font-medium text-slate-300">Unit Performance</span>
              <div>
                <span className="text-3xl font-bold">98.4%</span>
                <div className="h-1 w-full bg-slate-700 mt-3 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[98.4%]" />
                </div>
              </div>
           </div>
           <Activity size={80} className="absolute -bottom-4 -right-4 text-white/5" />
        </div>
      </div>

      {/* ─── Main Content Area ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Live Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Live Patient Activity</h2>
            <Link href="/patients" className="text-sm font-semibold text-slate-500 flex items-center gap-1 hover:text-slate-800 transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((item, i) => {
              const Icon = item.icon
              const isExpanded = expandedPatient === i
              return (
                <div 
                  key={i} 
                  className={`flex gap-4 p-3 -mx-3 rounded-xl cursor-pointer transition-colors ${isExpanded ? 'bg-slate-50 border border-slate-100 shadow-sm' : 'hover:bg-slate-50 border border-transparent'}`}
                  onClick={() => togglePatient(i)}
                >
                  <div className={`w-10 h-10 shrink-0 rounded-full ${item.iconBg} flex items-center justify-center mt-1`}>
                    <Icon size={18} className={item.iconColor} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-900">{item.patient}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-400">{item.time}</span>
                        {isExpanded ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                    
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-sm font-medium text-slate-800 mb-1">Symptoms & Case Notes:</p>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.details}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Diagnostics & Insights */}
        <div className="space-y-6">
          {/* Quick Diagnostics */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Diagnostics</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Vitals Scan', icon: HeartPulse, href: '/health-monitor' },
                { label: 'Breath AI', icon: Wind, href: '/respiratory-assessment' },
                { label: 'Symptom AI', icon: MessageSquare, href: '/symptom-checker' },
              ].map((tool, i) => (
                <Link key={i} href={tool.href} className="bg-slate-50 hover:bg-slate-100 rounded-xl p-4 flex flex-col items-center justify-center text-center transition-colors border border-slate-100">
                  <tool.icon size={20} className="text-slate-700 mb-2" />
                  <span className="text-xs font-bold text-slate-800">{tool.label}</span>
                </Link>
              ))}
            </div>
            <Link href="/digital-twin" className="mt-3 flex items-center justify-center gap-2 w-full bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl p-3 transition-colors">
              <Brain size={18} className="text-blue-300" />
              <span className="text-xs font-bold">Digital Twin</span>
            </Link>
          </div>

          {/* AI Insight */}
          <div className="bg-[#1e293b] rounded-xl p-6 shadow-sm text-white relative">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={16} className="text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">ASHA AI Insight</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Population health data suggests a 15% increase in respiratory complaints in Sector 04. Consider re-stocking inhalation therapy kits.
            </p>
            <Link href="/digital-twin" className="block w-full text-center bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg py-2 text-sm font-semibold transition-colors">
              Review Deep Data
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Trends Chart ─── */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-64 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Population Wellness Trends</h2>
            <p className="text-xs text-slate-500">Aggregated data across all managed units.</p>
          </div>
          <div className="flex bg-slate-100 rounded-full p-1 cursor-pointer">
             <button 
                onClick={() => setTimeframe('weekly')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${timeframe === 'weekly' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
             >
                Weekly
             </button>
             <button 
                onClick={() => setTimeframe('monthly')}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${timeframe === 'monthly' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
             >
                Monthly
             </button>
          </div>
        </div>
        
        {/* Chart */}
        <div className="flex-1 flex items-end justify-between gap-2 px-2 pt-4">
           {chartData.values.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className={`w-full rounded-t-sm transition-all duration-500 ${h >= 90 ? 'bg-red-400' : h >= 70 ? 'bg-[#0f172a]' : 'bg-blue-100'}`} 
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] font-bold text-slate-500 uppercase whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                  {chartData.labels[i]}
                </span>
              </div>
           ))}
        </div>
      </div>

    </div>
  )
}
