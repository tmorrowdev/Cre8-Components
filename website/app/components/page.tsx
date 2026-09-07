import type { Metadata } from 'next'
import { PageHeader } from '@/components/CardGrid'
import CodeBlock from '@/components/CodeBlock'
import Cre8Preview from '@/components/Cre8Preview'
import { COMPONENT_COUNT, REACT_COMPONENT_COUNT } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Components',
  description: `${COMPONENT_COUNT} registered web components — the raw vocabulary agents compose with, with React wrappers for ${REACT_COMPONENT_COUNT} of them.`,
}

const CHIPS: [string, boolean][] = [
  ['cre8-button', true], ['cre8-card', true], ['cre8-badge', false], ['cre8-alert', false],
  ['cre8-modal', true], ['cre8-table', false], ['cre8-tabs', false], ['cre8-accordion', false],
  ['cre8-select', true], ['cre8-date-picker', false], ['cre8-multi-select', false],
  ['cre8-progress-meter', false], ['cre8-progress-steps', false], ['cre8-grid', true],
  ['cre8-hero', false], ['cre8-feature', false], ['cre8-header', false], ['cre8-footer', false],
  ['cre8-primary-nav', false], ['cre8-breadcrumbs', false], ['cre8-pagination', false],
  ['cre8-tooltip', false], ['cre8-popover', false], ['cre8-dropdown', false],
  ['cre8-checkbox-field', false], ['cre8-radio-field', false], ['cre8-tag-list', false],
  ['cre8-skeleton-loader', false], ['cre8-loading-spinner', false], ['cre8-split-button', false],
]

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The library"
        title={
          <>
            {COMPONENT_COUNT} components the <span className="grad">model already knows</span>.
          </>
        }
        lede="Every one is a real, registered web component — the raw vocabulary your agents compose with, and the same elements a human would hand-write."
      />

      <section className="block">
        <div className="container">
          <div className="wall">
            {CHIPS.map(([name, hot]) => (
              <span key={name} className={hot ? 'chip hot' : 'chip'}>
                {name}
              </span>
            ))}
            <span className="chip" style={{ borderStyle: 'dashed' }}>
              + {COMPONENT_COUNT - CHIPS.length} more
            </span>
          </div>
        </div>
      </section>

      <section className="block" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <span className="section-eyebrow">Live, not a screenshot</span>
          <h2 className="section-title">Rendered from the published package</h2>
          <p className="section-sub">
            The card below is real <code>@tmorrow/cre8-react</code> running in your browser — the same components an
            agent emits, rendering the same way they will in your app.
          </p>

          <div style={{ marginTop: 32, background: '#fff', border: '1px solid #e6e3dd', borderRadius: 'var(--radius)', padding: 28 }}>
            <Cre8Preview />
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <span className="section-eyebrow">Usage</span>
          <h2 className="section-title">Both renderers, same component</h2>
          <p className="section-sub">
            Web Components run anywhere. React wrappers exist for {REACT_COMPONENT_COUNT} of them when you want typed
            props and JSX.
          </p>

          <div className="install-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <CodeBlock
              bar="HTML · @tmorrow/cre8-wc"
              lines={[
                [{ t: '<', cls: 'k' }, { t: 'cre8-card', cls: 't' }, { t: '>', cls: 'k' }],
                [
                  { t: '  <', cls: 'k' },
                  { t: 'cre8-badge', cls: 't' },
                  { t: ' text=' },
                  { t: '"Accessible"', cls: 's' },
                  { t: ' variant=' },
                  { t: '"success"', cls: 's' },
                  { t: '></', cls: 'k' },
                  { t: 'cre8-badge', cls: 't' },
                  { t: '>', cls: 'k' },
                ],
                [
                  { t: '  <', cls: 'k' },
                  { t: 'cre8-button', cls: 't' },
                  { t: ' text=' },
                  { t: '"Primary action"', cls: 's' },
                  { t: ' variant=' },
                  { t: '"primary"', cls: 's' },
                  { t: '></', cls: 'k' },
                  { t: 'cre8-button', cls: 't' },
                  { t: '>', cls: 'k' },
                ],
                [{ t: '</', cls: 'k' }, { t: 'cre8-card', cls: 't' }, { t: '>', cls: 'k' }],
              ]}
            />
            <CodeBlock
              bar="React · @tmorrow/cre8-react"
              lines={[
                [
                  { t: 'import', cls: 'k' },
                  { t: ' { Cre8Badge, Cre8Button, Cre8Card } ' },
                  { t: 'from', cls: 'k' },
                  { t: ' ' },
                  { t: "'@tmorrow/cre8-react'", cls: 's' },
                ],
                [{ t: '' }],
                [{ t: '<' }, { t: 'Cre8Card', cls: 't' }, { t: '>' }],
                [
                  { t: '  <' },
                  { t: 'Cre8Badge', cls: 't' },
                  { t: ' text=' },
                  { t: '"Accessible"', cls: 's' },
                  { t: ' variant=' },
                  { t: '"success"', cls: 's' },
                  { t: ' />' },
                ],
                [
                  { t: '  <' },
                  { t: 'Cre8Button', cls: 't' },
                  { t: ' text=' },
                  { t: '"Primary action"', cls: 's' },
                  { t: ' variant=' },
                  { t: '"primary"', cls: 's' },
                  { t: ' />' },
                ],
                [{ t: '</' }, { t: 'Cre8Card', cls: 't' }, { t: '>' }],
              ]}
            />
          </div>

          <p className="section-sub" style={{ marginTop: 24, maxWidth: '70ch' }}>
            <strong style={{ color: 'var(--cre8-color-content-default)' }}>Rendering these server-side?</strong> The
            React wrappers build on <code>@lit/react</code>, and importing one reaches <code>customElements</code> at
            module scope — so they run in the browser only. In Next.js, load them from a client component with{' '}
            <code>{'dynamic(..., { ssr: false })'}</code>. This very page does exactly that.
          </p>
        </div>
      </section>
    </>
  )
}
