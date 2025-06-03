import { css } from 'lit';
const styles = css`@import '../../../design-tokens/core/scss/theming/component';

// #PAGE-COUNTER
:host{
  display: inline-flex;
}

/**
 * 1)
 */
 .cre8-c-pagination__text{
  @include cre8-typography-label-small();
  padding: size(1);
 }
`;
export default styles;
