# cre8-accordion-item


The accordion item component delivers large amounts of content in a small space
through progressive disclosure. That is, the user gets key details about the
underlying content and can choose to expand that content within the constraints
of the accordion item. Accordion Items work especially well on mobile interfaces or
whenever vertical space is at a premium.

## HOW TO USE
Avoid “nested” accordion items—that is, collapsible content within collapsible content.
This type of pattern goes against UX best practices.

The Cre8 accordion item header allows for two sizes:
'sm' [cre8-typography-title-default] or 'lg' [cre8-typography-title-large]

A chevron is used to indicate the “expand/collapse” action, though the entire
header area is clickable for the same action.

**NOTE**: The header of the accordion item uses h tags so be sure to choose the headingTagVariant that
fits into the hierarchy of your html page layout. THIS WILL NOT CHANGE THE APPEARANCE OF THE HEADER.

## Properties

| Property            | Attribute           | Type                                           | Default | Description                                      |
|---------------------|---------------------|------------------------------------------------|---------|--------------------------------------------------|
| `accordionItemId`   | `accordionItemId`   | `string \| undefined`                          |         | <br />Optional custom id for the accordion item, if one is not set, a random id is generated for you. |
| `brandHeader`       | `brandHeader`       | `boolean \| undefined`                         |         | <br />Controls whether the header takes on the theme's 'brand-strong' color |
| `heading`           | `heading`           | `string`                                       |         | <br />Controls the text content of the Accordion Item heading. |
| `headingTagVariant` | `headingTagVariant` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | "h3"    | <br />Purely meant to help the user structure the HTML page hierarchy. Does not change the<br />header size. Defaults to 'h3' |
| `iconBefore`        | `iconBefore`        | `boolean \| undefined`                         |         | <br />Controls the positioning of the dropdown icon in relation to the text, true puts the icon before the text<br />and false/undefined default the icon to the opposite side of the accordion item |
| `isActive`          | `isActive`          | `boolean \| undefined`                         | false   | <br />When true, the Accordion Item is opens, when false it closes; |
| `size`              | `size`              | `"sm" \| "lg"`                                 | "sm"    | <br />Users can choose between two header sizes:  'sm' [title-default] or 'lg' [title-large]. |
| `tertiaryIcon`      | `tertiaryIcon`      | `boolean \| undefined`                         |         | <br />Controls the appearance  of dropdown icon as being an icon-only button. true renders the tertiary variant and<br />false/undefined renders the default secondary appearance. |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The body of the accordion item will be any valid html<br />inserted between the cre8-accordion-item opening and closing tags. |

## CSS Shadow Parts

| Part                   | Description                                      |
|------------------------|--------------------------------------------------|
| `::part('body')`       | The container around the expanding body section. |
| `::part('body-inner')` | The container around the slot into which any user provided HTML is inserted. |
| `::part('button')`     | The button containing the header text and the animated icon. |
| `::part('header')`     | The container around the interactive header.     |
| `::part('icon')`       | The animated icon that revolves on click.        |


# cre8-accordion

The component is a vertically stacked list of headers that reveal or hide sections of related content on a page.
The header title gives the user a high level overview of the content allowing the user to decide
which sections to expand for the information.

Accordion contains Accordion Items as children. This component is the wrapper for grouping related accordion items.

Users can select different border types: default (no border), rectangle, rounded bottom, and rounded.

## Properties

| Property     | Attribute    | Type                                             | Default | Description                                      |
|--------------|--------------|--------------------------------------------------|---------|--------------------------------------------------|
| `borderType` | `borderType` | `"rectangle" \| "rounded-bottom" \| "rounded" \| "none" \| undefined` |         | borderType                                       |
| `hasDivider` | `hasDivider` | `boolean \| undefined`                           | false   | <br />When it is true, the inner dividers are displayed;<br />if it is false, the inner dividers are not displayed |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-alert

The general purpose of an alert or notification is to draw the user’s attention
and provide the user with timely, relevant information.

## Alert Styles:
- There are 6 statuses for 6 types of alerts: 'error', 'info', 'notification', 'neutral', 'warning', 'success'.
Each alert will have different icon to be displayed in the alert.
- Users can select two types of alert variants: 'standalone', or 'banner'.
- User can also choose the alert should be emphasized or not. There are two options: subtle or strong.
- User can add button or link in the alert.
If users choose to emphasize the alert (**strong**), user needs to used **"inverted"** prop in button or link.
- User can choose whether the alert can be dismissed or not

## Properties

| Property         | Attribute        | Type                                             | Default      | Description                                      |
|------------------|------------------|--------------------------------------------------|--------------|--------------------------------------------------|
| `ctaBody`        | `ctaBody`        | `string`                                         | "undefined"  |                                                  |
| `dismissed`      | `dismissed`      | `boolean \| undefined`                           |              | Dismissed property<br />1) State that changes to true and is removed when the banner is dismissed |
| `emphasis`       | `emphasis`       | `"strong" \| "subtle"`                           | "subtle"     |                                                  |
| `headerText`     | `headerText`     | `string`                                         | "undefined"  |                                                  |
| `iconAlert`      | `iconAlert`      | `string`                                         | "undefined"  |                                                  |
| `iconTitle`      | `iconTitle`      | `string \| undefined`                            |              | Icon title used for the icon alt text            |
| `notDismissible` | `notDismissible` | `boolean \| undefined`                           |              | Dismissable property<br />1) Adds the ability to close when toggled to true |
| `status`         | `status`         | `"error" \| "info" \| "notification" \| "neutral" \| "warning" \| "success" \| undefined` | "info"       | The alert type.                                  |
| `variant`        | `variant`        | `"standalone" \| "banner"`                       | "standalone" | The alert variant.                               |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `onDismiss`           | `(): void`                                       | On banner dismiss<br />1) Function that toggles dismissed to true and removes the banner from the UI |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-badge

Status badges are used most often in tables or fat rows in a list.
These Components serve a contextual purpose and don't provide any functionality.
Badges should be organized inside a dedicated table row communicating status such as pending, approved or rejected.

## Properties

| Property  | Attribute | Type                  | Default     | Description                                      |
|-----------|-----------|-----------------------|-------------|--------------------------------------------------|
| `status`  | `status`  | `string`              |             | Status (a color variant prop)<br />- **neutral** (default) renders a badge with a neutral state treatment<br />- **success** renders a badge with success state treatment<br />- **warning** renders a badge with warning state treatment<br />- **error** renders a badge with error state treatment<br />- **info** renders a badge with information state treatment<br />- **attention** renders a badge with attention state treatment |
| `svg`     | `svg`     | `string \| undefined` |             | SVG as a raw string<br />- For badges with icons, the icon is defined by this prop<br />- Pass in a raw svg as a String. We use raw string loader for this but any method of getting raw svgs will do<br />- Import example:`import svgFeedback from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Regular/Feedback.svg?raw';`<br />- [cre8-icons Github repo](https://github.com/tmorrowdev/cre8-icons) This is the Github<br />repo for Cre8 icons, which includes a link to the storybook as well as relavant information for new icons |
| `text`    | `text`    | `string`              | "undefined" | The badge text                                   |
| `variant` | `variant` | `string`              |             | Background Style Variant<br /><br />- **dark\|undefined** (default) renders a badge with a dark background<br />- **light** renders a badge with a light background<br />- **white** renders a badge with a white background |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-band

## Properties

| Property     | Attribute    | Type                     | Description                                      |
|--------------|--------------|--------------------------|--------------------------------------------------|
| `fullHeight` | `fullHeight` | `boolean \| undefined`   | Full height variant<br />1) Sets the height to 100% |
| `variant`    | `variant`    | `"branded" \| undefined` | Gradient variant<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**1** renders the band with the set gradient background</li><br /></ul><br /></cre8-text-passage> |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description      |
|------|------------------|
|      | The band content |


# cre8-breadcrumbs-item

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The component content, the expected slotted content is a Cre8 Link or a String for the "terminal node" |


# cre8-breadcrumbs

The breadcrumbs component is a secondary navigation pattern that helps a user understand where the user is located.
The breadcrumbs component shows the users their current location relative to the information architecture
It enables the users to quickly move up to a parent level or previous location.

## How to Use

- Import 'Breadcrumbs' component.
- Add the pages in the path of the breadcrumbs using `cre8-breadcrumbs-item`.
All the pages in the breadcrumbs component should be interactive.
- All the page should link to their respective pages (except the current page) using `cre8-link`.
- The current page is included in the breadcrumbs trail.
- The current page is always the last text listed and is not an interactive link.

## Properties

| Property       | Attribute      | Type     | Default       | Description                                      |
|----------------|----------------|----------|---------------|--------------------------------------------------|
| `navAriaLabel` | `navAriaLabel` | `string` | "breadcrumbs" | aria-label attribute to designate at name for the nav. Can be override by user |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-button-group

## Properties

| Property      | Attribute     | Type                                   | Description                          |
|---------------|---------------|----------------------------------------|--------------------------------------|
| `orientation` | `orientation` | `"responsive-full-width" \| undefined` | Responsive Button Group (for modals) |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-button

The size and state of buttons on the screen serve as visual cues for the user
about what they can do and what they should do next.
They indicate the availability and priority of the action on the page.

- Buttons are a single call-to-action where a single click performs that action
- Use buttons when you are performing an action which is almost always on the same page
- Use a link instead of a button when you're navigating to another place

## How to Use

Buttons are distinguished by three key properties:

- **Visual Priority**: Style and size: Primary, Secondary, or Tertiary styles;
  each with large and small variations
- **State**: Interaction state: hover/click (press), focus, disabled,
  and submitting/loading (only for large buttons)
- **Brand**: Styles determined by the site or component theme

### Usage Guidelines

Primary, Secondary and Tertiary styles emphasize or de-emphasize an action. They also define
background, font style, and border colors. Large and small sizing assists with visual priority by defining button
heights, left and right internal padding, and font-size.

#### System Feedback
Each button has a default and hover/click (press) state that give the user feedback
that they have successfully interacted with a button.
Button presses should always be combined with other types of timely system feedback.
Examples of system feedback may be a page refresh, exposing additional controls or content,
dialogs, alerts and notifications.
If there is perceived a delay in system response, generally due to technical constraints,
provide a progress or loading indicator.

#### Button Text

- Button text should be as short and simple as possible, ideally a maximum of 3 words.
- Use Title Case for readability.
- They should not include punctuation (exception: "Loading...").
- They should not be used as an indicator of what happens on the next page, or as a substitute
for a progress meter.

#### Button With Icon

For button with icon:
- **iconRotateDegree** & **iconFlipDirection** props are optional.
- They are used to set up the correct direction for icons, for example,
arrows, caret up or caret down.

#### Button Styling

- DO use only the styles of the brand you are working on.
- DO NOT combine styles, even if the page is co-branded.

#### Button Sizes
- DO always pair like sizes together and maintain the hierarchy of Primary and Secondary/Tertiary.
- DO NOT mix sizes of buttons when they are used together as a group.

#### Input Pairing

Primary and Secondary buttons may be paired with input fields.
Only one Primary button may appear on each screen.
Use the Secondary button when there are multiple in-context buttons
and/or when there is an emphasized page level button.
When used in a form context, the button's `type` needs to be `submit` to pass along form data.

- DO use only large buttons with input fields.
- DO NOT use small buttons with input fields.

## Properties

| Property             | Attribute            | Type                                             | Default     | Description                                      |
|----------------------|----------------------|--------------------------------------------------|-------------|--------------------------------------------------|
| `ariaLive`           | `ariaLive`           | `"polite" \| "assertive"`                        | "assertive" | Controls whether your loading status update to voiceover users will occur<br />immediately (used for more urgently needed updates) using `assertive` or at the next convenient<br />pause in their navigation using `polite`. |
| `buttonAriaExpanded` | `buttonAriaExpanded` | `boolean \| undefined`                           |             | Button aria expanded attribute                   |
| `disabled`           | `disabled`           | `boolean`                                        |             | Disabled attribute                               |
| `field`              |                      | `HTMLButtonElement`                              |             |                                                  |
| `fullWidth`          | `fullWidth`          | `boolean`                                        |             | Full width button                                |
| `hideText`           | `hideText`           | `boolean \| undefined`                           |             | Visually hide button text. Text is still accessible to assistive technology.<br />Use this for icon-only buttons for accessibility |
| `href`               | `href`               | `string \| undefined`                            |             | <br />Provide this property if you intend to use button styles for an anchor tag (`<a>`).<br />This changes the component markup from `<button>` usage to `<a>` instead. |
| `iconFlipDirection`  | `iconFlipDirection`  | `string \| undefined`                            |             | iconFlipDirection is used for <cre8-icon> to set the icon in the correct direction |
| `iconName`           | `iconName`           | `string \| undefined`                            |             | Deprecated: iconName, use svg instead<br />Icon name if including an icon within a button.<br />Must include the icon's position with `iconPostion`. This prop is used for <cre8-icon-legacy> |
| `iconPosition`       | `iconPosition`       | `"before" \| "after" \| undefined`               | "undefined" | Icon position. Must include the name of the icon with `iconName`<br /><br />- **before** places the icon before the button text<br />- **after** places the icon after the button text |
| `iconRotateDegree`   | `iconRotateDegree`   | `number \| undefined`                            | 0           | iconRotateDegree is used for <cre8-icon> to set the arrow in the correct direction |
| `inverse`            | `inverse`            | `boolean`                                        |             | Inverse attribute                                |
| `loading`            | `loading`            | `boolean`                                        |             | * Changes styling to an active state with a spinning icon.<br />* Adds accessibility treatment by:<br />  * announcing via voiceover when the loading success/error state via a aria-live region<br />  * setting `aria-disabled`<br />* Disables click events / form submitting while allowing focus (for accessibility) |
| `loadingComplete`    | `loadingComplete`    | `boolean`                                        |             | * Variant of the loading button that:<br />  * Removes loading spinner<br />  * Informs the SR user that the loading status is now complete, with visually hidden text in the live area |
| `neutral`            | `neutral`            | `boolean \| undefined`                           |             | This property is for a neutral button propery mainly used for the secondary or tertiary button variant. |
| `rel`                | `rel`                | `string \| undefined`                            |             | Rel if this is an <a> element - this swaps <button> for <a> |
| `size`               | `size`               | `"sm" \| "lg" \| "md"`                           | "md"        | Size variants add another way to increase or decrease visual priority of a button.<br />- **sm** Shrinks the button typography and overall size from the default. Use when vertical space is constrained.<br />- **md** This is the default value for the size.<br />- **lg** Increases the button typography and overall size from the default. |
| `splitButtonType`    | `splitButtonType`    | `"text" \| "caret" \| undefined`                 |             | These two subvariants of the split button style the two seperate buttons to style as a singular button |
| `svg`                | `svg`                | `string \| undefined`                            |             | svg as a raw string<br />- For button with icon, the icon is defined by this prop.<br />- Pass in a raw svg as a String for using <cre8-icon><br />- Must include the icon's position with `iconPostion`. |
| `target`             | `target`             | `"_blank" \| "_self" \| "_parent" \| "_top" \| undefined` |             | Target attribute for a link if providing `href` to style a link as a button<br />- **_blank** yields a link that opens in a new tab<br />- **_self** yields a link that loads the URL into the same browsing context as the current one.<br />  This is the default behavior<br />- **_parent** yields a link that loads the URL into the parent browsing context of the current one.<br />  If there is no parent, this behaves the same way as _self<br />- **_top** yields a link that loads the URL into the top-level browsing context.<br />  If there is no parent, this behaves the same way as _self. |
| `text`               | `text`               | `string \| undefined`                            | "Button"    | The button text. Should be as short and simple as possible, ideally a maximum of 3 words.<br />- Use Title Case for readability.<br />- Should not include punctuation (exception: "Loading...").<br />- Should not be used as an indicator of what happens on the next page, or as a substitute for a progress meter. |
| `type`               | `type`               | `"button" \| "submit" \| "reset"`                | "button"    | Type of button.<br />- **button** (default) button has no default behavior and does nothing unless provided some sort<br />of client-side trigger<br />- **submit** button for submitting form data to a server |
| `value`              | `value`              | `string`                                         |             | The value of the form field.                     |
| `variant`            | `variant`            | `"primary" \| "secondary" \| "tertiary" \| undefined` | "primary"   | Style variant<br />- **primary** renders the button used for primary actions. Presents highest visual priority.<br />  When grouped with other buttons, only one primary is allowed<br />- **secondary** renders a secondary button. Presents a lower visual priority<br />- **tertiary** renders a tertiary button. Presents the lowest visual priority.<br />  Should be used in limited amounts - consider if a link (`<a>`) would be more appropriate |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `formReset`           | `(): void`                                       |                                                  |
| `formResetCallback`   | `(): void`                                       |                                                  |
| `formSubmit`          | `(): void`                                       |                                                  |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-card

The card component acts a general container element sectioned off by slots: `header`, `body`, `footer`.

# How to Use
1. Wrap the card component tags around any html template code which has been properly imported into the file.
2. Decide the layout that best fits the designs assigned to your work.
Generally, we recommend visual elements appear in the `header` (optional slot),
while `body` remains reserved for custom html content that gives further context and meaning to the `header`.
3. The card defaults to a column and includes a `horizontal` directional variant.
If you have a card where the layout of the content is more aligned horizontally,
using the `horizontal` variant will ease the construction of your component
4. Finally, we typically recommend reserving the footer for any interactive elements
such as buttons for navigating to further information.


NOTE: Adjusting props not mentioned above may result in unpredictable states

## Properties

| Property  | Attribute | Type                                             | Description                                      |
|-----------|-----------|--------------------------------------------------|--------------------------------------------------|
| `align`   | `align`   | `"center" \| undefined`                          | Alignment variant<br />- **center** renders a card that has center aligned content/text |
| `variant` | `variant` | `"bare" \| "horizontal" \| "horizontal-bare" \| undefined` | Style variants<br />- **bare** renders a card without a border and without padding around the content<br />- **horizontal** renders a card with header, body, footer oriented in a row rather than a column<br />- **horizontal-bare** renders a card with header, body, footer oriented in a row rather than a column<br />  without a border and without padding around the content |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name     | Description                             |
|----------|-----------------------------------------|
| `body`   | The card's body content                 |
| `footer` | (Optional) Content in the card's footer |
| `header` | (Optional) Content in the card's header |


# cre8-chart

## Properties

| Property       | Attribute      | Type                      | Default |
|----------------|----------------|---------------------------|---------|
| `chartData`    | `chartData`    |                           |         |
| `chartOptions` | `chartOptions` | `object`                  | {}      |
| `chartType`    | `chartType`    | `keyof ChartTypeRegistry` | "bar"   |
| `isLoading`    | `isLoading`    | `boolean`                 | false   |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-checkbox-field-item

Checkbox Field Item is the combination of a checkbox input, label and field note.
Checkboxes can turn an option on or off.

Checkboxes should be used when the user is allowed to select one, none or multiple options
OR to "opt-in" (ex. I would like to receive the newsletter by email)
or as a required acknowledgement(ex. I've read the Terms and Conditions).
If the user can only chose one option from many, use `radio-field-item`.

## How to Use

- A checkbox is independent of all other checkboxes in the list,
  so checking one box should not uncheck the others in the group.
- Place checkbox options one on top of another vertically. Do not display them in a row horizontally.
- Avoid disabled and read-only states as much as possible.

## Universal Form Field Rules
- Unless indicated with the "(Optional)" label, all fields are assumed required.
  Minimize the number of optional fields to keep forms as short as possible.
- Always include a label written in sentence case.
- Avoid using the read-only and disabled states as much as possible.

## Properties

| Property                    | Attribute                   | Type                  | Default    | Description                                      |
|-----------------------------|-----------------------------|-----------------------|------------|--------------------------------------------------|
| `ariaDescribedBy`           | `ariaDescribedBy`           | `string`              |            | Checkbox fieldnote ariaDescribeBy                |
| `checked`                   | `checked`                   | `boolean`             |            | Checked State                                    |
| `disabled`                  | `disabled`                  | `boolean`             |            | Disabled State                                   |
| `errorNote`                 | `errorNote`                 | `string \| undefined` |            | The error field note that appears below the default field note |
| `errorText`                 | `errorText`                 | `string`              | "Error"    | Visually hidden text that always signifies that this is an error for screen reader usage |
| `field`                     |                             | `HTMLInputElement`    |            | Get the input element within the shadow root and set it to this.field |
| `fieldId`                   | `fieldId`                   | `string`              |            | Checkbox FieldId                                 |
| `fieldNote`                 | `fieldNote`                 | `string \| undefined` |            | Checkbox FieldNote                               |
| `fieldNoteIconName`         | `fieldNoteIconName`         | `string \| undefined` |            | Checkbox fieldnote icon name                     |
| `isError`                   | `isError`                   | `boolean`             |            | Changes the component's treatment to represent an error state |
| `isSuccess`                 | `isSuccess`                 | `boolean`             |            | Changes the component's treatment to represent a success state |
| `label`                     | `label`                     | `string \| undefined` |            | The checkbox label                               |
| `name`                      | `name`                      | `string`              |            | Checkbox name                                    |
| `required`                  | `required`                  | `boolean`             |            | Required property                                |
| `successNote`               | `successNote`               | `string \| undefined` |            | The success field note that appears below the default field note |
| `successText`               | `successText`               | `string`              | "Success"  | Visually hidden text that always signifies that this is successful for screen reader usage |
| `type`                      |                             | `"checkbox"`          | "checkbox" |                                                  |
| `validationAriaDescribedBy` | `validationAriaDescribedBy` | `string \| undefined` |            | Additional aria-describedby connection to id for additional success and error notes to be accessible |
| `value`                     | `value`                     | `string`              |            | The value of the form field.                     |

## Methods

| Method                        | Type                                             | Description                                      |
|-------------------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames`         | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`                    | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `fieldNoteAria`               | `(): string`                                     | Aria describedby string based on field notes and error/success notes<br />1) If both validationAriaDescribedBy (error/success note) and field note exists,<br />render both in the input's `aria-describedby` attribute<br />2) Otherwise, if only validationAriaDescribedBy exists, then render only that as<br />the `aria-describedby` attribute (input without field note initially, but then error/success is added).<br />3) Otherwise, render only the `ariaDescribedBy` property (field note only) |
| `formResetCallback`           | `(): void`                                       | Form reset callback<br />1) Set checked property to the default value and then set the input's checked attribute to that default value<br />2) Set the input's checked attribute to that default value<br />3) Set the element internals form data when the form is reset<br />4) Change the new value to the old value on reset |
| `initializeAria`              | `(): void`                                       | Initialize aria attributes                       |
| `renderSuccessErrorFieldNote` | `(): TemplateResult<1> \| null`                  | Render the success or error field notes<br />1. If there is a successNote, then return the field note with the success message and state.<br />2. If there is a errorNote, then return the field note with the error message and state. |
| `slotEmpty`                   | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`                | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event    | Type                                             |
|----------|--------------------------------------------------|
| `change` | `CustomEvent<{ name: string \| undefined; value: string; }>` |


# cre8-checkbox-field

Checkbox Field is the parent container for `checkbox-field-item`.
It is required to allow for grouping numerous checkboxes that need additional context (in the form of `<legend>`).
It also provides accessibility roles, aria attributes and field note messaging on the group.

See `checkbox-field-item` for more guidance on its usage.

## Properties

| Property             | Attribute            | Type                  | Description                                   |
|----------------------|----------------------|-----------------------|-----------------------------------------------|
| `ariaDescribedBy`    | `ariaDescribedBy`    | `string \| undefined` | Checkbox container fieldnote aria describe by |
| `fieldNote`          | `fieldNote`          | `string \| undefined` | Checkbox container fieldnote                  |
| `fieldNoteIconName`  | `fieldNoteIconName`  | `string \| undefined` | Checkbox container fieldnote icon name        |
| `fieldNoteIsError`   | `fieldNoteIsError`   | `boolean`             | Checkbox container fieldnote isError          |
| `fieldNoteIsSuccess` | `fieldNoteIsSuccess` | `boolean`             | Checkbox container fieldnote isSuccess        |
| `fieldNoteKnockout`  | `fieldNoteKnockout`  | `boolean`             | Checkbox container fieldnote knockout         |
| `label`              | `label`              | `string \| undefined` | Checkbox container legend label               |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The component content, which should be a set of `checkbox-field-item`s |


# cre8-danger-button

The size and state of buttons on the screen serve as visual cues for the user
about what they can do and what they should do next.
They indicate the availability and priority of the action on the page.

- Buttons are a single call-to-action where a single click performs that action
- Use Danger Buttons when you are performing an action that is potentially dangerous,
such as permanently deleting information
- Use a link instead of a button when you're navigating to another place

## How to Use

Danger Buttons are distinguished by three key properties:

- **Visual Priority**: Style and size: Primary, Secondary, or Tertiary styles;
  each with large and small variations
- **State**: Interaction state: hover/click (press), focus, disabled,
  and submitting/loading (only for large buttons)
- **Brand**: Styles determined by the site or component theme

### Usage Guidelines

Primary, Secondary and Tertiary styles emphasize or de-emphasize an action. They also define
background, font style, and border colors. Large and small sizing assists with visual priority by defining button
heights, left and right internal padding, and font-size.

#### System Feedback
Each button has a default and hover/click (press) state that give the user feedback
that they have successfully interacted with a button.
Button presses should always be combined with other types of timely system feedback.
Examples of system feedback may be a page refresh, exposing additional controls or content,
dialogs, alerts and notifications.
If there is perceived a delay in system response, generally due to technical constraints,
provide a progress or loading indicator.

#### Button Text

- Button text should be as short and simple as possible, ideally a maximum of 3 words.
- Use Title Case for readability.
- They should not include punctuation (exception: "Loading...").
- They should not be used as an indicator of what happens on the next page, or as a substitute
for a progress meter.

#### Button Styling

- DO use only the styles of the brand you are working on.
- DO NOT combine styles, even if the page is co-branded.

#### Button Sizes
- DO always pair like sizes together and maintain the hierarchy of Primary and Secondary/Tertiary.
- DO NOT mix sizes of buttons when they are used together as a group.

#### Input Pairing

Primary and Secondary buttons may be paired with input fields.
Only one Primary button may appear on each screen.
Use the Secondary button when there are multiple in-context buttons
and/or when there is an emphasized page level button.
When used in a form context, the button's `type` needs to be `submit` to pass along form data.

- DO use only large buttons with input fields.
- DO NOT use small buttons with input fields.

## Properties

| Property             | Attribute            | Type                                             | Default     | Description                                      |
|----------------------|----------------------|--------------------------------------------------|-------------|--------------------------------------------------|
| `ariaLive`           | `ariaLive`           | `"polite" \| "assertive"`                        | "assertive" | Controls whether your loading status update to voiceover users will occur<br />immediately (used for more urgently needed updates) using `assertive` or at the next convenient<br />pause in their navigation using `polite`. |
| `buttonAriaExpanded` | `buttonAriaExpanded` | `boolean \| undefined`                           |             | Button aria expanded attribute                   |
| `disabled`           | `disabled`           | `boolean`                                        |             | Disabled attribute                               |
| `field`              |                      | `HTMLButtonElement`                              |             |                                                  |
| `fullWidth`          | `fullWidth`          | `boolean`                                        |             | Full width button                                |
| `hideText`           | `hideText`           | `boolean \| undefined`                           |             | Visually hide button text. Text is still accessible to assistive technology.<br />Use this for icon-only buttons for accessibility |
| `href`               | `href`               | `string \| undefined`                            |             | <br />Provide this property if you intend to use button styles for an anchor tag (`<a>`).<br />This changes the component markup from `<button>` usage to `<a>` instead. |
| `iconFlipDirection`  | `iconFlipDirection`  | `string \| undefined`                            |             | flip is used for <cre8-icon> to set the icon in the correct direction |
| `iconPosition`       | `iconPosition`       | `"before" \| "after" \| undefined`               | "undefined" | Icon position. Must include the name of the icon with `iconName`<br /><br />- **before** places the icon before the button text<br />- **after** places the icon after the button text |
| `iconRotateDegree`   | `iconRotateDegree`   | `number \| undefined`                            | 0           | rotate is used for <cre8-icon> to set the arrow in the correct direction |
| `inverted`           | `inverted`           | `boolean \| undefined`                           |             | Inverted colors Danger Button (onDark)           |
| `loading`            | `loading`            | `boolean`                                        |             | * Changes styling to an active state with a spinning icon.<br />* Adds accessibility treatment by:<br />  * announcing via voiceover when the loading success/error state via a aria-live region<br />  * setting `aria-disabled`<br />* Disables click events / form submitting while allowing focus (for accessibility) |
| `loadingComplete`    | `loadingComplete`    | `boolean`                                        |             | * Variant of the loading button that:<br />  * Removes loading spinner<br />  * Informs the SR user that the loading status is now complete, with visually hidden text in the live area |
| `rel`                | `rel`                | `string \| undefined`                            |             | Rel if this is an <a> element - this swaps <button> for <a> |
| `size`               | `size`               | `"sm" \| "lg" \| undefined`                      |             | Size variants add another way to increase or decrease visual priority of a button.<br />- **sm** shrinks the button typography and overall size from the default. Use when vertical space is constrained.<br />- **lg** increases the button typography and overall size from the default. |
| `svg`                | `svg`                | `string \| undefined`                            |             | SVG raw string if including an icon within a button.<br />Must include the icon's position with `iconPostion`. This prop is used for <cre8-icon> |
| `target`             | `target`             | `"_blank" \| "_self" \| "_parent" \| "_top" \| undefined` |             | Target attribute for a link if providing `href` to style a link as a button<br />- **_blank** yields a link that opens in a new tab<br />- **_self** yields a link that loads the URL into the same browsing context as the current one.<br />  This is the default behavior<br />- **_parent** yields a link that loads the URL into the parent browsing context of the current one.<br />  If there is no parent, this behaves the same way as _self<br />- **_top** yields a link that loads the URL into the top-level browsing context.<br />  If there is no parent, this behaves the same way as _self. |
| `text`               | `text`               | `string \| undefined`                            | "Button"    | <br />The button text. Should be as short and simple as possible, ideally a maximum of 3 words.<br />- Use Title Case for readability.<br />- Should not include punctuation (exception: "Loading...").<br />- Should not be used as an indicator of what happens on the next page, or as a substitute for a progress meter. |
| `type`               | `type`               | `"button" \| "submit" \| "reset"`                | "button"    | Type of button.<br />- **button** (default) button has no default behavior and does nothing unless provided some sort<br />of client-side trigger<br />- **submit** button for submitting form data to a server |
| `value`              | `value`              | `string`                                         |             | The value of the form field.                     |
| `variant`            | `variant`            | `"primary" \| "secondary" \| "tertiary" \| undefined` | "primary"   | Style variant<br />- **primary** renders the button used for primary actions. Presents highest visual priority.<br />  When grouped with other buttons, only one primary is allowed<br />- **secondary** renders a secondary button. Presents a lower visual priority<br />- **tertiary** renders a tertiary button. Presents the lowest visual priority.<br />  Should be used in limited amounts - consider if a link (`<a>`) would be more appropriate |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `formReset`           | `(): void`                                       |                                                  |
| `formResetCallback`   | `(): void`                                       |                                                  |
| `formSubmit`          | `(): void`                                       |                                                  |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-calendar-month-modal

## Properties

| Property       | Attribute      | Type       | Default                                          |
|----------------|----------------|------------|--------------------------------------------------|
| `currentMonth` | `currentMonth` | `number`   |                                                  |
| `monthNames`   |                | `string[]` | ["January","February","March","April","May","June","July","August","September","October","November","December"] |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `getMonthListItems`   | `(): TemplateResult[]`                           |                                                  |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event         | Type                              |
|---------------|-----------------------------------|
| `changeMonth` | `CustomEvent<{ month: number; }>` |


# cre8-calendar-navigation

## Properties

| Property    | Attribute   | Type     |
|-------------|-------------|----------|
| `monthName` | `monthName` | `string` |
| `year`      | `year`      | `number` |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event           | Type                               |
|-----------------|------------------------------------|
| `activateModal` | `CustomEvent<{ modal: string; }>`  |
| `changeMonth`   | `CustomEvent<{ addend: number; }>` |
| `changeYear`    | `CustomEvent<{ addend: number; }>` |


# cre8-calendar-year-modal

## Properties

| Property          | Attribute     | Type                  | Default |
|-------------------|---------------|-----------------------|---------|
| `currentYear`     | `currentYear` | `number`              |         |
| `modalAnchorYear` |               | `number \| undefined` |         |
| `yearNumbers`     |               | `number[]`            | []      |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event        | Type                             |
|--------------|----------------------------------|
| `changeYear` | `CustomEvent<{ year: number; }>` |


# cre8-calendar

## Properties

| Property            | Attribute      | Type                   | Default                                          |
|---------------------|----------------|------------------------|--------------------------------------------------|
| `activeModal`       | `activeModal`  | `CalendarModal`        |                                                  |
| `currentDate`       | `currentDate`  | `Date`                 |                                                  |
| `dateConfig`        |                | `DateConfig`           | {"locale":"locale","weekInfo":{"firstDay":7,"weekend":[6,7]}} |
| `dateFormatOptions` |                | `DateFormatOptions`    | {"weekday":"long","year":"numeric","month":"long","day":"numeric"} |
| `fieldDate`         | `fieldDate`    | `string`               |                                                  |
| `hasShortcuts`      | `hasShortcuts` | `boolean \| undefined` |                                                  |
| `locale`            |                | `string`               |                                                  |
| `weekDays`          |                | `string[]`             | ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event          | Type                                             |
|----------------|--------------------------------------------------|
| `dateSelect`   | `CustomEvent<{ date: string; }>`                 |
| `outsideClick` | `CustomEvent<{ composedPath: [(EventTarget \| undefined)?]; }>` |


# cre8-date-picker

The Date Picker component renders a form group with label, control, help text and validation styling much
like the Field component but exclusively for type=date.
Cre8DatePicker inherits the Cre8Field component.

## Properties

| Property                    | Attribute                   | Type                      | Default   | Description                                      |
|-----------------------------|-----------------------------|---------------------------|-----------|--------------------------------------------------|
| `ariaDescribedBy`           | `ariaDescribedBy`           | `string`                  |           | Used to connect the field note in text field to the text menu for accessibility |
| `ariaLive`                  | `ariaLive`                  | `"polite" \| "assertive"` | "polite"  | Controls how the voiceover will experience the new information when field note changes,<br />immediately (used for more urgently needed updates) using `assertive` or at the next convenient<br />pause in their navigation using `polite`. |
| `autocomplete`              | `autocomplete`              | `string`                  |           | Autocomplete attribute that allows input to expect certain types of information. Note: autocomplete is supported<br />by most browsers, but the suggested 'completions' are also sourced from those browsers. Values come<br />from past user stored data from past interactions in that browser, such as:<br /><br /> 1. From past values entered by the user, but they may also come from pre-configured values. For<br /> instance, a browser might let the user save their name, address, phone number, and email addresses for<br /> autocomplete purposes.<br /><br /> 2. Perhaps the browser offers the ability to save encrypted credit card information, for autocompletion<br /> following a an authentication procedure.<br /> See: [MDN web docs_](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)<br /><br /> NOTE:: In order to provide autocompletion, user-agents might require input, select, textarea<br /> elements to:<br /><br /> 1. Have a {{name}} and/or {{id}} attribute<br /> 2. Be descendants of a form element<br /> 3. The form to have a [submit button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit) |
| `disabled`                  | `disabled`                  | `boolean`                 |           | The disabled attribute on the input              |
| `errorNote`                 | `errorNote`                 | `string`                  |           | The error field note that appears below the default field note |
| `errorText`                 | `errorText`                 | `string`                  | "Error"   | Visually hidden text that always signifies that this is an error for screen reader usage |
| `field`                     |                             | `HTMLInputElement`        |           |                                                  |
| `fieldId`                   | `fieldId`                   | `string`                  |           | The unique id of the field<br /><br/><br/> _*This property is dynamically set_ |
| `fieldNote`                 | `fieldNote`                 | `string`                  |           | The text that displays below in text field input |
| `hasShortcuts`              | `hasShortcuts`              | `boolean`                 |           | Quick Shortcuts Variant                          |
| `isError`                   | `isError`                   | `boolean`                 |           | Changes the component's treatment to represent an error state |
| `isSuccess`                 | `isSuccess`                 | `boolean`                 |           | Changes the component's treatment to represent a success state |
| `label`                     | `label`                     | `string`                  | "Label"   | The required label that appears above the input  |
| `max`                       | `max`                       | `string \| number`        |           | The max attribute defines the maximum value that is acceptable and valid for the input containing the attribute. |
| `maxlength`                 | `maxlength`                 | `string`                  |           | The maxlength is an integer above 0 that indicates the maximum allowed characters to be entered. When using the<br />maxlength prop, you must also use the "required" prop to provide Constraint Validation on the input field.<br />This allows users to know why the input they attempted didn't render in the input field. see<br />[MDN maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength#constraint_validation) |
| `min`                       | `min`                       | `string \| number`        |           | The min attribute defines the minimum value that is acceptable and valid for the input containing the attribute. |
| `name`                      | `name`                      | `string`                  |           | The name property on the input                   |
| `pattern`                   | `pattern`                   | `string`                  |           | Pattern attribute defines a regular expression to validate against input |
| `placeholder`               | `placeholder`               | `string`                  |           | The placeholder text that appears inside the input |
| `readonly`                  | `readonly`                  | `boolean`                 |           | Readonly attribute                               |
| `required`                  | `required`                  | `boolean`                 |           | The required attribute on the input              |
| `showCalendar`              |                             | `boolean`                 | false     |                                                  |
| `successNote`               | `successNote`               | `string`                  |           | The success field note that appears below the default field note |
| `successText`               | `successText`               | `string`                  | "Success" | Visually hidden text that always signifies that this is successful for screen reader usage |
| `type`                      | `type`                      | `string`                  | "date"    | The type of the form field.<br />For Date Picker, this is always 'date'. |
| `validationAriaDescribedBy` | `validationAriaDescribedBy` | `string`                  |           | Additional aria-describedby connection to id for additional success and error notes to be accessible |
| `value`                     | `value`                     | `string`                  |           | The value of the form field.                     |

## Methods

| Method                        | Type                                             | Description                                      |
|-------------------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames`         | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`                    | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `fieldNoteAria`               | `(): string \| undefined`                        | Aria describedby string based on field notes and error/success notes<br />1) If both validationAriaDescribedBy (error/success note) and field note exists,<br />render both in the input's `aria-describedby` attribute<br />2) Otherwise, if only validationAriaDescribedBy exists, then render only that as<br />the `aria-describedby` attribute (input without field note initially, but then error/success is added).<br />3) Otherwise, render only the `ariaDescribedBy` property (field note only) |
| `formResetCallback`           | `(): void`                                       |                                                  |
| `initializeAria`              | `(): void`                                       | Initialize aria attributes                       |
| `renderSuccessErrorFieldNote` | `(): TemplateResult<1> \| null`                  | Render the success or error field notes<br />1. If there is a successNote, then return the field note with the success message and state.<br />2. If there is a errorNote, then return the field note with the error message and state. |
| `slotEmpty`                   | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`                | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-divider

The divider component is a separator between sections of content or groups of items.
It often contains a horizontal or vertical line.

## Properties

| Property  | Attribute | Type                         | Default      | Description                                      |
|-----------|-----------|------------------------------|--------------|--------------------------------------------------|
| `status`  | `status`  | `string \| undefined`        |              | Status (a color variant prop)<br />- By default, the divider has gray color.<br />- **brand**, the divider has blue color.<br />- **knockout**, the divider has white color. |
| `variant` | `variant` | `"horizontal" \| "vertical"` | "horizontal" | Divider variants<br />- By default, the component renders the horizontal divider<br />- **vertical** renders the vertical divider |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-dropdown-item

The Dropdown item component is designed to be used with Dropdown component, each item represents a
selectable option or action within the dropdown menu. It can be configured to trigger actions, navigate
to links, initiate commands when clicked.

## Properties

| Property    | Attribute   | Type     | Default |
|-------------|-------------|----------|---------|
| `ariaLabel` | `ariaLabel` | `string` | ""      |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event                    |
|--------------------------|
| `dropdown-item-selected` |


# cre8-dropdown

The Dropdown menu itself is a container that can host multiple interactive items, commonly formatted as a list

## Properties

| Property           | Attribute          | Type                  | Default | Description                                      |
|--------------------|--------------------|-----------------------|---------|--------------------------------------------------|
| `buttonText`       | `buttonText`       | `string`              | ""      | Dropdown header                                  |
| `dropdownContent`  |                    | `HTMLElement`         |         |                                                  |
| `dropdownWithLink` | `dropdownWithLink` | `boolean`             | false   | button text represents as a link                 |
| `maxHeight`        | `maxHeight`        | `string \| undefined` |         | Enables scrolling once content reached to specified height, the height should mention in px units, ex: 100px |
| `open`             |                    | `boolean`             | false   |                                                  |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-feature

## Properties

| Property   | Attribute  | Type                   | Description                                      |
|------------|------------|------------------------|--------------------------------------------------|
| `imgAlt`   | `imgAlt`   | `string \| undefined`  | Image alt text                                   |
| `imgSrc`   | `imgSrc`   | `string \| undefined`  | Image source                                     |
| `inverted` | `inverted` | `boolean \| undefined` | Inverted variant<br />1) Used for dark backgrounds |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-field-note

Field Note gives direction on how to fill out a form field and to alert users of form errors and successes.
It’s used below an input field and never on its own.

## Properties

| Property    | Attribute   | Type                  | Description                                      |
|-------------|-------------|-----------------------|--------------------------------------------------|
| `iconName`  | `iconName`  | `string \| undefined` | DEPRECATED: Icon name used for the icon before to the field note |
| `isError`   | `isError`   | `boolean`             | Changes the component's treatment to represent an error |
| `isSuccess` | `isSuccess` | `boolean`             | Changes the component's treatment to represent a success |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `fieldNoteAriaLive`   | `(): "polite" \| "assertive" \| "off"`           | Check if there are success or error states and set "aria-live=polite" |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description      |
|------|------------------|
|      | The note content |


# cre8-field

The Field component renders a form group with label, control, help text and validation styling. There are
convenience variants of Field to support HTML5 input types and static content.

## Properties

| Property                    | Attribute                   | Type                      | Default   | Description                                      |
|-----------------------------|-----------------------------|---------------------------|-----------|--------------------------------------------------|
| `ariaDescribedBy`           | `ariaDescribedBy`           | `string`                  |           | Used to connect the field note in text field to the text menu for accessibility |
| `ariaLive`                  | `ariaLive`                  | `"polite" \| "assertive"` | "polite"  | Controls how the voiceover will experience the new information when field note changes,<br />immediately (used for more urgently needed updates) using `assertive` or at the next convenient<br />pause in their navigation using `polite`. |
| `autocomplete`              | `autocomplete`              | `string`                  |           | Autocomplete attribute that allows input to expect certain types of information. Note: autocomplete is supported<br />by most browsers, but the suggested 'completions' are also sourced from those browsers. Values come<br />from past user stored data from past interactions in that browser, such as:<br /><br /> 1. From past values entered by the user, but they may also come from pre-configured values. For<br /> instance, a browser might let the user save their name, address, phone number, and email addresses for<br /> autocomplete purposes.<br /><br /> 2. Perhaps the browser offers the ability to save encrypted credit card information, for autocompletion<br /> following a an authentication procedure.<br /> See: [MDN web docs_](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)<br /><br /> NOTE:: In order to provide autocompletion, user-agents might require input, select, textarea<br /> elements to:<br /><br /> 1. Have a {{name}} and/or {{id}} attribute<br /> 2. Be descendants of a form element<br /> 3. The form to have a [submit button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit) |
| `disabled`                  | `disabled`                  | `boolean`                 |           | The disabled attribute on the input              |
| `errorNote`                 | `errorNote`                 | `string`                  |           | The error field note that appears below the default field note |
| `errorText`                 | `errorText`                 | `string`                  | "Error"   | Visually hidden text that always signifies that this is an error for screen reader usage |
| `field`                     |                             | `HTMLInputElement`        |           |                                                  |
| `fieldId`                   | `fieldId`                   | `string`                  |           | The unique id of the field<br /><br/><br/> _*This property is dynamically set_ |
| `fieldNote`                 | `fieldNote`                 | `string`                  |           | The text that displays below in text field input |
| `isError`                   | `isError`                   | `boolean`                 |           | Changes the component's treatment to represent an error state |
| `isSuccess`                 | `isSuccess`                 | `boolean`                 |           | Changes the component's treatment to represent a success state |
| `label`                     | `label`                     | `string`                  | "Label"   | The required label that appears above the input  |
| `max`                       | `max`                       | `string \| number`        |           | The max attribute defines the maximum value that is acceptable and valid for the input containing the attribute. |
| `maxlength`                 | `maxlength`                 | `string`                  |           | The maxlength is an integer above 0 that indicates the maximum allowed characters to be entered. When using the<br />maxlength prop, you must also use the "required" prop to provide Constraint Validation on the input field.<br />This allows users to know why the input they attempted didn't render in the input field. see<br />[MDN maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength#constraint_validation) |
| `min`                       | `min`                       | `string \| number`        |           | The min attribute defines the minimum value that is acceptable and valid for the input containing the attribute. |
| `name`                      | `name`                      | `string`                  |           | The name property on the input                   |
| `pattern`                   | `pattern`                   | `string`                  |           | Pattern attribute defines a regular expression to validate against input |
| `placeholder`               | `placeholder`               | `string`                  |           | The placeholder text that appears inside the input |
| `readonly`                  | `readonly`                  | `boolean`                 |           | Readonly attribute                               |
| `required`                  | `required`                  | `boolean`                 |           | The required attribute on the input              |
| `successNote`               | `successNote`               | `string`                  |           | The success field note that appears below the default field note |
| `successText`               | `successText`               | `string`                  | "Success" | Visually hidden text that always signifies that this is successful for screen reader usage |
| `type`                      | `type`                      | `string`                  | "text"    | Type variants<br />- **text** renders a standard text input<br />- **email** renders a text input for an email format<br />- **number** renders an input for number values only<br />- **url** renders an input for urls only<br />- **tel** renders an input for telephone number values only |
| `validationAriaDescribedBy` | `validationAriaDescribedBy` | `string`                  |           | Additional aria-describedby connection to id for additional success and error notes to be accessible |
| `value`                     | `value`                     | `string`                  |           | The value of the form field.                     |

## Methods

| Method                        | Type                                             | Description                                      |
|-------------------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames`         | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`                    | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `fieldNoteAria`               | `(): string \| undefined`                        | Aria describedby string based on field notes and error/success notes<br />1) If both validationAriaDescribedBy (error/success note) and field note exists,<br />render both in the input's `aria-describedby` attribute<br />2) Otherwise, if only validationAriaDescribedBy exists, then render only that as<br />the `aria-describedby` attribute (input without field note initially, but then error/success is added).<br />3) Otherwise, render only the `ariaDescribedBy` property (field note only) |
| `formResetCallback`           | `(): void`                                       |                                                  |
| `initializeAria`              | `(): void`                                       | Initialize aria attributes                       |
| `renderSuccessErrorFieldNote` | `(): TemplateResult<1> \| null`                  | Render the success or error field notes<br />1. If there is a successNote, then return the field note with the success message and state.<br />2. If there is a errorNote, then return the field note with the error message and state. |
| `slotEmpty`                   | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`                | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-footer

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name     | Description                                 |
|----------|---------------------------------------------|
|          | The footer content                          |
| `bottom` | The bottom content (below the default slot) |
| `top`    | The top content (above the default slot)    |


# cre8-global-nav-item

## Properties

| Property   | Attribute  | Type                   | Default               | Description                                      |
|------------|------------|------------------------|-----------------------|--------------------------------------------------|
| `href`     | `href`     | `string`               | "#"                   | Primary nav item href                            |
| `iconName` | `iconName` | `string \| undefined`  | "keyboard-arrow-down" | Icon name                                        |
| `isActive` |            | `boolean \| undefined` |                       | Append to the class name. Used for passing in utility classes |
| `megaMenu` | `megaMenu` | `boolean \| undefined` |                       | Append to the class name. Used for passing in utility classes |
| `text`     | `text`     | `string`               | "Nav item"            | Primary nav item text                            |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `closePanel`          | `(): void`                                       |                                                  |
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                       |
|------|-----------------------------------|
|      | The label for the navigation item |


# cre8-global-nav

## Properties

| Property       | Attribute      | Type                          | Default  | Description                                      |
|----------------|----------------|-------------------------------|----------|--------------------------------------------------|
| `behavior`     | `behavior`     | `"side-by-side" \| undefined` |          | Behavior variant<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**side-by-side** keeps the primary nav item always in a horizontal pattern</li><br /></ul><br /></cre8-text-passage> |
| `inverted`     | `inverted`     | `boolean \| undefined`        |          | Inverted variant<br />1) Used for dark backgrounds |
| `navAriaLabel` | `navAriaLabel` | `string`                      | "global" | aria-label attribute to designate at name for the nav. Can be override by user |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                  |
|------|------------------------------|
|      | The primary navigation items |


# cre8-grid-item

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                  |
|------|------------------------------|
|      | The content of the grid item |


# cre8-grid

## Properties

| Property  | Attribute | Type                                             | Description                                      |
|-----------|-----------|--------------------------------------------------|--------------------------------------------------|
| `break`   | `break`   | `"faster" \| "slower" \| undefined`              | Break variant<br />- **faster** breaks the grid at a smaller width than the default.<br />  Example: 2up grid breaks to 2 per row at smaller width than default<br />- **slower** breaks the grid at a larger width than the default.<br />  Example: 2up grid breaks to 2 per row at larger width than default<br />- **lg** yields a grid whose grid items are spaced with a gap larger than the default |
| `gap`     | `gap`     | `"sm" \| "lg" \| "none" \| undefined`            | Style variant<br />- **none** yields a grid whose grid items are spaced without any gutter in between<br />- **sm** yields a grid whose grid items are spaced with a gap smaller than the default<br />- **lg** yields a grid whose grid items are spaced with a gap larger than the default |
| `variant` | `variant` | `"side-by-side" \| "2up" \| "3up" \| "1-3up" \| "4up" \| "1-4up" \| "1-2-4up" \| "2-4-6up" \| undefined` | Style variant<br />- **side-by-side** yields a grid whose grid items display side-by-side (2 per row) on all screen sizes<br />- **2up** yields a grid whose grid items are stacked on small screens<br />  but display side-by-side when enough screen real estate is available to do so<br />- **3up** yields a grid whose grid items are stacked on small screens,<br />  transforms to a 2-across pattern and then transforms again to a 3-across pattern<br />- **1-3up** yields a grid whose grid items are stacked on small screens<br />  and transforms to a 3-across pattern on larger screens<br />- **4up** yields a grid whose grid items are stacked on small screens,<br />  transforms to a 2-across pattern, transforms again to a 3-across pattern,<br />  and ultimately transforms to a 4-across pattern<br />- **1-2-4up** yields a grid whose grid items are stacked on small screens,<br />  transforms to a 2-across pattern, and ultimately transforms to a 4-across pattern<br />- **1-4up** yields a grid whose grid items are stacked on small screens,<br />  transforms to a 4-across pattern on medium/large screens |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description    |
|------|----------------|
|      | The grid items |


# cre8-header

## Properties

| Property   | Type                   | Description                                      |
|------------|------------------------|--------------------------------------------------|
| `isActive` | `boolean \| undefined` | Is active state<br />1) Set to true when small screen menu is open |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description        |
|------|--------------------|
|      | The header content |


# cre8-heading

HTML headings are titles or subtitles that you want to display on a webpage. The H1 is the most important and H6
is the least important in the content hierarchy.

# How to Use
1. The cre8-heading tag wraps around one of the six native HTML "h" tags, depending on your chosen variation.
2. There are two main use cases for using this component:
  text passage headings and Components with a title (i.e. modal, card or alert)
3. There will be instances when the design requires the heading text to have the brand color applied
  in which case you should set the [brandColor](?path=/story/cre8-components-heading--brand-color)
  attribute to true on the cre8-heading tag.
4. For dark backgrounds, add the [inverted](?path=/story/cre8-components-heading--inverted)
  attribute to the tag for white text.

## Properties

| Property     | Attribute    | Type                                             | Default | Description                                      |
|--------------|--------------|--------------------------------------------------|---------|--------------------------------------------------|
| `brandColor` | `brandColor` | `boolean`                                        |         | Apply the brand color to the heading text.       |
| `inverted`   | `inverted`   | `boolean`                                        |         | Invert the color of the font from dark to light. An inverted `heading` should be used on a dark background. |
| `tagVariant` | `tagVariant` | `string`                                         | "h5"    | Dynamic tag name for the component<br />1) This is needed to use proper semantic heading treatments depending on where the banner lives on the page<br /><cre8-text-passage size="small"><br /><ul><br /><li>**h1** renders an `h1` tag</li><br /><li>**h2** renders an `h2` tag. This is the default</li><br /><li>**h3** renders an `h3` tag</li><br /><li>**h4** renders an `h4` tag</li><br /><li>**h5** renders an `h5` tag</li><br /><li>**h6** renders an `h6` tag</li><br /></ul><br /></cre8-text-passage> |
| `type`       | `type`       | `"display-default" \| "display-small" \| "headline-large" \| "headline-default" \| "headline-small" \| "title-xlarge" \| "title-large" \| "title-default" \| "title-small" \| "label-large" \| ... 5 more ... \| undefined` |         | Heading type<br /><cre8-text-passage size="small"><br /><ul><br /><li>**display-default** renders a heading with the heading display-default preset treatment</li><br /><li>**display-small** renders a heading with the heading display-small preset treatment</li><br /><li>**headline-large** renders a heading with the heading headline-large preset treatment</li><br /><li>**headline-default** renders a heading with the heading headline-default preset treatment</li><br /><li>**headline-small** renders a heading with the heading headline-small preset treatment</li><br /><li>**title-xlarge** renders a heading with the heading title-xlarge preset treatment</li><br /><li>**title-large** renders a heading with the heading title-large preset treatment</li><br /><li>**title-default** renders a heading with the heading title-default preset treatment</li><br /><li>**title-small** renders a heading with the heading title-small preset treatment</li><br /><li>**label-large** renders a heading with the label-large preset treatment</li><br /><li>**label** renders a heading with the label preset treatment</li><br /><li>**label-small** renders a heading with the label-small preset treatment</li><br /><li>**meta-large** renders a heading with the meta-large preset treatment</li><br /><li>**meta-default** renders a heading with the meta-default preset treatment</li><br /><li>**meta-small** renders a heading with the meta-small preset treatment</li><br /></ul><br /></cre8-text-passage> |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description              |
|------|--------------------------|
|      | The heading text content |


# cre8-hero

## Properties

| Property | Attribute | Type                                             | Description                                      |
|----------|-----------|--------------------------------------------------|--------------------------------------------------|
| `align`  | `align`   | `"center" \| "top-left" \| "left" \| "top-center" \| "bottom-center" \| "top-right" \| "right" \| "bottom-right" \| undefined` | Position variant. Bottom left is the default position<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**top-left** renders content in the top left corner of the image</li><br /><li>**left** renders content in the left, center part of the image</li><br /><li>**top-center** renders content in the top, center part of the image</li><br /><li>**center** renders content center of the image</li><br /><li>**bottom-center** renders content bottom center of the image</li><br /><li>**top-right** renders content top-right of the image</li><br /><li>**right** renders content right of the image</li><br /><li>**bottom-right** renders content bottom, right part of the image</li><br /></ul><br /></cre8-text-passage> |
| `imgAlt` | `imgAlt`  | `string \| undefined`                            | Image alt text                                   |
| `imgSrc` | `imgSrc`  | `string \| undefined`                            | Image source                                     |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-icon


<svg> is a web component, which can be used with any frontend framework and use any svg.
It takes raw svgs as props and renders them.

**'svg-legacy'** will be **deprecated** in Web Components v0.5.0

- [List of new figma icons](https:/www.figma.com/file/j1a0rBkoH65XiGKfq7ppWa/Iconography?type=design&node-id=2037-5773&mode=design&t=6ZzC6KH3Gkxf3fj5-4)
- The new `svg` from the svg package: https:/docs.cre8.dev/svgs/.

##Usability Considerations
- If the icon is decorative: set `aria-hidden` to true.
- If the icon is interactive (not decorative): set `aria-hidden` to false and add the `aria-label`
- If the icon is key to functionality from a screen reader perspective, it is required to add `aria-label`
which will describe the icon.
For example, if the icon is a close button, setting `aria-label="Close"`will give
the SVG an aria-label to make it sufficiently accessible.

[More information on Accessibility with svgs](https:/docs.cre8.dev/svgs/?path=/story/getting-started-accessibility--page)

##How to use
Cre8 Web Components (cre8-wc) includes the `cre8_dev/svgs` package.
If you need to install a newer version than what's included, please see
the [installation instructions for svgs](https:/github.com/tmorrowdev/svgs#installation).
- Import the component (this is the icon container): `import '@cre8_dev/svgs';`
- Import an svg as a string: `import svgInfo from 'cre8_dev/svgs/lib/icons/System/Regular/Info.svg?raw';`

Your import paths may be different depending on your project's build configuration.
Please see [Importing Icons](https:/docs.cre8.dev/svgs/?path=/story/icon-sets-importing-icons--page)
of the `cre8_dev/svgs` documentation for more information.

## Properties

| Property    | Attribute   | Type                   | Default      | Description                                      |
|-------------|-------------|------------------------|--------------|--------------------------------------------------|
| `focusable` | `focusable` | `boolean \| undefined` | **required** | Focusable                                        |
| `iconTitle` | `iconTitle` | `string \| undefined`  | **required** | Icon Title, this string is used for the aira-label of the svg |
| `iconUrl`   | `iconUrl`   | `string \| undefined`  | "iconSprite" | Icon path<br />1) This points to the file where the icon sprite lives<br />2) This method of pathing will soon be depricated |
| `name`      | `name`      | `string`               | **required** | Icon name (this method of passing in svgs is to be deprecated) |
| `svg`       | `svg`       | `string \| undefined`  |              |                                                  |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `getIconPath`         | `(): string \| undefined`                        | Get the path to the icons, either by overriding it on the window<br />or by using the bundled icon path |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-inline-alert

In cases when it is necessary to alert the user but a less strong message that cannot be dismissed is desired,
use an in-line contextual alert message as the least "severe" message type.
These can be displayed anywhere on the page, but should never cover content.
Inline alerts do not include a title or close capability and are considered minimally intrusive user messaging.

## Properties

| Property    | Attribute   | Type                                             | Default  | Description                                      |
|-------------|-------------|--------------------------------------------------|----------|--------------------------------------------------|
| `fullWidth` | `fullWidth` | `boolean`                                        |          | Full width Inline Alert                          |
| `iconName`  | `iconName`  | `string \| undefined`                            |          | DEPRECATED: Icon name used for the icon before to the field note |
| `iconTitle` | `iconTitle` | `string \| undefined`                            |          | Icon title used for the icon alt text            |
| `status`    | `status`    | `"error" \| "info" \| "neutral" \| "warning" \| "success" \| "attention" \| "help" \| undefined` | "info"   | Status<br />- **default** renders an inline alert with the brand colors<br />- **error** renders an inline alert with an error state<br />- **warning** renders an inline alert with a warning state<br />- **success** renders an inline alert with a success state<br />- **attention** renders an inline alert with an attention state<br />- **neutral** renders an inline alert with a nuetral state |
| `variant`   | `variant`   | `"subtle" \| "transparent"`                      | "subtle" | Variant<br />- **subtle** (default) renders an alert message in a padded container with a with a border and background color<br />- **transparent** renders an alert message with no padded container, border, or background color |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-layout-container

## Properties

| Property     | Attribute    | Type                   | Description                                      |
|--------------|--------------|------------------------|--------------------------------------------------|
| `fullHeight` | `fullHeight` | `boolean \| undefined` | Full height variant<br />1) Sets the height to 100% |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                          |
|------|--------------------------------------|
|      | The contents of the layout container |


# cre8-layout-section

## Properties

| Property   | Attribute  | Type                    | Default | Description                                      |
|------------|------------|-------------------------|---------|--------------------------------------------------|
| `behavior` | `behavior` | `"sticky" \| undefined` |         | Behavioral variants<br />- **sticky** allows the layout section to stick to the screen until the<br />  section reaches the bottom of the layout or the next layout section. |
| `top`      | `top`      | `string \| undefined`   | "1rem"  | Top style<br />1) Used to create dynamic sticky containers that can be adjusted based on the content |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                       |
|------|-----------------------------------|
|      | The content of the layout section |


# cre8-layout

## Properties

| Property  | Attribute | Type                          | Description                                      |
|-----------|-----------|-------------------------------|--------------------------------------------------|
| `variant` | `variant` | `"left-sidebar" \| undefined` | Style variants<br /><cre8-text-passage size="sm"><br /><ul><br /><li>Default is a right sidebar</li><br /><li>**left-sidebar** formats the first `layout-section` component as a left sidebar</li><br /></ul><br /></cre8-text-passage> |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description        |
|------|--------------------|
|      | The layout content |


# cre8-linelength-container

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-link-list-item

## Properties

| Property   | Attribute  | Type                   | Description   |
|------------|------------|------------------------|---------------|
| `href`     | `href`     | `string \| undefined`  | The link URL  |
| `isActive` | `isActive` | `boolean \| undefined` | Active link   |
| `text`     | `text`     | `string \| undefined`  | The link text |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The default slot to put badges or other Components |


# cre8-link-list

## Properties

| Property   | Attribute  | Type                                        | Description                                      |
|------------|------------|---------------------------------------------|--------------------------------------------------|
| `behavior` | `behavior` | `"horizontal" \| "responsive" \| undefined` | Behavioral variant<br />- **responsive** renders a horizontal wrapping link list that converts to a stacked link list on large screens<br />- **horizontal** renders a horizontal wrapping link list on all screens |
| `inverted` | `inverted` | `boolean \| undefined`                      | Inverted variant<br />1. Used for dark backgrounds |
| `size`     | `size`     | `"sm" \| undefined`                         | Size variants<br />- **sm** renders a link list with a smaller typography |
| `spacing`  | `spacing`  | `"condensed" \| undefined`                  | Spacing between link list items<br />- **condensed** renders a link list with a more compact display |
| `variant`  | `variant`  | `"secondary" \| "display" \| undefined`     | Style variants<br />- **secondary** renders a link list with a more subtle visual treatment<br />- **display** renders a link list with a display treatment (e.g. article title) |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description         |
|------|---------------------|
|      | The link list items |


# cre8-link

Link Component are strictly used in the case where the component will take
the user away from the current page to a new url.
In this vein, this component should ONLY be used in situations an anchor tag would be used (an href is required)
This goes for the variations as well such as the Call To Action Link

**Note**

For link with icon:
- **iconRotateDegree** & **iconFlipDirection** props are optional.
- They are used to set up the correct direction for icons, for example,
arrows, caret up or caret down.

## Properties

| Property            | Attribute           | Type                                             | Default         | Description                                      |
|---------------------|---------------------|--------------------------------------------------|-----------------|--------------------------------------------------|
| `ctaIcon`           | `ctaIcon`           | `string`                                         | "arrow-forward" | Call To Action Icon                              |
| `ctaLink`           | `ctaLink`           | `boolean \| undefined`                           |                 | Call To Action Link                              |
| `href`              | `href`              | `string`                                         |                 | Href attribute of the anchor tag                 |
| `iconFlipDirection` | `iconFlipDirection` | `string \| undefined`                            |                 | iconFlipDirection is used for <cre8-icon> to set the icon in the correct direction |
| `iconName`          | `iconName`          | `string \| undefined`                            |                 | DEPRECATED: Icon name, use svg instead           |
| `iconPosition`      | `iconPosition`      | `"before" \| "after" \| undefined`               | "undefined"     | Icon position<br />- **before** places the icon before the button text<br />- **after** places the icon after the button text |
| `iconRotateDegree`  | `iconRotateDegree`  | `number \| undefined`                            | 0               | iconRotateDegree is used for <cre8-icon> to set the arrow in the correct direction |
| `inverted`          | `inverted`          | `boolean \| undefined`                           |                 | Inverted colors Link (onDark)                    |
| `noUnderline`       | `noUnderline`       | `boolean \| undefined`                           |                 | Link with no underline                           |
| `rel`               | `rel`               | `string \| undefined`                            |                 | Rel attribute of the anchor tag                  |
| `size`              | `size`              | `"sm" \| "lg" \| undefined`                      |                 | Size variant (default is medium)<br />- **sm** shrinks the link typography and overall size<br />- **lg** increases the link typography size and overall size |
| `svg`               | `svg`               | `string \| undefined`                            |                 | svg as a raw string<br />- For links with icon, the icon is defined by this prop.<br />- Pass in a raw svg as a String for using <cre8-icon> |
| `target`            | `target`            | `"_blank" \| "_self" \| "_parent" \| "_top" \| undefined` |                 | Target attribute for a link (i.e. set to _blank to open in new tab)<br />- **_blank** yields a link that opens in a new tab<br />- **_self** yields a link that loads the URL into the same browsing context as the current one.<br />  This is the default behavior<br />- **_parent** yields a link that loads the URL into the parent browsing context of the current one.<br />  If there is no parent, this behaves the same way as _self<br />- **_top** yields a link that loads the URL into the top-level browsing context.<br />  If there is no parent, this behaves the same way as _self. |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-list-item

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                  |
|------|------------------------------|
|      | The content of the list item |


# cre8-list

## Properties

| Property  | Attribute | Type                                   | Description                                      |
|-----------|-----------|----------------------------------------|--------------------------------------------------|
| `spacing` | `spacing` | `"condensed" \| "padded" \| undefined` | Spacing variants<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**padded** applies more padding in between list items compared to the default</li><br /><li>**condensed** reduces padding in between list items compared to the default</li><br /></ul><br /></cre8-text-passage> |
| `variant` | `variant` | `"bare" \| undefined`                  | Style variants<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**bare** removes any lines from in between list items</li><br /></ul><br /></cre8-text-passage> |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description    |
|------|----------------|
|      | The list items |


# cre8-loading-spinner

A loading spinner notifies the user that their request is being processed while the front end is retrieving data
or performing slow computations.

Providing visibility of a system's status is one of the most important rules of UI design. When the user has to
guess or assume that the system is responding to their input, they may send a command such as submit multiple
times, while also being anxious that the application is frozen or not working.

While it is most ideal to improve system performance such that there is no perceptible delay, in some cases this
is not possible. In these cases, the immediate response should be a progress indicator to give a visual indication
that their command was received and that the application is working.

The length of time for the system response is a good general guideline for which progress indicator to use.

## Determinable vs indeterminate progress

A progress meter provides feedback that the system is working and gives the user an indication of how much time
they will wait. This indicator should be used when the system response time is longer and determinable. See
ProgressMeter component for further examples and accessibility considerations.

## How to Use

The loading-spinner component can be used to indicate loading state on the component level all the way up to the
page level. There are two loading styles: determinate (loading progress represents percentage of total load time)
and indeterminate (a spinning animation that persists while loading continues)

1. Choose determinate or indeterminate. UX best practices leans more towards recommending the indeterminate
progress indicator if load time is unknown, while determinate is less user friendly unless the label indicates
the percentage loaded as well.
2. Choose a size and use it according to context, guidance should be given by your design or content team.
3. A common label to use is `Loading…`, guidance should be given by your design content team.
4. If you choose to use the determinate loader then you must also control the progress attribute's value which
controls the percentage of the circle that shows (values 0-100 accepted);
5. For dark backgrounds, add the `inverse` attribute to the `<cre8-loading-spinner>` tag.
6. For accessibility reasons, always include a label input unless explicitly informed to do otherwise by design or
accessibility teams.
7. The lg variant is usually suitable for containers or block level loading placeholders while the sm size is
meant for more inline loading states.

## Properties

| Property        | Attribute       | Type                                             | Default | Description                                      |
|-----------------|-----------------|--------------------------------------------------|---------|--------------------------------------------------|
| `buttonVariant` | `buttonVariant` | `"primary" \| "secondary" \| "tertiary" \| undefined` |         | Property that specifies which button variant is using the loading spinner |
| `determinate`   | `determinate`   | `boolean \| undefined`                           |         | Mode of the spinner, defaults to indeterminate.<br />If true, renders a standard progress indicator, fills via the progress property from 0% to 100%.<br />If false or undefined, renders indeterminate spinner which animates in a spinning motion until component is<br />destroyed. |
| `inverse`       | `inverse`       | `boolean \| undefined`                           |         | Inverse property used for dark backgrounds.      |
| `label`         | `label`         | `string \| undefined`                            |         | Label to show along with progress indicator.<br />This is required to meet accessibility requirements for this component. |
| `neutral`       | `neutral`       | `boolean \| undefined`                           |         | Neutral property used for secondary neutral loading button. |
| `progress`      | `progress`      | `number`                                         | 0       | Progress to display, between 0 and 100. Requires determinate property to be set to true. |
| `size`          | `size`          | `"small" \| "large" \| undefined`                | "large" | Size of the progress indicator and position of the label, if a label has been defined using the label property.<br />- **large** renders a large progress indicator at 72px in width/height with the label below.<br />- **small** renders a small progress indicator at 24px in width/height with the label to the right. |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-logo

## Properties

| Property | Attribute | Type                  | Description |
|----------|-----------|-----------------------|-------------|
| `href`   | `href`    | `string \| undefined` | Logo link   |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description      |
|------|------------------|
|      | The logo element |


# cre8-main

## Properties

| Property     | Attribute    | Type                   | Description                                      |
|--------------|--------------|------------------------|--------------------------------------------------|
| `fullHeight` | `fullHeight` | `boolean \| undefined` | Full height variant<br />1) Sets the height to 100% |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description      |
|------|------------------|
|      | The main content |


# cre8-modal

Modal component should be used in all modal situations.
It is natuarally composable and can even have a custom header and remove the close button.
(note: adding `slot="header"` will insert the given element into the header section of the modal,
same for `slot="footer"` and no given slot name will inset it into the body)

If it is desired to create a utility modal. Cre8Modal requires a status value (see props table below,
and a UtilityModalTitle since all utility modals have a cre8-heading)

## Properties

| Property               | Attribute           | Type                                             | Default                                          | Description                                      |
|------------------------|---------------------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `ariaLabel`            | `ariaLabel`         | `string`                                         |                                                  | Modal Aria Label - This is required for accessibility and provides context of the entire modal! |
| `closeButtonIcon`      | `closeButtonIcon`   | `string`                                         | "close"                                          | Close Button Icon                                |
| `closeButtonText`      | `closeButtonText`   | `string`                                         | "close"                                          | Close Button Text                                |
| `isActive`             | `isActive`          | `boolean \| undefined`                           |                                                  | Is Active attribute                              |
| `mapStatusToIconModal` |                     | `(status: string) => TemplateResult<1> \| null`  | "(status: string) => {\n    switch (status) {\n        case 'error':\n            return html`<cre8-icon class=\"cre8-modal-icon\" svg=${svgError} aria-hidden='true'></cre8-icon>`;\n        case 'success':\n            return html`<cre8-icon class=\"cre8-modal-icon\" svg=${svgCheckCircle} aria-hidden='true'></cre8-icon>`;\n        case 'warning':\n            return html`<cre8-icon class=\"cre8-modal-icon\" svg=${svgWarningFilled} aria-hidden='true'></cre8-icon>`;\n        case 'help':\n            return html`<cre8-icon class=\"cre8-modal-icon\" svg=${svgHelp} aria-hidden='true'></cre8-icon>`;\n        case 'info':\n            return html`<cre8-icon class=\"cre8-modal-icon\" svg=${svgInfoFilled} aria-hidden='true'></cre8-icon>`;\n        default:\n            return null;\n    }\n}" | Maps modal icons and modal status variants to what the alt text of the related icon should be<br />see: (https://digital.#.com/patterns-and-Components/informational-display/alerts-and-notifications#query=alerts)<br />this provides the recommendated alt text of different statuses |
| `notDismissible`       | `notDismissible`    | `boolean \| undefined`                           |                                                  | Not dismissible modal                            |
| `status`               | `status`            | `"error" \| "info" \| "warning" \| "success" \| "help" \| undefined` |                                                  | Status Types<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**default (no value)** renders a default modal</li><br /><li>**error** renders an error modal</li><br /><li>**warning** renders a warning modal</li><br /><li>**success** renders a success modal</li><br /><li>**info** renders an info modal</li><br /><li>**help** renders an help modal</li><br /></ul><br /></cre8-text-passage> |
| `utilityModalTitle`    | `utilityModalTitle` | `string`                                         |                                                  | Utility Modal Heading (String)                   |

## Methods

| Method                 | Type                                             | Description                                      |
|------------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames`  | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`             | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `handleCloseModal`     | `(): void`                                       | Handle on close<br />1) On close, set the modal to not active and dispatch event telling the parent the modal was closed. |
| `handleKeydown`        | `(e: KeyboardEvent): void`                       | Handle keydown<br />1) Close the modal when escape is hit when the user is focused within the modal |
| `handleOnClickOutside` | `(e: Event): void`                               | Handle "click outside"<br />1) onClick of the area around the modal window, close the modal. |
| `slotEmpty`            | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`         | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-multi-select

Multiselect is used when multiple options can be chosen from a static dropdown
This component has a list of items in the dropdown that can be added as "selected tags"
The checkbox will always reflect the selected nature of the item and is not removed
from the dropdown when clicked, the tags will be added and removed based on their state.

Event `selectedItemsChange` emits whenever a tag is added or remove from the list and the
current list after the change is given in the detail.

## Properties

| Property                    | Attribute                   | Type       | Default | Description                                      |
|-----------------------------|-----------------------------|------------|---------|--------------------------------------------------|
| `ariaDescribedBy`           | `ariaDescribedBy`           | `string`   |         | Used to connect the field note in text field to the text menu for accessibility |
| `disabled`                  | `disabled`                  | `boolean`  |         | The disabled attribute on the select             |
| `dropdownOpen`              |                             | `boolean`  | false   |                                                  |
| `errorNote`                 | `errorNote`                 | `string`   |         | The error field note that appears below the default field note |
| `fieldId`                   | `fieldId`                   | `string`   |         | The unique id of the select                      |
| `fieldNote`                 | `fieldNote`                 | `string`   |         | Optional field note text can be added to provide additional field guidance. |
| `isError`                   | `isError`                   | `boolean`  |         | Changes the component's treatment to represent an error state |
| `isSuccess`                 | `isSuccess`                 | `boolean`  |         | Changes the component's treatment to represent a success state |
| `items`                     | `items`                     | `string[]` | []      | The list of string items the user can choose in the dropdown<br /><br />Note: For passing props containing arrays and complex types, you should pass the props using a<br />period in from of the prop like so: `.items="[]"`<br />(this is only needed for Web Components and not the React version) |
| `label`                     | `label`                     | `string`   |         | The required label that appears above the multiselect |
| `preselectedItems`          | `preselectedItems`          | `string[]` |         | The list of string items that are initially in the selected list of tags<br />Note: This list MUST be a subset of the array of items to function.<br />i.e. if items=['cat', 'dog', 'bird'], preselectedItems=['cat'] is valid<br />while preselectedItems=['cat', 'goat'] is not and will break the component.<br /><br />Note: For passing props containing arrays and complex types, you should pass the props using a<br />period in from of the prop like so: `.items="[]"`<br />(this is only needed for Web Components and not the React version) |
| `selectedTagItems`          |                             | `string[]` | []      |                                                  |
| `successNote`               | `successNote`               | `string`   |         | The success field note that appears below the default field note |
| `validationAriaDescribedBy` | `validationAriaDescribedBy` | `string`   |         | Additional aria-describedby connection to id for additional success and error notes to be accessible |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event                 | Type                                        |
|-----------------------|---------------------------------------------|
| `selectedItemsChange` | `CustomEvent<{ selectedItems: string[]; }>` |


# cre8-nav-container

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                      |
|------|----------------------------------|
|      | The navigation container content |


# cre8-page-header

## Properties

| Property  | Attribute | Type     | Default             | Description       |
|-----------|-----------|----------|---------------------|-------------------|
| `heading` | `heading` | `string` | "Page header title" | Page header title |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description             |
|------|-------------------------|
|      | The page header content |


# cre8-page-counter

## Properties

| Property       | Attribute      | Type                                             | Default   |
|----------------|----------------|--------------------------------------------------|-----------|
| `currentPage`  | `currentPage`  | `number`                                         | 1         |
| `display`      | `display`      | `"compact" \| "icon-only" \| "default" \| undefined` | "default" |
| `pageSize`     | `pageSize`     | `number`                                         |           |
| `rangeVariant` | `rangeVariant` | `boolean \| undefined`                           |           |
| `totalResults` | `totalResults` | `number`                                         |           |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-pagination

The Pagination component is used to split up a large amount of results
 by showing only a certain amount on each page. You can cycle through
 the pages using Page Numbers, Next and Previous Buttons, or optional
 First Page and Last Page Buttons. This component is also used by Table
 to cycle through rows of results. Pagination has 3 display options:

**default**:  Can contain up to seven Page Numbers (ellipses included)
 at a time flanked by Next and Previous Buttons. When there are more than
 seven pages, numbers start getting replaced by ellipses. Use this option
 when you have a lot of horizontal space in a layout. It should not be used
 for mobile web layouts since its buttons are smaller than the minimum touch target of 44px.
 The component has built in responsivity to mobile page size so you dont have tohandle this
 seperately


**compact** : Best used as a summary of where you are among pages or table rows flanked by
Previous and Next Buttons. Use this option when you have limited horizontal space but still
need to show where users are among results. Great for mobile layouts.


**icon-only** : Use this option in very tight spaces when it’s not required to show users
where they are among results. Great for mobile layouts.


## HOW TO USE

Select an option from the “display” dropdown depending on layout width
Select where your current page is from the “Page” dropdown
To show less pages when using Full Numbers, use the "visiblePages” toggles
To hide the First Page and Last Page Buttons, turn on the “hideFirstLastButton” toggle
To change the states of page numbers or buttons, interact with the buttond to invoke each “State”
When using Compact Numbers, you can choose between “compact” and “icon-only” formats


## ACCESSIBILITY NOTE

To best orient people using screen readers, push focus to the top of
the list of results after any of the pagination buttons have been triggered,
**except for the currently selected one**. Focus target could be a visual results heading,
or the top heading of the results container of the page selected
via a programmatic selector, e.g. < section id=“results” aria-label="results-section" > or
< div role= “group” aria-label=“results” >.

## Properties

| Property                  | Attribute                 | Modifiers | Type                                             | Default      | Description                                      |
|---------------------------|---------------------------|-----------|--------------------------------------------------|--------------|--------------------------------------------------|
| `buttons`                 |                           |           | `(typeof Cre8Button)[]`                          |              |                                                  |
| `currentPage`             | `currentPage`             |           | `number`                                         |              |                                                  |
| `display`                 | `display`                 |           | `"compact" \| "icon-only" \| "default" \| undefined` |              | (optional) prop that allows for a compact and icon-only variant both<br />for mobile screen-sizes and for use in certain contexts as guided by design,<br />the component size will show 'default' in the absence of a value on desktop and<br />'compact' on smaller views. |
| `hideLastAndFirstButtons` | `hideLastAndFirstButtons` |           | `boolean \| undefined`                           |              |                                                  |
| `maxVisiblePages`         |                           | readonly  | `number \| undefined`                            |              |                                                  |
| `pagesize`                | `pagesize`                |           | `number`                                         |              | how many elements will displayVariant per page, indicated by business to typically be 20 |
| `totalResults`            | `totalResults`            |           | `number`                                         | **required** | Input the total number of elements are returned from consuming app e.g. search results |
| `visiblePages`            | `visiblePages`            |           | `number \| undefined`                            | 5            | Controls how many page buttons are displayVarianted on the page<br />at once, if container size permits. recommended max = 5 pages |
| `windowWidth`             |                           |           | `number`                                         |              |                                                  |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `connectedCallBack`   | `(): void`                                       |                                                  |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `displayTypes`        | `(): HTMLTemplateResult`                         |                                                  |
| `goToPage`            | `(page: number, buttonName?: string \| undefined): any` |                                                  |
| `handleKeydown`       | `(page: number, buttonName?: string \| undefined): (e: KeyboardEvent) => void` |                                                  |
| `handleResize`        | `(): void`                                       |                                                  |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event              | Type                                             |
|--------------------|--------------------------------------------------|
| `pagination.click` | `CustomEvent<{ buttonName: string; value: number; }>` |

## CSS Shadow Parts

| Part   | Description                                      |
|--------|--------------------------------------------------|
| `icon` | distinguishes the page buttons from the icon buttons |

## CSS Custom Properties

| Property                       | Description                                 |
|--------------------------------|---------------------------------------------|
| `--pagination-align-items`     | controls vertical alignment of pagination   |
| `--pagination-display`         | controls the display css property           |
| `--pagination-justify-content` | controls horizontal alignment of pagination |


# cre8-percent-bar

The percent bar visually indicates a user's current progress and has a few features: a basic display bar with
a percentage, an actionable icon that allows a user to revisit a prior step and an actionable link that
allows a user save their progress before exiting.

## Properties

| Property            | Attribute           | Type                   | Description                                      |
|---------------------|---------------------|------------------------|--------------------------------------------------|
| `disableActionLeft` | `disableActionLeft` | `boolean \| undefined` | The action-left icon-only tertiary button in the percent bar controls can be disabled. |
| `max`               | `max`               | `number`               | The total number of steps in the multistep process. |
| `value`             | `value`             | `number`               | The current step the user is on.                 |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event                   |
|-------------------------|
| `leftActionButtonClick` |


# cre8-popover

The Popover is for progressive disclosure of relevant content often hidden behind a help or info icon.
Its content should be no longer than 3-4 lines in addition to a line of heading text and an optional button.

## Properties

| Property               | Attribute           | Modifiers | Type                      | Default                                          | Description                                      |
|------------------------|---------------------|-----------|---------------------------|--------------------------------------------------|--------------------------------------------------|
| `handleOnClickOutside` |                     |           | `(e: MouseEvent) => void` | "(e: MouseEvent) => {\n    /* 2 */\n      if (!this.isActive) {\n          return;\n      }\n\n    /* 3 */\n      if (!this.shadowRoot?.host) {\n          throw Error('Could not determine panel context during click handler');\n      }\n\n    /* 4 */\n      const didClickInside = e.composedPath().includes(this.shadowRoot.host);\n\n    /* 5 */\n      if (!(e.target === document.querySelector('html') && e.clientX >= document.documentElement.offsetWidth)) {\n          if (this.isActive && !didClickInside) {\n              this._toggleActive();\n          }\n      }\n  }" | Handle click outside the component<br />1. Close the show/hide popover panel on click outside<br />2. If the popover panel is already closed then we don't care about outside clicks and we can bail early<br />3. By the time a user clicks on the page the shadowRoot will almost certainly be<br />defined, but TypeScript isn't that trusting and sees this.shadowRoot as possibly<br />undefined. To work around that we'll check that we have a shadowRoot (and a<br />rendered .host) element here to appease the TypeScript compiler. This should never<br />actually be shown or run for a human end user.<br />4. Check to see if we clicked inside the active panel<br />5. If the panel is active and we've clicked outside of the panel then it should be closed. |
| `heading`              | `heading`           |           | `string \| undefined`     |                                                  | The heading text that appears at the top of the popover panel. Should only be 2-3 lines max. |
| `isActive`             | `isActive`          |           | `boolean \| undefined`    |                                                  | The active state for the popover<br />- If true, the popover panel is visible<br />- If false, the popover panel is hidden<br /><br />_This property is dynamically set_ |
| `isActiveDynamic`      | `isActiveDynamic`   |           | `boolean \| undefined`    |                                                  | The dynamic active state<br />_This property is dynamically set_ |
| `isDynamic`            | `isDynamic`         |           | `boolean \| undefined`    |                                                  | The dynamic state for the popover<br />- If true, the popover panel placement is determined by its position in the viewport<br />- If false, the popover panel placement will be placed according to the position value |
| `isRTL`                |                     | readonly  | `boolean`                 |                                                  | Query the document direction value<br /><br/><br/> _*This property is dynamically set_ |
| `isVisibleOnScroll`    | `isVisibleOnScroll` |           | `boolean \| undefined`    |                                                  | Set to prevent the popover panel from hiding on scroll |
| `position`             | `position`          |           | `string \| undefined`     |                                                  | Positions the popover panel absolutely to the trigger<br />- **default** positions the popover panel below the trigger<br />- **top** positions the popover panel below the trigger<br />- **left** positions the popover panel below the trigger<br />- **right** positions the popover panel below the trigger |
| `removeActive`         |                     |           | `() => void`              | "() => {\n      if (this.isActive) {\n          this._toggleActive();\n      }\n  }" | Remove Active State<br />1. If a specific event is fired, remove the active state. |
| `removeActiveOnScroll` |                     |           | `() => void`              | "() => {\n    /* 1 */\n      if (this.isActive && !this.isVisibleOnScroll) {\n      /* 2 */\n          const popoverPanel = this._Cre8PopoverPanel.getBoundingClientRect();\n          const popoverTrigger = this._Cre8Popover;\n          const popoverHeight = popoverTrigger.clientHeight + popoverPanel.height + popoverPanel.top;\n\n          if (popoverHeight < window.innerHeight) {\n              this._toggleActive();\n          }\n      }\n  }" | Remove Active State on Scroll<br />1. If a scroll event is fired and visibileOnScroll is not true, remove the active state<br />2. If the popover height is less than the window height, then allow the active to remove on scroll |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `addAria`             | `(): void`                                       | Add aria attributes on the trigger button<br />1. Select the element within the trigger slot<br />2. Set aria-expanded on the popover trigger to the active state if provided. Otherwise, set to false.<br />3 Set the type to button. |
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `dynamicPosition`     | `(): void`                                       | Handle all dynamic placement                     |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event   | Type                                |
|---------|-------------------------------------|
| `close` | `CustomEvent<{ isActive: false; }>` |
| `open`  | `CustomEvent<{ isActive: true; }>`  |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-primary-nav-item

## Properties

| Property   | Attribute  | Type                   | Default      | Description                                      |
|------------|------------|------------------------|--------------|--------------------------------------------------|
| `href`     | `href`     | `string`               | "#"          | Primary nav item href                            |
| `iconName` | `iconName` | `string \| undefined`  | "caret-down" | Icon name                                        |
| `isActive` |            | `boolean \| undefined` |              | Append to the class name. Used for passing in utility classes |
| `megaMenu` | `megaMenu` | `boolean \| undefined` |              | Append to the class name. Used for passing in utility classes |
| `text`     | `text`     | `string`               | "Nav item"   | Primary nav item text                            |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                       |
|------|-----------------------------------|
|      | The label for the navigation item |


# cre8-primary-nav

## Properties

| Property       | Attribute      | Type                          | Default | Description                                      |
|----------------|----------------|-------------------------------|---------|--------------------------------------------------|
| `behavior`     | `behavior`     | `"side-by-side" \| undefined` |         | Behavior variant<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**side-by-side** keeps the primary nav item always in a horizontal pattern</li><br /></ul><br /></cre8-text-passage> |
| `inverted`     | `inverted`     | `boolean \| undefined`        |         | Inverted variant<br />1) Used for dark backgrounds |
| `navAriaLabel` | `navAriaLabel` | `string`                      | "main"  | aria-label attribute to designate at name for the nav. Can be override by user |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                  |
|------|------------------------------|
|      | The primary navigation items |


# cre8-progress-meter

A progress meter provides feedback that the system is working and gives
the user an indication of how much time they will wait.
This indicator should be used when the system response time is longer and determinable.

## Properties

| Property   | Attribute  | Type      | Default | Description                                      |
|------------|------------|-----------|---------|--------------------------------------------------|
| `fieldId`  | `fieldId`  | `string`  |         | Progress Meter FieldId                           |
| `knockout` | `knockout` | `boolean` |         | Determines if the progress meter is displayed on a dark background (uses knockout colors for contrast) |
| `label`    | `label`    | `string`  |         | Progress Meter label                             |
| `max`      | `max`      | `number`  | 100     | The max number for the progress bar (defaulted to 100 to match percentages) |
| `name`     | `name`     | `string`  |         | Progress Meter name                              |
| `status`   | `status`   | `status`  |         | Progress Status<br />- **Default** renders a meter with default status fill<br />- **Error** renders a meter with an error status fill<br />- **Warning** renders a meter with a warning status<br />- **Success** renders a meter with a success status fill |
| `value`    | `value`    | `number`  |         | The the percentage of the bar that is filled in (defaulted to match percentages)<br />I.E a value of 50 with a 100 max would result in half the meter being filled |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-progress-steps-item

The Progress Steps Item component is used to display a single step in a multi-step process.
It should be used as a child component of `cre8-progress-steps`.
These Components serve a contextual purpose and don't provide any functionality.

## Properties

| Property  | Attribute | Type     | Description                                      |
|-----------|-----------|----------|--------------------------------------------------|
| `message` | `message` | `string` | Optional message to display under the step name. |
| `name`    | `name`    | `string` | The name of the step.                            |
| `state`   | `state`   | `string` | The state of the step: 'complete', 'current', 'error',' incomplete', 'warning'; |
| `svg`     | `svg`     | `string` | An SVG string to use as the step icon.           |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-radio-field-item

A Radio Field Item adds a radio button to a Radio Field. Radio buttons let a user choose only one of several
options. Do not use a single radio button, because once selected, it cannot be de-selected. If the user can only
choose one, none or many options, use Checkbox instead.

## Properties

| Property            | Attribute           | Type                  | Default | Description                                      |
|---------------------|---------------------|-----------------------|---------|--------------------------------------------------|
| `ariaDescribedBy`   | `ariaDescribedBy`   | `string`              |         | Identifies the element that provides a detailed, extended description for the object. |
| `checked`           | `checked`           | `boolean`             |         | A Boolean attribute which, if present, sets the radio button as selected. |
| `disabled`          | `disabled`          | `boolean`             |         | The Boolean disabled attribute, when present, makes the element not mutable, focusable, or even submitted with<br />the form. The user can neither edit nor focus on the control, nor its form control descendants. |
| `field`             |                     | `HTMLInputElement`    |         | Get the radio field item input                   |
| `fieldId`           | `fieldId`           | `string \| undefined` |         | The fieldId attribute is assigned to the HTML input element of the radio button and the for attribute of the<br />corresponding label. |
| `fieldNote`         | `fieldNote`         | `string \| undefined` |         | A FieldNote can be placed to provide guidance. It's frequently used to in the context of form fields for extra<br />information or validation messages. |
| `fieldNoteIconName` | `fieldNoteIconName` | `string \| undefined` |         | Sets the item fieldnote icon.<br /><br />- **check** renders a badge with success state treatment<br />- **error** renders a badge with error state treatment |
| `fieldNoteIsError`  | `fieldNoteIsError`  | `boolean`             |         | Sets the error state of the fieldnote.           |
| `fieldNoteKnockout` | `fieldNoteKnockout` | `boolean`             |         | Radio item fieldnote knockout                    |
| `isError`           | `isError`           | `boolean`             |         | The isError attribute is used to indicate an error state related to the radio button. |
| `isSuccess`         | `isSuccess`         | `boolean`             |         | The isSuccess attribute is used to indicate a success state related to the radio button. |
| `label`             | `label`             | `string \| undefined` |         | The label attribute is used to assign a value to the label element corresponding to this radio button. |
| `name`              | `name`              | `string \| undefined` |         | The name attribute is used to assign a value to the name attribute of the input element in the DOM. |
| `required`          | `required`          | `boolean`             |         | Required attribute                               |
| `type`              |                     | `string`              | "radio" |                                                  |
| `value`             | `value`             | `string`              |         | The value of the form field.                     |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `formResetCallback`   | `(): void`                                       | Reset form callback<br />1) Remove the checked state from all radio elements<br />2) Set the checked state to the initial checked state<br />3) Set the radio field input checked attribute to the initial checked state |
| `handleKeyDown`       | `(e: KeyboardEvent): void`                       | Handle keydown<br />1) If left or up arrow key is struck and radio field item exists before current item,<br />   remove checked from all items and add it to the next item<br />2) If right or down arrow key is struck and radio field item exists after current item,<br />   remove checked from all items and add checked to the next item. Focus on this item<br />   and set tabindex for when focusing out of radio field and back onto checked item.<br />3) If the element is in focused, then for event emission the current<br />   focues element should be clicked to emit event.<br />4) If the Tab key is pressed, and none of the items are checked<br />   then jump away from field set to the next tabbable item |
| `removeChecked`       | `(): void`                                       | Remove checked<br />1) Remove checked property from all items and set tabindex to -1<br />2) Reset the form field to not checked |
| `resetField`          | `(): void`                                       | Reset the radio field                            |
| `resetTabIndeces`     | `(radioFieldItems: Cre8RadioFieldItem[]): void`  | Reset the radio field items tab indeces          |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-radio-field

Radio Field is the parent container for `radio-field-item`.
It is required to allow for grouping numerous radio fields that need additional context (in the form of `<legend>`).
It also provides accessibility roles, aria attributes and field note messaging on the group.

See [radio-field-item](?path=/story/cre8-components-radio-field-item--default) for more guidance on its usage.

## Properties

| Property            | Attribute           | Type                  | Description                                |
|---------------------|---------------------|-----------------------|--------------------------------------------|
| `ariaDescribedBy`   | `ariaDescribedBy`   | `string`              | Radio container fieldnote aria describe by |
| `fieldNote`         | `fieldNote`         | `string`              | Radio Field Note                           |
| `fieldNoteIconName` | `fieldNoteIconName` | `string`              | Radio container fieldnote icon name        |
| `fieldNoteKnockout` | `fieldNoteKnockout` | `boolean`             | Radio container fieldnote knockout         |
| `isError`           | `isError`           | `boolean`             | Radio container fieldnote isError          |
| `isSuccess`         | `isSuccess`         | `boolean`             | Radio container fieldnote isSuccess        |
| `label`             | `label`             | `string \| undefined` | Radio field legend label                   |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The component content, which should be a set of `radio-field-item`s |


# cre8-remove-tag

Clicking a Remove Tag causes it to disappear from the page or field (in the case of Multi-Select).
These tags always display a "Close" icon.

## Properties

| Property   | Attribute  | Type                   | Default   | Description                                      |
|------------|------------|------------------------|-----------|--------------------------------------------------|
| `color`    | `color`    | `Color`                | "neutral" | The tag color scheme<br /><br /> - **neutral** should be used when doing non-link actions such as filters or multi-select, within forms, etc.<br /> - **neutral-hybrid** should be used for when tags are doing an action like a button or a link<br /> - **branded** should be used like Neutral, but for marketing / actionable items |
| `disabled` | `disabled` | `boolean \| undefined` |           | Disabled state for remove tag                    |
| `shape`    | `shape`    | `Shape`                | "round"   | The tag shape<br /><br />- **round** will give the tag a rounded border<br />- **square** will give the tag a squared border |
| `text`     | `text`     | `string \| undefined`  |           | The tag text                                     |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event              | Type                                |
|--------------------|-------------------------------------|
| `removeTagClicked` | `CustomEvent<{ message: string; }>` |


# cre8-section

The section component acts as a block level HTML element that takes a 'headline' property
that renders the section's heading which wraps around any HTML template
that is found under this heading in the page layout.

# How to Use
1. Use the headline attribute to create the section header, or if you need a more custom header
   there is a slot="header" that you can target for inserting a custom template.
2. For the main body contents, any html template can be placed inside the cre8-section component
   and will automatically render below the header.

Note: for a section with a dark background please control this with the internal Components' inverted attributes.

## Properties

| Property   | Attribute  | Type                  | Description                                      |
|------------|------------|-----------------------|--------------------------------------------------|
| `headline` | `headline` | `string \| undefined` | The Headline will be rendered as the Section Headline with the correct brand styling applied |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The content of the section should go here.<br />It could be a cre8-text-passage, a cre8-card or any other block level html. |


# cre8-select-tile-list

Select Tile List is a container design to hold multiple Select Tile Components.

## Properties

| Property             | Attribute            | Type                   | Default   | Description                                      |
|----------------------|----------------------|------------------------|-----------|--------------------------------------------------|
| `ariaDescribedBy`    | `ariaDescribedBy`    | `string \| undefined`  |           | Select Tile container fieldnote aria describe by |
| `fieldNote`          | `fieldNote`          | `string \| undefined`  |           | Select Tile container fieldnote                  |
| `fieldNoteIconName`  | `fieldNoteIconName`  | `string \| undefined`  |           | Select Tile container fieldnote icon name        |
| `fieldNoteIsError`   | `fieldNoteIsError`   | `boolean \| undefined` |           | Select Tile container fieldnote isError          |
| `fieldNoteIsSuccess` | `fieldNoteIsSuccess` | `boolean \| undefined` |           | Select Tile container fieldnote isSuccess        |
| `fieldNoteKnockout`  | `fieldNoteKnockout`  | `boolean \| undefined` |           | Select Tile container fieldnote knockout         |
| `label`              | `label`              | `string \| undefined`  |           | Select Tile container label                      |
| `variant`            | `variant`            | `"columns" \| "rows"`  | "columns" | Whether to show the tiles side by side (columns) or stacked vertically (rows). |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
| `""` | The default slot norminally contains multiple `<select-tile />` Components. |

## CSS Custom Properties

| Property                             | Description                                   |
|--------------------------------------|-----------------------------------------------|
| `--cre8-select-tile-list-item-width` | Width of each child. Not used for horizontal. |


# cre8-select-tile

The Select Tile component is a short block of content inside a visual
container that can be used in place of checkboxes, radio buttons, and
links.  It allows you to add more descriptive and visually appealing
content for these actions while letting you compare different choices
either side-by-side or on top of each other.

Typically you could use the "header" slot for an icon, and the "title"
and "body" slots for a content title and body text below it.

The css parts are shown here wrapped in ::part() because otherwise Storybook
won't render them and the slots if they have the same name.
See https://developer.mozilla.org/en-US/docs/Web/CSS/::part

## Properties

| Property                 | Attribute                | Modifiers | Type                                             | Default | Description                                      |
|--------------------------|--------------------------|-----------|--------------------------------------------------|---------|--------------------------------------------------|
| `align`                  | `align`                  |           | `"center" \| undefined`                          |         | Align variants<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**center** renders a select-tile that has center aligned content/text</li><br /></ul><br /></cre8-text-passage> |
| `checkPosition`          | `checkPosition`          |           | `"none" \| "left" \| "top-right" \| "right"`     | "right" | Where does the checkmark or radio button go?<br />It disappears on 'none'. Only top-right is supported for vertical variants. |
| `checked`                | `checked`                |           | `boolean \| undefined`                           |         | Checked State.<br />Note: the `checked` attribute sets the `defaultChecked` property, as well<br />as sets the initial value for the `checked` property. |
| `defaultChecked`         |                          |           | `boolean`                                        |         | The default checked state when the element first renders or is reset.<br /><br />Note: the attribute is named `checked` and the property is<br />named `defaultChecked`. This is the same as a regular radio button. |
| `disabled`               | `disabled`               |           | `boolean \| undefined`                           |         | Disabled State                                   |
| `field`                  |                          |           | `HTMLInputElement`                               |         | Get the radio field item input                   |
| `fieldId`                | `fieldId`                |           | `string \| undefined`                            |         | Select Tile FieldId                              |
| `form`                   |                          | readonly  | `HTMLFormElement \| null`                        |         | The form associated with this field<br /><br />TOOD: maybe this goes on Cre8FormElement |
| `isError`                | `isError`                |           | `boolean \| undefined`                           |         | Error State                                      |
| `isSuccess`              | `isSuccess`              |           | `boolean \| undefined`                           |         | Radio item fieldnote isSuccess                   |
| `name`                   | `name`                   |           | `string \| undefined`                            |         | Name of the form control.                        |
| `radioVariant`           | `radioVariant`           |           | `"dot" \| "check"`                               | "dot"   | In radio mode, whether to use the circle with the dot, or the rounded check. |
| `required`               | `required`               |           | `boolean \| undefined`                           |         | Required attribute                               |
| `type`                   | `type`                   |           | `"checkbox" \| "radio"`                          | "radio" | Should this Select Tile behave as a radio button or a checkbox? |
| `value`                  | `value`                  |           | `string`                                         |         | The value of the form field.                     |
| `variant`                | `variant`                |           | `"bare" \| "horizontal" \| "horizontal-bare" \| undefined` |         | Style variants<br />- **bare** renders a select-tile without a border and without padding around the content<br />- **horizontal** renders a select-tile with header, body, footer oriented in a row rather than a column<br />- **horizontal-bare** renders a select-tile with header, body, footer<br />  oriented in a row rather than a column without a border and without padding around the content |
| `variantBreakToVertical` | `variantBreakToVertical` |           | `"sm" \| "lg" \| "none" \| "md" \| "sm-2" \| "xl" \| "xxl"` | "sm"    | Which breakpoint, if any, to switch to verticial.<br />Only useful for horizontal variants. Defaults to 'sm'. |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `formResetCallback`   | `(): void`                                       | Reset form callback<br />1) Remove the checked state from all radio elements<br />2) Set the checked state to the initial checked state<br />3) Set the radio field input checked attribute to the initial checked state |
| `renderCheckboxIcon`  | `(): TemplateResult<1> \| null`                  |                                                  |
| `renderInput`         | `(): TemplateResult<1>`                          |                                                  |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event    |
|----------|
| `change` |
| `input`  |

## Slots

| Name     | Description                                      |
|----------|--------------------------------------------------|
| `""`     | The default slot goes into the center, main part of the Select Tile.<br />  Consider using title and body instead. |
| `body`   | The "body" part of the Select Tile, which appears under<br />         the title slot and receives apporpriate typography. |
| `footer` | The bottom or right part of the Select Tile      |
| `header` | The top or left part of the Select Tile          |
| `title`  | The title part of the Select Tile, use with body slot and<br />        instead of the default slot for appropriate typography. |

## CSS Shadow Parts

| Part                  | Description                                      |
|-----------------------|--------------------------------------------------|
| `::part(body)`        | The main body of the select-tile, wrapper around the default slot |
| `::part(body-body)`   | The element that wraps the "body" slot           |
| `::part(body-title)`  | The element that wraps the "title" slot          |
| `::part(footer)`      | The footer element wrapping the right element    |
| `::part(header)`      | The header element wrapping the left or top element |
| `::part(select-tile)` | The main wrapping element                        |


# cre8-select

The Select control is designed and built to be used for selecting between choices in a form.
It is not a Dropdown control which is generally used for displaying lists of choices
that act as links or actions, like filter options.

Consider the use of a Select control carefully.
When you have less than 5 options for the user to choose from,
Radio or Checkbox inputs may be a better choice to display all of the options at once.
Users have to slow down to scan a list with more than 15 options,
so using an option group to give the options hierarchy may help users find their choice faster.
Alternately, a text input field might be a more appropriate control to use when there are too many options,
especially when used with typeahead/auto-complete.

## How to use
1. The collapsed default state always shows a default placeholder value or a selected value.
2. Sort list items in a logical order, such as grouping highly related options together,
   placing most common options first, using alphabetical or numeric orders or dates in chronological order.
3. A list that includes 6+ items should show a scrollbar.
4. Users should be able to use a keystroke to quickly jump
   to selecting an option that begins with the entered letter.
5. Utilize appropriate native controls for when a user is on a mobile device rather than our custom Select.
6. Adhere to our common form field conventions and always include a Label,
   provide short and clear error messages in context, avoid using the Read-only
   and Disabled states as much as possible, and utilize the info/formatting tip
   or helpful link rather than placeholder text.

## Properties

| Property                    | Attribute                   | Type                                            | Default  | Description                                      |
|-----------------------------|-----------------------------|-------------------------------------------------|----------|--------------------------------------------------|
| `ariaDescribedBy`           | `ariaDescribedBy`           | `string`                                        |          | Used to connect the field note in text field to the text menu for accessibility |
| `disabled`                  | `disabled`                  | `boolean`                                       |          | The disabled attribute on the select             |
| `errorNote`                 | `errorNote`                 | `string`                                        |          | The error field note that appears below the default field note |
| `field`                     |                             | `HTMLSelectElement`                             |          | Select input querySelector                       |
| `fieldId`                   | `fieldId`                   | `string`                                        |          | The unique id of the select                      |
| `fieldNote`                 | `fieldNote`                 | `string`                                        |          | Optional field note text can be added to provide additional field guidance. |
| `isError`                   | `isError`                   | `boolean`                                       |          | Changes the component's treatment to represent an error state |
| `isSuccess`                 | `isSuccess`                 | `boolean`                                       |          | Changes the component's treatment to represent a success state |
| `items`                     | `items`                     | `(Cre8SelectOption \| Cre8SelectOptionGroup)[]` | []       | A mix of Cre8SelectOption and Cre8SelectOptionGroup definitions:<br />- Cre8SelectOption<br />  - label: option label text - `string`<br />  - value: option value - `number \| string`<br />- Cre8SelectOptionGroup<br /> - optGroupLabel: optgroup label text - `string`<br /> - options: Array of multiple Cre8SelectOption items - `Cre8SelectOption[]` |
| `label`                     | `label`                     | `string`                                        | "Label"  | The required label that appears above the select |
| `name`                      | `name`                      | `string`                                        |          | The name property on the select                  |
| `required`                  | `required`                  | `boolean`                                       |          | The required attribute on the select             |
| `successNote`               | `successNote`               | `string`                                        |          | The success field note that appears below the default field note |
| `type`                      |                             | `"select"`                                      | "select" |                                                  |
| `validationAriaDescribedBy` | `validationAriaDescribedBy` | `string`                                        |          | Additional aria-describedby connection to id for additional success and error notes to be accessible |
| `value`                     | `value`                     | `string`                                        |          | The value of the form field.                     |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `formResetCallback`   | `(): void`                                       |                                                  |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event    | Type                                             |
|----------|--------------------------------------------------|
| `change` | `CustomEvent<{ name: string \| undefined; value: string; }>` |

## Slots

| Name        | Description                               |
|-------------|-------------------------------------------|
| `fieldNote` | Container for optional field note content |


# cre8-skeleton-loader

Skeleton Loader allows for the ability to create placeholder UI loading states.
Developers are encouraged to pass into the Skeleton Loader their own parameters
to create simple (or complex) loading screens.

## How to Use
Skeleton states are simplified versions of components used on an initial page load
to indicate that the information on the page has not fully loaded yet.
They only appear for only a few seconds, disappearing once components and content populate the page.
These loaders use motion to convey that the page is not stuck and that data is still being loaded.
This can help to reduce user uncertainty. Skeleton objects should generally be visualized
by simple primitives which mimic the original content in a recognizable way.
It is recommended to use a more elaborate form if that is needed to make the component recognizable.

Never represent toast notifications, overflow menus, dropdown items, modals, and loaders with skeleton states.
Elements inside a modal may have a skeleton state, but the modal itself should not.

**IMPORTANT!** This is not a loading element and will provide no value to a screen reader user,
this is a decorative element only!

## Properties

| Property  | Attribute | Type                                  | Default     | Description                                      |
|-----------|-----------|---------------------------------------|-------------|--------------------------------------------------|
| `height`  | `height`  | `string`                              |             | Height inline style<br />1. Used to set a height on the skeleton if specific size is needed |
| `variant` | `variant` | `"rectangle" \| "square" \| "circle"` | "rectangle" | Style variant<br />- **rectangle** renders a featureless rectangle as a placeholder for loading elements<br />- **square** renders a featureless square as a placeholder for loading elements<br />- **circle** renders a featureless circle as a placeholder for loading elements |
| `width`   | `width`   | `string`                              |             | Width inline style<br />1. Used to set a width on the skeleton if specific size is needed |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-split-button

## Properties

| Property       | Attribute    | Type                        | Default | Description                                      |
|----------------|--------------|-----------------------------|---------|--------------------------------------------------|
| `buttonText`   | `buttonText` | `string`                    |         | Display text on the button                       |
| `disabled`     | `disabled`   | `boolean \| undefined`      |         |                                                  |
| `dropdownOpen` |              | `boolean`                   | false   |                                                  |
| `size`         | `size`       | `"sm" \| "lg" \| undefined` |         | Size variant<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**sm** shrinks the button typography and overall size</li><br /><li>**lg** increases the button typography size and overall size</li><br /></ul><br /></cre8-text-passage> |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event            |
|------------------|
| `dropdown-click` |
| `text-click`     |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The component content , this will consist of the dropdown when the user clicks the caret |


# cre8-submenu-item

## Properties

| Property | Attribute | Type                  | Description  |
|----------|-----------|-----------------------|--------------|
| `href`   | `href`    | `string \| undefined` | The link URL |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-submenu

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-tab-panel

## Properties

| Property           | Attribute          | Type                   | Description                                      |
|--------------------|--------------------|------------------------|--------------------------------------------------|
| `index`            | `index`            | `number \| undefined`  | Used to align the tab panel with the tab<br /><br/><br/> _*This property is dynamically set_ |
| `isActive`         | `isActive`         | `boolean \| undefined` | Indicates if the panel is active<br /><br/><br/> _*This property is dynamically set_ |
| `skipFocusOnPanel` | `skipFocusOnPanel` | `boolean \| undefined` | This will remove focus on panel element          |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-tab

## Properties

| Property         | Attribute        | Type                   | Description                                      |
|------------------|------------------|------------------------|--------------------------------------------------|
| `ariaLabelledBy` | `ariaLabelledBy` | `string \| undefined`  | Used to connect tab trigger and tab panel for accessibility<br /><br />_*This property is dynamically set_ |
| `index`          | `index`          | `number \| undefined`  | Used to align the tab with the tab panel<br /><br />_*This property is dynamically set_ |
| `isActive`       | `isActive`       | `boolean \| undefined` | If is true, tab has active state and cooresponding tab panel is visible.<br /><br />_*This property is dynamically set_ |
| `size`           | `size`           | `"sm" \| undefined`    | Tab sizes<br />- **default** displays the tab text with cre8-typography-label-default<br />- **sm** displays the tab text with cre8-typography-label-small and decrease padding<br /><br />_*This property is dynamically set_ |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event         | Type                                           |
|---------------|------------------------------------------------|
| `tabSelected` | `CustomEvent<{ index: number \| undefined; }>` |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-table-body

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-table-cell

## Properties

| Property     | Attribute    | Type                  | Description                                      |
|--------------|--------------|-----------------------|--------------------------------------------------|
| `colspan`    | `colspan`    | `number \| undefined` | Colspan attribute on td                          |
| `dataHeader` | `dataHeader` | `string \| undefined` | Column header text for cell to display when table is using responsive variant |
| `variant`    | `variant`    | `"bare" \| undefined` | Style variants<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**bare** renders a table cell without a border</li><br /></ul><br /></cre8-text-passage> |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-table-header-cell

## Properties

| Property  | Attribute | Type                  | Description                                      |
|-----------|-----------|-----------------------|--------------------------------------------------|
| `colspan` | `colspan` | `number \| undefined` | Colspan attribute on th                          |
| `width`   | `width`   | `string \| undefined` | Adds inline width style to th<br />Sets width of entire column |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-table-header

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-table-object

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-table-row

## Properties

| Property              | Attribute             | Type                   | Default              | Description                                      |
|-----------------------|-----------------------|------------------------|----------------------|--------------------------------------------------|
| `collapsedButtonText` | `collapsedButtonText` | `string`               | "Expand Table Row"   | Expand button text                               |
| `expandedButtonText`  | `expandedButtonText`  | `string`               | "Collapse Table Row" | Expanded button text                             |
| `isExpandable`        | `isExpandable`        | `boolean \| undefined` |                      | Indicates row has additional visually hidden related content |
| `isExpanded`          | `isExpanded`          | `boolean \| undefined` |                      | Visually show additional expandable content      |
| `variant`             | `variant`             | `"bare" \| undefined`  |                      | Style variants<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**bare** renders a table row without a border</li><br /></ul><br /></cre8-text-passage> |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |
| `toggleIsExpanded`    | `(): void`                                       |                                                  |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-table

## Properties

| Property      | Attribute     | Type                        | Description                                      |
|---------------|---------------|-----------------------------|--------------------------------------------------|
| `behavior`    | `behavior`    | `"responsive" \| undefined` | Behavior variants<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**responsive** stacks column headers with respective table cells on small screens</li><br /></ul><br /></cre8-text-passage> |
| `caption`     | `caption`     | `string \| undefined`       | Specifies the caption/title of the table, visible to all users.<br />Increases accessibility of table. |
| `isHoverable` | `isHoverable` | `boolean \| undefined`      | Hoverable rows variant<br />1) Allows the table rows to be styled on hover |
| `variant`     | `variant`     | `"striped" \| undefined`    | Style variants<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**striped** add zebra-striping to table rows within the `<tbody>`</li><br /></ul><br /></cre8-text-passage> |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-tabs

Tabs are used to quickly navigate back and forth between views.
The Tab design and interaction varies depending on the requirements for your organization and project.
Standardizing on the best individual controls will improve usability and reduce development and QA time.

Create a standard set of Tab controls:
Primary Tabs (for system navigation), Secondary Tabs (for sub navigation within a screen).

## Usability Guidelines
- The selected Tab should be visually differentiated from the other Tabs.
  The deselected Tabs should still look enabled.
  Dimming the other Tabs decreases the legibility of items that are actually active and clickable.
- There must be a minimum of 2 Tabs.
- Showing status in a Tab is non-standard (such as 0%, 10%).
- Tab labels and content should be parallel, with the exception of a Summary or Overview Tab
  which can be a rollup of content across other Tabs.
- Keep the font size of the Tabs the same.
  If the Tabs are a fixed width and one of the labels is too long,
  don't resize the text to fit and consider wrapping text to a second line.
- If possible, don't truncate text because it makes it harder to understand what's in the Tab.
- Try not to use more than six Tabs to keep the UI uncluttered.
- Do not stack Tabs on top of each other, and do not nest Tabs within Tabs.
  Find alternate ways of navigating page hierarchy.

## Properties

| Property       | Attribute     | Modifiers | Type                   | Default | Description                                      |
|----------------|---------------|-----------|------------------------|---------|--------------------------------------------------|
| `activeIndex`  | `activeIndex` |           | `number`               | 0       | Sets the initial active tab (e.g. 0 sets the first tab, 1 sets the second tab, etc.) |
| `activeTab`    |               |           | `Cre8Tab \| undefined` |         | The active tab<br /><br />_*This property is dynamically set_ |
| `emitEvent`    |               |           |                        |         |                                                  |
| `fullWidth`    | `fullWidth`   |           | `boolean`              |         | Displays a set of tabs with a spanning the width of the element |
| `handleResize` |               |           |                        |         |                                                  |
| `handleScroll` |               |           |                        |         |                                                  |
| `isEnd`        | `isEnd`       |           | `boolean`              | false   | If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false.<br /><br />_*This property is dynamically set_ |
| `isRTL`        |               | readonly  | `boolean`              |         | Query the document direction value<br /><br />_*This property is dynamically set_ |
| `isStart`      | `isStart`     |           | `boolean`              | true    | If position from left is greater than 0, set isStart to false. Otherwise set isStart to true.<br /><br />_*This property is dynamically set_ |
| `setIsEnd`     |               |           |                        |         |                                                  |
| `setIsStart`   |               |           |                        |         |                                                  |
| `size`         | `size`        |           | `"sm"`                 |         | Tab sizes<br />- **default** displays the cre8-tab text with cre8-typography-label-default<br />- **sm** displays the cre8-tab text with cre8-typography-label-small |
| `tabId`        |               |           | `string`               |         | Auto Increment id to sync tab and tab panel<br /><br />_*This property is dynamically set_ |

## Methods

| Method                     | Type                                             | Description                                      |
|----------------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames`      | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`                 | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `emitEvent`                | `(): void`                                       | Emit custom event                                |
| `handleKeydown`            | `(event: KeyboardEvent): void`                   | Handle Keydown<br />1. If the active tab is not focused then handle the keydown events.<br />2. On keydown of the right arrow, make the next tab active.<br />3. On keydown of the left arrow, make the previous tab active.<br />4. On keydown of the home key, make the first tab active.<br />5. On keydown of the end key, make the last tab active.<br />6. On keydown of the escape key, remove the focus. |
| `handleResize`             | `(): void`                                       | Handle Resize<br />1. On resize, if position from left is greater than 0, set isStart to false. Otherwise set isStart to true.<br />2. On resize, If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false. |
| `handleScroll`             | `(): void`                                       | Handle Scroll<br />1. On scroll, if position from left is greater than 0, set isStart to false. Otherwise set isStart to true.<br />2. On scroll, If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false. |
| `handleTabSelected`        | `(event: MouseEvent): void`                      | Handle Tab Selected<br />1. Only continue if event target is a tab<br />2. If tab is active, make the previous selected tab inactive.<br />3. Set the clicked tab active.<br />4. Emit the custom event. |
| `isInViewport`             | `(): boolean`                                    | Check if last overflow list item is in the viewport<br />1. Get children of the overflow list inner container and get bounding client rectangle of last child<br />2. Return true if the left property is greater than or equal to 0 and if the right property is less<br />than or equal to the window inner width or document client width |
| `removePreviousActiveTab`  | `(): void`                                       | Remove Active from Previous Tab<br />1. Get current selected Tab index then deactivate previously selected tab<br />2. If current activeIndex is in first position then move the tab focus to last tab |
| `setActiveTab`             | `(): void`                                       | Set Active Tab<br />1. Sets the active state for the selected tab.<br />2. Sets the active state for the tab panel with the same index value as the selected tab. |
| `setActiveTabFocus`        | `(): void`                                       | Set Active Tab Focus                             |
| `setIsEnd`                 | `(): void`                                       | Set isEnd State<br />1. If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false. |
| `setIsStart`               | `(): void`                                       | Set isStart State<br />1. If position from left is greater than 0, set isStart to false. Otherwise set isStart to true. |
| `setSelectedToNextTab`     | `(currentTab: Cre8Tab): void`                    | Set Selected To Next Tab<br />1. Get current selected Tab index then deactivate previously selected tab.<br />2. If current activeIndex is in last position then move the tab focus to first tab.<br />3. Set the active tab and focus.<br />4. Emit custom event. |
| `setSelectedToPreviousTab` | `(currentTab: Cre8Tab): void`                    | Set Selected To Previous Tab<br />1. Get current selected Tab index then deactivate previously selected tab.<br />2. If current activeIndex is in first position then move the tab focus to last tab.<br />3. Set the active tab and focus.<br />4. Emit custom event. |
| `setTabAttributes`         | `(): void`                                       | Set the attributes on tab and tab panel<br />1. Sets the index value on the tab items.<br />2. Sets the `aria-labelledby` on the tab items.<br />3. Set the index and id on the tab-panel to match the tab. |
| `setTabVariant`            | `(): void`                                       | Set Tab Variant<br />1. Loop through all the cre8-tab Components and set the size to 'sm' if the parent has size 'sm'. |
| `slotEmpty`                | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`             | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event       | Type                                             |
|-------------|--------------------------------------------------|
| `tabChange` | `CustomEvent<{ value: Cre8Tab \| undefined; activeTabIndex: number \| undefined; }>` |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Default, unnamed slot container for each `cre8-tab` button |
| `panel`   | Container for each `cre8-tab-panel` content item |


# cre8-tag-list

Tag List must have children which are Tag components that are of type `checkbox` or `radio`.
The Tags must use the `neutral` variant and the `round` shape when they are inside a Tag List.
Tag List has a label that should be used to describe the purpose of the list.

## Properties

| Property  | Attribute | Type                  | Description                 |
|-----------|-----------|-----------------------|-----------------------------|
| `fieldId` | `fieldId` | `string`              | The unique id of the select |
| `label`   | `label`   | `string \| undefined` | Tag list legend label       |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-tag

The tag component allows you to make selections, filter content, or trigger actions. While buttons are
expected to appear consistently and with familiar calls to actions, tags should appear dynamically
as a group of multiple interactions elements. It is a flexible
component that comes in the following types:
 - **radio**  Clicking a Radio Button causes it to change color. These tags only allow
one option to be chosen and can be used in place of radio button when they need to be listed
horizontally

 - **checkbox** It allows for selecting options, It can be toggled on and off.

## Properties

| Property     | Attribute    | Type                                         | Default   | Description                                      |
|--------------|--------------|----------------------------------------------|-----------|--------------------------------------------------|
| `field`      |              | `HTMLInputElement`                           |           | Get the radio field item input                   |
| `fieldId`    | `fieldId`    | `string \| undefined`                        |           | The fieldId attribute is assigned to the HTML input element of the radio button and the for attribute of the<br />corresponding label. |
| `isDisabled` | `isDisabled` | `boolean \| undefined`                       |           | Disabled attribute<br />renders a greyed out tag that the user cannot interact with |
| `isSelected` | `isSelected` | `boolean \| undefined`                       |           | Selected attribute<br />renders a selected tag   |
| `shape`      | `shape`      | `"square" \| "round"`                        | "square"  | shape of the tag, supports square and round, and default not mentioned its a square |
| `text`       | `text`       | `string`                                     |           |                                                  |
| `type`       | `type`       | `"checkbox" \| "radio"`                      |           | Type of tag<br />**checkbox** renders a checkbox tag<br />**radio** renders a radio tag |
| `value`      | `value`      | `string`                                     |           | The value of the form field.                     |
| `variant`    | `variant`    | `"neutral" \| "branded" \| "neutral-hybrid"` | "neutral" | Color variant<br />**neutral** renders the default, unselected tag<br />**branded** renders a selected tag<br />**neutral-hybrid** renders a tag when mouse is hovering tag |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `formResetCallback`   | `(): void`                                       | Reset form callback<br />1) Remove the checked state from all radio tags<br />2) Set the checked state to the initial checked state<br />3) Set the radio field input checked attribute to the initial checked state |
| `handleRadioKeyDown`  | `(event: KeyboardEvent): void`                   |                                                  |
| `renderCheckboxIcon`  | `(): TemplateResult<1> \| null`                  |                                                  |
| `resetField`          | `(): void`                                       | Reset the radio tag field                        |
| `resetTabIndeces`     | `(tags: Cre8Tag[]): void`                        | Reset the radio field tags tab indeces           |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Events

| Event    | Type                                             |
|----------|--------------------------------------------------|
| `change` | `CustomEvent<{ isSelected: boolean \| undefined; type: "checkbox" \| "radio"; }>` |


# cre8-tertiary-nav-item

## Properties

| Property    | Attribute   | Type                   | Description                                |
|-------------|-------------|------------------------|--------------------------------------------|
| `href`      | `href`      | `string \| undefined`  | The href value of the tertiary nav link    |
| `isCurrent` | `isCurrent` | `boolean \| undefined` | The current state of the tertiary nav link |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-tertiary-nav

## Properties

| Property       | Attribute      | Type                   | Default    | Description                                      |
|----------------|----------------|------------------------|------------|--------------------------------------------------|
| `fullWidth`    | `fullWidth`    | `boolean \| undefined` |            | Allows the tertiary nav to take up the full width of it parent container |
| `navAriaLabel` | `navAriaLabel` | `string`               | "tertiary" | aria-label attribute to designate at name for the nav. Can be override by user |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-text-link

## Properties

| Property   | Attribute  | Type                                    | Description                                      |
|------------|------------|-----------------------------------------|--------------------------------------------------|
| `href`     | `href`     | `string \| undefined`                   | The link URL                                     |
| `inverted` | `inverted` | `boolean \| undefined`                  | Inverted variant<br />1) Used for dark backgrounds |
| `size`     | `size`     | `"sm" \| undefined`                     | Size variant<br /><cre8-text-passage size="sm"><br /><ul><br /><li> **sm** renders a smaller typography preset than the default</li><br /></ul><br /></cre8-text-passage> |
| `variant`  | `variant`  | `"secondary" \| "display" \| undefined` | Style variant<br /><cre8-text-passage size="sm"><br /><ul><br /><li> **display** applies display treatment to the text link (e.g. article title link)</li><br /><li> **secondary** applies secondary treatment to the text link (e.g. non-prominent links)</li><br /></ul><br /></cre8-text-passage> |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-text-passage

The text-passage component acts a general wrapper element
for any text content that needs to be used in your project.

# How to Use
1. Code your text passage using any of the native html text elements (p, ol, ul, blockquote, cite, etc.)
   or other Cre8 Components like cre8-heading and wrap them with the cre8-text-passage tags.
2. Choose between three sizes for your text content or apply inline styling if you need additional styling.
3. For dark backgrounds, add the 'inverted' attribute to the <cre8-text-passage> tag.
3. Your text-passage will render with brand-approved styling!


NOTE: It is recommended that you use the cre8-heading component for any heading elements in your HTML template

## Properties

| Property   | Attribute  | Type                                           | Default   | Description                                      |
|------------|------------|------------------------------------------------|-----------|--------------------------------------------------|
| `inverted` | `inverted` | `boolean \| undefined`                         |           | Inverted variant<br />1) Used for dark backgrounds |
| `size`     | `size`     | `"small" \| "large" \| "default" \| undefined` | "default" | Size variant<br />- **small** renders smaller typography than the default variant<br />- **default** renders default typography variant<br />- **large** renders larger typography than the default variant |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The component content |


# cre8-tooltip

The purpose of tooltips is to provide a tip or hint about what a tool, icon, link, or other interaction does.
If you need to present a call to action with perhaps a button for the user to click, then use
[Popover](/docs/cre8-components-popover--docs) instead.

##Tooltip Styles
There are 4 alignment options for Tooltips: Top, Bottom, Right, and Left. Default placement is Bottom, below the
element it is describing. Top or Bottom alignment are the the preferred placement, particularly on screens that
have a more narrow viewport. Tooltips utilize Global styles and are not affected by brand themes.

**With icon**
- **iconRotateDegree** & **iconFlipDirection** props are optional.
- They are used to set up the correct dirrection for icons, for example,
arrows, caret up or caret down.

##Usability Considerations
With the exception of icons - which should always have alt text at a minimum - the UI should never rely on
Tooltips for clarity, especially because they are not always discovered by the user. If the user cannot
intuitively understand the interface without Tooltips, the interface should be redesigned.

##How to use
- Use Tooltips to clarify the UI element the user is interacting with, not to add additional content on the page.
Also, do not simply restate content on the page, for example, the title of the field.
- Tooltips should be short and to the point. Example: "Click X to do X" or "Icon Description." If a succinct
description is not possible, the interaction element should be redesigned.
- In a mouse-driven UI, Tooltips are triggered on hover (mouseover) and dismissed (disappear)
when the user mouses away from the element. In touch UIs, a Tooltip is triggered by tapping
and holding an item. The Tooltip is displayed as long as the user continues to hold the element.
Tap and hold is a more advanced user behavior, and further reason for not relying on Tooltips.
A novice user may never discover tap and hold for Tooltips.

## Properties

| Property            | Attribute           | Modifiers | Type                                | Default                                          | Description                                      |
|---------------------|---------------------|-----------|-------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `ariaDescribes`     | `ariaDescribes`     |           | `string`                            |                                                  | Accepts the ID string of the item the tooltip is referencing |
| `iconFlipDirection` | `iconFlipDirection` |           | `string \| undefined`               |                                                  | iconFlipDirection is used for <cre8-icon> to set the icon in the correct direction |
| `iconRotateDegree`  | `iconRotateDegree`  |           | `number \| undefined`               | 0                                                | iconRotateDegree is used for <cre8-icon> to set the arrow in the correct direction |
| `isActive`          | `isActive`          |           | `boolean`                           |                                                  | The active state for the tooltip                 |
| `isActiveDynamic`   | `isActiveDynamic`   |           | `boolean`                           |                                                  | The dynamic active state                         |
| `isDynamic`         | `isDynamic`         |           | `boolean`                           |                                                  | The dynamic state for the tooltip. Position overrides isDynamic. |
| `isRTL`             |                     | readonly  | `boolean`                           |                                                  | Query the document direction value<br /><br/><br/> _*This property is dynamically set_ |
| `knockout`          | `knockout`          |           | `boolean`                           |                                                  | The knockout variant for the tooltip             |
| `position`          | `position`          |           | `"default"\|"top"\|"left"\|"right"` |                                                  | Positions the tooltip panel absolutely to the icon. Position overrides `isDynamic`. |
| `removeActive`      |                     |           | `() => void`                        | "() => {\n      if (this.isActive) {\n          this.toggleActive();\n      }\n  }" | Remove Active State<br />1. If a specific event is fired, remove the active state. |
| `svg`               | `svg`               |           | `string \| undefined`               |                                                  | svg as a raw string<br />- The icon is defined by this prop.<br />- Pass in a raw svg as a String for using <cre8-icon> |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `dynamicPosition`     | `(): void`                                       | Handle all dynamic placement                     |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |
| `toggleActive`        | `(): void`                                       | Set Tooltip Active State<br />1. Toggle the active state between true and false<br />2. If is active, set the dynamic position and custom event.<br />3. If is not active, remove fire the close custom event.<br />4. Toggle the active state for dynamic. This prevents a flash of the tooltip in the orginal position. |

## Events

| Event   | Type                                |
|---------|-------------------------------------|
| `close` | `CustomEvent<{ isActive: false; }>` |
| `open`  | `CustomEvent<{ isActive: true; }>`  |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `default` | Default, unnamed slot container for Tooltip text |
| `trigger` | Named slot container for Tooltip element to trigger showing/hiding the Tooltip text |


# cre8-utility-nav-item

## Properties

| Property       | Attribute      | Type                               | Default     | Description                                      |
|----------------|----------------|------------------------------------|-------------|--------------------------------------------------|
| `hideText`     | `hideText`     | `boolean \| undefined`             |             | Hide text toggle<br />1) Visually hides the text so screenreaders can still read for accessibility when set to true. |
| `href`         | `href`         | `string \| undefined`              |             | URL of the utility nav item                      |
| `iconName`     | `iconName`     | `string \| undefined`              |             | Icon name                                        |
| `iconPosition` | `iconPosition` | `"before" \| "after" \| undefined` | "undefined" | Icon position<br /><cre8-text-passage size="sm"><br /><ul><br /><li>**before** places the icon before the text</li><br /><li>**after** places the icon after the text</li><br /></ul><br /></cre8-text-passage> |
| `text`         | `text`         | `string \| undefined`              |             | Text of the utility nav item                     |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |


# cre8-utility-nav

## Properties

| Property       | Attribute      | Type                   | Default   | Description                                      |
|----------------|----------------|------------------------|-----------|--------------------------------------------------|
| `inverted`     | `inverted`     | `boolean \| undefined` |           | Inverted variant<br />1) Used for dark backgrounds |
| `navAriaLabel` | `navAriaLabel` | `string`               | "utility" | aria-label attribute to designate at name for the nav. Can be override by user |

## Methods

| Method                | Type                                             | Description                                      |
|-----------------------|--------------------------------------------------|--------------------------------------------------|
| `componentClassNames` | `(baseClassName: string, additionalClassNames?: object): string` | Abstraction of `classnames` that automatically includes any style modifier<br />as well as any set variants.<br /><br />It is expected that `variant` would be overridden in a subclass with more<br />specific types, `@property() variant?: 'foo' \| 'bar'`<br /><br />**baseClassName**: undefined |
| `dispatch`            | `({ e, eventName, detailObj, optionsObj, }: Cre8DispatchProps): CustomEvent<any>` | Dispatch a custom event.                         |
| `slotEmpty`           | `(slotName: string): boolean`                    | Check if a slot is empty<br /><br />**slotName**: undefined |
| `slotNotEmpty`        | `(slotName: string): boolean \| null`            | Check if a slot is not empty<br /><br />**slotName**: undefined |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The utility nav items |
