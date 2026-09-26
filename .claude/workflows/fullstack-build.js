export const meta = {
  name: 'fullstack-build',
  description: 'Research an app idea, architect it, plan it into frontend/backend units, build them in parallel, and red-team each unit in lockstep with a two-way message bus',
  whenToUse: 'Building a feature that spans CRE8 UI and backend code, where every unit of work should be adversarially checked before it is accepted. Pass args: { spec: "<app idea, feature description, or path to a plan doc>" }. Add stopAfter: "architecture" to review the brief and architecture before building, then rerun with architecture: "<path to the architecture doc>" to build from it.',
  phases: [
    { title: 'Research', detail: 'parallel researchers: users & flows, prior art, repo reuse, stack, risks' },
    { title: 'Architecture', detail: 'product brief vs red team, competing architectures vs red team, judges, synthesis doc' },
    { title: 'Plan', detail: 'decompose the spec into units with owned paths, deps and acceptance checks' },
    { title: 'Contract', detail: 'build + red-team the shared API/type contract every unit codes against' },
    { title: 'Build', detail: 'units run in parallel as deps allow; each round is build -> red team -> revise' },
    { title: 'Integrate', detail: 'repo-level checks, cross-cutting red-team panel, adversarial verify, repair' },
  ],
}

// ---------------------------------------------------------------------------
// How the teams talk
//
// Workflow agents cannot message each other directly, so the script is the
// message bus. Every message is a record { id, from, to, kind, body } posted
// by the orchestrator from an agent's structured output and delivered in the
// prompt of the recipient's next turn:
//
//   builder  -> red team : responses to findings (fixed / rebutted), questions
//   red team -> builder  : findings, rulings on rebuttals, answers
//   any unit -> any unit : heads-ups (e.g. "backend renamed field x", "the
//                          frontend expects a 409 on duplicate")
//   builder  -> contract : change requests to the shared contract
//
// A unit's red team runs right after each of that unit's build rounds (not in
// a batch at the end), so a unit is never accepted until its own red team
// passes it or it runs out of rounds and is escalated. Mail that arrives for a
// unit that has already finished is delivered in a follow-up pass during
// Integrate, so no message is dropped.
// ---------------------------------------------------------------------------

const A = args || {}
if (!A.spec && !A.architecture) throw new Error('fullstack-build needs args.spec (an app idea, feature description, or path to a plan doc) or args.architecture (path to an architecture doc)')
// Research + architecture options:
//   stopAfter: 'architecture'  return after writing the brief and architecture docs
//   architecture: '<path>'     skip Research/Architecture and plan from this doc
//   architects: 3              number of competing architecture proposals (1-3)
//   backendLanguage: 'python'  default backend language (the repo's backends are Python)
//   extraResearch: [{ key, prompt }]  additional research lenses run alongside the defaults
const BACKEND_LANG = A.backendLanguage || 'python'
const MAX_ROUNDS = A.maxRounds || 3
const BLOCKING = A.blockingSeverities || ['critical', 'high']
// Optional custom subagent types, e.g. from the secure-agent-team plugin:
// { frontend: '...', backend: 'secure-agent-team:backend-engineer', red: 'secure-agent-team:security-engineer' }
const AGENT_TYPES = A.agentTypes || {}

const LAYER_GUIDE = {
  frontend: 'Build UI with the CRE8 design system (@tmorrow/cre8-wc web components or @tmorrow/cre8-react). Load the cre8-design skill for component choice and composition. Use design tokens rather than hard-coded colors or spacing. Every interactive element must be keyboard reachable and labeled.',
  backend: `Use ${BACKEND_LANG} unless the architecture doc says otherwise. Write tests first. Use closed input schemas (enums, regex-validated ids, no additional properties). Fail closed on auth and validation. Keep secrets out of source and read them from env. Map internal errors to generic client messages, never stack traces. Put timeouts on outbound calls and caps on list results.`,
  data: 'Keep migrations forward-only and reversible where possible. Enforce constraints in the schema, not only in app code. Scope every query to the tenant/user it belongs to.',
  infra: 'Keep config typed and minimal. Add no dependencies you do not use. Wire scripts into the existing pnpm workspace commands.',
  contract: 'Write the single source of truth for the API: request/response types, error shapes and status codes, auth requirements, pagination. Both frontend and backend units import from it, so make it importable, not just prose.',
}

const RED_LENSES = 'Attack from these angles: (1) correctness against the acceptance criteria, (2) security: injection, authz/tenant bypass, secret leakage, unsafe defaults, (3) contract drift: does this unit match the shared contract exactly, (4) failure paths: empty/missing/huge inputs, network errors, concurrency, (5) for UI: accessibility and CRE8 token/component misuse.'

// ----------------------------------------------------------------- schemas --

const PLAN_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    contract: {
      type: 'object',
      properties: {
        ownedPaths: { type: 'array', items: { type: 'string' } },
        goal: { type: 'string' },
        acceptance: { type: 'array', items: { type: 'string' } },
        verifyCommand: { type: 'string' },
      },
      required: ['ownedPaths', 'goal', 'acceptance', 'verifyCommand'],
    },
    units: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'short kebab-case id' },
          layer: { type: 'string', enum: ['frontend', 'backend', 'data', 'infra'] },
          title: { type: 'string' },
          goal: { type: 'string' },
          ownedPaths: { type: 'array', items: { type: 'string' }, description: 'files/dirs only this unit may write' },
          dependsOn: { type: 'array', items: { type: 'string' } },
          acceptance: { type: 'array', items: { type: 'string' } },
          verifyCommand: { type: 'string', description: 'command that proves this unit works, e.g. a filtered test run' },
        },
        required: ['id', 'layer', 'title', 'goal', 'ownedPaths', 'dependsOn', 'acceptance', 'verifyCommand'],
      },
    },
  },
  required: ['summary', 'contract', 'units'],
}

const BUILD_SCHEMA = {
  type: 'object',
  properties: {
    summary: { type: 'string' },
    filesChanged: { type: 'array', items: { type: 'string' } },
    verifyPassed: { type: 'boolean' },
    verifyOutputTail: { type: 'string', description: 'last ~30 lines of the verify command output' },
    responses: {
      type: 'array',
      description: 'one entry per open finding addressed to you',
      items: {
        type: 'object',
        properties: {
          findingId: { type: 'string' },
          action: { type: 'string', enum: ['fixed', 'rebutted'] },
          note: { type: 'string', description: 'what changed, or the evidence the finding is wrong' },
        },
        required: ['findingId', 'action', 'note'],
      },
    },
    questions: { type: 'array', items: { type: 'string' }, description: 'questions for your red team' },
    headsUps: {
      type: 'array',
      description: 'messages for other units (use "contract" to request a contract change)',
      items: {
        type: 'object',
        properties: { to: { type: 'string' }, text: { type: 'string' } },
        required: ['to', 'text'],
      },
    },
  },
  required: ['summary', 'filesChanged', 'verifyPassed', 'verifyOutputTail', 'responses', 'questions', 'headsUps'],
}

const FINDING = {
  type: 'object',
  properties: {
    id: { type: 'string', description: 'reuse the id for carried-over findings; new ones get a fresh id' },
    severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
    file: { type: 'string' },
    line: { type: 'integer' },
    issue: { type: 'string' },
    evidence: { type: 'string', description: 'failing command output, repro input, or the exact code path' },
    fix: { type: 'string' },
  },
  required: ['id', 'severity', 'file', 'issue', 'evidence', 'fix'],
}

const RED_SCHEMA = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['pass', 'fail'] },
    verifyReproduced: { type: 'boolean', description: 'did YOUR run of the verify command pass' },
    openFindings: { type: 'array', items: FINDING, description: 'the COMPLETE set still unresolved; anything omitted is closed' },
    rulings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          findingId: { type: 'string' },
          ruling: { type: 'string', enum: ['upheld', 'withdrawn'] },
          reason: { type: 'string' },
        },
        required: ['findingId', 'ruling', 'reason'],
      },
    },
    answers: { type: 'array', items: { type: 'string' } },
    crossUnit: {
      type: 'array',
      description: 'problems you spotted that belong to another unit',
      items: {
        type: 'object',
        properties: { to: { type: 'string' }, text: { type: 'string' } },
        required: ['to', 'text'],
      },
    },
  },
  required: ['verdict', 'verifyReproduced', 'openFindings', 'rulings', 'answers', 'crossUnit'],
}

const INTEGRATION_SCHEMA = {
  type: 'object',
  properties: {
    passed: { type: 'boolean' },
    failures: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          unit: { type: 'string', description: 'owning unit id, from the ownership map' },
          command: { type: 'string' },
          output: { type: 'string' },
        },
        required: ['unit', 'command', 'output'],
      },
    },
  },
  required: ['passed', 'failures'],
}

const PANEL_SCHEMA = {
  type: 'object',
  properties: { findings: { type: 'array', items: { ...FINDING, properties: { ...FINDING.properties, unit: { type: 'string' } }, required: [...FINDING.required, 'unit'] } } },
  required: ['findings'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  properties: { refuted: { type: 'boolean' }, reason: { type: 'string' } },
  required: ['refuted', 'reason'],
}

// ------------------------------------------------------------- message bus --

const bus = []
const delivered = new Set()
function post(from, to, kind, body, alreadyDelivered) {
  const id = `m${bus.length + 1}`
  if (!alreadyDelivered && !byId[to]) log(`message from ${from} to unknown unit "${to}" kept in the transcript only`)
  bus.push({ id, from, to, kind, body })
  if (alreadyDelivered) delivered.add(id)
}
function takeMail(unitId) {
  const mail = bus.filter(m => m.to === unitId && !delivered.has(m.id))
  mail.forEach(m => delivered.add(m.id))
  return mail
}
// Mail that should reopen a finished unit: heads-ups from other units. Answers
// and rulings from a unit's own red team only matter if another round runs.
function pendingHeadsUps(unitId) {
  return bus.filter(m => m.to === unitId && m.kind === 'heads-up' && !delivered.has(m.id))
}
function fmtMail(mail) {
  if (!mail.length) return '(none)'
  return mail.map(m => `- [${m.kind} from ${m.from}] ${m.body}`).join('\n')
}
function fmtFindings(fs) {
  if (!fs.length) return '(none)'
  return fs.map(f => `- ${f.id} [${f.severity}] ${f.file}${f.line ? ':' + f.line : ''}: ${f.issue}\n  evidence: ${f.evidence}\n  suggested fix: ${f.fix}`).join('\n')
}

// ------------------------------------------------------------------- units --

const state = {} // unitId -> { status, openFindings, lastBuild, rounds }
let plan, byId

function unitBrief(u) {
  return `Unit "${u.id}" (${u.layer}): ${u.title}
Goal: ${u.goal}
You own (may write) ONLY: ${u.ownedPaths.join(', ')}
Acceptance criteria:
${u.acceptance.map(a => '- ' + a).join('\n')}
Verify command: ${u.verifyCommand}`
}

function depBrief(u) {
  if (!u.dependsOn.length) return ''
  return '\nUnits you depend on (already finished):\n' + u.dependsOn.map(d => {
    const s = state[d]
    return `- ${d}: ${s ? s.status : 'unknown'}. ${s && s.lastBuild ? s.lastBuild.summary : ''}`
  }).join('\n')
}

async function buildRound(u, round, seedMail) {
  const s = state[u.id]
  const mail = seedMail.concat(takeMail(u.id))
  const prompt = `You are a BUILD agent on a multi-agent team. Other builders are writing other parts of the repo at the same time, so write only inside your owned paths. Do not commit, and do not revert changes to files you do not own.

Feature: ${plan.summary}
${designContext}
Shared contract lives at: ${plan.contract.ownedPaths.join(', ')}. Code against it exactly. If it is wrong or missing something, send a heads-up to "contract" rather than editing it or working around it.

${unitBrief(u)}
${depBrief(u)}

Layer guidance: ${LAYER_GUIDE[u.layer]}

This is round ${round} of at most ${MAX_ROUNDS}.
${s.lastBuild ? `Your previous round's summary: ${s.lastBuild.summary}` : 'This is your first round. Read the relevant existing code before you write anything.'}

Open red-team findings against you (respond to EVERY one: fix it, or rebut it with concrete evidence; the red team rules on rebuttals):
${fmtFindings(s.openFindings)}

Messages for you:
${fmtMail(mail)}

Before you finish, run the verify command yourself and report the real result. Ask your red team about anything ambiguous, and send a heads-up to any unit whose work your changes affect.`
  return agent(prompt, {
    label: `build:${u.id}#${round}`,
    phase: u.id === 'contract' ? 'Contract' : 'Build',
    schema: BUILD_SCHEMA,
    agentType: AGENT_TYPES[u.layer],
  })
}

async function redRound(u, round, build) {
  const s = state[u.id]
  const prompt = `You are the RED TEAM agent paired with the builder of one unit. Your job is to break their work before it ships. Do NOT edit any files: you report, the builder fixes. You may read anything and run read-only commands, tests and scripts.

Feature: ${plan.summary}
Shared contract: ${plan.contract.ownedPaths.join(', ')}

${unitBrief(u)}

Builder's round ${round} report:
- summary: ${build.summary}
- files changed: ${build.filesChanged.join(', ') || '(none)'}
- claims verify passed: ${build.verifyPassed}
- verify output tail:
${build.verifyOutputTail}

Findings that were open before this round:
${fmtFindings(s.openFindings)}

Builder's responses to them:
${build.responses.length ? build.responses.map(r => `- ${r.findingId}: ${r.action}. ${r.note}`).join('\n') : '(none)'}

Builder's questions for you:
${build.questions.length ? build.questions.map((q, i) => `${i + 1}. ${q}`).join('\n') : '(none)'}

Instructions:
1. Re-run the verify command yourself. Do not trust the builder's claim.
2. For every "fixed" response, check the fix in the code. For every "rebutted" one, rule upheld or withdrawn with a reason.
3. ${RED_LENSES}
4. Every finding needs evidence: failing output, a repro input, or the exact code path. Drop anything you cannot back up. Do not pad the list with style nits.
5. Return the COMPLETE current set of unresolved findings. Reuse ids for carried-over ones. Anything you omit counts as closed.
6. Answer the builder's questions. Put problems that belong to another unit in crossUnit (unit ids: ${Object.keys(byId).join(', ')}).
7. verdict is "pass" only if the verify command passes for you and no ${BLOCKING.join('/')} finding remains.`
  return agent(prompt, {
    label: `red:${u.id}#${round}`,
    phase: u.id === 'contract' ? 'Contract' : 'Build',
    schema: RED_SCHEMA,
    effort: 'high',
    agentType: AGENT_TYPES.red,
  })
}

// One unit's build <-> red-team loop. seedFindings/seedMail start a repair pass.
async function runUnit(u, opts) {
  const o = opts || {}
  const rounds = o.rounds || MAX_ROUNDS
  const s = state[u.id] || (state[u.id] = { status: 'pending', openFindings: [], lastBuild: null, rounds: 0 })
  if (o.seedFindings) s.openFindings = s.openFindings.concat(o.seedFindings)
  s.status = 'building'
  let seedMail = o.seedMail || []
  for (let r = 1; r <= rounds; r++) {
    s.rounds++
    const build = await buildRound(u, s.rounds, seedMail)
    seedMail = []
    if (!build) { s.status = 'error'; return s }
    s.lastBuild = build
    build.headsUps.forEach(h => post(u.id, h.to, 'heads-up', h.text))
    // Questions reach the red team directly in its prompt; they are logged for the transcript.
    build.questions.forEach(q => post(u.id, `red:${u.id}`, 'question', q, true))

    const red = await redRound(u, s.rounds, build)
    if (!red) { s.status = 'error'; return s }
    red.rulings.forEach(x => post(`red:${u.id}`, u.id, 'ruling', `${x.findingId} ${x.ruling}: ${x.reason}`))
    red.answers.forEach(a => post(`red:${u.id}`, u.id, 'answer', a))
    red.crossUnit.forEach(c => post(`red:${u.id}`, c.to, 'heads-up', c.text))
    s.openFindings = red.openFindings

    const blocking = red.openFindings.filter(f => BLOCKING.includes(f.severity))
    log(`${u.id} round ${s.rounds}: red team ${red.verdict}, ${red.openFindings.length} open (${blocking.length} blocking)`)
    if (red.verdict === 'pass' && red.verifyReproduced && !blocking.length) {
      s.status = 'accepted'
      return s
    }
  }
  s.status = 'escalated'
  log(`${u.id} escalated after ${s.rounds} rounds with ${s.openFindings.length} open findings`)
  return s
}


// ------------------------------------------------ research + architecture --
//
// Research fans out across independent lenses. Architecture turns the findings
// into a product brief (challenged by a red team), then has competing
// architects each defend a proposal against their own red team before judges
// pick and a synthesizer writes the final doc. Same message pattern as the
// build loop: critique goes in, a revision that answers every point comes out.

const RESEARCH_SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          claim: { type: 'string' },
          source: { type: 'string', description: 'file path, URL, or "reasoning"' },
          confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
        },
        required: ['claim', 'source', 'confidence'],
      },
    },
    implications: { type: 'array', items: { type: 'string' }, description: 'what this means for the build' },
    openQuestions: { type: 'array', items: { type: 'string' } },
  },
  required: ['findings', 'implications', 'openQuestions'],
}

const BRIEF_SCHEMA = {
  type: 'object',
  properties: {
    slug: { type: 'string', description: 'short kebab-case app name for file names' },
    name: { type: 'string' },
    problem: { type: 'string' },
    users: { type: 'array', items: { type: 'string' } },
    coreFlows: { type: 'array', items: { type: 'string' }, description: 'step-by-step user journeys the MVP must support' },
    mvpScope: { type: 'array', items: { type: 'string' } },
    nonGoals: { type: 'array', items: { type: 'string' } },
    successMetrics: { type: 'array', items: { type: 'string' } },
    assumptions: { type: 'array', items: { type: 'string' } },
    openQuestions: { type: 'array', items: { type: 'string' } },
    critiqueResponses: { type: 'array', items: { type: 'string' }, description: 'how each red-team point was handled (revisions only)' },
  },
  required: ['slug', 'name', 'problem', 'users', 'coreFlows', 'mvpScope', 'nonGoals', 'successMetrics', 'assumptions', 'openQuestions', 'critiqueResponses'],
}

const CRITIQUE_SCHEMA = {
  type: 'object',
  properties: {
    points: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
          issue: { type: 'string' },
          why: { type: 'string' },
          suggestion: { type: 'string' },
        },
        required: ['severity', 'issue', 'why', 'suggestion'],
      },
    },
  },
  required: ['points'],
}

const ARCH_SCHEMA = {
  type: 'object',
  properties: {
    approach: { type: 'string' },
    backendLanguage: { type: 'string' },
    components: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          layer: { type: 'string', enum: ['frontend', 'backend', 'data', 'infra'] },
          responsibility: { type: 'string' },
          location: { type: 'string', description: 'existing package to extend or new path' },
        },
        required: ['name', 'layer', 'responsibility', 'location'],
      },
    },
    apiSurface: { type: 'array', items: { type: 'string' }, description: 'METHOD /path: purpose, auth' },
    dataModel: { type: 'array', items: { type: 'string' } },
    authAndSecurity: { type: 'string' },
    decisions: {
      type: 'array',
      items: {
        type: 'object',
        properties: { decision: { type: 'string' }, rationale: { type: 'string' }, rejected: { type: 'string' } },
        required: ['decision', 'rationale', 'rejected'],
      },
    },
    risks: { type: 'array', items: { type: 'string' } },
    critiqueResponses: { type: 'array', items: { type: 'string' } },
  },
  required: ['approach', 'backendLanguage', 'components', 'apiSurface', 'dataModel', 'authAndSecurity', 'decisions', 'risks', 'critiqueResponses'],
}

const SCORE_SCHEMA = {
  type: 'object',
  properties: {
    scores: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          proposal: { type: 'integer', description: '1-based proposal number' },
          score: { type: 'integer', description: '1-10' },
          strengths: { type: 'string' },
          weaknesses: { type: 'string' },
        },
        required: ['proposal', 'score', 'strengths', 'weaknesses'],
      },
    },
  },
  required: ['scores'],
}

const FINAL_ARCH_SCHEMA = {
  type: 'object',
  properties: {
    briefPath: { type: 'string' },
    architecturePath: { type: 'string' },
    summary: { type: 'string', description: 'one-paragraph architecture summary for the planner' },
  },
  required: ['briefPath', 'architecturePath', 'summary'],
}

const fmtCritique = c => c && c.points.length
  ? c.points.map((p, i) => `${i + 1}. [${p.severity}] ${p.issue}. Why: ${p.why}. Suggestion: ${p.suggestion}`).join('\n')
  : '(no points raised)'

let designContext = ''
let brief = null, architecture = null

if (A.architecture) {
  designContext = `Architecture doc (decided, read it in full): ${A.architecture}`
  log(`using existing architecture ${A.architecture}; skipping Research and Architecture`)
} else {
  phase('Research')
  const RESEARCH_LENSES = [
    { key: 'users', prompt: 'Users and flows: who uses this, what jobs they need done, the core journeys step by step, what the MVP must include versus what can wait, and how success would be measured.' },
    { key: 'prior-art', prompt: 'Prior art: comparable products and open-source projects (use web search if available). What patterns they share, what users complain about, and what to copy or avoid.' },
    { key: 'repo', prompt: 'Reuse in this repo: which existing packages (pnpm-workspace.yaml, packages/), CRE8 components (@tmorrow/cre8-wc / cre8-react), agents and docs/plans this app can build on. Name concrete files and components, and flag gaps.' },
    { key: 'stack', prompt: `Technical stack: backend language (the repo's existing backends are Python; default to ${BACKEND_LANG} unless there is a concrete reason not to), framework, data storage, auth, hosting (the repo deploys on Vercel), and how the TypeScript frontend shares types with the backend.` },
    { key: 'risk', prompt: 'Risks: a threat model (assets, actors, abuse cases), privacy and data-handling concerns, hard technical unknowns, and what would make this project fail.' },
  ].concat(A.extraResearch || [])
  const research = await parallel(RESEARCH_LENSES.map(l => () => agent(`You are a researcher on an app-planning team. Research ONE lens and report facts with sources, not opinions dressed up as facts. Do not edit files.

App idea / spec (text, or a path to read): ${A.spec}

Lens: ${l.prompt}

Use WebSearch and WebFetch (load them with ToolSearch) for anything outside this repo, and cite the URLs.`, { label: `research:${l.key}`, phase: 'Research', schema: RESEARCH_SCHEMA })))
  const researchText = RESEARCH_LENSES.map((l, i) => {
    const r = research[i]
    if (!r) return `## ${l.key}\n(researcher failed)`
    return `## ${l.key}\n` + r.findings.map(f => `- ${f.claim} (${f.source}, ${f.confidence})`).join('\n') +
      `\nImplications:\n` + r.implications.map(x => '- ' + x).join('\n') +
      `\nOpen questions:\n` + r.openQuestions.map(x => '- ' + x).join('\n')
  }).join('\n\n')
  const failed = RESEARCH_LENSES.filter((l, i) => !research[i]).map(l => l.key)
  if (failed.length) log(`research lenses with no result: ${failed.join(', ')}`)

  phase('Architecture')
  // Idea -> brief, challenged by a product red team, then revised.
  const briefPrompt = `You are the product lead. Turn this app idea and the research into a tight product brief. Keep the MVP small enough to build in one pass. Anything not needed for the core flows goes in nonGoals. Do not edit files.

App idea / spec: ${A.spec}

Research:
${researchText}`
  const draft = await agent(briefPrompt, { label: 'brief:draft', phase: 'Architecture', schema: BRIEF_SCHEMA })
  if (!draft) throw new Error('brief agent returned nothing')
  const briefCritique = await agent(`You are the product RED TEAM. Attack this brief: unsupported assumptions, flows that do not solve the stated problem, an MVP that is too big or missing something essential, unmeasurable metrics, and user groups nobody asked for. Every point needs a reason. Do not edit files.

Brief:
${JSON.stringify(draft, null, 2)}

Research it was based on:
${researchText}`, { label: 'brief:red', phase: 'Architecture', schema: CRITIQUE_SCHEMA, effort: 'high', agentType: AGENT_TYPES.red })
  brief = await agent(`${briefPrompt}

Your draft:
${JSON.stringify(draft, null, 2)}

The red team's critique. Address EVERY point in critiqueResponses: say what you changed, or why you kept it:
${fmtCritique(briefCritique)}`, { label: 'brief:revise', phase: 'Architecture', schema: BRIEF_SCHEMA }) || draft

  // Competing architectures, each defended against its own red team.
  const ANGLES = [
    'simplest-MVP: the fewest moving parts that satisfy every core flow; boring, proven choices',
    'reuse-first: build as much as possible on existing packages, CRE8 components and agents in this repo',
    'secure-and-scalable: design the auth, tenancy, data boundaries and failure handling you would want in production',
  ].slice(0, Math.max(1, Math.min(3, A.architects || 3)))
  const archBase = angle => `You are a software architect. Propose an architecture for this app from one angle: ${angle}.
Read the repo (pnpm-workspace.yaml, packages/, docs/plans) so your proposal fits it. Frontend uses CRE8 (@tmorrow/cre8-wc or cre8-react). Default backend language: ${BACKEND_LANG}; justify it in decisions if you pick another. Do not edit files.

Brief:
${JSON.stringify(brief, null, 2)}

Research:
${researchText}`
  const proposals = await pipeline(ANGLES,
    (angle, _, i) => agent(archBase(angle), { label: `arch:${i + 1}:propose`, phase: 'Architecture', schema: ARCH_SCHEMA }),
    (prop, angle, i) => prop && agent(`You are the architecture RED TEAM. Break this proposal: core flows it cannot support, security and tenancy holes, data model problems, single points of failure, over-engineering for an MVP, and places it ignores what already exists in this repo. Read the repo to check its claims. Every point needs a reason. Do not edit files.

Brief:
${JSON.stringify(brief, null, 2)}

Proposal:
${JSON.stringify(prop, null, 2)}`, { label: `arch:${i + 1}:red`, phase: 'Architecture', schema: CRITIQUE_SCHEMA, effort: 'high', agentType: AGENT_TYPES.red })
      .then(critique => ({ prop, critique })),
    (x, angle, i) => x && agent(`${archBase(angle)}

Your proposal:
${JSON.stringify(x.prop, null, 2)}

The red team's critique. Revise, and address EVERY point in critiqueResponses: say what you changed, or why you kept it:
${fmtCritique(x.critique)}`, { label: `arch:${i + 1}:revise`, phase: 'Architecture', schema: ARCH_SCHEMA }).then(r => r || x.prop))
  const finalists = proposals.map((p, i) => p && { n: i + 1, angle: ANGLES[i], p }).filter(Boolean)
  if (!finalists.length) throw new Error('no architecture proposals survived')

  // Judges need every proposal at once, so this is a barrier.
  const proposalsText = finalists.map(f => `### Proposal ${f.n} (${f.angle})\n${JSON.stringify(f.p, null, 2)}`).join('\n\n')
  const judgeLenses = ['fit to the brief and core flows', 'security and operational risk', 'build cost and fit with this repo']
  const judged = finalists.length === 1 ? [] : await parallel(judgeLenses.map((lens, i) => () => agent(`You are a judge on an architecture review. Score every proposal 1-10, weighting: ${lens}. Do not edit files.

Brief:
${JSON.stringify(brief, null, 2)}

${proposalsText}`, { label: `judge:${i + 1}`, phase: 'Architecture', schema: SCORE_SCHEMA })))
  const totals = {}
  judged.filter(Boolean).forEach(j => j.scores.forEach(s => { totals[s.proposal] = (totals[s.proposal] || 0) + s.score }))
  const winner = finalists.slice().sort((a, b) => (totals[b.n] || 0) - (totals[a.n] || 0))[0]
  const judgeNotes = judged.filter(Boolean).map((j, i) => `Judge ${i + 1} (${judgeLenses[i]}):\n` +
    j.scores.map(s => `- proposal ${s.proposal}: ${s.score}/10. + ${s.strengths} / - ${s.weaknesses}`).join('\n')).join('\n\n')
  log(`architecture scores: ${finalists.map(f => `#${f.n} ${totals[f.n] || 0}`).join(', ')}; building on #${winner.n}`)
  architecture = winner.p

  const final = await agent(`You are the lead architect. Write the final design docs for this app.

Start from proposal ${winner.n} (it scored highest). Graft in the strongest ideas from the others where the judges' notes support it, and resolve any contradictions.

Brief:
${JSON.stringify(brief, null, 2)}

${proposalsText}

Judges' notes:
${judgeNotes || '(single proposal, not judged)'}

Write two markdown files. Create the folder if needed. Do not commit.
1. docs/plans/${brief.slug}-brief.md: problem, users, core flows, MVP scope, non-goals, success metrics, assumptions, open questions.
2. docs/plans/${brief.slug}-architecture.md: overview, component diagram (mermaid), components with locations, API surface, data model, auth and security, key decisions (decision / rationale / rejected alternative), risks, and open questions.
Match the style of the existing docs/plans files.`, { label: 'arch:synthesize', phase: 'Architecture', schema: FINAL_ARCH_SCHEMA })
  if (!final) throw new Error('architecture synthesis returned nothing')
  designContext = `Product brief: ${final.briefPath}
Architecture doc (decided, read it in full): ${final.architecturePath}
Summary: ${final.summary}`

  if (A.stopAfter === 'architecture') {
    return {
      stoppedAfter: 'architecture',
      brief: final.briefPath,
      architecture: final.architecturePath,
      summary: final.summary,
      scores: totals,
      openQuestions: brief.openQuestions,
      next: `Review the docs, then rerun with args { architecture: "${final.architecturePath}" } to build.`,
    }
  }
}

// ------------------------------------------------------------------- plan --

phase('Plan')
plan = await agent(`You are the lead architect. Break this feature into units of work that separate builder agents can do IN PARALLEL in this repo.

Spec (text, or a path to read): ${A.spec || '(see architecture doc)'}
${designContext}

Follow the architecture: its components, API surface, data model and backend language are decided. Your job is to cut them into units, not to redesign them. Read the repo first: pnpm-workspace.yaml, packages/, and any related docs/plans. Reuse existing packages where they fit (for example cre8-wc/cre8-react for UI, cre8-agent-core or cre8-mcp for services) before proposing new ones.

Rules:
- First, a shared CONTRACT (API types, error shapes, routes) that every other unit codes against. Give it its own ownedPaths and a verify command (typecheck at least).
- Split the work into frontend, backend, data and infra units. Keep them small, about one builder session each.
- ownedPaths must not overlap between units. Two builders writing the same file at once will clobber each other.
- dependsOn only where a unit truly needs another unit's code to exist. Frontend units should depend on the contract, not on backend units, so they can run in parallel.
- Each unit needs concrete acceptance criteria and a verify command that runs only that unit's checks.`, { schema: PLAN_SCHEMA })

if (!plan) throw new Error('planning agent returned nothing')

// Validate the plan in code: unique ids, known deps, no cycles, no path overlap.
const contractUnit = { id: 'contract', layer: 'contract', title: 'Shared API contract', dependsOn: [], ...plan.contract }
byId = { contract: contractUnit }
for (const u of plan.units) {
  if (byId[u.id]) throw new Error(`duplicate unit id ${u.id}`)
  byId[u.id] = u
}
for (const u of plan.units) {
  const unknown = u.dependsOn.filter(d => !byId[d])
  if (unknown.length) log(`${u.id}: dropping unknown deps ${unknown.join(', ')}`)
  u.dependsOn = u.dependsOn.filter(d => byId[d] && d !== 'contract')
}
const overlaps = (a, b) => a === b || a.startsWith(b.replace(/\/?$/, '/')) || b.startsWith(a.replace(/\/?$/, '/'))
const allUnits = [contractUnit, ...plan.units]
for (let i = 0; i < allUnits.length; i++) {
  for (let j = i + 1; j < allUnits.length; j++) {
    const a = allUnits[i], b = allUnits[j]
    if (a.ownedPaths.some(p => b.ownedPaths.some(q => overlaps(p, q))) && b.id !== 'contract' && !b.dependsOn.includes(a.id)) {
      log(`${a.id} and ${b.id} share paths, so ${b.id} will run after ${a.id}`)
      b.dependsOn.push(a.id)
    }
  }
}
const visiting = new Set(), visited = new Set()
function checkCycle(id) {
  if (visited.has(id)) return
  if (visiting.has(id)) throw new Error(`dependency cycle through ${id}`)
  visiting.add(id)
  byId[id].dependsOn.forEach(checkCycle)
  visiting.delete(id); visited.add(id)
}
plan.units.forEach(u => checkCycle(u.id))
log(`plan: ${plan.units.length} units + contract. ${plan.units.map(u => `${u.id}(${u.layer})`).join(', ')}`)

// --------------------------------------------------------------- contract --

phase('Contract')
await runUnit(contractUnit)
if (state.contract.status !== 'accepted') log(`contract is ${state.contract.status}, so builders will see its open findings as context`)

// ------------------------------------------------------------------ build --

phase('Build')
// Dependency-aware scheduler: each unit starts the moment its deps finish.
const running = {}
function schedule(u) {
  if (!running[u.id]) {
    running[u.id] = (async () => {
      await Promise.all(u.dependsOn.map(d => schedule(byId[d])))
      try { return await runUnit(u) } catch (e) { state[u.id] = { ...(state[u.id] || {}), status: 'error', error: String(e) }; return state[u.id] }
    })()
  }
  return running[u.id]
}
await Promise.all(plan.units.map(schedule))

// -------------------------------------------------------------- integrate --

phase('Integrate')

// Late mail: messages sent to a unit after it finished (including contract
// change requests) get a follow-up pass so no message is dropped.
async function drainMail() {
  const late = allUnits.filter(u => pendingHeadsUps(u.id).length)
  if (!late.length) return
  log(`delivering late mail to ${late.map(u => u.id).join(', ')}`)
  // The contract goes first because other units may be waiting on its change.
  const c = late.find(u => u.id === 'contract')
  if (c) await runUnit(c, { rounds: 2 })
  await parallel(late.filter(u => u.id !== 'contract').map(u => () => runUnit(u, { rounds: 2 })))
}
await drainMail()

const ownership = allUnits.map(u => `${u.id}: ${u.ownedPaths.join(', ')}`).join('\n')
async function integrationCheck(tag) {
  return agent(`Run repo-level integration checks for this feature: typecheck, lint and tests for every touched package, plus a build of any package whose public surface changed. Use the repo's existing pnpm scripts. Do not edit files.
Feature: ${plan.summary}
Ownership map (attribute each failure to the unit that owns the failing file):
${ownership}`, { label: `integration:${tag}`, phase: 'Integrate', schema: INTEGRATION_SCHEMA })
}

let integ = await integrationCheck('1')

// Cross-cutting red-team panel: each lens sees the whole feature, not one unit.
const LENSES = [
  'security: authn/authz and tenant isolation end to end, injection, secret handling, what the UI trusts that the server should verify',
  'contract drift: every frontend call and backend handler against the shared contract, including error shapes and status codes',
  'user-facing correctness: walk each acceptance criterion through UI -> API -> data and back, including empty, error and loading states',
]
const panel = await parallel(LENSES.map((lens, i) => () => agent(`You are a RED TEAM auditor looking at the whole feature through one lens: ${lens}.
Feature: ${plan.summary}
Ownership map:
${ownership}
Read the code and do not edit files. Report only findings that span units or that the per-unit red teams could not see. Every finding needs concrete evidence and the owning unit id.`, { label: `panel:${i + 1}`, phase: 'Integrate', schema: PANEL_SCHEMA, effort: 'high', agentType: AGENT_TYPES.red })))

// Dedup across the panel, then have one skeptic try to refute each finding.
const seen = new Set()
const candidates = panel.filter(Boolean).flatMap(p => p.findings).filter(f => {
  const k = `${f.file}:${f.line || ''}:${f.issue.slice(0, 60)}`
  if (seen.has(k)) return false
  seen.add(k); return true
})
const verdicts = await parallel(candidates.map((f, i) => () => agent(`Try to REFUTE this red-team finding. Read the code and run whatever you need; do not edit files. If you are uncertain, say refuted=false: an unrefuted real bug costs more than an extra fix pass.
[${f.severity}] ${f.file}${f.line ? ':' + f.line : ''}: ${f.issue}
evidence: ${f.evidence}`, { label: `refute:${i + 1}`, phase: 'Integrate', schema: VERDICT_SCHEMA })))
const confirmed = candidates.filter((f, i) => verdicts[i] && !verdicts[i].refuted)
log(`panel: ${candidates.length} findings, ${confirmed.length} survived refutation`)

// Repair pass: route integration failures and confirmed findings to owners.
const repairs = {}
function repairFor(unitId) {
  const id = byId[unitId] ? unitId : 'contract'
  return repairs[id] || (repairs[id] = { findings: [], mail: [] })
}
confirmed.forEach((f, i) => repairFor(f.unit).findings.push({ ...f, id: `P${i + 1}` }))
if (integ && !integ.passed) {
  integ.failures.forEach(x => repairFor(x.unit).mail.push({ from: 'integration', kind: 'failure', body: `\`${x.command}\` failed:\n${x.output}` }))
}
const repairIds = Object.keys(repairs)
if (repairIds.length) {
  log(`repair pass for ${repairIds.join(', ')}`)
  if (repairs.contract) await runUnit(contractUnit, { rounds: 2, seedFindings: repairs.contract.findings, seedMail: repairs.contract.mail })
  await parallel(repairIds.filter(id => id !== 'contract').map(id => () =>
    runUnit(byId[id], { rounds: 2, seedFindings: repairs[id].findings, seedMail: repairs[id].mail })))
  await drainMail()
  integ = await integrationCheck('2')
}

// ----------------------------------------------------------------- result --

const undelivered = allUnits.flatMap(u => pendingHeadsUps(u.id))
if (undelivered.length) log(`${undelivered.length} heads-ups still undelivered after the final pass; see result.undeliveredMail`)

return {
  summary: plan.summary,
  integrationPassed: !!(integ && integ.passed),
  integrationFailures: integ ? integ.failures : [],
  units: allUnits.map(u => ({
    id: u.id,
    layer: u.layer,
    status: state[u.id] ? state[u.id].status : 'not-run',
    rounds: state[u.id] ? state[u.id].rounds : 0,
    openFindings: state[u.id] ? state[u.id].openFindings : [],
    filesChanged: state[u.id] && state[u.id].lastBuild ? state[u.id].lastBuild.filesChanged : [],
  })),
  panelFindingsConfirmed: confirmed.length,
  messages: bus.length,
  undeliveredMail: undelivered,
}
