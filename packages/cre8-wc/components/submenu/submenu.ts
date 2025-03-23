import { html, unsafeCSS } from 'lit';
import { Cre8Element } from '../cre8-element';
import styles from './submenu.scss';

/**
 * @slot - The component content
 */

export class cre8Submenu extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

    render() {
        const componentClassNames = this.componentClassNames('cre8-c-submenu', {});

        return html`
      <ul role="list" class="${componentClassNames}">
        <slot></slot>
      </ul>
    `;
    }
}

if (customElements.get('cre8-submenu') === undefined) {
    customElements.define('cre8-submenu', cre8Submenu);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-submenu': cre8Submenu;
  }
}

export default cre8Submenu;
