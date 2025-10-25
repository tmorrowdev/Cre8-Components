(function(w,u){typeof exports=="object"&&typeof module<"u"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):(w=typeof globalThis<"u"?globalThis:w||self,u(w.Cre8Tooltip={}))})(this,function(w){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var fe;const u=globalThis,j=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),G=new WeakMap;let J=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(j&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=G.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&G.set(t,e))}return e}toString(){return this.cssText}};const ge=i=>new J(typeof i=="string"?i:i+"",void 0,q),me=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((r,o,a)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[a+1],i[0]);return new J(t,i,q)},ue=(i,e)=>{if(j)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),o=u.litNonce;o!==void 0&&r.setAttribute("nonce",o),r.textContent=t.cssText,i.appendChild(r)}},Q=j?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return ge(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:be,defineProperty:ve,getOwnPropertyDescriptor:xe,getOwnPropertyNames:we,getOwnPropertySymbols:$e,getPrototypeOf:ke}=Object,b=globalThis,ee=b.trustedTypes,_e=ee?ee.emptyScript:"",V=b.reactiveElementPolyfillSupport,C=(i,e)=>i,I={toAttribute(i,e){switch(e){case Boolean:i=i?_e:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},X=(i,e)=>!be(i,e),te={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);let z=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=te){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),o=this.getPropertyDescriptor(e,r,t);o!==void 0&&ve(this.prototype,e,o)}}static getPropertyDescriptor(e,t,r){const{get:o,set:a}=xe(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:o,set(n){const s=o==null?void 0:o.call(this);a==null||a.call(this,n),this.requestUpdate(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??te}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=ke(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,r=[...we(t),...$e(t)];for(const o of r)this.createProperty(o,t[o])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,o]of t)this.elementProperties.set(r,o)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const o=this._$Eu(t,r);o!==void 0&&this._$Eh.set(o,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const o of r)t.unshift(Q(o))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ue(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){var a;const r=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,r);if(o!==void 0&&r.reflect===!0){const n=(((a=r.converter)==null?void 0:a.toAttribute)!==void 0?r.converter:I).toAttribute(t,r.type);this._$Em=e,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$Em=null}}_$AK(e,t){var a,n;const r=this.constructor,o=r._$Eh.get(e);if(o!==void 0&&this._$Em!==o){const s=r.getPropertyOptions(o),l=typeof s.converter=="function"?{fromAttribute:s.converter}:((a=s.converter)==null?void 0:a.fromAttribute)!==void 0?s.converter:I;this._$Em=o,this[o]=l.fromAttribute(t,s.type)??((n=this._$Ej)==null?void 0:n.get(o))??null,this._$Em=null}}requestUpdate(e,t,r){var o;if(e!==void 0){const a=this.constructor,n=this[e];if(r??(r=a.getPropertyOptions(e)),!((r.hasChanged??X)(n,t)||r.useDefault&&r.reflect&&n===((o=this._$Ej)==null?void 0:o.get(e))&&!this.hasAttribute(a._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:o,wrapped:a},n){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),a!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[a,n]of this._$Ep)this[a]=n;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[a,n]of o){const{wrapped:s}=n,l=this[a];s!==!0||this._$AL.has(a)||l===void 0||this.C(a,void 0,n,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(o=>{var a;return(a=o.hostUpdate)==null?void 0:a.call(o)}),this.update(t)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var o;return(o=r.hostUpdated)==null?void 0:o.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};z.elementStyles=[],z.shadowRootOptions={mode:"open"},z[C("elementProperties")]=new Map,z[C("finalized")]=new Map,V==null||V({ReactiveElement:z}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis,N=T.trustedTypes,re=N?N.createPolicy("lit-html",{createHTML:i=>i}):void 0,oe="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,ie="?"+v,Ae=`<${ie}>`,$=document,P=()=>$.createComment(""),O=i=>i===null||typeof i!="object"&&typeof i!="function",F=Array.isArray,ze=i=>F(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",W=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ae=/-->/g,ne=/>/g,k=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),le=/'/g,se=/"/g,ce=/^(?:script|style|textarea|title)$/i,Ee=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),D=Ee(1),E=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),he=new WeakMap,_=$.createTreeWalker($,129);function pe(i,e){if(!F(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return re!==void 0?re.createHTML(e):e}const Se=(i,e)=>{const t=i.length-1,r=[];let o,a=e===2?"<svg>":e===3?"<math>":"",n=R;for(let s=0;s<t;s++){const l=i[s];let p,y,c=-1,m=0;for(;m<l.length&&(n.lastIndex=m,y=n.exec(l),y!==null);)m=n.lastIndex,n===R?y[1]==="!--"?n=ae:y[1]!==void 0?n=ne:y[2]!==void 0?(ce.test(y[2])&&(o=RegExp("</"+y[2],"g")),n=k):y[3]!==void 0&&(n=k):n===k?y[0]===">"?(n=o??R,c=-1):y[1]===void 0?c=-2:(c=n.lastIndex-y[2].length,p=y[1],n=y[3]===void 0?k:y[3]==='"'?se:le):n===se||n===le?n=k:n===ae||n===ne?n=R:(n=k,o=void 0);const x=n===k&&i[s+1].startsWith("/>")?" ":"";a+=n===R?l+Ae:c>=0?(r.push(p),l.slice(0,c)+oe+l.slice(c)+v+x):l+v+(c===-2?s:x)}return[pe(i,a+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class U{constructor({strings:e,_$litType$:t},r){let o;this.parts=[];let a=0,n=0;const s=e.length-1,l=this.parts,[p,y]=Se(e,t);if(this.el=U.createElement(p,r),_.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(o=_.nextNode())!==null&&l.length<s;){if(o.nodeType===1){if(o.hasAttributes())for(const c of o.getAttributeNames())if(c.endsWith(oe)){const m=y[n++],x=o.getAttribute(c).split(v),L=/([.?@])?(.*)/.exec(m);l.push({type:1,index:a,name:L[2],strings:x,ctor:L[1]==="."?Te:L[1]==="?"?Pe:L[1]==="@"?Oe:B}),o.removeAttribute(c)}else c.startsWith(v)&&(l.push({type:6,index:a}),o.removeAttribute(c));if(ce.test(o.tagName)){const c=o.textContent.split(v),m=c.length-1;if(m>0){o.textContent=N?N.emptyScript:"";for(let x=0;x<m;x++)o.append(c[x],P()),_.nextNode(),l.push({type:2,index:++a});o.append(c[m],P())}}}else if(o.nodeType===8)if(o.data===ie)l.push({type:2,index:a});else{let c=-1;for(;(c=o.data.indexOf(v,c+1))!==-1;)l.push({type:7,index:a}),c+=v.length-1}a++}}static createElement(e,t){const r=$.createElement("template");return r.innerHTML=e,r}}function S(i,e,t=i,r){var n,s;if(e===E)return e;let o=r!==void 0?(n=t._$Co)==null?void 0:n[r]:t._$Cl;const a=O(e)?void 0:e._$litDirective$;return(o==null?void 0:o.constructor)!==a&&((s=o==null?void 0:o._$AO)==null||s.call(o,!1),a===void 0?o=void 0:(o=new a(i),o._$AT(i,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=o:t._$Cl=o),o!==void 0&&(e=S(i,o._$AS(i,e.values),o,r)),e}class Ce{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,o=((e==null?void 0:e.creationScope)??$).importNode(t,!0);_.currentNode=o;let a=_.nextNode(),n=0,s=0,l=r[0];for(;l!==void 0;){if(n===l.index){let p;l.type===2?p=new M(a,a.nextSibling,this,e):l.type===1?p=new l.ctor(a,l.name,l.strings,this,e):l.type===6&&(p=new Re(a,this,e)),this._$AV.push(p),l=r[++s]}n!==(l==null?void 0:l.index)&&(a=_.nextNode(),n++)}return _.currentNode=$,o}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class M{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,o){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),O(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ze(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T($.createTextNode(e)),this._$AH=e}$(e){var a;const{values:t,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=U.createElement(pe(r.h,r.h[0]),this.options)),r);if(((a=this._$AH)==null?void 0:a._$AD)===o)this._$AH.p(t);else{const n=new Ce(o,this),s=n.u(this.options);n.p(t),this.T(s),this._$AH=n}}_$AC(e){let t=he.get(e.strings);return t===void 0&&he.set(e.strings,t=new U(e)),t}k(e){F(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,o=0;for(const a of e)o===t.length?t.push(r=new M(this.O(P()),this.O(P()),this,this.options)):r=t[o],r._$AI(a),o++;o<t.length&&(this._$AR(r&&r._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class B{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,o,a){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=a,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=h}_$AI(e,t=this,r,o){const a=this.strings;let n=!1;if(a===void 0)e=S(this,e,t,0),n=!O(e)||e!==this._$AH&&e!==E,n&&(this._$AH=e);else{const s=e;let l,p;for(e=a[0],l=0;l<a.length-1;l++)p=S(this,s[r+l],t,l),p===E&&(p=this._$AH[l]),n||(n=!O(p)||p!==this._$AH[l]),p===h?e=h:e!==h&&(e+=(p??"")+a[l+1]),this._$AH[l]=p}n&&!o&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Te extends B{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class Pe extends B{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Oe extends B{constructor(e,t,r,o,a){super(e,t,r,o,a),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??h)===E)return;const r=this._$AH,o=e===h&&r!==h||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,a=e!==h&&(r===h||o);o&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Re{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}}const K=T.litHtmlPolyfillSupport;K==null||K(U,M),(T.litHtmlVersions??(T.litHtmlVersions=[])).push("3.3.0");const Ue=(i,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let o=r._$litPart$;if(o===void 0){const a=(t==null?void 0:t.renderBefore)??null;r._$litPart$=o=new M(e.insertBefore(P(),a),a,void 0,t??{})}return o._$AI(i),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=globalThis;class H extends z{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ue(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return E}}H._$litElement$=!0,H.finalized=!0,(fe=A.litElementHydrateSupport)==null||fe.call(A,{LitElement:H});const Y=A.litElementPolyfillSupport;Y==null||Y({LitElement:H}),(A.litElementVersions??(A.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Me={attribute:!0,type:String,converter:I,reflect:!1,hasChanged:X},He=(i=Me,e,t)=>{const{kind:r,metadata:o}=t;let a=globalThis.litPropertyMetadata.get(o);if(a===void 0&&globalThis.litPropertyMetadata.set(o,a=new Map),r==="setter"&&((i=Object.create(i)).wrapped=!0),a.set(t.name,i),r==="accessor"){const{name:n}=t;return{set(s){const l=e.get.call(this);e.set.call(this,s),this.requestUpdate(n,l,i)},init(s){return s!==void 0&&this.C(n,void 0,i,s),s}}}if(r==="setter"){const{name:n}=t;return function(s){const l=this[n];e.call(this,s),this.requestUpdate(n,l,i)}}throw Error("Unsupported decorator location: "+r)};function g(i){return(e,t)=>typeof t=="object"?He(i,e,t):((r,o,a)=>{const n=o.hasOwnProperty(a);return o.constructor.createProperty(a,r),n?Object.getOwnPropertyDescriptor(o,a):void 0})(i,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ie=(i,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(i,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function de(i,e){return(t,r,o)=>{const a=n=>{var s;return((s=n.renderRoot)==null?void 0:s.querySelector(i))??null};return Ie(t,r,{get(){return a(this)}})}}let Ne=(i=21)=>crypto.getRandomValues(new Uint8Array(i)).reduce((e,t)=>(t&=63,t<36?e+=t.toString(36):t<62?e+=(t-26).toString(36).toUpperCase():t>62?e+="-":e+="_",e),"");/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const De=i=>i??h;function Be(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var ye={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(i){(function(){var e={}.hasOwnProperty;function t(){for(var r=[],o=0;o<arguments.length;o++){var a=arguments[o];if(a){var n=typeof a;if(n==="string"||n==="number")r.push(a);else if(Array.isArray(a)){if(a.length){var s=t.apply(null,a);s&&r.push(s)}}else if(n==="object"){if(a.toString!==Object.prototype.toString&&!a.toString.toString().includes("[native code]")){r.push(a.toString());continue}for(var l in a)e.call(a,l)&&a[l]&&r.push(l)}}}return r.join(" ")}i.exports?(t.default=t,i.exports=t):window.classNames=t})()})(ye);var Le=ye.exports;const je=Be(Le);class qe extends H{componentClassNames(e,t={}){return je(e,t)}slotEmpty(e){return!this.querySelector(`[slot="${e}"]`)}slotNotEmpty(e){return this.slotEmpty(e)?null:!this.slotEmpty(e)}dispatch({e,eventName:t,detailObj:r={},optionsObj:o={}}){const a={bubbles:!0,composed:!0,...o,detail:{...e&&{originalEvent:e},...r}},n=new CustomEvent(t,a);return this.dispatchEvent(n),n}render(){return D`<slot></slot>`}}const Ve=me`
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
 #TOOLTIP
\*------------------------------------*/

:host {
  display: inline-flex;
}

/** 
 * Tooltip
 * The main container that holds the trigger and panel
 */
.cre8-c-tooltip {
  position: relative;
  display: table;
}

/** 
 * Tooltip panel
 * The container for the tooltip panel heading, content, and footer
 */
.cre8-c-tooltip__panel {
  @include cre8-typography-body-default();
  opacity: 0;
  visibility: hidden;
  position: absolute;
  word-wrap: break-word;
  inset-block-start: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
  inset-block-end: auto;
  inset-inline-start: 50%;
  inset-inline-end: auto;
  transform: translateX(var(--rtlTranslateX, -50%));
  display: flex;
  flex-direction: column;
  gap: calc(var(--size-base-unit) * 1);
  width: max-content;
  max-width: calc(var(--size-base-unit) * 35);
  z-index: 400;
  color: var(--cre8-color-content-knockout);
  background-color: var(--cre8-color-bg-strong);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  padding: calc(var(--size-base-unit) * 1);

  /**
   * Active state for tooltip panel
   */
  .cre8-is-active:not(.cre8-is-dynamic) &,
  .cre8-is-active.cre8-is-dynamic-active & {
    opacity: 1;
    visibility: visible;
  }

  /**
   * Tooltip panel positioned to the top of the trigger
   */
  .cre8-c-tooltip--top & {
    inset-block-start: auto;
    inset-block-end: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
    inset-inline-start: 50%;
    inset-inline-end: auto;
    transform: translateX(var(--rtlTranslateX, -50%));
  }

  /**
   * Tooltip panel positioned to the left of the trigger
   */
  .cre8-c-tooltip--left & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: auto;
    inset-inline-end: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
    transform: translateY(-50%);
  }

  /**
   * Tooltip panel positioned to the right of the trigger
   */
  .cre8-c-tooltip--right & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
    inset-inline-end: auto;
    transform: translateY(-50%);
  }

  /**
   * Tooltip panel knockout
   */
  .cre8-c-tooltip--knockout & {
    background-color: var(--cre8-color-bg-default);
    color: var(--cre8-color-content-default);
  }
}

/**
 * Tooltip panel arrow
 */
.cre8-c-tooltip__panel::before {
  content: '';
  display: block;
  width: calc(var(--size-base-unit) * 1.5);
  height: calc(var(--size-base-unit) * 1.5);
  position: absolute;
  margin: auto;
  background-color: var(--cre8-color-bg-strong);
  border-block-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-inline-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  inset-block-start: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
  inset-inline-start: 50%;
  transform: translateX(var(--rtlTranslateX, -50%)) rotate(45deg);

  /**
   * Moves the tooltip panel arrow to the top of the panel
   */
  .cre8-c-tooltip--top & {
    inset-block-start: auto;
    inset-block-end: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
    border-block-start: none;
    border-inline-start: none;
    border-block-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  }

  /**
   * Moves the tooltip panel arrow to the right side of the panel
   */
  .cre8-c-tooltip--left & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: auto;
    inset-inline-end: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
    border-block-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-start: none;
    border-block-end: none;
    border-inline-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    transform: translateY(-50%) rotate(var(--rtlRotate45Inverse, 45deg));
  }

  /**
   * Moves the tooltip panel arrow to the left side of the panel
   */
  .cre8-c-tooltip--right & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
    inset-inline-end: auto;
    border-block-start: none;
    border-inline-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-block-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-end: none;
    transform: translateY(-50%) rotate(var(--rtlRotate45Inverse, 45deg));
  }

  /**
   * Tooltip arrow knockout
   */
  .cre8-c-tooltip--knockout & {
    background-color: var(--cre8-color-bg-default);
  }
}

/**
 * Tooltip footer
 * 1) The footer container in the panel
 */
.cre8-c-tooltip__footer {
  display: flex;
  gap: calc(var(--size-base-unit) * 2);
  justify-content: flex-end;
  flex-grow: 1;
}

/**
 * Tooltip trigger
 * 1) Add global focus state on keyboard focus
 */
.cre8-c-tooltip__trigger {
  cursor: pointer;

  &:focus-visible {
    @include focus;
  }
}

svg {
  display: flex;
  height: calc(var(--size-base-unit) * 2);
  width: calc(var(--size-base-unit) * 2);
}
`;var Xe=Object.defineProperty,f=(i,e,t,r)=>{for(var o=void 0,a=i.length-1,n;a>=0;a--)(n=i[a])&&(o=n(e,t,o)||o);return o&&Xe(e,t,o),o};const Z=class Z extends qe{constructor(){super(...arguments),this.iconRotateDegree=0,this.removeActive=()=>{this.isActive&&this.toggleActive()}}get isRTL(){return document.dir==="rtl"}updated(){const e=this.shadowRoot.querySelectorAll("slot")[1].assignedNodes().reduce((t,r)=>`${t}${r.textContent.replace(/\n/g,"").trim()}`,"");document.getElementById(this._uniqueId)&&(document.getElementById(this._uniqueId).textContent=e)}firstUpdated(){if(this.ariaDescribes){this._uniqueId=this._uniqueId||Ne();const e=new RegExp(`\\b${this._uniqueId}\\b`),t=document.createElement("div");t.setAttribute("role","tooltip"),t.setAttribute("style","position:fixed; left: -1000px; top: -1000px;"),t.id=this._uniqueId;const r=document.getElementById(this.ariaDescribes);r.parentNode.insertBefore(t,r);const o=r==null?void 0:r.getAttribute("aria-describedBy");r==null||r.setAttribute("aria-describedby",`${o?`${o.replace(e,"")} `:""}${this._uniqueId}`.trim())}}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseover",this.toggleActive),this.addEventListener("mouseout",this.removeActive)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseover",this.toggleActive),this.removeEventListener("mouseout",this.removeActive)}dynamicPosition(){if(this.isDynamic&&this._Cre8TooltipPanel){const e=document.querySelector("body").getBoundingClientRect(),t=this._Cre8TooltipPanel.getBoundingClientRect(),r=this._Cre8Tooltip.clientHeight+t.height+t.top;t.left<0&&(this.position=this.isRTL?"left":"right"),t.right>=e.width&&(this.position=this.isRTL?"right":"left"),t.top<0&&t.left>0&&t.right<e.width&&(this.position=null),r>=window.innerHeight&&t.bottom>=window.innerHeight&&t.left>=0&&t.right<=e.width&&(this.position="top")}}_handleKeydown(e){this.isActive&&(e.code==="Escape"||e.code==="Tab")&&this.toggleActive(),(e.code==="Enter"||e.code==="Space")&&this.toggleActive()}toggleActive(){this.isActive=!this.isActive,this.isActive?(setTimeout(()=>{this.dynamicPosition()},1),this.dispatchEvent(new CustomEvent("open",{detail:{isActive:this.isActive},bubbles:!0,composed:!0}))):this.dispatchEvent(new CustomEvent("close",{detail:{isActive:this.isActive},bubbles:!0,composed:!0})),setTimeout(()=>{this.isActive&&this.isDynamic?this.isActiveDynamic=!0:this.isActiveDynamic=!1},2)}render(){const e=this.componentClassNames("cre8-c-tooltip",{"cre8-c-tooltip--top":this.position==="top","cre8-c-tooltip--left":this.position==="left","cre8-c-tooltip--right":this.position==="right","cre8-c-tooltip--knockout":this.knockout,"cre8-is-active":this.isActive,"cre8-is-dynamic":this.isDynamic,"cre8-is-dynamic-active":this.isActiveDynamic});return D`
        <div class="${e}">
            <div 
                class="cre8-c-tooltip__trigger"
                tabindex="0"
                @focus=${this.toggleActive}
                @keydown=${this._handleKeydown}
            >
                ${this.svg?D`
            <slot name="trigger">
                <cre8-icon svg='${this.svg}' rotate="${Number(this.iconRotateDegree)}" 
                flip="${this.iconFlipDirection}" aria-hidden="true"></cre8-icon>
            </slot>`:D`<slot name="trigger"></slot>`}
            </div>
            <dialog
                id=${De(this._uniqueId)}
                aria-labelledby=${this.ariaDescribes}
                class="cre8-c-tooltip__panel"
                role="tooltip">
                <slot></slot>
            </dialog>
        </div>
      `}};Z.styles=[Ve];let d=Z;f([g()],d.prototype,"position"),f([g({type:Boolean,reflect:!0})],d.prototype,"knockout"),f([g({type:Boolean,reflect:!0})],d.prototype,"isDynamic"),f([g({type:Boolean})],d.prototype,"isActiveDynamic"),f([g({type:Boolean,reflect:!0})],d.prototype,"isActive"),f([g({type:String})],d.prototype,"ariaDescribes"),f([g({type:String})],d.prototype,"_uniqueId"),f([g()],d.prototype,"svg"),f([g({type:Number})],d.prototype,"iconRotateDegree"),f([g()],d.prototype,"iconFlipDirection"),f([de(".cre8-c-tooltip")],d.prototype,"_Cre8Tooltip"),f([de(".cre8-c-tooltip__panel")],d.prototype,"_Cre8TooltipPanel"),customElements.get("cre8-tooltip")===void 0&&customElements.define("cre8-tooltip",d),w.Cre8Tooltip=d,w.default=d,Object.defineProperties(w,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
