(function(p,A){typeof exports=="object"&&typeof module<"u"?module.exports=A():typeof define=="function"&&define.amd?define(A):(p=typeof globalThis<"u"?globalThis:p||self,p.Alert=p.Alert||{},p.Alert.styles=A())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ne;const p=globalThis,A=p.ShadowRoot&&(p.ShadyCSS===void 0||p.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),W=new WeakMap;let q=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(A&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=W.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&W.set(t,e))}return e}toString(){return this.cssText}};const ce=i=>new q(typeof i=="string"?i:i+"",void 0,z),ae=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((r,s,n)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+i[n+1],i[0]);return new q(t,i,z)},le=(i,e)=>{if(A)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),s=p.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=t.cssText,i.appendChild(r)}},J=A?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return ce(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:he,defineProperty:de,getOwnPropertyDescriptor:ue,getOwnPropertyNames:pe,getOwnPropertySymbols:$e,getPrototypeOf:_e}=Object,_=globalThis,K=_.trustedTypes,fe=K?K.emptyScript:"",D=_.reactiveElementPolyfillSupport,C=(i,e)=>i,L={toAttribute(i,e){switch(e){case Boolean:i=i?fe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Z=(i,e)=>!he(i,e),F={attribute:!0,type:String,converter:L,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=F){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(e,r,t);s!==void 0&&de(this.prototype,e,s)}}static getPropertyDescriptor(e,t,r){const{get:s,set:n}=ue(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){const a=s==null?void 0:s.call(this);n==null||n.call(this,o),this.requestUpdate(e,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=_e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,r=[...pe(t),...$e(t)];for(const s of r)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,s]of t)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const s=this._$Eu(t,r);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const s of r)t.unshift(J(s))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return le(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){var n;const r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){const o=(((n=r.converter)==null?void 0:n.toAttribute)!==void 0?r.converter:L).toAttribute(t,r.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){var n,o;const r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const a=r.getPropertyOptions(s),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:L;this._$Em=s,this[s]=c.fromAttribute(t,a.type)??((o=this._$Ej)==null?void 0:o.get(s))??null,this._$Em=null}}requestUpdate(e,t,r){var s;if(e!==void 0){const n=this.constructor,o=this[e];if(r??(r=n.getPropertyOptions(e)),!((r.hasChanged??Z)(o,t)||r.useDefault&&r.reflect&&o===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:s,wrapped:n},o){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s){const{wrapped:a}=o,c=this[n];a!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var s;return(s=r.hostUpdated)==null?void 0:s.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[C("elementProperties")]=new Map,E[C("finalized")]=new Map,D==null||D({ReactiveElement:E}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=globalThis,T=x.trustedTypes,G=T?T.createPolicy("lit-html",{createHTML:i=>i}):void 0,Q="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+f,ge=`<${X}>`,m=document,P=()=>m.createComment(""),U=i=>i===null||typeof i!="object"&&typeof i!="function",j=Array.isArray,Ae=i=>j(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",B=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,v=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,re=/"/g,se=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ie=new WeakMap,b=m.createTreeWalker(m,129);function oe(i,e){if(!j(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const me=(i,e)=>{const t=i.length-1,r=[];let s,n=e===2?"<svg>":e===3?"<math>":"",o=k;for(let a=0;a<t;a++){const c=i[a];let d,u,l=-1,$=0;for(;$<c.length&&(o.lastIndex=$,u=o.exec(c),u!==null);)$=o.lastIndex,o===k?u[1]==="!--"?o=Y:u[1]!==void 0?o=ee:u[2]!==void 0?(se.test(u[2])&&(s=RegExp("</"+u[2],"g")),o=v):u[3]!==void 0&&(o=v):o===v?u[0]===">"?(o=s??k,l=-1):u[1]===void 0?l=-2:(l=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?v:u[3]==='"'?re:te):o===re||o===te?o=v:o===Y||o===ee?o=k:(o=v,s=void 0);const g=o===v&&i[a+1].startsWith("/>")?" ":"";n+=o===k?c+ge:l>=0?(r.push(d),c.slice(0,l)+Q+c.slice(l)+f+g):c+f+(l===-2?a:g)}return[oe(i,n+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class O{constructor({strings:e,_$litType$:t},r){let s;this.parts=[];let n=0,o=0;const a=e.length-1,c=this.parts,[d,u]=me(e,t);if(this.el=O.createElement(d,r),b.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=b.nextNode())!==null&&c.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const l of s.getAttributeNames())if(l.endsWith(Q)){const $=u[o++],g=s.getAttribute(l).split(f),R=/([.?@])?(.*)/.exec($);c.push({type:1,index:n,name:R[2],strings:g,ctor:R[1]==="."?be:R[1]==="?"?ye:R[1]==="@"?Ee:M}),s.removeAttribute(l)}else l.startsWith(f)&&(c.push({type:6,index:n}),s.removeAttribute(l));if(se.test(s.tagName)){const l=s.textContent.split(f),$=l.length-1;if($>0){s.textContent=T?T.emptyScript:"";for(let g=0;g<$;g++)s.append(l[g],P()),b.nextNode(),c.push({type:2,index:++n});s.append(l[$],P())}}}else if(s.nodeType===8)if(s.data===X)c.push({type:2,index:n});else{let l=-1;for(;(l=s.data.indexOf(f,l+1))!==-1;)c.push({type:7,index:n}),l+=f.length-1}n++}}static createElement(e,t){const r=m.createElement("template");return r.innerHTML=e,r}}function w(i,e,t=i,r){var o,a;if(e===S)return e;let s=r!==void 0?(o=t._$Co)==null?void 0:o[r]:t._$Cl;const n=U(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),n===void 0?s=void 0:(s=new n(i),s._$AT(i,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=s:t._$Cl=s),s!==void 0&&(e=w(i,s._$AS(i,e.values),s,r)),e}class ve{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,s=((e==null?void 0:e.creationScope)??m).importNode(t,!0);b.currentNode=s;let n=b.nextNode(),o=0,a=0,c=r[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new H(n,n.nextSibling,this,e):c.type===1?d=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(d=new Se(n,this,e)),this._$AV.push(d),c=r[++a]}o!==(c==null?void 0:c.index)&&(n=b.nextNode(),o++)}return b.currentNode=m,s}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class H{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),U(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ae(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(m.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=O.createElement(oe(r.h,r.h[0]),this.options)),r);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(t);else{const o=new ve(s,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=ie.get(e.strings);return t===void 0&&ie.set(e.strings,t=new O(e)),t}k(e){j(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,s=0;for(const n of e)s===t.length?t.push(r=new H(this.O(P()),this.O(P()),this,this.options)):r=t[s],r._$AI(n),s++;s<t.length&&(this._$AR(r&&r._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,s,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(e,t=this,r,s){const n=this.strings;let o=!1;if(n===void 0)e=w(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==S,o&&(this._$AH=e);else{const a=e;let c,d;for(e=n[0],c=0;c<n.length-1;c++)d=w(this,a[r+c],t,c),d===S&&(d=this._$AH[c]),o||(o=!U(d)||d!==this._$AH[c]),d===h?e=h:e!==h&&(e+=(d??"")+n[c+1]),this._$AH[c]=d}o&&!s&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class be extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class ye extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Ee extends M{constructor(e,t,r,s,n){super(e,t,r,s,n),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??h)===S)return;const r=this._$AH,s=e===h&&r!==h||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==h&&(r===h||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const I=x.litHtmlPolyfillSupport;I==null||I(O,H),(x.litHtmlVersions??(x.litHtmlVersions=[])).push("3.3.0");const we=(i,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let s=r._$litPart$;if(s===void 0){const n=(t==null?void 0:t.renderBefore)??null;r._$litPart$=s=new H(e.insertBefore(P(),n),n,void 0,t??{})}return s._$AI(i),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=globalThis;class N extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}}N._$litElement$=!0,N.finalized=!0,(ne=y.litElementHydrateSupport)==null||ne.call(y,{LitElement:N});const V=y.litElementPolyfillSupport;return V==null||V({LitElement:N}),(y.litElementVersions??(y.litElementVersions=[])).push("4.2.0"),ae`@import '../../design-tokens/core/scss/theming/component';

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
  width: calc(var(--size-base-unit) * 45);

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
`});
