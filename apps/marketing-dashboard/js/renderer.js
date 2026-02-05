/**
 * JSON-to-WebComponent Renderer
 *
 * Converts JSON configuration into cre8 web components at runtime.
 * Supports recursive rendering, slots, props, and external JSON references.
 */

/**
 * Cache for loaded JSON files to avoid duplicate fetches
 */
const jsonCache = new Map();

/**
 * Base path for resolving $ref paths
 */
let basePath = './config/';

/**
 * Component validation rules
 * Each rule returns the validated/transformed props
 */
const componentValidators = {
  'cre8-heading': (props) => {
    const validated = { ...props };

    // Convert legacy 'level' prop to 'tagVariant'
    if (validated.level !== undefined) {
      validated.tagVariant = `h${validated.level}`;
      delete validated.level;
    }

    // Ensure tagVariant is always set (required for proper styling)
    if (!validated.tagVariant) {
      validated.tagVariant = 'h2'; // sensible default
      console.warn('cre8-heading missing tagVariant, defaulting to h2');
    }

    // Validate tagVariant value
    const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    if (!validTags.includes(validated.tagVariant)) {
      console.warn(`Invalid tagVariant "${validated.tagVariant}", defaulting to h2`);
      validated.tagVariant = 'h2';
    }

    // If no type specified, auto-assign based on tagVariant for consistent styling
    if (!validated.type) {
      const typeMap = {
        'h1': 'headline-large',
        'h2': 'headline-default',
        'h3': 'headline-small',
        'h4': 'title-large',
        'h5': 'title-default',
        'h6': 'title-small'
      };
      validated.type = typeMap[validated.tagVariant];
    }

    return validated;
  }
};

/**
 * Validate and transform component props based on component type
 * @param {string} component - Component tag name
 * @param {object} props - Original props
 * @returns {object} Validated props
 */
function validateProps(component, props) {
  const validator = componentValidators[component];
  if (validator && props) {
    return validator(props);
  }
  return props;
}

/**
 * Set the base path for loading JSON files
 * @param {string} path - Base path for config files
 */
export function setBasePath(path) {
  basePath = path.endsWith('/') ? path : path + '/';
}

/**
 * Load a JSON file with caching
 * @param {string} path - Path to JSON file (relative to basePath)
 * @returns {Promise<object>} Parsed JSON
 */
async function loadJSON(path) {
  const fullPath = path.startsWith('./') || path.startsWith('/') ? path : basePath + path;

  if (jsonCache.has(fullPath)) {
    return jsonCache.get(fullPath);
  }

  try {
    const response = await fetch(fullPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${fullPath}: ${response.status}`);
    }
    const data = await response.json();
    jsonCache.set(fullPath, data);
    return data;
  } catch (error) {
    console.error(`Error loading JSON from ${fullPath}:`, error);
    throw error;
  }
}

/**
 * Resolve all $ref references in a config object
 * @param {object|array|string} config - Config with potential $ref values
 * @returns {Promise<object>} Resolved config
 */
async function resolveRefs(config) {
  if (config === null || config === undefined) {
    return config;
  }

  // Handle arrays
  if (Array.isArray(config)) {
    return Promise.all(config.map(item => resolveRefs(item)));
  }

  // Handle objects
  if (typeof config === 'object') {
    // If this object is a $ref, load and resolve it
    if (config.$ref) {
      const loaded = await loadJSON(config.$ref);
      return resolveRefs(loaded);
    }

    // Otherwise, resolve all nested properties
    const resolved = {};
    for (const [key, value] of Object.entries(config)) {
      resolved[key] = await resolveRefs(value);
    }
    return resolved;
  }

  // Primitives pass through unchanged
  return config;
}

/**
 * Set props on an element (handles attributes vs properties)
 * @param {HTMLElement} el - Target element
 * @param {object} props - Props to set
 */
function setProps(el, props) {
  if (!props) return;

  for (const [key, value] of Object.entries(props)) {
    // Handle special cases
    if (key === 'class' || key === 'className') {
      el.className = value;
      continue;
    }

    if (key === 'style' && typeof value === 'object') {
      Object.assign(el.style, value);
      continue;
    }

    if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, value);
      continue;
    }

    // For complex values (objects/arrays), set as property
    if (typeof value === 'object' || Array.isArray(value)) {
      el[key] = value;
      continue;
    }

    // For booleans, handle attribute presence
    if (typeof value === 'boolean') {
      if (value) {
        el.setAttribute(key, '');
      } else {
        el.removeAttribute(key);
      }
      // Also set as property for web components
      el[key] = value;
      continue;
    }

    // For primitives, set both attribute and property
    el.setAttribute(key, String(value));

    // Try setting as property too (for web component reactive props)
    try {
      el[key] = value;
    } catch (e) {
      // Ignore if property is read-only
    }
  }
}

/**
 * Assign content to a slot
 * @param {HTMLElement} parent - Parent element with slots
 * @param {string} slotName - Name of slot ('default' for unnamed)
 * @param {Node|Node[]} children - Content to assign
 */
function assignSlot(parent, slotName, children) {
  const childArray = Array.isArray(children) ? children.flat() : [children];

  childArray.forEach(child => {
    if (child instanceof Node) {
      if (slotName !== 'default') {
        child.setAttribute('slot', slotName);
      }
      parent.appendChild(child);
    }
  });
}

/**
 * Create a DOM element from a JSON node config
 * @param {object|string|array} node - Node configuration
 * @returns {Node|Node[]} Created DOM node(s)
 */
function createElement(node) {
  // Handle null/undefined
  if (node === null || node === undefined) {
    return document.createTextNode('');
  }

  // Handle strings as text nodes
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  // Handle numbers as text nodes
  if (typeof node === 'number') {
    return document.createTextNode(String(node));
  }

  // Handle arrays - return array of elements
  if (Array.isArray(node)) {
    return node.map(item => createElement(item)).flat();
  }

  // Must have component property
  if (!node.component) {
    console.warn('Node missing component property:', node);
    return document.createTextNode('');
  }

  // Create the element
  let el;
  try {
    el = document.createElement(node.component);
  } catch (error) {
    console.error(`Failed to create element: ${node.component}`, error);
    return document.createTextNode(`[Error: ${node.component}]`);
  }

  // Validate and set props
  const validatedProps = validateProps(node.component, node.props);
  setProps(el, validatedProps);

  // Handle slots
  if (node.slots) {
    for (const [slotName, slotContent] of Object.entries(node.slots)) {
      const children = createElement(slotContent);
      assignSlot(el, slotName, children);
    }
  }

  // Handle children (shorthand for default slot)
  if (node.children) {
    const childArray = Array.isArray(node.children) ? node.children : [node.children];
    childArray.forEach(child => {
      const childEl = createElement(child);
      if (Array.isArray(childEl)) {
        childEl.forEach(c => el.appendChild(c));
      } else {
        el.appendChild(childEl);
      }
    });
  }

  // Handle text content
  if (node.content !== undefined) {
    el.textContent = node.content;
  }

  // Handle innerHTML (use with caution)
  if (node.html) {
    el.innerHTML = node.html;
  }

  return el;
}

/**
 * Main render function - loads config, resolves refs, and renders to container
 * @param {string|object} config - Path to JSON file or config object
 * @param {HTMLElement} container - Container to render into
 * @returns {Promise<HTMLElement>} Rendered root element
 */
export async function render(config, container) {
  // Load config if string path provided
  let configObj = config;
  if (typeof config === 'string') {
    configObj = await loadJSON(config);
  }

  // Resolve all $ref references
  const resolved = await resolveRefs(configObj);

  // Create elements
  const element = createElement(resolved);

  // Clear container and append
  container.innerHTML = '';

  if (Array.isArray(element)) {
    element.forEach(el => container.appendChild(el));
    return container.firstElementChild;
  } else {
    container.appendChild(element);
    return element;
  }
}

/**
 * Render a config object without loading from file
 * @param {object} config - Config object
 * @param {HTMLElement} container - Container to render into
 * @returns {HTMLElement} Rendered root element
 */
export function renderSync(config, container) {
  const element = createElement(config);

  container.innerHTML = '';

  if (Array.isArray(element)) {
    element.forEach(el => container.appendChild(el));
    return container.firstElementChild;
  } else {
    container.appendChild(element);
    return element;
  }
}

/**
 * Update an existing element with new props
 * @param {HTMLElement} element - Element to update
 * @param {object} props - New props
 */
export function updateProps(element, props) {
  setProps(element, props);
}

/**
 * Clear the JSON cache
 */
export function clearCache() {
  jsonCache.clear();
}

// Export utilities for advanced usage
export { loadJSON, resolveRefs, createElement, setProps };
