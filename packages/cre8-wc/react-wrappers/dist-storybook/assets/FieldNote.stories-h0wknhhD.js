import{j as e}from"./jsx-runtime-u17CrQMm.js";import{t as l,p as o}from"./Cre8UtilityNavItem-BQ44eNSS.js";import{e as d}from"./iframe-B4BOC5dD.js";import"./preload-helper-PPVm8Dsz.js";const u={title:"Cre8 Components/Field Note",render:c=>e.jsx(l,{...c,children:c.children}),component:l,parameters:{status:{type:"inProgress"},controls:{exclude:new RegExp(`${d.join("|")}`)}},args:{children:void 0,isError:void 0,isSuccess:void 0},argTypes:{iconName:{control:"text"},isError:{control:"boolean"},isSuccess:{control:"boolean"}}},r={args:{children:"This is a field note."}},s={args:{children:e.jsxs(e.Fragment,{children:[e.jsx(o,{href:"https://www.cre8.com",children:"Helpful link"})," at the beginning of a field note"]})}},n={args:{children:e.jsxs(e.Fragment,{children:["This is a field note with a ",e.jsx(o,{href:"https://www.cre8.com",children:"helpful link"})," in the middle of content"]})}},i={args:{children:e.jsxs(e.Fragment,{children:["This is a field note with an ending ",e.jsx(o,{href:"https://www.cre8.com",children:"helpful link"})]})}},t={args:{isError:!0,children:"This is a field note with an error state."}},a={args:{isSuccess:!0,children:"This is a field note with an success state."}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'This is a field note.'
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
      <Cre8TextLink href="https://www.cre8.com">Helpful link</Cre8TextLink> at the beginning of a field note
    </>
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
      This is a field note with a <Cre8TextLink href="https://www.cre8.com">helpful link</Cre8TextLink> in the middle of content
    </>
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
      This is a field note with an ending <Cre8TextLink href="https://www.cre8.com">helpful link</Cre8TextLink>
    </>
  }
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    isError: true,
    children: 'This is a field note with an error state.'
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    isSuccess: true,
    children: 'This is a field note with an success state.'
  }
}`,...a.parameters?.docs?.source}}};const f=["Default","BeginningLink","MiddleLink","EndingLink","Error","Success"];export{s as BeginningLink,r as Default,i as EndingLink,t as Error,n as MiddleLink,a as Success,f as __namedExportsOrder,u as default};
