import { fixture } from '@open-wc/testing-helpers';
import { html } from 'lit';
import '../button-group';
import { cre8ButtonGroup } from '../button-group';

describe('button-group', () => {
    test('renders correctly', async () => {
        const el = await fixture<cre8ButtonGroup>(html`<cre8-button-group>
      <cre8-button variant="primary" text="Button"></cre8-button>
      <cre8-button variant="tertiary" text="Button"></cre8-button>
    </cre8-button-group>`);
        expect(el.shadowRoot).toBeTruthy();
    });

    test('has the correct orientation class name', async () => {
        const el = await fixture<cre8ButtonGroup>(html`<cre8-button-group orientation="responsive-full-width">
      <cre8-button variant="primary" text="Button"></cre8-button>
      <cre8-button variant="tertiary" text="Button"></cre8-button>
    </cre8-button-group>`);
        const buttonGroup = el.shadowRoot.querySelector('.cre8-c-button-group'); // Test for the class change
        expect(buttonGroup.classList).toContain('cre8-c-button-group--responsive-full-width');
    });
});
