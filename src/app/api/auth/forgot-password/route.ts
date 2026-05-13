// src/app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { sendPasswordResetEmail } from '@/lib/mailer'
import { supabase } from '@/lib/supabase'

const JWT_SECRET = process.env.JWT_SECRET || 'asha-ai-reset-secret-2025'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 })

    // Check if user exists in Supabase
    const { data: users } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .limit(1)

    // Always respond with success to prevent email enumeration
    if (!users || users.length === 0) {
      return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' })
    }

    // Generate a signed JWT reset token valid for 1 hour
    const token = jwt.sign({ email, userId: users[0].id }, JWT_SECRET, { expiresIn: '1h' })
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`

    await sendPasswordResetEmail(email, resetLink)

    return NextResponse.json({ message: 'If that email exists, a reset link has been sent.' })
  } catch (err) {
    console.error('Forgot password error:', err)
    return NextResponse.json({ error: 'Failed to send reset email.' }, { status: 500 })
  }
}
