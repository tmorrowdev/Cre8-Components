"use client";

import { useEffect, useRef } from "react";

// Accessible modal dialog: focus-traps lightly, closes on Escape / backdrop,
// restores focus on unmount. Used for flows that previously relied on window.prompt.
export default function Modal({
  open,
  title,
  description,
  onClose,
  children,
  footer,
}: {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // focus the first focusable element in the dialog
    const first = ref.current?.querySelector<HTMLElement>(
      "input, textarea, select, button, [tabindex]",
    );
    first?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      restoreTo.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={ref}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2 className="modal-title">{title}</h2>
          {description && <p className="modal-desc">{description}</p>}
        </div>
        {children && <div className="modal-body">{children}</div>}
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}
