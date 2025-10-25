(function(p,_){typeof exports=="object"&&typeof module<"u"?module.exports=_():typeof define=="function"&&define.amd?define(_):(p=typeof globalThis<"u"?globalThis:p||self,p.AccordionItem=p.AccordionItem||{},p.AccordionItem.styles=_())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ne;const p=globalThis,_=p.ShadowRoot&&(p.ShadyCSS===void 0||p.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,R=Symbol(),V=new WeakMap;let W=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==R)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(_&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=V.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&V.set(t,e))}return e}toString(){return this.cssText}};const ce=o=>new W(typeof o=="string"?o:o+"",void 0,R),ae=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((r,i,n)=>r+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new W(t,o,R)},le=(o,e)=>{if(_)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),i=p.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=t.cssText,o.appendChild(r)}},J=_?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return ce(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:he,defineProperty:de,getOwnPropertyDescriptor:ue,getOwnPropertyNames:pe,getOwnPropertySymbols:fe,getPrototypeOf:$e}=Object,$=globalThis,K=$.trustedTypes,ve=K?K.emptyScript:"",j=$.reactiveElementPolyfillSupport,x=(o,e)=>o,I={toAttribute(o,e){switch(e){case Boolean:o=o?ve:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},Z=(o,e)=>!he(o,e),F={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=F){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(e,r,t);i!==void 0&&de(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){const{get:i,set:n}=ue(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:i,set(s){const a=i==null?void 0:i.call(this);n==null||n.call(this,s),this.requestUpdate(e,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const e=$e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,r=[...pe(t),...fe(t)];for(const i of r)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,i]of t)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const i=this._$Eu(t,r);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const i of r)t.unshift(J(i))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return le(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){var n;const r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){const s=(((n=r.converter)==null?void 0:n.toAttribute)!==void 0?r.converter:I).toAttribute(t,r.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){var n,s;const r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const a=r.getPropertyOptions(i),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:I;this._$Em=i,this[i]=c.fromAttribute(t,a.type)??((s=this._$Ej)==null?void 0:s.get(i))??null,this._$Em=null}}requestUpdate(e,t,r){var i;if(e!==void 0){const n=this.constructor,s=this[e];if(r??(r=n.getPropertyOptions(e)),!((r.hasChanged??Z)(s,t)||r.useDefault&&r.reflect&&s===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:n},s){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),n!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,s]of i){const{wrapped:a}=s,c=this[n];a!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,s,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var i;return(i=r.hostUpdated)==null?void 0:i.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[x("elementProperties")]=new Map,E[x("finalized")]=new Map,j==null||j({ReactiveElement:E}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,H=C.trustedTypes,G=H?H.createPolicy("lit-html",{createHTML:o=>o}):void 0,Q="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+v,be=`<${X}>`,m=document,P=()=>m.createComment(""),z=o=>o===null||typeof o!="object"&&typeof o!="function",D=Array.isArray,_e=o=>D(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",L=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,g=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,re=/"/g,ie=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),oe=new WeakMap,y=m.createTreeWalker(m,129);function se(o,e){if(!D(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const me=(o,e)=>{const t=o.length-1,r=[];let i,n=e===2?"<svg>":e===3?"<math>":"",s=U;for(let a=0;a<t;a++){const c=o[a];let d,u,l=-1,f=0;for(;f<c.length&&(s.lastIndex=f,u=s.exec(c),u!==null);)f=s.lastIndex,s===U?u[1]==="!--"?s=Y:u[1]!==void 0?s=ee:u[2]!==void 0?(ie.test(u[2])&&(i=RegExp("</"+u[2],"g")),s=g):u[3]!==void 0&&(s=g):s===g?u[0]===">"?(s=i??U,l=-1):u[1]===void 0?l=-2:(l=s.lastIndex-u[2].length,d=u[1],s=u[3]===void 0?g:u[3]==='"'?re:te):s===re||s===te?s=g:s===Y||s===ee?s=U:(s=g,i=void 0);const b=s===g&&o[a+1].startsWith("/>")?" ":"";n+=s===U?c+be:l>=0?(r.push(d),c.slice(0,l)+Q+c.slice(l)+v+b):c+v+(l===-2?a:b)}return[se(o,n+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class k{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let n=0,s=0;const a=e.length-1,c=this.parts,[d,u]=me(e,t);if(this.el=k.createElement(d,r),y.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=y.nextNode())!==null&&c.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(Q)){const f=u[s++],b=i.getAttribute(l).split(v),N=/([.?@])?(.*)/.exec(f);c.push({type:1,index:n,name:N[2],strings:b,ctor:N[1]==="."?ye:N[1]==="?"?Ae:N[1]==="@"?Ee:T}),i.removeAttribute(l)}else l.startsWith(v)&&(c.push({type:6,index:n}),i.removeAttribute(l));if(ie.test(i.tagName)){const l=i.textContent.split(v),f=l.length-1;if(f>0){i.textContent=H?H.emptyScript:"";for(let b=0;b<f;b++)i.append(l[b],P()),y.nextNode(),c.push({type:2,index:++n});i.append(l[f],P())}}}else if(i.nodeType===8)if(i.data===X)c.push({type:2,index:n});else{let l=-1;for(;(l=i.data.indexOf(v,l+1))!==-1;)c.push({type:7,index:n}),l+=v.length-1}n++}}static createElement(e,t){const r=m.createElement("template");return r.innerHTML=e,r}}function w(o,e,t=o,r){var s,a;if(e===S)return e;let i=r!==void 0?(s=t._$Co)==null?void 0:s[r]:t._$Cl;const n=z(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((a=i==null?void 0:i._$AO)==null||a.call(i,!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=i:t._$Cl=i),i!==void 0&&(e=w(o,i._$AS(o,e.values),i,r)),e}class ge{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,i=((e==null?void 0:e.creationScope)??m).importNode(t,!0);y.currentNode=i;let n=y.nextNode(),s=0,a=0,c=r[0];for(;c!==void 0;){if(s===c.index){let d;c.type===2?d=new O(n,n.nextSibling,this,e):c.type===1?d=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(d=new Se(n,this,e)),this._$AV.push(d),c=r[++a]}s!==(c==null?void 0:c.index)&&(n=y.nextNode(),s++)}return y.currentNode=m,i}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class O{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),z(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):_e(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(m.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=k.createElement(se(r.h,r.h[0]),this.options)),r);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const s=new ge(i,this),a=s.u(this.options);s.p(t),this.T(a),this._$AH=s}}_$AC(e){let t=oe.get(e.strings);return t===void 0&&oe.set(e.strings,t=new k(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const n of e)i===t.length?t.push(r=new O(this.O(P()),this.O(P()),this,this.options)):r=t[i],r._$AI(n),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class T{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(e,t=this,r,i){const n=this.strings;let s=!1;if(n===void 0)e=w(this,e,t,0),s=!z(e)||e!==this._$AH&&e!==S,s&&(this._$AH=e);else{const a=e;let c,d;for(e=n[0],c=0;c<n.length-1;c++)d=w(this,a[r+c],t,c),d===S&&(d=this._$AH[c]),s||(s=!z(d)||d!==this._$AH[c]),d===h?e=h:e!==h&&(e+=(d??"")+n[c+1]),this._$AH[c]=d}s&&!i&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ye extends T{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class Ae extends T{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Ee extends T{constructor(e,t,r,i,n){super(e,t,r,i,n),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??h)===S)return;const r=this._$AH,i=e===h&&r!==h||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==h&&(r===h||i);i&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const B=C.litHtmlPolyfillSupport;B==null||B(k,O),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.3.0");const we=(o,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let i=r._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;r._$litPart$=i=new O(e.insertBefore(P(),n),n,void 0,t??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;class M extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}}M._$litElement$=!0,M.finalized=!0,(ne=A.litElementHydrateSupport)==null||ne.call(A,{LitElement:M});const q=A.litElementPolyfillSupport;return q==null||q({LitElement:M}),(A.litElementVersions??(A.litElementVersions=[])).push("4.2.0"),ae`@import '../../design-tokens/core/scss/theming/component';

/**
* Accordion Item panel button
* 1) Icon rotating on open was causing scrollbar to continuously appear/disappear
*    during the animation, overflow-x: hidden; prevents this from happening
*/

:host {
  display: block;
  ::slotted(*) {
    text-align: left;
    width: 100%;
  }
}

.cre8-c-accordion-item {
  border-bottom: var(--cre8-accordion-item-border-bottom);
  border-radius: var(--cre8-border-radius-none);
  --cre8-u-icon-display: flex;
  --cre8-u-icon-align-items: center;
  --cre8-u-icon-justify-content: center;
  padding: calc(var(--size-base-unit) * 3) calc(var(--size-base-unit) * 1);
}
.cre8-c-accordion-item--small cre8-heading button {
  @include cre8-typography-title-default();
}
.cre8-c-accordion-item--large cre8-heading button {
  @include cre8-typography-title-large();
}
.cre8-c-accordion-item__body {
  margin-right: calc(var(--size-base-unit) * 0);
  margin-left: calc(var(--size-base-unit) * 0);
  padding: calc(var(--size-base-unit) * 0);
  overflow: hidden;
  visibility: hidden;
  transition: height var(--cre8-anim-fade-quick) var(--cre8-anim-ease), visibility var(--cre8-anim-fade-quick) var(--cre8-anim-ease);

  .cre8-c-accordion-item.cre8-is-active & {
    visibility: visible;
  }
}

.cre8-c-accordion-item__body-inner {
  display: flex;
  @include cre8-typography-body-default();
  padding: calc(var(--size-base-unit) * 1) calc(var(--size-base-unit) * 6) calc(var(--size-base-unit) * 0) calc(var(--size-base-unit) * 1);
}

cre8-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(var(--size-base-unit) * 3);
  min-height: calc(var(--size-base-unit) * 3);
  min-width: calc(var(--size-base-unit) * 3);
  transition: transform var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  width: calc(var(--size-base-unit) * 3);

  .cre8-c-accordion-item.cre8-is-active & {
    transform: rotate(180deg);
  }
}

.cre8-c-accordion-item__icon {
  align-items: center;
  background: var(--cre8-color-bg-brand-strong);
  border-radius: var(--cre8-border-radius-round);
  color: var(--cre8-color-content-knockout);
  display: flex;
  height: calc(var(--size-base-unit) * 4);
  justify-content: center;
  margin-left: calc(var(--size-base-unit) * 1);
  margin-right: calc(var(--size-base-unit) * 0.25);
  min-height: calc(var(--size-base-unit) * 4);
  min-width: calc(var(--size-base-unit) * 4);
  width: calc(var(--size-base-unit) * 4);

  .cre8-c-accordion-item.cre8-is-active & {
    background: var(--cre8-color-button-secondary-bg);
    border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-button-secondary-border);
    color: var(--cre8-color-button-secondary-content);

    &:hover {
      border-color: var(--cre8-color-button-secondary-border-hover);
      background-color: var(--cre8-color-button-secondary-bg-hover);
      color: var(--cre8-color-button-secondary-content-hover);
    }

    &:focus {
      border-radius: var(--cre8-border-radius-default);
      box-shadow: calc(var(--size-base-unit) * 0) calc(var(--size-base-unit) * 0) calc(var(--size-base-unit) * 0) calc(var(--size-base-unit) * 0.25) var(--cre8-color-border-active-outline);
      outline: none;

      .cre8-c-accordion-item__icon {
        border-color: var(--cre8-color-button-secondary-border-active);
        color: var(--cre8-color-button-secondary-content-active);
        background-color: var(--cre8-color-button-secondary-bg-active);
      }
      .cre8-c-accordion-item__tertiary-icon {
        border-color: var(--cre8-color-border-transparent);
        color: var(--cre8-color-button-tertiary-content-active);
        background-color: var(--cre8-color-bg-transparent);
      }
    }
  }
}

.cre8-c-accordion-item__button {
  color: var(--cre8-color-content-default);
  display: block;
  appearance: none;
  background-color: var(--cre8-color-bg-transparent);
  border: var(--cre8-border-width-none);
  cursor: pointer;
  padding: calc(var(--size-base-unit) * 0.5) calc(var(--size-base-unit) * 1);
  overflow-x: hidden;
  transition: color var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  width: 100%;

  &.cre8-brand-color {
    color: var(--cre8-color-content-brand-strong);
  }

  &.cre8-u-justify-content-start {
    justify-content: flex-start;
    .cre8-c-accordion-item__icon-before {
      margin-left: calc(var(--size-base-unit) * 0);
    }
  }

  &:hover {
    .cre8-c-accordion-item__icon {
      border-color: var(--cre8-color-button-primary-border-hover);
      background-color: var(--cre8-color-button-primary-bg-hover);
      color: var(--cre8-color-button-primary-content-hover);
      .cre8-c-accordion-item.cre8-is-active & {
        border-color: var(--cre8-color-button-secondary-border-hover);
        background-color: var(--cre8-color-button-secondary-bg-hover);
        color: var(--cre8-color-button-secondary-content-hover);
      }
    }
    .cre8-c-accordion-item__tertiary-icon {
      border-color: var(--cre8-color-border-transparent);
      color: var(--cre8-color-button-tertiary-content-hover);
      background-color: var(--cre8-color-bg-transparent);
    }
  }

  &:focus {
    border-radius: var(--cre8-border-radius-default);
    box-shadow: calc(var(--size-base-unit) * 0) calc(var(--size-base-unit) * 0) calc(var(--size-base-unit) * 0) calc(var(--size-base-unit) * 0.25) var(--cre8-color-border-active-outline);
    outline: none;

    .cre8-c-accordion-item__icon {
      border-color: var(--cre8-color-button-primary-border-active);
      color: var(--cre8-color-button-primary-content-active);
      background-color: var(--cre8-color-button-primary-bg-active);
    }
    .cre8-c-accordion-item__tertiary-icon {
      border-color: var(--cre8-color-border-transparent);
      color: var(--cre8-color-button-tertiary-content-active);
      background-color: var(--cre8-color-bg-transparent);
    }
  }
}
.cre8-c-accordion-item--icon-before {
  .cre8-c-accordion-item__body {
    margin-left: calc(var(--size-base-unit) * 5);
  }
}

.cre8-c-accordion-item__icon-before {
  margin-right: calc(var(--size-base-unit) * 1.5);

  h4[slot='header'] {
    display: block;
    pointer-events: none;
  }
}

.cre8-c-accordion-item__button slot {
  display: contents;
  text-align: initial;
}
.cre8-c-accordion-item--icon-before-heading-text{
  display: flex;
  text-align: left;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-width: 100%
}
.cre8-c-accordion-item--icon-after-heading-text{
  display: flex;
  text-align: left;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 100%
}
`});
