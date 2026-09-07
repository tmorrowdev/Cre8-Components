import type { Metadata } from 'next'
import CardGrid, { PageHeader } from '@/components/CardGrid'
import CodeBlock from '@/components/CodeBlock'
import VideoDemo from '@/components/VideoDemo'
import { DATA_CONNECTORS, DATA_SKILLS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Data plugin',
  description:
    'cre8-data: nine skills for SQL, dataset exploration, visualization and dashboards, four connected sources, and Clerk machine authentication for auth-gated data.',
}

export default function DataPage() {
  return (
    <>
      <PageHeader
        eyebrow="The cre8-data plugin"
        title={
          <>
            The UI is half the job. <span className="grad">cre8-data</span> is the other half.
          </>
        }
        lede="A dashboard is only as good as the query behind it. cre8-data gives the same agent the analyst half of the work — writing SQL that holds up, profiling a dataset before trusting it, and validating a result before it reaches a stakeholder."
      />

      <section className="block">
        <div className="container">
          <span className="section-eyebrow">Skills</span>
          <h2 className="section-title">Nine skills, query through presentation</h2>
          <CardGrid items={DATA_SKILLS} light />
        </div>
      </section>

      <section className="block" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <span className="section-eyebrow">Connected sources</span>
          <h2 className="section-title">Four MCP servers, configured on install</h2>
          <CardGrid items={DATA_CONNECTORS} light />

          <p className="section-sub" style={{ marginTop: 24, maxWidth: '70ch' }}>
            <strong style={{ color: 'var(--cre8-color-content-default)' }}>One thing we’re explicit about.</strong>{' '}
            Adding the Clerk connector does not authenticate your agent to anything — it serves SDK snippets, and both of
            its tools are read-only. Reaching a gated source is separate code you write, using Clerk machine auth in the
            service being called. The <code>auth-gated-data-sources</code> skill leads with that distinction, because
            believing otherwise costs you an afternoon debugging a 401 that was never going to resolve.
          </p>
          <p className="section-sub" style={{ marginTop: 12, maxWidth: '70ch' }}>
            Snowflake, Amplitude, and Atlassian each run their own OAuth. If one of those returns 401, the fix is in that
            connector’s own login — no amount of Clerk configuration changes it.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <span className="section-eyebrow">Usage</span>
          <h2 className="section-title">Getting an agent through the front door</h2>
          <p className="section-sub">
            Which strategy you want is decided by <em>whose</em> data is being read. An M2M token carries the machine’s
            identity and no user’s, so a user-scoped endpoint can’t scope the query from it.
          </p>

          <div style={{ display: 'grid', gap: 0 }}>
            <CodeBlock
              bar="mint — the calling service"
              lines={[
                [
                  { t: 'import', cls: 'k' },
                  { t: ' { createClerkClient } ' },
                  { t: 'from', cls: 'k' },
                  { t: ' ' },
                  { t: "'@clerk/backend'", cls: 's' },
                ],
                [{ t: '' }],
                [
                  { t: 'const', cls: 'k' },
                  { t: ' clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })' },
                ],
                [{ t: '' }],
                [
                  { t: 'const', cls: 'k' },
                  { t: ' m2mToken = ' },
                  { t: 'await', cls: 'k' },
                  { t: ' clerk.m2m.createToken({' },
                ],
                [{ t: '  machineSecretKey: process.env.CLERK_MACHINE_SECRET_KEY,' }],
                [
                  { t: '  secondsUntilExpiration: 300,' },
                  { t: '   // defaults to null — never expires', cls: 'c' },
                ],
                [
                  { t: '  minRemainingTtlSeconds: 60,' },
                  { t: '   // reuse; opaque tokens only', cls: 'c' },
                ],
                [{ t: '})' }],
              ]}
            />
            <CodeBlock
              bar="send — bearer on the request"
              lines={[
                [
                  { t: 'await', cls: 'k' },
                  { t: ' fetch(dataSourceUrl, {' },
                ],
                [
                  { t: '  headers: { Authorization: ' },
                  { t: '`Bearer ${m2mToken.secret}`', cls: 's' },
                  { t: ' },' },
                ],
                [{ t: '})' }],
              ]}
            />
            <CodeBlock
              bar="verify — the receiving service"
              lines={[
                [
                  { t: 'const', cls: 'k' },
                  { t: ' verified = ' },
                  { t: 'await', cls: 'k' },
                  { t: ' clerkClient.m2m.verify({ token })' },
                ],
              ]}
            />
          </div>

          <p className="section-sub" style={{ marginTop: 24, maxWidth: '70ch' }}>
            Set an expiry on every agent token — <code>secondsUntilExpiration</code> defaults to <code>null</code>, which
            means it never expires. Prefer opaque tokens when revocation matters: a revoked JWT stays valid until it
            expires.
          </p>
        </div>
      </section>

      <section className="block" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <span className="section-eyebrow">See it run</span>
          <h2 className="section-title">Question to dashboard</h2>

          <div className="media-grid">
            <VideoDemo
              label="Claude Code · analysis"
              title="From a question to a validated query"
              caption="Profiling the dataset, writing the query, and running the validation pass before any result is presented."
              slotNote="A capture of an exploration session: profile, query, validate, then present."
            />
            <VideoDemo
              label="Claude Code · dashboard"
              title="An interactive dashboard, built"
              caption="Results composed into a dashboard with real filters, using the design system’s components."
              slotNote="A capture of the dashboard builder producing a filterable surface from query results."
            />
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <span className="section-eyebrow">Install</span>
          <h2 className="section-title">Nine skills, four sources</h2>

          <div className="install-grid">
            <CodeBlock
              bar="Claude Code"
              lines={[
                [
                  { t: 'claude', cls: 'k' },
                  { t: ' plugin install ' },
                  { t: 'cre8-data@tmorrow_ai', cls: 's' },
                ],
              ]}
            />
            <CodeBlock
              bar="Codex CLI"
              lines={[
                [
                  { t: 'codex', cls: 'k' },
                  { t: ' plugin add ' },
                  { t: 'cre8-data@tmorrow_ai', cls: 's' },
                ],
              ]}
            />
            <CodeBlock
              bar="Gemini CLI"
              lines={[
                [{ t: '// Clone the marketplace, install the extension root', cls: 'c' }],
                [
                  { t: 'gemini', cls: 'k' },
                  { t: ' extensions install ' },
                  { t: './tmorrow_ai/cre8-data', cls: 's' },
                ],
              ]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
