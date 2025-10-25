(function(y,v){typeof exports=="object"&&typeof module<"u"?v(exports):typeof define=="function"&&define.amd?define(["exports"],v):(y=typeof globalThis<"u"?globalThis:y||self,v(y.Tabs={}))})(this,function(y){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var _t;const v=globalThis,D=v.ShadowRoot&&(v.ShadyCSS===void 0||v.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B=Symbol(),Q=new WeakMap;let X=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==B)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(D&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Q.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Q.set(e,t))}return t}toString(){return this.cssText}};const mt=r=>new X(typeof r=="string"?r:r+"",void 0,B),yt=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new X(e,r,B)},gt=(r,t)=>{if(D)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=v.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Y=D?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return mt(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:At,defineProperty:Et,getOwnPropertyDescriptor:Tt,getOwnPropertyNames:St,getOwnPropertySymbols:wt,getPrototypeOf:Ct}=Object,$=globalThis,tt=$.trustedTypes,xt=tt?tt.emptyScript:"",V=$.reactiveElementPolyfillSupport,x=(r,t)=>r,N={toAttribute(r,t){switch(t){case Boolean:r=r?xt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},W=(r,t)=>!At(r,t),et={attribute:!0,type:String,converter:N,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);let S=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=et){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Et(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=Tt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const h=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??et}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=Ct(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,s=[...St(e),...wt(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Y(i))}else t!==void 0&&e.push(Y(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:N).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const h=s.getPropertyOptions(i),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((n=h.converter)==null?void 0:n.fromAttribute)!==void 0?h.converter:N;this._$Em=i,this[i]=a.fromAttribute(e,h.type)??((o=this._$Ej)==null?void 0:o.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,o=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??W)(o,e)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:h}=o,a=this[n];h!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,o,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[x("elementProperties")]=new Map,S[x("finalized")]=new Map,V==null||V({ReactiveElement:S}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,M=P.trustedTypes,st=M?M.createPolicy("lit-html",{createHTML:r=>r}):void 0,it="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,rt="?"+_,Pt=`<${rt}>`,g=document,I=()=>g.createComment(""),O=r=>r===null||typeof r!="object"&&typeof r!="function",q=Array.isArray,It=r=>q(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",F=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nt=/-->/g,ot=/>/g,A=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),at=/'/g,ht=/"/g,lt=/^(?:script|style|textarea|title)$/i,Ot=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),ct=Ot(1),w=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),dt=new WeakMap,E=g.createTreeWalker(g,129);function ut(r,t){if(!q(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return st!==void 0?st.createHTML(t):t}const Rt=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=R;for(let h=0;h<e;h++){const a=r[h];let c,u,l=-1,b=0;for(;b<a.length&&(o.lastIndex=b,u=o.exec(a),u!==null);)b=o.lastIndex,o===R?u[1]==="!--"?o=nt:u[1]!==void 0?o=ot:u[2]!==void 0?(lt.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=A):u[3]!==void 0&&(o=A):o===A?u[0]===">"?(o=i??R,l=-1):u[1]===void 0?l=-2:(l=o.lastIndex-u[2].length,c=u[1],o=u[3]===void 0?A:u[3]==='"'?ht:at):o===ht||o===at?o=A:o===nt||o===ot?o=R:(o=A,i=void 0);const m=o===A&&r[h+1].startsWith("/>")?" ":"";n+=o===R?a+Pt:l>=0?(s.push(c),a.slice(0,l)+it+a.slice(l)+_+m):a+_+(l===-2?h:m)}return[ut(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class U{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const h=t.length-1,a=this.parts,[c,u]=Rt(t,e);if(this.el=U.createElement(c,s),E.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=E.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(it)){const b=u[o++],m=i.getAttribute(l).split(_),j=/([.?@])?(.*)/.exec(b);a.push({type:1,index:n,name:j[2],strings:m,ctor:j[1]==="."?kt:j[1]==="?"?Ht:j[1]==="@"?Nt:L}),i.removeAttribute(l)}else l.startsWith(_)&&(a.push({type:6,index:n}),i.removeAttribute(l));if(lt.test(i.tagName)){const l=i.textContent.split(_),b=l.length-1;if(b>0){i.textContent=M?M.emptyScript:"";for(let m=0;m<b;m++)i.append(l[m],I()),E.nextNode(),a.push({type:2,index:++n});i.append(l[b],I())}}}else if(i.nodeType===8)if(i.data===rt)a.push({type:2,index:n});else{let l=-1;for(;(l=i.data.indexOf(_,l+1))!==-1;)a.push({type:7,index:n}),l+=_.length-1}n++}}static createElement(t,e){const s=g.createElement("template");return s.innerHTML=t,s}}function C(r,t,e=r,s){var o,h;if(t===w)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=O(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((h=i==null?void 0:i._$AO)==null||h.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=C(r,i._$AS(r,t.values),i,s)),t}class Ut{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??g).importNode(e,!0);E.currentNode=i;let n=E.nextNode(),o=0,h=0,a=s[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new k(n,n.nextSibling,this,t):a.type===1?c=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(c=new Mt(n,this,t)),this._$AV.push(c),a=s[++h]}o!==(a==null?void 0:a.index)&&(n=E.nextNode(),o++)}return E.currentNode=g,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class k{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),O(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):It(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(g.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(ut(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new Ut(i,this),h=o.u(this.options);o.p(e),this.T(h),this._$AH=o}}_$AC(t){let e=dt.get(t.strings);return e===void 0&&dt.set(t.strings,e=new U(t)),e}k(t){q(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new k(this.O(I()),this.O(I()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class L{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=C(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{const h=t;let a,c;for(t=n[0],a=0;a<n.length-1;a++)c=C(this,h[s+a],e,a),c===w&&(c=this._$AH[a]),o||(o=!O(c)||c!==this._$AH[a]),c===d?t=d:t!==d&&(t+=(c??"")+n[a+1]),this._$AH[a]=c}o&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class kt extends L{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class Ht extends L{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class Nt extends L{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=C(this,t,e,0)??d)===w)return;const s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Mt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const K=P.litHtmlPolyfillSupport;K==null||K(U,k),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.0");const Lt=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new k(t.insertBefore(I(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis;class H extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Lt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return w}}H._$litElement$=!0,H.finalized=!0,(_t=T.litElementHydrateSupport)==null||_t.call(T,{LitElement:H});const G=T.litElementPolyfillSupport;G==null||G({LitElement:H}),(T.litElementVersions??(T.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zt={attribute:!0,type:String,converter:N,reflect:!1,hasChanged:W},jt=(r=zt,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(h){const a=t.get.call(this);t.set.call(this,h),this.requestUpdate(o,a,r)},init(h){return h!==void 0&&this.C(o,void 0,r,h),h}}}if(s==="setter"){const{name:o}=e;return function(h){const a=this[o];t.call(this,h),this.requestUpdate(o,a,r)}}throw Error("Unsupported decorator location: "+s)};function z(r){return(t,e)=>typeof e=="object"?jt(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function J(r){return z({...r,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=(r,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(r,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ft(r,t){return(e,s,i)=>{const n=o=>{var h;return((h=o.renderRoot)==null?void 0:h.querySelector(r))??null};return pt(e,s,{get(){return n(this)}})}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function bt(r){return(t,e)=>{const{slot:s,selector:i}=r??{},n="slot"+(s?`[name=${s}]`:":not([name])");return pt(t,e,{get(){var a;const o=(a=this.renderRoot)==null?void 0:a.querySelector(n),h=(o==null?void 0:o.assignedElements(r))??[];return i===void 0?h:h.filter(c=>c.matches(i))}})}}let Dt=(r=21)=>crypto.getRandomValues(new Uint8Array(r)).reduce((t,e)=>(e&=63,e<36?t+=e.toString(36):e<62?t+=(e-26).toString(36).toUpperCase():e>62?t+="-":t+="_",t),"");function Bt(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var vt={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(r){(function(){var t={}.hasOwnProperty;function e(){for(var s=[],i=0;i<arguments.length;i++){var n=arguments[i];if(n){var o=typeof n;if(o==="string"||o==="number")s.push(n);else if(Array.isArray(n)){if(n.length){var h=e.apply(null,n);h&&s.push(h)}}else if(o==="object"){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){s.push(n.toString());continue}for(var a in n)t.call(n,a)&&n[a]&&s.push(a)}}}return s.join(" ")}r.exports?(e.default=e,r.exports=e):window.classNames=e})()})(vt);var Vt=vt.exports;const Wt=Bt(Vt);class qt extends H{componentClassNames(t,e={}){return Wt(t,e)}slotEmpty(t){return!this.querySelector(`[slot="${t}"]`)}slotNotEmpty(t){return this.slotEmpty(t)?null:!this.slotEmpty(t)}dispatch({e:t,eventName:e,detailObj:s={},optionsObj:i={}}){const n={bubbles:!0,composed:!0,...i,detail:{...t&&{originalEvent:t},...s}},o=new CustomEvent(e,n);return this.dispatchEvent(o),o}render(){return ct`<slot></slot>`}}const Ft=yt`@import '../../design-tokens/core/scss/theming/component';
/*------------------------------------*\
 #TABS
\*------------------------------------*/

:host {
  display: block;
}

/**
 * Tabs header
 */
.cre8-c-tabs__header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  overflow: hidden;

  /**
   * Tabs inner where the beginning of the tabs list isn't fully in the viewport
   */
  .cre8-c-tabs:not(.cre8-is-start) & {
    /**
     * Left overflow gradient for the tabs list
     */
    &::before {
      content: '';
      display: block;
      position: absolute;
      pointer-events: none;
      background: linear-gradient(var(--rtlGradientToRight, 90deg), var(--cre8-color-bg-default), rgb(255 255 255 / 0.1%) 30%);
      height: 100%;
      inset-block-start: 0;
      inset-inline-start: 0;
      width: calc(var(--size-base-unit) * 6);
      z-index: 1;
    }
  }

  /**
   * Tabs inner where the end of the tabs list isn't fully in the viewport
   */
  .cre8-c-tabs:not(.cre8-is-end) & {
    /**
     * Right overflow gradient for the tabs list
     */
    &::after {
      content: '';
      display: block !important;
      position: absolute;
      pointer-events: none;
      background: linear-gradient(var(--rtlGradientToRight, 90deg), rgb(255 255 255 / 0.1%) 30%, var(--cre8-color-bg-default));
      height: 100%;
      inset-block-start: 0;
      inset-inline-end: 0;
      width: calc(var(--size-base-unit) * 6);
      z-index: 1;
    }
  }
}

/**
 * Tabs list
 * 1) The div that contains the cre8-tab's
 */
.cre8-c-tabs__list {
  display: flex;
  overflow: auto;
  width: 100%;
  margin: 0;
  position: relative;
  padding: var(--cre8-border-width-focus);

  /**
   * Visually hides the scrollbar
   */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

/**
 * Tabs body
 * 1) The div that contains the tab panel content
 */
.cre8-c-tabs__body {
  padding-block-start: calc(var(--size-base-unit) * 2);

  /**
   * Full Width Variant - border default bar across tabs
   */
   .cre8-c-tabs--full-width & {
    border-top: var(--cre8-border-width-tab-selected) var(--cre8-border-style-default) var(--cre8-color-border-default);
    // To match the border of the tabs to this full width line
    // Shift border up by the tab bottom border width + Width of the padding on the list of tabs
    margin-top: calc(var(--cre8-border-width-tab-selected) * -2);
  }
}
`;var Kt=Object.defineProperty,f=(r,t,e,s)=>{for(var i=void 0,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(t,e,i)||i);return i&&Kt(t,e,i),i};let $t=1;const Z=class Z extends qt{constructor(){super(),this.activeIndex=0,this.isStart=!0,this.isEnd=!1,this.handleScroll=this.handleScroll.bind(this),this.handleResize=this.handleResize.bind(this),this.setIsStart=this.setIsStart.bind(this),this.setIsEnd=this.setIsEnd.bind(this),this.emitEvent=this.emitEvent.bind(this),this.tabId=`cre8-tabpanel-${$t}`,$t+=1}get isRTL(){return document.dir==="rtl"}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.handleResize)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("resize",this.handleResize)}async firstUpdated(){this.setTabAttributes(),await this.updateComplete,this.activeTab=this._Cre8TabItems[this.activeIndex]||this._Cre8TabItems[0],this.setActiveTab(),this.setIsStart(),this.setIsEnd(),this.setTabVariant()}async updated(t){t.forEach(async(e,s)=>{s==="activeIndex"&&this.activeIndex!==e&&(await this.updateComplete,this.activeTab&&this.removePreviousActiveTab(),this.activeTab=this._Cre8TabItems[this.activeIndex],this.setActiveTab())})}handleResize(){this.setIsStart(),this.setIsEnd()}handleScroll(){this.setIsStart(),this.setIsEnd()}setIsStart(){this.isRTL?this._Cre8TabsHeaderList.scrollLeft>0?this.isStart=!0:this.isStart=!1:this._Cre8TabsHeaderList.scrollLeft>0?this.isStart=!1:this.isStart=!0}setIsEnd(){this.isInViewport()===!0?this.isEnd=!0:this.isEnd=!1}isInViewport(){var n;const e=(n=this._Cre8TabItems[this._Cre8TabItems.length-1].shadowRoot)==null?void 0:n.querySelector(".cre8-c-tab");if(!e)return!1;const s=e.getBoundingClientRect(),i=window.innerWidth||document.documentElement.clientWidth;return s.left>=0&&s.right<=i}setTabVariant(){this.size==="sm"&&this._Cre8TabItems.forEach(t=>{t.size="sm"})}setTabAttributes(){this._Cre8TabItems.forEach((t,e)=>{t.index=e;const i=t.ariaLabelledBy||Dt();t.ariaLabelledBy=i;const n=this._Cre8TabPanels[e];n.index=e})}setActiveTab(){this.activeTab.isActive=!0;const t=this._Cre8TabPanels.find(e=>e.index===this.activeTab.index);t&&(t.isActive=!0)}setActiveTabFocus(){var t;(t=this.activeTab.shadowRoot)==null||t.querySelector(".cre8-c-tab").focus()}handleTabSelected(t){const{target:e}=t;if(this._Cre8TabItems.includes(e)){this.activeTab&&this.removePreviousActiveTab(),this.activeTab=e;const s=this._Cre8TabItems.findIndex(i=>i===this.activeTab);this.activeIndex=s,this.setActiveTab(),this.emitEvent()}}handleKeydown(t){const{target:e}=t;if(document.activeElement.matches("cre8-tab"))switch(t.key){case"ArrowRight":t.preventDefault(),this.setSelectedToNextTab(e);break;case"ArrowLeft":t.preventDefault(),this.setSelectedToPreviousTab(e);break;case"Home":t.preventDefault(),this.setSelectedToNextTab(this._Cre8TabItems[this._Cre8TabItems.length-1]);break;case"End":t.preventDefault(),this.setSelectedToPreviousTab(this._Cre8TabItems[0]);break;case"Escape":this.activeTab.blur();break}}setSelectedToPreviousTab(t){const e=t.index;this.removePreviousActiveTab();const s=this._Cre8TabItems.length-1;if(e===0)this.activeIndex=s,this.activeTab=this._Cre8TabItems[s];else{const i=e-1;this.activeIndex=i,this.activeTab=this._Cre8TabItems[i]}this.setActiveTab(),this.setActiveTabFocus(),this.emitEvent()}setSelectedToNextTab(t){const e=t.index;this.removePreviousActiveTab();const s=this._Cre8TabItems.length-1;if(e===s)this.activeIndex=0,this.activeTab=this._Cre8TabItems[0];else{const i=e+1;this.activeIndex=i,this.activeTab=this._Cre8TabItems[i]}this.setActiveTab(),this.setActiveTabFocus(),this.emitEvent()}removePreviousActiveTab(){this.activeTab.isActive=!1;const t=this._Cre8TabPanels.find(e=>e.index===this.activeTab.index);t&&(t.isActive=!1)}emitEvent(){const t=new CustomEvent("tabChange",{detail:{value:this.activeTab,activeTabIndex:this.activeIndex},bubbles:!0,composed:!0});this.dispatchEvent(t)}render(){const t=this.componentClassNames("cre8-c-tabs",{"cre8-is-start":this.isStart===!0,"cre8-is-end":this.isEnd===!0,"cre8-c-tabs--full-width":this.fullWidth});return ct`
        <div class="${t}">
            <div class="cre8-c-tabs__header">
                <div
                    class="cre8-c-tabs__list"
                    role="tablist"
                    tabindex=0
                    @scroll=${this.handleScroll}
                    @keydown=${this.handleKeydown}
                    @click=${this.handleTabSelected}
                >
                    <slot></slot>
                </div>
            </div>
            <div class="cre8-c-tabs__body">
                <slot name="panel"></slot>
            </div>
        </div>
    `}};Z.styles=[Ft];let p=Z;f([z()],p.prototype,"size"),f([z({type:Boolean,reflect:!0})],p.prototype,"fullWidth"),f([z({type:Number})],p.prototype,"activeIndex"),f([J()],p.prototype,"activeTab"),f([J()],p.prototype,"isStart"),f([J()],p.prototype,"isEnd"),f([bt()],p.prototype,"_Cre8TabItems"),f([bt({slot:"panel"})],p.prototype,"_Cre8TabPanels"),f([ft(".cre8-c-tabs__header")],p.prototype,"_Cre8TabsHeader"),f([ft(".cre8-c-tabs__list")],p.prototype,"_Cre8TabsHeaderList"),customElements.get("cre8-tabs")===void 0&&customElements.define("cre8-tabs",p),y.Cre8Tabs=p,y.default=p,Object.defineProperties(y,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
