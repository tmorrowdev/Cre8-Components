(function(u,g){typeof exports=="object"&&typeof module<"u"?module.exports=g():typeof define=="function"&&define.amd?define(g):(u=typeof globalThis<"u"?globalThis:u||self,u.Hero=u.Hero||{},u.Hero.styles=g())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ot;const u=globalThis,g=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),W=new WeakMap;let q=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(g&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=W.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&W.set(e,t))}return t}toString(){return this.cssText}};const at=n=>new q(typeof n=="string"?n:n+"",void 0,j),ht=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new q(e,n,j)},lt=(n,t)=>{if(g)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=u.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},J=g?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return at(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ct,defineProperty:dt,getOwnPropertyDescriptor:pt,getOwnPropertyNames:ut,getOwnPropertySymbols:$t,getPrototypeOf:ft}=Object,f=globalThis,K=f.trustedTypes,mt=K?K.emptyScript:"",z=f.reactiveElementPolyfillSupport,x=(n,t)=>n,D={toAttribute(n,t){switch(t){case Boolean:n=n?mt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Z=(n,t)=>!ct(n,t),F={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=F){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&dt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=pt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){const h=s==null?void 0:s.call(this);o==null||o.call(this,r),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??F}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,i=[...ut(e),...$t(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(J(s))}else t!==void 0&&e.push(J(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:D).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){var o,r;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const h=i.getPropertyOptions(s),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((o=h.converter)==null?void 0:o.fromAttribute)!==void 0?h.converter:D;this._$Em=s,this[s]=a.fromAttribute(e,h.type)??((r=this._$Ej)==null?void 0:r.get(s))??null,this._$Em=null}}requestUpdate(t,e,i){var s;if(t!==void 0){const o=this.constructor,r=this[t];if(i??(i=o.getPropertyOptions(t)),!((i.hasChanged??Z)(r,e)||i.useDefault&&i.reflect&&r===((s=this._$Ej)==null?void 0:s.get(t))&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,r]of s){const{wrapped:h}=r,a=this[o];h!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,r,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[x("elementProperties")]=new Map,E[x("finalized")]=new Map,z==null||z({ReactiveElement:E}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,M=P.trustedTypes,G=M?M.createPolicy("lit-html",{createHTML:n=>n}):void 0,Q="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+m,_t=`<${X}>`,y=document,C=()=>y.createComment(""),H=n=>n===null||typeof n!="object"&&typeof n!="function",L=Array.isArray,gt=n=>L(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",B=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,tt=/>/g,A=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),et=/'/g,it=/"/g,st=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),nt=new WeakMap,v=y.createTreeWalker(y,129);function rt(n,t){if(!L(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(t):t}const yt=(n,t)=>{const e=n.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",r=U;for(let h=0;h<e;h++){const a=n[h];let d,p,l=-1,$=0;for(;$<a.length&&(r.lastIndex=$,p=r.exec(a),p!==null);)$=r.lastIndex,r===U?p[1]==="!--"?r=Y:p[1]!==void 0?r=tt:p[2]!==void 0?(st.test(p[2])&&(s=RegExp("</"+p[2],"g")),r=A):p[3]!==void 0&&(r=A):r===A?p[0]===">"?(r=s??U,l=-1):p[1]===void 0?l=-2:(l=r.lastIndex-p[2].length,d=p[1],r=p[3]===void 0?A:p[3]==='"'?it:et):r===it||r===et?r=A:r===Y||r===tt?r=U:(r=A,s=void 0);const _=r===A&&n[h+1].startsWith("/>")?" ":"";o+=r===U?a+_t:l>=0?(i.push(d),a.slice(0,l)+Q+a.slice(l)+m+_):a+m+(l===-2?h:_)}return[rt(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class O{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const h=t.length-1,a=this.parts,[d,p]=yt(t,e);if(this.el=O.createElement(d,i),v.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=v.nextNode())!==null&&a.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(const l of s.getAttributeNames())if(l.endsWith(Q)){const $=p[r++],_=s.getAttribute(l).split(m),R=/([.?@])?(.*)/.exec($);a.push({type:1,index:o,name:R[2],strings:_,ctor:R[1]==="."?vt:R[1]==="?"?bt:R[1]==="@"?Et:k}),s.removeAttribute(l)}else l.startsWith(m)&&(a.push({type:6,index:o}),s.removeAttribute(l));if(st.test(s.tagName)){const l=s.textContent.split(m),$=l.length-1;if($>0){s.textContent=M?M.emptyScript:"";for(let _=0;_<$;_++)s.append(l[_],C()),v.nextNode(),a.push({type:2,index:++o});s.append(l[$],C())}}}else if(s.nodeType===8)if(s.data===X)a.push({type:2,index:o});else{let l=-1;for(;(l=s.data.indexOf(m,l+1))!==-1;)a.push({type:7,index:o}),l+=m.length-1}o++}}static createElement(t,e){const i=y.createElement("template");return i.innerHTML=t,i}}function w(n,t,e=n,i){var r,h;if(t===S)return t;let s=i!==void 0?(r=e._$Co)==null?void 0:r[i]:e._$Cl;const o=H(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((h=s==null?void 0:s._$AO)==null||h.call(s,!1),o===void 0?s=void 0:(s=new o(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=w(n,s._$AS(n,t.values),s,i)),t}class At{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??y).importNode(e,!0);v.currentNode=s;let o=v.nextNode(),r=0,h=0,a=i[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new T(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new St(o,this,t)),this._$AV.push(d),a=i[++h]}r!==(a==null?void 0:a.index)&&(o=v.nextNode(),r++)}return v.currentNode=y,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class T{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),H(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):gt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(y.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=O.createElement(rt(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(e);else{const r=new At(s,this),h=r.u(this.options);r.p(e),this.T(h),this._$AH=r}}_$AC(t){let e=nt.get(t.strings);return e===void 0&&nt.set(t.strings,e=new O(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new T(this.O(C()),this.O(C()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=w(this,t,e,0),r=!H(t)||t!==this._$AH&&t!==S,r&&(this._$AH=t);else{const h=t;let a,d;for(t=o[0],a=0;a<o.length-1;a++)d=w(this,h[i+a],e,a),d===S&&(d=this._$AH[a]),r||(r=!H(d)||d!==this._$AH[a]),d===c?t=c:t!==c&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}r&&!s&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class vt extends k{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class bt extends k{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class Et extends k{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??c)===S)return;const i=this._$AH,s=t===c&&i!==c||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class St{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const I=P.litHtmlPolyfillSupport;I==null||I(O,T),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.0");const wt=(n,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new T(t.insertBefore(C(),o),o,void 0,e??{})}return s._$AI(n),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class N extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return S}}N._$litElement$=!0,N.finalized=!0,(ot=b.litElementHydrateSupport)==null||ot.call(b,{LitElement:N});const V=b.litElementPolyfillSupport;return V==null||V({LitElement:N}),(b.litElementVersions??(b.litElementVersions=[])).push("4.2.0"),ht`@import '../../design-tokens/core/scss/theming/component';

// #HERO

/**
 * 1) Block with an image and overlay on medium and large screens
 */
.cre8-c-hero {
  position: relative;
  margin-bottom: calc(var(--size-base-unit) * 4);

  @media all and (min-width:$cre8-breakpoint-md) {
    height: 40vh;
  }
}

/**
 * Hero image
 */
.cre8-c-hero__image {
  width: 100%;
  height: 100%;

  @media all and (min-width:$cre8-breakpoint-md) {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }
}

/**
 * Hero body
 * 1) Content is placed in the bottom left part of the image on medium/large screens by default
 */
.cre8-c-hero__body {
  display: flex;
  flex-direction: column;
  padding-top: calc(var(--size-base-unit) * 2);

  @media all and (min-width:$cre8-breakpoint-md) {
    position: absolute;
    align-items: flex-start;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    padding-top: calc(var(--size-base-unit) * 4);
    padding-bottom: calc(var(--size-base-unit) * 4);
  }

  /**
   * Hero body within align top left variant
   * 1) Place body content in the top left part of the image on medium/large screens
   */
  .cre8-c-hero--top-left & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-start;
      align-items: flex-start;
    }
  }

  /**
   * Hero body within align left variant
   * 1) Place body content along left part of the image and vertically centered on medium/large screens
   */
  .cre8-c-hero--left & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: center;
    }
  }

  /**
   * Hero body within align top center variant
   * 1) Place body content in the top center part of the image on medium/large screens
   */
  .cre8-c-hero--top-center & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-start;
      align-items: center;
    }
  }

  /**
   * Hero body within align center variant
   * 1) Place body content horizontally and vertically centered overlaying the image on medium/large screens
   */
  .cre8-c-hero--center & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: center;
      align-items: center;
    }
  }

  /**
   * Hero body within align bottom center variant
   * 1) Place body content in the bottom center part of the image on medium/large screens
   */
  .cre8-c-hero--bottom-center & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-end;
      align-items: center;
    }
  }
  .cre8-c-hero--top-right & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-start;
      align-items: flex-end;
    }
  }

  /**
   * Hero body within align right variant
   * 1) Place body content along right part of the image and vertically centered on medium/large screens
   */
  .cre8-c-hero--right & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: center;
      align-items: flex-end;
    }
  }

  /**
   * Hero body within align bottom right variant
   * 1) Place body content in the bottom right part of the image on medium/large screens
   */
  .cre8-c-hero--bottom-right & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-end;
      align-items: flex-end;
    }
  }
}
`});
