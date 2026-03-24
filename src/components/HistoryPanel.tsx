'use client'

import { useKalikaStore } from '@/store/useKalikaStore'
import type { HistoryEntry, LensType } from '@/types'
import { LENS_ITEMS } from '@/components/LensSelector'

interface Props {
  isOpen: boolean
  onClose: () => void
}

function getLensData(lensId: string) {
  const found = LENS_ITEMS.find((l) => l.id === lensId)
  return {
    label: found ? found.label : lensId.replace('_', ' '),
    emoji: found ? found.emoji : '🌍'
  }
}

function getRelativeTime(timestamp: number) {
  const diffInSeconds = Math.floor((Date.now() - timestamp) / 1000)
  if (diffInSeconds < 60) return `Just now`
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d ago`
}

export default function HistoryPanel({ isOpen, onClose }: Props) {
  const { history, setInputText, setSelectedLens, setResult, clearHistory, setActiveTab } = useKalikaStore()

  const handleRestore = (entry: HistoryEntry) => {
    setInputText(entry.inputText)
    setSelectedLens(entry.lens as LensType)
    setResult(entry.result)
    setActiveTab('result')
    onClose()
  }

  const handleClear = () => {
    if (confirm('Are you sure you want to clear your entire history?')) {
      clearHistory()
    }
  }

  return (
    <>
      <div 
        className={`fixed inset-0 bg-kalika-bg/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      <div className={`fixed top-0 bottom-0 left-0 w-[400px] bg-kalika-surface border-r border-kalika-border shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="p-5 border-b border-kalika-border flex items-center justify-between mt-2">
          <h2 className="text-sm font-semibold tracking-[0.12em] text-kalika-muted uppercase font-display flex items-center gap-2">
            <span className="text-kalika-green text-lg">📁</span> History
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg text-kalika-muted hover:bg-kalika-surface2 hover:text-kalika-text-secondary transition-colors text-lg line-height-none">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {history.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-60">
              <span className="text-4xl mb-3 grayscale mix-blend-overlay">👻</span>
              <p className="text-sm text-kalika-muted font-medium">No history yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {history.map((entry) => {
                const meta = getLensData(entry.lens)
                return (
                  <button
                    key={entry.id}
                    onClick={() => handleRestore(entry)}
                    className="flex flex-col text-left w-full p-4 rounded-xl border border-kalika-border bg-kalika-surface hover:border-kalika-green-glow hover:bg-kalika-surface2 transition-all active:scale-[0.98] group"
                  >
                    <div className="flex justify-between items-start w-full mb-2">
                      <span className="inline-block text-[9px] font-bold tracking-widest uppercase bg-kalika-green-subtle text-kalika-green px-2 py-0.5 rounded-full">
                        {meta.emoji} {meta.label}
                      </span>
                      <span className="text-[10px] font-medium text-kalika-muted group-hover:text-kalika-text-secondary transition-colors">
                        {getRelativeTime(entry.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-kalika-text-secondary line-clamp-2 leading-relaxed">
                      {entry.inputText}
                    </p>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="p-5 border-t border-kalika-border bg-kalika-surface2/50 backdrop-blur-md">
            <button 
              onClick={handleClear}
              className="w-full py-3 rounded-lg border border-red-900/50 text-red-400 text-xs font-bold hover:bg-red-900/20 transition-colors"
            >
              Clear All History
            </button>
            <p className="text-center text-[10px] text-kalika-muted mt-3">Saved locally in your browser.</p>
          </div>
        )}
      </div>
    </>
  )
}
