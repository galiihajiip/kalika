'use client'

import { useKalikaStore } from '@/store/useKalikaStore'

export default function QuizCard() {
  const { quizData: quiz, selectedLens } = useKalikaStore()
  if (!quiz) return null

  return (
    <div className="p-5 flex flex-col h-full bg-kalika-surface border border-kalika-border rounded-xl">
       <div className="flex items-center justify-between mb-8 pb-3 border-b border-kalika-border">
          <h3 className="font-display font-semibold text-sm text-kalika-text-secondary tracking-wide uppercase">
            Mini <span className="text-kalika-green">Quiz</span>
          </h3>
          <span className="text-xs font-semibold px-2 py-1 rounded bg-kalika-green-subtle text-kalika-green border border-kalika-green-glow">
            Active
          </span>
       </div>
       <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-6xl text-kalika-muted animate-pulse">🎮</span>
          <p className="font-medium text-sm text-kalika-text-secondary max-w-[280px] leading-relaxed">
             Test your understanding with a cultural quiz tailored to the <span className="text-kalika-green">{selectedLens}</span> logic.
          </p>
          <button className="mt-4 bg-kalika-green hover:bg-green-300 text-kalika-bg font-bold font-display px-6 py-2.5 rounded-lg text-sm shadow-[0_4px_16px_rgba(74,222,128,0.2)] transition-all active:scale-95">
             Start Quiz
          </button>
       </div>
    </div>
  )
}
