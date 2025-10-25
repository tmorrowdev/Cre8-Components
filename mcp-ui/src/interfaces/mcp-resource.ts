/**
 * MCP UI Resource type definitions based on MCP-UI specification
 */

export type MimeType = 'text/html' | 'text/plain' | 'application/json' | 'text/uri-list';

export interface UIResource {
  /**
   * Unique URI identifier for the resource
   * Format: ui://cre8/[category]/[component-name]
   */
  uri: string;
  
  /**
   * MIME type defining how the resource should be rendered
   */
  mimeType: MimeType;
  
  /**
   * Resource content - can be HTML, JSON, plain text, or URI list
   */
  text?: string;
  blob?: Uint8Array;
}

export interface ComponentProperty {
  name: string;
  type: string;
  description?: string;
  defaultValue?: any;
  required?: boolean;
  options?: string[]; // For enum-like properties
}

export interface ComponentEvent {
  name: string;
  description?: string;
  detail?: any;
}

export interface ComponentSlot {
  name?: string;
  description?: string;
}

export interface ComponentMethod {
  name: string;
  description?: string;
  parameters?: Array<{
    name: string;
    type: string;
    description?: string;
  }>;
  returns?: {
    type: string;
    description?: string;
  };
}

export interface ComponentMetadata {
  name: string;
  tagName: string;
  className: string;
  category: ComponentCategory;
  description: string;
  version?: string;
  
  // Component API
  properties: ComponentProperty[];
  events: ComponentEvent[];
  slots: ComponentSlot[];
  methods: ComponentMethod[];
  
  // Usage information
  usageNotes?: string;
  examples?: ComponentExample[];
  accessibility?: AccessibilityInfo;
  
  // File paths
  sourcePath: string;
  stylesPath?: string;
}

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
  preview?: string; // HTML for preview
}

export interface AccessibilityInfo {
  roles?: string[];
  ariaAttributes?: string[];
  keyboardNavigation?: string;
  screenReaderSupport?: string;
}

export type ComponentCategory = 
  | 'form'
  | 'navigation' 
  | 'layout'
  | 'data-display'
  | 'feedback'
  | 'media'
  | 'overlay'
  | 'utility';

export interface ComponentRegistry {
  components: ComponentMetadata[];
  categories: Record<ComponentCategory, string[]>;
  version: string;
  generatedAt: string;
}

export interface MCPResourceRequest {
  uri: string;
  parameters?: Record<string, any>;
}

export interface MCPResourceResponse {
  resource: UIResource;
  metadata?: any;
}