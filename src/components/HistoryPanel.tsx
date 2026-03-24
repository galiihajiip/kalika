'use client'

import { useEffect, useState } from 'react'
import { useKalikaStore } from '@/store/useKalikaStore'
import type { HistoryEntry, LensType } from '@/types'

export interface HistoryPanelProps {
  isOpen: boolean
  onClose: () => void
}

const LENS_COLORS: Record<LensType, { bg: string; text: string; label: string }> = {
  nusantara: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', label: 'Nusantara' },
  western: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'Western' },
  islamic: { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-700 dark:text-teal-400', label: 'Islami' },
  chinese: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Tionghoa' },
}

function getRelativeTime(timestamp: number) {
  const diffInSeconds = Math.floor((Date.now() - timestamp) / 1000)
  
  if (diffInSeconds < 60) return `${diffInSeconds} detik lalu`
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} jam lalu`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays === 1) return 'kemarin'
  return `${diffInDays} hari lalu`
}

export default function HistoryPanel({ isOpen, onClose }: HistoryPanelProps) {
  const { history, clearHistory, setInputText, setSelectedLens, setResult, setActiveTab } = useKalikaStore()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Handle clik pada item
  const handleRestore = (entry: HistoryEntry) => {
    setInputText(entry.inputText)
    setSelectedLens(entry.lens)
    setResult(entry.result)
    setActiveTab('result')
    onClose()
  }

  const handleClear = () => {
    if (confirm('Yakin ingin menghapus semua riwayat analisis?')) {
      clearHistory()
    }
  }

  return (
    <>
      {/* ── Overlay Gelap ── */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* ── Panel Slide dari Kiri ── */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] bg-[var(--surface-bg)] shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-[var(--surface-border)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--surface-border)] bg-[var(--surface-card)]">
          <h2 className="font-[var(--font-sora)] font-bold text-lg text-[var(--text-primary)]">
            Riwayat Analisis
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[var(--surface-muted)] flex items-center justify-center hover:bg-[var(--surface-border)] hover:text-red-500 transition-colors text-[var(--text-secondary)]"
            aria-label="Tutup riwayat"
          >
            ✕
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center h-full opacity-60">
              <span className="text-5xl mb-4">🕰️</span>
              <p className="font-semibold text-[var(--text-primary)]">Belum ada riwayat</p>
              <p className="text-xs text-[var(--text-muted)] mt-1 max-w-[200px]">
                Materi yang pernah kamu analisis akan tersimpan otomatis di sini.
              </p>
            </div>
          ) : (
            history.map((entry) => {
              const style = LENS_COLORS[entry.lens]
              return (
                <button
                  key={entry.id}
                  onClick={() => handleRestore(entry)}
                  className="flex flex-col text-left w-full p-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] hover:border-[var(--kalika-primary)] hover:shadow-md transition-all active:scale-[0.98] group"
                >
                  <div className="flex justify-between items-start w-full mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${style.bg} ${style.text}`}>
                      {style.label}
                    </span>
                    <span className="text-[10px] font-semibold text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                      {getRelativeTime(entry.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 leading-relaxed">
                    {entry.inputText.length > 80 
                      ? entry.inputText.slice(0, 80) + '...' 
                      : entry.inputText}
                  </p>
                </button>
              )
            })
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-[var(--surface-border)] bg-[var(--surface-bg)]">
            <button
              onClick={handleClear}
              className="w-full py-3 rounded-xl border border-red-200 dark:border-red-900/50 text-red-500 text-sm font-bold hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              🗑️ Hapus Semua Riwayat
            </button>
            <p className="text-center text-[10px] font-semibold text-[var(--text-muted)] mt-3 tracking-wide">
              TERSIMPAN LOKAL DI BROWSER KAMU
            </p>
          </div>
        )}
      </div>
    </>
  )
}
