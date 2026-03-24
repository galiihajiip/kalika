'use client'

import { useRef, useEffect, useCallback, useState, DragEvent, ChangeEvent } from 'react'
import { useKalikaStore } from '@/store/useKalikaStore'
import type { InputMode } from '@/types'

const MAX_CHARS = 5000
const MIN_CHARS = 50
const MAX_AUDIO_BYTES = 5 * 1024 * 1024

const TABS: { mode: InputMode; label: string; icon: string }[] = [
  { mode: 'text',  label: 'Text',   icon: '📄' },
  { mode: 'image', label: 'Image', icon: '🖼️' },
  { mode: 'audio', label: 'Audio',  icon: '🎙️' },
]

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function TextMode() {
  const { inputText, setInputText } = useKalikaStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(Math.max(el.scrollHeight, 140), 400)}px`
  }, [inputText])

  const charCount = inputText.length
  const isOverLimit = charCount > MAX_CHARS

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
        placeholder="Paste your study material here... (min. 50 characters)"
        maxLength={MAX_CHARS + 100}
        className={`w-full min-h-[140px] bg-kalika-bg border rounded-xl p-4 text-sm text-kalika-text-secondary placeholder-kalika-muted resize-none focus:outline-none focus:border-kalika-green-glow focus:ring-1 focus:ring-kalika-green-glow transition-colors duration-150 custom-scrollbar
          ${isOverLimit ? 'border-red-500/50' : 'border-kalika-border'}`}
        style={{ minHeight: 140, maxHeight: 400 }}
      />
      <span className={`text-[10px] absolute bottom-2.5 right-3 px-1.5 py-0.5 rounded
        ${isOverLimit ? 'text-red-400 bg-red-900/20' : 'text-kalika-muted bg-kalika-surface/50'}`}>
        {charCount.toLocaleString('en-US')} / {MAX_CHARS.toLocaleString('en-US')}
      </span>
    </div>
  )
}

function DropZone({ mode, accept, onFile, error, isExtracting, previewFile, onClear }: any) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }, [onFile])

  const icon = mode === 'image' ? '🖼️' : '🎙️'

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !previewFile && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-10 text-center cursor-pointer transition-all duration-150 min-h-[140px]
          ${isDragging ? 'border-kalika-green bg-kalika-green-subtle/20' : 'border-kalika-border bg-kalika-bg hover:border-kalika-green-glow'}
          ${previewFile ? 'pointer-events-none opacity-80' : ''}`}
      >
        <span className="text-2xl opacity-60">{icon}</span>
        <div>
          <p className="text-xs font-medium text-kalika-text-secondary">Drag & drop your file here</p>
          <p className="text-[10px] text-kalika-muted mt-1">or click to browse</p>
        </div>
        <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => { if (e.target.files?.[0]) onFile(e.target.files[0]); e.target.value = '' }} />
      </div>

      {previewFile && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-kalika-surface2 border border-kalika-border">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm">{icon}</span>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-kalika-text-secondary truncate">{previewFile.name}</p>
              <p className="text-[9px] text-kalika-muted">{formatBytes(previewFile.size)}</p>
            </div>
          </div>
          {isExtracting ? (
            <span className="text-[10px] font-semibold text-kalika-green animate-pulse">Extracting...</span>
          ) : (
            <button type="button" onMouseDown={(e) => { e.stopPropagation(); onClear() }} className="text-[10px] px-2 py-1 rounded border border-kalika-border text-kalika-muted hover:text-red-400 hover:border-red-900/50 pointer-events-auto">
              Clear
            </button>
          )}
        </div>
      )}
      
      {error && <p className="text-[10px] text-red-400 mt-1">{error}</p>}
    </div>
  )
}

export default function InputField() {
  const { inputMode, setInputMode, setInputText } = useKalikaStore()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageErr, setImageErr] = useState<string | null>(null)
  const [imgExtract, setImgExtract] = useState(false)
  
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioErr, setAudioErr] = useState<string | null>(null)
  const [audExtract, setAudExtract] = useState(false)

  async function uploadExtr(file: File, type: 'image'|'audio') {
    const isImg = type === 'image'; const _setFile = isImg ? setImageFile : setAudioFile;
    const _setErr = isImg ? setImageErr : setAudioErr; const _setExt = isImg ? setImgExtract : setAudExtract;
    _setFile(file); _setErr(null); _setExt(true);
    try {
      const fd = new FormData(); fd.append('file', file); fd.append('type', type);
      const res = await fetch('/api/process-multimodal', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed')
      setInputText(json.extractedText); setInputMode('text')
    } catch (e: any) { _setErr(e.message) } finally { _setExt(false) }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Container Tabs */}
      <div className="flex bg-kalika-bg rounded-lg p-1 border border-kalika-border">
        {TABS.map(({ mode, label, icon }) => (
          <button key={mode} onClick={() => setInputMode(mode)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-center text-[11px] font-medium rounded-md cursor-pointer transition-colors duration-200
            ${inputMode === mode 
              ? 'bg-kalika-green-subtle text-kalika-green border border-kalika-green-glow shadow-[0_0_10px_rgba(22,101,52,0.5)]' 
              : 'text-kalika-muted border border-transparent hover:text-kalika-text-secondary'}`}
          >
            <span className="opacity-70">{icon}</span> {label}
          </button>
        ))}
      </div>

      {inputMode === 'text' && <TextMode />}
      {inputMode === 'image' && <DropZone mode="image" accept="image/*" onFile={(f:any)=>uploadExtr(f,'image')} error={imageErr} isExtracting={imgExtract} previewFile={imageFile} onClear={()=>setImageFile(null)} />}
      {inputMode === 'audio' && <DropZone mode="audio" accept="audio/*" onFile={(f:any)=>uploadExtr(f,'audio')} error={audioErr} isExtracting={audExtract} previewFile={audioFile} onClear={()=>setAudioFile(null)} />}
    </div>
  )
}
