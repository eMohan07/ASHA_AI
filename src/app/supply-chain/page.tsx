import React from 'react';
import SupplyChainDashboard from '@/components/SupplyChainDashboard';

export default function SupplyChainPage() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Supply Chain AI</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Predictive inventory management to eliminate stock-outs before they happen, 
          restoring patient trust at scale.
        </p>
      </div>
      
      <SupplyChainDashboard />
    </div>
  );
}
