import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../table';
import '../../table-header/table-header';
import '../../table-body/table-body';
import '../../table-row/table-row';
import '../../table-cell/table-cell';
import '../../table-header-cell/table-header-cell';
import { Cre8Table } from '../table';

/**
 * The flattened API builds the same composition an author would write by hand,
 * into the light DOM. These tests hold that promise: the generated markup has to
 * be the hand-written markup, or every `::slotted()` rule and every consumer
 * that reaches into the table quietly breaks.
 */
describe('table: flattened columns/rows API', () => {
    const columns = [
        { label: 'Model', key: 'model' },
        { label: 'Requests', key: 'req', width: '20%' },
    ];
    const rows = [
        { model: 'claude-3-5-sonnet', req: '5,267' },
        { model: 'gpt-4o', req: '4,368' },
    ];

    test('builds header, body, rows and cells in the light DOM', async () => {
        const el = await fixture<Cre8Table>(html`<cre8-table></cre8-table>`);
        el.columns = columns;
        el.rows = rows;
        await el.updateComplete;

        expect(el.querySelectorAll('cre8-table-header')).toHaveLength(1);
        expect(el.querySelectorAll('cre8-table-body')).toHaveLength(1);
        // One header row plus one per data row.
        expect(el.querySelectorAll('cre8-table-row')).toHaveLength(3);
        expect(el.querySelectorAll('cre8-table-header-cell')).toHaveLength(2);
        expect(el.querySelectorAll('cre8-table-cell')).toHaveLength(4);
    });

    test('nests cells inside rows inside a body, not flat under the table', async () => {
        const el = await fixture<Cre8Table>(html`<cre8-table></cre8-table>`);
        el.columns = columns;
        el.rows = rows;
        await el.updateComplete;

        // Skipping a level renders but is subtly wrong, so assert the whole chain.
        const body = el.querySelector('cre8-table-body')!;
        const row = body.querySelector(':scope > cre8-table-row')!;
        expect(row).toBeTruthy();
        expect(row.querySelector(':scope > cre8-table-cell')?.textContent).toBe('claude-3-5-sonnet');
        expect(el.querySelector(':scope > cre8-table-cell')).toBeNull();
    });

    test('accepts rows as arrays positioned to match the columns', async () => {
        const el = await fixture<Cre8Table>(html`<cre8-table></cre8-table>`);
        el.columns = columns;
        el.rows = [['gemini-1.5-pro', '1,927']];
        await el.updateComplete;

        const cells = [...el.querySelectorAll('cre8-table-cell')].map((c) => c.textContent);
        expect(cells).toEqual(['gemini-1.5-pro', '1,927']);
    });

    test('stamps each cell with its column header, which responsive mode needs', async () => {
        const el = await fixture<Cre8Table>(html`<cre8-table behavior="responsive"></cre8-table>`);
        el.columns = columns;
        el.rows = rows;
        await el.updateComplete;

        const first = el.querySelector('cre8-table-cell')!;
        expect(first.getAttribute('dataHeader')).toBe('Model');
    });

    test('passes a column width through to the header cell', async () => {
        const el = await fixture<Cre8Table>(html`<cre8-table></cre8-table>`);
        el.columns = columns;
        el.rows = rows;
        await el.updateComplete;

        const headerCells = el.querySelectorAll('cre8-table-header-cell');
        expect(headerCells[1].getAttribute('width')).toBe('20%');
    });

    test('reuses elements when the data changes, rather than rebuilding', async () => {
        const el = await fixture<Cre8Table>(html`<cre8-table></cre8-table>`);
        el.columns = columns;
        el.rows = rows;
        await el.updateComplete;

        const firstRow = el.querySelector('cre8-table-body cre8-table-row');
        el.rows = [
            { model: 'claude-3-5-sonnet', req: '9,999' },
            { model: 'gpt-4o', req: '4,368' },
        ];
        await el.updateComplete;

        // Rebuilding would drop focus and scroll position on every data tick.
        expect(el.querySelector('cre8-table-body cre8-table-row')).toBe(firstRow);
        const cells = [...el.querySelectorAll('cre8-table-cell')].map((c) => c.textContent);
        expect(cells[1]).toBe('9,999');
    });

    test('removes rows when the data shrinks', async () => {
        const el = await fixture<Cre8Table>(html`<cre8-table></cre8-table>`);
        el.columns = columns;
        el.rows = rows;
        await el.updateComplete;

        el.rows = [rows[0]];
        await el.updateComplete;
        expect(el.querySelectorAll('cre8-table-body cre8-table-row')).toHaveLength(1);
    });

    test('leaves a hand-composed table alone', async () => {
        const el = await fixture<Cre8Table>(html`
      <cre8-table>
        <cre8-table-body>
          <cre8-table-row><cre8-table-cell>Authored</cre8-table-cell></cre8-table-row>
        </cre8-table-body>
      </cre8-table>
    `);
        await el.updateComplete;

        // No data props set, so nothing is generated and the author's markup stands.
        expect(el.querySelectorAll('[data-cre8-generated]')).toHaveLength(0);
        expect(el.querySelector('cre8-table-cell')?.textContent).toBe('Authored');
    });
});
