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
  description:
    'KALIKA is a culturally-aware AI study companion that transforms complex topics into dyslexia-friendly explanations using Nusantara, Western, Islamic, and Chinese cultural lenses — powered by Google Gemini.',
  keywords: [
    'KALIKA',
    'AI study companion',
    'EdTech Indonesia',
    'budaya belajar',
    'dyslexia friendly',
    'Gemini AI',
    'kuis adaptif',
  ],
  authors: [{ name: 'KALIKA Team' }],
  openGraph: {
    title: 'KALIKA — AI Study Companion',
    description: 'Belajar lebih mudah dengan analisis budaya AI yang cerdas.',
    type: 'website',
  },
}

// ─── Root Layout ─────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${sora.variable} font-[var(--font-nunito)] antialiased min-h-screen`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
