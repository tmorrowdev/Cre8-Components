import {html} from 'lit';
import '../breadcrumbs-item/breadcrumbs-item';
import '../link/link';
import './breadcrumbs';

export default {
  title: 'cre8 Components/Breadcrumbs',
  component: 'cre8-breadcrumbs',
  parameters: {status: {type: 'inProgress'}},
};

export const Default = (args) => html` <cre8-breadcrumbs>
  <cre8-breadcrumbs-item><cre8-link href="#">Grandparent</cre8-link></cre8-breadcrumbs-item>
  <cre8-breadcrumbs-item><cre8-link href="#">Parent</cre8-link></cre8-breadcrumbs-item>
  <cre8-breadcrumbs-item>Current</cre8-breadcrumbs-item>
</cre8-breadcrumbs>`;
