import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../badge';
import { cre8Badge } from '../badge';

describe('badge', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8Badge>(html`<cre8-badge text="Default"></cre8-badge>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('icon variant renders correctly', async () => {
        const exampleSvg = `<svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
                <circle r="45" cx="50" cy="50" fill="red" /></svg>`;
        const el = await fixture<cre8Badge>(html`<cre8-badge svg = ${exampleSvg} iconName = "Feedback" text="Icon Variant"></cre8-badge>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with status', async () => {
        const statuses = ['error', 'warning', 'success', 'info', 'attention'];

        for (const status of statuses) {
            const el = await fixture<cre8Badge>(html`<cre8-badge status="${status}"></cre8-badge>`);
            const badge = el.shadowRoot!.querySelector('.cre8-c-badge'); // Test for the class change
            expect(badge.classList.contains(`cre8-c-badge--${status}`)).toBeTruthy();
        }
    });

    test('has the correct class names with variant', async () => {
        const variants = ['light', 'white'];

        for (const variant of variants) {
            const el = await fixture<cre8Badge>(html`<cre8-badge variant="${variant}"></cre8-badge>`);
            const badge = el.shadowRoot!.querySelector('.cre8-c-badge'); // Test for the class change
            expect(badge.classList.contains(`cre8-c-badge--${variant}`)).toBeTruthy();
        }
    });

    describe('accessibility -  Badge', () => {
        test('tests accessibility for default badge', async () => {
            const el = await fixture<cre8Badge>(html`<cre8-badge text="Default"></cre8-badge>`);
            return expect(el).toBeAccessible();
        });

        test('tests accessibility for icon badge variant', async () => {
            const exampleSvg = `<svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
                <circle r="45" cx="50" cy="50" fill="red" /></svg>`;
            const el = await fixture<cre8Badge>(html`<cre8-badge svg = ${exampleSvg} iconName = "Feedback" text="Icon Variant"></cre8-badge>`);
            return expect(el).toBeAccessible();
        });
    });
});
