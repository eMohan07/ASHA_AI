"use client"
import React, { useState, useEffect } from 'react';
import { Mic, Activity, AlertTriangle, CheckCircle2, Play, Square, Loader2 } from 'lucide-react';

export default function RespiratoryAnalyzer() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Simulated cough types for the prototype to choose from randomly
  const coughProfiles = [
    { type: "Wet, rattling, productive cough with wheezing", duration: "Frequent bouts lasting 10+ seconds" },
    { type: "Dry, hacking, persistent cough", duration: "Short bursts, continuous throughout day" },
    { type: "Clear, occasional throat-clearing cough", duration: "Very infrequent, lasting 1-2 seconds" }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => setRecordingTime(t => t + 1), 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      // Stop and analyze
      setIsRecording(false);
      handleAnalyze();
    } else {
      // Start recording
      setIsRecording(true);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Pick a random profile to simulate real-world variance in this prototype
    const profile = coughProfiles[Math.floor(Math.random() * coughProfiles.length)];

    try {
      const response = await fetch('/api/analyze-cough', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setResult({
        index: 'Error',
        score: 0,
        analysis: 'Failed to process audio data.',
        recommendation: 'Try recording again.'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-teal-100 overflow-hidden flex flex-col min-h-[500px]">
      <div className="bg-teal-700 p-4 text-white">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Activity size={20} />
          Acoustic Respiratory Assessment
        </h2>
        <p className="text-teal-100 text-sm">AI-powered Lung Health Index generation</p>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center bg-teal-50/30">
        
        {/* Recording Interface */}
        {!result && !isAnalyzing && (
          <div className="flex flex-col items-center animate-in fade-in duration-300">
            <div className={`relative flex items-center justify-center w-40 h-40 rounded-full mb-8 ${isRecording ? 'bg-red-50' : 'bg-teal-50'}`}>
              {isRecording && (
                <>
                  <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-20"></div>
                  <div className="absolute inset-2 rounded-full border-4 border-red-400 animate-pulse opacity-40"></div>
                </>
              )}
              <button 
                onClick={toggleRecording}
                className={`z-10 w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl transition-all ${
                  isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-600 hover:bg-teal-700'
                }`}
              >
                {isRecording ? <Square size={32} /> : <Mic size={40} />}
              </button>
            </div>
            
            <div className="text-center">
              <h3 className="font-bold text-xl text-slate-800 mb-2">
                {isRecording ? "Recording Patient Cough..." : "Tap to Record Cough"}
              </h3>
              <p className="text-slate-500 mb-4 h-6">
                {isRecording ? `00:0${recordingTime}` : "Ensure the patient is close to the microphone"}
              </p>
            </div>
          </div>
        )}

        {/* Analyzing State */}
        {isAnalyzing && (
          <div className="flex flex-col items-center animate-in fade-in duration-300 py-12">
            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
               <Loader2 size={64} className="text-teal-600 animate-spin absolute" />
               <Activity size={32} className="text-teal-400 animate-pulse" />
            </div>
            <h3 className="font-bold text-xl text-slate-800 mb-2">Analyzing Acoustic Signatures</h3>
            <p className="text-slate-500 text-center max-w-xs">
              Extracting frequency patterns and generating Lung Health Index...
            </p>
          </div>
        )}

        {/* Results State */}
        {result && !isAnalyzing && (
          <div className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center mb-6">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Lung Health Index</h3>
               
               <div className="flex justify-center mb-4">
                 <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center ${
                   result.index === 'High Risk' ? 'border-red-500 text-red-600' :
                   result.index === 'Medium Risk' ? 'border-amber-400 text-amber-600' :
                   'border-green-500 text-green-600'
                 }`}>
                   <div className="flex flex-col items-center">
                      <span className="text-3xl font-black">{result.score}</span>
                      <span className="text-xs font-bold px-2 text-center">{result.index}</span>
                   </div>
                 </div>
               </div>
               
               <div className="bg-slate-50 rounded-lg p-4 text-left border border-slate-100">
                  <p className="text-slate-700 text-sm mb-3"><strong>Acoustic Analysis:</strong> {result.analysis}</p>
                  <div className="flex gap-2 items-start bg-teal-50 p-3 rounded text-teal-800 text-sm font-medium">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                    <p>{result.recommendation}</p>
                  </div>
               </div>
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => setResult(null)}
                className="text-teal-600 hover:text-teal-800 font-medium px-4 py-2 transition-colors flex items-center gap-2"
              >
                <Mic size={16} /> New Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
