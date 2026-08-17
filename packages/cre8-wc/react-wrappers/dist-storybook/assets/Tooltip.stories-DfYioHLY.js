import{j as e}from"./jsx-runtime-u17CrQMm.js";import{e as l}from"./iframe-DSttf7_M.js";import{w as d}from"./decorator-CEKUKXHG.js";import{ad as o}from"./Cre8UtilityNavItem-CfsHDylY.js";import"./preload-helper-PPVm8Dsz.js";const h={title:"Cre8 Components/Tooltip",component:o,parameters:{status:{type:"inProgress"},controls:{exclude:new RegExp(`${l.join("|")}`)},layout:"centered",actions:{handles:["open","close"]}},decorators:[d],args:{children:e.jsx(e.Fragment,{children:"Lorem ipsum dolor sit amet, sed do eiusmod tempor reallyreallylongwordthatshouldbreaktomakethetextwindownotoverflow"})},argTypes:{ariaDescribes:{control:"text"},dynamicPosition:{table:{disable:!0}},isActive:{table:{disable:!0}},isActiveDynamic:{table:{disable:!0}},isDynamic:{control:"boolean"},isRTL:{table:{disable:!0}},knockout:{control:"boolean"},linkText:{table:{disable:!0}},linkURL:{table:{disable:!0}},onTooltipClose:{table:{disable:!0}},onTooltipOpen:{table:{disable:!0}},position:{options:["default","top","right","left"]},removeActive:{table:{disable:!0}},toggleActive:{table:{disable:!0}}}},i={args:{}},s={args:{knockout:!0}},r={args:{position:"top"}},a={args:{position:"left"}},n={args:{position:"right"}},m=()=>e.jsxs("div",{style:{padding:"3rem",height:"100vh",width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center",position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{display:"flex",width:"100%",alignItems:"center",justifyContent:"center"},children:e.jsx(o,{isDynamic:!0,position:"top",children:"Lorem ipsum dolor sit amet, sed do eiusmod tempor"})}),e.jsxs("div",{style:{display:"flex",width:"100%",alignItems:"center",justifyContent:"space-between"},children:[e.jsx(o,{isDynamic:!0,position:"right",children:"Lorem ipsum dolor sit amet, sed do eiusmod tempor"}),e.jsx(o,{isDynamic:!0,position:"left",children:"Lorem ipsum dolor sit amet, sed do eiusmod tempor"})]}),e.jsx("div",{style:{display:"flex",width:"100%",alignItems:"center",justifyContent:"center"},children:e.jsx(o,{isDynamic:!0,children:"Lorem ipsum dolor sit amet, sed do eiusmod tempor"})})]}),t=m.bind({});t.args={};t.parameters={layout:"fullscreen"};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    knockout: true
  }
}`,...s.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'top'
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'left'
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'right'
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <div style={{
  padding: '3rem',
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden'
}}>
    <div style={{
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
      <Cre8Tooltip isDynamic={true} position="top">
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </Cre8Tooltip>
    </div>
    <div style={{
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}>
      <Cre8Tooltip isDynamic={true} position="right">
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </Cre8Tooltip>
      <Cre8Tooltip isDynamic={true} position="left">
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </Cre8Tooltip>
    </div>
    <div style={{
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
      <Cre8Tooltip isDynamic={true}>
        Lorem ipsum dolor sit amet, sed do eiusmod tempor
      </Cre8Tooltip>
    </div>
  </div>`,...t.parameters?.docs?.source}}};const f=["Default","Knockout","PositionTop","PositionLeft","PositionRight","PositionDynamic"];export{i as Default,s as Knockout,t as PositionDynamic,a as PositionLeft,n as PositionRight,r as PositionTop,f as __namedExportsOrder,h as default};
