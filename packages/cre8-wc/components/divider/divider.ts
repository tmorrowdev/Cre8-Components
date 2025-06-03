import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './divider.module';

/**
 * The divider component is a separator between sections of content or groups of items.
 * It often contains a horizontal or vertical line.
*/

export class Cre8Divider extends Cre8Element {
    static styles = [styles];

  /**
   * Divider variants
   * - By default, the component renders the horizontal divider
   * - **vertical** renders the vertical divider
  */
  @property()
      variant: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Status (a color variant prop)
   * - By default, the divider has gray color.
   * - **brand**, the divider has blue color.
   * - **knockout**, the divider has white color.
   */
  @property()
      status?: string;

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-divider', {
          'cre8-c-divider--horizontal': this.variant === 'horizontal',
          'cre8-c-divider--vertical': this.variant === 'vertical',
          'cre8-c-divider--brand': this.status === 'brand',
          'cre8-c-divider--knockout': this.status === 'knockout',
      });

      return html` <div class="${componentClassNames}"><wbr></div> `;
  }
}

if (customElements.get('cre8-divider') === undefined) {
    customElements.define('cre8-divider', Cre8Divider);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-divider': Cre8Divider;
  }
}

export default Cre8Divider;
