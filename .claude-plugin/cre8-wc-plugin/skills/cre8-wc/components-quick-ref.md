# CRE8 Components Quick Reference

## Form Components

### cre8-button
```html
<cre8-button
  text="Button Text"
  variant="primary|secondary|tertiary"
  size="sm|md|lg"
  ?disabled=${false}
  ?loading=${false}
  ?fullWidth=${false}
  type="button|submit|reset">
</cre8-button>
```

### cre8-field (Text Input)
```html
<cre8-field
  label="Field Label"
  type="text|email|password|tel|number"
  placeholder="Placeholder text"
  value=""
  ?required=${true}
  ?disabled=${false}
  fieldNote="Helper text"
  errorNote="Error message">
</cre8-field>
```

### cre8-select
```html
<cre8-select label="Choose option" placeholder="Select...">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</cre8-select>
```

### cre8-checkbox-field
```html
<cre8-checkbox-field label="Options">
  <cre8-checkbox-field-item label="Option A" value="a"></cre8-checkbox-field-item>
  <cre8-checkbox-field-item label="Option B" value="b"></cre8-checkbox-field-item>
</cre8-checkbox-field>
```

### cre8-radio-field
```html
<cre8-radio-field label="Select one" name="group">
  <cre8-radio-field-item label="Choice A" value="a"></cre8-radio-field-item>
  <cre8-radio-field-item label="Choice B" value="b"></cre8-radio-field-item>
</cre8-radio-field>
```

### cre8-date-picker
```html
<cre8-date-picker
  label="Select date"
  value="2024-01-15"
  min="2024-01-01"
  max="2024-12-31">
</cre8-date-picker>
```

## Layout Components

### cre8-grid
```html
<cre8-grid columns="3" gap="md">
  <cre8-grid-item span="2">Wide item</cre8-grid-item>
  <cre8-grid-item>Normal item</cre8-grid-item>
</cre8-grid>
```

### cre8-layout
```html
<cre8-layout>
  <cre8-header slot="header">...</cre8-header>
  <cre8-main>Content</cre8-main>
  <cre8-footer slot="footer">...</cre8-footer>
</cre8-layout>
```

### cre8-section
```html
<cre8-section>
  <cre8-heading slot="header" type="display">Section Title</cre8-heading>
  <p>Section content</p>
</cre8-section>
```

## Data Display

### cre8-card
```html
<cre8-card variant="bare|horizontal">
  <div slot="header">Header content</div>
  <p>Body content (default slot)</p>
  <div slot="footer">Footer content</div>
</cre8-card>
```

### cre8-table
```html
<cre8-table>
  <cre8-table-header>
    <cre8-table-row>
      <cre8-table-header-cell>Name</cre8-table-header-cell>
      <cre8-table-header-cell>Value</cre8-table-header-cell>
    </cre8-table-row>
  </cre8-table-header>
  <cre8-table-body>
    <cre8-table-row>
      <cre8-table-cell>Item 1</cre8-table-cell>
      <cre8-table-cell>$100</cre8-table-cell>
    </cre8-table-row>
  </cre8-table-body>
</cre8-table>
```

### cre8-badge
```html
<cre8-badge text="New" variant="success|warning|error|info"></cre8-badge>
```

### cre8-tag
```html
<cre8-tag text="Category"></cre8-tag>
<cre8-tag-list>
  <cre8-tag text="Tag 1"></cre8-tag>
  <cre8-tag text="Tag 2"></cre8-tag>
</cre8-tag-list>
```

## Navigation

### cre8-tabs
```html
<cre8-tabs>
  <cre8-tab label="Tab 1" ?isActive=${true}>
    <cre8-tab-panel>Tab 1 content</cre8-tab-panel>
  </cre8-tab>
  <cre8-tab label="Tab 2">
    <cre8-tab-panel>Tab 2 content</cre8-tab-panel>
  </cre8-tab>
</cre8-tabs>
```

### cre8-breadcrumbs
```html
<cre8-breadcrumbs>
  <cre8-breadcrumbs-item href="/">Home</cre8-breadcrumbs-item>
  <cre8-breadcrumbs-item href="/products">Products</cre8-breadcrumbs-item>
  <cre8-breadcrumbs-item>Current Page</cre8-breadcrumbs-item>
</cre8-breadcrumbs>
```

### cre8-pagination
```html
<cre8-pagination
  currentPage="1"
  totalPages="10"
  @page-change=${handlePageChange}>
</cre8-pagination>
```

## Feedback

### cre8-modal
```html
<cre8-modal
  ?isActive=${showModal}
  ariaLabel="Dialog title"
  status="error|warning|success|info|help"
  ?notDismissible=${false}
  @close-modal=${handleClose}>
  <div slot="header"><cre8-heading>Title</cre8-heading></div>
  <p>Modal content</p>
  <div slot="footer">
    <cre8-button text="Close" @click=${close}></cre8-button>
  </div>
</cre8-modal>
```

### cre8-alert
```html
<cre8-alert
  status="error|warning|success|info"
  heading="Alert Title"
  ?dismissible=${true}>
  Alert message content
</cre8-alert>
```

### cre8-loading-spinner
```html
<cre8-loading-spinner size="small|medium|large"></cre8-loading-spinner>
```

### cre8-progress-meter
```html
<cre8-progress-meter value="75" max="100" label="Progress"></cre8-progress-meter>
```

### cre8-skeleton-loader
```html
<cre8-skeleton-loader variant="text|circle|rectangle" width="200px" height="20px">
</cre8-skeleton-loader>
```

## Overlay

### cre8-tooltip
```html
<cre8-tooltip text="Tooltip content">
  <cre8-button text="Hover me"></cre8-button>
</cre8-tooltip>
```

### cre8-popover
```html
<cre8-popover>
  <cre8-button slot="trigger" text="Click me"></cre8-button>
  <div slot="content">Popover content</div>
</cre8-popover>
```

### cre8-dropdown
```html
<cre8-dropdown label="Menu">
  <cre8-dropdown-item>Item 1</cre8-dropdown-item>
  <cre8-dropdown-item>Item 2</cre8-dropdown-item>
</cre8-dropdown>
```

## Typography

### cre8-heading
```html
<cre8-heading type="display|title-large|title-medium|title-small">
  Heading Text
</cre8-heading>
```

### cre8-text-passage
```html
<cre8-text-passage size="sm|md|lg">
  <p>Paragraph text with proper typography styling.</p>
</cre8-text-passage>
```

### cre8-text-link
```html
<cre8-text-link href="/page" ?external=${false}>Link Text</cre8-text-link>
```

## Icons

### cre8-icon
```html
<cre8-icon
  svg="${svgString}"
  size="sm|md|lg"
  rotate="0|90|180|270"
  flip="horizontal|vertical">
</cre8-icon>
```

Import SVG icons:
```typescript
import svgCheck from '@cre8_dev/cre8-wc/icons/System/Filled/Check.svg?raw';
```
