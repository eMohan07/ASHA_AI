import React from 'react';
import { 
  TabletSmartphone, Salad, Coffee, Utensils,
  Thermometer, Activity, Frown, User,
  BrainCircuit, Network, Share2, Sparkles,
  Gauge, FileText, CheckCircle2, AlertTriangle
} from 'lucide-react';

export default function WorkflowSection() {
  return (
    <div className="w-full py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 text-center mb-8 uppercase tracking-wide">
          AI Healthcare Monitoring Workflow: From Intake to Risk Prediction
        </h2>

        <div className="flex flex-col lg:flex-row gap-4 items-stretch justify-center">
          
          {/* Step 1 */}
          <div className="flex-1 relative group">
            <div className="h-full bg-[#1e3a47] border-2 border-[#54979e] rounded-xl p-5 flex flex-col shadow-lg transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded bg-[#54979e] text-white flex items-center justify-center font-bold text-xl">1</span>
                <h3 className="text-white font-bold leading-tight uppercase">Step 1:<br/>Person Records Food Intake</h3>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                  <TabletSmartphone size={80} className="text-[#a4d4cc] stroke-1" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 gap-1 bg-white p-1 rounded">
                    <Salad size={16} className="text-green-600" />
                    <Coffee size={16} className="text-amber-700" />
                    <Utensils size={16} className="text-slate-500" />
                    <div className="w-4 h-4 bg-orange-300 rounded-full"></div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <div className="bg-[#172e38] p-2 rounded-full border border-[#3b6873]">
                    <Salad size={28} className="text-green-400" />
                  </div>
                  <div className="bg-[#172e38] p-2 rounded-full border border-[#3b6873]">
                    <Coffee size={28} className="text-amber-400" />
                  </div>
                  <div className="bg-[#172e38] p-2 rounded-full border border-[#3b6873]">
                    <div className="w-7 h-7 bg-orange-400 rounded-full opacity-80 border-2 border-orange-200"></div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[#a4d4cc] text-sm">Log daily meals, snacks, and portion sizes</p>
                  <div className="mt-3 flex items-end gap-1 justify-center h-4">
                     <div className="w-1 bg-[#54979e] h-2"></div>
                     <div className="w-1 bg-[#54979e] h-3"></div>
                     <div className="w-1 bg-[#54979e] h-4"></div>
                     <div className="w-1 bg-[#54979e] h-2"></div>
                     <div className="w-1 bg-[#54979e] h-4"></div>
                     <div className="w-1 bg-[#54979e] h-3"></div>
                     <FileText size={20} className="text-[#a4d4cc] ml-2" />
                  </div>
                </div>
              </div>
            </div>
            {/* Arrow for Desktop */}
            <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-6 h-10 flex items-center justify-center relative">
                <div className="absolute w-12 h-1 bg-gradient-to-r from-[#1e3a47] to-[#54979e]"></div>
                <div className="absolute right-0 w-3 h-3 border-t-2 border-r-2 border-[#54979e] transform rotate-45"></div>
              </div>
            </div>
            {/* Arrow for Mobile */}
            <div className="lg:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex justify-center w-full">
              <div className="w-10 h-6 flex flex-col items-center justify-center relative">
                <div className="absolute h-8 w-1 bg-gradient-to-b from-[#1e3a47] to-[#54979e]"></div>
                <div className="absolute bottom-0 w-3 h-3 border-b-2 border-r-2 border-[#54979e] transform rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex-1 relative group">
            <div className="h-full bg-[#1e3a47] border-2 border-[#54979e] rounded-xl p-5 flex flex-col shadow-lg transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded bg-[#54979e] text-white flex items-center justify-center font-bold text-xl">2</span>
                <h3 className="text-white font-bold leading-tight uppercase">Step 2:<br/>Enters Health Symptoms</h3>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Thermometer size={32} className="text-red-400" />
                    <User size={32} className="text-blue-300" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Frown size={32} className="text-blue-300" />
                    <Activity size={32} className="text-red-400" />
                  </div>
                </div>

                <div className="w-full">
                  <div className="text-xs text-center text-[#54979e] font-bold tracking-widest mb-2">SEVERITY</div>
                  <div className="flex justify-between items-end h-16 border-b-2 border-[#3b6873] pb-2 px-4">
                    <div className="flex flex-col items-center">
                       <Frown size={24} className="text-[#a4d4cc] mb-1" />
                       <div className="w-4 bg-orange-400 h-6 rounded-t"></div>
                    </div>
                    <div className="flex flex-col items-center">
                       <Thermometer size={24} className="text-red-400 mb-1" />
                       <div className="w-4 bg-red-500 h-10 rounded-t"></div>
                    </div>
                    <div className="flex flex-col items-center">
                       <Activity size={24} className="text-blue-400 mb-1" />
                       <div className="w-4 bg-blue-400 h-4 rounded-t"></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-[#a4d4cc] px-2 mt-1">
                    <span>FEVER</span>
                    <span>HEADACHE</span>
                    <span>FATIGUE</span>
                  </div>
                </div>

                <div className="text-center flex items-center gap-3 bg-[#172e38] p-3 rounded-lg border border-[#3b6873]">
                  <p className="text-[#a4d4cc] text-xs text-left">Select and rate severity of various symptoms (e.g., fever, cough, fatigue)</p>
                  <FileText size={24} className="text-[#54979e] shrink-0" />
                </div>
              </div>
            </div>
            {/* Arrow for Desktop */}
            <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-6 h-10 flex items-center justify-center relative">
                <div className="absolute w-12 h-1 bg-gradient-to-r from-[#1e3a47] to-[#54979e]"></div>
                <div className="absolute right-0 w-3 h-3 border-t-2 border-r-2 border-[#54979e] transform rotate-45"></div>
              </div>
            </div>
            {/* Arrow for Mobile */}
            <div className="lg:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex justify-center w-full">
              <div className="w-10 h-6 flex flex-col items-center justify-center relative">
                <div className="absolute h-8 w-1 bg-gradient-to-b from-[#1e3a47] to-[#54979e]"></div>
                <div className="absolute bottom-0 w-3 h-3 border-b-2 border-r-2 border-[#54979e] transform rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex-1 relative group lg:flex-grow-[1.2]">
            <div className="h-full bg-[#142632] border-2 border-[#54979e] rounded-xl p-5 flex flex-col shadow-lg transition-transform hover:-translate-y-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded bg-[#54979e] text-white flex items-center justify-center font-bold text-xl">3</span>
                <h3 className="text-white font-bold leading-tight uppercase">Step 3:<br/>AI Analyzes Health Patterns</h3>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative mb-6">
                  {/* Glowing effect behind brain */}
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                  <BrainCircuit size={140} className="text-blue-300 stroke-1 relative z-10 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                  
                  {/* Floating nodes */}
                  <Network className="absolute top-0 -right-4 text-[#54979e] animate-pulse" size={32} />
                  <Share2 className="absolute bottom-4 -left-6 text-indigo-400 animate-pulse delay-75" size={28} />
                  <Sparkles className="absolute top-1/2 -right-8 text-blue-200 animate-pulse delay-150" size={24} />
                </div>

                <div className="w-full mb-4">
                  <div className="flex items-end justify-center gap-1 h-6">
                     <div className="w-1.5 bg-blue-400 h-2"></div>
                     <div className="w-1.5 bg-[#54979e] h-4"></div>
                     <div className="w-1.5 bg-indigo-400 h-6"></div>
                     <div className="w-1.5 bg-[#54979e] h-3"></div>
                     <div className="w-1.5 bg-blue-400 h-5"></div>
                     <div className="w-1.5 bg-[#54979e] h-2"></div>
                     <div className="mx-2 text-[#54979e]">•••</div>
                     <div className="w-1.5 bg-indigo-400 h-4"></div>
                     <div className="w-1.5 bg-blue-400 h-3"></div>
                     <div className="w-1.5 bg-[#54979e] h-5"></div>
                  </div>
                </div>

                <p className="text-center text-[#a4d4cc] text-sm max-w-[200px]">
                  Processes food and symptom data, identifying correlations and trends
                </p>

                <div className="flex justify-center gap-6 mt-4">
                  <Network size={24} className="text-orange-400" />
                  <Share2 size={24} className="text-blue-400" />
                  <div className="w-6 h-6 border-2 border-dashed border-[#54979e] rounded-full animate-[spin_4s_linear_infinite]"></div>
                </div>
              </div>
            </div>
            
            {/* Dual Arrows for Desktop */}
            <div className="hidden lg:flex flex-col gap-12 absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-6 h-10 flex items-center justify-center relative">
                <div className="absolute w-12 h-1 bg-gradient-to-r from-[#142632] to-[#54979e]"></div>
                <div className="absolute right-0 w-3 h-3 border-t-2 border-r-2 border-[#54979e] transform rotate-45"></div>
              </div>
              <div className="w-6 h-10 flex items-center justify-center relative">
                <div className="absolute w-12 h-1 bg-gradient-to-r from-[#142632] to-[#54979e]"></div>
                <div className="absolute right-0 w-3 h-3 border-t-2 border-r-2 border-[#54979e] transform rotate-45"></div>
              </div>
            </div>
            {/* Dual Arrows for Mobile */}
            <div className="lg:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-4 w-full justify-center">
              <div className="w-6 h-8 flex flex-col items-center justify-center relative">
                <div className="absolute h-8 w-1 bg-gradient-to-b from-[#142632] to-[#54979e]"></div>
                <div className="absolute bottom-0 w-3 h-3 border-b-2 border-r-2 border-[#54979e] transform rotate-45"></div>
              </div>
              <div className="w-6 h-8 flex flex-col items-center justify-center relative">
                <div className="absolute h-8 w-1 bg-gradient-to-b from-[#142632] to-[#54979e]"></div>
                <div className="absolute bottom-0 w-3 h-3 border-b-2 border-r-2 border-[#54979e] transform rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-[#1e3a47] border-2 border-[#54979e] rounded-xl p-5 flex flex-col shadow-lg transition-transform hover:-translate-y-1 flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-8 rounded bg-[#54979e] text-white flex items-center justify-center font-bold text-xl">4</span>
                <h3 className="text-white font-bold leading-tight uppercase">Step 4:<br/>Disease Risk Prediction & Health Report</h3>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="flex items-center justify-center gap-6 w-full">
                  <div className="relative w-24 h-12 overflow-hidden">
                    <div className="w-24 h-24 rounded-full border-[12px] border-r-red-500 border-t-yellow-400 border-l-green-400 border-b-transparent transform rotate-45 absolute top-0"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#54979e] rounded-full"></div>
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 -rotate-12 w-1 h-12 bg-slate-300 origin-bottom"></div>
                    <span className="absolute bottom-[-2px] left-1/2 transform -translate-x-1/2 text-[10px] text-white font-bold tracking-widest">RISK</span>
                  </div>
                  
                  <div className="relative">
                    <FileText size={60} className="text-[#a4d4cc] stroke-1" />
                    <div className="absolute top-2 right-2">
                       <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-blue-500 text-[10px] font-bold">+</div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full border-2 border-[#1e3a47]">
                      <CheckCircle2 size={24} className="text-white" />
                    </div>
                  </div>
                </div>

                <p className="text-center text-[#a4d4cc] text-sm">
                  Generates risk scores, detects potential issues, and offers summary report
                </p>
              </div>
            </div>

            {/* Actionable Insights Text */}
            <div className="bg-white border-2 border-slate-100 rounded-xl p-4 flex flex-col justify-center items-center shadow-sm">
               <h3 className="text-slate-800 font-black text-xl text-center leading-tight uppercase">
                 Actionable<br/>Insights For<br/>Personal Health
               </h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
