import type { Metadata } from 'next'
import CardGrid, { PageHeader } from '@/components/CardGrid'
import CodeBlock from '@/components/CodeBlock'
import VideoDemo from '@/components/VideoDemo'
import { CRE8_AGENTS, CRE8_SKILLS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Design system plugin',
  description:
    'The cre8 plugin: an MCP server plus five skills, three specialist agents, and a verification workflow, for Claude Code, Cowork, Codex CLI, and Gemini CLI.',
}

export default function DesignSystemPage() {
  return (
    <>
      <PageHeader
        eyebrow="The cre8 plugin"
        title={
          <>
            An MCP server plus five skills that teach an agent to{' '}
            <span className="grad">actually use it</span>.
          </>
        }
        lede="A live tool call finds the right component. A skill is what stops an agent from stopping there — composition rules, token architecture, and framework-specific conventions the MCP intentionally doesn’t restate."
      />

      <section className="block">
        <div className="container">
          <span className="section-eyebrow">Skills</span>
          <h2 className="section-title">Five skills, bundled as one plugin</h2>
          <p className="section-sub">
            Installed together on Claude Code, Cowork, Codex CLI, and Gemini CLI — lookup, generation, brand theming,
            and live interactive surfaces.
          </p>
          <CardGrid items={CRE8_SKILLS} light />
        </div>
      </section>

      <section className="block" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <span className="section-eyebrow">Agents and workflow</span>
          <h2 className="section-title">Three specialists, one workflow that drives them</h2>
          <p className="section-sub">
            Building a branded MCP App is three jobs with hard handoffs between them. Each runs as its own agent that
            returns to the main session with named artifacts, so the next stage starts from evidence rather than a
            summary.
          </p>
          <CardGrid items={CRE8_AGENTS} light />

          <p className="section-sub" style={{ marginTop: 24 }}>
            <strong style={{ color: 'var(--cre8-color-content-default)' }}>Why the auditor matters.</strong> A local
            harness passing is not the desktop app working, and the difference is invisible in a summary. Every scenario
            the debugger reports carries how it was observed and what evidence backs it; a separate agent that did not do
            the work then tries to refute each pass claim. What survives is reported as passing. What doesn’t is marked
            unverified — which is the honest answer, and the one you can act on.
          </p>

          <CodeBlock
            bar="Claude Code · run the workflow"
            lines={[
              [{ t: '// Ask for it by name — workflows need an explicit opt-in', cls: 'c' }],
              [{ t: '> ' }, { t: 'run the cre8:workflow-themed-mcp-app workflow', cls: 's' }],
              [{ t: '' }],
              [{ t: '// Optional args', cls: 'c' }],
              [{ t: '{' }],
              [
                { t: '  ' },
                { t: '"brandSource"', cls: 'k' },
                { t: ': ' },
                { t: '"https://example.com"', cls: 's' },
                { t: ',' },
              ],
              [
                { t: '  ' },
                { t: '"hosts"', cls: 'k' },
                { t: ': [' },
                { t: '"Claude Desktop"', cls: 's' },
                { t: ', ' },
                { t: '"ChatGPT"', cls: 's' },
                { t: '],' },
              ],
              [
                { t: '  ' },
                { t: '"entry"', cls: 'k' },
                { t: ': ' },
                { t: '"theme"', cls: 's' },
                { t: '  ' },
                { t: '// or "integrate" | "debug"', cls: 'c' },
              ],
              [{ t: '}' }],
            ]}
          />
        </div>
      </section>

      <section className="block">
        <div className="container">
          <span className="section-eyebrow">See it run</span>
          <h2 className="section-title">The workflow, end to end</h2>
          <p className="section-sub">
            Brand extraction through to a verified render in both desktop hosts — the parts a screenshot can’t show.
          </p>

          <div className="media-grid">
            <VideoDemo
              label="Claude Code · workflow"
              title="Theme, build, verify"
              caption="The three specialists running in sequence, with per-host verification lanes and the auditor’s downgrades."
              slotNote="A capture of the workflow running: scoping, the theme handoff, both verification lanes, and the final report."
            />
            <VideoDemo
              label="Claude Desktop · MCP App"
              title="The branded app, rendering"
              caption="A tool call returning a live interactive surface in the host, themed from the extracted brand."
              slotNote="A capture of the finished MCP App rendering and handling one interaction round trip in Claude Desktop."
            />
          </div>
        </div>
      </section>

      <section className="block" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <span className="section-eyebrow">Install</span>
          <h2 className="section-title">One bundle, four hosts</h2>

          <div className="install-grid">
            <CodeBlock
              bar="Claude Code"
              lines={[
                [{ t: '// MCP server, five skills, three agents, one workflow', cls: 'c' }],
                [
                  { t: 'claude', cls: 'k' },
                  { t: ' plugin install ' },
                  { t: 'cre8@tmorrow_ai', cls: 's' },
                ],
              ]}
            />
            <CodeBlock
              bar="Codex CLI"
              lines={[
                [{ t: '// Same bundle, Codex’s own plugin format', cls: 'c' }],
                [
                  { t: 'codex', cls: 'k' },
                  { t: ' plugin add ' },
                  { t: 'cre8@tmorrow_ai', cls: 's' },
                ],
              ]}
            />
            <CodeBlock
              bar="Gemini CLI"
              lines={[
                [{ t: '// Same bundle, as a Gemini extension', cls: 'c' }],
                [
                  { t: 'gemini', cls: 'k' },
                  { t: ' extensions install ' },
                  { t: 'https://github.com/tmorrowdev/cre8-gemini-extension.git', cls: 's' },
                ],
              ]}
            />
          </div>

          <p className="section-sub" style={{ marginTop: 24, maxWidth: '70ch' }}>
            <strong style={{ color: 'var(--cre8-color-content-default)' }}>
              On Cursor, Windsurf, VS Code, OpenCode, or any other MCP-compatible tool?
            </strong>{' '}
            Those don’t have an equivalent plugin mechanism for the skills yet. But <code>@tmorrow/cre8-mcp</code> is the
            same standard MCP server either way — drop it into that tool’s MCP config and every tool works identically.
            The composition guidance the skills carry is still reachable through the MCP itself: call{' '}
            <code>cre8_guide</code> and <code>get_composition</code> the same way an agent with the skills installed
            would.
          </p>
        </div>
      </section>
    </>
  )
}
