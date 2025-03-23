import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../alert';
import { cre8Alert } from '../alert';


describe('alert', () => {
    test('renders correctly', async () => {
        const el = await fixture(html`<cre8-alert status = "info" variant = "standalone"></cre8-alert>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with status', async () => {
        const statuses = ['error', 'info', 'notification', 'neutral', 'warning', 'success'];

        for (const status of statuses) {
            const el = await fixture<cre8Alert>(html`<cre8-alert status="${status}"></cre8-alert>`);
            const alert = el.shadowRoot!.querySelector('.cre8-c-alert');
            expect(alert.classList.contains(`cre8-c-alert--${status}`)).toBeTruthy();
        }
    });

    test('has the correct class names with variant', async () => {
        const variants = ['standalone', 'banner'];

        for (const variant of variants) {
            const el = await fixture<cre8Alert>(html`<cre8-alert variant="${variant}"></cre8-alert>`);
            const alert = el.shadowRoot!.querySelector('.cre8-c-alert'); // Test for the class change
            expect(alert.classList.contains(`cre8-c-alert--${variant}`)).toBeTruthy();
        }
    });

    describe('accessibility - Alert', () => {
        test('alert component is accessible', async () => {
            const el = await fixture(html`
                <cre8-alert status="error" headerText="Message Test Heading" bodyText="Message Test Body">
                <cre8-button variant="secondary" slot="cta" text="Button"></cre8-button>
                </cre8-alert>`);
            return expect(el).toBeAccessible();
        });

        test('alert variant is accessible', async () => {
            const el = await fixture(html`
                <cre8-alert status="error" varriant="banner" headerText="Message Test Heading" bodyText="Message Test Body">
                <cre8-button variant="secondary" slot="cta" text="Button"></cre8-button>
                </cre8-alert>`);
            return expect(el).toBeAccessible();
        });
    });
});
