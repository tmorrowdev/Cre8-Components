import { css, CSSResult } from 'lit';
const styles = css`@use '../../../design-tokens/core/scss/theming/component.scss';

// #PAGE-COUNTER
:host{
  display: inline-flex;
}

/**
 * 1)
 */
 .cre8-c-pagination__text{
  @include cre8-typography-label-small();
  padding: calc(8px * 1);
 }
`;
export default styles;
