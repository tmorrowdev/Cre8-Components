import { html } from 'lit';
import { spread } from '../../../directives/spread';
import './icon-description';

export default {
  title: 'Examples/Icon Description',
  component: 'icon-description',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html` <icon-description ${spread(args)} verticalAlign="center" size="sm">
  <cre8-icon-legacy name="order-status" slot="header"></cre8-icon-legacy>Enrolled in auto refill
</icon-description>`;
