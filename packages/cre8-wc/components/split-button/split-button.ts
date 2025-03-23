import { html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import '../button/button';
import styles from './split-button.scss';

/**
 * @slot - The component content , this will consist of the dropdown when the user clicks the caret
 */
export class cre8SplitButton extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  @state()
      dropdownOpen = false;

  @property({ type: Boolean, reflect: true })
      disabled?: boolean;

  /**
   * Size variant
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**sm** shrinks the button typography and overall size</li>
   * <li>**lg** increases the button typography size and overall size</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      size?: 'sm' | 'lg';

  /**
   * Display text on the button
   */
  @property()
      buttonText: string;

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-split-button', {});

      return html`
      <div class="${componentClassNames}">
        <div class="cre8-c-split-button__button-container">
          <cre8-button
            class="cre8-c-split-button__text-button"
            variant="secondary"
            splitButtonType="text"
            ?disabled=${this.disabled}
            text="${this.buttonText}"
            size="${this.size}"
            @click="${this._textClick}"
          >
          </cre8-button>
          <cre8-button
            class="cre8-c-split-button__arrow-button"
            variant="icon-only secondary"
            splitButtonType="caret"
            iconName="${this.dropdownOpen ? 'delta-down' : 'delta-up'}"
            ?disabled=${this.disabled}
            hideText="true"
            size="${this.size}"
            @click="${this._dropdownClick}"
          >
          </cre8-button>
        </div>
        ${this.dropdownOpen ? html`<slot></slot>` : ''}
      </div>
    `;
  }

  private _textClick(e: MouseEvent) {
      this.dispatchEvent(new Event('text-click', e));
  }

  private _dropdownClick(e: MouseEvent) {
      this.dropdownOpen = !this.dropdownOpen;
      this.dispatchEvent(new Event('dropdown-click', e));
  }
}

if (customElements.get('cre8-split-button') === undefined) {
    customElements.define('cre8-split-button', cre8SplitButton);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-split-button': cre8SplitButton;
  }
}

export default cre8SplitButton;
