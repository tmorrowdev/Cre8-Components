import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../inline-alert';
import { cre8InlineAlert } from '../inline-alert';

describe('inline-alert', () => {
    test('renders correctly', async () => {
        const el = await fixture(html`<cre8-inline-alert></cre8-inline-alert>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with status', async () => {
        const statuses = ['error', 'warning', 'success', 'attention', 'neutral'];

        for (const status of statuses) {
            const el = await fixture<cre8InlineAlert>(
                html`<cre8-inline-alert status="${status}"></cre8-inline-alert>`
            );
            const inlineAlert = el.shadowRoot!.querySelector('.cre8-c-inline-alert'); // Test for the class change
            expect(inlineAlert.classList.contains(`cre8-c-inline-alert--${status}`)).toBeTruthy();
        }
    });

    test('has the correct class names with variant', async () => {
        const variants = ['transparent'];

        for (const variant of variants) {
            const el = await fixture<cre8InlineAlert>(
                html`<cre8-inline-alert variant="${variant}"></cre8-inline-alert>`
            );
            const inlineAlert = el.shadowRoot!.querySelector('.cre8-c-inline-alert'); // Test for the class change
            expect(inlineAlert.classList.contains(`cre8-c-inline-alert--${variant}`)).toBeTruthy();
        }
    });

    test('works with iconName', async () => {
        const el = await fixture(html`<cre8-inline-alert iconName="error"></cre8-inline-alert>`);
        const inlineAlert = el.shadowRoot.querySelector('cre8-icon');
        expect(inlineAlert).toBeTruthy();
    });

    test('has the correct default text', async () => {
        const el = await fixture(html`<cre8-inline-alert>Foo</cre8-inline-alert>`);
        const inlineAlert = el.shadowRoot.querySelector('slot');
        const inlineAlertText = inlineAlert.assignedNodes({ flatten: true })[0].textContent;
        expect(inlineAlertText).toBe('Foo');
    });

    describe('accessibility - Inline Alert', () => {
        test('inline-alert component is accessible', async () => {
            const el = await fixture(html`<cre8-inline-alert status="error" icontitle="Error message">In-line ERROR Message.</cre8-inline-alert>`);
            return expect(el).toBeAccessible();
        });

        test('inline-alert transparent variant is accessible', async () => {
            const el = await fixture(html`<cre8-inline-alert status="error" variant="transparent" icontitle="Error message">In-line ERROR Message.</cre8-inline-alert>
      `);
            return expect(el).toBeAccessible();
        });
    });
});
