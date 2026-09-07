import Link from 'next/link'
import { NAV } from '@/lib/content'

export default function SiteFooter() {
  return (
    <footer className="site">
      <div className="container">
        <div className="foot-top">
          <div className="brand">
            <span className="logo" aria-hidden="true" />
            Cre8 <small>AI-fluent design system</small>
          </div>
          <nav className="foot-links" aria-label="Footer">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <a href="https://github.com/tmorrowdev/Cre8-Components" target="_blank" rel="noopener">
              GitHub ↗
            </a>
            <a href="https://www.npmjs.com/package/@tmorrow/cre8-wc" target="_blank" rel="noopener">
              npm ↗
            </a>
          </nav>
        </div>
        <div className="foot-bottom">
          © 2026 Cre8 Solutions LLC · Cre8 is the AI-fluent design system for generative UI · Built with Lit · MIT
          licensed ·{' '}
          <a href="mailto:tmorrow@cre8solutions.llc" style={{ color: 'inherit', textDecoration: 'underline' }}>
            tmorrow@cre8solutions.llc
          </a>
        </div>
      </div>
    </footer>
  )
}
