(function(u,g){typeof exports=="object"&&typeof module<"u"?module.exports=g():typeof define=="function"&&define.amd?define(g):(u=typeof globalThis<"u"?globalThis:u||self,u.Modal=u.Modal||{},u.Modal.styles=g())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var nt;const u=globalThis,g=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),V=new WeakMap;let q=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(g&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=V.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&V.set(e,t))}return t}toString(){return this.cssText}};const at=o=>new q(typeof o=="string"?o:o+"",void 0,z),lt=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((s,i,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new q(e,o,z)},ht=(o,t)=>{if(g)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=u.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},F=g?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return at(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ct,defineProperty:dt,getOwnPropertyDescriptor:pt,getOwnPropertyNames:ut,getOwnPropertySymbols:$t,getPrototypeOf:ft}=Object,f=globalThis,J=f.trustedTypes,_t=J?J.emptyScript:"",I=f.reactiveElementPolyfillSupport,x=(o,t)=>o,D={toAttribute(o,t){switch(t){case Boolean:o=o?_t:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},K=(o,t)=>!ct(o,t),Z={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class w extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Z){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&dt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=pt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){const l=i==null?void 0:i.call(this);n==null||n.call(this,r),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Z}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,s=[...ut(e),...$t(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(F(i))}else t!==void 0&&e.push(F(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ht(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const r=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:D).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){var n,r;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:D;this._$Em=i,this[i]=a.fromAttribute(e,l.type)??((r=this._$Ej)==null?void 0:r.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,r=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??K)(r,e)||s.useDefault&&s.reflect&&r===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,r]of i){const{wrapped:l}=r,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,r,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[x("elementProperties")]=new Map,w[x("finalized")]=new Map,I==null||I({ReactiveElement:w}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,T=C.trustedTypes,G=T?T.createPolicy("lit-html",{createHTML:o=>o}):void 0,Q="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+_,mt=`<${X}>`,y=document,M=()=>y.createComment(""),P=o=>o===null||typeof o!="object"&&typeof o!="function",L=Array.isArray,gt=o=>L(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",W=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,tt=/>/g,A=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),et=/'/g,st=/"/g,it=/^(?:script|style|textarea|title)$/i,E=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ot=new WeakMap,v=y.createTreeWalker(y,129);function rt(o,t){if(!L(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(t):t}const yt=(o,t)=>{const e=o.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",r=H;for(let l=0;l<e;l++){const a=o[l];let d,p,h=-1,$=0;for(;$<a.length&&(r.lastIndex=$,p=r.exec(a),p!==null);)$=r.lastIndex,r===H?p[1]==="!--"?r=Y:p[1]!==void 0?r=tt:p[2]!==void 0?(it.test(p[2])&&(i=RegExp("</"+p[2],"g")),r=A):p[3]!==void 0&&(r=A):r===A?p[0]===">"?(r=i??H,h=-1):p[1]===void 0?h=-2:(h=r.lastIndex-p[2].length,d=p[1],r=p[3]===void 0?A:p[3]==='"'?st:et):r===st||r===et?r=A:r===Y||r===tt?r=H:(r=A,i=void 0);const m=r===A&&o[l+1].startsWith("/>")?" ":"";n+=r===H?a+mt:h>=0?(s.push(d),a.slice(0,h)+Q+a.slice(h)+_+m):a+_+(h===-2?l:m)}return[rt(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class U{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const l=t.length-1,a=this.parts,[d,p]=yt(t,e);if(this.el=U.createElement(d,s),v.currentNode=this.el.content,e===2||e===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=v.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(Q)){const $=p[r++],m=i.getAttribute(h).split(_),k=/([.?@])?(.*)/.exec($);a.push({type:1,index:n,name:k[2],strings:m,ctor:k[1]==="."?vt:k[1]==="?"?bt:k[1]==="@"?wt:N}),i.removeAttribute(h)}else h.startsWith(_)&&(a.push({type:6,index:n}),i.removeAttribute(h));if(it.test(i.tagName)){const h=i.textContent.split(_),$=h.length-1;if($>0){i.textContent=T?T.emptyScript:"";for(let m=0;m<$;m++)i.append(h[m],M()),v.nextNode(),a.push({type:2,index:++n});i.append(h[$],M())}}}else if(i.nodeType===8)if(i.data===X)a.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf(_,h+1))!==-1;)a.push({type:7,index:n}),h+=_.length-1}n++}}static createElement(t,e){const s=y.createElement("template");return s.innerHTML=t,s}}function S(o,t,e=o,s){var r,l;if(t===E)return t;let i=s!==void 0?(r=e._$Co)==null?void 0:r[s]:e._$Cl;const n=P(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=S(o,i._$AS(o,t.values),i,s)),t}class At{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??y).importNode(e,!0);v.currentNode=i;let n=v.nextNode(),r=0,l=0,a=s[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new O(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new Et(n,this,t)),this._$AV.push(d),a=s[++l]}r!==(a==null?void 0:a.index)&&(n=v.nextNode(),r++)}return v.currentNode=y,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class O{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),P(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):gt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(y.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(rt(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const r=new At(i,this),l=r.u(this.options);r.p(e),this.T(l),this._$AH=r}}_$AC(t){let e=ot.get(t.strings);return e===void 0&&ot.set(t.strings,e=new U(t)),e}k(t){L(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new O(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(n===void 0)t=S(this,t,e,0),r=!P(t)||t!==this._$AH&&t!==E,r&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=S(this,l[s+a],e,a),d===E&&(d=this._$AH[a]),r||(r=!P(d)||d!==this._$AH[a]),d===c?t=c:t!==c&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}r&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class vt extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class bt extends N{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class wt extends N{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??c)===E)return;const s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Et{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const j=C.litHtmlPolyfillSupport;j==null||j(U,O),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.3.0");const St=(o,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new O(t.insertBefore(M(),n),n,void 0,e??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class R extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=St(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return E}}R._$litElement$=!0,R.finalized=!0,(nt=b.litElementHydrateSupport)==null||nt.call(b,{LitElement:R});const B=b.litElementPolyfillSupport;return B==null||B({LitElement:R}),(b.litElementVersions??(b.litElementVersions=[])).push("4.2.0"),lt`@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
 #MODAL
\*------------------------------------*/

:host {
  display: block;
}

/**
 * 1) Modal Composable Component
 */
.cre8-c-modal {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;

  display: none;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);

  z-index: 1000;
}

.cre8-c-modal.cre8-is-active {
  display: flex;
  visibility: visible;
  opacity: 1;
}

/**
 * Modal Focus Trap for Window (keeps focus in modal until closed)
 */
.cre8-c-modal__focus-trap {
  display: contents;
}

/**
 * Modal Window
 */
.cre8-c-modal__window {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: fixed;
  background: var(--cre8-color-bg-default);
  width: calc(var(--size-base-unit) * 68);
  max-width: 100%;
  border-radius: var(--cre8-border-radius-container);
  overflow: hidden;
  overflow-y: auto;

  /**
   * Modal Window for mobile user screen widths
   */
  @media all and (max-width:$cre8-breakpoint-md) {
    position: inherit;
    height: 100%;
    width: 100%;
  }

  &:focus-visible {
    @includefocus();
  }
}

/**
 * Modal Window Header
 */
.cre8-c-modal__header {
  display: flex;
  padding: calc(var(--size-base-unit) * 4) calc(var(--size-base-unit) * 6) calc(var(--size-base-unit) * 2);
  align-items: center;
  /**
   * Modal Header with Error state
   * 1) Icon fill prop is a custom property of cre8-icon-legacy that apply the color as a fill to the whole icon
   */
  .cre8-c-modal--error & {
    .cre8-modal-icon {
      fill: var(--cre8-color-content-error-icon); /* 1 */
    }
  }

  /**
   * Modal Header with Warning state
   * 1) Icon fill prop is a custom property of cre8-icon-legacy that apply the color as a fill to the whole icon
   */
  .cre8-c-modal--warning & {
    .cre8-modal-icon {
      fill: var(--cre8-color-content-warning-icon); /* 1 */
    }
  }

  /**
   * Modal Header with Success state
   * 1) Icon fill prop is a custom property of cre8-icon-legacy that apply the color as a fill to the whole icon
   */
  .cre8-c-modal--success & {
    .cre8-modal-icon {
      fill: var(--cre8-color-content-success-icon); /* 1 */
    }
  }

  /**
   * Modal Header with Info or Help State
   * 1) Icon fill prop is a custom property of cre8-icon-legacy that apply the color as a fill to the whole icon
   */
  .cre8-c-modal--info &,
  .cre8-c-modal--help & {
    .cre8-modal-icon {
      fill: var(--cre8-color-content-info-icon); /* 1 */
    }
  }
}

/**
 * Modal Heading
 */
.cre8-c-modal__header-inner {
  display: flex;
  align-items: center;
  gap: calc(var(--size-base-unit) * 2);

  cre8-icon {
    .cre8-modal-icon {
      height: calc(var(--size-base-unit) * 4);
      width: calc(var(--size-base-unit) * 4);
    }
  }
}

/**
 * Modal Window Body
 */
.cre8-c-modal__body {
  max-height: 240px; // Prevent modal from getting too big based on content
  overflow: auto; // Force scrolling based on long amounts of content
  padding: 0 calc(var(--size-base-unit) * 6);

  /**
   * Modal Window Body for mobile user screen widths
   */
  @media all and (max-width:$cre8-breakpoint-md) {
    height: 100%;
    max-height: max-content;
  }
}

/**
 * Modal Window Footer
 */
.cre8-c-modal__footer {
 padding: calc(var(--size-base-unit) * 3) calc(var(--size-base-unit) * 6) calc(100vh - 95dvh); // Ensure footer slot isn't cut off on certain devices
}

/**
 * Modal Window Close button
 */
.cre8-c-modal__close-button {
  margin-left: auto;
}
`});
