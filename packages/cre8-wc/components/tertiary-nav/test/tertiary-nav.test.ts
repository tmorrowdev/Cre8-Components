import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../tertiary-nav';
import { cre8TertiaryNavItem } from '../../tertiary-nav-item/tertiary-nav-item';

describe('tertiary-nav', () => {
    test('renders correctly', async () => {
        const el = await fixture(html`<cre8-tertiary-nav></cre8-tertiary-nav>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('works with full width', async () => {
        const el = await fixture(html`<cre8-tertiary-nav fullWidth></cre8-tertiary-nav>`);
        const tertiaryNav = el.shadowRoot.querySelector('.cre8-c-tertiary-nav');
        expect(tertiaryNav.classList.contains('cre8-c-tertiary-nav--full-width')).toBeTruthy;
    });

    test('has the correct items', async () => {
        const el = await fixture(html`<cre8-tertiary-nav><cre8-tertiary-nav-item>Foo</cre8-tertiary-nav-item></cre8-tertiary-nav>`);
        const tertiaryNavSlot = el.shadowRoot.querySelector('slot');
        const tertiaryNavItems = tertiaryNavSlot.assignedElements({ flatten: false }) as cre8TertiaryNavItem[];
        expect(tertiaryNavItems[0].tagName === 'cre8-TERTIARY-NAV-ITEM').toBeTruthy;
    });
});
