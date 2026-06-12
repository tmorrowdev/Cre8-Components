import { html,  } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './dropdown-item.styles.js';

/**
 * The Dropdown item component is designed to be used with Dropdown component, each item represents a
 * selectable option or action within the dropdown menu. It can be configured to trigger actions, navigate
 * to links, initiate commands when clicked.
 *
 * @slot - The label content for the dropdown item.
 *
 * @fires dropdown-item-selected - Fires when the item is clicked. `event.detail.originalEvent` holds the source `MouseEvent`.
 */
export class Cre8DropdownItem extends Cre8Element {
    static styles = [styles];

  /**
   * The accessible label for the item. Falls back to the item's text content when unset.
   */
  @property({ type: String })
      ariaLabel = '';

  private _handleClick(e: MouseEvent) {
      this.dispatch({ e, eventName: 'dropdown-item-selected' });
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-dropdown-item', {});
      const linkAriaLabel = this.ariaLabel || `Link to ${this.textContent}` || 'Drop down Item';
      return html`<li class="${componentClassNames}" role="listitem">
        <button aria-label="${linkAriaLabel}" @click=${this._handleClick}><slot></slot></button>
      </li>`;
  }
}

if (customElements.get('cre8-dropdown-item') === undefined) {
    customElements.define('cre8-dropdown-item', Cre8DropdownItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-dropdown-item': Cre8DropdownItem;
  }
}

export default Cre8DropdownItem;
