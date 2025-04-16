import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './utility-nav.scss';

/**
 * @slot - The utility nav items
 */
export class Cre8UtilityNav extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   * Inverted variant
   * 1) Used for dark backgrounds
   */
  @property({ type: Boolean, reflect: true })
      inverted?: boolean;

    /**
   * aria-label attribute to designate at name for the nav. Can be override by user
   */
  @property()
      navAriaLabel: string = 'utility';

  render() {
      const componentClassName = this.componentClassNames('cre8-c-utility-nav', {
          'cre8-c-utility-nav--inverted': this.inverted === true,
      });

      return html`
      <nav aria-label="${this.navAriaLabel}" class="${componentClassName}">
        <ul class="cre8-c-utility-nav__list">
          <slot></slot>
        </ul>
      </nav>
    `;
  }
}

if (customElements.get('cre8-utility-nav') === undefined) {
    customElements.define('cre8-utility-nav', Cre8UtilityNav);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-utility-nav': Cre8UtilityNav;
  }
}

export default Cre8UtilityNav;
