import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { Cre8Element } from '../cre8-element';
import styles from './progress-meter.module';


export enum status {
  'error', 'warning', 'success', undefined
 }

/**
 * A progress meter provides feedback that the system is working and gives
 * the user an indication of how much time they will wait.
 * This indicator should be used when the system response time is longer and determinable.
 */
export class Cre8ProgressMeter extends Cre8Element {
    static styles = [styles];

  /**
   * Progress Status
   * - **Default** renders a meter with default status fill
   * - **Error** renders a meter with an error status fill
   * - **Warning** renders a meter with a warning status
   * - **Success** renders a meter with a success status fill
   *
   * @attr {status}
   */
  @property()
      status?: 'error' | 'warning' | 'success';

  /*
   * Determines if the progress meter is displayed on a dark background (uses knockout colors for contrast)
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      knockout?: boolean;

  /*
   * The max number for the progress bar (defaulted to 100 to match percentages)
   * @attr {number}
   */
  @property()
      max: number = 100;

  /*
   * The the percentage of the bar that is filled in (defaulted to match percentages)
   * I.E a value of 50 with a 100 max would result in half the meter being filled
   * @attr {number}
   */
  @property()
      value: number;

  /**
   * Progress Meter FieldId
   * @attr {string}
   */
  @property()
      fieldId?: string;

  /**
   * Progress Meter name
   * @attr {string}
   */
  @property()
      name?: string;

  /**
   * Progress Meter label
   * @attr {string}
   */
  @property()
      label: string;

  connectedCallback() {
      super.connectedCallback();
      this.fieldId = this.fieldId || nanoid();
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-progress-meter', {
          'cre8-c-progress-meter--error': this.status === 'error',
          'cre8-c-progress-meter--warning': this.status === 'warning',
          'cre8-c-progress-meter--success': this.status === 'success',
          'cre8-c-progress-meter--knockout': this.knockout,
      });

      return html`<div class="${componentClassNames}">
      <label class="cre8-c-progress-meter__label" for="${this.fieldId}">${this.label}</label>
      <span class="cre8-c-progress-meter__sr-only">${Math.round((this.value / this.max) * 100)}%</span>
      <progress
        class="cre8-c-progress-meter__progress"
        aria-hidden="true"
        id=${this.fieldId}
        name=${this.name}
        max="${this.max}"
        value="${this.value}"
      >
        ${Math.round((this.value / this.max) * 100)}%
      </progress>
    </div>`;
  }
}

if (customElements.get('cre8-progress-meter') === undefined) {
    customElements.define('cre8-progress-meter', Cre8ProgressMeter);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-progress-meter': Cre8ProgressMeter;
  }
}
