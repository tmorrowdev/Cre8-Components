(function(u,y){typeof exports=="object"&&typeof module<"u"?module.exports=y():typeof define=="function"&&define.amd?define(y):(u=typeof globalThis<"u"?globalThis:u||self,u.Dropdown=u.Dropdown||{},u.Dropdown.styles=y())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var nt;const u=globalThis,y=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),V=new WeakMap;let q=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(y&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=V.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&V.set(e,t))}return t}toString(){return this.cssText}};const ht=r=>new q(typeof r=="string"?r:r+"",void 0,D),at=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new q(e,r,D)},ct=(r,t)=>{if(y)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=u.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},J=y?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ht(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:lt,defineProperty:dt,getOwnPropertyDescriptor:pt,getOwnPropertyNames:ut,getOwnPropertySymbols:$t,getPrototypeOf:ft}=Object,f=globalThis,K=f.trustedTypes,_t=K?K.emptyScript:"",z=f.reactiveElementPolyfillSupport,C=(r,t)=>r,L={toAttribute(r,t){switch(t){case Boolean:r=r?_t:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Z=(r,t)=>!lt(r,t),F={attribute:!0,type:String,converter:L,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=F){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&dt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=pt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const a=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??F}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,s=[...ut(e),...$t(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(J(i))}else t!==void 0&&e.push(J(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ct(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:L).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const a=s.getPropertyOptions(i),h=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:L;this._$Em=i,this[i]=h.fromAttribute(e,a.type)??((o=this._$Ej)==null?void 0:o.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,o=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??Z)(o,e)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:a}=o,h=this[n];a!==!0||this._$AL.has(n)||h===void 0||this.C(n,void 0,o,h)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[C("elementProperties")]=new Map,E[C("finalized")]=new Map,z==null||z({ReactiveElement:E}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,M=P.trustedTypes,G=M?M.createPolicy("lit-html",{createHTML:r=>r}):void 0,Q="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+_,gt=`<${X}>`,A=document,x=()=>A.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",j=Array.isArray,yt=r=>j(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",B=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,tt=/>/g,m=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),et=/'/g,st=/"/g,it=/^(?:script|style|textarea|title)$/i,w=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),rt=new WeakMap,v=A.createTreeWalker(A,129);function ot(r,t){if(!j(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(t):t}const At=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=O;for(let a=0;a<e;a++){const h=r[a];let d,p,c=-1,$=0;for(;$<h.length&&(o.lastIndex=$,p=o.exec(h),p!==null);)$=o.lastIndex,o===O?p[1]==="!--"?o=Y:p[1]!==void 0?o=tt:p[2]!==void 0?(it.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=m):p[3]!==void 0&&(o=m):o===m?p[0]===">"?(o=i??O,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?m:p[3]==='"'?st:et):o===st||o===et?o=m:o===Y||o===tt?o=O:(o=m,i=void 0);const g=o===m&&r[a+1].startsWith("/>")?" ":"";n+=o===O?h+gt:c>=0?(s.push(d),h.slice(0,c)+Q+h.slice(c)+_+g):h+_+(c===-2?a:g)}return[ot(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class H{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const a=t.length-1,h=this.parts,[d,p]=At(t,e);if(this.el=H.createElement(d,s),v.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=v.nextNode())!==null&&h.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(Q)){const $=p[o++],g=i.getAttribute(c).split(_),k=/([.?@])?(.*)/.exec($);h.push({type:1,index:n,name:k[2],strings:g,ctor:k[1]==="."?vt:k[1]==="?"?bt:k[1]==="@"?Et:N}),i.removeAttribute(c)}else c.startsWith(_)&&(h.push({type:6,index:n}),i.removeAttribute(c));if(it.test(i.tagName)){const c=i.textContent.split(_),$=c.length-1;if($>0){i.textContent=M?M.emptyScript:"";for(let g=0;g<$;g++)i.append(c[g],x()),v.nextNode(),h.push({type:2,index:++n});i.append(c[$],x())}}}else if(i.nodeType===8)if(i.data===X)h.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(_,c+1))!==-1;)h.push({type:7,index:n}),c+=_.length-1}n++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function S(r,t,e=r,s){var o,a;if(t===w)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=U(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((a=i==null?void 0:i._$AO)==null||a.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=S(r,i._$AS(r,t.values),i,s)),t}class mt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??A).importNode(e,!0);v.currentNode=i;let n=v.nextNode(),o=0,a=0,h=s[0];for(;h!==void 0;){if(o===h.index){let d;h.type===2?d=new T(n,n.nextSibling,this,t):h.type===1?d=new h.ctor(n,h.name,h.strings,this,t):h.type===6&&(d=new wt(n,this,t)),this._$AV.push(d),h=s[++a]}o!==(h==null?void 0:h.index)&&(n=v.nextNode(),o++)}return v.currentNode=A,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class T{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),U(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):yt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=H.createElement(ot(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new mt(i,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(t){let e=rt.get(t.strings);return e===void 0&&rt.set(t.strings,e=new H(t)),e}k(t){j(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new T(this.O(x()),this.O(x()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=S(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{const a=t;let h,d;for(t=n[0],h=0;h<n.length-1;h++)d=S(this,a[s+h],e,h),d===w&&(d=this._$AH[h]),o||(o=!U(d)||d!==this._$AH[h]),d===l?t=l:t!==l&&(t+=(d??"")+n[h+1]),this._$AH[h]=d}o&&!i&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class vt extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}}class bt extends N{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}}class Et extends N{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??l)===w)return;const s=this._$AH,i=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==l&&(s===l||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class wt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const I=P.litHtmlPolyfillSupport;I==null||I(H,T),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.0");const St=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new T(t.insertBefore(x(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class R extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=St(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return w}}R._$litElement$=!0,R.finalized=!0,(nt=b.litElementHydrateSupport)==null||nt.call(b,{LitElement:R});const W=b.litElementPolyfillSupport;return W==null||W({LitElement:R}),(b.litElementVersions??(b.litElementVersions=[])).push("4.2.0"),at`@import '../../design-tokens/core/scss/theming/component';

// #DROPDOWN

/**
 * 1) Dropdown
 */

.cre8-c-dropdown-container {
  display: inline-flex;
  position: relative;
}
.cre8-c-dropdown {
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  box-shadow: var(--cre8-shadow-default);
  border-radius: var(--cre8-border-radius-default);
  display: none;
  flex-direction: column;
  left: 0;
  min-width: 100%;
  padding: var(--cre8-spacing-8);
  position: absolute;
  top: 100%;
  white-space: nowrap;
}

.cre8-c-dropdown--open {
  display: flex;
}

.cre8-c-dropdown--icon-button {
  color: var(--cre8-color-button-secondary-content);
  margin-top: calc(var(--size-base-unit) * 1);
}

.cre8-c-dropdown--icon-link {
  color: var(--cre8-color-content-link);
  margin-top: calc(var(--size-base-unit) * 1);
}

.cre8-c-dropdown--toggle {
  @include cre8-typography-label-default;
  align-items: center;
  justify-content: space-between;
  display: flex;
  gap: var(--cre8-spacing-8);
  white-space: nowrap;
}

.cre8-c-dropdown--button {
  background-color: var(--cre8-color-button-secondary-bg);
  border: var(--cre8-border-style-default) var(--cre8-border-width-default) var(--cre8-color-button-secondary-border);
  border-radius: var(--cre8-border-radius-button);
  color: var(--cre8-color-button-secondary-content);
  padding: var(--cre8-spacing-8) var(--cre8-spacing-16);
}

.cre8-c-dropdown--link {
  color: var(--cre8-color-content-link);
  background-color:  var(--cre8-color-bg-transparent);
  text-decoration: underline;
}


.cre8-c-dropdown--close {
  display: none;
}

ul {
  list-style-type: none;
  padding: var(--cre8-spacing-0);
  margin: 0;
}
`});
