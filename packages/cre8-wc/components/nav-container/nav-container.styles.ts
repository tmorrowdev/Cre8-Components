import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Wrapper around contents that get placed into a toggleable
 * menu on smaller screens (usually primary nav and maybe other contents)
 */
:host {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: 100vh;
  background: var(--cre8-nav-container-background, var(--cre8-color-header-submenu-bg-default));
  overflow: auto;

  @media all and (min-width:$cre8-breakpoint-lg) {
    position: static;
    width: auto;
    height: auto;
    background: none;
  }
}

/**
 * Actual nav container component
 */
.cre8-c-nav-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media all and (min-width:$cre8-breakpoint-lg) {
    flex-direction: row;
  }
}
`;
export default styles;
