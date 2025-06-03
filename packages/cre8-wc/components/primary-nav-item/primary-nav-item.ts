import { html, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property, state } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './primary-nav-item.module';

    /**
     * @slot - The label for the navigation item
     */
export class Cre8PrimaryNavItem extends Cre8Element {
    /**
     * Primary nav item text
     */
    @property()
        text = 'Nav item';

    /**
     * Primary nav item href
     */
    @property()
        href = '#';

    /**
     * Icon name
     */
    @property()
        iconName?: string = 'caret-down';

    /**
     * Append to the class name. Used for passing in utility classes
     */
    @property({ type: Boolean, reflect: true })
        megaMenu?: boolean;

    /**
     * Append to the class name. Used for passing in utility classes
     */
    @state()
        isActive?: boolean;

    static styles = [styles];

    /**
     * Initialize functions
     */
    constructor() {
        super();
        this._handleOnClickOutside = this._handleOnClickOutside.bind(this);
        this._clickHandler = this._clickHandler.bind(this);
    }

    /**
     * Connected Callback lifecycle
     */
    connectedCallback() {
        this.setAttribute('role', 'listitem');
        super.connectedCallback();

        document.addEventListener('mousedown', this._handleOnClickOutside, false);
    }

    /**
     * Disconnected callback lifecycle
     * 1) Remove window resize event listener
     */
    disconnectedCallback() {
        document.removeEventListener('mousedown', this._handleOnClickOutside, false);
        super.disconnectedCallback();
    }

    /**
     * Handle click outside the component
     * 1) Close the show hide panel on click outside
     * 2) If the nav is already closed then we don't care about outside clicks and we
     * can bail early
     * 3) By the time a user clicks on the page the shadowRoot will almost certainly be
     * defined, but TypeScript isn't that trusting and sees this.shadowRoot as possibly
     * undefined. To work around that we'll check that we have a shadowRoot (and a
     * rendered .host) element here to appease the TypeScript compiler. This should never
     * actually be shown or run for a human end user.
     * 4) Check to see if we clicked inside the active navigation item
     * 5) If the navigation is active and we've clicked outside of the nav then it should
     * be closed.
     */
    private _handleOnClickOutside(event: MouseEvent) {
        /* 2 */
        if (!this.isActive) {
            return;
        }

        /* 3 */
        if (!this.shadowRoot?.host) {
            throw Error('Could not determine navigation context during click handler');
        }

        /* 4 */
        const didClickInside = event.composedPath().includes(this.shadowRoot.host);

        /* 5 */
        if (this.isActive && !didClickInside) {
            this.isActive = false;
        }
    }

    /**
     * Toggle active state of primary nav item
     * 1) Remove isActive state from all sibling elements
     * 2) Toggle active state of element selected
     */
    private _clickHandler(e: MouseEvent) {
        e.preventDefault();
        if (this.parentNode) {
            const navItems = this.parentNode.querySelectorAll('cre8-primary-nav-item');
            navItems.forEach((element: Cre8PrimaryNavItem) => {
                if (element !== this) {
                    element.isActive = false; /* 1 */
                }
            });
        }
        this.isActive = !this.isActive; /* 2 */
    }

    private _closePanel() {
        this.isActive = false;
    }

    private _handleOnKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape' && this.isActive === true) {
            this._closePanel();
            const navLink = this.shadowRoot?.querySelector<HTMLButtonElement | HTMLAnchorElement>(
                '.cre8-c-primary-nav__link'
            );
            if (navLink) {
                setTimeout(() => {
                    navLink.focus();
                }, 1);
            }
        }
    }

    render() {
        const componentClassName = this.componentClassNames('cre8-c-primary-nav__item', {
            'cre8-is-active': this.isActive === true,
            'cre8-c-primary-nav__item--megamenu': this.megaMenu === true,
        });

        if (this.megaMenu) {
            return html`
            <div class="${componentClassName}" @keydown=${this._handleOnKeyDown}>
                <div class="cre8-c-primary-nav__item-content">
                    <button
                        class="cre8-c-primary-nav__link"
                        @click=${this._clickHandler}
                        aria-expanded=${this.isActive === true}
                    >
                        ${this.slotNotEmpty('itemBefore') && html`
                            <div class="cre8-c-primary-nav__item-before">
                                <slot name="itemBefore"></slot>
                            </div>
                        `}
                        ${this.text}
                        ${this.slotNotEmpty('itemAfter') && html`
                            <div class="cre8-c-primary-nav__item-after">
                                <slot name="itemAfter"></slot>
                            </div>
                        `}
                        <cre8-icon-legacy aria-hidden="true" name="${ifDefined(this.iconName)}"></cre8-icon-legacy>
                    </button>
                </div>
                <div class="cre8-c-primary-nav__item-panel">
                    <div class="cre8-c-primary-nav__item-panel-inner">
                        <slot></slot>
                    </div>
                </div>
            </div>
        `;
        }
        return html`
            <div class="${componentClassName}">
                <div class="cre8-c-primary-nav__item-content">
                    <a class="cre8-c-primary-nav__link" href="${this.href}">
                        ${this.slotNotEmpty('itemBefore') && html`
                            <div class="cre8-c-primary-nav__item-before">
                                <slot name="itemBefore"></slot>
                            </div>
                        `}
                        ${this.text}
                        ${this.slotNotEmpty('itemAfter') && html`
                            <div class="cre8-c-primary-nav__item-after">
                                <slot name="itemAfter"></slot>
                            </div>
                        `}
                    </a>
                </div>
            </div>
        `;
    }
}

if (customElements.get('cre8-primary-nav-item') === undefined) {
    customElements.define('cre8-primary-nav-item', Cre8PrimaryNavItem);
}

declare global {
    interface HTMLElementTagNameMap {
        'cre8-primary-nav-item': Cre8PrimaryNavItem;
    }
}

export default Cre8PrimaryNavItem;
