'use client'

import React, { useState, useEffect } from 'react'
import { RefreshCcw, WifiOff, CheckCircle2, ShieldCheck, Database, HardDrive, AlertTriangle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function OfflineSyncPage() {
  const [isOnline, setIsOnline] = useState(true)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success'>('idle')

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleManualSync = () => {
    if (!isOnline) return
    setSyncStatus('syncing')
    setTimeout(() => {
      setSyncStatus('success')
    }, 2500)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#00e5ff]/10 px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest text-[#00e5ff] border border-[#00e5ff]/20">
            <Database size={12} />
            Data Persistence Layer
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Offline Sync Engine</h1>
          <p className="text-sm font-bold text-[#bac9cc] uppercase tracking-widest">
            Manage local data queues and secure cloud synchronization.
          </p>
        </div>
        
        <div className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-sm border",
          isOnline ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-orange-500/10 border-orange-500/20 text-orange-400"
        )}>
           {isOnline ? <CheckCircle2 size={18} /> : <WifiOff size={18} />}
           <div>
             <div className="text-[10px] font-black uppercase tracking-widest">Network Status</div>
             <div className="text-xs font-black tracking-widest mt-0.5">
               {isOnline ? 'Online - 4G Stable' : 'Offline - Local Mode'}
             </div>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Main Sync Area */}
        <div className="space-y-6">
          <div className="glass-card border-white/5 p-8 flex flex-col items-center justify-center text-center space-y-8 min-h-[400px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5ff]/5 blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#00e5ff]/20 rounded-full blur-2xl animate-pulse" />
              <div className={cn(
                "relative w-32 h-32 rounded-full border-4 flex items-center justify-center bg-[#111318]",
                syncStatus === 'syncing' ? "border-[#00e5ff] border-t-transparent animate-spin" : 
                syncStatus === 'success' ? "border-green-400" : "border-[#bac9cc]/30"
              )}>
                <div className={cn(
                  "w-24 h-24 rounded-full flex items-center justify-center",
                  syncStatus === 'syncing' ? "bg-transparent animate-none" : 
                  syncStatus === 'success' ? "bg-green-500/20" : "bg-white/5"
                )}>
                  {syncStatus === 'success' ? (
                    <CheckCircle2 size={40} className="text-green-400" />
                  ) : (
                    <RefreshCcw size={40} className={cn(
                      "transition-colors",
                      isOnline ? "text-[#00e5ff]" : "text-[#bac9cc]/30"
                    )} />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                {syncStatus === 'idle' ? '14 Records Pending' :
                 syncStatus === 'syncing' ? 'Synchronizing Data...' :
                 'All Data Synced'}
              </h2>
              <p className="text-xs font-bold text-[#bac9cc] uppercase tracking-widest">
                Last synced: Today at 08:45 AM
              </p>
            </div>

            <button 
              onClick={handleManualSync}
              disabled={!isOnline || syncStatus === 'syncing'}
              className="btn-primary w-full max-w-xs flex justify-center gap-2"
            >
              <RefreshCcw size={16} className={cn(syncStatus === 'syncing' && "animate-spin")} />
              {syncStatus === 'syncing' ? 'Syncing...' : 'Force Manual Sync'}
            </button>
          </div>
        </div>

        {/* Local Storage Stats */}
        <div className="space-y-6">
          <div className="glass-card border-white/5 p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center">
                 <HardDrive size={16} className="text-[#bac9cc]" />
              </div>
              <div className="text-sm font-black text-white uppercase tracking-widest">Local Cache Status</div>
            </div>

            <div className="space-y-6">
               <div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                    <span className="text-[#bac9cc]">Storage Used (IndexedDB)</span>
                    <span className="text-white">45MB / 500MB</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#cdbdff] w-[9%]" />
                  </div>
               </div>

               <div className="space-y-3">
                 <div className="flex justify-between items-center text-xs bg-[#111318] p-3 rounded-sm border border-white/5">
                   <span className="text-[#bac9cc] font-bold">New Patients (Offline)</span>
                   <span className="text-white font-black">12</span>
                 </div>
                 <div className="flex justify-between items-center text-xs bg-[#111318] p-3 rounded-sm border border-white/5">
                   <span className="text-[#bac9cc] font-bold">Triage Assessments</span>
                   <span className="text-white font-black">2</span>
                 </div>
                 <div className="flex justify-between items-center text-xs bg-[#111318] p-3 rounded-sm border border-white/5">
                   <span className="text-[#bac9cc] font-bold">Audio Recordings</span>
                   <span className="text-white font-black">0</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-sm space-y-4">
             <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-orange-400" />
                <div className="text-xs font-black text-white uppercase tracking-widest">Data Security</div>
             </div>
             <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider leading-relaxed">
               All local data is encrypted at rest using AES-256. If device is reported lost, local cache will self-destruct upon next internet connection.
             </p>
          </div>
        </div>

      </div>
    </div>
  )
}
