(function(g,$){typeof exports=="object"&&typeof module<"u"?$(exports):typeof define=="function"&&define.amd?define(["exports"],$):(g=typeof globalThis<"u"?globalThis:g||self,$(g.LoadingSpinner={}))})(this,function(g){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ue;const $=globalThis,L=$.ShadowRoot&&($.ShadyCSS===void 0||$.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),Q=new WeakMap;let X=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(L&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=Q.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Q.set(t,e))}return e}toString(){return this.cssText}};const fe=i=>new X(typeof i=="string"?i:i+"",void 0,V),$e=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,r,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[n+1],i[0]);return new X(t,i,V)},me=(i,e)=>{if(L)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),r=$.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},Y=L?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return fe(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:_e,defineProperty:ve,getOwnPropertyDescriptor:ye,getOwnPropertyNames:ge,getOwnPropertySymbols:Ae,getPrototypeOf:be}=Object,m=globalThis,ee=m.trustedTypes,Ee=ee?ee.emptyScript:"",q=m.reactiveElementPolyfillSupport,O=(i,e)=>i,D={toAttribute(i,e){switch(e){case Boolean:i=i?Ee:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},W=(i,e)=>!_e(i,e),te={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),m.litPropertyMetadata??(m.litPropertyMetadata=new WeakMap);let P=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=te){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&ve(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){const{get:r,set:n}=ye(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){const c=r==null?void 0:r.call(this);n==null||n.call(this,o),this.requestUpdate(e,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??te}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;const e=be(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){const t=this.properties,s=[...ge(t),...Ae(t)];for(const r of s)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const r of s)t.unshift(Y(r))}else e!==void 0&&t.push(Y(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return me(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var n;const s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:D).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){var n,o;const s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const c=s.getPropertyOptions(r),a=typeof c.converter=="function"?{fromAttribute:c.converter}:((n=c.converter)==null?void 0:n.fromAttribute)!==void 0?c.converter:D;this._$Em=r,this[r]=a.fromAttribute(t,c.type)??((o=this._$Ej)==null?void 0:o.get(r))??null,this._$Em=null}}requestUpdate(e,t,s){var r;if(e!==void 0){const n=this.constructor,o=this[e];if(s??(s=n.getPropertyOptions(e)),!((s.hasChanged??W)(o,t)||s.useDefault&&s.reflect&&o===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,o]of r){const{wrapped:c}=o,a=this[n];c!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var r;return(r=s.hostUpdated)==null?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[O("elementProperties")]=new Map,P[O("finalized")]=new Map,q==null||q({ReactiveElement:P}),(m.reactiveElementVersions??(m.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U=globalThis,z=U.trustedTypes,se=z?z.createPolicy("lit-html",{createHTML:i=>i}):void 0,re="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,ie="?"+_,Se=`<${ie}>`,A=document,M=()=>A.createComment(""),N=i=>i===null||typeof i!="object"&&typeof i!="function",F=Array.isArray,we=i=>F(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",J=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ne=/-->/g,oe=/>/g,b=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ae=/'/g,ce=/"/g,le=/^(?:script|style|textarea|title)$/i,Ce=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),v=Ce(1),x=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),he=new WeakMap,E=A.createTreeWalker(A,129);function pe(i,e){if(!F(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return se!==void 0?se.createHTML(e):e}const Pe=(i,e)=>{const t=i.length-1,s=[];let r,n=e===2?"<svg>":e===3?"<math>":"",o=T;for(let c=0;c<t;c++){const a=i[c];let p,d,l=-1,f=0;for(;f<a.length&&(o.lastIndex=f,d=o.exec(a),d!==null);)f=o.lastIndex,o===T?d[1]==="!--"?o=ne:d[1]!==void 0?o=oe:d[2]!==void 0?(le.test(d[2])&&(r=RegExp("</"+d[2],"g")),o=b):d[3]!==void 0&&(o=b):o===b?d[0]===">"?(o=r??T,l=-1):d[1]===void 0?l=-2:(l=o.lastIndex-d[2].length,p=d[1],o=d[3]===void 0?b:d[3]==='"'?ce:ae):o===ce||o===ae?o=b:o===ne||o===oe?o=T:(o=b,r=void 0);const y=o===b&&i[c+1].startsWith("/>")?" ":"";n+=o===T?a+Se:l>=0?(s.push(p),a.slice(0,l)+re+a.slice(l)+_+y):a+_+(l===-2?c:y)}return[pe(i,n+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class H{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let n=0,o=0;const c=e.length-1,a=this.parts,[p,d]=Pe(e,t);if(this.el=H.createElement(p,s),E.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=E.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(const l of r.getAttributeNames())if(l.endsWith(re)){const f=d[o++],y=r.getAttribute(l).split(_),I=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:I[2],strings:y,ctor:I[1]==="."?ke:I[1]==="?"?Oe:I[1]==="@"?Ue:B}),r.removeAttribute(l)}else l.startsWith(_)&&(a.push({type:6,index:n}),r.removeAttribute(l));if(le.test(r.tagName)){const l=r.textContent.split(_),f=l.length-1;if(f>0){r.textContent=z?z.emptyScript:"";for(let y=0;y<f;y++)r.append(l[y],M()),E.nextNode(),a.push({type:2,index:++n});r.append(l[f],M())}}}else if(r.nodeType===8)if(r.data===ie)a.push({type:2,index:n});else{let l=-1;for(;(l=r.data.indexOf(_,l+1))!==-1;)a.push({type:7,index:n}),l+=_.length-1}n++}}static createElement(e,t){const s=A.createElement("template");return s.innerHTML=e,s}}function k(i,e,t=i,s){var o,c;if(e===x)return e;let r=s!==void 0?(o=t._$Co)==null?void 0:o[s]:t._$Cl;const n=N(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((c=r==null?void 0:r._$AO)==null||c.call(r,!1),n===void 0?r=void 0:(r=new n(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=r:t._$Cl=r),r!==void 0&&(e=k(i,r._$AS(i,e.values),r,s)),e}class xe{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,r=((e==null?void 0:e.creationScope)??A).importNode(t,!0);E.currentNode=r;let n=E.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new R(n,n.nextSibling,this,e):a.type===1?p=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(p=new Me(n,this,e)),this._$AV.push(p),a=s[++c]}o!==(a==null?void 0:a.index)&&(n=E.nextNode(),o++)}return E.currentNode=A,r}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class R{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=k(this,e,t),N(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):we(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=H.createElement(pe(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(t);else{const o=new xe(r,this),c=o.u(this.options);o.p(t),this.T(c),this._$AH=o}}_$AC(e){let t=he.get(e.strings);return t===void 0&&he.set(e.strings,t=new H(e)),t}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,r=0;for(const n of e)r===t.length?t.push(s=new R(this.O(M()),this.O(M()),this,this.options)):s=t[r],s._$AI(n),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class B{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,t=this,s,r){const n=this.strings;let o=!1;if(n===void 0)e=k(this,e,t,0),o=!N(e)||e!==this._$AH&&e!==x,o&&(this._$AH=e);else{const c=e;let a,p;for(e=n[0],a=0;a<n.length-1;a++)p=k(this,c[s+a],t,a),p===x&&(p=this._$AH[a]),o||(o=!N(p)||p!==this._$AH[a]),p===h?e=h:e!==h&&(e+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!r&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ke extends B{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class Oe extends B{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Ue extends B{constructor(e,t,s,r,n){super(e,t,s,r,n),this.type=5}_$AI(e,t=this){if((e=k(this,e,t,0)??h)===x)return;const s=this._$AH,r=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==h&&(s===h||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Me{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){k(this,e)}}const K=U.litHtmlPolyfillSupport;K==null||K(H,R),(U.litHtmlVersions??(U.litHtmlVersions=[])).push("3.3.0");const Ne=(i,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let r=s._$litPart$;if(r===void 0){const n=(t==null?void 0:t.renderBefore)??null;s._$litPart$=r=new R(e.insertBefore(M(),n),n,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=globalThis;class j extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return x}}j._$litElement$=!0,j.finalized=!0,(ue=S.litElementHydrateSupport)==null||ue.call(S,{LitElement:j});const Z=S.litElementPolyfillSupport;Z==null||Z({LitElement:j}),(S.litElementVersions??(S.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Te={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:W},He=(i=Te,e,t)=>{const{kind:s,metadata:r}=t;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),n.set(t.name,i),s==="accessor"){const{name:o}=t;return{set(c){const a=e.get.call(this);e.set.call(this,c),this.requestUpdate(o,a,i)},init(c){return c!==void 0&&this.C(o,void 0,i,c),c}}}if(s==="setter"){const{name:o}=t;return function(c){const a=this[o];e.call(this,c),this.requestUpdate(o,a,i)}}throw Error("Unsupported decorator location: "+s)};function w(i){return(e,t)=>typeof t=="object"?He(i,e,t):((s,r,n)=>{const o=r.hasOwnProperty(n);return r.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(r,n):void 0})(i,e,t)}function Re(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var de={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(i){(function(){var e={}.hasOwnProperty;function t(){for(var s=[],r=0;r<arguments.length;r++){var n=arguments[r];if(n){var o=typeof n;if(o==="string"||o==="number")s.push(n);else if(Array.isArray(n)){if(n.length){var c=t.apply(null,n);c&&s.push(c)}}else if(o==="object"){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){s.push(n.toString());continue}for(var a in n)e.call(n,a)&&n[a]&&s.push(a)}}}return s.join(" ")}i.exports?(t.default=t,i.exports=t):window.classNames=t})()})(de);var je=de.exports;const De=Re(je);class ze extends j{componentClassNames(e,t={}){return De(e,t)}slotEmpty(e){return!this.querySelector(`[slot="${e}"]`)}slotNotEmpty(e){return this.slotEmpty(e)?null:!this.slotEmpty(e)}dispatch({e,eventName:t,detailObj:s={},optionsObj:r={}}){const n={bubbles:!0,composed:!0,...r,detail:{...e&&{originalEvent:e},...s}},o=new CustomEvent(t,n);return this.dispatchEvent(o),o}render(){return v`<slot></slot>`}}const Be=$e`@import '../../design-tokens/core/scss/theming/component';

/* ------------------------------------ *\
#SPINNER
\* ------------------------------------ */

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spinner-circle-animation {
  0%,
  25% {
    stroke-dashoffset: 280;
    transform: rotate(0);
  }

  50%,
  75% {
    stroke-dashoffset: 75;
    transform: rotate(45deg);
  }

  100% {
    stroke-dashoffset: 280;
    transform: rotate(360deg);
  }
}

:host {
  display: inline-block;
  --spinner-stroke-dasharray: 282.743px;
  --spinner-large-stroke-width: 10;
  --spinner-small-stroke-width: 14;
  --spinner-large-width: 4.5rem;
  --spinner-small-width: 1.5rem;
  @include cre8-typography-label-small();
}

.cre8-c-spinner,
.cre8-c-spinner--large {
  --spinner-height: var(--spinner-large-width);
  --spinner-width: var(--spinner-large-width);
  --icon-color: var(--cre8-color-content-brand);

  .cre8-c-spinner__icon {
    display: block;
  }

  .cre8-c-spinner__label {
    display: block;
    margin-top: var(--cre8-spacing-8);
  }
}

.cre8-c-spinner--small {
  --spinner-height: var(--spinner-small-width);
  --spinner-width: var(--spinner-small-width);
  --icon-color: var(--cre8-color-content-brand);
  display: flex;
  align-items: center;
  .cre8-c-spinner__label {
    display: inline-block;
    margin-left: var(--cre8-spacing-8);
    margin-top: 0;
    vertical-align: 0.35rem;
  }
}

.cre8-c-spinner--inverse {
  --icon-color: var(--cre8-color-content-brand-knockout);
  --label-color: var(--cre8-color-content-brand-knockout); // --cre8-color-content-default-knockout
}

.cre8-c-spinner--secondary.cre8-c-spinner--inverse.cre8-c-spinner--neutral {
  --icon-color: var(--cre8-color-button-secondary-neutral-inverse-content-active);
  --label-color: var(--cre8-color-button-secondary-neutral-inverse-content-active); // --cre8-color-content-default-knockout
}

.cre8-c-spinner--neutral {
  --icon-color: var(--cre8-color-button-secondary-neutral-content-active);
}

.cre8-c-spinner--primary.cre8-c-spinner--inverse {
  --icon-color: var(--cre8-color-button-primary-inverse-content-active);
}

.cre8-c-spinner--secondary.cre8-c-spinner--inverse {
  --icon-color: var(--cre8-color-button-secondary-inverse-content-active);
}

.cre8-c-spinner--tertiary.cre8-c-spinner--inverse {
  --icon-color: var(--cre8-color-button-tertiary-inverse-content-active);
}

.cre8-c-spinner__label {
  color: var(--label-color, var(--cre8-color-content-default));
}

.cre8-c-spinner__hidden-label {
  display: none;
}

.cre8-c-spinner__icon {
  height: var(--spinner-height, 1em);
  width: var(--spinner-width, 1em);

  circle {
    fill: transparent;
    stroke: var(--icon-color, inherit);
    stroke-dasharray: var(--spinner-stroke-dasharray);
    stroke-linecap: round;
    stroke-width: var(--spinner-large-stroke-width);
    transform-origin: 50% 50%;
  }
}

.cre8-c-spinner__icon-small {
  circle {
    stroke-width: var(--spinner-small-stroke-width);
  }
}

.cre8-c-spinner--indeterminate .cre8-c-spinner__icon {
  animation: loading 2s linear 0s infinite;

  circle {
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-name: spinner-circle-animation;
    animation-timing-function: ease-in-out;
  }
}

.cre8-c-spinner--determinate .cre8-c-spinner__icon {
  overflow: hidden;
  transform: rotate(-90deg);
  transform-origin: center center;
}
`;var Ie=Object.defineProperty,C=(i,e,t,s)=>{for(var r=void 0,n=i.length-1,o;n>=0;n--)(o=i[n])&&(r=o(e,t,r)||r);return r&&Ie(e,t,r),r};const G=class G extends ze{constructor(){super(),this.progress=0,this.size="large";const e=Math.floor(Math.random()*9e5)+1e5;this.labelId=`cre8-spinner-${e}`}renderDeterminateSpinner(){const e=Math.max(Math.min(100,this.progress===0?this.progress=1:this.progress),0),t=2*3.1415926*45-e/100*(2*3.1415926*45);return v` ${this.size==="small"?v`
          <svg class="cre8-c-spinner__icon cre8-c-spinner__icon-small" aria-hidden="true" viewBox="0 0 100 100">
            <circle cx="50%" cy="50%" r="43" stroke-dashoffset="${t}"></circle>
          </svg>
        `:v` <svg class="cre8-c-spinner__icon" aria-hidden="true" viewBox="0 0 100 100">
          <circle cx="50%" cy="50%" r="45" stroke-dashoffset="${t}"></circle>
        </svg>`}`}renderInDeterminateSpinner(){return v` ${this.size==="small"?v`
          <svg class="cre8-c-spinner__icon cre8-c-spinner__icon-small" aria-hidden="true" viewBox="0 0 100 100">
            <circle cx="50%" cy="50%" r="43"></circle>
          </svg>
        `:v` <svg class="cre8-c-spinner__icon" aria-hidden="true" viewBox="0 0 100 100">
          <circle cx="50%" cy="50%" r="45"></circle>
        </svg>`}`}render(){const e=this.componentClassNames("cre8-c-spinner",{"cre8-c-spinner--large":this.size==="large","cre8-c-spinner--small":this.size==="small","cre8-c-spinner--inverse":this.inverse,"cre8-c-spinner--neutral":this.neutral,"cre8-c-spinner--primary":this.buttonVariant==="primary","cre8-c-spinner--secondary":this.buttonVariant==="secondary","cre8-c-spinner--tertiary":this.buttonVariant==="tertiary","cre8-c-spinner--determinate":this.determinate,"cre8-c-spinner--indeterminate":!this.determinate});return v`
      <div
        class="${e}"
        role="progressbar"
        aria-labelledby="${this.labelId}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.determinate?this.progress:h}"
        part="base"
      >
        ${this.determinate?this.renderDeterminateSpinner():this.renderInDeterminateSpinner()}
        <div
          id="${this.labelId}"
          class="${this.label?"cre8-c-spinner__label":"cre8-c-spinner__hidden-label"}"
          part="label"
        >
          ${this.label}
        </div>
      </div>
    `}};G.styles=Be;let u=G;C([w({type:Boolean,reflect:!0})],u.prototype,"determinate"),C([w({type:Boolean,reflect:!0})],u.prototype,"inverse"),C([w({type:Boolean,reflect:!0})],u.prototype,"neutral"),C([w()],u.prototype,"buttonVariant"),C([w()],u.prototype,"label"),C([w({reflect:!0,type:Number})],u.prototype,"progress"),C([w()],u.prototype,"size"),customElements.get("cre8-loading-spinner")===void 0&&customElements.define("cre8-loading-spinner",u),g.Cre8LoadingSpinner=u,g.default=u,Object.defineProperties(g,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
