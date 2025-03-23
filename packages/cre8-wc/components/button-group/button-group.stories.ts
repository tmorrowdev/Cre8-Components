import {html} from 'lit';
import {spread} from '../../directives/spread';
import './button-group';

export default {
  title: 'DEPRECATED/DO NOT USE/Button Group',
  component: 'cre8-button-group',
  parameters: { status: { type: 'beta' } },
};

export const Default = (args) => html`<cre8-button-group ${spread(args)}>
  <cre8-button variant="primary" text="Button"></cre8-button>
  <cre8-button variant="tertiary" text="Button"></cre8-button>
</cre8-button-group>`;

export const ResponsiveFullWidth = (args) => html`<cre8-button-group ${spread(args)} orientation="responsive-full-width">
  <cre8-button variant="primary" text="Button"}></cre8-button>
  <cre8-button variant="tertiary" text="Button"></cre8-button>
</cre8-button-group>`;

export const BorderToShowAlignment = (args) => html`<cre8-button-group style="border: 1px solid red; display: inline-flex;" ${spread(args)}>
  <cre8-button variant="primary" text="Button"></cre8-button>
  <cre8-button variant="secondary" text="Button"></cre8-button>
  <cre8-button variant="tertiary" text="Button"></cre8-button>
</cre8-button-group>`;
