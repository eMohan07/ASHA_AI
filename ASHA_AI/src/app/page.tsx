<<<<<<< HEAD
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
=======
'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  WifiOff, 
  Activity, 
  Mic, 
  FileText, 
  Globe, 
  ShieldCheck, 
  Zap,
  BarChart3,
  ChevronRight,
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-[#111318] text-[#e2e2e8] font-sans selection:bg-[#00e5ff]/30 selection:text-white relative overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      
      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00e5ff] rounded-sm flex items-center justify-center">
              <Activity className="text-[#00363d]" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase">ASHA AI</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {['Impact', 'Technology', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-semibold text-[#bac9cc] hover:text-[#00e5ff] transition-colors"
              >
                {item}
              </Link>
            ))}
            <Link 
              href="/dashboard" 
              className="bg-[#00e5ff] text-[#00363d] px-6 py-2 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-[#00daf3] transition-all"
            >
              Partner With Us
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-[#1e2024] border-b border-white/5 p-6 space-y-6 animate-in slide-in-from-top duration-300">
            {['Impact', 'Technology', 'Contact'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="block text-lg font-semibold text-[#bac9cc]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link 
              href="/dashboard" 
              className="block bg-[#00e5ff] text-[#00363d] px-6 py-3 rounded-sm font-bold text-center uppercase"
              onClick={() => setIsMenuOpen(false)}
            >
              Partner With Us
            </Link>
          </div>
        )}
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 space-y-32">
        
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 bg-[#7c4dff]/10 border border-[#7c4dff]/20 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-[#cdbdff]">
              <Zap size={12} className="fill-[#cdbdff]" />
              Advancing Global Equity
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-white">
              Bridging the Rural Health Gap with <span className="text-[#00e5ff]">Intelligent Edge Computing</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#bac9cc] leading-relaxed max-w-xl">
              ASHA AI empowers frontline health workers with clinical-grade diagnostics that function anywhere—even in the world's most remote environments without internet access.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard" className="btn-primary flex items-center justify-center gap-3 group">
                Deploy ASHA AI
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/analytics" className="btn-secondary flex items-center justify-center gap-3">
                <BarChart3 size={18} />
                See Statistics
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
              </Link>
            </div>
          </div>

<<<<<<< HEAD
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

=======
          {/* Hero Visual/Dashboard Mockup */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00e5ff] to-[#7c4dff] rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass-card overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070" 
                alt="Health Worker with Tablet" 
                className="w-full aspect-video object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4 bg-[#111318]/80 backdrop-blur-md p-3 rounded-sm border border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00e5ff]/20 flex items-center justify-center">
                  <Activity size={16} className="text-[#00e5ff]" />
                </div>
                <div>
                  <div className="text-[10px] text-[#bac9cc] font-bold uppercase tracking-tighter">Diagnostic Accuracy</div>
                  <div className="text-sm font-bold text-white">99.4% Clinical Grade</div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[#bac9cc]">
                  <span>Offline Sync Status</span>
                  <span>100% Secure</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-[#00e5ff] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section Header */}
        <section className="text-center space-y-6 pt-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Precision Engineering for <span className="text-[#00e5ff]">Extreme Environments</span>
          </h2>
          <p className="text-[#bac9cc] max-w-2xl mx-auto">
            Our stack is built from the ground up to serve the challenges of last-mile healthcare delivery.
          </p>
        </section>

        {/* Feature Cards Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
          
          {/* Feature 1 */}
          <div className="glass-card p-10 space-y-8 group hover:border-[#00e5ff]/30 transition-colors relative overflow-hidden lg:col-span-2">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff]/5 blur-[80px] -mr-32 -mt-32" />
            
            <div className="space-y-6 relative z-10">
              <div className="w-14 h-14 rounded-sm bg-white/5 flex items-center justify-center group-hover:bg-[#00e5ff]/10 transition-colors">
                <WifiOff className="text-[#00e5ff]" size={28} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">Offline-First Architecture</h3>
                <p className="text-[#bac9cc] leading-relaxed max-w-lg">
                  ASHA AI processes complex medical logic locally on the device. Data stays encrypted and automatically syncs when 2G/3G signal is found, ensuring no patient data is ever lost.
                </p>
              </div>
              
              <div className="flex gap-4 pt-4">
                {['Local Vector Store', 'Edge Inference', 'Unity Syncing'].map((tag) => (
                  <div key={tag} className="bg-white/5 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest border border-white/5">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 pr-10 opacity-40">
              <div className="w-48 h-48 bg-[#00e5ff]/10 rounded-full border border-[#00e5ff]/20 animate-pulse flex items-center justify-center">
                <Zap size={64} className="text-[#00e5ff]" />
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-10 space-y-8 hover:border-[#00e5ff]/30 transition-colors">
            <div className="w-14 h-14 rounded-sm bg-white/5 flex items-center justify-center">
              <Zap className="text-[#00e5ff]" size={28} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">Edge Diagnostics</h3>
              <p className="text-[#bac9cc] leading-relaxed">
                Proprietary LLM compression allows for clinical triage models to run on $100 smartphones.
              </p>
            </div>
            <Link href="/technology" className="inline-flex items-center gap-2 text-[#00e5ff] text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all">
              View Benchmarks
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-10 space-y-8 hover:border-[#00e5ff]/30 transition-colors">
            <div className="w-14 h-14 rounded-sm bg-white/5 flex items-center justify-center">
              <Mic className="text-[#00e5ff]" size={28} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">Voice-to-Clinical-Text</h3>
              <p className="text-[#bac9cc] leading-relaxed">
                Transcribe multi-dialect patient encounters directly into structured ICD-10 medical records sub-1sec.
              </p>
            </div>
          </div>

          {/* Feature 4 (OCR) */}
          <div className="glass-card p-10 space-y-8 lg:col-span-2 group hover:border-[#00e5ff]/30 transition-colors flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1 space-y-6">
              <div className="w-14 h-14 rounded-sm bg-white/5 flex items-center justify-center">
                <FileText className="text-[#00e5ff]" size={28} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-white">Intelligent OCR Scanning</h3>
                <p className="text-[#bac9cc] leading-relaxed">
                  Digitizing paper records is the biggest hurdle in rural health. ASHA AI's OCR identifies handwritten prescriptions and lab results with industry-leading precision.
                </p>
              </div>
              <ul className="space-y-2">
                {['Handwritten recognition', 'Laboratory report parsing'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-xs font-bold text-[#bac9cc] uppercase tracking-widest">
                    <div className="w-4 h-4 rounded-full border border-[#00e5ff] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="w-full md:w-64 bg-[#111318] rounded-sm p-4 border border-white/5 space-y-4">
              <div className="h-2 w-3/4 bg-white/5 rounded-full" />
              <div className="h-2 w-1/2 bg-white/5 rounded-full" />
              <div className="h-24 w-full bg-white/5 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#00e5ff] animate-scan shadow-[0_0_10px_#00e5ff]" />
              </div>
            </div>
          </div>
        </section>

        {/* Global Impact Section */}
        <section className="relative glass-card p-12 md:p-20 overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-10 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111318] via-[#111318]/95 to-transparent" />
          
          <div className="relative z-10 space-y-12 max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Trusted by <span className="text-[#00e5ff]">Global Governments & NGOs</span>
            </h2>
            <p className="text-xl text-[#bac9cc] leading-relaxed">
              Join the public health revolution. ASHA AI provides the infrastructure to monitor disease outbreaks, manage large-scale vaccination programs, and improve health outcomes for millions.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8 pt-4">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-sm bg-[#00e5ff]/20 flex items-center justify-center">
                  <ShieldCheck size={24} className="text-[#00e5ff]" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">GDPR & HIPAA</div>
                  <div className="text-xs font-bold text-[#bac9cc] uppercase tracking-widest">Fully Compliant</div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-sm bg-[#cdbdff]/20 flex items-center justify-center">
                  <Globe size={24} className="text-[#cdbdff]" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">Public Health API</div>
                  <div className="text-xs font-bold text-[#bac9cc] uppercase tracking-widest">Real-Time Dashboard</div>
                </div>
              </div>
            </div>

            <form className="flex flex-col sm:flex-row gap-4 pt-10">
              <input 
                type="email" 
                placeholder="Government email address" 
                className="flex-1 bg-[#111318]/80 border border-white/10 px-6 py-4 rounded-sm focus:outline-none focus:border-[#00e5ff] transition-colors"
              />
              <button className="btn-primary whitespace-nowrap">
                Request Strategy Brief
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 px-6 bg-[#0a0c10]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#00e5ff] rounded-sm flex items-center justify-center">
                <Activity className="text-[#00363d]" size={18} />
              </div>
              <span className="text-lg font-bold tracking-tighter uppercase">ASHA AI</span>
            </div>
            <p className="text-sm text-[#bac9cc] leading-relaxed">
              Reimagining healthcare for the next 2 billion users. Building tech intelligence for the world's most critical medical frontiers.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#00e5ff]">Platform</h4>
            <ul className="space-y-4 text-sm font-semibold text-[#bac9cc]">
              <li><Link href="#" className="hover:text-white transition-colors">Edge Diagnostics</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Offline Sync</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Multi-language</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#00e5ff]">Resources</h4>
            <ul className="space-y-4 text-sm font-semibold text-[#bac9cc]">
              <li><Link href="#" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Whitepapers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#00e5ff]">Company</h4>
            <ul className="space-y-4 text-sm font-semibold text-[#bac9cc]">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Impact Report</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-20 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 mt-20 text-[10px] font-bold uppercase tracking-widest text-[#bac9cc]/50">
          <span>© 2026 ASHA AI. All rights reserved.</span>
          <div className="flex gap-10">
            <Link href="#" className="hover:text-[#00e5ff]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#00e5ff]">Terms of Service</Link>
            <Link href="#" className="hover:text-[#00e5ff]">Cookie Settings</Link>
          </div>
        </div>
      </footer>

      {/* Global CSS for Animations */}
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
    </div>
  )
}
