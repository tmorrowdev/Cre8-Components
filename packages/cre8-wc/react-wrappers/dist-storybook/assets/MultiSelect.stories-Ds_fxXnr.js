import{j as l}from"./jsx-runtime-u17CrQMm.js";import{e as n}from"./iframe-Bcl3ePWD.js";import{ai as i}from"./Cre8TertiaryNavItem-CsHMwJvg.js";import{w as d}from"./decorator-CEKUKXHG.js";import"./preload-helper-PPVm8Dsz.js";const D={title:"In Development/MultiSelect",component:i,parameters:{status:{type:"inProgress"},controls:{exclude:new RegExp(`${n.join("|")}`)},actions:{handles:["multi-select-change"]},docs:{story:{height:"350px"}},decorators:[d]},render:m=>l.jsx(i,{...m}),args:{id:"selectId",label:"Choose you favorite food:",items:["Bagel","Burger","Boat","Beefstick","Bacon"]}},r={args:{}},e=m=>l.jsx("div",{style:{width:"320px"},children:l.jsx(i,{items:["Bagel","Burger","Boat","Beefstick","Bacon"],label:"Wrapping"})}),s={args:{label:"PreSelected",items:["Car","Crumbs","Coco","Creampuff","Clock"],preselectedItems:["Car","Crumbs"]}},a={args:{disabled:!0,label:"Disabled"}},t={args:{disabled:!0,label:"Disabled",preselectedItems:["Brisket"]}},o={args:{errorNote:"Short, clear error message.",isError:!0,label:"Error",items:["Doll","Dice","Doctor","Dinger","Derby"]}},c={args:{isSuccess:!0,successNote:"Short, clear success message",label:"Success",items:["Emu","Eggplant","Envy","Essence"],preselectedItems:["Eevee"]}};e.__docgenInfo={description:"",methods:[],displayName:"Wrapping"};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`args => <div style={{
  width: '320px'
}}>
    <Cre8MultiSelect items={['Bagel', 'Burger', 'Boat', 'Beefstick', 'Bacon']} label="Wrapping"></Cre8MultiSelect>
  </div>`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'PreSelected',
    items: ['Car', 'Crumbs', 'Coco', 'Creampuff', 'Clock'],
    preselectedItems: ['Car', 'Crumbs']
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    label: 'Disabled'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    label: 'Disabled',
    preselectedItems: ['Brisket']
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    errorNote: "Short, clear error message.",
    isError: true,
    label: 'Error',
    items: ['Doll', 'Dice', 'Doctor', 'Dinger', 'Derby']
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    isSuccess: true,
    successNote: "Short, clear success message",
    label: 'Success',
    items: ['Emu', 'Eggplant', 'Envy', 'Essence'],
    preselectedItems: ['Eevee']
  }
}`,...c.parameters?.docs?.source}}};const E=["Default","Wrapping","PreSelected","Disabled","DisabledWithTags","Error","Success"];export{r as Default,a as Disabled,t as DisabledWithTags,o as Error,s as PreSelected,c as Success,e as Wrapping,E as __namedExportsOrder,D as default};
