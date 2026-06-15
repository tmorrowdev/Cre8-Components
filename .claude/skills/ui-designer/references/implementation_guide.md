# Implementation Guide for Claude Opus 4.5

This guide explains how to implement Gemini-generated UI designs.

## Workflow Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  User Request   │ ──► │  Gemini 3 Pro   │ ──► │  Claude Opus    │
│  "Design X UI"  │     │  Generates JSON │     │  Implements UI  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Reading the Design Spec

### 1. Meta Section
Understand the overall design intent:
```json
{
  "meta": {
    "title": "What we're building",
    "framework": "Target tech stack",
    "style": "Visual design direction"
  }
}
```

### 2. Layout Section
Interpret the grid/flex structure:
- `type: "grid"` → Use CSS Grid or Tailwind grid utilities
- `type: "flex"` → Use Flexbox or Tailwind flex utilities
- `areas` → Map to React component structure or HTML sections

### 3. Components Array
Each component maps to a React component or HTML element:

```json
{
  "name": "MetricCard",          // Component name (PascalCase for React)
  "type": "card",                // Semantic type
  "area": "main",                // Layout placement
  "props": {},                   // Component props
  "children": [],                // Nested content
  "styling": {
    "className": "..."           // Tailwind classes
  },
  "state": {},                   // useState hooks needed
  "events": {}                   // Event handlers needed
}
```

### 4. Color Scheme
Convert to CSS custom properties or Tailwind config:

```css
:root {
  --color-primary: #3b82f6;
  --color-background: #0f172a;
  /* etc */
}
```

Or extend tailwind.config.js:
```js
colors: {
  primary: '#3b82f6',
  background: '#0f172a'
}
```

## Implementation Patterns

### Pattern A: Single Artifact (Simple UIs)
For UIs with < 5 components, create a single React artifact:

```jsx
// All components in one file
function MetricCard({ value, label }) { ... }
function Chart({ data }) { ... }

export default function Dashboard() {
  return (
    <div className="...">
      <MetricCard />
      <Chart />
    </div>
  );
}
```

### Pattern B: Multi-File (Complex UIs)
For UIs with 5+ components, create separate files:

```
/components
  /MetricCard.jsx
  /Chart.jsx
  /Sidebar.jsx
/App.jsx
/styles.css
```

### Pattern C: HTML Artifact
For vanilla HTML output:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Generated CSS from colorScheme/typography */
  </style>
</head>
<body>
  <!-- Generated structure from layout/components -->
</body>
</html>
```

## Handling Common Design Elements

### Cards
```jsx
// From spec: { "type": "card", "styling": { "className": "bg-white rounded-lg shadow-md p-4" } }
<div className="bg-white rounded-lg shadow-md p-4">
  {/* Card content */}
</div>
```

### Charts
Use Recharts (available in artifacts):
```jsx
import { LineChart, Line, XAxis, YAxis } from 'recharts';

// From spec: { "type": "chart", "props": { "chartType": "line", "data": [...] } }
<LineChart data={data}>
  <Line dataKey="value" stroke={colorScheme.primary} />
  <XAxis />
  <YAxis />
</LineChart>
```

### Forms
```jsx
// From spec: { "type": "form", "children": [{ "type": "input", ... }] }
<form onSubmit={handleSubmit}>
  <input 
    className={spec.styling.className}
    onChange={handleChange}
  />
</form>
```

### Navigation
```jsx
// From spec: { "type": "nav", "children": [...menu items] }
<nav className="...">
  {menuItems.map(item => (
    <a href={item.href} className="...">{item.label}</a>
  ))}
</nav>
```

## State Management Translation

When Gemini specifies state:
```json
{
  "state": {
    "isOpen": "Controls modal visibility",
    "selectedItem": "Currently selected list item",
    "formData": "Form field values"
  }
}
```

Translate to React hooks:
```jsx
const [isOpen, setIsOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const [formData, setFormData] = useState({});
```

## Interaction Translation

When Gemini specifies interactions:
```json
{
  "interactions": [
    {
      "trigger": "click",
      "target": "SubmitButton",
      "action": "Submit form and show success toast",
      "animation": "Button pulse on hover"
    }
  ]
}
```

Implement as:
```jsx
const handleSubmit = async () => {
  await submitForm(formData);
  toast.success("Submitted!");
};

<button 
  onClick={handleSubmit}
  className="... hover:animate-pulse"
>
  Submit
</button>
```

## Quality Checklist

Before finalizing implementation:

- [ ] All components from spec are implemented
- [ ] Color scheme applied correctly
- [ ] Typography matches spec
- [ ] Responsive breakpoints work
- [ ] Interactions are functional
- [ ] Accessibility attributes added (aria-labels, etc.)
- [ ] Placeholder content replaced or realistic
- [ ] No console errors
- [ ] Renders correctly in artifact preview

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Missing icons | Use lucide-react icons |
| Chart not rendering | Ensure Recharts imported correctly |
| Styling conflicts | Check Tailwind class order |
| State not updating | Verify useState/setter usage |
| Layout broken on mobile | Check responsive classes |
