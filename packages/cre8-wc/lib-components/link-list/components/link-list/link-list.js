(function(y,$){typeof exports=="object"&&typeof module<"u"?$(exports):typeof define=="function"&&define.amd?define(["exports"],$):(y=typeof globalThis<"u"?globalThis:y||self,$(y.LinkList={}))})(this,function(y){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ut;const $=globalThis,B=$.ShadowRoot&&($.ShadyCSS===void 0||$.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,I=Symbol(),G=new WeakMap;let Q=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==I)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(B&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=G.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&G.set(e,t))}return t}toString(){return this.cssText}};const ft=n=>new Q(typeof n=="string"?n:n+"",void 0,I),$t=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new Q(e,n,I)},mt=(n,t)=>{if(B)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=$.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},X=B?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ft(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:_t,defineProperty:vt,getOwnPropertyDescriptor:yt,getOwnPropertyNames:gt,getOwnPropertySymbols:At,getPrototypeOf:bt}=Object,m=globalThis,Y=m.trustedTypes,Et=Y?Y.emptyScript:"",q=m.reactiveElementPolyfillSupport,C=(n,t)=>n,R={toAttribute(n,t){switch(t){case Boolean:n=n?Et:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},V=(n,t)=>!_t(n,t),tt={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),m.litPropertyMetadata??(m.litPropertyMetadata=new WeakMap);let S=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=tt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&vt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=yt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const a=i==null?void 0:i.call(this);r==null||r.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??tt}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=bt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,s=[...gt(e),...At(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(X(i))}else t!==void 0&&e.push(X(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return mt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var r;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:R).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var r,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const a=s.getPropertyOptions(i),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((r=a.converter)==null?void 0:r.fromAttribute)!==void 0?a.converter:R;this._$Em=i,this[i]=l.fromAttribute(e,a.type)??((o=this._$Ej)==null?void 0:o.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const r=this.constructor,o=this[t];if(s??(s=r.getPropertyOptions(t)),!((s.hasChanged??V)(o,e)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,o]of i){const{wrapped:a}=o,l=this[r];a!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[C("elementProperties")]=new Map,S[C("finalized")]=new Map,q==null||q({ReactiveElement:S}),(m.reactiveElementVersions??(m.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,j=P.trustedTypes,et=j?j.createPolicy("lit-html",{createHTML:n=>n}):void 0,st="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,it="?"+_,St=`<${it}>`,g=document,x=()=>g.createComment(""),O=n=>n===null||typeof n!="object"&&typeof n!="function",W=Array.isArray,wt=n=>W(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",F=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nt=/-->/g,rt=/>/g,A=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ot=/'/g,lt=/"/g,at=/^(?:script|style|textarea|title)$/i,kt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),ct=kt(1),w=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ht=new WeakMap,b=g.createTreeWalker(g,129);function dt(n,t){if(!W(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return et!==void 0?et.createHTML(t):t}const Ct=(n,t)=>{const e=n.length-1,s=[];let i,r=t===2?"<svg>":t===3?"<math>":"",o=U;for(let a=0;a<e;a++){const l=n[a];let d,p,c=-1,f=0;for(;f<l.length&&(o.lastIndex=f,p=o.exec(l),p!==null);)f=o.lastIndex,o===U?p[1]==="!--"?o=nt:p[1]!==void 0?o=rt:p[2]!==void 0?(at.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=A):p[3]!==void 0&&(o=A):o===A?p[0]===">"?(o=i??U,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?A:p[3]==='"'?lt:ot):o===lt||o===ot?o=A:o===nt||o===rt?o=U:(o=A,i=void 0);const v=o===A&&n[a+1].startsWith("/>")?" ":"";r+=o===U?l+St:c>=0?(s.push(d),l.slice(0,c)+st+l.slice(c)+_+v):l+_+(c===-2?a:v)}return[dt(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class M{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const a=t.length-1,l=this.parts,[d,p]=Ct(t,e);if(this.el=M.createElement(d,s),b.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=b.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(st)){const f=p[o++],v=i.getAttribute(c).split(_),L=/([.?@])?(.*)/.exec(f);l.push({type:1,index:r,name:L[2],strings:v,ctor:L[1]==="."?xt:L[1]==="?"?Ot:L[1]==="@"?Ut:D}),i.removeAttribute(c)}else c.startsWith(_)&&(l.push({type:6,index:r}),i.removeAttribute(c));if(at.test(i.tagName)){const c=i.textContent.split(_),f=c.length-1;if(f>0){i.textContent=j?j.emptyScript:"";for(let v=0;v<f;v++)i.append(c[v],x()),b.nextNode(),l.push({type:2,index:++r});i.append(c[f],x())}}}else if(i.nodeType===8)if(i.data===it)l.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(_,c+1))!==-1;)l.push({type:7,index:r}),c+=_.length-1}r++}}static createElement(t,e){const s=g.createElement("template");return s.innerHTML=t,s}}function k(n,t,e=n,s){var o,a;if(t===w)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const r=O(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((a=i==null?void 0:i._$AO)==null||a.call(i,!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=k(n,i._$AS(n,t.values),i,s)),t}class Pt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??g).importNode(e,!0);b.currentNode=i;let r=b.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new N(r,r.nextSibling,this,t):l.type===1?d=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(d=new Mt(r,this,t)),this._$AV.push(d),l=s[++a]}o!==(l==null?void 0:l.index)&&(r=b.nextNode(),o++)}return b.currentNode=g,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class N{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=k(this,t,e),O(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):wt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(g.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=M.createElement(dt(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(e);else{const o=new Pt(i,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(t){let e=ht.get(t.strings);return e===void 0&&ht.set(t.strings,e=new M(t)),e}k(t){W(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new N(this.O(x()),this.O(x()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class D{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(r===void 0)t=k(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{const a=t;let l,d;for(t=r[0],l=0;l<r.length-1;l++)d=k(this,a[s+l],e,l),d===w&&(d=this._$AH[l]),o||(o=!O(d)||d!==this._$AH[l]),d===h?t=h:t!==h&&(t+=(d??"")+r[l+1]),this._$AH[l]=d}o&&!i&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class xt extends D{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}}class Ot extends D{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}}class Ut extends D{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=k(this,t,e,0)??h)===w)return;const s=this._$AH,i=t===h&&s!==h||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Mt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){k(this,t)}}const J=P.litHtmlPolyfillSupport;J==null||J(M,N),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.0");const Nt=(n,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const r=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new N(t.insertBefore(x(),r),r,void 0,e??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=globalThis;class T extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Nt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return w}}T._$litElement$=!0,T.finalized=!0,(ut=E.litElementHydrateSupport)==null||ut.call(E,{LitElement:T});const K=E.litElementPolyfillSupport;K==null||K({LitElement:T}),(E.litElementVersions??(E.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:V},Ht=(n=Tt,t,e)=>{const{kind:s,metadata:i}=e;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),s==="setter"&&((n=Object.create(n)).wrapped=!0),r.set(e.name,n),s==="accessor"){const{name:o}=e;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(o,l,n)},init(a){return a!==void 0&&this.C(o,void 0,n,a),a}}}if(s==="setter"){const{name:o}=e;return function(a){const l=this[o];t.call(this,a),this.requestUpdate(o,l,n)}}throw Error("Unsupported decorator location: "+s)};function H(n){return(t,e)=>typeof e=="object"?Ht(n,t,e):((s,i,r)=>{const o=i.hasOwnProperty(r);return i.constructor.createProperty(r,s),o?Object.getOwnPropertyDescriptor(i,r):void 0})(n,t,e)}function zt(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var pt={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(n){(function(){var t={}.hasOwnProperty;function e(){for(var s=[],i=0;i<arguments.length;i++){var r=arguments[i];if(r){var o=typeof r;if(o==="string"||o==="number")s.push(r);else if(Array.isArray(r)){if(r.length){var a=e.apply(null,r);a&&s.push(a)}}else if(o==="object"){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){s.push(r.toString());continue}for(var l in r)t.call(r,l)&&r[l]&&s.push(l)}}}return s.join(" ")}n.exports?(e.default=e,n.exports=e):window.classNames=e})()})(pt);var Rt=pt.exports;const jt=zt(Rt);class Dt extends T{componentClassNames(t,e={}){return jt(t,e)}slotEmpty(t){return!this.querySelector(`[slot="${t}"]`)}slotNotEmpty(t){return this.slotEmpty(t)?null:!this.slotEmpty(t)}dispatch({e:t,eventName:e,detailObj:s={},optionsObj:i={}}){const r={bubbles:!0,composed:!0,...i,detail:{...t&&{originalEvent:t},...s}},o=new CustomEvent(e,r);return this.dispatchEvent(o),o}render(){return ct`<slot></slot>`}}const Lt=$t`@import '../../design-tokens/core/scss/theming/component';
/**
 * A list of hyperlinks
 * 1) Override preset line-height value to condense link text. Note: this should
 *    be done sparingly to control wrapping text for specific scenarios
 */
.cre8-c-link-list {
  @include cre8-typography-body-default;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-top: calc(var(--size-base-unit) * -2);
  list-style: none;

  /**
  * Slotted link list item
  */
  ::slotted(cre8-link-list-item) {
    margin-top: calc(var(--size-base-unit) * 2);
  }
}

/**
 * A secondary link list
 * 1) Uses a more subtle treatment than the default link list
 * 2) TODO: Create a tier 2 token for secondary link colors
 */
.cre8-c-link-list--secondary {
  --cre8-link-list-item-active-text-color: var(--cre8-color-content-default); /* 2 */
  color: var(--cre8-color-content-subtle);
}

/**
 * Inverted link list
 * 1) Link list on a dark background
 */
.cre8-c-link-list--inverted {
  --cre8-link-list-link-color: var(--cre8-color-content-knockout);
}

/**
* Display link list
*/
.cre8-c-link-list--display {
  color: var(--cre8-color-content-strong);
}

/**
 * Condensed link list
 * 1) Removes spacing between link list items
 */
.cre8-c-link-list--condensed {
  margin-top: calc(var(--size-base-unit) * -1.25);

  /**
  * Slotted link list item within condensed link list
  */
  ::slotted(cre8-link-list-item) {
    margin-top: calc(var(--size-base-unit) * 1.25);
  }
}

/**
 * Small link list
 */
.cre8-c-link-list--sm {
  @include cre8-typography-body-small;
}

/**
 * Horizontal behavior
 * 1) Displays as a horizontal list
 */
.cre8-c-link-list--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  margin: calc(var(--size-base-unit) * -1) 0 0 calc(var(--size-base-unit) * -2);

  /**
  * Slotted link list item within horizontal link list
  */
  ::slotted(cre8-link-list-item) {
    margin-top: calc(var(--size-base-unit) * 1);
    margin-left: calc(var(--size-base-unit) * 2);
  }
}

/**
 * Responsive behavior
 * 1) Displays as a horizontal list on small screens and moves to a vertical
 */
.cre8-c-link-list--responsive {
  @media all and (max-width:$cre8-breakpoint-md) {
    flex-direction: row;
    flex-wrap: wrap;
    margin: calc(var(--size-base-unit) * -1) 0 0 calc(var(--size-base-unit) * -2);

    /**
    * Slotted link list item within responsive link list
    */
    ::slotted(cre8-link-list-item) {
      margin-top: calc(var(--size-base-unit) * 1);
      margin-left: calc(var(--size-base-unit) * 2);
    }
  }
}
`;var Bt=Object.defineProperty,z=(n,t,e,s)=>{for(var i=void 0,r=n.length-1,o;r>=0;r--)(o=n[r])&&(i=o(t,e,i)||i);return i&&Bt(t,e,i),i};const Z=class Z extends Dt{render(){const t=this.componentClassNames("cre8-c-link-list",{"cre8-c-link-list--secondary":this.variant==="secondary","cre8-c-link-list--display":this.variant==="display","cre8-c-link-list--inverted":this.inverted===!0,"cre8-c-link-list--responsive":this.behavior==="responsive","cre8-c-link-list--horizontal":this.behavior==="horizontal","cre8-c-link-list--condensed":this.spacing==="condensed","cre8-c-link-list--sm":this.size==="sm"});return ct`
      <ul class="${t}">
        <slot></slot>
      </ul>
    `}};Z.styles=[Lt];let u=Z;z([H()],u.prototype,"behavior"),z([H({type:Boolean,reflect:!0})],u.prototype,"inverted"),z([H()],u.prototype,"size"),z([H()],u.prototype,"spacing"),z([H()],u.prototype,"variant"),customElements.get("cre8-link-list")===void 0&&customElements.define("cre8-link-list",u),y.Cre8LinkList=u,y.default=u,Object.defineProperties(y,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
