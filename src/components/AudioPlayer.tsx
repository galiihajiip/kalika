'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

export interface AudioPlayerProps {
  textToRead: string
}

const COMMON_ID_WORDS = new Set(['yang', 'adalah', 'dengan', 'untuk', 'ini', 'itu', 'dari', 'ke', 'di', 'dan', 'atau', 'karena', 'bahwa'])
const SPEEDS = [0.75, 1, 1.25, 1.5]

function detectLanguage(text: string): 'id-ID' | 'en-US' {
  const words = text.toLowerCase().match(/[a-z]+/g) || []
  if (words.length === 0) return 'id-ID'

  let idCount = 0
  for (const w of words) {
    if (COMMON_ID_WORDS.has(w)) idCount++
  }

  // If common Indonesian words appear relatively frequently
  // Threshold is set low (e.g. 5% of total words) because specfic words are not counted.
  const ratio = idCount / words.length
  return ratio > 0.05 ? 'id-ID' : 'en-US'
}

export default function AudioPlayer({ textToRead }: AudioPlayerProps) {
  const [supported, setSupported] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState<number>(1)
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1)

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // 1. Parsing text into words with char boundaries for highlighting
  const wordData = useMemo(() => {
    const data: { word: string; start: number; end: number }[] = []
    let match: RegExpExecArray | null
    const regex = /\S+/g
    
    // Reset regex index state
    while ((match = regex.exec(textToRead)) !== null) {
      data.push({
        word: match[0],
        start: match.index,
        end: match.index + match[0].length,
      })
    }
    return data
  }, [textToRead])

  // 2. Lifecycle & Graceful Degradation
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false)
      return
    }

    setSupported(true)

    // Cleanup on unmount
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // 3. Audio Control Logic
  const stopAudio = () => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentWordIndex(-1)
  }

  const playAudio = () => {
    if (!supported || !textToRead.trim()) return

    // Resume if paused
    if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
      setIsPlaying(true)
      return
    }

    // Cancel anything playing beforehand
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(textToRead)
    const lang = detectLanguage(textToRead)
    
    utterance.lang = lang
    utterance.rate = speed
    utterance.pitch = 1

    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
      setCurrentWordIndex(-1)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setCurrentWordIndex(-1)
    }

    utterance.onerror = (e) => {
      // Ignore manual cancel errors
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.error('SpeechSynthesis Error:', e)
      }
      setIsPlaying(false)
      setIsPaused(false)
      setCurrentWordIndex(-1)
    }

    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        const charIndex = e.charIndex
        // Find word that matches charIndex
        const wIndex = wordData.findIndex(
          (w) => charIndex >= w.start && charIndex < w.end
        )
        // Browser might only hit exactly at the start
        if (wIndex !== -1) setCurrentWordIndex(wIndex)
      }
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const pauseAudio = () => {
    if (!supported) return
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause()
      setIsPaused(true)
      setIsPlaying(false)
    }
  }

  // Handle speed change adjusting on the fly (restarts in most reliable fallback implementation)
  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed)
    if (isPlaying && !isPaused) {
      // Browsers might not support dynamic rate well, restarting cleanly
      stopAudio()
      setTimeout(() => {
        setSpeed(newSpeed)
      }, 100)
    }
  }

  // ── Render ──────────────────────────────────────────────────────────

  if (!supported) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-lg bg-[var(--surface-muted)] border border-[var(--surface-border)]" title="Browser does not support TTS">
        <span className="text-xl">🔇</span>
        <span className="text-sm font-semibold text-[var(--text-muted)] line-through decoration-2">Text Audio Assistant</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* ── Highlighted Text Box ── */}
      {(isPlaying || isPaused) && wordData.length > 0 && (
        <div className="p-4 rounded-xl bg-[var(--surface-muted)] border border-[var(--surface-border)] max-h-48 overflow-y-auto leading-relaxed shadow-inner">
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {wordData.map((w, idx) => {
              const isActive = idx === currentWordIndex
              return (
                <span
                  key={`${idx}-${w.start}`}
                  className={`transition-colors duration-150 rounded px-0.5 mx-[1px]
                    ${isActive
                      ? 'bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 shadow-sm'
                      : ''
                    }`}
                >
                  {w.word}
                </span>
              )
            })}
          </p>
        </div>
      )}

      {/* ── Audio Controls ── */}
      <div className="flex items-center flex-wrap gap-3 p-2 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)]">
        
        {/* Play/Pause Button */}
        {!isPlaying ? (
          <button
            onClick={playAudio}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--kalika-primary)] text-white text-sm font-bold shadow hover:opacity-90 active:scale-95 transition-all"
            aria-label="Play Audio"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Play
          </button>
        ) : (
          <button
            onClick={pauseAudio}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-bold shadow hover:opacity-90 active:scale-95 transition-all"
            aria-label="Pause Audio"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
            Pause
          </button>
        )}

        {/* Stop Button */}
        <button
          onClick={stopAudio}
          disabled={!isPlaying && !isPaused}
          className="flex items-center justify-center p-2 rounded-lg text-red-500 hover:bg-red-500/10 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
          aria-label="Stop Audio"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h12v12H6z"/>
          </svg>
        </button>

        <div className="h-6 w-px bg-[var(--surface-border)] mx-1" />

        {/* Speed Selector */}
        <div className="flex items-center gap-1 bg-[var(--surface-muted)] p-1 rounded-lg">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => handleSpeedChange(s)}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                speed === s
                  ? 'bg-[var(--surface-card)] text-[var(--kalika-primary)] shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}
