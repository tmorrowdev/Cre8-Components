import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../card';
import { cre8Card } from '../card';

describe('card', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8Card>(html`<cre8-card></cre8-card>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('renders footer and header', async () => {
        const el = await fixture<cre8Card>(html`<cre8-card>
      <h2 slot="header">Header</h2>
      <p>Body</p>
      <p slot="footer">Footer</p>
    </cre8-card>`);
        const header: HTMLElement = el.shadowRoot.querySelector('.cre8-c-card__header');
        const footer: HTMLElement = el.shadowRoot.querySelector('.cre8-c-card__footer');
        expect(header).toBeTruthy();
        expect(footer).toBeTruthy();
    });

    test('has the correct class names with variant', async () => {
        const variants = ['bare', 'horizontal', 'horizontal-bare'];

        for (const variant of variants) {
            const el = await fixture<cre8Card>(html`<cre8-card variant="${variant}"></cre8-card>`);
            const card = el.shadowRoot!.querySelector('.cre8-c-card'); // Test for the class change
            expect(card.classList.contains(`cre8-c-card--${variant}`)).toBeTruthy();
        }
    });

    test('has the correct class names with center alignment', async () => {
        const el = await fixture<cre8Card>(html`<cre8-card align="center"></cre8-card>`);
        const card = el.shadowRoot!.querySelector('.cre8-c-card'); // Test for the class change
        expect(card.classList.contains('cre8-c-card--align-center')).toBeTruthy();
    });

    describe('accessibility -  Card', () => {
        test('tests accessibility for a simple composed card', async () => {
            const el = await fixture<cre8Card>(html`<cre8-card>
        <h2 slot="header">Header</h2>
        <p>Body</p>
        <p slot="footer">Footer</p>
      </cre8-card>`);
            return expect(el).toBeAccessible();
        });
    });
});
