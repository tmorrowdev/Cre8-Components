'use client'

import { useCallback, useRef, useState } from 'react'

type Token = { t: string; cls?: 'k' | 's' | 'c' | 't' }

export type CodeBlockProps = {
  /** Label shown in the title bar, e.g. "Claude Code" or "~/.config · mcp.json". */
  bar: string
  /** Lines of pre-tokenised source. A plain string is rendered unstyled. */
  lines: (string | Token[])[]
  /** Plain text placed on the clipboard. Defaults to the rendered text. */
  copyText?: string
}

function renderLine(line: string | Token[], i: number) {
  if (typeof line === 'string') return <span key={i}>{line + '\n'}</span>
  return (
    <span key={i}>
      {line.map((tok, j) =>
        tok.cls ? (
          <span key={j} className={tok.cls}>
            {tok.t}
          </span>
        ) : (
          <span key={j}>{tok.t}</span>
        )
      )}
      {'\n'}
    </span>
  )
}

function toPlain(lines: (string | Token[])[]) {
  return lines.map((l) => (typeof l === 'string' ? l : l.map((t) => t.t).join(''))).join('\n')
}

export default function CodeBlock({ bar, lines, copyText }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = useCallback(async () => {
    const text = copyText ?? toPlain(lines)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard is unavailable over plain HTTP and in some embedded views.
      // The snippet is selectable either way, so fail quietly rather than
      // throwing an error the reader can do nothing about.
    }
  }, [copyText, lines])

  return (
    <div className="codewrap">
      <div className="bar">
        <span>{bar}</span>
        <button type="button" className="copy-btn" data-copied={copied} onClick={copy}>
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="code">{lines.map(renderLine)}</pre>
    </div>
  )
}
