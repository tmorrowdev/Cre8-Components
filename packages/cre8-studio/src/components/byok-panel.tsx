"use client";

import { useCallback, useEffect, useState } from "react";
import { keyStore } from "@/lib/byok/key-store";

/**
 * Key entry for the BYOK path.
 *
 * Deliberately blunt about custody, because the honest version is short: the
 * key stays in this tab and goes only to the model provider. Persisting it is
 * offered but not defaulted — anything this page can read, script injected into
 * this page can also read.
 */
export function ByokPanel() {
  const [hasKey, setHasKey] = useState(false);
  const [persisted, setPersisted] = useState(false);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [remember, setRemember] = useState(false);

  const refresh = useCallback(async () => {
    setHasKey(await keyStore.has("gemini"));
    setPersisted(await keyStore.isPersisted("gemini"));
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const save = useCallback(async () => {
    if (!draft.trim()) return;
    await keyStore.set("gemini", draft, remember);
    setDraft("");
    setOpen(false);
    await refresh();
  }, [draft, remember, refresh]);

  const clear = useCallback(async () => {
    await keyStore.clear("gemini");
    await refresh();
  }, [refresh]);

  return (
    <div className="byok">
      <button className="byok-toggle" onClick={() => setOpen((v) => !v)}>
        {hasKey ? "● Your key" : "○ Trial"}
      </button>

      {open && (
        <div className="byok-panel">
          {hasKey ? (
            <>
              <p>
                Running on your own key. Requests go straight from this tab to the
                model provider — they never reach our servers.
                {persisted
                  ? " Saved on this device."
                  : " Held for this session only."}
              </p>
              <button onClick={clear}>Remove key</button>
            </>
          ) : (
            <>
              <p>
                Add a Gemini API key to run generation on your own account. It stays
                in this tab and is sent only to the model provider.
              </p>
              <input
                type="password"
                value={draft}
                placeholder="AIza…"
                autoComplete="off"
                spellCheck={false}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && void save()}
              />
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember on this device — readable by any script running on this
                page, so prefer session-only on a shared machine.
              </label>
              <button onClick={save} disabled={!draft.trim()}>
                Use my key
              </button>
              <p className="byok-note">
                Without a key, generation runs on our account and is rate limited.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
