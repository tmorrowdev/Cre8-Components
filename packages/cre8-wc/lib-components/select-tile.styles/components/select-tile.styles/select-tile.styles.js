(function(p,m){typeof exports=="object"&&typeof module<"u"?module.exports=m():typeof define=="function"&&define.amd?define(m):(p=typeof globalThis<"u"?globalThis:p||self,p.SelectTile=p.SelectTile||{},p.SelectTile.styles=m())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ce;const p=globalThis,m=p.ShadowRoot&&(p.ShadyCSS===void 0||p.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,N=Symbol(),W=new WeakMap;let q=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==N)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(m&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=W.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&W.set(t,e))}return e}toString(){return this.cssText}};const ne=o=>new q(typeof o=="string"?o:o+"",void 0,N),le=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((r,i,c)=>r+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[c+1],o[0]);return new q(t,o,N)},ae=(o,e)=>{if(m)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),i=p.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=t.cssText,o.appendChild(r)}},F=m?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return ne(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:de,defineProperty:he,getOwnPropertyDescriptor:ue,getOwnPropertyNames:pe,getOwnPropertySymbols:be,getPrototypeOf:fe}=Object,f=globalThis,J=f.trustedTypes,_e=J?J.emptyScript:"",j=f.reactiveElementPolyfillSupport,E=(o,e)=>o,L={toAttribute(o,e){switch(e){case Boolean:o=o?_e:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},K=(o,e)=>!de(o,e),Z={attribute:!0,type:String,converter:L,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class w extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Z){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(e,r,t);i!==void 0&&he(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){const{get:i,set:c}=ue(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:i,set(s){const l=i==null?void 0:i.call(this);c==null||c.call(this,s),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Z}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const e=fe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const t=this.properties,r=[...pe(t),...be(t)];for(const i of r)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,i]of t)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const i=this._$Eu(t,r);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const i of r)t.unshift(F(i))}else e!==void 0&&t.push(F(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ae(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){var c;const r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){const s=(((c=r.converter)==null?void 0:c.toAttribute)!==void 0?r.converter:L).toAttribute(t,r.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){var c,s;const r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=r.getPropertyOptions(i),n=typeof l.converter=="function"?{fromAttribute:l.converter}:((c=l.converter)==null?void 0:c.fromAttribute)!==void 0?l.converter:L;this._$Em=i,this[i]=n.fromAttribute(t,l.type)??((s=this._$Ej)==null?void 0:s.get(i))??null,this._$Em=null}}requestUpdate(e,t,r){var i;if(e!==void 0){const c=this.constructor,s=this[e];if(r??(r=c.getPropertyOptions(e)),!((r.hasChanged??K)(s,t)||r.useDefault&&r.reflect&&s===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(c._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:c},s){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),c!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[c,s]of this._$Ep)this[c]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[c,s]of i){const{wrapped:l}=s,n=this[c];l!==!0||this._$AL.has(c)||n===void 0||this.C(c,void 0,s,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(i=>{var c;return(c=i.hostUpdate)==null?void 0:c.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var i;return(i=r.hostUpdated)==null?void 0:i.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[E("elementProperties")]=new Map,w[E("finalized")]=new Map,j==null||j({ReactiveElement:w}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=globalThis,O=S.trustedTypes,G=O?O.createPolicy("lit-html",{createHTML:o=>o}):void 0,Q="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+_,$e=`<${X}>`,g=document,C=()=>g.createComment(""),P=o=>o===null||typeof o!="object"&&typeof o!="function",D=Array.isArray,me=o=>D(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",B=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,v=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,re=/"/g,ie=/^(?:script|style|textarea|title)$/i,x=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),oe=new WeakMap,y=g.createTreeWalker(g,129);function se(o,e){if(!D(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const ge=(o,e)=>{const t=o.length-1,r=[];let i,c=e===2?"<svg>":e===3?"<math>":"",s=T;for(let l=0;l<t;l++){const n=o[l];let h,u,a=-1,b=0;for(;b<n.length&&(s.lastIndex=b,u=s.exec(n),u!==null);)b=s.lastIndex,s===T?u[1]==="!--"?s=Y:u[1]!==void 0?s=ee:u[2]!==void 0?(ie.test(u[2])&&(i=RegExp("</"+u[2],"g")),s=v):u[3]!==void 0&&(s=v):s===v?u[0]===">"?(s=i??T,a=-1):u[1]===void 0?a=-2:(a=s.lastIndex-u[2].length,h=u[1],s=u[3]===void 0?v:u[3]==='"'?re:te):s===re||s===te?s=v:s===Y||s===ee?s=T:(s=v,i=void 0);const $=s===v&&o[l+1].startsWith("/>")?" ":"";c+=s===T?n+$e:a>=0?(r.push(h),n.slice(0,a)+Q+n.slice(a)+_+$):n+_+(a===-2?l:$)}return[se(o,c+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class R{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let c=0,s=0;const l=e.length-1,n=this.parts,[h,u]=ge(e,t);if(this.el=R.createElement(h,r),y.currentNode=this.el.content,t===2||t===3){const a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(i=y.nextNode())!==null&&n.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const a of i.getAttributeNames())if(a.endsWith(Q)){const b=u[s++],$=i.getAttribute(a).split(_),M=/([.?@])?(.*)/.exec(b);n.push({type:1,index:c,name:M[2],strings:$,ctor:M[1]==="."?ye:M[1]==="?"?Ae:M[1]==="@"?we:H}),i.removeAttribute(a)}else a.startsWith(_)&&(n.push({type:6,index:c}),i.removeAttribute(a));if(ie.test(i.tagName)){const a=i.textContent.split(_),b=a.length-1;if(b>0){i.textContent=O?O.emptyScript:"";for(let $=0;$<b;$++)i.append(a[$],C()),y.nextNode(),n.push({type:2,index:++c});i.append(a[b],C())}}}else if(i.nodeType===8)if(i.data===X)n.push({type:2,index:c});else{let a=-1;for(;(a=i.data.indexOf(_,a+1))!==-1;)n.push({type:7,index:c}),a+=_.length-1}c++}}static createElement(e,t){const r=g.createElement("template");return r.innerHTML=e,r}}function k(o,e,t=o,r){var s,l;if(e===x)return e;let i=r!==void 0?(s=t._$Co)==null?void 0:s[r]:t._$Cl;const c=P(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==c&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),c===void 0?i=void 0:(i=new c(o),i._$AT(o,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=i:t._$Cl=i),i!==void 0&&(e=k(o,i._$AS(o,e.values),i,r)),e}class ve{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,i=((e==null?void 0:e.creationScope)??g).importNode(t,!0);y.currentNode=i;let c=y.nextNode(),s=0,l=0,n=r[0];for(;n!==void 0;){if(s===n.index){let h;n.type===2?h=new U(c,c.nextSibling,this,e):n.type===1?h=new n.ctor(c,n.name,n.strings,this,e):n.type===6&&(h=new xe(c,this,e)),this._$AV.push(h),n=r[++l]}s!==(n==null?void 0:n.index)&&(c=y.nextNode(),s++)}return y.currentNode=g,i}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class U{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=k(this,e,t),P(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):me(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(g.createTextNode(e)),this._$AH=e}$(e){var c;const{values:t,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=R.createElement(se(r.h,r.h[0]),this.options)),r);if(((c=this._$AH)==null?void 0:c._$AD)===i)this._$AH.p(t);else{const s=new ve(i,this),l=s.u(this.options);s.p(t),this.T(l),this._$AH=s}}_$AC(e){let t=oe.get(e.strings);return t===void 0&&oe.set(e.strings,t=new R(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const c of e)i===t.length?t.push(r=new U(this.O(C()),this.O(C()),this,this.options)):r=t[i],r._$AI(c),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,c){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=c,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=d}_$AI(e,t=this,r,i){const c=this.strings;let s=!1;if(c===void 0)e=k(this,e,t,0),s=!P(e)||e!==this._$AH&&e!==x,s&&(this._$AH=e);else{const l=e;let n,h;for(e=c[0],n=0;n<c.length-1;n++)h=k(this,l[r+n],t,n),h===x&&(h=this._$AH[n]),s||(s=!P(h)||h!==this._$AH[n]),h===d?e=d:e!==d&&(e+=(h??"")+c[n+1]),this._$AH[n]=h}s&&!i&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ye extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}}class Ae extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}}class we extends H{constructor(e,t,r,i,c){super(e,t,r,i,c),this.type=5}_$AI(e,t=this){if((e=k(this,e,t,0)??d)===x)return;const r=this._$AH,i=e===d&&r!==d||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,c=e!==d&&(r===d||i);i&&this.element.removeEventListener(this.name,this,r),c&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class xe{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){k(this,e)}}const I=S.litHtmlPolyfillSupport;I==null||I(R,U),(S.litHtmlVersions??(S.litHtmlVersions=[])).push("3.3.0");const ke=(o,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let i=r._$litPart$;if(i===void 0){const c=(t==null?void 0:t.renderBefore)??null;r._$litPart$=i=new U(e.insertBefore(C(),c),c,void 0,t??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;class z extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ke(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return x}}z._$litElement$=!0,z.finalized=!0,(ce=A.litElementHydrateSupport)==null||ce.call(A,{LitElement:z});const V=A.litElementPolyfillSupport;return V==null||V({LitElement:z}),(A.litElementVersions??(A.litElementVersions=[])).push("4.2.0"),le`@import '../../design-tokens/core/scss/theming/component';

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
  padding: calc(var(--size-base-unit) * 2);
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
      top: calc(var(--size-base-unit) * 1);
      right: calc(var(--size-base-unit) * 1);
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
  top: calc(var(--size-base-unit) * 1);
  right: calc(var(--size-base-unit) * 1);
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
  height: calc(var(--size-base-unit) * 3);
  width: calc(var(--size-base-unit) * 3);
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
  height: calc(var(--size-base-unit) * 1.5);
  width: calc(var(--size-base-unit) * 1.5);
  background: var(--cre8-color-content-brand);
  border-radius: var(--cre8-border-radius-round);

  /** Check radio variant */
  .cre8-c-select-tile__custom-radio-check & {
    flex: none;
    height: calc(var(--size-base-unit) * 3);
    width: calc(var(--size-base-unit) * 3);
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
  height: calc(var(--size-base-unit) * 3);
  width: calc(var(--size-base-unit) * 3);
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
`});
