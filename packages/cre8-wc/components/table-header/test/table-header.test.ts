import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../table-header';
import { cre8TableHeader } from '../table-header';

describe('table-header', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8TableHeader>(html`<cre8-table-header></cre8-table-header>`);
        const tableHeader = el.shadowRoot.querySelector('.cre8-c-table__header');

        expect(el.shadowRoot).toBeTruthy();
        expect(tableHeader).toBeTruthy();
    });
});
