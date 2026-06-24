"use client";

import { useEffect } from "react";
import { getTheme, onStoreChange } from "@/lib/a2ui-demo/store";
import { applyTheme } from "@/lib/a2ui-demo/theme";

// Applies any saved brand theme to the document on mount and keeps it in sync
// when the theme changes (e.g. the extractor saves a new one). Mounted once per
// A2UI route via the layout.
export default function ThemeBoot() {
  useEffect(() => {
    applyTheme(getTheme());
    return onStoreChange(() => applyTheme(getTheme()));
  }, []);
  return null;
}
