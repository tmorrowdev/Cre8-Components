import { createCipheriv, createDecipheriv, randomBytes, timingSafeEqual } from 'node:crypto';
/**
 * Envelope encryption for a model key.
 *
 * A fresh 256-bit data key encrypts each secret; the data key itself is wrapped
 * by a root key the application never stores. Two consequences matter: the
 * database alone is useless without the root key, and rotating the root key
 * rewraps records without re-encrypting secrets.
 *
 * AES-256-GCM throughout, so tampering is detected rather than decrypted into
 * garbage. The tenant and provider are bound in as additional authenticated
 * data, which makes a record from one tenant undecryptable in the context of
 * another even if rows are swapped.
 */
const ALGORITHM = 'aes-256-gcm';
const KEY_BYTES = 32;
const IV_BYTES = 12;
/** Binds a record to its owner, so rows cannot be moved between tenants. */
function aad({ tenantId, provider }) {
    return Buffer.from(`${tenantId}\u0000${provider}`, 'utf8');
}
function encrypt(plaintext, key, additional) {
    const iv = randomBytes(IV_BYTES);
    const cipher = createCipheriv(ALGORITHM, key, iv);
    cipher.setAAD(additional);
    const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    return { ciphertext, iv, tag: cipher.getAuthTag() };
}
function decrypt(ciphertext, key, iv, tag, additional) {
    const decipher = createDecipheriv(ALGORITHM, key, iv);
    decipher.setAAD(additional);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(ciphertext), decipher.final()]);
}
export class RootKeyError extends Error {
}
/**
 * Root key held in process memory.
 *
 * **Refuses to run on anything that is not 32 bytes of real entropy.** There is
 * deliberately no development default: a custody system that silently falls back
 * to a hardcoded key is worse than none, because it looks like protection while
 * providing none, and nothing in a test suite would notice.
 */
export class LocalRootKey {
    id;
    key;
    constructor(material, id = 'local-v1') {
        const key = typeof material === 'string' ? Buffer.from(material, 'base64') : material;
        if (key.length !== KEY_BYTES) {
            throw new RootKeyError(`Root key must be exactly ${KEY_BYTES} bytes (base64 of 32 random bytes); got ${key.length}. ` +
                `Generate one with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`);
        }
        if (looksLikePlaceholder(key)) {
            throw new RootKeyError('Root key looks like a placeholder (low entropy or a repeated pattern). Refusing to start: ' +
                'a predictable root key offers no protection while appearing to.');
        }
        this.key = key;
        this.id = id;
    }
    async wrap(dataKey, context) {
        const { ciphertext, iv, tag } = encrypt(dataKey, this.key, aad(context));
        return { wrapped: ciphertext, iv, tag };
    }
    async unwrap(wrapped, iv, tag, context) {
        return decrypt(wrapped, this.key, iv, tag, aad(context));
    }
}
/** Catches all-zero, all-same-byte and short repeating material. */
function looksLikePlaceholder(key) {
    const first = key[0];
    if (key.every((b) => b === first))
        return true;
    for (const period of [1, 2, 4, 8, 16]) {
        let repeats = true;
        for (let i = period; i < key.length; i++) {
            if (key[i] !== key[i % period]) {
                repeats = false;
                break;
            }
        }
        if (repeats)
            return true;
    }
    const distinct = new Set(key).size;
    return distinct < 8;
}
export async function seal(secret, root, context) {
    if (!secret)
        throw new Error('Refusing to seal an empty secret.');
    const dataKey = randomBytes(KEY_BYTES);
    const body = encrypt(Buffer.from(secret, 'utf8'), dataKey, aad(context));
    const wrapped = await root.wrap(dataKey, context);
    dataKey.fill(0);
    return {
        wrappedDataKey: wrapped.wrapped.toString('base64'),
        wrappedDataKeyIv: wrapped.iv.toString('base64'),
        wrappedDataKeyTag: wrapped.tag.toString('base64'),
        ciphertext: body.ciphertext.toString('base64'),
        iv: body.iv.toString('base64'),
        tag: body.tag.toString('base64'),
        rootKeyId: root.id,
    };
}
export async function open(sealed, root, context) {
    if (sealed.rootKeyId !== root.id) {
        throw new RootKeyError(`Record was sealed with root key "${sealed.rootKeyId}" but "${root.id}" is configured. Rewrap before rotating.`);
    }
    const dataKey = await root.unwrap(Buffer.from(sealed.wrappedDataKey, 'base64'), Buffer.from(sealed.wrappedDataKeyIv, 'base64'), Buffer.from(sealed.wrappedDataKeyTag, 'base64'), context);
    try {
        return decrypt(Buffer.from(sealed.ciphertext, 'base64'), dataKey, Buffer.from(sealed.iv, 'base64'), Buffer.from(sealed.tag, 'base64'), aad(context)).toString('utf8');
    }
    finally {
        dataKey.fill(0);
    }
}
/** Constant-time comparison, for callers verifying a fingerprint. */
export function equals(a, b) {
    const left = Buffer.from(a, 'utf8');
    const right = Buffer.from(b, 'utf8');
    if (left.length !== right.length)
        return false;
    return timingSafeEqual(left, right);
}
