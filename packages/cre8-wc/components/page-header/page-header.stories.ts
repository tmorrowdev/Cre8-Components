import { html } from 'lit';
import { spread } from '../../directives/spread';
import './page-header';

export default {
  title: 'DEPRECATED/DO NOT USE/Page Header',
  component: 'cre8-page-header',
  parameters: { status: { type: 'notStarted' } }
};

export const Default = (args) => html`<cre8-page-header ${spread(args)} heading="Page header title"> Page header description </cre8-page-header>`;

export const WithTitcre8ter = () =>
  html`<cre8-page-header heading="Page header title">
    Page header description <cre8-badge size="lg" slot="titcre8ter" text="Badge"></cre8-badge>
  </cre8-page-header>`;
