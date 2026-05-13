import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'

const JWT_SECRET = process.env.JWT_SECRET || 'asha-ai-reset-secret-2025'

// Admin client with service role for password reset
export async function POST(req: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key'
  )
  try {
    const { token, otp, newPassword, name } = await req.json()
    if (!token || !otp) return NextResponse.json({ error: 'Token and OTP required' }, { status: 400 })

    let payload: { email: string; otp: string; purpose: string }
    try {
      payload = jwt.verify(token, JWT_SECRET) as typeof payload
    } catch {
      return NextResponse.json({ error: 'OTP expired or invalid. Please request a new one.' }, { status: 400 })
    }

    if (payload.otp !== otp.trim()) {
      return NextResponse.json({ error: 'Incorrect OTP. Please try again.' }, { status: 400 })
    }

    // ── Signup: create Supabase user ──────────────────────────────────
    if (payload.purpose === 'signup') {
      const { error } = await supabaseAdmin.auth.admin.createUser({
        email: payload.email,
        password: newPassword,
        user_metadata: { full_name: name },
        email_confirm: true, // skip email confirmation since we verified via OTP
      })
      if (error) return NextResponse.json({ error: error.message }, { status: 400 })
      return NextResponse.json({ message: 'Account created! You can now log in.' })
    }

    // ── Forgot password: update password ─────────────────────────────
    if (payload.purpose === 'forgot') {
      // Find user by email
      const { data: { users }, error: listErr } = await supabaseAdmin.auth.admin.listUsers()
      if (listErr) return NextResponse.json({ error: listErr.message }, { status: 500 })

      const user = users.find(u => u.email === payload.email)
      if (!user) return NextResponse.json({ error: 'No account found with that email.' }, { status: 404 })

      const { error: updateErr } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
        password: newPassword,
      })
      if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 400 })
      return NextResponse.json({ message: 'Password updated successfully! You can now log in.' })
    }

    return NextResponse.json({ error: 'Unknown purpose.' }, { status: 400 })
  } catch (err) {
    console.error('OTP verify error:', err)
    return NextResponse.json({ error: 'Verification failed.' }, { status: 500 })
  }
}
