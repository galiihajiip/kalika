import { NextResponse } from 'next/server'
import { callGemini } from '@/lib/gemini'
import { getMultimodalExtractionPrompt } from '@/lib/prompts'

// Supported MIME list
const ALLOWED_MIME = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/ogg',
  'audio/webm',
  'audio/x-wav',
]

// Max size ~6MB
const MAX_FILE_SIZE = 6 * 1024 * 1024

export async function POST(request: Request) {
  try {
    // Read input from FormData sent by InputField
    let file: File | null = null
    let type: string | null = null

    try {
      const formData = await request.formData()
      file = formData.get('file') as File
      type = formData.get('type') as string // 'image' | 'audio'
    } catch (e) {
      return NextResponse.json({ error: 'Failed to read FormData.' }, { status: 400 })
    }

    if (!file) {
      return NextResponse.json({ error: 'No file attached.' }, { status: 400 })
    }

    const mimeType = file.type
    const fileSize = file.size

    // File type validation
    if (!ALLOWED_MIME.includes(mimeType)) {
      return NextResponse.json(
        { error: 'Unsupported file format.' },
        { status: 415 }
      )
    }

    // Size validation
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size too large. Maximum is 6MB.' },
        { status: 413 }
      )
    }

    // Convert Node.js File (Buffer/ArrayBuffer) to Base64 string
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileBase64 = buffer.toString('base64')

    // Call Gemini (without JSON prompt, just deterministic pure text extract instruction)
    const systemInstruction = ""
    const userPrompt = getMultimodalExtractionPrompt()

    const extractedText = await callGemini({
      userPrompt: userPrompt,
      systemInstruction: systemInstruction,
      temperature: 0.1, // deterministic, as close to original material without added hallucinated narrative
      responseAsJson: false,
      includeMedia: {
        data: fileBase64,
        mimeType: mimeType,
      },
    })

    if (!extractedText || extractedText.trim() === '') {
      throw new Error('AI could not find or transcribe any text from the file.')
    }

    // Return Success Output
    return NextResponse.json({ success: true, extractedText: extractedText.trim() }, { status: 200 })

  } catch (error: any) {
    console.error('[Process-Multimodal] Error:', error)

    const errorMessage = error instanceof Error ? error.message : String(error)

    if (errorMessage.includes('429')) {
      return NextResponse.json(
        { error: 'Too many AI requests. Quota exceeded. Try again later.' },
        { status: 429 }
      )
    }

    if (errorMessage.includes('could not find')) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 422 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to extract multimodal content due to server constraints.' },
      { status: 500 }
    )
  }
}
