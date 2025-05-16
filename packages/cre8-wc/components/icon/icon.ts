/* eslint-disable max-len */
/* eslint-disable dot-notation */
/* eslint-disable max-statements */
import { TemplateResult, html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';

// These replace icons from `cre8-wc/icons/*`.
import svgAdd from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Add.svg?raw';
import svgArrowLeft from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Arrow - Left.svg?raw';
import svgChat from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Chat Default.svg?raw';
import svgCalendar from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Calendar.svg?raw';
import svgCaretDown from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Caret Down.svg?raw';
import svgCheckCircle from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Check.svg?raw';
import svgCheck from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Check.svg?raw';
import svgClose from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Close.svg?raw';
import svgDownload from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Download.svg?raw';
import svgEdit from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Edit.svg?raw';
import svgEllipsis from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Ellipsis.svg?raw';
import svgMessageFilled from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Message Unread.svg?raw';
import svgMessage from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Message Unread.svg?raw';
import svgError from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Error.svg?raw';
import svgExternal from '@cre8_dev/cre8-icons/lib/icons/System/Regular/External Link.svg?raw';
import svgMedication from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Medication.svg?raw';
import svgGlobe from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Globe.svg?raw';
import svgHandHeart from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Wellness.svg?raw';
import svgHelp from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Help.svg?raw';
import svgInfoFilled from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Info.svg?raw';
import svgCaretUp from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Caret Up.svg?raw';
import svgLightbulb from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Lightbulb.svg?raw';
import svgLocation from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Location.svg?raw';
import svgMenu from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Menu.svg?raw';
import svgMinus from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Minus.svg?raw';
import svgAccountFilled from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Account.svg?raw';
import svgNotification from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Notification.svg?raw';
import svgRefill from '@cre8_dev/cre8-icons/lib/icons/Marketing/Duotone/Refill.svg?raw';
import svgAccount from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Account.svg?raw';
import svgPlayFilled from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Play Arrow.svg?raw';
import svgPlayCircle from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Play Circle.svg?raw';
import svgSpinner from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Spinner/75.svg?raw';
import svgUndo from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Undo.svg?raw';
import svgSearch from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Search.svg?raw';
import svgCart from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Cart.svg?raw';
import svgRectangle from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Shape/Rectangle.svg?raw';
import svgVaccine from '@cre8_dev/cre8-icons/lib/icons/Marketing/Duotone/Vaccinations.svg?raw';
import svgWarningFilled from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Warning.svg?raw';
import svgCaretDoubleRight from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Caret Double Right.svg?raw';
import svgFatArrowUp from './icons/arrow-fat-up-fill.svg?raw';
import svgErrorAlt from './icons/error-alt.svg?raw';
import svgEsi from './icons/express-scripts.svg?raw'; // get from cre8-assets in the future?
import svgFacebook from './icons/facebook.svg?raw';
import svgInsta from './icons/instagram.svg?raw';
import svgLinkedin from './icons/linkedin.svg?raw';
import svgNewRx from './icons/new-rx.svg?raw';
import svgOpen from './icons/open.svg?raw';
import svgPause from './icons/pause.svg?raw';
import svgPersonBubble from './icons/person-bubble.svg?raw';
import svgPinterest from './icons/pinterest.svg?raw';
import svgRss from './icons/rss-feed.svg?raw';
import svgRx from './icons/rx.svg?raw';
import svgSwap from './icons/swap.svg?raw';
import svgThumbsUp from './icons/thumb-up.svg?raw';
import svgTrendFlat from './icons/trending-flat.svg?raw';
import svgTrendUp from './icons/trending-up.svg?raw';
import svgTwitter from './icons/twitter.svg?raw';

import { Cre8Element } from '../cre8-element';
import styles from './icon.scss';
import iconSprite from '../../icons/cre8-icons.svg';
import '@cre8_dev/cre8-icons';

/**
 *
 * <cre8-icon> is a web component, which can be used with any frontend framework and use any svg.
 * It takes raw svgs as props and renders them.
 *
 * **'cre8-icon-legacy'** will be **deprecated** in Web Components v0.5.0
 *
 * - [List of new figma icons](https://www.figma.com/file/j1a0rBkoH65XiGKfq7ppWa/Iconography?type=design&node-id=2037-5773&mode=design&t=6ZzC6KH3Gkxf3fj5-4)
 * - The new `cre8-icon` from the cre8-icon package: https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/cre8-icons/.
 *
 * ##Usability Considerations
 * - If the icon is decorative: set `aria-hidden` to true.
 * - If the icon is interactive (not decorative): set `aria-hidden` to false and add the `aria-label`
 * - If the icon is key to functionality from a screen reader perspective, it is required to add `aria-label`
 * which will describe the icon.
 * For example, if the icon is a close button, setting `aria-label="Close"`will give
 * the SVG an aria-label to make it sufficiently accessible.
 *
 * [More information on Accessibility with cre8-icons](https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/cre8-icons/?path=/story/getting-started-accessibility--page)
 *
 * ##How to use
 * Cre8 Web Components (cre8-wc) includes the `cre8_dev/cre8-icons` package.
 * If you need to install a newer version than what's included, please see
 * the [installation instructions for cre8-icons](https://git.express-scripts.com/ExpressScripts/cre8-icons#installation).
 * - Import the component (this is the icon container): `import '@cre8_dev/cre8-icons';`
 * - Import an svg as a string: `import svgInfo from '!!raw-loader!cre8_dev/cre8-icons/lib/icons/System/Regular/Info.svg';`
 *
 * Your import paths may be different depending on your project's build configuration.
 * Please see [Importing Icons](https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/cre8-icons/?path=/story/icon-sets-importing-icons--page)
 * of the `cre8_dev/cre8-icons` documentation for more information.
 */

export class Cre8IconLegacy extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

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
            return `${script.src.replace(/^(.+)\/.*$/, '$1')}/svgs/cre8-icons.svg`;
        }

        return this.iconUrl;
    }

    render() {
        const componentClassName = this.componentClassNames('cre8-c-icon-wrapper', {});

        // No more mappings should be added as all new icons should be pulled through cre8-icons
        const iconMap: { [name: string]: TemplateResult<1> } = {};

        iconMap['add'] = html`<cre8-icon svg='${svgAdd}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['arrow-back'] = html`<cre8-icon svg='${svgArrowLeft}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['arrow-forward'] = html`<cre8-icon svg='${svgArrowLeft}' rotate="180" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['attention'] = html`<cre8-icon svg='${svgChat}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['bold-arrow-up'] = html`<cre8-icon svg='${svgFatArrowUp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['calendar'] = html`<cre8-icon svg='${svgCalendar}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['calendar-datepicker'] = html`<cre8-icon svg='${svgCalendar}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}" height="24" width="24"></cre8-icon>`;
        iconMap['caret-down'] = html`<cre8-icon svg='${svgCaretDown}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['caret-double-left'] = html`<cre8-icon svg='${svgCaretDoubleRight}' rotate="180" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['caret-double-right'] = html`<cre8-icon svg='${svgCaretDoubleRight}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['check-circle'] = html`<cre8-icon svg='${svgCheckCircle}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['check'] = html`<cre8-icon svg='${svgCheck}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['close'] = html`<cre8-icon svg='${svgClose}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['delta-down'] = html`<cre8-icon svg='${svgCaretDown}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['delta-up'] = html`<cre8-icon svg='${svgCaretDown}' flip="vertical" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['download'] = html`<cre8-icon svg='${svgDownload}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['edit'] = html`<cre8-icon svg='${svgEdit}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['ellipsis'] = html`<cre8-icon svg='${svgEllipsis}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['email'] = html`<cre8-icon svg='${svgMessageFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['envelope'] = html`<cre8-icon svg='${svgMessage}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['error-alt'] = html`<cre8-icon svg='${svgErrorAlt}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['error-round'] = html`<cre8-icon svg='${svgError}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['error'] = html`<cre8-icon svg='${svgError}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['express-scripts'] = html`<cre8-icon svg='${svgEsi}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['external-file'] = html`<cre8-icon svg='${svgExternal}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['facebook'] = html`<cre8-icon svg='${svgFacebook}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['find-drug'] = html`<cre8-icon svg='${svgMedication}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['globe'] = html`<cre8-icon svg='${svgGlobe}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['hand-heart'] = html`<cre8-icon svg='${svgHandHeart}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['help'] = html`<cre8-icon svg='${svgHelp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['info'] = html`<cre8-icon svg='${svgInfoFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['instagram'] = html`<cre8-icon svg='${svgInsta}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['keyboard-arrow-down'] = html`<cre8-icon svg='${svgCaretUp}' rotate="180" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['keyboard-arrow-left'] = html`<cre8-icon svg='${svgCaretUp}' rotate="-90" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['keyboard-arrow-right'] = html`<cre8-icon svg='${svgCaretUp}' rotate="90" container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['keyboard-arrow-up'] = html`<cre8-icon svg='${svgCaretUp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['language'] = html`<cre8-icon svg='${svgGlobe}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['light-bulb'] = html`<cre8-icon svg='${svgLightbulb}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['linkedin'] = html`<cre8-icon svg='${svgLinkedin}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['location-on'] = html`<cre8-icon svg='${svgLocation}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['menu'] = html`<cre8-icon svg='${svgMenu}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['minus'] = html`<cre8-icon svg='${svgMinus}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['neutral'] = html`<cre8-icon svg='${svgAccountFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['new-rx-icon'] = html`<cre8-icon svg='${svgNewRx}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['notifications'] = html`<cre8-icon svg='${svgNotification}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['open'] = html`<cre8-icon svg='${svgOpen}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['order-status'] = html`<cre8-icon svg='${svgRefill}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['pause'] = html`<cre8-icon svg='${svgPause}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['people'] = html`<cre8-icon svg='${svgAccount}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['person-bubble'] = html`<cre8-icon svg='${svgPersonBubble}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['person'] = html`<cre8-icon svg='${svgAccountFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['pinterest'] = html`<cre8-icon svg='${svgPinterest}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['play-arrow'] = html`<cre8-icon svg='${svgPlayFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['play-circle-outline'] = html`<cre8-icon svg='${svgPlayCircle}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['progress-spinner'] = html`<cre8-icon svg='${svgSpinner}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['replay'] = html`<cre8-icon svg='${svgUndo}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['rss-feed'] = html`<cre8-icon svg='${svgRss}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['rx'] = html`<cre8-icon svg='${svgRx}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['search'] = html`<cre8-icon svg='${svgSearch}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['shop'] = html`<cre8-icon svg='${svgCart}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['spinner'] = html`<cre8-icon svg='${svgSpinner}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['square'] = html`<cre8-icon svg='${svgRectangle}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['success'] = html`<cre8-icon svg='${svgCheckCircle}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['swap'] = html`<cre8-icon svg='${svgSwap}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['thumb-up'] = html`<cre8-icon svg='${svgThumbsUp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['trending-flat'] = html`<cre8-icon svg='${svgTrendFlat}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['trending-up'] = html`<cre8-icon svg='${svgTrendUp}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['twitter'] = html`<cre8-icon svg='${svgTwitter}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['vaccine'] = html`<cre8-icon svg='${svgVaccine}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;
        iconMap['warning'] = html`<cre8-icon svg='${svgWarningFilled}' container-class="${componentClassName}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></cre8-icon>`;

        const iconPath = this.getIconPath();

        if (iconMap[this.name] !== undefined) {
            return iconMap[this.name];
        }

        return html`
            <svg
                aria-hidden="${!this.iconTitle}"
                aria-label="${this.iconTitle}"
                class="${componentClassName} cre8-c-icon"
                focusable="${this.focusable}"
                role="${this.iconTitle && 'img'}"
                {...other}
            >
                <use href="${iconPath}#${this.name}" />
            </svg>
        `;
    }
}

if (customElements.get('cre8-icon-legacy') === undefined) {
    customElements.define('cre8-icon-legacy', Cre8IconLegacy);
}

declare global {
    interface Window {
        Cre8_ICON_URL: string;
    }
    interface HTMLElementTagNameMap {
        'cre8-icon-legacy': Cre8IconLegacy;
    }
}

export default Cre8IconLegacy;
