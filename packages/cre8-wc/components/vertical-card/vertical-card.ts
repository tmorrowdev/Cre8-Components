import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './vertical-card.scss';

/**
 * @slot - The component content
 */
export class Cre8VerticalCard extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Style variant
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**secondary** renders a secondary vertical card color</li>
   * <li>**tertiary** renders a tertiary vertical card color</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      variant?: 'secondary' | 'tertiary';

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-vertical-card', {
          'cre8-c-vertical-card--secondary': this.variant === 'secondary',
          'cre8-c-vertical-card--tertiary': this.variant === 'tertiary',
      });

      return html`
      <div class="${componentClassNames}">
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-vertical-card') === undefined) {
    customElements.define('cre8-vertical-card', Cre8VerticalCard);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-vertical-card': Cre8VerticalCard;
  }
}

export default Cre8VerticalCard;
