import { addons } from '@storybook/addons';
import cre8Theme from './cre8Theme';
import { DOCS_RENDERED } from '@storybook/core-events';

addons.getChannel().addListener(DOCS_RENDERED, (e) => {
  // Storybook sometimes hides Modal stories without unmounting them, which breaks scrolling.
  const iframe = document.querySelector('#storybook-preview-iframe');
  if (iframe !== undefined) {
    const body = iframe.contentDocument.querySelector('body');
    body.style.removeProperty('overflow');
  }
});

addons.setConfig({
  enableShortcuts: false,
  theme: cre8Theme,
});