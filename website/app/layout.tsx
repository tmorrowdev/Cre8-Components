import type { Metadata, Viewport } from 'next'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import './globals.css'

const SITE = 'https://cre8-ui.dev'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Cre8 — The AI-Fluent Design System for Generative UI',
    template: '%s — Cre8',
  },
  description:
    'Cre8 is an AI-fluent design system by Cre8 Solutions LLC: 93 accessible web components, installed as plugins — an MCP server, skills, specialist agents, and a verification workflow — for Claude Code, Cowork, Codex CLI, and Gemini CLI.',
  icons: { icon: [{ url: '/assets/logo.svg', type: 'image/svg+xml' }] },
  openGraph: {
    type: 'website',
    siteName: 'Cre8 Solutions LLC',
    title: 'Cre8 — The AI-Fluent Design System for Generative UI',
    description:
      '93 accessible web components — installed as plugins for Claude Code, Cowork, Codex CLI, or Gemini CLI. By Cre8 Solutions LLC.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cre8 — The AI-Fluent Design System for Generative UI',
    description: '93 accessible web components, built to be read and rendered by AI agents.',
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0F1F',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Vendored cre8 brand tokens. Kept as a plain stylesheet so the token
            layer stays identical to what the design system ships. */}
        <link rel="stylesheet" href="/vendor/cre8-theme.css" />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
