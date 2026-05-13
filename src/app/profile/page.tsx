'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { User as UserIcon, Mail, Shield, Calendar, Clock, LogOut, Trash2, CheckCircle2, ChevronRight, Key, Sparkles } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Edit name
  const [name, setName] = useState('')
  const [savingName, setSavingName] = useState(false)
  const [nameMsg, setNameMsg] = useState('')

  // Change password
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [savingPass, setSavingPass] = useState(false)
  const [passMsg, setPassMsg] = useState('')
  const [passError, setPassError] = useState('')
  const [showNewPass, setShowNewPass] = useState(false)

  // Delete account
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      if (!u) { router.push('/login'); return }
      setUser(u)
      setName((u.user_metadata?.full_name as string) || '')
      setLoading(false)
    })
  }, [router])

  async function handleSaveName(e: React.FormEvent) {
    e.preventDefault()
    setSavingName(true)
    setNameMsg('')
    const { error } = await supabase.auth.updateUser({ data: { full_name: name } })
    setSavingName(false)
    setNameMsg(error ? error.message : '✅ Name updated successfully!')
    setTimeout(() => setNameMsg(''), 3000)
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setPassError('')
    setPassMsg('')
    if (newPassword !== confirmPassword) { setPassError('Passwords do not match.'); return }
    if (newPassword.length < 8) { setPassError('Password must be at least 8 characters.'); return }
    setSavingPass(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setSavingPass(false)
    if (error) { setPassError(error.message); return }
    setPassMsg('✅ Password changed successfully!')
    setNewPassword(''); setConfirmPassword('')
    setTimeout(() => setPassMsg(''), 3000)
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  async function handleDeleteAccount() {
    if (deleteConfirm !== 'DELETE') return
    setDeleting(true)
    setDeleteError('')
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setDeleteError('No active session.'); return }
      const res = await fetch('/api/auth/delete-account', {
        method: 'DELETE',
        headers: { authorization: `Bearer ${session.access_token}` },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      await supabase.auth.signOut()
      router.push('/?deleted=1')
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete account.')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-48 bg-slate-100 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-2 gap-6">
          <div className="h-64 bg-slate-100 rounded-3xl animate-pulse" />
          <div className="h-64 bg-slate-100 rounded-3xl animate-pulse" />
        </div>
      </div>
    )
  }

  if (!user) return null

  const displayName: string = (user.user_metadata?.full_name as string) || user.email || 'User'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  const joinedDate = new Date(user.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Clinical Profile</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your professional credentials and security</p>
        </div>
        <button onClick={handleSignOut}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all w-fit">
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column — Stats & Info */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Avatar Card */}
          <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-center shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <Sparkles className="text-blue-400" size={48} />
            </div>
            <div className="w-24 h-24 bg-blue-100 rounded-[2rem] flex items-center justify-center text-blue-700 text-3xl font-black mx-auto mb-6 border-4 border-blue-900/50 shadow-inner">
              {initials}
            </div>
            <h2 className="text-xl font-bold text-white truncate px-2">{displayName}</h2>
            <p className="text-blue-300/60 text-xs font-bold uppercase tracking-widest mt-2">{user.email}</p>
            
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-slate-500">Status</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Authorized
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-slate-500">Joined</span>
                <span className="text-slate-300">{joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Metadata List */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2 mb-2">System Metadata</h3>
            {[
              { label: 'Role', value: 'Clinical Specialist', icon: Shield },
              { label: 'Network ID', value: user.id.slice(0, 12).toUpperCase(), icon: Key },
              { label: 'Last Login', value: user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A', icon: Clock },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors group">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-blue-600 transition-colors shadow-sm">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-sm font-bold text-slate-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column — Settings Forms */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Edit Profile */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div>
                <h3 className="font-bold text-slate-900">Personal Identification</h3>
                <p className="text-xs text-slate-500 font-medium">How your name appears in clinical reports</p>
              </div>
              <UserIcon className="text-slate-200" size={24} />
            </div>
            <form onSubmit={handleSaveName} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Display Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter full name"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-800" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="h-5">
                  {nameMsg && (
                    <p className={`text-sm font-bold animate-fade-in ${nameMsg.startsWith('✅') ? 'text-emerald-600' : 'text-red-600'}`}>
                      {nameMsg}
                    </p>
                  )}
                </div>
                <button type="submit" disabled={savingName}
                  className="px-8 py-3 bg-[#0f172a] hover:bg-slate-800 disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-900/10 flex items-center gap-2">
                  {savingName ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>

          {/* Security */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div>
                <h3 className="font-bold text-slate-900">Security Credentials</h3>
                <p className="text-xs text-slate-500 font-medium">Update your workspace password</p>
              </div>
              <Shield className="text-slate-200" size={24} />
            </div>
            <form onSubmit={handleChangePassword} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                  <div className="relative">
                    <input type={showNewPass ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min. 8 characters" required
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-800 pr-12" />
                    <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
                      <Clock size={18} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Update</label>
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat password" required
                    className={`w-full px-5 py-3.5 border rounded-2xl focus:outline-none focus:ring-4 transition-all font-bold text-slate-800 ${confirmPassword && confirmPassword !== newPassword ? 'border-red-400 bg-red-50 focus:ring-red-500/10' : 'bg-slate-50 border-slate-200 focus:ring-blue-500/10 focus:border-blue-500'}`} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="h-5">
                  {passError && <p className="text-sm text-red-600 font-bold">{passError}</p>}
                  {passMsg && <p className="text-sm text-emerald-600 font-bold">{passMsg}</p>}
                </div>
                <button type="submit" disabled={savingPass}
                  className="px-8 py-3 bg-[#0f172a] hover:bg-slate-800 disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-900/10 flex items-center gap-2">
                  {savingPass ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Update Password'}
                </button>
              </div>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50/50 rounded-[2.5rem] border border-red-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-red-700">Irreversible Actions</h3>
              <p className="text-sm text-red-600/70 font-medium">Permanent removal of clinical history and account access</p>
            </div>
            <button onClick={() => { setShowDeleteModal(true); setDeleteConfirm(''); setDeleteError('') }}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-red-900/20 flex items-center gap-2 active:scale-95">
              <Trash2 size={16} />
              Terminate Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm px-4 animate-fade-in">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden border border-slate-100 animate-scale-up">
            <div className="h-3 bg-red-600" />
            <div className="p-10">
              <div className="w-16 h-16 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Trash2 size={32} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 text-center tracking-tight">Confirm Termination</h2>
              <p className="text-sm text-slate-500 text-center mt-3 mb-8 font-medium leading-relaxed">
                This action will <span className="text-red-600 font-bold underline">permanently purge</span> all clinical records, history, and credentials associated with this workspace.
              </p>

              <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 text-center">Type <span className="text-red-600">DELETE</span> to authorize</p>
                <input type="text" value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder="Type DELETE"
                  className="w-full px-4 py-3 text-center text-lg font-black bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all uppercase tracking-[0.2em]" />
              </div>

              {deleteError && <p className="text-sm text-red-600 font-bold mb-6 text-center">{deleteError}</p>}

              <div className="flex flex-col gap-3">
                <button onClick={handleDeleteAccount} disabled={deleteConfirm !== 'DELETE' || deleting}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:opacity-30 text-white font-black text-sm rounded-2xl transition-all shadow-xl shadow-red-900/20 uppercase tracking-widest">
                  {deleting ? 'Purging Systems...' : 'Authorize Termination'}
                </button>
                <button onClick={() => setShowDeleteModal(false)}
                  className="w-full py-3 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                  Cancel Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
