import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';
@import '@cre8_dev/cre8-design-tokens/lib/web/layouts/breakpoints.scss';

// #FOOTER

/**
 * 1) Container used to house various Components and content for the global footer
 */
.cre8-c-footer {
  @include cre8-typography-body-default();
  background: var(--cre8-color-bg-brand-xstrong);
  color: var(--cre8-color-content-knockout);
  padding-top: size(5);
  padding-bottom: size(6);

  @media all and (min-width:$cre8-breakpoint-lg) {
    padding-top: size(6.875);
  }
}
`;
export default styles;
