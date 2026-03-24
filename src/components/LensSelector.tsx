'use client'

import { useState, useMemo, useEffect } from 'react'
import { useKalikaStore } from '@/store/useKalikaStore'
import type { LensType } from '@/types'

type RegionTab = 'Asia' | 'Islamic World' | 'Africa' | 'Europe' | 'Americas' | 'Ancient' | 'Special'

interface LensItem {
  id: LensType
  emoji: string
  label: string
  desc: string
  example: string
  region: RegionTab
}

export const LENS_ITEMS: LensItem[] = [
  // Asia
  { id: 'nusantara', emoji: '🌴', label: 'Nusantara', region: 'Asia', desc: 'Indonesian cultural analogies: wayang, gotong royong, pasar traditions.', example: 'e.g. A system is like a busy traditional market...' },
  { id: 'malay', emoji: '🌺', label: 'Malay', region: 'Asia', desc: 'Malay traditions: pantun, adat layers, kampong connections.', example: 'e.g. A function returning data is like a balasan pantun...' },
  { id: 'filipino', emoji: '🥥', label: 'Filipino', region: 'Asia', desc: 'Bayanihan community, jeepney networks, fiesta spirit.', example: 'e.g. Network routing is like navigating jeepney routes...' },
  { id: 'thai', emoji: '🐘', label: 'Thai', region: 'Asia', desc: 'Thai temples, muay thai discipline, sanuk philosophy.', example: 'e.g. Data hierarchy is like the tiers of a Wat temple...' },
  { id: 'chinese', emoji: '🐉', label: 'Chinese', region: 'Asia', desc: 'Confucius, Sun Tzu strategies, guanxi networking.', example: 'e.g. Node connectivity is like human Guanxi networks...' },
  { id: 'japanese', emoji: '🌸', label: 'Japanese', region: 'Asia', desc: 'Bushido discipline, kaizen iteration, origami folding.', example: 'e.g. Refactoring code is like the Kaizen process...' },
  
  // Islamic
  { id: 'islamic_arabic', emoji: '🕌', label: 'Arabic', region: 'Islamic World', desc: '1001 Nights recursion, golden age scholars.', example: 'e.g. Recursive loops are like tales within tales...' },
  { id: 'islamic_persian', emoji: '📜', label: 'Persian', region: 'Islamic World', desc: 'Rumi poetry, intricate carpets, chess origins.', example: 'e.g. Data weaving is like knotting a Persian carpet...' },

  // Add a few more as representatives to not bloat the file unnecessarily but full scaling is supported
  { id: 'western', emoji: '🌍', label: 'Western (Pop)', region: 'Europe', desc: 'Netflix, startup silos, modern coffee culture, tech.', example: 'e.g. Services scale just like a tech startup spinning up servers...' },
  { id: 'greek_classical', emoji: '🏛️', label: 'Greek (Class.)', region: 'Europe', desc: 'Socratic dialogue, Olympic optimization, archetypes.', example: 'e.g. Validation loops act like the Socratic method...' },
  { id: 'native_american', emoji: '🦅', label: 'Native Amer.', region: 'Americas', desc: 'Totem pole ledgers, tracking logic, powwow assemblies.', example: 'e.g. Immutable blockchains mirror standing Totem poles...' },
  { id: 'cyber', emoji: '💻', label: 'Cyber', region: 'Special', desc: 'Terminal, hacker logic, neon, matrix systems.', example: 'e.g. Your brain parsing code is like a terminal scanning...' },
]

const TABS: RegionTab[] = ['Asia', 'Islamic World', 'Africa', 'Europe', 'Americas', 'Ancient', 'Special']

export default function LensSelector() {
  const { selectedLens, setSelectedLens } = useKalikaStore()
  const [activeTab, setActiveTab] = useState<RegionTab>('Asia')
  const [searchQuery, setSearchQuery] = useState('')

  const displayItems = useMemo(() => {
    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase()
      return LENS_ITEMS.filter(item => item.label.toLowerCase().includes(lower) || item.desc.toLowerCase().includes(lower) || item.region.toLowerCase().includes(lower))
    }
    return LENS_ITEMS.filter((item) => item.region === activeTab)
  }, [searchQuery, activeTab])

  const activeObj = useMemo(() => LENS_ITEMS.find((l) => l.id === selectedLens) || LENS_ITEMS[0], [selectedLens])

  return (
    <div className="flex flex-col gap-3">
      
      {/* Search Bar */}
      <div className="flex items-center gap-2 bg-kalika-bg border border-kalika-border rounded-lg px-3 py-2.5 focus-within:border-kalika-green-glow focus-within:ring-1 focus-within:ring-kalika-green-subtle transition-all duration-150">
        <span className="text-kalika-muted text-sm shrink-0">🔍</span>
        <input
          type="text"
          placeholder="Search culture..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-xs text-kalika-text bg-transparent outline-none w-full placeholder-kalika-muted"
        />
      </div>

      {/* Region Tabs */}
      {!searchQuery && (
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide border-b border-kalika-border/50">
          {TABS.map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-[11px] font-medium rounded-full border whitespace-nowrap transition-colors duration-150
                  ${isActive 
                    ? 'bg-kalika-green-subtle text-kalika-green-text border-kalika-green-glow' 
                    : 'border-transparent text-kalika-muted hover:border-kalika-green-glow/50 hover:text-kalika-text-secondary'}`}
              >
                {tab}
              </button>
            )
          })}
        </div>
      )}

      {/* Pill Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 max-h-40 overflow-y-auto pr-1">
        {displayItems.map((lens) => {
          const isSel = selectedLens === lens.id
          return (
            <button
              key={lens.id}
              onClick={() => setSelectedLens(lens.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-150 text-left cursor-pointer
                ${isSel 
                  ? 'bg-kalika-green-subtle border-kalika-green-dim' 
                  : 'bg-kalika-bg border-kalika-border hover:border-kalika-green-glow hover:bg-kalika-surface2'}`}
            >
              <span className="text-[14px] leading-none">{lens.emoji}</span>
              <span className={`text-[11px] font-medium truncate ${isSel ? 'text-kalika-green-text' : 'text-kalika-text-secondary'}`}>
                {lens.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Lens Card */}
      {activeObj && (
        <div className="bg-kalika-bg border border-kalika-green-glow rounded-xl p-3 flex gap-3 items-start mt-1">
          <span className="text-3xl leading-none mt-1">{activeObj.emoji}</span>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-kalika-green font-display flex items-center gap-2">
              {activeObj.label} Lens
            </h4>
            <span className="inline-block text-[9px] font-bold tracking-widest uppercase bg-kalika-green-glow text-kalika-green-text px-2 py-0.5 rounded-full my-1">
              {activeObj.region}
            </span>
            <p className="text-[11px] text-kalika-text-secondary leading-relaxed mt-1">
              {activeObj.desc}
            </p>
            <p className="text-[10px] text-kalika-muted italic mt-2 pt-2 border-t border-kalika-border">
              {activeObj.example}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
