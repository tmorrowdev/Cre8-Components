import { html, CSSResult } from 'lit';
import './chart';
import type { Cre8ChartType, Cre8ChartData } from './chart';

export default {
  title: 'cre8 Components/Chart',
  component: 'cre8-chart',
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['cre8-chart-click', 'cre8-chart-hover', 'cre8-chart-ready'],
    },
  },
  argTypes: {
    type: {
      options: ['bar', 'line', 'pie', 'doughnut', 'radar', 'polarArea', 'bubble', 'scatter'],
      control: { type: 'select' },
      description: 'The type of chart to render',
    },
    data: {
      control: 'object',
      description: 'Chart data including labels and datasets',
    },
    options: {
      control: 'object',
      description: 'Chart.js options configuration',
    },
    height: {
      control: { type: 'number', min: 100, max: 800, step: 50 },
      description: 'Height of the chart in pixels',
    },
    showLegend: {
      control: 'boolean',
      description: 'Whether to show the chart legend',
    },
    enableAnimation: {
      control: 'boolean',
      description: 'Whether to enableAnimation the chart on load',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
  args: {
    type: 'bar',
    height: 400,
    showLegend: true,
    enableAnimation: true,
    loading: false,
  },
};

// Sample data for different chart types
const barData: Cre8ChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales 2024',
      data: [65, 59, 80, 81, 56, 55],
    },
    {
      label: 'Sales 2023',
      data: [45, 49, 60, 71, 46, 45],
    },
  ],
};

const lineData: Cre8ChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Page Views',
      data: [1200, 1900, 3000, 5000, 2300, 3200, 4100],
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Unique Visitors',
      data: [800, 1200, 2100, 3500, 1800, 2400, 3000],
      fill: false,
      tension: 0.4,
    },
  ],
};

const pieData: Cre8ChartData = {
  labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
  datasets: [
    {
      label: 'Device Usage',
      data: [45, 35, 15, 5],
    },
  ],
};

const doughnutData: Cre8ChartData = {
  labels: ['Completed', 'In Progress', 'Not Started', 'Blocked'],
  datasets: [
    {
      label: 'Task Status',
      data: [42, 28, 18, 12],
    },
  ],
};

const radarData: Cre8ChartData = {
  labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency', 'Price'],
  datasets: [
    {
      label: 'Product A',
      data: [85, 90, 78, 92, 88, 70],
    },
    {
      label: 'Product B',
      data: [75, 85, 90, 80, 78, 85],
    },
  ],
};

const polarAreaData: Cre8ChartData = {
  labels: ['Red', 'Green', 'Yellow', 'Blue', 'Purple'],
  datasets: [
    {
      label: 'Color Preferences',
      data: [11, 16, 7, 14, 10],
    },
  ],
};

const bubbleData: Cre8ChartData = {
  datasets: [
    {
      label: 'Dataset 1',
      data: [
        { x: 20, y: 30, r: 15 },
        { x: 40, y: 10, r: 10 },
        { x: 30, y: 45, r: 20 },
        { x: 50, y: 25, r: 12 },
      ],
    },
    {
      label: 'Dataset 2',
      data: [
        { x: 15, y: 20, r: 8 },
        { x: 35, y: 35, r: 18 },
        { x: 25, y: 15, r: 14 },
        { x: 45, y: 40, r: 10 },
      ],
    },
  ],
};

const scatterData: Cre8ChartData = {
  datasets: [
    {
      label: 'Group A',
      data: [
        { x: 10, y: 20 },
        { x: 15, y: 35 },
        { x: 20, y: 25 },
        { x: 25, y: 40 },
        { x: 30, y: 45 },
        { x: 35, y: 30 },
      ],
    },
    {
      label: 'Group B',
      data: [
        { x: 12, y: 15 },
        { x: 18, y: 28 },
        { x: 22, y: 22 },
        { x: 28, y: 35 },
        { x: 32, y: 38 },
        { x: 38, y: 25 },
      ],
    },
  ],
};

// Stories
export const Bar = {
  args: {
    type: 'bar' as Cre8ChartType,
    data: barData,
  },
  render: (args: any) => html`
    <cre8-chart
      type=${args.type}
      .data=${args.data}
      .options=${args.options || {}}
      height=${args.height}
      ?show-legend=${args.showLegend}
      ?enable-animation=${args.enableAnimation}
      ?loading=${args.loading}
    ></cre8-chart>
  `,
};

export const Line = {
  args: {
    type: 'line' as Cre8ChartType,
    data: lineData,
  },
  render: (args: any) => html`
    <cre8-chart
      type=${args.type}
      .data=${args.data}
      .options=${args.options || {}}
      height=${args.height}
      ?show-legend=${args.showLegend}
      ?enable-animation=${args.enableAnimation}
      ?loading=${args.loading}
    ></cre8-chart>
  `,
};

export const Pie = {
  args: {
    type: 'pie' as Cre8ChartType,
    data: pieData,
    height: 350,
  },
  render: (args: any) => html`
    <div style="max-width: 500px;">
      <cre8-chart
        type=${args.type}
        .data=${args.data}
        .options=${args.options || {}}
        height=${args.height}
        ?show-legend=${args.showLegend}
        ?enable-animation=${args.enableAnimation}
        ?loading=${args.loading}
      ></cre8-chart>
    </div>
  `,
};

export const Doughnut = {
  args: {
    type: 'doughnut' as Cre8ChartType,
    data: doughnutData,
    height: 350,
  },
  render: (args: any) => html`
    <div style="max-width: 500px;">
      <cre8-chart
        type=${args.type}
        .data=${args.data}
        .options=${args.options || {}}
        height=${args.height}
        ?show-legend=${args.showLegend}
        ?enable-animation=${args.enableAnimation}
        ?loading=${args.loading}
      ></cre8-chart>
    </div>
  `,
};

export const Radar = {
  args: {
    type: 'radar' as Cre8ChartType,
    data: radarData,
    height: 400,
  },
  render: (args: any) => html`
    <div style="max-width: 600px;">
      <cre8-chart
        type=${args.type}
        .data=${args.data}
        .options=${args.options || {}}
        height=${args.height}
        ?show-legend=${args.showLegend}
        ?enable-animation=${args.enableAnimation}
        ?loading=${args.loading}
      ></cre8-chart>
    </div>
  `,
};

export const PolarArea = {
  args: {
    type: 'polarArea' as Cre8ChartType,
    data: polarAreaData,
    height: 400,
  },
  render: (args: any) => html`
    <div style="max-width: 500px;">
      <cre8-chart
        type=${args.type}
        .data=${args.data}
        .options=${args.options || {}}
        height=${args.height}
        ?show-legend=${args.showLegend}
        ?enable-animation=${args.enableAnimation}
        ?loading=${args.loading}
      ></cre8-chart>
    </div>
  `,
};

export const Bubble = {
  args: {
    type: 'bubble' as Cre8ChartType,
    data: bubbleData,
  },
  render: (args: any) => html`
    <cre8-chart
      type=${args.type}
      .data=${args.data}
      .options=${args.options || {}}
      height=${args.height}
      ?show-legend=${args.showLegend}
      ?enable-animation=${args.enableAnimation}
      ?loading=${args.loading}
    ></cre8-chart>
  `,
};

export const Scatter = {
  args: {
    type: 'scatter' as Cre8ChartType,
    data: scatterData,
  },
  render: (args: any) => html`
    <cre8-chart
      type=${args.type}
      .data=${args.data}
      .options=${args.options || {}}
      height=${args.height}
      ?show-legend=${args.showLegend}
      ?enable-animation=${args.enableAnimation}
      ?loading=${args.loading}
    ></cre8-chart>
  `,
};

export const Loading = {
  args: {
    type: 'bar' as Cre8ChartType,
    data: barData,
    loading: true,
  },
  render: (args: any) => html`
    <cre8-chart
      type=${args.type}
      .data=${args.data}
      .options=${args.options || {}}
      height=${args.height}
      ?show-legend=${args.showLegend}
      ?enable-animation=${args.enableAnimation}
      ?loading=${args.loading}
    ></cre8-chart>
  `,
};

export const NoLegend = {
  args: {
    type: 'bar' as Cre8ChartType,
    data: barData,
    showLegend: false,
  },
  render: (args: any) => html`
    <cre8-chart
      type=${args.type}
      .data=${args.data}
      .options=${args.options || {}}
      height=${args.height}
      ?show-legend=${args.showLegend}
      ?enable-animation=${args.enableAnimation}
      ?loading=${args.loading}
    ></cre8-chart>
  `,
};

export const CustomOptions = {
  args: {
    type: 'line' as Cre8ChartType,
    data: lineData,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Weekly Website Traffic',
          font: {
            size: 18,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Visitors',
          },
        },
        x: {
          title: {
            display: true,
            text: 'Day of Week',
          },
        },
      },
    },
  },
  render: (args: any) => html`
    <cre8-chart
      type=${args.type}
      .data=${args.data}
      .options=${args.options}
      height=${args.height}
      ?show-legend=${args.showLegend}
      ?enable-animation=${args.enableAnimation}
      ?loading=${args.loading}
    ></cre8-chart>
  `,
};

export const HorizontalBar = {
  args: {
    type: 'bar' as Cre8ChartType,
    data: {
      labels: ['Engineering', 'Sales', 'Marketing', 'Support', 'HR'],
      datasets: [
        {
          label: 'Headcount',
          data: [45, 32, 18, 25, 8],
        },
      ],
    },
    options: {
      indexAxis: 'y',
      plugins: {
        title: {
          display: true,
          text: 'Department Headcount',
        },
      },
    },
  },
  render: (args: any) => html`
    <cre8-chart
      type=${args.type}
      .data=${args.data}
      .options=${args.options}
      height=${args.height}
      ?show-legend=${args.showLegend}
      ?enable-animation=${args.enableAnimation}
      ?loading=${args.loading}
    ></cre8-chart>
  `,
};

export const StackedBar = {
  args: {
    type: 'bar' as Cre8ChartType,
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Product A',
          data: [120, 150, 180, 200],
        },
        {
          label: 'Product B',
          data: [80, 100, 120, 140],
        },
        {
          label: 'Product C',
          data: [60, 70, 90, 110],
        },
      ],
    },
    options: {
      scales: {
        x: { stacked: true },
        y: { stacked: true },
      },
      plugins: {
        title: {
          display: true,
          text: 'Quarterly Revenue by Product',
        },
      },
    },
  },
  render: (args: any) => html`
    <cre8-chart
      type=${args.type}
      .data=${args.data}
      .options=${args.options}
      height=${args.height}
      ?show-legend=${args.showLegend}
      ?enable-animation=${args.enableAnimation}
      ?loading=${args.loading}
    ></cre8-chart>
  `,
};

export const AreaChart = {
  args: {
    type: 'line' as Cre8ChartType,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [30, 45, 60, 55, 70, 85],
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Monthly Revenue Trend',
        },
      },
    },
  },
  render: (args: any) => html`
    <cre8-chart
      type=${args.type}
      .data=${args.data}
      .options=${args.options}
      height=${args.height}
      ?show-legend=${args.showLegend}
      ?enable-animation=${args.enableAnimation}
      ?loading=${args.loading}
    ></cre8-chart>
  `,
};
