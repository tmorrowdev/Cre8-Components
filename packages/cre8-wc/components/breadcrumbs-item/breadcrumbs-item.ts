import svgCaretUp from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Regular/Caret_Up.svg?raw';
import { html, unsafeCSS } from 'lit';
import { Cre8Element } from '../cre8-element';
import '../icon/icon';
import styles from './breadcrumbs-item.module';

/**
 * @slot - The component content, the expected slotted content is a Cre8 Link or a String for the "terminal node"
 */
export class Cre8BreadcrumbsItem extends Cre8Element {
    static styles = [styles];

    // Set the role before rendering for better accessibility
    // Because we're settting this role, we don't wrap the slot in an <li>
    connectedCallback() {
        this.setAttribute('role', 'listitem');
        super.connectedCallback();
    }

    render() {
        const componentClassNames = this.componentClassNames(
            'cre8-c-breadcrumbs--item',
            {}
        );

        return html`
      <div class="${componentClassNames}">
        <slot></slot>
        <cre8-icon
          svg="${svgCaretUp}"
          rotate="90"
          container-class="cre8-c-icon-wrapper"
          aria-hidden="true"
          class="cre8-c-icon-wrapper"
        >
        </cre8-icon>
      </div>
    `;
    }
}

if (customElements.get('cre8-breadcrumbs-item') === undefined) {
    customElements.define('cre8-breadcrumbs-item', Cre8BreadcrumbsItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-breadcrumbs-item': Cre8BreadcrumbsItem;
  }
}

export default Cre8BreadcrumbsItem;
