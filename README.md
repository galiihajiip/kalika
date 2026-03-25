# KALIKA : The Culturally-Aware AI Study Companion 🦉🌍

**KALIKA** is a production-grade AI EdTech application designed to empower neurodivergent minds and global scholars through the power of **multilingual GenAI**. By translating complex academic concepts into resonant **cultural analogies**, KALIKA makes learning intuitive, accessible, and deeply personal.

Built for the **GDG UTSC AI Case Competition 2026**, KALIKA bridges the gap between dense academic text and the diverse cultural backgrounds of modern students.

---

## 🏆 Competition Context
- **Event**: GDG UTSC AI Case Competition 2026
- **Organizer**: Google Developer Groups (GDG) University of Toronto Scarborough
- **Mission**: Leveraging Google Gemini to create impactful solutions for accessibility and global education.

---

## ✨ Key Features

### 1. 🌍 50+ Cultural Lenses (AI-LANG)
Experience learning through the lens of your own heritage. From **Indigenous wisdom** and **South Asian traditions** to **Modern Pop Culture** and **K-Drama**, KALIKA transforms theories into analogies that "stick."
- **Dynamic Language Detection**: KALIKA automatically matches your input language while maintaining the structural fidelity of your chosen culture.

### 2. 🧠 Dyslexia-Friendly Architecture
Designed with neurodiversity at its core:
- **Simplified Syntax**: Explanations are broken down into short, punchy sentences (max 15 words).
- **Visual Hierarchy**: Automatic bolding of key academic terms.
- **Audio Scholar**: Integrated Text-to-Speech (TTS) engine with real-time word highlighting for synchronized reading and listening.

### 3. 📸 Multimodal Intelligence
Don't waste time transcribing:
- **OCR Engine**: Extract text from lecture slides or grainy photos.
- **Voice Transcription**: Capture tutor explanations or lecture snippets directly via audio recording.
- **Automated Structuring**: Raw input is cleaned and structured by Gemini before analysis.

### 4. 🎮 Strategic Mini-Quizzes
Test your retention with AI-generated 3-question quizzes that weave academic concepts into your selected cultural narrative.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **AI Core**: [Google Gemini 2.5 Flash](https://deepmind.google/technologies/gemini/) (Multimodal SDK)
- **Styling**: Tailwind CSS v4 + PostCSS Glassmorphism
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with LocalStorage persist for history)
- **Typography**: Sora (Display) & Inter (Body)
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- A Google Gemini API Key ([Get one here](https://aistudio.google.com/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/galiihajiip/kalika.git
   cd kalika
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Access the App**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Meet the Developers

Proudly developed by the team from **UPN Veteran East Java, Indonesia**:

| Developer | Role | GitHub |
|-----------|------|--------|
| **Galih Aji Pangestu** | Lead Developer / AI Integration | [@galiihajiip](https://github.com/galiihajiip) |
| **Muhammad Ananda Hariadi** | Backend / Multimodal Pipeline | [@anandahariadi](https://github.com/anandahariadi) |
| **Fachri Ahmad Fabian** | UI/UX / Design Systems | [@facboiii](https://www.instagram.com/facboiii) |

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

*Built with ❤️ for the world's diverse learners.*
