import React from 'react';
import HealthMonitorWizard from '@/components/HealthMonitorWizard';

export default function HealthMonitorPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive Health Monitor</h1>
        <p className="text-gray-500">Record your data and let our AI analyze your health patterns.</p>
      </div>
      
      <HealthMonitorWizard />
    </div>
  );
}
