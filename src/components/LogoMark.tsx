'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function LogoMark() {
  const [imgError, setImgError] = useState(false)
  
  if (imgError) {
    return (
      <div className="w-9 h-9 rounded-xl bg-kalika-green-subtle 
                      border border-kalika-green-glow
                      flex items-center justify-center 
                      font-display font-bold text-base text-kalika-green shadow-[0_0_12px_rgba(34,197,94,0.15)] group-hover:scale-110 transition-transform">
        K
      </div>
    )
  }
  
  return (
    <div className="w-9 h-9 rounded-xl overflow-hidden border border-kalika-green-glow group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(34,197,94,0.15)] bg-kalika-surface">
      <Image
        src="/images/kalika-logo.png"
        alt="KALIKA logo"
        width={36}
        height={36}
        className="object-cover w-full h-full"
        onError={() => setImgError(true)}
      />
    </div>
  )
}
