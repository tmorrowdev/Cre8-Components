(function(p,g){typeof exports=="object"&&typeof module<"u"?module.exports=g():typeof define=="function"&&define.amd?define(g):(p=typeof globalThis<"u"?globalThis:p||self,p.Link=p.Link||{},p.Link.styles=g())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var oe;const p=globalThis,g=p.ShadowRoot&&(p.ShadyCSS===void 0||p.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,R=Symbol(),W=new WeakMap;let q=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==R)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(g&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=W.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&W.set(t,e))}return e}toString(){return this.cssText}};const ce=s=>new q(typeof s=="string"?s:s+"",void 0,R),le=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new q(t,s,R)},ae=(s,e)=>{if(g)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=p.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},J=g?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ce(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:he,defineProperty:de,getOwnPropertyDescriptor:ue,getOwnPropertyNames:pe,getOwnPropertySymbols:_e,getPrototypeOf:$e}=Object,$=globalThis,K=$.trustedTypes,fe=K?K.emptyScript:"",D=$.reactiveElementPolyfillSupport,x=(s,e)=>s,L={toAttribute(s,e){switch(e){case Boolean:s=s?fe:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},Z=(s,e)=>!he(s,e),F={attribute:!0,type:String,converter:L,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);class k extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=F){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&de(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=ue(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){const l=r==null?void 0:r.call(this);o==null||o.call(this,n),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const e=$e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,i=[...pe(t),..._e(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(J(r))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ae(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:L).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){var o,n;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const l=i.getPropertyOptions(r),c=typeof l.converter=="function"?{fromAttribute:l.converter}:((o=l.converter)==null?void 0:o.fromAttribute)!==void 0?l.converter:L;this._$Em=r,this[r]=c.fromAttribute(t,l.type)??((n=this._$Ej)==null?void 0:n.get(r))??null,this._$Em=null}}requestUpdate(e,t,i){var r;if(e!==void 0){const o=this.constructor,n=this[e];if(i??(i=o.getPropertyOptions(e)),!((i.hasChanged??Z)(n,t)||i.useDefault&&i.reflect&&n===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,n]of r){const{wrapped:l}=n,c=this[o];l!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,n,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[x("elementProperties")]=new Map,k[x("finalized")]=new Map,D==null||D({ReactiveElement:k}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w=globalThis,H=w.trustedTypes,G=H?H.createPolicy("lit-html",{createHTML:s=>s}):void 0,Q="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+f,ve=`<${X}>`,y=document,C=()=>y.createComment(""),P=s=>s===null||typeof s!="object"&&typeof s!="function",j=Array.isArray,ge=s=>j(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",B=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,A=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,ie=/"/g,re=/^(?:script|style|textarea|title)$/i,E=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),se=new WeakMap,m=y.createTreeWalker(y,129);function ne(s,e){if(!j(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const ye=(s,e)=>{const t=s.length-1,i=[];let r,o=e===2?"<svg>":e===3?"<math>":"",n=O;for(let l=0;l<t;l++){const c=s[l];let d,u,a=-1,_=0;for(;_<c.length&&(n.lastIndex=_,u=n.exec(c),u!==null);)_=n.lastIndex,n===O?u[1]==="!--"?n=Y:u[1]!==void 0?n=ee:u[2]!==void 0?(re.test(u[2])&&(r=RegExp("</"+u[2],"g")),n=A):u[3]!==void 0&&(n=A):n===A?u[0]===">"?(n=r??O,a=-1):u[1]===void 0?a=-2:(a=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?A:u[3]==='"'?ie:te):n===ie||n===te?n=A:n===Y||n===ee?n=O:(n=A,r=void 0);const v=n===A&&s[l+1].startsWith("/>")?" ":"";o+=n===O?c+ve:a>=0?(i.push(d),c.slice(0,a)+Q+c.slice(a)+f+v):c+f+(a===-2?l:v)}return[ne(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class U{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,n=0;const l=e.length-1,c=this.parts,[d,u]=ye(e,t);if(this.el=U.createElement(d,i),m.currentNode=this.el.content,t===2||t===3){const a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(r=m.nextNode())!==null&&c.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const a of r.getAttributeNames())if(a.endsWith(Q)){const _=u[n++],v=r.getAttribute(a).split(f),N=/([.?@])?(.*)/.exec(_);c.push({type:1,index:o,name:N[2],strings:v,ctor:N[1]==="."?me:N[1]==="?"?be:N[1]==="@"?ke:M}),r.removeAttribute(a)}else a.startsWith(f)&&(c.push({type:6,index:o}),r.removeAttribute(a));if(re.test(r.tagName)){const a=r.textContent.split(f),_=a.length-1;if(_>0){r.textContent=H?H.emptyScript:"";for(let v=0;v<_;v++)r.append(a[v],C()),m.nextNode(),c.push({type:2,index:++o});r.append(a[_],C())}}}else if(r.nodeType===8)if(r.data===X)c.push({type:2,index:o});else{let a=-1;for(;(a=r.data.indexOf(f,a+1))!==-1;)c.push({type:7,index:o}),a+=f.length-1}o++}}static createElement(e,t){const i=y.createElement("template");return i.innerHTML=e,i}}function S(s,e,t=s,i){var n,l;if(e===E)return e;let r=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const o=P(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=S(s,r._$AS(s,e.values),r,i)),e}class Ae{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??y).importNode(t,!0);m.currentNode=r;let o=m.nextNode(),n=0,l=0,c=i[0];for(;c!==void 0;){if(n===c.index){let d;c.type===2?d=new T(o,o.nextSibling,this,e):c.type===1?d=new c.ctor(o,c.name,c.strings,this,e):c.type===6&&(d=new Ee(o,this,e)),this._$AV.push(d),c=i[++l]}n!==(c==null?void 0:c.index)&&(o=m.nextNode(),n++)}return m.currentNode=y,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class T{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),P(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ge(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(y.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=U.createElement(ne(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(t);else{const n=new Ae(r,this),l=n.u(this.options);n.p(t),this.T(l),this._$AH=n}}_$AC(e){let t=se.get(e.strings);return t===void 0&&se.set(e.strings,t=new U(e)),t}k(e){j(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new T(this.O(C()),this.O(C()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=h}_$AI(e,t=this,i,r){const o=this.strings;let n=!1;if(o===void 0)e=S(this,e,t,0),n=!P(e)||e!==this._$AH&&e!==E,n&&(this._$AH=e);else{const l=e;let c,d;for(e=o[0],c=0;c<o.length-1;c++)d=S(this,l[i+c],t,c),d===E&&(d=this._$AH[c]),n||(n=!P(d)||d!==this._$AH[c]),d===h?e=h:e!==h&&(e+=(d??"")+o[c+1]),this._$AH[c]=d}n&&!r&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class me extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class be extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class ke extends M{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??h)===E)return;const i=this._$AH,r=e===h&&i!==h||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==h&&(i===h||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ee{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const I=w.litHtmlPolyfillSupport;I==null||I(U,T),(w.litHtmlVersions??(w.litHtmlVersions=[])).push("3.3.0");const Se=(s,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const o=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new T(e.insertBefore(C(),o),o,void 0,t??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class z extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Se(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return E}}z._$litElement$=!0,z.finalized=!0,(oe=b.litElementHydrateSupport)==null||oe.call(b,{LitElement:z});const V=b.litElementPolyfillSupport;return V==null||V({LitElement:z}),(b.litElementVersions??(b.litElementVersions=[])).push("4.2.0"),le`@import '../../design-tokens/core/scss/theming/component';

:host {
  display: inline-flex;
}

.cre8-c-link {
  display: inline-flex;
  text-decoration: none;
  height: 100%;
  color: var(--cre8-color-content-link);

  &:hover {
    .cre8-c-link__text,
    .cre8-c-link__text-area {
      color: var(--cre8-color-content-link-hover);
      border-color: var(--cre8-color-border-transparent);
      background-color: var(--cre8-color-bg-opacity-transparent);
    }
  }

  &:focus {
    outline: none;

    .cre8-c-link__text,
    .cre8-c-link__text-area {
      border-color: var(--cre8-color-border-transparent);
      background-color: var(--cre8-color-bg-active);
      color: var(--cre8-color-content-link-focus);
    }

    .cre8-c-link__cta-wrapper {
      color: var(--cre8-color-content-link-focus);
      @include focus;
      background-color: var(--cre8-color-button-primary-bg-hover); // TODO: CTA background color token not exists
      border: var(--cre8-border-width-focus) var(--cre8-border-style-default) var(--color-border-active-outline);
    }
  }

  &:active {
    .cre8-c-link__text,
    .cre8-c-link__text-area {
      border-color: var(--cre8-color-border-transparent);
      background-color: var(--cre8-color-bg-opacity-transparent);
      color: var(--cre8-color-content-link-active);
    }
  }
}

.cre8-c-link__text-area {
  display: inline-flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.cre8-c-link__text {
  @include cre8-typography-body-default-link();
  color: var(--cre8-color-content-link);
  display: inline-flex;

  .cre8-c-link--sm & {
    @include cre8-typography-body-small-link();
  }

  .cre8-c-link--lg & {
    @include cre8-typography-body-large-link();
  }
}

.cre8-c-link__text {
  .cre8-c-link__no-underline & {
    text-decoration: none;
  }
}

.cre8-c-link__icon-wrapper {
  display: inline-flex;
}

.cre8-c-link__icon {
  display: inline-flex;
  height: calc(var(--size-base-unit) * 3);
  width: calc(var(--size-base-unit) * 3);

  .cre8-c-link--sm & {
    --cre8-icon-height: var(--cre8-icon-size-small);
    --cre8-icon-width: var(--cre8-icon-size-small);
    height: calc(var(--size-base-unit) * 2.75);
    width: calc(var(--size-base-unit) * 2.75);
  }

  .cre8-c-link--lg & {
    --cre8-icon-height: var(--cre8-icon-size-large);
    --cre8-icon-width: var(--cre8-icon-size-large);
    height: calc(var(--size-base-unit) * 3.25);
    width: calc(var(--size-base-unit) * 3.25);
  }
}

.cre8-c-link__variation {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.cre8-c-link__cta-wrapper {
  color: var(--cre8-color-button-primary-content); // TODO: token not defined
  display: inline-flex;
  margin-left: calc(var(--size-base-unit) * 1);
  padding: var(--cre8-spacing-4);
  background-color: var(--cre8-color-content-link);
  border-radius:  var(--cre8-border-radius-round);
  border-width: var(--cre8-border-width-button-default);

  svg {
    height: calc(var(--size-base-unit) * 2);
    width: calc(var(--size-base-unit) * 2);
  }
}

.cre8-c-link__icon.before {
  padding-right: calc(var(--size-base-unit) * 1);
}

.cre8-c-link__icon.after {
  padding-left: calc(var(--size-base-unit) * 1);
}

::slotted([slot='badge']) {
  padding-left: calc(var(--size-base-unit) * 1);
}

.cre8-c-link--inverted {
  .cre8-c-link__text {
    color: var(--cre8-color-content-inverse-link);
  }

  .cre8-c-link__icon {
    color: var(--cre8-color-content-inverse-link);;
  }

  .cre8-c-link__cta-wrapper {
    --cre8-icon-fill: var(--cre8-color-content-brand);
    color: var(--cre8-color-content-brand);
    background-color: var(--cre8-color-content-inverse-link);
  }
  
  &:hover {
    .cre8-c-link__text,
    .cre8-c-link__text-area {
      color: var(--cre8-color-content-inverse-link-hover);
    }

    .cre8-c-link__icon {
      fill: var(--cre8-color-content-inverse-link-hover);
    }
  }

  &:active {
    .cre8-c-link__text,
    .cre8-c-link__text-area {
      color: var(--cre8-color-content-inverse-link-active);
    }

    .cre8-c-link__icon {
      fill: var(--cre8-color-content-inverse-link-active);
    }
  }

  &:focus {
    outline: none;
    .cre8-c-link__icon {
      background-color:  var(--cre8-color-bg-inverse-active);
      fill: var(--cre8-color-content-inverse-link-focus);
    }

    .cre8-c-link__text,
    .cre8-c-link__text-area {
      background-color:  var(--cre8-color-bg-inverse-active);
      color: var(--cre8-color-content-inverse-link-focus);
    }
    .cre8-c-link__cta-wrapper {
      background-color:  var(--cre8-color-content-inverse-link);
      color: var(--cre8-color-content-inverse-link-focus);
      outline: var(--cre8-border-width-focus) var(--cre8-border-style-default)  var(--cre8-color-content-inverse-link); //TODO: token not exists cre8-color-border-inverse-active-outline
      outline-offset: calc(var(--size-base-unit) * 0.25);
    }
  }
}

cre8-icon {
  display: flex;
  align-items: center;
}
`});
