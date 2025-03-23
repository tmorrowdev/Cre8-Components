# Contributing

Please reference our centralized [contributing documentation](https://confluence.sys.cigna.com/x/QR8fJg) that this project shares with other Council of Ricks projects.

### Set up your dev environment

See [package.json](./package.json) and [README.md](./README.md) for more information regarding dependencies of the project.

To install locally, run the following:

yarn and node 16 must be installed! try `brew install node@16` and `brew install yarn`.

```sh
git clone https://git.express-scripts.com/ExpressScripts/cre8-web-components.git
cd cre8-web-components
yarn
yarn start
```

__Note__: If any issues arise with running locally, follow these steps clean everything:
- `yarn cache clean`
- Delete node_modules (at root level and under cre8-wc)
- Delete the contents of `yarn.lock` (keep the file)
- `yarn`

## Building UI Components

When contributing code for an existing component, you'll usually edit existing files in an existing structure. But, if you're creating a brand-new component, you'll need to use
```
yarn cre8-wc:plop
```
which will create the needed files and a skeleton of how the component should be structured. Once the component, is created using 
```
yarn cre8-react:plop
``` 
will create a matching react component that points to our web component.


### __Note__: For more in depth guidelines for how components should look please see [CODE_GUIDELINES.md](./packages/cre8-wc/docs/CODE_GUIDELINES.md)


## Component File (my-component.ts)

### 1. Properties: 
Sufficiently comment the property describing what it is for, and describing any variants of the components that would be described by the prop (i.e. `error` might describe what the component looks like with an error state). Used the `property` decorator from `lit/decorators` and provide the data type as well as whether or not the prop is required. 

__Note__: If there is a default variant we prefer to have that variant not correspond to variant value but rather have the default css reflect that variant instead. (i.e. we would rather have `variant?: 'error' | 'success'` than ``variant: 'error' | 'success' | 'default' = 'default` and have the base css class just be the default variant).

Examples: 
```
/**
   * Positions the tooltip panel absolutely to the trigger
   * - **default** positions the tooltip panel below the trigger
   * - **top** positions the tooltip panel below the trigger
   * - **left** positions the tooltip panel below the trigger
   * - **right** positions the tooltip panel below the trigger
   */
  @property()
  position?: 'top' | 'left' | 'right';
```

__NOTE__ If the property is of type `boolean`, we should also reflect the property as an attribute on the custom  element. The syntax is shown in the example below: 

```
  /**
   * The knockout variant for the tooltip
   * 1. If is true, the tooltip background is white
   * 2. If is false, the tooltip background is gray
   */
  @property({ type: Boolean, reflect: true })
  knockout?: boolean;
```

### 2. Functions: 
Any web component lifecycle methods or handler functions for actions like `@click` and really all kinds of functions would be located under the props and above the `render()` method. These also should be accompanied with sufficient descriptors like the props. Note that below the use of numbering in the comment very clearly communicates what the functions is doing. Though it is perhaps a little more information than needed, being over explicit is always preferable to the alternative.

Examples:
```
/**
   * Connected Callback Lifecycle
   * 1. Add window mouseover event listener
   * 2. Add window mouseout event listener
   * 3. Add mousedown event listener
   * 4. Set the id and ariaDescribedBy
   */
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseover', this.toggleActive); /* 1 */
    this.addEventListener('mouseout', this.removeActive); /* 2 */
    this.ariaDescribedBy = this.ariaDescribedBy || nanoid(); /* 3 */
  }
  ```
### 3. CSS classes: 
Inside the render method, declare a const `componentClassNames` which maps all of the variations of the component as described by the properties into CSS classes where we can directly style these separate variations. Every instance of a component should have the base CSS class as well all of the desired variant classes.

__Note__:  Properties like `isActive` we are using universal class that many components might have. This improves consistency across the app.

Example:
```
const componentClassNames = this.componentClassNames('cre8-c-some-component', {
      'cre8-c-some-component--left': this.position === 'left',
      'cre8-c-some-component--right': this.position === 'right',
      'cre8-c-some-component--knockout': this.knockout,
      'cre8-is-active': this.isActive,
    });
```

### 4. HTML: 
Inside the render is where the actual HTML code will be located. A structure where each individual element has a class that describes it is desirable, even if that element does not need any extra styling. Accessibility is a very big priority for customer facing Cigna applications. Use as many native HTML elements as possible. Some important other items for accessibility:

  - Does the component have a trigger or a label element that would relate to it? Use `aria-describedby=${this.ariaDescribedBy}` on the trigger and `id=${this.ariaDescribedBy}` on the recipient element.
  - Does the element benefit from having a field note that will show for screen readers when the element is in focus? Well adding a `<cre8-field-note id=${ifDefined(this.ariaDescribedBy)}>` might be valuable in tandem with `aria-describedby=${this.ariaDescribedBy}` on the element being described.
  - Again: use native HTML elements when possible, and follow conventions such as labels on checkboxes and radio buttons with the `for` attribute.
  - `role` is a very important attribute for accessibility, use it!

  Example:
  ```
  <div class="${componentClassNames}">
    <div class="cre8-c-tooltip__trigger" aria-describedby=${this.ariaDescribedBy} tabindex=${0} @focus=${this.toggleActive} @keydown=${this.handleKeydown}>
      <slot name="trigger"></slot>
    </div>
    <div class="cre8-c-tooltip__panel" id=${this.ariaDescribedBy} role="tooltip">
      <slot></slot>
    </div>
  </div>
  ```

  A very important note in this section is how important composability will be for atomic web components. In order to design web components like Legos, we need to make sure they are composable! We accomplish this with slots, and prioritize this in almost all cases, including over making these components "safe" for developers utilizing our component library. Naming slots like `name="header"` (with the parent referring to this with `slot="header"` on the given element) is a good way of handling multiple slots for a given component so you can style a header slot correctly and place it where you want.

  Example: 
    ```
    <div class="cre8-c-radio-field__body">
      <ul class="cre8-c-radio-field__list" role="list">
        <slot></slot>
      </ul>
    </div>
    ```
    this in the webcomponent would correspond to the following when implementing the legos:
    ```
    <cre8-radio-field>
      <cre8-radio-field-item label="Default"></cre8-radio-field-item>
      <cre8-radio-field-item label="Default 2"></cre8-radio-field-item>
      <cre8-radio-field-item label="Error" ?isError=${true}></cre8-radio-field-item>
    </cre8-radio-field>
    ```


## CSS File (my-component.scss)

Here are some guidelines for css file structure, for a more in-depth description please refer to [CODE_GUIDELINES.md](./packages/cre8-wc/docs/CODE_GUIDELINES.md).
 
- In a similar way to the properties in the component file, having clear comments describing the purpose of each css class is very important! And yes this includes selectors like `:hover` as well.
- Avoid nesting when possible, making the css as flat as possible will be crucial to avoid undesired priority errors where css attributes will have specificities that are often hard to predict.
- Instead of hard coding pixel values for width/height/padding... etc, we use a convention of `size(x)` where, `size(1)` is is equivalent to 8 pixels. Try to stick to whole numbers or at least denominations of 4 when possible. (Note: Border width should have tokens)
- For most all other values in the CSS, we want to use CSS variables defined in our [Design Tokens Repo](https://git.express-scripts.com/ExpressScripts/cre8-design-tokens). If you are ever hardcoding color for example, there is a token for that. Most of your file should look like `color: var(--cre8-color-content-knockout);` except for CSS properties like `display`,`flex-direction`, `position`, visibility and afor mentioned pixel length cases.


Example:
```
/** 
 * Radio field item inner circle
 */
.cre8-c-radio-field-item__inner-circle {
  cursor: pointer;
  height: size(1.5);
  width: size(1.5);
  background: var(--cre8-color-content-brand);
  border-radius: var(--cre8-border-radius-round);

  /** 
  * Radio field item inner circle error
  */
  .cre8-c-radio-field-item--error & {
    background: var(--cre8-color-bg-error-strong);
  }
}
```

## Stories File (my-component.stories.ts)

This JavaScript file, denoted as blah.stories.ts is where all of the visual testing stems from. Storybook is an incredibly powerful tool allowing the component to come alive in the browser. This is the file where all the variations of the given component should be layed out so a complete visual regression of the component can be completed just referencing this storybook pages in browser. There are some semantics that should be followed when creating all the stories for your component:

- The object exported at the top of the page gives many details about the component that will be displayed in storybook. This includes: 
  - `component`: auto generated based on plop command
  - `title`: the name of the component as well as the path to the it's page, i.e. `Molecules/Selection/My Component` would be located under the selection section which its self is located in the Molecules section.
    - Important Note: Components should be located in one of 3 parent folders:
      1. Supported: This indicates that the component is accepted, and is out of the first draft and as far as the beta is concerned is ready for use.
      2. InProgress: This indicates the component is somewhere along the process of completion, it is possible it works but hasn't gone through the whole process of acceptance.
      3. Unsupported: This indicates that the component development process hasn't started for these components and are likely demo components with many hardcoded values.
  - `parameters`: this includes attributes like
    -  `status: { type: 'beta' }` (auto generated)
    - `layout: 'centered'` centers the component in the storybook page example
    -  `actions: {handles: ['open', 'close']})` (to indicate the different actions the user can take with the component, such as toggling or opening))
    - `withDesign: {type: 'figma', url: 'https://www.figma.com/my-component'}` links to the design page
    - `decorators: [withActions],` adds interactive actions to storybook

- The first story of the bunch is the default version of the component and has the passed in value of a spread of all arguments the component can receive (i.e. 
```
`export const Default = (args) => html`
  <cre8-my-component ${spread(args)}>
    Lorem ipsum dolor sit amet, sed do eiusmod tempor
  </cre8-my-component>
`;`
```
)
- As mentioned above each indiviual variation or implementation case of the component should have its own story, such as
```
export const Knockout = (args) => html`
  <cre8-my-component ${spread(args)} ?knockout=${true}>
    Lorem ipsum dolor sit amet, sed do eiusmod tempor
  </cre8-my-component>
`;
```

Until this can be automated, every time you add a new component, or new attributes or props, etc, run `yarn build:custom-elements.json` to regenerate
`packages/cre8-wc/.storybook/custom-elements.json`, which is how Storybook automatically pulls in props, jsdocs, etc.

### Story Templating and Documentation

Stories for storybook use auto generated documentation by default. We can control the layout of all stories by setting a document template with [an MDX file per Storybook's instructions](https://storybook.js.org/docs/7.3/react/writing-docs/autodocs#with-mdx). This allows us to adjust the layout of all stories by default, including different Doc Blocks in different order from the Storybook default. We configure the project to look for this template by importing it into the storybook's `preview.js` file.

Keep in mind that:
- You can have more than one document template. 
- Storybook allows for applying a document template at the project or an individual component level. However, the recommendation is to use a single MDX file if you only need to override the documentation layout for a single component. 
- An MDX file used for a specific component will take precedent over the default project template. You can import stories defined elsewhere into this MDX file.


```
- components
  - some-component
    - component.ts
    - component.stories.ts
    - component.mdx <- Has an MDX file, this will be used by Storybook
  - a-different-component
    - a-different-component.ts
    - a-different-component.stories.ts
```

For better documentation, our recommendation is to use JSDocs as much as possible by putting best practices into the code's comments per component file. This provides the consuming developer with inline documentation when they consume the component. It's also read by Storybook during the auto-docs generation. 

## Testing File (my-component.test.ts)

TODO: Add testing contribution guidelines when they are nailed down.

...

## Intake Process for other teams

TODO: Detail process for intake of other team's contributions!

...
