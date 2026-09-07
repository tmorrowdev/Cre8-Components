import type { CSSProperties } from 'react';
import {
  Cre8Alert,
  Cre8Badge,
  Cre8Button,
  Cre8ButtonGroup,
  Cre8Card,
  Cre8Chart,
  Cre8Divider,
  Cre8Dropdown,
  Cre8DropdownItem,
  Cre8Footer,
  Cre8GlobalNav,
  Cre8GlobalNavItem,
  Cre8Grid,
  Cre8GridItem,
  Cre8Header,
  Cre8Heading,
  Cre8InlineAlert,
  Cre8Layout,
  Cre8LayoutContainer,
  Cre8LayoutSection,
  Cre8LinkList,
  Cre8LinkListItem,
  Cre8List,
  Cre8ListItem,
  Cre8Main,
  Cre8PageHeader,
  Cre8ProgressMeter,
  Cre8ProgressSteps,
  Cre8ProgressStepsItem,
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
  Cre8TextLink,
  Cre8TextPassage,
  Cre8UtilityNav,
  Cre8UtilityNavItem,
} from '@tmorrow/cre8-react';

/* ------------------------------------------------------------------ *
 * Studio data. In the real app this comes from the platform sync job; *
 * here it is the shape the page renders against.                      *
 * ------------------------------------------------------------------ */

const KPIS = [
  { label: 'Total audience', value: '1.24M', delta: '+18.4K this week', status: 'success' as const },
  { label: 'Reach · last 30 days', value: '8.9M', delta: '+12.3% vs. prior 30', status: 'success' as const },
  { label: 'Engagement rate', value: '6.4%', delta: '+0.7 pts', status: 'success' as const },
  { label: 'Booked revenue · Q3', value: '$184,500', delta: '74% of $250K goal', status: 'info' as const },
];

const PLATFORMS = [
  { name: 'Instagram', handle: '@priyamakes', followers: '612K', growth: '+8.1K / 28d' },
  { name: 'TikTok', handle: '@priyamakes', followers: '448K', growth: '+9.6K / 28d' },
  { name: 'YouTube', handle: 'Priya Makes', followers: '154K', growth: '+2.2K / 28d' },
  { name: 'The Counter (newsletter)', handle: 'thecounter.priyamakes.co', followers: '31.2K', growth: '+1.4K / 28d' },
];

type CampaignStatus = 'success' | 'warning' | 'info' | 'attention' | 'error';

const CAMPAIGNS: Array<{
  name: string;
  brand: string;
  channels: string;
  delivered: string;
  fee: string;
  due: string;
  status: string;
  statusTone: CampaignStatus;
}> = [
  {
    name: 'One-Pan Autumn',
    brand: 'Kettleworks',
    channels: 'Instagram · YouTube',
    delivered: '3 of 5',
    fee: '$42,000',
    due: '4 Sep',
    status: 'In edit',
    statusTone: 'warning',
  },
  {
    name: 'Pantry Reset',
    brand: 'Verdant Grocer',
    channels: 'TikTok',
    delivered: '6 of 6',
    fee: '$18,500',
    due: '26 Aug',
    status: 'In review',
    statusTone: 'info',
  },
  {
    name: 'Table for Two',
    brand: 'Nomu Ceramics',
    channels: 'Instagram',
    delivered: '2 of 4',
    fee: '$12,000',
    due: '18 Sep',
    status: 'Filming',
    statusTone: 'warning',
  },
  {
    name: 'Founders Series',
    brand: 'Slate & Salt',
    channels: 'YouTube',
    delivered: '0 of 2',
    fee: '$65,000',
    due: '2 Oct',
    status: 'Contract out',
    statusTone: 'attention',
  },
  {
    name: 'Holiday Bake',
    brand: 'Hearthline Ovens',
    channels: 'Instagram · Newsletter',
    delivered: '4 of 4',
    fee: '$27,000',
    due: '21 Aug',
    status: 'Invoiced',
    statusTone: 'success',
  },
];

const SCHEDULE: Array<{
  when: string;
  channel: string;
  title: string;
  campaign: string;
  status: string;
  statusTone: CampaignStatus;
}> = [
  {
    when: 'Mon 24 Aug · 6:30 PM',
    channel: 'Instagram Reel',
    title: '3-ingredient miso butter corn',
    campaign: 'Kettleworks — One-Pan Autumn',
    status: 'Scheduled',
    statusTone: 'success',
  },
  {
    when: 'Tue 25 Aug · 12:00 PM',
    channel: 'TikTok',
    title: 'Pantry reset: the twenty-jar system',
    campaign: 'Verdant Grocer — Pantry Reset',
    status: 'In review',
    statusTone: 'info',
  },
  {
    when: 'Wed 26 Aug · 8:00 AM',
    channel: 'Newsletter',
    title: 'What I actually keep on the counter',
    campaign: 'Owned',
    status: 'Draft',
    statusTone: 'warning',
  },
  {
    when: 'Thu 27 Aug · 5:00 PM',
    channel: 'YouTube',
    title: 'One pan, four dinners (autumn edition)',
    campaign: 'Kettleworks — One-Pan Autumn',
    status: 'Editing',
    statusTone: 'warning',
  },
  {
    when: 'Fri 28 Aug · 7:15 PM',
    channel: 'Instagram Carousel',
    title: "Nomu's new stoneware, styled four ways",
    campaign: 'Nomu Ceramics — Table for Two',
    status: 'Scheduled',
    statusTone: 'success',
  },
  {
    when: 'Sat 29 Aug · 10:00 AM',
    channel: 'TikTok',
    title: 'Sunday prep with me',
    campaign: 'Owned',
    status: 'Idea',
    statusTone: 'attention',
  },
];

const DELIVERABLES = [
  { label: 'Kettleworks — One-Pan Autumn', value: 3, max: 5, status: 'warning' as const },
  { label: 'Verdant Grocer — Pantry Reset', value: 6, max: 6, status: 'success' as const },
  { label: 'Nomu Ceramics — Table for Two', value: 2, max: 4, status: 'warning' as const },
  { label: 'Slate & Salt — Founders Series', value: 0, max: 2, status: 'error' as const },
];

const AGE_SPLIT = [
  { label: '18–24', value: 22 },
  { label: '25–34', value: 41 },
  { label: '35–44', value: 24 },
  { label: '45+', value: 13 },
];

const MARKETS = [
  { label: 'United States', value: 38 },
  { label: 'India', value: 14 },
  { label: 'United Kingdom', value: 11 },
  { label: 'Canada', value: 8 },
  { label: 'Australia', value: 6 },
];

const RUN_OF_SHOW = [
  { time: '09:30', item: 'Shot list review — Kettleworks autumn set' },
  { time: '11:00', item: 'Call: Slate & Salt, contract terms + usage window' },
  { time: '14:00', item: 'Edit Reel — miso butter corn, cut to 42s' },
  { time: '16:00', item: 'Approve newsletter draft for Wednesday' },
  { time: '18:30', item: 'Reel publishes — reply to comments for 45 min' },
];

const PILLARS = ['Weeknight dinners', 'Kitchen gear', 'Pantry & storage', 'Baking', 'Behind the scenes'];

const stack = (gap: string): CSSProperties => ({ display: 'grid', gap });
const sidebarWidth = { '--cre8-sidebar-width': '32%' } as CSSProperties;

/* ------------------------------------------------------------------ */

/**
 * cre8-progress-meter's own `label` is the accessible name and is clipped out of
 * the visual flow, so anything the reader needs to see has to sit above the bar.
 */
function Meter({
  caption,
  value,
  max,
  status,
  fieldId,
}: {
  caption: string;
  value: number;
  max: number;
  status?: 'error' | 'warning' | 'success';
  fieldId: string;
}) {
  return (
    <div style={stack('0.375rem')}>
      <Cre8Heading tagVariant="h4" type="meta-default">
        {caption}
      </Cre8Heading>
      <Cre8ProgressMeter label={caption} value={value} max={max} status={status} fieldId={fieldId} />
    </div>
  );
}

function KpiCard({ label, value, delta, status }: (typeof KPIS)[number]) {
  return (
    <Cre8Card fullHeight>
      <Cre8Heading slot="header" tagVariant="h3" type="label-default">
        {label}
      </Cre8Heading>
      <Cre8Heading tagVariant="h4" type="display-small">
        {value}
      </Cre8Heading>
      <Cre8Badge slot="footer" text={delta} status={status} variant="light" />
    </Cre8Card>
  );
}

export default function App() {
  return (
    <>
      <Cre8Header>
        <Cre8UtilityNav slot="top" navAriaLabel="Account and billing">
          <Cre8UtilityNavItem text="Media kit" href="#media-kit" />
          <Cre8UtilityNavItem text="Invoices" href="#invoices" />
          <Cre8UtilityNavItem text="Rate card" href="#rates" />
          <Cre8UtilityNavItem text="priya@priyamakes.co" href="#account" />
        </Cre8UtilityNav>

        <Cre8Heading tagVariant="h1" type="title-default" brandColor>
          Innovexa Creator Studio
        </Cre8Heading>

        <Cre8GlobalNav navAriaLabel="Studio sections">
          <Cre8GlobalNavItem text="Dashboard" href="#dashboard" isActive />
          <Cre8GlobalNavItem text="Campaigns" href="#campaigns" />
          <Cre8GlobalNavItem text="Calendar" href="#calendar" />
          <Cre8GlobalNavItem text="Audience" href="#audience" />
          <Cre8GlobalNavItem text="Inbox" href="#inbox" />
          <Cre8GlobalNavItem text="Payments" href="#payments" />
        </Cre8GlobalNav>
      </Cre8Header>

      <Cre8Main>
        <Cre8LayoutContainer>
          <div style={stack('2rem')}>
            <Cre8Alert
              status="warning"
              variant="banner"
              emphasis="subtle"
              headerText="Slate & Salt contract is waiting on your signature"
            >
              Filming for the Founders Series is blocked until the usage window is countersigned. The
              brand asked for a decision by Wednesday 26 August.
              <Cre8Button slot="cta" text="Review contract" variant="secondary" size="sm" />
            </Cre8Alert>

            <Cre8PageHeader heading="Good morning, Priya">
              <Cre8Badge slot="titleAfter" text="Pro studio" status="info" />
              Monday 24 August 2026 · 3 posts go live this week, 2 deliverables are due, and $59,500
              is outstanding across two invoices.
            </Cre8PageHeader>

            <Cre8ButtonGroup>
              <Cre8Button text="Schedule a post" variant="primary" />
              <Cre8Button text="New campaign brief" variant="secondary" />
              <Cre8Button text="Export weekly report" variant="tertiary" />
            </Cre8ButtonGroup>

            <Cre8Grid variant="4up" gap="lg">
              {KPIS.map((kpi) => (
                <Cre8GridItem key={kpi.label} fullHeight>
                  <KpiCard {...kpi} />
                </Cre8GridItem>
              ))}
            </Cre8Grid>

            <Cre8Divider />

            <Cre8Layout style={sidebarWidth}>
              {/* ---------------- main column ---------------- */}
              <Cre8LayoutSection>
                <Cre8Tabs activeIndex={0} fullWidth>
                  <Cre8Tab>Performance</Cre8Tab>
                  <Cre8Tab>Campaigns</Cre8Tab>
                  <Cre8Tab>Content calendar</Cre8Tab>
                  <Cre8Tab>Audience</Cre8Tab>

                  {/* -------- Performance -------- */}
                  <Cre8TabPanel slot="panel">
                    <div style={stack('1.5rem')}>
                      <Cre8Card>
                        <Cre8Heading slot="header" tagVariant="h3" type="title-default">
                          Weekly reach by platform
                        </Cre8Heading>
                        <Cre8Chart
                          type="line"
                          height={300}
                          showLegend
                          legendPosition="bottom"
                          ariaLabel="Weekly reach in thousands for Instagram, TikTok and YouTube over the last eight weeks"
                          data={{
                            labels: [
                              '29 Jun',
                              '6 Jul',
                              '13 Jul',
                              '20 Jul',
                              '27 Jul',
                              '3 Aug',
                              '10 Aug',
                              '17 Aug',
                            ],
                            datasets: [
                              {
                                label: 'Instagram',
                                data: [980, 1040, 1120, 1080, 1260, 1310, 1420, 1580],
                                tension: 0.35,
                                fill: false,
                              },
                              {
                                label: 'TikTok',
                                data: [1420, 1380, 1610, 1720, 1690, 1880, 2040, 2310],
                                tension: 0.35,
                                fill: false,
                              },
                              {
                                label: 'YouTube',
                                data: [340, 360, 410, 395, 460, 505, 540, 610],
                                tension: 0.35,
                                fill: false,
                              },
                            ],
                          }}
                        />
                        <Cre8TextPassage slot="footer" size="small">
                          Reach in thousands. The 10 August step-up is the pantry reset series
                          crossing over from TikTok to Reels.
                        </Cre8TextPassage>
                      </Cre8Card>

                      <Cre8Grid variant="2up" gap="lg">
                        <Cre8GridItem fullHeight>
                          <Cre8Card fullHeight>
                            <Cre8Heading slot="header" tagVariant="h3" type="title-default">
                              Engagement by content pillar
                            </Cre8Heading>
                            <Cre8Chart
                              type="bar"
                              height={260}
                              showLegend={false}
                              ariaLabel="Average engagement rate by content pillar"
                              data={{
                                labels: ['Weeknight', 'Gear', 'Pantry', 'Baking', 'BTS'],
                                datasets: [
                                  {
                                    label: 'Avg. engagement rate (%)',
                                    data: [7.8, 6.9, 6.1, 5.4, 4.2],
                                  },
                                ],
                              }}
                            />
                          </Cre8Card>
                        </Cre8GridItem>

                        <Cre8GridItem fullHeight>
                          <Cre8Card fullHeight>
                            <Cre8Heading slot="header" tagVariant="h3" type="title-default">
                              Where the audience lives
                            </Cre8Heading>
                            <Cre8Chart
                              type="doughnut"
                              height={260}
                              showLegend
                              legendPosition="right"
                              ariaLabel="Followers by platform"
                              data={{
                                labels: ['Instagram', 'TikTok', 'YouTube', 'Newsletter'],
                                datasets: [{ label: 'Followers (thousands)', data: [612, 448, 154, 31] }],
                              }}
                            />
                          </Cre8Card>
                        </Cre8GridItem>
                      </Cre8Grid>

                      <Cre8Section headline="Platform health">
                        <Cre8TextLink slot="header" href="#platform-detail">
                          Open full platform report
                        </Cre8TextLink>
                        <Cre8Table variant="striped" behavior="responsive" isHoverable caption="Followers and 28-day growth by platform">
                          <Cre8TableHeader>
                            <Cre8TableRow>
                              <Cre8TableHeaderCell width="40%">Platform</Cre8TableHeaderCell>
                              <Cre8TableHeaderCell>Handle</Cre8TableHeaderCell>
                              <Cre8TableHeaderCell>Followers</Cre8TableHeaderCell>
                              <Cre8TableHeaderCell>Growth</Cre8TableHeaderCell>
                            </Cre8TableRow>
                          </Cre8TableHeader>
                          <Cre8TableBody>
                            {PLATFORMS.map((platform) => (
                              <Cre8TableRow key={platform.name}>
                                <Cre8TableCell dataHeader="Platform">{platform.name}</Cre8TableCell>
                                <Cre8TableCell dataHeader="Handle">{platform.handle}</Cre8TableCell>
                                <Cre8TableCell dataHeader="Followers">{platform.followers}</Cre8TableCell>
                                <Cre8TableCell dataHeader="Growth">
                                  <Cre8Badge text={platform.growth} status="success" variant="light" />
                                </Cre8TableCell>
                              </Cre8TableRow>
                            ))}
                          </Cre8TableBody>
                        </Cre8Table>
                      </Cre8Section>
                    </div>
                  </Cre8TabPanel>

                  {/* -------- Campaigns -------- */}
                  <Cre8TabPanel slot="panel">
                    <div style={stack('1.5rem')}>
                      <Cre8InlineAlert status="info" variant="subtle" fullWidth>
                        Five active brand deals worth $164,500. Two need something from you this
                        week.
                      </Cre8InlineAlert>

                      <Cre8Table
                        variant="striped"
                        behavior="responsive"
                        isHoverable
                        caption="Active brand deals, Q3 2026"
                      >
                        <Cre8TableHeader>
                          <Cre8TableRow>
                            <Cre8TableHeaderCell width="19%">Campaign</Cre8TableHeaderCell>
                            <Cre8TableHeaderCell width="15%">Brand</Cre8TableHeaderCell>
                            <Cre8TableHeaderCell width="16%">Channels</Cre8TableHeaderCell>
                            <Cre8TableHeaderCell width="10%">Delivered</Cre8TableHeaderCell>
                            <Cre8TableHeaderCell width="10%">Fee</Cre8TableHeaderCell>
                            <Cre8TableHeaderCell width="10%">Due</Cre8TableHeaderCell>
                            <Cre8TableHeaderCell width="20%">Status</Cre8TableHeaderCell>
                          </Cre8TableRow>
                        </Cre8TableHeader>
                        <Cre8TableBody>
                          {CAMPAIGNS.map((campaign) => (
                            <Cre8TableRow key={campaign.name}>
                              <Cre8TableCell dataHeader="Campaign">
                                <Cre8TextLink href={`#campaign-${campaign.brand.toLowerCase()}`}>
                                  {campaign.name}
                                </Cre8TextLink>
                              </Cre8TableCell>
                              <Cre8TableCell dataHeader="Brand">{campaign.brand}</Cre8TableCell>
                              <Cre8TableCell dataHeader="Channels">{campaign.channels}</Cre8TableCell>
                              <Cre8TableCell dataHeader="Delivered">{campaign.delivered}</Cre8TableCell>
                              <Cre8TableCell dataHeader="Fee">{campaign.fee}</Cre8TableCell>
                              <Cre8TableCell dataHeader="Due">{campaign.due}</Cre8TableCell>
                              <Cre8TableCell dataHeader="Status">
                                <Cre8Badge text={campaign.status} status={campaign.statusTone} />
                              </Cre8TableCell>
                            </Cre8TableRow>
                          ))}
                        </Cre8TableBody>
                      </Cre8Table>

                      <Cre8Card>
                        <Cre8Heading slot="header" tagVariant="h3" type="title-default">
                          Kettleworks — One-Pan Autumn
                        </Cre8Heading>
                        <div style={stack('1.25rem')}>
                          <Cre8TextPassage>
                            <p>
                              Five deliverables, $42,000, exclusivity in cookware through 31 October.
                              Two Reels and one long-form are cut; the hero video is in edit and the
                              brand review window closes on 1 September.
                            </p>
                          </Cre8TextPassage>
                          <Cre8ProgressSteps>
                            <Cre8ProgressStepsItem state="complete" name="Brief" message="Accepted 8 Jul" />
                            <Cre8ProgressStepsItem state="complete" name="Concepts" message="Approved 21 Jul" />
                            <Cre8ProgressStepsItem state="complete" name="Filming" message="Wrapped 12 Aug" />
                            <Cre8ProgressStepsItem state="current" name="Edit" message="Hero cut in progress" />
                            <Cre8ProgressStepsItem state="incomplete" name="Brand review" message="Opens 1 Sep" />
                            <Cre8ProgressStepsItem state="incomplete" name="Live" message="4 Sep" />
                          </Cre8ProgressSteps>
                        </div>
                        <Cre8ButtonGroup slot="footer">
                          <Cre8Button text="Open campaign" variant="secondary" size="sm" />
                          <Cre8Button text="Message brand" variant="tertiary" size="sm" />
                        </Cre8ButtonGroup>
                      </Cre8Card>
                    </div>
                  </Cre8TabPanel>

                  {/* -------- Content calendar -------- */}
                  <Cre8TabPanel slot="panel">
                    <div style={stack('1.5rem')}>
                      <Cre8Dropdown buttonText="Content pillar: all">
                        {PILLARS.map((pillar) => (
                          <Cre8DropdownItem key={pillar} ariaLabel={`Filter by ${pillar}`}>
                            {pillar}
                          </Cre8DropdownItem>
                        ))}
                      </Cre8Dropdown>

                      <Cre8Table
                        variant="striped"
                        behavior="responsive"
                        isHoverable
                        caption="Publishing schedule, week of 24 August 2026"
                      >
                        <Cre8TableHeader>
                          <Cre8TableRow>
                            <Cre8TableHeaderCell width="20%">Publishes</Cre8TableHeaderCell>
                            <Cre8TableHeaderCell width="14%">Format</Cre8TableHeaderCell>
                            <Cre8TableHeaderCell width="26%">Post</Cre8TableHeaderCell>
                            <Cre8TableHeaderCell width="24%">Campaign</Cre8TableHeaderCell>
                            <Cre8TableHeaderCell width="16%">Status</Cre8TableHeaderCell>
                          </Cre8TableRow>
                        </Cre8TableHeader>
                        <Cre8TableBody>
                          {SCHEDULE.map((post) => (
                            <Cre8TableRow key={post.title}>
                              <Cre8TableCell dataHeader="Publishes">{post.when}</Cre8TableCell>
                              <Cre8TableCell dataHeader="Format">{post.channel}</Cre8TableCell>
                              <Cre8TableCell dataHeader="Post">
                                <Cre8TextLink href="#post">{post.title}</Cre8TextLink>
                              </Cre8TableCell>
                              <Cre8TableCell dataHeader="Campaign">{post.campaign}</Cre8TableCell>
                              <Cre8TableCell dataHeader="Status">
                                <Cre8Badge text={post.status} status={post.statusTone} variant="light" />
                              </Cre8TableCell>
                            </Cre8TableRow>
                          ))}
                        </Cre8TableBody>
                      </Cre8Table>

                      <Cre8InlineAlert status="warning" variant="subtle" fullWidth>
                        Wednesday's newsletter is still a draft and the send window is 8:00 AM. It
                        needs a subject line and one hero image.
                      </Cre8InlineAlert>
                    </div>
                  </Cre8TabPanel>

                  {/* -------- Audience -------- */}
                  <Cre8TabPanel slot="panel">
                    <Cre8Grid variant="2up" gap="lg">
                      <Cre8GridItem fullHeight>
                        <Cre8Card fullHeight>
                          <Cre8Heading slot="header" tagVariant="h3" type="title-default">
                            Age
                          </Cre8Heading>
                          <div style={stack('1rem')}>
                            {AGE_SPLIT.map((band) => (
                              <Meter
                                key={band.label}
                                caption={`${band.label} — ${band.value}%`}
                                value={band.value}
                                max={100}
                                fieldId={`age-${band.label}`}
                              />
                            ))}
                          </div>
                          <Cre8TextPassage slot="footer" size="small">
                            Skews slightly older than a year ago; the newsletter is doing most of
                            that work.
                          </Cre8TextPassage>
                        </Cre8Card>
                      </Cre8GridItem>

                      <Cre8GridItem fullHeight>
                        <Cre8Card fullHeight>
                          <Cre8Heading slot="header" tagVariant="h3" type="title-default">
                            Top markets
                          </Cre8Heading>
                          <div style={stack('1rem')}>
                            {MARKETS.map((market) => (
                              <Meter
                                key={market.label}
                                caption={`${market.label} — ${market.value}%`}
                                value={market.value}
                                max={100}
                                fieldId={`market-${market.label}`}
                              />
                            ))}
                          </div>
                          <Cre8TextPassage slot="footer" size="small">
                            Remaining 23% spread across 40 markets. Nothing else clears 4%.
                          </Cre8TextPassage>
                        </Cre8Card>
                      </Cre8GridItem>

                      <Cre8GridItem fullHeight>
                        <Cre8Card fullHeight>
                          <Cre8Heading slot="header" tagVariant="h3" type="title-default">
                            When they are watching
                          </Cre8Heading>
                          <Cre8Chart
                            type="bar"
                            height={240}
                            showLegend={false}
                            ariaLabel="Share of audience online by hour of day"
                            data={{
                              labels: ['6a', '9a', '12p', '3p', '6p', '9p'],
                              datasets: [
                                { label: 'Share of audience online (%)', data: [8, 12, 19, 14, 27, 20] },
                              ],
                            }}
                          />
                          <Cre8TextPassage slot="footer" size="small">
                            The 6:30 PM slot is not a habit — it is where the curve peaks.
                          </Cre8TextPassage>
                        </Cre8Card>
                      </Cre8GridItem>

                      <Cre8GridItem fullHeight>
                        <Cre8Card fullHeight>
                          <Cre8Heading slot="header" tagVariant="h3" type="title-default">
                            Saves vs. shares
                          </Cre8Heading>
                          <Cre8Chart
                            type="line"
                            height={240}
                            showLegend
                            legendPosition="bottom"
                            ariaLabel="Saves and shares per thousand views over eight weeks"
                            data={{
                              labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
                              datasets: [
                                { label: 'Saves / 1K views', data: [41, 44, 46, 43, 52, 58, 61, 67], tension: 0.35, fill: false },
                                { label: 'Shares / 1K views', data: [18, 19, 22, 21, 24, 23, 27, 29], tension: 0.35, fill: false },
                              ],
                            }}
                          />
                          <Cre8TextPassage slot="footer" size="small">
                            Saves are the metric brands ask about in renewals. Quote 67 per thousand.
                          </Cre8TextPassage>
                        </Cre8Card>
                      </Cre8GridItem>
                    </Cre8Grid>
                  </Cre8TabPanel>
                </Cre8Tabs>
              </Cre8LayoutSection>

              {/* ---------------- sidebar ---------------- */}
              <Cre8LayoutSection behavior="sticky" top="1.5rem">
                <div style={stack('1.5rem')}>
                  <Cre8Card>
                    <Cre8Heading slot="header" tagVariant="h2" type="title-default">
                      Today
                    </Cre8Heading>
                    <Cre8List spacing="condensed">
                      {RUN_OF_SHOW.map((entry) => (
                        <Cre8ListItem key={entry.time}>
                          <Cre8Heading tagVariant="h3" type="meta-default">
                            {entry.time}
                          </Cre8Heading>
                          {entry.item}
                        </Cre8ListItem>
                      ))}
                    </Cre8List>
                    <Cre8Button
                      slot="footer"
                      text="Open full day"
                      variant="tertiary"
                      size="sm"
                      fullWidth
                    />
                  </Cre8Card>

                  <Cre8Card>
                    <Cre8Heading slot="header" tagVariant="h2" type="title-default">
                      Deliverables
                    </Cre8Heading>
                    <div style={stack('1rem')}>
                      {DELIVERABLES.map((deliverable) => (
                        <Meter
                          key={deliverable.label}
                          caption={`${deliverable.label} — ${deliverable.value} of ${deliverable.max}`}
                          value={deliverable.value}
                          max={deliverable.max}
                          status={deliverable.status}
                          fieldId={`deliverable-${deliverable.label}`}
                        />
                      ))}
                    </div>
                  </Cre8Card>

                  <Cre8Card>
                    <Cre8Heading slot="header" tagVariant="h2" type="title-default">
                      Money
                    </Cre8Heading>
                    <Cre8List variant="bare" spacing="condensed">
                      <Cre8ListItem>
                        Verdant Grocer · $18,500
                        <Cre8Badge text="Paid 19 Aug" status="success" variant="light" />
                      </Cre8ListItem>
                      <Cre8ListItem>
                        Hearthline Ovens · $27,000
                        <Cre8Badge text="Net 30 · due 20 Sep" status="info" variant="light" />
                      </Cre8ListItem>
                      <Cre8ListItem>
                        Kettleworks · $32,500
                        <Cre8Badge text="Overdue 6 days" status="error" variant="light" />
                      </Cre8ListItem>
                    </Cre8List>
                    <Cre8Button slot="footer" text="Chase invoices" variant="secondary" size="sm" fullWidth />
                  </Cre8Card>

                  <Cre8Card variant="bare">
                    <Cre8Heading slot="header" tagVariant="h2" type="title-small">
                      Jump to
                    </Cre8Heading>
                    <Cre8LinkList>
                      <Cre8LinkListItem href="#inbox">
                        Brand inbox
                        <Cre8Badge slot="itemAfter" text="7" status="attention" />
                      </Cre8LinkListItem>
                      <Cre8LinkListItem href="#pitches">
                        Outgoing pitches
                        <Cre8Badge slot="itemAfter" text="3" status="info" />
                      </Cre8LinkListItem>
                      <Cre8LinkListItem href="#assets">Asset library</Cre8LinkListItem>
                      <Cre8LinkListItem href="#rates">Rate card 2026</Cre8LinkListItem>
                      <Cre8LinkListItem href="#disclosures">Disclosure checker</Cre8LinkListItem>
                    </Cre8LinkList>
                  </Cre8Card>
                </div>
              </Cre8LayoutSection>
            </Cre8Layout>
          </div>
        </Cre8LayoutContainer>
      </Cre8Main>

      <Cre8Footer>
        <Cre8TextPassage size="small" inverted>
          <p>
            Innovexa Creator Studio · Priya Raghunathan (@priyamakes) · data synced 24 August 2026 at
            07:12
          </p>
        </Cre8TextPassage>
        <Cre8LinkList slot="bottom" behavior="horizontal" inverted>
          <Cre8LinkListItem href="#support">Support</Cre8LinkListItem>
          <Cre8LinkListItem href="#status">Platform status</Cre8LinkListItem>
          <Cre8LinkListItem href="#privacy">Privacy</Cre8LinkListItem>
        </Cre8LinkList>
      </Cre8Footer>
    </>
  );
}
