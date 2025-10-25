(function(p,v){typeof exports=="object"&&typeof module<"u"?module.exports=v():typeof define=="function"&&define.amd?define(v):(p=typeof globalThis<"u"?globalThis:p||self,p.InlineAlert=p.InlineAlert||{},p.InlineAlert.styles=v())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var oe;const p=globalThis,v=p.ShadowRoot&&(p.ShadyCSS===void 0||p.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,k=Symbol(),V=new WeakMap;let q=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==k)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(v&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=V.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&V.set(t,e))}return e}toString(){return this.cssText}};const ae=s=>new q(typeof s=="string"?s:s+"",void 0,k),le=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((r,i,o)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+s[o+1],s[0]);return new q(t,s,k)},ce=(s,e)=>{if(v)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),i=p.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=t.cssText,s.appendChild(r)}},F=v?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return ae(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:he,defineProperty:de,getOwnPropertyDescriptor:ue,getOwnPropertyNames:pe,getOwnPropertySymbols:$e,getPrototypeOf:fe}=Object,f=globalThis,J=f.trustedTypes,_e=J?J.emptyScript:"",z=f.reactiveElementPolyfillSupport,C=(s,e)=>s,D={toAttribute(s,e){switch(e){case Boolean:s=s?_e:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},K=(s,e)=>!he(s,e),Z={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Z){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(e,r,t);i!==void 0&&de(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){const{get:i,set:o}=ue(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){const l=i==null?void 0:i.call(this);o==null||o.call(this,n),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Z}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=fe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,r=[...pe(t),...$e(t)];for(const i of r)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,i]of t)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const i=this._$Eu(t,r);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const i of r)t.unshift(F(i))}else e!==void 0&&t.push(F(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){var o;const r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){const n=(((o=r.converter)==null?void 0:o.toAttribute)!==void 0?r.converter:D).toAttribute(t,r.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){var o,n;const r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=r.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((o=l.converter)==null?void 0:o.fromAttribute)!==void 0?l.converter:D;this._$Em=i,this[i]=a.fromAttribute(t,l.type)??((n=this._$Ej)==null?void 0:n.get(i))??null,this._$Em=null}}requestUpdate(e,t,r){var i;if(e!==void 0){const o=this.constructor,n=this[e];if(r??(r=o.getPropertyOptions(e)),!((r.hasChanged??K)(n,t)||r.useDefault&&r.reflect&&n===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(o._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:o},n){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i){const{wrapped:l}=n,a=this[o];l!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var i;return(i=r.hostUpdated)==null?void 0:i.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[C("elementProperties")]=new Map,E[C("finalized")]=new Map,z==null||z({ReactiveElement:E}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,I=P.trustedTypes,G=I?I.createPolicy("lit-html",{createHTML:s=>s}):void 0,Q="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+_,ge=`<${X}>`,A=document,x=()=>A.createComment(""),U=s=>s===null||typeof s!="object"&&typeof s!="function",L=Array.isArray,ve=s=>L(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",j=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,y=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,re=/"/g,ie=/^(?:script|style|textarea|title)$/i,w=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),se=new WeakMap,m=A.createTreeWalker(A,129);function ne(s,e){if(!L(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const Ae=(s,e)=>{const t=s.length-1,r=[];let i,o=e===2?"<svg>":e===3?"<math>":"",n=O;for(let l=0;l<t;l++){const a=s[l];let d,u,c=-1,$=0;for(;$<a.length&&(n.lastIndex=$,u=n.exec(a),u!==null);)$=n.lastIndex,n===O?u[1]==="!--"?n=Y:u[1]!==void 0?n=ee:u[2]!==void 0?(ie.test(u[2])&&(i=RegExp("</"+u[2],"g")),n=y):u[3]!==void 0&&(n=y):n===y?u[0]===">"?(n=i??O,c=-1):u[1]===void 0?c=-2:(c=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?y:u[3]==='"'?re:te):n===re||n===te?n=y:n===Y||n===ee?n=O:(n=y,i=void 0);const g=n===y&&s[l+1].startsWith("/>")?" ":"";o+=n===O?a+ge:c>=0?(r.push(d),a.slice(0,c)+Q+a.slice(c)+_+g):a+_+(c===-2?l:g)}return[ne(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class H{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let o=0,n=0;const l=e.length-1,a=this.parts,[d,u]=Ae(e,t);if(this.el=H.createElement(d,r),m.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=m.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(Q)){const $=u[n++],g=i.getAttribute(c).split(_),R=/([.?@])?(.*)/.exec($);a.push({type:1,index:o,name:R[2],strings:g,ctor:R[1]==="."?me:R[1]==="?"?be:R[1]==="@"?Ee:M}),i.removeAttribute(c)}else c.startsWith(_)&&(a.push({type:6,index:o}),i.removeAttribute(c));if(ie.test(i.tagName)){const c=i.textContent.split(_),$=c.length-1;if($>0){i.textContent=I?I.emptyScript:"";for(let g=0;g<$;g++)i.append(c[g],x()),m.nextNode(),a.push({type:2,index:++o});i.append(c[$],x())}}}else if(i.nodeType===8)if(i.data===X)a.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf(_,c+1))!==-1;)a.push({type:7,index:o}),c+=_.length-1}o++}}static createElement(e,t){const r=A.createElement("template");return r.innerHTML=e,r}}function S(s,e,t=s,r){var n,l;if(e===w)return e;let i=r!==void 0?(n=t._$Co)==null?void 0:n[r]:t._$Cl;const o=U(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),o===void 0?i=void 0:(i=new o(s),i._$AT(s,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=i:t._$Cl=i),i!==void 0&&(e=S(s,i._$AS(s,e.values),i,r)),e}class ye{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,i=((e==null?void 0:e.creationScope)??A).importNode(t,!0);m.currentNode=i;let o=m.nextNode(),n=0,l=0,a=r[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new T(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new we(o,this,e)),this._$AV.push(d),a=r[++l]}n!==(a==null?void 0:a.index)&&(o=m.nextNode(),n++)}return m.currentNode=A,i}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class T{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),U(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ve(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=H.createElement(ne(r.h,r.h[0]),this.options)),r);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(t);else{const n=new ye(i,this),l=n.u(this.options);n.p(t),this.T(l),this._$AH=n}}_$AC(e){let t=se.get(e.strings);return t===void 0&&se.set(e.strings,t=new H(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const o of e)i===t.length?t.push(r=new T(this.O(x()),this.O(x()),this,this.options)):r=t[i],r._$AI(o),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(e,t=this,r,i){const o=this.strings;let n=!1;if(o===void 0)e=S(this,e,t,0),n=!U(e)||e!==this._$AH&&e!==w,n&&(this._$AH=e);else{const l=e;let a,d;for(e=o[0],a=0;a<o.length-1;a++)d=S(this,l[r+a],t,a),d===w&&(d=this._$AH[a]),n||(n=!U(d)||d!==this._$AH[a]),d===h?e=h:e!==h&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!i&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class me extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class be extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Ee extends M{constructor(e,t,r,i,o){super(e,t,r,i,o),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??h)===w)return;const r=this._$AH,i=e===h&&r!==h||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==h&&(r===h||i);i&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class we{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const B=P.litHtmlPolyfillSupport;B==null||B(H,T),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.0");const Se=(s,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let i=r._$litPart$;if(i===void 0){const o=(t==null?void 0:t.renderBefore)??null;r._$litPart$=i=new T(e.insertBefore(x(),o),o,void 0,t??{})}return i._$AI(s),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class N extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Se(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return w}}N._$litElement$=!0,N.finalized=!0,(oe=b.litElementHydrateSupport)==null||oe.call(b,{LitElement:N});const W=b.litElementPolyfillSupport;return W==null||W({LitElement:N}),(b.litElementVersions??(b.litElementVersions=[])).push("4.2.0"),le`@import '../../design-tokens/core/scss/theming/component';

:host {
  display: inline-flex;
}
:host([fullWidth]) {
  display: flex;
}

/**
 * Inline alert
 */
.cre8-c-inline-alert {
  @include cre8-typography-body-default();
  font-weight: normal;
  display: inline-flex;
  align-items: flex-start;
  gap: calc(var(--size-base-unit) * 1);
  padding: calc(var(--size-base-unit) * 2);
  color: var(--cre8-color-content-default);
  background-color: var(--cre8-color-bg-info);
  border-color: var(--cre8-color-border-info);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  border-radius: var(--cre8-border-radius-default);
}

/**
 * Full-width inline alert
 */
.cre8-c-inline-alert--full-width {
  width: 100%;
}

/**
 * Inline alert with error variant
 */
.cre8-c-inline-alert--error {
  background-color: var(--cre8-color-bg-error);
  border-color: var(--cre8-color-border-error);
}

/**
 * Inline alert with warning variant
 */
.cre8-c-inline-alert--warning {
  background-color: var(--cre8-color-bg-warning);
  border-color: var(--cre8-color-border-warning);
}

/**
 * Inline alert with success variant
 */
.cre8-c-inline-alert--success {
  background-color: var(--cre8-color-bg-success);
  border-color: var(--cre8-color-border-success);
}

/**
 * Inline alert with attention variant
 */
.cre8-c-inline-alert--attention {
  background-color: var(--cre8-color-bg-attention);
  border-color: var(--cre8-color-border-attention);
}

/**
 * Inline alert with neutral variant
 */
.cre8-c-inline-alert--neutral {
  background-color: var(--cre8-color-bg-subtle);
  border-color: var(--cre8-color-border-strong);
}

/**
 * Inline alert with variant - transparent
 */
.cre8-c-inline-alert--transparent {
  padding: 0;
  border: none;
  background-color: transparent;
  gap: calc(var(--size-base-unit) * 1);
  border-radius: none;
}

/**
 * Inline alert with variant - transparent and error
 */
.cre8-c-inline-alert--transparent.cre8-c-inline-alert--error {
  color: var(--cre8-color-content-error);
}

/**
 * Inline alert with variant - transparent and success
 */
.cre8-c-inline-alert--transparent.cre8-c-inline-alert--success {
  color: var(--cre8-color-content-success);
}

/**
 * Inline alert icon
 */
.cre8-c-inline-alert__icon {
  position: relative;
  color: var(--cre8-color-content-info-icon);
  height: calc(var(--size-base-unit) * 3);
  width: calc(var(--size-base-unit) * 3);

  /**
   * Inline alert icon for error variant
   */
  .cre8-c-inline-alert--error & {
    color: var(--cre8-color-content-error-icon);
  }

  /**
   * Inline alert icon for warning variant
   */
  .cre8-c-inline-alert--warning & {
    color: var(--cre8-color-content-warning-icon);
  }

  /**
   * Inline alert icon for success variant
   */
  .cre8-c-inline-alert--success & {
    color: var(--cre8-color-content-success-icon);
  }

  /**
   * Inline alert icon for help variant
   * Inline alert icon for info variant
   */
   .cre8-c-inline-alert--help,
   .cre8-c-inline-alert--info
    & {
    color: var(--cre8-color-content-info-icon);
  }

  /**
   * Inline alert icon for attention variant
   */
  .cre8-c-inline-alert--attention & {
    color: var(--cre8-color-content-attention-icon);
  }

  /**
   * Inline alert icon for neutral variant
   */
  .cre8-c-inline-alert--neutral & {
    color: var(--cre8-color-content-default);
  }

  /**
   * Inline alert icon
   */
  .cre8-c-inline-alert--transparent & {
    top: 0;
    padding: calc(var(--size-base-unit) * 0.25);
  }
}
`});
