(function(p,m){typeof exports=="object"&&typeof module<"u"?module.exports=m():typeof define=="function"&&define.amd?define(m):(p=typeof globalThis<"u"?globalThis:p||self,p.MultiSelect=p.MultiSelect||{},p.MultiSelect.styles=m())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ne;const p=globalThis,m=p.ShadowRoot&&(p.ShadyCSS===void 0||p.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),W=new WeakMap;let q=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(m&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=W.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&W.set(t,e))}return e}toString(){return this.cssText}};const le=r=>new q(typeof r=="string"?r:r+"",void 0,z),ae=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new q(t,r,z)},ce=(r,e)=>{if(m)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=p.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},J=m?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return le(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:he,defineProperty:de,getOwnPropertyDescriptor:ue,getOwnPropertyNames:pe,getOwnPropertySymbols:$e,getPrototypeOf:fe}=Object,f=globalThis,K=f.trustedTypes,_e=K?K.emptyScript:"",L=f.reactiveElementPolyfillSupport,x=(r,e)=>r,j={toAttribute(r,e){switch(e){case Boolean:r=r?_e:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Z=(r,e)=>!he(r,e),F={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=F){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&de(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:n}=ue(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:i,set(o){const a=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const e=fe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,s=[...pe(t),...$e(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(J(i))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var n;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:j).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){var n,o;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const a=s.getPropertyOptions(i),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:j;this._$Em=i,this[i]=l.fromAttribute(t,a.type)??((o=this._$Ej)==null?void 0:o.get(i))??null,this._$Em=null}}requestUpdate(e,t,s){var i;if(e!==void 0){const n=this.constructor,o=this[e];if(s??(s=n.getPropertyOptions(e)),!((s.hasChanged??Z)(o,t)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:a}=o,l=this[n];a!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,o,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[x("elementProperties")]=new Map,E[x("finalized")]=new Map,L==null||L({ReactiveElement:E}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,H=C.trustedTypes,G=H?H.createPolicy("lit-html",{createHTML:r=>r}):void 0,Q="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+_,ge=`<${X}>`,v=document,P=()=>v.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",D=Array.isArray,me=r=>D(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",B=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,y=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,se=/"/g,ie=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),re=new WeakMap,b=v.createTreeWalker(v,129);function oe(r,e){if(!D(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const ve=(r,e)=>{const t=r.length-1,s=[];let i,n=e===2?"<svg>":e===3?"<math>":"",o=M;for(let a=0;a<t;a++){const l=r[a];let d,u,c=-1,$=0;for(;$<l.length&&(o.lastIndex=$,u=o.exec(l),u!==null);)$=o.lastIndex,o===M?u[1]==="!--"?o=Y:u[1]!==void 0?o=ee:u[2]!==void 0?(ie.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=y):u[3]!==void 0&&(o=y):o===y?u[0]===">"?(o=i??M,c=-1):u[1]===void 0?c=-2:(c=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?y:u[3]==='"'?se:te):o===se||o===te?o=y:o===Y||o===ee?o=M:(o=y,i=void 0);const g=o===y&&r[a+1].startsWith("/>")?" ":"";n+=o===M?l+ge:c>=0?(s.push(d),l.slice(0,c)+Q+l.slice(c)+_+g):l+_+(c===-2?a:g)}return[oe(r,n+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class O{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let n=0,o=0;const a=e.length-1,l=this.parts,[d,u]=ve(e,t);if(this.el=O.createElement(d,s),b.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=b.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(Q)){const $=u[o++],g=i.getAttribute(c).split(_),k=/([.?@])?(.*)/.exec($);l.push({type:1,index:n,name:k[2],strings:g,ctor:k[1]==="."?be:k[1]==="?"?Ae:k[1]==="@"?Ee:N}),i.removeAttribute(c)}else c.startsWith(_)&&(l.push({type:6,index:n}),i.removeAttribute(c));if(ie.test(i.tagName)){const c=i.textContent.split(_),$=c.length-1;if($>0){i.textContent=H?H.emptyScript:"";for(let g=0;g<$;g++)i.append(c[g],P()),b.nextNode(),l.push({type:2,index:++n});i.append(c[$],P())}}}else if(i.nodeType===8)if(i.data===X)l.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(_,c+1))!==-1;)l.push({type:7,index:n}),c+=_.length-1}n++}}static createElement(e,t){const s=v.createElement("template");return s.innerHTML=e,s}}function w(r,e,t=r,s){var o,a;if(e===S)return e;let i=s!==void 0?(o=t._$Co)==null?void 0:o[s]:t._$Cl;const n=U(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((a=i==null?void 0:i._$AO)==null||a.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=w(r,i._$AS(r,e.values),i,s)),e}class ye{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??v).importNode(t,!0);b.currentNode=i;let n=b.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new T(n,n.nextSibling,this,e):l.type===1?d=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(d=new Se(n,this,e)),this._$AV.push(d),l=s[++a]}o!==(l==null?void 0:l.index)&&(n=b.nextNode(),o++)}return b.currentNode=v,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class T{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),U(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):me(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(v.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=O.createElement(oe(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const o=new ye(i,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=re.get(e.strings);return t===void 0&&re.set(e.strings,t=new O(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const n of e)i===t.length?t.push(s=new T(this.O(P()),this.O(P()),this,this.options)):s=t[i],s._$AI(n),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,t=this,s,i){const n=this.strings;let o=!1;if(n===void 0)e=w(this,e,t,0),o=!U(e)||e!==this._$AH&&e!==S,o&&(this._$AH=e);else{const a=e;let l,d;for(e=n[0],l=0;l<n.length-1;l++)d=w(this,a[s+l],t,l),d===S&&(d=this._$AH[l]),o||(o=!U(d)||d!==this._$AH[l]),d===h?e=h:e!==h&&(e+=(d??"")+n[l+1]),this._$AH[l]=d}o&&!i&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class be extends N{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class Ae extends N{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Ee extends N{constructor(e,t,s,i,n){super(e,t,s,i,n),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??h)===S)return;const s=this._$AH,i=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const I=C.litHtmlPolyfillSupport;I==null||I(O,T),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.3.0");const we=(r,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new T(e.insertBefore(P(),n),n,void 0,t??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;class R extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}}R._$litElement$=!0,R.finalized=!0,(ne=A.litElementHydrateSupport)==null||ne.call(A,{LitElement:R});const V=A.litElementPolyfillSupport;return V==null||V({LitElement:R}),(A.litElementVersions??(A.litElementVersions=[])).push("4.2.0"),ae`@import "../../design-tokens/core/scss/theming/component";

:host {
  display: block;
}

.cre8-c-multi-select {
  position: relative;
}

/**
 * Label
 */
.cre8-c-multi-select__label {
  @include label-styles;
}

/**
 * Body
 * 1) The div that contains the input and icons
 */
.cre8-c-multi-select__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  @include input-styles;
  padding: var(--cre8-spacing-8);
  padding-inline-end: calc(var(--size-base-unit) * 5.5);
  min-width: 240px;
  cursor: pointer;
  min-height: calc(var(--size-base-unit) * 6);
  height: fit-content;

  .cre8-is-disabled & {
    box-shadow: none;
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
    cursor: not-allowed;
    outline: none;

    &:hover,
    &:focus,
    &:active,
    &:focus-visible {
      outline: none;
      background-color: var(--cre8-color-bg-disabled);
      border-color: var(--cre8-color-border-disabled);
      color: var(--cre8-color-content-disabled);
    }

    .cre8-c-multi-select__content {
      border-color: var(--cre8-color-border-disabled);
    }
  }
}

.cre8-c-multi-select__content {
  display: flex;
  min-height: 30px;
  width: 100%;
  border-right: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  padding-right: calc(var(--size-base-unit) * 5.5);
}

.cre8-c-multi-select__tag-wrapper {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  gap: calc(var(--size-base-unit) * 0.5);
}

.cre8-c-multi-select__icons-wrapper {
  display: flex;
  justify-content: end;
  margin-right: -36px;
  margin-left: -48px;
  gap: calc(var(--size-base-unit) * 3);
  min-width: 96px;

  button {
    background-color: inherit;
    border: none;
    padding: none;

    .cre8-is-disabled & {
      cursor: not-allowed;
    }
  }
}

.cre8-c-multi-select__clear_icon {
  .cre8-c-multi-select--no-clear-icon & {
    display: none;
  }
}

/**
 * Select Icon
 * 1) The icons within the body container positioned absolutely over the input
 */
cre8-icon {
  display: flex;
  pointer-events: none;
  color: var(--cre8-color-button-tertiary-content);

  .cre8-is-disabled & {
    color: var(--cre8-color-border-disabled);
  }
}

.cre8-c-multi-select__dropdown {
  background-color: var(--cre8-color-bg-default);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  box-shadow: var(--cre8-shadow-default);
  border-radius: var(--cre8-border-radius-default);
  flex-direction: column;
  left: 0;
  min-width: 100%;
  position: absolute;
  top: 100%;
  white-space: nowrap;
  margin-top: var(--cre8-spacing-4);
  margin-left: 0;
  padding: var(--cre8-spacing-8);

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    @include cre8-typography-body-default;
    background-color: var(--cre8-color-bg-default);
    border: var(--cre8-border-width-focus) var(--cre8-border-style-default) var(--cre8-color-border-transparent);
    border-radius: var(--cre8-border-radius-default);
    color: var(--cre8-color-content-default);
    width: 100%;
    cursor: pointer;
    margin: var(--cre8-spacing-0);
    padding: var(--cre8-spacing-8) var(--cre8-spacing-8);
    text-align: left;

    &:active,
    &:hover,
    &:focus {
      background-color: var(--cre8-color-bg-brand-hover);
      color: var(--cre8-color-content-default);
      outline: var(--cre8-border-width-none);
      border: var(--cre8-border-width-focus) var(--cre8-border-style-default) var(--cre8-color-border-active-outline);
    }
  }
}

/**
 * Select field notes
 */
.cre8-c-multi-select__field-note,
.cre8-c-multi-select__field-note-success,
.cre8-c-multi-select__field-note-error {
  flex-basis: 100%;
}`});
