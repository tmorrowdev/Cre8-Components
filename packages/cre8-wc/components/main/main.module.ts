import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

// #MAIN

/**
 * 1) Container for the main content on the page between the header and footer
 * 2) Set to flex: 1 0 auto for a footer that gets pushed all the way to the bottom
 * for pages that don't have a lot of content
 */
:host {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto; /* 2 */
}

/**
 * Full height main container
 */
.cre8-c-main--full-height {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}
`;
export default styles;
