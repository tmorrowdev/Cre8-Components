(function(v,f){typeof exports=="object"&&typeof module<"u"?module.exports=f():typeof define=="function"&&define.amd?define(f):(v=typeof globalThis<"u"?globalThis:v||self,v.Button=v.Button||{},v.Button.module=f())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ir;const v=globalThis,f=v.ShadowRoot&&(v.ShadyCSS===void 0||v.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,R=Symbol(),V=new WeakMap;let q=class{constructor(r,e,t){if(this._$cssResult$=!0,t!==R)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=r,this.t=e}get styleSheet(){let r=this.o;const e=this.t;if(f&&r===void 0){const t=e!==void 0&&e.length===1;t&&(r=V.get(e)),r===void 0&&((this.o=r=new CSSStyleSheet).replaceSync(this.cssText),t&&V.set(e,r))}return r}toString(){return this.cssText}};const ar=n=>new q(typeof n=="string"?n:n+"",void 0,R),sr=(n,...r)=>{const e=n.length===1?n[0]:r.reduce((t,o,i)=>t+(c=>{if(c._$cssResult$===!0)return c.cssText;if(typeof c=="number")return c;throw Error("Value passed to 'css' function must be a 'css' function result: "+c+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+n[i+1],n[0]);return new q(e,n,R)},lr=(n,r)=>{if(f)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of r){const t=document.createElement("style"),o=v.litNonce;o!==void 0&&t.setAttribute("nonce",o),t.textContent=e.cssText,n.appendChild(t)}},F=f?n=>n:n=>n instanceof CSSStyleSheet?(r=>{let e="";for(const t of r.cssRules)e+=t.cssText;return ar(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:dr,defineProperty:ur,getOwnPropertyDescriptor:br,getOwnPropertyNames:vr,getOwnPropertySymbols:hr,getPrototypeOf:yr}=Object,y=globalThis,J=y.trustedTypes,pr=J?J.emptyScript:"",B=y.reactiveElementPolyfillSupport,S=(n,r)=>n,L={toAttribute(n,r){switch(r){case Boolean:n=n?pr:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,r){let e=n;switch(r){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},K=(n,r)=>!dr(n,r),Z={attribute:!0,type:String,converter:L,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);class A extends HTMLElement{static addInitializer(r){this._$Ei(),(this.l??(this.l=[])).push(r)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(r,e=Z){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(r)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(r,e),!e.noAccessor){const t=Symbol(),o=this.getPropertyDescriptor(r,t,e);o!==void 0&&ur(this.prototype,r,o)}}static getPropertyDescriptor(r,e,t){const{get:o,set:i}=br(this.prototype,r)??{get(){return this[e]},set(c){this[e]=c}};return{get:o,set(c){const s=o==null?void 0:o.call(this);i==null||i.call(this,c),this.requestUpdate(r,s,t)},configurable:!0,enumerable:!0}}static getPropertyOptions(r){return this.elementProperties.get(r)??Z}static _$Ei(){if(this.hasOwnProperty(S("elementProperties")))return;const r=yr(this);r.finalize(),r.l!==void 0&&(this.l=[...r.l]),this.elementProperties=new Map(r.elementProperties)}static finalize(){if(this.hasOwnProperty(S("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S("properties"))){const e=this.properties,t=[...vr(e),...hr(e)];for(const o of t)this.createProperty(o,e[o])}const r=this[Symbol.metadata];if(r!==null){const e=litPropertyMetadata.get(r);if(e!==void 0)for(const[t,o]of e)this.elementProperties.set(t,o)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const o=this._$Eu(e,t);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(r){const e=[];if(Array.isArray(r)){const t=new Set(r.flat(1/0).reverse());for(const o of t)e.unshift(F(o))}else r!==void 0&&e.push(F(r));return e}static _$Eu(r,e){const t=e.attribute;return t===!1?void 0:typeof t=="string"?t:typeof r=="string"?r.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var r;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(r=this.constructor.l)==null||r.forEach(e=>e(this))}addController(r){var e;(this._$EO??(this._$EO=new Set)).add(r),this.renderRoot!==void 0&&this.isConnected&&((e=r.hostConnected)==null||e.call(r))}removeController(r){var e;(e=this._$EO)==null||e.delete(r)}_$E_(){const r=new Map,e=this.constructor.elementProperties;for(const t of e.keys())this.hasOwnProperty(t)&&(r.set(t,this[t]),delete this[t]);r.size>0&&(this._$Ep=r)}createRenderRoot(){const r=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lr(r,this.constructor.elementStyles),r}connectedCallback(){var r;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(r=this._$EO)==null||r.forEach(e=>{var t;return(t=e.hostConnected)==null?void 0:t.call(e)})}enableUpdating(r){}disconnectedCallback(){var r;(r=this._$EO)==null||r.forEach(e=>{var t;return(t=e.hostDisconnected)==null?void 0:t.call(e)})}attributeChangedCallback(r,e,t){this._$AK(r,t)}_$ET(r,e){var i;const t=this.constructor.elementProperties.get(r),o=this.constructor._$Eu(r,t);if(o!==void 0&&t.reflect===!0){const c=(((i=t.converter)==null?void 0:i.toAttribute)!==void 0?t.converter:L).toAttribute(e,t.type);this._$Em=r,c==null?this.removeAttribute(o):this.setAttribute(o,c),this._$Em=null}}_$AK(r,e){var i,c;const t=this.constructor,o=t._$Eh.get(r);if(o!==void 0&&this._$Em!==o){const s=t.getPropertyOptions(o),a=typeof s.converter=="function"?{fromAttribute:s.converter}:((i=s.converter)==null?void 0:i.fromAttribute)!==void 0?s.converter:L;this._$Em=o,this[o]=a.fromAttribute(e,s.type)??((c=this._$Ej)==null?void 0:c.get(o))??null,this._$Em=null}}requestUpdate(r,e,t){var o;if(r!==void 0){const i=this.constructor,c=this[r];if(t??(t=i.getPropertyOptions(r)),!((t.hasChanged??K)(c,e)||t.useDefault&&t.reflect&&c===((o=this._$Ej)==null?void 0:o.get(r))&&!this.hasAttribute(i._$Eu(r,t))))return;this.C(r,e,t)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(r,e,{useDefault:t,reflect:o,wrapped:i},c){t&&!(this._$Ej??(this._$Ej=new Map)).has(r)&&(this._$Ej.set(r,c??e??this[r]),i!==!0||c!==void 0)||(this._$AL.has(r)||(this.hasUpdated||t||(e=void 0),this._$AL.set(r,e)),o===!0&&this._$Em!==r&&(this._$Eq??(this._$Eq=new Set)).add(r))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const r=this.scheduleUpdate();return r!=null&&await r,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,c]of this._$Ep)this[i]=c;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[i,c]of o){const{wrapped:s}=c,a=this[i];s!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,c,a)}}let r=!1;const e=this._$AL;try{r=this.shouldUpdate(e),r?(this.willUpdate(e),(t=this._$EO)==null||t.forEach(o=>{var i;return(i=o.hostUpdate)==null?void 0:i.call(o)}),this.update(e)):this._$EM()}catch(o){throw r=!1,this._$EM(),o}r&&this._$AE(e)}willUpdate(r){}_$AE(r){var e;(e=this._$EO)==null||e.forEach(t=>{var o;return(o=t.hostUpdated)==null?void 0:o.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(r)),this.updated(r)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(r){return!0}update(r){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(r){}firstUpdated(r){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[S("elementProperties")]=new Map,A[S("finalized")]=new Map,B==null||B({ReactiveElement:A}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const k=globalThis,H=k.trustedTypes,G=H?H.createPolicy("lit-html",{createHTML:n=>n}):void 0,Q="$lit$",p=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+p,gr=`<${X}>`,m=document,C=()=>m.createComment(""),P=n=>n===null||typeof n!="object"&&typeof n!="function",D=Array.isArray,fr=n=>D(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",j=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,rr=/>/g,$=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),er=/'/g,tr=/"/g,or=/^(?:script|style|textarea|title)$/i,x=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),nr=new WeakMap,_=m.createTreeWalker(m,129);function cr(n,r){if(!D(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(r):r}const mr=(n,r)=>{const e=n.length-1,t=[];let o,i=r===2?"<svg>":r===3?"<math>":"",c=z;for(let s=0;s<e;s++){const a=n[s];let u,b,l=-1,h=0;for(;h<a.length&&(c.lastIndex=h,b=c.exec(a),b!==null);)h=c.lastIndex,c===z?b[1]==="!--"?c=Y:b[1]!==void 0?c=rr:b[2]!==void 0?(or.test(b[2])&&(o=RegExp("</"+b[2],"g")),c=$):b[3]!==void 0&&(c=$):c===$?b[0]===">"?(c=o??z,l=-1):b[1]===void 0?l=-2:(l=c.lastIndex-b[2].length,u=b[1],c=b[3]===void 0?$:b[3]==='"'?tr:er):c===tr||c===er?c=$:c===Y||c===rr?c=z:(c=$,o=void 0);const g=c===$&&n[s+1].startsWith("/>")?" ":"";i+=c===z?a+gr:l>=0?(t.push(u),a.slice(0,l)+Q+a.slice(l)+p+g):a+p+(l===-2?s:g)}return[cr(n,i+(n[e]||"<?>")+(r===2?"</svg>":r===3?"</math>":"")),t]};class T{constructor({strings:r,_$litType$:e},t){let o;this.parts=[];let i=0,c=0;const s=r.length-1,a=this.parts,[u,b]=mr(r,e);if(this.el=T.createElement(u,t),_.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(o=_.nextNode())!==null&&a.length<s;){if(o.nodeType===1){if(o.hasAttributes())for(const l of o.getAttributeNames())if(l.endsWith(Q)){const h=b[c++],g=o.getAttribute(l).split(p),N=/([.?@])?(.*)/.exec(h);a.push({type:1,index:i,name:N[2],strings:g,ctor:N[1]==="."?_r:N[1]==="?"?wr:N[1]==="@"?Ar:O}),o.removeAttribute(l)}else l.startsWith(p)&&(a.push({type:6,index:i}),o.removeAttribute(l));if(or.test(o.tagName)){const l=o.textContent.split(p),h=l.length-1;if(h>0){o.textContent=H?H.emptyScript:"";for(let g=0;g<h;g++)o.append(l[g],C()),_.nextNode(),a.push({type:2,index:++i});o.append(l[h],C())}}}else if(o.nodeType===8)if(o.data===X)a.push({type:2,index:i});else{let l=-1;for(;(l=o.data.indexOf(p,l+1))!==-1;)a.push({type:7,index:i}),l+=p.length-1}i++}}static createElement(r,e){const t=m.createElement("template");return t.innerHTML=r,t}}function E(n,r,e=n,t){var c,s;if(r===x)return r;let o=t!==void 0?(c=e._$Co)==null?void 0:c[t]:e._$Cl;const i=P(r)?void 0:r._$litDirective$;return(o==null?void 0:o.constructor)!==i&&((s=o==null?void 0:o._$AO)==null||s.call(o,!1),i===void 0?o=void 0:(o=new i(n),o._$AT(n,e,t)),t!==void 0?(e._$Co??(e._$Co=[]))[t]=o:e._$Cl=o),o!==void 0&&(r=E(n,o._$AS(n,r.values),o,t)),r}class $r{constructor(r,e){this._$AV=[],this._$AN=void 0,this._$AD=r,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(r){const{el:{content:e},parts:t}=this._$AD,o=((r==null?void 0:r.creationScope)??m).importNode(e,!0);_.currentNode=o;let i=_.nextNode(),c=0,s=0,a=t[0];for(;a!==void 0;){if(c===a.index){let u;a.type===2?u=new U(i,i.nextSibling,this,r):a.type===1?u=new a.ctor(i,a.name,a.strings,this,r):a.type===6&&(u=new xr(i,this,r)),this._$AV.push(u),a=t[++s]}c!==(a==null?void 0:a.index)&&(i=_.nextNode(),c++)}return _.currentNode=m,o}p(r){let e=0;for(const t of this._$AV)t!==void 0&&(t.strings!==void 0?(t._$AI(r,t,e),e+=t.strings.length-2):t._$AI(r[e])),e++}}class U{get _$AU(){var r;return((r=this._$AM)==null?void 0:r._$AU)??this._$Cv}constructor(r,e,t,o){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=r,this._$AB=e,this._$AM=t,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let r=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(r==null?void 0:r.nodeType)===11&&(r=e.parentNode),r}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(r,e=this){r=E(this,r,e),P(r)?r===d||r==null||r===""?(this._$AH!==d&&this._$AR(),this._$AH=d):r!==this._$AH&&r!==x&&this._(r):r._$litType$!==void 0?this.$(r):r.nodeType!==void 0?this.T(r):fr(r)?this.k(r):this._(r)}O(r){return this._$AA.parentNode.insertBefore(r,this._$AB)}T(r){this._$AH!==r&&(this._$AR(),this._$AH=this.O(r))}_(r){this._$AH!==d&&P(this._$AH)?this._$AA.nextSibling.data=r:this.T(m.createTextNode(r)),this._$AH=r}$(r){var i;const{values:e,_$litType$:t}=r,o=typeof t=="number"?this._$AC(r):(t.el===void 0&&(t.el=T.createElement(cr(t.h,t.h[0]),this.options)),t);if(((i=this._$AH)==null?void 0:i._$AD)===o)this._$AH.p(e);else{const c=new $r(o,this),s=c.u(this.options);c.p(e),this.T(s),this._$AH=c}}_$AC(r){let e=nr.get(r.strings);return e===void 0&&nr.set(r.strings,e=new T(r)),e}k(r){D(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let t,o=0;for(const i of r)o===e.length?e.push(t=new U(this.O(C()),this.O(C()),this,this.options)):t=e[o],t._$AI(i),o++;o<e.length&&(this._$AR(t&&t._$AB.nextSibling,o),e.length=o)}_$AR(r=this._$AA.nextSibling,e){var t;for((t=this._$AP)==null?void 0:t.call(this,!1,!0,e);r&&r!==this._$AB;){const o=r.nextSibling;r.remove(),r=o}}setConnected(r){var e;this._$AM===void 0&&(this._$Cv=r,(e=this._$AP)==null||e.call(this,r))}}class O{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(r,e,t,o,i){this.type=1,this._$AH=d,this._$AN=void 0,this.element=r,this.name=e,this._$AM=o,this.options=i,t.length>2||t[0]!==""||t[1]!==""?(this._$AH=Array(t.length-1).fill(new String),this.strings=t):this._$AH=d}_$AI(r,e=this,t,o){const i=this.strings;let c=!1;if(i===void 0)r=E(this,r,e,0),c=!P(r)||r!==this._$AH&&r!==x,c&&(this._$AH=r);else{const s=r;let a,u;for(r=i[0],a=0;a<i.length-1;a++)u=E(this,s[t+a],e,a),u===x&&(u=this._$AH[a]),c||(c=!P(u)||u!==this._$AH[a]),u===d?r=d:r!==d&&(r+=(u??"")+i[a+1]),this._$AH[a]=u}c&&!o&&this.j(r)}j(r){r===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,r??"")}}class _r extends O{constructor(){super(...arguments),this.type=3}j(r){this.element[this.name]=r===d?void 0:r}}class wr extends O{constructor(){super(...arguments),this.type=4}j(r){this.element.toggleAttribute(this.name,!!r&&r!==d)}}class Ar extends O{constructor(r,e,t,o,i){super(r,e,t,o,i),this.type=5}_$AI(r,e=this){if((r=E(this,r,e,0)??d)===x)return;const t=this._$AH,o=r===d&&t!==d||r.capture!==t.capture||r.once!==t.once||r.passive!==t.passive,i=r!==d&&(t===d||o);o&&this.element.removeEventListener(this.name,this,t),i&&this.element.addEventListener(this.name,this,r),this._$AH=r}handleEvent(r){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,r):this._$AH.handleEvent(r)}}class xr{constructor(r,e,t){this.element=r,this.type=6,this._$AN=void 0,this._$AM=e,this.options=t}get _$AU(){return this._$AM._$AU}_$AI(r){E(this,r)}}const I=k.litHtmlPolyfillSupport;I==null||I(T,U),(k.litHtmlVersions??(k.litHtmlVersions=[])).push("3.3.0");const Er=(n,r,e)=>{const t=(e==null?void 0:e.renderBefore)??r;let o=t._$litPart$;if(o===void 0){const i=(e==null?void 0:e.renderBefore)??null;t._$litPart$=o=new U(r.insertBefore(C(),i),i,void 0,e??{})}return o._$AI(n),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w=globalThis;class M extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const r=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=r.firstChild),r}update(r){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(r),this._$Do=Er(e,this.renderRoot,this.renderOptions)}connectedCallback(){var r;super.connectedCallback(),(r=this._$Do)==null||r.setConnected(!0)}disconnectedCallback(){var r;super.disconnectedCallback(),(r=this._$Do)==null||r.setConnected(!1)}render(){return x}}M._$litElement$=!0,M.finalized=!0,(ir=w.litElementHydrateSupport)==null||ir.call(w,{LitElement:M});const W=w.litElementPolyfillSupport;return W==null||W({LitElement:M}),(w.litElementVersions??(w.litElementVersions=[])).push("4.2.0"),sr`
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
    height: calc(var(--size-base-unit) * 1.75);
    width: calc(var(--size-base-unit) * 1.75);
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
    height: calc(var(--size-base-unit) * 2.25);
    width: calc(var(--size-base-unit) * 2.25);
  }
}

::slotted(*) {
  margin-right: 0;
}
/**
 * Button icon directly before button text
 */

cre8-icon-legacy + .cre8-c-button__text:not(.cre8-u-is-vishidden) {
  margin-left: calc(var(--size-base-unit) * 1);
}

cre8-icon + .cre8-c-button__text:not(.cre8-u-is-vishidden) {
  margin-left: calc(var(--size-base-unit) * 1);
}

/**
   * Button icon directly after button text
   */
.cre8-c-button__text:not(.cre8-u-is-vishidden) + cre8-icon-legacy {
  margin-left: calc(var(--size-base-unit) * 1);
}

.cre8-c-button__text:not(.cre8-u-is-vishidden) + cre8-icon {
  margin-left: calc(var(--size-base-unit) * 1);
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
  margin-left: calc(var(--size-base-unit) * 1);
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
    height: calc(var(--size-base-unit) * 2);
    width: calc(var(--size-base-unit) * 2);
  }
}
`});
