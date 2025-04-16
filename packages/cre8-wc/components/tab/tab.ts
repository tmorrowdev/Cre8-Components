import { html, unsafeCSS, PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './tab.scss';

/**
 * @slot - The component content
 */

export class Cre8Tab extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Tab sizes
   * - **default** displays the tab text with cre8-typography-label-default
   * - **sm** displays the tab text with cre8-typography-label-small and decrease padding
   *
   * _*This property is dynamically set_
   */
  @property()
      size?: 'sm';

  /**
   * If is true, tab has active state and cooresponding tab panel is visible.
   *
   * _*This property is dynamically set_
   */
  @property({ type: Boolean, reflect: true })
      isActive?: boolean;

  /**
   * Used to align the tab with the tab panel
   *
   * _*This property is dynamically set_
   */
  @property({ type: Number })
      index?: number;

  /**
   * Used to connect tab trigger and tab panel for accessibility
   *
   * _*This property is dynamically set_
   */
  @property()
      ariaLabelledBy?: string;

  /**
   * Query the tab element
   */
  @query('.cre8-c-tab')
      _Cre8Tab: HTMLButtonElement;

  /**
   * Updated
   * 1. Called when the element's DOM has been updated and rendered.
   * 2. If has ariaLabelledBy, then set the tab ID with the value.
   * 3. If the tab is active, set the tabindex to 0 and aria-selected to true.
   */
  override updated(changedProperties: PropertyValues) {
    /* 2 */
      if (changedProperties.has('ariaLabelledBy')) {
          this._Cre8Tab.setAttribute('id', this.ariaLabelledBy);
      }
    /* 3 */
      if (changedProperties.has('isActive')) {
          this._Cre8Tab.setAttribute('tabindex', this.isActive ? '0' : '-1');
          this._Cre8Tab.setAttribute('aria-selected', `${this.isActive}`);
      }
  }

  /**
   * Handle Tab Selected
   * 1. Fire the custom event on click of a tab.
   */

  private _handleTabSelected() {
      const customEvent = new CustomEvent('tabSelected', {
          detail: {
              index: this.index,
          },
          bubbles: true,
          composed: true,
      });
      this.dispatchEvent(customEvent);
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-tab', {
          'cre8-is-active': this.isActive,
          'cre8-c-tab--small': this.size === 'sm',
      });

      return html`
      <button
        role="tab"
        tabindex="-1"
        aria-selected="false"
        type="button"
        class="${componentClassNames}"
        @click=${this._handleTabSelected}
      >
        <slot></slot>
      </button>
    `;
  }
}

if (customElements.get('cre8-tab') === undefined) {
    customElements.define('cre8-tab', Cre8Tab);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-tab': Cre8Tab;
  }
}

export default Cre8Tab;
