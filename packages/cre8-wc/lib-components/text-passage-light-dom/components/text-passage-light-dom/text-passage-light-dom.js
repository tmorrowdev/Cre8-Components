(function($,m){typeof exports=="object"&&typeof module<"u"?module.exports=m():typeof define=="function"&&define.amd?define(m):($=typeof globalThis<"u"?globalThis:$||self,$.TextPassageLightDom=m())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ot;const $=globalThis,m=$.ShadowRoot&&($.ShadyCSS===void 0||$.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),V=new WeakMap;let W=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(m&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=V.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&V.set(e,t))}return t}toString(){return this.cssText}};const at=r=>new W(typeof r=="string"?r:r+"",void 0,z),ht=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new W(e,r,z)},lt=(r,t)=>{if(m)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=$.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},G=m?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return at(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ct,defineProperty:dt,getOwnPropertyDescriptor:pt,getOwnPropertyNames:ut,getOwnPropertySymbols:$t,getPrototypeOf:ft}=Object,f=globalThis,J=f.trustedTypes,gt=J?J.emptyScript:"",L=f.reactiveElementPolyfillSupport,x=(r,t)=>r,D={toAttribute(r,t){switch(t){case Boolean:r=r?gt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},K=(r,t)=>!ct(r,t),Z={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Z){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&dt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=pt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){const h=i==null?void 0:i.call(this);o==null||o.call(this,n),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Z}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,s=[...ut(e),...$t(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(G(i))}else t!==void 0&&e.push(G(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var o;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const n=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:D).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){var o,n;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const h=s.getPropertyOptions(i),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((o=h.converter)==null?void 0:o.fromAttribute)!==void 0?h.converter:D;this._$Em=i,this[i]=a.fromAttribute(e,h.type)??((n=this._$Ej)==null?void 0:n.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const o=this.constructor,n=this[t];if(s??(s=o.getPropertyOptions(t)),!((s.hasChanged??K)(n,e)||s.useDefault&&s.reflect&&n===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i){const{wrapped:h}=n,a=this[o];h!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[x("elementProperties")]=new Map,E[x("finalized")]=new Map,L==null||L({ReactiveElement:E}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,T=C.trustedTypes,F=T?T.createPolicy("lit-html",{createHTML:r=>r}):void 0,Q="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+g,_t=`<${X}>`,y=document,P=()=>y.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",B=Array.isArray,mt=r=>B(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",j=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,tt=/>/g,A=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),et=/'/g,st=/"/g,it=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),rt=new WeakMap,v=y.createTreeWalker(y,129);function nt(r,t){if(!B(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return F!==void 0?F.createHTML(t):t}const yt=(r,t)=>{const e=r.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",n=O;for(let h=0;h<e;h++){const a=r[h];let d,p,l=-1,u=0;for(;u<a.length&&(n.lastIndex=u,p=n.exec(a),p!==null);)u=n.lastIndex,n===O?p[1]==="!--"?n=Y:p[1]!==void 0?n=tt:p[2]!==void 0?(it.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=A):p[3]!==void 0&&(n=A):n===A?p[0]===">"?(n=i??O,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?A:p[3]==='"'?st:et):n===st||n===et?n=A:n===Y||n===tt?n=O:(n=A,i=void 0);const _=n===A&&r[h+1].startsWith("/>")?" ":"";o+=n===O?a+_t:l>=0?(s.push(d),a.slice(0,l)+Q+a.slice(l)+g+_):a+g+(l===-2?h:_)}return[nt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class k{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const h=t.length-1,a=this.parts,[d,p]=yt(t,e);if(this.el=k.createElement(d,s),v.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=v.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(Q)){const u=p[n++],_=i.getAttribute(l).split(g),R=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:R[2],strings:_,ctor:R[1]==="."?vt:R[1]==="?"?bt:R[1]==="@"?Et:M}),i.removeAttribute(l)}else l.startsWith(g)&&(a.push({type:6,index:o}),i.removeAttribute(l));if(it.test(i.tagName)){const l=i.textContent.split(g),u=l.length-1;if(u>0){i.textContent=T?T.emptyScript:"";for(let _=0;_<u;_++)i.append(l[_],P()),v.nextNode(),a.push({type:2,index:++o});i.append(l[u],P())}}}else if(i.nodeType===8)if(i.data===X)a.push({type:2,index:o});else{let l=-1;for(;(l=i.data.indexOf(g,l+1))!==-1;)a.push({type:7,index:o}),l+=g.length-1}o++}}static createElement(t,e){const s=y.createElement("template");return s.innerHTML=t,s}}function w(r,t,e=r,s){var n,h;if(t===S)return t;let i=s!==void 0?(n=e._$Co)==null?void 0:n[s]:e._$Cl;const o=U(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((h=i==null?void 0:i._$AO)==null||h.call(i,!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=w(r,i._$AS(r,t.values),i,s)),t}class At{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??y).importNode(e,!0);v.currentNode=i;let o=v.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new H(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new St(o,this,t)),this._$AV.push(d),a=s[++h]}n!==(a==null?void 0:a.index)&&(o=v.nextNode(),n++)}return v.currentNode=y,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class H{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),U(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):mt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(y.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=k.createElement(nt(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(e);else{const n=new At(i,this),h=n.u(this.options);n.p(e),this.T(h),this._$AH=n}}_$AC(t){let e=rt.get(t.strings);return e===void 0&&rt.set(t.strings,e=new k(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new H(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(o===void 0)t=w(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==S,n&&(this._$AH=t);else{const h=t;let a,d;for(t=o[0],a=0;a<o.length-1;a++)d=w(this,h[s+a],e,a),d===S&&(d=this._$AH[a]),n||(n=!U(d)||d!==this._$AH[a]),d===c?t=c:t!==c&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class vt extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class bt extends M{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class Et extends M{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??c)===S)return;const s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class St{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const I=C.litHtmlPolyfillSupport;I==null||I(k,H),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.3.0");const wt=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const o=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new H(t.insertBefore(P(),o),o,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class N extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return S}}N._$litElement$=!0,N.finalized=!0,(ot=b.litElementHydrateSupport)==null||ot.call(b,{LitElement:N});const q=b.litElementPolyfillSupport;return q==null||q({LitElement:N}),(b.litElementVersions??(b.litElementVersions=[])).push("4.2.0"),ht`@import '/design-tokens/core/scss/theming/component';

/**
 * 1) A passage of text  (e.g. article, blog post), including uncontrolled elements
 *    (e.g. unclassed h2, h3, ul, li, and so on).
 * 2) Use this file only for styling text passage and elements inside of text passage.
 */
cre8-text-passage,
cre8-text-passage[size='default'] {
  @include technology.cre8-typography-body-default();

  /**
  * Generic h1 within text passage
  */

  h1 {
    @include technology.cre8-typography-display-small();
    margin-bottom: calc(var(--size-base-unit) * 1.5);
  }

  /**
  * Generic h2 within text passage
  */
  h2 {
    @include technology.cre8-typography-headline-default();
    margin-bottom: calc(var(--size-base-unit) * 1.5);
  }

  /**
  * Generic h3 within text passage
  */
  h3 {
    @include technology.cre8-typography-headline-small();
    margin-bottom: calc(var(--size-base-unit) * 1.5);
  }

  /**
  * Generic h4 within text passage
  */
  h4 {
    @include technology.cre8-typography-title-large();
    margin-bottom: calc(var(--size-base-unit) * 1.5);
  }

  /**
  * Generic h5 within text passage
  */
  h5 {
    @include technology.cre8-typography-meta-large();
    margin-bottom: calc(var(--size-base-unit) * 1.5);
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
    margin-left: calc(var(--size-base-unit) * 2.5);
    padding-left: 0;
  }

  /**
  * Ordered list within text passage
  */
  ol {
    margin-left: calc(var(--size-base-unit) * 2.25);
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
    margin-bottom: calc(var(--size-base-unit) * 3);
  }

  /**
  * Blockquote within text passage
  */
  blockquote {
    font-style: italic;
    border-left: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-content-subtle);
    color: var(--cre8-color-content-subtle);
    padding-left: calc(var(--size-base-unit) * 2);
    margin-left: 0;
    margin-bottom: calc(var(--size-base-unit) * 2);
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
    padding-left: calc(var(--size-base-unit) * 2);
    margin-left: 0;
    margin-bottom: calc(var(--size-base-unit) * 2);
  }
}
`});
