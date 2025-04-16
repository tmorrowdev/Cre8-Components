/* eslint-disable import/prefer-default-export */
import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../../cre8-element';
import styles from './page-counter.scss';

/**
 * @slot - The component content
 */
export class Cre8PageCounter extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  @property({ type: Boolean, reflect: true })
      rangeVariant?: boolean;

  @property()
      currentPage: number = 1;

  @property()
      totalResults: number;

  @property()
      pageSize: number;

  @property()
      display?: 'compact' | 'icon-only' | 'default' = 'default';

  // Properties below are for future 'range' variant for table pagination

  // private get _currentResults() {
  //     return this.pageSize * (this.currentPage - 1);
  // }

  // private get _firstInRange() {
  //     return this._currentResults + 1;
  // }

  // private get _lastInRange() {
  //     const last = this._firstInRange + (this.pageSize - 1);
  //     return last > this.totalResults ? this.totalResults : last;
  // }

  private get _totalPages(): number {
      return Math.ceil(this.totalResults / this.pageSize);
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-page-counter', { });

      return html`
      <div class='${componentClassNames}'>
        <span class="cre8-c-pagination__text" aria-live="polite">
          ${!this.display || this.display === 'default'
        ? html`${this.currentPage}`
        : html`${this.currentPage} of ${this._totalPages}`
}
        </span>
      </div>
    `;
  }
}

if (customElements.get('cre8-page-counter') === undefined) {
    customElements.define('cre8-page-counter', Cre8PageCounter);
}

declare global { interface HTMLElementTagNameMap { 'cre8-page-counter': Cre8PageCounter; } }
