(function(p,v){typeof exports=="object"&&typeof module<"u"?module.exports=v():typeof define=="function"&&define.amd?define(v):(p=typeof globalThis<"u"?globalThis:p||self,p.Tag=p.Tag||{},p.Tag.styles=v())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ne;const p=globalThis,v=p.ShadowRoot&&(p.ShadyCSS===void 0||p.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),V=new WeakMap;let W=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(v&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=V.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&V.set(t,e))}return e}toString(){return this.cssText}};const ae=i=>new W(typeof i=="string"?i:i+"",void 0,D),ce=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((r,s,n)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[n+1],i[0]);return new W(t,i,D)},he=(i,e)=>{if(v)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),s=p.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=t.cssText,i.appendChild(r)}},J=v?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return ae(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:le,defineProperty:de,getOwnPropertyDescriptor:ue,getOwnPropertyNames:pe,getOwnPropertySymbols:$e,getPrototypeOf:fe}=Object,f=globalThis,K=f.trustedTypes,_e=K?K.emptyScript:"",L=f.reactiveElementPolyfillSupport,C=(i,e)=>i,z={toAttribute(i,e){switch(e){case Boolean:i=i?_e:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Z=(i,e)=>!le(i,e),F={attribute:!0,type:String,converter:z,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=F){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(e,r,t);s!==void 0&&de(this.prototype,e,s)}}static getPropertyDescriptor(e,t,r){const{get:s,set:n}=ue(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){const c=s==null?void 0:s.call(this);n==null||n.call(this,o),this.requestUpdate(e,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=fe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,r=[...pe(t),...$e(t)];for(const s of r)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,s]of t)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const s=this._$Eu(t,r);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const s of r)t.unshift(J(s))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return he(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){var n;const r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){const o=(((n=r.converter)==null?void 0:n.toAttribute)!==void 0?r.converter:z).toAttribute(t,r.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){var n,o;const r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const c=r.getPropertyOptions(s),a=typeof c.converter=="function"?{fromAttribute:c.converter}:((n=c.converter)==null?void 0:n.fromAttribute)!==void 0?c.converter:z;this._$Em=s,this[s]=a.fromAttribute(t,c.type)??((o=this._$Ej)==null?void 0:o.get(s))??null,this._$Em=null}}requestUpdate(e,t,r){var s;if(e!==void 0){const n=this.constructor,o=this[e];if(r??(r=n.getPropertyOptions(e)),!((r.hasChanged??Z)(o,t)||r.useDefault&&r.reflect&&o===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:s,wrapped:n},o){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s){const{wrapped:c}=o,a=this[n];c!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var s;return(s=r.hostUpdated)==null?void 0:s.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[C("elementProperties")]=new Map,E[C("finalized")]=new Map,L==null||L({ReactiveElement:E}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=globalThis,H=x.trustedTypes,G=H?H.createPolicy("lit-html",{createHTML:i=>i}):void 0,Q="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+_,ge=`<${X}>`,b=document,P=()=>b.createComment(""),U=i=>i===null||typeof i!="object"&&typeof i!="function",j=Array.isArray,ve=i=>j(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",B=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,y=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,re=/"/g,se=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ie=new WeakMap,A=b.createTreeWalker(b,129);function oe(i,e){if(!j(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const be=(i,e)=>{const t=i.length-1,r=[];let s,n=e===2?"<svg>":e===3?"<math>":"",o=T;for(let c=0;c<t;c++){const a=i[c];let d,u,h=-1,$=0;for(;$<a.length&&(o.lastIndex=$,u=o.exec(a),u!==null);)$=o.lastIndex,o===T?u[1]==="!--"?o=Y:u[1]!==void 0?o=ee:u[2]!==void 0?(se.test(u[2])&&(s=RegExp("</"+u[2],"g")),o=y):u[3]!==void 0&&(o=y):o===y?u[0]===">"?(o=s??T,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?y:u[3]==='"'?re:te):o===re||o===te?o=y:o===Y||o===ee?o=T:(o=y,s=void 0);const g=o===y&&i[c+1].startsWith("/>")?" ":"";n+=o===T?a+ge:h>=0?(r.push(d),a.slice(0,h)+Q+a.slice(h)+_+g):a+_+(h===-2?c:g)}return[oe(i,n+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class O{constructor({strings:e,_$litType$:t},r){let s;this.parts=[];let n=0,o=0;const c=e.length-1,a=this.parts,[d,u]=be(e,t);if(this.el=O.createElement(d,r),A.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=A.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(Q)){const $=u[o++],g=s.getAttribute(h).split(_),R=/([.?@])?(.*)/.exec($);a.push({type:1,index:n,name:R[2],strings:g,ctor:R[1]==="."?Ae:R[1]==="?"?me:R[1]==="@"?Ee:M}),s.removeAttribute(h)}else h.startsWith(_)&&(a.push({type:6,index:n}),s.removeAttribute(h));if(se.test(s.tagName)){const h=s.textContent.split(_),$=h.length-1;if($>0){s.textContent=H?H.emptyScript:"";for(let g=0;g<$;g++)s.append(h[g],P()),A.nextNode(),a.push({type:2,index:++n});s.append(h[$],P())}}}else if(s.nodeType===8)if(s.data===X)a.push({type:2,index:n});else{let h=-1;for(;(h=s.data.indexOf(_,h+1))!==-1;)a.push({type:7,index:n}),h+=_.length-1}n++}}static createElement(e,t){const r=b.createElement("template");return r.innerHTML=e,r}}function w(i,e,t=i,r){var o,c;if(e===S)return e;let s=r!==void 0?(o=t._$Co)==null?void 0:o[r]:t._$Cl;const n=U(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((c=s==null?void 0:s._$AO)==null||c.call(s,!1),n===void 0?s=void 0:(s=new n(i),s._$AT(i,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=s:t._$Cl=s),s!==void 0&&(e=w(i,s._$AS(i,e.values),s,r)),e}class ye{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,s=((e==null?void 0:e.creationScope)??b).importNode(t,!0);A.currentNode=s;let n=A.nextNode(),o=0,c=0,a=r[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new k(n,n.nextSibling,this,e):a.type===1?d=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(d=new Se(n,this,e)),this._$AV.push(d),a=r[++c]}o!==(a==null?void 0:a.index)&&(n=A.nextNode(),o++)}return A.currentNode=b,s}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class k{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,s){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),U(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ve(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=O.createElement(oe(r.h,r.h[0]),this.options)),r);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(t);else{const o=new ye(s,this),c=o.u(this.options);o.p(t),this.T(c),this._$AH=o}}_$AC(e){let t=ie.get(e.strings);return t===void 0&&ie.set(e.strings,t=new O(e)),t}k(e){j(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,s=0;for(const n of e)s===t.length?t.push(r=new k(this.O(P()),this.O(P()),this,this.options)):r=t[s],r._$AI(n),s++;s<t.length&&(this._$AR(r&&r._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,s,n){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=l}_$AI(e,t=this,r,s){const n=this.strings;let o=!1;if(n===void 0)e=w(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==S,o&&(this._$AH=e);else{const c=e;let a,d;for(e=n[0],a=0;a<n.length-1;a++)d=w(this,c[r+a],t,a),d===S&&(d=this._$AH[a]),o||(o=!U(d)||d!==this._$AH[a]),d===l?e=l:e!==l&&(e+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!s&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ae extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}}class me extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}}class Ee extends M{constructor(e,t,r,s,n){super(e,t,r,s,n),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??l)===S)return;const r=this._$AH,s=e===l&&r!==l||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==l&&(r===l||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const I=x.litHtmlPolyfillSupport;I==null||I(O,k),(x.litHtmlVersions??(x.litHtmlVersions=[])).push("3.3.0");const we=(i,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let s=r._$litPart$;if(s===void 0){const n=(t==null?void 0:t.renderBefore)??null;r._$litPart$=s=new k(e.insertBefore(P(),n),n,void 0,t??{})}return s._$AI(i),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m=globalThis;class N extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}}N._$litElement$=!0,N.finalized=!0,(ne=m.litElementHydrateSupport)==null||ne.call(m,{LitElement:N});const q=m.litElementPolyfillSupport;return q==null||q({LitElement:N}),(m.litElementVersions??(m.litElementVersions=[])).push("4.2.0"),ce`@import '../../design-tokens/core/scss/theming/component';

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
`});
