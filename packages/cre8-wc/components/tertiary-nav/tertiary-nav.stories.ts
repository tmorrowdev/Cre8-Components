import {html} from 'lit';
import {spread} from '../../directives/spread';
import { withActions } from '@storybook/addon-actions/decorator';
import './tertiary-nav';
import '../tertiary-nav-item/tertiary-nav-item';

export default {
  title: 'Cre8 Components/Tertiary Nav',
  component: 'cre8-tertiary-nav',
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['click']
    },
  },
  decorators: [withActions],
};

export const Default = (args) => html`
<cre8-tertiary-nav ${spread(args)}>
  <cre8-tertiary-nav-item href="#" ?isCurrent=${true}>Tertiary Nav Item 1</cre8-tertiary-nav-item>
  <cre8-tertiary-nav-item href="#">Tertiary Nav Item 2</cre8-tertiary-nav-item>
  <cre8-tertiary-nav-item href="#">Tertiary Nav Item 3</cre8-tertiary-nav-item>
  <cre8-tertiary-nav-item href="#">Tertiary Nav Item 4</cre8-tertiary-nav-item>
  <cre8-tertiary-nav-item href="#">Tertiary Nav Item 5</cre8-tertiary-nav-item>
</cre8-tertiary-nav>`

export const FullWidth = (args) => html`
<cre8-tertiary-nav ${spread(args)} ?fullWidth=${true}>
  <cre8-tertiary-nav-item href="#" ?isCurrent=${true}>Tertiary Nav Item 1</cre8-tertiary-nav-item>
  <cre8-tertiary-nav-item href="#">Tertiary Nav Item 2</cre8-tertiary-nav-item>
  <cre8-tertiary-nav-item href="#">Tertiary Nav Item 3</cre8-tertiary-nav-item>
  <cre8-tertiary-nav-item href="#">Tertiary Nav Item 4</cre8-tertiary-nav-item>
  <cre8-tertiary-nav-item href="#">Tertiary Nav Item 5</cre8-tertiary-nav-item>
</cre8-tertiary-nav>`
