import { NextResponse } from 'next/server'
import { callGemini } from '@/lib/gemini'
import { getQuizSystemPrompt } from '@/lib/prompts'
import type { LensType, QuizItem } from '@/types'

const ALLOWED_LENSES = ['nusantara', 'western', 'islamic', 'chinese']

export async function POST(request: Request) {
  try {
    // 1. Parsing Body
    let body: { text?: string; lens?: string }
    try {
      body = await request.json()
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 })
    }

    const { text, lens } = body

    // Validate Input
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Text material is invalid or empty.' }, { status: 400 })
    }
    const charCount = text.length
    if (charCount < 50) {
      return NextResponse.json({ error: 'Text is too short, minimum 50 characters required.' }, { status: 400 })
    }
    if (charCount > 5000) {
      return NextResponse.json({ error: 'Text is too long, maximum 5000 characters allowed.' }, { status: 400 })
    }

    if (!lens || !ALLOWED_LENSES.includes(lens)) {
      return NextResponse.json(
        { error: 'Invalid cultural lens. Choose between nusantara, western, islamic, or chinese.' },
        { status: 400 }
      )
    }

    const targetLens = lens as LensType

    // 2. Call Gemini
    const systemInstruction = getQuizSystemPrompt(targetLens)
    const userPrompt = `Create a multiple-choice quiz from this material:\n\n${text}`

    const responseString = await callGemini({
      userPrompt,
      systemInstruction,
      temperature: 0.3,
      responseAsJson: true,
    })

    // 3. Parse and Validate Result Structure
    let quizData: QuizItem[]
    try {
      quizData = JSON.parse(responseString) as QuizItem[]

      // Ensure output is an Array
      if (!Array.isArray(quizData)) {
        throw new Error('Root format must be an Array.')
      }

      // Ensure there are questions (even if AI miscalculates, at least we check structure per item)
      if (quizData.length < 1) {
        throw new Error('Quiz creation failed. Empty array.')
      }

      // Validate each question
      quizData.forEach((item, index) => {
        if (!item.question || typeof item.question !== 'string') {
          throw new Error(`Question #${index + 1} does not have a valid question string.`)
        }
        if (!Array.isArray(item.options) || item.options.length !== 4) {
          throw new Error(`Question #${index + 1} does not have exactly 4 answer options.`)
        }
        if (!['A', 'B', 'C', 'D'].includes(item.correctAnswer)) {
          throw new Error(`Answer key for question #${index + 1} has an invalid format.`)
        }
        if (!item.culturalExplanation || typeof item.culturalExplanation !== 'string') {
          throw new Error(`Question #${index + 1} does not have a cultural explanation.`)
        }
      })

    } catch (parseError) {
      console.error('[Generate-Quiz] Invalid completion JSON:', parseError, responseString)
      return NextResponse.json(
        { error: 'AI returned an invalid quiz format.' },
        { status: 500 }
      )
    }

    // 4. Return Success Output
    return NextResponse.json({ success: true, data: quizData }, { status: 200 })

  } catch (error: any) {
    // 5. Catch all Service Errors
    console.error('[Generate-Quiz] Error:', error)

    const errorMessage = error instanceof Error ? error.message : String(error)

    if (errorMessage.includes('429')) {
      return NextResponse.json(
        { error: 'Too many requests (Quota Exceeded or Rate Limited). Please try again later.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'An error occurred on the AI server while creating the quiz.' },
      { status: 500 }
    )
  }
}
