(function(p,b){typeof exports=="object"&&typeof module<"u"?module.exports=b():typeof define=="function"&&define.amd?define(b):(p=typeof globalThis<"u"?globalThis:p||self,p.CheckboxFieldItem=p.CheckboxFieldItem||{},p.CheckboxFieldItem.styles=b())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ne;const p=globalThis,b=p.ShadowRoot&&(p.ShadyCSS===void 0||p.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),W=new WeakMap;let q=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(b&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=W.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&W.set(t,e))}return e}toString(){return this.cssText}};const ce=o=>new q(typeof o=="string"?o:o+"",void 0,z),he=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new q(t,o,z)},le=(o,e)=>{if(b)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=p.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},F=b?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ce(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ae,defineProperty:de,getOwnPropertyDescriptor:ue,getOwnPropertyNames:pe,getOwnPropertySymbols:fe,getPrototypeOf:$e}=Object,$=globalThis,K=$.trustedTypes,me=K?K.emptyScript:"",I=$.reactiveElementPolyfillSupport,w=(o,e)=>o,D={toAttribute(o,e){switch(e){case Boolean:o=o?me:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},J=(o,e)=>!ae(o,e),Z={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:J};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);class x extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Z){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&de(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:n}=ue(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:s,set(r){const h=s==null?void 0:s.call(this);n==null||n.call(this,r),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Z}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const e=$e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const t=this.properties,i=[...pe(t),...fe(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(F(s))}else e!==void 0&&t.push(F(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return le(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var n;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const r=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:D).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){var n,r;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const h=i.getPropertyOptions(s),c=typeof h.converter=="function"?{fromAttribute:h.converter}:((n=h.converter)==null?void 0:n.fromAttribute)!==void 0?h.converter:D;this._$Em=s,this[s]=c.fromAttribute(t,h.type)??((r=this._$Ej)==null?void 0:r.get(s))??null,this._$Em=null}}requestUpdate(e,t,i){var s;if(e!==void 0){const n=this.constructor,r=this[e];if(i??(i=n.getPropertyOptions(e)),!((i.hasChanged??J)(r,t)||i.useDefault&&i.reflect&&r===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,r??t??this[e]),n!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,r]of s){const{wrapped:h}=r,c=this[n];h!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,r,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[w("elementProperties")]=new Map,x[w("finalized")]=new Map,I==null||I({ReactiveElement:x}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=globalThis,T=S.trustedTypes,X=T?T.createPolicy("lit-html",{createHTML:o=>o}):void 0,G="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,Q="?"+m,_e=`<${Q}>`,g=document,C=()=>g.createComment(""),P=o=>o===null||typeof o!="object"&&typeof o!="function",L=Array.isArray,be=o=>L(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",j=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,A=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,ie=/"/g,se=/^(?:script|style|textarea|title)$/i,k=Symbol.for("lit-noChange"),a=Symbol.for("lit-nothing"),oe=new WeakMap,y=g.createTreeWalker(g,129);function re(o,e){if(!L(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return X!==void 0?X.createHTML(e):e}const ge=(o,e)=>{const t=o.length-1,i=[];let s,n=e===2?"<svg>":e===3?"<math>":"",r=U;for(let h=0;h<t;h++){const c=o[h];let d,u,l=-1,f=0;for(;f<c.length&&(r.lastIndex=f,u=r.exec(c),u!==null);)f=r.lastIndex,r===U?u[1]==="!--"?r=Y:u[1]!==void 0?r=ee:u[2]!==void 0?(se.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=A):u[3]!==void 0&&(r=A):r===A?u[0]===">"?(r=s??U,l=-1):u[1]===void 0?l=-2:(l=r.lastIndex-u[2].length,d=u[1],r=u[3]===void 0?A:u[3]==='"'?ie:te):r===ie||r===te?r=A:r===Y||r===ee?r=U:(r=A,s=void 0);const _=r===A&&o[h+1].startsWith("/>")?" ":"";n+=r===U?c+_e:l>=0?(i.push(d),c.slice(0,l)+G+c.slice(l)+m+_):c+m+(l===-2?h:_)}return[re(o,n+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class O{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,r=0;const h=e.length-1,c=this.parts,[d,u]=ge(e,t);if(this.el=O.createElement(d,i),y.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=y.nextNode())!==null&&c.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(const l of s.getAttributeNames())if(l.endsWith(G)){const f=u[r++],_=s.getAttribute(l).split(m),R=/([.?@])?(.*)/.exec(f);c.push({type:1,index:n,name:R[2],strings:_,ctor:R[1]==="."?ye:R[1]==="?"?ve:R[1]==="@"?xe:M}),s.removeAttribute(l)}else l.startsWith(m)&&(c.push({type:6,index:n}),s.removeAttribute(l));if(se.test(s.tagName)){const l=s.textContent.split(m),f=l.length-1;if(f>0){s.textContent=T?T.emptyScript:"";for(let _=0;_<f;_++)s.append(l[_],C()),y.nextNode(),c.push({type:2,index:++n});s.append(l[f],C())}}}else if(s.nodeType===8)if(s.data===Q)c.push({type:2,index:n});else{let l=-1;for(;(l=s.data.indexOf(m,l+1))!==-1;)c.push({type:7,index:n}),l+=m.length-1}n++}}static createElement(e,t){const i=g.createElement("template");return i.innerHTML=e,i}}function E(o,e,t=o,i){var r,h;if(e===k)return e;let s=i!==void 0?(r=t._$Co)==null?void 0:r[i]:t._$Cl;const n=P(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((h=s==null?void 0:s._$AO)==null||h.call(s,!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=E(o,s._$AS(o,e.values),s,i)),e}class Ae{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??g).importNode(t,!0);y.currentNode=s;let n=y.nextNode(),r=0,h=0,c=i[0];for(;c!==void 0;){if(r===c.index){let d;c.type===2?d=new H(n,n.nextSibling,this,e):c.type===1?d=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(d=new ke(n,this,e)),this._$AV.push(d),c=i[++h]}r!==(c==null?void 0:c.index)&&(n=y.nextNode(),r++)}return y.currentNode=g,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class H{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=a,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=E(this,e,t),P(e)?e===a||e==null||e===""?(this._$AH!==a&&this._$AR(),this._$AH=a):e!==this._$AH&&e!==k&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):be(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==a&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(g.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=O.createElement(re(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(t);else{const r=new Ae(s,this),h=r.u(this.options);r.p(t),this.T(h),this._$AH=r}}_$AC(e){let t=oe.get(e.strings);return t===void 0&&oe.set(e.strings,t=new O(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const n of e)s===t.length?t.push(i=new H(this.O(C()),this.O(C()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,n){this.type=1,this._$AH=a,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=a}_$AI(e,t=this,i,s){const n=this.strings;let r=!1;if(n===void 0)e=E(this,e,t,0),r=!P(e)||e!==this._$AH&&e!==k,r&&(this._$AH=e);else{const h=e;let c,d;for(e=n[0],c=0;c<n.length-1;c++)d=E(this,h[i+c],t,c),d===k&&(d=this._$AH[c]),r||(r=!P(d)||d!==this._$AH[c]),d===a?e=a:e!==a&&(e+=(d??"")+n[c+1]),this._$AH[c]=d}r&&!s&&this.j(e)}j(e){e===a?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ye extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===a?void 0:e}}class ve extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==a)}}class xe extends M{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){if((e=E(this,e,t,0)??a)===k)return;const i=this._$AH,s=e===a&&i!==a||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==a&&(i===a||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class ke{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){E(this,e)}}const B=S.litHtmlPolyfillSupport;B==null||B(O,H),(S.litHtmlVersions??(S.litHtmlVersions=[])).push("3.3.0");const Ee=(o,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const n=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new H(e.insertBefore(C(),n),n,void 0,t??{})}return s._$AI(o),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=globalThis;class N extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ee(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return k}}N._$litElement$=!0,N.finalized=!0,(ne=v.litElementHydrateSupport)==null||ne.call(v,{LitElement:N});const V=v.litElementPolyfillSupport;return V==null||V({LitElement:N}),(v.litElementVersions??(v.litElementVersions=[])).push("4.2.0"),he`
@import '../../design-tokens/core/scss/theming/component.scss';
@import '../../design-tokens/core/scss/theming/visibility.scss';

/*------------------------------------*\
 #CHECKBOX-FIELD-ITEM
\*------------------------------------*/

:host {
  display: inline-flex;
  flex-wrap: wrap;
}

/** 
 * 1) Form field that is composed of a checkbox input, label, and an optional field note.
 */
.cre8-c-checkbox-field-item {
  display: flex;
  position: relative;
  align-items: center;
  margin-bottom: calc(var(--size-base-unit) * 1);
  min-height: calc(var(--size-base-unit) * 3);

  /** 
  * Checkbox field item within last cre8-checkbox-field-item wrapper in a fieldset
  * 1) Remove margin bottom on last item
  */
  :host(:last-child) & {
    margin-bottom: 0; /* 1 */
  }
}

/** 
 * Checkbox field item input 
 */
.cre8-c-checkbox-field-item__input {
  opacity: 0;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(var(--size-base-unit) * 3);
  min-width: calc(var(--size-base-unit) * 3);
  margin: 0;
  z-index: 1;

  /** 
 * Checkbox field item input error
 */
  .cre8-c-checkbox-field-item--disabled & {
    cursor: not-allowed;
  }
}

/** 
 * Checkbox field item custom checkbox container
 */
.cre8-c-checkbox-field-item__custom-checkbox {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  height: calc(var(--size-base-unit) * 3);
  width: calc(var(--size-base-unit) * 3);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border-radius: var(--cre8-border-radius-small);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  background-color: var(--cre8-color-bg-default);
  border-color: var(--cre8-color-border-strong);

  /** 
  * Checkbox field item custom checkbox focus visible  custom outline
  */
  .cre8-c-checkbox-field-item__input:focus-visible + & {
    @include focus;

    .cre8-c-checkbox-field-item--error & {
      @include focusError;
    }
  }

  /** 
  * Checkbox field item custom checkbox within checkbox field with error
  */
  .cre8-c-checkbox-field-item--error & {
    background-color: var(--cre8-color-bg-default);
    border-color: var(--cre8-color-border-error);
  }

  /** 
  * Checkbox field item custom checkbox within checkbox field with disabled
  */
  .cre8-c-checkbox-field-item--disabled & {
    cursor: not-allowed;
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
  }
}

/**
  * Checkbox field item custom checkbox when item is checked
  */
.cre8-c-checkbox-field-item__input:checked + .cre8-c-checkbox-field-item__custom-checkbox {
  background-color: var(--cre8-color-bg-brand-strong);

  /** 
  * Checkbox field item custom checkbox when item is checked with error
  */
  .cre8-c-checkbox-field-item--error & {
    background-color: var(--cre8-color-bg-default);
  }

  /** 
  * Checkbox field item custom checkbox when item is checked with disabled
  */
  .cre8-c-checkbox-field-item--disabled & {
    background-color: var(--cre8-color-bg-disabled);
  }
}

/** 
 * Checkbox field item checkmark icon
 */
.cre8-c-checkbox-field-item__icon {
  display: none;
  color: var(--cre8-color-content-knockout);

  /** 
  * Checkbox field item icon within checkbox field with error
  */
  .cre8-c-checkbox-field-item--error & {
    color: var(--cre8-color-content-error);
  }

  /** 
  * Checkbox field item icon within checkbox field disabled
  */
  .cre8-c-checkbox-field-item--disabled & {
    color: var(--cre8-color-content-disabled);
  }

  /**
  * Checkbox field item icon will display in the box if the input is checked
  */
  .cre8-c-checkbox-field-item__input:checked + .cre8-c-checkbox-field-item__custom-checkbox & {
    display: flex;
  }
}

/** 
 * Checkbox field item input 
 */
.cre8-c-checkbox-field-item__label {
  margin-left: calc(var(--size-base-unit) * 4);
  @include cre8-typography-label-small;
}

/** 
 * Checkbox field item field notes
 */
.cre8-c-checkbox-field-item__field-note,
.cre8-c-checkbox-field-item__field-note-success,
.cre8-c-checkbox-field-item__field-note-error {
  flex-basis: 100%;
}`});
