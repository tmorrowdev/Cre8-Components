import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import iconSprite from '@tmorrow/cre8-wc/icons/cre8-icons.svg?raw';
import '../icon';
import { Cre8Icon } from '../icon';
import styles from '../icon.styles.js';

describe('icon', () => {
    test('renders correctly', async () => {
        const el = await fixture<Cre8Icon>(html`<cre8-icon name="help" iconTitle="Help"></cre8-icon>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    describe('accessibility -  Icon', () => {
        test('tests accessibility for default icon', async () => {
            const el = await fixture<Cre8Icon>(html`<cre8-icon name="help" iconTitle="Help"></cre8-icon>`);
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for with an aria-label icon', async () => {
            const el = await fixture<Cre8Icon>(html`<cre8-icon name="testName" iconTitle="Help"></cre8-icon>`);
            return expect(el).toBeAccessible();
        });
    });

    describe('bundled sprite', () => {
        test('inlines the sprite symbol instead of referencing the sprite by URL', async () => {
            const el = await fixture<Cre8Icon>(html`<cre8-icon name="add"></cre8-icon>`);
            const svg = el.shadowRoot!.querySelector('svg.cre8-c-icon');
            expect(svg).toBeTruthy();
            expect(svg!.getAttribute('viewBox')).toBe('0 0 24 24');
            expect(svg!.querySelector('path')).toBeTruthy();
            expect(el.shadowRoot!.querySelector('use')).toBeNull();
        });

        test('never emits a <use> whose href is the sprite markup', async () => {
            const el = await fixture<Cre8Icon>(html`<cre8-icon name="close"></cre8-icon>`);
            const hrefs = Array.from(el.shadowRoot!.querySelectorAll('use')).map((u) => u.getAttribute('href') ?? '');
            expect(hrefs.some((h) => h.startsWith('<'))).toBe(false);
        });

        test('inlines every symbol the sprite defines', async () => {
            const ids = new Set<string>();
            const re = /<symbol\b[^>]*\sid="([^"]+)"/g;
            let m: RegExpExecArray | null;
            while ((m = re.exec(iconSprite)) !== null) ids.add(m[1]);
            expect(ids.size).toBeGreaterThan(50);
            for (const id of ids) {
                const el = await fixture<Cre8Icon>(html`<cre8-icon name=${id}></cre8-icon>`);
                expect(el.shadowRoot!.querySelector('svg.cre8-c-icon > *'), `symbol "${id}" rendered nothing`).toBeTruthy();
            }
        });

        test('renders an empty icon box for an unknown name', async () => {
            const el = await fixture<Cre8Icon>(html`<cre8-icon name="does-not-exist"></cre8-icon>`);
            const svg = el.shadowRoot!.querySelector('svg.cre8-c-icon');
            expect(svg).toBeTruthy();
            expect(svg!.children.length).toBe(0);
        });

        test('paints inlined paths with currentColor', () => {
            expect(styles.cssText).toMatch(/\.cre8-c-icon\s*\{[^}]*fill:\s*currentColor/);
        });
    });

    describe('external sprite overrides', () => {
        test('keeps the <use> path when iconUrl is set explicitly', async () => {
            const el = await fixture<Cre8Icon>(html`<cre8-icon name="add" iconUrl="/custom/sprite.svg"></cre8-icon>`);
            const use = el.shadowRoot!.querySelector('use');
            expect(use?.getAttribute('href')).toBe('/custom/sprite.svg#add');
            expect(el.shadowRoot!.querySelector('svg.cre8-c-icon path')).toBeNull();
        });

        test('keeps the <use> path when window.Cre8_ICON_URL is set', async () => {
            window.Cre8_ICON_URL = '/global/sprite.svg';
            try {
                const el = await fixture<Cre8Icon>(html`<cre8-icon name="add"></cre8-icon>`);
                expect(el.shadowRoot!.querySelector('use')?.getAttribute('href')).toBe('/global/sprite.svg#add');
            } finally {
                delete window.Cre8_ICON_URL;
            }
        });
    });
});
