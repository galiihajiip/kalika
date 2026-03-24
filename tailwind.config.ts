import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kalika: {
          bg:        '#060c06',
          surface:   '#0c140c',
          surface2:  '#111c11',
          border:    '#1a2a1a',
          border2:   '#243824',
          green: {
            DEFAULT: '#4ade80',
            dim:     '#22c55e',
            glow:    '#166534',
            subtle:  '#14532d',
            text:    '#bbf7d0',
            pale:    '#dcfce7',
          },
          muted:     '#5a7a5a',
          text: {
            DEFAULT:   '#e2f0e2',
            secondary: '#9ab89a',
          }
        }
      },
      fontFamily: {
        display: ['var(--font-sora)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'monospace'],
      },
      borderRadius: {
        'kalika': '12px',
        'kalika-lg': '20px',
        'kalika-xl': '24px',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '1' },
        },
        wave: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%':      { transform: 'scaleY(0.3)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%':      { transform: 'translate(40px, 30px)' },
        },
      },
      animation: {
        'fade-up':  'fadeUp 0.6s ease both',
        'float':    'float 6s ease-in-out infinite',
        'marquee':  'marquee 30s linear infinite',
        'marquee2': 'marquee 25s linear infinite reverse',
        'shimmer':  'shimmer 2.5s ease-in-out infinite',
        'wave':     'wave 1.2s ease-in-out infinite',
        'blink':    'blink 2s ease-in-out infinite',
        'orb':      'orbFloat 12s ease-in-out infinite',
      },
    }
  },
  plugins: [],
}

export default config
