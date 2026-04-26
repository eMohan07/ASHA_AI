import React from 'react';
import RespiratoryAnalyzer from '@/components/RespiratoryAnalyzer';

export default function RespiratoryAssessmentPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Acoustic Respiratory Assessment</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Record a patient's cough to generate an AI-powered Lung Health Index. 
          This tool uses acoustic analysis to provide immediate triage recommendations.
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <RespiratoryAnalyzer />
      </div>
    </div>
  );
}
