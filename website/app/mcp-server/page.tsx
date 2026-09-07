import type { Metadata } from 'next'
import { Card, PageHeader } from '@/components/CardGrid'
import CodeBlock from '@/components/CodeBlock'
import { MCP_TOOLS, MCP_TOOL_COUNT } from '@/lib/content'

export const metadata: Metadata = {
  title: 'MCP server',
  description: `@tmorrow/cre8-mcp — ${MCP_TOOL_COUNT} tools spanning component lookup, agent-authored UI trees, and UI that streams live.`,
}

export default function McpServerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Under the hood"
        title={
          <>
            The MCP server the <span className="grad">plugin is built on</span>.
          </>
        }
        lede={`Point any MCP client at @tmorrow/cre8-mcp directly and it gains ${MCP_TOOL_COUNT} tools spanning lookup, agent-authored UI trees, and UI that streams live — no fine-tuning, no stale context.`}
      />

      <section className="block dark" style={{ background: 'linear-gradient(180deg,#0B1220,#080D1A)', color: '#E2E8F0' }}>
        <div className="container">
          {MCP_TOOLS.map((group) => (
            <div key={group.group}>
              <h2 className="subhead" style={{ color: '#fff' }}>
                {group.group}
              </h2>
              <div className="tools-grid">
                {group.tools.map((t) => (
                  <Card key={t.name} item={t} />
                ))}
              </div>
            </div>
          ))}

          <div className="tools-grid" style={{ marginTop: 16 }}>
            <div className="tool" style={{ borderStyle: 'dashed', background: 'transparent' }}>
              <div className="fn" style={{ color: 'var(--accent)' }}>
                your client
              </div>
              <p>
                Works in Claude Code, Cursor, Windsurf, VS Code, Gemini CLI, OpenCode, Codex CLI, and any other Model
                Context Protocol host.
              </p>
            </div>
          </div>

          <CodeBlock
            bar="~/.config · mcp.json"
            lines={[
              [{ t: '// Connect any MCP client to the Cre8 design system', cls: 'c' }],
              [{ t: '{' }],
              [{ t: '  ' }, { t: '"mcpServers"', cls: 'k' }, { t: ': {' }],
              [{ t: '    ' }, { t: '"cre8"', cls: 'k' }, { t: ': {' }],
              [
                { t: '      ' },
                { t: '"command"', cls: 'k' },
                { t: ': ' },
                { t: '"npx"', cls: 's' },
                { t: ',' },
              ],
              [
                { t: '      ' },
                { t: '"args"', cls: 'k' },
                { t: ': [' },
                { t: '"-y"', cls: 's' },
                { t: ', ' },
                { t: '"@tmorrow/cre8-mcp"', cls: 's' },
                { t: ']' },
              ],
              [{ t: '    }' }],
              [{ t: '  }' }],
              [{ t: '}' }],
            ]}
          />

          <CodeBlock
            bar='agent output · generate_code("stat row")'
            lines={[
              [{ t: '<', cls: 'k' }, { t: 'cre8-grid', cls: 't' }, { t: '>', cls: 'k' }],
              [{ t: '  <', cls: 'k' }, { t: 'cre8-grid-item', cls: 't' }, { t: '>', cls: 'k' }],
              [
                { t: '    <', cls: 'k' },
                { t: 'cre8-feature', cls: 't' },
                { t: ' heading=' },
                { t: '"Requests"', cls: 's' },
                { t: ' description=' },
                { t: '"1.2M this month"', cls: 's' },
                { t: '></', cls: 'k' },
                { t: 'cre8-feature', cls: 't' },
                { t: '>', cls: 'k' },
              ],
              [{ t: '  </', cls: 'k' }, { t: 'cre8-grid-item', cls: 't' }, { t: '>', cls: 'k' }],
              [{ t: '</', cls: 'k' }, { t: 'cre8-grid', cls: 't' }, { t: '>', cls: 'k' }, { t: '  ' }, { t: '// ← real components, accessible, on-brand', cls: 'c' }],
            ]}
          />
        </div>
      </section>
    </>
  )
}
