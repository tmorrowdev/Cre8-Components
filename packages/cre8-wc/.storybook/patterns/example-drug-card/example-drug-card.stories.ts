import {html} from 'lit';
import './example-drug-card';

export default {
  title: 'Examples/Example Drug Card',
  component: 'example-drug-card',
  parameters: {status: {type: 'inProgress'}},
};

export const Default = (args) => html`<example-drug-card></example-drug-card>`
