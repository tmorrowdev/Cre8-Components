import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

.cre8-c-calendar-month-modal {
  padding: size(1);
}

/* grid */
ol {
  @include cre8-typography-body-default();
  display: grid;
  grid-row-gap: 0.33em;
  grid-template-columns: repeat(3, 1fr);
  list-style: none;
  margin: unset;
  padding: unset;
}

li {
  display: inline-flex;
  justify-content: center;
}
`;
export default styles;
