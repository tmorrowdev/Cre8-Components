import{j as t}from"./jsx-runtime-u17CrQMm.js";import{w as v}from"./decorator-CEKUKXHG.js";import{e as y}from"./iframe-Bg2-sd_M.js";import{P as r,h as e}from"./Cre8UtilityNavItem-BgMrWGNR.js";import{F as g}from"./Fpo-Det-PY-y.js";import"./preload-helper-PPVm8Dsz.js";const O={title:"Cre8 Components/Popover",component:r,parameters:{status:{type:"inProgress"},controls:{exclude:new RegExp(`${y.join("|")}|^isRTL$|^removeActive$|^dynamicPosition$|^addAria$|^removeActiveOnScroll$|^onOpen$|^onClose$`)},layout:"centered",actions:{handles:["open","close"]}},decorators:[v],args:{heading:"Popover Heading",children:t.jsxs(t.Fragment,{children:[t.jsx(e,{slot:"trigger",text:"Open Popover",variant:"primary"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit",t.jsx(e,{slot:"footer",variant:"secondary",text:"Button",style:{marginLeft:"auto"}})]})},argTypes:{isActive:{control:"boolean"},isActiveDynamic:{control:"boolean"},isDynamic:{control:"boolean"},isVisibleOnScroll:{control:"boolean"},position:{control:"text"}}},s={args:{}},n={args:{children:t.jsxs(t.Fragment,{children:[t.jsx(e,{slot:"trigger",text:"Open Popover",variant:"primary"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit"]})}},a={args:{children:t.jsxs(t.Fragment,{children:[t.jsx(e,{slot:"trigger",text:"Open Popover",variant:"primary"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit",t.jsx(e,{slot:"footer",variant:"primary",text:"Button",size:"sm",style:{marginLeft:"auto"}})]})}},l={args:{children:t.jsxs(t.Fragment,{children:[t.jsx(e,{slot:"trigger",text:"Open Popover",variant:"primary"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit",t.jsx(e,{slot:"footer",variant:"secondary",text:"Button",size:"sm",style:{marginLeft:"auto"}})]})}},c={args:{children:t.jsxs(t.Fragment,{children:[t.jsx(e,{slot:"trigger",text:"Open Popover",variant:"primary"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit",t.jsx(e,{slot:"footer",variant:"tertiary",text:"Button",size:"sm",style:{marginLeft:"auto"}})]})}},p={args:{position:"top"}},m={args:{position:"left"}},d={args:{position:"right"}},x=()=>t.jsxs("div",{style:{padding:"3rem",height:"100vh",width:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center",position:"relative",overflow:"hidden"},children:[t.jsx("div",{style:{display:"flex",width:"100%",alignItems:"center",justifyContent:"center"},children:t.jsxs(r,{isDynamic:!0,heading:"Popover Heading",position:"top",children:[t.jsx(e,{slot:"trigger",text:"Open Popover",variant:"primary"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit",t.jsx(e,{slot:"footer",variant:"secondary",text:"Button",style:{marginLeft:"auto"}})]})}),t.jsxs("div",{style:{display:"flex",width:"100%",alignItems:"center",justifyContent:"space-between"},children:[t.jsxs(r,{isDynamic:!0,heading:"Popover Heading",position:"left",children:[t.jsx(e,{slot:"trigger",text:"Open Popover",variant:"primary"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit",t.jsx(e,{slot:"footer",variant:"secondary",text:"Button",style:{marginLeft:"auto"}})]}),t.jsxs(r,{isDynamic:!0,heading:"Popover Heading",position:"right",children:[t.jsx(e,{slot:"trigger",text:"Open Popover",variant:"primary"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit",t.jsx(e,{slot:"footer",variant:"secondary",text:"Button",style:{marginLeft:"auto"}})]})]}),t.jsx("div",{style:{display:"flex",width:"100%",alignItems:"center",justifyContent:"center"},children:t.jsxs(r,{isDynamic:!0,heading:"Popover Heading",children:[t.jsx(e,{slot:"trigger",text:"Open Popover",variant:"primary"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit",t.jsx(e,{slot:"footer",variant:"secondary",text:"Button",style:{marginLeft:"auto"}})]})})]}),o=x.bind({});o.args={};o.parameters={layout:"fullscreen"};const h=()=>t.jsx("div",{style:{minHeight:"150vw",height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",position:"relative"},children:t.jsx("div",{style:{padding:"3rem",position:"absolute",top:"0",left:"50%",transform:"translateX(var(--rtlTranslateX, -50%))"},children:t.jsxs(r,{isVisibleOnScroll:!0,heading:"Popover Heading",children:[t.jsx(e,{slot:"trigger",text:"Open Popover",variant:"primary"}),"Lorem ipsum dolor sit amet, consectetur adipiscing elit",t.jsx(e,{slot:"footer",variant:"secondary",text:"Button",style:{marginLeft:"auto"}})]})})}),i=h.bind({});i.args={};const u={args:{heading:"",children:t.jsxs(t.Fragment,{children:[t.jsx(e,{slot:"trigger",text:"Open Popover",variant:"primary"}),t.jsx(g,{slot:"header"}),t.jsx(g,{}),t.jsx(g,{slot:"footer"})]})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
      <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </>
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
      <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
      <Cre8Button slot="footer" variant="primary" text="Button" size="sm" style={{
        marginLeft: 'auto'
      }}></Cre8Button>
    </>
  }
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
      <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
      <Cre8Button slot="footer" variant="secondary" text="Button" size="sm" style={{
        marginLeft: 'auto'
      }}></Cre8Button>
    </>
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    children: <>
      <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
      <Cre8Button slot="footer" variant="tertiary" text="Button" size="sm" style={{
        marginLeft: 'auto'
      }}></Cre8Button>
    </>
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'top'
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'left'
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    position: 'right'
  }
}`,...d.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <div style={{
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
      <Cre8Popover isDynamic={true} heading="Popover Heading" position="top">
        <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <Cre8Button slot="footer" variant="secondary" text="Button" style={{
        marginLeft: 'auto'
      }}></Cre8Button>
      </Cre8Popover>
    </div>
    <div style={{
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  }}>
      <Cre8Popover isDynamic={true} heading="Popover Heading" position="left">
        <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <Cre8Button slot="footer" variant="secondary" text="Button" style={{
        marginLeft: 'auto'
      }}></Cre8Button>
      </Cre8Popover>
      <Cre8Popover isDynamic={true} heading="Popover Heading" position="right">
        <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <Cre8Button slot="footer" variant="secondary" text="Button" style={{
        marginLeft: 'auto'
      }}></Cre8Button>
      </Cre8Popover>
    </div>
    <div style={{
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
      <Cre8Popover isDynamic={true} heading="Popover Heading">
        <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <Cre8Button slot="footer" variant="secondary" text="Button" style={{
        marginLeft: 'auto'
      }}></Cre8Button>
      </Cre8Popover>
    </div>
  </div>`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => <div style={{
  minHeight: '150vw',
  height: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
}}>
    <div style={{
    padding: '3rem',
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(var(--rtlTranslateX, -50%))'
  }}>
      <Cre8Popover isVisibleOnScroll={true} heading="Popover Heading">
        <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
        <Cre8Button slot="footer" variant="secondary" text="Button" style={{
        marginLeft: 'auto'
      }}></Cre8Button>
      </Cre8Popover>
    </div>
  </div>`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    heading: '',
    children: <>
      <Cre8Button slot="trigger" text="Open Popover" variant="primary"></Cre8Button>
      <Fpo slot="header"></Fpo>
      <Fpo></Fpo>
      <Fpo slot="footer"></Fpo>
    </>
  }
}`,...u.parameters?.docs?.source}}};const S=["Default","DefaultWithNoButton","SmallPrimaryButton","SmallSecondaryButton","SmallTertiaryButton","PositionTop","PositionLeft","PositionRight","PositionDynamic","WithVisibleOnScroll","WithSlots"];export{s as Default,n as DefaultWithNoButton,o as PositionDynamic,m as PositionLeft,d as PositionRight,p as PositionTop,a as SmallPrimaryButton,l as SmallSecondaryButton,c as SmallTertiaryButton,u as WithSlots,i as WithVisibleOnScroll,S as __namedExportsOrder,O as default};
