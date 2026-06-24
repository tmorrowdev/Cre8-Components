"use client";

import { useEffect, useRef, useState } from "react";
import type { Mention } from "@/lib/a2ui-demo/types";
import type { MentionItem } from "@/lib/a2ui-demo/mentions";

const KIND_LABEL: Record<Mention["kind"], string> = {
  pattern: "Patterns",
  component: "Components",
  data: "Data sources",
};
const KIND_ICON: Record<Mention["kind"], string> = {
  pattern: "▣",
  component: "◈",
  data: "▤",
};

export default function MentionInput({
  value,
  onChange,
  onSend,
  onAddMention,
  items,
  disabled,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onAddMention: (m: Mention) => void;
  items: MentionItem[];
  disabled?: boolean;
  placeholder?: string;
}) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [anchor, setAnchor] = useState(0); // index of the triggering '@'

  // Find an active @query immediately before the caret (word with no spaces).
  const detectTrigger = (text: string, caret: number) => {
    const upto = text.slice(0, caret);
    const at = upto.lastIndexOf("@");
    if (at === -1) return null;
    const between = upto.slice(at + 1);
    if (/\s/.test(between)) return null; // space ends a mention token
    // require @ to be at start or preceded by whitespace
    if (at > 0 && !/\s/.test(upto[at - 1])) return null;
    return { at, query: between };
  };

  const filtered = open
    ? items
        .filter((it) => {
          const q = query.toLowerCase();
          return (
            it.label.toLowerCase().includes(q) ||
            it.title.toLowerCase().includes(q) ||
            it.detail.toLowerCase().includes(q)
          );
        })
        .slice(0, 24)
    : [];

  // Group filtered items by kind for display, preserving order.
  const grouped: { kind: Mention["kind"]; items: MentionItem[] }[] = [];
  for (const kind of ["pattern", "component", "data"] as const) {
    const group = filtered.filter((it) => it.kind === kind);
    if (group.length) grouped.push({ kind, items: group });
  }
  const flat = grouped.flatMap((g) => g.items);

  useEffect(() => {
    if (active >= flat.length) setActive(0);
  }, [flat.length, active]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    onChange(text);
    const caret = e.target.selectionStart ?? text.length;
    const trig = detectTrigger(text, caret);
    if (trig) {
      setOpen(true);
      setQuery(trig.query);
      setAnchor(trig.at);
      setActive(0);
    } else {
      setOpen(false);
    }
  };

  const pick = (it: MentionItem) => {
    const ta = taRef.current;
    const caret = ta?.selectionStart ?? value.length;
    const before = value.slice(0, anchor);
    const after = value.slice(caret);
    const insert = `@${it.label} `;
    const next = before + insert + after;
    onChange(next);
    onAddMention({ kind: it.kind, id: it.id, label: it.label });
    setOpen(false);
    setQuery("");
    requestAnimationFrame(() => {
      ta?.focus();
      const pos = (before + insert).length;
      ta?.setSelectionRange(pos, pos);
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (open && flat.length) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => (a + 1) % flat.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => (a - 1 + flat.length) % flat.length);
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        pick(flat[active]);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        return;
      }
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) onSend();
    }
  };

  return (
    <div className="mention-input">
      {open && flat.length > 0 && (
        <div className="mention-menu">
          {grouped.map((g) => (
            <div key={g.kind} className="mention-group">
              <div className="mention-group-head">{KIND_LABEL[g.kind]}</div>
              {g.items.map((it) => {
                const idx = flat.indexOf(it);
                return (
                  <button
                    type="button"
                    key={`${it.kind}:${it.id}`}
                    className={`mention-option${idx === active ? " active" : ""}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      pick(it);
                    }}
                    onMouseEnter={() => setActive(idx)}
                  >
                    <span className={`mention-kind mention-kind--${it.kind}`}>
                      {KIND_ICON[it.kind]}
                    </span>
                    <span className="mention-option-text">
                      <span className="mention-option-title">{it.title}</span>
                      <span className="mention-option-detail">{it.detail}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
      <textarea
        ref={taRef}
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder ?? "Describe a UI… type @ to reference patterns, components or data"}
        disabled={disabled}
        rows={3}
      />
      <div className="mention-input-foot">
        <span className="mention-tip">
          <kbd>@</kbd> to mention · <kbd>↵</kbd> to send · <kbd>⇧↵</kbd> newline
        </span>
        <button type="button" onClick={onSend} disabled={disabled || !value.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}
