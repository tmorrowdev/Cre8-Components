import{j as e}from"./jsx-runtime-u17CrQMm.js";import{e as c,R as l}from"./iframe-DntsRVPF.js";import{T as r,U as i}from"./Cre8UtilityNavItem-DgWw0PJl.js";import"./preload-helper-PPVm8Dsz.js";const f={title:"Cre8 Components/Radio-Field",component:i,subcomponents:{Cre8RadioFieldItem:r},render:d=>e.jsx(i,{...d}),parameters:{status:{type:"inProgress"},controls:{exclude:new RegExp(`${c.join("|")}`)}},args:{ariaDescribedBy:void 0,fieldNote:void 0,fieldNoteIconName:void 0,fieldNoteKnockout:void 0,isError:void 0,isSuccess:void 0,label:"Legend"}},s={args:{fieldNote:"This is a field note.",children:e.jsxs(l.Fragment,{children:[e.jsx(r,{label:"Default"}),e.jsx(r,{label:"Default 2"}),e.jsx(r,{label:"Error",isError:!0})]})}},a={args:{fieldNote:"Error Field Note!",fieldNoteIconName:"error",isError:!0,children:e.jsxs(l.Fragment,{children:[e.jsx(r,{label:"Default"}),e.jsx(r,{label:"Error",isError:!0}),e.jsx(r,{label:"Disabled",disabled:!0})]})}},o={args:{fieldNote:"Success Field Note!",fieldNoteIconName:"success",isSuccess:!0,children:e.jsxs(l.Fragment,{children:[e.jsx(r,{label:"Default"}),e.jsx(r,{label:"Error",isError:!0}),e.jsx(r,{label:"Disabled",disabled:!0})]})}},t={args:{fieldNote:"Success Field Note!",fieldNoteIconName:"success",isSuccess:!0,children:e.jsxs(l.Fragment,{children:[e.jsx(r,{label:"Default"}),e.jsx(r,{label:"Error",isError:!0}),e.jsx(r,{label:"Success",checked:!0})]})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    fieldNote: 'This is a field note.',
    children: <React.Fragment>
                <Cre8RadioFieldItem label="Default" />
                <Cre8RadioFieldItem label="Default 2" />
                <Cre8RadioFieldItem label="Error" isError />
            </React.Fragment>
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    fieldNote: 'Error Field Note!',
    fieldNoteIconName: 'error',
    isError: true,
    children: <React.Fragment>
                <Cre8RadioFieldItem label="Default" />
                <Cre8RadioFieldItem label="Error" isError />
                <Cre8RadioFieldItem label="Disabled" disabled />
            </React.Fragment>
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    fieldNote: 'Success Field Note!',
    fieldNoteIconName: 'success',
    isSuccess: true,
    children: <React.Fragment>
                <Cre8RadioFieldItem label="Default" />
                <Cre8RadioFieldItem label="Error" isError />
                <Cre8RadioFieldItem label="Disabled" disabled />
            </React.Fragment>
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    fieldNote: 'Success Field Note!',
    fieldNoteIconName: 'success',
    isSuccess: true,
    children: <React.Fragment>
                <Cre8RadioFieldItem label="Default" />
                <Cre8RadioFieldItem label="Error" isError />
                <Cre8RadioFieldItem label="Success" checked={true} />
            </React.Fragment>
  }
}`,...t.parameters?.docs?.source}}};const N=["Default","WithErrorFieldNote","WithSuccessFieldNote","WithSuccessFieldNoteAndDefaultChecked"];export{s as Default,a as WithErrorFieldNote,o as WithSuccessFieldNote,t as WithSuccessFieldNoteAndDefaultChecked,N as __namedExportsOrder,f as default};
