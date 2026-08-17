/**
 * CDN Entry Point
 *
 * This file is the entry point for CDN builds. It imports all components
 * (which auto-registers them as custom elements) and re-exports them for
 * programmatic access.
 *
 * It also re-exports Lit primitives (html, css, LitElement, etc.) so that
 * consumers can write their own Lit components using the same Lit instance
 * bundled here, avoiding duplicate Lit copies and reactive-element errors.
 *
 * Usage via script tag (IIFE):
 *   <script src="https://cdn.example.com/cre8-wc.min.js"></script>
 *   <cre8-button>Click me</cre8-button>
 *   <script>
 *     // Components are also available on window.Cre8WC
 *     const btn = document.querySelector('cre8-button');
 *   </script>
 *
 * Usage via ES module:
 *   <script type="module">
 *     import { Cre8Button, html, css, LitElement } from 'https://cdn.example.com/cre8-wc.esm.js';
 *   </script>
 */

// Re-export Lit primitives so consumers use the same bundled Lit instance
export { LitElement, html, css, svg, nothing, noChange, ReactiveElement } from 'lit';
export { classMap } from 'lit/directives/class-map.js';
export { styleMap } from 'lit/directives/style-map.js';
export { ifDefined } from 'lit/directives/if-defined.js';
export { repeat } from 'lit/directives/repeat.js';
export { unsafeHTML } from 'lit/directives/unsafe-html.js';
export { until } from 'lit/directives/until.js';
export { live } from 'lit/directives/live.js';
export { ref, createRef } from 'lit/directives/ref.js';
export { guard } from 'lit/directives/guard.js';
export { cache } from 'lit/directives/cache.js';
export { property, state, customElement, query, queryAll } from 'lit/decorators.js';

// Re-export base classes for extending
export { Cre8Element } from './components/cre8-element';
export { Cre8FormElement } from './components/cre8-form-element';

// Import all components (this registers them as custom elements)
import { Cre8Accordion } from './components/accordion/accordion';
import { Cre8AccordionItem } from './components/accordion-item/accordion-item';
import { Cre8Alert } from './components/alert/alert';
import { Cre8Badge } from './components/badge/badge';
import { Cre8Band } from './components/band/band';
import { Cre8Breadcrumbs } from './components/breadcrumbs/breadcrumbs';
import { Cre8BreadcrumbsItem } from './components/breadcrumbs-item/breadcrumbs-item';
import { Cre8Button } from './components/button/button';
import { Cre8ButtonGroup } from './components/button-group/button-group';
import { Cre8Card } from './components/card/card';
import { Cre8Chart } from './components/chart/chart';
import { Cre8CheckboxField } from './components/checkbox-field/checkbox-field';
import { Cre8CheckboxFieldItem } from './components/checkbox-field-item/checkbox-field-item';
import { Cre8DangerButton } from './components/danger-button/danger-button';
import { Cre8DatePicker } from './components/date-picker/date-picker';
import { Cre8Divider } from './components/divider/divider';
import { Cre8Dropdown } from './components/dropdown/dropdown';
import { Cre8DropdownItem } from './components/dropdown-item/dropdown-item';
import { Cre8Feature } from './components/feature/feature';
import { Cre8Field } from './components/field/field';
import { Cre8FieldNote } from './components/field-note/field-note';
import { Cre8Footer } from './components/footer/footer';
import { Cre8Form } from './components/form/form';
import { Cre8GlobalNav } from './components/global-nav/global-nav';
import { Cre8GlobalNavItem } from './components/global-nav-item/global-nav-item';
import { Cre8Grid } from './components/grid/grid';
import { Cre8GridItem } from './components/grid-item/grid-item';
import { Cre8Header } from './components/header/header';
import { Cre8Heading } from './components/heading/heading';
import { Cre8Hero } from './components/hero/hero';
import { Cre8Icon } from './components/icon/icon';
import { Cre8InlineAlert } from './components/inline-alert/inline-alert';
import { Cre8Layout } from './components/layout/layout';
import { Cre8LayoutContainer } from './components/layout-container/layout-container';
import { Cre8LayoutSection } from './components/layout-section/layout-section';
import { Cre8LinelengthContainer } from './components/linelength-container/linelength-container';
import { Cre8Link } from './components/link/link';
import { Cre8LinkList } from './components/link-list/link-list';
import { Cre8LinkListItem } from './components/link-list-item/link-list-item';
import { Cre8List } from './components/list/list';
import { Cre8ListItem } from './components/list-item/list-item';
import { Cre8LoadingSpinner } from './components/loading-spinner/loading-spinner';
import { Cre8Logo } from './components/logo/logo';
import { Cre8Main } from './components/main/main';
import { Cre8Modal } from './components/modal/modal';
import { Cre8MultiSelect } from './components/multi-select/multi-select';
import { Cre8NavContainer } from './components/nav-container/nav-container';
import { Cre8PageHeader } from './components/page-header/page-header';
import { Cre8Pagination } from './components/pagination/pagination';
import { Cre8PercentBar } from './components/percent-bar/percent-bar';
import { Cre8Popover } from './components/popover/popover';
import { Cre8PrimaryNav } from './components/primary-nav/primary-nav';
import { Cre8PrimaryNavItem } from './components/primary-nav-item/primary-nav-item';
import { Cre8ProgressMeter } from './components/progress-meter/progress-meter';
import { Cre8ProgressSteps } from './components/progress-steps/progress-steps';
import { Cre8ProgressStepsItem } from './components/progress-steps-item/progress-steps-item';
import { Cre8RadioField } from './components/radio-field/radio-field';
import { Cre8RadioFieldItem } from './components/radio-field-item/radio-field-item';
import { Cre8RemoveTag } from './components/remove-tag/remove-tag';
import { Cre8Section } from './components/section/section';
import { Cre8Select } from './components/select/select';
import { Cre8SelectTile } from './components/select-tile/select-tile';
import { Cre8SelectTileList } from './components/select-tile-list/select-tile-list';
import { Cre8SkeletonLoader } from './components/skeleton-loader/skeleton-loader';
import { Cre8SplitButton } from './components/split-button/split-button';
import { Cre8Submenu } from './components/submenu/submenu';
import { Cre8SubmenuItem } from './components/submenu-item/submenu-item';
import { Cre8Tab } from './components/tab/tab';
import { Cre8TabBar } from './components/tab-bar/tab-bar';
import { Cre8TabBarItem } from './components/tab-bar-item/tab-bar-item';
import { Cre8TabPanel } from './components/tab-panel/tab-panel';
import { Cre8Table } from './components/table/table';
import { Cre8TableBody } from './components/table-body/table-body';
import { Cre8TableCell } from './components/table-cell/table-cell';
import { Cre8TableHeader } from './components/table-header/table-header';
import { Cre8TableHeaderCell } from './components/table-header-cell/table-header-cell';
import { Cre8TableObject } from './components/table-object/table-object';
import { Cre8TableRow } from './components/table-row/table-row';
import { Cre8Tabs } from './components/tabs/tabs';
import { Cre8Tag } from './components/tag/tag';
import { Cre8TagList } from './components/tag-list/tag-list';
import { Cre8TertiaryNav } from './components/tertiary-nav/tertiary-nav';
import { Cre8TertiaryNavItem } from './components/tertiary-nav-item/tertiary-nav-item';
import { Cre8TextLink } from './components/text-link/text-link';
import { Cre8TextPassage } from './components/text-passage/text-passage';
import { Cre8Tooltip } from './components/tooltip/tooltip';
import { Cre8UtilityNav } from './components/utility-nav/utility-nav';
import { Cre8UtilityNavItem } from './components/utility-nav-item/utility-nav-item';

// Export version info
export const version = '1.0.26';

// Re-export all components for programmatic access
export {
  Cre8Accordion,
  Cre8AccordionItem,
  Cre8Alert,
  Cre8Badge,
  Cre8Band,
  Cre8Breadcrumbs,
  Cre8BreadcrumbsItem,
  Cre8Button,
  Cre8ButtonGroup,
  Cre8Card,
  Cre8Chart,
  Cre8CheckboxField,
  Cre8CheckboxFieldItem,
  Cre8DangerButton,
  Cre8DatePicker,
  Cre8Divider,
  Cre8Dropdown,
  Cre8DropdownItem,
  Cre8Feature,
  Cre8Field,
  Cre8ProgressSteps,
  Cre8ProgressStepsItem,
  Cre8FieldNote,
  Cre8Footer,
  Cre8Form,
  Cre8GlobalNav,
  Cre8GlobalNavItem,
  Cre8Grid,
  Cre8GridItem,
  Cre8Header,
  Cre8Heading,
  Cre8Hero,
  Cre8Icon,
  Cre8InlineAlert,
  Cre8Layout,
  Cre8LayoutContainer,
  Cre8LayoutSection,
  Cre8LinelengthContainer,
  Cre8Link,
  Cre8LinkList,
  Cre8LinkListItem,
  Cre8List,
  Cre8ListItem,
  Cre8LoadingSpinner,
  Cre8Logo,
  Cre8Main,
  Cre8Modal,
  Cre8MultiSelect,
  Cre8NavContainer,
  Cre8PageHeader,
  Cre8Pagination,
  Cre8PercentBar,
  Cre8Popover,
  Cre8PrimaryNav,
  Cre8PrimaryNavItem,
  Cre8ProgressMeter,
  Cre8RadioField,
  Cre8RadioFieldItem,
  Cre8RemoveTag,
  Cre8Section,
  Cre8Select,
  Cre8SelectTile,
  Cre8SelectTileList,
  Cre8SkeletonLoader,
  Cre8SplitButton,
  Cre8Submenu,
  Cre8SubmenuItem,
  Cre8Tab,
  Cre8TabBar,
  Cre8TabBarItem,
  Cre8TabPanel,
  Cre8Table,
  Cre8TableBody,
  Cre8TableCell,
  Cre8TableHeader,
  Cre8TableHeaderCell,
  Cre8TableObject,
  Cre8TableRow,
  Cre8Tabs,
  Cre8Tag,
  Cre8TagList,
  Cre8TertiaryNav,
  Cre8TertiaryNavItem,
  Cre8TextLink,
  Cre8TextPassage,
  Cre8Tooltip,
  Cre8UtilityNav,
  Cre8UtilityNavItem,
};
