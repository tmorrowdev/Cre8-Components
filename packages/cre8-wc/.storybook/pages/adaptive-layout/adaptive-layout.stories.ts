import { html } from 'lit';
import { ref } from 'lit/directives/ref.js';
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
import '../../../components/container/container';
import '../../../components/table/table';
import '../../../components/table-header/table-header';
import '../../../components/table-header-cell/table-header-cell';
import '../../../components/table-body/table-body';
import '../../../components/table-row/table-row';
import '../../../components/table-cell/table-cell';
import '../../../components/inline-alert/inline-alert';
import '../../../components/divider/divider';
import '../../../components/accordion/accordion';
import '../../../components/accordion-item/accordion-item';

import { mountPage, pageKitCss, pageRef } from '../_kit/page-kit';

type Story = StoryObj;

const meta = {
    title: 'Pages/Adaptive Layout',
    tags: ['autodocs', 'page'],
    parameters: {
        layout: 'fullscreen',
        controls: { hideNoControlsWarning: true },
        docs: {
            description: {
                component:
                    'A working demonstration of **responsive layout** in cre8 — and specifically of the '
                    + 'difference between responding to the *viewport* and responding to the *container*.\n\n'
                    + 'The Resize Lab has a drag handle on its lower-right corner. Drag it and the readout '
                    + 'reports the panel\'s measured width and the **actual** column count, read back from '
                    + '`getComputedStyle().gridTemplateColumns` rather than from an assumed breakpoint table. '
                    + 'The side-by-side comparison below puts `cre8-grid` (`@media`, keyed to the browser) next '
                    + 'to an `@container` grid (keyed to its own width) in identically narrow columns — on a wide '
                    + 'screen only one of them adapts.\n\n'
                    + '> **Note:** these demos author their own `@container` rules rather than using '
                    + '`cre8-container-grid`. That component declares `container-type` on the same element its '
                    + '`@container` rules target, so the rules never match and it stays single-column at every '
                    + 'width — reproducible in its own `FourUp` story.\n\n'
                    + 'Also shown: a table that restructures into stacked records at narrow widths, and a type '
                    + 'scale that interpolates fluidly with a live `font-size` readout.',
            },
        },
    },
} satisfies Meta;

export default meta;

/** The `@container` breakpoints `cre8-container-grid` actually ships. */
const BREAKPOINTS = [560, 768, 960, 1200, 1400];

const pageCss = `
${pageKitCss}

/* Pre-reveal transforms translate items +/-28px horizontally, which pushed
   the right-hand comparison column past the viewport at 390px. Clip bounds
   that without creating a scroll container; overflow-x hidden would create
   one, and that changes how the sticky header resolves. */
.ad { background: var(--cre8-color-bg-default); overflow-x: clip; }

/* ---------- responsive header ---------- */
.ad-header {
    position: sticky;
    inset-block-start: 0;
    z-index: 6;
    background: var(--cre8-color-bg-default);
    border-block-end: 1px solid var(--cre8-color-border-default);
}
.ad-header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--cre8-spacing-16);
    padding-block: var(--cre8-spacing-12);
}
.ad-brand { display: flex; align-items: center; gap: var(--cre8-spacing-8); font-weight: 700; letter-spacing: -0.01em; }
.ad-brand__mark {
    inline-size: 1.75rem;
    block-size: 1.75rem;
    border-radius: var(--cre8-border-radius-container);
    background: var(--cre8-color-bg-brand-strong);
}
.ad-nav { display: flex; align-items: center; gap: var(--cre8-spacing-24); }
.ad-nav a {
    color: var(--cre8-color-content-default);
    text-decoration: none;
    font-size: 0.9375rem;
    padding-block: var(--cre8-spacing-4);
    border-block-end: 2px solid transparent;
    transition: border-color 200ms ease, color 200ms ease;
}
.ad-nav a:hover { color: var(--cre8-color-content-brand); border-block-end-color: var(--cre8-color-border-brand); }

/* Below 48rem the inline nav is replaced by a disclosure. No JS required. */
.ad-menu { display: none; }
.ad-menu > summary {
    list-style: none;
    cursor: pointer;
    padding: var(--cre8-spacing-8) var(--cre8-spacing-12);
    border: 1px solid var(--cre8-color-border-default);
    border-radius: var(--cre8-border-radius-button);
}
.ad-menu > summary::-webkit-details-marker { display: none; }
.ad-menu__panel {
    position: absolute;
    inset-inline: var(--cre8-spacing-16);
    margin-block-start: var(--cre8-spacing-8);
    display: grid;
    gap: var(--cre8-spacing-4);
    padding: var(--cre8-spacing-16);
    background: var(--cre8-color-bg-default);
    border: 1px solid var(--cre8-color-border-default);
    border-radius: var(--cre8-border-radius-container);
    box-shadow: 0 18px 40px -20px rgb(0 0 0 / 40%);
    animation: cre8-kit-slide-in 220ms ease-out;
}
@media (width < 48rem) {
    .ad-nav { display: none; }
    .ad-menu { display: block; }
}

/* ---------- sections ---------- */
.ad-section { display: block; padding-block: clamp(var(--cre8-spacing-40), 6vw, var(--cre8-spacing-80)); }
.ad-section--tint { background: var(--cre8-color-bg-subtle); }
.ad-section__head { max-inline-size: 42rem; display: grid; gap: var(--cre8-spacing-12); margin-block-end: var(--cre8-spacing-32); }

/* ---------- resize lab ---------- */
.ad-lab { display: grid; gap: var(--cre8-spacing-16); }
.ad-lab__readout {
    display: flex;
    flex-wrap: wrap;
    gap: var(--cre8-spacing-8) var(--cre8-spacing-24);
    align-items: center;
    padding: var(--cre8-spacing-12) var(--cre8-spacing-16);
    border-radius: var(--cre8-border-radius-container);
    background: var(--cre8-color-bg-default);
    border: 1px solid var(--cre8-color-border-default);
    font-variant-numeric: tabular-nums;
    font-size: 0.875rem;
}
.ad-lab__readout b { color: var(--cre8-color-content-brand); font-size: 1rem; }

/* The native resize affordance is the whole interaction — no drag code needed. */
.ad-resizer {
    resize: horizontal;
    overflow: auto;
    inline-size: min(100%, 52rem);
    min-inline-size: 17rem;
    max-inline-size: 100%;
    padding: var(--cre8-spacing-16);
    border: 2px dashed var(--cre8-color-border-brand);
    border-radius: var(--cre8-border-radius-container);
    background: var(--cre8-color-bg-default);
}
.ad-resizer::-webkit-resizer { background: var(--cre8-color-bg-brand-strong); }

/* The container context. cre8-container-grid declares container-type on the
   same element its own @container rules target, so those rules can never
   match (verified in that component's FourUp story: flex-direction stays
   "column" even at 1300px). Establishing the context on a wrapper and
   querying it from the child is the arrangement that actually works. */
.ad-stage {
    container-type: inline-size;
    container-name: lab;
}
.ad-cq-grid {
    display: grid;
    gap: var(--cre8-spacing-12);
    grid-template-columns: 1fr;
}
@container lab (min-width: 560px) { .ad-cq-grid { grid-template-columns: repeat(2, 1fr); } }
@container lab (min-width: 960px) { .ad-cq-grid { grid-template-columns: repeat(3, 1fr); } }
@container lab (min-width: 1200px) { .ad-cq-grid { grid-template-columns: repeat(4, 1fr); } }

.ad-tile {
    display: grid;
    gap: var(--cre8-spacing-4);
    padding: var(--cre8-spacing-16);
    border-radius: var(--cre8-border-radius-container);
    background: var(--cre8-color-bg-brand);
    border: 1px solid var(--cre8-color-border-brand-subtle);
    color: var(--cre8-color-content-brand-strong);
    min-block-size: 5rem;
    align-content: center;
}
.ad-tile b { font-size: 1.125rem; }
.ad-tile span { font-size: 0.8125rem; opacity: 0.8; }

/* ---------- comparison ---------- */
/* min() on the track floor: a bare minmax(17rem, ...) cannot shrink below
   272px, so on a 390px screen the column overflowed the page by 12px. */
.ad-compare {
    display: grid;
    gap: var(--cre8-spacing-24);
    grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 26rem));
    justify-content: start;
}
.ad-compare__col { display: grid; gap: var(--cre8-spacing-12); align-content: start; }
.ad-compare__frame {
    padding: var(--cre8-spacing-16);
    border: 1px solid var(--cre8-color-border-default);
    border-radius: var(--cre8-border-radius-container);
    background: var(--cre8-color-bg-default);
}
.ad-compare__note { font-size: 0.8125rem; color: var(--cre8-color-content-subtle); }

/* ---------- breakpoint ruler ---------- */
.ad-ruler { display: grid; gap: var(--cre8-spacing-8); }
.ad-ruler__track {
    position: relative;
    block-size: 2.5rem;
    border-radius: var(--cre8-border-radius-container);
    background: var(--cre8-color-bg-moderate);
    overflow: hidden;
}
.ad-ruler__fill {
    position: absolute;
    inset-block: 0;
    inset-inline-start: 0;
    background: var(--cre8-color-bg-brand-strong);
    inline-size: 0;
    transition: inline-size 240ms cubic-bezier(0.16, 1, 0.3, 1);
}
.ad-ruler__marks { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--cre8-color-content-subtle); font-variant-numeric: tabular-nums; }

/* ---------- fluid type ---------- */
.ad-type { display: grid; gap: var(--cre8-spacing-16); }
.ad-type__row { display: flex; align-items: baseline; justify-content: space-between; gap: var(--cre8-spacing-16); border-block-end: 1px solid var(--cre8-color-border-default); padding-block-end: var(--cre8-spacing-12); }
.ad-type__sample { font-weight: 650; line-height: 1.1; }
.ad-type__sample--display { font-size: clamp(2rem, 1.2rem + 4vw, 4.5rem); }
.ad-type__sample--headline { font-size: clamp(1.5rem, 1.1rem + 2vw, 2.5rem); }
.ad-type__sample--title { font-size: clamp(1.125rem, 1rem + 0.8vw, 1.5rem); }
.ad-type__size { font-size: 0.8125rem; color: var(--cre8-color-content-subtle); font-variant-numeric: tabular-nums; white-space: nowrap; }
`;

const TILES = [
    { title: 'Coverage', meta: 'Policy summary' },
    { title: 'Claims', meta: '3 open' },
    { title: 'Billing', meta: 'Due in 12 days' },
    { title: 'Documents', meta: '18 files' },
    { title: 'Providers', meta: 'In network' },
    { title: 'Messages', meta: '2 unread' },
    { title: 'Benefits', meta: 'Updated' },
    { title: 'Support', meta: '24/7' },
];

const PLANS = [
    { plan: 'Essential', tier: 'Bronze', premium: '$182', deductible: '$3,500', network: 'Regional' },
    { plan: 'Balanced', tier: 'Silver', premium: '$264', deductible: '$2,000', network: 'National' },
    { plan: 'Complete', tier: 'Gold', premium: '$371', deductible: '$750', network: 'National +' },
    { plan: 'Premier', tier: 'Platinum', premium: '$498', deductible: '$250', network: 'Global' },
];

const NAV = ['Overview', 'Layout', 'Containers', 'Typography', 'Tables'];

/**
 * Reads the real column count out of the shadow-rendered grid rather than
 * inferring it from a breakpoint table. If the component's breakpoints ever
 * move, this readout moves with them instead of quietly lying.
 */
const columnCount = (host: Element | null): number => {
    const items = host ? Array.from(host.querySelectorAll('[data-tile]')) : [];
    if (items.length === 0) return 0;
    const firstTop = items[0].getBoundingClientRect().top;
    let count = 0;
    for (const item of items) {
        if (Math.abs(item.getBoundingClientRect().top - firstTop) > 2) break;
        count += 1;
    }
    return count;
};

const mountLab = (root: HTMLElement): (() => void) => {
    const disposeReveals = mountPage(root, { stagger: 70 });

    const resizer = root.querySelector<HTMLElement>('.ad-resizer');
    const grid = root.querySelector('[data-lab-grid]');
    const widthOut = root.querySelector<HTMLElement>('[data-out="width"]');
    const colsOut = root.querySelector<HTMLElement>('[data-out="cols"]');
    const bpOut = root.querySelector<HTMLElement>('[data-out="bp"]');
    const fill = root.querySelector<HTMLElement>('.ad-ruler__fill');

    const report = () => {
        if (!resizer) return;
        const width = Math.round(resizer.getBoundingClientRect().width);
        const active = [...BREAKPOINTS].reverse().find((bp) => width >= bp);

        if (widthOut) widthOut.textContent = `${width}px`;
        if (colsOut) colsOut.textContent = String(columnCount(grid));
        if (bpOut) bpOut.textContent = active ? `≥ ${active}px` : '< 560px (stacked)';
        if (fill) fill.style.inlineSize = `${Math.min((width / 1400) * 100, 100)}%`;
    };

    const observer = new ResizeObserver(report);
    if (resizer) observer.observe(resizer);
    report();

    // Type scale readout — recomputed on viewport change because these samples
    // are sized with clamp() against `vw`.
    const typeSamples = Array.from(root.querySelectorAll<HTMLElement>('[data-type-sample]'));
    const reportType = () => {
        typeSamples.forEach((sample) => {
            const out = sample.parentElement?.querySelector<HTMLElement>('[data-type-size]');
            if (out) out.textContent = `${parseFloat(getComputedStyle(sample).fontSize).toFixed(1)}px`;
        });
    };
    reportType();
    window.addEventListener('resize', reportType);

    return () => {
        disposeReveals();
        observer.disconnect();
        window.removeEventListener('resize', reportType);
    };
};

const tile = (item: { title: string; meta: string }) => html`
    <div class="ad-tile" data-tile>
        <b>${item.title}</b>
        <span>${item.meta}</span>
    </div>
`;

export const Default: Story = {
    name: 'Adaptive Layout',
    render: () => html`
        <div class="ad" ${ref(pageRef(mountLab))}>
            <style>${pageCss}</style>

            <!-- ============ RESPONSIVE HEADER ============ -->
            <div class="ad-header">
                <cre8-layout-container>
                    <div class="ad-header__inner">
                        <span class="ad-brand"><span class="ad-brand__mark"></span>cre8 / adaptive</span>

                        <nav class="ad-nav" aria-label="Section">
                            ${NAV.map((item) => html`<a href="#">${item}</a>`)}
                        </nav>

                        <details class="ad-menu">
                            <summary aria-label="Open navigation">Menu</summary>
                            <div class="ad-menu__panel">
                                ${NAV.map((item) => html`<a href="#">${item}</a>`)}
                            </div>
                        </details>

                        <cre8-button text="Get a quote" variant="primary" size="sm"></cre8-button>
                    </div>
                </cre8-layout-container>
            </div>

            <!-- ============ INTRO ============ -->
            <div class="ad-section">
                <cre8-layout-container>
                    <div class="ad-section__head">
                        <cre8-badge text="Responsive" status="info"></cre8-badge>
                        <cre8-heading tagVariant="h1" type="display-small">
                            Layout that answers to its container
                        </cre8-heading>
                        <cre8-text-passage size="large">
                            Viewport breakpoints describe the browser. Container queries describe the space a
                            component was actually given. cre8 ships both vocabularies with the same breakpoints,
                            which makes the difference easy to see — and easy to get wrong.
                        </cre8-text-passage>
                    </div>
                    <cre8-inline-alert status="info">
                        Resize the browser <em>and</em> drag the panel below. They are two independent axes, and
                        only one of them is what a component in a sidebar actually experiences.
                    </cre8-inline-alert>
                </cre8-layout-container>
            </div>

            <!-- ============ RESIZE LAB ============ -->
            <div class="ad-section ad-section--tint">
                <cre8-layout-container>
                    <div class="ad-section__head">
                        <cre8-heading tagVariant="h2" type="headline-default">Resize Lab</cre8-heading>
                        <cre8-text-passage>
                            Drag the handle in the panel's lower-right corner. The column count is read back from
                            the rendered grid, not guessed from a table of breakpoints.
                        </cre8-text-passage>
                    </div>

                    <div class="ad-lab">
                        <div class="ad-lab__readout">
                            <span>Container width <b data-out="width">—</b></span>
                            <span>Columns <b data-out="cols">—</b></span>
                            <span>Active breakpoint <b data-out="bp">—</b></span>
                        </div>

                        <div class="ad-ruler">
                            <div class="ad-ruler__track"><div class="ad-ruler__fill"></div></div>
                            <div class="ad-ruler__marks">
                                <span>0</span>
                                ${BREAKPOINTS.map((bp) => html`<span>${bp}</span>`)}
                            </div>
                        </div>

                        <div class="ad-resizer">
                            <div class="ad-stage">
                                <div class="ad-cq-grid" data-lab-grid>
                                    ${TILES.map((item) => tile(item))}
                                </div>
                            </div>
                        </div>
                    </div>
                </cre8-layout-container>
            </div>

            <!-- ============ CONTAINER VS VIEWPORT ============ -->
            <div class="ad-section">
                <cre8-layout-container>
                    <div class="ad-section__head">
                        <cre8-heading tagVariant="h2" type="headline-default" data-reveal>
                            The same content, two rulers
                        </cre8-heading>
                        <cre8-text-passage data-reveal>
                            Both columns below are equally narrow. The left grid still believes it has the whole
                            browser to work with; the right grid measures itself.
                        </cre8-text-passage>
                    </div>

                    <div class="ad-compare" data-reveal-group>
                        <div class="ad-compare__col" data-reveal="left">
                            <cre8-heading tagVariant="h3" type="title-default">
                                <code>cre8-grid</code> · viewport
                            </cre8-heading>
                            <span class="ad-compare__note">
                                Keyed to <code>@media</code>. On a wide screen it stays multi-up even here, so the
                                tiles are squeezed.
                            </span>
                            <div class="ad-compare__frame">
                                <cre8-grid variant="3up" gap="sm">
                                    ${TILES.slice(0, 3).map(
        (item) => html`<cre8-grid-item>${tile(item)}</cre8-grid-item>`,
    )}
                                </cre8-grid>
                            </div>
                        </div>

                        <div class="ad-compare__col" data-reveal="right">
                            <cre8-heading tagVariant="h3" type="title-default">
                                <code>@container</code> · container
                            </cre8-heading>
                            <span class="ad-compare__note">
                                Keyed to <code>@container</code>. It sees its own narrow width and stacks, which is
                                what the content needed.
                            </span>
                            <div class="ad-compare__frame">
                                <div class="ad-stage">
                                    <div class="ad-cq-grid">
                                        ${TILES.slice(0, 3).map((item) => tile(item))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </cre8-layout-container>
            </div>

            <!-- ============ RESPONSIVE TABLE ============ -->
            <div class="ad-section ad-section--tint">
                <cre8-layout-container>
                    <div class="ad-section__head">
                        <cre8-heading tagVariant="h2" type="headline-default" data-reveal>
                            Tables that become records
                        </cre8-heading>
                        <cre8-text-passage data-reveal>
                            With <code>behavior="responsive"</code> each cell carries its own header, so a narrow
                            viewport gets a readable stack of records instead of a horizontal scrollbar.
                        </cre8-text-passage>
                    </div>

                    <cre8-card data-reveal>
                        <cre8-table behavior="responsive" variant="striped" isHoverable
                                    caption="Plan comparison — narrow the browser to watch rows restructure">
                            <cre8-table-header>
                                <cre8-table-row>
                                    <cre8-table-header-cell>Plan</cre8-table-header-cell>
                                    <cre8-table-header-cell>Tier</cre8-table-header-cell>
                                    <cre8-table-header-cell>Premium</cre8-table-header-cell>
                                    <cre8-table-header-cell>Deductible</cre8-table-header-cell>
                                    <cre8-table-header-cell>Network</cre8-table-header-cell>
                                </cre8-table-row>
                            </cre8-table-header>
                            <cre8-table-body>
                                ${PLANS.map(
        (row) => html`
                                        <cre8-table-row>
                                            <cre8-table-cell dataHeader="Plan"><strong>${row.plan}</strong></cre8-table-cell>
                                            <cre8-table-cell dataHeader="Tier">
                                                <cre8-badge text="${row.tier}" variant="light"></cre8-badge>
                                            </cre8-table-cell>
                                            <cre8-table-cell dataHeader="Premium">${row.premium}/mo</cre8-table-cell>
                                            <cre8-table-cell dataHeader="Deductible">${row.deductible}</cre8-table-cell>
                                            <cre8-table-cell dataHeader="Network">${row.network}</cre8-table-cell>
                                        </cre8-table-row>
                                    `,
    )}
                            </cre8-table-body>
                        </cre8-table>
                    </cre8-card>
                </cre8-layout-container>
            </div>

            <!-- ============ FLUID TYPE ============ -->
            <div class="ad-section">
                <cre8-layout-container>
                    <div class="ad-section__head">
                        <cre8-heading tagVariant="h2" type="headline-default" data-reveal>
                            Type that interpolates
                        </cre8-heading>
                        <cre8-text-passage data-reveal>
                            These samples are sized with <code>clamp()</code>, so they scale continuously between a
                            floor and a ceiling rather than jumping at a breakpoint. The measured size updates live.
                        </cre8-text-passage>
                    </div>

                    <div class="ad-type" data-reveal-group>
                        <div class="ad-type__row" data-reveal="fade">
                            <span class="ad-type__sample ad-type__sample--display" data-type-sample>Display</span>
                            <span class="ad-type__size" data-type-size>—</span>
                        </div>
                        <div class="ad-type__row" data-reveal="fade">
                            <span class="ad-type__sample ad-type__sample--headline" data-type-sample>Headline</span>
                            <span class="ad-type__size" data-type-size>—</span>
                        </div>
                        <div class="ad-type__row" data-reveal="fade">
                            <span class="ad-type__sample ad-type__sample--title" data-type-sample>Title</span>
                            <span class="ad-type__size" data-type-size>—</span>
                        </div>
                    </div>
                </cre8-layout-container>
            </div>

            <!-- ============ NOTES ============ -->
            <div class="ad-section ad-section--tint">
                <cre8-layout-container>
                    <cre8-heading tagVariant="h2" type="headline-small" data-reveal>Picking a ruler</cre8-heading>
                    <div data-reveal style="margin-block-start: var(--cre8-spacing-24);">
                        <cre8-accordion>
                            <cre8-accordion-item heading="When to reach for cre8-grid">
                                <cre8-text-passage size="small">
                                    Use the viewport vocabulary for page-level scaffolding that genuinely spans the
                                    screen — the top-level column structure of a page, a full-bleed band, a footer.
                                </cre8-text-passage>
                            </cre8-accordion-item>
                            <cre8-accordion-item heading="When to reach for a container query">
                                <cre8-text-passage size="small">
                                    Use the container vocabulary for anything reusable. A card grid that may land in
                                    a sidebar, a modal, or a split pane should respond to the width it was handed,
                                    not the width of the window around it. Declare container-type on a wrapper and
                                    query it from the child — never on the element the rules themselves target.
                                </cre8-text-passage>
                            </cre8-accordion-item>
                            <cre8-accordion-item heading="Why not nest two width constraints">
                                <cre8-text-passage size="small">
                                    A nested width bound silently wins over its parent, leaving the outer constraint
                                    as a lie the next person has to debug. Pick one owner for width per region.
                                </cre8-text-passage>
                            </cre8-accordion-item>
                        </cre8-accordion>
                    </div>
                </cre8-layout-container>
            </div>
        </div>
    `,
};
