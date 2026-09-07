'use client'

import { useEffect, useState } from 'react'

/**
 * Live cre8 components, loaded from the vendored ESM bundle at runtime.
 *
 * Why not `@tmorrow/cre8-react`? Its dependency `@tmorrow/cre8-wc` ships
 * Vite-specific `?raw` import syntax in its published output
 * (`import svg from '@tmorrow/cre8-wc/icons/add.svg?raw'`). Turbopack and
 * webpack don't understand that query suffix, so they hand the file to the
 * image loader and the build dies on "SVG source code does not contain width
 * and height or viewBox". Until the package ships bundler-neutral output, the
 * prebuilt bundle in /vendor is the only way to consume the library here — and
 * it's the same one the previous version of this site used.
 *
 * The bundle calls customElements.define at import time, so it must load in the
 * browser, after mount.
 */
export default function Cre8PreviewInner() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')

  useEffect(() => {
    let cancelled = false

    // Held in a variable on purpose: a string literal here makes both the
    // bundler try to resolve the path at build time and TypeScript look for
    // type declarations for it. Neither applies — this is a runtime URL import
    // of an already-built file served from /public.
    const bundleUrl = '/vendor/cre8-wc.esm.js'

    import(/* webpackIgnore: true */ /* @vite-ignore */ bundleUrl)
      .then(() => customElements.whenDefined('cre8-button'))
      .then(() => {
        if (!cancelled) setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('failed')
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (status === 'failed') {
    return (
      <p style={{ color: 'var(--cre8-color-content-subtle)', fontSize: '.9rem' }}>
        The live component bundle could not load. The snippets below show the same markup.
      </p>
    )
  }

  return (
    <div style={{ minHeight: 200, opacity: status === 'ready' ? 1 : 0, transition: 'opacity .25s' }}>
      <cre8-card>
        <h3 style={{ fontSize: '1.15rem', marginBottom: 10 }}>Getting started</h3>
        <p style={{ margin: '0 0 14px', color: 'var(--cre8-color-content-subtle)' }}>
          These are live custom elements from the published library — not a screenshot, and not markup written for this
          page.
        </p>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <cre8-badge text="Accessible" variant="success"></cre8-badge>
          <cre8-badge text="Themeable" variant="info"></cre8-badge>
          <cre8-badge text="Framework-agnostic"></cre8-badge>
        </div>
        <cre8-button text="Primary action" variant="primary"></cre8-button>
      </cre8-card>
    </div>
  )
}
