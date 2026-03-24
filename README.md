# KALIKA: AI Study Companion

KALIKA is an AI-powered EdTech study companion that simplifies complex academic materials using culturally-aware analogies and dyslexia-friendly formatting, powered by Google Gemini 2.5 Flash SDK.

## Key Features
- **Cultural Lenses**: Choose from Nusantara, Western, Islamic, or Chinese analogies to learn in a style that suits you.
- **Dyslexia-Friendly Interface**: Material breaks down with short sentences, bolded keywords, and auto-Text-to-Speech tracking highlight.
- **Multimodal Inputs**: Takes image OCR uploads and audio recordings, parsing direct to insights via Gemini. 
- **Adaptive Mini Quizzes**: Check your retention dynamically matched to the exact study topic.

## Core Tech Stack
- **Framework**: Next.js 15 App Router
- **Styling**: Tailwind CSS + Custom PostCSS properties
- **AI Engine**: `@google/genai` (Gemini Flash Model)
- **State Management**: `zustand` (Persist middleware for LocalStorage History)

## Getting Started

1. Clone this repository
2. Run \`npm install\`
3. Create a \`.env.local\` file in your root folder and paste your API Key:
   \`\`\`env
   GEMINI_API_KEY=YOUR_API_KEY_HERE
   \`\`\`
4. Run \`npm run dev\`
5. Open \`http://localhost:3000\`

## Author
Built by Galih Aji Pangestu
