(function(b,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(b=typeof globalThis<"u"?globalThis:b||self,f(b.Cre8TableObject={}))})(this,function(b){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pe;const f=globalThis,j=f.ShadowRoot&&(f.ShadyCSS===void 0||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,L=Symbol(),K=new WeakMap;let Z=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==L)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(j&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=K.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&K.set(t,e))}return e}toString(){return this.cssText}};const ye=a=>new Z(typeof a=="string"?a:a+"",void 0,L),de=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((r,o,i)=>r+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+a[i+1],a[0]);return new Z(t,a,L)},fe=(a,e)=>{if(j)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),o=f.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=t.cssText,a.appendChild(r)}},G=j?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return ye(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ge,defineProperty:me,getOwnPropertyDescriptor:ue,getOwnPropertyNames:be,getOwnPropertySymbols:ve,getPrototypeOf:xe}=Object,g=globalThis,J=g.trustedTypes,$e=J?J.emptyScript:"",B=g.reactiveElementPolyfillSupport,A=(a,e)=>a,D={toAttribute(a,e){switch(e){case Boolean:a=a?$e:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},Y=(a,e)=>!ge(a,e),Q={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:Y};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),g.litPropertyMetadata??(g.litPropertyMetadata=new WeakMap);let _=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Q){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(e,r,t);o!==void 0&&me(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){const{get:o,set:i}=ue(this.prototype,e)??{get(){return this[t]},set(l){this[t]=l}};return{get:o,set(l){const s=o==null?void 0:o.call(this);i==null||i.call(this,l),this.requestUpdate(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Q}static _$Ei(){if(this.hasOwnProperty(A("elementProperties")))return;const e=xe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(A("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(A("properties"))){const t=this.properties,r=[...be(t),...ve(t)];for(const o of r)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,o]of t)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const o=this._$Eu(t,r);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const o of r)t.unshift(G(o))}else e!==void 0&&t.push(G(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fe(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){var i;const r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(o!==void 0&&r.reflect===!0){const l=(((i=r.converter)==null?void 0:i.toAttribute)!==void 0?r.converter:D).toAttribute(t,r.type);this._$Em=e,l==null?this.removeAttribute(o):this.setAttribute(o,l),this._$Em=null}}_$AK(e,t){var i,l;const r=this.constructor,o=r._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const s=r.getPropertyOptions(o),n=typeof s.converter=="function"?{fromAttribute:s.converter}:((i=s.converter)==null?void 0:i.fromAttribute)!==void 0?s.converter:D;this._$Em=o,this[o]=n.fromAttribute(t,s.type)??((l=this._$Ej)==null?void 0:l.get(o))??null,this._$Em=null}}requestUpdate(e,t,r){var o;if(e!==void 0){const i=this.constructor,l=this[e];if(r??(r=i.getPropertyOptions(e)),!((r.hasChanged??Y)(l,t)||r.useDefault&&r.reflect&&l===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(i._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:o,wrapped:i},l){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,l??t??this[e]),i!==!0||l!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,l]of this._$Ep)this[i]=l;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[i,l]of o){const{wrapped:s}=l,n=this[i];s!==!0||this._$AL.has(i)||n===void 0||this.C(i,void 0,l,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(o=>{var i;return(i=o.hostUpdate)==null?void 0:i.call(o)}),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var o;return(o=r.hostUpdated)==null?void 0:o.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[A("elementProperties")]=new Map,_[A("finalized")]=new Map,B==null||B({ReactiveElement:_}),(g.reactiveElementVersions??(g.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=globalThis,H=E.trustedTypes,ee=H?H.createPolicy("lit-html",{createHTML:a=>a}):void 0,te="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,re="?"+m,we=`<${re}>`,v=document,S=()=>v.createComment(""),C=a=>a===null||typeof a!="object"&&typeof a!="function",q=Array.isArray,_e=a=>q(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",V=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,ae=/>/g,x=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ie=/'/g,le=/"/g,ne=/^(?:script|style|textarea|title)$/i,ke=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),M=ke(1),k=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),se=new WeakMap,$=v.createTreeWalker(v,129);function he(a,e){if(!q(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return ee!==void 0?ee.createHTML(e):e}const ze=(a,e)=>{const t=a.length-1,r=[];let o,i=e===2?"<svg>":e===3?"<math>":"",l=O;for(let s=0;s<t;s++){const n=a[s];let p,y,h=-1,d=0;for(;d<n.length&&(l.lastIndex=d,y=l.exec(n),y!==null);)d=l.lastIndex,l===O?y[1]==="!--"?l=oe:y[1]!==void 0?l=ae:y[2]!==void 0?(ne.test(y[2])&&(o=RegExp("</"+y[2],"g")),l=x):y[3]!==void 0&&(l=x):l===x?y[0]===">"?(l=o??O,h=-1):y[1]===void 0?h=-2:(h=l.lastIndex-y[2].length,p=y[1],l=y[3]===void 0?x:y[3]==='"'?le:ie):l===le||l===ie?l=x:l===oe||l===ae?l=O:(l=x,o=void 0);const u=l===x&&a[s+1].startsWith("/>")?" ":"";i+=l===O?n+we:h>=0?(r.push(p),n.slice(0,h)+te+n.slice(h)+m+u):n+m+(h===-2?s:u)}return[he(a,i+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class P{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let i=0,l=0;const s=e.length-1,n=this.parts,[p,y]=ze(e,t);if(this.el=P.createElement(p,r),$.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(o=$.nextNode())!==null&&n.length<s;){if(o.nodeType===1){if(o.hasAttributes())for(const h of o.getAttributeNames())if(h.endsWith(te)){const d=y[l++],u=o.getAttribute(h).split(m),I=/([.?@])?(.*)/.exec(d);n.push({type:1,index:i,name:I[2],strings:u,ctor:I[1]==="."?Ee:I[1]==="?"?Se:I[1]==="@"?Ce:N}),o.removeAttribute(h)}else h.startsWith(m)&&(n.push({type:6,index:i}),o.removeAttribute(h));if(ne.test(o.tagName)){const h=o.textContent.split(m),d=h.length-1;if(d>0){o.textContent=H?H.emptyScript:"";for(let u=0;u<d;u++)o.append(h[u],S()),$.nextNode(),n.push({type:2,index:++i});o.append(h[d],S())}}}else if(o.nodeType===8)if(o.data===re)n.push({type:2,index:i});else{let h=-1;for(;(h=o.data.indexOf(m,h+1))!==-1;)n.push({type:7,index:i}),h+=m.length-1}i++}}static createElement(e,t){const r=v.createElement("template");return r.innerHTML=e,r}}function z(a,e,t=a,r){var l,s;if(e===k)return e;let o=r!==void 0?(l=t._$Co)==null?void 0:l[r]:t._$Cl;const i=C(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==i&&((s=o==null?void 0:o._$AO)==null||s.call(o,!1),i===void 0?o=void 0:(o=new i(a),o._$AT(a,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=o:t._$Cl=o),o!==void 0&&(e=z(a,o._$AS(a,e.values),o,r)),e}class Ae{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,o=((e==null?void 0:e.creationScope)??v).importNode(t,!0);$.currentNode=o;let i=$.nextNode(),l=0,s=0,n=r[0];for(;n!==void 0;){if(l===n.index){let p;n.type===2?p=new T(i,i.nextSibling,this,e):n.type===1?p=new n.ctor(i,n.name,n.strings,this,e):n.type===6&&(p=new Oe(i,this,e)),this._$AV.push(p),n=r[++s]}l!==(n==null?void 0:n.index)&&(i=$.nextNode(),l++)}return $.currentNode=v,o}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class T{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,o){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=z(this,e,t),C(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==k&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):_e(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&C(this._$AH)?this._$AA.nextSibling.data=e:this.T(v.createTextNode(e)),this._$AH=e}$(e){var i;const{values:t,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=P.createElement(he(r.h,r.h[0]),this.options)),r);if(((i=this._$AH)==null?void 0:i._$AD)===o)this._$AH.p(t);else{const l=new Ae(o,this),s=l.u(this.options);l.p(t),this.T(s),this._$AH=l}}_$AC(e){let t=se.get(e.strings);return t===void 0&&se.set(e.strings,t=new P(e)),t}k(e){q(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,o=0;for(const i of e)o===t.length?t.push(r=new T(this.O(S()),this.O(S()),this,this.options)):r=t[o],r._$AI(i),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,o,i){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=c}_$AI(e,t=this,r,o){const i=this.strings;let l=!1;if(i===void 0)e=z(this,e,t,0),l=!C(e)||e!==this._$AH&&e!==k,l&&(this._$AH=e);else{const s=e;let n,p;for(e=i[0],n=0;n<i.length-1;n++)p=z(this,s[r+n],t,n),p===k&&(p=this._$AH[n]),l||(l=!C(p)||p!==this._$AH[n]),p===c?e=c:e!==c&&(e+=(p??"")+i[n+1]),this._$AH[n]=p}l&&!o&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ee extends N{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class Se extends N{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class Ce extends N{constructor(e,t,r,o,i){super(e,t,r,o,i),this.type=5}_$AI(e,t=this){if((e=z(this,e,t,0)??c)===k)return;const r=this._$AH,o=e===c&&r!==c||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==c&&(r===c||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Oe{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){z(this,e)}}const F=E.litHtmlPolyfillSupport;F==null||F(P,T),(E.litHtmlVersions??(E.litHtmlVersions=[])).push("3.3.0");const Pe=(a,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let o=r._$litPart$;if(o===void 0){const i=(t==null?void 0:t.renderBefore)??null;r._$litPart$=o=new T(e.insertBefore(S(),i),i,void 0,t??{})}return o._$AI(a),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w=globalThis;class U extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pe(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return k}}U._$litElement$=!0,U.finalized=!0,(pe=w.litElementHydrateSupport)==null||pe.call(w,{LitElement:U});const W=w.litElementPolyfillSupport;W==null||W({LitElement:U}),(w.litElementVersions??(w.litElementVersions=[])).push("4.2.0");function Te(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var ce={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(a){(function(){var e={}.hasOwnProperty;function t(){for(var r=[],o=0;o<arguments.length;o++){var i=arguments[o];if(i){var l=typeof i;if(l==="string"||l==="number")r.push(i);else if(Array.isArray(i)){if(i.length){var s=t.apply(null,i);s&&r.push(s)}}else if(l==="object"){if(i.toString!==Object.prototype.toString&&!i.toString.toString().includes("[native code]")){r.push(i.toString());continue}for(var n in i)e.call(i,n)&&i[n]&&r.push(n)}}}return r.join(" ")}a.exports?(t.default=t,a.exports=t):window.classNames=t})()})(ce);var Ue=ce.exports;const Re=Te(Ue);class He extends U{componentClassNames(e,t={}){return Re(e,t)}slotEmpty(e){return!this.querySelector(`[slot="${e}"]`)}slotNotEmpty(e){return this.slotEmpty(e)?null:!this.slotEmpty(e)}dispatch({e,eventName:t,detailObj:r={},optionsObj:o={}}){const i={bubbles:!0,composed:!0,...o,detail:{...e&&{originalEvent:e},...r}},l=new CustomEvent(t,i);return this.dispatchEvent(l),l}render(){return M`<slot></slot>`}}const Me=de`
// Typography usage provided via mixins.
// Typography applications are Tier 2 values that map
// typography presets to high-level UI applications.

@import '../layouts/breakpoints.scss';

                    @mixin cre8-typography-body-xlarge() {
                        font-family: var(--cre8-typography-body-xlarge-font-family); 
                        font-size: var(--cre8-typography-body-xlarge-font-size);
                        font-weight: var(--cre8-typography-body-xlarge-font-weight);
                        line-height: var(--cre8-typography-body-xlarge-line-height);
                        text-decoration: var(--cre8-typography-body-xlarge-text-decoration);
                        text-transform: var(--cre8-typography-body-xlarge-text-transform);
                    };

                    @mixin cre8-typography-body-xlarge-strong() {
                        font-family: var(--cre8-typography-body-xlarge-strong-font-family); 
                        font-size: var(--cre8-typography-body-xlarge-strong-font-size);
                        font-weight: var(--cre8-typography-body-xlarge-strong-font-weight);
                        line-height: var(--cre8-typography-body-xlarge-strong-line-height);
                        text-decoration: var(--cre8-typography-body-xlarge-strong-text-decoration);
                        text-transform: var(--cre8-typography-body-xlarge-strong-text-transform);
                    };

                    @mixin cre8-typography-body-xlarge-link() {
                        font-family: var(--cre8-typography-body-xlarge-link-font-family); 
                        font-size: var(--cre8-typography-body-xlarge-link-font-size);
                        font-weight: var(--cre8-typography-body-xlarge-link-font-weight);
                        line-height: var(--cre8-typography-body-xlarge-link-line-height);
                        text-decoration: var(--cre8-typography-body-xlarge-link-text-decoration);
                        text-transform: var(--cre8-typography-body-xlarge-link-text-transform);
                    };

                    @mixin cre8-typography-body-large() {
                        font-family: var(--cre8-typography-body-large-font-family); 
                        font-size: var(--cre8-typography-body-large-font-size);
                        font-weight: var(--cre8-typography-body-large-font-weight);
                        line-height: var(--cre8-typography-body-large-line-height);
                        text-decoration: var(--cre8-typography-body-large-text-decoration);
                        text-transform: var(--cre8-typography-body-large-text-transform);
                    };

                    @mixin cre8-typography-body-large-strong() {
                        font-family: var(--cre8-typography-body-large-strong-font-family); 
                        font-size: var(--cre8-typography-body-large-strong-font-size);
                        font-weight: var(--cre8-typography-body-large-strong-font-weight);
                        line-height: var(--cre8-typography-body-large-strong-line-height);
                        text-decoration: var(--cre8-typography-body-large-strong-text-decoration);
                        text-transform: var(--cre8-typography-body-large-strong-text-transform);
                    };

                    @mixin cre8-typography-body-default() {
                        font-family: var(--cre8-typography-body-default-font-family); 
                        font-size: var(--cre8-typography-body-default-font-size);
                        font-weight: var(--cre8-typography-body-default-font-weight);
                        line-height: var(--cre8-typography-body-default-line-height);
                        text-decoration: var(--cre8-typography-body-default-text-decoration);
                        text-transform: var(--cre8-typography-body-default-text-transform);
                    };

                    @mixin cre8-typography-body-default-strong() {
                        font-family: var(--cre8-typography-body-default-strong-font-family); 
                        font-size: var(--cre8-typography-body-default-strong-font-size);
                        font-weight: var(--cre8-typography-body-default-strong-font-weight);
                        line-height: var(--cre8-typography-body-default-strong-line-height);
                        text-decoration: var(--cre8-typography-body-default-strong-text-decoration);
                        text-transform: var(--cre8-typography-body-default-strong-text-transform);
                    };

                    @mixin cre8-typography-body-small() {
                        font-family: var(--cre8-typography-body-small-font-family); 
                        font-size: var(--cre8-typography-body-small-font-size);
                        font-weight: var(--cre8-typography-body-small-font-weight);
                        line-height: var(--cre8-typography-body-small-line-height);
                        text-decoration: var(--cre8-typography-body-small-text-decoration);
                        text-transform: var(--cre8-typography-body-small-text-transform);
                    };

                    @mixin cre8-typography-body-small-strong() {
                        font-family: var(--cre8-typography-body-small-strong-font-family); 
                        font-size: var(--cre8-typography-body-small-strong-font-size);
                        font-weight: var(--cre8-typography-body-small-strong-font-weight);
                        line-height: var(--cre8-typography-body-small-strong-line-height);
                        text-decoration: var(--cre8-typography-body-small-strong-text-decoration);
                        text-transform: var(--cre8-typography-body-small-strong-text-transform);
                    };

                    @mixin cre8-typography-body-large-link() {
                        font-family: var(--cre8-typography-body-large-link-font-family); 
                        font-size: var(--cre8-typography-body-large-link-font-size);
                        font-weight: var(--cre8-typography-body-large-link-font-weight);
                        line-height: var(--cre8-typography-body-large-link-line-height);
                        text-decoration: var(--cre8-typography-body-large-link-text-decoration);
                        text-transform: var(--cre8-typography-body-large-link-text-transform);
                    };

                    @mixin cre8-typography-body-default-link() {
                        font-family: var(--cre8-typography-body-default-link-font-family); 
                        font-size: var(--cre8-typography-body-default-link-font-size);
                        font-weight: var(--cre8-typography-body-default-link-font-weight);
                        line-height: var(--cre8-typography-body-default-link-line-height);
                        text-decoration: var(--cre8-typography-body-default-link-text-decoration);
                        text-transform: var(--cre8-typography-body-default-link-text-transform);
                    };

                    @mixin cre8-typography-body-small-link() {
                        font-family: var(--cre8-typography-body-small-link-font-family); 
                        font-size: var(--cre8-typography-body-small-link-font-size);
                        font-weight: var(--cre8-typography-body-small-link-font-weight);
                        line-height: var(--cre8-typography-body-small-link-line-height);
                        text-decoration: var(--cre8-typography-body-small-link-text-decoration);
                        text-transform: var(--cre8-typography-body-small-link-text-transform);
                    };

                    @mixin cre8-typography-label-default() {
                        font-family: var(--cre8-typography-label-default-font-family); 
                        font-size: var(--cre8-typography-label-default-font-size);
                        font-weight: var(--cre8-typography-label-default-font-weight);
                        line-height: var(--cre8-typography-label-default-line-height);
                        text-decoration: var(--cre8-typography-label-default-text-decoration);
                        text-transform: var(--cre8-typography-label-default-text-transform);
                    };

                    @mixin cre8-typography-label-large() {
                        font-family: var(--cre8-typography-label-large-font-family); 
                        font-size: var(--cre8-typography-label-large-font-size);
                        font-weight: var(--cre8-typography-label-large-font-weight);
                        line-height: var(--cre8-typography-label-large-line-height);
                        text-decoration: var(--cre8-typography-label-large-text-decoration);
                        text-transform: var(--cre8-typography-label-large-text-transform);
                    };

                    @mixin cre8-typography-label-small() {
                        font-family: var(--cre8-typography-label-small-font-family); 
                        font-size: var(--cre8-typography-label-small-font-size);
                        font-weight: var(--cre8-typography-label-small-font-weight);
                        line-height: var(--cre8-typography-label-small-line-height);
                        text-decoration: var(--cre8-typography-label-small-text-decoration);
                        text-transform: var(--cre8-typography-label-small-text-transform);
                    };
@mixin cre8-typography-title-xlarge() {
                        font-family: var(--cre8-typography-title-xlarge-mobile-font-family); 
                        font-size: var(--cre8-typography-title-xlarge-mobile-font-size);
                        font-weight: var(--cre8-typography-title-xlarge-mobile-font-weight);
                        line-height: var(--cre8-typography-title-xlarge-mobile-line-height);
                        text-decoration: var(--cre8-typography-title-xlarge-mobile-text-decoration);
                        text-transform: var(--cre8-typography-title-xlarge-mobile-text-transform);
                        @media all and (min-width: $cre8-breakpoint-md) {
                            font-family: var(--cre8-typography-title-xlarge-font-family); 
                            font-size: var(--cre8-typography-title-xlarge-font-size);
                            font-weight: var(--cre8-typography-title-xlarge-font-weight);
                            line-height: var(--cre8-typography-title-xlarge-line-height);
                            text-decoration: var(--cre8-typography-title-xlarge-text-decoration);
                            text-transform: var(--cre8-typography-title-xlarge-text-transform);
                        }
                    };

                    @mixin cre8-typography-title-xlarge-mobile() {
                        font-family: var(--cre8-typography-title-xlarge-mobile-font-family); 
                        font-size: var(--cre8-typography-title-xlarge-mobile-font-size);
                        font-weight: var(--cre8-typography-title-xlarge-mobile-font-weight);
                        line-height: var(--cre8-typography-title-xlarge-mobile-line-height);
                        text-decoration: var(--cre8-typography-title-xlarge-mobile-text-decoration);
                        text-transform: var(--cre8-typography-title-xlarge-mobile-text-transform);
                    };
@mixin cre8-typography-title-large() {
                        font-family: var(--cre8-typography-title-large-mobile-font-family); 
                        font-size: var(--cre8-typography-title-large-mobile-font-size);
                        font-weight: var(--cre8-typography-title-large-mobile-font-weight);
                        line-height: var(--cre8-typography-title-large-mobile-line-height);
                        text-decoration: var(--cre8-typography-title-large-mobile-text-decoration);
                        text-transform: var(--cre8-typography-title-large-mobile-text-transform);
                        @media all and (min-width: $cre8-breakpoint-md) {
                            font-family: var(--cre8-typography-title-large-font-family); 
                            font-size: var(--cre8-typography-title-large-font-size);
                            font-weight: var(--cre8-typography-title-large-font-weight);
                            line-height: var(--cre8-typography-title-large-line-height);
                            text-decoration: var(--cre8-typography-title-large-text-decoration);
                            text-transform: var(--cre8-typography-title-large-text-transform);
                        }
                    };

                    @mixin cre8-typography-title-large-mobile() {
                        font-family: var(--cre8-typography-title-large-mobile-font-family); 
                        font-size: var(--cre8-typography-title-large-mobile-font-size);
                        font-weight: var(--cre8-typography-title-large-mobile-font-weight);
                        line-height: var(--cre8-typography-title-large-mobile-line-height);
                        text-decoration: var(--cre8-typography-title-large-mobile-text-decoration);
                        text-transform: var(--cre8-typography-title-large-mobile-text-transform);
                    };
@mixin cre8-typography-title-default() {
                        font-family: var(--cre8-typography-title-default-mobile-font-family); 
                        font-size: var(--cre8-typography-title-default-mobile-font-size);
                        font-weight: var(--cre8-typography-title-default-mobile-font-weight);
                        line-height: var(--cre8-typography-title-default-mobile-line-height);
                        text-decoration: var(--cre8-typography-title-default-mobile-text-decoration);
                        text-transform: var(--cre8-typography-title-default-mobile-text-transform);
                        @media all and (min-width: $cre8-breakpoint-md) {
                            font-family: var(--cre8-typography-title-default-font-family); 
                            font-size: var(--cre8-typography-title-default-font-size);
                            font-weight: var(--cre8-typography-title-default-font-weight);
                            line-height: var(--cre8-typography-title-default-line-height);
                            text-decoration: var(--cre8-typography-title-default-text-decoration);
                            text-transform: var(--cre8-typography-title-default-text-transform);
                        }
                    };

                    @mixin cre8-typography-title-default-mobile() {
                        font-family: var(--cre8-typography-title-default-mobile-font-family); 
                        font-size: var(--cre8-typography-title-default-mobile-font-size);
                        font-weight: var(--cre8-typography-title-default-mobile-font-weight);
                        line-height: var(--cre8-typography-title-default-mobile-line-height);
                        text-decoration: var(--cre8-typography-title-default-mobile-text-decoration);
                        text-transform: var(--cre8-typography-title-default-mobile-text-transform);
                    };
@mixin cre8-typography-title-small() {
                        font-family: var(--cre8-typography-title-small-mobile-font-family); 
                        font-size: var(--cre8-typography-title-small-mobile-font-size);
                        font-weight: var(--cre8-typography-title-small-mobile-font-weight);
                        line-height: var(--cre8-typography-title-small-mobile-line-height);
                        text-decoration: var(--cre8-typography-title-small-mobile-text-decoration);
                        text-transform: var(--cre8-typography-title-small-mobile-text-transform);
                        @media all and (min-width: $cre8-breakpoint-md) {
                            font-family: var(--cre8-typography-title-small-font-family); 
                            font-size: var(--cre8-typography-title-small-font-size);
                            font-weight: var(--cre8-typography-title-small-font-weight);
                            line-height: var(--cre8-typography-title-small-line-height);
                            text-decoration: var(--cre8-typography-title-small-text-decoration);
                            text-transform: var(--cre8-typography-title-small-text-transform);
                        }
                    };

                    @mixin cre8-typography-title-small-mobile() {
                        font-family: var(--cre8-typography-title-small-mobile-font-family); 
                        font-size: var(--cre8-typography-title-small-mobile-font-size);
                        font-weight: var(--cre8-typography-title-small-mobile-font-weight);
                        line-height: var(--cre8-typography-title-small-mobile-line-height);
                        text-decoration: var(--cre8-typography-title-small-mobile-text-decoration);
                        text-transform: var(--cre8-typography-title-small-mobile-text-transform);
                    };
@mixin cre8-typography-headline-large() {
                        font-family: var(--cre8-typography-headline-large-mobile-font-family); 
                        font-size: var(--cre8-typography-headline-large-mobile-font-size);
                        font-weight: var(--cre8-typography-headline-large-mobile-font-weight);
                        line-height: var(--cre8-typography-headline-large-mobile-line-height);
                        text-decoration: var(--cre8-typography-headline-large-mobile-text-decoration);
                        text-transform: var(--cre8-typography-headline-large-mobile-text-transform);
                        @media all and (min-width: $cre8-breakpoint-md) {
                            font-family: var(--cre8-typography-headline-large-font-family); 
                            font-size: var(--cre8-typography-headline-large-font-size);
                            font-weight: var(--cre8-typography-headline-large-font-weight);
                            line-height: var(--cre8-typography-headline-large-line-height);
                            text-decoration: var(--cre8-typography-headline-large-text-decoration);
                            text-transform: var(--cre8-typography-headline-large-text-transform);
                        }
                    };

                    @mixin cre8-typography-headline-large-mobile() {
                        font-family: var(--cre8-typography-headline-large-mobile-font-family); 
                        font-size: var(--cre8-typography-headline-large-mobile-font-size);
                        font-weight: var(--cre8-typography-headline-large-mobile-font-weight);
                        line-height: var(--cre8-typography-headline-large-mobile-line-height);
                        text-decoration: var(--cre8-typography-headline-large-mobile-text-decoration);
                        text-transform: var(--cre8-typography-headline-large-mobile-text-transform);
                    };
@mixin cre8-typography-headline-default() {
                        font-family: var(--cre8-typography-headline-default-mobile-font-family); 
                        font-size: var(--cre8-typography-headline-default-mobile-font-size);
                        font-weight: var(--cre8-typography-headline-default-mobile-font-weight);
                        line-height: var(--cre8-typography-headline-default-mobile-line-height);
                        text-decoration: var(--cre8-typography-headline-default-mobile-text-decoration);
                        text-transform: var(--cre8-typography-headline-default-mobile-text-transform);
                        @media all and (min-width: $cre8-breakpoint-md) {
                            font-family: var(--cre8-typography-headline-default-font-family); 
                            font-size: var(--cre8-typography-headline-default-font-size);
                            font-weight: var(--cre8-typography-headline-default-font-weight);
                            line-height: var(--cre8-typography-headline-default-line-height);
                            text-decoration: var(--cre8-typography-headline-default-text-decoration);
                            text-transform: var(--cre8-typography-headline-default-text-transform);
                        }
                    };

                    @mixin cre8-typography-headline-default-mobile() {
                        font-family: var(--cre8-typography-headline-default-mobile-font-family); 
                        font-size: var(--cre8-typography-headline-default-mobile-font-size);
                        font-weight: var(--cre8-typography-headline-default-mobile-font-weight);
                        line-height: var(--cre8-typography-headline-default-mobile-line-height);
                        text-decoration: var(--cre8-typography-headline-default-mobile-text-decoration);
                        text-transform: var(--cre8-typography-headline-default-mobile-text-transform);
                    };
@mixin cre8-typography-headline-small() {
                        font-family: var(--cre8-typography-headline-small-mobile-font-family); 
                        font-size: var(--cre8-typography-headline-small-mobile-font-size);
                        font-weight: var(--cre8-typography-headline-small-mobile-font-weight);
                        line-height: var(--cre8-typography-headline-small-mobile-line-height);
                        text-decoration: var(--cre8-typography-headline-small-mobile-text-decoration);
                        text-transform: var(--cre8-typography-headline-small-mobile-text-transform);
                        @media all and (min-width: $cre8-breakpoint-md) {
                            font-family: var(--cre8-typography-headline-small-font-family); 
                            font-size: var(--cre8-typography-headline-small-font-size);
                            font-weight: var(--cre8-typography-headline-small-font-weight);
                            line-height: var(--cre8-typography-headline-small-line-height);
                            text-decoration: var(--cre8-typography-headline-small-text-decoration);
                            text-transform: var(--cre8-typography-headline-small-text-transform);
                        }
                    };

                    @mixin cre8-typography-headline-small-mobile() {
                        font-family: var(--cre8-typography-headline-small-mobile-font-family); 
                        font-size: var(--cre8-typography-headline-small-mobile-font-size);
                        font-weight: var(--cre8-typography-headline-small-mobile-font-weight);
                        line-height: var(--cre8-typography-headline-small-mobile-line-height);
                        text-decoration: var(--cre8-typography-headline-small-mobile-text-decoration);
                        text-transform: var(--cre8-typography-headline-small-mobile-text-transform);
                    };
@mixin cre8-typography-headline-xsmall() {
                        font-family: var(--cre8-typography-headline-xsmall-mobile-font-family); 
                        font-size: var(--cre8-typography-headline-xsmall-mobile-font-size);
                        font-weight: var(--cre8-typography-headline-xsmall-mobile-font-weight);
                        line-height: var(--cre8-typography-headline-xsmall-mobile-line-height);
                        text-decoration: var(--cre8-typography-headline-xsmall-mobile-text-decoration);
                        text-transform: var(--cre8-typography-headline-xsmall-mobile-text-transform);
                        @media all and (min-width: $cre8-breakpoint-md) {
                            font-family: var(--cre8-typography-headline-xsmall-font-family); 
                            font-size: var(--cre8-typography-headline-xsmall-font-size);
                            font-weight: var(--cre8-typography-headline-xsmall-font-weight);
                            line-height: var(--cre8-typography-headline-xsmall-line-height);
                            text-decoration: var(--cre8-typography-headline-xsmall-text-decoration);
                            text-transform: var(--cre8-typography-headline-xsmall-text-transform);
                        }
                    };

                    @mixin cre8-typography-headline-xsmall-mobile() {
                        font-family: var(--cre8-typography-headline-xsmall-mobile-font-family); 
                        font-size: var(--cre8-typography-headline-xsmall-mobile-font-size);
                        font-weight: var(--cre8-typography-headline-xsmall-mobile-font-weight);
                        line-height: var(--cre8-typography-headline-xsmall-mobile-line-height);
                        text-decoration: var(--cre8-typography-headline-xsmall-mobile-text-decoration);
                        text-transform: var(--cre8-typography-headline-xsmall-mobile-text-transform);
                    };
@mixin cre8-typography-display-large() {
                        font-family: var(--cre8-typography-display-large-mobile-font-family); 
                        font-size: var(--cre8-typography-display-large-mobile-font-size);
                        font-weight: var(--cre8-typography-display-large-mobile-font-weight);
                        line-height: var(--cre8-typography-display-large-mobile-line-height);
                        text-decoration: var(--cre8-typography-display-large-mobile-text-decoration);
                        text-transform: var(--cre8-typography-display-large-mobile-text-transform);
                        @media all and (min-width: $cre8-breakpoint-md) {
                            font-family: var(--cre8-typography-display-large-font-family); 
                            font-size: var(--cre8-typography-display-large-font-size);
                            font-weight: var(--cre8-typography-display-large-font-weight);
                            line-height: var(--cre8-typography-display-large-line-height);
                            text-decoration: var(--cre8-typography-display-large-text-decoration);
                            text-transform: var(--cre8-typography-display-large-text-transform);
                        }
                    };

                    @mixin cre8-typography-display-large-mobile() {
                        font-family: var(--cre8-typography-display-large-mobile-font-family); 
                        font-size: var(--cre8-typography-display-large-mobile-font-size);
                        font-weight: var(--cre8-typography-display-large-mobile-font-weight);
                        line-height: var(--cre8-typography-display-large-mobile-line-height);
                        text-decoration: var(--cre8-typography-display-large-mobile-text-decoration);
                        text-transform: var(--cre8-typography-display-large-mobile-text-transform);
                    };
@mixin cre8-typography-display-default() {
                        font-family: var(--cre8-typography-display-default-mobile-font-family); 
                        font-size: var(--cre8-typography-display-default-mobile-font-size);
                        font-weight: var(--cre8-typography-display-default-mobile-font-weight);
                        line-height: var(--cre8-typography-display-default-mobile-line-height);
                        text-decoration: var(--cre8-typography-display-default-mobile-text-decoration);
                        text-transform: var(--cre8-typography-display-default-mobile-text-transform);
                        @media all and (min-width: $cre8-breakpoint-md) {
                            font-family: var(--cre8-typography-display-default-font-family); 
                            font-size: var(--cre8-typography-display-default-font-size);
                            font-weight: var(--cre8-typography-display-default-font-weight);
                            line-height: var(--cre8-typography-display-default-line-height);
                            text-decoration: var(--cre8-typography-display-default-text-decoration);
                            text-transform: var(--cre8-typography-display-default-text-transform);
                        }
                    };

                    @mixin cre8-typography-display-default-mobile() {
                        font-family: var(--cre8-typography-display-default-mobile-font-family); 
                        font-size: var(--cre8-typography-display-default-mobile-font-size);
                        font-weight: var(--cre8-typography-display-default-mobile-font-weight);
                        line-height: var(--cre8-typography-display-default-mobile-line-height);
                        text-decoration: var(--cre8-typography-display-default-mobile-text-decoration);
                        text-transform: var(--cre8-typography-display-default-mobile-text-transform);
                    };
@mixin cre8-typography-display-small() {
                        font-family: var(--cre8-typography-display-small-mobile-font-family); 
                        font-size: var(--cre8-typography-display-small-mobile-font-size);
                        font-weight: var(--cre8-typography-display-small-mobile-font-weight);
                        line-height: var(--cre8-typography-display-small-mobile-line-height);
                        text-decoration: var(--cre8-typography-display-small-mobile-text-decoration);
                        text-transform: var(--cre8-typography-display-small-mobile-text-transform);
                        @media all and (min-width: $cre8-breakpoint-md) {
                            font-family: var(--cre8-typography-display-small-font-family); 
                            font-size: var(--cre8-typography-display-small-font-size);
                            font-weight: var(--cre8-typography-display-small-font-weight);
                            line-height: var(--cre8-typography-display-small-line-height);
                            text-decoration: var(--cre8-typography-display-small-text-decoration);
                            text-transform: var(--cre8-typography-display-small-text-transform);
                        }
                    };

                    @mixin cre8-typography-display-small-mobile() {
                        font-family: var(--cre8-typography-display-small-mobile-font-family); 
                        font-size: var(--cre8-typography-display-small-mobile-font-size);
                        font-weight: var(--cre8-typography-display-small-mobile-font-weight);
                        line-height: var(--cre8-typography-display-small-mobile-line-height);
                        text-decoration: var(--cre8-typography-display-small-mobile-text-decoration);
                        text-transform: var(--cre8-typography-display-small-mobile-text-transform);
                    };

                    @mixin cre8-typography-meta-default() {
                        font-family: var(--cre8-typography-meta-default-font-family); 
                        font-size: var(--cre8-typography-meta-default-font-size);
                        font-weight: var(--cre8-typography-meta-default-font-weight);
                        line-height: var(--cre8-typography-meta-default-line-height);
                        text-decoration: var(--cre8-typography-meta-default-text-decoration);
                        text-transform: var(--cre8-typography-meta-default-text-transform);
                    };

                    @mixin cre8-typography-meta-default-sentence-case() {
                        font-family: var(--cre8-typography-meta-default-sentence-case-font-family); 
                        font-size: var(--cre8-typography-meta-default-sentence-case-font-size);
                        font-weight: var(--cre8-typography-meta-default-sentence-case-font-weight);
                        line-height: var(--cre8-typography-meta-default-sentence-case-line-height);
                        text-decoration: var(--cre8-typography-meta-default-sentence-case-text-decoration);
                        text-transform: var(--cre8-typography-meta-default-sentence-case-text-transform);
                    };

                    @mixin cre8-typography-meta-large() {
                        font-family: var(--cre8-typography-meta-large-font-family); 
                        font-size: var(--cre8-typography-meta-large-font-size);
                        font-weight: var(--cre8-typography-meta-large-font-weight);
                        line-height: var(--cre8-typography-meta-large-line-height);
                        text-decoration: var(--cre8-typography-meta-large-text-decoration);
                        text-transform: var(--cre8-typography-meta-large-text-transform);
                    };

                    @mixin cre8-typography-meta-small() {
                        font-family: var(--cre8-typography-meta-small-font-family); 
                        font-size: var(--cre8-typography-meta-small-font-size);
                        font-weight: var(--cre8-typography-meta-small-font-weight);
                        line-height: var(--cre8-typography-meta-small-line-height);
                        text-decoration: var(--cre8-typography-meta-small-text-decoration);
                        text-transform: var(--cre8-typography-meta-small-text-transform);
                    };

/**
 * Border-Box http:/paulirish.com/2012/box-sizing-border-box-ftw/
 */
*,
::slotted(*),
*:before,
*:after {
  box-sizing: border-box;
}


//------------------------------------//
//   #BREAKPOINTS
//------------------------------------//

// 1) Breakpoints need to be defined as SCSS
//    variables since presently CSS custom
//    properties can't be used within media
//    query declarations

$cre8-breakpoint-xsm: 375px;
$cre8-breakpoint-sm: 560px;
$cre8-breakpoint-md: 768px;
$cre8-breakpoint-lg: 960px;
$cre8-breakpoint-xl: 1200px;
$cre8-breakpoint-xxl: 1400px;
$cre8-bp-sm: 23.4375rem; // 375px
$cre8-bp-sm-2: 35rem; // 560px
$cre8-bp-md: 48rem; // 768px
$cre8-bp-lg: 60rem; // 960px
$cre8-bp-xl: 75rem; // 1200px
$cre8-bp-xxl: 87.5rem; // 1400px

@import 'breakpoints';
@import 'variables';

/*
=======
Animations
=======
*/
:host{
--cre8-z-index-1: 1;
--cre8-z-index-50: 50;
--cre8-z-index-100: 100;
--cre8-z-index-200: 200;
--cre8-z-index-1030: 1030;

--cre8-anim-fade-quick: 0.35s;
--cre8-anim-ease: ease;
}
@keyframes fadeIn {
  100% {
    opacity: 1;
  }
}

@keyframes slideIn {
  100% {
    transform: translateX(0);
  }
}

@keyframes slideInFwd {
  100% {
    width: 272px;
    height: 272px;
  }
}

@keyframes slideOutRight {
  100% {
    width: 272px;
    height: 272px;
  }
}

@keyframes slideUp {
  100% {
    transform: translateY(0);
  }
}

@media (width >= 481px) {
  @keyframes slideInFwd {
    100% {
      width: 417px;
      height: 417px;
    }
  }

  @keyframes slideOutRight {
    100% {
      width: 417px;
      height: 417px;
    }
  }
}

@media (width >=$cre8-bp-md) {
  @keyframes slideInFwd {
    100% {
      width: 330px;
      height: 330px;
    }
  }

  @keyframes slideOutRight {
    100% {
      width: 330px;
      height: 330px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}

@media (width >=$cre8-bp-lg) {
  @keyframes slideInFwd {
    100% {
      width: 460px;
      height: 460px;
    }
  }

  @keyframes slideOutRight {
    100% {
      width: 460px;
      height: 460px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}

@media (width >=$cre8-bp-xl) {
  @keyframes slideInFwd {
    100% {
      width: 592px;
      height: 591px;
    }
  }

  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 45px));
    }
  }
}

@media (width >=$cre8-bp-xxl) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 120px));
    }
  }
}

@media (width >= 2200px) {
  @keyframes slideOutRight {
    100% {
      width: 592px;
      height: 591px;
      transform: translateX(calc(100vw - 592px));
    }
  }
}

//Button Ripple
span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 600ms linear;
  background-color: var(--ripple-bg-color);
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 1;
  }
}



@function size($value) {
  @return calc(var(--size-base-unit) * #{$value});
}





// Global CSS custom properties that aren't part of a themes dcre8gn tokens
:root {
  --size-base-unit: 1rem;
}

/**
 * RTL support for values logical properties can't automatically adjust for
 * 1) Percentage based horizontal translate values need to be flipped
 * 2) Background gradients using "to-right" or "to-left" need to be switched to using deg values.
 * 3) Inverse items that have 45degs
 */
[dir='rtl'] {
  --rtlTranslateX: 50%; /* 1 */
  --rtlGradientToRight: 270deg; /* 2 */
  --rtlRotate45Inverse: -45deg; /* 3 */
}

// Size
// 1) The size function multiplies a provided value ($number)
//    by the base sizing unit (--size-base-unit)
// 2) $number should be limited to integers (e.g. 3) or half integers (e.g. 1.5)


// Form label styles
// TODO: Revisit
@mixin label-styles() {
  @include cre8-typography-label-small();
  display: block;
  margin-bottom: size(1);
}

// Inverted form label styles
// TODO: Revisit
@mixin label-inverted-styles() {
  color: var(--cre8-color-content-knockout);
}

@mixin checkbox-styles() {
  /**
   * Checkbox control input
   * 1) Make control dimensions same as outer container
   * 2) Hide native form controls
   */
  .cre8-c-checkbox__input {
    display: block;
    margin: 0;
    z-index: 4;
    width: size(3); /* 1 */
    height: size(3); /* 1 */
    cursor: pointer;
    opacity: 0; /* 2 */

    /**
     * Disabled checkbox input
     */
    &:disabled {
      cursor: not-allowed;
    }

    /**
     * Focus visible for checkbox input
     */
    &:focus-visible {
      @include focus();
    }
  }

  /**
   * Custom checkbox
   * 1) Make control dimensions same as outer container
   */
  .cre8-c-checkbox__custom-check {
    position: absolute;
    top: 0; /* 1 */
    right: 0; /* 1 */
    bottom: 0; /* 1 */
    left: 0; /* 1 */
    width: size(3);
    height: size(3);
    flex-shrink: 0;
    z-index: 1;

    /**
     * Custom checkbox background
     * 1) Make control dimensions same as outer container
     * 2) Stack background behind checkbox foreground
     */
    &:before {
      content: '';
      position: absolute;
      top: 0; /* 1 */
      right: 0; /* 1 */
      bottom: 0; /* 1 */
      left: 0; /* 1 */
      z-index: 1; /* 2 */
      display: block;
      border: var(--cre8-border-width-default) solid var(--cre8-color-border-default);
      background-color: var(--cre8-color-bg-default);
      border-radius: var(--cre8-border-radius-default);

      /**
       * Custom checkbox background inside of hovered control
       */
      .cre8-c-checkbox__input:hover + & {
        border-color: var(--cre8-color-border-default-hover);
      }

      /**
       * Custom checkbox background inside of disabled control
       */
      .cre8-c-checkbox__input:disabled + & {
        border-color: var(--cre8-color-border-subtle);
        background-color: var(--cre8-color-bg-subtle);
        cursor: not-allowed;
      }

      /**
       * Custom checkbox background inside of checked control
       */
      .cre8-c-checkbox__input:checked + & {
        background-color: var(--cre8-color-bg-brand);
        border-color: transparent;
      }

      /**
       * Custom checkbox background inside of checked and hovered control
       */
      .cre8-c-checkbox__input:checked:hover + & {
        background-color: var(--cre8-color-bg-brand-hover);
        border-color: transparent;
      }

      /**
       * Custom checkbox background inside of checked control
       */
      .cre8-c-checkbox__input:checked:disabled + & {
        background-color: var(--cre8-color-bg-brand-disabled);
        border-color: transparent;
      }
    }

    /**
     * Custom checkbox checkmark
     * 1) Position checkmark in center of box
     * 2) Hide checkmark based by default
     */
    &:after {
      content: '';
      position: absolute;
      top: 50%; /* 1 */
      left: 50%; /* 1 */
      z-index: 2;
      display: block;
      width: 12px;
      height: 13px;
      transform: translate(-50%, -50%);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M3.35,12a1.75,1.75,0,0,1-.78-.18A1.81,1.81,0,0,1,2,11.31L.14,8.89a.69.69,0,0,1,.14-1,.7.7,0,0,1,1,.13l1.8,2.42a.41.41,0,0,0,.13.1.3.3,0,0,0,.16,0,.28.28,0,0,0,.15,0,.38.38,0,0,0,.12-.1L10.73.3a.7.7,0,1,1,1.14.8L4.76,11.26a1.68,1.68,0,0,1-.61.54,1.92,1.92,0,0,1-.78.2Z' fill='%233f3f3f'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      opacity: 0; /* 2 */

      /**
       * Actual checkbox of the checked input
       * 1) Hide checkmark based on if input is checked
       */
      .cre8-c-checkbox__input:checked + & {
        opacity: 1; /* 1 */
      }
    }
  }

  /**
   * Apply "indeterminate" style to checkbox. "Indeterminate" states are for
   * checkboxes masked states of the checkbox. More here - https://css-tricks.com/indeterminate-checkboxes/
   */
  .cre8-is-indeterminate .cre8-c-checkbox__input:not(:checked) {
    &:hover + .cre8-c-checkbox__custom-check::before {
      background-color: var(--cre8-color-bg-brand-hover);
      border-color: transparent;
    }

    /**
     * Apply disabled "indeterminate" styles to checkbox
     */
    &:disabled + .cre8-c-checkbox__custom-check::before {
      background-color: var(--cre8-color-bg-brand-disabled);
      border-color: transparent;
    }

    /**
     * Apply "indeterminate" styles to checkbox
     */
    + .cre8-c-checkbox__custom-check {
      &::before {
        background-color: var(--cre8-color-bg-brand);
        border-color: transparent;
      }

      /**
       * "Indeterminate" state SVG style (just a - instead of a ✓)
       */
      &::after {
        opacity: 1;
        width: 10px;
        height: 4px;
        background-repeat: no-repeat;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 1.52'%3E%3Cpath d='M9.24,1.52H.76A.76.76,0,0,1,.76,0H9.24a.76.76,0,0,1,0,1.52Z' fill='%233f3f3f'/%3E%3C/svg%3E");
      }
    }
  }
}

@mixin input-styles() {
  @include cre8-typography-body-default();
  @include focusTransparent();
  -webkit-appearance: none;
  width: 100%;
  border-width: var(--cre8-border-width-default);
  border-style: solid;
  border-color: var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  padding: size(1.5) size(1);
  color: var(--cre8-color-content-default);
  background-color: var(--cre8-color-bg-default);
  transition: outline-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), border-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), background-color var(--cre8-anim-fade-quick) var(--cre8-anim-ease), color var(--cre8-anim-fade-quick) var(--cre8-anim-ease);

  /**
   * Hover, focus, active, and focus-visible styles for default input elements
   */
  &:hover:not(:disabled),
  &:focus:not(:disabled),
  &:active:not(:disabled),
  &:focus-visible {
    @include focus();

    /**
     * Error state
     */
    .cre8-is-error & {
      outline-color: var(--cre8-color-border-error);
    }

    /**
     * Success state
     */
    .cre8-is-success & {
      outline-color: var(--cre8-color-border-success);
    }
  }

  /**
   * Disabled styles for default input elements
   */
  &:disabled {
    background-color: var(--cre8-color-bg-disabled);
    border-color: var(--cre8-color-border-disabled);
    color: var(--cre8-color-content-disabled);
    cursor: not-allowed;

    /**
     * Disabled text colors
     */
    &::placeholder {
      color: var(--cre8-color-content-disabled);
    }
  }

  /**
   * Placeholder styles for default input elements
   */
  &::placeholder {
    color: var(--cre8-color-content-subtle);
  }

  /**
   * Error state for default input elements
   */
  .cre8-is-error & {
    border-color: var(--cre8-color-border-error);
  }

  /**
   * Success state for default input elements
   */
  .cre8-is-success & {
    border-color: var(--cre8-color-border-success);
  }
}

//------------------------------------//
//   #TEXT LINK STYLES
//------------------------------------//

// Text Link Styles
@mixin text-link() {
  @include cre8-typography-body-default;
  color: var(--cre8-color-content-link);

  &:hover {
    color: var(--cre8-color-content-link-hover);
    background-color: transparent;
  }

  &:active {
    color: var(--cre8-color-content-link-active);
  }

  &:visited {
    color: var(--cre8-color-content-link-visited);
  }

  &:focus-visible {
    @include focus();
  }
}

@mixin text-link-inverted() {
  @include cre8-typography-label-default;
  color: var(--cre8-color-content-link);
  text-decoration: underline;

  &:hover {
    color: var(--cre8-color-content-link-hover);
    background-color: transparent;
  }

  &:focus-visible {
    @include focusInverted();
  }
}

@mixin text-link-brand() {
  @include cre8-typography-label-default;
  color: var(--cre8-color-content-knockout-brand);
  text-decoration: underline;

  &:hover {
    color: var(--cre8-color-content-knockout-brand-hover);
    background-color: transparent;
  }

  &:focus-visible {
    @include focusInverted();
  }
}

//------------------------------------//
//   #FOCUS
//------------------------------------//

/**
 * Visible focus outline for elements on a light background
 */
@mixin focus() {
  outline: var(--cre8-border-width-focus) solid var(--cre8-color-border-active-outline);
  outline-offset: size(0.25);
}

/**
 * Visible focus outline for elements with an error status
 */
@mixin focusError() {
  outline: var(--cre8-border-width-focus) solid var(--cre8-color-border-error);
  outline-offset: size(0.25);
}

/**
 * Visible focus outline for elements on a dark background
 */
@mixin focusInverted() {
  outline: var(--cre8-border-width-focus) solid var(--cre8-theme-color-focus-ring-inverted);
  outline-offset: size(0.25);
}
/**
* Focus state for themes that need a dashed outline for focus
* state
**/
@mixin focusTertiary() {
  outline: var(--cre8-border-width-focus) var(--cre8-border-style-button-tertiary-outline-focus) var(--cre8-color-border-active-outline);
  outline-offset: size(0.25);
}

/**
 * Invisible focus outline for elements that need a more visible
 * focus state for high-contrast mode
 */
@mixin focusTransparent() {
  outline: var(--cre8-border-width-focus) solid transparent;
  outline-offset: size(0.25);
}

/**
 * Visually hidden from display
 */
@mixin visuallyHidden() {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}





/*------------------------------------*\
#TABLE OBJECT
\*------------------------------------*/

:host {
    display: block;
}

.cre8-c-table-object__header {
    padding-top: var(--cre8-spacing-8);
    padding-bottom: var(--cre8-spacing-8);
}

.cre8-c-table-object__footer {
    padding-top: var(--cre8-spacing-8);
    padding-bottom: var(--cre8-spacing-8);
}
`,X=class X extends He{render(){const e=this.componentClassNames("cre8-c-table-object",{});return M`
      <div class="${e}">
        ${this.slotNotEmpty("header")&&M`
          <div class="cre8-c-table-object__header" part="header">
            <slot name="header"></slot>
          </div>
        `}
        <div class="cre8-c-table-object__body">
          <slot></slot>
        </div>
        ${this.slotNotEmpty("footer")&&M`
          <div class="cre8-c-table-object__footer">
            <slot name="footer"></slot>
          </div>
        `}
      </div>
    `}};X.styles=[Me];let R=X;customElements.get("cre8-table-object")===void 0&&customElements.define("cre8-table-object",R),b.Cre8TableObject=R,b.default=R,Object.defineProperties(b,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
