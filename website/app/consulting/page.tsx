import type { Metadata } from 'next'
import { PageHeader } from '@/components/CardGrid'

export const metadata: Metadata = {
  title: 'Consulting',
  description:
    'Cre8 is free and open source. Get in touch to see how an AI-fluent design system scales inside your organization, using your own design system.',
}

export default function ConsultingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Consulting"
        title={
          <>
            Bring this to <span className="grad">your organization</span>.
          </>
        }
        lede="Cre8 is free and open source. Get in touch if you would like to see how this scales within your organization, using your design system."
      />

      <section className="block">
        <div className="container">
          <div className="center" style={{ maxWidth: 640 }}>
            <h2 className="section-title">What that usually looks like</h2>
            <p className="section-sub">
              The same pieces on this site, pointed at your component library: a machine-readable manifest, an MCP server
              your agents can query, skills that carry your composition rules, and verification that distinguishes a
              local harness passing from the real thing working.
            </p>

            <div
              style={{
                marginTop: 28,
                display: 'flex',
                gap: 14,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a
                className="btn btn-primary"
                href="mailto:tmorrow@cre8solutions.llc?subject=Cre8%20consulting"
              >
                Email me
              </a>
              <a
                className="btn btn-primary"
                style={{ background: 'transparent', color: 'var(--brand)', borderColor: 'var(--brand)' }}
                href="https://github.com/tmorrowdev/Cre8-Components/issues/new"
                target="_blank"
                rel="noopener"
              >
                Open an issue
              </a>
            </div>

            <p style={{ marginTop: 22, fontFamily: 'ui-monospace, monospace' }}>
              <a href="mailto:tmorrow@cre8solutions.llc" style={{ color: 'var(--brand)', textDecoration: 'none' }}>
                tmorrow@cre8solutions.llc
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
