import { html } from 'lit';
import { spread } from '../../directives/spread';
import '../link-list-item/link-list-item';
import './link-list';

export default {
  title: 'Cre8 Components/Link List',
  component: 'cre8-link-list',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-link-list ${spread(args)}>
  <cre8-link-list-item href="#">Link item 1</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 2</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 3 with a longer title</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 4</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 5</cre8-link-list-item>
</cre8-link-list>`;

export const Secondary = () => html`<cre8-link-list variant="secondary">
  <cre8-link-list-item href="#">Link item 1</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 2</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 3 with a longer title</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 4</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 5</cre8-link-list-item>
</cre8-link-list>`;

export const Inverted = () => html`<div style="background: black">
  <cre8-link-list inverted="true">
    <cre8-link-list-item href="#">Link item 1</cre8-link-list-item>
    <cre8-link-list-item href="#">Link item 2</cre8-link-list-item>
    <cre8-link-list-item href="#">Link item 3 with a longer title</cre8-link-list-item>
    <cre8-link-list-item href="#">Link item 4</cre8-link-list-item>
    <cre8-link-list-item href="#">Link item 5</cre8-link-list-item>
  </cre8-link-list>
</div>`;

export const Display = () => html` <cre8-link-list variant="display">
  <cre8-link-list-item href="#">Link item 1</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 2</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 3 with a longer title</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 4</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 5</cre8-link-list-item>
</cre8-link-list>`;

export const SecondaryInverted = () => html`<div style="background: black">
  <cre8-link-list variant="secondary" inverted="true">
    <cre8-link-list-item href="#">Link item 1</cre8-link-list-item>
    <cre8-link-list-item href="#">Link item 2</cre8-link-list-item>
    <cre8-link-list-item href="#">Link item 3 with a longer title</cre8-link-list-item>
    <cre8-link-list-item href="#">Link item 4</cre8-link-list-item>
    <cre8-link-list-item href="#">Link item 5</cre8-link-list-item>
  </cre8-link-list>
</div>`;

export const Condensed = () => html`<cre8-link-list spacing="condensed">
  <cre8-link-list-item href="#">Link item 1</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 2</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 3 with a longer title</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 4</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 5</cre8-link-list-item>
</cre8-link-list>`;

export const Small = () => html`<cre8-link-list size="sm">
  <cre8-link-list-item href="#">Link item 1</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 2</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 3 with a longer title</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 4</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 5</cre8-link-list-item>
</cre8-link-list>`;

export const SmallCondensed = () => html`<cre8-link-list size="sm" spacing="condensed">
  <cre8-link-list-item href="#">Link item 1</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 2</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 3 with a longer title</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 4</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 5</cre8-link-list-item>
</cre8-link-list>`;

export const Responsive = () => html`<cre8-link-list behavior="responsive">
  <cre8-link-list-item href="#">Link item 1</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 2</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 3 with a longer title</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 4</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 5</cre8-link-list-item>
</cre8-link-list>`;

export const Horizontal = () => html`<cre8-link-list behavior="horizontal">
  <cre8-link-list-item href="#">Link item 1</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 2</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 3 with a longer title</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 4</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 5</cre8-link-list-item>
</cre8-link-list>`;

export const WithBadge = () => html`<cre8-link-list>
  <cre8-link-list-item href="#">Link item 1</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 2<cre8-badge slot="itemAfter" text="Badge"></cre8-badge></cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 3 with a longer title</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 4</cre8-link-list-item>
  <cre8-link-list-item href="#">Link item 5</cre8-link-list-item>
</cre8-link-list>`;
