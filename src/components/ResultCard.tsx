'use client'

import { useState } from 'react'
import { useKalikaStore } from '@/store/useKalikaStore'
import AudioPlayer from './AudioPlayer'

interface ResultCardProps {
  onGenerateQuiz: () => void
  isGeneratingQuiz: boolean
}

export default function ResultCard({ onGenerateQuiz, isGeneratingQuiz }: ResultCardProps) {
  const { resultData: result, selectedLens } = useKalikaStore()
  const [ttsText, setTtsText] = useState<string | null>(null)
  const [showPlayer, setShowPlayer] = useState(false)

  if (!result) return null

  const handleListen = (text: string) => {
    setTtsText(text)
    setShowPlayer(true)
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up pb-20">
      {/* 1. DYSLEXIA FRIENDLY TEXT */}
      <section className="bg-kalika-surface border border-kalika-border rounded-2xl overflow-hidden shadow-lg">
        <div className="bg-kalika-surface2 px-6 py-5 border-b border-kalika-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🧠</span>
            <h3 className="text-sm font-bold text-kalika-text uppercase tracking-widest leading-none">
              Simplified Concepts
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleListen(result.dyslexiaFriendlyText)}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-kalika-border text-kalika-muted hover:border-kalika-green-glow hover:text-kalika-green transition-all active:scale-95 flex items-center gap-2 bg-kalika-bg/50"
            >
              <span>🔊</span> Listen
            </button>
            <div className="hidden sm:block text-[10px] bg-kalika-green-glow/20 text-kalika-green px-3 py-1.5 rounded-lg border border-kalika-green-glow/30 font-extrabold tracking-wider">
              DYSLEXIA FRIENDLY
            </div>
          </div>
        </div>
        <div className="p-8 md:p-10">
          <ul className="space-y-4">
            {result.dyslexiaFriendlyText.split('\n').filter(line => line.trim()).map((line, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <span className="mt-2.5 w-2 h-2 rounded-full bg-kalika-green shrink-0 group-hover:scale-125 transition-transform shadow-[0_0_8px_rgba(74,222,128,0.4)]" />
                <p className="text-base md:text-lg leading-[1.8] text-kalika-text-secondary font-medium">
                  {line.replace(/^- /, '')}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. CULTURAL ANALOGY */}
      <section className="bg-kalika-surface border border-kalika-border rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-kalika-surface2 px-6 py-5 border-b border-kalika-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🎭</span>
            <h3 className="text-sm font-bold text-kalika-text uppercase tracking-widest leading-none">
              The {selectedLens.replace('_', ' ').toUpperCase()} Lens
            </h3>
          </div>
          <button 
            onClick={() => handleListen(result.culturalAnalogy)}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-kalika-border text-kalika-muted hover:border-kalika-green-glow hover:text-kalika-green transition-all active:scale-95 flex items-center gap-2 bg-kalika-bg/50"
          >
            <span>🔊</span> Listen
          </button>
        </div>
        <div className="p-8 md:p-10">
          <div className="bg-kalika-surface2 border border-kalika-green-glow/30 p-8 rounded-2xl relative group shadow-inner shadow-black/20">
            <div className="absolute -top-4 -left-4 text-4xl filter drop-shadow-xl group-hover:rotate-12 transition-transform select-none">💡</div>
            <p className="text-base md:text-lg italic text-kalika-text leading-loose whitespace-pre-wrap font-medium">
              {result.culturalAnalogy}
            </p>
          </div>
          
          {/* Exam Boundary Notes */}
          <div className="flex gap-4 items-start bg-yellow-500/[0.04] border border-yellow-500/20 rounded-xl p-6 mt-8 animate-fade-in shadow-sm">
            <span className="text-2xl mt-0.5 filter drop-shadow-sm select-none">🔥</span>
            <div>
              <p className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-1">Exam Boundary Notice</p>
              <p className="text-sm md:text-base text-yellow-200/90 leading-relaxed italic font-medium">
                {result.examBoundary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BILINGUAL GLOSSARY */}
      <section className="bg-kalika-surface border border-kalika-border rounded-2xl overflow-hidden shadow-lg mb-8">
        <div className="bg-kalika-surface2 px-6 py-5 border-b border-kalika-border">
          <div className="flex items-center gap-3">
            <span className="text-xl">📚</span>
            <h3 className="text-sm font-bold text-kalika-text uppercase tracking-widest leading-none">
              Bilingual Glossary
            </h3>
          </div>
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-kalika-bg/50">
                <th className="py-5 px-8 text-xs font-extrabold text-kalika-muted uppercase tracking-[0.2em] border-b border-kalika-border">Academic Term</th>
                <th className="py-5 px-8 text-xs font-extrabold text-kalika-muted uppercase tracking-[0.2em] border-b border-kalika-border">Definition (B1 Level)</th>
                <th className="py-5 px-8 text-xs font-extrabold text-kalika-muted uppercase tracking-[0.2em] border-b border-kalika-border">Local Context</th>
              </tr>
            </thead>
            <tbody>
              {result.bilingualGlossary.map((row, i) => (
                <tr key={i} className="border-b border-kalika-border/30 hover:bg-kalika-surface2/40 transition-colors group">
                  <td className="py-5 px-8 text-base font-bold text-kalika-green whitespace-nowrap">
                    <span className="group-hover:translate-x-1 transition-transform inline-block">{row.term}</span>
                  </td>
                  <td className="py-5 px-8 text-sm md:text-base text-kalika-text-secondary leading-relaxed font-medium">
                    {row.englishB1}
                  </td>
                  <td className="py-5 px-8 text-sm md:text-base text-kalika-text-secondary italic font-medium leading-relaxed opacity-80">
                    {row.localContext}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. GENERATE QUIZ CTA */}
      <div className="mt-4 mb-10 flex flex-col items-center gap-6 p-10 border-2 border-dashed border-kalika-border rounded-3xl bg-kalika-surface/30 backdrop-blur-sm group hover:border-kalika-green-glow transition-all duration-300">
        <div className="text-center max-w-sm">
          <h4 className="text-xl font-bold font-display text-kalika-text mb-2 transition-colors group-hover:text-kalika-green">Mastered the material?</h4>
          <p className="text-base text-kalika-muted leading-relaxed">Test your core concept understanding with a context-aware mini quiz.</p>
        </div>
        <button
          onClick={onGenerateQuiz}
          disabled={isGeneratingQuiz}
          className="bg-kalika-green text-kalika-bg px-12 py-5 rounded-2xl text-lg font-bold shadow-2xl shadow-kalika-green/20 hover:bg-green-300 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-4 group/btn"
        >
          {isGeneratingQuiz ? (
            <>
              <div className="w-5 h-5 border-3 border-kalika-bg border-t-transparent rounded-full animate-spin" />
              <span>GENERATING...</span>
            </>
          ) : (
            <>
              <span className="text-2xl group-hover/btn:rotate-12 transition-transform">🎮</span> 
              <span>GENERATE MINI QUIZ</span>
            </>
          )}
        </button>
      </div>

      {/* MULTILINGUAL AUDIO PLAYER OVERLAY (STICKY) */}
      {showPlayer && ttsText && (
        <div className="fixed bottom-0 left-0 right-0 p-4 md:p-0 md:bg-transparent z-50 animate-fade-in-up">
          <div className="w-full md:max-w-md md:ml-auto md:mr-8 md:mb-8 bg-kalika-surface2 border-2 border-kalika-border rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] px-7 py-6 group backdrop-blur-xl">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-kalika-green animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                <span className="text-[10px] text-kalika-muted uppercase tracking-[0.25em] font-extrabold">
                  KALIKA : Audio Scholar
                </span>
              </div>
              <button 
                onClick={() => {
                  setShowPlayer(false)
                  window.speechSynthesis.cancel()
                }}
                className="w-8 h-8 rounded-full border border-kalika-border flex items-center justify-center text-kalika-muted hover:text-red-400 hover:border-red-500/30 transition-all active:scale-90"
              >
                ✕
              </button>
            </div>
            <AudioPlayer textToRead={ttsText} />
            
            <p className="mt-5 text-[9px] text-center text-kalika-muted italic leading-tight px-4 opacity-60 group-hover:opacity-100 transition-opacity">
              Note: You can swap languages and speed in settings above. Highlighted text follows the voice.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
