import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import utilityStyles from 'THEME/component.scss';
import styles from './utilities.css';

@customElement('visibility-utilities')
export class VisibilityUtilities extends LitElement {
  static get styles() {
    return unsafeCSS([styles.toString(), utilityStyles.toString()]);
  }

  render() {
    return html`
      <div class="sg-utility-demo">
        <h2>
          <code>Hide/Visually Hide Utilities</code>
        </h2>
        <code>cre8-u-is-vishidden</code>
        <div class="sg-demo-box-2">
          <cre8-text-passage size="sm">
            <p>The following FPO block is visually hidden but still allows screenreaders to read this for accessibility.</p>
          </cre8-text-passage>
          <div class="cre8-u-is-vishidden sg-demo-box-2"><f-po>Visibly hidden FPO block</f-po></div>
        </div>
        <hr />
        <code>cre8-u-is-hidden</code>
        <div class="sg-demo-box-2">
          <cre8-text-passage size="sm">
            <p>The following FPO block is hidden from both visual users and screenreaders</p>
          </cre8-text-passage>
          <div class="cre8-u-is-hidden sg-demo-box-2"><f-po>Hidden FPO block</f-po></div>
        </div>
        <hr />
        <code>cre8-u-hide-sm</code>
        <div class="sg-demo-box-2">
          <cre8-text-passage size="sm">
            <p>The following FPO block is hidden above sm breakpoint</p>
          </cre8-text-passage>
          <div class="cre8-u-hide-sm sg-demo-box-2"><f-po>Hidden FPO block above sm breakpoint</f-po></div>
        </div>
        <hr />
        <code>cre8-u-hide-sm-2</code>
        <div class="sg-demo-box-2">
          <cre8-text-passage size="sm">
            <p>The following FPO block is hidden above sm-2 breakpoint</p>
          </cre8-text-passage>
          <div class="cre8-u-hide-sm-2 sg-demo-box-2"><f-po>Hidden FPO block above sm-2 breakpoint</f-po></div>
        </div>
        <hr />
        <code>cre8-u-hide-md</code>
        <div class="sg-demo-box-2">
          <cre8-text-passage size="sm">
            <p>The following FPO block is hidden above md breakpoint</p>
          </cre8-text-passage>
          <div class="cre8-u-hide-md sg-demo-box-2"><f-po>Hidden FPO block above md breakpoint</f-po></div>
        </div>
        <hr />
        <code>cre8-u-hide-lg</code>
        <div class="sg-demo-box-2">
          <cre8-text-passage size="sm">
            <p>The following FPO block is hidden above lg breakpoint</p>
          </cre8-text-passage>
          <div class="cre8-u-hide-lg sg-demo-box-2"><f-po>Hidden FPO block above lg breakpoint</f-po></div>
        </div>
        <hr />
        <code>cre8-u-hide-xl</code>
        <div class="sg-demo-box-2">
          <cre8-text-passage size="sm">
            <p>The following FPO block is hidden above xl breakpoint</p>
          </cre8-text-passage>
          <div class="cre8-u-hide-xl sg-demo-box-2"><f-po>Hidden FPO block above xl breakpoint</f-po></div>
        </div>
        <hr />
        <code>cre8-u-show-sm</code>
        <div class="sg-demo-box-2">
          <cre8-text-passage size="sm">
            <p>The following FPO block is hidden below sm breakpoint</p>
          </cre8-text-passage>
          <div class="cre8-u-show-sm sg-demo-box-2"><f-po>Hidden FPO block below sm breakpoint</f-po></div>
        </div>
        <hr />
        <code>cre8-u-show-sm-2</code>
        <div class="sg-demo-box-2">
          <cre8-text-passage size="sm">
            <p>The following FPO block is hidden below sm-2 breakpoint</p>
          </cre8-text-passage>
          <div class="cre8-u-show-sm-2 sg-demo-box-2"><f-po>Hidden FPO block below sm-2 breakpoint</f-po></div>
        </div>
        <hr />
        <code>cre8-u-show-md</code>
        <div class="sg-demo-box-2">
          <cre8-text-passage size="sm">
            <p>The following FPO block is hidden below md breakpoint</p>
          </cre8-text-passage>
          <div class="cre8-u-show-md sg-demo-box-2"><f-po>Hidden FPO block below md breakpoint</f-po></div>
        </div>
        <hr />
        <code>cre8-u-show-lg</code>
        <div class="sg-demo-box-2">
          <cre8-text-passage size="sm">
            <p>The following FPO block is hidden below lg breakpoint</p>
          </cre8-text-passage>
          <div class="cre8-u-show-lg sg-demo-box-2"><f-po>Hidden FPO block below lg breakpoint</f-po></div>
        </div>
        <hr />
        <code>cre8-u-show-xl</code>
        <div class="sg-demo-box-2">
          <cre8-text-passage size="sm">
            <p>The following FPO block is hidden below xl breakpoint</p>
          </cre8-text-passage>
          <div class="cre8-u-show-xl sg-demo-box-2"><f-po>Hidden FPO block below xl breakpoint</f-po></div>
        </div>
        <hr />
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'visibility-utilities': VisibilityUtilities;
  }
}
