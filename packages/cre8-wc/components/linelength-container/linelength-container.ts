import { html, CSSResult } from 'lit';
import { Cre8Element } from '../cre8-element';
import styles from './linelength-container.module.scss';

/**
 * @slot - The component content
 */
export class Cre8LinelengthContainer extends Cre8Element {
  static styles = [styles as unknown as CSSResult];

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
  customElements.define('cre8-linelength-container', Cre8LinelengthContainer);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-linelength-container': Cre8LinelengthContainer;
  }
}

export default Cre8LinelengthContainer;
