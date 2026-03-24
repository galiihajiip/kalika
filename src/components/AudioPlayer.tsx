'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface AudioPlayerProps {
  textToRead: string
}

export default function AudioPlayer({ textToRead }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1.0)
  const [progress, setProgress] = useState(0)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Auto-detect language
  const detectLanguage = (text: string) => {
    const idWords = ['yang', 'adalah', 'dengan', 'untuk', 'ini', 'itu', 'dari', 'ke', 'di']
    const words = text.toLowerCase().split(/\s+/)
    const count = words.filter(w => idWords.includes(w)).length
    return (count / words.length) > 0.3 ? 'id-ID' : 'en-US'
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [])

  // Reset when text changes
  useEffect(() => {
    window.speechSynthesis?.cancel()
    setIsPlaying(false)
    setProgress(0)
    utteranceRef.current = null
  }, [textToRead])

  const handleTogglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.pause()
      setIsPlaying(false)
    } else {
      if (window.speechSynthesis.paused && utteranceRef.current) {
        window.speechSynthesis.resume()
      } else {
        window.speechSynthesis.cancel()
        const ut = new SpeechSynthesisUtterance(textToRead)
        ut.lang = detectLanguage(textToRead)
        ut.rate = speed
        
        ut.onend = () => {
          setIsPlaying(false)
          setProgress(100)
        }
        
        ut.onboundary = (event) => {
          if (event.name === 'word') {
            const charIndex = event.charIndex
            const percent = (charIndex / textToRead.length) * 100
            setProgress(percent)
          }
        }

        utteranceRef.current = ut
        window.speechSynthesis.speak(ut)
      }
      setIsPlaying(true)
    }
  }

  const handleStop = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setProgress(0)
    utteranceRef.current = null
  }

  const changeSpeed = (newSpeed: number) => {
    setSpeed(newSpeed)
    if (isPlaying) {
      const wasPlaying = isPlaying
      handleStop()
      if (wasPlaying) setTimeout(handleTogglePlay, 50)
    }
  }

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex items-center gap-2">
        <button 
          onClick={handleTogglePlay}
          className="w-8 h-8 rounded-full bg-kalika-green text-kalika-bg text-xs font-bold flex items-center justify-center hover:bg-green-300 flex-shrink-0 transition-all active:scale-90"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button 
          onClick={handleStop}
          className="w-8 h-8 rounded-full border border-kalika-border text-kalika-muted text-[10px] flex items-center justify-center hover:text-kalika-text transition-all"
        >
          ⏹
        </button>
      </div>

      <div className="flex-1 h-[3px] bg-kalika-border rounded-full overflow-hidden relative">
        <div 
          className="absolute top-0 left-0 h-full bg-kalika-green rounded-full transition-all duration-300 ease-linear shadow-[0_0_8px_rgba(74,222,128,0.5)]" 
          style={{ width: `${progress}%` }} 
        />
      </div>

      <div className="flex gap-1 shrink-0">
        {[0.75, 1, 1.25, 1.5].map((s) => (
          <button 
            key={s} 
            onClick={() => changeSpeed(s)}
            className={`text-[9px] px-2 py-1 rounded-full border transition-all
              ${speed === s 
                ? 'bg-kalika-green-subtle text-kalika-green border-kalika-green-glow' 
                : 'border-kalika-border text-kalika-muted hover:border-kalika-green-glow'}`}
          >
            {s}x
          </button>
        ))}
      </div>
    </div>
  )
}
