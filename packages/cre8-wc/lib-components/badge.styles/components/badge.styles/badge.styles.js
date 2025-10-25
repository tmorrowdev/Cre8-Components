(function(p,b){typeof exports=="object"&&typeof module<"u"?module.exports=b():typeof define=="function"&&define.amd?define(b):(p=typeof globalThis<"u"?globalThis:p||self,p.Badge=p.Badge||{},p.Badge.styles=b())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ne;const p=globalThis,b=p.ShadowRoot&&(p.ShadyCSS===void 0||p.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,L=Symbol(),V=new WeakMap;let q=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==L)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(b&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=V.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&V.set(t,e))}return e}toString(){return this.cssText}};const ce=i=>new q(typeof i=="string"?i:i+"",void 0,L),ae=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new q(t,i,L)},he=(i,e)=>{if(b)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),r=p.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},J=b?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return ce(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:le,defineProperty:de,getOwnPropertyDescriptor:ue,getOwnPropertyNames:pe,getOwnPropertySymbols:ge,getPrototypeOf:$e}=Object,$=globalThis,K=$.trustedTypes,fe=K?K.emptyScript:"",z=$.reactiveElementPolyfillSupport,C=(i,e)=>i,B={toAttribute(i,e){switch(e){case Boolean:i=i?fe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Z=(i,e)=>!le(i,e),F={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=F){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&de(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){const{get:r,set:n}=ue(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){const a=r==null?void 0:r.call(this);n==null||n.call(this,o),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=$e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,s=[...pe(t),...ge(t)];for(const r of s)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const r of s)t.unshift(J(r))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return he(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var n;const s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:B).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){var n,o;const s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const a=s.getPropertyOptions(r),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:B;this._$Em=r,this[r]=c.fromAttribute(t,a.type)??((o=this._$Ej)==null?void 0:o.get(r))??null,this._$Em=null}}requestUpdate(e,t,s){var r;if(e!==void 0){const n=this.constructor,o=this[e];if(s??(s=n.getPropertyOptions(e)),!((s.hasChanged??Z)(o,t)||s.useDefault&&s.reflect&&o===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,o]of r){const{wrapped:a}=o,c=this[n];a!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var r;return(r=s.hostUpdated)==null?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[C("elementProperties")]=new Map,E[C("finalized")]=new Map,z==null||z({ReactiveElement:E}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,T=P.trustedTypes,G=T?T.createPolicy("lit-html",{createHTML:i=>i}):void 0,Q="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+f,_e=`<${X}>`,A=document,x=()=>A.createComment(""),U=i=>i===null||typeof i!="object"&&typeof i!="function",D=Array.isArray,be=i=>D(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",I=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,m=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,se=/"/g,re=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ie=new WeakMap,v=A.createTreeWalker(A,129);function oe(i,e){if(!D(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const Ae=(i,e)=>{const t=i.length-1,s=[];let r,n=e===2?"<svg>":e===3?"<math>":"",o=k;for(let a=0;a<t;a++){const c=i[a];let d,u,h=-1,g=0;for(;g<c.length&&(o.lastIndex=g,u=o.exec(c),u!==null);)g=o.lastIndex,o===k?u[1]==="!--"?o=Y:u[1]!==void 0?o=ee:u[2]!==void 0?(re.test(u[2])&&(r=RegExp("</"+u[2],"g")),o=m):u[3]!==void 0&&(o=m):o===m?u[0]===">"?(o=r??k,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?m:u[3]==='"'?se:te):o===se||o===te?o=m:o===Y||o===ee?o=k:(o=m,r=void 0);const _=o===m&&i[a+1].startsWith("/>")?" ":"";n+=o===k?c+_e:h>=0?(s.push(d),c.slice(0,h)+Q+c.slice(h)+f+_):c+f+(h===-2?a:_)}return[oe(i,n+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class O{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let n=0,o=0;const a=e.length-1,c=this.parts,[d,u]=Ae(e,t);if(this.el=O.createElement(d,s),v.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=v.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(Q)){const g=u[o++],_=r.getAttribute(h).split(f),R=/([.?@])?(.*)/.exec(g);c.push({type:1,index:n,name:R[2],strings:_,ctor:R[1]==="."?ve:R[1]==="?"?ye:R[1]==="@"?Ee:M}),r.removeAttribute(h)}else h.startsWith(f)&&(c.push({type:6,index:n}),r.removeAttribute(h));if(re.test(r.tagName)){const h=r.textContent.split(f),g=h.length-1;if(g>0){r.textContent=T?T.emptyScript:"";for(let _=0;_<g;_++)r.append(h[_],x()),v.nextNode(),c.push({type:2,index:++n});r.append(h[g],x())}}}else if(r.nodeType===8)if(r.data===X)c.push({type:2,index:n});else{let h=-1;for(;(h=r.data.indexOf(f,h+1))!==-1;)c.push({type:7,index:n}),h+=f.length-1}n++}}static createElement(e,t){const s=A.createElement("template");return s.innerHTML=e,s}}function w(i,e,t=i,s){var o,a;if(e===S)return e;let r=s!==void 0?(o=t._$Co)==null?void 0:o[s]:t._$Cl;const n=U(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((a=r==null?void 0:r._$AO)==null||a.call(r,!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=r:t._$Cl=r),r!==void 0&&(e=w(i,r._$AS(i,e.values),r,s)),e}class me{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,r=((e==null?void 0:e.creationScope)??A).importNode(t,!0);v.currentNode=r;let n=v.nextNode(),o=0,a=0,c=s[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new H(n,n.nextSibling,this,e):c.type===1?d=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(d=new Se(n,this,e)),this._$AV.push(d),c=s[++a]}o!==(c==null?void 0:c.index)&&(n=v.nextNode(),o++)}return v.currentNode=A,r}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class H{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),U(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):be(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=O.createElement(oe(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(t);else{const o=new me(r,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=ie.get(e.strings);return t===void 0&&ie.set(e.strings,t=new O(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,r=0;for(const n of e)r===t.length?t.push(s=new H(this.O(x()),this.O(x()),this,this.options)):s=t[r],s._$AI(n),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,n){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(e,t=this,s,r){const n=this.strings;let o=!1;if(n===void 0)e=w(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==S,o&&(this._$AH=e);else{const a=e;let c,d;for(e=n[0],c=0;c<n.length-1;c++)d=w(this,a[s+c],t,c),d===S&&(d=this._$AH[c]),o||(o=!U(d)||d!==this._$AH[c]),d===l?e=l:e!==l&&(e+=(d??"")+n[c+1]),this._$AH[c]=d}o&&!r&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ve extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}}class ye extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}}class Ee extends M{constructor(e,t,s,r,n){super(e,t,s,r,n),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??l)===S)return;const s=this._$AH,r=e===l&&s!==l||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==l&&(s===l||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const j=P.litHtmlPolyfillSupport;j==null||j(O,H),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.0");const we=(i,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let r=s._$litPart$;if(r===void 0){const n=(t==null?void 0:t.renderBefore)??null;s._$litPart$=r=new H(e.insertBefore(x(),n),n,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=globalThis;class N extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}}N._$litElement$=!0,N.finalized=!0,(ne=y.litElementHydrateSupport)==null||ne.call(y,{LitElement:N});const W=y.litElementPolyfillSupport;return W==null||W({LitElement:N}),(y.litElementVersions??(y.litElementVersions=[])).push("4.2.0"),ae`
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
  height: var(--cre8-icon-height, calc(var(--size-base-unit) * 2));
  margin-right: calc(var(--size-base-unit) * 0.5);
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
}`});
