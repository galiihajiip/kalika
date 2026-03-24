'use client'

import { useState } from 'react'
import Link from 'next/link'
import InputField from '@/components/InputField'
import LensSelector from '@/components/LensSelector'
import ResultCard from '@/components/ResultCard'
import QuizCard from '@/components/QuizCard'
import HistoryPanel from '@/components/HistoryPanel'
import { useKalikaStore } from '@/store/useKalikaStore'

type Tab = 'result' | 'quiz'

export default function HomePage() {
  const { 
    isLoading, resultData, quizData, activeTab, setActiveTab, 
    history, inputText, selectedLens, addToast, setResult, 
    setLoading, addHistory, setQuiz 
  } = useKalikaStore()

  const [historyOpen, setHistoryOpen] = useState(false)
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false)

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
      setResult(json.data)
      setQuiz(null) // Clear old quiz on new material
      
      addHistory({
        id: `hist-${Date.now()}`,
        inputText,
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

  const handleGenerateQuiz = async () => {
    if (!inputText) return
    setIsGeneratingQuiz(true)

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, lens: selectedLens }),
      })

      if (!res.ok) {
        const errJson = await res.json()
        throw new Error(errJson.error ?? 'Failed to generate quiz')
      }

      const json = await res.json()
      setQuiz(json.data)
      setActiveTab('quiz')
      addToast({ message: 'Quiz successfully generated!', type: 'success' })
    } catch(err: any) {
      addToast({ message: err.message || 'Failed to generate quiz', type: 'error' })
    } finally {
      setIsGeneratingQuiz(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-kalika-bg text-kalika-text">
      
      {/* ── TOPBAR ── */}
      <header className="bg-kalika-surface border-b border-kalika-border px-5 py-3 flex items-center justify-between sticky top-0 z-40">
        <Link href="/landing" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-kalika-green-subtle border border-kalika-green-dim flex items-center justify-center font-display font-bold text-kalika-green text-sm shadow-[0_0_12px_rgba(34,197,94,0.15)] group-hover:scale-110 transition-transform">
            K
          </div>
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-kalika-green text-base tracking-wider leading-none">
              KALIKA
            </h1>
            <span className="text-[10px] text-kalika-muted uppercase tracking-widest mt-0.5">
              AI Study Companion
            </span>
          </div>
        </Link>
        
        <div className="flex items-center gap-5">
          <p className="hidden md:block text-xs text-kalika-muted font-medium">
            Learn anything through the <span className="text-kalika-green-dim font-bold">cultural lens</span> you choose
          </p>
          <button 
            id="btn-history-panel"
            onClick={() => setHistoryOpen(true)}
            className="text-xs font-bold text-kalika-muted hover:text-kalika-green transition-colors px-3 py-1.5 rounded-lg border border-kalika-border hover:bg-kalika-surface2"
          >
            History {history.length > 0 && `(${history.length})`}
          </button>
        </div>
      </header>

      {/* ── PAGE LAYOUT ── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[420px_1fr]">
        
        {/* LEFT COLUMN: Input */}
        <aside className="bg-kalika-surface border-r border-kalika-border p-5 flex flex-col gap-6 relative z-10">
          
          <div className="flex flex-col gap-2">
            <h2 className="text-[10px] font-semibold tracking-[0.12em] text-kalika-muted uppercase">
              Material to Study
            </h2>
            <InputField />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <h2 className="text-[10px] font-semibold tracking-[0.12em] text-kalika-muted uppercase mt-2">
              Select Cultural Lens
            </h2>
            <LensSelector />
          </div>

          <div className="mt-auto pt-4 border-t border-kalika-border">
            <button
              id="btn-generate"
              onClick={handleGenerate}
              disabled={isLoading || inputText.length < 50}
              className="w-full bg-kalika-green text-kalika-bg rounded-xl py-3.5 text-sm font-bold font-display tracking-wide hover:bg-green-300 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'ANALYZING...' : <><span>✦</span> GENERATE ANALYSIS</>}
            </button>
          </div>
        </aside>

        {/* RIGHT COLUMN: Output */}
        <main className="bg-kalika-bg relative flex flex-col min-h-[500px]">
          
          {/* Output Tabs */}
          {(resultData || isLoading) && (
            <div className="flex border-b border-kalika-border sticky top-0 bg-kalika-bg/90 backdrop-blur-md z-20">
              <button
                onClick={() => setActiveTab('result')}
                className={`flex-1 py-3.5 px-5 text-sm font-medium cursor-pointer text-center flex items-center justify-center gap-2 border-b-2 transition-all duration-200
                  ${activeTab === 'result' 
                    ? 'text-kalika-green border-kalika-green' 
                    : 'text-kalika-muted border-transparent hover:text-kalika-text-secondary'}`}
              >
                📄 Analysis Result
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex-1 py-3.5 px-5 text-sm font-medium cursor-pointer text-center flex items-center justify-center gap-2 border-b-2 transition-all duration-200
                  ${activeTab === 'quiz' 
                    ? 'text-kalika-green border-kalika-green' 
                    : 'text-kalika-muted border-transparent hover:text-kalika-text-secondary'}`}
              >
                🎮 Mini Quiz
                {quizData && quizData.length > 0 && (
                  <span className="ml-1.5 bg-kalika-green-subtle text-kalika-green text-[10px] px-1.5 py-0.5 rounded-full border border-kalika-green-glow">
                    {quizData.length}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Output Content */}
          <div className="p-6 md:p-8 flex-1 overflow-auto relative">
            {!resultData && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                <div className="w-16 h-16 rounded-2xl bg-kalika-surface2 border border-kalika-border flex items-center justify-center mb-4">
                  <span className="text-2xl text-kalika-muted">🔭</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-kalika-text mb-1">No analysis yet</h3>
                <p className="text-sm text-kalika-muted max-w-[250px]">
                  Enter your material in the left panel, then click Generate Analysis
                </p>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col gap-6 animate-pulse">
                <div className="bg-kalika-surface border border-kalika-border rounded-xl p-5 mb-4">
                  <div className="h-4 bg-kalika-surface2 rounded-full w-3/4 mb-3" />
                  <div className="h-4 bg-kalika-surface2 rounded-full w-1/2" />
                </div>
                <div className="h-40 bg-kalika-surface border border-kalika-border rounded-xl animate-pulse" />
              </div>
            )}

            {!isLoading && resultData && activeTab === 'result' && (
              <ResultCard 
                onGenerateQuiz={handleGenerateQuiz} 
                isGeneratingQuiz={isGeneratingQuiz} 
              />
            )}

            {!isLoading && activeTab === 'quiz' && (
              quizData && quizData.length > 0 ? (
                <QuizCard quiz={quizData} lens={selectedLens} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-kalika-muted py-20 animate-fade-in-up">
                  <div className="text-5xl">🎮</div>
                  <p className="text-sm font-medium text-kalika-text-secondary">No quiz yet</p>
                  <p className="text-xs text-center max-w-[200px] leading-relaxed">
                    First generate an analysis, then click "Generate Mini Quiz" in the result panel
                  </p>
                  {resultData && (
                    <button
                      onClick={handleGenerateQuiz}
                      disabled={isGeneratingQuiz}
                      className="mt-2 bg-kalika-green text-kalika-bg px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-300 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isGeneratingQuiz ? '⟳ Generating...' : '✦ Generate Quiz Now'}
                    </button>
                  )}
                </div>
              )
            )}
          </div>
        </main>
      </div>

      <HistoryPanel isOpen={historyOpen} onClose={() => setHistoryOpen(false)} />
    </div>
  )
}
