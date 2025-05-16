/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function e(e,t,i,o){var r,s=arguments.length,n=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(n=(s<3?r(n):s>3?r(t,i,n):r(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;let s=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const n=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1]),e[0]);return new s(i,e,o)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,o))(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const c=window,d=c.trustedTypes,p=d?d.emptyScript:"",v=c.reactiveElementPolyfillSupport,h={toAttribute(e,t){switch(t){case Boolean:e=e?p:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},g=(e,t)=>t!==e&&(t==t||e==e),u={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:g},f="finalized";let m=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const o=this._$Ep(i,t);void 0!==o&&(this._$Ev.set(o,i),e.push(o))})),e}static createProperty(e,t=u){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const r=this[e];this[t]=o,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||u}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const o=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,o)=>{i?e.adoptedStyleSheets=o.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):o.forEach((i=>{const o=document.createElement("style"),r=t.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=i.cssText,e.appendChild(o)}))})(o,this.constructor.elementStyles),o}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=u){var o;const r=this.constructor._$Ep(e,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:h).toAttribute(t,i.type);this._$El=e,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,r=o._$Ev.get(e);if(void 0!==r&&this._$El!==r){const e=o.getPropertyOptions(r),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:h;this._$El=r,this[r]=s.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||g)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var w;m[f]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==v||v({ReactiveElement:m}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const k=window,b=k.trustedTypes,x=b?b.createPolicy("lit-html",{createHTML:e=>e}):void 0,y="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,_="?"+$,A=`<${_}>`,C=document,j=()=>C.createComment(""),S=e=>null===e||"object"!=typeof e&&"function"!=typeof e,E=Array.isArray,z="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,P=/>/g,T=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,B=/"/g,D=/^(?:script|style|textarea|title)$/i,L=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),O=Symbol.for("lit-noChange"),R=Symbol.for("lit-nothing"),I=new WeakMap,N=C.createTreeWalker(C,129,null,!1);function W(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(t):t}const V=(e,t)=>{const i=e.length-1,o=[];let r,s=2===t?"<svg>":"",n=M;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===M?"!--"===l[1]?n=H:void 0!==l[1]?n=P:void 0!==l[2]?(D.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=T):void 0!==l[3]&&(n=T):n===T?">"===l[0]?(n=null!=r?r:M,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?T:'"'===l[3]?B:U):n===B||n===U?n=T:n===H||n===P?n=M:(n=T,r=void 0);const p=n===T&&e[t+1].startsWith("/>")?" ":"";s+=n===M?i+A:c>=0?(o.push(a),i.slice(0,c)+y+i.slice(c)+$+p):i+$+(-2===c?(o.push(void 0),t):p)}return[W(e,s+(e[i]||"<?>")+(2===t?"</svg>":"")),o]};class F{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,s=0;const n=e.length-1,a=this.parts,[l,c]=V(e,t);if(this.el=F.createElement(l,i),N.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(o=N.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes()){const e=[];for(const t of o.getAttributeNames())if(t.endsWith(y)||t.startsWith($)){const i=c[s++];if(e.push(t),void 0!==i){const e=o.getAttribute(i.toLowerCase()+y).split($),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:r,name:t[2],strings:e,ctor:"."===t[1]?J:"?"===t[1]?Z:"@"===t[1]?K:Y})}else a.push({type:6,index:r})}for(const t of e)o.removeAttribute(t)}if(D.test(o.tagName)){const e=o.textContent.split($),t=e.length-1;if(t>0){o.textContent=b?b.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],j()),N.nextNode(),a.push({type:2,index:++r});o.append(e[t],j())}}}else if(8===o.nodeType)if(o.data===_)a.push({type:2,index:r});else{let e=-1;for(;-1!==(e=o.data.indexOf($,e+1));)a.push({type:7,index:r}),e+=$.length-1}r++}}static createElement(e,t){const i=C.createElement("template");return i.innerHTML=e,i}}function G(e,t,i=e,o){var r,s,n,a;if(t===O)return t;let l=void 0!==o?null===(r=i._$Co)||void 0===r?void 0:r[o]:i._$Cl;const c=S(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,o)),void 0!==o?(null!==(n=(a=i)._$Co)&&void 0!==n?n:a._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(t=G(e,l._$AS(e,t.values),l,o)),t}class q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,r=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:C).importNode(i,!0);N.currentNode=r;let s=N.nextNode(),n=0,a=0,l=o[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new Q(s,s.nextSibling,this,e):1===l.type?t=new l.ctor(s,l.name,l.strings,this,e):6===l.type&&(t=new ee(s,this,e)),this._$AV.push(t),l=o[++a]}n!==(null==l?void 0:l.index)&&(s=N.nextNode(),n++)}return N.currentNode=C,r}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Q{constructor(e,t,i,o){var r;this.type=2,this._$AH=R,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=null===(r=null==o?void 0:o.isConnected)||void 0===r||r}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),S(e)?e===R||null==e||""===e?(this._$AH!==R&&this._$AR(),this._$AH=R):e!==this._$AH&&e!==O&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>E(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==R&&S(this._$AH)?this._$AA.nextSibling.data=e:this.$(C.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,r="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=F.createElement(W(o.h,o.h[0]),this.options)),o);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===r)this._$AH.v(i);else{const e=new q(r,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=I.get(e.strings);return void 0===t&&I.set(e.strings,t=new F(e)),t}T(e){E(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new Q(this.k(j()),this.k(j()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Y{constructor(e,t,i,o,r){this.type=1,this._$AH=R,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=R}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const r=this.strings;let s=!1;if(void 0===r)e=G(this,e,t,0),s=!S(e)||e!==this._$AH&&e!==O,s&&(this._$AH=e);else{const o=e;let n,a;for(e=r[0],n=0;n<r.length-1;n++)a=G(this,o[i+n],t,n),a===O&&(a=this._$AH[n]),s||(s=!S(a)||a!==this._$AH[n]),a===R?e=R:e!==R&&(e+=(null!=a?a:"")+r[n+1]),this._$AH[n]=a}s&&!o&&this.j(e)}j(e){e===R?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class J extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===R?void 0:e}}const X=b?b.emptyScript:"";class Z extends Y{constructor(){super(...arguments),this.type=4}j(e){e&&e!==R?this.element.setAttribute(this.name,X):this.element.removeAttribute(this.name)}}class K extends Y{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=G(this,e,t,0))&&void 0!==i?i:R)===O)return;const o=this._$AH,r=e===R&&o!==R||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==R&&(o===R||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ee{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const te=k.litHtmlPolyfillSupport;null==te||te(F,Q),(null!==(w=k.litHtmlVersions)&&void 0!==w?w:k.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ie,oe;class re extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var o,r;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:t;let n=s._$litPart$;if(void 0===n){const e=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;s._$litPart$=n=new Q(t.insertBefore(j(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return O}}re.finalized=!0,re._$litElement$=!0,null===(ie=globalThis.litElementHydrateSupport)||void 0===ie||ie.call(globalThis,{LitElement:re});const se=globalThis.litElementPolyfillSupport;null==se||se({LitElement:re}),(null!==(oe=globalThis.litElementVersions)&&void 0!==oe?oe:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ne=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:o}=t;return{kind:i,elements:o,finisher(t){customElements.define(e,t)}}})(e,t)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var ae;null===(ae=window.HTMLSlotElement)||void 0===ae||ae.prototype.assignedElements;let le=class extends re{render(){return L`
      <section id="about">
        <div class="about-container">
          <h2 class="section-title">About Me</h2>
          
          <div class="about-grid">
            <div class="about-content">
              <p>
                I'm a <strong>Senior Frontend Engineer</strong> at <span class="highlight">Annalect</span>, where I power Omnicom Media Group's digital experiences with modern web technologies. With a passion for creating intuitive and accessible user interfaces, I specialize in building scalable web applications that deliver exceptional user experiences.
              </p>
              
              <p>
                My journey in technology began at <span class="highlight">Emory University</span>, and I've since refined my skills through dedicated professional development. I've earned certifications in <strong>User Experience Design</strong> from General Assembly and completed various courses in frontend development technologies.
              </p>

              <p>
                I'm particularly interested in the intersection of design and code, bringing both aesthetic sensibility and technical expertise to my work. My approach is rooted in user-centered design principles, ensuring that the products I build not only function flawlessly but also delight their users.
              </p>

              <div class="skills-container">
                <div class="skill-tag">React.js</div>
                <div class="skill-tag">TypeScript</div>
                <div class="skill-tag">Web Components</div>
                <div class="skill-tag">UX Design</div>
                <div class="skill-tag">Design Systems</div>
                <div class="skill-tag">Accessibility</div>
              </div>
            </div>
            
            <div class="about-image">
              <img src="https://via.placeholder.com/500x400" alt="Tyler Morrow working on code" />
            </div>
          </div>
        </div>
      </section>
    `}};le.styles=n`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-subtle);
      color: var(--cre8-color-content-default);
      padding: var(--cre8-spacing-96) 0;
    }

    .about-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--cre8-spacing-24);
    }

    .section-title {
      font-size: var(--cre8-font-size-8);
      font-weight: var(--cre8-font-weights-bold);
      margin-bottom: var(--cre8-spacing-48);
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 80px;
      height: 4px;
      background-color: var(--accent-color);
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--cre8-spacing-48);
      align-items: center;
    }

    .about-content {
      line-height: 1.7;
    }

    .about-content p {
      margin-bottom: var(--cre8-spacing-24);
      font-size: var(--cre8-font-size-3);
      color: var(--cre8-color-content-subtle);
    }

    .about-content strong {
      color: var(--cre8-color-content-default);
      font-weight: var(--cre8-font-weights-semibold);
    }

    .about-image {
      position: relative;
    }

    .about-image img {
      width: 100%;
      border-radius: var(--cre8-border-radius-default);
      box-shadow: var(--cre8-shadow-default);
    }

    .highlight {
      color: var(--accent-color);
    }

    .skills-container {
      margin-top: var(--cre8-spacing-32);
      display: flex;
      flex-wrap: wrap;
      gap: var(--cre8-spacing-16);
    }

    .skill-tag {
      background-color: rgba(37, 99, 235, 0.1);
      color: var(--accent-color);
      padding: var(--cre8-spacing-8) var(--cre8-spacing-16);
      border-radius: var(--cre8-border-radius-default);
      font-size: var(--cre8-font-size-1);
      font-weight: var(--cre8-font-weights-medium);
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--cre8-spacing-64) 0;
      }
      
      .about-grid {
        grid-template-columns: 1fr;
      }

      .about-image {
        order: -1;
        margin-bottom: var(--cre8-spacing-32);
      }
    }
  `,le=e([ne("about-section")],le);let ce=class extends re{render(){return L`
      <section id="experience">
        <div class="experience-container">
          <h2 class="section-title">Work Experience</h2>
          
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3 class="job-title">Senior Frontend Engineer</h3>
                <div class="company">Annalect, Omnicom Media Group</div>
                <div class="period">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Present
                </div>
                <div class="responsibilities">
                  <ul>
                    <li>Lead the development of scalable web applications and digital experiences for Omnicom Media Group clients.</li>
                    <li>Architect and implement design systems using modern web technologies like Web Components and TypeScript.</li>
                    <li>Collaborate with cross-functional teams to create accessible and high-performance user interfaces.</li>
                    <li>Mentor junior developers and contribute to technical decision-making processes.</li>
                    <li>Implement best practices for code quality, testing, and documentation.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3 class="job-title">UX Designer (Certification Project)</h3>
                <div class="company">General Assembly</div>
                <div class="period">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  2017
                </div>
                <div class="responsibilities">
                  <ul>
                    <li>Completed intensive User Experience Design certification program.</li>
                    <li>Conducted user research and usability testing to inform design decisions.</li>
                    <li>Created wireframes, prototypes, and user flows for web and mobile applications.</li>
                    <li>Collaborated on a two-week project designing a mobile rewards program.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3 class="job-title">Student</h3>
                <div class="company">Emory University</div>
                <div class="period">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  2006 - 2012
                </div>
                <div class="responsibilities">
                  <ul>
                    <li>Graduated with a Bachelor's degree.</li>
                    <li>Developed a strong foundation in critical thinking and problem-solving.</li>
                    <li>Participated in technology-related extracurricular activities and projects.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `}};ce.styles=n`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-default);
      color: var(--cre8-color-content-default);
      padding: var(--cre8-spacing-96) 0;
    }

    .experience-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--cre8-spacing-24);
    }

    .section-title {
      font-size: var(--cre8-font-size-8);
      font-weight: var(--cre8-font-weights-bold);
      margin-bottom: var(--cre8-spacing-48);
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 80px;
      height: 4px;
      background-color: var(--accent-color);
    }

    .timeline {
      position: relative;
      margin-left: var(--cre8-spacing-16);
    }

    .timeline::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 2px;
      background-color: var(--cre8-color-border-default);
    }

    .timeline-item {
      position: relative;
      padding-left: var(--cre8-spacing-48);
      padding-bottom: var(--cre8-spacing-48);
    }

    .timeline-item:last-child {
      padding-bottom: 0;
    }

    .timeline-dot {
      position: absolute;
      left: -8px;
      top: 0;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: var(--accent-color);
      border: 2px solid var(--cre8-color-bg-default);
    }

    .timeline-content {
      background-color: var(--cre8-color-bg-subtle);
      border-radius: var(--cre8-border-radius-default);
      padding: var(--cre8-spacing-24);
      box-shadow: var(--cre8-shadow-default);
    }

    .job-title {
      font-size: var(--cre8-font-size-4);
      font-weight: var(--cre8-font-weights-semibold);
      margin-bottom: var(--cre8-spacing-8);
      color: var(--cre8-color-content-default);
    }

    .company {
      font-size: var(--cre8-font-size-3);
      font-weight: var(--cre8-font-weights-medium);
      margin-bottom: var(--cre8-spacing-12);
      color: var(--accent-color);
    }

    .period {
      font-size: var(--cre8-font-size-2);
      color: var(--cre8-color-content-subtle);
      margin-bottom: var(--cre8-spacing-16);
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-6);
    }

    .responsibilities {
      margin-top: var(--cre8-spacing-16);
      color: var(--cre8-color-content-subtle);
    }

    .responsibilities ul {
      list-style-type: none;
      padding-left: 0;
    }

    .responsibilities li {
      position: relative;
      padding-left: var(--cre8-spacing-24);
      margin-bottom: var(--cre8-spacing-12);
      line-height: 1.6;
    }

    .responsibilities li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 10px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--accent-color);
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--cre8-spacing-64) 0;
      }
      
      .timeline {
        margin-left: 0;
      }
      
      .timeline-item {
        padding-left: var(--cre8-spacing-32);
      }
    }
  `,ce=e([ne("experience-section")],ce);let de=class extends re{render(){return L`
      <section id="skills">
        <div class="skills-container">
          <h2 class="section-title">Skills & Expertise</h2>
          
          <div class="skill-intro">
            With a background in both engineering and design, I've developed a diverse skill set that enables me to create seamless, user-centered digital experiences. Here's a comprehensive overview of my technical proficiencies and areas of expertise.
          </div>
          
          <div class="skill-categories">
            <div class="skill-category">
              <h3 class="category-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                Frontend Development
              </h3>
              <ul class="skill-list">
                <li class="skill-item">
                  <div class="skill-name">
                    JavaScript/TypeScript
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Web Components
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    React.js
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    HTML5/CSS3
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="skill-category">
              <h3 class="category-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
                </svg>
                Design & UX
              </h3>
              <ul class="skill-list">
                <li class="skill-item">
                  <div class="skill-name">
                    User Experience Design
                    <span class="skill-level">Proficient</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress proficient"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Design Systems
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Wireframing/Prototyping
                    <span class="skill-level">Proficient</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress proficient"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    User Research
                    <span class="skill-level">Intermediate</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress intermediate"></div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="skill-category">
              <h3 class="category-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Best Practices
              </h3>
              <ul class="skill-list">
                <li class="skill-item">
                  <div class="skill-name">
                    Web Accessibility (WCAG)
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Responsive Design
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Performance Optimization
                    <span class="skill-level">Proficient</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress proficient"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Testing & Documentation
                    <span class="skill-level">Proficient</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress proficient"></div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="skill-category">
              <h3 class="category-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                Tools & Technologies
              </h3>
              <ul class="skill-list">
                <li class="skill-item">
                  <div class="skill-name">
                    Git/GitHub
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Modern Build Tools
                    <span class="skill-level">Proficient</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress proficient"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    CI/CD Pipelines
                    <span class="skill-level">Intermediate</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress intermediate"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Containerization
                    <span class="skill-level">Familiar</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress familiar"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `}};de.styles=n`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-subtle);
      color: var(--cre8-color-content-default);
      padding: var(--cre8-spacing-96) 0;
    }

    .skills-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--cre8-spacing-24);
    }

    .section-title {
      font-size: var(--cre8-font-size-8);
      font-weight: var(--cre8-font-weights-bold);
      margin-bottom: var(--cre8-spacing-48);
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 80px;
      height: 4px;
      background-color: var(--accent-color);
    }

    .skill-intro {
      max-width: 800px;
      margin-bottom: var(--cre8-spacing-48);
      font-size: var(--cre8-font-size-3);
      line-height: 1.7;
      color: var(--cre8-color-content-subtle);
    }

    .skill-categories {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--cre8-spacing-32);
    }

    .skill-category {
      background-color: var(--cre8-color-bg-default);
      border-radius: var(--cre8-border-radius-default);
      padding: var(--cre8-spacing-24);
      box-shadow: var(--cre8-shadow-default);
    }

    .category-title {
      font-size: var(--cre8-font-size-4);
      font-weight: var(--cre8-font-weights-semibold);
      margin-bottom: var(--cre8-spacing-16);
      color: var(--cre8-color-content-default);
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-12);
    }

    .category-title svg {
      color: var(--accent-color);
    }

    .skill-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .skill-item {
      margin-bottom: var(--cre8-spacing-16);
    }

    .skill-name {
      font-weight: var(--cre8-font-weights-medium);
      margin-bottom: var(--cre8-spacing-6);
      display: flex;
      justify-content: space-between;
    }

    .skill-level {
      color: var(--cre8-color-content-subtle);
      font-size: var(--cre8-font-size-1);
    }

    .skill-bar {
      height: 6px;
      background-color: var(--cre8-color-border-default);
      border-radius: var(--cre8-border-radius-round);
      overflow: hidden;
    }

    .skill-progress {
      height: 100%;
      background-color: var(--accent-color);
      border-radius: var(--cre8-border-radius-round);
    }

    .advanced { width: 90%; }
    .proficient { width: 75%; }
    .intermediate { width: 60%; }
    .familiar { width: 40%; }

    @media (max-width: 768px) {
      :host {
        padding: var(--cre8-spacing-64) 0;
      }
      
      .skill-categories {
        grid-template-columns: 1fr;
      }
    }
  `,de=e([ne("skills-section")],de);let pe=class extends re{render(){return L`
      <section id="projects">
        <div class="projects-container">
          <h2 class="section-title">Featured Projects</h2>
          
          <div class="projects-intro">
            Here's a selection of projects that showcase my skills, expertise, and the value I bring to digital experiences. Each project represents my commitment to creating intuitive, accessible, and high-performing user interfaces.
          </div>
          
          <div class="projects-grid">
            <div class="project-card">
              <div class="project-image">
                <img src="https://via.placeholder.com/350x200" alt="Design System Project" />
              </div>
              <div class="project-content">
                <div class="project-category">Design System</div>
                <h3 class="project-title">Enterprise Design System</h3>
                <p class="project-description">
                  Led the development of a comprehensive design system for Omnicom Media Group, improving consistency and development efficiency across digital properties.
                </p>
                <div class="project-tech">
                  <span class="tech-tag">Web Components</span>
                  <span class="tech-tag">TypeScript</span>
                  <span class="tech-tag">Lit</span>
                  <span class="tech-tag">Storybook</span>
                  <span class="tech-tag">Figma</span>
                </div>
                <div class="project-links">
                  <a href="#" class="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Case Study
                  </a>
                </div>
              </div>
            </div>
            
            <div class="project-card">
              <div class="project-image">
                <img src="https://via.placeholder.com/350x200" alt="Accessibility Toolkit" />
              </div>
              <div class="project-content">
                <div class="project-category">Accessibility</div>
                <h3 class="project-title">Accessibility Toolkit</h3>
                <p class="project-description">
                  Developed an internal toolkit to help teams across the organization implement accessible web experiences that meet WCAG standards.
                </p>
                <div class="project-tech">
                  <span class="tech-tag">JavaScript</span>
                  <span class="tech-tag">ARIA</span>
                  <span class="tech-tag">HTML</span>
                  <span class="tech-tag">CSS</span>
                  <span class="tech-tag">Axe</span>
                </div>
                <div class="project-links">
                  <a href="#" class="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Demo
                  </a>
                </div>
              </div>
            </div>
            
            <div class="project-card">
              <div class="project-image">
                <img src="https://via.placeholder.com/350x200" alt="Mobile App" />
              </div>
              <div class="project-content">
                <div class="project-category">Mobile UX</div>
                <h3 class="project-title">Rewards Program App</h3>
                <p class="project-description">
                  Designed and prototyped a mobile rewards program for The Battery ATL, focusing on user engagement and intuitive navigation.
                </p>
                <div class="project-tech">
                  <span class="tech-tag">React Native</span>
                  <span class="tech-tag">Figma</span>
                  <span class="tech-tag">UX Research</span>
                  <span class="tech-tag">User Testing</span>
                </div>
                <div class="project-links">
                  <a href="#" class="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Case Study
                  </a>
                </div>
              </div>
            </div>
            
            <div class="project-card">
              <div class="project-image">
                <img src="https://via.placeholder.com/350x200" alt="Web App" />
              </div>
              <div class="project-content">
                <div class="project-category">Web Application</div>
                <h3 class="project-title">Analytics Dashboard</h3>
                <p class="project-description">
                  Built a responsive analytics dashboard with advanced data visualization and real-time updates for monitoring marketing campaigns.
                </p>
                <div class="project-tech">
                  <span class="tech-tag">React</span>
                  <span class="tech-tag">TypeScript</span>
                  <span class="tech-tag">D3.js</span>
                  <span class="tech-tag">WebSockets</span>
                </div>
                <div class="project-links">
                  <a href="#" class="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub
                  </a>
                  <a href="#" class="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `}};pe.styles=n`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-default);
      color: var(--cre8-color-content-default);
      padding: var(--cre8-spacing-96) 0;
    }

    .projects-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--cre8-spacing-24);
    }

    .section-title {
      font-size: var(--cre8-font-size-8);
      font-weight: var(--cre8-font-weights-bold);
      margin-bottom: var(--cre8-spacing-48);
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 80px;
      height: 4px;
      background-color: var(--accent-color);
    }

    .projects-intro {
      max-width: 800px;
      margin-bottom: var(--cre8-spacing-48);
      font-size: var(--cre8-font-size-3);
      line-height: 1.7;
      color: var(--cre8-color-content-subtle);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--cre8-spacing-32);
    }

    .project-card {
      border-radius: var(--cre8-border-radius-default);
      overflow: hidden;
      background-color: var(--cre8-color-bg-default);
      box-shadow: var(--cre8-shadow-default);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--cre8-shadow-large);
    }

    .project-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .project-card:hover .project-image img {
      transform: scale(1.05);
    }

    .project-content {
      padding: var(--cre8-spacing-24);
    }

    .project-title {
      font-size: var(--cre8-font-size-4);
      font-weight: var(--cre8-font-weights-semibold);
      margin-bottom: var(--cre8-spacing-8);
      color: var(--cre8-color-content-default);
    }

    .project-category {
      font-size: var(--cre8-font-size-1);
      color: var(--accent-color);
      margin-bottom: var(--cre8-spacing-16);
      font-weight: var(--cre8-font-weights-medium);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .project-description {
      font-size: var(--cre8-font-size-2);
      color: var(--cre8-color-content-subtle);
      line-height: 1.6;
      margin-bottom: var(--cre8-spacing-16);
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cre8-spacing-8);
      margin-bottom: var(--cre8-spacing-16);
    }

    .tech-tag {
      font-size: var(--cre8-font-size-0);
      background-color: var(--cre8-color-bg-subtle);
      color: var(--cre8-color-content-subtle);
      padding: var(--cre8-spacing-4) var(--cre8-spacing-8);
      border-radius: var(--cre8-border-radius-badge);
    }

    .project-links {
      display: flex;
      gap: var(--cre8-spacing-16);
    }

    .project-link {
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-6);
      color: var(--accent-color);
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-medium);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .project-link:hover {
      color: var(--accent-hover-color);
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--cre8-spacing-64) 0;
      }
      
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `,pe=e([ne("projects-section")],pe);let ve=class extends re{render(){return L`
      <section id="certifications">
        <div class="certifications-container">
          <h2 class="section-title">Certifications</h2>
          
          <div class="certifications-intro">
            I'm committed to continuous learning and professional development. Here are some of the certifications and courses I've completed to enhance my skills and stay current with industry best practices.
          </div>
          
          <div class="certifications-grid">
            <div class="certification-card">
              <div class="certification-header">
                <div class="certification-logo">
                  <img src="https://via.placeholder.com/60x60" alt="General Assembly Logo" />
                </div>
                <div class="certification-title-container">
                  <h3 class="certification-title">Certification in User Experience Design</h3>
                  <div class="certification-issuer">General Assembly</div>
                </div>
              </div>
              <div class="certification-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Issued September 2017
              </div>
              <div class="certification-skills">
                <span class="skill-tag">User Experience</span>
                <span class="skill-tag">UI Design</span>
                <span class="skill-tag">Wireframing</span>
                <span class="skill-tag">Prototyping</span>
              </div>
            </div>
            
            <div class="certification-card">
              <div class="certification-header">
                <div class="certification-logo">
                  <img src="https://via.placeholder.com/60x60" alt="Coursera Logo" />
                </div>
                <div class="certification-title-container">
                  <h3 class="certification-title">Front-End Web UI Frameworks and Tools</h3>
                  <div class="certification-issuer">Coursera Course Certificates</div>
                </div>
              </div>
              <div class="certification-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Issued December 2016
              </div>
              <div class="credential-id">
                <strong>Credential ID:</strong> A33Z4TQ9H4UQ
              </div>
              <div class="certification-skills">
                <span class="skill-tag">Bootstrap</span>
                <span class="skill-tag">jQuery</span>
                <span class="skill-tag">Responsive Design</span>
              </div>
              <div class="certification-links">
                <a href="https://www.coursera.org/account/accomplishments/verify/A33Z4TQ9H4UQ" class="certification-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  See Credential
                </a>
              </div>
            </div>
            
            <div class="certification-card">
              <div class="certification-header">
                <div class="certification-logo">
                  <img src="https://via.placeholder.com/60x60" alt="Coursera Logo" />
                </div>
                <div class="certification-title-container">
                  <h3 class="certification-title">HTML, CSS and JavaScript</h3>
                  <div class="certification-issuer">Coursera Course Certificates</div>
                </div>
              </div>
              <div class="certification-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Issued December 2016
              </div>
              <div class="credential-id">
                <strong>Credential ID:</strong> Q59QFHNWYPHY
              </div>
              <div class="certification-skills">
                <span class="skill-tag">HTML5</span>
                <span class="skill-tag">CSS3</span>
                <span class="skill-tag">JavaScript</span>
                <span class="skill-tag">DOM Manipulation</span>
              </div>
              <div class="certification-links">
                <a href="https://www.coursera.org/account/accomplishments/verify/Q59QFHNWYPHY" class="certification-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  See Credential
                </a>
              </div>
            </div>
            
            <div class="certification-card">
              <div class="certification-header">
                <div class="certification-logo">
                  <img src="https://via.placeholder.com/60x60" alt="SoloLearn Logo" />
                </div>
                <div class="certification-title-container">
                  <h3 class="certification-title">Certificate of Completion: Java Course</h3>
                  <div class="certification-issuer">SoloLearn</div>
                </div>
              </div>
              <div class="certification-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Issued May 2016
              </div>
              <div class="credential-id">
                <strong>Credential ID:</strong> 1068-1006732
              </div>
              <div class="certification-skills">
                <span class="skill-tag">Java</span>
                <span class="skill-tag">Object-Oriented Programming</span>
              </div>
              <div class="certification-links">
                <a href="http://www.sololearn.com/Profile/1006732/" class="certification-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  See Credential
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `}};ve.styles=n`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-subtle);
      color: var(--cre8-color-content-default);
      padding: var(--cre8-spacing-96) 0;
    }

    .certifications-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--cre8-spacing-24);
    }

    .section-title {
      font-size: var(--cre8-font-size-8);
      font-weight: var(--cre8-font-weights-bold);
      margin-bottom: var(--cre8-spacing-48);
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 80px;
      height: 4px;
      background-color: var(--accent-color);
    }

    .certifications-intro {
      max-width: 800px;
      margin-bottom: var(--cre8-spacing-48);
      font-size: var(--cre8-font-size-3);
      line-height: 1.7;
      color: var(--cre8-color-content-subtle);
    }

    .certifications-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--cre8-spacing-32);
    }

    .certification-card {
      background-color: var(--cre8-color-bg-default);
      border-radius: var(--cre8-border-radius-default);
      padding: var(--cre8-spacing-24);
      box-shadow: var(--cre8-shadow-default);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .certification-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--cre8-shadow-large);
    }

    .certification-header {
      display: flex;
      align-items: flex-start;
      gap: var(--cre8-spacing-16);
      margin-bottom: var(--cre8-spacing-16);
    }

    .certification-logo {
      width: 60px;
      height: 60px;
      border-radius: var(--cre8-border-radius-small);
      background-color: var(--cre8-color-bg-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .certification-logo img {
      width: 80%;
      height: 80%;
      object-fit: contain;
    }

    .certification-title-container {
      flex-grow: 1;
    }

    .certification-title {
      font-size: var(--cre8-font-size-3);
      font-weight: var(--cre8-font-weights-semibold);
      margin-bottom: var(--cre8-spacing-6);
      color: var(--cre8-color-content-default);
    }

    .certification-issuer {
      font-size: var(--cre8-font-size-2);
      color: var(--accent-color);
      font-weight: var(--cre8-font-weights-medium);
    }

    .certification-date {
      font-size: var(--cre8-font-size-1);
      color: var(--cre8-color-content-subtle);
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-6);
      margin-bottom: var(--cre8-spacing-16);
    }

    .credential-id {
      font-size: var(--cre8-font-size-1);
      color: var(--cre8-color-content-subtle);
      margin-bottom: var(--cre8-spacing-16);
    }

    .credential-id strong {
      font-weight: var(--cre8-font-weights-medium);
    }

    .certification-links {
      margin-top: auto;
      display: flex;
    }

    .certification-link {
      display: inline-flex;
      align-items: center;
      gap: var(--cre8-spacing-6);
      color: var(--accent-color);
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-medium);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .certification-link:hover {
      color: var(--accent-hover-color);
    }

    .certification-skills {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cre8-spacing-8);
      margin-bottom: var(--cre8-spacing-16);
    }

    .skill-tag {
      font-size: var(--cre8-font-size-0);
      background-color: rgba(37, 99, 235, 0.1);
      color: var(--accent-color);
      padding: var(--cre8-spacing-4) var(--cre8-spacing-8);
      border-radius: var(--cre8-border-radius-badge);
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--cre8-spacing-64) 0;
      }
      
      .certifications-grid {
        grid-template-columns: 1fr;
      }
    }
  `,ve=e([ne("certifications-section")],ve);let he=class extends re{render(){return L`
      <section id="contact">
        <div class="contact-container">
          <h2 class="section-title">Get In Touch</h2>
          
          <div class="contact-content">
            <div class="contact-info">
              <p class="contact-text">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out using any of the methods below.
              </p>
              
              <div class="contact-methods">
                <div class="contact-method">
                  <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <div class="contact-method-title">Email</div>
                    <div class="contact-method-value">
                      <a href="mailto:tyler.morrow@example.com">tyler.morrow@example.com</a>
                    </div>
                  </div>
                </div>
                
                <div class="contact-method">
                  <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <div class="contact-method-title">Location</div>
                    <div class="contact-method-value">Fort Lauderdale, Florida, USA</div>
                  </div>
                </div>
                
                <div class="contact-method">
                  <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <div class="contact-method-title">Availability</div>
                    <div class="contact-method-value">Open to consulting & contract work</div>
                  </div>
                </div>
              </div>
              
              <div class="social-links">
                <a href="https://linkedin.com/in/tylermorrow" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://github.com/" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://twitter.com/" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="https://dribbble.com/" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div class="contact-form">
              <h3 class="form-title">Send a Message</h3>
              
              <form id="contact-form">
                <div class="form-group">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" id="name" class="form-input" required />
                </div>
                
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" class="form-input" required />
                </div>
                
                <div class="form-group">
                  <label for="subject" class="form-label">Subject</label>
                  <input type="text" id="subject" class="form-input" required />
                </div>
                
                <div class="form-group">
                  <label for="message" class="form-label">Message</label>
                  <textarea id="message" class="form-textarea" required></textarea>
                </div>
                
                <button type="submit" class="submit-button">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `}};he.styles=n`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-default);
      color: var(--cre8-color-content-default);
      padding: var(--cre8-spacing-96) 0;
    }

    .contact-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--cre8-spacing-24);
    }

    .section-title {
      font-size: var(--cre8-font-size-8);
      font-weight: var(--cre8-font-weights-bold);
      margin-bottom: var(--cre8-spacing-48);
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 80px;
      height: 4px;
      background-color: var(--accent-color);
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--cre8-spacing-64);
      align-items: center;
    }

    .contact-info {
      max-width: 500px;
    }

    .contact-text {
      font-size: var(--cre8-font-size-3);
      line-height: 1.7;
      color: var(--cre8-color-content-subtle);
      margin-bottom: var(--cre8-spacing-32);
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: var(--cre8-spacing-24);
    }

    .contact-method {
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-16);
    }

    .contact-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: rgba(37, 99, 235, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-color);
      flex-shrink: 0;
    }

    .contact-details {
      display: flex;
      flex-direction: column;
    }

    .contact-method-title {
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-semibold);
      color: var(--cre8-color-content-default);
      margin-bottom: var(--cre8-spacing-6);
    }

    .contact-method-value {
      font-size: var(--cre8-font-size-2);
      color: var(--cre8-color-content-subtle);
    }

    .contact-method-value a {
      color: var(--accent-color);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .contact-method-value a:hover {
      color: var(--accent-hover-color);
    }

    .social-links {
      display: flex;
      gap: var(--cre8-spacing-16);
      margin-top: var(--cre8-spacing-32);
    }

    .social-link {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--cre8-color-bg-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cre8-color-content-default);
      transition: all 0.2s ease;
    }

    .social-link:hover {
      background-color: var(--accent-color);
      color: white;
      transform: translateY(-3px);
    }

    .contact-form {
      background-color: var(--cre8-color-bg-subtle);
      border-radius: var(--cre8-border-radius-default);
      padding: var(--cre8-spacing-32);
      box-shadow: var(--cre8-shadow-default);
    }

    .form-title {
      font-size: var(--cre8-font-size-4);
      font-weight: var(--cre8-font-weights-semibold);
      margin-bottom: var(--cre8-spacing-24);
      color: var(--cre8-color-content-default);
    }

    .form-group {
      margin-bottom: var(--cre8-spacing-24);
    }

    .form-label {
      display: block;
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-medium);
      margin-bottom: var(--cre8-spacing-8);
      color: var(--cre8-color-content-default);
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: var(--cre8-spacing-12) var(--cre8-spacing-16);
      font-size: var(--cre8-font-size-2);
      border: 1px solid var(--cre8-color-border-default);
      border-radius: var(--cre8-border-radius-field);
      background-color: var(--cre8-color-bg-default);
      color: var(--cre8-color-content-default);
      transition: border-color 0.2s ease;
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: var(--accent-color);
    }

    .form-textarea {
      min-height: 150px;
      resize: vertical;
    }

    .submit-button {
      background-color: var(--accent-color);
      color: white;
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-medium);
      padding: var(--cre8-spacing-12) var(--cre8-spacing-24);
      border: none;
      border-radius: var(--cre8-border-radius-button);
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .submit-button:hover {
      background-color: var(--accent-hover-color);
    }

    @media (max-width: 992px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: var(--cre8-spacing-48);
      }

      .contact-info {
        max-width: 100%;
      }
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--cre8-spacing-64) 0;
      }
    }
  `,he=e([ne("contact-section")],he);let ge=class extends re{render(){return L`
      <footer>
        <div class="footer-container">
          <div class="footer-content">
            <div class="footer-about">
              <div class="footer-logo">Tyler Morrow</div>
              <p class="footer-description">
                Senior Frontend Engineer passionate about creating exceptional digital experiences through clean code and thoughtful design.
              </p>
              <div class="social-links">
                <a href="https://linkedin.com/in/tylermorrow" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://github.com/" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://twitter.com/" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="https://dribbble.com/" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div class="footer-links-column">
              <h3 class="footer-column-title">Quick Links</h3>
              <ul class="footer-links">
                <li class="footer-link-item">
                  <a href="#home" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Home
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="#about" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    About
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="#experience" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Experience
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="#skills" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Skills
                  </a>
                </li>
              </ul>
            </div>
            
            <div class="footer-links-column">
              <h3 class="footer-column-title">Portfolio</h3>
              <ul class="footer-links">
                <li class="footer-link-item">
                  <a href="#projects" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Projects
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="#certifications" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Certifications
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="#contact" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div class="footer-links-column">
              <h3 class="footer-column-title">Contact</h3>
              <ul class="footer-links">
                <li class="footer-link-item">
                  <a href="mailto:tyler.morrow@example.com" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Email Me
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="https://linkedin.com/in/tylermorrow" class="footer-link" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="#contact" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    Message Me
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="copyright">
            © ${(new Date).getFullYear()} Tyler Morrow. Made with <span class="accent">♥</span> using Lit Web Components.
          </div>
        </div>
      </footer>
    `}};ge.styles=n`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-strong);
      color: white;
      padding: var(--cre8-spacing-48) 0 var(--cre8-spacing-24);
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--cre8-spacing-24);
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: var(--cre8-spacing-48);
      margin-bottom: var(--cre8-spacing-48);
    }

    .footer-logo {
      font-size: var(--cre8-font-size-4);
      font-weight: var(--cre8-font-weights-bold);
      margin-bottom: var(--cre8-spacing-16);
      background: linear-gradient(to right, var(--accent-color), white);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }

    .footer-description {
      color: var(--cre8-color-content-knockout);
      margin-bottom: var(--cre8-spacing-24);
      line-height: 1.7;
      opacity: 0.8;
    }

    .social-links {
      display: flex;
      gap: var(--cre8-spacing-16);
    }

    .social-link {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: all 0.2s ease;
    }

    .social-link:hover {
      background-color: var(--accent-color);
      transform: translateY(-3px);
    }

    .footer-column-title {
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-semibold);
      color: white;
      margin-bottom: var(--cre8-spacing-24);
      position: relative;
      display: inline-block;
    }

    .footer-column-title::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 30px;
      height: 2px;
      background-color: var(--accent-color);
    }

    .footer-links {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .footer-link-item {
      margin-bottom: var(--cre8-spacing-12);
    }

    .footer-link {
      color: var(--cre8-color-content-knockout);
      text-decoration: none;
      opacity: 0.8;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-8);
    }

    .footer-link:hover {
      color: var(--accent-color);
      opacity: 1;
      transform: translateX(5px);
    }

    .footer-link svg {
      width: 16px;
      height: 16px;
    }

    .copyright {
      text-align: center;
      padding-top: var(--cre8-spacing-24);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--cre8-color-content-knockout);
      opacity: 0.6;
      font-size: var(--cre8-font-size-1);
    }

    .accent {
      color: var(--accent-color);
    }

    @media (max-width: 992px) {
      .footer-content {
        grid-template-columns: 1fr 1fr;
        gap: var(--cre8-spacing-32);
      }
    }

    @media (max-width: 576px) {
      .footer-content {
        grid-template-columns: 1fr;
      }
    }
  `,ge=e([ne("footer-component")],ge);let ue=class extends re{render(){return L`
      <div class="header-container">
        <a href="#" class="logo">Tyler<span>Morrow</span></a>
        
        <nav>
          <a href="#about" class="nav-link">About</a>
          <a href="#experience" class="nav-link">Experience</a>
          <a href="#skills" class="nav-link">Skills</a>
          <a href="#projects" class="nav-link">Projects</a>
          <a href="#certifications" class="nav-link">Certifications</a>
          <a href="#contact" class="nav-link">Contact</a>
        </nav>
        
        <button class="mobile-menu-button" aria-label="Toggle mobile menu">
          ☰
        </button>
      </div>
    `}};ue.styles=n`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: var(--cre8-color-header-bg-default);
      border-bottom: 1px solid var(--cre8-color-border-default);
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--cre8-spacing-16) var(--cre8-spacing-24);
      max-width: 1200px;
      margin: 0 auto;
    }

    .logo {
      font-weight: var(--cre8-font-weights-bold);
      font-size: var(--cre8-font-size-4);
      color: var(--cre8-color-content-default);
      text-decoration: none;
      display: flex;
      align-items: center;
    }

    .logo span {
      color: var(--accent-color);
    }

    nav {
      display: flex;
      gap: var(--cre8-spacing-32);
    }

    .nav-link {
      color: var(--cre8-color-content-subtle);
      text-decoration: none;
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-medium);
      transition: color 0.2s ease;
    }

    .nav-link:hover {
      color: var(--cre8-color-content-default);
    }

    .nav-link.active {
      color: var(--accent-color);
    }

    .mobile-menu-button {
      display: none;
      background: none;
      border: none;
      color: var(--cre8-color-content-default);
      font-size: var(--cre8-font-size-6);
      cursor: pointer;
    }

    @media (max-width: 768px) {
      nav {
        display: none;
      }

      .mobile-menu-button {
        display: block;
      }

      .mobile-nav {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--cre8-color-header-bg-default);
        padding: var(--cre8-spacing-16);
        gap: var(--cre8-spacing-16);
        border-bottom: 1px solid var(--cre8-color-border-default);
      }
    }
  `,ue=e([ne("header-component")],ue);let fe=class extends re{onConnectedCallback(){super.connectedCallback(),document.addEventListener("DOMContentLoaded",(()=>{const e=document.documentElement.shadowRoot.querySelector("header-component"),t=null==e?void 0:e.shadowRoot.querySelector(".menu-toggle");t&&t.addEventListener("click",(function(){})),null==e||e.shadowRoot.querySelectorAll('a[href^="#"]').forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault();const t=e.target;t.href,t&&window.scrollTo({top:t.offsetTop-80,behavior:"smooth"})}))}))}))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("DOMContentLoaded",(()=>{}))}render(){return L`
      <header-component></header-component>

     <main>
    <hero-section></hero-section>
    <about-section></about-section>
    <experience-section></experience-section>
    <skills-section></skills-section>
    <projects-section></projects-section>
    <certifications-section></certifications-section>
    <contact-section></contact-section>
  </main>
  
  <footer-component></footer-component>
    `}};fe=e([ne("app-root")],fe);
//# sourceMappingURL=index.js.map
