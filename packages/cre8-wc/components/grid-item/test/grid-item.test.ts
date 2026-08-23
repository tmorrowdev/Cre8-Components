import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../grid-item';
import { Cre8GridItem } from '../grid-item';

describe('grid-item', () => {
    test('renders correctly', async () => {
        const el = await fixture<Cre8GridItem>(html`<cre8-grid-item></cre8-grid-item>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('does not fill its parent height by default', async () => {
        const el = await fixture<Cre8GridItem>(html`<cre8-grid-item></cre8-grid-item>`);
        const item = el.shadowRoot!.querySelector('.cre8-c-grid__item');
        expect(item.classList.contains('cre8-c-grid__item--full-height')).toBeFalsy();
    });

    test('has the full-height class when fullHeight is set', async () => {
        const el = await fixture<Cre8GridItem>(html`<cre8-grid-item fullHeight></cre8-grid-item>`);
        const item = el.shadowRoot!.querySelector('.cre8-c-grid__item');
        expect(item.classList.contains('cre8-c-grid__item--full-height')).toBeTruthy();
    });

    describe('accessibility - Grid Item', () => {
        test('tests accessibility for a simple grid item', async () => {
            const el = await fixture<Cre8GridItem>(html`<cre8-grid-item>Content</cre8-grid-item>`);
            return expect(el).toBeAccessible();
        });
    });
});
