import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../breadcrumbs-item';
import '../../breadcrumbs/breadcrumbs';
import '../../link/link';

describe('breadcrumbs-item', () => {
    test('renders correctly', async () => {
        const el = await fixture(html`<cre8-breadcrumbs-item>Item</cre8-breadcrumbs-item>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('tests accessibility for default breadcrumbs item', async () => {
        const el = await fixture(html`<cre8-breadcrumbs>
            <cre8-breadcrumbs-item>Item</cre8-breadcrumbs-item> </cre8-breadcrumbs>`);
        return expect(el).toBeAccessible();
    });
});
