(function(g,_){typeof exports=="object"&&typeof module<"u"?_(exports):typeof define=="function"&&define.amd?define(["exports"],_):(g=typeof globalThis<"u"?globalThis:g||self,_(g.PrimaryNavItem={}))})(this,function(g){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Vt;const _=globalThis,it=_.ShadowRoot&&(_.ShadyCSS===void 0||_.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol(),vt=new WeakMap;let _t=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==st)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(it&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=vt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&vt.set(e,t))}return t}toString(){return this.cssText}};const Zt=n=>new _t(typeof n=="string"?n:n+"",void 0,st),Kt=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new _t(e,n,st)},Ft=(n,t)=>{if(it)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),s=_.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},ft=it?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Zt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Jt,defineProperty:Yt,getOwnPropertyDescriptor:Gt,getOwnPropertyNames:Qt,getOwnPropertySymbols:Xt,getPrototypeOf:te}=Object,f=globalThis,At=f.trustedTypes,ee=At?At.emptyScript:"",nt=f.reactiveElementPolyfillSupport,R=(n,t)=>n,F={toAttribute(n,t){switch(t){case Boolean:n=n?ee:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},rt=(n,t)=>!Jt(n,t),yt={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:rt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);let N=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=yt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Yt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=Gt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){const l=s==null?void 0:s.call(this);o==null||o.call(this,r),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??yt}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;const t=te(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){const e=this.properties,i=[...Qt(e),...Xt(e)];for(const s of i)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(ft(s))}else t!==void 0&&e.push(ft(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ft(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var o;const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){const r=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:F).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){var o,r;const i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),a=typeof l.converter=="function"?{fromAttribute:l.converter}:((o=l.converter)==null?void 0:o.fromAttribute)!==void 0?l.converter:F;this._$Em=s,this[s]=a.fromAttribute(e,l.type)??((r=this._$Ej)==null?void 0:r.get(s))??null,this._$Em=null}}requestUpdate(t,e,i){var s;if(t!==void 0){const o=this.constructor,r=this[t];if(i??(i=o.getPropertyOptions(t)),!((i.hasChanged??rt)(r,e)||i.useDefault&&i.reflect&&r===((s=this._$Ej)==null?void 0:s.get(t))&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},r){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,r]of s){const{wrapped:l}=r,a=this[o];l!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,r,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[R("elementProperties")]=new Map,N[R("finalized")]=new Map,nt==null||nt({ReactiveElement:N}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis,J=z.trustedTypes,gt=J?J.createPolicy("lit-html",{createHTML:n=>n}):void 0,bt="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,wt="?"+A,ie=`<${wt}>`,b=document,I=()=>b.createComment(""),j=n=>n===null||typeof n!="object"&&typeof n!="function",ot=Array.isArray,se=n=>ot(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",at=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Et=/-->/g,St=/>/g,w=RegExp(`>|${at}(?:([^\\s"'>=/]+)(${at}*=${at}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ct=/'/g,xt=/"/g,Ht=/^(?:script|style|textarea|title)$/i,ne=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),E=ne(1),k=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Pt=new WeakMap,S=b.createTreeWalker(b,129);function Nt(n,t){if(!ot(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return gt!==void 0?gt.createHTML(t):t}const re=(n,t)=>{const e=n.length-1,i=[];let s,o=t===2?"<svg>":t===3?"<math>":"",r=L;for(let l=0;l<e;l++){const a=n[l];let h,d,c=-1,u=0;for(;u<a.length&&(r.lastIndex=u,d=r.exec(a),d!==null);)u=r.lastIndex,r===L?d[1]==="!--"?r=Et:d[1]!==void 0?r=St:d[2]!==void 0?(Ht.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=w):d[3]!==void 0&&(r=w):r===w?d[0]===">"?(r=s??L,c=-1):d[1]===void 0?c=-2:(c=r.lastIndex-d[2].length,h=d[1],r=d[3]===void 0?w:d[3]==='"'?xt:Ct):r===xt||r===Ct?r=w:r===Et||r===St?r=L:(r=w,s=void 0);const $=r===w&&n[l+1].startsWith("/>")?" ":"";o+=r===L?a+ie:c>=0?(i.push(h),a.slice(0,c)+bt+a.slice(c)+A+$):a+A+(c===-2?l:$)}return[Nt(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};let lt=class qt{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const l=t.length-1,a=this.parts,[h,d]=re(t,e);if(this.el=qt.createElement(h,i),S.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=S.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(bt)){const u=d[r++],$=s.getAttribute(c).split(A),U=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:U[2],strings:$,ctor:U[1]==="."?ae:U[1]==="?"?le:U[1]==="@"?he:Y}),s.removeAttribute(c)}else c.startsWith(A)&&(a.push({type:6,index:o}),s.removeAttribute(c));if(Ht.test(s.tagName)){const c=s.textContent.split(A),u=c.length-1;if(u>0){s.textContent=J?J.emptyScript:"";for(let $=0;$<u;$++)s.append(c[$],I()),S.nextNode(),a.push({type:2,index:++o});s.append(c[u],I())}}}else if(s.nodeType===8)if(s.data===wt)a.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf(A,c+1))!==-1;)a.push({type:7,index:o}),c+=A.length-1}o++}}static createElement(t,e){const i=b.createElement("template");return i.innerHTML=t,i}};function M(n,t,e=n,i){var r,l;if(t===k)return t;let s=i!==void 0?(r=e._$Co)==null?void 0:r[i]:e._$Cl;const o=j(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),o===void 0?s=void 0:(s=new o(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=s:e._$Cl=s),s!==void 0&&(t=M(n,s._$AS(n,t.values),s,i)),t}let oe=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=((t==null?void 0:t.creationScope)??b).importNode(e,!0);S.currentNode=s;let o=S.nextNode(),r=0,l=0,a=i[0];for(;a!==void 0;){if(r===a.index){let h;a.type===2?h=new ht(o,o.nextSibling,this,t):a.type===1?h=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(h=new ce(o,this,t)),this._$AV.push(h),a=i[++l]}r!==(a==null?void 0:a.index)&&(o=S.nextNode(),r++)}return S.currentNode=b,s}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},ht=class Wt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),j(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):se(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(b.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=lt.createElement(Nt(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(e);else{const r=new oe(s,this),l=r.u(this.options);r.p(e),this.T(l),this._$AH=r}}_$AC(t){let e=Pt.get(t.strings);return e===void 0&&Pt.set(t.strings,e=new lt(t)),e}k(t){ot(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Wt(this.O(I()),this.O(I()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}},Y=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=M(this,t,e,0),r=!j(t)||t!==this._$AH&&t!==k,r&&(this._$AH=t);else{const l=t;let a,h;for(t=o[0],a=0;a<o.length-1;a++)h=M(this,l[i+a],e,a),h===k&&(h=this._$AH[a]),r||(r=!j(h)||h!==this._$AH[a]),h===m?t=m:t!==m&&(t+=(h??"")+o[a+1]),this._$AH[a]=h}r&&!s&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ae=class extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},le=class extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},he=class extends Y{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=M(this,t,e,0)??m)===k)return;const i=this._$AH,s=t===m&&i!==m||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==m&&(i===m||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}},ce=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}};const ct=z.litHtmlPolyfillSupport;ct==null||ct(lt,ht),(z.litHtmlVersions??(z.litHtmlVersions=[])).push("3.3.0");const de=(n,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let s=i._$litPart$;if(s===void 0){const o=(e==null?void 0:e.renderBefore)??null;i._$litPart$=s=new ht(t.insertBefore(I(),o),o,void 0,e??{})}return s._$AI(n),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis;let B=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=de(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return k}};B._$litElement$=!0,B.finalized=!0,(Vt=C.litElementHydrateSupport)==null||Vt.call(C,{LitElement:B});const dt=C.litElementPolyfillSupport;dt==null||dt({LitElement:B}),(C.litElementVersions??(C.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ut;const G=window,O=G.trustedTypes,kt=O?O.createPolicy("lit-html",{createHTML:n=>n}):void 0,pt="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,Mt="?"+y,ue=`<${Mt}>`,x=document,Q=()=>x.createComment(""),D=n=>n===null||typeof n!="object"&&typeof n!="function",Ot=Array.isArray,pe=n=>Ot(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",$t=`[ 	
\f\r]`,V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Tt=/-->/g,Ut=/>/g,H=RegExp(`>|${$t}(?:([^\\s"'>=/]+)(${$t}*=${$t}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Rt=/'/g,zt=/"/g,It=/^(?:script|style|textarea|title)$/i,q=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),jt=new WeakMap,P=x.createTreeWalker(x,129,null,!1);function Lt(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return kt!==void 0?kt.createHTML(t):t}const $e=(n,t)=>{const e=n.length-1,i=[];let s,o=t===2?"<svg>":"",r=V;for(let l=0;l<e;l++){const a=n[l];let h,d,c=-1,u=0;for(;u<a.length&&(r.lastIndex=u,d=r.exec(a),d!==null);)u=r.lastIndex,r===V?d[1]==="!--"?r=Tt:d[1]!==void 0?r=Ut:d[2]!==void 0?(It.test(d[2])&&(s=RegExp("</"+d[2],"g")),r=H):d[3]!==void 0&&(r=H):r===H?d[0]===">"?(r=s??V,c=-1):d[1]===void 0?c=-2:(c=r.lastIndex-d[2].length,h=d[1],r=d[3]===void 0?H:d[3]==='"'?zt:Rt):r===zt||r===Rt?r=H:r===Tt||r===Ut?r=V:(r=H,s=void 0);const $=r===H&&n[l+1].startsWith("/>")?" ":"";o+=r===V?a+ue:c>=0?(i.push(h),a.slice(0,c)+pt+a.slice(c)+y+$):a+y+(c===-2?(i.push(void 0),l):$)}return[Lt(n,o+(n[e]||"<?>")+(t===2?"</svg>":"")),i]};class W{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const l=t.length-1,a=this.parts,[h,d]=$e(t,e);if(this.el=W.createElement(h,i),P.currentNode=this.el.content,e===2){const c=this.el.content,u=c.firstChild;u.remove(),c.append(...u.childNodes)}for(;(s=P.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes()){const c=[];for(const u of s.getAttributeNames())if(u.endsWith(pt)||u.startsWith(y)){const $=d[r++];if(c.push(u),$!==void 0){const U=s.getAttribute($.toLowerCase()+pt).split(y),et=/([.?@])?(.*)/.exec($);a.push({type:1,index:o,name:et[2],strings:U,ctor:et[1]==="."?ve:et[1]==="?"?fe:et[1]==="@"?Ae:tt})}else a.push({type:6,index:o})}for(const u of c)s.removeAttribute(u)}if(It.test(s.tagName)){const c=s.textContent.split(y),u=c.length-1;if(u>0){s.textContent=O?O.emptyScript:"";for(let $=0;$<u;$++)s.append(c[$],Q()),P.nextNode(),a.push({type:2,index:++o});s.append(c[u],Q())}}}else if(s.nodeType===8)if(s.data===Mt)a.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf(y,c+1))!==-1;)a.push({type:7,index:o}),c+=y.length-1}o++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function T(n,t,e=n,i){var s,o,r,l;if(t===q)return t;let a=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const h=D(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==h&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),h===void 0?a=void 0:(a=new h(n),a._$AT(n,e,i)),i!==void 0?((r=(l=e)._$Co)!==null&&r!==void 0?r:l._$Co=[])[i]=a:e._$Cl=a),a!==void 0&&(t=T(n,a._$AS(n,t.values),a,i)),t}class me{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:x).importNode(i,!0);P.currentNode=o;let r=P.nextNode(),l=0,a=0,h=s[0];for(;h!==void 0;){if(l===h.index){let d;h.type===2?d=new X(r,r.nextSibling,this,t):h.type===1?d=new h.ctor(r,h.name,h.strings,this,t):h.type===6&&(d=new ye(r,this,t)),this._$AV.push(d),h=s[++a]}l!==(h==null?void 0:h.index)&&(r=P.nextNode(),l++)}return P.currentNode=x,o}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{constructor(t,e,i,s){var o;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),D(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==q&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):pe(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==p&&D(this._$AH)?this._$AA.nextSibling.data=t:this.$(x.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=W.createElement(Lt(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(i);else{const r=new me(o,this),l=r.u(this.options);r.v(i),this.$(l),this._$AH=r}}_$AC(t){let e=jt.get(t.strings);return e===void 0&&jt.set(t.strings,e=new W(t)),e}T(t){Ot(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new X(this.k(Q()),this.k(Q()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class tt{constructor(t,e,i,s,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=T(this,t,e,0),r=!D(t)||t!==this._$AH&&t!==q,r&&(this._$AH=t);else{const l=t;let a,h;for(t=o[0],a=0;a<o.length-1;a++)h=T(this,l[i+a],e,a),h===q&&(h=this._$AH[a]),r||(r=!D(h)||h!==this._$AH[a]),h===p?t=p:t!==p&&(t+=(h??"")+o[a+1]),this._$AH[a]=h}r&&!s&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ve extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}const _e=O?O.emptyScript:"";class fe extends tt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==p?this.element.setAttribute(this.name,_e):this.element.removeAttribute(this.name)}}class Ae extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=T(this,t,e,0))!==null&&i!==void 0?i:p)===q)return;const s=this._$AH,o=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==p&&(s===p||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class ye{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}}const Bt=G.litHtmlPolyfillSupport;Bt==null||Bt(W,X),((ut=G.litHtmlVersions)!==null&&ut!==void 0?ut:G.litHtmlVersions=[]).push("2.8.0");/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ge=n=>n??p;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const be={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:rt},we=(n=be,t,e)=>{const{kind:i,metadata:s}=e;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),o.set(e.name,n),i==="accessor"){const{name:r}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(r,a,n)},init(l){return l!==void 0&&this.C(r,void 0,n,l),l}}}if(i==="setter"){const{name:r}=e;return function(l){const a=this[r];t.call(this,l),this.requestUpdate(r,a,n)}}throw Error("Unsupported decorator location: "+i)};function Z(n){return(t,e)=>typeof e=="object"?we(n,t,e):((i,s,o)=>{const r=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),r?Object.getOwnPropertyDescriptor(s,o):void 0})(n,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ee(n){return Z({...n,state:!0,attribute:!1})}function Se(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Dt={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(n){(function(){var t={}.hasOwnProperty;function e(){for(var i=[],s=0;s<arguments.length;s++){var o=arguments[s];if(o){var r=typeof o;if(r==="string"||r==="number")i.push(o);else if(Array.isArray(o)){if(o.length){var l=e.apply(null,o);l&&i.push(l)}}else if(r==="object"){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){i.push(o.toString());continue}for(var a in o)t.call(o,a)&&o[a]&&i.push(a)}}}return i.join(" ")}n.exports?(e.default=e,n.exports=e):window.classNames=e})()})(Dt);var Ce=Dt.exports;const xe=Se(Ce);class He extends B{componentClassNames(t,e={}){return xe(t,e)}slotEmpty(t){return!this.querySelector(`[slot="${t}"]`)}slotNotEmpty(t){return this.slotEmpty(t)?null:!this.slotEmpty(t)}dispatch({e:t,eventName:e,detailObj:i={},optionsObj:s={}}){const o={bubbles:!0,composed:!0,...s,detail:{...t&&{originalEvent:t},...i}},r=new CustomEvent(e,o);return this.dispatchEvent(r),r}render(){return E`<slot></slot>`}}const Pe=Kt`@import '../../design-tokens/core/scss/theming/component';

// #PRIMARY NAV ITEM

/**
 * Actual primary nav list item
 */
.cre8-c-primary-nav__item {
  border-bottom-width: var(--cre8-border-width-default);
  border-bottom-style: var(--cre8-border-style-default);
  border-bottom-color: var(--cre8-color-border-subtle);

  @media all and (min-width:$cre8-breakpoint-lg) {
    border-bottom: none;
  }
}

/**
 * Content within the primary nav item
 */
.cre8-c-primary-nav__item-content {
  display: flex;
  align-items: baseline;
}

/**
 * Primary navigation link
 * 1) Used to remove any sort of default button styles when a button tag is rendered
 */
.cre8-c-primary-nav__link {
  @include cre8-typography-label-default;
  display: flex;
  align-items: center;
  appearance: none; /* 1 */
  background: transparent; /* 1 */
  border: none;
  //border: 1px solid var(--cre8-color-header-menu-border-default); /* 1 */
  white-space: nowrap;
  width: 100%;
  margin: 0;
  padding: calc(var(--size-base-unit) * 2) calc(var(--size-base-unit) * 4);
  color: var(--cre8-primary-nav-link-color, var(--cre8-color-header-menu-content-default));
  text-decoration: none;
  transition: all var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    //border-color: var(--cre8-color-header-menu-border-hover);
    background: var(--cre8-color-header-menu-bg-hover);
    color: var(--cre8-color-header-menu-content-hover);
  }

  &:active {
    border-color: var(--cre8-color-header-menu-border-pressed);
    background: var(--cre8-color-header-menu-bg-pressed);
    color: var(--cre8-color-header-menu-content-pressed);
  }

  /**
  * Primary navigation link within active primary nav item
  */
  .cre8-c-primary-nav__item.cre8-is-active & {
    background: var(--cre8-color-bg-brand);
    color: var(--cre8-color-header-menu-content-hover);
  }

  /**
  * Medium screen primary navigation
  */
  @media all and (min-width:$cre8-breakpoint-lg) {
    padding: calc(var(--size-base-unit) * 2) calc(var(--size-base-unit) * 1);
  }

  @media all and (min-width:$cre8-breakpoint-lg) {
    padding: calc(var(--size-base-unit) * 2);
    border-bottom: none;
  }
}

/**
 * Icon within primary navigation item
 */
cre8-icon-legacy {
  --cre8-icon-height: #{calc(var(--size-base-unit) * 1.5)}; /* 1 */
  --cre8-icon-width: #{calc(var(--size-base-unit) * 1.5)}; /* 1 */
  margin-left: auto;
  transition: transform var(--cre8-anim-fade-quick) var(--cre8-anim-ease);

  /**
  * Icon within active primary nav item
  * 1) Rotate the icon to show that the dropdown is open
  */
  .cre8-c-primary-nav__item.cre8-is-active & {
    transform: rotate(-180deg); /* 1 */
  }

  @media all and (min-width:$cre8-breakpoint-lg) {
    margin-left: calc(var(--size-base-unit) * 1);
  }
}

/**
 * Primary nav item panel
 * 1) Panel for the dropdown content
 * 1) Hide when not active
 */
.cre8-c-primary-nav__item-panel {
  //display: none;
  visibility: hidden; /* 1 */
  width: 100%;
  height: 0; /* 1 */
  overflow: hidden; /* 1 */
  background: transparent;
  opacity: 0; /* 1 */
  transition: all 0s var(--cre8-anim-ease);
  z-index: -1;

  @media all and (min-width:$cre8-breakpoint-lg) {
    position: absolute;
    top: 100%;
    left: 0;
    height: auto;
    box-shadow: var(--cre8-theme-box-shadow-md);
  }

  /**
  * Primary nav item panel within active item
  * 1) Show the primary nav item dropdown
  */
  .cre8-c-primary-nav__item.cre8-is-active & {
    display: block;
    visibility: visible; /* 1 */
    height: auto; /* 1 */
    padding-top: calc(var(--size-base-unit) * 4);
    padding-bottom: calc(var(--size-base-unit) * 4);
    background: var(--cre8-color-bg-default);
    opacity: 1; /* 1 */
    z-index: 1;
    transition: opacity var(--cre8-anim-fade-quick) var(--cre8-anim-ease);
  }
}

/**
* Primary nav item panel inner container
* 1) Container within primary nav item panel that caps the content width and aligns
*/
.cre8-c-primary-nav__item-panel-inner {
  /**
  * Primary nav item inner container within megamenu item
  * 1) Cap the content width and center
  */
  .cre8-c-primary-nav__item--megamenu & {
    max-width: 70rem; /* 1 */
    padding-right: calc(var(--size-base-unit) * 4);
    padding-left: calc(var(--size-base-unit) * 4);
    margin: 0 auto; /* 1 */
  }
}

.cre8-c-primary-nav__item-before {
  margin-right: calc(var(--size-base-unit) * 1);
}

.cre8-c-primary-nav__item-after {
  margin-left: calc(var(--size-base-unit) * 1);
}
`;var Ne=Object.defineProperty,K=(n,t,e,i)=>{for(var s=void 0,o=n.length-1,r;o>=0;o--)(r=n[o])&&(s=r(t,e,s)||s);return s&&Ne(t,e,s),s};const mt=class mt extends He{constructor(){super(),this.text="Nav item",this.href="#",this.iconName="caret-down",this._handleOnClickOutside=this._handleOnClickOutside.bind(this),this._clickHandler=this._clickHandler.bind(this)}connectedCallback(){this.setAttribute("role","listitem"),super.connectedCallback(),document.addEventListener("mousedown",this._handleOnClickOutside,!1)}disconnectedCallback(){document.removeEventListener("mousedown",this._handleOnClickOutside,!1),super.disconnectedCallback()}_handleOnClickOutside(t){var i;if(!this.isActive)return;if(!((i=this.shadowRoot)!=null&&i.host))throw Error("Could not determine navigation context during click handler");const e=t.composedPath().includes(this.shadowRoot.host);this.isActive&&!e&&(this.isActive=!1)}_clickHandler(t){t.preventDefault(),this.parentNode&&this.parentNode.querySelectorAll("cre8-primary-nav-item").forEach(i=>{i!==this&&(i.isActive=!1)}),this.isActive=!this.isActive}_closePanel(){this.isActive=!1}_handleOnKeyDown(t){var e;if(t.key==="Escape"&&this.isActive===!0){this._closePanel();const i=(e=this.shadowRoot)==null?void 0:e.querySelector(".cre8-c-primary-nav__link");i&&setTimeout(()=>{i.focus()},1)}}render(){const t=this.componentClassNames("cre8-c-primary-nav__item",{"cre8-is-active":this.isActive===!0,"cre8-c-primary-nav__item--megamenu":this.megaMenu===!0});return this.megaMenu?E`
            <div class="${t}" @keydown=${this._handleOnKeyDown}>
                <div class="cre8-c-primary-nav__item-content">
                    <button
                        class="cre8-c-primary-nav__link"
                        @click=${this._clickHandler}
                        aria-expanded=${this.isActive===!0}
                    >
                        ${this.slotNotEmpty("itemBefore")&&E`
                            <div class="cre8-c-primary-nav__item-before">
                                <slot name="itemBefore"></slot>
                            </div>
                        `}
                        ${this.text}
                        ${this.slotNotEmpty("itemAfter")&&E`
                            <div class="cre8-c-primary-nav__item-after">
                                <slot name="itemAfter"></slot>
                            </div>
                        `}
                        <cre8-icon-legacy aria-hidden="true" name="${ge(this.iconName)}"></cre8-icon-legacy>
                    </button>
                </div>
                <div class="cre8-c-primary-nav__item-panel">
                    <div class="cre8-c-primary-nav__item-panel-inner">
                        <slot></slot>
                    </div>
                </div>
            </div>
        `:E`
            <div class="${t}">
                <div class="cre8-c-primary-nav__item-content">
                    <a class="cre8-c-primary-nav__link" href="${this.href}">
                        ${this.slotNotEmpty("itemBefore")&&E`
                            <div class="cre8-c-primary-nav__item-before">
                                <slot name="itemBefore"></slot>
                            </div>
                        `}
                        ${this.text}
                        ${this.slotNotEmpty("itemAfter")&&E`
                            <div class="cre8-c-primary-nav__item-after">
                                <slot name="itemAfter"></slot>
                            </div>
                        `}
                    </a>
                </div>
            </div>
        `}};mt.styles=[Pe];let v=mt;K([Z()],v.prototype,"text"),K([Z()],v.prototype,"href"),K([Z()],v.prototype,"iconName"),K([Z({type:Boolean,reflect:!0})],v.prototype,"megaMenu"),K([Ee()],v.prototype,"isActive"),customElements.get("cre8-primary-nav-item")===void 0&&customElements.define("cre8-primary-nav-item",v),g.Cre8PrimaryNavItem=v,g.default=v,Object.defineProperties(g,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
