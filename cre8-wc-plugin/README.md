# CRE8 Web Components - Claude Code Plugin

A Claude Code plugin that provides documentation and guidance for using the **@cre8_dev/cre8-wc** web components library.

## Features

- Component API documentation for 85+ UI components
- Installation guides for npm, pnpm, and GitHub
- Framework integration (React, Next.js, Angular, Vite)
- Copy-paste component examples
- Theming and design token guidance

## Installation

### Option 1: Install from Marketplace (Recommended)

```bash
# Add the CRE8 marketplace
/plugin marketplace add tmorrowdev/Cre8-Components

# Install the plugin
/plugin install cre8-wc@cre8-components
```

### Option 2: Direct Install from GitHub

```bash
/plugin install github:tmorrowdev/Cre8-Components/cre8-wc-plugin
```

### Option 3: Install from Local Directory

```bash
# Clone the repository
git clone https://github.com/tmorrowdev/Cre8-Components.git

# Install the plugin
/plugin install ./Cre8-Components/cre8-wc-plugin
```

## Usage

Once installed, Claude will automatically use this skill when you:

- Ask about cre8 web components
- Need to install `@cre8_dev/cre8-wc`
- Want component usage examples
- Need help with theming or design tokens

### Example Prompts

```
"How do I install cre8 web components?"
"Show me how to use cre8-button"
"What form components are available in cre8?"
"How do I create a modal with cre8-modal?"
"How do I theme cre8 components?"
```

## Plugin Structure

```
cre8-wc-plugin/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── skills/
│   └── cre8-wc/
│       ├── SKILL.md         # Main skill file
│       ├── installation.md  # Detailed install guide
│       └── components-quick-ref.md  # Component examples
└── README.md
```

## Component Categories

| Category | Components |
|----------|------------|
| Form | button, checkbox-field, radio-field, select, field, date-picker |
| Layout | grid, layout, section, band, linelength-container |
| Navigation | tabs, breadcrumbs, pagination, primary-nav, global-nav |
| Feedback | alert, modal, loading-spinner, progress-meter |
| Data Display | card, table, badge, tag, icon, list |
| Overlay | modal, popover, tooltip, dropdown |

## Quick Start

```bash
# Install the component library
pnpm add @cre8_dev/cre8-wc

# Use in your project
```

```html
<script type="module">
  import '@cre8_dev/cre8-wc/components/button/button.js';
</script>

<cre8-button text="Click me" variant="primary"></cre8-button>
```

## Resources

- [CRE8 Components Repository](https://github.com/tmorrowdev/Cre8-Components)
- [npm Package](https://www.npmjs.com/package/@cre8_dev/cre8-wc)

## License

BSD-3-Clause
