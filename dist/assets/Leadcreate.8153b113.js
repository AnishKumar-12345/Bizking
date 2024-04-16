import{_ as f,o as i,c,g as l,w as t,i as r,j as _,k as g,l as V,m as w,b as m,t as h,a as b,v as y,e as k,F as T,q as x,s as C,r as U,f as q,u as O}from"./index.30e828c4.js";import{s as P}from"./Services.add0e5e7.js";import{V as S}from"./VForm.dc36a47b.js";import{V as v}from"./VSelect.8b4c5e90.js";import{V as d}from"./VTextField.2ad1d70f.js";import{V as N}from"./VSnackbar.51026c97.js";import{V as B,a as D,b as F,c as I}from"./VWindowItem.54a78105.js";import"./index.2bd8ddc8.js";import"./VCheckboxBtn.d6439dbf.js";import"./VChip.14bf2a4d.js";const A={mixins:[P],data(){return{storearules:[s=>!!s||"Store Address is required"],locationrules:[s=>!!s||"Location is required"],storerules:[s=>!!s||"Store Name is required"],uidrules:[s=>!!s||"UID is required"],namerules:[s=>!!s||"Lead is required"],authrules:[s=>!!s||"Decision Authority is required"],namerules1:[s=>!!s||"POC name is required"],namerules2:[s=>!!s||"Owner name is required"],gstrules:[s=>!!s||"GST is required"],pinrules:[s=>!!s||"PIN Code is required",s=>s&&/^\d{6}$/.test(s)||"PIN must be 6 digits"],emailRules:[s=>!!s||"Email is required",s=>/.+@.+\..+/.test(s)||"The email must be valid with the correct format: @ and . symbols"],phonerules:[s=>!!s||" Mobile Number is required",s=>/^[0-9]+$/.test(s)||"only number are accepted",s=>s&&s.length<=10&&s.length>=10||"Mobile must be  10 number"],dialog:!1,loggedby:"",userid:"",saveLeads:{lead_type:"",name:"",address:"",pincode:"",email:"",owner_name:"",owner_phone:"",poc_name:"",poc_phone:"",gst:"",decision_authority:"",user_id:"",location:""},snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1}},mounted(){this.loggedby=localStorage.getItem("createdby"),this.userid=localStorage.getItem("user_id")},methods:{validateForm(){this.$refs.purchaseOrderForm.validate().then(s=>{s.valid==!0?this.saveLeaddata():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},saveLeaddata(){const s={POC:"poc",Owner:"owner"};console.log("set",s[this.saveLeads.decision_authority]);const a={lead_type:this.saveLeads.lead_type,name:this.saveLeads.name,address:this.saveLeads.address,email:this.saveLeads.email,pincode:this.saveLeads.pincode,owner_name:this.saveLeads.owner_name,owner_phone:this.saveLeads.owner_phone,poc_name:this.saveLeads.poc_name,poc_phone:this.saveLeads.poc_phone,gst:this.saveLeads.gst,decision_authority:s[this.saveLeads.decision_authority],user_id:this.userid,location:this.saveLeads.location};console.log("chek p",a),this.saveLead(a).then(n=>{console.log("chec",n),n.data.status==1?(this.snackbar=!0,this.snackbarText=n.data.message,this.color="primary",this.saveLeads={}):(this.snackbar=!0,this.snackbarText=n.data.message,this.color="on-background",this.saveLeads={})})},deleteRow(s){const a=this.data.indexOf(s);a!==-1&&this.data.splice(a,1)},openproductdialog(){this.dialog=!0},closeDialog(){this.dialog=!1}}},R=b("span",null,[b("strong",{color:"error"},"* "),m(" please enter owner name if there is no poc")],-1);function M(s,a,n,L,e,p){return i(),c("div",null,[l(V,null,{default:t(()=>[l(r,{cols:"12"},{default:t(()=>[l(_,{title:"Create Lead",class:"mb-4"},{default:t(()=>[l(g,null,{default:t(()=>[l(S,{class:"mt-6",ref:"purchaseOrderForm"},{default:t(()=>[l(V,null,{default:t(()=>[l(r,{md:"6",cols:"12"},{default:t(()=>[l(v,{modelValue:e.saveLeads.lead_type,"onUpdate:modelValue":a[0]||(a[0]=o=>e.saveLeads.lead_type=o),label:"Lead Type",items:["Brand","Merchant"],rules:e.namerules},null,8,["modelValue","rules"])]),_:1}),l(r,{cols:"12",md:"6"},{default:t(()=>[l(d,{modelValue:e.saveLeads.name,"onUpdate:modelValue":a[1]||(a[1]=o=>e.saveLeads.name=o),label:"Brand / Merchant name",rules:e.storerules},null,8,["modelValue","rules"])]),_:1}),l(r,{cols:"12",md:"6"},{default:t(()=>[l(d,{modelValue:e.loggedby,"onUpdate:modelValue":a[2]||(a[2]=o=>e.loggedby=o),label:"Lead Handler",readonly:""},null,8,["modelValue"])]),_:1}),l(r,{md:"6",cols:"12"},{default:t(()=>[l(d,{modelValue:e.saveLeads.address,"onUpdate:modelValue":a[3]||(a[3]=o=>e.saveLeads.address=o),rules:e.storearules,label:"Address"},null,8,["modelValue","rules"])]),_:1}),l(r,{md:"6",cols:"12"},{default:t(()=>[l(d,{modelValue:e.saveLeads.email,"onUpdate:modelValue":a[4]||(a[4]=o=>e.saveLeads.email=o),rules:e.emailRules,label:"Email"},null,8,["modelValue","rules"])]),_:1}),l(r,{md:"6",cols:"12"},{default:t(()=>[l(d,{modelValue:e.saveLeads.gst,"onUpdate:modelValue":a[5]||(a[5]=o=>e.saveLeads.gst=o),label:"GST"},null,8,["modelValue"])]),_:1}),l(r,{md:"6",cols:"12"},{default:t(()=>[l(d,{modelValue:e.saveLeads.pincode,"onUpdate:modelValue":a[6]||(a[6]=o=>e.saveLeads.pincode=o),rules:e.pinrules,label:"Area PinCode"},null,8,["modelValue","rules"])]),_:1}),l(r,{md:"6",cols:"12"},{default:t(()=>[l(d,{modelValue:e.saveLeads.location,"onUpdate:modelValue":a[7]||(a[7]=o=>e.saveLeads.location=o),label:"Location"},null,8,["modelValue"])]),_:1}),l(r,{md:"6",cols:"12"},{default:t(()=>[l(d,{modelValue:e.saveLeads.owner_name,"onUpdate:modelValue":a[8]||(a[8]=o=>e.saveLeads.owner_name=o),rules:e.namerules2,label:"Owner Name"},null,8,["modelValue","rules"])]),_:1}),l(r,{md:"6",cols:"12"},{default:t(()=>[l(d,{modelValue:e.saveLeads.owner_phone,"onUpdate:modelValue":a[9]||(a[9]=o=>e.saveLeads.owner_phone=o),rules:e.phonerules,label:"Owner Phone"},null,8,["modelValue","rules"])]),_:1}),l(r,{md:"6",cols:"12"},{default:t(()=>[l(d,{modelValue:e.saveLeads.poc_name,"onUpdate:modelValue":a[10]||(a[10]=o=>e.saveLeads.poc_name=o),rules:e.namerules1,label:"POC Name"},null,8,["modelValue","rules"]),R]),_:1}),l(r,{md:"6",cols:"12"},{default:t(()=>[l(d,{modelValue:e.saveLeads.poc_phone,"onUpdate:modelValue":a[11]||(a[11]=o=>e.saveLeads.poc_phone=o),rules:e.phonerules,label:"POC Phone"},null,8,["modelValue","rules"])]),_:1}),l(r,{md:"6",cols:"12"},{default:t(()=>[l(v,{modelValue:e.saveLeads.decision_authority,"onUpdate:modelValue":a[12]||(a[12]=o=>e.saveLeads.decision_authority=o),rules:e.authrules,label:"Decision Authority",items:["POC","Owner"]},null,8,["modelValue","rules"])]),_:1}),l(r,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[l(w,{onClick:p.validateForm},{default:t(()=>[m("Save")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),l(N,{modelValue:e.snackbar,"onUpdate:modelValue":a[13]||(a[13]=o=>e.snackbar=o),timeout:3500,color:e.color},{default:t(()=>[m(h(e.snackbarText),1)]),_:1},8,["modelValue","color"])])}const E=f(A,[["render",M]]),G={components:{Createlead:E},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Lead Basic Data",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=y(),this.activeTab=k(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function W(s,a,n,L,e,p){const o=U("Createlead");return i(),c("div",null,[l(B,{modelValue:e.activeTab,"onUpdate:modelValue":a[0]||(a[0]=u=>e.activeTab=u),"show-arrows":""},{default:t(()=>[(i(!0),c(T,null,x(e.tabs,u=>(i(),q(I,{key:u.icon,value:u.tab},{default:t(()=>[l(O,{size:"20",start:"",icon:u.icon},null,8,["icon"]),m(" "+h(u.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),l(C),l(F,{modelValue:e.activeTab,"onUpdate:modelValue":a[1]||(a[1]=u=>e.activeTab=u),class:"mt-5 disable-tab-transition",touch:!1},{default:t(()=>[l(D,{value:"account"},{default:t(()=>[l(o)]),_:1})]),_:1},8,["modelValue"])])}const ee=f(G,[["render",W]]);export{ee as default};