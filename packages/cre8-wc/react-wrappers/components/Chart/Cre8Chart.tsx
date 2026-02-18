import { createComponent } from '@lit/react';
import { Cre8Chart as Cre8ChartElement } from '@tmorrow/cre8-wc/lib/components/chart/chart';
import React from 'react';

export interface Cre8ChartProps {
  /** The type of chart to render. */
  type?: any;
  /** Width of the chart container in pixels. If not set, the chart will be responsive. */
  width?: number | undefined;
  /** Height of the chart container in pixels. If not set, defaults to 400px. */
  height?: number;
  /** Whether the chart should maintain aspect ratio when resizing. */
  maintainAspectRatio?: boolean;
  /** Whether the chart should be responsive to container size. */
  responsive?: boolean;
  /** Display a loading indicator instead of the chart. */
  loading?: boolean;
  /** Accessible label for the chart. */
  ariaLabel?: string;
  /** Whether to show the legend. */
  showLegend?: boolean;
  /** Position of the legend. */
  legendPosition?: any;
  /** Whether to animate chart updates. */
  enableAnimation?: boolean;
  /** Animation duration in milliseconds. */
  animationDuration?: number;
  onCre8ChartClick?: (event: CustomEvent) => void;
  onCre8ChartHover?: (event: CustomEvent) => void;
  onCre8ChartReady?: (event: CustomEvent) => void;
}

/**
 * A flexible chart component built on Chart.js that supports multiple chart types
 */
export const Cre8Chart = createComponent({
  react: React,
  tagName: 'cre8-chart',
  elementClass: Cre8ChartElement,
  events: {
    onCre8ChartClick: 'cre8-chart-click',
    onCre8ChartHover: 'cre8-chart-hover',
    onCre8ChartReady: 'cre8-chart-ready'
  }
});

export default Cre8Chart;
