(function(y,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(y=typeof globalThis<"u"?globalThis:y||self,f(y.ProgressMeter={}))})(this,function(y){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $e;const f=globalThis,L=f.ShadowRoot&&(f.ShadyCSS===void 0||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B=Symbol(),G=new WeakMap;let Q=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==B)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(L&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=G.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&G.set(t,e))}return e}toString(){return this.cssText}};const fe=i=>new Q(typeof i=="string"?i:i+"",void 0,B),ge=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new Q(t,i,B)},me=(i,e)=>{if(L)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),r=f.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},X=L?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return fe(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:_e,defineProperty:ye,getOwnPropertyDescriptor:ve,getOwnPropertyNames:be,getOwnPropertySymbols:Ae,getPrototypeOf:Ee}=Object,g=globalThis,Y=g.trustedTypes,Se=Y?Y.emptyScript:"",q=g.reactiveElementPolyfillSupport,k=(i,e)=>i,j={toAttribute(i,e){switch(e){case Boolean:i=i?Se:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},V=(i,e)=>!_e(i,e),ee={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);let P=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&ye(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){const{get:r,set:o}=ve(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){const c=r==null?void 0:r.call(this);o==null||o.call(this,n),this.requestUpdate(e,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ee}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;const e=Ee(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){const t=this.properties,s=[...be(t),...Ae(t)];for(const r of s)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const r of s)t.unshift(X(r))}else e!==void 0&&t.push(X(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return me(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var o;const s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){const n=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:j).toAttribute(t,s.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){var o,n;const s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const c=s.getPropertyOptions(r),a=typeof c.converter=="function"?{fromAttribute:c.converter}:((o=c.converter)==null?void 0:o.fromAttribute)!==void 0?c.converter:j;this._$Em=r,this[r]=a.fromAttribute(t,c.type)??((n=this._$Ej)==null?void 0:n.get(r))??null,this._$Em=null}}requestUpdate(e,t,s){var r;if(e!==void 0){const o=this.constructor,n=this[e];if(s??(s=o.getPropertyOptions(e)),!((s.hasChanged??V)(n,t)||s.useDefault&&s.reflect&&n===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,n]of r){const{wrapped:c}=n,a=this[o];c!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var r;return(r=s.hostUpdated)==null?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[k("elementProperties")]=new Map,P[k("finalized")]=new Map,q==null||q({ReactiveElement:P}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=globalThis,z=O.trustedTypes,te=z?z.createPolicy("lit-html",{createHTML:i=>i}):void 0,se="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,re="?"+m,we=`<${re}>`,v=document,U=()=>v.createComment(""),M=i=>i===null||typeof i!="object"&&typeof i!="function",W=Array.isArray,Pe=i=>W(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",F=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ie=/-->/g,oe=/>/g,b=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ne=/'/g,ae=/"/g,ce=/^(?:script|style|textarea|title)$/i,Ce=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),le=Ce(1),C=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),he=new WeakMap,A=v.createTreeWalker(v,129);function de(i,e){if(!W(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return te!==void 0?te.createHTML(e):e}const xe=(i,e)=>{const t=i.length-1,s=[];let r,o=e===2?"<svg>":e===3?"<math>":"",n=H;for(let c=0;c<t;c++){const a=i[c];let d,p,l=-1,$=0;for(;$<a.length&&(n.lastIndex=$,p=n.exec(a),p!==null);)$=n.lastIndex,n===H?p[1]==="!--"?n=ie:p[1]!==void 0?n=oe:p[2]!==void 0?(ce.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=b):p[3]!==void 0&&(n=b):n===b?p[0]===">"?(n=r??H,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?b:p[3]==='"'?ae:ne):n===ae||n===ne?n=b:n===ie||n===oe?n=H:(n=b,r=void 0);const _=n===b&&i[c+1].startsWith("/>")?" ":"";o+=n===H?a+we:l>=0?(s.push(d),a.slice(0,l)+se+a.slice(l)+m+_):a+m+(l===-2?c:_)}return[de(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class T{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let o=0,n=0;const c=e.length-1,a=this.parts,[d,p]=xe(e,t);if(this.el=T.createElement(d,s),A.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=A.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(const l of r.getAttributeNames())if(l.endsWith(se)){const $=p[n++],_=r.getAttribute(l).split(m),I=/([.?@])?(.*)/.exec($);a.push({type:1,index:o,name:I[2],strings:_,ctor:I[1]==="."?Oe:I[1]==="?"?Ue:I[1]==="@"?Me:D}),r.removeAttribute(l)}else l.startsWith(m)&&(a.push({type:6,index:o}),r.removeAttribute(l));if(ce.test(r.tagName)){const l=r.textContent.split(m),$=l.length-1;if($>0){r.textContent=z?z.emptyScript:"";for(let _=0;_<$;_++)r.append(l[_],U()),A.nextNode(),a.push({type:2,index:++o});r.append(l[$],U())}}}else if(r.nodeType===8)if(r.data===re)a.push({type:2,index:o});else{let l=-1;for(;(l=r.data.indexOf(m,l+1))!==-1;)a.push({type:7,index:o}),l+=m.length-1}o++}}static createElement(e,t){const s=v.createElement("template");return s.innerHTML=e,s}}function x(i,e,t=i,s){var n,c;if(e===C)return e;let r=s!==void 0?(n=t._$Co)==null?void 0:n[s]:t._$Cl;const o=M(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((c=r==null?void 0:r._$AO)==null||c.call(r,!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=r:t._$Cl=r),r!==void 0&&(e=x(i,r._$AS(i,e.values),r,s)),e}class ke{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,r=((e==null?void 0:e.creationScope)??v).importNode(t,!0);A.currentNode=r;let o=A.nextNode(),n=0,c=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new N(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new He(o,this,e)),this._$AV.push(d),a=s[++c]}n!==(a==null?void 0:a.index)&&(o=A.nextNode(),n++)}return A.currentNode=v,r}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class N{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=x(this,e,t),M(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==C&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Pe(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&M(this._$AH)?this._$AA.nextSibling.data=e:this.T(v.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=T.createElement(de(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(t);else{const n=new ke(r,this),c=n.u(this.options);n.p(t),this.T(c),this._$AH=n}}_$AC(e){let t=he.get(e.strings);return t===void 0&&he.set(e.strings,t=new T(e)),t}k(e){W(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,r=0;for(const o of e)r===t.length?t.push(s=new N(this.O(U()),this.O(U()),this,this.options)):s=t[r],s._$AI(o),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class D{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,t=this,s,r){const o=this.strings;let n=!1;if(o===void 0)e=x(this,e,t,0),n=!M(e)||e!==this._$AH&&e!==C,n&&(this._$AH=e);else{const c=e;let a,d;for(e=o[0],a=0;a<o.length-1;a++)d=x(this,c[s+a],t,a),d===C&&(d=this._$AH[a]),n||(n=!M(d)||d!==this._$AH[a]),d===h?e=h:e!==h&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!r&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Oe extends D{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class Ue extends D{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Me extends D{constructor(e,t,s,r,o){super(e,t,s,r,o),this.type=5}_$AI(e,t=this){if((e=x(this,e,t,0)??h)===C)return;const s=this._$AH,r=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==h&&(s===h||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class He{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){x(this,e)}}const J=O.litHtmlPolyfillSupport;J==null||J(T,N),(O.litHtmlVersions??(O.litHtmlVersions=[])).push("3.3.0");const Te=(i,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let r=s._$litPart$;if(r===void 0){const o=(t==null?void 0:t.renderBefore)??null;s._$litPart$=r=new N(e.insertBefore(U(),o),o,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=globalThis;class R extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Te(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return C}}R._$litElement$=!0,R.finalized=!0,($e=E.litElementHydrateSupport)==null||$e.call(E,{LitElement:R});const K=E.litElementPolyfillSupport;K==null||K({LitElement:R}),(E.litElementVersions??(E.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ne={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:V},Re=(i=Ne,e,t)=>{const{kind:s,metadata:r}=t;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(t.name,i),s==="accessor"){const{name:n}=t;return{set(c){const a=e.get.call(this);e.set.call(this,c),this.requestUpdate(n,a,i)},init(c){return c!==void 0&&this.C(n,void 0,i,c),c}}}if(s==="setter"){const{name:n}=t;return function(c){const a=this[n];e.call(this,c),this.requestUpdate(n,a,i)}}throw Error("Unsupported decorator location: "+s)};function S(i){return(e,t)=>typeof t=="object"?Re(i,e,t):((s,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(r,o):void 0})(i,e,t)}let je=(i=21)=>crypto.getRandomValues(new Uint8Array(i)).reduce((e,t)=>(t&=63,t<36?e+=t.toString(36):t<62?e+=(t-26).toString(36).toUpperCase():t>62?e+="-":e+="_",e),"");function ze(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var pe={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(i){(function(){var e={}.hasOwnProperty;function t(){for(var s=[],r=0;r<arguments.length;r++){var o=arguments[r];if(o){var n=typeof o;if(n==="string"||n==="number")s.push(o);else if(Array.isArray(o)){if(o.length){var c=t.apply(null,o);c&&s.push(c)}}else if(n==="object"){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){s.push(o.toString());continue}for(var a in o)e.call(o,a)&&o[a]&&s.push(a)}}}return s.join(" ")}i.exports?(t.default=t,i.exports=t):window.classNames=t})()})(pe);var De=pe.exports;const Ie=ze(De);class Le extends R{componentClassNames(e,t={}){return Ie(e,t)}slotEmpty(e){return!this.querySelector(`[slot="${e}"]`)}slotNotEmpty(e){return this.slotEmpty(e)?null:!this.slotEmpty(e)}dispatch({e,eventName:t,detailObj:s={},optionsObj:r={}}){const o={bubbles:!0,composed:!0,...r,detail:{...e&&{originalEvent:e},...s}},n=new CustomEvent(t,o);return this.dispatchEvent(n),n}render(){return le`<slot></slot>`}}const Be=ge`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) Progress Meter
 * 2) Progress bar fill color custom property
 */

 :host {
  display: block;
 }

.cre8-c-progress-meter__progress {
  --cre8-progress-meter-background: var(--cre8-color-content-brand); /* 2 */
  width: 100%;
  height: var(--cre8-progress-meter-height, calc(var(--size-base-unit) * 1));
  background: var(--cre8-color-bg-transparent);
  border-width: var(--cre8-border-width-default);
  border-style: var(--cre8-border-style-default);
  border-color: var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-round);

  .cre8-c-progress-meter--knockout & {
    --cre8-progress-meter-background: var(--cre8-color-content-brand-knockout);
    border-color: var(--cre8-color-border-default);
  }
  
  /**
  * Progress bar background styling error
  */
  .cre8-c-progress-meter--error & {
    --cre8-progress-meter-background: var(--cre8-color-bg-error-strong);
  }

  /**
  * Progress bar background styling warning
  */
  .cre8-c-progress-meter--warning & {
    --cre8-progress-meter-background: var(--cre8-color-bg-warning-strong);
  }

  /**
  * Progress bar background styling success
  */
  .cre8-c-progress-meter--success & {
    --cre8-progress-meter-background: var(--cre8-color-bg-success-strong);
  }


  /**
  * Progress bar background styling indeterminate
  */
  .cre8-c-progress-meter--indeterminate & {
    --cre8-progress-meter-background: repeating-linear-gradient(
      -45deg,
      #009bdf,
      #009bdf 10px,
      #00628e 10px,
      #00628e 20px
    ); // TODO Possibly tokenize these
  }
}

/**
 * Progress bar sr-only escriptor
 */
.cre8-c-progress-meter__sr-only {
  @include visuallyHidden;
}


/**
 * Progress bar background styling
 */
progress {
  color: var(--cre8-progress-meter-background);
  appearance: none;
}

/**
 * Progress bar background styling for Mozilla
 */
progress::-moz-progress-bar {
  background: var(--cre8-progress-meter-background);
  border-radius: var(--cre8-border-radius-round);
}

/**
 * Progress bar background styling for Safari and Chrome
 */
progress::-webkit-progress-bar {
  background: var(--cre8-color-bg-subtle);
  border-radius: var(--cre8-border-radius-round);
}
progress::-webkit-progress-value {
  background: var(--cre8-progress-meter-background);
  border-radius: var(--cre8-border-radius-round);
}

/**
 * Hide Label except for screen readers
 */
.cre8-c-progress-meter__label {
  @include visuallyHidden;
}
`;var qe=Object.defineProperty,w=(i,e,t,s)=>{for(var r=void 0,o=i.length-1,n;o>=0;o--)(n=i[o])&&(r=n(e,t,r)||r);return r&&qe(e,t,r),r},ue=(i=>(i[i.error=0]="error",i[i.warning=1]="warning",i[i.success=2]="success",i[i.undefined=3]="undefined",i))(ue||{});const Z=class Z extends Le{constructor(){super(...arguments),this.max=100}connectedCallback(){super.connectedCallback(),this.fieldId=this.fieldId||je()}render(){const e=this.componentClassNames("cre8-c-progress-meter",{"cre8-c-progress-meter--error":this.status==="error","cre8-c-progress-meter--warning":this.status==="warning","cre8-c-progress-meter--success":this.status==="success","cre8-c-progress-meter--knockout":this.knockout});return le`<div class="${e}">
      <label class="cre8-c-progress-meter__label" for="${this.fieldId}">${this.label}</label>
      <span class="cre8-c-progress-meter__sr-only">${Math.round(this.value/this.max*100)}%</span>
      <progress
        class="cre8-c-progress-meter__progress"
        aria-hidden="true"
        id=${this.fieldId}
        name=${this.name}
        max="${this.max}"
        value="${this.value}"
      >
        ${Math.round(this.value/this.max*100)}%
      </progress>
    </div>`}};Z.styles=[Be];let u=Z;w([S()],u.prototype,"status"),w([S({type:Boolean,reflect:!0})],u.prototype,"knockout"),w([S()],u.prototype,"max"),w([S()],u.prototype,"value"),w([S()],u.prototype,"fieldId"),w([S()],u.prototype,"name"),w([S()],u.prototype,"label"),customElements.get("cre8-progress-meter")===void 0&&customElements.define("cre8-progress-meter",u),y.Cre8ProgressMeter=u,y.status=ue,Object.defineProperty(y,Symbol.toStringTag,{value:"Module"})});
