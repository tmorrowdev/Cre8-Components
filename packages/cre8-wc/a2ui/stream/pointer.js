/**
 * Two addressing schemes, kept in one file because they are easy to confuse.
 *
 * **Spec paths** (`$.slots.footer[0].children[2]`) address nodes in the
 * component tree. This grammar is not invented here — it is what the one-shot
 * renderer already puts in `EmittedEvent.path`, which is why streaming can reuse
 * it as node identity.
 *
 * **JSON Pointers** (`/user/name`) address values in the surface data model,
 * per RFC 6901.
 */
const SEGMENT_RE = /^\.(?:children\[(\d+)\]|slots\.([A-Za-z_][\w-]*)\[(\d+)\])/;
/** Parse `$.slots.footer[0]` into segments. Throws on malformed input. */
export function parsePath(path) {
    if (typeof path !== 'string' || path.length === 0) {
        throw new Error(`path: must be a non-empty string, got ${JSON.stringify(path)}`);
    }
    if (path[0] !== '$') {
        throw new Error(`path "${path}": must start with "$"`);
    }
    const segments = [];
    let rest = path.slice(1);
    while (rest.length > 0) {
        const m = SEGMENT_RE.exec(rest);
        if (!m) {
            throw new Error(`path "${path}": cannot parse at "${rest}" — expected ".children[N]" or ".slots.NAME[N]"`);
        }
        if (m[1] !== undefined) {
            segments.push({ kind: 'children', index: Number(m[1]) });
        }
        else {
            segments.push({ kind: 'slot', name: m[2], index: Number(m[3]) });
        }
        rest = rest.slice(m[0].length);
    }
    return segments;
}
export function formatPath(segments) {
    let out = '$';
    for (const seg of segments) {
        out += seg.kind === 'children' ? `.children[${seg.index}]` : `.slots.${seg.name}[${seg.index}]`;
    }
    return out;
}
/** `$.children[0]` + `{children,2}` → `$.children[0].children[2]`. */
export function childPath(parentPath, slot, index) {
    return slot === null || slot === undefined
        ? `${parentPath}.children[${index}]`
        : `${parentPath}.slots.${slot}[${index}]`;
}
// ─── RFC 6901 JSON Pointer ──────────────────────────────────────────────────
function unescapeToken(token) {
    return token.replace(/~1/g, '/').replace(/~0/g, '~');
}
export function parsePointer(pointer) {
    if (pointer === '' || pointer === '/')
        return [];
    if (pointer[0] !== '/') {
        throw new Error(`pointer "${pointer}": must be empty or start with "/"`);
    }
    return pointer.slice(1).split('/').map(unescapeToken);
}
export function pointerGet(root, pointer) {
    let cur = root;
    for (const token of parsePointer(pointer)) {
        if (cur === null || cur === undefined)
            return undefined;
        if (Array.isArray(cur)) {
            const i = Number(token);
            if (!Number.isInteger(i))
                return undefined;
            cur = cur[i];
        }
        else if (typeof cur === 'object') {
            cur = cur[token];
        }
        else {
            return undefined;
        }
    }
    return cur;
}
/**
 * Write `value` at `pointer`, creating intermediate containers as needed. An
 * array is created when the next token looks like an index, an object otherwise.
 * Mutates and returns `root` — except for the whole-document pointer `""`,
 * where the caller must use the returned value.
 */
export function pointerSet(root, pointer, value) {
    const tokens = parsePointer(pointer);
    if (tokens.length === 0)
        return value;
    let cur = root;
    for (let i = 0; i < tokens.length - 1; i++) {
        const token = tokens[i];
        const container = cur;
        const existing = Array.isArray(container)
            ? container[Number(token)]
            : container[token];
        if (existing === undefined || existing === null || typeof existing !== 'object') {
            const next = /^\d+$/.test(tokens[i + 1]) ? [] : {};
            if (Array.isArray(container))
                container[Number(token)] = next;
            else
                container[token] = next;
            cur = next;
        }
        else {
            cur = existing;
        }
    }
    const last = tokens[tokens.length - 1];
    if (Array.isArray(cur)) {
        if (last === '-')
            cur.push(value);
        else
            cur[Number(last)] = value;
    }
    else {
        cur[last] = value;
    }
    return root;
}
export function pointerRemove(root, pointer) {
    const tokens = parsePointer(pointer);
    if (tokens.length === 0) {
        for (const key of Object.keys(root))
            delete root[key];
        return;
    }
    let cur = root;
    for (let i = 0; i < tokens.length - 1; i++) {
        if (cur === null || typeof cur !== 'object')
            return;
        cur = Array.isArray(cur)
            ? cur[Number(tokens[i])]
            : cur[tokens[i]];
    }
    if (cur === null || typeof cur !== 'object')
        return;
    const last = tokens[tokens.length - 1];
    if (Array.isArray(cur))
        cur.splice(Number(last), 1);
    else
        delete cur[last];
}
