export type SpecChild = ComponentSpec | string;

export interface ComponentSpec {
  component: string;
  props?: Record<string, unknown>;
  children?: SpecChild[];
  slots?: Record<string, SpecChild[]>;
  events?: Record<string, EventBinding>;
}

export type EventBinding =
  | string
  | {
      handler: string;
      stopPropagation?: boolean;
      preventDefault?: boolean;
    };

export interface EmittedEvent {
  component: string;
  path: string;
  event: string;
  handler: string;
  detail: unknown;
  nativeEvent: Event;
}

export interface CatalogSchema {
  $id?: string;
  $defs?: {
    components?: Record<string, CatalogComponentDef>;
  };
  /**
   * Native DOM events bindable on any component. The single source of truth —
   * the runtime validator reads this rather than keeping its own copy.
   */
  'x-native-events'?: string[];
  'x-a2ui'?: {
    catalogId?: string;
    library?: string;
    libraryVersion?: string;
    tagPrefix?: string;
    framework?: string;
  };
  [key: string]: unknown;
}

export interface CatalogComponentDef {
  title?: string;
  description?: string;
  'x-category'?: string;
  'x-slot-descriptions'?: Record<string, string>;
  'x-events'?: Record<string, { detail?: unknown }>;
  properties?: {
    component?: { const?: string };
    props?: {
      properties?: Record<string, PropSchema>;
    };
    children?: ContentRegionSchema;
    slots?: {
      properties?: Record<string, ContentRegionSchema>;
    };
  };
}

/**
 * One content region of a component: its `children` array or one named slot.
 * `x-accepts` / `x-accepts-text` are derived by generate-catalog.mjs from
 * slot-eligibility.json; when absent (an older catalog) the region is untyped
 * and any catalog component or string is accepted.
 */
export interface ContentRegionSchema {
  description?: string;
  /** Component names eligible in this region. */
  'x-accepts'?: string[];
  /** Whether literal strings are eligible in this region. */
  'x-accepts-text'?: boolean;
  [key: string]: unknown;
}

export interface PropSchema {
  type?: string | string[];
  enum?: string[];
  const?: unknown;
  default?: unknown;
  description?: string;
  items?: PropSchema;
  properties?: Record<string, PropSchema>;
  required?: string[];
  additionalProperties?: boolean;
  oneOf?: PropSchema[];
  'x-tsType'?: string;
  'x-kind'?: 'attribute' | 'property';
}

export interface RegisteredCatalog {
  id: string;
  schema: CatalogSchema;
  components: Map<string, CatalogComponentDef>;
}
