import Link from 'next/link'
import LogoMark from './LogoMark'

export default function Footer() {
  return (
    <footer className="bg-kalika-surface border-t border-kalika-border py-20 px-[5%] font-display relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 group">
              <LogoMark />
              <span className="font-bold text-kalika-green text-2xl tracking-tighter uppercase">KALIKA</span>
            </div>
            <p className="text-sm text-kalika-text-secondary leading-relaxed font-body max-w-[300px]">
              The Culturally Adaptive AI Study Companion. Simplifying academic material through resonant world contexts.
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[10px] text-kalika-muted font-bold uppercase tracking-[0.2em] mb-2">Developed by</p>
                <p className="text-xs text-kalika-text-secondary font-body leading-relaxed">
                  Galih Aji Pangestu · Muhammad Ananda Hariadi · Fachri Ahmad Fabian
                </p>
              </div>
              <div>
                <p className="text-[10px] text-kalika-muted font-bold uppercase tracking-[0.2em] mb-2">University</p>
                <p className="text-xs text-kalika-text-secondary font-body">UPN Veteran East Java, Indonesia</p>
              </div>
              <p className="text-[11px] text-kalika-green font-bold pt-4 tracking-wide">
                © 2026 KALIKA : GDG UTSC AI Case Competition
              </p>
            </div>
          </div>

          {/* MIDDLE COLUMNS (Product & Learn More) */}
          <div className="grid grid-cols-2 col-span-1 md:col-span-1 lg:col-span-2 gap-12 lg:pl-16">
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] font-extrabold text-kalika-muted uppercase tracking-[0.3em] border-b border-kalika-border pb-2 inline-block w-fit">Product</h4>
              <ul className="flex flex-col gap-3">
                {['Launch App', 'Cultural Lenses', 'Mini Quiz', 'Text to Speech', 'Multimodal Input'].map(item => (
                  <li key={item}>
                    <Link href={item === 'Launch App' ? '/app' : '#'} className="text-sm text-kalika-text-secondary hover:text-kalika-green transition-all hover:translate-x-1 inline-block font-body">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] font-extrabold text-kalika-muted uppercase tracking-[0.3em] border-b border-kalika-border pb-2 inline-block w-fit">Learn More</h4>
              <ul className="flex flex-col gap-3">
                {['About KALIKA', 'How It Works', 'Who It\'s For', 'GitHub Repository', 'Hackathon Info'].map(item => (
                  <li key={item}>
                    <a 
                      href={item === 'GitHub Repository' ? 'https://github.com/galiihajiip/kalika' : '#'} 
                      target={item === 'GitHub Repository' ? '_blank' : undefined}
                      rel={item === 'GitHub Repository' ? 'noopener noreferrer' : undefined}
                      className="text-sm text-kalika-text-secondary hover:text-kalika-green transition-all hover:translate-x-1 inline-block font-body"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-extrabold text-kalika-muted uppercase tracking-[0.3em] border-b border-kalika-border pb-2 inline-block w-fit">Built With</h4>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Next.js', 'Gemini 2.5 Flash', 'TypeScript', 'Tailwind CSS', 'Vercel'].map(tech => (
                <div key={tech} className="px-3 py-1.5 bg-kalika-surface border border-kalika-border2 rounded-lg font-mono text-[10px] text-kalika-text-secondary hover:border-kalika-green/50 transition-all cursor-default shadow-sm">
                  {tech}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-10 border-t border-kalika-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-kalika-muted font-bold uppercase tracking-widest">© 2026 KALIKA. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <Link href="#" className="text-[10px] text-kalika-muted hover:text-kalika-green transition-colors uppercase font-bold tracking-widest">Privacy Policy</Link>
             <Link href="#" className="text-[10px] text-kalika-muted hover:text-kalika-green transition-colors uppercase font-bold tracking-widest">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
