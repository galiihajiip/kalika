import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-kalika-surface border-t border-kalika-border py-12 px-[5%] font-display relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-kalika-green-subtle border border-kalika-green-dim flex items-center justify-center font-bold text-kalika-green text-sm">
                K
              </div>
              <span className="font-bold text-kalika-green text-lg tracking-wider">KALIKA</span>
            </div>
            <p className="text-sm text-kalika-text-secondary leading-relaxed font-body max-w-[280px]">
              The Culturally Adaptive AI Study Companion empowering scholars worldwide.
            </p>
            <div className="mt-2 space-y-1">
              <p className="text-[10px] text-kalika-muted font-bold uppercase tracking-widest leading-none">Developed by</p>
              <p className="text-xs text-kalika-text-secondary font-body">
                Galih Aji Pangestu · Muhammad Ananda Hariadi · Fachri Ahmad Fabian
              </p>
              <p className="text-[10px] text-kalika-muted font-bold uppercase tracking-widest pt-1">University</p>
              <p className="text-xs text-kalika-text-secondary font-body">UPN Veteran East Java, Indonesia</p>
              <p className="text-[11px] text-kalika-green font-semibold pt-2">© 2026 KALIKA — GDG UTSC AI Case Competition</p>
            </div>
          </div>

          {/* MIDDLE COLUMNS */}
          <div className="grid grid-cols-2 col-span-1 md:col-span-1 lg:col-span-2 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold text-kalika-muted uppercase tracking-[0.2em]">Product</h4>
              <ul className="flex flex-col gap-2.5">
                {['Launch App', 'Cultural Lenses', 'Mini Quiz', 'Text to Speech', 'Multimodal Input'].map(item => (
                  <li key={item}>
                    <Link href={item === 'Launch App' ? '/app' : '#'} className="text-sm text-kalika-text-secondary hover:text-kalika-green transition-colors font-body">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold text-kalika-muted uppercase tracking-[0.2em]">Learn More</h4>
              <ul className="flex flex-col gap-2.5">
                {['About KALIKA', 'How It Works', 'Who It\'s For', 'GitHub Repository', 'Hackathon Info'].map(item => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-kalika-text-secondary hover:text-kalika-green transition-colors font-body">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[10px] font-bold text-kalika-muted uppercase tracking-[0.2em]">Built With</h4>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'Gemini 2.5 Flash', 'TypeScript', 'Tailwind CSS', 'Vercel'].map(tech => (
                <div key={tech} className="px-3 py-1.5 bg-kalika-surface border border-kalika-border2 rounded-lg font-mono text-[10px] text-kalika-text-secondary hover:border-kalika-green/50 transition-all cursor-default">
                  {tech}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-8 border-t border-kalika-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-kalika-muted font-medium">© 2026 KALIKA. All rights reserved.</p>
          <p className="text-[10px] text-kalika-muted font-medium flex items-center gap-1">
            Made with <span className="text-red-500">❤️</span> for learners everywhere
          </p>
        </div>
      </div>
    </footer>
  )
}
