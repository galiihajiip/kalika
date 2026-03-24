import type { Metadata } from 'next'
import { Sora, Inter } from 'next/font/google'
import './globals.css'
import ToastContainer from '@/components/Toast'

// Premium Typography setup
const sora = Sora({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
})

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'KALIKA: AI Study Companion',
  description: 'AI-Powered student companion built to simplify complex academic materials.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-kalika-bg text-kalika-text min-h-screen antialiased font-body">
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
