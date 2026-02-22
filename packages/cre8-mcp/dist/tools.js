/**
 * Cre8 MCP Tool Definitions
 */
import { z } from 'zod';
export const tools = [
    {
        name: 'list_components',
        description: 'Lists all available Cre8 components from @tmorrow/cre8-wc. ' +
            'Returns components grouped by category (Actions, Forms, Layout, Navigation, etc.). ' +
            'Optionally filter by category.',
        inputSchema: {
            type: 'object',
            properties: {
                category: {
                    type: 'string',
                    description: 'Filter by category: Actions, Forms, Layout, Typography, Navigation, Disclosure, Feedback, Data, Media, Marketing',
                },
                format: {
                    type: 'string',
                    enum: ['web', 'react'],
                    description: 'Component format: "web" (default) or "react"',
                },
            },
        },
    },
    {
        name: 'get_component',
        description: 'Gets detailed information about a specific Cre8 component including attributes/props, ' +
            'slots, events, import statement, and usage examples. Works with or without the "cre8-" prefix.',
        inputSchema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'Component name (e.g., "cre8-button", "button", or "Cre8Button")',
                },
                format: {
                    type: 'string',
                    enum: ['web', 'react'],
                    description: 'Component format: "web" (default) or "react"',
                },
            },
            required: ['name'],
        },
    },
    {
        name: 'get_patterns',
        description: 'Gets pre-built UI patterns and templates using Cre8 components. ' +
            'Includes common patterns like Login Form, Data Table, Page Layout, etc. ' +
            'Optionally get a specific pattern by name.',
        inputSchema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'Pattern name to get details (optional)',
                },
                format: {
                    type: 'string',
                    enum: ['web', 'react'],
                    description: 'Component format: "web" (default) or "react"',
                },
            },
        },
    },
    {
        name: 'search_components',
        description: 'Search Cre8 components by name, description, or category. ' +
            'Useful for finding components that match a specific need.',
        inputSchema: {
            type: 'object',
            properties: {
                query: {
                    type: 'string',
                    description: 'Search query (e.g., "button", "form", "navigation")',
                },
                format: {
                    type: 'string',
                    enum: ['web', 'react'],
                    description: 'Component format: "web" (default) or "react"',
                },
            },
            required: ['query'],
        },
    },
    {
        name: 'generate_code',
        description: 'Generates Web Component HTML or React JSX code from a JSON schema. ' +
            'Takes a component tree definition and outputs formatted code ready to use.',
        inputSchema: {
            type: 'object',
            properties: {
                schema: {
                    type: 'object',
                    description: 'Component tree schema with { component, props?, children?, slots? }',
                },
                format: {
                    type: 'string',
                    enum: ['web', 'react'],
                    description: 'Output format: "web" for HTML (default) or "react" for JSX',
                },
            },
            required: ['schema'],
        },
    },
];
// Zod schemas for input validation
export const ListComponentsSchema = z.object({
    category: z.string().optional(),
    format: z.enum(['web', 'react']).optional(),
});
export const GetComponentSchema = z.object({
    name: z.string(),
    format: z.enum(['web', 'react']).optional(),
});
export const GetPatternsSchema = z.object({
    name: z.string().optional(),
    format: z.enum(['web', 'react']).optional(),
});
export const SearchComponentsSchema = z.object({
    query: z.string(),
    format: z.enum(['web', 'react']).optional(),
});
const ComponentNodeSchema = z.lazy(() => z.object({
    component: z.string(),
    props: z.record(z.unknown()).optional(),
    children: z.union([z.string(), ComponentNodeSchema, z.array(z.union([z.string(), ComponentNodeSchema]))]).optional(),
    slots: z.record(z.union([z.string(), ComponentNodeSchema, z.array(z.union([z.string(), ComponentNodeSchema]))])).optional(),
    content: z.string().optional(),
}));
export const GenerateCodeSchema = z.object({
    schema: z.union([ComponentNodeSchema, z.array(ComponentNodeSchema)]),
    format: z.enum(['react', 'web']).optional(),
    indent: z.number().optional(),
});
