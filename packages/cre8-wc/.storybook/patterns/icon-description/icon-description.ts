import { css } from 'lit';
const styles = css`@import 'design-tokens/core/scss/theming/component';

/**
 * 1)
 */
.c-icon-description {
  display: flex;
  gap: size(1);
}

.c-icon-description--sm {
  @include cre8-typography-label-small;
}

.c-icon-description--light {
  @include cre8-typography-body-default;
}

.c-icon-description--align-end {
  justify-content: flex-end;
}

.c-icon-description--valign-center {
  align-items: center;
}

.c-icon-description__header {
  .c-icon-description--sm & {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 2rem;
  }
}

::slotted(cre8-icon-legacy) {
  --cre8-icon-height: #{size(6)};
  --cre8-icon-width: #{size(6)};

  .c-icon-description--sm & {
    --cre8-icon-height: #{size(2)};
    --cre8-icon-width: #{size(2)};
  }
}
`;
export default styles;
