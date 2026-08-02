/**
 * One agent turn, as an async iterable of events.
 *
 * Everything here is provider-agnostic and transport-agnostic: no `process.env`,
 * no `Response`, no SSE. A server serialises the events; a browser consumes them
 * directly. That is the entire reason this is a library and not a route.
 */
export async function* runTurn(messages, options) {
    const { provider, systemPrompt, validate } = options;
    // Numbering for calls the provider gave no id to.
    //
    // Preserved exactly as the original route had it: the counter advances only on
    // a `render_ui` call, not on an unknown function. That asymmetry means an
    // unknown call followed by an anonymous `render_ui` reuses the same id — almost
    // certainly a latent bug, but changing it here would make this a behaviour
    // change rather than a refactor. Left as-is deliberately.
    let anonymousCallIndex = 0;
    try {
        for await (const chunk of provider.stream({
            messages,
            systemPrompt,
            maxOutputTokens: options.maxOutputTokens,
            includeThoughts: options.includeThoughts,
        })) {
            switch (chunk.type) {
                case 'thinking':
                    yield { type: 'thinking', delta: chunk.delta };
                    break;
                case 'text':
                    yield { type: 'text', delta: chunk.delta };
                    break;
                case 'tool_call': {
                    if (chunk.name !== 'render_ui') {
                        yield {
                            type: 'tool_use_error',
                            id: chunk.id ?? `call_${anonymousCallIndex}`,
                            error: `Unknown function: ${chunk.name}`,
                        };
                        break;
                    }
                    const args = chunk.args;
                    const id = chunk.id ?? `call_${anonymousCallIndex++}`;
                    if (!args.spec) {
                        yield { type: 'tool_use_error', id, error: 'render_ui called without a spec' };
                        break;
                    }
                    const result = await validate(args.spec);
                    if (result.ok) {
                        yield { type: 'tool_use', id, spec: args.spec, caption: args.caption };
                    }
                    else {
                        yield { type: 'tool_use_error', id, error: result.error, spec: args.spec };
                    }
                    break;
                }
                case 'stop':
                    yield { type: 'done', stop_reason: chunk.stopReason, usage: chunk.usage };
                    break;
            }
        }
    }
    catch (err) {
        // A provider failure is an event, not a thrown error: the transport has
        // usually already committed headers by this point, so the only way to tell
        // the client anything is in-band.
        yield { type: 'error', message: err instanceof Error ? err.message : String(err) };
    }
}
