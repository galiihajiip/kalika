'use client'

import { useState } from 'react'
import { useKalikaStore } from '@/store/useKalikaStore'
import type { LensType } from '@/types'
import AudioPlayer from '@/components/AudioPlayer'

// ─── Constants & Helpers ──────────────────────────────────────────

const LENS_LOADING_MESSAGES: Record<LensType, string> = {
  nusantara: 'Sedang menyedu analogi Nusantara... ☕',
  western: 'Crafting your Western analogy... 🌍',
  islamic: 'Menyusun kajian Islami... ☪️',
  chinese: 'Merangkum filosofi Tionghoa... 🐉',
}

const LENS_EMOJIS: Record<LensType, string> = {
  nusantara: '🌴',
  western: '🌍',
  islamic: '☪️',
  chinese: '🐉',
}

const LENS_STYLES: Record<LensType, { bg: string; text: string; lightBg: string }> = {
  nusantara: { bg: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400', lightBg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  western: { bg: 'bg-blue-500', text: 'text-blue-700 dark:text-blue-400', lightBg: 'bg-blue-50 dark:bg-blue-950/30' },
  islamic: { bg: 'bg-teal-500', text: 'text-teal-700 dark:text-teal-400', lightBg: 'bg-teal-50 dark:bg-teal-950/30' },
  chinese: { bg: 'bg-red-500', text: 'text-red-700 dark:text-red-400', lightBg: 'bg-red-50 dark:bg-red-950/30' },
}

// ─── Sub-component: Accordion Section ────────────────────────────

function Accordion({
  title,
  icon,
  defaultOpen = true,
  children,
}: {
  title: string
  icon: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-[var(--surface-border)] rounded-xl overflow-hidden bg-[var(--surface-card)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-[var(--surface-muted)] hover:bg-[var(--surface-border)] transition-colors"
      >
        <div className="flex items-center gap-3 font-bold font-[var(--font-sora)]">
          <span className="text-xl">{icon}</span>
          <span>{title}</span>
        </div>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && <div className="p-5">{children}</div>}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────

export default function ResultCard() {
  const {
    resultData: result,
    isLoading,
    selectedLens: lens,
    inputText,
    addToast,
    setLoading,
    setQuiz,
    setActiveTab,
  } = useKalikaStore()

  // State untuk AudioPlayer (placeholder until implemented)
  const [playAudio, setPlayAudio] = useState(false)

  // Copy to clipboard handler
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      addToast({ message: 'Disalin ke clipboard!', type: 'success' })
    } catch (err) {
      addToast({ message: 'Gagal menyalin teks.', type: 'error' })
    }
  }

  // Generate kuis handler
  const handleGenerateQuiz = async () => {
    if (!inputText) return
    setLoading(true)
    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, lens }),
      })

      if (!res.ok) throw new Error('Gagal membuat kuis.')

      const data = await res.json()
      setQuiz(data.data) // Asumsikan struktur { success: true, data: QuizItem[] }
      setActiveTab('quiz')
      addToast({ message: 'Kuis berhasil dibuat!', type: 'success' })
    } catch (error) {
      addToast({ message: 'Gagal memuat kuis, coba lagi nanti.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-2 px-2">
          <div className="w-5 h-5 border-2 border-[var(--kalika-primary)] border-t-transparent rounded-full animate-spin" />
          <p className="font-semibold text-[var(--kalika-primary)] text-sm animate-pulse">
            {LENS_LOADING_MESSAGES[lens]}
          </p>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5">
            <div className="h-6 w-1/3 bg-[var(--surface-muted)] rounded animate-pulse mb-4" />
            <div className="space-y-3">
              <div className="h-4 bg-[var(--surface-muted)] rounded animate-pulse w-full" />
              <div className="h-4 bg-[var(--surface-muted)] rounded animate-pulse w-5/6" />
              <div className="h-4 bg-[var(--surface-muted)] rounded animate-pulse w-4/6" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // 2. Kosong / Belum ada result
  if (!result) return null

  // 3. Render Hasil
  const style = LENS_STYLES[lens]

  return (
    <div className="flex flex-col gap-5 animate-fade-in-up">

      {/* Teks Ramah Belajar */}
      <Accordion title="Teks Ramah Belajar" icon="📖">
        <div className="flex flex-col gap-4">
          <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed
            [&>p]:mb-3 [&>ul]:mb-3 [&>ul>li]:mb-1 [&>strong]:text-[var(--kalika-primary)] font-medium">
            {/* Merender string secara kasar tapi meng-handle bullet points yang mungkin masih berbalut markdown basic */}
            {result.dyslexiaFriendlyText.split('\n').map((line, idx) => {
              if (line.trim().startsWith('-')) {
                return (
                  <li key={idx} className="ml-4 list-disc marker:text-[var(--kalika-primary)]">
                    {/* Mengganti **bold** sederhana */}
                    <span dangerouslySetInnerHTML={{ __html: line.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </li>
                )
              } else if (line.trim()) {
                return (
                  <p key={idx}>
                    <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </p>
                )
              }
              return null
            })}
          </div>

          <div className="flex items-center gap-3 mt-2 border-t border-[var(--surface-border)] pt-4">
            <button
              onClick={() => handleCopy(result.dyslexiaFriendlyText)}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-[var(--surface-muted)] text-[var(--text-primary)] hover:bg-[var(--surface-border)] transition-colors flex items-center gap-2"
            >
              <span>📋</span> Salin Teks
            </button>
            <button
              onClick={() => setPlayAudio(!playAudio)}
              className="px-4 py-2 text-xs font-bold rounded-lg bg-[var(--kalika-primary)] text-white hover:opacity-90 transition-colors flex items-center gap-2"
            >
              <span>🔊</span> {playAudio ? 'Berhenti' : 'Dengarkan'}
            </button>
          </div>
          {playAudio && (
             <div className="mt-2 text-xs italic text-[var(--kalika-primary)]">
                (Integrasi AudioPlayer diletakkan di sini nantinya)
             </div>
          )}
        </div>
      </Accordion>

      {/* Analogi Budaya */}
      <Accordion title={`Analogi Budaya ${lens.charAt(0).toUpperCase() + lens.slice(1)}`} icon="🎭">
        <div className={`relative p-6 rounded-xl border ${style.lightBg} border-[var(--surface-border)] overflow-hidden`}>
          <span className="absolute -top-4 -left-2 text-6xl opacity-20 pointer-events-none">
            {LENS_EMOJIS[lens]}
          </span>
          <div className="relative z-10">
            <p className={`text-sm leading-relaxed font-medium ${style.text}`}>
              {result.culturalAnalogy}
            </p>
          </div>
        </div>
      </Accordion>

      {/* Batas Ujian / Peringatan */}
      <Accordion title="Batas Analisis Ujian" icon="⚠️" defaultOpen={false}>
        <div className="flex gap-4 items-start p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
          <span className="text-amber-500 text-xl shrink-0 mt-0.5">⚠️</span>
          <p className="text-sm italic text-amber-700 dark:text-amber-400 leading-relaxed font-medium">
            {result.examBoundary}
          </p>
        </div>
      </Accordion>

      {/* Glosarium Bilingual */}
      <Accordion title="Glosarium Bilingual" icon="📚" defaultOpen={false}>
        <div className="overflow-x-auto rounded-xl border border-[var(--surface-border)]">
          <table className="w-full text-left text-sm whitespace-nowrap md:whitespace-normal">
            <thead className="bg-[var(--surface-muted)] text-[var(--text-secondary)]">
              <tr>
                <th className="px-4 py-3 font-semibold w-1/4">Istilah</th>
                <th className="px-4 py-3 font-semibold w-1/4">English (B1)</th>
                <th className="px-4 py-3 font-semibold w-1/2">Konteks Lokal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--surface-border)]">
              {result.bilingualGlossary.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-[var(--surface-muted)]/50'}>
                  <td className="px-4 py-3 font-bold text-[var(--kalika-primary)]">{item.term}</td>
                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{item.englishB1}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{item.localContext}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Accordion>

      {/* Action Button: Generate Quiz */}
      <div className="mt-4">
        <button
          id="btn-generate-quiz"
          onClick={handleGenerateQuiz}
          disabled={isLoading}
          className="w-full py-4 rounded-xl font-[var(--font-sora)] font-bold text-sm
            bg-[var(--surface-card)] border-2 border-[var(--kalika-primary)] text-[var(--kalika-primary)]
            hover:bg-[var(--kalika-primary)] hover:text-white
            active:scale-[.99] transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Mempersiapkan Kuis...' : '🧠 Generate Kuis dari Materi Ini'}
        </button>
      </div>

    </div>
  )
}
