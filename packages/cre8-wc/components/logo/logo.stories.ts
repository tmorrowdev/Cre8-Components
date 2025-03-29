/* eslint-disable max-len */
import { html } from 'lit';
import { spread } from '../../directives/spread';
import './logo';

export default {
  title: 'Cre8 Components/Logo',
  component: 'cre8-logo',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-logo ${spread(args)}></cre8-logo>`;
