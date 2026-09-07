import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// The design system's tokens and fonts. The components carry their own
// shadow styles, but those styles are written against CSS custom properties
// that only these files define - without them every component renders
// unstyled, which makes an "eye-catching" brief impossible to satisfy and
// the built artifact useless to look at. Imported here rather than left to
// the agent: it's scaffolding, not part of what's being scored, and
// App.tsx is the only file a trial is allowed to touch.
//
// cre8-vivid stacked over cre8-a2ui, and the order matters: vivid is a
// partial brand, not a standalone one. Its tokens_brand.css defines 539
// custom properties against a2ui's 997 - 472 of a2ui's are absent from it
// entirely - so loading vivid alone leaves those undefined and the
// components fall back to unstyled for everything vivid doesn't restate.
// a2ui goes first as the base, vivid second to override.
//
// The brand a page is themed with is a property of the page, not of the
// agent's code: component, prop, enum and slot names are identical across
// brands, so this changes nothing that gets scored, only how the built
// artifact looks.
import '@tmorrow/cre8-wc/design-tokens/brands/cre8-a2ui/css/fonts.css';
import '@tmorrow/cre8-wc/design-tokens/brands/cre8-a2ui/css/tokens_brand.css';
import '@tmorrow/cre8-wc/design-tokens/brands/cre8-a2ui/css/tokens_cre8-a2ui.css';
import '@tmorrow/cre8-wc/design-tokens/brands/cre8-vivid/css/fonts.css';
import '@tmorrow/cre8-wc/design-tokens/brands/cre8-vivid/css/tokens_brand.css';
import '@tmorrow/cre8-wc/design-tokens/brands/cre8-vivid/css/tokens_cre8-vivid.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
