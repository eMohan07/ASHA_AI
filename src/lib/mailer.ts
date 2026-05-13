// src/lib/mailer.ts
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  await transporter.sendMail({
    from: `"ASHA AI" <${process.env.GMAIL_USER}>`,
    to,
    subject: 'Reset your ASHA AI password',
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
        <div style="text-align:center; margin-bottom: 24px;">
          <div style="width:48px; height:48px; background:#15803d; border-radius:10px; display:inline-flex; align-items:center; justify-content:center; font-weight:bold; color:white; font-size:22px;">A</div>
          <h2 style="color:#15803d; margin:12px 0 4px;">ASHA AI</h2>
          <p style="color:#6b7280; font-size:13px; margin:0;">Frontline Health Assistant</p>
        </div>
        <div style="background:white; border-radius:10px; padding:28px; border:1px solid #e5e7eb;">
          <h3 style="margin:0 0 12px; color:#111827;">Reset Your Password</h3>
          <p style="color:#374151; font-size:14px; line-height:1.6;">
            You requested a password reset for your ASHA AI account. Click the button below to set a new password. This link expires in <strong>1 hour</strong>.
          </p>
          <div style="text-align:center; margin: 24px 0;">
            <a href="${resetLink}" style="background:#15803d; color:white; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:600; font-size:14px; display:inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color:#9ca3af; font-size:12px;">If you didn't request this, ignore this email. Your password won't change.</p>
        </div>
      </div>
    `,
  })
}
