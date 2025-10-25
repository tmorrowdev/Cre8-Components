(function(v,$){typeof exports=="object"&&typeof module<"u"?$(exports):typeof define=="function"&&define.amd?define(["exports"],$):(v=typeof globalThis<"u"?globalThis:v||self,$(v.Header={}))})(this,function(v){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var dt;const $=globalThis,L=$.ShadowRoot&&($.ShadyCSS===void 0||$.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,I=Symbol(),Z=new WeakMap;let G=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==I)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(L&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Z.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Z.set(e,t))}return t}toString(){return this.cssText}};const ut=r=>new G(typeof r=="string"?r:r+"",void 0,I),pt=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new G(e,r,I)},$t=(r,t)=>{if(L)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=$.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Q=L?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ut(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ft,defineProperty:_t,getOwnPropertyDescriptor:mt,getOwnPropertyNames:vt,getOwnPropertySymbols:yt,getPrototypeOf:gt}=Object,f=globalThis,X=f.trustedTypes,At=X?X.emptyScript:"",B=f.reactiveElementPolyfillSupport,P=(r,t)=>r,R={toAttribute(r,t){switch(t){case Boolean:r=r?At:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},q=(r,t)=>!ft(r,t),Y={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:q};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&_t(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=mt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){const h=i==null?void 0:i.call(this);o==null||o.call(this,n),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Y}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const t=gt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const e=this.properties,s=[...vt(e),...yt(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Q(i))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $t(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var o;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const n=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:R).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){var o,n;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const h=s.getPropertyOptions(i),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((o=h.converter)==null?void 0:o.fromAttribute)!==void 0?h.converter:R;this._$Em=i,this[i]=a.fromAttribute(e,h.type)??((n=this._$Ej)==null?void 0:n.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const o=this.constructor,n=this[t];if(s??(s=o.getPropertyOptions(t)),!((s.hasChanged??q)(n,e)||s.useDefault&&s.reflect&&n===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i){const{wrapped:h}=n,a=this[o];h!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[P("elementProperties")]=new Map,E[P("finalized")]=new Map,B==null||B({ReactiveElement:E}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=globalThis,k=x.trustedTypes,tt=k?k.createPolicy("lit-html",{createHTML:r=>r}):void 0,et="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,st="?"+_,bt=`<${st}>`,y=document,O=()=>y.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",V=Array.isArray,Et=r=>V(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",W=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,it=/-->/g,rt=/>/g,g=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ot=/'/g,nt=/"/g,at=/^(?:script|style|textarea|title)$/i,St=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),j=St(1),S=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ht=new WeakMap,A=y.createTreeWalker(y,129);function lt(r,t){if(!V(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return tt!==void 0?tt.createHTML(t):t}const wt=(r,t)=>{const e=r.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",n=M;for(let h=0;h<e;h++){const a=r[h];let d,u,l=-1,p=0;for(;p<a.length&&(n.lastIndex=p,u=n.exec(a),u!==null);)p=n.lastIndex,n===M?u[1]==="!--"?n=it:u[1]!==void 0?n=rt:u[2]!==void 0?(at.test(u[2])&&(i=RegExp("</"+u[2],"g")),n=g):u[3]!==void 0&&(n=g):n===g?u[0]===">"?(n=i??M,l=-1):u[1]===void 0?l=-2:(l=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?g:u[3]==='"'?nt:ot):n===nt||n===ot?n=g:n===it||n===rt?n=M:(n=g,i=void 0);const m=n===g&&r[h+1].startsWith("/>")?" ":"";o+=n===M?a+bt:l>=0?(s.push(d),a.slice(0,l)+et+a.slice(l)+_+m):a+_+(l===-2?h:m)}return[lt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class H{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const h=t.length-1,a=this.parts,[d,u]=wt(t,e);if(this.el=H.createElement(d,s),A.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=A.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(et)){const p=u[n++],m=i.getAttribute(l).split(_),D=/([.?@])?(.*)/.exec(p);a.push({type:1,index:o,name:D[2],strings:m,ctor:D[1]==="."?Pt:D[1]==="?"?xt:D[1]==="@"?Ot:z}),i.removeAttribute(l)}else l.startsWith(_)&&(a.push({type:6,index:o}),i.removeAttribute(l));if(at.test(i.tagName)){const l=i.textContent.split(_),p=l.length-1;if(p>0){i.textContent=k?k.emptyScript:"";for(let m=0;m<p;m++)i.append(l[m],O()),A.nextNode(),a.push({type:2,index:++o});i.append(l[p],O())}}}else if(i.nodeType===8)if(i.data===st)a.push({type:2,index:o});else{let l=-1;for(;(l=i.data.indexOf(_,l+1))!==-1;)a.push({type:7,index:o}),l+=_.length-1}o++}}static createElement(t,e){const s=y.createElement("template");return s.innerHTML=t,s}}function w(r,t,e=r,s){var n,h;if(t===S)return t;let i=s!==void 0?(n=e._$Co)==null?void 0:n[s]:e._$Cl;const o=U(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((h=i==null?void 0:i._$AO)==null||h.call(i,!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=w(r,i._$AS(r,t.values),i,s)),t}class Ct{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??y).importNode(e,!0);A.currentNode=i;let o=A.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new N(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new Ut(o,this,t)),this._$AV.push(d),a=s[++h]}n!==(a==null?void 0:a.index)&&(o=A.nextNode(),n++)}return A.currentNode=y,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class N{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),U(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Et(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(y.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=H.createElement(lt(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(e);else{const n=new Ct(i,this),h=n.u(this.options);n.p(e),this.T(h),this._$AH=n}}_$AC(t){let e=ht.get(t.strings);return e===void 0&&ht.set(t.strings,e=new H(t)),e}k(t){V(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new N(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(o===void 0)t=w(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==S,n&&(this._$AH=t);else{const h=t;let a,d;for(t=o[0],a=0;a<o.length-1;a++)d=w(this,h[s+a],e,a),d===S&&(d=this._$AH[a]),n||(n=!U(d)||d!==this._$AH[a]),d===c?t=c:t!==c&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Pt extends z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class xt extends z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class Ot extends z{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??c)===S)return;const s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ut{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const F=x.litHtmlPolyfillSupport;F==null||F(H,N),(x.litHtmlVersions??(x.litHtmlVersions=[])).push("3.3.0");const Mt=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const o=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new N(t.insertBefore(O(),o),o,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class T extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return S}}T._$litElement$=!0,T.finalized=!0,(dt=b.litElementHydrateSupport)==null||dt.call(b,{LitElement:T});const J=b.litElementPolyfillSupport;J==null||J({LitElement:T}),(b.litElementVersions??(b.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ht={attribute:!0,type:String,converter:R,reflect:!1,hasChanged:q},Nt=(r=Ht,t,e)=>{const{kind:s,metadata:i}=e;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),o.set(e.name,r),s==="accessor"){const{name:n}=e;return{set(h){const a=t.get.call(this);t.set.call(this,h),this.requestUpdate(n,a,r)},init(h){return h!==void 0&&this.C(n,void 0,r,h),h}}}if(s==="setter"){const{name:n}=e;return function(h){const a=this[n];t.call(this,h),this.requestUpdate(n,a,r)}}throw Error("Unsupported decorator location: "+s)};function Tt(r){return(t,e)=>typeof e=="object"?Nt(r,t,e):((s,i,o)=>{const n=i.hasOwnProperty(o);return i.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(i,o):void 0})(r,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Rt(r){return Tt({...r,state:!0,attribute:!1})}function kt(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var ct={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(r){(function(){var t={}.hasOwnProperty;function e(){for(var s=[],i=0;i<arguments.length;i++){var o=arguments[i];if(o){var n=typeof o;if(n==="string"||n==="number")s.push(o);else if(Array.isArray(o)){if(o.length){var h=e.apply(null,o);h&&s.push(h)}}else if(n==="object"){if(o.toString!==Object.prototype.toString&&!o.toString.toString().includes("[native code]")){s.push(o.toString());continue}for(var a in o)t.call(o,a)&&o[a]&&s.push(a)}}}return s.join(" ")}r.exports?(e.default=e,r.exports=e):window.classNames=e})()})(ct);var jt=ct.exports;const zt=kt(jt);class Dt extends T{componentClassNames(t,e={}){return zt(t,e)}slotEmpty(t){return!this.querySelector(`[slot="${t}"]`)}slotNotEmpty(t){return this.slotEmpty(t)?null:!this.slotEmpty(t)}dispatch({e:t,eventName:e,detailObj:s={},optionsObj:i={}}){const o={bubbles:!0,composed:!0,...i,detail:{...t&&{originalEvent:t},...s}},n=new CustomEvent(e,o);return this.dispatchEvent(n),n}render(){return j`<slot></slot>`}}const Lt=pt`@import '../../design-tokens/core/scss/theming/component';

// #HEADER

/**
  * 1) Global header where the navigation, logo, and other content lives across the entire site
  */
.cre8-c-header {
  background: var(--cre8-header-background, var(--cre8-color-header-bg-default));
  color: var(--cre8-color-content-default);
  position: relative;
  z-index: 3;
}

/**
 * Header top section
 * 1) Optional slot used for global navigation usually
 */
.cre8-c-header__top {
  position: relative;
  top: 0;
  width: 100%;
  z-index: 3;
  background: var(--cre8-header-top-background);
}

/**
 * Inner container of the header top section
 * 1) Used to cap the width of the content within the header
 */
.cre8-c-header__top-inner {
  display: flex;
  align-items: center;
  width: 100%;
  overflow: auto;
}

/**
 * Header middle section
 * 1) Section of the site used for the logo and primary navigation
 */
.cre8-c-header__middle {
  width: 100%;
  box-shadow: var(--cre8-theme-box-shadow-md);
  border-bottom: var(--cre8-header-middle-border-bottom-color);
}

/**
 * Inner container of the header middle section
 * 1) Used to cap the width of the content within the header
 */
.cre8-c-header__middle-inner {
  display: flex;
  align-items: center;
  width: 100%;
  padding-top: calc(var(--size-base-unit) * 2);
  padding-bottom: calc(var(--size-base-unit) * 2);
}

.cre8-c-header__bottom {
  background: var(--cre8-header-bottom-background);
  box-shadow: var(--cre8-header-bottom-box-shadow);
}
`;var It=Object.defineProperty,Bt=(r,t,e,s)=>{for(var i=void 0,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=n(t,e,i)||i);return i&&It(t,e,i),i};const K=class K extends Dt{render(){const t=this.componentClassNames("cre8-c-header",{"cre8-is-active":this.isActive===!0});return j`
      <header class="${t}">
        ${this.slotNotEmpty("top")&&j`<div class="cre8-c-header__top">
          <cre8-layout-container>
            <div class="cre8-c-header__top-inner">
              <slot name="top"></slot>
            </div>
          </cre8-layout-container>
        </div>`}
        <div class="cre8-c-header__middle">
          <cre8-layout-container>
            <div class="cre8-c-header__middle-inner">
              <slot></slot>
            </div>
          </cre8-layout-container>
        </div>
        ${this.slotNotEmpty("bottom")&&j`<div class="cre8-c-header__bottom">
          <cre8-layout-container>
            <slot name="bottom"></slot>
          </cre8-layout-container>
        </div>`}
      </header>
    `}};K.styles=[Lt];let C=K;Bt([Rt()],C.prototype,"isActive"),customElements.get("cre8-header")===void 0&&customElements.define("cre8-header",C),v.Cre8Header=C,v.default=C,Object.defineProperties(v,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
