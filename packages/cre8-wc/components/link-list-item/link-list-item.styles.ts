import { css, CSSResult } from 'lit';
const styles = css`@use '../../design-tokens/core/scss/theming/component';

/**
 * 1) An individual list item with a link inside
 */

/**
 * Link list link
 * 1) Set to inherit color so that the link list link. Maybe a TODO
 */
.cre8-c-link-list__item {
  display: flex;
  align-items: center;
}

/**
 * Link list link
 */
.cre8-c-link-list__link {
  display: flex;
  align-items: center;
  color: var(--cre8-link-list-link-color, var(--cre8-color-content-link));
  text-decoration: underline;

  &:hover,
  &:focus {
    color: var(--cre8-link-list-link-hover-color, var(--cre8-color-content-link-hover));
    text-decoration: none;
  }

  /**
  * Link list link within active link list item
  * 1) This custom property cascade is set at the link list level
  * 2) TODO: Discuss how we want to handle bold variants since mixins can't get passed down
  */
  .cre8-c-link-list__item.cre8-is-active & {
    color: var(--cre8-link-list-item-active-text-color);
    font-weight: var(--cre8-font-weight-bold); /* 2 */
  }
}

/**
 * Link list item after
 * 1) Container to place things like badges after an item
 */
.cre8-c-link-list__item-before {
  margin-right: calc(8px * 1);
}

/**
 * Link list item after
 * 1) Container to place things like badges after an item
 */
.cre8-c-link-list__item-after {
  margin-left: calc(8px * 1);
}

::slotted(cre8-icon-legacy) {
  --cre8-icon-height: #{calc(8px * 3)};
  --cre8-icon-width: #{calc(8px * 3)};
}
`;
export default styles;
