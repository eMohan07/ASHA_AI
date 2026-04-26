import React from 'react';
import DigitalTwinGenerator from '@/components/DigitalTwinGenerator';

export default function DigitalTwinPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Twin</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Visualize a patient's health trajectory. Digital Twin turns abstract nutrition and medical advice 
          into visual, personalized plans that patients understand and act on.
        </p>
      </div>
      
      <DigitalTwinGenerator />
    </div>
  );
}
