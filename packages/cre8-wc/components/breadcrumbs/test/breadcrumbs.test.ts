import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../breadcrumbs';
import { cre8Breadcrumbs } from '../breadcrumbs';
import '../../breadcrumbs-item/breadcrumbs-item';
import '../../link/link';

describe('breadcrumbs', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8Breadcrumbs>(html`<cre8-breadcrumbs
      ><cre8-breadcrumbs-item><cre8-link href="#">Grandparent</cre8-link></cre8-breadcrumbs-item>
      <cre8-breadcrumbs-item><cre8-link href="#">Parent</cre8-link></cre8-breadcrumbs-item>
      <cre8-breadcrumbs-item>Current</cre8-breadcrumbs-item>
    </cre8-breadcrumbs>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('tests accessibility for default breadcrumbs', async () => {
        const el = await fixture<cre8Breadcrumbs>(html`<cre8-breadcrumbs
      ><cre8-breadcrumbs-item><cre8-link href="#">Grandparent</cre8-link></cre8-breadcrumbs-item>
      <cre8-breadcrumbs-item><cre8-link href="#">Parent</cre8-link></cre8-breadcrumbs-item>
      <cre8-breadcrumbs-item>Current</cre8-breadcrumbs-item>
    </cre8-breadcrumbs>`);
        return expect(el).toBeAccessible();
    });
});
