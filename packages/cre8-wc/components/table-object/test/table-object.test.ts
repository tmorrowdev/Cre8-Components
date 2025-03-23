import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../table-object';
import { cre8TableObject } from '../table-object';

describe('table-object', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8TableObject>(html`<cre8-table-object></cre8-table-object>`);
        const tableObject = el.shadowRoot.querySelector('.cre8-c-table-object');

        expect(el.shadowRoot).toBeTruthy();
        expect(tableObject).toBeTruthy();
    });

    test('has a slotted header and footer', async () => {
        const el = await fixture<cre8TableObject>(html`
        <cre8-table-object>
            <div slot="header">Header</div>
            <div>Table Object Content</div>
            <div slot="footer">Footer</div>
        </cre8-table-object>
        `);

        const header = el.shadowRoot.querySelector('[slot="header"]');
        expect(header).toBeDefined;

        const footer = el.shadowRoot.querySelector('[slot="footer"]');
        expect(footer).toBeDefined;
    });
});
