import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './global-nav.scss';

/**
 * @slot - The primary navigation items
 */
export class Cre8GlobalNav extends Cre8Element {
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
   * Behavior variant
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**side-by-side** keeps the primary nav item always in a horizontal pattern</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      behavior?: 'side-by-side';

  /**
   * aria-label attribute to designate at name for the nav. Can be override by user
   */
  @property()
      navAriaLabel: string = 'global';

  render() {
      const componentClassName = this.componentClassNames('cre8-c-global-nav', {
          'cre8-c-global-nav--side-by-side': this.behavior === 'side-by-side',
          'cre8-c-global-nav--inverted': this.inverted === true,
      });

      return html`
      <nav aria-label="${this.navAriaLabel}" class="${componentClassName}">
        <ul class="cre8-c-global-nav__list">
          <slot></slot>
        </ul>
      </nav>
    `;
  }
}

if (customElements.get('cre8-global-nav') === undefined) {
    customElements.define('cre8-global-nav', Cre8GlobalNav);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-global-nav': Cre8GlobalNav;
  }
}

export default Cre8GlobalNav;
