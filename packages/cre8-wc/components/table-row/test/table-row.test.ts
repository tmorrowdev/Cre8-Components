import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../table-row';
import { cre8TableRow } from '../table-row';

describe('table-row', () => {
    test('renders correctly', async () => {
        const el = await fixture(html`<cre8-table-row></cre8-table-row>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct class names with variant', async () => {
        const variants = ['bare'];

        for (const variant of variants) {
            const el = await fixture<cre8TableRow>(
                html`<cre8-table-row variant="${variant}"></cre8-table-row>`
            );
            const tableRow = el.shadowRoot!.querySelector('.cre8-c-table__row');
            expect(tableRow.classList.contains(`cre8-c-table__row--${variant}`)).toBeTruthy();
        }
    });

    test('isExpandable renders elements correctly correctly', async () => {
        const el = await fixture<cre8TableRow>(html`<cre8-table-row isExpandable></cre8-table-row>`);
        const tableRow = el.shadowRoot.querySelector('.cre8-c-table__row');
        expect(tableRow.classList.contains('cre8-c-table__row--expandable')).toBeTruthy();
    });

    test('isExpanded renders elements correctly', async () => {
        const el = await fixture<cre8TableRow>(html`<cre8-table-row isExpandable isExpanded></cre8-table-row>`);
        const tableRow = el.shadowRoot.querySelector('.cre8-c-table__row');
        expect(tableRow.classList.contains('cre8-is-expanded')).toBeTruthy();
    });

    test('toggles correctly', async () => {
        const el = await fixture<cre8TableRow>(html`<cre8-table-row isExpandable></cre8-table-row>`);
        expect(el.isExpanded).toBeFalsy();
        el.toggleIsExpanded();
        expect(el.isExpanded).toBeTruthy();
        el.toggleIsExpanded();
        expect(el.isExpanded).toBeFalsy();
    });
});
