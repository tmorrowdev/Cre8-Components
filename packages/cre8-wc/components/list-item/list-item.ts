import { html, unsafeCSS } from 'lit';
import { Cre8Element } from '../cre8-element';
import styles from './list-item.module';

/**
 * @slot - The content of the list item
 */
export class Cre8ListItem extends Cre8Element {
    static styles = [styles];

    // Set the role before rendering for better accessibility
    // Because we're settting this role, we don't wrap the slot in an <li>
    connectedCallback() {
        this.setAttribute('role', 'listitem');
        super.connectedCallback();
    }

    render() {
        const componentClassName = this.componentClassNames('cre8-c-list__item', {});

        return html`
        <div class="${componentClassName}">
          <slot></slot>
        </div>
      `;
    }
}

if (customElements.get('cre8-list-item') === undefined) {
    customElements.define('cre8-list-item', Cre8ListItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-list-item': Cre8ListItem;
  }
}

export default Cre8ListItem;
