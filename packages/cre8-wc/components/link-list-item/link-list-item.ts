import { html, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './link-list-item.scss';

/**
 * @slot - The default slot to put badges or other Components
 */
export class cre8LinkListItem extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   * The link text
   */
  @property()
      text?: string;

  /**
   * Active link
   */
  @property({ type: Boolean, reflect: true })
      isActive?: boolean;

  /**
   * The link URL
   */
  @property()
      href?: string;

  render() {
      const componentClassName = this.componentClassNames('cre8-c-link-list__item', {
          'cre8-is-active': this.isActive === true,
      });

      return html`
      <li class="${componentClassName}">
        <a class="cre8-c-link-list__link" href="${ifDefined(this.href)}">
          ${this.slotNotEmpty('itemBefore') && html`
          <div class="cre8-c-link-list__item-before">
            <slot name="itemBefore"></slot>
          </div>`}
          <slot></slot>
        </a>
        ${this.slotNotEmpty('itemAfter') && html`
        <div class="cre8-c-link-list__item-after">
          <slot name="itemAfter"></slot>
        </div>`}
      </li>
    `;
  }
}

if (customElements.get('cre8-link-list-item') === undefined) {
    customElements.define('cre8-link-list-item', cre8LinkListItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-link-list-item': cre8LinkListItem;
  }
}

export default cre8LinkListItem;
