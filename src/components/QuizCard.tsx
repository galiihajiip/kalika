'use client'

import { useState } from 'react'
import type { QuizItem, LensType } from '@/types'

interface QuizCardProps {
  quiz: QuizItem[]
  lens: LensType
}

export default function QuizCard({ quiz, lens }: QuizCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showFinished, setShowFinished] = useState(false)

  const currentQuestion = quiz[currentIndex]

  const handleAnswer = (option: string) => {
    if (isAnswered) return
    
    setSelectedAnswer(option)
    setIsAnswered(true)
    
    if (option === currentQuestion.correctAnswer) {
      setScore(s => s + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setShowFinished(true)
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setShowFinished(false)
  }

  if (showFinished) {
    return (
      <div className="bg-kalika-surface border border-kalika-border rounded-xl p-8 flex flex-col items-center justify-center text-center animate-fade-in-up">
        <div className="w-20 h-20 rounded-full bg-kalika-green-subtle border border-kalika-green-glow flex items-center justify-center text-3xl mb-4">
          {score === quiz.length ? '🏆' : '💪'}
        </div>
        <h3 className="font-display text-2xl font-bold text-kalika-green mb-2">Quiz Finished!</h3>
        <p className="text-kalika-text-secondary mb-6">
          You scored <span className="text-kalika-green font-bold">{score}/{quiz.length}</span>
        </p>
        
        {score === quiz.length && (
          <div className="bg-kalika-green-subtle text-kalika-green border border-kalika-green-glow px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest mb-8">
            Culture Master: {lens}
          </div>
        )}

        <div className="flex gap-4 w-full max-w-xs">
          <button 
            onClick={handleReset}
            className="flex-1 bg-kalika-green text-kalika-bg font-bold py-3 rounded-xl hover:bg-green-300 transition-all active:scale-95"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-kalika-muted uppercase tracking-widest">
          Question {currentIndex + 1} of {quiz.length}
        </span>
        <div className="flex h-1.5 w-32 bg-kalika-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-kalika-green transition-all duration-500" 
            style={{ width: `${((currentIndex + 1) / quiz.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-kalika-surface border border-kalika-border rounded-2xl p-6 md:p-8">
        <h4 className="font-display text-lg md:text-xl font-bold text-kalika-text leading-relaxed mb-8">
          {currentQuestion.question}
        </h4>

        <div className="grid grid-cols-1 gap-3">
          {['A', 'B', 'C', 'D'].map((letter, idx) => {
            const optionText = currentQuestion.options[idx]
            const isCorrect = letter === currentQuestion.correctAnswer
            const isSelected = selectedAnswer === letter
            
            let btnClass = 'border-kalika-border bg-kalika-bg hover:border-kalika-green-glow text-kalika-text-secondary'
            if (isAnswered) {
              if (isCorrect) btnClass = 'border-kalika-green bg-kalika-green-subtle text-kalika-green-text'
              else if (isSelected) btnClass = 'border-red-900 bg-red-900/10 text-red-100'
              else btnClass = 'border-kalika-border opacity-40 grayscale'
            }

            return (
              <button
                key={letter}
                onClick={() => handleAnswer(letter)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 ${btnClass}`}
              >
                <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-extrabold shrink-0 border
                  ${isAnswered && isCorrect ? 'bg-kalika-green border-kalika-green text-kalika-bg' : 'border-current'}`}>
                  {isAnswered && isCorrect ? '✓' : letter}
                </span>
                <span className="text-sm font-medium">{optionText}</span>
              </button>
            )
          })}
        </div>
      </div>

      {isAnswered && (
        <div className="bg-kalika-surface2 border border-kalika-border rounded-xl p-5 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2 text-kalika-green font-bold text-xs uppercase tracking-widest">
            <span>🎭</span> Cultural Insight
          </div>
          <p className="text-xs text-kalika-text-secondary leading-relaxed">
            {currentQuestion.culturalExplanation}
          </p>
          
          <button 
            onClick={handleNext}
            className="mt-6 w-full bg-kalika-green text-kalika-bg font-bold py-3 rounded-xl hover:bg-green-300 transition-all flex items-center justify-center gap-2 group"
          >
            {currentIndex < quiz.length - 1 ? 'Next Question' : 'View Final Score'}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      )}
    </div>
  )
}
