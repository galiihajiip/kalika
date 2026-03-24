'use client'

import { useState } from 'react'
import { useKalikaStore } from '@/store/useKalikaStore'

// Map indeks ke opsi A, B, C, D
const OPTIONS_MAP = ['A', 'B', 'C', 'D'] as const
type OptionLetter = typeof OPTIONS_MAP[number]

export default function QuizCard() {
  const { quizData: quiz, selectedLens: lens, setActiveTab } = useKalikaStore()

  // State lokal untuk game kuis
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<OptionLetter | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  // 1. Jika belum ada kuis
  if (!quiz || quiz.length === 0) return null

  const totalQuestions = quiz.length
  const currentQuestion = quiz[currentIndex]

  // Handler: Saat opsi diklik
  const handleSelectOption = (letter: OptionLetter) => {
    if (isAnswered) return // Cegah klik ganda setelah terjawab

    setSelectedAnswer(letter)
    setIsAnswered(true)

    if (letter === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1)
    }
  }

  // Handler: Lanjut soal atau selesai
  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setIsFinished(true)
    }
  }

  // Handler: Ulangi kuis
  const handleRetry = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setIsAnswered(false)
    setScore(0)
    setIsFinished(false)
  }

  // ─── TAMPILAN: HASIL KUIS (SKOR AKHIR) ────────────────────────────
  if (isFinished) {
    const isPerfect = score === totalQuestions
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in-up bg-[var(--surface-card)] rounded-xl border border-[var(--surface-border)] shadow-sm">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--kalika-primary)] to-[var(--kalika-secondary)] flex items-center justify-center mb-6 shadow-lg shadow-[var(--kalika-primary)]/20 animate-[pulse-glow_3s_infinite]">
          <span className="text-5xl">{isPerfect ? '🏆' : '💪'}</span>
        </div>

        <h2 className="font-[var(--font-sora)] text-2xl font-bold mb-2">
          {score === totalQuestions
            ? 'Sempurna! Nilai kamu: 3/3 🎉'
            : `Nilai kamu: ${score}/${totalQuestions} Coba lagi!`}
        </h2>

        {isPerfect && (
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-6 bg-emerald-100 dark:bg-emerald-900/40 px-4 py-1.5 rounded-full inline-block">
            ✨ Juara Budaya {lens.charAt(0).toUpperCase() + lens.slice(1)}!
          </p>
        )}
        {!isPerfect && (
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Pemahaman akan budaya dan materi butuh konsistensi. Ayo coba analisis materinya kembali!
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-4">
          <button
            onClick={handleRetry}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-[var(--surface-muted)] text-[var(--text-primary)] hover:bg-[var(--surface-border)] transition-colors"
          >
            🔄 Ulangi Kuis
          </button>
          <button
            onClick={() => setActiveTab('result')}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-[var(--kalika-primary)] text-white hover:opacity-90 shadow-md transition-all"
          >
            📖 Materi
          </button>
        </div>
      </div>
    )
  }

  // ─── TAMPILAN: SOAL KUIS ──────────────────────────────────────────

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up w-full">
      {/* 1. Bagian Progress */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
          <span>Soal {currentIndex + 1} dari {totalQuestions}</span>
          <span>Kesulitan: {currentQuestion.difficulty}</span>
        </div>
        <div className="h-2 w-full bg-[var(--surface-muted)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--kalika-primary)] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. Pertanyaan */}
      <div className="flex gap-4 items-start">
        <span className="text-4xl font-[var(--font-sora)] font-bold text-[var(--kalika-primary)]/20 leading-none mt-1">
          {currentIndex + 1}
        </span>
        <h3 className="text-xl md:text-2xl font-[var(--font-sora)] font-bold text-[var(--text-primary)] leading-tight">
          {currentQuestion.question}
        </h3>
      </div>

      {/* 3. Opsi Jawaban */}
      <div className="flex flex-col gap-3 mt-2">
        {currentQuestion.options.map((optionText, idx) => {
          const letter = OPTIONS_MAP[idx]
          const isCorrectAnswer = letter === currentQuestion.correctAnswer
          const isThisSelected = selectedAnswer === letter

          // Kalkulasi gaya (styling) per opsi
          let btnStyle = `bg-[var(--surface-card)] border-[var(--surface-border)] text-[var(--text-secondary)] hover:border-[var(--kalika-primary)] hover:text-[var(--text-primary)]`
          let labelStyle = `bg-[var(--surface-muted)] text-[var(--text-muted)]`
          let icon = ''

          if (isAnswered) {
            if (isCorrectAnswer) {
              // Jawaban selalu hijau kalau benar, baik dipilih atau tidak
              btnStyle = `bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-500`
              labelStyle = `bg-emerald-500 text-white`
              icon = '✓'
            } else if (isThisSelected && !isCorrectAnswer) {
              // Jika dipilih dan salah
              btnStyle = `bg-red-50 dark:bg-red-950/30 border-red-400 text-red-800 dark:text-red-300 opacity-90`
              labelStyle = `bg-red-500 text-white`
              icon = '✗'
            } else {
              // Sisanya dimutekan
              btnStyle = `bg-[var(--surface-card)] border-[var(--surface-border)] text-[var(--text-muted)] opacity-50`
            }
          }

          return (
            <button
              key={letter}
              onClick={() => handleSelectOption(letter)}
              disabled={isAnswered}
              className={`relative flex items-center w-full p-4 rounded-xl border-2 text-left transition-all duration-300 transform ${
                !isAnswered ? 'hover:scale-[1.01] active:scale-[0.99] hover:shadow-sm' : 'cursor-default'
              } ${btnStyle}`}
            >
              <div className="flex items-center gap-4 w-full">
                <span className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${labelStyle}`}>
                  {letter}
                </span>
                <span className="font-semibold text-sm md:text-base pr-8 flex-1 leading-snug">
                  {optionText}
                </span>
                {icon && (
                  <span className={`absolute right-4 text-xl font-black ${isCorrectAnswer ? 'text-emerald-500' : 'text-red-500'}`}>
                    {icon}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* 4. Penjelasan (Muncul setelah dijawab) */}
      {isAnswered && (
        <div className="mt-4 p-5 rounded-xl bg-[var(--surface-muted)] border border-[var(--surface-border)] animate-fade-in-up">
          <h4 className="font-[var(--font-sora)] text-sm font-bold text-[var(--kalika-primary)] mb-2 flex items-center gap-2">
            <span>💡</span> Penjelasan Budaya
          </h4>
          <p className="text-[var(--text-primary)] text-sm leading-relaxed font-medium">
            {currentQuestion.culturalExplanation}
          </p>
        </div>
      )}

      {/* 5. Tombol Lanjut / Selesai */}
      {isAnswered && (
        <div className="mt-2 flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[var(--kalika-primary)] to-[var(--kalika-secondary)] text-white hover:opacity-90 active:scale-[0.98] shadow-md transition-all duration-200"
          >
            {currentIndex < totalQuestions - 1 ? 'Soal Berikutnya →' : 'Lihat Skor Akhir 🏆'}
          </button>
        </div>
      )}
    </div>
  )
}
