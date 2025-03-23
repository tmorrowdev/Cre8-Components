import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import { cre8Dropdown } from '../dropdown';
import '../../dropdown-item/dropdown-item';
import '../dropdown';


describe('dropdown', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8Dropdown>(html`
          <cre8-dropdown></cre8-dropdown>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('toggles the dropdown menu on button click', async () => {
        const el = await fixture<cre8Dropdown>(html`
          <cre8-dropdown buttonText="menu"></cre8-dropdown>`);
        const button = el.shadowRoot.querySelector('button');
        const ul = el.shadowRoot.querySelector('ul');
        expect(ul.classList.contains('cre8-c-dropdown--open')).toBeFalsy();

        button.click();
        await el.updateComplete;
        expect(ul.classList.contains('cre8-c-dropdown--open')).toBeTruthy();

        button.click();
        await el.updateComplete;
        expect(ul.classList.contains('cre8-c-dropdown--open')).toBeFalsy();
    });

    test('render the link instead of dropdown when dropdownWithLink is true', async () => {
        const el = await fixture<cre8Dropdown>(html`
          <cre8-dropdown buttonText="Menu" dropdownWithLink=true>
          <cre8-dropdown-item>item 1</cre8-dropdown-item>
          <cre8-dropdown-item>item 2</cre8-dropdown-item>
          </cre8-dropdown>`);
        const link = el.shadowRoot!.querySelector('a');
        expect(link).toBeDefined();
    });

    describe('accessibility -  Dropdown', () => {
        test('tests accessibility for default dropdown', async () => {
            const el = await fixture<cre8Dropdown>(html`
            <cre8-dropdown buttonText="menu">
                <cre8-dropdown-item aria-label='Link to AA' href='/aa'>item</cre8-dropdown-item>
            </cre8-dropdown>`);
            return expect(el).toBeAccessible();
        });
    });
});
