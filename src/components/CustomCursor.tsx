'use client'
import { useEffect } from 'react'

export default function CustomCursor() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Check if the current device is mobile based on touch capability
    // (most reliable check for "should I show a mouse cursor?")
    if (window.matchMedia("(any-hover: none)").matches) return

    const dot = document.createElement('div')
    dot.className = 'kalika-custom-cursor-dot'
    dot.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      background: #4ade80;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: opacity 0.2s;
      mix-blend-mode: difference;
    `
    
    const ring = document.createElement('div')
    ring.className = 'kalika-custom-cursor-ring'
    ring.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 32px;
      height: 32px;
      border: 1px solid #22c55e;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      opacity: 0.5;
      pointer-events: none;
    `
    
    document.body.appendChild(dot)
    document.body.appendChild(ring)
    
    let mouseX = -100, mouseY = -100
    let ringX = -100, ringY = -100
    
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
      dot.style.opacity = '1'
      ring.style.opacity = '0.5'
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    
    let rafId: number
    const animate = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'
      rafId = requestAnimationFrame(animate)
    }
    animate()
    
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    
    // Add hover effects for interactive elements
    const addHover = () => {
        ring.style.width = '60px'
        ring.style.height = '60px'
        ring.style.background = 'rgba(74, 222, 128, 0.1)'
        ring.style.borderWidth = '0px'
    }
    const removeHover = () => {
        ring.style.width = '32px'
        ring.style.height = '32px'
        ring.style.background = 'transparent'
        ring.style.borderWidth = '1px'
    }

    const updateInteractivity = () => {
        const interactive = document.querySelectorAll('a, button, .cursor-pointer')
        interactive.forEach(el => {
            el.addEventListener('mouseenter', addHover)
            el.addEventListener('mouseleave', removeHover)
        })
    }
    updateInteractivity()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
      dot.remove()
      ring.remove()
    }
  }, [])
  
  return null
}
