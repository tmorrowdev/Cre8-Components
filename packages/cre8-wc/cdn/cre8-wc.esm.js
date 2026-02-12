const yo = globalThis, xs = yo.ShadowRoot && (yo.ShadyCSS === void 0 || yo.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _s = Symbol(), Ic = /* @__PURE__ */ new WeakMap();
let S1 = class {
  constructor(e, t, o) {
    if (this._$cssResult$ = !0, o !== _s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (xs && e === void 0) {
      const o = t !== void 0 && t.length === 1;
      o && (e = Ic.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && Ic.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Kd = (r) => new S1(typeof r == "string" ? r : r + "", void 0, _s), k = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce(((o, i, n) => o + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1]), r[0]);
  return new S1(t, r, _s);
}, Gd = (r, e) => {
  if (xs) r.adoptedStyleSheets = e.map(((t) => t instanceof CSSStyleSheet ? t : t.styleSheet));
  else for (const t of e) {
    const o = document.createElement("style"), i = yo.litNonce;
    i !== void 0 && o.setAttribute("nonce", i), o.textContent = t.cssText, r.appendChild(o);
  }
}, Bc = xs ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const o of e.cssRules) t += o.cssText;
  return Kd(t);
})(r) : r, { is: Jd, defineProperty: Qd, getOwnPropertyDescriptor: e8, getOwnPropertyNames: t8, getOwnPropertySymbols: r8, getPrototypeOf: i8 } = Object, tn = globalThis, Vc = tn.trustedTypes, o8 = Vc ? Vc.emptyScript : "", n8 = tn.reactiveElementPolyfillSupport, ti = (r, e) => r, wo = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? o8 : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, ws = (r, e) => !Jd(r, e), Nc = { attribute: !0, type: String, converter: wo, reflect: !1, useDefault: !1, hasChanged: ws };
Symbol.metadata ??= Symbol("metadata"), tn.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let vr = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Nc) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const o = Symbol(), i = this.getPropertyDescriptor(e, o, t);
      i !== void 0 && Qd(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, o) {
    const { get: i, set: n } = e8(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: i, set(s) {
      const a = i?.call(this);
      n?.call(this, s), this.requestUpdate(e, a, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Nc;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ti("elementProperties"))) return;
    const e = i8(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ti("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ti("properties"))) {
      const t = this.properties, o = [...t8(t), ...r8(t)];
      for (const i of o) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [o, i] of t) this.elementProperties.set(o, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, o] of this.elementProperties) {
      const i = this._$Eu(t, o);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const i of o) t.unshift(Bc(i));
    } else e !== void 0 && t.push(Bc(e));
    return t;
  }
  static _$Eu(e, t) {
    const o = t.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((e) => this.enableUpdating = e)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((e) => e(this)));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const o of t.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Gd(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((e) => e.hostConnected?.()));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((e) => e.hostDisconnected?.()));
  }
  attributeChangedCallback(e, t, o) {
    this._$AK(e, o);
  }
  _$ET(e, t) {
    const o = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, o);
    if (i !== void 0 && o.reflect === !0) {
      const n = (o.converter?.toAttribute !== void 0 ? o.converter : wo).toAttribute(t, o.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const o = this.constructor, i = o._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const n = o.getPropertyOptions(i), s = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : wo;
      this._$Em = i;
      const a = s.fromAttribute(t, n.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, t, o) {
    if (e !== void 0) {
      const i = this.constructor, n = this[e];
      if (o ??= i.getPropertyOptions(e), !((o.hasChanged ?? ws)(n, t) || o.useDefault && o.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(i._$Eu(e, o)))) return;
      this.C(e, t, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: o, reflect: i, wrapped: n }, s) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, s ?? t ?? this[e]), n !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [i, n] of o) {
        const { wrapped: s } = n, a = this[i];
        s !== !0 || this._$AL.has(i) || a === void 0 || this.C(i, void 0, n, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach(((o) => o.hostUpdate?.())), this.update(t)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach(((t) => t.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach(((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
vr.elementStyles = [], vr.shadowRootOptions = { mode: "open" }, vr[ti("elementProperties")] = /* @__PURE__ */ new Map(), vr[ti("finalized")] = /* @__PURE__ */ new Map(), n8?.({ ReactiveElement: vr }), (tn.reactiveElementVersions ??= []).push("2.1.1");
const ks = globalThis, ko = ks.trustedTypes, Rc = ko ? ko.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, A1 = "$lit$", bt = `lit$${Math.random().toFixed(9).slice(2)}$`, T1 = "?" + bt, s8 = `<${T1}>`, Gt = document, bi = () => Gt.createComment(""), mi = (r) => r === null || typeof r != "object" && typeof r != "function", $s = Array.isArray, a8 = (r) => $s(r) || typeof r?.[Symbol.iterator] == "function", xn = `[ 	
\f\r]`, Wr = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, zc = /-->/g, Fc = />/g, zt = RegExp(`>|${xn}(?:([^\\s"'>=/]+)(${xn}*=${xn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Zc = /'/g, jc = /"/g, P1 = /^(?:script|style|textarea|title)$/i, c8 = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), f = c8(1), Jt = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), Wc = /* @__PURE__ */ new WeakMap(), Yt = Gt.createTreeWalker(Gt, 129);
function E1(r, e) {
  if (!$s(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Rc !== void 0 ? Rc.createHTML(e) : e;
}
const l8 = (r, e) => {
  const t = r.length - 1, o = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = Wr;
  for (let a = 0; a < t; a++) {
    const c = r[a];
    let l, d, h = -1, p = 0;
    for (; p < c.length && (s.lastIndex = p, d = s.exec(c), d !== null); ) p = s.lastIndex, s === Wr ? d[1] === "!--" ? s = zc : d[1] !== void 0 ? s = Fc : d[2] !== void 0 ? (P1.test(d[2]) && (i = RegExp("</" + d[2], "g")), s = zt) : d[3] !== void 0 && (s = zt) : s === zt ? d[0] === ">" ? (s = i ?? Wr, h = -1) : d[1] === void 0 ? h = -2 : (h = s.lastIndex - d[2].length, l = d[1], s = d[3] === void 0 ? zt : d[3] === '"' ? jc : Zc) : s === jc || s === Zc ? s = zt : s === zc || s === Fc ? s = Wr : (s = zt, i = void 0);
    const g = s === zt && r[a + 1].startsWith("/>") ? " " : "";
    n += s === Wr ? c + s8 : h >= 0 ? (o.push(l), c.slice(0, h) + A1 + c.slice(h) + bt + g) : c + bt + (h === -2 ? a : g);
  }
  return [E1(r, n + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class vi {
  constructor({ strings: e, _$litType$: t }, o) {
    let i;
    this.parts = [];
    let n = 0, s = 0;
    const a = e.length - 1, c = this.parts, [l, d] = l8(e, t);
    if (this.el = vi.createElement(l, o), Yt.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = Yt.nextNode()) !== null && c.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(A1)) {
          const p = d[s++], g = i.getAttribute(h).split(bt), b = /([.?@])?(.*)/.exec(p);
          c.push({ type: 1, index: n, name: b[2], strings: g, ctor: b[1] === "." ? h8 : b[1] === "?" ? u8 : b[1] === "@" ? p8 : rn }), i.removeAttribute(h);
        } else h.startsWith(bt) && (c.push({ type: 6, index: n }), i.removeAttribute(h));
        if (P1.test(i.tagName)) {
          const h = i.textContent.split(bt), p = h.length - 1;
          if (p > 0) {
            i.textContent = ko ? ko.emptyScript : "";
            for (let g = 0; g < p; g++) i.append(h[g], bi()), Yt.nextNode(), c.push({ type: 2, index: ++n });
            i.append(h[p], bi());
          }
        }
      } else if (i.nodeType === 8) if (i.data === T1) c.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(bt, h + 1)) !== -1; ) c.push({ type: 7, index: n }), h += bt.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const o = Gt.createElement("template");
    return o.innerHTML = e, o;
  }
}
function $r(r, e, t = r, o) {
  if (e === Jt) return e;
  let i = o !== void 0 ? t._$Co?.[o] : t._$Cl;
  const n = mi(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, t, o)), o !== void 0 ? (t._$Co ??= [])[o] = i : t._$Cl = i), i !== void 0 && (e = $r(r, i._$AS(r, e.values), i, o)), e;
}
class d8 {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: o } = this._$AD, i = (e?.creationScope ?? Gt).importNode(t, !0);
    Yt.currentNode = i;
    let n = Yt.nextNode(), s = 0, a = 0, c = o[0];
    for (; c !== void 0; ) {
      if (s === c.index) {
        let l;
        c.type === 2 ? l = new ji(n, n.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (l = new f8(n, this, e)), this._$AV.push(l), c = o[++a];
      }
      s !== c?.index && (n = Yt.nextNode(), s++);
    }
    return Yt.currentNode = Gt, i;
  }
  p(e) {
    let t = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, t), t += o.strings.length - 2) : o._$AI(e[t])), t++;
  }
}
class ji {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, o, i) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = o, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = $r(this, e, t), mi(e) ? e === T || e == null || e === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : e !== this._$AH && e !== Jt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : a8(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== T && mi(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Gt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: o } = e, i = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = vi.createElement(E1(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const n = new d8(i, this), s = n.u(this.options);
      n.p(t), this.T(s), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = Wc.get(e.strings);
    return t === void 0 && Wc.set(e.strings, t = new vi(e)), t;
  }
  k(e) {
    $s(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let o, i = 0;
    for (const n of e) i === t.length ? t.push(o = new ji(this.O(bi()), this.O(bi()), this, this.options)) : o = t[i], o._$AI(n), i++;
    i < t.length && (this._$AR(o && o._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const o = e.nextSibling;
      e.remove(), e = o;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class rn {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, o, i, n) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = T;
  }
  _$AI(e, t = this, o, i) {
    const n = this.strings;
    let s = !1;
    if (n === void 0) e = $r(this, e, t, 0), s = !mi(e) || e !== this._$AH && e !== Jt, s && (this._$AH = e);
    else {
      const a = e;
      let c, l;
      for (e = n[0], c = 0; c < n.length - 1; c++) l = $r(this, a[o + c], t, c), l === Jt && (l = this._$AH[c]), s ||= !mi(l) || l !== this._$AH[c], l === T ? e = T : e !== T && (e += (l ?? "") + n[c + 1]), this._$AH[c] = l;
    }
    s && !i && this.j(e);
  }
  j(e) {
    e === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class h8 extends rn {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === T ? void 0 : e;
  }
}
class u8 extends rn {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== T);
  }
}
class p8 extends rn {
  constructor(e, t, o, i, n) {
    super(e, t, o, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = $r(this, e, t, 0) ?? T) === Jt) return;
    const o = this._$AH, i = e === T && o !== T || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, n = e !== T && (o === T || i);
    i && this.element.removeEventListener(this.name, this, o), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class f8 {
  constructor(e, t, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    $r(this, e);
  }
}
const g8 = ks.litHtmlPolyfillSupport;
g8?.(vi, ji), (ks.litHtmlVersions ??= []).push("3.3.1");
const b8 = (r, e, t) => {
  const o = t?.renderBefore ?? e;
  let i = o._$litPart$;
  if (i === void 0) {
    const n = t?.renderBefore ?? null;
    o._$litPart$ = i = new ji(e.insertBefore(bi(), n), n, void 0, t ?? {});
  }
  return i._$AI(r), i;
}, Ms = globalThis;
let wr = class extends vr {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = b8(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Jt;
  }
};
wr._$litElement$ = !0, wr.finalized = !0, Ms.litElementHydrateSupport?.({ LitElement: wr });
const m8 = Ms.litElementPolyfillSupport;
m8?.({ LitElement: wr });
(Ms.litElementVersions ??= []).push("4.2.1");
const v8 = { attribute: !0, type: String, converter: wo, reflect: !1, hasChanged: ws }, y8 = (r = v8, e, t) => {
  const { kind: o, metadata: i } = t;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), o === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(t.name, r), o === "accessor") {
    const { name: s } = t;
    return { set(a) {
      const c = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(s, c, r);
    }, init(a) {
      return a !== void 0 && this.C(s, void 0, r, a), a;
    } };
  }
  if (o === "setter") {
    const { name: s } = t;
    return function(a) {
      const c = this[s];
      e.call(this, a), this.requestUpdate(s, c, r);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function u(r) {
  return (e, t) => typeof t == "object" ? y8(r, e, t) : ((o, i, n) => {
    const s = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, o), s ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, e, t);
}
function R(r) {
  return u({ ...r, state: !0, attribute: !1 });
}
const Ls = (r, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(r, e, t), t);
function oe(r, e) {
  return (t, o, i) => {
    const n = (s) => s.renderRoot?.querySelector(r) ?? null;
    return Ls(t, o, { get() {
      return n(this);
    } });
  };
}
let C8;
function D1(r) {
  return (e, t) => Ls(e, t, { get() {
    return (this.renderRoot ?? (C8 ??= document.createDocumentFragment())).querySelectorAll(r);
  } });
}
function on(r) {
  return (e, t) => {
    const { slot: o, selector: i } = r ?? {}, n = "slot" + (o ? `[name=${o}]` : ":not([name])");
    return Ls(e, t, { get() {
      const s = this.renderRoot?.querySelector(n), a = s?.assignedElements(r) ?? [];
      return i === void 0 ? a : a.filter(((c) => c.matches(i)));
    } });
  };
}
function x8(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var _n = { exports: {} }, qc;
function _8() {
  return qc || (qc = 1, (function(r) {
    (function() {
      var e = {}.hasOwnProperty;
      function t() {
        for (var n = "", s = 0; s < arguments.length; s++) {
          var a = arguments[s];
          a && (n = i(n, o(a)));
        }
        return n;
      }
      function o(n) {
        if (typeof n == "string" || typeof n == "number")
          return n;
        if (typeof n != "object")
          return "";
        if (Array.isArray(n))
          return t.apply(null, n);
        if (n.toString !== Object.prototype.toString && !n.toString.toString().includes("[native code]"))
          return n.toString();
        var s = "";
        for (var a in n)
          e.call(n, a) && n[a] && (s = i(s, a));
        return s;
      }
      function i(n, s) {
        return s ? n ? n + " " + s : n + s : n;
      }
      r.exports ? (t.default = t, r.exports = t) : window.classNames = t;
    })();
  })(_n)), _n.exports;
}
var w8 = _8();
const Wi = /* @__PURE__ */ x8(w8);
class M extends wr {
  /**
   * Abstraction of `classnames` that automatically includes any style modifier
   * as well as any set variants.
   *
   * It is expected that `variant` would be overridden in a subclass with more
   * specific types, `@property() variant?: 'foo' | 'bar'`
   *
   * @param baseClassName
   */
  componentClassNames(e, t = {}) {
    return Wi(e, t);
  }
  /**
   * Check if a slot is empty
   *
   * @param slotName
   */
  slotEmpty(e) {
    return !this.querySelector(`[slot="${e}"]`);
  }
  /**
   * Check if a slot is not empty
   *
   * @param slotName
   */
  slotNotEmpty(e) {
    return this.slotEmpty(e) ? null : !this.slotEmpty(e);
  }
  /**
  * Dispatch a custom event.
  */
  dispatch({
    e,
    eventName: t,
    detailObj: o = {},
    optionsObj: i = {}
  }) {
    const n = {
      bubbles: !0,
      composed: !0,
      ...i,
      detail: { ...e && { originalEvent: e }, ...o }
    }, s = new CustomEvent(t, n);
    return this.dispatchEvent(s), s;
  }
  /**
   * Example render, should not be used
   */
  render() {
    return f`<slot></slot>`;
  }
}
const k8 = k`@import '../../design-tokens/core/scss/theming/component';

//## ACCORDION

:host {
  display: block;
}

.cre8-c-accordion {
  --cre8-accordion-border-top: var(--cre8-border-width-none);
  --cre8-accordion-border-bottom: var(--cre8-border-width-none);
  ::slotted(cre8-accordion:not(:last-child)) {
    --cre8-accordion-border-bottom: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-default);
  }
  border: var(--cre8-border-width-none);
  border-radius: var(--cre8-border-radius-none);
}

.cre8-c-inner-divider {
  ::slotted(cre8-accordion-item:last-child) {
    border-bottom: var(--cre8-border-width-none);
  }
  ::slotted(cre8-accordion-item:not(first-child)) {
    border-top: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-default);
  }
  ::slotted(cre8-accordion-item:first-child) {
    border-top: var(--cre8-border-width-none);
  }
}

.cre8-c-accordion--border-rectangle {
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-default);
  border-radius: var(--cre8-border-radius-none);
}

.cre8-c-accordion--border-rounded-bottom {
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-default);
  border-radius: 0 0 var(--cre8-border-radius-default) var(--cre8-border-radius-default);
}
.cre8-c-accordion--border-rounded {
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-default);
  border-radius: var(--cre8-border-radius-default);
}
.cre8-c-accordiong-group--list {
  list-style: none;
}
`;
var $8 = Object.defineProperty, O1 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && $8(e, t, i), i;
};
const ia = class ia extends M {
  constructor() {
    super(...arguments), this.hasDivider = !1;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    const e = this.componentClassNames("cre8-c-accordion", {
      "cre8-c-inner-divider": this.hasDivider === !0,
      "cre8-c-accordion--border-none": this.borderType === void 0 || this.borderType === "none",
      "cre8-c-accordion--border-rectangle": this.borderType === "rectangle",
      "cre8-c-accordion--border-rounded-bottom": this.borderType === "rounded-bottom",
      "cre8-c-accordion--border-rounded": this.borderType === "rounded"
    });
    return f`
      <div class="${e}">
        <slot> </slot>
      </div>
    `;
  }
};
ia.styles = [k8];
let yi = ia;
O1([
  u()
], yi.prototype, "borderType");
O1([
  u({ type: Boolean, reflect: !0 })
], yi.prototype, "hasDivider");
customElements.get("cre8-accordion") === void 0 && customElements.define("cre8-accordion", yi);
const dt = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7867 12.1506C15.7192 12.2183 15.639 12.2719 15.5507 12.3085C15.4624 12.3451 15.3678 12.3639 15.2722 12.3639C15.1766 12.3639 15.082 12.3451 14.9937 12.3085C14.9054 12.2719 14.8252 12.2183 14.7577 12.1506L7.99992 5.39197L1.24215 12.1506C1.10569 12.2871 0.920613 12.3638 0.727633 12.3638C0.534652 12.3638 0.349576 12.2871 0.213119 12.1506C0.076661 12.0142 3.8041e-09 11.8291 0 11.6361C-3.8041e-09 11.4432 0.076661 11.2581 0.213119 11.1216L7.4854 3.84933C7.55294 3.78172 7.63315 3.72808 7.72143 3.69148C7.80972 3.65488 7.90435 3.63605 7.99992 3.63605C8.09548 3.63605 8.19012 3.65488 8.2784 3.69148C8.36668 3.72808 8.44689 3.78172 8.51443 3.84933L15.7867 11.1216C15.8543 11.1892 15.908 11.2694 15.9446 11.3576C15.9812 11.4459 16 11.5406 16 11.6361C16 11.7317 15.9812 11.8263 15.9446 11.9146C15.908 12.0029 15.8543 12.0831 15.7867 12.1506Z"/>
</svg>
`, $ = (r) => r ?? T, M8 = { CHILD: 2 }, L8 = (r) => (...e) => ({ _$litDirective$: r, values: e });
let S8 = class {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, o) {
    this._$Ct = e, this._$AM = t, this._$Ci = o;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
}, Vn = class extends S8 {
  constructor(e) {
    if (super(e), this.it = T, e.type !== M8.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === T || e == null) return this._t = void 0, this.it = e;
    if (e === Jt) return e;
    if (typeof e != "string") throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.it) return this._t;
    this.it = e;
    const t = [e];
    return t.raw = t, this._t = { _$litType$: this.constructor.resultType, strings: t, values: [] };
  }
};
Vn.directiveName = "unsafeHTML", Vn.resultType = 1;
const A8 = L8(Vn), T8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9978 5.87895 15.1542 3.84542 13.6544 2.34562C12.1546 0.845814 10.121 0.00223986 8 0ZM8 14.7692C6.66117 14.7692 5.35241 14.3722 4.23922 13.6284C3.12603 12.8846 2.2584 11.8274 1.74605 10.5905C1.2337 9.35356 1.09965 7.99249 1.36084 6.67939C1.62203 5.36629 2.26674 4.16012 3.21343 3.21343C4.16013 2.26674 5.36629 1.62203 6.67939 1.36084C7.99249 1.09965 9.35356 1.2337 10.5905 1.74605C11.8274 2.25839 12.8846 3.12602 13.6284 4.23922C14.3722 5.35241 14.7692 6.66117 14.7692 8C14.7672 9.79468 14.0534 11.5153 12.7843 12.7843C11.5153 14.0534 9.79469 14.7672 8 14.7692ZM11.6923 8C11.6923 8.16321 11.6275 8.31973 11.5121 8.43514C11.3967 8.55055 11.2401 8.61538 11.0769 8.61538H8.61539V11.0769C8.61539 11.2401 8.55055 11.3967 8.43514 11.5121C8.31974 11.6275 8.16321 11.6923 8 11.6923C7.83679 11.6923 7.68027 11.6275 7.56486 11.5121C7.44945 11.3967 7.38462 11.2401 7.38462 11.0769V8.61538H4.92308C4.75987 8.61538 4.60334 8.55055 4.48794 8.43514C4.37253 8.31973 4.30769 8.16321 4.30769 8C4.30769 7.83679 4.37253 7.68026 4.48794 7.56486C4.60334 7.44945 4.75987 7.38461 4.92308 7.38461H7.38462V4.92308C7.38462 4.75987 7.44945 4.60334 7.56486 4.48793C7.68027 4.37253 7.83679 4.30769 8 4.30769C8.16321 4.30769 8.31974 4.37253 8.43514 4.48793C8.55055 4.60334 8.61539 4.75987 8.61539 4.92308V7.38461H11.0769C11.2401 7.38461 11.3967 7.44945 11.5121 7.56486C11.6275 7.68026 11.6923 7.83679 11.6923 8Z"/>
</svg>
`, Uc = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M16 8.00007C16 8.17688 15.9298 8.34644 15.8047 8.47146C15.6797 8.59648 15.5102 8.66672 15.3334 8.66672H2.27628L7.13862 13.5282C7.20056 13.5902 7.24969 13.6637 7.28322 13.7446C7.31674 13.8255 7.33399 13.9123 7.33399 13.9999C7.33399 14.0875 7.31674 14.1742 7.28322 14.2551C7.24969 14.3361 7.20056 14.4096 7.13862 14.4715C7.07669 14.5335 7.00315 14.5826 6.92223 14.6161C6.8413 14.6496 6.75457 14.6669 6.66697 14.6669C6.57938 14.6669 6.49264 14.6496 6.41172 14.6161C6.33079 14.5826 6.25726 14.5335 6.19532 14.4715L0.195518 8.47172C0.133536 8.40981 0.0843647 8.33629 0.0508163 8.25536C0.0172679 8.17443 0 8.08768 0 8.00007C0 7.91246 0.0172679 7.82572 0.0508163 7.74479C0.0843647 7.66386 0.133536 7.59033 0.195518 7.52842L6.19532 1.52862C6.32041 1.40353 6.49007 1.33325 6.66697 1.33325C6.84388 1.33325 7.01353 1.40353 7.13862 1.52862C7.26371 1.65371 7.33399 1.82336 7.33399 2.00027C7.33399 2.17717 7.26371 2.34683 7.13862 2.47192L2.27628 7.33343H15.3334C15.5102 7.33343 15.6797 7.40366 15.8047 7.52868C15.9298 7.6537 16 7.82327 16 8.00007Z"/>
</svg>
`, P8 = `<svg fill="currentColor" width="16" height="17" viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00251 1.90538e-07C6.6212 -0.00030123 5.26334 0.357025 4.0611 1.0372C2.85886 1.71737 1.85319 2.69722 1.14199 3.88137C0.430785 5.06552 0.0382741 6.41363 0.00266021 7.79449C-0.0329537 9.17534 0.289543 10.5419 0.938759 11.7611L0.0655986 14.3806C-0.00672782 14.5975 -0.0172241 14.8302 0.0352863 15.0527C0.0877968 15.2752 0.201239 15.4787 0.362897 15.6404C0.524556 15.802 0.728043 15.9155 0.95055 15.968C1.17306 16.0205 1.40579 16.01 1.62267 15.9377L4.24215 15.0645C5.31516 15.6352 6.50407 15.954 7.71866 15.9966C8.93325 16.0392 10.1416 15.8046 11.252 15.3105C12.3623 14.8164 13.3455 14.0758 14.127 13.145C14.9084 12.2142 15.4675 11.1176 15.7618 9.93844C16.0562 8.75928 16.078 7.52857 15.8257 6.33971C15.5734 5.15086 15.0535 4.03511 14.3056 3.07715C13.5577 2.1192 12.6014 1.34422 11.5092 0.811043C10.4171 0.277864 9.21785 0.000498686 8.00251 1.90538e-07ZM10.4643 9.8471H5.54074C5.37751 9.8471 5.22097 9.78226 5.10555 9.66684C4.99014 9.55142 4.9253 9.39488 4.9253 9.23166C4.9253 9.06843 4.99014 8.91189 5.10555 8.79647C5.22097 8.68105 5.37751 8.61621 5.54074 8.61621H10.4643C10.6275 8.61621 10.7841 8.68105 10.8995 8.79647C11.0149 8.91189 11.0797 9.06843 11.0797 9.23166C11.0797 9.39488 11.0149 9.55142 10.8995 9.66684C10.7841 9.78226 10.6275 9.8471 10.4643 9.8471ZM10.4643 7.38532H5.54074C5.37751 7.38532 5.22097 7.32048 5.10555 7.20506C4.99014 7.08965 4.9253 6.93311 4.9253 6.76988C4.9253 6.60665 4.99014 6.45011 5.10555 6.3347C5.22097 6.21928 5.37751 6.15444 5.54074 6.15444H10.4643C10.6275 6.15444 10.7841 6.21928 10.8995 6.3347C11.0149 6.45011 11.0797 6.60665 11.0797 6.76988C11.0797 6.93311 11.0149 7.08965 10.8995 7.20506C10.7841 7.32048 10.6275 7.38532 10.4643 7.38532Z"/>
</svg>
`, Yc = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1538 1.23077H12.3077V0.615385C12.3077 0.452174 12.2428 0.295649 12.1274 0.180242C12.012 0.064835 11.8555 0 11.6923 0C11.5291 0 11.3725 0.064835 11.2571 0.180242C11.1417 0.295649 11.0769 0.452174 11.0769 0.615385V1.23077H4.92305V0.615385C4.92305 0.452174 4.85821 0.295649 4.74281 0.180242C4.6274 0.064835 4.47087 0 4.30766 0C4.14445 0 3.98793 0.064835 3.87252 0.180242C3.75711 0.295649 3.69228 0.452174 3.69228 0.615385V1.23077H1.84613C1.51971 1.23077 1.20665 1.36044 0.97584 1.59125C0.745026 1.82207 0.615356 2.13512 0.615356 2.46154V14.7692C0.615356 15.0957 0.745026 15.4087 0.97584 15.6395C1.20665 15.8703 1.51971 16 1.84613 16H14.1538C14.4802 16 14.7933 15.8703 15.0241 15.6395C15.2549 15.4087 15.3846 15.0957 15.3846 14.7692V2.46154C15.3846 2.13512 15.2549 1.82207 15.0241 1.59125C14.7933 1.36044 14.4802 1.23077 14.1538 1.23077ZM3.69228 2.46154V3.07692C3.69228 3.24013 3.75711 3.39666 3.87252 3.51207C3.98793 3.62747 4.14445 3.69231 4.30766 3.69231C4.47087 3.69231 4.6274 3.62747 4.74281 3.51207C4.85821 3.39666 4.92305 3.24013 4.92305 3.07692V2.46154H11.0769V3.07692C11.0769 3.24013 11.1417 3.39666 11.2571 3.51207C11.3725 3.62747 11.5291 3.69231 11.6923 3.69231C11.8555 3.69231 12.012 3.62747 12.1274 3.51207C12.2428 3.39666 12.3077 3.24013 12.3077 3.07692V2.46154H14.1538V4.92308H1.84613V2.46154H3.69228ZM14.1538 14.7692H1.84613V6.15385H14.1538V14.7692ZM6.7692 8V12.9231C6.7692 13.0863 6.70437 13.2428 6.58896 13.3582C6.47355 13.4736 6.31703 13.5385 6.15382 13.5385C5.99061 13.5385 5.83408 13.4736 5.71868 13.3582C5.60327 13.2428 5.53843 13.0863 5.53843 12.9231V8.99539L5.19843 9.16615C5.05236 9.23919 4.88326 9.25121 4.72832 9.19956C4.57339 9.14792 4.44532 9.03684 4.37228 8.89077C4.29924 8.7447 4.28722 8.57559 4.33887 8.42066C4.39051 8.26573 4.50159 8.13765 4.64766 8.06462L5.87843 7.44923C5.97229 7.40227 6.0766 7.38008 6.18144 7.3848C6.28629 7.38951 6.38818 7.42095 6.47745 7.47615C6.56671 7.53134 6.64038 7.60845 6.69145 7.70013C6.74251 7.79182 6.76928 7.89505 6.7692 8ZM11.32 10.3423L9.84612 12.3077H11.0769C11.2401 12.3077 11.3966 12.3725 11.512 12.4879C11.6274 12.6033 11.6923 12.7599 11.6923 12.9231C11.6923 13.0863 11.6274 13.2428 11.512 13.3582C11.3966 13.4736 11.2401 13.5385 11.0769 13.5385H8.61536C8.50107 13.5385 8.38904 13.5066 8.29183 13.4466C8.19461 13.3865 8.11605 13.3005 8.06494 13.1983C8.01383 13.0961 7.99219 12.9816 8.00246 12.8678C8.01272 12.754 8.05448 12.6453 8.12305 12.5538L10.3369 9.60231C10.3873 9.53527 10.4234 9.45865 10.4431 9.37715C10.4627 9.29565 10.4656 9.21098 10.4513 9.12836C10.4371 9.04573 10.4062 8.96687 10.3604 8.89664C10.3146 8.8264 10.2549 8.76626 10.1851 8.71991C10.1152 8.67356 10.0366 8.64198 9.95408 8.6271C9.87156 8.61222 9.78688 8.61436 9.70523 8.63338C9.62357 8.6524 9.54666 8.68791 9.47922 8.73773C9.41178 8.78755 9.35524 8.85062 9.31305 8.92308C9.27383 8.99529 9.22055 9.05893 9.15635 9.11022C9.09214 9.16151 9.01831 9.19942 8.93922 9.22172C8.86012 9.24401 8.77736 9.25024 8.69582 9.24004C8.61428 9.22983 8.53561 9.2034 8.46445 9.16229C8.39329 9.12119 8.33109 9.06625 8.2815 9.00072C8.23192 8.93519 8.19597 8.86038 8.17576 8.78073C8.15555 8.70108 8.15151 8.61818 8.16386 8.53694C8.17621 8.45569 8.2047 8.37774 8.24766 8.30769C8.45094 7.95591 8.76459 7.68102 9.13998 7.52562C9.51538 7.37021 9.93155 7.34298 10.324 7.44815C10.7164 7.55331 11.0632 7.785 11.3106 8.10729C11.558 8.42958 11.6921 8.82448 11.6923 9.23077C11.6936 9.63211 11.5627 10.0227 11.32 10.3423Z"/>
</svg>
`, ri = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7867 4.87812L8.51454 12.1503C8.447 12.2179 8.36679 12.2716 8.27851 12.3082C8.19023 12.3448 8.0956 12.3636 8.00003 12.3636C7.90446 12.3636 7.80983 12.3448 7.72155 12.3082C7.63327 12.2716 7.55306 12.2179 7.48552 12.1503L0.213345 4.87812C0.111526 4.77642 0.0421733 4.64679 0.014066 4.50565C-0.0140413 4.36451 0.000361008 4.2182 0.0554496 4.08525C0.110538 3.95229 0.203836 3.83868 0.323531 3.75878C0.443227 3.67888 0.583938 3.63629 0.727852 3.6364L15.2722 3.6364C15.4161 3.63629 15.5568 3.67888 15.6765 3.75878C15.7962 3.83868 15.8895 3.95229 15.9446 4.08525C15.9997 4.2182 16.0141 4.36451 15.986 4.50565C15.9579 4.64679 15.8885 4.77642 15.7867 4.87812Z"/>
</svg>
`, Mr = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9978 5.87895 15.1542 3.84542 13.6544 2.34562C12.1546 0.845814 10.121 0.00223986 8 0ZM11.5123 6.58923L7.20462 10.8969C7.14746 10.9541 7.07959 10.9995 7.00489 11.0305C6.93018 11.0615 6.8501 11.0774 6.76923 11.0774C6.68836 11.0774 6.60828 11.0615 6.53358 11.0305C6.45887 10.9995 6.391 10.9541 6.33385 10.8969L4.48769 9.05077C4.37222 8.9353 4.30735 8.77868 4.30735 8.61538C4.30735 8.45208 4.37222 8.29547 4.48769 8.18C4.60317 8.06453 4.75978 7.99966 4.92308 7.99966C5.08638 7.99966 5.24299 8.06453 5.35846 8.18L6.76923 9.59154L10.6415 5.71846C10.6987 5.66128 10.7666 5.61593 10.8413 5.58499C10.916 5.55404 10.9961 5.53812 11.0769 5.53812C11.1578 5.53812 11.2378 5.55404 11.3126 5.58499C11.3873 5.61593 11.4551 5.66128 11.5123 5.71846C11.5695 5.77564 11.6148 5.84351 11.6458 5.91822C11.6767 5.99292 11.6927 6.07299 11.6927 6.15384C11.6927 6.2347 11.6767 6.31477 11.6458 6.38947C11.6148 6.46418 11.5695 6.53205 11.5123 6.58923Z"/>
</svg>
`, Ci = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8125 3.33285L5.57291 13.5724C5.51347 13.6319 5.44289 13.6791 5.3652 13.7113C5.28751 13.7435 5.20423 13.7601 5.12013 13.7601C5.03603 13.7601 4.95275 13.7435 4.87506 13.7113C4.79737 13.6791 4.72678 13.6319 4.66735 13.5724L0.187547 9.0926C0.0674628 8.97251 0 8.80964 0 8.63982C0 8.46999 0.0674628 8.30712 0.187547 8.18704C0.307632 8.06695 0.470502 7.99949 0.640327 7.99949C0.810153 7.99949 0.973022 8.06695 1.09311 8.18704L5.12013 12.2149L14.9069 2.42729C15.027 2.30721 15.1898 2.23975 15.3597 2.23975C15.5295 2.23975 15.6924 2.30721 15.8125 2.42729C15.9325 2.54738 16 2.71025 16 2.88007C16 3.0499 15.9325 3.21277 15.8125 3.33285Z"/>
</svg>
`, Ss = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7656 14.6336C15.8399 14.708 15.8988 14.7962 15.9391 14.8933C15.9793 14.9904 16 15.0945 16 15.1996C16 15.3047 15.9793 15.4088 15.9391 15.5059C15.8988 15.603 15.8399 15.6912 15.7656 15.7656C15.6912 15.8399 15.603 15.8988 15.5059 15.9391C15.4088 15.9793 15.3047 16 15.1996 16C15.0945 16 14.9904 15.9793 14.8933 15.9391C14.7962 15.8988 14.708 15.8399 14.6336 15.7656L8 9.13094L1.36637 15.7656C1.21626 15.9157 1.01268 16 0.8004 16C0.588121 16 0.384536 15.9157 0.234432 15.7656C0.0843276 15.6155 4.18453e-09 15.4119 0 15.1996C-4.18453e-09 14.9873 0.0843276 14.7837 0.234432 14.6336L6.86906 8L0.234432 1.36637C0.0843276 1.21626 0 1.01268 0 0.8004C0 0.588121 0.0843276 0.384536 0.234432 0.234432C0.384536 0.0843276 0.588121 0 0.8004 0C1.01268 0 1.21626 0.0843276 1.36637 0.234432L8 6.86906L14.6336 0.234432C14.7837 0.0843276 14.9873 -4.18453e-09 15.1996 0C15.4119 4.18453e-09 15.6155 0.0843276 15.7656 0.234432C15.9157 0.384536 16 0.588121 16 0.8004C16 1.01268 15.9157 1.21626 15.7656 1.36637L9.13094 8L15.7656 14.6336Z"/>
</svg>
`, E8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M4.195 7.13833C4.10166 7.0451 4.03808 6.92626 4.01231 6.79687C3.98655 6.66748 3.99975 6.53336 4.05025 6.41147C4.10075 6.28959 4.18628 6.18543 4.29601 6.11219C4.40574 6.03894 4.53474 5.9999 4.66667 6H7.33333V0.666667C7.33333 0.489856 7.40357 0.320287 7.5286 0.195262C7.65362 0.070238 7.82319 0 8 0C8.17681 0 8.34638 0.070238 8.47141 0.195262C8.59643 0.320287 8.66667 0.489856 8.66667 0.666667V6H11.3333C11.4653 5.9999 11.5943 6.03894 11.704 6.11219C11.8137 6.18543 11.8992 6.28959 11.9497 6.41147C12.0002 6.53336 12.0135 6.66748 11.9877 6.79687C11.9619 6.92626 11.8983 7.0451 11.805 7.13833L8.47167 10.4717C8.40975 10.5337 8.33623 10.5828 8.25529 10.6164C8.17436 10.6499 8.08761 10.6672 8 10.6672C7.91239 10.6672 7.82564 10.6499 7.74471 10.6164C7.66377 10.5828 7.59025 10.5337 7.52833 10.4717L4.195 7.13833ZM15.3333 9.33333C15.1565 9.33333 14.987 9.40357 14.8619 9.52859C14.7369 9.65362 14.6667 9.82319 14.6667 10V14.6667H1.33333V10C1.33333 9.82319 1.2631 9.65362 1.13807 9.52859C1.01305 9.40357 0.843478 9.33333 0.666667 9.33333C0.489856 9.33333 0.320287 9.40357 0.195262 9.52859C0.070238 9.65362 0 9.82319 0 10V14.6667C0 15.0203 0.140476 15.3594 0.390524 15.6095C0.640573 15.8595 0.979711 16 1.33333 16H14.6667C15.0203 16 15.3594 15.8595 15.6095 15.6095C15.8595 15.3594 16 15.0203 16 14.6667V10C16 9.82319 15.9298 9.65362 15.8047 9.52859C15.6797 9.40357 15.5101 9.33333 15.3333 9.33333Z"/>
</svg>
`, D8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6243 3.95007L12.05 0.374994C11.9311 0.256108 11.79 0.161801 11.6347 0.0974588C11.4794 0.0331167 11.3129 0 11.1448 0C10.9767 0 10.8103 0.0331167 10.6549 0.0974588C10.4996 0.161801 10.3585 0.256108 10.2397 0.374994L0.375194 10.2403C0.255821 10.3587 0.16118 10.4997 0.0967705 10.655C0.0323612 10.8103 -0.000530733 10.9769 6.47574e-06 11.145V14.7201C6.47574e-06 15.0596 0.134859 15.3851 0.374897 15.6252C0.614935 15.8652 0.940497 16.0001 1.27996 16.0001H4.85504C5.02319 16.0006 5.18977 15.9677 5.34509 15.9033C5.50041 15.8389 5.64139 15.7442 5.75981 15.6249L15.6243 5.76041C15.7432 5.64155 15.8375 5.50044 15.9018 5.34513C15.9662 5.18982 15.9993 5.02335 15.9993 4.85524C15.9993 4.68713 15.9662 4.52067 15.9018 4.36535C15.8375 4.21004 15.7432 4.06893 15.6243 3.95007ZM4.85504 14.7201H1.27996V11.145L8.31972 4.10527L11.8948 7.68034L4.85504 14.7201ZM12.7996 6.77478L9.22449 3.2005L11.1444 1.28056L14.7195 4.85484L12.7996 6.77478Z"/>
</svg>
`, O8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0741 7.99998C10.0741 8.41019 9.95243 8.81119 9.72453 9.15227C9.49663 9.49335 9.1727 9.75919 8.79371 9.91617C8.41473 10.0732 7.9977 10.1142 7.59537 10.0342C7.19304 9.95417 6.82347 9.75663 6.53341 9.46657C6.24334 9.1765 6.04581 8.80694 5.96578 8.40461C5.88575 8.00228 5.92682 7.58525 6.08381 7.20626C6.24079 6.82728 6.50663 6.50335 6.84771 6.27545C7.18879 6.04755 7.58979 5.9259 8 5.9259C8.55008 5.9259 9.07763 6.14442 9.46659 6.53339C9.85556 6.92235 10.0741 7.4499 10.0741 7.99998ZM2.07407 5.9259C1.66386 5.9259 1.26286 6.04755 0.921781 6.27545C0.580702 6.50335 0.314862 6.82728 0.15788 7.20626C0.000898661 7.58525 -0.0401749 8.00228 0.0398537 8.40461C0.119882 8.80694 0.317419 9.1765 0.607483 9.46657C0.897548 9.75663 1.26711 9.95417 1.66944 10.0342C2.07177 10.1142 2.4888 10.0732 2.86779 9.91617C3.24678 9.75919 3.5707 9.49335 3.7986 9.15227C4.02651 8.81119 4.14815 8.41019 4.14815 7.99998C4.14815 7.4499 3.92963 6.92235 3.54067 6.53339C3.1517 6.14442 2.62415 5.9259 2.07407 5.9259ZM13.9259 5.9259C13.5157 5.9259 13.1147 6.04755 12.7736 6.27545C12.4326 6.50335 12.1667 6.82728 12.0097 7.20626C11.8527 7.58525 11.8117 8.00228 11.8917 8.40461C11.9717 8.80694 12.1693 9.1765 12.4593 9.46657C12.7494 9.75663 13.119 9.95417 13.5213 10.0342C13.9236 10.1142 14.3407 10.0732 14.7196 9.91617C15.0986 9.75919 15.4226 9.49335 15.6505 9.15227C15.8784 8.81119 16 8.41019 16 7.99998C16 7.72761 15.9464 7.4579 15.8421 7.20626C15.7379 6.95463 15.5851 6.72598 15.3925 6.53339C15.1999 6.34079 14.9713 6.18801 14.7196 6.08378C14.468 5.97955 14.1983 5.9259 13.9259 5.9259Z"/>
</svg>
`, H8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3846 1.84619H0.615385C0.452174 1.84619 0.295649 1.91103 0.180242 2.02643C0.064835 2.14184 0 2.29837 0 2.46158V12.9231C0 13.2495 0.12967 13.5626 0.360484 13.7934C0.591298 14.0242 0.904349 14.1539 1.23077 14.1539H14.7692C15.0957 14.1539 15.4087 14.0242 15.6395 13.7934C15.8703 13.5626 16 13.2495 16 12.9231V2.46158C16 2.29837 15.9352 2.14184 15.8198 2.02643C15.7044 1.91103 15.5478 1.84619 15.3846 1.84619ZM5.74692 8.00004L1.23077 12.1393V3.86081L5.74692 8.00004ZM6.65769 8.83465L7.58077 9.68465C7.6943 9.78887 7.84281 9.8467 7.99692 9.8467C8.15104 9.8467 8.29954 9.78887 8.41308 9.68465L9.33615 8.83465L13.7977 12.9231H2.19769L6.65769 8.83465ZM10.2531 8.00004L14.7692 3.86004V12.14L10.2531 8.00004Z"/>
</svg>
`, I8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3846 1.84619H0.615385C0.452174 1.84619 0.295649 1.91103 0.180242 2.02643C0.064835 2.14184 0 2.29837 0 2.46158V12.9231C0 13.2495 0.12967 13.5626 0.360484 13.7934C0.591298 14.0242 0.904349 14.1539 1.23077 14.1539H14.7692C15.0957 14.1539 15.4087 14.0242 15.6395 13.7934C15.8703 13.5626 16 13.2495 16 12.9231V2.46158C16 2.29837 15.9352 2.14184 15.8198 2.02643C15.7044 1.91103 15.5478 1.84619 15.3846 1.84619ZM8 8.39619L2.19769 3.07696H13.8023L8 8.39619ZM5.74692 8.00004L1.23077 12.1393V3.86081L5.74692 8.00004ZM6.65769 8.83465L7.58077 9.68465C7.6943 9.78887 7.84281 9.8467 7.99692 9.8467C8.15104 9.8467 8.29954 9.78887 8.41308 9.68465L9.33615 8.83465L13.7977 12.9231H2.19769L6.65769 8.83465ZM10.2531 8.00004L14.7692 3.86004V12.14L10.2531 8.00004Z"/>
</svg>
`, Nn = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9978 5.87895 15.1542 3.84542 13.6544 2.34562C12.1546 0.845814 10.121 0.00223986 8 0ZM8 14.7692C6.66117 14.7692 5.35241 14.3722 4.23922 13.6284C3.12603 12.8846 2.2584 11.8274 1.74605 10.5905C1.2337 9.35356 1.09965 7.99249 1.36084 6.67939C1.62203 5.36629 2.26674 4.16012 3.21343 3.21343C4.16013 2.26674 5.36629 1.62203 6.67939 1.36084C7.99249 1.09965 9.35356 1.2337 10.5905 1.74605C11.8274 2.25839 12.8846 3.12602 13.6284 4.23922C14.3722 5.35241 14.7692 6.66117 14.7692 8C14.7672 9.79468 14.0534 11.5153 12.7843 12.7843C11.5153 14.0534 9.79469 14.7672 8 14.7692ZM7.38462 8.61538V4.30769C7.38462 4.14448 7.44945 3.98796 7.56486 3.87255C7.68027 3.75714 7.83679 3.69231 8 3.69231C8.16321 3.69231 8.31974 3.75714 8.43514 3.87255C8.55055 3.98796 8.61539 4.14448 8.61539 4.30769V8.61538C8.61539 8.77859 8.55055 8.93512 8.43514 9.05053C8.31974 9.16593 8.16321 9.23077 8 9.23077C7.83679 9.23077 7.68027 9.16593 7.56486 9.05053C7.44945 8.93512 7.38462 8.77859 7.38462 8.61538ZM8.92308 11.3846C8.92308 11.5672 8.86894 11.7456 8.76751 11.8974C8.66608 12.0492 8.52192 12.1676 8.35325 12.2374C8.18458 12.3073 7.99898 12.3256 7.81992 12.29C7.64086 12.2543 7.47638 12.1664 7.34729 12.0373C7.21819 11.9082 7.13028 11.7438 7.09466 11.5647C7.05904 11.3856 7.07732 11.2 7.14719 11.0314C7.21706 10.8627 7.33537 10.7185 7.48717 10.6171C7.63897 10.5157 7.81743 10.4615 8 10.4615C8.24482 10.4615 8.4796 10.5588 8.65271 10.7319C8.82583 10.905 8.92308 11.1398 8.92308 11.3846Z"/>
</svg>
`, B8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M16 6C16 6.17681 15.9298 6.34638 15.8047 6.4714C15.6797 6.59643 15.5101 6.66667 15.3333 6.66667C15.1565 6.66667 14.987 6.59643 14.8619 6.4714C14.7369 6.34638 14.6667 6.17681 14.6667 6V2.27667L9.13917 7.805C9.01407 7.93009 8.84441 8.00037 8.6675 8.00037C8.49059 8.00037 8.32093 7.93009 8.19583 7.805C8.07074 7.67991 8.00046 7.51024 8.00046 7.33333C8.00046 7.15642 8.07074 6.98676 8.19583 6.86167L13.7233 1.33333H10C9.82319 1.33333 9.65362 1.2631 9.52859 1.13807C9.40357 1.01305 9.33333 0.843478 9.33333 0.666667C9.33333 0.489856 9.40357 0.320287 9.52859 0.195262C9.65362 0.070238 9.82319 0 10 0H15.3333C15.5101 0 15.6797 0.070238 15.8047 0.195262C15.9298 0.320287 16 0.489856 16 0.666667V6ZM12.6667 8C12.4899 8 12.3203 8.07024 12.1953 8.19526C12.0702 8.32029 12 8.48986 12 8.66667V14.6667H1.33333V4H7.33333C7.51014 4 7.67971 3.92976 7.80474 3.80474C7.92976 3.67971 8 3.51014 8 3.33333C8 3.15652 7.92976 2.98695 7.80474 2.86193C7.67971 2.7369 7.51014 2.66667 7.33333 2.66667H1.33333C0.979711 2.66667 0.640573 2.80714 0.390524 3.05719C0.140476 3.30724 0 3.64638 0 4V14.6667C0 15.0203 0.140476 15.3594 0.390524 15.6095C0.640573 15.8595 0.979711 16 1.33333 16H12C12.3536 16 12.6928 15.8595 12.9428 15.6095C13.1929 15.3594 13.3333 15.0203 13.3333 14.6667V8.66667C13.3333 8.48986 13.2631 8.32029 13.1381 8.19526C13.013 8.07024 12.8435 8 12.6667 8Z"/>
</svg>
`, V8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M14.7985 1.20265C14.0284 0.432604 12.984 0 11.895 0C10.8059 0 9.76152 0.432604 8.99146 1.20265L1.16604 9.0273C0.412088 9.80065 -0.0068122 10.8399 8.3812e-05 11.9199C0.00697982 13 0.439117 14.0338 1.20288 14.7975C1.96664 15.5611 3.00052 15.9931 4.08055 15.9999C5.16058 16.0066 6.19979 15.5876 6.97304 14.8335L14.7992 7.00888C15.568 6.23824 15.9997 5.19412 15.9995 4.1056C15.9994 3.01708 15.5674 1.97308 14.7985 1.20265ZM6.10106 13.9616C5.56237 14.5003 4.83171 14.8031 4.06981 14.8031C3.30791 14.8032 2.57719 14.5006 2.0384 13.9619C1.4996 13.4232 1.19687 12.6926 1.1968 11.9307C1.19673 11.1688 1.49932 10.4381 2.03801 9.89927L5.51435 6.42293L9.5774 10.4852L6.10106 13.9616ZM13.9265 6.1369L10.4486 9.61324L6.38709 5.55096L9.8642 2.07462C10.405 1.54629 11.1323 1.25247 11.8884 1.25688C12.6444 1.2613 13.3683 1.5636 13.9029 2.09822C14.4375 2.63284 14.7398 3.35666 14.7442 4.11271C14.7486 4.86876 14.4548 5.59607 13.9265 6.1369ZM12.7369 4.4978C12.7942 4.55509 12.8397 4.62311 12.8707 4.69799C12.9018 4.77286 12.9178 4.85312 12.9178 4.93418C12.9178 5.01523 12.9018 5.09549 12.8707 5.17037C12.8397 5.24524 12.7942 5.31327 12.7369 5.37055L10.8865 7.2209C10.8292 7.27815 10.7612 7.32356 10.6863 7.35452C10.6115 7.38549 10.5313 7.40141 10.4503 7.40137C10.3693 7.40134 10.289 7.38535 10.2142 7.35432C10.1394 7.32328 10.0714 7.27782 10.0142 7.22051C9.9569 7.1632 9.9115 7.09518 9.88053 7.02033C9.84956 6.94548 9.83364 6.86526 9.83368 6.78425C9.83371 6.70324 9.84971 6.62304 9.88074 6.54821C9.91177 6.47339 9.95724 6.4054 10.0145 6.34815L11.8649 4.4978C11.9805 4.38222 12.1374 4.3173 12.3009 4.3173C12.4644 4.3173 12.6212 4.38222 12.7369 4.4978Z"/>
</svg>
`, Xc = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9978 5.87895 15.1542 3.84542 13.6544 2.34562C12.1546 0.845814 10.121 0.00223986 8 0ZM5.97154 11.0769H10.0285C9.61539 12.4877 8.92308 13.7592 8 14.7608C7.07692 13.7592 6.38462 12.4877 5.97154 11.0769ZM5.69231 9.84615C5.48821 8.62384 5.48821 7.37615 5.69231 6.15384H10.3077C10.5118 7.37615 10.5118 8.62384 10.3077 9.84615H5.69231ZM1.23077 8C1.23024 7.37572 1.31645 6.75439 1.48693 6.15384H4.44539C4.2618 7.37777 4.2618 8.62223 4.44539 9.84615H1.48693C1.31645 9.2456 1.23024 8.62428 1.23077 8ZM10.0285 4.92308H5.97154C6.38462 3.51231 7.07692 2.24077 8 1.23923C8.92308 2.24077 9.61539 3.51231 10.0285 4.92308ZM11.5546 6.15384H14.5131C14.8546 7.36092 14.8546 8.63908 14.5131 9.84615H11.5546C11.7382 8.62223 11.7382 7.37777 11.5546 6.15384ZM14.0285 4.92308H11.3031C10.989 3.68732 10.4616 2.51588 9.74462 1.46154C10.6607 1.70771 11.515 2.14286 12.2528 2.73902C12.9906 3.33518 13.5954 4.07915 14.0285 4.92308ZM6.25539 1.46154C5.53838 2.51588 5.01097 3.68732 4.69693 4.92308H1.97154C2.40456 4.07915 3.00941 3.33518 3.74719 2.73902C4.48497 2.14286 5.33935 1.70771 6.25539 1.46154ZM1.97154 11.0769H4.69693C5.01097 12.3127 5.53838 13.4841 6.25539 14.5385C5.33935 14.2923 4.48497 13.8571 3.74719 13.261C3.00941 12.6648 2.40456 11.9208 1.97154 11.0769ZM9.74462 14.5385C10.4616 13.4841 10.989 12.3127 11.3031 11.0769H14.0285C13.5954 11.9208 12.9906 12.6648 12.2528 13.261C11.515 13.8571 10.6607 14.2923 9.74462 14.5385Z"/>
</svg>
`, N8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.3525 9.13707C15.1781 9.00269 14.9782 8.9052 14.765 8.85054C14.5517 8.79588 14.3296 8.78519 14.1121 8.81913C15.3639 7.55536 15.9971 6.29893 15.9971 5.06715C15.9971 3.30281 14.578 1.86774 12.8336 1.86774C12.3708 1.86483 11.9129 1.96327 11.4922 2.15614C11.0714 2.34902 10.698 2.63165 10.3981 2.9842C10.0982 2.63165 9.72476 2.34902 9.30401 2.15614C8.88325 1.96327 8.42538 1.86483 7.96254 1.86774C6.21819 1.86774 4.79912 3.30281 4.79912 5.06715C4.79912 5.80035 5.01508 6.51289 5.46966 7.26675C5.09736 7.36107 4.75759 7.55457 4.48651 7.82665L2.97879 9.33304H1.06647C0.783625 9.33304 0.512364 9.4454 0.312362 9.6454C0.11236 9.8454 0 10.1167 0 10.3995L0 13.0657C0 13.3485 0.11236 13.6198 0.312362 13.8198C0.512364 14.0198 0.783625 14.1322 1.06647 14.1322H7.99853C8.04213 14.1322 8.08557 14.1268 8.12784 14.1162L12.3937 13.0497C12.4209 13.0432 12.4475 13.0343 12.473 13.023L15.0639 11.9206L15.0932 11.9072C15.3422 11.7828 15.5555 11.597 15.7128 11.3674C15.8702 11.1378 15.9665 10.8719 15.9927 10.5948C16.0189 10.3177 15.9741 10.0385 15.8626 9.78344C15.7511 9.52841 15.5764 9.30597 15.3552 9.13707H15.3525ZM7.96254 2.93421C8.37554 2.92817 8.78096 3.04544 9.12695 3.27104C9.47294 3.49663 9.74379 3.8203 9.90485 4.20064C9.94503 4.29845 10.0134 4.3821 10.1012 4.44097C10.189 4.49984 10.2924 4.53127 10.3981 4.53127C10.5038 4.53127 10.6072 4.49984 10.695 4.44097C10.7828 4.3821 10.8512 4.29845 10.8913 4.20064C11.0524 3.8203 11.3232 3.49663 11.6692 3.27104C12.0152 3.04544 12.4206 2.92817 12.8336 2.93421C13.9701 2.93421 14.9306 3.9107 14.9306 5.06715C14.9306 6.36758 13.8781 7.83864 11.8872 9.32637L11.148 9.49634C11.2128 9.22225 11.2148 8.93703 11.1538 8.66206C11.0928 8.38709 10.9703 8.12949 10.7956 7.90858C10.6208 7.68768 10.3984 7.50918 10.1448 7.38649C9.8913 7.26379 9.61329 7.20006 9.33162 7.20009H6.71077C6.13554 6.42424 5.86559 5.74169 5.86559 5.06715C5.86559 3.9107 6.82608 2.93421 7.96254 2.93421ZM1.06647 10.3995H2.66618V13.0657H1.06647V10.3995ZM14.626 10.9467L12.0931 12.0252L7.93188 13.0657H3.73265V10.0869L5.24104 8.57917C5.33971 8.47971 5.45717 8.40086 5.58659 8.34719C5.716 8.29352 5.8548 8.26612 5.9949 8.26657H9.33162C9.54376 8.26657 9.7472 8.35084 9.8972 8.50084C10.0472 8.65084 10.1315 8.85428 10.1315 9.06642C10.1315 9.27855 10.0472 9.482 9.8972 9.632C9.7472 9.782 9.54376 9.86627 9.33162 9.86627H7.4653C7.32388 9.86627 7.18825 9.92245 7.08824 10.0225C6.98824 10.1225 6.93206 10.2581 6.93206 10.3995C6.93206 10.5409 6.98824 10.6766 7.08824 10.7766C7.18825 10.8766 7.32388 10.9327 7.4653 10.9327H9.59824C9.63838 10.9326 9.67838 10.9282 9.71755 10.9194L14.1834 9.89227L14.2041 9.88694C14.3404 9.84909 14.4859 9.863 14.6126 9.92598C14.7393 9.98897 14.8382 10.0966 14.8903 10.2281C14.9424 10.3597 14.9441 10.5058 14.8949 10.6385C14.8457 10.7711 14.7492 10.8809 14.624 10.9467H14.626Z"/>
</svg>
`, H1 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8.92308 12C8.92308 12.1826 8.86894 12.361 8.76751 12.5128C8.66608 12.6646 8.52192 12.7829 8.35325 12.8528C8.18458 12.9227 7.99898 12.941 7.81992 12.9053C7.64086 12.8697 7.47638 12.7818 7.34729 12.6527C7.21819 12.5236 7.13028 12.3591 7.09466 12.1801C7.05904 12.001 7.07732 11.8154 7.14719 11.6468C7.21706 11.4781 7.33537 11.3339 7.48717 11.2325C7.63897 11.1311 7.81743 11.0769 8 11.0769C8.24482 11.0769 8.4796 11.1742 8.65271 11.3473C8.82583 11.5204 8.92308 11.7552 8.92308 12ZM8 3.69231C6.30308 3.69231 4.92308 4.93461 4.92308 6.46154V6.76923C4.92308 6.93244 4.98791 7.08896 5.10332 7.20437C5.21873 7.31978 5.37525 7.38461 5.53846 7.38461C5.70167 7.38461 5.8582 7.31978 5.97361 7.20437C6.08901 7.08896 6.15385 6.93244 6.15385 6.76923V6.46154C6.15385 5.61538 6.98231 4.92308 8 4.92308C9.01769 4.92308 9.84616 5.61538 9.84616 6.46154C9.84616 7.30769 9.01769 8 8 8C7.83679 8 7.68027 8.06483 7.56486 8.18024C7.44945 8.29565 7.38462 8.45217 7.38462 8.61538V9.23077C7.38462 9.39398 7.44945 9.5505 7.56486 9.66591C7.68027 9.78132 7.83679 9.84615 8 9.84615C8.16321 9.84615 8.31974 9.78132 8.43514 9.66591C8.55055 9.5505 8.61539 9.39398 8.61539 9.23077V9.17538C10.0185 8.91769 11.0769 7.79846 11.0769 6.46154C11.0769 4.93461 9.69692 3.69231 8 3.69231ZM16 8C16 9.58225 15.5308 11.129 14.6518 12.4446C13.7727 13.7602 12.5233 14.7855 11.0615 15.391C9.59966 15.9965 7.99113 16.155 6.43928 15.8463C4.88743 15.5376 3.46197 14.7757 2.34315 13.6569C1.22433 12.538 0.462403 11.1126 0.153721 9.56072C-0.15496 8.00887 0.00346628 6.40034 0.608967 4.93853C1.21447 3.47672 2.23985 2.22729 3.55544 1.34824C4.87103 0.469192 6.41775 0 8 0C10.121 0.00223986 12.1546 0.845814 13.6544 2.34562C15.1542 3.84542 15.9978 5.87895 16 8ZM14.7692 8C14.7692 6.66117 14.3722 5.35241 13.6284 4.23922C12.8846 3.12602 11.8274 2.25839 10.5905 1.74605C9.35356 1.2337 7.99249 1.09965 6.67939 1.36084C5.36629 1.62203 4.16013 2.26674 3.21343 3.21343C2.26674 4.16012 1.62203 5.36629 1.36084 6.67939C1.09965 7.99249 1.2337 9.35356 1.74605 10.5905C2.2584 11.8274 3.12603 12.8846 4.23922 13.6284C5.35241 14.3722 6.66117 14.7692 8 14.7692C9.79469 14.7672 11.5153 14.0534 12.7843 12.7843C14.0534 11.5153 14.7672 9.79468 14.7692 8Z"/>
</svg>
`, Lr = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9978 5.87895 15.1542 3.84542 13.6544 2.34562C12.1546 0.845814 10.121 0.00223986 8 0ZM7.69231 3.69231C7.87488 3.69231 8.05334 3.74644 8.20514 3.84787C8.35694 3.9493 8.47526 4.09347 8.54512 4.26214C8.61499 4.43081 8.63327 4.61641 8.59765 4.79547C8.56203 4.97453 8.47412 5.139 8.34502 5.2681C8.21593 5.39719 8.05145 5.48511 7.87239 5.52072C7.69333 5.55634 7.50773 5.53806 7.33906 5.46819C7.17039 5.39833 7.02623 5.28002 6.9248 5.12822C6.82337 4.97642 6.76923 4.79795 6.76923 4.61538C6.76923 4.37057 6.86649 4.13578 7.0396 3.96267C7.21271 3.78956 7.44749 3.69231 7.69231 3.69231ZM8.61539 12.3077C8.28897 12.3077 7.97591 12.178 7.7451 11.9472C7.51429 11.7164 7.38462 11.4033 7.38462 11.0769V8C7.22141 8 7.06488 7.93516 6.94947 7.81976C6.83407 7.70435 6.76923 7.54782 6.76923 7.38461C6.76923 7.2214 6.83407 7.06488 6.94947 6.94947C7.06488 6.83406 7.22141 6.76923 7.38462 6.76923C7.71104 6.76923 8.02409 6.8989 8.2549 7.12971C8.48572 7.36053 8.61539 7.67358 8.61539 8V11.0769C8.7786 11.0769 8.93512 11.1418 9.05053 11.2572C9.16594 11.3726 9.23077 11.5291 9.23077 11.6923C9.23077 11.8555 9.16594 12.012 9.05053 12.1274C8.93512 12.2429 8.7786 12.3077 8.61539 12.3077Z"/>
</svg>
`, R8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4282 15.4286C11.4282 15.5802 11.368 15.7255 11.2609 15.8327C11.1537 15.9398 11.0084 16 10.8569 16H5.14324C4.9917 16 4.84638 15.9398 4.73922 15.8327C4.63207 15.7255 4.57188 15.5802 4.57188 15.4286C4.57188 15.2771 4.63207 15.1318 4.73922 15.0246C4.84638 14.9175 4.9917 14.8573 5.14324 14.8573H10.8569C11.0084 14.8573 11.1537 14.9175 11.2609 15.0246C11.368 15.1318 11.4282 15.2771 11.4282 15.4286ZM14.2851 6.28682C14.2875 7.23931 14.0723 8.17978 13.656 9.03644C13.2396 9.89311 12.633 10.6433 11.8825 11.2298C11.7421 11.3374 11.6283 11.4756 11.5495 11.6339C11.4708 11.7923 11.4293 11.9665 11.4282 12.1433V12.5718C11.4282 12.8749 11.3078 13.1655 11.0935 13.3798C10.8792 13.5942 10.5886 13.7145 10.2855 13.7145H5.7146C5.41153 13.7145 5.12088 13.5942 4.90657 13.3798C4.69227 13.1655 4.57188 12.8749 4.57188 12.5718V12.1433C4.57176 11.9686 4.53159 11.7963 4.45445 11.6395C4.37732 11.4828 4.26527 11.3458 4.12693 11.2391C3.3783 10.6561 2.77211 9.91037 2.35426 9.05844C1.9364 8.20652 1.71782 7.2707 1.71506 6.32182C1.69649 2.91792 4.4476 0.0832435 7.84865 0.00182421C8.68666 -0.0183701 9.52024 0.129276 10.3003 0.436073C11.0804 0.74287 11.7913 1.20262 12.391 1.78826C12.9908 2.3739 13.4673 3.07359 13.7926 3.84616C14.1179 4.61873 14.2853 5.44857 14.2851 6.28682ZM13.1423 6.28682C13.1425 5.60094 13.0055 4.92196 12.7394 4.28983C12.4732 3.6577 12.0833 3.0852 11.5925 2.60604C11.1018 2.12687 10.5201 1.75072 9.88183 1.49973C9.24353 1.24874 8.56146 1.12798 7.87579 1.14455C5.09039 1.21026 2.84279 3.52928 2.85779 6.31468C2.8604 7.09072 3.03948 7.85601 3.38148 8.55263C3.72348 9.24926 4.21945 9.85897 4.83185 10.3356C5.10713 10.5496 5.3298 10.8238 5.48281 11.1371C5.63582 11.4504 5.7151 11.7946 5.7146 12.1433V12.5718H10.2855V12.1433C10.2863 11.7936 10.3669 11.4487 10.5213 11.135C10.6756 10.8212 10.8996 10.5468 11.1761 10.3328C11.7904 9.85272 12.2869 9.23865 12.6276 8.53744C12.9684 7.83624 13.1444 7.06644 13.1423 6.28682ZM11.9917 5.61976C11.8436 4.7922 11.4454 4.02991 10.8509 3.4355C10.2564 2.8411 9.49399 2.44311 8.66641 2.29513C8.59241 2.28266 8.51667 2.28488 8.44353 2.30168C8.37039 2.31847 8.30127 2.34951 8.24013 2.39301C8.17898 2.43652 8.127 2.49164 8.08716 2.55524C8.04731 2.61883 8.02039 2.68965 8.00791 2.76365C7.99544 2.83765 7.99766 2.91339 8.01446 2.98653C8.03125 3.05967 8.06229 3.12879 8.10579 3.18993C8.1493 3.25108 8.20442 3.30306 8.26802 3.3429C8.33161 3.38275 8.40243 3.40967 8.47643 3.42215C9.65987 3.62141 10.664 4.62558 10.8647 5.81116C10.8873 5.94423 10.9563 6.065 11.0595 6.15207C11.1626 6.23914 11.2933 6.28687 11.4282 6.28682C11.4605 6.28663 11.4928 6.284 11.5247 6.27897C11.674 6.25347 11.8071 6.1697 11.8947 6.04608C11.9823 5.92246 12.0172 5.76911 11.9917 5.61976Z"/>
</svg>
`, z8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00001 0C6.3335 0.00189054 4.73579 0.664747 3.55738 1.84315C2.37898 3.02155 1.71612 4.61927 1.71423 6.28578C1.71423 11.6644 7.42858 15.7266 7.67215 15.8966C7.76823 15.9639 7.8827 16 8.00001 16C8.11732 16 8.23179 15.9639 8.32787 15.8966C8.57144 15.7266 14.2858 11.6644 14.2858 6.28578C14.2839 4.61927 13.621 3.02155 12.4426 1.84315C11.2642 0.664747 9.66652 0.00189054 8.00001 0ZM8.00001 4.00004C8.45209 4.00004 8.89401 4.1341 9.2699 4.38526C9.64578 4.63642 9.93875 4.9934 10.1118 5.41106C10.2848 5.82873 10.33 6.28831 10.2418 6.7317C10.1536 7.17509 9.93594 7.58237 9.61627 7.90204C9.2966 8.2217 8.88933 8.4394 8.44594 8.5276C8.00255 8.61579 7.54296 8.57053 7.1253 8.39752C6.70763 8.22452 6.35065 7.93155 6.09949 7.55567C5.84833 7.17978 5.71427 6.73785 5.71427 6.28578C5.71427 5.67956 5.95509 5.09818 6.38375 4.66952C6.81241 4.24086 7.3938 4.00004 8.00001 4.00004Z"/>
</svg>
`, F8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M16 8C16 8.17681 15.9298 8.34638 15.8047 8.47141C15.6797 8.59643 15.5101 8.66667 15.3333 8.66667H0.666667C0.489856 8.66667 0.320287 8.59643 0.195262 8.47141C0.070238 8.34638 0 8.17681 0 8C0 7.82319 0.070238 7.65362 0.195262 7.5286C0.320287 7.40357 0.489856 7.33333 0.666667 7.33333H15.3333C15.5101 7.33333 15.6797 7.40357 15.8047 7.5286C15.9298 7.65362 16 7.82319 16 8ZM0.666667 3.33333H15.3333C15.5101 3.33333 15.6797 3.2631 15.8047 3.13807C15.9298 3.01305 16 2.84348 16 2.66667C16 2.48986 15.9298 2.32029 15.8047 2.19526C15.6797 2.07024 15.5101 2 15.3333 2H0.666667C0.489856 2 0.320287 2.07024 0.195262 2.19526C0.070238 2.32029 0 2.48986 0 2.66667C0 2.84348 0.070238 3.01305 0.195262 3.13807C0.320287 3.2631 0.489856 3.33333 0.666667 3.33333ZM15.3333 12.6667H0.666667C0.489856 12.6667 0.320287 12.7369 0.195262 12.8619C0.070238 12.987 0 13.1565 0 13.3333C0 13.5101 0.070238 13.6797 0.195262 13.8047C0.320287 13.9298 0.489856 14 0.666667 14H15.3333C15.5101 14 15.6797 13.9298 15.8047 13.8047C15.9298 13.6797 16 13.5101 16 13.3333C16 13.1565 15.9298 12.987 15.8047 12.8619C15.6797 12.7369 15.5101 12.6667 15.3333 12.6667Z"/>
</svg>
`, Z8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M16 8C16 8.13261 15.9298 8.25979 15.8047 8.35355C15.6797 8.44732 15.5101 8.5 15.3333 8.5H0.666667C0.489856 8.5 0.320287 8.44732 0.195262 8.35355C0.070238 8.25979 0 8.13261 0 8C0 7.86739 0.070238 7.74021 0.195262 7.64645C0.320287 7.55268 0.489856 7.5 0.666667 7.5H15.3333C15.5101 7.5 15.6797 7.55268 15.8047 7.64645C15.9298 7.74021 16 7.86739 16 8Z"/>
</svg>
`, Kc = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.9179 15.386C15.8639 15.4796 15.7862 15.5573 15.6926 15.6113C15.599 15.6653 15.4929 15.6937 15.3848 15.6937H0.614787C0.506812 15.6936 0.400767 15.6651 0.307299 15.611C0.213832 15.557 0.136232 15.4793 0.0822927 15.3857C0.0283531 15.2922 -2.77002e-05 15.1861 2.02871e-08 15.0781C2.77407e-05 14.9702 0.028463 14.8641 0.0824506 14.7706C1.25405 12.7451 3.05954 11.2927 5.16657 10.6042C4.12434 9.98374 3.31459 9.03832 2.86167 7.91312C2.40875 6.78792 2.33772 5.54515 2.65947 4.37567C2.98122 3.20618 3.67797 2.17465 4.64272 1.43948C5.60747 0.70431 6.78687 0.306152 7.99981 0.306152C9.21274 0.306152 10.3921 0.70431 11.3569 1.43948C12.3216 2.17465 13.0184 3.20618 13.3401 4.37567C13.6619 5.54515 13.5909 6.78792 13.1379 7.91312C12.685 9.03832 11.8753 9.98374 10.833 10.6042C12.9401 11.2927 14.7456 12.7451 15.9172 14.7706C15.9713 14.8641 15.9999 14.9702 16 15.0782C16.0001 15.1862 15.9718 15.2924 15.9179 15.386Z"/>
</svg>
`, j8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.1086 4.08095C14.9691 4.15317 14.8066 4.16706 14.6569 4.11957C14.5072 4.07208 14.3825 3.96708 14.3102 3.82767C13.7447 2.71048 12.8887 1.76624 11.8322 1.09416C11.7663 1.05263 11.7093 0.998538 11.6644 0.934975C11.6194 0.871411 11.5875 0.799619 11.5703 0.723697C11.5531 0.647775 11.551 0.56921 11.5642 0.492487C11.5774 0.415765 11.6055 0.342388 11.647 0.276546C11.6886 0.210704 11.7427 0.153687 11.8062 0.108749C11.8698 0.0638108 11.9416 0.0318326 12.0175 0.01464C12.0934 -0.00255247 12.172 -0.00462266 12.2487 0.00854767C12.3254 0.021718 12.3988 0.0498709 12.4646 0.0913991C13.696 0.879783 14.6958 1.98106 15.3618 3.2826C15.4341 3.42206 15.4479 3.5845 15.4005 3.7342C15.353 3.88391 15.248 4.00863 15.1086 4.08095ZM1.164 4.14761C1.27254 4.14756 1.37899 4.1177 1.47172 4.06128C1.56444 4.00486 1.63989 3.92405 1.68982 3.82767C2.25533 2.71048 3.11132 1.76624 4.16783 1.09416C4.3008 1.01029 4.39501 0.877028 4.42974 0.723697C4.46446 0.570365 4.43685 0.40952 4.35298 0.276546C4.26911 0.143572 4.13585 0.0493619 3.98252 0.01464C3.82919 -0.0200818 3.66834 0.00752924 3.53537 0.0913991C2.30407 0.879783 1.30425 1.98106 0.638182 3.2826C0.591405 3.37289 0.568655 3.4737 0.572122 3.57533C0.575589 3.67696 0.605155 3.77599 0.657977 3.86288C0.710798 3.94978 0.785096 4.02162 0.87372 4.07148C0.962344 4.12135 1.06231 4.14756 1.164 4.14761ZM14.9464 11.8453C15.0513 12.0253 15.107 12.2298 15.1077 12.4381C15.1084 12.6465 15.0542 12.8514 14.9504 13.0321C14.8467 13.2128 14.6972 13.363 14.5169 13.4674C14.3366 13.5719 14.132 13.627 13.9236 13.6271H10.902C10.766 14.2968 10.4027 14.8989 9.87363 15.3313C9.34455 15.7638 8.68223 16 7.9989 16C7.31557 16 6.65325 15.7638 6.12417 15.3313C5.59508 14.8989 5.23177 14.2968 5.09579 13.6271H2.07418C1.86595 13.6267 1.66149 13.5715 1.48142 13.4669C1.30135 13.3623 1.15202 13.2121 1.04847 13.0314C0.944918 12.8508 0.890808 12.646 0.891589 12.4378C0.892369 12.2295 0.948012 12.0252 1.05291 11.8453C1.72018 10.6937 2.07418 9.05623 2.07418 7.10996C2.07418 5.53863 2.69839 4.03166 3.80949 2.92056C4.92059 1.80946 6.42757 1.18525 7.9989 1.18525C9.57023 1.18525 11.0772 1.80946 12.1883 2.92056C13.2994 4.03166 13.9236 5.53863 13.9236 7.10996C13.9236 9.05549 14.2776 10.6929 14.9464 11.8453ZM9.67411 13.6271H6.32368C6.44643 13.9733 6.6734 14.2729 6.97338 14.4848C7.27336 14.6968 7.63162 14.8105 7.9989 14.8105C8.36618 14.8105 8.72444 14.6968 9.02442 14.4848C9.3244 14.2729 9.55136 13.9733 9.67411 13.6271ZM13.9236 12.4422C13.1356 11.0891 12.7387 9.29544 12.7387 7.10996C12.7387 5.8529 12.2393 4.64732 11.3504 3.75844C10.4615 2.86956 9.25596 2.37019 7.9989 2.37019C6.74183 2.37019 5.53625 2.86956 4.64737 3.75844C3.75849 4.64732 3.25913 5.8529 3.25913 7.10996C3.25913 9.29618 2.86069 11.0899 2.07418 12.4422H13.9236Z"/>
</svg>
`, W8 = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.4273 9.04717C11.4273 9.03116 11.425 9.01744 11.4227 9.00373V7.94514C11.4227 7.35069 10.938 6.86598 10.3435 6.86598H10.0097C9.91828 6.86598 9.84511 6.79281 9.84511 6.70136V6.3927H10.2887C10.5402 6.3927 10.7459 6.18692 10.7459 5.93542V4.10633C10.7459 3.85483 10.5402 3.64906 10.2887 3.64906H5.51474C5.26324 3.64906 5.05746 3.85483 5.05746 4.10633V5.93542C5.05746 6.18692 5.26324 6.3927 5.51474 6.3927H5.94457V6.70136C5.94457 6.79281 5.87141 6.86598 5.77996 6.86598H5.45758C4.86312 6.86598 4.37841 7.35069 4.37841 7.94514V14.9208C4.37841 15.5153 4.86312 16 5.45758 16H10.3413C10.9357 16 11.4204 15.5153 11.4204 14.9208V13.8805C11.4204 13.8668 11.425 13.8508 11.425 13.8371C11.425 13.8234 11.4227 13.8074 11.4204 13.7937V9.09518C11.4204 9.08146 11.425 9.06546 11.425 9.05174L11.4273 9.04717ZM10.5082 13.3753H8.34754V9.50444H10.5082V13.3753ZM5.96972 4.55903H9.82911V5.47358H5.96972V4.55903ZM10.3413 15.0832H5.45758C5.36612 15.0832 5.29296 15.01 5.29296 14.9186V7.94285C5.29296 7.8514 5.36612 7.77824 5.45758 7.77824H5.77996C6.37441 7.77824 6.85912 7.29353 6.85912 6.69907V6.39041H8.92828V6.69907C8.92828 7.29353 9.41299 7.77824 10.0074 7.77824H10.3413C10.4327 7.77824 10.5059 7.8514 10.5059 7.94285V8.5899H7.88798C7.63648 8.5899 7.43071 8.79567 7.43071 9.04717V13.8325C7.43071 14.084 7.63648 14.2898 7.88798 14.2898H10.5059V14.9186C10.5059 15.01 10.4327 15.0832 10.3413 15.0832Z" fill="black"/>
<path d="M14.8591 11.4181H14.1114C14.9185 10.2109 15.3484 8.81165 15.3484 7.34838C15.3484 3.29694 12.0514 0 7.99999 0C3.94855 0 0.651611 3.29694 0.651611 7.34838C0.651611 8.92826 1.14547 10.435 2.08059 11.7016C2.16976 11.8228 2.30923 11.8868 2.44869 11.8868C2.54243 11.8868 2.63846 11.8571 2.71848 11.7976C2.92197 11.6467 2.96541 11.3609 2.81451 11.1575C1.99599 10.0463 1.56387 8.72934 1.56387 7.34609C1.56387 3.79765 4.44926 0.91226 7.9977 0.91226C11.5461 0.91226 14.4315 3.79765 14.4315 7.34609C14.4315 8.54643 14.1046 9.69648 13.485 10.7048V10.044C13.485 9.7925 13.2792 9.58673 13.0277 9.58673C12.7762 9.58673 12.5704 9.7925 12.5704 10.044V11.8731C12.5704 12.1246 12.7762 12.3304 13.0277 12.3304H14.8568C15.1083 12.3304 15.3141 12.1246 15.3141 11.8731C15.3141 11.6216 15.1083 11.4158 14.8568 11.4158L14.8591 11.4181Z" fill="black"/>
</svg>
`, q8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.9093 14.4497C14.7389 12.4263 12.9352 10.9753 10.8303 10.2875C11.8715 9.66773 12.6804 8.72327 13.1329 7.59922C13.5854 6.47516 13.6563 5.23366 13.3349 4.06537C13.0135 2.89708 12.3174 1.86659 11.3537 1.13217C10.3899 0.397752 9.2117 0 8 0C6.7883 0 5.6101 0.397752 4.64633 1.13217C3.68257 1.86659 2.98653 2.89708 2.6651 4.06537C2.34368 5.23366 2.41464 6.47516 2.8671 7.59922C3.31955 8.72327 4.12848 9.66773 5.16965 10.2875C3.06476 10.9746 1.26112 12.4255 0.0907097 14.4497C0.0477887 14.5197 0.0193195 14.5975 0.00698187 14.6787C-0.00535579 14.7599 -0.00131202 14.8427 0.0188746 14.9223C0.0390612 15.0018 0.0749818 15.0766 0.124517 15.142C0.174052 15.2075 0.236198 15.2624 0.307289 15.3035C0.37838 15.3445 0.456975 15.3709 0.538437 15.3811C0.6199 15.3913 0.702579 15.3851 0.781598 15.3628C0.860616 15.3406 0.934373 15.3027 0.998516 15.2514C1.06266 15.2002 1.11589 15.1366 1.15507 15.0645C2.6029 12.5623 5.16197 11.0683 8 11.0683C10.838 11.0683 13.3971 12.5623 14.8449 15.0645C14.8841 15.1366 14.9373 15.2002 15.0015 15.2514C15.0656 15.3027 15.1394 15.3406 15.2184 15.3628C15.2974 15.3851 15.3801 15.3913 15.4616 15.3811C15.543 15.3709 15.6216 15.3445 15.6927 15.3035C15.7638 15.2624 15.8259 15.2075 15.8755 15.142C15.925 15.0766 15.9609 15.0018 15.9811 14.9223C16.0013 14.8427 16.0054 14.7599 15.993 14.6787C15.9807 14.5975 15.9522 14.5197 15.9093 14.4497ZM3.69646 5.53521C3.69646 4.68405 3.94886 3.85201 4.42174 3.14429C4.89462 2.43658 5.56674 1.88499 6.35311 1.55926C7.13948 1.23354 8.00478 1.14831 8.83958 1.31436C9.67438 1.48042 10.4412 1.89029 11.0431 2.49215C11.6449 3.09401 12.0548 3.86083 12.2208 4.69563C12.3869 5.53044 12.3017 6.39574 11.976 7.18211C11.6502 7.96848 11.0986 8.6406 10.3909 9.11347C9.6832 9.58635 8.85116 9.83875 8 9.83875C6.85901 9.83753 5.76509 9.38373 4.95829 8.57693C4.15148 7.77012 3.69768 6.67621 3.69646 5.53521Z"/>
</svg>
`, U8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M14.7689 8C14.7694 8.20893 14.7158 8.41444 14.6134 8.59654C14.511 8.77864 14.3631 8.93113 14.1843 9.03918L3.10176 15.8189C2.91491 15.9333 2.70091 15.9957 2.48185 15.9998C2.26279 16.0038 2.04662 15.9493 1.85566 15.8419C1.66653 15.7362 1.50897 15.582 1.3992 15.3951C1.28942 15.2083 1.2314 14.9956 1.23108 14.7789V1.22109C1.2314 1.0044 1.28942 0.791702 1.3992 0.604871C1.50897 0.41804 1.66653 0.263819 1.85566 0.158069C2.04662 0.0506496 2.26279 -0.00384561 2.48185 0.000211026C2.70091 0.00426766 2.91491 0.0667292 3.10176 0.181145L14.1843 6.96082C14.3631 7.06887 14.511 7.22136 14.6134 7.40346C14.7158 7.58556 14.7694 7.79107 14.7689 8Z"/>
</svg>
`, Y8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346629 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9976 5.87899 15.154 3.84553 13.6543 2.34574C12.1545 0.845963 10.121 0.00235276 8 0ZM8 14.2222C6.76936 14.2222 5.56636 13.8573 4.54312 13.1736C3.51988 12.4899 2.72236 11.5181 2.25142 10.3811C1.78047 9.24418 1.65725 7.9931 1.89734 6.7861C2.13743 5.57911 2.73003 4.47042 3.60023 3.60022C4.47042 2.73003 5.57911 2.13742 6.78611 1.89734C7.9931 1.65725 9.24418 1.78047 10.3811 2.25142C11.5181 2.72236 12.4899 3.51988 13.1736 4.54312C13.8573 5.56636 14.2222 6.76936 14.2222 8C14.2205 9.64969 13.5643 11.2313 12.3978 12.3978C11.2313 13.5643 9.6497 14.2205 8 14.2222ZM10.963 8C10.9629 8.14292 10.9285 8.28372 10.8624 8.41048C10.7964 8.53724 10.7008 8.64621 10.5837 8.72815L7.62074 10.8022C7.48754 10.8954 7.33132 10.9503 7.16909 10.9609C7.00685 10.9715 6.84482 10.9374 6.70061 10.8624C6.55641 10.7873 6.43556 10.6741 6.35121 10.5351C6.26686 10.3961 6.22225 10.2367 6.22222 10.0741V5.92592C6.22225 5.76335 6.26686 5.60389 6.35121 5.4649C6.43556 5.32591 6.55641 5.21272 6.70061 5.13764C6.84482 5.06256 7.00685 5.02846 7.16909 5.03907C7.33132 5.04967 7.48754 5.10456 7.62074 5.19778L10.5837 7.27185C10.7008 7.35379 10.7964 7.46276 10.8624 7.58952C10.9285 7.71627 10.9629 7.85708 10.963 8Z"/>
</svg>
`, Gc = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8 1.32C8 0.590984 8.59493 -0.0110973 9.31404 0.108651C10.4288 0.294276 11.4967 0.714871 12.4446 1.34824C13.7602 2.22729 14.7855 3.47672 15.391 4.93853C15.9965 6.40034 16.155 8.00887 15.8463 9.56072C15.5376 11.1126 14.7757 12.538 13.6569 13.6569C12.538 14.7757 11.1126 15.5376 9.56072 15.8463C8.00887 16.155 6.40034 15.9965 4.93853 15.391C3.47672 14.7855 2.22729 13.7602 1.34824 12.4446C0.714871 11.4967 0.294276 10.4288 0.108651 9.31404C-0.011097 8.59492 0.590984 8 1.32 8C2.04902 8 2.62399 8.5997 2.80172 9.30672C2.95061 9.89901 3.20043 10.4647 3.54332 10.9779C4.13229 11.8593 4.9694 12.5463 5.94882 12.952C6.92823 13.3577 8.00595 13.4638 9.04568 13.257C10.0854 13.0502 11.0405 12.5397 11.7901 11.7901C12.5397 11.0405 13.0502 10.0854 13.257 9.04568C13.4638 8.00595 13.3577 6.92823 12.952 5.94882C12.5463 4.9694 11.8593 4.13229 10.9779 3.54332C10.4647 3.20043 9.89901 2.95061 9.30672 2.80172C8.5997 2.62399 8 2.04902 8 1.32Z"/>
</svg>
`, X8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M16 7.99949C16.0002 9.94094 15.2358 11.8044 13.8723 13.1864C12.5088 14.5685 10.6559 15.358 8.71461 15.3841H8.61539C6.72942 15.3888 4.91406 14.6671 3.54615 13.3687C3.48741 13.3132 3.44019 13.2466 3.40718 13.1728C3.37417 13.099 3.35603 13.0194 3.35378 12.9385C3.35153 12.8577 3.36522 12.7772 3.39407 12.7017C3.42292 12.6262 3.46636 12.5571 3.52192 12.4983C3.57748 12.4396 3.64407 12.3924 3.71788 12.3594C3.79169 12.3264 3.87127 12.3082 3.9521 12.306C4.03292 12.3037 4.11339 12.3174 4.18893 12.3463C4.26446 12.3751 4.33357 12.4185 4.39231 12.4741C5.27215 13.3039 6.37699 13.856 7.56879 14.0615C8.7606 14.267 9.98654 14.1168 11.0935 13.6296C12.2004 13.1424 13.1392 12.3398 13.7927 11.3222C14.4461 10.3045 14.7852 9.11686 14.7676 7.9076C14.75 6.69833 14.3765 5.52106 13.6937 4.52285C13.011 3.52463 12.0492 2.74973 10.9285 2.29495C9.80792 1.84017 8.57813 1.72567 7.39281 1.96576C6.20748 2.20584 5.11918 2.78987 4.26385 3.64487C4.25756 3.65167 4.25088 3.65809 4.24385 3.66411L2.19923 5.53795H4.30769C4.4709 5.53795 4.62743 5.60279 4.74284 5.71819C4.85824 5.8336 4.92308 5.99013 4.92308 6.15334C4.92308 6.31655 4.85824 6.47307 4.74284 6.58848C4.62743 6.70389 4.4709 6.76872 4.30769 6.76872H0.615385C0.452174 6.76872 0.295649 6.70389 0.180242 6.58848C0.064835 6.47307 0 6.31655 0 6.15334V2.46103C0 2.29782 0.064835 2.14129 0.180242 2.02589C0.295649 1.91048 0.452174 1.84564 0.615385 1.84564C0.778595 1.84564 0.93512 1.91048 1.05053 2.02589C1.16593 2.14129 1.23077 2.29782 1.23077 2.46103V4.75334L3.40385 2.76872C4.43768 1.73891 5.75344 1.03846 7.18502 0.755821C8.61661 0.473178 10.0998 0.621002 11.4475 1.18063C12.7951 1.74027 13.9468 2.68662 14.757 3.90022C15.5673 5.11382 15.9998 6.54027 16 7.99949Z"/>
</svg>
`, K8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8199 14.95L11.9725 11.1034C13.0876 9.76465 13.6437 8.0475 13.525 6.30919C13.4063 4.57088 12.622 2.94524 11.3353 1.77045C10.0486 0.595655 8.35844 -0.0378381 6.61653 0.00174965C4.87462 0.0413374 3.21503 0.750958 1.98299 1.98299C0.750958 3.21503 0.0413374 4.87462 0.00174965 6.61653C-0.0378381 8.35844 0.595655 10.0486 1.77045 11.3353C2.94524 12.622 4.57088 13.4063 6.30919 13.525C8.0475 13.6437 9.76465 13.0876 11.1034 11.9725L14.95 15.8199C15.0071 15.877 15.0749 15.9223 15.1496 15.9532C15.2242 15.9841 15.3042 16 15.3849 16C15.4657 16 15.5457 15.9841 15.6203 15.9532C15.6949 15.9223 15.7627 15.877 15.8199 15.8199C15.877 15.7627 15.9223 15.6949 15.9532 15.6203C15.9841 15.5457 16 15.4657 16 15.3849C16 15.3042 15.9841 15.2242 15.9532 15.1496C15.9223 15.0749 15.877 15.0071 15.8199 14.95ZM1.24642 6.77888C1.24642 5.68467 1.57089 4.61502 2.17881 3.70521C2.78672 2.7954 3.65078 2.08629 4.6617 1.66755C5.67263 1.24882 6.78502 1.13925 7.85821 1.35273C8.93141 1.5662 9.9172 2.09311 10.6909 2.86684C11.4647 3.64057 11.9916 4.62636 12.205 5.69955C12.4185 6.77275 12.309 7.88514 11.8902 8.89607C11.4715 9.90699 10.7624 10.771 9.85256 11.379C8.94275 11.9869 7.8731 12.3113 6.77888 12.3113C5.31208 12.3097 3.90582 11.7263 2.86864 10.6891C1.83145 9.65195 1.24805 8.24569 1.24642 6.77888Z"/>
</svg>
`, G8 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8605 3.1752C15.8048 3.10864 15.7353 3.05511 15.6567 3.01838C15.5781 2.98165 15.4924 2.96262 15.4057 2.96263H3.45739L3.09521 0.973225C3.0456 0.70017 2.90174 0.453187 2.68869 0.275334C2.47565 0.0974807 2.20694 4.01099e-05 1.92942 0H0.592527C0.435379 0 0.284667 0.0624267 0.173547 0.173547C0.0624267 0.284667 0 0.435379 0 0.592527C0 0.749675 0.0624267 0.900386 0.173547 1.01151C0.284667 1.12263 0.435379 1.18505 0.592527 1.18505H1.92571L3.81884 11.5758C3.8746 11.8839 4.01079 12.1719 4.21361 12.4105C3.93367 12.6719 3.73162 13.0058 3.62986 13.3751C3.5281 13.7444 3.53061 14.1347 3.6371 14.5026C3.74359 14.8706 3.94991 15.2018 4.23318 15.4597C4.51645 15.7175 4.86559 15.8919 5.2419 15.9634C5.61822 16.0349 6.00699 16.0009 6.36511 15.8649C6.72323 15.729 7.03671 15.4965 7.27078 15.1933C7.50485 14.8901 7.65038 14.528 7.69121 14.1471C7.73205 13.7663 7.6666 13.3815 7.50213 13.0356H10.8662C10.7336 13.3131 10.665 13.6168 10.6655 13.9244C10.6655 14.3345 10.7871 14.7355 11.015 15.0765C11.2429 15.4176 11.5668 15.6834 11.9457 15.8404C12.3246 15.9973 12.7416 16.0384 13.1439 15.9584C13.5462 15.8784 13.9157 15.6808 14.2058 15.3908C14.4958 15.1008 14.6933 14.7313 14.7733 14.329C14.8533 13.9267 14.8123 13.5097 14.6553 13.1308C14.4983 12.7518 14.2325 12.4279 13.8915 12.2C13.5505 11.9722 13.1495 11.8505 12.7393 11.8505H5.56753C5.42877 11.8505 5.29441 11.8018 5.18789 11.7129C5.08137 11.6239 5.00944 11.5005 4.98463 11.3639L4.74984 10.073H13.3415C13.7578 10.0729 14.1608 9.92673 14.4804 9.65996C14.8 9.39318 15.0158 9.0227 15.0902 8.61312L15.9908 3.66107C16.0061 3.57548 16.0023 3.48759 15.9798 3.40362C15.9572 3.31965 15.9165 3.24167 15.8605 3.1752ZM6.51779 13.9244C6.51779 14.1002 6.46567 14.272 6.36801 14.4182C6.27035 14.5643 6.13154 14.6782 5.96913 14.7455C5.80672 14.8128 5.62802 14.8304 5.45561 14.7961C5.2832 14.7618 5.12483 14.6771 5.00054 14.5528C4.87624 14.4285 4.79159 14.2702 4.75729 14.0978C4.723 13.9254 4.7406 13.7467 4.80787 13.5843C4.87514 13.4219 4.98906 13.283 5.13522 13.1854C5.28138 13.0877 5.45322 13.0356 5.629 13.0356C5.86473 13.0356 6.09079 13.1292 6.25747 13.2959C6.42415 13.4626 6.51779 13.6887 6.51779 13.9244ZM13.6281 13.9244C13.6281 14.1002 13.576 14.272 13.4783 14.4182C13.3807 14.5643 13.2419 14.6782 13.0795 14.7455C12.917 14.8128 12.7383 14.8304 12.5659 14.7961C12.3935 14.7618 12.2352 14.6771 12.1109 14.5528C11.9866 14.4285 11.9019 14.2702 11.8676 14.0978C11.8333 13.9254 11.8509 13.7467 11.9182 13.5843C11.9855 13.4219 12.0994 13.283 12.2455 13.1854C12.3917 13.0877 12.5635 13.0356 12.7393 13.0356C12.975 13.0356 13.2011 13.1292 13.3678 13.2959C13.5345 13.4626 13.6281 13.6887 13.6281 13.9244ZM13.9244 8.40129C13.8995 8.53819 13.8273 8.66198 13.7203 8.75095C13.6133 8.83992 13.4784 8.8884 13.3393 8.8879H4.53431L3.67293 4.14769H14.6954L13.9244 8.40129Z"/>
</svg>
`, J8 = `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"><rect x="0" y="0" width="100%" height="100%" rx="4" /></svg>
`, Q8 = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.11221 0.888888C3.35665 0.888888 3.55665 0.688888 3.55665 0.444444C3.55665 0.2 3.35665 0 3.11221 0H0.445543C0.201098 0 0.00109863 0.2 0.00109863 0.444444C0.00109863 0.688888 0.201098 0.888888 0.445543 0.888888H1.33443V2.66666H0.445543C0.201098 2.66666 0.00109863 2.86666 0.00109863 3.11111V12C0.00109863 12.2444 0.201098 12.4444 0.445543 12.4444H1.33443V15.5555C1.33443 15.8 1.53443 16 1.77887 16C2.02332 16 2.22332 15.8 2.22332 15.5555V12.4444H3.11221C3.35665 12.4444 3.55665 12.2444 3.55665 12V3.11111C3.55665 2.86666 3.35665 2.66666 3.11221 2.66666H2.22332V0.888888H3.11221ZM2.66776 11.5555H0.889987V3.55555H2.66776V11.5555Z" fill="black"/>
<path d="M15.7234 5.70446L10.5234 3.58891C10.4167 3.54446 10.2967 3.54446 10.1879 3.58891L4.98786 5.70446C4.82119 5.77335 4.71008 5.93557 4.71008 6.11557C4.71008 7.53335 4.92342 9.65557 5.92786 11.7267C6.88341 13.6978 8.3123 15.1222 10.1723 15.96C10.2301 15.9867 10.2923 16 10.3545 16C10.4167 16 10.479 15.9867 10.5367 15.96C12.3967 15.1222 13.8256 13.6978 14.7812 11.7267C15.7856 9.65557 15.9967 7.53113 15.999 6.11557C15.999 5.93557 15.8901 5.77113 15.7212 5.70446H15.7234ZM10.3567 15.0645C9.05452 14.4222 5.72119 12.2133 5.60342 6.41335L10.3567 4.48002L15.1101 6.41335C14.9923 12.2133 11.6612 14.4222 10.3567 15.0645Z" fill="black"/>
<path d="M8.64756 9.17556C8.47423 9.00222 8.192 9.00222 8.01867 9.17556C7.84534 9.34889 7.84534 9.63111 8.01867 9.80445L9.652 11.4378C9.73867 11.5244 9.852 11.5689 9.96534 11.5689C10.0787 11.5689 10.192 11.5244 10.2787 11.4378L13.5476 8.16889C13.7209 7.99556 13.7209 7.71334 13.5476 7.54C13.3742 7.36667 13.092 7.36667 12.9187 7.54L9.96534 10.4933L8.64534 9.17334L8.64756 9.17556Z" fill="black"/>
</svg>
`, nn = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7714 12.5776L9.52528 1.73028C9.36919 1.46453 9.14637 1.24418 8.87889 1.09107C8.61141 0.937966 8.30856 0.857422 8.00036 0.857422C7.69216 0.857422 7.38931 0.937966 7.12182 1.09107C6.85434 1.24418 6.63152 1.46453 6.47543 1.73028L0.229326 12.5776C0.079145 12.8346 0 13.127 0 13.4247C0 13.7224 0.079145 14.0147 0.229326 14.2718C0.383411 14.5391 0.605857 14.7607 0.873837 14.9137C1.14182 15.0667 1.44568 15.1457 1.75425 15.1425H14.2465C14.5548 15.1454 14.8584 15.0663 15.1261 14.9133C15.3938 14.7603 15.616 14.5389 15.77 14.2718C15.9204 14.0149 15.9997 13.7226 16 13.4249C16.0002 13.1272 15.9214 12.8348 15.7714 12.5776ZM7.42896 6.57146C7.42896 6.41992 7.48916 6.27458 7.59632 6.16742C7.70347 6.06026 7.84881 6.00006 8.00036 6.00006C8.1519 6.00006 8.29724 6.06026 8.4044 6.16742C8.51155 6.27458 8.57176 6.41992 8.57176 6.57146V9.42846C8.57176 9.58 8.51155 9.72534 8.4044 9.8325C8.29724 9.93966 8.1519 9.99986 8.00036 9.99986C7.84881 9.99986 7.70347 9.93966 7.59632 9.8325C7.48916 9.72534 7.42896 9.58 7.42896 9.42846V6.57146ZM8.00036 12.8569C7.83084 12.8569 7.66513 12.8066 7.52418 12.7124C7.38323 12.6182 7.27337 12.4844 7.2085 12.3278C7.14363 12.1711 7.12665 11.9988 7.15973 11.8325C7.1928 11.6663 7.27443 11.5136 7.3943 11.3937C7.51416 11.2738 7.66688 11.1922 7.83314 11.1591C7.9994 11.1261 8.17174 11.143 8.32835 11.2079C8.48497 11.2728 8.61883 11.3826 8.71301 11.5236C8.80719 11.6645 8.85746 11.8302 8.85746 11.9998C8.85746 12.2271 8.76715 12.4451 8.60642 12.6058C8.44568 12.7666 8.22767 12.8569 8.00036 12.8569Z"/>
</svg>
`, Rn = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8.51443 8.51443L1.24215 15.7867C1.10569 15.9232 0.920613 15.9998 0.727633 15.9998C0.534653 15.9998 0.349576 15.9232 0.213119 15.7867C0.076661 15.6503 3.8041e-09 15.4652 0 15.2722C-3.8041e-09 15.0792 0.076661 14.8941 0.213119 14.7577L6.9718 7.99992L0.213119 1.24215C0.076661 1.10569 0 0.920613 0 0.727633C0 0.534653 0.076661 0.349576 0.213119 0.213119C0.349576 0.076661 0.534653 0 0.727633 0C0.920613 0 1.10569 0.076661 1.24215 0.213119L8.51443 7.4854C8.58205 7.55294 8.63569 7.63315 8.67228 7.72143C8.70888 7.80972 8.72772 7.90435 8.72772 7.99992C8.72772 8.09549 8.70888 8.19012 8.67228 8.2784C8.63569 8.36669 8.58205 8.44689 8.51443 8.51443ZM15.7867 7.4854L8.51443 0.213119C8.37797 0.076661 8.1929 0 7.99992 0C7.80694 0 7.62186 0.076661 7.4854 0.213119C7.34894 0.349576 7.27228 0.534653 7.27228 0.727633C7.27228 0.920613 7.34894 1.10569 7.4854 1.24215L14.2441 7.99992L7.4854 14.7577C7.34894 14.8941 7.27228 15.0792 7.27228 15.2722C7.27228 15.4652 7.34894 15.6503 7.4854 15.7867C7.62186 15.9232 7.80694 15.9998 7.99992 15.9998C8.1929 15.9998 8.37797 15.9232 8.51443 15.7867L15.7867 8.51443C15.8543 8.44689 15.908 8.36669 15.9446 8.2784C15.9812 8.19012 16 8.09549 16 7.99992C16 7.90435 15.9812 7.80972 15.9446 7.72143C15.908 7.63315 15.8543 7.55294 15.7867 7.4854Z"/>
</svg>
`, eh = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="m15.69,4.37L11.63.31c-.2-.2-.47-.31-.75-.31h-5.74c-.28,0-.55.11-.75.31L.31,4.37c-.2.2-.31.47-.31.75v5.74c0,.28.11.55.31.75l4.17,4.17c.13.13.31.21.5.21h5.89c.28,0,.55-.11.75-.31l4.06-4.06c.2-.2.31-.47.31-.75v-5.74c0-.28-.11-.55-.31-.75Zm-7.69,9.13c-.69,0-1.25-.56-1.25-1.25s.56-1.25,1.25-1.25,1.25.56,1.25,1.25-.56,1.25-1.25,1.25Zm1.02-3.86c0,.1-.04.18-.11.26-.07.07-.16.11-.26.11h-1.26c-.1,0-.19-.04-.26-.11-.07-.07-.11-.16-.11-.26l-.53-6.27c0-.1.04-.18.11-.26.07-.07.16-.11.26-.11h2.38c.1,0,.19.04.26.11.07.07.11.16.11.26l-.59,6.27Z"/></svg>', th = `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="24" viewBox="0 0 45 24" fill="none">
<path d="M6.5 6.03516V18.0139H15.0511V16.3152H8.33659V12.8007H13.817V11.1459H8.33659V7.68992H14.8014V6.03516H6.5Z" />
<path d="M31.2126 7.69285H33.8132C35.6351 7.69285 36.6489 8.5422 36.6489 10.0652C36.6489 11.6614 35.6939 12.5107 33.9014 12.5107H31.2126V7.69285ZM36.4285 6.53598C35.7086 6.19916 34.8564 6.02344 33.8132 6.02344H29.3613V18.0168H31.2126V14.1508H33.9161C35.4735 14.1508 36.6636 13.7701 37.4423 12.9793C38.1476 12.2764 38.5002 11.2953 38.5002 10.0505C38.5002 8.42505 37.7802 7.19495 36.4285 6.53598Z" />
<path d="M26.7284 6.00542L22.6974 10.0231L24.3596 11.6798L28.3907 7.66218L26.7284 6.00542Z" />
<path d="M20.3714 12.3522L16.2988 16.4113L17.9611 18.0681L22.0337 14.009L20.3714 12.3522Z" />
<path d="M17.9533 6L16.291 7.65676L20.2805 11.633L21.9427 9.97623L17.9533 6Z" />
<path d="M24.4313 12.4841L22.769 14.1409L26.7169 18.0757L28.3792 16.419L24.4313 12.4841Z" />
</svg>`, rh = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<path d="M11.9998 0C13.6248 0 14.6951 0.004 15.2106 0.012C15.7261 0.02 16.3043 0.0395 16.9453 0.0705C17.5863 0.1015 18.1371 0.164 18.5976 0.258C19.0581 0.352 19.4761 0.477 19.8516 0.633C20.2581 0.7895 20.6331 0.977 20.9766 1.1955C21.3201 1.414 21.6561 1.6875 21.9846 2.016C22.3131 2.3445 22.5866 2.6805 22.8051 3.024C23.0236 3.3675 23.2111 3.7425 23.3676 4.149C23.5241 4.524 23.6491 4.942 23.7426 5.403C23.8361 5.864 23.8986 6.41475 23.9301 7.05525C23.9616 7.69575 23.9811 8.274 23.9886 8.79C23.9961 9.306 24.0001 10.3762 24.0006 12.0007C24.0011 13.6252 23.9971 14.6955 23.9886 15.2115C23.9801 15.7275 23.9606 16.3057 23.9301 16.9462C23.8996 17.5868 23.8371 18.1375 23.7426 18.5985C23.6481 19.0595 23.5231 19.4775 23.3676 19.8525C23.2111 20.259 23.0236 20.634 22.8051 20.9775C22.5866 21.321 22.3131 21.657 21.9846 21.9855C21.6561 22.314 21.3201 22.5875 20.9766 22.806C20.6331 23.0245 20.2581 23.212 19.8516 23.3685C19.4766 23.525 19.0586 23.65 18.5976 23.7435C18.1366 23.837 17.5858 23.8995 16.9453 23.931C16.3048 23.9625 15.7266 23.982 15.2106 23.9895C14.6946 23.997 13.6243 24.001 11.9998 24.0015C10.3753 24.002 9.30507 23.998 8.78907 23.9895C8.27307 23.981 7.69482 23.9615 7.05432 23.931C6.41382 23.9005 5.86307 23.838 5.40207 23.7435C4.94107 23.649 4.52307 23.524 4.14807 23.3685C3.74157 23.212 3.36657 23.0245 3.02307 22.806C2.67957 22.5875 2.34356 22.314 2.01507 21.9855C1.68657 21.657 1.41307 21.321 1.19457 20.9775C0.976065 20.634 0.788565 20.259 0.632065 19.8525C0.475565 19.4775 0.350565 19.0595 0.257065 18.5985C0.163565 18.1375 0.101065 17.5868 0.0695651 16.9462C0.0380651 16.3057 0.0185651 15.7275 0.0110651 15.2115C0.0035651 14.6955 -0.000434896 13.6252 -0.000934896 12.0007C-0.0014349 10.3762 0.0025651 9.306 0.0110651 8.79C0.0195651 8.274 0.0390651 7.69575 0.0695651 7.05525C0.100065 6.41475 0.162565 5.864 0.257065 5.403C0.351565 4.942 0.476565 4.524 0.632065 4.149C0.788565 3.7425 0.976065 3.3675 1.19457 3.024C1.41307 2.6805 1.68657 2.3445 2.01507 2.016C2.34356 1.6875 2.67957 1.414 3.02307 1.1955C3.36657 0.977 3.74157 0.7895 4.14807 0.633C4.52307 0.4765 4.94107 0.3515 5.40207 0.258C5.86307 0.1645 6.41382 0.102 7.05432 0.0705C7.69482 0.039 8.27307 0.0195 8.78907 0.012C9.30507 0.0045 10.3753 0.0005 11.9998 0V0ZM11.9998 2.15625C10.3903 2.15625 9.33957 2.16025 8.84756 2.16825C8.35557 2.17625 7.78907 2.19575 7.14807 2.22675C6.57007 2.25825 6.10907 2.31675 5.76507 2.40225C5.42106 2.48775 5.13981 2.56975 4.92132 2.64825C4.63981 2.75775 4.39382 2.88275 4.18332 3.02325C3.97282 3.16375 3.75807 3.33575 3.53907 3.53925C3.33607 3.75825 3.16407 3.973 3.02307 4.1835C2.88207 4.394 2.75707 4.64 2.64807 4.9215C2.57007 5.1405 2.48807 5.42175 2.40207 5.76525C2.31607 6.10875 2.25757 6.56975 2.22657 7.14825C2.19507 7.78875 2.17557 8.35525 2.16807 8.84775C2.16057 9.34025 2.15656 10.391 2.15606 12C2.15557 13.609 2.15956 14.6597 2.16807 15.1522C2.17657 15.6447 2.19607 16.2113 2.22657 16.8517C2.25807 17.4298 2.31657 17.8907 2.40207 18.2347C2.48757 18.5788 2.56957 18.86 2.64807 19.0785C2.75757 19.36 2.88257 19.606 3.02307 19.8165C3.16357 20.027 3.33557 20.2418 3.53907 20.4608C3.75807 20.6637 3.97282 20.8358 4.18332 20.9767C4.39382 21.1178 4.63981 21.2428 4.92132 21.3517C5.14032 21.4298 5.42157 21.5118 5.76507 21.5978C6.10856 21.6838 6.56957 21.7423 7.14807 21.7733C7.78857 21.8048 8.35507 21.8242 8.84756 21.8317C9.34007 21.8392 10.3908 21.8433 11.9998 21.8438C13.6088 21.8442 14.6596 21.8403 15.1521 21.8317C15.6446 21.8232 16.2111 21.8038 16.8516 21.7733C17.4296 21.7418 17.8906 21.6833 18.2346 21.5978C18.5786 21.5123 18.8598 21.4303 19.0783 21.3517C19.3598 21.2423 19.6058 21.1173 19.8163 20.9767C20.0268 20.8363 20.2416 20.6642 20.4606 20.4608C20.6636 20.2418 20.8356 20.027 20.9766 19.8165C21.1176 19.606 21.2426 19.36 21.3516 19.0785C21.4296 18.8595 21.5116 18.5782 21.5976 18.2347C21.6836 17.8913 21.7421 17.4303 21.7731 16.8517C21.8046 16.2113 21.8241 15.6447 21.8316 15.1522C21.8391 14.6597 21.8431 13.609 21.8436 12C21.8441 10.391 21.8401 9.34025 21.8316 8.84775C21.8231 8.35525 21.8036 7.78875 21.7731 7.14825C21.7416 6.57025 21.6831 6.10925 21.5976 5.76525C21.5121 5.42125 21.4301 5.14 21.3516 4.9215C21.2421 4.64 21.1171 4.394 20.9766 4.1835C20.8361 3.973 20.6641 3.75825 20.4606 3.53925C20.2416 3.33625 20.0268 3.16425 19.8163 3.02325C19.6058 2.88225 19.3598 2.75725 19.0783 2.64825C18.8593 2.57025 18.5781 2.48825 18.2346 2.40225C17.8911 2.31625 17.4301 2.25775 16.8516 2.22675C16.2111 2.19525 15.6446 2.17575 15.1521 2.16825C14.6596 2.16075 13.6088 2.15675 11.9998 2.15625ZM11.9998 5.83575C12.8438 5.83575 13.6408 5.99975 14.3908 6.32775C15.1408 6.64025 15.7971 7.07775 16.3596 7.64025C16.9221 8.20275 17.3596 8.859 17.6721 9.609C18.0001 10.359 18.1641 11.156 18.1641 12C18.1641 12.844 18.0001 13.641 17.6721 14.391C17.3596 15.141 16.9221 15.7972 16.3596 16.3597C15.7971 16.9222 15.1408 17.3598 14.3908 17.6722C13.6408 18.0002 12.8438 18.1642 11.9998 18.1642C11.1558 18.1642 10.3588 18.0002 9.60882 17.6722C8.85882 17.3598 8.20257 16.9222 7.64007 16.3597C7.07757 15.7972 6.64007 15.141 6.32757 14.391C5.99957 13.641 5.83557 12.844 5.83557 12C5.83557 11.156 5.99957 10.359 6.32757 9.609C6.64007 8.859 7.07757 8.20275 7.64007 7.64025C8.20257 7.07775 8.85882 6.64025 9.60882 6.32775C10.3588 5.99975 11.1558 5.83575 11.9998 5.83575ZM11.9998 16.008C13.1093 16.008 14.0546 15.6173 14.8356 14.8358C15.6166 14.0542 16.0073 13.109 16.0078 12C16.0083 10.891 15.6176 9.94575 14.8356 9.16425C14.0536 8.38275 13.1083 7.992 11.9998 7.992C10.8913 7.992 9.94606 8.38275 9.16407 9.16425C8.38206 9.94575 7.99132 10.891 7.99182 12C7.99232 13.109 8.38307 14.0542 9.16407 14.8358C9.94507 15.6173 10.8903 16.008 11.9998 16.008ZM19.8516 5.60175C19.8516 5.99225 19.7108 6.32825 19.4293 6.60975C19.1478 6.89125 18.8041 7.032 18.3981 7.032C18.0076 7.032 17.6716 6.89125 17.3901 6.60975C17.1086 6.32825 16.9678 5.99225 16.9678 5.60175C16.9678 5.19525 17.1086 4.8515 17.3901 4.5705C17.6716 4.2895 18.0076 4.14875 18.3981 4.14825C18.8046 4.14825 19.1483 4.289 19.4293 4.5705C19.7103 4.852 19.8511 5.19575 19.8516 5.60175Z"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>
`, ih = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.37214 23.9999H0.396429V7.97672H5.37214V23.9999ZM2.88161 5.79101C1.29054 5.79101 0 4.47315 0 2.88208C1.13882e-08 2.11783 0.303597 1.38488 0.844003 0.844476C1.38441 0.30407 2.11736 0.000473022 2.88161 0.000473022C3.64586 0.000473022 4.3788 0.30407 4.91921 0.844476C5.45962 1.38488 5.76321 2.11783 5.76321 2.88208C5.76321 4.47315 4.47214 5.79101 2.88161 5.79101ZM23.9946 23.9999H19.0296V16.1999C19.0296 14.341 18.9921 11.9571 16.4427 11.9571C13.8557 11.9571 13.4593 13.9767 13.4593 16.066V23.9999H8.48893V7.97672H13.2611V10.1624H13.3307C13.995 8.90351 15.6177 7.57494 18.0386 7.57494C23.0743 7.57494 24 10.891 24 15.1982V23.9999H23.9946Z"/>
</svg>
`, oh = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.81818 8.72727H14.1818V5.45455H17.4545L12 0L6.54545 5.45455H9.81818V8.72727ZM8.72727 9.81818H5.45455V6.54545L0 12L5.45455 17.4545V14.1818H8.72727V9.81818ZM24 12L18.5455 6.54545V9.81818H15.2727V14.1818H18.5455V17.4545L24 12ZM14.1818 15.2727H9.81818V18.5455H6.54545L12 24L17.4545 18.5455H14.1818V15.2727Z"/>
</svg>
`, nh = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 24H7.85714V0H1V24ZM14.7143 0V24H21.5714V0H14.7143Z"/>
</svg>
`, sh = `<svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.5516 1H7.05411C5.88354 1.00132 4.93494 1.93161 4.93359 3.07959V5.35997C4.93359 5.624 5.15184 5.83804 5.42107 5.83804C5.69029 5.83804 5.90854 5.624 5.90854 5.35997V3.07959C5.90854 2.78227 6.02898 2.49712 6.24336 2.28688C6.45774 2.07664 6.7485 1.95852 7.05167 1.95852H21.5492C21.8524 1.95852 22.1431 2.07664 22.3575 2.28688C22.5719 2.49712 22.6923 2.78227 22.6923 3.07959V11.1828C22.6923 11.802 22.1805 12.3039 21.5492 12.3039H9.38668C9.11746 12.3039 8.89921 12.5179 8.89921 12.782C8.89921 13.046 9.11746 13.26 9.38668 13.26H21.5492C22.7198 13.2587 23.6684 12.3284 23.6697 11.1804V3.0772C23.667 1.93108 22.7203 1.00263 21.5516 1V1Z"  stroke="#14568d" stroke-width="0.4"/>
<path d="M10.676 5.83309H18.6169C18.8862 5.83309 19.1044 5.61905 19.1044 5.35502C19.1044 5.09099 18.8862 4.87695 18.6169 4.87695H10.676C10.4067 4.87695 10.1885 5.09099 10.1885 5.35502C10.1885 5.61905 10.4067 5.83309 10.676 5.83309Z"  stroke="#14568D" stroke-width="0.4"/>
<path d="M10.676 9.20027H16.4403C16.7096 9.20027 16.9278 8.98624 16.9278 8.72221C16.9278 8.45818 16.7096 8.24414 16.4403 8.24414H10.676C10.4067 8.24414 10.1885 8.45818 10.1885 8.72221C10.1885 8.98624 10.4067 9.20027 10.676 9.20027Z"  stroke="#14568D" stroke-width="0.4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.13917 9.8101C8.13917 11.2477 6.9508 12.4132 5.48487 12.4132C4.0195 12.4119 2.83191 11.2472 2.83057 9.8101C2.83057 8.37247 4.01894 7.20703 5.48487 7.20703C6.9508 7.20703 8.13917 8.37247 8.13917 9.8101ZM7.15902 9.81013C7.15902 8.90319 6.40933 8.16797 5.48454 8.16797V8.17036C4.56125 8.17167 3.81274 8.90467 3.81006 9.81013C3.81006 10.7171 4.55975 11.4523 5.48454 11.4523C6.40933 11.4523 7.15902 10.7171 7.15902 9.81013Z" />
<path d="M5.48487 12.4132L5.48474 12.5632H5.48487V12.4132ZM2.83057 9.8101H2.68057L2.68057 9.81024L2.83057 9.8101ZM5.48454 8.16797V8.01797H5.33454V8.16797H5.48454ZM5.48454 8.17036L5.48475 8.32036L5.63454 8.32015V8.17036H5.48454ZM3.81006 9.81013L3.66006 9.80968V9.81013H3.81006ZM5.48487 12.5632C7.03088 12.5632 8.28917 11.3333 8.28917 9.8101H7.98917C7.98917 11.1622 6.87073 12.2632 5.48487 12.2632V12.5632ZM2.68057 9.81024C2.68199 11.3328 3.93939 12.5618 5.48474 12.5632L5.48501 12.2632C4.0996 12.2619 2.98183 11.1616 2.98057 9.80996L2.68057 9.81024ZM5.48487 7.05703C3.93887 7.05703 2.68057 8.28688 2.68057 9.8101H2.98057C2.98057 8.45805 4.09901 7.35703 5.48487 7.35703V7.05703ZM8.28917 9.8101C8.28917 8.28688 7.03088 7.05703 5.48487 7.05703V7.35703C6.87073 7.35703 7.98917 8.45805 7.98917 9.8101H8.28917ZM5.48454 8.31797C6.32925 8.31797 7.00902 8.98877 7.00902 9.81013H7.30902C7.30902 8.8176 6.4894 8.01797 5.48454 8.01797V8.31797ZM5.63454 8.17036V8.16797H5.33454V8.17036H5.63454ZM3.96006 9.81057C3.96249 8.99042 4.6413 8.32156 5.48475 8.32036L5.48432 8.02036C4.48121 8.02178 3.663 8.81891 3.66006 9.80968L3.96006 9.81057ZM5.48454 11.3023C4.63982 11.3023 3.96006 10.6315 3.96006 9.81013H3.66006C3.66006 10.8027 4.47967 11.6023 5.48454 11.6023V11.3023ZM7.00902 9.81013C7.00902 10.6315 6.32925 11.3023 5.48454 11.3023V11.6023C6.4894 11.6023 7.30902 10.8027 7.30902 9.81013H7.00902Z" />
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 17.3338C1.00269 14.9058 3.00902 12.9382 5.48477 12.9355C7.95902 12.9408 9.96309 14.9073 9.96711 17.3338C9.96711 17.5978 9.74886 17.8118 9.47964 17.8118H1.48748C1.21825 17.8118 1 17.5978 1 17.3338ZM5.48449 13.8945C3.73599 13.8945 2.25454 15.1575 2.01123 16.8556H2.02098H8.95776C8.71445 15.1575 7.233 13.8945 5.48449 13.8945Z" />
<path d="M5.48477 12.9355L5.48499 12.8355L5.48467 12.8355L5.48477 12.9355ZM1 17.3338L0.9 17.3337V17.3338H1ZM9.96711 17.3338H10.0671L10.0671 17.3336L9.96711 17.3338ZM2.01123 16.8556L1.91224 16.8414L1.89588 16.9556H2.01123V16.8556ZM8.95776 16.8556V16.9556H9.07311L9.05675 16.8414L8.95776 16.8556ZM5.48467 12.8355C2.95561 12.8382 0.90275 14.8487 0.9 17.3337L1.1 17.3339C1.10262 14.9629 3.06243 13.0381 5.48488 13.0355L5.48467 12.8355ZM10.0671 17.3336C10.063 14.8502 8.01248 12.8409 5.48499 12.8355L5.48456 13.0355C7.90557 13.0407 9.86318 14.9643 9.86711 17.3339L10.0671 17.3336ZM9.47964 17.9118C9.80224 17.9118 10.0671 17.6548 10.0671 17.3338H9.86711C9.86711 17.5407 9.69548 17.7118 9.47964 17.7118V17.9118ZM1.48748 17.9118H9.47964V17.7118H1.48748V17.9118ZM0.9 17.3338C0.9 17.6548 1.16487 17.9118 1.48748 17.9118V17.7118C1.27163 17.7118 1.1 17.5407 1.1 17.3338H0.9ZM2.11022 16.8698C2.34627 15.2224 3.78427 13.9945 5.48449 13.9945V13.7945C3.68771 13.7945 2.16281 15.0926 1.91224 16.8414L2.11022 16.8698ZM2.02098 16.7556H2.01123V16.9556H2.02098V16.7556ZM8.95776 16.7556H2.02098V16.9556H8.95776V16.7556ZM5.48449 13.9945C7.18472 13.9945 8.62272 15.2224 8.85877 16.8698L9.05675 16.8414C8.80617 15.0926 7.28128 13.7945 5.48449 13.7945V13.9945Z" />
</svg>
`, ah = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5625 0.304688C7.75313 0.304688 3 3.51094 3 8.7C3 12 4.85625 13.875 5.98125 13.875C6.44531 13.875 6.7125 12.5813 6.7125 12.2156C6.7125 11.7797 5.60156 10.8516 5.60156 9.0375C5.60156 5.26875 8.47031 2.59688 12.1828 2.59688C15.375 2.59688 17.7375 4.41094 17.7375 7.74375C17.7375 10.2328 16.7391 14.9016 13.5047 14.9016C12.3375 14.9016 11.3391 14.0578 11.3391 12.8484C11.3391 11.0766 12.5766 9.36094 12.5766 7.53281C12.5766 4.42969 8.175 4.99219 8.175 8.74219C8.175 9.52969 8.27344 10.4016 8.625 11.1188C7.97813 13.9031 6.65625 18.0516 6.65625 20.9203C6.65625 21.8063 6.78281 22.6781 6.86719 23.5641C7.02656 23.7422 6.94688 23.7234 7.19063 23.6344C9.55313 20.4 9.46875 19.7672 10.5375 15.5344C11.1141 16.6313 12.6047 17.2219 13.7859 17.2219C18.7641 17.2219 21 12.3703 21 7.99688C21 3.34219 16.9781 0.304688 12.5625 0.304688Z"/>
</svg>
`, ch = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.18 20C7.38398 20 8.36 19.024 8.36 17.82C8.36 16.616 7.38398 15.64 6.18 15.64C4.97602 15.64 4 16.616 4 17.82C4 19.024 4.97602 20 6.18 20Z"/>
<path d="M4 4.44V7.27C11.03 7.27 16.73 12.97 16.73 20H19.56C19.56 11.41 12.59 4.44 4 4.44ZM4 10.1V12.93C7.9 12.93 11.07 16.1 11.07 20H13.9C13.9 14.53 9.47 10.1 4 10.1Z"/>
</svg>
`, lh = `<svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.19043 22.1904C0.19043 34.2881 9.99753 44.0952 22.0952 44.0952C34.1929 44.0952 44 34.2881 44 22.1904C44 10.0927 34.1929 0.285645 22.0952 0.285645C9.99753 0.285645 0.19043 10.0927 0.19043 22.1904ZM42.1746 22.1904C42.1746 33.2799 33.1847 42.2698 22.0952 42.2698C11.0057 42.2698 2.01583 33.2799 2.01583 22.1904C2.01583 11.1009 11.0057 2.11104 22.0952 2.11104C33.1847 2.11104 42.1746 11.1009 42.1746 22.1904ZM30.1697 26.5406H27.8761L25.9503 28.6906L20.5423 21.7943C23.2421 21.564 25.3696 19.292 25.3696 16.5276C25.3696 13.611 23.0021 11.238 20.0918 11.238H13.8809V30.1682H15.5905V21.8172H18.3889L24.7925 29.983L21.733 33.3991L21.761 33.4245H24.004L25.8632 31.3488L27.4908 33.4245H29.662L27.0207 30.0564L30.1697 26.5406ZM20.0918 12.9514H15.5905V20.1039H20.0918C22.0595 20.1039 23.66 18.4996 23.66 16.5276C23.66 14.5556 22.0595 12.9514 20.0918 12.9514Z" />
</svg>
`, dh = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.6667 18.68V9.33333H15V18.68H11L16.3333 24L21.6667 18.68H17.6667ZM8.33333 0L3 5.32H7V14.6667H9.66667V5.32H13.6667L8.33333 0Z"/>
</svg>
`, hh = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 22.8182H4.36364V9.72727H0V22.8182ZM24 10.8182C24 9.61818 23.0182 8.63636 21.8182 8.63636H14.9345L15.9709 3.65091L16.0036 3.30182C16.0036 2.85455 15.8182 2.44 15.5236 2.14545L14.3673 1L7.18909 8.18909C6.78545 8.58182 6.54545 9.12727 6.54545 9.72727V20.6364C6.54545 21.8364 7.52727 22.8182 8.72727 22.8182H18.5455C19.4509 22.8182 20.2255 22.2727 20.5527 21.4873L23.8473 13.7964C23.9455 13.5455 24 13.2836 24 13V10.8182Z"/>
</svg>
`, uh = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 12.0526L18.9474 7V10.7895H0V13.3158H18.9474V17.1053L24 12.0526Z"/>
</svg>
`, ph = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.8 5L19.548 7.748L13.692 13.604L8.892 8.804L0 17.708L1.692 19.4L8.892 12.2L13.692 17L21.252 9.452L24 12.2V5H16.8Z"/>
</svg>
`, fh = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.533 7.11169C21.5482 7.32488 21.5482 7.53811 21.5482 7.7513C21.5482 14.2538 16.599 21.7462 7.5533 21.7462C4.76648 21.7462 2.17767 20.9391 0 19.5381C0.395953 19.5838 0.776625 19.599 1.18781 19.599C3.48727 19.599 5.60405 18.8224 7.29441 17.4975C5.13197 17.4518 3.31978 16.0356 2.69541 14.0863C3 14.132 3.30455 14.1624 3.62437 14.1624C4.06598 14.1624 4.50764 14.1015 4.91878 13.995C2.66498 13.5381 0.974578 11.5584 0.974578 9.16753V9.10664C1.62937 9.47213 2.39086 9.70055 3.19791 9.73097C1.87303 8.8477 1.00505 7.34011 1.00505 5.63452C1.00505 4.72083 1.24866 3.88327 1.67508 3.1523C4.09641 6.13706 7.73602 8.08627 11.8172 8.2995C11.7411 7.93402 11.6954 7.55335 11.6954 7.17263C11.6954 4.46194 13.8883 2.25385 16.6141 2.25385C18.0304 2.25385 19.3095 2.84775 20.208 3.80714C21.3197 3.59395 22.3857 3.18277 23.3299 2.61933C22.9643 3.76149 22.1877 4.72088 21.1674 5.32997C22.1573 5.22342 23.1167 4.94925 23.9999 4.56858C23.33 5.54316 22.4924 6.41114 21.533 7.11169Z"/>
</svg>
`, gh = k`@import '../../design-tokens/core/scss/theming/component';


/**
 * 1) Graphic used to supplement text or represent functionality
 */

:host{
  display: flex;
  --cre8-u-icon-display: block;
};

.cre8-c-icon-wrapper {
  align-items: var(--cre8-u-icon-align-items);
  justify-content: var(--cre8-u-icon-justify-content);
  animation: var(--cre8-loading-animation, --cre8-icon-animation, none);
  margin: var(--cre8-icon-margin, 0);
}

.cre8-c-icon {
  height: var(--cre8-icon-height, calc(8px * 2));
  width: var(--cre8-icon-width, calc(8px * 2));
  fill: var(--cre8-icon-fill, currentColor);
}  
// stylelint-disable selector-no-qualifying-type, max-nesting-depth
cre8-icon {
    display: inline-flex;
    vertical-align: middle;

    &[spin] {
        @media (prefers-reduced-motion) {
            &:not([spin='false']) {
                // stylelint-disable-next-line declaration-no-important
                animation-duration: 6400ms !important;
            }
        }
        
        &:not([spin='false']) {
            animation-duration: 2000ms;
            animation-iteration-count: infinite;
            animation-name: spin;
            animation-timing-function: linear;
        }
    }

    &[pulse] {
        @media (prefers-reduced-motion) {
            &:not([pulse='false']) {
                svg {
                    * {
                        // stylelint-disable-next-line declaration-no-important
                        animation-duration: 3s !important;
                        animation-timing-function: linear;
                    }
                }
            }
        }

        &:not([pulse='false']) {
            svg {
                * {
                    animation: pulse 1.5s ease-in-out infinite;
                }
            }
        }
    }

    &[flip='vertical'] {
        transform: scaleY(-1);
    }
    
    &[flip='horizontal'] {
        transform: scaleX(-1);
    }
    
    &[flip='both'] {
        transform: scaleX(-1) scaleY(-1);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
  
    100% {
        opacity: 1;
    }
}
`, bh = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg">
<symbol id="add" viewBox="0 0 24 24">
<path d="M24 13.7143H13.7143V24H10.2857V13.7143H0V10.2857H10.2857V0H13.7143V10.2857H24V13.7143Z"/>

</symbol>
<symbol id="arrow-back" viewBox="0 0 24 24">
<g clip-path="url(#clip0)">
<path d="M24 10.5H5.745L14.13 2.115L12 0L0 12L12 24L14.115 21.885L5.745 13.5H24V10.5Z"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>

</symbol>
<symbol id="arrow-forward" viewBox="0 0 24 24">
<g clip-path="url(#clip0)">
<path d="M12 0L9.885 2.115L18.255 10.5H0V13.5H18.255L9.885 21.885L12 24L24 12L12 0Z"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>

</symbol>
<symbol id="attention" viewBox="0 0 17 16">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.36656 11.9975C3.13155 11.9975 0.5 9.34649 0.5 6.0876C0.5 2.82881 3.1316 0.177734 6.36656 0.177734H10.6337C13.8686 0.177734 16.5 2.82881 16.5 6.0876C16.5 8.40676 15.1824 10.4777 13.1063 11.447L13.1171 15.3224C13.1176 15.5221 12.9999 15.7027 12.818 15.7816C12.7559 15.8086 12.6894 15.8222 12.6222 15.8222C12.496 15.8222 12.3738 15.7736 12.2813 15.685L8.43372 11.9975H6.36656Z"/>

</symbol>
<symbol id="bold-arrow-up" viewBox="0 0 32 32">
<title>bold-arrow-up</title>
<path d="M16 1l-15 15h9v16h12v-16h9z"/>

</symbol>
<symbol id="calendar" viewBox="0 0 32 32">
<title>calendar</title>
<path d="M10 12h4v4h-4zM16 12h4v4h-4zM22 12h4v4h-4zM4 24h4v4h-4zM10 24h4v4h-4zM16 24h4v4h-4zM10 18h4v4h-4zM16 18h4v4h-4zM22 18h4v4h-4zM4 18h4v4h-4zM26 0v2h-4v-2h-14v2h-4v-2h-4v32h30v-32h-4zM28 30h-26v-22h26v22z"/>

</symbol>
<symbol id="caret-down" viewBox="0 0 12 6">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 0.666667C11.25 0.847223 11.1851 1.00347 11.0552 1.13542L6.46143 5.80208C6.33154 5.93403 6.17774 6 6 6C5.82226 6 5.66846 5.93403 5.53857 5.80208L0.944824 1.13542C0.814941 1.00347 0.75 0.847223 0.75 0.666667C0.75 0.48611 0.814941 0.329862 0.944824 0.197917C1.07471 0.0659716 1.22851 0 1.40625 0H10.5938C10.7715 0 10.9253 0.0659716 11.0552 0.197917C11.1851 0.329862 11.25 0.48611 11.25 0.666667Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.25 0.666667C11.25 0.847223 11.1851 1.00347 11.0552 1.13542L6.46143 5.80208C6.33154 5.93403 6.17774 6 6 6C5.82226 6 5.66846 5.93403 5.53857 5.80208L0.944824 1.13542C0.814941 1.00347 0.75 0.847223 0.75 0.666667C0.75 0.48611 0.814941 0.329862 0.944824 0.197917C1.07471 0.0659716 1.22851 0 1.40625 0H10.5938C10.7715 0 10.9253 0.0659716 11.0552 0.197917C11.1851 0.329862 11.25 0.48611 11.25 0.666667Z"/>

</symbol>
<symbol id="check-circle" viewBox="0 0 24 24">
<path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96452 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1218 15.6557 10.039 15.6004 9.96938 15.5306L7.71938 13.2806C7.57865 13.1399 7.49959 12.949 7.49959 12.75C7.49959 12.551 7.57865 12.3601 7.71938 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44903 11.9996 8.6399 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.2891 9.14969 15.3718 9.09442 15.4628 9.0567C15.5539 9.01899 15.6515 8.99958 15.75 8.99958C15.8486 8.99958 15.9461 9.01899 16.0372 9.0567C16.1282 9.09442 16.2109 9.14969 16.2806 9.21937C16.3503 9.28906 16.4056 9.37178 16.4433 9.46283C16.481 9.55387 16.5004 9.65145 16.5004 9.75C16.5004 9.84855 16.481 9.94613 16.4433 10.0372C16.4056 10.1282 16.3503 10.2109 16.2806 10.2806Z" fill="#2D2D2D"/>

</symbol>
<symbol id="check" viewBox="0 0 24 24">
<path d="M7.62706 17.4355L1.93746 11.7459L0 13.6697L7.62706 21.2968L24 4.92382L22.0762 3L7.62706 17.4355Z"/>

</symbol>
<symbol id="close" viewBox="0 0 24 24">
<g clip-path="url(#clip0)">
<path d="M24 2.41714L21.5829 0L12 9.58286L2.41714 0L0 2.41714L9.58286 12L0 21.5829L2.41714 24L12 14.4171L21.5829 24L24 21.5829L14.4171 12L24 2.41714Z"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>

</symbol>
<symbol id="delta-down" viewBox="0 0 24 24">
<path d="M1.61487 5H22.3851C23.822 5 24.5405 6.73556 23.5233 7.75269L13.1422 18.1419C12.5126 18.7715 11.4874 18.7715 10.8578 18.1419L0.476659 7.75269C-0.540462 6.73556 0.177981 5 1.61487 5Z"/>

</symbol>
<symbol id="delta-up" viewBox="0 0 24 24">
<path d="M22.3828 18.6107H1.61718C0.179299 18.6107 -0.540772 16.8722 0.475946 15.8555L10.8587 5.47269C11.489 4.84244 12.511 4.84244 13.1412 5.47269L23.524 15.8555C24.5408 16.8722 23.8207 18.6107 22.3828 18.6107Z"/>

</symbol>
<symbol id="download" viewBox="0 0 24 24">
<path d="M2 24H21.7647V21.1765H2V24ZM21.7647 8.47059H16.1176V0H7.64706V8.47059H2L11.8824 18.3529L21.7647 8.47059Z"/>

</symbol>
<symbol id="edit" viewBox="0 0 16 16">
<g id="edit">
<path id="&#xF0;&#x178;&#x2013;&#x8D; icon color" fill-rule="evenodd" clip-rule="evenodd" d="M9.96354 1.84117C9.94878 1.8529 9.93456 1.86558 9.92097 1.87922L0.778116 11.0545C0.766444 11.0752 0.754799 11.0947 0.743545 11.1135C0.691872 11.2002 0.64843 11.273 0.64843 11.3798L0 15.3493C0 15.5445 0 15.6747 0.129686 15.8699C0.185139 15.9187 0.336764 16 0.518744 16L4.47416 15.2842C4.49293 15.2802 4.51051 15.2769 4.52726 15.2736C4.62256 15.2553 4.69107 15.2422 4.79838 15.1541L13.9412 5.9788L13.9414 5.97422L15.3679 4.59847C16.2109 3.90443 16.2109 2.57945 15.3679 1.75922L14.2007 0.623525C13.4875 -0.196703 12.0749 -0.213285 11.232 0.606942L9.96354 1.84117ZM11.0527 2.29683L13.6534 4.908L14.6547 3.89649C15.0438 3.50605 15.0438 2.85532 14.6547 2.46489L13.4875 1.29357C13.0985 0.903137 12.4501 0.903137 12.061 1.29357L11.0527 2.29683ZM1.68584 11.7052L1.1671 14.8287L4.27956 14.3081L4.63633 13.9501L2.04261 11.3472L1.68584 11.7052ZM2.75589 10.6314L10.31 3.05053L12.9037 5.65345L5.3496 13.2343L2.75589 10.6314Z" fill="#515761"/>
</g>

</symbol>
<symbol id="ellipsis" viewBox="0 0 24 24">
<path d="M15.4839 12.4839C15.4839 14.4097 13.9258 15.9677 12 15.9677C10.0742 15.9677 8.51613 14.4097 8.51613 12.4839C8.51613 10.5581 10.0742 9 12 9C13.9258 9 15.4839 10.5581 15.4839 12.4839ZM20.5161 9C18.5903 9 17.0323 10.5581 17.0323 12.4839C17.0323 14.4097 18.5903 15.9677 20.5161 15.9677C22.4419 15.9677 24 14.4097 24 12.4839C24 10.5581 22.4419 9 20.5161 9ZM3.48387 9C1.55806 9 0 10.5581 0 12.4839C0 14.4097 1.55806 15.9677 3.48387 15.9677C5.40968 15.9677 6.96774 14.4097 6.96774 12.4839C6.96774 10.5581 5.40968 9 3.48387 9Z"/>

</symbol>
<symbol id="email" viewBox="0 0 24 24">
<path d="M21.6 2H2.4C1.08 2 0.012 3.08 0.012 4.4L0 18.8C0 20.12 1.08 21.2 2.4 21.2H21.6C22.92 21.2 24 20.12 24 18.8V4.4C24 3.08 22.92 2 21.6 2ZM21.6 6.8L12 12.8L2.4 6.8V4.4L12 10.4L21.6 4.4V6.8Z"/>

</symbol>
<symbol id="envelope" viewBox="0 0 24 24">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.76745 4H22.2093C23.3208 4 24 5.00758 24 5.78008V18.2072C24 19.241 23.077 20 22.2005 20H1.81152C0.740495 20 0 19.0409 0 18.2836V5.77288C0 4.88644 0.826009 4 1.76745 4ZM1.53918 7.38281V17.926C1.53918 18.1752 1.71744 18.3694 1.92409 18.3694H22.0756C22.2823 18.3694 22.4605 18.1752 22.4605 17.926V7.38282L13.6319 13.6025C13.1447 13.9453 12.5778 14.1251 12 14.1251C11.4222 14.1251 10.8553 13.9453 10.3679 13.6024L1.53918 7.38281ZM11.2211 12.1181L2.15859 5.73437L21.8406 5.73438L12.7784 12.1181C12.3043 12.4522 11.6952 12.4522 11.2211 12.1181Z"/>

</symbol>
<symbol id="error-alt" viewBox="0 0 16 16"><path d="m15.69,4.37L11.63.31c-.2-.2-.47-.31-.75-.31h-5.74c-.28,0-.55.11-.75.31L.31,4.37c-.2.2-.31.47-.31.75v5.74c0,.28.11.55.31.75l4.17,4.17c.13.13.31.21.5.21h5.89c.28,0,.55-.11.75-.31l4.06-4.06c.2-.2.31-.47.31-.75v-5.74c0-.28-.11-.55-.31-.75Zm-7.69,9.13c-.69,0-1.25-.56-1.25-1.25s.56-1.25,1.25-1.25,1.25.56,1.25,1.25-.56,1.25-1.25,1.25Zm1.02-3.86c0,.1-.04.18-.11.26-.07.07-.16.11-.26.11h-1.26c-.1,0-.19-.04-.26-.11-.07-.07-.11-.16-.11-.26l-.53-6.27c0-.1.04-.18.11-.26.07-.07.16-.11.26-.11h2.38c.1,0,.19.04.26.11.07.07.11.16.11.26l-.59,6.27Z"/>
</symbol>
<symbol id="error-round" viewBox="0 0 24 24">
<path d="M12 1.875C9.99747 1.875 8.0399 2.46882 6.37486 3.58137C4.70981 4.69392 3.41206 6.27523 2.64572 8.12533C1.87939 9.97543 1.67888 12.0112 2.06955 13.9753C2.46023 15.9393 3.42454 17.7435 4.84055 19.1595C6.25656 20.5755 8.06066 21.5398 10.0247 21.9305C11.9888 22.3211 14.0246 22.1206 15.8747 21.3543C17.7248 20.5879 19.3061 19.2902 20.4186 17.6251C21.5312 15.9601 22.125 14.0025 22.125 12C22.122 9.3156 21.0543 6.74199 19.1562 4.84383C17.258 2.94567 14.6844 1.87798 12 1.875ZM12 19.875C10.4425 19.875 8.91993 19.4131 7.62489 18.5478C6.32985 17.6825 5.32049 16.4526 4.72445 15.0136C4.12841 13.5747 3.97246 11.9913 4.27632 10.4637C4.58018 8.93606 5.3302 7.53287 6.43154 6.43153C7.53288 5.3302 8.93607 4.58017 10.4637 4.27632C11.9913 3.97246 13.5747 4.12841 15.0136 4.72445C16.4526 5.32049 17.6825 6.32985 18.5478 7.62488C19.4131 8.91992 19.875 10.4425 19.875 12C19.8728 14.0879 19.0424 16.0896 17.566 17.566C16.0896 19.0424 14.0879 19.8728 12 19.875ZM10.875 12.375V7.5C10.875 7.20163 10.9935 6.91548 11.2045 6.7045C11.4155 6.49353 11.7016 6.375 12 6.375C12.2984 6.375 12.5845 6.49353 12.7955 6.7045C13.0065 6.91548 13.125 7.20163 13.125 7.5V12.375C13.125 12.6734 13.0065 12.9595 12.7955 13.1705C12.5845 13.3815 12.2984 13.5 12 13.5C11.7016 13.5 11.4155 13.3815 11.2045 13.1705C10.9935 12.9595 10.875 12.6734 10.875 12.375ZM13.5 16.125C13.5 16.4217 13.412 16.7117 13.2472 16.9584C13.0824 17.205 12.8481 17.3973 12.574 17.5108C12.2999 17.6244 11.9983 17.6541 11.7074 17.5962C11.4164 17.5383 11.1491 17.3954 10.9393 17.1857C10.7296 16.9759 10.5867 16.7086 10.5288 16.4176C10.4709 16.1267 10.5007 15.8251 10.6142 15.551C10.7277 15.2769 10.92 15.0426 11.1666 14.8778C11.4133 14.713 11.7033 14.625 12 14.625C12.3978 14.625 12.7794 14.783 13.0607 15.0643C13.342 15.3456 13.5 15.7272 13.5 16.125Z" fill="#343330"/>

</symbol>
<symbol id="error" viewBox="0 0 24 24">
<path d="M12 1.875C9.99747 1.875 8.0399 2.46882 6.37486 3.58137C4.70981 4.69392 3.41206 6.27523 2.64572 8.12533C1.87939 9.97543 1.67888 12.0112 2.06955 13.9753C2.46023 15.9393 3.42454 17.7435 4.84055 19.1595C6.25656 20.5755 8.06066 21.5398 10.0247 21.9305C11.9888 22.3211 14.0246 22.1206 15.8747 21.3543C17.7248 20.5879 19.3061 19.2902 20.4186 17.6251C21.5312 15.9601 22.125 14.0025 22.125 12C22.122 9.3156 21.0543 6.74199 19.1562 4.84383C17.258 2.94567 14.6844 1.87798 12 1.875ZM12 19.875C10.4425 19.875 8.91993 19.4131 7.62489 18.5478C6.32985 17.6825 5.32049 16.4526 4.72445 15.0136C4.12841 13.5747 3.97246 11.9913 4.27632 10.4637C4.58018 8.93606 5.3302 7.53287 6.43154 6.43153C7.53288 5.3302 8.93607 4.58017 10.4637 4.27632C11.9913 3.97246 13.5747 4.12841 15.0136 4.72445C16.4526 5.32049 17.6825 6.32985 18.5478 7.62488C19.4131 8.91992 19.875 10.4425 19.875 12C19.8728 14.0879 19.0424 16.0896 17.566 17.566C16.0896 19.0424 14.0879 19.8728 12 19.875ZM10.875 12.375V7.5C10.875 7.20163 10.9935 6.91548 11.2045 6.7045C11.4155 6.49353 11.7016 6.375 12 6.375C12.2984 6.375 12.5845 6.49353 12.7955 6.7045C13.0065 6.91548 13.125 7.20163 13.125 7.5V12.375C13.125 12.6734 13.0065 12.9595 12.7955 13.1705C12.5845 13.3815 12.2984 13.5 12 13.5C11.7016 13.5 11.4155 13.3815 11.2045 13.1705C10.9935 12.9595 10.875 12.6734 10.875 12.375ZM13.5 16.125C13.5 16.4217 13.412 16.7117 13.2472 16.9584C13.0824 17.205 12.8481 17.3973 12.574 17.5108C12.2999 17.6244 11.9983 17.6541 11.7074 17.5962C11.4164 17.5383 11.1491 17.3954 10.9393 17.1857C10.7296 16.9759 10.5867 16.7086 10.5288 16.4176C10.4709 16.1267 10.5007 15.8251 10.6142 15.551C10.7277 15.2769 10.92 15.0426 11.1666 14.8778C11.4133 14.713 11.7033 14.625 12 14.625C12.3978 14.625 12.7794 14.783 13.0607 15.0643C13.342 15.3456 13.5 15.7272 13.5 16.125Z"/>

</symbol>
<symbol id="pharmacy" viewBox="0 0 45 24">
<path d="M6.5 6.03516V18.0139H15.0511V16.3152H8.33659V12.8007H13.817V11.1459H8.33659V7.68992H14.8014V6.03516H6.5Z"/>
<path d="M31.2126 7.69285H33.8132C35.6351 7.69285 36.6489 8.5422 36.6489 10.0652C36.6489 11.6614 35.6939 12.5107 33.9014 12.5107H31.2126V7.69285ZM36.4285 6.53598C35.7086 6.19916 34.8564 6.02344 33.8132 6.02344H29.3613V18.0168H31.2126V14.1508H33.9161C35.4735 14.1508 36.6636 13.7701 37.4423 12.9793C38.1476 12.2764 38.5002 11.2953 38.5002 10.0505C38.5002 8.42505 37.7802 7.19495 36.4285 6.53598Z"/>
<path d="M26.7284 6.00542L22.6974 10.0231L24.3596 11.6798L28.3907 7.66218L26.7284 6.00542Z"/>
<path d="M20.3714 12.3522L16.2988 16.4113L17.9611 18.0681L22.0337 14.009L20.3714 12.3522Z"/>
<path d="M17.9533 6L16.291 7.65676L20.2805 11.633L21.9427 9.97623L17.9533 6Z"/>
<path d="M24.4313 12.4841L22.769 14.1409L26.7169 18.0757L28.3792 16.419L24.4313 12.4841Z"/>

</symbol>
<symbol id="external-file" viewBox="0 0 12 13">
<path d="M10.6667 11.1667H1.33333V1.83333H6V0.5H1.33333C0.593333 0.5 0 1.1 0 1.83333V11.1667C0 11.9 0.593333 12.5 1.33333 12.5H10.6667C11.4 12.5 12 11.9 12 11.1667V6.5H10.6667V11.1667ZM7.33333 0.5V1.83333H9.72667L3.17333 8.38667L4.11333 9.32667L10.6667 2.77333V5.16667H12V0.5H7.33333Z"/>

</symbol>
<symbol id="facebook" viewBox="0 0 24 24">
<path d="M17.5847 13.5L18.2513 9.15656H14.0836V6.33797C14.0836 5.14969 14.6658 3.99141 16.5324 3.99141H18.4271V0.293438C18.4271 0.293438 16.7077 0 15.0638 0C11.6316 0 9.38815 2.08031 9.38815 5.84625V9.15656H5.573V13.5H9.38815V24H14.0836V13.5H17.5847Z"/>

</symbol>
<symbol id="find-drug" viewBox="0 0 24 24">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.7739 5.59104C16.7739 6.36535 16.4731 7.09165 15.9257 7.63883L12.2616 11.3031L8.16595 7.20731L11.83 3.54342C12.3774 2.99608 13.1039 2.69518 13.8779 2.69518C14.652 2.69518 15.3785 2.99607 15.9259 3.54342C16.4732 4.09087 16.7739 4.81703 16.7739 5.59104ZM3.54066 11.832L7.2047 8.16797L11.3004 12.2638L7.63627 15.9277C7.08879 16.4752 6.36243 16.7761 5.58845 16.7761C4.81446 16.7761 4.08811 16.4752 3.54062 15.9277C2.99336 15.3804 2.69238 14.6539 2.69238 13.8799C2.69238 13.1059 2.99331 12.3795 3.54066 11.832ZM13.8779 1.33594C12.7419 1.33594 11.6724 1.77895 10.869 2.58239L6.72436 6.72701L2.57995 10.8714C1.77653 11.675 1.3335 12.7443 1.3335 13.8803C1.3335 15.0163 1.77659 16.0858 2.57995 16.8892C3.38312 17.6926 4.45235 18.1354 5.58863 18.1354C6.72496 18.1354 7.79438 17.6925 8.59754 16.8892C8.59754 16.8892 12.739 12.754 12.7421 12.7448L12.7421 12.7448L12.743 12.7437L16.8867 8.59996C17.69 7.79669 18.133 6.72724 18.133 5.59128C18.133 4.45495 17.6901 3.38553 16.8867 2.58237C16.0835 1.77896 15.0141 1.33594 13.8779 1.33594ZM12.7466 12.7393L12.743 12.7437L12.7425 12.7442L12.7466 12.7393ZM12.778 12.7004C12.7742 12.7053 12.7648 12.7169 12.7466 12.7393C12.7634 12.7191 12.7721 12.7084 12.778 12.7004ZM21.214 14.1896C20.2761 13.2516 19.0278 12.7344 17.7013 12.7344C16.375 12.7344 15.1266 13.2516 14.1886 14.1896C13.2505 15.1277 12.7334 16.3758 12.7334 17.7023C12.7334 19.0287 13.2505 20.2769 14.1886 21.2149C15.1313 22.1574 16.3917 22.6677 17.7013 22.6677C19.0109 22.6677 20.2712 22.1575 21.2141 21.215C23.1511 19.2777 23.151 16.1266 21.214 14.1896ZM20.2534 20.2566C21.4875 19.0225 21.6472 17.0918 20.6879 15.6797L15.6763 20.6913C17.0884 21.6504 19.0193 21.4907 20.2534 20.2566ZM15.1498 15.1509C15.8317 14.4688 16.7369 14.0938 17.7014 14.0938C18.4328 14.0938 19.1323 14.3103 19.727 14.7159L14.7149 19.7282C14.3093 19.1335 14.0928 18.4339 14.0928 17.7026C14.0928 16.738 14.4677 15.8328 15.1497 15.151L14.9596 14.9608L15.1498 15.1509Z"/>

</symbol>
<symbol id="globe" viewBox="0 0 16 16">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9.96661 14.4241C11.6165 13.9237 12.9965 12.8029 13.8354 11.3333H11.2975C10.9487 12.7195 10.4242 13.7362 9.96661 14.4241ZM8.11204 14.7105C8.69142 14.0313 9.43024 12.9258 9.89827 11.3333H6.10173C6.56959 12.9252 7.30805 14.0305 7.88732 14.7098C7.93218 14.7107 7.97715 14.7111 8.02222 14.7111C8.05221 14.7111 8.08215 14.7109 8.11204 14.7105ZM11.5553 10H14.4139C14.6071 9.37494 14.7111 8.71073 14.7111 8.02222C14.7111 7.31737 14.6021 6.63798 14.4 6H11.555C11.6398 6.61136 11.6889 7.27776 11.6889 8.00143C11.6889 8.72403 11.64 9.38948 11.5553 10ZM10.199 6C10.2982 6.61144 10.3556 7.27785 10.3556 8.00143C10.3556 8.72394 10.2984 9.3894 10.1995 10H5.80054C5.70165 9.3894 5.64444 8.72394 5.64444 8.00143C5.64444 7.27785 5.70182 6.61144 5.80098 6H10.199ZM11.2969 4.66667H13.8098C12.9748 3.22953 11.6198 2.13189 10.0025 1.63131C10.4511 2.31811 10.9572 3.31747 11.2969 4.66667ZM8.14947 1.33452C8.72262 2.01721 9.43951 3.10914 9.89755 4.66667H6.10245C6.56027 3.1099 7.27668 2.01828 7.84969 1.33552C7.90703 1.33406 7.96454 1.33333 8.02222 1.33333C8.06473 1.33333 8.10715 1.33373 8.14947 1.33452ZM4.31111 8.00143C4.31111 7.27776 4.36019 6.61136 4.44504 6H1.64446C1.44236 6.63798 1.33333 7.31737 1.33333 8.02222C1.33333 8.71073 1.43736 9.37494 1.63055 10H4.44467C4.36005 9.38948 4.31111 8.72403 4.31111 8.00143ZM4.70309 4.66667C5.03991 3.32892 5.54031 2.33511 5.98609 1.64888C4.39342 2.15727 3.06002 3.24612 2.23463 4.66667H4.70309ZM6.02197 14.4069C5.56711 13.7193 5.04836 12.708 4.70248 11.3333H2.20903C3.03842 12.7863 4.39684 13.8983 6.02197 14.4069Z"/>

</symbol>
<symbol id="hand-heart" viewBox="0 0 24 24">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.8633 6.37599C18.8633 4.00007 16.9586 2.06689 14.6169 2.06689C13.6521 2.06689 12.7366 2.3909 11.9886 2.99415C11.2408 2.39094 10.3251 2.06689 9.36004 2.06689C7.01834 2.06689 5.11365 4.00007 5.11365 6.37599C5.11365 7.46864 5.51888 8.51059 6.25344 9.30707C6.34663 9.40923 7.27838 10.3373 8.79443 11.8405C9.34465 12.3861 9.94116 12.977 10.5472 13.5769L11.568 14.5871C11.6819 14.6997 11.8324 14.7606 11.9886 14.7606C12.1447 14.7606 12.295 14.6998 12.4089 14.5871L13.4298 13.577C14.0373 12.9756 14.6328 12.3857 15.1824 11.8409C16.6989 10.3374 17.6297 9.41039 17.7224 9.30867C18.458 8.51064 18.8633 7.46882 18.8633 6.37599ZM17.6595 6.37603C17.6595 7.15902 17.3691 7.90502 16.8411 8.47811C16.7113 8.61872 14.6385 10.6761 11.9887 13.2983C9.33771 10.675 7.26583 8.61846 7.13464 8.47643C6.60784 7.90485 6.3176 7.15879 6.3176 6.37603C6.3176 4.67249 7.68278 3.28677 9.36014 3.28677C10.1933 3.28677 10.9707 3.62382 11.5503 4.23657C11.7786 4.47775 12.1986 4.47765 12.427 4.23662C13.0068 3.62395 13.7842 3.28677 14.617 3.28677C16.2943 3.28677 17.6595 4.67249 17.6595 6.37603Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.93161 5.6856C2.31754 5.70342 2.68601 5.8379 2.98255 6.16806C3.35404 6.58167 3.54636 7.22971 3.54671 8.14149C3.5469 8.61064 3.54749 8.97662 3.54876 9.54947L3.54989 10.0687C3.55144 10.8491 3.55127 11.4775 3.54848 12.3103C3.60735 12.2143 3.67628 12.1191 3.75528 12.0247C4.1594 11.6181 4.65803 11.4673 5.11039 11.6081C5.46132 11.7173 5.71276 11.9047 6.19135 12.3557C6.31595 12.4775 6.68621 12.8237 7.05785 13.1712C7.40791 13.4986 7.75921 13.8271 7.90759 13.9702C8.2716 14.3213 8.5854 14.64 8.86943 14.9511C9.97137 16.1582 10.5701 17.1726 10.6366 18.2185L10.638 18.7353C10.6391 19.1903 10.6396 19.65 10.6394 20.079C10.6389 20.9361 10.6354 21.5452 10.6279 21.8047C10.6187 22.0995 10.3772 22.3337 10.0827 22.3335H5.45546C5.15426 22.3335 4.91009 22.0891 4.91007 21.7876V20.6296L0.447721 15.635L0.266275 15.3786C0.22202 15.2877 0.192818 15.1806 0.160963 15.0296C0.121543 14.8428 0.0930125 14.6161 0.0706823 14.3291C0.0326036 13.8398 0.0141141 13.2037 0.0102116 12.3903C0.00847483 12.0283 0.00907258 11.6465 0.0115811 11.1268L0.0137272 10.7164C0.0214539 9.2968 0.0203448 8.73215 0.00182946 8.159C-0.0453225 6.6994 0.824869 5.63441 1.93161 5.6856ZM4.51606 15.0669C4.3093 14.848 4.09273 14.6461 3.84355 14.4345C3.74788 14.3532 3.65217 14.2744 3.52849 14.1744C3.5729 14.2103 3.30164 13.9916 3.23777 13.9393C3.00267 13.7468 2.86513 13.6216 2.7432 13.4792C2.56095 13.2663 2.45494 13.0325 2.45601 12.7716C2.46044 11.6918 2.46101 10.986 2.4592 10.0716L2.45806 9.54983C2.45678 8.9784 2.4562 8.61178 2.45601 8.14176C2.45576 7.47858 2.34123 7.08322 2.17654 6.89986C2.09231 6.80608 2.0282 6.78324 1.88955 6.77683C1.44592 6.75629 1.06349 7.22619 1.09251 8.1243C1.11188 8.72388 1.113 9.30196 1.10492 10.733L1.10319 11.045C1.10017 11.6179 1.09935 12.0099 1.10117 12.3877C1.10542 13.2744 1.11837 13.8187 1.15148 14.2441C1.16941 14.4746 1.19517 14.6736 1.22311 14.806C1.22647 14.8219 1.23141 14.8376 1.23774 14.8532C1.24267 14.8654 1.24765 14.8759 1.25554 14.8911L1.27086 14.9111C1.27976 14.9226 1.28178 14.9252 1.28305 14.9298L5.86459 20.0547C5.95577 20.1581 6.00449 20.2922 6.00103 20.423V21.2417H9.54044C9.54389 20.8489 9.54576 20.2734 9.54634 19.5772C9.5466 19.2566 9.54653 18.8891 9.54648 18.624L9.5465 18.2749C9.49133 17.5631 8.96276 16.6775 8.05785 15.6862C7.75887 15.3587 7.42297 15.0197 7.01589 14.6296C6.92656 14.544 6.69786 14.3294 6.43896 14.0864C6.0513 13.7227 5.59545 13.2949 5.4391 13.1422C5.13561 12.8562 4.90412 12.6863 4.78665 12.6498C4.70677 12.6249 4.70462 12.6256 4.59067 12.7353C4.57716 12.7499 4.57094 12.7566 4.56656 12.761C4.39746 12.9693 4.34462 13.0959 4.35469 13.1858C4.36683 13.2943 4.48781 13.4846 4.75581 13.7588L4.85584 13.8617C4.9356 13.9438 5.03812 14.0492 5.07886 14.0908C5.15928 14.1727 5.22942 14.243 5.28122 14.2947C5.30591 14.3154 5.32873 14.3382 5.3307 14.3427C5.39749 14.4079 5.46152 14.4699 5.56593 14.5706C5.93772 14.9293 6.06585 15.0549 6.24401 15.2394C6.3007 15.298 6.35446 15.3549 6.40771 15.4126C6.53937 15.5582 6.5831 15.7632 6.5223 15.9499C6.46152 16.1366 6.30552 16.2765 6.11344 16.3165C5.92136 16.3565 5.72258 16.2905 5.5962 16.1478C5.34823 15.8793 5.09497 15.6254 4.60051 15.1426C4.56718 15.1186 4.53764 15.0919 4.51606 15.0669Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M20.4512 9.54957L20.4501 10.0688C20.4485 10.8486 20.4487 11.4767 20.4515 12.3086C20.3946 12.216 20.3286 12.1247 20.2535 12.0348C20.2381 12.0181 20.232 12.0115 20.2257 12.0053L20.2106 11.9909C19.8406 11.6181 19.342 11.4674 18.8896 11.6082C18.5386 11.7174 18.2872 11.9048 17.8122 12.3524C17.6855 12.4761 17.3128 12.8246 16.9399 13.1733C16.5903 13.5003 16.2404 13.8275 16.0924 13.9703C15.7284 14.3213 15.4146 14.6401 15.1305 14.9512C14.0286 16.1583 13.4298 17.1727 13.3634 18.2354L13.3619 18.7352C13.3609 19.1903 13.3603 19.65 13.3606 20.0791C13.3611 20.9362 13.3646 21.5453 13.372 21.8041C13.3813 22.0996 13.6228 22.3337 13.9174 22.3336H18.5445C18.8457 22.3336 19.0899 22.0892 19.0899 21.7877V20.6297L23.5778 15.6094L23.7337 15.3787C23.7779 15.2877 23.8072 15.1806 23.839 15.0296C23.8784 14.8429 23.907 14.6161 23.9293 14.3292C23.9674 13.8398 23.9859 13.2038 23.9898 12.3903C23.9915 12.0284 23.9909 11.6465 23.9884 11.1269L23.9862 10.7164C23.9785 9.29684 23.9796 8.73219 23.9981 8.15906C24.0453 6.69946 23.1751 5.63446 22.0683 5.68561C21.6824 5.70349 21.3139 5.83796 21.0174 6.16812C20.6459 6.58174 20.4536 7.22978 20.4533 8.14156C20.4531 8.61071 20.4525 8.9767 20.4512 9.54957ZM22.7768 14.8059C22.7733 14.8225 22.7684 14.8386 22.7623 14.8545C22.757 14.8685 22.752 14.8795 22.7403 14.9037L18.1365 20.0534C18.0441 20.1582 17.9954 20.2923 17.9989 20.4301L17.9989 21.2418H14.4595C14.456 20.849 14.4541 20.2734 14.4536 19.5772C14.4531 19.0434 14.4536 18.3767 14.454 18.2398C14.5031 17.5722 15.0325 16.6826 15.942 15.6862C16.241 15.3587 16.5769 15.0197 16.984 14.6296C17.1107 14.5082 17.5189 14.1262 17.8972 13.7722C18.1301 13.5542 18.352 13.3466 18.4904 13.2164L18.5691 13.1424C18.8783 12.8517 19.1024 12.6843 19.2132 12.6498C19.2931 12.6249 19.2953 12.6256 19.448 12.7753C19.6005 12.9648 19.6554 13.0943 19.6452 13.1858C19.6331 13.2943 19.5121 13.4846 19.2441 13.7588L19.1441 13.8617C19.0643 13.9437 18.9618 14.0492 18.921 14.0908C18.8406 14.1727 18.7705 14.243 18.7032 14.3087L18.6944 14.317C18.6904 14.3209 18.6866 14.325 18.6762 14.3359L18.4416 14.5626C18.0326 14.9572 17.8828 15.1047 17.6859 15.3123C17.6544 15.3455 17.6238 15.3781 17.5941 15.4104C17.4605 15.558 17.4168 15.763 17.4776 15.9498C17.5384 16.1365 17.6944 16.2764 17.8864 16.3164C18.0785 16.3564 18.2773 16.2904 18.4075 16.1435C18.6536 15.8771 18.906 15.624 19.4087 15.1331C19.436 15.1132 19.4613 15.0907 19.4845 15.0661C19.6906 14.8479 19.9072 14.6459 20.1563 14.4343C20.252 14.3531 20.3477 14.2743 20.4714 14.1743C20.427 14.2102 20.6982 13.9914 20.7621 13.9391C20.9972 13.7466 21.1348 13.6215 21.2567 13.479C21.4389 13.2661 21.5449 13.0324 21.5439 12.7715C21.5394 11.6917 21.5389 10.9859 21.5407 10.0714L21.5418 9.5497C21.5431 8.97827 21.5437 8.61165 21.5439 8.14163C21.5441 7.47845 21.6586 7.0831 21.8234 6.89972C21.9036 6.81034 21.9656 6.7854 22.1103 6.77683C22.554 6.7563 22.9364 7.22619 22.9074 8.1243C22.888 8.72381 22.8869 9.30178 22.895 10.7326L22.8967 11.0452C22.8997 11.6179 22.9005 12.0099 22.8987 12.3877C22.8945 13.2743 22.8815 13.8186 22.8484 14.2441C22.8305 14.4745 22.8047 14.6735 22.7768 14.8059Z"/>

</symbol>
<symbol id="help" viewBox="0 0 24 24">
<path d="M13.5 16.875C13.5 17.1717 13.412 17.4617 13.2472 17.7084C13.0824 17.955 12.8481 18.1473 12.574 18.2608C12.2999 18.3744 11.9983 18.4041 11.7074 18.3462C11.4164 18.2883 11.1491 18.1454 10.9393 17.9357C10.7296 17.7259 10.5867 17.4586 10.5288 17.1676C10.4709 16.8767 10.5007 16.5751 10.6142 16.301C10.7277 16.0269 10.92 15.7926 11.1666 15.6278C11.4133 15.463 11.7033 15.375 12 15.375C12.3978 15.375 12.7794 15.533 13.0607 15.8143C13.342 16.0956 13.5 16.4772 13.5 16.875ZM22.125 12C22.125 14.0025 21.5312 15.9601 20.4186 17.6251C19.3061 19.2902 17.7248 20.5879 15.8747 21.3543C14.0246 22.1206 11.9888 22.3211 10.0247 21.9305C8.06066 21.5398 6.25656 20.5755 4.84055 19.1595C3.42454 17.7435 2.46023 15.9393 2.06955 13.9753C1.67888 12.0112 1.87939 9.97543 2.64572 8.12533C3.41206 6.27523 4.70981 4.69392 6.37486 3.58137C8.0399 2.46882 9.99747 1.875 12 1.875C14.6844 1.87798 17.258 2.94567 19.1562 4.84383C21.0543 6.74199 22.122 9.3156 22.125 12ZM19.875 12C19.875 10.4425 19.4131 8.91992 18.5478 7.62488C17.6825 6.32985 16.4526 5.32049 15.0136 4.72445C13.5747 4.12841 11.9913 3.97246 10.4637 4.27632C8.93607 4.58017 7.53288 5.3302 6.43154 6.43153C5.3302 7.53287 4.58018 8.93606 4.27632 10.4637C3.97246 11.9913 4.12841 13.5747 4.72445 15.0136C5.32049 16.4526 6.32985 17.6825 7.62489 18.5478C8.91993 19.4131 10.4425 19.875 12 19.875C14.0879 19.8728 16.0896 19.0424 17.566 17.566C19.0424 16.0896 19.8728 14.0879 19.875 12ZM12 6C9.72563 6 7.875 7.68188 7.875 9.75V10.125C7.875 10.4234 7.99353 10.7095 8.20451 10.9205C8.41549 11.1315 8.70164 11.25 9 11.25C9.29837 11.25 9.58452 11.1315 9.7955 10.9205C10.0065 10.7095 10.125 10.4234 10.125 10.125V9.75C10.125 8.92313 10.9688 8.25 12 8.25C13.0313 8.25 13.875 8.92313 13.875 9.75C13.875 10.5769 13.0313 11.25 12 11.25C11.7016 11.25 11.4155 11.3685 11.2045 11.5795C10.9935 11.7905 10.875 12.0766 10.875 12.375V13.125C10.8743 13.4029 10.9766 13.6713 11.162 13.8783C11.3475 14.0854 11.603 14.2164 11.8793 14.2462C12.1557 14.276 12.4333 14.2025 12.6586 14.0398C12.8839 13.8771 13.0411 13.6367 13.0997 13.365C14.8416 12.9262 16.125 11.4722 16.125 9.75C16.125 7.68188 14.2744 6 12 6Z"/>

</symbol>
<symbol id="info" viewBox="0 0 24 24">
<path d="M12 21.75C10.0716 21.75 8.18657 21.1782 6.58319 20.1068C4.97982 19.0355 3.73013 17.5127 2.99218 15.7312C2.25422 13.9496 2.06114 11.9892 2.43735 10.0979C2.81355 8.20655 3.74215 6.46927 5.10571 5.10571C6.46928 3.74215 8.20656 2.81355 10.0979 2.43734C11.9892 2.06114 13.9496 2.25422 15.7312 2.99218C17.5127 3.73013 19.0355 4.97981 20.1068 6.58319C21.1782 8.18657 21.75 10.0716 21.75 12C21.7473 14.585 20.7192 17.0634 18.8913 18.8913C17.0634 20.7192 14.585 21.7473 12 21.75ZM11.25 16.5C11.25 16.6989 11.329 16.8897 11.4697 17.0303C11.6103 17.171 11.8011 17.25 12 17.25C12.1989 17.25 12.3897 17.171 12.5303 17.0303C12.671 16.8897 12.75 16.6989 12.75 16.5V11.25C12.75 11.0511 12.671 10.8603 12.5303 10.7197C12.3897 10.579 12.1989 10.5 12 10.5C11.8011 10.5 11.6103 10.579 11.4697 10.7197C11.329 10.8603 11.25 11.0511 11.25 11.25V16.5ZM12 6.75C11.7775 6.75 11.56 6.81598 11.375 6.9396C11.19 7.06321 11.0458 7.23891 10.9606 7.44448C10.8755 7.65005 10.8532 7.87625 10.8966 8.09448C10.94 8.3127 11.0472 8.51316 11.2045 8.67049C11.3618 8.82783 11.5623 8.93498 11.7805 8.97838C11.9988 9.02179 12.225 8.99951 12.4305 8.91436C12.6361 8.82922 12.8118 8.68502 12.9354 8.50002C13.059 8.31501 13.125 8.0975 13.125 7.875C13.125 7.57663 13.0065 7.29048 12.7955 7.07951C12.5845 6.86853 12.2984 6.75 12 6.75Z"/>

</symbol>
<symbol id="instagram" viewBox="0 0 24 24">
<g clip-path="url(#clip0)">
<path d="M11.9998 0C13.6248 0 14.6951 0.004 15.2106 0.012C15.7261 0.02 16.3043 0.0395 16.9453 0.0705C17.5863 0.1015 18.1371 0.164 18.5976 0.258C19.0581 0.352 19.4761 0.477 19.8516 0.633C20.2581 0.7895 20.6331 0.977 20.9766 1.1955C21.3201 1.414 21.6561 1.6875 21.9846 2.016C22.3131 2.3445 22.5866 2.6805 22.8051 3.024C23.0236 3.3675 23.2111 3.7425 23.3676 4.149C23.5241 4.524 23.6491 4.942 23.7426 5.403C23.8361 5.864 23.8986 6.41475 23.9301 7.05525C23.9616 7.69575 23.9811 8.274 23.9886 8.79C23.9961 9.306 24.0001 10.3762 24.0006 12.0007C24.0011 13.6252 23.9971 14.6955 23.9886 15.2115C23.9801 15.7275 23.9606 16.3057 23.9301 16.9462C23.8996 17.5868 23.8371 18.1375 23.7426 18.5985C23.6481 19.0595 23.5231 19.4775 23.3676 19.8525C23.2111 20.259 23.0236 20.634 22.8051 20.9775C22.5866 21.321 22.3131 21.657 21.9846 21.9855C21.6561 22.314 21.3201 22.5875 20.9766 22.806C20.6331 23.0245 20.2581 23.212 19.8516 23.3685C19.4766 23.525 19.0586 23.65 18.5976 23.7435C18.1366 23.837 17.5858 23.8995 16.9453 23.931C16.3048 23.9625 15.7266 23.982 15.2106 23.9895C14.6946 23.997 13.6243 24.001 11.9998 24.0015C10.3753 24.002 9.30507 23.998 8.78907 23.9895C8.27307 23.981 7.69482 23.9615 7.05432 23.931C6.41382 23.9005 5.86307 23.838 5.40207 23.7435C4.94107 23.649 4.52307 23.524 4.14807 23.3685C3.74157 23.212 3.36657 23.0245 3.02307 22.806C2.67957 22.5875 2.34356 22.314 2.01507 21.9855C1.68657 21.657 1.41307 21.321 1.19457 20.9775C0.976065 20.634 0.788565 20.259 0.632065 19.8525C0.475565 19.4775 0.350565 19.0595 0.257065 18.5985C0.163565 18.1375 0.101065 17.5868 0.0695651 16.9462C0.0380651 16.3057 0.0185651 15.7275 0.0110651 15.2115C0.0035651 14.6955 -0.000434896 13.6252 -0.000934896 12.0007C-0.0014349 10.3762 0.0025651 9.306 0.0110651 8.79C0.0195651 8.274 0.0390651 7.69575 0.0695651 7.05525C0.100065 6.41475 0.162565 5.864 0.257065 5.403C0.351565 4.942 0.476565 4.524 0.632065 4.149C0.788565 3.7425 0.976065 3.3675 1.19457 3.024C1.41307 2.6805 1.68657 2.3445 2.01507 2.016C2.34356 1.6875 2.67957 1.414 3.02307 1.1955C3.36657 0.977 3.74157 0.7895 4.14807 0.633C4.52307 0.4765 4.94107 0.3515 5.40207 0.258C5.86307 0.1645 6.41382 0.102 7.05432 0.0705C7.69482 0.039 8.27307 0.0195 8.78907 0.012C9.30507 0.0045 10.3753 0.0005 11.9998 0V0ZM11.9998 2.15625C10.3903 2.15625 9.33957 2.16025 8.84756 2.16825C8.35557 2.17625 7.78907 2.19575 7.14807 2.22675C6.57007 2.25825 6.10907 2.31675 5.76507 2.40225C5.42106 2.48775 5.13981 2.56975 4.92132 2.64825C4.63981 2.75775 4.39382 2.88275 4.18332 3.02325C3.97282 3.16375 3.75807 3.33575 3.53907 3.53925C3.33607 3.75825 3.16407 3.973 3.02307 4.1835C2.88207 4.394 2.75707 4.64 2.64807 4.9215C2.57007 5.1405 2.48807 5.42175 2.40207 5.76525C2.31607 6.10875 2.25757 6.56975 2.22657 7.14825C2.19507 7.78875 2.17557 8.35525 2.16807 8.84775C2.16057 9.34025 2.15656 10.391 2.15606 12C2.15557 13.609 2.15956 14.6597 2.16807 15.1522C2.17657 15.6447 2.19607 16.2113 2.22657 16.8517C2.25807 17.4298 2.31657 17.8907 2.40207 18.2347C2.48757 18.5788 2.56957 18.86 2.64807 19.0785C2.75757 19.36 2.88257 19.606 3.02307 19.8165C3.16357 20.027 3.33557 20.2418 3.53907 20.4608C3.75807 20.6637 3.97282 20.8358 4.18332 20.9767C4.39382 21.1178 4.63981 21.2428 4.92132 21.3517C5.14032 21.4298 5.42157 21.5118 5.76507 21.5978C6.10856 21.6838 6.56957 21.7423 7.14807 21.7733C7.78857 21.8048 8.35507 21.8242 8.84756 21.8317C9.34007 21.8392 10.3908 21.8433 11.9998 21.8438C13.6088 21.8442 14.6596 21.8403 15.1521 21.8317C15.6446 21.8232 16.2111 21.8038 16.8516 21.7733C17.4296 21.7418 17.8906 21.6833 18.2346 21.5978C18.5786 21.5123 18.8598 21.4303 19.0783 21.3517C19.3598 21.2423 19.6058 21.1173 19.8163 20.9767C20.0268 20.8363 20.2416 20.6642 20.4606 20.4608C20.6636 20.2418 20.8356 20.027 20.9766 19.8165C21.1176 19.606 21.2426 19.36 21.3516 19.0785C21.4296 18.8595 21.5116 18.5782 21.5976 18.2347C21.6836 17.8913 21.7421 17.4303 21.7731 16.8517C21.8046 16.2113 21.8241 15.6447 21.8316 15.1522C21.8391 14.6597 21.8431 13.609 21.8436 12C21.8441 10.391 21.8401 9.34025 21.8316 8.84775C21.8231 8.35525 21.8036 7.78875 21.7731 7.14825C21.7416 6.57025 21.6831 6.10925 21.5976 5.76525C21.5121 5.42125 21.4301 5.14 21.3516 4.9215C21.2421 4.64 21.1171 4.394 20.9766 4.1835C20.8361 3.973 20.6641 3.75825 20.4606 3.53925C20.2416 3.33625 20.0268 3.16425 19.8163 3.02325C19.6058 2.88225 19.3598 2.75725 19.0783 2.64825C18.8593 2.57025 18.5781 2.48825 18.2346 2.40225C17.8911 2.31625 17.4301 2.25775 16.8516 2.22675C16.2111 2.19525 15.6446 2.17575 15.1521 2.16825C14.6596 2.16075 13.6088 2.15675 11.9998 2.15625ZM11.9998 5.83575C12.8438 5.83575 13.6408 5.99975 14.3908 6.32775C15.1408 6.64025 15.7971 7.07775 16.3596 7.64025C16.9221 8.20275 17.3596 8.859 17.6721 9.609C18.0001 10.359 18.1641 11.156 18.1641 12C18.1641 12.844 18.0001 13.641 17.6721 14.391C17.3596 15.141 16.9221 15.7972 16.3596 16.3597C15.7971 16.9222 15.1408 17.3598 14.3908 17.6722C13.6408 18.0002 12.8438 18.1642 11.9998 18.1642C11.1558 18.1642 10.3588 18.0002 9.60882 17.6722C8.85882 17.3598 8.20257 16.9222 7.64007 16.3597C7.07757 15.7972 6.64007 15.141 6.32757 14.391C5.99957 13.641 5.83557 12.844 5.83557 12C5.83557 11.156 5.99957 10.359 6.32757 9.609C6.64007 8.859 7.07757 8.20275 7.64007 7.64025C8.20257 7.07775 8.85882 6.64025 9.60882 6.32775C10.3588 5.99975 11.1558 5.83575 11.9998 5.83575ZM11.9998 16.008C13.1093 16.008 14.0546 15.6173 14.8356 14.8358C15.6166 14.0542 16.0073 13.109 16.0078 12C16.0083 10.891 15.6176 9.94575 14.8356 9.16425C14.0536 8.38275 13.1083 7.992 11.9998 7.992C10.8913 7.992 9.94606 8.38275 9.16407 9.16425C8.38206 9.94575 7.99132 10.891 7.99182 12C7.99232 13.109 8.38307 14.0542 9.16407 14.8358C9.94507 15.6173 10.8903 16.008 11.9998 16.008ZM19.8516 5.60175C19.8516 5.99225 19.7108 6.32825 19.4293 6.60975C19.1478 6.89125 18.8041 7.032 18.3981 7.032C18.0076 7.032 17.6716 6.89125 17.3901 6.60975C17.1086 6.32825 16.9678 5.99225 16.9678 5.60175C16.9678 5.19525 17.1086 4.8515 17.3901 4.5705C17.6716 4.2895 18.0076 4.14875 18.3981 4.14825C18.8046 4.14825 19.1483 4.289 19.4293 4.5705C19.7103 4.852 19.8511 5.19575 19.8516 5.60175Z"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>

</symbol>
<symbol id="keyboard-arrow-down" viewBox="0 0 24 24">
<path d="M2.82 5L12 14.16L21.18 5L24 7.82L12 19.82L0 7.82L2.82 5Z"/>

</symbol>
<symbol id="keyboard-arrow-left" viewBox="0 0 24 24">
<path d="M19 21.18L9.84 12L19 2.82L16.18 0L4.18 12L16.18 24L19 21.18Z"/>

</symbol>
<symbol id="keyboard-arrow-right" viewBox="0 0 24 24">
<path d="M5 21.18L14.16 12L5 2.82L7.82 0L19.82 12L7.82 24L5 21.18Z"/>

</symbol>
<symbol id="keyboard-arrow-up" viewBox="0 0 24 24">
<path d="M2.82 19.82L12 10.66L21.18 19.82L24 17L12 5.00001L0 17L2.82 19.82Z"/>

</symbol>
<symbol id="language" viewBox="0 0 24 24">
<path d="M11.988 0C5.364 0 0 5.376 0 12C0 18.624 5.364 24 11.988 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 11.988 0ZM20.304 7.2H16.764C16.38 5.7 15.828 4.26 15.108 2.928C17.316 3.684 19.152 5.22 20.304 7.2ZM12 2.448C12.996 3.888 13.776 5.484 14.292 7.2H9.708C10.224 5.484 11.004 3.888 12 2.448ZM2.712 14.4C2.52 13.632 2.4 12.828 2.4 12C2.4 11.172 2.52 10.368 2.712 9.6H6.768C6.672 10.392 6.6 11.184 6.6 12C6.6 12.816 6.672 13.608 6.768 14.4H2.712ZM3.696 16.8H7.236C7.62 18.3 8.172 19.74 8.892 21.072C6.684 20.316 4.848 18.792 3.696 16.8ZM7.236 7.2H3.696C4.848 5.208 6.684 3.684 8.892 2.928C8.172 4.26 7.62 5.7 7.236 7.2ZM12 21.552C11.004 20.112 10.224 18.516 9.708 16.8H14.292C13.776 18.516 12.996 20.112 12 21.552ZM14.808 14.4H9.192C9.084 13.608 9 12.816 9 12C9 11.184 9.084 10.38 9.192 9.6H14.808C14.916 10.38 15 11.184 15 12C15 12.816 14.916 13.608 14.808 14.4ZM15.108 21.072C15.828 19.74 16.38 18.3 16.764 16.8H20.304C19.152 18.78 17.316 20.316 15.108 21.072ZM17.232 14.4C17.328 13.608 17.4 12.816 17.4 12C17.4 11.184 17.328 10.392 17.232 9.6H21.288C21.48 10.368 21.6 11.172 21.6 12C21.6 12.828 21.48 13.632 21.288 14.4H17.232Z"/>

</symbol>
<symbol id="light-bulb" viewBox="0 0 24 24">
<path d="M9.42857 21.15C9.42857 21.6175 9.81429 22 10.2857 22H13.7143C14.1857 22 14.5714 21.6175 14.5714 21.15V20.3H9.42857V21.15ZM12 5C8.69143 5 6 7.669 6 10.95C6 12.973 7.02 14.7495 8.57143 15.829V17.75C8.57143 18.2175 8.95714 18.6 9.42857 18.6H14.5714C15.0429 18.6 15.4286 18.2175 15.4286 17.75V15.829C16.98 14.7495 18 12.973 18 10.95C18 7.669 15.3086 5 12 5ZM14.4429 14.435L13.7143 14.945V16.9H10.2857V14.945L9.55714 14.435C8.4 13.636 7.71429 12.3355 7.71429 10.95C7.71429 8.604 9.63429 6.7 12 6.7C14.3657 6.7 16.2857 8.604 16.2857 10.95C16.2857 12.3355 15.6 13.636 14.4429 14.435Z" fill="#2D2D2D"/>
<path d="M11 4H13V1H11V4Z" fill="#2D2D2D"/>
<path d="M19 12H22V10H19V12Z" fill="#2D2D2D"/>
<path d="M2 12H5V10H2V12Z" fill="#2D2D2D"/>
<path d="M6.6988 6.60573L8.10593 5.1986L5.98463 3.0773L4.5775 4.48443L6.6988 6.60573Z" fill="#2D2D2D"/>
<path d="M17.2945 6.6128L19.4158 4.4915L18.0087 3.08437L15.8874 5.20567L17.2945 6.6128Z" fill="#2D2D2D"/>

</symbol>
<symbol id="linkedin" viewBox="0 0 24 24">
<path d="M5.37214 23.9999H0.396429V7.97672H5.37214V23.9999ZM2.88161 5.79101C1.29054 5.79101 0 4.47315 0 2.88208C1.13882e-08 2.11783 0.303597 1.38488 0.844003 0.844476C1.38441 0.30407 2.11736 0.000473022 2.88161 0.000473022C3.64586 0.000473022 4.3788 0.30407 4.91921 0.844476C5.45962 1.38488 5.76321 2.11783 5.76321 2.88208C5.76321 4.47315 4.47214 5.79101 2.88161 5.79101ZM23.9946 23.9999H19.0296V16.1999C19.0296 14.341 18.9921 11.9571 16.4427 11.9571C13.8557 11.9571 13.4593 13.9767 13.4593 16.066V23.9999H8.48893V7.97672H13.2611V10.1624H13.3307C13.995 8.90351 15.6177 7.57494 18.0386 7.57494C23.0743 7.57494 24 10.891 24 15.1982V23.9999H23.9946Z"/>

</symbol>
<symbol id="location-on" viewBox="0 0 24 24">
<path d="M12.4 0C7.756 0 4 3.756 4 8.4C4 14.7 12.4 24 12.4 24C12.4 24 20.8 14.7 20.8 8.4C20.8 3.756 17.044 0 12.4 0ZM12.4 11.4C10.744 11.4 9.4 10.056 9.4 8.4C9.4 6.744 10.744 5.4 12.4 5.4C14.056 5.4 15.4 6.744 15.4 8.4C15.4 10.056 14.056 11.4 12.4 11.4Z"/>

</symbol>
<symbol id="menu" viewBox="0 0 24 24">
<path d="M0 20H24V17.3333H0V20ZM0 13.3333H24V10.6667H0V13.3333ZM0 4V6.66667H24V4H0Z"/>

</symbol>
<symbol id="minus" viewBox="0 0 16 16">
<path d="M0 6.5v3c0 0.276 0.224 0.5 0.5 0.5h15c0.276 0 0.5-0.224 0.5-0.5v-3c0-0.276-0.224-0.5-0.5-0.5h-15c-0.276 0-0.5 0.224-0.5 0.5z"/>

</symbol>
<symbol id="neutral" viewBox="0 0 15 16">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.0063 8.25944C13.2363 8.85249 14.7361 10.8239 14.7361 13.1599V15.456C14.7361 15.7564 14.4926 16 14.1922 16H1.11033C0.809926 16 0.566406 15.7564 0.566406 15.456V13.1599C0.566406 10.8239 2.0662 8.8525 4.29604 8.25944L4.78957 8.1282C5.00405 8.07145 5.13952 8.10421 5.79489 8.33238C6.71562 8.65309 7.22051 8.79235 7.64985 8.79235C8.07878 8.79235 8.58343 8.65326 9.50491 8.33269C10.1625 8.10397 10.2988 8.07105 10.5131 8.12827L11.0063 8.25944ZM7.64965 7.29968C5.6371 7.29968 4.00014 5.66267 4.00014 3.65001C4.00014 1.63717 5.6371 0 7.64965 0C9.66254 0 11.2998 1.63718 11.2998 3.65001C11.2998 5.66267 9.66254 7.29968 7.64965 7.29968Z"/>

</symbol>
<symbol id="new-rx-icon" viewBox="0 0 50 56">
<g id="New Rx Icon">
<g id="Group 4">
<g id="Group">
<path id="Path" fill-rule="evenodd" clip-rule="evenodd" d="M8.10358 29.5645C11.3937 29.5645 17.9739 29.5645 17.9739 29.5645C19.3284 29.5645 19.6399 29.918 19.6399 31.4546V43.6501C19.6399 45.1854 19.3284 45.5384 17.9739 45.5384H16.0057H7.96484L8.00526 47.3086H15.1933H17.9739C20.2188 47.3086 21.2642 46.1458 21.2642 43.6501V31.4546C21.2642 28.9576 20.2188 27.7944 17.9739 27.7944C17.9739 27.7944 11.4107 27.7944 8.12906 27.7944C7.95809 27.7944 7.98946 29.5645 8.10358 29.5645Z" fill="#515761"/>
<path id="Path_2" fill-rule="evenodd" clip-rule="evenodd" d="M24.8303 25.414V48.8859C24.8303 50.2405 24.4769 50.552 22.9404 50.552H10.746C9.21094 50.552 8.8579 50.2405 8.8579 48.8859V46.9175V28.3328V25.414C8.8579 24.9649 8.46168 24.6016 7.9729 24.6016C7.48412 24.6016 7.08789 24.9649 7.08789 25.414V29.1449V46.105V48.8859C7.08789 51.131 8.25056 52.1765 10.746 52.1765H22.9404C25.4372 52.1765 26.6004 51.131 26.6004 48.8859V25.414C26.6004 24.9649 26.2041 24.6016 25.7153 24.6016C25.2266 24.6016 24.8303 24.9649 24.8303 25.414Z" fill="#515761"/>
<path id="Fill 3" fill-rule="evenodd" clip-rule="evenodd" d="M6.08655 21.7679H27.4565V17.4297H6.08655V21.7679ZM28.3058 15.6055H5.23774C4.76881 15.6055 4.38867 16.0129 4.38867 16.5166V22.6766C4.38867 23.1798 4.76881 23.5877 5.23774 23.5877H28.3058C28.7743 23.5877 29.1545 23.1798 29.1545 22.6766V16.5166C29.1545 16.0129 28.7743 15.6055 28.3058 15.6055Z" fill="#515761"/>
</g>
<g id="Group 3">
<path id="Oval" d="M43.8687 17.3353C43.8687 24.4211 38.1056 30.1706 30.99 30.1706C23.8743 30.1706 18.1113 24.4211 18.1113 17.3353C18.1113 10.2495 23.8743 4.5 30.99 4.5C38.1056 4.5 43.8687 10.2495 43.8687 17.3353Z" fill="#F8F8F9" stroke="#515761" stroke-width="2"/>
<path id="&#xF0;&#x178;&#x2013;&#x8D; expand icon color" fill-rule="evenodd" clip-rule="evenodd" d="M29.8235 16.1726V11.5809C29.8235 10.9386 30.3458 10.418 30.9901 10.418C31.6344 10.418 32.1567 10.9386 32.1567 11.5809V16.1726H36.7629C37.4072 16.1726 37.9294 16.6933 37.9294 17.3356C37.9294 17.9779 37.4072 18.4986 36.7629 18.4986H32.1567V23.0903C32.1567 23.7326 31.6344 24.2533 30.9901 24.2533C30.3458 24.2533 29.8235 23.7326 29.8235 23.0903V18.4986H25.2173C24.5731 18.4986 24.0508 17.9779 24.0508 17.3356C24.0508 16.6933 24.5731 16.1726 25.2173 16.1726H29.8235Z" fill="#009BDF"/>
</g>
</g>
</g>

</symbol>
<symbol id="notifications" viewBox="0 0 24 24">
<path d="M11.8462 24C13.2 24 14.3077 22.8923 14.3077 21.5385H9.38462C9.38462 22.8923 10.48 24 11.8462 24ZM19.2308 16.6154V10.4615C19.2308 6.68308 17.2123 3.52 13.6923 2.68308V1.84615C13.6923 0.824615 12.8677 0 11.8462 0C10.8246 0 10 0.824615 10 1.84615V2.68308C6.46769 3.52 4.46154 6.67077 4.46154 10.4615V16.6154L2 19.0769V20.3077H21.6923V19.0769L19.2308 16.6154Z"/>

</symbol>
<symbol id="open" viewBox="0 0 24 24">
<path d="M9.81818 8.72727H14.1818V5.45455H17.4545L12 0L6.54545 5.45455H9.81818V8.72727ZM8.72727 9.81818H5.45455V6.54545L0 12L5.45455 17.4545V14.1818H8.72727V9.81818ZM24 12L18.5455 6.54545V9.81818H15.2727V14.1818H18.5455V17.4545L24 12ZM14.1818 15.2727H9.81818V18.5455H6.54545L12 24L17.4545 18.5455H14.1818V15.2727Z"/>

</symbol>
<symbol id="order-status" viewBox="0 0 24 24">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.4415 5.17969H8.01281C7.71292 5.17969 7.46875 5.41512 7.46875 5.70312V7.82997C7.46875 8.12026 7.71292 8.35454 8.01281 8.35454H8.4407V17.9625C8.4407 19.334 9.39013 19.6208 10.1878 19.6208H14.2475C15.044 19.6208 15.9958 19.334 15.9958 17.9625V8.35454H16.4415C16.7414 8.35454 16.9844 8.12026 16.9844 7.82997V5.70312C16.9844 5.41512 16.7414 5.17969 16.4415 5.17969ZM14.545 17.9625C14.545 18.0917 14.5332 18.1637 14.5237 18.1991C14.4846 18.2094 14.4016 18.2243 14.2475 18.2243H10.1878C10.0338 18.2243 9.95078 18.2094 9.91167 18.1991C9.90218 18.1637 9.89033 18.0917 9.89033 17.9625V17.2711H13.2021C13.502 17.2711 13.7461 17.0368 13.7461 16.7465V10.1797C13.7461 9.89054 13.502 9.65626 13.2021 9.65626H9.89033V8.80597H14.545V17.9625ZM9.89033 16.2231H12.658V10.7054H9.89033V16.2231ZM8.55686 7.30654H15.8975V6.22883H8.55686V7.30654Z" fill="#973894"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9702 0.607422C10.0677 0.607422 8.2483 1.02685 6.56398 1.85314C5.5375 2.35599 4.5857 3.00971 3.74769 3.77656V3.11142C3.74769 2.72628 3.42292 2.41314 3.02228 2.41314C2.62165 2.41314 2.29688 2.72628 2.29688 3.11142V5.60285C2.29688 5.60742 2.29806 5.61085 2.29806 5.61542C2.29806 5.62914 2.29925 5.64056 2.29925 5.65428C2.30043 5.66457 2.30162 5.67599 2.3028 5.68628C2.30399 5.69771 2.30636 5.70799 2.30754 5.71942C2.30991 5.73085 2.31228 5.74342 2.31465 5.75485C2.31703 5.76514 2.3194 5.77428 2.32295 5.78342C2.32651 5.79714 2.33006 5.80856 2.33362 5.82114C2.33718 5.83028 2.34073 5.83942 2.34429 5.84856C2.34903 5.86114 2.35377 5.87142 2.35851 5.88399C2.36325 5.89314 2.36799 5.90342 2.37392 5.91371C2.37866 5.92399 2.3834 5.93314 2.38933 5.94228C2.39526 5.95371 2.40237 5.96399 2.40948 5.97542C2.41422 5.98342 2.42015 5.99142 2.42607 5.99942C2.43437 6.01085 2.44148 6.02114 2.45096 6.03142C2.45689 6.03828 2.46282 6.04628 2.46874 6.05314C2.47704 6.06228 2.48652 6.07256 2.49482 6.08171C2.50312 6.08856 2.51023 6.09656 2.51853 6.10456C2.52682 6.11142 2.53512 6.11942 2.5446 6.12742C2.55409 6.13542 2.56357 6.14342 2.57305 6.15142C2.57779 6.15371 2.58135 6.15714 2.5849 6.15942C2.58965 6.16285 2.59439 6.16628 2.59913 6.16971C2.61098 6.17771 2.62165 6.18457 2.6335 6.19142C2.6418 6.19714 2.65128 6.20285 2.66076 6.20742C2.67143 6.21428 2.68329 6.21999 2.69514 6.22571L2.72477 6.23942C2.73544 6.24399 2.74729 6.24856 2.75914 6.25314C2.76981 6.25656 2.78048 6.26114 2.79115 6.26456C2.803 6.26799 2.81367 6.27142 2.82552 6.27485L2.8599 6.28285C2.87175 6.28514 2.88242 6.28742 2.89427 6.28971C2.90731 6.29199 2.91916 6.29428 2.9322 6.29542C2.94168 6.29657 2.95353 6.29771 2.9642 6.29771C2.97724 6.29885 2.99028 6.29999 3.0045 6.29999C3.01043 6.29999 3.01636 6.30114 3.02228 6.30114H5.60507C6.0057 6.30114 6.33047 5.98799 6.33047 5.60285C6.33047 5.21656 6.0057 4.90342 5.60507 4.90342H4.61771C6.56753 3.04628 9.17402 2.00514 11.9702 2.00514C17.7521 2.00514 22.4566 6.54114 22.4566 12.116C22.4566 12.9114 22.3606 13.7034 22.1709 14.4691C22.0785 14.8451 22.3191 15.2211 22.709 15.3103C22.7647 15.324 22.8216 15.3309 22.8774 15.3309C23.2057 15.3309 23.502 15.1137 23.5814 14.7926C23.7983 13.9206 23.9062 13.02 23.9062 12.116C23.9062 5.77085 18.5522 0.607422 11.9702 0.607422Z" fill="#973894"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.607 18.857C21.607 18.8456 21.6058 18.8342 21.6046 18.8239C21.6022 18.8125 21.601 18.8022 21.5987 18.7907L21.5915 18.7542C21.5892 18.745 21.5868 18.737 21.5844 18.7267C21.5821 18.7142 21.5773 18.7016 21.5738 18.6902C21.5702 18.6799 21.5667 18.6707 21.5631 18.6616C21.5584 18.6502 21.5536 18.6388 21.5477 18.6273L21.5335 18.5965C21.5287 18.5873 21.524 18.577 21.5181 18.5667C21.5121 18.5565 21.505 18.5473 21.4979 18.5359C21.492 18.5279 21.4861 18.5188 21.4813 18.5107C21.4742 18.5005 21.4659 18.4902 21.4564 18.4799C21.4505 18.4719 21.4446 18.4639 21.4375 18.4559C21.4303 18.4479 21.4209 18.4387 21.4126 18.4296C21.4043 18.4216 21.396 18.4136 21.3889 18.4056C21.3806 18.3987 21.3723 18.3907 21.3628 18.3839C21.3533 18.3747 21.3426 18.3667 21.3343 18.3587C21.3296 18.3576 21.326 18.3542 21.3225 18.3507C21.3177 18.3473 21.313 18.3439 21.3071 18.3405C21.2964 18.3336 21.2857 18.3256 21.2739 18.3187C21.2656 18.313 21.2561 18.3085 21.2466 18.3039C21.236 18.297 21.2241 18.2913 21.2122 18.2845C21.2028 18.2799 21.1921 18.2753 21.1838 18.2707C21.1719 18.2662 21.1601 18.2616 21.1471 18.2582C21.1376 18.2536 21.1269 18.2502 21.1162 18.2467C21.1044 18.2422 21.0925 18.2387 21.0819 18.2353C21.07 18.233 21.0582 18.2296 21.0463 18.2273C21.0356 18.2239 21.025 18.2227 21.0131 18.2205C21.0001 18.2182 20.9882 18.2159 20.9764 18.2147C20.9645 18.2147 20.9538 18.2136 20.942 18.2125C20.9301 18.2113 20.9159 18.2102 20.9029 18.2102C20.897 18.2102 20.891 18.209 20.8851 18.209H18.3023C17.9017 18.209 17.5781 18.5222 17.5781 18.9085C17.5781 19.2947 17.9017 19.6067 18.3023 19.6067H19.2897C17.3387 21.4639 14.7322 22.505 11.9372 22.505C6.15411 22.505 1.45082 17.9702 1.45082 12.3942C1.45082 11.5987 1.54683 10.8079 1.73529 10.041C1.82774 9.66618 1.58831 9.28903 1.19834 9.19875C0.809564 9.10961 0.418413 9.34161 0.324774 9.71761C0.110234 10.5896 0 11.4902 0 12.3942C0 18.7393 5.35522 23.9027 11.9372 23.9027C13.8396 23.9027 15.6579 23.4845 17.3422 22.657C18.3699 22.1542 19.3217 21.5005 20.1597 20.7336V21.3987C20.1597 21.785 20.4845 22.097 20.8851 22.097C21.2857 22.097 21.6105 21.785 21.6105 21.3987V18.9085C21.6105 18.9039 21.6093 18.8993 21.6093 18.8947C21.6093 18.881 21.6081 18.8696 21.607 18.857Z" fill="#973894"/>

</symbol>
<symbol id="pause" viewBox="0 0 24 24">
<path d="M1 24H7.85714V0H1V24ZM14.7143 0V24H21.5714V0H14.7143Z"/>

</symbol>
<symbol id="people" viewBox="0 0 25 25">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.7224 20.5437C21.7224 17.7393 20.0056 15.4788 17.3401 14.7699L16.7447 14.6115C16.6474 14.6385 16.4842 14.6918 16.2567 14.7701C16.1308 14.8137 16.1308 14.8136 16.0433 14.844C15.7385 14.9501 15.5942 14.9997 15.4084 15.0615C14.9434 15.2161 14.5432 15.3348 14.1589 15.427C13.6243 15.5553 13.1487 15.6241 12.7247 15.6241C11.8391 15.6241 10.9984 15.3982 9.40563 14.8433C9.31807 14.8128 9.31807 14.8128 9.22801 14.7816C8.9672 14.6917 8.80524 14.6387 8.70831 14.6116L8.1136 14.7699C5.44804 15.4787 3.73133 17.7391 3.73133 20.5437V23.172H21.7224V20.5437ZM17.7595 13.1929C21.1045 14.0824 23.3542 17.0395 23.3542 20.5435V23.9878C23.3542 24.4384 22.9889 24.8036 22.5383 24.8036H2.91549C2.46489 24.8036 2.09961 24.4384 2.09961 23.9878V20.5435C2.09961 17.0396 4.3493 14.0825 7.69406 13.1929L8.43436 12.996C8.75608 12.9109 8.95929 12.96 9.94233 13.3023C11.3234 13.7833 12.0808 13.9922 12.7248 13.9922C13.3682 13.9922 14.1251 13.7836 15.5074 13.3027C16.4938 12.9597 16.6983 12.9103 17.0196 12.9961L17.7595 13.1929ZM12.7245 11.7532C9.70564 11.7532 7.25021 9.29772 7.25021 6.27872C7.25021 3.25947 9.70565 0.803711 12.7245 0.803711C15.7438 0.803711 18.1997 3.25948 18.1997 6.27872C18.1997 9.29772 15.7438 11.7532 12.7245 11.7532ZM12.7243 2.43544C10.6057 2.43544 8.88156 4.15967 8.88156 6.27869C8.88156 8.39733 10.6058 10.1217 12.7243 10.1217C14.8433 10.1217 16.5678 8.39734 16.5678 6.27869C16.5678 4.15965 14.8435 2.43544 12.7243 2.43544Z"/>

</symbol>
<symbol id="person-bubble" viewBox="0 0 24 18">
<path d="M21.5516 1H7.05411C5.88354 1.00132 4.93494 1.93161 4.93359 3.07959V5.35997C4.93359 5.624 5.15184 5.83804 5.42107 5.83804C5.69029 5.83804 5.90854 5.624 5.90854 5.35997V3.07959C5.90854 2.78227 6.02898 2.49712 6.24336 2.28688C6.45774 2.07664 6.7485 1.95852 7.05167 1.95852H21.5492C21.8524 1.95852 22.1431 2.07664 22.3575 2.28688C22.5719 2.49712 22.6923 2.78227 22.6923 3.07959V11.1828C22.6923 11.802 22.1805 12.3039 21.5492 12.3039H9.38668C9.11746 12.3039 8.89921 12.5179 8.89921 12.782C8.89921 13.046 9.11746 13.26 9.38668 13.26H21.5492C22.7198 13.2587 23.6684 12.3284 23.6697 11.1804V3.0772C23.667 1.93108 22.7203 1.00263 21.5516 1V1Z" stroke="#14568d" stroke-width="0.4"/>
<path d="M10.676 5.83309H18.6169C18.8862 5.83309 19.1044 5.61905 19.1044 5.35502C19.1044 5.09099 18.8862 4.87695 18.6169 4.87695H10.676C10.4067 4.87695 10.1885 5.09099 10.1885 5.35502C10.1885 5.61905 10.4067 5.83309 10.676 5.83309Z" stroke="#14568D" stroke-width="0.4"/>
<path d="M10.676 9.20027H16.4403C16.7096 9.20027 16.9278 8.98624 16.9278 8.72221C16.9278 8.45818 16.7096 8.24414 16.4403 8.24414H10.676C10.4067 8.24414 10.1885 8.45818 10.1885 8.72221C10.1885 8.98624 10.4067 9.20027 10.676 9.20027Z" stroke="#14568D" stroke-width="0.4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.13917 9.8101C8.13917 11.2477 6.9508 12.4132 5.48487 12.4132C4.0195 12.4119 2.83191 11.2472 2.83057 9.8101C2.83057 8.37247 4.01894 7.20703 5.48487 7.20703C6.9508 7.20703 8.13917 8.37247 8.13917 9.8101ZM7.15902 9.81013C7.15902 8.90319 6.40933 8.16797 5.48454 8.16797V8.17036C4.56125 8.17167 3.81274 8.90467 3.81006 9.81013C3.81006 10.7171 4.55975 11.4523 5.48454 11.4523C6.40933 11.4523 7.15902 10.7171 7.15902 9.81013Z"/>
<path d="M5.48487 12.4132L5.48474 12.5632H5.48487V12.4132ZM2.83057 9.8101H2.68057L2.68057 9.81024L2.83057 9.8101ZM5.48454 8.16797V8.01797H5.33454V8.16797H5.48454ZM5.48454 8.17036L5.48475 8.32036L5.63454 8.32015V8.17036H5.48454ZM3.81006 9.81013L3.66006 9.80968V9.81013H3.81006ZM5.48487 12.5632C7.03088 12.5632 8.28917 11.3333 8.28917 9.8101H7.98917C7.98917 11.1622 6.87073 12.2632 5.48487 12.2632V12.5632ZM2.68057 9.81024C2.68199 11.3328 3.93939 12.5618 5.48474 12.5632L5.48501 12.2632C4.0996 12.2619 2.98183 11.1616 2.98057 9.80996L2.68057 9.81024ZM5.48487 7.05703C3.93887 7.05703 2.68057 8.28688 2.68057 9.8101H2.98057C2.98057 8.45805 4.09901 7.35703 5.48487 7.35703V7.05703ZM8.28917 9.8101C8.28917 8.28688 7.03088 7.05703 5.48487 7.05703V7.35703C6.87073 7.35703 7.98917 8.45805 7.98917 9.8101H8.28917ZM5.48454 8.31797C6.32925 8.31797 7.00902 8.98877 7.00902 9.81013H7.30902C7.30902 8.8176 6.4894 8.01797 5.48454 8.01797V8.31797ZM5.63454 8.17036V8.16797H5.33454V8.17036H5.63454ZM3.96006 9.81057C3.96249 8.99042 4.6413 8.32156 5.48475 8.32036L5.48432 8.02036C4.48121 8.02178 3.663 8.81891 3.66006 9.80968L3.96006 9.81057ZM5.48454 11.3023C4.63982 11.3023 3.96006 10.6315 3.96006 9.81013H3.66006C3.66006 10.8027 4.47967 11.6023 5.48454 11.6023V11.3023ZM7.00902 9.81013C7.00902 10.6315 6.32925 11.3023 5.48454 11.3023V11.6023C6.4894 11.6023 7.30902 10.8027 7.30902 9.81013H7.00902Z"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 17.3338C1.00269 14.9058 3.00902 12.9382 5.48477 12.9355C7.95902 12.9408 9.96309 14.9073 9.96711 17.3338C9.96711 17.5978 9.74886 17.8118 9.47964 17.8118H1.48748C1.21825 17.8118 1 17.5978 1 17.3338ZM5.48449 13.8945C3.73599 13.8945 2.25454 15.1575 2.01123 16.8556H2.02098H8.95776C8.71445 15.1575 7.233 13.8945 5.48449 13.8945Z"/>
<path d="M5.48477 12.9355L5.48499 12.8355L5.48467 12.8355L5.48477 12.9355ZM1 17.3338L0.9 17.3337V17.3338H1ZM9.96711 17.3338H10.0671L10.0671 17.3336L9.96711 17.3338ZM2.01123 16.8556L1.91224 16.8414L1.89588 16.9556H2.01123V16.8556ZM8.95776 16.8556V16.9556H9.07311L9.05675 16.8414L8.95776 16.8556ZM5.48467 12.8355C2.95561 12.8382 0.90275 14.8487 0.9 17.3337L1.1 17.3339C1.10262 14.9629 3.06243 13.0381 5.48488 13.0355L5.48467 12.8355ZM10.0671 17.3336C10.063 14.8502 8.01248 12.8409 5.48499 12.8355L5.48456 13.0355C7.90557 13.0407 9.86318 14.9643 9.86711 17.3339L10.0671 17.3336ZM9.47964 17.9118C9.80224 17.9118 10.0671 17.6548 10.0671 17.3338H9.86711C9.86711 17.5407 9.69548 17.7118 9.47964 17.7118V17.9118ZM1.48748 17.9118H9.47964V17.7118H1.48748V17.9118ZM0.9 17.3338C0.9 17.6548 1.16487 17.9118 1.48748 17.9118V17.7118C1.27163 17.7118 1.1 17.5407 1.1 17.3338H0.9ZM2.11022 16.8698C2.34627 15.2224 3.78427 13.9945 5.48449 13.9945V13.7945C3.68771 13.7945 2.16281 15.0926 1.91224 16.8414L2.11022 16.8698ZM2.02098 16.7556H2.01123V16.9556H2.02098V16.7556ZM8.95776 16.7556H2.02098V16.9556H8.95776V16.7556ZM5.48449 13.9945C7.18472 13.9945 8.62272 15.2224 8.85877 16.8698L9.05675 16.8414C8.80617 15.0926 7.28128 13.7945 5.48449 13.7945V13.9945Z"/>

</symbol>
<symbol id="person" viewBox="0 0 24 24">
<path d="M12 12C15.315 12 18 9.315 18 6C18 2.685 15.315 0 12 0C8.685 0 6 2.685 6 6C6 9.315 8.685 12 12 12ZM12 15C7.995 15 0 17.01 0 21V24H24V21C24 17.01 16.005 15 12 15Z"/>

</symbol>
<symbol id="pinterest" viewBox="0 0 24 24">
<path d="M12.5625 0.304688C7.75313 0.304688 3 3.51094 3 8.7C3 12 4.85625 13.875 5.98125 13.875C6.44531 13.875 6.7125 12.5813 6.7125 12.2156C6.7125 11.7797 5.60156 10.8516 5.60156 9.0375C5.60156 5.26875 8.47031 2.59688 12.1828 2.59688C15.375 2.59688 17.7375 4.41094 17.7375 7.74375C17.7375 10.2328 16.7391 14.9016 13.5047 14.9016C12.3375 14.9016 11.3391 14.0578 11.3391 12.8484C11.3391 11.0766 12.5766 9.36094 12.5766 7.53281C12.5766 4.42969 8.175 4.99219 8.175 8.74219C8.175 9.52969 8.27344 10.4016 8.625 11.1188C7.97813 13.9031 6.65625 18.0516 6.65625 20.9203C6.65625 21.8063 6.78281 22.6781 6.86719 23.5641C7.02656 23.7422 6.94688 23.7234 7.19063 23.6344C9.55313 20.4 9.46875 19.7672 10.5375 15.5344C11.1141 16.6313 12.6047 17.2219 13.7859 17.2219C18.7641 17.2219 21 12.3703 21 7.99688C21 3.34219 16.9781 0.304688 12.5625 0.304688Z"/>

</symbol>
<symbol id="play-arrow" viewBox="0 0 24 24">
<path d="M3 0V24L21.8571 12L3 0Z"/>

</symbol>
<symbol id="play-circle-outline" viewBox="0 0 24 24">
<g clip-path="url(#clip0)">
<path d="M9.6 17.4L16.8 12L9.6 6.6V17.4ZM12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM12 21.6C6.708 21.6 2.4 17.292 2.4 12C2.4 6.708 6.708 2.4 12 2.4C17.292 2.4 21.6 6.708 21.6 12C21.6 17.292 17.292 21.6 12 21.6Z"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>

</symbol>
<symbol id="progress-spinner" viewBox="0 0 32 32">
  <g fill="#515761">
    <path d="M12.722 3.813c0-2.105 1.73-3.813 3.864-3.813 2.135 0 3.865 1.708 3.864 3.813 0 2.106-1.73 3.814-3.864 3.814s-3.864-1.708-3.864-3.814Zm-5.629.423c-1.94 0-3.512 1.552-3.512 3.467 0 1.914 1.573 3.466 3.512 3.466 1.941 0 3.513-1.552 3.513-3.466 0-1.915-1.572-3.467-3.513-3.467Zm-3.931 9.713c1.746 0 3.161 1.398 3.161 3.12 0 1.724-1.415 3.12-3.161 3.12S0 18.793 0 17.07c0-1.722 1.416-3.12 3.162-3.12Zm1.945 14.448a2.746 2.746 0 0 1 0-3.92 2.836 2.836 0 0 1 3.975 0 2.746 2.746 0 0 1 0 3.92 2.838 2.838 0 0 1-3.975 0Zm11.478-1.251c-1.357 0-2.458 1.086-2.458 2.428 0 1.339 1.1 2.426 2.458 2.426 1.359 0 2.46-1.087 2.46-2.426 0-1.342-1.101-2.428-2.46-2.428ZM28.253 17.07c0-.959.786-1.734 1.756-1.734s1.758.775 1.758 1.733c0 .958-.787 1.734-1.758 1.734-.97 0-1.756-.776-1.756-1.734Zm-3.665 7.896a2.061 2.061 0 0 0 0 2.941 2.128 2.128 0 0 0 2.981 0 2.062 2.062 0 0 0 0-2.941 2.128 2.128 0 0 0-2.981 0Zm3.03-17.396c0 .766-.628 1.386-1.405 1.386-.776 0-1.405-.62-1.405-1.387a1.395 1.395 0 0 1 1.404-1.385 1.395 1.395 0 0 1 1.406 1.385Z"/>
  </g>

</symbol>
<symbol id="replay" viewBox="0 0 24 24">
<path d="M11.6 4.8V0L5.6 6L11.6 12V7.2C15.572 7.2 18.8 10.428 18.8 14.4C18.8 18.372 15.572 21.6 11.6 21.6C7.628 21.6 4.4 18.372 4.4 14.4H2C2 19.704 6.296 24 11.6 24C16.904 24 21.2 19.704 21.2 14.4C21.2 9.096 16.904 4.8 11.6 4.8Z"/>

</symbol>
<symbol id="rss-feed" viewBox="0 0 24 24">
<path d="M6.18 20C7.38398 20 8.36 19.024 8.36 17.82C8.36 16.616 7.38398 15.64 6.18 15.64C4.97602 15.64 4 16.616 4 17.82C4 19.024 4.97602 20 6.18 20Z"/>
<path d="M4 4.44V7.27C11.03 7.27 16.73 12.97 16.73 20H19.56C19.56 11.41 12.59 4.44 4 4.44ZM4 10.1V12.93C7.9 12.93 11.07 16.1 11.07 20H13.9C13.9 14.53 9.47 10.1 4 10.1Z"/>

</symbol>
<symbol id="rx" viewBox="0 0 44 45">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.19043 22.1904C0.19043 34.2881 9.99753 44.0952 22.0952 44.0952C34.1929 44.0952 44 34.2881 44 22.1904C44 10.0927 34.1929 0.285645 22.0952 0.285645C9.99753 0.285645 0.19043 10.0927 0.19043 22.1904ZM42.1746 22.1904C42.1746 33.2799 33.1847 42.2698 22.0952 42.2698C11.0057 42.2698 2.01583 33.2799 2.01583 22.1904C2.01583 11.1009 11.0057 2.11104 22.0952 2.11104C33.1847 2.11104 42.1746 11.1009 42.1746 22.1904ZM30.1697 26.5406H27.8761L25.9503 28.6906L20.5423 21.7943C23.2421 21.564 25.3696 19.292 25.3696 16.5276C25.3696 13.611 23.0021 11.238 20.0918 11.238H13.8809V30.1682H15.5905V21.8172H18.3889L24.7925 29.983L21.733 33.3991L21.761 33.4245H24.004L25.8632 31.3488L27.4908 33.4245H29.662L27.0207 30.0564L30.1697 26.5406ZM20.0918 12.9514H15.5905V20.1039H20.0918C22.0595 20.1039 23.66 18.4996 23.66 16.5276C23.66 14.5556 22.0595 12.9514 20.0918 12.9514Z"/>

</symbol>
<symbol id="search" viewBox="0 0 24 24">
<g clip-path="url(#clip0)">
<path d="M17.1527 15.0943H16.0686L15.6844 14.7238C17.0292 13.1595 17.8388 11.1286 17.8388 8.91938C17.8388 3.99314 13.8456 0 8.91938 0C3.99314 0 0 3.99314 0 8.91938C0 13.8456 3.99314 17.8388 8.91938 17.8388C11.1286 17.8388 13.1595 17.0292 14.7238 15.6844L15.0943 16.0686V17.1527L21.9554 24L24 21.9554L17.1527 15.0943ZM8.91938 15.0943C5.50257 15.0943 2.74443 12.3362 2.74443 8.91938C2.74443 5.50257 5.50257 2.74443 8.91938 2.74443C12.3362 2.74443 15.0943 5.50257 15.0943 8.91938C15.0943 12.3362 12.3362 15.0943 8.91938 15.0943Z"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>

</symbol>
<symbol id="shop" viewBox="0 0 32 28">
<path fill-rule="evenodd" clip-rule="evenodd" d="M29.6229 18.8C29.232 19.9938 28.4794 20.9298 27.5457 21.5265C28.1819 22.2079 28.5664 23.1364 28.5664 24.1766C28.5664 26.3273 26.923 28 24.81 28C22.697 28 21.0535 26.3273 21.0535 24.1766C21.0535 23.4746 21.2286 22.8236 21.538 22.265H14.3474C14.6568 22.8236 14.8319 23.4746 14.8319 24.1766C14.8319 26.3273 13.1885 28 11.0755 28C8.96247 28 7.31902 26.3273 7.31902 24.1766C7.31902 22.97 7.83639 21.9137 8.66377 21.219C7.9485 20.628 7.42114 19.8054 7.20163 18.8L3.44519 5.6572L2.50608 2.43124L0.627851 1.83384C0.0409064 1.59488 -0.0764825 1.11696 0.0409065 0.639036C0.275684 0.0416352 0.74524 -0.077845 1.2148 0.0416352L3.44519 0.758516C3.79735 0.758516 4.03213 1.11696 4.03213 1.35592L5.54627 6.13513H29.3882C30.0925 6.13513 31.0316 6.73253 31.5012 7.32993C32.0881 8.04681 32.0881 8.88317 31.8533 9.83901L29.6229 18.8ZM11.6624 20.3533H24.81H25.0448C26.336 20.3533 27.5099 19.3974 27.6273 18.2026L29.8577 9.24161C29.8577 9.00265 29.7892 8.7317 29.6229 8.52473C29.4566 8.31776 29.2708 8.16629 28.9186 8.16629H6.22804L9.07986 18.2026C9.43203 19.3974 10.6059 20.3533 11.6624 20.3533ZM9.19725 24.1766C9.19725 22.9818 9.90158 22.265 11.0755 22.265C12.0146 22.265 12.9537 22.9818 12.9537 24.1766C12.9537 25.3714 12.2494 26.0883 11.0755 26.0883C9.90158 26.0883 9.19725 25.3714 9.19725 24.1766ZM22.9318 24.1766C22.9318 22.9818 23.6361 22.265 24.81 22.265C25.9839 22.265 26.6882 22.9818 26.6882 24.1766C26.6882 25.3714 25.9839 26.0883 24.81 26.0883C23.6361 26.0883 22.9318 25.3714 22.9318 24.1766Z"/>

</symbol>
<symbol id="spinner" viewBox="0 0 32 32">
<title>spinner8</title>
<path d="M16 32c-4.274 0-8.292-1.664-11.314-4.686s-4.686-7.040-4.686-11.314c0-3.026 0.849-5.973 2.456-8.522 1.563-2.478 3.771-4.48 6.386-5.791l1.344 2.682c-2.126 1.065-3.922 2.693-5.192 4.708-1.305 2.069-1.994 4.462-1.994 6.922 0 7.168 5.832 13 13 13s13-5.832 13-13c0-2.459-0.69-4.853-1.994-6.922-1.271-2.015-3.066-3.643-5.192-4.708l1.344-2.682c2.615 1.31 4.824 3.313 6.386 5.791 1.607 2.549 2.456 5.495 2.456 8.522 0 4.274-1.664 8.292-4.686 11.314s-7.040 4.686-11.314 4.686z"/>

</symbol>
<symbol id="square" viewBox="0 0 24 24">
<path d="M18.2857 4H5.71429C4.76786 4 4 4.76786 4 5.71429V18.2857C4 19.2321 4.76786 20 5.71429 20H18.2857C19.2321 20 20 19.2321 20 18.2857V5.71429C20 4.76786 19.2321 4 18.2857 4Z"/>

</symbol>
<symbol id="success" viewBox="0 0 24 24">
<path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96452 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM16.2806 10.2806L11.0306 15.5306C10.961 15.6004 10.8783 15.6557 10.7872 15.6934C10.6962 15.7312 10.5986 15.7506 10.5 15.7506C10.4014 15.7506 10.3038 15.7312 10.2128 15.6934C10.1218 15.6557 10.039 15.6004 9.96938 15.5306L7.71938 13.2806C7.57865 13.1399 7.49959 12.949 7.49959 12.75C7.49959 12.551 7.57865 12.3601 7.71938 12.2194C7.86011 12.0786 8.05098 11.9996 8.25 11.9996C8.44903 11.9996 8.6399 12.0786 8.78063 12.2194L10.5 13.9397L15.2194 9.21937C15.2891 9.14969 15.3718 9.09442 15.4628 9.0567C15.5539 9.01899 15.6515 8.99958 15.75 8.99958C15.8486 8.99958 15.9461 9.01899 16.0372 9.0567C16.1282 9.09442 16.2109 9.14969 16.2806 9.21937C16.3503 9.28906 16.4056 9.37178 16.4433 9.46283C16.481 9.55387 16.5004 9.65145 16.5004 9.75C16.5004 9.84855 16.481 9.94613 16.4433 10.0372C16.4056 10.1282 16.3503 10.2109 16.2806 10.2806Z"/>

</symbol>
<symbol id="swap" viewBox="0 0 24 24">
<path d="M17.6667 18.68V9.33333H15V18.68H11L16.3333 24L21.6667 18.68H17.6667ZM8.33333 0L3 5.32H7V14.6667H9.66667V5.32H13.6667L8.33333 0Z"/>

</symbol>
<symbol id="thumb-up" viewBox="0 0 24 24">
<path d="M0 22.8182H4.36364V9.72727H0V22.8182ZM24 10.8182C24 9.61818 23.0182 8.63636 21.8182 8.63636H14.9345L15.9709 3.65091L16.0036 3.30182C16.0036 2.85455 15.8182 2.44 15.5236 2.14545L14.3673 1L7.18909 8.18909C6.78545 8.58182 6.54545 9.12727 6.54545 9.72727V20.6364C6.54545 21.8364 7.52727 22.8182 8.72727 22.8182H18.5455C19.4509 22.8182 20.2255 22.2727 20.5527 21.4873L23.8473 13.7964C23.9455 13.5455 24 13.2836 24 13V10.8182Z"/>

</symbol>
<symbol id="trending-flat" viewBox="0 0 24 24">
<path d="M24 12.0526L18.9474 7V10.7895H0V13.3158H18.9474V17.1053L24 12.0526Z"/>

</symbol>
<symbol id="trending-up" viewBox="0 0 24 24">
<path d="M16.8 5L19.548 7.748L13.692 13.604L8.892 8.804L0 17.708L1.692 19.4L8.892 12.2L13.692 17L21.252 9.452L24 12.2V5H16.8Z"/>

</symbol>
<symbol id="twitter" viewBox="0 0 24 24">
<path d="M21.533 7.11169C21.5482 7.32488 21.5482 7.53811 21.5482 7.7513C21.5482 14.2538 16.599 21.7462 7.5533 21.7462C4.76648 21.7462 2.17767 20.9391 0 19.5381C0.395953 19.5838 0.776625 19.599 1.18781 19.599C3.48727 19.599 5.60405 18.8224 7.29441 17.4975C5.13197 17.4518 3.31978 16.0356 2.69541 14.0863C3 14.132 3.30455 14.1624 3.62437 14.1624C4.06598 14.1624 4.50764 14.1015 4.91878 13.995C2.66498 13.5381 0.974578 11.5584 0.974578 9.16753V9.10664C1.62937 9.47213 2.39086 9.70055 3.19791 9.73097C1.87303 8.8477 1.00505 7.34011 1.00505 5.63452C1.00505 4.72083 1.24866 3.88327 1.67508 3.1523C4.09641 6.13706 7.73602 8.08627 11.8172 8.2995C11.7411 7.93402 11.6954 7.55335 11.6954 7.17263C11.6954 4.46194 13.8883 2.25385 16.6141 2.25385C18.0304 2.25385 19.3095 2.84775 20.208 3.80714C21.3197 3.59395 22.3857 3.18277 23.3299 2.61933C22.9643 3.76149 22.1877 4.72088 21.1674 5.32997C22.1573 5.22342 23.1167 4.94925 23.9999 4.56858C23.33 5.54316 22.4924 6.41114 21.533 7.11169Z"/>

</symbol>
<symbol id="vaccine" viewBox="0 0 26 27">
<path d="M1.28418 6.90234L5.90562 2.28091" fill="none" stroke="#14568d" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.59473 4.59375L6.67569 7.67471" fill="none" stroke="#14568d" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.08105 11.2695L10.27 4.08063" fill="none" stroke="#14568d" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.4458 11.0391L17.2292 21.8224L20.8236 18.228L10.0403 7.44461" fill="none" stroke="#14568d" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19.0269 20.0273L21.9794 22.9799" fill="none" stroke="#14568d" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.49414 13.0898L9.6495 11.9345" fill="none" stroke="#14568d" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.1978 15.793L12.3531 14.6376" fill="none" stroke="#14568d" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.9014 18.4961L15.0567 17.3407" fill="none" stroke="#14568d" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>

</symbol>
<symbol id="warning" viewBox="0 0 24 24">
<path d="M22.2 17.6335L14.0016 3.39569C13.7967 3.04687 13.5042 2.75764 13.1532 2.55668C12.8021 2.35572 12.4046 2.25 12 2.25C11.5955 2.25 11.198 2.35572 10.8469 2.55668C10.4958 2.75764 10.2033 3.04687 9.99847 3.39569L1.80003 17.6335C1.60291 17.9709 1.49902 18.3546 1.49902 18.7454C1.49902 19.1361 1.60291 19.5199 1.80003 19.8572C2.00228 20.2082 2.29425 20.499 2.64599 20.6998C2.99773 20.9006 3.39658 21.0043 3.80159 21.0001H20.1985C20.6032 21.0039 21.0016 20.9001 21.353 20.6993C21.7044 20.4985 21.9961 20.2079 22.1982 19.8572C22.3956 19.52 22.4998 19.1364 22.5001 18.7456C22.5004 18.3549 22.3969 17.9711 22.2 17.6335ZM11.25 9.75006C11.25 9.55115 11.329 9.36038 11.4697 9.21973C11.6104 9.07908 11.8011 9.00006 12 9.00006C12.1989 9.00006 12.3897 9.07908 12.5304 9.21973C12.671 9.36038 12.75 9.55115 12.75 9.75006V13.5001C12.75 13.699 12.671 13.8897 12.5304 14.0304C12.3897 14.171 12.1989 14.2501 12 14.2501C11.8011 14.2501 11.6104 14.171 11.4697 14.0304C11.329 13.8897 11.25 13.699 11.25 13.5001V9.75006ZM12 18.0001C11.7775 18.0001 11.56 17.9341 11.375 17.8105C11.19 17.6868 11.0458 17.5111 10.9607 17.3056C10.8755 17.1 10.8532 16.8738 10.8966 16.6556C10.9401 16.4374 11.0472 16.2369 11.2045 16.0796C11.3619 15.9222 11.5623 15.8151 11.7806 15.7717C11.9988 15.7283 12.225 15.7505 12.4305 15.8357C12.6361 15.9208 12.8118 16.065 12.9354 16.25C13.059 16.435 13.125 16.6526 13.125 16.8751C13.125 17.1734 13.0065 17.4596 12.7955 17.6706C12.5845 17.8815 12.2984 18.0001 12 18.0001Z"/>

</symbol></svg>
`;
var mh = Object.defineProperty, qi = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && mh(e, t, i), i;
};
const oa = class oa extends M {
  constructor() {
    super(...arguments), this.iconUrl = bh;
  }
  /**
   * Get the path to the icons, either by overriding it on the window
   * or by using the bundled icon path
   */
  getIconPath() {
    if (window.Cre8_ICON_URL)
      return window.Cre8_ICON_URL;
    const e = document.querySelector('script[src$="icon"]');
    return e ? `${e.src.replace(/^(.+)\/.*$/, "$1")}/svgs/svgs.svg?raw` : this.iconUrl;
  }
  render() {
    const e = this.componentClassNames("cre8-c-icon-wrapper", {});
    f`<svg src=${T8} container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Uc}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Uc}' rotate="180" container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${P8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Yc}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Yc}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}" height="24" width="24"></svg>`, f`<svg src='${ri}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Rn}' rotate="180" container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Rn}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Mr}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Ci}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Ss}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${ri}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${ri}' flip="vertical" container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${E8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${D8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${O8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`${H8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${I8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${eh}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Nn}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Nn}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${th}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${B8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${V8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Xc}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${N8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${H1}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Lr}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${rh}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${dt}' rotate="180" container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${dt}' rotate="-90" container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${dt}' rotate="90" container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${dt}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Xc}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${R8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${ih}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${z8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${F8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Z8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Kc}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${j8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${oh}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${W8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${nh}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${q8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${sh}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Kc}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${ah}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${U8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Y8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Gc}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${X8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${ch}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${lh}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${K8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${G8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Gc}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${J8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Mr}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${dh}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${hh}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${uh}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${ph}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${fh}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${Q8}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`, f`<svg src='${nn}' container-class="${e}" class="cre8-c-icon" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}"></svg>`;
    const t = this.getIconPath();
    return !this.name && !this.svg ? (console.warn("Cre8Icon: No icon name or svg provided. Please provide either a name or svg."), f``) : f`
            ${this.svg ? f`<span class="${e}" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}">${A8(this.svg)}</span>` : f`
        <span class="${e}" aria-label="${this.iconTitle}" aria-hidden="${!this.iconTitle}">
            <svg class="cre8-c-icon" xmlns="http://www.w3.org/2000/svg" focusable="${this.focusable ? "true" : "false"}" role="img">
                <use href="${t}#${this.name}"></use>
            </svg>
        </span>`}`;
  }
};
oa.styles = [gh];
let _t = oa;
qi([
  u({ type: Boolean, reflect: !0 })
], _t.prototype, "focusable");
qi([
  u()
], _t.prototype, "name");
qi([
  u({ reflect: !0 })
], _t.prototype, "svg");
qi([
  u()
], _t.prototype, "iconUrl");
qi([
  u()
], _t.prototype, "iconTitle");
customElements.get("cre8-icon") === void 0 && customElements.define("cre8-icon", _t);
let vh = class extends Event {
  constructor(e, t, o, i) {
    super("context-request", { bubbles: !0, composed: !0 }), this.context = e, this.contextTarget = t, this.callback = o, this.subscribe = i ?? !1;
  }
};
class yh {
  get value() {
    return this.o;
  }
  set value(e) {
    this.setValue(e);
  }
  setValue(e, t = !1) {
    const o = t || !Object.is(e, this.o);
    this.o = e, o && this.updateObservers();
  }
  constructor(e) {
    this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
      for (const [t, { disposer: o }] of this.subscriptions) t(this.o, o);
    }, e !== void 0 && (this.value = e);
  }
  addCallback(e, t, o) {
    if (!o) return void e(this.value);
    this.subscriptions.has(e) || this.subscriptions.set(e, { disposer: () => {
      this.subscriptions.delete(e);
    }, consumerHost: t });
    const { disposer: i } = this.subscriptions.get(e);
    e(this.value, i);
  }
  clearCallbacks() {
    this.subscriptions.clear();
  }
}
let Ch = class extends Event {
  constructor(e, t) {
    super("context-provider", { bubbles: !0, composed: !0 }), this.context = e, this.contextTarget = t;
  }
};
class Jc extends yh {
  constructor(e, t, o) {
    super(t.context !== void 0 ? t.initialValue : o), this.onContextRequest = (i) => {
      if (i.context !== this.context) return;
      const n = i.contextTarget ?? i.composedPath()[0];
      n !== this.host && (i.stopPropagation(), this.addCallback(i.callback, n, i.subscribe));
    }, this.onProviderRequest = (i) => {
      if (i.context !== this.context || (i.contextTarget ?? i.composedPath()[0]) === this.host) return;
      const n = /* @__PURE__ */ new Set();
      for (const [s, { consumerHost: a }] of this.subscriptions) n.has(s) || (n.add(s), a.dispatchEvent(new vh(this.context, a, s, !0)));
      i.stopPropagation();
    }, this.host = e, t.context !== void 0 ? this.context = t.context : this.context = t, this.attachListeners(), this.host.addController?.(this);
  }
  attachListeners() {
    this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
  }
  hostConnected() {
    this.host.dispatchEvent(new Ch(this.context, this.host));
  }
}
function I1({ context: r }) {
  return (e, t) => {
    const o = /* @__PURE__ */ new WeakMap();
    if (typeof t == "object") return { get() {
      return e.get.call(this);
    }, set(i) {
      return o.get(this).setValue(i), e.set.call(this, i);
    }, init(i) {
      return o.set(this, new Jc(this, { context: r, initialValue: i })), i;
    } };
    {
      e.constructor.addInitializer(((s) => {
        o.set(s, new Jc(s, { context: r }));
      }));
      const i = Object.getOwnPropertyDescriptor(e, t);
      let n;
      if (i === void 0) {
        const s = /* @__PURE__ */ new WeakMap();
        n = { get() {
          return s.get(this);
        }, set(a) {
          o.get(this).setValue(a), s.set(this, a);
        }, configurable: !0, enumerable: !0 };
      } else {
        const s = i.set;
        n = { ...i, set(a) {
          o.get(this).setValue(a), s?.call(this, a);
        } };
      }
      return void Object.defineProperty(e, t, n);
    }
  };
}
const xh = Symbol("cre8-form-internals"), _h = Symbol("cre8-form-state");
var wh = Object.defineProperty, kh = Object.getOwnPropertyDescriptor, Ot = (r, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? kh(e, t) : e, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = (o ? s(e, t, i) : s(i)) || i);
  return o && i && wh(e, t, i), i;
};
const na = class na extends M {
  constructor() {
    super(), this.internalValue = "", this.defaultValue = "", this._formState = {
      value: "",
      disabled: !1,
      required: !1,
      isError: !1,
      isSuccess: !1
    }, this._internals = this.attachInternals();
  }
  get value() {
    return this.internalValue;
  }
  /**
   * Sets the value of the form field.
   * 1. Stores the new value so it can be retrieved by the getter.
   * 2. Sets the current value of the control via ElementInternals.
   * 3. Updates the actual field element.
   * 4. Updates the form state context.
   * 5. Triggers a re-render.
   */
  set value(e) {
    const t = this.value;
    this.internalValue = e, this.type !== "checkbox" && this.type !== "radio" && this._internals?.setFormValue(e), this.updateField(), this.updateFormState(), this.requestUpdate("value", t);
  }
  /**
   * Updates the form state context for descendant consumption
   */
  updateFormState() {
    this._formState = {
      value: this.internalValue,
      disabled: this.disabled ?? !1,
      required: this.required ?? !1,
      isError: this.isError ?? !1,
      isSuccess: this.isSuccess ?? !1,
      name: this.name
    };
  }
  /**
   * Updates the actual field element's value
   */
  updateField() {
    this.field && this.internalValue !== void 0 && (this.field.value = this.internalValue ?? "");
  }
  /**
   * Lifecycle hook called after first render
   */
  firstUpdated() {
    this.type !== "checkbox" && this.type !== "radio" && (this.defaultValue = this.value || this.getAttribute("value") || ""), this.updateField(), this.updateFormState();
  }
  /**
   * Called when properties change
   */
  updated(e) {
    super.updated(e), (e.has("disabled") || e.has("required") || e.has("isError") || e.has("isSuccess") || e.has("name")) && this.updateFormState();
  }
  /**
   * Form lifecycle callback - called when the form is reset
   */
  formResetCallback() {
    this.value = this.defaultValue, this.updateField();
  }
  /**
   * Form lifecycle callback - called when the element is disabled via fieldset
   */
  formDisabledCallback(e) {
    this.disabled = e;
  }
  /**
   * Form lifecycle callback - called when form state is restored
   */
  formStateRestoreCallback(e, t) {
    typeof e == "string" && (this.value = e);
  }
  /**
   * Gets the form associated with this element
   */
  get form() {
    return this._internals?.form ?? null;
  }
  /**
   * Gets the validation message
   */
  get validationMessage() {
    return this._internals?.validationMessage ?? "";
  }
  /**
   * Gets the validity state
   */
  get validity() {
    return this._internals?.validity;
  }
  /**
   * Gets whether the element will be validated
   */
  get willValidate() {
    return this._internals?.willValidate ?? !1;
  }
  /**
   * Checks validity and reports to the user
   */
  reportValidity() {
    return this._internals?.reportValidity() ?? !0;
  }
  /**
   * Checks validity without reporting
   */
  checkValidity() {
    return this._internals?.checkValidity() ?? !0;
  }
  /**
   * Sets a custom validity message
   */
  setCustomValidity(e) {
    this._internals && this.field && (e ? this._internals.setValidity({ customError: !0 }, e, this.field) : this._internals.setValidity({}));
  }
};
na.formAssociated = !0;
let le = na;
Ot([
  I1({ context: xh })
], le.prototype, "_internals", 2);
Ot([
  I1({ context: _h })
], le.prototype, "_formState", 2);
Ot([
  u()
], le.prototype, "name", 2);
Ot([
  u({ type: Boolean, reflect: !0 })
], le.prototype, "disabled", 2);
Ot([
  u({ type: Boolean, reflect: !0 })
], le.prototype, "required", 2);
Ot([
  u({ type: Boolean, reflect: !0 })
], le.prototype, "isError", 2);
Ot([
  u({ type: Boolean, reflect: !0 })
], le.prototype, "isSuccess", 2);
Ot([
  u()
], le.prototype, "value", 1);
const $h = k`@import '../../design-tokens/core/scss/theming/component';

/* ------------------------------------ *\
#SPINNER
\* ------------------------------------ */

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinner-circle-animation {
  0%,
  25% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }

  50%,
  75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }

  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
}

:host {
  display: inline-block;
  --spinner-stroke-dasharray: 282.743px;
  --spinner-large-stroke-width: 10;
  --spinner-small-stroke-width: 14;
  --spinner-large-width: 4.5rem;
  --spinner-small-width: 1.5rem;
  @include cre8-typography-label-small();
}

.cre8-c-spinner,
.cre8-c-spinner--large {
  --spinner-height: var(--spinner-large-width);
  --spinner-width: var(--spinner-large-width);
  --icon-color: var(--cre8-color-content-brand);

  .cre8-c-spinner__icon {
    display: block;
  }

  .cre8-c-spinner__label {
    display: block;
    margin-top: var(--cre8-spacing-8);
  }
}

.cre8-c-spinner--small {
  --spinner-height: var(--spinner-small-width);
  --spinner-width: var(--spinner-small-width);
  --icon-color: var(--cre8-color-content-brand);
  display: flex;
  align-items: center;
  .cre8-c-spinner__label {
    display: inline-block;
    margin-left: var(--cre8-spacing-8);
    margin-top: 0;
    vertical-align: 0.35rem;
  }
}

.cre8-c-spinner--inverse {
  --icon-color: var(--cre8-color-content-brand-knockout);
  --label-color: var(--cre8-color-content-brand-knockout); // --cre8-color-content-default-knockout
}

.cre8-c-spinner--secondary.cre8-c-spinner--inverse.cre8-c-spinner--neutral {
  --icon-color: var(--cre8-color-button-secondary-neutral-inverse-content-active);
  --label-color: var(--cre8-color-button-secondary-neutral-inverse-content-active); // --cre8-color-content-default-knockout
}

.cre8-c-spinner--neutral {
  --icon-color: var(--cre8-color-button-secondary-neutral-content-active);
}

.cre8-c-spinner--primary.cre8-c-spinner--inverse {
  --icon-color: var(--cre8-color-button-primary-inverse-content-active);
}

.cre8-c-spinner--secondary.cre8-c-spinner--inverse {
  --icon-color: var(--cre8-color-button-secondary-inverse-content-active);
}

.cre8-c-spinner--tertiary.cre8-c-spinner--inverse {
  --icon-color: var(--cre8-color-button-tertiary-inverse-content-active);
}

.cre8-c-spinner__label {
  color: var(--label-color, var(--cre8-color-content-default));
}

.cre8-c-spinner__hidden-label {
  display: none;
}

.cre8-c-spinner__icon {
  height: var(--spinner-height, 1em);
  width: var(--spinner-width, 1em);

  circle {
    fill: transparent;
    stroke: var(--icon-color, inherit);
    stroke-dasharray: var(--spinner-stroke-dasharray);
    stroke-linecap: round;
    stroke-width: var(--spinner-large-stroke-width);
    transform-origin: 50% 50%;
  }
}

.cre8-c-spinner__icon-small {
  circle {
    stroke-width: var(--spinner-small-stroke-width);
  }
}

.cre8-c-spinner--indeterminate .cre8-c-spinner__icon {
  animation: loading 2s linear 0s infinite;

  circle {
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-name: spinner-circle-animation;
    animation-timing-function: ease-in-out;
  }
}

.cre8-c-spinner--determinate .cre8-c-spinner__icon {
  overflow: hidden;
  transform: rotate(-90deg);
  transform-origin: center center;
}
`;
var Mh = Object.defineProperty, lr = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Mh(e, t, i), i;
};
const sa = class sa extends M {
  constructor() {
    super(), this.progress = 0, this.size = "large";
    const e = Math.floor(Math.random() * 9e5) + 1e5;
    this.labelId = `cre8-spinner-${e}`;
  }
  renderDeterminateSpinner() {
    const e = Math.max(Math.min(100, this.progress === 0 ? this.progress = 1 : this.progress), 0), t = 2 * 3.1415926 * 45 - e / 100 * (2 * 3.1415926 * 45);
    return f` ${this.size === "small" ? f`
          <svg class="cre8-c-spinner__icon cre8-c-spinner__icon-small" aria-hidden="true" viewBox="0 0 100 100">
            <circle cx="50%" cy="50%" r="43" stroke-dashoffset="${t}"></circle>
          </svg>
        ` : f` <svg class="cre8-c-spinner__icon" aria-hidden="true" viewBox="0 0 100 100">
          <circle cx="50%" cy="50%" r="45" stroke-dashoffset="${t}"></circle>
        </svg>`}`;
  }
  renderInDeterminateSpinner() {
    return f` ${this.size === "small" ? f`
          <svg class="cre8-c-spinner__icon cre8-c-spinner__icon-small" aria-hidden="true" viewBox="0 0 100 100">
            <circle cx="50%" cy="50%" r="43"></circle>
          </svg>
        ` : f` <svg class="cre8-c-spinner__icon" aria-hidden="true" viewBox="0 0 100 100">
          <circle cx="50%" cy="50%" r="45"></circle>
        </svg>`}`;
  }
  render() {
    const e = this.componentClassNames("cre8-c-spinner", {
      "cre8-c-spinner--large": this.size === "large",
      "cre8-c-spinner--small": this.size === "small",
      "cre8-c-spinner--inverse": this.inverse,
      "cre8-c-spinner--neutral": this.neutral,
      "cre8-c-spinner--primary": this.buttonVariant === "primary",
      "cre8-c-spinner--secondary": this.buttonVariant === "secondary",
      "cre8-c-spinner--tertiary": this.buttonVariant === "tertiary",
      "cre8-c-spinner--determinate": this.determinate,
      "cre8-c-spinner--indeterminate": !this.determinate
    });
    return f`
      <div
        class="${e}"
        role="progressbar"
        aria-labelledby="${this.labelId}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.determinate ? this.progress : T}"
        part="base"
      >
        ${this.determinate ? this.renderDeterminateSpinner() : this.renderInDeterminateSpinner()}
        <div
          id="${this.labelId}"
          class="${this.label ? "cre8-c-spinner__label" : "cre8-c-spinner__hidden-label"}"
          part="label"
        >
          ${this.label}
        </div>
      </div>
    `;
  }
};
sa.styles = $h;
let Je = sa;
lr([
  u({ type: Boolean, reflect: !0 })
], Je.prototype, "determinate");
lr([
  u({ type: Boolean, reflect: !0 })
], Je.prototype, "inverse");
lr([
  u({ type: Boolean, reflect: !0 })
], Je.prototype, "neutral");
lr([
  u()
], Je.prototype, "buttonVariant");
lr([
  u()
], Je.prototype, "label");
lr([
  u({ reflect: !0, type: Number })
], Je.prototype, "progress");
lr([
  u()
], Je.prototype, "size");
customElements.get("cre8-loading-spinner") === void 0 && customElements.define("cre8-loading-spinner", Je);
const Lh = k`
@import '../../design-tokens/core/scss/theming/component';

:host {
  display: inline-flex;
}
:host([fullWidth]) {
  display: flex;

}
/**
 * 1) Button or link that has functionality to it
 */

/**
 * Primary button
 */
.cre8-c-button {
  @include cre8-typography-label-default();
  width: var(--cre8-button-width, auto);
  height: var(--cre8-button-height, auto);
  min-width: var(--cre8-button-min-width, auto);
  min-height: var(--cre8-button-min-height, auto);
  justify-content: center;
  text-align: center;
  margin-top: var( --cre8-button-margin-top, 0);
  margin-bottom: var( --cre8-button-margin-bottom, 0);
  margin-left: var( --cre8-button-margin-left, 0);
  margin-right: var( --cre8-button-margin-right, 0);
  display: inline-flex;
  align-items: center;
  border-width: var(--cre8-border-width-button-default);
  box-shadow: var(--cre8-shadow-button);
  padding-top: var(--cre8-button-padding-vertical-medium);
  padding-right: var(--cre8-button-padding-horizontal-medium);
  padding-bottom: var(--cre8-button-padding-vertical-medium);
  padding-left: var(--cre8-button-padding-horizontal-medium);
  margin: 0;
  cursor: pointer;
  border-style: var(--cre8-border-style-default);
  transition: revert;
  transform: revert;
  white-space: nowrap;
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    border-style: var(--cre8-border-style-default);
    box-shadow: none;
    transform: revert;
    transition: revert;
  }
  &.cre8-c-button--primary {
    background: var(--cre8-color-button-primary-bg);
    border-width: var(--cre8-border-width-button-default);
    border-color: var(--cre8-color-button-primary-border);
    border-radius: var(--cre8-border-radius-button);
    box-shadow: var(--cre8-shadow-button);
    color: var(--cre8-color-button-primary-content);
    --cre8-icon-fill: var(--cre8-color-button-primary-content);
    &:hover,
    &:focus {
      box-shadow: none;
      --cre8-icon-fill: var(--cre8-color-button-primary-content-hover);
      color: var(--cre8-color-button-primary-content-hover);
      border-color: var(--cre8-color-button-primary-border-hover);
      background: var(--cre8-color-button-primary-bg-hover);
      text-decoration: none;
      &:focus {
        @includefocus();
      }
    }
    &:focus-visible,
    &:active,
    &.cre8-c-button--loading {
      box-shadow: none;
      color: var(--cre8-color-button-primary-content-active);
      --cre8-icon-fill: var(--cre8-color-button-primary-content-active);
      border-color: var(--cre8-color-button-primary-border-active);
      background-color: var(--cre8-color-button-primary-bg-active);
    }
    &:focus-visible{
      @includefocus();
    }
    &.cre8-c-button--loading{
      cursor: not-allowed;
    }
    /**
 * Disabled primary and secondary button
 */
  &:disabled {
    box-shadow: none;
    background-color: var(--cre8-color-button-primary-bg-disabled);
    border-color: var(--cre8-color-button-primary-border-disabled);
    color: var(--cre8-color-button-primary-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-primary-content-disabled);
    cursor: not-allowed;
    outline: none;
    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      background-color: var(--cre8-color-button-primary-bg-disabled);
      border-color: var(--cre8-color-button-primary-border-disabled);
      color: var(--cre8-color-button-primary-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-primary-content-disabled);
    }
  }
}

/**
* Primary button inverse
*/
&.cre8-c-button--primary.cre8-c-button--inverse {
background: var(--cre8-color-button-primary-inverse-bg);
border-width: var(--cre8-border-width-button-default);
border-color: var(--cre8-color-button-primary-inverse-border);
border-radius: var(--cre8-border-radius-button);
box-shadow: var(--cre8-shadow-button);
color: var(--cre8-color-button-primary-inverse-content);
--cre8-icon-fill: var(--cre8-color-button-primary-inverse-content);
&:hover,
&:focus {
  box-shadow: none;
  --cre8-icon-fill: var(--cre8-color-button-primary-inverse-content-hover);
  color: var(--cre8-color-button-primary-inverse-content-hover);
  border-color: var(--cre8-color-button-primary-inverse-border-hover);
  background: var(--cre8-color-button-primary-inverse-bg-hover);
  text-decoration: none;
  &:focus {
    @includefocus();
  }
}
&:focus-visible,
&:active,
&.cre8-c-button--loading {
  box-shadow: none;
  color: var(--cre8-color-button-primary-inverse-content-active);
  --cre8-icon-fill: var(--cre8-color-button-primary-inverse-content-active);
  border-color: var(--cre8-color-button-primary-inverse-border-active);
  background-color: var(--cre8-color-button-primary-inverse-bg-active);
}
&:focus-visible{
  @includefocus();
}
&.cre8-c-button--loading{
  cursor: not-allowed;
}

&:disabled {
  box-shadow: none;
  background-color: var(--cre8-color-button-primary-inverse-bg-disabled);
  border-color: var(--cre8-color-button-primary-inverse-border-disabled);
  color: var(--cre8-color-button-primary-inverse-content-disabled);
  --cre8-icon-fill: var(--cre8-color-button-primary-inverse-content-disabled);
  cursor: not-allowed;
  outline: none;
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    outline: none;
    background-color: var(--cre8-color-button-primary-inverse-bg-disabled);
    border-color: var(--cre8-color-button-primary-inverse-border-disabled);
    color: var(--cre8-color-button-primary-inverse-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-primary-inverse-content-disabled);
  }
}
}

/**
 * Secondary button
 * The icon button shares the styles of the standard secondary button
 */
  &.cre8-c-button--secondary {
    background-color: var(--cre8-color-button-secondary-bg);
    border-color: var(--cre8-color-button-secondary-border);
    color: var(--cre8-color-button-secondary-content);
    --cre8-icon-fill: var(--cre8-color-button-secondary-content);
    border-radius: var(--cre8-border-radius-button);
    border-width: var(--cre8-border-width-button-default);

  &:hover,
  &:focus {
    background-color: var(--cre8-color-button-secondary-bg-hover);
    border-color: var(--cre8-color-button-secondary-border-hover);
    color: var(--cre8-color-button-secondary-content-hover);
    --cre8-icon-fill: var(--cre8-color-button-secondary-content-hover);
    &:focus {
      @includefocus();
    }
  }
  &:focus-visible,
  &:active,
  &.cre8-c-button--loading {
    transition: none;
    transform: none;
    background-color: var(--cre8-color-button-secondary-bg-active);
    border-color: var(--cre8-color-button-secondary-border-active);
    color: var(--cre8-color-button-secondary-content-active);
    --cre8-icon-fill: var(--cre8-color-button-secondary-content-active);
  }
  &:focus-visible {
    @includefocus();
  }
  &.cre8-c-button--loading {
    cursor: not-allowed;
  }

  &:disabled {
    box-shadow: none;
    background-color: var(--cre8-color-button-secondary-bg-disabled);
    border-color: var(--cre8-color-button-secondary-border-disabled);
    color: var(--cre8-color-button-secondary-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-secondary-content-disabled);
    outline: none;
    border-radius: var(--cre8-border-radius-button);
    border-width: var(--cre8-border-width-button-default);
    cursor: not-allowed;
    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      background-color: var(--cre8-color-button-secondary-bg-disabled);
      border-color: var(--cre8-color-button-secondary-border-disabled);
      color: var(--cre8-color-button-secondary-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-secondary-content-disabled);
    }
  }
}

 /**
 * Secondary button neutral
 */
 &.cre8-c-button--secondary.cre8-c-button--neutral {
    background-color: var(--cre8-color-button-secondary-neutral-bg);
    border-color: var(--cre8-color-button-secondary-neutral-border);
    color: var(--cre8-color-button-secondary-neutral-content);
    --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-content);
    border-radius: var(--cre8-border-radius-button);
    border-width: var(--cre8-border-width-button-default);

  &:hover,
  &:focus {
    background-color: var(--cre8-color-button-secondary-neutral-bg-hover);
    border-color: var(--cre8-color-button-secondary-neutral-border-hover);
    color: var(--cre8-color-button-secondary-neutral-content-hover);
    --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-content-hover);
    &:focus {
      @includefocus();
    }
  }
  &:focus-visible,
  &:active,
  &.cre8-c-button--loading {
    transition: none;
    transform: none;
    background-color: var(--cre8-color-button-secondary-neutral-bg-active);
    border-color: var(--cre8-color-button-secondary-neutral-border-active);
    color: var(--cre8-color-button-secondary-neutral-content-active);
    --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-content-active);
  }
  &:focus-visible {
    @includefocus();
  }

  &:disabled {
    box-shadow: none;
    background-color: var(--cre8-color-button-secondary-neutral-bg-disabled);
    border-color: var(--cre8-color-button-secondary-neutral-border-disabled);
    color: var(--cre8-color-button-secondary-neutral-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-content-disabled);
    outline: none;
    border-radius: var(--cre8-border-radius-button);
    border-width: var(--cre8-border-width-button-default);
    cursor: not-allowed;
    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      background-color: var(--cre8-color-button-secondary-neutral-bg-disabled);
      border-color: var(--cre8-color-button-secondary-neutral-border-disabled);
      color: var(--cre8-color-button-secondary-neutral-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-content-disabled);
    }
  }
 }

/**
 * Secondary button inverse
 */
 &.cre8-c-button--secondary.cre8-c-button--inverse {
  background-color: var(--cre8-color-button-secondary-inverse-bg);
  border-color: var(--cre8-color-button-secondary-inverse-border);
  color: var(--cre8-color-button-secondary-inverse-content);
  --cre8-icon-fill: var(--cre8-color-button-secondary-inverse-content);
  border-radius: var(--cre8-border-radius-button);
  border-width: var(--cre8-border-width-button-default);

&:hover,
&:focus {
  background-color: var(--cre8-color-button-secondary-inverse-bg-hover);
  border-color: var(--cre8-color-button-secondary-inverse-border-hover);
  color: var(--cre8-color-button-secondary-inverse-content-hover);
  --cre8-icon-fill: var(--cre8-color-button-secondary-inverse-content-hover);
  &:focus {
    @includefocus();
  }
}
&:focus-visible,
&:active,
&.cre8-c-button--loading {
  transition: none;
  transform: none;
  background-color: var(--cre8-color-button-secondary-inverse-bg-active);
  border-color: var(--cre8-color-button-secondary-inverse-border-active);
  color: var(--cre8-color-button-secondary-inverse-content-active);
  --cre8-icon-fill: var(--cre8-color-button-secondary-inverse-content-active);
}
&:focus-visible {
  @includefocus();
}

&:disabled {
  box-shadow: none;
  background-color: var(--cre8-color-button-secondary-inverse-bg-disabled);
  border-color: var(--cre8-color-button-secondary-inverse-border-disabled);
  color: var(--cre8-color-button-secondary-inverse-content-disabled);
  --cre8-icon-fill: var(--cre8-color-button-secondary-inverse-content-disabled);
  outline: none;
  border-radius: var(--cre8-border-radius-button);
  border-width: var(--cre8-border-width-button-default);
  cursor: not-allowed;
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    outline: none;
    background-color: var(--cre8-color-button-secondary-inverse-bg-disabled);
    border-color: var(--cre8-color-button-secondary-inverse-border-disabled);
    color: var(--cre8-color-button-secondary-inverse-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-secondary-inverse-content-disabled);
  }
}
}

  /**
 * Secondary button neutral inverse
 */
 &.cre8-c-button--secondary.cre8-c-button--neutral.cre8-c-button--inverse {
  background-color: var(--cre8-color-button-secondary-neutral-inverse-bg);
  border-color: var(--cre8-color-button-secondary-neutral-inverse-border);
  color: var(--cre8-color-button-secondary-neutral-inverse-content);
  --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-inverse-content);
  border-radius: var(--cre8-border-radius-button);
  border-width: var(--cre8-border-width-button-default);

&:hover,
&:focus {
  @includefocus();
  background-color: var(--cre8-color-button-secondary-neutral-bg-active);
  border-color: var(--cre8-color-button-secondary-neutral-inverse-border-active);
  outline-color: var(--cre8-color-button-secondary-neutral-inverse-outline);
  color: var(--cre8-color-button-secondary-neutral-inverse-content-active);
  --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-inverse-content-active);
}

&:focus-visible,
&:active,
&.cre8-c-button--loading {
  transition: none;
  transform: none;
  background-color: var(--cre8-color-button-secondary-neutral-inverse-bg-active);
  border-color: var(--cre8-color-button-secondary-neutral-inverse-border-active);
  color: var(--cre8-color-button-secondary-neutral-inverse-content-active);
  --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-inverse-content-active);
}
&:focus-visible {
  @includefocus();
}

&:disabled {
  box-shadow: none;
  background-color: var(--cre8-color-button-secondary-neutral-inverse-bg-disabled);
  border-color: var(--cre8-color-button-secondary-neutral-inverse-border-disabled);
  color: var(--cre8-color-button-secondary-neutral-inverse-content-disabled);
  --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-inverse-content-disabled);
  outline: none;
  border-radius: var(--cre8-border-radius-button);
  border-width: var(--cre8-border-width-button-default);
  cursor: not-allowed;
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    outline: none;
    background-color: var(--cre8-color-button-secondary-neutral-inverse-bg-disabled);
    border-color: var(--cre8-color-button-secondary-neutral-inverse-border-disabled);
    color: var(--cre8-color-button-secondary-neutral-inverse-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-secondary-neutral-inverse-content-disabled);
  }
}
}

  /**
 * Tertiary button
 */
  &.cre8-c-button--tertiary {
    border-radius: var(--cre8-border-radius-button);
    background-color: var(--cre8-color-button-tertiary-bg);
    border-width: var(--cre8-border-width-button-default);
    border-color: var(--cre8-color-button-tertiary-border);
    color: var(--cre8-color-button-tertiary-content);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-content);
    box-shadow: none;
    &:hover,
    &:focus {
      border-radius: var(--cre8-border-radius-button);
      background-color: var(--cre8-color-button-tertiary-bg-hover);
      border-width: var(--cre8-border-width-button-default, --cre8-border-width-none);
      border-color: var(--cre8-color-button-tertiary-border-hover);
      color: var(--cre8-color-button-tertiary-content-hover);
      --cre8-icon-fill: var(--cre8-color-button-tertiary-content-hover);
      &:focus {
        @includefocusTertiary();
      }
    }

  &:focus-visible,
  &:active,
  &.cre8-c-button--loading {
    border-radius: var(--cre8-border-radius-button);
    background-color: var(--cre8-color-button-tertiary-bg-active);
    border-color: var(--cre8-color-button-tertiary-border-active);
    border-width: var(--cre8-border-width-button-default);
    color: var(--cre8-color-button-tertiary-content-active);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-content-active);
  }
  &:focus-visible {
    @includefocusTertiary();
  }
  &.cre8-c-button--loading {
    cursor: not-allowed;
  }
  &:disabled {
    background-color: var(--cre8-color-button-tertiary-bg-disabled);
    border-color: transparent;
    color: var(--cre8-color-button-tertiary-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-content-disabled);
    outline: none;
    box-shadow: none;
    cursor: not-allowed;

    &:hover,
    &:focus {
      outline: none;
      box-shadow: none;
      background-color: var(--cre8-color-button-tertiary-bg-disabled);
      color: var(--cre8-color-button-tertiary-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-tertiary-content-disabled);
    }
    &:active,
    &:focus-visible {
      outline: none;
      box-shadow: none;
      background-color: var(--cre8-color-button-tertiary-bg-disabled);
      color: var(--cre8-color-button-tertiary-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-tertiary-content-disabled);
    }
  }
}

 /**
 * Tertiary button neutral
 */
 &.cre8-c-button--tertiary.cre8-c-button--neutral {
  background-color: var(--cre8-color-button-tertiary-neutral-bg);
  border-color: var(--cre8-color-button-tertiary-border);
  color: var(--cre8-color-button-tertiary-neutral-content);
  --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-content);
  border-radius: var(--cre8-border-radius-button);
  border-width: var(--cre8-border-width-button-default);

  &:hover,
  &:focus {
    background-color: var(--cre8-color-button-tertiary-neutral-bg-hover);
    border-color: var(--cre8-color-button-tertiary-neutral-border-hover);
    color: var(--cre8-color-button-tertiary-neutral-content-hover);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-content-hover);
    outline-color: var(--cre8-color-button-tertiary-neutral-outline);
  }

  &:focus-visible,
  &:active,
  &.cre8-c-button--loading {
    transition: none;
    transform: none;
    background-color: var(--cre8-color-button-tertiary-neutral-bg-active);
    border-color: var(--cre8-color-button-tertiary-neutral-border-active);
    color: var(--cre8-color-button-tertiary-neutral-content-active);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-content-active);
  }

  &:focus-visible {
    @includefocus();
  }

  &:disabled {
    box-shadow: none;
    background-color: var(--cre8-color-button-tertiary-neutral-bg-disabled);
    border-color: var(--cre8-color-button-tertiary-neutral-border-disabled);
    color: var(--cre8-color-button-tertiary-neutral-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-content-disabled);
    outline: none;
    border-radius: var(--cre8-border-radius-button);
    border-width: var(--cre8-border-width-button-default);

    cursor: not-allowed;
  }
 }

/**
 * Tertiary button inverse
 */
 &.cre8-c-button--tertiary.cre8-c-button--inverse {
  border-radius: var(--cre8-border-radius-button);
  background-color: var(--cre8-color-button-tertiary-inverse-bg);
  border-width: var(--cre8-border-width-button-default);
  border-color: var(--cre8-color-button-tertiary-inverse-border);
  color: var(--cre8-color-button-tertiary-inverse-content);
  --cre8-icon-fill: var(--cre8-color-button-tertiary-inverse-content);
  box-shadow: none;

  &:hover,
  &:focus {
    border-radius: var(--cre8-border-radius-button);
    background-color: var(--cre8-color-button-tertiary-inverse-bg-hover);
    border-width: var(--cre8-border-width-button-default, --cre8-border-width-none);
    border-color: var(--cre8-color-button-tertiary-inverse-border-hover);
    color: var(--cre8-color-button-tertiary-inverse-content-hover);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-inverse-content-hover);
    outline-color: var(--cre8-color-button-tertiary-inverse-outline);
  }

&:focus-visible,
&:active,
&.cre8-c-button--loading {
  border-radius: var(--cre8-border-radius-button);
  background-color: var(--cre8-color-button-tertiary-inverse-bg-active);
  border-color: var(--cre8-color-button-tertiary-inverse-border-active);
  border-width: var(--cre8-border-width-button-default);
  color: var(--cre8-color-button-tertiary-inverse-content-active);
  --cre8-icon-fill: var(--cre8-color-button-tertiary-inverse-content-active);
  outline-color: var(--cre8-color-button-tertiary-inverse-outline);
}

&.cre8-c-button--loading {
  cursor: not-allowed;
}
&:disabled {
  background-color: var(--cre8-color-button-tertiary-inverse-bg-disabled);
  border-color: transparent;
  color: var(--cre8-color-button-tertiary-inverse-content-disabled);
  --cre8-icon-fill: var(--cre8-color-button-tertiary-inverse-content-disabled);
  outline: none;
  box-shadow: none;
  cursor: not-allowed;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: none;
    background-color: var(--cre8-color-button-tertiary-inverse-bg-disabled);
    color: var(--cre8-color-button-tertiary-inverse-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-inverse-content-disabled);
  }
  &:active,
  &:focus-visible {
    outline: none;
    box-shadow: none;
    background-color: var(--cre8-color-button-tertiary-inverse-bg-disabled);
    color: var(--cre8-color-button-tertiary-inverse-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-inverse-content-disabled);
  }
}
}

 /**
 * Tertiary Neutral button inverse
 */
 &.cre8-c-button--tertiary.cre8-c-button--neutral.cre8-c-button--inverse {
  border-radius: var(--cre8-border-radius-button);
  background-color: var(--cre8-color-button-tertiary-neutral-inverse-bg);
  border-width: var(--cre8-border-width-button-default);
  color: var(--cre8-color-button-tertiary-neutral-inverse-content);
  --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-inverse-content);
  box-shadow: none;

  &:hover,
  &:focus {
    border-radius: var(--cre8-border-radius-button);
    background-color: var(--cre8-color-button-tertiary-neutral-inverse-bg-hover);
    border-width: var(--cre8-border-width-button-default, --cre8-border-width-none);
    border-color: var(--cre8-color-button-tertiary-neutral-inverse-border-hover);
    color: var(--cre8-color-button-tertiary-neutral-inverse-content-hover);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-inverse-content-hover);
    outline-color: var(--cre8-color-button-tertiary-neutral-inverse-outline);
  }

  &:focus-visible,
  &:active,
  &.cre8-c-button--loading {
    border-radius: var(--cre8-border-radius-button);
    background-color: var(--cre8-color-button-tertiary-neutral-inverse-bg-active);
    border-color: var(--cre8-color-button-tertiary-neutral-inverse-border-active);
    border-width: var(--cre8-border-width-button-default);
    color: var(--cre8-color-button-tertiary-neutral-inverse-content-active);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-inverse-content-active);
    outline-color: var(--cre8-color-button-tertiary-neutral-inverse-outline);
  }

  &.cre8-c-button--loading {
    cursor: not-allowed;
  }

  &:disabled {
    background-color: var(--cre8-color-button-tertiary-neutral-inverse-bg-disabled);
    border-color: transparent;
    color: var(--cre8-color-button-tertiary-neutral-inverse-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-neutral-inverse-content-disabled);
    outline: none;
    box-shadow: none;
    cursor: not-allowed;
  }
 }

  &.cre8-c-button.cre8-c-button--secondary.cre8-c-button--split-button-text {
    border-radius: var(--cre8-border-radius-button) var(--cre8-border-radius-none) var(--cre8-border-radius-none) var(--cre8-border-radius-button);
    border-color: var(--cre8-color-button-secondary-border);
    border-width: var(--cre8-border-width-button-default);
    color: var(--cre8-color-button-secondary-content);
    &:active,
    &:focus-visible {
      outline: none;
    }
    &.cre8-c-button--lg {
      padding: var(--cre8-button-padding-vertical-large) var(--cre8-button-padding-horizontal-large);
    }
    &.cre8-c-button--sm {
      padding: var(--cre8-button-padding-vertical-small) var(--cre8-button-padding-horizontal-small);
    }
  }

  &.cre8-c-button.cre8-c-button--icon-only.cre8-c-button--split-button-caret {
    padding: var(--cre8-button-padding-vertical-medium);
    border-radius: var(--cre8-border-radius-none) var(--cre8-border-radius-button) var(--cre8-border-radius-button) var(--cre8-border-radius-none);
    height: 100%;
    border-left: none !important ;
    border-collapse: collapse;
    background: var(--cre8-color-button-secondary-bg);
    border-color: var(--cre8-color-button-secondary-border);
    border-width: var(--cre8-border-width-button-default);
    color: var(--cre8-color-button-secondary-content);
    --cre8-icon-fill: var(--cre8-color-button-secondary-content);

    &:hover,
    &:focus {
      background: var(--cre8-color-button-secondary-bg-hover);
      border-color: var(--cre8-color-button-secondary-border-hover);
      --cre8-icon-fill: var(--cre8-color-button-secondary-content-hover);
      outline: none;
      border-left: none;
      border-collapse: collapse;
    }
    &:active,
    &:focus-visible {
      background: var(--cre8-color-button-secondary-bg-active);
      border-color: var(--cre8-color-button-secondary-border-active);
      --cre8-icon-fill: var(--cre8-color-button-secondary-content-active);
      outline: none;
      border-left: none;
      border-collapse: collapse;
    }
  }
}

.cre8-c-button--lg {
  padding: var(--cre8-button-padding-vertical-large);
}
.cre8-c-button--sm {
  padding: var(--cre8-button-padding-vertical-small);
}

.cre8-c-button--icon-only {
  padding: var(--cre8-button-padding-vertical-small);
  color: var(--cre8-icon-fill, currentColor);
}

/**
 * Full-width button
 */
.cre8-c-button--full-width {
  width: 100%;
  display: flex;
}

/**
 * Small button
 */
.cre8-c-button--sm {
  @include cre8-typography-label-small();
  padding-top: var(--cre8-button-padding-vertical-small);
  padding-right: var(--cre8-button-padding-horizontal-small);
  padding-bottom: var(--cre8-button-padding-vertical-small);
  padding-left: var(--cre8-button-padding-horizontal-small);
}

/**
 * Small button sized for icon only
 */
 .cre8-c-button--sm.cre8-c-button--icon-only {
  @include cre8-typography-label-small();
  padding-top: var(--cre8-button-padding-vertical-small-icon-only);
  padding-right: var(--cre8-button-padding-horizontal-small-icon-only);
  padding-bottom: var(--cre8-button-padding-vertical-small-icon-only);
  padding-left: var(--cre8-button-padding-horizontal-small-icon-only);
}

/**
 * Large button
 */
.cre8-c-button--lg {
  @include cre8-typography-label-large();
  padding-top: var(--cre8-button-padding-vertical-large);
  padding-right: var(--cre8-button-padding-horizontal-large);
  padding-bottom: var(--cre8-button-padding-vertical-large);
  padding-left: var(--cre8-button-padding-horizontal-large);
}

/**
 * Large button sized for icon only
 */
 .cre8-c-button--lg.cre8-c-button--icon-only {
  @include cre8-typography-label-large();
  padding-top: var(--cre8-button-padding-vertical-large-icon-only);
  padding-right: var(--cre8-button-padding-horizontal-large-icon-only);
  padding-bottom: var(--cre8-button-padding-vertical-large-icon-only);
  padding-left: var(--cre8-button-padding-horizontal-large-icon-only);
}

/**
  * Icon within small button
  */
.cre8-c-button--sm cre8-icon-legacy {
  --cre8-icon-height: var(--cre8-icon-size-small);
  --cre8-icon-width: var(--cre8-icon-size-small);
}

.cre8-c-button--sm cre8-icon {
  svg {
    height: calc(8px * 1.75);
    width: calc(8px * 1.75);
  }
}

/**
  * Icon within large button
  */
.cre8-c-button--lg cre8-icon-legacy {
  --cre8-icon-height: var(--cre8-icon-size-large);
  --cre8-icon-width: var(--cre8-icon-size-large);
}

.cre8-c-button--lg cre8-icon {
  svg {
    height: calc(8px * 2.25);
    width: calc(8px * 2.25);
  }
}

::slotted(*) {
  margin-right: 0;
}
/**
 * Button icon directly before button text
 */

cre8-icon-legacy + .cre8-c-button__text:not(.cre8-u-is-vishidden) {
  margin-left: calc(8px * 1);
}

cre8-icon + .cre8-c-button__text:not(.cre8-u-is-vishidden) {
  margin-left: calc(8px * 1);
}

/**
   * Button icon directly after button text
   */
.cre8-c-button__text:not(.cre8-u-is-vishidden) + cre8-icon-legacy {
  margin-left: calc(8px * 1);
}

.cre8-c-button__text:not(.cre8-u-is-vishidden) + cre8-icon {
  margin-left: calc(8px * 1);
}
/**
   * Button icon only
   */
.cre8-c-button:has(.cre8-c-button__text.cre8-u-is-vishidden) + cre8-icon-legacy {
  border-radius: var(--cre8-border-radius-button);
}

.cre8-c-button:has(.cre8-c-button__text.cre8-u-is-vishidden) + cre8-icon {
  border-radius: var(--cre8-border-radius-button);
}

.cre8-c-button__text.cre8-u-is-vishidden + cre8-icon-legacy {
  margin-left: 0px;
  margin-right: 0px;
}

.cre8-c-button__text.cre8-u-is-vishidden + cre8-icon {
  margin-left: 0px;
  margin-right: 0px;
}

.cre8-c-button__text.cre8-u-is-vishidden {
  @include visuallyHidden();
}

.cre8-c-button--primary.cre8-c-button--loading {
  --cre8-icon-fill: var(--cre8-color-content-knockout);
}
.cre8-c-button--secondary.cre8-c-button--loading,
.cre8-c-button--tertiary.cre8-c-button--loading {
  --cre8-icon-fill: var(--cre8-color-button-secondary-content-active);
}

/**
 * Aria live span
 */
.cre8-u-is-vishidden {
  --cre8-icon-height: 0px;
  --cre8-icon-width: 0px;
  max-width: fit-content;
  min-width: 0px;
  width: auto;
  height: auto;
  max-height: fit-content;
  min-width: 0px;

  @include visuallyHidden();
}

cre8-icon-legacy.cre8-u-is-vishidden {
  @include visuallyHidden();
}

span.cre8-c-button__icon {
  margin-left: calc(8px * 1);
  max-width: fit-content;
  min-width: 0px;
  width: auto;
  height: auto;
  max-height: fit-content;
  min-width: 0px;
}

cre8-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: calc(8px * 2);
    width: calc(8px * 2);
  }
}
`;
var Sh = Object.defineProperty, K = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Sh(e, t, i), i;
};
const aa = class aa extends le {
  constructor() {
    super(...arguments), this.text = "Button", this.variant = "primary", this.type = "button", this.iconRotateDegree = 0, this.iconPosition = void 0, this.size = "md", this.ariaLive = "assertive";
  }
  formSubmit() {
    const e = this._internals.form;
    e && e.requestSubmit();
  }
  formReset() {
    const e = this._internals.form;
    e && e.reset();
  }
  generateIconBefore() {
    if (this.iconPosition === "before") {
      if (this.iconName)
        return f`<cre8-icon-legacy slot="before" aria-hidden="true" name="${$(this.iconName)}">
                </cre8-icon-legacy>`;
      if (this.svg)
        return f`<cre8-icon slot="before" aria-hidden="true"
                svg='${this.svg}' rotate="${Number(this.iconRotateDegree)}" flip="${this.iconFlipDirection}">
                </cre8-icon>`;
    }
    return T;
  }
  generateIconAfter() {
    if (this.iconPosition === "after") {
      if (this.iconName)
        return f`<cre8-icon-legacy slot="after" aria-hidden="true" name="${$(this.iconName)}">
                </cre8-icon-legacy>`;
      if (this.svg)
        return f`<cre8-icon slot="after" aria-hidden="true"
                svg='${this.svg}' rotate="${Number(this.iconRotateDegree)}" flip="${this.iconFlipDirection}">
                </cre8-icon>`;
    }
    return T;
  }
  // TODO: Temporarily keep eslint complexity as warning. Update during specific story for this rule.
  /* eslint complexity: ["warn", 10] */
  render() {
    const e = this.componentClassNames("cre8-c-button", {
      "cre8-c-button--primary": this.variant === "primary",
      "cre8-c-button--secondary": this.variant === "secondary",
      "cre8-c-button--tertiary": this.variant === "tertiary",
      "cre8-c-button--full-width": this.fullWidth === !0,
      "cre8-c-button--sm": this.size === "sm",
      "cre8-c-button--lg": this.size === "lg",
      "cre8-c-button--icon-only": this.hideText,
      "cre8-c-button--split-button-text": this.splitButtonType === "text",
      "cre8-c-button--split-button-caret": this.splitButtonType === "caret",
      "cre8-c-button--neutral": this.neutral,
      "cre8-c-button--inverse": this.inverse,
      "cre8-c-button--loading": this.loading
    });
    return this.hideText && (this.iconPosition = "after"), this.href ? f`
            <a
                href="${$(this.href)}"
                class="${e}"
                rel="${$(this.rel)}"
                target="${$(this.target)}"
            >
            ${this.generateIconBefore()}
            <span
                class="${this.hideText ? "cre8-u-is-vishidden cre8-c-button__text" : "cre8-c-button__text"}"
            >
                ${this.text}
            </span>
            ${this.generateIconAfter()}
            </a>
        ` : f` <button
            class="${e}"
            part="button"
            aria-disabled="${$(this.loading)}"
            ?disabled=${this.disabled}
            @click="${this._buttonClick}"
            aria-expanded="${$(this.buttonAriaExpanded)}"
        >
            <slot name="before"></slot>
            ${this.generateIconBefore()}
            <span
                class="${this.hideText ? "cre8-u-is-vishidden cre8-c-button__text" : "cre8-c-button__text"}"
            >
                ${this.text}
            </span>
            ${this.generateIconAfter()}
            <slot name="after"></slot>
            ${this.loading || this.loadingComplete ? f`<span class="cre8-c-button__icon" aria-live="${this.ariaLive}" role="alert">
                <span class="cre8-u-is-vishidden">${this.loadingComplete ? "Loading Complete" : "Loading"}</span>
                ${this.loadingComplete ? T : f`
            <cre8-loading-spinner
                class="cre8-c-button__loading-icon"
                size="small"
                ?neutral=${this.neutral}
                ?inverse=${this.inverse}
                buttonVariant=${this.variant}
                aria-hidden="true"
            ></cre8-loading-spinner>`}
                </span>` : T}
        </button>`;
  }
  _buttonClick(e) {
    if (this.loading)
      e.stopPropagation();
    else
      switch (this.type) {
        case "submit":
          this.formSubmit();
          break;
        case "reset":
          this.formReset();
          break;
      }
  }
};
aa.styles = [Lh];
let F = aa;
K([
  u()
], F.prototype, "text");
K([
  u({ type: String })
], F.prototype, "variant");
K([
  u({ type: Boolean, reflect: !0 })
], F.prototype, "disabled");
K([
  u({ type: Boolean, reflect: !0 })
], F.prototype, "neutral");
K([
  u({ type: Boolean, reflect: !0 })
], F.prototype, "inverse");
K([
  u()
], F.prototype, "href");
K([
  u()
], F.prototype, "target");
K([
  u()
], F.prototype, "type");
K([
  u()
], F.prototype, "rel");
K([
  u()
], F.prototype, "iconName");
K([
  u()
], F.prototype, "svg");
K([
  u({ type: Number })
], F.prototype, "iconRotateDegree");
K([
  u()
], F.prototype, "iconFlipDirection");
K([
  u()
], F.prototype, "iconPosition");
K([
  u()
], F.prototype, "size");
K([
  u({ type: Boolean, reflect: !0 })
], F.prototype, "hideText");
K([
  u({ type: Boolean, reflect: !0 })
], F.prototype, "fullWidth");
K([
  u({ type: Boolean, reflect: !0 })
], F.prototype, "loading");
K([
  u({ type: Boolean, reflect: !0 })
], F.prototype, "loadingComplete");
K([
  u()
], F.prototype, "ariaLive");
K([
  u()
], F.prototype, "splitButtonType");
K([
  u({ type: Boolean, reflect: !0 })
], F.prototype, "buttonAriaExpanded");
K([
  oe("button")
], F.prototype, "field");
customElements.get("cre8-button") === void 0 && customElements.define("cre8-button", F);
const Ah = k`@import '../../design-tokens/core/scss/theming/component';

/**
* Accordion Item panel button
* 1) Icon rotating on open was causing scrollbar to continuously appear/disappear
*    during the animation, overflow-x: hidden; prevents this from happening
*/

:host {
  display: block;
  ::slotted(*) {
    text-align: left;
    width: 100%;
  }
}

.cre8-c-accordion-item {
  border-bottom: var(--cre8-accordion-item-border-bottom);
  border-radius: var(--cre8-border-radius-none);
  --cre8-u-icon-display: flex;
  --cre8-u-icon-align-items: center;
  --cre8-u-icon-justify-content: center;
  padding: calc(8px * 3) calc(8px * 1);
}
.cre8-c-accordion-item--small cre8-heading button {
  @include cre8-typography-title-default();
}
.cre8-c-accordion-item--large cre8-heading button {
  @include cre8-typography-title-large();
}
.cre8-c-accordion-item__body {
  margin-right: calc(8px * 0);
  margin-left: calc(8px * 0);
  padding: calc(8px * 0);
  overflow: hidden;
  visibility: hidden;
  transition: height var(--cre8-anim-fade-quick) var(--cre8-anim-ease), visibility var(--cre8-anim-fade-quick) var(--cre8-anim-ease);

  .cre8-c-accordion-item.cre8-is-active & {
    visibility: visible;
  }
}

.cre8-c-accordion-item__body-inner {
  display: flex;
  @include cre8-typography-body-default();
  padding: calc(8px * 1) calc(8px * 6) calc(8px * 0) calc(8px * 1);
}

cre8-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(8px * 3);
  min-height: calc(8px * 3);
  min-width: calc(8px * 3);
  transition: transform var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  width: calc(8px * 3);

  .cre8-c-accordion-item.cre8-is-active & {
    transform: rotate(180deg);
  }
}

.cre8-c-accordion-item__icon {
  align-items: center;
  background: var(--cre8-color-bg-brand-strong);
  border-radius: var(--cre8-border-radius-round);
  color: var(--cre8-color-content-knockout);
  display: flex;
  height: calc(8px * 4);
  justify-content: center;
  margin-left: calc(8px * 1);
  margin-right: calc(8px * 0.25);
  min-height: calc(8px * 4);
  min-width: calc(8px * 4);
  width: calc(8px * 4);

  .cre8-c-accordion-item.cre8-is-active & {
    background: var(--cre8-color-button-secondary-bg);
    border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-button-secondary-border);
    color: var(--cre8-color-button-secondary-content);

    &:hover {
      border-color: var(--cre8-color-button-secondary-border-hover);
      background-color: var(--cre8-color-button-secondary-bg-hover);
      color: var(--cre8-color-button-secondary-content-hover);
    }

    &:focus {
      border-radius: var(--cre8-border-radius-default);
      box-shadow: calc(8px * 0) calc(8px * 0) calc(8px * 0) calc(8px * 0.25) var(--cre8-color-border-active-outline);
      outline: none;

      .cre8-c-accordion-item__icon {
        border-color: var(--cre8-color-button-secondary-border-active);
        color: var(--cre8-color-button-secondary-content-active);
        background-color: var(--cre8-color-button-secondary-bg-active);
      }
      .cre8-c-accordion-item__tertiary-icon {
        border-color: var(--cre8-color-border-transparent);
        color: var(--cre8-color-button-tertiary-content-active);
        background-color: var(--cre8-color-bg-transparent);
      }
    }
  }
}

.cre8-c-accordion-item__button {
  color: var(--cre8-color-content-default);
  display: block;
  appearance: none;
  background-color: var(--cre8-color-bg-transparent);
  border: var(--cre8-border-width-none);
  cursor: pointer;
  padding: calc(8px * 0.5) calc(8px * 1);
  overflow-x: hidden;
  transition: color var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  width: 100%;

  &.cre8-brand-color {
    color: var(--cre8-color-content-brand-strong);
  }

  &.cre8-u-justify-content-start {
    justify-content: flex-start;
    .cre8-c-accordion-item__icon-before {
      margin-left: calc(8px * 0);
    }
  }

  &:hover {
    .cre8-c-accordion-item__icon {
      border-color: var(--cre8-color-button-primary-border-hover);
      background-color: var(--cre8-color-button-primary-bg-hover);
      color: var(--cre8-color-button-primary-content-hover);
      .cre8-c-accordion-item.cre8-is-active & {
        border-color: var(--cre8-color-button-secondary-border-hover);
        background-color: var(--cre8-color-button-secondary-bg-hover);
        color: var(--cre8-color-button-secondary-content-hover);
      }
    }
    .cre8-c-accordion-item__tertiary-icon {
      border-color: var(--cre8-color-border-transparent);
      color: var(--cre8-color-button-tertiary-content-hover);
      background-color: var(--cre8-color-bg-transparent);
    }
  }

  &:focus {
    border-radius: var(--cre8-border-radius-default);
    box-shadow: calc(8px * 0) calc(8px * 0) calc(8px * 0) calc(8px * 0.25) var(--cre8-color-border-active-outline);
    outline: none;

    .cre8-c-accordion-item__icon {
      border-color: var(--cre8-color-button-primary-border-active);
      color: var(--cre8-color-button-primary-content-active);
      background-color: var(--cre8-color-button-primary-bg-active);
    }
    .cre8-c-accordion-item__tertiary-icon {
      border-color: var(--cre8-color-border-transparent);
      color: var(--cre8-color-button-tertiary-content-active);
      background-color: var(--cre8-color-bg-transparent);
    }
  }
}
.cre8-c-accordion-item--icon-before {
  .cre8-c-accordion-item__body {
    margin-left: calc(8px * 5);
  }
}

.cre8-c-accordion-item__icon-before {
  margin-right: calc(8px * 1.5);

  h4[slot='header'] {
    display: block;
    pointer-events: none;
  }
}

.cre8-c-accordion-item__button slot {
  display: contents;
  text-align: initial;
}
.cre8-c-accordion-item--icon-before-heading-text{
  display: flex;
  text-align: left;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-width: 100%
}
.cre8-c-accordion-item--icon-after-heading-text{
  display: flex;
  text-align: left;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 100%
}
`;
var Th = Object.defineProperty, Ye = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Th(e, t, i), i;
};
const ca = class ca extends M {
  constructor() {
    super(), this.isActive = !1, this.size = "sm", this.headingTagVariant = "h3";
    const e = Math.floor(Math.random() * 9e5) + 1e5;
    this._ariaControls = `cre8-accordion-item-details-${e}`, this.accordionItemId = this.accordionItemId ?? `cre8-accordion-item-${e}`;
  }
  connectedCallback() {
    super.connectedCallback(), this._setContentHeight(), this.isActive && (this._fullyOpen = !0, this._setContentHeight());
  }
  async _setContentHeight() {
    await this.updateComplete, this.isActive && !this._fullyOpen || !this.isActive && this._fullyOpen ? this._height = `${this.shadowRoot?.querySelector(".cre8-c-accordion-item__body-inner")?.scrollHeight}px` : this.isActive && this._fullyOpen ? this._height = "auto" : !this.isActive && !this._fullyOpen && (this._height = "0");
  }
  _toggleAccordionItem() {
    this.isActive = !this.isActive, this.isActive ? (this._setContentHeight(), setTimeout(() => {
      this._fullyOpen = !0, this._setContentHeight();
    }, 350)) : (this._setContentHeight(), setTimeout(() => {
      this._fullyOpen = !1, this._setContentHeight();
    }, 50));
  }
  render() {
    const e = this.componentClassNames("cre8-c-accordion-item", {
      "cre8-is-active": this.isActive,
      "cre8-c-accordion-item--icon-before": this.iconBefore,
      "cre8-c-accordion-item--small": this.size === "sm",
      "cre8-c-accordion-item--large": this.size === "lg"
    }), t = Wi("cre8-c-accordion-item__button", {
      "cre8-is-active": this.isActive,
      "cre8-u-justify-content-start": this.iconBefore,
      "cre8-brand-color": this.brandHeader === !0
    });
    return f` <div id=${this.accordionItemId} class="${e}">
      <cre8-heading
        type=${this.size === "lg" ? "title-large" : "title-default"}
        part="heading"
        ?brandColor=${this.brandHeader}
        tagVariant="${this.headingTagVariant ?? "h3"}"
        class="cre8-c-accordion-item__header"
      >
        <button
          class="${t}"
          aria-expanded="${$(this.isActive)}"
          aria-controls="${this._ariaControls}"
          part="button"
          role="button"
          id="${this.id}"
          @click=${this._toggleAccordionItem}
        >
          ${this.iconBefore ? f`
            <div class="cre8-c-accordion-item--icon-before-heading-text">
                <div
                  class=${this.tertiaryIcon ? "cre8-c-accordion-item__tertiary-icon cre8-c-accordion-item__icon-before" : "cre8-c-accordion-item__icon cre8-c-accordion-item__icon-before"}
                >
                  <cre8-icon rotate="180" svg=${dt} aria-hidden="true"></cre8-icon>
                </div>
                ${this.heading ?? f` <slot name="heading"></slot>`}
            </div>
              ` : f`
          <div class="cre8-c-accordion-item--icon-after-heading-text">
            ${this.heading ?? f` <slot name="heading"></slot>`}
                <div
                  class=${this.tertiaryIcon ? "cre8-c-accordion-item__tertiary-icon cre8-c-accordion-item__icon-after" : "cre8-c-accordion-item__icon cre8-c-accordion-item__icon-after"}
                >
                  <cre8-icon rotate="180" svg='${dt}' aria-hidden="true"></cre8-icon>
                </div>
            </div>`}
        </button>
      </cre8-heading>
      <div
        class="cre8-c-accordion-item__body"
        aria-hidden="${!this.isActive}"
        id="${this._ariaControls}"
        part="body"
        style=${`height: ${this._height}`}
      >
        <div class="cre8-c-accordion-item__body-inner" part="body-inner">
          <slot></slot>
        </div>
      </div>
    </div>`;
  }
};
ca.styles = [Ah];
let Le = ca;
Ye([
  u({ type: Boolean, reflect: !0 })
], Le.prototype, "isActive");
Ye([
  u({ type: String, reflect: !0 })
], Le.prototype, "accordionItemId");
Ye([
  u({ type: Boolean, reflect: !0 })
], Le.prototype, "iconBefore");
Ye([
  u({ type: Boolean, reflect: !0 })
], Le.prototype, "tertiaryIcon");
Ye([
  u({ reflect: !0 })
], Le.prototype, "size");
Ye([
  u({ reflect: !0 })
], Le.prototype, "headingTagVariant");
Ye([
  u({ type: String })
], Le.prototype, "heading");
Ye([
  u({ type: Boolean })
], Le.prototype, "brandHeader");
Ye([
  u({ attribute: "aria-controls" })
], Le.prototype, "_ariaControls");
Ye([
  R()
], Le.prototype, "_height");
Ye([
  R()
], Le.prototype, "_fullyOpen");
customElements.get("cre8-accordion-item") === void 0 && customElements.define("cre8-accordion-item", Le);
const As = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9978 5.87895 15.1542 3.84542 13.6544 2.34562C12.1546 0.845814 10.121 0.00223986 8 0ZM7.38462 4.30769C7.38462 4.14448 7.44945 3.98796 7.56486 3.87255C7.68027 3.75714 7.83679 3.69231 8 3.69231C8.16321 3.69231 8.31974 3.75714 8.43514 3.87255C8.55055 3.98796 8.61539 4.14448 8.61539 4.30769V8.61538C8.61539 8.77859 8.55055 8.93512 8.43514 9.05053C8.31974 9.16593 8.16321 9.23077 8 9.23077C7.83679 9.23077 7.68027 9.16593 7.56486 9.05053C7.44945 8.93512 7.38462 8.77859 7.38462 8.61538V4.30769ZM8 12.3077C7.81743 12.3077 7.63897 12.2536 7.48717 12.1521C7.33537 12.0507 7.21706 11.9065 7.14719 11.7379C7.07732 11.5692 7.05904 11.3836 7.09466 11.2045C7.13028 11.0255 7.21819 10.861 7.34729 10.7319C7.47638 10.6028 7.64086 10.5149 7.81992 10.4793C7.99898 10.4437 8.18458 10.4619 8.35325 10.5318C8.52192 10.6017 8.66608 10.72 8.76751 10.8718C8.86894 11.0236 8.92308 11.202 8.92308 11.3846C8.92308 11.6294 8.82583 11.8642 8.65271 12.0373C8.4796 12.2104 8.24482 12.3077 8 12.3077Z"/>
</svg>
`, Ph = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M11.7133 15.4286C11.7133 15.5802 11.6531 15.7255 11.5459 15.8327C11.4388 15.9398 11.2934 16 11.1419 16H5.42827C5.27674 16 5.13141 15.9398 5.02426 15.8327C4.91711 15.7255 4.85691 15.5802 4.85691 15.4286C4.85691 15.2771 4.91711 15.1318 5.02426 15.0246C5.13141 14.9175 5.27674 14.8573 5.42827 14.8573H11.1419C11.2934 14.8573 11.4388 14.9175 11.5459 15.0246C11.6531 15.1318 11.7133 15.2771 11.7133 15.4286ZM14.5701 6.28682C14.5726 7.23931 14.3574 8.17978 13.941 9.03644C13.5246 9.89311 12.918 10.6433 12.1675 11.2298C12.0272 11.3374 11.9133 11.4756 11.8346 11.6339C11.7558 11.7923 11.7144 11.9665 11.7133 12.1433V12.5718C11.7133 12.8749 11.5929 13.1655 11.3786 13.3798C11.1643 13.5942 10.8736 13.7145 10.5705 13.7145H5.99964C5.69657 13.7145 5.40591 13.5942 5.19161 13.3798C4.9773 13.1655 4.85691 12.8749 4.85691 12.5718V12.1433C4.85679 11.9686 4.81662 11.7963 4.73949 11.6395C4.66235 11.4828 4.55031 11.3458 4.41196 11.2391C3.66333 10.6561 3.05715 9.91037 2.63929 9.05844C2.22143 8.20652 2.00285 7.2707 2.00009 6.32182C1.98152 2.91792 4.73264 0.0832435 8.13368 0.00182421C8.97169 -0.0183701 9.80527 0.129276 10.5854 0.436073C11.3655 0.74287 12.0763 1.20262 12.6761 1.78826C13.2758 2.3739 13.7523 3.07359 14.0776 3.84616C14.4029 4.61873 14.5703 5.44857 14.5701 6.28682ZM12.2768 5.61976C12.1286 4.7922 11.7305 4.02991 11.1359 3.4355C10.5414 2.8411 9.77903 2.44311 8.95144 2.29513C8.87744 2.28266 8.80171 2.28488 8.72857 2.30168C8.65543 2.31847 8.58631 2.34951 8.52516 2.39301C8.46401 2.43652 8.41204 2.49164 8.37219 2.55524C8.33235 2.61883 8.30542 2.68965 8.29295 2.76365C8.28047 2.83765 8.2827 2.91339 8.29949 2.98653C8.31628 3.05967 8.34732 3.12879 8.39083 3.18993C8.43433 3.25108 8.48946 3.30306 8.55305 3.3429C8.61664 3.38275 8.68746 3.40967 8.76147 3.42215C9.9449 3.62141 10.9491 4.62558 11.1498 5.81116C11.1724 5.94423 11.2414 6.065 11.3445 6.15207C11.4477 6.23914 11.5783 6.28687 11.7133 6.28682C11.7456 6.28663 11.7778 6.284 11.8097 6.27897C11.959 6.25347 12.0921 6.1697 12.1797 6.04608C12.2673 5.92246 12.3022 5.76911 12.2768 5.61976Z"/>
</svg>
`, Eh = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9978 5.87895 15.1542 3.84542 13.6544 2.34562C12.1546 0.845814 10.121 0.00223986 8 0ZM11.0769 8.61538H6.40846L7.82 10.0262C7.87718 10.0833 7.92253 10.1512 7.95347 10.2259C7.98442 10.3006 8.00034 10.3807 8.00034 10.4615C8.00034 10.5424 7.98442 10.6225 7.95347 10.6972C7.92253 10.7719 7.87718 10.8397 7.82 10.8969C7.76283 10.9541 7.69495 10.9994 7.62025 11.0304C7.54554 11.0613 7.46548 11.0773 7.38462 11.0773C7.30376 11.0773 7.22369 11.0613 7.14899 11.0304C7.07429 10.9994 7.00641 10.9541 6.94923 10.8969L4.48769 8.43538C4.43048 8.37823 4.38509 8.31036 4.35412 8.23565C4.32315 8.16095 4.30721 8.08087 4.30721 8C4.30721 7.91913 4.32315 7.83905 4.35412 7.76434C4.38509 7.68964 4.43048 7.62177 4.48769 7.56461L6.94923 5.10308C7.0647 4.9876 7.22132 4.92273 7.38462 4.92273C7.54792 4.92273 7.70453 4.9876 7.82 5.10308C7.93547 5.21855 8.00034 5.37516 8.00034 5.53846C8.00034 5.70176 7.93547 5.85837 7.82 5.97385L6.40846 7.38461H11.0769C11.2401 7.38461 11.3967 7.44945 11.5121 7.56486C11.6275 7.68026 11.6923 7.83679 11.6923 8C11.6923 8.16321 11.6275 8.31973 11.5121 8.43514C11.3967 8.55055 11.2401 8.61538 11.0769 8.61538Z"/>
</svg>
`, Dh = k`@import '../../design-tokens/core/scss/theming/component';

:host {
  display: inline-flex;
}

.cre8-c-link {
  display: inline-flex;
  text-decoration: none;
  height: 100%;
  color: var(--cre8-color-content-link);

  &:hover {
    .cre8-c-link__text,
    .cre8-c-link__text-area {
      color: var(--cre8-color-content-link-hover);
      border-color: var(--cre8-color-border-transparent);
      background-color: var(--cre8-color-bg-opacity-transparent);
    }
  }

  &:focus {
    outline: none;

    .cre8-c-link__text,
    .cre8-c-link__text-area {
      border-color: var(--cre8-color-border-transparent);
      background-color: var(--cre8-color-bg-active);
      color: var(--cre8-color-content-link-focus);
    }

    .cre8-c-link__cta-wrapper {
      color: var(--cre8-color-content-link-focus);
      @include focus;
      background-color: var(--cre8-color-button-primary-bg-hover); // TODO: CTA background color token not exists
      border: var(--cre8-border-width-focus) var(--cre8-border-style-default) var(--color-border-active-outline);
    }
  }

  &:active {
    .cre8-c-link__text,
    .cre8-c-link__text-area {
      border-color: var(--cre8-color-border-transparent);
      background-color: var(--cre8-color-bg-opacity-transparent);
      color: var(--cre8-color-content-link-active);
    }
  }
}

.cre8-c-link__text-area {
  display: inline-flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.cre8-c-link__text {
  @include cre8-typography-body-default-link();
  color: var(--cre8-color-content-link);
  display: inline-flex;

  .cre8-c-link--sm & {
    @include cre8-typography-body-small-link();
  }

  .cre8-c-link--lg & {
    @include cre8-typography-body-large-link();
  }
}

.cre8-c-link__text {
  .cre8-c-link__no-underline & {
    text-decoration: none;
  }
}

.cre8-c-link__icon-wrapper {
  display: inline-flex;
}

.cre8-c-link__icon {
  display: inline-flex;
  height: calc(8px * 3);
  width: calc(8px * 3);

  .cre8-c-link--sm & {
    --cre8-icon-height: var(--cre8-icon-size-small);
    --cre8-icon-width: var(--cre8-icon-size-small);
    height: calc(8px * 2.75);
    width: calc(8px * 2.75);
  }

  .cre8-c-link--lg & {
    --cre8-icon-height: var(--cre8-icon-size-large);
    --cre8-icon-width: var(--cre8-icon-size-large);
    height: calc(8px * 3.25);
    width: calc(8px * 3.25);
  }
}

.cre8-c-link__variation {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.cre8-c-link__cta-wrapper {
  color: var(--cre8-color-button-primary-content); // TODO: token not defined
  display: inline-flex;
  margin-left: calc(8px * 1);
  padding: var(--cre8-spacing-4);
  background-color: var(--cre8-color-content-link);
  border-radius:  var(--cre8-border-radius-round);
  border-width: var(--cre8-border-width-button-default);

  svg {
    height: calc(8px * 2);
    width: calc(8px * 2);
  }
}

.cre8-c-link__icon.before {
  padding-right: calc(8px * 1);
}

.cre8-c-link__icon.after {
  padding-left: calc(8px * 1);
}

::slotted([slot='badge']) {
  padding-left: calc(8px * 1);
}

.cre8-c-link--inverted {
  .cre8-c-link__text {
    color: var(--cre8-color-content-inverse-link);
  }

  .cre8-c-link__icon {
    color: var(--cre8-color-content-inverse-link);;
  }

  .cre8-c-link__cta-wrapper {
    --cre8-icon-fill: var(--cre8-color-content-brand);
    color: var(--cre8-color-content-brand);
    background-color: var(--cre8-color-content-inverse-link);
  }
  
  &:hover {
    .cre8-c-link__text,
    .cre8-c-link__text-area {
      color: var(--cre8-color-content-inverse-link-hover);
    }

    .cre8-c-link__icon {
      fill: var(--cre8-color-content-inverse-link-hover);
    }
  }

  &:active {
    .cre8-c-link__text,
    .cre8-c-link__text-area {
      color: var(--cre8-color-content-inverse-link-active);
    }

    .cre8-c-link__icon {
      fill: var(--cre8-color-content-inverse-link-active);
    }
  }

  &:focus {
    outline: none;
    .cre8-c-link__icon {
      background-color:  var(--cre8-color-bg-inverse-active);
      fill: var(--cre8-color-content-inverse-link-focus);
    }

    .cre8-c-link__text,
    .cre8-c-link__text-area {
      background-color:  var(--cre8-color-bg-inverse-active);
      color: var(--cre8-color-content-inverse-link-focus);
    }
    .cre8-c-link__cta-wrapper {
      background-color:  var(--cre8-color-content-inverse-link);
      color: var(--cre8-color-content-inverse-link-focus);
      outline: var(--cre8-border-width-focus) var(--cre8-border-style-default)  var(--cre8-color-content-inverse-link); //TODO: token not exists cre8-color-border-inverse-active-outline
      outline-offset: calc(8px * 0.25);
    }
  }
}

cre8-icon {
  display: flex;
  align-items: center;
}
`;
var Oh = Object.defineProperty, Oe = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Oh(e, t, i), i;
};
const la = class la extends M {
  constructor() {
    super(...arguments), this.iconRotateDegree = 0, this.iconPosition = void 0, this.ctaIcon = "arrow-forward";
  }
  generateIcon() {
    return this.iconName ? f`
          <div class="cre8-c-link__icon-wrapper">
            <cre8-icon-legacy
              class="cre8-c-link__icon ${this.iconPosition}"
              aria-hidden="true"
              name="${$(this.iconName)}">
            </cre8-icon-legacy>
          </div>` : this.svg ? f`
          <div class="cre8-c-link__icon-wrapper">
            <cre8-icon
              class="cre8-c-link__icon ${this.iconPosition}"
              aria-hidden="true"
              svg='${this.svg}' rotate="${Number(this.iconRotateDegree)}" flip="${this.iconFlipDirection}">
            </cre8-icon>
          </div>` : T;
  }
  render() {
    const e = this.componentClassNames("cre8-c-link", {
      "cre8-c-link--inverted": this.inverted,
      "cre8-c-link--sm": this.size === "sm",
      "cre8-c-link--lg": this.size === "lg",
      "cre8-c-link__no-underline": this.noUnderline
    });
    return f`
      <a
        class="${e}"
        href="${$(this.href)}"
        rel="${$(this.rel)}"
        target="${$(this.target)}"
      >
        <div class="cre8-c-link__text-area">
          ${this.iconPosition === "before" ? f`${this.generateIcon()}` : T}
          <span class="cre8-c-link__text">
            <slot></slot>
          </span>
          ${this.iconPosition === "after" ? f`${this.generateIcon()}` : T}
        </div>
        <div class="cre8-c-link__variation">
          <slot name="badge"></slot>
          ${this.ctaLink ? f`<div class="cre8-c-link__cta-wrapper">
                <cre8-icon class="cre8-c-link__action" svg='${Eh}' 
                rotate="180" aria-hidden="true"></cre8-icon>
              </div>` : T}
        </div>
      </a>
    `;
  }
};
la.styles = [Dh];
let ve = la;
Oe([
  u()
], ve.prototype, "href");
Oe([
  u()
], ve.prototype, "rel");
Oe([
  u()
], ve.prototype, "target");
Oe([
  u()
], ve.prototype, "iconName");
Oe([
  u()
], ve.prototype, "svg");
Oe([
  u({ type: Number })
], ve.prototype, "iconRotateDegree");
Oe([
  u()
], ve.prototype, "iconFlipDirection");
Oe([
  u()
], ve.prototype, "iconPosition");
Oe([
  u()
], ve.prototype, "ctaIcon");
Oe([
  u({ type: Boolean })
], ve.prototype, "ctaLink");
Oe([
  u({ type: Boolean })
], ve.prototype, "noUnderline");
Oe([
  u()
], ve.prototype, "size");
Oe([
  u({ type: Boolean })
], ve.prototype, "inverted");
customElements.get("cre8-link") === void 0 && customElements.define("cre8-link", ve);
const Hh = k`@import '../../design-tokens/core/scss/theming/component';


:host {
  display: inline;
  text-align: left;
}
/**
 * DefaultHeading component styling/Heading title-large
 */
.cre8-c-heading,
.cre8-c-heading--title-large {
  @include cre8-typography-title-large;
  margin: 0;
  color: var(--cre8-color-content-default);
}

/**
 * Heading with theme headline-large preset applied
 */
.cre8-c-heading--headline-large {
  @include cre8-typography-headline-large;
}

/**
 * Heading with theme headline-default preset applied
 */
.cre8-c-heading--headline-default {
  @include cre8-typography-headline-default;
}

/**
 * Heading with theme headline-small preset applied
 */
.cre8-c-heading--headline-small {
  @include cre8-typography-headline-small;
}

/**
 * Heading with theme title-xlarge preset applied
 */
.cre8-c-heading--title-xlarge {
  @include cre8-typography-title-xlarge;
}

/**
 * Heading with theme title-large preset applied
 */
.cre8-c-heading--title-large {
  @include cre8-typography-title-large;
}

/**
 * Heading with theme title-default preset applied
 */
.cre8-c-heading--title-default {
  @include cre8-typography-title-default;
}

/**
 * Heading with theme title-small preset applied
 */
.cre8-c-heading--title-small {
  @include cre8-typography-title-small;
}
/**
 * Heading with theme display-small preset applied
 */
.cre8-c-heading--display-small {
  @include cre8-typography-display-small;
}

/**
 * Heading with theme display-default preset applied
 */
.cre8-c-heading--display-default {
  @include cre8-typography-display-default;
}

/**
 * Heading with theme label-large preset applied
 */
.cre8-c-heading--label-large {
  @include cre8-typography-label-large;
}

/**
 * Heading with theme label-default preset applied
 */
.cre8-c-heading--label-default {
  @include cre8-typography-label-default;
}

/**
 * Heading with theme label-small preset applied
 */
.cre8-c-heading--label-small {
  @include cre8-typography-label-small;
}

/**
 * Heading with theme meta-default preset applied
 */
.cre8-c-heading--meta-large {
  @include cre8-typography-meta-large;
  text-transform: uppercase;
}

/**
 * Heading with theme meta-default preset applied
 */
.cre8-c-heading--meta-default {
  @include cre8-typography-meta-default;
  text-transform: uppercase;
}

/**
 * Heading with theme meta-small preset applied
 */
.cre8-c-heading--meta-small {
  @include cre8-typography-meta-small;
  text-transform: uppercase;
}

/**
 * Heading with brand color applied
 */
.cre8-c-heading--brand-color {
  color: var(--cre8-color-content-brand-strong);
  &.cre8-c-heading--inverted {
    color: var(--cre8-color-content-brand-knockout);
  }
}

.cre8-c-heading--inverted {
  color: var(--cre8-color-content-knockout);
}
`;
var Ih = Object.defineProperty, sn = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Ih(e, t, i), i;
};
const da = class da extends M {
  constructor() {
    super(...arguments), this.tagVariant = "h5";
  }
  render() {
    const e = this.type ? {} : {
      "cre8-c-heading--headline-large": this.tagVariant === "h1",
      "cre8-c-heading--headline-default": this.tagVariant === "h2",
      "cre8-c-heading--headline-small": this.tagVariant === "h3",
      "cre8-c-heading--title-large": this.tagVariant === "h4",
      "cre8-c-heading--title-default": this.tagVariant === "h5",
      "cre8-c-heading--title-small": this.tagVariant === "h6"
    }, t = this.componentClassNames("cre8-c-heading", {
      ...e,
      "cre8-c-heading--headline-large": this.type === "headline-large",
      "cre8-c-heading--headline-default": this.type === "headline-default",
      "cre8-c-heading--headline-small": this.type === "headline-small",
      "cre8-c-heading--title-large": this.type === "title-large",
      "cre8-c-heading--title-default": this.type === "title-default",
      "cre8-c-heading--title-small": this.type === "title-small",
      "cre8-c-heading--title-xlarge": this.type === "title-xlarge",
      "cre8-c-heading--display-default": this.type === "display-default",
      "cre8-c-heading--display-small": this.type === "display-small",
      "cre8-c-heading--label-large": this.type === "label-large",
      "cre8-c-heading--label-default": this.type === "label-default",
      "cre8-c-heading--label-small": this.type === "label-small",
      "cre8-c-heading--meta-large": this.type === "meta-large",
      "cre8-c-heading--meta-default": this.type === "meta-default",
      "cre8-c-heading--meta-small": this.type === "meta-small",
      "cre8-c-heading--brand-color": this.brandColor,
      "cre8-c-heading--inverted": this.inverted
    });
    switch (this.tagVariant) {
      case "h1":
        return f` <h1 part="tag" class="${t}"><slot></slot></h1> `;
      case "h2":
        return f` <h2 part="tag" class="${t}"><slot></slot></h2> `;
      case "h3":
        return f` <h3 part="tag" class="${t}"><slot></slot></h3> `;
      case "h4":
        return f` <h4 part="tag" class="${t}"><slot></slot></h4> `;
      case "h5":
        return f` <h5 part="tag" class="${t}"><slot></slot></h5> `;
      case "h6":
        return f` <h6 part="tag" class="${t}"><slot></slot></h6> `;
      default:
        return f` <h4 part="tag" class="${t}"><slot></slot></h4> `;
    }
  }
};
da.styles = [Hh];
let Qt = da;
sn([
  u()
], Qt.prototype, "type");
sn([
  u()
], Qt.prototype, "tagVariant");
sn([
  u({ type: Boolean, reflect: !0 })
], Qt.prototype, "inverted");
sn([
  u({ type: Boolean, reflect: !0 })
], Qt.prototype, "brandColor");
customElements.get("cre8-heading") === void 0 && customElements.define("cre8-heading", Qt);
const Bh = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) A passage of text  (e.g. article, blog post), including uncontrolled elements
 *    (e.g. unclassed h2, h3, ul, li, and so on).
 * 2) Use this file only for styling text passage and elements inside of text passage.
 */
cre8-text-passage,
cre8-text-passage[size='default'] {
  @include cre8-typography-body-default();

  /**
  * Generic h1 within text passage
  */

  h1 {
    @include cre8-typography-display-small();
    margin-bottom: calc(8px * 1.5);
  }

  /**
  * Generic h2 within text passage
  */
  h2 {
    @include cre8-typography-headline-default();
    margin-bottom: calc(8px * 1.5);
  }

  /**
  * Generic h3 within text passage
  */
  h3 {
    @include cre8-typography-headline-small();
    margin-bottom: calc(8px * 1.5);
  }

  /**
  * Generic h4 within text passage
  */
  h4 {
    @include cre8-typography-title-large();
    margin-bottom: calc(8px * 1.5);
  }

  /**
  * Generic h5 within text passage
  */
  h5 {
    @include cre8-typography-meta-large();
    margin-bottom: calc(8px * 1.5);
  }

  /**
  * Generic unordered and ordered lists within text passage
  */
  ul,
  ol {
    margin-top: 0;
  }

  /**
  * Unordered list within text passage
  */
  ul {
    margin-left: calc(8px * 2.5);
    padding-left: 0;
  }

  /**
  * Ordered list within text passage
  */
  ol {
    margin-left: calc(8px * 2.25);
    padding-left: 0;
  }

  /**
  * Generic link tag within text passage
  */
  a {
    color: var(--cre8-color-content-link);

    &:hover,
    &:focus {
      text-decoration: underline;
      color: var(--cre8-color-content-link-hover);
    }
  }

  /**
  * Paragraph tag within text passage
  */
  p {
    margin-top: 0;
    margin-bottom: calc(8px * 3);
  }

  /**
  * Blockquote within text passage
  */
  blockquote {
    font-style: italic;
    border-left: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-content-subtle);
    color: var(--cre8-color-content-subtle);
    padding-left: calc(8px * 2);
    margin-left: 0;
    margin-bottom: calc(8px * 2);
  }

  /**
* Last item declared in the text passage
* 1) Remove default margin bottom from the item
*/
  :last-child {
    margin-bottom: 0;
  }
}

/**
* Inverted text passage
*/
cre8-text-passage[inverted] {
  /**
  * Blockquote within inverted text passage
  */
  a {
    color: var(--cre8-color-content-brand-knockout);
    &:hover,
    &:focus {
      color: var(--cre8-color-content-brand-knockout-hover);
    }
  }
  blockquote {
    color: var(--cre8-color-content-knockout);
    font-style: italic;
    border-left: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-knockout);
    padding-left: calc(8px * 2);
    margin-left: 0;
    margin-bottom: calc(8px * 2);
  }
}
`, Vh = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * !!! DO NOT USE THIS FILE for styling specific elements within text passage.
 * Use text-passage-ligh-dom.scss to for styling.!!!
 */

 :host {
  display: inline-flex;
 }

.cre8-c-text-passage--small {
  @include cre8-typography-body-small();

  /**
    * Unordered list within small text passage
    */
}
.cre8-c-text-passage--large {
  @include cre8-typography-body-large();

  /**
    * Unordered list within small text passage
    */
}
.cre8-c-text-passage--inverted {
  color: var(--cre8-color-content-knockout);
}
::slotted(.header) {
  margin-bottom: calc(8px * 1.5);
}
`;
var Nh = Object.defineProperty, B1 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Nh(e, t, i), i;
};
const ha = class ha extends M {
  constructor() {
    super(...arguments), this.size = "default";
  }
  /**
   * Add the light dom styles when this component is connected to a page
   */
  connectedCallback() {
    if (super.connectedCallback(), !document.head.querySelector("#cre8-text-passage-styles")) {
      const t = document.createElement("style");
      t.id = "cre8-text-passage-styles", t.innerHTML = Bh.cssText, document.head.appendChild(t);
    }
  }
  render() {
    const e = this.componentClassNames("cre8-c-text-passage", {
      "cre8-c-text-passage--default": this.size === "default" || void 0,
      "cre8-c-text-passage--inverted": this.inverted,
      "cre8-c-text-passage--small": this.size === "small",
      "cre8-c-text-passage--large": this.size === "large"
    });
    return f`
      <div class="${e}">
        <slot></slot>
      </div>
    `;
  }
};
ha.styles = [Vh];
let xi = ha;
B1([
  u({ type: Boolean, reflect: !0 })
], xi.prototype, "inverted");
B1([
  u()
], xi.prototype, "size");
customElements.get("cre8-text-passage") === void 0 && customElements.define("cre8-text-passage", xi);
const Rh = k`@import '../../design-tokens/core/scss/theming/component';

dialog {
  border: none;
  width: 100%;
}

.cre8-c-alert {
  padding: var(--cre8-spacing-16);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  border-radius: var(--cre8-border-radius-default);

  .cre8-c-alert__container {
    display: flex;
    gap: var(--cre8-spacing-8);
    position: relative;

    .cre8-c-alert__message-container {
      color: var(--cre8-color-content-knockout);
      display: flex;
      flex-direction: column;

      .cre8-c-alert__heading-container {
        @include cre8-typography-title-small;
      }

      .cre8-c-alert__body-container {
        @include cre8-typography-body-small;
        padding-bottom: var(--cre8-spacing-8);
      }

      .cre8-c-alert__footer-container {
        padding: 0;
      }
    }
  }

  .cre8-c-alert__close-btn {
    position: absolute;
    top: -10px;
    right: 0px;
  }

  &.cre8-c-alert--emphasis-subtle {
    .cre8-c-alert__message-container {
      color: var(--cre8-color-content-default);
    }
  }

  &.cre8-c-alert--banner {
    border-radius: 0;
    border: none;
  }

  &.cre8-c-alert--warning {
    .cre8-c-alert__message-container {
      color: var(--cre8-color-content-default);
    }
  }
}

.cre8-c-alert--standalone {
  border-radius: var(--cre8-border-radius-default);
  width: calc(8px * 45);

  .cre8-c-alert__container {
    display: flex;
    gap: var(--cre8-spacing-8);
    position: relative;
  }
}

.cre8-c-alert__icon {
  height: var(--cre8-spacing-16);
  min-height: var(--cre8-spacing-16);
  width: var(--cre8-spacing-16);
  min-width: var(--cre8-spacing-16);
}

.cre8-c-alert--info,
.cre8-c-alert--success,
.cre8-c-alert--error,
.cre8-c-alert--neutral,
.cre8-c-alert--notification {
  color: var(--cre8-color-content-knockout);
}

/**
 * Alert info
 */
.cre8-c-alert--info {
  background: var(--cre8-color-bg-info-strong);
  border-color: var(--cre8-color-border-info);

  &.cre8-c-alert--emphasis-subtle {
    background: var(--cre8-color-bg-info);
    color: var(--cre8-color-content-info-icon);
  }
}

/**
 * Alert warning
 */
.cre8-c-alert--warning {
  background: var(--cre8-color-bg-warning-strong);
  border-color: var(--cre8-color-border-warning);
  color: var(--cre8-color-content-default);

  &.cre8-c-alert--emphasis-subtle {
    background: var(--cre8-color-bg-warning);
  }
}

/**
 * Alert success
 */
.cre8-c-alert--success {
  background: var(--cre8-color-bg-success-strong);
  border-color: var(--cre8-color-border-success);

  &.cre8-c-alert--emphasis-subtle {
    background: var(--cre8-color-bg-success);
    color: var(--cre8-color-content-success-icon);
  }
}

/**
 * Alert error
 */
.cre8-c-alert--error {
  background: var(--cre8-color-bg-error-strong);
  border-color: var(--cre8-color-border-error);

  &.cre8-c-alert--emphasis-subtle {
    background: var(--cre8-color-bg-error);
    color: var(--cre8-color-content-error-icon);
  }
}

/**
 * Alert neutral
 */
.cre8-c-alert--neutral {
  background: var(--cre8-color-bg-strong);
  border-color: var(--cre8-color-border-neutral);

  &.cre8-c-alert--emphasis-subtle {
    background: var(--cre8-color-bg-subtle);
    color: var(--cre8-color-content-default);
  }
}

/**
 * Alert notification
 */
.cre8-c-alert--notification {
  background: var(--cre8-color-bg-attention-strong);
  border-color: var(--cre8-color-border-attention);

  &.cre8-c-alert--emphasis-subtle {
    background: var(--cre8-color-bg-subtle);
    color: var(--cre8-color-content-attention-icon);
  }
}
`;
var zh = Object.defineProperty, ft = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && zh(e, t, i), i;
};
const ua = class ua extends M {
  constructor() {
    super(...arguments), this.status = "info", this.variant = "standalone", this.emphasis = "subtle", this.iconAlert = void 0, this.headerText = void 0, this.ctaBody = void 0, this.checkEmphasisAlert = () => this.emphasis !== "subtle", this.mapStatusToIconAlert = (e) => {
      switch (e) {
        case "error":
          return f`<cre8-icon
              svg="${As}"
              aria-label="${this.iconTitle}"
              aria-hidden="true"
              class="cre8-c-alert__icon"
              ></cre8-icon>`;
        case "success":
          return f`<cre8-icon
              svg="${Mr}"
              aria-label="${this.iconTitle}"
              aria-hidden="true"
              class="cre8-c-alert__icon"
              ></cre8-icon>`;
        case "warning":
          return f`<cre8-icon
              svg="${nn}"
              aria-label="${this.iconTitle}"
              aria-hidden="true"
              class="cre8-c-alert__icon"
              ></cre8-icon>`;
        case "notification":
          return f`<cre8-icon
              svg="${Ph}"
              aria-label="${this.iconTitle}"
              aria-hidden="true"
              class="cre8-c-alert__icon"
              ></cre8-icon>`;
        case "info":
          return f`<cre8-icon
              svg="${Lr}"
              aria-label="${this.iconTitle}"
              aria-hidden="true"
              class="cre8-c-alert__icon"
              ></cre8-icon>`;
        case "neutral":
          return f`<cre8-icon
              svg="${Lr}"
              aria-label="${this.iconTitle}"
              aria-hidden="true"
              class="cre8-c-alert__icon"
              ></cre8-icon>`;
        default:
          return T;
      }
    };
  }
  /**
   * On banner dismiss
   * 1) Function that toggles dismissed to true and removes the banner from the UI
   */
  onDismiss() {
    this.dismissed = !0;
  }
  render() {
    const e = this.componentClassNames("cre8-c-alert", {
      "cre8-c-alert--error": this.status === "error",
      "cre8-c-alert--info": this.status === "info",
      "cre8-c-alert--notification": this.status === "notification",
      "cre8-c-alert--neutral": this.status === "neutral",
      "cre8-c-alert--success": this.status === "success",
      "cre8-c-alert--warning": this.status === "warning",
      "cre8-c-alert--standalone": this.variant === "standalone",
      "cre8-c-alert--banner": this.variant === "banner",
      "cre8-c-alert--emphasis-subtle": this.emphasis === "subtle",
      "cre8-c-alert--notdismissible": this.notDismissible
    });
    return this.dismissed ? null : f`
          <dialog open>
            <div class="${e}">
              <div class="cre8-c-alert__container">
                ${this.status ? f` ${this.mapStatusToIconAlert(this.status)}` : ""}
                <div class="cre8-c-alert__message-container">
                  <div class="cre8-c-alert__heading-container">
                    ${this.headerText ? f`${this.headerText}` : ""}
                    ${this.notDismissible ? "" : f`<cre8-button
                     class="cre8-c-alert__close-btn"
                     svg='${Ss}'
                     iconRotateDegree="90"
                     iconPosition="after"
                     variant="tertiary"
                     text="close"
                     ?hideText=${!0}
                     @click=${this.onDismiss}
                     ?inverted=${this.checkEmphasisAlert()}
              ></cre8-button>`}
                  </div>
                  <div class="cre8-c-alert__body-container">
                    <slot></slot>
                  </div>
                  <div class="cre8-c-alert__footer-container">
                        <slot name="cta">${this.ctaBody}</slot>
                      </div>
                </div>
              </div>
            </div>
          </dialog>
        `;
  }
};
ua.styles = [Rh];
let Ne = ua;
ft([
  u({ reflect: !0 })
], Ne.prototype, "status");
ft([
  u({ reflect: !0 })
], Ne.prototype, "variant");
ft([
  u({ reflect: !0 })
], Ne.prototype, "emphasis");
ft([
  u({ type: String })
], Ne.prototype, "iconAlert");
ft([
  u()
], Ne.prototype, "iconTitle");
ft([
  u({ type: String })
], Ne.prototype, "headerText");
ft([
  u({ type: String })
], Ne.prototype, "ctaBody");
ft([
  u({ type: Boolean, reflect: !0 })
], Ne.prototype, "dismissed");
ft([
  u({ type: Boolean, reflect: !0 })
], Ne.prototype, "notDismissible");
customElements.get("cre8-alert") === void 0 && customElements.define("cre8-alert", Ne);
const Fh = k`
@import '../../design-tokens/core/scss/theming/component';

:host {
  display: inline-flex;
}

/**
 * 1) Badges are blocks of color with text inside used for messaging
 */
.cre8-c-badge {
  @include cre8-typography-label-small();
  display: inline-flex;
  border-radius: var(--cre8-border-radius-badge);
  padding: var(--cre8-badge-padding-vertical) var(--cre8-badge-padding-horizontal);

  color: var(--cre8-color-content-knockout);
  background-color: var(--cre8-color-bg-strong);
  align-items: center;
}

/**
 * Success badge
 */
.cre8-c-badge--success {
  background-color: var(--cre8-color-bg-success-strong);
}

/**
 * Warning badge
 */
.cre8-c-badge--warning {
  background-color: var(--cre8-color-bg-warning-strong);
  color: var(--cre8-color-content-default);
}

/**
* Creating space between icon and text
*/
cre8-icon {
  height: var(--cre8-icon-height, calc(8px * 2));
  margin-right: calc(8px * 0.5);
}

/**
 * Error badge
 */
.cre8-c-badge--error {
  background-color: var(--cre8-color-bg-error-strong);
}

/**
 * Info badge
 */
.cre8-c-badge--info {
  background-color: var(--cre8-color-bg-info-strong);
}

/**
 * Attention badge
 */
.cre8-c-badge--attention {
  background-color: var(--cre8-color-bg-attention-strong);
}

/**
 * Light neutral (default) badge
 */
.cre8-c-badge--light {
  background-color: var(--cre8-color-bg-subtle);
  color: var(--cre8-color-content-default);
}

/**
 * Light Success badge
 */
.cre8-c-badge--light.cre8-c-badge--success {
  background-color: var(--cre8-color-bg-success);
  color: var(--cre8-color-content-success);
}

/**
 * Light Warning badge
 */
.cre8-c-badge--light.cre8-c-badge--warning {
  background-color: var(--cre8-color-bg-warning);
}

/**
 * Light Error badge
 */
.cre8-c-badge--light.cre8-c-badge--error {
  background-color: var(--cre8-color-bg-error);
  color: var(--cre8-color-content-error);
}

/**
 * Light Info badge
 */
.cre8-c-badge--light.cre8-c-badge--info {
  background-color: var(--cre8-color-bg-info);
}

/**
 * Light Attention badge
 */
.cre8-c-badge--light.cre8-c-badge--attention {
  background-color: var(--cre8-color-bg-attention);
}

/**
 * White neutral (default) badge
 */
.cre8-c-badge--white {
  background-color: var(--cre8-color-bg-default);
  color: var(--cre8-color-content-default);
}

/**
 * White Success badge
 */
.cre8-c-badge--white.cre8-c-badge--success {
  color: var(--cre8-color-content-success);
}

/**
 * White Error badge
 */
.cre8-c-badge--white.cre8-c-badge--error {
  background-color: none;
  color: var(--cre8-color-content-error);
}`;
var Zh = Object.defineProperty, an = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Zh(e, t, i), i;
};
const pa = class pa extends M {
  constructor() {
    super(...arguments), this.text = void 0;
  }
  render() {
    const e = Wi("cre8-c-badge", {
      "cre8-c-badge--success": this.status === "success",
      "cre8-c-badge--warning": this.status === "warning",
      "cre8-c-badge--error": this.status === "error",
      "cre8-c-badge--info": this.status === "info",
      "cre8-c-badge--attention": this.status === "attention",
      "cre8-c-badge--light": this.variant === "light",
      "cre8-c-badge--white": this.variant === "white"
    });
    return f`<div class="${e}">
        ${this.svg ? f` <cre8-icon 
            svg='${this.svg}' aria-hidden='true'></cre8-icon>
        </cre8-icon>` : ""} 
        ${this.text} 
        </div> `;
  }
};
pa.styles = [Fh];
let er = pa;
an([
  u({ type: String })
], er.prototype, "text");
an([
  u({ type: String })
], er.prototype, "status");
an([
  u({ type: String })
], er.prototype, "variant");
an([
  u({ type: String })
], er.prototype, "svg");
customElements.get("cre8-badge") === void 0 && customElements.define("cre8-badge", er);
const jh = k`/**
 * Border-Box http:/paulirish.com/2012/box-sizing-border-box-ftw/
 */
*,
::slotted(*),
*:before,
*:after {
  box-sizing: border-box;
}

:root {
  --size-base-unit: 0.5rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir=rtl] {
  --rtlTranslateX: 50%;
  /* 1 */
  --rtlGradientToRight: 270deg;
  /* 2 */
  --rtlRotate45Inverse: -45deg;
  /* 3 */
}

/**
 * Visible focus outline for elements on a light background
 */
/**
 * Visible focus outline for elements with an error status
 */
/**
 * Visible focus outline for elements on a dark background
 */
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
/**
 * Visually hidden from display
 */
/*
=======
Animations
=======
*/
:host {
  --cre8-z-index-1: 1;
  --cre8-z-index-50: 50;
  --cre8-z-index-100: 100;
  --cre8-z-index-200: 200;
  --cre8-z-index-1030: 1030;
  --cre8-anim-fade-quick: 0.35s;
  --cre8-anim-ease: ease;
}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}
@keyframes slideIn {
  100% {
    transform: translateX(0);
  }
}
@keyframes slideInFwd {
  100% {
    width: 272px;
    height: 272px;
  }
}
@keyframes slideOutRight {
  100% {
    width: 272px;
    height: 272px;
  }
}
@keyframes slideUp {
  100% {
    transform: translateY(0);
  }
}
@media (width >= 481px) {
  @keyframes slideInFwd {
    100% {
      width: 417px;
      height: 417px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 417px;
      height: 417px;
    }
  }
}
@media (width >= 48rem) {
  @keyframes slideInFwd {
    100% {
      width: 330px;
      height: 330px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 330px;
      height: 330px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 60rem) {
  @keyframes slideInFwd {
    100% {
      width: 460px;
      height: 460px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 460px;
      height: 460px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 75rem) {
  @keyframes slideInFwd {
    100% {
      width: 592px;
      height: 591px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 87.5rem) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 120px));
    }
  }
}
@media (width >= 2200px) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 592px));
    }
  }
}
span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 600ms linear;
  background-color: var(--ripple-bg-color);
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 1;
  }
}
:root {
  --size-base-unit: 0.5rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir=rtl] {
  --rtlTranslateX: 50%;
  /* 1 */
  --rtlGradientToRight: 270deg;
  /* 2 */
  --rtlRotate45Inverse: -45deg;
  /* 3 */
}

/**
 * Visible focus outline for elements on a light background
 */
/**
 * Visible focus outline for elements with an error status
 */
/**
 * Visible focus outline for elements on a dark background
 */
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
/**
 * Visually hidden from display
 */
/**
 * 1) A container with a background that can house various recipes of Components within
 */
.cre8-c-band {
  background: var(--cre8-color-bg-subtle);
  padding: 24px 0;
}
@media all and (min-width: 1200px) {
  .cre8-c-band {
    padding: 32px 0;
  }
}

/**
 * Branded variant
 */
.cre8-c-band--branded {
  color: var(--cre8-color-content-knockout);
  background: var(--cre8-theme-color-utility-information);
}

/**
 * Full height
 * 1) Height set to 100% to fill a container like a sidebar
 */
.cre8-c-band--full-height {
  height: 100%;
}
  /* sourceMappingURL=band.module.css.map */
`;
var Wh = Object.defineProperty, V1 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Wh(e, t, i), i;
};
const fa = class fa extends M {
  render() {
    const e = this.componentClassNames("cre8-c-band", {
      "cre8-c-band--branded": this.variant === "branded",
      "cre8-c-band--full-height": this.fullHeight === !0
    });
    return f`
      <div class="${e}">
        <slot></slot>
      </div>
    `;
  }
};
fa.styles = [jh];
let _i = fa;
V1([
  u()
], _i.prototype, "variant");
V1([
  u({ type: Boolean, reflect: !0 })
], _i.prototype, "fullHeight");
customElements.get("cre8-band") === void 0 && customElements.define("cre8-band", _i);
const qh = k`@import '../../design-tokens/core/scss/theming/component';

// #BREADCRUMBS

:host {
  display: inline-flex;
}

/**
 * 1) An ordered list of navigational hierarchy showing the user where they are on the site
 */
.cre8-c-breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: calc(8px * 1);
}
`;
var Uh = Object.defineProperty, Yh = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Uh(e, t, i), i;
};
const ga = class ga extends M {
  constructor() {
    super(...arguments), this.navAriaLabel = "breadcrumbs";
  }
  render() {
    const e = this.componentClassNames("cre8-c-breadcrumbs", {});
    return f`
      <nav aria-label="${this.navAriaLabel}"  class="${e}">
        <ol class="cre8-c-breadcrumbs__list">
          <slot></slot>
        </ol>
      </nav>
    `;
  }
};
ga.styles = [qh];
let $o = ga;
Yh([
  u()
], $o.prototype, "navAriaLabel");
customElements.get("cre8-breadcrumbs") === void 0 && customElements.define("cre8-breadcrumbs", $o);
const N1 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1506 8.51452L4.87827 15.7869C4.8107 15.8544 4.73049 15.908 4.6422 15.9446C4.55392 15.9812 4.4593 16 4.36375 16C4.26819 16 4.17357 15.9812 4.08529 15.9446C3.99701 15.908 3.9168 15.8544 3.84923 15.7869C3.78166 15.7193 3.72806 15.6391 3.6915 15.5508C3.65493 15.4625 3.63611 15.3679 3.63611 15.2724C3.63611 15.1768 3.65493 15.0822 3.6915 14.9939C3.72806 14.9056 3.78166 14.8254 3.84923 14.7578L10.608 8L3.84923 1.24216C3.71277 1.1057 3.63611 0.920622 3.63611 0.72764C3.63611 0.534658 3.71277 0.34958 3.84923 0.213121C3.98569 0.0766618 4.17077 1.43783e-09 4.36375 0C4.55673 -1.43783e-09 4.74181 0.0766618 4.87827 0.213121L12.1506 7.48548C12.2182 7.55302 12.2719 7.63323 12.3085 7.72151C12.3451 7.8098 12.3639 7.90443 12.3639 8C12.3639 8.09557 12.3451 8.1902 12.3085 8.27849C12.2719 8.36677 12.2182 8.44698 12.1506 8.51452Z"/>
</svg>
`, Xh = k`@import '../../design-tokens/core/scss/theming/component';

:host {
  display: inline-flex;
}

/**
 * 1) Singular item within the breadcrumbs component that contains a link elsewhere on the site
 */
.cre8-c-breadcrumbs--item {
  display: inline-flex;
  align-items: center;

  /**
  * Breadcrumbs caret doesn't display for last breadcrumb item
  */
  :host(:last-child) & {
    cre8-icon {
      display: none;
    }
  }
}

/**
* Breadcrumbs icon
*/
cre8-icon {
  margin-left: calc(8px * 1);
  color: var(--cre8-color-content-subtle);
  display: inline-flex;
  svg {
    height: calc(8px * 2);
    width: calc(8px * 2);
  }
}
`, ba = class ba extends M {
  // Set the role before rendering for better accessibility
  // Because we're settting this role, we don't wrap the slot in an <li>
  connectedCallback() {
    this.setAttribute("role", "listitem"), super.connectedCallback();
  }
  render() {
    const e = this.componentClassNames(
      "cre8-c-breadcrumbs--item",
      {}
    );
    return f`
      <div class="${e}">
        <slot></slot>
        <cre8-icon
          svg="${N1}"
          rotate="90"
          container-class="cre8-c-icon-wrapper"
          aria-hidden="true"
          class="cre8-c-icon-wrapper"
        >
        </cre8-icon>
      </div>
    `;
  }
};
ba.styles = [Xh];
let zn = ba;
customElements.get("cre8-breadcrumbs-item") === void 0 && customElements.define("cre8-breadcrumbs-item", zn);
const Kh = k`/**
 * Border-Box http:/paulirish.com/2012/box-sizing-border-box-ftw/
 */
*,
::slotted(*),
*:before,
*:after {
  box-sizing: border-box;
}

:root {
  --size-base-unit: 0.5rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir=rtl] {
  --rtlTranslateX: 50%;
  /* 1 */
  --rtlGradientToRight: 270deg;
  /* 2 */
  --rtlRotate45Inverse: -45deg;
  /* 3 */
}

/**
 * Visible focus outline for elements on a light background
 */
/**
 * Visible focus outline for elements with an error status
 */
/**
 * Visible focus outline for elements on a dark background
 */
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
/**
 * Visually hidden from display
 */
/*
=======
Animations
=======
*/
:host {
  --cre8-z-index-1: 1;
  --cre8-z-index-50: 50;
  --cre8-z-index-100: 100;
  --cre8-z-index-200: 200;
  --cre8-z-index-1030: 1030;
  --cre8-anim-fade-quick: 0.35s;
  --cre8-anim-ease: ease;
}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}
@keyframes slideIn {
  100% {
    transform: translateX(0);
  }
}
@keyframes slideInFwd {
  100% {
    width: 272px;
    height: 272px;
  }
}
@keyframes slideOutRight {
  100% {
    width: 272px;
    height: 272px;
  }
}
@keyframes slideUp {
  100% {
    transform: translateY(0);
  }
}
@media (width >= 481px) {
  @keyframes slideInFwd {
    100% {
      width: 417px;
      height: 417px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 417px;
      height: 417px;
    }
  }
}
@media (width >= 48rem) {
  @keyframes slideInFwd {
    100% {
      width: 330px;
      height: 330px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 330px;
      height: 330px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 60rem) {
  @keyframes slideInFwd {
    100% {
      width: 460px;
      height: 460px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 460px;
      height: 460px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 75rem) {
  @keyframes slideInFwd {
    100% {
      width: 592px;
      height: 591px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 87.5rem) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 120px));
    }
  }
}
@media (width >= 2200px) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 592px));
    }
  }
}
span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 600ms linear;
  background-color: var(--ripple-bg-color);
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 1;
  }
}
:root {
  --size-base-unit: 0.5rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir=rtl] {
  --rtlTranslateX: 50%;
  /* 1 */
  --rtlGradientToRight: 270deg;
  /* 2 */
  --rtlRotate45Inverse: -45deg;
  /* 3 */
}

/**
 * Visible focus outline for elements on a light background
 */
/**
 * Visible focus outline for elements with an error status
 */
/**
 * Visible focus outline for elements on a dark background
 */
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
/**
 * Visually hidden from display
 */
/*------------------------------------*\
 #BUTTON-GROUP
\*------------------------------------*/
:host {
  display: inline-flex;
}

/**
 * 1) Button Group
 */
.cre8-c-button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/**
  * Button group for Modals
  */
.cre8-c-button-group--responsive-full-width {
  flex-direction: column;
  --cre8-button-width: 100%;
}
@media all and (min-width: 768px) {
  .cre8-c-button-group--responsive-full-width {
    flex-direction: row;
    --cre8-button-width: auto;
  }
}
  /* sourceMappingURL=button-group.module.css.map */
`;
var Gh = Object.defineProperty, Jh = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Gh(e, t, i), i;
};
const ma = class ma extends M {
  render() {
    const e = this.componentClassNames("cre8-c-button-group", {
      "cre8-c-button-group--responsive-full-width": this.orientation === "responsive-full-width"
    });
    return f`
      <div class="${e}">
        <slot></slot>
      </div>
    `;
  }
};
ma.styles = [Kh];
let Mo = ma;
Jh([
  u()
], Mo.prototype, "orientation");
customElements.get("cre8-button-group") === void 0 && customElements.define("cre8-button-group", Mo);
const Qh = k`@import '../../design-tokens/core/scss/theming/component';

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
  padding: calc(8px * 3);
  gap: calc(8px * 2);
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
var e2 = Object.defineProperty, R1 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && e2(e, t, i), i;
};
const va = class va extends M {
  render() {
    const e = this.componentClassNames("cre8-c-card", {
      "cre8-c-card--bare": this.variant === "bare",
      "cre8-c-card--horizontal": this.variant === "horizontal",
      "cre8-c-card--horizontal-bare": this.variant === "horizontal-bare",
      "cre8-c-card--align-center": this.align === "center"
    });
    return f`
      <div class="${e}" part="card">
        ${this.slotNotEmpty("header") && f`<div class="cre8-c-card__header" part="header"><slot name="header"></slot></div>`}
        <div class="cre8-c-card__body" part="body">
          <slot></slot>
        </div>
        ${this.slotNotEmpty("footer") && f`<div class="cre8-c-card__footer" part="footer"><slot name="footer"></slot></div>`}
      </div>
    `;
  }
};
va.styles = [Qh];
let wi = va;
R1([
  u()
], wi.prototype, "variant");
R1([
  u()
], wi.prototype, "align");
customElements.get("cre8-card") === void 0 && customElements.define("cre8-card", wi);
function Ui(r) {
  return r + 0.5 | 0;
}
const mt = (r, e, t) => Math.max(Math.min(r, t), e);
function Gr(r) {
  return mt(Ui(r * 2.55), 0, 255);
}
function xt(r) {
  return mt(Ui(r * 255), 0, 255);
}
function lt(r) {
  return mt(Ui(r / 2.55) / 100, 0, 1);
}
function Qc(r) {
  return mt(Ui(r * 100), 0, 100);
}
const Ve = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Fn = [..."0123456789ABCDEF"], t2 = (r) => Fn[r & 15], r2 = (r) => Fn[(r & 240) >> 4] + Fn[r & 15], no = (r) => (r & 240) >> 4 === (r & 15), i2 = (r) => no(r.r) && no(r.g) && no(r.b) && no(r.a);
function o2(r) {
  var e = r.length, t;
  return r[0] === "#" && (e === 4 || e === 5 ? t = {
    r: 255 & Ve[r[1]] * 17,
    g: 255 & Ve[r[2]] * 17,
    b: 255 & Ve[r[3]] * 17,
    a: e === 5 ? Ve[r[4]] * 17 : 255
  } : (e === 7 || e === 9) && (t = {
    r: Ve[r[1]] << 4 | Ve[r[2]],
    g: Ve[r[3]] << 4 | Ve[r[4]],
    b: Ve[r[5]] << 4 | Ve[r[6]],
    a: e === 9 ? Ve[r[7]] << 4 | Ve[r[8]] : 255
  })), t;
}
const n2 = (r, e) => r < 255 ? e(r) : "";
function s2(r) {
  var e = i2(r) ? t2 : r2;
  return r ? "#" + e(r.r) + e(r.g) + e(r.b) + n2(r.a, e) : void 0;
}
const a2 = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function z1(r, e, t) {
  const o = e * Math.min(t, 1 - t), i = (n, s = (n + r / 30) % 12) => t - o * Math.max(Math.min(s - 3, 9 - s, 1), -1);
  return [i(0), i(8), i(4)];
}
function c2(r, e, t) {
  const o = (i, n = (i + r / 60) % 6) => t - t * e * Math.max(Math.min(n, 4 - n, 1), 0);
  return [o(5), o(3), o(1)];
}
function l2(r, e, t) {
  const o = z1(r, 1, 0.5);
  let i;
  for (e + t > 1 && (i = 1 / (e + t), e *= i, t *= i), i = 0; i < 3; i++)
    o[i] *= 1 - e - t, o[i] += e;
  return o;
}
function d2(r, e, t, o, i) {
  return r === i ? (e - t) / o + (e < t ? 6 : 0) : e === i ? (t - r) / o + 2 : (r - e) / o + 4;
}
function Ts(r) {
  const t = r.r / 255, o = r.g / 255, i = r.b / 255, n = Math.max(t, o, i), s = Math.min(t, o, i), a = (n + s) / 2;
  let c, l, d;
  return n !== s && (d = n - s, l = a > 0.5 ? d / (2 - n - s) : d / (n + s), c = d2(t, o, i, d, n), c = c * 60 + 0.5), [c | 0, l || 0, a];
}
function Ps(r, e, t, o) {
  return (Array.isArray(e) ? r(e[0], e[1], e[2]) : r(e, t, o)).map(xt);
}
function Es(r, e, t) {
  return Ps(z1, r, e, t);
}
function h2(r, e, t) {
  return Ps(l2, r, e, t);
}
function u2(r, e, t) {
  return Ps(c2, r, e, t);
}
function F1(r) {
  return (r % 360 + 360) % 360;
}
function p2(r) {
  const e = a2.exec(r);
  let t = 255, o;
  if (!e)
    return;
  e[5] !== o && (t = e[6] ? Gr(+e[5]) : xt(+e[5]));
  const i = F1(+e[2]), n = +e[3] / 100, s = +e[4] / 100;
  return e[1] === "hwb" ? o = h2(i, n, s) : e[1] === "hsv" ? o = u2(i, n, s) : o = Es(i, n, s), {
    r: o[0],
    g: o[1],
    b: o[2],
    a: t
  };
}
function f2(r, e) {
  var t = Ts(r);
  t[0] = F1(t[0] + e), t = Es(t), r.r = t[0], r.g = t[1], r.b = t[2];
}
function g2(r) {
  if (!r)
    return;
  const e = Ts(r), t = e[0], o = Qc(e[1]), i = Qc(e[2]);
  return r.a < 255 ? `hsla(${t}, ${o}%, ${i}%, ${lt(r.a)})` : `hsl(${t}, ${o}%, ${i}%)`;
}
const el = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, tl = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function b2() {
  const r = {}, e = Object.keys(tl), t = Object.keys(el);
  let o, i, n, s, a;
  for (o = 0; o < e.length; o++) {
    for (s = a = e[o], i = 0; i < t.length; i++)
      n = t[i], a = a.replace(n, el[n]);
    n = parseInt(tl[s], 16), r[a] = [n >> 16 & 255, n >> 8 & 255, n & 255];
  }
  return r;
}
let so;
function m2(r) {
  so || (so = b2(), so.transparent = [0, 0, 0, 0]);
  const e = so[r.toLowerCase()];
  return e && {
    r: e[0],
    g: e[1],
    b: e[2],
    a: e.length === 4 ? e[3] : 255
  };
}
const v2 = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function y2(r) {
  const e = v2.exec(r);
  let t = 255, o, i, n;
  if (e) {
    if (e[7] !== o) {
      const s = +e[7];
      t = e[8] ? Gr(s) : mt(s * 255, 0, 255);
    }
    return o = +e[1], i = +e[3], n = +e[5], o = 255 & (e[2] ? Gr(o) : mt(o, 0, 255)), i = 255 & (e[4] ? Gr(i) : mt(i, 0, 255)), n = 255 & (e[6] ? Gr(n) : mt(n, 0, 255)), {
      r: o,
      g: i,
      b: n,
      a: t
    };
  }
}
function C2(r) {
  return r && (r.a < 255 ? `rgba(${r.r}, ${r.g}, ${r.b}, ${lt(r.a)})` : `rgb(${r.r}, ${r.g}, ${r.b})`);
}
const wn = (r) => r <= 31308e-7 ? r * 12.92 : Math.pow(r, 1 / 2.4) * 1.055 - 0.055, br = (r) => r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
function x2(r, e, t) {
  const o = br(lt(r.r)), i = br(lt(r.g)), n = br(lt(r.b));
  return {
    r: xt(wn(o + t * (br(lt(e.r)) - o))),
    g: xt(wn(i + t * (br(lt(e.g)) - i))),
    b: xt(wn(n + t * (br(lt(e.b)) - n))),
    a: r.a + t * (e.a - r.a)
  };
}
function ao(r, e, t) {
  if (r) {
    let o = Ts(r);
    o[e] = Math.max(0, Math.min(o[e] + o[e] * t, e === 0 ? 360 : 1)), o = Es(o), r.r = o[0], r.g = o[1], r.b = o[2];
  }
}
function Z1(r, e) {
  return r && Object.assign(e || {}, r);
}
function rl(r) {
  var e = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(r) ? r.length >= 3 && (e = { r: r[0], g: r[1], b: r[2], a: 255 }, r.length > 3 && (e.a = xt(r[3]))) : (e = Z1(r, { r: 0, g: 0, b: 0, a: 1 }), e.a = xt(e.a)), e;
}
function _2(r) {
  return r.charAt(0) === "r" ? y2(r) : p2(r);
}
class ki {
  constructor(e) {
    if (e instanceof ki)
      return e;
    const t = typeof e;
    let o;
    t === "object" ? o = rl(e) : t === "string" && (o = o2(e) || m2(e) || _2(e)), this._rgb = o, this._valid = !!o;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var e = Z1(this._rgb);
    return e && (e.a = lt(e.a)), e;
  }
  set rgb(e) {
    this._rgb = rl(e);
  }
  rgbString() {
    return this._valid ? C2(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? s2(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? g2(this._rgb) : void 0;
  }
  mix(e, t) {
    if (e) {
      const o = this.rgb, i = e.rgb;
      let n;
      const s = t === n ? 0.5 : t, a = 2 * s - 1, c = o.a - i.a, l = ((a * c === -1 ? a : (a + c) / (1 + a * c)) + 1) / 2;
      n = 1 - l, o.r = 255 & l * o.r + n * i.r + 0.5, o.g = 255 & l * o.g + n * i.g + 0.5, o.b = 255 & l * o.b + n * i.b + 0.5, o.a = s * o.a + (1 - s) * i.a, this.rgb = o;
    }
    return this;
  }
  interpolate(e, t) {
    return e && (this._rgb = x2(this._rgb, e._rgb, t)), this;
  }
  clone() {
    return new ki(this.rgb);
  }
  alpha(e) {
    return this._rgb.a = xt(e), this;
  }
  clearer(e) {
    const t = this._rgb;
    return t.a *= 1 - e, this;
  }
  greyscale() {
    const e = this._rgb, t = Ui(e.r * 0.3 + e.g * 0.59 + e.b * 0.11);
    return e.r = e.g = e.b = t, this;
  }
  opaquer(e) {
    const t = this._rgb;
    return t.a *= 1 + e, this;
  }
  negate() {
    const e = this._rgb;
    return e.r = 255 - e.r, e.g = 255 - e.g, e.b = 255 - e.b, this;
  }
  lighten(e) {
    return ao(this._rgb, 2, e), this;
  }
  darken(e) {
    return ao(this._rgb, 2, -e), this;
  }
  saturate(e) {
    return ao(this._rgb, 1, e), this;
  }
  desaturate(e) {
    return ao(this._rgb, 1, -e), this;
  }
  rotate(e) {
    return f2(this._rgb, e), this;
  }
}
function st() {
}
const w2 = /* @__PURE__ */ (() => {
  let r = 0;
  return () => r++;
})();
function H(r) {
  return r == null;
}
function U(r) {
  if (Array.isArray && Array.isArray(r))
    return !0;
  const e = Object.prototype.toString.call(r);
  return e.slice(0, 7) === "[object" && e.slice(-6) === "Array]";
}
function I(r) {
  return r !== null && Object.prototype.toString.call(r) === "[object Object]";
}
function Q(r) {
  return (typeof r == "number" || r instanceof Number) && isFinite(+r);
}
function Te(r, e) {
  return Q(r) ? r : e;
}
function E(r, e) {
  return typeof r > "u" ? e : r;
}
const k2 = (r, e) => typeof r == "string" && r.endsWith("%") ? parseFloat(r) / 100 : +r / e, j1 = (r, e) => typeof r == "string" && r.endsWith("%") ? parseFloat(r) / 100 * e : +r;
function j(r, e, t) {
  if (r && typeof r.call == "function")
    return r.apply(t, e);
}
function N(r, e, t, o) {
  let i, n, s;
  if (U(r))
    for (n = r.length, i = 0; i < n; i++)
      e.call(t, r[i], i);
  else if (I(r))
    for (s = Object.keys(r), n = s.length, i = 0; i < n; i++)
      e.call(t, r[s[i]], s[i]);
}
function Lo(r, e) {
  let t, o, i, n;
  if (!r || !e || r.length !== e.length)
    return !1;
  for (t = 0, o = r.length; t < o; ++t)
    if (i = r[t], n = e[t], i.datasetIndex !== n.datasetIndex || i.index !== n.index)
      return !1;
  return !0;
}
function So(r) {
  if (U(r))
    return r.map(So);
  if (I(r)) {
    const e = /* @__PURE__ */ Object.create(null), t = Object.keys(r), o = t.length;
    let i = 0;
    for (; i < o; ++i)
      e[t[i]] = So(r[t[i]]);
    return e;
  }
  return r;
}
function W1(r) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(r) === -1;
}
function $2(r, e, t, o) {
  if (!W1(r))
    return;
  const i = e[r], n = t[r];
  I(i) && I(n) ? $i(i, n, o) : e[r] = So(n);
}
function $i(r, e, t) {
  const o = U(e) ? e : [
    e
  ], i = o.length;
  if (!I(r))
    return r;
  t = t || {};
  const n = t.merger || $2;
  let s;
  for (let a = 0; a < i; ++a) {
    if (s = o[a], !I(s))
      continue;
    const c = Object.keys(s);
    for (let l = 0, d = c.length; l < d; ++l)
      n(c[l], r, s, t);
  }
  return r;
}
function ii(r, e) {
  return $i(r, e, {
    merger: M2
  });
}
function M2(r, e, t) {
  if (!W1(r))
    return;
  const o = e[r], i = t[r];
  I(o) && I(i) ? ii(o, i) : Object.prototype.hasOwnProperty.call(e, r) || (e[r] = So(i));
}
const il = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (r) => r,
  // default resolvers
  x: (r) => r.x,
  y: (r) => r.y
};
function L2(r) {
  const e = r.split("."), t = [];
  let o = "";
  for (const i of e)
    o += i, o.endsWith("\\") ? o = o.slice(0, -1) + "." : (t.push(o), o = "");
  return t;
}
function S2(r) {
  const e = L2(r);
  return (t) => {
    for (const o of e) {
      if (o === "")
        break;
      t = t && t[o];
    }
    return t;
  };
}
function wt(r, e) {
  return (il[e] || (il[e] = S2(e)))(r);
}
function Ds(r) {
  return r.charAt(0).toUpperCase() + r.slice(1);
}
const Mi = (r) => typeof r < "u", kt = (r) => typeof r == "function", ol = (r, e) => {
  if (r.size !== e.size)
    return !1;
  for (const t of r)
    if (!e.has(t))
      return !1;
  return !0;
};
function A2(r) {
  return r.type === "mouseup" || r.type === "click" || r.type === "contextmenu";
}
const V = Math.PI, W = 2 * V, T2 = W + V, Ao = Number.POSITIVE_INFINITY, P2 = V / 180, re = V / 2, Ft = V / 4, nl = V * 2 / 3, vt = Math.log10, Ge = Math.sign;
function oi(r, e, t) {
  return Math.abs(r - e) < t;
}
function sl(r) {
  const e = Math.round(r);
  r = oi(r, e, r / 1e3) ? e : r;
  const t = Math.pow(10, Math.floor(vt(r))), o = r / t;
  return (o <= 1 ? 1 : o <= 2 ? 2 : o <= 5 ? 5 : 10) * t;
}
function E2(r) {
  const e = [], t = Math.sqrt(r);
  let o;
  for (o = 1; o < t; o++)
    r % o === 0 && (e.push(o), e.push(r / o));
  return t === (t | 0) && e.push(t), e.sort((i, n) => i - n).pop(), e;
}
function D2(r) {
  return typeof r == "symbol" || typeof r == "object" && r !== null && !(Symbol.toPrimitive in r || "toString" in r || "valueOf" in r);
}
function Sr(r) {
  return !D2(r) && !isNaN(parseFloat(r)) && isFinite(r);
}
function O2(r, e) {
  const t = Math.round(r);
  return t - e <= r && t + e >= r;
}
function q1(r, e, t) {
  let o, i, n;
  for (o = 0, i = r.length; o < i; o++)
    n = r[o][t], isNaN(n) || (e.min = Math.min(e.min, n), e.max = Math.max(e.max, n));
}
function Ze(r) {
  return r * (V / 180);
}
function Os(r) {
  return r * (180 / V);
}
function al(r) {
  if (!Q(r))
    return;
  let e = 1, t = 0;
  for (; Math.round(r * e) / e !== r; )
    e *= 10, t++;
  return t;
}
function U1(r, e) {
  const t = e.x - r.x, o = e.y - r.y, i = Math.sqrt(t * t + o * o);
  let n = Math.atan2(o, t);
  return n < -0.5 * V && (n += W), {
    angle: n,
    distance: i
  };
}
function Zn(r, e) {
  return Math.sqrt(Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2));
}
function H2(r, e) {
  return (r - e + T2) % W - V;
}
function be(r) {
  return (r % W + W) % W;
}
function Li(r, e, t, o) {
  const i = be(r), n = be(e), s = be(t), a = be(n - i), c = be(s - i), l = be(i - n), d = be(i - s);
  return i === n || i === s || o && n === s || a > c && l < d;
}
function ce(r, e, t) {
  return Math.max(e, Math.min(t, r));
}
function I2(r) {
  return ce(r, -32768, 32767);
}
function ht(r, e, t, o = 1e-6) {
  return r >= Math.min(e, t) - o && r <= Math.max(e, t) + o;
}
function Hs(r, e, t) {
  t = t || ((s) => r[s] < e);
  let o = r.length - 1, i = 0, n;
  for (; o - i > 1; )
    n = i + o >> 1, t(n) ? i = n : o = n;
  return {
    lo: i,
    hi: o
  };
}
const ut = (r, e, t, o) => Hs(r, t, o ? (i) => {
  const n = r[i][e];
  return n < t || n === t && r[i + 1][e] === t;
} : (i) => r[i][e] < t), B2 = (r, e, t) => Hs(r, t, (o) => r[o][e] >= t);
function V2(r, e, t) {
  let o = 0, i = r.length;
  for (; o < i && r[o] < e; )
    o++;
  for (; i > o && r[i - 1] > t; )
    i--;
  return o > 0 || i < r.length ? r.slice(o, i) : r;
}
const Y1 = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function N2(r, e) {
  if (r._chartjs) {
    r._chartjs.listeners.push(e);
    return;
  }
  Object.defineProperty(r, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        e
      ]
    }
  }), Y1.forEach((t) => {
    const o = "_onData" + Ds(t), i = r[t];
    Object.defineProperty(r, t, {
      configurable: !0,
      enumerable: !1,
      value(...n) {
        const s = i.apply(this, n);
        return r._chartjs.listeners.forEach((a) => {
          typeof a[o] == "function" && a[o](...n);
        }), s;
      }
    });
  });
}
function cl(r, e) {
  const t = r._chartjs;
  if (!t)
    return;
  const o = t.listeners, i = o.indexOf(e);
  i !== -1 && o.splice(i, 1), !(o.length > 0) && (Y1.forEach((n) => {
    delete r[n];
  }), delete r._chartjs);
}
function X1(r) {
  const e = new Set(r);
  return e.size === r.length ? r : Array.from(e);
}
const K1 = (function() {
  return typeof window > "u" ? function(r) {
    return r();
  } : window.requestAnimationFrame;
})();
function G1(r, e) {
  let t = [], o = !1;
  return function(...i) {
    t = i, o || (o = !0, K1.call(window, () => {
      o = !1, r.apply(e, t);
    }));
  };
}
function R2(r, e) {
  let t;
  return function(...o) {
    return e ? (clearTimeout(t), t = setTimeout(r, e, o)) : r.apply(this, o), e;
  };
}
const Is = (r) => r === "start" ? "left" : r === "end" ? "right" : "center", ge = (r, e, t) => r === "start" ? e : r === "end" ? t : (e + t) / 2, z2 = (r, e, t, o) => r === (o ? "left" : "right") ? t : r === "center" ? (e + t) / 2 : e;
function J1(r, e, t) {
  const o = e.length;
  let i = 0, n = o;
  if (r._sorted) {
    const { iScale: s, vScale: a, _parsed: c } = r, l = r.dataset && r.dataset.options ? r.dataset.options.spanGaps : null, d = s.axis, { min: h, max: p, minDefined: g, maxDefined: b } = s.getUserBounds();
    if (g) {
      if (i = Math.min(
        // @ts-expect-error Need to type _parsed
        ut(c, d, h).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        t ? o : ut(e, d, s.getPixelForValue(h)).lo
      ), l) {
        const m = c.slice(0, i + 1).reverse().findIndex((v) => !H(v[a.axis]));
        i -= Math.max(0, m);
      }
      i = ce(i, 0, o - 1);
    }
    if (b) {
      let m = Math.max(
        // @ts-expect-error Need to type _parsed
        ut(c, s.axis, p, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        t ? 0 : ut(e, d, s.getPixelForValue(p), !0).hi + 1
      );
      if (l) {
        const v = c.slice(m - 1).findIndex((y) => !H(y[a.axis]));
        m += Math.max(0, v);
      }
      n = ce(m, i, o) - i;
    } else
      n = o - i;
  }
  return {
    start: i,
    count: n
  };
}
function Q1(r) {
  const { xScale: e, yScale: t, _scaleRanges: o } = r, i = {
    xmin: e.min,
    xmax: e.max,
    ymin: t.min,
    ymax: t.max
  };
  if (!o)
    return r._scaleRanges = i, !0;
  const n = o.xmin !== e.min || o.xmax !== e.max || o.ymin !== t.min || o.ymax !== t.max;
  return Object.assign(o, i), n;
}
const co = (r) => r === 0 || r === 1, ll = (r, e, t) => -(Math.pow(2, 10 * (r -= 1)) * Math.sin((r - e) * W / t)), dl = (r, e, t) => Math.pow(2, -10 * r) * Math.sin((r - e) * W / t) + 1, ni = {
  linear: (r) => r,
  easeInQuad: (r) => r * r,
  easeOutQuad: (r) => -r * (r - 2),
  easeInOutQuad: (r) => (r /= 0.5) < 1 ? 0.5 * r * r : -0.5 * (--r * (r - 2) - 1),
  easeInCubic: (r) => r * r * r,
  easeOutCubic: (r) => (r -= 1) * r * r + 1,
  easeInOutCubic: (r) => (r /= 0.5) < 1 ? 0.5 * r * r * r : 0.5 * ((r -= 2) * r * r + 2),
  easeInQuart: (r) => r * r * r * r,
  easeOutQuart: (r) => -((r -= 1) * r * r * r - 1),
  easeInOutQuart: (r) => (r /= 0.5) < 1 ? 0.5 * r * r * r * r : -0.5 * ((r -= 2) * r * r * r - 2),
  easeInQuint: (r) => r * r * r * r * r,
  easeOutQuint: (r) => (r -= 1) * r * r * r * r + 1,
  easeInOutQuint: (r) => (r /= 0.5) < 1 ? 0.5 * r * r * r * r * r : 0.5 * ((r -= 2) * r * r * r * r + 2),
  easeInSine: (r) => -Math.cos(r * re) + 1,
  easeOutSine: (r) => Math.sin(r * re),
  easeInOutSine: (r) => -0.5 * (Math.cos(V * r) - 1),
  easeInExpo: (r) => r === 0 ? 0 : Math.pow(2, 10 * (r - 1)),
  easeOutExpo: (r) => r === 1 ? 1 : -Math.pow(2, -10 * r) + 1,
  easeInOutExpo: (r) => co(r) ? r : r < 0.5 ? 0.5 * Math.pow(2, 10 * (r * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (r * 2 - 1)) + 2),
  easeInCirc: (r) => r >= 1 ? r : -(Math.sqrt(1 - r * r) - 1),
  easeOutCirc: (r) => Math.sqrt(1 - (r -= 1) * r),
  easeInOutCirc: (r) => (r /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - r * r) - 1) : 0.5 * (Math.sqrt(1 - (r -= 2) * r) + 1),
  easeInElastic: (r) => co(r) ? r : ll(r, 0.075, 0.3),
  easeOutElastic: (r) => co(r) ? r : dl(r, 0.075, 0.3),
  easeInOutElastic(r) {
    return co(r) ? r : r < 0.5 ? 0.5 * ll(r * 2, 0.1125, 0.45) : 0.5 + 0.5 * dl(r * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(r) {
    return r * r * ((1.70158 + 1) * r - 1.70158);
  },
  easeOutBack(r) {
    return (r -= 1) * r * ((1.70158 + 1) * r + 1.70158) + 1;
  },
  easeInOutBack(r) {
    let e = 1.70158;
    return (r /= 0.5) < 1 ? 0.5 * (r * r * (((e *= 1.525) + 1) * r - e)) : 0.5 * ((r -= 2) * r * (((e *= 1.525) + 1) * r + e) + 2);
  },
  easeInBounce: (r) => 1 - ni.easeOutBounce(1 - r),
  easeOutBounce(r) {
    return r < 1 / 2.75 ? 7.5625 * r * r : r < 2 / 2.75 ? 7.5625 * (r -= 1.5 / 2.75) * r + 0.75 : r < 2.5 / 2.75 ? 7.5625 * (r -= 2.25 / 2.75) * r + 0.9375 : 7.5625 * (r -= 2.625 / 2.75) * r + 0.984375;
  },
  easeInOutBounce: (r) => r < 0.5 ? ni.easeInBounce(r * 2) * 0.5 : ni.easeOutBounce(r * 2 - 1) * 0.5 + 0.5
};
function Bs(r) {
  if (r && typeof r == "object") {
    const e = r.toString();
    return e === "[object CanvasPattern]" || e === "[object CanvasGradient]";
  }
  return !1;
}
function hl(r) {
  return Bs(r) ? r : new ki(r);
}
function kn(r) {
  return Bs(r) ? r : new ki(r).saturate(0.5).darken(0.1).hexString();
}
const F2 = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Z2 = [
  "color",
  "borderColor",
  "backgroundColor"
];
function j2(r) {
  r.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), r.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (e) => e !== "onProgress" && e !== "onComplete" && e !== "fn"
  }), r.set("animations", {
    colors: {
      type: "color",
      properties: Z2
    },
    numbers: {
      type: "number",
      properties: F2
    }
  }), r.describe("animations", {
    _fallback: "animation"
  }), r.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (e) => e | 0
        }
      }
    }
  });
}
function W2(r) {
  r.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const ul = /* @__PURE__ */ new Map();
function q2(r, e) {
  e = e || {};
  const t = r + JSON.stringify(e);
  let o = ul.get(t);
  return o || (o = new Intl.NumberFormat(r, e), ul.set(t, o)), o;
}
function Yi(r, e, t) {
  return q2(e, t).format(r);
}
const ed = {
  values(r) {
    return U(r) ? r : "" + r;
  },
  numeric(r, e, t) {
    if (r === 0)
      return "0";
    const o = this.chart.options.locale;
    let i, n = r;
    if (t.length > 1) {
      const l = Math.max(Math.abs(t[0].value), Math.abs(t[t.length - 1].value));
      (l < 1e-4 || l > 1e15) && (i = "scientific"), n = U2(r, t);
    }
    const s = vt(Math.abs(n)), a = isNaN(s) ? 1 : Math.max(Math.min(-1 * Math.floor(s), 20), 0), c = {
      notation: i,
      minimumFractionDigits: a,
      maximumFractionDigits: a
    };
    return Object.assign(c, this.options.ticks.format), Yi(r, o, c);
  },
  logarithmic(r, e, t) {
    if (r === 0)
      return "0";
    const o = t[e].significand || r / Math.pow(10, Math.floor(vt(r)));
    return [
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(o) || e > 0.8 * t.length ? ed.numeric.call(this, r, e, t) : "";
  }
};
function U2(r, e) {
  let t = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value;
  return Math.abs(t) >= 1 && r !== Math.floor(r) && (t = r - Math.floor(r)), t;
}
var cn = {
  formatters: ed
};
function Y2(r) {
  r.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (e, t) => t.lineWidth,
      tickColor: (e, t) => t.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: cn.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), r.route("scale.ticks", "color", "", "color"), r.route("scale.grid", "color", "", "borderColor"), r.route("scale.border", "color", "", "borderColor"), r.route("scale.title", "color", "", "color"), r.describe("scale", {
    _fallback: !1,
    _scriptable: (e) => !e.startsWith("before") && !e.startsWith("after") && e !== "callback" && e !== "parser",
    _indexable: (e) => e !== "borderDash" && e !== "tickBorderDash" && e !== "dash"
  }), r.describe("scales", {
    _fallback: "scale"
  }), r.describe("scale.ticks", {
    _scriptable: (e) => e !== "backdropPadding" && e !== "callback",
    _indexable: (e) => e !== "backdropPadding"
  });
}
const tr = /* @__PURE__ */ Object.create(null), jn = /* @__PURE__ */ Object.create(null);
function si(r, e) {
  if (!e)
    return r;
  const t = e.split(".");
  for (let o = 0, i = t.length; o < i; ++o) {
    const n = t[o];
    r = r[n] || (r[n] = /* @__PURE__ */ Object.create(null));
  }
  return r;
}
function $n(r, e, t) {
  return typeof e == "string" ? $i(si(r, e), t) : $i(si(r, ""), e);
}
class X2 {
  constructor(e, t) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (o) => o.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (o, i) => kn(i.backgroundColor), this.hoverBorderColor = (o, i) => kn(i.borderColor), this.hoverColor = (o, i) => kn(i.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(e), this.apply(t);
  }
  set(e, t) {
    return $n(this, e, t);
  }
  get(e) {
    return si(this, e);
  }
  describe(e, t) {
    return $n(jn, e, t);
  }
  override(e, t) {
    return $n(tr, e, t);
  }
  route(e, t, o, i) {
    const n = si(this, e), s = si(this, o), a = "_" + t;
    Object.defineProperties(n, {
      [a]: {
        value: n[t],
        writable: !0
      },
      [t]: {
        enumerable: !0,
        get() {
          const c = this[a], l = s[i];
          return I(c) ? Object.assign({}, l, c) : E(c, l);
        },
        set(c) {
          this[a] = c;
        }
      }
    });
  }
  apply(e) {
    e.forEach((t) => t(this));
  }
}
var Y = /* @__PURE__ */ new X2({
  _scriptable: (r) => !r.startsWith("on"),
  _indexable: (r) => r !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  j2,
  W2,
  Y2
]);
function K2(r) {
  return !r || H(r.size) || H(r.family) ? null : (r.style ? r.style + " " : "") + (r.weight ? r.weight + " " : "") + r.size + "px " + r.family;
}
function To(r, e, t, o, i) {
  let n = e[i];
  return n || (n = e[i] = r.measureText(i).width, t.push(i)), n > o && (o = n), o;
}
function G2(r, e, t, o) {
  o = o || {};
  let i = o.data = o.data || {}, n = o.garbageCollect = o.garbageCollect || [];
  o.font !== e && (i = o.data = {}, n = o.garbageCollect = [], o.font = e), r.save(), r.font = e;
  let s = 0;
  const a = t.length;
  let c, l, d, h, p;
  for (c = 0; c < a; c++)
    if (h = t[c], h != null && !U(h))
      s = To(r, i, n, s, h);
    else if (U(h))
      for (l = 0, d = h.length; l < d; l++)
        p = h[l], p != null && !U(p) && (s = To(r, i, n, s, p));
  r.restore();
  const g = n.length / 2;
  if (g > t.length) {
    for (c = 0; c < g; c++)
      delete i[n[c]];
    n.splice(0, g);
  }
  return s;
}
function Zt(r, e, t) {
  const o = r.currentDevicePixelRatio, i = t !== 0 ? Math.max(t / 2, 0.5) : 0;
  return Math.round((e - i) * o) / o + i;
}
function pl(r, e) {
  !e && !r || (e = e || r.getContext("2d"), e.save(), e.resetTransform(), e.clearRect(0, 0, r.width, r.height), e.restore());
}
function Wn(r, e, t, o) {
  td(r, e, t, o, null);
}
function td(r, e, t, o, i) {
  let n, s, a, c, l, d, h, p;
  const g = e.pointStyle, b = e.rotation, m = e.radius;
  let v = (b || 0) * P2;
  if (g && typeof g == "object" && (n = g.toString(), n === "[object HTMLImageElement]" || n === "[object HTMLCanvasElement]")) {
    r.save(), r.translate(t, o), r.rotate(v), r.drawImage(g, -g.width / 2, -g.height / 2, g.width, g.height), r.restore();
    return;
  }
  if (!(isNaN(m) || m <= 0)) {
    switch (r.beginPath(), g) {
      // Default includes circle
      default:
        i ? r.ellipse(t, o, i / 2, m, 0, 0, W) : r.arc(t, o, m, 0, W), r.closePath();
        break;
      case "triangle":
        d = i ? i / 2 : m, r.moveTo(t + Math.sin(v) * d, o - Math.cos(v) * m), v += nl, r.lineTo(t + Math.sin(v) * d, o - Math.cos(v) * m), v += nl, r.lineTo(t + Math.sin(v) * d, o - Math.cos(v) * m), r.closePath();
        break;
      case "rectRounded":
        l = m * 0.516, c = m - l, s = Math.cos(v + Ft) * c, h = Math.cos(v + Ft) * (i ? i / 2 - l : c), a = Math.sin(v + Ft) * c, p = Math.sin(v + Ft) * (i ? i / 2 - l : c), r.arc(t - h, o - a, l, v - V, v - re), r.arc(t + p, o - s, l, v - re, v), r.arc(t + h, o + a, l, v, v + re), r.arc(t - p, o + s, l, v + re, v + V), r.closePath();
        break;
      case "rect":
        if (!b) {
          c = Math.SQRT1_2 * m, d = i ? i / 2 : c, r.rect(t - d, o - c, 2 * d, 2 * c);
          break;
        }
        v += Ft;
      /* falls through */
      case "rectRot":
        h = Math.cos(v) * (i ? i / 2 : m), s = Math.cos(v) * m, a = Math.sin(v) * m, p = Math.sin(v) * (i ? i / 2 : m), r.moveTo(t - h, o - a), r.lineTo(t + p, o - s), r.lineTo(t + h, o + a), r.lineTo(t - p, o + s), r.closePath();
        break;
      case "crossRot":
        v += Ft;
      /* falls through */
      case "cross":
        h = Math.cos(v) * (i ? i / 2 : m), s = Math.cos(v) * m, a = Math.sin(v) * m, p = Math.sin(v) * (i ? i / 2 : m), r.moveTo(t - h, o - a), r.lineTo(t + h, o + a), r.moveTo(t + p, o - s), r.lineTo(t - p, o + s);
        break;
      case "star":
        h = Math.cos(v) * (i ? i / 2 : m), s = Math.cos(v) * m, a = Math.sin(v) * m, p = Math.sin(v) * (i ? i / 2 : m), r.moveTo(t - h, o - a), r.lineTo(t + h, o + a), r.moveTo(t + p, o - s), r.lineTo(t - p, o + s), v += Ft, h = Math.cos(v) * (i ? i / 2 : m), s = Math.cos(v) * m, a = Math.sin(v) * m, p = Math.sin(v) * (i ? i / 2 : m), r.moveTo(t - h, o - a), r.lineTo(t + h, o + a), r.moveTo(t + p, o - s), r.lineTo(t - p, o + s);
        break;
      case "line":
        s = i ? i / 2 : Math.cos(v) * m, a = Math.sin(v) * m, r.moveTo(t - s, o - a), r.lineTo(t + s, o + a);
        break;
      case "dash":
        r.moveTo(t, o), r.lineTo(t + Math.cos(v) * (i ? i / 2 : m), o + Math.sin(v) * m);
        break;
      case !1:
        r.closePath();
        break;
    }
    r.fill(), e.borderWidth > 0 && r.stroke();
  }
}
function pt(r, e, t) {
  return t = t || 0.5, !e || r && r.x > e.left - t && r.x < e.right + t && r.y > e.top - t && r.y < e.bottom + t;
}
function ln(r, e) {
  r.save(), r.beginPath(), r.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), r.clip();
}
function dn(r) {
  r.restore();
}
function J2(r, e, t, o, i) {
  if (!e)
    return r.lineTo(t.x, t.y);
  if (i === "middle") {
    const n = (e.x + t.x) / 2;
    r.lineTo(n, e.y), r.lineTo(n, t.y);
  } else i === "after" != !!o ? r.lineTo(e.x, t.y) : r.lineTo(t.x, e.y);
  r.lineTo(t.x, t.y);
}
function Q2(r, e, t, o) {
  if (!e)
    return r.lineTo(t.x, t.y);
  r.bezierCurveTo(o ? e.cp1x : e.cp2x, o ? e.cp1y : e.cp2y, o ? t.cp2x : t.cp1x, o ? t.cp2y : t.cp1y, t.x, t.y);
}
function e0(r, e) {
  e.translation && r.translate(e.translation[0], e.translation[1]), H(e.rotation) || r.rotate(e.rotation), e.color && (r.fillStyle = e.color), e.textAlign && (r.textAlign = e.textAlign), e.textBaseline && (r.textBaseline = e.textBaseline);
}
function t0(r, e, t, o, i) {
  if (i.strikethrough || i.underline) {
    const n = r.measureText(o), s = e - n.actualBoundingBoxLeft, a = e + n.actualBoundingBoxRight, c = t - n.actualBoundingBoxAscent, l = t + n.actualBoundingBoxDescent, d = i.strikethrough ? (c + l) / 2 : l;
    r.strokeStyle = r.fillStyle, r.beginPath(), r.lineWidth = i.decorationWidth || 2, r.moveTo(s, d), r.lineTo(a, d), r.stroke();
  }
}
function r0(r, e) {
  const t = r.fillStyle;
  r.fillStyle = e.color, r.fillRect(e.left, e.top, e.width, e.height), r.fillStyle = t;
}
function rr(r, e, t, o, i, n = {}) {
  const s = U(e) ? e : [
    e
  ], a = n.strokeWidth > 0 && n.strokeColor !== "";
  let c, l;
  for (r.save(), r.font = i.string, e0(r, n), c = 0; c < s.length; ++c)
    l = s[c], n.backdrop && r0(r, n.backdrop), a && (n.strokeColor && (r.strokeStyle = n.strokeColor), H(n.strokeWidth) || (r.lineWidth = n.strokeWidth), r.strokeText(l, t, o, n.maxWidth)), r.fillText(l, t, o, n.maxWidth), t0(r, t, o, l, n), o += Number(i.lineHeight);
  r.restore();
}
function Si(r, e) {
  const { x: t, y: o, w: i, h: n, radius: s } = e;
  r.arc(t + s.topLeft, o + s.topLeft, s.topLeft, 1.5 * V, V, !0), r.lineTo(t, o + n - s.bottomLeft), r.arc(t + s.bottomLeft, o + n - s.bottomLeft, s.bottomLeft, V, re, !0), r.lineTo(t + i - s.bottomRight, o + n), r.arc(t + i - s.bottomRight, o + n - s.bottomRight, s.bottomRight, re, 0, !0), r.lineTo(t + i, o + s.topRight), r.arc(t + i - s.topRight, o + s.topRight, s.topRight, 0, -re, !0), r.lineTo(t + s.topLeft, o);
}
const i0 = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, o0 = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function n0(r, e) {
  const t = ("" + r).match(i0);
  if (!t || t[1] === "normal")
    return e * 1.2;
  switch (r = +t[2], t[3]) {
    case "px":
      return r;
    case "%":
      r /= 100;
      break;
  }
  return e * r;
}
const s0 = (r) => +r || 0;
function Vs(r, e) {
  const t = {}, o = I(e), i = o ? Object.keys(e) : e, n = I(r) ? o ? (s) => E(r[s], r[e[s]]) : (s) => r[s] : () => r;
  for (const s of i)
    t[s] = s0(n(s));
  return t;
}
function rd(r) {
  return Vs(r, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Xt(r) {
  return Vs(r, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function ye(r) {
  const e = rd(r);
  return e.width = e.left + e.right, e.height = e.top + e.bottom, e;
}
function se(r, e) {
  r = r || {}, e = e || Y.font;
  let t = E(r.size, e.size);
  typeof t == "string" && (t = parseInt(t, 10));
  let o = E(r.style, e.style);
  o && !("" + o).match(o0) && (console.warn('Invalid font style specified: "' + o + '"'), o = void 0);
  const i = {
    family: E(r.family, e.family),
    lineHeight: n0(E(r.lineHeight, e.lineHeight), t),
    size: t,
    style: o,
    weight: E(r.weight, e.weight),
    string: ""
  };
  return i.string = K2(i), i;
}
function Jr(r, e, t, o) {
  let i, n, s;
  for (i = 0, n = r.length; i < n; ++i)
    if (s = r[i], s !== void 0 && s !== void 0)
      return s;
}
function a0(r, e, t) {
  const { min: o, max: i } = r, n = j1(e, (i - o) / 2), s = (a, c) => t && a === 0 ? 0 : a + c;
  return {
    min: s(o, -Math.abs(n)),
    max: s(i, n)
  };
}
function Ht(r, e) {
  return Object.assign(Object.create(r), e);
}
function Ns(r, e = [
  ""
], t, o, i = () => r[0]) {
  const n = t || r;
  typeof o > "u" && (o = sd("_fallback", r));
  const s = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: r,
    _rootScopes: n,
    _fallback: o,
    _getTarget: i,
    override: (a) => Ns([
      a,
      ...r
    ], e, n, o)
  };
  return new Proxy(s, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(a, c) {
      return delete a[c], delete a._keys, delete r[0][c], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(a, c) {
      return od(a, c, () => g0(c, e, r, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(a, c) {
      return Reflect.getOwnPropertyDescriptor(a._scopes[0], c);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(r[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(a, c) {
      return gl(a).includes(c);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(a) {
      return gl(a);
    },
    /**
    * A trap for setting property values.
    */
    set(a, c, l) {
      const d = a._storage || (a._storage = i());
      return a[c] = d[c] = l, delete a._keys, !0;
    }
  });
}
function Ar(r, e, t, o) {
  const i = {
    _cacheable: !1,
    _proxy: r,
    _context: e,
    _subProxy: t,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: id(r, o),
    setContext: (n) => Ar(r, n, t, o),
    override: (n) => Ar(r.override(n), e, t, o)
  };
  return new Proxy(i, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(n, s) {
      return delete n[s], delete r[s], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(n, s, a) {
      return od(n, s, () => l0(n, s, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(n, s) {
      return n._descriptors.allKeys ? Reflect.has(r, s) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(r, s);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(r);
    },
    /**
    * A trap for the in operator.
    */
    has(n, s) {
      return Reflect.has(r, s);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(r);
    },
    /**
    * A trap for setting property values.
    */
    set(n, s, a) {
      return r[s] = a, delete n[s], !0;
    }
  });
}
function id(r, e = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: t = e.scriptable, _indexable: o = e.indexable, _allKeys: i = e.allKeys } = r;
  return {
    allKeys: i,
    scriptable: t,
    indexable: o,
    isScriptable: kt(t) ? t : () => t,
    isIndexable: kt(o) ? o : () => o
  };
}
const c0 = (r, e) => r ? r + Ds(e) : e, Rs = (r, e) => I(e) && r !== "adapters" && (Object.getPrototypeOf(e) === null || e.constructor === Object);
function od(r, e, t) {
  if (Object.prototype.hasOwnProperty.call(r, e) || e === "constructor")
    return r[e];
  const o = t();
  return r[e] = o, o;
}
function l0(r, e, t) {
  const { _proxy: o, _context: i, _subProxy: n, _descriptors: s } = r;
  let a = o[e];
  return kt(a) && s.isScriptable(e) && (a = d0(e, a, r, t)), U(a) && a.length && (a = h0(e, a, r, s.isIndexable)), Rs(e, a) && (a = Ar(a, i, n && n[e], s)), a;
}
function d0(r, e, t, o) {
  const { _proxy: i, _context: n, _subProxy: s, _stack: a } = t;
  if (a.has(r))
    throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + r);
  a.add(r);
  let c = e(n, s || o);
  return a.delete(r), Rs(r, c) && (c = zs(i._scopes, i, r, c)), c;
}
function h0(r, e, t, o) {
  const { _proxy: i, _context: n, _subProxy: s, _descriptors: a } = t;
  if (typeof n.index < "u" && o(r))
    return e[n.index % e.length];
  if (I(e[0])) {
    const c = e, l = i._scopes.filter((d) => d !== c);
    e = [];
    for (const d of c) {
      const h = zs(l, i, r, d);
      e.push(Ar(h, n, s && s[r], a));
    }
  }
  return e;
}
function nd(r, e, t) {
  return kt(r) ? r(e, t) : r;
}
const u0 = (r, e) => r === !0 ? e : typeof r == "string" ? wt(e, r) : void 0;
function p0(r, e, t, o, i) {
  for (const n of e) {
    const s = u0(t, n);
    if (s) {
      r.add(s);
      const a = nd(s._fallback, t, i);
      if (typeof a < "u" && a !== t && a !== o)
        return a;
    } else if (s === !1 && typeof o < "u" && t !== o)
      return null;
  }
  return !1;
}
function zs(r, e, t, o) {
  const i = e._rootScopes, n = nd(e._fallback, t, o), s = [
    ...r,
    ...i
  ], a = /* @__PURE__ */ new Set();
  a.add(o);
  let c = fl(a, s, t, n || t, o);
  return c === null || typeof n < "u" && n !== t && (c = fl(a, s, n, c, o), c === null) ? !1 : Ns(Array.from(a), [
    ""
  ], i, n, () => f0(e, t, o));
}
function fl(r, e, t, o, i) {
  for (; t; )
    t = p0(r, e, t, o, i);
  return t;
}
function f0(r, e, t) {
  const o = r._getTarget();
  e in o || (o[e] = {});
  const i = o[e];
  return U(i) && I(t) ? t : i || {};
}
function g0(r, e, t, o) {
  let i;
  for (const n of e)
    if (i = sd(c0(n, r), t), typeof i < "u")
      return Rs(r, i) ? zs(t, o, r, i) : i;
}
function sd(r, e) {
  for (const t of e) {
    if (!t)
      continue;
    const o = t[r];
    if (typeof o < "u")
      return o;
  }
}
function gl(r) {
  let e = r._keys;
  return e || (e = r._keys = b0(r._scopes)), e;
}
function b0(r) {
  const e = /* @__PURE__ */ new Set();
  for (const t of r)
    for (const o of Object.keys(t).filter((i) => !i.startsWith("_")))
      e.add(o);
  return Array.from(e);
}
function ad(r, e, t, o) {
  const { iScale: i } = r, { key: n = "r" } = this._parsing, s = new Array(o);
  let a, c, l, d;
  for (a = 0, c = o; a < c; ++a)
    l = a + t, d = e[l], s[a] = {
      r: i.parse(wt(d, n), l)
    };
  return s;
}
const m0 = Number.EPSILON || 1e-14, Tr = (r, e) => e < r.length && !r[e].skip && r[e], cd = (r) => r === "x" ? "y" : "x";
function v0(r, e, t, o) {
  const i = r.skip ? e : r, n = e, s = t.skip ? e : t, a = Zn(n, i), c = Zn(s, n);
  let l = a / (a + c), d = c / (a + c);
  l = isNaN(l) ? 0 : l, d = isNaN(d) ? 0 : d;
  const h = o * l, p = o * d;
  return {
    previous: {
      x: n.x - h * (s.x - i.x),
      y: n.y - h * (s.y - i.y)
    },
    next: {
      x: n.x + p * (s.x - i.x),
      y: n.y + p * (s.y - i.y)
    }
  };
}
function y0(r, e, t) {
  const o = r.length;
  let i, n, s, a, c, l = Tr(r, 0);
  for (let d = 0; d < o - 1; ++d)
    if (c = l, l = Tr(r, d + 1), !(!c || !l)) {
      if (oi(e[d], 0, m0)) {
        t[d] = t[d + 1] = 0;
        continue;
      }
      i = t[d] / e[d], n = t[d + 1] / e[d], a = Math.pow(i, 2) + Math.pow(n, 2), !(a <= 9) && (s = 3 / Math.sqrt(a), t[d] = i * s * e[d], t[d + 1] = n * s * e[d]);
    }
}
function C0(r, e, t = "x") {
  const o = cd(t), i = r.length;
  let n, s, a, c = Tr(r, 0);
  for (let l = 0; l < i; ++l) {
    if (s = a, a = c, c = Tr(r, l + 1), !a)
      continue;
    const d = a[t], h = a[o];
    s && (n = (d - s[t]) / 3, a[`cp1${t}`] = d - n, a[`cp1${o}`] = h - n * e[l]), c && (n = (c[t] - d) / 3, a[`cp2${t}`] = d + n, a[`cp2${o}`] = h + n * e[l]);
  }
}
function x0(r, e = "x") {
  const t = cd(e), o = r.length, i = Array(o).fill(0), n = Array(o);
  let s, a, c, l = Tr(r, 0);
  for (s = 0; s < o; ++s)
    if (a = c, c = l, l = Tr(r, s + 1), !!c) {
      if (l) {
        const d = l[e] - c[e];
        i[s] = d !== 0 ? (l[t] - c[t]) / d : 0;
      }
      n[s] = a ? l ? Ge(i[s - 1]) !== Ge(i[s]) ? 0 : (i[s - 1] + i[s]) / 2 : i[s - 1] : i[s];
    }
  y0(r, i, n), C0(r, n, e);
}
function lo(r, e, t) {
  return Math.max(Math.min(r, t), e);
}
function _0(r, e) {
  let t, o, i, n, s, a = pt(r[0], e);
  for (t = 0, o = r.length; t < o; ++t)
    s = n, n = a, a = t < o - 1 && pt(r[t + 1], e), n && (i = r[t], s && (i.cp1x = lo(i.cp1x, e.left, e.right), i.cp1y = lo(i.cp1y, e.top, e.bottom)), a && (i.cp2x = lo(i.cp2x, e.left, e.right), i.cp2y = lo(i.cp2y, e.top, e.bottom)));
}
function w0(r, e, t, o, i) {
  let n, s, a, c;
  if (e.spanGaps && (r = r.filter((l) => !l.skip)), e.cubicInterpolationMode === "monotone")
    x0(r, i);
  else {
    let l = o ? r[r.length - 1] : r[0];
    for (n = 0, s = r.length; n < s; ++n)
      a = r[n], c = v0(l, a, r[Math.min(n + 1, s - (o ? 0 : 1)) % s], e.tension), a.cp1x = c.previous.x, a.cp1y = c.previous.y, a.cp2x = c.next.x, a.cp2y = c.next.y, l = a;
  }
  e.capBezierPoints && _0(r, t);
}
function Fs() {
  return typeof window < "u" && typeof document < "u";
}
function Zs(r) {
  let e = r.parentNode;
  return e && e.toString() === "[object ShadowRoot]" && (e = e.host), e;
}
function Po(r, e, t) {
  let o;
  return typeof r == "string" ? (o = parseInt(r, 10), r.indexOf("%") !== -1 && (o = o / 100 * e.parentNode[t])) : o = r, o;
}
const hn = (r) => r.ownerDocument.defaultView.getComputedStyle(r, null);
function k0(r, e) {
  return hn(r).getPropertyValue(e);
}
const $0 = [
  "top",
  "right",
  "bottom",
  "left"
];
function Kt(r, e, t) {
  const o = {};
  t = t ? "-" + t : "";
  for (let i = 0; i < 4; i++) {
    const n = $0[i];
    o[n] = parseFloat(r[e + "-" + n + t]) || 0;
  }
  return o.width = o.left + o.right, o.height = o.top + o.bottom, o;
}
const M0 = (r, e, t) => (r > 0 || e > 0) && (!t || !t.shadowRoot);
function L0(r, e) {
  const t = r.touches, o = t && t.length ? t[0] : r, { offsetX: i, offsetY: n } = o;
  let s = !1, a, c;
  if (M0(i, n, r.target))
    a = i, c = n;
  else {
    const l = e.getBoundingClientRect();
    a = o.clientX - l.left, c = o.clientY - l.top, s = !0;
  }
  return {
    x: a,
    y: c,
    box: s
  };
}
function qt(r, e) {
  if ("native" in r)
    return r;
  const { canvas: t, currentDevicePixelRatio: o } = e, i = hn(t), n = i.boxSizing === "border-box", s = Kt(i, "padding"), a = Kt(i, "border", "width"), { x: c, y: l, box: d } = L0(r, t), h = s.left + (d && a.left), p = s.top + (d && a.top);
  let { width: g, height: b } = e;
  return n && (g -= s.width + a.width, b -= s.height + a.height), {
    x: Math.round((c - h) / g * t.width / o),
    y: Math.round((l - p) / b * t.height / o)
  };
}
function S0(r, e, t) {
  let o, i;
  if (e === void 0 || t === void 0) {
    const n = r && Zs(r);
    if (!n)
      e = r.clientWidth, t = r.clientHeight;
    else {
      const s = n.getBoundingClientRect(), a = hn(n), c = Kt(a, "border", "width"), l = Kt(a, "padding");
      e = s.width - l.width - c.width, t = s.height - l.height - c.height, o = Po(a.maxWidth, n, "clientWidth"), i = Po(a.maxHeight, n, "clientHeight");
    }
  }
  return {
    width: e,
    height: t,
    maxWidth: o || Ao,
    maxHeight: i || Ao
  };
}
const yt = (r) => Math.round(r * 10) / 10;
function A0(r, e, t, o) {
  const i = hn(r), n = Kt(i, "margin"), s = Po(i.maxWidth, r, "clientWidth") || Ao, a = Po(i.maxHeight, r, "clientHeight") || Ao, c = S0(r, e, t);
  let { width: l, height: d } = c;
  if (i.boxSizing === "content-box") {
    const p = Kt(i, "border", "width"), g = Kt(i, "padding");
    l -= g.width + p.width, d -= g.height + p.height;
  }
  return l = Math.max(0, l - n.width), d = Math.max(0, o ? l / o : d - n.height), l = yt(Math.min(l, s, c.maxWidth)), d = yt(Math.min(d, a, c.maxHeight)), l && !d && (d = yt(l / 2)), (e !== void 0 || t !== void 0) && o && c.height && d > c.height && (d = c.height, l = yt(Math.floor(d * o))), {
    width: l,
    height: d
  };
}
function bl(r, e, t) {
  const o = e || 1, i = yt(r.height * o), n = yt(r.width * o);
  r.height = yt(r.height), r.width = yt(r.width);
  const s = r.canvas;
  return s.style && (t || !s.style.height && !s.style.width) && (s.style.height = `${r.height}px`, s.style.width = `${r.width}px`), r.currentDevicePixelRatio !== o || s.height !== i || s.width !== n ? (r.currentDevicePixelRatio = o, s.height = i, s.width = n, r.ctx.setTransform(o, 0, 0, o, 0, 0), !0) : !1;
}
const T0 = (function() {
  let r = !1;
  try {
    const e = {
      get passive() {
        return r = !0, !1;
      }
    };
    Fs() && (window.addEventListener("test", null, e), window.removeEventListener("test", null, e));
  } catch {
  }
  return r;
})();
function ml(r, e) {
  const t = k0(r, e), o = t && t.match(/^(\d+)(\.\d+)?px$/);
  return o ? +o[1] : void 0;
}
function Ut(r, e, t, o) {
  return {
    x: r.x + t * (e.x - r.x),
    y: r.y + t * (e.y - r.y)
  };
}
function P0(r, e, t, o) {
  return {
    x: r.x + t * (e.x - r.x),
    y: o === "middle" ? t < 0.5 ? r.y : e.y : o === "after" ? t < 1 ? r.y : e.y : t > 0 ? e.y : r.y
  };
}
function E0(r, e, t, o) {
  const i = {
    x: r.cp2x,
    y: r.cp2y
  }, n = {
    x: e.cp1x,
    y: e.cp1y
  }, s = Ut(r, i, t), a = Ut(i, n, t), c = Ut(n, e, t), l = Ut(s, a, t), d = Ut(a, c, t);
  return Ut(l, d, t);
}
const D0 = function(r, e) {
  return {
    x(t) {
      return r + r + e - t;
    },
    setWidth(t) {
      e = t;
    },
    textAlign(t) {
      return t === "center" ? t : t === "right" ? "left" : "right";
    },
    xPlus(t, o) {
      return t - o;
    },
    leftForLtr(t, o) {
      return t - o;
    }
  };
}, O0 = function() {
  return {
    x(r) {
      return r;
    },
    setWidth(r) {
    },
    textAlign(r) {
      return r;
    },
    xPlus(r, e) {
      return r + e;
    },
    leftForLtr(r, e) {
      return r;
    }
  };
};
function kr(r, e, t) {
  return r ? D0(e, t) : O0();
}
function ld(r, e) {
  let t, o;
  (e === "ltr" || e === "rtl") && (t = r.canvas.style, o = [
    t.getPropertyValue("direction"),
    t.getPropertyPriority("direction")
  ], t.setProperty("direction", e, "important"), r.prevTextDirection = o);
}
function dd(r, e) {
  e !== void 0 && (delete r.prevTextDirection, r.canvas.style.setProperty("direction", e[0], e[1]));
}
function hd(r) {
  return r === "angle" ? {
    between: Li,
    compare: H2,
    normalize: be
  } : {
    between: ht,
    compare: (e, t) => e - t,
    normalize: (e) => e
  };
}
function vl({ start: r, end: e, count: t, loop: o, style: i }) {
  return {
    start: r % t,
    end: e % t,
    loop: o && (e - r + 1) % t === 0,
    style: i
  };
}
function H0(r, e, t) {
  const { property: o, start: i, end: n } = t, { between: s, normalize: a } = hd(o), c = e.length;
  let { start: l, end: d, loop: h } = r, p, g;
  if (h) {
    for (l += c, d += c, p = 0, g = c; p < g && s(a(e[l % c][o]), i, n); ++p)
      l--, d--;
    l %= c, d %= c;
  }
  return d < l && (d += c), {
    start: l,
    end: d,
    loop: h,
    style: r.style
  };
}
function ud(r, e, t) {
  if (!t)
    return [
      r
    ];
  const { property: o, start: i, end: n } = t, s = e.length, { compare: a, between: c, normalize: l } = hd(o), { start: d, end: h, loop: p, style: g } = H0(r, e, t), b = [];
  let m = !1, v = null, y, C, w;
  const _ = () => c(i, w, y) && a(i, w) !== 0, x = () => a(n, y) === 0 || c(n, w, y), L = () => m || _(), S = () => !m || x();
  for (let A = d, P = d; A <= h; ++A)
    C = e[A % s], !C.skip && (y = l(C[o]), y !== w && (m = c(y, i, n), v === null && L() && (v = a(y, i) === 0 ? A : P), v !== null && S() && (b.push(vl({
      start: v,
      end: A,
      loop: p,
      count: s,
      style: g
    })), v = null), P = A, w = y));
  return v !== null && b.push(vl({
    start: v,
    end: h,
    loop: p,
    count: s,
    style: g
  })), b;
}
function pd(r, e) {
  const t = [], o = r.segments;
  for (let i = 0; i < o.length; i++) {
    const n = ud(o[i], r.points, e);
    n.length && t.push(...n);
  }
  return t;
}
function I0(r, e, t, o) {
  let i = 0, n = e - 1;
  if (t && !o)
    for (; i < e && !r[i].skip; )
      i++;
  for (; i < e && r[i].skip; )
    i++;
  for (i %= e, t && (n += i); n > i && r[n % e].skip; )
    n--;
  return n %= e, {
    start: i,
    end: n
  };
}
function B0(r, e, t, o) {
  const i = r.length, n = [];
  let s = e, a = r[e], c;
  for (c = e + 1; c <= t; ++c) {
    const l = r[c % i];
    l.skip || l.stop ? a.skip || (o = !1, n.push({
      start: e % i,
      end: (c - 1) % i,
      loop: o
    }), e = s = l.stop ? c : null) : (s = c, a.skip && (e = c)), a = l;
  }
  return s !== null && n.push({
    start: e % i,
    end: s % i,
    loop: o
  }), n;
}
function V0(r, e) {
  const t = r.points, o = r.options.spanGaps, i = t.length;
  if (!i)
    return [];
  const n = !!r._loop, { start: s, end: a } = I0(t, i, n, o);
  if (o === !0)
    return yl(r, [
      {
        start: s,
        end: a,
        loop: n
      }
    ], t, e);
  const c = a < s ? a + i : a, l = !!r._fullLoop && s === 0 && a === i - 1;
  return yl(r, B0(t, s, c, l), t, e);
}
function yl(r, e, t, o) {
  return !o || !o.setContext || !t ? e : N0(r, e, t, o);
}
function N0(r, e, t, o) {
  const i = r._chart.getContext(), n = Cl(r.options), { _datasetIndex: s, options: { spanGaps: a } } = r, c = t.length, l = [];
  let d = n, h = e[0].start, p = h;
  function g(b, m, v, y) {
    const C = a ? -1 : 1;
    if (b !== m) {
      for (b += c; t[b % c].skip; )
        b -= C;
      for (; t[m % c].skip; )
        m += C;
      b % c !== m % c && (l.push({
        start: b % c,
        end: m % c,
        loop: v,
        style: y
      }), d = y, h = m % c);
    }
  }
  for (const b of e) {
    h = a ? h : b.start;
    let m = t[h % c], v;
    for (p = h + 1; p <= b.end; p++) {
      const y = t[p % c];
      v = Cl(o.setContext(Ht(i, {
        type: "segment",
        p0: m,
        p1: y,
        p0DataIndex: (p - 1) % c,
        p1DataIndex: p % c,
        datasetIndex: s
      }))), R0(v, d) && g(h, p - 1, b.loop, d), m = y, d = v;
    }
    h < p - 1 && g(h, p - 1, b.loop, d);
  }
  return l;
}
function Cl(r) {
  return {
    backgroundColor: r.backgroundColor,
    borderCapStyle: r.borderCapStyle,
    borderDash: r.borderDash,
    borderDashOffset: r.borderDashOffset,
    borderJoinStyle: r.borderJoinStyle,
    borderWidth: r.borderWidth,
    borderColor: r.borderColor
  };
}
function R0(r, e) {
  if (!e)
    return !1;
  const t = [], o = function(i, n) {
    return Bs(n) ? (t.includes(n) || t.push(n), t.indexOf(n)) : n;
  };
  return JSON.stringify(r, o) !== JSON.stringify(e, o);
}
function ho(r, e, t) {
  return r.options.clip ? r[t] : e[t];
}
function z0(r, e) {
  const { xScale: t, yScale: o } = r;
  return t && o ? {
    left: ho(t, e, "left"),
    right: ho(t, e, "right"),
    top: ho(o, e, "top"),
    bottom: ho(o, e, "bottom")
  } : e;
}
function fd(r, e) {
  const t = e._clip;
  if (t.disabled)
    return !1;
  const o = z0(e, r.chartArea);
  return {
    left: t.left === !1 ? 0 : o.left - (t.left === !0 ? 0 : t.left),
    right: t.right === !1 ? r.width : o.right + (t.right === !0 ? 0 : t.right),
    top: t.top === !1 ? 0 : o.top - (t.top === !0 ? 0 : t.top),
    bottom: t.bottom === !1 ? r.height : o.bottom + (t.bottom === !0 ? 0 : t.bottom)
  };
}
class F0 {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(e, t, o, i) {
    const n = t.listeners[i], s = t.duration;
    n.forEach((a) => a({
      chart: e,
      initial: t.initial,
      numSteps: s,
      currentStep: Math.min(o - t.start, s)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = K1.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(e = Date.now()) {
    let t = 0;
    this._charts.forEach((o, i) => {
      if (!o.running || !o.items.length)
        return;
      const n = o.items;
      let s = n.length - 1, a = !1, c;
      for (; s >= 0; --s)
        c = n[s], c._active ? (c._total > o.duration && (o.duration = c._total), c.tick(e), a = !0) : (n[s] = n[n.length - 1], n.pop());
      a && (i.draw(), this._notify(i, o, e, "progress")), n.length || (o.running = !1, this._notify(i, o, e, "complete"), o.initial = !1), t += n.length;
    }), this._lastDate = e, t === 0 && (this._running = !1);
  }
  _getAnims(e) {
    const t = this._charts;
    let o = t.get(e);
    return o || (o = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, t.set(e, o)), o;
  }
  listen(e, t, o) {
    this._getAnims(e).listeners[t].push(o);
  }
  add(e, t) {
    !t || !t.length || this._getAnims(e).items.push(...t);
  }
  has(e) {
    return this._getAnims(e).items.length > 0;
  }
  start(e) {
    const t = this._charts.get(e);
    t && (t.running = !0, t.start = Date.now(), t.duration = t.items.reduce((o, i) => Math.max(o, i._duration), 0), this._refresh());
  }
  running(e) {
    if (!this._running)
      return !1;
    const t = this._charts.get(e);
    return !(!t || !t.running || !t.items.length);
  }
  stop(e) {
    const t = this._charts.get(e);
    if (!t || !t.items.length)
      return;
    const o = t.items;
    let i = o.length - 1;
    for (; i >= 0; --i)
      o[i].cancel();
    t.items = [], this._notify(e, t, Date.now(), "complete");
  }
  remove(e) {
    return this._charts.delete(e);
  }
}
var at = /* @__PURE__ */ new F0();
const xl = "transparent", Z0 = {
  boolean(r, e, t) {
    return t > 0.5 ? e : r;
  },
  color(r, e, t) {
    const o = hl(r || xl), i = o.valid && hl(e || xl);
    return i && i.valid ? i.mix(o, t).hexString() : e;
  },
  number(r, e, t) {
    return r + (e - r) * t;
  }
};
class j0 {
  constructor(e, t, o, i) {
    const n = t[o];
    i = Jr([
      e.to,
      i,
      n,
      e.from
    ]);
    const s = Jr([
      e.from,
      n,
      i
    ]);
    this._active = !0, this._fn = e.fn || Z0[e.type || typeof s], this._easing = ni[e.easing] || ni.linear, this._start = Math.floor(Date.now() + (e.delay || 0)), this._duration = this._total = Math.floor(e.duration), this._loop = !!e.loop, this._target = t, this._prop = o, this._from = s, this._to = i, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(e, t, o) {
    if (this._active) {
      this._notify(!1);
      const i = this._target[this._prop], n = o - this._start, s = this._duration - n;
      this._start = o, this._duration = Math.floor(Math.max(s, e.duration)), this._total += n, this._loop = !!e.loop, this._to = Jr([
        e.to,
        t,
        i,
        e.from
      ]), this._from = Jr([
        e.from,
        i,
        t
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(e) {
    const t = e - this._start, o = this._duration, i = this._prop, n = this._from, s = this._loop, a = this._to;
    let c;
    if (this._active = n !== a && (s || t < o), !this._active) {
      this._target[i] = a, this._notify(!0);
      return;
    }
    if (t < 0) {
      this._target[i] = n;
      return;
    }
    c = t / o % 2, c = s && c > 1 ? 2 - c : c, c = this._easing(Math.min(1, Math.max(0, c))), this._target[i] = this._fn(n, a, c);
  }
  wait() {
    const e = this._promises || (this._promises = []);
    return new Promise((t, o) => {
      e.push({
        res: t,
        rej: o
      });
    });
  }
  _notify(e) {
    const t = e ? "res" : "rej", o = this._promises || [];
    for (let i = 0; i < o.length; i++)
      o[i][t]();
  }
}
class gd {
  constructor(e, t) {
    this._chart = e, this._properties = /* @__PURE__ */ new Map(), this.configure(t);
  }
  configure(e) {
    if (!I(e))
      return;
    const t = Object.keys(Y.animation), o = this._properties;
    Object.getOwnPropertyNames(e).forEach((i) => {
      const n = e[i];
      if (!I(n))
        return;
      const s = {};
      for (const a of t)
        s[a] = n[a];
      (U(n.properties) && n.properties || [
        i
      ]).forEach((a) => {
        (a === i || !o.has(a)) && o.set(a, s);
      });
    });
  }
  _animateOptions(e, t) {
    const o = t.options, i = q0(e, o);
    if (!i)
      return [];
    const n = this._createAnimations(i, o);
    return o.$shared && W0(e.options.$animations, o).then(() => {
      e.options = o;
    }, () => {
    }), n;
  }
  _createAnimations(e, t) {
    const o = this._properties, i = [], n = e.$animations || (e.$animations = {}), s = Object.keys(t), a = Date.now();
    let c;
    for (c = s.length - 1; c >= 0; --c) {
      const l = s[c];
      if (l.charAt(0) === "$")
        continue;
      if (l === "options") {
        i.push(...this._animateOptions(e, t));
        continue;
      }
      const d = t[l];
      let h = n[l];
      const p = o.get(l);
      if (h)
        if (p && h.active()) {
          h.update(p, d, a);
          continue;
        } else
          h.cancel();
      if (!p || !p.duration) {
        e[l] = d;
        continue;
      }
      n[l] = h = new j0(p, e, l, d), i.push(h);
    }
    return i;
  }
  update(e, t) {
    if (this._properties.size === 0) {
      Object.assign(e, t);
      return;
    }
    const o = this._createAnimations(e, t);
    if (o.length)
      return at.add(this._chart, o), !0;
  }
}
function W0(r, e) {
  const t = [], o = Object.keys(e);
  for (let i = 0; i < o.length; i++) {
    const n = r[o[i]];
    n && n.active() && t.push(n.wait());
  }
  return Promise.all(t);
}
function q0(r, e) {
  if (!e)
    return;
  let t = r.options;
  if (!t) {
    r.options = e;
    return;
  }
  return t.$shared && (r.options = t = Object.assign({}, t, {
    $shared: !1,
    $animations: {}
  })), t;
}
function _l(r, e) {
  const t = r && r.options || {}, o = t.reverse, i = t.min === void 0 ? e : 0, n = t.max === void 0 ? e : 0;
  return {
    start: o ? n : i,
    end: o ? i : n
  };
}
function U0(r, e, t) {
  if (t === !1)
    return !1;
  const o = _l(r, t), i = _l(e, t);
  return {
    top: i.end,
    right: o.end,
    bottom: i.start,
    left: o.start
  };
}
function Y0(r) {
  let e, t, o, i;
  return I(r) ? (e = r.top, t = r.right, o = r.bottom, i = r.left) : e = t = o = i = r, {
    top: e,
    right: t,
    bottom: o,
    left: i,
    disabled: r === !1
  };
}
function bd(r, e) {
  const t = [], o = r._getSortedDatasetMetas(e);
  let i, n;
  for (i = 0, n = o.length; i < n; ++i)
    t.push(o[i].index);
  return t;
}
function wl(r, e, t, o = {}) {
  const i = r.keys, n = o.mode === "single";
  let s, a, c, l;
  if (e === null)
    return;
  let d = !1;
  for (s = 0, a = i.length; s < a; ++s) {
    if (c = +i[s], c === t) {
      if (d = !0, o.all)
        continue;
      break;
    }
    l = r.values[c], Q(l) && (n || e === 0 || Ge(e) === Ge(l)) && (e += l);
  }
  return !d && !o.all ? 0 : e;
}
function X0(r, e) {
  const { iScale: t, vScale: o } = e, i = t.axis === "x" ? "x" : "y", n = o.axis === "x" ? "x" : "y", s = Object.keys(r), a = new Array(s.length);
  let c, l, d;
  for (c = 0, l = s.length; c < l; ++c)
    d = s[c], a[c] = {
      [i]: d,
      [n]: r[d]
    };
  return a;
}
function Mn(r, e) {
  const t = r && r.options.stacked;
  return t || t === void 0 && e.stack !== void 0;
}
function K0(r, e, t) {
  return `${r.id}.${e.id}.${t.stack || t.type}`;
}
function G0(r) {
  const { min: e, max: t, minDefined: o, maxDefined: i } = r.getUserBounds();
  return {
    min: o ? e : Number.NEGATIVE_INFINITY,
    max: i ? t : Number.POSITIVE_INFINITY
  };
}
function J0(r, e, t) {
  const o = r[e] || (r[e] = {});
  return o[t] || (o[t] = {});
}
function kl(r, e, t, o) {
  for (const i of e.getMatchingVisibleMetas(o).reverse()) {
    const n = r[i.index];
    if (t && n > 0 || !t && n < 0)
      return i.index;
  }
  return null;
}
function $l(r, e) {
  const { chart: t, _cachedMeta: o } = r, i = t._stacks || (t._stacks = {}), { iScale: n, vScale: s, index: a } = o, c = n.axis, l = s.axis, d = K0(n, s, o), h = e.length;
  let p;
  for (let g = 0; g < h; ++g) {
    const b = e[g], { [c]: m, [l]: v } = b, y = b._stacks || (b._stacks = {});
    p = y[l] = J0(i, d, m), p[a] = v, p._top = kl(p, s, !0, o.type), p._bottom = kl(p, s, !1, o.type);
    const C = p._visualValues || (p._visualValues = {});
    C[a] = v;
  }
}
function Ln(r, e) {
  const t = r.scales;
  return Object.keys(t).filter((o) => t[o].axis === e).shift();
}
function Q0(r, e) {
  return Ht(r, {
    active: !1,
    dataset: void 0,
    datasetIndex: e,
    index: e,
    mode: "default",
    type: "dataset"
  });
}
function e5(r, e, t) {
  return Ht(r, {
    active: !1,
    dataIndex: e,
    parsed: void 0,
    raw: void 0,
    element: t,
    index: e,
    mode: "default",
    type: "data"
  });
}
function qr(r, e) {
  const t = r.controller.index, o = r.vScale && r.vScale.axis;
  if (o) {
    e = e || r._parsed;
    for (const i of e) {
      const n = i._stacks;
      if (!n || n[o] === void 0 || n[o][t] === void 0)
        return;
      delete n[o][t], n[o]._visualValues !== void 0 && n[o]._visualValues[t] !== void 0 && delete n[o]._visualValues[t];
    }
  }
}
const Sn = (r) => r === "reset" || r === "none", Ml = (r, e) => e ? r : Object.assign({}, r), t5 = (r, e, t) => r && !e.hidden && e._stacked && {
  keys: bd(t, !0),
  values: null
}, ai = class ai {
  constructor(e, t) {
    this.chart = e, this._ctx = e.ctx, this.index = t, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const e = this._cachedMeta;
    this.configure(), this.linkScales(), e._stacked = Mn(e.vScale, e), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(e) {
    this.index !== e && qr(this._cachedMeta), this.index = e;
  }
  linkScales() {
    const e = this.chart, t = this._cachedMeta, o = this.getDataset(), i = (h, p, g, b) => h === "x" ? p : h === "r" ? b : g, n = t.xAxisID = E(o.xAxisID, Ln(e, "x")), s = t.yAxisID = E(o.yAxisID, Ln(e, "y")), a = t.rAxisID = E(o.rAxisID, Ln(e, "r")), c = t.indexAxis, l = t.iAxisID = i(c, n, s, a), d = t.vAxisID = i(c, s, n, a);
    t.xScale = this.getScaleForId(n), t.yScale = this.getScaleForId(s), t.rScale = this.getScaleForId(a), t.iScale = this.getScaleForId(l), t.vScale = this.getScaleForId(d);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(e) {
    return this.chart.scales[e];
  }
  _getOtherScale(e) {
    const t = this._cachedMeta;
    return e === t.iScale ? t.vScale : t.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const e = this._cachedMeta;
    this._data && cl(this._data, this), e._stacked && qr(e);
  }
  _dataCheck() {
    const e = this.getDataset(), t = e.data || (e.data = []), o = this._data;
    if (I(t)) {
      const i = this._cachedMeta;
      this._data = X0(t, i);
    } else if (o !== t) {
      if (o) {
        cl(o, this);
        const i = this._cachedMeta;
        qr(i), i._parsed = [];
      }
      t && Object.isExtensible(t) && N2(t, this), this._syncList = [], this._data = t;
    }
  }
  addElements() {
    const e = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (e.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(e) {
    const t = this._cachedMeta, o = this.getDataset();
    let i = !1;
    this._dataCheck();
    const n = t._stacked;
    t._stacked = Mn(t.vScale, t), t.stack !== o.stack && (i = !0, qr(t), t.stack = o.stack), this._resyncElements(e), (i || n !== t._stacked) && ($l(this, t._parsed), t._stacked = Mn(t.vScale, t));
  }
  configure() {
    const e = this.chart.config, t = e.datasetScopeKeys(this._type), o = e.getOptionScopes(this.getDataset(), t, !0);
    this.options = e.createResolver(o, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(e, t) {
    const { _cachedMeta: o, _data: i } = this, { iScale: n, _stacked: s } = o, a = n.axis;
    let c = e === 0 && t === i.length ? !0 : o._sorted, l = e > 0 && o._parsed[e - 1], d, h, p;
    if (this._parsing === !1)
      o._parsed = i, o._sorted = !0, p = i;
    else {
      U(i[e]) ? p = this.parseArrayData(o, i, e, t) : I(i[e]) ? p = this.parseObjectData(o, i, e, t) : p = this.parsePrimitiveData(o, i, e, t);
      const g = () => h[a] === null || l && h[a] < l[a];
      for (d = 0; d < t; ++d)
        o._parsed[d + e] = h = p[d], c && (g() && (c = !1), l = h);
      o._sorted = c;
    }
    s && $l(this, p);
  }
  parsePrimitiveData(e, t, o, i) {
    const { iScale: n, vScale: s } = e, a = n.axis, c = s.axis, l = n.getLabels(), d = n === s, h = new Array(i);
    let p, g, b;
    for (p = 0, g = i; p < g; ++p)
      b = p + o, h[p] = {
        [a]: d || n.parse(l[b], b),
        [c]: s.parse(t[b], b)
      };
    return h;
  }
  parseArrayData(e, t, o, i) {
    const { xScale: n, yScale: s } = e, a = new Array(i);
    let c, l, d, h;
    for (c = 0, l = i; c < l; ++c)
      d = c + o, h = t[d], a[c] = {
        x: n.parse(h[0], d),
        y: s.parse(h[1], d)
      };
    return a;
  }
  parseObjectData(e, t, o, i) {
    const { xScale: n, yScale: s } = e, { xAxisKey: a = "x", yAxisKey: c = "y" } = this._parsing, l = new Array(i);
    let d, h, p, g;
    for (d = 0, h = i; d < h; ++d)
      p = d + o, g = t[p], l[d] = {
        x: n.parse(wt(g, a), p),
        y: s.parse(wt(g, c), p)
      };
    return l;
  }
  getParsed(e) {
    return this._cachedMeta._parsed[e];
  }
  getDataElement(e) {
    return this._cachedMeta.data[e];
  }
  applyStack(e, t, o) {
    const i = this.chart, n = this._cachedMeta, s = t[e.axis], a = {
      keys: bd(i, !0),
      values: t._stacks[e.axis]._visualValues
    };
    return wl(a, s, n.index, {
      mode: o
    });
  }
  updateRangeFromParsed(e, t, o, i) {
    const n = o[t.axis];
    let s = n === null ? NaN : n;
    const a = i && o._stacks[t.axis];
    i && a && (i.values = a, s = wl(i, n, this._cachedMeta.index)), e.min = Math.min(e.min, s), e.max = Math.max(e.max, s);
  }
  getMinMax(e, t) {
    const o = this._cachedMeta, i = o._parsed, n = o._sorted && e === o.iScale, s = i.length, a = this._getOtherScale(e), c = t5(t, o, this.chart), l = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: d, max: h } = G0(a);
    let p, g;
    function b() {
      g = i[p];
      const m = g[a.axis];
      return !Q(g[e.axis]) || d > m || h < m;
    }
    for (p = 0; p < s && !(!b() && (this.updateRangeFromParsed(l, e, g, c), n)); ++p)
      ;
    if (n) {
      for (p = s - 1; p >= 0; --p)
        if (!b()) {
          this.updateRangeFromParsed(l, e, g, c);
          break;
        }
    }
    return l;
  }
  getAllParsedValues(e) {
    const t = this._cachedMeta._parsed, o = [];
    let i, n, s;
    for (i = 0, n = t.length; i < n; ++i)
      s = t[i][e.axis], Q(s) && o.push(s);
    return o;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(e) {
    const t = this._cachedMeta, o = t.iScale, i = t.vScale, n = this.getParsed(e);
    return {
      label: o ? "" + o.getLabelForValue(n[o.axis]) : "",
      value: i ? "" + i.getLabelForValue(n[i.axis]) : ""
    };
  }
  _update(e) {
    const t = this._cachedMeta;
    this.update(e || "default"), t._clip = Y0(E(this.options.clip, U0(t.xScale, t.yScale, this.getMaxOverflow())));
  }
  update(e) {
  }
  draw() {
    const e = this._ctx, t = this.chart, o = this._cachedMeta, i = o.data || [], n = t.chartArea, s = [], a = this._drawStart || 0, c = this._drawCount || i.length - a, l = this.options.drawActiveElementsOnTop;
    let d;
    for (o.dataset && o.dataset.draw(e, n, a, c), d = a; d < a + c; ++d) {
      const h = i[d];
      h.hidden || (h.active && l ? s.push(h) : h.draw(e, n));
    }
    for (d = 0; d < s.length; ++d)
      s[d].draw(e, n);
  }
  getStyle(e, t) {
    const o = t ? "active" : "default";
    return e === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(o) : this.resolveDataElementOptions(e || 0, o);
  }
  getContext(e, t, o) {
    const i = this.getDataset();
    let n;
    if (e >= 0 && e < this._cachedMeta.data.length) {
      const s = this._cachedMeta.data[e];
      n = s.$context || (s.$context = e5(this.getContext(), e, s)), n.parsed = this.getParsed(e), n.raw = i.data[e], n.index = n.dataIndex = e;
    } else
      n = this.$context || (this.$context = Q0(this.chart.getContext(), this.index)), n.dataset = i, n.index = n.datasetIndex = this.index;
    return n.active = !!t, n.mode = o, n;
  }
  resolveDatasetElementOptions(e) {
    return this._resolveElementOptions(this.datasetElementType.id, e);
  }
  resolveDataElementOptions(e, t) {
    return this._resolveElementOptions(this.dataElementType.id, t, e);
  }
  _resolveElementOptions(e, t = "default", o) {
    const i = t === "active", n = this._cachedDataOpts, s = e + "-" + t, a = n[s], c = this.enableOptionSharing && Mi(o);
    if (a)
      return Ml(a, c);
    const l = this.chart.config, d = l.datasetElementScopeKeys(this._type, e), h = i ? [
      `${e}Hover`,
      "hover",
      e,
      ""
    ] : [
      e,
      ""
    ], p = l.getOptionScopes(this.getDataset(), d), g = Object.keys(Y.elements[e]), b = () => this.getContext(o, i, t), m = l.resolveNamedOptions(p, g, b, h);
    return m.$shared && (m.$shared = c, n[s] = Object.freeze(Ml(m, c))), m;
  }
  _resolveAnimations(e, t, o) {
    const i = this.chart, n = this._cachedDataOpts, s = `animation-${t}`, a = n[s];
    if (a)
      return a;
    let c;
    if (i.options.animation !== !1) {
      const d = this.chart.config, h = d.datasetAnimationScopeKeys(this._type, t), p = d.getOptionScopes(this.getDataset(), h);
      c = d.createResolver(p, this.getContext(e, o, t));
    }
    const l = new gd(i, c && c.animations);
    return c && c._cacheable && (n[s] = Object.freeze(l)), l;
  }
  getSharedOptions(e) {
    if (e.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, e));
  }
  includeOptions(e, t) {
    return !t || Sn(e) || this.chart._animationsDisabled;
  }
  _getSharedOptions(e, t) {
    const o = this.resolveDataElementOptions(e, t), i = this._sharedOptions, n = this.getSharedOptions(o), s = this.includeOptions(t, n) || n !== i;
    return this.updateSharedOptions(n, t, o), {
      sharedOptions: n,
      includeOptions: s
    };
  }
  updateElement(e, t, o, i) {
    Sn(i) ? Object.assign(e, o) : this._resolveAnimations(t, i).update(e, o);
  }
  updateSharedOptions(e, t, o) {
    e && !Sn(t) && this._resolveAnimations(void 0, t).update(e, o);
  }
  _setStyle(e, t, o, i) {
    e.active = i;
    const n = this.getStyle(t, i);
    this._resolveAnimations(t, o, i).update(e, {
      options: !i && this.getSharedOptions(n) || n
    });
  }
  removeHoverStyle(e, t, o) {
    this._setStyle(e, o, "active", !1);
  }
  setHoverStyle(e, t, o) {
    this._setStyle(e, o, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const e = this._cachedMeta.dataset;
    e && this._setStyle(e, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const e = this._cachedMeta.dataset;
    e && this._setStyle(e, void 0, "active", !0);
  }
  _resyncElements(e) {
    const t = this._data, o = this._cachedMeta.data;
    for (const [a, c, l] of this._syncList)
      this[a](c, l);
    this._syncList = [];
    const i = o.length, n = t.length, s = Math.min(n, i);
    s && this.parse(0, s), n > i ? this._insertElements(i, n - i, e) : n < i && this._removeElements(n, i - n);
  }
  _insertElements(e, t, o = !0) {
    const i = this._cachedMeta, n = i.data, s = e + t;
    let a;
    const c = (l) => {
      for (l.length += t, a = l.length - 1; a >= s; a--)
        l[a] = l[a - t];
    };
    for (c(n), a = e; a < s; ++a)
      n[a] = new this.dataElementType();
    this._parsing && c(i._parsed), this.parse(e, t), o && this.updateElements(n, e, t, "reset");
  }
  updateElements(e, t, o, i) {
  }
  _removeElements(e, t) {
    const o = this._cachedMeta;
    if (this._parsing) {
      const i = o._parsed.splice(e, t);
      o._stacked && qr(o, i);
    }
    o.data.splice(e, t);
  }
  _sync(e) {
    if (this._parsing)
      this._syncList.push(e);
    else {
      const [t, o, i] = e;
      this[t](o, i);
    }
    this.chart._dataChanges.push([
      this.index,
      ...e
    ]);
  }
  _onDataPush() {
    const e = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - e,
      e
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(e, t) {
    t && this._sync([
      "_removeElements",
      e,
      t
    ]);
    const o = arguments.length - 2;
    o && this._sync([
      "_insertElements",
      e,
      o
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
};
ai.defaults = {}, ai.datasetElementType = null, ai.dataElementType = null;
let Qe = ai;
function r5(r, e) {
  if (!r._cache.$bar) {
    const t = r.getMatchingVisibleMetas(e);
    let o = [];
    for (let i = 0, n = t.length; i < n; i++)
      o = o.concat(t[i].controller.getAllParsedValues(r));
    r._cache.$bar = X1(o.sort((i, n) => i - n));
  }
  return r._cache.$bar;
}
function i5(r) {
  const e = r.iScale, t = r5(e, r.type);
  let o = e._length, i, n, s, a;
  const c = () => {
    s === 32767 || s === -32768 || (Mi(a) && (o = Math.min(o, Math.abs(s - a) || o)), a = s);
  };
  for (i = 0, n = t.length; i < n; ++i)
    s = e.getPixelForValue(t[i]), c();
  for (a = void 0, i = 0, n = e.ticks.length; i < n; ++i)
    s = e.getPixelForTick(i), c();
  return o;
}
function o5(r, e, t, o) {
  const i = t.barThickness;
  let n, s;
  return H(i) ? (n = e.min * t.categoryPercentage, s = t.barPercentage) : (n = i * o, s = 1), {
    chunk: n / o,
    ratio: s,
    start: e.pixels[r] - n / 2
  };
}
function n5(r, e, t, o) {
  const i = e.pixels, n = i[r];
  let s = r > 0 ? i[r - 1] : null, a = r < i.length - 1 ? i[r + 1] : null;
  const c = t.categoryPercentage;
  s === null && (s = n - (a === null ? e.end - e.start : a - n)), a === null && (a = n + n - s);
  const l = n - (n - Math.min(s, a)) / 2 * c;
  return {
    chunk: Math.abs(a - s) / 2 * c / o,
    ratio: t.barPercentage,
    start: l
  };
}
function s5(r, e, t, o) {
  const i = t.parse(r[0], o), n = t.parse(r[1], o), s = Math.min(i, n), a = Math.max(i, n);
  let c = s, l = a;
  Math.abs(s) > Math.abs(a) && (c = a, l = s), e[t.axis] = l, e._custom = {
    barStart: c,
    barEnd: l,
    start: i,
    end: n,
    min: s,
    max: a
  };
}
function md(r, e, t, o) {
  return U(r) ? s5(r, e, t, o) : e[t.axis] = t.parse(r, o), e;
}
function Ll(r, e, t, o) {
  const i = r.iScale, n = r.vScale, s = i.getLabels(), a = i === n, c = [];
  let l, d, h, p;
  for (l = t, d = t + o; l < d; ++l)
    p = e[l], h = {}, h[i.axis] = a || i.parse(s[l], l), c.push(md(p, h, n, l));
  return c;
}
function An(r) {
  return r && r.barStart !== void 0 && r.barEnd !== void 0;
}
function a5(r, e, t) {
  return r !== 0 ? Ge(r) : (e.isHorizontal() ? 1 : -1) * (e.min >= t ? 1 : -1);
}
function c5(r) {
  let e, t, o, i, n;
  return r.horizontal ? (e = r.base > r.x, t = "left", o = "right") : (e = r.base < r.y, t = "bottom", o = "top"), e ? (i = "end", n = "start") : (i = "start", n = "end"), {
    start: t,
    end: o,
    reverse: e,
    top: i,
    bottom: n
  };
}
function l5(r, e, t, o) {
  let i = e.borderSkipped;
  const n = {};
  if (!i) {
    r.borderSkipped = n;
    return;
  }
  if (i === !0) {
    r.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: s, end: a, reverse: c, top: l, bottom: d } = c5(r);
  i === "middle" && t && (r.enableBorderRadius = !0, (t._top || 0) === o ? i = l : (t._bottom || 0) === o ? i = d : (n[Sl(d, s, a, c)] = !0, i = l)), n[Sl(i, s, a, c)] = !0, r.borderSkipped = n;
}
function Sl(r, e, t, o) {
  return o ? (r = d5(r, e, t), r = Al(r, t, e)) : r = Al(r, e, t), r;
}
function d5(r, e, t) {
  return r === e ? t : r === t ? e : r;
}
function Al(r, e, t) {
  return r === "start" ? e : r === "end" ? t : r;
}
function h5(r, { inflateAmount: e }, t) {
  r.inflateAmount = e === "auto" ? t === 1 ? 0.33 : 0 : e;
}
const ci = class ci extends Qe {
  parsePrimitiveData(e, t, o, i) {
    return Ll(e, t, o, i);
  }
  parseArrayData(e, t, o, i) {
    return Ll(e, t, o, i);
  }
  parseObjectData(e, t, o, i) {
    const { iScale: n, vScale: s } = e, { xAxisKey: a = "x", yAxisKey: c = "y" } = this._parsing, l = n.axis === "x" ? a : c, d = s.axis === "x" ? a : c, h = [];
    let p, g, b, m;
    for (p = o, g = o + i; p < g; ++p)
      m = t[p], b = {}, b[n.axis] = n.parse(wt(m, l), p), h.push(md(wt(m, d), b, s, p));
    return h;
  }
  updateRangeFromParsed(e, t, o, i) {
    super.updateRangeFromParsed(e, t, o, i);
    const n = o._custom;
    n && t === this._cachedMeta.vScale && (e.min = Math.min(e.min, n.min), e.max = Math.max(e.max, n.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(e) {
    const t = this._cachedMeta, { iScale: o, vScale: i } = t, n = this.getParsed(e), s = n._custom, a = An(s) ? "[" + s.start + ", " + s.end + "]" : "" + i.getLabelForValue(n[i.axis]);
    return {
      label: "" + o.getLabelForValue(n[o.axis]),
      value: a
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const e = this._cachedMeta;
    e.stack = this.getDataset().stack;
  }
  update(e) {
    const t = this._cachedMeta;
    this.updateElements(t.data, 0, t.data.length, e);
  }
  updateElements(e, t, o, i) {
    const n = i === "reset", { index: s, _cachedMeta: { vScale: a } } = this, c = a.getBasePixel(), l = a.isHorizontal(), d = this._getRuler(), { sharedOptions: h, includeOptions: p } = this._getSharedOptions(t, i);
    for (let g = t; g < t + o; g++) {
      const b = this.getParsed(g), m = n || H(b[a.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(g), v = this._calculateBarIndexPixels(g, d), y = (b._stacks || {})[a.axis], C = {
        horizontal: l,
        base: m.base,
        enableBorderRadius: !y || An(b._custom) || s === y._top || s === y._bottom,
        x: l ? m.head : v.center,
        y: l ? v.center : m.head,
        height: l ? v.size : Math.abs(m.size),
        width: l ? Math.abs(m.size) : v.size
      };
      p && (C.options = h || this.resolveDataElementOptions(g, e[g].active ? "active" : i));
      const w = C.options || e[g].options;
      l5(C, w, y, s), h5(C, w, d.ratio), this.updateElement(e[g], g, C, i);
    }
  }
  _getStacks(e, t) {
    const { iScale: o } = this._cachedMeta, i = o.getMatchingVisibleMetas(this._type).filter((d) => d.controller.options.grouped), n = o.options.stacked, s = [], a = this._cachedMeta.controller.getParsed(t), c = a && a[o.axis], l = (d) => {
      const h = d._parsed.find((g) => g[o.axis] === c), p = h && h[d.vScale.axis];
      if (H(p) || isNaN(p))
        return !0;
    };
    for (const d of i)
      if (!(t !== void 0 && l(d)) && ((n === !1 || s.indexOf(d.stack) === -1 || n === void 0 && d.stack === void 0) && s.push(d.stack), d.index === e))
        break;
    return s.length || s.push(void 0), s;
  }
  _getStackCount(e) {
    return this._getStacks(void 0, e).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const e = this.chart.scales, t = this.chart.options.indexAxis;
    return Object.keys(e).filter((o) => e[o].axis === t).shift();
  }
  _getAxis() {
    const e = {}, t = this.getFirstScaleIdForIndexAxis();
    for (const o of this.chart.data.datasets)
      e[E(this.chart.options.indexAxis === "x" ? o.xAxisID : o.yAxisID, t)] = !0;
    return Object.keys(e);
  }
  _getStackIndex(e, t, o) {
    const i = this._getStacks(e, o), n = t !== void 0 ? i.indexOf(t) : -1;
    return n === -1 ? i.length - 1 : n;
  }
  _getRuler() {
    const e = this.options, t = this._cachedMeta, o = t.iScale, i = [];
    let n, s;
    for (n = 0, s = t.data.length; n < s; ++n)
      i.push(o.getPixelForValue(this.getParsed(n)[o.axis], n));
    const a = e.barThickness;
    return {
      min: a || i5(t),
      pixels: i,
      start: o._startPixel,
      end: o._endPixel,
      stackCount: this._getStackCount(),
      scale: o,
      grouped: e.grouped,
      ratio: a ? 1 : e.categoryPercentage * e.barPercentage
    };
  }
  _calculateBarValuePixels(e) {
    const { _cachedMeta: { vScale: t, _stacked: o, index: i }, options: { base: n, minBarLength: s } } = this, a = n || 0, c = this.getParsed(e), l = c._custom, d = An(l);
    let h = c[t.axis], p = 0, g = o ? this.applyStack(t, c, o) : h, b, m;
    g !== h && (p = g - h, g = h), d && (h = l.barStart, g = l.barEnd - l.barStart, h !== 0 && Ge(h) !== Ge(l.barEnd) && (p = 0), p += h);
    const v = !H(n) && !d ? n : p;
    let y = t.getPixelForValue(v);
    if (this.chart.getDataVisibility(e) ? b = t.getPixelForValue(p + g) : b = y, m = b - y, Math.abs(m) < s) {
      m = a5(m, t, a) * s, h === a && (y -= m / 2);
      const C = t.getPixelForDecimal(0), w = t.getPixelForDecimal(1), _ = Math.min(C, w), x = Math.max(C, w);
      y = Math.max(Math.min(y, x), _), b = y + m, o && !d && (c._stacks[t.axis]._visualValues[i] = t.getValueForPixel(b) - t.getValueForPixel(y));
    }
    if (y === t.getPixelForValue(a)) {
      const C = Ge(m) * t.getLineWidthForValue(a) / 2;
      y += C, m -= C;
    }
    return {
      size: m,
      base: y,
      head: b,
      center: b + m / 2
    };
  }
  _calculateBarIndexPixels(e, t) {
    const o = t.scale, i = this.options, n = i.skipNull, s = E(i.maxBarThickness, 1 / 0);
    let a, c;
    const l = this._getAxisCount();
    if (t.grouped) {
      const d = n ? this._getStackCount(e) : t.stackCount, h = i.barThickness === "flex" ? n5(e, t, i, d * l) : o5(e, t, i, d * l), p = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, g = this._getAxis().indexOf(E(p, this.getFirstScaleIdForIndexAxis())), b = this._getStackIndex(this.index, this._cachedMeta.stack, n ? e : void 0) + g;
      a = h.start + h.chunk * b + h.chunk / 2, c = Math.min(s, h.chunk * h.ratio);
    } else
      a = o.getPixelForValue(this.getParsed(e)[o.axis], e), c = Math.min(s, t.min * t.ratio);
    return {
      base: a - c / 2,
      head: a + c / 2,
      center: a,
      size: c
    };
  }
  draw() {
    const e = this._cachedMeta, t = e.vScale, o = e.data, i = o.length;
    let n = 0;
    for (; n < i; ++n)
      this.getParsed(n)[t.axis] !== null && !o[n].hidden && o[n].draw(this._ctx);
  }
};
ci.id = "bar", ci.defaults = {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "base",
        "width",
        "height"
      ]
    }
  }
}, ci.overrides = {
  scales: {
    _index_: {
      type: "category",
      offset: !0,
      grid: {
        offset: !0
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: !0
    }
  }
};
let qn = ci;
const li = class li extends Qe {
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
  }
  parsePrimitiveData(e, t, o, i) {
    const n = super.parsePrimitiveData(e, t, o, i);
    for (let s = 0; s < n.length; s++)
      n[s]._custom = this.resolveDataElementOptions(s + o).radius;
    return n;
  }
  parseArrayData(e, t, o, i) {
    const n = super.parseArrayData(e, t, o, i);
    for (let s = 0; s < n.length; s++) {
      const a = t[o + s];
      n[s]._custom = E(a[2], this.resolveDataElementOptions(s + o).radius);
    }
    return n;
  }
  parseObjectData(e, t, o, i) {
    const n = super.parseObjectData(e, t, o, i);
    for (let s = 0; s < n.length; s++) {
      const a = t[o + s];
      n[s]._custom = E(a && a.r && +a.r, this.resolveDataElementOptions(s + o).radius);
    }
    return n;
  }
  getMaxOverflow() {
    const e = this._cachedMeta.data;
    let t = 0;
    for (let o = e.length - 1; o >= 0; --o)
      t = Math.max(t, e[o].size(this.resolveDataElementOptions(o)) / 2);
    return t > 0 && t;
  }
  getLabelAndValue(e) {
    const t = this._cachedMeta, o = this.chart.data.labels || [], { xScale: i, yScale: n } = t, s = this.getParsed(e), a = i.getLabelForValue(s.x), c = n.getLabelForValue(s.y), l = s._custom;
    return {
      label: o[e] || "",
      value: "(" + a + ", " + c + (l ? ", " + l : "") + ")"
    };
  }
  update(e) {
    const t = this._cachedMeta.data;
    this.updateElements(t, 0, t.length, e);
  }
  updateElements(e, t, o, i) {
    const n = i === "reset", { iScale: s, vScale: a } = this._cachedMeta, { sharedOptions: c, includeOptions: l } = this._getSharedOptions(t, i), d = s.axis, h = a.axis;
    for (let p = t; p < t + o; p++) {
      const g = e[p], b = !n && this.getParsed(p), m = {}, v = m[d] = n ? s.getPixelForDecimal(0.5) : s.getPixelForValue(b[d]), y = m[h] = n ? a.getBasePixel() : a.getPixelForValue(b[h]);
      m.skip = isNaN(v) || isNaN(y), l && (m.options = c || this.resolveDataElementOptions(p, g.active ? "active" : i), n && (m.options.radius = 0)), this.updateElement(g, p, m, i);
    }
  }
  resolveDataElementOptions(e, t) {
    const o = this.getParsed(e);
    let i = super.resolveDataElementOptions(e, t);
    i.$shared && (i = Object.assign({}, i, {
      $shared: !1
    }));
    const n = i.radius;
    return t !== "active" && (i.radius = 0), i.radius += E(o && o._custom, n), i;
  }
};
li.id = "bubble", li.defaults = {
  datasetElementType: !1,
  dataElementType: "point",
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "borderWidth",
        "radius"
      ]
    }
  }
}, li.overrides = {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
};
let Un = li;
function u5(r, e, t) {
  let o = 1, i = 1, n = 0, s = 0;
  if (e < W) {
    const a = r, c = a + e, l = Math.cos(a), d = Math.sin(a), h = Math.cos(c), p = Math.sin(c), g = (w, _, x) => Li(w, a, c, !0) ? 1 : Math.max(_, _ * t, x, x * t), b = (w, _, x) => Li(w, a, c, !0) ? -1 : Math.min(_, _ * t, x, x * t), m = g(0, l, h), v = g(re, d, p), y = b(V, l, h), C = b(V + re, d, p);
    o = (m - y) / 2, i = (v - C) / 2, n = -(m + y) / 2, s = -(v + C) / 2;
  }
  return {
    ratioX: o,
    ratioY: i,
    offsetX: n,
    offsetY: s
  };
}
const yr = class yr extends Qe {
  constructor(e, t) {
    super(e, t), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(e, t) {
    const o = this.getDataset().data, i = this._cachedMeta;
    if (this._parsing === !1)
      i._parsed = o;
    else {
      let n = (c) => +o[c];
      if (I(o[e])) {
        const { key: c = "value" } = this._parsing;
        n = (l) => +wt(o[l], c);
      }
      let s, a;
      for (s = e, a = e + t; s < a; ++s)
        i._parsed[s] = n(s);
    }
  }
  _getRotation() {
    return Ze(this.options.rotation - 90);
  }
  _getCircumference() {
    return Ze(this.options.circumference);
  }
  _getRotationExtents() {
    let e = W, t = -W;
    for (let o = 0; o < this.chart.data.datasets.length; ++o)
      if (this.chart.isDatasetVisible(o) && this.chart.getDatasetMeta(o).type === this._type) {
        const i = this.chart.getDatasetMeta(o).controller, n = i._getRotation(), s = i._getCircumference();
        e = Math.min(e, n), t = Math.max(t, n + s);
      }
    return {
      rotation: e,
      circumference: t - e
    };
  }
  update(e) {
    const t = this.chart, { chartArea: o } = t, i = this._cachedMeta, n = i.data, s = this.getMaxBorderWidth() + this.getMaxOffset(n) + this.options.spacing, a = Math.max((Math.min(o.width, o.height) - s) / 2, 0), c = Math.min(k2(this.options.cutout, a), 1), l = this._getRingWeight(this.index), { circumference: d, rotation: h } = this._getRotationExtents(), { ratioX: p, ratioY: g, offsetX: b, offsetY: m } = u5(h, d, c), v = (o.width - s) / p, y = (o.height - s) / g, C = Math.max(Math.min(v, y) / 2, 0), w = j1(this.options.radius, C), _ = Math.max(w * c, 0), x = (w - _) / this._getVisibleDatasetWeightTotal();
    this.offsetX = b * w, this.offsetY = m * w, i.total = this.calculateTotal(), this.outerRadius = w - x * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - x * l, 0), this.updateElements(n, 0, n.length, e);
  }
  _circumference(e, t) {
    const o = this.options, i = this._cachedMeta, n = this._getCircumference();
    return t && o.animation.animateRotate || !this.chart.getDataVisibility(e) || i._parsed[e] === null || i.data[e].hidden ? 0 : this.calculateCircumference(i._parsed[e] * n / W);
  }
  updateElements(e, t, o, i) {
    const n = i === "reset", s = this.chart, a = s.chartArea, l = s.options.animation, d = (a.left + a.right) / 2, h = (a.top + a.bottom) / 2, p = n && l.animateScale, g = p ? 0 : this.innerRadius, b = p ? 0 : this.outerRadius, { sharedOptions: m, includeOptions: v } = this._getSharedOptions(t, i);
    let y = this._getRotation(), C;
    for (C = 0; C < t; ++C)
      y += this._circumference(C, n);
    for (C = t; C < t + o; ++C) {
      const w = this._circumference(C, n), _ = e[C], x = {
        x: d + this.offsetX,
        y: h + this.offsetY,
        startAngle: y,
        endAngle: y + w,
        circumference: w,
        outerRadius: b,
        innerRadius: g
      };
      v && (x.options = m || this.resolveDataElementOptions(C, _.active ? "active" : i)), y += w, this.updateElement(_, C, x, i);
    }
  }
  calculateTotal() {
    const e = this._cachedMeta, t = e.data;
    let o = 0, i;
    for (i = 0; i < t.length; i++) {
      const n = e._parsed[i];
      n !== null && !isNaN(n) && this.chart.getDataVisibility(i) && !t[i].hidden && (o += Math.abs(n));
    }
    return o;
  }
  calculateCircumference(e) {
    const t = this._cachedMeta.total;
    return t > 0 && !isNaN(e) ? W * (Math.abs(e) / t) : 0;
  }
  getLabelAndValue(e) {
    const t = this._cachedMeta, o = this.chart, i = o.data.labels || [], n = Yi(t._parsed[e], o.options.locale);
    return {
      label: i[e] || "",
      value: n
    };
  }
  getMaxBorderWidth(e) {
    let t = 0;
    const o = this.chart;
    let i, n, s, a, c;
    if (!e) {
      for (i = 0, n = o.data.datasets.length; i < n; ++i)
        if (o.isDatasetVisible(i)) {
          s = o.getDatasetMeta(i), e = s.data, a = s.controller;
          break;
        }
    }
    if (!e)
      return 0;
    for (i = 0, n = e.length; i < n; ++i)
      c = a.resolveDataElementOptions(i), c.borderAlign !== "inner" && (t = Math.max(t, c.borderWidth || 0, c.hoverBorderWidth || 0));
    return t;
  }
  getMaxOffset(e) {
    let t = 0;
    for (let o = 0, i = e.length; o < i; ++o) {
      const n = this.resolveDataElementOptions(o);
      t = Math.max(t, n.offset || 0, n.hoverOffset || 0);
    }
    return t;
  }
  _getRingWeightOffset(e) {
    let t = 0;
    for (let o = 0; o < e; ++o)
      this.chart.isDatasetVisible(o) && (t += this._getRingWeight(o));
    return t;
  }
  _getRingWeight(e) {
    return Math.max(E(this.chart.data.datasets[e].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
};
yr.id = "doughnut", yr.defaults = {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !1
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "circumference",
        "endAngle",
        "innerRadius",
        "outerRadius",
        "startAngle",
        "x",
        "y",
        "offset",
        "borderWidth",
        "spacing"
      ]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
}, yr.descriptors = {
  _scriptable: (e) => e !== "spacing",
  _indexable: (e) => e !== "spacing" && !e.startsWith("borderDash") && !e.startsWith("hoverBorderDash")
}, yr.overrides = {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const t = e.data, { labels: { pointStyle: o, textAlign: i, color: n, useBorderRadius: s, borderRadius: a } } = e.legend.options;
          return t.labels.length && t.datasets.length ? t.labels.map((c, l) => {
            const h = e.getDatasetMeta(0).controller.getStyle(l);
            return {
              text: c,
              fillStyle: h.backgroundColor,
              fontColor: n,
              hidden: !e.getDataVisibility(l),
              lineDash: h.borderDash,
              lineDashOffset: h.borderDashOffset,
              lineJoin: h.borderJoinStyle,
              lineWidth: h.borderWidth,
              strokeStyle: h.borderColor,
              textAlign: i,
              pointStyle: o,
              borderRadius: s && (a || h.borderRadius),
              index: l
            };
          }) : [];
        }
      },
      onClick(e, t, o) {
        o.chart.toggleDataVisibility(t.index), o.chart.update();
      }
    }
  }
};
let Ai = yr;
const di = class di extends Qe {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(e) {
    const t = this._cachedMeta, { dataset: o, data: i = [], _dataset: n } = t, s = this.chart._animationsDisabled;
    let { start: a, count: c } = J1(t, i, s);
    this._drawStart = a, this._drawCount = c, Q1(t) && (a = 0, c = i.length), o._chart = this.chart, o._datasetIndex = this.index, o._decimated = !!n._decimated, o.points = i;
    const l = this.resolveDatasetElementOptions(e);
    this.options.showLine || (l.borderWidth = 0), l.segment = this.options.segment, this.updateElement(o, void 0, {
      animated: !s,
      options: l
    }, e), this.updateElements(i, a, c, e);
  }
  updateElements(e, t, o, i) {
    const n = i === "reset", { iScale: s, vScale: a, _stacked: c, _dataset: l } = this._cachedMeta, { sharedOptions: d, includeOptions: h } = this._getSharedOptions(t, i), p = s.axis, g = a.axis, { spanGaps: b, segment: m } = this.options, v = Sr(b) ? b : Number.POSITIVE_INFINITY, y = this.chart._animationsDisabled || n || i === "none", C = t + o, w = e.length;
    let _ = t > 0 && this.getParsed(t - 1);
    for (let x = 0; x < w; ++x) {
      const L = e[x], S = y ? L : {};
      if (x < t || x >= C) {
        S.skip = !0;
        continue;
      }
      const A = this.getParsed(x), P = H(A[g]), D = S[p] = s.getPixelForValue(A[p], x), O = S[g] = n || P ? a.getBasePixel() : a.getPixelForValue(c ? this.applyStack(a, A, c) : A[g], x);
      S.skip = isNaN(D) || isNaN(O) || P, S.stop = x > 0 && Math.abs(A[p] - _[p]) > v, m && (S.parsed = A, S.raw = l.data[x]), h && (S.options = d || this.resolveDataElementOptions(x, L.active ? "active" : i)), y || this.updateElement(L, x, S, i), _ = A;
    }
  }
  getMaxOverflow() {
    const e = this._cachedMeta, t = e.dataset, o = t.options && t.options.borderWidth || 0, i = e.data || [];
    if (!i.length)
      return o;
    const n = i[0].size(this.resolveDataElementOptions(0)), s = i[i.length - 1].size(this.resolveDataElementOptions(i.length - 1));
    return Math.max(o, n, s) / 2;
  }
  draw() {
    const e = this._cachedMeta;
    e.dataset.updateControlPoints(this.chart.chartArea, e.iScale.axis), super.draw();
  }
};
di.id = "line", di.defaults = {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}, di.overrides = {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
};
let Yn = di;
const hi = class hi extends Qe {
  constructor(e, t) {
    super(e, t), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(e) {
    const t = this._cachedMeta, o = this.chart, i = o.data.labels || [], n = Yi(t._parsed[e].r, o.options.locale);
    return {
      label: i[e] || "",
      value: n
    };
  }
  parseObjectData(e, t, o, i) {
    return ad.bind(this)(e, t, o, i);
  }
  update(e) {
    const t = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(t, 0, t.length, e);
  }
  getMinMax() {
    const e = this._cachedMeta, t = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    return e.data.forEach((o, i) => {
      const n = this.getParsed(i).r;
      !isNaN(n) && this.chart.getDataVisibility(i) && (n < t.min && (t.min = n), n > t.max && (t.max = n));
    }), t;
  }
  _updateRadius() {
    const e = this.chart, t = e.chartArea, o = e.options, i = Math.min(t.right - t.left, t.bottom - t.top), n = Math.max(i / 2, 0), s = Math.max(o.cutoutPercentage ? n / 100 * o.cutoutPercentage : 1, 0), a = (n - s) / e.getVisibleDatasetCount();
    this.outerRadius = n - a * this.index, this.innerRadius = this.outerRadius - a;
  }
  updateElements(e, t, o, i) {
    const n = i === "reset", s = this.chart, c = s.options.animation, l = this._cachedMeta.rScale, d = l.xCenter, h = l.yCenter, p = l.getIndexAngle(0) - 0.5 * V;
    let g = p, b;
    const m = 360 / this.countVisibleElements();
    for (b = 0; b < t; ++b)
      g += this._computeAngle(b, i, m);
    for (b = t; b < t + o; b++) {
      const v = e[b];
      let y = g, C = g + this._computeAngle(b, i, m), w = s.getDataVisibility(b) ? l.getDistanceFromCenterForValue(this.getParsed(b).r) : 0;
      g = C, n && (c.animateScale && (w = 0), c.animateRotate && (y = C = p));
      const _ = {
        x: d,
        y: h,
        innerRadius: 0,
        outerRadius: w,
        startAngle: y,
        endAngle: C,
        options: this.resolveDataElementOptions(b, v.active ? "active" : i)
      };
      this.updateElement(v, b, _, i);
    }
  }
  countVisibleElements() {
    const e = this._cachedMeta;
    let t = 0;
    return e.data.forEach((o, i) => {
      !isNaN(this.getParsed(i).r) && this.chart.getDataVisibility(i) && t++;
    }), t;
  }
  _computeAngle(e, t, o) {
    return this.chart.getDataVisibility(e) ? Ze(this.resolveDataElementOptions(e, t).angle || o) : 0;
  }
};
hi.id = "polarArea", hi.defaults = {
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !0
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "startAngle",
        "endAngle",
        "innerRadius",
        "outerRadius"
      ]
    }
  },
  indexAxis: "r",
  startAngle: 0
}, hi.overrides = {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(e) {
          const t = e.data;
          if (t.labels.length && t.datasets.length) {
            const { labels: { pointStyle: o, color: i } } = e.legend.options;
            return t.labels.map((n, s) => {
              const c = e.getDatasetMeta(0).controller.getStyle(s);
              return {
                text: n,
                fillStyle: c.backgroundColor,
                strokeStyle: c.borderColor,
                fontColor: i,
                lineWidth: c.borderWidth,
                pointStyle: o,
                hidden: !e.getDataVisibility(s),
                index: s
              };
            });
          }
          return [];
        }
      },
      onClick(e, t, o) {
        o.chart.toggleDataVisibility(t.index), o.chart.update();
      }
    }
  },
  scales: {
    r: {
      type: "radialLinear",
      angleLines: {
        display: !1
      },
      beginAtZero: !0,
      grid: {
        circular: !0
      },
      pointLabels: {
        display: !1
      },
      startAngle: 0
    }
  }
};
let Eo = hi;
const qo = class qo extends Ai {
};
qo.id = "pie", qo.defaults = {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
};
let Xn = qo;
const ui = class ui extends Qe {
  getLabelAndValue(e) {
    const t = this._cachedMeta.vScale, o = this.getParsed(e);
    return {
      label: t.getLabels()[e],
      value: "" + t.getLabelForValue(o[t.axis])
    };
  }
  parseObjectData(e, t, o, i) {
    return ad.bind(this)(e, t, o, i);
  }
  update(e) {
    const t = this._cachedMeta, o = t.dataset, i = t.data || [], n = t.iScale.getLabels();
    if (o.points = i, e !== "resize") {
      const s = this.resolveDatasetElementOptions(e);
      this.options.showLine || (s.borderWidth = 0);
      const a = {
        _loop: !0,
        _fullLoop: n.length === i.length,
        options: s
      };
      this.updateElement(o, void 0, a, e);
    }
    this.updateElements(i, 0, i.length, e);
  }
  updateElements(e, t, o, i) {
    const n = this._cachedMeta.rScale, s = i === "reset";
    for (let a = t; a < t + o; a++) {
      const c = e[a], l = this.resolveDataElementOptions(a, c.active ? "active" : i), d = n.getPointPositionForValue(a, this.getParsed(a).r), h = s ? n.xCenter : d.x, p = s ? n.yCenter : d.y, g = {
        x: h,
        y: p,
        angle: d.angle,
        skip: isNaN(h) || isNaN(p),
        options: l
      };
      this.updateElement(c, a, g, i);
    }
  }
};
ui.id = "radar", ui.defaults = {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: !0,
  elements: {
    line: {
      fill: "start"
    }
  }
}, ui.overrides = {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
};
let Kn = ui;
const pi = class pi extends Qe {
  getLabelAndValue(e) {
    const t = this._cachedMeta, o = this.chart.data.labels || [], { xScale: i, yScale: n } = t, s = this.getParsed(e), a = i.getLabelForValue(s.x), c = n.getLabelForValue(s.y);
    return {
      label: o[e] || "",
      value: "(" + a + ", " + c + ")"
    };
  }
  update(e) {
    const t = this._cachedMeta, { data: o = [] } = t, i = this.chart._animationsDisabled;
    let { start: n, count: s } = J1(t, o, i);
    if (this._drawStart = n, this._drawCount = s, Q1(t) && (n = 0, s = o.length), this.options.showLine) {
      this.datasetElementType || this.addElements();
      const { dataset: a, _dataset: c } = t;
      a._chart = this.chart, a._datasetIndex = this.index, a._decimated = !!c._decimated, a.points = o;
      const l = this.resolveDatasetElementOptions(e);
      l.segment = this.options.segment, this.updateElement(a, void 0, {
        animated: !i,
        options: l
      }, e);
    } else this.datasetElementType && (delete t.dataset, this.datasetElementType = !1);
    this.updateElements(o, n, s, e);
  }
  addElements() {
    const { showLine: e } = this.options;
    !this.datasetElementType && e && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
  }
  updateElements(e, t, o, i) {
    const n = i === "reset", { iScale: s, vScale: a, _stacked: c, _dataset: l } = this._cachedMeta, d = this.resolveDataElementOptions(t, i), h = this.getSharedOptions(d), p = this.includeOptions(i, h), g = s.axis, b = a.axis, { spanGaps: m, segment: v } = this.options, y = Sr(m) ? m : Number.POSITIVE_INFINITY, C = this.chart._animationsDisabled || n || i === "none";
    let w = t > 0 && this.getParsed(t - 1);
    for (let _ = t; _ < t + o; ++_) {
      const x = e[_], L = this.getParsed(_), S = C ? x : {}, A = H(L[b]), P = S[g] = s.getPixelForValue(L[g], _), D = S[b] = n || A ? a.getBasePixel() : a.getPixelForValue(c ? this.applyStack(a, L, c) : L[b], _);
      S.skip = isNaN(P) || isNaN(D) || A, S.stop = _ > 0 && Math.abs(L[g] - w[g]) > y, v && (S.parsed = L, S.raw = l.data[_]), p && (S.options = h || this.resolveDataElementOptions(_, x.active ? "active" : i)), C || this.updateElement(x, _, S, i), w = L;
    }
    this.updateSharedOptions(h, i, d);
  }
  getMaxOverflow() {
    const e = this._cachedMeta, t = e.data || [];
    if (!this.options.showLine) {
      let a = 0;
      for (let c = t.length - 1; c >= 0; --c)
        a = Math.max(a, t[c].size(this.resolveDataElementOptions(c)) / 2);
      return a > 0 && a;
    }
    const o = e.dataset, i = o.options && o.options.borderWidth || 0;
    if (!t.length)
      return i;
    const n = t[0].size(this.resolveDataElementOptions(0)), s = t[t.length - 1].size(this.resolveDataElementOptions(t.length - 1));
    return Math.max(i, n, s) / 2;
  }
};
pi.id = "scatter", pi.defaults = {
  datasetElementType: !1,
  dataElementType: "point",
  showLine: !1,
  fill: !1
}, pi.overrides = {
  interaction: {
    mode: "point"
  },
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
};
let Gn = pi;
var p5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController: qn,
  BubbleController: Un,
  DoughnutController: Ai,
  LineController: Yn,
  PieController: Xn,
  PolarAreaController: Eo,
  RadarController: Kn,
  ScatterController: Gn
});
function jt() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class js {
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(e) {
    Object.assign(js.prototype, e);
  }
  constructor(e) {
    this.options = e || {};
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return jt();
  }
  parse() {
    return jt();
  }
  format() {
    return jt();
  }
  add() {
    return jt();
  }
  diff() {
    return jt();
  }
  startOf() {
    return jt();
  }
  endOf() {
    return jt();
  }
}
var f5 = {
  _date: js
};
function g5(r, e, t, o) {
  const { controller: i, data: n, _sorted: s } = r, a = i._cachedMeta.iScale, c = r.dataset && r.dataset.options ? r.dataset.options.spanGaps : null;
  if (a && e === a.axis && e !== "r" && s && n.length) {
    const l = a._reversePixels ? B2 : ut;
    if (o) {
      if (i._sharedOptions) {
        const d = n[0], h = typeof d.getRange == "function" && d.getRange(e);
        if (h) {
          const p = l(n, e, t - h), g = l(n, e, t + h);
          return {
            lo: p.lo,
            hi: g.hi
          };
        }
      }
    } else {
      const d = l(n, e, t);
      if (c) {
        const { vScale: h } = i._cachedMeta, { _parsed: p } = r, g = p.slice(0, d.lo + 1).reverse().findIndex((m) => !H(m[h.axis]));
        d.lo -= Math.max(0, g);
        const b = p.slice(d.hi).findIndex((m) => !H(m[h.axis]));
        d.hi += Math.max(0, b);
      }
      return d;
    }
  }
  return {
    lo: 0,
    hi: n.length - 1
  };
}
function un(r, e, t, o, i) {
  const n = r.getSortedVisibleDatasetMetas(), s = t[e];
  for (let a = 0, c = n.length; a < c; ++a) {
    const { index: l, data: d } = n[a], { lo: h, hi: p } = g5(n[a], e, s, i);
    for (let g = h; g <= p; ++g) {
      const b = d[g];
      b.skip || o(b, l, g);
    }
  }
}
function b5(r) {
  const e = r.indexOf("x") !== -1, t = r.indexOf("y") !== -1;
  return function(o, i) {
    const n = e ? Math.abs(o.x - i.x) : 0, s = t ? Math.abs(o.y - i.y) : 0;
    return Math.sqrt(Math.pow(n, 2) + Math.pow(s, 2));
  };
}
function Tn(r, e, t, o, i) {
  const n = [];
  return !i && !r.isPointInArea(e) || un(r, t, e, function(a, c, l) {
    !i && !pt(a, r.chartArea, 0) || a.inRange(e.x, e.y, o) && n.push({
      element: a,
      datasetIndex: c,
      index: l
    });
  }, !0), n;
}
function m5(r, e, t, o) {
  let i = [];
  function n(s, a, c) {
    const { startAngle: l, endAngle: d } = s.getProps([
      "startAngle",
      "endAngle"
    ], o), { angle: h } = U1(s, {
      x: e.x,
      y: e.y
    });
    Li(h, l, d) && i.push({
      element: s,
      datasetIndex: a,
      index: c
    });
  }
  return un(r, t, e, n), i;
}
function v5(r, e, t, o, i, n) {
  let s = [];
  const a = b5(t);
  let c = Number.POSITIVE_INFINITY;
  function l(d, h, p) {
    const g = d.inRange(e.x, e.y, i);
    if (o && !g)
      return;
    const b = d.getCenterPoint(i);
    if (!(!!n || r.isPointInArea(b)) && !g)
      return;
    const v = a(e, b);
    v < c ? (s = [
      {
        element: d,
        datasetIndex: h,
        index: p
      }
    ], c = v) : v === c && s.push({
      element: d,
      datasetIndex: h,
      index: p
    });
  }
  return un(r, t, e, l), s;
}
function Pn(r, e, t, o, i, n) {
  return !n && !r.isPointInArea(e) ? [] : t === "r" && !o ? m5(r, e, t, i) : v5(r, e, t, o, i, n);
}
function Tl(r, e, t, o, i) {
  const n = [], s = t === "x" ? "inXRange" : "inYRange";
  let a = !1;
  return un(r, t, e, (c, l, d) => {
    c[s] && c[s](e[t], i) && (n.push({
      element: c,
      datasetIndex: l,
      index: d
    }), a = a || c.inRange(e.x, e.y, i));
  }), o && !a ? [] : n;
}
var y5 = {
  modes: {
    index(r, e, t, o) {
      const i = qt(e, r), n = t.axis || "x", s = t.includeInvisible || !1, a = t.intersect ? Tn(r, i, n, o, s) : Pn(r, i, n, !1, o, s), c = [];
      return a.length ? (r.getSortedVisibleDatasetMetas().forEach((l) => {
        const d = a[0].index, h = l.data[d];
        h && !h.skip && c.push({
          element: h,
          datasetIndex: l.index,
          index: d
        });
      }), c) : [];
    },
    dataset(r, e, t, o) {
      const i = qt(e, r), n = t.axis || "xy", s = t.includeInvisible || !1;
      let a = t.intersect ? Tn(r, i, n, o, s) : Pn(r, i, n, !1, o, s);
      if (a.length > 0) {
        const c = a[0].datasetIndex, l = r.getDatasetMeta(c).data;
        a = [];
        for (let d = 0; d < l.length; ++d)
          a.push({
            element: l[d],
            datasetIndex: c,
            index: d
          });
      }
      return a;
    },
    point(r, e, t, o) {
      const i = qt(e, r), n = t.axis || "xy", s = t.includeInvisible || !1;
      return Tn(r, i, n, o, s);
    },
    nearest(r, e, t, o) {
      const i = qt(e, r), n = t.axis || "xy", s = t.includeInvisible || !1;
      return Pn(r, i, n, t.intersect, o, s);
    },
    x(r, e, t, o) {
      const i = qt(e, r);
      return Tl(r, i, "x", t.intersect, o);
    },
    y(r, e, t, o) {
      const i = qt(e, r);
      return Tl(r, i, "y", t.intersect, o);
    }
  }
};
const vd = [
  "left",
  "top",
  "right",
  "bottom"
];
function Ur(r, e) {
  return r.filter((t) => t.pos === e);
}
function Pl(r, e) {
  return r.filter((t) => vd.indexOf(t.pos) === -1 && t.box.axis === e);
}
function Yr(r, e) {
  return r.sort((t, o) => {
    const i = e ? o : t, n = e ? t : o;
    return i.weight === n.weight ? i.index - n.index : i.weight - n.weight;
  });
}
function C5(r) {
  const e = [];
  let t, o, i, n, s, a;
  for (t = 0, o = (r || []).length; t < o; ++t)
    i = r[t], { position: n, options: { stack: s, stackWeight: a = 1 } } = i, e.push({
      index: t,
      box: i,
      pos: n,
      horizontal: i.isHorizontal(),
      weight: i.weight,
      stack: s && n + s,
      stackWeight: a
    });
  return e;
}
function x5(r) {
  const e = {};
  for (const t of r) {
    const { stack: o, pos: i, stackWeight: n } = t;
    if (!o || !vd.includes(i))
      continue;
    const s = e[o] || (e[o] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    s.count++, s.weight += n;
  }
  return e;
}
function _5(r, e) {
  const t = x5(r), { vBoxMaxWidth: o, hBoxMaxHeight: i } = e;
  let n, s, a;
  for (n = 0, s = r.length; n < s; ++n) {
    a = r[n];
    const { fullSize: c } = a.box, l = t[a.stack], d = l && a.stackWeight / l.weight;
    a.horizontal ? (a.width = d ? d * o : c && e.availableWidth, a.height = i) : (a.width = o, a.height = d ? d * i : c && e.availableHeight);
  }
  return t;
}
function w5(r) {
  const e = C5(r), t = Yr(e.filter((l) => l.box.fullSize), !0), o = Yr(Ur(e, "left"), !0), i = Yr(Ur(e, "right")), n = Yr(Ur(e, "top"), !0), s = Yr(Ur(e, "bottom")), a = Pl(e, "x"), c = Pl(e, "y");
  return {
    fullSize: t,
    leftAndTop: o.concat(n),
    rightAndBottom: i.concat(c).concat(s).concat(a),
    chartArea: Ur(e, "chartArea"),
    vertical: o.concat(i).concat(c),
    horizontal: n.concat(s).concat(a)
  };
}
function El(r, e, t, o) {
  return Math.max(r[t], e[t]) + Math.max(r[o], e[o]);
}
function yd(r, e) {
  r.top = Math.max(r.top, e.top), r.left = Math.max(r.left, e.left), r.bottom = Math.max(r.bottom, e.bottom), r.right = Math.max(r.right, e.right);
}
function k5(r, e, t, o) {
  const { pos: i, box: n } = t, s = r.maxPadding;
  if (!I(i)) {
    t.size && (r[i] -= t.size);
    const h = o[t.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, t.horizontal ? n.height : n.width), t.size = h.size / h.count, r[i] += t.size;
  }
  n.getPadding && yd(s, n.getPadding());
  const a = Math.max(0, e.outerWidth - El(s, r, "left", "right")), c = Math.max(0, e.outerHeight - El(s, r, "top", "bottom")), l = a !== r.w, d = c !== r.h;
  return r.w = a, r.h = c, t.horizontal ? {
    same: l,
    other: d
  } : {
    same: d,
    other: l
  };
}
function $5(r) {
  const e = r.maxPadding;
  function t(o) {
    const i = Math.max(e[o] - r[o], 0);
    return r[o] += i, i;
  }
  r.y += t("top"), r.x += t("left"), t("right"), t("bottom");
}
function M5(r, e) {
  const t = e.maxPadding;
  function o(i) {
    const n = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return i.forEach((s) => {
      n[s] = Math.max(e[s], t[s]);
    }), n;
  }
  return o(r ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function Qr(r, e, t, o) {
  const i = [];
  let n, s, a, c, l, d;
  for (n = 0, s = r.length, l = 0; n < s; ++n) {
    a = r[n], c = a.box, c.update(a.width || e.w, a.height || e.h, M5(a.horizontal, e));
    const { same: h, other: p } = k5(e, t, a, o);
    l |= h && i.length, d = d || p, c.fullSize || i.push(a);
  }
  return l && Qr(i, e, t, o) || d;
}
function uo(r, e, t, o, i) {
  r.top = t, r.left = e, r.right = e + o, r.bottom = t + i, r.width = o, r.height = i;
}
function Dl(r, e, t, o) {
  const i = t.padding;
  let { x: n, y: s } = e;
  for (const a of r) {
    const c = a.box, l = o[a.stack] || {
      placed: 0,
      weight: 1
    }, d = a.stackWeight / l.weight || 1;
    if (a.horizontal) {
      const h = e.w * d, p = l.size || c.height;
      Mi(l.start) && (s = l.start), c.fullSize ? uo(c, i.left, s, t.outerWidth - i.right - i.left, p) : uo(c, e.left + l.placed, s, h, p), l.start = s, l.placed += h, s = c.bottom;
    } else {
      const h = e.h * d, p = l.size || c.width;
      Mi(l.start) && (n = l.start), c.fullSize ? uo(c, n, i.top, p, t.outerHeight - i.bottom - i.top) : uo(c, n, e.top + l.placed, p, h), l.start = n, l.placed += h, n = c.right;
    }
  }
  e.x = n, e.y = s;
}
var me = {
  addBox(r, e) {
    r.boxes || (r.boxes = []), e.fullSize = e.fullSize || !1, e.position = e.position || "top", e.weight = e.weight || 0, e._layers = e._layers || function() {
      return [
        {
          z: 0,
          draw(t) {
            e.draw(t);
          }
        }
      ];
    }, r.boxes.push(e);
  },
  removeBox(r, e) {
    const t = r.boxes ? r.boxes.indexOf(e) : -1;
    t !== -1 && r.boxes.splice(t, 1);
  },
  configure(r, e, t) {
    e.fullSize = t.fullSize, e.position = t.position, e.weight = t.weight;
  },
  update(r, e, t, o) {
    if (!r)
      return;
    const i = ye(r.options.layout.padding), n = Math.max(e - i.width, 0), s = Math.max(t - i.height, 0), a = w5(r.boxes), c = a.vertical, l = a.horizontal;
    N(r.boxes, (m) => {
      typeof m.beforeLayout == "function" && m.beforeLayout();
    });
    const d = c.reduce((m, v) => v.box.options && v.box.options.display === !1 ? m : m + 1, 0) || 1, h = Object.freeze({
      outerWidth: e,
      outerHeight: t,
      padding: i,
      availableWidth: n,
      availableHeight: s,
      vBoxMaxWidth: n / 2 / d,
      hBoxMaxHeight: s / 2
    }), p = Object.assign({}, i);
    yd(p, ye(o));
    const g = Object.assign({
      maxPadding: p,
      w: n,
      h: s,
      x: i.left,
      y: i.top
    }, i), b = _5(c.concat(l), h);
    Qr(a.fullSize, g, h, b), Qr(c, g, h, b), Qr(l, g, h, b) && Qr(c, g, h, b), $5(g), Dl(a.leftAndTop, g, h, b), g.x += g.w, g.y += g.h, Dl(a.rightAndBottom, g, h, b), r.chartArea = {
      left: g.left,
      top: g.top,
      right: g.left + g.w,
      bottom: g.top + g.h,
      height: g.h,
      width: g.w
    }, N(a.chartArea, (m) => {
      const v = m.box;
      Object.assign(v, r.chartArea), v.update(g.w, g.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Cd {
  acquireContext(e, t) {
  }
  releaseContext(e) {
    return !1;
  }
  addEventListener(e, t, o) {
  }
  removeEventListener(e, t, o) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(e, t, o, i) {
    return t = Math.max(0, t || e.width), o = o || e.height, {
      width: t,
      height: Math.max(0, i ? Math.floor(t / i) : o)
    };
  }
  isAttached(e) {
    return !0;
  }
  updateConfig(e) {
  }
}
class L5 extends Cd {
  acquireContext(e) {
    return e && e.getContext && e.getContext("2d") || null;
  }
  updateConfig(e) {
    e.options.animation = !1;
  }
}
const Co = "$chartjs", S5 = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, Ol = (r) => r === null || r === "";
function A5(r, e) {
  const t = r.style, o = r.getAttribute("height"), i = r.getAttribute("width");
  if (r[Co] = {
    initial: {
      height: o,
      width: i,
      style: {
        display: t.display,
        height: t.height,
        width: t.width
      }
    }
  }, t.display = t.display || "block", t.boxSizing = t.boxSizing || "border-box", Ol(i)) {
    const n = ml(r, "width");
    n !== void 0 && (r.width = n);
  }
  if (Ol(o))
    if (r.style.height === "")
      r.height = r.width / (e || 2);
    else {
      const n = ml(r, "height");
      n !== void 0 && (r.height = n);
    }
  return r;
}
const xd = T0 ? {
  passive: !0
} : !1;
function T5(r, e, t) {
  r && r.addEventListener(e, t, xd);
}
function P5(r, e, t) {
  r && r.canvas && r.canvas.removeEventListener(e, t, xd);
}
function E5(r, e) {
  const t = S5[r.type] || r.type, { x: o, y: i } = qt(r, e);
  return {
    type: t,
    chart: e,
    native: r,
    x: o !== void 0 ? o : null,
    y: i !== void 0 ? i : null
  };
}
function Do(r, e) {
  for (const t of r)
    if (t === e || t.contains(e))
      return !0;
}
function D5(r, e, t) {
  const o = r.canvas, i = new MutationObserver((n) => {
    let s = !1;
    for (const a of n)
      s = s || Do(a.addedNodes, o), s = s && !Do(a.removedNodes, o);
    s && t();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
function O5(r, e, t) {
  const o = r.canvas, i = new MutationObserver((n) => {
    let s = !1;
    for (const a of n)
      s = s || Do(a.removedNodes, o), s = s && !Do(a.addedNodes, o);
    s && t();
  });
  return i.observe(document, {
    childList: !0,
    subtree: !0
  }), i;
}
const Ti = /* @__PURE__ */ new Map();
let Hl = 0;
function _d() {
  const r = window.devicePixelRatio;
  r !== Hl && (Hl = r, Ti.forEach((e, t) => {
    t.currentDevicePixelRatio !== r && e();
  }));
}
function H5(r, e) {
  Ti.size || window.addEventListener("resize", _d), Ti.set(r, e);
}
function I5(r) {
  Ti.delete(r), Ti.size || window.removeEventListener("resize", _d);
}
function B5(r, e, t) {
  const o = r.canvas, i = o && Zs(o);
  if (!i)
    return;
  const n = G1((a, c) => {
    const l = i.clientWidth;
    t(a, c), l < i.clientWidth && t();
  }, window), s = new ResizeObserver((a) => {
    const c = a[0], l = c.contentRect.width, d = c.contentRect.height;
    l === 0 && d === 0 || n(l, d);
  });
  return s.observe(i), H5(r, n), s;
}
function En(r, e, t) {
  t && t.disconnect(), e === "resize" && I5(r);
}
function V5(r, e, t) {
  const o = r.canvas, i = G1((n) => {
    r.ctx !== null && t(E5(n, r));
  }, r);
  return T5(o, e, i), i;
}
class N5 extends Cd {
  acquireContext(e, t) {
    const o = e && e.getContext && e.getContext("2d");
    return o && o.canvas === e ? (A5(e, t), o) : null;
  }
  releaseContext(e) {
    const t = e.canvas;
    if (!t[Co])
      return !1;
    const o = t[Co].initial;
    [
      "height",
      "width"
    ].forEach((n) => {
      const s = o[n];
      H(s) ? t.removeAttribute(n) : t.setAttribute(n, s);
    });
    const i = o.style || {};
    return Object.keys(i).forEach((n) => {
      t.style[n] = i[n];
    }), t.width = t.width, delete t[Co], !0;
  }
  addEventListener(e, t, o) {
    this.removeEventListener(e, t);
    const i = e.$proxies || (e.$proxies = {}), s = {
      attach: D5,
      detach: O5,
      resize: B5
    }[t] || V5;
    i[t] = s(e, t, o);
  }
  removeEventListener(e, t) {
    const o = e.$proxies || (e.$proxies = {}), i = o[t];
    if (!i)
      return;
    ({
      attach: En,
      detach: En,
      resize: En
    }[t] || P5)(e, t, i), o[t] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(e, t, o, i) {
    return A0(e, t, o, i);
  }
  isAttached(e) {
    const t = e && Zs(e);
    return !!(t && t.isConnected);
  }
}
function R5(r) {
  return !Fs() || typeof OffscreenCanvas < "u" && r instanceof OffscreenCanvas ? L5 : N5;
}
const Uo = class Uo {
  constructor() {
    this.active = !1;
  }
  tooltipPosition(e) {
    const { x: t, y: o } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: t,
      y: o
    };
  }
  hasValue() {
    return Sr(this.x) && Sr(this.y);
  }
  getProps(e, t) {
    const o = this.$animations;
    if (!t || !o)
      return this;
    const i = {};
    return e.forEach((n) => {
      i[n] = o[n] && o[n].active() ? o[n]._to : this[n];
    }), i;
  }
};
Uo.defaults = {}, Uo.defaultRoutes = void 0;
let je = Uo;
function z5(r, e) {
  const t = r.options.ticks, o = F5(r), i = Math.min(t.maxTicksLimit || o, o), n = t.major.enabled ? j5(e) : [], s = n.length, a = n[0], c = n[s - 1], l = [];
  if (s > i)
    return W5(e, l, n, s / i), l;
  const d = Z5(n, e, i);
  if (s > 0) {
    let h, p;
    const g = s > 1 ? Math.round((c - a) / (s - 1)) : null;
    for (po(e, l, d, H(g) ? 0 : a - g, a), h = 0, p = s - 1; h < p; h++)
      po(e, l, d, n[h], n[h + 1]);
    return po(e, l, d, c, H(g) ? e.length : c + g), l;
  }
  return po(e, l, d), l;
}
function F5(r) {
  const e = r.options.offset, t = r._tickSize(), o = r._length / t + (e ? 0 : 1), i = r._maxLength / t;
  return Math.floor(Math.min(o, i));
}
function Z5(r, e, t) {
  const o = q5(r), i = e.length / t;
  if (!o)
    return Math.max(i, 1);
  const n = E2(o);
  for (let s = 0, a = n.length - 1; s < a; s++) {
    const c = n[s];
    if (c > i)
      return c;
  }
  return Math.max(i, 1);
}
function j5(r) {
  const e = [];
  let t, o;
  for (t = 0, o = r.length; t < o; t++)
    r[t].major && e.push(t);
  return e;
}
function W5(r, e, t, o) {
  let i = 0, n = t[0], s;
  for (o = Math.ceil(o), s = 0; s < r.length; s++)
    s === n && (e.push(r[s]), i++, n = t[i * o]);
}
function po(r, e, t, o, i) {
  const n = E(o, 0), s = Math.min(E(i, r.length), r.length);
  let a = 0, c, l, d;
  for (t = Math.ceil(t), i && (c = i - o, t = c / Math.floor(c / t)), d = n; d < 0; )
    a++, d = Math.round(n + a * t);
  for (l = Math.max(n, 0); l < s; l++)
    l === d && (e.push(r[l]), a++, d = Math.round(n + a * t));
}
function q5(r) {
  const e = r.length;
  let t, o;
  if (e < 2)
    return !1;
  for (o = r[0], t = 1; t < e; ++t)
    if (r[t] - r[t - 1] !== o)
      return !1;
  return o;
}
const U5 = (r) => r === "left" ? "right" : r === "right" ? "left" : r, Il = (r, e, t) => e === "top" || e === "left" ? r[e] + t : r[e] - t, Bl = (r, e) => Math.min(e || r, r);
function Vl(r, e) {
  const t = [], o = r.length / e, i = r.length;
  let n = 0;
  for (; n < i; n += o)
    t.push(r[Math.floor(n)]);
  return t;
}
function Y5(r, e, t) {
  const o = r.ticks.length, i = Math.min(e, o - 1), n = r._startPixel, s = r._endPixel, a = 1e-6;
  let c = r.getPixelForTick(i), l;
  if (!(t && (o === 1 ? l = Math.max(c - n, s - c) : e === 0 ? l = (r.getPixelForTick(1) - c) / 2 : l = (c - r.getPixelForTick(i - 1)) / 2, c += i < e ? l : -l, c < n - a || c > s + a)))
    return c;
}
function X5(r, e) {
  N(r, (t) => {
    const o = t.gc, i = o.length / 2;
    let n;
    if (i > e) {
      for (n = 0; n < i; ++n)
        delete t.data[o[n]];
      o.splice(0, i);
    }
  });
}
function Xr(r) {
  return r.drawTicks ? r.tickLength : 0;
}
function Nl(r, e) {
  if (!r.display)
    return 0;
  const t = se(r.font, e), o = ye(r.padding);
  return (U(r.text) ? r.text.length : 1) * t.lineHeight + o.height;
}
function K5(r, e) {
  return Ht(r, {
    scale: e,
    type: "scale"
  });
}
function G5(r, e, t) {
  return Ht(r, {
    tick: t,
    index: e,
    type: "tick"
  });
}
function J5(r, e, t) {
  let o = Is(r);
  return (t && e !== "right" || !t && e === "right") && (o = U5(o)), o;
}
function Q5(r, e, t, o) {
  const { top: i, left: n, bottom: s, right: a, chart: c } = r, { chartArea: l, scales: d } = c;
  let h = 0, p, g, b;
  const m = s - i, v = a - n;
  if (r.isHorizontal()) {
    if (g = ge(o, n, a), I(t)) {
      const y = Object.keys(t)[0], C = t[y];
      b = d[y].getPixelForValue(C) + m - e;
    } else t === "center" ? b = (l.bottom + l.top) / 2 + m - e : b = Il(r, t, e);
    p = a - n;
  } else {
    if (I(t)) {
      const y = Object.keys(t)[0], C = t[y];
      g = d[y].getPixelForValue(C) - v + e;
    } else t === "center" ? g = (l.left + l.right) / 2 - v + e : g = Il(r, t, e);
    b = ge(o, s, i), h = t === "left" ? -re : re;
  }
  return {
    titleX: g,
    titleY: b,
    maxWidth: p,
    rotation: h
  };
}
class dr extends je {
  constructor(e) {
    super(), this.id = e.id, this.type = e.type, this.options = void 0, this.ctx = e.ctx, this.chart = e.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(e) {
    this.options = e.setContext(this.getContext()), this.axis = e.axis, this._userMin = this.parse(e.min), this._userMax = this.parse(e.max), this._suggestedMin = this.parse(e.suggestedMin), this._suggestedMax = this.parse(e.suggestedMax);
  }
  parse(e, t) {
    return e;
  }
  getUserBounds() {
    let { _userMin: e, _userMax: t, _suggestedMin: o, _suggestedMax: i } = this;
    return e = Te(e, Number.POSITIVE_INFINITY), t = Te(t, Number.NEGATIVE_INFINITY), o = Te(o, Number.POSITIVE_INFINITY), i = Te(i, Number.NEGATIVE_INFINITY), {
      min: Te(e, o),
      max: Te(t, i),
      minDefined: Q(e),
      maxDefined: Q(t)
    };
  }
  getMinMax(e) {
    let { min: t, max: o, minDefined: i, maxDefined: n } = this.getUserBounds(), s;
    if (i && n)
      return {
        min: t,
        max: o
      };
    const a = this.getMatchingVisibleMetas();
    for (let c = 0, l = a.length; c < l; ++c)
      s = a[c].controller.getMinMax(this, e), i || (t = Math.min(t, s.min)), n || (o = Math.max(o, s.max));
    return t = n && t > o ? o : t, o = i && t > o ? t : o, {
      min: Te(t, Te(o, t)),
      max: Te(o, Te(t, o))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const e = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? e.xLabels : e.yLabels) || e.labels || [];
  }
  getLabelItems(e = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(e));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    j(this.options.beforeUpdate, [
      this
    ]);
  }
  update(e, t, o) {
    const { beginAtZero: i, grace: n, ticks: s } = this.options, a = s.sampleSize;
    this.beforeUpdate(), this.maxWidth = e, this.maxHeight = t, this._margins = o = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, o), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + o.left + o.right : this.height + o.top + o.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = a0(this, n, i), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = a < this.ticks.length;
    this._convertTicksToLabels(c ? Vl(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), s.display && (s.autoSkip || s.source === "auto") && (this.ticks = z5(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let e = this.options.reverse, t, o;
    this.isHorizontal() ? (t = this.left, o = this.right) : (t = this.top, o = this.bottom, e = !e), this._startPixel = t, this._endPixel = o, this._reversePixels = e, this._length = o - t, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    j(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    j(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    j(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(e) {
    this.chart.notifyPlugins(e, this.getContext()), j(this.options[e], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    j(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(e) {
    const t = this.options.ticks;
    let o, i, n;
    for (o = 0, i = e.length; o < i; o++)
      n = e[o], n.label = j(t.callback, [
        n.value,
        o,
        e
      ], this);
  }
  afterTickToLabelConversion() {
    j(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    j(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const e = this.options, t = e.ticks, o = Bl(this.ticks.length, e.ticks.maxTicksLimit), i = t.minRotation || 0, n = t.maxRotation;
    let s = i, a, c, l;
    if (!this._isVisible() || !t.display || i >= n || o <= 1 || !this.isHorizontal()) {
      this.labelRotation = i;
      return;
    }
    const d = this._getLabelSizes(), h = d.widest.width, p = d.highest.height, g = ce(this.chart.width - h, 0, this.maxWidth);
    a = e.offset ? this.maxWidth / o : g / (o - 1), h + 6 > a && (a = g / (o - (e.offset ? 0.5 : 1)), c = this.maxHeight - Xr(e.grid) - t.padding - Nl(e.title, this.chart.options.font), l = Math.sqrt(h * h + p * p), s = Os(Math.min(Math.asin(ce((d.highest.height + 6) / a, -1, 1)), Math.asin(ce(c / l, -1, 1)) - Math.asin(ce(p / l, -1, 1)))), s = Math.max(i, Math.min(n, s))), this.labelRotation = s;
  }
  afterCalculateLabelRotation() {
    j(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    j(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const e = {
      width: 0,
      height: 0
    }, { chart: t, options: { ticks: o, title: i, grid: n } } = this, s = this._isVisible(), a = this.isHorizontal();
    if (s) {
      const c = Nl(i, t.options.font);
      if (a ? (e.width = this.maxWidth, e.height = Xr(n) + c) : (e.height = this.maxHeight, e.width = Xr(n) + c), o.display && this.ticks.length) {
        const { first: l, last: d, widest: h, highest: p } = this._getLabelSizes(), g = o.padding * 2, b = Ze(this.labelRotation), m = Math.cos(b), v = Math.sin(b);
        if (a) {
          const y = o.mirror ? 0 : v * h.width + m * p.height;
          e.height = Math.min(this.maxHeight, e.height + y + g);
        } else {
          const y = o.mirror ? 0 : m * h.width + v * p.height;
          e.width = Math.min(this.maxWidth, e.width + y + g);
        }
        this._calculatePadding(l, d, v, m);
      }
    }
    this._handleMargins(), a ? (this.width = this._length = t.width - this._margins.left - this._margins.right, this.height = e.height) : (this.width = e.width, this.height = this._length = t.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(e, t, o, i) {
    const { ticks: { align: n, padding: s }, position: a } = this.options, c = this.labelRotation !== 0, l = a !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const d = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let p = 0, g = 0;
      c ? l ? (p = i * e.width, g = o * t.height) : (p = o * e.height, g = i * t.width) : n === "start" ? g = t.width : n === "end" ? p = e.width : n !== "inner" && (p = e.width / 2, g = t.width / 2), this.paddingLeft = Math.max((p - d + s) * this.width / (this.width - d), 0), this.paddingRight = Math.max((g - h + s) * this.width / (this.width - h), 0);
    } else {
      let d = t.height / 2, h = e.height / 2;
      n === "start" ? (d = 0, h = e.height) : n === "end" && (d = t.height, h = 0), this.paddingTop = d + s, this.paddingBottom = h + s;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    j(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: e, position: t } = this.options;
    return t === "top" || t === "bottom" || e === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(e) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(e);
    let t, o;
    for (t = 0, o = e.length; t < o; t++)
      H(e[t].label) && (e.splice(t, 1), o--, t--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let e = this._labelSizes;
    if (!e) {
      const t = this.options.ticks.sampleSize;
      let o = this.ticks;
      t < o.length && (o = Vl(o, t)), this._labelSizes = e = this._computeLabelSizes(o, o.length, this.options.ticks.maxTicksLimit);
    }
    return e;
  }
  _computeLabelSizes(e, t, o) {
    const { ctx: i, _longestTextCache: n } = this, s = [], a = [], c = Math.floor(t / Bl(t, o));
    let l = 0, d = 0, h, p, g, b, m, v, y, C, w, _, x;
    for (h = 0; h < t; h += c) {
      if (b = e[h].label, m = this._resolveTickFontOptions(h), i.font = v = m.string, y = n[v] = n[v] || {
        data: {},
        gc: []
      }, C = m.lineHeight, w = _ = 0, !H(b) && !U(b))
        w = To(i, y.data, y.gc, w, b), _ = C;
      else if (U(b))
        for (p = 0, g = b.length; p < g; ++p)
          x = b[p], !H(x) && !U(x) && (w = To(i, y.data, y.gc, w, x), _ += C);
      s.push(w), a.push(_), l = Math.max(w, l), d = Math.max(_, d);
    }
    X5(n, t);
    const L = s.indexOf(l), S = a.indexOf(d), A = (P) => ({
      width: s[P] || 0,
      height: a[P] || 0
    });
    return {
      first: A(0),
      last: A(t - 1),
      widest: A(L),
      highest: A(S),
      widths: s,
      heights: a
    };
  }
  getLabelForValue(e) {
    return e;
  }
  getPixelForValue(e, t) {
    return NaN;
  }
  getValueForPixel(e) {
  }
  getPixelForTick(e) {
    const t = this.ticks;
    return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e].value);
  }
  getPixelForDecimal(e) {
    this._reversePixels && (e = 1 - e);
    const t = this._startPixel + e * this._length;
    return I2(this._alignToPixels ? Zt(this.chart, t, 0) : t);
  }
  getDecimalForPixel(e) {
    const t = (e - this._startPixel) / this._length;
    return this._reversePixels ? 1 - t : t;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: e, max: t } = this;
    return e < 0 && t < 0 ? t : e > 0 && t > 0 ? e : 0;
  }
  getContext(e) {
    const t = this.ticks || [];
    if (e >= 0 && e < t.length) {
      const o = t[e];
      return o.$context || (o.$context = G5(this.getContext(), e, o));
    }
    return this.$context || (this.$context = K5(this.chart.getContext(), this));
  }
  _tickSize() {
    const e = this.options.ticks, t = Ze(this.labelRotation), o = Math.abs(Math.cos(t)), i = Math.abs(Math.sin(t)), n = this._getLabelSizes(), s = e.autoSkipPadding || 0, a = n ? n.widest.width + s : 0, c = n ? n.highest.height + s : 0;
    return this.isHorizontal() ? c * o > a * i ? a / o : c / i : c * i < a * o ? c / o : a / i;
  }
  _isVisible() {
    const e = this.options.display;
    return e !== "auto" ? !!e : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(e) {
    const t = this.axis, o = this.chart, i = this.options, { grid: n, position: s, border: a } = i, c = n.offset, l = this.isHorizontal(), h = this.ticks.length + (c ? 1 : 0), p = Xr(n), g = [], b = a.setContext(this.getContext()), m = b.display ? b.width : 0, v = m / 2, y = function(q) {
      return Zt(o, q, m);
    };
    let C, w, _, x, L, S, A, P, D, O, B, he;
    if (s === "top")
      C = y(this.bottom), S = this.bottom - p, P = C - v, O = y(e.top) + v, he = e.bottom;
    else if (s === "bottom")
      C = y(this.top), O = e.top, he = y(e.bottom) - v, S = C + v, P = this.top + p;
    else if (s === "left")
      C = y(this.right), L = this.right - p, A = C - v, D = y(e.left) + v, B = e.right;
    else if (s === "right")
      C = y(this.left), D = e.left, B = y(e.right) - v, L = C + v, A = this.left + p;
    else if (t === "x") {
      if (s === "center")
        C = y((e.top + e.bottom) / 2 + 0.5);
      else if (I(s)) {
        const q = Object.keys(s)[0], te = s[q];
        C = y(this.chart.scales[q].getPixelForValue(te));
      }
      O = e.top, he = e.bottom, S = C + v, P = S + p;
    } else if (t === "y") {
      if (s === "center")
        C = y((e.left + e.right) / 2);
      else if (I(s)) {
        const q = Object.keys(s)[0], te = s[q];
        C = y(this.chart.scales[q].getPixelForValue(te));
      }
      L = C - v, A = L - p, D = e.left, B = e.right;
    }
    const Ae = E(i.ticks.maxTicksLimit, h), z = Math.max(1, Math.ceil(h / Ae));
    for (w = 0; w < h; w += z) {
      const q = this.getContext(w), te = n.setContext(q), Fe = a.setContext(q), fe = te.lineWidth, fr = te.color, oo = Fe.dash || [], gr = Fe.dashOffset, Zr = te.tickWidth, Nt = te.tickColor, jr = te.tickBorderDash || [], Rt = te.tickBorderDashOffset;
      _ = Y5(this, w, c), _ !== void 0 && (x = Zt(o, _, fe), l ? L = A = D = B = x : S = P = O = he = x, g.push({
        tx1: L,
        ty1: S,
        tx2: A,
        ty2: P,
        x1: D,
        y1: O,
        x2: B,
        y2: he,
        width: fe,
        color: fr,
        borderDash: oo,
        borderDashOffset: gr,
        tickWidth: Zr,
        tickColor: Nt,
        tickBorderDash: jr,
        tickBorderDashOffset: Rt
      }));
    }
    return this._ticksLength = h, this._borderValue = C, g;
  }
  _computeLabelItems(e) {
    const t = this.axis, o = this.options, { position: i, ticks: n } = o, s = this.isHorizontal(), a = this.ticks, { align: c, crossAlign: l, padding: d, mirror: h } = n, p = Xr(o.grid), g = p + d, b = h ? -d : g, m = -Ze(this.labelRotation), v = [];
    let y, C, w, _, x, L, S, A, P, D, O, B, he = "middle";
    if (i === "top")
      L = this.bottom - b, S = this._getXAxisLabelAlignment();
    else if (i === "bottom")
      L = this.top + b, S = this._getXAxisLabelAlignment();
    else if (i === "left") {
      const z = this._getYAxisLabelAlignment(p);
      S = z.textAlign, x = z.x;
    } else if (i === "right") {
      const z = this._getYAxisLabelAlignment(p);
      S = z.textAlign, x = z.x;
    } else if (t === "x") {
      if (i === "center")
        L = (e.top + e.bottom) / 2 + g;
      else if (I(i)) {
        const z = Object.keys(i)[0], q = i[z];
        L = this.chart.scales[z].getPixelForValue(q) + g;
      }
      S = this._getXAxisLabelAlignment();
    } else if (t === "y") {
      if (i === "center")
        x = (e.left + e.right) / 2 - g;
      else if (I(i)) {
        const z = Object.keys(i)[0], q = i[z];
        x = this.chart.scales[z].getPixelForValue(q);
      }
      S = this._getYAxisLabelAlignment(p).textAlign;
    }
    t === "y" && (c === "start" ? he = "top" : c === "end" && (he = "bottom"));
    const Ae = this._getLabelSizes();
    for (y = 0, C = a.length; y < C; ++y) {
      w = a[y], _ = w.label;
      const z = n.setContext(this.getContext(y));
      A = this.getPixelForTick(y) + n.labelOffset, P = this._resolveTickFontOptions(y), D = P.lineHeight, O = U(_) ? _.length : 1;
      const q = O / 2, te = z.color, Fe = z.textStrokeColor, fe = z.textStrokeWidth;
      let fr = S;
      s ? (x = A, S === "inner" && (y === C - 1 ? fr = this.options.reverse ? "left" : "right" : y === 0 ? fr = this.options.reverse ? "right" : "left" : fr = "center"), i === "top" ? l === "near" || m !== 0 ? B = -O * D + D / 2 : l === "center" ? B = -Ae.highest.height / 2 - q * D + D : B = -Ae.highest.height + D / 2 : l === "near" || m !== 0 ? B = D / 2 : l === "center" ? B = Ae.highest.height / 2 - q * D : B = Ae.highest.height - O * D, h && (B *= -1), m !== 0 && !z.showLabelBackdrop && (x += D / 2 * Math.sin(m))) : (L = A, B = (1 - O) * D / 2);
      let oo;
      if (z.showLabelBackdrop) {
        const gr = ye(z.backdropPadding), Zr = Ae.heights[y], Nt = Ae.widths[y];
        let jr = B - gr.top, Rt = 0 - gr.left;
        switch (he) {
          case "middle":
            jr -= Zr / 2;
            break;
          case "bottom":
            jr -= Zr;
            break;
        }
        switch (S) {
          case "center":
            Rt -= Nt / 2;
            break;
          case "right":
            Rt -= Nt;
            break;
          case "inner":
            y === C - 1 ? Rt -= Nt : y > 0 && (Rt -= Nt / 2);
            break;
        }
        oo = {
          left: Rt,
          top: jr,
          width: Nt + gr.width,
          height: Zr + gr.height,
          color: z.backdropColor
        };
      }
      v.push({
        label: _,
        font: P,
        textOffset: B,
        options: {
          rotation: m,
          color: te,
          strokeColor: Fe,
          strokeWidth: fe,
          textAlign: fr,
          textBaseline: he,
          translation: [
            x,
            L
          ],
          backdrop: oo
        }
      });
    }
    return v;
  }
  _getXAxisLabelAlignment() {
    const { position: e, ticks: t } = this.options;
    if (-Ze(this.labelRotation))
      return e === "top" ? "left" : "right";
    let i = "center";
    return t.align === "start" ? i = "left" : t.align === "end" ? i = "right" : t.align === "inner" && (i = "inner"), i;
  }
  _getYAxisLabelAlignment(e) {
    const { position: t, ticks: { crossAlign: o, mirror: i, padding: n } } = this.options, s = this._getLabelSizes(), a = e + n, c = s.widest.width;
    let l, d;
    return t === "left" ? i ? (d = this.right + n, o === "near" ? l = "left" : o === "center" ? (l = "center", d += c / 2) : (l = "right", d += c)) : (d = this.right - a, o === "near" ? l = "right" : o === "center" ? (l = "center", d -= c / 2) : (l = "left", d = this.left)) : t === "right" ? i ? (d = this.left + n, o === "near" ? l = "right" : o === "center" ? (l = "center", d -= c / 2) : (l = "left", d -= c)) : (d = this.left + a, o === "near" ? l = "left" : o === "center" ? (l = "center", d += c / 2) : (l = "right", d = this.right)) : l = "right", {
      textAlign: l,
      x: d
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const e = this.chart, t = this.options.position;
    if (t === "left" || t === "right")
      return {
        top: 0,
        left: this.left,
        bottom: e.height,
        right: this.right
      };
    if (t === "top" || t === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: e.width
      };
  }
  drawBackground() {
    const { ctx: e, options: { backgroundColor: t }, left: o, top: i, width: n, height: s } = this;
    t && (e.save(), e.fillStyle = t, e.fillRect(o, i, n, s), e.restore());
  }
  getLineWidthForValue(e) {
    const t = this.options.grid;
    if (!this._isVisible() || !t.display)
      return 0;
    const i = this.ticks.findIndex((n) => n.value === e);
    return i >= 0 ? t.setContext(this.getContext(i)).lineWidth : 0;
  }
  drawGrid(e) {
    const t = this.options.grid, o = this.ctx, i = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(e));
    let n, s;
    const a = (c, l, d) => {
      !d.width || !d.color || (o.save(), o.lineWidth = d.width, o.strokeStyle = d.color, o.setLineDash(d.borderDash || []), o.lineDashOffset = d.borderDashOffset, o.beginPath(), o.moveTo(c.x, c.y), o.lineTo(l.x, l.y), o.stroke(), o.restore());
    };
    if (t.display)
      for (n = 0, s = i.length; n < s; ++n) {
        const c = i[n];
        t.drawOnChartArea && a({
          x: c.x1,
          y: c.y1
        }, {
          x: c.x2,
          y: c.y2
        }, c), t.drawTicks && a({
          x: c.tx1,
          y: c.ty1
        }, {
          x: c.tx2,
          y: c.ty2
        }, {
          color: c.tickColor,
          width: c.tickWidth,
          borderDash: c.tickBorderDash,
          borderDashOffset: c.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: e, ctx: t, options: { border: o, grid: i } } = this, n = o.setContext(this.getContext()), s = o.display ? n.width : 0;
    if (!s)
      return;
    const a = i.setContext(this.getContext(0)).lineWidth, c = this._borderValue;
    let l, d, h, p;
    this.isHorizontal() ? (l = Zt(e, this.left, s) - s / 2, d = Zt(e, this.right, a) + a / 2, h = p = c) : (h = Zt(e, this.top, s) - s / 2, p = Zt(e, this.bottom, a) + a / 2, l = d = c), t.save(), t.lineWidth = n.width, t.strokeStyle = n.color, t.beginPath(), t.moveTo(l, h), t.lineTo(d, p), t.stroke(), t.restore();
  }
  drawLabels(e) {
    if (!this.options.ticks.display)
      return;
    const o = this.ctx, i = this._computeLabelArea();
    i && ln(o, i);
    const n = this.getLabelItems(e);
    for (const s of n) {
      const a = s.options, c = s.font, l = s.label, d = s.textOffset;
      rr(o, l, 0, d, c, a);
    }
    i && dn(o);
  }
  drawTitle() {
    const { ctx: e, options: { position: t, title: o, reverse: i } } = this;
    if (!o.display)
      return;
    const n = se(o.font), s = ye(o.padding), a = o.align;
    let c = n.lineHeight / 2;
    t === "bottom" || t === "center" || I(t) ? (c += s.bottom, U(o.text) && (c += n.lineHeight * (o.text.length - 1))) : c += s.top;
    const { titleX: l, titleY: d, maxWidth: h, rotation: p } = Q5(this, c, t, a);
    rr(e, o.text, 0, 0, n, {
      color: o.color,
      maxWidth: h,
      rotation: p,
      textAlign: J5(a, t, i),
      textBaseline: "middle",
      translation: [
        l,
        d
      ]
    });
  }
  draw(e) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(e), this.drawBorder(), this.drawTitle(), this.drawLabels(e));
  }
  _layers() {
    const e = this.options, t = e.ticks && e.ticks.z || 0, o = E(e.grid && e.grid.z, -1), i = E(e.border && e.border.z, 0);
    return !this._isVisible() || this.draw !== dr.prototype.draw ? [
      {
        z: t,
        draw: (n) => {
          this.draw(n);
        }
      }
    ] : [
      {
        z: o,
        draw: (n) => {
          this.drawBackground(), this.drawGrid(n), this.drawTitle();
        }
      },
      {
        z: i,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: t,
        draw: (n) => {
          this.drawLabels(n);
        }
      }
    ];
  }
  getMatchingVisibleMetas(e) {
    const t = this.chart.getSortedVisibleDatasetMetas(), o = this.axis + "AxisID", i = [];
    let n, s;
    for (n = 0, s = t.length; n < s; ++n) {
      const a = t[n];
      a[o] === this.id && (!e || a.type === e) && i.push(a);
    }
    return i;
  }
  _resolveTickFontOptions(e) {
    const t = this.options.ticks.setContext(this.getContext(e));
    return se(t.font);
  }
  _maxDigits() {
    const e = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / e;
  }
}
class fo {
  constructor(e, t, o) {
    this.type = e, this.scope = t, this.override = o, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(e) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, e.prototype);
  }
  register(e) {
    const t = Object.getPrototypeOf(e);
    let o;
    r3(t) && (o = this.register(t));
    const i = this.items, n = e.id, s = this.scope + "." + n;
    if (!n)
      throw new Error("class does not have id: " + e);
    return n in i || (i[n] = e, e3(e, s, o), this.override && Y.override(e.id, e.overrides)), s;
  }
  get(e) {
    return this.items[e];
  }
  unregister(e) {
    const t = this.items, o = e.id, i = this.scope;
    o in t && delete t[o], i && o in Y[i] && (delete Y[i][o], this.override && delete tr[o]);
  }
}
function e3(r, e, t) {
  const o = $i(/* @__PURE__ */ Object.create(null), [
    t ? Y.get(t) : {},
    Y.get(e),
    r.defaults
  ]);
  Y.set(e, o), r.defaultRoutes && t3(e, r.defaultRoutes), r.descriptors && Y.describe(e, r.descriptors);
}
function t3(r, e) {
  Object.keys(e).forEach((t) => {
    const o = t.split("."), i = o.pop(), n = [
      r
    ].concat(o).join("."), s = e[t].split("."), a = s.pop(), c = s.join(".");
    Y.route(n, i, c, a);
  });
}
function r3(r) {
  return "id" in r && "defaults" in r;
}
class i3 {
  constructor() {
    this.controllers = new fo(Qe, "datasets", !0), this.elements = new fo(je, "elements"), this.plugins = new fo(Object, "plugins"), this.scales = new fo(dr, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...e) {
    this._each("register", e);
  }
  remove(...e) {
    this._each("unregister", e);
  }
  addControllers(...e) {
    this._each("register", e, this.controllers);
  }
  addElements(...e) {
    this._each("register", e, this.elements);
  }
  addPlugins(...e) {
    this._each("register", e, this.plugins);
  }
  addScales(...e) {
    this._each("register", e, this.scales);
  }
  getController(e) {
    return this._get(e, this.controllers, "controller");
  }
  getElement(e) {
    return this._get(e, this.elements, "element");
  }
  getPlugin(e) {
    return this._get(e, this.plugins, "plugin");
  }
  getScale(e) {
    return this._get(e, this.scales, "scale");
  }
  removeControllers(...e) {
    this._each("unregister", e, this.controllers);
  }
  removeElements(...e) {
    this._each("unregister", e, this.elements);
  }
  removePlugins(...e) {
    this._each("unregister", e, this.plugins);
  }
  removeScales(...e) {
    this._each("unregister", e, this.scales);
  }
  _each(e, t, o) {
    [
      ...t
    ].forEach((i) => {
      const n = o || this._getRegistryForType(i);
      o || n.isForType(i) || n === this.plugins && i.id ? this._exec(e, n, i) : N(i, (s) => {
        const a = o || this._getRegistryForType(s);
        this._exec(e, a, s);
      });
    });
  }
  _exec(e, t, o) {
    const i = Ds(e);
    j(o["before" + i], [], o), t[e](o), j(o["after" + i], [], o);
  }
  _getRegistryForType(e) {
    for (let t = 0; t < this._typedRegistries.length; t++) {
      const o = this._typedRegistries[t];
      if (o.isForType(e))
        return o;
    }
    return this.plugins;
  }
  _get(e, t, o) {
    const i = t.get(e);
    if (i === void 0)
      throw new Error('"' + e + '" is not a registered ' + o + ".");
    return i;
  }
}
var Ke = /* @__PURE__ */ new i3();
class o3 {
  constructor() {
    this._init = void 0;
  }
  notify(e, t, o, i) {
    if (t === "beforeInit" && (this._init = this._createDescriptors(e, !0), this._notify(this._init, e, "install")), this._init === void 0)
      return;
    const n = i ? this._descriptors(e).filter(i) : this._descriptors(e), s = this._notify(n, e, t, o);
    return t === "afterDestroy" && (this._notify(n, e, "stop"), this._notify(this._init, e, "uninstall"), this._init = void 0), s;
  }
  _notify(e, t, o, i) {
    i = i || {};
    for (const n of e) {
      const s = n.plugin, a = s[o], c = [
        t,
        i,
        n.options
      ];
      if (j(a, c, s) === !1 && i.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    H(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(e) {
    if (this._cache)
      return this._cache;
    const t = this._cache = this._createDescriptors(e);
    return this._notifyStateChanges(e), t;
  }
  _createDescriptors(e, t) {
    const o = e && e.config, i = E(o.options && o.options.plugins, {}), n = n3(o);
    return i === !1 && !t ? [] : a3(e, n, i, t);
  }
  _notifyStateChanges(e) {
    const t = this._oldCache || [], o = this._cache, i = (n, s) => n.filter((a) => !s.some((c) => a.plugin.id === c.plugin.id));
    this._notify(i(t, o), e, "stop"), this._notify(i(o, t), e, "start");
  }
}
function n3(r) {
  const e = {}, t = [], o = Object.keys(Ke.plugins.items);
  for (let n = 0; n < o.length; n++)
    t.push(Ke.getPlugin(o[n]));
  const i = r.plugins || [];
  for (let n = 0; n < i.length; n++) {
    const s = i[n];
    t.indexOf(s) === -1 && (t.push(s), e[s.id] = !0);
  }
  return {
    plugins: t,
    localIds: e
  };
}
function s3(r, e) {
  return !e && r === !1 ? null : r === !0 ? {} : r;
}
function a3(r, { plugins: e, localIds: t }, o, i) {
  const n = [], s = r.getContext();
  for (const a of e) {
    const c = a.id, l = s3(o[c], i);
    l !== null && n.push({
      plugin: a,
      options: c3(r.config, {
        plugin: a,
        local: t[c]
      }, l, s)
    });
  }
  return n;
}
function c3(r, { plugin: e, local: t }, o, i) {
  const n = r.pluginScopeKeys(e), s = r.getOptionScopes(o, n);
  return t && e.defaults && s.push(e.defaults), r.createResolver(s, i, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Jn(r, e) {
  const t = Y.datasets[r] || {};
  return ((e.datasets || {})[r] || {}).indexAxis || e.indexAxis || t.indexAxis || "x";
}
function l3(r, e) {
  let t = r;
  return r === "_index_" ? t = e : r === "_value_" && (t = e === "x" ? "y" : "x"), t;
}
function d3(r, e) {
  return r === e ? "_index_" : "_value_";
}
function Rl(r) {
  if (r === "x" || r === "y" || r === "r")
    return r;
}
function h3(r) {
  if (r === "top" || r === "bottom")
    return "x";
  if (r === "left" || r === "right")
    return "y";
}
function Qn(r, ...e) {
  if (Rl(r))
    return r;
  for (const t of e) {
    const o = t.axis || h3(t.position) || r.length > 1 && Rl(r[0].toLowerCase());
    if (o)
      return o;
  }
  throw new Error(`Cannot determine type of '${r}' axis. Please provide 'axis' or 'position' option.`);
}
function zl(r, e, t) {
  if (t[e + "AxisID"] === r)
    return {
      axis: e
    };
}
function u3(r, e) {
  if (e.data && e.data.datasets) {
    const t = e.data.datasets.filter((o) => o.xAxisID === r || o.yAxisID === r);
    if (t.length)
      return zl(r, "x", t[0]) || zl(r, "y", t[0]);
  }
  return {};
}
function p3(r, e) {
  const t = tr[r.type] || {
    scales: {}
  }, o = e.scales || {}, i = Jn(r.type, e), n = /* @__PURE__ */ Object.create(null);
  return Object.keys(o).forEach((s) => {
    const a = o[s];
    if (!I(a))
      return console.error(`Invalid scale configuration for scale: ${s}`);
    if (a._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${s}`);
    const c = Qn(s, a, u3(s, r), Y.scales[a.type]), l = d3(c, i), d = t.scales || {};
    n[s] = ii(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      a,
      d[c],
      d[l]
    ]);
  }), r.data.datasets.forEach((s) => {
    const a = s.type || r.type, c = s.indexAxis || Jn(a, e), d = (tr[a] || {}).scales || {};
    Object.keys(d).forEach((h) => {
      const p = l3(h, c), g = s[p + "AxisID"] || p;
      n[g] = n[g] || /* @__PURE__ */ Object.create(null), ii(n[g], [
        {
          axis: p
        },
        o[g],
        d[h]
      ]);
    });
  }), Object.keys(n).forEach((s) => {
    const a = n[s];
    ii(a, [
      Y.scales[a.type],
      Y.scale
    ]);
  }), n;
}
function wd(r) {
  const e = r.options || (r.options = {});
  e.plugins = E(e.plugins, {}), e.scales = p3(r, e);
}
function kd(r) {
  return r = r || {}, r.datasets = r.datasets || [], r.labels = r.labels || [], r;
}
function f3(r) {
  return r = r || {}, r.data = kd(r.data), wd(r), r;
}
const Fl = /* @__PURE__ */ new Map(), $d = /* @__PURE__ */ new Set();
function go(r, e) {
  let t = Fl.get(r);
  return t || (t = e(), Fl.set(r, t), $d.add(t)), t;
}
const Kr = (r, e, t) => {
  const o = wt(e, t);
  o !== void 0 && r.add(o);
};
class g3 {
  constructor(e) {
    this._config = f3(e), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(e) {
    this._config.type = e;
  }
  get data() {
    return this._config.data;
  }
  set data(e) {
    this._config.data = kd(e);
  }
  get options() {
    return this._config.options;
  }
  set options(e) {
    this._config.options = e;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const e = this._config;
    this.clearCache(), wd(e);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(e) {
    return go(e, () => [
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(e, t) {
    return go(`${e}.transition.${t}`, () => [
      [
        `datasets.${e}.transitions.${t}`,
        `transitions.${t}`
      ],
      [
        `datasets.${e}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(e, t) {
    return go(`${e}-${t}`, () => [
      [
        `datasets.${e}.elements.${t}`,
        `datasets.${e}`,
        `elements.${t}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(e) {
    const t = e.id, o = this.type;
    return go(`${o}-plugin-${t}`, () => [
      [
        `plugins.${t}`,
        ...e.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(e, t) {
    const o = this._scopeCache;
    let i = o.get(e);
    return (!i || t) && (i = /* @__PURE__ */ new Map(), o.set(e, i)), i;
  }
  getOptionScopes(e, t, o) {
    const { options: i, type: n } = this, s = this._cachedScopes(e, o), a = s.get(t);
    if (a)
      return a;
    const c = /* @__PURE__ */ new Set();
    t.forEach((d) => {
      e && (c.add(e), d.forEach((h) => Kr(c, e, h))), d.forEach((h) => Kr(c, i, h)), d.forEach((h) => Kr(c, tr[n] || {}, h)), d.forEach((h) => Kr(c, Y, h)), d.forEach((h) => Kr(c, jn, h));
    });
    const l = Array.from(c);
    return l.length === 0 && l.push(/* @__PURE__ */ Object.create(null)), $d.has(t) && s.set(t, l), l;
  }
  chartOptionScopes() {
    const { options: e, type: t } = this;
    return [
      e,
      tr[t] || {},
      Y.datasets[t] || {},
      {
        type: t
      },
      Y,
      jn
    ];
  }
  resolveNamedOptions(e, t, o, i = [
    ""
  ]) {
    const n = {
      $shared: !0
    }, { resolver: s, subPrefixes: a } = Zl(this._resolverCache, e, i);
    let c = s;
    if (m3(s, t)) {
      n.$shared = !1, o = kt(o) ? o() : o;
      const l = this.createResolver(e, o, a);
      c = Ar(s, o, l);
    }
    for (const l of t)
      n[l] = c[l];
    return n;
  }
  createResolver(e, t, o = [
    ""
  ], i) {
    const { resolver: n } = Zl(this._resolverCache, e, o);
    return I(t) ? Ar(n, t, void 0, i) : n;
  }
}
function Zl(r, e, t) {
  let o = r.get(e);
  o || (o = /* @__PURE__ */ new Map(), r.set(e, o));
  const i = t.join();
  let n = o.get(i);
  return n || (n = {
    resolver: Ns(e, t),
    subPrefixes: t.filter((a) => !a.toLowerCase().includes("hover"))
  }, o.set(i, n)), n;
}
const b3 = (r) => I(r) && Object.getOwnPropertyNames(r).some((e) => kt(r[e]));
function m3(r, e) {
  const { isScriptable: t, isIndexable: o } = id(r);
  for (const i of e) {
    const n = t(i), s = o(i), a = (s || n) && r[i];
    if (n && (kt(a) || b3(a)) || s && U(a))
      return !0;
  }
  return !1;
}
var v3 = "4.5.1";
const y3 = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function jl(r, e) {
  return r === "top" || r === "bottom" || y3.indexOf(r) === -1 && e === "x";
}
function Wl(r, e) {
  return function(t, o) {
    return t[r] === o[r] ? t[e] - o[e] : t[r] - o[r];
  };
}
function ql(r) {
  const e = r.chart, t = e.options.animation;
  e.notifyPlugins("afterRender"), j(t && t.onComplete, [
    r
  ], e);
}
function C3(r) {
  const e = r.chart, t = e.options.animation;
  j(t && t.onProgress, [
    r
  ], e);
}
function Md(r) {
  return Fs() && typeof r == "string" ? r = document.getElementById(r) : r && r.length && (r = r[0]), r && r.canvas && (r = r.canvas), r;
}
const xo = {}, Ul = (r) => {
  const e = Md(r);
  return Object.values(xo).filter((t) => t.canvas === e).pop();
};
function x3(r, e, t) {
  const o = Object.keys(r);
  for (const i of o) {
    const n = +i;
    if (n >= e) {
      const s = r[i];
      delete r[i], (t > 0 || n > e) && (r[n + t] = s);
    }
  }
}
function _3(r, e, t, o) {
  return !t || r.type === "mouseout" ? null : o ? e : r;
}
const gt = class gt {
  static register(...e) {
    Ke.add(...e), Yl();
  }
  static unregister(...e) {
    Ke.remove(...e), Yl();
  }
  constructor(e, t) {
    const o = this.config = new g3(t), i = Md(e), n = Ul(i);
    if (n)
      throw new Error("Canvas is already in use. Chart with ID '" + n.id + "' must be destroyed before the canvas with ID '" + n.canvas.id + "' can be reused.");
    const s = o.createResolver(o.chartOptionScopes(), this.getContext());
    this.platform = new (o.platform || R5(i))(), this.platform.updateConfig(o);
    const a = this.platform.acquireContext(i, s.aspectRatio), c = a && a.canvas, l = c && c.height, d = c && c.width;
    if (this.id = w2(), this.ctx = a, this.canvas = c, this.width = d, this.height = l, this._options = s, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new o3(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = R2((h) => this.update(h), s.resizeDelay || 0), this._dataChanges = [], xo[this.id] = this, !a || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    at.listen(this, "complete", ql), at.listen(this, "progress", C3), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: e, maintainAspectRatio: t }, width: o, height: i, _aspectRatio: n } = this;
    return H(e) ? t && n ? n : i ? o / i : null : e;
  }
  get data() {
    return this.config.data;
  }
  set data(e) {
    this.config.data = e;
  }
  get options() {
    return this._options;
  }
  set options(e) {
    this.config.options = e;
  }
  get registry() {
    return Ke;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : bl(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return pl(this.canvas, this.ctx), this;
  }
  stop() {
    return at.stop(this), this;
  }
  resize(e, t) {
    at.running(this) ? this._resizeBeforeDraw = {
      width: e,
      height: t
    } : this._resize(e, t);
  }
  _resize(e, t) {
    const o = this.options, i = this.canvas, n = o.maintainAspectRatio && this.aspectRatio, s = this.platform.getMaximumSize(i, e, t, n), a = o.devicePixelRatio || this.platform.getDevicePixelRatio(), c = this.width ? "resize" : "attach";
    this.width = s.width, this.height = s.height, this._aspectRatio = this.aspectRatio, bl(this, a, !0) && (this.notifyPlugins("resize", {
      size: s
    }), j(o.onResize, [
      this,
      s
    ], this), this.attached && this._doResize(c) && this.render());
  }
  ensureScalesHaveIDs() {
    const t = this.options.scales || {};
    N(t, (o, i) => {
      o.id = i;
    });
  }
  buildOrUpdateScales() {
    const e = this.options, t = e.scales, o = this.scales, i = Object.keys(o).reduce((s, a) => (s[a] = !1, s), {});
    let n = [];
    t && (n = n.concat(Object.keys(t).map((s) => {
      const a = t[s], c = Qn(s, a), l = c === "r", d = c === "x";
      return {
        options: a,
        dposition: l ? "chartArea" : d ? "bottom" : "left",
        dtype: l ? "radialLinear" : d ? "category" : "linear"
      };
    }))), N(n, (s) => {
      const a = s.options, c = a.id, l = Qn(c, a), d = E(a.type, s.dtype);
      (a.position === void 0 || jl(a.position, l) !== jl(s.dposition)) && (a.position = s.dposition), i[c] = !0;
      let h = null;
      if (c in o && o[c].type === d)
        h = o[c];
      else {
        const p = Ke.getScale(d);
        h = new p({
          id: c,
          type: d,
          ctx: this.ctx,
          chart: this
        }), o[h.id] = h;
      }
      h.init(a, e);
    }), N(i, (s, a) => {
      s || delete o[a];
    }), N(o, (s) => {
      me.configure(this, s, s.options), me.addBox(this, s);
    });
  }
  _updateMetasets() {
    const e = this._metasets, t = this.data.datasets.length, o = e.length;
    if (e.sort((i, n) => i.index - n.index), o > t) {
      for (let i = t; i < o; ++i)
        this._destroyDatasetMeta(i);
      e.splice(t, o - t);
    }
    this._sortedMetasets = e.slice(0).sort(Wl("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: e, data: { datasets: t } } = this;
    e.length > t.length && delete this._stacks, e.forEach((o, i) => {
      t.filter((n) => n === o._dataset).length === 0 && this._destroyDatasetMeta(i);
    });
  }
  buildOrUpdateControllers() {
    const e = [], t = this.data.datasets;
    let o, i;
    for (this._removeUnreferencedMetasets(), o = 0, i = t.length; o < i; o++) {
      const n = t[o];
      let s = this.getDatasetMeta(o);
      const a = n.type || this.config.type;
      if (s.type && s.type !== a && (this._destroyDatasetMeta(o), s = this.getDatasetMeta(o)), s.type = a, s.indexAxis = n.indexAxis || Jn(a, this.options), s.order = n.order || 0, s.index = o, s.label = "" + n.label, s.visible = this.isDatasetVisible(o), s.controller)
        s.controller.updateIndex(o), s.controller.linkScales();
      else {
        const c = Ke.getController(a), { datasetElementType: l, dataElementType: d } = Y.datasets[a];
        Object.assign(c, {
          dataElementType: Ke.getElement(d),
          datasetElementType: l && Ke.getElement(l)
        }), s.controller = new c(this, o), e.push(s.controller);
      }
    }
    return this._updateMetasets(), e;
  }
  _resetElements() {
    N(this.data.datasets, (e, t) => {
      this.getDatasetMeta(t).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(e) {
    const t = this.config;
    t.update();
    const o = this._options = t.createResolver(t.chartOptionScopes(), this.getContext()), i = this._animationsDisabled = !o.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: e,
      cancelable: !0
    }) === !1)
      return;
    const n = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let s = 0;
    for (let l = 0, d = this.data.datasets.length; l < d; l++) {
      const { controller: h } = this.getDatasetMeta(l), p = !i && n.indexOf(h) === -1;
      h.buildOrUpdateElements(p), s = Math.max(+h.getMaxOverflow(), s);
    }
    s = this._minPadding = o.layout.autoPadding ? s : 0, this._updateLayout(s), i || N(n, (l) => {
      l.reset();
    }), this._updateDatasets(e), this.notifyPlugins("afterUpdate", {
      mode: e
    }), this._layers.sort(Wl("z", "_idx"));
    const { _active: a, _lastEvent: c } = this;
    c ? this._eventHandler(c, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render();
  }
  _updateScales() {
    N(this.scales, (e) => {
      me.removeBox(this, e);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const e = this.options, t = new Set(Object.keys(this._listeners)), o = new Set(e.events);
    (!ol(t, o) || !!this._responsiveListeners !== e.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: e } = this, t = this._getUniformDataChanges() || [];
    for (const { method: o, start: i, count: n } of t) {
      const s = o === "_removeElements" ? -n : n;
      x3(e, i, s);
    }
  }
  _getUniformDataChanges() {
    const e = this._dataChanges;
    if (!e || !e.length)
      return;
    this._dataChanges = [];
    const t = this.data.datasets.length, o = (n) => new Set(e.filter((s) => s[0] === n).map((s, a) => a + "," + s.splice(1).join(","))), i = o(0);
    for (let n = 1; n < t; n++)
      if (!ol(i, o(n)))
        return;
    return Array.from(i).map((n) => n.split(",")).map((n) => ({
      method: n[1],
      start: +n[2],
      count: +n[3]
    }));
  }
  _updateLayout(e) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    me.update(this, this.width, this.height, e);
    const t = this.chartArea, o = t.width <= 0 || t.height <= 0;
    this._layers = [], N(this.boxes, (i) => {
      o && i.position === "chartArea" || (i.configure && i.configure(), this._layers.push(...i._layers()));
    }, this), this._layers.forEach((i, n) => {
      i._idx = n;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(e) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: e,
      cancelable: !0
    }) !== !1) {
      for (let t = 0, o = this.data.datasets.length; t < o; ++t)
        this.getDatasetMeta(t).controller.configure();
      for (let t = 0, o = this.data.datasets.length; t < o; ++t)
        this._updateDataset(t, kt(e) ? e({
          datasetIndex: t
        }) : e);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: e
      });
    }
  }
  _updateDataset(e, t) {
    const o = this.getDatasetMeta(e), i = {
      meta: o,
      index: e,
      mode: t,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", i) !== !1 && (o.controller._update(t), i.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", i));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (at.has(this) ? this.attached && !at.running(this) && at.start(this) : (this.draw(), ql({
      chart: this
    })));
  }
  draw() {
    let e;
    if (this._resizeBeforeDraw) {
      const { width: o, height: i } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(o, i);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this._layers;
    for (e = 0; e < t.length && t[e].z <= 0; ++e)
      t[e].draw(this.chartArea);
    for (this._drawDatasets(); e < t.length; ++e)
      t[e].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(e) {
    const t = this._sortedMetasets, o = [];
    let i, n;
    for (i = 0, n = t.length; i < n; ++i) {
      const s = t[i];
      (!e || s.visible) && o.push(s);
    }
    return o;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const e = this.getSortedVisibleDatasetMetas();
    for (let t = e.length - 1; t >= 0; --t)
      this._drawDataset(e[t]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(e) {
    const t = this.ctx, o = {
      meta: e,
      index: e.index,
      cancelable: !0
    }, i = fd(this, e);
    this.notifyPlugins("beforeDatasetDraw", o) !== !1 && (i && ln(t, i), e.controller.draw(), i && dn(t), o.cancelable = !1, this.notifyPlugins("afterDatasetDraw", o));
  }
  isPointInArea(e) {
    return pt(e, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e, t, o, i) {
    const n = y5.modes[t];
    return typeof n == "function" ? n(this, e, o, i) : [];
  }
  getDatasetMeta(e) {
    const t = this.data.datasets[e], o = this._metasets;
    let i = o.filter((n) => n && n._dataset === t).pop();
    return i || (i = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: t && t.order || 0,
      index: e,
      _dataset: t,
      _parsed: [],
      _sorted: !1
    }, o.push(i)), i;
  }
  getContext() {
    return this.$context || (this.$context = Ht(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(e) {
    const t = this.data.datasets[e];
    if (!t)
      return !1;
    const o = this.getDatasetMeta(e);
    return typeof o.hidden == "boolean" ? !o.hidden : !t.hidden;
  }
  setDatasetVisibility(e, t) {
    const o = this.getDatasetMeta(e);
    o.hidden = !t;
  }
  toggleDataVisibility(e) {
    this._hiddenIndices[e] = !this._hiddenIndices[e];
  }
  getDataVisibility(e) {
    return !this._hiddenIndices[e];
  }
  _updateVisibility(e, t, o) {
    const i = o ? "show" : "hide", n = this.getDatasetMeta(e), s = n.controller._resolveAnimations(void 0, i);
    Mi(t) ? (n.data[t].hidden = !o, this.update()) : (this.setDatasetVisibility(e, o), s.update(n, {
      visible: o
    }), this.update((a) => a.datasetIndex === e ? i : void 0));
  }
  hide(e, t) {
    this._updateVisibility(e, t, !1);
  }
  show(e, t) {
    this._updateVisibility(e, t, !0);
  }
  _destroyDatasetMeta(e) {
    const t = this._metasets[e];
    t && t.controller && t.controller._destroy(), delete this._metasets[e];
  }
  _stop() {
    let e, t;
    for (this.stop(), at.remove(this), e = 0, t = this.data.datasets.length; e < t; ++e)
      this._destroyDatasetMeta(e);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: e, ctx: t } = this;
    this._stop(), this.config.clearCache(), e && (this.unbindEvents(), pl(e, t), this.platform.releaseContext(t), this.canvas = null, this.ctx = null), delete xo[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...e) {
    return this.canvas.toDataURL(...e);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const e = this._listeners, t = this.platform, o = (n, s) => {
      t.addEventListener(this, n, s), e[n] = s;
    }, i = (n, s, a) => {
      n.offsetX = s, n.offsetY = a, this._eventHandler(n);
    };
    N(this.options.events, (n) => o(n, i));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const e = this._responsiveListeners, t = this.platform, o = (c, l) => {
      t.addEventListener(this, c, l), e[c] = l;
    }, i = (c, l) => {
      e[c] && (t.removeEventListener(this, c, l), delete e[c]);
    }, n = (c, l) => {
      this.canvas && this.resize(c, l);
    };
    let s;
    const a = () => {
      i("attach", a), this.attached = !0, this.resize(), o("resize", n), o("detach", s);
    };
    s = () => {
      this.attached = !1, i("resize", n), this._stop(), this._resize(0, 0), o("attach", a);
    }, t.isAttached(this.canvas) ? a() : s();
  }
  unbindEvents() {
    N(this._listeners, (e, t) => {
      this.platform.removeEventListener(this, t, e);
    }), this._listeners = {}, N(this._responsiveListeners, (e, t) => {
      this.platform.removeEventListener(this, t, e);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(e, t, o) {
    const i = o ? "set" : "remove";
    let n, s, a, c;
    for (t === "dataset" && (n = this.getDatasetMeta(e[0].datasetIndex), n.controller["_" + i + "DatasetHoverStyle"]()), a = 0, c = e.length; a < c; ++a) {
      s = e[a];
      const l = s && this.getDatasetMeta(s.datasetIndex).controller;
      l && l[i + "HoverStyle"](s.element, s.datasetIndex, s.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e) {
    const t = this._active || [], o = e.map(({ datasetIndex: n, index: s }) => {
      const a = this.getDatasetMeta(n);
      if (!a)
        throw new Error("No dataset found at index " + n);
      return {
        datasetIndex: n,
        element: a.data[s],
        index: s
      };
    });
    !Lo(o, t) && (this._active = o, this._lastEvent = null, this._updateHoverStyles(o, t));
  }
  notifyPlugins(e, t, o) {
    return this._plugins.notify(this, e, t, o);
  }
  isPluginEnabled(e) {
    return this._plugins._cache.filter((t) => t.plugin.id === e).length === 1;
  }
  _updateHoverStyles(e, t, o) {
    const i = this.options.hover, n = (c, l) => c.filter((d) => !l.some((h) => d.datasetIndex === h.datasetIndex && d.index === h.index)), s = n(t, e), a = o ? e : n(e, t);
    s.length && this.updateHoverStyle(s, i.mode, !1), a.length && i.mode && this.updateHoverStyle(a, i.mode, !0);
  }
  _eventHandler(e, t) {
    const o = {
      event: e,
      replay: t,
      cancelable: !0,
      inChartArea: this.isPointInArea(e)
    }, i = (s) => (s.options.events || this.options.events).includes(e.native.type);
    if (this.notifyPlugins("beforeEvent", o, i) === !1)
      return;
    const n = this._handleEvent(e, t, o.inChartArea);
    return o.cancelable = !1, this.notifyPlugins("afterEvent", o, i), (n || o.changed) && this.render(), this;
  }
  _handleEvent(e, t, o) {
    const { _active: i = [], options: n } = this, s = t, a = this._getActiveElements(e, i, o, s), c = A2(e), l = _3(e, this._lastEvent, o, c);
    o && (this._lastEvent = null, j(n.onHover, [
      e,
      a,
      this
    ], this), c && j(n.onClick, [
      e,
      a,
      this
    ], this));
    const d = !Lo(a, i);
    return (d || t) && (this._active = a, this._updateHoverStyles(a, i, t)), this._lastEvent = l, d;
  }
  _getActiveElements(e, t, o, i) {
    if (e.type === "mouseout")
      return [];
    if (!o)
      return t;
    const n = this.options.hover;
    return this.getElementsAtEventForMode(e, n.mode, n, i);
  }
};
gt.defaults = Y, gt.instances = xo, gt.overrides = tr, gt.registry = Ke, gt.version = v3, gt.getChart = Ul;
let Pi = gt;
function Yl() {
  return N(Pi.instances, (r) => r._plugins.invalidate());
}
function w3(r, e, t) {
  const { startAngle: o, x: i, y: n, outerRadius: s, innerRadius: a, options: c } = e, { borderWidth: l, borderJoinStyle: d } = c, h = Math.min(l / s, be(o - t));
  if (r.beginPath(), r.arc(i, n, s - l / 2, o + h / 2, t - h / 2), a > 0) {
    const p = Math.min(l / a, be(o - t));
    r.arc(i, n, a + l / 2, t - p / 2, o + p / 2, !0);
  } else {
    const p = Math.min(l / 2, s * be(o - t));
    if (d === "round")
      r.arc(i, n, p, t - V / 2, o + V / 2, !0);
    else if (d === "bevel") {
      const g = 2 * p * p, b = -g * Math.cos(t + V / 2) + i, m = -g * Math.sin(t + V / 2) + n, v = g * Math.cos(o + V / 2) + i, y = g * Math.sin(o + V / 2) + n;
      r.lineTo(b, m), r.lineTo(v, y);
    }
  }
  r.closePath(), r.moveTo(0, 0), r.rect(0, 0, r.canvas.width, r.canvas.height), r.clip("evenodd");
}
function k3(r, e, t) {
  const { startAngle: o, pixelMargin: i, x: n, y: s, outerRadius: a, innerRadius: c } = e;
  let l = i / a;
  r.beginPath(), r.arc(n, s, a, o - l, t + l), c > i ? (l = i / c, r.arc(n, s, c, t + l, o - l, !0)) : r.arc(n, s, i, t + re, o - re), r.closePath(), r.clip();
}
function $3(r) {
  return Vs(r, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function M3(r, e, t, o) {
  const i = $3(r.options.borderRadius), n = (t - e) / 2, s = Math.min(n, o * e / 2), a = (c) => {
    const l = (t - Math.min(n, c)) * o / 2;
    return ce(c, 0, Math.min(n, l));
  };
  return {
    outerStart: a(i.outerStart),
    outerEnd: a(i.outerEnd),
    innerStart: ce(i.innerStart, 0, s),
    innerEnd: ce(i.innerEnd, 0, s)
  };
}
function mr(r, e, t, o) {
  return {
    x: t + r * Math.cos(e),
    y: o + r * Math.sin(e)
  };
}
function Oo(r, e, t, o, i, n) {
  const { x: s, y: a, startAngle: c, pixelMargin: l, innerRadius: d } = e, h = Math.max(e.outerRadius + o + t - l, 0), p = d > 0 ? d + o + t + l : 0;
  let g = 0;
  const b = i - c;
  if (o) {
    const z = d > 0 ? d - o : 0, q = h > 0 ? h - o : 0, te = (z + q) / 2, Fe = te !== 0 ? b * te / (te + o) : b;
    g = (b - Fe) / 2;
  }
  const m = Math.max(1e-3, b * h - t / V) / h, v = (b - m) / 2, y = c + v + g, C = i - v - g, { outerStart: w, outerEnd: _, innerStart: x, innerEnd: L } = M3(e, p, h, C - y), S = h - w, A = h - _, P = y + w / S, D = C - _ / A, O = p + x, B = p + L, he = y + x / O, Ae = C - L / B;
  if (r.beginPath(), n) {
    const z = (P + D) / 2;
    if (r.arc(s, a, h, P, z), r.arc(s, a, h, z, D), _ > 0) {
      const fe = mr(A, D, s, a);
      r.arc(fe.x, fe.y, _, D, C + re);
    }
    const q = mr(B, C, s, a);
    if (r.lineTo(q.x, q.y), L > 0) {
      const fe = mr(B, Ae, s, a);
      r.arc(fe.x, fe.y, L, C + re, Ae + Math.PI);
    }
    const te = (C - L / p + (y + x / p)) / 2;
    if (r.arc(s, a, p, C - L / p, te, !0), r.arc(s, a, p, te, y + x / p, !0), x > 0) {
      const fe = mr(O, he, s, a);
      r.arc(fe.x, fe.y, x, he + Math.PI, y - re);
    }
    const Fe = mr(S, y, s, a);
    if (r.lineTo(Fe.x, Fe.y), w > 0) {
      const fe = mr(S, P, s, a);
      r.arc(fe.x, fe.y, w, y - re, P);
    }
  } else {
    r.moveTo(s, a);
    const z = Math.cos(P) * h + s, q = Math.sin(P) * h + a;
    r.lineTo(z, q);
    const te = Math.cos(D) * h + s, Fe = Math.sin(D) * h + a;
    r.lineTo(te, Fe);
  }
  r.closePath();
}
function L3(r, e, t, o, i) {
  const { fullCircles: n, startAngle: s, circumference: a } = e;
  let c = e.endAngle;
  if (n) {
    Oo(r, e, t, o, c, i);
    for (let l = 0; l < n; ++l)
      r.fill();
    isNaN(a) || (c = s + (a % W || W));
  }
  return Oo(r, e, t, o, c, i), r.fill(), c;
}
function S3(r, e, t, o, i) {
  const { fullCircles: n, startAngle: s, circumference: a, options: c } = e, { borderWidth: l, borderJoinStyle: d, borderDash: h, borderDashOffset: p, borderRadius: g } = c, b = c.borderAlign === "inner";
  if (!l)
    return;
  r.setLineDash(h || []), r.lineDashOffset = p, b ? (r.lineWidth = l * 2, r.lineJoin = d || "round") : (r.lineWidth = l, r.lineJoin = d || "bevel");
  let m = e.endAngle;
  if (n) {
    Oo(r, e, t, o, m, i);
    for (let v = 0; v < n; ++v)
      r.stroke();
    isNaN(a) || (m = s + (a % W || W));
  }
  b && k3(r, e, m), c.selfJoin && m - s >= V && g === 0 && d !== "miter" && w3(r, e, m), n || (Oo(r, e, t, o, m, i), r.stroke());
}
const Cr = class Cr extends je {
  constructor(e) {
    super(), this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, e && Object.assign(this, e);
  }
  inRange(e, t, o) {
    const i = this.getProps([
      "x",
      "y"
    ], o), { angle: n, distance: s } = U1(i, {
      x: e,
      y: t
    }), { startAngle: a, endAngle: c, innerRadius: l, outerRadius: d, circumference: h } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], o), p = (this.options.spacing + this.options.borderWidth) / 2, g = E(h, c - a), b = Li(n, a, c) && a !== c, m = g >= W || b, v = ht(s, l + p, d + p);
    return m && v;
  }
  getCenterPoint(e) {
    const { x: t, y: o, startAngle: i, endAngle: n, innerRadius: s, outerRadius: a } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], e), { offset: c, spacing: l } = this.options, d = (i + n) / 2, h = (s + a + l + c) / 2;
    return {
      x: t + Math.cos(d) * h,
      y: o + Math.sin(d) * h
    };
  }
  tooltipPosition(e) {
    return this.getCenterPoint(e);
  }
  draw(e) {
    const { options: t, circumference: o } = this, i = (t.offset || 0) / 4, n = (t.spacing || 0) / 2, s = t.circular;
    if (this.pixelMargin = t.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = o > W ? Math.floor(o / W) : 0, o === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    e.save();
    const a = (this.startAngle + this.endAngle) / 2;
    e.translate(Math.cos(a) * i, Math.sin(a) * i);
    const c = 1 - Math.sin(Math.min(V, o || 0)), l = i * c;
    e.fillStyle = t.backgroundColor, e.strokeStyle = t.borderColor, L3(e, this, l, n, s), S3(e, this, l, n, s), e.restore();
  }
};
Cr.id = "arc", Cr.defaults = {
  borderAlign: "center",
  borderColor: "#fff",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
  circular: !0,
  selfJoin: !1
}, Cr.defaultRoutes = {
  backgroundColor: "backgroundColor"
}, Cr.descriptors = {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash"
};
let es = Cr;
function Ld(r, e, t = e) {
  r.lineCap = E(t.borderCapStyle, e.borderCapStyle), r.setLineDash(E(t.borderDash, e.borderDash)), r.lineDashOffset = E(t.borderDashOffset, e.borderDashOffset), r.lineJoin = E(t.borderJoinStyle, e.borderJoinStyle), r.lineWidth = E(t.borderWidth, e.borderWidth), r.strokeStyle = E(t.borderColor, e.borderColor);
}
function A3(r, e, t) {
  r.lineTo(t.x, t.y);
}
function T3(r) {
  return r.stepped ? J2 : r.tension || r.cubicInterpolationMode === "monotone" ? Q2 : A3;
}
function Sd(r, e, t = {}) {
  const o = r.length, { start: i = 0, end: n = o - 1 } = t, { start: s, end: a } = e, c = Math.max(i, s), l = Math.min(n, a), d = i < s && n < s || i > a && n > a;
  return {
    count: o,
    start: c,
    loop: e.loop,
    ilen: l < c && !d ? o + l - c : l - c
  };
}
function P3(r, e, t, o) {
  const { points: i, options: n } = e, { count: s, start: a, loop: c, ilen: l } = Sd(i, t, o), d = T3(n);
  let { move: h = !0, reverse: p } = o || {}, g, b, m;
  for (g = 0; g <= l; ++g)
    b = i[(a + (p ? l - g : g)) % s], !b.skip && (h ? (r.moveTo(b.x, b.y), h = !1) : d(r, m, b, p, n.stepped), m = b);
  return c && (b = i[(a + (p ? l : 0)) % s], d(r, m, b, p, n.stepped)), !!c;
}
function E3(r, e, t, o) {
  const i = e.points, { count: n, start: s, ilen: a } = Sd(i, t, o), { move: c = !0, reverse: l } = o || {};
  let d = 0, h = 0, p, g, b, m, v, y;
  const C = (_) => (s + (l ? a - _ : _)) % n, w = () => {
    m !== v && (r.lineTo(d, v), r.lineTo(d, m), r.lineTo(d, y));
  };
  for (c && (g = i[C(0)], r.moveTo(g.x, g.y)), p = 0; p <= a; ++p) {
    if (g = i[C(p)], g.skip)
      continue;
    const _ = g.x, x = g.y, L = _ | 0;
    L === b ? (x < m ? m = x : x > v && (v = x), d = (h * d + _) / ++h) : (w(), r.lineTo(_, x), b = L, h = 0, m = v = x), y = x;
  }
  w();
}
function ts(r) {
  const e = r.options, t = e.borderDash && e.borderDash.length;
  return !r._decimated && !r._loop && !e.tension && e.cubicInterpolationMode !== "monotone" && !e.stepped && !t ? E3 : P3;
}
function D3(r) {
  return r.stepped ? P0 : r.tension || r.cubicInterpolationMode === "monotone" ? E0 : Ut;
}
function O3(r, e, t, o) {
  let i = e._path;
  i || (i = e._path = new Path2D(), e.path(i, t, o) && i.closePath()), Ld(r, e.options), r.stroke(i);
}
function H3(r, e, t, o) {
  const { segments: i, options: n } = e, s = ts(e);
  for (const a of i)
    Ld(r, n, a.style), r.beginPath(), s(r, e, a, {
      start: t,
      end: t + o - 1
    }) && r.closePath(), r.stroke();
}
const I3 = typeof Path2D == "function";
function B3(r, e, t, o) {
  I3 && !e.options.segment ? O3(r, e, t, o) : H3(r, e, t, o);
}
const xr = class xr extends je {
  constructor(e) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, e && Object.assign(this, e);
  }
  updateControlPoints(e, t) {
    const o = this.options;
    if ((o.tension || o.cubicInterpolationMode === "monotone") && !o.stepped && !this._pointsUpdated) {
      const i = o.spanGaps ? this._loop : this._fullLoop;
      w0(this._points, o, e, i, t), this._pointsUpdated = !0;
    }
  }
  set points(e) {
    this._points = e, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = V0(this, this.options.segment));
  }
  first() {
    const e = this.segments, t = this.points;
    return e.length && t[e[0].start];
  }
  last() {
    const e = this.segments, t = this.points, o = e.length;
    return o && t[e[o - 1].end];
  }
  interpolate(e, t) {
    const o = this.options, i = e[t], n = this.points, s = pd(this, {
      property: t,
      start: i,
      end: i
    });
    if (!s.length)
      return;
    const a = [], c = D3(o);
    let l, d;
    for (l = 0, d = s.length; l < d; ++l) {
      const { start: h, end: p } = s[l], g = n[h], b = n[p];
      if (g === b) {
        a.push(g);
        continue;
      }
      const m = Math.abs((i - g[t]) / (b[t] - g[t])), v = c(g, b, m, o.stepped);
      v[t] = e[t], a.push(v);
    }
    return a.length === 1 ? a[0] : a;
  }
  pathSegment(e, t, o) {
    return ts(this)(e, this, t, o);
  }
  path(e, t, o) {
    const i = this.segments, n = ts(this);
    let s = this._loop;
    t = t || 0, o = o || this.points.length - t;
    for (const a of i)
      s &= n(e, this, a, {
        start: t,
        end: t + o - 1
      });
    return !!s;
  }
  draw(e, t, o, i) {
    const n = this.options || {};
    (this.points || []).length && n.borderWidth && (e.save(), B3(e, this, o, i), e.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
};
xr.id = "line", xr.defaults = {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
}, xr.defaultRoutes = {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}, xr.descriptors = {
  _scriptable: !0,
  _indexable: (e) => e !== "borderDash" && e !== "fill"
};
let Pr = xr;
function Xl(r, e, t, o) {
  const i = r.options, { [t]: n } = r.getProps([
    t
  ], o);
  return Math.abs(e - n) < i.radius + i.hitRadius;
}
const fi = class fi extends je {
  constructor(e) {
    super(), this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, e && Object.assign(this, e);
  }
  inRange(e, t, o) {
    const i = this.options, { x: n, y: s } = this.getProps([
      "x",
      "y"
    ], o);
    return Math.pow(e - n, 2) + Math.pow(t - s, 2) < Math.pow(i.hitRadius + i.radius, 2);
  }
  inXRange(e, t) {
    return Xl(this, e, "x", t);
  }
  inYRange(e, t) {
    return Xl(this, e, "y", t);
  }
  getCenterPoint(e) {
    const { x: t, y: o } = this.getProps([
      "x",
      "y"
    ], e);
    return {
      x: t,
      y: o
    };
  }
  size(e) {
    e = e || this.options || {};
    let t = e.radius || 0;
    t = Math.max(t, t && e.hoverRadius || 0);
    const o = t && e.borderWidth || 0;
    return (t + o) * 2;
  }
  draw(e, t) {
    const o = this.options;
    this.skip || o.radius < 0.1 || !pt(this, t, this.size(o) / 2) || (e.strokeStyle = o.borderColor, e.lineWidth = o.borderWidth, e.fillStyle = o.backgroundColor, Wn(e, o, this.x, this.y));
  }
  getRange() {
    const e = this.options || {};
    return e.radius + e.hitRadius;
  }
};
fi.id = "point", fi.defaults = {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
}, fi.defaultRoutes = {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
};
let rs = fi;
function Ad(r, e) {
  const { x: t, y: o, base: i, width: n, height: s } = r.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], e);
  let a, c, l, d, h;
  return r.horizontal ? (h = s / 2, a = Math.min(t, i), c = Math.max(t, i), l = o - h, d = o + h) : (h = n / 2, a = t - h, c = t + h, l = Math.min(o, i), d = Math.max(o, i)), {
    left: a,
    top: l,
    right: c,
    bottom: d
  };
}
function Ct(r, e, t, o) {
  return r ? 0 : ce(e, t, o);
}
function V3(r, e, t) {
  const o = r.options.borderWidth, i = r.borderSkipped, n = rd(o);
  return {
    t: Ct(i.top, n.top, 0, t),
    r: Ct(i.right, n.right, 0, e),
    b: Ct(i.bottom, n.bottom, 0, t),
    l: Ct(i.left, n.left, 0, e)
  };
}
function N3(r, e, t) {
  const { enableBorderRadius: o } = r.getProps([
    "enableBorderRadius"
  ]), i = r.options.borderRadius, n = Xt(i), s = Math.min(e, t), a = r.borderSkipped, c = o || I(i);
  return {
    topLeft: Ct(!c || a.top || a.left, n.topLeft, 0, s),
    topRight: Ct(!c || a.top || a.right, n.topRight, 0, s),
    bottomLeft: Ct(!c || a.bottom || a.left, n.bottomLeft, 0, s),
    bottomRight: Ct(!c || a.bottom || a.right, n.bottomRight, 0, s)
  };
}
function R3(r) {
  const e = Ad(r), t = e.right - e.left, o = e.bottom - e.top, i = V3(r, t / 2, o / 2), n = N3(r, t / 2, o / 2);
  return {
    outer: {
      x: e.left,
      y: e.top,
      w: t,
      h: o,
      radius: n
    },
    inner: {
      x: e.left + i.l,
      y: e.top + i.t,
      w: t - i.l - i.r,
      h: o - i.t - i.b,
      radius: {
        topLeft: Math.max(0, n.topLeft - Math.max(i.t, i.l)),
        topRight: Math.max(0, n.topRight - Math.max(i.t, i.r)),
        bottomLeft: Math.max(0, n.bottomLeft - Math.max(i.b, i.l)),
        bottomRight: Math.max(0, n.bottomRight - Math.max(i.b, i.r))
      }
    }
  };
}
function Dn(r, e, t, o) {
  const i = e === null, n = t === null, a = r && !(i && n) && Ad(r, o);
  return a && (i || ht(e, a.left, a.right)) && (n || ht(t, a.top, a.bottom));
}
function z3(r) {
  return r.topLeft || r.topRight || r.bottomLeft || r.bottomRight;
}
function F3(r, e) {
  r.rect(e.x, e.y, e.w, e.h);
}
function On(r, e, t = {}) {
  const o = r.x !== t.x ? -e : 0, i = r.y !== t.y ? -e : 0, n = (r.x + r.w !== t.x + t.w ? e : 0) - o, s = (r.y + r.h !== t.y + t.h ? e : 0) - i;
  return {
    x: r.x + o,
    y: r.y + i,
    w: r.w + n,
    h: r.h + s,
    radius: r.radius
  };
}
const gi = class gi extends je {
  constructor(e) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, e && Object.assign(this, e);
  }
  draw(e) {
    const { inflateAmount: t, options: { borderColor: o, backgroundColor: i } } = this, { inner: n, outer: s } = R3(this), a = z3(s.radius) ? Si : F3;
    e.save(), (s.w !== n.w || s.h !== n.h) && (e.beginPath(), a(e, On(s, t, n)), e.clip(), a(e, On(n, -t, s)), e.fillStyle = o, e.fill("evenodd")), e.beginPath(), a(e, On(n, t)), e.fillStyle = i, e.fill(), e.restore();
  }
  inRange(e, t, o) {
    return Dn(this, e, t, o);
  }
  inXRange(e, t) {
    return Dn(this, e, null, t);
  }
  inYRange(e, t) {
    return Dn(this, null, e, t);
  }
  getCenterPoint(e) {
    const { x: t, y: o, base: i, horizontal: n } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], e);
    return {
      x: n ? (t + i) / 2 : t,
      y: n ? o : (o + i) / 2
    };
  }
  getRange(e) {
    return e === "x" ? this.width / 2 : this.height / 2;
  }
};
gi.id = "bar", gi.defaults = {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}, gi.defaultRoutes = {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
};
let is = gi;
var Z3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement: es,
  BarElement: is,
  LineElement: Pr,
  PointElement: rs
});
const os = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], Kl = /* @__PURE__ */ os.map((r) => r.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function Td(r) {
  return os[r % os.length];
}
function Pd(r) {
  return Kl[r % Kl.length];
}
function j3(r, e) {
  return r.borderColor = Td(e), r.backgroundColor = Pd(e), ++e;
}
function W3(r, e) {
  return r.backgroundColor = r.data.map(() => Td(e++)), e;
}
function q3(r, e) {
  return r.backgroundColor = r.data.map(() => Pd(e++)), e;
}
function U3(r) {
  let e = 0;
  return (t, o) => {
    const i = r.getDatasetMeta(o).controller;
    i instanceof Ai ? e = W3(t, e) : i instanceof Eo ? e = q3(t, e) : i && (e = j3(t, e));
  };
}
function Gl(r) {
  let e;
  for (e in r)
    if (r[e].borderColor || r[e].backgroundColor)
      return !0;
  return !1;
}
function Y3(r) {
  return r && (r.borderColor || r.backgroundColor);
}
function X3() {
  return Y.borderColor !== "rgba(0,0,0,0.1)" || Y.backgroundColor !== "rgba(0,0,0,0.1)";
}
var K3 = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(r, e, t) {
    if (!t.enabled)
      return;
    const { data: { datasets: o }, options: i } = r.config, { elements: n } = i, s = Gl(o) || Y3(i) || n && Gl(n) || X3();
    if (!t.forceOverride && s)
      return;
    const a = U3(r);
    o.forEach(a);
  }
};
function G3(r, e, t, o, i) {
  const n = i.samples || o;
  if (n >= t)
    return r.slice(e, e + t);
  const s = [], a = (t - 2) / (n - 2);
  let c = 0;
  const l = e + t - 1;
  let d = e, h, p, g, b, m;
  for (s[c++] = r[d], h = 0; h < n - 2; h++) {
    let v = 0, y = 0, C;
    const w = Math.floor((h + 1) * a) + 1 + e, _ = Math.min(Math.floor((h + 2) * a) + 1, t) + e, x = _ - w;
    for (C = w; C < _; C++)
      v += r[C].x, y += r[C].y;
    v /= x, y /= x;
    const L = Math.floor(h * a) + 1 + e, S = Math.min(Math.floor((h + 1) * a) + 1, t) + e, { x: A, y: P } = r[d];
    for (g = b = -1, C = L; C < S; C++)
      b = 0.5 * Math.abs((A - v) * (r[C].y - P) - (A - r[C].x) * (y - P)), b > g && (g = b, p = r[C], m = C);
    s[c++] = p, d = m;
  }
  return s[c++] = r[l], s;
}
function J3(r, e, t, o) {
  let i = 0, n = 0, s, a, c, l, d, h, p, g, b, m;
  const v = [], y = e + t - 1, C = r[e].x, _ = r[y].x - C;
  for (s = e; s < e + t; ++s) {
    a = r[s], c = (a.x - C) / _ * o, l = a.y;
    const x = c | 0;
    if (x === d)
      l < b ? (b = l, h = s) : l > m && (m = l, p = s), i = (n * i + a.x) / ++n;
    else {
      const L = s - 1;
      if (!H(h) && !H(p)) {
        const S = Math.min(h, p), A = Math.max(h, p);
        S !== g && S !== L && v.push({
          ...r[S],
          x: i
        }), A !== g && A !== L && v.push({
          ...r[A],
          x: i
        });
      }
      s > 0 && L !== g && v.push(r[L]), v.push(a), d = x, n = 0, b = m = l, h = p = g = s;
    }
  }
  return v;
}
function Ed(r) {
  if (r._decimated) {
    const e = r._data;
    delete r._decimated, delete r._data, Object.defineProperty(r, "data", {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: e
    });
  }
}
function Jl(r) {
  r.data.datasets.forEach((e) => {
    Ed(e);
  });
}
function Q3(r, e) {
  const t = e.length;
  let o = 0, i;
  const { iScale: n } = r, { min: s, max: a, minDefined: c, maxDefined: l } = n.getUserBounds();
  return c && (o = ce(ut(e, n.axis, s).lo, 0, t - 1)), l ? i = ce(ut(e, n.axis, a).hi + 1, o, t) - o : i = t - o, {
    start: o,
    count: i
  };
}
var eu = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: !1
  },
  beforeElementsUpdate: (r, e, t) => {
    if (!t.enabled) {
      Jl(r);
      return;
    }
    const o = r.width;
    r.data.datasets.forEach((i, n) => {
      const { _data: s, indexAxis: a } = i, c = r.getDatasetMeta(n), l = s || i.data;
      if (Jr([
        a,
        r.options.indexAxis
      ]) === "y" || !c.controller.supportsDecimation)
        return;
      const d = r.scales[c.xAxisID];
      if (d.type !== "linear" && d.type !== "time" || r.options.parsing)
        return;
      let { start: h, count: p } = Q3(c, l);
      const g = t.threshold || 4 * o;
      if (p <= g) {
        Ed(i);
        return;
      }
      H(s) && (i._data = l, delete i.data, Object.defineProperty(i, "data", {
        configurable: !0,
        enumerable: !0,
        get: function() {
          return this._decimated;
        },
        set: function(m) {
          this._data = m;
        }
      }));
      let b;
      switch (t.algorithm) {
        case "lttb":
          b = G3(l, h, p, o, t);
          break;
        case "min-max":
          b = J3(l, h, p, o);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${t.algorithm}'`);
      }
      i._decimated = b;
    });
  },
  destroy(r) {
    Jl(r);
  }
};
function tu(r, e, t) {
  const o = r.segments, i = r.points, n = e.points, s = [];
  for (const a of o) {
    let { start: c, end: l } = a;
    l = pn(c, l, i);
    const d = ns(t, i[c], i[l], a.loop);
    if (!e.segments) {
      s.push({
        source: a,
        target: d,
        start: i[c],
        end: i[l]
      });
      continue;
    }
    const h = pd(e, d);
    for (const p of h) {
      const g = ns(t, n[p.start], n[p.end], p.loop), b = ud(a, i, g);
      for (const m of b)
        s.push({
          source: m,
          target: p,
          start: {
            [t]: Ql(d, g, "start", Math.max)
          },
          end: {
            [t]: Ql(d, g, "end", Math.min)
          }
        });
    }
  }
  return s;
}
function ns(r, e, t, o) {
  if (o)
    return;
  let i = e[r], n = t[r];
  return r === "angle" && (i = be(i), n = be(n)), {
    property: r,
    start: i,
    end: n
  };
}
function ru(r, e) {
  const { x: t = null, y: o = null } = r || {}, i = e.points, n = [];
  return e.segments.forEach(({ start: s, end: a }) => {
    a = pn(s, a, i);
    const c = i[s], l = i[a];
    o !== null ? (n.push({
      x: c.x,
      y: o
    }), n.push({
      x: l.x,
      y: o
    })) : t !== null && (n.push({
      x: t,
      y: c.y
    }), n.push({
      x: t,
      y: l.y
    }));
  }), n;
}
function pn(r, e, t) {
  for (; e > r; e--) {
    const o = t[e];
    if (!isNaN(o.x) && !isNaN(o.y))
      break;
  }
  return e;
}
function Ql(r, e, t, o) {
  return r && e ? o(r[t], e[t]) : r ? r[t] : e ? e[t] : 0;
}
function Dd(r, e) {
  let t = [], o = !1;
  return U(r) ? (o = !0, t = r) : t = ru(r, e), t.length ? new Pr({
    points: t,
    options: {
      tension: 0
    },
    _loop: o,
    _fullLoop: o
  }) : null;
}
function e1(r) {
  return r && r.fill !== !1;
}
function iu(r, e, t) {
  let i = r[e].fill;
  const n = [
    e
  ];
  let s;
  if (!t)
    return i;
  for (; i !== !1 && n.indexOf(i) === -1; ) {
    if (!Q(i))
      return i;
    if (s = r[i], !s)
      return !1;
    if (s.visible)
      return i;
    n.push(i), i = s.fill;
  }
  return !1;
}
function ou(r, e, t) {
  const o = cu(r);
  if (I(o))
    return isNaN(o.value) ? !1 : o;
  let i = parseFloat(o);
  return Q(i) && Math.floor(i) === i ? nu(o[0], e, i, t) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(o) >= 0 && o;
}
function nu(r, e, t, o) {
  return (r === "-" || r === "+") && (t = e + t), t === e || t < 0 || t >= o ? !1 : t;
}
function su(r, e) {
  let t = null;
  return r === "start" ? t = e.bottom : r === "end" ? t = e.top : I(r) ? t = e.getPixelForValue(r.value) : e.getBasePixel && (t = e.getBasePixel()), t;
}
function au(r, e, t) {
  let o;
  return r === "start" ? o = t : r === "end" ? o = e.options.reverse ? e.min : e.max : I(r) ? o = r.value : o = e.getBaseValue(), o;
}
function cu(r) {
  const e = r.options, t = e.fill;
  let o = E(t && t.target, t);
  return o === void 0 && (o = !!e.backgroundColor), o === !1 || o === null ? !1 : o === !0 ? "origin" : o;
}
function lu(r) {
  const { scale: e, index: t, line: o } = r, i = [], n = o.segments, s = o.points, a = du(e, t);
  a.push(Dd({
    x: null,
    y: e.bottom
  }, o));
  for (let c = 0; c < n.length; c++) {
    const l = n[c];
    for (let d = l.start; d <= l.end; d++)
      hu(i, s[d], a);
  }
  return new Pr({
    points: i,
    options: {}
  });
}
function du(r, e) {
  const t = [], o = r.getMatchingVisibleMetas("line");
  for (let i = 0; i < o.length; i++) {
    const n = o[i];
    if (n.index === e)
      break;
    n.hidden || t.unshift(n.dataset);
  }
  return t;
}
function hu(r, e, t) {
  const o = [];
  for (let i = 0; i < t.length; i++) {
    const n = t[i], { first: s, last: a, point: c } = uu(n, e, "x");
    if (!(!c || s && a)) {
      if (s)
        o.unshift(c);
      else if (r.push(c), !a)
        break;
    }
  }
  r.push(...o);
}
function uu(r, e, t) {
  const o = r.interpolate(e, t);
  if (!o)
    return {};
  const i = o[t], n = r.segments, s = r.points;
  let a = !1, c = !1;
  for (let l = 0; l < n.length; l++) {
    const d = n[l], h = s[d.start][t], p = s[d.end][t];
    if (ht(i, h, p)) {
      a = i === h, c = i === p;
      break;
    }
  }
  return {
    first: a,
    last: c,
    point: o
  };
}
class Od {
  constructor(e) {
    this.x = e.x, this.y = e.y, this.radius = e.radius;
  }
  pathSegment(e, t, o) {
    const { x: i, y: n, radius: s } = this;
    return t = t || {
      start: 0,
      end: W
    }, e.arc(i, n, s, t.end, t.start, !0), !o.bounds;
  }
  interpolate(e) {
    const { x: t, y: o, radius: i } = this, n = e.angle;
    return {
      x: t + Math.cos(n) * i,
      y: o + Math.sin(n) * i,
      angle: n
    };
  }
}
function pu(r) {
  const { chart: e, fill: t, line: o } = r;
  if (Q(t))
    return fu(e, t);
  if (t === "stack")
    return lu(r);
  if (t === "shape")
    return !0;
  const i = gu(r);
  return i instanceof Od ? i : Dd(i, o);
}
function fu(r, e) {
  const t = r.getDatasetMeta(e);
  return t && r.isDatasetVisible(e) ? t.dataset : null;
}
function gu(r) {
  return (r.scale || {}).getPointPositionForValue ? mu(r) : bu(r);
}
function bu(r) {
  const { scale: e = {}, fill: t } = r, o = su(t, e);
  if (Q(o)) {
    const i = e.isHorizontal();
    return {
      x: i ? o : null,
      y: i ? null : o
    };
  }
  return null;
}
function mu(r) {
  const { scale: e, fill: t } = r, o = e.options, i = e.getLabels().length, n = o.reverse ? e.max : e.min, s = au(t, e, n), a = [];
  if (o.grid.circular) {
    const c = e.getPointPositionForValue(0, n);
    return new Od({
      x: c.x,
      y: c.y,
      radius: e.getDistanceFromCenterForValue(s)
    });
  }
  for (let c = 0; c < i; ++c)
    a.push(e.getPointPositionForValue(c, s));
  return a;
}
function Hn(r, e, t) {
  const o = pu(e), { chart: i, index: n, line: s, scale: a, axis: c } = e, l = s.options, d = l.fill, h = l.backgroundColor, { above: p = h, below: g = h } = d || {}, b = i.getDatasetMeta(n), m = fd(i, b);
  o && s.points.length && (ln(r, t), vu(r, {
    line: s,
    target: o,
    above: p,
    below: g,
    area: t,
    scale: a,
    axis: c,
    clip: m
  }), dn(r));
}
function vu(r, e) {
  const { line: t, target: o, above: i, below: n, area: s, scale: a, clip: c } = e, l = t._loop ? "angle" : e.axis;
  r.save();
  let d = n;
  n !== i && (l === "x" ? (t1(r, o, s.top), In(r, {
    line: t,
    target: o,
    color: i,
    scale: a,
    property: l,
    clip: c
  }), r.restore(), r.save(), t1(r, o, s.bottom)) : l === "y" && (r1(r, o, s.left), In(r, {
    line: t,
    target: o,
    color: n,
    scale: a,
    property: l,
    clip: c
  }), r.restore(), r.save(), r1(r, o, s.right), d = i)), In(r, {
    line: t,
    target: o,
    color: d,
    scale: a,
    property: l,
    clip: c
  }), r.restore();
}
function t1(r, e, t) {
  const { segments: o, points: i } = e;
  let n = !0, s = !1;
  r.beginPath();
  for (const a of o) {
    const { start: c, end: l } = a, d = i[c], h = i[pn(c, l, i)];
    n ? (r.moveTo(d.x, d.y), n = !1) : (r.lineTo(d.x, t), r.lineTo(d.x, d.y)), s = !!e.pathSegment(r, a, {
      move: s
    }), s ? r.closePath() : r.lineTo(h.x, t);
  }
  r.lineTo(e.first().x, t), r.closePath(), r.clip();
}
function r1(r, e, t) {
  const { segments: o, points: i } = e;
  let n = !0, s = !1;
  r.beginPath();
  for (const a of o) {
    const { start: c, end: l } = a, d = i[c], h = i[pn(c, l, i)];
    n ? (r.moveTo(d.x, d.y), n = !1) : (r.lineTo(t, d.y), r.lineTo(d.x, d.y)), s = !!e.pathSegment(r, a, {
      move: s
    }), s ? r.closePath() : r.lineTo(t, h.y);
  }
  r.lineTo(t, e.first().y), r.closePath(), r.clip();
}
function In(r, e) {
  const { line: t, target: o, property: i, color: n, scale: s, clip: a } = e, c = tu(t, o, i);
  for (const { source: l, target: d, start: h, end: p } of c) {
    const { style: { backgroundColor: g = n } = {} } = l, b = o !== !0;
    r.save(), r.fillStyle = g, yu(r, s, a, b && ns(i, h, p)), r.beginPath();
    const m = !!t.pathSegment(r, l);
    let v;
    if (b) {
      m ? r.closePath() : i1(r, o, p, i);
      const y = !!o.pathSegment(r, d, {
        move: m,
        reverse: !0
      });
      v = m && y, v || i1(r, o, h, i);
    }
    r.closePath(), r.fill(v ? "evenodd" : "nonzero"), r.restore();
  }
}
function yu(r, e, t, o) {
  const i = e.chart.chartArea, { property: n, start: s, end: a } = o || {};
  if (n === "x" || n === "y") {
    let c, l, d, h;
    n === "x" ? (c = s, l = i.top, d = a, h = i.bottom) : (c = i.left, l = s, d = i.right, h = a), r.beginPath(), t && (c = Math.max(c, t.left), d = Math.min(d, t.right), l = Math.max(l, t.top), h = Math.min(h, t.bottom)), r.rect(c, l, d - c, h - l), r.clip();
  }
}
function i1(r, e, t, o) {
  const i = e.interpolate(t, o);
  i && r.lineTo(i.x, i.y);
}
var Cu = {
  id: "filler",
  afterDatasetsUpdate(r, e, t) {
    const o = (r.data.datasets || []).length, i = [];
    let n, s, a, c;
    for (s = 0; s < o; ++s)
      n = r.getDatasetMeta(s), a = n.dataset, c = null, a && a.options && a instanceof Pr && (c = {
        visible: r.isDatasetVisible(s),
        index: s,
        fill: ou(a, s, o),
        chart: r,
        axis: n.controller.options.indexAxis,
        scale: n.vScale,
        line: a
      }), n.$filler = c, i.push(c);
    for (s = 0; s < o; ++s)
      c = i[s], !(!c || c.fill === !1) && (c.fill = iu(i, s, t.propagate));
  },
  beforeDraw(r, e, t) {
    const o = t.drawTime === "beforeDraw", i = r.getSortedVisibleDatasetMetas(), n = r.chartArea;
    for (let s = i.length - 1; s >= 0; --s) {
      const a = i[s].$filler;
      a && (a.line.updateControlPoints(n, a.axis), o && a.fill && Hn(r.ctx, a, n));
    }
  },
  beforeDatasetsDraw(r, e, t) {
    if (t.drawTime !== "beforeDatasetsDraw")
      return;
    const o = r.getSortedVisibleDatasetMetas();
    for (let i = o.length - 1; i >= 0; --i) {
      const n = o[i].$filler;
      e1(n) && Hn(r.ctx, n, r.chartArea);
    }
  },
  beforeDatasetDraw(r, e, t) {
    const o = e.meta.$filler;
    !e1(o) || t.drawTime !== "beforeDatasetDraw" || Hn(r.ctx, o, r.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const o1 = (r, e) => {
  let { boxHeight: t = e, boxWidth: o = e } = r;
  return r.usePointStyle && (t = Math.min(t, e), o = r.pointStyleWidth || Math.min(o, e)), {
    boxWidth: o,
    boxHeight: t,
    itemHeight: Math.max(e, t)
  };
}, xu = (r, e) => r !== null && e !== null && r.datasetIndex === e.datasetIndex && r.index === e.index;
class n1 extends je {
  constructor(e) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(e, t, o) {
    this.maxWidth = e, this.maxHeight = t, this._margins = o, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const e = this.options.labels || {};
    let t = j(e.generateLabels, [
      this.chart
    ], this) || [];
    e.filter && (t = t.filter((o) => e.filter(o, this.chart.data))), e.sort && (t = t.sort((o, i) => e.sort(o, i, this.chart.data))), this.options.reverse && t.reverse(), this.legendItems = t;
  }
  fit() {
    const { options: e, ctx: t } = this;
    if (!e.display) {
      this.width = this.height = 0;
      return;
    }
    const o = e.labels, i = se(o.font), n = i.size, s = this._computeTitleHeight(), { boxWidth: a, itemHeight: c } = o1(o, n);
    let l, d;
    t.font = i.string, this.isHorizontal() ? (l = this.maxWidth, d = this._fitRows(s, n, a, c) + 10) : (d = this.maxHeight, l = this._fitCols(s, i, a, c) + 10), this.width = Math.min(l, e.maxWidth || this.maxWidth), this.height = Math.min(d, e.maxHeight || this.maxHeight);
  }
  _fitRows(e, t, o, i) {
    const { ctx: n, maxWidth: s, options: { labels: { padding: a } } } = this, c = this.legendHitBoxes = [], l = this.lineWidths = [
      0
    ], d = i + a;
    let h = e;
    n.textAlign = "left", n.textBaseline = "middle";
    let p = -1, g = -d;
    return this.legendItems.forEach((b, m) => {
      const v = o + t / 2 + n.measureText(b.text).width;
      (m === 0 || l[l.length - 1] + v + 2 * a > s) && (h += d, l[l.length - (m > 0 ? 0 : 1)] = 0, g += d, p++), c[m] = {
        left: 0,
        top: g,
        row: p,
        width: v,
        height: i
      }, l[l.length - 1] += v + a;
    }), h;
  }
  _fitCols(e, t, o, i) {
    const { ctx: n, maxHeight: s, options: { labels: { padding: a } } } = this, c = this.legendHitBoxes = [], l = this.columnSizes = [], d = s - e;
    let h = a, p = 0, g = 0, b = 0, m = 0;
    return this.legendItems.forEach((v, y) => {
      const { itemWidth: C, itemHeight: w } = _u(o, t, n, v, i);
      y > 0 && g + w + 2 * a > d && (h += p + a, l.push({
        width: p,
        height: g
      }), b += p + a, m++, p = g = 0), c[y] = {
        left: b,
        top: g,
        col: m,
        width: C,
        height: w
      }, p = Math.max(p, C), g += w + a;
    }), h += p, l.push({
      width: p,
      height: g
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const e = this._computeTitleHeight(), { legendHitBoxes: t, options: { align: o, labels: { padding: i }, rtl: n } } = this, s = kr(n, this.left, this.width);
    if (this.isHorizontal()) {
      let a = 0, c = ge(o, this.left + i, this.right - this.lineWidths[a]);
      for (const l of t)
        a !== l.row && (a = l.row, c = ge(o, this.left + i, this.right - this.lineWidths[a])), l.top += this.top + e + i, l.left = s.leftForLtr(s.x(c), l.width), c += l.width + i;
    } else {
      let a = 0, c = ge(o, this.top + e + i, this.bottom - this.columnSizes[a].height);
      for (const l of t)
        l.col !== a && (a = l.col, c = ge(o, this.top + e + i, this.bottom - this.columnSizes[a].height)), l.top = c, l.left += this.left + i, l.left = s.leftForLtr(s.x(l.left), l.width), c += l.height + i;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const e = this.ctx;
      ln(e, this), this._draw(), dn(e);
    }
  }
  _draw() {
    const { options: e, columnSizes: t, lineWidths: o, ctx: i } = this, { align: n, labels: s } = e, a = Y.color, c = kr(e.rtl, this.left, this.width), l = se(s.font), { padding: d } = s, h = l.size, p = h / 2;
    let g;
    this.drawTitle(), i.textAlign = c.textAlign("left"), i.textBaseline = "middle", i.lineWidth = 0.5, i.font = l.string;
    const { boxWidth: b, boxHeight: m, itemHeight: v } = o1(s, h), y = function(L, S, A) {
      if (isNaN(b) || b <= 0 || isNaN(m) || m < 0)
        return;
      i.save();
      const P = E(A.lineWidth, 1);
      if (i.fillStyle = E(A.fillStyle, a), i.lineCap = E(A.lineCap, "butt"), i.lineDashOffset = E(A.lineDashOffset, 0), i.lineJoin = E(A.lineJoin, "miter"), i.lineWidth = P, i.strokeStyle = E(A.strokeStyle, a), i.setLineDash(E(A.lineDash, [])), s.usePointStyle) {
        const D = {
          radius: m * Math.SQRT2 / 2,
          pointStyle: A.pointStyle,
          rotation: A.rotation,
          borderWidth: P
        }, O = c.xPlus(L, b / 2), B = S + p;
        td(i, D, O, B, s.pointStyleWidth && b);
      } else {
        const D = S + Math.max((h - m) / 2, 0), O = c.leftForLtr(L, b), B = Xt(A.borderRadius);
        i.beginPath(), Object.values(B).some((he) => he !== 0) ? Si(i, {
          x: O,
          y: D,
          w: b,
          h: m,
          radius: B
        }) : i.rect(O, D, b, m), i.fill(), P !== 0 && i.stroke();
      }
      i.restore();
    }, C = function(L, S, A) {
      rr(i, A.text, L, S + v / 2, l, {
        strikethrough: A.hidden,
        textAlign: c.textAlign(A.textAlign)
      });
    }, w = this.isHorizontal(), _ = this._computeTitleHeight();
    w ? g = {
      x: ge(n, this.left + d, this.right - o[0]),
      y: this.top + d + _,
      line: 0
    } : g = {
      x: this.left + d,
      y: ge(n, this.top + _ + d, this.bottom - t[0].height),
      line: 0
    }, ld(this.ctx, e.textDirection);
    const x = v + d;
    this.legendItems.forEach((L, S) => {
      i.strokeStyle = L.fontColor, i.fillStyle = L.fontColor;
      const A = i.measureText(L.text).width, P = c.textAlign(L.textAlign || (L.textAlign = s.textAlign)), D = b + p + A;
      let O = g.x, B = g.y;
      c.setWidth(this.width), w ? S > 0 && O + D + d > this.right && (B = g.y += x, g.line++, O = g.x = ge(n, this.left + d, this.right - o[g.line])) : S > 0 && B + x > this.bottom && (O = g.x = O + t[g.line].width + d, g.line++, B = g.y = ge(n, this.top + _ + d, this.bottom - t[g.line].height));
      const he = c.x(O);
      if (y(he, B, L), O = z2(P, O + b + p, w ? O + D : this.right, e.rtl), C(c.x(O), B, L), w)
        g.x += D + d;
      else if (typeof L.text != "string") {
        const Ae = l.lineHeight;
        g.y += Hd(L, Ae) + d;
      } else
        g.y += x;
    }), dd(this.ctx, e.textDirection);
  }
  drawTitle() {
    const e = this.options, t = e.title, o = se(t.font), i = ye(t.padding);
    if (!t.display)
      return;
    const n = kr(e.rtl, this.left, this.width), s = this.ctx, a = t.position, c = o.size / 2, l = i.top + c;
    let d, h = this.left, p = this.width;
    if (this.isHorizontal())
      p = Math.max(...this.lineWidths), d = this.top + l, h = ge(e.align, h, this.right - p);
    else {
      const b = this.columnSizes.reduce((m, v) => Math.max(m, v.height), 0);
      d = l + ge(e.align, this.top, this.bottom - b - e.labels.padding - this._computeTitleHeight());
    }
    const g = ge(a, h, h + p);
    s.textAlign = n.textAlign(Is(a)), s.textBaseline = "middle", s.strokeStyle = t.color, s.fillStyle = t.color, s.font = o.string, rr(s, t.text, g, d, o);
  }
  _computeTitleHeight() {
    const e = this.options.title, t = se(e.font), o = ye(e.padding);
    return e.display ? t.lineHeight + o.height : 0;
  }
  _getLegendItemAt(e, t) {
    let o, i, n;
    if (ht(e, this.left, this.right) && ht(t, this.top, this.bottom)) {
      for (n = this.legendHitBoxes, o = 0; o < n.length; ++o)
        if (i = n[o], ht(e, i.left, i.left + i.width) && ht(t, i.top, i.top + i.height))
          return this.legendItems[o];
    }
    return null;
  }
  handleEvent(e) {
    const t = this.options;
    if (!$u(e.type, t))
      return;
    const o = this._getLegendItemAt(e.x, e.y);
    if (e.type === "mousemove" || e.type === "mouseout") {
      const i = this._hoveredItem, n = xu(i, o);
      i && !n && j(t.onLeave, [
        e,
        i,
        this
      ], this), this._hoveredItem = o, o && !n && j(t.onHover, [
        e,
        o,
        this
      ], this);
    } else o && j(t.onClick, [
      e,
      o,
      this
    ], this);
  }
}
function _u(r, e, t, o, i) {
  const n = wu(o, r, e, t), s = ku(i, o, e.lineHeight);
  return {
    itemWidth: n,
    itemHeight: s
  };
}
function wu(r, e, t, o) {
  let i = r.text;
  return i && typeof i != "string" && (i = i.reduce((n, s) => n.length > s.length ? n : s)), e + t.size / 2 + o.measureText(i).width;
}
function ku(r, e, t) {
  let o = r;
  return typeof e.text != "string" && (o = Hd(e, t)), o;
}
function Hd(r, e) {
  const t = r.text ? r.text.length : 0;
  return e * t;
}
function $u(r, e) {
  return !!((r === "mousemove" || r === "mouseout") && (e.onHover || e.onLeave) || e.onClick && (r === "click" || r === "mouseup"));
}
var Mu = {
  id: "legend",
  _element: n1,
  start(r, e, t) {
    const o = r.legend = new n1({
      ctx: r.ctx,
      options: t,
      chart: r
    });
    me.configure(r, o, t), me.addBox(r, o);
  },
  stop(r) {
    me.removeBox(r, r.legend), delete r.legend;
  },
  beforeUpdate(r, e, t) {
    const o = r.legend;
    me.configure(r, o, t), o.options = t;
  },
  afterUpdate(r) {
    const e = r.legend;
    e.buildLabels(), e.adjustHitBoxes();
  },
  afterEvent(r, e) {
    e.replay || r.legend.handleEvent(e.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(r, e, t) {
      const o = e.datasetIndex, i = t.chart;
      i.isDatasetVisible(o) ? (i.hide(o), e.hidden = !0) : (i.show(o), e.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (r) => r.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(r) {
        const e = r.data.datasets, { labels: { usePointStyle: t, pointStyle: o, textAlign: i, color: n, useBorderRadius: s, borderRadius: a } } = r.legend.options;
        return r._getSortedDatasetMetas().map((c) => {
          const l = c.controller.getStyle(t ? 0 : void 0), d = ye(l.borderWidth);
          return {
            text: e[c.index].label,
            fillStyle: l.backgroundColor,
            fontColor: n,
            hidden: !c.visible,
            lineCap: l.borderCapStyle,
            lineDash: l.borderDash,
            lineDashOffset: l.borderDashOffset,
            lineJoin: l.borderJoinStyle,
            lineWidth: (d.width + d.height) / 4,
            strokeStyle: l.borderColor,
            pointStyle: o || l.pointStyle,
            rotation: l.rotation,
            textAlign: i || l.textAlign,
            borderRadius: s && (a || l.borderRadius),
            datasetIndex: c.index
          };
        }, this);
      }
    },
    title: {
      color: (r) => r.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (r) => !r.startsWith("on"),
    labels: {
      _scriptable: (r) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(r)
    }
  }
};
class Ws extends je {
  constructor(e) {
    super(), this.chart = e.chart, this.options = e.options, this.ctx = e.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(e, t) {
    const o = this.options;
    if (this.left = 0, this.top = 0, !o.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = e, this.height = this.bottom = t;
    const i = U(o.text) ? o.text.length : 1;
    this._padding = ye(o.padding);
    const n = i * se(o.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = n : this.width = n;
  }
  isHorizontal() {
    const e = this.options.position;
    return e === "top" || e === "bottom";
  }
  _drawArgs(e) {
    const { top: t, left: o, bottom: i, right: n, options: s } = this, a = s.align;
    let c = 0, l, d, h;
    return this.isHorizontal() ? (d = ge(a, o, n), h = t + e, l = n - o) : (s.position === "left" ? (d = o + e, h = ge(a, i, t), c = V * -0.5) : (d = n - e, h = ge(a, t, i), c = V * 0.5), l = i - t), {
      titleX: d,
      titleY: h,
      maxWidth: l,
      rotation: c
    };
  }
  draw() {
    const e = this.ctx, t = this.options;
    if (!t.display)
      return;
    const o = se(t.font), n = o.lineHeight / 2 + this._padding.top, { titleX: s, titleY: a, maxWidth: c, rotation: l } = this._drawArgs(n);
    rr(e, t.text, 0, 0, o, {
      color: t.color,
      maxWidth: c,
      rotation: l,
      textAlign: Is(t.align),
      textBaseline: "middle",
      translation: [
        s,
        a
      ]
    });
  }
}
function Lu(r, e) {
  const t = new Ws({
    ctx: r.ctx,
    options: e,
    chart: r
  });
  me.configure(r, t, e), me.addBox(r, t), r.titleBlock = t;
}
var Su = {
  id: "title",
  _element: Ws,
  start(r, e, t) {
    Lu(r, t);
  },
  stop(r) {
    const e = r.titleBlock;
    me.removeBox(r, e), delete r.titleBlock;
  },
  beforeUpdate(r, e, t) {
    const o = r.titleBlock;
    me.configure(r, o, t), o.options = t;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const bo = /* @__PURE__ */ new WeakMap();
var Au = {
  id: "subtitle",
  start(r, e, t) {
    const o = new Ws({
      ctx: r.ctx,
      options: t,
      chart: r
    });
    me.configure(r, o, t), me.addBox(r, o), bo.set(r, o);
  },
  stop(r) {
    me.removeBox(r, bo.get(r)), bo.delete(r);
  },
  beforeUpdate(r, e, t) {
    const o = bo.get(r);
    me.configure(r, o, t), o.options = t;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "normal"
    },
    fullSize: !0,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const ei = {
  average(r) {
    if (!r.length)
      return !1;
    let e, t, o = /* @__PURE__ */ new Set(), i = 0, n = 0;
    for (e = 0, t = r.length; e < t; ++e) {
      const a = r[e].element;
      if (a && a.hasValue()) {
        const c = a.tooltipPosition();
        o.add(c.x), i += c.y, ++n;
      }
    }
    return n === 0 || o.size === 0 ? !1 : {
      x: [
        ...o
      ].reduce((a, c) => a + c) / o.size,
      y: i / n
    };
  },
  nearest(r, e) {
    if (!r.length)
      return !1;
    let t = e.x, o = e.y, i = Number.POSITIVE_INFINITY, n, s, a;
    for (n = 0, s = r.length; n < s; ++n) {
      const c = r[n].element;
      if (c && c.hasValue()) {
        const l = c.getCenterPoint(), d = Zn(e, l);
        d < i && (i = d, a = c);
      }
    }
    if (a) {
      const c = a.tooltipPosition();
      t = c.x, o = c.y;
    }
    return {
      x: t,
      y: o
    };
  }
};
function Xe(r, e) {
  return e && (U(e) ? Array.prototype.push.apply(r, e) : r.push(e)), r;
}
function ct(r) {
  return (typeof r == "string" || r instanceof String) && r.indexOf(`
`) > -1 ? r.split(`
`) : r;
}
function Tu(r, e) {
  const { element: t, datasetIndex: o, index: i } = e, n = r.getDatasetMeta(o).controller, { label: s, value: a } = n.getLabelAndValue(i);
  return {
    chart: r,
    label: s,
    parsed: n.getParsed(i),
    raw: r.data.datasets[o].data[i],
    formattedValue: a,
    dataset: n.getDataset(),
    dataIndex: i,
    datasetIndex: o,
    element: t
  };
}
function s1(r, e) {
  const t = r.chart.ctx, { body: o, footer: i, title: n } = r, { boxWidth: s, boxHeight: a } = e, c = se(e.bodyFont), l = se(e.titleFont), d = se(e.footerFont), h = n.length, p = i.length, g = o.length, b = ye(e.padding);
  let m = b.height, v = 0, y = o.reduce((_, x) => _ + x.before.length + x.lines.length + x.after.length, 0);
  if (y += r.beforeBody.length + r.afterBody.length, h && (m += h * l.lineHeight + (h - 1) * e.titleSpacing + e.titleMarginBottom), y) {
    const _ = e.displayColors ? Math.max(a, c.lineHeight) : c.lineHeight;
    m += g * _ + (y - g) * c.lineHeight + (y - 1) * e.bodySpacing;
  }
  p && (m += e.footerMarginTop + p * d.lineHeight + (p - 1) * e.footerSpacing);
  let C = 0;
  const w = function(_) {
    v = Math.max(v, t.measureText(_).width + C);
  };
  return t.save(), t.font = l.string, N(r.title, w), t.font = c.string, N(r.beforeBody.concat(r.afterBody), w), C = e.displayColors ? s + 2 + e.boxPadding : 0, N(o, (_) => {
    N(_.before, w), N(_.lines, w), N(_.after, w);
  }), C = 0, t.font = d.string, N(r.footer, w), t.restore(), v += b.width, {
    width: v,
    height: m
  };
}
function Pu(r, e) {
  const { y: t, height: o } = e;
  return t < o / 2 ? "top" : t > r.height - o / 2 ? "bottom" : "center";
}
function Eu(r, e, t, o) {
  const { x: i, width: n } = o, s = t.caretSize + t.caretPadding;
  if (r === "left" && i + n + s > e.width || r === "right" && i - n - s < 0)
    return !0;
}
function Du(r, e, t, o) {
  const { x: i, width: n } = t, { width: s, chartArea: { left: a, right: c } } = r;
  let l = "center";
  return o === "center" ? l = i <= (a + c) / 2 ? "left" : "right" : i <= n / 2 ? l = "left" : i >= s - n / 2 && (l = "right"), Eu(l, r, e, t) && (l = "center"), l;
}
function a1(r, e, t) {
  const o = t.yAlign || e.yAlign || Pu(r, t);
  return {
    xAlign: t.xAlign || e.xAlign || Du(r, e, t, o),
    yAlign: o
  };
}
function Ou(r, e) {
  let { x: t, width: o } = r;
  return e === "right" ? t -= o : e === "center" && (t -= o / 2), t;
}
function Hu(r, e, t) {
  let { y: o, height: i } = r;
  return e === "top" ? o += t : e === "bottom" ? o -= i + t : o -= i / 2, o;
}
function c1(r, e, t, o) {
  const { caretSize: i, caretPadding: n, cornerRadius: s } = r, { xAlign: a, yAlign: c } = t, l = i + n, { topLeft: d, topRight: h, bottomLeft: p, bottomRight: g } = Xt(s);
  let b = Ou(e, a);
  const m = Hu(e, c, l);
  return c === "center" ? a === "left" ? b += l : a === "right" && (b -= l) : a === "left" ? b -= Math.max(d, p) + i : a === "right" && (b += Math.max(h, g) + i), {
    x: ce(b, 0, o.width - e.width),
    y: ce(m, 0, o.height - e.height)
  };
}
function mo(r, e, t) {
  const o = ye(t.padding);
  return e === "center" ? r.x + r.width / 2 : e === "right" ? r.x + r.width - o.right : r.x + o.left;
}
function l1(r) {
  return Xe([], ct(r));
}
function Iu(r, e, t) {
  return Ht(r, {
    tooltip: e,
    tooltipItems: t,
    type: "tooltip"
  });
}
function d1(r, e) {
  const t = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks;
  return t ? r.override(t) : r;
}
const Id = {
  beforeTitle: st,
  title(r) {
    if (r.length > 0) {
      const e = r[0], t = e.chart.data.labels, o = t ? t.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return e.dataset.label || "";
      if (e.label)
        return e.label;
      if (o > 0 && e.dataIndex < o)
        return t[e.dataIndex];
    }
    return "";
  },
  afterTitle: st,
  beforeBody: st,
  beforeLabel: st,
  label(r) {
    if (this && this.options && this.options.mode === "dataset")
      return r.label + ": " + r.formattedValue || r.formattedValue;
    let e = r.dataset.label || "";
    e && (e += ": ");
    const t = r.formattedValue;
    return H(t) || (e += t), e;
  },
  labelColor(r) {
    const t = r.chart.getDatasetMeta(r.datasetIndex).controller.getStyle(r.dataIndex);
    return {
      borderColor: t.borderColor,
      backgroundColor: t.backgroundColor,
      borderWidth: t.borderWidth,
      borderDash: t.borderDash,
      borderDashOffset: t.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(r) {
    const t = r.chart.getDatasetMeta(r.datasetIndex).controller.getStyle(r.dataIndex);
    return {
      pointStyle: t.pointStyle,
      rotation: t.rotation
    };
  },
  afterLabel: st,
  afterBody: st,
  beforeFooter: st,
  footer: st,
  afterFooter: st
};
function $e(r, e, t, o) {
  const i = r[e].call(t, o);
  return typeof i > "u" ? Id[e].call(t, o) : i;
}
const ya = class ya extends je {
  constructor(e) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = e.chart, this.options = e.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(e) {
    this.options = e, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const e = this._cachedAnimations;
    if (e)
      return e;
    const t = this.chart, o = this.options.setContext(this.getContext()), i = o.enabled && t.options.animation && o.animations, n = new gd(this.chart, i);
    return i._cacheable && (this._cachedAnimations = Object.freeze(n)), n;
  }
  getContext() {
    return this.$context || (this.$context = Iu(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(e, t) {
    const { callbacks: o } = t, i = $e(o, "beforeTitle", this, e), n = $e(o, "title", this, e), s = $e(o, "afterTitle", this, e);
    let a = [];
    return a = Xe(a, ct(i)), a = Xe(a, ct(n)), a = Xe(a, ct(s)), a;
  }
  getBeforeBody(e, t) {
    return l1($e(t.callbacks, "beforeBody", this, e));
  }
  getBody(e, t) {
    const { callbacks: o } = t, i = [];
    return N(e, (n) => {
      const s = {
        before: [],
        lines: [],
        after: []
      }, a = d1(o, n);
      Xe(s.before, ct($e(a, "beforeLabel", this, n))), Xe(s.lines, $e(a, "label", this, n)), Xe(s.after, ct($e(a, "afterLabel", this, n))), i.push(s);
    }), i;
  }
  getAfterBody(e, t) {
    return l1($e(t.callbacks, "afterBody", this, e));
  }
  getFooter(e, t) {
    const { callbacks: o } = t, i = $e(o, "beforeFooter", this, e), n = $e(o, "footer", this, e), s = $e(o, "afterFooter", this, e);
    let a = [];
    return a = Xe(a, ct(i)), a = Xe(a, ct(n)), a = Xe(a, ct(s)), a;
  }
  _createItems(e) {
    const t = this._active, o = this.chart.data, i = [], n = [], s = [];
    let a = [], c, l;
    for (c = 0, l = t.length; c < l; ++c)
      a.push(Tu(this.chart, t[c]));
    return e.filter && (a = a.filter((d, h, p) => e.filter(d, h, p, o))), e.itemSort && (a = a.sort((d, h) => e.itemSort(d, h, o))), N(a, (d) => {
      const h = d1(e.callbacks, d);
      i.push($e(h, "labelColor", this, d)), n.push($e(h, "labelPointStyle", this, d)), s.push($e(h, "labelTextColor", this, d));
    }), this.labelColors = i, this.labelPointStyles = n, this.labelTextColors = s, this.dataPoints = a, a;
  }
  update(e, t) {
    const o = this.options.setContext(this.getContext()), i = this._active;
    let n, s = [];
    if (!i.length)
      this.opacity !== 0 && (n = {
        opacity: 0
      });
    else {
      const a = ei[o.position].call(this, i, this._eventPosition);
      s = this._createItems(o), this.title = this.getTitle(s, o), this.beforeBody = this.getBeforeBody(s, o), this.body = this.getBody(s, o), this.afterBody = this.getAfterBody(s, o), this.footer = this.getFooter(s, o);
      const c = this._size = s1(this, o), l = Object.assign({}, a, c), d = a1(this.chart, o, l), h = c1(o, l, d, this.chart);
      this.xAlign = d.xAlign, this.yAlign = d.yAlign, n = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: c.width,
        height: c.height,
        caretX: a.x,
        caretY: a.y
      };
    }
    this._tooltipItems = s, this.$context = void 0, n && this._resolveAnimations().update(this, n), e && o.external && o.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: t
    });
  }
  drawCaret(e, t, o, i) {
    const n = this.getCaretPosition(e, o, i);
    t.lineTo(n.x1, n.y1), t.lineTo(n.x2, n.y2), t.lineTo(n.x3, n.y3);
  }
  getCaretPosition(e, t, o) {
    const { xAlign: i, yAlign: n } = this, { caretSize: s, cornerRadius: a } = o, { topLeft: c, topRight: l, bottomLeft: d, bottomRight: h } = Xt(a), { x: p, y: g } = e, { width: b, height: m } = t;
    let v, y, C, w, _, x;
    return n === "center" ? (_ = g + m / 2, i === "left" ? (v = p, y = v - s, w = _ + s, x = _ - s) : (v = p + b, y = v + s, w = _ - s, x = _ + s), C = v) : (i === "left" ? y = p + Math.max(c, d) + s : i === "right" ? y = p + b - Math.max(l, h) - s : y = this.caretX, n === "top" ? (w = g, _ = w - s, v = y - s, C = y + s) : (w = g + m, _ = w + s, v = y + s, C = y - s), x = w), {
      x1: v,
      x2: y,
      x3: C,
      y1: w,
      y2: _,
      y3: x
    };
  }
  drawTitle(e, t, o) {
    const i = this.title, n = i.length;
    let s, a, c;
    if (n) {
      const l = kr(o.rtl, this.x, this.width);
      for (e.x = mo(this, o.titleAlign, o), t.textAlign = l.textAlign(o.titleAlign), t.textBaseline = "middle", s = se(o.titleFont), a = o.titleSpacing, t.fillStyle = o.titleColor, t.font = s.string, c = 0; c < n; ++c)
        t.fillText(i[c], l.x(e.x), e.y + s.lineHeight / 2), e.y += s.lineHeight + a, c + 1 === n && (e.y += o.titleMarginBottom - a);
    }
  }
  _drawColorBox(e, t, o, i, n) {
    const s = this.labelColors[o], a = this.labelPointStyles[o], { boxHeight: c, boxWidth: l } = n, d = se(n.bodyFont), h = mo(this, "left", n), p = i.x(h), g = c < d.lineHeight ? (d.lineHeight - c) / 2 : 0, b = t.y + g;
    if (n.usePointStyle) {
      const m = {
        radius: Math.min(l, c) / 2,
        pointStyle: a.pointStyle,
        rotation: a.rotation,
        borderWidth: 1
      }, v = i.leftForLtr(p, l) + l / 2, y = b + c / 2;
      e.strokeStyle = n.multiKeyBackground, e.fillStyle = n.multiKeyBackground, Wn(e, m, v, y), e.strokeStyle = s.borderColor, e.fillStyle = s.backgroundColor, Wn(e, m, v, y);
    } else {
      e.lineWidth = I(s.borderWidth) ? Math.max(...Object.values(s.borderWidth)) : s.borderWidth || 1, e.strokeStyle = s.borderColor, e.setLineDash(s.borderDash || []), e.lineDashOffset = s.borderDashOffset || 0;
      const m = i.leftForLtr(p, l), v = i.leftForLtr(i.xPlus(p, 1), l - 2), y = Xt(s.borderRadius);
      Object.values(y).some((C) => C !== 0) ? (e.beginPath(), e.fillStyle = n.multiKeyBackground, Si(e, {
        x: m,
        y: b,
        w: l,
        h: c,
        radius: y
      }), e.fill(), e.stroke(), e.fillStyle = s.backgroundColor, e.beginPath(), Si(e, {
        x: v,
        y: b + 1,
        w: l - 2,
        h: c - 2,
        radius: y
      }), e.fill()) : (e.fillStyle = n.multiKeyBackground, e.fillRect(m, b, l, c), e.strokeRect(m, b, l, c), e.fillStyle = s.backgroundColor, e.fillRect(v, b + 1, l - 2, c - 2));
    }
    e.fillStyle = this.labelTextColors[o];
  }
  drawBody(e, t, o) {
    const { body: i } = this, { bodySpacing: n, bodyAlign: s, displayColors: a, boxHeight: c, boxWidth: l, boxPadding: d } = o, h = se(o.bodyFont);
    let p = h.lineHeight, g = 0;
    const b = kr(o.rtl, this.x, this.width), m = function(A) {
      t.fillText(A, b.x(e.x + g), e.y + p / 2), e.y += p + n;
    }, v = b.textAlign(s);
    let y, C, w, _, x, L, S;
    for (t.textAlign = s, t.textBaseline = "middle", t.font = h.string, e.x = mo(this, v, o), t.fillStyle = o.bodyColor, N(this.beforeBody, m), g = a && v !== "right" ? s === "center" ? l / 2 + d : l + 2 + d : 0, _ = 0, L = i.length; _ < L; ++_) {
      for (y = i[_], C = this.labelTextColors[_], t.fillStyle = C, N(y.before, m), w = y.lines, a && w.length && (this._drawColorBox(t, e, _, b, o), p = Math.max(h.lineHeight, c)), x = 0, S = w.length; x < S; ++x)
        m(w[x]), p = h.lineHeight;
      N(y.after, m);
    }
    g = 0, p = h.lineHeight, N(this.afterBody, m), e.y -= n;
  }
  drawFooter(e, t, o) {
    const i = this.footer, n = i.length;
    let s, a;
    if (n) {
      const c = kr(o.rtl, this.x, this.width);
      for (e.x = mo(this, o.footerAlign, o), e.y += o.footerMarginTop, t.textAlign = c.textAlign(o.footerAlign), t.textBaseline = "middle", s = se(o.footerFont), t.fillStyle = o.footerColor, t.font = s.string, a = 0; a < n; ++a)
        t.fillText(i[a], c.x(e.x), e.y + s.lineHeight / 2), e.y += s.lineHeight + o.footerSpacing;
    }
  }
  drawBackground(e, t, o, i) {
    const { xAlign: n, yAlign: s } = this, { x: a, y: c } = e, { width: l, height: d } = o, { topLeft: h, topRight: p, bottomLeft: g, bottomRight: b } = Xt(i.cornerRadius);
    t.fillStyle = i.backgroundColor, t.strokeStyle = i.borderColor, t.lineWidth = i.borderWidth, t.beginPath(), t.moveTo(a + h, c), s === "top" && this.drawCaret(e, t, o, i), t.lineTo(a + l - p, c), t.quadraticCurveTo(a + l, c, a + l, c + p), s === "center" && n === "right" && this.drawCaret(e, t, o, i), t.lineTo(a + l, c + d - b), t.quadraticCurveTo(a + l, c + d, a + l - b, c + d), s === "bottom" && this.drawCaret(e, t, o, i), t.lineTo(a + g, c + d), t.quadraticCurveTo(a, c + d, a, c + d - g), s === "center" && n === "left" && this.drawCaret(e, t, o, i), t.lineTo(a, c + h), t.quadraticCurveTo(a, c, a + h, c), t.closePath(), t.fill(), i.borderWidth > 0 && t.stroke();
  }
  _updateAnimationTarget(e) {
    const t = this.chart, o = this.$animations, i = o && o.x, n = o && o.y;
    if (i || n) {
      const s = ei[e.position].call(this, this._active, this._eventPosition);
      if (!s)
        return;
      const a = this._size = s1(this, e), c = Object.assign({}, s, this._size), l = a1(t, e, c), d = c1(e, c, l, t);
      (i._to !== d.x || n._to !== d.y) && (this.xAlign = l.xAlign, this.yAlign = l.yAlign, this.width = a.width, this.height = a.height, this.caretX = s.x, this.caretY = s.y, this._resolveAnimations().update(this, d));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(e) {
    const t = this.options.setContext(this.getContext());
    let o = this.opacity;
    if (!o)
      return;
    this._updateAnimationTarget(t);
    const i = {
      width: this.width,
      height: this.height
    }, n = {
      x: this.x,
      y: this.y
    };
    o = Math.abs(o) < 1e-3 ? 0 : o;
    const s = ye(t.padding), a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    t.enabled && a && (e.save(), e.globalAlpha = o, this.drawBackground(n, e, i, t), ld(e, t.textDirection), n.y += s.top, this.drawTitle(n, e, t), this.drawBody(n, e, t), this.drawFooter(n, e, t), dd(e, t.textDirection), e.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(e, t) {
    const o = this._active, i = e.map(({ datasetIndex: a, index: c }) => {
      const l = this.chart.getDatasetMeta(a);
      if (!l)
        throw new Error("Cannot find a dataset at index " + a);
      return {
        datasetIndex: a,
        element: l.data[c],
        index: c
      };
    }), n = !Lo(o, i), s = this._positionChanged(i, t);
    (n || s) && (this._active = i, this._eventPosition = t, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(e, t, o = !0) {
    if (t && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const i = this.options, n = this._active || [], s = this._getActiveElements(e, n, t, o), a = this._positionChanged(s, e), c = t || !Lo(s, n) || a;
    return c && (this._active = s, (i.enabled || i.external) && (this._eventPosition = {
      x: e.x,
      y: e.y
    }, this.update(!0, t))), c;
  }
  _getActiveElements(e, t, o, i) {
    const n = this.options;
    if (e.type === "mouseout")
      return [];
    if (!i)
      return t.filter((a) => this.chart.data.datasets[a.datasetIndex] && this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index) !== void 0);
    const s = this.chart.getElementsAtEventForMode(e, n.mode, n, o);
    return n.reverse && s.reverse(), s;
  }
  _positionChanged(e, t) {
    const { caretX: o, caretY: i, options: n } = this, s = ei[n.position].call(this, e, t);
    return s !== !1 && (o !== s.x || i !== s.y);
  }
};
ya.positioners = ei;
let Ho = ya;
var Bu = {
  id: "tooltip",
  _element: Ho,
  positioners: ei,
  afterInit(r, e, t) {
    t && (r.tooltip = new Ho({
      chart: r,
      options: t
    }));
  },
  beforeUpdate(r, e, t) {
    r.tooltip && r.tooltip.initialize(t);
  },
  reset(r, e, t) {
    r.tooltip && r.tooltip.initialize(t);
  },
  afterDraw(r) {
    const e = r.tooltip;
    if (e && e._willRender()) {
      const t = {
        tooltip: e
      };
      if (r.notifyPlugins("beforeTooltipDraw", {
        ...t,
        cancelable: !0
      }) === !1)
        return;
      e.draw(r.ctx), r.notifyPlugins("afterTooltipDraw", t);
    }
  },
  afterEvent(r, e) {
    if (r.tooltip) {
      const t = e.replay;
      r.tooltip.handleEvent(e.event, t, e.inChartArea) && (e.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (r, e) => e.bodyFont.size,
    boxWidth: (r, e) => e.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: Id
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (r) => r !== "filter" && r !== "itemSort" && r !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
}, Vu = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: K3,
  Decimation: eu,
  Filler: Cu,
  Legend: Mu,
  SubTitle: Au,
  Title: Su,
  Tooltip: Bu
});
const Nu = (r, e, t, o) => (typeof e == "string" ? (t = r.push(e) - 1, o.unshift({
  index: t,
  label: e
})) : isNaN(e) && (t = null), t);
function Ru(r, e, t, o) {
  const i = r.indexOf(e);
  if (i === -1)
    return Nu(r, e, t, o);
  const n = r.lastIndexOf(e);
  return i !== n ? t : i;
}
const zu = (r, e) => r === null ? null : ce(Math.round(r), 0, e);
function h1(r) {
  const e = this.getLabels();
  return r >= 0 && r < e.length ? e[r] : r;
}
const Yo = class Yo extends dr {
  constructor(e) {
    super(e), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(e) {
    const t = this._addedLabels;
    if (t.length) {
      const o = this.getLabels();
      for (const { index: i, label: n } of t)
        o[i] === n && o.splice(i, 1);
      this._addedLabels = [];
    }
    super.init(e);
  }
  parse(e, t) {
    if (H(e))
      return null;
    const o = this.getLabels();
    return t = isFinite(t) && o[t] === e ? t : Ru(o, e, E(t, e), this._addedLabels), zu(t, o.length - 1);
  }
  determineDataLimits() {
    const { minDefined: e, maxDefined: t } = this.getUserBounds();
    let { min: o, max: i } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (e || (o = 0), t || (i = this.getLabels().length - 1)), this.min = o, this.max = i;
  }
  buildTicks() {
    const e = this.min, t = this.max, o = this.options.offset, i = [];
    let n = this.getLabels();
    n = e === 0 && t === n.length - 1 ? n : n.slice(e, t + 1), this._valueRange = Math.max(n.length - (o ? 0 : 1), 1), this._startValue = this.min - (o ? 0.5 : 0);
    for (let s = e; s <= t; s++)
      i.push({
        value: s
      });
    return i;
  }
  getLabelForValue(e) {
    return h1.call(this, e);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(e) {
    return typeof e != "number" && (e = this.parse(e)), e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getPixelForTick(e) {
    const t = this.ticks;
    return e < 0 || e > t.length - 1 ? null : this.getPixelForValue(t[e].value);
  }
  getValueForPixel(e) {
    return Math.round(this._startValue + this.getDecimalForPixel(e) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
};
Yo.id = "category", Yo.defaults = {
  ticks: {
    callback: h1
  }
};
let ss = Yo;
function Fu(r, e) {
  const t = [], { bounds: i, step: n, min: s, max: a, precision: c, count: l, maxTicks: d, maxDigits: h, includeBounds: p } = r, g = n || 1, b = d - 1, { min: m, max: v } = e, y = !H(s), C = !H(a), w = !H(l), _ = (v - m) / (h + 1);
  let x = sl((v - m) / b / g) * g, L, S, A, P;
  if (x < 1e-14 && !y && !C)
    return [
      {
        value: m
      },
      {
        value: v
      }
    ];
  P = Math.ceil(v / x) - Math.floor(m / x), P > b && (x = sl(P * x / b / g) * g), H(c) || (L = Math.pow(10, c), x = Math.ceil(x * L) / L), i === "ticks" ? (S = Math.floor(m / x) * x, A = Math.ceil(v / x) * x) : (S = m, A = v), y && C && n && O2((a - s) / n, x / 1e3) ? (P = Math.round(Math.min((a - s) / x, d)), x = (a - s) / P, S = s, A = a) : w ? (S = y ? s : S, A = C ? a : A, P = l - 1, x = (A - S) / P) : (P = (A - S) / x, oi(P, Math.round(P), x / 1e3) ? P = Math.round(P) : P = Math.ceil(P));
  const D = Math.max(al(x), al(S));
  L = Math.pow(10, H(c) ? D : c), S = Math.round(S * L) / L, A = Math.round(A * L) / L;
  let O = 0;
  for (y && (p && S !== s ? (t.push({
    value: s
  }), S < s && O++, oi(Math.round((S + O * x) * L) / L, s, u1(s, _, r)) && O++) : S < s && O++); O < P; ++O) {
    const B = Math.round((S + O * x) * L) / L;
    if (C && B > a)
      break;
    t.push({
      value: B
    });
  }
  return C && p && A !== a ? t.length && oi(t[t.length - 1].value, a, u1(a, _, r)) ? t[t.length - 1].value = a : t.push({
    value: a
  }) : (!C || A === a) && t.push({
    value: A
  }), t;
}
function u1(r, e, { horizontal: t, minRotation: o }) {
  const i = Ze(o), n = (t ? Math.sin(i) : Math.cos(i)) || 1e-3, s = 0.75 * e * ("" + r).length;
  return Math.min(e / n, s);
}
class Io extends dr {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(e, t) {
    return H(e) || (typeof e == "number" || e instanceof Number) && !isFinite(+e) ? null : +e;
  }
  handleTickRangeOptions() {
    const { beginAtZero: e } = this.options, { minDefined: t, maxDefined: o } = this.getUserBounds();
    let { min: i, max: n } = this;
    const s = (c) => i = t ? i : c, a = (c) => n = o ? n : c;
    if (e) {
      const c = Ge(i), l = Ge(n);
      c < 0 && l < 0 ? a(0) : c > 0 && l > 0 && s(0);
    }
    if (i === n) {
      let c = n === 0 ? 1 : Math.abs(n * 0.05);
      a(n + c), e || s(i - c);
    }
    this.min = i, this.max = n;
  }
  getTickLimit() {
    const e = this.options.ticks;
    let { maxTicksLimit: t, stepSize: o } = e, i;
    return o ? (i = Math.ceil(this.max / o) - Math.floor(this.min / o) + 1, i > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${o} would result generating up to ${i} ticks. Limiting to 1000.`), i = 1e3)) : (i = this.computeTickLimit(), t = t || 11), t && (i = Math.min(t, i)), i;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const e = this.options, t = e.ticks;
    let o = this.getTickLimit();
    o = Math.max(2, o);
    const i = {
      maxTicks: o,
      bounds: e.bounds,
      min: e.min,
      max: e.max,
      precision: t.precision,
      step: t.stepSize,
      count: t.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: t.minRotation || 0,
      includeBounds: t.includeBounds !== !1
    }, n = this._range || this, s = Fu(i, n);
    return e.bounds === "ticks" && q1(s, this, "value"), e.reverse ? (s.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), s;
  }
  configure() {
    const e = this.ticks;
    let t = this.min, o = this.max;
    if (super.configure(), this.options.offset && e.length) {
      const i = (o - t) / Math.max(e.length - 1, 1) / 2;
      t -= i, o += i;
    }
    this._startValue = t, this._endValue = o, this._valueRange = o - t;
  }
  getLabelForValue(e) {
    return Yi(e, this.chart.options.locale, this.options.ticks.format);
  }
}
const Xo = class Xo extends Io {
  determineDataLimits() {
    const { min: e, max: t } = this.getMinMax(!0);
    this.min = Q(e) ? e : 0, this.max = Q(t) ? t : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const e = this.isHorizontal(), t = e ? this.width : this.height, o = Ze(this.options.ticks.minRotation), i = (e ? Math.sin(o) : Math.cos(o)) || 1e-3, n = this._resolveTickFontOptions(0);
    return Math.ceil(t / Math.min(40, n.lineHeight / i));
  }
  getPixelForValue(e) {
    return e === null ? NaN : this.getPixelForDecimal((e - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    return this._startValue + this.getDecimalForPixel(e) * this._valueRange;
  }
};
Xo.id = "linear", Xo.defaults = {
  ticks: {
    callback: cn.formatters.numeric
  }
};
let as = Xo;
const Ei = (r) => Math.floor(vt(r)), Wt = (r, e) => Math.pow(10, Ei(r) + e);
function p1(r) {
  return r / Math.pow(10, Ei(r)) === 1;
}
function f1(r, e, t) {
  const o = Math.pow(10, t), i = Math.floor(r / o);
  return Math.ceil(e / o) - i;
}
function Zu(r, e) {
  const t = e - r;
  let o = Ei(t);
  for (; f1(r, e, o) > 10; )
    o++;
  for (; f1(r, e, o) < 10; )
    o--;
  return Math.min(o, Ei(r));
}
function ju(r, { min: e, max: t }) {
  e = Te(r.min, e);
  const o = [], i = Ei(e);
  let n = Zu(e, t), s = n < 0 ? Math.pow(10, Math.abs(n)) : 1;
  const a = Math.pow(10, n), c = i > n ? Math.pow(10, i) : 0, l = Math.round((e - c) * s) / s, d = Math.floor((e - c) / a / 10) * a * 10;
  let h = Math.floor((l - d) / Math.pow(10, n)), p = Te(r.min, Math.round((c + d + h * Math.pow(10, n)) * s) / s);
  for (; p < t; )
    o.push({
      value: p,
      major: p1(p),
      significand: h
    }), h >= 10 ? h = h < 15 ? 15 : 20 : h++, h >= 20 && (n++, h = 2, s = n >= 0 ? 1 : s), p = Math.round((c + d + h * Math.pow(10, n)) * s) / s;
  const g = Te(r.max, p);
  return o.push({
    value: g,
    major: p1(g),
    significand: h
  }), o;
}
const Ko = class Ko extends dr {
  constructor(e) {
    super(e), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
  }
  parse(e, t) {
    const o = Io.prototype.parse.apply(this, [
      e,
      t
    ]);
    if (o === 0) {
      this._zero = !0;
      return;
    }
    return Q(o) && o > 0 ? o : null;
  }
  determineDataLimits() {
    const { min: e, max: t } = this.getMinMax(!0);
    this.min = Q(e) ? Math.max(0, e) : null, this.max = Q(t) ? Math.max(0, t) : null, this.options.beginAtZero && (this._zero = !0), this._zero && this.min !== this._suggestedMin && !Q(this._userMin) && (this.min = e === Wt(this.min, 0) ? Wt(this.min, -1) : Wt(this.min, 0)), this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined: e, maxDefined: t } = this.getUserBounds();
    let o = this.min, i = this.max;
    const n = (a) => o = e ? o : a, s = (a) => i = t ? i : a;
    o === i && (o <= 0 ? (n(1), s(10)) : (n(Wt(o, -1)), s(Wt(i, 1)))), o <= 0 && n(Wt(i, -1)), i <= 0 && s(Wt(o, 1)), this.min = o, this.max = i;
  }
  buildTicks() {
    const e = this.options, t = {
      min: this._userMin,
      max: this._userMax
    }, o = ju(t, this);
    return e.bounds === "ticks" && q1(o, this, "value"), e.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
  }
  getLabelForValue(e) {
    return e === void 0 ? "0" : Yi(e, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const e = this.min;
    super.configure(), this._startValue = vt(e), this._valueRange = vt(this.max) - vt(e);
  }
  getPixelForValue(e) {
    return (e === void 0 || e === 0) && (e = this.min), e === null || isNaN(e) ? NaN : this.getPixelForDecimal(e === this.min ? 0 : (vt(e) - this._startValue) / this._valueRange);
  }
  getValueForPixel(e) {
    const t = this.getDecimalForPixel(e);
    return Math.pow(10, this._startValue + t * this._valueRange);
  }
};
Ko.id = "logarithmic", Ko.defaults = {
  ticks: {
    callback: cn.formatters.logarithmic,
    major: {
      enabled: !0
    }
  }
};
let cs = Ko;
function ls(r) {
  const e = r.ticks;
  if (e.display && r.display) {
    const t = ye(e.backdropPadding);
    return E(e.font && e.font.size, Y.font.size) + t.height;
  }
  return 0;
}
function Wu(r, e, t) {
  return t = U(t) ? t : [
    t
  ], {
    w: G2(r, e.string, t),
    h: t.length * e.lineHeight
  };
}
function g1(r, e, t, o, i) {
  return r === o || r === i ? {
    start: e - t / 2,
    end: e + t / 2
  } : r < o || r > i ? {
    start: e - t,
    end: e
  } : {
    start: e,
    end: e + t
  };
}
function qu(r) {
  const e = {
    l: r.left + r._padding.left,
    r: r.right - r._padding.right,
    t: r.top + r._padding.top,
    b: r.bottom - r._padding.bottom
  }, t = Object.assign({}, e), o = [], i = [], n = r._pointLabels.length, s = r.options.pointLabels, a = s.centerPointLabels ? V / n : 0;
  for (let c = 0; c < n; c++) {
    const l = s.setContext(r.getPointLabelContext(c));
    i[c] = l.padding;
    const d = r.getPointPosition(c, r.drawingArea + i[c], a), h = se(l.font), p = Wu(r.ctx, h, r._pointLabels[c]);
    o[c] = p;
    const g = be(r.getIndexAngle(c) + a), b = Math.round(Os(g)), m = g1(b, d.x, p.w, 0, 180), v = g1(b, d.y, p.h, 90, 270);
    Uu(t, e, g, m, v);
  }
  r.setCenterPoint(e.l - t.l, t.r - e.r, e.t - t.t, t.b - e.b), r._pointLabelItems = Ku(r, o, i);
}
function Uu(r, e, t, o, i) {
  const n = Math.abs(Math.sin(t)), s = Math.abs(Math.cos(t));
  let a = 0, c = 0;
  o.start < e.l ? (a = (e.l - o.start) / n, r.l = Math.min(r.l, e.l - a)) : o.end > e.r && (a = (o.end - e.r) / n, r.r = Math.max(r.r, e.r + a)), i.start < e.t ? (c = (e.t - i.start) / s, r.t = Math.min(r.t, e.t - c)) : i.end > e.b && (c = (i.end - e.b) / s, r.b = Math.max(r.b, e.b + c));
}
function Yu(r, e, t) {
  const o = r.drawingArea, { extra: i, additionalAngle: n, padding: s, size: a } = t, c = r.getPointPosition(e, o + i + s, n), l = Math.round(Os(be(c.angle + re))), d = Qu(c.y, a.h, l), h = Gu(l), p = Ju(c.x, a.w, h);
  return {
    visible: !0,
    x: c.x,
    y: d,
    textAlign: h,
    left: p,
    top: d,
    right: p + a.w,
    bottom: d + a.h
  };
}
function Xu(r, e) {
  if (!e)
    return !0;
  const { left: t, top: o, right: i, bottom: n } = r;
  return !(pt({
    x: t,
    y: o
  }, e) || pt({
    x: t,
    y: n
  }, e) || pt({
    x: i,
    y: o
  }, e) || pt({
    x: i,
    y: n
  }, e));
}
function Ku(r, e, t) {
  const o = [], i = r._pointLabels.length, n = r.options, { centerPointLabels: s, display: a } = n.pointLabels, c = {
    extra: ls(n) / 2,
    additionalAngle: s ? V / i : 0
  };
  let l;
  for (let d = 0; d < i; d++) {
    c.padding = t[d], c.size = e[d];
    const h = Yu(r, d, c);
    o.push(h), a === "auto" && (h.visible = Xu(h, l), h.visible && (l = h));
  }
  return o;
}
function Gu(r) {
  return r === 0 || r === 180 ? "center" : r < 180 ? "left" : "right";
}
function Ju(r, e, t) {
  return t === "right" ? r -= e : t === "center" && (r -= e / 2), r;
}
function Qu(r, e, t) {
  return t === 90 || t === 270 ? r -= e / 2 : (t > 270 || t < 90) && (r -= e), r;
}
function e4(r, e, t) {
  const { left: o, top: i, right: n, bottom: s } = t, { backdropColor: a } = e;
  if (!H(a)) {
    const c = Xt(e.borderRadius), l = ye(e.backdropPadding);
    r.fillStyle = a;
    const d = o - l.left, h = i - l.top, p = n - o + l.width, g = s - i + l.height;
    Object.values(c).some((b) => b !== 0) ? (r.beginPath(), Si(r, {
      x: d,
      y: h,
      w: p,
      h: g,
      radius: c
    }), r.fill()) : r.fillRect(d, h, p, g);
  }
}
function t4(r, e) {
  const { ctx: t, options: { pointLabels: o } } = r;
  for (let i = e - 1; i >= 0; i--) {
    const n = r._pointLabelItems[i];
    if (!n.visible)
      continue;
    const s = o.setContext(r.getPointLabelContext(i));
    e4(t, s, n);
    const a = se(s.font), { x: c, y: l, textAlign: d } = n;
    rr(t, r._pointLabels[i], c, l + a.lineHeight / 2, a, {
      color: s.color,
      textAlign: d,
      textBaseline: "middle"
    });
  }
}
function Bd(r, e, t, o) {
  const { ctx: i } = r;
  if (t)
    i.arc(r.xCenter, r.yCenter, e, 0, W);
  else {
    let n = r.getPointPosition(0, e);
    i.moveTo(n.x, n.y);
    for (let s = 1; s < o; s++)
      n = r.getPointPosition(s, e), i.lineTo(n.x, n.y);
  }
}
function r4(r, e, t, o, i) {
  const n = r.ctx, s = e.circular, { color: a, lineWidth: c } = e;
  !s && !o || !a || !c || t < 0 || (n.save(), n.strokeStyle = a, n.lineWidth = c, n.setLineDash(i.dash || []), n.lineDashOffset = i.dashOffset, n.beginPath(), Bd(r, t, s, o), n.closePath(), n.stroke(), n.restore());
}
function i4(r, e, t) {
  return Ht(r, {
    label: t,
    index: e,
    type: "pointLabel"
  });
}
const _r = class _r extends Io {
  constructor(e) {
    super(e), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
  }
  setDimensions() {
    const e = this._padding = ye(ls(this.options) / 2), t = this.width = this.maxWidth - e.width, o = this.height = this.maxHeight - e.height;
    this.xCenter = Math.floor(this.left + t / 2 + e.left), this.yCenter = Math.floor(this.top + o / 2 + e.top), this.drawingArea = Math.floor(Math.min(t, o) / 2);
  }
  determineDataLimits() {
    const { min: e, max: t } = this.getMinMax(!1);
    this.min = Q(e) && !isNaN(e) ? e : 0, this.max = Q(t) && !isNaN(t) ? t : 0, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / ls(this.options));
  }
  generateTickLabels(e) {
    Io.prototype.generateTickLabels.call(this, e), this._pointLabels = this.getLabels().map((t, o) => {
      const i = j(this.options.pointLabels.callback, [
        t,
        o
      ], this);
      return i || i === 0 ? i : "";
    }).filter((t, o) => this.chart.getDataVisibility(o));
  }
  fit() {
    const e = this.options;
    e.display && e.pointLabels.display ? qu(this) : this.setCenterPoint(0, 0, 0, 0);
  }
  setCenterPoint(e, t, o, i) {
    this.xCenter += Math.floor((e - t) / 2), this.yCenter += Math.floor((o - i) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(e, t, o, i));
  }
  getIndexAngle(e) {
    const t = W / (this._pointLabels.length || 1), o = this.options.startAngle || 0;
    return be(e * t + Ze(o));
  }
  getDistanceFromCenterForValue(e) {
    if (H(e))
      return NaN;
    const t = this.drawingArea / (this.max - this.min);
    return this.options.reverse ? (this.max - e) * t : (e - this.min) * t;
  }
  getValueForDistanceFromCenter(e) {
    if (H(e))
      return NaN;
    const t = e / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - t : this.min + t;
  }
  getPointLabelContext(e) {
    const t = this._pointLabels || [];
    if (e >= 0 && e < t.length) {
      const o = t[e];
      return i4(this.getContext(), e, o);
    }
  }
  getPointPosition(e, t, o = 0) {
    const i = this.getIndexAngle(e) - re + o;
    return {
      x: Math.cos(i) * t + this.xCenter,
      y: Math.sin(i) * t + this.yCenter,
      angle: i
    };
  }
  getPointPositionForValue(e, t) {
    return this.getPointPosition(e, this.getDistanceFromCenterForValue(t));
  }
  getBasePosition(e) {
    return this.getPointPositionForValue(e || 0, this.getBaseValue());
  }
  getPointLabelPosition(e) {
    const { left: t, top: o, right: i, bottom: n } = this._pointLabelItems[e];
    return {
      left: t,
      top: o,
      right: i,
      bottom: n
    };
  }
  drawBackground() {
    const { backgroundColor: e, grid: { circular: t } } = this.options;
    if (e) {
      const o = this.ctx;
      o.save(), o.beginPath(), Bd(this, this.getDistanceFromCenterForValue(this._endValue), t, this._pointLabels.length), o.closePath(), o.fillStyle = e, o.fill(), o.restore();
    }
  }
  drawGrid() {
    const e = this.ctx, t = this.options, { angleLines: o, grid: i, border: n } = t, s = this._pointLabels.length;
    let a, c, l;
    if (t.pointLabels.display && t4(this, s), i.display && this.ticks.forEach((d, h) => {
      if (h !== 0 || h === 0 && this.min < 0) {
        c = this.getDistanceFromCenterForValue(d.value);
        const p = this.getContext(h), g = i.setContext(p), b = n.setContext(p);
        r4(this, g, c, s, b);
      }
    }), o.display) {
      for (e.save(), a = s - 1; a >= 0; a--) {
        const d = o.setContext(this.getPointLabelContext(a)), { color: h, lineWidth: p } = d;
        !p || !h || (e.lineWidth = p, e.strokeStyle = h, e.setLineDash(d.borderDash), e.lineDashOffset = d.borderDashOffset, c = this.getDistanceFromCenterForValue(t.reverse ? this.min : this.max), l = this.getPointPosition(a, c), e.beginPath(), e.moveTo(this.xCenter, this.yCenter), e.lineTo(l.x, l.y), e.stroke());
      }
      e.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const e = this.ctx, t = this.options, o = t.ticks;
    if (!o.display)
      return;
    const i = this.getIndexAngle(0);
    let n, s;
    e.save(), e.translate(this.xCenter, this.yCenter), e.rotate(i), e.textAlign = "center", e.textBaseline = "middle", this.ticks.forEach((a, c) => {
      if (c === 0 && this.min >= 0 && !t.reverse)
        return;
      const l = o.setContext(this.getContext(c)), d = se(l.font);
      if (n = this.getDistanceFromCenterForValue(this.ticks[c].value), l.showLabelBackdrop) {
        e.font = d.string, s = e.measureText(a.label).width, e.fillStyle = l.backdropColor;
        const h = ye(l.backdropPadding);
        e.fillRect(-s / 2 - h.left, -n - d.size / 2 - h.top, s + h.width, d.size + h.height);
      }
      rr(e, a.label, 0, -n, d, {
        color: l.color,
        strokeColor: l.textStrokeColor,
        strokeWidth: l.textStrokeWidth
      });
    }), e.restore();
  }
  drawTitle() {
  }
};
_r.id = "radialLinear", _r.defaults = {
  display: !0,
  animate: !0,
  position: "chartArea",
  angleLines: {
    display: !0,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0
  },
  grid: {
    circular: !1
  },
  startAngle: 0,
  ticks: {
    showLabelBackdrop: !0,
    callback: cn.formatters.numeric
  },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: !0,
    font: {
      size: 10
    },
    callback(e) {
      return e;
    },
    padding: 5,
    centerPointLabels: !1
  }
}, _r.defaultRoutes = {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
}, _r.descriptors = {
  angleLines: {
    _fallback: "grid"
  }
};
let ds = _r;
const fn = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, Me = /* @__PURE__ */ Object.keys(fn);
function b1(r, e) {
  return r - e;
}
function m1(r, e) {
  if (H(e))
    return null;
  const t = r._adapter, { parser: o, round: i, isoWeekday: n } = r._parseOpts;
  let s = e;
  return typeof o == "function" && (s = o(s)), Q(s) || (s = typeof o == "string" ? t.parse(s, o) : t.parse(s)), s === null ? null : (i && (s = i === "week" && (Sr(n) || n === !0) ? t.startOf(s, "isoWeek", n) : t.startOf(s, i)), +s);
}
function v1(r, e, t, o) {
  const i = Me.length;
  for (let n = Me.indexOf(r); n < i - 1; ++n) {
    const s = fn[Me[n]], a = s.steps ? s.steps : Number.MAX_SAFE_INTEGER;
    if (s.common && Math.ceil((t - e) / (a * s.size)) <= o)
      return Me[n];
  }
  return Me[i - 1];
}
function o4(r, e, t, o, i) {
  for (let n = Me.length - 1; n >= Me.indexOf(t); n--) {
    const s = Me[n];
    if (fn[s].common && r._adapter.diff(i, o, s) >= e - 1)
      return s;
  }
  return Me[t ? Me.indexOf(t) : 0];
}
function n4(r) {
  for (let e = Me.indexOf(r) + 1, t = Me.length; e < t; ++e)
    if (fn[Me[e]].common)
      return Me[e];
}
function y1(r, e, t) {
  if (!t)
    r[e] = !0;
  else if (t.length) {
    const { lo: o, hi: i } = Hs(t, e), n = t[o] >= e ? t[o] : t[i];
    r[n] = !0;
  }
}
function s4(r, e, t, o) {
  const i = r._adapter, n = +i.startOf(e[0].value, o), s = e[e.length - 1].value;
  let a, c;
  for (a = n; a <= s; a = +i.add(a, 1, o))
    c = t[a], c >= 0 && (e[c].major = !0);
  return e;
}
function C1(r, e, t) {
  const o = [], i = {}, n = e.length;
  let s, a;
  for (s = 0; s < n; ++s)
    a = e[s], i[a] = s, o.push({
      value: a,
      major: !1
    });
  return n === 0 || !t ? o : s4(r, o, i, t);
}
const Go = class Go extends dr {
  constructor(e) {
    super(e), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(e, t = {}) {
    const o = e.time || (e.time = {}), i = this._adapter = new f5._date(e.adapters.date);
    i.init(t), ii(o.displayFormats, i.formats()), this._parseOpts = {
      parser: o.parser,
      round: o.round,
      isoWeekday: o.isoWeekday
    }, super.init(e), this._normalized = t.normalized;
  }
  parse(e, t) {
    return e === void 0 ? null : m1(this, e);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const e = this.options, t = this._adapter, o = e.time.unit || "day";
    let { min: i, max: n, minDefined: s, maxDefined: a } = this.getUserBounds();
    function c(l) {
      !s && !isNaN(l.min) && (i = Math.min(i, l.min)), !a && !isNaN(l.max) && (n = Math.max(n, l.max));
    }
    (!s || !a) && (c(this._getLabelBounds()), (e.bounds !== "ticks" || e.ticks.source !== "labels") && c(this.getMinMax(!1))), i = Q(i) && !isNaN(i) ? i : +t.startOf(Date.now(), o), n = Q(n) && !isNaN(n) ? n : +t.endOf(Date.now(), o) + 1, this.min = Math.min(i, n - 1), this.max = Math.max(i + 1, n);
  }
  _getLabelBounds() {
    const e = this.getLabelTimestamps();
    let t = Number.POSITIVE_INFINITY, o = Number.NEGATIVE_INFINITY;
    return e.length && (t = e[0], o = e[e.length - 1]), {
      min: t,
      max: o
    };
  }
  buildTicks() {
    const e = this.options, t = e.time, o = e.ticks, i = o.source === "labels" ? this.getLabelTimestamps() : this._generate();
    e.bounds === "ticks" && i.length && (this.min = this._userMin || i[0], this.max = this._userMax || i[i.length - 1]);
    const n = this.min, s = this.max, a = V2(i, n, s);
    return this._unit = t.unit || (o.autoSkip ? v1(t.minUnit, this.min, this.max, this._getLabelCapacity(n)) : o4(this, a.length, t.minUnit, this.min, this.max)), this._majorUnit = !o.major.enabled || this._unit === "year" ? void 0 : n4(this._unit), this.initOffsets(i), e.reverse && a.reverse(), C1(this, a, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((e) => +e.value));
  }
  initOffsets(e = []) {
    let t = 0, o = 0, i, n;
    this.options.offset && e.length && (i = this.getDecimalForValue(e[0]), e.length === 1 ? t = 1 - i : t = (this.getDecimalForValue(e[1]) - i) / 2, n = this.getDecimalForValue(e[e.length - 1]), e.length === 1 ? o = n : o = (n - this.getDecimalForValue(e[e.length - 2])) / 2);
    const s = e.length < 3 ? 0.5 : 0.25;
    t = ce(t, 0, s), o = ce(o, 0, s), this._offsets = {
      start: t,
      end: o,
      factor: 1 / (t + 1 + o)
    };
  }
  _generate() {
    const e = this._adapter, t = this.min, o = this.max, i = this.options, n = i.time, s = n.unit || v1(n.minUnit, t, o, this._getLabelCapacity(t)), a = E(i.ticks.stepSize, 1), c = s === "week" ? n.isoWeekday : !1, l = Sr(c) || c === !0, d = {};
    let h = t, p, g;
    if (l && (h = +e.startOf(h, "isoWeek", c)), h = +e.startOf(h, l ? "day" : s), e.diff(o, t, s) > 1e5 * a)
      throw new Error(t + " and " + o + " are too far apart with stepSize of " + a + " " + s);
    const b = i.ticks.source === "data" && this.getDataTimestamps();
    for (p = h, g = 0; p < o; p = +e.add(p, a, s), g++)
      y1(d, p, b);
    return (p === o || i.bounds === "ticks" || g === 1) && y1(d, p, b), Object.keys(d).sort(b1).map((m) => +m);
  }
  getLabelForValue(e) {
    const t = this._adapter, o = this.options.time;
    return o.tooltipFormat ? t.format(e, o.tooltipFormat) : t.format(e, o.displayFormats.datetime);
  }
  format(e, t) {
    const i = this.options.time.displayFormats, n = this._unit, s = t || i[n];
    return this._adapter.format(e, s);
  }
  _tickFormatFunction(e, t, o, i) {
    const n = this.options, s = n.ticks.callback;
    if (s)
      return j(s, [
        e,
        t,
        o
      ], this);
    const a = n.time.displayFormats, c = this._unit, l = this._majorUnit, d = c && a[c], h = l && a[l], p = o[t], g = l && h && p && p.major;
    return this._adapter.format(e, i || (g ? h : d));
  }
  generateTickLabels(e) {
    let t, o, i;
    for (t = 0, o = e.length; t < o; ++t)
      i = e[t], i.label = this._tickFormatFunction(i.value, t, e);
  }
  getDecimalForValue(e) {
    return e === null ? NaN : (e - this.min) / (this.max - this.min);
  }
  getPixelForValue(e) {
    const t = this._offsets, o = this.getDecimalForValue(e);
    return this.getPixelForDecimal((t.start + o) * t.factor);
  }
  getValueForPixel(e) {
    const t = this._offsets, o = this.getDecimalForPixel(e) / t.factor - t.end;
    return this.min + o * (this.max - this.min);
  }
  _getLabelSize(e) {
    const t = this.options.ticks, o = this.ctx.measureText(e).width, i = Ze(this.isHorizontal() ? t.maxRotation : t.minRotation), n = Math.cos(i), s = Math.sin(i), a = this._resolveTickFontOptions(0).size;
    return {
      w: o * n + a * s,
      h: o * s + a * n
    };
  }
  _getLabelCapacity(e) {
    const t = this.options.time, o = t.displayFormats, i = o[t.unit] || o.millisecond, n = this._tickFormatFunction(e, 0, C1(this, [
      e
    ], this._majorUnit), i), s = this._getLabelSize(n), a = Math.floor(this.isHorizontal() ? this.width / s.w : this.height / s.h) - 1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let e = this._cache.data || [], t, o;
    if (e.length)
      return e;
    const i = this.getMatchingVisibleMetas();
    if (this._normalized && i.length)
      return this._cache.data = i[0].controller.getAllParsedValues(this);
    for (t = 0, o = i.length; t < o; ++t)
      e = e.concat(i[t].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(e);
  }
  getLabelTimestamps() {
    const e = this._cache.labels || [];
    let t, o;
    if (e.length)
      return e;
    const i = this.getLabels();
    for (t = 0, o = i.length; t < o; ++t)
      e.push(m1(this, i[t]));
    return this._cache.labels = this._normalized ? e : this.normalize(e);
  }
  normalize(e) {
    return X1(e.sort(b1));
  }
};
Go.id = "time", Go.defaults = {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: !1,
    major: {
      enabled: !1
    }
  }
};
let Di = Go;
function vo(r, e, t) {
  let o = 0, i = r.length - 1, n, s, a, c;
  t ? (e >= r[o].pos && e <= r[i].pos && ({ lo: o, hi: i } = ut(r, "pos", e)), { pos: n, time: a } = r[o], { pos: s, time: c } = r[i]) : (e >= r[o].time && e <= r[i].time && ({ lo: o, hi: i } = ut(r, "time", e)), { time: n, pos: a } = r[o], { time: s, pos: c } = r[i]);
  const l = s - n;
  return l ? a + (c - a) * (e - n) / l : a;
}
const Jo = class Jo extends Di {
  constructor(e) {
    super(e), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const e = this._getTimestampsForTable(), t = this._table = this.buildLookupTable(e);
    this._minPos = vo(t, this.min), this._tableRange = vo(t, this.max) - this._minPos, super.initOffsets(e);
  }
  buildLookupTable(e) {
    const { min: t, max: o } = this, i = [], n = [];
    let s, a, c, l, d;
    for (s = 0, a = e.length; s < a; ++s)
      l = e[s], l >= t && l <= o && i.push(l);
    if (i.length < 2)
      return [
        {
          time: t,
          pos: 0
        },
        {
          time: o,
          pos: 1
        }
      ];
    for (s = 0, a = i.length; s < a; ++s)
      d = i[s + 1], c = i[s - 1], l = i[s], Math.round((d + c) / 2) !== l && n.push({
        time: l,
        pos: s / (a - 1)
      });
    return n;
  }
  _generate() {
    const e = this.min, t = this.max;
    let o = super.getDataTimestamps();
    return (!o.includes(e) || !o.length) && o.splice(0, 0, e), (!o.includes(t) || o.length === 1) && o.push(t), o.sort((i, n) => i - n);
  }
  _getTimestampsForTable() {
    let e = this._cache.all || [];
    if (e.length)
      return e;
    const t = this.getDataTimestamps(), o = this.getLabelTimestamps();
    return t.length && o.length ? e = this.normalize(t.concat(o)) : e = t.length ? t : o, e = this._cache.all = e, e;
  }
  getDecimalForValue(e) {
    return (vo(this._table, e) - this._minPos) / this._tableRange;
  }
  getValueForPixel(e) {
    const t = this._offsets, o = this.getDecimalForPixel(e) / t.factor - t.end;
    return vo(this._table, o * this._tableRange + this._minPos, !0);
  }
};
Jo.id = "timeseries", Jo.defaults = Di.defaults;
let hs = Jo;
var a4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale: ss,
  LinearScale: as,
  LogarithmicScale: cs,
  RadialLinearScale: ds,
  TimeScale: Di,
  TimeSeriesScale: hs
});
const c4 = [
  p5,
  Z3,
  Vu,
  a4
], l4 = k`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    position: relative;
    width: 100%;
  }

  :host([loading]) .cre8-c-chart__container {
    opacity: 0.5;
    pointer-events: none;
  }

  .cre8-c-chart {
    position: relative;
    width: 100%;
  }

  .cre8-c-chart__container {
    position: relative;
    width: 100%;
    transition: opacity 0.2s ease;
  }

  .cre8-c-chart__canvas-wrapper {
    position: relative;
    width: 100%;
  }

  canvas {
    display: flex;
    justify-content: center;
    max-height: 100%;
    max-width: 100%;
    width: auto !important;
  }

  .cre8-c-chart__loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .cre8-c-chart__spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--cre8-color-border-default, #e5e7eb);
    border-top-color: var(--cre8-color-bg-brand, #0066B3);
    border-radius: 50%;
    animation: cre8-chart-spin 0.8s linear infinite;
  }

  .cre8-c-chart__loading-text {
    margin-top: var(--cre8-spacing-2, 8px);
    font-size: var(--cre8-font-size-sm, 14px);
    color: var(--cre8-color-content-subtle, #6b7280);
  }

  @keyframes cre8-chart-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Tooltip customization */
  .cre8-c-chart__tooltip {
    background-color: var(--cre8-color-bg-default, #ffffff);
    border: 1px solid var(--cre8-color-border-default, #e5e7eb);
    border-radius: var(--cre8-border-radius-default, 4px);
    box-shadow: var(--cre8-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
    padding: var(--cre8-spacing-2, 8px) var(--cre8-spacing-3, 12px);
    font-family: var(--cre8-font-family-default, inherit);
    font-size: var(--cre8-font-size-sm, 14px);
    color: var(--cre8-color-content-default, #1f2937);
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    .cre8-c-chart__spinner {
      width: 32px;
      height: 32px;
    }
  }
`;
var d4 = Object.defineProperty, pe = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && d4(e, t, i), i;
};
Pi.register(...c4);
const Ca = class Ca extends M {
  constructor() {
    super(...arguments), this.type = "bar", this.data = { datasets: [] }, this.options = {}, this.height = 400, this.maintainAspectRatio = !0, this.responsive = !0, this.loading = !1, this.ariaLabel = "Chart", this.showLegend = !0, this.legendPosition = "top", this.enableAnimation = !0, this.animationDuration = 750, this.colors = [
      "#0066B3",
      // Primary blue
      "#00A3E0",
      // Accent cyan
      "#059669",
      // Success green
      "#D97706",
      // Warning orange
      "#DC2626",
      // Error red
      "#7C3AED",
      // Purple
      "#DB2777",
      // Pink
      "#0891B2"
      // Teal
    ], this._chartInstance = null, this._isConnected = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._isConnected = !0;
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._isConnected = !1, this._destroyChart();
  }
  firstUpdated(e) {
    super.firstUpdated(e), this.loading || this._initializeChart();
  }
  updated(e) {
    if (super.updated(e), e.has("loading") && !this.loading && !this._chartInstance) {
      this._initializeChart();
      return;
    }
    if (!this.loading) {
      if (e.has("type") && this._chartInstance) {
        this._destroyChart(), this._initializeChart();
        return;
      }
      (e.has("data") || e.has("options") || e.has("showLegend") || e.has("legendPosition") || e.has("colors")) && this._chartInstance && this._updateChart();
    }
  }
  /**
   * Initialize the Chart.js instance.
   */
  _initializeChart() {
    if (!this._canvas || !this._isConnected)
      return;
    const e = this._canvas.getContext("2d");
    if (!e) {
      console.error("Cre8Chart: Unable to get canvas 2D context");
      return;
    }
    const t = this._buildChartConfig();
    this._chartInstance = new Pi(e, t), this.dispatch({
      eventName: "cre8-chart-ready",
      detailObj: { chart: this._chartInstance }
    });
  }
  /**
   * Build the complete Chart.js configuration.
   */
  _buildChartConfig() {
    const e = this._processData();
    return {
      type: this.type,
      data: e,
      options: this._mergeOptions()
    };
  }
  /**
   * Process chart data and apply default colors.
   */
  _processData() {
    if (!this.data || !this.data.datasets)
      return { labels: [], datasets: [] };
    const e = this.data.datasets.map((t, o) => {
      const i = o % this.colors.length, n = this.colors[i];
      if (["pie", "doughnut", "polarArea"].includes(this.type)) {
        const s = Array.isArray(t.data) ? t.data.length : 0, a = Array.from(
          { length: s },
          (c, l) => this.colors[l % this.colors.length]
        );
        return {
          ...t,
          backgroundColor: t.backgroundColor || a,
          borderColor: t.borderColor || "#ffffff",
          borderWidth: t.borderWidth ?? 2
        };
      }
      return this.type === "line" ? {
        ...t,
        backgroundColor: t.backgroundColor || `${n}20`,
        borderColor: t.borderColor || n,
        borderWidth: t.borderWidth ?? 2,
        fill: t.fill ?? !1,
        tension: t.tension ?? 0.4,
        pointRadius: t.pointRadius ?? 4,
        pointHoverRadius: t.pointHoverRadius ?? 6
      } : this.type === "bar" ? {
        ...t,
        backgroundColor: t.backgroundColor || n,
        borderColor: t.borderColor || n,
        borderWidth: t.borderWidth ?? 0,
        borderRadius: 4
      } : this.type === "radar" ? {
        ...t,
        backgroundColor: t.backgroundColor || `${n}40`,
        borderColor: t.borderColor || n,
        borderWidth: t.borderWidth ?? 2,
        pointBackgroundColor: n,
        pointBorderColor: "#ffffff"
      } : {
        ...t,
        backgroundColor: t.backgroundColor || n,
        borderColor: t.borderColor || n
      };
    });
    return {
      labels: this.data.labels || [],
      datasets: e
    };
  }
  /**
   * Merge user options with default options.
   */
  _mergeOptions() {
    const e = {
      responsive: this.responsive,
      maintainAspectRatio: this.maintainAspectRatio,
      animation: this.enableAnimation ? { duration: this.animationDuration } : !1,
      plugins: {
        legend: {
          display: this.showLegend,
          position: this.legendPosition,
          labels: {
            usePointStyle: !0,
            padding: 16,
            font: {
              family: "Inter, system-ui, sans-serif",
              size: 12
            }
          }
        },
        tooltip: {
          enabled: !0,
          backgroundColor: "#1F2937",
          titleFont: {
            family: "Inter, system-ui, sans-serif",
            size: 13
          },
          bodyFont: {
            family: "Inter, system-ui, sans-serif",
            size: 12
          },
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (t) => {
              const o = t.dataset.label || "", i = t.parsed.y ?? t.parsed;
              return `${o}: ${i}`;
            }
          }
        }
      },
      onClick: (t, o, i) => {
        this._handleChartClick(t, o, i);
      },
      onHover: (t, o, i) => {
        this._handleChartHover(t, o, i);
      }
    };
    return ["line", "bar", "scatter", "bubble"].includes(this.type) && (e.scales = {
      x: {
        grid: {
          display: !0,
          color: "#E5E7EB"
        },
        ticks: {
          font: {
            family: "Inter, system-ui, sans-serif",
            size: 11
          },
          color: "#6B7280"
        }
      },
      y: {
        grid: {
          display: !0,
          color: "#E5E7EB"
        },
        ticks: {
          font: {
            family: "Inter, system-ui, sans-serif",
            size: 11
          },
          color: "#6B7280"
        },
        beginAtZero: !0
      }
    }), this._deepMerge(e, this.options);
  }
  /**
   * Deep merge two objects.
   */
  _deepMerge(e, t) {
    const o = { ...e };
    for (const i in t)
      Object.prototype.hasOwnProperty.call(t, i) && (t[i] && typeof t[i] == "object" && !Array.isArray(t[i]) ? o[i] = this._deepMerge(
        e[i] || {},
        t[i]
      ) : o[i] = t[i]);
    return o;
  }
  /**
   * Update the existing chart with new data/options.
   */
  _updateChart() {
    if (!this._chartInstance)
      return;
    const e = this._processData();
    this._chartInstance.data = e, this._chartInstance.options = this._mergeOptions(), this._chartInstance.update(this.enableAnimation ? "default" : "none");
  }
  /**
   * Destroy the chart instance.
   */
  _destroyChart() {
    this._chartInstance && (this._chartInstance.destroy(), this._chartInstance = null);
  }
  /**
   * Handle chart click events.
   */
  _handleChartClick(e, t, o) {
    if (t.length > 0) {
      const i = t[0], n = i.datasetIndex, s = i.index, c = this.data.datasets[n]?.data[s], l = this.data.labels?.[s], d = {
        event: e,
        elements: t,
        chart: o,
        dataIndex: s,
        datasetIndex: n,
        value: c,
        label: l
      };
      this.dispatch({ eventName: "cre8-chart-click", detailObj: d });
    }
  }
  /**
   * Handle chart hover events.
   */
  _handleChartHover(e, t, o) {
    const i = o.canvas;
    if (i.style.cursor = t.length > 0 ? "pointer" : "default", t.length > 0) {
      const n = t[0], s = n.datasetIndex, a = n.index, l = this.data.datasets[s]?.data[a], d = this.data.labels?.[a], h = {
        event: e,
        elements: t,
        chart: o,
        dataIndex: a,
        datasetIndex: s,
        value: l,
        label: d
      };
      this.dispatch({ eventName: "cre8-chart-hover", detailObj: h });
    }
  }
  /**
   * Public method to get the Chart.js instance.
   */
  getChartInstance() {
    return this._chartInstance;
  }
  /**
   * Public method to force refresh the chart.
   */
  refresh() {
    this._destroyChart(), this._initializeChart();
  }
  /**
   * Public method to download chart as image.
   */
  downloadImage(e = "chart.png") {
    if (!this._chartInstance)
      return;
    const t = this._chartInstance.toBase64Image(), o = document.createElement("a");
    o.download = e, o.href = t, o.click();
  }
  render() {
    const e = this.componentClassNames("cre8-c-chart", {
      "cre8-c-chart--loading": this.loading
    }), t = `
            width: ${this.width ? `${this.width}px` : "100%"};
            height: ${this.height}px;
        `;
    return f`
            <div class="${e}" style="${t}">
                ${this.loading ? f`
                        <div class="cre8-c-chart__loading">
                            <div class="cre8-c-chart__spinner"></div>
                            <span class="cre8-c-chart__loading-text">Loading chart...</span>
                        </div>
                    ` : f`
                        <canvas
                            role="img"
                            aria-label="${this.ariaLabel}"
                        ></canvas>
                    `}
            </div>
        `;
  }
};
Ca.styles = [l4];
let ie = Ca;
pe([
  u({ type: String })
], ie.prototype, "type");
pe([
  u({ type: Object, attribute: !1 })
], ie.prototype, "data");
pe([
  u({ type: Object, attribute: !1 })
], ie.prototype, "options");
pe([
  u({ type: Number })
], ie.prototype, "width");
pe([
  u({ type: Number })
], ie.prototype, "height");
pe([
  u({ type: Boolean, attribute: "maintain-aspect-ratio" })
], ie.prototype, "maintainAspectRatio");
pe([
  u({ type: Boolean })
], ie.prototype, "responsive");
pe([
  u({ type: Boolean, reflect: !0 })
], ie.prototype, "loading");
pe([
  u({ type: String, attribute: "aria-label" })
], ie.prototype, "ariaLabel");
pe([
  u({ type: Boolean, attribute: "show-legend" })
], ie.prototype, "showLegend");
pe([
  u({ type: String, attribute: "legend-position" })
], ie.prototype, "legendPosition");
pe([
  u({ type: Boolean, attribute: "enable-animation" })
], ie.prototype, "enableAnimation");
pe([
  u({ type: Number, attribute: "animation-duration" })
], ie.prototype, "animationDuration");
pe([
  u({ type: Array, attribute: !1 })
], ie.prototype, "colors");
pe([
  R()
], ie.prototype, "_chartInstance");
pe([
  R()
], ie.prototype, "_isConnected");
pe([
  oe("canvas")
], ie.prototype, "_canvas");
customElements.get("cre8-chart") === void 0 && customElements.define("cre8-chart", ie);
const h4 = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let ee = (r = 21) => {
  let e = "", t = crypto.getRandomValues(new Uint8Array(r |= 0));
  for (; r--; )
    e += h4[t[r] & 63];
  return e;
};
const u4 = k`@import '../../design-tokens/core/scss/theming/component';

:host {
  display: flex;
}

/**
 * Field Note
 * 1) Messaging associated with the form field usually located below the form field input
 */
.cre8-c-field-note {
  display: flex;
  align-items: flex-start;
  gap: calc(8px * 0.5);
  color: var(--cre8-color-content-default);
  margin-top: calc(8px * 0.5);
}

.cre8-field-note-icon {
  margin-top: calc(8px * 0.5);
  height: calc(8px * 2);
  width: calc(8px * 2);
}

/**
 * Field Note Error State
 */
.cre8-c-field-note.cre8-is-error {
  color: var(--cre8-color-content-error);
}

/**
 * Field Note Success State
 */
.cre8-c-field-note.cre8-is-success {
  color: var(--cre8-color-content-success);
}

/**
 * Inverted field note
 */
.cre8-c-field-note--inverted {
  color: var(--cre8-color-content-knockout);
}
`;
var p4 = Object.defineProperty, qs = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && p4(e, t, i), i;
};
const xa = class xa extends M {
  /**
   * Check if there are success or error states and set "aria-live=polite"
   */
  fieldNoteAriaLive() {
    return this.isError || this.isSuccess ? "polite" : null;
  }
  render() {
    const e = this.componentClassNames("cre8-c-field-note", {
      "cre8-is-error": this.isError,
      "cre8-is-success": this.isSuccess
    });
    return f`
        <div
          aria-live="${this.fieldNoteAriaLive() ?? "off"}"
          class="${e}">
        ${this.isError === !0 ? f`<cre8-icon class="cre8-field-note-icon" svg='${As}' aria-hidden="true" ></cre8-icon>` : ""}
            ${this.isSuccess === !0 ? f`<cre8-icon class="cre8-field-note-icon" svg='${Mr}' aria-hidden="true"></cre8-icon>` : ""}
          <div><slot></slot></div>
        </div>
    `;
  }
};
xa.styles = [u4];
let Er = xa;
qs([
  u({ type: Boolean, reflect: !0 })
], Er.prototype, "isError");
qs([
  u({ type: Boolean, reflect: !0 })
], Er.prototype, "isSuccess");
qs([
  u()
], Er.prototype, "iconName");
customElements.get("cre8-field-note") === void 0 && customElements.define("cre8-field-note", Er);
const f4 = k`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
 #CHECKBOX-FIELD
\*------------------------------------*/

:host {
  display: flex;
}

/** 
 * 1) Fieldset used for checkbox items
 */
.cre8-c-checkbox-field {
  border: none;
  padding: 0;
  margin: 0;
}

/** 
   * Checkbox field legend
   */
.cre8-c-checkbox-field__legend {
  @include cre8-typography-label-small();
  margin-bottom: calc(8px * 1);
}

/** 
   * Checkbox list
   */
.cre8-c-checkbox-field__list {
  display: flex;
  flex-direction: column;
}`;
var g4 = Object.defineProperty, hr = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && g4(e, t, i), i;
};
const _a = class _a extends M {
  connectedCallback() {
    super.connectedCallback(), this.fieldNote && (this.ariaDescribedBy = this.ariaDescribedBy || ee());
  }
  render() {
    const e = this.componentClassNames("cre8-c-checkbox-field", {});
    return f`
      <fieldset class="${e}" aria-describedby="${$(this.ariaDescribedBy)}">
      <legend class="cre8-c-checkbox-field__legend">${this.label}</legend>
        <div class="cre8-c-checkbox-field__body">
          <div class="cre8-c-checkbox-field__list" role="list">
            <slot></slot>
          </div>
        </div>
        ${this.fieldNote ? f`<cre8-field-note
          ?inverted=${this.fieldNoteKnockout}
          id=${$(this.ariaDescribedBy)}
          iconName=${$(this.fieldNoteIconName)}
          ?isSuccess=${this.fieldNoteIsSuccess}
          ?isError=${this.fieldNoteIsError}
        >
          ${this.fieldNote}
        </cre8-field-note>` : ""}
      </fieldset>
    `;
  }
};
_a.styles = [f4];
let et = _a;
hr([
  u()
], et.prototype, "label");
hr([
  u()
], et.prototype, "fieldNote");
hr([
  u()
], et.prototype, "ariaDescribedBy");
hr([
  u()
], et.prototype, "fieldNoteIconName");
hr([
  u({ type: Boolean, reflect: !0 })
], et.prototype, "fieldNoteKnockout");
hr([
  u({ type: Boolean, reflect: !0 })
], et.prototype, "fieldNoteIsSuccess");
hr([
  u({ type: Boolean, reflect: !0 })
], et.prototype, "fieldNoteIsError");
customElements.get("cre8-checkbox-field") === void 0 && customElements.define("cre8-checkbox-field", et);
const b4 = k`
@import '../../design-tokens/core/scss/theming/component.scss';
@import '../../design-tokens/core/scss/theming/visibility.scss';

/*------------------------------------*\
 #CHECKBOX-FIELD-ITEM
\*------------------------------------*/

:host {
  display: inline-flex;
  flex-wrap: wrap;
}

/** 
 * 1) Form field that is composed of a checkbox input, label, and an optional field note.
 */
.cre8-c-checkbox-field-item {
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: calc(8px * 1);
  min-height: calc(8px * 3);

  /** 
  * Checkbox field item within last cre8-checkbox-field-item wrapper in a fieldset
  * 1) Remove margin bottom on last item
  */
  :host(:last-child) & {
    margin-bottom: 0; /* 1 */
  }
}

/** 
 * Checkbox field item input 
 */
.cre8-c-checkbox-field-item__input {
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(8px * 3);
  min-width: calc(8px * 3);
  margin: 0;
  z-index: 1;

  /** 
 * Checkbox field item input error
 */
  .cre8-c-checkbox-field-item--disabled & {
    cursor: not-allowed;
  }
}

/** 
 * Checkbox field item custom checkbox container
 */
.cre8-c-checkbox-field-item__custom-checkbox {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(8px * 3);
  width: calc(8px * 3);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: var(--cre8-border-radius-small);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  background-color: var(--cre8-color-bg-default);
  border-color: var(--cre8-color-border-strong);

  /** 
  * Checkbox field item custom checkbox focus visible  custom outline
  */
  .cre8-c-checkbox-field-item__input:focus-visible + & {
    @include focus;

    .cre8-c-checkbox-field-item--error & {
      @include focusError;
    }
  }

  /** 
  * Checkbox field item custom checkbox within checkbox field with error
  */
  .cre8-c-checkbox-field-item--error & {
    background-color: var(--cre8-color-bg-default);
    border-color: var(--cre8-color-border-error);
  }

  /** 
  * Checkbox field item custom checkbox within checkbox field with disabled
  */
  .cre8-c-checkbox-field-item--disabled & {
    cursor: not-allowed;
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
  }
}

/**
  * Checkbox field item custom checkbox when item is checked
  */
.cre8-c-checkbox-field-item__input:checked + .cre8-c-checkbox-field-item__custom-checkbox {
  background-color: var(--cre8-color-bg-brand-strong);

  /** 
  * Checkbox field item custom checkbox when item is checked with error
  */
  .cre8-c-checkbox-field-item--error & {
    background-color: var(--cre8-color-bg-default);
  }

  /** 
  * Checkbox field item custom checkbox when item is checked with disabled
  */
  .cre8-c-checkbox-field-item--disabled & {
    background-color: var(--cre8-color-bg-disabled);
  }
}

/** 
 * Checkbox field item checkmark icon
 */
.cre8-c-checkbox-field-item__icon {
  display: none;
  color: var(--cre8-color-content-knockout);

  /** 
  * Checkbox field item icon within checkbox field with error
  */
  .cre8-c-checkbox-field-item--error & {
    color: var(--cre8-color-content-error);
  }

  /** 
  * Checkbox field item icon within checkbox field disabled
  */
  .cre8-c-checkbox-field-item--disabled & {
    color: var(--cre8-color-content-disabled);
  }

  /**
  * Checkbox field item icon will display in the box if the input is checked
  */
  .cre8-c-checkbox-field-item__input:checked + .cre8-c-checkbox-field-item__custom-checkbox & {
    display: flex;
  }
}

/** 
 * Checkbox field item input 
 */
.cre8-c-checkbox-field-item__label {
  margin-left: calc(8px * 4);
  @include cre8-typography-label-small;
}

/** 
 * Checkbox field item field notes
 */
.cre8-c-checkbox-field-item__field-note,
.cre8-c-checkbox-field-item__field-note-success,
.cre8-c-checkbox-field-item__field-note-error {
  flex-basis: 100%;
}`;
var m4 = Object.defineProperty, _e = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && m4(e, t, i), i;
};
const wa = class wa extends le {
  constructor() {
    super(...arguments), this.type = "checkbox", this.errorText = "Error", this.successText = "Success";
  }
  /**
   * Connected callback lifecycle
   * 1) Set the fieldID to a random string if not provided so form is always accessible
   * 2) If a fieldnote is added, set the aria-describedby property to the `ariaDescribedBy` property
   * or a random string to always make the form field accessible.
   * 3) Set the form internal data to set that to the default checked state.
   * 4) Set the default value of the checkbox field item to the checked property
  */
  connectedCallback() {
    super.connectedCallback(), this.setFormData(), this.defaultValue = this.checked;
  }
  /**
   * access role when check-box-field-item embedded in checkbox-field
   */
  getRole() {
    return this.closest("cre8-checkbox-field") ? "listitem" : "";
  }
  /**
   * Set form data
   * 1) If a checked property is provided, set the form value the checkbox value attribute.
   * Otherwise, don't provide a value for the checkbox data array
   */
  setFormData() {
    return this.checked ? this._internals.setFormValue(this.value || "on") : this._internals.setFormValue(null);
  }
  /**
   * Handle on checkbox change
   * 1) On change of the checkbox input, if `checked` is true, then set it to false and vice versa.
   */
  _clickHandler() {
    return this.checked = !this.checked, this.checked ? this._internals.setFormValue(this.value || "on") : this._internals.setFormValue(null);
  }
  /**
   * Handle On Change
   * 1. Set the value when the select is changed.
   * 2. Fire the custom event with the current value.
   */
  _handleOnChange(e) {
    const t = e.target;
    this.value = t.value, this._internals.setFormValue(this.value);
    const o = new CustomEvent("change", {
      detail: {
        name: this.name,
        value: this.value
      },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(o);
  }
  /**
   * Form reset callback
   * 1) Set checked property to the default value and then set the input's checked attribute to that default value
   * 2) Set the input's checked attribute to that default value
   * 3) Set the element internals form data when the form is reset
   * 4) Change the new value to the old value on reset
   */
  formResetCallback() {
    this.checked = this.defaultValue, this.field.checked = this.defaultValue, this.setFormData(), this.requestUpdate();
  }
  /**
   * First update lifecycle hook
   * 1) super.firstUpdated also uses the firstUpdated from the Cre8FormElement
   */
  firstUpdated() {
    return this.initializeAria(), super.firstUpdated();
  }
  /**
   * Initialize aria attributes
   */
  initializeAria() {
    this.fieldId = this.fieldId || ee(), (this.fieldNote || this.slotNotEmpty("fieldNote")) && (this.ariaDescribedBy = this.ariaDescribedBy || ee()), (this.successNote || this.errorNote) && (this.validationAriaDescribedBy = this.validationAriaDescribedBy || ee());
  }
  /**
   * Aria describedby string based on field notes and error/success notes
   * 1) If both validationAriaDescribedBy (error/success note) and field note exists,
   * render both in the input's `aria-describedby` attribute
   * 2) Otherwise, if only validationAriaDescribedBy exists, then render only that as
   * the `aria-describedby` attribute (input without field note initially, but then error/success is added).
   * 3) Otherwise, render only the `ariaDescribedBy` property (field note only)
   */
  fieldNoteAria() {
    return this.validationAriaDescribedBy && this.ariaDescribedBy ? `${this.ariaDescribedBy} ${this.validationAriaDescribedBy}` : this.validationAriaDescribedBy && !this.ariaDescribedBy ? this.validationAriaDescribedBy : this.ariaDescribedBy;
  }
  /**
   * Render the success or error field notes
   * 1. If there is a successNote, then return the field note with the success message and state.
   * 2. If there is a errorNote, then return the field note with the error message and state.
   */
  renderSuccessErrorFieldNote() {
    return this.successNote ? f`<cre8-field-note
        ?isSuccess=${this.isSuccess}
        id=${this.validationAriaDescribedBy}
        class="cre8-c-checkbox-field-item__field-note-success"
        iconName="success"
      >
        <span class="cre8-u-is-vishidden">${this.successText}</span> ${this.successNote}
      </cre8-field-note>` : this.errorNote ? f` <cre8-field-note
        ?isError=${this.isError}
        id=${this.validationAriaDescribedBy}
        class="cre8-c-checkbox-field-item__field-note-error"
        iconName="error-alt"
      >
        <span class="cre8-u-is-vishidden">${this.errorText}</span> ${this.errorNote}
      </cre8-field-note>` : null;
  }
  render() {
    const e = this.componentClassNames("cre8-c-checkbox-field-item", {
      "cre8-c-checkbox-field-item--error": this.isError,
      "cre8-c-checkbox-field-item--success": this.isSuccess,
      "cre8-c-checkbox-field-item--disabled": this.disabled
    });
    return f`
      <div role=${$(this.getRole())} class="${e}">
        <input class="cre8-c-checkbox-field-item__input"
          type="checkbox"
          @input=${this._clickHandler}
          id=${this.fieldId}
          name=${this.name ?? void 0}
          .value=${this.value}
          required=${$(this.required)}
          aria-invalid=${this.required ? !!this.isError : $(this.isError)}
          disabled="${$(this.disabled ? this.disabled : void 0)}"
          aria-describedby="${$(this.fieldNoteAria())}"
          .checked="${this.checked}"
          @change=${this._handleOnChange}
        />
        <span class="cre8-c-checkbox-field-item__custom-checkbox">
          <cre8-icon svg='${Ci}' class="cre8-c-checkbox-field-item__icon" aria-label="checkbox"
          aria-hidden="${!this.checked}"></cre8-icon>
        </span>
        <label class="cre8-c-checkbox-field-item__label" for=${this.fieldId}>${this.label}</label>
      </div>
      ${this.fieldNote || this.slotNotEmpty("fieldNote") ? f`<cre8-field-note id=${this.ariaDescribedBy} class="cre8-c-checkbox-field-item__field-note"
              ><slot name="fieldNote">${this.fieldNote}</slot></cre8-field-note
            >` : T}
        ${this.renderSuccessErrorFieldNote()}
    `;
  }
};
wa.styles = [b4];
let ae = wa;
_e([
  u({ type: String })
], ae.prototype, "label");
_e([
  u({ type: Boolean, reflect: !0 })
], ae.prototype, "isError");
_e([
  u()
], ae.prototype, "errorText");
_e([
  u()
], ae.prototype, "errorNote");
_e([
  u({ type: Boolean, reflect: !0 })
], ae.prototype, "isSuccess");
_e([
  u()
], ae.prototype, "successText");
_e([
  u()
], ae.prototype, "successNote");
_e([
  u({ type: Boolean, reflect: !0 })
], ae.prototype, "disabled");
_e([
  u({ type: Boolean, reflect: !0 })
], ae.prototype, "checked");
_e([
  u()
], ae.prototype, "fieldId");
_e([
  u()
], ae.prototype, "fieldNote");
_e([
  u()
], ae.prototype, "ariaDescribedBy");
_e([
  u()
], ae.prototype, "validationAriaDescribedBy");
_e([
  u({ type: Boolean, reflect: !0 })
], ae.prototype, "required");
_e([
  u()
], ae.prototype, "fieldNoteIconName");
_e([
  oe("input")
], ae.prototype, "field");
customElements.get("cre8-checkbox-field-item") === void 0 && customElements.define("cre8-checkbox-field-item", ae);
const v4 = k`@import '../../design-tokens/core/scss/theming/component';

:host {
  display: inline-flex;
}
:host([fullWidth]) {
  display: flex;

}
/**
 * 1) Danger Button or link that has functionality to it
 */

/**
 * Primary button
 */
.cre8-c-danger-button {
  @include cre8-typography-label-default();
  width: var(--cre8-button-width, auto);
  height: var(--cre8-button-height, auto);
  min-width: var(--cre8-button-min-width, auto);
  min-height: var(--cre8-button-min-height, auto);
  justify-content: center;
  text-align: center;
  margin-top: var( --cre8-button-margin-top, 0);
  margin-bottom: var( --cre8-button-margin-bottom, 0);
  margin-left: var( --cre8-button-margin-left, 0);
  margin-right: var( --cre8-button-margin-right, 0);
  display: inline-flex;
  align-items: center;
  border-width: var(--cre8-border-width-button-default);
  box-shadow: var(--cre8-shadow-button);
  padding-top: var(--cre8-button-padding-vertical-medium);
  padding-right: var(--cre8-button-padding-horizontal-medium);
  padding-bottom: var(--cre8-button-padding-vertical-medium);
  padding-left: var(--cre8-button-padding-horizontal-medium);
  margin: 0;
  cursor: pointer;
  border-style: var(--cre8-border-style-default);
  transition: revert;
  transform: revert;
  white-space: nowrap;
  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    border-style: var(--cre8-border-style-default);
    box-shadow: none;
    transform: revert;
    transition: revert;
  }
  &.cre8-c-danger-button--primary {
    background: var(--cre8-color-button-primary-danger-bg);
    border-width: var(--cre8-border-width-button-default);
    border-color: var(--cre8-color-button-primary-danger-border);
    border-radius: var(--cre8-border-radius-button);
    box-shadow: var(--cre8-shadow-button);
    color: var(--cre8-color-button-primary-danger-content);
    --cre8-icon-fill: var(--cre8-color-button-primary-danger-content);
    &:hover,
    &:focus {
      box-shadow: none;
      --cre8-icon-fill: var(--cre8-color-button-primary-danger-content-hover);
      color: var(--cre8-color-button-primary-danger-content-hover);
      border-color: var(--cre8-color-button-primary-danger-border-hover);
      background: var(--cre8-color-button-primary-danger-bg-hover);
      text-decoration: none;
      &:focus {
        @includefocus();
      }
    }
    &:active,
    &.cre8-c-danger-button--loading {
      box-shadow: none;
      color: var(--cre8-color-button-primary-danger-content-active);
      --cre8-icon-fill: var(--cre8-color-button-primary-danger-content-active);
      border-color: var(--cre8-color-button-primary-danger-border-active);
      background-color: var(--cre8-color-button-primary-danger-bg-active);
    }
    &:focus-visible{
      @includefocus();
    }
    &.cre8-c-danger-button--loading{
      cursor: not-allowed;
    }
/**
 * Disabled primary and secondary button
 */
  &:disabled {
    box-shadow: none;
    background-color: var(--cre8-color-button-primary-danger-bg-disabled);
    border-color: var(--cre8-color-button-primary-danger-border-disabled);
    color: var(--cre8-color-button-primary-danger-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-primary-danger-content-disabled);
    cursor: not-allowed;
    outline: none;
    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      background-color: var(--cre8-color-button-primary-danger-bg-disabled);
      border-color: var(--cre8-color-button-primary-danger-border-disabled);
      color: var(--cre8-color-button-primary-danger-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-primary-danger-content-disabled);
    }
  }

  &.cre8-c-danger-button--inverted {
    background-color: var(--cre8-color-button-primary-danger-inverse-bg);
    border-color: var(--cre8-color-button-primary-danger-inverse-border);
    color: var(--cre8-color-button-primary-danger-inverse-content);
  
    &:hover,
    &:focus {
     background-color: var(--cre8-color-button-primary-danger-inverse-bg-hover);
     border-color: var(--cre8-color-button-primary-danger-inverse-border-hover);
     color: var(--cre8-color-button-primary-danger-inverse-content-hover);
    }

    &:focus {
      outline-color: var(--cre8-color-button-primary-danger-inverse-outline);
     }

    &:active {
      background-color: var(--cre8-color-button-primary-danger-inverse-bg-active);
      border-color: var(--cre8-color-button-primary-danger-inverse-border-active);
      color: var(--cre8-color-button-primary-danger-inverse-content-active);
     
    &.cre8-c-danger-button--loading {
      --cre8-icon-fill: var(--cre8-color-button-primary-danger-content-active);
      }
    }

    &:disabled { 
      outline: none;
      cursor: not-allowed;
      background-color: var(--cre8-color-button-primary-danger-inverse-bg-disabled);
      border-color: var(--cre8-color-button-primary-danger-inverse-border-disabled);
      color: var(--cre8-color-button-primary-danger-inverse-content-disabled);
    }
  }
}

/**
 * Secondary button
 * The icon button shares the styles of the standard secondary button
 */
  &.cre8-c-danger-button--secondary {
    background-color: var(--cre8-color-button-secondary-danger-bg);
    border-color: var(--cre8-color-button-secondary-danger-border);
    color: var(--cre8-color-button-secondary-danger-content);
    --cre8-icon-fill: var(--cre8-color-button-secondary-danger-content);
    border-radius: var(--cre8-border-radius-button);
    border-width: var(--cre8-border-width-button-default);

  &:hover,
  &:focus {
    background-color: var(--cre8-color-button-secondary-danger-bg-hover);
    border-color: var(--cre8-color-button-secondary-danger-border-hover);
    color: var(--cre8-color-button-secondary-danger-content-hover);
    --cre8-icon-fill: var(--cre8-color-button-secondary-danger-content-hover);
    &:focus {
      @include focus;
    }
  }
  &:active,
  &.cre8-c-danger-button--loading {
    transition: none;
    transform: none;
    background-color: var(--cre8-color-button-secondary-danger-bg-active);
    border-color: var(--cre8-color-button-secondary-danger-border-active);
    color: var(--cre8-color-button-secondary-danger-content-active);
    --cre8-icon-fill: var(--cre8-color-button-secondary-danger-content-active);
  }
  &:focus-visible {
    @include focus;
  }
  &.cre8-c-danger-button--loading {
    cursor: not-allowed;
  }

  &:disabled {
    box-shadow: none;
    background-color: var(--cre8-color-button-secondary-danger-bg-disabled);
    border-color: var(--cre8-color-button-secondary-danger-border-disabled);
    color: var(--cre8-color-button-secondary-danger-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-secondary-danger-content-disabled);
    outline: none;
    border-radius: var(--cre8-border-radius-button);
    border-width: var(--cre8-border-width-button-default);
    cursor: not-allowed;
    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      background-color: var(--cre8-color-button-secondary-danger-bg-disabled);
      border-color: var(--cre8-color-button-secondary-danger-border-disabled);
      color: var(--cre8-color-button-secondary-danger-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-secondary-danger-content-disabled);
    }
  }

  &.cre8-c-danger-button--inverted {
    background-color: var(--cre8-color-button-secondary-danger-inverse-bg);
    border-color: var(--cre8-color-button-secondary-danger-inverse-border);
    color: var(--cre8-color-button-secondary-danger-inverse-content);
  
    &:hover,
    &:focus {
     background-color: var(--cre8-color-button-secondary-danger-inverse-bg-hover);
     border-color: var(--cre8-color-button-secondary-danger-inverse-border-hover);
     color: var(--cre8-color-button-secondary-danger-inverse-content-hover);
    }

    &:focus {
      outline-color: var(--cre8-color-button-secondary-danger-inverse-outline);
     }

    &:active {
      background-color: var(--cre8-color-button-secondary-danger-inverse-bg-active);
      border-color: var(--cre8-color-button-secondary-danger-inverse-border-active);
      color: var(--cre8-color-button-secondary-danger-inverse-content-active);
     
    &.cre8-c-danger-button--loading {
      --cre8-icon-fill: var(--cre8-color-button-secondary-danger-content-active);
      }
    }

    &:disabled { 
      outline: none;
      cursor: not-allowed;
      background-color: var(--cre8-color-button-secondary-danger-inverse-bg-disabled);
      border-color: var(--cre8-color-button-secondary-danger-inverse-border-disabled);
      color: var(--cre8-color-button-secondary-danger-inverse-content-disabled);
    }
  }
}

  /**
 * Tertiary button
 */
  &.cre8-c-danger-button--tertiary {
    border-radius: var(--cre8-border-radius-button);
    background-color: var(--cre8-color-button-tertiary-danger-bg);
    border-width: var(--cre8-border-width-button-default);
    border-color: var(--cre8-color-button-tertiary-danger-border);
    color: var(--cre8-color-button-tertiary-danger-content);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-danger-content);
    box-shadow: none;
    &:hover,
    &:focus {
      border-radius: var(--cre8-border-radius-button);
      background-color: var(--cre8-color-button-tertiary-danger-bg-hover);
      border-width: var(--cre8-border-width-button-default, --cre8-border-width-none);
      border-color: var(--cre8-color-button-tertiary-danger-border-hover);
      color: var(--cre8-color-button-tertiary-danger-content-hover);
      --cre8-icon-fill: var(--cre8-color-button-tertiary-danger-content-hover);
      &:focus {
        @include focusTertiary();
      }
    }
  &:active,
  &.cre8-c-danger-button--loading {
    border-radius: var(--cre8-border-radius-button);
    background-color: var(--cre8-color-button-tertiary-danger-bg-active);
    border-color: var(--cre8-color-button-tertiary-danger-border-active);
    border-width: var(--cre8-border-width-button-default);
    color: var(--cre8-color-button-tertiary-danger-content-active);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-danger-content-active);
  }
  &:focus-visible {
    @include focusTertiary();
  }
  &.cre8-c-danger-button--loading {
    cursor: not-allowed;
  }
  &:disabled {
    background-color: var(--cre8-color-button-tertiary-danger-bg-disabled);
    border-color: transparent;
    color: var(--cre8-color-button-tertiary-danger-content-disabled);
    --cre8-icon-fill: var(--cre8-color-button-tertiary-danger-content-disabled);
    outline: none;
    box-shadow: none;
    cursor: not-allowed;

    &:hover,
    &:focus {
      outline: none;
      box-shadow: none;
      background-color: var(--cre8-color-button-tertiary-danger-bg-disabled);
      color: var(--cre8-color-button-tertiary-danger-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-tertiary-danger-content-disabled);
    }
    &:active,
    &:focus-visible {
      outline: none;
      box-shadow: none;
      background-color: var(--cre8-color-button-tertiary-danger-bg-disabled);
      color: var(--cre8-color-button-tertiary-danger-content-disabled);
      --cre8-icon-fill: var(--cre8-color-button-tertiary-danger-content-disabled);
    }
  }

  &.cre8-c-danger-button--inverted {
    background-color: var(--cre8-color-button-tertiary-danger-inverse-bg);
    border-color: var(--cre8-color-button-tertiary-danger-inverse-border);
    color: var(--cre8-color-button-tertiary-danger-inverse-content);
  
    &:hover,
    &:focus {
     background-color: var(--cre8-color-button-tertiary-danger-inverse-bg-hover);
     border-color: var(--cre8-color-button-tertiary-danger-inverse-border-hover);
     color: var(--cre8-color-button-tertiary-danger-inverse-content-hover);
    }

    &:focus {
      outline-color: var(--cre8-color-button-tertiary-danger-inverse-outline);
    }

    &:active {
      background-color: var(--cre8-color-button-tertiary-danger-inverse-bg-active);
      border-color: var(--cre8-color-button-tertiary-danger-inverse-border-active);
      color: var(--cre8-color-button-tertiary-danger-inverse-content-active);
     
      &.cre8-c-danger-button--loading {
        --cre8-icon-fill: var(--cre8-color-button-tertiary-danger-content-active);
      }
    }

    &:disabled { 
      outline: none;
      cursor: not-allowed;
      background-color: var(--cre8-color-button-tertiary-danger-inverse-bg-disabled);
      border-color: var(--cre8-color-button-tertiary-danger-inverse-border-disabled);
      color: var(--cre8-color-button-tertiary-danger-inverse-content-disabled);
    }
  }
}

  &.cre8-c-danger-button.cre8-c-danger-button--secondary.cre8-c-danger-button--split-button-text {
    border-radius: var(--cre8-border-radius-button) var(--cre8-border-radius-none) var(--cre8-border-radius-none) var(--cre8-border-radius-button);
    border-color: var(--cre8-color-button-secondary-danger-border);
    border-width: var(--cre8-border-width-button-default);
    color: var(--cre8-color-button-secondary-danger-content);
    &:active,
    &:focus-visible {
      outline: none;
    }
    &.cre8-c-danger-button--lg {
      padding: var(--cre8-button-padding-vertical-large) var(--cre8-button-padding-horizontal-large);
    }
    &.cre8-c-danger-button--sm {
      padding: var(--cre8-button-padding-vertical-small) var(--cre8-button-padding-horizontal-small);
    }
  }

  &.cre8-c-danger-button.cre8-c-danger-button--icon-only.cre8-c-danger-button--split-button-caret {
    padding: var(--cre8-button-padding-vertical-medium);
    border-radius: var(--cre8-border-radius-none) var(--cre8-border-radius-button) var(--cre8-border-radius-button) var(--cre8-border-radius-none);
    height: 100%;
    border-left: none !important ;
    border-collapse: collapse;
    background: var(--cre8-color-button-secondary-danger-bg);
    border-color: var(--cre8-color-button-secondary-danger-border);
    border-width: var(--cre8-border-width-button-default);
    color: var(--cre8-color-button-secondary-danger-content);
    --cre8-icon-fill: var(--cre8-color-button-secondary-danger-content);

    &:hover,
    &:focus {
      background: var(--cre8-color-button-secondary-danger-bg-hover);
      border-color: var(--cre8-color-button-secondary-danger-border-hover);
      --cre8-icon-fill: var(--cre8-color-button-secondary-danger-content-hover);
      outline: none;
      border-left: none;
      border-collapse: collapse;
    }
    &:active,
    &:focus-visible {
      background: var(--cre8-color-button-secondary-danger-bg-active);
      border-color: var(--cre8-color-button-secondary-danger-border-active);
      --cre8-icon-fill: var(--cre8-color-button-secondary-danger-content-active);
      outline: none;
      border-left: none;
      border-collapse: collapse;
    }
  }
}
.cre8-c-danger-button--lg {
  padding: var(--cre8-button-padding-vertical-large);
}
.cre8-c-danger-button--sm {
  padding: var(--cre8-button-padding-vertical-small);
}

.cre8-c-danger-button--icon-only {
  padding: var(--cre8-button-padding-vertical-small);
  color: var(--cre8-icon-fill, currentColor);
}

/**
 * Full-width button
 */
.cre8-c-danger-button--full-width {
  width: 100%;
  display: flex;
}

/**
 * Small button
 */
.cre8-c-danger-button--sm {
  @include cre8-typography-label-small();
  padding-top: var(--cre8-button-padding-vertical-small);
  padding-right: var(--cre8-button-padding-horizontal-small);
  padding-bottom: var(--cre8-button-padding-vertical-small);
  padding-left: var(--cre8-button-padding-horizontal-small);
}

/**
 * Large button
 */
.cre8-c-danger-button--lg {
  @include cre8-typography-label-large();
  padding-top: var(--cre8-button-padding-vertical-large);
  padding-right: var(--cre8-button-padding-horizontal-large);
  padding-bottom: var(--cre8-button-padding-vertical-large);
  padding-left: var(--cre8-button-padding-horizontal-large);
}

/**
  * Icon within small button
  */
.cre8-c-danger-button--sm cre8-icon {
  --cre8-icon-height: var(--cre8-icon-size-small);
  --cre8-icon-width: var(--cre8-icon-size-small);

  /**
       * Button text directly after button icon within small button
       */
}

/**
  * Icon within large button
  */
.cre8-c-danger-button--lg cre8-icon {
  --cre8-icon-height: var(--cre8-icon-size-large);
  --cre8-icon-width: var(--cre8-icon-size-large);
}

::slotted(*) {
  margin-right: 0;
}
/**
 * Button icon directly before button text
 */

cre8-icon + .cre8-c-danger-button__text:not(.cre8-u-is-vishidden) {
  margin-left: calc(8px * 1);
  display: inline-flex;
}

/**
   * Button icon directly after button text
   */
.cre8-c-danger-button__text:not(.cre8-u-is-vishidden) + cre8-icon {
  margin-left: calc(8px * 1);
  display: inline-flex;
}
/**
   * Button icon only
   */
.cre8-c-danger-button:has(.cre8-c-danger-button__text.cre8-u-is-vishidden) + cre8-icon {
  border-radius: var(--cre8-border-radius-button);
}
.cre8-c-danger-button__text.cre8-u-is-vishidden + cre8-icon {
  margin-left: 0px;
  margin-right: 0px;
  display: flex;
}
.cre8-c-danger-button__text.cre8-u-is-vishidden {
  @include visuallyHidden();
}

.cre8-c-danger-button--primary.cre8-c-danger-button--loading {
  --cre8-icon-fill: var(--cre8-color-content-knockout);
}
.cre8-c-danger-button--secondary.cre8-c-danger-button--loading,
.cre8-c-danger-button--tertiary.cre8-c-danger-button--loading {
  --cre8-icon-fill: var(--cre8-color-button-secondary-danger-content-active);
}

/**
 * Aria live span
 */
.cre8-u-is-vishidden {
  --cre8-icon-height: 0px;
  --cre8-icon-width: 0px;
  max-width: fit-content;
  min-width: 0px;
  width: auto;
  height: auto;
  max-height: fit-content;
  min-width: 0px;

  @include visuallyHidden;
}

cre8-icon.cre8-u-is-vishidden {
  @include visuallyHidden;
}

cre8-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

span.cre8-c-danger-button__icon {
  margin-left: calc(8px * 1);
  max-width: fit-content;
  min-width: 0px;
  width: auto;
  height: auto;
  max-height: fit-content;
  min-width: 0px;
}
`;
var y4 = Object.defineProperty, ne = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && y4(e, t, i), i;
};
const ka = class ka extends le {
  constructor() {
    super(...arguments), this.text = "Button", this.variant = "primary", this.type = "button", this.iconRotateDegree = 0, this.iconPosition = void 0, this.ariaLive = "assertive";
  }
  formSubmit() {
    const e = this._internals.form;
    e && e.requestSubmit();
  }
  formReset() {
    const e = this._internals.form;
    e && e.reset();
  }
  renderDangerButtonLink(e) {
    return f`
          <a
              href="${$(this.href)}"
              class="${e}"
              rel="${$(this.rel)}"
              target="${$(this.target)}"
          >
            ${this.iconPosition === "before" ? f`<cre8-icon width="16" height="16" aria-hidden="true" svg="${$(this.svg)}">
        </cre8-icon>` : T}
      <span
          class="${this.hideText ? "cre8-u-is-vishidden cre8-c-danger-button__text" : "cre8-c-danger-button__text"}"
      >
          ${this.text}
      </span>
      ${this.iconPosition === "after" ? f`<cre8-icon width="16" height="16" aria-hidden="true" svg="${$(this.svg)}">
        </cre8-icon> ` : T}
      </a>
        `;
  }
  renderDangerButtonIconography() {
    return f`
        <cre8-icon width="16" height="16" aria-hidden="true" svg="${this.svg}"></cre8-icon>
      `;
  }
  renderDangerButtonLoading() {
    return f`
          <span class="cre8-c-danger-button__icon" aria-live="${this.ariaLive}" role="alert">
              <span class="cre8-u-is-vishidden">${this.loadingComplete ? "Loading Complete" : "Loading"}</span>
              ${this.loadingComplete ? T : f`
          <cre8-loading-spinner
              class="cre8-c-danger-button__loading-icon"
              inverted size="small"
              aria-hidden="true"
          ></cre8-loading-spinner>`}
              </span>`;
  }
  render() {
    const e = Wi("cre8-c-danger-button", {
      "cre8-c-danger-button--primary": this.variant === "primary",
      "cre8-c-danger-button--secondary": this.variant === "secondary",
      "cre8-c-danger-button--tertiary": this.variant === "tertiary",
      "cre8-c-danger-button--full-width": this.fullWidth === !0,
      "cre8-c-danger-button--sm": this.size === "sm",
      "cre8-c-danger-button--lg": this.size === "lg",
      "cre8-c-danger-button--icon-only": this.hideText,
      "cre8-c-danger-button--loading": this.loading,
      "cre8-c-danger-button--inverted": this.inverted
    });
    return this.hideText && (this.iconPosition = "after"), this.href ? f`${this.renderDangerButtonLink(e)}` : f`
          <button
            class="${e}"
            part="button"
            aria-disabled=${$(this.loading)}
            ?disabled=${this.disabled}
            @click="${this._buttonClick}"
            aria-expanded=${$(this.buttonAriaExpanded)}
            type=${this.type}
          >
            ${this.iconPosition === "before" && this.svg ? this.renderDangerButtonIconography() : T}
            <span
              class="${this.hideText ? "cre8-u-is-vishidden cre8-c-danger-button__text" : "cre8-c-danger-button__text"}"
            >
                ${this.text}
            </span>
            ${this.iconPosition === "after" && this.svg ? this.renderDangerButtonIconography() : T}
            ${this.loading || this.loadingComplete ? this.renderDangerButtonLoading() : T}
          </button>`;
  }
  _buttonClick(e) {
    if (this.loading)
      e.stopPropagation();
    else
      switch (this.type) {
        case "submit":
          this.formSubmit();
          break;
        case "reset":
          this.formReset();
          break;
      }
  }
};
ka.styles = [v4];
let X = ka;
ne([
  u()
], X.prototype, "text");
ne([
  u({ type: String })
], X.prototype, "variant");
ne([
  u({ type: Boolean, reflect: !0 })
], X.prototype, "disabled");
ne([
  u()
], X.prototype, "href");
ne([
  u()
], X.prototype, "target");
ne([
  u()
], X.prototype, "type");
ne([
  u()
], X.prototype, "rel");
ne([
  u()
], X.prototype, "svg");
ne([
  u({ type: Number })
], X.prototype, "iconRotateDegree");
ne([
  u()
], X.prototype, "iconFlipDirection");
ne([
  u()
], X.prototype, "iconPosition");
ne([
  u()
], X.prototype, "size");
ne([
  u({ type: Boolean, reflect: !0 })
], X.prototype, "hideText");
ne([
  u({ type: Boolean, reflect: !0 })
], X.prototype, "fullWidth");
ne([
  u({ type: Boolean, reflect: !0 })
], X.prototype, "loading");
ne([
  u({ type: Boolean, reflect: !0 })
], X.prototype, "loadingComplete");
ne([
  u({ type: Boolean })
], X.prototype, "inverted");
ne([
  u()
], X.prototype, "ariaLive");
ne([
  u({ type: Boolean, reflect: !0 })
], X.prototype, "buttonAriaExpanded");
ne([
  oe("button")
], X.prototype, "field");
customElements.get("cre8-danger-button") === void 0 && customElements.define("cre8-danger-button", X);
const C4 = k`@import '../../design-tokens/core/scss/theming/component';
@import '../../design-tokens/core/scss/theming/component';
@import "design-tokens/core/scss/utilities/visibility";

:host {
  display: block;
}

/** 
 * Date Field Label 
 */
.cre8-c-date-picker__label {
  @include label-styles;
}

/** 
 * Date Field Body
 * 1) The div that contains the input and icons 
 */
.cre8-c-date-picker__body {
  position: relative;
  display: flex;
  align-items: center;
}

/** 
 * Date Field Default Calendar Icon Button
 * 1) Removes default calendar button and default calendar in Chrome
 */
input::-webkit-calendar-picker-indicator {
  display: none;
}

input[type="date"]::-webkit-input-placeholder {
  visibility: hidden !important;
}

.cre8-c-date-picker__calendar-icon-button {
  position: absolute;
  right: calc(8px * 1);
  background: var(--cre8-color-bg-default);
  border: none;
  border-radius: 0;

  --cre8-icon-height: calc(8px * 3);
  --cre8-icon-width: calc(8px * 3); 

  .cre8-c-date-picker--disabled &, .cre8-c-date-picker--read-only & {
    background: var(--cre8-color-bg-disabled);
  }
}

/** 
 * Date Field Input 
 * 1) The html5 input element
 */
.cre8-c-date-picker__input {
  @include input-styles;

  /**
   * Readonly input styles
   */
  &:read-only {
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
    cursor: default;
  }
}
`, x4 = k`
:host {
  display: block;
}

/**
 * Field Label
 */
.cre8-c-field__label {
  font-family: var(--cre8-typography-label-small-font-family);
  font-size: var(--cre8-typography-label-small-font-size);
  font-weight: var(--cre8-typography-label-small-font-weight);
  line-height: var(--cre8-typography-label-small-line-height);
  text-decoration: var(--cre8-typography-label-small-text-decoration);
  text-transform: var(--cre8-typography-label-small-text-transform);
  display: block;
  margin-bottom: calc(8px * 1);
}

/**
 * Field Body
 * 1) The div that contains the input and icons
 */
.cre8-c-field__body {
  position: relative;
}

/**
 * Field Input
 * 1) The html5 input element
 */
.cre8-c-field__input {
  /* Typography */
  font-family: var(--cre8-typography-body-default-font-family);
  font-size: var(--cre8-typography-body-default-font-size);
  font-weight: var(--cre8-typography-body-default-font-weight);
  line-height: var(--cre8-typography-body-default-line-height);
  text-decoration: var(--cre8-typography-body-default-text-decoration);
  text-transform: var(--cre8-typography-body-default-text-transform);

  /* Focus transparent base */
  outline: var(--cre8-border-width-focus) solid transparent;
  outline-offset: calc(8px * 0.25);

  /* Input styles */
  -webkit-appearance: none;
  width: 100%;
  border-width: var(--cre8-border-width-default);
  border-style: solid;
  border-color: var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  padding: calc(8px * 1.5) calc(8px * 1);
  color: var(--cre8-color-content-default);
  background-color: var(--cre8-color-bg-default);
  transition: outline-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), border-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), background-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), color var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
}

/**
 * Hover, focus, active, and focus-visible styles for default input elements
 */
.cre8-c-field__input:hover:not(:disabled),
.cre8-c-field__input:focus:not(:disabled),
.cre8-c-field__input:active:not(:disabled),
.cre8-c-field__input:focus-visible {
  outline: var(--cre8-border-width-focus) solid var(--cre8-color-border-active-outline);
  outline-offset: calc(8px * 0.25);
}

/**
 * Error state focus
 */
.cre8-is-error .cre8-c-field__input:hover:not(:disabled),
.cre8-is-error .cre8-c-field__input:focus:not(:disabled),
.cre8-is-error .cre8-c-field__input:active:not(:disabled),
.cre8-is-error .cre8-c-field__input:focus-visible {
  outline-color: var(--cre8-color-border-error);
}

/**
 * Success state focus
 */
.cre8-is-success .cre8-c-field__input:hover:not(:disabled),
.cre8-is-success .cre8-c-field__input:focus:not(:disabled),
.cre8-is-success .cre8-c-field__input:active:not(:disabled),
.cre8-is-success .cre8-c-field__input:focus-visible {
  outline-color: var(--cre8-color-border-success);
}

/**
 * Disabled styles for default input elements
 */
.cre8-c-field__input:disabled {
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  color: var(--cre8-color-content-disabled);
  cursor: not-allowed;
}

/**
 * Disabled placeholder text colors
 */
.cre8-c-field__input:disabled::placeholder {
  color: var(--cre8-color-content-disabled);
}

/**
 * Placeholder styles for default input elements
 */
.cre8-c-field__input::placeholder {
  color: var(--cre8-color-content-subtle);
}

/**
 * Error state for default input elements
 */
.cre8-is-error .cre8-c-field__input {
  border-color: var(--cre8-color-border-error);
}

/**
 * Success state for default input elements
 */
.cre8-is-success .cre8-c-field__input {
  border-color: var(--cre8-color-border-success);
}

/**
 * Readonly input styles
 */
.cre8-c-field__input:read-only {
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  cursor: default;
}
`;
var _4 = Object.defineProperty, G = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && _4(e, t, i), i;
};
const $a = class $a extends le {
  constructor() {
    super(...arguments), this.type = "text", this.label = "Label", this.ariaLive = "polite", this.errorText = "Error", this.successText = "Success";
  }
  /**
   * First update lifecycle hook
   * 1) super.firstUpdated also uses the firstUpdated from the Cre8FormElement
   */
  firstUpdated() {
    return this.initializeAria(), super.firstUpdated();
  }
  /**
   * Initialize aria attributes
   */
  initializeAria() {
    this.fieldId = this.fieldId || ee(), (this.fieldNote || this.slotNotEmpty("fieldNote")) && (this.ariaDescribedBy = this.ariaDescribedBy || `Field_${ee()}`), (this.successNote || this.errorNote) && (this.validationAriaDescribedBy = this.validationAriaDescribedBy || `Field_validation_${ee()}`);
  }
  /**
   * Aria describedby string based on field notes and error/success notes
   * 1) If both validationAriaDescribedBy (error/success note) and field note exists,
   * render both in the input's `aria-describedby` attribute
   * 2) Otherwise, if only validationAriaDescribedBy exists, then render only that as
   * the `aria-describedby` attribute (input without field note initially, but then error/success is added).
   * 3) Otherwise, render only the `ariaDescribedBy` property (field note only)
   */
  fieldNoteAria() {
    return this.validationAriaDescribedBy && this.ariaDescribedBy ? `${this.ariaDescribedBy} ${this.validationAriaDescribedBy}` : this.validationAriaDescribedBy && !this.ariaDescribedBy ? this.validationAriaDescribedBy : this.ariaDescribedBy;
  }
  /**
   * Handle On Input
   * 1) Set the input's value equal to the event.target.value when the input is changed.
   * 2) Set the internal form value of the input to the updated value
   */
  _handleOnInput(e) {
    const t = e.target.value;
    this.value = t, this._internals.setFormValue(this.value);
  }
  /**
   * Render the success or error field notes
   * 1. If there is a successNote, then return the field note with the success message and state.
   * 2. If there is a errorNote, then return the field note with the error message and state.
   */
  renderSuccessErrorFieldNote() {
    return this.successNote ? f` <cre8-field-note
        ?isSuccess=${this.isSuccess}
        class="cre8-c-field__field-note-success"
        id=${this.validationAriaDescribedBy}
        iconName="success"
      >
        ${this.successNote}
      </cre8-field-note>` : this.errorNote ? f` <cre8-field-note
        ?isError=${this.isError}
        class="cre8-c-field__field-note-error"
        id=${this.validationAriaDescribedBy}
        iconName="error-alt"
      >
        ${this.errorNote}
      </cre8-field-note>` : null;
  }
  render() {
    const e = this.componentClassNames("cre8-c-field", {
      "cre8-is-error": this.isError,
      "cre8-is-success": this.isSuccess
    });
    return f`
      <div class="${e}">
        <label class="cre8-c-field__label" for="${this.fieldId}">${this.label}</label>
        <div class="cre8-c-field__body">
          <input
            class="cre8-c-field__input"
            autocomplete=${$(this.autocomplete)}
            type="${this.type}"
            id="${this.fieldId}"
            max=${this.type === "date" && $(this.max).toString()}
            min=${this.type === "date" && $(this.max).toString()}
            maxlength=${$(this.maxlength)}
            ?readonly=${this.readonly}
            ?required=${this.required}
            aria-invalid=${this.isError ? "true" : "false"}
            ?disabled="${this.disabled}"
            pattern=${$(this.pattern)}
            aria-describedby="${$(this.fieldNoteAria())}"
            placeholder="${$(this.placeholder)}"
            .value="${this.value}"
            @input=${this._handleOnInput}
          />
        </div>
        ${this.fieldNote || this.slotNotEmpty("fieldNote") ? f`<cre8-field-note id=${this.ariaDescribedBy} class="cre8-c-field__field-note"
              ><slot name="fieldNote">${this.fieldNote}</slot></cre8-field-note
            >` : T}
        ${this.renderSuccessErrorFieldNote()}
      </div>
    `;
  }
};
$a.styles = [x4];
let Z = $a;
G([
  u()
], Z.prototype, "autocomplete");
G([
  u()
], Z.prototype, "pattern");
G([
  u()
], Z.prototype, "type");
G([
  u()
], Z.prototype, "placeholder");
G([
  u()
], Z.prototype, "label");
G([
  u()
], Z.prototype, "fieldId");
G([
  u()
], Z.prototype, "fieldNote");
G([
  u()
], Z.prototype, "ariaLive");
G([
  u()
], Z.prototype, "ariaDescribedBy");
G([
  u({ type: Boolean, reflect: !0 })
], Z.prototype, "required");
G([
  u({ type: Boolean, reflect: !0 })
], Z.prototype, "disabled");
G([
  u({ type: Boolean, reflect: !0 })
], Z.prototype, "isError");
G([
  u()
], Z.prototype, "errorText");
G([
  u()
], Z.prototype, "errorNote");
G([
  u()
], Z.prototype, "max");
G([
  u()
], Z.prototype, "min");
G([
  u({ type: Number })
], Z.prototype, "maxlength");
G([
  u()
], Z.prototype, "validationAriaDescribedBy");
G([
  u({ type: Boolean, reflect: !0 })
], Z.prototype, "isSuccess");
G([
  u()
], Z.prototype, "successText");
G([
  u({ type: Boolean, reflect: !0 })
], Z.prototype, "readonly");
G([
  u()
], Z.prototype, "successNote");
G([
  oe("input")
], Z.prototype, "field");
customElements.get("cre8-field") === void 0 && customElements.define("cre8-field", Z);
const w4 = k`@import '../../design-tokens/core/scss/theming/component';

.cre8-c-calendar {
  min-width: 340px; // this is the width of a calendar with the longest character month (September)
  border: var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  margin-top: calc(8px * 0.5);
  background-color: var(--cre8-color-bg-default);
  position: absolute;
}

/* shortcuts */
.cre8-c-calendar__header-shortcuts {
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding-top: calc(8px * 2);
  padding-bottom: calc(8px * 1);

  cre8-button + cre8-button {
    padding-left: calc(8px * 1);
  }

  cre8-button {
    max-height: 32px;
  }
}

table {
  width: 100%;
}

/* table row */
tr {
  @include cre8-typography-body-default();
  display: grid;
  grid-row-gap: 0.33em;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  margin: unset;
  padding: unset;
  position: relative;
}

/* day wrappers */
td {
  align-items: center;
  display: flex;
  height: 48px;
  justify-content: center;
  width: 48px;
}

/* days */
.cre8-c-calendar :is(thead, tbody) :is(span, button) {
  @include cre8-typography-body-default();
  align-items: center;
  block-size: 2em;
  border-radius: var(--cre8-border-radius-brand);
  display: flex;
  inline-size: 2em;
  justify-content: center;
  margin-block: var(0, 0 0.33em);
  user-select: none;
}

/* day buttons */
.cre8-c-calendar__day-button {
  border: none;
  background: none;
  margin: 0;
  padding: 0;

  &:hover,
  &:focus {
    background: var(--cre8-color-bg-default-hover);
  }

  &.cre8-c-calendar__different-month {
    color: var(--cre8-color-content-subtle);

    &:hover,
    &:focus {
      background: var(--cre8-color-bg-subtle);
    }
  }

  &[data-today] {
    color: var(--cre8-color-content-brand);
    border-color: var(--cre8-color-border-brand);
    border-width: var(--cre8-border-width-default);
    border-style: var(--cre8-border-style-default);
  }
  
  &[data-selected] {
    background: var(--cre8-color-bg-brand-strong);
    color: var(--cre8-color-content-knockout);
  
    &:hover,
    &:focus {
      background: var(--cre8-color-bg-brand-strong-hover);
    }
  }
}

`, k4 = k`@import '../../design-tokens/core/scss/theming/component';

.cre8-c-calendar-month-modal {
  padding: calc(8px * 1);
}

/* grid */
ol {
  @include cre8-typography-body-default();
  display: grid;
  grid-row-gap: 0.33em;
  grid-template-columns: repeat(3, 1fr);
  list-style: none;
  margin: unset;
  padding: unset;
}

li {
  display: inline-flex;
  justify-content: center;
}
`;
var $4 = Object.defineProperty, Vd = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && $4(e, t, i), i;
};
const Ma = class Ma extends M {
  constructor() {
    super(), this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  }
  firstUpdated() {
    this.focusOnCurrentMonth();
  }
  async focusOnCurrentMonth() {
    await this.updateComplete, (this.shadowRoot?.querySelector(
      "li[data-current-month]"
    ).children[0].shadowRoot?.querySelector("button")).focus();
  }
  emitMonth(e) {
    const t = new CustomEvent("changeMonth", {
      detail: {
        month: e
      }
    });
    this.dispatchEvent(t);
  }
  getMonthListItems() {
    return this.monthNames.map(
      (e, t) => f` <li ?data-current-month="${t === this.currentMonth}" >
          <cre8-button text="${e}" variant="tertiary" size="sm"
          @click="${() => this.emitMonth(t)}"></cre8-button>
        </li>`
    );
  }
  render() {
    const e = this.componentClassNames("cre8-c-calendar-month-modal", {});
    return f` <div class="${e}">
      <ol aria-label="choose a month">
        ${this.getMonthListItems()}
      </ol>
    </div> `;
  }
};
Ma.styles = [k4];
let Oi = Ma;
Vd([
  R()
], Oi.prototype, "monthNames");
Vd([
  u({ reflect: !0, type: Number })
], Oi.prototype, "currentMonth");
customElements.get("cre8-calendar-month-modal") === void 0 && customElements.define("cre8-calendar-month-modal", Oi);
const M4 = k`@import '../../design-tokens/core/scss/theming/component';

.cre8-c-calendar-year-modal {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: calc(8px * 1);
}

/* grid */
ol {
  @include cre8-typography-body-default();
  display: grid;
  grid-row-gap: 0.33em;
  grid-template-columns: repeat(3, 1fr);
  list-style: none;
  margin: unset;
  padding: unset;
}

li {
  display: inline-flex;
  justify-content: center;
}

cre8-button {
  height: fit-content;
}
`;
var L4 = Object.defineProperty, S4 = Object.getOwnPropertyDescriptor, gn = (r, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? S4(e, t) : e, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = (o ? s(e, t, i) : s(i)) || i);
  return o && i && L4(e, t, i), i;
};
const La = class La extends M {
  get currentYear() {
    return this._currentYear;
  }
  set currentYear(e) {
    const t = this._currentYear;
    this._currentYear = e, this.modalAnchorYear = e, this.requestUpdate("currentDate", t), this.createYearArray(this.currentYear);
  }
  constructor() {
    super(), this.yearNumbers = [];
  }
  emitYear(e) {
    const t = new CustomEvent("changeYear", {
      detail: {
        year: e
      }
    });
    this.dispatchEvent(t);
  }
  createYearArray(e) {
    const t = Array.from(Array(12).keys());
    this.yearNumbers = t.map((o) => o + (e - 7));
  }
  getYearListItems() {
    return this.yearNumbers.map(
      ((e) => f` <li
        ?data-current-year="${e === this.currentYear}"
      >
        <cre8-button
          text="${e}"
          variant="tertiary"
          size="sm"
          @click="${() => this.emitYear(e)}"
        ></cre8-button>
      </li>`)
    );
  }
  firstUpdated() {
    this.focusOnCurrentYear();
  }
  async focusOnCurrentYear() {
    await this.updateComplete, (this.shadowRoot?.querySelector(
      "li[data-current-year]"
    ).children[0].shadowRoot?.querySelector("button")).focus();
  }
  previousYearArray() {
    this.modalAnchorYear -= 12, this.createYearArray(this.modalAnchorYear);
  }
  nextYearArray() {
    this.modalAnchorYear += 12, this.createYearArray(this.modalAnchorYear);
  }
  render() {
    const e = this.componentClassNames(
      "cre8-c-calendar-year-modal",
      {}
    );
    return f`
      <div class="${e}">
        <cre8-button
          class="cre8-c-calendar-year-modal__nav-button"
          @click="${this.previousYearArray}"
          variant="tertiary"
          text="Previous 12 years"
          ?hideText=${!0}
          iconName="keyboard-arrow-left"
        ></cre8-button>
        <ol aria-label="choose a year">
          ${this.getYearListItems()}
        </ol>
        <cre8-button
          class="cre8-c-calendar-year-modal__nav-button"
          @click="${this.nextYearArray}"
          variant="tertiary"
          text="Next 12 years"
          ?hideText=${!0}
          iconName="keyboard-arrow-right"
        ></cre8-button>
      </div>
    `;
  }
};
La.styles = [M4];
let ir = La;
gn([
  R()
], ir.prototype, "yearNumbers", 2);
gn([
  R()
], ir.prototype, "_currentYear", 2);
gn([
  R()
], ir.prototype, "modalAnchorYear", 2);
gn([
  u({ reflect: !0, type: Number })
], ir.prototype, "currentYear", 1);
customElements.get("cre8-calendar-year-modal") === void 0 && customElements.define("cre8-calendar-year-modal", ir);
const A4 = k`@import '../../design-tokens/core/scss/theming/component';

.cre8-c-calendar-navigation {
    align-items: center;
    display: flex;
    height: 60px;
    justify-content: center;
  }

.cre8-c-calendar-navigation__inner-buttons {
  display: flex;
  min-width: 188px;
  justify-content: space-around;
}`;
var T4 = Object.defineProperty, Nd = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && T4(e, t, i), i;
};
const Sa = class Sa extends M {
  activateModal(e) {
    const t = new CustomEvent("activateModal", {
      detail: {
        modal: e
      }
    });
    this.dispatchEvent(t);
  }
  changeMonth(e) {
    const t = new CustomEvent("changeMonth", {
      detail: {
        addend: e
      }
    });
    this.dispatchEvent(t);
  }
  changeYear(e) {
    const t = new CustomEvent("changeYear", {
      detail: {
        addend: e
      }
    });
    this.dispatchEvent(t);
  }
  render() {
    const e = this.componentClassNames(
      "cre8-c-calendar-navigation",
      {}
    );
    return f`
      <div class="${e}">
        <cre8-button
          variant="tertiary"
          text="Previous year"
          ?hideText=${!0}
          iconName="caret-double-left"
          @click="${() => this.changeYear(-1)}"
        ></cre8-button>

        <cre8-button
          variant="tertiary"
          text="Previous month"
          ?hideText=${!0}
          iconName="keyboard-arrow-left"
          @click="${() => this.changeMonth(-1)}"
        ></cre8-button>

        <div class="cre8-c-calendar-navigation__inner-buttons">
          <cre8-button
            class="cre8-c-calendar-navigation__month-modal-button"
            variant="tertiary"
            text="${this.monthName}"
            aria-label="${this.monthName}, month picker modal"
            size="sm"
            @click="${() => this.activateModal("month")}"
          ></cre8-button>

          <cre8-button
            class="cre8-c-calendar-navigation__year-modal-button"
            variant="tertiary"
            text="${this.year}"
            aria-label="${this.year}, year picker modal"
            size="sm"
            @click="${() => this.activateModal("year")}"
          ></cre8-button>
        </div>

        <cre8-button
          variant="tertiary"
          text="Next month"
          ?hideText=${!0}
          iconName="keyboard-arrow-right"
          @click="${() => this.changeMonth(1)}"
        ></cre8-button>

        <cre8-button
          variant="tertiary"
          text="Next year"
          ?hideText=${!0}
          iconName="caret-double-right"
          @click="${() => this.changeYear(1)}"
        ></cre8-button>
      </div>
    `;
  }
};
Sa.styles = [A4];
let Hi = Sa;
Nd([
  u({ type: String, reflect: !0 })
], Hi.prototype, "monthName");
Nd([
  u({ type: String, reflect: !0 })
], Hi.prototype, "year");
customElements.get("cre8-calendar-navigation") === void 0 && customElements.define("cre8-calendar-navigation", Hi);
var P4 = Object.defineProperty, E4 = Object.getOwnPropertyDescriptor, Re = (r, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? E4(e, t) : e, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = (o ? s(e, t, i) : s(i)) || i);
  return o && i && P4(e, t, i), i;
}, J;
const He = (J = class extends M {
  constructor() {
    super(), this._activeModal = "none", this._handleOnClickOutside = this._handleOnClickOutside.bind(this), this.currentDate = (this.fieldDate && /* @__PURE__ */ new Date(`${this.fieldDate}T00:00`)) ?? /* @__PURE__ */ new Date(), this.locale = document.documentElement.getAttribute("lang") || "en-US", this.dateConfig = {
      locale: this.locale,
      today: /* @__PURE__ */ new Date(),
      weekInfo: {
        firstDay: 7,
        weekend: [6, 7]
      }
    }, this.weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ], this.dateFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
  }
  get activeModal() {
    return this._activeModal;
  }
  set activeModal(e) {
    this._activeModal = e;
  }
  get fieldDate() {
    return this._fieldDate;
  }
  set fieldDate(e) {
    const t = this._fieldDate;
    this.requestUpdate("fieldDate", t);
    const o = !!(e && (/* @__PURE__ */ new Date(`${e}T00:00`)).getTime());
    this.currentDate = o ? /* @__PURE__ */ new Date(`${e}T00:00`) : /* @__PURE__ */ new Date(), this._fieldDate = o ? e : "";
  }
  get currentDate() {
    return this._currentDate;
  }
  set currentDate(e) {
    const t = this._currentDate;
    this._currentDate = e, this.requestUpdate("currentDate", t);
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("click", this._handleOnClickOutside, !1);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("click", this._handleOnClickOutside, !1);
  }
  /* Click Event Functions */
  _handleOnClickOutside(e) {
    if (!this.shadowRoot?.host)
      throw Error(
        "Could not determine navigation context during click handler"
      );
    if (!e.composedPath().includes(this.shadowRoot.host)) {
      const o = new CustomEvent("outsideClick", {
        detail: {
          composedPath: e.composedPath()
        }
      });
      this.dispatchEvent(o);
    }
  }
  emitSelectedDate(e) {
    const t = new CustomEvent("dateSelect", {
      detail: {
        date: e
      }
    });
    this.currentDate = /* @__PURE__ */ new Date(`${e}T00:00`), this.dispatchEvent(t);
  }
  changeYear(e) {
    const t = this.currentDate, o = new Date(t.setFullYear(e));
    this.currentDate = o, this.activeModal = "none";
  }
  changeMonth(e) {
    const t = this.currentDate, o = new Date(t.setMonth(e));
    this.currentDate = o, this.activeModal = "none";
  }
  activateModal(e) {
    this.activeModal = e;
  }
  /* Helper/Get Functions */
  static formatMonthOrDayIndex(e) {
    return (e + 1).toString().padStart(2, "0");
  }
  static formatDate(e) {
    return e.toString().padStart(2, "0");
  }
  numberOfDaysinMonth() {
    return new Date(this.getYear(), this.getMonth() + 1, 0).getDate();
  }
  getMonth() {
    return this.currentDate.getMonth();
  }
  getMonthName() {
    return new Intl.DateTimeFormat(this.locale, {
      month: "long"
    }).format(this.currentDate);
  }
  getYear() {
    return this.currentDate.getFullYear();
  }
  static dateToString(e) {
    return `${e.getFullYear()}-${J.formatMonthOrDayIndex(
      e.getMonth()
    )}-${J.formatDate(e.getDate())}`;
  }
  async updateFocusForKeydown(e) {
    this.currentDate = e, await this.updateComplete;
    const t = this.shadowRoot?.querySelector(
      `button[datetime="${J.dateToString(e)}"]`
    );
    t.setAttribute("tabindex", "0"), t.focus();
  }
  _handleCalendarKeyDown(e) {
    const t = this.shadowRoot?.querySelector(
      `button[datetime="${J.dateToString(this.currentDate)}"]`
    );
    if (e.key === "ArrowUp") {
      const o = new Date(
        this.getYear(),
        this.getMonth(),
        this.currentDate.getDate() - 7
      );
      this.updateFocusForKeydown(o), t.setAttribute("tabindex", "-1");
    }
    if (e.key === "ArrowDown") {
      const o = new Date(
        this.getYear(),
        this.getMonth(),
        this.currentDate.getDate() + 7
      );
      this.updateFocusForKeydown(o), t.setAttribute("tabindex", "-1");
    }
    if (e.key === "ArrowLeft") {
      const o = new Date(
        this.getYear(),
        this.getMonth(),
        this.currentDate.getDate() - 1
      );
      this.updateFocusForKeydown(o), t.setAttribute("tabindex", "-1");
    }
    if (e.key === "ArrowRight") {
      const o = new Date(
        this.getYear(),
        this.getMonth(),
        this.currentDate.getDate() + 1
      );
      this.updateFocusForKeydown(o), t.setAttribute("tabindex", "-1");
    }
    if (e.key === "Tab" && !e.shiftKey) {
      const o = new CustomEvent("outsideClick", {
        detail: {
          composedPath: []
        }
      });
      setTimeout(() => {
        this.dispatchEvent(o);
      }, 20);
    }
  }
  async changeMonthFromNav(e) {
    this.changeMonth(e), await this.updateComplete;
    const o = (this.shadowRoot?.querySelector(
      "cre8-calendar-navigation"
    )).shadowRoot?.querySelector(
      ".cre8-c-calendar-navigation__month-modal-button"
    );
    await this.updateComplete, o.shadowRoot.querySelector("button").focus();
  }
  async changeYearFromNav(e) {
    this.changeYear(e), await this.updateComplete;
    const o = (this.shadowRoot?.querySelector(
      "cre8-calendar-navigation"
    )).shadowRoot?.querySelector(
      ".cre8-c-calendar-navigation__year-modal-button"
    );
    await this.updateComplete, o.shadowRoot.querySelector("button").focus();
  }
  /* Template Map Functions */
  getDaysOfWeekAbbreviations() {
    return this.weekDays.map(
      (e) => f` <td>
        <span aria-label="${e}">${e[0]}</span>
      </td>`
    );
  }
  /**
   * Create array of Day Buttons to fill in excess calendar space at the beginning of the month.
   *
   * 1. Map from empty array of length equal to the amount of access calendar "slots" in the beginning of the month.
   * (i.e. if the month starts on Wednesday (getDay = 3), there are 3 days prior that week from last month.)
   *
   * 2. Based on the indice of array, get the given day button's date, where the date is
   * the last day of last month minus the max of the array plus the indice plus one -> x = lastday - (max - (i + 1))
   * (Note: (max - (i + 1) equals the keys of the array in reverse order:
   * [max - i + 1] -> [3-1, 3-2, 3-3] -> [2,1,0] for an array of [3])
   * (i.e. if the calendar is starting on Wednesday June 1st, the access days on the calendar will be
   * Sunday May 29th (31 - (2)), Monday May 30th (31 - (1)), Tuesday May 31st (31 - (0)))
   *
   * 3. Build out day button with necessary props
   * */
  getPreviousMonthDayButtons() {
    return [
      ...Array(new Date(this.getYear(), this.getMonth(), 1).getDay()).keys()
    ].map((e) => {
      const t = new Date(
        this.getYear(),
        this.getMonth(),
        1
      ).getDay(), o = new Date(this.getYear(), this.getMonth(), 0), i = o.getDate(), n = new Date(
        o.getFullYear(),
        o.getMonth(),
        i - t + (e + 1)
      ), s = this.dateConfig.today.getDate() === n.getDate() && this.dateConfig.today.getMonth() === n.getMonth() && this.dateConfig.today.getFullYear() === n.getFullYear(), a = (/* @__PURE__ */ new Date(`${this.fieldDate}T00:00`)).getTime() === n.getTime();
      return f` <td>
        <button
          class="cre8-c-calendar__day-button cre8-c-calendar__different-month"
          datetime="${J.dateToString(n)}"
          ?data-today="${s}"
          ?data-selected="${a}"
          tabindex="-1"
          aria-label="${new Intl.DateTimeFormat(this.locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(
        /* @__PURE__ */ new Date(`${J.dateToString(n)}T00:00`)
      )}"
          @click="${() => this.emitSelectedDate(J.dateToString(n))}"
        >
          ${new Intl.NumberFormat(this.locale).format(n.getDate())}
        </button>
      </td>`;
    });
  }
  /**
   * Create array of Day Buttons to fill out current month
   *
   * 1. Map from empty array of length equal to the amount days in this month
   *
   * 2. Get the date of the current month based on indice of array (i.e. 0 -> 1st, 1 -> 2nd ...)
   *
   * 3. Build out day button with necessary props
   * */
  getCurrentMonthDayButtons() {
    return [...Array(this.numberOfDaysinMonth()).keys()].map((e) => {
      const t = e + 1, o = new Date(this.getYear(), this.getMonth(), t), i = this.dateConfig.today.getDate() === t && this.dateConfig.today.getMonth() === this.getMonth() && this.dateConfig.today.getFullYear() === this.getYear(), n = (/* @__PURE__ */ new Date(`${this.fieldDate}T00:00`)).getTime() === o.getTime();
      return f` <td>
        <button
          class="cre8-c-calendar__day-button"
          datetime="${J.dateToString(o)}"
          ?data-today="${i}"
          ?data-selected="${n}"
          tabindex="${t === this.currentDate.getDate() ? "0" : "-1"}"
          aria-label="${new Intl.DateTimeFormat(this.locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(/* @__PURE__ */ new Date(`${J.dateToString(o)}T00:00`))}"
          @click="${() => this.emitSelectedDate(J.dateToString(o))}"
        >
          ${new Intl.NumberFormat(this.locale).format(e + 1)}
        </button>
      </td>`;
    });
  }
  /**
   * Create array of Day Buttons to fill in excess calendar space at the end of the month.
   *
   * 1. Map from empty array of length equal to the amount of access calendar "slots" at the end of the month.
   * The array have an amount of slots equal to the number of days in a week minus how many days have already past
   * and since getDay returns the index of the day of the week (Sunday = 0, Monday = 1 ...) our equations is
   * x = 7 - (getDay() + 1)
   * Note: (we need to add 1 because indexing starts at 0)
   * so if the month ends on Monday (getDay() = 1), 5 = 7 - (1 + 1), there are 5 days that week from the new month
   *
   * 2. Get the date from the next month based on indice of array (i.e. 0 -> 1st, 1 -> 2nd ...)
   *
   * 3. Build out day button with necessary props
   * */
  getNextMonthDayButtons() {
    return [
      ...Array(
        6 - new Date(
          this.getYear(),
          this.getMonth(),
          this.numberOfDaysinMonth()
        ).getDay()
      ).keys()
    ].map((e) => {
      const t = new Date(
        this.getYear(),
        this.getMonth(),
        this.numberOfDaysinMonth()
      ), o = new Date(
        t.setDate(t.getDate() + 1)
      ), i = new Date(
        o.getFullYear(),
        o.getMonth(),
        e + 1
      ), n = this.dateConfig.today.getDate() === i.getDate() && this.dateConfig.today.getMonth() === i.getMonth() && this.dateConfig.today.getFullYear() === i.getFullYear(), s = (/* @__PURE__ */ new Date(`${this.fieldDate}T00:00`)).getTime() === i.getTime();
      return f` <td>
        <button
          class="cre8-c-calendar__day-button cre8-c-calendar__different-month"
          datetime="${J.dateToString(i)}"
          ?data-today="${n}"
          ?data-selected="${s}"
          tabindex="-1"
          aria-label="${new Intl.DateTimeFormat(this.locale, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      }).format(
        /* @__PURE__ */ new Date(`${J.dateToString(i)}T00:00`)
      )}"
          @click="${() => this.emitSelectedDate(J.dateToString(i))}"
        >
          ${new Intl.NumberFormat(this.locale).format(i.getDate())}
        </button>
      </td>`;
    });
  }
  render() {
    const e = this.componentClassNames("cre8-c-calendar", {});
    return f` <div class="${e}">
      ${this._activeModal === "month" ? f`<cre8-calendar-month-modal
            currentMonth="${this.getMonth()}"
            @changeMonth="${(t) => this.changeMonthFromNav(t.detail.month)}"
          ></cre8-calendar-month-modal>` : T}
      ${this._activeModal === "year" ? f`<cre8-calendar-year-modal
            currentYear="${this.getYear()}"
            @changeYear="${(t) => this.changeYearFromNav(t.detail.year)}"
          ></cre8-calendar-year-modal>` : T}
      ${this._activeModal === "none" ? f` ${this.hasShortcuts ? f`<div class="cre8-c-calendar__header-shortcuts">
                    <cre8-button
                      text="Today"
                      variant="secondary"
                      size="sm"
                      @click="${() => this.emitSelectedDate(
      J.dateToString(this.dateConfig.today)
    )}"
                    ></cre8-button>
                    <cre8-button
                      text="Tomorrow"
                      variant="secondary"
                      size="sm"
                      @click="${() => this.emitSelectedDate(
      J.dateToString(
        new Date(
          this.dateConfig.today.setDate(
            this.dateConfig.today.getDate() + 1
          )
        )
      )
    )}"
                    ></cre8-button>
                    <cre8-button
                      text="In 2 days"
                      variant="secondary"
                      size="sm"
                      @click="${() => this.emitSelectedDate(
      J.dateToString(
        new Date(
          this.dateConfig.today.setDate(
            this.dateConfig.today.getDate() + 2
          )
        )
      )
    )}"
                    ></cre8-button>
                </div>` : T}
            <cre8-calendar-navigation
              monthName="${this.getMonthName()}"
              year="${this.getYear()}"
              @activateModal="${(t) => this.activateModal(t.detail.modal)}"
              @changeMonth="${(t) => this.changeMonth(this.getMonth() + t.detail.addend)}"
              @changeYear="${(t) => this.changeYear(this.getYear() + t.detail.addend)}"
            >
            </cre8-calendar-navigation>
            <table>
              <thead>
                <tr>
                  ${this.getDaysOfWeekAbbreviations()}
                </tr>
              </thead>
              <tbody>
                <tr @keydown=${this._handleCalendarKeyDown}>
                  ${this.getPreviousMonthDayButtons()}
                  ${this.getCurrentMonthDayButtons()}
                  ${this.getNextMonthDayButtons()}
                </tr>
              </tbody>
            </table>` : T}
    </div>`;
  }
}, J.styles = [w4], J);
Re([
  oe(".cre8-c-calendar__navigation-wrapper")
], He.prototype, "_navWrapper", 2);
Re([
  u({ type: Boolean, reflect: !0 })
], He.prototype, "hasShortcuts", 2);
Re([
  R()
], He.prototype, "_activeModal", 2);
Re([
  u({ reflect: !0, type: String })
], He.prototype, "activeModal", 1);
Re([
  R()
], He.prototype, "_fieldDate", 2);
Re([
  u({ reflect: !0, type: Date })
], He.prototype, "fieldDate", 1);
Re([
  R()
], He.prototype, "_currentDate", 2);
Re([
  u({ reflect: !0, type: Date })
], He.prototype, "currentDate", 1);
Re([
  R()
], He.prototype, "locale", 2);
Re([
  R()
], He.prototype, "weekDays", 2);
Re([
  R()
], He.prototype, "dateConfig", 2);
Re([
  R()
], He.prototype, "dateFormatOptions", 2);
let D4 = He;
customElements.get("cre8-calendar") === void 0 && customElements.define("cre8-calendar", D4);
var O4 = Object.defineProperty, Us = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && O4(e, t, i), i;
};
const Aa = class Aa extends Z {
  constructor() {
    super(...arguments), this.type = "date", this.showCalendar = !1;
  }
  /**
   * Handle Date On Input
   * 1) Set the input's value equal to the event.target.value when the input is changed.
   * 2) Set the internal form value of the input to the updated value
   */
  handleDateOnInput(e) {
    this.value = e.target.value, this._internals.setFormValue(this.value);
  }
  handleCalendarSelect(e) {
    this.value = e.detail.date, this._internals.setFormValue(this.value), this.showCalendar = !1;
  }
  handleOutsideClick(e) {
    const t = this.renderRoot.querySelector(".cre8-c-date-picker");
    this.showCalendar && !e.detail.composedPath.includes(t) && (this.showCalendar = !1);
  }
  toggleCalendar() {
    !this.disabled && !this.readonly && (this.showCalendar = !this.showCalendar);
  }
  render() {
    const e = this.componentClassNames("cre8-c-date-picker", {
      "cre8-is-error": this.isError,
      "cre8-is-success": this.isSuccess,
      "cre8-c-date-picker--disabled": this.disabled,
      "cre8-c-date-picker--read-only": this.readonly
    });
    return this.type = "date", f`
      <div class="${e}">
        <label class="cre8-c-date-picker__label" for="${this.fieldId}"
          >${this.label}</label
        >
        <div class="cre8-c-date-picker__body">
          <input
            class="cre8-c-date-picker__input"
            autocomplete=${$(this.autocomplete)}
            type="${this.type}"
            id="${this.fieldId}"
            name="${$(this.name)}"
            max=${$(this.max)}
            min=${$(this.min)}
            value="${$(this.value)}"
            ?readonly=${this.readonly}
            ?required=${this.required}
            ?disabled="${this.disabled}"
            aria-describedby="${$(this.fieldNoteAria())}"
            placeholder="${$(this.placeholder)}"
            @input=${this.handleDateOnInput}
            @click=${this.toggleCalendar}
          />
          <cre8-button
            class="cre8-c-date-picker__calendar-icon-button"
            aria-expanded="${this.showCalendar}"
            aria-label="Show Calendar"
            ?disabled="${this.disabled || this.readonly}"
            ?hideText=${!0}
            iconName="calendar-datepicker"
            variant="tertiary"
            @click="${this.toggleCalendar}"
          ></cre8-button>
        </div>
        ${this.showCalendar ? f`<cre8-calendar
              fieldDate="${$(this.value)}"
              ?hasShortcuts=${this.hasShortcuts}
              @dateSelect="${this.handleCalendarSelect}"
              @outsideClick="${this.handleOutsideClick}"
            ></cre8-calendar>` : T}
        ${this.fieldNote || this.slotNotEmpty("fieldNote") ? f`<cre8-field-note
              id=${this.ariaDescribedBy}
              class="cre8-c-date-picker__field-note"
              ><slot name="fieldNote">${this.fieldNote}</slot></cre8-field-note
            >` : T}
        ${this.renderSuccessErrorFieldNote()}
      </div>
    `;
  }
};
Aa.styles = [C4];
let Dr = Aa;
Us([
  oe('input[type="date"]')
], Dr.prototype, "field");
Us([
  R()
], Dr.prototype, "showCalendar");
Us([
  u({ type: Boolean, reflect: !0 })
], Dr.prototype, "hasShortcuts");
customElements.get("cre8-date-picker") === void 0 && customElements.define("cre8-date-picker", Dr);
const H4 = k`@import '../../design-tokens/core/scss/theming/component';

// #DIVIDER

:host {
  display: flex;
}

/**
 * Divider Element
 */
.cre8-c-divider {
  background-color: var(--cre8-color-border-default);
  margin-top: calc(8px * 1);
  margin-bottom: calc(8px * 1);
}

.cre8-c-divider--horizontal {
  width: 100%;
  height: var(--cre8-border-width-default);
}

.cre8-c-divider--vertical {
  width: var(--cre8-border-width-default);
  height: 100%;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: calc(8px * 1);
  margin-right: calc(8px * 1);
}

/**
* Divider colors
*/
.cre8-c-divider--brand {
  background-color: var(--cre8-color-border-brand);
}

.cre8-c-divider--knockout {
  background-color: var(--cre8-color-border-knockout);
}
`;
var I4 = Object.defineProperty, Rd = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && I4(e, t, i), i;
};
const Ta = class Ta extends M {
  constructor() {
    super(...arguments), this.variant = "horizontal";
  }
  render() {
    const e = this.componentClassNames("cre8-c-divider", {
      "cre8-c-divider--horizontal": this.variant === "horizontal",
      "cre8-c-divider--vertical": this.variant === "vertical",
      "cre8-c-divider--brand": this.status === "brand",
      "cre8-c-divider--knockout": this.status === "knockout"
    });
    return f` <div class="${e}"><wbr></div> `;
  }
};
Ta.styles = [H4];
let Ii = Ta;
Rd([
  u()
], Ii.prototype, "variant");
Rd([
  u()
], Ii.prototype, "status");
customElements.get("cre8-divider") === void 0 && customElements.define("cre8-divider", Ii);
const B4 = k`@import '../../design-tokens/core/scss/theming/component';

// #DROPDOWN

/**
 * 1) Dropdown
 */

.cre8-c-dropdown-container {
  display: inline-flex;
  position: relative;
}
.cre8-c-dropdown {
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  box-shadow: var(--cre8-shadow-default);
  border-radius: var(--cre8-border-radius-default);
  display: none;
  flex-direction: column;
  left: 0;
  min-width: 100%;
  padding: var(--cre8-spacing-8);
  position: absolute;
  top: 100%;
  white-space: nowrap;
}

.cre8-c-dropdown--open {
  display: flex;
}

.cre8-c-dropdown--icon-button {
  color: var(--cre8-color-button-secondary-content);
  margin-top: calc(8px * 1);
}

.cre8-c-dropdown--icon-link {
  color: var(--cre8-color-content-link);
  margin-top: calc(8px * 1);
}

.cre8-c-dropdown--toggle {
  @include cre8-typography-label-default;
  align-items: center;
  justify-content: space-between;
  display: flex;
  gap: var(--cre8-spacing-8);
  white-space: nowrap;
}

.cre8-c-dropdown--button {
  background-color: var(--cre8-color-button-secondary-bg);
  border: var(--cre8-border-style-default) var(--cre8-border-width-default) var(--cre8-color-button-secondary-border);
  border-radius: var(--cre8-border-radius-button);
  color: var(--cre8-color-button-secondary-content);
  padding: var(--cre8-spacing-8) var(--cre8-spacing-16);
}

.cre8-c-dropdown--link {
  color: var(--cre8-color-content-link);
  background-color:  var(--cre8-color-bg-transparent);
  text-decoration: underline;
}


.cre8-c-dropdown--close {
  display: none;
}

ul {
  list-style-type: none;
  padding: var(--cre8-spacing-0);
  margin: 0;
}
`;
var V4 = Object.defineProperty, Xi = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && V4(e, t, i), i;
};
const Pa = class Pa extends M {
  constructor() {
    super(), this.open = !1, this.buttonText = "", this.dropdownWithLink = !1, this._closeDropdown.bind(this);
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("click", this._closeDropdown);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("click", this._closeDropdown);
  }
  _toggleDropdown(e) {
    e.preventDefault(), e.stopPropagation(), this.open = !this.open, this.open && this._updateDropdownPosition();
  }
  _updateDropdownPosition() {
    this.dropdownContent && this.open && (this.maxHeight && (this.dropdownContent.style.maxHeight = this.maxHeight, this.dropdownContent.style.overflowY = "auto"), this.dropdownWithLink && (this.dropdownContent.style.top = "85%"));
  }
  _closeDropdown() {
    this.open = !1;
  }
  render() {
    const e = this.componentClassNames("cre8-c-dropdown", {
      "cre8-c-dropdown--close": !this.open,
      "cre8-c-dropdown--open": this.open
    });
    return f`
      <div class="cre8-c-dropdown-container">
      ${this.dropdownWithLink ? f`<a href="#" aria-haspopup="true" class="cre8-c-dropdown--toggle cre8-c-dropdown--link" aria-expanded="${this.open ? "true" : "false"}" @click="${this._toggleDropdown}">${this.buttonText}
        ${this.buttonText ? f`<cre8-icon svg='${ri}' aria-hidden="true" class="cre8-c-dropdown--icon-link"></cre8-icon>` : T}
      </a>` : f`<button aria-haspopup="true" class="cre8-c-dropdown--toggle cre8-c-dropdown--button" aria-expanded="${this.open ? "true" : "false"}" @click="${this._toggleDropdown}">${this.buttonText}
      ${this.buttonText ? f`<cre8-icon svg='${ri}' aria-hidden="true" class="cre8-c-dropdown--icon-button"></cre8-icon>` : T}
        </button>`}
        <ul role="list" class="${e}">
          <slot></slot>
        </ul>
      </div>
    `;
  }
};
Pa.styles = [B4];
let $t = Pa;
Xi([
  R()
], $t.prototype, "open");
Xi([
  u({ type: String })
], $t.prototype, "buttonText");
Xi([
  u()
], $t.prototype, "maxHeight");
Xi([
  oe(".cre8-c-dropdown")
], $t.prototype, "dropdownContent");
Xi([
  u()
], $t.prototype, "dropdownWithLink");
customElements.get("cre8-dropdown") === void 0 && customElements.define("cre8-dropdown", $t);
const N4 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Dropdown Item
 */

.cre8-dropdown-item {
  list-style-type: none;
  > {
    button {
      @include cre8-typography-body-default;
      background-color: var(--cre8-color-bg-default);
      border: var(--cre8-border-width-none);
      border-radius: var(--cre8-border-radius-default);
      color: var(--cre8-color-content-default);
      width: 100%;
      cursor: pointer;
      margin: var(--cre8-spacing-0);
      padding: var(--cre8-spacing-8) var(--cre8-spacing-8);
      text-align: left;

      &:active,
      &:hover,
      &:focus {
        background-color: var(--cre8-color-bg-brand-hover);
        color: var(--cre8-color-content-default);
        outline: var(--cre8-border-width-none);
      }
    }
  }
}
`;
var R4 = Object.defineProperty, z4 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && R4(e, t, i), i;
};
const Ea = class Ea extends M {
  constructor() {
    super(...arguments), this.ariaLabel = "";
  }
  _handleClick(e) {
    this.dispatchEvent(new Event("dropdown-item-selected", e));
  }
  render() {
    const e = this.componentClassNames("cre8-dropdown-item", {}), t = this.ariaLabel || `Link to ${this.textContent}` || "Drop down Item";
    return f`<li class="${e}" role="listitem">
        <button aria-label="${t}" @click=${this._handleClick}><slot></slot></button>
      </li>`;
  }
};
Ea.styles = [N4];
let Bo = Ea;
z4([
  u({ type: String })
], Bo.prototype, "ariaLabel");
customElements.get("cre8-dropdown-item") === void 0 && customElements.define("cre8-dropdown-item", Bo);
const F4 = k`@import '../../design-tokens/core/scss/theming/component';

// #FEATURE

/**
 * 1) A Feature is a prominent marketing block that contains
 *    Side by side information and an image
 */
.cre8-c-feature {
  display: flex; /* 2 */
  flex-direction: column;
  align-items: stretch;
  color: var(--cre8-feature-text-color, var(--cre8-theme-color-core-text, var(--cre8-color-neutral-black)));
  border-radius: var(--cre8-feature-border-radius, var(--cre8-border-radius-default, 0));

  @media all and (min-width:$cre8-breakpoint-md) {
    flex-direction: row;
  }
}

/**
 * Inverted feature
 */
.cre8-c-feature--inverted {
  color: var(--cre8-feature-inverted-text-color, var(--cre8-theme-color-inverted, var(--cre8-color-neutral-white)));
}

/**
 * Feature body
 * 1) Container within feature that usually contains an excerpt of text
 * 2) Take up the remaining space on medr screens
 */
.cre8-c-feature__body {
  margin-bottom: calc(8px * 4);

  @media all and (min-width:$cre8-breakpoint-md) {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-right: calc(8px * 4);
    margin-bottom: 0;
  }
}

/**
 * Feature media container
 */
.cre8-c-feature__media {
  width: 100%;

  @media all and (min-width:$cre8-breakpoint-md) {
    width: 45%;
  }
}

/**
 * Feature image
 */
.cre8-c-feature__image {
  display: block;
  width: 100%;
}
`;
var Z4 = Object.defineProperty, Ys = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Z4(e, t, i), i;
};
const Da = class Da extends M {
  render() {
    const e = this.componentClassNames("cre8-c-feature", {
      "cre8-c-feature--inverted": this.inverted === !0
    });
    return f`
      <div class="${e}" part="feature">
        <div class="cre8-c-feature__body" part="body">
          <slot></slot>
        </div>
        ${this.imgAlt ? f`<div class="cre8-c-feature__media">
              <img class="cre8-c-feature__image" src=${this.imgSrc} alt=${this.imgAlt} part="image" />
            </div>` : ""}
      </div>
    `;
  }
};
Da.styles = [F4];
let Or = Da;
Ys([
  u()
], Or.prototype, "imgSrc");
Ys([
  u()
], Or.prototype, "imgAlt");
Ys([
  u({ type: Boolean, reflect: !0 })
], Or.prototype, "inverted");
customElements.get("cre8-feature") === void 0 && customElements.define("cre8-feature", Or);
const j4 = k`@import '../../design-tokens/core/scss/theming/component';
@import '@cre8_dev/cre8-design-tokens/lib/web/layouts/breakpoints.scss';

// #FOOTER

/**
 * 1) Container used to house various Components and content for the global footer
 */
.cre8-c-footer {
  @include cre8-typography-body-default();
  background: var(--cre8-color-bg-brand-xstrong);
  color: var(--cre8-color-content-knockout);
  padding-top: calc(8px * 5);
  padding-bottom: calc(8px * 6);

  @media all and (min-width:$cre8-breakpoint-lg) {
    padding-top: calc(8px * 6.875);
  }
}
`, Oa = class Oa extends M {
  render() {
    const e = this.componentClassNames("cre8-c-footer", {});
    return f`
      <footer class="${e}" role="contentinfo">
        ${this.slotNotEmpty("top") && f`<div class="cre8-c-footer__top">
          <cre8-layout-container>
            <slot name="top"></slot>
          </cre8-layout-container>
        </div>`}
        <div class="cre8-c-footer__middle">
          <cre8-layout-container>
            <slot></slot>
          </cre8-layout-container>
        </div>
        ${this.slotNotEmpty("bottom") && f`<div class="cre8-c-footer__bottom">
          <cre8-layout-container>
            <slot name="bottom"></slot>
          </cre8-layout-container>
        </div>`}
      </footer>
    `;
  }
};
Oa.styles = [j4];
let us = Oa;
customElements.get("cre8-footer") === void 0 && customElements.define("cre8-footer", us);
const W4 = k`@import '../../design-tokens/core/scss/theming/component';

// #GLOBAL NAV

/**
 * Inverted Global nav
 */
.cre8-c-global-nav--inverted {
  --cre8-global-nav-link-color: var(--cre8-color-content-knockout);
}

/**
 * Global nav list
 * 1) Stack on small screens within the toggleable menu but place side by side on large screens
 */
.cre8-c-global-nav__list {
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
  overflow: auto;
}
`;
var q4 = Object.defineProperty, Xs = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && q4(e, t, i), i;
};
const Ha = class Ha extends M {
  constructor() {
    super(...arguments), this.navAriaLabel = "global";
  }
  render() {
    const e = this.componentClassNames("cre8-c-global-nav", {
      "cre8-c-global-nav--side-by-side": this.behavior === "side-by-side",
      "cre8-c-global-nav--inverted": this.inverted === !0
    });
    return f`
      <nav aria-label="${this.navAriaLabel}" class="${e}">
        <ul class="cre8-c-global-nav__list">
          <slot></slot>
        </ul>
      </nav>
    `;
  }
};
Ha.styles = [W4];
let Hr = Ha;
Xs([
  u({ type: Boolean, reflect: !0 })
], Hr.prototype, "inverted");
Xs([
  u()
], Hr.prototype, "behavior");
Xs([
  u()
], Hr.prototype, "navAriaLabel");
customElements.get("cre8-global-nav") === void 0 && customElements.define("cre8-global-nav", Hr);
const U4 = k`@import '../../design-tokens/core/scss/theming/component';

// #PRIMARY NAV ITEM

/**
 * Actual primary nav list item
 */

/**
 * Content within the primary nav item
 */
.cre8-c-global-nav__item-content {
  display: flex;
  align-items: baseline;
}

/**
 * Primary navigation link
 * 1) Used to remove any sort of default button styles when a button tag is rendered
 */
.cre8-c-global-nav__link {
  @include cre8-typography-body-small;
  display: flex;
  align-items: center;
  appearance: none; /* 1 */
  background: transparent; /* 1 */
  border: none;
  //border: 1px solid var(--cre8-color-header-menu-border-default); /* 1 */
  white-space: nowrap;
  width: 100%;
  margin: 0;
  padding: calc(8px * 1) calc(8px * 2);
  color: var(--cre8-global-nav-link-color, var(--cre8-color-content-subtle));
  text-decoration: none;
  transition: all var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    //border-color: var(--cre8-color-header-menu-border-hover);
    background: var(--cre8-color-header-menu-bg-hover);
    color: var(--cre8-color-header-menu-content-hover);
  }

  &:active {
    border-color: var(--cre8-color-header-menu-border-pressed);
    background: var(--cre8-color-header-menu-bg-pressed);
    color: var(--cre8-color-header-menu-content-pressed);
  }
}

/**
 * Icon within primary navigation item
 * 1) TODO: Figure out how to pass down calc(8px * 1.5) instead of static rem value
 */
cre8-icon-legacy {
  --cre8-icon-height: #{calc(8px * 1)}; /* 1 */
  --cre8-icon-width: #{calc(8px * 1)}; /* 1 */
  margin-left: auto;
  transition: transform var(--cre8-anim-fade-quick) var(--cre8-anim-ease);

  /**
  * Icon within active primary nav item
  * 1) Rotate the icon to show that the dropdown is open
  */
  .cre8-c-global-nav__item.cre8-is-active & {
    transform: rotate(-180deg); /* 1 */
  }

  @media all and (min-width:$cre8-breakpoint-lg) {
    margin-left: calc(8px * 1);
  }
}

.cre8-c-global-nav__item-after {
  --cre8-icon-height: #{calc(8px * 1.5)};
  --cre8-icon-width: #{calc(8px * 1.5)};
  margin-left: calc(8px * 1);
}
`;
var Y4 = Object.defineProperty, Ki = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Y4(e, t, i), i;
};
const Ia = class Ia extends M {
  /**
   * Initialize functions
   */
  constructor() {
    super(), this.text = "Nav item", this.href = "#", this.iconName = "keyboard-arrow-down", this._handleOnClickOutside = this._handleOnClickOutside.bind(this), this._clickHandler = this._clickHandler.bind(this);
  }
  /**
   * Connected Callback lifecycle
   */
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("mousedown", this._handleOnClickOutside, !1);
  }
  /**
   * Disconnected callback lifecycle
   * 1) Remove window resize event listener
   */
  disconnectedCallback() {
    document.removeEventListener("mousedown", this._handleOnClickOutside, !1), super.disconnectedCallback();
  }
  /**
   * Handle click outside the component
   * 1) Close the show hide panel on click outside
   * 2) If the nav is already closed then we don't care about outside clicks and we
   * can bail early
   * 3) By the time a user clicks on the page the shadowRoot will almost certainly be
   * defined, but TypeScript isn't that trusting and sees this.shadowRoot as possibly
   * undefined. To work around that we'll check that we have a shadowRoot (and a
   * rendered .host) element here to appease the TypeScript compiler. This should never
   * actually be shown or run for a human end user.
   * 4) Check to see if we clicked inside the active navigation item
   * 5) If the navigation is active and we've clicked outside of the nav then it should
   * be closed.
   */
  _handleOnClickOutside(e) {
    if (!this.isActive)
      return;
    if (!this.shadowRoot?.host)
      throw Error("Could not determine navigation context during click handler");
    const t = e.composedPath().includes(this.shadowRoot.host);
    this.isActive && !t && (this.isActive = !1);
  }
  /**
   * Toggle active state of primary nav item
   * 1) Remove isActive state from all sibling elements
   * 2) Toggle active state of element selected
   */
  _clickHandler(e) {
    e.preventDefault(), this.parentNode && this.parentNode.querySelectorAll("cre8-global-nav-item").forEach((o) => {
      o !== this && (o.isActive = !1);
    }), this.isActive = !this.isActive;
  }
  closePanel() {
    this.isActive = !1;
  }
  _handleOnKeyDown(e) {
    if (e.key === "Escape" && this.isActive === !0) {
      this.closePanel();
      const t = this.shadowRoot?.querySelector(
        ".cre8-c-global-nav__link"
      );
      t && setTimeout(() => {
        t.focus();
      }, 1);
    }
  }
  render() {
    const e = this.componentClassNames("cre8-c-global-nav__item", {
      "cre8-is-active": this.isActive === !0,
      "cre8-c-global-nav__item--megamenu": this.megaMenu === !0
    });
    return this.megaMenu ? f`
            <li class="${e}" @keydown=${this._handleOnKeyDown}>
                <div class="cre8-c-global-nav__item-content">
                    ${this.slotNotEmpty("itemBefore") && f`
                    <div class="cre8-c-global-nav__item-before">
                        <slot name="itemBefore"></slot>
                    </div>`}
                    <button
                        class="cre8-c-global-nav__link"
                        @click=${this._clickHandler}
                        aria-expanded=${this.isActive === !0}
                    >
                        ${this.text}
                        <cre8-icon-legacy aria-hidden="true" name="${$(this.iconName)}"></cre8-icon-legacy>
                    </button>
                </div>
            </li>
        ` : f`
            <li class="${e}">
                <div class="cre8-c-global-nav__item-content">
                    <a class="cre8-c-global-nav__link" href="${this.href}">
                        ${this.slotNotEmpty("itemBefore") && f`
                        <div class="cre8-c-global-nav__item-before">
                            <slot name="itemBefore"></slot>
                        </div>`}
                        ${this.text}
                        ${this.slotNotEmpty("itemAfter") && f`
                        <div class="cre8-c-global-nav__item-after">
                            <slot name="itemAfter"></slot>
                        </div>`}
                    </a>
                </div>
            </li>
        `;
  }
};
Ia.styles = [U4];
let Mt = Ia;
Ki([
  u()
], Mt.prototype, "text");
Ki([
  u()
], Mt.prototype, "href");
Ki([
  u()
], Mt.prototype, "iconName");
Ki([
  u({ type: Boolean, reflect: !0 })
], Mt.prototype, "megaMenu");
Ki([
  R()
], Mt.prototype, "isActive");
customElements.get("cre8-global-nav-item") === void 0 && customElements.define("cre8-global-nav-item", Mt);
const X4 = k`@import '../../design-tokens/core/scss/theming/component';

// #GRID

/**
 * 1) Grid layout for items like cards, etc.
 */
.cre8-c-grid {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: calc(8px * -1.5);
}

/**
 * Grid with no gap in between items
 */
.cre8-c-grid--gap-none {
  margin: 0;
}

/**
 * Small gap grid
 * 1) Spacing between grid items is smaller than default
 */
.cre8-c-grid--gap-sm {
  margin: calc(8px * -0.5);
}

/**
 * Large gap grid
 * 1) Spacing between grid items is larger than default
 */
.cre8-c-grid--gap-lg {
  margin: calc(8px * -2);
}

/**
 * Side by Side Grid
 * 1) Grid that stays 2 items per row on all screen sizes
 */
.cre8-c-grid--side-by-side {
  flex-direction: row;
}

/**
 * 2up grid
 * 1) Stacked items on small screens to 2 items per row on medium/large screens
 */
.cre8-c-grid--2up {
  @media all and (min-width:$cre8-breakpoint-md) {
    flex-direction: row;
  }

  /**
  * 2up grid that breaks faster
  * 1) Grid that breaks from 1 to 2up at a smaller viewport than the default
  */
  &.cre8-c-grid--break-faster {
    @media all and (min-width:$cre8-breakpoint-sm) {
      flex-direction: row;
    }
  }

  /**
  * 2up grid that breaks slower
  * 1) Grid that breaks from 1 to 2up at a larger viewport than the default
  */
  &.cre8-c-grid--break-slower {
    @media all and (min-width:$cre8-breakpoint-md) {
      flex-direction: column;
    }
    @media all and (min-width:$cre8-breakpoint-xxl) {
      flex-direction: row;
    }
  }
}

/**
 * 3up grid
 * 1) Stacked items on small screens to 3 items per row on medium/large screens
 */
.cre8-c-grid--3up {
  @media all and (min-width:$cre8-breakpoint-md) {
    flex-direction: row;
  }
}

/**
 * 1 to 3up grid
 * 1) Stacked items on small screens to 3 items per row on medium/large screens
 */
.cre8-c-grid--1-3up {
  @media all and (min-width:$cre8-breakpoint-lg) {
    flex-direction: row;
  }

  /**
  * 1 to 3 up grid that breaks faster
  * 1) Grid that breaks from 1 to 3up at a smaller viewport than the default
  */
  &.cre8-c-grid--break-faster {
    @media all and (min-width:$cre8-breakpoint-md) {
      flex-direction: row;
    }
  }

  /**
  * 1 to 3up grid that breaks slower
  * 1) Grid that breaks from 1 to 3up at a larger viewport than the default
  */
  &.cre8-c-grid--break-slower {
    @media all and (min-width:$cre8-breakpoint-lg) {
      flex-direction: column;
    }
    @media all and (min-width:$cre8-breakpoint-xl) {
      flex-direction: row;
    }
  }
}

/**
 * 1 to 2 to 4up grid
 * 1) Stacked items on small screens to 2 items per row on medium screens to 4 items per row on large screens
 */
.cre8-c-grid--1-2-4up {
  @media all and (min-width:$cre8-breakpoint-sm) {
    flex-direction: row;
  }
}

/**
 * 1 to 4up grid
 * 1) Stacked items on small screens to 4 items per row on medium/large screens
 */
.cre8-c-grid--1-4up {
  @media all and (min-width:$cre8-breakpoint-md) {
    flex-direction: row;
  }
}

/**
 * 1 to 2 to 4up grid
 * 1) Stacked items on small screens to 2 items per row on small/medium screens to
 * 3 items per row on medium screens and 4 items per row on large screens
 */
.cre8-c-grid--4up {
  @media all and (min-width:$cre8-breakpoint-sm) {
    flex-direction: row;
  }
}

/**
  * Slotted grid item within 4up Grid
  */
.cre8-c-grid--2-4-6up {
  flex-direction: row;
}

/**
 * Slotted grid item
 */
::slotted(cre8-grid-item) {
  display: block;
  padding: calc(8px * 1.5);

  /**
  * Slotted grid item within grid with no gap between items
  */
  .cre8-c-grid--gap-none > & {
    padding: 0;
  }

  /**
  * Slotted grid item within grid with small gap between items
  */
  .cre8-c-grid--gap-sm > & {
    padding: calc(8px * 0.5);
  }

  /**
  * Slotted grid item within grid with large gap between items
  */
  .cre8-c-grid--gap-lg > & {
    padding: calc(8px * 2);
  }

  /**
  * Slotted grid item within side by side grid
  * 1) Grid that stays 2 items per row on all screen sizes
  */
  .cre8-c-grid--side-by-side > & {
    width: 50%;
  }

  /**
  * Slotted grid item within 2up Grid
  */
  .cre8-c-grid--2up > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 50%;
    }
  }

  /**
  * Slotted grid item within 2up break faster (small to large screens) Grid
  */
  .cre8-c-grid--2up.cre8-c-grid--break-faster > & {
    @media all and (min-width:$cre8-breakpoint-sm) {
      width: 50%;
    }
  }

  /**
  * Slotted grid item within 2up break slower (small to large screens) Grid
  */
  .cre8-c-grid--2up.cre8-c-grid--break-slower > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 100%;
    }
    @media all and (min-width:$cre8-breakpoint-xxl) {
      width: 50%;
    }
  }

  /**
  * Slotted grid item within 3up Grid
  */
  .cre8-c-grid--3up > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 50%;
    }

    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 33.3333%;
    }
  }

  /**
  * Slotted grid item within 1-3up Grid
  */
  .cre8-c-grid--1-3up > & {
    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 33.3333%;
    }
  }

  /**
  * Slotted grid item within 1 to 3up break faster (small to large screens) grid
  */
  .cre8-c-grid--1-3up.cre8-c-grid--break-faster > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 33.33%;
    }
  }

  /**
  * Slotted grid item within 2up break slower (small to large screens) Grid
  */
  .cre8-c-grid--1-3up.cre8-c-grid--break-slower > & {
    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 100%;
    }
    @media all and (min-width:$cre8-breakpoint-xl) {
      width: 33.33%;
    }
  }

  /**
  * Slotted grid item within 1-2-4up Grid
  */
  .cre8-c-grid--1-2-4up > & {
    @media all and (min-width:$cre8-breakpoint-sm) {
      width: 50%;
    }

    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 25%;
    }
  }

  /**
  * Slotted grid item within 1-2-4up Grid
  */
  .cre8-c-grid--1-4up > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 25%;
    }
  }

  /**
  * Slotted grid item within 4up Grid
  */
  .cre8-c-grid--4up > & {
    @media all and (min-width:$cre8-breakpoint-sm) {
      width: 50%;
    }

    @media all and (min-width:$cre8-breakpoint-md) {
      width: 33.3333%;
    }

    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 25%;
    }
  }

  /**
  * Slotted grid item within 4up Grid
  */
  .cre8-c-grid--2-4-6up > & {
    width: 50%;

    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 25%;
    }

    @media all and (min-width:$cre8-breakpoint-xl) {
      width: 16.66%;
    }
  }
}
`;
var K4 = Object.defineProperty, Ks = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && K4(e, t, i), i;
};
const Ba = class Ba extends M {
  render() {
    const e = this.componentClassNames("cre8-c-grid", {
      "cre8-c-grid--side-by-side": this.variant === "side-by-side",
      "cre8-c-grid--2up": this.variant === "2up",
      "cre8-c-grid--3up": this.variant === "3up",
      "cre8-c-grid--1-3up": this.variant === "1-3up",
      "cre8-c-grid--4up": this.variant === "4up",
      "cre8-c-grid--1-4up": this.variant === "1-4up",
      "cre8-c-grid--1-2-4up": this.variant === "1-2-4up",
      "cre8-c-grid--2-4-6up": this.variant === "2-4-6up",
      "cre8-c-grid--gap-none": this.gap === "none",
      "cre8-c-grid--gap-sm": this.gap === "sm",
      "cre8-c-grid--gap-lg": this.gap === "lg",
      "cre8-c-grid--break-faster": this.break === "faster",
      "cre8-c-grid--break-slower": this.break === "slower"
    });
    return f`
      <div class="${e}">
        <slot></slot>
      </div>
    `;
  }
};
Ba.styles = [X4];
let Ir = Ba;
Ks([
  u()
], Ir.prototype, "variant");
Ks([
  u()
], Ir.prototype, "gap");
Ks([
  u()
], Ir.prototype, "break");
customElements.get("cre8-grid") === void 0 && customElements.define("cre8-grid", Ir);
const G4 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Item used for the various items within the grid
 */
.cre8-c-grid__item {
  height: 100%;
}
`, Va = class Va extends M {
  render() {
    const e = this.componentClassNames("cre8-c-grid__item", {});
    return f`
      <div class="${e}">
        <slot></slot>
      </div>
    `;
  }
};
Va.styles = [G4];
let ps = Va;
customElements.get("cre8-grid-item") === void 0 && customElements.define("cre8-grid-item", ps);
const J4 = k`@import '../../design-tokens/core/scss/theming/component';

// #HEADER

/**
  * 1) Global header where the navigation, logo, and other content lives across the entire site
  */
.cre8-c-header {
  background: var(--cre8-header-background, var(--cre8-color-header-bg-default));
  color: var(--cre8-color-content-default);
  position: relative;
  z-index: 3;
}

/**
 * Header top section
 * 1) Optional slot used for global navigation usually
 */
.cre8-c-header__top {
  position: relative;
  top: 0;
  width: 100%;
  z-index: 3;
  background: var(--cre8-header-top-background);
}

/**
 * Inner container of the header top section
 * 1) Used to cap the width of the content within the header
 */
.cre8-c-header__top-inner {
  display: flex;
  align-items: center;
  width: 100%;
  overflow: auto;
}

/**
 * Header middle section
 * 1) Section of the site used for the logo and primary navigation
 */
.cre8-c-header__middle {
  width: 100%;
  box-shadow: var(--cre8-theme-box-shadow-md);
  border-bottom: var(--cre8-header-middle-border-bottom-color);
}

/**
 * Inner container of the header middle section
 * 1) Used to cap the width of the content within the header
 */
.cre8-c-header__middle-inner {
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: calc(8px * 2);
  padding-bottom: calc(8px * 2);
}

.cre8-c-header__bottom {
  background: var(--cre8-header-bottom-background);
  box-shadow: var(--cre8-header-bottom-box-shadow);
}
`;
var Q4 = Object.defineProperty, e6 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Q4(e, t, i), i;
};
const Na = class Na extends M {
  render() {
    const e = this.componentClassNames("cre8-c-header", {
      "cre8-is-active": this.isActive === !0
    });
    return f`
      <header class="${e}">
        ${this.slotNotEmpty("top") && f`<div class="cre8-c-header__top">
          <cre8-layout-container>
            <div class="cre8-c-header__top-inner">
              <slot name="top"></slot>
            </div>
          </cre8-layout-container>
        </div>`}
        <div class="cre8-c-header__middle">
          <cre8-layout-container>
            <div class="cre8-c-header__middle-inner">
              <slot></slot>
            </div>
          </cre8-layout-container>
        </div>
        ${this.slotNotEmpty("bottom") && f`<div class="cre8-c-header__bottom">
          <cre8-layout-container>
            <slot name="bottom"></slot>
          </cre8-layout-container>
        </div>`}
      </header>
    `;
  }
};
Na.styles = [J4];
let Vo = Na;
e6([
  R()
], Vo.prototype, "isActive");
customElements.get("cre8-header") === void 0 && customElements.define("cre8-header", Vo);
const t6 = k`@import '../../design-tokens/core/scss/theming/component';

// #HERO

/**
 * 1) Block with an image and overlay on medium and large screens
 */
.cre8-c-hero {
  position: relative;
  margin-bottom: calc(8px * 4);

  @media all and (min-width:$cre8-breakpoint-md) {
    height: 40vh;
  }
}

/**
 * Hero image
 */
.cre8-c-hero__image {
  width: 100%;
  height: 100%;

  @media all and (min-width:$cre8-breakpoint-md) {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }
}

/**
 * Hero body
 * 1) Content is placed in the bottom left part of the image on medium/large screens by default
 */
.cre8-c-hero__body {
  display: flex;
  flex-direction: column;
  padding-top: calc(8px * 2);

  @media all and (min-width:$cre8-breakpoint-md) {
    position: absolute;
    align-items: flex-start;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    padding-top: calc(8px * 4);
    padding-bottom: calc(8px * 4);
  }

  /**
   * Hero body within align top left variant
   * 1) Place body content in the top left part of the image on medium/large screens
   */
  .cre8-c-hero--top-left & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-start;
      align-items: flex-start;
    }
  }

  /**
   * Hero body within align left variant
   * 1) Place body content along left part of the image and vertically centered on medium/large screens
   */
  .cre8-c-hero--left & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: center;
    }
  }

  /**
   * Hero body within align top center variant
   * 1) Place body content in the top center part of the image on medium/large screens
   */
  .cre8-c-hero--top-center & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-start;
      align-items: center;
    }
  }

  /**
   * Hero body within align center variant
   * 1) Place body content horizontally and vertically centered overlaying the image on medium/large screens
   */
  .cre8-c-hero--center & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: center;
      align-items: center;
    }
  }

  /**
   * Hero body within align bottom center variant
   * 1) Place body content in the bottom center part of the image on medium/large screens
   */
  .cre8-c-hero--bottom-center & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-end;
      align-items: center;
    }
  }
  .cre8-c-hero--top-right & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-start;
      align-items: flex-end;
    }
  }

  /**
   * Hero body within align right variant
   * 1) Place body content along right part of the image and vertically centered on medium/large screens
   */
  .cre8-c-hero--right & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: center;
      align-items: flex-end;
    }
  }

  /**
   * Hero body within align bottom right variant
   * 1) Place body content in the bottom right part of the image on medium/large screens
   */
  .cre8-c-hero--bottom-right & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-end;
      align-items: flex-end;
    }
  }
}
`;
var r6 = Object.defineProperty, Gs = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && r6(e, t, i), i;
};
const Ra = class Ra extends M {
  render() {
    const e = this.componentClassNames("cre8-c-hero", {
      "cre8-c-hero--top-left": this.align === "top-left",
      "cre8-c-hero--left": this.align === "left",
      "cre8-c-hero--top-center": this.align === "top-center",
      "cre8-c-hero--center": this.align === "center",
      "cre8-c-hero--bottom-center": this.align === "bottom-center",
      "cre8-c-hero--top-right": this.align === "top-right",
      "cre8-c-hero--right": this.align === "right",
      "cre8-c-hero--bottom-right": this.align === "bottom-right"
    });
    return f`
      <div class="${e}">
        <cre8-layout-container>
          <img class="cre8-c-hero__image" src="${this.imgSrc}" alt="${this.imgAlt}" />
          <div class="cre8-c-hero__body">
            <slot></slot>
          </div>
        </cre8-layout-container>
      </div>
    `;
  }
};
Ra.styles = [t6];
let Br = Ra;
Gs([
  u()
], Br.prototype, "imgSrc");
Gs([
  u()
], Br.prototype, "imgAlt");
Gs([
  u()
], Br.prototype, "align");
customElements.get("cre8-hero") === void 0 && customElements.define("cre8-hero", Br);
const x1 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346628 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9978 5.87895 15.1542 3.84542 13.6544 2.34562C12.1546 0.845814 10.121 0.00223986 8 0ZM8 12.9231C7.81743 12.9231 7.63897 12.8689 7.48717 12.7675C7.33537 12.6661 7.21706 12.5219 7.14719 12.3532C7.07732 12.1846 7.05904 11.999 7.09466 11.8199C7.13028 11.6409 7.21819 11.4764 7.34729 11.3473C7.47638 11.2182 7.64086 11.1303 7.81992 11.0947C7.99898 11.059 8.18458 11.0773 8.35325 11.1472C8.52192 11.2171 8.66608 11.3354 8.76751 11.4872C8.86894 11.639 8.92308 11.8174 8.92308 12C8.92308 12.2448 8.82583 12.4796 8.65271 12.6527C8.4796 12.8258 8.24482 12.9231 8 12.9231ZM8.61539 9.17538V9.23077C8.61539 9.39398 8.55055 9.5505 8.43514 9.66591C8.31974 9.78132 8.16321 9.84615 8 9.84615C7.83679 9.84615 7.68027 9.78132 7.56486 9.66591C7.44945 9.5505 7.38462 9.39398 7.38462 9.23077V8.61538C7.38462 8.45217 7.44945 8.29565 7.56486 8.18024C7.68027 8.06483 7.83679 8 8 8C9.01769 8 9.84616 7.30769 9.84616 6.46154C9.84616 5.61538 9.01769 4.92308 8 4.92308C6.98231 4.92308 6.15385 5.61538 6.15385 6.46154V6.76923C6.15385 6.93244 6.08901 7.08896 5.97361 7.20437C5.8582 7.31978 5.70167 7.38461 5.53846 7.38461C5.37525 7.38461 5.21873 7.31978 5.10332 7.20437C4.98791 7.08896 4.92308 6.93244 4.92308 6.76923V6.46154C4.92308 4.93461 6.30308 3.69231 8 3.69231C9.69692 3.69231 11.0769 4.93461 11.0769 6.46154C11.0769 7.79846 10.0185 8.91769 8.61539 9.17538Z"/>
</svg>
`, i6 = k`@import '../../design-tokens/core/scss/theming/component';

:host {
  display: inline-flex;
}
:host([fullWidth]) {
  display: flex;
}

/**
 * Inline alert
 */
.cre8-c-inline-alert {
  @include cre8-typography-body-default();
  font-weight: normal;
  display: inline-flex;
  align-items: flex-start;
  gap: calc(8px * 1);
  padding: calc(8px * 2);
  color: var(--cre8-color-content-default);
  background-color: var(--cre8-color-bg-info);
  border-color: var(--cre8-color-border-info);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  border-radius: var(--cre8-border-radius-default);
}

/**
 * Full-width inline alert
 */
.cre8-c-inline-alert--full-width {
  width: 100%;
}

/**
 * Inline alert with error variant
 */
.cre8-c-inline-alert--error {
  background-color: var(--cre8-color-bg-error);
  border-color: var(--cre8-color-border-error);
}

/**
 * Inline alert with warning variant
 */
.cre8-c-inline-alert--warning {
  background-color: var(--cre8-color-bg-warning);
  border-color: var(--cre8-color-border-warning);
}

/**
 * Inline alert with success variant
 */
.cre8-c-inline-alert--success {
  background-color: var(--cre8-color-bg-success);
  border-color: var(--cre8-color-border-success);
}

/**
 * Inline alert with attention variant
 */
.cre8-c-inline-alert--attention {
  background-color: var(--cre8-color-bg-attention);
  border-color: var(--cre8-color-border-attention);
}

/**
 * Inline alert with neutral variant
 */
.cre8-c-inline-alert--neutral {
  background-color: var(--cre8-color-bg-subtle);
  border-color: var(--cre8-color-border-strong);
}

/**
 * Inline alert with variant - transparent
 */
.cre8-c-inline-alert--transparent {
  padding: 0;
  border: none;
  background-color: transparent;
  gap: calc(8px * 1);
  border-radius: none;
}

/**
 * Inline alert with variant - transparent and error
 */
.cre8-c-inline-alert--transparent.cre8-c-inline-alert--error {
  color: var(--cre8-color-content-error);
}

/**
 * Inline alert with variant - transparent and success
 */
.cre8-c-inline-alert--transparent.cre8-c-inline-alert--success {
  color: var(--cre8-color-content-success);
}

/**
 * Inline alert icon
 */
.cre8-c-inline-alert__icon {
  position: relative;
  color: var(--cre8-color-content-info-icon);
  height: calc(8px * 3);
  width: calc(8px * 3);

  /**
   * Inline alert icon for error variant
   */
  .cre8-c-inline-alert--error & {
    color: var(--cre8-color-content-error-icon);
  }

  /**
   * Inline alert icon for warning variant
   */
  .cre8-c-inline-alert--warning & {
    color: var(--cre8-color-content-warning-icon);
  }

  /**
   * Inline alert icon for success variant
   */
  .cre8-c-inline-alert--success & {
    color: var(--cre8-color-content-success-icon);
  }

  /**
   * Inline alert icon for help variant
   * Inline alert icon for info variant
   */
   .cre8-c-inline-alert--help,
   .cre8-c-inline-alert--info
    & {
    color: var(--cre8-color-content-info-icon);
  }

  /**
   * Inline alert icon for attention variant
   */
  .cre8-c-inline-alert--attention & {
    color: var(--cre8-color-content-attention-icon);
  }

  /**
   * Inline alert icon for neutral variant
   */
  .cre8-c-inline-alert--neutral & {
    color: var(--cre8-color-content-default);
  }

  /**
   * Inline alert icon
   */
  .cre8-c-inline-alert--transparent & {
    top: 0;
    padding: calc(8px * 0.25);
  }
}
`;
var o6 = Object.defineProperty, Gi = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && o6(e, t, i), i;
};
const za = class za extends M {
  constructor() {
    super(...arguments), this.variant = "subtle", this.status = "info";
  }
  /*
  * Maps modal icons and modal status variants to what the alt text of the related icon should be see:
  *#
  * this provides the recommendated alt text of different statuses
  */
  mapStatusToIconInlineAlert(e) {
    switch (e) {
      case "error":
        return f`<cre8-icon 
                svg='${As}' 
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
      case "success":
        return f`<cre8-icon 
                svg='${Mr}' 
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
      case "warning":
        return f`<cre8-icon 
                svg='${nn}'
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
      case "help":
        return f`<cre8-icon 
                svg='${x1}'
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
      case "info":
        return f`<cre8-icon 
                svg='${Lr}'
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
      case "attention":
        return f`<cre8-icon 
                svg='${Lr}'
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
      case "neutral":
        return f`<cre8-icon 
                svg='${x1}'
                aria-label="${this.iconTitle}"
                aria-hidden="true"
                class="cre8-c-inline-alert__icon"></cre8-icon>`;
      default:
        return T;
    }
  }
  render() {
    const e = this.componentClassNames("cre8-c-inline-alert", {
      "cre8-c-inline-alert--transparent": this.variant === "transparent",
      "cre8-c-inline-alert--error": this.status === "error",
      "cre8-c-inline-alert--warning": this.status === "warning",
      "cre8-c-inline-alert--success": this.status === "success",
      "cre8-c-inline-alert--attention": this.status === "attention",
      "cre8-c-inline-alert--neutral": this.status === "neutral",
      "cre8-c-inline-alert--help": this.status === "help",
      "cre8-c-inline-alert--info": this.status === "info",
      "cre8-c-inline-alert--full-width": this.fullWidth
    });
    return f`
        <div class="${e}">
            ${this.iconName || this.status ? f` ${this.mapStatusToIconInlineAlert(this.status)}` : ""}
            <div class="cre8-c-inline-alert__body">
                <slot></slot>
            </div>
        </div>
        `;
  }
};
za.styles = [i6];
let Lt = za;
Gi([
  u()
], Lt.prototype, "iconName");
Gi([
  u({ type: Boolean, reflect: !0 })
], Lt.prototype, "fullWidth");
Gi([
  u()
], Lt.prototype, "iconTitle");
Gi([
  u()
], Lt.prototype, "variant");
Gi([
  u({ type: String })
], Lt.prototype, "status");
customElements.get("cre8-inline-alert") === void 0 && customElements.define("cre8-inline-alert", Lt);
const n6 = k`@import '../../design-tokens/core/scss/theming/component';

// #LAYOUT

/**
 * 1) Layout wrapper that houses layout section Components to create a layouts like
 * sidebar layouts that are 1 row across and not a grid
 */
.cre8-c-layout {
  display: grid;
  flex: 1;
  gap: calc(8px * 2);
  grid-template-columns: minmax(0, 1fr);

  @media all and (min-width:$cre8-breakpoint-lg) {
    gap: calc(8px * 4);
    grid-template-columns: minmax(0, 1fr) calc(var(--cre8-sidebar-width, 40%) - (calc(8px * 1))); /* 2 */
  }
}

/**
 * Left sidebar layout
 * 1) Layout that is stacked on small screens and turns into a left sidebar with main
 * content to the right
 * 2) The main column stretches the full width minus the sidebar width and gap.
 *    The sidebar column has a minimum width value (enough to accommodate navigation
 *    and other sidebar content) but stretches to fit the content placed inside it.
 */
.cre8-c-layout--left-sidebar {
  @media all and (min-width:$cre8-breakpoint-lg) {
    grid-template-columns: calc(var(--cre8-sidebar-width, 40%) - (calc(8px * 1))) minmax(0, 1fr); /* 2 */
  }
}
`;
var s6 = Object.defineProperty, a6 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && s6(e, t, i), i;
};
const Fa = class Fa extends M {
  render() {
    const e = this.componentClassNames("cre8-c-layout", {
      "cre8-c-layout--left-sidebar": this.variant === "left-sidebar"
    });
    return f`
      <div class="${e}">
        <slot></slot>
      </div>
    `;
  }
};
Fa.styles = [n6];
let No = Fa;
a6([
  u()
], No.prototype, "variant");
customElements.get("cre8-layout") === void 0 && customElements.define("cre8-layout", No);
const c6 = k`@import '../../design-tokens/core/scss/theming/component';

// #LAYOUT CONTAINER

/**
 * Layout Container
 * 1) Caps the width of the content to the maximum width
 *    and centers the container
 */
.cre8-l-layout-container {
  width: 100%;
  max-width: var(--cre8-l-max-width);
  padding-right: calc(8px * 2);
  padding-left: calc(8px * 2);
  margin: 0 auto;
}

.cre8-l-layout-container--full-height {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}
`;
var l6 = Object.defineProperty, d6 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && l6(e, t, i), i;
};
const Za = class Za extends M {
  render() {
    const e = this.componentClassNames("cre8-l-layout-container", {
      "cre8-l-layout-container--full-height": this.fullHeight === !0
    });
    return f`
      <div class="${e}">
        <slot></slot>
      </div>
    `;
  }
};
Za.styles = [c6];
let Ro = Za;
d6([
  u({ type: Boolean, reflect: !0 })
], Ro.prototype, "fullHeight");
customElements.get("cre8-layout-container") === void 0 && customElements.define("cre8-layout-container", Ro);
const h6 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Section within the layout component for each item
 */
.cre8-c-layout-section {
  width: 100%;
  height: 100%;
}
`;
var u6 = Object.defineProperty, zd = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && u6(e, t, i), i;
};
const ja = class ja extends M {
  constructor() {
    super(...arguments), this.top = "1rem";
  }
  render() {
    const e = this.componentClassNames("cre8-c-layout-section", {
      "cre8-c-layout-section--sticky": this.behavior === "sticky"
    });
    return f`
      <div class="${e}" style=${`top: ${this.top}`}>
        <slot></slot>
      </div>
    `;
  }
};
ja.styles = [h6];
let Bi = ja;
zd([
  u()
], Bi.prototype, "behavior");
zd([
  u()
], Bi.prototype, "top");
customElements.get("cre8-layout-section") === void 0 && customElements.define("cre8-layout-section", Bi);
const p6 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Container used to cap the width of a passage of text to be readable
 */
.cre8-c-linelength-container {
  max-width: var(--cre8-l-linelength-width);
}
`, Wa = class Wa extends M {
  render() {
    const e = this.componentClassNames("cre8-c-linelength-container", {});
    return f`
      <div class="${e}">
        <slot></slot>
      </div>
    `;
  }
};
Wa.styles = [p6];
let fs = Wa;
customElements.get("cre8-linelength-container") === void 0 && customElements.define("cre8-linelength-container", fs);
const f6 = k`@import '../../design-tokens/core/scss/theming/component';
/**
 * A list of hyperlinks
 * 1) Override preset line-height value to condense link text. Note: this should
 *    be done sparingly to control wrapping text for specific scenarios
 */
.cre8-c-link-list {
  @include cre8-typography-body-default;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-top: calc(8px * -2);
  list-style: none;

  /**
  * Slotted link list item
  */
  ::slotted(cre8-link-list-item) {
    margin-top: calc(8px * 2);
  }
}

/**
 * A secondary link list
 * 1) Uses a more subtle treatment than the default link list
 * 2) TODO: Create a tier 2 token for secondary link colors
 */
.cre8-c-link-list--secondary {
  --cre8-link-list-item-active-text-color: var(--cre8-color-content-default); /* 2 */
  color: var(--cre8-color-content-subtle);
}

/**
 * Inverted link list
 * 1) Link list on a dark background
 */
.cre8-c-link-list--inverted {
  --cre8-link-list-link-color: var(--cre8-color-content-knockout);
}

/**
* Display link list
*/
.cre8-c-link-list--display {
  color: var(--cre8-color-content-strong);
}

/**
 * Condensed link list
 * 1) Removes spacing between link list items
 */
.cre8-c-link-list--condensed {
  margin-top: calc(8px * -1.25);

  /**
  * Slotted link list item within condensed link list
  */
  ::slotted(cre8-link-list-item) {
    margin-top: calc(8px * 1.25);
  }
}

/**
 * Small link list
 */
.cre8-c-link-list--sm {
  @include cre8-typography-body-small;
}

/**
 * Horizontal behavior
 * 1) Displays as a horizontal list
 */
.cre8-c-link-list--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  margin: calc(8px * -1) 0 0 calc(8px * -2);

  /**
  * Slotted link list item within horizontal link list
  */
  ::slotted(cre8-link-list-item) {
    margin-top: calc(8px * 1);
    margin-left: calc(8px * 2);
  }
}

/**
 * Responsive behavior
 * 1) Displays as a horizontal list on small screens and moves to a vertical
 */
.cre8-c-link-list--responsive {
  @media all and (max-width:$cre8-breakpoint-md) {
    flex-direction: row;
    flex-wrap: wrap;
    margin: calc(8px * -1) 0 0 calc(8px * -2);

    /**
    * Slotted link list item within responsive link list
    */
    ::slotted(cre8-link-list-item) {
      margin-top: calc(8px * 1);
      margin-left: calc(8px * 2);
    }
  }
}
`;
var g6 = Object.defineProperty, Ji = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && g6(e, t, i), i;
};
const qa = class qa extends M {
  render() {
    const e = this.componentClassNames("cre8-c-link-list", {
      "cre8-c-link-list--secondary": this.variant === "secondary",
      "cre8-c-link-list--display": this.variant === "display",
      "cre8-c-link-list--inverted": this.inverted === !0,
      "cre8-c-link-list--responsive": this.behavior === "responsive",
      "cre8-c-link-list--horizontal": this.behavior === "horizontal",
      "cre8-c-link-list--condensed": this.spacing === "condensed",
      "cre8-c-link-list--sm": this.size === "sm"
    });
    return f`
      <ul class="${e}">
        <slot></slot>
      </ul>
    `;
  }
};
qa.styles = [f6];
let St = qa;
Ji([
  u()
], St.prototype, "behavior");
Ji([
  u({ type: Boolean, reflect: !0 })
], St.prototype, "inverted");
Ji([
  u()
], St.prototype, "size");
Ji([
  u()
], St.prototype, "spacing");
Ji([
  u()
], St.prototype, "variant");
customElements.get("cre8-link-list") === void 0 && customElements.define("cre8-link-list", St);
const b6 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) An individual list item with a link inside
 */

/**
 * Link list link
 * 1) Set to inherit color so that the link list link. Maybe a TODO
 */
.cre8-c-link-list__item {
  display: flex;
  align-items: center;
}

/**
 * Link list link
 */
.cre8-c-link-list__link {
  display: flex;
  align-items: center;
  color: var(--cre8-link-list-link-color, var(--cre8-color-content-link));
  text-decoration: underline;

  &:hover,
  &:focus {
    color: var(--cre8-link-list-link-hover-color, var(--cre8-color-content-link-hover));
    text-decoration: none;
  }

  /**
  * Link list link within active link list item
  * 1) This custom property cascade is set at the link list level
  * 2) TODO: Discuss how we want to handle bold variants since mixins can't get passed down
  */
  .cre8-c-link-list__item.cre8-is-active & {
    color: var(--cre8-link-list-item-active-text-color);
    font-weight: var(--cre8-font-weight-bold); /* 2 */
  }
}

/**
 * Link list item after
 * 1) Container to place things like badges after an item
 */
.cre8-c-link-list__item-before {
  margin-right: calc(8px * 1);
}

/**
 * Link list item after
 * 1) Container to place things like badges after an item
 */
.cre8-c-link-list__item-after {
  margin-left: calc(8px * 1);
}

::slotted(cre8-icon-legacy) {
  --cre8-icon-height: #{calc(8px * 3)};
  --cre8-icon-width: #{calc(8px * 3)};
}
`;
var m6 = Object.defineProperty, Js = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && m6(e, t, i), i;
};
const Ua = class Ua extends M {
  render() {
    const e = this.componentClassNames("cre8-c-link-list__item", {
      "cre8-is-active": this.isActive === !0
    });
    return f`
      <li class="${e}">
        <a class="cre8-c-link-list__link" href="${$(this.href)}">
          ${this.slotNotEmpty("itemBefore") && f`
          <div class="cre8-c-link-list__item-before">
            <slot name="itemBefore"></slot>
          </div>`}
          <slot></slot>
        </a>
        ${this.slotNotEmpty("itemAfter") && f`
        <div class="cre8-c-link-list__item-after">
          <slot name="itemAfter"></slot>
        </div>`}
      </li>
    `;
  }
};
Ua.styles = [b6];
let Vr = Ua;
Js([
  u()
], Vr.prototype, "text");
Js([
  u({ type: Boolean, reflect: !0 })
], Vr.prototype, "isActive");
Js([
  u()
], Vr.prototype, "href");
customElements.get("cre8-link-list-item") === void 0 && customElements.define("cre8-link-list-item", Vr);
const v6 = k`@import '../../design-tokens/core/scss/theming/component';

// #LIST

/**
 * 1) Generic stacked list that allows for styling of borders in between items
 */
.cre8-c-list {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: calc(8px * 2);
}

/**
 * Slotted list item compponent
 * TODO: Add tier 2 variable that is used for light borders for cards, table rows, etc.
 */
::slotted(cre8-list-item) {
  display: block;
  padding-top: calc(8px * 2);
  padding-bottom: calc(8px * 2);
  border-bottom: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-subtle);

  /**
  * List item with bare list
  * 1) Remove the border between items
  */
  .cre8-c-list--bare & {
    border-bottom: 0; /* 1 */
  }

  /**
  * List item with condensed list
  * 1) Reduce padding between items compared to the default
  */
  .cre8-c-list--condensed & {
    padding-top: calc(8px * 1);
    padding-bottom: calc(8px * 1);
  }

  /**
  * List item with padded list
  * 1) Increase padding between items compared to the default
  */
  .cre8-c-list--padded & {
    padding-top: calc(8px * 4);
    padding-bottom: calc(8px * 4);
  }
}
`;
var y6 = Object.defineProperty, Fd = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && y6(e, t, i), i;
};
const Ya = class Ya extends M {
  render() {
    const e = this.componentClassNames("cre8-c-list", {
      "cre8-c-list--bare": this.variant === "bare",
      "cre8-c-list--padded": this.spacing === "padded",
      "cre8-c-list--condensed": this.spacing === "condensed"
    });
    return f`
      <ul class="${e}">
        <slot></slot>
      </ul>
    `;
  }
};
Ya.styles = [v6];
let Vi = Ya;
Fd([
  u()
], Vi.prototype, "variant");
Fd([
  u()
], Vi.prototype, "spacing");
customElements.get("cre8-list") === void 0 && customElements.define("cre8-list", Vi);
const C6 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) List item within the list component
 */
`, Xa = class Xa extends M {
  // Set the role before rendering for better accessibility
  // Because we're settting this role, we don't wrap the slot in an <li>
  connectedCallback() {
    this.setAttribute("role", "listitem"), super.connectedCallback();
  }
  render() {
    const e = this.componentClassNames("cre8-c-list__item", {});
    return f`
        <div class="${e}">
          <slot></slot>
        </div>
      `;
  }
};
Xa.styles = [C6];
let gs = Xa;
customElements.get("cre8-list-item") === void 0 && customElements.define("cre8-list-item", gs);
const x6 = k`@import '../../design-tokens/core/scss/theming/component';

// #LOGO

/**
 * 1) Brand's logo
 */
.cre8-c-logo {
  display: flex;
}
`;
var _6 = Object.defineProperty, w6 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && _6(e, t, i), i;
};
const Ka = class Ka extends M {
  render() {
    const e = this.componentClassNames("cre8-c-logo", {});
    return f`
      <a href="${this.href}" class="${e}">
       
      </a>
    `;
  }
};
Ka.styles = [x6];
let zo = Ka;
w6([
  u()
], zo.prototype, "href");
customElements.get("cre8-logo") === void 0 && customElements.define("cre8-logo", zo);
const k6 = k`@import '../../design-tokens/core/scss/theming/component';

// #MAIN

/**
 * 1) Container for the main content on the page between the header and footer
 * 2) Set to flex: 1 0 auto for a footer that gets pushed all the way to the bottom
 * for pages that don't have a lot of content
 */
:host {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto; /* 2 */
}

/**
 * Full height main container
 */
.cre8-c-main--full-height {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}
`;
var $6 = Object.defineProperty, M6 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && $6(e, t, i), i;
};
const Ga = class Ga extends M {
  render() {
    const e = this.componentClassNames("cre8-c-main", {
      "cre8-c-main--full-height": this.fullHeight === !0
    });
    return f`<main class=${e}><slot></slot></main>`;
  }
};
Ga.styles = [k6];
let Fo = Ga;
M6([
  u({ type: Boolean, reflect: !0 })
], Fo.prototype, "fullHeight");
customElements.get("cre8-main") === void 0 && customElements.define("cre8-main", Fo);
function _o(r, e, t, o = 20, i = 0) {
  let n = [];
  if (i >= o)
    return n;
  const s = (c) => {
    const l = c.assignedNodes().filter((d) => d.nodeType === 1);
    return l.length > 0 ? _o(l[0].parentElement, e, t, o, i + 1) : [];
  }, a = Array.from(r.children || []);
  for (const c of a)
    e(c) || (t(c) && n.push(c), c.shadowRoot != null ? n.push(..._o(c.shadowRoot, e, t, o, i + 1)) : c.tagName === "SLOT" ? n.push(...s(c)) : n.push(..._o(c, e, t, o, i + 1)));
  return n;
}
function Zd(r) {
  return r.hasAttribute("hidden") || r.hasAttribute("aria-hidden") && r.getAttribute("aria-hidden") !== "false" || r.style.display === "none" || r.style.opacity === "0" || r.style.visibility === "hidden" || r.style.visibility === "collapse";
}
function L6(r) {
  return r.hasAttribute("disabled") || r.hasAttribute("aria-disabled") && r.getAttribute("aria-disabled") !== "false";
}
function S6(r) {
  return r.getAttribute("tabindex") === "-1" || Zd(r) || L6(r) ? !1 : (
    // At this point we know that the element can have focus (eg. won't be -1) if the tabindex attribute exists
    r.hasAttribute("tabindex") || (r instanceof HTMLAnchorElement || r instanceof HTMLAreaElement) && r.hasAttribute("href") || r instanceof HTMLButtonElement || r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement || r instanceof HTMLSelectElement || r instanceof HTMLIFrameElement
  );
}
const Bn = /* @__PURE__ */ new Map();
function A6(r, e, t) {
  const o = Bn.get(t);
  o != null && window.clearTimeout(o), Bn.set(t, window.setTimeout(() => {
    r(), Bn.delete(t);
  }, e));
}
const jd = document.createElement("template");
jd.innerHTML = `
	<div id="start"></div>
	<div id="backup"></div>
	<slot></slot>
	<div id="end"></div>
`;
class T6 extends HTMLElement {
  /**
   * Attaches the shadow root.
   */
  constructor() {
    super(), this.debounceId = Math.random().toString(), this._focused = !1;
    const e = this.attachShadow({ mode: "open" });
    e.appendChild(jd.content.cloneNode(!0)), this.$backup = e.querySelector("#backup"), this.$start = e.querySelector("#start"), this.$end = e.querySelector("#end"), this.focusLastElement = this.focusLastElement.bind(this), this.focusFirstElement = this.focusFirstElement.bind(this), this.onFocusIn = this.onFocusIn.bind(this), this.onFocusOut = this.onFocusOut.bind(this);
  }
  // Whenever one of these attributes changes we need to render the template again.
  static get observedAttributes() {
    return [
      "inactive"
    ];
  }
  /**
   * Determines whether the focus trap is active or not.
   * @attr
   */
  get inactive() {
    return this.hasAttribute("inactive");
  }
  set inactive(e) {
    e ? this.setAttribute("inactive", "") : this.removeAttribute("inactive");
  }
  /**
   * Returns whether the element currently has focus.
   */
  get focused() {
    return this._focused;
  }
  /**
   * Hooks up the element.
   */
  connectedCallback() {
    this.$start.addEventListener("focus", this.focusLastElement), this.$end.addEventListener("focus", this.focusFirstElement), this.addEventListener("focusin", this.onFocusIn), this.addEventListener("focusout", this.onFocusOut), this.render();
  }
  /**
   * Tears down the element.
   */
  disconnectedCallback() {
    this.$start.removeEventListener("focus", this.focusLastElement), this.$end.removeEventListener("focus", this.focusFirstElement), this.removeEventListener("focusin", this.onFocusIn), this.removeEventListener("focusout", this.onFocusOut);
  }
  /**
   * When the attributes changes we need to re-render the template.
   */
  attributeChangedCallback() {
    this.render();
  }
  /**
   * Focuses the first focusable element in the focus trap.
   */
  focusFirstElement() {
    this.trapFocus();
  }
  /**
   * Focuses the last focusable element in the focus trap.
   */
  focusLastElement() {
    this.trapFocus(!0);
  }
  /**
   * Returns a list of the focusable children found within the element.
   */
  getFocusableElements() {
    return _o(this, Zd, S6);
  }
  /**
   * Focuses on either the last or first focusable element.
   * @param {boolean} trapToEnd
   */
  trapFocus(e) {
    if (this.inactive)
      return;
    let t = this.getFocusableElements();
    t.length > 0 ? (e ? t[t.length - 1].focus() : t[0].focus(), this.$backup.setAttribute("tabindex", "-1")) : (this.$backup.setAttribute("tabindex", "0"), this.$backup.focus());
  }
  /**
   * When the element gains focus this function is called.
   */
  onFocusIn() {
    this.updateFocused(!0);
  }
  /**
   * When the element looses its focus this function is called.
   */
  onFocusOut() {
    this.updateFocused(!1);
  }
  /**
   * Updates the focused property and updates the view.
   * The update is debounced because the focusin and focusout out
   * might fire multiple times in a row. We only want to render
   * the element once, therefore waiting until the focus is "stable".
   * @param value
   */
  updateFocused(e) {
    A6(() => {
      this.focused !== e && (this._focused = e, this.render());
    }, 0, this.debounceId);
  }
  /**
   * Updates the template.
   */
  render() {
    this.$start.setAttribute("tabindex", !this.focused || this.inactive ? "-1" : "0"), this.$end.setAttribute("tabindex", !this.focused || this.inactive ? "-1" : "0"), this.focused ? this.setAttribute("focused", "") : this.removeAttribute("focused");
  }
}
window.customElements.define("focus-trap", T6);
const P6 = k`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
 #MODAL
\*------------------------------------*/

:host {
  display: block;
}

/**
 * 1) Modal Composable Component
 */
.cre8-c-modal {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;

  display: none;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);

  z-index: 1000;
}

.cre8-c-modal.cre8-is-active {
  display: flex;
  visibility: visible;
  opacity: 1;
}

/**
 * Modal Focus Trap for Window (keeps focus in modal until closed)
 */
.cre8-c-modal__focus-trap {
  display: contents;
}

/**
 * Modal Window
 */
.cre8-c-modal__window {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: fixed;
  background: var(--cre8-color-bg-default);
  width: calc(8px * 68);
  max-width: 100%;
  border-radius: var(--cre8-border-radius-container);
  overflow: hidden;
  overflow-y: auto;

  /**
   * Modal Window for mobile user screen widths
   */
  @media all and (max-width:$cre8-breakpoint-md) {
    position: inherit;
    height: 100%;
    width: 100%;
  }

  &:focus-visible {
    @includefocus();
  }
}

/**
 * Modal Window Header
 */
.cre8-c-modal__header {
  display: flex;
  padding: calc(8px * 4) calc(8px * 6) calc(8px * 2);
  align-items: center;
  /**
   * Modal Header with Error state
   * 1) Icon fill prop is a custom property of cre8-icon-legacy that apply the color as a fill to the whole icon
   */
  .cre8-c-modal--error & {
    .cre8-modal-icon {
      fill: var(--cre8-color-content-error-icon); /* 1 */
    }
  }

  /**
   * Modal Header with Warning state
   * 1) Icon fill prop is a custom property of cre8-icon-legacy that apply the color as a fill to the whole icon
   */
  .cre8-c-modal--warning & {
    .cre8-modal-icon {
      fill: var(--cre8-color-content-warning-icon); /* 1 */
    }
  }

  /**
   * Modal Header with Success state
   * 1) Icon fill prop is a custom property of cre8-icon-legacy that apply the color as a fill to the whole icon
   */
  .cre8-c-modal--success & {
    .cre8-modal-icon {
      fill: var(--cre8-color-content-success-icon); /* 1 */
    }
  }

  /**
   * Modal Header with Info or Help State
   * 1) Icon fill prop is a custom property of cre8-icon-legacy that apply the color as a fill to the whole icon
   */
  .cre8-c-modal--info &,
  .cre8-c-modal--help & {
    .cre8-modal-icon {
      fill: var(--cre8-color-content-info-icon); /* 1 */
    }
  }
}

/**
 * Modal Heading
 */
.cre8-c-modal__header-inner {
  display: flex;
  align-items: center;
  gap: calc(8px * 2);

  cre8-icon {
    .cre8-modal-icon {
      height: calc(8px * 4);
      width: calc(8px * 4);
    }
  }
}

/**
 * Modal Window Body
 */
.cre8-c-modal__body {
  max-height: 240px; // Prevent modal from getting too big based on content
  overflow: auto; // Force scrolling based on long amounts of content
  padding: 0 calc(8px * 6);

  /**
   * Modal Window Body for mobile user screen widths
   */
  @media all and (max-width:$cre8-breakpoint-md) {
    height: 100%;
    max-height: max-content;
  }
}

/**
 * Modal Window Footer
 */
.cre8-c-modal__footer {
 padding: calc(8px * 3) calc(8px * 6) calc(100vh - 95dvh); // Ensure footer slot isn't cut off on certain devices
}

/**
 * Modal Window Close button
 */
.cre8-c-modal__close-button {
  margin-left: auto;
}
`;
var E6 = Object.defineProperty, It = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && E6(e, t, i), i;
};
const Ja = class Ja extends M {
  constructor() {
    super(...arguments), this.closeButtonText = "close", this.closeButtonIcon = "close", this.mapStatusToIconModal = (e) => {
      switch (e) {
        case "error":
          return f`<cre8-icon class="cre8-modal-icon" svg=${Nn} aria-hidden='true'></cre8-icon>`;
        case "success":
          return f`<cre8-icon class="cre8-modal-icon" svg=${Mr} aria-hidden='true'></cre8-icon>`;
        case "warning":
          return f`<cre8-icon class="cre8-modal-icon" svg=${nn} aria-hidden='true'></cre8-icon>`;
        case "help":
          return f`<cre8-icon class="cre8-modal-icon" svg=${H1} aria-hidden='true'></cre8-icon>`;
        case "info":
          return f`<cre8-icon class="cre8-modal-icon" svg=${Lr} aria-hidden='true'></cre8-icon>`;
        default:
          return null;
      }
    };
  }
  /**
   * Handle keydown
   * 1) Close the modal when escape is hit when the user is focused within the modal
   */
  handleKeydown(e) {
    e.code === "Escape" && !this.notDismissible && this.handleCloseModal();
  }
  /**
   * Handle on close
   * 1) On close, set the modal to not active and dispatch event telling the parent the modal was closed.
   */
  handleCloseModal() {
    this.isActive = !1, this.dispatch({
      eventName: "close-modal",
      detailObj: {
        isActive: this.isActive
      }
    });
  }
  /**
   * Handle "click outside"
   * 1) onClick of the area around the modal window, close the modal.
   */
  handleOnClickOutside(e) {
    const t = e.target;
    this.isActive && this._modalWindow && t.classList.contains("cre8-c-modal") && !this.notDismissible && this.handleCloseModal();
  }
  /**
   * Lifecycle method to focus on modal
   * 1) If there is a changed property, and this.isActive === true, then focus on the modal window.
   * 2) Disable the body from scrolling behind while the modal is open.
   */
  updated(e) {
    if (this.isActive === !0 && setTimeout(() => {
      this._modalWindow.focus();
    }, 200), e.has("isActive")) {
      const t = document.querySelector("body");
      this.isActive ? t.style.overflow = "hidden" : t.style.removeProperty("overflow");
    }
  }
  /**
   * Lifecycle method on removal from the DOM
   * Removed body overflow and handle close (isActive set to false)
   */
  disconnectedCallback() {
    this.isActive = !1, document.querySelector("body").style.removeProperty("overflow");
  }
  render() {
    const e = this.componentClassNames("cre8-c-modal", {
      "cre8-is-active": this.isActive,
      "cre8-c-modal--error": this.status === "error",
      "cre8-c-modal--warning": this.status === "warning",
      "cre8-c-modal--success": this.status === "success",
      "cre8-c-modal--info": this.status === "info",
      "cre8-c-modal--help": this.status === "help"
    });
    return f`
    <div class="${e}" @click="${this.handleOnClickOutside}" @keydown=${this.handleKeydown}>
    <focus-trap class="cre8-c-modal__focus-trap" ?inactive=${!this.isActive}>
        <div class="cre8-c-modal__window" role="dialog" aria-label=${this.ariaLabel} tabindex=${this.isActive ? 0 : -1}>
        <div class="cre8-c-modal__header">
            ${this.status ? f`<div class="cre8-c-modal__header-inner">
                ${this.mapStatusToIconModal(this.status)}
                <cre8-heading type="title-large" ?brandColor=${!0}>${this.utilityModalTitle}</cre8-heading>
                </div>` : f`<slot name="header"></slot>`}
        ${this.notDismissible ? "" : f`<cre8-button
                class="cre8-c-modal__close-button"
                variant="tertiary"
                text="${this.closeButtonText}"
                ?hideText=${!0}
                iconName=${this.closeButtonIcon}
                iconPosition="after"
                ?inverted=${!this.status}
                @click=${this.handleCloseModal}
                ></cre8-button>`}
        </div>
        <div class="cre8-c-modal__body">
            <slot></slot>
        </div>
        ${this.slotNotEmpty("footer") && f`<div class="cre8-c-modal__footer"><slot name="footer"></slot></div>`}
        </div>
    </focus-trap>
    </div>
`;
  }
};
Ja.styles = [P6];
let We = Ja;
It([
  oe(".cre8-c-modal__window")
], We.prototype, "_modalWindow");
It([
  u({ type: Boolean, reflect: !0 })
], We.prototype, "isActive");
It([
  u()
], We.prototype, "status");
It([
  u()
], We.prototype, "utilityModalTitle");
It([
  u({ type: Boolean, reflect: !0 })
], We.prototype, "notDismissible");
It([
  u()
], We.prototype, "closeButtonText");
It([
  u()
], We.prototype, "closeButtonIcon");
It([
  u()
], We.prototype, "ariaLabel");
customElements.get("cre8-modal") === void 0 && customElements.define("cre8-modal", We);
const D6 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7869 4.87827L8.51452 12.1506C8.44698 12.2182 8.36677 12.2719 8.27849 12.3085C8.1902 12.3451 8.09557 12.3639 8 12.3639C7.90443 12.3639 7.8098 12.3451 7.72151 12.3085C7.63323 12.2719 7.55302 12.2182 7.48548 12.1506L0.213121 4.87827C0.0766618 4.74181 0 4.55673 0 4.36375C0 4.17077 0.0766618 3.98569 0.213121 3.84923C0.34958 3.71277 0.534658 3.63611 0.72764 3.63611C0.920622 3.63611 1.1057 3.71277 1.24216 3.84923L8 10.608L14.7578 3.84923C14.8254 3.78166 14.9056 3.72806 14.9939 3.6915C15.0822 3.65493 15.1768 3.63611 15.2724 3.63611C15.3679 3.63611 15.4625 3.65493 15.5508 3.6915C15.6391 3.72806 15.7193 3.78166 15.7869 3.84923C15.8544 3.9168 15.908 3.99701 15.9446 4.08529C15.9812 4.17357 16 4.26819 16 4.36375C16 4.4593 15.9812 4.55392 15.9446 4.6422C15.908 4.73049 15.8544 4.8107 15.7869 4.87827Z"/>
</svg>
`, O6 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8969 5.97385L8.87 8L10.8969 10.0262C10.9541 10.0833 10.9995 10.1512 11.0304 10.2259C11.0613 10.3006 11.0773 10.3807 11.0773 10.4615C11.0773 10.5424 11.0613 10.6225 11.0304 10.6972C10.9995 10.7719 10.9541 10.8397 10.8969 10.8969C10.8397 10.9541 10.7719 10.9994 10.6972 11.0304C10.6225 11.0613 10.5424 11.0773 10.4615 11.0773C10.3807 11.0773 10.3006 11.0613 10.2259 11.0304C10.1512 10.9994 10.0833 10.9541 10.0262 10.8969L8 8.87L5.97385 10.8969C5.91667 10.9541 5.8488 10.9994 5.77409 11.0304C5.69939 11.0613 5.61932 11.0773 5.53846 11.0773C5.45761 11.0773 5.37754 11.0613 5.30283 11.0304C5.22813 10.9994 5.16025 10.9541 5.10308 10.8969C5.0459 10.8397 5.00055 10.7719 4.96961 10.6972C4.93866 10.6225 4.92274 10.5424 4.92274 10.4615C4.92274 10.3807 4.93866 10.3006 4.96961 10.2259C5.00055 10.1512 5.0459 10.0833 5.10308 10.0262L7.13 8L5.10308 5.97385C4.98761 5.85837 4.92274 5.70176 4.92274 5.53846C4.92274 5.37516 4.98761 5.21855 5.10308 5.10308C5.21855 4.9876 5.37516 4.92273 5.53846 4.92273C5.70176 4.92273 5.85838 4.9876 5.97385 5.10308L8 7.13L10.0262 5.10308C10.0833 5.0459 10.1512 5.00055 10.2259 4.9696C10.3006 4.93866 10.3807 4.92273 10.4615 4.92273C10.5424 4.92273 10.6225 4.93866 10.6972 4.9696C10.7719 5.00055 10.8397 5.0459 10.8969 5.10308C10.9541 5.16025 10.9995 5.22813 11.0304 5.30283C11.0613 5.37753 11.0773 5.4576 11.0773 5.53846C11.0773 5.61932 11.0613 5.69939 11.0304 5.77409C10.9995 5.84879 10.9541 5.91667 10.8969 5.97385ZM16 8C16 9.58225 15.5308 11.129 14.6518 12.4446C13.7727 13.7602 12.5233 14.7855 11.0615 15.391C9.59966 15.9965 7.99113 16.155 6.43928 15.8463C4.88743 15.5376 3.46197 14.7757 2.34315 13.6569C1.22433 12.538 0.462403 11.1126 0.153721 9.56072C-0.15496 8.00887 0.00346628 6.40034 0.608967 4.93853C1.21447 3.47672 2.23985 2.22729 3.55544 1.34824C4.87103 0.469192 6.41775 0 8 0C10.121 0.00223986 12.1546 0.845814 13.6544 2.34562C15.1542 3.84542 15.9978 5.87895 16 8ZM14.7692 8C14.7692 6.66117 14.3722 5.35241 13.6284 4.23922C12.8846 3.12602 11.8274 2.25839 10.5905 1.74605C9.35356 1.2337 7.99249 1.09965 6.67939 1.36084C5.36629 1.62203 4.16013 2.26674 3.21343 3.21343C2.26674 4.16012 1.62203 5.36629 1.36084 6.67939C1.09965 7.99249 1.2337 9.35356 1.74605 10.5905C2.2584 11.8274 3.12603 12.8846 4.23922 13.6284C5.35241 14.3722 6.66117 14.7692 8 14.7692C9.79469 14.7672 11.5153 14.0534 12.7843 12.7843C14.0534 11.5153 14.7672 9.79468 14.7692 8Z"/>
</svg>
`, H6 = k`/**
 * Border-Box http:/paulirish.com/2012/box-sizing-border-box-ftw/
 */
*,
::slotted(*),
*:before,
*:after {
  box-sizing: border-box;
}

:root {
  --size-base-unit: 0.5rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir=rtl] {
  --rtlTranslateX: 50%;
  /* 1 */
  --rtlGradientToRight: 270deg;
  /* 2 */
  --rtlRotate45Inverse: -45deg;
  /* 3 */
}

/**
 * Visible focus outline for elements on a light background
 */
/**
 * Visible focus outline for elements with an error status
 */
/**
 * Visible focus outline for elements on a dark background
 */
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
/**
 * Visually hidden from display
 */
/*
=======
Animations
=======
*/
:host {
  --cre8-z-index-1: 1;
  --cre8-z-index-50: 50;
  --cre8-z-index-100: 100;
  --cre8-z-index-200: 200;
  --cre8-z-index-1030: 1030;
  --cre8-anim-fade-quick: 0.35s;
  --cre8-anim-ease: ease;
}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}
@keyframes slideIn {
  100% {
    transform: translateX(0);
  }
}
@keyframes slideInFwd {
  100% {
    width: 272px;
    height: 272px;
  }
}
@keyframes slideOutRight {
  100% {
    width: 272px;
    height: 272px;
  }
}
@keyframes slideUp {
  100% {
    transform: translateY(0);
  }
}
@media (width >= 481px) {
  @keyframes slideInFwd {
    100% {
      width: 417px;
      height: 417px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 417px;
      height: 417px;
    }
  }
}
@media (width >= 48rem) {
  @keyframes slideInFwd {
    100% {
      width: 330px;
      height: 330px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 330px;
      height: 330px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 60rem) {
  @keyframes slideInFwd {
    100% {
      width: 460px;
      height: 460px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 460px;
      height: 460px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 75rem) {
  @keyframes slideInFwd {
    100% {
      width: 592px;
      height: 591px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 87.5rem) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 120px));
    }
  }
}
@media (width >= 2200px) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 592px));
    }
  }
}
span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 600ms linear;
  background-color: var(--ripple-bg-color);
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 1;
  }
}
:root {
  --size-base-unit: 0.5rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir=rtl] {
  --rtlTranslateX: 50%;
  /* 1 */
  --rtlGradientToRight: 270deg;
  /* 2 */
  --rtlRotate45Inverse: -45deg;
  /* 3 */
}

/**
 * Visible focus outline for elements on a light background
 */
/**
 * Visible focus outline for elements with an error status
 */
/**
 * Visible focus outline for elements on a dark background
 */
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
/**
 * Visually hidden from display
 */
:host {
  display: block;
}

.cre8-c-multi-select {
  position: relative;
}

/**
 * Label
 */
.cre8-c-multi-select__label {
  font-family: var(--cre8-typography-label-small-font-family);
  font-size: var(--cre8-typography-label-small-font-size);
  font-weight: var(--cre8-typography-label-small-font-weight);
  line-height: var(--cre8-typography-label-small-line-height);
  -webkit-text-decoration: var(--cre8-typography-label-small-text-decoration);
          text-decoration: var(--cre8-typography-label-small-text-decoration);
  text-transform: var(--cre8-typography-label-small-text-transform);
  display: block;
  margin-bottom: 8px;
}

/**
 * Body
 * 1) The div that contains the input and icons
 */
.cre8-c-multi-select__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-family: var(--cre8-typography-body-default-font-family);
  font-size: var(--cre8-typography-body-default-font-size);
  font-weight: var(--cre8-typography-body-default-font-weight);
  line-height: var(--cre8-typography-body-default-line-height);
  -webkit-text-decoration: var(--cre8-typography-body-default-text-decoration);
          text-decoration: var(--cre8-typography-body-default-text-decoration);
  text-transform: var(--cre8-typography-body-default-text-transform);
  outline: var(--cre8-border-width-focus) solid transparent;
  outline-offset: 2px;
  -webkit-appearance: none;
  width: 100%;
  border-width: var(--cre8-border-width-default);
  border-style: solid;
  border-color: var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  padding: 12px 8px;
  color: var(--cre8-color-content-default);
  background-color: var(--cre8-color-bg-default);
  transition: outline-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), border-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), background-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), color var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  /**
   * Hover, focus, active, and focus-visible styles for default input elements
   */
  /**
   * Disabled styles for default input elements
   */
  /**
   * Placeholder styles for default input elements
   */
  /**
   * Error state for default input elements
   */
  /**
   * Success state for default input elements
   */
  padding: var(--cre8-spacing-8);
  padding-inline-end: 44px;
  min-width: 240px;
  cursor: pointer;
  min-height: 48px;
  height: -moz-fit-content;
  height: fit-content;
}
.cre8-c-multi-select__body:hover:not(:disabled), .cre8-c-multi-select__body:focus:not(:disabled), .cre8-c-multi-select__body:active:not(:disabled), .cre8-c-multi-select__body:focus-visible {
  outline: var(--cre8-border-width-focus) solid var(--cre8-color-border-active-outline);
  outline-offset: 2px;
  /**
   * Error state
   */
  /**
   * Success state
   */
}
.cre8-is-error .cre8-c-multi-select__body:hover:not(:disabled), .cre8-is-error .cre8-c-multi-select__body:focus:not(:disabled), .cre8-is-error .cre8-c-multi-select__body:active:not(:disabled), .cre8-is-error .cre8-c-multi-select__body:focus-visible {
  outline-color: var(--cre8-color-border-error);
}
.cre8-is-success .cre8-c-multi-select__body:hover:not(:disabled), .cre8-is-success .cre8-c-multi-select__body:focus:not(:disabled), .cre8-is-success .cre8-c-multi-select__body:active:not(:disabled), .cre8-is-success .cre8-c-multi-select__body:focus-visible {
  outline-color: var(--cre8-color-border-success);
}
.cre8-c-multi-select__body:disabled {
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  color: var(--cre8-color-content-disabled);
  cursor: not-allowed;
  /**
   * Disabled text colors
   */
}
.cre8-c-multi-select__body:disabled::-moz-placeholder {
  color: var(--cre8-color-content-disabled);
}
.cre8-c-multi-select__body:disabled::placeholder {
  color: var(--cre8-color-content-disabled);
}
.cre8-c-multi-select__body::-moz-placeholder {
  color: var(--cre8-color-content-subtle);
}
.cre8-c-multi-select__body::placeholder {
  color: var(--cre8-color-content-subtle);
}
.cre8-is-error .cre8-c-multi-select__body {
  border-color: var(--cre8-color-border-error);
}
.cre8-is-success .cre8-c-multi-select__body {
  border-color: var(--cre8-color-border-success);
}
.cre8-is-disabled .cre8-c-multi-select__body {
  box-shadow: none;
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  cursor: not-allowed;
  outline: none;
}
.cre8-is-disabled .cre8-c-multi-select__body:hover, .cre8-is-disabled .cre8-c-multi-select__body:focus, .cre8-is-disabled .cre8-c-multi-select__body:active, .cre8-is-disabled .cre8-c-multi-select__body:focus-visible {
  outline: none;
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  color: var(--cre8-color-content-disabled);
}
.cre8-is-disabled .cre8-c-multi-select__body .cre8-c-multi-select__content {
  border-color: var(--cre8-color-border-disabled);
}

.cre8-c-multi-select__content {
  display: flex;
  min-height: 30px;
  width: 100%;
  border-right: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  padding-right: 44px;
}

.cre8-c-multi-select__tag-wrapper {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  gap: 4px;
}

.cre8-c-multi-select__icons-wrapper {
  display: flex;
  justify-content: end;
  margin-right: -36px;
  margin-left: -48px;
  gap: 24px;
  min-width: 96px;
}
.cre8-c-multi-select__icons-wrapper button {
  background-color: inherit;
  border: none;
  padding: none;
}
.cre8-is-disabled .cre8-c-multi-select__icons-wrapper button {
  cursor: not-allowed;
}

.cre8-c-multi-select--no-clear-icon .cre8-c-multi-select__clear_icon {
  display: none;
}

/**
 * Select Icon
 * 1) The icons within the body container positioned absolutely over the input
 */
cre8-icon {
  display: flex;
  pointer-events: none;
  color: var(--cre8-color-button-tertiary-content);
}
.cre8-is-disabled cre8-icon {
  color: var(--cre8-color-border-disabled);
}

.cre8-c-multi-select__dropdown {
  background-color: var(--cre8-color-bg-default);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  box-shadow: var(--cre8-shadow-default);
  border-radius: var(--cre8-border-radius-default);
  flex-direction: column;
  left: 0;
  min-width: 100%;
  position: absolute;
  top: 100%;
  white-space: nowrap;
  margin-top: var(--cre8-spacing-4);
  margin-left: 0;
  padding: var(--cre8-spacing-8);
}
.cre8-c-multi-select__dropdown ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.cre8-c-multi-select__dropdown li {
  font-family: var(--cre8-typography-body-default-font-family);
  font-size: var(--cre8-typography-body-default-font-size);
  font-weight: var(--cre8-typography-body-default-font-weight);
  line-height: var(--cre8-typography-body-default-line-height);
  -webkit-text-decoration: var(--cre8-typography-body-default-text-decoration);
          text-decoration: var(--cre8-typography-body-default-text-decoration);
  text-transform: var(--cre8-typography-body-default-text-transform);
  background-color: var(--cre8-color-bg-default);
  border: var(--cre8-border-width-focus) var(--cre8-border-style-default) var(--cre8-color-border-transparent);
  border-radius: var(--cre8-border-radius-default);
  color: var(--cre8-color-content-default);
  width: 100%;
  cursor: pointer;
  margin: var(--cre8-spacing-0);
  padding: var(--cre8-spacing-8) var(--cre8-spacing-8);
  text-align: left;
}
.cre8-c-multi-select__dropdown li:active, .cre8-c-multi-select__dropdown li:hover, .cre8-c-multi-select__dropdown li:focus {
  background-color: var(--cre8-color-bg-brand-hover);
  color: var(--cre8-color-content-default);
  outline: var(--cre8-border-width-none);
  border: var(--cre8-border-width-focus) var(--cre8-border-style-default) var(--cre8-color-border-active-outline);
}

/**
 * Select field notes
 */
.cre8-c-multi-select__field-note,
.cre8-c-multi-select__field-note-success,
.cre8-c-multi-select__field-note-error {
  flex-basis: 100%;
}
  /* sourceMappingURL=multi-select.module.css.map */
`, I6 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * Remove Tags are buttons with text accompanied by a Close icon.
 */
.cre8-c-remove-tag {
    @include cre8-typography-label-small;
    display: flex;
    align-items: center;
    align-content: center;
    appearance: none;
    white-space: nowrap;
    padding-left: var(--cre8-spacing-16);
    padding-right: var(--cre8-spacing-16);
    padding-top: var(--cre8-spacing-4);
    padding-bottom: var(--cre8-spacing-4);
    gap: var(--cre8-spacing-8);
    border-width: var(--cre8-border-width-default);
    border-style: var(--cre8-border-style-default);
    cursor: pointer;

    &:focus-visible {
        @include focus;
    }
    /**
    * Neutral remove tag
    */
    &.cre8-c-remove-tag--neutral {
        background-color: var(--cre8-color-bg-default);
        color: var(--cre8-color-content-default);
        border-color: var(--cre8-color-border-strong);
    
        &:hover, &:focus {
            background-color: var(--cre8-color-bg-default-hover);
        }
    }
  
    /**
    * Branded remove tag
    */
    &.cre8-c-remove-tag--branded {
        background-color: var(--cre8-color-bg-brand);
        color: var(--cre8-color-content-default);
        border-color: var(--cre8-color-border-transparent);
    
        &:hover, &:focus {
          background-color: var(--cre8-color-bg-brand-hover);
        }
    }
  
    /**
    * Neutral Hybrid remove tag
    */
    &.cre8-c-remove-tag--neutral-hybrid {
        background-color: var(--cre8-color-bg-default);
        color: var(--cre8-color-content-brand);
        border-color: var(--cre8-color-border-strong);
    
        &:hover, &:focus {
          background-color: var(--cre8-color-bg-default-hover);
        }
    }

    /**
    * Round remove tag
    */
    &.cre8-c-remove-tag--round {
        border-radius: var(--cre8-border-radius-round);
    }
    
    /**
    * Square remove tag
    */
    &.cre8-c-remove-tag--square {
        border-radius: var(--cre8-border-radius-small);
    }

    &:disabled {
        background-color: var(--cre8-color-bg-disabled);
        color: var(--cre8-color-content-disabled);
        border-color: var(--cre8-color-border-disabled);
        cursor: not-allowed;

        &:hover, &:focus {
            background-color: var(--cre8-color-bg-disabled);
        }
    }
}

.cre8-c-remove-tag-item__icon {
    align-items: center;
    width: calc(8px * 2);
    height: calc(8px * 2);
}`;
var B6 = Object.defineProperty, bn = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && B6(e, t, i), i;
};
const Qa = class Qa extends M {
  constructor() {
    super(...arguments), this.color = "neutral", this.shape = "round";
  }
  /**
   * Dispatches an event when the tag is clicked
   */
  _handleRemoveTagClicked() {
    const e = new CustomEvent("removeTagClicked", {
      detail: { message: "Remove Tag clicked." },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  render() {
    const e = Wi("cre8-c-remove-tag", {
      "cre8-c-remove-tag--neutral": this.color === "neutral",
      "cre8-c-remove-tag--branded": this.color === "branded",
      "cre8-c-remove-tag--neutral-hybrid": this.color === "neutral-hybrid",
      "cre8-c-remove-tag--round": this.shape === "round",
      "cre8-c-remove-tag--square": this.shape === "square"
    });
    return f` <button
      class="${e}"
      @click="${this._handleRemoveTagClicked}"
      ?disabled=${this.disabled}
    >
      <span>${this.text}</span>
      <div class="cre8-c-remove-tag-item__icon">
        <cre8-icon
          width="16"
          height="16"
          svg="${Ss}"
          aria-label="remove"
        ></cre8-icon>
      </div>
    </button>`;
  }
};
Qa.styles = [I6];
let or = Qa;
bn([
  u({ type: String })
], or.prototype, "text");
bn([
  u({ type: String })
], or.prototype, "color");
bn([
  u({ type: String })
], or.prototype, "shape");
bn([
  u({ type: Boolean })
], or.prototype, "disabled");
customElements.get("cre8-remove-tag") === void 0 && customElements.define("cre8-remove-tag", or);
var V6 = Object.defineProperty, Se = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && V6(e, t, i), i;
};
const ec = class ec extends M {
  /* Life Cycle Methods */
  constructor() {
    super(), this.items = [], this.selectedTagItems = [], this.dropdownOpen = !1, this._handleOnClick = this._handleOnClick.bind(this);
  }
  firstUpdated() {
    this.preselectedItems && this.setPreselectedItemsinDropdown(), this.selectedTagItems = this.preselectedItems || [], this._initializeAria();
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("click", this._handleOnClick, !1);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("click", this._handleOnClick, !1);
  }
  /* HTML Content functions */
  _renderDropdownItems() {
    return this.items.map(
      // Note: Keyboard can already navigate to the checkbox
      // eslint-disable-next-line lit-a11y/click-events-have-key-events
      (e, t) => f`<li
        @click="${(o) => this._handleListItemClick(o, t)}"
      >
        <cre8-checkbox-field-item
          .checked="${!!this.selectedTagItems.includes(e)}"
          label=${e}
          id=${t}
          @input="${(o) => this._handleDropdownItemInput(e, o)}"
        >
        </cre8-checkbox-field-item>
      </li>`
    );
  }
  _renderSelectedTags() {
    return this.selectedTagItems.length ? this.selectedTagItems.map(
      (e) => f`<li>
        <cre8-remove-tag
          text="${e}"
          color="neutral"
          shape="square"
          ?disabled="${this.disabled}"
          @removeTagClicked="${() => this._handleRemoveTagClick(e)}"
        ></cre8-remove-tag>
      </li>`
    ) : T;
  }
  /* Helper Functions */
  setPreselectedItemsinDropdown() {
    this.preselectedItems.forEach((e) => {
      this.selectedTagItems = this.selectedTagItems.concat(e);
    });
  }
  clearAllTags() {
    this.disabled || (this.dropdownOpen && this.selectedTagItems.forEach((e) => {
      this.shadowRoot?.querySelector(`cre8-checkbox-field-item[label="${e}"]`).shadowRoot?.querySelector("input").click();
    }), this.selectedTagItems = [], this.emitSelectedItems());
  }
  emitSelectedItems() {
    const e = new CustomEvent("selectedItemsChange", {
      detail: {
        selectedItems: this.selectedTagItems
      },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  toggleDropDown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  /* Click Event Functions */
  _handleOnClick(e) {
    if (!this.shadowRoot?.host)
      throw Error(
        "Could not determine navigation context during click handler"
      );
    const t = e.composedPath().includes(this.shadowRoot.host), o = this.renderRoot.querySelector(
      ".cre8-c-multi-select__label"
    ), i = this.renderRoot.querySelector(
      ".cre8-c-multi-select__icons-wrapper"
    ), n = this.shadowRoot?.querySelector(
      ".cre8-c-multi-select__tag-wrapper"
    ), s = this.shadowRoot?.querySelector(
      ".cre8-c-multi-select__dropdown"
    );
    t ? !e.composedPath().includes(o) && !e.composedPath().includes(n) && !e.composedPath().includes(i) && !e.composedPath().includes(s) && !this.disabled && this.toggleDropDown() : this.dropdownOpen = !1;
  }
  _handleListItemClick(e, t) {
    e.target !== this.shadowRoot?.querySelector(`cre8-checkbox-field-item[id="${t}"]`) && this.shadowRoot?.querySelector(`cre8-checkbox-field-item[id="${t}"]`).shadowRoot?.querySelector("input").click();
  }
  _handleDropdownItemInput(e, t) {
    t.target.checked ? this.selectedTagItems = this.selectedTagItems.concat(e) : this.selectedTagItems = this.selectedTagItems.filter((i) => i !== e), this.emitSelectedItems();
  }
  async _handleRemoveTagClick(e) {
    this.disabled || (this.selectedTagItems = this.selectedTagItems.filter((t) => t !== e), this.shadowRoot?.querySelector(`cre8-checkbox-field-item[label="${e}"]`).shadowRoot?.querySelector("input").click(), await this.updateComplete, this.emitSelectedItems());
  }
  dropdownArrowClick() {
    this.disabled || this.toggleDropDown();
  }
  _handleButtonToListKeydown(e) {
    e.code === "Escape" && (e.preventDefault(), this.toggleDropDown());
  }
  _handleListKeydown(e) {
    e.code === "Escape" && (e.preventDefault(), this.toggleDropDown());
  }
  _initializeAria() {
    this.fieldId = this.fieldId || ee(), (this.fieldNote || this.slotNotEmpty("fieldNote")) && (this.ariaDescribedBy = this.ariaDescribedBy || ee()), (this.successNote || this.errorNote) && (this.validationAriaDescribedBy = this.validationAriaDescribedBy || ee());
  }
  /**
   * Aria describedby string based on field notes and error/success notes
   * 1) If both validationAriaDescribedBy (error/success note) and field note exists,
   * render both in the input's `aria-describedby` attribute
   * 2) Otherwise, if only validationAriaDescribedBy exists, then render only that as
   * the `aria-describedby` attribute (input without field note initially, but then error/success is added).
   * 3) Otherwise, render only the `ariaDescribedBy` property (field note only)
   */
  _fieldNoteAria() {
    return this.validationAriaDescribedBy && this.ariaDescribedBy ? `${this.ariaDescribedBy} ${this.validationAriaDescribedBy}` : this.validationAriaDescribedBy && !this.ariaDescribedBy ? this.validationAriaDescribedBy : this.ariaDescribedBy;
  }
  /**
   * Render the success or error field notes
   * 1. If there is a successNote, then return the field note with the success message and state.
   * 2. If there is a errorNote, then return the field note with the error message and state.
   */
  _renderSuccessErrorFieldNote() {
    return this.successNote ? f` <cre8-field-note
        ?isSuccess=${this.isSuccess}
        id=${this.validationAriaDescribedBy}
        class="cre8-c-multi-select__field-note-success"
        iconName="success"
      >
        ${this.successNote}
      </cre8-field-note>` : this.errorNote ? f` <cre8-field-note
        ?isError=${this.isError}
        id=${this.validationAriaDescribedBy}
        class="cre8-c-multi-select__field-note-error"
        iconName="error-alt"
      >
        ${this.errorNote}
      </cre8-field-note>` : null;
  }
  render() {
    const e = this.componentClassNames(
      "cre8-c-multi-select",
      {
        "cre8-is-error": this.isError,
        "cre8-is-success": this.isSuccess,
        "cre8-is-disabled": this.disabled,
        "cre8-c-multi-select--no-clear-icon": !this.selectedTagItems.length
      }
    );
    return f`
      <div class="${e}">
        <label class="cre8-c-multi-select__label" id="${this.fieldId}"
          >${this.label}</label
        >
        <div class="cre8-c-multi-select__body" ?disabled=${this.disabled}>
          <div
            class="cre8-c-multi-select__content"
            aria-describedby="${$(this._fieldNoteAria())}"
          >
            <ul
              class="cre8-c-multi-select__tag-wrapper"
              aria-label="selected items"
            >
              ${this._renderSelectedTags()}
            </ul>
          </div>
          <div class="cre8-c-multi-select__icons-wrapper">
            <cre8-button
              ?hideText=${!0}
              svg="${O6}"
              text="Clear All"
              variant="tertiary"
              ?disabled="${this.disabled}"
              class="cre8-c-multi-select__clear_icon"
              @click="${this.clearAllTags}"
            >
            </cre8-button>
            <cre8-button
              ?hideText=${!0}
              svg="${D6}"
              variant="tertiary"
              ?disabled="${this.disabled}"
              class="cre8-c-multi-select__down_icon"
              @click="${this.dropdownArrowClick}"
              @keydown="${this._handleButtonToListKeydown}"
              text="Open Dropdown"
              aria-expanded="${this.dropdownOpen}"
              aria-labelledby="${this.fieldId}"
            >
            </cre8-button>
          </div>
        </div>
        ${this.dropdownOpen ? f`
            <fieldset class="cre8-c-multi-select__dropdown" aria-describedby="${this.fieldId}">
              <ul
                aria-label="available items"
                @keydown="${this._handleListKeydown}"
              >
                ${this._renderDropdownItems()}
              </ul>
            </fieldset>` : T}
      </div>
      ${this.fieldNote || this.slotNotEmpty("fieldNote") ? f`<cre8-field-note
            id=${this.ariaDescribedBy}
            class="cre8-c-multi-select__field-note"
          >
            <slot name="fieldNote">${this.fieldNote}</slot>
          </cre8-field-note>` : T}
      ${this._renderSuccessErrorFieldNote()}
    `;
  }
};
ec.styles = [H6];
let ue = ec;
Se([
  u({ type: Array })
], ue.prototype, "items");
Se([
  R()
], ue.prototype, "selectedTagItems");
Se([
  u({ type: Array })
], ue.prototype, "preselectedItems");
Se([
  R()
], ue.prototype, "dropdownOpen");
Se([
  u()
], ue.prototype, "label");
Se([
  u()
], ue.prototype, "fieldId");
Se([
  u()
], ue.prototype, "fieldNote");
Se([
  u()
], ue.prototype, "ariaDescribedBy");
Se([
  u()
], ue.prototype, "validationAriaDescribedBy");
Se([
  u({ type: Boolean, reflect: !0 })
], ue.prototype, "disabled");
Se([
  u({ type: Boolean, reflect: !0 })
], ue.prototype, "isError");
Se([
  u()
], ue.prototype, "errorNote");
Se([
  u({ type: Boolean, reflect: !0 })
], ue.prototype, "isSuccess");
Se([
  u()
], ue.prototype, "successNote");
customElements.get("cre8-multi-select") === void 0 && customElements.define("cre8-multi-select", ue);
const N6 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Wrapper around contents that get placed into a toggleable
 * menu on smaller screens (usually primary nav and maybe other contents)
 */
:host {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: 100vh;
  background: var(--cre8-nav-container-background, var(--cre8-color-header-submenu-bg-default));
  overflow: auto;

  @media all and (min-width:$cre8-breakpoint-lg) {
    position: static;
    width: auto;
    height: auto;
    background: none;
  }
}

/**
 * Actual nav container component
 */
.cre8-c-nav-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media all and (min-width:$cre8-breakpoint-lg) {
    flex-direction: row;
  }
}
`, tc = class tc extends M {
  render() {
    const e = this.componentClassNames("cre8-c-nav-container", {});
    return f`
      <div class="${e}">
        <slot></slot>
      </div>
    `;
  }
};
tc.styles = [N6];
let bs = tc;
customElements.get("cre8-nav-container") === void 0 && customElements.define("cre8-nav-container", bs);
const R6 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Headline of a page with an h1 heading and optional description
 */
.cre8-c-page-header {
  margin-bottom: calc(8px * 4);
}

/**
 * Page header title
 */
.cre8-c-page-header__title {
  display: inline;
  margin: 0;
  @include cre8-typography-display-default();
}

/**
 * Page header title after
 * 1) Container placed after page header title if something like a badge needs to be placed there
 */
.cre8-c-page-header__title-after {
  display: inline-block;
  position: relative;
  bottom: calc(8px * 1.25);
  margin-left: calc(8px * 2);
}

/**
 * Page header description
 */
.cre8-c-page-header__description {
  @include cre8-typography-body-default;
}
`;
var z6 = Object.defineProperty, F6 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && z6(e, t, i), i;
};
const rc = class rc extends M {
  constructor() {
    super(...arguments), this.heading = "Page header title";
  }
  render() {
    const e = this.componentClassNames("cre8-c-page-header", {});
    return f`
      <div class="${e}">
        <h1 class="cre8-c-page-header__title">
          ${this.heading}
          ${this.slotNotEmpty("titCre8ter") && f`
          <div class="cre8-c-page-header__title-after">
            <slot name="titCre8ter"></slot>
          </div>`}
        </h1>
        <div class="cre8-c-page-header__description">
          <slot></slot>
        </div>
      </div>
    `;
  }
};
rc.styles = [R6];
let Zo = rc;
F6([
  u({ type: String })
], Zo.prototype, "heading");
customElements.get("cre8-page-header") === void 0 && customElements.define("cre8-page-header", Zo);
const Z6 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1508 14.7578C12.2184 14.8254 12.272 14.9056 12.3085 14.9939C12.3451 15.0822 12.3639 15.1768 12.3639 15.2724C12.3639 15.3679 12.3451 15.4625 12.3085 15.5508C12.272 15.6391 12.2184 15.7193 12.1508 15.7869C12.0832 15.8544 12.003 15.908 11.9147 15.9446C11.8265 15.9812 11.7318 16 11.6363 16C11.5407 16 11.4461 15.9812 11.3578 15.9446C11.2695 15.908 11.1893 15.8544 11.1218 15.7869L3.8494 8.51452C3.78178 8.44698 3.72814 8.36677 3.69154 8.27849C3.65495 8.1902 3.63611 8.09557 3.63611 8C3.63611 7.90443 3.65495 7.8098 3.69154 7.72151C3.72814 7.63323 3.78178 7.55302 3.8494 7.48548L11.1218 0.213121C11.2582 0.0766618 11.4433 -3.80414e-09 11.6363 0C11.8293 3.80414e-09 12.0143 0.0766618 12.1508 0.213121C12.2873 0.34958 12.3639 0.534658 12.3639 0.72764C12.3639 0.920622 12.2873 1.1057 12.1508 1.24216L5.39205 8L12.1508 14.7578Z"/>
</svg>
`, j6 = `<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.7869 14.7577C15.8544 14.8253 15.908 14.9055 15.9446 14.9937C15.9812 15.082 16 15.1766 16 15.2722C16 15.3678 15.9812 15.4624 15.9446 15.5507C15.908 15.6389 15.8544 15.7191 15.7869 15.7867C15.7193 15.8543 15.6391 15.9079 15.5508 15.9444C15.4625 15.981 15.3679 15.9998 15.2724 15.9998C15.1768 15.9998 15.0822 15.981 14.9939 15.9444C14.9056 15.9079 14.8254 15.8543 14.7579 15.7867L7.48557 8.51443C7.41795 8.44689 7.36432 8.36669 7.32772 8.2784C7.29112 8.19012 7.27228 8.09549 7.27228 7.99992C7.27228 7.90435 7.29112 7.80972 7.32772 7.72143C7.36432 7.63315 7.41795 7.55294 7.48557 7.4854L14.7579 0.213119C14.8943 0.076661 15.0794 -3.8041e-09 15.2724 0C15.4653 3.8041e-09 15.6504 0.076661 15.7869 0.213119C15.9233 0.349576 16 0.534653 16 0.727633C16 0.920613 15.9233 1.10569 15.7869 1.24215L9.0282 7.99992L15.7869 14.7577ZM1.75592 7.99992L8.5146 1.24215C8.65106 1.10569 8.72772 0.920613 8.72772 0.727633C8.72772 0.534653 8.65106 0.349576 8.5146 0.213119C8.37814 0.076661 8.19306 1.43782e-09 8.00008 0C7.8071 -1.43781e-09 7.62203 0.076661 7.48557 0.213119L0.213286 7.4854C0.145671 7.55294 0.0920317 7.63315 0.0554344 7.72143C0.0188371 7.80972 0 7.90435 0 7.99992C0 8.09549 0.0188371 8.19012 0.0554344 8.2784C0.0920317 8.36669 0.145671 8.44689 0.213286 8.51443L7.48557 15.7867C7.55314 15.8543 7.63335 15.9079 7.72163 15.9444C7.80991 15.981 7.90453 15.9998 8.00008 15.9998C8.09564 15.9998 8.19026 15.981 8.27854 15.9444C8.36682 15.9079 8.44703 15.8543 8.5146 15.7867C8.58217 15.7191 8.63576 15.6389 8.67233 15.5507C8.7089 15.4624 8.72772 15.3678 8.72772 15.2722C8.72772 15.1766 8.7089 15.082 8.67233 14.9937C8.63576 14.9055 8.58217 14.8253 8.5146 14.7577L1.75592 7.99992Z"/>
</svg>
`, _1 = {
  md: 768,
  lg: 960
}, w1 = (r = "768") => !window.matchMedia(`(min-width: ${r}px)`).matches, W6 = k`@import '../../../design-tokens/core/scss/theming/component';

// #PAGE-COUNTER
:host{
  display: inline-flex;
}

/**
 * 1)
 */
 .cre8-c-pagination__text{
  @include cre8-typography-label-small();
  padding: calc(8px * 1);
 }
`;
var q6 = Object.defineProperty, Qi = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && q6(e, t, i), i;
};
const ic = class ic extends M {
  constructor() {
    super(...arguments), this.currentPage = 1, this.display = "default";
  }
  // Properties below are for future 'range' variant for table pagination
  // private get _currentResults() {
  //     return this.pageSize * (this.currentPage - 1);
  // }
  // private get _firstInRange() {
  //     return this._currentResults + 1;
  // }
  // private get _lastInRange() {
  //     const last = this._firstInRange + (this.pageSize - 1);
  //     return last > this.totalResults ? this.totalResults : last;
  // }
  get _totalPages() {
    return Math.ceil(this.totalResults / this.pageSize);
  }
  render() {
    const e = this.componentClassNames("cre8-c-page-counter", {});
    return f`
      <div class='${e}'>
        <span class="cre8-c-pagination__text" aria-live="polite">
          ${!this.display || this.display === "default" ? f`${this.currentPage}` : f`${this.currentPage} of ${this._totalPages}`}
        </span>
      </div>
    `;
  }
};
ic.styles = [W6];
let At = ic;
Qi([
  u({ type: Boolean, reflect: !0 })
], At.prototype, "rangeVariant");
Qi([
  u()
], At.prototype, "currentPage");
Qi([
  u()
], At.prototype, "totalResults");
Qi([
  u()
], At.prototype, "pageSize");
Qi([
  u()
], At.prototype, "display");
customElements.get("cre8-page-counter") === void 0 && customElements.define("cre8-page-counter", At);
const U6 = k`
@import '../../design-tokens/core/scss/theming/component';

:host {
  display: var(--pagination-display, inline-flex);
  justify-content: var(--pagination-justify-content, center);
  align-items: var(--pagination-align-items, center);
  --cre8-button-width: 2rem;
  --cre8-button-height: 2rem;
  --cre8-button-min-width: 2rem;
  --cre8-button-min-height: 2rem;
  --cre8-button-padding-horizontal-small: 0px;
  --cre8-button-padding-vertical-small: 0px;

  }

  *, ::slotted(*), *:before, *:after {
    box-sizing: border-box;
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    --cre8-button-margin-right: var(--cre8-spacing-2);
    --cre8-button-margin-left: var(--cre8-spacing-2);
    margin-right: var(--cre8-button-margin-right);
    margin-left: var(--cre8-button-margin-left);

    align-items: center;
}

  [aria-current='true'], #current{
    --cre8-color-button-tertiary-bg: var( --cre8-color-bg-strong);
    --cre8-color-button-tertiary-content: var(--cre8-color-content-knockout);
    --cre8-color-button-tertiary-border: var(--cre8-color-border-transparent);
   &:hover, &:active{
      border-radius: var(--cre8-border-radius-button);
   --cre8-color-button-tertiary-bg-hover: var(--cre8-color-bg-strong);
    --cre8-color-button-tertiary-content-hover: var(--cre8-color-content-knockout);

   &:focus, &:focus-visible, &:focus-within{
      border-radius: var(--cre8-border-radius-button);

      --cre8-color-button-tertiary-bg-active: var(--cre8-color-bg-strong);
      --cre8-color-button-tertiary-content-active: var(--cre8-color-content-knockout);
      @includefocus();
    }
  }
  }

.cre8-c-pagination--compact, .cre8-c-pagination--icon-only, .cre8-c-pagination--range {
  --cre8-button-width: 3rem;
  --cre8-button-height: 3rem;
  --cre8-button-min-width: 3rem;
  --cre8-button-min-height: 3rem;
}

.cre8-c-pagionation__icon {
  fill: var(--cre8-color-button-tertiary-content);
}
.cre8-c-pagination__icon:has(cre8-button:disabled){
  color: var(--cre8-color-button-tertiary-content-disabled);
}

.cre8-c-pagination [aria-disabled="true"]{
  fill: var(--cre8-color-content-default);
  --cre8-color-button-tertiary-content: var(--cre8-color-content-default);
}
`;
var Y6 = Object.defineProperty, X6 = Object.getOwnPropertyDescriptor, it = (r, e, t, o) => {
  for (var i = o > 1 ? void 0 : o ? X6(e, t) : e, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = (o ? s(e, t, i) : s(i)) || i);
  return o && i && Y6(e, t, i), i;
};
const Qo = class Qo extends M {
  constructor() {
    super(...arguments), this._currentPage = 99, this._pageSize = 10, this.visiblePages = 5, this._handleKeydown = (e, t) => (o) => {
      o.code === "Enter" && this._goToPage(e, t);
    }, this._goToPage = (e, t) => () => {
      const o = this._currentPage;
      let i;
      this.buttons.forEach((n) => {
        const s = new F();
        return s.hideText && s.text === t && (i = s, i.shadowRoot.querySelector(".cre8-c-button").blur()), null;
      }), this._currentPage = e, this.currentPage = this._currentPage, this.requestUpdate("currentPage", o), this.dispatchEvent(new CustomEvent(
        "pagination.click",
        { detail: { buttonName: t ?? this.currentPage.toString(), value: this.currentPage } }
      ));
    };
  }
  get pageSize() {
    return this._pageSize;
  }
  set pageSize(e) {
    const t = this._pageSize;
    this._pageSize = e, this.requestUpdate("pageSize", t);
  }
  get currentPage() {
    return this._currentPage;
  }
  set currentPage(e) {
    const t = this._currentPage;
    this._currentPage = e, this.requestUpdate("currentPage", t);
  }
  connectedCallBack() {
    super.connectedCallback();
  }
  get maxVisiblePages() {
    const e = {
      md: 5
    };
    return w1(_1.lg.toString()) ? w1(_1.md.toString()) ? 0 : Math.min(e.md, this.visiblePages) : this.visiblePages;
  }
  get totalPages() {
    return Math.ceil(this.totalResults / this.pageSize);
  }
  get hasNoPreviousPage() {
    return this._currentPage <= 1;
  }
  get hasNoNextPage() {
    return this._currentPage >= this.totalPages;
  }
  _onHandleResize() {
    this.requestUpdate();
  }
  handleResize() {
    this._onHandleResize.bind(this);
  }
  // get range of pages to display [3, 4, 5], [2, 3, 4, 5]
  get pageRange() {
    const e = Math.floor(this.maxVisiblePages / 2);
    let t = this.currentPage - e;
    t = Math.min(t, this.totalPages - this.maxVisiblePages + 1), t = Math.max(t, 1);
    const o = Math.min(t + this.maxVisiblePages - 1, this.totalPages);
    return [...Array(this.totalPages)].map((i, n) => n + 1).slice(t - 1, o);
  }
  async firstUpdated() {
    if (await this.updateComplete, this._pageSize !== this.pageSize) {
      const e = this._pageSize;
      this._pageSize = this.pageSize, this.requestUpdate("pageSize", e);
    }
    if (this.windowWidth = window.innerWidth, window.addEventListener("resize", () => {
      if (this.windowWidth !== window.innerWidth) {
        const e = this.windowWidth;
        this.windowWidth = window.innerWidth, this.handleResize(), this.requestUpdate("isResponsive", e);
      }
    }), this._currentPage !== this.currentPage) {
      const e = this._currentPage;
      this._currentPage = this.currentPage, this.requestUpdate("currentPage", e);
    }
  }
  disconnectedCallback() {
    window.removeEventListener("resize", this.handleResize), super.disconnectedCallback();
  }
  displayTypes() {
    return f`<cre8-page-counter
              currentPage=${this.currentPage}
              style="display:${this.display === "compact" ? "flex" : "none"};"
              totalResults=${this.totalResults}
              pageSize=${this._pageSize}
              display=${this.display}>
              </cre8-page-counter>`;
  }
  goToPage(e, t) {
    return this._goToPage(e, t).bind(this);
  }
  handleKeydown(e, t) {
    return this._handleKeydown(e, t);
  }
  render() {
    const e = this.componentClassNames("cre8-c-pagination", {
      "cre8-c-pagination--compact": this.display !== void 0 && this.display === "compact",
      "cre8-c-pagination--icon-only": this.display !== void 0 && this.display === "icon-only"
    });
    return f`<nav
      aria-label="pagination"
      class=${e}>
        <slot></slot>
        ${this.hideLastAndFirstButtons ? T : f` <cre8-button
              variant="tertiary"
              size="sm"
              text=""
              hideText
              part="icon"
              aria-disabled="${$(this.hasNoPreviousPage)}"
              ?disabled=${this.hasNoPreviousPage}
              @click=${this.goToPage(1, "First Page")}
              @keydown=${this.handleKeydown(1, "First Page")}

            >
        <span slot="before">
          <cre8-icon
            className="cre8-c-pagination__icon"
            aria-label="First Page"
            svg=${j6}
            size="24">
          </cre8-icon>
        </span>
            </cre8-button>`}
        <cre8-button
          variant="tertiary"
          size="sm"
          hideText
          text=""
          part="icon"
          aria-disabled="${$(this.hasNoPreviousPage)}"
          ?disabled=${this.hasNoPreviousPage}
          @click=${this.goToPage(this._currentPage - 1, "Previous Page")}
          @keydown=${this.handleKeydown(this.currentPage - 1, "Previous Page")}

        >
          <span slot="before">
            <cre8-icon
            className="cre8-c-pagination__icon"
            aria-label="Previous Page"
            slot="before"
            svg=${Z6}
            size="24"

            >
            </cre8-icon>
          </span>
        </cre8-button>

      ${this.displayTypes()}
        ${!this.display || this.display === "default" ? f`${this.pageRange[this.pageRange.length - 1] > 1 && this.pageRange[0] !== 1 ? f`<cre8-button hideText iconName="ellipsis" variant="tertiary" size="sm" aria-disabled="true" inert></cre8-button>` : T}
            ${this.pageRange.map((t) => t === this.currentPage ? f`<cre8-button variant="tertiary" tab-index="-1" text="${t}"  class="icon-only" size="sm" id="current"></cre8-button>` : f`<cre8-button
                      variant="tertiary"
                      size="sm"
                      text="${t}"
                      class="icon-only"
                      id="${t}"
                      @click=${this.goToPage(t, t.toString())}
                      @keydown=${this.handleKeydown(t, t.toString())}>
                      </cre8-button>`)}
            ${this.pageRange[this.pageRange.length - 1] < this.totalPages ? f`<cre8-button
                      hideText
                      iconName="ellipsis"
                      text="ellipsis"
                      variant="tertiary"
                      size="sm"
                      aria-disabled="true"
                      inert>
                    </cre8-button>` : T}` : T}
        <cre8-button
          variant="tertiary"
          size="sm"
          part="icon"
          hideText
          text=""
          aria-disabled="${$(this.hasNoNextPage)}"
          ?disabled=${this.hasNoNextPage}
          @click=${this.goToPage(this.currentPage + 1, "Next Page")}
          @keydown=${this.handleKeydown(this.currentPage + 1, "Next Page")}

        >
          <span slot="before">
            <cre8-icon
            aria-label="Next Page"
            className="cre8-c-pagination__icon"
            slot="before" svg=${N1}
            size="24">
            </cre8-icon>
          </span>
        </cre8-button>

        ${this.hideLastAndFirstButtons ? T : f` <cre8-button
              variant="tertiary"
              size="sm"
              hideText
              text=""
              part="icon"
              aria-disabled="${$(this.hasNoNextPage)}"
              ?disabled=${this.hasNoNextPage}
              @click=${this.goToPage(this.totalPages, "Last Page")}
              @keydown=${this.handleKeydown(this.totalPages, "Last Page")}

            >
              <span slot="before">
                <cre8-icon
                aria-label="Last Page"
                className="cre8-c-pagination__icon"
                slot="before"
                svg=${Rn}
                size="24"
                >
                </cre8-icon>
              </span>
            </cre8-button>`}

      </nav>`;
  }
};
Qo.styles = [U6], Qo.elementDefinitions = {
  "cre8-button": F
};
let Pe = Qo;
it([
  R()
], Pe.prototype, "_currentPage", 2);
it([
  u({ reflect: !0, type: Number })
], Pe.prototype, "totalResults", 2);
it([
  u({ type: Number, reflect: !0 })
], Pe.prototype, "pageSize", 1);
it([
  R()
], Pe.prototype, "_pageSize", 2);
it([
  u({ reflect: !0, type: Number })
], Pe.prototype, "visiblePages", 2);
it([
  u({ type: String, reflect: !0 })
], Pe.prototype, "display", 2);
it([
  R()
], Pe.prototype, "windowWidth", 2);
it([
  D1("cre8-button")
], Pe.prototype, "buttons", 2);
it([
  u({ type: Boolean, reflect: !0 })
], Pe.prototype, "hideLastAndFirstButtons", 2);
it([
  u({ reflect: !0, type: Number })
], Pe.prototype, "currentPage", 1);
customElements.get("cre8-pagination") === void 0 && customElements.define("cre8-pagination", Pe);
const K6 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Progress Meter
 * 2) Progress bar fill color custom property
 */

 :host {
  display: block;
 }

.cre8-c-progress-meter__progress {
  --cre8-progress-meter-background: var(--cre8-color-content-brand); /* 2 */
  width: 100%;
  height: var(--cre8-progress-meter-height, calc(8px * 1));
  background: var(--cre8-color-bg-transparent);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  border-color: var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-round);

  .cre8-c-progress-meter--knockout & {
    --cre8-progress-meter-background: var(--cre8-color-content-brand-knockout);
    border-color: var(--cre8-color-border-default);
  }
  
  /**
  * Progress bar background styling error
  */
  .cre8-c-progress-meter--error & {
    --cre8-progress-meter-background: var(--cre8-color-bg-error-strong);
  }

  /**
  * Progress bar background styling warning
  */
  .cre8-c-progress-meter--warning & {
    --cre8-progress-meter-background: var(--cre8-color-bg-warning-strong);
  }

  /**
  * Progress bar background styling success
  */
  .cre8-c-progress-meter--success & {
    --cre8-progress-meter-background: var(--cre8-color-bg-success-strong);
  }


  /**
  * Progress bar background styling indeterminate
  */
  .cre8-c-progress-meter--indeterminate & {
    --cre8-progress-meter-background: repeating-linear-gradient(
      -45deg,
      #009bdf,
      #009bdf 10px,
      #00628e 10px,
      #00628e 20px
    ); // TODO Possibly tokenize these
  }
}

/**
 * Progress bar sr-only escriptor
 */
.cre8-c-progress-meter__sr-only {
  @include visuallyHidden;
}


/**
 * Progress bar background styling
 */
progress {
  color: var(--cre8-progress-meter-background);
  appearance: none;
}

/**
 * Progress bar background styling for Mozilla
 */
progress::-moz-progress-bar {
  background: var(--cre8-progress-meter-background);
  border-radius: var(--cre8-border-radius-round);
}

/**
 * Progress bar background styling for Safari and Chrome
 */
progress::-webkit-progress-bar {
  background: var(--cre8-color-bg-subtle);
  border-radius: var(--cre8-border-radius-round);
}
progress::-webkit-progress-value {
  background: var(--cre8-progress-meter-background);
  border-radius: var(--cre8-border-radius-round);
}

/**
 * Hide Label except for screen readers
 */
.cre8-c-progress-meter__label {
  @include visuallyHidden;
}
`;
var G6 = Object.defineProperty, ur = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && G6(e, t, i), i;
};
const oc = class oc extends M {
  constructor() {
    super(...arguments), this.max = 100;
  }
  connectedCallback() {
    super.connectedCallback(), this.fieldId = this.fieldId || ee();
  }
  render() {
    const e = this.componentClassNames("cre8-c-progress-meter", {
      "cre8-c-progress-meter--error": this.status === "error",
      "cre8-c-progress-meter--warning": this.status === "warning",
      "cre8-c-progress-meter--success": this.status === "success",
      "cre8-c-progress-meter--knockout": this.knockout
    });
    return f`<div class="${e}">
      <label class="cre8-c-progress-meter__label" for="${this.fieldId}">${this.label}</label>
      <span class="cre8-c-progress-meter__sr-only">${Math.round(this.value / this.max * 100)}%</span>
      <progress
        class="cre8-c-progress-meter__progress"
        aria-hidden="true"
        id=${this.fieldId}
        name=${this.name}
        max="${this.max}"
        value="${this.value}"
      >
        ${Math.round(this.value / this.max * 100)}%
      </progress>
    </div>`;
  }
};
oc.styles = [K6];
let tt = oc;
ur([
  u()
], tt.prototype, "status");
ur([
  u({ type: Boolean, reflect: !0 })
], tt.prototype, "knockout");
ur([
  u()
], tt.prototype, "max");
ur([
  u()
], tt.prototype, "value");
ur([
  u()
], tt.prototype, "fieldId");
ur([
  u()
], tt.prototype, "name");
ur([
  u()
], tt.prototype, "label");
customElements.get("cre8-progress-meter") === void 0 && customElements.define("cre8-progress-meter", tt);
const J6 = k`@import '../../design-tokens/core/scss/theming/component';

// #PERCENT-BAR


/**
 * Percent Bar Controls
 */
.cre8-c-percent-bar__controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: calc(8px * 4.5);
}

.cre8-c-percent-bar__button {
  size: var(--cre8-icon-size-default);
}

.cre8-c-percent-bar__text-passage {
  color: var(--cre8-color-content-default);
  @include cre8-typography-body-small();
}

.cre8-c-percent-bar__p {
  width: fit-content;
}
`;
var Q6 = Object.defineProperty, Qs = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Q6(e, t, i), i;
};
const nc = class nc extends M {
  _handleClick(e) {
    this.dispatchEvent(new Event("leftActionButtonClick", e));
  }
  fractionAsPercent() {
    return Math.round(this.value / this.max * 100);
  }
  isFirstStep() {
    return this.value > 1;
  }
  render() {
    const e = this.componentClassNames("cre8-c-percent-bar", {});
    return f`
      <div class="${e}">
          <div class="cre8-c-percent-bar__controls">
              <div lass="cre8-c-percent-bar__left-controls">
                ${this.isFirstStep() ? f` <cre8-button
                      ?hideText=${!0}
                      svg="${dt}"
                      iconRotateDegree="-90"
                      variant="tertiary"
                      ?disabled=${this.disableActionLeft}
                      @click="${this._handleClick}"
                    >
                    </cre8-button>` : T}
              </div>
              <div class="cre8-c-percent-bar__right-controls">
                <cre8-text-passage
                  size="small"
                  class="cre8-c-percent-bar__text-passage"
                >
                  ${this.fractionAsPercent()}%
                </cre8-text-passage>
              </div>
            </div>
        <cre8-progress-meter
          value="${this.value}"
          max="${this.max}"
        ></cre8-progress-meter>
      </div>
    `;
  }
};
nc.styles = [J6];
let Nr = nc;
Qs([
  u()
], Nr.prototype, "value");
Qs([
  u()
], Nr.prototype, "max");
Qs([
  u({ type: Boolean, reflect: !0 })
], Nr.prototype, "disableActionLeft");
customElements.get("cre8-percent-bar") === void 0 && customElements.define("cre8-percent-bar", Nr);
const e7 = k`@import '../../design-tokens/core/scss/theming/component';
/*------------------------------------*\
 #POPOVER
\*------------------------------------*/

:host {
  display: inline-flex;
}

/** 
 * Popover
 * The main container that holds the trigger and panel
 */
.cre8-c-popover {
  position: relative;
  display: table;
}

/** 
 * Popover panel
 * The container for the popover panel heading, content, and footer
 * 1. Allows the popover to appear over elements, but underneath the global header.
 */
.cre8-c-popover__panel {
  @include cre8-typography-body-default();
  opacity: 0;
  visibility: hidden;
  position: absolute;
  inset-block-start: calc(100% + #{calc(8px * 1.5)});
  inset-block-end: auto;
  inset-inline-start: 50%;
  inset-inline-end: auto;
  transform: translateX(var(--rtlTranslateX, -50%));
  display: flex;
  flex-direction: column;
  gap: calc(8px * 1);
  width: calc(8px * 32);
  z-index: 400; /* 1 */
  background-color: var(--cre8-color-bg-default);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  box-shadow: var(--cre8-shadow-default);
  padding: calc(8px * 2);

  /**
   * Focus state for popover panel
   */
  &:focus-visible {
    @include focus;
  }
 
  /**
   * Default Popover heading 
   */
  .cre8-c-popover__heading {
    @include cre8-typography-label-small();
  }

  /**
   * Active state for popover panel
   */
  .cre8-is-active:not(.cre8-is-dynamic) &,
  .cre8-is-active.cre8-is-dynamic-active & {
    opacity: 1;
    visibility: visible;
  }

  /**
   * Popover panel positioned to the top of the trigger
   */
  .cre8-c-popover--top & {
    inset-block-start: auto;
    inset-block-end: calc(100% + #{calc(8px * 1.5)});
    inset-inline-start: 50%;
    inset-inline-end: auto;
    transform: translateX(var(--rtlTranslateX, -50%));
  }

  /**
   * Popover panel positioned to the left of the trigger
   */
  .cre8-c-popover--left & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: auto;
    inset-inline-end: calc(100% + #{calc(8px * 1.5)});
    transform: translateY(-50%);
  }

  /**
   * Popover panel positioned to the right of the trigger
   */
  .cre8-c-popover--right & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: calc(100% + #{calc(8px * 1.5)});
    inset-inline-end: auto;
    transform: translateY(-50%);
  }
}

/**
 * Popover panel arrow
 */
.cre8-c-popover__panel::before {
  content: '';
  display: block;
  width: calc(8px * 1.5);
  height: calc(8px * 1.5);
  position: absolute;
  margin: auto;
  background-color: var(--cre8-color-bg-default);
  border-block-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-inline-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  inset-block-start: calc((var(--cre8-border-width-default) + #{calc(8px * 0.75)}) * -1);
  inset-inline-start: 50%;
  transform: translateX(var(--rtlTranslateX, -50%)) rotate(45deg);

  /**
   * Moves the popover panel arrow to the top of the panel
   */
  .cre8-c-popover--top & {
    inset-block-start: auto;
    inset-block-end: calc((var(--cre8-border-width-default) + #{calc(8px * 0.75)}) * -1);
    border-block-start: none;
    border-inline-start: none;
    border-block-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  }

  /**
   * Moves the popover panel arrow to the right side of the panel
   */
  .cre8-c-popover--left & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: auto;
    inset-inline-end: calc((var(--cre8-border-width-default) + #{calc(8px * 0.75)}) * -1);
    border-block-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-start: none;
    border-block-end: none;
    border-inline-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    transform: translateY(-50%) rotate(var(--rtlRotate45Inverse, 45deg));
  }

  /**
   * Moves the popover panel arrow to the left side of the panel
   */
  .cre8-c-popover--right & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: calc((var(--cre8-border-width-default) + #{calc(8px * 0.75)}) * -1);
    inset-inline-end: auto;
    border-block-start: none;
    border-inline-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-block-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-end: none;
    transform: translateY(-50%) rotate(var(--rtlRotate45Inverse, 45deg));
  }
}

/**
 * Popover footer
 * 1) The footer container in the panel
 */
.cre8-c-popover__footer {
  display: flex;
  gap: calc(8px * 2);
}
`;
var t7 = Object.defineProperty, ot = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && t7(e, t, i), i;
};
const sc = class sc extends M {
  constructor() {
    super(...arguments), this.handleOnClickOutside = (e) => {
      if (!this.isActive)
        return;
      if (!this.shadowRoot?.host)
        throw Error("Could not determine panel context during click handler");
      const t = e.composedPath().includes(this.shadowRoot.host);
      e.target === document.querySelector("html") && e.clientX >= document.documentElement.offsetWidth || this.isActive && !t && this._toggleActive();
    }, this.removeActiveOnScroll = () => {
      if (this.isActive && !this.isVisibleOnScroll) {
        const e = this._Cre8PopoverPanel.getBoundingClientRect();
        this._Cre8Popover.clientHeight + e.height + e.top < window.innerHeight && this._toggleActive();
      }
    }, this.removeActive = () => {
      this.isActive && this._toggleActive();
    };
  }
  /**
   * Query the document direction value
   * <br/><br/> _*This property is dynamically set_
   */
  get isRTL() {
    return document.dir === "rtl";
  }
  /**
   * Connected Callback Lifecycle
   * 1. Add window resize event listener
   * 2. Add window scroll event listener
   * 3. Add window orientation change event listener
   * 4. Add mousedown event listener
   */
  connectedCallback() {
    super.connectedCallback(), globalThis.window.addEventListener("resize", this.removeActive), globalThis.window.addEventListener("scroll", this.removeActiveOnScroll), globalThis.window.addEventListener("orientationchange", this.removeActive), globalThis.document.addEventListener("mousedown", this.handleOnClickOutside, !1);
  }
  /**
   * Disconnected Callback Lifecycle
   * 1. Remove window resize event listener
   * 2. Remove window scroll event listener
   * 3. Remove window orientation change event listener
   * 4. Remove mousedown event listener
   */
  disconnectedCallback() {
    super.disconnectedCallback(), globalThis.window.removeEventListener("resize", this.removeActive), globalThis.window.removeEventListener("scroll", this.removeActiveOnScroll), globalThis.window.removeEventListener("orientationchange", this.removeActive), globalThis.document.removeEventListener("mousedown", this.handleOnClickOutside, !1);
  }
  /**
   * First Updated Lifecycle
   * 1. Set attribute since aria expanded can't be passed down through the slot
   */
  firstUpdated() {
    this.addAria();
  }
  /**
   * Add aria attributes on the trigger button
   * 1. Select the element within the trigger slot
   * 2. Set aria-expanded on the popover trigger to the active state if provided. Otherwise, set to false.
   * 3 Set the type to button.
   */
  addAria() {
    let e;
    this._Cre8PopoverTrigger[0].tagName === "cre8-BUTTON" ? (e = this._Cre8PopoverTrigger[0], e.buttonAriaExpanded = this.isActive ? this.isActive : !1) : (e = this._Cre8PopoverTrigger[0], e.setAttribute("aria-expanded", `${this.isActive ? this.isActive : !1}`), e.setAttribute("type", "button"));
  }
  /**
   * Handle all dynamic placement
   */
  dynamicPosition() {
    if (this.isDynamic && this._Cre8PopoverPanel) {
      const e = document.querySelector("body").getBoundingClientRect(), t = this._Cre8PopoverPanel.getBoundingClientRect();
      t.left < 0 && (this.position = this.isRTL ? "left" : "right"), t.right >= e.width && (this.position = this.isRTL ? "right" : "left"), t.top < 0 && t.left > 0 && t.right < e.width && (this.position = null), t.bottom >= window.innerHeight && t.left >= 0 && t.right <= e.width && (this.position = "top");
    }
  }
  /**
   * Set Popover Active State
   * 1. Toggle the active state between true and false
   * 2. Set attribute since aria expanded can't be passed down through the slot
   * 3. If the active state is toggled to false, close the panel and return focus to the dropdown trigger.
   * This accounts for both design system buttons and native HTML buttons
   */
  _toggleActive() {
    this.isActive = !this.isActive, this.addAria(), this.isActive ? (requestAnimationFrame(() => {
      this.dynamicPosition();
    }), this.dispatchEvent(
      new CustomEvent("open", { detail: { isActive: this.isActive }, bubbles: !0, composed: !0 })
    )) : this.dispatchEvent(
      new CustomEvent("close", { detail: { isActive: this.isActive }, bubbles: !0, composed: !0 })
    ), setTimeout(() => {
      this.isActive ? this.isActiveDynamic = !0 : this.isActiveDynamic = !1;
    }, 2);
  }
  /**
   * Handle Keydown
   * 1. If the panel is open and escape is keyed, close the popover panel and return focus to the trigger button
   * 2. If the panel is opened, tab away closes the popover panel
   * 3. The panel can be opened and closed by Enter or Space keys.
   */
  _handleKeydown(e) {
    e.key === "Escape" && this.isActive === !0 ? this._toggleActive() : e.key === "Tab" && this._handleTabNavigation(e);
  }
  _handleTabNavigation(e) {
    this.isActive && this._navigateInsidePopover(e);
  }
  _navigateInsidePopover(e) {
    const t = this._getFocusableElements();
    if (t.length === 0) {
      this._closePopoverAndFocusTrigger(e);
      return;
    }
    const o = t[t.length - 1];
    document.activeElement === o && (this._closePopoverAndFocusTrigger(e), e.preventDefault());
  }
  _getFocusableElements() {
    return [...Array.from(this._Cre8PopoverFooter)];
  }
  _closePopoverAndFocusTrigger(e) {
    this._toggleActive(), e.preventDefault();
  }
  render() {
    const e = this.componentClassNames("cre8-c-popover", {
      "cre8-c-popover--top": this.position === "top",
      "cre8-c-popover--left": this.position === "left",
      "cre8-c-popover--right": this.position === "right",
      "cre8-is-active": this.isActive,
      "cre8-is-dynamic": this.isDynamic,
      "cre8-is-dynamic-active": this.isActiveDynamic
    });
    return f`
      <div class="${e}">
        ${this.slotNotEmpty("trigger") && f` <slot name="trigger" @keydown=${this._handleKeydown} @click=${this._toggleActive}></slot> `}
        ${this.isActive ? f`
              <div tabindex="0" class="cre8-c-popover__panel" @keydown=${this._handleKeydown}>
                ${(this.slotNotEmpty("header") || this.heading) && f`
                  <div class="cre8-c-popover__header">
                    ${this.heading ? f`<div class="cre8-c-popover__heading">${this.heading}</div>` : f`<slot name="header"></slot>`}
                  </div>
                `}
                <slot></slot>
                ${this.slotNotEmpty("footer") && f`
                  <div class="cre8-c-popover__footer">
                    <slot name="footer"></slot>
                  </div>
                `}
              </div>
            ` : T}
      </div>
    `;
  }
};
sc.styles = [e7];
let Ee = sc;
ot([
  u()
], Ee.prototype, "heading");
ot([
  u()
], Ee.prototype, "position");
ot([
  u({ type: Boolean, reflect: !0 })
], Ee.prototype, "isVisibleOnScroll");
ot([
  u({ type: Boolean, reflect: !0 })
], Ee.prototype, "isDynamic");
ot([
  u({ type: Boolean, reflect: !0 })
], Ee.prototype, "isActiveDynamic");
ot([
  u({ type: Boolean, reflect: !0 })
], Ee.prototype, "isActive");
ot([
  oe(".cre8-c-popover")
], Ee.prototype, "_Cre8Popover");
ot([
  oe(".cre8-c-popover__panel")
], Ee.prototype, "_Cre8PopoverPanel");
ot([
  on({ slot: "trigger" })
], Ee.prototype, "_Cre8PopoverTrigger");
ot([
  on({ slot: "footer" })
], Ee.prototype, "_Cre8PopoverFooter");
customElements.get("cre8-popover") === void 0 && customElements.define("cre8-popover", Ee);
const r7 = k`@import '../../design-tokens/core/scss/theming/component';

// #PRIMARY NAV

/**
 * Inverted primary nav
 */
.cre8-c-primary-nav--inverted {
  --cre8-primary-nav-link-color: var(--cre8-color-content-knockout);
}

/**
 * Primary nav list
 * 1) Stack on small screens within the toggleable menu but place side by side on large screens
 */
.cre8-c-primary-nav__list {
  display: flex;
  flex-direction: column; /* 1 */
  margin: 0;
  padding: 0;
  list-style: none;

  /**
  * Primary nav list within side by side variant
  * 1) Always keep items side by side
  */
  .cre8-c-primary-nav--side-by-side & {
    flex-direction: row; /* 1 */
  }

  @media all and (min-width:$cre8-breakpoint-lg) {
    flex-direction: row; /* 1 */
  }
}
`;
var i7 = Object.defineProperty, ea = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && i7(e, t, i), i;
};
const ac = class ac extends M {
  constructor() {
    super(...arguments), this.navAriaLabel = "main";
  }
  render() {
    const e = this.componentClassNames("cre8-c-primary-nav", {
      "cre8-c-primary-nav--side-by-side": this.behavior === "side-by-side",
      "cre8-c-primary-nav--inverted": this.inverted === !0
    });
    return f`
      <nav aria-label="${this.navAriaLabel}" class="${e}">
        <ul class="cre8-c-primary-nav__list">
          <slot></slot>
        </ul>
      </nav>
    `;
  }
};
ac.styles = [r7];
let Rr = ac;
ea([
  u({ type: Boolean, reflect: !0 })
], Rr.prototype, "inverted");
ea([
  u()
], Rr.prototype, "behavior");
ea([
  u()
], Rr.prototype, "navAriaLabel");
customElements.get("cre8-primary-nav") === void 0 && customElements.define("cre8-primary-nav", Rr);
const o7 = k`@import '../../design-tokens/core/scss/theming/component';

// #PRIMARY NAV ITEM

/**
 * Actual primary nav list item
 */
.cre8-c-primary-nav__item {
  border-bottom-width: var(--cre8-border-width-default);
  border-bottom-style: var(--cre8-border-style-default);
  border-bottom-color: var(--cre8-color-border-subtle);

  @media all and (min-width:$cre8-breakpoint-lg) {
    border-bottom: none;
  }
}

/**
 * Content within the primary nav item
 */
.cre8-c-primary-nav__item-content {
  display: flex;
  align-items: baseline;
}

/**
 * Primary navigation link
 * 1) Used to remove any sort of default button styles when a button tag is rendered
 */
.cre8-c-primary-nav__link {
  @include cre8-typography-label-default;
  display: flex;
  align-items: center;
  appearance: none; /* 1 */
  background: transparent; /* 1 */
  border: none;
  //border: 1px solid var(--cre8-color-header-menu-border-default); /* 1 */
  white-space: nowrap;
  width: 100%;
  margin: 0;
  padding: calc(8px * 2) calc(8px * 4);
  color: var(--cre8-primary-nav-link-color, var(--cre8-color-header-menu-content-default));
  text-decoration: none;
  transition: all var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    //border-color: var(--cre8-color-header-menu-border-hover);
    background: var(--cre8-color-header-menu-bg-hover);
    color: var(--cre8-color-header-menu-content-hover);
  }

  &:active {
    border-color: var(--cre8-color-header-menu-border-pressed);
    background: var(--cre8-color-header-menu-bg-pressed);
    color: var(--cre8-color-header-menu-content-pressed);
  }

  /**
  * Primary navigation link within active primary nav item
  */
  .cre8-c-primary-nav__item.cre8-is-active & {
    background: var(--cre8-color-bg-brand);
    color: var(--cre8-color-header-menu-content-hover);
  }

  /**
  * Medium screen primary navigation
  */
  @media all and (min-width:$cre8-breakpoint-lg) {
    padding: calc(8px * 2) calc(8px * 1);
  }

  @media all and (min-width:$cre8-breakpoint-lg) {
    padding: calc(8px * 2);
    border-bottom: none;
  }
}

/**
 * Icon within primary navigation item
 */
cre8-icon-legacy {
  --cre8-icon-height: #{calc(8px * 1.5)}; /* 1 */
  --cre8-icon-width: #{calc(8px * 1.5)}; /* 1 */
  margin-left: auto;
  transition: transform var(--cre8-anim-fade-quick) var(--cre8-anim-ease);

  /**
  * Icon within active primary nav item
  * 1) Rotate the icon to show that the dropdown is open
  */
  .cre8-c-primary-nav__item.cre8-is-active & {
    transform: rotate(-180deg); /* 1 */
  }

  @media all and (min-width:$cre8-breakpoint-lg) {
    margin-left: calc(8px * 1);
  }
}

/**
 * Primary nav item panel
 * 1) Panel for the dropdown content
 * 1) Hide when not active
 */
.cre8-c-primary-nav__item-panel {
  //display: none;
  visibility: hidden; /* 1 */
  width: 100%;
  height: 0; /* 1 */
  overflow: hidden; /* 1 */
  background: transparent;
  opacity: 0; /* 1 */
  transition: all 0s var(--cre8-anim-ease);
  z-index: -1;

  @media all and (min-width:$cre8-breakpoint-lg) {
    position: absolute;
    top: 100%;
    left: 0;
    height: auto;
    box-shadow: var(--cre8-theme-box-shadow-md);
  }

  /**
  * Primary nav item panel within active item
  * 1) Show the primary nav item dropdown
  */
  .cre8-c-primary-nav__item.cre8-is-active & {
    display: block;
    visibility: visible; /* 1 */
    height: auto; /* 1 */
    padding-top: calc(8px * 4);
    padding-bottom: calc(8px * 4);
    background: var(--cre8-color-bg-default);
    opacity: 1; /* 1 */
    z-index: 1;
    transition: opacity var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  }
}

/**
* Primary nav item panel inner container
* 1) Container within primary nav item panel that caps the content width and aligns
*/
.cre8-c-primary-nav__item-panel-inner {
  /**
  * Primary nav item inner container within megamenu item
  * 1) Cap the content width and center
  */
  .cre8-c-primary-nav__item--megamenu & {
    max-width: 70rem; /* 1 */
    padding-right: calc(8px * 4);
    padding-left: calc(8px * 4);
    margin: 0 auto; /* 1 */
  }
}

.cre8-c-primary-nav__item-before {
  margin-right: calc(8px * 1);
}

.cre8-c-primary-nav__item-after {
  margin-left: calc(8px * 1);
}
`;
var n7 = Object.defineProperty, eo = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && n7(e, t, i), i;
};
const cc = class cc extends M {
  /**
   * Initialize functions
   */
  constructor() {
    super(), this.text = "Nav item", this.href = "#", this.iconName = "caret-down", this._handleOnClickOutside = this._handleOnClickOutside.bind(this), this._clickHandler = this._clickHandler.bind(this);
  }
  /**
   * Connected Callback lifecycle
   */
  connectedCallback() {
    this.setAttribute("role", "listitem"), super.connectedCallback(), document.addEventListener("mousedown", this._handleOnClickOutside, !1);
  }
  /**
   * Disconnected callback lifecycle
   * 1) Remove window resize event listener
   */
  disconnectedCallback() {
    document.removeEventListener("mousedown", this._handleOnClickOutside, !1), super.disconnectedCallback();
  }
  /**
   * Handle click outside the component
   * 1) Close the show hide panel on click outside
   * 2) If the nav is already closed then we don't care about outside clicks and we
   * can bail early
   * 3) By the time a user clicks on the page the shadowRoot will almost certainly be
   * defined, but TypeScript isn't that trusting and sees this.shadowRoot as possibly
   * undefined. To work around that we'll check that we have a shadowRoot (and a
   * rendered .host) element here to appease the TypeScript compiler. This should never
   * actually be shown or run for a human end user.
   * 4) Check to see if we clicked inside the active navigation item
   * 5) If the navigation is active and we've clicked outside of the nav then it should
   * be closed.
   */
  _handleOnClickOutside(e) {
    if (!this.isActive)
      return;
    if (!this.shadowRoot?.host)
      throw Error("Could not determine navigation context during click handler");
    const t = e.composedPath().includes(this.shadowRoot.host);
    this.isActive && !t && (this.isActive = !1);
  }
  /**
   * Toggle active state of primary nav item
   * 1) Remove isActive state from all sibling elements
   * 2) Toggle active state of element selected
   */
  _clickHandler(e) {
    e.preventDefault(), this.parentNode && this.parentNode.querySelectorAll("cre8-primary-nav-item").forEach((o) => {
      o !== this && (o.isActive = !1);
    }), this.isActive = !this.isActive;
  }
  _closePanel() {
    this.isActive = !1;
  }
  _handleOnKeyDown(e) {
    if (e.key === "Escape" && this.isActive === !0) {
      this._closePanel();
      const t = this.shadowRoot?.querySelector(
        ".cre8-c-primary-nav__link"
      );
      t && setTimeout(() => {
        t.focus();
      }, 1);
    }
  }
  render() {
    const e = this.componentClassNames("cre8-c-primary-nav__item", {
      "cre8-is-active": this.isActive === !0,
      "cre8-c-primary-nav__item--megamenu": this.megaMenu === !0
    });
    return this.megaMenu ? f`
            <div class="${e}" @keydown=${this._handleOnKeyDown}>
                <div class="cre8-c-primary-nav__item-content">
                    <button
                        class="cre8-c-primary-nav__link"
                        @click=${this._clickHandler}
                        aria-expanded=${this.isActive === !0}
                    >
                        ${this.slotNotEmpty("itemBefore") && f`
                            <div class="cre8-c-primary-nav__item-before">
                                <slot name="itemBefore"></slot>
                            </div>
                        `}
                        ${this.text}
                        ${this.slotNotEmpty("itemAfter") && f`
                            <div class="cre8-c-primary-nav__item-after">
                                <slot name="itemAfter"></slot>
                            </div>
                        `}
                        <cre8-icon-legacy aria-hidden="true" name="${$(this.iconName)}"></cre8-icon-legacy>
                    </button>
                </div>
                <div class="cre8-c-primary-nav__item-panel">
                    <div class="cre8-c-primary-nav__item-panel-inner">
                        <slot></slot>
                    </div>
                </div>
            </div>
        ` : f`
            <div class="${e}">
                <div class="cre8-c-primary-nav__item-content">
                    <a class="cre8-c-primary-nav__link" href="${this.href}">
                        ${this.slotNotEmpty("itemBefore") && f`
                            <div class="cre8-c-primary-nav__item-before">
                                <slot name="itemBefore"></slot>
                            </div>
                        `}
                        ${this.text}
                        ${this.slotNotEmpty("itemAfter") && f`
                            <div class="cre8-c-primary-nav__item-after">
                                <slot name="itemAfter"></slot>
                            </div>
                        `}
                    </a>
                </div>
            </div>
        `;
  }
};
cc.styles = [o7];
let Tt = cc;
eo([
  u()
], Tt.prototype, "text");
eo([
  u()
], Tt.prototype, "href");
eo([
  u()
], Tt.prototype, "iconName");
eo([
  u({ type: Boolean, reflect: !0 })
], Tt.prototype, "megaMenu");
eo([
  R()
], Tt.prototype, "isActive");
customElements.get("cre8-primary-nav-item") === void 0 && customElements.define("cre8-primary-nav-item", Tt);
const s7 = k`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
 #RADIO-FIELD
\*------------------------------------*/

:host {
  display: flex;
}

/** 
 * 1) Fieldset used for radio items
 */
.cre8-c-radio-field {
  border: none;
  padding: 0;
  margin: 0;
}

/** 
 * Radio field legend
 */
.cre8-c-radio-field__legend {
  @include cre8-typography-label-small;
  margin-bottom: calc(8px * 1);
}

/** 
 * Radio field list
 * 1) Remove default margin and padding form radio field list
 */
.cre8-c-radio-field__list {
  display: flex;
  flex-direction: column;
  margin: 0; /* 1 */
  padding: 0; /* 1 */
}`;
var a7 = Object.defineProperty, pr = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && a7(e, t, i), i;
};
const lc = class lc extends M {
  render() {
    const e = this.componentClassNames("cre8-c-radio-field", {});
    return f`
      <fieldset class="${e}" aria-describedby="${$(this.ariaDescribedBy)}">
        <legend class="cre8-c-radio-field__legend">${this.label}</legend>
        <div class="cre8-c-radio-field__body">
          <ul class="cre8-c-radio-field__list" role="list">
            <slot></slot>
          </ul>
        </div>
        ${this.fieldNote ? f`<cre8-field-note
          ?inverted=${this.fieldNoteKnockout}
          id=${$(this.ariaDescribedBy)}
          iconName=${$(this.fieldNoteIconName)}
          ?isSuccess=${this.isSuccess}
          ?isError=${this.isError}
        >
          ${this.fieldNote}
        </cre8-field-note>` : ""}
      </fieldset>
    `;
  }
};
lc.styles = [s7];
let rt = lc;
pr([
  u()
], rt.prototype, "fieldNote");
pr([
  u()
], rt.prototype, "ariaDescribedBy");
pr([
  u()
], rt.prototype, "fieldNoteIconName");
pr([
  u({ type: Boolean, reflect: !0 })
], rt.prototype, "fieldNoteKnockout");
pr([
  u({ type: Boolean, reflect: !0 })
], rt.prototype, "isSuccess");
pr([
  u({ type: Boolean, reflect: !0 })
], rt.prototype, "isError");
pr([
  u()
], rt.prototype, "label");
customElements.get("cre8-radio-field") === void 0 && customElements.define("cre8-radio-field", rt);
const c7 = k`@import '../../design-tokens/core/scss/theming/component.scss';
/*------------------------------------*\
 #RADIO-FIELD-ITEM
\*------------------------------------*/

:host {
  display: inline-flex;
}

/** 
 * 1) Form field that is compose of a radio input, label, and optional fieldnote.
 */
.cre8-c-radio-field-item {
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: calc(8px * 1);
  min-height: calc(8px * 3);

  /** 
  * 1) Form field that is compose of a radio input, label, and optional fieldnote.
  */
  :host(:last-child) & {
    margin-bottom: 0;
  }
}

/** 
* Radio field item input 
*/
.cre8-c-radio-field-item__input {
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(8px * 3);
  min-width: calc(8px * 3);
  margin: 0;
  z-index: 1;

  .cre8-c-radio-field-item--disabled & {
    cursor: not-allowed;
  }
}

/** 
* Radio field item custom radio container
*/
.cre8-c-radio-field-item__custom-radio {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(8px * 3);
  width: calc(8px * 3);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: var(--cre8-border-radius-round);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  background-color: var(--cre8-color-bg-default);
  border-color: var(--cre8-color-border-strong);

  /** 
  * Radio field item custom radio focus visible  custom outline
  */
  .cre8-c-radio-field-item__input:focus-visible + & {
    @include focus;

    .cre8-c-radio-field-item--error & {
      @include focusError;
      border-color: var(--cre8-color-border-error);
    }
  }

  /** 
  * Radio field item custom radio within radio field with error
  */
  .cre8-c-radio-field-item--error & {
    border-color: var(--cre8-color-border-error);
  }

  /** 
  * Radio field item custom radio within radio field disabled
  */
  .cre8-c-radio-field-item--disabled & {
    cursor: not-allowed;
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
  }
}

/** 
 * Radio field item inner circle
 */
.cre8-c-radio-field-item__inner-circle {
  display: none;

  cursor: pointer;
  height: calc(8px * 1.5);
  width: calc(8px * 1.5);
  background: var(--cre8-color-content-brand);
  border-radius: var(--cre8-border-radius-round);

  /** 
  * Radio field item inner circle error
  */
  .cre8-c-radio-field-item--error & {
    background: var(--cre8-color-bg-error-strong);
  }

  /** 
  * Radio field item inner circle disabled
  */
  .cre8-c-radio-field-item--disabled & {
    background: var(--cre8-color-content-disabled);
  }

  /** 
 * Radio field item inner circle will display if the input is checked
 */
  .cre8-c-radio-field-item__input:checked + .cre8-c-radio-field-item__custom-radio & {
    display: flex;
  }
}

/** 
 * Radio field item input 
 */
.cre8-c-radio-field-item__label {
  margin-left: calc(8px * 4);
  @include cre8-typography-label-small;
}
`;
var l7 = Object.defineProperty, Ie = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && l7(e, t, i), i;
};
const dc = class dc extends le {
  constructor() {
    super(...arguments), this.type = "radio";
  }
  /**
   * Connected callback lifecycle
   * 1) Set the initial checked value to the checked property
   * 2) Auto-generate the fieldId if a user doesn't provided so that the form field is accessible
   * 3) If a field note exists, set the aria-describedby attribute to make sure the field note is read out
   */
  connectedCallback() {
    super.connectedCallback(), this.fieldId = this.fieldId || ee(), this.fieldNote && (this.ariaDescribedBy = this.ariaDescribedBy || ee());
  }
  /**
   * Reset the radio field
   */
  resetField() {
    this._internals.setFormValue(null);
  }
  /**
   * Reset the radio field items tab indeces
   */
  resetTabIndeces(e) {
    e.forEach((t) => {
      t.shadowRoot.querySelector(".cre8-c-radio-field-item__input").setAttribute("tabindex", "0");
    });
  }
  /**
   * Remove checked
   * 1) Remove checked property from all items and set tabindex to -1
   * 2) Reset the form field to not checked
   */
  removeChecked() {
    this.parentNode && this.parentNode.querySelectorAll("cre8-radio-field-item").forEach((t) => {
      t.checked = !1, t.shadowRoot.querySelector(".cre8-c-radio-field-item__input").setAttribute("tabindex", "-1"), t.resetField();
    });
  }
  /**
   * Reset form callback
   * 1) Remove the checked state from all radio elements
   * 2) Set the checked state to the initial checked state
   * 3) Set the radio field input checked attribute to the initial checked state
   */
  formResetCallback() {
    this.removeChecked(), this.checked = this.initialChecked, this.field.checked = this.initialChecked;
  }
  /**
   * access role when radio-field-item embedded in radio-field
   */
  _getRole() {
    return this.closest("cre8-radio-field") ? "listitem" : "";
  }
  /**
   * Toggle active state of primary nav item
   * 1) Remove isActive state from all sibling elements
   * 2) Toggle active state of element selected
   */
  _clickHandler() {
    this.removeChecked(), this.checked = !this.checked;
    const e = this.shadowRoot?.querySelector(".cre8-c-radio-field-item__input");
    return e && e.setAttribute("tabindex", "0"), this.checked ? this._internals.setFormValue(this.value || "on") : this._internals.setFormValue(null);
  }
  /**
   * Handle sibling element updates during handleKeyDown function
   * 1) Prevent default keyboard functionality to disable scroll with up/down keys
   * 2) Trigger removeChecked
   * 3) Focus sibling shadowRoot element
   * 4) Click sibling shadowRoot element
   * 5) Set sibling element `tabindex` to `0`
   * 6) Set sibling element `checked` value
   */
  _updateSibling(e, t, o) {
    e.preventDefault(), this.removeChecked(), o.focus(), o.click(), o.setAttribute("tabindex", "0"), t.setAttribute("checked", "");
  }
  /**
   * Handle keydown
   * 1) If left or up arrow key is struck and radio field item exists before current item,
   *    remove checked from all items and add it to the next item
   * 2) If right or down arrow key is struck and radio field item exists after current item,
   *    remove checked from all items and add checked to the next item. Focus on this item
   *    and set tabindex for when focusing out of radio field and back onto checked item.
   * 3) If the element is in focused, then for event emission the current
   *    focues element should be clicked to emit event.
   * 4) If the Tab key is pressed, and none of the items are checked
   *    then jump away from field set to the next tabbable item
   */
  handleKeyDown(e) {
    if (e.code === "ArrowLeft" || e.code === "ArrowUp") {
      const t = this.previousElementSibling, o = t?.shadowRoot?.querySelector(
        ".cre8-c-radio-field-item__input:not([disabled])"
      );
      o && this._updateSibling(e, t, o);
    } else if (e.code === "ArrowRight" || e.code === "ArrowDown") {
      const t = this.nextElementSibling, o = t?.shadowRoot?.querySelector(
        ".cre8-c-radio-field-item__input:not([disabled])"
      );
      o && this._updateSibling(e, t, o);
    } else if (e.code === "Tab" && !this.checked) {
      const t = this.parentNode.querySelectorAll("cre8-radio-field-item");
      t.forEach((o) => {
        o.shadowRoot.querySelector(".cre8-c-radio-field-item__input").setAttribute("tabindex", "-1");
      }), setTimeout(this.resetTabIndeces, 100, t);
    }
  }
  render() {
    const e = this.componentClassNames("cre8-c-radio-field-item", {
      "cre8-c-radio-field-item--error": this.isError,
      "cre8-c-radio-field-item--success": this.isSuccess,
      "cre8-c-radio-field-item--disabled": this.disabled
    }), t = this.checked === !0 || this.initialChecked === !0;
    return f`
        <div role=${$(this._getRole())} class="${e}" @keydown=${this.handleKeyDown}>
            <input
            class="cre8-c-radio-field-item__input"
            type="radio"
            @input=${this._clickHandler}
            id=${this.fieldId}
            aria-describedby="${$(this.ariaDescribedBy)}"
            required=${$(this.required)}
            aria-invalid=${this.required ? !!this.isError : $(this.isError)}
            name=${this.name}
            .value=${this.value}
            disabled="${$(this.disabled)}"
            .checked="${t}"
            />
            <span class="cre8-c-radio-field-item__custom-radio">
            <div class="cre8-c-radio-field-item__inner-circle"></div>
            </span>
            <label class="cre8-c-radio-field-item__label" for=${this.fieldId}>${this.label}</label>
    </div>
        ${this.fieldNote ? f`<cre8-field-note
                ?inverted=${this.fieldNoteKnockout}
                id=${$(this.ariaDescribedBy)}
                iconName=${$(this.fieldNoteIconName)}
                ?isSuccess=${this.isSuccess}
                ?isError=${this.isError}
            >
                ${this.fieldNote}
            </cre8-field-note>` : ""}
        `;
  }
};
dc.styles = [c7];
let Ce = dc;
Ie([
  u()
], Ce.prototype, "ariaDescribedBy");
Ie([
  u({ type: Boolean, reflect: !0 })
], Ce.prototype, "checked");
Ie([
  u({ type: Boolean, reflect: !0 })
], Ce.prototype, "disabled");
Ie([
  oe("input")
], Ce.prototype, "field");
Ie([
  u()
], Ce.prototype, "fieldId");
Ie([
  u()
], Ce.prototype, "fieldNote");
Ie([
  u()
], Ce.prototype, "fieldNoteIconName");
Ie([
  u({ type: Boolean, reflect: !0 })
], Ce.prototype, "fieldNoteKnockout");
Ie([
  u({ type: Boolean, reflect: !0 })
], Ce.prototype, "fieldNoteIsError");
Ie([
  u({ type: Boolean, reflect: !0 })
], Ce.prototype, "isError");
Ie([
  u({ type: Boolean, reflect: !0 })
], Ce.prototype, "isSuccess");
Ie([
  u()
], Ce.prototype, "label");
Ie([
  u({ type: Boolean, reflect: !0 })
], Ce.prototype, "required");
customElements.get("cre8-radio-field-item") === void 0 && customElements.define("cre8-radio-field-item", Ce);
const d7 = k`@import '../../design-tokens/core/scss/theming/component';

#SECTION


/**
 * 1) A major section of a page (<section> tag) with a title and optional description.
 */
.cre8-c-section {
  margin-bottom: calc(8px * 4);
  display: block;
}

/**
 * Section header
 * 1) Contains the section title and possibly a description
 */
.cre8-c-section-header {
  display: flex;
  justify-content: space-between;
}

/**
* Section body
*/
.cre8-c-section__body {
  padding-top: calc(8px * 2);
  @media all and (min-width:$cre8-breakpoint-lg) {
    padding-top: calc(8px * 4);
  }
}
`;
var h7 = Object.defineProperty, u7 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && h7(e, t, i), i;
};
const hc = class hc extends M {
  render() {
    const e = this.componentClassNames("cre8-c-section", {});
    return f`
      <section class="${e}">
        ${this.headline ? f`<header class="cre8-c-section__header">
              <cre8-heading tagVariant="h2">${this.headline}</cre8-heading>
              <slot name="header"></slot>
            </header>` : f`<header class="cre8-c-section__header">
              <slot name="header"></slot>
            </header>`}
        <div class="cre8-c-section__body">
          <slot></slot>
        </div>
      </section>
    `;
  }
};
hc.styles = [d7];
let jo = hc;
u7([
  u()
], jo.prototype, "headline");
customElements.get("cre8-section") === void 0 && customElements.define("cre8-section", jo);
const p7 = k`
/**
 * Border-Box http:/paulirish.com/2012/box-sizing-border-box-ftw/
 */
*,
::slotted(*),
*:before,
*:after {
  box-sizing: border-box;
}

:root {
  --size-base-unit: 0.5rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir=rtl] {
  --rtlTranslateX: 50%;
  /* 1 */
  --rtlGradientToRight: 270deg;
  /* 2 */
  --rtlRotate45Inverse: -45deg;
  /* 3 */
}

/**
 * Visible focus outline for elements on a light background
 */
/**
 * Visible focus outline for elements with an error status
 */
/**
 * Visible focus outline for elements on a dark background
 */
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
/**
 * Visually hidden from display
 */
/*
=======
Animations
=======
*/
:host {
  --cre8-z-index-1: 1;
  --cre8-z-index-50: 50;
  --cre8-z-index-100: 100;
  --cre8-z-index-200: 200;
  --cre8-z-index-1030: 1030;
  --cre8-anim-fade-quick: 0.35s;
  --cre8-anim-ease: ease;
}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}
@keyframes slideIn {
  100% {
    transform: translateX(0);
  }
}
@keyframes slideInFwd {
  100% {
    width: 272px;
    height: 272px;
  }
}
@keyframes slideOutRight {
  100% {
    width: 272px;
    height: 272px;
  }
}
@keyframes slideUp {
  100% {
    transform: translateY(0);
  }
}
@media (width >= 481px) {
  @keyframes slideInFwd {
    100% {
      width: 417px;
      height: 417px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 417px;
      height: 417px;
    }
  }
}
@media (width >= 48rem) {
  @keyframes slideInFwd {
    100% {
      width: 330px;
      height: 330px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 330px;
      height: 330px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 60rem) {
  @keyframes slideInFwd {
    100% {
      width: 460px;
      height: 460px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 460px;
      height: 460px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 75rem) {
  @keyframes slideInFwd {
    100% {
      width: 592px;
      height: 591px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 87.5rem) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 120px));
    }
  }
}
@media (width >= 2200px) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 592px));
    }
  }
}
span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 600ms linear;
  background-color: var(--ripple-bg-color);
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 1;
  }
}
:root {
  --size-base-unit: 0.5rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir=rtl] {
  --rtlTranslateX: 50%;
  /* 1 */
  --rtlGradientToRight: 270deg;
  /* 2 */
  --rtlRotate45Inverse: -45deg;
  /* 3 */
}

/**
 * Visible focus outline for elements on a light background
 */
/**
 * Visible focus outline for elements with an error status
 */
/**
 * Visible focus outline for elements on a dark background
 */
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
/**
 * Visually hidden from display
 */
/*------------------------------------*\
 #SELECT
\*------------------------------------*/
:host {
  display: inline-flex;
  flex-wrap: wrap;
}

/**
 * Select Label
 */
.cre8-c-select__label {
  font-family: var(--cre8-typography-label-small-font-family);
  font-size: var(--cre8-typography-label-small-font-size);
  font-weight: var(--cre8-typography-label-small-font-weight);
  line-height: var(--cre8-typography-label-small-line-height);
  -webkit-text-decoration: var(--cre8-typography-label-small-text-decoration);
          text-decoration: var(--cre8-typography-label-small-text-decoration);
  text-transform: var(--cre8-typography-label-small-text-transform);
  display: block;
  margin-bottom: 8px;
}

/**
 * Select Body
 * 1) The div that contains the input and icons
 */
.cre8-c-select__body {
  position: relative;
}

/**
 * Select Input
 * 1) The html5 select element
 */
.cre8-c-select__input {
  font-family: var(--cre8-typography-body-default-font-family);
  font-size: var(--cre8-typography-body-default-font-size);
  font-weight: var(--cre8-typography-body-default-font-weight);
  line-height: var(--cre8-typography-body-default-line-height);
  -webkit-text-decoration: var(--cre8-typography-body-default-text-decoration);
          text-decoration: var(--cre8-typography-body-default-text-decoration);
  text-transform: var(--cre8-typography-body-default-text-transform);
  outline: var(--cre8-border-width-focus) solid transparent;
  outline-offset: 2px;
  -webkit-appearance: none;
  width: 100%;
  border-width: var(--cre8-border-width-default);
  border-style: solid;
  border-color: var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  padding: 12px 8px;
  color: var(--cre8-color-content-default);
  background-color: var(--cre8-color-bg-default);
  transition: outline-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), border-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), background-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), color var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  /**
   * Hover, focus, active, and focus-visible styles for default input elements
   */
  /**
   * Disabled styles for default input elements
   */
  /**
   * Placeholder styles for default input elements
   */
  /**
   * Error state for default input elements
   */
  /**
   * Success state for default input elements
   */
  padding-inline-end: 44px;
  cursor: pointer;
}
.cre8-c-select__input:hover:not(:disabled), .cre8-c-select__input:focus:not(:disabled), .cre8-c-select__input:active:not(:disabled), .cre8-c-select__input:focus-visible {
  outline: var(--cre8-border-width-focus) solid var(--cre8-color-border-active-outline);
  outline-offset: 2px;
  /**
   * Error state
   */
  /**
   * Success state
   */
}
.cre8-is-error .cre8-c-select__input:hover:not(:disabled), .cre8-is-error .cre8-c-select__input:focus:not(:disabled), .cre8-is-error .cre8-c-select__input:active:not(:disabled), .cre8-is-error .cre8-c-select__input:focus-visible {
  outline-color: var(--cre8-color-border-error);
}
.cre8-is-success .cre8-c-select__input:hover:not(:disabled), .cre8-is-success .cre8-c-select__input:focus:not(:disabled), .cre8-is-success .cre8-c-select__input:active:not(:disabled), .cre8-is-success .cre8-c-select__input:focus-visible {
  outline-color: var(--cre8-color-border-success);
}
.cre8-c-select__input:disabled {
  background-color: var(--cre8-color-bg-disabled);
  border-color: var(--cre8-color-border-disabled);
  color: var(--cre8-color-content-disabled);
  cursor: not-allowed;
  /**
   * Disabled text colors
   */
}
.cre8-c-select__input:disabled::-moz-placeholder {
  color: var(--cre8-color-content-disabled);
}
.cre8-c-select__input:disabled::placeholder {
  color: var(--cre8-color-content-disabled);
}
.cre8-c-select__input::-moz-placeholder {
  color: var(--cre8-color-content-subtle);
}
.cre8-c-select__input::placeholder {
  color: var(--cre8-color-content-subtle);
}
.cre8-is-error .cre8-c-select__input {
  border-color: var(--cre8-color-border-error);
}
.cre8-is-success .cre8-c-select__input {
  border-color: var(--cre8-color-border-success);
}

/**
 * Select Icon
 * 1) The icons within the body container positioned absolutely over the input
 */
.cre8-c-select__icons {
  position: absolute;
  inset-block-start: 50%;
  transform: translateY(-50%);
  inset-inline-end: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  pointer-events: none;
}

/**
 * Select Arrow Icon
 */
.cre8-c-select__icon-arrow {
  margin-right: 6px;
  width: 12px;
  height: 12px;
}

/**
 * Select field notes
 */
.cre8-c-select__field-note,
.cre8-c-select__field-note-success,
.cre8-c-select__field-note-error {
  flex-basis: 100%;
}
  /* sourceMappingURL=select.module.css.map */
`;
var f7 = Object.defineProperty, Be = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && f7(e, t, i), i;
};
const uc = class uc extends le {
  constructor() {
    super(...arguments), this.type = "select", this.items = [], this.label = "Label", this.required = !1;
  }
  /**
   * Initialize aria attributes
   */
  _initializeAria() {
    this.fieldId = this.fieldId || ee(), (this.fieldNote || this.slotNotEmpty("fieldNote")) && (this.ariaDescribedBy = this.ariaDescribedBy || ee()), (this.successNote || this.errorNote) && (this.validationAriaDescribedBy = this.validationAriaDescribedBy || ee());
  }
  /**
   * Aria describedby string based on field notes and error/success notes
   * 1) If both validationAriaDescribedBy (error/success note) and field note exists,
   * render both in the input's `aria-describedby` attribute
   * 2) Otherwise, if only validationAriaDescribedBy exists, then render only that as
   * the `aria-describedby` attribute (input without field note initially, but then error/success is added).
   * 3) Otherwise, render only the `ariaDescribedBy` property (field note only)
   */
  _fieldNoteAria() {
    return this.validationAriaDescribedBy && this.ariaDescribedBy ? `${this.ariaDescribedBy} ${this.validationAriaDescribedBy}` : this.validationAriaDescribedBy && !this.ariaDescribedBy ? this.validationAriaDescribedBy : this.ariaDescribedBy;
  }
  connectedCallback() {
    super.connectedCallback(), this.field.setAttribute("name", this.name ?? "");
  }
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  /**
   * First updatedLifecycle
   * 1) Get the option in the items array with selected set to true. Set that as the selected item
   * 2) The default value is set to the `option` with the `selected` if one exists. Otherwise, use the
   * select the first item value like the native select.
   */
  firstUpdated() {
    super.firstUpdated(), [...this._selectOptions].forEach((e) => {
      e.selected === !0 && (this.selectedItem = e.value);
    }), this.defaultValue = this.selectedItem ? this.selectedItem : this._selectOptions[0].value ?? "Select An Option", this._setFormData(), this._initializeAria(), this.updateField();
  }
  /**
  * Set form data
  * 1) Set the element internals to the selected item value if it exists,
  *    otherwise the default selected item is the first one
  */
  _setFormData() {
    return this.selectedItem ? this._internals?.setFormValue(this.selectedItem) : this._internals?.setFormValue(this.defaultValue.toString());
  }
  /**
   * Handle On Change
   * 1. Set the value when the select is changed.
   * 2. Fire the custom event with the current value.
   */
  _handleOnChange(e) {
    const t = e.target;
    this.value = t.options[t.selectedIndex].value, this._internals.setFormValue(this.value);
    const o = new CustomEvent("change", {
      detail: {
        name: this.name,
        value: this.value
      },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(o);
  }
  /**
   * Render the select options
   */
  _renderSelectOptions() {
    return this.items.map((e) => {
      if ("options" in e) {
        const t = e.options.map((o) => f`
                  <option value="${o.value}">${o.label}</option>
              `);
        return f`<optgroup label="${e.optGroupLabel}">
          ${t}
        </optgroup>`;
      }
      return f`<option value="${e.value}">${e.label}</option>`;
    });
  }
  /**
   * Render the success or error field notes
   * 1. If there is a successNote, then return the field note with the success message and state.
   * 2. If there is a errorNote, then return the field note with the error message and state.
   */
  _renderSuccessErrorFieldNote() {
    return this.successNote ? f`
        <cre8-field-note
          ?isSuccess=${this.isSuccess}
          id=${this.validationAriaDescribedBy}
          class="cre8-c-select__field-note-success"
          iconName="success"
        >
          ${this.successNote}
        </cre8-field-note>` : this.errorNote ? f`
        <cre8-field-note
          ?isError=${this.isError}
          id=${this.validationAriaDescribedBy}
          class="cre8-c-select__field-note-error"
          iconName="error-alt"
        >
          ${this.errorNote}
        </cre8-field-note>` : null;
  }
  render() {
    const e = this.componentClassNames("cre8-c-select", {
      "cre8-is-error": this.isError,
      "cre8-is-success": this.isSuccess
    });
    return f`
      <div class="${e}">
        <label class="cre8-c-select__label" for="${this.fieldId}">${this.label}</label>
        <div class="cre8-c-select__body">
          <select
            class="cre8-c-select__input"
            id=${this.fieldId}
            name=${$(this.name)}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-describedby="${$(this._fieldNoteAria())}"
            @change=${this._handleOnChange}
          >
            ${this._renderSelectOptions()}
          </select>
          <div class="cre8-c-select__icons">
            <cre8-icon svg='${dt}' rotate="180" class="cre8-c-select__icon-arrow" aria-hidden='true'>
          </div>
        </div>
      </div>
      ${this.fieldNote || this.slotNotEmpty("fieldNote") ? f`
          <cre8-field-note
            id=${this.ariaDescribedBy}
            class="cre8-c-select__field-note"
          ><slot name="fieldNote">${this.fieldNote}</slot></cre8-field-note>` : T}
      ${this._renderSuccessErrorFieldNote()}
    `;
  }
};
uc.styles = [p7];
let xe = uc;
Be([
  u({ type: Array })
], xe.prototype, "items");
Be([
  u()
], xe.prototype, "label");
Be([
  u()
], xe.prototype, "fieldId");
Be([
  u()
], xe.prototype, "fieldNote");
Be([
  u()
], xe.prototype, "ariaDescribedBy");
Be([
  u()
], xe.prototype, "validationAriaDescribedBy");
Be([
  u({ type: Boolean, reflect: !0 })
], xe.prototype, "required");
Be([
  u({ type: Boolean, reflect: !0 })
], xe.prototype, "disabled");
Be([
  u({ type: Boolean, reflect: !0 })
], xe.prototype, "isError");
Be([
  u()
], xe.prototype, "errorNote");
Be([
  u({ type: Boolean, reflect: !0 })
], xe.prototype, "isSuccess");
Be([
  u()
], xe.prototype, "successNote");
Be([
  D1("option")
], xe.prototype, "_selectOptions");
customElements.get("cre8-select") === void 0 && customElements.define("cre8-select", xe);
const g7 = k`@import '../../design-tokens/core/scss/theming/component';

// #SELECT-TILE

:host {
  display: inline-flex;
}

.cre8-c-select-tile {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: calc(8px * 2);
  gap: 1rem;
  border-color: var(--cre8-color-border-default);
  border-width: var(--cre8-border-width-default);
  border-radius: var(--cre8-border-radius-default);
  border-style: solid;
  background: var(--cre8-color-bg-default);
  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    background: var(--cre8-color-bg-default-hover);
    border-color: var(--cre8-color-border-brand);
  }
  &:focus,
  &:focus-visible {
    @includefocus();
  }

  &.cre8-c-select-tile--error {
    border-color: var(--cre8-color-border-error);
    background: var(--cre8-color-bg-error);
  }

  &.cre8-c-select-tile--success {
    border-color: var(--cre8-color-border-success);
    background: var(--cre8-color-bg-success);
  }

  &.cre8-c-select-tile--disabled {
    border-color: var(--cre8-color-border-disabled);
    background: var(--cre8-color-bg-disabled);
    cursor: not-allowed;
  }
}

input:checked + .cre8-c-select-tile {
  border-width: 2px;
  border-color: var(--cre8-color-border-brand);
}

.cre8-c-select-tile__input {
  display: none;
}

/**
 * Horizontal select-tile
 * 1) Organized block with flex-direction set to row so that header => footer appears
 * from left to right rather than top to bottom
 */
 .cre8-c-select-tile--horizontal {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

@mixin cre8-c-select-tile--vertical-at-bp($breakpoint) {
  @media all and (max-width: $breakpoint) {
    flex-direction: column;

    .cre8-c-select-tile__custom-radio {
      position: absolute;
      top: calc(8px * 1);
      right: calc(8px * 1);
    }
  }
}

.cre8-c-select-tile--vertical-at-sm {
  @include cre8-c-select-tile--vertical-at-bp(component.$cre8-breakpoint-sm);
}
.cre8-c-select-tile--vertical-at-sm-2 {
  @include cre8-c-select-tile--vertical-at-bp(component.$cre8-breakpoint-sm);
}
.cre8-c-select-tile--vertical-at-md {
  @include cre8-c-select-tile--vertical-at-bp(component.$cre8-breakpoint-md);
}
.cre8-c-select-tile--vertical-at-lg {
  @include cre8-c-select-tile--vertical-at-bp(component.$cre8-breakpoint-lg);
}
.cre8-c-select-tile--vertical-at-xl {
  @include cre8-c-select-tile--vertical-at-bp(component.$cre8-breakpoint-xl);
}
.cre8-c-select-tile--vertical-at-xxl {
  @include cre8-c-select-tile--vertical-at-bp(component.$cre8-breakpoint-xxl);
}


/**
 * Bare select-tile
 * 1) Organized block without a border, background, or padding
 */
.cre8-c-select-tile--bare {
  border: var(--cre8-border-width-none);
  padding: var(--cre8-spacing-0);
  box-shadow: none;
}
/**
 * Horizontal-bare select-tile
 * 1) Organized block with flex-direction set to row so that header => footer appears
 * from left to right rather than top to bottom without a border, background, or padding
 */
.cre8-c-select-tile--horizontal-bare {
  flex-direction: row;
  border: var(--cre8-border-width-none);
  padding: var(--cre8-spacing-0);
  box-shadow: none;
  align-items: center;
  justify-content: center;
 }
/**
 * Center aligned select-tile
 * 1) Center content and text within the select-tile
 */
.cre8-c-select-tile--align-center {
  text-align: center; /* 1 */
  align-items: center; /* 1 */
  justify-content: center; /* 1 */
}

/**
 * Slotted image within a select-tile
 * 1) Make the image full width
 */
::slotted(img) {
  width: 100%;
}

/**
 * Select tile header
 * 1) Remove flex so that body always takes up remaining space
 */
.cre8-c-select-tile__header {
  display: block;
  flex: none; /* 1 */
}

/**
 * Select Tile body
 * 1) Flex applied to always fill the remaining space of the select-tile
 */
.cre8-c-select-tile__body {
  display: block;
  flex: 1 1 auto; /* 1 */

  /**
  * Select Tile body within bare select-tile
  * 1) Remove padding
  */
  .cre8-c-select-tile--bare & {
    padding: var(--cre8-spacing-0);
  }
  .cre8-c-select-tile--horizontal-bare & {
    padding: var(--cre8-spacing-0);
  }

  .cre8-c-select-tile__body_title {
    @include cre8-typography-title-default();
  }
  .cre8-c-select-tile__body_body {
    @include cre8-typography-body-default();
  }
}

/**
 * Select Tile footer
 * 1) Remove flex so that body always takes up remaining space
 */
.cre8-c-select-tile__footer {
  display: flex;
  flex: none; /* 1 */

  .cre8-c-select-tile--bare & {
    padding: var(--cre8-spacing-0);
  }
  .cre8-c-select-tile--horizontal-bare & {
    padding: var(--cre8-spacing-0);
  }
}

.cre8-c-select-tile__custom-radio, .cre8-c-select-tile__custom-checkbox  {

  /**
   * Render the checkmark/radio button on the left instead of the right.
   * Since it is only visual and the "checked" state is also set via aria,
   * there are hopefully no a11y issues with using order here.
   */
  &.cre8-c-select-tile__custom-radio-left {
    order: -1;
  }

  &.cre8-c-select-tile__custom-radio-none {
    display: none;
  }
}

@mixin cre8-c-select-radio-top-right($breakpoint: 0) {
  position: absolute;
  top: calc(8px * 1);
  right: calc(8px * 1);
  @if $breakpoint != 0 {
    @media all and (min-width: $breakpoint) {
      position: static;
    }
  }
}

/**
* Radio field item custom radio container
*/
.cre8-c-select-tile__custom-radio {
  display: flex;
  flex: none;
  height: calc(8px * 3);
  width: calc(8px * 3);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: var(--cre8-border-radius-round);
  border-width: var(--cre8-border-width-default);
  border-style:  var(--cre8-border-style-default);
  background-color: var(--cre8-color-bg-default);
  border-color: var(--cre8-color-border-default);

  /**
  * Radio field item custom radio focus visible  custom outline
  */
  .cre8-c-select-tile__input:focus-visible + & {
    border-color: var(--cre8-color-border-strong);
    @include focus;

    .cre8-c-select-tile--error & {
      @include focusError;
      border-color: var(--cre8-color-border-error);
    }
  }

  /**
  * Radio field item custom radio within radio field with error
  */
  .cre8-c-select-tile--error & {
    border-color: var(--cre8-color-border-error);
  }

  /**
  * Radio field item custom radio within radio field disabled
  */
  .cre8-c-select-tile--disabled & {
    cursor: not-allowed;
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
  }
}

.cre8-c-select-tile__custom-radio-top-right {
  @include technology.cre8-c-select-radio-top-right();
}

/**
 * Check radio variant
 */
.cre8-c-select-tile__custom-radio-check {
    .cre8-c-select-tile__icon {
      display: flex;
    }
}

/**
 * Radio field item inner circle
 */
.cre8-c-select-tile__inner-circle {
  display: none;

  cursor: pointer;
  height: calc(8px * 1.5);
  width: calc(8px * 1.5);
  background: var(--cre8-color-content-brand);
  border-radius: var(--cre8-border-radius-round);

  /** Check radio variant */
  .cre8-c-select-tile__custom-radio-check & {
    flex: none;
    height: calc(8px * 3);
    width: calc(8px * 3);
    align-items: center;
    justify-content: center;
  }

  /**
  * Radio field item inner circle error
  */
  .cre8-c-select-tile--error & {
    background: var(--cre8-color-bg-error-strong);
  }

  /**
  * Radio field item inner circle disabled
  */
  .cre8-c-select-tile--disabled & {
    background: var(--cre8-color-content-disabled);
  }

  /**
 * Radio field item inner circle will display if the input is checked
 */
  input:checked ~ * .cre8-c-select-tile__custom-radio & {
    display: flex;
  }
}


// These styles are for the checkbox version

/**
 * Checkbox field item custom checkbox container
 */
 .cre8-c-select-tile__custom-checkbox {
  display: flex;
  flex: none;
  height: calc(8px * 3);
  width: calc(8px * 3);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: var(--cre8-border-radius-small);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  background-color: var(--cre8-color-bg-default);
  border-color: var(--cre8-color-border-strong);

  /**
  * Checkbox field item custom checkbox focus visible  custom outline
  */
  .cre8-c-select-tile__input:focus-visible + & {
    @include focus;

    .cre8-c-select-tile--error & {
      @include focusError;
    }
  }

  /**
  * Checkbox field item custom checkbox within checkbox field with error
  */
  .cre8-c-select-tile--error & {
    background-color: var(--cre8-color-bg-default);
    border-color: var(--cre8-color-border-error);
  }

  /**
  * Checkbox field item custom checkbox within checkbox field with disabled
  */
  .cre8-c-select-tile--disabled & {
    cursor: not-allowed;
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
  }
}

/**
  * Checkbox field item custom checkbox when item is checked
  */
input:checked ~ * .cre8-c-select-tile__custom-checkbox {
  background-color: var(--cre8-color-bg-brand-strong);

  /**
  * Checkbox field item custom checkbox when item is checked with error
  */
  .cre8-c-select-tile--error & {
    background-color: var(--cre8-color-bg-default);
  }

  /**
  * Checkbox field item custom checkbox when item is checked with disabled
  */
  .cre8-c-select-tile--disabled & {
    background-color: var(--cre8-color-bg-disabled);
  }
}

/**
 * Checkbox field item checkmark icon
 */
.cre8-c-select-tile__icon {
  display: none;
  color: var(--cre8-color-content-knockout);

  /**
  * Checkbox field item icon within checkbox field with error
  */
  .cre8-c-select-tile--error & {
    color: var(--cre8-color-content-error);
  }

  /**
  * Checkbox field item icon within checkbox field disabled
  */
  .cre8-c-select-tile--disabled & {
    color: var(--cre8-color-content-disabled);
  }

  /**
  * Checkbox field item icon will display in the box if the input is checked
  */
  input:checked ~ * .cre8-c-select-tile__custom-checkbox & {
    display: flex;
  }
}
`;
function k1(r, e) {
  return e < 0 ? r.length - 1 : e >= r.length ? 0 : e;
}
class $1 {
  constructor(e) {
    this._clickHandler = (t) => {
      t.preventDefault(), this._checkAndFocus(this.host);
    }, this._checkAndFocus = (t) => {
      const o = t.checked;
      this.removeChecked(), t.focus(), t.checked = !0, t.setAttribute("tabindex", "0"), o || (t.dispatchEvent(new Event("input", { bubbles: !0, composed: !0 })), t.dispatchEvent(new Event("change", { bubbles: !0 })));
    }, this._handleKeyDown = (t) => {
      ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(t.code) && this._handleArrowKeys(t), ["Enter", " "].includes(t.key) && this._handleEnterSpace(t);
    }, this._handleArrowKeys = (t) => {
      const o = this.findAllElementsInSameRadioButtonGroup({ excludeDisabled: !0 });
      if (o.length <= 1)
        return;
      const i = o.findIndex((s) => s === this.host);
      let n;
      t.code === "ArrowLeft" || t.code === "ArrowUp" ? n = o[k1(o, i - 1)] : (t.code === "ArrowRight" || t.code === "ArrowDown") && (n = o[k1(o, i + 1)]), this._checkAndFocus(n), t.preventDefault();
    }, this._handleEnterSpace = (t) => {
      this._checkAndFocus(this.host), t.preventDefault();
    }, this.host = e, e.addController(this);
  }
  hostConnected() {
    this.host._internals.role = "radio", this.host.setAttribute("role", "radio"), this.host.setAttribute("tabindex", "0"), this.host.addEventListener("click", this._clickHandler), this.host.addEventListener("keydown", this._handleKeyDown);
  }
  hostDisconnected() {
    this.host._internals.role = void 0, this.host.removeAttribute("role"), this.host.removeAttribute("tabindex"), this.host.removeEventListener("click", this._clickHandler), this.host.removeEventListener("keydown", this._handleKeyDown);
  }
  hostUpdate() {
  }
  /**
   * Find all elements that are in the same "radio button group", following the HTML 5 spec,
   * except that we're looking at `[role="radio"]` instead of `input[type="radio"]`.
   *
   * - They have the attribute role="radio" set
   * - They have the same form owner, or both have no form owner
   * - They're in the same tree (same document, don't look at shadow dom)
   * - They both have non-empty name attributes, and the names are the same
   *
   */
  findAllElementsInSameRadioButtonGroup({ excludeDisabled: e } = {}) {
    const t = this.host.name, o = this.host.form;
    if (t && t.length > 0) {
      const i = this.host.ownerDocument, n = Array.from(
        i.querySelectorAll(`[role="radio"][name="${t}"]`)
      ).filter((s) => s.form === o);
      return e === !0 ? n.filter((s) => !(s.disabled || s.ariaDisabled === "true")) : n;
    }
    return [];
  }
  /**
    * Remove checked
    * 1) Reset the form field to not checked
    * 2) Remove checked property from all items and set tabindex to -1
    */
  removeChecked() {
    this.findAllElementsInSameRadioButtonGroup().forEach((t) => {
      t.checked = !1, t.setAttribute("tabindex", "-1");
    });
  }
}
class M1 {
  constructor(e) {
    this._clickHandler = (t) => {
      this._checkAndFocus(), t.preventDefault();
    }, this._checkAndFocus = () => {
      this.host.checked = !this.host.checked, this.host.dispatchEvent(new Event("input", { bubbles: !0, composed: !0 })), this.host.dispatchEvent(new Event("change", { bubbles: !0 }));
    }, this._handleKeyDown = (t) => {
      ["Enter", " "].includes(t.key) && this._handleEnterSpace(t);
    }, this._handleEnterSpace = (t) => {
      this._checkAndFocus(), t.preventDefault();
    }, this.host = e, e.addController(this);
  }
  hostConnected() {
    this.host._internals.role = "checkbox", this.host.setAttribute("tabindex", "0"), this.host.addEventListener("click", this._clickHandler), this.host.addEventListener("keydown", this._handleKeyDown);
  }
  hostDisconnected() {
    this.host._internals.role = void 0, this.host.removeAttribute("tabindex"), this.host.removeEventListener("click", this._clickHandler), this.host.removeEventListener("keydown", this._handleKeyDown);
  }
}
var b7 = Object.defineProperty, ke = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && b7(e, t, i), i;
};
const en = class en extends le {
  constructor() {
    super(...arguments), this._controller = void 0, this.type = "radio", this.variantBreakToVertical = "sm", this.checkPosition = "right", this.radioVariant = "dot";
  }
  /**
   * The form associated with this field
   *
   * TOOD: maybe this goes on Cre8FormElement
   */
  get form() {
    return this._internals.form;
  }
  /**
   * Connected callback lifecycle
   * 1) Auto-generate the fieldId if a user doesn't provided so that the form field is accessible
   * 2) Initialize the correct controller
   */
  connectedCallback() {
    super.connectedCallback(), this.fieldId = this.fieldId || ee(), this._controller = this.type === "radio" ? new $1(this) : new M1(this), this.disabled && (this._internals.ariaDisabled = "true");
  }
  /**
   * Reset form callback
   * 1) Remove the checked state from all radio elements
   * 2) Set the checked state to the initial checked state
   * 3) Set the radio field input checked attribute to the initial checked state
   */
  formResetCallback() {
    this.checked = this.defaultChecked, this.field.checked = this.defaultChecked;
  }
  /**
   * Whenever the "checked" property changes, update our form value, aria-checked,
   * and the checked property of `this.field`.
   *
   */
  updated(e) {
    super.updated(e), e.has("checked") && this.setAttribute("aria-checked", this.checked ? "true" : "false"), e.has("type") && (this._controller.hostDisconnected(), this._controller = this.type === "radio" ? new $1(this) : new M1(this)), e.has("disabled") && (this.disabled ? this._internals.ariaDisabled = "true" : this._internals.ariaDisabled = "false");
  }
  renderInput() {
    return f`
        <input
            class="cre8-c-select-tile__input"
            type=${this.type}
            id=${this.fieldId}
            aria-describedby="${$(this.ariaDescribedBy)}"
            ?required=${this.required}
            name=${this.name}
            .value=${this.value}
            ?disabled="${this.disabled}"
            .checked="${this.checked}"
        />
        `;
  }
  renderCheckboxIcon() {
    return this.type === "checkbox" ? f`
            <cre8-icon svg="${Ci}" class="cre8-c-select-tile__icon" aria-hidden="${!this.checked}"></cre8-icon>
        ` : null;
  }
  render() {
    const e = this.componentClassNames("cre8-c-select-tile", {
      "cre8-c-select-tile--bare": this.variant === "bare",
      "cre8-c-select-tile--horizontal": this.variant === "horizontal",
      "cre8-c-select-tile--horizontal-bare": this.variant === "horizontal-bare",
      "cre8-c-select-tile--vertical-at-sm": this.variantBreakToVertical === "sm",
      "cre8-c-select-tile--vertical-at-sm-2": this.variantBreakToVertical === "sm-2",
      "cre8-c-select-tile--vertical-at-md": this.variantBreakToVertical === "md",
      "cre8-c-select-tile--vertical-at-lg": this.variantBreakToVertical === "lg",
      "cre8-c-select-tile--vertical-at-xl": this.variantBreakToVertical === "xl",
      "cre8-c-select-tile--vertical-at-xxl": this.variantBreakToVertical === "xxl",
      "cre8-c-select-tile--align-center": this.align === "center",
      "cre8-c-select-tile--error": this.isError,
      "cre8-c-select-tile--success": this.isSuccess,
      "cre8-c-select-tile--disabled": this.disabled
    }), t = this.componentClassNames(
      this.type === "radio" ? "cre8-c-select-tile__custom-radio" : "cre8-c-select-tile__custom-checkbox",
      {
        "cre8-c-select-tile__custom-radio-top-right": !this.variant || this.variant === "bare" || this.checkPosition === "top-right",
        "cre8-c-select-tile__custom-radio-left": this.checkPosition === "left",
        "cre8-c-select-tile__custom-radio-none": this.checkPosition === "none",
        "cre8-c-select-tile__custom-radio-check": this.radioVariant === "check"
      }
    ), o = this.disabled ? void 0 : "0";
    return f`
        ${this.renderInput()}
        <label class="${e}" part="select-tile" for=${this.fieldId} tabindex=${o}>
            ${this.slotNotEmpty("header") && f`
                <div class="cre8-c-select-tile__header" part="header">
                    <slot name="header"></slot>
                </div>
            `}
            <div part="body" class="cre8-c-select-tile__body">
                <slot></slot>
                ${this.slotNotEmpty("title") && f`
                    <div part="body-title" class="cre8-c-select-tile__body_title">
                        <slot name="title"></slot>
                    </div>
                `}
                ${this.slotNotEmpty("body") && f`
                    <div part="body-body" class="cre8-c-select-tile__body_body">
                        <slot name="body"></slot>
                    </div>
                `}
            </div>
            <div part="footer" class="cre8-c-select-tile__footer">
                <slot name="footer"></slot>
            </div>
            <div class="${t}">
                ${this.renderCheckboxIcon()}
                <div class="cre8-c-select-tile__inner-circle">
                    <cre8-icon svg="${Ci}" class="cre8-c-select-tile__icon"></cre8-icon>
                </div>
            </div>
        </label>`;
  }
};
en.shadowRootOptions = { ...wr.shadowRootOptions, delegatesFocus: !0 }, en.styles = [g7];
let de = en;
ke([
  u({ reflect: !0 })
], de.prototype, "type");
ke([
  oe("input")
], de.prototype, "field");
ke([
  u({ reflect: !0 })
], de.prototype, "variant");
ke([
  u({ reflect: !0 })
], de.prototype, "variantBreakToVertical");
ke([
  u({ reflect: !0 })
], de.prototype, "checkPosition");
ke([
  u({ reflect: !0 })
], de.prototype, "radioVariant");
ke([
  u({ reflect: !0 })
], de.prototype, "align");
ke([
  u({ type: Boolean, reflect: !0 })
], de.prototype, "isError");
ke([
  u({ type: Boolean, reflect: !0 })
], de.prototype, "disabled");
ke([
  u({ type: Boolean, reflect: !0 })
], de.prototype, "required");
ke([
  u({ type: Boolean, reflect: !0 })
], de.prototype, "checked");
ke([
  u({ attribute: "checked", type: Boolean, reflect: !0 })
], de.prototype, "defaultChecked");
ke([
  u()
], de.prototype, "fieldId");
ke([
  u()
], de.prototype, "ariaDescribedBy");
ke([
  u({ type: Boolean, reflect: !0 })
], de.prototype, "isSuccess");
customElements.get("cre8-select-tile") === void 0 && customElements.define("cre8-select-tile", de);
const m7 = k`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
 #SELECT-TILE-LIST
\*------------------------------------*/

:host {
  display: block;
}

/** 
 * 1) Fieldset used for checkbox items
 */
.cre8-c-select-tile-list {
  border: var(--cre8-border-width-none);
  padding: var(--cre8-spacing-0);
  margin: var(--cre8-spacing-0);
}

/** 
   * Checkbox field legend
   */
.cre8-c-select-tile-list__legend {
  @include cre8-typography-label-default;
  margin-bottom: calc(8px * 1);
}

.cre8-c-select-tile-list__list {
  gap: calc(8px * 3);
  display: grid;  

  grid-template-columns: repeat(auto-fit, var(--cre8-select-tile-list-item-width, calc(8px * 26)));

  .cre8-c-select-tile-list__rows & {
    grid-template-columns: unset;
  }
}

`;
var v7 = Object.defineProperty, Bt = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && v7(e, t, i), i;
};
const pc = class pc extends M {
  constructor() {
    super(...arguments), this.variant = "columns";
  }
  connectedCallback() {
    super.connectedCallback(), this.fieldNote && (this.ariaDescribedBy = this.ariaDescribedBy || ee());
  }
  render() {
    const e = this.componentClassNames("cre8-c-select-tile-list", {
      "cre8-c-select-tile-list__rows": this.variant === "rows"
    });
    return f`
      <fieldset class="${e}">
        <legend
          class="cre8-c-select-tile-list__legend"
          aria-describedby="${$(this.ariaDescribedBy)}"
        >
          ${this.label}
        </legend>
        <div class="cre8-c-select-tile-list__body">
          <div class="cre8-c-select-tile-list__list" role="list">
            <slot></slot>
          </div>
        </div>
        ${this.fieldNote ? f`<cre8-field-note
          ?inverted=${this.fieldNoteKnockout}
          id=${$(this.ariaDescribedBy)}
          iconName=${$(this.fieldNoteIconName)}
          ?isSuccess=${this.fieldNoteIsSuccess}
          ?isError=${this.fieldNoteIsError}
        >
          ${this.fieldNote}
        </cre8-field-note>` : ""}
      </fieldset>
    `;
  }
};
pc.styles = [m7];
let qe = pc;
Bt([
  u({ reflect: !0 })
], qe.prototype, "variant");
Bt([
  u({ reflect: !0 })
], qe.prototype, "label");
Bt([
  u({ reflect: !0 })
], qe.prototype, "fieldNote");
Bt([
  u()
], qe.prototype, "ariaDescribedBy");
Bt([
  u({ reflect: !0 })
], qe.prototype, "fieldNoteIconName");
Bt([
  u({ type: Boolean, reflect: !0 })
], qe.prototype, "fieldNoteKnockout");
Bt([
  u({ type: Boolean, reflect: !0 })
], qe.prototype, "fieldNoteIsSuccess");
Bt([
  u({ type: Boolean, reflect: !0 })
], qe.prototype, "fieldNoteIsError");
customElements.get("cre8-select-tile-list") === void 0 && customElements.define("cre8-select-tile-list", qe);
const y7 = k`@import '../../design-tokens/core/scss/theming/component';

:host {
  display: block;
}

/**
 * Skeleton Loader
 * The hard coded value for color here is intentional and is uniform across all brands
 */
.cre8-c-skeleton-loader {
  width: 100%;
  height: auto;
  border-radius: var(--cre8-border-radius-small);
  aspect-ratio: 16 / 3;
  background: linear-gradient(-90deg, #f6f6f6 0%, #ebebeb 50%, #f6f6f6 100%);
  background-size: 400% 400%;
  animation: pulse 1.25s linear infinite;  
}

/**
 * Skeleton Loader - Rectangle
 */
.cre8-c-skeleton-loader--rectangle {
  aspect-ratio: 16 / 6;
}

/**
 * Skeleton Loader - Square
 */
.cre8-c-skeleton-loader--square {
  aspect-ratio: 1 / 1;
}

/**
 * Skeleton Loader - Circle
 */
.cre8-c-skeleton-loader--circle {
  aspect-ratio: 1 / 1;
  border-radius: 50%;
}

/** 
 * Pulsing animation for loading look
 */
@keyframes pulse {
  0% {
  background-position:  0% 0%;
  }

  100% {
    background-position: -135% 0%;
  }
}
`;
var C7 = Object.defineProperty, ta = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && C7(e, t, i), i;
};
const fc = class fc extends M {
  constructor() {
    super(...arguments), this.variant = "rectangle";
  }
  render() {
    const e = this.componentClassNames("cre8-c-skeleton-loader", {
      "cre8-c-skeleton-loader--rectangle": this.variant === "rectangle",
      "cre8-c-skeleton-loader--square": this.variant === "square",
      "cre8-c-skeleton-loader--circle": this.variant === "circle"
    });
    return f`
    <div
        class="${e}"
        style="height: ${this.height ?? "auto"}; width: ${this.width ?? "auto"}"
    ></div>
    `;
  }
};
fc.styles = [y7];
let zr = fc;
ta([
  u()
], zr.prototype, "variant");
ta([
  u()
], zr.prototype, "height");
ta([
  u()
], zr.prototype, "width");
customElements.get("cre8-skeleton-loader") === void 0 && customElements.define("cre8-skeleton-loader", zr);
const x7 = k`@import '../../design-tokens/core/scss/theming/component';

// #split-button

/**
 * 1)
 */
.cre8-c-split-button {
  width: fit-content;
  display: block;
}

.cre8-c-split-button__button-container {
  display: flex;
  max-width: fit-content;
}
`;
var _7 = Object.defineProperty, mn = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && _7(e, t, i), i;
};
const gc = class gc extends M {
  constructor() {
    super(...arguments), this.dropdownOpen = !1;
  }
  render() {
    const e = this.componentClassNames("cre8-c-split-button", {});
    return f`
      <div class="${e}">
        <div class="cre8-c-split-button__button-container">
          <cre8-button
            class="cre8-c-split-button__text-button"
            variant="secondary"
            splitButtonType="text"
            ?disabled=${this.disabled}
            text="${this.buttonText}"
            size="${this.size}"
            @click="${this._textClick}"
          >
          </cre8-button>
          <cre8-button
            class="cre8-c-split-button__arrow-button"
            variant="icon-only secondary"
            splitButtonType="caret"
            iconName="${this.dropdownOpen ? "delta-down" : "delta-up"}"
            ?disabled=${this.disabled}
            hideText="true"
            size="${this.size}"
            @click="${this._dropdownClick}"
          >
          </cre8-button>
        </div>
        ${this.dropdownOpen ? f`<slot></slot>` : ""}
      </div>
    `;
  }
  _textClick(e) {
    this.dispatchEvent(new Event("text-click", e));
  }
  _dropdownClick(e) {
    this.dropdownOpen = !this.dropdownOpen, this.dispatchEvent(new Event("dropdown-click", e));
  }
};
gc.styles = [x7];
let nr = gc;
mn([
  R()
], nr.prototype, "dropdownOpen");
mn([
  u({ type: Boolean, reflect: !0 })
], nr.prototype, "disabled");
mn([
  u()
], nr.prototype, "size");
mn([
  u()
], nr.prototype, "buttonText");
customElements.get("cre8-split-button") === void 0 && customElements.define("cre8-split-button", nr);
const w7 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Menu inserted into the dropdown/megamenu of the navigation
 */
.cre8-c-submenu {
  list-style: none;
  padding: 0;
  margin: 0;
}
`, bc = class bc extends M {
  render() {
    const e = this.componentClassNames("cre8-c-submenu", {});
    return f`
      <ul role="list" class="${e}">
        <slot></slot>
      </ul>
    `;
  }
};
bc.styles = [w7];
let ms = bc;
customElements.get("cre8-submenu") === void 0 && customElements.define("cre8-submenu", ms);
const k7 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Individual item with a link/button within submenu
 */
.cre8-c-submenu-item__link {
  color: var(--cre8-color-header-submenu-content-default);
  background: var(--cre8-color-header-submenu-bg-default);
  text-decoration: none;

  &:hover,
  &:focus {
    color: var(--cre8-color-header-submenu-content-hover);
    background: var(--cre8-color-header-submenu-bg-hover);
  }

  &:active {
    color: var(--cre8-color-header-submenu-content-pressed);
    background: var(--cre8-color-header-submenu-bg-pressed);
  }
}
`;
var $7 = Object.defineProperty, M7 = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && $7(e, t, i), i;
};
const mc = class mc extends M {
  render() {
    const e = this.componentClassNames("cre8-c-submenu-item", {});
    return this.href ? f`
        <li role="listitem" class="${e}">
          <a href=${this.href} class="cre8-c-submenu-item__link">
            <slot></slot>
          </a>
        </li>
      ` : f`<li role="listitem" class="${e}">
        <button class="cre8-c-submenu-item__link">
          <slot></slot>
        </button>
      </li>`;
  }
};
mc.styles = [k7];
let Wo = mc;
M7([
  u()
], Wo.prototype, "href");
customElements.get("cre8-submenu-item") === void 0 && customElements.define("cre8-submenu-item", Wo);
const L7 = k`@import '../../design-tokens/core/scss/theming/component';
/*------------------------------------*\
 #TAB
\*------------------------------------*/

/**
 * Tab host
 */
:host {
  display: contents;
}

/**
 * Tab
 * 1. Make border appear to be inside the tab
 */
.cre8-c-tab {
  @include cre8-typography-label-default();
  position: relative;
  display: flex;
  margin: 0;
  flex-shrink: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  gap: calc(8px * 1);
  color: var(--cre8-color-content-default);
  background-color: transparent;
  border: 0;
  border-block-end: var(--cre8-border-width-tab-selected) var(--cre8-border-style-default) var(--cre8-color-border-default);
  padding-block-start: calc(8px * 1);
  padding-inline-end: calc(8px * 3);
  padding-block-end: calc(calc(8px * 1) - var(--cre8-border-width-tab-selected)); /* 1 */
  padding-inline-start: calc(8px * 3);
  cursor: pointer;
  overflow: hidden;
  transition: border-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), background-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease);

  /**
   * Tab hover state
   */
  &:hover {
    background-color: var(--cre8-color-bg-brand-hover);
  }

  /**
   * Tab focus visible state
   * 1. Make the focus appear inside the tab to prevent the bottom border from showing
   */
  &:focus-visible {
    @include focus;
    outline-offset: calc(#{var(--cre8-border-width-focus)} * -1); /* 1 */
    border-radius: var(--cre8-border-radius-small);
    border-block-end-color: transparent;
  }
}

/**
 * Tab active state
 */
.cre8-c-tab.cre8-is-active:not(:focus-visible) {
  color: var(--cre8-color-content-brand-strong);
  background-color: transparent;
  border-block-end: var(--cre8-border-width-tab-selected) var(--cre8-border-style-default) var(--cre8-color-border-brand-strong);
  padding-block-end: calc(calc(8px * 1) - var(--cre8-border-width-tab-selected)); /* 1 */
}

/**
 * Tab small
 */
.cre8-c-tab.cre8-c-tab--small {
  @include cre8-typography-label-small();
  padding-block-start: calc(8px * 0.5);
  padding-inline-end: calc(8px * 2);
  padding-block-end: calc(calc(8px * 0.5) - var(--cre8-border-width-tab-selected)); /* 1 */
  padding-inline-start: calc(8px * 2);

  /**
   * Tab small active state
   */
  &.cre8-is-active:not(:focus-visible) {
    padding-block-end: calc(calc(8px * 0.5) - var(--cre8-border-width-tab-selected)); /* 1 */
  }
}`;
var S7 = Object.defineProperty, to = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && S7(e, t, i), i;
};
const vc = class vc extends M {
  /**
   * Updated
   * 1. Called when the element's DOM has been updated and rendered.
   * 2. If has ariaLabelledBy, then set the tab ID with the value.
   * 3. If the tab is active, set the tabindex to 0 and aria-selected to true.
   */
  updated(e) {
    e.has("ariaLabelledBy") && this._Cre8Tab.setAttribute("id", this.ariaLabelledBy), e.has("isActive") && (this._Cre8Tab.setAttribute("tabindex", this.isActive ? "0" : "-1"), this._Cre8Tab.setAttribute("aria-selected", `${this.isActive}`));
  }
  /**
   * Handle Tab Selected
   * 1. Fire the custom event on click of a tab.
   */
  _handleTabSelected() {
    const e = new CustomEvent("tabSelected", {
      detail: {
        index: this.index
      },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  render() {
    const e = this.componentClassNames("cre8-c-tab", {
      "cre8-is-active": this.isActive,
      "cre8-c-tab--small": this.size === "sm"
    });
    return f`
      <button
        role="tab"
        tabindex="-1"
        aria-selected="false"
        type="button"
        class="${e}"
        @click=${this._handleTabSelected}
      >
        <slot></slot>
      </button>
    `;
  }
};
vc.styles = [L7];
let Pt = vc;
to([
  u()
], Pt.prototype, "size");
to([
  u({ type: Boolean, reflect: !0 })
], Pt.prototype, "isActive");
to([
  u({ type: Number })
], Pt.prototype, "index");
to([
  u()
], Pt.prototype, "ariaLabelledBy");
to([
  oe(".cre8-c-tab")
], Pt.prototype, "_Cre8Tab");
customElements.get("cre8-tab") === void 0 && customElements.define("cre8-tab", Pt);
const A7 = k`@import '../../design-tokens/core/scss/theming/component';
/*------------------------------------*\
 #TAB-PANEL
\*------------------------------------*/

/** 
 * Tab panel host
 */
:host {
  display: contents;
}

/** 
 * Tab panel
 */
.cre8-c-tab-panel {
  visibility: hidden;
  display: none;

  /**
   * Tab panel focus visible state
   */
  &:focus-visible {
    @include focus;
  }
}

/** 
 * Tab panel active
 */
.cre8-c-tab-panel.cre8-is-active {
  visibility: visible;
  display: block;
}
`;
var T7 = Object.defineProperty, vn = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && T7(e, t, i), i;
};
const yc = class yc extends M {
  /**
   * First updated
   * 1. If skipFocusOnPanel is not true, then allow tabbing to the panel.
   */
  firstUpdated() {
    this.skipFocusOnPanel || this._Cre8TabPanel.setAttribute("tabindex", "0");
  }
  render() {
    const e = this.componentClassNames("cre8-c-tab-panel", {
      "cre8-is-active": this.isActive
    });
    return f`
      <div role="tabpanel" class="${e}">
        <slot></slot>
      </div>
    `;
  }
};
yc.styles = [A7];
let sr = yc;
vn([
  u({ type: Boolean, reflect: !0 })
], sr.prototype, "skipFocusOnPanel");
vn([
  u({ type: Boolean, reflect: !0 })
], sr.prototype, "isActive");
vn([
  u({ type: Number })
], sr.prototype, "index");
vn([
  oe(".cre8-c-tab-panel")
], sr.prototype, "_Cre8TabPanel");
customElements.get("cre8-tab-panel") === void 0 && customElements.define("cre8-tab-panel", sr);
const P7 = k`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
#TABLE
\*------------------------------------*/

:host {
    display: block;
}

/**
 * 1) Data table containing columns and rows
 */
.cre8-c-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    max-width: 100%;
    background-color: var(--cre8-color-bg-transparent);
}

/**
 * Custom properties passed to table-row for striped variant
 */
.cre8-c-table--striped {
    --cre8-table-row-odd-background: var(--cre8-color-bg-subtle);
    --cre8-table-row-odd-hover-background: var(--cre8-color-bg-subtle);
}

/**
 * Custom properties passed to table-row for isHoverable property
 */
.cre8-c-table--hoverable {
    --cre8-table-row-hover-background: var(--cre8-color-bg-default-hover);
    --cre8-table-row-odd-hover-background: var(--cre8-color-bg-default-hover);
}

/**
 * Custom properties passed to child Components for responsive behavior
 */
.cre8-c-table--responsive {
    --cre8-table-cell-before-content: attr(data-header);
    --cre8-table-header-display: none;
    --cre8-table-row-display: block;
    --cre8-table-cell-display: block;
    --cre8-table-cell-border-bottom-width: 0;
    --cre8-table-row-border-bottom: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-default);

    @media all and (min-width:$cre8-breakpoint-md) {
        --cre8-table-cell-border-bottom-width: var(--cre8-border-width-default);
    }
}
`;
var E7 = Object.defineProperty, yn = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && E7(e, t, i), i;
};
const Cc = class Cc extends M {
  render() {
    const e = this.componentClassNames("cre8-c-table", {
      "cre8-c-table--hoverable": this.isHoverable,
      "cre8-c-table--striped": this.variant === "striped",
      "cre8-c-table--responsive": this.behavior === "responsive"
    });
    return f`
      <table role="table" class="${e}">
        ${this.caption ? f`<caption class="cre8-c-table__caption">
            ${this.caption}
          </caption>` : ""}
        ${f`<slot></slot>`}
      </table>
    `;
  }
};
Cc.styles = [P7];
let ar = Cc;
yn([
  u()
], ar.prototype, "caption");
yn([
  u()
], ar.prototype, "behavior");
yn([
  u({ type: Boolean, reflect: !0 })
], ar.prototype, "isHoverable");
yn([
  u()
], ar.prototype, "variant");
customElements.get("cre8-table") === void 0 && customElements.define("cre8-table", ar);
const D7 = k`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
#TABLE BODY
\*------------------------------------*/

/**
* Set the host to display the contents within the table wrapper
*/
:host {
  display: contents;
}
`, xc = class xc extends M {
  render() {
    const e = this.componentClassNames("cre8-c-table__body", {});
    return f`
      <tbody role="rowgroup" class="${e}">
        ${f`<slot></slot>`}
      </tbody>
    `;
  }
};
xc.styles = [D7];
let vs = xc;
customElements.get("cre8-table-body") === void 0 && customElements.define("cre8-table-body", vs);
const O7 = k`
@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
#TABLE CELL
\*------------------------------------*/

/**
* Set the host to display the contents within the table row wrapper
*/
:host {
    display: contents;
}

.cre8-c-table__cell {
    display: var(--cre8-table-row-display, table-cell);
    border-bottom-width: var(--cre8-table-cell-border-bottom-width, var(--cre8-border-width-default));
    border-bottom-style: var(--cre8-border-style-default);
    border-bottom-color: var(--cre8-table-cell-border-bottom-color, var(--cre8-color-border-default));
    padding: var(--cre8-spacing-8);
    text-align: left;

    &:before {
        @include cre8-typography-label-default;
        display: block;
        content: var(--cre8-table-cell-before-content, none);

        @media all and (min-width:$cre8-breakpoint-md) {
            content: none;
        }
    }

    @media all and (min-width:$cre8-breakpoint-md) {
        display: table-cell;
    }
}

.cre8-c-table__cell--bare {
    border-bottom-color: transparent;
}
`;
var H7 = Object.defineProperty, ra = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && H7(e, t, i), i;
};
const _c = class _c extends M {
  render() {
    const e = this.componentClassNames("cre8-c-table__cell", {
      "cre8-c-table__cell--bare": this.variant === "bare"
    });
    return f`
      <td
        data-header="${this.dataHeader}"
        role="cell"
        colspan=${$(this.colspan)}
        class="${e}"
      >
        ${f`<slot></slot>`}
      </td>
    `;
  }
};
_c.styles = [O7];
let Fr = _c;
ra([
  u({ type: Number })
], Fr.prototype, "colspan");
ra([
  u()
], Fr.prototype, "variant");
ra([
  u()
], Fr.prototype, "dataHeader");
customElements.get("cre8-table-cell") === void 0 && customElements.define("cre8-table-cell", Fr);
const I7 = k`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
#TABLE HEADER
\*------------------------------------*/

/**
* Set the host to display the contents within the table wrapper
*/
:host {
  display: contents;
}

/**
 * Table header stlyes
 * 1) Responsive table header behavior
 * 2) Override row behavior and variants
 */
.cre8-c-table__header {
  display: var(--cre8-table-header-display, table-header-group); /* 1 */
  text-align: left;
  --cre8-table-row-odd-background: none; /* 2 */
  --cre8-table-row-odd-hover-background: none; /* 2 */

  /**
   * Override responsive setting
   */
  @media all and (min-width:$cre8-breakpoint-md) {
    display: table-header-group;
  }
}
`, wc = class wc extends M {
  render() {
    const e = this.componentClassNames("cre8-c-table__header", {});
    return f`
      <thead role="rowgroup" class="${e}">
        ${f`<slot></slot>`}
      </thead>
    `;
  }
};
wc.styles = [I7];
let ys = wc;
customElements.get("cre8-table-header") === void 0 && customElements.define("cre8-table-header", ys);
const B7 = k`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
#TABLE HEADER CELL
\*------------------------------------*/

/**
* Set the host to display the contents within the table header > table row wrapper
*/
:host {
  display: contents;
}

.cre8-c-table__header-cell {
  @include cre8-typography-label-small;

  border-bottom: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  padding: var(--cre8-spacing-8);
  text-align: left;
}`;
var V7 = Object.defineProperty, Wd = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && V7(e, t, i), i;
};
const kc = class kc extends M {
  render() {
    const e = this.componentClassNames("cre8-c-table__header-cell", {});
    return f`
      <th
        role="columnheader"
        colspan=${$(this.colspan)}
        class="${e}"
        style="width: ${$(this.width)}"
      >
        ${f`<slot></slot>`}
      </th>
    `;
  }
};
kc.styles = [B7];
let Ni = kc;
Wd([
  u()
], Ni.prototype, "colspan");
Wd([
  u()
], Ni.prototype, "width");
customElements.get("cre8-table-header-cell") === void 0 && customElements.define("cre8-table-header-cell", Ni);
const N7 = k`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
#TABLE OBJECT
\*------------------------------------*/

:host {
    display: block;
}

.cre8-c-table-object__header {
    padding-top: var(--cre8-spacing-8);
    padding-bottom: var(--cre8-spacing-8);
}

.cre8-c-table-object__footer {
    padding-top: var(--cre8-spacing-8);
    padding-bottom: var(--cre8-spacing-8);
}
`, $c = class $c extends M {
  render() {
    const e = this.componentClassNames("cre8-c-table-object", {});
    return f`
      <div class="${e}">
        ${this.slotNotEmpty("header") && f`
          <div class="cre8-c-table-object__header" part="header">
            <slot name="header"></slot>
          </div>
        `}
        <div class="cre8-c-table-object__body">
          <slot></slot>
        </div>
        ${this.slotNotEmpty("footer") && f`
          <div class="cre8-c-table-object__footer">
            <slot name="footer"></slot>
          </div>
        `}
      </div>
    `;
  }
};
$c.styles = [N7];
let Cs = $c;
customElements.get("cre8-table-object") === void 0 && customElements.define("cre8-table-object", Cs);
const R7 = k`
@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
#TABLE ROW
\*------------------------------------*/

/**
* Set the host to display the contents within the table header or table body wrapper
*/
:host {
    display: contents;
}

/**
* 1) Row of the cre8 table
*/
.cre8-c-table__row {
    display: var(--cre8-table-row-display, table-row);
    border-bottom: var(--cre8-table-row-border-bottom);

    /**
    * Table row hover state
    * 1) Set the row hover background via custom property to allow
    * the table variant to control the color
    */
    &:hover {
        background: var(--cre8-table-row-hover-background);
    }

    /**
    * Table row within odd cre8-table-row wrappers
    * 1) Set the odd row and odd row hover background via
    * custom property to allow the table variant to control the color
    */
    :host(:nth-child(odd)) & {
        background: var(--cre8-table-row-odd-background, none);

        &:hover {
            background: var(--cre8-table-row-odd-hover-background, inherit);
        }
    }

    @media all and (min-width:$cre8-breakpoint-md) {
        border-bottom: inherit;
        display: table-row;
    }
}

/**
 * Bare variant to remove border
 */
.cre8-c-table__row--bare {
    --cre8-table-cell-border-bottom-color: transparent;
}

/**
* Slotted table row in expanded content following expandable table row
* 1) Don't show the collapsed table row by default
*/
.cre8-c-table__row--expandable + ::slotted(cre8-table-row) {
    display: none; /* 1 */
}

.cre8-c-table__row--expandable.cre8-is-expanded {
    --cre8-table-cell-border-bottom-color: transparent;
}

/**
* Slotted table row in expanded content following expanded table row class
* 1) Display contents to get the proper table-row display for the row
*/
.cre8-c-table__row--expandable.cre8-is-expanded + ::slotted(cre8-table-row) {
    display: contents; /* 1 */
}

/**
* Button that expands the next table row
*/
.cre8-c-table__expand-button {
    background-color: var(--cre8-color-bg-transparent);
    border-width: var(--cre8-border-width-none);
}

/**
* Text within the button that expands the next table row
*/
.cre8-c-table__expand-button-text {
    @include visuallyHidden;
}

/**
* Icon within the button that expands the next table row
*/
.cre8-c-table__expand-button-icon {
    display: block;
    transition: transform 0.2s ease;

    /**
    * Icon within the button that expands the next table row when the table row is expanded
    * 1) Rotate the icon to show that it's open
    */
    .cre8-is-expanded & {
        transform: rotate(90deg); /* 1 */
    }
}
`;
var z7 = Object.defineProperty, ro = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && z7(e, t, i), i;
};
const Mc = class Mc extends M {
  constructor() {
    super(...arguments), this.expandedButtonText = "Collapse Table Row", this.collapsedButtonText = "Expand Table Row";
  }
  toggleIsExpanded() {
    this.isExpanded = !this.isExpanded, this.classList.contains("cre8-is-expanded") ? this.classList.remove("cre8-is-expanded") : this.classList.add("cre8-is-expanded");
  }
  render() {
    const e = this.componentClassNames("cre8-c-table__row", {
      "cre8-c-table__row--expandable": this.isExpandable,
      "cre8-c-table__row--bare": this.variant === "bare",
      "cre8-is-expanded": this.isExpanded
    });
    return f`
      <tr role="row" class="${e}">
        ${this.isExpandable ? f`<cre8-table-cell>
              <button
                class="cre8-c-table__expand-button" 
                aria-expanded=${!!this.isExpanded}
                @click=${this.toggleIsExpanded}
              >
                <span class="cre8-c-table__expand-button-text">
                  ${this.isExpanded ? this.expandedButtonText : this.collapsedButtonText}
                </span>
                <cre8-icon svg='${dt}' rotate="90" class="cre8-c-table__expand-button-icon"></cre8-icon>
              </button>
            </cre8-table-cell>` : ""}
        ${f`<slot></slot>`}
      </tr>
      ${this.isExpandable ? f` <slot class="cre8-c-table__expandable-content" name="expandableContent"><slot></slot></slot>` : ""}
    `;
  }
};
Mc.styles = [R7];
let Et = Mc;
ro([
  u({ type: Boolean, reflect: !0 })
], Et.prototype, "isExpanded");
ro([
  u({ type: Boolean, reflect: !0 })
], Et.prototype, "isExpandable");
ro([
  u()
], Et.prototype, "variant");
ro([
  u()
], Et.prototype, "expandedButtonText");
ro([
  u()
], Et.prototype, "collapsedButtonText");
customElements.get("cre8-table-row") === void 0 && customElements.define("cre8-table-row", Et);
const F7 = k`/**
 * Border-Box http:/paulirish.com/2012/box-sizing-border-box-ftw/
 */
*,
::slotted(*),
*:before,
*:after {
  box-sizing: border-box;
}

:root {
  --size-base-unit: 0.5rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir=rtl] {
  --rtlTranslateX: 50%;
  /* 1 */
  --rtlGradientToRight: 270deg;
  /* 2 */
  --rtlRotate45Inverse: -45deg;
  /* 3 */
}

/**
 * Visible focus outline for elements on a light background
 */
/**
 * Visible focus outline for elements with an error status
 */
/**
 * Visible focus outline for elements on a dark background
 */
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
/**
 * Visually hidden from display
 */
/*
=======
Animations
=======
*/
:host {
  --cre8-z-index-1: 1;
  --cre8-z-index-50: 50;
  --cre8-z-index-100: 100;
  --cre8-z-index-200: 200;
  --cre8-z-index-1030: 1030;
  --cre8-anim-fade-quick: 0.35s;
  --cre8-anim-ease: ease;
}

@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}
@keyframes slideIn {
  100% {
    transform: translateX(0);
  }
}
@keyframes slideInFwd {
  100% {
    width: 272px;
    height: 272px;
  }
}
@keyframes slideOutRight {
  100% {
    width: 272px;
    height: 272px;
  }
}
@keyframes slideUp {
  100% {
    transform: translateY(0);
  }
}
@media (width >= 481px) {
  @keyframes slideInFwd {
    100% {
      width: 417px;
      height: 417px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 417px;
      height: 417px;
    }
  }
}
@media (width >= 48rem) {
  @keyframes slideInFwd {
    100% {
      width: 330px;
      height: 330px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 330px;
      height: 330px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 60rem) {
  @keyframes slideInFwd {
    100% {
      width: 460px;
      height: 460px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 460px;
      height: 460px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 75rem) {
  @keyframes slideInFwd {
    100% {
      width: 592px;
      height: 591px;
    }
  }
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}
@media (width >= 87.5rem) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 120px));
    }
  }
}
@media (width >= 2200px) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 592px));
    }
  }
}
span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 600ms linear;
  background-color: var(--ripple-bg-color);
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 1;
  }
}
:root {
  --size-base-unit: 0.5rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir=rtl] {
  --rtlTranslateX: 50%;
  /* 1 */
  --rtlGradientToRight: 270deg;
  /* 2 */
  --rtlRotate45Inverse: -45deg;
  /* 3 */
}

/**
 * Visible focus outline for elements on a light background
 */
/**
 * Visible focus outline for elements with an error status
 */
/**
 * Visible focus outline for elements on a dark background
 */
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
/**
 * Visually hidden from display
 */
/*------------------------------------*\
 #TABS
\*------------------------------------*/
:host {
  display: block;
}

/**
 * Tabs header
 */
.cre8-c-tabs__header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  overflow: hidden;
  /**
   * Tabs inner where the beginning of the tabs list isn't fully in the viewport
   */
  /**
   * Tabs inner where the end of the tabs list isn't fully in the viewport
   */
}
.cre8-c-tabs:not(.cre8-is-start) .cre8-c-tabs__header {
  /**
   * Left overflow gradient for the tabs list
   */
}
.cre8-c-tabs:not(.cre8-is-start) .cre8-c-tabs__header::before {
  content: "";
  display: block;
  position: absolute;
  pointer-events: none;
  background: linear-gradient(var(--rtlGradientToRight, 90deg), var(--cre8-color-bg-default), rgba(255, 255, 255, 0.001) 30%);
  height: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
  width: 48px;
  z-index: 1;
}
.cre8-c-tabs:not(.cre8-is-end) .cre8-c-tabs__header {
  /**
   * Right overflow gradient for the tabs list
   */
}
.cre8-c-tabs:not(.cre8-is-end) .cre8-c-tabs__header::after {
  content: "";
  display: block !important;
  position: absolute;
  pointer-events: none;
  background: linear-gradient(var(--rtlGradientToRight, 90deg), rgba(255, 255, 255, 0.001) 30%, var(--cre8-color-bg-default));
  height: 100%;
  inset-block-start: 0;
  inset-inline-end: 0;
  width: 48px;
  z-index: 1;
}

/**
 * Tabs list
 * 1) The div that contains the cre8-tab's
 */
.cre8-c-tabs__list {
  display: flex;
  overflow: auto;
  width: 100%;
  margin: 0;
  position: relative;
  padding: var(--cre8-border-width-focus);
  /**
   * Visually hides the scrollbar
   */
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.cre8-c-tabs__list::-webkit-scrollbar {
  display: none;
}

/**
 * Tabs body
 * 1) The div that contains the tab panel content
 */
.cre8-c-tabs__body {
  padding-block-start: 16px;
  /**
   * Full Width Variant - border default bar across tabs
   */
}
.cre8-c-tabs--full-width .cre8-c-tabs__body {
  border-top: var(--cre8-border-width-tab-selected) var(--cre8-border-style-default) var(--cre8-color-border-default);
  margin-top: calc(var(--cre8-border-width-tab-selected) * -2);
}
/* sourceMappingURL=tabs.module.css.map */
`;
var Z7 = Object.defineProperty, nt = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Z7(e, t, i), i;
};
let L1 = 1;
const Lc = class Lc extends M {
  /**
   * Initialize Functions
   */
  constructor() {
    super(), this.activeIndex = 0, this.isStart = !0, this.isEnd = !1, this.handleScroll = this.handleScroll.bind(this), this.handleResize = this.handleResize.bind(this), this.setIsStart = this.setIsStart.bind(this), this.setIsEnd = this.setIsEnd.bind(this), this.emitEvent = this.emitEvent.bind(this), this.tabId = `cre8-tabpanel-${L1}`, L1 += 1;
  }
  /**
   * Query the document direction value
   *
   * _*This property is dynamically set_
   */
  get isRTL() {
    return document.dir === "rtl";
  }
  /**
   * Connected Callback Lifecycle
   * 1. Fires each time a custom element is appended into a document-connected element.
   */
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("resize", this.handleResize);
  }
  /**
   * Disconnected Callback Lifecycle
   * 1. Removes the event listeners to ensure that any memory allocated by your component
   *    will be cleaned up when your component is destroyed or disconnected from the page.
   */
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("resize", this.handleResize);
  }
  /**
   * First Updated Lifecycle Hook
   * 1. Sets the `aria-labelledby` prop for accessible tabs if user doesn't define the `ariaLabelledBy` prop.
   * 2. Sets the active tab if activeIndex is defined. Otherwise, set the first tab as active by default.
   * 3. Initialize isStart and isEnd.
   * 4. Set the varaint on the cre8-tab according to the cre8-tabs variant.
   */
  async firstUpdated() {
    this.setTabAttributes(), await this.updateComplete, this.activeTab = this._Cre8TabItems[this.activeIndex] || this._Cre8TabItems[0], this.setActiveTab(), this.setIsStart(), this.setIsEnd(), this.setTabVariant();
  }
  /**
   * Updated Lifecycle Hook
   * 1. remove selected state from previously selected tab
   * 2. Checks to see if the old `activeIndex` property has been updated.
   *    If the new value doesn't equal the old value, activate the proper tab
   */
  async updated(e) {
    e.forEach(async (t, o) => {
      o === "activeIndex" && this.activeIndex !== t && (await this.updateComplete, this.activeTab && this.removePreviousActiveTab(), this.activeTab = this._Cre8TabItems[this.activeIndex], this.setActiveTab());
    });
  }
  /**
   * Handle Resize
   * 1. On resize, if position from left is greater than 0, set isStart to false. Otherwise set isStart to true.
   * 2. On resize, If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false.
   * @fires resize
   */
  handleResize() {
    this.setIsStart(), this.setIsEnd();
  }
  /**
   * Handle Scroll
   * 1. On scroll, if position from left is greater than 0, set isStart to false. Otherwise set isStart to true.
   * 2. On scroll, If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false.
   * @fires scroll
   */
  handleScroll() {
    this.setIsStart(), this.setIsEnd();
  }
  /**
   * Set isStart State
   * 1. If position from left is greater than 0, set isStart to false. Otherwise set isStart to true.
   */
  setIsStart() {
    this.isRTL ? this._Cre8TabsHeaderList.scrollLeft > 0 ? this.isStart = !0 : this.isStart = !1 : this._Cre8TabsHeaderList.scrollLeft > 0 ? this.isStart = !1 : this.isStart = !0;
  }
  /**
   * Set isEnd State
   * 1. If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false.
   */
  setIsEnd() {
    this.isInViewport() === !0 ? this.isEnd = !0 : this.isEnd = !1;
  }
  /**
   * Check if last overflow list item is in the viewport
   * 1. Get children of the overflow list inner container and get bounding client rectangle of last child
   * 2. Return true if the left property is greater than or equal to 0 and if the right property is less
   * than or equal to the window inner width or document client width
   */
  isInViewport() {
    const t = this._Cre8TabItems[this._Cre8TabItems.length - 1].shadowRoot?.querySelector(".cre8-c-tab");
    if (!t)
      return !1;
    const o = t.getBoundingClientRect(), i = window.innerWidth || document.documentElement.clientWidth;
    return o.left >= 0 && o.right <= i;
  }
  /**
   * Set Tab Variant
   * 1. Loop through all the cre8-tab Components and set the size to 'sm' if the parent has size 'sm'.
   */
  setTabVariant() {
    this.size === "sm" && this._Cre8TabItems.forEach((e) => {
      e.size = "sm";
    });
  }
  /**
   * Set the attributes on tab and tab panel
   * 1. Sets the index value on the tab items.
   * 2. Sets the `aria-labelledby` on the tab items.
   * 3. Set the index and id on the tab-panel to match the tab.
   */
  setTabAttributes() {
    this._Cre8TabItems.forEach((e, t) => {
      e.index = t;
      const i = e.ariaLabelledBy || ee();
      e.ariaLabelledBy = i;
      const n = this._Cre8TabPanels[t];
      n.index = t;
    });
  }
  /**
   * Set Active Tab
   * 1. Sets the active state for the selected tab.
   * 2. Sets the active state for the tab panel with the same index value as the selected tab.
   */
  setActiveTab() {
    this.activeTab.isActive = !0;
    const e = this._Cre8TabPanels.find((t) => t.index === this.activeTab.index);
    e && (e.isActive = !0);
  }
  /**
   * Set Active Tab Focus
   */
  setActiveTabFocus() {
    this.activeTab.shadowRoot?.querySelector(".cre8-c-tab").focus();
  }
  /**
   * Handle Tab Selected
   * 1. Only continue if event target is a tab
   * 2. If tab is active, make the previous selected tab inactive.
   * 3. Set the clicked tab active.
   * 4. Emit the custom event.
   * @fires tabSelected
   */
  handleTabSelected(e) {
    const { target: t } = e;
    if (this._Cre8TabItems.includes(t)) {
      this.activeTab && this.removePreviousActiveTab(), this.activeTab = t;
      const o = this._Cre8TabItems.findIndex((i) => i === this.activeTab);
      this.activeIndex = o, this.setActiveTab(), this.emitEvent();
    }
  }
  /**
   * Handle Keydown
   * 1. If the active tab is not focused then handle the keydown events.
   * 2. On keydown of the right arrow, make the next tab active.
   * 3. On keydown of the left arrow, make the previous tab active.
   * 4. On keydown of the home key, make the first tab active.
   * 5. On keydown of the end key, make the last tab active.
   * 6. On keydown of the escape key, remove the focus.
   * @fires keydown
   */
  handleKeydown(e) {
    const { target: t } = e;
    if (document.activeElement.matches("cre8-tab"))
      switch (e.key) {
        /* 2 */
        case "ArrowRight":
          e.preventDefault(), this.setSelectedToNextTab(t);
          break;
        /* 3 */
        case "ArrowLeft":
          e.preventDefault(), this.setSelectedToPreviousTab(t);
          break;
        /* 4 */
        case "Home":
          e.preventDefault(), this.setSelectedToNextTab(this._Cre8TabItems[this._Cre8TabItems.length - 1]);
          break;
        /* 5 */
        case "End":
          e.preventDefault(), this.setSelectedToPreviousTab(this._Cre8TabItems[0]);
          break;
        /* 6 */
        case "Escape":
          this.activeTab.blur();
          break;
      }
  }
  /**
   * Set Selected To Previous Tab
   * 1. Get current selected Tab index then deactivate previously selected tab.
   * 2. If current activeIndex is in first position then move the tab focus to last tab.
   * 3. Set the active tab and focus.
   * 4. Emit custom event.
   * @fires tabChange
   */
  setSelectedToPreviousTab(e) {
    const t = e.index;
    this.removePreviousActiveTab();
    const o = this._Cre8TabItems.length - 1;
    if (t === 0)
      this.activeIndex = o, this.activeTab = this._Cre8TabItems[o];
    else {
      const i = t - 1;
      this.activeIndex = i, this.activeTab = this._Cre8TabItems[i];
    }
    this.setActiveTab(), this.setActiveTabFocus(), this.emitEvent();
  }
  /**
   * Set Selected To Next Tab
   * 1. Get current selected Tab index then deactivate previously selected tab.
   * 2. If current activeIndex is in last position then move the tab focus to first tab.
   * 3. Set the active tab and focus.
   * 4. Emit custom event.
   * @fires tabChange
   */
  setSelectedToNextTab(e) {
    const t = e.index;
    this.removePreviousActiveTab();
    const o = this._Cre8TabItems.length - 1;
    if (t === o)
      this.activeIndex = 0, this.activeTab = this._Cre8TabItems[0];
    else {
      const i = t + 1;
      this.activeIndex = i, this.activeTab = this._Cre8TabItems[i];
    }
    this.setActiveTab(), this.setActiveTabFocus(), this.emitEvent();
  }
  /**
   * Remove Active from Previous Tab
   * 1. Get current selected Tab index then deactivate previously selected tab
   * 2. If current activeIndex is in first position then move the tab focus to last tab
   */
  removePreviousActiveTab() {
    this.activeTab.isActive = !1;
    const e = this._Cre8TabPanels.find((t) => t.index === this.activeTab.index);
    e && (e.isActive = !1);
  }
  /**
   * Emit custom event
   */
  emitEvent() {
    const e = new CustomEvent("tabChange", {
      detail: {
        value: this.activeTab,
        activeTabIndex: this.activeIndex
      },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  render() {
    const e = this.componentClassNames("cre8-c-tabs", {
      "cre8-is-start": this.isStart === !0,
      "cre8-is-end": this.isEnd === !0,
      "cre8-c-tabs--full-width": this.fullWidth
    });
    return f`
        <div class="${e}">
            <div class="cre8-c-tabs__header">
                <div
                    class="cre8-c-tabs__list"
                    role="tablist"
                    tabindex=0
                    @scroll=${this.handleScroll}
                    @keydown=${this.handleKeydown}
                    @click=${this.handleTabSelected}
                >
                    <slot></slot>
                </div>
            </div>
            <div class="cre8-c-tabs__body">
                <slot name="panel"></slot>
            </div>
        </div>
    `;
  }
};
Lc.styles = [F7];
let De = Lc;
nt([
  u()
], De.prototype, "size");
nt([
  u({ type: Boolean, reflect: !0 })
], De.prototype, "fullWidth");
nt([
  u({ type: Number })
], De.prototype, "activeIndex");
nt([
  R()
], De.prototype, "activeTab");
nt([
  R()
], De.prototype, "isStart");
nt([
  R()
], De.prototype, "isEnd");
nt([
  on()
], De.prototype, "_Cre8TabItems");
nt([
  on({ slot: "panel" })
], De.prototype, "_Cre8TabPanels");
nt([
  oe(".cre8-c-tabs__header")
], De.prototype, "_Cre8TabsHeader");
nt([
  oe(".cre8-c-tabs__list")
], De.prototype, "_Cre8TabsHeaderList");
customElements.get("cre8-tabs") === void 0 && customElements.define("cre8-tabs", De);
const j7 = k`@import '../../design-tokens/core/scss/theming/component';

/* ------------------------------------*\
    #TAG
\*------------------------------------ */

:host {
  display: inline-flex;
}

.cre8-c-tag {
  @include cre8-typography-label-small;
  display: flex;
  align-items: center;
  background-color: var(--cre8-color-bg-default);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  color: var(--cre8-color-content-default);
  cursor: pointer;
  gap: var(--cre8-spacing-8);
  padding: var(--cre8-spacing-4) var(--cre8-spacing-16);
  transition: all var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  white-space: nowrap;
}

.cre8-c-tag--square {
  border-radius: var(--cre8-border-radius-small);
}

.cre8-c-tag--round {
  border-radius: var(--cre8-border-radius-round);
}

.cre8-c-tag--neutral {

  &:hover,
  &:focus {
    background-color: var(--cre8-color-bg-default-hover); 
    border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  }
}

.cre8-c-tag--branded {
  background-color: var(--cre8-color-bg-brand);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-transparent);

  &:hover,
  &:focus {
    background-color: var(--cre8-color-bg-brand-hover); 
  }
}

.cre8-c-tag--neutral-hybrid {
  color: var(--cre8-color-content-brand);

  &:hover,
  &:focus {
    background-color: var(--cre8-color-bg-default-hover); 
  }
}

.cre8-c-tag--neutral-selected,
.cre8-c-tag--neutral-hybrid-selected {
  background-color: var(--cre8-color-bg-brand-strong);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-transparent);
  color: var(--cre8-color-content-knockout);

  &:hover,
  &:focus {
    background-color: var(--cre8-color-bg-brand-strong-hover);
  }
}

.cre8-c-tag--branded-selected {
  background-color: var(--cre8-color-bg-brand-xstrong);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-transparent);
  color: var(--cre8-color-content-knockout);

  &:hover,
  &:focus {
    background-color: var(--cre8-color-bg-brand-xstrong-hover);
  }
}

.cre8-c-tag:focus {
  outline: var(--cre8-border-width-focus) var(--cre8-border-style-default) var(--cre8-color-border-active-outline);
  outline-offset: var(--cre8-border-width-focus);
}

.cre8-c-tag.cre8-c-tag--disabled,
.cre8-c-tag.cre8-c-tag--disabled:hover,
.cre8-c-tag.cre8-c-tag--disabled:focus {
  background-color: var(--cre8-color-bg-disabled);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-disabled);
  color: var(--cre8-color-content-disabled);
  cursor: not-allowed;
  outline: none;
}

.cre8-c-tag__input {
  @include cre8-typography-body-small;
  display: none;
}

.cre8-tag-text{
  cursor: pointer;
}

.cre8-c-tag--disabled > .cre8-tag-text {
  cursor: not-allowed;
}

cre8-icon {
  display: flex;
  align-items: center;
}
`;
var W7 = Object.defineProperty, Vt = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && W7(e, t, i), i;
};
const Sc = class Sc extends le {
  constructor() {
    super(...arguments), this.variant = "neutral", this.shape = "square";
  }
  connectedCallback() {
    super.connectedCallback(), this.fieldId = this.fieldId || ee(), window.addEventListener("click", this._clickCheckHandler, !1), window.addEventListener("click", this._clickRadioHandler, !1), window.addEventListener("keydown", this._handleCheckKeyDown, !1), window.addEventListener("keydown", this.handleRadioKeyDown, !1);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("click", this._clickCheckHandler, !1), window.removeEventListener("click", this._clickRadioHandler, !1), window.removeEventListener("keydown", this._handleCheckKeyDown, !1), window.removeEventListener("keydown", this.handleRadioKeyDown, !1);
  }
  renderCheckboxIcon() {
    return this.type === "checkbox" && this.isSelected ? f`
    <cre8-icon svg="${Ci}" class="cre8-tag-icon" aria-hidden="true"></cre8-icon>
     ` : null;
  }
  _clickCheckHandler() {
    this.isDisabled || (this.type === "checkbox" && (this.isSelected = !this.isSelected), this.dispatchEvent(new CustomEvent("change", { detail: { isSelected: this.isSelected, type: this.type } })));
  }
  _handleCheckKeyDown(e) {
    (e.key === " " || e.key === "Enter") && (e.preventDefault(), this._clickCheckHandler());
  }
  /**
  * Reset the radio tag field
  */
  resetField() {
    this._internals.setFormValue(null);
  }
  /**
  * Reset the radio field tags tab indeces
  */
  resetTabIndeces(e) {
    e.forEach((t) => {
      t.shadowRoot.querySelector(".cre8-c-tag").setAttribute("tabindex", "0");
    });
  }
  /**
  * Remove checked
  * 1) Remove checked property from all tags and set tabindex to -1
  * 2) Reset the form field to not checked
  */
  _removeChecked() {
    this.parentNode && this.parentNode.querySelectorAll("cre8-tag").forEach((t) => {
      t.isSelected = !1, t.shadowRoot.querySelector(".cre8-c-tag").setAttribute("tabindex", "-1"), t.resetField();
    });
  }
  /**
  * Reset form callback
  * 1) Remove the checked state from all radio tags
  * 2) Set the checked state to the initial checked state
  * 3) Set the radio field input checked attribute to the initial checked state
  */
  formResetCallback() {
    this._removeChecked(), this.isSelected = this.initialSelected, this.field.checked = this.initialSelected;
  }
  _clickRadioHandler() {
    this._removeChecked(), this.isSelected = !this.isSelected;
    const e = this.shadowRoot?.querySelector(".cre8-c-tag");
    e && e.setAttribute("tabindex", "0"), this.isSelected ? this._internals.setFormValue(this.value || "on") : this._internals.setFormValue(null);
  }
  _updateSibling(e, t, o) {
    e.preventDefault(), this._removeChecked(), o.focus(), o.setAttribute("tabindex", "0"), t.setAttribute("isSelected", "");
  }
  _checkPreviousTag(e) {
    let t = this.previousElementSibling;
    for (; t; ) {
      const o = t?.shadowRoot?.querySelector(
        '.cre8-c-tag:not([aria-disabled="true"])'
      );
      if (o) {
        this._updateSibling(e, t, o);
        return;
      }
      t = t.previousElementSibling;
    }
  }
  _checkNextTag(e) {
    let t = this.nextElementSibling;
    for (; t; ) {
      const o = t?.shadowRoot?.querySelector(
        '.cre8-c-tag:not([aria-disabled="true"])'
      );
      if (o) {
        this._updateSibling(e, t, o);
        return;
      }
      t = t.nextElementSibling;
    }
  }
  handleRadioKeyDown(e) {
    if (e.code === "ArrowLeft" || e.code === "ArrowUp")
      this._checkPreviousTag(e);
    else if (e.code === "ArrowRight" || e.code === "ArrowDown")
      this._checkNextTag(e);
    else if (e.code === "Tab" && !this.isSelected) {
      const t = this.parentNode.querySelectorAll("cre8-tag");
      t.forEach((o) => {
        o.shadowRoot.querySelector(".cre8-c-tag").setAttribute("tabindex", "-1");
      }), setTimeout(this.resetTabIndeces, 100, t);
    }
  }
  /**
  * access role when tag embedded in tag-list
  */
  _getRole() {
    if (this.closest("cre8-tag-list"))
      return "listitem";
  }
  render() {
    const e = this.componentClassNames("cre8-c-tag", {
      [`cre8-c-tag--${this.type}`]: !0,
      [`cre8-c-tag--${this.shape}`]: !0,
      [`cre8-c-tag--${this.variant}`]: !0,
      [`cre8-c-tag--${this.variant}-selected`]: this.isSelected,
      "cre8-c-tag--disabled": this.isDisabled
    }), t = this.isSelected === !0 || this.initialSelected === !0;
    return f` 
        <div role="${$(this._getRole())}">
            <div role="${$(this.type)}" aria-checked="${t}" class="${e}"
                aria-disabled="${$(this.isDisabled)}"
                @click="${this.type === "radio" ? this._clickRadioHandler : this._clickCheckHandler}"
                @keydown="${this.type === "radio" ? this.handleRadioKeyDown : this._handleCheckKeyDown}"
                tabindex="0"
            >
                ${this.renderCheckboxIcon()}
                <label 
                    @input="${this.type === "radio" ? this._clickRadioHandler : this._clickCheckHandler}"
                    for="${this.fieldId}" class="cre8-tag-text">${this.text}
                </label>
            </div>
            <input
                class="cre8-c-tag__input" 
                type="${this.type}"
                id="${this.fieldId}"
                name=${this.text}
                .value="${this.text}"
                ?disabled="${this.isDisabled}"
                .checked = "${t}"
            />
        </div>
  `;
  }
};
Sc.styles = [j7];
let Ue = Sc;
Vt([
  u()
], Ue.prototype, "text");
Vt([
  u()
], Ue.prototype, "type");
Vt([
  u()
], Ue.prototype, "variant");
Vt([
  u()
], Ue.prototype, "shape");
Vt([
  u({ type: Boolean })
], Ue.prototype, "isDisabled");
Vt([
  u({ type: Boolean })
], Ue.prototype, "isSelected");
Vt([
  oe("input")
], Ue.prototype, "field");
Vt([
  u()
], Ue.prototype, "fieldId");
customElements.get("cre8-tag") === void 0 && customElements.define("cre8-tag", Ue);
const q7 = k`@import '../../design-tokens/core/scss/theming/component';

/** 
 * 1) Fieldset used for tags
 */
.cre8-c-tag-list {
  border: none;
  padding: 0;
  margin: 0;
  gap: var(--cre8-spacing-16);
}

.cre8-c-tag-list__legend {
  margin-bottom: var(--cre8-spacing-16);
}

/**
 * Slotted tag items
 */
::slotted(cre8-tag) {
  margin-bottom: var(--cre8-spacing-16);
  margin-right: var(--cre8-spacing-8);
}

.cre8-c-tag-list__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
`;
var U7 = Object.defineProperty, qd = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && U7(e, t, i), i;
};
const Ac = class Ac extends M {
  firstUpdated() {
    this._initializeAria();
  }
  _initializeAria() {
    this.fieldId = this.fieldId || ee();
  }
  render() {
    const e = this.componentClassNames("cre8-c-tag-list", {});
    return f`
      <fieldset class="${e}">
        <legend class="cre8-c-tag-list__legend">${this.label}</legend>
        <div class="cre8-c-tag-list__list" role="list">   
          <slot></slot>
        </div>
      </fieldset>
      `;
  }
};
Ac.styles = [q7];
let Ri = Ac;
qd([
  u()
], Ri.prototype, "label");
qd([
  u()
], Ri.prototype, "fieldId");
customElements.get("cre8-tag-list") === void 0 && customElements.define("cre8-tag-list", Ri);
const Y7 = k`@import '../../design-tokens/core/scss/theming/component';
/*------------------------------------*\
 #TERTIARY-NAV
\*------------------------------------*/ 

:host {
  display: flex;
}

/**
 * Tertiary nav
 */
.cre8-c-tertiary-nav {
  width: 100%;
  max-width: calc(8px * 30);
}

/**
 * Tertiary nav full width
 */
.cre8-c-tertiary-nav--full-width {
  max-width: none;
}

/**
 * Tertiary nav list
 */
.cre8-c-tertiary-nav__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

`;
var X7 = Object.defineProperty, Ud = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && X7(e, t, i), i;
};
const Tc = class Tc extends M {
  constructor() {
    super(...arguments), this.navAriaLabel = "tertiary";
  }
  render() {
    const e = this.componentClassNames("cre8-c-tertiary-nav", {
      "cre8-c-tertiary-nav--full-width": this.fullWidth
    });
    return f`
      <nav aria-label="${this.navAriaLabel}" role="navigation" class="${e}">
        <ul role="list" class="cre8-c-tertiary-nav__list">
          <slot></slot>
        </ul>
      </nav>
    `;
  }
};
Tc.styles = [Y7];
let zi = Tc;
Ud([
  u({ type: Boolean, reflect: !0 })
], zi.prototype, "fullWidth");
Ud([
  u()
], zi.prototype, "navAriaLabel");
customElements.get("cre8-tertiary-nav") === void 0 && customElements.define("cre8-tertiary-nav", zi);
const K7 = k`@import '../../design-tokens/core/scss/theming/component';
/*------------------------------------*\
 #TERTIARY-NAV-ITEM
\*------------------------------------*/ 

:host {
  display: contents;
}

/**
 * Tertiary nav item link
 */
.cre8-c-tertiary-nav-item__link {
  @include cre8-typography-body-default();
  display: flex;
  align-items: center;
  gap: calc(8px * 1); 
  padding: calc(8px * 1) calc(8px * 1) calc(8px * 1) calc(8px * 2);
  color: var(--cre8-color-content-brand-strong);
  background-color: var(--cre8-color-bg-default);
  border-block-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-default);
  text-decoration: none;
  transition: all var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  width: 100%;

  /**
   * Tertiary nav item link hover & focus state
   */
  &:hover,
  &:focus {
    background-color: var(--cre8-color-bg-subtle);
  }

  /**
   * Tertiary nav item link focus visible state
   */
  &:focus-visible {
    @include focus;
  }

  /**
   * Tertiary nav item link active/current state
   */
  &:active,
  .cre8-is-current & {
    color: var(--cre8-color-content-default);
    background-color: var(--cre8-color-bg-subtle);
  }
}

`;
var G7 = Object.defineProperty, Yd = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && G7(e, t, i), i;
};
const Pc = class Pc extends M {
  /**
   * Handle on click
   * 1. On click, remove all isCurrent properties from all tertiary-nav items
   * 2. Add isCurrent to the item clicked
   */
  _handleOnClick() {
    this.closest("cre8-tertiary-nav").shadowRoot.querySelector("slot").assignedElements({ flatten: !1 }).forEach((o) => {
      o.isCurrent = !1;
    }), this.isCurrent = !0;
  }
  render() {
    const e = this.componentClassNames("cre8-c-tertiary-nav-item", {
      "cre8-is-current": this.isCurrent
    });
    return f`
      <li role="listitem" class="${e}">
        <a
          class="cre8-c-tertiary-nav-item__link"
          aria-current=${$(this.isCurrent ? "page" : void 0)}
          @click=${this._handleOnClick}
          href=${$(this.href)}
        >
          <slot></slot>
        </a>
      </li>
    `;
  }
};
Pc.styles = [K7];
let Fi = Pc;
Yd([
  u()
], Fi.prototype, "href");
Yd([
  u({ type: Boolean, reflect: !0 })
], Fi.prototype, "isCurrent");
customElements.get("cre8-tertiary-nav-item") === void 0 && customElements.define("cre8-tertiary-nav-item", Fi);
const J7 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) General text link used across the product
 */
.cre8-c-text-link {
  @include cre8-typography-body-default-link();
  display: inline-flex;
  color: var(--cre8-color-content-link);
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
    color: var(--cre8-color-content-link-hover);
  }

  &:active {
    color: var(--cre8-color-content-link-active);
  }

  &:visited {
    color: var(--cre8-color-content-link-visited);
  }
}

/**
* Display text link
* 1) Used for items like article title links
*/
.cre8-c-text-link--display {
  color: var(--cre8-color-content-default);
}

/**
 * A secondary link list
 * 1) Uses a more subtle treatment than the default link list
 */
.cre8-c-text-link--secondary {
  color: var(--cre8-color-content-subtle);
}

/**
* Inverted text link
* 1) Used on dark backgrounds
*/
.cre8-c-text-link--inverted {
  color: var(--cre8-color-content-knockout);
}

/**
* Small text link
* 1) Shrink the typography size
*/
.cre8-c-text-link--sm {
  @include cre8-typography-body-small();
}

/**
* Text link after
* 1) Container used to place items after the text link
*/
.cre8-c-text-link__after {
  margin-left: calc(8px * 1);
}
`;
var Q7 = Object.defineProperty, Cn = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && Q7(e, t, i), i;
};
const Ec = class Ec extends M {
  render() {
    const e = this.componentClassNames("cre8-c-text-link", {
      "cre8-c-text-link--inverted": this.inverted === !0,
      "cre8-c-text-link--display": this.variant === "display",
      "cre8-c-text-link--secondary": this.variant === "secondary",
      "cre8-c-text-link--sm": this.size === "sm"
    });
    return f`
      <a href="${$(this.href)}" class="${e}">
        <slot></slot>
        ${this.slotNotEmpty("linkAfter") && f`<div class="cre8-c-text-link__after">
          <slot name="linkAfter"></slot>
        </div>`}
      </a>
    `;
  }
};
Ec.styles = [J7];
let cr = Ec;
Cn([
  u()
], cr.prototype, "href");
Cn([
  u()
], cr.prototype, "variant");
Cn([
  u()
], cr.prototype, "size");
Cn([
  u({ type: Boolean, reflect: !0 })
], cr.prototype, "inverted");
customElements.get("cre8-text-link") === void 0 && customElements.define("cre8-text-link", cr);
const e9 = k`@import '../../design-tokens/core/scss/theming/component';
/*------------------------------------*\
 #TOOLTIP
\*------------------------------------*/

:host {
  display: inline-flex;
}

/** 
 * Tooltip
 * The main container that holds the trigger and panel
 */
.cre8-c-tooltip {
  position: relative;
  display: table;
}

/** 
 * Tooltip panel
 * The container for the tooltip panel heading, content, and footer
 */
.cre8-c-tooltip__panel {
  @include cre8-typography-body-default();
  opacity: 0;
  visibility: hidden;
  position: absolute;
  word-wrap: break-word;
  inset-block-start: calc(100% + #{calc(8px * 1.5)});
  inset-block-end: auto;
  inset-inline-start: 50%;
  inset-inline-end: auto;
  transform: translateX(var(--rtlTranslateX, -50%));
  display: flex;
  flex-direction: column;
  gap: calc(8px * 1);
  width: max-content;
  max-width: calc(8px * 35);
  z-index: 400;
  color: var(--cre8-color-content-knockout);
  background-color: var(--cre8-color-bg-strong);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  padding: calc(8px * 1);

  /**
   * Active state for tooltip panel
   */
  .cre8-is-active:not(.cre8-is-dynamic) &,
  .cre8-is-active.cre8-is-dynamic-active & {
    opacity: 1;
    visibility: visible;
  }

  /**
   * Tooltip panel positioned to the top of the trigger
   */
  .cre8-c-tooltip--top & {
    inset-block-start: auto;
    inset-block-end: calc(100% + #{calc(8px * 1.5)});
    inset-inline-start: 50%;
    inset-inline-end: auto;
    transform: translateX(var(--rtlTranslateX, -50%));
  }

  /**
   * Tooltip panel positioned to the left of the trigger
   */
  .cre8-c-tooltip--left & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: auto;
    inset-inline-end: calc(100% + #{calc(8px * 1.5)});
    transform: translateY(-50%);
  }

  /**
   * Tooltip panel positioned to the right of the trigger
   */
  .cre8-c-tooltip--right & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: calc(100% + #{calc(8px * 1.5)});
    inset-inline-end: auto;
    transform: translateY(-50%);
  }

  /**
   * Tooltip panel knockout
   */
  .cre8-c-tooltip--knockout & {
    background-color: var(--cre8-color-bg-default);
    color: var(--cre8-color-content-default);
  }
}

/**
 * Tooltip panel arrow
 */
.cre8-c-tooltip__panel::before {
  content: '';
  display: block;
  width: calc(8px * 1.5);
  height: calc(8px * 1.5);
  position: absolute;
  margin: auto;
  background-color: var(--cre8-color-bg-strong);
  border-block-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-inline-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  inset-block-start: calc((var(--cre8-border-width-default) + #{calc(8px * 0.75)}) * -1);
  inset-inline-start: 50%;
  transform: translateX(var(--rtlTranslateX, -50%)) rotate(45deg);

  /**
   * Moves the tooltip panel arrow to the top of the panel
   */
  .cre8-c-tooltip--top & {
    inset-block-start: auto;
    inset-block-end: calc((var(--cre8-border-width-default) + #{calc(8px * 0.75)}) * -1);
    border-block-start: none;
    border-inline-start: none;
    border-block-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  }

  /**
   * Moves the tooltip panel arrow to the right side of the panel
   */
  .cre8-c-tooltip--left & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: auto;
    inset-inline-end: calc((var(--cre8-border-width-default) + #{calc(8px * 0.75)}) * -1);
    border-block-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-start: none;
    border-block-end: none;
    border-inline-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    transform: translateY(-50%) rotate(var(--rtlRotate45Inverse, 45deg));
  }

  /**
   * Moves the tooltip panel arrow to the left side of the panel
   */
  .cre8-c-tooltip--right & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: calc((var(--cre8-border-width-default) + #{calc(8px * 0.75)}) * -1);
    inset-inline-end: auto;
    border-block-start: none;
    border-inline-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-block-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-end: none;
    transform: translateY(-50%) rotate(var(--rtlRotate45Inverse, 45deg));
  }

  /**
   * Tooltip arrow knockout
   */
  .cre8-c-tooltip--knockout & {
    background-color: var(--cre8-color-bg-default);
  }
}

/**
 * Tooltip footer
 * 1) The footer container in the panel
 */
.cre8-c-tooltip__footer {
  display: flex;
  gap: calc(8px * 2);
  justify-content: flex-end;
  flex-grow: 1;
}

/**
 * Tooltip trigger
 * 1) Add global focus state on keyboard focus
 */
.cre8-c-tooltip__trigger {
  cursor: pointer;

  &:focus-visible {
    @include focus;
  }
}

svg {
  display: flex;
  height: calc(8px * 2);
  width: calc(8px * 2);
}
`;
var t9 = Object.defineProperty, ze = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && t9(e, t, i), i;
};
const Dc = class Dc extends M {
  constructor() {
    super(...arguments), this.iconRotateDegree = 0, this.removeActive = () => {
      this.isActive && this.toggleActive();
    };
  }
  /**
   * Query the document direction value
   * <br/><br/> _*This property is dynamically set_
   */
  get isRTL() {
    return document.dir === "rtl";
  }
  /**
   * updated Callback Lifecycle
   * 1. Find the second slot
   * 2. Create a string from joining the textContent of the textnodes
   * 3. Set the textContent of the tip generated in the firstUpdated lifecycle callback
   * */
  updated() {
    const e = this.shadowRoot.querySelectorAll("slot")[1].assignedNodes().reduce(
      ((t, o) => `${t}${o.textContent.replace(/\n/g, "").trim()}`),
      ""
    );
    document.getElementById(this._uniqueId) && (document.getElementById(this._uniqueId).textContent = e);
  }
  /**
   * firstUpdated Callback Lifecycle
   * 1. If ariaDescribes is set
      * a. create an ID and assign it to the property _uniqueId
      * b. Generate an empty div, assign it the  _uniqueId and the tooltip role
  * 2. Set the aria-describedby on the ariaDescribes target
  */
  firstUpdated() {
    if (this.ariaDescribes) {
      this._uniqueId = this._uniqueId || ee();
      const e = new RegExp(`\\b${this._uniqueId}\\b`), t = document.createElement("div");
      t.setAttribute("role", "tooltip"), t.setAttribute("style", "position:fixed; left: -1000px; top: -1000px;"), t.id = this._uniqueId;
      const o = document.getElementById(this.ariaDescribes);
      o.parentNode.insertBefore(t, o);
      const i = o?.getAttribute("aria-describedBy");
      o?.setAttribute(
        "aria-describedby",
        `${i ? `${i.replace(e, "")} ` : ""}${this._uniqueId}`.trim()
      );
    }
  }
  /**
   * Connected Callback Lifecycle
   * 1. Add window mouseover event listener
   * 2. Add window mouseout event listener
   * 3. Add mousedown event listener
   * 4. Set the id and aria-describedby
   */
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("mouseover", this.toggleActive), this.addEventListener("mouseout", this.removeActive);
  }
  /**
   * Disconnected Callback Lifecycle
   * 1. Remove window mouseover event listener
   * 2. Remove window mouseout event listener
   */
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("mouseover", this.toggleActive), this.removeEventListener("mouseout", this.removeActive);
  }
  /**
   * Handle all dynamic placement
   */
  dynamicPosition() {
    if (this.isDynamic && this._Cre8TooltipPanel) {
      const e = document.querySelector("body").getBoundingClientRect(), t = this._Cre8TooltipPanel.getBoundingClientRect(), o = this._Cre8Tooltip.clientHeight + t.height + t.top;
      t.left < 0 && (this.position = this.isRTL ? "left" : "right"), t.right >= e.width && (this.position = this.isRTL ? "right" : "left"), t.top < 0 && t.left > 0 && t.right < e.width && (this.position = null), o >= window.innerHeight && t.bottom >= window.innerHeight && t.left >= 0 && t.right <= e.width && (this.position = "top");
    }
  }
  /**
   * Handle Keydown
   * 1. If escape or tab key is struck when the tooltip is active, close it
   * 2. If enter or escape is keyed, toggle the tooltip open or close.
   *    We need these since the click event is on a div so that accessibility reads this aloud to a user
   */
  _handleKeydown(e) {
    this.isActive && (e.code === "Escape" || e.code === "Tab") && this.toggleActive(), (e.code === "Enter" || e.code === "Space") && this.toggleActive();
  }
  /**
   * Set Tooltip Active State
   * 1. Toggle the active state between true and false
   * 2. If is active, set the dynamic position and custom event.
   * 3. If is not active, remove fire the close custom event.
   * 4. Toggle the active state for dynamic. This prevents a flash of the tooltip in the orginal position.
   */
  toggleActive() {
    this.isActive = !this.isActive, this.isActive ? (setTimeout(() => {
      this.dynamicPosition();
    }, 1), this.dispatchEvent(new CustomEvent("open", {
      detail: { isActive: this.isActive },
      bubbles: !0,
      composed: !0
    }))) : this.dispatchEvent(new CustomEvent("close", {
      detail: { isActive: this.isActive },
      bubbles: !0,
      composed: !0
    })), setTimeout(() => {
      this.isActive && this.isDynamic ? this.isActiveDynamic = !0 : this.isActiveDynamic = !1;
    }, 2);
  }
  render() {
    const e = this.componentClassNames("cre8-c-tooltip", {
      "cre8-c-tooltip--top": this.position === "top",
      "cre8-c-tooltip--left": this.position === "left",
      "cre8-c-tooltip--right": this.position === "right",
      "cre8-c-tooltip--knockout": this.knockout,
      "cre8-is-active": this.isActive,
      "cre8-is-dynamic": this.isDynamic,
      "cre8-is-dynamic-active": this.isActiveDynamic
    });
    return f`
        <div class="${e}">
            <div 
                class="cre8-c-tooltip__trigger"
                tabindex="0"
                @focus=${this.toggleActive}
                @keydown=${this._handleKeydown}
            >
                ${this.svg ? f`
            <slot name="trigger">
                <cre8-icon svg='${this.svg}' rotate="${Number(this.iconRotateDegree)}" 
                flip="${this.iconFlipDirection}" aria-hidden="true"></cre8-icon>
            </slot>` : f`<slot name="trigger"></slot>`}
            </div>
            <dialog
                id=${$(this._uniqueId)}
                aria-labelledby=${this.ariaDescribes}
                class="cre8-c-tooltip__panel"
                role="tooltip">
                <slot></slot>
            </dialog>
        </div>
      `;
  }
};
Dc.styles = [e9];
let we = Dc;
ze([
  u()
], we.prototype, "position");
ze([
  u({ type: Boolean, reflect: !0 })
], we.prototype, "knockout");
ze([
  u({ type: Boolean, reflect: !0 })
], we.prototype, "isDynamic");
ze([
  u({ type: Boolean })
], we.prototype, "isActiveDynamic");
ze([
  u({ type: Boolean, reflect: !0 })
], we.prototype, "isActive");
ze([
  u({ type: String })
], we.prototype, "ariaDescribes");
ze([
  u({ type: String })
], we.prototype, "_uniqueId");
ze([
  u()
], we.prototype, "svg");
ze([
  u({ type: Number })
], we.prototype, "iconRotateDegree");
ze([
  u()
], we.prototype, "iconFlipDirection");
ze([
  oe(".cre8-c-tooltip")
], we.prototype, "_Cre8Tooltip");
ze([
  oe(".cre8-c-tooltip__panel")
], we.prototype, "_Cre8TooltipPanel");
customElements.get("cre8-tooltip") === void 0 && customElements.define("cre8-tooltip", we);
const r9 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Navigation in the header for utility items like logging into an account
 */
:host {
  margin-left: auto;
}

/**
 * Inverted utility-nav
 */
.cre8-c-utility-nav--inverted {
  --cre8-utility-nav-link-color: var(--cre8-color-content-knockout);
}

/**
* Utility nav list
*/
.cre8-c-utility-nav__list {
  display: flex;
  margin: calc(8px * -2) 0 0 calc(8px * -2);
  padding: 0;
  list-style: none;

  /**
  * Slotted utility nav item
  */
  ::slotted(cre8-utility-nav-item) {
    margin-left: calc(8px * 2);
    margin-top: calc(8px * 2);
  }
}
`;
var i9 = Object.defineProperty, Xd = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && i9(e, t, i), i;
};
const Oc = class Oc extends M {
  constructor() {
    super(...arguments), this.navAriaLabel = "utility";
  }
  render() {
    const e = this.componentClassNames("cre8-c-utility-nav", {
      "cre8-c-utility-nav--inverted": this.inverted === !0
    });
    return f`
      <nav aria-label="${this.navAriaLabel}" class="${e}">
        <ul class="cre8-c-utility-nav__list">
          <slot></slot>
        </ul>
      </nav>
    `;
  }
};
Oc.styles = [r9];
let Zi = Oc;
Xd([
  u({ type: Boolean, reflect: !0 })
], Zi.prototype, "inverted");
Xd([
  u()
], Zi.prototype, "navAriaLabel");
customElements.get("cre8-utility-nav") === void 0 && customElements.define("cre8-utility-nav", Zi);
const o9 = k`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) List item that contains a link/button within the utility nav
 */
.cre8-c-utility-nav__item {
  margin: 0;
  padding: 0;
}

/**
* Utility nav link
*/
.cre8-c-utility-nav__link {
  display: flex;
  @include cre8-typography-label-default;
  border: none;
  background: none;
  appearance: none;
  padding: 0;
  text-align: left;
  color: var(--cre8-utility-nav-link-color, var(--cre8-color-content-brand));
  cursor: pointer;
  transition: color var(--cre8-anim-fade-quick) var(--cre8-anim-ease);

  &:hover,
  &:focus {
    color: var(--cre8-color-content-brand-hover);
  }
}

/**
* Utility nav icon
* 1) Pass properties down to icon component
*/
cre8-icon-legacy {
  --cre8-icon-height: 1.5rem; /* 1 */
  --cre8-icon-width: 1.5rem; /* 1 */
}

/**
* Utility nav icon directly after utility nav text
* 1) Create space between text and icon
*/
.cre8-c-utility-nav__text + cre8-icon-legacy {
  margin-left: calc(8px * 1); /* 1 */
}

/**
* Utility nav text directly after utility nav icon
* 1) Create space between text and icon
*/
cre8-icon-legacy + .cre8-c-utility-nav__text {
  margin-left: calc(8px * 1); /* 1 */
}
`;
var n9 = Object.defineProperty, io = (r, e, t, o) => {
  for (var i = void 0, n = r.length - 1, s; n >= 0; n--)
    (s = r[n]) && (i = s(e, t, i) || i);
  return i && n9(e, t, i), i;
};
const Hc = class Hc extends M {
  constructor() {
    super(...arguments), this.iconPosition = void 0;
  }
  render() {
    const e = this.componentClassNames("cre8-c-utility-nav__item", {});
    return this.href ? f`
        <li class="${e}">
          <a href="${this.href}" class="cre8-c-utility-nav__link">
            ${this.iconPosition === "before" ? f`<cre8-icon-legacy aria-hidden="true" name="${$(this.iconName)}"></cre8-icon-legacy>` : T}
            <span
              class="${this.hideText ? "cre8-u-is-vishidden cre8-c-utility-nav__text" : "cre8-c-utility-nav__text"}"
            >
              ${this.text}
            </span>
            ${this.iconPosition === "after" ? f`<cre8-icon-legacy aria-hidden="true" name="${$(this.iconName)}"></cre8-icon-legacy>` : T}
          </a>
        </li>
      ` : f`
        <li class="${e}">
          <button class="cre8-c-utility-nav__link">
            ${this.iconPosition === "before" ? f`<cre8-icon-legacy aria-hidden="true" name="${$(this.iconName)}"></cre8-icon-legacy>` : T}
            <span
              class="${this.hideText ? "cre8-u-is-vishidden cre8-c-utility-nav__text" : "cre8-c-utility-nav__text"}"
            >
              ${this.text}
            </span>
            ${this.iconPosition === "after" ? f`<cre8-icon-legacy aria-hidden="true" name="${$(this.iconName)}"></cre8-icon-legacy>` : T}
          </button>
        </li>
      `;
  }
};
Hc.styles = [o9];
let Dt = Hc;
io([
  u({ type: Boolean, reflect: !0 })
], Dt.prototype, "hideText");
io([
  u()
], Dt.prototype, "href");
io([
  u()
], Dt.prototype, "iconName");
io([
  u()
], Dt.prototype, "iconPosition");
io([
  u()
], Dt.prototype, "text");
customElements.get("cre8-utility-nav-item") === void 0 && customElements.define("cre8-utility-nav-item", Dt);
const p9 = "1.0.10";
export {
  yi as Cre8Accordion,
  Le as Cre8AccordionItem,
  Ne as Cre8Alert,
  er as Cre8Badge,
  _i as Cre8Band,
  $o as Cre8Breadcrumbs,
  zn as Cre8BreadcrumbsItem,
  F as Cre8Button,
  Mo as Cre8ButtonGroup,
  wi as Cre8Card,
  ie as Cre8Chart,
  et as Cre8CheckboxField,
  ae as Cre8CheckboxFieldItem,
  X as Cre8DangerButton,
  Dr as Cre8DatePicker,
  Ii as Cre8Divider,
  $t as Cre8Dropdown,
  Bo as Cre8DropdownItem,
  Or as Cre8Feature,
  Z as Cre8Field,
  Er as Cre8FieldNote,
  us as Cre8Footer,
  Hr as Cre8GlobalNav,
  Mt as Cre8GlobalNavItem,
  Ir as Cre8Grid,
  ps as Cre8GridItem,
  Vo as Cre8Header,
  Qt as Cre8Heading,
  Br as Cre8Hero,
  _t as Cre8Icon,
  Lt as Cre8InlineAlert,
  No as Cre8Layout,
  Ro as Cre8LayoutContainer,
  Bi as Cre8LayoutSection,
  fs as Cre8LinelengthContainer,
  ve as Cre8Link,
  St as Cre8LinkList,
  Vr as Cre8LinkListItem,
  Vi as Cre8List,
  gs as Cre8ListItem,
  Je as Cre8LoadingSpinner,
  zo as Cre8Logo,
  Fo as Cre8Main,
  We as Cre8Modal,
  ue as Cre8MultiSelect,
  bs as Cre8NavContainer,
  Zo as Cre8PageHeader,
  Pe as Cre8Pagination,
  Nr as Cre8PercentBar,
  Ee as Cre8Popover,
  Rr as Cre8PrimaryNav,
  Tt as Cre8PrimaryNavItem,
  tt as Cre8ProgressMeter,
  rt as Cre8RadioField,
  Ce as Cre8RadioFieldItem,
  or as Cre8RemoveTag,
  jo as Cre8Section,
  xe as Cre8Select,
  de as Cre8SelectTile,
  qe as Cre8SelectTileList,
  zr as Cre8SkeletonLoader,
  nr as Cre8SplitButton,
  ms as Cre8Submenu,
  Wo as Cre8SubmenuItem,
  Pt as Cre8Tab,
  sr as Cre8TabPanel,
  ar as Cre8Table,
  vs as Cre8TableBody,
  Fr as Cre8TableCell,
  ys as Cre8TableHeader,
  Ni as Cre8TableHeaderCell,
  Cs as Cre8TableObject,
  Et as Cre8TableRow,
  De as Cre8Tabs,
  Ue as Cre8Tag,
  Ri as Cre8TagList,
  zi as Cre8TertiaryNav,
  Fi as Cre8TertiaryNavItem,
  cr as Cre8TextLink,
  xi as Cre8TextPassage,
  we as Cre8Tooltip,
  Zi as Cre8UtilityNav,
  Dt as Cre8UtilityNavItem,
  p9 as version
};
//# sourceMappingURL=cre8-wc.esm.js.map
