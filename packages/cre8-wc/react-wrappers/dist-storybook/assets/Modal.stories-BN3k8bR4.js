import{j as e}from"./jsx-runtime-u17CrQMm.js";import{e as h}from"./iframe-Bg2-sd_M.js";import{L as n,l as c}from"./Cre8UtilityNavItem-BgMrWGNR.js";import{F as o}from"./Fpo-Det-PY-y.js";import"./preload-helper-PPVm8Dsz.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,F={title:"Cre8 Components/Modal",component:n,parameters:{status:{type:"inProgress"},controls:{exclude:new RegExp(`${h.join("|")}`)},docs:{story:{inline:!1,height:"300px"}}},render:u=>e.jsx(n,{...u}),args:{onModalClose:p("modal-close")}},r={args:{isActive:!0,ariaLabel:"This text describes modal to screen reader when focused on",children:e.jsxs(e.Fragment,{children:[e.jsx(c,{type:"title-large",slot:"header",children:"Modal Heading"}),e.jsx(o,{children:"Modal Body"}),e.jsx("div",{slot:"footer",children:e.jsx(o,{children:" Modal footer "})})]})}},s={args:{isActive:!0,notDismissible:!0,ariaLabel:"This text describes modal to screen reader when focused on",children:e.jsxs(e.Fragment,{children:[e.jsx(c,{type:"title-large",slot:"header",children:"Modal Heading"}),e.jsx(o,{children:"Modal Body"}),e.jsx("div",{slot:"footer",children:e.jsx(o,{children:" Modal footer "})})]})}},a={args:{status:"error",isActive:!0,ariaLabel:"This text describes modal to screen reader when focused on",utilityModalTitle:"Modal Heading",children:e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Modal Body"}),e.jsx("div",{slot:"footer",children:e.jsx(o,{children:" Modal footer "})})]})}},t={args:{status:"warning",isActive:!0,ariaLabel:"This text describes modal to screen reader when focused on",utilityModalTitle:"Modal Heading",children:e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Modal Body"}),e.jsx("div",{slot:"footer",children:e.jsx(o,{children:" Modal footer "})})]})}},d={args:{status:"success",isActive:!0,ariaLabel:"This text describes modal to screen reader when focused on",utilityModalTitle:"Modal Heading",children:e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Modal Body"}),e.jsx("div",{slot:"footer",children:e.jsx(o,{children:" Modal footer "})})]})}},i={args:{status:"info",isActive:!0,ariaLabel:"This text describes modal to screen reader when focused on",utilityModalTitle:"Modal Heading",children:e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Modal Body"}),e.jsx("div",{slot:"footer",children:e.jsx(o,{children:"Modal footer"})})," "]})}},l={args:{status:"help",isActive:!0,ariaLabel:"This text describes modal to screen reader when focused on",utilityModalTitle:"Modal Heading",children:e.jsxs(e.Fragment,{children:[e.jsx(o,{children:"Modal Body"}),e.jsx("div",{slot:"footer",children:e.jsx(o,{children:"Modal footer"})})," "]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    isActive: true,
    ariaLabel: "This text describes modal to screen reader when focused on",
    children: <>
    <Cre8Heading type="title-large" slot="header">Modal Heading</Cre8Heading>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo> Modal footer </Fpo>
    </div>
  </>
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    isActive: true,
    notDismissible: true,
    ariaLabel: "This text describes modal to screen reader when focused on",
    children: <>
    <Cre8Heading type="title-large" slot="header">Modal Heading</Cre8Heading>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo> Modal footer </Fpo>
    </div>
  </>
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'error',
    isActive: true,
    ariaLabel: "This text describes modal to screen reader when focused on",
    utilityModalTitle: 'Modal Heading',
    children: <>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo> Modal footer </Fpo>
    </div>
  </>
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'warning',
    isActive: true,
    ariaLabel: "This text describes modal to screen reader when focused on",
    utilityModalTitle: 'Modal Heading',
    children: <>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo> Modal footer </Fpo>
    </div>
  </>
  }
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'success',
    isActive: true,
    ariaLabel: "This text describes modal to screen reader when focused on",
    utilityModalTitle: 'Modal Heading',
    children: <>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo> Modal footer </Fpo>
    </div>
  </>
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'info',
    isActive: true,
    ariaLabel: "This text describes modal to screen reader when focused on",
    utilityModalTitle: 'Modal Heading',
    children: <>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo>Modal footer</Fpo>

 </div> </>
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    status: 'help',
    isActive: true,
    ariaLabel: "This text describes modal to screen reader when focused on",
    utilityModalTitle: 'Modal Heading',
    children: <>
    <Fpo>Modal Body</Fpo>
    <div slot="footer">
    <Fpo>Modal footer</Fpo>

 </div> </>
  }
}`,...l.parameters?.docs?.source}}};const v=["Default","NotDismissible","Error","Warning","Success","Info","Help"];export{r as Default,a as Error,l as Help,i as Info,s as NotDismissible,d as Success,t as Warning,v as __namedExportsOrder,F as default};
