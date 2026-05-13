"use client"
import React, { useState } from 'react'
import {
  Utensils, Thermometer, Activity, BrainCircuit,
  FileText, Plus, Trash2, ChevronLeft, ChevronRight,
  CheckCircle2, Sparkles, Loader2, RefreshCw, AlertCircle
} from 'lucide-react'
import { getRiskAssessment } from '@/lib/claudeAPI'

const STEPS = [
  { id: 1, label: 'Food Intake',   icon: Utensils },
  { id: 2, label: 'Symptoms',      icon: Thermometer },
  { id: 3, label: 'Analysis',      icon: BrainCircuit },
  { id: 4, label: 'Report',        icon: FileText },
]

export default function HealthMonitorWizard() {
  const [step, setStep]     = useState(1)
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<any>(null)

  const [foodItems, setFoodItems] = useState([
    { meal: 'Breakfast', food: 'Oatmeal with vegetables', portion: 'Medium' }
  ])
  const [newFood, setNewFood] = useState({ meal: 'Lunch', food: '', portion: 'Medium' })

  const [symptoms, setSymptoms] = useState({ fever: 0, headache: 0, fatigue: 0 })

  const handleAddFood = () => {
    if (newFood.food.trim()) {
      setFoodItems(prev => [...prev, { ...newFood }])
      setNewFood(f => ({ ...f, food: '' }))
    }
  }

  const handleAnalyze = async () => {
    setStep(3); setLoading(true)
    try {
      const data = await getRiskAssessment(foodItems, symptoms)
      setReport(data); setStep(4)
    } catch {
      setReport({
        riskLevel: 'Error', score: 0,
        summary: 'Failed to generate report. Check your network connection.',
        correlations: [], insights: [],
        actionableSteps: ['Please try again.'],
      }); setStep(4)
    } finally { setLoading(false) }
  }

  const reset = () => {
    setStep(1); setReport(null)
    setFoodItems([{ meal: 'Breakfast', food: 'Oatmeal with vegetables', portion: 'Medium' }])
    setSymptoms({ fever: 0, headache: 0, fatigue: 0 })
  }

  const RISK_STYLE: Record<string, any> = {
    Low:      { badge: 'badge-green',  bar: 'bg-emerald-500', text: 'text-emerald-700' },
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
          <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
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

      {/* Step progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const done = step > s.id
          const active = step === s.id
          return (
            <React.Fragment key={s.id}>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                active ? 'bg-emerald-600 text-white shadow-sm'
                : done  ? 'bg-emerald-50 text-emerald-700'
                         : 'bg-slate-100 text-slate-400'
              }`}>
                {done ? <CheckCircle2 size={12} /> : <Icon size={12} />}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px transition-colors ${done ? 'bg-emerald-200' : 'bg-slate-100'}`} />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* ── Step 1: Food intake ── */}
      {step === 1 && (
        <div className="card p-6 space-y-5 animate-slide-up">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-0.5">Daily Food Intake</h2>
            <p className="text-xs text-slate-500">Log what the patient has eaten today.</p>
          </div>

          {/* Add food form */}
          <div className="bg-slate-50 rounded-xl p-4 space-y-3 border border-slate-100">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="label">Meal</label>
                <select
                  value={newFood.meal}
                  onChange={e => setNewFood(f => ({ ...f, meal: e.target.value }))}
                  className="input text-xs py-2"
                >
                  {['Breakfast','Lunch','Dinner','Snack'].map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="label">Food Item</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFood.food}
                    onChange={e => setNewFood(f => ({ ...f, food: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && handleAddFood()}
                    placeholder="e.g. Rice, Dal, local greens"
                    className="input text-xs py-2 flex-1"
                  />
                  <button
                    onClick={handleAddFood}
                    disabled={!newFood.food.trim()}
                    className="btn-sm btn-primary px-3"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Food log */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Today's Log ({foodItems.length} items)
            </p>
            {foodItems.length === 0 ? (
              <div className="flex items-center justify-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
                <p className="text-sm text-slate-400">No items logged yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {foodItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-slate-100 group">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                      <Utensils size={14} className="text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{item.food}</p>
                      <p className="text-xs text-slate-400">{item.meal} · {item.portion} portion</p>
                    </div>
                    <button
                      onClick={() => setFoodItems(prev => prev.filter((_, idx) => idx !== i))}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button onClick={() => setStep(2)} className="btn-md btn-primary">
              Next: Symptoms <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Symptoms ── */}
      {step === 2 && (
        <div className="card p-6 space-y-6 animate-slide-up">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-0.5">Symptom Severity</h2>
            <p className="text-xs text-slate-500">Rate the severity of each symptom on a scale of 0–10.</p>
          </div>

          <div className="space-y-6">
            {[
              { key: 'fever',    label: 'Fever / Temperature',  desc: 'Body temperature above normal', color: 'text-orange-500', accent: '#f97316' },
              { key: 'headache', label: 'Headache / Head Pain',  desc: 'Intensity of pain in the head', color: 'text-red-500',    accent: '#ef4444' },
              { key: 'fatigue',  label: 'Fatigue / Weakness',    desc: 'Energy level and overall tiredness', color: 'text-blue-500',  accent: '#3b82f6' },
            ].map(sym => (
              <div key={sym.key} className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{sym.label}</p>
                    <p className="text-xs text-slate-400">{sym.desc}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`text-2xl font-bold ${sym.color}`}>
                      {(symptoms as any)[sym.key]}
                    </span>
                    <span className="text-[10px] text-slate-400">/ 10</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range" min={0} max={10} step={1}
                    value={(symptoms as any)[sym.key]}
                    onChange={e => setSymptoms(s => ({ ...s, [sym.key]: +e.target.value }))}
                    className="w-full h-2 appearance-none rounded-full cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${sym.accent} 0%, ${sym.accent} ${(symptoms as any)[sym.key] * 10}%, #e2e8f0 ${(symptoms as any)[sym.key] * 10}%, #e2e8f0 100%)`
                    }}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-slate-400">None</span>
                    <span className="text-[10px] text-slate-400">Severe</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button onClick={() => setStep(1)} className="btn-md btn-ghost">
              <ChevronLeft size={15} /> Back
            </button>
            <button onClick={handleAnalyze} className="btn-md btn-primary">
              <BrainCircuit size={15} /> Run AI Analysis
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Processing ── */}
      {step === 3 && (
        <div className="card p-12 flex flex-col items-center gap-5 animate-fade-in">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
              <BrainCircuit size={28} className="text-emerald-600" />
            </div>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
              <Loader2 size={11} className="text-white animate-spin" />
            </span>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-900">Analyzing patient data...</p>
            <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
              Correlating nutritional intake with symptom severity to generate your risk assessment
            </p>
          </div>
          <div className="flex gap-1.5">
            {[0, 200, 400].map(d => (
              <span key={d} className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        </div>
      )}

      {/* ── Step 4: Report ── */}
      {step === 4 && report && (() => {
        const rs = RISK_STYLE[report.riskLevel] || RISK_STYLE.Error
        const pct = Math.min(100, Math.max(0, report.score))
        return (
          <div className="space-y-4 animate-slide-up">

            {/* Score card */}
            <div className="card p-6">
              <div className="flex items-center gap-5 mb-5">
                <div className="shrink-0 text-center">
                  <p className={`text-5xl font-bold ${rs.text}`}>{report.score}</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Risk Score</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={rs.badge}>{report.riskLevel} Risk</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${rs.bar} rounded-full transition-all duration-1000`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">{report.summary}</p>
                </div>
              </div>
            </div>

            {/* Insights */}
            {report.insights?.length > 0 && (
              <div className="card p-5">
                <p className="label flex items-center gap-1.5 mb-3"><Sparkles size={11} /> Key Insights</p>
                <ul className="space-y-2">
                  {report.insights.map((ins: string, i: number) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      {ins}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action plan */}
            {report.actionableSteps?.length > 0 && (
              <div className="card p-5 border-emerald-100 bg-emerald-50/30">
                <p className="label flex items-center gap-1.5 mb-3"><CheckCircle2 size={11} /> Action Plan</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {report.actionableSteps.map((s: string, i: number) => (
                    <div key={i} className="flex gap-3 bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <p className="text-xs text-slate-700 leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={reset} className="btn-md btn-secondary w-full justify-center">
              <RefreshCw size={14} /> Start New Assessment
            </button>
          </div>
        )
      })()}
    </div>
  )
}
