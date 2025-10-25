(function(u,v){typeof exports=="object"&&typeof module<"u"?module.exports=v():typeof define=="function"&&define.amd?define(v):(u=typeof globalThis<"u"?globalThis:u||self,u.Tab=u.Tab||{},u.Tab.styles=v())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var oe;const u=globalThis,v=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),V=new WeakMap;let W=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(v&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=V.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&V.set(t,e))}return e}toString(){return this.cssText}};const ae=r=>new W(typeof r=="string"?r:r+"",void 0,z),he=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new W(t,r,z)},ce=(r,e)=>{if(v)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=u.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},J=v?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return ae(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:le,defineProperty:de,getOwnPropertyDescriptor:pe,getOwnPropertyNames:ue,getOwnPropertySymbols:$e,getPrototypeOf:fe}=Object,f=globalThis,K=f.trustedTypes,_e=K?K.emptyScript:"",D=f.reactiveElementPolyfillSupport,C=(r,e)=>r,L={toAttribute(r,e){switch(e){case Boolean:r=r?_e:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Z=(r,e)=>!le(r,e),F={attribute:!0,type:String,converter:L,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=F){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&de(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:o}=pe(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){const h=i==null?void 0:i.call(this);o==null||o.call(this,n),this.requestUpdate(e,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=fe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,s=[...ue(t),...$e(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(J(i))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var o;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const n=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:L).toAttribute(t,s.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){var o,n;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const h=s.getPropertyOptions(i),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((o=h.converter)==null?void 0:o.fromAttribute)!==void 0?h.converter:L;this._$Em=i,this[i]=a.fromAttribute(t,h.type)??((n=this._$Ej)==null?void 0:n.get(i))??null,this._$Em=null}}requestUpdate(e,t,s){var i;if(e!==void 0){const o=this.constructor,n=this[e];if(s??(s=o.getPropertyOptions(e)),!((s.hasChanged??Z)(n,t)||s.useDefault&&s.reflect&&n===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i){const{wrapped:h}=n,a=this[o];h!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[C("elementProperties")]=new Map,E[C("finalized")]=new Map,D==null||D({ReactiveElement:E}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,H=P.trustedTypes,G=H?H.createPolicy("lit-html",{createHTML:r=>r}):void 0,Q="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+_,be=`<${X}>`,g=document,x=()=>g.createComment(""),T=r=>r===null||typeof r!="object"&&typeof r!="function",j=Array.isArray,ve=r=>j(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",B=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,m=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,se=/"/g,ie=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),re=new WeakMap,A=g.createTreeWalker(g,129);function ne(r,e){if(!j(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const ge=(r,e)=>{const t=r.length-1,s=[];let i,o=e===2?"<svg>":e===3?"<math>":"",n=U;for(let h=0;h<t;h++){const a=r[h];let d,p,c=-1,$=0;for(;$<a.length&&(n.lastIndex=$,p=n.exec(a),p!==null);)$=n.lastIndex,n===U?p[1]==="!--"?n=Y:p[1]!==void 0?n=ee:p[2]!==void 0?(ie.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=m):p[3]!==void 0&&(n=m):n===m?p[0]===">"?(n=i??U,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?m:p[3]==='"'?se:te):n===se||n===te?n=m:n===Y||n===ee?n=U:(n=m,i=void 0);const b=n===m&&r[h+1].startsWith("/>")?" ":"";o+=n===U?a+be:c>=0?(s.push(d),a.slice(0,c)+Q+a.slice(c)+_+b):a+_+(c===-2?h:b)}return[ne(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class k{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,n=0;const h=e.length-1,a=this.parts,[d,p]=ge(e,t);if(this.el=k.createElement(d,s),A.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=A.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(Q)){const $=p[n++],b=i.getAttribute(c).split(_),R=/([.?@])?(.*)/.exec($);a.push({type:1,index:o,name:R[2],strings:b,ctor:R[1]==="."?Ae:R[1]==="?"?ye:R[1]==="@"?Ee:M}),i.removeAttribute(c)}else c.startsWith(_)&&(a.push({type:6,index:o}),i.removeAttribute(c));if(ie.test(i.tagName)){const c=i.textContent.split(_),$=c.length-1;if($>0){i.textContent=H?H.emptyScript:"";for(let b=0;b<$;b++)i.append(c[b],x()),A.nextNode(),a.push({type:2,index:++o});i.append(c[$],x())}}}else if(i.nodeType===8)if(i.data===X)a.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf(_,c+1))!==-1;)a.push({type:7,index:o}),c+=_.length-1}o++}}static createElement(e,t){const s=g.createElement("template");return s.innerHTML=e,s}}function w(r,e,t=r,s){var n,h;if(e===S)return e;let i=s!==void 0?(n=t._$Co)==null?void 0:n[s]:t._$Cl;const o=T(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((h=i==null?void 0:i._$AO)==null||h.call(i,!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=w(r,i._$AS(r,e.values),i,s)),e}class me{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??g).importNode(t,!0);A.currentNode=i;let o=A.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new O(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Se(o,this,e)),this._$AV.push(d),a=s[++h]}n!==(a==null?void 0:a.index)&&(o=A.nextNode(),n++)}return A.currentNode=g,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class O{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),T(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ve(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&T(this._$AH)?this._$AA.nextSibling.data=e:this.T(g.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=k.createElement(ne(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(t);else{const n=new me(i,this),h=n.u(this.options);n.p(t),this.T(h),this._$AH=n}}_$AC(e){let t=re.get(e.strings);return t===void 0&&re.set(e.strings,t=new k(e)),t}k(e){j(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new O(this.O(x()),this.O(x()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(e,t=this,s,i){const o=this.strings;let n=!1;if(o===void 0)e=w(this,e,t,0),n=!T(e)||e!==this._$AH&&e!==S,n&&(this._$AH=e);else{const h=e;let a,d;for(e=o[0],a=0;a<o.length-1;a++)d=w(this,h[s+a],t,a),d===S&&(d=this._$AH[a]),n||(n=!T(d)||d!==this._$AH[a]),d===l?e=l:e!==l&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!i&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ae extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}}class ye extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}}class Ee extends M{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??l)===S)return;const s=this._$AH,i=e===l&&s!==l||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==l&&(s===l||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const I=P.litHtmlPolyfillSupport;I==null||I(k,O),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.0");const we=(r,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const o=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new O(e.insertBefore(x(),o),o,void 0,t??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=globalThis;class N extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}}N._$litElement$=!0,N.finalized=!0,(oe=y.litElementHydrateSupport)==null||oe.call(y,{LitElement:N});const q=y.litElementPolyfillSupport;return q==null||q({LitElement:N}),(y.litElementVersions??(y.litElementVersions=[])).push("4.2.0"),he`@import '../../design-tokens/core/scss/theming/component';
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
  gap: calc(var(--size-base-unit) * 1);
  color: var(--cre8-color-content-default);
  background-color: transparent;
  border: 0;
  border-block-end: var(--cre8-border-width-tab-selected) var(--cre8-border-style-default) var(--cre8-color-border-default);
  padding-block-start: calc(var(--size-base-unit) * 1);
  padding-inline-end: calc(var(--size-base-unit) * 3);
  padding-block-end: calc(calc(var(--size-base-unit) * 1) - var(--cre8-border-width-tab-selected)); /* 1 */
  padding-inline-start: calc(var(--size-base-unit) * 3);
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
  padding-block-end: calc(calc(var(--size-base-unit) * 1) - var(--cre8-border-width-tab-selected)); /* 1 */
}

/**
 * Tab small
 */
.cre8-c-tab.cre8-c-tab--small {
  @include cre8-typography-label-small();
  padding-block-start: calc(var(--size-base-unit) * 0.5);
  padding-inline-end: calc(var(--size-base-unit) * 2);
  padding-block-end: calc(calc(var(--size-base-unit) * 0.5) - var(--cre8-border-width-tab-selected)); /* 1 */
  padding-inline-start: calc(var(--size-base-unit) * 2);

  /**
   * Tab small active state
   */
  &.cre8-is-active:not(:focus-visible) {
    padding-block-end: calc(calc(var(--size-base-unit) * 0.5) - var(--cre8-border-width-tab-selected)); /* 1 */
  }
}`});
