import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../tertiary-nav-item';
import { cre8TertiaryNavItem } from '../tertiary-nav-item';
import '../../tertiary-nav/tertiary-nav';

describe('tertiary-nav-item', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8TertiaryNavItem>(html`<cre8-tertiary-nav-item></cre8-tertiary-nav-item>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('renders a list item with link and slot content', async () => {
        const content = 'Item 1';
        const href = '/page';

        const el = await fixture<cre8TertiaryNavItem>(html`
      <cre8-tertiary-nav-item href=${href}>${content}</cre8-tertiary-nav-item>
    `);

        const listItem = el.shadowRoot.querySelector('li');
        const link = el.shadowRoot.querySelector('a');
        const slotContent = el.shadowRoot.querySelector('slot').assignedNodes()[0].textContent;

        expect(listItem).toBeDefined;
        expect(link).toBeDefined;
        expect(slotContent).toEqual(content);
        expect(link.getAttribute('href')).toEqual(href);
        expect(link.getAttribute('aria-current')).toBeFalsy();
    });

    test('works with isCurrent', async () => {
        const el = await fixture<cre8TertiaryNavItem>(html`<cre8-tertiary-nav-item isCurrent></cre8-tertiary-nav-item>`);
        const tertiaryNavItem = el.shadowRoot.querySelector('.cre8-c-tertiary-nav-item');
        const link = el.shadowRoot.querySelector('a');
        expect(tertiaryNavItem.classList.contains('cre8-is-current')).toBeTruthy;
        expect(link.getAttribute('aria-current')).toBe('page');
    });

    test('works with a href', async () => {
        const el = await fixture<cre8TertiaryNavItem>(html`<cre8-tertiary-nav-item href="#"></cre8-tertiary-nav-item>`);
        const tertiaryNavItemLink = el.shadowRoot.querySelector('a');
        expect(tertiaryNavItemLink.getAttribute('href')).toBeTruthy();
    });

    test('adds isCurrent class when clicked and removes it from other items', async () => {
        const el = await fixture<cre8TertiaryNavItem>(html`
    <cre8-tertiary-nav>
      <cre8-tertiary-nav-item><button></button></cre8-tertiary-nav-item>
      <cre8-tertiary-nav-item><button></button></cre8-tertiary-nav-item>
      <cre8-tertiary-nav-item><button></button></cre8-tertiary-nav-item>
    </cre8-tertiary-nav>
    `);

        const elItem1 = el.querySelector('cre8-tertiary-nav-item');
        const elItem1Button = el.querySelector('cre8-tertiary-nav-item').querySelector('button');
        elItem1Button.click();
        expect(elItem1.isCurrent).toBeTruthy();

        const elItem2 = el.querySelector<cre8TertiaryNavItem>('cre8-tertiary-nav-item:nth-child(2)');
        const elItem2Button = el.querySelector<cre8TertiaryNavItem>('cre8-tertiary-nav-item:nth-child(2)').querySelector('button');
        elItem2Button.click();
        expect(elItem2.isCurrent).toBeTruthy();
        expect(elItem1.isCurrent).toBeFalsy();
    });
});

