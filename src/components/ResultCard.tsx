'use client'

import { useState } from 'react'
import { useKalikaStore } from '@/store/useKalikaStore'
import AudioPlayer from './AudioPlayer'

interface ResultCardProps {
  onGenerateQuiz: () => void
  isGeneratingQuiz: boolean
}

export default function ResultCard({ onGenerateQuiz, isGeneratingQuiz }: ResultCardProps) {
  const { resultData: result } = useKalikaStore()
  const [ttsText, setTtsText] = useState<string | null>(null)
  const [showPlayer, setShowPlayer] = useState(false)

  if (!result) return null

  const handleListen = (text: string) => {
    setTtsText(text)
    setShowPlayer(true)
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in-up">
      
      {/* 1. Dyslexia Friendly Text */}
      <div className="bg-kalika-surface border border-kalika-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between border-b border-kalika-border bg-kalika-surface2">
          <h3 className="text-xs font-semibold text-kalika-text-secondary flex items-center gap-2 tracking-wide uppercase">
            <span className="text-kalika-green-dim">▸</span> Structural Breakdown
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={() => handleListen(result.dyslexiaFriendlyText)}
              className="px-3 py-1 rounded-full text-[10px] font-medium border border-kalika-border text-kalika-muted hover:border-kalika-green-glow hover:text-kalika-green transition-colors flex items-center gap-1"
            >
              <span>🔊</span> Listen
            </button>
            <button 
              onClick={() => navigator.clipboard.writeText(result.dyslexiaFriendlyText)} 
              className="px-3 py-1 rounded-full text-[10px] font-medium border border-kalika-border text-kalika-muted hover:border-kalika-green-glow hover:text-kalika-green transition-colors"
            >
              Copy
            </button>
          </div>
        </div>
        <div className="p-5 overflow-hidden">
           <ul className="space-y-1.5">
            {result.dyslexiaFriendlyText.split('\n').filter(Boolean).map((line, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-kalika-text leading-relaxed before:content-['▸'] before:text-kalika-green-dim before:text-[10px] before:mt-1 before:flex-shrink-0">
                <span dangerouslySetInnerHTML={{ __html: line.replace(/^- /, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-kalika-green font-semibold">$1</strong>') }} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. Cultural Analogy */}
      <div className="bg-kalika-surface border border-kalika-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between border-b border-kalika-border bg-kalika-surface2">
          <h3 className="text-xs font-semibold text-kalika-text-secondary flex items-center gap-2 tracking-wide uppercase">
            <span className="text-kalika-green-dim">🎭</span> The Cultural Analogy
          </h3>
          <button 
            onClick={() => handleListen(result.culturalAnalogy)}
            className="px-3 py-1 rounded-full text-[10px] font-medium border border-kalika-border text-kalika-muted hover:border-kalika-green-glow hover:text-kalika-green transition-colors flex items-center gap-1"
          >
            <span>🔊</span> Listen
          </button>
        </div>
        <div className="p-5 flex flex-col gap-3">
          <div className="bg-kalika-green-subtle border border-kalika-green-glow rounded-lg p-3.5 relative">
            <span className="text-3xl text-kalika-green leading-none mb-1 block">"</span>
            <p className="text-xs text-kalika-green-text leading-[1.75] font-medium z-10 relative">
              {result.culturalAnalogy}
            </p>
          </div>
          
          <div className="flex gap-2.5 items-start bg-yellow-500/[0.06] border border-yellow-500/25 rounded-lg p-3 mt-2">
            <span className="text-yellow-400 text-sm mt-0.5 flex-shrink-0">⚠️</span>
            <p className="text-[11px] text-yellow-300/80 leading-relaxed italic">
              <strong>Exam boundary:</strong> {result.examBoundary}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Bilingual Glossary */}
      <div className="bg-kalika-surface border border-kalika-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between border-b border-kalika-border bg-kalika-surface2">
          <h3 className="text-xs font-semibold text-kalika-text-secondary flex items-center gap-2 tracking-wide uppercase">
            <span className="text-kalika-green-dim">📚</span> Bilingual Glossary
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr>
                <th className="text-left text-kalika-muted font-medium py-1.5 px-3 border-b border-kalika-border tracking-widest text-[10px] uppercase">Term</th>
                <th className="text-left text-kalika-muted font-medium py-1.5 px-3 border-b border-kalika-border tracking-widest text-[10px] uppercase">English (B1)</th>
                <th className="text-left text-kalika-muted font-medium py-1.5 px-3 border-b border-kalika-border tracking-widest text-[10px] uppercase">Local Context</th>
              </tr>
            </thead>
            <tbody>
              {result.bilingualGlossary.map((item, i) => (
                <tr key={i} className={`group ${i % 2 === 0 ? 'bg-kalika-bg/50' : 'bg-kalika-green/[0.03]'}`}>
                  <td className={`py-2 px-3 border-kalika-border ${i !== result.bilingualGlossary.length -1 ? 'border-b' : ''}`}>
                    <span className="bg-kalika-green-subtle text-kalika-green px-2 py-0.5 rounded-full font-semibold text-[10px] whitespace-nowrap">
                      {item.term}
                    </span>
                  </td>
                  <td className={`py-2 px-3 text-kalika-text-secondary border-kalika-border ${i !== result.bilingualGlossary.length -1 ? 'border-b' : ''}`}>
                    {item.englishB1}
                  </td>
                  <td className={`py-2 px-3 text-kalika-text-secondary border-kalika-border leading-relaxed ${i !== result.bilingualGlossary.length -1 ? 'border-b' : ''}`}>
                    {item.localContext}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Generate Quiz Button */}
      <div className="mt-4 pt-4 border-t border-kalika-border">
        <button
          onClick={onGenerateQuiz}
          disabled={isGeneratingQuiz}
          className="w-full bg-kalika-green-subtle border border-kalika-green-glow text-kalika-green rounded-xl py-3.5 text-sm font-semibold font-display tracking-wide flex items-center justify-center gap-2 hover:bg-kalika-green hover:text-kalika-bg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 active:scale-[0.98]"
        >
          {isGeneratingQuiz ? (
            <>
              <span className="animate-spin">⟳</span>
              Generating quiz...
            </>
          ) : (
            <>
              🎮 Generate Mini Quiz from This Material
            </>
          )}
        </button>
      </div>

      {/* Persistent Audio Player Overlay */}
      {showPlayer && ttsText && (
        <div className="sticky bottom-0 bg-kalika-surface2 border-t border-kalika-border px-5 py-3 -mx-6 md:-mx-8 z-30 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] animate-fade-in-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-kalika-muted uppercase tracking-wider font-bold">
              Now reading your material...
            </span>
            <button 
              onClick={() => setShowPlayer(false)}
              className="text-kalika-muted hover:text-kalika-text text-lg leading-none"
            >
              ✕
            </button>
          </div>
          <AudioPlayer textToRead={ttsText} />
        </div>
      )}

    </div>
  )
}
