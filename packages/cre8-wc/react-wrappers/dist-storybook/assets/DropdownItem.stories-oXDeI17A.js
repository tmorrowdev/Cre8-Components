import{j as e}from"./jsx-runtime-u17CrQMm.js";import{_ as t,Z as n}from"./Cre8UtilityNavItem-DgWw0PJl.js";import{e as s}from"./iframe-DntsRVPF.js";import"./preload-helper-PPVm8Dsz.js";const{action:m}=__STORYBOOK_MODULE_ACTIONS__,i={title:"IN DEVELOPMENT/DropdownItem",component:t,parameters:{status:{type:"inProgress"},controls:{exclude:new RegExp(`${s.join("|")}`)}},render:o=>e.jsx(n,{...o}),args:{buttonText:"Select",onDropdownItemSelect:m("dropdown-item-select")}},r={args:{children:e.jsxs(e.Fragment,{children:[e.jsx(t,{children:"Item 1"}),e.jsx(t,{children:"Item 2 Item with longer text than default"}),e.jsx(t,{children:"Item 3"})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
        <Cre8DropdownItem>Item 1</Cre8DropdownItem>
        <Cre8DropdownItem>Item 2 Item with longer text than default</Cre8DropdownItem>
        <Cre8DropdownItem>Item 3</Cre8DropdownItem>
      </>
  }
}`,...r.parameters?.docs?.source}}};const l=["Default"];export{r as Default,l as __namedExportsOrder,i as default};
