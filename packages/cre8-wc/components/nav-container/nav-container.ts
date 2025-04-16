import { html, unsafeCSS } from 'lit';
import { Cre8Element } from '../cre8-element';
import styles from './nav-container.scss';

/**
 * @slot - The navigation container content
 */
export class Cre8NavContainer extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

    render() {
        const componentClassName = this.componentClassNames('cre8-c-nav-container', {});

        return html`
      <div class="${componentClassName}">
        <slot></slot>
      </div>
    `;
    }
}

if (customElements.get('cre8-nav-container') === undefined) {
    customElements.define('cre8-nav-container', Cre8NavContainer);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-nav-container': Cre8NavContainer;
  }
}

export default Cre8NavContainer;
