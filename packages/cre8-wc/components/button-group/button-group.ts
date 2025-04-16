import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './button-group.scss';

/**
 * @slot - The component content
 */

export class Cre8ButtonGroup extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Responsive Button Group (for modals)
   */
  @property()
      orientation?: 'responsive-full-width';

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-button-group', {
          'cre8-c-button-group--responsive-full-width': this.orientation === 'responsive-full-width',
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
