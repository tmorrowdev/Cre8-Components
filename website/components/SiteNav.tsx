'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { NAV } from '@/lib/content'

const REPO = 'https://github.com/tmorrowdev/Cre8-Components'

export default function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Mark the section, not just the exact page, so a nested route still shows
  // where you are.
  const current = (href: string) =>
    pathname === href || pathname.startsWith(href + '/') ? 'page' : undefined

  // Close on navigation. Without this the panel stays open over the page you
  // just asked for, which reads as a broken link rather than a menu.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand">
          <span className="logo" aria-hidden="true" />
          Cre8 <small>design system</small>
        </Link>

        <nav className="topnav" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hide-sm" aria-current={current(item.href)}>
              {item.label}
            </Link>
          ))}
          <a href={REPO} target="_blank" rel="noopener" className="hide-sm">
            GitHub ↗
          </a>
          <Link href="/#start" className="hide-sm">
            Get started
          </Link>

          {/* Below 980px the links above are hidden, so this is the only way to
              reach the other pages. It is a disclosure button, not decoration. */}
          <button
            ref={buttonRef}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-icon" aria-hidden="true">
              {open ? '✕' : '☰'}
            </span>
            Menu
          </button>
        </nav>
      </div>

      <div ref={panelRef} id="mobile-nav" className="mobile-nav" hidden={!open}>
        <div className="container mobile-nav-inner">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={current(item.href)}>
              {item.label}
            </Link>
          ))}
          <Link href="/#start">Get started</Link>
          <a href={REPO} target="_blank" rel="noopener">
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  )
}
