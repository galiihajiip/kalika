import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'
import ToastContainer from '@/components/Toast'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'KALIKA — AI Study Companion',
  description: 'AI-Powered student companion built to simplify complex academic materials.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="bg-kalika-bg font-body text-kalika-text min-h-screen antialiased">
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
