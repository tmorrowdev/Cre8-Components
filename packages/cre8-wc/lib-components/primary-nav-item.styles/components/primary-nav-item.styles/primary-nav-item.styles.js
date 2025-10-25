(function(u,v){typeof exports=="object"&&typeof module<"u"?module.exports=v():typeof define=="function"&&define.amd?define(v):(u=typeof globalThis<"u"?globalThis:u||self,u.PrimaryNavItem=u.PrimaryNavItem||{},u.PrimaryNavItem.styles=v())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var oe;const u=globalThis,v=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),V=new WeakMap;let W=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(v&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=V.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&V.set(t,e))}return e}toString(){return this.cssText}};const ae=r=>new W(typeof r=="string"?r:r+"",void 0,z),he=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1],r[0]);return new W(t,r,z)},ce=(r,e)=>{if(v)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=u.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)}},J=v?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ae(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:le,defineProperty:de,getOwnPropertyDescriptor:pe,getOwnPropertyNames:ue,getOwnPropertySymbols:me,getPrototypeOf:$e}=Object,$=globalThis,K=$.trustedTypes,_e=K?K.emptyScript:"",I=$.reactiveElementPolyfillSupport,P=(r,e)=>r,D={toAttribute(r,e){switch(e){case Boolean:r=r?_e:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Z=(r,e)=>!le(r,e),F={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);class w extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=F){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&de(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=pe(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){const h=s==null?void 0:s.call(this);o==null||o.call(this,n),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const e=$e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const t=this.properties,i=[...ue(t),...me(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(J(s))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:D).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){var o,n;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const h=i.getPropertyOptions(s),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((o=h.converter)==null?void 0:o.fromAttribute)!==void 0?h.converter:D;this._$Em=s,this[s]=a.fromAttribute(t,h.type)??((n=this._$Ej)==null?void 0:n.get(s))??null,this._$Em=null}}requestUpdate(e,t,i){var s;if(e!==void 0){const o=this.constructor,n=this[e];if(i??(i=o.getPropertyOptions(e)),!((i.hasChanged??Z)(n,t)||i.useDefault&&i.reflect&&n===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,n]of s){const{wrapped:h}=n,a=this[o];h!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[P("elementProperties")]=new Map,w[P("finalized")]=new Map,I==null||I({ReactiveElement:w}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,O=C.trustedTypes,Y=O?O.createPolicy("lit-html",{createHTML:r=>r}):void 0,G="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,Q="?"+_,fe=`<${Q}>`,y=document,x=()=>y.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",L=Array.isArray,ve=r=>L(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",j=`[ 	
\f\r]`,k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,X=/-->/g,ee=/>/g,g=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,ie=/"/g,se=/^(?:script|style|textarea|title)$/i,E=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),re=new WeakMap,A=y.createTreeWalker(y,129);function ne(r,e){if(!L(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Y!==void 0?Y.createHTML(e):e}const ye=(r,e)=>{const t=r.length-1,i=[];let s,o=e===2?"<svg>":e===3?"<math>":"",n=k;for(let h=0;h<t;h++){const a=r[h];let d,p,c=-1,m=0;for(;m<a.length&&(n.lastIndex=m,p=n.exec(a),p!==null);)m=n.lastIndex,n===k?p[1]==="!--"?n=X:p[1]!==void 0?n=ee:p[2]!==void 0?(se.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=g):p[3]!==void 0&&(n=g):n===g?p[0]===">"?(n=s??k,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?g:p[3]==='"'?ie:te):n===ie||n===te?n=g:n===X||n===ee?n=k:(n=g,s=void 0);const f=n===g&&r[h+1].startsWith("/>")?" ":"";o+=n===k?a+fe:c>=0?(i.push(d),a.slice(0,c)+G+a.slice(c)+_+f):a+_+(c===-2?h:f)}return[ne(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class H{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const h=e.length-1,a=this.parts,[d,p]=ye(e,t);if(this.el=H.createElement(d,i),A.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=A.nextNode())!==null&&a.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(G)){const m=p[n++],f=s.getAttribute(c).split(_),R=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:R[2],strings:f,ctor:R[1]==="."?Ae:R[1]==="?"?be:R[1]==="@"?we:N}),s.removeAttribute(c)}else c.startsWith(_)&&(a.push({type:6,index:o}),s.removeAttribute(c));if(se.test(s.tagName)){const c=s.textContent.split(_),m=c.length-1;if(m>0){s.textContent=O?O.emptyScript:"";for(let f=0;f<m;f++)s.append(c[f],x()),A.nextNode(),a.push({type:2,index:++o});s.append(c[m],x())}}}else if(s.nodeType===8)if(s.data===Q)a.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf(_,c+1))!==-1;)a.push({type:7,index:o}),c+=_.length-1}o++}}static createElement(e,t){const i=y.createElement("template");return i.innerHTML=e,i}}function S(r,e,t=r,i){var n,h;if(e===E)return e;let s=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const o=U(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((h=s==null?void 0:s._$AO)==null||h.call(s,!1),o===void 0?s=void 0:(s=new o(r),s._$AT(r,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=S(r,s._$AS(r,e.values),s,i)),e}class ge{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??y).importNode(t,!0);A.currentNode=s;let o=A.nextNode(),n=0,h=0,a=i[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new M(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Ee(o,this,e)),this._$AV.push(d),a=i[++h]}n!==(a==null?void 0:a.index)&&(o=A.nextNode(),n++)}return A.currentNode=y,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class M{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),U(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ve(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(y.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=H.createElement(ne(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(t);else{const n=new ge(s,this),h=n.u(this.options);n.p(t),this.T(h),this._$AH=n}}_$AC(e){let t=re.get(e.strings);return t===void 0&&re.set(e.strings,t=new H(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new M(this.O(x()),this.O(x()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=l}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(o===void 0)e=S(this,e,t,0),n=!U(e)||e!==this._$AH&&e!==E,n&&(this._$AH=e);else{const h=e;let a,d;for(e=o[0],a=0;a<o.length-1;a++)d=S(this,h[i+a],t,a),d===E&&(d=this._$AH[a]),n||(n=!U(d)||d!==this._$AH[a]),d===l?e=l:e!==l&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!s&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ae extends N{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}}class be extends N{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}}class we extends N{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??l)===E)return;const i=this._$AH,s=e===l&&i!==l||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==l&&(i===l||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ee{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const B=C.litHtmlPolyfillSupport;B==null||B(H,M),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.3.0");const Se=(r,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const o=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new M(e.insertBefore(x(),o),o,void 0,t??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class T extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Se(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return E}}T._$litElement$=!0,T.finalized=!0,(oe=b.litElementHydrateSupport)==null||oe.call(b,{LitElement:T});const q=b.litElementPolyfillSupport;return q==null||q({LitElement:T}),(b.litElementVersions??(b.litElementVersions=[])).push("4.2.0"),he`@import '../../design-tokens/core/scss/theming/component';

// #PRIMARY NAV ITEM

/**
 * Actual primary nav list item
 */
.cre8-c-primary-nav__item {
  border-bottom-width: var(--cre8-border-width-default);
  border-bottom-style: var(--cre8-border-style-default);
  border-bottom-color: var(--cre8-color-border-subtle);

  @media all and (min-width:$cre8-breakpoint-lg) {
    border-bottom: none;
  }
}

/**
 * Content within the primary nav item
 */
.cre8-c-primary-nav__item-content {
  display: flex;
  align-items: baseline;
}

/**
 * Primary navigation link
 * 1) Used to remove any sort of default button styles when a button tag is rendered
 */
.cre8-c-primary-nav__link {
  @include cre8-typography-label-default;
  display: flex;
  align-items: center;
  appearance: none; /* 1 */
  background: transparent; /* 1 */
  border: none;
  //border: 1px solid var(--cre8-color-header-menu-border-default); /* 1 */
  white-space: nowrap;
  width: 100%;
  margin: 0;
  padding: calc(var(--size-base-unit) * 2) calc(var(--size-base-unit) * 4);
  color: var(--cre8-primary-nav-link-color, var(--cre8-color-header-menu-content-default));
  text-decoration: none;
  transition: all var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    //border-color: var(--cre8-color-header-menu-border-hover);
    background: var(--cre8-color-header-menu-bg-hover);
    color: var(--cre8-color-header-menu-content-hover);
  }

  &:active {
    border-color: var(--cre8-color-header-menu-border-pressed);
    background: var(--cre8-color-header-menu-bg-pressed);
    color: var(--cre8-color-header-menu-content-pressed);
  }

  /**
  * Primary navigation link within active primary nav item
  */
  .cre8-c-primary-nav__item.cre8-is-active & {
    background: var(--cre8-color-bg-brand);
    color: var(--cre8-color-header-menu-content-hover);
  }

  /**
  * Medium screen primary navigation
  */
  @media all and (min-width:$cre8-breakpoint-lg) {
    padding: calc(var(--size-base-unit) * 2) calc(var(--size-base-unit) * 1);
  }

  @media all and (min-width:$cre8-breakpoint-lg) {
    padding: calc(var(--size-base-unit) * 2);
    border-bottom: none;
  }
}

/**
 * Icon within primary navigation item
 */
cre8-icon-legacy {
  --cre8-icon-height: #{calc(var(--size-base-unit) * 1.5)}; /* 1 */
  --cre8-icon-width: #{calc(var(--size-base-unit) * 1.5)}; /* 1 */
  margin-left: auto;
  transition: transform var(--cre8-anim-fade-quick) var(--cre8-anim-ease);

  /**
  * Icon within active primary nav item
  * 1) Rotate the icon to show that the dropdown is open
  */
  .cre8-c-primary-nav__item.cre8-is-active & {
    transform: rotate(-180deg); /* 1 */
  }

  @media all and (min-width:$cre8-breakpoint-lg) {
    margin-left: calc(var(--size-base-unit) * 1);
  }
}

/**
 * Primary nav item panel
 * 1) Panel for the dropdown content
 * 1) Hide when not active
 */
.cre8-c-primary-nav__item-panel {
  //display: none;
  visibility: hidden; /* 1 */
  width: 100%;
  height: 0; /* 1 */
  overflow: hidden; /* 1 */
  background: transparent;
  opacity: 0; /* 1 */
  transition: all 0s var(--cre8-anim-ease);
  z-index: -1;

  @media all and (min-width:$cre8-breakpoint-lg) {
    position: absolute;
    top: 100%;
    left: 0;
    height: auto;
    box-shadow: var(--cre8-theme-box-shadow-md);
  }

  /**
  * Primary nav item panel within active item
  * 1) Show the primary nav item dropdown
  */
  .cre8-c-primary-nav__item.cre8-is-active & {
    display: block;
    visibility: visible; /* 1 */
    height: auto; /* 1 */
    padding-top: calc(var(--size-base-unit) * 4);
    padding-bottom: calc(var(--size-base-unit) * 4);
    background: var(--cre8-color-bg-default);
    opacity: 1; /* 1 */
    z-index: 1;
    transition: opacity var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  }
}

/**
* Primary nav item panel inner container
* 1) Container within primary nav item panel that caps the content width and aligns
*/
.cre8-c-primary-nav__item-panel-inner {
  /**
  * Primary nav item inner container within megamenu item
  * 1) Cap the content width and center
  */
  .cre8-c-primary-nav__item--megamenu & {
    max-width: 70rem; /* 1 */
    padding-right: calc(var(--size-base-unit) * 4);
    padding-left: calc(var(--size-base-unit) * 4);
    margin: 0 auto; /* 1 */
  }
}

.cre8-c-primary-nav__item-before {
  margin-right: calc(var(--size-base-unit) * 1);
}

.cre8-c-primary-nav__item-after {
  margin-left: calc(var(--size-base-unit) * 1);
}
`});
