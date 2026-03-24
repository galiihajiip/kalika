import type { Metadata } from 'next'
import './globals.css'
import ToastContainer from '@/components/Toast'

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
    <html lang="en">
      <body className="bg-kalika-bg font-body text-kalika-text min-h-screen antialiased">
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
