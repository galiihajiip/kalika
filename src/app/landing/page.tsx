'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoMark from '@/components/LogoMark'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

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

// ── TESTIMONIALS DATA ──
const TESTIMONIALS = [
  {
    name: "Aisha Mahmoud",
    university: "University of Toronto, Canada",
    initial: "A",
    color: "green",
    quote: "The Islamic lens made thermodynamics click instantly. Explaining entropy through the concept of tawakkul gave me a mental model that no lecture ever could. My midterm score jumped two full letter grades.",
    stars: 5,
  },
  {
    name: "Park Seo-jin",
    university: "Yonsei University, South Korea",
    initial: "P",
    color: "blue",
    quote: "The Korean lens explained supply and demand using K-drama production economics. I actually enjoyed studying for the first time. The quiz feature kept me focused without feeling overwhelmed.",
    stars: 5,
  },
  {
    name: "Priya Krishnamurthy",
    university: "IIT Delhi, India",
    initial: "P",
    color: "purple",
    quote: "As someone with dyslexia, the formatted output alone is worth everything. Short sentences, bold keywords, generous spacing. KALIKA reads my material the way my brain needs it to be presented.",
    stars: 5,
  },
  {
    name: "Marcos Dela Cruz",
    university: "University of the Philippines Diliman",
    initial: "M",
    color: "amber",
    quote: "Filipino bayanihan analogy for distributed computing was pure genius. The TTS feature with word highlighting lets me study during my 3-hour Manila commute without looking at the screen.",
    stars: 5,
  },
  {
    name: "Mei Ling Zhao",
    university: "National Taiwan University",
    initial: "M",
    color: "teal",
    quote: "Chinese Confucian lens for organizational behavior transformed how I understand management theory. The bilingual glossary is a lifesaver for technical terms in my second language.",
    stars: 5,
  },
  {
    name: "Dimitri Alexopoulos",
    university: "University of Athens, Greece",
    initial: "D",
    color: "green",
    quote: "Greek Classical lens for philosophy coursework is incredible. Explaining the Socratic method through debugging code made my professor stop the lecture to ask where I learned that analogy.",
    stars: 5,
  },
  {
    name: "Fatima Al-Rashid",
    university: "King Abdulaziz University, Saudi Arabia",
    initial: "F",
    color: "blue",
    quote: "KALIKA explained neural networks using the Islamic concept of ijma (scholarly consensus). As an international student the cultural bridge made abstract AI concepts finally make sense.",
    stars: 5,
  },
  {
    name: "James Okonkwo",
    university: "University of Lagos, Nigeria",
    initial: "J",
    color: "amber",
    quote: "West African Ubuntu lens for systems thinking was a revelation. Explaining interdependency through community cooperation gave me frameworks I use in every engineering class now.",
    stars: 5,
  },
]

export default function LandingPage() {
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

      <CustomCursor />

      <nav className="fixed top-0 inset-x-0 h-16 bg-kalika-bg/70 backdrop-blur-xl border-b border-kalika-border flex items-center justify-between px-[5%] z-50">
        <div className="flex items-center gap-4">
          <LogoMark />
          <div className="w-8 h-8 relative flex-shrink-0 animate-float">
            <Image
              src="/images/bagong-small.png"
              alt="Bagong"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-kalika-green text-lg tracking-wider leading-none uppercase">KALIKA</span>
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
            KALIKA transforms complex academic material into <span className="text-kalika-green-text font-medium underline decoration-kalika-green/30 underline-offset-4">culturally resonant analogies</span>: from Nusantara to Viking, Islamic to K-Drama. Built to empower <span className="text-kalika-green-text font-medium decoration-kalika-green/30 underline underline-offset-4">neurodivergent minds</span> and global scholars.
          </p>

          <div className="animate-fade-up flex flex-wrap gap-5" style={{ animationDelay: '0.3s' }}>
            <Link href="/app" className="group bg-kalika-green text-kalika-bg px-8 py-4 rounded-xl font-display font-bold text-base hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(74,222,128,0.3)] transition-all duration-300 flex items-center gap-2">
              ✦ Start Learning Free
            </Link>
            <a href="#features" className="group border border-kalika-border2 text-kalika-text-secondary px-8 py-4 rounded-xl font-display font-bold text-base hover:text-kalika-green hover:border-kalika-green-dim hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
              ▷ See How It Works
            </a>
          </div>

        </div>

        {/* Hero Right: Mockup */}
        <div className="animate-fade-up relative w-full aspect-[4/3] max-w-[550px]" style={{ animationDelay: '0.3s' }}>
          
          <div className="relative overflow-visible">
            {/* BAGONG MASCOT — Place file at public/images/bagong.png */}
            <div className="absolute -right-4 -bottom-0 w-72 h-auto z-20 pointer-events-none">
              <Image
                src="/images/bagong.png"
                alt="Bagong the Garuda Scholar mascot"
                width={320}
                height={400}
                className="object-contain object-bottom w-full h-auto"
                style={{ maxHeight: '380px' }}
                priority
              />
            </div>
          </div>

          <div className="animate-float absolute inset-0 bg-kalika-surface border border-kalika-border2 rounded-kalika-xl shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(74,222,128,0.1)] overflow-visible flex flex-col">
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

      {/* --- 6A: HERO MINI-FEATURES ROW --- */}
      <section className="border-y border-kalika-border bg-kalika-surface/30 relative z-10">
        <div className="max-w-[1400px] mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: '🌍', num: '50+',  label: 'Cultural Lenses', sub: 'From Nusantara to Viking' },
            { icon: '🔊', num: '20+',  label: 'Regional Voices', sub: 'Multilingual TTS Engine' },
            { icon: '💎', num: '100%', label: 'Free Demo', sub: 'For Hackathon Period' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-6 group">
              <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div>
                <div className="font-display font-bold text-3xl text-kalika-green leading-none">{stat.num}</div>
                <div className="font-semibold text-kalika-text text-base mt-2">{stat.label}</div>
                <div className="text-kalika-text-secondary text-[11px] font-bold uppercase tracking-widest mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  {stat.sub}
                </div>
              </div>
            </div>
          ))}
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
            Every student thinks differently. KALIKA speaks your language: not just linguistically, but culturally. From ancient stories to modern gaming logic.
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

      {/* --- 6B: MAIN FEATURES SECTION --- */}
      <section id="features" className="py-28 px-8 max-w-6xl mx-auto z-10 relative">
        <div className="reveal flex flex-col mb-20">
          <span className="text-kalika-green text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">What KALIKA Does</span>
          <h2 className="font-display font-extrabold text-[clamp(32px,5vw,52px)] leading-tight mb-6">
            Everything you need to <br/> 
            <span className="text-kalika-green drop-shadow-[0_0_20px_rgba(74,222,128,0.2)]">learn without limits</span>
          </h2>
          <p className="text-kalika-text-secondary text-lg leading-relaxed max-w-2xl font-light">
            Six AI-powered tools designed with neurodivergent minds in mind. 
            Generous spacing, clear language, and cultural context: because 
            everyone learns differently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* 1. FEATURED CARD */}
          <div className="reveal md:col-span-2 bg-gradient-to-br from-kalika-green-subtle/40 to-kalika-surface border border-kalika-green-dim rounded-2xl p-10 lg:p-12 flex flex-col lg:flex-row gap-12 hover:border-kalika-green-glow transition-all duration-500 group">
            <div className="flex-1 flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-kalika-green-subtle border border-kalika-green-glow flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-500">
                🌴
              </div>
              <h3 className="font-display font-bold text-3xl text-kalika-text leading-snug mb-5">
                The Cultural Lens Engine
              </h3>
              <p className="text-kalika-text-secondary text-base lg:text-lg leading-relaxed font-light mb-8 max-w-xl">
                Transform dense academic text into vivid, memorable analogies 
                from 50+ world cultures. Mitochondria explained via a <span className="text-kalika-green/80 font-medium">Padang warung 
                kitchen</span>. Quantum superposition through a <span className="text-kalika-green/80 font-medium">gamelan orchestra</span>. 
                Your cultural background becomes your greatest learning superpower.
              </p>
              <div className="mt-auto">
                <span className="text-xs font-semibold uppercase tracking-widest text-kalika-green bg-kalika-green-subtle border border-kalika-green-glow px-4 py-2 rounded-full">
                  Core Feature
                </span>
              </div>
            </div>

            {/* Featured Preview */}
            <div className="flex-1 relative hidden lg:flex items-center justify-center">
              <div className="bg-kalika-bg/50 backdrop-blur-sm border border-kalika-green-glow/30 rounded-2xl p-8 w-full shadow-2xl scale-105">
                <div className="flex gap-3 mb-8">
                  <div className="px-4 py-2 rounded-xl bg-kalika-green text-kalika-bg text-[10px] font-bold uppercase tracking-wider">Nusantara</div>
                  <div className="px-4 py-2 rounded-xl border border-kalika-border text-kalika-muted text-[10px] font-bold uppercase tracking-wider opacity-60">Japanese</div>
                  <div className="px-4 py-2 rounded-xl border border-kalika-border text-kalika-muted text-[10px] font-bold uppercase tracking-wider opacity-40">Islamic</div>
                </div>
                <div className="space-y-4">
                  <div className="h-2.5 bg-kalika-green/30 rounded-full w-full animate-shimmer" />
                  <div className="h-2.5 bg-kalika-green/20 rounded-full w-[85%] animate-shimmer" style={{ animationDelay: '0.2s' }} />
                  <div className="bg-kalika-green-subtle/30 border border-kalika-green-glow/30 rounded-xl p-4 mt-2">
                    <div className="h-2 bg-kalika-green/40 rounded-full w-[95%] mb-2" />
                    <div className="h-2 bg-kalika-green/30 rounded-full w-[70%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {[
            { 
              icon: '📖', 
              tag: 'Accessibility', 
              title: 'Dyslexia-Friendly Structuring', 
              desc: 'Every wall of text broken into short sentences, clear bullet points, and bold keywords. Generous spacing. Clean layout. Because every learner deserves to understand, not just survive.' 
            },
            { 
              icon: '🎮', 
              tag: 'Engagement', 
              title: 'Gamified Mini Quizzes', 
              desc: 'Three culturally-wrapped questions. Five focused minutes. Instant feedback with explanations. Designed for ADHD brains that learn best through urgency, narrative, and quick wins.' 
            },
            { 
              icon: '📚', 
              tag: 'Comprehension', 
              title: 'Bilingual Smart Glossary', 
              desc: 'Every complex academic term decoded in plain English (B1 level) and local cultural context. No more falling into dictionary rabbit holes mid-study session.' 
            },
            { 
              icon: '🖼️', 
              tag: 'Multimodal Input', 
              title: 'Upload Anything: Notes, Photos, Audio', 
              desc: 'Photograph your handwritten notes. Upload a lecture screenshot. Record a voice memo. KALIKA extracts and structures the text using Gemini Vision, then analyzes it through your chosen lens.' 
            },
            { 
              icon: '🔊', 
              tag: 'Audio Learning', 
              title: 'Text-to-Speech with Word Highlight', 
              desc: 'Listen as every word lights up in real time. Choose your playback speed and voice language. Study on your commute, eyes-free. Built for auditory learners and anyone with reading fatigue.' 
            },
          ].map((f, i) => (
            <div key={i} className="reveal bg-kalika-surface border border-kalika-border2 rounded-2xl p-10 flex flex-col gap-8 hover:-translate-y-2 hover:border-kalika-green-glow transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-kalika-green-subtle border border-kalika-green-glow flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-display font-bold text-2xl text-kalika-text leading-snug">
                  {f.title}
                </h3>
                <p className="text-kalika-text-secondary text-base leading-relaxed font-light">
                  {f.desc}
                </p>
              </div>
              <div className="mt-auto pt-6 border-t border-kalika-border">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-kalika-green bg-kalika-green-subtle border border-kalika-green-glow px-4 py-2 rounded-full">
                  {f.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section: How It Works --- */}
      <section id="how-it-works" className="py-28 px-8 max-w-6xl mx-auto z-10 relative">
        <div className="reveal flex flex-col items-center text-center mb-20">
          <span className="text-kalika-green text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">How KALIKA Works</span>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,44px)] leading-tight mb-6">Three steps to understanding</h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-kalika-border z-0" />
          
          {[
            { 
              num: '01', 
              icon: '📥', 
              title: 'Paste or Upload Your Material',
              desc: 'Type lecture notes, paste from a PDF, photograph handwritten notes, or upload an audio recording. KALIKA handles all formats.'
            },
            { 
              num: '02', 
              icon: '🌍', 
              title: 'Choose Your Cultural Lens',
              desc: 'Select from 50+ world cultures. Nusantara, Japanese, Viking, Islamic, Gamer: pick the lens that resonates with you.'
            },
            { 
              num: '03', 
              icon: '✦', 
              title: 'Get Your Personalized Analysis',
              desc: 'Receive a dyslexia-friendly breakdown, cultural analogy, exam boundary warning, and bilingual glossary: all in seconds.'
            }
          ].map((step, i) => (
            <div key={i} className="reveal flex flex-col items-center text-center relative z-10">
              <div className="absolute -top-10 font-display font-extrabold text-7xl text-kalika-green/10 select-none">
                {step.num}
              </div>
              <div className="w-20 h-20 rounded-2xl bg-kalika-surface border border-kalika-green-dim flex items-center justify-center text-3xl mb-8 shadow-xl">
                {step.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-kalika-text mb-4 px-4">{step.title}</h3>
              <p className="text-kalika-text-secondary text-base leading-relaxed font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section: Personas --- */}
      <section id="personas" className="py-28 px-8 bg-kalika-surface border-y border-kalika-border z-10 relative">
        <div className="reveal flex flex-col items-center text-center max-w-3xl mx-auto mb-20 text-balance">
          <span className="text-kalika-green text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">Who It's For</span>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,44px)] leading-tight mb-4">Built for every kind of mind</h2>
          <p className="text-kalika-text-secondary text-lg font-light leading-relaxed max-w-2xl">
            No learner gets left behind. Whether you're navigating dyslexia, ADHD, or a multicultural background, KALIKA adapts to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {[
            { 
              tag: 'Dyslexia', 
              icon: '🧠', 
              title: 'The Deliberate Learner', 
              role: 'Dyslexia / Reading difficulty',
              quote: 'I used to avoid dense lecture slides. Now I paste them into KALIKA and get clear, spaced-out bullet points I can actually process — in my own cultural language.',
              features: ['Dyslexia-Friendly Text', 'TTS Highlight', 'Bilingual Glossary'],
              color: 'border-kalika-green'
            },
            { 
              tag: 'ADHD', 
              icon: '⚡', 
              title: 'The Sprint Learner', 
              role: 'ADHD / Focus challenges',
              quote: 'ADHD makes focused reading hard, especially for dry subjects. The mini quizzes give me that quick hit of challenge I need to actually stay engaged with the material.',
              features: ['Gamified Quizzes', 'Audio Scholar', 'Narrative Analogies'],
              color: 'border-amber-500'
            },
            { 
              tag: 'Global', 
              icon: '🌏', 
              title: 'The Global Scholar', 
              role: 'International / Multicultural',
              quote: 'Explaining recursion through the Mahabharata? That clicked in 30 seconds what three lectures never could. Finally, software engineering makes sense to my brain.',
              features: ['50+ Cultural Lenses', 'Multimodal Input', 'Multilingual TTS'],
              color: 'border-sky-500'
            }
          ].map((p, i) => (
            <div key={i} className="reveal bg-kalika-bg border border-kalika-border2 rounded-2xl p-10 flex flex-col gap-8 transition-all duration-300 hover:border-kalika-green/30">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-kalika-surface border border-kalika-border flex items-center justify-center text-3xl shadow-lg leading-none">
                  {p.icon}
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-kalika-text">{p.title}</h4>
                  <div className="text-kalika-muted text-xs font-bold uppercase tracking-widest mt-1">{p.tag}</div>
                </div>
              </div>
              
              <div className="text-sm font-medium text-kalika-muted/80">{p.role}</div>

              <div className={`bg-kalika-surface border-l-4 ${p.color} p-6 rounded-r-2xl shadow-inner`}>
                <p className="text-base text-kalika-text-secondary leading-relaxed italic font-light">
                  "{p.quote}"
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.features.map(f => (
                  <span key={f} className="text-[10px] font-bold text-kalika-muted uppercase tracking-wider bg-kalika-surface border border-kalika-border px-3 py-1.5 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section: Testimonials --- */}
      <section className="py-24 bg-kalika-surface/50 border-y border-kalika-border relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto px-8 mb-16 text-center">
          <span className="text-kalika-green text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">What learners say</span>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,40px)] leading-tight mb-4 text-kalika-text">World-class insights from world-class scholars</h2>
        </div>

        <div className="flex flex-col gap-8">
          {/* Row 1 (Cards 0-3) - Scrolls Left */}
          <div className="flex overflow-hidden">
            <div className="flex gap-6 animate-marquee shrink-0" style={{ animationDuration: '35s' }}>
              {[...TESTIMONIALS.slice(0, 4), ...TESTIMONIALS.slice(0, 4)].map((t, i) => (
                <div key={i} className="min-w-80 max-w-sm flex-shrink-0 bg-kalika-bg border border-kalika-border2 rounded-2xl p-8 flex flex-col gap-5 hover:border-kalika-green/40 transition-colors group">
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                  <p className="text-sm text-kalika-text-secondary leading-relaxed italic font-light">"{t.quote}"</p>
                  <div className="flex items-center gap-4 border-t border-kalika-border pt-4 mt-auto">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      t.color === 'green' ? 'bg-kalika-green-subtle text-kalika-green' :
                      t.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                      t.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                      t.color === 'amber' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-teal-500/10 text-teal-400'
                    }`}>
                      {t.initial}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-sm text-kalika-text">{t.name}</div>
                      <div className="text-[10px] text-kalika-muted font-bold uppercase tracking-widest">{t.university}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 (Cards 4-7) - Scrolls Right */}
          <div className="flex overflow-hidden">
            <div className="flex gap-6 animate-marquee2 shrink-0" style={{ animationDuration: '40s' }}>
               {[...TESTIMONIALS.slice(4, 8), ...TESTIMONIALS.slice(4, 8)].map((t, i) => (
                <div key={i} className="min-w-80 max-w-sm flex-shrink-0 bg-kalika-bg border border-kalika-border2 rounded-2xl p-8 flex flex-col gap-5 hover:border-kalika-green/40 transition-colors group">
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                  <p className="text-sm text-kalika-text-secondary leading-relaxed italic font-light">"{t.quote}"</p>
                  <div className="flex items-center gap-4 border-t border-kalika-border pt-4 mt-auto">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      t.color === 'green' ? 'bg-kalika-green-subtle text-kalika-green' :
                      t.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                      t.color === 'purple' ? 'bg-purple-500/10 text-purple-400' :
                      t.color === 'amber' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-teal-500/10 text-teal-400'
                    }`}>
                      {t.initial}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-sm text-kalika-text">{t.name}</div>
                      <div className="text-[10px] text-kalika-muted font-bold uppercase tracking-widest">{t.university}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Section: Pricing --- */}
      <section id="pricing" className="py-28 px-8 max-w-6xl mx-auto z-10 relative">
        <div className="reveal flex flex-col items-center text-center mb-16">
          <span className="bg-kalika-green-subtle border border-kalika-green-dim text-kalika-green text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Free for Hackathon Demo
          </span>
          <h2 className="font-display font-extrabold text-[clamp(28px,4vw,52px)] leading-tight mb-6">Try KALIKA: completely free</h2>
          <p className="text-kalika-text-secondary text-lg font-light leading-relaxed max-w-2xl">
            No account needed. No payment. Just paste your material 
            and start learning in your cultural language.
          </p>
        </div>

        <div className="reveal bg-kalika-surface border-2 border-kalika-green-glow rounded-[40px] p-16 max-w-xl mx-auto shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-kalika-green/10 blur-3xl pointer-events-none group-hover:bg-kalika-green/20 transition-all" />
          
          <div className="relative text-center">
            <div className="font-display font-extrabold text-7xl text-kalika-green mb-2 tracking-tighter">FREE</div>
            <div className="text-kalika-muted text-xs uppercase font-bold tracking-[0.3em] mb-12">During Hackathon Demo Period</div>
            
            <ul className="space-y-4 mb-12 text-left inline-block">
              {[
                'Unlimited analyses',
                'All 50+ cultural lenses',
                'Mini quiz generation',
                'Multimodal input (image + audio)',
                'Text-to-speech with 20+ voices',
                'Bilingual glossary',
                'History saved locally'
              ].map(f => (
                <li key={f} className="flex items-center gap-3 text-kalika-text-secondary font-light">
                  <span className="text-kalika-green">✓</span> {f}
                </li>
              ))}
            </ul>

            <Link href="/app" className="block bg-kalika-green text-kalika-bg py-5 px-10 rounded-2xl font-display font-bold text-xl hover:-translate-y-1 hover:shadow-2xl hover:bg-green-300 transition-all duration-300">
              ✦ Launch KALIKA Now
            </Link>
            
            <p className="mt-8 text-[10px] text-kalika-muted font-bold uppercase tracking-widest">
              Built by students, for students · 2026 KALIKA
            </p>
          </div>
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

        {/* BAGONG MASCOT — Decorative background element restored to prominence */}
        <div className="absolute -right-16 -bottom-10 w-96 h-auto opacity-30 pointer-events-none z-0 animate-float">
          <Image
            src="/images/bagong.png"
            alt="Bagong Mascot"
            width={400}
            height={500}
            className="object-contain object-bottom w-full h-auto"
            aria-hidden="true"
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}
