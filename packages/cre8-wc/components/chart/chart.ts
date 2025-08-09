import { html, css, PropertyValues } from "lit";
import { Cre8Element } from '../cre8-element';
import { property, state, query } from 'lit/decorators.js';

// Types
interface ChartData {
  x?: (string | number)[];
  y?: number[];
  labels?: string[];
  values?: number[];
  name?: string;
  color?: string;
  colors?: string[];
  markerSize?: number;
}

interface ChartOptions {
  title?: string;
  xTitle?: string;
  yTitle?: string;
  width?: number;
  height?: number;
  showLegend?: boolean;
  theme?: 'light' | 'dark';
}

interface ChartConfig {
  responsive?: boolean;
  displayModeBar?: boolean;
  modeBarButtonsToRemove?: string[];
}

type ChartType = 'line' | 'bar' | 'scatter' | 'pie' | 'histogram' | 'box';

interface TestResult {
  status: 'PASS' | 'FAIL';
  message: string;
}

// Plotly type declaration
declare global {
  interface Window {
    Plotly: any;
  }
}

export class PlotlyComponent extends Cre8Element {
  // Public properties
  @property({ type: String }) chartType: ChartType = 'line';
  @property({ type: Object }) chartData: ChartData = {};
  @property({ type: Object }) chartOptions: ChartOptions = {};
  @property({ type: Object }) chartConfig: ChartConfig = {};
  @property({ type: Boolean }) enableTests: boolean = false;
  @property({ type: Boolean }) autoLoad: boolean = true;
  @property({ type: String }) plotlyVersion: string = '2.26.0';
  @property({ type: Array }) plotlyCdns: string[] = [
    'https://cdnjs.cloudflare.com/ajax/libs/plotly.js',
    'https://unpkg.com/plotly.js',
    'https://cdn.jsdelivr.net/npm/plotly.js'
  ];

  // Internal state
  @state() private isLoading: boolean = true;
  @state() private error: string | null = null;
  @state() private plotlyLoaded: boolean = false;
  @state() private testResults: TestResult[] = [];
  @state() private chartCreated: boolean = false;

  // Query selectors
  @query('#chart-container') private chartContainer!: HTMLDivElement;
  @query('#test-results') private testResultsContainer?: HTMLDivElement;

  // Private properties
  private plotlyInstance: any = null;
  private loadAttempts: number = 0;
  private maxLoadAttempts: number = 30;
  private currentCdnIndex: number = 0;

  static styles = css`
    :host {
      display: block;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      --primary-color: #007bff;
      --success-color: #28a745;
      --error-color: #dc3545;
      --warning-color: #ffc107;
      --light-bg: #f8f9fa;
      --border-color: #dee2e6;
      --border-radius: 8px;
      --shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .container {
      max-width: 100%;
      padding: 16px;
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 2px solid var(--border-color);
    }

    .chart-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      margin: 0;
    }

    .status-indicator {
      padding: 8px 16px;
      border-radius: var(--border-radius);
      font-weight: 500;
      font-size: 0.875rem;
    }

    .status-loading {
      background: #d1ecf1;
      color: #0c5460;
      border: 1px solid #bee5eb;
    }

    .status-success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .status-error {
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .chart-container {
      width: 100%;
      height: 400px;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      background: white;
      position: relative;
      overflow: hidden;
    }

    .chart-container.dark {
      background: #2d3748;
      border-color: #4a5568;
    }

    .loading-spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      flex-direction: column;
      gap: 16px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-message {
      color: var(--error-color);
      text-align: center;
      padding: 20px;
      background: #f8d7da;
      border-radius: var(--border-radius);
      margin: 16px 0;
    }

    .controls {
      display: flex;
      gap: 12px;
      margin: 16px 0;
      flex-wrap: wrap;
    }

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-weight: 500;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      text-transform: capitalize;
    }

    .btn:hover {
      transform: translateY(-1px);
      box-shadow: var(--shadow);
    }

    .btn:active {
      transform: translateY(0);
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
    }

    .btn-primary:hover {
      background: #0056b3;
    }

    .btn-success {
      background: var(--success-color);
      color: white;
    }

    .btn-success:hover {
      background: #1e7e34;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #545b62;
    }

    .test-section {
      background: var(--light-bg);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      padding: 16px;
      margin-top: 16px;
    }

    .test-section h3 {
      margin: 0 0 16px 0;
      color: #333;
      font-size: 1.25rem;
    }

    .test-results {
      background: white;
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      padding: 12px;
      max-height: 300px;
      overflow-y: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      margin-top: 12px;
    }

    .test-result {
      padding: 4px 0;
      border-bottom: 1px solid #eee;
    }

    .test-result:last-child {
      border-bottom: none;
    }

    .test-pass {
      color: var(--success-color);
      font-weight: bold;
    }

    .test-fail {
      color: var(--error-color);
      font-weight: bold;
    }

    .test-summary {
      background: #e9ecef;
      padding: 8px 12px;
      border-radius: 4px;
      margin-bottom: 8px;
      font-weight: bold;
    }

    .hidden {
      display: none;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .chart-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .controls {
        justify-content: center;
      }

      .btn {
        flex: 1;
        min-width: 120px;
      }
    }
  `;

  constructor() {
    super();
    this.initializeDefaults();
  }

  private initializeDefaults(): void {
    this.chartConfig = {
      responsive: true,
      displayModeBar: true,
      modeBarButtonsToRemove: ['pan2d', 'lasso2d'],
      ...this.chartConfig
    };

    this.chartOptions = {
      title: 'Chart',
      width: 800,
      height: 400,
      showLegend: true,
      theme: 'light',
      ...this.chartOptions
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.autoLoad) {
      this.loadPlotly();
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    // Re-create chart if relevant properties changed
    if (this.plotlyLoaded && this.chartContainer) {
      const chartProperties = ['chartType', 'chartData', 'chartOptions'];
      const hasChartChanges = chartProperties.some(prop => changedProperties.has(prop));
      
      if (hasChartChanges || (!this.chartCreated && this.plotlyLoaded)) {
        this.createChart();
      }
    }
  }

  // Public methods
  public async loadPlotly(): Promise<void> {
    if (this.plotlyLoaded) return;

    this.isLoading = true;
    this.error = null;
    this.loadAttempts = 0;
    this.currentCdnIndex = 0;

    return this.attemptPlotlyLoad();
  }

  public async createChart(): Promise<{ success: boolean; message: string; error?: any }> {
    if (!this.plotlyLoaded) {
      const error = 'Plotly not loaded';
      this.error = error;
      return { success: false, message: error };
    }

    try {
      this.validateChartData();
      
      const trace = this.createTrace();
      const layout = this.createLayout();
      
      await this.plotlyInstance.newPlot(
        this.chartContainer,
        [trace],
        layout,
        this.chartConfig
      );

      this.chartCreated = true;
      this.error = null;
      
      return {
        success: true,
        message: `${this.chartType} chart created successfully`
      };
    } catch (error: any) {
      this.error = error.message;
      return {
        success: false,
        message: error.message,
        error
      };
    }
  }

  public async runTests(): Promise<TestResult[]> {
    this.testResults = [];

    // Validation tests
    this.runValidationTests();
    
    // Chart creation tests
    if (this.plotlyLoaded) {
      await this.runChartCreationTests();
    }

    this.requestUpdate();
    return this.testResults;
  }

  public getSampleData(): Record<ChartType, ChartData> {
    return {
      line: { x: [1, 2, 3, 4, 5], y: [2, 5, 3, 8, 7], name: 'Line Data', color: '#1f77b4' },
      bar: { x: ['A', 'B', 'C', 'D'], y: [20, 14, 23, 25], name: 'Bar Data', color: '#ff7f0e' },
      scatter: { x: [1, 2, 3, 4, 5], y: [2, 5, 3, 8, 7], name: 'Scatter Data', color: '#2ca02c', markerSize: 12 },
      pie: { labels: ['Red', 'Blue', 'Green', 'Yellow'], values: [25, 30, 20, 25], name: 'Pie Data' },
      histogram: { x: [1, 2, 2, 3, 3, 3, 4, 4, 5], name: 'Histogram Data' },
      box: { y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], name: 'Box Plot Data' }
    };
  }

  // Private methods
  private async attemptPlotlyLoad(): Promise<void> {
    if (window.Plotly) {
      this.onPlotlyLoaded();
      return;
    }

    if (this.loadAttempts >= this.maxLoadAttempts) {
      if (this.currentCdnIndex < this.plotlyCdns.length - 1) {
        this.currentCdnIndex++;
        this.loadAttempts = 0;
        this.loadPlotlyScript();
      } else {
        this.onPlotlyLoadError('Failed to load Plotly from all CDNs');
      }
      return;
    }

    if (this.loadAttempts === 0) {
      this.loadPlotlyScript();
    }

    this.loadAttempts++;
    setTimeout(() => this.attemptPlotlyLoad(), 200);
  }

  private loadPlotlyScript(): void {
    // Remove existing script
    const existingScript = document.querySelector('script[src*="plotly"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    const cdn = this.plotlyCdns[this.currentCdnIndex];
    script.src = `${cdn}/${this.plotlyVersion}/plotly.min.js`;
    
    script.onload = () => this.onPlotlyLoaded();
    script.onerror = () => {
      console.error(`Failed to load Plotly from: ${script.src}`);
      this.loadAttempts = this.maxLoadAttempts; // Force CDN switch
    };

    document.head.appendChild(script);
  }

  private onPlotlyLoaded(): void {
    this.plotlyInstance = window.Plotly;
    this.plotlyLoaded = true;
    this.isLoading = false;
    this.error = null;
    
    console.log('Plotly loaded successfully:', this.plotlyInstance.version);
    
    // Auto-create chart if data is available
    if (this.chartData && Object.keys(this.chartData).length > 0) {
      this.createChart();
    }
  }

  private onPlotlyLoadError(message: string): void {
    this.error = message;
    this.isLoading = false;
    this.plotlyLoaded = false;
    console.error(message);
  }

  private validateChartData(): void {
    if (!this.chartData || typeof this.chartData !== 'object') {
      throw new Error('Chart data must be a valid object');
    }

    const supportedTypes: ChartType[] = ['line', 'bar', 'scatter', 'pie', 'histogram', 'box'];
    if (!supportedTypes.includes(this.chartType)) {
      throw new Error(`Unsupported chart type: ${this.chartType}`);
    }

    switch (this.chartType) {
      case 'line':
      case 'bar':
      case 'scatter':
        if (!Array.isArray(this.chartData.x) || !Array.isArray(this.chartData.y)) {
          throw new Error(`${this.chartType} chart requires x and y arrays`);
        }
        if (this.chartData.x.length !== this.chartData.y.length) {
          throw new Error('x and y arrays must have the same length');
        }
        if (this.chartData.x.length === 0) {
          throw new Error('Data arrays cannot be empty');
        }
        break;

      case 'pie':
        if (!Array.isArray(this.chartData.labels) || !Array.isArray(this.chartData.values)) {
          throw new Error('Pie chart requires labels and values arrays');
        }
        if (this.chartData.labels.length !== this.chartData.values.length) {
          throw new Error('labels and values arrays must have the same length');
        }
        break;

      case 'histogram':
      case 'box':
        if (!Array.isArray(this.chartData.x) && !Array.isArray(this.chartData.y)) {
          throw new Error(`${this.chartType} chart requires at least x or y array`);
        }
        break;
    }
  }

  private createTrace(): any {
    const trace: any = {
      name: this.chartData.name || 'Data Series'
    };

    switch (this.chartType) {
      case 'line':
        return {
          ...trace,
          x: this.chartData.x,
          y: this.chartData.y,
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: this.chartData.color || '#1f77b4', width: 3 },
          marker: { size: 8, color: this.chartData.color || '#1f77b4' }
        };

      case 'bar':
        return {
          ...trace,
          x: this.chartData.x,
          y: this.chartData.y,
          type: 'bar',
          marker: { color: this.chartData.color || '#ff7f0e' }
        };

      case 'scatter':
        return {
          ...trace,
          x: this.chartData.x,
          y: this.chartData.y,
          type: 'scatter',
          mode: 'markers',
          marker: {
            size: this.chartData.markerSize || 10,
            color: this.chartData.color || '#2ca02c'
          }
        };

      case 'pie':
        return {
          ...trace,
          labels: this.chartData.labels,
          values: this.chartData.values,
          type: 'pie',
          textinfo: 'label+percent',
          marker: {
            colors: this.chartData.colors || ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99']
          }
        };

      case 'histogram':
        return {
          ...trace,
          x: this.chartData.x,
          y: this.chartData.y,
          type: 'histogram',
          marker: { color: this.chartData.color || '#9467bd' }
        };

      case 'box':
        return {
          ...trace,
          x: this.chartData.x,
          y: this.chartData.y,
          type: 'box',
          marker: { color: this.chartData.color || '#8c564b' }
        };

      default:
        throw new Error(`Unsupported chart type: ${this.chartType}`);
    }
  }

  private createLayout(): any {
    const layout: any = {
      title: {
        text: this.chartOptions.title || `${this.chartType.charAt(0).toUpperCase() + this.chartType.slice(1)} Chart`,
        font: { size: 16 }
      },
      margin: { t: 50, r: 50, b: 50, l: 50 },
      showlegend: this.chartOptions.showLegend
    };

    if (this.chartOptions.width) layout.width = this.chartOptions.width;
    if (this.chartOptions.height) layout.height = this.chartOptions.height;

    if (this.chartType !== 'pie') {
      layout.xaxis = { title: this.chartOptions.xTitle || 'X Axis' };
      layout.yaxis = { title: this.chartOptions.yTitle || 'Y Axis' };
    }

    if (this.chartOptions.theme === 'dark') {
      layout.plot_bgcolor = '#2d3748';
      layout.paper_bgcolor = '#2d3748';
      layout.font = { color: 'white' };
    }

    return layout;
  }

  private runValidationTests(): void {
    const assert = (condition: boolean, message: string) => {
      this.testResults.push({
        status: condition ? 'PASS' : 'FAIL',
        message
      });
    };

    const assertThrows = (fn: () => void, expectedMessage: string, testName: string) => {
      try {
        fn();
        this.testResults.push({
          status: 'FAIL',
          message: `${testName}: Expected error but none was thrown`
        });
      } catch (error: any) {
        const passed = error.message.includes(expectedMessage);
        this.testResults.push({
          status: passed ? 'PASS' : 'FAIL',
          message: `${testName}: ${passed ? 'Correctly threw error' : `Wrong error: ${error.message}`}`
        });
      }
    };

    // Test valid data
    const validData = { x: [1, 2, 3], y: [10, 20, 30] };
    const originalData = this.chartData;
    const originalType = this.chartType;
    
    this.chartData = validData;
    this.chartType = 'line';
    
    try {
      this.validateChartData();
      assert(true, 'Valid line data should pass validation');
    } catch (error) {
      assert(false, 'Valid line data should pass validation');
    }

    // Test invalid data
    this.chartData = 'invalid' as any;
    assertThrows(
      () => this.validateChartData(),
      'Chart data must be a valid object',
      'Invalid data type validation'
    );

    // Test missing data
    this.chartData = { x: [1, 2, 3] };
    assertThrows(
      () => this.validateChartData(),
      'requires x and y arrays',
      'Missing y data validation'
    );

    // Restore original data
    this.chartData = originalData;
    this.chartType = originalType;
  }

  private async runChartCreationTests(): Promise<void> {
    const sampleData = this.getSampleData();
    
    // Test line chart creation
    const originalData = this.chartData;
    const originalType = this.chartType;
    
    this.chartData = sampleData.line;
    this.chartType = 'line';
    
    try {
      const result = await this.createChart();
      this.testResults.push({
        status: result.success ? 'PASS' : 'FAIL',
        message: `Line chart creation: ${result.message}`
      });
    } catch (error: any) {
      this.testResults.push({
        status: 'FAIL',
        message: `Line chart creation failed: ${error.message}`
      });
    }

    // Restore original data
    this.chartData = originalData;
    this.chartType = originalType;
  }

  private async handleSampleChart(type: ChartType): Promise<void> {
    const sampleData = this.getSampleData();
    this.chartType = type;
    this.chartData = sampleData[type];
    await this.createChart();
  }

  render() {
    return html`
      <div class="container">
        <div class="chart-header">
          <h2 class="chart-title">
            📊 ${this.chartOptions.title || 'Plotly Chart Component'}
          </h2>
          <div class="status-indicator ${this.isLoading ? 'status-loading' : this.error ? 'status-error' : 'status-success'}">
            ${this.isLoading ? '⏳ Loading...' : this.error ? `❌ ${this.error}` : '✅ Ready'}
          </div>
        </div>

        ${this.error ? html`
          <div class="error-message">
            <strong>Error:</strong> ${this.error}
            <br>
            <button class="btn btn-primary" @click=${this.loadPlotly}>
              🔄 Retry Loading Plotly
            </button>
          </div>
        ` : ''}

        <div class="chart-container ${this.chartOptions.theme === 'dark' ? 'dark' : ''}" 
             id="chart-container">
          ${this.isLoading ? html`
            <div class="loading-spinner">
              <div class="spinner"></div>
              <div>Loading Plotly.js...</div>
            </div>
          ` : ''}
        </div>

        ${this.plotlyLoaded ? html`
          <div class="controls">
            <button class="btn btn-primary" @click=${() => this.handleSampleChart('line')}>
              📈 Line Chart
            </button>
            <button class="btn btn-primary" @click=${() => this.handleSampleChart('bar')}>
              📊 Bar Chart
            </button>
            <button class="btn btn-primary" @click=${() => this.handleSampleChart('scatter')}>
              ⚫ Scatter Plot
            </button>
            <button class="btn btn-primary" @click=${() => this.handleSampleChart('pie')}>
              🥧 Pie Chart
            </button>
            <button class="btn btn-success" @click=${this.createChart}>
              🔄 Refresh Chart
            </button>
          </div>
        ` : ''}

        ${this.enableTests ? html`
          <div class="test-section">
            <h3>🧪 Unit Tests</h3>
            <div class="controls">
              <button class="btn btn-secondary" @click=${this.runTests}>
                🚀 Run Tests
              </button>
              <button class="btn btn-secondary" @click=${() => { this.testResults = []; this.requestUpdate(); }}>
                🗑️ Clear Results
              </button>
            </div>
            <div class="test-results ${this.testResults.length === 0 ? 'hidden' : ''}" id="test-results">
              ${this.testResults.length > 0 ? html`
                <div class="test-summary">
                  Test Results: ${this.testResults.filter(r => r.status === 'PASS').length}/${this.testResults.length} passed
                </div>
                ${this.testResults.map(result => html`
                  <div class="test-result ${result.status === 'PASS' ? 'test-pass' : 'test-fail'}">
                    [${result.status}] ${result.message}
                  </div>
                `)}
              ` : 'No test results yet.'}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}
