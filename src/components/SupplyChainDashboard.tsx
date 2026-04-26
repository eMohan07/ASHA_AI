"use client"
import React, { useState } from 'react';
import { Package, TrendingDown, AlertTriangle, CheckCircle2, RefreshCw, Loader2 } from 'lucide-react';

const INITIAL_INVENTORY = [
  { id: 'IFA', name: 'Iron Folic Acid Tablets', currentStock: 120, avgWeeklyUsage: 45 },
  { id: 'ORS', name: 'ORS Packets', currentStock: 15, avgWeeklyUsage: 20 },
  { id: 'PCM', name: 'Paracetamol 500mg', currentStock: 300, avgWeeklyUsage: 40 },
  { id: 'TEST', name: 'Pregnancy Test Kits', currentStock: 8, avgWeeklyUsage: 5 },
];

export default function SupplyChainDashboard() {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<any>(null);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/supply-chain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inventoryData: inventory }),
      });
      const data = await response.json();
      setPredictions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPredictionForItem = (id: string) => {
    return predictions?.predictions?.find((p: any) => p.itemId === id);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden min-h-[500px]">
      <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
        <div>
          <h2 className="font-bold text-xl flex items-center gap-2">
            <Package size={24} className="text-blue-400" /> Supply Chain AI
          </h2>
          <p className="text-slate-400 text-sm">Eliminate stock-outs before they happen</p>
        </div>
        <button 
          onClick={handlePredict}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
          {loading ? 'Analyzing...' : 'Run AI Prediction'}
        </button>
      </div>

      <div className="p-6 bg-slate-50">
        {predictions && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-3 animate-in fade-in">
             <TrendingDown size={24} className="text-blue-600" />
             <p className="font-medium text-blue-900">{predictions.summary}</p>
          </div>
        )}

        <div className="grid gap-4">
          {inventory.map((item) => {
            const pred = getPredictionForItem(item.id);
            return (
              <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                 
                 <div className="flex-1">
                   <h3 className="font-bold text-slate-800 text-lg mb-1">{item.name}</h3>
                   <div className="flex gap-6 text-sm text-slate-500">
                     <span>Current Stock: <strong className="text-slate-700">{item.currentStock}</strong></span>
                     <span>Avg Weekly Usage: <strong className="text-slate-700">{item.avgWeeklyUsage}</strong></span>
                   </div>
                 </div>

                 {pred ? (
                   <div className="flex-1 md:text-right flex flex-col md:items-end animate-in fade-in">
                     <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                       pred.status === 'Critical' ? 'bg-red-100 text-red-700' :
                       pred.status === 'Warning' ? 'bg-amber-100 text-amber-700' :
                       'bg-green-100 text-green-700'
                     }`}>
                       {pred.status === 'Critical' ? <AlertTriangle size={14}/> :
                        pred.status === 'Warning' ? <AlertTriangle size={14}/> :
                        <CheckCircle2 size={14}/>}
                       {pred.status.toUpperCase()}
                     </div>
                     <p className="text-sm font-medium text-slate-700">Days to stockout: <span className={pred.daysUntilStockout < 7 ? 'text-red-600 font-bold' : ''}>{pred.daysUntilStockout}</span></p>
                     <p className="text-xs text-slate-500 mt-1">{pred.reason}</p>
                     {pred.recommendedReorder > 0 && (
                       <div className="mt-2 text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg inline-block">
                         Recommended Reorder: +{pred.recommendedReorder} units
                       </div>
                     )}
                   </div>
                 ) : (
                   <div className="flex-1 md:text-right text-slate-400 text-sm italic">
                     Awaiting AI prediction...
                   </div>
                 )}

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
