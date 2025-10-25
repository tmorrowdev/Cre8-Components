(function(u,v){typeof exports=="object"&&typeof module<"u"?module.exports=v():typeof define=="function"&&define.amd?define(v):(u=typeof globalThis<"u"?globalThis:u||self,u.GlobalNavItem=u.GlobalNavItem||{},u.GlobalNavItem.styles=v())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var oe;const u=globalThis,v=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),q=new WeakMap;let W=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(v&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=q.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&q.set(t,e))}return e}toString(){return this.cssText}};const ae=r=>new W(typeof r=="string"?r:r+"",void 0,z),he=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new W(t,r,z)},le=(r,e)=>{if(v)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=u.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},G=v?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return ae(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ce,defineProperty:de,getOwnPropertyDescriptor:pe,getOwnPropertyNames:ue,getOwnPropertySymbols:$e,getPrototypeOf:fe}=Object,f=globalThis,F=f.trustedTypes,_e=F?F.emptyScript:"",I=f.reactiveElementPolyfillSupport,C=(r,e)=>r,D={toAttribute(r,e){switch(e){case Boolean:r=r?_e:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},J=(r,e)=>!ce(r,e),K={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:J};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class E extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=K){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&de(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:o}=pe(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){const h=i==null?void 0:i.call(this);o==null||o.call(this,n),this.requestUpdate(e,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??K}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const e=fe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const t=this.properties,s=[...ue(t),...$e(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(G(i))}else e!==void 0&&t.push(G(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return le(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostConnected)==null?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var s;return(s=t.hostDisconnected)==null?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){var o;const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const n=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:D).toAttribute(t,s.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,t){var o,n;const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const h=s.getPropertyOptions(i),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((o=h.converter)==null?void 0:o.fromAttribute)!==void 0?h.converter:D;this._$Em=i,this[i]=a.fromAttribute(t,h.type)??((n=this._$Ej)==null?void 0:n.get(i))??null,this._$Em=null}}requestUpdate(e,t,s){var i;if(e!==void 0){const o=this.constructor,n=this[e];if(s??(s=o.getPropertyOptions(e)),!((s.hasChanged??J)(n,t)||s.useDefault&&s.reflect&&n===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(o._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i){const{wrapped:h}=n,a=this[o];h!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[C("elementProperties")]=new Map,E[C("finalized")]=new Map,I==null||I({ReactiveElement:E}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const P=globalThis,M=P.trustedTypes,Z=M?M.createPolicy("lit-html",{createHTML:r=>r}):void 0,Y="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,Q="?"+_,me=`<${Q}>`,g=document,x=()=>g.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",L=Array.isArray,ve=r=>L(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",j=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,X=/-->/g,ee=/>/g,A=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,se=/"/g,ie=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),re=new WeakMap,y=g.createTreeWalker(g,129);function ne(r,e){if(!L(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Z!==void 0?Z.createHTML(e):e}const ge=(r,e)=>{const t=r.length-1,s=[];let i,o=e===2?"<svg>":e===3?"<math>":"",n=O;for(let h=0;h<t;h++){const a=r[h];let d,p,l=-1,$=0;for(;$<a.length&&(n.lastIndex=$,p=n.exec(a),p!==null);)$=n.lastIndex,n===O?p[1]==="!--"?n=X:p[1]!==void 0?n=ee:p[2]!==void 0?(ie.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=A):p[3]!==void 0&&(n=A):n===A?p[0]===">"?(n=i??O,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,d=p[1],n=p[3]===void 0?A:p[3]==='"'?se:te):n===se||n===te?n=A:n===X||n===ee?n=O:(n=A,i=void 0);const m=n===A&&r[h+1].startsWith("/>")?" ":"";o+=n===O?a+me:l>=0?(s.push(d),a.slice(0,l)+Y+a.slice(l)+_+m):a+_+(l===-2?h:m)}return[ne(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class T{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,n=0;const h=e.length-1,a=this.parts,[d,p]=ge(e,t);if(this.el=T.createElement(d,s),y.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=y.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(Y)){const $=p[n++],m=i.getAttribute(l).split(_),k=/([.?@])?(.*)/.exec($);a.push({type:1,index:o,name:k[2],strings:m,ctor:k[1]==="."?ye:k[1]==="?"?be:k[1]==="@"?Ee:N}),i.removeAttribute(l)}else l.startsWith(_)&&(a.push({type:6,index:o}),i.removeAttribute(l));if(ie.test(i.tagName)){const l=i.textContent.split(_),$=l.length-1;if($>0){i.textContent=M?M.emptyScript:"";for(let m=0;m<$;m++)i.append(l[m],x()),y.nextNode(),a.push({type:2,index:++o});i.append(l[$],x())}}}else if(i.nodeType===8)if(i.data===Q)a.push({type:2,index:o});else{let l=-1;for(;(l=i.data.indexOf(_,l+1))!==-1;)a.push({type:7,index:o}),l+=_.length-1}o++}}static createElement(e,t){const s=g.createElement("template");return s.innerHTML=e,s}}function w(r,e,t=r,s){var n,h;if(e===S)return e;let i=s!==void 0?(n=t._$Co)==null?void 0:n[s]:t._$Cl;const o=U(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((h=i==null?void 0:i._$AO)==null||h.call(i,!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??(t._$Co=[]))[s]=i:t._$Cl=i),i!==void 0&&(e=w(r,i._$AS(r,e.values),i,s)),e}class Ae{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=((e==null?void 0:e.creationScope)??g).importNode(t,!0);y.currentNode=i;let o=y.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new H(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Se(o,this,e)),this._$AV.push(d),a=s[++h]}n!==(a==null?void 0:a.index)&&(o=y.nextNode(),n++)}return y.currentNode=g,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class H{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),U(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ve(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&U(this._$AH)?this._$AA.nextSibling.data=e:this.T(g.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=T.createElement(ne(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(t);else{const n=new Ae(i,this),h=n.u(this.options);n.p(t),this.T(h),this._$AH=n}}_$AC(e){let t=re.get(e.strings);return t===void 0&&re.set(e.strings,t=new T(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new H(this.O(x()),this.O(x()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(e,t=this,s,i){const o=this.strings;let n=!1;if(o===void 0)e=w(this,e,t,0),n=!U(e)||e!==this._$AH&&e!==S,n&&(this._$AH=e);else{const h=e;let a,d;for(e=o[0],a=0;a<o.length-1;a++)d=w(this,h[s+a],t,a),d===S&&(d=this._$AH[a]),n||(n=!U(d)||d!==this._$AH[a]),d===c?e=c:e!==c&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!i&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ye extends N{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}}class be extends N{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}}class Ee extends N{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??c)===S)return;const s=this._$AH,i=e===c&&s!==c||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const B=P.litHtmlPolyfillSupport;B==null||B(T,H),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.0");const we=(r,e,t)=>{const s=(t==null?void 0:t.renderBefore)??e;let i=s._$litPart$;if(i===void 0){const o=(t==null?void 0:t.renderBefore)??null;s._$litPart$=i=new H(e.insertBefore(x(),o),o,void 0,t??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=globalThis;class R extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}}R._$litElement$=!0,R.finalized=!0,(oe=b.litElementHydrateSupport)==null||oe.call(b,{LitElement:R});const V=b.litElementPolyfillSupport;return V==null||V({LitElement:R}),(b.litElementVersions??(b.litElementVersions=[])).push("4.2.0"),he`@import '../../design-tokens/core/scss/theming/component';

// #PRIMARY NAV ITEM

/**
 * Actual primary nav list item
 */

/**
 * Content within the primary nav item
 */
.cre8-c-global-nav__item-content {
  display: flex;
  align-items: baseline;
}

/**
 * Primary navigation link
 * 1) Used to remove any sort of default button styles when a button tag is rendered
 */
.cre8-c-global-nav__link {
  @include cre8-typography-body-small;
  display: flex;
  align-items: center;
  appearance: none; /* 1 */
  background: transparent; /* 1 */
  border: none;
  //border: 1px solid var(--cre8-color-header-menu-border-default); /* 1 */
  white-space: nowrap;
  width: 100%;
  margin: 0;
  padding: calc(var(--size-base-unit) * 1) calc(var(--size-base-unit) * 2);
  color: var(--cre8-global-nav-link-color, var(--cre8-color-content-subtle));
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
}

/**
 * Icon within primary navigation item
 * 1) TODO: Figure out how to pass down calc(var(--size-base-unit) * 1.5) instead of static rem value
 */
cre8-icon-legacy {
  --cre8-icon-height: #{calc(var(--size-base-unit) * 1)}; /* 1 */
  --cre8-icon-width: #{calc(var(--size-base-unit) * 1)}; /* 1 */
  margin-left: auto;
  transition: transform var(--cre8-anim-fade-quick) var(--cre8-anim-ease);

  /**
  * Icon within active primary nav item
  * 1) Rotate the icon to show that the dropdown is open
  */
  .cre8-c-global-nav__item.cre8-is-active & {
    transform: rotate(-180deg); /* 1 */
  }

  @media all and (min-width:$cre8-breakpoint-lg) {
    margin-left: calc(var(--size-base-unit) * 1);
  }
}

.cre8-c-global-nav__item-after {
  --cre8-icon-height: #{calc(var(--size-base-unit) * 1.5)};
  --cre8-icon-width: #{calc(var(--size-base-unit) * 1.5)};
  margin-left: calc(var(--size-base-unit) * 1);
}
`});
