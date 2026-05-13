import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { transporter } from '@/lib/mailer'

const JWT_SECRET = process.env.JWT_SECRET || 'asha-ai-reset-secret-2025'

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: NextRequest) {
  try {
    const { email, purpose } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    const otp = generateOTP()

    // Encode OTP in JWT (10 min expiry)
    const token = jwt.sign({ email, otp, purpose }, JWT_SECRET, { expiresIn: '10m' })

    const label = purpose === 'signup' ? 'Verify your ASHA AI account' : 'Reset your ASHA AI password'

    await transporter.sendMail({
      from: `"ASHA AI" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: label,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f9fafb;border-radius:12px;">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="width:48px;height:48px;background:#15803d;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;font-weight:bold;color:white;font-size:22px;">A</div>
            <h2 style="color:#15803d;margin:12px 0 4px;">ASHA AI</h2>
          </div>
          <div style="background:white;border-radius:10px;padding:28px;border:1px solid #e5e7eb;text-align:center;">
            <h3 style="margin:0 0 8px;color:#111827;">${label}</h3>
            <p style="color:#6b7280;font-size:14px;margin-bottom:24px;">Use the code below. It expires in <strong>10 minutes</strong>.</p>
            <div style="font-size:40px;font-weight:800;letter-spacing:10px;color:#15803d;background:#f0fdf4;padding:16px;border-radius:10px;border:2px dashed #86efac;">
              ${otp}
            </div>
            <p style="color:#9ca3af;font-size:12px;margin-top:20px;">If you didn't request this, ignore this email.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ token })
  } catch (err) {
    console.error('OTP send error:', err)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}
