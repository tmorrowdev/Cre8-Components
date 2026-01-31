import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Navigation in the header for utility items like logging into an account
 */
:host {
  margin-left: auto;
}

/**
 * Inverted utility-nav
 */
.cre8-c-utility-nav--inverted {
  --cre8-utility-nav-link-color: var(--cre8-color-content-knockout);
}

/**
* Utility nav list
*/
.cre8-c-utility-nav__list {
  display: flex;
  margin: calc(8px * -2) 0 0 calc(8px * -2);
  padding: 0;
  list-style: none;

  /**
  * Slotted utility nav item
  */
  ::slotted(cre8-utility-nav-item) {
    margin-left: calc(8px * 2);
    margin-top: calc(8px * 2);
  }
}
`;
export default styles;
