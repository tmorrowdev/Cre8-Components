import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) A passage of text  (e.g. article, blog post), including uncontrolled elements
 *    (e.g. unclassed h2, h3, ul, li, and so on).
 * 2) Use this file only for styling text passage and elements inside of text passage.
 */
cre8-text-passage,
cre8-text-passage[size='default'] {
  @include cre8-typography-body-default();

  /**
  * Generic h1 within text passage
  */

  h1 {
    @include cre8-typography-display-small();
    margin-bottom: size(1.5);
  }

  /**
  * Generic h2 within text passage
  */
  h2 {
    @include cre8-typography-headline-default();
    margin-bottom: size(1.5);
  }

  /**
  * Generic h3 within text passage
  */
  h3 {
    @include cre8-typography-headline-small();
    margin-bottom: size(1.5);
  }

  /**
  * Generic h4 within text passage
  */
  h4 {
    @include cre8-typography-title-large();
    margin-bottom: size(1.5);
  }

  /**
  * Generic h5 within text passage
  */
  h5 {
    @include cre8-typography-meta-large();
    margin-bottom: size(1.5);
  }

  /**
  * Generic unordered and ordered lists within text passage
  */
  ul,
  ol {
    margin-top: 0;
  }

  /**
  * Unordered list within text passage
  */
  ul {
    margin-left: size(2.5);
    padding-left: 0;
  }

  /**
  * Ordered list within text passage
  */
  ol {
    margin-left: size(2.25);
    padding-left: 0;
  }

  /**
  * Generic link tag within text passage
  */
  a {
    color: var(--cre8-color-content-link);

    &:hover,
    &:focus {
      text-decoration: underline;
      color: var(--cre8-color-content-link-hover);
    }
  }

  /**
  * Paragraph tag within text passage
  */
  p {
    margin-top: 0;
    margin-bottom: size(3);
  }

  /**
  * Blockquote within text passage
  */
  blockquote {
    font-style: italic;
    border-left: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-content-subtle);
    color: var(--cre8-color-content-subtle);
    padding-left: size(2);
    margin-left: 0;
    margin-bottom: size(2);
  }

  /**
* Last item declared in the text passage
* 1) Remove default margin bottom from the item
*/
  :last-child {
    margin-bottom: 0;
  }
}

/**
* Inverted text passage
*/
cre8-text-passage[inverted] {
  /**
  * Blockquote within inverted text passage
  */
  a {
    color: var(--cre8-color-content-brand-knockout);
    &:hover,
    &:focus {
      color: var(--cre8-color-content-brand-knockout-hover);
    }
  }
  blockquote {
    color: var(--cre8-color-content-knockout);
    font-style: italic;
    border-left: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-knockout);
    padding-left: size(2);
    margin-left: 0;
    margin-bottom: size(2);
  }
}
`;
export default styles;
