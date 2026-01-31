import { css } from 'lit';
const styles = css`@import 'design-tokens/core/scss/theming/component' ;

/**
 * 1)
 */
.c-request-prescription {
  @include cre8-typography-body-large();
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(8px * 5);
  border: var(--cre8-theme-border-width) dashed var(--cre8-color-border-default);
}

.c-request-prescription__footer {
  margin-top: calc(8px * 2);
}
`;
export default styles;
