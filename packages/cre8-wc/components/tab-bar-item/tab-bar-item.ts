import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './tab-bar-item.styles.js';

/**
 * One destination in a `cre8-tab-bar`.
 *
 * `index` and `isActive` are set by the parent bar, not by the host — an item
 * that decided its own selected state would let two items be active at once.
 *
 * @slot - The icon. Anything that renders at 24px square; an inline `svg` is
 *   the usual choice, and `currentColor` will follow the item's tint.
 *
 * @fires tab-bar-select - Fires on activation. Handled by the parent bar, which
 *   re-emits it after updating its own state.
 */
export class Cre8TabBarItem extends Cre8Element {
    static styles = [styles];

  /** The visible label. iOS shows one below the icon; keep it to a word. */
  @property()
      label = '';

  /** Optional identifier handed back in the select event, for routing. */
  @property()
      value?: string;

  /**
   * Position within the bar.
   *
   * _*This property is dynamically set by `cre8-tab-bar`_
   */
  @property({ type: Number })
      index?: number;

  /**
   * Whether this is the current destination.
   *
   * _*This property is dynamically set by `cre8-tab-bar`_
   */
  @property({ type: Boolean, reflect: true })
      isActive?: boolean;

  /**
   * A count rendered on the icon. Numbers above 99 render as "99+", because the
   * badge is a glance, not a readout.
   */
  @property({ type: Number })
      badge?: number;

  private _handleClick() {
      this.dispatchEvent(
          new CustomEvent('tab-bar-select', {
              detail: { index: this.index, value: this.value },
              bubbles: true,
              composed: true,
          })
      );
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-tab-bar-item', {
          'cre8-is-active': this.isActive,
      });

      return html`
      <button
        type="button"
        role="tab"
        class="${componentClassNames}"
        aria-selected="${this.isActive ? 'true' : 'false'}"
        @click=${this._handleClick}
      >
        <span class="cre8-c-tab-bar-item__icon">
          <slot></slot>
          ${this.badge
        ? html`<span class="cre8-c-tab-bar-item__badge">${this.badge > 99 ? '99+' : this.badge}</span>`
        : null}
        </span>
        <span class="cre8-c-tab-bar-item__label">${this.label}</span>
      </button>
    `;
  }
}

if (customElements.get('cre8-tab-bar-item') === undefined) {
    customElements.define('cre8-tab-bar-item', Cre8TabBarItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-tab-bar-item': Cre8TabBarItem;
  }
}

export default Cre8TabBarItem;
