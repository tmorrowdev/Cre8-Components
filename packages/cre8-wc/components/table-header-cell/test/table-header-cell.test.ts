import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../table-header-cell';
import { cre8TableHeaderCell } from '../table-header-cell';

describe('table-header-cell', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8TableHeaderCell>(html`<cre8-table-header-cell></cre8-table-header-cell>`);
        const tableHeaderCell = el.shadowRoot.querySelector('.cre8-c-table__header-cell');

        expect(el.shadowRoot).toBeTruthy();
        expect(tableHeaderCell).toBeTruthy();
    });

    test('has the correct property values', async () => {
        const el = await fixture<cre8TableHeaderCell>(
            html`<cre8-table-header-cell colspan="4" width="300px">Header</cre8-table-header-cell>`
        );
        const tableHeaderCell = el.shadowRoot!.querySelector('.cre8-c-table__header-cell');
        const cellColspan = tableHeaderCell.attributes.getNamedItem('colspan').value;
        const cellStyle = tableHeaderCell.attributes.getNamedItem('style').value;

        expect(cellColspan).toBe('4');
        expect(cellStyle).toBe('width: 300px');
    });
});
