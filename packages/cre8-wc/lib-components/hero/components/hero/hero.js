(function(y,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(y=typeof globalThis<"u"?globalThis:y||self,f(y.Hero={}))})(this,function(y){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ut;const f=globalThis,D=f.ShadowRoot&&(f.ShadyCSS===void 0||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,L=Symbol(),G=new WeakMap;let Q=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==L)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(D&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=G.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&G.set(e,t))}return t}toString(){return this.cssText}};const ft=n=>new Q(typeof n=="string"?n:n+"",void 0,L),mt=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new Q(e,n,L)},$t=(n,t)=>{if(D)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=f.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},X=D?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return ft(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:gt,defineProperty:_t,getOwnPropertyDescriptor:yt,getOwnPropertyNames:vt,getOwnPropertySymbols:At,getPrototypeOf:bt}=Object,m=globalThis,Y=m.trustedTypes,Et=Y?Y.emptyScript:"",B=m.reactiveElementPolyfillSupport,C=(n,t)=>n,j={toAttribute(n,t){switch(t){case Boolean:n=n?Et:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},I=(n,t)=>!gt(n,t),tt={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),m.litPropertyMetadata??(m.litPropertyMetadata=new WeakMap);let S=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=tt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&_t(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=yt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){const h=s==null?void 0:s.call(this);r==null||r.call(this,o),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??tt}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=bt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,i=[...vt(e),...At(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(X(s))}else t!==void 0&&e.push(X(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $t(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var r;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const o=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:j).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){var r,o;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const h=i.getPropertyOptions(s),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((r=h.converter)==null?void 0:r.fromAttribute)!==void 0?h.converter:j;this._$Em=s,this[s]=a.fromAttribute(e,h.type)??((o=this._$Ej)==null?void 0:o.get(s))??null,this._$Em=null}}requestUpdate(t,e,i){var s;if(t!==void 0){const r=this.constructor,o=this[t];if(i??(i=r.getPropertyOptions(t)),!((i.hasChanged??I)(o,e)||i.useDefault&&i.reflect&&o===((s=this._$Ej)==null?void 0:s.get(t))&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,o]of s){const{wrapped:h}=o,a=this[r];h!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[C("elementProperties")]=new Map,S[C("finalized")]=new Map,B==null||B({ReactiveElement:S}),(m.reactiveElementVersions??(m.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=globalThis,k=x.trustedTypes,et=k?k.createPolicy("lit-html",{createHTML:n=>n}):void 0,it="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,st="?"+$,St=`<${st}>`,v=document,O=()=>v.createComment(""),H=n=>n===null||typeof n!="object"&&typeof n!="function",q=Array.isArray,wt=n=>q(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",V=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nt=/-->/g,rt=/>/g,A=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ot=/'/g,at=/"/g,ht=/^(?:script|style|textarea|title)$/i,Pt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),lt=Pt(1),w=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ct=new WeakMap,b=v.createTreeWalker(v,129);function dt(n,t){if(!q(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return et!==void 0?et.createHTML(t):t}const Ct=(n,t)=>{const e=n.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",o=U;for(let h=0;h<e;h++){const a=n[h];let d,p,l=-1,u=0;for(;u<a.length&&(o.lastIndex=u,p=o.exec(a),p!==null);)u=o.lastIndex,o===U?p[1]==="!--"?o=nt:p[1]!==void 0?o=rt:p[2]!==void 0?(ht.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=A):p[3]!==void 0&&(o=A):o===A?p[0]===">"?(o=s??U,l=-1):p[1]===void 0?l=-2:(l=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?A:p[3]==='"'?at:ot):o===at||o===ot?o=A:o===nt||o===rt?o=U:(o=A,s=void 0);const _=o===A&&n[h+1].startsWith("/>")?" ":"";r+=o===U?a+St:l>=0?(i.push(d),a.slice(0,l)+it+a.slice(l)+$+_):a+$+(l===-2?h:_)}return[dt(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class M{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const h=t.length-1,a=this.parts,[d,p]=Ct(t,e);if(this.el=M.createElement(d,i),b.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=b.nextNode())!==null&&a.length<h;){if(s.nodeType===1){if(s.hasAttributes())for(const l of s.getAttributeNames())if(l.endsWith(it)){const u=p[o++],_=s.getAttribute(l).split($),z=/([.?@])?(.*)/.exec(u);a.push({type:1,index:r,name:z[2],strings:_,ctor:z[1]==="."?Ot:z[1]==="?"?Ht:z[1]==="@"?Ut:R}),s.removeAttribute(l)}else l.startsWith($)&&(a.push({type:6,index:r}),s.removeAttribute(l));if(ht.test(s.tagName)){const l=s.textContent.split($),u=l.length-1;if(u>0){s.textContent=k?k.emptyScript:"";for(let _=0;_<u;_++)s.append(l[_],O()),b.nextNode(),a.push({type:2,index:++r});s.append(l[u],O())}}}else if(s.nodeType===8)if(s.data===st)a.push({type:2,index:r});else{let l=-1;for(;(l=s.data.indexOf($,l+1))!==-1;)a.push({type:7,index:r}),l+=$.length-1}r++}}static createElement(t,e){const i=v.createElement("template");return i.innerHTML=t,i}}function P(n,t,e=n,i){var o,h;if(t===w)return t;let s=i!==void 0?(o=e._$Co)==null?void 0:o[i]:e._$Cl;const r=H(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((h=s==null?void 0:s._$AO)==null||h.call(s,!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=P(n,s._$AS(n,t.values),s,i)),t}class xt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??v).importNode(e,!0);b.currentNode=s;let r=b.nextNode(),o=0,h=0,a=i[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new N(r,r.nextSibling,this,t):a.type===1?d=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(d=new Mt(r,this,t)),this._$AV.push(d),a=i[++h]}o!==(a==null?void 0:a.index)&&(r=b.nextNode(),o++)}return b.currentNode=v,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class N{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),H(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):wt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(v.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=M.createElement(dt(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(e);else{const o=new xt(s,this),h=o.u(this.options);o.p(e),this.T(h),this._$AH=o}}_$AC(t){let e=ct.get(t.strings);return e===void 0&&ct.set(t.strings,e=new M(t)),e}k(t){q(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new N(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(r===void 0)t=P(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{const h=t;let a,d;for(t=r[0],a=0;a<r.length-1;a++)d=P(this,h[i+a],e,a),d===w&&(d=this._$AH[a]),o||(o=!H(d)||d!==this._$AH[a]),d===c?t=c:t!==c&&(t+=(d??"")+r[a+1]),this._$AH[a]=d}o&&!s&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ot extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class Ht extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class Ut extends R{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??c)===w)return;const i=this._$AH,s=t===c&&i!==c||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Mt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const W=x.litHtmlPolyfillSupport;W==null||W(M,N),(x.litHtmlVersions??(x.litHtmlVersions=[])).push("3.3.0");const Nt=(n,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const r=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new N(t.insertBefore(O(),r),r,void 0,e??{})}return s._$AI(n),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=globalThis;class T extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return w}}T._$litElement$=!0,T.finalized=!0,(ut=E.litElementHydrateSupport)==null||ut.call(E,{LitElement:T});const F=E.litElementPolyfillSupport;F==null||F({LitElement:T}),(E.litElementVersions??(E.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:I},jt=(n=Tt,t,e)=>{const{kind:i,metadata:s}=e;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(e.name,n),i==="accessor"){const{name:o}=e;return{set(h){const a=t.get.call(this);t.set.call(this,h),this.requestUpdate(o,a,n)},init(h){return h!==void 0&&this.C(o,void 0,n,h),h}}}if(i==="setter"){const{name:o}=e;return function(h){const a=this[o];t.call(this,h),this.requestUpdate(o,a,n)}}throw Error("Unsupported decorator location: "+i)};function J(n){return(t,e)=>typeof e=="object"?jt(n,t,e):((i,s,r)=>{const o=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),o?Object.getOwnPropertyDescriptor(s,r):void 0})(n,t,e)}function kt(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var pt={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(n){(function(){var t={}.hasOwnProperty;function e(){for(var i=[],s=0;s<arguments.length;s++){var r=arguments[s];if(r){var o=typeof r;if(o==="string"||o==="number")i.push(r);else if(Array.isArray(r)){if(r.length){var h=e.apply(null,r);h&&i.push(h)}}else if(o==="object"){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){i.push(r.toString());continue}for(var a in r)t.call(r,a)&&r[a]&&i.push(a)}}}return i.join(" ")}n.exports?(e.default=e,n.exports=e):window.classNames=e})()})(pt);var Rt=pt.exports;const zt=kt(Rt);class Dt extends T{componentClassNames(t,e={}){return zt(t,e)}slotEmpty(t){return!this.querySelector(`[slot="${t}"]`)}slotNotEmpty(t){return this.slotEmpty(t)?null:!this.slotEmpty(t)}dispatch({e:t,eventName:e,detailObj:i={},optionsObj:s={}}){const r={bubbles:!0,composed:!0,...s,detail:{...t&&{originalEvent:t},...i}},o=new CustomEvent(e,r);return this.dispatchEvent(o),o}render(){return lt`<slot></slot>`}}const Lt=mt`@import '../../design-tokens/core/scss/theming/component';

// #HERO

/**
 * 1) Block with an image and overlay on medium and large screens
 */
.cre8-c-hero {
  position: relative;
  margin-bottom: calc(var(--size-base-unit) * 4);

  @media all and (min-width:$cre8-breakpoint-md) {
    height: 40vh;
  }
}

/**
 * Hero image
 */
.cre8-c-hero__image {
  width: 100%;
  height: 100%;

  @media all and (min-width:$cre8-breakpoint-md) {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
  }
}

/**
 * Hero body
 * 1) Content is placed in the bottom left part of the image on medium/large screens by default
 */
.cre8-c-hero__body {
  display: flex;
  flex-direction: column;
  padding-top: calc(var(--size-base-unit) * 2);

  @media all and (min-width:$cre8-breakpoint-md) {
    position: absolute;
    align-items: flex-start;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    padding-top: calc(var(--size-base-unit) * 4);
    padding-bottom: calc(var(--size-base-unit) * 4);
  }

  /**
   * Hero body within align top left variant
   * 1) Place body content in the top left part of the image on medium/large screens
   */
  .cre8-c-hero--top-left & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-start;
      align-items: flex-start;
    }
  }

  /**
   * Hero body within align left variant
   * 1) Place body content along left part of the image and vertically centered on medium/large screens
   */
  .cre8-c-hero--left & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: center;
    }
  }

  /**
   * Hero body within align top center variant
   * 1) Place body content in the top center part of the image on medium/large screens
   */
  .cre8-c-hero--top-center & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-start;
      align-items: center;
    }
  }

  /**
   * Hero body within align center variant
   * 1) Place body content horizontally and vertically centered overlaying the image on medium/large screens
   */
  .cre8-c-hero--center & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: center;
      align-items: center;
    }
  }

  /**
   * Hero body within align bottom center variant
   * 1) Place body content in the bottom center part of the image on medium/large screens
   */
  .cre8-c-hero--bottom-center & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-end;
      align-items: center;
    }
  }
  .cre8-c-hero--top-right & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-start;
      align-items: flex-end;
    }
  }

  /**
   * Hero body within align right variant
   * 1) Place body content along right part of the image and vertically centered on medium/large screens
   */
  .cre8-c-hero--right & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: center;
      align-items: flex-end;
    }
  }

  /**
   * Hero body within align bottom right variant
   * 1) Place body content in the bottom right part of the image on medium/large screens
   */
  .cre8-c-hero--bottom-right & {
    @media all and (min-width:$cre8-breakpoint-md) {
      justify-content: flex-end;
      align-items: flex-end;
    }
  }
}
`;var Bt=Object.defineProperty,K=(n,t,e,i)=>{for(var s=void 0,r=n.length-1,o;r>=0;r--)(o=n[r])&&(s=o(t,e,s)||s);return s&&Bt(t,e,s),s};const Z=class Z extends Dt{render(){const t=this.componentClassNames("cre8-c-hero",{"cre8-c-hero--top-left":this.align==="top-left","cre8-c-hero--left":this.align==="left","cre8-c-hero--top-center":this.align==="top-center","cre8-c-hero--center":this.align==="center","cre8-c-hero--bottom-center":this.align==="bottom-center","cre8-c-hero--top-right":this.align==="top-right","cre8-c-hero--right":this.align==="right","cre8-c-hero--bottom-right":this.align==="bottom-right"});return lt`
      <div class="${t}">
        <cre8-layout-container>
          <img class="cre8-c-hero__image" src="${this.imgSrc}" alt="${this.imgAlt}" />
          <div class="cre8-c-hero__body">
            <slot></slot>
          </div>
        </cre8-layout-container>
      </div>
    `}};Z.styles=[Lt];let g=Z;K([J()],g.prototype,"imgSrc"),K([J()],g.prototype,"imgAlt"),K([J()],g.prototype,"align"),customElements.get("cre8-hero")===void 0&&customElements.define("cre8-hero",g),y.Cre8Hero=g,y.default=g,Object.defineProperties(y,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
