import { html,  } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './button-group.styles.js';

/**
 * @slot - The component content
 */

export class Cre8ButtonGroup extends Cre8Element {
    static styles = [styles];

  /**
   * Responsive Button Group (for modals)
   */
  @property()
      orientation?: 'responsive-full-width';

  /**
   * Stretch button group to fill its container width
   */
  @property({ type: Boolean, reflect: true })
      fullWidth?: boolean;

  /**
   * Gap between buttons
   * - **sm** reduces gap to 8px (useful in compact contexts)
   */
  @property()
      gap?: 'sm';

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-button-group', {
          'cre8-c-button-group--responsive-full-width': this.orientation === 'responsive-full-width',
          'cre8-c-button-group--full-width': !!this.fullWidth,
          'cre8-c-button-group--gap-sm': this.gap === 'sm',
      });

      return html`
      <div class="${componentClassNames}">
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-button-group') === undefined) {
    customElements.define('cre8-button-group', Cre8ButtonGroup);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-button-group': Cre8ButtonGroup;
  }
}

export default Cre8ButtonGroup;
