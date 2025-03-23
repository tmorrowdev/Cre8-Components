# cre8 Web Components Code Guidelines

cre8 Web Components is the web component implementation of cre8. It provides presentational UI components to be consumed by Cigna web applications.

cre8 Web Components follows these coding principles and conventions for HTML, CSS, and JavaScript:

- [Library principles](#principles)
- [HTML](#html)
  - [HTML principles and conventions](#html-principles)
- [CSS](#css)
  - [CSS design principles](#css-design-principles)
  - [CSS conventions](#css-conventions)
  - [CSS custom properties](#css-custom-properties)
- [JavaScript](#js)
  - [JavaScript principles](#js-principles)
  - [Component API naming conventions](#api-naming)
- [Assets](#assets)
  - [Tools](#tools)
  - [Workflow](#workflow)
- [Directory Structure](#directory)

**********
## Important Note! Components are located in one of 3 directories based on their status and/or purpose:
  1. **cre8 Components**: This indicates that the component is accepted and will be supported by us for any bug fixes filed in our github issues! This also means the Enterprise Design Team and Accessibility has reviewed the component for brand alignment and performed the required a11y testing. 
  2. **Experimental**: This indicates the component is either somewhere along the roadmap to completion, is only included to provide a container element outside the concerns of the design system, or it is possible it works but hasn't gone through the whole process of acceptance. Components in this category are not supported and any bugs found should be reported but will only be fixed if/when they are released as cre8 Components

  3. **Patterns**: These are typically composite components or multiple components which are meant to communicate with one another to perform a common pattern. They are included here as an example of implementation for consuming teams. 

**********
## cre8 Web Components principles <a name="principles"></a>

- **A front-end source of truth** - cre8 Web Components serves as the UI-specific front-end code source of truth for ds. cre8 Web Components embody best practices around accessibility, responsive design, performance, and other front-end practices. Cigna applications can pull cre8 Web Components into their projects in order to deliver high-quality web experiences.
- **Presentational UI Components Only** - cre8 Web Components provides a library of reusable [presentational UI components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) that are consumed by Cigna applications. These presentational components are "dumb" and don't contain any application business logic, aren't hooked up to any data models, or rely on specific environments or configurations.
- **Agnostic** - cre8 Web Components are free of any framework, CMS, or implementation-specific conventions. These are standalone presentational UI components that aim to travel to any web-based environment. Any framework, CMS, or implementation-specific handling should be managed within the application environment.
- **Predictable APIs** - cre8 Web Components provides consistent, clear [component APIs](#api-naming) in order to provide a smooth user developer experience.
- **Composition over inheritence** cre8 Web Components adheres to the [composition over inheritence](https://en.wikipedia.org/wiki/Composition_over_inheritance) principle in order to create clean, extensible components that aren't tied to specific contexts or content.

# HTML <a name="html"></a>

## HTML principles and conventions <a name="html-principles"></a>

- **Use semantic markup.** That means using the `<button>` tag rather than `<div onclick="toggle()">` when a button is required, an `<a>` tag when a link is required, and so on.
- **Clarity over brevity** Developers should be able to understand what's going on with markup at a glance. Avoid cryptic abbreviations and nicknames, add proper indenting & spacing, and use clear comments.
- **Accessibility.** Markup should be accessible and [follow best practices](https://www.a11yproject.com/checklist/). Use (but [don't abuse](https://www.deque.com/blog/top-5-rules-of-aria/)) <abbr title="Accessible Rich Internet Applications">ARIA</abbr> attributes.
- Native HTML elements (e.g. `<input>`, `<select>`) should be preferred over custom elements whenever possible. Native elements provide a slew of functionality and accessibility best practices out of the box.

---

# CSS

## CSS design principles <a name="css-design-principles"></a>

- **Portable** - The CSS architecture uses CSS classes for styling (versus CSS-in-JS tooling) in order to ensure the CSS is portable across frameworks and web technologies.
- **Clarity over brevity** CSS class naming conventions are verbose, but they deliver clarity, legibility, and reslience in exchange.
- **Modular** - Component styles are fully modular in order to keep things tightly scoped and to avoid unintended style bleeding.
- **Limit chaining and multiple selectors** Chaining and descendant selectors should be avoided wherever possible in order to keep CSS as DOM-independent and modular as possible.

## CSS conventions <a name="css-conventions"></a>

cre8 Web Components follows a [BEM](http://getbem.com/introduction/)-like syntax, extending it further to follow more of [BEMIT](http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/)-like conventions.

### BEM syntax <a name="css-conventions"></a>

BEM stands for “Block Element Modifier”. Here's a breakdown of what that means:

- **Block** is the primary component block (e.g. `.cre8-c-button`)
- **Element** is a child of the primary block (e.g. `.cre8-c-button__text`)
- **Modifier** is a variation of a component style (e.g. `.cre8-c-button--secondary`)

cre8 Web Components extends BEM's conventions to create even more explicit, encapsulated class names.

### Global namespace

cre8 Web Components uses a global namespace of `cre8-` prefix to all styles that come from the design system. This is done to:

- Avoid naming collisions with code coming from other sources
- Clarify the source of the code, distinguishing Cigna markup/styles from code coming from other codebases and libraries.

### Class prefixes

In addition to the global `cre8-` namespace, cre8 Web Components uses [class prefixes](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) to provide additional clarity to the job a given class plays. cre8 Web Components uses the following class prefix conventions:

- **`c-`** for UI components, such as `.cre8-c-button`
- **`l-`** for layout-specific component styles, such as `.cre8-l-container`
- **`u-`** for utilities, such as `.cre8-u-margin-bottom-none`
- **`is-` and `has-`** for specific states, such as `.cre8-is-active`

### Putting it all together: anatomy of a class

Combining BEM conventions, a global namespace, and category prefixes results in an explicit (and yes, verbose) class string that allows developers to deduce what job it does.

Let's take a look at the following example:

`.cre8-c-button--inverted`

- `cre8-` is the global namespace for all styles coming from cre8 Web Components.
- `c-` is the category of class, which in this case `c-` means “component”
- `button` is the block name (“Block” being the “B” in BEM)
- `--inverted` is a modifier, indicating a stylistic variation of the block (“Modifier” being the “M” in BEM)

Here's another example:

`.cre8-l-grid__item`

- `cre8-` once again is cre8 Web Components's global namespace.
- `l-` is the category of class, which in this case `l-` means “layout”
- `grid` is the block name
- `__item` is an element, indicating that this is a child of the block (“Element” being the “E” in BEM)

### The Dos and Don'ts of BEM

#### Do's

- Always declare the block class for a component (e.g. `cre8-c-card`, `cre8-c-button`, etc.). Modifier classes on their own (e.g. `cre8-c-card--inverted` or `cre8-c-button--primary`) are not permitted.
- Each element within a component _must_ include the appropriate class applied in accordance with BEM standards (e.g. `cre8-c-accordion__panel` or `cre8-c-field__label`). Unclassed elements (e.g. stray `<p>` or `<span>` tags) are not permitted (with the exception of the `TextPassage` component which is explicitly designed to handle uncontrolled markup). While verbose, this approach yields a consistent codebase, allows for tight styling control, better future proofs of the design system's codebase.

#### Don'ts

- **Don't** use BEM "grandchildren", meaning using the `__` part of BEM more than once (e.g. `cre8-c-breadcrumb__item__icon`). For a link inside `cre8-c-primary-nav__item`, write it as `cre8-c-primary-nav__link` instead of `cre8-c-primary-nav__item__link`.
- **Don't** use a modifier without a block. For example, don't use `cre8-c-button--primary` modifier without the `cre8-c-button` block class. Use `class="cre8-c-button cre8-c-button--primary"`, **not** `class="cre8-c-button--primary"`.

### CSS Nesting

Keep SCSS files as flat as possible rather than [nesting](https://sass-lang.com/guide#topic-3). Nesting is only used for the following situations:

- Media queries
- States and pseudo-selectors
- Parent selectors

#### Media queries

```scss
.cre8-c-primary-nav {
  /**
    * 1) On larger displays, convert to a horizontal list
    */
  @media all and (min-width: 40em) {
    display: flex;
  }
}
```

#### States and pseudo-selectors

```scss
.cre8-c-button {
  background: $cre8-color-button-background-color;

  &:hover,
  &:focus {
    background: $cre8-color-button-background-color-hover;
  }

  &:after {
    content: '';
    display: block;
  }
}
```

#### Parent selectors

Use [parent selectors](https://sass-lang.com/documentation/style-rules/parent-selector) to target a selector when it appears inside a specific parent element. Use parent selectors instead of child selectors in order to co-locate all styles around a specific selector, which improves maintability and findability (read more in [Leading Ampersands for modifiers in Sass: An anti-pattern](https://chipcullen.com/leading-ampersands-in-sass-an-anti-pattern/)).

Use the following conventions:

```scss
.cre8-c-button {
  // cre8-c-button code
}

.cre8-c-button--secondary {
  // cre8-c-button--secondary code
}

.cre8-c-button--small {
  // cre8-c-button--small code
}

.cre8-c-button__text {
  // cre8-c-button__text code

  .cre8-c-button--secondary & {
    // cre8-c-button__text within cre8-c-button--secondary code
  }

  .cre8-c-button--small & {
    // cre8-c-button__text within cre8-c-button--small code
  }
}
```

### CSS Comments

cre8 Web Components uses the following commenting conventions, which take much inspiration from [these commenting guidelines](https://cssguidelin.es/#commenting).

For example:

```scss
/*------------------------------------*\
    # BUTTON
\*------------------------------------*/

/**
 * Button
 */
.cre8-c-button {
}

/**
 * Full width button
 * 1) Button should take up the full width of the container it lives within
 * 2) Pushes the button away from the other content because it lives in a flexbox container
 * 3) I know this a weird magic number, but blah blah blah
 */
.cre8-c-button--full-width {
  background: red;
  margin-right: auto; /* 2 */
  width: 100%; /* 1 */
  height: 37px; /* 3 */
}
```

### Other CSS Rules

- cre8 Web Components generally arranges CSS properties in the following manner (although more as a guideline than a strictly-enforced convention):

```css
.element {
  [includes, including typography]
  [positioning]
  [box model]
  [color]
  [transition]
}
```

- Media queries should live inside each class name. This makes it easier for a developer to focus on a class name, rather than finding confusion with class names written twice in a file and getting lost.

Instead of:

```scss
.cre8-c-primary-nav {
  flex-direction: column;
}

@media (min-width: $cre8-breakpoint-md) {
  .cre8-c-primary-nav {
    flex-direction: row;
  }
}
```

Use:

```scss
.cre8-c-primary-nav {
  flex-direction: column;

  @media (min-width: $cre8-breakpoint-md) {
    flex-direction: row;
  }
}
```

## CSS Custom Properties <a name="css-custom-properties"></a>

- Web components requires CSS custom properties
- cre8 is a [themeable design system](THEMING.md)

The cre8 Web Components pull in CSS custom properties from the [cre8 Design Tokens](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens) library. A `:root` selector allows for these properties to be set and used by each cre8 Web Component's `scss` file (e.g. `button.scss`). Developers should use tier 2 or tier 3 values only, meaning that developers should not use `--cre8-base-` CSS custom properties within component code to allow for multi-theming with components. Tier 2 values consist of `cre8-color-bg-`, `cre8-color-content-`, and `cre8-color-border` to account for most of the colors used in the components. Other values like `cre8-border-radius-` or `cre8-border-width-` are used for non-color tier 2 custom properties that may need to change across themes. Tier 3 values consist of component specific CSS Custom properties and should be rarely used, but for components like the `button` this flexibility needs to be in place. Examples of these are `--cre8-color-button-primary-bg` or `--cre8-color-button-primary-content`.

There may also be instances where a component needs flexibility with a custom property. By default a component like `card` may have default padding, but it can be overridden by a CSS Custom Property getting passed at the recipe or application layer. This decision should be carefully examined by design and development to determine if this is a valuable decision or if the CSS should be locked down. Here's an example of a card that provides default padding but allows for a custom property to override:

```css
.cre8-c-card {
  padding: var(--cre8-card-padding, size(2));
}
```

By default this card has 16px (`size(2)`) of padding around it, but if a downstream team needed to remove all padding, they could set `--cre8-card-padding: 0;` in their code and that would get passed into the card. Basically this padding property says, "If `--cre8-card-padding` exists, use that. Otherwise fall back to 16px (`size(2)`). This cascade should only be added after careful consideration.

Lastly, CSS Custom Properties can help allow parents of composable components to set a variant without needing to declare a `variant` property on every child element. A good example is with `link-list`:

```html
<cre8-link-list variant="secondary">
  <cre8-link-list-item href="#">Item 1</cre8-link-list>
  <cre8-link-list-item href="#">Item 2</cre8-link-list>
  <cre8-link-list-item href="#">Item 3</cre8-link-list>
  <cre8-link-list-item href="#">Item 4</cre8-link-list>
</cre8-link-list>
```

If you have a variant that makes all link text a dark gray instead of the default color, a user API should allow that variant to exist on the parent to apply to all link list items. This makes it easier on downstream developers rather than needing to apply `variant="secondary"` to every item. The challenge in web components is that `cre8-link-list` and `cre8-link-list-item` are both encapsulated components, and therefore can't be affected by outside CSS unless it's through a CSS Custom Property or it's inherited. Because of this encapsulation, the parent would need to pass in the link list item color via a CSS Custom Property like this in `link-list.scss`:

```scss
/**
 * Default link list
 */
.cre8-c-link-list {
  --cre8-link-list-link-color: var(--cre8-color-content-link);
}

/**
 * Secondary link list
 */
.cre8-c-link-list--secondary {
  --cre8-link-list-link-color: var(--cre8-color-content-subtle);
}
```

Then in `link-list-item.scss`, you would need to use that CSS Custom property in a CSS property:

```scss
.cre8-c-link-list__link {
  color: var(--cre8-link-list-link-color);
}
```

This passes the link token down for default link lists but changes that to `content-subtle` when `variant="secondary"` is applied to that parent. The general structure of these pass down CSS custom properties should be:

```
cre8-[CSS selector(dash case)]-[state(e.g. hover)]-[CSS property]
```

# JavaScript <a name="js"></a>

cre8 Web Components builds web components using [LitElement](https://lit.dev/) with [TypeScript](https://www.typescriptlang.org/). TODO: finalize language and tooling/

## JavaScript/TypeScript principles

- **Clarity over brevity** Don't over abstract or obfuscate the meaning of code.
  1. Do use meaningful variable names
  2. Don't hide code through multiple layers of inheritance
  3. Don't use nested ternary operators
- **Avoid too much complexity**
  1. Keep your functions/methods simple. Don't have too many branching paths
  2. Break your code into smaller methods
  3. Avoid using switch/case unless you really need to https://refactoring.guru/smells/switch-statements
- **Check against failure early**
  1. Try to return out failure conditions out of methods

## Component API naming conventions <a name="api-naming"></a>

cre8 Web Components provide attributes that serve as the API for user developers to interface with cre8 Web Components. For example:

```
<cre8-button text="Click me" iconName="arrow-right" iconPosition="after" />
```

In the above example, `text`, `iconName`, and `iconPosition` are attributes that can accept certain values in order to render the desired UI element.

Authoring a consistent API language provides many benefits:

- **More efficient development** - Because the API language is consistent across components, user developers can spend more time coding rather than reading API documentation. Library contributors don't have to think as much about component API naming either.
- **Shared vocuabulary between designers and developers** - When the code library and design library use the same language, designers and developers can spend more time collaborating rather than futzing over what things are named. This improves team velocity and product quality. It also positions the team to benefit from future tooling that can bring design and code closer together (something many startups and plugins are trying to solve right now!)
- **Future changes** - Utilizing a consistent language means that future changes and improvements are as easy as find-and-replace.

The library adhreres to the following API naming conventions:

### Variants

- `variant` should be used for primary _stylistic_ variations of a component, such as (e.g. `variant="primary"` or `variant="success"`). `variant` should be used as the primary variable used to manipulate the component style.
- `inverted` should be used consistently for stylistic variations that "invert" the color schemes (e.g. `<cre8-heading ?inverted=${true}>`) to work on a darker background. Note: this is different than dark/light mode support, which is handled elsewhere.
- `size` should be used for adjusting size attributes (e.g. `size="sm"` or `size="lg"`). Default to `sm`, `lg`, `xl` with "md" being the undeclared default. Note: use abbreviated t-shirt sizes — `xs`, `sm`, `md`, `lg`, `xl` — for naming versus spelling out "small", "large" and so on.
- `spacing` should be used for adjusting spacing between elements (e.g. `spacing="condensed"`).
- `behavior` should be used for functional variations of a pattern, such as `<cre8-alert behavior="dismissible">`. `behavior` should be used as the default for introducing a functional variant to a component, and should be used for mutually exclusive behaviors.
- `is[Behavior]` should be used in conjunction with `behavior` to add additional behavioral variants to a component (e.g. `<cre8-alert behavior="dismissible" isDraggable isFadable>`). `is[Behavior]` should be the default convention, but sometimes deviating from the `is` language is necessary (for instance, `<cre8-accordion allowMultipleOpen>`). Whatever the language, the name should be clear to the user whether they're toggling something on or off.
- `align` should be used for aligning content, and should include `start`, `center`, `end` if needed. The `start` and `end` names are used to match how CSS logical properties are used to support LTR and RTL languages.
- `orientation` should be used for variants that may need to be oriented `horizontally`, `vertically`, or even may contain `responsive` (stacked on small screens and horizontal on larger screens). A good example of this is a `link-list`. By default, this would be stacked but there may be a need for `orientation="horizontal"`.
- `verticalAlign` should be used for aligning content vertically, and should include `start`, `center`, `end`. The `start` and `end` names are used to match how CSS logical properties are used to support LTR and RTL languages.

### Text, Labels, Titles

- Default to `text` for strings of text (e.g. `<cre8-badge text="Badge Text">`)
- Default to `title` for headings, such as `<cre8-hero title="Hero Title">`.
- Use `description` for non-heading text that accompanies a component, such as `<cre8-hero title="Hero Title" description="This is accompanying text for the hero">`.
- For form-related components, use the semantic `label` or `legend`, such as `<cre8-field label="First Name">`.

### Tag name

- If a component can be rendered as different html elements (e.g. `h1`, `h2`, `h3`, etc), name the prop `tagName`. For example `tagName: 'h2'`

### Media

- `imgSrc` for passing in an image source (e.g. `<cre8-hero imgSrc="path/to/image.jpg">`)
- `imgAlt` for image alt text (e.g. `<cre8-hero imgSrc="path/to/image.jpg" imgAlt="A smiling stock broker looking at a laptop computer">`)
- `iconName` for icon name (e.g. `<cre8-button iconName="arrow-right">`)
- `iconPosition` for controling the position of an icon (e.g. `<cre8-button iconName="search" iconPosition="before" text="Search">`)

### Compound components

Certain components (such as `accordion`, `tabs`, `table`) require splitting up into smaller subcomponents. Compound components either require multiple components to function correctly (e.g. `accordion` and `accordion-item`), or require multiple components to be composible and flexible (such as `card` with `card-header`, `card-body`, and `card-footer`).

An example of a compound component:

```
<cre8-tabs>
  <cre8-tab href="tab-1" title="Tab 1">
    <!-- Tab 1 content -->
  </cre8-tab>
  <cre8-tab href="tab-2" title="Tab 2">
    <!-- Tab 2 content -->
  </cre8-tab>
</cre8-tabs>
```

- Compound components are composed of a parent component (e.g. `card`) and children component (e.g. `card-header` and `card-footer`).
- Compound component children names must always begin with the parent name. A parent component `table` means that all child components related to it must begin with `table` (such as `table-body`, `table-row` and `table-cell`).
- Compound components should generally follow a `component` and `component-item` pattern (e.g. `accordion` and `accordion-item`, `grid` and `grid-item`, or `breadcrumbs` and `breadcrumbs-item`)
- Some composable compound components (like `modal` or `card`) should use a `header`, `body`, `footer` convention (e.g. `card` would have `card-header`, `card-body`, and `card-footer`) to serve as discrete sections
- Compound component children have an associated `.scss` file. Because of the shadow DOM, styles need to be associated with the child element in addition to the parent element. In a `link-list`, `link-list.scss` and `link-list-item.scss` need to both have SCSS files to style them properly. CSS custom properties can be used to link the two together if the parent's `variant` needs to control the child's styles.
- Compound components never have an associated `.stories.ts` file to appear in Storybook as they rely on the parent component to render properly.

### Composability

cre8 Web Components are composable in order to account for different content configurations. Certain components (like cards and other blocks) need to be extremely composable in order to meet requirements across many different products and use cases.

The library makes use of [slots](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Slot) to carve out specific areas where child elements can be injected. These slots can have a `name` attribute associated with it as well in order to provide a specific location to place elements. A good example of slot usage is in the `card` component:

```ts
<div class="${componentClassNames}" part="card">
  ${this.slotNotEmpty('header') && html`<header class="cre8-c-card__header" part="header"><slot name="header"></slot></header>`}
  <div class="cre8-c-card__body">
    <slot></slot>
  </div>${this.slotNotEmpty('footer') && html`<footer class="cre8-c-card__footer"><slot name="footer"></slot></footer>`}
</div>
```

In this example, you can see thatwe have 3 slots, `<slot name="header">`, `<slot>`, and `<slot name="footer">`. These 3 areas allow for users to place certain elements inside like this:

```html
<cre8-card>
  <img slot="header" src="src-of-image.png" alt="placeholder" />
  <cre8-heading headingTagName="h3" variant="title-large"> Card Title </cre8-heading>
  <cre8-button slot="footer" text="Card Button"></cre8-button>
</cre8-card>
```

What this shows is that the image gets put in the `slot name="header"` element tag within the `card`, the `cre8-heading` gets placed in the body of the card (note the lack of a `slot=` declaration since that slot doesn't have a name), and the button gets placed in the `slot name="footer"` element tag in the card. You'll also notice that there is a `this.slotNotEmpty` conditional that allows for slots to be conditionally rendered if the name of a `slot="header"` or `slot="footer"` attribute is not defined. This is helpful for not adding additional padding to a card if there isn't any content in the card. By default, the body will always exist in a card since sometimes an image doesn't exist above the text or sometimes no CTAs are in the footer of a card. The body has a `flex: 1` property to always take up the remaining space when used in a grid. The reason these 3 sections are split up is to allow for alignment of items in the header, items in the body, and items in the footer. So when these are used within a grid and there's more body text in one card compared to another, the buttons in the footer will always be aligned properly due to this setup.

The cre8 components use a `header`, `body`, and `footer` convention for a lot of the more composable components like cards, popovers, modals, etc. A couple of the exceptions are the `cre8-header` and `cre8-footer` components, which use `top`, `middle`, and `bottom` since calling the top of a `header` component "header" is more confusing than "top." cre8 uses this approach to establish designated areas in a container to allow for items to be placed. The `body` (or `middle`) is always going to be populated in these components. The `header` and `footer` are optional in these components, since sometimes cards don't have an associated image so a `header` doesn't need to render. The same goes for `footer` since some cards may not have CTAs, so a `footer` element isn't needed. The `body` of these components takes up the remaining space, to allow for all cards with different content in the `cre8-grid` to be equal height. This structure also allows for all CTAs to be aligned properly in the card footer since the body expands so that all cards are as tall as the tallest card in the `cre8-grid`.

### Other naming conventions

- `camelCase` for multi-word API variable definitions (e.g. `styleModifier` or `iconName`)
- For size-related names, such as "small" or "large", always use an abbreviation:
  - `xs` = Extra small
  - `sm` = Small
  - `md` = Medium
  - `lg` = Large
  - `xl` = Extra large
  - `xxl` = Extra, extra large

### Events

While some components are static and don't require any interactivity, other components require functionality. For these components, we need to declare a event method. For event handling, we want to go a step further and privatize the method so consuming teams know not to call it in use by pre-fixing these methods with `private _handleOn[Event Name]`. For example: 

* We want to normalize naming @click handlers with `private _handleOnClick()`. 
* If it's a `keydown` event handler, call it `private _handleOnKeydown()`.

Try to avoid using `on[Event Name]` since it conflicts with React wrappers downstream. Not all methods and functions are associated with one type of event, so using something like `private _toggleDropdown()` is a clear name without needing to look much at documentation.

Here's an example of `accordion` open/close functionality. Generally, `@property` decorators should be used for open/close states that need to be accessed from the outside. If the state should be shielded from the outside, use `@state` decorators for this. Here's the example of the button in the accordion triggering the open/close with the `isActive` property:

```ts
 /**
   * is Active
   * 1) Panel is open when set to true. Close when set to false
   */
  @property({ type: Boolean, reflect: true })
  isActive?: boolean;

 /**
   * Toggle panel
   * 1) Toggle the panel to open/close
   */
  private _togglePanel() {
    this.isActive = !this.isActive; /* 1 */
  }

  render() {
    const componentClassNames = this.componentClassNames('cre8-c-accordion-panel', {
      'cre8-is-active': this.isActive === true
    });

    return html`
      <div class="${componentClassNames}">
        <dt class="cre8-c-accordion-panel__header">
          <button
            class="cre8-c-accordion-panel__button"
            aria-expanded="${this.isActive ? true : false}"
            id="${this.ariaLabelledBy}"
            @click=${this._togglePanel}
          >
            <cre8-icon-legacy name="keyboard-arrow-right"></cre8-icon-legacy>
            <slot name="header"></slot>
          </button>
        </dt>
        <dd class="cre8-c-accordion-panel__body" aria-labelledby="${this.ariaLabelledBy}">
          <div class="cre8-c-accordion-panel__body-inner" #bodyInner>
            <slot></slot>
          </div>
        </dd>
      </div>
    `;
  }

```

### Event emission

Applications will likely need to access some of the internal values from events from components in order to change application logic. To allow consuming developers to use these internal values, event emission is needed. Generally speaking, a `new CustomEvent` is created and named and then that event is dispatched as shown in [Lit's documentation](https://lit.dev/docs/v1/components/events/#custom-events). For example this might be defined in your `component.ts` file:

```ts
let myEvent = new CustomEvent('my-event', {
  detail: {message: 'my-event happened.'},
  bubbles: true,
  composed: true,
});
this.dispatchEvent(myEvent);
```

From the user standpoint, this allows the ability for a consumer to add the component and access the `detail` object that are emitted. To do this, the user would add `@my-event` to their web component and run an external function to get whatever that custom event emits to user for the application. Here's an example that uses the custom event from above:

```html
<ds-component @my-event=${(e) => someExternalFunction(e)}></ds-component>
```

## Event Handling

Event handling in web components has some nuances that are important to know.

Event handling in React has its own set of quirks.

Combining the two is extra fun.

In this section, **consumer** refers to a developer who consumes cre8 Web Components, that is, they use it in their project.

### Web Components
#### Composed

All events have a property named `composed`. See https://developer.mozilla.org/en-US/docs/Web/API/Event/composed

- If `composed` is `false`, the event stops propagating when it hits a Shadow DOM boundary.
- If `composed` is `true`, the event propagates past the Shadow DOM boundary, but is retargeted to the custom element
    - the related property [composedPath](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath) is the "array of the objects on which listeners will be invoked"

For custom events, we decide if composed is true or false.

For build-in events, the spec defines which ones are composed and which ones are not.

Important events:

- the **`change`** event is `composed: false`
- the **`input`** event is `composed: true`


This means that if a consumer adds an event listener to a cre8 component that wraps an element that emits the `input` and `change` events, if cre8 does nothing special, then the `input` event will just work, but their callback for the `change` event will never fire.

If we want consumers to be able to add event listeners for **`change`**, from vanilla js, then we have to fire our own custom `change` event.

#### cre8 Should update state using `@input`

**In general, cre8 should use the `input` event and not the `change` event for updating its internal state.**

The browser `input` event fires first, then the `change` event.

If cre8 puts its event handlers on the `change` event, and a consumer puts their event handlers on the `input` events, then the consumer's event handler would run first, and they would see the old, stale properties of the cre8 web component during that callback.



#### `stopPropagation` and `preventDefault` and re-firing events

[`stopPropagation`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) and [`preventDefault`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) do different things.

Consumers often use `preventDefault` on forms to keep them from submitting, usually because Javascript code is submitting the form with an ajax call instead.

cre8 sometimes needs to stop the propagation of an event, that is, keep consumer's event handlers from firing. That is the job of `stopPropagation`.

Some events are not cancellable, see https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable That only affects `preventDefault`, you can still stop the propagation of the event.



For example, cre8 might want to listen for an `input` event, stop the propagation of that `input` event, and then fire its own custom `input` event with additional details. If it doesn't call `stopPropgation`, then the consumer would see two events.

But for an event that is not `composed`, such as `change`, there is no need to `stopPropgation`. Because they are not `composed`, the consumer won't receive the `change` events from inside the shadow DOM at all, unless cre8 fires a custom event.

### React and React Wrappers
#### Synthetic Events

In React, when you use a property to add an event listener on a DOM element, then the events are synthetic. See https://react.dev/reference/react-dom/components/common

For example:
```jsx
<div onClick={handleOnClick} />
```

On https://react.dev/reference/react-dom/components/input React documents that:

> `onChange``: An [Event handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Required for [controlled inputs](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable). Fires immediately when the input’s value is changed by the user (for example, it fires on every keystroke). Behaves like the browser [input event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).

That is an oversimplification though, and the exact behavior is considered an implementation detail of React and not documented.

The synthetic events do have a ``.nativeEvent` property.

```jsx
export const TestEvents = () => (
  <form>
    <input type="text" name="text" onChange={(e) => console.log('input text', e.nativeEvent.type)} />
    <input type="checkbox" name="checkbox" onChange={(e) => console.log('checkbox', e.nativeEvent.type)} />
    <input type="radio" name="radio" value="c" onChange={(e) => console.log('radio1', e.nativeEvent.type)} />
    <input type="radio" name="radio" value="d" onChange={(e) => console.log('radio2', e.nativeEvent.type)} />
    <select onChange={(e) => console.log('select', e.nativeEvent.type)}>
      <option value="a">A</option>
      <option value="b">B</option>
    </select>
  </form> 
```

Using the above code, you can see that React 18 in Chrome uses `input` for text inputs, `change` for `<select>` elements, and the `click` event for checkboxes and radios.

#### Native DOM Events in React

It is possible to use the native DOM events in React. Typically you would use the `useRef` hook to get a DOM reference, and a `useEffect` hook which uses the ref to call `addEventListener`.

While usually React developers use the properties method to listen for events, there's a few different versions you might use the browser native API.

For example, in a previous version of cre8 Web Components, we forgot to map the custom `close-modal` event that `<cre8-modal>` fires, so the `onModalClose` property was not available.. Here is an example how the native event listeners were used instead by the consumers:

```tsx
import { type ComponentProps, type ReactNode, useEffect, useRef } from 'react';
import { cre8Modal } from '@cre8/cre8-react';
import { type cre8Modal as cre8ModalElement } from '@cre8/cre8-wc/components/modal/modal';
import styles from './modal-wrapper.module.scss';

type cre8ModalProps = ComponentProps<typeof cre8Modal>;

export interface ModalWrapperProps extends cre8ModalProps {
  className?: string;
  isActive: boolean;
  notDismissible?: boolean;
  ariaLabel?: string;
  testId?: string;
  handleCloseClick?: () => void;
  children?: ReactNode;
}
export function ModalWrapper({
  className,
  isActive,
  handleCloseClick = () => null,
  notDismissible = false,
  ariaLabel,
  testId,
  children,
  ...props
}: ModalWrapperProps) {
  const ref = useRef<cre8ModalElement>(null);
  useEffect(() => {
    const element = ref.current;
    element?.addEventListener('close-modal', handleCloseClick);
    return () => {
      window.document.body.style.overflow = 'visible';
    };
  }, []);
  return (
    <cre8Modal
      className={`${className} ${styles.modalWrapper}`}
      ref={ref}
      isActive={isActive}
      notDismissible={notDismissible}
      aria-label={ariaLabel}
      data-test-id={testId}
      {...props}
    >
      {children}
    </cre8Modal>
  );
}

export default ModalWrapper;
```


#### Mapping Events in `@lit/react`

See https://lit.dev/docs/frameworks/react/#events

There's a couple of gotchas here.

First ask yourself, is the event composed?

All of the built-in events that React supports **and that are composed** are automatically mapped by `@lit/react` and do not need manual mapping.

Any custom events that cre8 fires will need to be mapped, such as the 'close-modal' event that cre8Modal fires, or the custom 'change' event that `cre8Select` fires in response to the built-in, non-composed `change` event.

You can also use the mapping to map one name to another event. For example, React developers typically use `onChange` for `<input>`s and `<select>`s, so it makes sense to map that to something. For native elements, React maps `onChange` to the `input` event for some elements, and to `change` for others, and even to `click` sometimes, and so we'll want to do something similar.

Double check any mapped events against that cre8 component's implementation and look for timing bugs. For example, if you map something to the `input` event, but the component internally updates its state based on the `change` event (which fires after `input`), then consumers will see stale values!

## Component directory structure:

The design system's component directory (inside `src/components`) contains all of the design system's components. The structure is as follows:

```
|--component-name
|----test/
|------component-name.test.ts
|----component-name.scss
|----component-name.stories.ts
|----component-name.ts
```

- `test/component-name.test.ts` contains the unit tests for the component
- `component-name.scss`contains the styles for the component. All components must include a `.scss` file with the exception of [compound components](#compound-components)
- `component-name.stories.ts` contains all the Storybook [stories](https://storybook.js.org/basics/writing-stories/) for the component. All components must include a `.stories.ts` file with the exception of [compound components](#compound-components)
- `component-name.ts` contains the TypeScript source code for the component

## Component Rules and Considerations

### Exactly one component per directory and per folder

Components in this library exist in a flat structure so each component directory needs to contain exactly one component file. Certain components may require several components to properly function (for instance, a `modal` may consist of `modal-header`, `modal-body`, and `modal-footer` subcomponents), and these components should live as siblings in the `src/components/` directory.

---

### Working with pages

Pages live in the `.storybook` directory of the project. These do not live in `src` since they are not packaged up with the design system components and assets. These take on the same structure as the components above:

```
.storybook
--pages
----PageName
------PageName.js
------PageName.stories.js
```

- `PageName.js` contains the HTML and components with mock data applied to render the page
- `PageName.stories.ts` contains all the [stories](https://storybook.js.org/basics/writing-stories/) for the page.

**Pages** follows this organizational structure:

```
Pages
--Page Name
----Default
----Additional States (as needed)
```

### Working with recipes

**[Recipes](https://bradfrost.com/blog/post/design-system-components-recipes-and-snowflakes/)** are specific compositions of design system components (for the most part) that are to be consistently used across a product, but aren’t agnostic enough to live in the cre8 Web Components core library. Like pages, recipes live in the `.storybook` directory of the project since they are not packaged up with the design system. Recipe components may be revisited and pulled into cre8 Web Components at a later date if they are deemed to be reusable enough to move into the design system library.

Recipe components live in `.storybook/common-patterns` (TODO: for now) and take the following shape in Storybook:

```
Recipes
--Component Name
----Component Stories
```

Recipe components should _not_ include the `.cre8-` CSS prefix, since they are not part of the design system (so a recipe could look like `.c-recipe-name`). However, the other design system CSS conventions should be followed in order to make refactoring into the design system as easy as possible.

### Recipe examples

A good example a recipe is a `product-card`. Because cre8 spans so many different brands, these brands may want some structure to cards but the flexibility to adjust positioning of items within a card. The base `cre8-card` would contain the card outlines, shadows (if they exist), and the header, body and footer slots for other cre8 components or custom application-specific HTML To be written. Here's an example of a product card that may exist in 1 brand:

```html
<cre8-card class="brand-1-product-card">
  <img class="brand-1-product-card__image" slot="header" src="path/to/image.png" alt="card image" />
  <cre8-heading class="brand-1-product-card__heading" headingTagName="h3" variant="title-large">Brand 1 Product Card Heading</cre8-heading>
  <cre8-text-passage class="brand-1-product-card__text-passage">This is a description for brand 1's product card</cre8-text-passage>
  <cre8-button-group class="brand-1-product-card__button-group" slot="footer">
    <cre8-button text="Buy Now"></cre8-button>
    <cre8-button variant="secondary" text="More Details"></cre8-button>
  </cre8-button-group>
</cre8-card>
```

The base `cre8-card` and the other cre8 components that are nested inside take care of the majority of the styling that needs to be added for this card. This composition adds an image to the card header, the `cre8-heading` and `cre8-text-passage` to the card body (no slot name needed), and adds the `cre8-button-group` to the card footer. This header, body, and footer setup is in place to allow cards to have the same height if they are placed into a `cre8-grid`. It also allows for the images, the heading and description, and CTAs in the footer to all be aligned, even if the content is longer in 1 card. The card body expands to take up the remaining space so all cards take the height of the tallest card if possible.

Some of the only styling that needs to happen is spacing between the heading and description and possibly some spacing adjustments below the image or above the buttons at the bottom. What's nice about this is that you're not shipping this with the system, so other teams aren't constrained to this layout. If another brand needed its own product card where the image sits to the left of the text instead of above, they could add their own HTML and CSS inside of a different base `cre8-card` to create that layout. You'd get the basic look and feel from the base card and can adjust if needed based on the business needs of a brand.

Recipes can be as locked down as the need to be, since these can be integrated into the business logic of an application or used as a content editor option in a CMS. It depends on what the needs are from an brand or application standpoint at this layer.

---

## Custom Events

Firing `CustomEvent`s in Lit are an important way for framework-specific wrappers and applications to latch onto and change certain reactive properties within the component. All cre8 Web Components use the `Cre8Element.ts` base JS class which has a `dispatch` event built into it to create a consistent way of authoring event emitters. This base element allows users to add `this.dispatch` to a component code method:

```ts
handleOnOpen() {
  this.isActive = true;
  this.dispatch({ eventName: 'close', detailObj: { isActive: this.isActive } });
}

```

`this.dispatch` consists of an `eventName` which is used to pass in a function from the outside and a `detailObj` which allows a user to pass in the `@property` they want to expose to applications. This gives the ability for users to run another function at the application-level from the outside. It also allows access to the property value from inside the component to use to trigger other events at the application. Here is an example of logging the `isActive` interactive property to the console when the `modal` is closed:

```ts
<cre8-modal @close=${(e) => { console.log(e.detail.isActive)}}>
```

While this is only a simple `console.log`, functions can be passed into these events as well and then use internal component properties to align application or framework (e.g. React) states with internal reactive property values so that those are always aligned. If you add custom events to your components, be sure to update your stories so the `Actions` tab in addons can fire that event. Here is an example story with `actions` linked up to an eventName:

```ts
export default {
  title: 'Components/Tabs',
  component: 'cre8-tabs',
  parameters: {
    status: {type: 'stable'},
    actions: {
      handles: ['tabChange'],
    },
  },
};
```

You can also trigger these by adding child actions to the parent stories file's actions (e.g. a radio-field-item custom event within a radio-field story's actions). These custom events should be added to React's stories' actions as well. For more information on how custom event emission works, go to Lit's Documentation on custom events.
