(function(u,m){typeof exports=="object"&&typeof module<"u"?module.exports=m():typeof define=="function"&&define.amd?define(m):(u=typeof globalThis<"u"?globalThis:u||self,u.ProgressStepsItem=u.ProgressStepsItem||{},u.ProgressStepsItem.styles=m())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ne;const u=globalThis,m=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),W=new WeakMap;let q=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(m&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=W.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&W.set(t,e))}return e}toString(){return this.cssText}};const ce=i=>new q(typeof i=="string"?i:i+"",void 0,z),he=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new q(t,i,z)},ae=(i,e)=>{if(m)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),r=u.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},J=m?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return ce(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:le,defineProperty:de,getOwnPropertyDescriptor:pe,getOwnPropertyNames:ue,getOwnPropertySymbols:$e,getPrototypeOf:_e}=Object,_=globalThis,K=_.trustedTypes,fe=K?K.emptyScript:"",D=_.reactiveElementPolyfillSupport,C=(i,e)=>i,I={toAttribute(i,e){switch(e){case Boolean:i=i?fe:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Z=(i,e)=>!le(i,e),F={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=F){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&de(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){const{get:r,set:n}=pe(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){const h=r==null?void 0:r.call(this);n==null||n.call(this,o),this.requestUpdate(e,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=_e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,s=[...ue(t),...$e(t)];for(const r of s)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const r of s)t.unshift(J(r))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ae(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var n;const s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:I).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){var n,o;const s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const h=s.getPropertyOptions(r),c=typeof h.converter=="function"?{fromAttribute:h.converter}:((n=h.converter)==null?void 0:n.fromAttribute)!==void 0?h.converter:I;this._$Em=r,this[r]=c.fromAttribute(t,h.type)??((o=this._$Ej)==null?void 0:o.get(r))??null,this._$Em=null}}requestUpdate(e,t,s){var r;if(e!==void 0){const n=this.constructor,o=this[e];if(s??(s=n.getPropertyOptions(e)),!((s.hasChanged??Z)(o,t)||s.useDefault&&s.reflect&&o===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,o]of r){const{wrapped:h}=o,c=this[n];h!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var r;return(r=s.hostUpdated)==null?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[C("elementProperties")]=new Map,E[C("finalized")]=new Map,D==null||D({ReactiveElement:E}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,M=P.trustedTypes,G=M?M.createPolicy("lit-html",{createHTML:i=>i}):void 0,Q="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+f,ge=`<${X}>`,v=document,x=()=>v.createComment(""),U=i=>i===null||typeof i!="object"&&typeof i!="function",L=Array.isArray,me=i=>L(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",j=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,A=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,se=/"/g,re=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ie=new WeakMap,y=v.createTreeWalker(v,129);function oe(i,e){if(!L(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const ve=(i,e)=>{const t=i.length-1,s=[];let r,n=e===2?"<svg>":e===3?"<math>":"",o=O;for(let h=0;h<t;h++){const c=i[h];let d,p,a=-1,$=0;for(;$<c.length&&(o.lastIndex=$,p=o.exec(c),p!==null);)$=o.lastIndex,o===O?p[1]==="!--"?o=Y:p[1]!==void 0?o=ee:p[2]!==void 0?(re.test(p[2])&&(r=RegExp("</"+p[2],"g")),o=A):p[3]!==void 0&&(o=A):o===A?p[0]===">"?(o=r??O,a=-1):p[1]===void 0?a=-2:(a=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?A:p[3]==='"'?se:te):o===se||o===te?o=A:o===Y||o===ee?o=O:(o=A,r=void 0);const g=o===A&&i[h+1].startsWith("/>")?" ":"";n+=o===O?c+ge:a>=0?(s.push(d),c.slice(0,a)+Q+c.slice(a)+f+g):c+f+(a===-2?h:g)}return[oe(i,n+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class H{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let n=0,o=0;const h=e.length-1,c=this.parts,[d,p]=ve(e,t);if(this.el=H.createElement(d,s),y.currentNode=this.el.content,t===2||t===3){const a=this.el.content.firstChild;a.replaceWith(...a.childNodes)}for(;(r=y.nextNode())!==null&&c.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(const a of r.getAttributeNames())if(a.endsWith(Q)){const $=p[o++],g=r.getAttribute(a).split(f),k=/([.?@])?(.*)/.exec($);c.push({type:1,index:n,name:k[2],strings:g,ctor:k[1]==="."?ye:k[1]==="?"?be:k[1]==="@"?Ee:N}),r.removeAttribute(a)}else a.startsWith(f)&&(c.push({type:6,index:n}),r.removeAttribute(a));if(re.test(r.tagName)){const a=r.textContent.split(f),$=a.length-1;if($>0){r.textContent=M?M.emptyScript:"";for(let g=0;g<$;g++)r.append(a[g],x()),y.nextNode(),c.push({type:2,index:++n});r.append(a[$],x())}}}else if(r.nodeType===8)if(r.data===X)c.push({type:2,index:n});else{let a=-1;for(;(a=r.data.indexOf(f,a+1))!==-1;)c.push({type:7,index:n}),a+=f.length-1}n++}}static createElement(e,t){const s=v.createElement("template");return s.innerHTML=e,s}}function w(i,e,t=i,s){var o,h;if(e===S)return e;let r=s!==void 0?(o=t._$Co)==null?void 0:o[s]:t._$Cl;const n=U(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((h=r==null?void 0:r._$AO)==null||h.call(r,!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=r:t._$Cl=r),r!==void 0&&(e=w(i,r._$AS(i,e.values),r,s)),e}class Ae{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,r=((e==null?void 0:e.creationScope)??v).importNode(t,!0);y.currentNode=r;let n=y.nextNode(),o=0,h=0,c=s[0];for(;c!==void 0;){if(o===c.index){let d;c.type===2?d=new T(n,n.nextSibling,this,e):c.type===1?d=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(d=new Se(n,this,e)),this._$AV.push(d),c=s[++h]}o!==(c==null?void 0:c.index)&&(n=y.nextNode(),o++)}return y.currentNode=v,r}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class T{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),U(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):me(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(v.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=H.createElement(oe(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(t);else{const o=new Ae(r,this),h=o.u(this.options);o.p(t),this.T(h),this._$AH=o}}_$AC(e){let t=ie.get(e.strings);return t===void 0&&ie.set(e.strings,t=new H(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,r=0;for(const n of e)r===t.length?t.push(s=new T(this.O(x()),this.O(x()),this,this.options)):s=t[r],s._$AI(n),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,n){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(e,t=this,s,r){const n=this.strings;let o=!1;if(n===void 0)e=w(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==S,o&&(this._$AH=e);else{const h=e;let c,d;for(e=n[0],c=0;c<n.length-1;c++)d=w(this,h[s+c],t,c),d===S&&(d=this._$AH[c]),o||(o=!U(d)||d!==this._$AH[c]),d===l?e=l:e!==l&&(e+=(d??"")+n[c+1]),this._$AH[c]=d}o&&!r&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ye extends N{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}}class be extends N{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}}class Ee extends N{constructor(e,t,s,r,n){super(e,t,s,r,n),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??l)===S)return;const s=this._$AH,r=e===l&&s!==l||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==l&&(s===l||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const B=P.litHtmlPolyfillSupport;B==null||B(H,T),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.0");const we=(i,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let r=s._$litPart$;if(r===void 0){const n=(t==null?void 0:t.renderBefore)??null;s._$litPart$=r=new T(e.insertBefore(x(),n),n,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class R extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}}R._$litElement$=!0,R.finalized=!0,(ne=b.litElementHydrateSupport)==null||ne.call(b,{LitElement:R});const V=b.litElementPolyfillSupport;return V==null||V({LitElement:R}),(b.litElementVersions??(b.litElementVersions=[])).push("4.2.0"),he`@import '../../design-tokens/core/scss/theming/component';

:host(:first-child)::part(left-divider),
:host(:last-child)::part(right-divider){
  visibility: hidden;
}

.cre8-c-progress-steps-item--complete {
  --divider-color-left: var(--cre8-color-border-brand);
  --divider-color-right: var(--cre8-color-border-brand);
  --icon-color: var(--cre8-color-content-brand);
  --name-color: var(--cre8-color-content-brand);
}

.cre8-c-progress-steps-item--current {
  --divider-color-left: var(--cre8-color-border-brand);
  --divider-color-right: var(--cre8-color-border-strong);
  --icon-color: var(--cre8-color-content-brand);
  --name-color: var(--cre8-color-content-brand);
}

.cre8-c-progress-steps-item--error {
  --divider-color-left: var(--cre8-color-border-brand);
  --divider-color-right: var(--cre8-color-border-strong);
  --icon-color: var(--cre8-color-content-error-icon);
  --name-color: var(--cre8-color-content-error);
}

.cre8-c-progress-steps-item--incomplete {
  --divider-color-left: var(--cre8-color-border-strong);
  --divider-color-right: var(--cre8-color-border-strong);
  --icon-color: var(--cre8-color-content-subtle);
  --name-color: var(--cre8-color-content-subtle);
}

.cre8-c-progress-steps-item--warning {
  --divider-color-left: var(--cre8-color-border-brand);
  --divider-color-right: var(--cre8-color-border-strong);
  --icon-color: var(--cre8-color-content-warning-icon);
  --name-color: var(--cre8-color-content-default);
}

.cre8-c-progress-steps-item {
  @include cre8-typography-title-small();
  text-align: center;
}

.cre8-c-progress-steps-item__top-container {
  align-items: center;
  display: flex;
  padding-bottom: var(--cre8-spacing-8);
}

.cre8-c-progress-steps-item__svg {
  color: var(--icon-color);
  height: calc(var(--size-base-unit) * 2.5);
  margin-left: var(--cre8-spacing-8);
  margin-right: var(--cre8-spacing-8);
  width: calc(var(--size-base-unit) * 2.5);
  svg {
    height: calc(var(--size-base-unit) * 2.5);
    width: calc(var(--size-base-unit) * 2.5);
  }
}

.cre8-c-progress-steps-item__message {
  @include cre8-typography-body-small;
  padding-left: var(--cre8-spacing-16);
  padding-right: var(--cre8-spacing-16);
}

.cre8-c-progress-steps-item__name {
  @include cre8-typography-title-small;
  color: var(--name-color);
  padding-left: var(--cre8-spacing-16);
  padding-right: var(--cre8-spacing-16);
}

.cre8-c-progress-steps-item__divider--left,
.cre8-c-progress-steps-item__divider--right{
  height: calc(var(--size-base-unit) * 0.25);
  width: 100%;
}

.cre8-c-progress-steps-item__divider--left {
  background-color: var(--divider-color-left);
}

.cre8-c-progress-steps-item__divider--right {
  background-color: var(--divider-color-right);
}
`});
