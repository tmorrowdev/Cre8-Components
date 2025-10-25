(function(A,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(A=typeof globalThis<"u"?globalThis:A||self,f(A.Heading={}))})(this,function(A){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ue;const f=globalThis,B=f.ShadowRoot&&(f.ShadyCSS===void 0||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,I=Symbol(),Q=new WeakMap;let X=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==I)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(B&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=Q.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Q.set(t,e))}return e}toString(){return this.cssText}};const ge=r=>new X(typeof r=="string"?r:r+"",void 0,I),fe=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((s,i,n)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new X(t,r,I)},$e=(r,e)=>{if(B)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=f.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},Y=B?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return ge(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:me,defineProperty:ye,getOwnPropertyDescriptor:_e,getOwnPropertyNames:Ae,getOwnPropertySymbols:ve,getPrototypeOf:be}=Object,$=globalThis,ee=$.trustedTypes,Ee=ee?ee.emptyScript:"",q=$.reactiveElementPolyfillSupport,x=(r,e)=>r,j={toAttribute(r,e){switch(e){case Boolean:r=r?Ee:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},W=(r,e)=>!me(r,e),te={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=te){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&ye(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:n}=_e(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:i,set(a){const l=i==null?void 0:i.call(this);n==null||n.call(this,a),this.requestUpdate(e,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??te}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const e=be(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,s=[...Ae(t),...ve(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(Y(i))}else e!==void 0&&t.push(Y(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $e(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var n;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const a=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:j).toAttribute(t,s.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){var n,a;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),o=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:j;this._$Em=i,this[i]=o.fromAttribute(t,l.type)??((a=this._$Ej)==null?void 0:a.get(i))??null,this._$Em=null}}requestUpdate(e,t,s){var i;if(e!==void 0){const n=this.constructor,a=this[e];if(s??(s=n.getPropertyOptions(e)),!((s.hasChanged??W)(a,t)||s.useDefault&&s.reflect&&a===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:n},a){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),n!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,a]of this._$Ep)this[n]=a;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,a]of i){const{wrapped:l}=a,o=this[n];l!==!0||this._$AL.has(n)||o===void 0||this.C(n,void 0,a,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[x("elementProperties")]=new Map,w[x("finalized")]=new Map,q==null||q({ReactiveElement:w}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=globalThis,k=H.trustedTypes,se=k?k.createPolicy("lit-html",{createHTML:r=>r}):void 0,ie="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,re="?"+m,Se=`<${re}>`,v=document,O=()=>v.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",F=Array.isArray,we=r=>F(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",J=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ne=/-->/g,ae=/>/g,b=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),oe=/'/g,le=/"/g,he=/^(?:script|style|textarea|title)$/i,Ce=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),y=Ce(1),C=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ce=new WeakMap,E=v.createTreeWalker(v,129);function de(r,e){if(!F(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return se!==void 0?se.createHTML(e):e}const Pe=(r,e)=>{const t=r.length-1,s=[];let i,n=e===2?"<svg>":e===3?"<math>":"",a=M;for(let l=0;l<t;l++){const o=r[l];let d,p,h=-1,g=0;for(;g<o.length&&(a.lastIndex=g,p=a.exec(o),p!==null);)g=a.lastIndex,a===M?p[1]==="!--"?a=ne:p[1]!==void 0?a=ae:p[2]!==void 0?(he.test(p[2])&&(i=RegExp("</"+p[2],"g")),a=b):p[3]!==void 0&&(a=b):a===b?p[0]===">"?(a=i??M,h=-1):p[1]===void 0?h=-2:(h=a.lastIndex-p[2].length,d=p[1],a=p[3]===void 0?b:p[3]==='"'?le:oe):a===le||a===oe?a=b:a===ne||a===ae?a=M:(a=b,i=void 0);const _=a===b&&r[l+1].startsWith("/>")?" ":"";n+=a===M?o+Se:h>=0?(s.push(d),o.slice(0,h)+ie+o.slice(h)+m+_):o+m+(h===-2?l:_)}return[de(r,n+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class N{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let n=0,a=0;const l=e.length-1,o=this.parts,[d,p]=Pe(e,t);if(this.el=N.createElement(d,s),E.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=E.nextNode())!==null&&o.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(ie)){const g=p[a++],_=i.getAttribute(h).split(m),z=/([.?@])?(.*)/.exec(g);o.push({type:1,index:n,name:z[2],strings:_,ctor:z[1]==="."?He:z[1]==="?"?Oe:z[1]==="@"?Ue:D}),i.removeAttribute(h)}else h.startsWith(m)&&(o.push({type:6,index:n}),i.removeAttribute(h));if(he.test(i.tagName)){const h=i.textContent.split(m),g=h.length-1;if(g>0){i.textContent=k?k.emptyScript:"";for(let _=0;_<g;_++)i.append(h[_],O()),E.nextNode(),o.push({type:2,index:++n});i.append(h[g],O())}}}else if(i.nodeType===8)if(i.data===re)o.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf(m,h+1))!==-1;)o.push({type:7,index:n}),h+=m.length-1}n++}}static createElement(e,t){const s=v.createElement("template");return s.innerHTML=e,s}}function P(r,e,t=r,s){var a,l;if(e===C)return e;let i=s!==void 0?(a=t._$Co)==null?void 0:a[s]:t._$Cl;const n=U(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=P(r,i._$AS(r,e.values),i,s)),e}class xe{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??v).importNode(t,!0);E.currentNode=i;let n=E.nextNode(),a=0,l=0,o=s[0];for(;o!==void 0;){if(a===o.index){let d;o.type===2?d=new T(n,n.nextSibling,this,e):o.type===1?d=new o.ctor(n,o.name,o.strings,this,e):o.type===6&&(d=new Me(n,this,e)),this._$AV.push(d),o=s[++l]}a!==(o==null?void 0:o.index)&&(n=E.nextNode(),a++)}return E.currentNode=v,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class T{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),U(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==C&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):we(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(v.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=N.createElement(de(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const a=new xe(i,this),l=a.u(this.options);a.p(t),this.T(l),this._$AH=a}}_$AC(e){let t=ce.get(e.strings);return t===void 0&&ce.set(e.strings,t=new N(e)),t}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const n of e)i===t.length?t.push(s=new T(this.O(O()),this.O(O()),this,this.options)):s=t[i],s._$AI(n),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class D{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(e,t=this,s,i){const n=this.strings;let a=!1;if(n===void 0)e=P(this,e,t,0),a=!U(e)||e!==this._$AH&&e!==C,a&&(this._$AH=e);else{const l=e;let o,d;for(e=n[0],o=0;o<n.length-1;o++)d=P(this,l[s+o],t,o),d===C&&(d=this._$AH[o]),a||(a=!U(d)||d!==this._$AH[o]),d===c?e=c:e!==c&&(e+=(d??"")+n[o+1]),this._$AH[o]=d}a&&!i&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class He extends D{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class Oe extends D{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class Ue extends D{constructor(e,t,s,i,n){super(e,t,s,i,n),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??c)===C)return;const s=this._$AH,i=e===c&&s!==c||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Me{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}}const K=H.litHtmlPolyfillSupport;K==null||K(N,T),(H.litHtmlVersions??(H.litHtmlVersions=[])).push("3.3.0");const Ne=(r,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new T(e.insertBefore(O(),n),n,void 0,t??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=globalThis;class R extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ne(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return C}}R._$litElement$=!0,R.finalized=!0,(ue=S.litElementHydrateSupport)==null||ue.call(S,{LitElement:R});const Z=S.litElementPolyfillSupport;Z==null||Z({LitElement:R}),(S.litElementVersions??(S.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Te={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:W},Re=(r=Te,e,t)=>{const{kind:s,metadata:i}=t;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(t.name,r),s==="accessor"){const{name:a}=t;return{set(l){const o=e.get.call(this);e.set.call(this,l),this.requestUpdate(a,o,r)},init(l){return l!==void 0&&this.C(a,void 0,r,l),l}}}if(s==="setter"){const{name:a}=t;return function(l){const o=this[a];e.call(this,l),this.requestUpdate(a,o,r)}}throw Error("Unsupported decorator location: "+s)};function V(r){return(e,t)=>typeof t=="object"?Re(r,e,t):((s,i,n)=>{const a=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),a?Object.getOwnPropertyDescriptor(i,n):void 0})(r,e,t)}function je(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var pe={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(r){(function(){var e={}.hasOwnProperty;function t(){for(var s=[],i=0;i<arguments.length;i++){var n=arguments[i];if(n){var a=typeof n;if(a==="string"||a==="number")s.push(n);else if(Array.isArray(n)){if(n.length){var l=t.apply(null,n);l&&s.push(l)}}else if(a==="object"){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){s.push(n.toString());continue}for(var o in n)e.call(n,o)&&n[o]&&s.push(o)}}}return s.join(" ")}r.exports?(t.default=t,r.exports=t):window.classNames=t})()})(pe);var ke=pe.exports;const De=je(ke);class Ve extends R{componentClassNames(e,t={}){return De(e,t)}slotEmpty(e){return!this.querySelector(`[slot="${e}"]`)}slotNotEmpty(e){return this.slotEmpty(e)?null:!this.slotEmpty(e)}dispatch({e,eventName:t,detailObj:s={},optionsObj:i={}}){const n={bubbles:!0,composed:!0,...i,detail:{...e&&{originalEvent:e},...s}},a=new CustomEvent(t,n);return this.dispatchEvent(a),a}render(){return y`<slot></slot>`}}const Le=fe`@import '../../design-tokens/core/scss/theming/component';


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
`;var ze=Object.defineProperty,L=(r,e,t,s)=>{for(var i=void 0,n=r.length-1,a;n>=0;n--)(a=r[n])&&(i=a(e,t,i)||i);return i&&ze(e,t,i),i};const G=class G extends Ve{constructor(){super(...arguments),this.tagVariant="h5"}render(){const e=this.type?{}:{"cre8-c-heading--headline-large":this.tagVariant==="h1","cre8-c-heading--headline-default":this.tagVariant==="h2","cre8-c-heading--headline-small":this.tagVariant==="h3","cre8-c-heading--title-large":this.tagVariant==="h4","cre8-c-heading--title-default":this.tagVariant==="h5","cre8-c-heading--title-small":this.tagVariant==="h6"},t=this.componentClassNames("cre8-c-heading",{...e,"cre8-c-heading--headline-large":this.type==="headline-large","cre8-c-heading--headline-default":this.type==="headline-default","cre8-c-heading--headline-small":this.type==="headline-small","cre8-c-heading--title-large":this.type==="title-large","cre8-c-heading--title-default":this.type==="title-default","cre8-c-heading--title-small":this.type==="title-small","cre8-c-heading--title-xlarge":this.type==="title-xlarge","cre8-c-heading--display-default":this.type==="display-default","cre8-c-heading--display-small":this.type==="display-small","cre8-c-heading--label-large":this.type==="label-large","cre8-c-heading--label-default":this.type==="label-default","cre8-c-heading--label-small":this.type==="label-small","cre8-c-heading--meta-large":this.type==="meta-large","cre8-c-heading--meta-default":this.type==="meta-default","cre8-c-heading--meta-small":this.type==="meta-small","cre8-c-heading--brand-color":this.brandColor,"cre8-c-heading--inverted":this.inverted});switch(this.tagVariant){case"h1":return y` <h1 part="tag" class="${t}"><slot></slot></h1> `;case"h2":return y` <h2 part="tag" class="${t}"><slot></slot></h2> `;case"h3":return y` <h3 part="tag" class="${t}"><slot></slot></h3> `;case"h4":return y` <h4 part="tag" class="${t}"><slot></slot></h4> `;case"h5":return y` <h5 part="tag" class="${t}"><slot></slot></h5> `;case"h6":return y` <h6 part="tag" class="${t}"><slot></slot></h6> `;default:return y` <h4 part="tag" class="${t}"><slot></slot></h4> `}}};G.styles=[Le];let u=G;L([V()],u.prototype,"type"),L([V()],u.prototype,"tagVariant"),L([V({type:Boolean,reflect:!0})],u.prototype,"inverted"),L([V({type:Boolean,reflect:!0})],u.prototype,"brandColor"),customElements.get("cre8-heading")===void 0&&customElements.define("cre8-heading",u),A.Cre8Heading=u,A.default=u,Object.defineProperties(A,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
