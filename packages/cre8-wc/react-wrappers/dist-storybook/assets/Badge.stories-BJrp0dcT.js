import{c as S}from"./Cre8UtilityNavItem-B9aE8qy1.js";import{e as C}from"./iframe-L6gz3CgO.js";import"./preload-helper-PPVm8Dsz.js";const L=`<svg fill="currentColor" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5709 5.43726C15.41 5.25493 15.2121 5.10891 14.9905 5.00892C14.7688 4.90892 14.5284 4.85723 14.2852 4.85728H10.2854V3.71446C10.2854 2.95673 9.98435 2.23003 9.44855 1.69423C8.91275 1.15843 8.18605 0.857422 7.42831 0.857422C7.32216 0.857346 7.21808 0.886843 7.12775 0.942606C7.03742 0.998368 6.96441 1.07819 6.9169 1.17313L4.21842 6.57151H1.14282C0.839723 6.57151 0.549043 6.69191 0.334723 6.90623C0.120404 7.12055 0 7.41123 0 7.71432V13.9998C0 14.3029 0.120404 14.5936 0.334723 14.8079C0.549043 15.0222 0.839723 15.1426 1.14282 15.1426H13.4281C13.8457 15.1428 14.2491 14.9905 14.5623 14.7143C14.8756 14.4381 15.0773 14.057 15.1295 13.6427L15.9866 6.78579C16.017 6.54438 15.9956 6.29928 15.9239 6.06676C15.8523 5.83425 15.7319 5.61966 15.5709 5.43726ZM1.14282 7.71432H3.99986V13.9998H1.14282V7.71432ZM14.8523 6.64293L13.9952 13.4998C13.9778 13.638 13.9106 13.765 13.8062 13.857C13.7018 13.9491 13.5673 13.9999 13.4281 13.9998H5.14268V7.27791L7.76473 2.0331C8.15335 2.11087 8.50302 2.32091 8.75422 2.62746C9.00543 2.93401 9.14265 3.31814 9.14254 3.71446V5.42869C9.14254 5.58024 9.20274 5.72558 9.3099 5.83274C9.41706 5.9399 9.5624 6.0001 9.71395 6.0001H14.2852C14.3663 6.00007 14.4465 6.0173 14.5204 6.05064C14.5943 6.08399 14.6603 6.13268 14.7139 6.19348C14.7675 6.25429 14.8076 6.32581 14.8315 6.40331C14.8554 6.4808 14.8625 6.56248 14.8523 6.64293Z"/>
</svg>
`,E={title:"Cre8 Components/Badge",component:S,parameters:{status:{type:"inProgress"},controls:{exclude:new RegExp(`${C.join("|")}`)}},argTypes:{text:{control:"text"},status:{options:["neutral","error","warning","success","info","attention"],control:{type:"select"}},variant:{options:["default","light","white"],control:{type:"radio"}}}},t={args:{text:"Badge"}},r={args:{text:"Icon Variant",svg:L}},e={args:{text:"Success",status:"success"}},s={args:{text:"Warning",status:"warning"}},a={args:{text:"Error",status:"error"}},n={args:{text:"Info",status:"info"}},o={args:{text:"Attention",status:"attention"}},i={args:{text:"Light",variant:"light"}},c={args:{text:"Light",variant:"light",status:"success"}},g={args:{text:"WarningLight",variant:"light",status:"warning"}},u={args:{text:"ErrorLight",variant:"light",status:"error"}},p={args:{text:"InfoLight",variant:"light",status:"info"}},m={args:{text:"AttentionLight",variant:"light",status:"attention"}},h={args:{text:"White",variant:"white"}},d={args:{text:"SuccessWhite",variant:"white",status:"success"}},l={args:{text:"WarningWhite",variant:"white",status:"warning"}},x={args:{text:"ErrorWhite",variant:"white",status:"error"}},W={args:{text:"InfosWhite",variant:"white",status:"info"}},v={args:{text:"AttentionWhite",variant:"white",status:"attention"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Badge'
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Icon Variant',
    svg: svgFeedback
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Success',
    status: 'success'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Warning',
    status: 'warning'
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Error',
    status: 'error'
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Info',
    status: 'info'
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Attention',
    status: 'attention'
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Light',
    variant: 'light'
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'Light',
    variant: 'light',
    status: 'success'
  }
}`,...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'WarningLight',
    variant: 'light',
    status: 'warning'
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'ErrorLight',
    variant: 'light',
    status: 'error'
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'InfoLight',
    variant: 'light',
    status: 'info'
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'AttentionLight',
    variant: 'light',
    status: 'attention'
  }
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'White',
    variant: 'white'
  }
}`,...h.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'SuccessWhite',
    variant: 'white',
    status: 'success'
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'WarningWhite',
    variant: 'white',
    status: 'warning'
  }
}`,...l.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'ErrorWhite',
    variant: 'white',
    status: 'error'
  }
}`,...x.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'InfosWhite',
    variant: 'white',
    status: 'info'
  }
}`,...W.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    text: 'AttentionWhite',
    variant: 'white',
    status: 'attention'
  }
}`,...v.parameters?.docs?.source}}};const A=["Default","IconVariant","Success","Warning","Error","Info","Attention","Light","SuccessLight","WarningLight","ErrorLight","InfoLight","AttentionLight","White","SuccessWhite","WarningWhite","ErrorWhite","InfoWhite","AttentionWhite"];export{o as Attention,m as AttentionLight,v as AttentionWhite,t as Default,a as Error,u as ErrorLight,x as ErrorWhite,r as IconVariant,n as Info,p as InfoLight,W as InfoWhite,i as Light,e as Success,c as SuccessLight,d as SuccessWhite,s as Warning,g as WarningLight,l as WarningWhite,h as White,A as __namedExportsOrder,E as default};
