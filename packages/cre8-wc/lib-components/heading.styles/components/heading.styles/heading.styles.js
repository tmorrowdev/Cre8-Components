(function(u,m){typeof exports=="object"&&typeof module<"u"?module.exports=m():typeof define=="function"&&define.amd?define(m):(u=typeof globalThis<"u"?globalThis:u||self,u.Heading=u.Heading||{},u.Heading.styles=m())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var oe;const u=globalThis,m=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),W=new WeakMap;let q=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(m&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=W.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&W.set(t,e))}return e}toString(){return this.cssText}};const ae=r=>new q(typeof r=="string"?r:r+"",void 0,D),he=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1],r[0]);return new q(t,r,D)},le=(r,e)=>{if(m)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=u.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)}},J=m?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ae(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ce,defineProperty:de,getOwnPropertyDescriptor:pe,getOwnPropertyNames:ue,getOwnPropertySymbols:$e,getPrototypeOf:ge}=Object,g=globalThis,K=g.trustedTypes,fe=K?K.emptyScript:"",L=g.reactiveElementPolyfillSupport,H=(r,e)=>r,z={toAttribute(r,e){switch(e){case Boolean:r=r?fe:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Z=(r,e)=>!ce(r,e),F={attribute:!0,type:String,converter:z,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);class b extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=F){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&de(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=pe(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){const h=s==null?void 0:s.call(this);o==null||o.call(this,n),this.requestUpdate(e,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??F}static _$Ei(){if(this.hasOwnProperty(H("elementProperties")))return;const e=ge(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(H("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(H("properties"))){const t=this.properties,i=[...ue(t),...$e(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(J(s))}else e!==void 0&&t.push(J(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return le(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:z).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){var o,n;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const h=i.getPropertyOptions(s),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((o=h.converter)==null?void 0:o.fromAttribute)!==void 0?h.converter:z;this._$Em=s,this[s]=a.fromAttribute(t,h.type)??((n=this._$Ej)==null?void 0:n.get(s))??null,this._$Em=null}}requestUpdate(e,t,i){var s;if(e!==void 0){const o=this.constructor,n=this[e];if(i??(i=o.getPropertyOptions(e)),!((i.hasChanged??Z)(n,t)||i.useDefault&&i.reflect&&n===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,n]of s){const{wrapped:h}=n,a=this[o];h!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[H("elementProperties")]=new Map,b[H("finalized")]=new Map,L==null||L({ReactiveElement:b}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,M=C.trustedTypes,G=M?M.createPolicy("lit-html",{createHTML:r=>r}):void 0,Q="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+f,_e=`<${X}>`,y=document,x=()=>y.createComment(""),P=r=>r===null||typeof r!="object"&&typeof r!="function",j=Array.isArray,me=r=>j(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",B=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,A=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,ie=/"/g,se=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),re=new WeakMap,v=y.createTreeWalker(y,129);function ne(r,e){if(!j(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(e):e}const ye=(r,e)=>{const t=r.length-1,i=[];let s,o=e===2?"<svg>":e===3?"<math>":"",n=U;for(let h=0;h<t;h++){const a=r[h];let d,p,l=-1,$=0;for(;$<a.length&&(n.lastIndex=$,p=n.exec(a),p!==null);)$=n.lastIndex,n===U?p[1]==="!--"?n=Y:p[1]!==void 0?n=ee:p[2]!==void 0?(se.test(p[2])&&(s=RegExp("</"+p[2],"g")),n=A):p[3]!==void 0&&(n=A):n===A?p[0]===">"?(n=s??U,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?A:p[3]==='"'?ie:te):n===ie||n===te?n=A:n===Y||n===ee?n=U:(n=A,s=void 0);const _=n===A&&r[h+1].startsWith("/>")?" ":"";o+=n===U?a+_e:l>=0?(i.push(d),a.slice(0,l)+Q+a.slice(l)+f+_):a+f+(l===-2?h:_)}return[ne(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class O{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const h=e.length-1,a=this.parts,[d,p]=ye(e,t);if(this.el=O.createElement(d,i),v.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=v.nextNode())!==null&&a.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(const l of s.getAttributeNames())if(l.endsWith(Q)){const $=p[n++],_=s.getAttribute(l).split(f),k=/([.?@])?(.*)/.exec($);a.push({type:1,index:o,name:k[2],strings:_,ctor:k[1]==="."?ve:k[1]==="?"?Ee:k[1]==="@"?be:N}),s.removeAttribute(l)}else l.startsWith(f)&&(a.push({type:6,index:o}),s.removeAttribute(l));if(se.test(s.tagName)){const l=s.textContent.split(f),$=l.length-1;if($>0){s.textContent=M?M.emptyScript:"";for(let _=0;_<$;_++)s.append(l[_],x()),v.nextNode(),a.push({type:2,index:++o});s.append(l[$],x())}}}else if(s.nodeType===8)if(s.data===X)a.push({type:2,index:o});else{let l=-1;for(;(l=s.data.indexOf(f,l+1))!==-1;)a.push({type:7,index:o}),l+=f.length-1}o++}}static createElement(e,t){const i=y.createElement("template");return i.innerHTML=e,i}}function w(r,e,t=r,i){var n,h;if(e===S)return e;let s=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const o=P(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((h=s==null?void 0:s._$AO)==null||h.call(s,!1),o===void 0?s=void 0:(s=new o(r),s._$AT(r,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=w(r,s._$AS(r,e.values),s,i)),e}class Ae{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??y).importNode(t,!0);v.currentNode=s;let o=v.nextNode(),n=0,h=0,a=i[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new T(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Se(o,this,e)),this._$AV.push(d),a=i[++h]}n!==(a==null?void 0:a.index)&&(o=v.nextNode(),n++)}return v.currentNode=y,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class T{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),P(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):me(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(y.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=O.createElement(ne(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(t);else{const n=new Ae(s,this),h=n.u(this.options);n.p(t),this.T(h),this._$AH=n}}_$AC(e){let t=re.get(e.strings);return t===void 0&&re.set(e.strings,t=new O(e)),t}k(e){j(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new T(this.O(x()),this.O(x()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(o===void 0)e=w(this,e,t,0),n=!P(e)||e!==this._$AH&&e!==S,n&&(this._$AH=e);else{const h=e;let a,d;for(e=o[0],a=0;a<o.length-1;a++)d=w(this,h[i+a],t,a),d===S&&(d=this._$AH[a]),n||(n=!P(d)||d!==this._$AH[a]),d===c?e=c:e!==c&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!s&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ve extends N{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class Ee extends N{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class be extends N{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??c)===S)return;const i=this._$AH,s=e===c&&i!==c||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const I=C.litHtmlPolyfillSupport;I==null||I(O,T),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.3.0");const we=(r,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const o=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new T(e.insertBefore(x(),o),o,void 0,t??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=globalThis;class R extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}}R._$litElement$=!0,R.finalized=!0,(oe=E.litElementHydrateSupport)==null||oe.call(E,{LitElement:R});const V=E.litElementPolyfillSupport;return V==null||V({LitElement:R}),(E.litElementVersions??(E.litElementVersions=[])).push("4.2.0"),he`@import '../../design-tokens/core/scss/theming/component';


:host {
  display: inline;
  text-align: left;
}
/**
 * DefaultHeading component styling/Heading title-large
 */
.cre8-c-heading,
.cre8-c-heading--title-large {
  @include cre8-typography-title-large;
  margin: 0;
  color: var(--cre8-color-content-default);
}

/**
 * Heading with theme headline-large preset applied
 */
.cre8-c-heading--headline-large {
  @include cre8-typography-headline-large;
}

/**
 * Heading with theme headline-default preset applied
 */
.cre8-c-heading--headline-default {
  @include cre8-typography-headline-default;
}

/**
 * Heading with theme headline-small preset applied
 */
.cre8-c-heading--headline-small {
  @include cre8-typography-headline-small;
}

/**
 * Heading with theme title-xlarge preset applied
 */
.cre8-c-heading--title-xlarge {
  @include cre8-typography-title-xlarge;
}

/**
 * Heading with theme title-large preset applied
 */
.cre8-c-heading--title-large {
  @include cre8-typography-title-large;
}

/**
 * Heading with theme title-default preset applied
 */
.cre8-c-heading--title-default {
  @include cre8-typography-title-default;
}

/**
 * Heading with theme title-small preset applied
 */
.cre8-c-heading--title-small {
  @include cre8-typography-title-small;
}
/**
 * Heading with theme display-small preset applied
 */
.cre8-c-heading--display-small {
  @include cre8-typography-display-small;
}

/**
 * Heading with theme display-default preset applied
 */
.cre8-c-heading--display-default {
  @include cre8-typography-display-default;
}

/**
 * Heading with theme label-large preset applied
 */
.cre8-c-heading--label-large {
  @include cre8-typography-label-large;
}

/**
 * Heading with theme label-default preset applied
 */
.cre8-c-heading--label-default {
  @include cre8-typography-label-default;
}

/**
 * Heading with theme label-small preset applied
 */
.cre8-c-heading--label-small {
  @include cre8-typography-label-small;
}

/**
 * Heading with theme meta-default preset applied
 */
.cre8-c-heading--meta-large {
  @include cre8-typography-meta-large;
  text-transform: uppercase;
}

/**
 * Heading with theme meta-default preset applied
 */
.cre8-c-heading--meta-default {
  @include cre8-typography-meta-default;
  text-transform: uppercase;
}

/**
 * Heading with theme meta-small preset applied
 */
.cre8-c-heading--meta-small {
  @include cre8-typography-meta-small;
  text-transform: uppercase;
}

/**
 * Heading with brand color applied
 */
.cre8-c-heading--brand-color {
  color: var(--cre8-color-content-brand-strong);
  &.cre8-c-heading--inverted {
    color: var(--cre8-color-content-brand-knockout);
  }
}

.cre8-c-heading--inverted {
  color: var(--cre8-color-content-knockout);
}
`});
