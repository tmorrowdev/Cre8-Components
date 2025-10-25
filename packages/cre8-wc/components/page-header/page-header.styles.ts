import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Headline of a page with an h1 heading and optional description
 */
.cre8-c-page-header {
  margin-bottom: calc(var(--size-base-unit) * 4);
}

/**
 * Page header title
 */
.cre8-c-page-header__title {
  display: inline;
  margin: 0;
  @include cre8-typography-display-default();
}

/**
 * Page header title after
 * 1) Container placed after page header title if something like a badge needs to be placed there
 */
.cre8-c-page-header__title-after {
  display: inline-block;
  position: relative;
  bottom: calc(var(--size-base-unit) * 1.25);
  margin-left: calc(var(--size-base-unit) * 2);
}

/**
 * Page header description
 */
.cre8-c-page-header__description {
  @include cre8-typography-body-default;
}
`;
export default styles;
