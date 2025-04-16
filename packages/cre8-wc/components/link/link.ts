import svgArrowLeft from '@Cre8/cre8-icons/lib/icons/System/Regular/Arrow - Left.svg?raw';
import {
    html, nothing, unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Cre8Element } from '../cre8-element';
import styles from './link.scss';

/**
 * Link Component are strictly used in the case where the component will take
 * the user away from the current page to a new url.
 * In this vein, this component should ONLY be used in situations an anchor tag would be used (an href is required)
 * This goes for the variations as well such as the Call To Action Link
 *
 * **Note**
 *
 * For link with icon:
 * - **iconRotateDegree** & **iconFlipDirection** props are optional.
 * - They are used to set up the correct direction for icons, for example,
 * arrows, caret up or caret down.
 *
*/

export class Cre8Link extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Href attribute of the anchor tag
   */
  @property()
      href: string;

  /**
   * Rel attribute of the anchor tag
   */
  @property()
      rel?: string;

  /**
   * Target attribute for a link (i.e. set to _blank to open in new tab)
   * - **_blank** yields a link that opens in a new tab
   * - **_self** yields a link that loads the URL into the same browsing context as the current one.
   *   This is the default behavior
   * - **_parent** yields a link that loads the URL into the parent browsing context of the current one.
   *   If there is no parent, this behaves the same way as _self
   * - **_top** yields a link that loads the URL into the top-level browsing context.
   *   If there is no parent, this behaves the same way as _self.
   */
  @property()
      target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * DEPRECATED: Icon name, use svg instead
   * @deprecated
   */
  @property()
      iconName?: string;

  /**
   * svg as a raw string
   * - For links with icon, the icon is defined by this prop.
   * - Pass in a raw svg as a String for using <cre8-icon>
   */
  @property()
      svg?: string;

  /**
   * iconRotateDegree is used for <cre8-icon> to set the arrow in the correct direction
   */
  @property({ type: Number })
      iconRotateDegree?: number = 0;

  /**
   * iconFlipDirection is used for <cre8-icon> to set the icon in the correct direction
   */
  @property()
      iconFlipDirection?: string;

  /**
   * Icon position
   * - **before** places the icon before the button text
   * - **after** places the icon after the button text
   */
  @property()
      iconPosition?: 'before' | 'after' = undefined;

  /**
   * Call To Action Icon
   */
  @property()
      ctaIcon = 'arrow-forward';

  /**
   * Call To Action Link
   */
  @property({ type: Boolean })
      ctaLink?: boolean;

  /**
   * Link with no underline
   */
  @property({ type: Boolean })
      noUnderline?: boolean;

  /**
   * Size variant (default is medium)
   * - **sm** shrinks the link typography and overall size
   * - **lg** increases the link typography size and overall size
   */
  @property()
      size?: 'sm' | 'lg';

  /**
   * Inverted colors Link (onDark)
   */
  @property({ type: Boolean })
      inverted?: boolean;

  private generateIcon() {
      if (this.iconName) {
          return html`
          <div class="cre8-c-link__icon-wrapper">
            <cre8-icon-legacy
              class="cre8-c-link__icon ${this.iconPosition}"
              aria-hidden="true"
              name="${ifDefined(this.iconName)}">
            </cre8-icon-legacy>
          </div>`;
      }

      if (this.svg) {
          return html`
          <div class="cre8-c-link__icon-wrapper">
            <cre8-icon
              class="cre8-c-link__icon ${this.iconPosition}"
              aria-hidden="true"
              svg='${this.svg}' rotate="${Number(this.iconRotateDegree)}" flip="${this.iconFlipDirection}">
            </cre8-icon>
          </div>`;
      } return nothing;
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-link', {
          'cre8-c-link--inverted': this.inverted,
          'cre8-c-link--sm': this.size === 'sm',
          'cre8-c-link--lg': this.size === 'lg',
          'cre8-c-link__no-underline': this.noUnderline,
      });

      return html`
      <a
        class="${componentClassNames}"
        href="${ifDefined(this.href)}"
        rel="${ifDefined(this.rel)}"
        target="${ifDefined(this.target)}"
      >
        <div class="cre8-c-link__text-area">
          ${this.iconPosition === 'before'
        ? html`${this.generateIcon()}`
        : nothing}
          <span class="cre8-c-link__text">
            <slot></slot>
          </span>
          ${this.iconPosition === 'after'
        ? html`${this.generateIcon()}`
        : nothing}
        </div>
        <div class="cre8-c-link__variation">
          <slot name="badge"></slot>
          ${this.ctaLink
        ? html`<div class="cre8-c-link__cta-wrapper">
                <cre8-icon class="cre8-c-link__action" svg='${svgArrowLeft}' 
                rotate="180" aria-hidden="true"></cre8-icon>
              </div>`
        : nothing}
        </div>
      </a>
    `;
  }
}

if (customElements.get('cre8-link') === undefined) {
    customElements.define('cre8-link', Cre8Link);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-link': Cre8Link;
  }
}

export default Cre8Link;
