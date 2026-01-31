import { createComponent } from '@lit/react';
import { Cre8Chart as Cre8ChartElement } from '@tmorrow/cre8-wc/lib/components/chart/chart';
import React from 'react';

export interface Cre8ChartProps {
  chartData?: any;
  chartType?: any;
  chartOptions?: object;
  isLoading?: boolean;
}

/**
 * Cre8Chart component
 */
export const Cre8Chart = createComponent({
  react: React,
  tagName: 'cre8-chart',
  elementClass: Cre8ChartElement,

});

export default Cre8Chart;
