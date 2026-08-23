import { html } from 'lit';
import '../../.storybook/components/f-po/f-po';
import { spread } from '../../directives/spread';
import '../grid-item/grid-item';
import './container-grid';

const items = (n = 6) => html`${Array.from({ length: n }, (_, i) => html`
  <cre8-grid-item>
    <f-po>Grid Item ${i + 1}</f-po>
  </cre8-grid-item>
`)}`;

// Storybook's canvas is a fixed viewport, so the only way to see the effect
// of a *container* query in a story is to resize something narrower than
// the viewport. This wraps every example in a handle the reader can drag -
// unlike `cre8-grid`, the column count here tracks that handle, not the
// browser window.
const resizable = (inner) => html`<div style="resize: horizontal; overflow: auto; min-width: 240px; max-width: 100%; width: 600px; border: 1px dashed var(--cre8-color-border-default); padding: 8px;">${inner}</div>`;

export default {
  title: 'cre8 Components/Container Grid',
  component: 'cre8-container-grid',
  parameters: { status: { type: 'inProgress' } },
};

export const Default = (args) => resizable(html`<cre8-container-grid ${spread(args)}>${items()}</cre8-container-grid>`);

export const SideBySide = () => resizable(html`<cre8-container-grid variant="side-by-side">${items()}</cre8-container-grid>`);

export const TwoUp = () => resizable(html`<cre8-container-grid variant="2up">${items()}</cre8-container-grid>`);

export const TwoUpBreakFaster = () => resizable(html`<cre8-container-grid variant="2up" break="faster">${items()}</cre8-container-grid>`);

export const TwoUpBreakSlower = () => resizable(html`<cre8-container-grid variant="2up" break="slower">${items()}</cre8-container-grid>`);

export const ThreeUp = () => resizable(html`<cre8-container-grid variant="3up">${items()}</cre8-container-grid>`);

export const OneToThreeUp = () => resizable(html`<cre8-container-grid variant="1-3up">${items(3)}</cre8-container-grid>`);

export const OneToFourUp = () => resizable(html`<cre8-container-grid variant="1-4up">${items(4)}</cre8-container-grid>`);

export const OneToTwoToFourUp = () => resizable(html`<cre8-container-grid variant="1-2-4up">${items(4)}</cre8-container-grid>`);

export const FourUp = () => resizable(html`<cre8-container-grid variant="4up">${items(8)}</cre8-container-grid>`);

export const TwoTo4to6Up = () => resizable(html`<cre8-container-grid variant="2-4-6up">${items(12)}</cre8-container-grid>`);

export const SidebarVsMain = () => html`<div style="display: flex; gap: 16px;">
  <div style="width: 220px;">
    <p><strong>Narrow sidebar (220px)</strong></p>
    <cre8-container-grid variant="1-2-4up">${items(4)}</cre8-container-grid>
  </div>
  <div style="flex: 1;">
    <p><strong>Wide main column</strong></p>
    <cre8-container-grid variant="1-2-4up">${items(4)}</cre8-container-grid>
  </div>
</div>
<p style="color: var(--cre8-color-content-subtle);">Both grids share one <code>variant="1-2-4up"</code>. The viewport is identical for both; each one's column count comes from its own box, which <code>cre8-grid</code> - keyed to the viewport - cannot do.</p>`;
