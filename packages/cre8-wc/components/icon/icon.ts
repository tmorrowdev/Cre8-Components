/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable max-statements */
import { html, unsafeCSS } from 'lit';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import { property } from 'lit/decorators.js';
import svgAdd from '../../icons/System/Regular/Add.svg?raw';
import svgArrowLeft from '../../icons/System/Regular/Arrow_-_Left.svg?raw';
import svgChat from '../../icons/System/Filled/Chat_Default.svg?raw';
import svgCalendar from '../../icons/System/Regular/Calendar.svg?raw';
import svgCaretDown from '../../icons/System/Filled/Caret_Down.svg?raw';
import svgCheckCircle from '../../icons/System/Filled/Check.svg?raw';
import svgCheck from '../../icons/System/Regular/Check.svg?raw';
import svgClose from '../../icons/System/Regular/Close.svg?raw';
import svgDownload from '../../icons/System/Filled/Download.svg?raw';
import svgEdit from '../../icons/System/Regular/Edit.svg?raw';
import svgEllipsis from '../../icons/System/Filled/Ellipsis.svg?raw';
import svgMessageFilled from '../../icons/System/Filled/Message_Unread.svg?raw';
import svgMessage from '../../icons/System/Regular/Message_Unread.svg?raw';
import svgError from '../../icons/System/Regular/Error.svg?raw';
import svgExternal from '../../icons/System/Regular/External_Link.svg?raw';
import svgMedication from '../../icons/System/Regular/Medication.svg?raw';
import svgGlobe from '../../icons/System/Regular/Globe.svg?raw';
import svgHandHeart from '../../icons/System/Regular/Wellness.svg?raw';
import svgHelp from '../../icons/System/Regular/Help.svg?raw';
import svgInfoFilled from '../../icons/System/Filled/Info.svg?raw';
import svgCaretUp from '../../icons/System/Regular/Caret_Up.svg?raw';
import svgLightbulb from '../../icons/System/Regular/Lightbulb.svg?raw';
import svgLocation from '../../icons/System/Filled/Location.svg?raw';
import svgMenu from '../../icons/System/Regular/Menu.svg?raw';
import svgMinus from '../../icons/System/Regular/Minus.svg?raw';
import svgAccountFilled from '../../icons/System/Filled/Account.svg?raw';
import svgNotification from '../../icons/System/Regular/Notification.svg?raw';
import svgRefill from '../../icons/Marketing/Duotone/Refill.svg?raw';
import svgAccount from '../../icons/System/Regular/Account.svg?raw';
import svgPlayFilled from '../../icons/System/Filled/Play_Arrow.svg?raw';
import svgPlayCircle from '../../icons/System/Regular/Play_Circle.svg?raw';
import svgSpinner from '../../icons/System/Regular/Spinner/75.svg?raw';
import svgUndo from '../../icons/System/Regular/Undo.svg?raw';
import svgSearch from '../../icons/System/Regular/Search.svg?raw';
import svgCart from '../../icons/System/Regular/Cart.svg?raw';
import svgRectangle from '../../icons/System/Filled/Shape/Rectangle.svg?raw';
import svgVaccine from '../../icons/Marketing/Duotone/Vaccinations.svg?raw';
import svgWarningFilled from '../../icons/System/Filled/Warning.svg?raw';
import svgCaretDoubleRight from '../../icons/System/Regular/Caret_Double_Right.svg?raw';
import svgErrorAlt from '../../icons/error-alt.svg?raw';
import svgEsi from '../../icons/express-scripts.svg?raw';
import svgInsta from '../../icons/instagram.svg?raw';
import svgLinkedin from '../../icons/linkedin.svg?raw';
import svgOpen from '../../icons/open.svg?raw';
import svgPause from '../../icons/pause.svg?raw';
import svgPersonBubble from '../../icons/person-bubble.svg?raw';
import svgPinterest from '../../icons/pinterest.svg?raw';
import svgRss from '../../icons/rss-feed.svg?raw';
import svgRx from '../../icons/rx.svg?raw';
import svgSwap from '../../icons/swap.svg?raw';
import svgThumbsUp from '../../icons/thumb-up.svg?raw';
import svgTrendFlat from '../../icons/trending-flat.svg?raw';
import svgTrendUp from '../../icons/trending-up.svg?raw';
import svgTwitter from '../../icons/twitter.svg?raw';

import { Cre8Element } from '../cre8-element';
import styles from './icon.module';
import iconSprite from '../../icons/cre8-icons.svg?raw';

/**
 *
 * <svg> is a web component, which can be used with any frontend framework and use any svg.
 * It takes raw svgs as props and renders them.
 *
 * **'svg-legacy'** will be **deprecated** in Web Components v0.5.0
 *
 * - [List of new figma icons](https:/www.figma.com/file/j1a0rBkoH65XiGKfq7ppWa/Iconography?type=design&node-id=2037-5773&mode=design&t=6ZzC6KH3Gkxf3fj5-4)
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
 * - Import an svg as a string: `import svgInfo from 'cre8_dev/svgs/lib/icons/System/Regular/Info.svg?raw';`
 *
 * Your import paths may be different depending on your project's build configuration.
 * Please see [Importing Icons](https:/static-dev.esi-memberweb-dev.aws.evernorthcloud.com/svgs/?path=/story/icon-sets-importing-icons--page)
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

        @property({reflect:true})
        svg?:string
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
     * Get the path to the icons, either by overriding it on the window
     * or by using the bundled icon path
     */
    getIconPath() {
        if (window.Cre8_ICON_URL) {
            return window.Cre8_ICON_URL;
        }

        const script = document.querySelector<HTMLScriptElement>('script[src$="icon"]');
        if (script) {
            return `${script.src.replace(/^(.+)\/.*$/, '$1')}/svgs/svgs.svg?raw`;
        }

        return this.iconUrl;
    }

    render() {
        const componentClassName = this.componentClassNames('cre8-c-icon-wrapper', {});

        // const iconMap: { [name: string]: TemplateResult<1> } = {};

        // iconMap['add'] = html`<svg src=${svgAdd} container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['arrow-back'] = html`<svg src='${svgArrowLeft}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['arrow-forward'] = html`<svg src='${svgArrowLeft}' rotate="180" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['attention'] = html`<svg src='${svgChat}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['calendar'] = html`<svg src='${svgCalendar}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['calendar-datepicker'] = html`<svg src='${svgCalendar}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}" height="24" width="24"></svg>`;
        // iconMap['caret-down'] = html`<svg src='${svgCaretDown}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['caret-double-left'] = html`<svg src='${svgCaretDoubleRight}' rotate="180" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['caret-double-right'] = html`<svg src='${svgCaretDoubleRight}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['check-circle'] = html`<svg src='${svgCheckCircle}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['check'] = html`<svg src='${svgCheck}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['close'] = html`<svg src='${svgClose}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['delta-down'] = html`<svg src='${svgCaretDown}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['delta-up'] = html`<svg src='${svgCaretDown}' flip="vertical" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['download'] = html`<svg src='${svgDownload}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['edit'] = html`<svg src='${svgEdit}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['ellipsis'] = html`<svg src='${svgEllipsis}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['email'] = html`${svgMessageFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['envelope'] = html`<svg src='${svgMessage}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['error-alt'] = html`<svg src='${svgErrorAlt}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['error-round'] = html`<svg src='${svgError}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['error'] = html`<svg src='${svgError}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['express-scripts'] = html`<svg src='${svgEsi}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['external-file'] = html`<svg src='${svgExternal}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['find-drug'] = html`<svg src='${svgMedication}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['globe'] = html`<svg src='${svgGlobe}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['hand-heart'] = html`<svg src='${svgHandHeart}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['help'] = html`<svg src='${svgHelp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['info'] = html`<svg src='${svgInfoFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['instagram'] = html`<svg src='${svgInsta}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['keyboard-arrow-down'] = html`<svg src='${svgCaretUp}' rotate="180" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['keyboard-arrow-left'] = html`<svg src='${svgCaretUp}' rotate="-90" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['keyboard-arrow-right'] = html`<svg src='${svgCaretUp}' rotate="90" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['keyboard-arrow-up'] = html`<svg src='${svgCaretUp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['language'] = html`<svg src='${svgGlobe}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['light-bulb'] = html`<svg src='${svgLightbulb}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['linkedin'] = html`<svg src='${svgLinkedin}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['location-on'] = html`<svg src='${svgLocation}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['menu'] = html`<svg src='${svgMenu}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['minus'] = html`<svg src='${svgMinus}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['neutral'] = html`<svg src='${svgAccountFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['notifications'] = html`<svg src='${svgNotification}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['open'] = html`<svg src='${svgOpen}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['order-status'] = html`<svg src='${svgRefill}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['pause'] = html`<svg src='${svgPause}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['people'] = html`<svg src='${svgAccount}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['person-bubble'] = html`<svg src='${svgPersonBubble}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['person'] = html`<svg src='${svgAccountFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['pinterest'] = html`<svg src='${svgPinterest}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['play-arrow'] = html`<svg src='${svgPlayFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['play-circle-outline'] = html`<svg src='${svgPlayCircle}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['progress-spinner'] = html`<svg src='${svgSpinner}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['replay'] = html`<svg src='${svgUndo}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['rss-feed'] = html`<svg src='${svgRss}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['rx'] = html`<svg src='${svgRx}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['search'] = html`<svg src='${svgSearch}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['shop'] = html`<svg src='${svgCart}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['spinner'] = html`<svg src='${svgSpinner}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['square'] = html`<svg src='${svgRectangle}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['success'] = html`<svg src='${svgCheckCircle}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['swap'] = html`<svg src='${svgSwap}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['thumb-up'] = html`<svg src='${svgThumbsUp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['trending-flat'] = html`<svg src='${svgTrendFlat}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['trending-up'] = html`<svg src='${svgTrendUp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['twitter'] = html`<svg src='${svgTwitter}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['vaccine'] = html`<svg src='${svgVaccine}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
        // iconMap['warning'] = html`<svg src='${svgWarningFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;

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
