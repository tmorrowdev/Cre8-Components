# Marketing Dashboard - JSON-Driven UI Design

## Overview

A vanilla JavaScript marketing dashboard at `apps/marketing-dashboard/` that renders all UI dynamically from JSON configuration using the cre8 web components library.

## Goals

- **JSON-driven rendering**: All UI defined in JSON, rendered at runtime
- **No build step**: Pure vanilla JS with ES modules
- **Comprehensive dashboard**: Four tabs covering all marketing metrics
- **Static data**: Mock data embedded in JSON config files

## Project Structure

```
apps/marketing-dashboard/
├── index.html              # Entry point, loads CDN bundle
├── css/
│   └── dashboard.css       # Custom dashboard styles
├── js/
│   ├── renderer.js         # JSON-to-WebComponent renderer engine
│   ├── app.js              # Main app initialization
│   └── utils.js            # Helper functions (formatting, etc.)
├── config/
│   ├── dashboard.json      # Main layout config (header, tabs, structure)
│   ├── tabs/
│   │   ├── campaigns.json  # Campaign Analytics tab config + data
│   │   ├── social.json     # Social Media tab config + data
│   │   ├── traffic.json    # Website Traffic tab config + data
│   │   └── revenue.json    # Revenue/Sales tab config + data
│   └── theme.json          # Color/styling overrides (optional)
```

## JSON Schema for UI Definition

Components are defined using this JSON structure:

```json
{
  "component": "cre8-card",
  "props": {
    "variant": "bare"
  },
  "slots": {
    "header": {
      "component": "cre8-heading",
      "props": { "level": 2 },
      "content": "Campaign Performance"
    },
    "default": [
      {
        "component": "cre8-chart",
        "props": {
          "type": "bar",
          "height": 300,
          "data": {
            "labels": ["Jan", "Feb", "Mar"],
            "datasets": [{ "label": "Clicks", "data": [1200, 1900, 3000] }]
          }
        }
      }
    ]
  }
}
```

### Schema Properties

| Property | Type | Description |
|----------|------|-------------|
| `component` | string | The cre8 web component tag name |
| `props` | object | Attributes/properties to set on the element |
| `slots` | object | Named slots map to children (`default` = unnamed slot) |
| `content` | string | Text content for leaf nodes |
| `children` | array | Alternative to slots for simple nesting |
| `$ref` | string | Reference to external JSON file to load |

## Dashboard Layout

Main `dashboard.json` structure:

```json
{
  "component": "cre8-layout",
  "children": [
    {
      "component": "cre8-header",
      "slots": {
        "default": {
          "component": "cre8-heading",
          "props": { "level": 1 },
          "content": "Marketing Dashboard"
        }
      }
    },
    {
      "component": "cre8-tabs",
      "props": { "id": "dashboard-tabs" },
      "children": [
        { "component": "cre8-tab", "props": { "selected": true }, "content": "Campaigns" },
        { "component": "cre8-tab", "content": "Social Media" },
        { "component": "cre8-tab", "content": "Traffic" },
        { "component": "cre8-tab", "content": "Revenue" }
      ]
    },
    {
      "component": "cre8-tab-panel",
      "props": { "selected": true },
      "slots": { "default": { "$ref": "tabs/campaigns.json" } }
    },
    { "component": "cre8-tab-panel", "slots": { "default": { "$ref": "tabs/social.json" } } },
    { "component": "cre8-tab-panel", "slots": { "default": { "$ref": "tabs/traffic.json" } } },
    { "component": "cre8-tab-panel", "slots": { "default": { "$ref": "tabs/revenue.json" } } }
  ]
}
```

## Tab Content

### Widget Layout Pattern

```
┌─────────┬─────────┬─────────┬─────────┐
│  KPI 1  │  KPI 2  │  KPI 3  │  KPI 4  │  (cre8-grid with cards)
├─────────┴─────────┼─────────┴─────────┤
│   Main Chart      │   Secondary Chart │  (cre8-grid 2 columns)
├───────────────────┴───────────────────┤
│              Data Table               │  (cre8-table)
└───────────────────────────────────────┘
```

### Campaigns Tab
- **KPI Cards**: Total Spend, Impressions, Clicks, Conversions, CTR, CPA
- **Charts**: Campaign performance bar chart, CTR trend line chart, spend by channel doughnut

### Social Media Tab
- **KPI Cards**: Total Followers, Engagement Rate, Total Reach, Posts Published
- **Charts**: Followers growth line chart, engagement by platform bar chart, reach breakdown pie

### Traffic Tab
- **KPI Cards**: Visitors, Page Views, Bounce Rate, Avg Session Duration
- **Charts**: Daily visitors line chart, traffic sources doughnut, top pages table

### Revenue Tab
- **KPI Cards**: Total Revenue, Orders, AOV, Conversion Rate
- **Charts**: Revenue trend line chart, sales by category bar chart, funnel visualization

## Renderer Implementation

### Core Functions

```javascript
// Main entry point
async function render(config, container) {
  const node = await resolveRefs(config);  // Load $ref files
  const element = createElement(node);
  container.appendChild(element);
  return element;
}

// Recursive element creation
function createElement(node) {
  if (typeof node === 'string') return document.createTextNode(node);
  if (Array.isArray(node)) return node.map(createElement);

  const el = document.createElement(node.component);

  // Set props (attributes & properties)
  setProps(el, node.props);

  // Handle slots
  if (node.slots) {
    for (const [slotName, slotContent] of Object.entries(node.slots)) {
      const children = createElement(slotContent);
      assignSlot(el, slotName, children);
    }
  }

  // Handle children (default slot shorthand)
  if (node.children) {
    node.children.forEach(child => el.appendChild(createElement(child)));
  }

  // Handle text content
  if (node.content) el.textContent = node.content;

  return el;
}
```

### Key Behaviors

- `$ref` loads external JSON files asynchronously
- Props with objects/arrays set as JS properties (not attributes)
- Slot assignment handles both named and default slots
- Error boundary catches invalid component names gracefully

## Components Used

From cre8 web components library:

- **Layout**: `cre8-layout`, `cre8-header`, `cre8-grid`, `cre8-grid-item`, `cre8-card`
- **Navigation**: `cre8-tabs`, `cre8-tab`, `cre8-tab-panel`
- **Typography**: `cre8-heading`, `cre8-text-passage`
- **Data**: `cre8-chart`, `cre8-table`, `cre8-table-header`, `cre8-table-body`, `cre8-table-row`, `cre8-table-cell`
- **Feedback**: `cre8-badge`, `cre8-progress-meter`

## Implementation Steps

1. Create project directory structure
2. Build `renderer.js` - the JSON-to-component engine
3. Create `index.html` with CDN imports
4. Build `dashboard.json` - main layout
5. Build tab JSON files with mock data
6. Add `dashboard.css` for custom styling
7. Create `app.js` to initialize and wire up tab switching
8. Test and refine
