import { css, CSSResult } from 'lit';
const styles = css`@use '../../design-tokens/core/scss/theming/component';

// #BREADCRUMBS

:host {
  display: inline-flex;
}

/**
 * 1) An ordered list of navigational hierarchy showing the user where they are on the site
 */
.cre8-c-breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: calc(8px * 1);
}
`;
export default styles;
