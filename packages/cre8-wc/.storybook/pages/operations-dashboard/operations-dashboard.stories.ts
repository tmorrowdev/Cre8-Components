import { html, render, type TemplateResult } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { classMap } from 'lit/directives/class-map.js';
import type { Meta, StoryObj } from '@storybook/web-components';

import '../../../components/layout-container/layout-container';
import '../../../components/heading/heading';
import '../../../components/text-passage/text-passage';
import '../../../components/button/button';
import '../../../components/button-group/button-group';
import '../../../components/badge/badge';
import '../../../components/card/card';
import '../../../components/grid/grid';
import '../../../components/grid-item/grid-item';
import '../../../components/chart/chart';
import '../../../components/table/table';
import '../../../components/table-header/table-header';
import '../../../components/table-header-cell/table-header-cell';
import '../../../components/table-body/table-body';
import '../../../components/table-row/table-row';
import '../../../components/table-cell/table-cell';
import '../../../components/tabs/tabs';
import '../../../components/tab/tab';
import '../../../components/tab-panel/tab-panel';
import '../../../components/skeleton-loader/skeleton-loader';
import '../../../components/progress-meter/progress-meter';
import '../../../components/inline-alert/inline-alert';
import '../../../components/divider/divider';
import '../../../components/select/select';

import { pageKitCss, pageRef, prefersReducedMotion, seeded } from '../_kit/page-kit';

type Story = StoryObj;

const meta = {
    title: 'Pages/Operations Dashboard',
    tags: ['autodocs', 'page'],
    parameters: {
        layout: 'fullscreen',
        controls: { hideNoControlsWarning: true },
        docs: {
            description: {
                component:
                    'An operations console wired to a simulated live feed, built to show **dynamic content** '
                    + 'driven through cre8 components rather than around them.\n\n'
                    + 'The page opens in a skeleton state, resolves after the first "fetch", then keeps moving: '
                    + 'KPI tiles flash as their values change, sparklines redraw from the same series, the '
                    + '`cre8-chart` window slides one bucket at a time, an event feed prepends new rows, and the '
                    + 'fleet table re-sorts itself as node health drifts. **Pause stream** freezes every timer at '
                    + 'once so the layout can be inspected.\n\n'
                    + 'Chart colours are read back from the active brand with `getComputedStyle`, so switching '
                    + 'theme in the toolbar restyles the canvas too — Chart.js cannot resolve a CSS custom '
                    + 'property on its own, and hardcoding hex here would have quietly broken theming.',
            },
        },
    },
} satisfies Meta;

export default meta;

const pageCss = `
${pageKitCss}

.ops { background: var(--cre8-color-bg-subtle); min-block-size: 100vh; padding-block-end: var(--cre8-spacing-64); }

.ops-topbar {
    position: sticky;
    inset-block-start: 0;
    z-index: 5;
    background: var(--cre8-color-bg-default);
    border-block-end: 1px solid var(--cre8-color-border-default);
    padding-block: var(--cre8-spacing-16);
    backdrop-filter: blur(8px);
}
.ops-topbar__inner {
    display: flex;
    flex-wrap: wrap;
    gap: var(--cre8-spacing-16);
    align-items: center;
    justify-content: space-between;
}
.ops-topbar__meta { display: flex; align-items: center; gap: var(--cre8-spacing-12); flex-wrap: wrap; }

.ops-live {
    display: inline-flex;
    align-items: center;
    gap: var(--cre8-spacing-8);
    font-size: 0.8125rem;
    color: var(--cre8-color-content-subtle);
    font-variant-numeric: tabular-nums;
}
.ops-live__dot {
    inline-size: 0.5rem;
    block-size: 0.5rem;
    border-radius: var(--cre8-border-radius-round);
    background: var(--cre8-color-bg-success-strong);
    animation: cre8-kit-pulse 2s ease-out infinite;
}
.ops.is-paused .ops-live__dot { animation: none; background: var(--cre8-color-bg-warning-strong); }

.ops-body { padding-block-start: var(--cre8-spacing-32); display: grid; gap: var(--cre8-spacing-24); }

/* ---------- KPI tiles ---------- */
.ops-kpis { display: grid; gap: var(--cre8-spacing-16); grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); }
.ops-kpi__head { display: flex; align-items: start; justify-content: space-between; gap: var(--cre8-spacing-8); }
.ops-kpi__label { font-size: 0.8125rem; color: var(--cre8-color-content-subtle); letter-spacing: 0.02em; }
.ops-kpi__value {
    display: block;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.15;
    font-variant-numeric: tabular-nums;
    color: var(--cre8-color-content-default);
    margin-block: var(--cre8-spacing-4) var(--cre8-spacing-8);
    border-radius: var(--cre8-border-radius-small);
}
.ops-kpi.is-flash .ops-kpi__value { animation: ops-flash 720ms ease-out; }
@keyframes ops-flash {
    0% { background: var(--cre8-color-bg-brand); box-shadow: 0 0 0 6px var(--cre8-color-bg-brand); }
    100% { background: transparent; box-shadow: 0 0 0 6px transparent; }
}
.ops-kpi__foot { display: flex; align-items: center; justify-content: space-between; gap: var(--cre8-spacing-8); }
.ops-delta { font-size: 0.8125rem; font-weight: 600; font-variant-numeric: tabular-nums; }
.ops-delta--up { color: var(--cre8-color-content-success); }
.ops-delta--down { color: var(--cre8-color-content-error); }
.ops-spark { display: block; overflow: visible; }
.ops-spark path { transition: d 600ms cubic-bezier(0.16, 1, 0.3, 1); }

/* ---------- main split ---------- */
.ops-split { display: grid; gap: var(--cre8-spacing-24); grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); }
@media (max-width: 64rem) { .ops-split { grid-template-columns: minmax(0, 1fr); } }

.ops-card-head { display: flex; align-items: center; justify-content: space-between; gap: var(--cre8-spacing-12); flex-wrap: wrap; }

/* ---------- event feed ---------- */
.ops-feed { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--cre8-spacing-4); max-block-size: 24rem; overflow: hidden; }
.ops-feed__item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: var(--cre8-spacing-12);
    align-items: center;
    padding-block: var(--cre8-spacing-12);
    border-block-end: 1px solid var(--cre8-color-border-default);
    animation: cre8-kit-slide-in 420ms cubic-bezier(0.16, 1, 0.3, 1);
}
.ops-feed__item:last-child { border-block-end: 0; }
.ops-feed__dot { inline-size: 0.5rem; block-size: 0.5rem; border-radius: var(--cre8-border-radius-round); }
.ops-feed__dot--success { background: var(--cre8-color-bg-success-strong); }
.ops-feed__dot--warning { background: var(--cre8-color-bg-warning-strong); }
.ops-feed__dot--error { background: var(--cre8-color-bg-error-strong); }
.ops-feed__dot--info { background: var(--cre8-color-bg-info-strong); }
.ops-feed__text { font-size: 0.875rem; color: var(--cre8-color-content-default); }
.ops-feed__time { font-size: 0.75rem; color: var(--cre8-color-content-subtle); font-variant-numeric: tabular-nums; white-space: nowrap; }

/* ---------- capacity ---------- */
.ops-capacity { display: grid; gap: var(--cre8-spacing-24); }
.ops-capacity__row { display: grid; gap: var(--cre8-spacing-8); }
.ops-capacity__label { display: flex; justify-content: space-between; font-size: 0.875rem; }
.ops-capacity__label b { font-variant-numeric: tabular-nums; }

/* ---------- table ---------- */
.ops-node { display: flex; align-items: center; gap: var(--cre8-spacing-8); }
.ops-node__id { font-variant-numeric: tabular-nums; color: var(--cre8-color-content-subtle); font-size: 0.8125rem; }
.ops-num { font-variant-numeric: tabular-nums; }

/* ---------- loading swap ---------- */
.ops-skeleton { display: grid; gap: var(--cre8-spacing-12); }
/* Both toggled regions are the KPI grid, so name the display value
   explicitly. A "revert" here drops to the UA default (block) and
   silently destroys the grid -- which is what it did the first time. */
.ops [data-when] { display: none; }
.ops:not(.is-ready) [data-when='loading'] { display: grid; }
.ops.is-ready [data-when='ready'] { display: grid; }
`;

/* ------------------------------------------------------------------ */
/* Simulated telemetry                                                 */
/* ------------------------------------------------------------------ */

interface Kpi {
    id: string;
    label: string;
    unit: string;
    decimals: number;
    series: number[];
    /** Higher is better — decides whether a rising delta reads as good or bad. */
    upIsGood: boolean;
}

interface FeedEvent {
    id: number;
    tone: 'success' | 'warning' | 'error' | 'info';
    text: string;
    at: Date;
}

interface NodeRow {
    id: string;
    region: string;
    load: number;
    latency: number;
    uptime: number;
}

const REGIONS = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-south-1', 'sa-east-1'];

const EVENT_TEMPLATES: Array<{ tone: FeedEvent['tone']; text: (n: string) => string }> = [
    { tone: 'success', text: (n) => `Deployment ${n} rolled out to 100% of traffic` },
    { tone: 'info', text: (n) => `Autoscaler added 2 replicas in ${n}` },
    { tone: 'warning', text: (n) => `p99 latency above threshold on ${n}` },
    { tone: 'success', text: (n) => `Health check recovered on ${n}` },
    { tone: 'error', text: (n) => `Connection pool saturated on ${n}` },
    { tone: 'info', text: (n) => `Cache warmed for ${n}` },
    { tone: 'success', text: (n) => `Backup completed for ${n}` },
];

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const buildInitialState = () => {
    const rand = seeded(20260920);
    const walk = (start: number, spread: number, length = 24) => {
        let current = start;
        return Array.from({ length }, () => {
            current = current + (rand() - 0.5) * spread;
            return current;
        });
    };

    const kpis: Kpi[] = [
        { id: 'rps', label: 'Requests / sec', unit: '', decimals: 0, upIsGood: true, series: walk(8400, 900) },
        { id: 'p99', label: 'p99 latency', unit: 'ms', decimals: 0, upIsGood: false, series: walk(184, 44) },
        { id: 'err', label: 'Error rate', unit: '%', decimals: 2, upIsGood: false, series: walk(0.42, 0.22) },
        { id: 'sat', label: 'Fleet saturation', unit: '%', decimals: 1, upIsGood: false, series: walk(63, 9) },
    ];

    const nodes: NodeRow[] = Array.from({ length: 7 }, (_, index) => ({
        id: `node-${String(index + 1).padStart(2, '0')}`,
        region: REGIONS[index % REGIONS.length],
        load: clamp(30 + rand() * 60, 4, 99),
        latency: clamp(90 + rand() * 210, 40, 900),
        uptime: clamp(99.2 + rand() * 0.79, 95, 100),
    }));

    const now = Date.now();
    const feed: FeedEvent[] = Array.from({ length: 5 }, (_, index) => {
        const template = EVENT_TEMPLATES[index % EVENT_TEMPLATES.length];
        return {
            id: index,
            tone: template.tone,
            text: template.text(REGIONS[index % REGIONS.length]),
            at: new Date(now - (index + 1) * 47_000),
        };
    });

    const throughput = walk(8400, 700, 18);
    const errors = walk(120, 70, 18).map((n) => clamp(n, 10, 400));

    return { kpis, nodes, feed, throughput, errors, rand, nextEventId: feed.length };
};

/* ------------------------------------------------------------------ */
/* Templates                                                           */
/* ------------------------------------------------------------------ */

const formatValue = (kpi: Kpi): string => {
    const value = kpi.series[kpi.series.length - 1];
    return `${value.toLocaleString('en-US', {
        minimumFractionDigits: kpi.decimals,
        maximumFractionDigits: kpi.decimals,
    })}${kpi.unit}`;
};

/** Normalises a series into an SVG path so the sparkline scales to its own range. */
const sparkPath = (series: number[], width = 120, height = 34): string => {
    const min = Math.min(...series);
    const max = Math.max(...series);
    const span = max - min || 1;
    return series
        .map((value, index) => {
            const x = (index / (series.length - 1)) * width;
            const y = height - ((value - min) / span) * height;
            return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(' ');
};

const kpiTemplate = (kpis: Kpi[], stroke: string): TemplateResult => html`
    ${kpis.map((kpi) => {
        const series = kpi.series;
        const previous = series[series.length - 2] ?? series[series.length - 1];
        const current = series[series.length - 1];
        const deltaPct = previous === 0 ? 0 : ((current - previous) / Math.abs(previous)) * 100;
        const rising = deltaPct >= 0;
        const good = rising === kpi.upIsGood;
        return html`
            <div class="ops-kpi" data-kpi="${kpi.id}">
                <cre8-card fullHeight>
                    <div class="ops-kpi__head">
                        <span class="ops-kpi__label">${kpi.label}</span>
                        <cre8-badge
                            text="${good ? 'healthy' : 'watch'}"
                            status="${good ? 'success' : 'warning'}"
                        ></cre8-badge>
                    </div>
                    <span class="ops-kpi__value">${formatValue(kpi)}</span>
                    <div class="ops-kpi__foot">
                        <span class="ops-delta ${rising ? 'ops-delta--up' : 'ops-delta--down'}">
                            ${rising ? '▲' : '▼'} ${Math.abs(deltaPct).toFixed(1)}%
                        </span>
                        <svg class="ops-spark" width="120" height="34" viewBox="0 0 120 34" aria-hidden="true">
                            <path
                                d="${sparkPath(series.slice(-16))}"
                                fill="none"
                                stroke="${stroke}"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </svg>
                    </div>
                </cre8-card>
            </div>
        `;
    })}
`;

const feedTemplate = (events: FeedEvent[]): TemplateResult => html`
    ${events.map(
        (event) => html`
            <li class="ops-feed__item" data-event-id="${event.id}">
                <span class="ops-feed__dot ops-feed__dot--${event.tone}"></span>
                <span class="ops-feed__text">${event.text}</span>
                <span class="ops-feed__time">
                    ${event.at.toLocaleTimeString('en-US', { hour12: false })}
                </span>
            </li>
        `,
    )}
`;

const nodeStatus = (node: NodeRow): { label: string; status: 'success' | 'warning' | 'error' } => {
    if (node.load > 88 || node.latency > 600) return { label: 'degraded', status: 'error' };
    if (node.load > 72 || node.latency > 380) return { label: 'elevated', status: 'warning' };
    return { label: 'nominal', status: 'success' };
};

const rowsTemplate = (nodes: NodeRow[]): TemplateResult => html`
    ${nodes.map((node) => {
        const status = nodeStatus(node);
        return html`
            <cre8-table-row>
                <cre8-table-cell dataHeader="Node">
                    <span class="ops-node">
                        <strong>${node.id}</strong>
                        <span class="ops-node__id">${node.region}</span>
                    </span>
                </cre8-table-cell>
                <cre8-table-cell dataHeader="Status">
                    <cre8-badge text="${status.label}" status="${status.status}"></cre8-badge>
                </cre8-table-cell>
                <cre8-table-cell dataHeader="Load">
                    <span class="ops-num">${node.load.toFixed(0)}%</span>
                </cre8-table-cell>
                <cre8-table-cell dataHeader="p99">
                    <span class="ops-num">${node.latency.toFixed(0)} ms</span>
                </cre8-table-cell>
                <cre8-table-cell dataHeader="Uptime">
                    <span class="ops-num">${node.uptime.toFixed(2)}%</span>
                </cre8-table-cell>
            </cre8-table-row>
        `;
    })}
`;

const capacityTemplate = (nodes: NodeRow[]): TemplateResult => {
    const byRegion = REGIONS.map((region) => {
        const members = nodes.filter((node) => node.region === region);
        const load = members.length
            ? members.reduce((sum, node) => sum + node.load, 0) / members.length
            : 0;
        return { region, load };
    }).filter((entry) => entry.load > 0);

    return html`
        ${byRegion.map(
            (entry) => html`
                <div class="ops-capacity__row">
                    <span class="ops-capacity__label">
                        <span>${entry.region}</span><b>${entry.load.toFixed(0)}%</b>
                    </span>
                    <cre8-progress-meter
                        label="${entry.region} utilisation"
                        .value=${Math.round(entry.load)}
                        .max=${100}
                        status="${entry.load > 85 ? 'error' : entry.load > 70 ? 'warning' : 'success'}"
                    ></cre8-progress-meter>
                </div>
            `,
        )}
    `;
};

/* ------------------------------------------------------------------ */
/* Story                                                               */
/* ------------------------------------------------------------------ */

// cre8-select inherits value = '' from Cre8FormElement and never selects a
// default, leaving the control blank (reproducible in its own story). Giving
// the intended default an empty value makes it the one the browser selects.
const TIME_RANGES = [
    { label: 'Last hour', value: '' },
    { label: 'Last 15 minutes', value: '15m' },
    { label: 'Last 24 hours', value: '24h' },
];

const mountDashboard = (root: HTMLElement): (() => void) => {
    const state = buildInitialState();
    let paused = prefersReducedMotion();

    const readToken = (token: string, fallback: string): string => {
        const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
        return value || fallback;
    };

    const kpiHost = root.querySelector<HTMLElement>('[data-region="kpis"]')!;
    const feedHost = root.querySelector<HTMLElement>('[data-region="feed"]')!;
    const rowsHost = root.querySelector<HTMLElement>('[data-region="rows"]')!;
    const capacityHost = root.querySelector<HTMLElement>('[data-region="capacity"]')!;
    const chartEl = root.querySelector<HTMLElement & { data: unknown; loading: boolean }>('cre8-chart')!;
    const clockEl = root.querySelector<HTMLElement>('[data-region="clock"]')!;
    const pauseBtn = root.querySelector<HTMLElement & { text: string }>('[data-action="pause"]')!;

    const paintChart = () => {
        const brand = readToken('--cre8-color-bg-brand-strong', '#3b5bdb');
        const warn = readToken('--cre8-color-bg-warning-strong', '#e8590c');
        const labels = state.throughput.map((_, index) => `T-${state.throughput.length - index}`);
        chartEl.data = {
            labels,
            datasets: [
                {
                    label: 'Requests / sec',
                    data: [...state.throughput],
                    yAxisID: 'y',
                    borderColor: brand,
                    backgroundColor: `${brand}22`,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.38,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                },
                {
                    label: 'Errors / min',
                    data: [...state.errors],
                    yAxisID: 'y1',
                    borderColor: warn,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 4],
                    fill: false,
                    tension: 0.38,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                },
            ],
        };
    };

    const paint = () => {
        const stroke = readToken('--cre8-color-bg-brand-strong', '#3b5bdb');
        render(kpiTemplate(state.kpis, stroke), kpiHost);
        render(feedTemplate(state.feed), feedHost);
        render(rowsTemplate(state.nodes), rowsHost);
        render(capacityTemplate(state.nodes), capacityHost);
        clockEl.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
    };

    /** One telemetry tick: advance every series, then repaint. */
    const tick = () => {
        if (paused) return;

        state.kpis.forEach((kpi) => {
            const last = kpi.series[kpi.series.length - 1];
            const drift = (state.rand() - 0.5) * (kpi.decimals === 2 ? 0.16 : last * 0.05);
            kpi.series = [...kpi.series.slice(1), Math.max(0, last + drift)];
        });

        state.throughput = [
            ...state.throughput.slice(1),
            clamp(state.throughput[state.throughput.length - 1] + (state.rand() - 0.5) * 700, 5200, 12500),
        ];
        state.errors = [
            ...state.errors.slice(1),
            clamp(state.errors[state.errors.length - 1] + (state.rand() - 0.5) * 80, 10, 420),
        ];

        state.nodes = state.nodes
            .map((node) => ({
                ...node,
                load: clamp(node.load + (state.rand() - 0.5) * 12, 4, 99),
                latency: clamp(node.latency + (state.rand() - 0.5) * 90, 40, 900),
            }))
            // Worst nodes float to the top — the table re-sorts itself as health drifts.
            .sort((a, b) => b.load - a.load);

        paint();
        paintChart();

        // Flash only the tiles whose displayed value actually moved.
        root.querySelectorAll<HTMLElement>('.ops-kpi').forEach((tile) => {
            tile.classList.add('is-flash');
            window.setTimeout(() => tile.classList.remove('is-flash'), 740);
        });
    };

    const pushEvent = () => {
        if (paused) return;
        const template = EVENT_TEMPLATES[Math.floor(state.rand() * EVENT_TEMPLATES.length)];
        const region = REGIONS[Math.floor(state.rand() * REGIONS.length)];
        state.feed = [
            { id: state.nextEventId++, tone: template.tone, text: template.text(region), at: new Date() },
            ...state.feed,
        ].slice(0, 6);
        render(feedTemplate(state.feed), feedHost);
    };

    const onPause = () => {
        paused = !paused;
        pauseBtn.text = paused ? 'Resume stream' : 'Pause stream';
        root.classList.toggle('is-paused', paused);
    };
    pauseBtn.addEventListener('click', onPause);

    // First paint, then a short "fetch" so the skeleton state is visible.
    paint();
    const readyTimer = window.setTimeout(() => {
        root.classList.add('is-ready');
        chartEl.loading = false;
        paintChart();
    }, 900);

    if (paused) {
        pauseBtn.text = 'Resume stream';
        root.classList.add('is-paused');
    }

    const tickTimer = window.setInterval(tick, 2600);
    const feedTimer = window.setInterval(pushEvent, 3400);

    return () => {
        window.clearTimeout(readyTimer);
        window.clearInterval(tickTimer);
        window.clearInterval(feedTimer);
        pauseBtn.removeEventListener('click', onPause);
    };
};

export const Default: Story = {
    name: 'Operations Dashboard',
    render: () => html`
        <div class="ops" ${ref(pageRef(mountDashboard))}>
            <style>${pageCss}</style>

            <!-- ============ TOP BAR ============ -->
            <div class="ops-topbar">
                <cre8-layout-container>
                    <div class="ops-topbar__inner">
                        <div>
                            <cre8-heading tagVariant="h1" type="title-large">Fleet operations</cre8-heading>
                            <span class="ops-live">
                                <span class="ops-live__dot"></span>
                                Streaming · last update <span data-region="clock">--:--:--</span>
                            </span>
                        </div>
                        <div class="ops-topbar__meta">
                            <cre8-select
                                label="Range"
                                fieldId="ops-range"
                                .items=${TIME_RANGES}
                            ></cre8-select>
                            <cre8-button
                                data-action="pause"
                                text="Pause stream"
                                variant="secondary"
                            ></cre8-button>
                            <cre8-button text="Export" variant="tertiary"></cre8-button>
                        </div>
                    </div>
                </cre8-layout-container>
            </div>

            <cre8-layout-container>
                <div class="ops-body">
                    <cre8-inline-alert status="warning" fullWidth>
                        Two nodes in <strong>ap-south-1</strong> are above the latency budget. Autoscaling is engaged.
                    </cre8-inline-alert>

                    <!-- ============ KPI ROW ============ -->
                    <div data-when="loading" class="ops-kpis">
                        ${Array.from({ length: 4 }).map(
        () => html`
                                <cre8-card>
                                    <div class="ops-skeleton">
                                        <cre8-skeleton-loader height="0.75rem" width="55%"></cre8-skeleton-loader>
                                        <cre8-skeleton-loader height="2rem" width="70%"></cre8-skeleton-loader>
                                        <cre8-skeleton-loader height="2.125rem"></cre8-skeleton-loader>
                                    </div>
                                </cre8-card>
                            `,
    )}
                    </div>
                    <div data-when="ready" class="ops-kpis" data-region="kpis"></div>

                    <!-- ============ CHART + FEED ============ -->
                    <div class="ops-split">
                        <cre8-card fullHeight>
                            <div class="ops-card-head" slot="header">
                                <cre8-heading tagVariant="h2" type="title-default">Throughput vs. errors</cre8-heading>
                                <cre8-badge text="live" status="info"></cre8-badge>
                            </div>
                            <cre8-chart
                                type="line"
                                loading
                                height="320"
                                aria-label="Requests per second plotted against errors per minute"
                                legend-position="bottom"
                                .options=${{
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        animation: { duration: 650, easing: 'easeOutQuart' },
        scales: {
            y: {
                type: 'linear',
                position: 'left',
                beginAtZero: false,
                title: { display: true, text: 'requests / sec' },
            },
            // Errors are two orders of magnitude smaller than throughput; on a
            // shared axis they render as a flat line pinned to zero.
            y1: {
                type: 'linear',
                position: 'right',
                beginAtZero: true,
                grid: { drawOnChartArea: false },
                title: { display: true, text: 'errors / min' },
            },
            x: { grid: { display: false } },
        },
    }}
                            ></cre8-chart>
                        </cre8-card>

                        <cre8-card fullHeight>
                            <div class="ops-card-head" slot="header">
                                <cre8-heading tagVariant="h2" type="title-default">Event stream</cre8-heading>
                            </div>
                            <ul class="ops-feed" data-region="feed"></ul>
                        </cre8-card>
                    </div>

                    <!-- ============ TABS: FLEET + CAPACITY ============ -->
                    <cre8-card>
                        <cre8-tabs>
                            <cre8-tab>Fleet</cre8-tab>
                            <cre8-tab>Capacity</cre8-tab>

                            <cre8-tab-panel slot="panel">
                                <cre8-table behavior="responsive" variant="striped" isHoverable
                                            caption="Node health, re-sorted by load on every tick">
                                    <cre8-table-header>
                                        <cre8-table-row>
                                            <cre8-table-header-cell width="28%">Node</cre8-table-header-cell>
                                            <cre8-table-header-cell>Status</cre8-table-header-cell>
                                            <cre8-table-header-cell>Load</cre8-table-header-cell>
                                            <cre8-table-header-cell>p99</cre8-table-header-cell>
                                            <cre8-table-header-cell>Uptime</cre8-table-header-cell>
                                        </cre8-table-row>
                                    </cre8-table-header>
                                    <cre8-table-body data-region="rows"></cre8-table-body>
                                </cre8-table>
                            </cre8-tab-panel>

                            <cre8-tab-panel slot="panel">
                                <div class="ops-capacity" data-region="capacity"></div>
                            </cre8-tab-panel>
                        </cre8-tabs>
                    </cre8-card>
                </div>
            </cre8-layout-container>
        </div>
    `,
};
