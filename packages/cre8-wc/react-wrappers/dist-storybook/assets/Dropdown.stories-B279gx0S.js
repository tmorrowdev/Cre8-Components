import{j as e}from"./jsx-runtime-u17CrQMm.js";import{Z as c,_ as r}from"./Cre8UtilityNavItem-QDhzibIf.js";import{e as l}from"./iframe-Dw2Cn1fl.js";import"./preload-helper-PPVm8Dsz.js";const{action:i}=__STORYBOOK_MODULE_ACTIONS__,C={title:"IN DEVELOPMENT/Dropdown",component:c,parameters:{status:{type:"inProgress"},controls:{exclude:new RegExp(`${l.join("|")}`)},docs:{story:{height:"200px"}}},render:o=>e.jsx(c,{...o}),args:{buttonText:"Select",onDropdownItemSelect:i("dropdown-item-select")}},n={args:{children:e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2 Item with longer text than default"}),e.jsx(r,{children:"Item 3"})]})}},d={args:{buttonText:"Button Dropdown",children:e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"}),e.jsx(r,{children:"Item 4"})]})}},m={args:{buttonText:"Dropdown Scroll",maxHeight:"100px",children:e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"}),e.jsx(r,{children:"Item 4"}),e.jsx(r,{children:"Item 5"}),e.jsx(r,{children:"Item 6"})]})}},s={args:{buttonText:"Link Dropdown",dropdownWithLink:!0,children:e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"}),e.jsx(r,{children:"Item 4"})]})}},p={args:{buttonText:"Dropdown Scroll",dropdownWithLink:!0,maxHeight:"100px",children:e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"}),e.jsx(r,{children:"Item 4"}),e.jsx(r,{children:"Item 5"}),e.jsx(r,{children:"Item 6"})]})}},t={args:{onDropdownItemSelect:o=>{const a=o.currentTarget,I=o.target;console.log("dropdown-item-select",o,a.dropdownContent,I.ariaLabel)},children:e.jsxs(e.Fragment,{children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2 Item with longer text than default"}),e.jsx(r,{children:"Item 3"})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2 Item with longer text than default</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
    </>
  }
}`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    buttonText: 'Button Dropdown',
    children: <>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
      <Cre8DropdownItem>Item 4</Cre8DropdownItem>
    </>
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    buttonText: 'Dropdown Scroll',
    maxHeight: '100px',
    children: <>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
      <Cre8DropdownItem>Item 4</Cre8DropdownItem>
      <Cre8DropdownItem>Item 5</Cre8DropdownItem>
      <Cre8DropdownItem>Item 6</Cre8DropdownItem>
    </>
  }
}`,...m.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    buttonText: 'Link Dropdown',
    dropdownWithLink: true,
    children: <>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
      <Cre8DropdownItem>Item 4</Cre8DropdownItem>
    </>
  }
}`,...s.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    buttonText: 'Dropdown Scroll',
    dropdownWithLink: true,
    maxHeight: '100px',
    children: <>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
      <Cre8DropdownItem>Item 4</Cre8DropdownItem>
      <Cre8DropdownItem>Item 5</Cre8DropdownItem>
      <Cre8DropdownItem>Item 6</Cre8DropdownItem>
    </>
  }
}`,...p.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    onDropdownItemSelect: e => {
      const dropdownElement = e.currentTarget;
      const dropdownItemElement = e.target;
      console.log('dropdown-item-select', e, dropdownElement.dropdownContent, dropdownItemElement.ariaLabel);
    },
    children: <>
      <Cre8DropdownItem>Item 1</Cre8DropdownItem>
      <Cre8DropdownItem>Item 2 Item with longer text than default</Cre8DropdownItem>
      <Cre8DropdownItem>Item 3</Cre8DropdownItem>
    </>
  }
}`,...t.parameters?.docs?.source},description:{story:`A callback event will be triggered upon selecting an item from the dropdown.
Please check the console log for output of callback for this example.`,...t.parameters?.docs?.description}}};const u=["Default","DropdownButton","DropdownButtonWithScrollBar","DropdownLink","DropdownLinkWithScrollBar","DropdownItemSelected"];export{n as Default,d as DropdownButton,m as DropdownButtonWithScrollBar,t as DropdownItemSelected,s as DropdownLink,p as DropdownLinkWithScrollBar,u as __namedExportsOrder,C as default};
