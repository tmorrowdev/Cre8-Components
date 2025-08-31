import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

:host {
  display: inline-flex;
}

/**
 * 1) Singular item within the breadcrumbs component that contains a link elsewhere on the site
 */
.cre8-c-breadcrumbs--item {
  display: inline-flex;
  align-items: center;

  /**
  * Breadcrumbs caret doesn't display for last breadcrumb item
  */
  :host(:last-child) & {
    cre8-icon {
      display: none;
    }
  }
}

/**
* Breadcrumbs icon
*/
cre8-icon {
  margin-left: size(1);
  color: var(--cre8-color-content-subtle);
  display: inline-flex;
  svg {
    height: size(2);
    width: size(2);
  }
}
`;
export default styles;
