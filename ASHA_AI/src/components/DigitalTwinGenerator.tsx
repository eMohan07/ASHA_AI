"use client"
import React, { useState } from 'react';
import { UserPlus, TrendingUp, TrendingDown, Sparkles, Loader2, Info, CheckCircle2 } from 'lucide-react';

export default function DigitalTwinGenerator() {
  const [profile, setProfile] = useState('');
  const [loading, setLoading] = useState(false);
  const [twinData, setTwinData] = useState<any>(null);

  const handleGenerate = async () => {
    if (!profile.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/digital-twin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });
      const data = await response.json();
      setTwinData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden min-h-[600px] flex flex-col">
      <div className="bg-pink-700 p-5 text-white">
        <h2 className="font-bold text-xl flex items-center gap-2">
          <Sparkles size={24} className="text-pink-200" /> Digital Twin
        </h2>
        <p className="text-pink-100 text-sm">Personalized health trajectories for patients</p>
      </div>

      <div className="p-6 flex flex-col md:flex-row gap-8 flex-1 bg-slate-50">
        {/* Left Input Section */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <label className="block text-sm font-bold text-slate-700 mb-3">Patient Profile</label>
            <textarea 
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              placeholder="e.g., Pregnant woman, 6 months, mild anemia, low protein intake..."
              className="w-full h-40 p-4 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-pink-500 outline-none mb-4 resize-none"
            />
            <button 
              onClick={handleGenerate}
              disabled={loading || !profile.trim()}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <TrendingUp size={18} />}
              {loading ? 'Analyzing Profile...' : 'Generate Digital Twin'}
            </button>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
            <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Digital Twin turns abstract nutrition and health advice into visual proof patients act on by showing their future health journey.
            </p>
          </div>
        </div>

        {/* Right Output Section */}
        <div className="w-full md:w-2/3 flex flex-col">
          {!twinData && !loading && (
            <div className="flex-1 bg-white rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 p-12">
              <UserPlus size={64} className="opacity-10 mb-4" />
              <p className="text-center font-medium">Enter a patient profile to generate their Digital Twin health trajectory.</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col items-center justify-center text-pink-500 p-12 shadow-sm">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="font-bold animate-pulse">Building Health Journey...</p>
            </div>
          )}

          {twinData && !loading && (
            <div className="flex-1 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
<<<<<<< HEAD
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Current State */}
                <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm">
                  <div className="flex items-center gap-2 text-red-600 font-bold mb-3 uppercase tracking-wider text-xs">
                    <TrendingDown size={14} /> Current Trajectory
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2">{twinData.current.status}</h4>
                  <p className="text-sm text-slate-600 mb-4">{twinData.current.trajectory}</p>
                  <ul className="space-y-1.5">
                    {twinData.current.risks.map((risk: string, i: number) => (
                      <li key={i} className="text-xs text-red-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> {risk}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Optimized State */}
                <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm">
                  <div className="flex items-center gap-2 text-green-600 font-bold mb-3 uppercase tracking-wider text-xs">
                    <TrendingUp size={14} /> Optimized Trajectory
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-2">{twinData.optimized.status}</h4>
                  <p className="text-sm text-slate-600 mb-4">{twinData.optimized.trajectory}</p>
                  <ul className="space-y-1.5">
                    {twinData.optimized.benefits.map((benefit: string, i: number) => (
                      <li key={i} className="text-xs text-green-600 flex items-center gap-2">
                        <CheckCircle2 size={12} /> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Advice */}
              <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 shadow-sm">
                <h4 className="font-bold text-pink-800 mb-4 flex items-center gap-2">
                  <Sparkles size={18} /> Personalized Advice for Impact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {twinData.advice.map((adv: string, i: number) => (
                    <div key={i} className="bg-white p-3 rounded-lg border border-pink-200 text-sm text-slate-700 flex items-center gap-3">
                      <div className="bg-pink-100 text-pink-600 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">{i+1}</div>
                      {adv}
                    </div>
                  ))}
                </div>
              </div>
=======
              {twinData.message ? (
                <div className="flex-1 bg-red-50 rounded-xl border border-red-200 flex flex-col items-center justify-center text-red-600 p-12 text-center">
                  <Info size={48} className="mb-4 opacity-50" />
                  <p className="font-bold text-lg mb-2">Analysis Failed</p>
                  <p className="text-sm opacity-80">{twinData.message}</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Current State */}
                    <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm">
                      <div className="flex items-center gap-2 text-red-600 font-bold mb-3 uppercase tracking-wider text-xs">
                        <TrendingDown size={14} /> Current Trajectory
                      </div>
                      <h4 className="font-bold text-slate-800 text-lg mb-2">{twinData.current?.status || "Unknown"}</h4>
                      <p className="text-sm text-slate-600 mb-4">{twinData.current?.trajectory || "Data unavailable"}</p>
                      <ul className="space-y-1.5">
                        {twinData.current?.risks?.map((risk: string, i: number) => (
                          <li key={i} className="text-xs text-red-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> {risk}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Optimized State */}
                    <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm">
                      <div className="flex items-center gap-2 text-green-600 font-bold mb-3 uppercase tracking-wider text-xs">
                        <TrendingUp size={14} /> Optimized Trajectory
                      </div>
                      <h4 className="font-bold text-slate-800 text-lg mb-2">{twinData.optimized?.status || "Unknown"}</h4>
                      <p className="text-sm text-slate-600 mb-4">{twinData.optimized?.trajectory || "Data unavailable"}</p>
                      <ul className="space-y-1.5">
                        {twinData.optimized?.benefits?.map((benefit: string, i: number) => (
                          <li key={i} className="text-xs text-green-600 flex items-center gap-2">
                            <CheckCircle2 size={12} /> {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Advice */}
                  <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 shadow-sm">
                    <h4 className="font-bold text-pink-800 mb-4 flex items-center gap-2">
                      <Sparkles size={18} /> Personalized Advice for Impact
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {twinData.advice?.map((adv: string, i: number) => (
                        <div key={i} className="bg-white p-3 rounded-lg border border-pink-200 text-sm text-slate-700 flex items-center gap-3">
                          <div className="bg-pink-100 text-pink-600 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">{i+1}</div>
                          {adv}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
