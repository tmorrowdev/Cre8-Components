import { html } from 'lit';
import { spread } from '../../directives/spread';
import './band';


export default {
  title: 'DEPRECATED/DO NOT USE/Band',
  component: 'cre8-band',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-band ${spread(args)}>Default band</cre8-band>`;

export const Branded = () => html`<cre8-band variant="branded">Branded Band</cre8-band>`;
