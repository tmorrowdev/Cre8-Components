import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

// #DROPDOWN

/**
 * 1) Dropdown
 */

.cre8-c-dropdown-container {
  display: inline-flex;
  position: relative;
}
.cre8-c-dropdown {
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  box-shadow: var(--cre8-shadow-default);
  border-radius: var(--cre8-border-radius-default);
  display: none;
  flex-direction: column;
  left: 0;
  min-width: 100%;
  padding: var(--cre8-spacing-8);
  position: absolute;
  top: 100%;
  white-space: nowrap;
}

.cre8-c-dropdown--open {
  display: flex;
}

.cre8-c-dropdown--icon-button {
  color: var(--cre8-color-button-secondary-content);
  margin-top: size(1);
}

.cre8-c-dropdown--icon-link {
  color: var(--cre8-color-content-link);
  margin-top: size(1);
}

.cre8-c-dropdown--toggle {
  @include cre8-typography-label-default;
  align-items: center;
  justify-content: space-between;
  display: flex;
  gap: var(--cre8-spacing-8);
  white-space: nowrap;
}

.cre8-c-dropdown--button {
  background-color: var(--cre8-color-button-secondary-bg);
  border: var(--cre8-border-style-default) var(--cre8-border-width-default) var(--cre8-color-button-secondary-border);
  border-radius: var(--cre8-border-radius-button);
  color: var(--cre8-color-button-secondary-content);
  padding: var(--cre8-spacing-8) var(--cre8-spacing-16);
}

.cre8-c-dropdown--link {
  color: var(--cre8-color-content-link);
  background-color:  var(--cre8-color-bg-transparent);
  text-decoration: underline;
}


.cre8-c-dropdown--close {
  display: none;
}

ul {
  list-style-type: none;
  padding: var(--cre8-spacing-0);
  margin: 0;
}
`;
export default styles;
