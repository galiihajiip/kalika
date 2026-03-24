export type LensType =
  // Southeast Asia
  | 'nusantara'
  | 'malay'
  | 'filipino'
  | 'thai'
  | 'vietnamese'
  | 'burmese'

  // East Asia
  | 'chinese'
  | 'japanese'
  | 'korean'
  | 'taiwanese'
  | 'mongolian'

  // South Asia
  | 'indian_hindi'
  | 'indian_tamil'
  | 'bengali'
  | 'nepali'
  | 'sinhala'

  // Middle East & Islamic World
  | 'islamic_arabic'
  | 'islamic_persian'
  | 'islamic_turkish'
  | 'islamic_malay'
  | 'bedouin'

  // Africa
  | 'west_african'
  | 'east_african'
  | 'north_african'
  | 'south_african'
  | 'ethiopian'

  // Europe
  | 'western'
  | 'nordic'
  | 'mediterranean'
  | 'greek_classical'
  | 'slavic'
  | 'celtic'

  // Americas
  | 'latin_american'
  | 'mexican'
  | 'andean'
  | 'native_american'
  | 'caribbean'
  | 'north_american'

  // Ancient Civilizations (Timeless)
  | 'ancient_egyptian'
  | 'mesopotamian'
  | 'roman'
  | 'aztec_maya'
  | 'viking'
  | 'hindu_vedic'

  // Special / Cross-cultural
  | 'gamer'
  | 'internet'
  | 'sports_universal'
  | 'scientific'
  | 'musical'

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
  lens: LensType | string // Added string fallback to avoid breaking past history (e.g. old 'islamic')
  result: ResultData
  timestamp: number
}

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}
