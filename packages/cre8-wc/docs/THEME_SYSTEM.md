# Theme Generation System

A comprehensive system for generating branded themes from website URLs using AI-powered CSS analysis.

## Overview

The theme system consists of four main CLI tools:

1. **Theme Generator** - Extract CSS from URLs and generate branded themes
2. **Theme Manager** - Manage, validate, and activate themes
3. **Theme Validator** - Comprehensive validation and testing
4. **AgentRPC Server** - API service for theme operations

## Quick Start

### 1. Generate a New Theme

```bash
# Basic theme generation
npm run generate-theme "Nike" "https://nike.com" "Athletic brand theme"

# Enhanced generation with validation
npm run generate-theme "Spotify" "https://spotify.com"
```

### 2. Manage Themes

```bash
# List all available themes
npm run theme-manager list

# Activate a theme in Storybook
npm run theme-manager activate nike

# Get detailed theme information
npm run theme-manager info spotify

# Generate HTML preview
npm run theme-manager preview nike
```

### 3. Validate Themes

```bash
# Validate a theme
npm run theme-validator validate ./design-tokens/nike/tokens.css

# Generate validation report
npm run theme-validator report ./design-tokens/spotify/tokens.css
```

### 4. API Service

```bash
# Start the AgentRPC server
npm run agentrpc
```

## Environment Setup

### Required Environment Variables

```bash
# Required for AI-powered theme generation
export OPENAI_API_KEY="your-openai-api-key"

# Optional for AgentRPC service
export AGENTRPC_API_SECRET="your-agent-rpc-secret"
```

### Dependencies

All necessary dependencies are included in package.json:
- `puppeteer` - Web scraping and CSS extraction
- `openai` - AI-powered token mapping
- `agentrpc` - API service framework
- `zod` - Schema validation

## CLI Tools Reference

### Theme Generator

Generate themes from website URLs with advanced AI analysis.

```bash
npm run generate-theme <name> <url> [description]
```

**Features:**
- Automated CSS extraction using headless browser
- Intelligent token categorization and filtering
- AI-powered semantic mapping to design tokens
- Brand context analysis and color psychology
- Accessibility validation and contrast checking
- Enhanced prompts for better AI output

**Examples:**
```bash
# Generate Nike theme
npm run generate-theme "Nike" "https://nike.com" "Athletic performance brand"

# Generate Apple theme
npm run generate-theme "Apple" "https://apple.com" "Premium technology brand"
```

### Theme Manager

Comprehensive theme lifecycle management.

```bash
npm run theme-manager <command> [arguments]
```

**Commands:**

| Command | Description | Usage |
|---------|-------------|-------|
| `list` | Show all available themes | `npm run theme-manager list` |
| `validate <theme>` | Validate theme integrity | `npm run theme-manager validate nike` |
| `activate <theme>` | Add theme to Storybook | `npm run theme-manager activate nike` |
| `deactivate <theme>` | Remove from Storybook | `npm run theme-manager deactivate nike` |
| `delete <theme>` | Delete theme (use --force) | `npm run theme-manager delete old-theme --force` |
| `info <theme>` | Show detailed information | `npm run theme-manager info nike` |
| `preview <theme>` | Generate HTML preview | `npm run theme-manager preview nike` |

**Examples:**
```bash
# See all themes and their status
npm run theme-manager list

# Get detailed information about a theme
npm run theme-manager info nike

# Activate theme for use in Storybook
npm run theme-manager activate nike

# Generate standalone HTML preview
npm run theme-manager preview nike
```

### Theme Validator

Advanced validation with accessibility and quality checks.

```bash
npm run theme-validator <command> <theme-path>
```

**Commands:**
- `validate` - Run all validation rules
- `report` - Generate detailed markdown report

**Validation Rules:**

| Rule | Severity | Description |
|------|----------|-------------|
| CSS Syntax | Error | Basic CSS syntax validation |
| Naming Convention | Error | Validates `--cds-*` naming |
| Required Tokens | Warning | Checks for essential token categories |
| Color Accessibility | Error | WCAG contrast ratio validation |
| Token Completeness | Warning | Validates complete token scales |
| Value Validity | Error | Ensures all CSS values are valid |
| Semantic Consistency | Warning | Checks semantic token relationships |
| Scale Relationships | Info | Validates mathematical progressions |

**Examples:**
```bash
# Validate Nike theme
npm run theme-validator validate ./design-tokens/nike/tokens.css

# Generate detailed validation report
npm run theme-validator report ./design-tokens/nike/tokens.css
```

### AgentRPC Server

API service for theme operations, perfect for integration with external tools.

```bash
npm run agentrpc
```

**Available Endpoints:**

| Endpoint | Parameters | Description |
|----------|------------|-------------|
| `generateTheme` | `name, url, description?` | Generate new theme |
| `extractCssFromUrl` | `url` | Extract and analyze CSS |
| `listThemes` | `{}` | Get all available themes |
| `activateTheme` | `name` | Activate theme in Storybook |
| `validateTheme` | `name` | Validate theme integrity |
| `generateThemePreview` | `name` | Create HTML preview |
| `healthCheck` | `{}` | Service health status |

## Advanced Features

### AI-Powered Token Mapping

The system uses sophisticated AI prompts to create intelligent theme mappings:

- **Brand Context Analysis** - Understands brand personality and industry
- **Semantic Color Mapping** - Maps colors by meaning, not just appearance
- **Accessibility First** - Ensures WCAG compliance in all mappings
- **Mathematical Relationships** - Creates logical scales and progressions
- **Completeness Validation** - Fills gaps with brand-appropriate values

### Design Token Architecture

All themes follow the cre8 Design System token structure:

```css
:root {
  /* Colors - Semantic naming */
  --cds-color-primary: #1a73e8;
  --cds-color-secondary: #5f6368;
  --cds-color-success: #34a853;
  --cds-color-danger: #ea4335;
  --cds-color-warning: #fbbc04;
  --cds-color-info: #4285f4;
  
  /* Typography */
  --cds-font-size-xs: 0.75rem;
  --cds-font-size-sm: 0.875rem;
  --cds-font-size-md: 1rem;
  --cds-font-size-lg: 1.25rem;
  --cds-font-size-xl: 1.5rem;
  
  /* Spacing - Mathematical progression */
  --cds-space-xs: 0.25rem;
  --cds-space-sm: 0.5rem;
  --cds-space-md: 1rem;
  --cds-space-lg: 1.5rem;
  --cds-space-xl: 3rem;
  
  /* Border Radius */
  --cds-radius-none: 0;
  --cds-radius-sm: 0.25rem;
  --cds-radius-md: 0.5rem;
  --cds-radius-lg: 1rem;
  --cds-radius-full: 9999px;
  
  /* Shadows */
  --cds-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --cds-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --cds-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

### Quality Assurance

Every generated theme undergoes:

1. **Syntax Validation** - Ensures valid CSS
2. **Accessibility Testing** - WCAG compliance checking
3. **Completeness Verification** - All required tokens present
4. **Semantic Consistency** - Logical token relationships
5. **Brand Accuracy** - Reflects source brand personality

## Integration with Storybook

Generated themes are automatically integrated with Storybook through the theme manager:

1. **Automatic Import** - CSS files are imported with proper loaders
2. **Theme Switching** - Available in Storybook theme selector
3. **Live Preview** - See components with new themes instantly
4. **Hot Reload** - Changes reflect immediately during development

## File Structure

```
design-tokens/
├── nike/
│   ├── tokens.css          # Main theme file
│   ├── theme.json          # Metadata
│   ├── preview.html        # HTML preview
│   └── validation-report.md # Validation results
├── spotify/
│   └── ...
└── starbucks/
    └── ...

cli/
├── theme-generator.ts      # Main generation logic
├── theme-manager.ts        # Theme lifecycle management  
├── theme-validator.ts      # Validation and quality checks
├── agentric-server.ts      # API service
└── ai-prompts.ts          # Advanced AI prompt engine
```

## Best Practices

### Theme Generation

1. **Choose Representative URLs** - Use main brand pages, not subpages
2. **Provide Context** - Include meaningful descriptions for better AI mapping
3. **Validate Early** - Run validation immediately after generation
4. **Test Accessibility** - Ensure themes meet contrast requirements
5. **Preview Before Activation** - Use HTML previews to verify appearance

### Theme Management

1. **Use Semantic Names** - Choose clear, descriptive theme names
2. **Document Purpose** - Include descriptions for team understanding
3. **Version Control** - Track theme changes over time
4. **Regular Validation** - Periodically re-validate themes
5. **Clean Up Unused** - Remove themes that are no longer needed

### Development Workflow

1. **Generate** → Create theme from brand URL
2. **Validate** → Check quality and accessibility
3. **Preview** → Review visual appearance
4. **Activate** → Add to Storybook for testing
5. **Iterate** → Refine based on feedback
6. **Deploy** → Use in production applications

## Troubleshooting

### Common Issues

**Theme generation fails:**
- Check OPENAI_API_KEY is set correctly
- Verify URL is accessible and loads CSS
- Try a different URL (main page vs subpage)

**Validation errors:**
- Review generated CSS syntax
- Check for missing required tokens
- Verify color contrast ratios

**Storybook integration issues:**
- Restart Storybook after activating themes
- Check console for import errors
- Verify file paths in preview.js

**CSS extraction problems:**
- Some sites block headless browsers
- Try different user agents or viewport sizes
- Check if site requires JavaScript to load styles

### Support

For additional help:
1. Check validation reports for specific issues
2. Use the health check endpoint to verify service status
3. Review generated theme metadata for context
4. Consult the AI prompts for understanding mapping logic

## Extending the System

### Adding Custom Validation Rules

Add new rules to `ThemeValidator`:

```typescript
{
  name: 'custom-rule',
  description: 'Check for custom requirement',
  severity: 'warning',
  test: (css) => {
    // Your validation logic
    return { passed: true };
  }
}
```

### Enhancing AI Prompts

Modify `AIPromptEngine` to add:
- Brand-specific context
- Industry-specific guidelines  
- Custom token categories
- Accessibility requirements

### Adding New Token Categories

1. Update CSS naming conventions
2. Add validation rules
3. Enhance AI prompts
4. Update Storybook integration

This system provides a complete, production-ready solution for automated brand theme generation with comprehensive quality assurance and management capabilities.