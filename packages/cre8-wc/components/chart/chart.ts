import { html, PropertyValues } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import {
    Chart,
    ChartType,
    ChartData,
    ChartOptions,
    ChartConfiguration,
    registerables,
    ChartEvent,
    ActiveElement,
    TooltipItem,
} from 'chart.js';
import styles from './chart.styles.js';

// Register all Chart.js components
Chart.register(...registerables);

/**
 * Chart type definitions for all supported Chart.js types
 */
export type Cre8ChartType =
    | 'line'
    | 'bar'
    | 'pie'
    | 'doughnut'
    | 'radar'
    | 'polarArea'
    | 'bubble'
    | 'scatter';

/**
 * Chart dataset configuration with proper typing
 */
export interface Cre8ChartDataset {
    label?: string;
    data: number[] | { x: number; y: number; r?: number }[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
    pointRadius?: number;
    pointHoverRadius?: number;
    hoverBackgroundColor?: string | string[];
    hoverBorderColor?: string | string[];
    [key: string]: unknown;
}

/**
 * Chart data configuration
 */
export interface Cre8ChartData {
    labels?: string[];
    datasets: Cre8ChartDataset[];
}

/**
 * Event detail for chart interactions
 */
export interface Cre8ChartEventDetail {
    event: ChartEvent;
    elements: ActiveElement[];
    chart: Chart;
    dataIndex?: number;
    datasetIndex?: number;
    value?: number | { x: number; y: number; r?: number };
    label?: string;
}

/**
 * A flexible chart component built on Chart.js that supports multiple chart types
 * including line, bar, pie, doughnut, radar, polar area, bubble, and scatter charts.
 *
 * ## Features
 * - Supports all major Chart.js chart types
 * - Reactive updates when data or options change
 * - Customizable colors that integrate with cre8 design tokens
 * - Responsive sizing
 * - Loading state indicator
 * - Event callbacks for click and hover interactions
 * - Accessible with ARIA labels
 *
 * ## Usage
 *
 * ```html
 * <cre8-chart
 *   type="bar"
 *   .data=${{ labels: ['A', 'B', 'C'], datasets: [{ label: 'Sales', data: [10, 20, 30] }] }}
 *   .options=${{ responsive: true }}
 * ></cre8-chart>
 * ```
 *
 * @fires chart-click - Fired when a chart element is clicked
 * @fires chart-hover - Fired when hovering over chart elements
 * @fires chart-ready - Fired when the chart is initialized
 */
export class Cre8Chart extends Cre8Element {
    static styles = [styles];

    /**
     * The type of chart to render.
     * @attr type
     */
    @property({ type: String })
    type: Cre8ChartType = 'bar';

    /**
     * The chart data including labels and datasets.
     * This should be an object with `labels` array and `datasets` array.
     */
    @property({ type: Object, attribute: false })
    data: Cre8ChartData = { datasets: [] };

    /**
     * Chart.js configuration options.
     * See Chart.js documentation for all available options.
     */
    @property({ type: Object, attribute: false })
    options: ChartOptions = {};

    /**
     * Width of the chart container in pixels.
     * If not set, the chart will be responsive.
     * @attr width
     */
    @property({ type: Number })
    width?: number;

    /**
     * Height of the chart container in pixels.
     * If not set, defaults to 400px.
     * @attr height
     */
    @property({ type: Number })
    height: number = 400;

    /**
     * Whether the chart should maintain aspect ratio when resizing.
     * @attr maintain-aspect-ratio
     */
    @property({ type: Boolean, attribute: 'maintain-aspect-ratio' })
    maintainAspectRatio: boolean = true;

    /**
     * Whether the chart should be responsive to container size.
     * @attr responsive
     */
    @property({ type: Boolean })
    responsive: boolean = true;

    /**
     * Display a loading indicator instead of the chart.
     * @attr loading
     */
    @property({ type: Boolean, reflect: true })
    loading: boolean = false;

    /**
     * Accessible label for the chart.
     * @attr aria-label
     */
    @property({ type: String, attribute: 'aria-label' })
    ariaLabel: string = 'Chart';

    /**
     * Whether to show the legend.
     * @attr show-legend
     */
    @property({ type: Boolean, attribute: 'show-legend' })
    showLegend: boolean = true;

    /**
     * Position of the legend.
     * @attr legend-position
     */
    @property({ type: String, attribute: 'legend-position' })
    legendPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';

    /**
     * Whether to animate chart updates.
     * @attr enable-animation
     */
    @property({ type: Boolean, attribute: 'enable-animation' })
    enableAnimation: boolean = true;

    /**
     * Animation duration in milliseconds.
     * @attr animation-duration
     */
    @property({ type: Number, attribute: 'animation-duration' })
    animationDuration: number = 750;

    /**
     * Default colors for datasets (uses cre8 design token colors).
     */
    @property({ type: Array, attribute: false })
    colors: string[] = [
        '#0066B3', // Primary blue
        '#00A3E0', // Accent cyan
        '#059669', // Success green
        '#D97706', // Warning orange
        '#DC2626', // Error red
        '#7C3AED', // Purple
        '#DB2777', // Pink
        '#0891B2', // Teal
    ];

    /**
     * Internal chart instance reference.
     */
    @state()
    private _chartInstance: Chart | null = null;

    /**
     * Internal state tracking if component is connected.
     */
    @state()
    private _isConnected: boolean = false;

    /**
     * Reference to the canvas element.
     */
    @query('canvas')
    private _canvas!: HTMLCanvasElement;

    connectedCallback() {
        super.connectedCallback();
        this._isConnected = true;
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._isConnected = false;
        this._destroyChart();
    }

    protected firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);
        if (!this.loading) {
            this._initializeChart();
        }
    }

    protected updated(changedProperties: PropertyValues) {
        super.updated(changedProperties);

        // If loading state changed to false, initialize chart
        if (changedProperties.has('loading') && !this.loading && !this._chartInstance) {
            this._initializeChart();
            return;
        }

        // If loading, don't update chart
        if (this.loading) {
            return;
        }

        // Check if we need to recreate the chart (type changed)
        if (changedProperties.has('type') && this._chartInstance) {
            this._destroyChart();
            this._initializeChart();
            return;
        }

        // Update existing chart if data or options changed
        if (
            (changedProperties.has('data') ||
             changedProperties.has('options') ||
             changedProperties.has('showLegend') ||
             changedProperties.has('legendPosition') ||
             changedProperties.has('colors')) &&
            this._chartInstance
        ) {
            this._updateChart();
        }
    }

    /**
     * Initialize the Chart.js instance.
     */
    private _initializeChart() {
        if (!this._canvas || !this._isConnected) {
            return;
        }

        const ctx = this._canvas.getContext('2d');
        if (!ctx) {
            console.error('Cre8Chart: Unable to get canvas 2D context');
            return;
        }

        const config = this._buildChartConfig();
        this._chartInstance = new Chart(ctx, config);

        this.dispatch({
            eventName: 'chart-ready',
            detailObj: { chart: this._chartInstance },
        });
    }

    /**
     * Build the complete Chart.js configuration.
     */
    private _buildChartConfig(): ChartConfiguration {
        const processedData = this._processData();

        return {
            type: this.type as ChartType,
            data: processedData as ChartData,
            options: this._mergeOptions(),
        };
    }

    /**
     * Process chart data and apply default colors.
     */
    private _processData(): Cre8ChartData {
        if (!this.data || !this.data.datasets) {
            return { labels: [], datasets: [] };
        }

        const processedDatasets = this.data.datasets.map((dataset, index) => {
            const colorIndex = index % this.colors.length;
            const defaultColor = this.colors[colorIndex];

            // For pie/doughnut/polarArea, apply colors to each segment
            if (['pie', 'doughnut', 'polarArea'].includes(this.type)) {
                const dataLength = Array.isArray(dataset.data) ? dataset.data.length : 0;
                const segmentColors = Array.from(
                    { length: dataLength },
                    (_, i) => this.colors[i % this.colors.length]
                );

                return {
                    ...dataset,
                    backgroundColor: dataset.backgroundColor || segmentColors,
                    borderColor: dataset.borderColor || '#ffffff',
                    borderWidth: dataset.borderWidth ?? 2,
                };
            }

            // For line charts, add some defaults
            if (this.type === 'line') {
                return {
                    ...dataset,
                    backgroundColor: dataset.backgroundColor || `${defaultColor}20`,
                    borderColor: dataset.borderColor || defaultColor,
                    borderWidth: dataset.borderWidth ?? 2,
                    fill: dataset.fill ?? false,
                    tension: dataset.tension ?? 0.4,
                    pointRadius: dataset.pointRadius ?? 4,
                    pointHoverRadius: dataset.pointHoverRadius ?? 6,
                };
            }

            // For bar charts
            if (this.type === 'bar') {
                return {
                    ...dataset,
                    backgroundColor: dataset.backgroundColor || defaultColor,
                    borderColor: dataset.borderColor || defaultColor,
                    borderWidth: dataset.borderWidth ?? 0,
                    borderRadius: 4,
                };
            }

            // For radar charts
            if (this.type === 'radar') {
                return {
                    ...dataset,
                    backgroundColor: dataset.backgroundColor || `${defaultColor}40`,
                    borderColor: dataset.borderColor || defaultColor,
                    borderWidth: dataset.borderWidth ?? 2,
                    pointBackgroundColor: defaultColor,
                    pointBorderColor: '#ffffff',
                };
            }

            // Default styling for other chart types
            return {
                ...dataset,
                backgroundColor: dataset.backgroundColor || defaultColor,
                borderColor: dataset.borderColor || defaultColor,
            };
        });

        return {
            labels: this.data.labels || [],
            datasets: processedDatasets,
        };
    }

    /**
     * Merge user options with default options.
     */
    private _mergeOptions(): ChartOptions {
        const defaultOptions: ChartOptions = {
            responsive: this.responsive,
            maintainAspectRatio: this.maintainAspectRatio,
            animation: this.enableAnimation
                ? { duration: this.animationDuration }
                : false,
            plugins: {
                legend: {
                    display: this.showLegend,
                    position: this.legendPosition,
                    labels: {
                        usePointStyle: true,
                        padding: 16,
                        font: {
                            family: 'Inter, system-ui, sans-serif',
                            size: 12,
                        },
                    },
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#1F2937',
                    titleFont: {
                        family: 'Inter, system-ui, sans-serif',
                        size: 13,
                    },
                    bodyFont: {
                        family: 'Inter, system-ui, sans-serif',
                        size: 12,
                    },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context: TooltipItem<ChartType>) => {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y ?? context.parsed;
                            return `${label}: ${value}`;
                        },
                    },
                },
            },
            onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart) => {
                this._handleChartClick(event, elements, chart);
            },
            onHover: (event: ChartEvent, elements: ActiveElement[], chart: Chart) => {
                this._handleChartHover(event, elements, chart);
            },
        };

        // Add scale options for charts that use scales
        if (['line', 'bar', 'scatter', 'bubble'].includes(this.type)) {
            (defaultOptions as ChartOptions<'bar'>).scales = {
                x: {
                    grid: {
                        display: true,
                        color: '#E5E7EB',
                    },
                    ticks: {
                        font: {
                            family: 'Inter, system-ui, sans-serif',
                            size: 11,
                        },
                        color: '#6B7280',
                    },
                },
                y: {
                    grid: {
                        display: true,
                        color: '#E5E7EB',
                    },
                    ticks: {
                        font: {
                            family: 'Inter, system-ui, sans-serif',
                            size: 11,
                        },
                        color: '#6B7280',
                    },
                    beginAtZero: true,
                },
            };
        }

        // Deep merge user options with defaults
        return this._deepMerge(defaultOptions, this.options);
    }

    /**
     * Deep merge two objects.
     */
    private _deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): ChartOptions {
        const output = { ...target };

        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (
                    source[key] &&
                    typeof source[key] === 'object' &&
                    !Array.isArray(source[key])
                ) {
                    output[key] = this._deepMerge(
                        (target[key] as Record<string, unknown>) || {},
                        source[key] as Record<string, unknown>
                    );
                } else {
                    output[key] = source[key];
                }
            }
        }

        return output as ChartOptions;
    }

    /**
     * Update the existing chart with new data/options.
     */
    private _updateChart() {
        if (!this._chartInstance) {
            return;
        }

        const processedData = this._processData();
        this._chartInstance.data = processedData as ChartData;
        this._chartInstance.options = this._mergeOptions();
        this._chartInstance.update(this.enableAnimation ? 'default' : 'none');
    }

    /**
     * Destroy the chart instance.
     */
    private _destroyChart() {
        if (this._chartInstance) {
            this._chartInstance.destroy();
            this._chartInstance = null;
        }
    }

    /**
     * Handle chart click events.
     */
    private _handleChartClick(event: ChartEvent, elements: ActiveElement[], chart: Chart) {
        if (elements.length > 0) {
            const element = elements[0];
            const datasetIndex = element.datasetIndex;
            const dataIndex = element.index;
            const dataset = this.data.datasets[datasetIndex];
            const value = dataset?.data[dataIndex];
            const label = this.data.labels?.[dataIndex];

            const detail: Cre8ChartEventDetail = {
                event,
                elements,
                chart,
                dataIndex,
                datasetIndex,
                value,
                label,
            };
            // @ts-expect-error: `dispatch` is not defined on `Cre8Element`
            this.dispatch({eventName: 'chart-click',detailObj: detail});
        }
    }

    /**
     * Handle chart hover events.
     */
    private _handleChartHover(event: ChartEvent, elements: ActiveElement[], chart: Chart) {
        // Update cursor style
        const canvas = chart.canvas;
        canvas.style.cursor = elements.length > 0 ? 'pointer' : 'default';

        if (elements.length > 0) {
            const element = elements[0];
            const datasetIndex = element.datasetIndex;
            const dataIndex = element.index;
            const dataset = this.data.datasets[datasetIndex];
            const value = dataset?.data[dataIndex];
            const label = this.data.labels?.[dataIndex];

            const detail: Cre8ChartEventDetail = {
                event,
                elements,
                chart,
                dataIndex,
                datasetIndex,
                value,
                label,
            };
            // @ts-expect-error: `dispatch` is not defined on `Cre8Element`
            this.dispatch({eventName: 'chart-hover',detailObj: detail});
        }
    }

    /**
     * Public method to get the Chart.js instance.
     */
    public getChartInstance(): Chart | null {
        return this._chartInstance;
    }

    /**
     * Public method to force refresh the chart.
     */
    public refresh() {
        this._destroyChart();
        this._initializeChart();
    }

    /**
     * Public method to download chart as image.
     */
    public downloadImage(filename: string = 'chart.png') {
        if (!this._chartInstance) {
            return;
        }

        const url = this._chartInstance.toBase64Image();
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
    }

    render() {
        const componentClassName = this.componentClassNames('cre8-c-chart', {
            'cre8-c-chart--loading': this.loading,
        });

        const containerStyle = `
            width: ${this.width ? `${this.width}px` : '100%'};
            height: ${this.height}px;
        `;

        return html`
            <div class="${componentClassName}" style="${containerStyle}">
                ${this.loading
                    ? html`
                        <div class="cre8-c-chart__loading">
                            <div class="cre8-c-chart__spinner"></div>
                            <span class="cre8-c-chart__loading-text">Loading chart...</span>
                        </div>
                    `
                    : html`
                        <canvas
                            role="img"
                            aria-label="${this.ariaLabel}"
                        ></canvas>
                    `
                }
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
