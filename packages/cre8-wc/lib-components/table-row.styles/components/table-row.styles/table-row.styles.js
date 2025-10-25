(function(u,m){typeof exports=="object"&&typeof module<"u"?module.exports=m():typeof define=="function"&&define.amd?define(m):(u=typeof globalThis<"u"?globalThis:u||self,u.TableRow=u.TableRow||{},u.TableRow.styles=m())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var nt;const u=globalThis,m=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),V=new WeakMap;let q=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(m&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=V.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&V.set(e,t))}return t}toString(){return this.cssText}};const ht=r=>new q(typeof r=="string"?r:r+"",void 0,D),at=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new q(e,r,D)},lt=(r,t)=>{if(m)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=u.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},J=m?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ht(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ct,defineProperty:dt,getOwnPropertyDescriptor:pt,getOwnPropertyNames:ut,getOwnPropertySymbols:$t,getPrototypeOf:_t}=Object,_=globalThis,K=_.trustedTypes,ft=K?K.emptyScript:"",L=_.reactiveElementPolyfillSupport,x=(r,t)=>r,B={toAttribute(r,t){switch(t){case Boolean:r=r?ft:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},Z=(r,t)=>!ct(r,t),F={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:Z};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),_.litPropertyMetadata??(_.litPropertyMetadata=new WeakMap);class w extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=F){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&dt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=pt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const a=i==null?void 0:i.call(this);n==null||n.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??F}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=_t(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const e=this.properties,s=[...ut(e),...$t(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(J(i))}else t!==void 0&&e.push(J(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const o=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:B).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var n,o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const a=s.getPropertyOptions(i),h=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:B;this._$Em=i,this[i]=h.fromAttribute(e,a.type)??((o=this._$Ej)==null?void 0:o.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,o=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??Z)(o,e)||s.useDefault&&s.reflect&&o===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,o]of i){const{wrapped:a}=o,h=this[n];a!==!0||this._$AL.has(n)||h===void 0||this.C(n,void 0,o,h)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}}w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[x("elementProperties")]=new Map,w[x("finalized")]=new Map,L==null||L({ReactiveElement:w}),(_.reactiveElementVersions??(_.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C=globalThis,R=C.trustedTypes,G=R?R.createPolicy("lit-html",{createHTML:r=>r}):void 0,Q="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,X="?"+f,bt=`<${X}>`,A=document,P=()=>A.createComment(""),T=r=>r===null||typeof r!="object"&&typeof r!="function",z=Array.isArray,mt=r=>z(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",I=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,tt=/>/g,y=RegExp(`>|${I}(?:([^\\s"'>=/]+)(${I}*=${I}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),et=/'/g,st=/"/g,it=/^(?:script|style|textarea|title)$/i,E=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),rt=new WeakMap,g=A.createTreeWalker(A,129);function ot(r,t){if(!z(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return G!==void 0?G.createHTML(t):t}const At=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=U;for(let a=0;a<e;a++){const h=r[a];let d,p,l=-1,$=0;for(;$<h.length&&(o.lastIndex=$,p=o.exec(h),p!==null);)$=o.lastIndex,o===U?p[1]==="!--"?o=Y:p[1]!==void 0?o=tt:p[2]!==void 0?(it.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=y):p[3]!==void 0&&(o=y):o===y?p[0]===">"?(o=i??U,l=-1):p[1]===void 0?l=-2:(l=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?y:p[3]==='"'?st:et):o===st||o===et?o=y:o===Y||o===tt?o=U:(o=y,i=void 0);const b=o===y&&r[a+1].startsWith("/>")?" ":"";n+=o===U?h+bt:l>=0?(s.push(d),h.slice(0,l)+Q+h.slice(l)+f+b):h+f+(l===-2?a:b)}return[ot(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class O{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const a=t.length-1,h=this.parts,[d,p]=At(t,e);if(this.el=O.createElement(d,s),g.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=g.nextNode())!==null&&h.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(Q)){const $=p[o++],b=i.getAttribute(l).split(f),N=/([.?@])?(.*)/.exec($);h.push({type:1,index:n,name:N[2],strings:b,ctor:N[1]==="."?gt:N[1]==="?"?vt:N[1]==="@"?wt:M}),i.removeAttribute(l)}else l.startsWith(f)&&(h.push({type:6,index:n}),i.removeAttribute(l));if(it.test(i.tagName)){const l=i.textContent.split(f),$=l.length-1;if($>0){i.textContent=R?R.emptyScript:"";for(let b=0;b<$;b++)i.append(l[b],P()),g.nextNode(),h.push({type:2,index:++n});i.append(l[$],P())}}}else if(i.nodeType===8)if(i.data===X)h.push({type:2,index:n});else{let l=-1;for(;(l=i.data.indexOf(f,l+1))!==-1;)h.push({type:7,index:n}),l+=f.length-1}n++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function S(r,t,e=r,s){var o,a;if(t===E)return t;let i=s!==void 0?(o=e._$Co)==null?void 0:o[s]:e._$Cl;const n=T(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((a=i==null?void 0:i._$AO)==null||a.call(i,!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=S(r,i._$AS(r,t.values),i,s)),t}class yt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??A).importNode(e,!0);g.currentNode=i;let n=g.nextNode(),o=0,a=0,h=s[0];for(;h!==void 0;){if(o===h.index){let d;h.type===2?d=new H(n,n.nextSibling,this,t):h.type===1?d=new h.ctor(n,h.name,h.strings,this,t):h.type===6&&(d=new Et(n,this,t)),this._$AV.push(d),h=s[++a]}o!==(h==null?void 0:h.index)&&(n=g.nextNode(),o++)}return g.currentNode=A,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class H{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),T(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):mt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=O.createElement(ot(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const o=new yt(i,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(t){let e=rt.get(t.strings);return e===void 0&&rt.set(t.strings,e=new O(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new H(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=S(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{const a=t;let h,d;for(t=n[0],h=0;h<n.length-1;h++)d=S(this,a[s+h],e,h),d===E&&(d=this._$AH[h]),o||(o=!T(d)||d!==this._$AH[h]),d===c?t=c:t!==c&&(t+=(d??"")+n[h+1]),this._$AH[h]=d}o&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class gt extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class vt extends M{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class wt extends M{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??c)===E)return;const s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Et{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const j=C.litHtmlPolyfillSupport;j==null||j(O,H),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.3.0");const St=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new H(t.insertBefore(P(),n),n,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=globalThis;class k extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=St(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return E}}k._$litElement$=!0,k.finalized=!0,(nt=v.litElementHydrateSupport)==null||nt.call(v,{LitElement:k});const W=v.litElementPolyfillSupport;return W==null||W({LitElement:k}),(v.litElementVersions??(v.litElementVersions=[])).push("4.2.0"),at`
@import '../../design-tokens/core/scss/theming/component';

/*------------------------------------*\
#TABLE ROW
\*------------------------------------*/

/**
* Set the host to display the contents within the table header or table body wrapper
*/
:host {
    display: contents;
}

/**
* 1) Row of the cre8 table
*/
.cre8-c-table__row {
    display: var(--cre8-table-row-display, table-row);
    border-bottom: var(--cre8-table-row-border-bottom);

    /**
    * Table row hover state
    * 1) Set the row hover background via custom property to allow
    * the table variant to control the color
    */
    &:hover {
        background: var(--cre8-table-row-hover-background);
    }

    /**
    * Table row within odd cre8-table-row wrappers
    * 1) Set the odd row and odd row hover background via
    * custom property to allow the table variant to control the color
    */
    :host(:nth-child(odd)) & {
        background: var(--cre8-table-row-odd-background, none);

        &:hover {
            background: var(--cre8-table-row-odd-hover-background, inherit);
        }
    }

    @media all and (min-width:$cre8-breakpoint-md) {
        border-bottom: inherit;
        display: table-row;
    }
}

/**
 * Bare variant to remove border
 */
.cre8-c-table__row--bare {
    --cre8-table-cell-border-bottom-color: transparent;
}

/**
* Slotted table row in expanded content following expandable table row
* 1) Don't show the collapsed table row by default
*/
.cre8-c-table__row--expandable + ::slotted(cre8-table-row) {
    display: none; /* 1 */
}

.cre8-c-table__row--expandable.cre8-is-expanded {
    --cre8-table-cell-border-bottom-color: transparent;
}

/**
* Slotted table row in expanded content following expanded table row class
* 1) Display contents to get the proper table-row display for the row
*/
.cre8-c-table__row--expandable.cre8-is-expanded + ::slotted(cre8-table-row) {
    display: contents; /* 1 */
}

/**
* Button that expands the next table row
*/
.cre8-c-table__expand-button {
    background-color: var(--cre8-color-bg-transparent);
    border-width: var(--cre8-border-width-none);
}

/**
* Text within the button that expands the next table row
*/
.cre8-c-table__expand-button-text {
    @include visuallyHidden;
}

/**
* Icon within the button that expands the next table row
*/
.cre8-c-table__expand-button-icon {
    display: block;
    transition: transform 0.2s ease;

    /**
    * Icon within the button that expands the next table row when the table row is expanded
    * 1) Rotate the icon to show that it's open
    */
    .cre8-is-expanded & {
        transform: rotate(90deg); /* 1 */
    }
}
`});
