"use client"
import React, { useState } from 'react';
<<<<<<< HEAD
import { Mic, FileText, Loader2, Sparkles, User, Activity, ClipboardList } from 'lucide-react';
=======
import { Mic, FileText, Loader2, Sparkles, User, Activity, ClipboardList, AlertTriangle } from 'lucide-react';
>>>>>>> a096889 (Updated ASHA AI frontend and dashboard)

export default function AmbientScriber() {
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<any>(null);

  const handleScribe = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/ambient-scribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });
      const data = await response.json();
      setRecord(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
      
      {/* Left side: Input */}
      <div className="w-full md:w-1/2 p-6 border-r border-slate-100 flex flex-col bg-slate-50">
         <div className="mb-6">
           <h2 className="font-bold text-xl text-slate-800 flex items-center gap-2 mb-2">
             <Mic className="text-purple-600" /> Ambient Scribing
           </h2>
           <p className="text-sm text-slate-500">Paste or type the raw conversation transcript to auto-fill the patient record.</p>
         </div>

         <div className="flex-1 flex flex-col relative">
            <textarea 
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="e.g., 'I visited Sunita's house today. She says her 3-year-old son Rahul has had a fever since last night. He is coughing a bit but no vomiting. I checked his temp and it was 101F. I told her to give him paracetamol and keep him hydrated.'"
              className="flex-1 w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none resize-none text-sm leading-relaxed"
            />
            
            <button 
              onClick={handleScribe}
              disabled={loading || !transcript.trim()}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              {loading ? 'Scribing & Extracting...' : 'Auto-Fill Record'}
            </button>
         </div>
      </div>

      {/* Right side: Output Form */}
      <div className="w-full md:w-1/2 p-6 bg-white flex flex-col">
         <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
           <FileText className="text-slate-400" /> Structured Patient Record
         </h3>

         {!record && !loading && (
           <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
             <FileText size={48} className="opacity-20 mb-4" />
             <p className="text-center text-sm max-w-xs">Awaiting transcript data. Scribing will automatically extract clinical information.</p>
           </div>
         )}

         {loading && (
           <div className="flex-1 flex flex-col items-center justify-center text-purple-400">
             <Loader2 size={48} className="animate-spin mb-4" />
             <p className="font-medium animate-pulse text-sm">Structuring data...</p>
           </div>
         )}

         {record && !loading && (
           <div className="flex-1 overflow-y-auto pr-2 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
             
             {/* Patient Context & CC */}
             <div className="space-y-4">
               <div>
                 <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                   <User size={14} /> Patient Context
                 </label>
                 <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm font-medium text-slate-700">
                   {record.patientContext}
                 </div>
               </div>
               <div>
                 <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                   <AlertTriangle size={14} /> Chief Complaint
                 </label>
                 <div className="bg-red-50 text-red-900 p-3 rounded-lg border border-red-100 text-sm font-bold">
                   {record.chiefComplaint}
                 </div>
               </div>
             </div>

             {/* Symptoms & Vitals */}
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                   <Activity size={14} /> Symptoms
                 </label>
                 <ul className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-700 space-y-1">
                   {record.symptoms.length > 0 ? record.symptoms.map((sym: string, i: number) => <li key={i}>• {sym}</li>) : <li>None reported</li>}
                 </ul>
               </div>
               <div>
                 <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                   <Activity size={14} /> Vitals
                 </label>
                 <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-700 space-y-2">
                   <div className="flex justify-between"><span className="text-slate-500">Temp:</span> <span className="font-medium">{record.vitals.temperature || '--'}</span></div>
                   <div className="flex justify-between"><span className="text-slate-500">BP:</span> <span className="font-medium">{record.vitals.bloodPressure || '--'}</span></div>
                   <div className="flex justify-between"><span className="text-slate-500">Other:</span> <span className="font-medium">{record.vitals.other || '--'}</span></div>
                 </div>
               </div>
             </div>

             {/* Action Plan */}
             <div>
                 <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                   <ClipboardList size={14} /> Action Plan / Next Steps
                 </label>
                 <ul className="bg-purple-50 p-3 rounded-lg border border-purple-100 text-sm text-purple-900 space-y-2">
                   {record.actionPlan.length > 0 ? record.actionPlan.map((act: string, i: number) => (
                     <li key={i} className="flex gap-2 items-start">
                       <span className="bg-purple-200 text-purple-800 w-5 h-5 flex items-center justify-center rounded text-xs font-bold shrink-0">{i+1}</span>
                       <span>{act}</span>
                     </li>
                   )) : <li>No actions identified</li>}
                 </ul>
             </div>

           </div>
         )}
      </div>

    </div>
  );
}
