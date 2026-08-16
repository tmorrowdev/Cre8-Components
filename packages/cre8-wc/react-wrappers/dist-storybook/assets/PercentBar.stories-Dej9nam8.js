import{e as o}from"./iframe-jAoHLLDH.js";import{aj as c}from"./Cre8UtilityNavItem-Bu1_f51d.js";import"./preload-helper-PPVm8Dsz.js";const{action:m}=__STORYBOOK_MODULE_ACTIONS__,l={title:"In Development/Percent Bar",component:c,parameters:{status:{type:"inProgress"},controls:{exclude:new RegExp(`${o.join("|")}`)}},argTypes:{max:{control:"number"},value:{control:"number"}},args:{onPercentBarLeftActionClick:m("percent-bar-left-action-click")}},e={args:{value:"2",max:"10"}},r={args:{value:"1",max:"10"}},a={args:{value:"1",max:"3"}},s={args:{value:"5",max:"10"}},t={args:{value:"10",max:"10"}},n={args:{value:"2",max:"10",disableActionLeft:!0}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2',
    max: '10'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    value: '1',
    max: '10'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    value: '1',
    max: '3'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    value: '5',
    max: '10'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    value: '10',
    max: '10'
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2',
    max: '10',
    disableActionLeft: true
  }
}`,...n.parameters?.docs?.source}}};const d=["Default","tenPercent","thirtyThreePercent","fiftyPercent","oneHundredPercent","noActionLeft"];export{e as Default,d as __namedExportsOrder,l as default,s as fiftyPercent,n as noActionLeft,t as oneHundredPercent,r as tenPercent,a as thirtyThreePercent};
