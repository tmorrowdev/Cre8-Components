import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Dropdown Item
 */

.cre8-dropdown-item {
  list-style-type: none;
  > {
    button {
      @include cre8-typography-body-default;
      background-color: var(--cre8-color-bg-default);
      border: var(--cre8-border-width-none);
      border-radius: var(--cre8-border-radius-default);
      color: var(--cre8-color-content-default);
      width: 100%;
      cursor: pointer;
      margin: var(--cre8-spacing-0);
      padding: var(--cre8-spacing-8) var(--cre8-spacing-8);
      text-align: left;

      &:active,
      &:hover,
      &:focus {
        background-color: var(--cre8-color-bg-brand-hover);
        color: var(--cre8-color-content-default);
        outline: var(--cre8-border-width-none);
      }
    }
  }
}
`;
export default styles;
