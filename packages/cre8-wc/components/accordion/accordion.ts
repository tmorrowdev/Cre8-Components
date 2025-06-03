import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './accordion.module';

/**
 * The component is a vertically stacked list of headers that reveal or hide sections of related content on a page.
 * The header title gives the user a high level overview of the content allowing the user to decide
 * which sections to expand for the information.
 *
 * Accordion contains Accordion Items as children. This component is the wrapper for grouping related accordion items.
 *
 * Users can select different border types: default (no border), rectangle, rounded bottom, and rounded.
 *
 */

export class Cre8Accordion extends Cre8Element {
    static styles = [styles];


  /**
   * borderType
   * @prop {'rectangle' | 'rounded-bottom' | 'rounded' | 'none'}
   *
   * Controls the border and border-radius of the parent container of the slotted accordions.
   *
   */
  @property()
      borderType?: 'rectangle' | 'rounded-bottom' | 'rounded' | 'none';

  /**
   *
   * When it is true, the inner dividers are displayed;
   * if it is false, the inner dividers are not displayed
   * @prop {boolean} hasDivider
   *
   */
  @property({ type: Boolean, reflect: true })
      hasDivider? = false;

  connectedCallback(): void {
      super.connectedCallback();
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-accordion', {
          'cre8-c-inner-divider': this.hasDivider === true,
          'cre8-c-accordion--border-none': this.borderType === undefined || this.borderType === 'none',
          'cre8-c-accordion--border-rectangle': this.borderType === 'rectangle',
          'cre8-c-accordion--border-rounded-bottom': this.borderType === 'rounded-bottom',
          'cre8-c-accordion--border-rounded': this.borderType === 'rounded',
      });

      return html`
      <div class="${componentClassNames}">
        <slot> </slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-accordion') === undefined) {
    customElements.define('cre8-accordion', Cre8Accordion);
}
declare global {
  interface HTMLElementTagNameMap {
    'cre8-accordion': Cre8Accordion;
  }
}

export default Cre8Accordion;
