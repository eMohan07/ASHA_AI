'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'
import { savePatientOffline } from '../lib/offlineDB'

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
    const { name, value } = e.target
    if (name === 'phone') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 10)
      setForm((prev: any) => ({ ...prev, [name]: formattedValue }))
    } else {
      setForm((prev: any) => ({ ...prev, [name]: value }))
    }
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
        // Online — save directly to Supabase
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
        // Offline — save to IndexedDB
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
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Meena Devi"
          className="input"
          required
        />
      </div>

      {/* Age + Gender row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="e.g. 34"
            min="0"
            max="120"
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className="input">
            <option value="">Select</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Village */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Village / Area</label>
        <input
          type="text"
          name="village"
          value={form.village}
          onChange={handleChange}
          placeholder="e.g. Keezhambur"
          className="input"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="e.g. 9876543210"
          className="input"
          maxLength={10}
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any pre-existing conditions, allergies, etc."
          rows={3}
          className="input resize-none"
        />
      </div>

      {/* Offline notice */}
      {isMounted && !navigator.onLine && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-700">
          You are offline. Patient will be saved locally and synced when connected.
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn-md btn-primary flex-1 justify-center" disabled={loading}>
          {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Patient'}
        </button>
        <button
          type="button"
          className="btn-md btn-secondary"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </button>
      </div>

    </form>
  )
}
