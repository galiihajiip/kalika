'use client'

import { useKalikaStore } from '@/store/useKalikaStore'
import { useEffect, useState } from 'react'

export default function ToastContainer() {
  const { toasts, removeToast } = useKalikaStore()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => {
        let bgColor = ''
        let borderColor = ''
        let icon = ''
        let iconColor = ''

        switch (toast.type) {
          case 'success':
            bgColor = 'bg-emerald-50 dark:bg-emerald-950/80 shadow-emerald-500/10'
            borderColor = 'border-emerald-200 dark:border-emerald-800'
            iconColor = 'text-emerald-500'
            icon = '✓'
            break
          case 'error':
            bgColor = 'bg-red-50 dark:bg-red-950/80 shadow-red-500/10'
            borderColor = 'border-red-200 dark:border-red-800'
            iconColor = 'text-red-500'
            icon = '✗'
            break
          case 'info':
          case 'warning':
          default:
            bgColor = 'bg-blue-50 dark:bg-blue-950/80 shadow-blue-500/10'
            borderColor = 'border-blue-200 dark:border-blue-800'
            iconColor = 'text-blue-500'
            icon = 'ℹ'
            break
        }

        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto w-full max-w-sm rounded-xl border p-4 shadow-lg backdrop-blur-sm
              ${bgColor} ${borderColor}
              flex items-start gap-3
              animate-slide-in-right opacity-100 transition-opacity duration-300
            `}
            style={{
              animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            {/* Icon */}
            <div className={`mt-0.5 shrink-0 ${iconColor} font-bold text-lg leading-none`}>
              {icon}
            </div>

            {/* Message */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
                {toast.message}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 rounded-md p-1 opacity-50 transition-opacity hover:opacity-100 text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]"
              aria-label="Close Notification"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )
      })}

      {/* Inject Global Keyframe specific for Toast */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}} />
    </div>
  )
}
