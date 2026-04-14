import{j as d}from"./jsx-runtime-u17CrQMm.js";import{e as b}from"./iframe-B4BOC5dD.js";import{X as u,Y as g}from"./Cre8UtilityNavItem-BQ44eNSS.js";import"./preload-helper-PPVm8Dsz.js";const{action:m}=__STORYBOOK_MODULE_ACTIONS__,E={title:"Cre8 Components/Radio-Field Item",component:u,parameters:{status:{type:"inProgress"},controls:{exclude:new RegExp(`${b.join("|")}`)}},render:p=>d.jsx(g,{children:d.jsx(u,{...p})}),args:{name:"radio-name",value:"radio-value",onChange:m("input"),onBlur:m("blur")}},e={args:{label:"Label"}},r={args:{label:"Label",checked:!0}},a={args:{label:"Label",checked:!0,required:!0}},s={args:{label:"Label",isError:!0,required:!0}},o={args:{label:"Label",checked:!0,isError:!0}},t={args:{label:"Label",checked:!0,disabled:!0}},l={args:{label:"Label",fieldNote:"This is a field note.",ariaDescribedBy:"fieldnote-message"}},n={args:{label:"Label",fieldNote:"This is a field note.",fieldNoteIconName:"check",isSuccess:!0,ariaDescribedBy:"success-fieldnote-message"}},c={args:{label:"Label",fieldNote:"This is an error field note.",fieldNoteIconName:"error",isError:!0,ariaDescribedBy:"error-fieldnote-message"}},i={args:{label:"This could mayhaps be the longest title that has ever been put on a radio field ever!"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    checked: true
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    checked: true,
    required: true
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    isError: true,
    required: true
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    checked: true,
    isError: true
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    checked: true,
    disabled: true
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    fieldNote: 'This is a field note.',
    ariaDescribedBy: 'fieldnote-message'
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    fieldNote: 'This is a field note.',
    fieldNoteIconName: 'check',
    isSuccess: true,
    ariaDescribedBy: 'success-fieldnote-message'
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    fieldNote: 'This is an error field note.',
    fieldNoteIconName: 'error',
    isError: true,
    ariaDescribedBy: 'error-fieldnote-message'
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'This could mayhaps be the longest title that has ever been put on a radio field ever!'
  }
}`,...i.parameters?.docs?.source}}};const S=["Default","Preselected","Required","RequiredError","Error","Disabled","DefaultFieldNote","SuccessFieldNote","ErrorFieldNote","LongTitle"];export{e as Default,l as DefaultFieldNote,t as Disabled,o as Error,c as ErrorFieldNote,i as LongTitle,r as Preselected,a as Required,s as RequiredError,n as SuccessFieldNote,S as __namedExportsOrder,E as default};
