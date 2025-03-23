import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import utilityStyles from 'THEME/component.scss';
import styles from './utilities.css';

@customElement('display-utilities')
export class DisplayUtilities extends LitElement {
  static get styles() {
    return unsafeCSS([styles.toString(), utilityStyles.toString()]);
  }

  render() {
    return html`
      <div class="sg-utility-demo">
        <h2>
          <code>Display utilties</code>
        </h2>
        <code>cre8-u-display-flex</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-display-flex sg-demo-box-2"><f-po>Forces</f-po><f-po>display flex</f-po></div>
        </div>

        <hr />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'display-utilities': DisplayUtilities;
  }
}
