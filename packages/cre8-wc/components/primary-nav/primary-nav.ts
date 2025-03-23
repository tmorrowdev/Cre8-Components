import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './primary-nav.scss';

/**
 * @slot - The primary navigation items
 */
export class cre8PrimaryNav extends Cre8Element {
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
      navAriaLabel: string = 'main';

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-primary-nav', {
          'cre8-c-primary-nav--side-by-side': this.behavior === 'side-by-side',
          'cre8-c-primary-nav--inverted': this.inverted === true,
      });

      return html`
      <nav aria-label="${this.navAriaLabel}" class="${componentClassNames}">
        <ul class="cre8-c-primary-nav__list">
          <slot></slot>
        </ul>
      </nav>
    `;
  }
}

if (customElements.get('cre8-primary-nav') === undefined) {
    customElements.define('cre8-primary-nav', cre8PrimaryNav);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-primary-nav': cre8PrimaryNav;
  }
}

export default cre8PrimaryNav;
