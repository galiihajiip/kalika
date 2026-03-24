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
    el.style.height = `${Math.min(Math.max(el.scrollHeight, 200), 500)}px`
  }, [inputText])

  const charCount = inputText.length
  const isOverLimit = charCount > MAX_CHARS
  
  // Character counter color feedback
  const getCounterColor = () => {
    if (charCount > 0 && charCount < 50) return 'text-red-400'
    if (charCount >= 50 && charCount < 1000) return 'text-kalika-muted'
    if (charCount >= 1000 && charCount < 4000) return 'text-kalika-green'
    if (charCount >= 4000) return 'text-yellow-400'
    return 'text-kalika-muted'
  }

  const getCounterLabel = () => {
    if (charCount > 0 && charCount < 50) return 'Too short'
    return null
  }

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputText(e.target.value)}
        placeholder="Paste your lecture notes, study material, or textbook excerpt here... Minimum 50 characters. You can also upload an image or audio above."
        maxLength={MAX_CHARS + 100}
        className={`w-full min-h-[200px] bg-kalika-bg border rounded-xl p-6 text-base leading-relaxed text-kalika-text-secondary placeholder-kalika-muted resize-none focus:outline-none focus:border-kalika-green-glow focus:ring-1 focus:ring-kalika-green-glow transition-all duration-150 custom-scrollbar
          ${isOverLimit ? 'border-red-500/50' : 'border-kalika-border'}`}
        style={{ minHeight: 200, maxHeight: 500 }}
      />
      <div className={`text-xs absolute bottom-3 right-4 px-2 py-1 flex items-center gap-2 rounded-md bg-kalika-surface/80 backdrop-blur-sm border border-kalika-border ${getCounterColor()}`}>
        {getCounterLabel() && <span className="font-bold border-r border-kalika-border pr-2">{getCounterLabel()}</span>}
        <span className="font-mono">
          {charCount.toLocaleString('en-US')} / {MAX_CHARS.toLocaleString('en-US')}
        </span>
      </div>
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
    <div className="flex flex-col gap-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !previewFile && inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed px-8 py-12 text-center cursor-pointer transition-all duration-150 min-h-[200px]
          ${isDragging ? 'border-kalika-green bg-kalika-green-subtle/10' : 'border-kalika-border bg-kalika-bg hover:border-kalika-green-glow shadow-inner shadow-black/20'}
          ${previewFile ? 'pointer-events-none opacity-80' : ''}`}
      >
        <span className="text-3xl opacity-60 filter grayscale group-hover:grayscale-0 transition-all">{icon}</span>
        <div>
          <p className="text-sm font-semibold text-kalika-text-secondary group-hover:text-kalika-green transition-colors">Drag & drop your file here</p>
          <p className="text-xs text-kalika-muted mt-1.5 px-3 py-1 bg-kalika-surface2 rounded-full border border-kalika-border">or click to browse local files</p>
        </div>
        <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={(e) => { if (e.target.files?.[0]) onFile(e.target.files[0]); e.target.value = '' }} />
      </div>

      {previewFile && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-kalika-surface2 border border-kalika-border shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl">{icon}</span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-kalika-text-secondary truncate">{previewFile.name}</p>
              <p className="text-xs text-kalika-muted">{formatBytes(previewFile.size)}</p>
            </div>
          </div>
          {isExtracting ? (
            <span className="text-xs font-bold text-kalika-green animate-pulse flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-kalika-green" /> Extracting...
            </span>
          ) : (
            <button type="button" onMouseDown={(e) => { e.stopPropagation(); onClear() }} className="text-xs font-bold px-3 py-1.5 rounded-lg border border-kalika-border text-kalika-muted hover:text-red-400 hover:border-red-500/30 transition-all pointer-events-auto">
              Clear
            </button>
          )}
        </div>
      )}
      
      {error && <p className="text-xs font-medium text-red-400 mt-2 px-1 flex items-center gap-2">
        <span>⚠️</span> {error}
      </p>}
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
    <div className="flex flex-col gap-5">
      {/* Container Tabs */}
      <div className="flex bg-kalika-bg rounded-xl p-1.5 border border-kalika-border shadow-sm">
        {TABS.map(({ mode, label, icon }) => (
          <button key={mode} onClick={() => setInputMode(mode)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-center text-sm font-semibold rounded-lg cursor-pointer transition-all duration-300
            ${inputMode === mode 
              ? 'bg-kalika-green-subtle text-kalika-green border border-kalika-green-glow shadow-md shadow-kalika-green/10' 
              : 'text-kalika-muted border border-transparent hover:text-kalika-text-secondary'}`}
          >
            <span className="text-lg opacity-80">{icon}</span> {label}
          </button>
        ))}
      </div>

      {inputMode === 'text' && <TextMode />}
      {inputMode === 'image' && <DropZone mode="image" accept="image/*" onFile={(f:any)=>uploadExtr(f,'image')} error={imageErr} isExtracting={imgExtract} previewFile={imageFile} onClear={()=>setImageFile(null)} />}
      {inputMode === 'audio' && <DropZone mode="audio" accept="audio/*" onFile={(f:any)=>uploadExtr(f,'audio')} error={audioErr} isExtracting={audExtract} previewFile={audioFile} onClear={()=>setAudioFile(null)} />}
    </div>
  )
}
