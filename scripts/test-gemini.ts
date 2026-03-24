import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string })

async function main() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'hi',
      config: {
        systemInstruction: 'you are kalika',
        responseMimeType: 'application/json',
      },
    })
    console.log('SUCCESS:', response.text())
  } catch (err: any) {
    console.error('ERROR OBJECT:', err)
  }
}
main()
