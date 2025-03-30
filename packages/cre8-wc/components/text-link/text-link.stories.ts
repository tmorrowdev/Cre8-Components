import { html } from 'lit';
import { spread } from '../../directives/spread';
import './text-link';

export default {
  title: 'Cre8 Components/Text Link',
  component: 'cre8-text-link',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-text-link ${spread(args)} href="#">Text Link</cre8-text-link>`;
export const Secondary = () => html`<cre8-text-link variant="secondary" href="#">Secondary Text Link</cre8-text-link>`;
export const Display = () => html`<cre8-text-link variant="display" href="#">Display Text Link</cre8-text-link>`;
export const Inverted = () =>
  html`<div style="padding: 1rem; background:#000"><cre8-text-link ?inverted=${true} href="#">Inverted Text Link</cre8-text-link></div>`;
export const Small = () => html`<cre8-text-link size="sm" href="#">Small Text Link</cre8-text-link>`;
