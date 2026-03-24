import type { Metadata } from 'next'
import { Sora, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'
import ToastContainer from '@/components/Toast'

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
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
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.className} ${sora.className} ${dmMono.className} bg-kalika-bg text-kalika-text min-h-screen antialiased`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
