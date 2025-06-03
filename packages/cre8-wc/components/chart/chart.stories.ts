import { html } from 'lit';
import { spread } from '../../directives/spread';
import './chart';

export default {
  title: 'cre8 Components/Chart',
  component: 'cre8-chart',
  parameters: {
    withDesign: {
      type: 'figma',
      url: '', // Add Figma URL if available
    },
    status: { type: 'inProgress' },
    actions: {
      handles: ['change', 'input'],
    },
  },
  argTypes: {
    type: {
      options: ['bar', 'line', 'pie', 'chart'],
      control: { type: 'radio' },
    },
    data: { control: 'object' },
    options: { control: 'object' },
  },
  args: {
    type: 'bar',
    data: {},
    options: {},
  },
};

export const Bar = () => html`<cre8-chart type="bar" .data=${{ labels: ['A', 'B', 'C'], datasets: [{ label: 'Bar', data: [10, 20, 30] }] }} .options=${{}}></cre8-chart>`;

export const Line = () => html`<cre8-chart type="line" .data=${{ labels: ['A', 'B', 'C'], datasets: [{ label: 'Line', data: [5, 15, 25] }] }} .options=${{}}></cre8-chart>`;

export const Pie = () => html`<cre8-chart type="pie" .data=${{ labels: ['A', 'B', 'C'], datasets: [{ label: 'Pie', data: [40, 30, 30] }] }} .options=${{}}></cre8-chart>`;

export const DefaultChart = () => html`<cre8-chart type="chart" .data=${{ labels: ['A', 'B', 'C'], datasets: [{ label: 'Default', data: [7, 14, 21] }] }} .options=${{}}></cre8-chart>`;
