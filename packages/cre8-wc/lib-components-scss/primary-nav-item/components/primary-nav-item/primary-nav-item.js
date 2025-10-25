(function($,u){typeof exports=="object"&&typeof module<"u"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):($=typeof globalThis<"u"?globalThis:$||self,u($.Cre8PrimaryNavItem={}))})(this,function($){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var qe;const u=globalThis,re=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ie=Symbol(),me=new WeakMap;let ue=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(re&&e===void 0){const r=t!==void 0&&t.length===1;r&&(e=me.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&me.set(t,e))}return e}toString(){return this.cssText}};const Fe=o=>new ue(typeof o=="string"?o:o+"",void 0,ie),Xe=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((r,i,n)=>r+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new ue(t,o,ie)},Ze=(o,e)=>{if(re)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const r=document.createElement("style"),i=u.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=t.cssText,o.appendChild(r)}},ve=re?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return Fe(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ke,defineProperty:Ge,getOwnPropertyDescriptor:Ye,getOwnPropertyNames:Je,getOwnPropertySymbols:Qe,getPrototypeOf:et}=Object,v=globalThis,be=v.trustedTypes,tt=be?be.emptyScript:"",oe=v.reactiveElementPolyfillSupport,R=(o,e)=>o,Z={toAttribute(o,e){switch(e){case Boolean:o=o?tt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},ae=(o,e)=>!Ke(o,e),xe={attribute:!0,type:String,converter:Z,reflect:!1,useDefault:!1,hasChanged:ae};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),v.litPropertyMetadata??(v.litPropertyMetadata=new WeakMap);let H=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=xe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(e,r,t);i!==void 0&&Ge(this.prototype,e,i)}}static getPropertyDescriptor(e,t,r){const{get:i,set:n}=Ye(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:i,set(a){const s=i==null?void 0:i.call(this);n==null||n.call(this,a),this.requestUpdate(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??xe}static _$Ei(){if(this.hasOwnProperty(R("elementProperties")))return;const e=et(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(R("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(R("properties"))){const t=this.properties,r=[...Je(t),...Qe(t)];for(const i of r)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[r,i]of t)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[t,r]of this.elementProperties){const i=this._$Eu(t,r);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const i of r)t.unshift(ve(i))}else e!==void 0&&t.push(ve(e));return t}static _$Eu(e,t){const r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ze(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostConnected)==null?void 0:r.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var r;return(r=t.hostDisconnected)==null?void 0:r.call(t)})}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){var n;const r=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,r);if(i!==void 0&&r.reflect===!0){const a=(((n=r.converter)==null?void 0:n.toAttribute)!==void 0?r.converter:Z).toAttribute(t,r.type);this._$Em=e,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(e,t){var n,a;const r=this.constructor,i=r._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const s=r.getPropertyOptions(i),l=typeof s.converter=="function"?{fromAttribute:s.converter}:((n=s.converter)==null?void 0:n.fromAttribute)!==void 0?s.converter:Z;this._$Em=i,this[i]=l.fromAttribute(t,s.type)??((a=this._$Ej)==null?void 0:a.get(i))??null,this._$Em=null}}requestUpdate(e,t,r){var i;if(e!==void 0){const n=this.constructor,a=this[e];if(r??(r=n.getPropertyOptions(e)),!((r.hasChanged??ae)(a,t)||r.useDefault&&r.reflect&&a===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:i,wrapped:n},a){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),n!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,a]of this._$Ep)this[n]=a;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,a]of i){const{wrapped:s}=a,l=this[n];s!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,a,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(r=this._$EO)==null||r.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(r=>{var i;return(i=r.hostUpdated)==null?void 0:i.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};H.elementStyles=[],H.shadowRootOptions={mode:"open"},H[R("elementProperties")]=new Map,H[R("finalized")]=new Map,oe==null||oe({ReactiveElement:H}),(v.reactiveElementVersions??(v.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const U=globalThis,K=U.trustedTypes,$e=K?K.createPolicy("lit-html",{createHTML:o=>o}):void 0,_e="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,we="?"+b,rt=`<${we}>`,_=document,I=()=>_.createComment(""),L=o=>o===null||typeof o!="object"&&typeof o!="function",ne=Array.isArray,it=o=>ne(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",le=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ae=/-->/g,ke=/>/g,w=RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ze=/'/g,Ee=/"/g,Se=/^(?:script|style|textarea|title)$/i,ot=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),A=ot(1),P=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),Ce=new WeakMap,k=_.createTreeWalker(_,129);function He(o,e){if(!ne(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return $e!==void 0?$e.createHTML(e):e}const at=(o,e)=>{const t=o.length-1,r=[];let i,n=e===2?"<svg>":e===3?"<math>":"",a=B;for(let s=0;s<t;s++){const l=o[s];let c,p,h=-1,d=0;for(;d<l.length&&(a.lastIndex=d,p=a.exec(l),p!==null);)d=a.lastIndex,a===B?p[1]==="!--"?a=Ae:p[1]!==void 0?a=ke:p[2]!==void 0?(Se.test(p[2])&&(i=RegExp("</"+p[2],"g")),a=w):p[3]!==void 0&&(a=w):a===w?p[0]===">"?(a=i??B,h=-1):p[1]===void 0?h=-2:(h=a.lastIndex-p[2].length,c=p[1],a=p[3]===void 0?w:p[3]==='"'?Ee:ze):a===Ee||a===ze?a=w:a===Ae||a===ke?a=B:(a=w,i=void 0);const f=a===w&&o[s+1].startsWith("/>")?" ":"";n+=a===B?l+rt:h>=0?(r.push(c),l.slice(0,h)+_e+l.slice(h)+b+f):l+b+(h===-2?s:f)}return[He(o,n+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};let se=class Ve{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let n=0,a=0;const s=e.length-1,l=this.parts,[c,p]=at(e,t);if(this.el=Ve.createElement(c,r),k.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=k.nextNode())!==null&&l.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(const h of i.getAttributeNames())if(h.endsWith(_e)){const d=p[a++],f=i.getAttribute(h).split(b),M=/([.?@])?(.*)/.exec(d);l.push({type:1,index:n,name:M[2],strings:f,ctor:M[1]==="."?lt:M[1]==="?"?st:M[1]==="@"?ct:G}),i.removeAttribute(h)}else h.startsWith(b)&&(l.push({type:6,index:n}),i.removeAttribute(h));if(Se.test(i.tagName)){const h=i.textContent.split(b),d=h.length-1;if(d>0){i.textContent=K?K.emptyScript:"";for(let f=0;f<d;f++)i.append(h[f],I()),k.nextNode(),l.push({type:2,index:++n});i.append(h[d],I())}}}else if(i.nodeType===8)if(i.data===we)l.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf(b,h+1))!==-1;)l.push({type:7,index:n}),h+=b.length-1}n++}}static createElement(e,t){const r=_.createElement("template");return r.innerHTML=e,r}};function N(o,e,t=o,r){var a,s;if(e===P)return e;let i=r!==void 0?(a=t._$Co)==null?void 0:a[r]:t._$Cl;const n=L(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((s=i==null?void 0:i._$AO)==null||s.call(i,!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=i:t._$Cl=i),i!==void 0&&(e=N(o,i._$AS(o,e.values),i,r)),e}let nt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:r}=this._$AD,i=((e==null?void 0:e.creationScope)??_).importNode(t,!0);k.currentNode=i;let n=k.nextNode(),a=0,s=0,l=r[0];for(;l!==void 0;){if(a===l.index){let c;l.type===2?c=new ce(n,n.nextSibling,this,e):l.type===1?c=new l.ctor(n,l.name,l.strings,this,e):l.type===6&&(c=new ht(n,this,e)),this._$AV.push(c),l=r[++s]}a!==(l==null?void 0:l.index)&&(n=k.nextNode(),a++)}return k.currentNode=_,i}p(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},ce=class We{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,r,i){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=N(this,e,t),L(e)?e===g||e==null||e===""?(this._$AH!==g&&this._$AR(),this._$AH=g):e!==this._$AH&&e!==P&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):it(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==g&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(_.createTextNode(e)),this._$AH=e}$(e){var n;const{values:t,_$litType$:r}=e,i=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=se.createElement(He(r.h,r.h[0]),this.options)),r);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(t);else{const a=new nt(i,this),s=a.u(this.options);a.p(t),this.T(s),this._$AH=a}}_$AC(e){let t=Ce.get(e.strings);return t===void 0&&Ce.set(e.strings,t=new se(e)),t}k(e){ne(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const n of e)i===t.length?t.push(r=new We(this.O(I()),this.O(I()),this,this.options)):r=t[i],r._$AI(n),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}},G=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,i,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=g}_$AI(e,t=this,r,i){const n=this.strings;let a=!1;if(n===void 0)e=N(this,e,t,0),a=!L(e)||e!==this._$AH&&e!==P,a&&(this._$AH=e);else{const s=e;let l,c;for(e=n[0],l=0;l<n.length-1;l++)c=N(this,s[r+l],t,l),c===P&&(c=this._$AH[l]),a||(a=!L(c)||c!==this._$AH[l]),c===g?e=g:e!==g&&(e+=(c??"")+n[l+1]),this._$AH[l]=c}a&&!i&&this.j(e)}j(e){e===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},lt=class extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===g?void 0:e}},st=class extends G{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==g)}},ct=class extends G{constructor(e,t,r,i,n){super(e,t,r,i,n),this.type=5}_$AI(e,t=this){if((e=N(this,e,t,0)??g)===P)return;const r=this._$AH,i=e===g&&r!==g||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==g&&(r===g||i);i&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}},ht=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}};const he=U.litHtmlPolyfillSupport;he==null||he(se,ce),(U.litHtmlVersions??(U.litHtmlVersions=[])).push("3.3.0");const pt=(o,e,t)=>{const r=(t==null?void 0:t.renderBefore)??e;let i=r._$litPart$;if(i===void 0){const n=(t==null?void 0:t.renderBefore)??null;r._$litPart$=i=new ce(e.insertBefore(I(),n),n,void 0,t??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis;let j=class extends H{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=pt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return P}};j._$litElement$=!0,j.finalized=!0,(qe=z.litElementHydrateSupport)==null||qe.call(z,{LitElement:j});const pe=z.litElementPolyfillSupport;pe==null||pe({LitElement:j}),(z.litElementVersions??(z.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var de;const Y=window,O=Y.trustedTypes,Pe=O?O.createPolicy("lit-html",{createHTML:o=>o}):void 0,ye="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,Ne="?"+x,dt=`<${Ne}>`,E=document,J=()=>E.createComment(""),D=o=>o===null||typeof o!="object"&&typeof o!="function",Oe=Array.isArray,yt=o=>Oe(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",fe=`[ 	
\f\r]`,q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Te=/-->/g,Me=/>/g,S=RegExp(`>|${fe}(?:([^\\s"'>=/]+)(${fe}*=${fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Re=/'/g,Ue=/"/g,Ie=/^(?:script|style|textarea|title)$/i,V=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Le=new WeakMap,C=E.createTreeWalker(E,129,null,!1);function Be(o,e){if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pe!==void 0?Pe.createHTML(e):e}const ft=(o,e)=>{const t=o.length-1,r=[];let i,n=e===2?"<svg>":"",a=q;for(let s=0;s<t;s++){const l=o[s];let c,p,h=-1,d=0;for(;d<l.length&&(a.lastIndex=d,p=a.exec(l),p!==null);)d=a.lastIndex,a===q?p[1]==="!--"?a=Te:p[1]!==void 0?a=Me:p[2]!==void 0?(Ie.test(p[2])&&(i=RegExp("</"+p[2],"g")),a=S):p[3]!==void 0&&(a=S):a===S?p[0]===">"?(a=i??q,h=-1):p[1]===void 0?h=-2:(h=a.lastIndex-p[2].length,c=p[1],a=p[3]===void 0?S:p[3]==='"'?Ue:Re):a===Ue||a===Re?a=S:a===Te||a===Me?a=q:(a=S,i=void 0);const f=a===S&&o[s+1].startsWith("/>")?" ":"";n+=a===q?l+dt:h>=0?(r.push(c),l.slice(0,h)+ye+l.slice(h)+x+f):l+x+(h===-2?(r.push(void 0),s):f)}return[Be(o,n+(o[t]||"<?>")+(e===2?"</svg>":"")),r]};class W{constructor({strings:e,_$litType$:t},r){let i;this.parts=[];let n=0,a=0;const s=e.length-1,l=this.parts,[c,p]=ft(e,t);if(this.el=W.createElement(c,r),C.currentNode=this.el.content,t===2){const h=this.el.content,d=h.firstChild;d.remove(),h.append(...d.childNodes)}for(;(i=C.nextNode())!==null&&l.length<s;){if(i.nodeType===1){if(i.hasAttributes()){const h=[];for(const d of i.getAttributeNames())if(d.endsWith(ye)||d.startsWith(x)){const f=p[a++];if(h.push(d),f!==void 0){const M=i.getAttribute(f.toLowerCase()+ye).split(x),te=/([.?@])?(.*)/.exec(f);l.push({type:1,index:n,name:te[2],strings:M,ctor:te[1]==="."?mt:te[1]==="?"?vt:te[1]==="@"?bt:ee})}else l.push({type:6,index:n})}for(const d of h)i.removeAttribute(d)}if(Ie.test(i.tagName)){const h=i.textContent.split(x),d=h.length-1;if(d>0){i.textContent=O?O.emptyScript:"";for(let f=0;f<d;f++)i.append(h[f],J()),C.nextNode(),l.push({type:2,index:++n});i.append(h[d],J())}}}else if(i.nodeType===8)if(i.data===Ne)l.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf(x,h+1))!==-1;)l.push({type:7,index:n}),h+=x.length-1}n++}}static createElement(e,t){const r=E.createElement("template");return r.innerHTML=e,r}}function T(o,e,t=o,r){var i,n,a,s;if(e===V)return e;let l=r!==void 0?(i=t._$Co)===null||i===void 0?void 0:i[r]:t._$Cl;const c=D(e)?void 0:e._$litDirective$;return(l==null?void 0:l.constructor)!==c&&((n=l==null?void 0:l._$AO)===null||n===void 0||n.call(l,!1),c===void 0?l=void 0:(l=new c(o),l._$AT(o,t,r)),r!==void 0?((a=(s=t)._$Co)!==null&&a!==void 0?a:s._$Co=[])[r]=l:t._$Cl=l),l!==void 0&&(e=T(o,l._$AS(o,e.values),l,r)),e}class gt{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:r},parts:i}=this._$AD,n=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:E).importNode(r,!0);C.currentNode=n;let a=C.nextNode(),s=0,l=0,c=i[0];for(;c!==void 0;){if(s===c.index){let p;c.type===2?p=new Q(a,a.nextSibling,this,e):c.type===1?p=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(p=new xt(a,this,e)),this._$AV.push(p),c=i[++l]}s!==(c==null?void 0:c.index)&&(a=C.nextNode(),s++)}return C.currentNode=E,n}v(e){let t=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}}class Q{constructor(e,t,r,i){var n;this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=i,this._$Cp=(n=i==null?void 0:i.isConnected)===null||n===void 0||n}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=T(this,e,t),D(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==V&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):yt(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==y&&D(this._$AH)?this._$AA.nextSibling.data=e:this.$(E.createTextNode(e)),this._$AH=e}g(e){var t;const{values:r,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=W.createElement(Be(i.h,i.h[0]),this.options)),i);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===n)this._$AH.v(r);else{const a=new gt(n,this),s=a.u(this.options);a.v(r),this.$(s),this._$AH=a}}_$AC(e){let t=Le.get(e.strings);return t===void 0&&Le.set(e.strings,t=new W(e)),t}T(e){Oe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let r,i=0;for(const n of e)i===t.length?t.push(r=new Q(this.k(J()),this.k(J()),this,this.options)):r=t[i],r._$AI(n),i++;i<t.length&&(this._$AR(r&&r._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var r;for((r=this._$AP)===null||r===void 0||r.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class ee{constructor(e,t,r,i,n){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=y}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,r,i){const n=this.strings;let a=!1;if(n===void 0)e=T(this,e,t,0),a=!D(e)||e!==this._$AH&&e!==V,a&&(this._$AH=e);else{const s=e;let l,c;for(e=n[0],l=0;l<n.length-1;l++)c=T(this,s[r+l],t,l),c===V&&(c=this._$AH[l]),a||(a=!D(c)||c!==this._$AH[l]),c===y?e=y:e!==y&&(e+=(c??"")+n[l+1]),this._$AH[l]=c}a&&!i&&this.j(e)}j(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class mt extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===y?void 0:e}}const ut=O?O.emptyScript:"";class vt extends ee{constructor(){super(...arguments),this.type=4}j(e){e&&e!==y?this.element.setAttribute(this.name,ut):this.element.removeAttribute(this.name)}}class bt extends ee{constructor(e,t,r,i,n){super(e,t,r,i,n),this.type=5}_$AI(e,t=this){var r;if((e=(r=T(this,e,t,0))!==null&&r!==void 0?r:y)===V)return;const i=this._$AH,n=e===y&&i!==y||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==y&&(i===y||n);n&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,r;typeof this._$AH=="function"?this._$AH.call((r=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&r!==void 0?r:this.element,e):this._$AH.handleEvent(e)}}class xt{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){T(this,e)}}const je=Y.litHtmlPolyfillSupport;je==null||je(W,Q),((de=Y.litHtmlVersions)!==null&&de!==void 0?de:Y.litHtmlVersions=[]).push("2.8.0");/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t=o=>o??y;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _t={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:ae},wt=(o=_t,e,t)=>{const{kind:r,metadata:i}=t;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),r==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(t.name,o),r==="accessor"){const{name:a}=t;return{set(s){const l=e.get.call(this);e.set.call(this,s),this.requestUpdate(a,l,o)},init(s){return s!==void 0&&this.C(a,void 0,o,s),s}}}if(r==="setter"){const{name:a}=t;return function(s){const l=this[a];e.call(this,s),this.requestUpdate(a,l,o)}}throw Error("Unsupported decorator location: "+r)};function F(o){return(e,t)=>typeof t=="object"?wt(o,e,t):((r,i,n)=>{const a=i.hasOwnProperty(n);return i.constructor.createProperty(n,r),a?Object.getOwnPropertyDescriptor(i,n):void 0})(o,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function At(o){return F({...o,state:!0,attribute:!1})}function kt(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var De={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(o){(function(){var e={}.hasOwnProperty;function t(){for(var r=[],i=0;i<arguments.length;i++){var n=arguments[i];if(n){var a=typeof n;if(a==="string"||a==="number")r.push(n);else if(Array.isArray(n)){if(n.length){var s=t.apply(null,n);s&&r.push(s)}}else if(a==="object"){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){r.push(n.toString());continue}for(var l in n)e.call(n,l)&&n[l]&&r.push(l)}}}return r.join(" ")}o.exports?(t.default=t,o.exports=t):window.classNames=t})()})(De);var zt=De.exports;const Et=kt(zt);class St extends j{componentClassNames(e,t={}){return Et(e,t)}slotEmpty(e){return!this.querySelector(`[slot="${e}"]`)}slotNotEmpty(e){return this.slotEmpty(e)?null:!this.slotEmpty(e)}dispatch({e,eventName:t,detailObj:r={},optionsObj:i={}}){const n={bubbles:!0,composed:!0,...i,detail:{...e&&{originalEvent:e},...r}},a=new CustomEvent(t,n);return this.dispatchEvent(a),a}render(){return A`<slot></slot>`}}const Ct=Xe`
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
`;var Ht=Object.defineProperty,X=(o,e,t,r)=>{for(var i=void 0,n=o.length-1,a;n>=0;n--)(a=o[n])&&(i=a(e,t,i)||i);return i&&Ht(e,t,i),i};const ge=class ge extends St{constructor(){super(),this.text="Nav item",this.href="#",this.iconName="caret-down",this._handleOnClickOutside=this._handleOnClickOutside.bind(this),this._clickHandler=this._clickHandler.bind(this)}connectedCallback(){this.setAttribute("role","listitem"),super.connectedCallback(),document.addEventListener("mousedown",this._handleOnClickOutside,!1)}disconnectedCallback(){document.removeEventListener("mousedown",this._handleOnClickOutside,!1),super.disconnectedCallback()}_handleOnClickOutside(e){var r;if(!this.isActive)return;if(!((r=this.shadowRoot)!=null&&r.host))throw Error("Could not determine navigation context during click handler");const t=e.composedPath().includes(this.shadowRoot.host);this.isActive&&!t&&(this.isActive=!1)}_clickHandler(e){e.preventDefault(),this.parentNode&&this.parentNode.querySelectorAll("cre8-primary-nav-item").forEach(r=>{r!==this&&(r.isActive=!1)}),this.isActive=!this.isActive}_closePanel(){this.isActive=!1}_handleOnKeyDown(e){var t;if(e.key==="Escape"&&this.isActive===!0){this._closePanel();const r=(t=this.shadowRoot)==null?void 0:t.querySelector(".cre8-c-primary-nav__link");r&&setTimeout(()=>{r.focus()},1)}}render(){const e=this.componentClassNames("cre8-c-primary-nav__item",{"cre8-is-active":this.isActive===!0,"cre8-c-primary-nav__item--megamenu":this.megaMenu===!0});return this.megaMenu?A`
            <div class="${e}" @keydown=${this._handleOnKeyDown}>
                <div class="cre8-c-primary-nav__item-content">
                    <button
                        class="cre8-c-primary-nav__link"
                        @click=${this._clickHandler}
                        aria-expanded=${this.isActive===!0}
                    >
                        ${this.slotNotEmpty("itemBefore")&&A`
                            <div class="cre8-c-primary-nav__item-before">
                                <slot name="itemBefore"></slot>
                            </div>
                        `}
                        ${this.text}
                        ${this.slotNotEmpty("itemAfter")&&A`
                            <div class="cre8-c-primary-nav__item-after">
                                <slot name="itemAfter"></slot>
                            </div>
                        `}
                        <cre8-icon-legacy aria-hidden="true" name="${$t(this.iconName)}"></cre8-icon-legacy>
                    </button>
                </div>
                <div class="cre8-c-primary-nav__item-panel">
                    <div class="cre8-c-primary-nav__item-panel-inner">
                        <slot></slot>
                    </div>
                </div>
            </div>
        `:A`
            <div class="${e}">
                <div class="cre8-c-primary-nav__item-content">
                    <a class="cre8-c-primary-nav__link" href="${this.href}">
                        ${this.slotNotEmpty("itemBefore")&&A`
                            <div class="cre8-c-primary-nav__item-before">
                                <slot name="itemBefore"></slot>
                            </div>
                        `}
                        ${this.text}
                        ${this.slotNotEmpty("itemAfter")&&A`
                            <div class="cre8-c-primary-nav__item-after">
                                <slot name="itemAfter"></slot>
                            </div>
                        `}
                    </a>
                </div>
            </div>
        `}};ge.styles=[Ct];let m=ge;X([F()],m.prototype,"text"),X([F()],m.prototype,"href"),X([F()],m.prototype,"iconName"),X([F({type:Boolean,reflect:!0})],m.prototype,"megaMenu"),X([At()],m.prototype,"isActive"),customElements.get("cre8-primary-nav-item")===void 0&&customElements.define("cre8-primary-nav-item",m),$.Cre8PrimaryNavItem=m,$.default=m,Object.defineProperties($,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
