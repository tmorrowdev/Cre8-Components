import { html, unsafeCSS } from 'lit';
import { state } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './header.scss';

/**
 * @slot - The header content
 */
export class Cre8Header extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   * Is active state
   * 1) Set to true when small screen menu is open
   */
  @state()
      isActive?: boolean;

  render() {
      const componentClassName = this.componentClassNames('cre8-c-header', {
          'cre8-is-active': this.isActive === true,
      });

      return html`
      <header class="${componentClassName}">
        ${this.slotNotEmpty('top')
        && html`<div class="cre8-c-header__top">
          <cre8-layout-container>
            <div class="cre8-c-header__top-inner">
              <slot name="top"></slot>
            </div>
          </cre8-layout-container>
        </div>`}
        <div class="cre8-c-header__middle">
          <cre8-layout-container>
            <div class="cre8-c-header__middle-inner">
              <slot></slot>
            </div>
          </cre8-layout-container>
        </div>
        ${this.slotNotEmpty('bottom')
        && html`<div class="cre8-c-header__bottom">
          <cre8-layout-container>
            <slot name="bottom"></slot>
          </cre8-layout-container>
        </div>`}
      </header>
    `;
  }
}

if (customElements.get('cre8-header') === undefined) {
    customElements.define('cre8-header', Cre8Header);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-header': Cre8Header;
  }
}

export default Cre8Header;
