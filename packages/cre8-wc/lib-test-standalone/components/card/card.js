import { u as b, f, i as g, C as u, x as l } from "../../cre8-element-e0e1e600.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const m = { attribute: !0, type: String, converter: b, reflect: !1, hasChanged: f }, y = (t = m, r, a) => {
  const { kind: o, metadata: e } = a;
  let c = globalThis.litPropertyMetadata.get(e);
  if (c === void 0 && globalThis.litPropertyMetadata.set(e, c = /* @__PURE__ */ new Map()), o === "setter" && ((t = Object.create(t)).wrapped = !0), c.set(a.name, t), o === "accessor") {
    const { name: n } = a;
    return { set(i) {
      const s = r.get.call(this);
      r.set.call(this, i), this.requestUpdate(n, s, t);
    }, init(i) {
      return i !== void 0 && this.C(n, void 0, t, i), i;
    } };
  }
  if (o === "setter") {
    const { name: n } = a;
    return function(i) {
      const s = this[n];
      r.call(this, i), this.requestUpdate(n, s, t);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function h(t) {
  return (r, a) => typeof a == "object" ? y(t, r, a) : ((o, e, c) => {
    const n = e.hasOwnProperty(c);
    return e.constructor.createProperty(c, o), n ? Object.getOwnPropertyDescriptor(e, c) : void 0;
  })(t, r, a);
}
const v = g`@import '../../design-tokens/core/scss/theming/component';

// #CARD

:host {
  display: block;
}

/**
 * 1) A card is an organized block that typically contains a title, image,
 * text, and/or calls to action. It is made up of an optional header slot, required
 * body slot, and optional footer slot to place other Components and content within.
 */
.cre8-c-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: calc(var(--size-base-unit) * 3);
  gap: calc(var(--size-base-unit) * 2);
  border-color: var(--cre8-color-border-default);
  border-style: var(--cre8-border-style-default);
  border-width: var(--cre8-border-width-default);
  border-radius: var(--cre8-border-radius-default);
  background: var(--cre8-color-bg-default);
}
/**
 * Horizontal card
 * 1) Organized block with flex-direction set to row so that header => footer appears
 * from left to right rather than top to bottom
 */
.cre8-c-card--horizontal{
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
/**
 * Bare card
 * 1) Organized block without a border, background, or padding
 */
.cre8-c-card--bare {
  border: 0;
  padding: 0;
  gap: 0;
  box-shadow: none;
}
/**
 * Horizontal-bare card
 * 1) Organized block with flex-direction set to row so that header => footer appears
 * from left to right rather than top to bottom without a border, background, or padding
 */
.cre8-c-card--horizontal-bare{
  flex-direction: row;
  border: 0;
  padding: 0;
  gap: 0;
  box-shadow: none;
  align-items: center;
  justify-content: center;
}
/**
 * Center aligned card
 * 1) Center content and text within the card
 */
.cre8-c-card--align-center {
  text-align: center; /* 1 */
  align-items: center; /* 1 */
  justify-content: center; /* 1 */
}

/**
 * Slotted image within a card
 * 1) Make the image full width
 */
::slotted(img) {
  width: 100%;
}

/**
 * Card header
 * 1) Remove flex so that body always takes up remaining space
 */
.cre8-c-card__header {
  display: block;
  flex: none; /* 1 */
}

/**
 * Card body
 * 1) Flex applied to always fill the remaining space of the card
 */
.cre8-c-card__body {
  display: block;
  flex: 1 1 auto; /* 1 */

}

/**
 * Card footer
 * 1) Remove flex so that body always takes up remaining space
 */
.cre8-c-card__footer {
  display: block;
  flex: none; /* 1 */

  .cre8-c-card--bare & {
    padding: 0;
  }
  .cre8-c-card--horizontal-bare & {
    padding: 0;
  }
}
`;
var w = Object.defineProperty, x = Object.getOwnPropertyDescriptor, p = (t, r, a, o) => {
  for (var e = o > 1 ? void 0 : o ? x(r, a) : r, c = t.length - 1, n; c >= 0; c--)
    (n = t[c]) && (e = (o ? n(r, a, e) : n(e)) || e);
  return o && e && w(r, a, e), e;
};
class d extends u {
  render() {
    const r = this.componentClassNames("cre8-c-card", {
      "cre8-c-card--bare": this.variant === "bare",
      "cre8-c-card--horizontal": this.variant === "horizontal",
      "cre8-c-card--horizontal-bare": this.variant === "horizontal-bare",
      "cre8-c-card--align-center": this.align === "center"
    });
    return l`
      <div class="${r}" part="card">
        ${this.slotNotEmpty("header") && l`<div class="cre8-c-card__header" part="header"><slot name="header"></slot></div>`}
        <div class="cre8-c-card__body" part="body">
          <slot></slot>
        </div>
        ${this.slotNotEmpty("footer") && l`<div class="cre8-c-card__footer" part="footer"><slot name="footer"></slot></div>`}
      </div>
    `;
  }
}
d.styles = [v];
p([
  h()
], d.prototype, "variant", 2);
p([
  h()
], d.prototype, "align", 2);
customElements.get("cre8-card") === void 0 && customElements.define("cre8-card", d);
export {
  d as Cre8Card,
  d as default
};
