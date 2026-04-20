/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable max-statements */
import { html, TemplateResult, } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { property } from 'lit/decorators.js';
import svgAdd from '@tmorrow/cre8-wc/icons/Add.svg?raw';
import svgArrowLeft from '@tmorrow/cre8-wc/icons/Arrow_-_Left.svg?raw';
import svgChat from '@tmorrow/cre8-wc/icons/Chat_Default.svg?raw';
import svgCalendar from '@tmorrow/cre8-wc/icons/Calendar.svg?raw';
import svgCaretDown from '@tmorrow/cre8-wc/icons/Caret_Down_Filled.svg?raw';
import svgCheckCircle from '@tmorrow/cre8-wc/icons/Check_Filled.svg?raw';
import svgCheck from '@tmorrow/cre8-wc/icons/Check.svg?raw';
import svgClose from '@tmorrow/cre8-wc/icons/Close.svg?raw';
import svgDownload from '@tmorrow/cre8-wc/icons/Download.svg?raw';
import svgEdit from '@tmorrow/cre8-wc/icons/Edit.svg?raw';
import svgEllipsis from '@tmorrow/cre8-wc/icons/Ellipsis_Filled.svg?raw';
import svgMessageFilled from '@tmorrow/cre8-wc/icons/Message_Unread_Filled.svg?raw';
import svgMessage from '@tmorrow/cre8-wc/icons/Message_Unread.svg?raw';
import svgError from '@tmorrow/cre8-wc/icons/Error.svg?raw';
import svgExternal from '@tmorrow/cre8-wc/icons/External_Link.svg?raw';
import svgMedication from '@tmorrow/cre8-wc/icons/Medication.svg?raw';
import svgGlobe from '@tmorrow/cre8-wc/icons/Globe.svg?raw';
import svgHelp from '@tmorrow/cre8-wc/icons/Help.svg?raw';
import svgInfoFilled from '@tmorrow/cre8-wc/icons/Info.svg?raw';
import svgCaretUp from '@tmorrow/cre8-wc/icons/Caret_Up.svg?raw';
import svgLightbulb from '@tmorrow/cre8-wc/icons/Lightbulb.svg?raw';
import svgLocation from '@tmorrow/cre8-wc/icons/Location.svg?raw';
import svgMenu from '@tmorrow/cre8-wc/icons/Menu.svg?raw';
import svgMinus from '@tmorrow/cre8-wc/icons/Minus.svg?raw';
import svgAccountFilled from '@tmorrow/cre8-wc/icons/Account_Filled.svg?raw';
import svgNotification from '@tmorrow/cre8-wc/icons/Notification.svg?raw';
import svgRefill from '@tmorrow/cre8-wc/icons/Refill.svg?raw';
import svgAccount from '@tmorrow/cre8-wc/icons/Account.svg?raw';
import svgPlayFilled from '@tmorrow/cre8-wc/icons/Play_Arrow.svg?raw';
import svgPlayCircle from '@tmorrow/cre8-wc/icons/Play_Circle.svg?raw';
import svgSpinner from '@tmorrow/cre8-wc/icons/Spinner_75.svg?raw';
import svgUndo from '@tmorrow/cre8-wc/icons/Undo.svg?raw';
import svgSearch from '@tmorrow/cre8-wc/icons/Search.svg?raw';
import svgCart from '@tmorrow/cre8-wc/icons/Cart.svg?raw';
import svgRectangle from '@tmorrow/cre8-wc/icons/Rectangle.svg?raw';
import svgVaccine from '@tmorrow/cre8-wc/icons/Vaccinations.svg?raw';
import svgWarningFilled from '@tmorrow/cre8-wc/icons/Warning.svg?raw';
import svgCaretDoubleRight from '@tmorrow/cre8-wc/icons/Caret_Double_Right.svg?raw';
import svgErrorAlt from '@tmorrow/cre8-wc/icons/error-alt.svg?raw';
import svgEsi from '@tmorrow/cre8-wc/icons/express-scripts.svg?raw';
import svgInsta from '@tmorrow/cre8-wc/icons/instagram.svg?raw';
import svgLinkedin from '@tmorrow/cre8-wc/icons/linkedin.svg?raw';
import svgOpen from '@tmorrow/cre8-wc/icons/open.svg?raw';
import svgPause from '@tmorrow/cre8-wc/icons/pause.svg?raw';
import svgPersonBubble from '@tmorrow/cre8-wc/icons/person-bubble.svg?raw';
import svgPinterest from '@tmorrow/cre8-wc/icons/pinterest.svg?raw';
import svgRss from '@tmorrow/cre8-wc/icons/rss-feed.svg?raw';
import svgRx from '@tmorrow/cre8-wc/icons/rx.svg?raw';
import svgSwap from '@tmorrow/cre8-wc/icons/swap.svg?raw';
import svgThumbsUp from '@tmorrow/cre8-wc/icons/thumb-up.svg?raw';
import svgTrendFlat from '@tmorrow/cre8-wc/icons/trending-flat.svg?raw';
import svgTrendUp from '@tmorrow/cre8-wc/icons/trending-up.svg?raw';
import svgTwitter from '@tmorrow/cre8-wc/icons/twitter.svg?raw';

import { Cre8Element } from '../cre8-element';
import styles from './icon.styles.js';
import iconSprite from '@tmorrow/cre8-wc/icons/cre8-icons.svg?raw';

/**
 *
 * 
 * <svg> is a web component, which can be used with any frontend framework and use any svg.
 * It takes raw svgs as props and renders them.
 *
 * **'svg-legacy'** will be **deprecated** in Web Components v0.5.0
 *
 * - [List of new figma @tmorrow/cre8-wc/icons](https:/www.figma.com/file/j1a0rBkoH65XiGKfq7ppWa/Iconography?type=design&node-id=2037-5773&mode=design&t=6ZzC6KH3Gkxf3fj5-4)
 * - The new `svg` from the svg package: https:/static-dev.esi-memberweb-dev.aws.evernorthcloud.com/svgs/.
 *
 * ##Usability Considerations
 * - If the icon is decorative: set `aria-hidden` to true.
 * - If the icon is interactive (not decorative): set `aria-hidden` to false and add the `aria-label`
 * - If the icon is key to functionality from a screen reader perspective, it is required to add `aria-label`
 * which will describe the icon.
 * For example, if the icon is a close button, setting `aria-label="Close"`will give
 * the SVG an aria-label to make it sufficiently accessible.
 *
 * [More information on Accessibility with svgs](https:/static-dev.esi-memberweb-dev.aws.evernorthcloud.com/svgs/?path=/story/getting-started-accessibility--page)
 *
 * ##How to use
 * Cre8 Web Components (cre8-wc) includes the `cre8_dev/svgs` package.
 * If you need to install a newer version than what's included, please see
 * the [installation instructions for svgs](https:/git.express-scripts.com/ExpressScripts/svgs#installation).
 * - Import the component (this is the icon container): `import '@cre8_dev/svgs';`
 * - Import an svg as a string: `import svgInfo from '@tmorrow/cre8-wc/icons/Info.svg?raw';`
 *
 * Your import paths may be different depending on your project's build configuration.
 * Please see [Importing Icons](https:/static-dev.esi-memberweb-dev.aws.evernorthcloud.com/svgs/?path=/story/icon-sets-importing-@tmorrow/cre8-wc/icons--page)
 * of the `cre8_dev/svgs` documentation for more information.
 */

export class Cre8Icon extends Cre8Element {
    static styles = [styles];

    /**
     * Focusable
     *
     * @required
     */
    @property({ type: Boolean, reflect: true })
    focusable?: boolean;

    /**
     * Icon name (this method of passing in svgs is to be deprecated)
     *
     * @required
     */
    @property()
    name: string;

    @property({ reflect: true })
    svg?: string
    /**
     * Icon path
     * 1) This points to the file where the icon sprite lives
     * 2) This method of pathing will soon be depricated
     *
     */
    @property()
    iconUrl?: string = iconSprite;

    /**
     * Icon Title, this string is used for the aira-label of the svg
     *
     * @required
     */
    @property()
    iconTitle?: string;

    /**
     * Get the path to the @tmorrow/cre8-wc/icons, either by overriding it on the window
     * or by using the bundled icon path
     */
    getIconPath() {
        if (window.Cre8_ICON_URL) {
            return window.Cre8_ICON_URL;
        }

        const script = document.querySelector<HTMLScriptElement>('script[src$="icon"]');
        if (script) {
            return `${script.src.replace(/^(.+)\/.*$/, '$1')}/svgs/svgs.svg`;
        }

        return this.iconUrl;
    }

    render() {
        const componentClassName = this.componentClassNames('cre8-c-icon-wrapper', {});

        const iconMap: { [name: string]: TemplateResult<1> } = {};

        iconMap['add'] = html`<svg src=${svgAdd} container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['arrow-back'] = html`<svg src='${svgArrowLeft}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['arrow-forward'] = html`<svg src='${svgArrowLeft}' rotate="180" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['attention'] = html`<svg src='${svgChat}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['calendar'] = html`<svg src='${svgCalendar}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['calendar-datepicker'] = html`<svg src='${svgCalendar}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}" height="24" width="24"></svg>`;
        iconMap['caret-down'] = html`<svg src='${svgCaretDown}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['caret-double-left'] = html`<svg src='${svgCaretDoubleRight}' rotate="180" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['caret-double-right'] = html`<svg src='${svgCaretDoubleRight}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['check-circle'] = html`<svg src='${svgCheckCircle}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['check'] = html`<svg src='${svgCheck}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['close'] = html`<svg src='${svgClose}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['delta-down'] = html`<svg src='${svgCaretDown}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['delta-up'] = html`<svg src='${svgCaretDown}' flip="vertical" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['download'] = html`<svg src='${svgDownload}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['edit'] = html`<svg src='${svgEdit}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['ellipsis'] = html`<svg src='${svgEllipsis}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['email'] = html`${svgMessageFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['envelope'] = html`<svg src='${svgMessage}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['error-alt'] = html`<svg src='${svgErrorAlt}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['error-round'] = html`<svg src='${svgError}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['error'] = html`<svg src='${svgError}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['express-scripts'] = html`<svg src='${svgEsi}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['external-file'] = html`<svg src='${svgExternal}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['find-drug'] = html`<svg src='${svgMedication}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['globe'] = html`<svg src='${svgGlobe}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['help'] = html`<svg src='${svgHelp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['info'] = html`<svg src='${svgInfoFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['instagram'] = html`<svg src='${svgInsta}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['keyboard-arrow-down'] = html`<svg src='${svgCaretUp}' rotate="180" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['keyboard-arrow-left'] = html`<svg src='${svgCaretUp}' rotate="-90" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['keyboard-arrow-right'] = html`<svg src='${svgCaretUp}' rotate="90" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['keyboard-arrow-up'] = html`<svg src='${svgCaretUp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['language'] = html`<svg src='${svgGlobe}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['light-bulb'] = html`<svg src='${svgLightbulb}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['linkedin'] = html`<svg src='${svgLinkedin}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['location-on'] = html`<svg src='${svgLocation}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['menu'] = html`<svg src='${svgMenu}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['minus'] = html`<svg src='${svgMinus}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['neutral'] = html`<svg src='${svgAccountFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['notifications'] = html`<svg src='${svgNotification}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['open'] = html`<svg src='${svgOpen}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['order-status'] = html`<svg src='${svgRefill}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['pause'] = html`<svg src='${svgPause}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['people'] = html`<svg src='${svgAccount}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['person-bubble'] = html`<svg src='${svgPersonBubble}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['person'] = html`<svg src='${svgAccountFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['pinterest'] = html`<svg src='${svgPinterest}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['play-arrow'] = html`<svg src='${svgPlayFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['play-circle-outline'] = html`<svg src='${svgPlayCircle}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['progress-spinner'] = html`<svg src='${svgSpinner}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['replay'] = html`<svg src='${svgUndo}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['rss-feed'] = html`<svg src='${svgRss}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['rx'] = html`<svg src='${svgRx}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['search'] = html`<svg src='${svgSearch}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['shop'] = html`<svg src='${svgCart}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['spinner'] = html`<svg src='${svgSpinner}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['square'] = html`<svg src='${svgRectangle}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['success'] = html`<svg src='${svgCheckCircle}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['swap'] = html`<svg src='${svgSwap}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['thumb-up'] = html`<svg src='${svgThumbsUp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['trending-flat'] = html`<svg src='${svgTrendFlat}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['trending-up'] = html`<svg src='${svgTrendUp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['twitter'] = html`<svg src='${svgTwitter}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['vaccine'] = html`<svg src='${svgVaccine}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        iconMap['warning'] = html`<svg src='${svgWarningFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;

        const iconPath = this.getIconPath();

        // if (iconMap[this.name] !== undefined) {
        //     return iconMap[this.name];
        // }
        if (!this.name && !this.svg) {
            console.warn('Cre8Icon: No icon name or svg provided. Please provide either a name or svg.');
            return html``;
        }

        return html`
            ${this.svg ? html`<span class="${componentClassName}" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}">${unsafeHTML(this.svg)}</span>` : html`
        <span class="${componentClassName}" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}">
            <svg class="cre8-c-icon" xmlns="http://www.w3.org/2000/svg" focusable="${this.focusable ? 'true' : 'false'}" role="img">
                <use href="${iconPath}#${this.name}"></use>
            </svg>
        </span>` }`;
    }
}


if (customElements.get('cre8-icon') === undefined) {
    customElements.define('cre8-icon', Cre8Icon);
}

declare global {
    interface HTMLElementTagNameMap {
        'cre8-icon': Cre8Icon;
    }
    interface Window {
        Cre8_ICON_URL?: string;
    }
}

export default Cre8Icon;
