/**
 * Tyler Morrow — Portfolio
 * Built with @tmorrow/cre8-react (the design system Tyler authored).
 *
 * Sections:
 *  1. Header          — sticky nav
 *  2. Hero            — intro + CTAs
 *  3. Case Study      — Omni App Builder (AI2UI), stats, accordion, security, timeline
 *  4. AI2UI Demo      — interactive state-machine driven prompt-to-UI simulation
 *  5. CRE8 Section    — design system overview + live component showcase
 *  6. Experience      — tabbed work history
 *  7. Skills          — tag grid by domain
 *  8. Contact/Footer  — email, location, LinkedIn
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Cre8Main,
  Cre8Header,
  Cre8Footer,
  Cre8GlobalNav,
  Cre8GlobalNavItem,
  Cre8TertiaryNav,
  Cre8TertiaryNavItem,
  Cre8Section,
  Cre8Band,
  Cre8LayoutContainer,
  Cre8LayoutSection,
  Cre8Card,
  Cre8Grid,
  Cre8GridItem,
  Cre8Divider,
  Cre8Heading,
  Cre8TextPassage,
  Cre8TextLink,
  Cre8Button,
  Cre8Badge,
  Cre8Tag,
  Cre8Tabs,
  Cre8Tab,
  Cre8TabPanel,
  Cre8Icon,
  Cre8Field,
  Cre8Alert,
  Cre8InlineAlert,
  Cre8LoadingSpinner,
  Cre8ProgressMeter,
  Cre8Accordion,
  Cre8AccordionItem,
  Cre8Feature,
  Cre8PageHeader,
  Cre8Table,
  Cre8TableHeader,
  Cre8TableBody,
  Cre8TableRow,
  Cre8TableHeaderCell,
  Cre8TableCell,
  Cre8List,
  Cre8ListItem,
} from '@tmorrow/cre8-react';

/*
 * Packaged icons.
 *
 * @tmorrow/cre8-wc ships 136 SVGs under `./icons/*` and every icon-aware
 * component (Cre8Icon, Cre8Button, Cre8Badge) takes the raw SVG string via an
 * `svg` prop — this is the same `?raw` convention the design system uses
 * internally (see accordion-item.js importing Caret_Up.svg?raw). The vite
 * config already resolves `?raw` for these packages.
 */
import svgPlayArrow from '@tmorrow/cre8-wc/icons/Play_Arrow.svg?raw';
import svgArrowRight from '@tmorrow/cre8-wc/icons/Caret_Right.svg?raw';
import svgEmail from '@tmorrow/cre8-wc/icons/email.svg?raw';
import svgLinkedIn from '@tmorrow/cre8-wc/icons/linkedin.svg?raw';
import svgExternal from '@tmorrow/cre8-wc/icons/External_Link.svg?raw';
import svgDeltaUp from '@tmorrow/cre8-wc/icons/delta-up.svg?raw';
import svgDeltaDown from '@tmorrow/cre8-wc/icons/delta-down.svg?raw';
import svgCheck from '@tmorrow/cre8-wc/icons/Check_Filled.svg?raw';
import svgLocation from '@tmorrow/cre8-wc/icons/Location.svg?raw';
import svgSquare from '@tmorrow/cre8-wc/icons/square.svg?raw';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { label: 'Work', href: '#case-study' },
  { label: 'CRE8', href: '#cre8' },
  { label: 'Demo', href: '#demo' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const STATS = [
  { value: '57.6%', label: 'of production backend authored', sub: 'top contributor of 10 engineers' },
  { value: '232', label: 'merged pull requests', sub: 'backend, frontend, prototype' },
  { value: '117', label: 'AI2UI stories shipped', sub: 'end-to-end feature delivery' },
  { value: '~595K', label: 'lines of code added', sub: 'across the full stack' },
  { value: '100%', label: 'sole proof-of-concept author', sub: 'backend foundation & architecture' },
  { value: '10 mo', label: 'blank repo to production', sub: 'hardened & enterprise-grade' },
];

const ARCHITECTURE_ITEMS = [
  {
    label: 'In-process Claude Agent SDK orchestration',
    content:
      'Replaced per-generation Docker containers with in-process Agent SDK execution, cutting cold-start latency from seconds to milliseconds and eliminating container lifecycle complexity in the hot path.',
  },
  {
    label: 'Multi-agent orchestration with signing proxy',
    content:
      'An orchestrator agent delegates to specialist sub-agents (UI, Data, QA). All outbound API calls route through a local signing proxy, keeping auth credentials out of model context and ensuring every request is auditable.',
  },
  {
    label: 'Live AsyncIterable streaming pipeline',
    content:
      'A fully-typed pipeline consumes the Agent SDK\'s AsyncIterable of message events — tool_use, tool_result, text — and renders each incrementally in the browser, giving users real-time visibility into generation.',
  },
  {
    label: 'Omni-data MCP bridge',
    content:
      'Generated UIs fetch live enterprise data at runtime through MCP servers. The bridge implements executeMcpTool/pollMcpJob so that any MCP-registered tool is automatically available to every generated application.',
  },
  {
    label: 'Self-healing runtime',
    content:
      'A runtime-error endpoint captures uncaught exceptions from generated apps and routes them to an auto-fix coordinator agent. Sandboxes rehydrate from a database snapshot after container restarts, preserving generation state.',
  },
];

const SECURITY_LAYERS = [
  { layer: '1', title: 'Input Sanitization', desc: 'Prompt content stripped and validated before any model call.' },
  { layer: '2', title: 'Signing Proxy', desc: 'Auth credentials never reach model context — all API calls proxied and signed server-side.' },
  { layer: '3', title: 'Sandbox Isolation', desc: 'Generated code runs in isolated iframes; no direct DOM or network access to host.' },
  { layer: '4', title: 'MCP Permission Scoping', desc: 'Each generated app receives only the MCP tool subset declared in its schema.' },
  { layer: '5', title: 'Audit Logging', desc: 'Every agent invocation, tool call, and generated artifact is logged with provenance.' },
];

const TIMELINE_MILESTONES = [
  { date: "AUG '25", event: 'Blank repo — solo PoC backend, first end-to-end generation' },
  { date: "OCT '25", event: 'Team expands; architecture hardened for multi-tenant use' },
  { date: "NOV '25", event: 'Agent SDK replaces Docker container execution model' },
  { date: "DEC '25", event: 'MCP data bridge ships; generated UIs connect to live Omni data' },
  { date: "MAR '26", event: 'Self-healing runtime & auto-fix coordinator in production' },
  { date: "APR '26", event: 'Streaming pipeline rewrite — sub-100ms first-token latency' },
  { date: "JUN '26", event: '117 AI2UI stories shipped; system promoted to enterprise GA' },
];

/**
 * AI2UI Demo state machine stages.
 * Each stage has a log line shown in the generation console,
 * and a duration (ms) before advancing to the next stage.
 *
 * State flow:
 *   idle → analyzing → orchestrating → generating → streaming → complete
 *   complete --[8s auto-reset]--> idle
 */
const DEMO_STAGES = [
  { id: 'analyzing',     log: '▸ Analyzing prompt...',                          duration: 900  },
  { id: 'orchestrating', log: '▸ Orchestrating agents: UI-Agent, Data-Agent',   duration: 1100 },
  { id: 'fetching',      log: '▸ Fetching CRE8 component catalog via MCP...',   duration: 1000 },
  { id: 'planning',      log: '▸ Planning component tree...',                   duration: 900  },
  { id: 'streaming',     log: '▸ Streaming JSX generation...',                  duration: 1400 },
  { id: 'qa',            log: '▸ Running design QA validation...',              duration: 700  },
  { id: 'complete',      log: '▸ UI ready.',                                    duration: 0    },
];

const PRESET_PROMPTS = [
  'Sales dashboard with monthly revenue chart',
  'User management table with filters',
  'Login form with email and password',
  'Onboarding checklist for new users',
];

const SKILLS_BY_DOMAIN = [
  {
    domain: 'AI / ML',
    skills: [
      'Generative AI', 'LLM Development', 'Agentic AI', 'Claude Agent SDK',
      'MCP', 'LiteLLM', 'Amazon Bedrock', 'Prompt Engineering',
    ],
  },
  {
    domain: 'Languages',
    skills: ['TypeScript', 'JavaScript ES6+', 'Python', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    domain: 'Frontend',
    skills: [
      'React', 'Angular', 'Vue', 'Lit', 'Web Components', 'Next.js',
      'Design Systems', 'Design Tokens', 'WCAG',
    ],
  },
  {
    domain: 'Backend & Platform',
    skills: [
      'Node.js', 'REST APIs', 'MCP Servers', 'Docker',
      'AWS ECS Fargate', 'CloudFront', 'S3', 'CI/CD', 'Nx',
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper: detect which mini-UI to render based on prompt text
// ---------------------------------------------------------------------------

/** @param {string} prompt */
function detectPromptType(prompt) {
  const p = prompt.toLowerCase();
  if (p.includes('dashboard') || p.includes('revenue') || p.includes('chart')) return 'dashboard';
  if (p.includes('table') || p.includes('management') || p.includes('user')) return 'table';
  if (p.includes('login') || p.includes('form') || p.includes('sign')) return 'login';
  if (p.includes('checklist') || p.includes('onboard')) return 'checklist';
  return 'cards';
}

// ---------------------------------------------------------------------------
// Sub-components: Generated UI previews
// Each represents a different "app type" generated by AI2UI.
// ---------------------------------------------------------------------------

/** Mini dashboard: fake bar chart + status pills */
function MiniDashboard() {
  const bars = [
    { month: 'Jan', pct: 62 },
    { month: 'Feb', pct: 75 },
    { month: 'Mar', pct: 58 },
    { month: 'Apr', pct: 88 },
    { month: 'May', pct: 71 },
    { month: 'Jun', pct: 94 },
  ];

  return (
    <div style={{ padding: '16px' }}>
      <Cre8Heading tagVariant="h4">Monthly Revenue</Cre8Heading>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '80px', marginTop: '12px', marginBottom: '12px' }}>
        {bars.map(({ month, pct }) => (
          <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div
              style={{
                width: '100%',
                height: `${pct}%`,
                background: 'var(--cre8-color-bg-brand-strong, #3B82F6)',
                borderRadius: '3px 3px 0 0',
                opacity: 0.85,
              }}
            />
            <span style={{ fontSize: '10px', color: 'var(--cre8-color-content-subtle, #64748B)' }}>{month}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Cre8Badge text="Revenue 14%" status="success" svg={svgDeltaUp} />
        <Cre8Badge text="Churn 3%" status="success" svg={svgDeltaDown} />
        <Cre8Badge text="Trials Pending" status="warning" />
      </div>
    </div>
  );
}

/** Mini user management table */
function MiniTable() {
  const users = [
    { name: 'Alice Chen', role: 'Admin', status: 'Active' },
    { name: 'Ben Torres', role: 'Editor', status: 'Pending' },
    { name: 'Carol Wu',   role: 'Viewer', status: 'Active' },
  ];

  return (
    <div style={{ padding: '16px' }}>
      <Cre8Heading tagVariant="h4">User Management</Cre8Heading>
      <div style={{ marginTop: '12px' }}>
        <Cre8Table>
          <Cre8TableHeader>
            <Cre8TableRow>
              <Cre8TableHeaderCell>Name</Cre8TableHeaderCell>
              <Cre8TableHeaderCell>Role</Cre8TableHeaderCell>
              <Cre8TableHeaderCell>Status</Cre8TableHeaderCell>
            </Cre8TableRow>
          </Cre8TableHeader>
          <Cre8TableBody>
            {users.map((u) => (
              <Cre8TableRow key={u.name}>
                <Cre8TableCell>{u.name}</Cre8TableCell>
                <Cre8TableCell>{u.role}</Cre8TableCell>
                <Cre8TableCell>
                  <Cre8Badge
                    text={u.status}
                    variant={u.status === 'Active' ? 'success' : 'warning'}
                  />
                </Cre8TableCell>
              </Cre8TableRow>
            ))}
          </Cre8TableBody>
        </Cre8Table>
      </div>
    </div>
  );
}

/** Mini login form */
function MiniLogin() {
  return (
    <div style={{ padding: '16px', maxWidth: '320px' }}>
      <Cre8Heading tagVariant="h4">Sign In</Cre8Heading>
      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Cre8Field label="Email" type="email" placeholder="you@company.com" />
        <Cre8Field label="Password" type="password" placeholder="••••••••" />
        <Cre8Button text="Sign In" variant="primary" fullWidth />
        <div style={{ textAlign: 'center' }}>
          <Cre8TextLink href="#">Forgot password?</Cre8TextLink>
        </div>
      </div>
    </div>
  );
}

/** Mini onboarding checklist */
function MiniChecklist() {
  const steps = [
    { label: 'Create your account', done: true },
    { label: 'Set up your workspace', done: true },
    { label: 'Invite your team', done: false },
    { label: 'Connect your data sources', done: false },
    { label: 'Launch your first app', done: false },
  ];

  return (
    <div style={{ padding: '16px' }}>
      <Cre8Heading tagVariant="h4">Getting Started</Cre8Heading>
      <Cre8ProgressMeter value={40} />
      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {steps.map((step) => (
          <div
            key={step.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 12px',
              borderRadius: '6px',
              background: step.done
                ? 'var(--cre8-color-bg-success, #ECFEFF)'
                : 'var(--cre8-color-bg-subtle, #F1F5F9)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'flex',
                color: step.done
                  ? 'var(--cre8-color-content-success, #15803D)'
                  : 'var(--cre8-color-content-subtle, #64748B)',
              }}
            >
              <Cre8Icon svg={step.done ? svgCheck : svgSquare} />
            </span>
            <span
              style={{
                fontSize: '13px',
                textDecoration: step.done ? 'line-through' : 'none',
                color: step.done
                  ? 'var(--cre8-color-content-subtle, #64748B)'
                  : 'var(--cre8-color-content-default, #0F172A)',
              }}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Mini card grid (default fallback) */
function MiniCards() {
  const cards = [
    { title: 'Analytics', icon: '📊', desc: 'Real-time metrics and KPIs' },
    { title: 'Workflows', icon: '⚙️', desc: 'Automate repetitive tasks' },
    { title: 'Reports', icon: '📄', desc: 'Export and share insights' },
  ];

  return (
    <div style={{ padding: '16px' }}>
      <Cre8Heading tagVariant="h4">Your Workspace</Cre8Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '12px' }}>
        {cards.map((c) => (
          <div
            key={c.title}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--cre8-color-border-default, #E2E8F0)',
              background: 'var(--cre8-color-bg-default, #ffffff)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span style={{ fontSize: '20px' }}>{c.icon}</span>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>{c.title}</span>
            <span style={{ fontSize: '11px', color: 'var(--cre8-color-content-subtle, #64748B)' }}>{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section: AI2UI Interactive Demo
// ---------------------------------------------------------------------------

/**
 * AI2UI Demo component.
 *
 * State machine:
 *   'idle'          — waiting for user to type and click Generate
 *   'running'       — cycling through DEMO_STAGES sequentially, appending log lines
 *   'complete'      — all stages done; shows generated UI preview
 *
 * The stageIndexRef tracks which DEMO_STAGES entry is currently active.
 * A setTimeout chain advances the stages; each stage appends its log line
 * and then schedules the next stage after its `duration` ms.
 *
 * After 8 seconds in 'complete' state, auto-resets to 'idle'.
 */
function DemoSection() {
  /** @type {'idle' | 'running' | 'complete'} */
  const [demoState, setDemoState] = useState('idle');
  const [prompt, setPrompt] = useState('');
  const [logLines, setLogLines] = useState([]);
  const [promptType, setPromptType] = useState('cards');

  const timeoutRef = useRef(null);
  const stageIndexRef = useRef(0);
  const logEndRef = useRef(null);

  /** Scroll the generation log to bottom as lines appear. */
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logLines]);

  /** Auto-reset after 8 seconds of 'complete'. */
  useEffect(() => {
    if (demoState === 'complete') {
      const t = setTimeout(reset, 8000);
      return () => clearTimeout(t);
    }
  }, [demoState]);

  /** Advance through DEMO_STAGES one by one, appending log lines. */
  const advanceStage = useCallback(() => {
    const idx = stageIndexRef.current;
    if (idx >= DEMO_STAGES.length) return;

    const stage = DEMO_STAGES[idx];
    setLogLines((prev) => [...prev, stage.log]);
    stageIndexRef.current = idx + 1;

    if (stage.id === 'complete') {
      setDemoState('complete');
      return;
    }

    timeoutRef.current = setTimeout(advanceStage, stage.duration);
  }, []);

  /** Start generation from the current prompt value. */
  const startGeneration = useCallback(() => {
    if (!prompt.trim()) return;

    // Determine which mini-UI to render once done
    setPromptType(detectPromptType(prompt));

    // Reset log and kick off the stage chain
    setLogLines([]);
    stageIndexRef.current = 0;
    setDemoState('running');
    timeoutRef.current = setTimeout(advanceStage, 300);
  }, [prompt, advanceStage]);

  /** Reset everything back to idle. */
  const reset = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setDemoState('idle');
    setLogLines([]);
    setPrompt('');
    stageIndexRef.current = 0;
  }, []);

  const isRunning = demoState === 'running';
  const isComplete = demoState === 'complete';

  const GeneratedUI = {
    dashboard: MiniDashboard,
    table: MiniTable,
    login: MiniLogin,
    checklist: MiniChecklist,
    cards: MiniCards,
  }[promptType];

  return (
    <Cre8Band>
      <Cre8LayoutContainer>
        <div id="demo" style={{ scrollMarginTop: '80px', padding: '64px 0' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Cre8Badge text="Live Demo" />
            <div style={{ marginTop: '12px' }}>
              <Cre8Heading tagVariant="h2">See It Work</Cre8Heading>
            </div>
            <Cre8TextPassage>
              <p style={{ maxWidth: '560px', margin: '12px auto 0' }}>
                This portfolio was scaffolded with AI2UI — the same system Tyler built at Omnicom.
                Try the prompt-to-UI generator below.
              </p>
            </Cre8TextPassage>
          </div>

          {/* Prompt input area */}
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Preset chips */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {PRESET_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPrompt(p)}
                  disabled={isRunning}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: '1px solid var(--cre8-color-border-default, #E2E8F0)',
                    background: prompt === p
                      ? 'var(--cre8-color-bg-brand-strong, #3B82F6)'
                      : 'var(--cre8-color-bg-default, #ffffff)',
                    color: prompt === p
                      ? 'var(--cre8-color-content-knockout, #ffffff)'
                      : 'var(--cre8-color-content-default, #0F172A)',
                    cursor: isRunning ? 'not-allowed' : 'pointer',
                    fontSize: '13px',
                    transition: 'all 0.15s ease',
                    opacity: isRunning ? 0.5 : 1,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Text input */}
            <Cre8Field
              label="Describe the app or UI you want"
              placeholder="Describe the app or UI you want..."
              value={prompt}
              disabled={isRunning || isComplete}
            />

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Cre8Button
                text="Generate UI"
                variant="primary"
                disabled={!prompt.trim() || isRunning || isComplete}
                loading={isRunning}
                onClick={startGeneration}
              />
              {(isRunning || isComplete) && (
                <Cre8Button
                  text="Reset"
                  variant="secondary"
                  onClick={reset}
                />
              )}
            </div>

            {/* Generation log — only visible while running or complete */}
            {(isRunning || isComplete) && (
              <div
                style={{
                  background: '#0d1117',
                  borderRadius: '8px',
                  padding: '16px 20px',
                  fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace',
                  fontSize: '13px',
                  lineHeight: '1.7',
                  minHeight: '120px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  border: '1px solid #30363d',
                }}
              >
                {logLines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      color: line.includes('ready') ? '#3fb950' : '#c9d1d9',
                      animation: 'fadeIn 0.2s ease',
                    }}
                  >
                    {line}
                  </div>
                ))}
                {isRunning && (
                  <div style={{ color: '#58a6ff', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <Cre8Icon svg={svgPlayArrow} aria-hidden="true" />
                    <span style={{ display: 'inline-block', animation: 'blink 1s step-end infinite' }}>█</span>
                  </div>
                )}
                <div ref={logEndRef} />
              </div>
            )}

            {/* Generated UI preview */}
            {isComplete && (
              <div
                style={{
                  border: '2px solid var(--cre8-color-border-brand-strong, #2563EB)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: 'var(--cre8-color-bg-default, #ffffff)',
                  animation: 'slideIn 0.3s ease',
                }}
              >
                {/* Preview header bar */}
                <div
                  style={{
                    background: 'var(--cre8-color-bg-subtle, #F1F5F9)',
                    padding: '8px 12px',
                    borderBottom: '1px solid var(--cre8-color-border-default, #E2E8F0)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--cre8-color-content-subtle, #64748B)', marginLeft: '8px' }}>
                    AI2UI Preview — {prompt}
                  </span>
                  <Cre8Badge text="Live" status="success" />
                </div>
                <GeneratedUI />
              </div>
            )}

            {/* Attribution */}
            <div style={{ textAlign: 'center', marginTop: '8px' }}>
              <span style={{ fontSize: '12px', color: 'var(--cre8-color-content-subtle, #64748B)' }}>
                Powered by{' '}
                <strong>Claude Agent SDK</strong> + <strong>@tmorrow/cre8-react</strong>
              </span>
            </div>
          </div>
        </div>
      </Cre8LayoutContainer>

      {/* Keyframe animations injected inline — keeps this a single-file component */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </Cre8Band>
  );
}

// ---------------------------------------------------------------------------
// Section: CRE8 Design System
// ---------------------------------------------------------------------------

function Cre8SystemSection() {
  return (
    <Cre8Section>
      <Cre8LayoutContainer>
        <div id="cre8" style={{ scrollMarginTop: '80px', paddingTop: '64px', paddingBottom: '64px' }}>
          <Cre8Badge text="Open Source" />
          <div style={{ marginTop: '12px' }}>
            <Cre8Heading tagVariant="h2">CRE8 Design System</Cre8Heading>
          </div>
          <Cre8TextPassage>
            <p style={{ maxWidth: '600px', marginTop: '12px' }}>
              72-component AI-native React library. The backbone of Omni App Builder's
              schema-driven UI generation — from a blank prompt to a deployed interface.
            </p>
          </Cre8TextPassage>

          {/* Three feature cards */}
          <Cre8Grid>
            <Cre8GridItem>
              <Cre8Card>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>⚛️</div>
                <Cre8Heading tagVariant="h3">@tmorrow/cre8-react</Cre8Heading>
                <Cre8TextPassage>
                  <p>
                    72 React components. AI-native by design — every component ships
                    a machine-readable schema so agents can generate valid UIs without
                    hallucinating props.
                  </p>
                </Cre8TextPassage>
                <div style={{ marginTop: '12px' }}>
                  <Cre8Badge text="72 Components" />
                  <Cre8Badge text="TypeScript" />
                </div>
              </Cre8Card>
            </Cre8GridItem>

            <Cre8GridItem>
              <Cre8Card>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🌐</div>
                <Cre8Heading tagVariant="h3">@tmorrow/cre8-wc</Cre8Heading>
                <Cre8TextPassage>
                  <p>
                    Framework-agnostic web components built on Lit. Drop into Angular,
                    React, Vue, or vanilla JS — the same design tokens, the same components,
                    zero framework lock-in.
                  </p>
                </Cre8TextPassage>
                <div style={{ marginTop: '12px' }}>
                  <Cre8Badge text="Lit / Web Components" />
                  <Cre8Badge text="Framework-Agnostic" />
                </div>
              </Cre8Card>
            </Cre8GridItem>

            <Cre8GridItem>
              <Cre8Card>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎨</div>
                <Cre8Heading tagVariant="h3">Design Tokens</Cre8Heading>
                <Cre8TextPassage>
                  <p>
                    3-tiered token architecture (global → semantic → component) built at
                    Cre8-scale: multi-brand, multi-theme, and framework-agnostic.
                    Dark mode and high-contrast out of the box.
                  </p>
                </Cre8TextPassage>
                <div style={{ marginTop: '12px' }}>
                  <Cre8Badge text="3-Tier System" />
                  <Cre8Badge text="Multi-Brand" />
                </div>
              </Cre8Card>
            </Cre8GridItem>
          </Cre8Grid>

          {/* Live component showcase */}
          <div style={{ marginTop: '48px' }}>
            <Cre8Heading tagVariant="h3">Live Component Preview</Cre8Heading>
            <Cre8TextPassage>
              <p>These are actual CRE8 components — the same ones AI2UI generates with.</p>
            </Cre8TextPassage>

            <div
              style={{
                marginTop: '24px',
                padding: '32px',
                border: '1px solid var(--cre8-color-border-default, #E2E8F0)',
                borderRadius: '12px',
                background: 'var(--cre8-color-bg-subtle, #F1F5F9)',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              {/* Buttons row */}
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', margin: '0 0 12px' }}>
                  Cre8Button — variants
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Cre8Button text="Primary" variant="primary" />
                  <Cre8Button text="Secondary" variant="secondary" />
                  <Cre8Button text="Tertiary" variant="tertiary" />
                  <Cre8Button text="Loading" variant="primary" loading />
                  <Cre8Button text="Disabled" variant="primary" disabled />
                </div>
              </div>

              <Cre8Divider />

              {/* Badges row */}
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', margin: '0 0 12px' }}>
                  Cre8Badge — variants
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Cre8Badge text="Default" />
                  <Cre8Badge text="Success" status="success" />
                  <Cre8Badge text="Warning" status="warning" />
                  <Cre8Badge text="Error" status="error" />
                </div>
              </div>

              <Cre8Divider />

              {/* Alerts */}
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', margin: '0 0 12px' }}>
                  Cre8Alert — statuses
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Cre8Alert status="success">UI generation complete — your app is live.</Cre8Alert>
                  <Cre8Alert status="info">New CRE8 components available in v1.1.0.</Cre8Alert>
                </div>
              </div>

              <Cre8Divider />

              {/* Progress */}
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', margin: '0 0 12px' }}>
                  Cre8ProgressMeter
                </p>
                <Cre8ProgressMeter value={72} />
              </div>

              <Cre8Divider />

              {/* Tags */}
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#888', margin: '0 0 12px' }}>
                  Cre8Tag — skills
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['Claude Agent SDK', 'MCP', 'TypeScript', 'React', 'Design Systems', 'Agentic AI'].map((t) => (
                    <Cre8Tag key={t} text={t} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Cre8LayoutContainer>
    </Cre8Section>
  );
}

// ---------------------------------------------------------------------------
// Section: Experience Tabs
// ---------------------------------------------------------------------------

function ExperienceSection() {
  const tabs = [
    {
      label: 'Omnicom',
      period: '2024 – Present',
      roles: [
        {
          title: 'Lead Software Engineer',
          company: 'Omnicom Group (AI2UI / Omni App Builder)',
          period: 'Aug 2025 – Jun 2026',
          bullets: [
            'Authored 57.6% of production backend — #1 contributor of 10 engineers across 10 months.',
            'Replaced per-generation Docker execution with in-process Claude Agent SDK, cutting cold-start latency significantly.',
            'Designed and shipped the MCP data bridge enabling runtime data access in every generated application.',
            'Built the self-healing runtime: runtime-error endpoint → auto-fix coordinator → sandbox rehydration.',
            'Led architecture decisions across multi-agent orchestration, streaming pipeline, and security model.',
            '232 merged PRs; 117 AI2UI stories shipped; ~595K lines of code added.',
          ],
        },
        {
          title: 'Senior Software Engineer',
          company: 'Omnicom Group (AI2UI / Omni App Builder)',
          period: 'Oct 2024 – Aug 2025',
          bullets: [
            'Sole author of the proof-of-concept backend — first end-to-end generation pipeline from blank repo.',
            'Established coding standards, CI/CD pipelines, and Nx monorepo structure adopted by the full team.',
            'Prototyped AI2UI demo that secured continued investment from Omnicom leadership.',
          ],
        },
      ],
    },
    {
      label: 'Cre8',
      period: '2021 – 2024',
      roles: [
        {
          title: 'Software Engineering Advisor',
          company: 'The Cre8 Group',
          period: '2023 – 2024',
          bullets: [
            'Led headless design system architecture for multi-brand, multi-theme enterprise scale.',
            'Owned 3-tier design token architecture: global → semantic → component, supporting 5+ brands.',
            'Defined framework-agnostic web component strategy (Lit) adopted across Angular, React, and Vue apps.',
          ],
        },
        {
          title: 'Senior Software Engineer → Lead UI Engineer',
          company: 'The Cre8 Group',
          period: '2021 – 2023',
          bullets: [
            'Built reusable component library consumed by 50+ product teams across Cre8.',
            'Led WCAG 2.1 AA accessibility audit and remediation across the design system.',
            'Implemented dark mode and high-contrast theming via CSS custom property token cascade.',
          ],
        },
      ],
    },
    {
      label: 'Earlier',
      period: '2019 – 2021',
      roles: [
        {
          title: 'Software Engineer',
          company: 'CoStar Group',
          period: '2020 – 2021',
          bullets: [
            'Built Angular-based property search UIs for commercial real estate platform.',
            'Improved Core Web Vitals scores across high-traffic landing pages.',
          ],
        },
        {
          title: 'Frontend Engineer',
          company: 'Material in Motion',
          period: '2019 – 2020',
          bullets: [
            'Delivered React + TypeScript SPAs for agency clients in media and finance verticals.',
            'Established component library patterns and Storybook documentation workflow.',
          ],
        },
      ],
    },
  ];

  return (
    <Cre8Section>
      <Cre8LayoutContainer>
        <div id="work" style={{ scrollMarginTop: '80px', paddingTop: '64px', paddingBottom: '64px' }}>
          <Cre8Heading tagVariant="h2">Experience</Cre8Heading>

          <div style={{ marginTop: '32px' }}>
            {/*
              * Cre8Tabs owns its own selection state: on firstUpdated it pairs
              * each default-slot <cre8-tab> with the <cre8-tab-panel> at the
              * same index in the *`panel`* slot and toggles `isActive` on both.
              * Two consequences:
              *   - panels MUST carry slot="panel" (they are read via
              *     queryAssignedElements({slot:'panel'}); without it the pairing
              *     loop dereferences undefined and throws during first render)
              *   - panel content must always be rendered, not gated on React
              *     state, or the component has nothing to reveal on tab change.
              * <cre8-tab> has no `label` prop either — its text is slotted.
              */}
            <Cre8Tabs>
              {tabs.map((tab) => (
                <Cre8Tab key={tab.label}>{`${tab.label} · ${tab.period}`}</Cre8Tab>
              ))}
              {tabs.map((tab) => (
                <Cre8TabPanel key={tab.label} slot="panel">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '24px' }}>
                    {tab.roles.map((role) => (
                      <Cre8Card key={role.title + role.period}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                          <div>
                            <Cre8Heading tagVariant="h3">{role.title}</Cre8Heading>
                            <Cre8TextPassage>
                              <p style={{ margin: 0, color: 'var(--cre8-color-content-subtle, #64748B)' }}>{role.company}</p>
                            </Cre8TextPassage>
                          </div>
                          <Cre8Badge text={role.period} />
                        </div>
                        <Cre8List style={{ marginTop: '16px' }}>
                          {role.bullets.map((b) => (
                            <Cre8ListItem key={b}>{b}</Cre8ListItem>
                          ))}
                        </Cre8List>
                      </Cre8Card>
                    ))}
                  </div>
                </Cre8TabPanel>
              ))}
            </Cre8Tabs>
          </div>
        </div>
      </Cre8LayoutContainer>
    </Cre8Section>
  );
}

// ---------------------------------------------------------------------------
// Section: Skills
// ---------------------------------------------------------------------------

function SkillsSection() {
  return (
    <Cre8Band>
      <Cre8LayoutContainer>
        <div id="skills" style={{ scrollMarginTop: '80px', paddingTop: '64px', paddingBottom: '64px' }}>
          <Cre8Heading tagVariant="h2">Skills</Cre8Heading>
          <div style={{ marginTop: '32px' }}>
            <Cre8Grid>
              {SKILLS_BY_DOMAIN.map(({ domain, skills }) => (
                <Cre8GridItem key={domain}>
                  <Cre8Card>
                    <Cre8Heading tagVariant="h4">{domain}</Cre8Heading>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                      {skills.map((skill) => (
                        <Cre8Tag key={skill} text={skill} />
                      ))}
                    </div>
                  </Cre8Card>
                </Cre8GridItem>
              ))}
            </Cre8Grid>
          </div>
        </div>
      </Cre8LayoutContainer>
    </Cre8Band>
  );
}

// ---------------------------------------------------------------------------
// Root App
// ---------------------------------------------------------------------------

export default function App() {
  /** Active tab index for Experience section is managed inside ExperienceSection.
   *  This ref is used only for scrollspy / active nav highlighting. */
  const [activeNav, setActiveNav] = useState('');

  // Simple scrollspy — highlight nav item whose section is in viewport
  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => document.querySelector(href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav('#' + entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  /** Smooth-scroll helper for nav clicks */
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    /*
     * `Cre8Layout` is NOT a page wrapper — it is the two-column content/sidebar
     * primitive (`grid-template-columns: 1fr calc(var(--cre8-sidebar-width, 40%) - 0.5rem)`
     * above 960px). Wrapping the page shell in it put the header in column 1,
     * <main> in column 2 and the footer in row 2, which is what squeezed every
     * section into a 472px gutter. The page shell is just header/main/footer as
     * flex children of the column flex container (see #root in index.css).
     */
    <>
      {/* ---------------------------------------------------------------- */}
      {/* HEADER                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Cre8Header>
          {/*
            * flexWrap + minWidth:0 keep this row from forcing horizontal page
            * scroll on narrow viewports — a rigid `space-between` row of logo +
            * nav + email was overflowing the document below ~600px.
            */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px 16px',
              minWidth: 0,
              padding: '0 0',
            }}
          >
            {/* Logo / name */}
            <a
              href="#"
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: '18px',
                  letterSpacing: '-0.02em',
                }}
              >
                Tyler Morrow
              </span>
            </a>

            {/*
              * Nav links. The label comes from the `text` prop, not from
              * children — Cre8GlobalNavItem defaults it to the literal
              * "Nav item", which is what every link was rendering as.
              */}
            <Cre8GlobalNav>
              {NAV_LINKS.map(({ label, href }) => (
                <Cre8GlobalNavItem
                  key={href}
                  href={href}
                  text={label}
                  onClick={(e) => handleNavClick(e, href)}
                />
              ))}
            </Cre8GlobalNav>

            {/* Contact shortcut */}
            <Cre8TertiaryNav>
              <Cre8TertiaryNavItem href="mailto:tsmorro@gmail.com">
                tsmorro@gmail.com
              </Cre8TertiaryNavItem>
            </Cre8TertiaryNav>
          </div>
      </Cre8Header>

      <Cre8Main>
        {/* -------------------------------------------------------------- */}
        {/* HERO                                                            */}
        {/* -------------------------------------------------------------- */}
        {/*
          * Cre8Hero is an *image* hero: above 768px it is `height: 40vh` with a
          * cover <img> and a `position: absolute` body anchored to the bottom
          * left of that image. With no `imgSrc` the image is empty, the hero
          * collapses to it, and the absolutely-positioned body overflows above
          * the fold — which is what was clipping the badges and the h1.
          * This intro is text-only, so Cre8Band (full-bleed content band) is
          * the right primitive; it needs an explicit Cre8LayoutContainer since,
          * unlike Hero/Header/Footer, it does not provide one.
          */}
        <Cre8Band>
          <Cre8LayoutContainer>
            <div id="hero" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <Cre8Badge text="Claude Agent SDK" />
                <Cre8Badge text="MCP" />
                <Cre8Badge text="CRE8 Design System" />
              </div>

              <Cre8Heading tagVariant="h1">Tyler Morrow</Cre8Heading>

              <div style={{ marginTop: '8px' }}>
                <Cre8Heading tagVariant="h2">
                  Lead Software Engineer · Generative AI &amp; Agentic Systems
                </Cre8Heading>
              </div>

              <Cre8TextPassage>
                <p style={{ maxWidth: '620px', marginTop: '20px', fontSize: '18px', lineHeight: '1.6' }}>
                  I build the infrastructure that turns natural language into deployable software.
                  At Omnicom, I architected AI2UI — an agentic system that goes from prompt to
                  production app — and authored the CRE8 design system that powers its UI generation.
                </p>
              </Cre8TextPassage>

              <div style={{ display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
                <Cre8Button
                  text="View Case Study"
                  variant="primary"
                  onClick={(e) => { e.preventDefault(); document.querySelector('#case-study')?.scrollIntoView({ behavior: 'smooth' }); }}
                />
                <Cre8Button
                  text="Get In Touch"
                  variant="secondary"
                  href="mailto:tsmorro@gmail.com"
                />
              </div>
            </div>
          </Cre8LayoutContainer>
        </Cre8Band>

        {/* -------------------------------------------------------------- */}
        {/* CASE STUDY — Omni App Builder (AI2UI)                          */}
        {/* -------------------------------------------------------------- */}
        <Cre8Section>
          <Cre8LayoutContainer>
            <div id="case-study" style={{ scrollMarginTop: '80px', paddingTop: '64px', paddingBottom: '64px' }}>

              {/* Header */}
              <Cre8Badge text="Featured Project" />
              <div style={{ marginTop: '12px' }}>
                <Cre8Heading tagVariant="h2">Omni App Builder (AI2UI)</Cre8Heading>
              </div>
              <Cre8TextPassage>
                <p style={{ maxWidth: '680px', marginTop: '8px' }}>
                  <strong>Omnicom Group · Aug 2025 – Jun 2026</strong>
                </p>
                <p style={{ maxWidth: '680px' }}>
                  An agentic system that turns a plain-language request into a live, deployable
                  Omni UI application — generated, previewed, data-connected, and published
                  without hand-writing code. Built with Claude Agent SDK, MCP, and the CRE8
                  design system Tyler authored.
                </p>
              </Cre8TextPassage>

              {/* Stats grid */}
              <div style={{ marginTop: '40px' }}>
                <Cre8Heading tagVariant="h3">By the Numbers</Cre8Heading>
                <div style={{ marginTop: '20px' }}>
                  <Cre8Grid>
                    {STATS.map(({ value, label, sub }) => (
                      <Cre8GridItem key={value + label}>
                        <Cre8Card>
                          <div
                            style={{
                              fontSize: '36px',
                              fontWeight: 800,
                              color: 'var(--cre8-color-content-brand, #3B82F6)',
                              lineHeight: 1,
                              marginBottom: '8px',
                            }}
                          >
                            {value}
                          </div>
                          <Cre8Heading tagVariant="h4">{label}</Cre8Heading>
                          <Cre8TextPassage>
                            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--cre8-color-content-subtle, #64748B)' }}>{sub}</p>
                          </Cre8TextPassage>
                        </Cre8Card>
                      </Cre8GridItem>
                    ))}
                  </Cre8Grid>
                </div>
              </div>

              <Cre8Divider />

              {/* Architecture accordion */}
              <div style={{ marginTop: '40px' }}>
                <Cre8Heading tagVariant="h3">Architecture Highlights</Cre8Heading>
                <div style={{ marginTop: '20px' }}>
                  <Cre8Accordion>
                    {ARCHITECTURE_ITEMS.map((item, i) => (
                      <Cre8AccordionItem
                        key={item.label}
                        heading={item.label}
                        isActive={i === 0}
                      >
                        <Cre8TextPassage>
                          <p>{item.content}</p>
                        </Cre8TextPassage>
                      </Cre8AccordionItem>
                    ))}
                  </Cre8Accordion>
                </div>
              </div>

              <Cre8Divider />

              {/* Security model */}
              <div style={{ marginTop: '40px' }}>
                <Cre8Heading tagVariant="h3">Security Model — 5-Layer Defense</Cre8Heading>
                <Cre8TextPassage>
                  <p>Every generated app passes through five security layers before reaching users.</p>
                </Cre8TextPassage>
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    marginTop: '20px',
                    overflowX: 'auto',
                    paddingBottom: '8px',
                  }}
                >
                  {SECURITY_LAYERS.map((layer, i) => (
                    <div
                      key={layer.layer}
                      style={{
                        flex: '1 0 160px',
                        padding: '20px 16px',
                        borderRadius: '8px',
                        background: `hsl(${210 + i * 10}, 80%, ${96 - i * 3}%)`,
                        border: `1px solid hsl(${210 + i * 10}, 60%, ${88 - i * 3}%)`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: 'var(--cre8-color-content-brand, #3B82F6)',
                        }}
                      >
                        Layer {layer.layer}
                      </span>
                      <strong style={{ fontSize: '14px' }}>{layer.title}</strong>
                      <span style={{ fontSize: '12px', color: 'var(--cre8-color-content-subtle, #64748B)', lineHeight: '1.4' }}>
                        {layer.desc}
                      </span>
                      {i < SECURITY_LAYERS.length - 1 && (
                        <span
                          style={{
                            position: 'absolute',
                            right: '-14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--cre8-color-content-brand, #3B82F6)',
                            zIndex: 1,
                            display: 'flex',
                          }}
                          aria-hidden="true"
                        >
                          <Cre8Icon svg={svgArrowRight} />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Cre8Divider />

              {/* Timeline */}
              <div style={{ marginTop: '40px' }}>
                <Cre8Heading tagVariant="h3">Build Timeline</Cre8Heading>
                <div
                  style={{
                    position: 'relative',
                    marginTop: '28px',
                    paddingLeft: '32px',
                  }}
                >
                  {/* Vertical line */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '8px',
                      top: 0,
                      bottom: 0,
                      width: '2px',
                      background: 'var(--cre8-color-border-default, #E2E8F0)',
                    }}
                  />

                  {TIMELINE_MILESTONES.map(({ date, event }, i) => (
                    <div
                      key={date}
                      style={{
                        position: 'relative',
                        marginBottom: '24px',
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'flex-start',
                      }}
                    >
                      {/* Dot */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '-28px',
                          top: '4px',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: i === TIMELINE_MILESTONES.length - 1
                            ? 'var(--cre8-color-bg-brand-strong, #3B82F6)'
                            : 'var(--cre8-color-border-strong, #64748B)',
                          border: '2px solid var(--cre8-color-bg-default, #ffffff)',
                          outline: `2px solid ${i === TIMELINE_MILESTONES.length - 1 ? 'var(--cre8-color-border-brand-strong, #2563EB)' : 'var(--cre8-color-border-default, #E2E8F0)'}`,
                        }}
                      />
                      <div>
                        <span
                          style={{
                            display: 'inline-block',
                            fontSize: '11px',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            color: 'var(--cre8-color-content-brand, #3B82F6)',
                            marginBottom: '2px',
                          }}
                        >
                          {date}
                        </span>
                        <Cre8TextPassage>
                          <p style={{ margin: 0 }}>{event}</p>
                        </Cre8TextPassage>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </Cre8LayoutContainer>
        </Cre8Section>

        {/* -------------------------------------------------------------- */}
        {/* AI2UI INTERACTIVE DEMO                                          */}
        {/* -------------------------------------------------------------- */}
        <DemoSection />

        {/* -------------------------------------------------------------- */}
        {/* CRE8 DESIGN SYSTEM                                              */}
        {/* -------------------------------------------------------------- */}
        <Cre8SystemSection />

        {/* -------------------------------------------------------------- */}
        {/* EXPERIENCE                                                      */}
        {/* -------------------------------------------------------------- */}
        <ExperienceSection />

        {/* -------------------------------------------------------------- */}
        {/* SKILLS                                                          */}
        {/* -------------------------------------------------------------- */}
        <SkillsSection />

        {/* -------------------------------------------------------------- */}
        {/* CONTACT                                                         */}
        {/* -------------------------------------------------------------- */}
        <Cre8Section>
          <Cre8LayoutContainer>
            <div
              id="contact"
              style={{
                scrollMarginTop: '80px',
                paddingTop: '80px',
                paddingBottom: '80px',
                textAlign: 'center',
              }}
            >
              <Cre8Heading tagVariant="h2">Let's build something.</Cre8Heading>
              <Cre8TextPassage>
                <p style={{ marginTop: '12px', fontSize: '18px' }}>
                  Open to senior/staff/lead roles in Generative AI, Agentic Systems,
                  and Design Systems engineering.
                </p>
                <p
                  style={{
                    color: 'var(--cre8-color-content-subtle, #64748B)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Cre8Icon svg={svgLocation} aria-hidden="true" />
                  Fort Lauderdale, FL · Open to Remote
                </p>
              </Cre8TextPassage>

              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginTop: '32px',
                }}
              >
                <Cre8Button
                  text="Email Tyler"
                  variant="primary"
                  href="mailto:tsmorro@gmail.com"
                  svg={svgEmail}
                  iconPosition="before"
                />
                <Cre8Button
                  text="LinkedIn"
                  variant="secondary"
                  href="https://linkedin.com/in/tylermorrow"
                  target="_blank"
                  svg={svgLinkedIn}
                  iconPosition="before"
                />
                <Cre8Button
                  text="GitHub"
                  variant="secondary"
                  href="https://github.com/tmorrow"
                  target="_blank"
                  svg={svgExternal}
                  iconPosition="after"
                />
              </div>

              <div style={{ marginTop: '24px' }}>
                <Cre8TextPassage>
                  <p style={{ color: 'var(--cre8-color-content-subtle, #64748B)', fontSize: '14px' }}>
                    tsmorro@gmail.com
                  </p>
                </Cre8TextPassage>
              </div>
            </div>
          </Cre8LayoutContainer>
        </Cre8Section>
      </Cre8Main>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Cre8Footer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              padding: '16px 0',
            }}
          >
            <Cre8TextPassage>
              <p style={{ margin: 0, fontSize: '13px' }}>
                © 2026 Tyler Morrow. Built with{' '}
                <Cre8TextLink href="https://github.com/tmorrow/cre8-react" target="_blank">
                  @tmorrow/cre8-react
                </Cre8TextLink>
                {' '}· Scaffolded with AI2UI.
              </p>
            </Cre8TextPassage>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Cre8Badge text="v1.0.0" />
              <Cre8Badge text="CRE8 Powered" status="success" />
            </div>
          </div>
      </Cre8Footer>
    </>
  );
}
