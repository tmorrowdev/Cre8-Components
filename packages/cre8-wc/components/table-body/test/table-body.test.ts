import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../table-body';
import { cre8TableBody } from '../table-body';

describe('table-body', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8TableBody>(html`<cre8-table-body></cre8-table-body>`);
        const tableBody = el.shadowRoot.querySelector('.cre8-c-table__body');

        expect(el.shadowRoot).toBeTruthy();
        expect(tableBody).toBeTruthy();
    });
});
