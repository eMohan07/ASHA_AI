import React from 'react';
import AmbientScriber from '@/components/AmbientScriber';

export default function AmbientScribingPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ambient Scribing</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Cut the documentation burden. Paste a raw conversation transcript and let the AI 
          automatically extract structured clinical data so workers can focus on care.
        </p>
      </div>
      
      <AmbientScriber />
    </div>
  );
}
