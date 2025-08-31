import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Individual item with a link/button within submenu
 */
.cre8-c-submenu-item__link {
  color: var(--cre8-color-header-submenu-content-default);
  background: var(--cre8-color-header-submenu-bg-default);
  text-decoration: none;

  &:hover,
  &:focus {
    color: var(--cre8-color-header-submenu-content-hover);
    background: var(--cre8-color-header-submenu-bg-hover);
  }

  &:active {
    color: var(--cre8-color-header-submenu-content-pressed);
    background: var(--cre8-color-header-submenu-bg-pressed);
  }
}
`;
export default styles;
