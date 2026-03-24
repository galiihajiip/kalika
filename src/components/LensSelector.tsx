'use client'

import { useKalikaStore } from '@/store/useKalikaStore'
import type { LensType } from '@/types'

// ─── Lens Data ────────────────────────────────────────────────────
interface Lens {
  id: LensType
  emoji: string
  label: string
  desc: string
  activeClass: string
  hoverClass: string
  borderClass: string
  shadowClass: string
}

const LENSES: Lens[] = [
  {
    id: 'nusantara',
    emoji: '🌴',
    label: 'Nusantara',
    desc: 'Analogi budaya Indonesia, Jawa, Sunda, Melayu',
    activeClass: 'bg-emerald-500 text-white',
    hoverClass:  'hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400',
    borderClass: 'border-emerald-200 dark:border-emerald-900',
    shadowClass: 'shadow-emerald-500/30',
  },
  {
    id: 'western',
    emoji: '🌍',
    label: 'Western',
    desc: 'Analogi budaya Barat, Amerika, Eropa modern',
    activeClass: 'bg-blue-500 text-white',
    hoverClass:  'hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400',
    borderClass: 'border-blue-200 dark:border-blue-900',
    shadowClass: 'shadow-blue-500/30',
  },
  {
    id: 'islamic',
    emoji: '☪️',
    label: 'Islami',
    desc: 'Analogi berbasis nilai dan cerita Islami',
    activeClass: 'bg-teal-500 text-white',
    hoverClass:  'hover:border-teal-400 hover:text-teal-600 dark:hover:text-teal-400',
    borderClass: 'border-teal-200 dark:border-teal-900',
    shadowClass: 'shadow-teal-500/30',
  },
  {
    id: 'chinese',
    emoji: '🐉',
    label: 'Tionghoa',
    desc: 'Analogi budaya Tionghoa, filosofi Konghucu',
    activeClass: 'bg-red-500 text-white',
    hoverClass:  'hover:border-red-400 hover:text-red-600 dark:hover:text-red-400',
    borderClass: 'border-red-200 dark:border-red-900',
    shadowClass: 'shadow-red-500/30',
  },
]

// ─── Component ────────────────────────────────────────────────────
export default function LensSelector() {
  const { selectedLens, setSelectedLens } = useKalikaStore()

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {LENSES.map((lens) => {
        const isActive = selectedLens === lens.id

        return (
          <div key={lens.id} className="relative group">
            {/* Chip */}
            <button
              id={`lens-${lens.id}`}
              type="button"
              onClick={() => setSelectedLens(lens.id)}
              className={`
                w-full flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border
                font-semibold text-xs transition-all duration-200
                select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                ${isActive
                  ? `${lens.activeClass} border-transparent shadow-md ${lens.shadowClass} scale-[1.02]`
                  : `bg-[var(--surface-card)] ${lens.borderClass} text-[var(--text-secondary)]
                     ${lens.hoverClass} hover:scale-[1.02] hover:shadow-sm`
                }
              `}
            >
              <span className={`text-xl leading-none transition-transform duration-200
                ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {lens.emoji}
              </span>
              <span className="font-bold tracking-wide">{lens.label}</span>

              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
            </button>

            {/* Tooltip — CSS only, no JS */}
            <div
              role="tooltip"
              className="
                pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2
                w-48 px-3 py-2 rounded-lg z-50
                bg-[var(--text-primary)] text-[var(--surface-bg)] text-xs leading-snug text-center
                opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100
                transition-all duration-150 origin-bottom
                shadow-lg
              "
            >
              {lens.desc}
              {/* Arrow */}
              <span className="absolute top-full left-1/2 -translate-x-1/2
                border-4 border-transparent border-t-[var(--text-primary)]" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
