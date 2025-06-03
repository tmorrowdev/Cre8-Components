import { html, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './text-link.module';

/**
 * @slot - The component content
 */
export class Cre8TextLink extends Cre8Element {
    static styles = [styles];

  /**
   * The link URL
   */
  @property()
      href?: string;

  /**
   * Style variant
   * <cre8-text-passage size="sm">
   * <ul>
   * <li> **display** applies display treatment to the text link (e.g. article title link)</li>
   * <li> **secondary** applies secondary treatment to the text link (e.g. non-prominent links)</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      variant?: 'display' | 'secondary';

  /**
   * Size variant
   * <cre8-text-passage size="sm">
   * <ul>
   * <li> **sm** renders a smaller typography preset than the default</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      size?: 'sm';

  /**
   * Inverted variant
   * 1) Used for dark backgrounds
   */
  @property({ type: Boolean, reflect: true })
      inverted?: boolean;

  render() {
      const componentClassName = this.componentClassNames('cre8-c-text-link', {
          'cre8-c-text-link--inverted': this.inverted === true,
          'cre8-c-text-link--display': this.variant === 'display',
          'cre8-c-text-link--secondary': this.variant === 'secondary',
          'cre8-c-text-link--sm': this.size === 'sm',
      });

      return html`
      <a href="${ifDefined(this.href)}" class="${componentClassName}">
        <slot></slot>
        ${this.slotNotEmpty('linkAfter')
        && html`<div class="cre8-c-text-link__after">
          <slot name="linkAfter"></slot>
        </div>`}
      </a>
    `;
  }
}

if (customElements.get('cre8-text-link') === undefined) {
    customElements.define('cre8-text-link', Cre8TextLink);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-text-link': Cre8TextLink;
  }
}

export default Cre8TextLink;
