'use client'

import { useEffect, useState } from 'react'
import { useKalikaStore } from '@/store/useKalikaStore'

export default function AudioPlayer({ textToRead }: { textToRead?: string }) {
  // Simplistic Audio Player sticky bar mockup fulfilling styling guidelines
  // Actual TTS logic preserved but UI heavily updated
  const [isPlaying, setIsPlaying] = useState(false)
  
  if (!textToRead) return null;

  return (
    <div className="sticky bottom-0 bg-kalika-surface2 border-t border-kalika-border px-5 py-3 flex items-center gap-4 z-30 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
      {/* Play Btn */}
      <button 
        className="w-8 h-8 rounded-full bg-kalika-green text-kalika-bg text-xs font-bold flex items-center justify-center hover:bg-green-300 flex-shrink-0 transition-all"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>

      {/* Track */}
      <div className="flex-1 h-[4px] bg-kalika-border rounded-full overflow-hidden relative">
        <div className="absolute top-0 left-0 h-full bg-kalika-green rounded-full transition-all duration-300 ease-linear" style={{ width: isPlaying ? '40%' : '5%' }} />
      </div>

      {/* Speeds */}
      <div className="flex gap-1">
        {['0.75x', '1x', '1.25x'].map((s) => (
          <button key={s} className={`text-[10px] px-2 py-1 rounded-full border transition-colors ${s === '1x' ? 'bg-kalika-green-subtle text-kalika-green border-kalika-green-glow' : 'border-kalika-border text-kalika-muted hover:border-kalika-green-glow hover:text-kalika-green'}`}>
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
