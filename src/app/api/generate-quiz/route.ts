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
    const systemInstruction = getQuizSystemPrompt(targetLens)
    const userPrompt = `Buatlah kuis pilihan ganda dari materi ini:\n\n${text}`

    const responseString = await callGemini({
      userPrompt,
      systemInstruction,
      temperature: 0.3,
      responseAsJson: true,
    })

    // 3. Parsing dan Validasi Struktur Hasil
    let quizData: QuizItem[]
    try {
      quizData = JSON.parse(responseString) as QuizItem[]

      // Pastikan output adalah Array
      if (!Array.isArray(quizData)) {
        throw new Error('Format root harus berupa Array.')
      }

      // Pastikan ada 3 soal (meski AI bisa saja salah menghitung, minimal kita cek stuktur per item)
      if (quizData.length < 1) {
        throw new Error('Kuis gagal dibuat. Array kosong.')
      }

      // Validasi tiap soal
      quizData.forEach((item, index) => {
        if (!item.question || typeof item.question !== 'string') {
          throw new Error(`Soal #${index + 1} tidak memiliki pertanyaan yang valid.`)
        }
        if (!Array.isArray(item.options) || item.options.length !== 4) {
          throw new Error(`Soal #${index + 1} tidak memiliki 4 opsi jawaban.`)
        }
        if (!['A', 'B', 'C', 'D'].includes(item.correctAnswer)) {
          throw new Error(`Kunci jawaban soal #${index + 1} salah format.`)
        }
        if (!item.culturalExplanation || typeof item.culturalExplanation !== 'string') {
          throw new Error(`Soal #${index + 1} tidak memiliki penjelasan budaya.`)
        }
      })

    } catch (parseError) {
      console.error('[Generate-Quiz] Invalid completion JSON:', parseError, responseString)
      return NextResponse.json(
        { error: 'AI mengembalikan format kuis yang tidak valid.' },
        { status: 500 }
      )
    }

    // 4. Return Output Sukses
    return NextResponse.json({ success: true, data: quizData }, { status: 200 })

  } catch (error: any) {
    // 5. Tangkap semua Error Service
    console.error('[Generate-Quiz] Error:', error)

    const errorMessage = error instanceof Error ? error.message : String(error)

    if (errorMessage.includes('429')) {
      return NextResponse.json(
        { error: 'Terlalu banyak permintaan (Quota Habis atau Rate Limit). Silakan coba lagi nanti.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server AI saat membuat kuis.' },
      { status: 500 }
    )
  }
}
