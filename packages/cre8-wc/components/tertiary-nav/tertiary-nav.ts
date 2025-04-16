import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './tertiary-nav.scss';

/**
 * @slot - The component content
 */
export class Cre8TertiaryNav extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Allows the tertiary nav to take up the full width of it parent container
   */
  @property({ type: Boolean, reflect: true })
      fullWidth?: boolean;

  /**
   * aria-label attribute to designate at name for the nav. Can be override by user
   */
  @property()
      navAriaLabel: string = 'tertiary';

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-tertiary-nav', {
          'cre8-c-tertiary-nav--full-width': this.fullWidth,
      });

      return html`
      <nav aria-label="${this.navAriaLabel}" role="navigation" class="${componentClassNames}">
        <ul role="list" class="cre8-c-tertiary-nav__list">
          <slot></slot>
        </ul>
      </nav>
    `;
  }
}

if (customElements.get('cre8-tertiary-nav') === undefined) {
    customElements.define('cre8-tertiary-nav', Cre8TertiaryNav);
}

declare global { interface HTMLElementTagNameMap { 'cre8-tertiary-nav': Cre8TertiaryNav; } }

export default Cre8TertiaryNav;
