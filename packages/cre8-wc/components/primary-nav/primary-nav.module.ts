import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

// #PRIMARY NAV

/**
 * Inverted primary nav
 */
.cre8-c-primary-nav--inverted {
  --cre8-primary-nav-link-color: var(--cre8-color-content-knockout);
}

/**
 * Primary nav list
 * 1) Stack on small screens within the toggleable menu but place side by side on large screens
 */
.cre8-c-primary-nav__list {
  display: flex;
  flex-direction: column; /* 1 */
  margin: 0;
  padding: 0;
  list-style: none;

  /**
  * Primary nav list within side by side variant
  * 1) Always keep items side by side
  */
  .cre8-c-primary-nav--side-by-side & {
    flex-direction: row; /* 1 */
  }

  @media all and (min-width:$cre8-breakpoint-lg) {
    flex-direction: row; /* 1 */
  }
}
`;
export default styles;
