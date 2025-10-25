(function(y,g){typeof exports=="object"&&typeof module<"u"?g(exports):typeof define=="function"&&define.amd?define(["exports"],g):(y=typeof globalThis<"u"?globalThis:y||self,g(y.Tooltip={}))})(this,function(y){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ft;const g=globalThis,B=g.ShadowRoot&&(g.ShadyCSS===void 0||g.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,q=Symbol(),Z=new WeakMap;let G=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==q)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(B&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Z.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Z.set(e,t))}return t}toString(){return this.cssText}};const vt=o=>new G(typeof o=="string"?o:o+"",void 0,q),$t=(o,...t)=>{const e=o.length===1?o[0]:t.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new G(e,o,q)},gt=(o,t)=>{if(B)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=g.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},Q=B?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return vt(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:bt,defineProperty:_t,getOwnPropertyDescriptor:mt,getOwnPropertyNames:yt,getOwnPropertySymbols:At,getPrototypeOf:Et}=Object,b=globalThis,tt=b.trustedTypes,wt=tt?tt.emptyScript:"",V=b.reactiveElementPolyfillSupport,x=(o,t)=>o,D={toAttribute(o,t){switch(t){case Boolean:o=o?wt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},W=(o,t)=>!bt(o,t),et={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);let C=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=et){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&_t(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=mt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:s,set(n){const l=s==null?void 0:s.call(this);r==null||r.call(this,n),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??et}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=Et(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,i=[...yt(e),...At(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(Q(s))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var r;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const n=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:D).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){var r,n;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:D;this._$Em=s,this[s]=a.fromAttribute(e,l.type)??((n=this._$Ej)==null?void 0:n.get(s))??null,this._$Em=null}}requestUpdate(t,e,i){var s;if(t!==void 0){const r=this.constructor,n=this[t];if(i??(i=r.getPropertyOptions(t)),!((i.hasChanged??W)(n,e)||i.useDefault&&i.reflect&&n===((s=this._$Ej)==null?void 0:s.get(t))&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,n]of this._$Ep)this[r]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,n]of s){const{wrapped:l}=n,a=this[r];l!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,n,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[x("elementProperties")]=new Map,C[x("finalized")]=new Map,V==null||V({ReactiveElement:C}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=globalThis,z=T.trustedTypes,it=z?z.createPolicy("lit-html",{createHTML:o=>o}):void 0,st="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,ot="?"+_,St=`<${ot}>`,A=document,O=()=>A.createComment(""),U=o=>o===null||typeof o!="object"&&typeof o!="function",X=Array.isArray,Ct=o=>X(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",F=`[ 	
\f\r]`,R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rt=/-->/g,nt=/>/g,E=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),at=/'/g,lt=/"/g,ct=/^(?:script|style|textarea|title)$/i,kt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),I=kt(1),k=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ht=new WeakMap,w=A.createTreeWalker(A,129);function dt(o,t){if(!X(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return it!==void 0?it.createHTML(t):t}const Pt=(o,t)=>{const e=o.length-1,i=[];let s,r=t===2?"<svg>":t===3?"<math>":"",n=R;for(let l=0;l<e;l++){const a=o[l];let d,u,c=-1,$=0;for(;$<a.length&&(n.lastIndex=$,u=n.exec(a),u!==null);)$=n.lastIndex,n===R?u[1]==="!--"?n=rt:u[1]!==void 0?n=nt:u[2]!==void 0?(ct.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=E):u[3]!==void 0&&(n=E):n===E?u[0]===">"?(n=s??R,c=-1):u[1]===void 0?c=-2:(c=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?E:u[3]==='"'?lt:at):n===lt||n===at?n=E:n===rt||n===nt?n=R:(n=E,s=void 0);const m=n===E&&o[l+1].startsWith("/>")?" ":"";r+=n===R?a+St:c>=0?(i.push(d),a.slice(0,c)+st+a.slice(c)+_+m):a+_+(c===-2?l:m)}return[dt(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class M{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const l=t.length-1,a=this.parts,[d,u]=Pt(t,e);if(this.el=M.createElement(d,i),w.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=w.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(st)){const $=u[n++],m=s.getAttribute(c).split(_),L=/([.?@])?(.*)/.exec($);a.push({type:1,index:r,name:L[2],strings:m,ctor:L[1]==="."?Tt:L[1]==="?"?Ot:L[1]==="@"?Ut:j}),s.removeAttribute(c)}else c.startsWith(_)&&(a.push({type:6,index:r}),s.removeAttribute(c));if(ct.test(s.tagName)){const c=s.textContent.split(_),$=c.length-1;if($>0){s.textContent=z?z.emptyScript:"";for(let m=0;m<$;m++)s.append(c[m],O()),w.nextNode(),a.push({type:2,index:++r});s.append(c[$],O())}}}else if(s.nodeType===8)if(s.data===ot)a.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf(_,c+1))!==-1;)a.push({type:7,index:r}),c+=_.length-1}r++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function P(o,t,e=o,i){var n,l;if(t===k)return t;let s=i!==void 0?(n=e._$Co)==null?void 0:n[i]:e._$Cl;const r=U(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=P(o,s._$AS(o,t.values),s,i)),t}class xt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??A).importNode(e,!0);w.currentNode=s;let r=w.nextNode(),n=0,l=0,a=i[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new N(r,r.nextSibling,this,t):a.type===1?d=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(d=new Rt(r,this,t)),this._$AV.push(d),a=i[++l]}n!==(a==null?void 0:a.index)&&(r=w.nextNode(),n++)}return w.currentNode=A,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class N{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=P(this,t,e),U(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ct(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==h&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=M.createElement(dt(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(e);else{const n=new xt(s,this),l=n.u(this.options);n.p(e),this.T(l),this._$AH=n}}_$AC(t){let e=ht.get(t.strings);return e===void 0&&ht.set(t.strings,e=new M(t)),e}k(t){X(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new N(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class j{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=h}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(r===void 0)t=P(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==k,n&&(this._$AH=t);else{const l=t;let a,d;for(t=r[0],a=0;a<r.length-1;a++)d=P(this,l[i+a],e,a),d===k&&(d=this._$AH[a]),n||(n=!U(d)||d!==this._$AH[a]),d===h?t=h:t!==h&&(t+=(d??"")+r[a+1]),this._$AH[a]=d}n&&!s&&this.j(t)}j(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Tt extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===h?void 0:t}}class Ot extends j{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}}class Ut extends j{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=P(this,t,e,0)??h)===k)return;const i=this._$AH,s=t===h&&i!==h||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==h&&(i===h||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t)}}const K=T.litHtmlPolyfillSupport;K==null||K(M,N),(T.litHtmlVersions??(T.litHtmlVersions=[])).push("3.3.0");const Mt=(o,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const r=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new N(t.insertBefore(O(),r),r,void 0,e??{})}return s._$AI(o),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=globalThis;class H extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return k}}H._$litElement$=!0,H.finalized=!0,(ft=S.litElementHydrateSupport)==null||ft.call(S,{LitElement:H});const Y=S.litElementPolyfillSupport;Y==null||Y({LitElement:H}),(S.litElementVersions??(S.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Nt={attribute:!0,type:String,converter:D,reflect:!1,hasChanged:W},Ht=(o=Nt,t,e)=>{const{kind:i,metadata:s}=e;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(e.name,o),i==="accessor"){const{name:n}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,o)},init(l){return l!==void 0&&this.C(n,void 0,o,l),l}}}if(i==="setter"){const{name:n}=e;return function(l){const a=this[n];t.call(this,l),this.requestUpdate(n,a,o)}}throw Error("Unsupported decorator location: "+i)};function v(o){return(t,e)=>typeof e=="object"?Ht(o,t,e):((i,s,r)=>{const n=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),n?Object.getOwnPropertyDescriptor(s,r):void 0})(o,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dt=(o,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(o,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(o,t){return(e,i,s)=>{const r=n=>{var l;return((l=n.renderRoot)==null?void 0:l.querySelector(o))??null};return Dt(e,i,{get(){return r(this)}})}}let zt=(o=21)=>crypto.getRandomValues(new Uint8Array(o)).reduce((t,e)=>(e&=63,e<36?t+=e.toString(36):e<62?t+=(e-26).toString(36).toUpperCase():e>62?t+="-":t+="_",t),"");/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const It=o=>o??h;function jt(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var ut={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(o){(function(){var t={}.hasOwnProperty;function e(){for(var i=[],s=0;s<arguments.length;s++){var r=arguments[s];if(r){var n=typeof r;if(n==="string"||n==="number")i.push(r);else if(Array.isArray(r)){if(r.length){var l=e.apply(null,r);l&&i.push(l)}}else if(n==="object"){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){i.push(r.toString());continue}for(var a in r)t.call(r,a)&&r[a]&&i.push(a)}}}return i.join(" ")}o.exports?(e.default=e,o.exports=e):window.classNames=e})()})(ut);var Lt=ut.exports;const Bt=jt(Lt);class qt extends H{componentClassNames(t,e={}){return Bt(t,e)}slotEmpty(t){return!this.querySelector(`[slot="${t}"]`)}slotNotEmpty(t){return this.slotEmpty(t)?null:!this.slotEmpty(t)}dispatch({e:t,eventName:e,detailObj:i={},optionsObj:s={}}){const r={bubbles:!0,composed:!0,...s,detail:{...t&&{originalEvent:t},...i}},n=new CustomEvent(e,r);return this.dispatchEvent(n),n}render(){return I`<slot></slot>`}}const Vt=$t`@import '../../design-tokens/core/scss/theming/component';
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
`;var Wt=Object.defineProperty,f=(o,t,e,i)=>{for(var s=void 0,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=n(t,e,s)||s);return s&&Wt(t,e,s),s};const J=class J extends qt{constructor(){super(...arguments),this.iconRotateDegree=0,this.removeActive=()=>{this.isActive&&this.toggleActive()}}get isRTL(){return document.dir==="rtl"}updated(){const t=this.shadowRoot.querySelectorAll("slot")[1].assignedNodes().reduce((e,i)=>`${e}${i.textContent.replace(/\n/g,"").trim()}`,"");document.getElementById(this._uniqueId)&&(document.getElementById(this._uniqueId).textContent=t)}firstUpdated(){if(this.ariaDescribes){this._uniqueId=this._uniqueId||zt();const t=new RegExp(`\\b${this._uniqueId}\\b`),e=document.createElement("div");e.setAttribute("role","tooltip"),e.setAttribute("style","position:fixed; left: -1000px; top: -1000px;"),e.id=this._uniqueId;const i=document.getElementById(this.ariaDescribes);i.parentNode.insertBefore(e,i);const s=i==null?void 0:i.getAttribute("aria-describedBy");i==null||i.setAttribute("aria-describedby",`${s?`${s.replace(t,"")} `:""}${this._uniqueId}`.trim())}}connectedCallback(){super.connectedCallback(),this.addEventListener("mouseover",this.toggleActive),this.addEventListener("mouseout",this.removeActive)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mouseover",this.toggleActive),this.removeEventListener("mouseout",this.removeActive)}dynamicPosition(){if(this.isDynamic&&this._Cre8TooltipPanel){const t=document.querySelector("body").getBoundingClientRect(),e=this._Cre8TooltipPanel.getBoundingClientRect(),i=this._Cre8Tooltip.clientHeight+e.height+e.top;e.left<0&&(this.position=this.isRTL?"left":"right"),e.right>=t.width&&(this.position=this.isRTL?"right":"left"),e.top<0&&e.left>0&&e.right<t.width&&(this.position=null),i>=window.innerHeight&&e.bottom>=window.innerHeight&&e.left>=0&&e.right<=t.width&&(this.position="top")}}_handleKeydown(t){this.isActive&&(t.code==="Escape"||t.code==="Tab")&&this.toggleActive(),(t.code==="Enter"||t.code==="Space")&&this.toggleActive()}toggleActive(){this.isActive=!this.isActive,this.isActive?(setTimeout(()=>{this.dynamicPosition()},1),this.dispatchEvent(new CustomEvent("open",{detail:{isActive:this.isActive},bubbles:!0,composed:!0}))):this.dispatchEvent(new CustomEvent("close",{detail:{isActive:this.isActive},bubbles:!0,composed:!0})),setTimeout(()=>{this.isActive&&this.isDynamic?this.isActiveDynamic=!0:this.isActiveDynamic=!1},2)}render(){const t=this.componentClassNames("cre8-c-tooltip",{"cre8-c-tooltip--top":this.position==="top","cre8-c-tooltip--left":this.position==="left","cre8-c-tooltip--right":this.position==="right","cre8-c-tooltip--knockout":this.knockout,"cre8-is-active":this.isActive,"cre8-is-dynamic":this.isDynamic,"cre8-is-dynamic-active":this.isActiveDynamic});return I`
        <div class="${t}">
            <div 
                class="cre8-c-tooltip__trigger"
                tabindex="0"
                @focus=${this.toggleActive}
                @keydown=${this._handleKeydown}
            >
                ${this.svg?I`
            <slot name="trigger">
                <cre8-icon svg='${this.svg}' rotate="${Number(this.iconRotateDegree)}" 
                flip="${this.iconFlipDirection}" aria-hidden="true"></cre8-icon>
            </slot>`:I`<slot name="trigger"></slot>`}
            </div>
            <dialog
                id=${It(this._uniqueId)}
                aria-labelledby=${this.ariaDescribes}
                class="cre8-c-tooltip__panel"
                role="tooltip">
                <slot></slot>
            </dialog>
        </div>
      `}};J.styles=[Vt];let p=J;f([v()],p.prototype,"position"),f([v({type:Boolean,reflect:!0})],p.prototype,"knockout"),f([v({type:Boolean,reflect:!0})],p.prototype,"isDynamic"),f([v({type:Boolean})],p.prototype,"isActiveDynamic"),f([v({type:Boolean,reflect:!0})],p.prototype,"isActive"),f([v({type:String})],p.prototype,"ariaDescribes"),f([v({type:String})],p.prototype,"_uniqueId"),f([v()],p.prototype,"svg"),f([v({type:Number})],p.prototype,"iconRotateDegree"),f([v()],p.prototype,"iconFlipDirection"),f([pt(".cre8-c-tooltip")],p.prototype,"_Cre8Tooltip"),f([pt(".cre8-c-tooltip__panel")],p.prototype,"_Cre8TooltipPanel"),customElements.get("cre8-tooltip")===void 0&&customElements.define("cre8-tooltip",p),y.Cre8Tooltip=p,y.default=p,Object.defineProperties(y,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
