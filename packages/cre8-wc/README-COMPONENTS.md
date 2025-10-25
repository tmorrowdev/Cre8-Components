# Cre8 Web Components - Standalone Usage Guide

This build system creates web components that can be imported individually or as a batch, with all dependencies bundled for standalone usage.

## Build System Overview

### 1. Individual Component Builds (`lib-components/`)
- **Command**: `npm run build-individual`
- **Output**: Each component gets its own directory with bundled dependencies
- **Format**: ES modules (`.js`) and UMD (`.umd.js`) 
- **Dependencies**: All dependencies (Lit, design tokens, icons) are bundled

### 2. CDN Batch Build (`lib-cdn/`)
- **Command**: `npm run build-cdn`
- **Output**: Single file with all components
- **Format**: UMD and ES modules
- **Usage**: One script tag imports all components

### 3. Standard Build (`lib/`)
- **Command**: `npm run build`
- **Output**: Individual components with externalized dependencies
- **Usage**: For bundler-based projects (webpack, vite, etc.)

## Individual Component Usage

### Basic HTML Usage

```html
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
</head>
<body>
    <!-- Use components as regular HTML elements -->
    <cre8-card>
        <h2>My Card</h2>
        <p>Card content here</p>
    </cre8-card>
    
    <cre8-button variant="primary">Click Me</cre8-button>

    <!-- Import the components you need -->
    <script type="module" src="./lib-components/card/components/card/card.js"></script>
    <script type="module" src="./lib-components/button/components/button/button.js"></script>
</body>
</html>
```

### Component Structure

Each component in `lib-components/` follows this structure:
```
lib-components/
├── component-name/
│   ├── components/component-name/component-name.js  # ES module
│   ├── components/component-name/component-name.umd.js  # UMD module  
│   ├── design-tokens/  # Bundled design tokens
│   └── icons/  # Bundled icons (if used)
```

### Available Components

Base components (required for other components):
- `cre8-element` - Base web component class
- `cre8-form-element` - Base form component class  
- `cre8-field` - Base field component class

UI components:
- `card` - Card container
- `button` - Button component
- `layout` - Page layout wrapper
- `layout-container` - Layout container
- `header` - Page header
- `footer` - Page footer
- `grid` - Grid layout
- `divider` - Visual divider
- And many more...

### Loading Dependencies

Some components depend on base components. Load base components first:

```html
<!-- Load base components first -->
<script type="module" src="./lib-components/cre8-element/components/cre8-element/cre8-element.js"></script>
<script type="module" src="./lib-components/cre8-form-element/components/cre8-form-element/cre8-form-element.js"></script>

<!-- Then load specific components -->
<script type="module" src="./lib-components/button/components/button/button.js"></script>
```

## CDN Batch Usage

For loading all components at once:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My App</title>
</head>
<body>
    <!-- Use any component -->
    <cre8-card>
        <cre8-button>Click Me</cre8-button>
    </cre8-card>

    <!-- Single import for all components -->
    <script type="module" src="./lib-cdn/cre8-components.js"></script>
    
    <!-- Or UMD for older browsers -->
    <script src="./lib-cdn/cre8-components.umd.js"></script>
    <script>
        // Components available under Cre8Components global
        console.log(window.Cre8Components);
    </script>
</body>
</html>
```

## Benefits of This Build System

1. **No External Dependencies**: All components include bundled dependencies
2. **Framework Agnostic**: Works in any HTML page, no build system required
3. **Flexible Loading**: Load individual components or entire library
4. **Native Web Standards**: Uses standard Web Components APIs
5. **Tree Shakeable**: Only load the components you use
6. **CDN Ready**: Can be served from any CDN or static file server

## Browser Support

- Modern browsers with Web Components support
- ES2015+ for ES modules
- All browsers for UMD builds

## Testing

Open `test-standalone.html` in a browser to see the components in action and verify they work as native HTML elements.