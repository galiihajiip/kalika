'use client'

import { useState, useMemo, useEffect } from 'react'
import { useKalikaStore } from '@/store/useKalikaStore'
import type { LensType } from '@/types'

// ─── Constants & Types ─────────────────────────────────────────────
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
  // Asia (SE, East, South)
  { id: 'nusantara', emoji: '🌴', label: 'Nusantara', region: 'Asia', desc: 'Indonesian cultural analogies: wayang, gotong royong, pasar traditions.', example: 'e.g. A system is like a busy traditional market...' },
  { id: 'malay', emoji: '🌺', label: 'Malay', region: 'Asia', desc: 'Malay traditions: pantun, adat layers, kampong connections.', example: 'e.g. A function returning data is like a balasan pantun...' },
  { id: 'filipino', emoji: '🥥', label: 'Filipino', region: 'Asia', desc: 'Bayanihan community, jeepney networks, fiesta spirit.', example: 'e.g. Network routing is like navigating jeepney routes...' },
  { id: 'thai', emoji: '🐘', label: 'Thai', region: 'Asia', desc: 'Thai temples, muay thai discipline, sanuk philosophy.', example: 'e.g. Data hierarchy is like the tiers of a Wat temple...' },
  { id: 'vietnamese', emoji: '🍜', label: 'Vietnamese', region: 'Asia', desc: 'Rice paddy terracing, Pho broth building, Confucian family.', example: 'e.g. Layered architecture is like terraced rice paddies...' },
  { id: 'burmese', emoji: '🛕', label: 'Burmese', region: 'Asia', desc: 'Pagoda layers, merit-making, Thingyan water festival.', example: 'e.g. App lifecycles reset like the Thingyan festival...' },
  { id: 'chinese', emoji: '🐉', label: 'Chinese', region: 'Asia', desc: 'Confucius, Sun Tzu strategies, guanxi networking.', example: 'e.g. Node connectivity is like human Guanxi networks...' },
  { id: 'japanese', emoji: '🌸', label: 'Japanese', region: 'Asia', desc: 'Bushido discipline, kaizen iteration, origami folding.', example: 'e.g. Refactoring code is like the Kaizen process...' },
  { id: 'korean', emoji: '🍜', label: 'Korean', region: 'Asia', desc: 'Nunchi (room reading), ppali-ppali speed, Kdrama twists.', example: 'e.g. Context sensing is like practicing Nunchi...' },
  { id: 'taiwanese', emoji: '🧋', label: 'Taiwanese', region: 'Asia', desc: 'Night markets, bubble tea mixing, semiconductor hubs.', example: 'e.g. Microservices act like bustling night market stalls...' },
  { id: 'mongolian', emoji: '🐎', label: 'Mongolian', region: 'Asia', desc: 'Nomadic steppe mobility, Genghis Khan relay system.', example: 'e.g. Fast packet passing was like the Yam relay system...' },
  { id: 'indian_hindi', emoji: '🪷', label: 'Indian (North)', region: 'Asia', desc: 'Mahabharata dharma, Bollywood arcs, cricket strategy.', example: 'e.g. Variable states brew over time like making chai...' },
  { id: 'indian_tamil', emoji: '🥥', label: 'Indian (South)', region: 'Asia', desc: 'Thirukkural compressed wisdom, Carnatic raga, gopurams.', example: 'e.g. Twin statements act like Thirukkural couplets...' },
  { id: 'bengali', emoji: '🐅', label: 'Bengali', region: 'Asia', desc: 'Tagore poetry, monsoon dynamics, rickshaw networks.', example: 'e.g. Processing floods of data is like the monsoon...' },
  { id: 'nepali', emoji: '🏔️', label: 'Nepali', region: 'Asia', desc: 'Sherpa teamwork, basecamps, Himalayan peaks.', example: 'e.g. Staging environments act like Everest basecamps...' },
  { id: 'sinhala', emoji: '🐘', label: 'Sinhala', region: 'Asia', desc: 'Tea plantations, spice ports, Buddhist Jataka.', example: 'e.g. Supply chains mimic ancient spice trade routes...' },

  // Islamic World
  { id: 'islamic_arabic', emoji: '🕌', label: 'Arabic', region: 'Islamic World', desc: '1001 Nights recursion, golden age scholars, desert trade.', example: 'e.g. Recursive loops are like tales within tales in 1001 Nights...' },
  { id: 'islamic_persian', emoji: '📜', label: 'Persian', region: 'Islamic World', desc: 'Rumi poetry, intricate carpets, chess origins.', example: 'e.g. Data weaving is like the knotting of a Persian carpet...' },
  { id: 'islamic_turkish', emoji: '☕', label: 'Turkish', region: 'Islamic World', desc: 'Ottoman bureaucracy, grand bazaars, Nasreddin logic.', example: 'e.g. Central exchanges act like the Grand Bazaar...' },
  { id: 'islamic_malay', emoji: '🕌', label: 'Malay Islamic', region: 'Islamic World', desc: 'Pesantren structures, selawat rhythms, local synthesis.', example: 'e.g. Distributed learning is like the pondok boarding model...' },
  { id: 'bedouin', emoji: '🐫', label: 'Bedouin', region: 'Islamic World', desc: 'Star navigation, camel caching, deep hospitality.', example: 'e.g. Resource caching is like a camel storing water...' },

  // Africa
  { id: 'west_african', emoji: '🥁', label: 'West African', region: 'Africa', desc: 'Ubuntu interdependence, griot memory, kente patterns.', example: 'e.g. Distributed nodes reflect the Ubuntu philosophy...' },
  { id: 'east_african', emoji: '🦁', label: 'East African', region: 'Africa', desc: 'Swahili trade bridging, savanna migrations, marathons.', example: 'e.g. Long-running processes are like marathon pacing...' },
  { id: 'north_african', emoji: '🏺', label: 'North African', region: 'Africa', desc: 'Kasbah security, Sahara divides, Ibn Battuta exploration.', example: 'e.g. Fortified gateways act like a desert Kasbah...' },
  { id: 'south_african', emoji: '🌈', label: 'South African', region: 'Africa', desc: 'Rainbow nation multi-threading, veld resilience.', example: 'e.g. Concurrent processing is like a Rainbow Nation harmony...' },
  { id: 'ethiopian', emoji: '☕', label: 'Ethiopian', region: 'Africa', desc: 'Coffee ceremony procedures, monolithic Lalibela.', example: 'e.g. A multi-step transaction is like the coffee ceremony...' },

  // Europe
  { id: 'western', emoji: '🌍', label: 'Western (Pop)', region: 'Europe', desc: 'Netflix, startup silos, modern coffee culture, tech.', example: 'e.g. Services scale just like a tech startup spinning up servers...' },
  { id: 'nordic', emoji: '❄️', label: 'Nordic', region: 'Europe', desc: 'Lagom precision, hygge UX, longship coordination.', example: 'e.g. Optimized limits reflect the Lagom ideal...' },
  { id: 'mediterranean', emoji: '🍅', label: 'Mediterranean', region: 'Europe', desc: 'Siesta garbage collection, piazzas, olive pressing.', example: 'e.g. System idle states are like a midday siesta...' },
  { id: 'greek_classical', emoji: '🏛️', label: 'Greek (Class.)', region: 'Europe', desc: 'Socratic dialogue, Olympic optimization, archetypes.', example: 'e.g. Validation loops act like the Socratic method...' },
  { id: 'slavic', emoji: '🪆', label: 'Slavic', region: 'Europe', desc: 'Matryoshka doll recursion, banya resilience, space race.', example: 'e.g. Nested functions are exactly like Matryoshka dolls...' },
  { id: 'celtic', emoji: '☘️', label: 'Celtic', region: 'Europe', desc: 'Oral pub tales, intricate knots, navigating mists.', example: 'e.g. Infinite loops resemble a Celtic knot...' },

  // Americas
  { id: 'latin_american', emoji: '💃', label: 'Latin American', region: 'Americas', desc: 'Carnival synchrony, telenovela states, magical realism.', example: 'e.g. Clock cycles mimic the rhythm of a Samba school...' },
  { id: 'mexican', emoji: '🌮', label: 'Mexican', region: 'Americas', desc: 'Mestizo hybridity, Día de Muertos altars, mariachi.', example: 'e.g. Hierarchical layering is like an ofrenda altar...' },
  { id: 'andean', emoji: '🦙', label: 'Andean', region: 'Americas', desc: 'Inca Quipu data strings, Machu Picchu mortarless architecture.', example: 'e.g. Data serialization is like Quipu knots...' },
  { id: 'native_american', emoji: '🦅', label: 'Native Amer.', region: 'Americas', desc: 'Totem pole ledgers, tracking logic, powwow assemblies.', example: 'e.g. Immutable blockchains mirror standing Totem poles...' },
  { id: 'caribbean', emoji: '🏝️', label: 'Caribbean', region: 'Americas', desc: 'Reggae syncopation, archipelago routing, rum refinement.', example: 'e.g. Asynchronous tasks flow like Reggae syncopation...' },
  { id: 'north_american', emoji: '🏈', label: 'North Amer.', region: 'Americas', desc: 'Wild West frontiers, NFL complex playbooks, highways.', example: 'e.g. Branching decision trees are like an NFL playbook...' },

  // Ancient Timeless
  { id: 'ancient_egyptian', emoji: '🐪', label: 'Egyptian', region: 'Ancient', desc: 'Nile cyclic floods, pyramid monoliths, hieroglyphs.', example: 'e.g. Predictable bursts resemble the flooding of the Nile...' },
  { id: 'mesopotamian', emoji: '🏺', label: 'Mesopotamian', region: 'Ancient', desc: 'Hammurabi rigid code, cuneiform logs, ziggurats.', example: 'e.g. Strict validation resembles the Code of Hammurabi...' },
  { id: 'roman', emoji: '🛡️', label: 'Roman', region: 'Ancient', desc: 'Legion array execution, aqueduct pipelines, Senate.', example: 'e.g. Continuous data streaming acts like a Roman aqueduct...' },
  { id: 'aztec_maya', emoji: '☀️', label: 'Aztec/Maya', region: 'Ancient', desc: 'Cyclic calendars, chinampa farming, ritual sacrifice.', example: 'e.g. Cyclic Cron jobs mirror the Mayan calendar rounds...' },
  { id: 'viking', emoji: '🪓', label: 'Viking', region: 'Ancient', desc: 'Flexible longships, aggressive harvesting, sage logs.', example: 'e.g. Flexible server architecture is like a longship bending in storms...' },
  { id: 'hindu_vedic', emoji: '🧘', label: 'Hindu/Vedic', region: 'Ancient', desc: 'Karma feedback loops, dharma type-checking, zero base.', example: 'e.g. Program state loops map perfectly to Karma...' },

  // Special
  { id: 'gamer', emoji: '🎮', label: 'Gamer', region: 'Special', desc: 'Quest trees, XP leveling, boss attack phases, respawns.', example: 'e.g. Problem decomposition is like learning boss attack patterns...' },
  { id: 'internet', emoji: '🌐', label: 'Internet/Meme', region: 'Special', desc: 'Viral algorithms, NPC logic, speedrun exploits.', example: 'e.g. Hacky shortcuts perform like a speedrun exploit...' },
  { id: 'sports_universal', emoji: '🏆', label: 'Sports', region: 'Special', desc: 'Relay batons, team arrays, scoreboard aggregations.', example: 'e.g. Memory handoffs are exactly like a relay race baton pass...' },
  { id: 'scientific', emoji: '🔬', label: 'Scientific', region: 'Special', desc: 'Hypothesis testing, double-blind checks, peer review.', example: 'e.g. TDD (Test-Driven) acts like a strict lab hypothesis cycle...' },
  { id: 'musical', emoji: '🎵', label: 'Musical', region: 'Special', desc: 'Jazz improv async, orchestral orchestration, crescendos.', example: 'e.g. Managing microservices is like a conductor leading an orchestra...' },
]

const TABS: RegionTab[] = ['Asia', 'Islamic World', 'Africa', 'Europe', 'Americas', 'Ancient', 'Special']

// ─── Component ─────────────────────────────────────────────────────

export default function LensSelector() {
  const { selectedLens, setSelectedLens } = useKalikaStore()

  const [activeTab, setActiveTab] = useState<RegionTab>('Asia')
  const [searchQuery, setSearchQuery] = useState('')
  const [recentLenses, setRecentLenses] = useState<LensType[]>([])

  // Load recents on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kalika-recent-lenses')
      if (stored) setRecentLenses(JSON.parse(stored))
    } catch {
      // ignore
    }
  }, [])

  // Filter items
  const displayItems = useMemo(() => {
    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase()
      return LENS_ITEMS.filter(item => 
        item.label.toLowerCase().includes(lower) || 
        item.desc.toLowerCase().includes(lower) || 
        item.region.toLowerCase().includes(lower)
      )
    }
    return LENS_ITEMS.filter((item) => item.region === activeTab)
  }, [searchQuery, activeTab])

  // Get active lens object
  const activeObj = useMemo(() => LENS_ITEMS.find((l) => l.id === selectedLens), [selectedLens])

  const handleSelect = (id: LensType) => {
    setSelectedLens(id)

    // Update recents
    let updated = [id, ...recentLenses.filter(l => l !== id)].slice(0, 3)
    setRecentLenses(updated)
    localStorage.setItem('kalika-recent-lenses', JSON.stringify(updated))
  }

  return (
    <div className="flex flex-col gap-3">
      
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search culture... (e.g. Viking, Japan, Music)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-[var(--surface-card)] border border-[var(--surface-border)] rounded-lg text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--kalika-primary)]"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">✕</button>
        )}
      </div>

      {/* Recents */}
      {!searchQuery && recentLenses.length > 0 && (
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Recently Used:</span>
          {recentLenses.map(recId => {
            const l = LENS_ITEMS.find(x => x.id === recId)
            if (!l) return null
            return (
              <button
                key={`rec-${recId}`}
                onClick={() => handleSelect(l.id)}
                className={`px-2 py-0.5 rounded text-xs border ${
                  selectedLens === l.id 
                    ? 'bg-[var(--kalika-primary)] text-white border-transparent' 
                    : 'bg-[var(--surface-card)] text-[var(--text-secondary)] border-[var(--surface-border)] hover:border-[var(--kalika-primary)]'
                }`}
              >
                {l.emoji} {l.label}
              </button>
            )
          })}
        </div>
      )}

      {/* Region Tabs (Scrollable horizontally) */}
      {!searchQuery && (
        <div className="flex overflow-x-auto gap-1 pb-1 scrollbar-hide -mx-1 px-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab
                  ? 'bg-[var(--text-primary)] text-[var(--surface-bg)]'
                  : 'bg-[var(--surface-muted)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Dynamic Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[160px] overflow-y-auto pr-1">
        {displayItems.length === 0 && (
          <div className="col-span-full py-4 text-center text-sm text-[var(--text-muted)]">
            No cultures found matching "{searchQuery}"
          </div>
        )}
        
        {displayItems.map((lens) => {
          const isActive = selectedLens === lens.id
          
          return (
            <div key={lens.id} className="relative group">
              <button
                type="button"
                onClick={() => handleSelect(lens.id)}
                className={`w-full flex items-center justify-start gap-2 px-3 py-2.5 rounded-xl border
                  font-semibold text-xs transition-all duration-150 text-left
                  ${isActive
                    ? 'bg-[var(--kalika-primary)] text-white border-transparent shadow-md scale-[1.02]'
                    : 'bg-[var(--surface-card)] border-[var(--surface-border)] text-[var(--text-secondary)] hover:border-[var(--kalika-primary)]/50 hover:bg-[var(--surface-muted)]'
                  }`}
              >
                <span className={`text-base leading-none ${isActive ? '' : 'grayscale group-hover:grayscale-0'}`}>
                  {lens.emoji}
                </span>
                <span className={`truncate ${isActive ? 'font-bold' : ''}`}>{lens.label}</span>
              </button>
              
              {/* Tooltip */}
              <div role="tooltip" className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 w-48 px-3 py-2 rounded-lg z-50 bg-[var(--text-primary)] text-[var(--surface-bg)] text-xs leading-snug text-center opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 origin-bottom shadow-lg">
                {lens.desc}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--text-primary)]" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Active Selection Preview Card */}
      {activeObj && (
        <div className="mt-2 p-4 rounded-xl border border-[var(--kalika-primary)]/30 bg-gradient-to-br from-[var(--kalika-primary)]/5 to-transparent">
          <div className="flex items-start gap-3">
            <span className="text-3xl leading-none pt-1">{activeObj.emoji}</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                {activeObj.label} Lens
                <span className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider bg-[var(--kalika-primary)]/10 text-[var(--kalika-primary)] border border-[var(--kalika-primary)]/20">
                  {activeObj.region}
                </span>
              </h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                {activeObj.desc}
              </p>
              <p className="text-xs text-[var(--kalika-primary)] italic mt-2 font-medium">
                {activeObj.example}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
