import { html,  } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './container-grid.styles.js';

/** `cre8-container-grid` is `cre8-grid`'s layout vocabulary - stacked to
* N-across patterns - keyed to this element's own rendered width via
* `@container` instead of the viewport via `@media`. It establishes its own
* containment context, so use it wherever the number of columns should
* depend on the space actually available: a grid placed in a narrow sidebar
* on a wide viewport still stacks, and a grid placed in a wide main column
* on a narrow viewport still goes multi-up.
*
* @slot - The grid items
*/
export class Cre8ContainerGrid extends Cre8Element {
    static styles = [styles];

  /**
   * Style variant
   * - **side-by-side** yields a grid whose grid items display side-by-side (2 per row) regardless of width
   * - **2up** yields a grid whose grid items are stacked when this element is narrow
   *   but display side-by-side once it has enough of its own width to do so
   * - **3up** yields a grid whose grid items are stacked when narrow,
   *   transforms to a 2-across pattern and then transforms again to a 3-across pattern
   * - **1-3up** yields a grid whose grid items are stacked when narrow
   *   and transforms to a 3-across pattern once wide enough
   * - **4up** yields a grid whose grid items are stacked when narrow,
   *   transforms to a 2-across pattern, transforms again to a 3-across pattern,
   *   and ultimately transforms to a 4-across pattern
   * - **1-2-4up** yields a grid whose grid items are stacked when narrow,
   *   transforms to a 2-across pattern, and ultimately transforms to a 4-across pattern
   * - **1-4up** yields a grid whose grid items are stacked when narrow,
   *   transforms to a 4-across pattern once wide enough
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
   * - **faster** breaks the grid at a smaller container width than the default.
   *   Example: 2up grid breaks to 2 per row at a smaller width than default
   * - **slower** breaks the grid at a larger container width than the default.
   *   Example: 2up grid breaks to 2 per row at a larger width than default
   */
  @property()
      break?: 'faster' | 'slower';

  render() {
      const componentClassName = this.componentClassNames('cre8-c-container-grid', {
          'cre8-c-container-grid--side-by-side': this.variant === 'side-by-side',
          'cre8-c-container-grid--2up': this.variant === '2up',
          'cre8-c-container-grid--3up': this.variant === '3up',
          'cre8-c-container-grid--1-3up': this.variant === '1-3up',
          'cre8-c-container-grid--4up': this.variant === '4up',
          'cre8-c-container-grid--1-4up': this.variant === '1-4up',
          'cre8-c-container-grid--1-2-4up': this.variant === '1-2-4up',
          'cre8-c-container-grid--2-4-6up': this.variant === '2-4-6up',
          'cre8-c-container-grid--gap-none': this.gap === 'none',
          'cre8-c-container-grid--gap-sm': this.gap === 'sm',
          'cre8-c-container-grid--gap-lg': this.gap === 'lg',
          'cre8-c-container-grid--break-faster': this.break === 'faster',
          'cre8-c-container-grid--break-slower': this.break === 'slower',
      });

      return html`
      <div class="${componentClassName}">
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-container-grid') === undefined) {
    customElements.define('cre8-container-grid', Cre8ContainerGrid);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-container-grid': Cre8ContainerGrid;
  }
}

export default Cre8ContainerGrid;
