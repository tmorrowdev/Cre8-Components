import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

// #FEATURE

/**
 * 1) A Feature is a prominent marketing block that contains
 *    Side by side information and an image
 */
.cre8-c-feature {
  display: flex; /* 2 */
  flex-direction: column;
  align-items: stretch;
  color: var(--cre8-feature-text-color, var(--cre8-theme-color-core-text, var(--cre8-color-neutral-black)));
  border-radius: var(--cre8-feature-border-radius, var(--cre8-border-radius-default, 0));

  @media all and (min-width:$cre8-breakpoint-md) {
    flex-direction: row;
  }
}

/**
 * Inverted feature
 */
.cre8-c-feature--inverted {
  color: var(--cre8-feature-inverted-text-color, var(--cre8-theme-color-inverted, var(--cre8-color-neutral-white)));
}

/**
 * Feature body
 * 1) Container within feature that usually contains an excerpt of text
 * 2) Take up the remaining space on medr screens
 */
.cre8-c-feature__body {
  margin-bottom: size(4);

  @media all and (min-width:$cre8-breakpoint-md) {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-right: size(4);
    margin-bottom: 0;
  }
}

/**
 * Feature media container
 */
.cre8-c-feature__media {
  width: 100%;

  @media all and (min-width:$cre8-breakpoint-md) {
    width: 45%;
  }
}

/**
 * Feature image
 */
.cre8-c-feature__image {
  display: block;
  width: 100%;
}
`;
export default styles;
