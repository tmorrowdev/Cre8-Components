import{j as m}from"./jsx-runtime-u17CrQMm.js";import{e as b}from"./iframe-B4BOC5dD.js";import{n as i}from"./Cre8UtilityNavItem-BQ44eNSS.js";import"./preload-helper-PPVm8Dsz.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,x={title:"Cre8 Components/CheckboxFieldItem",component:i,parameters:{status:{type:"inProgress"},controls:{exclude:new RegExp(`${b.join("|")}`)}},render:u=>m.jsx(i,{...u}),args:{name:"checkbox-name",value:"checkbox-value",onChange:d("input"),onBlur:d("blur")},argTypes:{checked:{control:"boolean"},disabled:{control:"boolean"},errorNote:{control:"text"},label:{control:"text"},successNote:{control:"text"}}},e={args:{label:"Label"}},r={args:{label:"Label",checked:!0}},s={args:{label:"Label",disabled:!0,checked:!0}},a={args:{label:"Label",required:!0,checked:!0}},o={args:{label:"Label",required:!0,isError:!0}},t={args:{label:"Label",fieldNote:"This is a field note."}},c={args:{label:"Label",fieldNote:"This is an error field note.",isError:!0,errorNote:"Short, clear error message"}},l={args:{label:"Label",fieldNote:"This is a success field note.",isSuccess:!0,successNote:"Short, clear success message"}},n={args:{label:"This could mayhaps be the longest title that has ever been put on a checkbox field ever!"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label'
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    checked: true
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    disabled: true,
    checked: true
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    required: true,
    checked: true
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    required: true,
    isError: true
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    fieldNote: 'This is a field note.'
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    fieldNote: 'This is an error field note.',
    isError: true,
    errorNote: 'Short, clear error message'
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Label',
    fieldNote: 'This is a success field note.',
    isSuccess: true,
    successNote: 'Short, clear success message'
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'This could mayhaps be the longest title that has ever been put on a checkbox field ever!'
  }
}`,...n.parameters?.docs?.source}}};const L=["Default","Preselected","Disabled","Required","RequiredError","DefaultFieldNote","ErrorFieldNote","SuccessFieldNote","LongTitle"];export{e as Default,t as DefaultFieldNote,s as Disabled,c as ErrorFieldNote,n as LongTitle,r as Preselected,a as Required,o as RequiredError,l as SuccessFieldNote,L as __namedExportsOrder,x as default};
