import svgWarningFilled from '@Cre8/cre8-icons/lib/icons/System/Filled/Warning.svg?raw';
import svgCheckCircle from '@Cre8/cre8-icons/lib/icons/System/Filled/Check.svg?raw';
import svgInfoFilled from '@Cre8/cre8-icons/lib/icons/System/Filled/Info.svg?raw';
import svgErrorFilled from '@Cre8/cre8-icons/lib/icons/System/Filled/Error.svg?raw';
import svgHelpFilled from '@Cre8/cre8-icons/lib/icons/System/Filled/Help.svg?raw';
import { html, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './inline-alert.scss';
import '../icon/icon';

/**
 * In cases when it is necessary to alert the user but a less strong message that cannot be dismissed is desired,
 * use an in-line contextual alert message as the least "severe" message type.
 * These can be displayed anywhere on the page, but should never cover content.
 * Inline alerts do not include a title or close capability and are considered minimally intrusive user messaging.
 *
 * @slot - The component content
 */
export class Cre8InlineAlert extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

    /**
     *  DEPRECATED: Icon name used for the icon before to the field note
     * @deprecated
    */
    @property()
        iconName?: string;

    /**
     * Full width Inline Alert
     * @attr {boolean}
     */
    @property({ type: Boolean, reflect: true })
        fullWidth?: boolean;

    /**
     * Icon title used for the icon alt text
     */
    @property()
        iconTitle?: string;

    /**
     * Variant
     * - **subtle** (default) renders an alert message in a padded container with a with a border and background color
     * - **transparent** renders an alert message with no padded container, border, or background color
     */
    @property()
        variant: 'transparent' | 'subtle' = 'subtle';

    /**
     * Status
     * - **default** renders an inline alert with the brand colors
     * - **error** renders an inline alert with an error state
     * - **warning** renders an inline alert with a warning state
     * - **success** renders an inline alert with a success state
     * - **attention** renders an inline alert with an attention state
     * - **neutral** renders an inline alert with a nuetral state
     */
    @property({ type: String })
        status?: 'error' | 'warning' | 'success' | 'attention' | 'neutral' | 'help' | 'info' = 'info';

    /*
    * Maps modal icons and modal status variants to what the alt text of the related icon should be see:
    * https://digital.cigna.com/patterns-and-Components/informational-display/alerts-and-notifications#query=alerts
    * this provides the recommendated alt text of different statuses
    */
    private mapStatusToIconInlineAlert(status: string) {
        switch (status) {
            case 'error':
                return html`<cre8-icon 
                svg='${svgErrorFilled}' 
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
            case 'success':
                return html`<cre8-icon 
                svg='${svgCheckCircle}' 
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
            case 'warning':
                return html`<cre8-icon 
                svg='${svgWarningFilled}'
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
            case 'help':
                return html`<cre8-icon 
                svg='${svgHelpFilled}'
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
            case 'info':
                return html`<cre8-icon 
                svg='${svgInfoFilled}'
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
            case 'attention':
                return html`<cre8-icon 
                svg='${svgInfoFilled}'
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
            case 'neutral':
                return html`<cre8-icon 
                svg='${svgHelpFilled}'
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
            default:
                return nothing;
        }
    }

    render() {
        const componentClassNames = this.componentClassNames('cre8-c-inline-alert', {
            'cre8-c-inline-alert--transparent': this.variant === 'transparent',
            'cre8-c-inline-alert--error': this.status === 'error',
            'cre8-c-inline-alert--warning': this.status === 'warning',
            'cre8-c-inline-alert--success': this.status === 'success',
            'cre8-c-inline-alert--attention': this.status === 'attention',
            'cre8-c-inline-alert--neutral': this.status === 'neutral',
            'cre8-c-inline-alert--help': this.status === 'help',
            'cre8-c-inline-alert--info': this.status === 'info',
            'cre8-c-inline-alert--full-width': this.fullWidth,
        });

        return html`
        <div class="${componentClassNames}">
            ${this.iconName || this.status
        ? html` ${this.mapStatusToIconInlineAlert(this.status)}`
        : ''
}
            <div class="cre8-c-inline-alert__body">
                <slot></slot>
            </div>
        </div>
        `;
    }
}

if (customElements.get('cre8-inline-alert') === undefined) {
    customElements.define('cre8-inline-alert', Cre8InlineAlert);
}

declare global {
    interface HTMLElementTagNameMap {
        'cre8-inline-alert': Cre8InlineAlert;
    }
}

export default Cre8InlineAlert;
