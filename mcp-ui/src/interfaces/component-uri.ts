/**
 * URI pattern matching and validation for Cre8 MCP resources
 */

export interface ParsedComponentURI {
  scheme: string;        // 'ui'
  namespace: string;     // 'cre8'
  category: string;      // 'form', 'navigation', etc.
  componentName: string; // 'button', 'breadcrumbs', etc.
  parameters?: Record<string, string>;
}

export class ComponentURI {
  private static readonly URI_PATTERN = /^ui:\/\/cre8\/([^\/]+)\/([^?]+)(\?(.+))?$/;
  
  /**
   * Parse a component URI into its constituent parts
   */
  static parse(uri: string): ParsedComponentURI | null {
    const match = uri.match(this.URI_PATTERN);
    if (!match) return null;
    
    const [, category, componentName, , queryString] = match;
    const parameters: Record<string, string> = {};
    
    if (queryString) {
      const searchParams = new URLSearchParams(queryString);
      for (const [key, value] of searchParams.entries()) {
        parameters[key] = value;
      }
    }
    
    return {
      scheme: 'ui',
      namespace: 'cre8',
      category,
      componentName,
      parameters: Object.keys(parameters).length > 0 ? parameters : undefined
    };
  }
  
  /**
   * Build a component URI from parts
   */
  static build(
    category: string, 
    componentName: string, 
    parameters?: Record<string, string>
  ): string {
    let uri = `ui://cre8/${category}/${componentName}`;
    
    if (parameters && Object.keys(parameters).length > 0) {
      const searchParams = new URLSearchParams(parameters);
      uri += `?${searchParams.toString()}`;
    }
    
    return uri;
  }
  
  /**
   * Validate if a URI follows the Cre8 MCP pattern
   */
  static isValid(uri: string): boolean {
    return this.URI_PATTERN.test(uri);
  }
  
  /**
   * Extract component identifier from URI (category/componentName)
   */
  static getComponentId(uri: string): string | null {
    const parsed = this.parse(uri);
    if (!parsed) return null;
    return `${parsed.category}/${parsed.componentName}`;
  }
  
  /**
   * Get all valid categories
   */
  static getValidCategories(): string[] {
    return [
      'form',
      'navigation', 
      'layout',
      'data-display',
      'feedback',
      'media',
      'overlay',
      'utility'
    ];
  }
}