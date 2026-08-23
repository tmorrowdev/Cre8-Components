// Regression fixture: a real 791-line agent submission from an actual trial,
// using ~40 components including form-associated ones. Kept verbatim.
//
// This exists because the reference solution is too simple to exercise the
// code paths that actually broke. The first real trial run scored 0 on this
// tree, for two reasons the reference solution could never hit:
//
//   - Reading a live property can return an internal Lit object rather than
//     the scalar the JSX passed, and those are circular (a template result's
//     renderOptions.host points back at the element), so the whole tree
//     failed to JSON.stringify. serialize-dom.mjs now keeps only scalars.
//   - jsdom implements form-associated custom elements only partially:
//     attachInternals() returns an ElementInternals with no setValidity, so
//     every cre8 field component throws during its Lit update. That surfaces
//     as a process-level unhandled rejection and killed the run outright.
//
// Both failure modes get *more* likely the more of the library an agent
// uses, which is backwards from what the eval wants to reward - hence a
// fixture that uses a lot of it.
//
// Asserted only to score > 0 over a substantial node count, not to hit a
// fixed number. It's one agent's answer to an open brief, so its exact
// reward isn't a spec, but "the harness survives it" is.

import {
  Cre8Accordion,
  Cre8AccordionItem,
  Cre8Badge,
  Cre8Band,
  Cre8Button,
  Cre8ButtonGroup,
  Cre8Card,
  Cre8Chart,
  Cre8Divider,
  Cre8Footer,
  Cre8GlobalNav,
  Cre8GlobalNavItem,
  Cre8Grid,
  Cre8GridItem,
  Cre8Header,
  Cre8Heading,
  Cre8Hero,
  Cre8Icon,
  Cre8InlineAlert,
  Cre8Layout,
  Cre8LayoutContainer,
  Cre8LayoutSection,
  Cre8LinkList,
  Cre8LinkListItem,
  Cre8Logo,
  Cre8Main,
  Cre8ProgressMeter,
  Cre8Section,
  Cre8Tab,
  Cre8TabPanel,
  Cre8Table,
  Cre8TableBody,
  Cre8TableCell,
  Cre8TableHeader,
  Cre8TableHeaderCell,
  Cre8TableRow,
  Cre8Tabs,
  Cre8Tag,
  Cre8TagList,
  Cre8TextLink,
  Cre8TextPassage,
  Cre8UtilityNav,
  Cre8UtilityNavItem,
} from '@tmorrow/cre8-react';

/* ------------------------------------------------------------------ *
 * Soraya Mendel — AI engineer portfolio
 * Every number below is part of the fictional persona.
 * ------------------------------------------------------------------ */

const latencyChart = {
  labels: ['Wk 1', 'Wk 4', 'Wk 8', 'Wk 12', 'Wk 16', 'Wk 20', 'Wk 24', 'Wk 28'],
  datasets: [
    {
      label: 'p95 latency (ms)',
      data: [612, 548, 431, 366, 287, 214, 163, 118],
      fill: true,
      tension: 0.4,
    },
    {
      label: 'p50 latency (ms)',
      data: [380, 331, 248, 197, 142, 96, 61, 41],
      fill: true,
      tension: 0.4,
    },
  ],
};

const spendChart = {
  labels: ['Batch summarisation', 'Support agent', 'Code review bot', 'Embeddings', 'Evals'],
  datasets: [
    {
      label: 'Share of monthly inference spend',
      data: [34, 27, 18, 13, 8],
    },
  ],
};

const throughputChart = {
  labels: ['Baseline vLLM', '+ paged KV', '+ continuous batch', '+ speculative decode'],
  datasets: [
    {
      label: 'Tokens/sec per A100',
      data: [1180, 1940, 3260, 4830],
    },
  ],
};

const evalSuites = [
  {
    suite: 'Tribunal — grounded answering',
    cases: '12,400',
    score: '99.4%',
    delta: '+6.1 pts',
    status: 'success' as const,
    note: 'Shipping',
  },
  {
    suite: 'Tribunal — tool-call arguments',
    cases: '4,180',
    score: '97.8%',
    delta: '+11.3 pts',
    status: 'success' as const,
    note: 'Shipping',
  },
  {
    suite: 'Red-team — prompt injection',
    cases: '2,960',
    score: '94.1%',
    delta: '+22.0 pts',
    status: 'attention' as const,
    note: 'Hardening',
  },
  {
    suite: 'Long-horizon agent replay',
    cases: '860',
    score: '88.6%',
    delta: '+4.4 pts',
    status: 'warning' as const,
    note: 'In progress',
  },
];

const stats = [
  { value: '4.1×', label: 'Serving throughput', note: 'Llama-3.1-70B on the same A100 fleet' },
  { value: '$2.1M', label: 'Annual inference spend removed', note: 'Without a single quality regression' },
  { value: '41ms', label: 'p50 time-to-first-token', note: 'Down from 380ms in 28 weeks' },
  { value: '3.2B', label: 'Tokens served per day', note: 'Across 14 production surfaces' },
];

const toolbox = [
  { text: 'PyTorch', variant: 'branded' as const },
  { text: 'CUDA', variant: 'branded' as const },
  { text: 'Triton', variant: 'branded' as const },
  { text: 'vLLM', variant: 'branded' as const },
  { text: 'Rust', variant: 'branded' as const },
  { text: 'Ray', variant: 'neutral' as const },
  { text: 'Kubernetes', variant: 'neutral' as const },
  { text: 'DSPy', variant: 'neutral' as const },
  { text: 'OpenTelemetry', variant: 'neutral' as const },
  { text: 'DuckDB', variant: 'neutral' as const },
  { text: 'Anthropic SDK', variant: 'neutral-hybrid' as const },
  { text: 'Modal', variant: 'neutral-hybrid' as const },
];

export default function App() {
  return (
    <Cre8Layout>
      <Cre8Header>
        <Cre8UtilityNav slot="top" navAriaLabel="Elsewhere on the web">
          <Cre8UtilityNavItem
            href="https://github.com/sorayamendel"
            text="GitHub"
            iconName="external-file"
            iconPosition="before"
          />
          <Cre8UtilityNavItem
            href="https://www.linkedin.com/in/sorayamendel"
            text="LinkedIn"
            iconName="linkedin"
            iconPosition="before"
          />
          <Cre8UtilityNavItem
            href="mailto:hey@sorayamendel.dev"
            text="hey@sorayamendel.dev"
            iconName="email"
            iconPosition="before"
          />
        </Cre8UtilityNav>

        <Cre8Logo href="#top">
          <strong>Soraya Mendel</strong>
        </Cre8Logo>

        <Cre8GlobalNav navAriaLabel="Portfolio sections" behavior="side-by-side">
          <Cre8GlobalNavItem href="#work" text="Work" isActive />
          <Cre8GlobalNavItem href="#numbers" text="Numbers" />
          <Cre8GlobalNavItem href="#experience" text="Experience" />
          <Cre8GlobalNavItem href="#writing" text="Writing" />
          <Cre8GlobalNavItem href="#contact" text="Contact" />
        </Cre8GlobalNav>
      </Cre8Header>

      <Cre8Main>
        {/* ---------------------------------------------------------- *
         * Hero
         * ---------------------------------------------------------- */}
        <Cre8Band variant="branded">
          <Cre8Hero align="left">
            <Cre8Heading type="display-default" tagVariant="h1" inverted>
              I make large models cheap enough to ship and honest enough to trust.
            </Cre8Heading>

            <Cre8Heading type="title-large" tagVariant="h2" inverted>
              Soraya Mendel — AI Engineer, inference &amp; evaluation systems. Lisbon, remote-first.
            </Cre8Heading>

            <Cre8TextPassage size="large" inverted>
              <p>
                Seven years turning research demos into systems that hold up at 3am. I work the
                whole depth of the stack — CUDA kernels and speculative decoding at the bottom,
                calibrated eval harnesses and agent traces at the top — because latency, cost and
                correctness are the same problem viewed from three angles.
              </p>
            </Cre8TextPassage>

            <Cre8ButtonGroup>
              <Cre8Button text="See the work" variant="primary" href="#work" />
              <Cre8Button
                text="Download résumé"
                variant="secondary"
                iconName="download"
                iconPosition="after"
                href="/soraya-mendel-cv.pdf"
              />
              <Cre8Button
                text="Book 30 minutes"
                variant="tertiary"
                inverse
                href="mailto:hey@sorayamendel.dev"
              />
            </Cre8ButtonGroup>
          </Cre8Hero>
        </Cre8Band>

        <Cre8LayoutContainer>
          {/* -------------------------------------------------------- *
           * Availability
           * -------------------------------------------------------- */}
          <Cre8LayoutSection>
            <Cre8InlineAlert status="success" variant="subtle" iconName="check-circle" fullWidth>
              <Cre8Heading type="title-small" tagVariant="h2">
                Open to Staff / Principal AI Engineer roles from March
              </Cre8Heading>
              <p>
                Happiest on serving infrastructure, evaluation, or the awkward seam between them.
                EU-based, comfortable with US overlap hours.
              </p>
            </Cre8InlineAlert>
          </Cre8LayoutSection>

          {/* -------------------------------------------------------- *
           * Numbers
           * -------------------------------------------------------- */}
          <Cre8LayoutSection>
            <span id="numbers" />
            <Cre8Heading type="headline-large" tagVariant="h2">
              The numbers I am judged by
            </Cre8Heading>
            <Cre8TextPassage>
              <p>
                Measured on Halcyon Labs production traffic between March and October, against a
                frozen quality bar. Every figure below survived an A/B holdout.
              </p>
            </Cre8TextPassage>

            <Cre8Grid variant="4up" gap="lg">
              {stats.map((stat) => (
                <Cre8GridItem key={stat.label}>
                  <Cre8Card fullHeight>
                    <Cre8Heading slot="header" type="display-small" tagVariant="h3" brandColor>
                      {stat.value}
                    </Cre8Heading>
                    <Cre8Heading type="title-small" tagVariant="h4">
                      {stat.label}
                    </Cre8Heading>
                    <Cre8TextPassage size="small">
                      <p>{stat.note}</p>
                    </Cre8TextPassage>
                  </Cre8Card>
                </Cre8GridItem>
              ))}
            </Cre8Grid>
          </Cre8LayoutSection>

          <Cre8Divider variant="horizontal" status="brand" />

          {/* -------------------------------------------------------- *
           * Deep dives — tabs
           * -------------------------------------------------------- */}
          <Cre8LayoutSection>
            <span id="work" />
            <Cre8Heading type="headline-large" tagVariant="h2">
              Three systems, in detail
            </Cre8Heading>
            <Cre8TextPassage>
              <p>
                Each tab is a real production system I owned end to end — the constraint that
                forced it, the thing I built, and the evidence it worked.
              </p>
            </Cre8TextPassage>

            <Cre8Tabs activeIndex={0}>
              <Cre8Tab>Kestrel · serving</Cre8Tab>
              <Cre8Tab>Tribunal · evaluation</Cre8Tab>
              <Cre8Tab>Loomlet · agents</Cre8Tab>

              {/* ---- Kestrel ---- */}
              <Cre8TabPanel slot="panel" index={0}>
                <Cre8Grid variant="side-by-side" gap="lg">
                  <Cre8GridItem>
                    <Cre8Card fullHeight>
                      <Cre8Heading slot="header" type="title-large" tagVariant="h3">
                        Kestrel — a serving layer that pays for itself
                      </Cre8Heading>
                      <Cre8TextPassage>
                        <p>
                          Our 70B chat surface was pinned at 1,180 tokens/sec per A100 and the
                          bill was growing faster than usage. I rewrote the scheduler in Rust,
                          added paged KV reuse across sibling requests, then layered a 1.5B draft
                          model for speculative decoding with a rejection-aware batcher.
                        </p>
                        <p>
                          The unlock was accepting that draft quality varies by prompt family:
                          Kestrel routes per-request, falling back to plain decoding when the
                          acceptance rate drops below 0.55. Throughput went up 4.1× and the fleet
                          shrank from 96 GPUs to 31.
                        </p>
                      </Cre8TextPassage>
                      <Cre8TagList slot="footer" label="Stack">
                        <Cre8Tag text="Rust" variant="branded" shape="round" />
                        <Cre8Tag text="CUDA graphs" variant="branded" shape="round" />
                        <Cre8Tag text="vLLM" variant="branded" shape="round" />
                        <Cre8Tag text="Triton" variant="neutral" shape="round" />
                      </Cre8TagList>
                    </Cre8Card>
                  </Cre8GridItem>

                  <Cre8GridItem>
                    <Cre8Card fullHeight>
                      <Cre8Heading slot="header" type="title-default" tagVariant="h4">
                        Tokens/sec per A100, by optimisation
                      </Cre8Heading>
                      <Cre8Chart
                        type="bar"
                        height={240}
                        data={throughputChart}
                        showLegend={false}
                        ariaLabel="Bar chart showing tokens per second rising from 1,180 on baseline vLLM to 4,830 with speculative decoding"
                      />
                      <Cre8TextPassage slot="footer" size="small">
                        <p>Measured at batch size 64, 2,048-token prompts, greedy decoding.</p>
                      </Cre8TextPassage>
                    </Cre8Card>
                  </Cre8GridItem>
                </Cre8Grid>

                <Cre8Card variant="bare">
                  <Cre8Heading slot="header" type="title-default" tagVariant="h4">
                    Latency, week by week
                  </Cre8Heading>
                  <Cre8Chart
                    type="line"
                    height={260}
                    data={latencyChart}
                    legendPosition="bottom"
                    ariaLabel="Line chart of p95 and p50 latency falling from 612ms and 380ms to 118ms and 41ms over 28 weeks"
                  />
                </Cre8Card>
              </Cre8TabPanel>

              {/* ---- Tribunal ---- */}
              <Cre8TabPanel slot="panel" index={1}>
                <Cre8Card>
                  <Cre8Heading slot="header" type="title-large" tagVariant="h3">
                    Tribunal — evaluation you can merge against
                  </Cre8Heading>
                  <Cre8TextPassage>
                    <p>
                      Nobody could tell whether a prompt change helped. I built a graded suite of
                      20,400 cases mined from real traffic, with an LLM judge calibrated against
                      three human raters until agreement hit Cohen&apos;s κ = 0.81. It runs on every
                      pull request in under nine minutes and blocks merges on regression.
                    </p>
                    <p>
                      The unglamorous half was provenance: every case carries the trace it came
                      from, so a failing grade is one click from the conversation that produced it.
                    </p>
                  </Cre8TextPassage>

                  <Cre8Table variant="striped" isHoverable caption="Tribunal suites, current quarter">
                    <Cre8TableHeader>
                      <Cre8TableRow>
                        <Cre8TableHeaderCell>Suite</Cre8TableHeaderCell>
                        <Cre8TableHeaderCell>Cases</Cre8TableHeaderCell>
                        <Cre8TableHeaderCell>Pass rate</Cre8TableHeaderCell>
                        <Cre8TableHeaderCell>Δ vs. baseline</Cre8TableHeaderCell>
                        <Cre8TableHeaderCell>State</Cre8TableHeaderCell>
                      </Cre8TableRow>
                    </Cre8TableHeader>
                    <Cre8TableBody>
                      {evalSuites.map((row) => (
                        <Cre8TableRow key={row.suite}>
                          <Cre8TableCell dataHeader="Suite">{row.suite}</Cre8TableCell>
                          <Cre8TableCell dataHeader="Cases">{row.cases}</Cre8TableCell>
                          <Cre8TableCell dataHeader="Pass rate">{row.score}</Cre8TableCell>
                          <Cre8TableCell dataHeader="Δ vs. baseline">{row.delta}</Cre8TableCell>
                          <Cre8TableCell dataHeader="State">
                            <Cre8Badge text={row.note} status={row.status} />
                          </Cre8TableCell>
                        </Cre8TableRow>
                      ))}
                    </Cre8TableBody>
                  </Cre8Table>

                  <Cre8ButtonGroup slot="footer">
                    <Cre8Button
                      text="Read the calibration write-up"
                      variant="secondary"
                      href="#writing"
                    />
                    <Cre8Button
                      text="tribunal-core on GitHub"
                      variant="tertiary"
                      iconName="external-file"
                      iconPosition="after"
                      href="https://github.com/sorayamendel/tribunal-core"
                      target="_blank"
                      rel="noreferrer"
                    />
                  </Cre8ButtonGroup>
                </Cre8Card>
              </Cre8TabPanel>

              {/* ---- Loomlet ---- */}
              <Cre8TabPanel slot="panel" index={2}>
                <Cre8Grid variant="side-by-side" gap="lg">
                  <Cre8GridItem>
                    <Cre8Card fullHeight>
                      <Cre8Heading slot="header" type="title-large" tagVariant="h3">
                        Loomlet — a support agent that knows when to stop
                      </Cre8Heading>
                      <Cre8TextPassage>
                        <p>
                          A retrieval-planning agent handling tier-one support for 1.4M customers.
                          It plans a retrieval path before it answers, and it is rewarded for
                          escalating rather than guessing — an abstention head trained on 40,000
                          human handoffs.
                        </p>
                        <p>
                          44% of tickets now resolve without a human, and the measured
                          hallucination rate on grounded claims is 0.3%. The escalations it does
                          make arrive with a summary that agents actually read.
                        </p>
                      </Cre8TextPassage>
                      <Cre8TagList slot="footer" label="Stack">
                        <Cre8Tag text="DSPy" variant="branded" shape="round" />
                        <Cre8Tag text="Ray Serve" variant="branded" shape="round" />
                        <Cre8Tag text="pgvector" variant="neutral" shape="round" />
                        <Cre8Tag text="OpenTelemetry" variant="neutral" shape="round" />
                      </Cre8TagList>
                    </Cre8Card>
                  </Cre8GridItem>

                  <Cre8GridItem>
                    <Cre8Card fullHeight>
                      <Cre8Heading slot="header" type="title-default" tagVariant="h4">
                        Where the inference budget goes
                      </Cre8Heading>
                      <Cre8Chart
                        type="doughnut"
                        height={240}
                        data={spendChart}
                        legendPosition="bottom"
                        ariaLabel="Doughnut chart of monthly inference spend: batch summarisation 34 percent, support agent 27, code review bot 18, embeddings 13, evals 8"
                      />
                      <Cre8TextPassage slot="footer" size="small">
                        <p>
                          Tracking spend by workload rather than by model is what made the 68% cut
                          findable in the first place.
                        </p>
                      </Cre8TextPassage>
                    </Cre8Card>
                  </Cre8GridItem>
                </Cre8Grid>
              </Cre8TabPanel>
            </Cre8Tabs>
          </Cre8LayoutSection>

          {/* -------------------------------------------------------- *
           * Depth self-assessment
           * -------------------------------------------------------- */}
          <Cre8LayoutSection>
            <Cre8Heading type="headline-default" tagVariant="h2">
              Where I am deep, and where I am not
            </Cre8Heading>
            <Cre8TextPassage>
              <p>
                An honest map. I would rather you know before the interview than after the first
                sprint.
              </p>
            </Cre8TextPassage>

            <Cre8Grid variant="2up" gap="lg">
              <Cre8GridItem>
                <Cre8Card variant="bare" fullHeight>
                  <Cre8ProgressMeter
                    label="Inference optimisation & GPU serving"
                    value={95}
                    max={100}
                    status="success"
                  />
                  <Cre8ProgressMeter
                    label="Evaluation design & LLM-as-judge calibration"
                    value={92}
                    max={100}
                    status="success"
                  />
                  <Cre8ProgressMeter
                    label="Agent architecture & tool orchestration"
                    value={84}
                    max={100}
                    status="success"
                  />
                </Cre8Card>
              </Cre8GridItem>
              <Cre8GridItem>
                <Cre8Card variant="bare" fullHeight>
                  <Cre8ProgressMeter
                    label="Distributed training at pre-training scale"
                    value={61}
                    max={100}
                    status="warning"
                  />
                  <Cre8ProgressMeter
                    label="Front-end product engineering"
                    value={48}
                    max={100}
                    status="warning"
                  />
                  <Cre8ProgressMeter
                    label="Classical computer vision"
                    value={30}
                    max={100}
                    status="error"
                  />
                </Cre8Card>
              </Cre8GridItem>
            </Cre8Grid>
          </Cre8LayoutSection>

          {/* -------------------------------------------------------- *
           * Toolbox
           * -------------------------------------------------------- */}
          <Cre8LayoutSection>
            <Cre8Heading type="headline-default" tagVariant="h2">
              Toolbox
            </Cre8Heading>
            <Cre8TagList label="Tools I reach for weekly">
              {toolbox.map((tool) => (
                <Cre8Tag key={tool.text} text={tool.text} variant={tool.variant} shape="round" />
              ))}
            </Cre8TagList>
          </Cre8LayoutSection>

          <Cre8Divider variant="horizontal" status="brand" />

          {/* -------------------------------------------------------- *
           * Experience
           * -------------------------------------------------------- */}
          <Cre8LayoutSection>
            <span id="experience" />
            <Cre8Heading type="headline-large" tagVariant="h2">
              Experience
            </Cre8Heading>

            <Cre8Accordion borderType="rounded" hasDivider>
              <Cre8AccordionItem
                heading="Staff AI Engineer · Halcyon Labs · 2023 – present"
                headingTagVariant="h3"
                size="lg"
                isActive
              >
                <Cre8TextPassage>
                  <p>
                    Own inference and evaluation for a 3.2B-token-per-day platform. Built Kestrel
                    and Tribunal; cut annual inference spend by $2.1M while raising the grounded
                    answering pass rate by 6.1 points.
                  </p>
                  <p>
                    Also the person who writes the postmortems. Ran the incident review after a
                    KV-cache eviction bug served 40 minutes of truncated answers, and turned the
                    findings into the replay suite that would have caught it.
                  </p>
                </Cre8TextPassage>
              </Cre8AccordionItem>

              <Cre8AccordionItem
                heading="Senior ML Engineer · Northwind Robotics · 2020 – 2023"
                headingTagVariant="h3"
                size="lg"
              >
                <Cre8TextPassage>
                  <p>
                    Shipped on-device perception and instruction-following for warehouse robots.
                    Quantised a 7B planner to 4-bit AWQ so it ran on a Jetson Orin at 18 tokens/sec,
                    which is where my taste for making models smaller started.
                  </p>
                </Cre8TextPassage>
              </Cre8AccordionItem>

              <Cre8AccordionItem
                heading="Backend Engineer · Vetiver Health · 2018 – 2020"
                headingTagVariant="h3"
                size="lg"
              >
                <Cre8TextPassage>
                  <p>
                    Payments and clinical records at a regulated startup. Learned to write systems
                    where being wrong is expensive and auditability is not optional — habits that
                    transferred to model evaluation more directly than I expected.
                  </p>
                </Cre8TextPassage>
              </Cre8AccordionItem>

              <Cre8AccordionItem
                heading="MSc Computer Science · Instituto Superior Técnico · 2016 – 2018"
                headingTagVariant="h3"
                size="lg"
              >
                <Cre8TextPassage>
                  <p>
                    Thesis on structured sparsity in attention, supervised by the group that later
                    became the sparse-attention team at Unbabel.
                  </p>
                </Cre8TextPassage>
              </Cre8AccordionItem>
            </Cre8Accordion>
          </Cre8LayoutSection>

          {/* -------------------------------------------------------- *
           * Writing & open source
           * -------------------------------------------------------- */}
          <Cre8LayoutSection>
            <span id="writing" />
            <Cre8Heading type="headline-large" tagVariant="h2">
              Writing &amp; open source
            </Cre8Heading>

            <Cre8Grid variant="side-by-side" gap="lg">
              <Cre8GridItem>
                <Cre8Card fullHeight>
                  <Cre8Heading slot="header" type="title-default" tagVariant="h3">
                    Essays
                  </Cre8Heading>
                  <Cre8LinkList behavior="responsive">
                    <Cre8LinkListItem href="/writing/speculative-decoding-in-anger">
                      Speculative decoding in anger: what the papers leave out
                      <Cre8Badge slot="itemAfter" text="Most read" status="info" />
                    </Cre8LinkListItem>
                    <Cre8LinkListItem href="/writing/calibrating-a-judge">
                      Calibrating an LLM judge against humans you can afford
                      <Cre8Badge slot="itemAfter" text="New" status="success" />
                    </Cre8LinkListItem>
                    <Cre8LinkListItem href="/writing/abstention-is-a-feature">
                      Abstention is a feature: teaching agents to escalate
                    </Cre8LinkListItem>
                    <Cre8LinkListItem href="/writing/the-cost-of-a-token">
                      The true cost of a token, measured three ways
                    </Cre8LinkListItem>
                  </Cre8LinkList>
                </Cre8Card>
              </Cre8GridItem>

              <Cre8GridItem>
                <Cre8Card fullHeight>
                  <Cre8Heading slot="header" type="title-default" tagVariant="h3">
                    Repositories &amp; talks
                  </Cre8Heading>
                  <Cre8LinkList behavior="responsive">
                    <Cre8LinkListItem href="https://github.com/sorayamendel/awq-lite">
                      <Cre8Icon slot="itemBefore" name="external-file" iconTitle="External link" />
                      awq-lite — 4-bit quantisation in 900 lines
                      <Cre8Badge slot="itemAfter" text="2.3k ★" status="attention" />
                    </Cre8LinkListItem>
                    <Cre8LinkListItem href="https://github.com/sorayamendel/tribunal-core">
                      <Cre8Icon slot="itemBefore" name="external-file" iconTitle="External link" />
                      tribunal-core — the eval harness, extracted
                      <Cre8Badge slot="itemAfter" text="740 ★" status="attention" />
                    </Cre8LinkListItem>
                    <Cre8LinkListItem href="/talks/pydata-lisbon">
                      <Cre8Icon slot="itemBefore" name="play-circle-outline" iconTitle="Video" />
                      PyData Lisbon — Serving 70B models on a startup budget
                    </Cre8LinkListItem>
                    <Cre8LinkListItem href="/talks/mlops-world">
                      <Cre8Icon slot="itemBefore" name="play-circle-outline" iconTitle="Video" />
                      MLOps World — Evals that block the merge button
                    </Cre8LinkListItem>
                  </Cre8LinkList>
                </Cre8Card>
              </Cre8GridItem>
            </Cre8Grid>
          </Cre8LayoutSection>

          {/* -------------------------------------------------------- *
           * What people say
           * -------------------------------------------------------- */}
          <Cre8LayoutSection>
            <Cre8Card variant="horizontal">
              <Cre8Heading slot="header" type="title-large" tagVariant="h2" brandColor>
                &ldquo;She deleted two thirds of our GPU fleet and the graphs got better.&rdquo;
              </Cre8Heading>
              <Cre8TextPassage>
                <p>
                  Soraya joined to fix a latency problem and left us with an evaluation culture.
                  The thing I would hire her for again is not the kernels — it is that she made
                  the whole team able to argue about quality with numbers instead of vibes.
                </p>
              </Cre8TextPassage>
              <Cre8TextPassage slot="footer" size="small">
                <p>
                  <strong>Dr. Yusuf Adeyemi</strong> — VP Engineering, Halcyon Labs
                </p>
              </Cre8TextPassage>
            </Cre8Card>
          </Cre8LayoutSection>

          {/* -------------------------------------------------------- *
           * Contact
           * -------------------------------------------------------- */}
          <Cre8LayoutSection>
            <span id="contact" />
            <Cre8Section>
              <Cre8Heading slot="header" type="headline-large" tagVariant="h2">
                Let&apos;s talk about your inference bill
              </Cre8Heading>
              <Cre8TextPassage size="large">
                <p>
                  If you have a model in production that is too slow, too expensive, or too hard
                  to trust, that is the conversation I most want to have. Send me the shape of the
                  problem and I will send back what I would try first.
                </p>
              </Cre8TextPassage>
              <Cre8ButtonGroup>
                <Cre8Button
                  text="hey@sorayamendel.dev"
                  variant="primary"
                  iconName="email"
                  iconPosition="before"
                  href="mailto:hey@sorayamendel.dev"
                />
                <Cre8Button
                  text="LinkedIn"
                  variant="secondary"
                  iconName="linkedin"
                  iconPosition="before"
                  href="https://www.linkedin.com/in/sorayamendel"
                  target="_blank"
                  rel="noreferrer"
                />
                <Cre8Button
                  text="GitHub"
                  variant="tertiary"
                  iconName="external-file"
                  iconPosition="after"
                  href="https://github.com/sorayamendel"
                  target="_blank"
                  rel="noreferrer"
                />
              </Cre8ButtonGroup>
            </Cre8Section>
          </Cre8LayoutSection>
        </Cre8LayoutContainer>
      </Cre8Main>

      <Cre8Footer>
        <Cre8LinkList slot="top" behavior="horizontal" variant="secondary" spacing="condensed">
          <Cre8LinkListItem href="#work" text="Work" />
          <Cre8LinkListItem href="#experience" text="Experience" />
          <Cre8LinkListItem href="#writing" text="Writing" />
          <Cre8LinkListItem href="#contact" text="Contact" />
          <Cre8LinkListItem href="/soraya-mendel-cv.pdf" text="Résumé (PDF)" />
        </Cre8LinkList>

        <Cre8TextPassage size="small">
          <p>
            Soraya Mendel — AI engineer, Lisbon. Built with the CRE8 design system.{' '}
            <Cre8TextLink href="mailto:hey@sorayamendel.dev" size="sm">
              hey@sorayamendel.dev
            </Cre8TextLink>
          </p>
        </Cre8TextPassage>

        <Cre8TextPassage slot="bottom" size="small">
          <p>© 2026 Soraya Mendel. Numbers on this page are measured, not modelled.</p>
        </Cre8TextPassage>
      </Cre8Footer>
    </Cre8Layout>
  );
}
