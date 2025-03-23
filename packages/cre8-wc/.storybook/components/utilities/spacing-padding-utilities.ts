import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import utilityStyles from 'THEME/component.scss';
import styles from './utilities.css';

@customElement('spacing-padding-utilities')
export class SpacingPaddingUtilities extends LitElement {
  static get styles() {
    return unsafeCSS([styles.toString(), utilityStyles.toString()]);
  }

  render() {
    return html`
      <div class="sg-utility-demo">
        <h2>
          <code>Padding</code>
        </h2>
        <code>cre8-u-padding-none</code>
        <div class="sg-demo-container-box cre8-u-padding-none">
          <div class="sg-demo-box-2">No padding</div>
        </div>

        <hr />

        <code>cre8-u-padding-sm</code>
        <div class="sg-demo-container-box cre8-u-padding-sm">
          <div class="sg-demo-box-2">Padding small</div>
        </div>

        <hr />

        <code>cre8-u-padding-md</code>
        <div class="sg-demo-container-box cre8-u-padding-md">
          <div class="sg-demo-box-2">Padding medium</div>
        </div>

        <hr />

        <code>cre8-u-padding-lg</code>
        <div class="sg-demo-container-box cre8-u-padding-lg">
          <div class="sg-demo-box-2">Padding large</div>
        </div>

        <hr />

        <code>cre8-u-padding-xl</code>
        <div class="sg-demo-container-box cre8-u-padding-xl">
          <div class="sg-demo-box-2">Padding xl</div>
        </div>

        <hr />

        <code>cre8-u-padding-xxl</code>
        <div class="sg-demo-container-box cre8-u-padding-xxl ">
          <div class="sg-demo-box-2">Padding xxl</div>
        </div>

        <hr />

        <h2>
          <code>padding-top</code>
        </h2>

        <code>cre8-u-padding-top-none</code>
        <div class="sg-demo-container-box cre8-u-padding-top-none">
          <div class="sg-demo-box-2">Padding top none</div>
        </div>

        <hr />

        <code>cre8-u-padding-top-sm</code>
        <div class="sg-demo-container-box cre8-u-padding-top-sm">
          <div class="sg-demo-box-2">Padding top small</div>
        </div>

        <hr />

        <code>cre8-u-padding-top-md</code>
        <div class="sg-demo-container-box cre8-u-padding-top-md">
          <div class="sg-demo-box-2">Padding top medium</div>
        </div>

        <hr />

        <code>cre8-u-padding-top-lg</code>
        <div class="sg-demo-container-box cre8-u-padding-top-lg">
          <div class="sg-demo-box-2">Padding top large</div>
        </div>

        <hr />

        <code>cre8-u-padding-top-xl</code>
        <div class="sg-demo-container-box cre8-u-padding-top-xl">
          <div class="sg-demo-box-2">Padding top xl</div>
        </div>

        <hr />

        <code>cre8-u-padding-top-xxl</code>
        <div class="sg-demo-container-box cre8-u-padding-top-xxl ">
          <div class="sg-demo-box-2">Padding top xxl</div>
        </div>

        <hr />

        <h2>
          <code>padding-right</code>
        </h2>

        <code>cre8-u-padding-right-none</code>
        <div class="sg-demo-container-box cre8-u-padding-right-none">
          <div class="sg-demo-box-2">Padding right none</div>
        </div>

        <hr />

        <code>cre8-u-padding-right-sm</code>
        <div class="sg-demo-container-box cre8-u-padding-right-sm">
          <div class="sg-demo-box-2">Padding right small</div>
        </div>

        <hr />

        <code>cre8-u-padding-right-md</code>
        <div class="sg-demo-container-box cre8-u-padding-right-md">
          <div class="sg-demo-box-2">Padding right medium</div>
        </div>

        <hr />

        <code>cre8-u-padding-right-lg</code>
        <div class="sg-demo-container-box cre8-u-padding-right-lg">
          <div class="sg-demo-box-2">Padding right large</div>
        </div>

        <hr />

        <code>cre8-u-padding-right-xl</code>
        <div class="sg-demo-container-box cre8-u-padding-right-xl">
          <div class="sg-demo-box-2">Padding right xl</div>
        </div>

        <hr />

        <code>cre8-u-padding-right-xxl</code>
        <div class="sg-demo-container-box cre8-u-padding-right-xxl ">
          <div class="sg-demo-box-2">Padding right xxl</div>
        </div>

        <hr />

        <h2>
          <code>padding-bottom</code>
        </h2>

        <code>cre8-u-padding-bottom-none</code>
        <div class="sg-demo-container-box cre8-u-padding-bottom-none">
          <div class="sg-demo-box-2">Padding bottom none</div>
        </div>

        <hr />

        <code>cre8-u-padding-bottom-sm</code>
        <div class="sg-demo-container-box cre8-u-padding-bottom-sm">
          <div class="sg-demo-box-2">Padding bottom small</div>
        </div>

        <hr />

        <code>cre8-u-padding-bottom-md</code>
        <div class="sg-demo-container-box cre8-u-padding-bottom-md">
          <div class="cre8-u-padding-bottom-md sg-demo-box-2">Padding bottom medium</div>
        </div>

        <hr />

        <code>cre8-u-padding-bottom-lg</code>
        <div class="sg-demo-container-box cre8-u-padding-bottom-lg">
          <div class="sg-demo-box-2">Padding bottom large</div>
        </div>

        <hr />

        <code>cre8-u-padding-bottom-xl</code>
        <div class="sg-demo-container-box cre8-u-padding-bottom-xl">
          <div class="sg-demo-box-2">Padding bottom xl</div>
        </div>

        <hr />

        <code>cre8-u-padding-bottom-xxl</code>
        <div class="sg-demo-container-box cre8-u-padding-bottom-xxl">
          <div class="sg-demo-box-2">Padding bottom xxl</div>
        </div>

        <hr />

        <h2>
          <code>padding-left</code>
        </h2>

        <code>cre8-u-padding-left-none</code>
        <div class="sg-demo-container-box cre8-u-padding-left-none">
          <div class="sg-demo-box-2">Padding left none</div>
        </div>

        <hr />

        <code>cre8-u-padding-left-sm</code>
        <div class="sg-demo-container-box cre8-u-padding-left-sm">
          <div class="sg-demo-box-2">Padding left small</div>
        </div>

        <hr />

        <code>cre8-u-padding-left-md</code>
        <div class="sg-demo-container-box cre8-u-padding-left-md">
          <div class="sg-demo-box-2">Padding left medium</div>
        </div>

        <hr />

        <code>cre8-u-padding-left-lg</code>
        <div class="sg-demo-container-box cre8-u-padding-right-lg">
          <div class="sg-demo-box-2">Padding left large</div>
        </div>
        <hr />

        <code>cre8-u-padding-left-xl</code>
        <div class="sg-demo-container-box cre8-u-padding-left-xl">
          <div class="sg-demo-box-2">Padding left xl</div>
        </div>

        <hr />

        <code>cre8-u-padding-left-xxl</code>
        <div class="sg-demo-container-box cre8-u-padding-left-xxl">
          <div class="sg-demo-box-2">Padding left xxl</div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'spacing-padding-utilities': SpacingPaddingUtilities;
  }
}
