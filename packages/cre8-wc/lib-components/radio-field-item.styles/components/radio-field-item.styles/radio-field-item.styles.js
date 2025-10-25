(function(p,A){typeof exports=="object"&&typeof module<"u"?module.exports=A():typeof define=="function"&&define.amd?define(A):(p=typeof globalThis<"u"?globalThis:p||self,p.RadioFieldItem=p.RadioFieldItem||{},p.RadioFieldItem.styles=A())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ne;const p=globalThis,A=p.ShadowRoot&&(p.ShadyCSS===void 0||p.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),W=new WeakMap;let F=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(A&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=W.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&W.set(t,e))}return e}toString(){return this.cssText}};const ae=r=>new F(typeof r=="string"?r:r+"",void 0,z),le=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,s,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[n+1],r[0]);return new F(t,r,z)},he=(r,e)=>{if(A)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=p.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)}},q=A?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ae(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ce,defineProperty:de,getOwnPropertyDescriptor:ue,getOwnPropertyNames:pe,getOwnPropertySymbols:fe,getPrototypeOf:$e}=Object,$=globalThis,J=$.trustedTypes,_e=J?J.emptyScript:"",I=$.reactiveElementPolyfillSupport,C=(r,e)=>r,D={toAttribute(r,e){switch(e){case Boolean:r=r?_e:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},K=(r,e)=>!ce(r,e),Z={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Z){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&de(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:n}=ue(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){const l=s==null?void 0:s.call(this);n==null||n.call(this,o),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Z}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=$e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,i=[...pe(t),...fe(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(q(s))}else e!==void 0&&t.push(q(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return he(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var n;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const o=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:D).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){var n,o;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:D;this._$Em=s,this[s]=a.fromAttribute(t,l.type)??((o=this._$Ej)==null?void 0:o.get(s))??null,this._$Em=null}}requestUpdate(e,t,i){var s;if(e!==void 0){const n=this.constructor,o=this[e];if(i??(i=n.getPropertyOptions(e)),!((i.hasChanged??K)(o,t)||i.useDefault&&i.reflect&&o===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s){const{wrapped:l}=o,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[C("elementProperties")]=new Map,E[C("finalized")]=new Map,I==null||I({ReactiveElement:E}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,T=P.trustedTypes,G=T?T.createPolicy("lit-html",{createHTML:r=>r}):void 0,Q="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+_,me=`<${X}>`,g=document,x=()=>g.createComment(""),R=r=>r===null||typeof r!="object"&&typeof r!="function",L=Array.isArray,Ae=r=>L(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",j=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,y=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,ie=/"/g,se=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),re=new WeakMap,b=g.createTreeWalker(g,129);function oe(r,e){if(!L(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const ge=(r,e)=>{const t=r.length-1,i=[];let s,n=e===2?"<svg>":e===3?"<math>":"",o=U;for(let l=0;l<t;l++){const a=r[l];let d,u,h=-1,f=0;for(;f<a.length&&(o.lastIndex=f,u=o.exec(a),u!==null);)f=o.lastIndex,o===U?u[1]==="!--"?o=Y:u[1]!==void 0?o=ee:u[2]!==void 0?(se.test(u[2])&&(s=RegExp("</"+u[2],"g")),o=y):u[3]!==void 0&&(o=y):o===y?u[0]===">"?(o=s??U,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?y:u[3]==='"'?ie:te):o===ie||o===te?o=y:o===Y||o===ee?o=U:(o=y,s=void 0);const m=o===y&&r[l+1].startsWith("/>")?" ":"";n+=o===U?a+me:h>=0?(i.push(d),a.slice(0,h)+Q+a.slice(h)+_+m):a+_+(h===-2?l:m)}return[oe(r,n+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class O{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,o=0;const l=e.length-1,a=this.parts,[d,u]=ge(e,t);if(this.el=O.createElement(d,i),b.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=b.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(Q)){const f=u[o++],m=s.getAttribute(h).split(_),k=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:k[2],strings:m,ctor:k[1]==="."?be:k[1]==="?"?ve:k[1]==="@"?Ee:M}),s.removeAttribute(h)}else h.startsWith(_)&&(a.push({type:6,index:n}),s.removeAttribute(h));if(se.test(s.tagName)){const h=s.textContent.split(_),f=h.length-1;if(f>0){s.textContent=T?T.emptyScript:"";for(let m=0;m<f;m++)s.append(h[m],x()),b.nextNode(),a.push({type:2,index:++n});s.append(h[f],x())}}}else if(s.nodeType===8)if(s.data===X)a.push({type:2,index:n});else{let h=-1;for(;(h=s.data.indexOf(_,h+1))!==-1;)a.push({type:7,index:n}),h+=_.length-1}n++}}static createElement(e,t){const i=g.createElement("template");return i.innerHTML=e,i}}function w(r,e,t=r,i){var o,l;if(e===S)return e;let s=i!==void 0?(o=t._$Co)==null?void 0:o[i]:t._$Cl;const n=R(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),n===void 0?s=void 0:(s=new n(r),s._$AT(r,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=w(r,s._$AS(r,e.values),s,i)),e}class ye{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??g).importNode(t,!0);b.currentNode=s;let n=b.nextNode(),o=0,l=0,a=i[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new H(n,n.nextSibling,this,e):a.type===1?d=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(d=new Se(n,this,e)),this._$AV.push(d),a=i[++l]}o!==(a==null?void 0:a.index)&&(n=b.nextNode(),o++)}return b.currentNode=g,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class H{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),R(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ae(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&R(this._$AH)?this._$AA.nextSibling.data=e:this.T(g.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=O.createElement(oe(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(t);else{const o=new ye(s,this),l=o.u(this.options);o.p(t),this.T(l),this._$AH=o}}_$AC(e){let t=re.get(e.strings);return t===void 0&&re.set(e.strings,t=new O(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const n of e)s===t.length?t.push(i=new H(this.O(x()),this.O(x()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(e,t=this,i,s){const n=this.strings;let o=!1;if(n===void 0)e=w(this,e,t,0),o=!R(e)||e!==this._$AH&&e!==S,o&&(this._$AH=e);else{const l=e;let a,d;for(e=n[0],a=0;a<n.length-1;a++)d=w(this,l[i+a],t,a),d===S&&(d=this._$AH[a]),o||(o=!R(d)||d!==this._$AH[a]),d===c?e=c:e!==c&&(e+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!s&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class be extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class ve extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class Ee extends M{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??c)===S)return;const i=this._$AH,s=e===c&&i!==c||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const B=P.litHtmlPolyfillSupport;B==null||B(O,H),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.0");const we=(r,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const n=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new H(e.insertBefore(x(),n),n,void 0,t??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=globalThis;class N extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}}N._$litElement$=!0,N.finalized=!0,(ne=v.litElementHydrateSupport)==null||ne.call(v,{LitElement:N});const V=v.litElementPolyfillSupport;return V==null||V({LitElement:N}),(v.litElementVersions??(v.litElementVersions=[])).push("4.2.0"),le`@import '../../design-tokens/core/scss/theming/component.scss';
/*------------------------------------*\
 #RADIO-FIELD-ITEM
\*------------------------------------*/

:host {
  display: inline-flex;
}

/** 
 * 1) Form field that is compose of a radio input, label, and optional fieldnote.
 */
.cre8-c-radio-field-item {
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: calc(var(--size-base-unit) * 1);
  min-height: calc(var(--size-base-unit) * 3);

  /** 
  * 1) Form field that is compose of a radio input, label, and optional fieldnote.
  */
  :host(:last-child) & {
    margin-bottom: 0;
  }
}

/** 
* Radio field item input 
*/
.cre8-c-radio-field-item__input {
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(var(--size-base-unit) * 3);
  min-width: calc(var(--size-base-unit) * 3);
  margin: 0;
  z-index: 1;

  .cre8-c-radio-field-item--disabled & {
    cursor: not-allowed;
  }
}

/** 
* Radio field item custom radio container
*/
.cre8-c-radio-field-item__custom-radio {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(var(--size-base-unit) * 3);
  width: calc(var(--size-base-unit) * 3);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: var(--cre8-border-radius-round);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  background-color: var(--cre8-color-bg-default);
  border-color: var(--cre8-color-border-strong);

  /** 
  * Radio field item custom radio focus visible  custom outline
  */
  .cre8-c-radio-field-item__input:focus-visible + & {
    @include focus;

    .cre8-c-radio-field-item--error & {
      @include focusError;
      border-color: var(--cre8-color-border-error);
    }
  }

  /** 
  * Radio field item custom radio within radio field with error
  */
  .cre8-c-radio-field-item--error & {
    border-color: var(--cre8-color-border-error);
  }

  /** 
  * Radio field item custom radio within radio field disabled
  */
  .cre8-c-radio-field-item--disabled & {
    cursor: not-allowed;
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
  }
}

/** 
 * Radio field item inner circle
 */
.cre8-c-radio-field-item__inner-circle {
  display: none;

  cursor: pointer;
  height: calc(var(--size-base-unit) * 1.5);
  width: calc(var(--size-base-unit) * 1.5);
  background: var(--cre8-color-content-brand);
  border-radius: var(--cre8-border-radius-round);

  /** 
  * Radio field item inner circle error
  */
  .cre8-c-radio-field-item--error & {
    background: var(--cre8-color-bg-error-strong);
  }

  /** 
  * Radio field item inner circle disabled
  */
  .cre8-c-radio-field-item--disabled & {
    background: var(--cre8-color-content-disabled);
  }

  /** 
 * Radio field item inner circle will display if the input is checked
 */
  .cre8-c-radio-field-item__input:checked + .cre8-c-radio-field-item__custom-radio & {
    display: flex;
  }
}

/** 
 * Radio field item input 
 */
.cre8-c-radio-field-item__label {
  margin-left: calc(var(--size-base-unit) * 4);
  @include cre8-typography-label-small;
}
`});
