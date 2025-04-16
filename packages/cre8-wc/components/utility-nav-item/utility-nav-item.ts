import { html, nothing, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './utility-nav-item.scss';

export class Cre8UtilityNavItem extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   * Hide text toggle
   * 1) Visually hides the text so screenreaders can still read for accessibility when set to true.
   */
  @property({ type: Boolean, reflect: true })
      hideText?: boolean;

  /**
   * URL of the utility nav item
   */
  @property()
      href?: string;

  /**
   * Icon name
   */
  @property()
      iconName?: string;

  /**
   * Icon position
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**before** places the icon before the text</li>
   * <li>**after** places the icon after the text</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      iconPosition?: 'before' | 'after' = undefined;

  /**
   * Text of the utility nav item
   */
  @property()
      text?: string;

  render() {
      const componentClassName = this.componentClassNames('cre8-c-utility-nav__item', {});

      if (this.href) {
          return html`
        <li class="${componentClassName}">
          <a href="${this.href}" class="cre8-c-utility-nav__link">
            ${this.iconPosition === 'before'
        ? html`<cre8-icon-legacy aria-hidden="true" name="${ifDefined(this.iconName)}"></cre8-icon-legacy>`
        : nothing}
            <span
              class="${this.hideText ? 'cre8-u-is-vishidden cre8-c-utility-nav__text' : 'cre8-c-utility-nav__text'}"
            >
              ${this.text}
            </span>
            ${this.iconPosition === 'after'
        ? html`<cre8-icon-legacy aria-hidden="true" name="${ifDefined(this.iconName)}"></cre8-icon-legacy>`
        : nothing}
          </a>
        </li>
      `;
      }
      return html`
        <li class="${componentClassName}">
          <button class="cre8-c-utility-nav__link">
            ${this.iconPosition === 'before'
        ? html`<cre8-icon-legacy aria-hidden="true" name="${ifDefined(this.iconName)}"></cre8-icon-legacy>`
        : nothing}
            <span
              class="${this.hideText ? 'cre8-u-is-vishidden cre8-c-utility-nav__text' : 'cre8-c-utility-nav__text'}"
            >
              ${this.text}
            </span>
            ${this.iconPosition === 'after'
        ? html`<cre8-icon-legacy aria-hidden="true" name="${ifDefined(this.iconName)}"></cre8-icon-legacy>`
        : nothing}
          </button>
        </li>
      `;
  }
}

if (customElements.get('cre8-utility-nav-item') === undefined) {
    customElements.define('cre8-utility-nav-item', Cre8UtilityNavItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-utility-nav-item': Cre8UtilityNavItem;
  }
}

export default Cre8UtilityNavItem;
