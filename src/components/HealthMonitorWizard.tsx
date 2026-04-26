"use client"
import React, { useState } from 'react';
import { 
  TabletSmartphone, Salad, Coffee, Utensils,
  Thermometer, Activity, Frown, 
  BrainCircuit, Network, Share2, Sparkles,
  Gauge, FileText, CheckCircle2, ChevronRight, ChevronLeft
} from 'lucide-react';
import { getRiskAssessment } from '@/lib/claudeAPI';

export default function HealthMonitorWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  // Step 1 State
  const [foodItems, setFoodItems] = useState([
    { meal: 'Breakfast', food: 'Oatmeal', portion: 'Medium' }
  ]);
  const [newFood, setNewFood] = useState({ meal: 'Lunch', food: '', portion: 'Medium' });

  // Step 2 State
  const [symptoms, setSymptoms] = useState({
    fever: 0,
    headache: 0,
    fatigue: 0
  });

  const handleAddFood = () => {
    if (newFood.food.trim()) {
      setFoodItems([...foodItems, newFood]);
      setNewFood({ meal: 'Snack', food: '', portion: 'Medium' });
    }
  };

  const handleRemoveFood = (index: number) => {
    setFoodItems(foodItems.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    setStep(3); // Go to loading/analysis step
    setLoading(true);
    
    try {
      const data = await getRiskAssessment(foodItems, symptoms);
      setReport(data);
      setStep(4);
    } catch (err) {
      console.error(err);
      // Fallback in case of error
      setReport({
        riskLevel: 'Error',
        score: 0,
        summary: 'Failed to generate report due to a network error.',
        correlations: [],
        insights: [],
        actionableSteps: ['Please try again later.']
      });
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col min-h-[500px]">
      {/* Header */}
      <div className="bg-[#1e3a47] p-4 text-white flex justify-between items-center">
        <h2 className="font-bold uppercase tracking-wider text-sm flex items-center gap-2">
          <Activity size={18} className="text-[#54979e]" />
          Health Monitor Workflow
        </h2>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`w-8 h-2 rounded-full ${step >= i ? 'bg-[#54979e]' : 'bg-[#172e38]'}`}></div>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col bg-slate-50">
        
        {/* Step 1: Food Intake */}
        {step === 1 && (
          <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#54979e] text-white p-2 rounded-lg"><TabletSmartphone size={24} /></div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 1: Record Food Intake</h3>
                <p className="text-sm text-slate-500">Log your daily meals, snacks, and portions.</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6">
              <div className="flex gap-3 mb-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Meal</label>
                  <select 
                    value={newFood.meal} 
                    onChange={e => setNewFood({...newFood, meal: e.target.value})}
                    className="w-full border border-slate-200 rounded-md p-2 text-sm bg-slate-50 focus:ring-2 focus:ring-[#54979e] outline-none"
                  >
                    <option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option>
                  </select>
                </div>
                <div className="flex-[2]">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Food Item</label>
                  <input 
                    type="text" 
                    value={newFood.food} 
                    onChange={e => setNewFood({...newFood, food: e.target.value})}
                    placeholder="e.g., Rice and lentils"
                    className="w-full border border-slate-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-[#54979e] outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Portion</label>
                  <select 
                    value={newFood.portion} 
                    onChange={e => setNewFood({...newFood, portion: e.target.value})}
                    className="w-full border border-slate-200 rounded-md p-2 text-sm bg-slate-50 focus:ring-2 focus:ring-[#54979e] outline-none"
                  >
                    <option>Small</option><option>Medium</option><option>Large</option>
                  </select>
                </div>
                <button 
                  onClick={handleAddFood}
                  disabled={!newFood.food.trim()}
                  className="bg-[#54979e] text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-[#437a80] transition-colors disabled:opacity-50"
                >
                  Add
                </button>
              </div>

              {foodItems.length > 0 ? (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Today's Log</h4>
                  {foodItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-3">
                        {item.meal === 'Breakfast' ? <Coffee size={18} className="text-amber-600"/> :
                         item.meal === 'Snack' ? <Salad size={18} className="text-green-500"/> :
                         <Utensils size={18} className="text-slate-500"/>}
                        <div>
                          <p className="text-sm font-bold text-slate-700">{item.food}</p>
                          <p className="text-xs text-slate-500">{item.meal} • {item.portion} portion</p>
                        </div>
                      </div>
                      <button onClick={() => handleRemoveFood(idx)} className="text-red-400 hover:text-red-600 text-sm font-medium">Remove</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-sm">No food logged yet today.</div>
              )}
            </div>

            <div className="flex justify-end mt-auto">
              <button 
                onClick={() => setStep(2)}
                className="flex items-center gap-2 bg-[#1e3a47] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#142632] transition-colors"
              >
                Next Step <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Symptoms */}
        {step === 2 && (
          <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#54979e] text-white p-2 rounded-lg"><Thermometer size={24} /></div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 2: Enter Health Symptoms</h3>
                <p className="text-sm text-slate-500">Rate the severity of any current symptoms.</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6 flex-1 space-y-8">
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 font-bold text-slate-700"><Frown size={18} className="text-orange-400"/> Fever</label>
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600">{symptoms.fever}/10</span>
                </div>
                <input 
                  type="range" min="0" max="10" 
                  value={symptoms.fever} 
                  onChange={(e) => setSymptoms({...symptoms, fever: parseInt(e.target.value)})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 font-bold text-slate-700"><Activity size={18} className="text-red-500"/> Headache</label>
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600">{symptoms.headache}/10</span>
                </div>
                <input 
                  type="range" min="0" max="10" 
                  value={symptoms.headache} 
                  onChange={(e) => setSymptoms({...symptoms, headache: parseInt(e.target.value)})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 font-bold text-slate-700"><Thermometer size={18} className="text-blue-500"/> Fatigue</label>
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600">{symptoms.fatigue}/10</span>
                </div>
                <input 
                  type="range" min="0" max="10" 
                  value={symptoms.fatigue} 
                  onChange={(e) => setSymptoms({...symptoms, fatigue: parseInt(e.target.value)})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

            </div>

            <div className="flex justify-between mt-auto">
              <button 
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium px-4 py-2 transition-colors"
              >
                <ChevronLeft size={18} /> Back
              </button>
              <button 
                onClick={handleAnalyze}
                className="flex items-center gap-2 bg-[#1e3a47] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#142632] transition-colors"
              >
                Analyze Health <BrainCircuit size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: AI Processing */}
        {step === 3 && (
          <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-500 py-12">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <BrainCircuit size={120} className="text-[#54979e] relative z-10 animate-bounce" style={{animationDuration: '2s'}} />
              <Network className="absolute top-0 -right-4 text-blue-500 animate-spin" size={32} style={{animationDuration: '4s'}} />
              <Sparkles className="absolute bottom-4 -left-6 text-amber-400 animate-pulse delay-150" size={28} />
            </div>
            <h3 className="font-bold text-2xl text-slate-800 mb-2">AI Analyzes Health Patterns</h3>
            <p className="text-slate-500 text-center max-w-sm">
              Processing your food intake and symptom data to identify correlations and generate risk predictions...
            </p>
            <div className="mt-8 flex gap-2">
              <div className="w-2 h-2 bg-[#54979e] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-2 h-2 bg-[#54979e] rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-2 h-2 bg-[#54979e] rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        )}

        {/* Step 4: Report */}
        {step === 4 && report && (
          <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#54979e] text-white p-2 rounded-lg"><FileText size={24} /></div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">Step 4: Disease Risk Prediction</h3>
                <p className="text-sm text-slate-500">Your personalized health report and actionable insights.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="md:col-span-1 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center text-center">
                 <div className="relative w-24 h-12 overflow-hidden mb-4">
                    <div className="w-24 h-24 rounded-full border-[12px] border-r-red-500 border-t-yellow-400 border-l-green-400 border-b-transparent transform rotate-45 absolute top-0"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-800 rounded-full"></div>
                    <div 
                      className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-slate-800 origin-bottom transition-transform duration-1000 ease-out"
                      style={{ transform: `translateX(-50%) rotate(${report.score * 1.8 - 90}deg)` }}
                    ></div>
                 </div>
                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Risk Score</h4>
                 <div className="text-3xl font-black text-slate-800 mb-1">{report.score}/100</div>
                 <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                   report.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                   report.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' :
                   report.riskLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                   'bg-green-100 text-green-700'
                 }`}>
                   {report.riskLevel} Risk
                 </span>
              </div>

              <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500"/> Summary
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{report.summary}</p>
                
                {report.insights && report.insights.length > 0 && (
                  <>
                    <h4 className="font-bold text-slate-800 mb-2 text-sm">Key Insights:</h4>
                    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                      {report.insights.map((insight: string, i: number) => <li key={i}>{insight}</li>)}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {report.actionableSteps && report.actionableSteps.length > 0 && (
              <div className="bg-[#1e3a47] rounded-xl p-5 text-white shadow-md">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-[#54979e]"/> Actionable Steps
                </h4>
                <div className="space-y-2">
                  {report.actionableSteps.map((step: string, i: number) => (
                    <div key={i} className="flex gap-3 bg-[#172e38] p-3 rounded-lg border border-[#2b5163]">
                       <div className="bg-[#54979e] w-6 h-6 rounded flex items-center justify-center font-bold text-xs shrink-0">{i+1}</div>
                       <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center mt-6">
               <button 
                onClick={() => { setStep(1); setFoodItems([]); setSymptoms({fever:0, headache:0, fatigue:0}); }}
                className="text-slate-500 hover:text-slate-800 font-medium px-4 py-2 transition-colors underline"
              >
                Start New Assessment
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
