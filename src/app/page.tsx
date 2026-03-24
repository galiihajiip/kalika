'use client'

import { useState } from 'react'
import InputField from '@/components/InputField'
import LensSelector from '@/components/LensSelector'
import ResultCard from '@/components/ResultCard'
import QuizCard from '@/components/QuizCard'
import HistoryPanel from '@/components/HistoryPanel'
import { useKalikaStore } from '@/store/useKalikaStore'

// ─── Tab type ────────────────────────────────────────────────────
type Tab = 'result' | 'quiz'

// ─── Page ────────────────────────────────────────────────────────
export default function HomePage() {
  const { isLoading, resultData, quizData, activeTab, setActiveTab, history, inputText, selectedLens, addToast, setResult, setLoading, addHistory } =
    useKalikaStore()

  const [historyOpen, setHistoryOpen] = useState(false)

  // Generate Analysis Handle (Moved from old structure to connect)
  const handleGenerate = async () => {
    if (!inputText || inputText.length < 50) return
    setLoading(true)

    try {
      const res = await fetch('/api/generate-lens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, lens: selectedLens }),
      })

      if (!res.ok) {
        const errJson = await res.json()
        throw new Error(errJson.error ?? 'Failed to generate analysis')
      }

      const json = await res.json()
      // Store in Result
      setResult(json.data)
      
      // Add to history
      addHistory({
        id: `hist-${Date.now()}`,
        inputText: inputText,
        lens: selectedLens,
        result: json.data,
        timestamp: Date.now()
      })

      setActiveTab('result')
    } catch(err: any) {
      addToast({ message: err.message || 'Server error', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--surface-bg)] transition-colors duration-300">

      {/* ── Header ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[var(--surface-border)] bg-[var(--surface-bg)]/80 backdrop-blur-lg px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--kalika-primary)] to-[var(--kalika-secondary)] flex items-center justify-center shadow-lg">
              <span className="text-white font-[var(--font-sora)] font-bold text-sm">K</span>
            </div>
            <div>
              <h1 className="font-[var(--font-sora)] font-bold text-lg leading-none gradient-text">
                KALIKA
              </h1>
              <p className="text-[10px] text-[var(--text-muted)] font-semibold tracking-widest uppercase">
                AI Study Companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Tagline — hidden on mobile */}
            <p className="hidden md:block text-sm text-[var(--text-secondary)] max-w-xs text-right">
              Learn anything through the{' '}
              <span className="text-[var(--kalika-primary)] font-semibold">cultural lens</span>{' '}
              you choose
            </p>

            {/* History Button Header */}
            <button
              id="btn-header-history"
              onClick={() => setHistoryOpen(true)}
              className="relative p-2 rounded-xl bg-[var(--surface-muted)] hover:bg-[var(--surface-border)] hover:text-[var(--kalika-primary)] transition-all flex items-center justify-center text-[var(--text-secondary)] shadow-sm"
              aria-label="Open History"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-[var(--surface-bg)] shadow-sm">
                  {history.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ──────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6 h-full">

          {/* ─────────────────────────────────────────────────────
              LEFT PANEL — Input (40%)
          ───────────────────────────────────────────────────── */}
          <aside className="w-full lg:w-[40%] flex flex-col gap-4">

            {/* Card */}
            <div className="glass-card p-6 flex flex-col gap-5 animate-fade-in-up">
              <div>
                <h2 className="font-[var(--font-sora)] text-base font-bold text-[var(--text-primary)] mb-1">
                  Material to Study
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Type text, upload image, or record audio
                </p>
              </div>

              {/* Input Field */}
              <InputField />

              {/* Lens Selector */}
              <div>
                <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                  Select Cultural Lens
                </p>
                <LensSelector />
              </div>

              {/* Generate Button */}
              <button
                id="btn-generate"
                onClick={handleGenerate}
                disabled={isLoading || inputText.length < 50}
                className="w-full py-3.5 rounded-xl font-[var(--font-sora)] font-bold text-sm text-white
                  bg-gradient-to-r from-[var(--kalika-primary)] to-[var(--kalika-secondary)]
                  hover:opacity-90 active:scale-[.98]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 shadow-md hover:shadow-[var(--shadow-glow)]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Analyzing...
                  </span>
                ) : (
                  '✨ Generate Analysis'
                )}
              </button>
            </div>

            {/* History trigger (alternative) */}
            <button
              id="btn-open-history"
              onClick={() => setHistoryOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                text-[var(--text-secondary)] border border-[var(--surface-border)]
                hover:border-[var(--kalika-primary)] hover:text-[var(--kalika-primary)]
                bg-[var(--surface-card)] transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Analysis History
            </button>
          </aside>

          {/* ─────────────────────────────────────────────────────
              RIGHT PANEL — Output (60%)
          ───────────────────────────────────────────────────── */}
          <section className="w-full lg:w-[60%] flex flex-col gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>

            {/* Tab bar */}
            <div className="glass-card p-1.5 flex gap-1">
              {(['result', 'quiz'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  id={`tab-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200
                    ${activeTab === tab
                      ? 'bg-gradient-to-r from-[var(--kalika-primary)] to-[var(--kalika-secondary)] text-white shadow-md'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                >
                  {tab === 'result' ? '📖 Analysis Result' : '🧠 Mini Quiz'}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="glass-card p-6 flex-1 min-h-[480px]">
              {!resultData && !isLoading && (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-16">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--kalika-primary)]/20 to-[var(--kalika-secondary)]/20 flex items-center justify-center">
                    <span className="text-4xl">🔭</span>
                  </div>
                  <div>
                    <p className="font-[var(--font-sora)] font-bold text-[var(--text-primary)] text-lg">
                      No analysis yet
                    </p>
                    <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xs mx-auto">
                      Enter your material in the left panel, then click <strong>Generate Analysis</strong>
                    </p>
                  </div>

                  {/* Lens preview pills */}
                  <div className="flex flex-wrap gap-2 justify-center mt-2">
                    {[
                      { key: 'nusantara', label: '🌺 Nusantara' },
                      { key: 'western',   label: '🏛️ Western' },
                      { key: 'islamic',   label: '☪️ Islamic' },
                      { key: 'chinese',   label: '🐉 Chinese' },
                    ].map(({ key, label }) => (
                      <span key={key} className={`lens-pill lens-pill-${key}`}>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 border-4 border-[var(--kalika-primary)]/30 border-t-[var(--kalika-primary)] rounded-full animate-spin" />
                  <p className="text-sm font-semibold text-[var(--text-secondary)]">
                    Gemini is analyzing...
                  </p>
                </div>
              )}

              {!isLoading && resultData && activeTab === 'result' && <ResultCard />}
              {!isLoading && quizData  && activeTab === 'quiz'   && <QuizCard />}
            </div>
          </section>
        </div>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--surface-border)] py-4 px-6 text-center">
        <p className="text-xs text-[var(--text-muted)]">
          KALIKA © 2026 · Powered by{' '}
          <span className="text-[var(--kalika-primary)] font-semibold">Google Gemini</span>
        </p>
      </footer>

      <HistoryPanel isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
    </div>
  )
}
