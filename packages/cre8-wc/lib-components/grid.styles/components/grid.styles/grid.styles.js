(function(u,_){typeof exports=="object"&&typeof module<"u"?module.exports=_():typeof define=="function"&&define.amd?define(_):(u=typeof globalThis<"u"?globalThis:u||self,u.Grid=u.Grid||{},u.Grid.styles=_())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var oe;const u=globalThis,_=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),V=new WeakMap;let W=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(_&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=V.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&V.set(t,e))}return e}toString(){return this.cssText}};const ae=s=>new W(typeof s=="string"?s:s+"",void 0,G),de=(s,...e)=>{const t=s.length===1?s[0]:e.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new W(t,s,G)},le=(s,e)=>{if(_)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),r=u.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,s.appendChild(i)}},q=_?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ae(t)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:he,defineProperty:ce,getOwnPropertyDescriptor:pe,getOwnPropertyNames:ue,getOwnPropertySymbols:me,getPrototypeOf:$e}=Object,$=globalThis,J=$.trustedTypes,ge=J?J.emptyScript:"",z=$.reactiveElementPolyfillSupport,k=(s,e)=>s,D={toAttribute(s,e){switch(e){case Boolean:s=s?ge:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},K=(s,e)=>!he(s,e),Z={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:K};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);class v extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Z){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);r!==void 0&&ce(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:o}=pe(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:r,set(n){const d=r==null?void 0:r.call(this);o==null||o.call(this,n),this.requestUpdate(e,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Z}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;const e=$e(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){const t=this.properties,i=[...ue(t),...me(t)];for(const r of i)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,r]of t)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const r=this._$Eu(t,i);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(q(r))}else e!==void 0&&t.push(q(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return le(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var o;const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(r!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:D).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){var o,n;const i=this.constructor,r=i._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const d=i.getPropertyOptions(r),a=typeof d.converter=="function"?{fromAttribute:d.converter}:((o=d.converter)==null?void 0:o.fromAttribute)!==void 0?d.converter:D;this._$Em=r,this[r]=a.fromAttribute(t,d.type)??((n=this._$Ej)==null?void 0:n.get(r))??null,this._$Em=null}}requestUpdate(e,t,i){var r;if(e!==void 0){const o=this.constructor,n=this[e];if(i??(i=o.getPropertyOptions(e)),!((i.hasChanged??K)(n,t)||i.useDefault&&i.reflect&&n===((r=this._$Ej)==null?void 0:r.get(e))&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:o},n){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,n]of r){const{wrapped:d}=n,a=this[o];d!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,n,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}}v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[k("elementProperties")]=new Map,v[k("finalized")]=new Map,z==null||z({ReactiveElement:v}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=globalThis,T=x.trustedTypes,F=T?T.createPolicy("lit-html",{createHTML:s=>s}):void 0,Q="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+g,fe=`<${X}>`,w=document,C=()=>w.createComment(""),P=s=>s===null||typeof s!="object"&&typeof s!="function",L=Array.isArray,_e=s=>L(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",j=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,ee=/>/g,b=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,ie=/"/g,re=/^(?:script|style|textarea|title)$/i,S=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),se=new WeakMap,A=w.createTreeWalker(w,129);function ne(s,e){if(!L(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return F!==void 0?F.createHTML(e):e}const we=(s,e)=>{const t=s.length-1,i=[];let r,o=e===2?"<svg>":e===3?"<math>":"",n=U;for(let d=0;d<t;d++){const a=s[d];let c,p,l=-1,m=0;for(;m<a.length&&(n.lastIndex=m,p=n.exec(a),p!==null);)m=n.lastIndex,n===U?p[1]==="!--"?n=Y:p[1]!==void 0?n=ee:p[2]!==void 0?(re.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=b):p[3]!==void 0&&(n=b):n===b?p[0]===">"?(n=r??U,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?b:p[3]==='"'?ie:te):n===ie||n===te?n=b:n===Y||n===ee?n=U:(n=b,r=void 0);const f=n===b&&s[d+1].startsWith("/>")?" ":"";o+=n===U?a+fe:l>=0?(i.push(c),a.slice(0,l)+Q+a.slice(l)+g+f):a+g+(l===-2?d:f)}return[ne(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class O{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,n=0;const d=e.length-1,a=this.parts,[c,p]=we(e,t);if(this.el=O.createElement(c,i),A.currentNode=this.el.content,t===2||t===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=A.nextNode())!==null&&a.length<d;){if(r.nodeType===1){if(r.hasAttributes())for(const l of r.getAttributeNames())if(l.endsWith(Q)){const m=p[n++],f=r.getAttribute(l).split(g),R=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:R[2],strings:f,ctor:R[1]==="."?Ae:R[1]==="?"?ye:R[1]==="@"?ve:M}),r.removeAttribute(l)}else l.startsWith(g)&&(a.push({type:6,index:o}),r.removeAttribute(l));if(re.test(r.tagName)){const l=r.textContent.split(g),m=l.length-1;if(m>0){r.textContent=T?T.emptyScript:"";for(let f=0;f<m;f++)r.append(l[f],C()),A.nextNode(),a.push({type:2,index:++o});r.append(l[m],C())}}}else if(r.nodeType===8)if(r.data===X)a.push({type:2,index:o});else{let l=-1;for(;(l=r.data.indexOf(g,l+1))!==-1;)a.push({type:7,index:o}),l+=g.length-1}o++}}static createElement(e,t){const i=w.createElement("template");return i.innerHTML=e,i}}function E(s,e,t=s,i){var n,d;if(e===S)return e;let r=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const o=P(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((d=r==null?void 0:r._$AO)==null||d.call(r,!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=r:t._$Cl=r),r!==void 0&&(e=E(s,r._$AS(s,e.values),r,i)),e}class be{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=((e==null?void 0:e.creationScope)??w).importNode(t,!0);A.currentNode=r;let o=A.nextNode(),n=0,d=0,a=i[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new H(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Se(o,this,e)),this._$AV.push(c),a=i[++d]}n!==(a==null?void 0:a.index)&&(o=A.nextNode(),n++)}return A.currentNode=w,r}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class H{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=E(this,e,t),P(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):_e(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==h&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,r=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=O.createElement(ne(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(t);else{const n=new be(r,this),d=n.u(this.options);n.p(t),this.T(d),this._$AH=n}}_$AC(e){let t=se.get(e.strings);return t===void 0&&se.set(e.strings,t=new O(e)),t}k(e){L(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new H(this.O(C()),this.O(C()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=h}_$AI(e,t=this,i,r){const o=this.strings;let n=!1;if(o===void 0)e=E(this,e,t,0),n=!P(e)||e!==this._$AH&&e!==S,n&&(this._$AH=e);else{const d=e;let a,c;for(e=o[0],a=0;a<o.length-1;a++)c=E(this,d[i+a],t,a),c===S&&(c=this._$AH[a]),n||(n=!P(c)||c!==this._$AH[a]),c===h?e=h:e!==h&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}n&&!r&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ae extends M{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class ye extends M{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class ve extends M{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=E(this,e,t,0)??h)===S)return;const i=this._$AH,r=e===h&&i!==h||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==h&&(i===h||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Se{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){E(this,e)}}const I=x.litHtmlPolyfillSupport;I==null||I(O,H),(x.litHtmlVersions??(x.litHtmlVersions=[])).push("3.3.0");const Ee=(s,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let r=i._$litPart$;if(r===void 0){const o=(t==null?void 0:t.renderBefore)??null;i._$litPart$=r=new H(e.insertBefore(C(),o),o,void 0,t??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const y=globalThis;class N extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ee(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return S}}N._$litElement$=!0,N.finalized=!0,(oe=y.litElementHydrateSupport)==null||oe.call(y,{LitElement:N});const B=y.litElementPolyfillSupport;return B==null||B({LitElement:N}),(y.litElementVersions??(y.litElementVersions=[])).push("4.2.0"),de`@import '../../design-tokens/core/scss/theming/component';

// #GRID

/**
 * 1) Grid layout for items like cards, etc.
 */
.cre8-c-grid {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: calc(var(--size-base-unit) * -1.5);
}

/**
 * Grid with no gap in between items
 */
.cre8-c-grid--gap-none {
  margin: 0;
}

/**
 * Small gap grid
 * 1) Spacing between grid items is smaller than default
 */
.cre8-c-grid--gap-sm {
  margin: calc(var(--size-base-unit) * -0.5);
}

/**
 * Large gap grid
 * 1) Spacing between grid items is larger than default
 */
.cre8-c-grid--gap-lg {
  margin: calc(var(--size-base-unit) * -2);
}

/**
 * Side by Side Grid
 * 1) Grid that stays 2 items per row on all screen sizes
 */
.cre8-c-grid--side-by-side {
  flex-direction: row;
}

/**
 * 2up grid
 * 1) Stacked items on small screens to 2 items per row on medium/large screens
 */
.cre8-c-grid--2up {
  @media all and (min-width:$cre8-breakpoint-md) {
    flex-direction: row;
  }

  /**
  * 2up grid that breaks faster
  * 1) Grid that breaks from 1 to 2up at a smaller viewport than the default
  */
  &.cre8-c-grid--break-faster {
    @media all and (min-width:$cre8-breakpoint-sm) {
      flex-direction: row;
    }
  }

  /**
  * 2up grid that breaks slower
  * 1) Grid that breaks from 1 to 2up at a larger viewport than the default
  */
  &.cre8-c-grid--break-slower {
    @media all and (min-width:$cre8-breakpoint-md) {
      flex-direction: column;
    }
    @media all and (min-width:$cre8-breakpoint-xxl) {
      flex-direction: row;
    }
  }
}

/**
 * 3up grid
 * 1) Stacked items on small screens to 3 items per row on medium/large screens
 */
.cre8-c-grid--3up {
  @media all and (min-width:$cre8-breakpoint-md) {
    flex-direction: row;
  }
}

/**
 * 1 to 3up grid
 * 1) Stacked items on small screens to 3 items per row on medium/large screens
 */
.cre8-c-grid--1-3up {
  @media all and (min-width:$cre8-breakpoint-lg) {
    flex-direction: row;
  }

  /**
  * 1 to 3 up grid that breaks faster
  * 1) Grid that breaks from 1 to 3up at a smaller viewport than the default
  */
  &.cre8-c-grid--break-faster {
    @media all and (min-width:$cre8-breakpoint-md) {
      flex-direction: row;
    }
  }

  /**
  * 1 to 3up grid that breaks slower
  * 1) Grid that breaks from 1 to 3up at a larger viewport than the default
  */
  &.cre8-c-grid--break-slower {
    @media all and (min-width:$cre8-breakpoint-lg) {
      flex-direction: column;
    }
    @media all and (min-width:$cre8-breakpoint-xl) {
      flex-direction: row;
    }
  }
}

/**
 * 1 to 2 to 4up grid
 * 1) Stacked items on small screens to 2 items per row on medium screens to 4 items per row on large screens
 */
.cre8-c-grid--1-2-4up {
  @media all and (min-width:$cre8-breakpoint-sm) {
    flex-direction: row;
  }
}

/**
 * 1 to 4up grid
 * 1) Stacked items on small screens to 4 items per row on medium/large screens
 */
.cre8-c-grid--1-4up {
  @media all and (min-width:$cre8-breakpoint-md) {
    flex-direction: row;
  }
}

/**
 * 1 to 2 to 4up grid
 * 1) Stacked items on small screens to 2 items per row on small/medium screens to
 * 3 items per row on medium screens and 4 items per row on large screens
 */
.cre8-c-grid--4up {
  @media all and (min-width:$cre8-breakpoint-sm) {
    flex-direction: row;
  }
}

/**
  * Slotted grid item within 4up Grid
  */
.cre8-c-grid--2-4-6up {
  flex-direction: row;
}

/**
 * Slotted grid item
 */
::slotted(cre8-grid-item) {
  display: block;
  padding: calc(var(--size-base-unit) * 1.5);

  /**
  * Slotted grid item within grid with no gap between items
  */
  .cre8-c-grid--gap-none > & {
    padding: 0;
  }

  /**
  * Slotted grid item within grid with small gap between items
  */
  .cre8-c-grid--gap-sm > & {
    padding: calc(var(--size-base-unit) * 0.5);
  }

  /**
  * Slotted grid item within grid with large gap between items
  */
  .cre8-c-grid--gap-lg > & {
    padding: calc(var(--size-base-unit) * 2);
  }

  /**
  * Slotted grid item within side by side grid
  * 1) Grid that stays 2 items per row on all screen sizes
  */
  .cre8-c-grid--side-by-side > & {
    width: 50%;
  }

  /**
  * Slotted grid item within 2up Grid
  */
  .cre8-c-grid--2up > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 50%;
    }
  }

  /**
  * Slotted grid item within 2up break faster (small to large screens) Grid
  */
  .cre8-c-grid--2up.cre8-c-grid--break-faster > & {
    @media all and (min-width:$cre8-breakpoint-sm) {
      width: 50%;
    }
  }

  /**
  * Slotted grid item within 2up break slower (small to large screens) Grid
  */
  .cre8-c-grid--2up.cre8-c-grid--break-slower > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 100%;
    }
    @media all and (min-width:$cre8-breakpoint-xxl) {
      width: 50%;
    }
  }

  /**
  * Slotted grid item within 3up Grid
  */
  .cre8-c-grid--3up > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 50%;
    }

    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 33.3333%;
    }
  }

  /**
  * Slotted grid item within 1-3up Grid
  */
  .cre8-c-grid--1-3up > & {
    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 33.3333%;
    }
  }

  /**
  * Slotted grid item within 1 to 3up break faster (small to large screens) grid
  */
  .cre8-c-grid--1-3up.cre8-c-grid--break-faster > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 33.33%;
    }
  }

  /**
  * Slotted grid item within 2up break slower (small to large screens) Grid
  */
  .cre8-c-grid--1-3up.cre8-c-grid--break-slower > & {
    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 100%;
    }
    @media all and (min-width:$cre8-breakpoint-xl) {
      width: 33.33%;
    }
  }

  /**
  * Slotted grid item within 1-2-4up Grid
  */
  .cre8-c-grid--1-2-4up > & {
    @media all and (min-width:$cre8-breakpoint-sm) {
      width: 50%;
    }

    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 25%;
    }
  }

  /**
  * Slotted grid item within 1-2-4up Grid
  */
  .cre8-c-grid--1-4up > & {
    @media all and (min-width:$cre8-breakpoint-md) {
      width: 25%;
    }
  }

  /**
  * Slotted grid item within 4up Grid
  */
  .cre8-c-grid--4up > & {
    @media all and (min-width:$cre8-breakpoint-sm) {
      width: 50%;
    }

    @media all and (min-width:$cre8-breakpoint-md) {
      width: 33.3333%;
    }

    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 25%;
    }
  }

  /**
  * Slotted grid item within 4up Grid
  */
  .cre8-c-grid--2-4-6up > & {
    width: 50%;

    @media all and (min-width:$cre8-breakpoint-lg) {
      width: 25%;
    }

    @media all and (min-width:$cre8-breakpoint-xl) {
      width: 16.66%;
    }
  }
}
`});
