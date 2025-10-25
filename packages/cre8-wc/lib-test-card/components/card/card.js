(function(y,f){typeof exports=="object"&&typeof module<"u"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(y=typeof globalThis<"u"?globalThis:y||self,f(y.Cre8Card={}))})(this,function(y){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ut;const f=globalThis,L=f.ShadowRoot&&(f.ShadyCSS===void 0||f.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B=Symbol(),Z=new WeakMap;let G=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==B)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(L&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Z.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Z.set(e,t))}return t}toString(){return this.cssText}};const ft=r=>new G(typeof r=="string"?r:r+"",void 0,B),$t=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new G(e,r,B)},_t=(r,t)=>{if(L)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=f.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Q=L?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ft(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:mt,defineProperty:yt,getOwnPropertyDescriptor:gt,getOwnPropertyNames:vt,getOwnPropertySymbols:At,getPrototypeOf:bt}=Object,$=globalThis,X=$.trustedTypes,Et=X?X.emptyScript:"",I=$.reactiveElementPolyfillSupport,x=(r,t)=>r,k={toAttribute(r,t){switch(t){case Boolean:r=r?Et:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},q=(r,t)=>!mt(r,t),Y={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&yt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=gt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){const h=i==null?void 0:i.call(this);o==null||o.call(this,n),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Y}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=bt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,s=[...vt(e),...At(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Q(i))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _t(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var o;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const n=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:k).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){var o,n;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const h=s.getPropertyOptions(i),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((o=h.converter)==null?void 0:o.fromAttribute)!==void 0?h.converter:k;this._$Em=i,this[i]=a.fromAttribute(e,h.type)??((n=this._$Ej)==null?void 0:n.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const o=this.constructor,n=this[t];if(s??(s=o.getPropertyOptions(t)),!((s.hasChanged??q)(n,e)||s.useDefault&&s.reflect&&n===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i){const{wrapped:h}=n,a=this[o];h!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[x("elementProperties")]=new Map,w[x("finalized")]=new Map,I==null||I({ReactiveElement:w}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,R=P.trustedTypes,tt=R?R.createPolicy("lit-html",{createHTML:r=>r}):void 0,et="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,st="?"+_,wt=`<${st}>`,g=document,O=()=>g.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",V=Array.isArray,St=r=>V(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",W=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,it=/-->/g,rt=/>/g,v=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ot=/'/g,nt=/"/g,at=/^(?:script|style|textarea|title)$/i,Ct=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),z=Ct(1),S=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ht=new WeakMap,A=g.createTreeWalker(g,129);function lt(r,t){if(!V(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return tt!==void 0?tt.createHTML(t):t}const xt=(r,t)=>{const e=r.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",n=M;for(let h=0;h<e;h++){const a=r[h];let d,p,l=-1,u=0;for(;u<a.length&&(n.lastIndex=u,p=n.exec(a),p!==null);)u=n.lastIndex,n===M?p[1]==="!--"?n=it:p[1]!==void 0?n=rt:p[2]!==void 0?(at.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=v):p[3]!==void 0&&(n=v):n===v?p[0]===">"?(n=i??M,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?v:p[3]==='"'?nt:ot):n===nt||n===ot?n=v:n===it||n===rt?n=M:(n=v,i=void 0);const m=n===v&&r[h+1].startsWith("/>")?" ":"";o+=n===M?a+wt:l>=0?(s.push(d),a.slice(0,l)+et+a.slice(l)+_+m):a+_+(l===-2?h:m)}return[lt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class N{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const h=t.length-1,a=this.parts,[d,p]=xt(t,e);if(this.el=N.createElement(d,s),A.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=A.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(et)){const u=p[n++],m=i.getAttribute(l).split(_),D=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:D[2],strings:m,ctor:D[1]==="."?Ot:D[1]==="?"?Ut:D[1]==="@"?Mt:j}),i.removeAttribute(l)}else l.startsWith(_)&&(a.push({type:6,index:o}),i.removeAttribute(l));if(at.test(i.tagName)){const l=i.textContent.split(_),u=l.length-1;if(u>0){i.textContent=R?R.emptyScript:"";for(let m=0;m<u;m++)i.append(l[m],O()),A.nextNode(),a.push({type:2,index:++o});i.append(l[u],O())}}}else if(i.nodeType===8)if(i.data===st)a.push({type:2,index:o});else{let l=-1;for(;(l=i.data.indexOf(_,l+1))!==-1;)a.push({type:7,index:o}),l+=_.length-1}o++}}static createElement(t,e){const s=g.createElement("template");return s.innerHTML=t,s}}function C(r,t,e=r,s){var n,h;if(t===S)return t;let i=s!==void 0?(n=e._$Co)==null?void 0:n[s]:e._$Cl;const o=U(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((h=i==null?void 0:i._$AO)==null||h.call(i,!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=C(r,i._$AS(r,t.values),i,s)),t}class Pt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??g).importNode(e,!0);A.currentNode=i;let o=A.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new H(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new Nt(o,this,t)),this._$AV.push(d),a=s[++h]}n!==(a==null?void 0:a.index)&&(o=A.nextNode(),n++)}return A.currentNode=g,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class H{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),U(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):St(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(g.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=N.createElement(lt(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(e);else{const n=new Pt(i,this),h=n.u(this.options);n.p(e),this.T(h),this._$AH=n}}_$AC(t){let e=ht.get(t.strings);return e===void 0&&ht.set(t.strings,e=new N(t)),e}k(t){V(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new H(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(o===void 0)t=C(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==S,n&&(this._$AH=t);else{const h=t;let a,d;for(t=o[0],a=0;a<o.length-1;a++)d=C(this,h[s+a],e,a),d===S&&(d=this._$AH[a]),n||(n=!U(d)||d!==this._$AH[a]),d===c?t=c:t!==c&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ot extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class Ut extends j{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class Mt extends j{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??c)===S)return;const s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Nt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const F=P.litHtmlPolyfillSupport;F==null||F(N,H),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.0");const Ht=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const o=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new H(t.insertBefore(O(),o),o,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class T extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ht(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return S}}T._$litElement$=!0,T.finalized=!0,(ut=b.litElementHydrateSupport)==null||ut.call(b,{LitElement:T});const J=b.litElementPolyfillSupport;J==null||J({LitElement:T}),(b.litElementVersions??(b.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:q},kt=(r=Tt,t,e)=>{const{kind:s,metadata:i}=e;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(e.name,r),s==="accessor"){const{name:n}=e;return{set(h){const a=t.get.call(this);t.set.call(this,h),this.requestUpdate(n,a,r)},init(h){return h!==void 0&&this.C(n,void 0,r,h),h}}}if(s==="setter"){const{name:n}=e;return function(h){const a=this[n];t.call(this,h),this.requestUpdate(n,a,r)}}throw Error("Unsupported decorator location: "+s)};function ct(r){return(t,e)=>typeof e=="object"?kt(r,t,e):((s,i,o)=>{const n=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(i,o):void 0})(r,t,e)}function Rt(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var dt={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(r){(function(){var t={}.hasOwnProperty;function e(){for(var s=[],i=0;i<arguments.length;i++){var o=arguments[i];if(o){var n=typeof o;if(n==="string"||n==="number")s.push(o);else if(Array.isArray(o)){if(o.length){var h=e.apply(null,o);h&&s.push(h)}}else if(n==="object"){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){s.push(o.toString());continue}for(var a in o)t.call(o,a)&&o[a]&&s.push(a)}}}return s.join(" ")}r.exports?(e.default=e,r.exports=e):window.classNames=e})()})(dt);var zt=dt.exports;const jt=Rt(zt);class Dt extends T{componentClassNames(t,e={}){return jt(t,e)}slotEmpty(t){return!this.querySelector(`[slot="${t}"]`)}slotNotEmpty(t){return this.slotEmpty(t)?null:!this.slotEmpty(t)}dispatch({e:t,eventName:e,detailObj:s={},optionsObj:i={}}){const o={bubbles:!0,composed:!0,...i,detail:{...t&&{originalEvent:t},...s}},n=new CustomEvent(e,o);return this.dispatchEvent(n),n}render(){return z`<slot></slot>`}}const Lt=$t`@import '../../design-tokens/core/scss/theming/component';

// #CARD

:host {
  display: block;
}

/**
 * 1) A card is an organized block that typically contains a title, image,
 * text, and/or calls to action. It is made up of an optional header slot, required
 * body slot, and optional footer slot to place other Components and content within.
 */
.cre8-c-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: calc(var(--size-base-unit) * 3);
  gap: calc(var(--size-base-unit) * 2);
  border-color: var(--cre8-color-border-default);
  border-style: var(--cre8-border-style-default);
  border-width: var(--cre8-border-width-default);
  border-radius: var(--cre8-border-radius-default);
  background: var(--cre8-color-bg-default);
}
/**
 * Horizontal card
 * 1) Organized block with flex-direction set to row so that header => footer appears
 * from left to right rather than top to bottom
 */
.cre8-c-card--horizontal{
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
/**
 * Bare card
 * 1) Organized block without a border, background, or padding
 */
.cre8-c-card--bare {
  border: 0;
  padding: 0;
  gap: 0;
  box-shadow: none;
}
/**
 * Horizontal-bare card
 * 1) Organized block with flex-direction set to row so that header => footer appears
 * from left to right rather than top to bottom without a border, background, or padding
 */
.cre8-c-card--horizontal-bare{
  flex-direction: row;
  border: 0;
  padding: 0;
  gap: 0;
  box-shadow: none;
  align-items: center;
  justify-content: center;
}
/**
 * Center aligned card
 * 1) Center content and text within the card
 */
.cre8-c-card--align-center {
  text-align: center; /* 1 */
  align-items: center; /* 1 */
  justify-content: center; /* 1 */
}

/**
 * Slotted image within a card
 * 1) Make the image full width
 */
::slotted(img) {
  width: 100%;
}

/**
 * Card header
 * 1) Remove flex so that body always takes up remaining space
 */
.cre8-c-card__header {
  display: block;
  flex: none; /* 1 */
}

/**
 * Card body
 * 1) Flex applied to always fill the remaining space of the card
 */
.cre8-c-card__body {
  display: block;
  flex: 1 1 auto; /* 1 */

}

/**
 * Card footer
 * 1) Remove flex so that body always takes up remaining space
 */
.cre8-c-card__footer {
  display: block;
  flex: none; /* 1 */

  .cre8-c-card--bare & {
    padding: 0;
  }
  .cre8-c-card--horizontal-bare & {
    padding: 0;
  }
}
`;var Bt=Object.defineProperty,pt=(r,t,e,s)=>{for(var i=void 0,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=n(t,e,i)||i);return i&&Bt(t,e,i),i};const K=class K extends Dt{render(){const t=this.componentClassNames("cre8-c-card",{"cre8-c-card--bare":this.variant==="bare","cre8-c-card--horizontal":this.variant==="horizontal","cre8-c-card--horizontal-bare":this.variant==="horizontal-bare","cre8-c-card--align-center":this.align==="center"});return z`
      <div class="${t}" part="card">
        ${this.slotNotEmpty("header")&&z`<div class="cre8-c-card__header" part="header"><slot name="header"></slot></div>`}
        <div class="cre8-c-card__body" part="body">
          <slot></slot>
        </div>
        ${this.slotNotEmpty("footer")&&z`<div class="cre8-c-card__footer" part="footer"><slot name="footer"></slot></div>`}
      </div>
    `}};K.styles=[Lt];let E=K;pt([ct()],E.prototype,"variant"),pt([ct()],E.prototype,"align"),customElements.get("cre8-card")===void 0&&customElements.define("cre8-card",E),y.Cre8Card=E,y.default=E,Object.defineProperties(y,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
