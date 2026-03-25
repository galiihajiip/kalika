'use client'

import { useEffect, useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function HowToUseModal({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isOpen) return null

  const steps = [
    {
      icon: '📝',
      title: 'Provide Material',
      desc: 'Type or paste academic text (min. 50 characters). You can also use the multimodal icon to extract text from images or audio.'
    },
    {
      icon: '🌍',
      title: 'Choose Your Lens',
      desc: 'Select from 50+ cultural contexts. This determines the analogies and framing KALIKA uses to explain the material.'
    },
    {
      icon: '✦',
      title: 'Generate Analysis',
      desc: 'Click the button to get a dyslexia-friendly breakdown, cultural analogies, and a technical glossary.'
    },
    {
      icon: '🎮',
      title: 'Test Yourself',
      desc: 'Switch to the "Mini Quiz" tab to generate a custom 3-question quiz based on your study material.'
    }
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-kalika-surface border border-kalika-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-fade-up">
        <div className="bg-kalika-surface2 px-6 py-4 border-b border-kalika-border flex items-center justify-between">
          <h3 className="font-display font-bold text-kalika-green tracking-wide">HOW TO USE KALIKA</h3>
          <button 
            onClick={onClose}
            className="text-kalika-muted hover:text-kalika-text transition-colors p-1"
          >
            ✕
          </button>
        </div>

        <div className="p-8 flex flex-col gap-8">
          <p className="text-sm text-kalika-text-secondary leading-relaxed italic">
            "Your journey to understanding starts here. Follow these simple steps to master any subject."
          </p>

          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-kalika-green/10 border border-kalika-green/20 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-kalika-green/20 transition-colors">
                  {step.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-kalika-text">{step.title}</h4>
                  <p className="text-xs text-kalika-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="mt-4 w-full bg-kalika-green text-kalika-bg py-3 rounded-xl font-bold font-display hover:bg-green-300 transition-all active:scale-[0.98]"
          >
            GO TO DASHBOARD
          </button>
        </div>
      </div>
    </div>
  )
}
