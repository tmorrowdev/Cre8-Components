import uiTheme from './uiTheme';
import '../lib/web/brands/cre8/css/tokens_cre8.css';

export const parameters = {
    viewMode: 'docs',
    options: {
      theme: uiTheme,
      storySort: {
        method: 'alphabetical',
        order: [
          'Getting Started',['Welcome','What is a Design Token?', 'Choosing the Right Token', 'Installation'],
          'Design Tokens', ['Content', 'Background', 'Border', 'Breakpoints', 'Spacing', 'Shadow'],
          'Typography Mixins',['How to Use', 'Body', 'Label', 'Title', 'Headline', 'Display', 'Meta', 'React Native']
        ], // An array of story kinds to order by.
    },
  },
}
