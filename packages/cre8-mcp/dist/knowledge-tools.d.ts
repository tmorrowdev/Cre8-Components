/**
 * The briefing an agent would otherwise have to read the knowledge base to get.
 *
 * Everything here is computed from the shipped catalog rather than written
 * down, because a hand-maintained count is prose wearing a schema's clothing and
 * drifts exactly like prose — the lesson `docs/kb/04-a2ui.md` draws from the
 * `PROP_OVERRIDES` bug. If the library changes, these answers change with it.
 */
import { z } from 'zod';
export type ContentBucket = 'children' | 'slots' | 'leaf' | 'both';
export interface ContentModelEntry {
    component: string;
    category: string;
    /** How content gets in. `both` should never occur; it is reported if it does. */
    contentVia: ContentBucket;
    slots: string[];
    /** Slot-only components that declare no `default` slot take no free content. */
    acceptsFreeContent: boolean;
    /** Props that carry content on a leaf component (`text`, `iconName`, `data`, …). */
    contentProps: string[];
    example: Record<string, unknown>;
}
export interface GetContentModelInput {
    component?: string;
    category?: string;
}
export declare function handleGetContentModel(input: GetContentModelInput): string;
declare const TOPICS: readonly ["overview", "content-model", "streaming", "events", "validation"];
export type GuideTopic = (typeof TOPICS)[number];
export interface Cre8GuideInput {
    topic?: GuideTopic;
}
export declare function handleCre8Guide(input: Cre8GuideInput): string;
export declare const knowledgeTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            component: {
                type: string;
                description: string;
            };
            category: {
                type: string;
                description: string;
            };
            topic?: undefined;
        };
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            topic: {
                type: string;
                enum: ("events" | "overview" | "content-model" | "streaming" | "validation")[];
                description: string;
            };
            component?: undefined;
            category?: undefined;
        };
    };
})[];
export declare const GetContentModelSchema: z.ZodObject<{
    component: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    component?: string | undefined;
    category?: string | undefined;
}, {
    component?: string | undefined;
    category?: string | undefined;
}>;
export declare const Cre8GuideSchema: z.ZodObject<{
    topic: z.ZodOptional<z.ZodEnum<["overview", "content-model", "streaming", "events", "validation"]>>;
}, "strip", z.ZodTypeAny, {
    topic?: "events" | "overview" | "content-model" | "streaming" | "validation" | undefined;
}, {
    topic?: "events" | "overview" | "content-model" | "streaming" | "validation" | undefined;
}>;
export declare const KNOWLEDGE_TOOL_NAMES: Set<string>;
export {};
