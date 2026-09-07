// One source of truth for what the marketplace ships.
//
// The previous single-page site drifted — it advertised four cre8 skills after
// a fifth had shipped, in three separate places. Everything countable lives
// here so a page can never disagree with another page about it.

export type Item = {
  name: string
  blurb: string
  accent?: boolean
}

export const NAV = [
  { href: '/design-system', label: 'Design system' },
  { href: '/data', label: 'Data plugin' },
  { href: '/mcp-server', label: 'MCP server' },
  { href: '/components', label: 'Components' },
  { href: '/consulting', label: 'Consulting' },
] as const

export const COMPONENT_COUNT = 93
export const REACT_COMPONENT_COUNT = 72

export const CRE8_SKILLS: Item[] = [
  {
    name: 'cre8-a2ui',
    blurb:
      'Web Components guidance for vanilla JS/HTML and Lit — which component a job calls for, and the token architecture underneath it.',
  },
  {
    name: 'cre8-a2ui-react',
    blurb: `The same judgment, for React — ${REACT_COMPONENT_COUNT} components with props, patterns, and conventions specific to the React wrappers.`,
  },
  {
    name: 'cre8-mcp-ui',
    blurb:
      'Serves Cre8 components as live, interactive UI from a Python FastMCP server — a tool call that returns a working surface, not a text reply.',
  },
  {
    name: 'cre8-theming',
    blurb:
      "Extracts a brand's colors, type and shape from a website, a picture, or a Design.md, and turns it into a seed-token override.",
  },
  {
    name: 'cre8-mcp-app-workflow',
    blurb:
      'Coordinates the whole branded-app build — theming, then integration, then per-host rendering checks — handing each stage’s artifacts to the next.',
  },
]

export const CRE8_AGENTS: Item[] = [
  {
    name: 'cre8-brand-themer',
    blurb:
      'Extracts and verifies the brand. Returns theme.css and a handoff recording source evidence, inferred values, and anything it could not confirm.',
  },
  {
    name: 'cre8-mcp-app-builder',
    blurb:
      'Builds the MCP server and embedded UI on the ext-apps bridge for both Claude Desktop and ChatGPT, keeping host extensions isolated and capability-gated.',
  },
  {
    name: 'cre8-mcp-render-debugger',
    blurb:
      'Reproduces the failing tool call and traces it end to end — connection, resource URI, CSP, bridge init, component upgrade, theme cascade, callback round trip.',
  },
  {
    name: 'cre8:workflow-themed-mcp-app',
    blurb:
      'Runs all three as a deterministic workflow in Claude Code: one verification lane per host, and an independent auditor that downgrades any pass it cannot show was observed.',
    accent: true,
  },
]

export const DATA_SKILLS: Item[] = [
  {
    name: 'sql-queries',
    blurb:
      'Writing and optimizing SQL, including where dialects actually diverge rather than where they are merely spelled differently.',
  },
  {
    name: 'data-exploration',
    blurb:
      'Profiling, quality assessment, and pattern discovery — what the data is, before anything is concluded from it.',
  },
  {
    name: 'statistical-analysis',
    blurb:
      'Descriptive statistics, trend analysis, outlier detection, and hypothesis testing that names its assumptions.',
  },
  {
    name: 'data-visualization',
    blurb:
      'Choosing the chart the data calls for, and the code to render it — form following the question being asked.',
  },
  {
    name: 'interactive-dashboard-builder',
    blurb:
      'Dashboards with real filters and interaction, built to be handed to someone else rather than screenshotted.',
  },
  {
    name: 'data-validation',
    blurb:
      'Pre-delivery QA and sanity checks — the pass that catches the join that silently doubled your row count.',
  },
  {
    name: 'api-data-contracts',
    blurb:
      'Typed contracts generated from an OpenAPI spec so a UI agent can build against the shape of your data without ever seeing the data.',
  },
  {
    name: 'data-context-extractor',
    blurb:
      'Packages your domain’s quirks — the table that lies, the column that means something else — into a reusable skill.',
  },
  {
    name: 'auth-gated-data-sources',
    blurb:
      'Getting an agent through the front door of a credentialed source with Clerk machine auth — M2M tokens, API keys, or OAuth, chosen by whose data is being read.',
    accent: true,
  },
]

export const DATA_CONNECTORS: Item[] = [
  {
    name: 'Snowflake',
    blurb:
      'Query the warehouse directly with your own role and warehouse — schemas, metadata, and live results without copy-paste.',
  },
  {
    name: 'Amplitude',
    blurb:
      'Product analytics alongside warehouse data, so behavioural questions and revenue questions get answered in one place.',
  },
  {
    name: 'Atlassian',
    blurb: 'Jira context for the analysis — what shipped, when, and what it was supposed to change.',
  },
  {
    name: 'Clerk',
    blurb: "Clerk's own MCP server, for writing machine-auth code correctly against current SDK patterns.",
  },
]

export const MCP_TOOLS: { group: string; tools: Item[] }[] = [
  {
    group: 'Component lookup',
    tools: [
      { name: 'list_components', blurb: 'Enumerate every component with its category and summary.' },
      { name: 'get_component', blurb: 'Pull the full spec for one component — props, slots, events, usage rules.' },
      { name: 'search_components', blurb: 'Find the right building blocks by name, description, or category.' },
      { name: 'get_patterns', blurb: 'Approved composition patterns — login forms, data tables, page layouts.' },
      {
        name: 'get_composition',
        blurb: "How a component actually nests, from the library's own stories — not a guessed naming rule.",
      },
      { name: 'generate_code', blurb: 'Turn a component tree into ready-to-render web component or React markup.' },
    ],
  },
  {
    group: 'A2UI — agent-authored UI trees',
    tools: [
      {
        name: 'get_a2ui_catalog',
        blurb: 'The full JSON-Schema catalog: every component, typed props, enum constraints, slots, events.',
      },
      { name: 'validate_a2ui_spec', blurb: 'Validates a component tree against the catalog before it ships — not after.' },
      { name: 'get_content_model', blurb: 'Whether a component takes content through children or slots — never both.' },
      { name: 'cre8_guide', blurb: 'The briefing on emitting UI that validates first try, and the traps that cost attempts.' },
    ],
  },
  {
    group: 'Live UI surfaces — streamed, not generated-and-done',
    tools: [
      { name: 'ui_open_surface', blurb: 'Opens a live surface and returns a URL a human can watch update in place.' },
      { name: 'ui_stream', blurb: 'Streams a change into an open surface — the only mutation tool.' },
      { name: 'ui_get_surface', blurb: "Returns a surface's current tree and data model, with bindings resolved." },
      { name: 'ui_events', blurb: 'Reads what the user did — events fired by components you bound handlers to.' },
      { name: 'ui_close_surface', blurb: 'Closes a surface. Also swept automatically after an hour of inactivity.' },
    ],
  },
]

export const MCP_TOOL_COUNT = MCP_TOOLS.reduce((n, g) => n + g.tools.length, 0)
