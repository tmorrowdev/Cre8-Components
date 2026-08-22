import{j as n}from"./jsx-runtime-u17CrQMm.js";import{o as c,p as u}from"./Cre8UtilityNavItem-BgMrWGNR.js";import{e as p}from"./iframe-Bg2-sd_M.js";import"./preload-helper-PPVm8Dsz.js";const{action:i}=__STORYBOOK_MODULE_ACTIONS__,f={title:"Cre8 Components/DatePicker",component:c,parameters:{status:{type:"inProgress"},actions:{handles:["input","change","blur"]},controls:{exclude:new RegExp(`${p.join("|")}`)},docs:{story:{height:"600px"}}},render:d=>n.jsx(c,{...d}),args:{placeholder:"",fieldNote:"This is a field note.",onChange:i("input"),onBlur:i("blur")}},e={args:{label:"Example Date Picker",children:n.jsxs("div",{slot:"fieldNote",children:["Some optional help text or ",n.jsx(u,{children:"helpful link"})]})}},r={args:{hasShortcuts:"true"}},s={args:{label:"Disabled Example",value:"2024-05-15",disabled:!0}},a={args:{label:"Readonly Example",value:"2024-05-15",readonly:!0}},o={args:{label:"Fieldnote Example",fieldNote:"This is a field note."}},t={args:{label:"Error Fieldnote Example",isError:!0,fieldNote:"This is a field note.",errorNote:"Short, clear error message"}},l={args:{label:"Success Fieldnote Example",isSuccess:!0,fieldNote:"This is a field note.",successNote:"Short, clear success message"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Example Date Picker',
    children: <div slot="fieldNote">
        Some optional help text or <Cre8TextLink>helpful link</Cre8TextLink>
      </div>
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    hasShortcuts: "true"
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Example',
    value: '2024-05-15',
    disabled: true
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Readonly Example',
    value: '2024-05-15',
    readonly: true
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Fieldnote Example',
    fieldNote: 'This is a field note.'
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Error Fieldnote Example',
    isError: true,
    fieldNote: 'This is a field note.',
    errorNote: 'Short, clear error message'
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Success Fieldnote Example',
    isSuccess: true,
    fieldNote: 'This is a field note.',
    successNote: 'Short, clear success message'
  }
}`,...l.parameters?.docs?.source}}};const S=["Default","DefaultWithShortcuts","Disabled","ReadOnly","Fieldnote","Error","Success"];export{e as Default,r as DefaultWithShortcuts,s as Disabled,t as Error,o as Fieldnote,a as ReadOnly,l as Success,S as __namedExportsOrder,f as default};
