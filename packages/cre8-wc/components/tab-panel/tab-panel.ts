import { html, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './tab-panel.scss';

/**
 * @slot - The component content
 */

export class cre8TabPanel extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * This will remove focus on panel element
   */
  @property({ type: Boolean, reflect: true })
      skipFocusOnPanel?: boolean;

  /**
   * Indicates if the panel is active
   * <br/><br/> _*This property is dynamically set_
   */
  @property({ type: Boolean, reflect: true })
      isActive?: boolean;

  /**
   * Used to align the tab panel with the tab
   * <br/><br/> _*This property is dynamically set_
   */
  @property({ type: Number })
      index?: number;

  /**
   * Query the tab panel element
   */
  @query('.cre8-c-tab-panel')
      _cre8TabPanel: HTMLElement;

  /**
   * First updated
   * 1. If skipFocusOnPanel is not true, then allow tabbing to the panel.
   */
  firstUpdated() {
    /* 1 */
      if (!this.skipFocusOnPanel) {
          this._cre8TabPanel.setAttribute('tabindex', '0');
      }
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-tab-panel', {
          'cre8-is-active': this.isActive,
      });

      return html`
      <div role="tabpanel" class="${componentClassNames}">
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-tab-panel') === undefined) {
    customElements.define('cre8-tab-panel', cre8TabPanel);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-tab-panel': cre8TabPanel;
  }
}

export default cre8TabPanel;
