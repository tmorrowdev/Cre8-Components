import { css } from 'lit';
const styles = css`@import '../../design-tokens/core/scss/theming/component';

.cre8-c-calendar {
  min-width: 340px; // this is the width of a calendar with the longest character month (September)
  border: var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  margin-top: size(0.5);
  background-color: var(--cre8-color-bg-default);
  position: absolute;
}

/* shortcuts */
.cre8-c-calendar__header-shortcuts {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding-top: size(2);
  padding-bottom: size(1);

  cre8-button + cre8-button {
    padding-left: size(1);
  }

  cre8-button {
    max-height: 32px;
  }
}

table {
  width: 100%;
}

/* table row */
tr {
  @include cre8-typography-body-default();
  display: grid;
  grid-row-gap: 0.33em;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  margin: unset;
  padding: unset;
  position: relative;
}

/* day wrappers */
td {
  align-items: center;
  display: flex;
  height: 48px;
  justify-content: center;
  width: 48px;
}

/* days */
.cre8-c-calendar :is(thead, tbody) :is(span, button) {
  @include cre8-typography-body-default();
  align-items: center;
  block-size: 2em;
  border-radius: var(--cre8-border-radius-brand);
  display: flex;
  inline-size: 2em;
  justify-content: center;
  margin-block: var(0, 0 0.33em);
  user-select: none;
}

/* day buttons */
.cre8-c-calendar__day-button {
  border: none;
  background: none;
  margin: 0;
  padding: 0;

  &:hover,
  &:focus {
    background: var(--cre8-color-bg-default-hover);
  }

  &.cre8-c-calendar__different-month {
    color: var(--cre8-color-content-subtle);

    &:hover,
    &:focus {
      background: var(--cre8-color-bg-subtle);
    }
  }

  &[data-today] {
    color: var(--cre8-color-content-brand);
    border-color: var(--cre8-color-border-brand);
    border-width: var(--cre8-border-width-default);
    border-style: var(--cre8-border-style-default);
  }
  
  &[data-selected] {
    background: var(--cre8-color-bg-brand-strong);
    color: var(--cre8-color-content-knockout);
  
    &:hover,
    &:focus {
      background: var(--cre8-color-bg-brand-strong-hover);
    }
  }
}

`;
export default styles;
