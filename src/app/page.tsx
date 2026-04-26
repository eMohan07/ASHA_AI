import Link from 'next/link'
import { Package, Mic, Sparkles } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-8">

      {/* Hero */}
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          AI-Powered · Offline-First · Multilingual
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Empowering <span className="text-green-700">Frontline</span> Health Workers
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
          ASHA AI gives community health workers instant AI-assisted triage,
          offline patient records, and critical-case alerts — right from a basic smartphone.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Link href="/patients/new" className="btn-primary text-center">
            Add New Patient
          </Link>
          <Link href="/symptom-checker" className="btn-secondary text-center">
            Start Symptom Check
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { value: '850K+', label: 'ASHA workers in India' },
          { value: '1:1000', label: 'Worker to patient ratio' },
          { value: '72%', label: 'Rural areas served' },
        ].map((stat) => (
          <div key={stat.label} className="card text-center">
            <div className="text-2xl font-bold text-green-700">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/patients" className="card hover:border-green-300 transition-colors group">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-green-700">Patient Records</h3>
          <p className="text-xs text-gray-500 mt-1">Offline-first patient profiles that sync when connected</p>
        </Link>

        <Link href="/symptom-checker" className="card hover:border-purple-300 transition-colors group">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-purple-700">AI Triage</h3>
          <p className="text-xs text-gray-500 mt-1">Describe symptoms and get instant AI-powered assessment</p>
        </Link>

        <div className="card">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm">Doctor Alerts</h3>
          <p className="text-xs text-gray-500 mt-1">Critical cases trigger instant WhatsApp alerts to the nearest PHC doctor</p>
        </div>
      </div>

      {/* Core Prototypes Section */}
      <div className="my-12 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Core Frontline Tools</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Essential functional prototypes for community health triage and guidance.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="border border-green-200 bg-green-50 rounded-xl overflow-hidden p-6 text-center flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-bold text-green-800 mb-2">AI Health Monitor</h3>
              <p className="text-green-700 text-xs mb-4 leading-relaxed">Multi-step disease risk assessment with clinical reports.</p>
            </div>
            <Link href="/health-monitor" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg text-sm transition-colors">
              Start Assessment
            </Link>
          </div>

          <div className="border border-teal-200 bg-teal-50 rounded-xl overflow-hidden p-6 text-center flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-bold text-teal-800 mb-2">Respiratory AI</h3>
              <p className="text-teal-700 text-xs mb-4 leading-relaxed">Acoustic cough analysis to generate Lung Health Index.</p>
            </div>
            <Link href="/respiratory-assessment" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded-lg text-sm transition-colors">
              Test Cough AI
            </Link>
          </div>

          <div className="border border-indigo-200 bg-indigo-50 rounded-xl overflow-hidden p-6 text-center flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-bold text-indigo-800 mb-2">Education Co-pilot</h3>
              <p className="text-indigo-700 text-xs mb-4 leading-relaxed">Multilingual guidance with interactive triage questions.</p>
            </div>
            <Link href="/health-education" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg text-sm transition-colors">
              Open Hub
            </Link>
          </div>
        </div>
      </div>

      {/* AI Impact Features Section */}
      <div className="my-16 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">From Features to Impact</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Strategic prototypes targeting failure points in last-mile delivery.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-blue-300 flex flex-col">
            <div className="h-40 bg-slate-900 flex items-center justify-center p-6 text-blue-400 group-hover:scale-105 transition-transform">
               <div className="text-center">
                 <Package size={48} className="mx-auto mb-2 opacity-50" />
                 <span className="text-xs font-bold uppercase tracking-widest text-blue-300">Inventory AI</span>
               </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Supply Chain AI</h3>
              <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">Predicts stock-outs before they happen to restore trust at scale.</p>
              <Link href="/supply-chain" className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-lg text-center text-sm hover:bg-blue-600 transition-colors">
                Open Dashboard
              </Link>
            </div>
          </div>

          <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-purple-300 flex flex-col">
            <div className="h-40 bg-purple-900 flex items-center justify-center p-6 text-purple-300 group-hover:scale-105 transition-transform">
               <div className="text-center">
                 <Mic size={48} className="mx-auto mb-2 opacity-50" />
                 <span className="text-xs font-bold uppercase tracking-widest text-purple-200">Ambient AI</span>
               </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">Ambient Scribing</h3>
              <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">Cuts documentation burden so workers focus on care.</p>
              <Link href="/ambient-scribing" className="w-full bg-purple-900 text-white font-bold py-2.5 rounded-lg text-center text-sm hover:bg-purple-700 transition-colors">
                Open Scribing Tool
              </Link>
            </div>
          </div>

          <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-pink-300 flex flex-col">
            <div className="h-40 bg-pink-900 flex items-center justify-center p-6 text-pink-300 group-hover:scale-105 transition-transform">
               <div className="text-center">
                 <Sparkles size={48} className="mx-auto mb-2 opacity-50" />
                 <span className="text-xs font-bold uppercase tracking-widest text-pink-200">Trajectory AI</span>
               </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-pink-600 transition-colors">Digital Twin</h3>
              <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">Personalized health trajectories for nutrition advice.</p>
              <Link href="/digital-twin" className="w-full bg-pink-900 text-white font-bold py-2.5 rounded-lg text-center text-sm hover:bg-pink-700 transition-colors">
                Generate Twin
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-slate-600 italic">
            "These six features form an integrated AI layer that makes every touchpoint in the care journey smarter, faster, and more human."
          </p>
        </div>
      </div>

    </div>
  )
}
