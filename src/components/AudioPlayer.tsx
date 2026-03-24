'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface AudioPlayerProps {
  textToRead: string
}

interface VoiceOption {
  voice: SpeechSynthesisVoice
  label: string
  lang: string
  flag: string
}

const LANGUAGE_FLAGS: Record<string, string> = {
  'id': '🇮🇩', 'en': '🇺🇸', 'ar': '🇸🇦', 'zh': '🇨🇳',
  'ja': '🇯🇵', 'ko': '🇰🇷', 'fr': '🇫🇷', 'de': '🇩🇪',
  'es': '🇪🇸', 'pt': '🇧🇷', 'hi': '🇮🇳', 'th': '🇹🇭',
  'vi': '🇻🇳', 'ms': '🇲🇾', 'tl': '🇵🇭', 'ru': '🇷🇺',
}

const PRIORITY_VOICES = [
  'Google Bahasa Indonesia',
  'Google Indonesian',  
  'Microsoft Andika Online',
  'Microsoft Gadis Online',
  'Google US English',
  'Google UK English Female',
  'Microsoft Zira',
  'Google العربية',
  'Google 普通话（中国大陆）',
  'Google 日本語',
  'Google 한국의',
]

export default function AudioPlayer({ textToRead }: AudioPlayerProps) {
  const [voices, setVoices] = useState<VoiceOption[]>([])
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const [showVoicePicker, setShowVoicePicker] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const words = textToRead.split(/\s+/).filter(Boolean)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Load voices: must handle async voice loading
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false)
      return
    }

    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices()
      if (allVoices.length === 0) return

      // Sort: priority voices first, then by language
      const mapped: VoiceOption[] = allVoices.map(v => {
        const langCode = v.lang.split('-')[0].toLowerCase()
        const flag = LANGUAGE_FLAGS[langCode] || '🌐'
        return {
          voice: v,
          label: v.name,
          lang: v.lang,
          flag,
        }
      })

      // Sort: priority names first
      mapped.sort((a, b) => {
        const aPriority = PRIORITY_VOICES.findIndex(p => a.label.includes(p))
        const bPriority = PRIORITY_VOICES.findIndex(p => b.label.includes(p))
        if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority
        if (aPriority !== -1) return -1
        if (bPriority !== -1) return 1
        return a.lang.localeCompare(b.lang)
      })

      setVoices(mapped)

      // Auto-select best voice for Indonesian content
      const indonesianWords = ['yang','adalah','dan','untuk','ini','itu','dari','ke','di','dengan','pada','tidak','ada','juga','sudah','akan','bisa','kita']
      const wordList = textToRead.toLowerCase().split(/\s+/)
      const idCount = wordList.filter(w => indonesianWords.includes(w)).length
      const isIndonesian = idCount / wordList.length > 0.15

      let best = mapped.find(v => 
        isIndonesian 
          ? (v.label.includes('Indonesian') || v.label.includes('Bahasa') || v.lang.startsWith('id'))
          : (v.label.includes('Google US English') || v.lang === 'en-US')
      )
      if (!best) best = mapped[0]
      if (best) setSelectedVoice(best.voice)
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => { window.speechSynthesis.cancel() }
  }, [textToRead])

  // Cancel and reset when text changes
  useEffect(() => {
    window.speechSynthesis?.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentWordIndex(-1)
  }, [textToRead])

  const speak = useCallback(() => {
    if (!isSupported || !selectedVoice) return
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(textToRead)
    utterance.voice = selectedVoice
    utterance.rate = speed
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        const spokenText = textToRead.slice(0, e.charIndex)
        const wordIdx = spokenText.split(/\s+/).filter(Boolean).length - 1
        setCurrentWordIndex(wordIdx)
      }
    }
    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setCurrentWordIndex(-1)
    }
    utterance.onerror = () => {
      setIsPlaying(false)
      setCurrentWordIndex(-1)
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
    setIsPlaying(true)
    setIsPaused(false)
  }, [textToRead, selectedVoice, speed, isSupported])

  const pause = () => {
    window.speechSynthesis.pause()
    setIsPaused(true)
    setIsPlaying(false)
  }
  const resume = () => {
    window.speechSynthesis.resume()
    setIsPaused(false)
    setIsPlaying(true)
  }
  const stop = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentWordIndex(-1)
  }

  if (!isSupported) {
    return (
      <div className="text-center py-4 text-kalika-muted text-sm">
        Text-to-speech is not supported in this browser.
        Try Chrome, Edge, or Safari.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      
      {/* Word highlight display */}
      <div className="text-sm text-kalika-text-secondary leading-loose 
                      max-h-32 overflow-y-auto p-3 
                      bg-kalika-bg rounded-xl border border-kalika-border">
        {words.map((word, i) => (
          <span
            key={i}
            className={`transition-colors duration-100 ${
              i === currentWordIndex
                ? 'bg-yellow-400 text-black rounded px-0.5 font-semibold'
                : ''
            }`}
          >
            {word}{' '}
          </span>
        ))}
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-3">
        
        {/* Play/Pause/Stop */}
        <div className="flex items-center gap-2">
          {!isPlaying && !isPaused && (
            <button
              onClick={speak}
              className="w-10 h-10 rounded-full bg-kalika-green text-kalika-bg 
                         font-bold text-sm flex items-center justify-center
                         hover:bg-green-300 transition-colors"
            >▶</button>
          )}
          {isPlaying && (
            <button
              onClick={pause}
              className="w-10 h-10 rounded-full bg-kalika-green text-kalika-bg 
                         font-bold text-sm flex items-center justify-center
                         hover:bg-green-300 transition-colors"
            >⏸</button>
          )}
          {isPaused && (
            <button
              onClick={resume}
              className="w-10 h-10 rounded-full bg-kalika-green text-kalika-bg 
                         font-bold text-sm flex items-center justify-center
                         hover:bg-green-300 transition-colors"
            >▶</button>
          )}
          {(isPlaying || isPaused) && (
            <button
              onClick={stop}
              className="w-10 h-10 rounded-full border border-kalika-border2 
                         text-kalika-muted text-sm flex items-center justify-center
                         hover:border-red-500 hover:text-red-400 transition-colors"
            >⏹</button>
          )}
        </div>

        {/* Speed */}
        <div className="flex gap-1">
          {[0.75, 1, 1.25, 1.5, 2].map(s => (
            <button
              key={s}
              onClick={() => {
                setSpeed(s)
                if (isPlaying) { stop(); setTimeout(speak, 100) }
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold 
                          border transition-colors ${
                s === speed
                  ? 'bg-kalika-green-subtle text-kalika-green border-kalika-green-glow'
                  : 'border-kalika-border text-kalika-muted hover:border-kalika-border2'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>

        {/* Voice picker toggle */}
        <button
          onClick={() => setShowVoicePicker(v => !v)}
          className="ml-auto flex items-center gap-2 px-3 py-1.5 
                     border border-kalika-border2 rounded-lg text-xs 
                     text-kalika-text-secondary hover:border-kalika-green-glow 
                     hover:text-kalika-green transition-colors"
        >
          {selectedVoice 
            ? `${LANGUAGE_FLAGS[selectedVoice.lang.split('-')[0]] || '🌐'} ${selectedVoice.name.slice(0, 20)}`
            : '🌐 Select voice'
          }
          <span>{showVoicePicker ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Voice picker dropdown */}
      {showVoicePicker && (
        <div className="border border-kalika-border2 rounded-xl overflow-hidden
                        max-h-64 overflow-y-auto bg-kalika-surface">
          <div className="px-4 py-2 bg-kalika-surface2 border-b border-kalika-border
                          text-xs text-kalika-muted uppercase tracking-wider font-semibold">
            Choose a voice: {voices.length} available
          </div>
          {voices.map((v, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedVoice(v.voice)
                setShowVoicePicker(false)
                if (isPlaying) { stop(); setTimeout(speak, 100) }
              }}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 
                          text-sm border-b border-kalika-border last:border-0
                          hover:bg-kalika-surface2 transition-colors ${
                selectedVoice?.name === v.voice.name
                  ? 'bg-kalika-green-subtle text-kalika-green'
                  : 'text-kalika-text-secondary'
              }`}
            >
              <span className="text-base w-6 text-center">{v.flag}</span>
              <div>
                <div className="font-medium">{v.label}</div>
                <div className="text-xs text-kalika-muted">{v.lang}</div>
              </div>
              {selectedVoice?.name === v.voice.name && (
                <span className="ml-auto text-kalika-green text-xs">✓ Active</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
