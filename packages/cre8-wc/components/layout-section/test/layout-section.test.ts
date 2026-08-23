import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../layout-section';
import { Cre8LayoutSection } from '../layout-section';

describe('layout-section', () => {
    test('renders correctly', async () => {
        const el = await fixture<Cre8LayoutSection>(html`<cre8-layout-section></cre8-layout-section>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class name with sticky behavior', async () => {
        const el = await fixture<Cre8LayoutSection>(html`<cre8-layout-section behavior="sticky"></cre8-layout-section>`);
        const section = el.shadowRoot!.querySelector('.cre8-c-layout-section');
        expect(section.classList.contains('cre8-c-layout-section--sticky')).toBeTruthy();
    });

    test('does not fill its parent height by default', async () => {
        const el = await fixture<Cre8LayoutSection>(html`<cre8-layout-section></cre8-layout-section>`);
        const section = el.shadowRoot!.querySelector('.cre8-c-layout-section');
        expect(section.classList.contains('cre8-c-layout-section--full-height')).toBeFalsy();
    });

    test('has the full-height class when fullHeight is set', async () => {
        const el = await fixture<Cre8LayoutSection>(html`<cre8-layout-section fullHeight></cre8-layout-section>`);
        const section = el.shadowRoot!.querySelector('.cre8-c-layout-section');
        expect(section.classList.contains('cre8-c-layout-section--full-height')).toBeTruthy();
    });

    describe('accessibility - Layout Section', () => {
        test('tests accessibility for a simple layout section', async () => {
            const el = await fixture<Cre8LayoutSection>(html`<cre8-layout-section>Content</cre8-layout-section>`);
            return expect(el).toBeAccessible();
        });
    });
});
