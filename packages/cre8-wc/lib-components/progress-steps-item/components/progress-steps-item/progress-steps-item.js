(function(v,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(v=typeof globalThis<"u"?globalThis:v||self,f(v.ProgressStepsItem={}))})(this,function(v){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ue;const f=globalThis,B=f.ShadowRoot&&(f.ShadyCSS===void 0||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,I=Symbol(),G=new WeakMap;let Q=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==I)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(B&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=G.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&G.set(t,e))}return e}toString(){return this.cssText}};const $e=i=>new Q(typeof i=="string"?i:i+"",void 0,I),fe=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new Q(t,i,I)},_e=(i,e)=>{if(B)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),r=f.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},X=B?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return $e(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ge,defineProperty:me,getOwnPropertyDescriptor:ve,getOwnPropertyNames:ye,getOwnPropertySymbols:Ae,getPrototypeOf:be}=Object,_=globalThis,Y=_.trustedTypes,Ee=Y?Y.emptyScript:"",q=_.reactiveElementPolyfillSupport,P=(i,e)=>i,R={toAttribute(i,e){switch(e){case Boolean:i=i?Ee:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},V=(i,e)=>!ge(i,e),ee={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);let S=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&me(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){const{get:r,set:o}=ve(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){const a=r==null?void 0:r.call(this);o==null||o.call(this,n),this.requestUpdate(e,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ee}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const e=be(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const t=this.properties,s=[...ye(t),...Ae(t)];for(const r of s)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const r of s)t.unshift(X(r))}else e!==void 0&&t.push(X(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _e(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var o;const s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){const n=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:R).toAttribute(t,s.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){var o,n;const s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const a=s.getPropertyOptions(r),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((o=a.converter)==null?void 0:o.fromAttribute)!==void 0?a.converter:R;this._$Em=r,this[r]=c.fromAttribute(t,a.type)??((n=this._$Ej)==null?void 0:n.get(r))??null,this._$Em=null}}requestUpdate(e,t,s){var r;if(e!==void 0){const o=this.constructor,n=this[e];if(s??(s=o.getPropertyOptions(e)),!((s.hasChanged??V)(n,t)||s.useDefault&&s.reflect&&n===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,n]of r){const{wrapped:a}=n,c=this[o];a!==!0||this._$AL.has(o)||c===void 0||this.C(o,void 0,n,c)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var r;return(r=s.hostUpdated)==null?void 0:r.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[P("elementProperties")]=new Map,S[P("finalized")]=new Map,q==null||q({ReactiveElement:S}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=globalThis,j=x.trustedTypes,te=j?j.createPolicy("lit-html",{createHTML:i=>i}):void 0,se="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,re="?"+g,Se=`<${re}>`,y=document,O=()=>y.createComment(""),U=i=>i===null||typeof i!="object"&&typeof i!="function",W=Array.isArray,we=i=>W(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",F=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ie=/-->/g,oe=/>/g,A=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ne=/'/g,ce=/"/g,ae=/^(?:script|style|textarea|title)$/i,Ce=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),le=Ce(1),w=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),he=new WeakMap,b=y.createTreeWalker(y,129);function de(i,e){if(!W(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return te!==void 0?te.createHTML(e):e}const Pe=(i,e)=>{const t=i.length-1,s=[];let r,o=e===2?"<svg>":e===3?"<math>":"",n=M;for(let a=0;a<t;a++){const c=i[a];let d,p,l=-1,$=0;for(;$<c.length&&(n.lastIndex=$,p=n.exec(c),p!==null);)$=n.lastIndex,n===M?p[1]==="!--"?n=ie:p[1]!==void 0?n=oe:p[2]!==void 0?(ae.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=A):p[3]!==void 0&&(n=A):n===A?p[0]===">"?(n=r??M,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?A:p[3]==='"'?ce:ne):n===ce||n===ne?n=A:n===ie||n===oe?n=M:(n=A,r=void 0);const m=n===A&&i[a+1].startsWith("/>")?" ":"";o+=n===M?c+Se:l>=0?(s.push(d),c.slice(0,l)+se+c.slice(l)+g+m):c+g+(l===-2?a:m)}return[de(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class N{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let o=0,n=0;const a=e.length-1,c=this.parts,[d,p]=Pe(e,t);if(this.el=N.createElement(d,s),b.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=b.nextNode())!==null&&c.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const l of r.getAttributeNames())if(l.endsWith(se)){const $=p[n++],m=r.getAttribute(l).split(g),L=/([.?@])?(.*)/.exec($);c.push({type:1,index:o,name:L[2],strings:m,ctor:L[1]==="."?Oe:L[1]==="?"?Ue:L[1]==="@"?Me:k}),r.removeAttribute(l)}else l.startsWith(g)&&(c.push({type:6,index:o}),r.removeAttribute(l));if(ae.test(r.tagName)){const l=r.textContent.split(g),$=l.length-1;if($>0){r.textContent=j?j.emptyScript:"";for(let m=0;m<$;m++)r.append(l[m],O()),b.nextNode(),c.push({type:2,index:++o});r.append(l[$],O())}}}else if(r.nodeType===8)if(r.data===re)c.push({type:2,index:o});else{let l=-1;for(;(l=r.data.indexOf(g,l+1))!==-1;)c.push({type:7,index:o}),l+=g.length-1}o++}}static createElement(e,t){const s=y.createElement("template");return s.innerHTML=e,s}}function C(i,e,t=i,s){var n,a;if(e===w)return e;let r=s!==void 0?(n=t._$Co)==null?void 0:n[s]:t._$Cl;const o=U(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((a=r==null?void 0:r._$AO)==null||a.call(r,!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=r:t._$Cl=r),r!==void 0&&(e=C(i,r._$AS(i,e.values),r,s)),e}class xe{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,r=((e==null?void 0:e.creationScope)??y).importNode(t,!0);b.currentNode=r;let o=b.nextNode(),n=0,a=0,c=s[0];for(;c!==void 0;){if(n===c.index){let d;c.type===2?d=new T(o,o.nextSibling,this,e):c.type===1?d=new c.ctor(o,c.name,c.strings,this,e):c.type===6&&(d=new Ne(o,this,e)),this._$AV.push(d),c=s[++a]}n!==(c==null?void 0:c.index)&&(o=b.nextNode(),n++)}return b.currentNode=y,r}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class T{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=C(this,e,t),U(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):we(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(y.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=N.createElement(de(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(t);else{const n=new xe(r,this),a=n.u(this.options);n.p(t),this.T(a),this._$AH=n}}_$AC(e){let t=he.get(e.strings);return t===void 0&&he.set(e.strings,t=new N(e)),t}k(e){W(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,r=0;for(const o of e)r===t.length?t.push(s=new T(this.O(O()),this.O(O()),this,this.options)):s=t[r],s._$AI(o),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class k{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(e,t=this,s,r){const o=this.strings;let n=!1;if(o===void 0)e=C(this,e,t,0),n=!U(e)||e!==this._$AH&&e!==w,n&&(this._$AH=e);else{const a=e;let c,d;for(e=o[0],c=0;c<o.length-1;c++)d=C(this,a[s+c],t,c),d===w&&(d=this._$AH[c]),n||(n=!U(d)||d!==this._$AH[c]),d===h?e=h:e!==h&&(e+=(d??"")+o[c+1]),this._$AH[c]=d}n&&!r&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Oe extends k{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class Ue extends k{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Me extends k{constructor(e,t,s,r,o){super(e,t,s,r,o),this.type=5}_$AI(e,t=this){if((e=C(this,e,t,0)??h)===w)return;const s=this._$AH,r=e===h&&s!==h||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==h&&(s===h||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ne{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){C(this,e)}}const J=x.litHtmlPolyfillSupport;J==null||J(N,T),(x.litHtmlVersions??(x.litHtmlVersions=[])).push("3.3.0");const Te=(i,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let r=s._$litPart$;if(r===void 0){const o=(t==null?void 0:t.renderBefore)??null;s._$litPart$=r=new T(e.insertBefore(O(),o),o,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=globalThis;class H extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Te(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return w}}H._$litElement$=!0,H.finalized=!0,(ue=E.litElementHydrateSupport)==null||ue.call(E,{LitElement:H});const K=E.litElementPolyfillSupport;K==null||K({LitElement:H}),(E.litElementVersions??(E.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const He={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:V},Re=(i=He,e,t)=>{const{kind:s,metadata:r}=t;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(t.name,i),s==="accessor"){const{name:n}=t;return{set(a){const c=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,c,i)},init(a){return a!==void 0&&this.C(n,void 0,i,a),a}}}if(s==="setter"){const{name:n}=t;return function(a){const c=this[n];e.call(this,a),this.requestUpdate(n,c,i)}}throw Error("Unsupported decorator location: "+s)};function z(i){return(e,t)=>typeof t=="object"?Re(i,e,t):((s,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(r,o):void 0})(i,e,t)}function je(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var pe={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(i){(function(){var e={}.hasOwnProperty;function t(){for(var s=[],r=0;r<arguments.length;r++){var o=arguments[r];if(o){var n=typeof o;if(n==="string"||n==="number")s.push(o);else if(Array.isArray(o)){if(o.length){var a=t.apply(null,o);a&&s.push(a)}}else if(n==="object"){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){s.push(o.toString());continue}for(var c in o)e.call(o,c)&&o[c]&&s.push(c)}}}return s.join(" ")}i.exports?(t.default=t,i.exports=t):window.classNames=t})()})(pe);var ke=pe.exports;const ze=je(ke);class De extends H{componentClassNames(e,t={}){return ze(e,t)}slotEmpty(e){return!this.querySelector(`[slot="${e}"]`)}slotNotEmpty(e){return this.slotEmpty(e)?null:!this.slotEmpty(e)}dispatch({e,eventName:t,detailObj:s={},optionsObj:r={}}){const o={bubbles:!0,composed:!0,...r,detail:{...e&&{originalEvent:e},...s}},n=new CustomEvent(t,o);return this.dispatchEvent(n),n}render(){return le`<slot></slot>`}}const Le=fe`@import '../../design-tokens/core/scss/theming/component';

:host(:first-child)::part(left-divider),
:host(:last-child)::part(right-divider){
  visibility: hidden;
}

.cre8-c-progress-steps-item--complete {
  --divider-color-left: var(--cre8-color-border-brand);
  --divider-color-right: var(--cre8-color-border-brand);
  --icon-color: var(--cre8-color-content-brand);
  --name-color: var(--cre8-color-content-brand);
}

.cre8-c-progress-steps-item--current {
  --divider-color-left: var(--cre8-color-border-brand);
  --divider-color-right: var(--cre8-color-border-strong);
  --icon-color: var(--cre8-color-content-brand);
  --name-color: var(--cre8-color-content-brand);
}

.cre8-c-progress-steps-item--error {
  --divider-color-left: var(--cre8-color-border-brand);
  --divider-color-right: var(--cre8-color-border-strong);
  --icon-color: var(--cre8-color-content-error-icon);
  --name-color: var(--cre8-color-content-error);
}

.cre8-c-progress-steps-item--incomplete {
  --divider-color-left: var(--cre8-color-border-strong);
  --divider-color-right: var(--cre8-color-border-strong);
  --icon-color: var(--cre8-color-content-subtle);
  --name-color: var(--cre8-color-content-subtle);
}

.cre8-c-progress-steps-item--warning {
  --divider-color-left: var(--cre8-color-border-brand);
  --divider-color-right: var(--cre8-color-border-strong);
  --icon-color: var(--cre8-color-content-warning-icon);
  --name-color: var(--cre8-color-content-default);
}

.cre8-c-progress-steps-item {
  @include cre8-typography-title-small();
  text-align: center;
}

.cre8-c-progress-steps-item__top-container {
  align-items: center;
  display: flex;
  padding-bottom: var(--cre8-spacing-8);
}

.cre8-c-progress-steps-item__svg {
  color: var(--icon-color);
  height: calc(var(--size-base-unit) * 2.5);
  margin-left: var(--cre8-spacing-8);
  margin-right: var(--cre8-spacing-8);
  width: calc(var(--size-base-unit) * 2.5);
  svg {
    height: calc(var(--size-base-unit) * 2.5);
    width: calc(var(--size-base-unit) * 2.5);
  }
}

.cre8-c-progress-steps-item__message {
  @include cre8-typography-body-small;
  padding-left: var(--cre8-spacing-16);
  padding-right: var(--cre8-spacing-16);
}

.cre8-c-progress-steps-item__name {
  @include cre8-typography-title-small;
  color: var(--name-color);
  padding-left: var(--cre8-spacing-16);
  padding-right: var(--cre8-spacing-16);
}

.cre8-c-progress-steps-item__divider--left,
.cre8-c-progress-steps-item__divider--right{
  height: calc(var(--size-base-unit) * 0.25);
  width: 100%;
}

.cre8-c-progress-steps-item__divider--left {
  background-color: var(--divider-color-left);
}

.cre8-c-progress-steps-item__divider--right {
  background-color: var(--divider-color-right);
}
`;var Be=Object.defineProperty,D=(i,e,t,s)=>{for(var r=void 0,o=i.length-1,n;o>=0;o--)(n=i[o])&&(r=n(e,t,r)||r);return r&&Be(e,t,r),r};const Z=class Z extends De{render(){const e=this.componentClassNames("cre8-c-progress-steps-item",{"cre8-c-progress-steps-item--complete":this.state==="complete","cre8-c-progress-steps-item--current":this.state==="current","cre8-c-progress-steps-item--error":this.state==="error","cre8-c-progress-steps-item--incomplete":this.state==="incomplete","cre8-c-progress-steps-item--warning":this.state==="warning"});return le`
        <div class='${e}'>
            <div class='cre8-c-progress-steps-item__top-container'>
              <div class='cre8-c-progress-steps-item__divider--left' part='left-divider'></div>
              <span class='cre8-c-progress-steps-item__svg'>
                <cre8-icon svg='${this.svg}' aria-hidden='true'></cre8-icon>
              </span>
              <div class='cre8-c-progress-steps-item__divider--right' part='right-divider'></div>
            </div>
            <div class='cre8-c-progress-steps-item__name'>${this.name}</div>
            <div class='cre8-c-progress-steps-item__message'>${this.message}</div>
        </div>
        `}};Z.styles=[Le];let u=Z;D([z()],u.prototype,"message"),D([z()],u.prototype,"name"),D([z()],u.prototype,"state"),D([z()],u.prototype,"svg"),customElements.get("cre8-progress-steps-item")===void 0&&customElements.define("cre8-progress-steps-item",u),v.Cre8ProgressStepsItem=u,v.default=u,Object.defineProperties(v,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
