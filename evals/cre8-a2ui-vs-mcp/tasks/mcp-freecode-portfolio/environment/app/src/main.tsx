import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// The design system's tokens and fonts. The components carry their own
// shadow styles, but those styles are written against CSS custom properties
// that only these files define - without them every component renders
// unstyled, which makes an "eye-catching" brief impossible to satisfy and
// the built artifact useless to look at. Imported here rather than left to
// the agent: it's scaffolding, not part of what's being scored, and
// App.tsx is the only file a trial is allowed to touch.
import '@tmorrow/cre8-wc/design-tokens/brands/cre8/css/fonts.css';
import '@tmorrow/cre8-wc/design-tokens/brands/cre8/css/tokens_brand.css';
import '@tmorrow/cre8-wc/design-tokens/brands/cre8/css/tokens_cre8.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
