'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Edit name
  const [name, setName] = useState('')
  const [savingName, setSavingName] = useState(false)
  const [nameMsg, setNameMsg] = useState('')

  // Change password
  const [currentPassword, setCurrentPassword] = useState('')
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
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('')
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
      <div className="max-w-2xl mx-auto py-12 space-y-4">
        {[1,2,3].map(i => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />)}
      </div>
    )
  }

  if (!user) return null

  const displayName: string = (user.user_metadata?.full_name as string) || user.email || 'User'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  const joinedDate = new Date(user.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <>
    <div className="max-w-2xl mx-auto py-8 space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your ASHA AI account settings</p>
      </div>

      {/* ── Avatar card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
        <div className="w-20 h-20 bg-green-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-gray-900 truncate">{displayName}</h2>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Active
            </span>
            <span className="text-xs text-gray-400">Member since {joinedDate}</span>
          </div>
        </div>
        <button onClick={handleSignOut}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign out
        </button>
      </div>

      {/* ── Account info ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Account Information</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { label: 'Email', value: user.email, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
            { label: 'User ID', value: user.id.slice(0, 16) + '…', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2' },
            { label: 'Joined', value: joinedDate, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { label: 'Last Sign In', value: user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('en-IN') : 'N/A', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-4 px-6 py-4">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                <p className="text-sm text-gray-800 font-medium truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Edit Name ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Edit Profile</h3>
          <p className="text-xs text-gray-400 mt-0.5">Update your display name</p>
        </div>
        <form onSubmit={handleSaveName} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="profile-name">Full name</label>
            <input id="profile-name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name"
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
          </div>
          {nameMsg && (
            <p className={`text-sm font-medium ${nameMsg.startsWith('✅') ? 'text-green-700' : 'text-red-600'}`}>{nameMsg}</p>
          )}
          <button type="submit" disabled={savingName}
            className="px-5 py-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors flex items-center gap-2">
            {savingName ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Saving…</> : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* ── Change Password ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Change Password</h3>
          <p className="text-xs text-gray-400 mt-0.5">Choose a strong password</p>
        </div>
        <form onSubmit={handleChangePassword} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="new-pass">New password</label>
            <div className="relative">
              <input id="new-pass" type={showNewPass ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min. 8 characters" required
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition pr-10" />
              <button type="button" onClick={() => setShowNewPass(!showNewPass)} tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="confirm-pass">Confirm new password</label>
            <input id="confirm-pass" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter new password" required
              className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${confirmPassword && confirmPassword !== newPassword ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
            {confirmPassword && confirmPassword !== newPassword && <p className="text-xs text-red-500 mt-1">Passwords don&apos;t match</p>}
          </div>
          {passError && <p className="text-sm text-red-600 font-medium">{passError}</p>}
          {passMsg && <p className="text-sm text-green-700 font-medium">{passMsg}</p>}
          <button type="submit" disabled={savingPass}
            className="px-5 py-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors flex items-center gap-2">
            {savingPass ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Updating…</> : 'Update Password'}
          </button>
        </form>
      </div>

      {/* ── Danger Zone ── */}
      <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-red-100">
          <h3 className="font-semibold text-red-700">Danger Zone</h3>
          <p className="text-xs text-gray-400 mt-0.5">These actions are irreversible. Please be careful.</p>
        </div>

        {/* Sign out row */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-red-50">
          <div>
            <p className="text-sm font-medium text-gray-800">Sign out</p>
            <p className="text-xs text-gray-400 mt-0.5">End your current session</p>
          </div>
          <button onClick={handleSignOut}
            className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
            Sign Out
          </button>
        </div>

        {/* Delete account row */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-700">Delete account permanently</p>
            <p className="text-xs text-gray-400 mt-0.5">Remove all your data. This cannot be undone.</p>
          </div>
          <button onClick={() => { setShowDeleteModal(true); setDeleteConfirm(''); setDeleteError('') }}
            className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </div>

    {/* ── Delete Confirmation Modal ── */}
    {showDeleteModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="h-1.5 bg-red-500" />
          <div className="p-6">
            {/* Icon */}
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-gray-900 text-center">Delete Account?</h2>
            <p className="text-sm text-gray-500 text-center mt-2 mb-6">
              This will <strong>permanently delete</strong> your account and all associated data.
              This action <span className="text-red-600 font-semibold">cannot be undone</span>.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
              <p className="text-sm text-red-700 font-medium mb-2">Type <strong>DELETE</strong> to confirm:</p>
              <input
                id="delete-confirm-input"
                type="text"
                value={deleteConfirm}
                onChange={e => setDeleteConfirm(e.target.value)}
                placeholder="Type DELETE here"
                className="w-full px-3 py-2 text-sm border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white font-mono"
              />
            </div>

            {deleteError && (
              <p className="text-sm text-red-600 font-medium mb-4">{deleteError}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                id="confirm-delete-btn"
                onClick={handleDeleteAccount}
                disabled={deleteConfirm !== 'DELETE' || deleting}
                className="flex-1 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Deleting…</>
                ) : 'Yes, Delete Forever'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
