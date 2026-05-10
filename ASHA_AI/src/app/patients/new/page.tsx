<<<<<<< HEAD
import PatientForm from '../../../components/PatientForm'

export const metadata = {
  title: 'Add Patient — ASHA AI',
}

export default function NewPatientPage() {
  return (
    <div className="max-w-lg mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Add New Patient</h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the patient's details. Works offline too — data syncs when connected.
        </p>
      </div>

      {/* Form card */}
      <div className="card">
        <PatientForm />
      </div>

=======
'use client'

import React from 'react'
import PatientForm from '@/components/PatientForm'
import { UserPlus, ArrowLeft, Shield } from 'lucide-react'
import Link from 'next/link'

export default function NewPatientPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black text-[#00e5ff] uppercase tracking-widest hover:gap-3 transition-all group">
          <ArrowLeft size={14} />
          Back to Command
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#00e5ff]/10 px-2 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest text-[#00e5ff] mb-2">
              <Shield size={10} />
              Protocol: Clinical Intake
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter">New Patient Registration</h1>
            <p className="text-sm font-bold text-[#bac9cc] uppercase tracking-widest">
              Register a new patient to begin multimodal AI triage and risk assessment.
            </p>
          </div>
          
          <div className="hidden md:flex flex-col items-end">
            <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">Field Session ID</div>
            <div className="text-sm font-black text-[#bac9cc] tracking-tighter">SESS_4920_XQ</div>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="glass-card p-8 md:p-12 border-[#00e5ff]/10 relative overflow-hidden">
        {/* Subtle decorative mesh */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00e5ff]/5 blur-[100px] -mr-48 -mt-48 pointer-events-none" />
        
        <PatientForm />
      </div>

      {/* Guidance Footer */}
      <div className="grid md:grid-cols-2 gap-8 pt-6">
        <div className="space-y-3">
          <div className="text-[10px] font-black text-[#00e5ff] uppercase tracking-widest">Clinical Protocol</div>
          <p className="text-xs text-[#bac9cc]/60 leading-relaxed uppercase tracking-wider font-bold">
            Ensure you have informed consent from the patient before proceeding with the AI-assisted diagnostic intake. All data is processed locally and encrypted.
          </p>
        </div>
        <div className="space-y-3 md:text-right">
          <div className="text-[10px] font-black text-[#cdbdff] uppercase tracking-widest">Required Information</div>
          <p className="text-xs text-[#bac9cc]/60 leading-relaxed uppercase tracking-wider font-bold">
            Full name is mandatory. Age and gender are recommended for accurate AI risk profiling and localized health trajectories.
          </p>
        </div>
      </div>

>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
    </div>
  )
}
