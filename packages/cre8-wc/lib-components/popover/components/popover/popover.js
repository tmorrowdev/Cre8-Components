(function(A,y){typeof exports=="object"&&typeof module<"u"?y(exports):typeof define=="function"&&define.amd?define(["exports"],y):(A=typeof globalThis<"u"?globalThis:A||self,y(A.Popover={}))})(this,function(A){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var _e;const y=globalThis,q=y.ShadowRoot&&(y.ShadyCSS===void 0||y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol(),ee=new WeakMap;let te=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==F)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(q&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=ee.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ee.set(t,e))}return e}toString(){return this.cssText}};const Ae=s=>new te(typeof s=="string"?s:s+"",void 0,F),ie=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new te(t,s,F)},we=(s,e)=>{if(q)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=y.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},re=q?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Ae(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ee,defineProperty:Pe,getOwnPropertyDescriptor:Se,getOwnPropertyNames:Ce,getOwnPropertySymbols:Te,getPrototypeOf:xe}=Object,b=globalThis,se=b.trustedTypes,ke=se?se.emptyScript:"",W=b.reactiveElementPolyfillSupport,O=(s,e)=>s,j={toAttribute(s,e){switch(e){case Boolean:s=s?ke:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},X=(s,e)=>!Ee(s,e),oe={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);let T=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=oe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Pe(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=Se(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){const l=r==null?void 0:r.call(this);o==null||o.call(this,n),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??oe}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;const e=xe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){const t=this.properties,i=[...Ce(t),...Te(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(re(r))}else e!==void 0&&t.push(re(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return we(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:j).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){var o,n;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const l=i.getPropertyOptions(r),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((o=l.converter)==null?void 0:o.fromAttribute)!==void 0?l.converter:j;this._$Em=r,this[r]=a.fromAttribute(t,l.type)??((n=this._$Ej)==null?void 0:n.get(r))??null,this._$Em=null}}requestUpdate(e,t,i){var r;if(e!==void 0){const o=this.constructor,n=this[e];if(i??(i=o.getPropertyOptions(e)),!((i.hasChanged??X)(n,t)||i.useDefault&&i.reflect&&n===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,n]of r){const{wrapped:l}=n,a=this[o];l!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[O("elementProperties")]=new Map,T[O("finalized")]=new Map,W==null||W({ReactiveElement:T}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=globalThis,L=H.trustedTypes,ne=L?L.createPolicy("lit-html",{createHTML:s=>s}):void 0,ae="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,le="?"+$,Oe=`<${le}>`,w=document,N=()=>w.createComment(""),U=s=>s===null||typeof s!="object"&&typeof s!="function",K=Array.isArray,He=s=>K(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Y=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ce=/-->/g,he=/>/g,E=RegExp(`>|${Y}(?:([^\\s"'>=/]+)(${Y}*=${Y}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),de=/'/g,pe=/"/g,ue=/^(?:script|style|textarea|title)$/i,Ne=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),u=Ne(1),x=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),ge=new WeakMap,P=w.createTreeWalker(w,129);function fe(s,e){if(!K(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return ne!==void 0?ne.createHTML(e):e}const Ue=(s,e)=>{const t=s.length-1,i=[];let r,o=e===2?"<svg>":e===3?"<math>":"",n=R;for(let l=0;l<t;l++){const a=s[l];let h,p,c=-1,m=0;for(;m<a.length&&(n.lastIndex=m,p=n.exec(a),p!==null);)m=n.lastIndex,n===R?p[1]==="!--"?n=ce:p[1]!==void 0?n=he:p[2]!==void 0?(ue.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=E):p[3]!==void 0&&(n=E):n===E?p[0]===">"?(n=r??R,c=-1):p[1]===void 0?c=-2:(c=n.lastIndex-p[2].length,h=p[1],n=p[3]===void 0?E:p[3]==='"'?pe:de):n===pe||n===de?n=E:n===ce||n===he?n=R:(n=E,r=void 0);const _=n===E&&s[l+1].startsWith("/>")?" ":"";o+=n===R?a+Oe:c>=0?(i.push(h),a.slice(0,c)+ae+a.slice(c)+$+_):a+$+(c===-2?l:_)}return[fe(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class M{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,n=0;const l=e.length-1,a=this.parts,[h,p]=Ue(e,t);if(this.el=M.createElement(h,i),P.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=P.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const c of r.getAttributeNames())if(c.endsWith(ae)){const m=p[n++],_=r.getAttribute(c).split($),I=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:I[2],strings:_,ctor:I[1]==="."?Me:I[1]==="?"?ze:I[1]==="@"?De:B}),r.removeAttribute(c)}else c.startsWith($)&&(a.push({type:6,index:o}),r.removeAttribute(c));if(ue.test(r.tagName)){const c=r.textContent.split($),m=c.length-1;if(m>0){r.textContent=L?L.emptyScript:"";for(let _=0;_<m;_++)r.append(c[_],N()),P.nextNode(),a.push({type:2,index:++o});r.append(c[m],N())}}}else if(r.nodeType===8)if(r.data===le)a.push({type:2,index:o});else{let c=-1;for(;(c=r.data.indexOf($,c+1))!==-1;)a.push({type:7,index:o}),c+=$.length-1}o++}}static createElement(e,t){const i=w.createElement("template");return i.innerHTML=e,i}}function k(s,e,t=s,i){var n,l;if(e===x)return e;let r=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const o=U(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((l=r==null?void 0:r._$AO)==null||l.call(r,!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=k(s,r._$AS(s,e.values),r,i)),e}class Re{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??w).importNode(t,!0);P.currentNode=r;let o=P.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new z(o,o.nextSibling,this,e):a.type===1?h=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(h=new je(o,this,e)),this._$AV.push(h),a=i[++l]}n!==(a==null?void 0:a.index)&&(o=P.nextNode(),n++)}return P.currentNode=w,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class z{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=k(this,e,t),U(e)?e===d||e==null||e===""?(this._$AH!==d&&this._$AR(),this._$AH=d):e!==this._$AH&&e!==x&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):He(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==d&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=M.createElement(fe(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(t);else{const n=new Re(r,this),l=n.u(this.options);n.p(t),this.T(l),this._$AH=n}}_$AC(e){let t=ge.get(e.strings);return t===void 0&&ge.set(e.strings,t=new M(e)),t}k(e){K(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new z(this.O(N()),this.O(N()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class B{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=d}_$AI(e,t=this,i,r){const o=this.strings;let n=!1;if(o===void 0)e=k(this,e,t,0),n=!U(e)||e!==this._$AH&&e!==x,n&&(this._$AH=e);else{const l=e;let a,h;for(e=o[0],a=0;a<o.length-1;a++)h=k(this,l[i+a],t,a),h===x&&(h=this._$AH[a]),n||(n=!U(h)||h!==this._$AH[a]),h===d?e=d:e!==d&&(e+=(h??"")+o[a+1]),this._$AH[a]=h}n&&!r&&this.j(e)}j(e){e===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Me extends B{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===d?void 0:e}}class ze extends B{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==d)}}class De extends B{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=k(this,e,t,0)??d)===x)return;const i=this._$AH,r=e===d&&i!==d||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==d&&(i===d||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class je{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){k(this,e)}}const J=H.litHtmlPolyfillSupport;J==null||J(M,z),(H.litHtmlVersions??(H.litHtmlVersions=[])).push("3.3.0");const Le=(s,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const o=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new z(e.insertBefore(N(),o),o,void 0,t??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=globalThis;class D extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Le(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return x}}D._$litElement$=!0,D.finalized=!0,(_e=S.litElementHydrateSupport)==null||_e.call(S,{LitElement:D});const Z=S.litElementPolyfillSupport;Z==null||Z({LitElement:D}),(S.litElementVersions??(S.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Be={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:X},Ve=(s=Be,e,t)=>{const{kind:i,metadata:r}=t;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(t.name,s),i==="accessor"){const{name:n}=t;return{set(l){const a=e.get.call(this);e.set.call(this,l),this.requestUpdate(n,a,s)},init(l){return l!==void 0&&this.C(n,void 0,s,l),l}}}if(i==="setter"){const{name:n}=t;return function(l){const a=this[n];e.call(this,l),this.requestUpdate(n,a,s)}}throw Error("Unsupported decorator location: "+i)};function f(s){return(e,t)=>typeof t=="object"?Ve(s,e,t):((i,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(s,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ve=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function me(s,e){return(t,i,r)=>{const o=n=>{var l;return((l=n.renderRoot)==null?void 0:l.querySelector(s))??null};return ve(t,i,{get(){return o(this)}})}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ye(s){return(e,t)=>{const{slot:i,selector:r}=s??{},o="slot"+(i?`[name=${i}]`:":not([name])");return ve(e,t,{get(){var a;const n=(a=this.renderRoot)==null?void 0:a.querySelector(o),l=(n==null?void 0:n.assignedElements(s))??[];return r===void 0?l:l.filter(h=>h.matches(r))}})}}function Ie(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var be={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(s){(function(){var e={}.hasOwnProperty;function t(){for(var i=[],r=0;r<arguments.length;r++){var o=arguments[r];if(o){var n=typeof o;if(n==="string"||n==="number")i.push(o);else if(Array.isArray(o)){if(o.length){var l=t.apply(null,o);l&&i.push(l)}}else if(n==="object"){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){i.push(o.toString());continue}for(var a in o)e.call(o,a)&&o[a]&&i.push(a)}}}return i.join(" ")}s.exports?(t.default=t,s.exports=t):window.classNames=t})()})(be);var qe=be.exports;const Fe=Ie(qe);class $e extends D{componentClassNames(e,t={}){return Fe(e,t)}slotEmpty(e){return!this.querySelector(`[slot="${e}"]`)}slotNotEmpty(e){return this.slotEmpty(e)?null:!this.slotEmpty(e)}dispatch({e,eventName:t,detailObj:i={},optionsObj:r={}}){const o={bubbles:!0,composed:!0,...r,detail:{...e&&{originalEvent:e},...i}},n=new CustomEvent(t,o);return this.dispatchEvent(n),n}render(){return u`<slot></slot>`}}const We=ie`@import '../../design-tokens/core/scss/theming/component';


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
`;var Xe=Object.defineProperty,V=(s,e,t,i)=>{for(var r=void 0,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=n(e,t,r)||r);return r&&Xe(e,t,r),r};const G=class G extends $e{constructor(){super(...arguments),this.tagVariant="h5"}render(){const e=this.type?{}:{"cre8-c-heading--headline-large":this.tagVariant==="h1","cre8-c-heading--headline-default":this.tagVariant==="h2","cre8-c-heading--headline-small":this.tagVariant==="h3","cre8-c-heading--title-large":this.tagVariant==="h4","cre8-c-heading--title-default":this.tagVariant==="h5","cre8-c-heading--title-small":this.tagVariant==="h6"},t=this.componentClassNames("cre8-c-heading",{...e,"cre8-c-heading--headline-large":this.type==="headline-large","cre8-c-heading--headline-default":this.type==="headline-default","cre8-c-heading--headline-small":this.type==="headline-small","cre8-c-heading--title-large":this.type==="title-large","cre8-c-heading--title-default":this.type==="title-default","cre8-c-heading--title-small":this.type==="title-small","cre8-c-heading--title-xlarge":this.type==="title-xlarge","cre8-c-heading--display-default":this.type==="display-default","cre8-c-heading--display-small":this.type==="display-small","cre8-c-heading--label-large":this.type==="label-large","cre8-c-heading--label-default":this.type==="label-default","cre8-c-heading--label-small":this.type==="label-small","cre8-c-heading--meta-large":this.type==="meta-large","cre8-c-heading--meta-default":this.type==="meta-default","cre8-c-heading--meta-small":this.type==="meta-small","cre8-c-heading--brand-color":this.brandColor,"cre8-c-heading--inverted":this.inverted});switch(this.tagVariant){case"h1":return u` <h1 part="tag" class="${t}"><slot></slot></h1> `;case"h2":return u` <h2 part="tag" class="${t}"><slot></slot></h2> `;case"h3":return u` <h3 part="tag" class="${t}"><slot></slot></h3> `;case"h4":return u` <h4 part="tag" class="${t}"><slot></slot></h4> `;case"h5":return u` <h5 part="tag" class="${t}"><slot></slot></h5> `;case"h6":return u` <h6 part="tag" class="${t}"><slot></slot></h6> `;default:return u` <h4 part="tag" class="${t}"><slot></slot></h4> `}}};G.styles=[We];let C=G;V([f()],C.prototype,"type"),V([f()],C.prototype,"tagVariant"),V([f({type:Boolean,reflect:!0})],C.prototype,"inverted"),V([f({type:Boolean,reflect:!0})],C.prototype,"brandColor"),customElements.get("cre8-heading")===void 0&&customElements.define("cre8-heading",C);const Ke=ie`@import '../../design-tokens/core/scss/theming/component';
/*------------------------------------*\
 #POPOVER
\*------------------------------------*/

:host {
  display: inline-flex;
}

/** 
 * Popover
 * The main container that holds the trigger and panel
 */
.cre8-c-popover {
  position: relative;
  display: table;
}

/** 
 * Popover panel
 * The container for the popover panel heading, content, and footer
 * 1. Allows the popover to appear over elements, but underneath the global header.
 */
.cre8-c-popover__panel {
  @include cre8-typography-body-default();
  opacity: 0;
  visibility: hidden;
  position: absolute;
  inset-block-start: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
  inset-block-end: auto;
  inset-inline-start: 50%;
  inset-inline-end: auto;
  transform: translateX(var(--rtlTranslateX, -50%));
  display: flex;
  flex-direction: column;
  gap: calc(var(--size-base-unit) * 1);
  width: calc(var(--size-base-unit) * 32);
  z-index: 400; /* 1 */
  background-color: var(--cre8-color-bg-default);
  border: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-radius: var(--cre8-border-radius-default);
  box-shadow: var(--cre8-shadow-default);
  padding: calc(var(--size-base-unit) * 2);

  /**
   * Focus state for popover panel
   */
  &:focus-visible {
    @include focus;
  }
 
  /**
   * Default Popover heading 
   */
  .cre8-c-popover__heading {
    @include cre8-typography-label-small();
  }

  /**
   * Active state for popover panel
   */
  .cre8-is-active:not(.cre8-is-dynamic) &,
  .cre8-is-active.cre8-is-dynamic-active & {
    opacity: 1;
    visibility: visible;
  }

  /**
   * Popover panel positioned to the top of the trigger
   */
  .cre8-c-popover--top & {
    inset-block-start: auto;
    inset-block-end: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
    inset-inline-start: 50%;
    inset-inline-end: auto;
    transform: translateX(var(--rtlTranslateX, -50%));
  }

  /**
   * Popover panel positioned to the left of the trigger
   */
  .cre8-c-popover--left & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: auto;
    inset-inline-end: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
    transform: translateY(-50%);
  }

  /**
   * Popover panel positioned to the right of the trigger
   */
  .cre8-c-popover--right & {
    inset-block-start: 50%;
    inset-block-end: auto;
    inset-inline-start: calc(100% + #{calc(var(--size-base-unit) * 1.5)});
    inset-inline-end: auto;
    transform: translateY(-50%);
  }
}

/**
 * Popover panel arrow
 */
.cre8-c-popover__panel::before {
  content: '';
  display: block;
  width: calc(var(--size-base-unit) * 1.5);
  height: calc(var(--size-base-unit) * 1.5);
  position: absolute;
  margin: auto;
  background-color: var(--cre8-color-bg-default);
  border-block-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  border-inline-start: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  inset-block-start: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
  inset-inline-start: 50%;
  transform: translateX(var(--rtlTranslateX, -50%)) rotate(45deg);

  /**
   * Moves the popover panel arrow to the top of the panel
   */
  .cre8-c-popover--top & {
    inset-block-start: auto;
    inset-block-end: calc((var(--cre8-border-width-default) + #{calc(var(--size-base-unit) * 0.75)}) * -1);
    border-block-start: none;
    border-inline-start: none;
    border-block-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
    border-inline-end: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-strong);
  }

  /**
   * Moves the popover panel arrow to the right side of the panel
   */
  .cre8-c-popover--left & {
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
   * Moves the popover panel arrow to the left side of the panel
   */
  .cre8-c-popover--right & {
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
}

/**
 * Popover footer
 * 1) The footer container in the panel
 */
.cre8-c-popover__footer {
  display: flex;
  gap: calc(var(--size-base-unit) * 2);
}
`;var Ye=Object.defineProperty,v=(s,e,t,i)=>{for(var r=void 0,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=n(e,t,r)||r);return r&&Ye(e,t,r),r};const Q=class Q extends $e{constructor(){super(...arguments),this.handleOnClickOutside=e=>{var i;if(!this.isActive)return;if(!((i=this.shadowRoot)!=null&&i.host))throw Error("Could not determine panel context during click handler");const t=e.composedPath().includes(this.shadowRoot.host);e.target===document.querySelector("html")&&e.clientX>=document.documentElement.offsetWidth||this.isActive&&!t&&this._toggleActive()},this.removeActiveOnScroll=()=>{if(this.isActive&&!this.isVisibleOnScroll){const e=this._Cre8PopoverPanel.getBoundingClientRect();this._Cre8Popover.clientHeight+e.height+e.top<window.innerHeight&&this._toggleActive()}},this.removeActive=()=>{this.isActive&&this._toggleActive()}}get isRTL(){return document.dir==="rtl"}connectedCallback(){super.connectedCallback(),globalThis.window.addEventListener("resize",this.removeActive),globalThis.window.addEventListener("scroll",this.removeActiveOnScroll),globalThis.window.addEventListener("orientationchange",this.removeActive),globalThis.document.addEventListener("mousedown",this.handleOnClickOutside,!1)}disconnectedCallback(){super.disconnectedCallback(),globalThis.window.removeEventListener("resize",this.removeActive),globalThis.window.removeEventListener("scroll",this.removeActiveOnScroll),globalThis.window.removeEventListener("orientationchange",this.removeActive),globalThis.document.removeEventListener("mousedown",this.handleOnClickOutside,!1)}firstUpdated(){this.addAria()}addAria(){let e;this._Cre8PopoverTrigger[0].tagName==="cre8-BUTTON"?(e=this._Cre8PopoverTrigger[0],e.buttonAriaExpanded=this.isActive?this.isActive:!1):(e=this._Cre8PopoverTrigger[0],e.setAttribute("aria-expanded",`${this.isActive?this.isActive:!1}`),e.setAttribute("type","button"))}dynamicPosition(){if(this.isDynamic&&this._Cre8PopoverPanel){const e=document.querySelector("body").getBoundingClientRect(),t=this._Cre8PopoverPanel.getBoundingClientRect();t.left<0&&(this.position=this.isRTL?"left":"right"),t.right>=e.width&&(this.position=this.isRTL?"right":"left"),t.top<0&&t.left>0&&t.right<e.width&&(this.position=null),t.bottom>=window.innerHeight&&t.left>=0&&t.right<=e.width&&(this.position="top")}}_toggleActive(){this.isActive=!this.isActive,this.addAria(),this.isActive?(requestAnimationFrame(()=>{this.dynamicPosition()}),this.dispatchEvent(new CustomEvent("open",{detail:{isActive:this.isActive},bubbles:!0,composed:!0}))):this.dispatchEvent(new CustomEvent("close",{detail:{isActive:this.isActive},bubbles:!0,composed:!0})),setTimeout(()=>{this.isActive?this.isActiveDynamic=!0:this.isActiveDynamic=!1},2)}_handleKeydown(e){e.key==="Escape"&&this.isActive===!0?this._toggleActive():e.key==="Tab"&&this._handleTabNavigation(e)}_handleTabNavigation(e){this.isActive&&this._navigateInsidePopover(e)}_navigateInsidePopover(e){const t=this._getFocusableElements();if(t.length===0){this._closePopoverAndFocusTrigger(e);return}const i=t[t.length-1];document.activeElement===i&&(this._closePopoverAndFocusTrigger(e),e.preventDefault())}_getFocusableElements(){return[...Array.from(this._Cre8PopoverFooter)]}_closePopoverAndFocusTrigger(e){this._toggleActive(),e.preventDefault()}render(){const e=this.componentClassNames("cre8-c-popover",{"cre8-c-popover--top":this.position==="top","cre8-c-popover--left":this.position==="left","cre8-c-popover--right":this.position==="right","cre8-is-active":this.isActive,"cre8-is-dynamic":this.isDynamic,"cre8-is-dynamic-active":this.isActiveDynamic});return u`
      <div class="${e}">
        ${this.slotNotEmpty("trigger")&&u` <slot name="trigger" @keydown=${this._handleKeydown} @click=${this._toggleActive}></slot> `}
        ${this.isActive?u`
              <div tabindex="0" class="cre8-c-popover__panel" @keydown=${this._handleKeydown}>
                ${(this.slotNotEmpty("header")||this.heading)&&u`
                  <div class="cre8-c-popover__header">
                    ${this.heading?u`<div class="cre8-c-popover__heading">${this.heading}</div>`:u`<slot name="header"></slot>`}
                  </div>
                `}
                <slot></slot>
                ${this.slotNotEmpty("footer")&&u`
                  <div class="cre8-c-popover__footer">
                    <slot name="footer"></slot>
                  </div>
                `}
              </div>
            `:d}
      </div>
    `}};Q.styles=[Ke];let g=Q;v([f()],g.prototype,"heading"),v([f()],g.prototype,"position"),v([f({type:Boolean,reflect:!0})],g.prototype,"isVisibleOnScroll"),v([f({type:Boolean,reflect:!0})],g.prototype,"isDynamic"),v([f({type:Boolean,reflect:!0})],g.prototype,"isActiveDynamic"),v([f({type:Boolean,reflect:!0})],g.prototype,"isActive"),v([me(".cre8-c-popover")],g.prototype,"_Cre8Popover"),v([me(".cre8-c-popover__panel")],g.prototype,"_Cre8PopoverPanel"),v([ye({slot:"trigger"})],g.prototype,"_Cre8PopoverTrigger"),v([ye({slot:"footer"})],g.prototype,"_Cre8PopoverFooter"),customElements.get("cre8-popover")===void 0&&customElements.define("cre8-popover",g),A.Cre8Popover=g,A.default=g,Object.defineProperties(A,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
