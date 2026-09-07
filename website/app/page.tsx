import Link from 'next/link'
import CodeBlock from '@/components/CodeBlock'
import { COMPONENT_COUNT, MCP_TOOL_COUNT } from '@/lib/content'

// Ported from the original page. These were `cre8-icon` custom elements, which
// cannot server-render; the paths are inlined so the section stays static HTML.
const PILLARS: { icon: string; viewBox: string; title: string; body: React.ReactNode }[] = [
  {
    viewBox: '0 0 24 24',
    icon: 'M17.1527 15.0943H16.0686L15.6844 14.7238C17.0292 13.1595 17.8388 11.1286 17.8388 8.91938C17.8388 3.99314 13.8456 0 8.91938 0C3.99314 0 0 3.99314 0 8.91938C0 13.8456 3.99314 17.8388 8.91938 17.8388C11.1286 17.8388 13.1595 17.0292 14.7238 15.6844L15.0943 16.0686V17.1527L21.9554 24L24 21.9554L17.1527 15.0943ZM8.91938 15.0943C5.50257 15.0943 2.74443 12.3362 2.74443 8.91938C2.74443 5.50257 5.50257 2.74443 8.91938 2.74443C12.3362 2.74443 15.0943 5.50257 15.0943 8.91938C15.0943 12.3362 12.3362 15.0943 8.91938 15.0943Z',
    title: 'Machine-readable by design',
    body: (
      <>
        A full <code>custom-elements.json</code> manifest describes every tag, prop, slot, and event — so an agent knows
        exactly what exists and how to use it. No scraping, no guessing.
      </>
    ),
  },
  {
    viewBox: '0 0 24 24',
    icon: 'M24 13.7143H13.7143V24H10.2857V13.7143H0V10.2857H10.2857V0H13.7143V10.2857H24V13.7143Z',
    title: 'Composable component trees',
    body: 'Agents emit structured component trees, not brittle hand-rolled HTML. The output is real Cre8 elements — inspectable, diffable, and identical to what a human would ship.',
  },
  {
    viewBox: '0 0 24 24',
    icon: 'M12 12C15.315 12 18 9.315 18 6C18 2.685 15.315 0 12 0C8.685 0 6 2.685 6 6C6 9.315 8.685 12 12 12ZM12 15C7.995 15 0 17.01 0 21V24H24V21C24 17.01 16.005 15 12 15Z',
    title: 'Accessible by construction',
    body: "Whatever the model generates inherits WCAG 2.1 semantics, keyboard support, and ARIA from the components themselves. Accessibility isn't prompted — it's guaranteed.",
  },
  {
    viewBox: '0 0 24 24',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    title: 'On-brand through tokens',
    body: 'Generated UI reads from design tokens, so a swap of the token file re-themes everything the AI produced. Cre8, brand, or a custom theme — the model stays inside the lines.',
  },
  {
    viewBox: '0 0 24 24',
    icon: 'M17.6667 18.68V9.33333H15V18.68H11L16.3333 24L21.6667 18.68H17.6667ZM8.33333 0L3 5.32H7V14.6667H9.66667V5.32H13.6667L8.33333 0Z',
    title: 'MCP-native',
    body: (
      <>
        The <code>@tmorrow/cre8-mcp</code> server plugs component intelligence straight into Claude, Cursor, and any MCP
        client — live, versioned, and always in sync with the library.
      </>
    ),
  },
  {
    viewBox: '0 0 24 24',
    icon: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c1.5 0 3.2 3.6 3.7 8H8.3C8.8 5.6 10.5 2 12 2zM2.1 13h4.2c.1 1.4.3 2.8.6 4H3.3a10 10 0 0 1-1.2-4zm4.2-2H2.1a10 10 0 0 1 1.2-4h3.6c-.3 1.2-.5 2.6-.6 4zm2 0c.1-1.5.3-2.9.6-4h6.2c.3 1.1.5 2.5.6 4H8.3zm7.4 2c-.1 1.5-.3 2.9-.6 4H8.9c-.3-1.1-.5-2.5-.6-4h7.4zM12 22c-1.5 0-3.2-3.6-3.7-8h7.4c-.5 4.4-2.2 8-3.7 8zm5.7-5c.3-1.2.5-2.6.6-4h4.2a10 10 0 0 1-1.2 4h-3.6zm.6-6c-.1-1.4-.3-2.8-.6-4h3.6a10 10 0 0 1 1.2 4h-4.2z',
    title: 'Framework-agnostic',
    body: "Web Components run anywhere — React, Vue, Angular, or plain HTML. Generative UI you build with Cre8 isn't locked to one renderer or one runtime.",
  },
]

const STEPS = [
  { n: '01 · ask', title: 'Describe the UI', body: 'A user or agent states intent in plain language — “a dashboard row with three stat cards.”' },
  { n: '02 · ground', title: 'Query the system', body: 'The model calls the MCP server to find the right components, props, and approved patterns.' },
  { n: '03 · compose', title: 'Generate real components', body: 'It emits a tree of verified Cre8 tags — typed, accessible, and token-themed by default.' },
  { n: '04 · render', title: 'Ship it live', body: 'The browser renders native web components. What the AI drafted is what production runs.' },
]

export default function HomePage() {
  return (
    <>
      <header className="hero">
        <div className="container">
          <span className="eyebrow">
            <span className="pulse" />
            Two plugins · Claude Code, Cowork, Codex CLI, Gemini CLI
          </span>
          <h1>
            The design system your <span className="grad">agents can speak</span>.
          </h1>
          <p className="lede">
            Cre8 is a design system built to be read, reasoned about, and rendered by AI. Install it as a plugin —{' '}
            {COMPONENT_COUNT} accessible web components’ worth of MCP-served lookup, plus five skills, three specialist
            agents, and a verification workflow — and your agent composes real, on-brand, production UI instead of
            throwaway markup.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary" href="/design-system">
              Explore the plugin
            </Link>
            <a
              className="btn btn-secondary"
              href="https://github.com/tmorrowdev/Cre8-Components#readme"
              target="_blank"
              rel="noopener"
            >
              Read the docs
            </a>
          </div>
          <div className="hero-meta">
            <div className="m">
              <strong>{COMPONENT_COUNT}</strong>
              <span>components, WCAG-accessible</span>
            </div>
            <div className="m">
              <strong>2</strong>
              <span>plugins — design system + data</span>
            </div>
            <div className="m">
              <strong>{MCP_TOOL_COUNT}</strong>
              <span>MCP tools</span>
            </div>
            <div className="m">
              <strong>∞</strong>
              <span>frameworks — it’s the platform</span>
            </div>
          </div>

          <div className="demo">
            <div className="demo-pane">
              <div className="demo-head">
                <span className="tl" aria-hidden="true">
                  <i style={{ background: '#ff5f57' }} />
                  <i style={{ background: '#febc2e' }} />
                  <i style={{ background: '#28c840' }} />
                </span>
                generative session
              </div>
              <div className="demo-body">
                <div className="chat-line">
                  <div className="chat-avatar user">U</div>
                  <div className="chat-text">
                    <span className="who">prompt</span>
                    “Build me a getting-started card with a heading, a couple of highlight badges, and a primary CTA.”
                  </div>
                </div>
                <div className="chat-line">
                  <div className="chat-avatar ai">C</div>
                  <div className="chat-text">
                    <span className="who">Cre8-aware agent</span>
                    Querying the design system…
                    <div className="tool-call">
                      search_components(<b>&quot;card, badge, button&quot;</b>)
                    </div>
                    <div className="tool-call">
                      get_content_model(<b>&quot;cre8-card&quot;</b>)
                    </div>
                    Composing verified components.
                  </div>
                </div>
              </div>
            </div>
            <div className="render-surface">
              <span className="render-label">Rendered output</span>
              <div
                style={{
                  border: '1px solid #e6e3dd',
                  borderRadius: 12,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <strong style={{ fontSize: '1.15rem' }}>Getting started</strong>
                <p style={{ color: 'var(--cre8-color-content-subtle)', fontSize: '.95rem' }}>
                  Everything you need to ship your first generated surface.
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className="chip hot">Accessible</span>
                  <span className="chip">Themeable</span>
                </div>
                <span className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Primary action
                </span>
              </div>
              <p style={{ color: 'var(--cre8-color-content-subtle)', fontSize: '.85rem' }}>
                See these rendered as live components on the{' '}
                <Link href="/components" style={{ color: 'var(--brand)' }}>
                  components page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="block">
        <div className="container">
          <div className="center" style={{ maxWidth: 720 }}>
            <span className="section-eyebrow">Why AI-fluent</span>
            <h2 className="section-title">Most design systems are built for humans to read the docs.</h2>
            <p className="section-sub">
              Cre8 is built so a model can, too. Every component ships the metadata, guardrails, and structure an agent
              needs to generate correct UI on the first pass.
            </p>
          </div>

          <div className="pillars">
            {PILLARS.map((p) => (
              <div className="pillar" key={p.title}>
                <div className="ic" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox={p.viewBox} width="24" height="24" fill="currentColor" style={{ color: 'var(--brand)' }}>
                    <path d={p.icon} />
                  </svg>
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block how">
        <div className="container">
          <div className="center" style={{ maxWidth: 720 }}>
            <span className="section-eyebrow">The loop</span>
            <h2 className="section-title">From prompt to production UI in four steps</h2>
            <p className="section-sub">
              The same pipeline behind a generative-UI playground — grounded in a real, governed component library.
            </p>
          </div>
          <div className="steps">
            {STEPS.map((s) => (
              <div className="step" key={s.n}>
                <span className="n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block cta" id="start">
        <div className="container">
          <h2>
            Give your agents a design system
            <br />
            they can actually speak.
          </h2>
          <p>
            Install the plugins — components, MCP server, skills, agents, and the data toolkit — and start generating
            real, accessible, on-brand UI today.
          </p>
          <div className="cta-buttons">
            <Link className="btn btn-secondary" href="/design-system">
              Design system plugin
            </Link>
            <Link className="btn btn-secondary" href="/data">
              Data plugin
            </Link>
          </div>
          <div style={{ maxWidth: 560, margin: '30px auto 0', textAlign: 'left' }}>
            <CodeBlock
              bar="Claude Code"
              lines={[
                [{ t: '// Both plugins, one marketplace', cls: 'c' }],
                [
                  { t: 'claude', cls: 'k' },
                  { t: ' plugin marketplace add ' },
                  { t: 'tmorrowdev/tmorrow_ai', cls: 's' },
                ],
                [
                  { t: 'claude', cls: 'k' },
                  { t: ' plugin install ' },
                  { t: 'cre8@tmorrow_ai', cls: 's' },
                ],
                [
                  { t: 'claude', cls: 'k' },
                  { t: ' plugin install ' },
                  { t: 'cre8-data@tmorrow_ai', cls: 's' },
                ],
              ]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
