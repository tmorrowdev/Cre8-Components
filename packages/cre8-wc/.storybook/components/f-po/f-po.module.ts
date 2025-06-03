import { css } from "lit";
const styles = css`

@import 'design-tokens/core/scss/theming/component';

.f-po {
  @include cre8-typography-body-default();
  background: #e8f4f8;
  border: 1px dashed #69b3e7;
  width: 100%;
  border-radius: 5px;
  padding: 1rem;
  font-weight: bold;
  text-align: center;
  color: darken(#69b3e7, 30%);
}`
export default styles;
