import { html, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './tertiary-nav-item.scss';

/**
 * @slot - The component content
 */
export class Cre8TertiaryNavItem extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * The href value of the tertiary nav link
   */
  @property()
      href?: string;

  /**
   * The current state of the tertiary nav link
   */
  @property({ type: Boolean, reflect: true })
      isCurrent?: boolean;

  /**
   * Handle on click
   * 1. On click, remove all isCurrent properties from all tertiary-nav items
   * 2. Add isCurrent to the item clicked
   */
  private _handleOnClick() {
    /* 1 */
      const tertiaryNav = this.closest('cre8-tertiary-nav');
      const allTertiaryNavItems = tertiaryNav.shadowRoot.querySelector('slot')
          .assignedElements({ flatten: false }) as Cre8TertiaryNavItem[];
      allTertiaryNavItems.forEach((item: Cre8TertiaryNavItem) => {
          item.isCurrent = false;
      });

    /* 2 */
      this.isCurrent = true;
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-tertiary-nav-item', {
          'cre8-is-current': this.isCurrent,
      });

      return html`
      <li role="listitem" class="${componentClassNames}">
        <a
          class="cre8-c-tertiary-nav-item__link"
          aria-current=${ifDefined(this.isCurrent ? 'page' : undefined)}
          @click=${this._handleOnClick}
          href=${ifDefined(this.href)}
        >
          <slot></slot>
        </a>
      </li>
    `;
  }
}

if (customElements.get('cre8-tertiary-nav-item') === undefined) {
    customElements.define('cre8-tertiary-nav-item', Cre8TertiaryNavItem);
}

declare global { interface HTMLElementTagNameMap { 'cre8-tertiary-nav-item': Cre8TertiaryNavItem; } }

export default Cre8TertiaryNavItem;
