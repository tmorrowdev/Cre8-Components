import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

// #PERCENT-BAR


/**
 * Percent Bar Controls
 */
.cre8-c-percent-bar__controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: size(4.5);
}

.cre8-c-percent-bar__button {
  size: var(--cre8-icon-size-default);
}

.cre8-c-percent-bar__text-passage {
  color: var(--cre8-color-content-default);
  @include cre8-typography-body-small();
}

.cre8-c-percent-bar__p {
  width: fit-content;
}
`;
export default styles;
