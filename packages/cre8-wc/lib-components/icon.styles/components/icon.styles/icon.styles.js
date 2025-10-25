(function(u,y){typeof exports=="object"&&typeof module<"u"?module.exports=y():typeof define=="function"&&define.amd?define(y):(u=typeof globalThis<"u"?globalThis:u||self,u.Icon=u.Icon||{},u.Icon.styles=y())})(this,function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ot;const u=globalThis,y=u.ShadowRoot&&(u.ShadyCSS===void 0||u.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),W=new WeakMap;let q=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(y&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=W.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&W.set(e,t))}return t}toString(){return this.cssText}};const at=n=>new q(typeof n=="string"?n:n+"",void 0,z),ht=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new q(e,n,z)},lt=(n,t)=>{if(y)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=u.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},J=y?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return at(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ct,defineProperty:dt,getOwnPropertyDescriptor:pt,getOwnPropertyNames:ut,getOwnPropertySymbols:$t,getPrototypeOf:ft}=Object,f=globalThis,K=f.trustedTypes,_t=K?K.emptyScript:"",j=f.reactiveElementPolyfillSupport,C=(n,t)=>n,D={toAttribute(n,t){switch(t){case Boolean:n=n?_t:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},X=(n,t)=>!ct(n,t),Y={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:X};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);class S extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&dt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=pt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){const h=i==null?void 0:i.call(this);o==null||o.call(this,r),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Y}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;const t=ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){const e=this.properties,s=[...ut(e),...$t(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(J(i))}else t!==void 0&&e.push(J(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var o;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const r=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:D).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){var o,r;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const h=s.getPropertyOptions(i),a=typeof h.converter=="function"?{fromAttribute:h.converter}:((o=h.converter)==null?void 0:o.fromAttribute)!==void 0?h.converter:D;this._$Em=i,this[i]=a.fromAttribute(e,h.type)??((r=this._$Ej)==null?void 0:r.get(i))??null,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const o=this.constructor,r=this[t];if(s??(s=o.getPropertyOptions(t)),!((s.hasChanged??X)(r,e)||s.useDefault&&s.reflect&&r===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,r]of i){const{wrapped:h}=r,a=this[o];h!==!0||this._$AL.has(o)||a===void 0||this.C(o,void 0,r,a)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}}S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[C("elementProperties")]=new Map,S[C("finalized")]=new Map,j==null||j({ReactiveElement:S}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=globalThis,M=x.trustedTypes,Z=M?M.createPolicy("lit-html",{createHTML:n=>n}):void 0,F="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,G="?"+_,mt=`<${G}>`,A=document,P=()=>A.createComment(""),U=n=>n===null||typeof n!="object"&&typeof n!="function",I=Array.isArray,yt=n=>I(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",L=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Q=/-->/g,tt=/>/g,g=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),et=/'/g,st=/"/g,it=/^(?:script|style|textarea|title)$/i,b=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),nt=new WeakMap,v=A.createTreeWalker(A,129);function rt(n,t){if(!I(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Z!==void 0?Z.createHTML(t):t}const At=(n,t)=>{const e=n.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",r=O;for(let h=0;h<e;h++){const a=n[h];let d,p,l=-1,$=0;for(;$<a.length&&(r.lastIndex=$,p=r.exec(a),p!==null);)$=r.lastIndex,r===O?p[1]==="!--"?r=Q:p[1]!==void 0?r=tt:p[2]!==void 0?(it.test(p[2])&&(i=RegExp("</"+p[2],"g")),r=g):p[3]!==void 0&&(r=g):r===g?p[0]===">"?(r=i??O,l=-1):p[1]===void 0?l=-2:(l=r.lastIndex-p[2].length,d=p[1],r=p[3]===void 0?g:p[3]==='"'?st:et):r===st||r===et?r=g:r===Q||r===tt?r=O:(r=g,i=void 0);const m=r===g&&n[h+1].startsWith("/>")?" ":"";o+=r===O?a+mt:l>=0?(s.push(d),a.slice(0,l)+F+a.slice(l)+_+m):a+_+(l===-2?h:m)}return[rt(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class H{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const h=t.length-1,a=this.parts,[d,p]=At(t,e);if(this.el=H.createElement(d,s),v.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=v.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(F)){const $=p[r++],m=i.getAttribute(l).split(_),k=/([.?@])?(.*)/.exec($);a.push({type:1,index:o,name:k[2],strings:m,ctor:k[1]==="."?vt:k[1]==="?"?Et:k[1]==="@"?St:N}),i.removeAttribute(l)}else l.startsWith(_)&&(a.push({type:6,index:o}),i.removeAttribute(l));if(it.test(i.tagName)){const l=i.textContent.split(_),$=l.length-1;if($>0){i.textContent=M?M.emptyScript:"";for(let m=0;m<$;m++)i.append(l[m],P()),v.nextNode(),a.push({type:2,index:++o});i.append(l[$],P())}}}else if(i.nodeType===8)if(i.data===G)a.push({type:2,index:o});else{let l=-1;for(;(l=i.data.indexOf(_,l+1))!==-1;)a.push({type:7,index:o}),l+=_.length-1}o++}}static createElement(t,e){const s=A.createElement("template");return s.innerHTML=t,s}}function w(n,t,e=n,s){var r,h;if(t===b)return t;let i=s!==void 0?(r=e._$Co)==null?void 0:r[s]:e._$Cl;const o=U(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((h=i==null?void 0:i._$AO)==null||h.call(i,!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=w(n,i._$AS(n,t.values),i,s)),t}class gt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??A).importNode(e,!0);v.currentNode=i;let o=v.nextNode(),r=0,h=0,a=s[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new T(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new bt(o,this,t)),this._$AV.push(d),a=s[++h]}r!==(a==null?void 0:a.index)&&(o=v.nextNode(),r++)}return v.currentNode=A,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class T{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),U(t)?t===c||t==null||t===""?(this._$AH!==c&&this._$AR(),this._$AH=c):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):yt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==c&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=H.createElement(rt(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(e);else{const r=new gt(i,this),h=r.u(this.options);r.p(e),this.T(h),this._$AH=r}}_$AC(t){let e=nt.get(t.strings);return e===void 0&&nt.set(t.strings,e=new H(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new T(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class N{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=c}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(o===void 0)t=w(this,t,e,0),r=!U(t)||t!==this._$AH&&t!==b,r&&(this._$AH=t);else{const h=t;let a,d;for(t=o[0],a=0;a<o.length-1;a++)d=w(this,h[s+a],e,a),d===b&&(d=this._$AH[a]),r||(r=!U(d)||d!==this._$AH[a]),d===c?t=c:t!==c&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}r&&!i&&this.j(t)}j(t){t===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class vt extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===c?void 0:t}}class Et extends N{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==c)}}class St extends N{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??c)===b)return;const s=this._$AH,i=t===c&&s!==c||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==c&&(s===c||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class bt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const B=x.litHtmlPolyfillSupport;B==null||B(H,T),(x.litHtmlVersions??(x.litHtmlVersions=[])).push("3.3.0");const wt=(n,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const o=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new T(t.insertBefore(P(),o),o,void 0,e??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E=globalThis;class R extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return b}}R._$litElement$=!0,R.finalized=!0,(ot=E.litElementHydrateSupport)==null||ot.call(E,{LitElement:R});const V=E.litElementPolyfillSupport;return V==null||V({LitElement:R}),(E.litElementVersions??(E.litElementVersions=[])).push("4.2.0"),ht`@import '../../design-tokens/core/scss/theming/component';


/**
 * 1) Graphic used to supplement text or represent functionality
 */

:host{
  display: flex;
  --cre8-u-icon-display: block;
};

.cre8-c-icon-wrapper {
  align-items: var(--cre8-u-icon-align-items);
  justify-content: var(--cre8-u-icon-justify-content);
  animation: var(--cre8-loading-animation, --cre8-icon-animation, none);
  margin: var(--cre8-icon-margin, 0);
}

.cre8-c-icon {
  height: var(--cre8-icon-height, calc(var(--size-base-unit) * 2));
  width: var(--cre8-icon-width, calc(var(--size-base-unit) * 2));
  fill: var(--cre8-icon-fill, currentColor);
}  
// stylelint-disable selector-no-qualifying-type, max-nesting-depth
cre8-icon {
    display: inline-flex;
    vertical-align: middle;

    &[spin] {
        @media (prefers-reduced-motion) {
            &:not([spin='false']) {
                // stylelint-disable-next-line declaration-no-important
                animation-duration: 6400ms !important;
            }
        }
        
        &:not([spin='false']) {
            animation-duration: 2000ms;
            animation-iteration-count: infinite;
            animation-name: spin;
            animation-timing-function: linear;
        }
    }

    &[pulse] {
        @media (prefers-reduced-motion) {
            &:not([pulse='false']) {
                svg {
                    * {
                        // stylelint-disable-next-line declaration-no-important
                        animation-duration: 3s !important;
                        animation-timing-function: linear;
                    }
                }
            }
        }

        &:not([pulse='false']) {
            svg {
                * {
                    animation: pulse 1.5s ease-in-out infinite;
                }
            }
        }
    }

    &[flip='vertical'] {
        transform: scaleY(-1);
    }
    
    &[flip='horizontal'] {
        transform: scaleX(-1);
    }
    
    &[flip='both'] {
        transform: scaleX(-1) scaleY(-1);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
  
    100% {
        opacity: 1;
    }
}
`});
