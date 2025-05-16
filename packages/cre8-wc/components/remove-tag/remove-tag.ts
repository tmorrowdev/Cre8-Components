import classnames from 'classnames';
import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import svgClose from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Close.svg?raw';
import { Cre8Element } from '../cre8-element';
import '../icon/icon';
import styles from './remove-tag.scss';

export enum Shape {
  Round = 'round',
  Square = 'square',
}

export enum Color {
  Neutral = 'neutral',
  Branded = 'branded',
  NeutralHybrid = 'neutral-hybrid',
}

/**
 * Clicking a Remove Tag causes it to disappear from the page or field (in the case of Multi-Select).
 * These tags always display a "Close" icon.
 */
export class Cre8RemoveTag extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * The tag text
   */
  @property({ type: String })
      text?: string;

  /**
   * The tag color scheme
   *
   *  - **neutral** should be used when doing non-link actions such as filters or multi-select, within forms, etc.
   *  - **neutral-hybrid** should be used for when tags are doing an action like a button or a link
   *  - **branded** should be used like Neutral, but for marketing / actionable items
   */
  @property({ type: String })
      color: Color.Neutral | Color.Branded | Color.NeutralHybrid = Color.Neutral;

  /**
   * The tag shape
   *
   * - **round** will give the tag a rounded border
   * - **square** will give the tag a squared border
   */
  @property({ type: String })
      shape: Shape.Round | Shape.Square = Shape.Round;

  /**
   * Disabled state for remove tag
   */
  @property({ type: Boolean })
      disabled?: boolean;

  /**
   * Dispatches an event when the tag is clicked
   */
  private _handleRemoveTagClicked() {
      const customEvent = new CustomEvent('removeTagClicked', {
          detail: { message: 'Remove Tag clicked.' },
          bubbles: true,
          composed: true,
      });
      this.dispatchEvent(customEvent);
  }

  render() {
      const componentClassName = classnames('cre8-c-remove-tag', {
          'cre8-c-remove-tag--neutral': this.color === 'neutral',
          'cre8-c-remove-tag--branded': this.color === 'branded',
          'cre8-c-remove-tag--neutral-hybrid': this.color === 'neutral-hybrid',
          'cre8-c-remove-tag--round': this.shape === 'round',
          'cre8-c-remove-tag--square': this.shape === 'square',
      });

      return html` <button
      class="${componentClassName}"
      @click="${this._handleRemoveTagClicked}"
      ?disabled=${this.disabled}
    >
      <span>${this.text}</span>
      <div class="cre8-c-remove-tag-item__icon">
        <cre8-icon
          width="16"
          height="16"
          svg="${svgClose}"
          aria-label="remove"
        ></cre8-icon>
      </div>
    </button>`;
  }
}

if (customElements.get('cre8-remove-tag') === undefined) {
    customElements.define('cre8-remove-tag', Cre8RemoveTag);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-remove-tag': Cre8RemoveTag;
  }
}

export default Cre8RemoveTag;
