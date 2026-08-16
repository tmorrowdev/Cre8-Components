import{j as l}from"./jsx-runtime-u17CrQMm.js";import{w as c}from"./decorator-CEKUKXHG.js";import{W as u,g as m}from"./Cre8UtilityNavItem-B9aE8qy1.js";import{e as d}from"./iframe-L6gz3CgO.js";import"./preload-helper-PPVm8Dsz.js";const g=[{label:"Option Item 1",value:"option-item-1"},{label:"Option Item 2",value:"option-item-2"},{label:"Option Item 3",value:"option-item-3"},{label:"Option Item 4",value:"option-item-4"},{label:"Option Item 5",value:"option-item-5"},{label:"Option Item 6",value:"option-item-6"}],h=[{optGroupLabel:"Option Group 1",options:[{label:"Option Group Item 1",value:"option-group-item-1"},{label:"Option Group Item 2",value:"option-group-item-2"},{label:"Option Group Item 3",value:"option-group-item-3"}]},{optGroupLabel:"Option Group 2",options:[{label:"Option Group Item 4",value:"option-group-item-4"},{label:"Option Group Item 5",value:"option-group-item-5"},{label:"Option Group Item 6",value:"option-group-item-6"}]},{optGroupLabel:"Option Group 3",options:[{label:"Option Group Item 7",value:"option-group-item-7"},{label:"Option Group Item 8",value:"option-group-item-8"},{label:"Option Group Item 9",value:"option-group-item-9"}]}],O={title:"Cre8 Components/Select",component:u,parameters:{status:{type:"inProgress"},actions:{handles:["change"]},controls:{exclude:new RegExp(`${d.join("|")}|^formResetCallback$|^onChange$|^type$|^value$`)}},decorators:[c],args:{id:"selectId",name:"selectName",items:g}},o={},r={args:{disabled:!0}},t={args:{value:"option-item-1"}},s={args:{children:l.jsxs("div",{slot:"fieldNote",children:["Some optional help text or ",l.jsx(m,{href:"#",children:"helpful link"})]})}},a={args:{isError:!0,errorNote:"Short, clear error message"}},i={args:{isSuccess:!0,successNote:"Short, clear success message"}},n={args:{fieldNote:"This is a field note.",isError:!0,errorNote:"Short, clear error message"}},p={args:{fieldNote:"This is a field note.",isSuccess:!0,successNote:"Short, clear success message"}},e={args:{items:h}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'option-item-1'
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: <div slot="fieldNote">Some optional help text or <Cre8Link href="#">helpful link</Cre8Link></div>
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isError: true,
    errorNote: 'Short, clear error message'
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    isSuccess: true,
    successNote: 'Short, clear success message'
  }
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    fieldNote: "This is a field note.",
    isError: true,
    errorNote: 'Short, clear error message'
  }
}`,...n.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    fieldNote: "This is a field note.",
    isSuccess: true,
    successNote: 'Short, clear success message'
  }
}`,...p.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    items: optionGroupItems
  }
}`,...e.parameters?.docs?.source},description:{story:`If you have a longer list of options, group related options together.
Grouping by type allows users to select their preference more quickly.

To create an option group, create a new item object within your \`items\` array
which contains an \`optGrouplabel\` for the group name and an \`options\` array of items for the group.

\`\`\`
{
  optGroupLabel: 'Option Group',
  options: [
    { label: 'Option Group Item 1', value: 'option-group-item-1' },
    { label: 'Option Group Item 2', value: 'option-group-item-2' },
    { label: 'Option Group Item 3', value: 'option-group-item-3' },
  ],
}
\`\`\``,...e.parameters?.docs?.description}}};const I=["Default","Disabled","Preselected","FieldNote","Error","Success","FieldnoteAndError","FieldNoteAndSuccess","OptionGroup"];export{o as Default,r as Disabled,a as Error,s as FieldNote,p as FieldNoteAndSuccess,n as FieldnoteAndError,e as OptionGroup,t as Preselected,i as Success,I as __namedExportsOrder,O as default};
