/**
 * Shared motion + lifecycle helpers for the `Pages/*` showcase stories.
 *
 * These pages render into the light DOM so their composition stays readable in
 * the Docs source panel, which means behaviour cannot hang off a component
 * lifecycle. Instead every page roots itself with lit's `ref()` directive and
 * calls `mountPage()` on attach; the returned disposer runs on detach so
 * observers and timers do not leak when Storybook swaps stories.
 */

/** Honour the OS "reduce motion" setting for every effect in this kit. */
export const prefersReducedMotion = (): boolean =>
    typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

/**
 * Base styles every showcase page pulls in. Kept as a plain string rather than
 * a Lit `css` tag because these pages render light-DOM, so the rules have to
 * land in a real `<style>` element in the document, not a shadow root.
 *
 * Everything here is expressed in cre8 tokens. A raw hex written into a page
 * opts that page out of theming, and the brand switcher in the toolbar would
 * stop working for exactly the parts that were hardcoded.
 */
export const pageKitCss = `
/* ---------- scroll reveal ---------- */
[data-reveal] {
    opacity: 0;
    transform: translate3d(0, 1.5rem, 0);
    transition:
        opacity 640ms cubic-bezier(0.16, 1, 0.3, 1),
        transform 640ms cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--reveal-delay, 0ms);
    will-change: opacity, transform;
}
[data-reveal='fade'] { transform: none; }
[data-reveal='left'] { transform: translate3d(-1.75rem, 0, 0); }
[data-reveal='right'] { transform: translate3d(1.75rem, 0, 0); }
[data-reveal='scale'] { transform: scale(0.94); }
[data-reveal].is-revealed {
    opacity: 1;
    transform: none;
}

/* ---------- hover lift ---------- */
[data-lift] {
    transition:
        transform 320ms cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow 320ms cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
}
[data-lift]:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 40px -18px rgb(0 0 0 / 35%);
}

/* ---------- numeric counters ---------- */
[data-count-to] {
    font-variant-numeric: tabular-nums;
    font-feature-settings: 'tnum' 1;
}

/* ---------- stacked type rhythm ---------- */
/* cre8-heading and cre8-text-passage carry no outer margin, so a heading
   followed directly by body copy collides. Give the pair a consistent gap. */
cre8-heading + cre8-text-passage,
cre8-heading + p {
    display: block;
    margin-block-start: var(--cre8-spacing-8);
}

/* ---------- keyframes ---------- */
@keyframes cre8-kit-float {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(0, -18px, 0) scale(1.04); }
}
@keyframes cre8-kit-drift {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-50%, 0, 0); }
}
@keyframes cre8-kit-pulse {
    0% { box-shadow: 0 0 0 0 var(--cre8-color-bg-brand-strong); opacity: 1; }
    70% { box-shadow: 0 0 0 10px transparent; opacity: 0.85; }
    100% { box-shadow: 0 0 0 0 transparent; opacity: 1; }
}
@keyframes cre8-kit-slide-in {
    from { opacity: 0; transform: translate3d(0, -10px, 0); }
    to { opacity: 1; transform: none; }
}
@keyframes cre8-kit-shimmer {
    from { background-position: -160% 0; }
    to { background-position: 260% 0; }
}

/* ---------- reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
    [data-reveal],
    [data-reveal].is-revealed {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
    }
    [data-lift]:hover { transform: none; }
    *,
    *::before,
    *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
    }
}
`;

const EASE_OUT_EXPO = (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts an element's text from 0 to `to`, easing out. Returns a cancel fn.
 * Reduced motion jumps straight to the final value — the information still
 * arrives, only the animation is dropped.
 */
export const animateCount = (el: HTMLElement, to: number, duration = 1600): (() => void) => {
    const decimals = Number(el.dataset.countDecimals ?? 0);
    const prefix = el.dataset.countPrefix ?? '';
    const suffix = el.dataset.countSuffix ?? '';
    const format = (n: number) =>
        `${prefix}${n.toLocaleString('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        })}${suffix}`;

    if (prefersReducedMotion()) {
        el.textContent = format(to);
        return () => {};
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = format(to * EASE_OUT_EXPO(progress));
        if (progress < 1) raf = requestAnimationFrame(tick);
        else el.textContent = format(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
};

export interface MountOptions {
    /** Per-item stagger in ms applied within each `[data-reveal-group]`. */
    stagger?: number;
    /** How much of an element must be on screen before it reveals. */
    threshold?: number;
}

/**
 * Wires scroll-reveal and count-up behaviour for everything under `root`.
 *
 * Returns a disposer. Call it on detach — Storybook tears stories down without
 * warning and a live IntersectionObserver holding detached nodes is a leak.
 */
export const mountPage = (root: HTMLElement, options: MountOptions = {}): (() => void) => {
    const { stagger = 90, threshold = 0.15 } = options;
    const cancels: Array<() => void> = [];

    // Stagger is assigned per group so a row of cards cascades rather than
    // every card on the page sharing one global index.
    const groups = new Map<Element | null, number>();
    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        const group = el.closest('[data-reveal-group]');
        const index = groups.get(group) ?? 0;
        groups.set(group, index + 1);
        el.style.setProperty('--reveal-delay', `${index * stagger}ms`);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target as HTMLElement;
                el.classList.add('is-revealed');

                el.querySelectorAll<HTMLElement>('[data-count-to]').forEach((counter) => {
                    if (counter.dataset.counted === 'true') return;
                    counter.dataset.counted = 'true';
                    cancels.push(animateCount(counter, Number(counter.dataset.countTo)));
                });

                observer.unobserve(el);
            });
        },
        { threshold, rootMargin: '0px 0px -8% 0px' },
    );

    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => observer.observe(el));

    // Counters that sit outside any revealed wrapper still need to run.
    root.querySelectorAll<HTMLElement>('[data-count-to]').forEach((counter) => {
        if (counter.closest('[data-reveal]')) return;
        counter.dataset.counted = 'true';
        cancels.push(animateCount(counter, Number(counter.dataset.countTo)));
    });

    return () => {
        observer.disconnect();
        cancels.forEach((cancel) => cancel());
    };
};

/**
 * Builds a ref callback that mounts on attach and disposes on detach.
 *
 * `ref()` hands back the element when it connects and `undefined` when it goes
 * away, which is exactly the pair of hooks these pages need.
 */
export const pageRef = (
    setup: (root: HTMLElement) => (() => void) | void,
): ((el: Element | undefined) => void) => {
    let dispose: (() => void) | undefined;
    return (el: Element | undefined) => {
        if (el instanceof HTMLElement) {
            // rAF so cre8 elements inside have upgraded before we measure them.
            requestAnimationFrame(() => {
                const result = setup(el);
                dispose = typeof result === 'function' ? result : undefined;
            });
        } else {
            if (dispose) dispose();
            dispose = undefined;
        }
    };
};

/** Deterministic pseudo-random so demo data looks organic but never flickers between reloads. */
export const seeded = (seed: number): (() => number) => {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
};
