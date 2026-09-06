/**
 * The streaming-UI half of the connector, as MCP tools.
 *
 * Five tools, because an agent that has to remember eleven will use none of
 * them: open a surface, stream into it, read it back, wait for the user, close
 * it. Every mutation goes through `ui_stream`, which applies data before ops
 * before status — the only order in which a node bound to a value the same call
 * introduces can validate.
 */
import { z } from 'zod';
/**
 * The predeclared MCP Apps template (SEP-1865). One static URI for every
 * surface: the host fetches it once via resources/read and learns which
 * surface to show from the ui_open_surface result's structuredContent.
 */
export declare const SURFACE_APP_URI = "ui://cre8/surface";
export interface UiToolContext {
    /**
     * Resolves the absolute base URL a browser can reach surfaces on. A function
     * rather than a string because stdio has to boot a viewer to answer it, and
     * only when a surface is actually opened.
     */
    publicBase: () => Promise<string>;
    /**
     * Whether to embed the surface as an mcp-ui resource. Hosts that do not
     * understand `ui://` ignore it, and the text block carries the URL either way.
     */
    embedResources?: boolean;
}
export interface ToolContentBlock {
    type: 'text' | 'resource';
    text?: string;
    resource?: {
        uri: string;
        mimeType: string;
        text: string;
    };
}
export interface UiToolResult {
    content: ToolContentBlock[];
    /**
     * Present on ui_open_surface: what an MCP Apps view reads to know which
     * surface to attach to. Hosts without the extension simply ignore it.
     */
    structuredContent?: Record<string, unknown>;
}
export declare const uiTools: ({
    name: string;
    description: string;
    _meta: {
        ui: {
            resourceUri: string;
        };
    };
    inputSchema: {
        type: "object";
        properties: {
            title: {
                type: string;
                description: string;
            };
            spec: {
                type: string;
                description: string;
            };
            data: {
                type: string;
                description: string;
                items?: undefined;
            };
            theme: {
                type: string;
                description: string;
            };
            surfaceId?: undefined;
            ops?: undefined;
            status?: undefined;
            statusMessage?: undefined;
            since?: undefined;
            waitMs?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            surfaceId: {
                type: string;
                description: string;
            };
            spec: {
                type: string;
                description: string;
            };
            ops: {
                type: string;
                description: string;
                items: {
                    type: string;
                };
            };
            data: {
                type: string;
                description: string;
                items: {
                    type: string;
                };
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            statusMessage: {
                type: string;
                description: string;
            };
            title?: undefined;
            theme?: undefined;
            since?: undefined;
            waitMs?: undefined;
        };
        required: string[];
    };
    _meta?: undefined;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            surfaceId: {
                type: string;
                description?: undefined;
            };
            title?: undefined;
            spec?: undefined;
            data?: undefined;
            theme?: undefined;
            ops?: undefined;
            status?: undefined;
            statusMessage?: undefined;
            since?: undefined;
            waitMs?: undefined;
        };
        required: string[];
    };
    _meta?: undefined;
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            surfaceId: {
                type: string;
                description?: undefined;
            };
            since: {
                type: string;
                description: string;
            };
            waitMs: {
                type: string;
                description: string;
            };
            title?: undefined;
            spec?: undefined;
            data?: undefined;
            theme?: undefined;
            ops?: undefined;
            status?: undefined;
            statusMessage?: undefined;
        };
        required: string[];
    };
    _meta?: undefined;
})[];
export declare const UiOpenSurfaceSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    theme: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    data?: Record<string, unknown> | undefined;
    title?: string | undefined;
    spec?: Record<string, unknown> | undefined;
    theme?: string | undefined;
}, {
    data?: Record<string, unknown> | undefined;
    title?: string | undefined;
    spec?: Record<string, unknown> | undefined;
    theme?: string | undefined;
}>;
export declare const UiStreamSchema: z.ZodObject<{
    surfaceId: z.ZodString;
    spec: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    ops: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    data: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodUnknown>, "many">>;
    status: z.ZodOptional<z.ZodEnum<["streaming", "idle", "done", "error"]>>;
    statusMessage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    surfaceId: string;
    data?: Record<string, unknown>[] | undefined;
    status?: "error" | "streaming" | "idle" | "done" | undefined;
    spec?: Record<string, unknown> | undefined;
    ops?: Record<string, unknown>[] | undefined;
    statusMessage?: string | undefined;
}, {
    surfaceId: string;
    data?: Record<string, unknown>[] | undefined;
    status?: "error" | "streaming" | "idle" | "done" | undefined;
    spec?: Record<string, unknown> | undefined;
    ops?: Record<string, unknown>[] | undefined;
    statusMessage?: string | undefined;
}>;
export declare const UiGetSurfaceSchema: z.ZodObject<{
    surfaceId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    surfaceId: string;
}, {
    surfaceId: string;
}>;
export declare const UiEventsSchema: z.ZodObject<{
    surfaceId: z.ZodString;
    since: z.ZodOptional<z.ZodNumber>;
    waitMs: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    surfaceId: string;
    since?: number | undefined;
    waitMs?: number | undefined;
}, {
    surfaceId: string;
    since?: number | undefined;
    waitMs?: number | undefined;
}>;
export declare const UiCloseSurfaceSchema: z.ZodObject<{
    surfaceId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    surfaceId: string;
}, {
    surfaceId: string;
}>;
export declare const UI_TOOL_NAMES: Set<string>;
export declare function handleUiTool(name: string, args: unknown, ctx: UiToolContext): Promise<UiToolResult>;
