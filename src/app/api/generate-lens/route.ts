import { NextResponse } from 'next/server'
import { callGemini } from '@/lib/gemini'
import { getLensSystemPrompt } from '@/lib/prompts'
import type { LensType, ResultData } from '@/types'

const ALLOWED_LENSES = ['nusantara', 'western', 'islamic', 'chinese']

export async function POST(request: Request) {
  try {
    // 1. Parsing Body
    let body: { text?: string; lens?: string }
    try {
      body = await request.json()
    } catch (e) {
      return NextResponse.json({ error: 'Body request JSON tidak valid.' }, { status: 400 })
    }

    const { text, lens } = body

    // Validasi Input
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Teks materi tidak valid atau kosong.' }, { status: 400 })
    }
    const charCount = text.length
    if (charCount < 50) {
      return NextResponse.json({ error: 'Teks terlalu singkat, minimal 50 karakter.' }, { status: 400 })
    }
    if (charCount > 5000) {
      return NextResponse.json({ error: 'Teks terlalu panjang, maksimal 5000 karakter.' }, { status: 400 })
    }

    if (!lens || !ALLOWED_LENSES.includes(lens)) {
      return NextResponse.json(
        { error: 'Lensa budaya tidak valid. Pilih antara nusantara, western, islamic, atau chinese.' },
        { status: 400 }
      )
    }

    const targetLens = lens as LensType

    // 2. Panggil Gemini
    const systemInstruction = getLensSystemPrompt(targetLens)
    const userPrompt = `Materi yang perlu disederhanakan:\n\n${text}`

    const responseString = await callGemini({
      userPrompt,
      systemInstruction,
      temperature: 0.3,
      responseAsJson: true,
    })

    // 3. Parsing dan Validasi Struktur Hasil
    let resultData: ResultData
    try {
      resultData = JSON.parse(responseString) as ResultData

      // Validasi properti wajib ada pada JSON
      if (
        typeof resultData.dyslexiaFriendlyText !== 'string' ||
        typeof resultData.culturalAnalogy !== 'string' ||
        typeof resultData.examBoundary !== 'string' ||
        !Array.isArray(resultData.bilingualGlossary)
      ) {
        throw new Error('Properti yang dibutuhkan hilang.')
      }

    } catch (parseError) {
      // Jika hasil JSON berantakan gara-gara model atau parsing rusak
      console.error('[Generate-Lens] Invalid completion JSON:', parseError, responseString)
      return NextResponse.json(
        { error: 'AI mengembalikan format yang tidak dikenali.' },
        { status: 500 }
      )
    }

    // 4. Return Output Sukses
    return NextResponse.json({ success: true, data: resultData }, { status: 200 })

  } catch (error: any) {
    // 5. Tangkap semua Error yang bertebaran
    console.error('[Generate-Lens] Error:', error)

    const errorMessage = error instanceof Error ? error.message : String(error)

    if (errorMessage.includes('429')) {
      return NextResponse.json(
        { error: 'Terlalu banyak permintaan (Quota Habis atau Rate Limit). Silakan coba lagi nanti.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server AI.' },
      { status: 500 }
    )
  }
}
