(function(_,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(_=typeof globalThis<"u"?globalThis:_||self,f(_.TextPassage={}))})(this,function(_){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ft;const f=globalThis,D=f.ShadowRoot&&(f.ShadyCSS===void 0||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,L=Symbol(),J=new WeakMap;let K=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==L)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(D&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=J.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&J.set(e,t))}return t}toString(){return this.cssText}};const $t=r=>new K(typeof r=="string"?r:r+"",void 0,L),Z=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new K(e,r,L)},gt=(r,t)=>{if(D)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=f.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Q=D?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return $t(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:mt,defineProperty:_t,getOwnPropertyDescriptor:yt,getOwnPropertyNames:vt,getOwnPropertySymbols:At,getPrototypeOf:bt}=Object,$=globalThis,X=$.trustedTypes,Et=X?X.emptyScript:"",B=$.reactiveElementPolyfillSupport,C=(r,t)=>r,N={toAttribute(r,t){switch(t){case Boolean:r=r?Et:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},I=(r,t)=>!mt(r,t),Y={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:I};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);let S=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&_t(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=yt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const l=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Y}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=bt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,s=[...vt(e),...At(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Q(i))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:N).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const l=s.getPropertyOptions(i),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((n=l.converter)==null?void 0:n.fromAttribute)!==void 0?l.converter:N;this._$Em=i,this[i]=a.fromAttribute(e,l.type)??((o=this._$Ej)==null?void 0:o.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,o=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??I)(o,e)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:l}=o,a=this[n];l!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[C("elementProperties")]=new Map,S[C("finalized")]=new Map,B==null||B({ReactiveElement:S}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,z=P.trustedTypes,tt=z?z.createPolicy("lit-html",{createHTML:r=>r}):void 0,et="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,st="?"+g,St=`<${st}>`,y=document,O=()=>y.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",q=Array.isArray,xt=r=>q(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",V=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,it=/-->/g,rt=/>/g,v=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nt=/'/g,ot=/"/g,at=/^(?:script|style|textarea|title)$/i,wt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),lt=wt(1),x=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ct=new WeakMap,A=y.createTreeWalker(y,129);function ht(r,t){if(!q(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return tt!==void 0?tt.createHTML(t):t}const Ct=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=M;for(let l=0;l<e;l++){const a=r[l];let d,p,c=-1,u=0;for(;u<a.length&&(o.lastIndex=u,p=o.exec(a),p!==null);)u=o.lastIndex,o===M?p[1]==="!--"?o=it:p[1]!==void 0?o=rt:p[2]!==void 0?(at.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=v):p[3]!==void 0&&(o=v):o===v?p[0]===">"?(o=i??M,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?v:p[3]==='"'?ot:nt):o===ot||o===nt?o=v:o===it||o===rt?o=M:(o=v,i=void 0);const m=o===v&&r[l+1].startsWith("/>")?" ":"";n+=o===M?a+St:c>=0?(s.push(d),a.slice(0,c)+et+a.slice(c)+g+m):a+g+(c===-2?l:m)}return[ht(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class T{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[d,p]=Ct(t,e);if(this.el=T.createElement(d,s),A.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=A.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(et)){const u=p[o++],m=i.getAttribute(c).split(g),j=/([.?@])?(.*)/.exec(u);a.push({type:1,index:n,name:j[2],strings:m,ctor:j[1]==="."?Ot:j[1]==="?"?Ut:j[1]==="@"?Mt:R}),i.removeAttribute(c)}else c.startsWith(g)&&(a.push({type:6,index:n}),i.removeAttribute(c));if(at.test(i.tagName)){const c=i.textContent.split(g),u=c.length-1;if(u>0){i.textContent=z?z.emptyScript:"";for(let m=0;m<u;m++)i.append(c[m],O()),A.nextNode(),a.push({type:2,index:++n});i.append(c[u],O())}}}else if(i.nodeType===8)if(i.data===st)a.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(g,c+1))!==-1;)a.push({type:7,index:n}),c+=g.length-1}n++}}static createElement(t,e){const s=y.createElement("template");return s.innerHTML=t,s}}function w(r,t,e=r,s){var o,l;if(t===x)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=U(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((l=i==null?void 0:i._$AO)==null||l.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=w(r,i._$AS(r,t.values),i,s)),t}class Pt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??y).importNode(e,!0);A.currentNode=i;let n=A.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new k(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new Tt(n,this,t)),this._$AV.push(d),a=s[++l]}o!==(a==null?void 0:a.index)&&(n=A.nextNode(),o++)}return A.currentNode=y,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class k{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),U(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==x&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):xt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(y.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=T.createElement(ht(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new Pt(i,this),l=o.u(this.options);o.p(e),this.T(l),this._$AH=o}}_$AC(t){let e=ct.get(t.strings);return e===void 0&&ct.set(t.strings,e=new T(t)),e}k(t){q(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new k(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class R{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=h}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=w(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==x,o&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=w(this,l[s+a],e,a),d===x&&(d=this._$AH[a]),o||(o=!U(d)||d!==this._$AH[a]),d===h?t=h:t!==h&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!i&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ot extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}}class Ut extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}}class Mt extends R{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??h)===x)return;const s=this._$AH,i=t===h&&s!==h||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==h&&(s===h||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Tt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const W=P.litHtmlPolyfillSupport;W==null||W(T,k),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.0");const kt=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new k(t.insertBefore(O(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class H extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=kt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return x}}H._$litElement$=!0,H.finalized=!0,(ft=b.litElementHydrateSupport)==null||ft.call(b,{LitElement:H});const G=b.litElementPolyfillSupport;G==null||G({LitElement:H}),(b.litElementVersions??(b.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ht={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:I},Nt=(r=Ht,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,r)},init(l){return l!==void 0&&this.C(o,void 0,r,l),l}}}if(s==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function dt(r){return(t,e)=>typeof e=="object"?Nt(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}function zt(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var pt={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(r){(function(){var t={}.hasOwnProperty;function e(){for(var s=[],i=0;i<arguments.length;i++){var n=arguments[i];if(n){var o=typeof n;if(o==="string"||o==="number")s.push(n);else if(Array.isArray(n)){if(n.length){var l=e.apply(null,n);l&&s.push(l)}}else if(o==="object"){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){s.push(n.toString());continue}for(var a in n)t.call(n,a)&&n[a]&&s.push(a)}}}return s.join(" ")}r.exports?(e.default=e,r.exports=e):window.classNames=e})()})(pt);var Rt=pt.exports;const jt=zt(Rt);class Dt extends H{componentClassNames(t,e={}){return jt(t,e)}slotEmpty(t){return!this.querySelector(`[slot="${t}"]`)}slotNotEmpty(t){return this.slotEmpty(t)?null:!this.slotEmpty(t)}dispatch({e:t,eventName:e,detailObj:s={},optionsObj:i={}}){const n={bubbles:!0,composed:!0,...i,detail:{...t&&{originalEvent:t},...s}},o=new CustomEvent(e,n);return this.dispatchEvent(o),o}render(){return lt`<slot></slot>`}}const Lt=Z`@import '../../design-tokens/core/scss/theming/component';

/**
 * 1) A passage of text  (e.g. article, blog post), including uncontrolled elements
 *    (e.g. unclassed h2, h3, ul, li, and so on).
 * 2) Use this file only for styling text passage and elements inside of text passage.
 */
cre8-text-passage,
cre8-text-passage[size='default'] {
  @include cre8-typography-body-default();

  /**
  * Generic h1 within text passage
  */

  h1 {
    @include cre8-typography-display-small();
    margin-bottom: calc(var(--size-base-unit) * 1.5);
  }

  /**
  * Generic h2 within text passage
  */
  h2 {
    @include cre8-typography-headline-default();
    margin-bottom: calc(var(--size-base-unit) * 1.5);
  }

  /**
  * Generic h3 within text passage
  */
  h3 {
    @include cre8-typography-headline-small();
    margin-bottom: calc(var(--size-base-unit) * 1.5);
  }

  /**
  * Generic h4 within text passage
  */
  h4 {
    @include cre8-typography-title-large();
    margin-bottom: calc(var(--size-base-unit) * 1.5);
  }

  /**
  * Generic h5 within text passage
  */
  h5 {
    @include cre8-typography-meta-large();
    margin-bottom: calc(var(--size-base-unit) * 1.5);
  }

  /**
  * Generic unordered and ordered lists within text passage
  */
  ul,
  ol {
    margin-top: 0;
  }

  /**
  * Unordered list within text passage
  */
  ul {
    margin-left: calc(var(--size-base-unit) * 2.5);
    padding-left: 0;
  }

  /**
  * Ordered list within text passage
  */
  ol {
    margin-left: calc(var(--size-base-unit) * 2.25);
    padding-left: 0;
  }

  /**
  * Generic link tag within text passage
  */
  a {
    color: var(--cre8-color-content-link);

    &:hover,
    &:focus {
      text-decoration: underline;
      color: var(--cre8-color-content-link-hover);
    }
  }

  /**
  * Paragraph tag within text passage
  */
  p {
    margin-top: 0;
    margin-bottom: calc(var(--size-base-unit) * 3);
  }

  /**
  * Blockquote within text passage
  */
  blockquote {
    font-style: italic;
    border-left: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-content-subtle);
    color: var(--cre8-color-content-subtle);
    padding-left: calc(var(--size-base-unit) * 2);
    margin-left: 0;
    margin-bottom: calc(var(--size-base-unit) * 2);
  }

  /**
* Last item declared in the text passage
* 1) Remove default margin bottom from the item
*/
  :last-child {
    margin-bottom: 0;
  }
}

/**
* Inverted text passage
*/
cre8-text-passage[inverted] {
  /**
  * Blockquote within inverted text passage
  */
  a {
    color: var(--cre8-color-content-brand-knockout);
    &:hover,
    &:focus {
      color: var(--cre8-color-content-brand-knockout-hover);
    }
  }
  blockquote {
    color: var(--cre8-color-content-knockout);
    font-style: italic;
    border-left: var(--cre8-border-width-default) var(--cre8-border-style-default) var(--cre8-color-border-knockout);
    padding-left: calc(var(--size-base-unit) * 2);
    margin-left: 0;
    margin-bottom: calc(var(--size-base-unit) * 2);
  }
}
`,Bt=Z`@import '../../design-tokens/core/scss/theming/component';

/**
 * !!! DO NOT USE THIS FILE for styling specific elements within text passage.
 * Use text-passage-ligh-dom.scss to for styling.!!!
 */

 :host {
  display: inline-flex;
 }

.cre8-c-text-passage--small {
  @include cre8-typography-body-small();

  /**
    * Unordered list within small text passage
    */
}
.cre8-c-text-passage--large {
  @include cre8-typography-body-large();

  /**
    * Unordered list within small text passage
    */
}
.cre8-c-text-passage--inverted {
  color: var(--cre8-color-content-knockout);
}
::slotted(.header) {
  margin-bottom: calc(var(--size-base-unit) * 1.5);
}
`;var It=Object.defineProperty,ut=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&It(t,e,i),i};const F=class F extends Dt{constructor(){super(...arguments),this.size="default"}connectedCallback(){if(super.connectedCallback(),!document.head.querySelector("#cre8-text-passage-styles")){const e=document.createElement("style");e.id="cre8-text-passage-styles",e.innerHTML=Lt.cssText,document.head.appendChild(e)}}render(){const t=this.componentClassNames("cre8-c-text-passage",{"cre8-c-text-passage--default":this.size==="default"||void 0,"cre8-c-text-passage--inverted":this.inverted,"cre8-c-text-passage--small":this.size==="small","cre8-c-text-passage--large":this.size==="large"});return lt`
      <div class="${t}">
        <slot></slot>
      </div>
    `}};F.styles=[Bt];let E=F;ut([dt({type:Boolean,reflect:!0})],E.prototype,"inverted"),ut([dt()],E.prototype,"size"),customElements.get("cre8-text-passage")===void 0&&customElements.define("cre8-text-passage",E),_.Cre8TextPassage=E,_.default=E,Object.defineProperties(_,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
