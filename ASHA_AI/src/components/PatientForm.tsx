'use client'
<<<<<<< HEAD
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import { savePatientOffline } from '../lib/offlineDB'
=======

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import { savePatientOffline } from '../lib/offlineDB'
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Info, 
  ShieldCheck, 
  Save, 
  X, 
  AlertTriangle,
  ChevronRight,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)

const INITIAL_STATE = {
  name: '',
  age: '',
  gender: '',
  village: '',
  phone: '',
  notes: '',
}

export default function PatientForm({ existingPatient = null }: { existingPatient?: any }) {
  const router = useRouter()
  const [form, setForm] = useState(existingPatient || INITIAL_STATE)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  const isEditing = !!existingPatient

  useEffect(() => {
    setIsMounted(true)
  }, [])

  function handleChange(e: any) {
    setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: any) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!form.name.trim()) {
      setError('Patient name is required.')
      setLoading(false)
      return
    }

    try {
      if (navigator.onLine) {
<<<<<<< HEAD
        // Online — save directly to Supabase
=======
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
        const payload = {
          name: form.name.trim(),
          age: form.age ? parseInt(form.age) : null,
          gender: form.gender || null,
          village: form.village.trim() || null,
          phone: form.phone.trim() || null,
          notes: form.notes.trim() || null,
        }

        if (isEditing) {
          const { error: updateError } = await supabase
            .from('patients')
            .update(payload)
            .eq('id', existingPatient.id)
          if (updateError) throw updateError
        } else {
          const { error: insertError } = await supabase
            .from('patients')
            .insert(payload)
          if (insertError) throw insertError
        }
      } else {
<<<<<<< HEAD
        // Offline — save to IndexedDB
=======
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
        await savePatientOffline({
          ...form,
          age: form.age ? parseInt(form.age) : null,
        })
      }

      router.push('/patients')
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
=======
    <form onSubmit={handleSubmit} className="space-y-12">
      
      {/* Form Progress Header (Visual) */}
      <div className="flex items-center gap-4">
        {[
          { label: 'Demographics', active: true },
          { label: 'Clinical Intake', active: false },
          { label: 'AI Review', active: false }
        ].map((step, i) => (
          <React.Fragment key={step.label}>
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-black tracking-widest",
                step.active ? "bg-[#00e5ff] text-[#00363d]" : "bg-white/5 text-[#bac9cc]/30 border border-white/5"
              )}>
                0{i + 1}
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest hidden sm:block",
                step.active ? "text-white" : "text-[#bac9cc]/30"
              )}>
                {step.label}
              </span>
            </div>
            {i < 2 && <ChevronRight size={14} className="text-white/10" />}
          </React.Fragment>
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-sm px-6 py-4 text-[10px] font-black uppercase tracking-widest text-red-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertTriangle size={18} />
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
          {error}
        </div>
      )}

<<<<<<< HEAD
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Meena Devi"
          className="input-field"
          required
        />
      </div>

      {/* Age + Gender row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="e.g. 34"
            min="0"
            max="120"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className="input-field">
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Village */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Village / Area</label>
        <input
          type="text"
          name="village"
          value={form.village}
          onChange={handleChange}
          placeholder="e.g. Keezhambur"
          className="input-field"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="e.g. 9876543210"
          className="input-field"
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any pre-existing conditions, allergies, etc."
          rows={3}
          className="input-field resize-none"
        />
      </div>

      {/* Offline notice */}
      {isMounted && !navigator.onLine && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-700">
          You are offline. Patient will be saved locally and synced when connected.
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary flex-1" disabled={loading}>
          {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Patient'}
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </button>
      </div>

=======
      <div className="grid lg:grid-cols-2 gap-x-12 gap-y-10">
        
        {/* Name Field */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em] px-1">
            Full Patient Identity <span className="text-[#00e5ff]">*</span>
          </label>
          <div className="relative group">
            <User className="absolute left-0 top-1/2 -translate-y-1/2 text-[#bac9cc]/50 group-focus-within:text-[#00e5ff] transition-colors" size={18} />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Meena Devi"
              className="w-full bg-transparent border-b border-white/10 focus:border-[#00e5ff] py-4 pl-8 pr-4 text-sm font-bold text-white transition-all outline-none placeholder-[#bac9cc]/20 uppercase tracking-widest"
              required
            />
          </div>
        </div>

        {/* Phone Field */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em] px-1">Contact Number</label>
          <div className="relative group">
            <Phone className="absolute left-0 top-1/2 -translate-y-1/2 text-[#bac9cc]/50 group-focus-within:text-[#00e5ff] transition-colors" size={18} />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile"
              className="w-full bg-transparent border-b border-white/10 focus:border-[#00e5ff] py-4 pl-8 pr-4 text-sm font-bold text-white transition-all outline-none placeholder-[#bac9cc]/20 tracking-widest"
            />
          </div>
        </div>

        {/* Age + Gender row */}
        <div className="grid grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em] px-1">Biological Age</label>
            <div className="relative group">
              <Calendar className="absolute left-0 top-1/2 -translate-y-1/2 text-[#bac9cc]/50 group-focus-within:text-[#00e5ff] transition-colors" size={18} />
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Years"
                min="0"
                max="120"
                className="w-full bg-transparent border-b border-white/10 focus:border-[#00e5ff] py-4 pl-8 pr-4 text-sm font-bold text-white transition-all outline-none placeholder-[#bac9cc]/20 tracking-widest"
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em] px-1">Gender</label>
            <select 
              name="gender" 
              value={form.gender} 
              onChange={handleChange} 
              className="w-full bg-transparent border-b border-white/10 focus:border-[#00e5ff] py-4 px-0 text-sm font-bold text-white transition-all outline-none appearance-none uppercase tracking-widest cursor-pointer"
            >
              <option value="" className="bg-[#111318]">Select</option>
              <option value="female" className="bg-[#111318]">Female</option>
              <option value="male" className="bg-[#111318]">Male</option>
              <option value="other" className="bg-[#111318]">Other</option>
            </select>
          </div>
        </div>

        {/* Village */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em] px-1">Village / Deployment Area</label>
          <div className="relative group">
            <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 text-[#bac9cc]/50 group-focus-within:text-[#00e5ff] transition-colors" size={18} />
            <input
              type="text"
              name="village"
              value={form.village}
              onChange={handleChange}
              placeholder="e.g. Keezhambur"
              className="w-full bg-transparent border-b border-white/10 focus:border-[#00e5ff] py-4 pl-8 pr-4 text-sm font-bold text-white transition-all outline-none placeholder-[#bac9cc]/20 uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Notes (Full Width) */}
        <div className="lg:col-span-2 space-y-3">
          <label className="text-[10px] font-black text-[#bac9cc]/50 uppercase tracking-[0.2em] px-1">Initial Clinical Observation</label>
          <div className="relative group">
            <Info className="absolute left-0 top-4 text-[#bac9cc]/50 group-focus-within:text-[#00e5ff] transition-colors" size={18} />
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Describe symptoms, visible conditions, or immediate concerns..."
              rows={3}
              className="w-full bg-transparent border-b border-white/10 focus:border-[#00e5ff] py-4 pl-8 pr-4 text-sm font-bold text-white transition-all outline-none placeholder-[#bac9cc]/20 uppercase tracking-widest resize-none"
            />
          </div>
        </div>
      </div>

      {/* Offline Status */}
      {isMounted && !navigator.onLine && (
        <div className="bg-[#00e5ff]/5 border border-[#00e5ff]/10 rounded-sm px-6 py-4 text-[10px] font-black uppercase tracking-widest text-[#00e5ff] flex items-center gap-3">
          <ShieldCheck size={18} />
          Offline Queue Enabled — Sync pending connection
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-white/5">
        <button 
          type="submit" 
          className="flex-1 bg-[#00e5ff] text-[#00363d] py-5 rounded-sm font-black text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
          disabled={loading}
        >
          <Save size={18} />
          {loading ? 'Processing...' : isEditing ? 'Update Clinical Record' : 'Register & Start Triage'}
        </button>
        <button
          type="button"
          className="bg-transparent border border-white/10 text-[#bac9cc] py-5 px-12 rounded-sm font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 hover:bg-white/5 active:scale-95"
          onClick={() => router.back()}
          disabled={loading}
        >
          <X size={18} />
          Abort
        </button>
      </div>

      {/* AI Assistance Badge */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <Activity className="text-[#00e5ff]/30" size={14} />
        <span className="text-[10px] font-black text-[#bac9cc]/30 uppercase tracking-[0.2em]">
          Secured by ASHA AI Clinical Engine
        </span>
      </div>

>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
    </form>
  )
}
