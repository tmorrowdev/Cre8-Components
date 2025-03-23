import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './grid.scss';

/**
 * @slot - The grid items
 */
export class cre8Grid extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   * Style variant
   * - **side-by-side** yields a grid whose grid items display side-by-side (2 per row) on all screen sizes
   * - **2up** yields a grid whose grid items are stacked on small screens
   *   but display side-by-side when enough screen real estate is available to do so
   * - **3up** yields a grid whose grid items are stacked on small screens,
   *   transforms to a 2-across pattern and then transforms again to a 3-across pattern
   * - **1-3up** yields a grid whose grid items are stacked on small screens
   *   and transforms to a 3-across pattern on larger screens
   * - **4up** yields a grid whose grid items are stacked on small screens,
   *   transforms to a 2-across pattern, transforms again to a 3-across pattern,
   *   and ultimately transforms to a 4-across pattern
   * - **1-2-4up** yields a grid whose grid items are stacked on small screens,
   *   transforms to a 2-across pattern, and ultimately transforms to a 4-across pattern
   * - **1-4up** yields a grid whose grid items are stacked on small screens,
   *   transforms to a 4-across pattern on medium/large screens
   */
  @property()
      variant?: 'side-by-side' | '2up' | '3up' | '1-3up' | '4up' | '1-4up' | '1-2-4up' | '2-4-6up';

  /**
   * Style variant
   * - **none** yields a grid whose grid items are spaced without any gutter in between
   * - **sm** yields a grid whose grid items are spaced with a gap smaller than the default
   * - **lg** yields a grid whose grid items are spaced with a gap larger than the default
   */
  @property()
      gap?: 'none' | 'sm' | 'lg';

  /**
   * Break variant
   * - **faster** breaks the grid at a smaller width than the default.
   *   Example: 2up grid breaks to 2 per row at smaller width than default
   * - **slower** breaks the grid at a larger width than the default.
   *   Example: 2up grid breaks to 2 per row at larger width than default
   * - **lg** yields a grid whose grid items are spaced with a gap larger than the default
   */
  @property()
      break?: 'faster' | 'slower';

  render() {
      const componentClassName = this.componentClassNames('cre8-c-grid', {
          'cre8-c-grid--side-by-side': this.variant === 'side-by-side',
          'cre8-c-grid--2up': this.variant === '2up',
          'cre8-c-grid--3up': this.variant === '3up',
          'cre8-c-grid--1-3up': this.variant === '1-3up',
          'cre8-c-grid--4up': this.variant === '4up',
          'cre8-c-grid--1-4up': this.variant === '1-4up',
          'cre8-c-grid--1-2-4up': this.variant === '1-2-4up',
          'cre8-c-grid--2-4-6up': this.variant === '2-4-6up',
          'cre8-c-grid--gap-none': this.gap === 'none',
          'cre8-c-grid--gap-sm': this.gap === 'sm',
          'cre8-c-grid--gap-lg': this.gap === 'lg',
          'cre8-c-grid--break-faster': this.break === 'faster',
          'cre8-c-grid--break-slower': this.break === 'slower',
      });

      return html`
      <div class="${componentClassName}">
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-grid') === undefined) {
    customElements.define('cre8-grid', cre8Grid);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-grid': cre8Grid;
  }
}

export default cre8Grid;
