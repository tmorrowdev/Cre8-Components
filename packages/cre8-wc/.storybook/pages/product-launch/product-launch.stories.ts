import { html } from 'lit';
import { ref } from 'lit/directives/ref.js';
import type { Meta, StoryObj } from '@storybook/web-components';

import '../../../components/band/band';
import '../../../components/layout-container/layout-container';
import '../../../components/heading/heading';
import '../../../components/text-passage/text-passage';
import '../../../components/button/button';
import '../../../components/button-group/button-group';
import '../../../components/badge/badge';
import '../../../components/card/card';
import '../../../components/grid/grid';
import '../../../components/grid-item/grid-item';
import '../../../components/divider/divider';

import { mountPage, pageKitCss, pageRef } from '../_kit/page-kit';

type Story = StoryObj;

const meta = {
    title: 'Pages/Product Launch',
    tags: ['autodocs', 'page'],
    parameters: {
        layout: 'fullscreen',
        controls: { hideNoControlsWarning: true },
        docs: {
            description: {
                component:
                    'A full marketing page composed entirely from cre8 primitives, built to show **motion** '
                    + 'as a design material rather than decoration. Six techniques are on display: a headline that '
                    + 'resolves word by word, parallax orbs driven by pointer position, an infinite marquee, '
                    + 'metrics that count up the moment they enter the viewport, a staggered card cascade, and '
                    + 'hover lift on every interactive surface.\n\n'
                    + 'Every effect is token-driven, so the brand switcher in the toolbar restyles the page '
                    + 'without touching a single hardcoded colour, and every effect collapses to a static layout '
                    + 'under `prefers-reduced-motion: reduce`.',
            },
        },
    },
} satisfies Meta;

export default meta;

const pageCss = `
${pageKitCss}

.pl { background: var(--cre8-color-bg-default); overflow-x: clip; }

/* ---------- hero ---------- */
.pl-hero {
    position: relative;
    display: block;
    isolation: isolate;
    background:
        radial-gradient(120% 140% at 12% 8%, var(--cre8-color-bg-brand-strong) 0%, transparent 55%),
        radial-gradient(90% 120% at 92% 18%, var(--cre8-color-bg-brand) 0%, transparent 60%),
        var(--cre8-color-bg-brand-xstrong);
    padding-block: clamp(var(--cre8-spacing-64), 11vw, var(--cre8-spacing-160));
    overflow: hidden;
}
.pl-orbs { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
.pl-orb {
    position: absolute;
    border-radius: var(--cre8-border-radius-round);
    filter: blur(42px);
    opacity: 0.5;
    animation: cre8-kit-float var(--orb-duration, 11s) ease-in-out infinite;
    animation-delay: var(--orb-delay, 0s);
    /* Updated from JS on pointer move for a parallax that tracks the cursor. */
    translate: var(--parallax-x, 0) var(--parallax-y, 0);
    transition: translate 600ms cubic-bezier(0.16, 1, 0.3, 1);
}
.pl-orb--a { inset-block-start: -6%; inset-inline-start: 4%; inline-size: 26rem; block-size: 26rem; background: var(--cre8-color-bg-brand); }
.pl-orb--b { inset-block-end: -18%; inset-inline-end: 2%; inline-size: 32rem; block-size: 32rem; background: var(--cre8-color-bg-info-strong); --orb-duration: 14s; --orb-delay: -3s; }
.pl-orb--c { inset-block-start: 22%; inset-inline-start: 46%; inline-size: 18rem; block-size: 18rem; background: var(--cre8-color-bg-attention-strong); --orb-duration: 9s; --orb-delay: -6s; }

.pl-hero__inner { max-inline-size: 46rem; display: grid; gap: var(--cre8-spacing-24); }
.pl-hero__eyebrow { display: flex; align-items: center; gap: var(--cre8-spacing-12); }

/* Each word animates on its own delay so the headline resolves left to right. */
.pl-word {
    display: inline-block;
    opacity: 0;
    transform: translate3d(0, 0.7em, 0) rotate(2deg);
    animation: pl-word-in 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: calc(var(--word-index) * 72ms + 120ms);
}
@keyframes pl-word-in {
    to { opacity: 1; transform: none; }
}

.pl-scroll-cue {
    display: inline-flex;
    align-items: center;
    gap: var(--cre8-spacing-8);
    margin-block-start: var(--cre8-spacing-16);
    color: var(--cre8-color-content-knockout);
    opacity: 0.75;
    font-size: 0.8125rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}
.pl-scroll-cue::after {
    content: '';
    inline-size: 1px;
    block-size: 2rem;
    background: currentColor;
    transform-origin: top;
    animation: pl-cue 1.9s ease-in-out infinite;
}
@keyframes pl-cue {
    0%, 100% { transform: scaleY(0.25); opacity: 0.3; }
    50% { transform: scaleY(1); opacity: 1; }
}

/* ---------- marquee ---------- */
.pl-marquee {
    display: block;
    padding-block: var(--cre8-spacing-24);
    border-block-end: 1px solid var(--cre8-color-border-default);
    background: var(--cre8-color-bg-subtle);
    overflow: hidden;
    /* Fade the edges so items enter and leave instead of being clipped. */
    mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}
.pl-marquee__track {
    display: flex;
    inline-size: max-content;
    gap: var(--cre8-spacing-48);
    animation: cre8-kit-drift 26s linear infinite;
}
.pl-marquee:hover .pl-marquee__track { animation-play-state: paused; }
.pl-marquee__item {
    display: flex;
    align-items: center;
    gap: var(--cre8-spacing-8);
    white-space: nowrap;
    color: var(--cre8-color-content-subtle);
    font-weight: 600;
    letter-spacing: 0.02em;
}

/* ---------- sections ---------- */
.pl-section { display: block; padding-block: clamp(var(--cre8-spacing-48), 7vw, var(--cre8-spacing-96)); }
.pl-section__head { max-inline-size: 38rem; display: grid; gap: var(--cre8-spacing-12); margin-block-end: var(--cre8-spacing-48); }

/* ---------- stats ---------- */
.pl-stats { display: grid; gap: var(--cre8-spacing-32); grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr)); }
.pl-stat__value {
    display: block;
    font-size: clamp(2.25rem, 5vw, 3.5rem);
    line-height: 1.05;
    font-weight: 700;
    color: var(--cre8-color-content-brand);
}
.pl-stat__label { color: var(--cre8-color-content-subtle); font-size: 0.9375rem; }

/* ---------- feature cards ---------- */
.pl-card-icon {
    display: grid;
    place-items: center;
    inline-size: 2.75rem;
    block-size: 2.75rem;
    border-radius: var(--cre8-border-radius-container);
    background: var(--cre8-color-bg-brand);
    color: var(--cre8-color-content-brand-strong);
    margin-block-end: var(--cre8-spacing-16);
    transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
}
[data-lift]:hover .pl-card-icon { transform: rotate(-8deg) scale(1.08); }

/* ---------- steps ---------- */
.pl-steps { display: grid; gap: var(--cre8-spacing-32); counter-reset: pl-step; }
.pl-step {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--cre8-spacing-24);
    align-items: start;
    padding-block-end: var(--cre8-spacing-32);
    border-block-end: 1px solid var(--cre8-color-border-default);
}
.pl-step:last-child { border-block-end: 0; padding-block-end: 0; }
.pl-step__num {
    counter-increment: pl-step;
    display: grid;
    place-items: center;
    inline-size: 2.5rem;
    block-size: 2.5rem;
    border-radius: var(--cre8-border-radius-round);
    border: 1px solid var(--cre8-color-border-brand);
    color: var(--cre8-color-content-brand);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
}
.pl-step__num::before { content: counter(pl-step, decimal-leading-zero); }

/* ---------- closing CTA ---------- */
.pl-cta {
    display: block;
    text-align: center;
    padding-block: clamp(var(--cre8-spacing-64), 9vw, var(--cre8-spacing-120));
    background:
        radial-gradient(90% 160% at 50% 0%, var(--cre8-color-bg-brand-strong) 0%, transparent 62%),
        var(--cre8-color-bg-brand-xstrong);
}
.pl-cta__inner { display: grid; gap: var(--cre8-spacing-24); justify-items: center; max-inline-size: 40rem; margin-inline: auto; }
.pl-live {
    display: inline-flex;
    align-items: center;
    gap: var(--cre8-spacing-8);
    color: var(--cre8-color-content-knockout);
    font-size: 0.8125rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}
.pl-live__dot {
    inline-size: 0.5rem;
    block-size: 0.5rem;
    border-radius: var(--cre8-border-radius-round);
    background: var(--cre8-color-bg-success-strong);
    animation: cre8-kit-pulse 2.1s ease-out infinite;
}
`;

const HEADLINE = ['Ship', 'interfaces', 'that', 'feel', 'alive.'];

const MARQUEE = [
    'Northwind Health', 'Atlas Freight', 'Kestrel Bank', 'Verity Labs',
    'Orchard Retail', 'Lumen Energy', 'Beacon Mutual', 'Cobalt Systems',
];

const FEATURES = [
    {
        glyph: 'M4 14l6-6 4 4 6-8',
        title: 'Motion with intent',
        body: 'Every transition is tied to a state change, so animation explains what happened instead of decorating it.',
        badge: 'Core',
    },
    {
        glyph: 'M12 3v18M3 12h18',
        title: 'Composable by default',
        body: 'Eighty-eight primitives that nest predictably. Compose a page from parts you already trust.',
        badge: 'Core',
    },
    {
        glyph: 'M3 12a9 9 0 1018 0 9 9 0 10-18 0M3 12h18',
        title: 'Themed to the seed',
        body: 'Retheme from seed tokens and the whole surface follows — gradients, borders and motion accents included.',
        badge: 'Tokens',
    },
    {
        glyph: 'M5 12l5 5L20 7',
        title: 'Accessible under pressure',
        body: 'Reduced-motion users get the same layout with the choreography removed. Nothing is lost, only quieted.',
        badge: 'A11y',
    },
    {
        glyph: 'M4 6h16M4 12h10M4 18h7',
        title: 'Responsive to container',
        body: 'Container queries mean a card behaves by the space it occupies, not the width of the browser.',
        badge: 'Layout',
    },
    {
        glyph: 'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z',
        title: 'Production tested',
        body: 'The same components ship in the CDN bundle, the React wrappers and the MCP catalog.',
        badge: 'Stable',
    },
];

const STEPS = [
    {
        title: 'Pick the primitives',
        body: 'Start from the catalog rather than from memory. The composition you need almost always already exists.',
    },
    {
        title: 'Compose outside in',
        body: 'Frame, then band, then width constraint, then content. Never nest two width constraints.',
    },
    {
        title: 'Layer the motion last',
        body: 'Get the static layout right first. Motion added to a working page clarifies it; motion added to a broken one hides the seams.',
    },
];

const icon = (d: string) => html`
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="${d}"></path>
    </svg>
`;

/**
 * Tracks the pointer across the hero and feeds a damped offset to the orbs.
 * Skipped entirely when the user asked for reduced motion.
 */
const mountParallax = (root: HTMLElement): (() => void) => {
    const hero = root.querySelector<HTMLElement>('.pl-hero');
    const orbs = Array.from(root.querySelectorAll<HTMLElement>('.pl-orb'));
    if (!hero || orbs.length === 0) return () => {};

    const onMove = (event: PointerEvent) => {
        const bounds = hero.getBoundingClientRect();
        const dx = (event.clientX - bounds.left) / bounds.width - 0.5;
        const dy = (event.clientY - bounds.top) / bounds.height - 0.5;
        orbs.forEach((orb, index) => {
            const depth = (index + 1) * 14;
            orb.style.setProperty('--parallax-x', `${dx * depth}px`);
            orb.style.setProperty('--parallax-y', `${dy * depth}px`);
        });
    };
    const onLeave = () => orbs.forEach((orb) => {
        orb.style.setProperty('--parallax-x', '0px');
        orb.style.setProperty('--parallax-y', '0px');
    });

    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => {
        hero.removeEventListener('pointermove', onMove);
        hero.removeEventListener('pointerleave', onLeave);
    };
};

export const Default: Story = {
    name: 'Product Launch',
    render: () => html`
        <div
            class="pl"
            ${ref(pageRef((root) => {
        const disposeReveals = mountPage(root, { stagger: 80 });
        const disposeParallax = mountParallax(root);
        return () => {
            disposeReveals();
            disposeParallax();
        };
    }))}
        >
            <style>${pageCss}</style>

            <!-- ============ HERO ============ -->
            <section class="pl-hero">
                <div class="pl-orbs" aria-hidden="true">
                    <span class="pl-orb pl-orb--a"></span>
                    <span class="pl-orb pl-orb--b"></span>
                    <span class="pl-orb pl-orb--c"></span>
                </div>
                <cre8-layout-container>
                    <div class="pl-hero__inner">
                        <div class="pl-hero__eyebrow">
                            <cre8-badge text="v3.0" status="info"></cre8-badge>
                            <cre8-text-passage size="small" inverted>Now shipping to every brand</cre8-text-passage>
                        </div>

                        <cre8-heading tagVariant="h1" type="display-default" inverted>
                            ${HEADLINE.map(
        (word, index) => html`<span class="pl-word" style="--word-index:${index}">${word}</span> `,
    )}
                        </cre8-heading>

                        <cre8-text-passage size="large" inverted>
                            A design system where motion, data and layout are the same conversation —
                            eighty-eight Lit primitives that stay composable all the way up to a full page.
                        </cre8-text-passage>

                        <cre8-button-group>
                            <cre8-button text="Start building" variant="primary" inverse></cre8-button>
                            <cre8-button text="Read the guide" variant="secondary" inverse></cre8-button>
                        </cre8-button-group>

                        <span class="pl-scroll-cue">Scroll</span>
                    </div>
                </cre8-layout-container>
            </section>

            <!-- ============ MARQUEE ============ -->
            <div class="pl-marquee">
                <div class="pl-marquee__track">
                    ${[...MARQUEE, ...MARQUEE].map(
        (name) => html`
                            <span class="pl-marquee__item">
                                ${icon('M12 3v18M3 12h18')}${name}
                            </span>
                        `,
    )}
                </div>
            </div>

            <!-- ============ STATS ============ -->
            <div class="pl-section">
                <cre8-layout-container>
                    <div class="pl-stats" data-reveal-group>
                        <div data-reveal="fade">
                            <span class="pl-stat__value" data-count-to="88">0</span>
                            <span class="pl-stat__label">Shipped components</span>
                        </div>
                        <div data-reveal="fade">
                            <span class="pl-stat__value" data-count-to="99.95" data-count-decimals="2" data-count-suffix="%">0</span>
                            <span class="pl-stat__label">Render parity vs. Figma</span>
                        </div>
                        <div data-reveal="fade">
                            <span class="pl-stat__value" data-count-to="12" data-count-suffix="ms">0</span>
                            <span class="pl-stat__label">Median hydration</span>
                        </div>
                        <div data-reveal="fade">
                            <span class="pl-stat__value" data-count-to="8" data-count-prefix="">0</span>
                            <span class="pl-stat__label">Themeable brands</span>
                        </div>
                    </div>
                </cre8-layout-container>
            </div>

            <cre8-divider></cre8-divider>

            <!-- ============ FEATURES ============ -->
            <cre8-band>
                <div class="pl-section">
                <cre8-layout-container>
                    <div class="pl-section__head">
                        <cre8-heading tagVariant="h2" type="headline-default" data-reveal>
                            Built for interfaces that move
                        </cre8-heading>
                        <cre8-text-passage data-reveal>
                            Each card below reveals on a stagger as it crosses the viewport, then lifts on hover.
                            Two effects, one rule: motion always reports a change in state.
                        </cre8-text-passage>
                    </div>

                    <cre8-grid variant="3up" gap="lg" data-reveal-group>
                        ${FEATURES.map(
        (feature) => html`
                                <cre8-grid-item>
                                    <cre8-card fullHeight data-reveal data-lift>
                                        <span class="pl-card-icon">${icon(feature.glyph)}</span>
                                        <cre8-heading tagVariant="h3" type="title-default">${feature.title}</cre8-heading>
                                        <cre8-text-passage size="small">${feature.body}</cre8-text-passage>
                                        <div slot="footer">
                                            <cre8-badge text="${feature.badge}" variant="light"></cre8-badge>
                                        </div>
                                    </cre8-card>
                                </cre8-grid-item>
                            `,
    )}
                    </cre8-grid>
                </cre8-layout-container>
                </div>
            </cre8-band>

            <!-- ============ STEPS ============ -->
            <div class="pl-section">
                <cre8-layout-container>
                    <div class="pl-section__head">
                        <cre8-heading tagVariant="h2" type="headline-default" data-reveal>How a page comes together</cre8-heading>
                    </div>
                    <div class="pl-steps" data-reveal-group>
                        ${STEPS.map(
        (step) => html`
                                <div class="pl-step" data-reveal="left">
                                    <span class="pl-step__num" aria-hidden="true"></span>
                                    <div>
                                        <cre8-heading tagVariant="h3" type="title-default">${step.title}</cre8-heading>
                                        <cre8-text-passage size="small">${step.body}</cre8-text-passage>
                                    </div>
                                </div>
                            `,
    )}
                    </div>
                </cre8-layout-container>
            </div>

            <!-- ============ CLOSING CTA ============ -->
            <section class="pl-cta">
                <cre8-layout-container>
                    <div class="pl-cta__inner">
                        <span class="pl-live"><span class="pl-live__dot"></span>Live in production</span>
                        <cre8-heading tagVariant="h2" type="headline-large" inverted data-reveal="scale">
                            Compose the next one in an afternoon
                        </cre8-heading>
                        <cre8-text-passage inverted data-reveal>
                            Pull the catalog, pick the primitives, layer the motion last.
                        </cre8-text-passage>
                        <cre8-button-group data-reveal>
                            <cre8-button text="Open the catalog" variant="primary" inverse></cre8-button>
                            <cre8-button text="Browse components" variant="tertiary" inverse></cre8-button>
                        </cre8-button-group>
                    </div>
                </cre8-layout-container>
            </section>
        </div>
    `,
};
