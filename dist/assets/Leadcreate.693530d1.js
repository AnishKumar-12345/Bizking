import{_ as b,o as n,c as m,g as a,w as t,i as r,j as _,k as L,l as p,m as g,b as i,t as f,a as V,v as y,e as w,F as k,q as T,s as x,r as C,f as U,u as q}from"./index.e2aae198.js";import{s as S}from"./Services.fded68ed.js";import{V as O}from"./VForm.2eb7376c.js";import{V as d}from"./VTextField.e0cf5325.js";import{V as N}from"./VSelect.6cf16e7e.js";import{V as P}from"./VSnackbar.6637c2b7.js";import{V as F,a as B,b as D,c as I}from"./VWindowItem.75ebe5c9.js";import"./index.2bd8ddc8.js";import"./VCheckboxBtn.96077063.js";import"./VChip.90dec6b0.js";const A={mixins:[S],data(){return{storearules:[e=>!!e||"Store Address is required"],locationrules:[e=>!!e||"Location is required"],storerules:[e=>!!e||"Store Name is required"],uidrules:[e=>!!e||"UID is required"],namerules:[e=>!!e||"Lead is required"],authrules:[e=>!!e||"Decision Authority is required"],namerules1:[e=>!!e||"POC name is required"],namerules2:[e=>!!e||"Owner name is required"],gstrules:[e=>!!e||"GST is required"],pinrules:[e=>!!e||"PIN Code is required",e=>e&&/^\d{6}$/.test(e)||"PIN must be 6 digits"],emailRules:[e=>!!e||"Email is required",e=>/.+@.+\..+/.test(e)||"The email must be valid with the correct format: @ and . symbols"],phonerules:[e=>!!e||" Mobile Number is required",e=>/^[0-9]+$/.test(e)||"only number are accepted",e=>e&&e.length<=10&&e.length>=10||"Mobile must be  10 number"],dialog:!1,loggedby:"",userid:"",saveLeads:{lead_type:"Brand",name:"",address:"",pincode:"",owner_name:"",owner_phone:"",poc_name:"",poc_phone:"",gst:"",decision_authority:"",user_id:"",location:""},snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1}},mounted(){this.loggedby=localStorage.getItem("createdby"),this.userid=localStorage.getItem("user_id")},methods:{validateForm(){this.$refs.purchaseOrderForm.validate().then(e=>{e.valid==!0?this.saveLeaddata():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},saveLeaddata(){const e={lead_type:this.saveLeads.lead_type,name:this.saveLeads.name,address:this.saveLeads.address,pincode:this.saveLeads.pincode,owner_name:this.saveLeads.owner_name,owner_phone:this.saveLeads.owner_phone,poc_name:this.saveLeads.poc_name,poc_phone:this.saveLeads.poc_phone,gst:this.saveLeads.gst,decision_authority:this.saveLeads.decision_authority,user_id:this.userid,location:this.saveLeads.location};console.log("chek p",e),this.saveLead(e).then(l=>{console.log("chec",l),l.data.status==1?(this.snackbar=!0,this.snackbarText=l.data.message,this.color="primary",this.saveLeads={}):(this.snackbar=!0,this.snackbarText=l.data.message,this.color="on-background",this.saveLeads={})})},deleteRow(e){const l=this.data.indexOf(e);l!==-1&&this.data.splice(l,1)},openproductdialog(){this.dialog=!0},closeDialog(){this.dialog=!1}}},R=V("span",null,[V("strong",{color:"error"},"* "),i(" please enter owner name if there is no poc")],-1);function E(e,l,v,h,s,c){return n(),m("div",null,[a(p,null,{default:t(()=>[a(r,{cols:"12"},{default:t(()=>[a(_,{title:"Create Lead",class:"mb-4"},{default:t(()=>[a(L,null,{default:t(()=>[a(O,{class:"mt-6",ref:"purchaseOrderForm"},{default:t(()=>[a(p,null,{default:t(()=>[a(r,{md:"6",cols:"12"},{default:t(()=>[a(d,{modelValue:s.saveLeads.lead_type,"onUpdate:modelValue":l[0]||(l[0]=o=>s.saveLeads.lead_type=o),label:"Lead Type",readonly:"",rules:s.namerules},null,8,["modelValue","rules"])]),_:1}),a(r,{cols:"12",md:"6"},{default:t(()=>[a(d,{modelValue:s.saveLeads.name,"onUpdate:modelValue":l[1]||(l[1]=o=>s.saveLeads.name=o),label:"Store Name",rules:s.storerules},null,8,["modelValue","rules"])]),_:1}),a(r,{cols:"12",md:"6"},{default:t(()=>[a(d,{modelValue:s.loggedby,"onUpdate:modelValue":l[2]||(l[2]=o=>s.loggedby=o),label:"Lead Handler",readonly:""},null,8,["modelValue"])]),_:1}),a(r,{md:"6",cols:"12"},{default:t(()=>[a(d,{modelValue:s.saveLeads.address,"onUpdate:modelValue":l[3]||(l[3]=o=>s.saveLeads.address=o),rules:s.storearules,label:"Store Address"},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:t(()=>[a(d,{modelValue:s.saveLeads.gst,"onUpdate:modelValue":l[4]||(l[4]=o=>s.saveLeads.gst=o),label:"GST"},null,8,["modelValue"])]),_:1}),a(r,{md:"6",cols:"12"},{default:t(()=>[a(d,{modelValue:s.saveLeads.pincode,"onUpdate:modelValue":l[5]||(l[5]=o=>s.saveLeads.pincode=o),rules:s.pinrules,label:"Area PinCode"},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:t(()=>[a(d,{modelValue:s.saveLeads.owner_name,"onUpdate:modelValue":l[6]||(l[6]=o=>s.saveLeads.owner_name=o),rules:s.namerules2,label:"Owner Name"},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:t(()=>[a(d,{modelValue:s.saveLeads.owner_phone,"onUpdate:modelValue":l[7]||(l[7]=o=>s.saveLeads.owner_phone=o),rules:s.phonerules,label:"Owner Phone"},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:t(()=>[a(d,{modelValue:s.saveLeads.poc_name,"onUpdate:modelValue":l[8]||(l[8]=o=>s.saveLeads.poc_name=o),rules:s.namerules1,label:"POC Name"},null,8,["modelValue","rules"]),R]),_:1}),a(r,{md:"6",cols:"12"},{default:t(()=>[a(d,{modelValue:s.saveLeads.poc_phone,"onUpdate:modelValue":l[9]||(l[9]=o=>s.saveLeads.poc_phone=o),rules:s.phonerules,label:"POC Phone"},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:t(()=>[a(N,{modelValue:s.saveLeads.decision_authority,"onUpdate:modelValue":l[10]||(l[10]=o=>s.saveLeads.decision_authority=o),rules:s.authrules,label:"Decision Authority",items:["POC","Owner"]},null,8,["modelValue","rules"])]),_:1}),a(r,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[a(g,{onClick:c.validateForm},{default:t(()=>[i("Save")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),a(P,{modelValue:s.snackbar,"onUpdate:modelValue":l[11]||(l[11]=o=>s.snackbar=o),timeout:3500,color:s.color},{default:t(()=>[i(f(s.snackbarText),1)]),_:1},8,["modelValue","color"])])}const G=b(A,[["render",E]]),M={components:{Createlead:G},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Lead Basic Data",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=y(),this.activeTab=w(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function W(e,l,v,h,s,c){const o=C("Createlead");return n(),m("div",null,[a(F,{modelValue:s.activeTab,"onUpdate:modelValue":l[0]||(l[0]=u=>s.activeTab=u),"show-arrows":""},{default:t(()=>[(n(!0),m(k,null,T(s.tabs,u=>(n(),U(I,{key:u.icon,value:u.tab},{default:t(()=>[a(q,{size:"20",start:"",icon:u.icon},null,8,["icon"]),i(" "+f(u.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),a(x),a(D,{modelValue:s.activeTab,"onUpdate:modelValue":l[1]||(l[1]=u=>s.activeTab=u),class:"mt-5 disable-tab-transition",touch:!1},{default:t(()=>[a(B,{value:"account"},{default:t(()=>[a(o)]),_:1})]),_:1},8,["modelValue"])])}const ee=b(M,[["render",W]]);export{ee as default};