export type LensType = 'nusantara' | 'western' | 'islamic' | 'chinese'
export type InputMode = 'text' | 'image' | 'audio'
export type TabType = 'result' | 'quiz'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type CorrectAnswer = 'A' | 'B' | 'C' | 'D'

export interface GlossaryItem {
  term: string
  englishB1: string
  localContext: string
}

export interface ResultData {
  dyslexiaFriendlyText: string
  culturalAnalogy: string
  examBoundary: string
  bilingualGlossary: GlossaryItem[]
}

export interface QuizItem {
  question: string
  options: [string, string, string, string]
  correctAnswer: CorrectAnswer
  culturalExplanation: string
  difficulty: Difficulty
}

export interface HistoryEntry {
  id: string
  inputText: string
  lens: LensType
  result: ResultData
  timestamp: number
}

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}
