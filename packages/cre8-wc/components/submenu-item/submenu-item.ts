import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './submenu-item.scss';

/**
 * @slot - The component content
 */
export class Cre8SubmenuItem extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * The link URL
   */
  @property()
      href?: string;

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-submenu-item', {});

      if (this.href) {
          return html`
        <li role="listitem" class="${componentClassNames}">
          <a href=${this.href} class="cre8-c-submenu-item__link">
            <slot></slot>
          </a>
        </li>
      `;
      }
      return html`<li role="listitem" class="${componentClassNames}">
        <button class="cre8-c-submenu-item__link">
          <slot></slot>
        </button>
      </li>`;
  }
}

if (customElements.get('cre8-submenu-item') === undefined) {
    customElements.define('cre8-submenu-item', Cre8SubmenuItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-submenu-item': Cre8SubmenuItem;
  }
}

export default Cre8SubmenuItem;
