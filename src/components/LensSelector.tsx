'use client'

import { useState, useMemo } from 'react'
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
  // --- ASIA ---
  { id: 'nusantara', emoji: '🌴', label: 'Nusantara', region: 'Asia', desc: 'Indonesian cultural analogies: wayang, gotong royong, pasar traditions.', example: 'e.g. A system is like a busy traditional market.' },
  { id: 'malay', emoji: '🌺', label: 'Malay', region: 'Asia', desc: 'Malay traditions: pantun, adat layers, kampong connections.', example: 'e.g. A function returning data is like a balasan pantun.' },
  { id: 'filipino', emoji: '🥥', label: 'Filipino', region: 'Asia', desc: 'Bayanihan community, jeepney networks, fiesta spirit.', example: 'e.g. Network routing is like navigating jeepney routes.' },
  { id: 'thai', emoji: '🐘', label: 'Thai', region: 'Asia', desc: 'Thai temples, muay thai discipline, sanuk philosophy.', example: 'e.g. Data hierarchy is like the tiers of a Wat temple.' },
  { id: 'vietnamese', emoji: '🍜', label: 'Vietnamese', region: 'Asia', desc: 'Confucian family values, rice farming layers, pho brewing.', example: 'e.g. A process building up is like a pho broth simmering.' },
  { id: 'burmese', emoji: '⛩️', label: 'Burmese', region: 'Asia', desc: 'Pagoda stupas, alms ceremonies, longyi weaving.', example: 'e.g. Data layers are like the stupas of Shwedagon.' },
  { id: 'chinese', emoji: '🐉', label: 'Chinese', region: 'Asia', desc: 'Confucius, Sun Tzu strategies, guanxi networking.', example: 'e.g. Node connectivity is like human Guanxi networks.' },
  { id: 'japanese', emoji: '🌸', label: 'Japanese', region: 'Asia', desc: 'Bushido discipline, kaizen iteration, origami folding.', example: 'e.g. Refactoring code is like the Kaizen process.' },
  { id: 'korean', emoji: '🎭', label: 'Korean', region: 'Asia', desc: 'Nunchi context, ppali-ppali speed, K-drama twists.', example: 'e.g. Efficiency tradeoffs are like ppali-ppali culture.' },
  { id: 'taiwanese', emoji: '🧋', label: 'Taiwanese', region: 'Asia', desc: 'Night markets, high-tech factories, tea culture.', example: 'e.g. Modular systems are like mixing ingredients in boba.' },
  { id: 'mongolian', emoji: '🐎', label: 'Mongolian', region: 'Asia', desc: 'Nomadic yurts, steppe endurance, relay missions.', example: 'e.g. Scalable nodes are like portable nomadic gers.' },
  { id: 'indian_hindi', emoji: '🏏', label: 'Hindi (Ind)', region: 'Asia', desc: 'Cricket strategy, dharma logic, chai parameters.', example: 'e.g. Decision paths are like Arjuna’s Dharma dilemma.' },
  { id: 'indian_tamil', emoji: '💃', label: 'Tamil (Ind)', region: 'Asia', desc: 'Carnatic structure, Sangam poetry, temple gopurams.', example: 'e.g. Hierarchies are like gopuram temple tiers.' },
  { id: 'bengali', emoji: '🍛', label: 'Bengali', region: 'Asia', desc: 'Tagore philosophy, monsoon rains, cycle-rickshaws.', example: 'e.g. Data floods are like monsoon rains in Sundarbans.' },
  { id: 'nepali', emoji: '🏔️', label: 'Nepali', region: 'Asia', desc: 'Sherpa teamwork, Everest basecamps, Gurkha bravery.', example: 'e.g. Staging environments are like Everest basecamps.' },
  { id: 'sinhala', emoji: '🎣', label: 'Sinhala', region: 'Asia', desc: 'Stilt fishing, tea plantations, Buddhist Jataka tales.', example: 'e.g. Specialized stability is like stilt fishing.' },

  // --- ISLAMIC WORLD ---
  { id: 'islamic_arabic', emoji: '🕌', label: 'Arabic', region: 'Islamic World', desc: '1001 Nights recursion, Golden Age scholars.', example: 'e.g. Recursive loops are like tales within 1001 Nights.' },
  { id: 'islamic_persian', emoji: '📜', label: 'Persian', region: 'Islamic World', desc: 'Rumi poetry, intricate carpets, chess origins.', example: 'e.g. Complexity is like knotting a Persian carpet.' },
  { id: 'islamic_turkish', emoji: '🧿', label: 'Turkish', region: 'Islamic World', desc: 'Grand Bazaar barter, Ottoman Vilayets, Hammams.', example: 'e.g. Exchange nodes are like the Grand Bazaar stalls.' },
  { id: 'islamic_malay', emoji: '🌙', label: 'Malay (Isl.)', region: 'Islamic World', desc: 'Pesantren models, selawatan rhythm, Sharia custom.', example: 'e.g. Synchronized logic cycles are like selawatan.' },
  { id: 'bedouin', emoji: '⛺', label: 'Bedouin', region: 'Islamic World', desc: 'Oasis resources, star-navigation, hospitality.', example: 'e.g. Networking discovery is like finding an oasis.' },

  // --- AFRICA ---
  { id: 'west_african', emoji: '🥁', label: 'West African', region: 'Africa', desc: 'Ubuntu (Interdependence), Griot history, Kente weaving.', example: 'e.g. Distributed networks are like Ubuntu philosophy.' },
  { id: 'east_african', emoji: '🦒', label: 'East African', region: 'Africa', desc: 'Coastal Swahili trade, Serengeti data flow.', example: 'e.g. Bridging protocols are like Swahili trade paths.' },
  { id: 'north_african', emoji: '🐪', label: 'North African', region: 'Africa', desc: 'Sahara boundaries, Kasbah security, Souk markets.', example: 'e.g. Local firewalls are like Kasbah fortresses.' },
  { id: 'south_african', emoji: '🇿🇦', label: 'South African', region: 'Africa', desc: 'Rainbow nation multi-threading, veld survival.', example: 'e.g. Cooperative systems are like a rainbow nation.' },
  { id: 'ethiopian', emoji: '☕', label: 'Ethiopian', region: 'Africa', desc: 'Coffee ceremonies, monolithic rock-hewn churches.', example: 'e.g. Monolithic architecture like Lalibela churches.' },

  // --- EUROPE ---
  { id: 'western', emoji: '🌍', label: 'Western', region: 'Europe', desc: 'Netflix streaming, Silicon Valley silos, startups.', example: 'e.g. Scaling is like a tech startup spinning up servers.' },
  { id: 'nordic', emoji: '⛵', label: 'Nordic', region: 'Europe', desc: 'Lagom optimization, Hygge UX, Viking Yggdrasil.', example: 'e.g. Balanced loads are like the concept of Lagom.' },
  { id: 'mediterranean', emoji: '🫒', label: 'Mediterra.', region: 'Europe', desc: 'Siesta scheduling, piazza traffic, olive pressing.', example: 'e.g. Garbage collection is like the siesta downtime.' },
  { id: 'greek_classical', emoji: '🏛️', label: 'Greek (Class)', region: 'Europe', desc: 'Socratic methods, Olympic trials, Agoras.', example: 'e.g. Testing cycles follow the Socratic method.' },
  { id: 'slavic', emoji: '🇷🇺', label: 'Slavic', region: 'Europe', desc: 'Matryoshka recursion, resilient Banya dips, Sputnik leaps.', example: 'e.g. Nested functions are like Matryoshka dolls.' },
  { id: 'celtic', emoji: '🍀', label: 'Celtic', region: 'Europe', desc: 'Celtic knots, oral legends, through thick mist.', example: 'e.g. Infinite loops are like the Celtic knot patterns.' },

  // --- AMERICAS ---
  { id: 'latin_american', emoji: '🎺', label: 'Latin Amer.', region: 'Americas', desc: 'Carnival sync, telenovela states, magical realism.', example: 'e.g. Event states are like telenovela plot twists.' },
  { id: 'mexican', emoji: '🌮', label: 'Mexican', region: 'Americas', desc: 'Día de Muertos layers, Aztec roots, chili friction.', example: 'e.g. System friction is like the heat of a chili.' },
  { id: 'andean', emoji: '🦙', label: 'Andean', region: 'Americas', desc: 'Quipu node encoding, Incan stonework, high altitudes.', example: 'e.g. Binary encoding is like the Incan Quipu knots.' },
  { id: 'native_american', emoji: '🦅', label: 'Native Amer.', region: 'Americas', desc: 'Totem pole ledgers, powwow circle assemblies.', example: 'e.g. Immutable records are like carved Totem poles.' },
  { id: 'caribbean', emoji: '🏝️', label: 'Caribbean', region: 'Americas', desc: 'Reggae async syncopation, island network hopping.', example: 'e.g. Asynchronous tasks follow Reggae rhythms.' },
  { id: 'north_american', emoji: '🏙️', label: 'North Amer.', region: 'Americas', desc: 'Highways, Wild West frontiers, NFL logic.', example: 'e.g. Data transit is like the interstate highways.' },

  // --- ANCIENT ---
  { id: 'ancient_egyptian', emoji: '𓀀', label: 'Egyptian', region: 'Ancient', desc: 'Hieroglyphic encoding, Nile bursts, Pyramids.', example: 'e.g. Monolithic dev is like building a Pyramid.' },
  { id: 'mesopotamian', emoji: '🧱', label: 'Mesopotamia', region: 'Ancient', desc: 'Clay tablets, Hammurabi code logic, Ziggurats.', example: 'e.g. Persistence is like cuneiform clay tablets.' },
  { id: 'roman', emoji: '⚔️', label: 'Roman', region: 'Ancient', desc: 'Aqueduct pipelines, Senate consensus, Legions.', example: 'e.g. Data pipelines are like the Roman aqueducts.' },
  { id: 'aztec_maya', emoji: '🎭', label: 'Aztec/Maya', region: 'Ancient', desc: 'Cyclic calendars, chinampa gardens, base-20 math.', example: 'e.g. Cyclic code follows the Mayan calendars.' },
  { id: 'viking', emoji: '🪓', label: 'Viking', region: 'Ancient', desc: 'Longship flex, aggressive harvesting, Runes.', example: 'e.g. Flexible code is like a Viking longship hull.' },
  { id: 'hindu_vedic', emoji: '🕉️', label: 'Vedic', region: 'Ancient', desc: 'Karma loops, Dharma types, Shunya (zero).', example: 'e.g. Type-checking is like staying within Dharma.' },

  // --- SPECIAL ---
  { id: 'gamer', emoji: '🎮', label: 'Gamer', region: 'Special', desc: 'XP leveling, boss pattern phases, checkpoints.', example: 'e.g. Error recovery is like loading a checkpoint.' },
  { id: 'internet', emoji: '🌐', label: 'Internet', region: 'Special', desc: 'NPC logic, iceberg lore, speedrun exploits.', example: 'e.g. Bypassing logic is like a game speedrun glitch.' },
  { id: 'sports_universal', emoji: '⚽', label: 'Sports', region: 'Special', desc: 'Relay handoffs, team arrays, scoreboards.', example: 'e.g. Handing off memory is like a relay race baton.' },
  { id: 'scientific', emoji: '🧪', label: 'Scientific', region: 'Special', desc: 'Peer review validation, Occam’s razor.', example: 'e.g. Proving code follows the peer review process.' },
  { id: 'musical', emoji: '🎵', label: 'Musical', region: 'Special', desc: 'Jazz async improvisation, orchestra microservices.', example: 'e.g. Orchestration is like a conductor’s baton.' },
  { id: 'cyber', emoji: '💻', label: 'Cyber', region: 'Special', desc: 'Terminal commands, hacker logic, neon matrix.', example: 'e.g. Parsing code is like a terminal scanning.' },
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
          placeholder="Search culture... (e.g. Viking, Japan, Music)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-xs text-kalika-text bg-transparent outline-none w-full placeholder-kalika-muted"
        />
      </div>

      {/* Region Tabs */}
      {!searchQuery && (
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {TABS.map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-[11px] font-medium rounded-full border whitespace-nowrap transition-colors duration-150
                  ${isActive 
                    ? 'bg-kalika-green-subtle text-kalika-green-text border-kalika-green-glow' 
                    : 'border-kalika-border text-kalika-muted hover:border-kalika-green-glow/50 hover:text-kalika-text-secondary'}`}
              >
                {tab}
              </button>
            )
          })}
        </div>
      )}

      {/* Pill Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1.5 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
        {displayItems.length > 0 ? (
          displayItems.map((lens) => {
            const isSel = selectedLens === lens.id
            return (
              <button
                key={lens.id}
                onClick={() => setSelectedLens(lens.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-150 text-left cursor-pointer
                  ${isSel 
                    ? 'bg-kalika-green-subtle border-kalika-green-dim ring-1 ring-kalika-green-glow/30' 
                    : 'bg-kalika-bg border-kalika-border hover:border-kalika-green-glow hover:bg-kalika-surface2'}`}
              >
                <span className="text-[14px] leading-none shrink-0">{lens.emoji}</span>
                <span className={`text-[11px] font-medium truncate ${isSel ? 'text-kalika-green-text' : 'text-kalika-text-secondary'}`}>
                  {lens.label}
                </span>
              </button>
            )
          })
        ) : (
          <p className="col-span-full text-center text-[11px] text-kalika-muted py-4">No lenses found for "{searchQuery}"</p>
        )}
      </div>

      {/* Active Lens Card */}
      {activeObj && (
        <div className="bg-kalika-bg border border-kalika-green-glow rounded-xl p-3 flex gap-3 items-start mt-1">
          <span className="text-3xl leading-none mt-1 shrink-0">{activeObj.emoji}</span>
          <div className="flex-1 min-w-0">
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
