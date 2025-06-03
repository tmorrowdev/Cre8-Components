import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import lightDomStyles from './text-passage-light-dom.module';
import styles from './text-passage.module';

/**
 * The text-passage component acts a general wrapper element
 * for any text content that needs to be used in your project.
 *
 * # How to Use
 * 1. Code your text passage using any of the native html text elements (p, ol, ul, blockquote, cite, etc.)
 *    or other Cre8 Components like cre8-heading and wrap them with the cre8-text-passage tags.
 * 2. Choose between three sizes for your text content or apply inline styling if you need additional styling.
 * 3. For dark backgrounds, add the 'inverted' attribute to the <cre8-text-passage> tag.
 * 3. Your text-passage will render with brand-approved styling!
 *
 *
 * NOTE: It is recommended that you use the cre8-heading component for any heading elements in your HTML template
 *
 * @slot - The component content
 */
export class Cre8TextPassage extends Cre8Element {
    static styles = [styles];

  /**
   * Inverted variant
   * 1) Used for dark backgrounds
   */
  @property({ type: Boolean, reflect: true })
      inverted?: boolean;

  /**
   * Size variant
   * - **small** renders smaller typography than the default variant
   * - **default** renders default typography variant
   * - **large** renders larger typography than the default variant
   */
  @property()
      size?: 'small' | 'default' | 'large' = 'default';

  /**
   * Add the light dom styles when this component is connected to a page
   */
  connectedCallback() {
      super.connectedCallback();

      const lightDomExists = document.head.querySelector('#cre8-text-passage-styles');
      if (!lightDomExists) {
          const lightDomStyle = document.createElement('style');
          lightDomStyle.id = 'cre8-text-passage-styles';
          lightDomStyle.innerHTML = lightDomStyles.cssText;
          document.head.appendChild(lightDomStyle);
      }
  }

  render() {
      const componentClassName = this.componentClassNames('cre8-c-text-passage', {
          'cre8-c-text-passage--default': this.size === 'default' || undefined,
          'cre8-c-text-passage--inverted': this.inverted,
          'cre8-c-text-passage--small': this.size === 'small',
          'cre8-c-text-passage--large': this.size === 'large',
      });

      return html`
      <div class="${componentClassName}">
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-text-passage') === undefined) {
    customElements.define('cre8-text-passage', Cre8TextPassage);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-text-passage': Cre8TextPassage;
  }
}

export default Cre8TextPassage;
