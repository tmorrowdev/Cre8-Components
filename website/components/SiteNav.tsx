'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV } from '@/lib/content'

export default function SiteNav() {
  const pathname = usePathname()

  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand">
          <span className="logo" aria-hidden="true" />
          Cre8 <small>design system</small>
        </Link>
        <nav className="topnav" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hide-sm"
              // Mark the section, not just the exact page, so a nested route
              // still shows where you are.
              aria-current={pathname === item.href || pathname.startsWith(item.href + '/') ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/tmorrowdev/Cre8-Components"
            target="_blank"
            rel="noopener"
            className="hide-sm"
          >
            GitHub ↗
          </a>
          <Link href="/#start">Get started</Link>
        </nav>
      </div>
    </div>
  )
}
