"use client"
import React, { useState, useRef } from 'react'
import {
  Utensils, Thermometer, Activity, BrainCircuit, FileText,
  Plus, Trash2, ChevronLeft, ChevronRight, CheckCircle2,
  Sparkles, Loader2, RefreshCw, Flame, Camera, X, Upload
} from 'lucide-react'
import { getRiskAssessment } from '@/lib/claudeAPI'

// Real USDA/ICMR nutrition values (kcal per 100g)
const NUTRITION_DB: Record<string, number> = {
  'rice': 130, 'brown rice': 123, 'dal': 93, 'lentils': 116,
  'roti': 297, 'chapati': 297, 'paratha': 326, 'naan': 310,
  'bread': 265, 'white bread': 265, 'idli': 58, 'dosa': 133,
  'upma': 145, 'poha': 130, 'oatmeal': 71, 'oats': 389,
  'egg': 155, 'boiled egg': 155, 'omelette': 154,
  'chicken': 165, 'chicken breast': 165, 'chicken curry': 150,
  'fish': 136, 'salmon': 208, 'tuna': 132, 'paneer': 265,
  'tofu': 76, 'milk': 61, 'curd': 61, 'yogurt': 61,
  'butter': 717, 'ghee': 900, 'oil': 884,
  'banana': 89, 'apple': 52, 'orange': 47, 'mango': 60,
  'potato': 77, 'sweet potato': 86, 'onion': 40, 'tomato': 18,
  'spinach': 23, 'carrot': 41, 'cucumber': 15, 'broccoli': 34,
  'sambar': 48, 'rasam': 25, 'khichdi': 124, 'biryani': 200,
  'rajma': 127, 'chhole': 164, 'pav bhaji': 200, 'vada': 212,
}

function getCaloriesPer100g(food: string): number | null {
  const lower = food.toLowerCase().trim()
  if (NUTRITION_DB[lower]) return NUTRITION_DB[lower]
  for (const key of Object.keys(NUTRITION_DB)) {
    if (lower.includes(key) || key.includes(lower)) return NUTRITION_DB[key]
  }
  return null
}

const STEPS = [
  { id: 1, label: 'Food Intake', icon: Utensils },
  { id: 2, label: 'Symptoms',    icon: Thermometer },
  { id: 3, label: 'Analysis',    icon: BrainCircuit },
  { id: 4, label: 'Report',      icon: FileText },
]

const DEFAULT_SYMPTOMS = [
  { key: 'fever',    label: 'Fever / Temperature',  desc: 'Body temperature above normal',      color: 'text-orange-500', accent: '#f97316' },
  { key: 'headache', label: 'Headache / Head Pain',  desc: 'Intensity of pain in the head',      color: 'text-red-500',    accent: '#ef4444' },
  { key: 'fatigue',  label: 'Fatigue / Weakness',    desc: 'Energy level and overall tiredness',  color: 'text-blue-500',   accent: '#3b82f6' },
]
const CUSTOM_COLORS = [
  { color: 'text-purple-500', accent: '#a855f7' },
  { color: 'text-pink-500',   accent: '#ec4899' },
  { color: 'text-teal-500',   accent: '#14b8a6' },
  { color: 'text-yellow-600', accent: '#ca8a04' },
]

type FoodItem = { meal: string; food: string; weightG: number; caloriesPer100g: number | null; totalCalories: number; source: 'manual' | 'photo' }
type CustomSymptom = { key: string; label: string; desc: string; color: string; accent: string }

export default function HealthMonitorWizard() {
  const [step, setStep]       = useState(1)
  const [loading, setLoading] = useState(false)
  const [report, setReport]   = useState<any>(null)

  // Food
  const [foodItems, setFoodItems] = useState<FoodItem[]>([])
  const [meal, setMeal]   = useState('Breakfast')
  const [food, setFood]   = useState('')
  const [weight, setWeight] = useState(100)
  const [photoLoading, setPhotoLoading] = useState(false)
  const [photoNote, setPhotoNote] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  // Symptoms
  const [symptoms, setSymptoms]           = useState<Record<string, number>>({ fever: 0, headache: 0, fatigue: 0 })
  const [customSymptoms, setCustomSymptoms] = useState<CustomSymptom[]>([])
  const [newSymptom, setNewSymptom]       = useState('')
  const [showAddSym, setShowAddSym]       = useState(false)

  const allSymptoms = [...DEFAULT_SYMPTOMS, ...customSymptoms]
  const totalCal = foodItems.reduce((s, i) => s + i.totalCalories, 0)
  const calStatus = totalCal < 1200 ? { label: 'Below target', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' }
    : totalCal > 2800 ? { label: 'Above target', color: 'text-red-600', bg: 'bg-red-50 border-red-200' }
    : { label: 'On target', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' }

  const handleAddFood = () => {
    if (!food.trim()) return
    const cal100 = getCaloriesPer100g(food)
    const totalCalories = cal100 !== null ? Math.round((cal100 * weight) / 100) : Math.round((130 * weight) / 100)
    setFoodItems(p => [...p, { meal, food: food.trim(), weightG: weight, caloriesPer100g: cal100, totalCalories, source: 'manual' }])
    setFood(''); setWeight(100)
  }

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoLoading(true); setPhotoNote('')
    const reader = new FileReader()
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1]
      try {
        const res = await fetch('/api/analyze-food-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64, mimeType: file.type }),
        })
        const data = await res.json()
        if (data.items?.length) {
          const newItems: FoodItem[] = data.items.map((it: any) => ({
            meal,
            food: it.food,
            weightG: it.estimatedWeight,
            caloriesPer100g: it.caloriesPer100g,
            totalCalories: it.totalCalories,
            source: 'photo' as const,
          }))
          setFoodItems(p => [...p, ...newItems])
          setPhotoNote(data.note || '')
        } else {
          setPhotoNote('No food items detected. Try a clearer photo.')
        }
      } catch { setPhotoNote('Photo analysis failed. Please try again.') }
      finally { setPhotoLoading(false) }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleAddSymptom = () => {
    const name = newSymptom.trim(); if (!name) return
    const key = name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now()
    const col = CUSTOM_COLORS[customSymptoms.length % CUSTOM_COLORS.length]
    setCustomSymptoms(p => [...p, { key, label: name, desc: 'Custom symptom', ...col }])
    setSymptoms(s => ({ ...s, [key]: 0 }))
    setNewSymptom(''); setShowAddSym(false)
  }

  const handleAnalyze = async () => {
    setStep(3); setLoading(true)
    try {
      const data = await getRiskAssessment(foodItems, symptoms)
      setReport(data); setStep(4)
    } catch {
      setReport({ riskLevel: 'Error', score: 0, summary: 'Failed to generate report.', correlations: [], insights: [], actionableSteps: ['Please try again.'] })
      setStep(4)
    } finally { setLoading(false) }
  }

  const reset = () => {
    setStep(1); setReport(null); setFoodItems([])
    setSymptoms({ fever: 0, headache: 0, fatigue: 0 }); setCustomSymptoms([])
  }

  const RISK_STYLE: Record<string, any> = {
    Low:      { badge: 'badge-green',  bar: 'bg-blue-500', text: 'text-blue-700' },
    Moderate: { badge: 'badge-amber',  bar: 'bg-amber-500',   text: 'text-amber-700' },
    High:     { badge: 'badge-orange', bar: 'bg-orange-500',  text: 'text-orange-700' },
    Critical: { badge: 'badge-red',    bar: 'bg-red-500',     text: 'text-red-700' },
    Error:    { badge: 'badge-slate',  bar: 'bg-slate-400',   text: 'text-slate-700' },
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
            <Activity size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900">Health Monitor</h1>
            <p className="text-xs text-slate-500">AI-powered risk assessment · Powered by Gemini</p>
          </div>
        </div>
        {step < 3 && (
          <button onClick={reset} className="btn-sm btn-ghost text-slate-400">
            <RefreshCw size={13} /> Reset
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon; const done = step > s.id; const active = step === s.id
          return (
            <React.Fragment key={s.id}>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${active ? 'bg-blue-600 text-white shadow-sm' : done ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-400'}`}>
                {done ? <CheckCircle2 size={12} /> : <Icon size={12} />}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px ${done ? 'bg-blue-200' : 'bg-slate-100'}`} />}
            </React.Fragment>
          )
        })}
      </div>

      {/* ── Step 1 ── */}
      {step === 1 && (
        <div className="card p-6 space-y-5 animate-slide-up">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-0.5">Daily Food Intake</h2>
            <p className="text-xs text-slate-500">Enter food with weight (g) for accurate calories, or take a photo to auto-detect.</p>
          </div>

          {/* Manual entry */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Manual Entry</p>
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-2">
                <label className="label">Meal</label>
                <select value={meal} onChange={e => setMeal(e.target.value)} className="input text-xs py-2">
                  {['Breakfast','Lunch','Dinner','Snack'].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="col-span-3">
                <label className="label">Food Item</label>
                <input
                  type="text" value={food}
                  onChange={e => setFood(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddFood()}
                  placeholder="e.g. Rice, Dal, Chicken..."
                  className="input text-xs py-2"
                />
              </div>
              <div className="col-span-1">
                <label className="label">Weight (g)</label>
                <input
                  type="number" min={1} max={2000} value={weight}
                  onChange={e => setWeight(Number(e.target.value))}
                  className="input text-xs py-2"
                />
              </div>
            </div>
            {food.trim() && (
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  {(() => {
                    const c = getCaloriesPer100g(food)
                    if (c) return <span>≈ <strong>{Math.round(c * weight / 100)} kcal</strong> ({c} kcal/100g · USDA data)</span>
                    return <span className="text-amber-600">Unknown food — will use average estimate</span>
                  })()}
                </div>
                <button onClick={handleAddFood} disabled={!food.trim()} className="btn-sm btn-primary">
                  <Plus size={14} /> Add
                </button>
              </div>
            )}
          </div>

          {/* Photo entry */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Photo Analysis (Gemini Vision)</p>
            <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhoto} />
            <div className="flex gap-2">
              <button onClick={() => fileRef.current?.click()} disabled={photoLoading} className="btn-sm btn-secondary flex-1">
                {photoLoading ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
                {photoLoading ? 'Analysing photo...' : 'Take / Upload Photo'}
              </button>
              <button onClick={() => { if (fileRef.current) { fileRef.current.removeAttribute('capture'); fileRef.current.click() } }} disabled={photoLoading} className="btn-sm btn-ghost">
                <Upload size={14} /> Gallery
              </button>
            </div>
            {photoNote && <p className="text-xs text-slate-500 mt-2">{photoNote}</p>}
          </div>

          {/* Calorie bar */}
          {foodItems.length > 0 && (
            <div className={`flex items-center justify-between px-4 py-3 rounded-xl border ${calStatus.bg}`}>
              <div className="flex items-center gap-2">
                <Flame size={15} className={calStatus.color} />
                <span className="text-xs font-semibold text-slate-700">Total Calories</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold ${calStatus.color}`}>{totalCal}</span>
                <span className="text-xs text-slate-500">/ 2000 kcal</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-white ${calStatus.color}`}>{calStatus.label}</span>
              </div>
            </div>
          )}

          {/* Log */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Today's Log ({foodItems.length})</p>
            {foodItems.length === 0 ? (
              <div className="flex items-center justify-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-sm text-slate-400">No items logged yet</p>
              </div>
            ) : foodItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.source === 'photo' ? 'bg-blue-50' : 'bg-blue-50'}`}>
                  {item.source === 'photo' ? <Camera size={14} className="text-blue-500" /> : <Utensils size={14} className="text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{item.food}</p>
                  <p className="text-xs text-slate-400">
                    {item.meal} · {item.weightG}g
                    {item.caloriesPer100g ? ` · ${item.caloriesPer100g} kcal/100g` : ' · estimated'}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Flame size={12} className="text-orange-400" />
                  <span className="text-xs font-bold text-orange-500">{item.totalCalories} kcal</span>
                </div>
                <button onClick={() => setFoodItems(p => p.filter((_, j) => j !== i))} className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-red-500 transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button onClick={() => setStep(2)} className="btn-md btn-primary">
              Next: Symptoms <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2 ── */}
      {step === 2 && (
        <div className="card p-6 space-y-6 animate-slide-up">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-0.5">Symptom Severity</h2>
            <p className="text-xs text-slate-500">Rate 0–10. Add any symptom the patient reports.</p>
          </div>

          <div className="space-y-6">
            {allSymptoms.map(sym => (
              <div key={sym.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{sym.label}</p>
                    <p className="text-xs text-slate-400">{sym.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${sym.color}`}>{symptoms[sym.key] ?? 0}</span>
                    <span className="text-[10px] text-slate-400">/ 10</span>
                    {customSymptoms.find(c => c.key === sym.key) && (
                      <button onClick={() => { setCustomSymptoms(p => p.filter(c => c.key !== sym.key)); setSymptoms(s => { const n = {...s}; delete n[sym.key]; return n }) }} className="p-1 text-slate-300 hover:text-red-400">
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>
                <input
                  type="range" min={0} max={10} step={1}
                  value={symptoms[sym.key] ?? 0}
                  onChange={e => setSymptoms(s => ({ ...s, [sym.key]: +e.target.value }))}
                  className="w-full h-2 appearance-none rounded-full cursor-pointer"
                  style={{ background: `linear-gradient(to right,${sym.accent} ${(symptoms[sym.key]??0)*10}%,#e2e8f0 ${(symptoms[sym.key]??0)*10}%)` }}
                />
                <div className="flex justify-between">
                  <span className="text-[10px] text-slate-400">None</span>
                  <span className="text-[10px] text-slate-400">Severe</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4">
            {showAddSym ? (
              <div className="flex gap-2">
                <input autoFocus type="text" value={newSymptom} onChange={e => setNewSymptom(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleAddSymptom(); if (e.key === 'Escape') setShowAddSym(false) }}
                  placeholder="e.g. Nausea, Chest pain, Cough..." className="input text-xs py-2 flex-1" />
                <button onClick={handleAddSymptom} disabled={!newSymptom.trim()} className="btn-sm btn-primary px-3"><Plus size={14} /></button>
                <button onClick={() => setShowAddSym(false)} className="btn-sm btn-ghost px-3"><X size={14} /></button>
              </div>
            ) : (
              <button onClick={() => setShowAddSym(true)} className="flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700">
                <Plus size={14} /> Add custom symptom
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button onClick={() => setStep(1)} className="btn-md btn-ghost"><ChevronLeft size={15} /> Back</button>
            <button onClick={handleAnalyze} className="btn-md btn-primary"><BrainCircuit size={15} /> Run AI Analysis</button>
          </div>
        </div>
      )}

      {/* ── Step 3 ── */}
      {step === 3 && (
        <div className="card p-12 flex flex-col items-center gap-5 animate-fade-in">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center">
              <BrainCircuit size={28} className="text-blue-600" />
            </div>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <Loader2 size={11} className="text-white animate-spin" />
            </span>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-900">Analyzing patient data...</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">Correlating nutritional intake ({totalCal} kcal) with symptom severity</p>
          </div>
          <div className="flex gap-1.5">{[0,200,400].map(d => <span key={d} className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}</div>
        </div>
      )}

      {/* ── Step 4 ── */}
      {step === 4 && report && (() => {
        const rs = RISK_STYLE[report.riskLevel] || RISK_STYLE.Error
        const pct = Math.min(100, Math.max(0, report.score))
        return (
          <div className="space-y-4 animate-slide-up">
            <div className="card p-6">
              <div className="flex items-center gap-5 mb-4">
                <div className="shrink-0 text-center">
                  <p className={`text-5xl font-bold ${rs.text}`}>{report.score}</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Risk Score</p>
                </div>
                <div className="flex-1">
                  <span className={rs.badge}>{report.riskLevel} Risk</span>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-3">
                    <div className={`h-full ${rs.bar} rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">{report.summary}</p>
                </div>
              </div>
              <div className={`flex items-center justify-between px-4 py-2.5 rounded-lg border ${calStatus.bg}`}>
                <div className="flex items-center gap-2"><Flame size={14} className={calStatus.color} /><span className="text-xs font-medium text-slate-600">Daily Calories</span></div>
                <span className={`text-sm font-bold ${calStatus.color}`}>{totalCal} kcal · {calStatus.label}</span>
              </div>
            </div>

            {report.insights?.length > 0 && (
              <div className="card p-5">
                <p className="label flex items-center gap-1.5 mb-3"><Sparkles size={11} /> Key Insights</p>
                <ul className="space-y-2">
                  {report.insights.map((ins: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>{ins}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {report.actionableSteps?.length > 0 && (
              <div className="card p-5 border-blue-100 bg-blue-50/30">
                <p className="label flex items-center gap-1.5 mb-3"><CheckCircle2 size={11} /> Action Plan</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {report.actionableSteps.map((s: string, i: number) => (
                    <div key={i} className="flex gap-3 bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                      <p className="text-xs text-slate-700 leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={reset} className="btn-md btn-secondary w-full justify-center"><RefreshCw size={14} /> Start New Assessment</button>
          </div>
        )
      })()}
    </div>
  )
}
