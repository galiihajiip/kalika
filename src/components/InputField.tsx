'use client'

import { useRef, useEffect, useCallback, useState, DragEvent, ChangeEvent } from 'react'
import { useKalikaStore } from '@/store/useKalikaStore'
import type { InputMode } from '@/types'

// ─── Constants ───────────────────────────────────────────────────
const MAX_CHARS = 5000
const MIN_CHARS = 50
const MAX_AUDIO_BYTES = 5 * 1024 * 1024 // 5 MB

const TABS: { mode: InputMode; label: string; icon: string }[] = [
  { mode: 'text',  label: 'Text',   icon: '📝' },
  { mode: 'image', label: 'Image', icon: '🖼️' },
  { mode: 'audio', label: 'Audio',  icon: '🎙️' },
]

// ─── Helpers ─────────────────────────────────────────────────────
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ─── Sub-components ───────────────────────────────────────────────

/** Auto-resizing textarea for text mode */
function TextMode() {
  const { inputText, setInputText } = useKalikaStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(Math.max(el.scrollHeight, 120), 400)}px`
  }, [inputText])

  const charCount = inputText.length
  const isOverLimit = charCount > MAX_CHARS
  const isBelowMin  = charCount > 0 && charCount < MIN_CHARS

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <textarea
          ref={textareaRef}
          id="input-text-area"
          value={inputText}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
          placeholder="Paste your study material here... (min. 50 characters)"
          maxLength={MAX_CHARS + 100}
          className={`w-full resize-none rounded-xl border px-4 py-3 text-sm leading-relaxed
            bg-[var(--surface-muted)] text-[var(--text-primary)]
            placeholder:text-[var(--text-muted)]
            outline-none transition-all duration-200
            focus:border-[var(--kalika-primary)] focus:ring-2 focus:ring-[var(--kalika-primary)]/20
            ${isOverLimit
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-[var(--surface-border)]'
            }`}
          style={{ minHeight: 120, maxHeight: 400 }}
        />
      </div>

      <div className="flex items-center justify-between px-1">
        {isBelowMin && (
          <span className="text-xs text-amber-500 font-semibold">
            Minimum {MIN_CHARS} characters required
          </span>
        )}
        {!isBelowMin && <span />}
        <span className={`text-xs font-semibold tabular-nums
          ${isOverLimit ? 'text-red-500' : 'text-[var(--text-muted)]'}`}>
          {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

/** Shared drop zone for image / audio modes */
interface DropZoneProps {
  mode: 'image' | 'audio'
  accept: string
  onFile: (file: File) => void
  error: string | null
  isExtracting: boolean
  previewFile: File | null
  onClear: () => void
}

function DropZone({ mode, accept, onFile, error, isExtracting, previewFile, onClear }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }, [onFile])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFile(file)
    // reset input so same file can be re-selected
    e.target.value = ''
  }, [onFile])

  const icon = mode === 'image' ? '🖼️' : '🎙️'
  const hint = mode === 'image'
    ? 'PNG, JPG · no size limit'
    : 'MP3, WAV, OGG · max 5 MB'

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !previewFile && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed
          px-6 py-10 text-center cursor-pointer transition-all duration-200
          ${isDragging
            ? 'border-[var(--kalika-primary)] bg-[var(--kalika-primary)]/5 scale-[1.01]'
            : 'border-[var(--surface-border)] bg-[var(--surface-muted)] hover:border-[var(--kalika-primary)]/50'
          }
          ${previewFile ? 'pointer-events-none opacity-70' : ''}`}
      >
        <span className="text-4xl">{icon}</span>
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            Drag &amp; drop your file here
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{hint}</p>
        </div>
        <button
          type="button"
          id={`btn-pick-${mode}`}
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
          className="px-5 py-2 rounded-lg text-xs font-bold bg-[var(--kalika-primary)] text-white
            hover:opacity-90 active:scale-95 transition-all duration-150 pointer-events-auto"
        >
          Select File
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
          <span className="text-red-500 text-sm">⚠️</span>
          <p className="text-xs font-semibold text-red-500">{error}</p>
        </div>
      )}

      {/* Preview / extracting */}
      {previewFile && (
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl
          bg-[var(--surface-card)] border border-[var(--surface-border)]">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl shrink-0">{icon}</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                {previewFile.name}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {formatBytes(previewFile.size)}
              </p>
            </div>
          </div>

          {isExtracting ? (
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-4 h-4 border-2 border-[var(--kalika-primary)]/30 border-t-[var(--kalika-primary)]
                rounded-full animate-spin" />
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                Extracting text...
              </span>
            </div>
          ) : (
            <button
              type="button"
              id={`btn-clear-${mode}`}
              onMouseDown={(e) => { e.stopPropagation(); onClear() }}
              className="shrink-0 w-7 h-7 rounded-lg bg-[var(--surface-muted)] flex items-center justify-center
                hover:bg-red-500/10 hover:text-red-500 text-[var(--text-muted)]
                transition-all duration-150 text-sm font-bold pointer-events-auto"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────

export default function InputField() {
  const { inputMode, setInputMode, setInputText } = useKalikaStore()

  // Image state
  const [imageFile, setImageFile]     = useState<File | null>(null)
  const [imageError, setImageError]   = useState<string | null>(null)
  const [imageExtracting, setImageExtracting] = useState(false)

  // Audio state
  const [audioFile, setAudioFile]     = useState<File | null>(null)
  const [audioError, setAudioError]   = useState<string | null>(null)
  const [audioExtracting, setAudioExtracting] = useState(false)

  // ── Handlers ───────────────────────────────────────────────────

  async function extractMultimodal(file: File, type: 'image' | 'audio') {
    const setFile       = type === 'image' ? setImageFile       : setAudioFile
    const setError      = type === 'image' ? setImageError      : setAudioError
    const setExtracting = type === 'image' ? setImageExtracting : setAudioExtracting

    setFile(file)
    setError(null)
    setExtracting(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const res = await fetch('/api/process-multimodal', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const json = await res.json() as { error?: string }
        throw new Error(json.error ?? 'Failed to extract content')
      }

      const json = await res.json() as { extractedText: string }
      setInputText(json.extractedText)
      setInputMode('text')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
    } finally {
      setExtracting(false)
    }
  }

  function handleImageFile(file: File) {
    setImageError(null)
    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) {
      setImageError('Unsupported format. Please use PNG, JPG, or WebP.')
      return
    }
    extractMultimodal(file, 'image')
  }

  function handleAudioFile(file: File) {
    setAudioError(null)
    if (!['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/x-wav'].includes(file.type)) {
      setAudioError('Unsupported format. Please use MP3, WAV, or OGG.')
      return
    }
    if (file.size > MAX_AUDIO_BYTES) {
      setAudioError(`File size too large. Maximum ${formatBytes(MAX_AUDIO_BYTES)}.`)
      return
    }
    extractMultimodal(file, 'audio')
  }

  function clearImage() {
    setImageFile(null)
    setImageError(null)
  }

  function clearAudio() {
    setAudioFile(null)
    setAudioError(null)
  }

  // ── Render ─────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">

      {/* Tab Switcher */}
      <div className="flex gap-1 p-1 rounded-xl bg-[var(--surface-muted)] border border-[var(--surface-border)]">
        {TABS.map(({ mode, label, icon }) => (
          <button
            key={mode}
            id={`tab-input-${mode}`}
            type="button"
            onClick={() => setInputMode(mode)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg
              text-xs font-bold transition-all duration-200
              ${inputMode === mode
                ? 'bg-[var(--surface-card)] text-[var(--kalika-primary)] shadow-sm border border-[var(--surface-border)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
          >
            <span>{icon}</span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Mode Content */}
      {inputMode === 'text' && <TextMode />}

      {inputMode === 'image' && (
        <DropZone
          mode="image"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onFile={handleImageFile}
          error={imageError}
          isExtracting={imageExtracting}
          previewFile={imageFile}
          onClear={clearImage}
        />
      )}

      {inputMode === 'audio' && (
        <DropZone
          mode="audio"
          accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg"
          onFile={handleAudioFile}
          error={audioError}
          isExtracting={audioExtracting}
          previewFile={audioFile}
          onClear={clearAudio}
        />
      )}
    </div>
  )
}
