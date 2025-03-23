import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './dropdown-item.scss';

/**
 * The Dropdown item component is designed to be used with Dropdown component, each item represents a
 * selectable option or action within the dropdown menu. It can be configured to trigger actions, navigate
 * to links, initiate commands when clicked.
 */
export class cre8DropdownItem extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  @property({ type: String })
      ariaLabel = '';

  private _handleClick(e: MouseEvent) {
      this.dispatchEvent(new Event('dropdown-item-selected', e));
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
    customElements.define('cre8-dropdown-item', cre8DropdownItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-dropdown-item': cre8DropdownItem;
  }
}

export default cre8DropdownItem;
