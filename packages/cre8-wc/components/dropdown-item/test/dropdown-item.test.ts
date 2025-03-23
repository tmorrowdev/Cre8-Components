import { fixture, oneEvent } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { cre8DropdownItem } from '../dropdown-item';
import '../../dropdown/dropdown';
import '../dropdown-item';

describe('dropdown', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8DropdownItem>(html`
          <cre8-dropdown-item>Item</cre8-dropdown-item>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('render dropdown item as a button by default', async () => {
        const el = await fixture<cre8DropdownItem>(html`
          <cre8-dropdown-item>Item 1</cre8-dropdown-item>`);
        const button = el.shadowRoot.querySelector('button');
        expect(button).toBeTruthy();
    });

    test('dispatches a custom event when the item is clicked', async () => {
        const el = await fixture<cre8DropdownItem>(html`
          <cre8-dropdown-item>Item 1</cre8-dropdown-item>`);
        const button = el.shadowRoot.querySelector('button');
        setTimeout(() => button.click());
        const event = await oneEvent(el, 'dropdown-item-selected');
        expect(event).toBeTruthy();
    });

    describe('accessibility -  DropdownItem', () => {
        test('tests accessibility for default dropdown item', async () => {
            const el = await fixture<cre8DropdownItem>(html`
            <cre8-dropdown buttonText="menu">
                <cre8-dropdown-item>item</cre8-dropdown-item>
                </cre8-dropdown>
            `);
            return expect(el).toBeAccessible();
        });
    });
});
