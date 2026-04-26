import React from 'react';
import EducationHub from '@/components/EducationHub';

export default function HealthEducationPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Localized Health Education Hub</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          A multilingual co-pilot to generate real-time, localized health education materials and triage questions 
          to assist ASHA workers in the field.
        </p>
      </div>
      
      <EducationHub />
    </div>
  );
}
