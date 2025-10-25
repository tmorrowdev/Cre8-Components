(function(w,m){typeof exports=="object"&&typeof module<"u"?m(exports):typeof define=="function"&&define.amd?define(["exports"],m):(w=typeof globalThis<"u"?globalThis:w||self,m(w.Grid={}))})(this,function(w){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ue;const m=globalThis,G=m.ShadowRoot&&(m.ShadyCSS===void 0||m.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),Z=new WeakMap;let Q=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(G&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Z.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Z.set(t,e))}return e}toString(){return this.cssText}};const me=s=>new Q(typeof s=="string"?s:s+"",void 0,D),ge=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,r,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[n+1],s[0]);return new Q(t,s,D)},$e=(s,e)=>{if(G)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=m.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},X=G?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return me(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:fe,defineProperty:_e,getOwnPropertyDescriptor:we,getOwnPropertyNames:be,getOwnPropertySymbols:ye,getPrototypeOf:ve}=Object,g=globalThis,Y=g.trustedTypes,Ae=Y?Y.emptyScript:"",L=g.reactiveElementPolyfillSupport,x=(s,e)=>s,H={toAttribute(s,e){switch(e){case Boolean:s=s?Ae:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},I=(s,e)=>!fe(s,e),ee={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);let S=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&_e(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:n}=we(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){const d=r==null?void 0:r.call(this);n==null||n.call(this,o),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ee}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const e=ve(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,i=[...be(t),...ye(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(X(r))}else e!==void 0&&t.push(X(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $e(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var n;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const o=(((n=i.converter)==null?void 0:n.toAttribute)!==void 0?i.converter:H).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){var n,o;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const d=i.getPropertyOptions(r),a=typeof d.converter=="function"?{fromAttribute:d.converter}:((n=d.converter)==null?void 0:n.fromAttribute)!==void 0?d.converter:H;this._$Em=r,this[r]=a.fromAttribute(t,d.type)??((o=this._$Ej)==null?void 0:o.get(r))??null,this._$Em=null}}requestUpdate(e,t,i){var r;if(e!==void 0){const n=this.constructor,o=this[e];if(i??(i=n.getPropertyOptions(e)),!((i.hasChanged??I)(o,t)||i.useDefault&&i.reflect&&o===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:n},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[n,o]of r){const{wrapped:d}=o,a=this[n];d!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var n;return(n=r.hostUpdate)==null?void 0:n.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[x("elementProperties")]=new Map,S[x("finalized")]=new Map,L==null||L({ReactiveElement:S}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,R=C.trustedTypes,te=R?R.createPolicy("lit-html",{createHTML:s=>s}):void 0,ie="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,re="?"+$,Se=`<${re}>`,b=document,P=()=>b.createComment(""),O=s=>s===null||typeof s!="object"&&typeof s!="function",B=Array.isArray,Ee=s=>B(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",q=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,se=/-->/g,ne=/>/g,y=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),oe=/'/g,ae=/"/g,de=/^(?:script|style|textarea|title)$/i,ke=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),le=ke(1),E=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ce=new WeakMap,v=b.createTreeWalker(b,129);function he(s,e){if(!B(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return te!==void 0?te.createHTML(e):e}const xe=(s,e)=>{const t=s.length-1,i=[];let r,n=e===2?"<svg>":e===3?"<math>":"",o=U;for(let d=0;d<t;d++){const a=s[d];let h,p,l=-1,u=0;for(;u<a.length&&(o.lastIndex=u,p=o.exec(a),p!==null);)u=o.lastIndex,o===U?p[1]==="!--"?o=se:p[1]!==void 0?o=ne:p[2]!==void 0?(de.test(p[2])&&(r=RegExp("</"+p[2],"g")),o=y):p[3]!==void 0&&(o=y):o===y?p[0]===">"?(o=r??U,l=-1):p[1]===void 0?l=-2:(l=o.lastIndex-p[2].length,h=p[1],o=p[3]===void 0?y:p[3]==='"'?ae:oe):o===ae||o===oe?o=y:o===se||o===ne?o=U:(o=y,r=void 0);const _=o===y&&s[d+1].startsWith("/>")?" ":"";n+=o===U?a+Se:l>=0?(i.push(h),a.slice(0,l)+ie+a.slice(l)+$+_):a+$+(l===-2?d:_)}return[he(s,n+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class M{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let n=0,o=0;const d=e.length-1,a=this.parts,[h,p]=xe(e,t);if(this.el=M.createElement(h,i),v.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=v.nextNode())!==null&&a.length<d;){if(r.nodeType===1){if(r.hasAttributes())for(const l of r.getAttributeNames())if(l.endsWith(ie)){const u=p[o++],_=r.getAttribute(l).split($),z=/([.?@])?(.*)/.exec(u);a.push({type:1,index:n,name:z[2],strings:_,ctor:z[1]==="."?Pe:z[1]==="?"?Oe:z[1]==="@"?Ue:j}),r.removeAttribute(l)}else l.startsWith($)&&(a.push({type:6,index:n}),r.removeAttribute(l));if(de.test(r.tagName)){const l=r.textContent.split($),u=l.length-1;if(u>0){r.textContent=R?R.emptyScript:"";for(let _=0;_<u;_++)r.append(l[_],P()),v.nextNode(),a.push({type:2,index:++n});r.append(l[u],P())}}}else if(r.nodeType===8)if(r.data===re)a.push({type:2,index:n});else{let l=-1;for(;(l=r.data.indexOf($,l+1))!==-1;)a.push({type:7,index:n}),l+=$.length-1}n++}}static createElement(e,t){const i=b.createElement("template");return i.innerHTML=e,i}}function k(s,e,t=s,i){var o,d;if(e===E)return e;let r=i!==void 0?(o=t._$Co)==null?void 0:o[i]:t._$Cl;const n=O(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==n&&((d=r==null?void 0:r._$AO)==null||d.call(r,!1),n===void 0?r=void 0:(r=new n(s),r._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=k(s,r._$AS(s,e.values),r,i)),e}class Ce{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??b).importNode(t,!0);v.currentNode=r;let n=v.nextNode(),o=0,d=0,a=i[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new N(n,n.nextSibling,this,e):a.type===1?h=new a.ctor(n,a.name,a.strings,this,e):a.type===6&&(h=new Me(n,this,e)),this._$AV.push(h),a=i[++d]}o!==(a==null?void 0:a.index)&&(n=v.nextNode(),o++)}return v.currentNode=b,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class N{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=k(this,e,t),O(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ee(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=M.createElement(he(i.h,i.h[0]),this.options)),i);if(((n=this._$AH)==null?void 0:n._$AD)===r)this._$AH.p(t);else{const o=new Ce(r,this),d=o.u(this.options);o.p(t),this.T(d),this._$AH=o}}_$AC(e){let t=ce.get(e.strings);return t===void 0&&ce.set(e.strings,t=new M(e)),t}k(e){B(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const n of e)r===t.length?t.push(i=new N(this.O(P()),this.O(P()),this,this.options)):i=t[r],i._$AI(n),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(e,t=this,i,r){const n=this.strings;let o=!1;if(n===void 0)e=k(this,e,t,0),o=!O(e)||e!==this._$AH&&e!==E,o&&(this._$AH=e);else{const d=e;let a,h;for(e=n[0],a=0;a<n.length-1;a++)h=k(this,d[i+a],t,a),h===E&&(h=this._$AH[a]),o||(o=!O(h)||h!==this._$AH[a]),h===c?e=c:e!==c&&(e+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!r&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Pe extends j{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class Oe extends j{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class Ue extends j{constructor(e,t,i,r,n){super(e,t,i,r,n),this.type=5}_$AI(e,t=this){if((e=k(this,e,t,0)??c)===E)return;const i=this._$AH,r=e===c&&i!==c||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==c&&(i===c||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Me{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){k(this,e)}}const V=C.litHtmlPolyfillSupport;V==null||V(M,N),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.3.0");const Ne=(s,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const n=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new N(e.insertBefore(P(),n),n,void 0,t??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;class T extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return E}}T._$litElement$=!0,T.finalized=!0,(ue=A.litElementHydrateSupport)==null||ue.call(A,{LitElement:T});const W=A.litElementPolyfillSupport;W==null||W({LitElement:T}),(A.litElementVersions??(A.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Te={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:I},He=(s=Te,e,t)=>{const{kind:i,metadata:r}=t;let n=globalThis.litPropertyMetadata.get(r);if(n===void 0&&globalThis.litPropertyMetadata.set(r,n=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),n.set(t.name,s),i==="accessor"){const{name:o}=t;return{set(d){const a=e.get.call(this);e.set.call(this,d),this.requestUpdate(o,a,s)},init(d){return d!==void 0&&this.C(o,void 0,s,d),d}}}if(i==="setter"){const{name:o}=t;return function(d){const a=this[o];e.call(this,d),this.requestUpdate(o,a,s)}}throw Error("Unsupported decorator location: "+i)};function F(s){return(e,t)=>typeof t=="object"?He(s,e,t):((i,r,n)=>{const o=r.hasOwnProperty(n);return r.constructor.createProperty(n,i),o?Object.getOwnPropertyDescriptor(r,n):void 0})(s,e,t)}function Re(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var pe={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(s){(function(){var e={}.hasOwnProperty;function t(){for(var i=[],r=0;r<arguments.length;r++){var n=arguments[r];if(n){var o=typeof n;if(o==="string"||o==="number")i.push(n);else if(Array.isArray(n)){if(n.length){var d=t.apply(null,n);d&&i.push(d)}}else if(o==="object"){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){i.push(n.toString());continue}for(var a in n)e.call(n,a)&&n[a]&&i.push(a)}}}return i.join(" ")}s.exports?(t.default=t,s.exports=t):window.classNames=t})()})(pe);var je=pe.exports;const ze=Re(je);class Ge extends T{componentClassNames(e,t={}){return ze(e,t)}slotEmpty(e){return!this.querySelector(`[slot="${e}"]`)}slotNotEmpty(e){return this.slotEmpty(e)?null:!this.slotEmpty(e)}dispatch({e,eventName:t,detailObj:i={},optionsObj:r={}}){const n={bubbles:!0,composed:!0,...r,detail:{...e&&{originalEvent:e},...i}},o=new CustomEvent(t,n);return this.dispatchEvent(o),o}render(){return le`<slot></slot>`}}const De=ge`@import '../../design-tokens/core/scss/theming/component';

// #GRID

/**
 * 1) Grid layout for items like cards, etc.
 */
.cre8-c-grid {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: calc(var(--size-base-unit) * -1.5);
}

/**
 * Grid with no gap in between items
 */
.cre8-c-grid--gap-none {
  margin: 0;
}

/**
 * Small gap grid
 * 1) Spacing between grid items is smaller than default
 */
.cre8-c-grid--gap-sm {
  margin: calc(var(--size-base-unit) * -0.5);
}

/**
 * Large gap grid
 * 1) Spacing between grid items is larger than default
 */
.cre8-c-grid--gap-lg {
  margin: calc(var(--size-base-unit) * -2);
}

/**
 * Side by Side Grid
 * 1) Grid that stays 2 items per row on all screen sizes
 */
.cre8-c-grid--side-by-side {
  flex-direction: row;
}

/**
 * 2up grid
 * 1) Stacked items on small screens to 2 items per row on medium/large screens
 */
.cre8-c-grid--2up {
  @media all and (min-width:$cre8-breakpoint-md) {
    flex-direction: row;
  }

  /**
  * 2up grid that breaks faster
  * 1) Grid that breaks from 1 to 2up at a smaller viewport than the default
  */
  &.cre8-c-grid--break-faster {
    @media all and (min-width:$cre8-breakpoint-sm) {
      flex-direction: row;
    }
  }

  /**
  * 2up grid that breaks slower
  * 1) Grid that breaks from 1 to 2up at a larger viewport than the default
  */
  &.cre8-c-grid--break-slower {
    @media all and (min-width:$cre8-breakpoint-md) {
      flex-direction: column;
    }
    @media all and (min-width:$cre8-breakpoint-xxl) {
      flex-direction: row;
    }
  }
}

/**
 * 3up grid
 * 1) Stacked items on small screens to 3 items per row on medium/large screens
 */
.cre8-c-grid--3up {
  @media all and (min-width:$cre8-breakpoint-md) {
    flex-direction: row;
  }
}

/**
 * 1 to 3up grid
 * 1) Stacked items on small screens to 3 items per row on medium/large screens
 */
.cre8-c-grid--1-3up {
  @media all and (min-width:$cre8-breakpoint-lg) {
    flex-direction: row;
  }

  /**
  * 1 to 3 up grid that breaks faster
  * 1) Grid that breaks from 1 to 3up at a smaller viewport than the default
  */
  &.cre8-c-grid--break-faster {
    @media all and (min-width:$cre8-breakpoint-md) {
      flex-direction: row;
    }
  }

  /**
  * 1 to 3up grid that breaks slower
  * 1) Grid that breaks from 1 to 3up at a larger viewport than the default
  */
  &.cre8-c-grid--break-slower {
    @media all and (min-width:$cre8-breakpoint-lg) {
      flex-direction: column;
    }
    @media all and (min-width:$cre8-breakpoint-xl) {
      flex-direction: row;
    }
  }
}

/**
 * 1 to 2 to 4up grid
 * 1) Stacked items on small screens to 2 items per row on medium screens to 4 items per row on large screens
 */
.cre8-c-grid--1-2-4up {
  @media all and (min-width:$cre8-breakpoint-sm) {
    flex-direction: row;
  }
}

/**
 * 1 to 4up grid
 * 1) Stacked items on small screens to 4 items per row on medium/large screens
 */
.cre8-c-grid--1-4up {
  @media all and (min-width:$cre8-breakpoint-md) {
    flex-direction: row;
  }
}

/**
 * 1 to 2 to 4up grid
 * 1) Stacked items on small screens to 2 items per row on small/medium screens to
 * 3 items per row on medium screens and 4 items per row on large screens
 */
.cre8-c-grid--4up {
  @media all and (min-width:$cre8-breakpoint-sm) {
    flex-direction: row;
  }
}

/**
  * Slotted grid item within 4up Grid
  */
.cre8-c-grid--2-4-6up {
  flex-direction: row;
}

/**
 * Slotted grid item
 */
::slotted(cre8-grid-item) {
  display: block;
  padding: calc(var(--size-base-unit) * 1.5);

  /**
  * Slotted grid item within grid with no gap between items
  */
  .cre8-c-grid--gap-none > & {
    padding: 0;
  }

  /**
  * Slotted grid item within grid with small gap between items
  */
  .cre8-c-grid--gap-sm > & {
    padding: calc(var(--size-base-unit) * 0.5);
  }

  /**
  * Slotted grid item within grid with large gap between items
  */
  .cre8-c-grid--gap-lg > & {
    padding: calc(var(--size-base-unit) * 2);
  }

  /**
  * Slotted grid item within side by side grid
  * 1) Grid that stays 2 items per row on all screen sizes
  */
  .cre8-c-grid--side-by-side > & {
    width: 50%;
  }

  /**
  * Slotted grid item within 2up Grid
  */
  .cre8-c-grid--2up > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 50%;
    }
  }

  /**
  * Slotted grid item within 2up break faster (small to large screens) Grid
  */
  .cre8-c-grid--2up.cre8-c-grid--break-faster > & {
    @media all and (min-width:$cre8-breakpoint-sm) {
      width: 50%;
    }
  }

  /**
  * Slotted grid item within 2up break slower (small to large screens) Grid
  */
  .cre8-c-grid--2up.cre8-c-grid--break-slower > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 100%;
    }
    @media all and (min-width:$cre8-breakpoint-xxl) {
      width: 50%;
    }
  }

  /**
  * Slotted grid item within 3up Grid
  */
  .cre8-c-grid--3up > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 50%;
    }

    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 33.3333%;
    }
  }

  /**
  * Slotted grid item within 1-3up Grid
  */
  .cre8-c-grid--1-3up > & {
    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 33.3333%;
    }
  }

  /**
  * Slotted grid item within 1 to 3up break faster (small to large screens) grid
  */
  .cre8-c-grid--1-3up.cre8-c-grid--break-faster > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 33.33%;
    }
  }

  /**
  * Slotted grid item within 2up break slower (small to large screens) Grid
  */
  .cre8-c-grid--1-3up.cre8-c-grid--break-slower > & {
    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 100%;
    }
    @media all and (min-width:$cre8-breakpoint-xl) {
      width: 33.33%;
    }
  }

  /**
  * Slotted grid item within 1-2-4up Grid
  */
  .cre8-c-grid--1-2-4up > & {
    @media all and (min-width:$cre8-breakpoint-sm) {
      width: 50%;
    }

    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 25%;
    }
  }

  /**
  * Slotted grid item within 1-2-4up Grid
  */
  .cre8-c-grid--1-4up > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 25%;
    }
  }

  /**
  * Slotted grid item within 4up Grid
  */
  .cre8-c-grid--4up > & {
    @media all and (min-width:$cre8-breakpoint-sm) {
      width: 50%;
    }

    @media all and (min-width:$cre8-breakpoint-md) {
      width: 33.3333%;
    }

    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 25%;
    }
  }

  /**
  * Slotted grid item within 4up Grid
  */
  .cre8-c-grid--2-4-6up > & {
    width: 50%;

    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 25%;
    }

    @media all and (min-width:$cre8-breakpoint-xl) {
      width: 16.66%;
    }
  }
}
`;var Le=Object.defineProperty,J=(s,e,t,i)=>{for(var r=void 0,n=s.length-1,o;n>=0;n--)(o=s[n])&&(r=o(e,t,r)||r);return r&&Le(e,t,r),r};const K=class K extends Ge{render(){const e=this.componentClassNames("cre8-c-grid",{"cre8-c-grid--side-by-side":this.variant==="side-by-side","cre8-c-grid--2up":this.variant==="2up","cre8-c-grid--3up":this.variant==="3up","cre8-c-grid--1-3up":this.variant==="1-3up","cre8-c-grid--4up":this.variant==="4up","cre8-c-grid--1-4up":this.variant==="1-4up","cre8-c-grid--1-2-4up":this.variant==="1-2-4up","cre8-c-grid--2-4-6up":this.variant==="2-4-6up","cre8-c-grid--gap-none":this.gap==="none","cre8-c-grid--gap-sm":this.gap==="sm","cre8-c-grid--gap-lg":this.gap==="lg","cre8-c-grid--break-faster":this.break==="faster","cre8-c-grid--break-slower":this.break==="slower"});return le`
      <div class="${e}">
        <slot></slot>
      </div>
    `}};K.styles=[De];let f=K;J([F()],f.prototype,"variant"),J([F()],f.prototype,"gap"),J([F()],f.prototype,"break"),customElements.get("cre8-grid")===void 0&&customElements.define("cre8-grid",f),w.Cre8Grid=f,w.default=f,Object.defineProperties(w,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
