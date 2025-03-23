import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../table-cell';
import { cre8TableCell } from '../table-cell';

describe('table-cell', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8TableCell>(html`<cre8-table-cell></cre8-table-cell>`);
        const tableCell = el.shadowRoot.querySelector('.cre8-c-table__cell');

        expect(el.shadowRoot).toBeTruthy();
        expect(tableCell).toBeTruthy();
    });

    test('has the correct class names with variant', async () => {
        const variants = ['bare'];

        for (const variant of variants) {
            const el = await fixture<cre8TableCell>(
                html`<cre8-table-cell variant="${variant}"></cre8-table-cell>`
            );
            const tableCell = el.shadowRoot!.querySelector('.cre8-c-table__cell');
            expect(tableCell.classList.contains(`cre8-c-table__cell--${variant}`)).toBeTruthy();
        }
    });
});
