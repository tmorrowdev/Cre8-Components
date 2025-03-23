import { html, unsafeCSS } from 'lit';
import { Cre8Element } from '../cre8-element';
import styles from './linelength-container.scss';

/**
 * @slot - The component content
 */
export class cre8LinelengthContainer extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

    render() {
        const componentClassNames = this.componentClassNames('cre8-c-linelength-container', {});

        return html`
      <div class="${componentClassNames}">
        <slot></slot>
      </div>
    `;
    }
}

if (customElements.get('cre8-linelength-container') === undefined) {
    customElements.define('cre8-linelength-container', cre8LinelengthContainer);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-linelength-container': cre8LinelengthContainer;
  }
}

export default cre8LinelengthContainer;
