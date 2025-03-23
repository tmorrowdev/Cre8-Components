import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../divider';
import { cre8Divider } from '../divider';

describe('divider', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8Divider>(html`
          <cre8-divider></cre8-divider>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with variant', async () => {
        const variants = ['vertical'];

        for (const variant of variants) {
            const el = await fixture<cre8Divider>(html`<cre8-divider
            variant="${variant}"></cre8-divider>`);
            const divider = el.shadowRoot!.querySelector('.cre8-c-divider'); // Test for the class change
            expect(divider.classList.contains(`cre8-c-divider--${variant}`)).toBeTruthy();
        }
    });

    test('has the correct class names with status', async () => {
        const statuses = ['brand', 'knockout'];

        for (const status of statuses) {
            const el = await fixture<cre8Divider>(html`<cre8-divider status="${status}"></cre8-divider>`);
            const divider = el.shadowRoot!.querySelector('.cre8-c-divider'); // Test for the class change
            expect(divider.classList.contains(`cre8-c-divider--${status}`)).toBeTruthy();
        }
    });

    describe('accessibility -  Divider', () => {
        test('tests accessibility for default divider', async () => {
            const el = await fixture<cre8Divider>(html`<cre8-divider></cre8-divider>`);
            return expect(el).toBeAccessible();
        });
    });
});
