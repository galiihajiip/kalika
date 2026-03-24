'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'

const LENSES_ROW_1 = [
  { id: 'nusantara', emoji: '🌴', label: 'Nusantara', region: 'SE Asia' },
  { id: 'japanese', emoji: '⛩️', label: 'Japanese', region: 'East Asia' },
  { id: 'islamic_arabic', emoji: '☪️', label: 'Arabic', region: 'Middle East' },
  { id: 'greek_classical', emoji: '🏛️', label: 'Greek Classical', region: 'Ancient' },
  { id: 'chinese', emoji: '🐉', label: 'Chinese', region: 'East Asia' },
  { id: 'korean', emoji: '🇰🇷', label: 'Korean', region: 'East Asia' },
  { id: 'west_african', emoji: '🌍', label: 'West African', region: 'Africa' },
  { id: 'viking', emoji: '⚡', label: 'Viking', region: 'Ancient Europe' },
  { id: 'gamer', emoji: '🎮', label: 'Gamer', region: 'Special' },
  { id: 'musical', emoji: '🎵', label: 'Musical', region: 'Special' },
  { id: 'islamic_persian', emoji: '🕌', label: 'Persian', region: 'Middle East' },
  { id: 'filipino', emoji: '🌊', label: 'Filipino', region: 'SE Asia' },
  { id: 'nepali', emoji: '🏔️', label: 'Nepali', region: 'South Asia' },
  { id: 'east_african', emoji: '🦁', label: 'East African', region: 'Africa' },
]

const LENSES_ROW_2 = [
  { id: 'mexican', emoji: '🇲🇽', label: 'Mexican', region: 'Americas' },
  { id: 'thai', emoji: '🌺', label: 'Thai', region: 'SE Asia' },
  { id: 'mesopotamian', emoji: '🏺', label: 'Mesopotamian', region: 'Ancient' },
  { id: 'taiwanese', emoji: '🌸', label: 'Taiwanese', region: 'East Asia' },
  { id: 'mediterranean', emoji: '🎭', label: 'Mediterranean', region: 'Europe' },
  { id: 'native_american', emoji: '🏹', label: 'Native American', region: 'Americas' },
  { id: 'hindu_vedic', emoji: '☯️', label: 'Vedic', region: 'South Asia' },
  { id: 'bengali', emoji: '🌿', label: 'Bengali', region: 'South Asia' },
  { id: 'mongolian', emoji: '🗺️', label: 'Mongolian', region: 'East Asia' },
  { id: 'latin_american', emoji: '🎺', label: 'Latin American', region: 'Americas' },
  { id: 'islamic_turkish', emoji: '🌙', label: 'Turkish', region: 'Middle East' },
  { id: 'andean', emoji: '🦅', label: 'Andean', region: 'Americas' },
]

export default function LandingPage() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [ghostPos, setGhostPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    let frameId: number
    const animateGhost = () => {
      setGhostPos(prev => ({
        x: prev.x + (cursorPos.x - prev.x) * 0.15,
        y: prev.y + (cursorPos.y - prev.y) * 0.15,
      }))
      frameId = requestAnimationFrame(animateGhost)
    }
    frameId = requestAnimationFrame(animateGhost)
    return () => cancelAnimationFrame(frameId)
  }, [cursorPos])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="bg-kalika-bg text-kalika-text min-h-screen relative overflow-hidden selection:bg-kalika-green selection:text-kalika-bg font-body">
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .orb { pointer-events: none; z-index: 0; filter: blur(80px); position: absolute; }
      `}</style>

      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[60] opacity-[0.04]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute inset-0 animate-pulse bg-[length:60px_60px]"
          style={{ 
            backgroundImage: 'linear-gradient(#1a2a1a 1px, transparent 1px), linear-gradient(90deg, #1a2a1a 1px, transparent 1px)',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)',
            opacity: 0.2
          }}
        />
        {/* Floating Orbs */}
        <div className="orb w-[500px] h-[500px] bg-kalika-green/10 top-[-100px] left-[-100px] animate-float" />
        <div className="orb w-[600px] h-[400px] bg-kalika-green/5 bottom-[100px] right-[-200px] animate-orb" />
        <div className="orb w-[300px] h-[300px] bg-kalika-green/5 top-[30%] left-[50%] animate-float" />
      </div>

      {/* Custom Cursor */}
      <div 
        className="fixed top-0 left-0 w-3 h-3 bg-kalika-green rounded-full z-[100] pointer-events-none hidden lg:block mix-blend-difference" 
        style={{ transform: `translate3d(${cursorPos.x - 6}px, ${cursorPos.y - 6}px, 0)` }} 
      />
      <div 
        className="fixed top-0 left-0 w-9 h-9 border border-kalika-green/30 rounded-full z-[100] pointer-events-none hidden lg:block mix-blend-difference transition-transform duration-75 ease-out" 
        style={{ transform: `translate3d(${ghostPos.x - 18}px, ${ghostPos.y - 18}px, 0)` }} 
      />

      {/* --- Navbar --- */}
      <nav className="fixed top-0 inset-x-0 h-16 bg-kalika-bg/70 backdrop-blur-xl border-b border-kalika-border flex items-center justify-between px-[5%] z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative flex-shrink-0">
            <Image
              src="/images/bagong-small.png"
              alt="Bagong"
              width={32}
              height={32}
              className="object-contain"
              onError={(e) => {
                // Fallback if image not found: show K logo
                const target = e.target as HTMLElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const kMark = document.createElement('div');
                  kMark.className = "w-8 h-8 rounded-lg bg-kalika-green-subtle border border-kalika-green-dim flex items-center justify-center font-display font-extrabold text-kalika-green text-sm";
                  kMark.innerText = "K";
                  parent.appendChild(kMark);
                }
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-kalika-green text-lg tracking-wider leading-none">KALIKA</span>
            <span className="text-[9px] text-kalika-muted uppercase tracking-widest mt-0.5 font-bold">AI STUDY COMPANION</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Lenses', 'Who It\'s For'].map(item => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`} 
              className="text-sm font-medium text-kalika-text-secondary hover:text-kalika-green transition-colors"
            >
              {item}
            </a>
          ))}
          <Link href="/app" className="bg-kalika-green text-kalika-bg px-6 py-2.5 rounded-xl font-display font-bold text-sm hover:scale-[1.03] hover:bg-green-300 transition-all duration-200">
            Launch App →
          </Link>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative min-h-screen pt-28 px-[5%] flex flex-col md:grid md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.1fr_1fr] gap-12 items-center z-10 max-w-[1400px] mx-auto">
        <div className="flex flex-col text-left">
      <div className="animate-fade-up inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-kalika-green/10 border border-kalika-green-dim text-kalika-green text-[11px] font-bold tracking-widest uppercase mb-6 w-fit">
        <span className="w-2 h-2 rounded-full bg-kalika-green animate-pulse" />
        AI Case Competition · GDG UTSC 2026
      </div>
          
          <h1 className="animate-fade-up font-display font-extrabold text-[clamp(42px,6vw,72px)] leading-[1.02] tracking-tight mb-8" style={{ animationDelay: '0.1s' }}>
            <span className="text-kalika-text">Study smarter.</span><br />
            <span className="text-kalika-green drop-shadow-[0_0_30px_rgba(74,222,128,0.2)]">Think culturally.</span><br />
            <span className="text-kalika-text/50 italic">Learn freely.</span>
          </h1>

          <p className="animate-fade-up text-lg text-kalika-text-secondary font-light leading-relaxed max-w-[580px] mb-10" style={{ animationDelay: '0.2s' }}>
            KALIKA transforms complex academic material into <span className="text-kalika-green-text font-medium underline decoration-kalika-green/30 underline-offset-4">culturally resonant analogies</span> — from Nusantara to Viking, Islamic to K-Drama. Built to empower <span className="text-kalika-green-text font-medium decoration-kalika-green/30 underline underline-offset-4">neurodivergent minds</span> and global scholars.
          </p>

          <div className="animate-fade-up flex flex-wrap gap-5" style={{ animationDelay: '0.3s' }}>
            <Link href="/app" className="group bg-kalika-green text-kalika-bg px-8 py-4 rounded-xl font-display font-bold text-base hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(74,222,128,0.3)] transition-all duration-300 flex items-center gap-2">
              ✦ Start Learning Free
            </Link>
            <a href="#features" className="group border border-kalika-border2 text-kalika-text-secondary px-8 py-4 rounded-xl font-display font-bold text-base hover:text-kalika-green hover:border-kalika-green-dim hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              ▷ See How It Works
            </a>
          </div>

          <div className="animate-fade-up grid grid-cols-3 gap-8 pt-10 mt-12 border-t border-kalika-border" style={{ animationDelay: '0.4s' }}>
            {[
              { val: '50+', label: 'Cultural Lenses' },
              { val: '6', label: 'Core Features' },
              { val: '3', label: 'Learner Personas' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-display font-extrabold text-3xl text-kalika-green mb-1">{stat.val}</div>
                <div className="text-[10px] font-bold text-kalika-muted uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Right: Mockup */}
        <div className="animate-fade-up relative w-full aspect-[4/3] max-w-[550px]" style={{ animationDelay: '0.3s' }}>
          
          <div className="relative">
            {/* BAGONG MASCOT — Place file at public/images/bagong.png */}
            <div className="absolute -right-8 -bottom-8 w-64 h-64 z-20 pointer-events-none">
              <Image
                src="/images/bagong.png"
                alt="Bagong — KALIKA mascot, a Garuda warrior scholar"
                width={256}
                height={256}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          <div className="animate-float absolute inset-0 bg-kalika-surface border border-kalika-border2 rounded-kalika-xl shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(74,222,128,0.1)] overflow-hidden flex flex-col">
            <div className="bg-kalika-surface2 px-5 py-3 border-b border-kalika-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-kalika-green-subtle flex items-center justify-center text-[10px] font-bold text-kalika-green">K</div>
                <span className="text-[10px] font-bold text-kalika-green tracking-widest">KALIKA</span>
              </div>
              <div className="flex gap-1.5">
                {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-kalika-border" />)}
              </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-bold text-kalika-muted uppercase">Active Cultural Lens</span>
                <div className="flex gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-kalika-green text-kalika-bg text-[10px] font-bold flex items-center gap-1.5">
                    🌴 Nusantara
                  </div>
                  <div className="px-3 py-1.5 rounded-lg border border-kalika-border text-kalika-muted text-[10px] font-bold">
                    ⛩️ Japanese
                  </div>
                  <div className="px-3 py-1.5 rounded-lg border border-kalika-border text-kalika-muted text-[10px] font-bold">
                    🕌 Islamic
                  </div>
                </div>
              </div>

              <div className="bg-kalika-bg border border-kalika-border rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-kalika-text-secondary text-[10px] uppercase font-bold tracking-wider">
                  <span>📖</span> Dyslexia-Friendly Breakdown
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-[7px] bg-kalika-green/20 rounded-full w-[90%] animate-shimmer" />
                  <div className="h-[7px] bg-kalika-green/15 rounded-full w-[75%] animate-shimmer" style={{ animationDelay: '0.2s' }} />
                  <div className="h-[7px] bg-kalika-green/10 rounded-full w-[85%] animate-shimmer" style={{ animationDelay: '0.4s' }} />
                </div>

                <div className="bg-kalika-green-subtle border border-kalika-green-dim rounded-lg p-3 mt-1">
                  <span className="inline-block text-[8px] font-bold bg-kalika-green-glow text-kalika-green px-2 py-0.5 rounded-full mb-2 uppercase tracking-tight">Nusantara Analogy</span>
                  <div className="h-[7px] bg-kalika-green/30 rounded-full w-[100%] mb-1.5" />
                  <div className="h-[7px] bg-kalika-green/20 rounded-full w-[80%]" />
                </div>
              </div>

              <div className="mt-auto pt-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-kalika-green flex items-center justify-center text-[10px] text-kalika-bg font-bold cursor-default">▶</div>
                <div className="flex-1 flex items-end gap-[3px] h-6 px-1">
                  {[4,7,5,9,6,8,5,7].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-kalika-green/50 rounded-full animate-wave" 
                      style={{ height: h*2 + 'px', animationDelay: i*0.1 + 's' }} 
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-kalika-green">1.0x</span>
              </div>
            </div>
          </div>

          <div className="absolute -top-8 -right-8 bg-kalika-surface border border-kalika-green-dim rounded-2xl p-4 shadow-2xl flex items-start gap-3 z-20 animate-float translate-y-3">
            <span className="text-2xl mt-1">🌴</span>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-kalika-muted uppercase">Active Lens</span>
              <span className="font-display font-bold text-kalika-green">Nusantara</span>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-10 bg-kalika-surface border border-kalika-green-dim rounded-2xl p-4 shadow-2xl flex items-start gap-3 z-20 animate-float" style={{ animationDelay: '1.5s' }}>
            <span className="text-2xl mt-1">🎮</span>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-kalika-muted uppercase">Quiz Score</span>
              <span className="font-display font-bold text-kalika-green text-lg">3 / 3 <span className="text-xs">✦</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section: Cultural Marquee --- */}
      <section id="lenses" className="py-24 px-[5%] relative z-10">
        <div className="reveal flex flex-col items-center text-center max-w-[800px] mx-auto mb-20 text-balance">
          <span className="text-kalika-green text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Cultural Lenses</span>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,48px)] leading-tight mb-6">
            Your culture. <br />
            <span className="text-kalika-green">Your way of understanding.</span>
          </h2>
          <p className="text-kalika-text-secondary font-light max-w-[600px]">
            Every student thinks differently. KALIKA speaks your language — not just linguistically, but culturally. From ancient stories to modern gaming logic.
          </p>
        </div>

        <div className="relative space-y-4 py-10">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-kalika-bg to-transparent z-20" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-kalika-bg to-transparent z-20" />

          <div className="flex overflow-hidden">
            <div className="flex gap-4 animate-marquee">
              {[...LENSES_ROW_1, ...LENSES_ROW_1].map((lens, i) => (
                <div key={i} className="flex-shrink-0 bg-kalika-surface border border-kalika-border hover:border-kalika-green-dim hover:bg-kalika-surface2 rounded-xl px-5 py-4 flex items-center gap-3 transition-all duration-300 group cursor-default">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{lens.emoji}</span>
                  <div>
                    <div className="font-display font-semibold text-sm whitespace-nowrap">{lens.label}</div>
                    <div className="text-[10px] text-kalika-muted font-bold uppercase tracking-wider">{lens.region}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex overflow-hidden">
            <div className="flex gap-4 animate-marquee2">
              {[...LENSES_ROW_2, ...LENSES_ROW_2].map((lens, i) => (
                <div key={i} className="flex-shrink-0 bg-kalika-surface border border-kalika-border hover:border-kalika-green-dim hover:bg-kalika-surface2 rounded-xl px-5 py-4 flex items-center gap-3 transition-all duration-300 group cursor-default">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{lens.emoji}</span>
                  <div>
                    <div className="font-display font-semibold text-sm whitespace-nowrap">{lens.label}</div>
                    <div className="text-[10px] text-kalika-muted font-bold uppercase tracking-wider">{lens.region}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Section: Features --- */}
      <section id="features" className="py-24 px-[5%] max-w-[1200px] mx-auto z-10 relative">
        <div className="reveal flex flex-col mb-16">
          <span className="text-kalika-green text-[11px] font-bold uppercase tracking-[0.2em] mb-3">What KALIKA Does</span>
          <h2 className="font-display font-extrabold text-4xl mb-4">Everything you need to learn without limits</h2>
          <p className="text-kalika-text-secondary font-light max-w-[500px]">Six AI-powered tools, one unified experience designed to dismantle academic barriers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-display">
          <div className="reveal col-span-1 md:col-span-2 bg-gradient-to-br from-kalika-green-subtle to-kalika-surface border border-kalika-green-dim rounded-kalika-xl p-8 lg:p-10 flex flex-col md:flex-row gap-10 hover:shadow-[0_20px_50px_rgba(74,222,128,0.1)] transition-all duration-300">
            <div className="flex-1 flex flex-col h-full">
              <div className="w-14 h-14 rounded-2xl bg-kalika-green-glow flex items-center justify-center text-3xl mb-6">🌴</div>
              <h3 className="font-extrabold text-2xl mb-4">The Cultural Lens Engine</h3>
              <p className="text-kalika-green-text font-light text-lg leading-relaxed mb-6 font-body">
                Transforms dense academic text into vivid analogies from 50+ world cultures. Mitochondria explained via a <span className="font-semibold underline decoration-kalika-green-glow text-kalika-green">Padang warung kitchen</span>. Quantum superposition through a <span className="font-semibold underline decoration-kalika-green-glow text-kalika-green">gamelan orchestra</span>.
              </p>
              <div className="mt-auto px-3 py-1 rounded-full bg-kalika-green text-kalika-bg text-[10px] font-bold uppercase tracking-widest w-fit">Core Feature</div>
            </div>
            
            <div className="flex-1 relative hidden md:flex items-center justify-center">
              <div className="bg-kalika-bg border border-kalika-green-glow rounded-2xl p-6 w-full shadow-2xl scale-110">
                <div className="flex gap-2 mb-6">
                  <div className="px-3 py-1.5 rounded-lg bg-kalika-green text-kalika-bg text-[9px] font-bold uppercase">Nusantara</div>
                  <div className="px-3 py-1.5 rounded-lg border border-kalika-border text-kalika-muted text-[9px] font-bold uppercase">Japanese</div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-kalika-green/30 rounded-full w-full" />
                  <div className="h-2 bg-kalika-green/20 rounded-full w-[85%]" />
                  <div className="h-2 bg-kalika-green/10 rounded-full w-[95%]" />
                </div>
              </div>
            </div>
          </div>

          {[
            { tag: 'Accessibility', icon: '📖', title: 'Dyslexia-Friendly Structuring', desc: 'Short sentences. Bold keywords. Bullet points. Every wall of text restructured for clarity.' },
            { tag: 'Engagement', icon: '🎮', title: 'Gamified Mini Quizzes', desc: '3 questions. Wrapped in your chosen narrative. Built for ADHD brains that thrive on engagement.' },
            { tag: 'Comprehension', icon: '📚', title: 'Bilingual Glossary', desc: 'Complex terms decoded in plain English (B1 level) and local context for no-friction learning.' },
            { tag: 'Input', icon: '🎙️', title: 'Multimodal Input', desc: 'Upload notes, lecture photos, or voice. KALIKA structures it using Gemini Vision powers.' },
            { tag: 'Audio', icon: '🔊', title: 'TTS with Highlight', desc: 'Listen while words light up. Study on commute or rest your eyes with auto language detection.' },
          ].map((f, i) => (
            <div key={i} className="reveal bg-kalika-surface border border-kalika-border rounded-kalika-xl p-8 flex flex-col hover:border-kalika-green-dim hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-6">{f.icon}</div>
              <h3 className="font-bold text-lg mb-3">{f.title}</h3>
              <p className="text-kalika-text-secondary text-sm font-light leading-relaxed mb-6 flex-1 font-body">{f.desc}</p>
              <div className="text-[9px] font-bold text-kalika-muted uppercase tracking-widest">{f.tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section: Personas --- */}
      <section id="personas" className="py-24 px-[5%] bg-kalika-surface border-y border-kalika-border z-10 relative">
        <div className="reveal flex flex-col items-center text-center max-w-[800px] mx-auto mb-16">
          <span className="text-kalika-green text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Who It's For</span>
          <h2 className="font-display font-extrabold text-4xl mb-4">Built for every kind of mind</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1240px] mx-auto">
          {[
            { tag: 'Dyslexia', icon: '🧠', title: 'The Deliberate Learner', sub: 'Student with dyslexia', quote: 'I used to avoid reading dense lecture notes. Now I paste them into KALIKA and get bullet points I can actually process.', color: 'border-kalika-green' },
            { tag: 'ADHD', icon: '⚡', title: 'The Sprint Learner', sub: 'Student with ADHD', quote: '5-minute quizzes that feel like a game? Finally something that keeps my brain engaged until I actually understand everything.', color: 'border-amber-500' },
            { tag: 'Global', icon: '🌏', title: 'The Global Scholar', sub: 'International student', quote: 'Explaining recursion through the story of Mahabharata? That clicked in 30 seconds what 3 lectures couldn\'t explain.', color: 'border-sky-500' }
          ].map((p, i) => (
            <div key={i} className="reveal bg-kalika-bg border border-kalika-border rounded-kalika-xl p-8 hover:-translate-y-2 hover:border-kalika-green-dim transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-6`}>{p.icon}</div>
              <h4 className="font-display font-bold text-xl mb-1">{p.title}</h4>
              <div className="text-kalika-muted text-xs font-bold uppercase tracking-widest mb-6">{p.sub}</div>
              <div className={`bg-kalika-surface border-l-2 ${p.color} p-5 rounded-r-xl italic text-sm text-kalika-text-secondary leading-relaxed`}>
                "{p.quote}"
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Tech Strip --- */}
      <section className="py-20 px-[5%] max-w-[1200px] mx-auto z-10 relative text-center">
        <span className="text-[11px] font-bold text-kalika-muted uppercase tracking-[0.3em] mb-8 block">Built With World Class Stack</span>
        <div className="flex flex-wrap justify-center gap-3 font-mono">
          {['Next.js 15', 'Gemini 2.5 Flash', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Web Speech API', 'Vercel', '@google/genai'].map(tech => (
            <div key={tech} className="px-5 py-2.5 rounded-lg border border-kalika-border bg-kalika-surface text-xs text-kalika-text-secondary hover:border-kalika-green/50 hover:text-kalika-green transition-all cursor-default">
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-32 px-[5%] text-center relative z-10 overflow-hidden">
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-kalika-green/10 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="reveal max-w-[800px] mx-auto relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kalika-surface border border-kalika-border text-kalika-green-text text-[11px] font-bold uppercase tracking-widest mb-10">
            🦅 Powered by Bagong, the Garuda Scholar
          </div>
          
          <h2 className="font-display font-extrabold text-[clamp(34px,6vw,68px)] leading-[1.05] tracking-tight mb-8">
            Ready to study like<br />
            <span className="text-kalika-green">a warrior</span> ?
          </h2>
          
          <p className="text-kalika-text-secondary text-lg font-light leading-relaxed mb-12 max-w-[600px] mx-auto">
            No more struggling alone with dense textbooks. Let KALIKA and Bagong guide you through any subject, in any language, through any cultural lens.
          </p>

          <div className="flex flex-wrap justify-center gap-6 font-display">
            <Link href="/app" className="bg-kalika-green text-kalika-bg px-10 py-5 rounded-xl font-bold text-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
              ✦ Launch KALIKA Now
            </Link>
            <a href="https://github.com" target="_blank" className="border border-kalika-border2 text-kalika-text px-10 py-5 rounded-xl font-bold text-lg hover:border-kalika-green/50 hover:bg-kalika-surface transition-all duration-300">
              ↗ View on GitHub
            </a>
          </div>
        </div>

        <div className="absolute bottom-[-40px] right-[-20px] font-display font-extrabold text-[180px] text-kalika-green/5 pointer-events-none select-none">
          ಕಲಿಕೆ
        </div>

        {/* BAGONG MASCOT — Decorative background element */}
        <div className="absolute right-0 bottom-0 w-80 h-80 opacity-20 pointer-events-none">
          <Image
            src="/images/bagong.png"
            alt=""
            width={320}
            height={320}
            className="object-contain object-bottom"
            aria-hidden="true"
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}
