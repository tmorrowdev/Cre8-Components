import { html } from 'lit';
import '../../.storybook/components/f-po/f-po';
import { spread } from '../../directives/spread';
import '../layout-section/layout-section';
import './layout';

export default {
  title: 'DEPRECATED/DO NOT USE/Layout',
  component: 'cre8-layout',
  parameters: { status: { type: 'notStarted' } }
};

export const Default = (args) => html`<cre8-layout ${spread(args)}>
  <cre8-layout-section>
    <f-po>Layout Section</f-po>
  </cre8-layout-section>
  <cre8-layout-section>
    <f-po>Layout Section</f-po>
  </cre8-layout-section>
</cre8-layout>`;

export const LeftSidebar = () => html`<cre8-layout variant="left-sidebar">
  <cre8-layout-section>
    <f-po>Layout Section Sidebar</f-po>
  </cre8-layout-section>
  <cre8-layout-section>
    <f-po>Layout Section</f-po>
  </cre8-layout-section>
</cre8-layout>`;

export const RightSidebar = () => html`<cre8-layout variant="right-sidebar">
  <cre8-layout-section>
    <f-po>Layout Section</f-po>
  </cre8-layout-section>
  <cre8-layout-section>
    <f-po>Layout Section Sidebar</f-po>
  </cre8-layout-section>
</cre8-layout>`;
