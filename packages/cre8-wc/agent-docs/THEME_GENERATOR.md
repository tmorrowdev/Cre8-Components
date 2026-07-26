# Theme Generator

The Theme Generator is an AI-powered tool that extracts design tokens from any website and generates CSS themes compatible with the cre8 Design System.

## Setup

### 1. OpenAI API Key

You need an OpenAI API key to use the theme generator:

1. Visit [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Set it as an environment variable:

```bash
export OPENAI_API_KEY="your-api-key-here"
```

Or create a `.env` file in the project root:

```bash
# .env
OPENAI_API_KEY=your-api-key-here
```

### 2. Dependencies

The theme generator uses:
- **Puppeteer** - For web scraping and CSS extraction
- **OpenAI GPT-4** - For intelligent token mapping and theme generation
- **CSS Parser** - For analyzing extracted stylesheets

## Usage

```bash
pnpm generate-theme <theme-name> <url> [description]
```

### Examples

```bash
# Generate a Nike-inspired theme
pnpm generate-theme "Nike" "https://nike.com" "Athletic brand theme"

# Generate a Spotify-inspired theme
pnpm generate-theme "Spotify" "https://spotify.com"

# Generate a custom brand theme
pnpm generate-theme "MyBrand" "https://mybrand.com" "Custom brand identity"
```

## How It Works

1. **CSS Extraction**: Puppeteer visits the target URL and extracts all CSS stylesheets
2. **Token Analysis**: The CSS parser categorizes design values (colors, fonts, spacing, etc.)
3. **AI Processing**: OpenAI GPT-4 analyzes the extracted tokens and creates semantic mappings
4. **Theme Generation**: A complete CSS theme is generated using cre8 Design System conventions
5. **File Output**: The theme is saved to `design-tokens/{theme-name}/`

## Output Structure

Generated themes include:

```
design-tokens/
└── your-theme-name/
    ├── tokens.css      # Complete CSS theme
    └── theme.json      # Theme metadata
```

### tokens.css Structure

```css
:root {
  /* Brand Colors */
  --cds-color-primary: #1976d2;
  --cds-color-secondary: #424242;
  --cds-color-accent: #ff4081;
  
  /* Semantic Colors */
  --cds-color-success: #4caf50;
  --cds-color-warning: #ff9800;
  --cds-color-danger: #f44336;
  --cds-color-info: #2196f3;
  
  /* Typography */
  --cds-font-size-xs: 0.75rem;
  --cds-font-size-sm: 0.875rem;
  --cds-font-size-md: 1rem;
  --cds-font-size-lg: 1.25rem;
  --cds-font-size-xl: 1.5rem;
  
  /* Spacing */
  --cds-space-xs: 0.25rem;
  --cds-space-sm: 0.5rem;
  --cds-space-md: 1rem;
  --cds-space-lg: 1.5rem;
  --cds-space-xl: 3rem;
  
  /* Border Radius */
  --cds-radius-sm: 0.25rem;
  --cds-radius-md: 0.5rem;
  --cds-radius-lg: 1rem;
  
  /* Shadows */
  --cds-shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --cds-shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --cds-shadow-lg: 0 10px 25px rgba(0,0,0,0.1);
}
```

## Features

- **Intelligent Token Mapping**: AI understands brand context and creates semantic color assignments
- **Accessibility Compliance**: Ensures WCAG AA color contrast requirements
- **Complete Token Sets**: Generates comprehensive design tokens even from minimal source material
- **Brand Consistency**: Maintains brand personality throughout token choices
- **Design System Integration**: Uses cre8 Design System naming conventions

## Troubleshooting

### Common Issues

1. **Missing API Key**
   ```
   Error: OPENAI_API_KEY environment variable is not set
   ```
   Solution: Set your OpenAI API key in environment variables or .env file

2. **Puppeteer Issues**
   ```
   Error: Failed to launch the browser process
   ```
   Solution: Ensure all dependencies are installed with `pnpm install`

3. **Network Errors**
   ```
   Error: Navigation timeout
   ```
   Solution: Check internet connection and ensure the target URL is accessible

### Debug Mode

Set environment variables for debugging:

```bash
# Run browser in non-headless mode
export PUPPETEER_HEADLESS=false

# Enable debug logging
export DEBUG=puppeteer:*
```

## Advanced Usage

### Custom Prompts

The AI prompts can be customized in `cli/ai-prompts.ts` for specific brand requirements or industry contexts.

### Token Validation

Use the theme validator to check generated themes:

```bash
pnpm theme-validator design-tokens/your-theme-name/tokens.css
```

### Theme Management

Manage multiple themes with the theme manager:

```bash
pnpm theme-manager
```