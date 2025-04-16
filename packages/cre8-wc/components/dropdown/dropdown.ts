import { html, nothing, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import svgCaretDown from '@Cre8/cre8-icons/lib/icons/System/Filled/Caret Down.svg?raw';
import { Cre8Element } from '../cre8-element';
import styles from './dropdown.scss';

/**
 * The Dropdown menu itself is a container that can host multiple interactive items, commonly formatted as a list
 */

export class Cre8Dropdown extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

    @state() open = false;

  /**
   * Dropdown header
   */
  @property({ type: String })
      buttonText = '';

  /**
   * Enables scrolling once content reached to specified height, the height should mention in px units, ex: 100px
   */
  @property()
      maxHeight?: string;

  @query('.cre8-c-dropdown')
      dropdownContent!: HTMLElement;

  /**
   * button text represents as a link
   */
  @property()
      dropdownWithLink = false;

  constructor() {
      super();
      this._closeDropdown.bind(this);
  }

  connectedCallback() {
      super.connectedCallback();
      document.addEventListener('click', this._closeDropdown);
  }

  disconnectedCallback() {
      super.disconnectedCallback();
      document.removeEventListener('click', this._closeDropdown);
  }

  private _toggleDropdown(e: Event) {
      e.preventDefault();
      e.stopPropagation();
      this.open = !this.open;
      if (this.open) {
          this._updateDropdownPosition();
      }
  }


  private _updateDropdownPosition() {
      if (this.dropdownContent && this.open) {
          if (this.maxHeight) {
              this.dropdownContent.style.maxHeight = this.maxHeight;
              this.dropdownContent.style.overflowY = 'auto';
          }
          if (this.dropdownWithLink) {
              this.dropdownContent.style.top = '85%';
          }
      }
  }

  private _closeDropdown() {
      this.open = false;
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-dropdown', {
          'cre8-c-dropdown--close': !this.open,
          'cre8-c-dropdown--open': this.open,
      });

      return html`
      <div class="cre8-c-dropdown-container">
      ${this.dropdownWithLink
        ? html`<a href="#" aria-haspopup="true" class="cre8-c-dropdown--toggle cre8-c-dropdown--link" aria-expanded="${this.open ? 'true' : 'false'}" @click="${this._toggleDropdown}">${this.buttonText}
        ${this.buttonText
        ? html`<cre8-icon svg='${svgCaretDown}' aria-hidden="true" class="cre8-c-dropdown--icon-link"></cre8-icon>`
        : nothing}
      </a>`
        : html`<button aria-haspopup="true" class="cre8-c-dropdown--toggle cre8-c-dropdown--button" aria-expanded="${this.open ? 'true' : 'false'}" @click="${this._toggleDropdown}">${this.buttonText}
      ${this.buttonText
        ? html`<cre8-icon svg='${svgCaretDown}' aria-hidden="true" class="cre8-c-dropdown--icon-button"></cre8-icon>`
        : nothing}
        </button>`
}
        <ul role="list" class="${componentClassNames}">
          <slot></slot>
        </ul>
      </div>
    `;
  }
}

if (customElements.get('cre8-dropdown') === undefined) {
    customElements.define('cre8-dropdown', Cre8Dropdown);
}
declare global {
  interface HTMLElementTagNameMap {
    'cre8-dropdown': Cre8Dropdown;
  }
}

export default Cre8Dropdown;
