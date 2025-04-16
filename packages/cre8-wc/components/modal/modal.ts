import { PropertyValues, html, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import '../icon/icon';
import svgError from '@Cre8/cre8-icons/lib/icons/System/Regular/Error.svg?raw';
import svgWarningFilled from '@Cre8/cre8-icons/lib/icons/System/Filled/Warning.svg?raw';
import svgCheckCircle from '@Cre8/cre8-icons/lib/icons/System/Filled/Check.svg?raw';
import svgInfoFilled from '@Cre8/cre8-icons/lib/icons/System/Filled/Info.svg?raw';
import svgHelp from '@Cre8/cre8-icons/lib/icons/System/Regular/Help.svg?raw';
import { Cre8Element } from '../cre8-element';
import '@a11y/focus-trap';
import styles from './modal.scss';

/**
 * Modal component should be used in all modal situations.
 * It is natuarally composable and can even have a custom header and remove the close button.
 * (note: adding `slot="header"` will insert the given element into the header section of the modal,
 * same for `slot="footer"` and no given slot name will inset it into the body)
 *
 * If it is desired to create a utility modal. Cre8Modal requires a status value (see props table below,
 * and a UtilityModalTitle since all utility modals have a cre8-heading)
 * @slot - The component content
 */
export class Cre8Modal extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

/**
 * Query the modal window
 */
@query('.cre8-c-modal__window')
    _modalWindow: HTMLDivElement;

/**
 * Is Active attribute
 */
@property({ type: Boolean, reflect: true })
    isActive?: boolean;

/**
 * Status Types
 * <cre8-text-passage size="sm">
 * <ul>
 * <li>**default (no value)** renders a default modal</li>
 * <li>**error** renders an error modal</li>
 * <li>**warning** renders a warning modal</li>
 * <li>**success** renders a success modal</li>
 * <li>**info** renders an info modal</li>
 * <li>**help** renders an help modal</li>
 * </ul>
 * </cre8-text-passage>
 */
@property()
    status?: 'error' | 'warning' | 'success' | 'info' | 'help';

/**
 * Utility Modal Heading (String)
 */
@property()
    utilityModalTitle: string;

/**
 * Not dismissible modal
 */
@property({ type: Boolean, reflect: true })
    notDismissible?: boolean;

/**
 * Close Button Text
 */
@property()
    closeButtonText: string = 'close';

/**
 * Close Button Icon
 */
@property()
    closeButtonIcon: string = 'close';

/**
 * Modal Aria Label - This is required for accessibility and provides context of the entire modal!
 */
@property()
    ariaLabel: string;

/**
 * Handle keydown
 * 1) Close the modal when escape is hit when the user is focused within the modal
 */
handleKeydown(e: KeyboardEvent) {
    if (e.code === 'Escape' && !this.notDismissible) {
        this.handleCloseModal(); /* 2 */
    }
}

/**
 * Handle on close
 * 1) On close, set the modal to not active and dispatch event telling the parent the modal was closed.
 */
handleCloseModal() {
    this.isActive = false;
    this.dispatch({
        eventName: 'close-modal',
        detailObj: {
            isActive: this.isActive,
        },
    });
}

/**
 * Handle "click outside"
 * 1) onClick of the area around the modal window, close the modal.
 */

handleOnClickOutside(e: Event) {
    const eventTarget = e.target as HTMLElement;
    if (this.isActive && this._modalWindow && eventTarget.classList.contains('cre8-c-modal') && !this.notDismissible) {
        this.handleCloseModal();
    }
}

/**
 * Lifecycle method to focus on modal
 * 1) If there is a changed property, and this.isActive === true, then focus on the modal window.
 * 2) Disable the body from scrolling behind while the modal is open.
 */

updated(changedProperties: PropertyValues<this>) {
    if (this.isActive === true) {
        setTimeout(() => {
            this._modalWindow.focus();
        }, 200);
    } /* 1 */

    if (changedProperties.has('isActive')) {
        const body = document.querySelector('body');
        if (this.isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.removeProperty('overflow');
        }
    } /* 2 */
}

/*
* Maps modal icons and modal status variants to what the alt text of the related icon should be
* see: (https://digital.cigna.com/patterns-and-Components/informational-display/alerts-and-notifications#query=alerts)
* this provides the recommendated alt text of different statuses
*/
mapStatusToIconModal = (status: string) => {
    switch (status) {
        case 'error':
            return html`<cre8-icon class="cre8-modal-icon" svg='${svgError}' aria-hidden='true'></cre8-icon>`;
        case 'success':
            return html`<cre8-icon class="cre8-modal-icon" svg='${svgCheckCircle}' aria-hidden='true'></cre8-icon>`;
        case 'warning':
            return html`<cre8-icon class="cre8-modal-icon" svg='${svgWarningFilled}' aria-hidden='true'></cre8-icon>`;
        case 'help':
            return html`<cre8-icon class="cre8-modal-icon" svg='${svgHelp}' aria-hidden='true'></cre8-icon>`;
        case 'info':
            return html`<cre8-icon class="cre8-modal-icon" svg='${svgInfoFilled}' aria-hidden='true'></cre8-icon>`;
        default:
            return null;
    }
};

/**
 * Lifecycle method on removal from the DOM
 * Removed body overflow and handle close (isActive set to false)
 */
disconnectedCallback() {
    this.isActive = false;
    const body = document.querySelector('body');
    body.style.removeProperty('overflow');
}

render() {
    const componentClassNames = this.componentClassNames('cre8-c-modal', {
        'cre8-is-active': this.isActive,
        'cre8-c-modal--error': this.status === 'error',
        'cre8-c-modal--warning': this.status === 'warning',
        'cre8-c-modal--success': this.status === 'success',
        'cre8-c-modal--info': this.status === 'info',
        'cre8-c-modal--help': this.status === 'help',
    });

    return html`
    <div class="${componentClassNames}" @click="${this.handleOnClickOutside}" @keydown=${this.handleKeydown}>
    <focus-trap class="cre8-c-modal__focus-trap" ?inactive=${!this.isActive}>
        <div class="cre8-c-modal__window" role="dialog" aria-label=${this.ariaLabel} tabindex=${this.isActive ? 0 : -1}>
        <div class="cre8-c-modal__header">
            ${this.status
        ? html`<div class="cre8-c-modal__header-inner">
                ${this.mapStatusToIconModal(this.status)}
                <cre8-heading type="title-large" ?brandColor=${true}>${this.utilityModalTitle}</cre8-heading>
                </div>`
        : html`<slot name="header"></slot>`}
        ${!this.notDismissible
        ? html`<cre8-button
                class="cre8-c-modal__close-button"
                variant="tertiary"
                text="${this.closeButtonText}"
                ?hideText=${true}
                iconName=${this.closeButtonIcon}
                iconPosition="after"
                ?inverted=${!this.status}
                @click=${this.handleCloseModal}
                ></cre8-button>`
        : ''}
        </div>
        <div class="cre8-c-modal__body">
            <slot></slot>
        </div>
        ${this.slotNotEmpty('footer') && html`<div class="cre8-c-modal__footer"><slot name="footer"></slot></div>`}
        </div>
    </focus-trap>
    </div>
`;
}
}

if (customElements.get('cre8-modal') === undefined) {
    customElements.define('cre8-modal', Cre8Modal);
}

export interface CloseModalEvent extends CustomEvent<{isActive: boolean}> {
    type: 'close-modal';
    currentTarget: Cre8Modal;
}

declare global {
    interface HTMLElementTagNameMap {
        'cre8-modal': Cre8Modal;
    }
}
