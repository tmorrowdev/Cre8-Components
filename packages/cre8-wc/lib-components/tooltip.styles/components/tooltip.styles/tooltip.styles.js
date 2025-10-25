(function(u,v){typeof exports=="object"&&typeof module<"u"?module.exports=v():typeof define=="function"&&define.amd?define(v):(u=typeof globalThis<"u"?globalThis:u||self,u.Tooltip=u.Tooltip||{},u.Tooltip.styles=v())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var nt;const u=globalThis,v=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,R=Symbol(),W=new WeakMap;let q=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==R)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(v&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=W.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&W.set(e,t))}return t}toString(){return this.cssText}};const at=i=>new q(typeof i=="string"?i:i+"",void 0,R),lt=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new q(e,i,R)},ct=(i,t)=>{if(v)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),r=u.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},X=v?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return at(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ht,defineProperty:dt,getOwnPropertyDescriptor:pt,getOwnPropertyNames:ut,getOwnPropertySymbols:ft,getPrototypeOf:$t}=Object,$=globalThis,Y=$.trustedTypes,_t=Y?Y.emptyScript:"",L=$.reactiveElementPolyfillSupport,k=(i,t)=>i,D={toAttribute(i,t){switch(t){case Boolean:i=i?_t:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},J=(i,t)=>!ht(i,t),K={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:J};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=K){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&dt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){const{get:r,set:n}=pt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:r,set(o){const l=r==null?void 0:r.call(this);n==null||n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??K}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;const t=$t(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){const e=this.properties,s=[...ut(e),...ft(e)];for(const r of s)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const r of s)e.unshift(X(r))}else t!==void 0&&e.push(X(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ct(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:D).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){var n,o;const s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const l=s.getPropertyOptions(r),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:D;this._$Em=r,this[r]=a.fromAttribute(e,l.type)??((o=this._$Ej)==null?void 0:o.get(r))??null,this._$Em=null}}requestUpdate(t,e,s){var r;if(t!==void 0){const n=this.constructor,o=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??J)(o,e)||s.useDefault&&s.reflect&&o===((r=this._$Ej)==null?void 0:r.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,o]of r){const{wrapped:l}=o,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var r;return(r=s.hostUpdated)==null?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[k("elementProperties")]=new Map,E[k("finalized")]=new Map,L==null||L({ReactiveElement:E}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis,M=T.trustedTypes,Z=M?M.createPolicy("lit-html",{createHTML:i=>i}):void 0,F="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,G="?"+_,bt=`<${G}>`,g=document,C=()=>g.createComment(""),x=i=>i===null||typeof i!="object"&&typeof i!="function",I=Array.isArray,vt=i=>I(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",j=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Q=/-->/g,tt=/>/g,y=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),et=/'/g,st=/"/g,rt=/^(?:script|style|textarea|title)$/i,w=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),it=new WeakMap,m=g.createTreeWalker(g,129);function ot(i,t){if(!I(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Z!==void 0?Z.createHTML(t):t}const gt=(i,t)=>{const e=i.length-1,s=[];let r,n=t===2?"<svg>":t===3?"<math>":"",o=P;for(let l=0;l<e;l++){const a=i[l];let d,p,c=-1,f=0;for(;f<a.length&&(o.lastIndex=f,p=o.exec(a),p!==null);)f=o.lastIndex,o===P?p[1]==="!--"?o=Q:p[1]!==void 0?o=tt:p[2]!==void 0?(rt.test(p[2])&&(r=RegExp("</"+p[2],"g")),o=y):p[3]!==void 0&&(o=y):o===y?p[0]===">"?(o=r??P,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?y:p[3]==='"'?st:et):o===st||o===et?o=y:o===Q||o===tt?o=P:(o=y,r=void 0);const b=o===y&&i[l+1].startsWith("/>")?" ":"";n+=o===P?a+bt:c>=0?(s.push(d),a.slice(0,c)+F+a.slice(c)+_+b):a+_+(c===-2?l:b)}return[ot(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class U{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[d,p]=gt(t,e);if(this.el=U.createElement(d,s),m.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=m.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const c of r.getAttributeNames())if(c.endsWith(F)){const f=p[o++],b=r.getAttribute(c).split(_),N=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:N[2],strings:b,ctor:N[1]==="."?mt:N[1]==="?"?At:N[1]==="@"?Et:H}),r.removeAttribute(c)}else c.startsWith(_)&&(a.push({type:6,index:n}),r.removeAttribute(c));if(rt.test(r.tagName)){const c=r.textContent.split(_),f=c.length-1;if(f>0){r.textContent=M?M.emptyScript:"";for(let b=0;b<f;b++)r.append(c[b],C()),m.nextNode(),a.push({type:2,index:++n});r.append(c[f],C())}}}else if(r.nodeType===8)if(r.data===G)a.push({type:2,index:n});else{let c=-1;for(;(c=r.data.indexOf(_,c+1))!==-1;)a.push({type:7,index:n}),c+=_.length-1}n++}}static createElement(t,e){const s=g.createElement("template");return s.innerHTML=t,s}}function S(i,t,e=i,s){var o,l;if(t===w)return t;let r=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=x(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=r:e._$Cl=r),r!==void 0&&(t=S(i,r._$AS(i,t.values),r,s)),t}class yt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,r=((t==null?void 0:t.creationScope)??g).importNode(e,!0);m.currentNode=r;let n=m.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new O(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new wt(n,this,t)),this._$AV.push(d),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=m.nextNode(),o++)}return m.currentNode=g,r}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class O{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),x(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):vt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&x(this._$AH)?this._$AA.nextSibling.data=t:this.T(g.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(ot(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(e);else{const o=new yt(r,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=it.get(t.strings);return e===void 0&&it.set(t.strings,e=new U(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const n of t)r===e.length?e.push(s=new O(this.O(C()),this.O(C()),this,this.options)):s=e[r],s._$AI(n),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(t,e=this,s,r){const n=this.strings;let o=!1;if(n===void 0)t=S(this,t,e,0),o=!x(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=S(this,l[s+a],e,a),d===w&&(d=this._$AH[a]),o||(o=!x(d)||d!==this._$AH[a]),d===h?t=h:t!==h&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!r&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class mt extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}}class At extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}}class Et extends H{constructor(t,e,s,r,n){super(t,e,s,r,n),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??h)===w)return;const s=this._$AH,r=t===h&&s!==h||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==h&&(s===h||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class wt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const B=T.litHtmlPolyfillSupport;B==null||B(U,O),(T.litHtmlVersions??(T.litHtmlVersions=[])).push("3.3.0");const St=(i,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let r=s._$litPart$;if(r===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=r=new O(t.insertBefore(C(),n),n,void 0,e??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;class z extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=St(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return w}}z._$litElement$=!0,z.finalized=!0,(nt=A.litElementHydrateSupport)==null||nt.call(A,{LitElement:z});const V=A.litElementPolyfillSupport;return V==null||V({LitElement:z}),(A.litElementVersions??(A.litElementVersions=[])).push("4.2.0"),lt`@import '../../design-tokens/core/scss/theming/component';
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
  inset-block-start: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
  inset-block-end: auto;
  inset-inline-start: 50%;
  inset-inline-end: auto;
  transform: translateX(var(--rtlTranslateX, -50%));
  display: flex;
  flex-direction: column;
  gap: calc(var(--size-base-unit) * 1);
  width: max-content;
  max-width: calc(var(--size-base-unit) * 35);
  z-index: 400;
  color: var(--cre8-color-content-knockout);
  background-color: var(--cre8-color-bg-strong);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  padding: calc(var(--size-base-unit) * 1);

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
    inset-block-end: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
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
    inset-inline-end: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
    transform: translateY(-50%);
  }

  /**
   * Tooltip panel positioned to the right of the trigger
   */
  .cre8-c-tooltip--right & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
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
  width: calc(var(--size-base-unit) * 1.5);
  height: calc(var(--size-base-unit) * 1.5);
  position: absolute;
  margin: auto;
  background-color: var(--cre8-color-bg-strong);
  border-block-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-inline-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  inset-block-start: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
  inset-inline-start: 50%;
  transform: translateX(var(--rtlTranslateX, -50%)) rotate(45deg);

  /**
   * Moves the tooltip panel arrow to the top of the panel
   */
  .cre8-c-tooltip--top & {
    inset-block-start: auto;
    inset-block-end: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
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
    inset-inline-end: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
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
    inset-inline-start: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
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
  gap: calc(var(--size-base-unit) * 2);
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
  height: calc(var(--size-base-unit) * 2);
  width: calc(var(--size-base-unit) * 2);
}
`});
