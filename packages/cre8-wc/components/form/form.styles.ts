import { css } from 'lit';

/**
 * Document-level styles for the light-DOM `cre8-form` component.
 *
 * Hand-authored rather than generated from a `.module.scss`: the SCSS
 * pipeline prepends global theming boilerplate (body and utility rules)
 * that is inert inside a shadow root but must never be adopted into the
 * host document. Every selector here is scoped under `cre8-form`.
 *
 * `--cre8-form-gap` is the themeable knob for vertical rhythm between
 * rows; it defaults to the 24px step of the spacing scale.
 */
const styles = css`
  cre8-form {
    display: block;
  }

  cre8-form .cre8-c-form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--cre8-form-gap, 1.5rem);
  }

  cre8-form .cre8-c-form > cre8-button,
  cre8-form .cre8-c-form > cre8-button-group:not([fullwidth]) {
    align-self: flex-start;
  }
`;

export default styles;
