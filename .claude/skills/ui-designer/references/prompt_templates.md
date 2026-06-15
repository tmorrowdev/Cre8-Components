# Prompt Templates for Gemini UI Designer

Customize these prompts when calling the Gemini 3 Pro API for specific UI needs.

## Core Design Prompts

### Dashboard Design
```
Design a {industry} dashboard with:
- Key metrics overview with {metric_types}
- Interactive charts for {data_visualizations}
- Recent activity feed
- Quick action buttons for {primary_actions}
- Navigation sidebar with {sections}
```

### Landing Page
```
Design a landing page for {product/service} that:
- Hero section with {headline_focus}
- Social proof section (testimonials/logos)
- Feature showcase with {num_features} key features
- Pricing comparison (if applicable)
- Call-to-action for {conversion_goal}
- Footer with {footer_sections}
```

### Form/Wizard
```
Design a multi-step {form_type} form with:
- Step 1: {step1_fields}
- Step 2: {step2_fields}
- Step 3: Review & confirm
- Progress indicator
- Validation feedback
- Success/error states
```

### Data Table
```
Design a data table interface for {data_type} with:
- Sortable columns: {column_names}
- Filter options: {filter_types}
- Bulk actions: {bulk_actions}
- Row expansion for details
- Pagination controls
- Export functionality
```

## Style Modifiers

Add these to any prompt to adjust the design:

### Glass Morphism
```
Use glass-morphism effects with:
- Frosted glass backgrounds (backdrop-blur)
- Subtle transparency
- Light borders
- Soft shadows
```

### Neumorphism
```
Use neumorphic design with:
- Soft UI shadows (inset and outset)
- Minimal color palette
- Rounded shapes
- Subtle depth
```

### Dark Mode First
```
Design for dark mode as primary with:
- Dark backgrounds (#0f0f0f to #1a1a1a range)
- High contrast text
- Glowing accents
- Reduced eye strain considerations
```

### Accessibility Focus
```
Ensure WCAG 2.1 AA compliance:
- 4.5:1 contrast ratio minimum
- Focus indicators on all interactive elements
- Screen reader friendly structure
- Keyboard navigation support
- No color-only information
```

## Component-Specific Prompts

### Navigation
```
Design a {nav_type} navigation with:
- Logo/brand placement
- {num_items} main navigation items
- {has_search ? "Search functionality" : ""}
- User menu with {user_actions}
- Mobile responsive behavior
- Active state indicators
```

### Card Grid
```
Design a card grid for {content_type} showing:
- Card image/thumbnail
- Title and subtitle
- Key metadata: {metadata_fields}
- Action buttons: {actions}
- Hover interactions
- Grid responsive breakpoints
```

### Chat Interface
```
Design a chat/messaging interface with:
- Message bubbles (sent/received styling)
- Timestamp display
- Read receipts
- Typing indicator
- Message input with {input_features}
- File attachment support
```

## Framework-Specific Notes

### React/Tailwind
- Use Tailwind utility classes in styling.className
- Design for shadcn/ui component compatibility
- Include useState/useEffect patterns in state definitions
- Use lucide-react icon names

### HTML/CSS
- Provide specific class names following BEM
- Include CSS custom properties for theming
- Define media query breakpoints explicitly
- Use semantic HTML elements

### Vue
- Design for Composition API patterns
- Include computed properties where applicable
- Use v-model patterns for form inputs
- Define emits for component events

### Svelte
- Use Svelte reactive declarations ($:)
- Include transition directives
- Define stores for shared state
- Use Svelte-specific event syntax
