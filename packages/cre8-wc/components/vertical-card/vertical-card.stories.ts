import { html } from 'lit';
import { spread } from '../../directives/spread';
import '../heading/heading';
import '../text-passage/text-passage';
import './vertical-card';

export default {
  title: 'DEPRECATED/DO NOT USE/Vertical Card',
  component: 'cre8-vertical-card',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-vertical-card ${spread(args)}>
  <cre8-heading headingTagName="h2" variant="display-default">Default Vertical Card Title</cre8-heading>
  <cre8-text-passage>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</cre8-text-passage
  >
</cre8-vertical-card>`;

export const Secondary = () => html`<cre8-vertical-card variant="secondary">
  <cre8-heading headingTagName="h2" variant="display-default">Secondary Vertical Card Title</cre8-heading>
  <cre8-text-passage>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </cre8-text-passage>
</cre8-vertical-card>`;

export const Tertiary = () => html`<cre8-vertical-card variant="tertiary">
  <cre8-heading headingTagName="h2" variant="display-default">Tertiary Vertical Card Title</cre8-heading>
  <cre8-text-passage>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </cre8-text-passage>
</cre8-vertical-card>`;
