import { html } from 'lit';
import { spread } from '../../directives/spread';
import '../list-item/list-item';
import './list';

export default {
  title: 'DEPRECATED/DO NOT USE/List',
  component: 'cre8-list',
  parameters: { status: { type: 'notStarted' } }
};

export const Default = (args) => html`<cre8-list ${spread(args)}>
  <cre8-list-item>First List item</cre8-list-item>
  <cre8-list-item>Second List item</cre8-list-item>
  <cre8-list-item>Third List item</cre8-list-item>
  <cre8-list-item>Fourth List item</cre8-list-item>
  <cre8-list-item>Last List item</cre8-list-item>
</cre8-list>`;

export const Bare = () => html`<cre8-list variant="bare">
  <li>Bare list item</li>
  <li>2nd Bare list item</li>
  <li>3rd Bare list item</li>
</cre8-list>`;

export const Padded = () => html`<cre8-list spacing="padded">
  <cre8-list-item><f-po>Padded list item</f-po></cre8-list-item>
  <cre8-list-item><f-po>Padded list item</f-po></cre8-list-item>
  <cre8-list-item><f-po>Padded list item</f-po></cre8-list-item>
  <cre8-list-item><f-po>Padded list item</f-po></cre8-list-item>
  <cre8-list-item><f-po>Padded list item</f-po></cre8-list-item>
</cre8-list>`;

export const Condensed = () => html`<cre8-list spacing="condensed">
  <cre8-list-item><f-po>Condensed list item</f-po></cre8-list-item>
  <cre8-list-item><f-po>Condensed list item</f-po></cre8-list-item>
  <cre8-list-item><f-po>Condensed list item</f-po></cre8-list-item>
  <cre8-list-item><f-po>Condensed list item</f-po></cre8-list-item>
  <cre8-list-item><f-po>Condensed list item</f-po></cre8-list-item>
</cre8-list>`;
