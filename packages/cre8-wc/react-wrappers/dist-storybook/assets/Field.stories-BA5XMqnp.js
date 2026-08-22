import{j as h}from"./jsx-runtime-u17CrQMm.js";import{s as F,p as f}from"./Cre8UtilityNavItem-BgMrWGNR.js";import{e as N}from"./iframe-Bg2-sd_M.js";import"./preload-helper-PPVm8Dsz.js";const{action:S}=__STORYBOOK_MODULE_ACTIONS__,R={title:"Cre8 Components/Field",component:F,parameters:{status:{type:"inProgress"},actions:{handles:["input","change","blur"]},controls:{exclude:new RegExp(`${N.join("|")}`)}},render:x=>h.jsx(F,{...x}),args:{placeholder:"",fieldNote:"This is a field note.",onChange:S("input"),onBlur:S("blur")}},e={args:{children:h.jsxs("div",{slot:"fieldNote",children:["Some optional help text or ",h.jsx(f,{children:"helpful link"})]})}},r={args:{label:"Email Field",type:"email"}},a={args:{label:"Number Field",type:"number"}},s={args:{label:"Url Field",type:"url"}},o={args:{label:"Telephone Field",type:"tel"}},l={args:{label:"Password Field",type:"password"}},t={args:{label:"Date Field",type:"date",value:"1969-06-28"}},n={args:{type:"date",label:"Max date should not be 2025-01-01",max:"2025-01-01",value:"2024-01-01"}},i={args:{label:"Required Field",required:!0}},d={args:{label:"Required Field with Max Length",maxlength:"10",required:!0}},c={args:{label:"Disabled Field",value:"Field value",disabled:!0}},u={args:{label:"Readonly Field",value:"Field value",readonly:!0}},p={args:{label:"Field with a Field Note",fieldNote:"This is a field note."}},m={args:{label:"Field with Error Message and Field Note",isError:!0,fieldNote:"This is a field note.",errorNote:"Short, clear error message"}},g={args:{label:"Field with Success Message",isSuccess:!0,fieldNote:"This is a field note.",successNote:"Short, clear success message"}},b={args:{label:"Field with Error Message",isError:"true",errorNote:"Short, clear error message"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div slot="fieldNote">
        Some optional help text or <Cre8TextLink>helpful link</Cre8TextLink>
      </div>
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Email Field',
    type: 'email'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Number Field',
    type: 'number'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Url Field',
    type: 'url'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Telephone Field',
    type: 'tel'
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Password Field',
    type: 'password'
  }
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Date Field',
    type: 'date',
    value: '1969-06-28'
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'date',
    label: 'Max date should not be 2025-01-01',
    max: '2025-01-01',
    value: '2024-01-01'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Required Field',
    required: true
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Required Field with Max Length',
    maxlength: '10',
    required: true
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Field',
    value: 'Field value',
    disabled: true
  }
}`,...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Readonly Field',
    value: 'Field value',
    readonly: true
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Field with a Field Note',
    fieldNote: 'This is a field note.'
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Field with Error Message and Field Note',
    isError: true,
    fieldNote: 'This is a field note.',
    errorNote: 'Short, clear error message'
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Field with Success Message',
    isSuccess: true,
    fieldNote: 'This is a field note.',
    successNote: 'Short, clear success message'
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Field with Error Message',
    isError: 'true',
    errorNote: 'Short, clear error message'
  }
}`,...b.parameters?.docs?.source}}};const T=["Default","Email","Number","Url","Tel","Password","Date","MaxDate","Required","RequiredMaxlength","Disabled","ReadOnly","Fieldnote","Error","Success","SingleMessage"];export{t as Date,e as Default,c as Disabled,r as Email,m as Error,p as Fieldnote,n as MaxDate,a as Number,l as Password,u as ReadOnly,i as Required,d as RequiredMaxlength,b as SingleMessage,g as Success,o as Tel,s as Url,T as __namedExportsOrder,R as default};
