(function(u,b){typeof exports=="object"&&typeof module<"u"?module.exports=b():typeof define=="function"&&define.amd?define(b):(u=typeof globalThis<"u"?globalThis:u||self,u.Popover=u.Popover||{},u.Popover.styles=b())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ne;const u=globalThis,b=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),W=new WeakMap;let q=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(b&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=W.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&W.set(t,e))}return e}toString(){return this.cssText}};const ae=i=>new q(typeof i=="string"?i:i+"",void 0,z),le=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((r,s,n)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[n+1],i[0]);return new q(t,i,z)},he=(i,e)=>{if(b)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),s=u.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=t.cssText,i.appendChild(r)}},X=b?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return ae(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ce,defineProperty:de,getOwnPropertyDescriptor:pe,getOwnPropertyNames:ue,getOwnPropertySymbols:fe,getPrototypeOf:$e}=Object,$=globalThis,Y=$.trustedTypes,ve=Y?Y.emptyScript:"",D=$.reactiveElementPolyfillSupport,P=(i,e)=>i,L={toAttribute(i,e){switch(e){case Boolean:i=i?ve:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},F=(i,e)=>!ce(i,e),J={attribute:!0,type:String,converter:L,reflect:!1,useDefault:!1,hasChanged:F};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=J){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(e,r,t);s!==void 0&&de(this.prototype,e,s)}}static getPropertyDescriptor(e,t,r){const{get:s,set:n}=pe(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){const l=s==null?void 0:s.call(this);n==null||n.call(this,o),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??J}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const e=$e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const t=this.properties,r=[...ue(t),...fe(t)];for(const s of r)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,s]of t)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const s=this._$Eu(t,r);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const s of r)t.unshift(X(s))}else e!==void 0&&t.push(X(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return he(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){var n;const r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){const o=(((n=r.converter)==null?void 0:n.toAttribute)!==void 0?r.converter:L).toAttribute(t,r.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){var n,o;const r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const l=r.getPropertyOptions(s),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:L;this._$Em=s,this[s]=a.fromAttribute(t,l.type)??((o=this._$Ej)==null?void 0:o.get(s))??null,this._$Em=null}}requestUpdate(e,t,r){var s;if(e!==void 0){const n=this.constructor,o=this[e];if(r??(r=n.getPropertyOptions(e)),!((r.hasChanged??F)(o,t)||r.useDefault&&r.reflect&&o===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:s,wrapped:n},o){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s){const{wrapped:l}=o,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var s;return(s=r.hostUpdated)==null?void 0:s.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[P("elementProperties")]=new Map,E[P("finalized")]=new Map,D==null||D({ReactiveElement:E}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,M=C.trustedTypes,K=M?M.createPolicy("lit-html",{createHTML:i=>i}):void 0,Z="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,G="?"+v,_e=`<${G}>`,g=document,x=()=>g.createComment(""),k=i=>i===null||typeof i!="object"&&typeof i!="function",I=Array.isArray,be=i=>I(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",j=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Q=/-->/g,ee=/>/g,y=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,re=/"/g,se=/^(?:script|style|textarea|title)$/i,w=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ie=new WeakMap,m=g.createTreeWalker(g,129);function oe(i,e){if(!I(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return K!==void 0?K.createHTML(e):e}const ge=(i,e)=>{const t=i.length-1,r=[];let s,n=e===2?"<svg>":e===3?"<math>":"",o=U;for(let l=0;l<t;l++){const a=i[l];let d,p,h=-1,f=0;for(;f<a.length&&(o.lastIndex=f,p=o.exec(a),p!==null);)f=o.lastIndex,o===U?p[1]==="!--"?o=Q:p[1]!==void 0?o=ee:p[2]!==void 0?(se.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=y):p[3]!==void 0&&(o=y):o===y?p[0]===">"?(o=s??U,h=-1):p[1]===void 0?h=-2:(h=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?y:p[3]==='"'?re:te):o===re||o===te?o=y:o===Q||o===ee?o=U:(o=y,s=void 0);const _=o===y&&i[l+1].startsWith("/>")?" ":"";n+=o===U?a+_e:h>=0?(r.push(d),a.slice(0,h)+Z+a.slice(h)+v+_):a+v+(h===-2?l:_)}return[oe(i,n+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class T{constructor({strings:e,_$litType$:t},r){let s;this.parts=[];let n=0,o=0;const l=e.length-1,a=this.parts,[d,p]=ge(e,t);if(this.el=T.createElement(d,r),m.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=m.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(Z)){const f=p[o++],_=s.getAttribute(h).split(v),N=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:N[2],strings:_,ctor:N[1]==="."?me:N[1]==="?"?Ae:N[1]==="@"?Ee:H}),s.removeAttribute(h)}else h.startsWith(v)&&(a.push({type:6,index:n}),s.removeAttribute(h));if(se.test(s.tagName)){const h=s.textContent.split(v),f=h.length-1;if(f>0){s.textContent=M?M.emptyScript:"";for(let _=0;_<f;_++)s.append(h[_],x()),m.nextNode(),a.push({type:2,index:++n});s.append(h[f],x())}}}else if(s.nodeType===8)if(s.data===G)a.push({type:2,index:n});else{let h=-1;for(;(h=s.data.indexOf(v,h+1))!==-1;)a.push({type:7,index:n}),h+=v.length-1}n++}}static createElement(e,t){const r=g.createElement("template");return r.innerHTML=e,r}}function S(i,e,t=i,r){var o,l;if(e===w)return e;let s=r!==void 0?(o=t._$Co)==null?void 0:o[r]:t._$Cl;const n=k(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),n===void 0?s=void 0:(s=new n(i),s._$AT(i,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=s:t._$Cl=s),s!==void 0&&(e=S(i,s._$AS(i,e.values),s,r)),e}class ye{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,s=((e==null?void 0:e.creationScope)??g).importNode(t,!0);m.currentNode=s;let n=m.nextNode(),o=0,l=0,a=r[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new O(n,n.nextSibling,this,e):a.type===1?d=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(d=new we(n,this,e)),this._$AV.push(d),a=r[++l]}o!==(a==null?void 0:a.index)&&(n=m.nextNode(),o++)}return m.currentNode=g,s}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class O{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),k(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):be(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&k(this._$AH)?this._$AA.nextSibling.data=e:this.T(g.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=T.createElement(oe(r.h,r.h[0]),this.options)),r);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(t);else{const o=new ye(s,this),l=o.u(this.options);o.p(t),this.T(l),this._$AH=o}}_$AC(e){let t=ie.get(e.strings);return t===void 0&&ie.set(e.strings,t=new T(e)),t}k(e){I(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,s=0;for(const n of e)s===t.length?t.push(r=new O(this.O(x()),this.O(x()),this,this.options)):r=t[s],r._$AI(n),s++;s<t.length&&(this._$AR(r&&r._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,s,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=c}_$AI(e,t=this,r,s){const n=this.strings;let o=!1;if(n===void 0)e=S(this,e,t,0),o=!k(e)||e!==this._$AH&&e!==w,o&&(this._$AH=e);else{const l=e;let a,d;for(e=n[0],a=0;a<n.length-1;a++)d=S(this,l[r+a],t,a),d===w&&(d=this._$AH[a]),o||(o=!k(d)||d!==this._$AH[a]),d===c?e=c:e!==c&&(e+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!s&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class me extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class Ae extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class Ee extends H{constructor(e,t,r,s,n){super(e,t,r,s,n),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??c)===w)return;const r=this._$AH,s=e===c&&r!==c||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==c&&(r===c||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class we{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const B=C.litHtmlPolyfillSupport;B==null||B(T,O),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.3.0");const Se=(i,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let s=r._$litPart$;if(s===void 0){const n=(t==null?void 0:t.renderBefore)??null;r._$litPart$=s=new O(e.insertBefore(x(),n),n,void 0,t??{})}return s._$AI(i),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;class R extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Se(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return w}}R._$litElement$=!0,R.finalized=!0,(ne=A.litElementHydrateSupport)==null||ne.call(A,{LitElement:R});const V=A.litElementPolyfillSupport;return V==null||V({LitElement:R}),(A.litElementVersions??(A.litElementVersions=[])).push("4.2.0"),le`@import '../../design-tokens/core/scss/theming/component';
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
  inset-block-start: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
  inset-block-end: auto;
  inset-inline-start: 50%;
  inset-inline-end: auto;
  transform: translateX(var(--rtlTranslateX, -50%));
  display: flex;
  flex-direction: column;
  gap: calc(var(--size-base-unit) * 1);
  width: calc(var(--size-base-unit) * 32);
  z-index: 400; /* 1 */
  background-color: var(--cre8-color-bg-default);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  box-shadow: var(--cre8-shadow-default);
  padding: calc(var(--size-base-unit) * 2);

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
    inset-block-end: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
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
    inset-inline-end: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
    transform: translateY(-50%);
  }

  /**
   * Popover panel positioned to the right of the trigger
   */
  .cre8-c-popover--right & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
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
  width: calc(var(--size-base-unit) * 1.5);
  height: calc(var(--size-base-unit) * 1.5);
  position: absolute;
  margin: auto;
  background-color: var(--cre8-color-bg-default);
  border-block-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-inline-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  inset-block-start: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
  inset-inline-start: 50%;
  transform: translateX(var(--rtlTranslateX, -50%)) rotate(45deg);

  /**
   * Moves the popover panel arrow to the top of the panel
   */
  .cre8-c-popover--top & {
    inset-block-start: auto;
    inset-block-end: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
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
    inset-inline-end: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
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
    inset-inline-start: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
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
  gap: calc(var(--size-base-unit) * 2);
}
`});
