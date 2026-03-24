import type { Metadata } from 'next'
import { Sora, Inter, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import ToastContainer from '@/components/Toast'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['300', '400', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['400', '500'],
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
    <html lang="en" className={`${sora.variable} ${dmSans.variable} ${dmMono.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-kalika-bg font-body text-kalika-text min-h-screen antialiased">
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
