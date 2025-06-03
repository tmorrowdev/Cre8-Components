import { property } from "lit/decorators.js";
import { Cre8Element } from '../cre8-element';
import {Chart, ChartType}  from 'chart.js';
import { html, unsafeCSS } from "lit";
import styles from './chart.module';

export class Cre8Chart extends Cre8Element {
    static styles = [styles];

    @property() chartData: any;
    @property({ type: String }) chartType: ChartType = 'bar';
    @property({ type: Object }) chartOptions = {};
    @property({ type: Boolean }) isLoading: boolean = false;
  
  firstUpdated() {
    // Initialize chart with chart library of choice
    const canvas = document.documentElement.querySelector('#chartCanvas') as HTMLCanvasElement;
    // Example with Chart.js
    new Chart(canvas, {
      type: this.chartType,
      data: this.chartData,
      options: this.chartOptions,
    });
  }
  
  render() {
    return html`
      <div class="chart-container">
        <canvas id="chartCanvas"></canvas>
      </div>
    `;
  }
}

if (customElements.get('cre8-chart') === undefined) {
    customElements.define('cre8-chart', Cre8Chart);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-chart': Cre8Chart;
  }
}

export default Cre8Chart;
