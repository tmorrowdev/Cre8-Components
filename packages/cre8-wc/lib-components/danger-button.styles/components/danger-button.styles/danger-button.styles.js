(function(b,f){typeof exports=="object"&&typeof module<"u"?module.exports=f():typeof define=="function"&&define.amd?define(f):(b=typeof globalThis<"u"?globalThis:b||self,b.DangerButton=b.DangerButton||{},b.DangerButton.styles=f())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ae;const b=globalThis,f=b.ShadowRoot&&(b.ShadyCSS===void 0||b.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,R=Symbol(),V=new WeakMap;let q=class{constructor(e,r,t){if(this._$cssResult$=!0,t!==R)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(f&&e===void 0){const t=r!==void 0&&r.length===1;t&&(e=V.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&V.set(r,e))}return e}toString(){return this.cssText}};const ce=n=>new q(typeof n=="string"?n:n+"",void 0,R),se=(n,...e)=>{const r=n.length===1?n[0]:e.reduce((t,o,a)=>t+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+n[a+1],n[0]);return new q(r,n,R)},de=(n,e)=>{if(f)n.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const t=document.createElement("style"),o=b.litNonce;o!==void 0&&t.setAttribute("nonce",o),t.textContent=r.cssText,n.appendChild(t)}},F=f?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let r="";for(const t of e.cssRules)r+=t.cssText;return ce(r)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:le,defineProperty:ue,getOwnPropertyDescriptor:he,getOwnPropertyNames:be,getOwnPropertySymbols:ge,getPrototypeOf:ve}=Object,v=globalThis,J=v.trustedTypes,pe=J?J.emptyScript:"",B=v.reactiveElementPolyfillSupport,S=(n,e)=>n,D={toAttribute(n,e){switch(e){case Boolean:n=n?pe:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let r=n;switch(e){case Boolean:r=n!==null;break;case Number:r=n===null?null:Number(n);break;case Object:case Array:try{r=JSON.parse(n)}catch{r=null}}return r}},K=(n,e)=>!le(n,e),Z={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),v.litPropertyMetadata??(v.litPropertyMetadata=new WeakMap);class w extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=Z){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){const t=Symbol(),o=this.getPropertyDescriptor(e,t,r);o!==void 0&&ue(this.prototype,e,o)}}static getPropertyDescriptor(e,r,t){const{get:o,set:a}=he(this.prototype,e)??{get(){return this[r]},set(i){this[r]=i}};return{get:o,set(i){const s=o==null?void 0:o.call(this);a==null||a.call(this,i),this.requestUpdate(e,s,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Z}static _$Ei(){if(this.hasOwnProperty(S("elementProperties")))return;const e=ve(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(S("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S("properties"))){const r=this.properties,t=[...be(r),...ge(r)];for(const o of t)this.createProperty(o,r[o])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[t,o]of r)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[r,t]of this.elementProperties){const o=this._$Eu(r,t);o!==void 0&&this._$Eh.set(o,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const t=new Set(e.flat(1/0).reverse());for(const o of t)r.unshift(F(o))}else e!==void 0&&r.push(F(e));return r}static _$Eu(e,r){const t=r.attribute;return t===!1?void 0:typeof t=="string"?t:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(r=>this.enableUpdating=r),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(r=>r(this))}addController(e){var r;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((r=e.hostConnected)==null||r.call(e))}removeController(e){var r;(r=this._$EO)==null||r.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const t of r.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return de(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(r=>{var t;return(t=r.hostConnected)==null?void 0:t.call(r)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(r=>{var t;return(t=r.hostDisconnected)==null?void 0:t.call(r)})}attributeChangedCallback(e,r,t){this._$AK(e,t)}_$ET(e,r){var a;const t=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,t);if(o!==void 0&&t.reflect===!0){const i=(((a=t.converter)==null?void 0:a.toAttribute)!==void 0?t.converter:D).toAttribute(r,t.type);this._$Em=e,i==null?this.removeAttribute(o):this.setAttribute(o,i),this._$Em=null}}_$AK(e,r){var a,i;const t=this.constructor,o=t._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const s=t.getPropertyOptions(o),c=typeof s.converter=="function"?{fromAttribute:s.converter}:((a=s.converter)==null?void 0:a.fromAttribute)!==void 0?s.converter:D;this._$Em=o,this[o]=c.fromAttribute(r,s.type)??((i=this._$Ej)==null?void 0:i.get(o))??null,this._$Em=null}}requestUpdate(e,r,t){var o;if(e!==void 0){const a=this.constructor,i=this[e];if(t??(t=a.getPropertyOptions(e)),!((t.hasChanged??K)(i,r)||t.useDefault&&t.reflect&&i===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(a._$Eu(e,t))))return;this.C(e,r,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:t,reflect:o,wrapped:a},i){t&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,i??r??this[e]),a!==!0||i!==void 0)||(this._$AL.has(e)||(this.hasUpdated||t||(r=void 0),this._$AL.set(e,r)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[a,i]of this._$Ep)this[a]=i;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[a,i]of o){const{wrapped:s}=i,c=this[a];s!==!0||this._$AL.has(a)||c===void 0||this.C(a,void 0,i,c)}}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),(t=this._$EO)==null||t.forEach(o=>{var a;return(a=o.hostUpdate)==null?void 0:a.call(o)}),this.update(r)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(r)}willUpdate(e){}_$AE(e){var r;(r=this._$EO)==null||r.forEach(t=>{var o;return(o=t.hostUpdated)==null?void 0:o.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[S("elementProperties")]=new Map,w[S("finalized")]=new Map,B==null||B({ReactiveElement:w}),(v.reactiveElementVersions??(v.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,O=C.trustedTypes,G=O?O.createPolicy("lit-html",{createHTML:n=>n}):void 0,Q="$lit$",p=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+p,ye=`<${X}>`,m=document,k=()=>m.createComment(""),P=n=>n===null||typeof n!="object"&&typeof n!="function",L=Array.isArray,fe=n=>L(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",j=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,$=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),re=/'/g,te=/"/g,oe=/^(?:script|style|textarea|title)$/i,E=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ne=new WeakMap,_=m.createTreeWalker(m,129);function ie(n,e){if(!L(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const me=(n,e)=>{const r=n.length-1,t=[];let o,a=e===2?"<svg>":e===3?"<math>":"",i=U;for(let s=0;s<r;s++){const c=n[s];let u,h,d=-1,g=0;for(;g<c.length&&(i.lastIndex=g,h=i.exec(c),h!==null);)g=i.lastIndex,i===U?h[1]==="!--"?i=Y:h[1]!==void 0?i=ee:h[2]!==void 0?(oe.test(h[2])&&(o=RegExp("</"+h[2],"g")),i=$):h[3]!==void 0&&(i=$):i===$?h[0]===">"?(i=o??U,d=-1):h[1]===void 0?d=-2:(d=i.lastIndex-h[2].length,u=h[1],i=h[3]===void 0?$:h[3]==='"'?te:re):i===te||i===re?i=$:i===Y||i===ee?i=U:(i=$,o=void 0);const y=i===$&&n[s+1].startsWith("/>")?" ":"";a+=i===U?c+ye:d>=0?(t.push(u),c.slice(0,d)+Q+c.slice(d)+p+y):c+p+(d===-2?s:y)}return[ie(n,a+(n[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),t]};class H{constructor({strings:e,_$litType$:r},t){let o;this.parts=[];let a=0,i=0;const s=e.length-1,c=this.parts,[u,h]=me(e,r);if(this.el=H.createElement(u,t),_.currentNode=this.el.content,r===2||r===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(o=_.nextNode())!==null&&c.length<s;){if(o.nodeType===1){if(o.hasAttributes())for(const d of o.getAttributeNames())if(d.endsWith(Q)){const g=h[i++],y=o.getAttribute(d).split(p),z=/([.?@])?(.*)/.exec(g);c.push({type:1,index:a,name:z[2],strings:y,ctor:z[1]==="."?_e:z[1]==="?"?Ae:z[1]==="@"?we:M}),o.removeAttribute(d)}else d.startsWith(p)&&(c.push({type:6,index:a}),o.removeAttribute(d));if(oe.test(o.tagName)){const d=o.textContent.split(p),g=d.length-1;if(g>0){o.textContent=O?O.emptyScript:"";for(let y=0;y<g;y++)o.append(d[y],k()),_.nextNode(),c.push({type:2,index:++a});o.append(d[g],k())}}}else if(o.nodeType===8)if(o.data===X)c.push({type:2,index:a});else{let d=-1;for(;(d=o.data.indexOf(p,d+1))!==-1;)c.push({type:7,index:a}),d+=p.length-1}a++}}static createElement(e,r){const t=m.createElement("template");return t.innerHTML=e,t}}function x(n,e,r=n,t){var i,s;if(e===E)return e;let o=t!==void 0?(i=r._$Co)==null?void 0:i[t]:r._$Cl;const a=P(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==a&&((s=o==null?void 0:o._$AO)==null||s.call(o,!1),a===void 0?o=void 0:(o=new a(n),o._$AT(n,r,t)),t!==void 0?(r._$Co??(r._$Co=[]))[t]=o:r._$Cl=o),o!==void 0&&(e=x(n,o._$AS(n,e.values),o,t)),e}class $e{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:t}=this._$AD,o=((e==null?void 0:e.creationScope)??m).importNode(r,!0);_.currentNode=o;let a=_.nextNode(),i=0,s=0,c=t[0];for(;c!==void 0;){if(i===c.index){let u;c.type===2?u=new T(a,a.nextSibling,this,e):c.type===1?u=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(u=new Ee(a,this,e)),this._$AV.push(u),c=t[++s]}i!==(c==null?void 0:c.index)&&(a=_.nextNode(),i++)}return _.currentNode=m,o}p(e){let r=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(e,t,r),r+=t.strings.length-2):t._$AI(e[r])),r++}}class T{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,r,t,o){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=t,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=x(this,e,r),P(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):fe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(m.createTextNode(e)),this._$AH=e}$(e){var a;const{values:r,_$litType$:t}=e,o=typeof t=="number"?this._$AC(e):(t.el===void 0&&(t.el=H.createElement(ie(t.h,t.h[0]),this.options)),t);if(((a=this._$AH)==null?void 0:a._$AD)===o)this._$AH.p(r);else{const i=new $e(o,this),s=i.u(this.options);i.p(r),this.T(s),this._$AH=i}}_$AC(e){let r=ne.get(e.strings);return r===void 0&&ne.set(e.strings,r=new H(e)),r}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let t,o=0;for(const a of e)o===r.length?r.push(t=new T(this.O(k()),this.O(k()),this,this.options)):t=r[o],t._$AI(a),o++;o<r.length&&(this._$AR(t&&t._$AB.nextSibling,o),r.length=o)}_$AR(e=this._$AA.nextSibling,r){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,r);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var r;this._$AM===void 0&&(this._$Cv=e,(r=this._$AP)==null||r.call(this,e))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,t,o,a){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=r,this._$AM=o,this.options=a,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=l}_$AI(e,r=this,t,o){const a=this.strings;let i=!1;if(a===void 0)e=x(this,e,r,0),i=!P(e)||e!==this._$AH&&e!==E,i&&(this._$AH=e);else{const s=e;let c,u;for(e=a[0],c=0;c<a.length-1;c++)u=x(this,s[t+c],r,c),u===E&&(u=this._$AH[c]),i||(i=!P(u)||u!==this._$AH[c]),u===l?e=l:e!==l&&(e+=(u??"")+a[c+1]),this._$AH[c]=u}i&&!o&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class _e extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}}class Ae extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}}class we extends M{constructor(e,r,t,o,a){super(e,r,t,o,a),this.type=5}_$AI(e,r=this){if((e=x(this,e,r,0)??l)===E)return;const t=this._$AH,o=e===l&&t!==l||e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive,a=e!==l&&(t===l||o);o&&this.element.removeEventListener(this.name,this,t),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var r;typeof this._$AH=="function"?this._$AH.call(((r=this.options)==null?void 0:r.host)??this.element,e):this._$AH.handleEvent(e)}}class Ee{constructor(e,r,t){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(e){x(this,e)}}const I=C.litHtmlPolyfillSupport;I==null||I(H,T),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.3.0");const xe=(n,e,r)=>{const t=(r==null?void 0:r.renderBefore)??e;let o=t._$litPart$;if(o===void 0){const a=(r==null?void 0:r.renderBefore)??null;t._$litPart$=o=new T(e.insertBefore(k(),a),a,void 0,r??{})}return o._$AI(n),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;class N extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r;const e=super.createRenderRoot();return(r=this.renderOptions).renderBefore??(r.renderBefore=e.firstChild),e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=xe(r,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return E}}N._$litElement$=!0,N.finalized=!0,(ae=A.litElementHydrateSupport)==null||ae.call(A,{LitElement:N});const W=A.litElementPolyfillSupport;return W==null||W({LitElement:N}),(A.litElementVersions??(A.litElementVersions=[])).push("4.2.0"),se`@import '../../design-tokens/core/scss/theming/component';

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
  margin-left: calc(var(--size-base-unit) * 1);
  display: inline-flex;
}

/**
   * Button icon directly after button text
   */
.cre8-c-danger-button__text:not(.cre8-u-is-vishidden) + cre8-icon {
  margin-left: calc(var(--size-base-unit) * 1);
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
  margin-left: calc(var(--size-base-unit) * 1);
  max-width: fit-content;
  min-width: 0px;
  width: auto;
  height: auto;
  max-height: fit-content;
  min-width: 0px;
}
`});
