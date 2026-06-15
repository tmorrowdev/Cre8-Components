---
name: lit-development
description: Use when building, testing, or publishing Lit web components. Covers component patterns, state management, styling, testing, and best practices.
---

# Lit Development Skill Guide

A comprehensive reference for building, testing, and publishing Lit web components effectively.

## Critical Rules for Lit Component Development

### 1. Always Extend LitElement

Every Lit component must extend LitElement and be registered with a custom element name:

```typescript
import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  // component implementation
}
```

### 2. Custom Element Naming Requirements

- Tag names MUST contain a hyphen (e.g., `my-element`, not `myelement`)
- Use lowercase letters and hyphens only
- Register with `@customElement()` decorator or `customElements.define()`

### 3. Class Fields and Reactive Properties (Critical)

**JavaScript:** NEVER use class fields for reactive properties. Initialize in constructor:

```javascript
// ❌ WRONG - breaks reactivity
static properties = { foo: { type: String } }
foo = 'Default';

// ✅ CORRECT
static properties = { foo: { type: String } }
constructor() {
  super();
  this.foo = 'Default';
}
```

**TypeScript:** Set `useDefineForClassFields: false` in tsconfig.json OR use `accessor` keyword:

```typescript
// Option 1: With useDefineForClassFields: false
@property() foo = 'Default';

// Option 2: With accessor keyword (standard decorators)
@property() accessor foo = 'Default';
```

### 4. Template Syntax Rules

- Use `html` tagged template literal for templates
- Attribute expressions: `<div class=${value}>`
- Boolean attributes: `<div ?hidden=${condition}>`
- Properties: `<input .value=${value}>`
- Events: `<button @click=${handler}>`
- Element directives: `<div ${ref(myRef)}>`

### 5. Development vs Production Builds

Always opt into development builds during development for better warnings:

```javascript
// rollup.config.js
nodeResolve({ exportConditions: ['development'] })
```

---

## Component Structure Template (TypeScript)

```typescript
import {LitElement, html, css, PropertyValues} from 'lit';
import {customElement, property, state, query} from 'lit/decorators.js';

@customElement('my-component')
export class MyComponent extends LitElement {
  // Scoped styles using css tagged template
  static styles = css`
    :host {
      display: block;
      --my-color: blue;
    }
    :host([hidden]) { display: none; }
    .container { color: var(--my-color); }
  `;

  // Public reactive properties (part of component API)
  @property({type: String}) name = 'World';
  @property({type: Number}) count = 0;
  @property({type: Boolean, reflect: true}) active = false;
  @property({attribute: 'my-attr'}) myAttr = '';
  @property({attribute: false}) complexData = {};

  // Internal reactive state (not part of public API)
  @state() private _internalValue = '';

  // Query decorators for DOM access
  @query('#input') private _input!: HTMLInputElement;

  // Lifecycle callbacks
  connectedCallback() {
    super.connectedCallback();
    // Setup: add external event listeners
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Cleanup: remove external event listeners
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    // Compute derived values before render
    if (changedProperties.has('name')) {
      this._internalValue = this.name.toUpperCase();
    }
  }

  updated(changedProperties: PropertyValues<this>) {
    // Perform post-render DOM operations
    if (changedProperties.has('active')) {
      this.dispatchEvent(new CustomEvent('active-changed', {
        detail: { active: this.active },
        bubbles: true,
        composed: true
      }));
    }
  }

  // Template rendering
  render() {
    return html`
      <div class="container">
        <h1>Hello, ${this.name}!</h1>
        <input id="input" .value=${this._internalValue}>
        <button @click=${this._handleClick}>Click</button>
        <slot></slot>
      </div>
    `;
  }

  // Event handlers (auto-bound when using @ syntax)
  private _handleClick(e: Event) {
    this.count++;
    this.dispatchEvent(new CustomEvent('count-changed'));
  }
}

// TypeScript type declarations for better inference
declare global {
  interface HTMLElementTagNameMap {
    'my-component': MyComponent;
  }
}
```

---

## Property Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `attribute` | `boolean \| string` | `true` | Maps to attribute; string sets custom name |
| `type` | `String \| Number \| Boolean \| Array \| Object` | - | Converter for attribute/property |
| `reflect` | `boolean` | `false` | Reflects property value back to attribute |
| `state` | `boolean` | `false` | Marks as internal state (no attribute) |
| `hasChanged` | `(newVal, oldVal) => boolean` | strict inequality | Custom change detection function |
| `noAccessor` | `boolean` | `false` | Prevents Lit from generating accessor |
| `converter` | `object \| function` | default converter | Custom attribute converter |
| `useDefault` | `boolean` | `false` | Prevents initial reflection, resets on attribute removal |

### Attribute Conversion (Default Converter)

**From Attribute to Property:**

| Type | Conversion |
|------|------------|
| String | Direct string value |
| Number | `Number(attributeValue)` |
| Boolean | Presence = true, absence = false |
| Object/Array | `JSON.parse(attributeValue)` |

**From Property to Attribute:**

| Type | Conversion |
|------|------------|
| String/Number | String value; null/undefined removes attribute |
| Boolean | Truthy = empty string; falsy = remove attribute |
| Object/Array | `JSON.stringify()`; null/undefined removes attribute |

---

## Template Expression Types Reference

| Type | Syntax | Example | Notes |
|------|--------|---------|-------|
| Child content | `${expr}` | `html\`<p>${name}</p>\`` | Strings, numbers, templates, arrays, DOM nodes |
| Attribute | `attr=${expr}` | `html\`<div class=${cls}>\`` | Converts to string |
| Boolean attribute | `?attr=${expr}` | `html\`<div ?hidden=${hide}>\`` | Add/remove based on truthiness |
| Property | `.prop=${expr}` | `html\`<input .value=${val}>\`` | Sets JS property directly |
| Event listener | `@event=${handler}` | `html\`<button @click=${fn}>\`` | Auto-binds to component |
| Element directive | `${directive()}` | `html\`<div ${ref(r)}>\`` | Must be a directive |

### Sentinel Values

- `nothing` - Renders nothing, removes child content
- `noChange` - Preserves existing value (used in directives)

### Removing Attributes Conditionally

```typescript
// Using nothing sentinel
html`<img src="/images/${this.path ?? nothing}">`

// Using ifDefined directive
import {ifDefined} from 'lit/directives/if-defined.js';
html`<img src=${ifDefined(this.src)}>`
```

---

## Complete Lifecycle Methods Documentation

### Standard Custom Element Lifecycle

| Method | When Called | Super Required | Use Case |
|--------|-------------|----------------|----------|
| `constructor()` | Element created/upgraded | Yes | One-time initialization, set default property values |
| `connectedCallback()` | Added to DOM | Yes | Add external event listeners, start timers |
| `disconnectedCallback()` | Removed from DOM | Yes | Remove external listeners, cleanup |
| `attributeChangedCallback()` | Observed attribute changes | Rarely needed | Handled automatically by Lit |
| `adoptedCallback()` | Moved to new document | No | Advanced use cases only |

### Reactive Update Cycle

| Method | Triggers Update? | Called on Server? | Purpose |
|--------|------------------|-------------------|---------|
| `requestUpdate()` | Yes (schedules) | No | Manually request update |
| `shouldUpdate(changedProps)` | No | No | Return false to skip update |
| `willUpdate(changedProps)` | No | Yes | Compute derived values before render |
| `update(changedProps)` | No | No | Reflects attributes, calls render() |
| `render()` | No | Yes | Return template for component |
| `firstUpdated(changedProps)` | Yes | No | One-time post-render setup |
| `updated(changedProps)` | Yes | No | React to DOM changes after render |

### Update Complete Promise

```typescript
// Wait for update to complete
await this.updateComplete;

// Custom async work before completing
async getUpdateComplete() {
  const result = await super.getUpdateComplete();
  await this._childElement.updateComplete;
  return result;
}
```

---

## Styling Patterns

### Static Styles (Recommended)

```typescript
static styles = css`
  :host {
    display: block;
    --primary-color: #3498db;
  }
  :host([theme="dark"]) {
    --primary-color: #2980b9;
  }
  :host(:hover) { opacity: 0.9; }

  .container {
    color: var(--primary-color);
    font-family: inherit;
  }
`;
```

### Multiple Style Sheets

```typescript
static styles = [
  sharedStyles,
  css`:host { display: block; }`
];
```

### Inheriting Superclass Styles

```typescript
static styles = [
  SuperClass.styles,
  css`:host { border: 1px solid; }`
];
```

### Dynamic Styles with Directives

```typescript
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';

render() {
  const classes = { active: this.active, disabled: this.disabled };
  const styles = { color: this.textColor, fontSize: `${this.size}px` };

  return html`
    <div class=${classMap(classes)} style=${styleMap(styles)}>
      Content
    </div>
  `;
}
```

### CSS Custom Properties for Theming

```typescript
// Component defines defaults
static styles = css`
  :host {
    background: var(--my-element-bg, white);
    color: var(--my-element-color, black);
  }
`;

// Consumer customizes via CSS:
// my-element { --my-element-bg: #f0f0f0; }
```

### Styling Slotted Content

```typescript
static styles = css`
  ::slotted(*) { margin: 8px; }
  ::slotted(p) { color: blue; }
  /* Only direct children can be styled with ::slotted() */
`;
```

### Safe Expression in Styles

```typescript
import {unsafeCSS} from 'lit';

// Only use with TRUSTED values
const trustedColor = 'blue';
static styles = css`div { color: ${unsafeCSS(trustedColor)}; }`;
```

---

## Built-in Directives Reference

| Directive | Import | Purpose | Usage |
|-----------|--------|---------|-------|
| `classMap` | `lit/directives/class-map.js` | Conditionally apply classes | `class=${classMap({active: true})}` |
| `styleMap` | `lit/directives/style-map.js` | Apply inline styles object | `style=${styleMap({color: 'red'})}` |
| `ifDefined` | `lit/directives/if-defined.js` | Remove attr if undefined | `attr=${ifDefined(val)}` |
| `repeat` | `lit/directives/repeat.js` | Efficient list rendering with keys | `${repeat(items, i => i.id, i => html`...`)}` |
| `cache` | `lit/directives/cache.js` | Cache DOM for conditionals | `${cache(show ? html`A` : html`B`)}` |
| `guard` | `lit/directives/guard.js` | Prevent re-render unless deps change | `${guard([dep], () => expensive())}` |
| `live` | `lit/directives/live.js` | Check live DOM value before update | `.value=${live(val)}` |
| `ref` | `lit/directives/ref.js` | Get reference to rendered element | `${ref(this.myRef)}` |
| `until` | `lit/directives/until.js` | Render placeholder until promise resolves | `${until(promise, html`Loading...`)}` |
| `asyncAppend` | `lit/directives/async-append.js` | Append async iterable values | `${asyncAppend(asyncGen)}` |
| `asyncReplace` | `lit/directives/async-replace.js` | Replace with async iterable values | `${asyncReplace(asyncGen)}` |
| `templateContent` | `lit/directives/template-content.js` | Render `<template>` content | `${templateContent(templateEl)}` |
| `unsafeHTML` | `lit/directives/unsafe-html.js` | Render string as HTML (use carefully) | `${unsafeHTML(htmlString)}` |
| `unsafeSVG` | `lit/directives/unsafe-svg.js` | Render string as SVG (use carefully) | `${unsafeSVG(svgString)}` |

---

## State Management Patterns

### Choosing a State Management Approach

| Approach | Use Case | Complexity |
|----------|----------|------------|
| Component state (`@state`) | Local UI state | Low |
| Properties down, events up | Parent-child communication | Low |
| Reactive Controllers | Reusable stateful logic | Medium |
| Context API | Dependency injection, theming | Medium |
| Signals | Shared global state | Medium |
| External stores (lit-store) | Complex app state, persistence | Medium-High |

### Reactive Controllers (Reusable Stateful Logic)

Controllers encapsulate state and behavior that can be shared across components:

```typescript
import {ReactiveController, ReactiveControllerHost} from 'lit';

// Generic async data controller
class AsyncDataController<T> implements ReactiveController {
  host: ReactiveControllerHost;

  value?: T;
  error?: Error;
  loading = false;

  private _fetchFn: () => Promise<T>;

  constructor(host: ReactiveControllerHost, fetchFn: () => Promise<T>) {
    this.host = host;
    this._fetchFn = fetchFn;
    host.addController(this);
  }

  hostConnected() {
    this.fetch();
  }

  async fetch() {
    this.loading = true;
    this.host.requestUpdate();

    try {
      this.value = await this._fetchFn();
      this.error = undefined;
    } catch (e) {
      this.error = e as Error;
    } finally {
      this.loading = false;
      this.host.requestUpdate();
    }
  }
}

// Usage in component
@customElement('user-profile')
class UserProfile extends LitElement {
  @property() userId!: string;

  private _user = new AsyncDataController(
    this,
    () => fetch(`/api/users/${this.userId}`).then(r => r.json())
  );

  render() {
    if (this._user.loading) return html`<loading-spinner></loading-spinner>`;
    if (this._user.error) return html`<error-message>${this._user.error.message}</error-message>`;
    return html`<div>Hello, ${this._user.value?.name}</div>`;
  }
}
```

#### Controller Lifecycle Methods

| Method | When Called | Use Case |
|--------|-------------|----------|
| `hostConnected()` | Host added to DOM | Setup, initial fetch |
| `hostDisconnected()` | Host removed from DOM | Cleanup, cancel requests |
| `hostUpdate()` | Before host render | Read DOM pre-update |
| `hostUpdated()` | After host render | Read DOM post-update |

### Context API (Dependency Injection)

Use `@lit/context` to pass data through the component tree without prop drilling:

```bash
npm install @lit/context
```

```typescript
// my-context.ts - Define the context
import {createContext} from '@lit/context';

export interface UserSession {
  userId: string;
  token: string;
  preferences: Record<string, unknown>;
}

export const userSessionContext = createContext<UserSession>('user-session');
```

```typescript
// app-shell.ts - Provide context at app root
import {LitElement, html} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {provide} from '@lit/context';
import {userSessionContext, UserSession} from './my-context.js';

@customElement('app-shell')
class AppShell extends LitElement {
  @provide({context: userSessionContext})
  @state()
  private _session: UserSession = {
    userId: '',
    token: '',
    preferences: {}
  };

  async connectedCallback() {
    super.connectedCallback();
    this._session = await this._loadSession();
  }

  render() {
    return html`
      <nav-bar></nav-bar>
      <main><slot></slot></main>
    `;
  }
}
```

```typescript
// user-menu.ts - Consume context anywhere in subtree
import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {consume} from '@lit/context';
import {userSessionContext, UserSession} from './my-context.js';

@customElement('user-menu')
class UserMenu extends LitElement {
  @consume({context: userSessionContext, subscribe: true})
  private _session?: UserSession;

  render() {
    if (!this._session?.userId) {
      return html`<a href="/login">Sign In</a>`;
    }
    return html`<span>User: ${this._session.userId}</span>`;
  }
}
```

#### Context API Options

| Option | Description |
|--------|-------------|
| `subscribe: true` | Re-render when context value changes |
| `subscribe: false` | Get initial value only (default) |

### Signals (Shared Global State)

Use `@lit-labs/signals` for fine-grained reactive shared state:

```bash
npm install @lit-labs/signals
```

```typescript
// store/app-state.ts - Define shared signals
import {signal, computed} from '@lit-labs/signals';

// Shared state accessible from any component
export const count = signal(0);
export const multiplier = signal(2);

// Computed values derived from signals
export const doubled = computed(() => count.get() * multiplier.get());

// Actions that modify state
export const increment = () => count.set(count.get() + 1);
export const decrement = () => count.set(count.get() - 1);
export const reset = () => count.set(0);
```

```typescript
// counter-display.ts - Use signals in components
import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher} from '@lit-labs/signals';
import {count, doubled, increment, decrement} from './store/app-state.js';

@customElement('counter-display')
class CounterDisplay extends SignalWatcher(LitElement) {
  render() {
    // Component auto-updates when signals change
    return html`
      <div>Count: ${count.get()}</div>
      <div>Doubled: ${doubled.get()}</div>
      <button @click=${decrement}>-</button>
      <button @click=${increment}>+</button>
    `;
  }
}
```

### External Store: lit-store

For complex applications needing selectors, persistence, and devtools:

```bash
npm install @frankchoongsaeng/lit-store
```

#### Basic Store Setup

```typescript
// store/app-store.ts
import {createStore} from '@frankchoongsaeng/lit-store/lib/store';

export interface AppState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  todos: Array<{id: string; text: string; completed: boolean}>;
  ui: {
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
  };
}

export const store = createStore<AppState>({
  user: null,
  todos: [],
  ui: {
    theme: 'light',
    sidebarOpen: true
  }
});

// Type-safe action creators
export const setUser = (user: AppState['user']) =>
  store.setState({user});

export const addTodo = (text: string) =>
  store.setState({
    todos: [...store.getState().todos, {
      id: crypto.randomUUID(),
      text,
      completed: false
    }]
  });

export const toggleTodo = (id: string) =>
  store.setState({
    todos: store.getState().todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    )
  });

export const setTheme = (theme: AppState['ui']['theme']) =>
  store.setState({
    ui: {...store.getState().ui, theme}
  });
```

#### Using StoreController in Components

```typescript
// components/todo-list.ts
import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {StoreController} from '@frankchoongsaeng/lit-store/lib/store-controller';
import {store, toggleTodo, addTodo, AppState} from '../store/app-store.js';

@customElement('todo-list')
class TodoList extends LitElement {
  // Subscribe to specific slice of state
  private _todos = new StoreController(
    this,
    store,
    (state: AppState) => state.todos
  );

  static styles = css`
    .completed { text-decoration: line-through; opacity: 0.6; }
  `;

  render() {
    return html`
      <ul>
        ${this._todos.value.map(todo => html`
          <li
            class=${todo.completed ? 'completed' : ''}
            @click=${() => toggleTodo(todo.id)}
          >
            ${todo.text}
          </li>
        `)}
      </ul>
      <input
        type="text"
        @keydown=${this._handleKeydown}
        placeholder="Add todo..."
      >
    `;
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      if (input.value.trim()) {
        addTodo(input.value.trim());
        input.value = '';
      }
    }
  }
}
```

#### State Persistence

```typescript
// store/app-store.ts
import {createStore} from '@frankchoongsaeng/lit-store/lib/store';
import {persist, localStorageAdapter} from '@frankchoongsaeng/lit-store/lib/persist';

export const store = createStore<AppState>({/* initial state */});

// Persist entire state
persist(store, {
  key: 'my-app-state',
  adapter: localStorageAdapter
});

// Or persist specific slices
persist(store, {
  key: 'my-app-ui',
  adapter: localStorageAdapter,
  select: (state) => state.ui  // Only persist UI preferences
});
```

#### Redux DevTools Integration

```typescript
import {withDevtools} from '@frankchoongsaeng/lit-store/devtools/redux';

// Enable Redux DevTools for debugging
withDevtools(store, 'my-app');
```

#### Custom Selectors with Equality Checks

```typescript
// Prevent unnecessary re-renders with custom equality
private _completedCount = new StoreController(
  this,
  store,
  (state: AppState) => state.todos.filter(t => t.completed).length,
  (prev, next) => prev === next  // Only update if count actually changes
);
```

### State Management Decision Guide

```
┌─────────────────────────────────────────────────────────────┐
│                    Where does state live?                    │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        Single component  Parent-child    Multiple unrelated
                                          components
              │               │               │
              ▼               ▼               ▼
         @state()        Properties &    ┌───┴───┐
                         Events          │       │
                                         ▼       ▼
                                    Near in   Far apart
                                    tree      in tree
                                         │       │
                                         ▼       ▼
                                    Context   Signals or
                                    API       lit-store

┌─────────────────────────────────────────────────────────────┐
│                   Additional requirements?                   │
└─────────────────────────────────────────────────────────────┘
                              │
    ┌─────────────┬───────────┼───────────┬─────────────┐
    ▼             ▼           ▼           ▼             ▼
Persistence  DevTools    Selectors   Time-travel   Middleware
    │             │           │           │             │
    └─────────────┴───────────┴───────────┴─────────────┘
                              │
                              ▼
                          lit-store
```

---

## Component Communication Patterns

### Parent to Child: Properties

```typescript
// parent-component.ts
@customElement('parent-component')
class ParentComponent extends LitElement {
  @state() private _data = {name: 'Test'};
  @state() private _count = 0;

  render() {
    return html`
      <child-component
        .data=${this._data}
        count=${this._count}
      ></child-component>
    `;
  }
}
```

### Child to Parent: Custom Events

```typescript
// child-component.ts
@customElement('child-component')
class ChildComponent extends LitElement {
  @property({type: Number}) count = 0;

  private _notifyChange() {
    this.dispatchEvent(new CustomEvent('count-changed', {
      detail: {count: this.count},
      bubbles: true,
      composed: true  // Crosses shadow DOM boundaries
    }));
  }

  render() {
    return html`
      <button @click=${() => { this.count++; this._notifyChange(); }}>
        Increment
      </button>
    `;
  }
}

// parent-component.ts
@customElement('parent-component')
class ParentComponent extends LitElement {
  @state() private _totalCount = 0;

  private _handleCountChange(e: CustomEvent<{count: number}>) {
    this._totalCount = e.detail.count;
  }

  render() {
    return html`
      <child-component
        @count-changed=${this._handleCountChange}
      ></child-component>
      <p>Total: ${this._totalCount}</p>
    `;
  }
}
```

### Sibling Communication

Use shared state (signals, context, or store) rather than event chains through parents:

```typescript
// shared-state.ts
import {signal} from '@lit-labs/signals';
export const selectedItemId = signal<string | null>(null);

// sibling-a.ts - Sets the selection
import {SignalWatcher} from '@lit-labs/signals';
import {selectedItemId} from './shared-state.js';

@customElement('sibling-a')
class SiblingA extends SignalWatcher(LitElement) {
  render() {
    return html`
      <ul>
        ${this.items.map(item => html`
          <li @click=${() => selectedItemId.set(item.id)}>${item.name}</li>
        `)}
      </ul>
    `;
  }
}

// sibling-b.ts - Reacts to selection
import {SignalWatcher} from '@lit-labs/signals';
import {selectedItemId} from './shared-state.js';

@customElement('sibling-b')
class SiblingB extends SignalWatcher(LitElement) {
  render() {
    const id = selectedItemId.get();
    return html`<div>Selected: ${id ?? 'None'}</div>`;
  }
}
```

---

## Async Data Patterns

### Basic Fetch with until Directive

```typescript
import {until} from 'lit/directives/until.js';

@customElement('user-card')
class UserCard extends LitElement {
  @property() userId!: string;

  private _fetchUser() {
    return fetch(`/api/users/${this.userId}`)
      .then(r => r.json());
  }

  render() {
    return html`
      ${until(
        this._fetchUser().then(user => html`<span>${user.name}</span>`),
        html`<loading-spinner></loading-spinner>`
      )}
    `;
  }
}
```

### Task Controller (Recommended)

```bash
npm install @lit/task
```

```typescript
import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {Task} from '@lit/task';

@customElement('user-card')
class UserCard extends LitElement {
  @property() userId!: string;

  private _userTask = new Task(this, {
    args: () => [this.userId] as const,
    task: async ([userId]) => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    }
  });

  render() {
    return this._userTask.render({
      pending: () => html`<loading-spinner></loading-spinner>`,
      complete: (user) => html`
        <div class="user-card">
          <h2>${user.name}</h2>
          <p>${user.email}</p>
        </div>
      `,
      error: (e) => html`<error-message>${e.message}</error-message>`
    });
  }
}
```

### Task with Dependencies

```typescript
@customElement('user-posts')
class UserPosts extends LitElement {
  @property() userId!: string;
  @state() private _page = 1;

  // Task re-runs when userId or _page changes
  private _postsTask = new Task(this, {
    args: () => [this.userId, this._page] as const,
    task: async ([userId, page]) => {
      const response = await fetch(`/api/users/${userId}/posts?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    }
  });

  render() {
    return html`
      ${this._postsTask.render({
        pending: () => html`<loading-spinner></loading-spinner>`,
        complete: (posts) => html`
          <ul>
            ${posts.map(post => html`<li>${post.title}</li>`)}
          </ul>
          <button @click=${() => this._page++}>Next Page</button>
        `,
        error: (e) => html`<error-message>${e.message}</error-message>`
      })}
    `;
  }
}
```

---

## Event Dispatching and Listening Patterns

### Declarative Event Listening

```typescript
render() {
  return html`
    <button @click=${this._handleClick}>Click</button>
    <input @input=${this._handleInput}>
    <form @submit=${this._handleSubmit}>
  `;
}

private _handleClick(e: MouseEvent) {
  // `this` is automatically bound to component
  console.log(this.name);
}

private _handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  // Handle form submission
}
```

### Event Listener Options

```typescript
import {eventOptions} from 'lit/decorators.js';

@eventOptions({passive: true, capture: true})
private _handleScroll(e: Event) { }
```

### Dispatching Custom Events

```typescript
// Standard pattern for composed/bubbling events
private _dispatchChange() {
  this.dispatchEvent(new CustomEvent('my-change', {
    detail: { value: this.value },
    bubbles: true,    // Flows up DOM tree
    composed: true    // Crosses shadow DOM boundaries
  }));
}

// Dispatch after render completes
async _onClick() {
  this.value = newValue;
  await this.updateComplete;
  this.dispatchEvent(new CustomEvent('value-changed'));
}
```

### External Event Listeners

```typescript
connectedCallback() {
  super.connectedCallback();
  window.addEventListener('resize', this._handleResize);
}

disconnectedCallback() {
  window.removeEventListener('resize', this._handleResize);
  super.disconnectedCallback();
}

// Use arrow function to preserve `this`
private _handleResize = () => {
  console.log(this.offsetWidth);
};
```

### Event Delegation

```typescript
render() {
  return html`
    <ul @click=${this._handleListClick}>
      ${this.items.map(item => html`<li data-id=${item.id}>${item.name}</li>`)}
    </ul>
  `;
}

private _handleListClick(e: Event) {
  const target = e.target as HTMLElement;
  if (target.tagName === 'LI') {
    const id = target.dataset.id;
    // Handle item click
  }
}
```

---

## Common Patterns

### Conditional Rendering

```typescript
render() {
  return html`
    ${this.loading
      ? html`<span>Loading...</span>`
      : html`<span>${this.data}</span>`}

    ${this.items.length > 0
      ? html`<ul>${this.items.map(i => html`<li>${i}</li>`)}</ul>`
      : nothing}
  `;
}
```

### List Rendering with Keys

```typescript
import {repeat} from 'lit/directives/repeat.js';

render() {
  return html`
    <ul>
      ${repeat(
        this.items,
        item => item.id,  // Key function
        item => html`<li>${item.name}</li>`
      )}
    </ul>
  `;
}
```

### Slots and Default Content

```typescript
render() {
  return html`
    <header><slot name="header">Default Header</slot></header>
    <main><slot>Default content</slot></main>
    <footer><slot name="footer"></slot></footer>
  `;
}

// Usage: <my-element><span slot="header">Custom</span></my-element>
```

### Query Decorators

```typescript
@query('#input') input!: HTMLInputElement;
@query('.item', true) itemCached!: HTMLElement; // Cached
@queryAll('.item') allItems!: NodeListOf<HTMLElement>;
@queryAsync('#lazy') lazyElement!: Promise<HTMLElement>;
@queryAssignedElements({slot: 'item'}) slottedItems!: HTMLElement[];
@queryAssignedNodes({slot: '', flatten: true}) slottedNodes!: Node[];
```

### Using Refs

```typescript
import {ref, createRef, Ref} from 'lit/directives/ref.js';

private inputRef: Ref<HTMLInputElement> = createRef();

render() {
  return html`<input ${ref(this.inputRef)}>`;
}

firstUpdated() {
  this.inputRef.value?.focus();
}
```

### Immutable Updates for Objects/Arrays

```typescript
// ✅ Correct - create new reference
this.items = [...this.items, newItem];
this.items = this.items.filter(i => i.id !== removeId);
this.config = {...this.config, key: newValue};

// ❌ Avoid - mutation doesn't trigger update
this.items.push(newItem);  // Won't re-render
this.config.key = newValue; // Won't re-render

// Alternative: Manual update request after mutation
this.items.push(newItem);
this.requestUpdate();
```

### Form Handling Pattern

```typescript
@customElement('contact-form')
class ContactForm extends LitElement {
  @state() private _formData = {
    name: '',
    email: '',
    message: ''
  };
  @state() private _errors: Record<string, string> = {};
  @state() private _submitting = false;

  private _handleInput(field: keyof typeof this._formData) {
    return (e: InputEvent) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      this._formData = {...this._formData, [field]: target.value};
      // Clear error when user types
      if (this._errors[field]) {
        const {[field]: _, ...rest} = this._errors;
        this._errors = rest;
      }
    };
  }

  private _validate(): boolean {
    const errors: Record<string, string> = {};
    if (!this._formData.name.trim()) errors.name = 'Name is required';
    if (!this._formData.email.includes('@')) errors.email = 'Invalid email';
    if (!this._formData.message.trim()) errors.message = 'Message is required';
    this._errors = errors;
    return Object.keys(errors).length === 0;
  }

  private async _handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!this._validate()) return;

    this._submitting = true;
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(this._formData)
      });
      this.dispatchEvent(new CustomEvent('form-submitted'));
    } catch (error) {
      this._errors = {form: 'Submission failed. Please try again.'};
    } finally {
      this._submitting = false;
    }
  }

  render() {
    return html`
      <form @submit=${this._handleSubmit}>
        <label>
          Name
          <input
            type="text"
            .value=${this._formData.name}
            @input=${this._handleInput('name')}
          >
          ${this._errors.name ? html`<span class="error">${this._errors.name}</span>` : nothing}
        </label>

        <label>
          Email
          <input
            type="email"
            .value=${this._formData.email}
            @input=${this._handleInput('email')}
          >
          ${this._errors.email ? html`<span class="error">${this._errors.email}</span>` : nothing}
        </label>

        <label>
          Message
          <textarea
            .value=${this._formData.message}
            @input=${this._handleInput('message')}
          ></textarea>
          ${this._errors.message ? html`<span class="error">${this._errors.message}</span>` : nothing}
        </label>

        ${this._errors.form ? html`<div class="error">${this._errors.form}</div>` : nothing}

        <button type="submit" ?disabled=${this._submitting}>
          ${this._submitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    `;
  }
}
```

---

## TypeScript Configuration Requirements

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2021",
    "module": "es2015",
    "moduleResolution": "node",
    "lib": ["es2021", "DOM"],
    "declaration": true,
    "declarationMap": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "strict": true,
    "noImplicitAny": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"]
}
```

### For Standard Decorators (TypeScript 5.0+)

```json
{
  "compilerOptions": {
    "experimentalDecorators": false,
    "useDefineForClassFields": true
  }
}
```

Then use `accessor` keyword: `@property() accessor name = '';`

---

## Development Setup Instructions

### 1. Install Dependencies

```bash
npm init -y
npm install lit
npm install -D typescript @web/dev-server
```

### 2. Web Dev Server Configuration

```javascript
// web-dev-server.config.js
export default {
  open: true,
  watch: true,
  appIndex: 'index.html',
  nodeResolve: {
    exportConditions: ['development'],
  },
};
```

### 3. Package.json Scripts

```json
{
  "type": "module",
  "scripts": {
    "start": "web-dev-server",
    "build": "tsc",
    "build:watch": "tsc --watch",
    "lint": "eslint \"**/*.{js,ts}\"",
    "test": "web-test-runner"
  }
}
```

### 4. IDE Setup

Install **lit-plugin** for VS Code:
- Syntax highlighting for templates
- Type checking in templates
- Code completion
- Hover documentation
- Linting and quick fixes

### 5. ESLint with Lit Plugin

```bash
npm install -D eslint eslint-plugin-lit
```

---

## Testing with Web Test Runner

### Installation

```bash
npm install -D @web/test-runner @web/dev-server-legacy @esm-bundle/chai @open-wc/testing
```

### Configuration

```javascript
// web-test-runner.config.js
import { legacyPlugin } from '@web/dev-server-legacy';

export default {
  files: 'test/**/*.test.js',
  nodeResolve: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        webcomponents: true,
        custom: [{
          name: 'lit-polyfill-support',
          path: 'node_modules/lit/polyfill-support.js',
          test: "!('attachShadow' in Element.prototype)",
          module: false,
        }],
      },
    }),
  ],
};
```

### Test Example

```typescript
import { fixture, html, expect } from '@open-wc/testing';
import '../src/my-element.js';

describe('MyElement', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    element = await fixture(html`<my-element name="Test"></my-element>`);
  });

  it('renders with default values', () => {
    expect(element.shadowRoot?.querySelector('h1')?.textContent)
      .to.equal('Hello, Test!');
  });

  it('updates when property changes', async () => {
    element.setAttribute('name', 'World');
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('h1')?.textContent)
      .to.equal('Hello, World!');
  });

  it('dispatches event on click', async () => {
    let eventFired = false;
    element.addEventListener('count-changed', () => eventFired = true);
    element.shadowRoot?.querySelector('button')?.click();
    expect(eventFired).to.be.true;
  });
});
```

---

## Publishing Best Practices

### Package.json Configuration

```json
{
  "name": "my-element",
  "version": "1.0.0",
  "type": "module",
  "main": "my-element.js",
  "module": "my-element.js",
  "types": "my-element.d.ts",
  "files": [
    "my-element.js",
    "my-element.js.map",
    "my-element.d.ts",
    "my-element.d.ts.map"
  ],
  "exports": {
    ".": {
      "types": "./my-element.d.ts",
      "default": "./my-element.js"
    }
  },
  "peerDependencies": {
    "lit": "^3.0.0"
  }
}
```

### Publishing Rules

- **Publish ES2021** - Don't transpile to older syntax; consumers can compile if needed
- **Don't bundle** - Let consumers bundle; avoids duplicate Lit versions
- **Don't minify** - Let consumers optimize
- **Include .d.ts files** - Publish TypeScript declarations
- **Include file extensions** - Use `.js` in imports for import map compatibility
- **Self-define elements** - Always call `customElements.define()` in your module
- **Export classes** - Allow subclassing and future scoped registries
- **Don't import polyfills** - Leave polyfill decisions to consumers
- **Add HTMLElementTagNameMap** - For TypeScript consumers

### TypeScript Declaration

```typescript
declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
```

---

## Debugging Guidance for Version Conflicts

### Multiple Versions Warning

Check which versions are loaded:

```javascript
console.log(window.litElementVersions);
console.log(window.reactiveElementVersions);
console.log(window.litHtmlVersions);
```

### Resolution Steps

1. Run `npm ls lit @lit/reactive-element lit-element lit-html`
2. Try `npm dedupe`
3. Install explicit versions: `npm i lit@latest @lit/reactive-element@latest lit-element@latest lit-html@latest`
4. If still duplicated: delete `package-lock.json` and `node_modules`, reinstall

### Enable Development Warnings

```javascript
// In rollup/webpack config
nodeResolve({ exportConditions: ['development'] })
```

### Disable Specific Warnings

```typescript
import {ReactiveElement, LitElement} from 'lit';

// Disable migration warnings globally
ReactiveElement.disableWarning?.('migration');

// Disable change-in-update warnings for specific class
MyElement.disableWarning?.('change-in-update');
```

---

## Lit Ecosystem Packages

| Package | Purpose | Install |
|---------|---------|---------|
| `lit` | Core library | `npm install lit` |
| `@lit/context` | Context API for dependency injection | `npm install @lit/context` |
| `@lit/task` | Async task management | `npm install @lit/task` |
| `@lit-labs/signals` | Fine-grained reactivity with signals | `npm install @lit-labs/signals` |
| `@frankchoongsaeng/lit-store` | External state management | `npm install @frankchoongsaeng/lit-store` |
| `@open-wc/testing` | Testing utilities | `npm install -D @open-wc/testing` |
| `@web/test-runner` | Test runner | `npm install -D @web/test-runner` |
| `@web/dev-server` | Development server | `npm install -D @web/dev-server` |

---

## IDE Plugins Recommendations

### VS Code

- **lit-plugin** (required) - Template type-checking, highlighting, completion
- **ESLint with eslint-plugin-lit** - Lit-specific linting rules
- **Prettier** - Code formatting

### Other Editors

- **ts-lit-plugin** - Works with Sublime Text, Atom (TypeScript compiler plugin)
- See [awesome-lit-html](https://github.com/nickytonline/awesome-lit) for more

### lit-plugin Features

- Syntax highlighting in templates
- Type checking for bindings
- Code completion for elements/attributes
- Hover documentation
- Jump to definition
- Quick fixes for common issues
