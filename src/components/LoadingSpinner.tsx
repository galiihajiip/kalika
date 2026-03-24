'use client'

export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  }

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizeClasses[size]} border-kalika-green/20 border-t-kalika-green rounded-full animate-spin`}
      />
    </div>
  )
}
