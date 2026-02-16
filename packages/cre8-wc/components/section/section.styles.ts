import { css, CSSResult } from 'lit';
const styles = css`@use '../../design-tokens/core/scss/theming/component';

#SECTION


/**
 * 1) A major section of a page (<section> tag) with a title and optional description.
 */
.cre8-c-section {
  margin-bottom: calc(8px * 4);
  display: block;
}

/**
 * Section header
 * 1) Contains the section title and possibly a description
 */
.cre8-c-section-header {
  display: flex;
  justify-content: space-between;
}

/**
* Section body
*/
.cre8-c-section__body {
  padding-top: calc(8px * 2);
  @media all and (min-width:$cre8-breakpoint-lg) {
    padding-top: calc(8px * 4);
  }
}
`;
export default styles;
