'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoMark from '@/components/LogoMark'
import InputField from '@/components/InputField'
import LensSelector from '@/components/LensSelector'
import ResultCard from '@/components/ResultCard'
import QuizCard from '@/components/QuizCard'
import HistoryPanel from '@/components/HistoryPanel'
import { useKalikaStore } from '@/store/useKalikaStore'
import { LENS_ITEMS } from '@/components/LensSelector'

type Tab = 'result' | 'quiz'

export default function HomePage() {
  const { 
    isLoading, resultData, quizData, activeTab, setActiveTab, 
    history, inputText, selectedLens, addToast, setResult, 
    setLoading, addHistory, setQuiz, setSelectedLens
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
      <header className="bg-kalika-surface border-t-2 border-kalika-green border-b border-kalika-border h-[72px] px-8 flex items-center justify-between sticky top-0 z-40">
        <Link href="/landing" className="flex items-center gap-4 group">
          <LogoMark />
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-kalika-green text-[20px] tracking-wider leading-none">
              KALIKA
            </h1>
            <p className="text-xs text-kalika-muted mt-0.5">
              AI Study Companion · Powered by Gemini 2.5 Flash
            </p>
          </div>
        </Link>
        
        <div className="flex items-center gap-6">
          <p className="hidden md:block text-xs text-kalika-muted font-medium bg-kalika-bg/50 px-3 py-1.5 rounded-full border border-kalika-border">
            Learn through the <span className="text-kalika-green-dim font-bold">cultural lens</span> you choose
          </p>
          <div className="flex items-center gap-2">
            <button className="text-xs font-semibold text-kalika-muted hover:text-kalika-green transition-colors px-4 py-2 rounded-lg border border-transparent hover:border-kalika-border">
              How to use
            </button>
            <button 
              id="btn-history-panel"
              onClick={() => setHistoryOpen(true)}
              className="text-xs font-bold text-kalika-muted hover:text-kalika-green transition-colors px-4 py-2 rounded-lg border border-kalika-border hover:bg-kalika-surface2"
            >
              History {history.length > 0 && `(${history.length})`}
            </button>
          </div>
        </div>
      </header>

      {/* ── PAGE LAYOUT ── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[460px_1fr]">
        
        {/* LEFT COLUMN: Input */}
        <aside className="bg-kalika-surface border-r border-kalika-border p-8 flex flex-col gap-8 relative z-10 custom-scrollbar overflow-y-auto">
          
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold tracking-wider text-kalika-muted uppercase">
              Material to Study
            </h2>
            <InputField />
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <h2 className="text-sm font-semibold tracking-wider text-kalika-muted uppercase mt-2">
              Select Cultural Lens
            </h2>
            <LensSelector />
          </div>

          <div className="mt-8 pt-6 border-t border-kalika-border">
            <button
              id="btn-generate"
              onClick={handleGenerate}
              disabled={isLoading || inputText.length < 50}
              className="w-full bg-kalika-green text-kalika-bg rounded-xl py-5 text-base font-bold font-display tracking-wider hover:bg-green-300 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-kalika-green/10"
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
                className={`flex-1 py-4 px-6 text-sm cursor-pointer text-center flex items-center justify-center gap-2 border-b-2 transition-all duration-200
                  ${activeTab === 'result' 
                    ? 'text-kalika-green border-kalika-green font-semibold' 
                    : 'text-kalika-muted border-transparent font-medium hover:text-kalika-text-secondary'}`}
              >
                📄 Analysis Result
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex-1 py-4 px-6 text-sm cursor-pointer text-center flex items-center justify-center gap-2 border-b-2 transition-all duration-200
                  ${activeTab === 'quiz' 
                    ? 'text-kalika-green border-kalika-green font-semibold' 
                    : 'text-kalika-muted border-transparent font-medium hover:text-kalika-text-secondary'}`}
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
          <div className="p-6 md:p-10 flex-1 overflow-auto relative custom-scrollbar">
            {!resultData && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full min-h-96 gap-8 py-16 px-8 animate-fade-up">
                {/* Large mascot placeholder */}
                <div className="w-32 h-32 relative opacity-80">
                  <Image 
                    src="/images/bagong.png"
                    alt="Bagong waiting"
                    width={128}
                    height={128}
                    className="object-contain drop-shadow-2xl"
                  />
                </div>

                <div className="text-center max-w-sm">
                  <h3 className="font-display font-bold text-xl text-kalika-text mb-3">
                    Ready when you are
                  </h3>
                  <p className="text-kalika-text-secondary text-base leading-relaxed">
                    Paste your study material on the left, choose a cultural lens, 
                    and click Generate Analysis to begin.
                  </p>
                </div>

                {/* Quick lens suggestions */}
                <div className="flex flex-wrap justify-center gap-3">
                  {['🌴 Try Nusantara', '⛩ Try Japanese', '⚡ Try Viking', '🎮 Try Gamer'].map(s => (
                    <button key={s}
                      onClick={() => {
                        const label = s.split('Try ')[1].toLowerCase()
                        const id = LENS_ITEMS.find(l => l.label.toLowerCase() === label)?.id
                        if (id) setSelectedLens(id)
                      }}
                      className="px-5 py-2.5 rounded-full border border-kalika-border2 text-sm text-kalika-text-secondary hover:border-kalika-green-glow hover:text-kalika-green bg-kalika-surface/30 hover:bg-kalika-surface transition-all active:scale-95"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col gap-8 animate-pulse">
                <div className="bg-kalika-surface border border-kalika-border rounded-2xl p-8 mb-4">
                  <div className="h-5 bg-kalika-surface2 rounded-full w-3/4 mb-5" />
                  <div className="h-5 bg-kalika-surface2 rounded-full w-1/2" />
                </div>
                <div className="h-56 bg-kalika-surface border border-kalika-border rounded-2xl" />
              </div>
            )}

            {!isLoading && resultData && activeTab === 'result' && (
              <div className="flex flex-col gap-6">
                <ResultCard 
                  onGenerateQuiz={handleGenerateQuiz} 
                  isGeneratingQuiz={isGeneratingQuiz} 
                />
              </div>
            )}

            {!isLoading && activeTab === 'quiz' && (
              quizData && quizData.length > 0 ? (
                <QuizCard quiz={quizData} lens={selectedLens} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-5 text-kalika-muted py-24 animate-fade-in-up">
                  <div className="text-6xl mb-2">🎮</div>
                  <p className="text-base font-semibold text-kalika-text-secondary">No quiz yet</p>
                  <p className="text-sm text-center max-w-[280px] leading-relaxed">
                    First generate an analysis, then click "Generate Mini Quiz" in the result panel.
                  </p>
                  {resultData && (
                    <button
                      onClick={handleGenerateQuiz}
                      disabled={isGeneratingQuiz}
                      className="mt-6 bg-kalika-green text-kalika-bg px-8 py-3.5 rounded-xl text-base font-bold shadow-lg shadow-kalika-green/10 hover:bg-green-300 transition-all active:scale-95 disabled:opacity-50"
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
