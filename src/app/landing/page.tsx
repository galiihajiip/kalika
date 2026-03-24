'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// --- Types & Data ---

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
    <div className="bg-[#060c06] text-[#e2f0e2] min-h-screen relative overflow-hidden selection:bg-kalika-green selection:text-[#060c06]">
      {/* --- Styles & Custom CSS --- */}
      <style jsx global>{`
        :root {
          --bg: #060c06;
          --surface: #0c140c;
          --surface2: #111c11;
          --border: #1a2a1a;
          --border2: #243824;
          --green: #4ade80;
          --green2: #22c55e;
          --green-dim: #166534;
          --green-sub: #14532d;
          --green-txt: #bbf7d0;
          --muted: #5a7a5a;
          --text: #e2f0e2;
          --text2: #9ab89a;
          --font-sora: var(--font-sora);
          --font-dm: var(--font-dm-sans);
          --font-mono: var(--font-dm-mono);
        }

        body { font-family: var(--font-dm); line-height: 1.6; }
        .font-display { font-family: var(--font-sora); }
        .font-mono { font-family: var(--font-mono); }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-up { animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        .float-small { animation: floatSmall 5s ease-in-out infinite; }
        @keyframes floatSmall {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .marquee-left { animation: marqueeLeft 30s linear infinite; }
        .marquee-right { animation: marqueeRight 25s linear infinite; }
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        .pulse-grid { animation: pulseGrid 8s ease-in-out infinite; }
        @keyframes pulseGrid {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.35; }
        }

        .orb { pointer-events: none; z-index: 0; filter: blur(80px); position: absolute; }

        /* Custom scrollbar for landing */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--green-dim); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--green); }
      `}</style>

      {/* --- Visual Overlays --- */}
      
      {/* Noise Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[60] opacity-[0.04]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute inset-0 pulse-grid"
          style={{ 
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
          }}
        />
        {/* Floating Orbs */}
        <div className="orb w-[500px] h-[500px] bg-[rgba(74,222,128,0.1)] top-[-100px] left-[-100px] float" />
        <div className="orb w-[600px] h-[400px] bg-[rgba(34,197,94,0.08)] bottom-[100px] right-[-200px] float" style={{ animationDelay: '1s' }} />
        <div className="orb w-[300px] h-[300px] bg-[rgba(134,239,172,0.05)] middle-0 left-[50%] float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Custom Cursor */}
      <div 
        className="fixed top-0 left-0 w-3 h-3 bg-kalika-green rounded-full z-[100] pointer-events-none hidden lg:block blend-difference" 
        style={{ transform: `translate3d(${cursorPos.x - 6}px, ${cursorPos.y - 6}px, 0)` }} 
      />
      <div 
        className="fixed top-0 left-0 w-9 h-9 border border-kalika-green/30 rounded-full z-[100] pointer-events-none hidden lg:block blend-difference transition-transform duration-75 ease-out" 
        style={{ transform: `translate3d(${ghostPos.x - 18}px, ${ghostPos.y - 18}px, 0)` }} 
      />

      {/* --- Navbar --- */}
      <nav className="fixed top-0 inset-x-0 h-16 bg-[#060c06]/70 backdrop-blur-xl border-b border-[#1a2a1a] flex items-center justify-between px-[5%] z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#14532d] border border-[#166534] flex items-center justify-center font-display font-extrabold text-kalika-green text-lg">
            K
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-kalika-green text-lg tracking-wider leading-none">KALIKA</span>
            <span className="text-[9px] text-[#5a7a5a] uppercase tracking-widest mt-0.5 font-bold">AI STUDY COMPANION</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Features', 'Lenses', 'Who It\'s For'].map(item => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`} 
              className="text-sm font-medium text-[#9ab89a] hover:text-kalika-green transition-colors"
            >
              {item}
            </a>
          ))}
          <Link href="/app" className="bg-kalika-green text-[#060c06] px-6 py-2.5 rounded-xl font-display font-bold text-sm hover:scale-[1.03] hover:bg-[#86efac] transition-all duration-200">
            Launch App →
          </Link>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative min-h-screen pt-28 px-[5%] flex flex-col md:grid md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.1fr_1fr] gap-12 items-center z-10 max-w-[1400px] mx-auto">
        
        {/* Hero Left */}
        <div className="flex flex-col text-left">
          <div className="fade-up inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-kalika-green/10 border border-[#166534] text-kalika-green text-[11px] font-bold tracking-widest uppercase mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-kalika-green animate-pulse" />
            AI Case Competition · GDG UTSC 2025
          </div>
          
          <h1 className="fade-up font-display font-extrabold text-[clamp(42px,6vw,72px)] leading-[1.02] tracking-tight mb-8" style={{ animationDelay: '0.1s' }}>
            <span className="text-[#e2f0e2]">Study smarter.</span><br />
            <span className="text-kalika-green drop-shadow-[0_0_30px_rgba(74,222,128,0.2)]">Think culturally.</span><br />
            <span className="text-[#e2f0e2]/50 italic">Learn freely.</span>
          </h1>

          <p className="fade-up text-lg text-[#9ab89a] font-light leading-relaxed max-w-[580px] mb-10" style={{ animationDelay: '0.2s' }}>
            KALIKA transforms complex academic material into <span className="text-[#bbf7d0] font-medium underline decoration-kalika-green/30 underline-offset-4">culturally resonant analogies</span> — from Nusantara to Viking, Islamic to K-Drama. Built to empower <span className="text-[#bbf7d0] font-medium decoration-kalika-green/30 underline underline-offset-4">neurodivergent minds</span> and global scholars.
          </p>

          <div className="fade-up flex flex-wrap gap-5" style={{ animationDelay: '0.3s' }}>
            <Link href="/app" className="group bg-kalika-green text-[#060c06] px-8 py-4 rounded-xl font-display font-bold text-base hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(74,222,128,0.3)] transition-all duration-300 flex items-center gap-2">
              ✦ Start Learning Free
            </Link>
            <a href="#features" className="group border border-[#243824] text-[#9ab89a] px-8 py-4 rounded-xl font-display font-bold text-base hover:text-kalika-green hover:border-[#166534] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              ▷ See How It Works
            </a>
          </div>

          <div className="fade-up grid grid-cols-3 gap-8 pt-10 mt-12 border-t border-[#1a2a1a]" style={{ animationDelay: '0.4s' }}>
            {[
              { val: '50+', label: 'Cultural Lenses' },
              { val: '6', label: 'Core Features' },
              { val: '3', label: 'Learner Personas' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-display font-extrabold text-3xl text-kalika-green mb-1">{stat.val}</div>
                <div className="text-[10px] font-bold text-[#5a7a5a] uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Right: Mockup */}
        <div className="fade-up relative w-full aspect-[4/3] max-w-[550px]" style={{ animationDelay: '0.3s' }}>
          <div className="float absolute inset-0 bg-[#0c140c] border border-[#243824] rounded-[24px] shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(74,222,128,0.1)] overflow-hidden flex flex-col">
            {/* Mock Header */}
            <div className="bg-[#111c11] px-5 py-3 border-b border-[#1a2a1a] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#14532d] flex items-center justify-center text-[10px] font-bold text-kalika-green">K</div>
                <span className="text-[10px] font-bold text-kalika-green tracking-widest">KALIKA</span>
              </div>
              <div className="flex gap-1.5">
                {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#1a2a1a]" />)}
              </div>
            </div>

            {/* Mock Body */}
            <div className="p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-bold text-[#5a7a5a] uppercase">Active Cultural Lens</span>
                <div className="flex gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-kalika-green text-[#060c06] text-[10px] font-bold flex items-center gap-1.5">
                    🌴 Nusantara
                  </div>
                  <div className="px-3 py-1.5 rounded-lg border border-[#1a2a1a] text-[#5a7a5a] text-[10px] font-bold">
                    ⛩️ Japanese
                  </div>
                  <div className="px-3 py-1.5 rounded-lg border border-[#1a2a1a] text-[#5a7a5a] text-[10px] font-bold">
                    🕌 Islamic
                  </div>
                </div>
              </div>

              {/* Result Card */}
              <div className="bg-[#060c06] border border-[#1a2a1a] rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[#9ab89a] text-[10px] uppercase font-bold tracking-wider">
                  <span>📖</span> Dyslexia-Friendly Breakdown
                </div>
                <div className="flex flex-col gap-2">
                  <div className="h-[7px] bg-kalika-green/20 rounded-full w-[90%] animate-pulse" />
                  <div className="h-[7px] bg-kalika-green/15 rounded-full w-[75%] animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="h-[7px] bg-kalika-green/10 rounded-full w-[85%] animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>

                <div className="bg-[#14532d] border border-[#166534] rounded-lg p-3 mt-1">
                  <span className="inline-block text-[8px] font-bold bg-[#166534] text-kalika-green px-2 py-0.5 rounded-full mb-2 uppercase tracking-tight">Nusantara Analogy</span>
                  <div className="h-[7px] bg-kalika-green/30 rounded-full w-[100%] mb-1.5" />
                  <div className="h-[7px] bg-kalika-green/20 rounded-full w-[80%]" />
                </div>
              </div>

              {/* TTS Bar */}
              <div className="mt-auto pt-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-kalika-green flex items-center justify-center text-[10px]">▶</div>
                <div className="flex-1 flex items-end gap-[3px] h-6 px-1">
                  {[4,7,5,9,6,8,5,7].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-kalika-green/50 rounded-full" 
                      style={{ height: h*2 + 'px', animation: `scaleY 1s ease-in-out infinite alternate`, animationDelay: i*0.1 + 's' }} 
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-kalika-green">1.0x</span>
              </div>
            </div>
          </div>

          {/* Floating Badges */}
          <div className="float-small absolute -top-8 -right-8 bg-[#0c140c] border border-[#166534] rounded-2xl p-4 shadow-2xl flex items-start gap-3 z-20">
            <span className="text-2xl mt-1">🌴</span>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-[#5a7a5a] uppercase">Active Lens</span>
              <span className="font-display font-bold text-kalika-green">Nusantara</span>
            </div>
          </div>

          <div className="float-small absolute -bottom-6 -left-10 bg-[#0c140c] border border-[#166534] rounded-2xl p-4 shadow-2xl flex items-start gap-3 z-20" style={{ animationDelay: '1.5s' }}>
            <span className="text-2xl mt-1">🎮</span>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-[#5a7a5a] uppercase">Quiz Score</span>
              <span className="font-display font-bold text-kalika-green text-lg">3 / 3 <span className="text-xs">✦</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section: Cultural Marquee --- */}
      <section id="lenses" className="py-24 px-[5%] relative z-10">
        <div className="reveal flex flex-col items-center text-center max-w-[800px] mx-auto mb-20">
          <span className="text-kalika-green text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Cultural Lenses</span>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,48px)] leading-tight mb-6">
            Your culture. <br />
            <span className="text-kalika-green">Your way of understanding.</span>
          </h2>
          <p className="text-[#9ab89a] font-light max-w-[600px]">
            Every student thinks differently. KALIKA speaks your language — not just linguistically, but culturally. From ancient stories to modern gaming logic.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative space-y-4 py-10">
          {/* Mask Edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#060c06] to-transparent z-20" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#060c06] to-transparent z-20" />

          {/* Row 1 */}
          <div className="flex overflow-hidden group">
            <div className="flex gap-4 marquee-left group-hover:pause">
              {[...LENSES_ROW_1, ...LENSES_ROW_1].map((lens, i) => (
                <div key={i} className="flex-shrink-0 bg-[#0c140c] border border-[#1a2a1a] hover:border-[#166534] hover:bg-[#111c11] rounded-xl px-5 py-4 flex items-center gap-3 transition-all duration-300">
                  <span className="text-2xl">{lens.emoji}</span>
                  <div>
                    <div className="font-display font-semibold text-sm whitespace-nowrap">{lens.label}</div>
                    <div className="text-[10px] text-[#5a7a5a] font-bold uppercase tracking-wider">{lens.region}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex overflow-hidden group">
            <div className="flex gap-4 marquee-right group-hover:pause">
              {[...LENSES_ROW_2, ...LENSES_ROW_2].map((lens, i) => (
                <div key={i} className="flex-shrink-0 bg-[#0c140c] border border-[#1a2a1a] hover:border-[#166534] hover:bg-[#111c11] rounded-xl px-5 py-4 flex items-center gap-3 transition-all duration-300">
                  <span className="text-2xl">{lens.emoji}</span>
                  <div>
                    <div className="font-display font-semibold text-sm whitespace-nowrap">{lens.label}</div>
                    <div className="text-[10px] text-[#5a7a5a] font-bold uppercase tracking-wider">{lens.region}</div>
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
          <p className="text-[#9ab89a] font-light max-w-[500px]">Six AI-powered tools, one unified experience designed to dismantle academic barriers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1 (Main) */}
          <div className="reveal col-span-1 md:col-span-2 bg-gradient-to-br from-[#14532d] to-[#0c140c] border border-[#166534] rounded-[24px] p-8 lg:p-10 flex flex-col md:flex-row gap-10 hover:shadow-[0_20px_50px_rgba(74,222,128,0.1)] transition-all duration-300">
            <div className="flex-1 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-[#166534] flex items-center justify-center text-3xl mb-6">🌴</div>
              <h3 className="font-display font-extrabold text-2xl mb-4">The Cultural Lens Engine</h3>
              <p className="text-[#bbf7d0] font-light text-lg leading-relaxed mb-6">
                Transforms dense academic text into vivid analogies from 50+ world cultures. Mitochondria explained via a <span className="font-semibold underline decoration-[#166534]">Padang warung kitchen</span>. Quantum superposition through a <span className="font-semibold underline decoration-[#166534]">gamelan orchestra</span>.
              </p>
              <div className="mt-auto inline-flex px-3 py-1 rounded-full bg-kalika-green text-[#060c06] text-[10px] font-bold uppercase tracking-widest w-fit">Core Feature</div>
            </div>
            
            <div className="flex-1 relative hidden md:flex items-center justify-center">
              <div className="bg-[#060c06] border border-[#166534] rounded-2xl p-6 w-full shadow-2xl">
                <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                  <div className="px-3 py-1.5 rounded-lg bg-kalika-green text-[#060c06] text-[9px] font-bold uppercase whitespace-nowrap">Nusantara</div>
                  <div className="px-3 py-1.5 rounded-lg border border-[#1a2a1a] text-[#5a7a5a] text-[9px] font-bold uppercase whitespace-nowrap">Japanese</div>
                  <div className="px-3 py-1.5 rounded-lg border border-[#1a2a1a] text-[#5a7a5a] text-[9px] font-bold uppercase whitespace-nowrap">Viking</div>
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
            <div key={i} className="reveal bg-[#0c140c] border border-[#1a2a1a] rounded-[24px] p-8 flex flex-col hover:border-[#166534] hover:-translate-y-1 hover:bg-gradient-to-tl from-[rgba(74,222,128,0.03)] to-transparent transition-all duration-300">
              <div className="text-3xl mb-6">{f.icon}</div>
              <h3 className="font-display font-bold text-lg mb-3">{f.title}</h3>
              <p className="text-[#9ab89a] text-sm font-light leading-relaxed mb-6 flex-1">{f.desc}</p>
              <div className="text-[9px] font-bold text-[#5a7a5a] uppercase tracking-widest">{f.tag}</div>
            </div>
          ))}

        </div>
      </section>

      {/* --- Section: Personas --- */}
      <section id="personas" className="py-24 px-[5%] bg-[#0c140c] border-y border-[#1a2a1a] z-10 relative">
        <div className="reveal flex flex-col items-center text-center max-w-[800px] mx-auto mb-16">
          <span className="text-kalika-green text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Who It's For</span>
          <h2 className="font-display font-extrabold text-4xl mb-4">Built for every kind of mind</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1240px] mx-auto">
          
          <div className="reveal bg-[#060c06] border border-[#1a2a1a] rounded-[24px] p-8 hover:-translate-y-2 hover:border-[#166534] transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-kalika-green/10 border border-kalika-green/20 flex items-center justify-center text-3xl mb-6 shadow-glow">🧠</div>
            <h4 className="font-display font-bold text-xl mb-1">The Deliberate Learner</h4>
            <div className="text-[#5a7a5a] text-xs font-bold uppercase tracking-widest mb-6">Student with dyslexia</div>
            <div className="bg-[#111c11] border-l-2 border-kalika-green p-5 rounded-r-xl italic text-sm text-[#9ab89a] leading-relaxed">
              "I used to avoid reading dense lecture notes. Now I paste them into KALIKA and get bullet points I can actually process."
            </div>
          </div>

          <div className="reveal bg-[#060c06] border border-[#1a2a1a] rounded-[24px] p-8 hover:-translate-y-2 hover:border-[#166534] transition-all duration-300" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl mb-6 shadow-glow">⚡</div>
            <h4 className="font-display font-bold text-xl mb-1">The Sprint Learner</h4>
            <div className="text-[#5a7a5a] text-xs font-bold uppercase tracking-widest mb-6">Student with ADHD</div>
            <div className="bg-[#111c11] border-l-2 border-amber-500/50 p-5 rounded-r-xl italic text-sm text-[#9ab89a] leading-relaxed">
              "5-minute quizzes that feel like a game? Finally something that keeps my brain engaged until I actually understand everything."
            </div>
          </div>

          <div className="reveal bg-[#060c06] border border-[#1a2a1a] rounded-[24px] p-8 hover:-translate-y-2 hover:border-[#166534] transition-all duration-300" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-3xl mb-6 shadow-glow">🌏</div>
            <h4 className="font-display font-bold text-xl mb-1">The Global Scholar</h4>
            <div className="text-[#5a7a5a] text-xs font-bold uppercase tracking-widest mb-6">International student</div>
            <div className="bg-[#111c11] border-l-2 border-sky-500/50 p-5 rounded-r-xl italic text-sm text-[#9ab89a] leading-relaxed">
              "Explaining recursion through the story of Mahabharata? That clicked in 30 seconds what 3 lectures couldn't explain."
            </div>
          </div>

        </div>
      </section>

      {/* --- Tech Strip --- */}
      <section className="py-20 px-[5%] max-w-[1200px] mx-auto z-10 relative text-center">
        <span className="text-[11px] font-bold text-[#5a7a5a] uppercase tracking-[0.3em] mb-8 block">Built With World Class Stack</span>
        <div className="flex flex-wrap justify-center gap-3">
          {['Next.js 15', 'Gemini 2.5 Flash', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Web Speech API', 'Vercel', '@google/genai'].map(tech => (
            <div key={tech} className="px-5 py-2.5 rounded-lg border border-[#1a2a1a] bg-[#0c140c] font-mono text-xs text-[#9ab89a] hover:border-kalika-green/50 hover:text-kalika-green transition-all cursor-default">
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-32 px-[5%] text-center relative z-10 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-kalika-green/10 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="reveal max-w-[800px] mx-auto relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111c11] border border-[#1a2a1a] text-[#bbf7d0] text-[11px] font-bold uppercase tracking-widest mb-10">
            🦅 Powered by Bagong, the Garuda Scholar
          </div>
          
          <h2 className="font-display font-extrabold text-[clamp(34px,6vw,68px)] leading-[1.05] tracking-tight mb-8">
            Ready to study like<br />
            <span className="text-kalika-green">a warrior</span> ?
          </h2>
          
          <p className="text-[#9ab89a] text-lg font-light leading-relaxed mb-12 max-w-[600px] mx-auto">
            No more struggling alone with dense textbooks. Let KALIKA and Bagong guide you through any subject, in any language, through any cultural lens.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/app" className="bg-kalika-green text-[#060c06] px-10 py-5 rounded-xl font-display font-bold text-lg hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(74,222,128,0.4)] transition-all duration-300">
              ✦ Launch KALIKA Now
            </Link>
            <a href="https://github.com" target="_blank" className="border border-[#243824] text-[#e2f0e2] px-10 py-5 rounded-xl font-display font-bold text-lg hover:border-kalika-green/50 hover:bg-[#111c11] transition-all duration-300">
              ↗ View on GitHub
            </a>
          </div>
        </div>

        {/* Big Script Decor */}
        <div className="absolute bottom-[-40px] right-[-20px] font-display font-extrabold text-[180px] text-kalika-green/5 pointer-events-none select-none">
          ಕಲಿಕೆ
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-10 px-[5%] bg-[#0c140c] border-t border-[#1a2a1a] relative z-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="font-display font-bold text-kalika-green text-sm flex items-center gap-2 justify-center md:justify-start">
              KALIKA © 2025 <span className="text-[#5a7a5a] font-light">—</span> 
              <span className="text-[#e2f0e2]/70 font-medium">Built for GDG UTSC AI Case Competition</span>
            </div>
            <div className="text-[10px] text-[#5a7a5a] font-bold uppercase tracking-widest leading-none">
              UPN Veteran East Java, Indonesia
            </div>
          </div>
          
          <div className="flex flex-col gap-1 text-center md:text-right">
            <div className="text-[10px] text-[#5a7a5a] uppercase font-bold tracking-widest">Designed & Built by</div>
            <div className="text-[#9ab89a] text-xs font-medium">
              Galih Aji Pangestu · Muhammad Ananda Hariadi · Fachri Ahmad Fabian
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
