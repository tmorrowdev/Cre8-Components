import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './heading.scss';

    /**
     *  HTML headings are titles or subtitles that you want to display on a webpage. The H1 is the most important and H6
     *  is the least important in the content hierarchy.
     *
     * # How to Use
     * 1. The cre8-heading tag wraps around one of the six native HTML "h" tags, depending on your chosen variation.
     * 2. There are two main use cases for using this component:
     *    text passage headings and Components with a title (i.e. modal, card or alert)
     * 3. There will be instances when the design requires the heading text to have the brand color applied
     *    in which case you should set the [brandColor](?path=/story/cre8-components-heading--brand-color)
     *    attribute to true on the cre8-heading tag.
     * 4. For dark backgrounds, add the [inverted](?path=/story/cre8-components-heading--inverted)
     *    attribute to the tag for white text.
     *
     *
     * @slot - The heading text content
     */
export class Cre8Heading extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

    /**
     * Heading type
     * <cre8-text-passage size="small">
     * <ul>
     * <li>**display-default** renders a heading with the heading display-default preset treatment</li>
     * <li>**display-small** renders a heading with the heading display-small preset treatment</li>
     * <li>**headline-large** renders a heading with the heading headline-large preset treatment</li>
     * <li>**headline-default** renders a heading with the heading headline-default preset treatment</li>
     * <li>**headline-small** renders a heading with the heading headline-small preset treatment</li>
     * <li>**title-xlarge** renders a heading with the heading title-xlarge preset treatment</li>
     * <li>**title-large** renders a heading with the heading title-large preset treatment</li>
     * <li>**title-default** renders a heading with the heading title-default preset treatment</li>
     * <li>**title-small** renders a heading with the heading title-small preset treatment</li>
     * <li>**label-large** renders a heading with the label-large preset treatment</li>
     * <li>**label** renders a heading with the label preset treatment</li>
     * <li>**label-small** renders a heading with the label-small preset treatment</li>
     * <li>**meta-large** renders a heading with the meta-large preset treatment</li>
     * <li>**meta-default** renders a heading with the meta-default preset treatment</li>
     * <li>**meta-small** renders a heading with the meta-small preset treatment</li>
     * </ul>
     * </cre8-text-passage>
     */
    @property()
        type?:
        | 'display-default'
        | 'display-small'
        | 'headline-large'
        | 'headline-default'
        | 'headline-small'
        | 'title-xlarge'
        | 'title-large'
        | 'title-default'
        | 'title-small'
        | 'label-large'
        | 'label-default'
        | 'label-small'
        | 'meta-large'
        | 'meta-default'
        | 'meta-small';

    /**
     * Dynamic tag name for the component
     * 1) This is needed to use proper semantic heading treatments depending on where the banner lives on the page
     * <cre8-text-passage size="small">
     * <ul>
     * <li>**h1** renders an `h1` tag</li>
     * <li>**h2** renders an `h2` tag. This is the default</li>
     * <li>**h3** renders an `h3` tag</li>
     * <li>**h4** renders an `h4` tag</li>
     * <li>**h5** renders an `h5` tag</li>
     * <li>**h6** renders an `h6` tag</li>
     * </ul>
     * </cre8-text-passage>
     *
     * @attr{string}
     */
    @property()
        tagVariant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h5';

    /**
     * Invert the color of the font from dark to light. An inverted `heading` should be used on a dark background.
     *
     * @attr{boolean}
     */
    @property({ type: Boolean, reflect: true })
        inverted?: boolean;

    /**
     * Apply the brand color to the heading text.
     *
     * @attr{boolean}
     */
    @property({ type: Boolean, reflect: true })
        brandColor?: boolean;

    render() {
        const tagVariantClassNames = !this.type
            ? {
                'cre8-c-heading--headline-large': this.tagVariant === 'h1',
                'cre8-c-heading--headline-default': this.tagVariant === 'h2',
                'cre8-c-heading--headline-small': this.tagVariant === 'h3',
                'cre8-c-heading--title-large': this.tagVariant === 'h4',
                'cre8-c-heading--title-default': this.tagVariant === 'h5',
                'cre8-c-heading--title-small': this.tagVariant === 'h6',
            }
            : {};

        const componentClassName = this.componentClassNames('cre8-c-heading', {
            ...tagVariantClassNames,
            'cre8-c-heading--headline-large': this.type === 'headline-large',
            'cre8-c-heading--headline-default': this.type === 'headline-default',
            'cre8-c-heading--headline-small': this.type === 'headline-small',
            'cre8-c-heading--title-large': this.type === 'title-large',
            'cre8-c-heading--title-default': this.type === 'title-default',
            'cre8-c-heading--title-small': this.type === 'title-small',
            'cre8-c-heading--title-xlarge': this.type === 'title-xlarge',
            'cre8-c-heading--display-default': this.type === 'display-default',
            'cre8-c-heading--display-small': this.type === 'display-small',
            'cre8-c-heading--label-large': this.type === 'label-large',
            'cre8-c-heading--label-default': this.type === 'label-default',
            'cre8-c-heading--label-small': this.type === 'label-small',
            'cre8-c-heading--meta-large': this.type === 'meta-large',
            'cre8-c-heading--meta-default': this.type === 'meta-default',
            'cre8-c-heading--meta-small': this.type === 'meta-small',
            'cre8-c-heading--brand-color': this.brandColor,
            'cre8-c-heading--inverted': this.inverted,
        });

        switch (this.tagVariant) {
            case 'h1':
                return html` <h1 part="tag" class="${componentClassName}"><slot></slot></h1> `;
            case 'h2':
                return html` <h2 part="tag" class="${componentClassName}"><slot></slot></h2> `;
            case 'h3':
                return html` <h3 part="tag" class="${componentClassName}"><slot></slot></h3> `;
            case 'h4':
                return html` <h4 part="tag" class="${componentClassName}"><slot></slot></h4> `;
            case 'h5':
                return html` <h5 part="tag" class="${componentClassName}"><slot></slot></h5> `;
            case 'h6':
                return html` <h6 part="tag" class="${componentClassName}"><slot></slot></h6> `;
            default:
                return html` <h4 part="tag" class="${componentClassName}"><slot></slot></h4> `;
        }
    }
}


if (customElements.get('cre8-heading') === undefined) {
    customElements.define('cre8-heading', Cre8Heading);
}

declare global {
    interface HTMLElementTagNameMap {
        'cre8-heading': Cre8Heading;
    }
}

export default Cre8Heading;
