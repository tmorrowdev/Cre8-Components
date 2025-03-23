import svgHelp from '@cre8/cre8-icons/lib/icons/System/Regular/Help.svg?raw';
import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../link';

describe('link', () => {
    test('renders correctly', async () => {
        const el = await fixture(html`<cre8-link></cre8-link>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct default text', async () => {
        const el = await fixture(html`<cre8-link href="#">MamaLuigi</cre8-link>`);
        const linkTextSlot = el.shadowRoot.querySelector('slot');
        const inlineAlertText = linkTextSlot.assignedNodes({ flatten: true })[0].textContent;
        expect(inlineAlertText).toBe('MamaLuigi');
    });

    test('works with an href', async () => {
        const el = await fixture(html`<cre8-link href="https://www.cfpb.gov"></cre8-link>`);
        const link = el.shadowRoot.querySelector('a');
        expect(link).toBeTruthy();
    });

    test('works with an href and an iconPosition before', async () => {
        const el = await fixture(html`<cre8-link href="https://www.cfpb.gov" iconPosition="before" iconName="keyboard-arrow-right"></cre8-link>`);
        const link = el.shadowRoot.querySelector('a');
        const linkText = el.shadowRoot.querySelector<HTMLSpanElement>('.cre8-c-link__text');
        const previousElement = linkText.previousElementSibling as HTMLElement;
        expect(previousElement.className === 'cre8-c-link__icon-wrapper').toBeTruthy();
        expect(link).toBeTruthy();
    });

    test('works with an href, svgIcon, and an iconPosition before', async () => {
        const el = await fixture(html`<cre8-link href="https://www.cfpb.gov" iconPosition="before" svg="${svgHelp}"></cre8-link>`);
        const link = el.shadowRoot.querySelector('a');
        const linkText = el.shadowRoot.querySelector<HTMLSpanElement>('.cre8-c-link__text');
        const previousElement = linkText.previousElementSibling as HTMLElement;
        expect(previousElement.className === 'cre8-c-link__icon-wrapper').toBeTruthy();
        expect(link).toBeTruthy();
    });

    test('works with an href and an iconPosition after', async () => {
        const el = await fixture(html`<cre8-link href="https://www.cfpb.gov" iconPosition="after" iconName="keyboard-arrow-right"></cre8-link>`);
        const link = el.shadowRoot.querySelector('a');
        const linkText = el.shadowRoot.querySelector<HTMLSpanElement>('.cre8-c-link__text');
        const nextElement = linkText.nextElementSibling as HTMLElement;
        expect(nextElement.className === 'cre8-c-link__icon-wrapper').toBeTruthy();
        expect(link).toBeTruthy();
    });

    describe('accessibility -  Link', () => {
        test('tests accessibility for default link', async () => {
            const el = await fixture(html`<cre8-link href="https://www.cfpb.gov" target="_blank">MamaLuigi</cre8-link>`);
            return expect(el).toBeAccessible();
        });
    });
});
