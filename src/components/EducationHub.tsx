"use client"
import React, { useState } from 'react';
import { BookOpen, Languages, Loader2, MessageSquare, HeartPulse, Baby, Apple, CheckCircle2, AlertTriangle } from 'lucide-react';

const LANGUAGES = ['English', 'Kannada', 'Hindi', 'Marathi', 'Malayalam', 'Assamese', 'Urdu'];
const TOPICS = [
  { id: 'maternal', label: 'Maternal Health', icon: Baby },
  { id: 'nutrition', label: 'Child Nutrition', icon: Apple },
  { id: 'hygiene', label: 'Sanitation & Hygiene', icon: HeartPulse },
  { id: 'fever', label: 'Fever Management', icon: HeartPulse }
];

export default function EducationHub() {
  const [selectedLang, setSelectedLang] = useState('Hindi');
  const [selectedTopic, setSelectedTopic] = useState('Maternal Health');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<any>(null);

  // New state for interaction
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submittingAnswers, setSubmittingAnswers] = useState(false);
  const [actions, setActions] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setContent(null);
    setAnswers({});
    setActions(null);
    try {
      const response = await fetch('/api/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: selectedTopic, language: selectedLang }),
      });
      const data = await response.json();
      setContent(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswers = async () => {
    setSubmittingAnswers(true);
    setActions(null);

    // Format answers to send to API
    const questionsAndAnswers = content.questionsToAsk.map((q: any, i: number) => ({
      question: q.qEnglish,
      answer: answers[i] || 'No Answer'
    }));

    try {
      const response = await fetch('/api/education-actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: selectedTopic, 
          language: selectedLang,
          questionsAndAnswers 
        }),
      });
      const data = await response.json();
      setActions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingAnswers(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden flex flex-col min-h-[600px]">
      <div className="bg-[#0f172a] p-4 text-white">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <BookOpen size={20} />
          Localized Health Education Hub
        </h2>
        <p className="text-blue-100 text-sm">Multilingual Co-pilot for real-time triage support</p>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        
        {/* Sidebar Controls */}
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-5 flex flex-col gap-6">
          <div>
            <label className="flex items-center gap-2 font-bold text-slate-700 mb-2 text-sm">
              <Languages size={16} className="text-blue-500" /> Target Language
            </label>
            <div className="flex flex-col gap-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedLang === lang ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div>
             <label className="flex items-center gap-2 font-bold text-slate-700 mb-2 text-sm">
              <MessageSquare size={16} className="text-blue-500" /> Education Topic
            </label>
            <div className="flex flex-col gap-2">
              {TOPICS.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.label)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedTopic === topic.label ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <topic.icon size={16} className={selectedTopic === topic.label ? 'text-blue-600' : 'text-slate-400'} />
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="mt-auto bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-[#0f172a] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <BookOpen size={18} />}
            {loading ? 'Generating...' : 'Generate Guide'}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 lg:p-8 bg-white overflow-y-auto relative">
          {!content && !loading && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 absolute inset-0">
               <Languages size={64} className="mb-4 opacity-20" />
               <p className="text-center max-w-sm">Select a language and topic, then click "Generate Guide" to create localized health education materials.</p>
            </div>
          )}

          {loading && (
            <div className="h-full flex flex-col items-center justify-center text-blue-400 absolute inset-0">
               <Loader2 size={48} className="animate-spin mb-4" />
               <p className="font-medium animate-pulse">Translating and structuring content...</p>
            </div>
          )}

          {content && !loading && (
            <div className="animate-in fade-in duration-500 pb-12">
              <div className="mb-8 border-b border-slate-100 pb-4">
                 <h3 className="text-2xl font-black text-slate-800 mb-1">{content.title}</h3>
                 <p className="text-sm text-slate-500 font-medium">{content.titleEnglish}</p>
                 <div className="inline-block mt-3 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
                   Translated to {selectedLang}
                 </div>
              </div>

              <div className="space-y-10">
                <section>
                  <h4 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                    <HeartPulse size={20} className="text-pink-500" /> Educational Guidance
                  </h4>
                  <div className="space-y-4">
                    {content.guidance.map((item: any, i: number) => (
                      <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <p className="font-bold text-slate-800 text-lg mb-2">{item.pointLocal}</p>
                        <p className="text-sm text-slate-500 italic">{item.pointEnglish}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {content.questionsToAsk && content.questionsToAsk.length > 0 && (
                  <section>
                    <h4 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                      <MessageSquare size={20} className="text-blue-500" /> Triage Questions to Ask
                    </h4>
                    <p className="text-sm text-slate-500 mb-4">Ask the patient these questions and record their answers to receive specific medical actions.</p>
                    
                    <div className="space-y-4">
                      {content.questionsToAsk.map((item: any, i: number) => (
                        <div key={i} className="flex flex-col gap-3 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                          <div className="flex gap-3 items-start">
                            <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">Q</div>
                            <div>
                               <p className="font-bold text-slate-700 mb-1">{item.qLocal}</p>
                               <p className="text-xs text-slate-500">{item.qEnglish}</p>
                            </div>
                          </div>
                          
                          {/* Answer Toggles */}
                          <div className="flex gap-2 ml-9">
                            {['Yes', 'No', 'Not Sure'].map(opt => (
                              <button 
                                key={opt}
                                onClick={() => setAnswers({...answers, [i]: opt})}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                  answers[i] === opt ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {!actions && (
                      <div className="mt-6 flex justify-end">
                        <button 
                          onClick={handleSubmitAnswers}
                          disabled={submittingAnswers || Object.keys(answers).length !== content.questionsToAsk.length}
                          className="bg-slate-800 text-white py-2 px-6 rounded-lg font-bold hover:bg-slate-900 transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                          {submittingAnswers ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                          {submittingAnswers ? 'Analyzing Answers...' : 'Get Recommendations'}
                        </button>
                      </div>
                    )}
                  </section>
                )}

                {/* Final Actions Section */}
                {actions && (
                  <section className="animate-in slide-in-from-bottom-4 duration-500 mt-8 pt-8 border-t-2 border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 rounded-xl ${actions.requiresReferral ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {actions.requiresReferral ? <AlertTriangle size={24} /> : <CheckCircle2 size={24} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-slate-800">Recommended Actions</h4>
                        <p className="text-sm font-medium text-slate-500">{actions.requiresReferral ? 'Immediate medical attention may be required.' : 'Follow these home care instructions.'}</p>
                      </div>
                    </div>

                    <div className="bg-slate-800 text-white rounded-xl p-6 shadow-md">
                       <p className="font-bold text-lg mb-1">{actions.summaryLocal}</p>
                       <p className="text-slate-400 text-sm mb-6 italic">{actions.summaryEnglish}</p>

                       <div className="space-y-4">
                         {actions.actions.map((act: any, i: number) => (
                           <div key={i} className="flex gap-3 bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                             <div className="bg-slate-600 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0">{i+1}</div>
                             <div>
                               <p className="font-bold text-white mb-1">{act.actionLocal}</p>
                               <p className="text-xs text-slate-300">{act.actionEnglish}</p>
                             </div>
                           </div>
                         ))}
                       </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
