import type { Metadata } from 'next'
import { Nunito, Sora } from 'next/font/google'
import './globals.css'
import ToastContainer from '@/components/Toast'

// ─── Fonts ──────────────────────────────────────────────────────
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-nunito',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-sora',
  display: 'swap',
})

// ─── Metadata ────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'KALIKA — AI Study Companion',
  description: 'AI-Powered student companion built to simplify complex academic materials using culturally-aware analogies, complete with a dyslexia-friendly UI and adaptive quizzes natively powered by Google Gemini.',
}

// ─── Root Layout ─────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${sora.variable} font-[var(--font-nunito)] antialiased min-h-screen`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
