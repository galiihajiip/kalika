import { GoogleGenAI } from '@google/genai'

// Inisialisasi Singleton Instance
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string })

// Interfaces
interface MediaData {
  data: string
  mimeType: string
}

interface CallGeminiParams {
  userPrompt: string
  systemInstruction: string
  temperature?: number
  responseAsJson?: boolean
  includeMedia?: MediaData
}

// Helper: Tunggu N milidetik
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Panggil Gemini dengan fitur otomatis retry dan JSON validation.
 */
export async function callGemini({
  userPrompt,
  systemInstruction,
  temperature = 0.3,
  responseAsJson = true,
  includeMedia,
}: CallGeminiParams): Promise<string> {
  const MAX_RETRIES = 3

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // 1. Susun payload content
      const contents: any[] = []
      
      // Jika ada media, sisipkan sebagai inlineData (base64) dulu
      if (includeMedia) {
        contents.push({
          inlineData: {
            data: includeMedia.data,
            mimeType: includeMedia.mimeType,
          },
        })
      }
      
      // Sisipkan teks user prompt
      contents.push(userPrompt)

      // 2. Kirim request ke model Gemini 2.5 Flash
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: temperature,
          responseMimeType: responseAsJson ? 'application/json' : 'text/plain',
        },
      })

      const responseText = response.text()
      if (!responseText) {
        throw new Error('Response kosong dari Gemini.')
      }

      // 3. Jika ekspektasinya JSON, pastikan bisa di-parse
      // lalu re-stringify agar formatnya konsisten dan valid
      if (responseAsJson) {
        try {
          // Bersihkan potensi karakter tak valid dari API sebelum JSON.parse
          // Kadang API me-return dalam format markdown block: ```json ... ```
          let cleanJson = responseText.trim()
          if (cleanJson.startsWith('```json')) {
            cleanJson = cleanJson.replace(/^```json/, '').replace(/```$/, '').trim()
          } else if (cleanJson.startsWith('```')) {
            cleanJson = cleanJson.replace(/^```/, '').replace(/```$/, '').trim()
          }

          const parsed = JSON.parse(cleanJson)
          return JSON.stringify(parsed)
        } catch (err) {
          throw new Error('Gagal mem-parsing output JSON dari Gemini: ' + responseText)
        }
      }

      // 4. Jika teks biasa, langsung return
      return responseText.trim()
    } catch (error: any) {
      const isRetryableError =
        error.message?.includes('429') ||
        error.message?.includes('503') ||
        error.status === 429 ||
        error.status === 503

      // Jika error 429 / 503 dan masih punya sisa retry, tunggu & ulangi
      if (isRetryableError && attempt < MAX_RETRIES) {
        const waitTime = Math.pow(2, attempt) * 1000 // 2s, 4s
        console.warn(`[Gemini] Error ${error.status || '429/503'}. Mencoba ulang ${attempt}/${MAX_RETRIES} dalam ${waitTime}ms...`)
        await delay(waitTime)
        continue
      }

      // Jika sudah max retry atau error lain layaknya 400 Bad Request, Exception, dll.
      console.error('[Gemini] Gagal memanggil model:', error?.message || error)
      throw new Error(
        error?.message || 'Gagal tersambung ke layanan Gemini AI. Coba lagi beberapa saat.'
      )
    }
  }

  throw new Error('Terjadi kesalahan tak terduga saat memanggil Gemini.')
}
