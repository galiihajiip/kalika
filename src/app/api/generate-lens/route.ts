import { NextResponse } from 'next/server'
import { callGemini } from '@/lib/gemini'
import { getLensSystemPrompt } from '@/lib/prompts'
import type { LensType, ResultData } from '@/types'

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

    if (!lens) {
      return NextResponse.json(
        { error: 'Invalid cultural lens.' },
        { status: 400 }
      )
    }

    const targetLens = lens as LensType

    // 2. Call Gemini
    const systemInstruction = getLensSystemPrompt(targetLens)
    const userPrompt = `Material to be simplified:\n\n${text}`

    const responseString = await callGemini({
      userPrompt,
      systemInstruction,
      temperature: 0.3,
      responseAsJson: true,
    })

    // 3. Parse and Validate Result Structure
    let resultData: ResultData
    try {
      resultData = JSON.parse(responseString) as ResultData

      // Validate required properties in JSON
      if (
        typeof resultData.dyslexiaFriendlyText !== 'string' ||
        typeof resultData.culturalAnalogy !== 'string' ||
        typeof resultData.examBoundary !== 'string' ||
        !Array.isArray(resultData.bilingualGlossary)
      ) {
        throw new Error('Required properties are missing.')
      }

    } catch (parseError) {
      // If JSON result is messed up due to model or parsing fail
      console.error('[Generate-Lens] Invalid completion JSON:', parseError, responseString)
      return NextResponse.json(
        { error: 'AI returned an unrecognized format.' },
        { status: 500 }
      )
    }

    // 4. Return Success Output
    return NextResponse.json({ success: true, data: resultData }, { status: 200 })

  } catch (error: any) {
    // 5. Catch all scattered Errors
    console.error('[Generate-Lens] Error:', error)

    const errorMessage = error instanceof Error ? error.message : String(error)

    if (errorMessage.includes('429')) {
      return NextResponse.json(
        { error: 'Too many requests (Quota Exceeded or Rate Limited). Please try again later.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'An error occurred on the AI server: ' + errorMessage },
      { status: 500 }
    )
  }
}
