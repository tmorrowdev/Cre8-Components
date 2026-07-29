---
title: Component Reference
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/cre8-wc/mcp-manifest.json, packages/cre8-wc/react-manifest.json, packages/cre8-wc/a2ui/catalog.json
intents:
  - "which component should I use for X"
  - "what is the react name for a cre8 tag"
  - "is this component available to agents through a2ui"
---

# Component Reference

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

Every component in `@tmorrow/cre8-wc` v2.0.7, grouped by the
job it does. The **React** column is the `@tmorrow/cre8-react` wrapper name;
the **A2UI** column says whether an agent can emit the component through the
[A2UI catalog](../04-a2ui.md).

Start from the intent line under each heading, not from the component name — the
whole point of grouping this way is that you usually know the goal before you
know the tag.

> **The "What it is for" column is the component's own JSDoc**, reproduced from
> the manifest — descriptive prose written by component authors, not a checked
> API surface. Descriptions known to be wrong are corrected here in place, but
> treat the column as orientation rather than specification. For API facts use
> the generated pages below, which derive from schemas and source, not comments.

- Prose about *how these compose* lives in [Composition Patterns](../02-composition-patterns.md); about
  *how these are themed*, [Token Theming](../03-token-theming.md).
- Every declared prop, with types, enums, defaults, and attribute-vs-property
  kind: [props](props.md).
- What each component emits: [events](events.md). What it accepts as
  content: [content model](content-model.md). What you can style inside
  it: [parts](parts.md).
- Long-form usage guidance per component lives in
  `packages/cre8-wc/agent-docs/COMPONENTS.md` (~3.1k lines). Prefer the
  generated pages above for API facts — COMPONENTS.md carries known
  inaccuracies ([Provenance and drift](../07-research.md#provenance-and-drift)).

## Layout

> **Intent:** I need to place things on a page

| Tag | React | A2UI | What it is for |
|---|---|---|---|
| `<cre8-band>` | `Cre8Band` | yes | Band component. |
| `<cre8-card>` | `Cre8Card` | yes | A general container sectioned by slots: `header`, `footer`, and the default slot for body content. (Its JSDoc names a `body` slot; there is none — see 02-composition-patterns.) |
| `<cre8-divider>` | `Cre8Divider` | yes | The divider component is a separator between sections of content or groups of items. |
| `<cre8-grid>` | `Cre8Grid` | yes | Grid component. |
| `<cre8-grid-item>` | `Cre8GridItem` | yes | Grid Item component. |
| `<cre8-hero>` | `Cre8Hero` | yes | Hero component. |
| `<cre8-layout>` | `Cre8Layout` | yes | Layout component. |
| `<cre8-layout-container>` | `Cre8LayoutContainer` | yes | Layout Container component. |
| `<cre8-layout-section>` | `Cre8LayoutSection` | yes | Layout Section component. |
| `<cre8-linelength-container>` | `Cre8LinelengthContainer` | yes | Linelength Container component. |
| `<cre8-main>` | `Cre8Main` | yes | Main component. |
| `<cre8-section>` | `Cre8Section` | yes | The section component acts as a block level HTML element that takes a 'headline' property that renders the section's heading which wraps around any HTML template that is found under this heading in... |

## Typography

> **Intent:** I need to set text and headings

| Tag | React | A2UI | What it is for |
|---|---|---|---|
| `<cre8-heading>` | `Cre8Heading` | yes | HTML headings are titles or subtitles that you want to display on a webpage. |
| `<cre8-text-link>` | `Cre8TextLink` | yes | Text Link component. |
| `<cre8-text-passage>` | `Cre8TextPassage` | yes | The text-passage component acts a general wrapper element for any text content that needs to be used in your project. |

## Actions

> **Intent:** I need the user to do something

| Tag | React | A2UI | What it is for |
|---|---|---|---|
| `<cre8-button>` | `Cre8Button` | yes | The size and state of buttons on the screen serve as visual cues for the user about what they can do and what they should do next. |
| `<cre8-button-group>` | `Cre8ButtonGroup` | yes | Button Group component. |
| `<cre8-danger-button>` | `Cre8DangerButton` | yes | The size and state of buttons on the screen serve as visual cues for the user about what they can do and what they should do next. |
| `<cre8-split-button>` | `Cre8SplitButton` | yes | Split Button component. |

## Forms

> **Intent:** I need to collect input from the user

| Tag | React | A2UI | What it is for |
|---|---|---|---|
| `<cre8-checkbox-field>` | `Cre8CheckboxField` | yes | Checkbox Field is the parent container for `checkbox-field-item`. |
| `<cre8-checkbox-field-item>` | `Cre8CheckboxFieldItem` | yes | Checkbox Field Item is the combination of a checkbox input, label and field note. |
| `<cre8-date-picker>` | `Cre8DatePicker` | yes | The Date Picker component renders a form group with label, control, help text and validation styling much like the Field component but exclusively for type=date. |
| `<cre8-field>` | `Cre8Field` | yes | The Field component renders a form group with label, control, help text and validation styling. |
| `<cre8-field-note>` | `Cre8FieldNote` | yes | Field Note gives direction on how to fill out a form field and to alert users of form errors and successes. |
| `<cre8-multi-select>` | `Cre8MultiSelect` | yes | Multiselect is used when multiple options can be chosen from a static dropdown This component has a list of items in the dropdown that can be added as "selected tags" The checkbox will always refle... |
| `<cre8-radio-field>` | `Cre8RadioField` | yes | Radio Field is the parent container for `radio-field-item`. |
| `<cre8-radio-field-item>` | `Cre8RadioFieldItem` | yes | A Radio Field Item adds a radio button to a Radio Field. |
| `<cre8-select>` | `Cre8Select` | yes | The Select control is designed and built to be used for selecting between choices in a form. |
| `<cre8-select-tile>` | `Cre8SelectTile` | yes | The Select Tile component is a short block of content inside a visual container that can be used in place of checkboxes, radio buttons, and links. |
| `<cre8-select-tile-list>` | `Cre8SelectTileList` | yes | Select Tile List is a container design to hold multiple Select Tile Components. |

## Data

> **Intent:** I need to show a set of records

| Tag | React | A2UI | What it is for |
|---|---|---|---|
| `<cre8-chart>` | `Cre8Chart` | yes | A flexible chart component built on Chart.js that supports multiple chart types including line, bar, pie, doughnut, radar, polar area, bubble, and scatter charts. |
| `<cre8-list>` | `Cre8List` | yes | List component. |
| `<cre8-list-item>` | `Cre8ListItem` | yes | List Item component. |
| `<cre8-remove-tag>` | `Cre8RemoveTag` | yes | Clicking a Remove Tag causes it to disappear from the page or field (in the case of Multi-Select). |
| `<cre8-table>` | `Cre8Table` | yes | Table component. |
| `<cre8-table-body>` | `Cre8TableBody` | yes | Table Body component. |
| `<cre8-table-cell>` | `Cre8TableCell` | yes | Table Cell component. |
| `<cre8-table-header>` | `Cre8TableHeader` | yes | Table Header component. |
| `<cre8-table-header-cell>` | `Cre8TableHeaderCell` | yes | Table Header Cell component. |
| `<cre8-table-object>` | `Cre8TableObject` | yes | Table Object component. |
| `<cre8-table-row>` | `Cre8TableRow` | yes | Table Row component. |
| `<cre8-tag>` | `Cre8Tag` | yes | The tag component allows you to make selections, filter content, or trigger actions. |
| `<cre8-tag-list>` | `Cre8TagList` | yes | Tag List must have children which are Tag components that are of type `checkbox` or `radio`. |

## Navigation

> **Intent:** I need the user to move somewhere else

| Tag | React | A2UI | What it is for |
|---|---|---|---|
| `<cre8-breadcrumbs>` | `Cre8Breadcrumbs` | yes | The breadcrumbs component is a secondary navigation pattern that helps a user understand where the user is located. |
| `<cre8-breadcrumbs-item>` | `Cre8BreadcrumbsItem` | yes | Breadcrumbs Item component. |
| `<cre8-footer>` | `Cre8Footer` | yes | Footer component. |
| `<cre8-global-nav>` | `Cre8GlobalNav` | yes | Global Nav component. |
| `<cre8-global-nav-item>` | `Cre8GlobalNavItem` | yes | Global Nav Item component. |
| `<cre8-header>` | `Cre8Header` | yes | Header component. |
| `<cre8-link>` | `Cre8Link` | yes | Link Component are strictly used in the case where the component will take the user away from the current page to a new url. |
| `<cre8-link-list>` | `Cre8LinkList` | yes | Link List component. |
| `<cre8-link-list-item>` | `Cre8LinkListItem` | yes | Link List Item component. |
| `<cre8-nav-container>` | `Cre8NavContainer` | yes | Nav Container component. |
| `<cre8-pagination>` | `Cre8Pagination` | yes | The Pagination component is used to split up a large amount of results by showing only a certain amount on each page. |
| `<cre8-primary-nav>` | `Cre8PrimaryNav` | yes | Primary Nav component. |
| `<cre8-primary-nav-item>` | `Cre8PrimaryNavItem` | yes | Primary Nav Item component. |
| `<cre8-tab>` | `Cre8Tab` | yes | Tab component. |
| `<cre8-tab-panel>` | `Cre8TabPanel` | yes | Tab Panel component. |
| `<cre8-tabs>` | `Cre8Tabs` | yes | Tabs are used to quickly navigate back and forth between views. |
| `<cre8-tertiary-nav>` | `Cre8TertiaryNav` | yes | Tertiary Nav component. |
| `<cre8-tertiary-nav-item>` | `Cre8TertiaryNavItem` | yes | Tertiary Nav Item component. |
| `<cre8-utility-nav>` | `Cre8UtilityNav` | yes | Utility Nav component. |
| `<cre8-utility-nav-item>` | `Cre8UtilityNavItem` | yes | Utility Nav Item component. |

## Disclosure

> **Intent:** I need to hide content until it is asked for

| Tag | React | A2UI | What it is for |
|---|---|---|---|
| `<cre8-accordion>` | `Cre8Accordion` | yes | The component is a vertically stacked list of headers that reveal or hide sections of related content on a page. |
| `<cre8-accordion-item>` | `Cre8AccordionItem` | yes | The accordion item component delivers large amounts of content in a small space through progressive disclosure. |
| `<cre8-dropdown>` | `Cre8Dropdown` | yes | The Dropdown menu itself is a container that can host multiple interactive items, commonly formatted as a list |
| `<cre8-dropdown-item>` | `Cre8DropdownItem` | yes | The Dropdown item component is designed to be used with Dropdown component, each item represents a selectable option or action within the dropdown menu. |
| `<cre8-modal>` | `Cre8Modal` | yes | Modal component should be used in all modal situations. |
| `<cre8-popover>` | `Cre8Popover` | yes | The Popover is for progressive disclosure of relevant content often hidden behind a help or info icon. |
| `<cre8-submenu>` | `Cre8Submenu` | yes | Submenu component. |
| `<cre8-submenu-item>` | `Cre8SubmenuItem` | yes | Submenu Item component. |
| `<cre8-tooltip>` | `Cre8Tooltip` | yes | The purpose of tooltips is to provide a tip or hint about what a tool, icon, link, or other interaction does. |

## Feedback

> **Intent:** I need to tell the user what just happened or is happening

| Tag | React | A2UI | What it is for |
|---|---|---|---|
| `<cre8-alert>` | `Cre8Alert` | yes | The general purpose of an alert or notification is to draw the user’s attention and provide the user with timely, relevant information. |
| `<cre8-badge>` | `Cre8Badge` | yes | Status badges are used most often in tables or fat rows in a list. |
| `<cre8-inline-alert>` | `Cre8InlineAlert` | yes | In cases when it is necessary to alert the user but a less strong message that cannot be dismissed is desired, use an in-line contextual alert message as the least "severe" message type. |
| `<cre8-loading-spinner>` | `Cre8LoadingSpinner` | yes | A loading spinner notifies the user that their request is being processed while the front end is retrieving data or performing slow computations. |
| `<cre8-percent-bar>` | `Cre8PercentBar` | yes | The percent bar visually indicates a user's current progress and has a few features: a basic display bar with a percentage, an actionable icon that allows a user to revisit a prior step and an acti... |
| `<cre8-progress-meter>` | `Cre8ProgressMeter` | yes | A progress meter provides feedback that the system is working and gives the user an indication of how much time they will wait. |
| `<cre8-progress-steps-item>` | `Cre8ProgressStepsItem` | yes | The Progress Steps Item component is used to display a single step in a multi-step process. |
| `<cre8-skeleton-loader>` | `Cre8SkeletonLoader` | yes | Skeleton Loader allows for the ability to create placeholder UI loading states. |

## Media

> **Intent:** I need to show an image, icon, or mark

| Tag | React | A2UI | What it is for |
|---|---|---|---|
| `<cre8-icon>` | `Cre8Icon` | yes | <svg> is a web component, which can be used with any frontend framework and use any svg. |
| `<cre8-logo>` | `Cre8Logo` | yes | Logo component. |

## Marketing

> **Intent:** I need to persuade rather than inform

| Tag | React | A2UI | What it is for |
|---|---|---|---|
| `<cre8-feature>` | `Cre8Feature` | yes | Feature component. |
| `<cre8-page-header>` | `Cre8PageHeader` | yes | Page Header component. |

## Other

> **Intent:** Uncategorized

| Tag | React | A2UI | What it is for |
|---|---|---|---|
| `<cre8-progress-steps>` | `Cre8ProgressSteps` | yes | The Progress Steps component is used to display where a user is in a multistep process. |

## Counts

| Surface | Components |
|---|---|
| Web components (`@tmorrow/cre8-wc` v2.0.7) | 85 |
| React wrappers (`@tmorrow/cre8-react` v2.0.7) | 85 |
| A2UI catalog entries (`https://cre8.dev/a2ui/catalogs/cre8-wc/2.0.7`) | 85 |

If these three numbers disagree, the wrappers or the catalog are stale relative to
the components — regenerate them before trusting a count you find elsewhere.
See [Provenance and drift](../07-research.md#provenance-and-drift) for why marketing copy quotes a different number.
