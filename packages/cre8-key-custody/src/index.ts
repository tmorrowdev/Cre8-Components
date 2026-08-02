/**
 * Team key custody for the cre8 harness.
 *
 * The default posture is client-only: an individual's model key lives in their
 * browser and no server ever sees it. This package exists for the case that
 * cannot serve — a team wanting one shared credential, central revocation, and
 * an audit trail instead of a key pasted into everyone's browser.
 *
 * Three deliberate constraints:
 *
 *  1. **This is not the knowledge plane.** `cre8-mcp` holds no model key and
 *     calls no model, and tests assert it. Custody lives here, in a package a
 *     shell opts into, so adopting it cannot compromise that invariant.
 *  2. **No weak defaults.** There is no development root key. Misconfiguration
 *     fails startup rather than silently encrypting with something predictable,
 *     which would look like protection while providing none.
 *  3. **No storage decision.** `KeyRecordStore` is an interface with an
 *     in-memory implementation for tests. Durable storage is an infrastructure
 *     choice a deployment makes, not one a library should make for it.
 */

export {
  LocalRootKey,
  RootKeyError,
  equals,
  open,
  seal,
  type RootKeyProvider,
  type SealContext,
  type SealedSecret,
} from './envelope.js';

export {
  InMemoryKeyRecordStore,
  TeamKeyCustody,
  fingerprint,
  type AuditEvent,
  type CustodyOptions,
  type KeyRecord,
  type KeyRecordStore,
} from './custody.js';
