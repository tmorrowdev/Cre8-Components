import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import utilityStyles from 'THEME/component.scss';
import styles from './utilities.css';

@customElement('typography-utilities')
export class TypographyUtilities extends LitElement {
  static get styles() {
    return unsafeCSS([styles.toString(), utilityStyles.toString()]);
  }

  render() {
    return html`
      <div class="sg-utility-demo">
        <h2>
          <code>Typography preset utilities</code>
        </h2>
        <code>cre8-u-typography-preset-1</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-1 sg-demo-box-2">Force typography preset 1 text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-2</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-2 sg-demo-box-2">Force typography preset 2 text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-2-bold</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-2-bold sg-demo-box-2">Force typography preset 2 bold text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-3</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-3 sg-demo-box-2">Force typography preset 3 text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-3-bold</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-3-bold sg-demo-box-2">Force typography preset 3 bold text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-4</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-4 sg-demo-box-2">Force typography preset 4 text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-4-bold</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-4-bold sg-demo-box-2">Force typography preset 4 bold text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-5</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-5 sg-demo-box-2">Force typography preset 5 text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-5-bold</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-5-bold sg-demo-box-2">Force typography preset 5 bold text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-6</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-6 sg-demo-box-2">Force typography preset 6 text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-6-bold</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-6-bold sg-demo-box-2">Force typography preset 6 bold text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-7</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-7 sg-demo-box-2">Force typography preset 7 text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-7-bold</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-7-bold sg-demo-box-2">Force typography preset 7 bold text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-8</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-8 sg-demo-box-2">Force typography preset 8 text</div>
        </div>
        <hr />
        <code>cre8-u-typography-preset-8-bold</code>
        <div class="sg-demo-container-box">
          <div class="cre8-u-typography-preset-8-bold sg-demo-box-2">Force typography preset 8 bold text</div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'typography-utilities': TypographyUtilities;
  }
}
