import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './card.module';

/** The card component acts a general container element sectioned off by slots: `header`, `body`, `footer`.
*
* # How to Use
* 1. Wrap the card component tags around any html template code which has been properly imported into the file.
* 2. Decide the layout that best fits the designs assigned to your work.
*   Generally, we recommend visual elements appear in the `header` (optional slot),
*   while `body` remains reserved for custom html content that gives further context and meaning to the `header`.
* 3. The card defaults to a column and includes a `horizontal` directional variant.
*   If you have a card where the layout of the content is more aligned horizontally,
*   using the `horizontal` variant will ease the construction of your component
* 4. Finally, we typically recommend reserving the footer for any interactive elements
*   such as buttons for navigating to further information.
*
*
* NOTE: Adjusting props not mentioned above may result in unpredictable states
*
* @slot body - The card's body content
* @slot header - (Optional) Content in the card's header
* @slot footer - (Optional) Content in the card's footer
*/
export class Cre8Card extends Cre8Element {
    static styles = [styles];

  /**
   * Style variants
   * - **bare** renders a card without a border and without padding around the content
   * - **horizontal** renders a card with header, body, footer oriented in a row rather than a column
   * - **horizontal-bare** renders a card with header, body, footer oriented in a row rather than a column
   *   without a border and without padding around the content
   */
  @property()
      variant?: 'bare' | 'horizontal' | 'horizontal-bare';

  /**
   * Alignment variant
   * - **center** renders a card that has center aligned content/text
   */
  @property()
      align?: 'center';

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-card', {
          'cre8-c-card--bare': this.variant === 'bare',
          'cre8-c-card--horizontal': this.variant === 'horizontal',
          'cre8-c-card--horizontal-bare': this.variant === 'horizontal-bare',
          'cre8-c-card--align-center': this.align === 'center',
      });

      return html`
      <div class="${componentClassNames}" part="card">
        ${this.slotNotEmpty('header')
          && html`<div class="cre8-c-card__header" part="header"><slot name="header"></slot></div>`}
        <div class="cre8-c-card__body" part="body">
          <slot></slot>
        </div>
        ${this.slotNotEmpty('footer')
          && html`<div class="cre8-c-card__footer" part="footer"><slot name="footer"></slot></div>`}
      </div>
    `;
  }
}

if (customElements.get('cre8-card') === undefined) {
    customElements.define('cre8-card', Cre8Card);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-card': Cre8Card;
  }
}

export default Cre8Card;
