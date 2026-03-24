import { NextResponse } from 'next/server'
import { callGemini } from '@/lib/gemini'
import { getMultimodalExtractionPrompt } from '@/lib/prompts'

// Daftar MIME yang didukung
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

// Maksimal ukuran ~6MB
const MAX_FILE_SIZE = 6 * 1024 * 1024

export async function POST(request: Request) {
  try {
    // Membaca input dari FormData yang dikirim oleh InputField
    let file: File | null = null
    let type: string | null = null

    try {
      const formData = await request.formData()
      file = formData.get('file') as File
      type = formData.get('type') as string // 'image' | 'audio'
    } catch (e) {
      return NextResponse.json({ error: 'Gagal membaca FormData.' }, { status: 400 })
    }

    if (!file) {
      return NextResponse.json({ error: 'Tidak ada file yang dilampirkan.' }, { status: 400 })
    }

    const mimeType = file.type
    const fileSize = file.size

    // Validasi tipe file
    if (!ALLOWED_MIME.includes(mimeType)) {
      return NextResponse.json(
        { error: 'Format file tidak didukung.' },
        { status: 415 }
      )
    }

    // Validasi ukuran
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Ukuran file terlalu besar. Maksimal 6MB.' },
        { status: 413 }
      )
    }

    // Mengonversi File Node.js (Buffer/ArrayBuffer) menjadi Base64 string
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileBase64 = buffer.toString('base64')

    // Panggil Gemini (tanpa JSON prompt, cukup instruksi deterministik extract murni teks)
    const systemInstruction = ""
    const userPrompt = getMultimodalExtractionPrompt()

    const extractedText = await callGemini({
      userPrompt: userPrompt,
      systemInstruction: systemInstruction,
      temperature: 0.1, // deterministik, sedekat mungkin ke materi asli tanpa ditambah-tambah narasi halusinasi
      responseAsJson: false,
      includeMedia: {
        data: fileBase64,
        mimeType: mimeType,
      },
    })

    if (!extractedText || extractedText.trim() === '') {
      throw new Error('AI tidak berhasil menemukan atau mentranskripsikan teks apapun dari file tersebut.')
    }

    // Return Output Sukses
    return NextResponse.json({ success: true, extractedText: extractedText.trim() }, { status: 200 })

  } catch (error: any) {
    console.error('[Process-Multimodal] Error:', error)

    const errorMessage = error instanceof Error ? error.message : String(error)

    if (errorMessage.includes('429')) {
      return NextResponse.json(
        { error: 'Terlalu banyak permintaan AI. Kuota habis. Coba lagi nanti.' },
        { status: 429 }
      )
    }

    if (errorMessage.includes('tidak berhasil menemukan')) {
      return NextResponse.json(
        { error: errorMessage },
        { status: 422 }
      )
    }

    return NextResponse.json(
      { error: 'Gagal mengekstrak konten multimodal karena kendala server.' },
      { status: 500 }
    )
  }
}
