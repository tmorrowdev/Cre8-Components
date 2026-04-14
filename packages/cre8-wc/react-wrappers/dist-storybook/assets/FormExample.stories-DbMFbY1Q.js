import{j as e}from"./jsx-runtime-u17CrQMm.js";import{w as l}from"./decorator-CEKUKXHG.js";const t={title:"Examples/Form Example",component:"FormExample",parameters:{actions:{handles:["submit"]},status:{type:"inProgress"}},decorators:[l]},a=m=>e.jsxs(e.Fragment,{children:[e.jsx("iframe",{name:"dummyframe",id:"dummyframe",style:{display:"none"}}),e.jsxs("form",{id:"form-example",action:"#",target:"dummyframe",children:[e.jsx("cre8Field",{label:"Enter your name",name:"name",className:"cre8-u-display-block cre8-u-margin-bottom-lg"}),e.jsx("cre8Field",{label:"cre8 Team",name:"team",className:"cre8-u-display-block cre8-u-margin-bottom-lg"}),e.jsxs("cre8CheckboxField",{label:"Checkbox field",className:"cre8-u-display-block cre8-u-margin-bottom-lg",children:[e.jsx("cre8CheckboxFieldItem",{label:"Checkbox field item 1",name:"checkbox-example",value:"1"}),e.jsx("cre8CheckboxFieldItem",{label:"Checkbox field item 2",name:"checkbox-example",value:"2"}),e.jsx("cre8CheckboxFieldItem",{label:"Checkbox field item 3",name:"checkbox-example",value:"3"})]}),e.jsxs("cre8RadioField",{className:"cre8-u-display-block cre8-u-margin-bottom-lg",label:"Radio field",children:[e.jsx("cre8RadioFieldItem",{label:"On",name:"radio-example",value:"on"}),e.jsx("cre8RadioFieldItem",{label:"Off",name:"radio-example",value:"off"})]}),e.jsxs("cre8ButtonGroup",{children:[e.jsx("cre8Button",{text:"Submit",type:"submit"}),e.jsx("cre8Button",{text:"Reset",type:"reset"})]})]})]});a.__docgenInfo={description:"",methods:[],displayName:"Default"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`args => {
  return <>
    <iframe name={'dummyframe'} id={'dummyframe'} style={{
      'display': 'none'
    }}></iframe>
    <form id={'form-example'} action={'#'} target={'dummyframe'}>
      <cre8Field label={'Enter your name'} name={'name'} className={'cre8-u-display-block cre8-u-margin-bottom-lg'} />
      <cre8Field label={'cre8 Team'} name={'team'} className={'cre8-u-display-block cre8-u-margin-bottom-lg'} />
      <cre8CheckboxField label={'Checkbox field'} className={'cre8-u-display-block cre8-u-margin-bottom-lg'}>
        <cre8CheckboxFieldItem label={'Checkbox field item 1'} name={'checkbox-example'} value={'1'} />
        <cre8CheckboxFieldItem label={'Checkbox field item 2'} name={'checkbox-example'} value={'2'} />
        <cre8CheckboxFieldItem label={'Checkbox field item 3'} name={'checkbox-example'} value={'3'} />
      </cre8CheckboxField>
      <cre8RadioField className={'cre8-u-display-block cre8-u-margin-bottom-lg'} label={'Radio field'}>
        <cre8RadioFieldItem label={'On'} name={'radio-example'} value={'on'} />
        <cre8RadioFieldItem label={'Off'} name={'radio-example'} value={'off'} />
      </cre8RadioField>
      <cre8ButtonGroup>
        <cre8Button text={'Submit'} type={'submit'} />
        <cre8Button text={'Reset'} type={'reset'} />
      </cre8ButtonGroup>
    </form>
  </>;
}`,...a.parameters?.docs?.source}}};const c=["Default"];export{a as Default,c as __namedExportsOrder,t as default};
