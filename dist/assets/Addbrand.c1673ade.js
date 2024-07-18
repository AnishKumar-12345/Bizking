import{_,o as u,c,g as l,w as s,i as o,j as B,k as f,l as b,m as h,b as m,t as v,v as g,e as y,F as k,q as w,s as x,r as q,f as T,u as U}from"./index.42f55023.js";import{s as C}from"./Services.f692740f.js";import{V as A}from"./VForm.777a4687.js";import{V as N}from"./VAutocomplete.65639584.js";import{V as d}from"./VTextField.e1a88779.js";import{V as F}from"./VSnackbar.91cdaf81.js";import{V as O,a as P,b as S,c as I}from"./VWindowItem.4c69d9f4.js";import"./VSelect.63c3a47b.js";import"./VCheckboxBtn.99960a28.js";import"./VChip.19dc4ade.js";const L={mixins:[C],data(){return{cityLoaction:[],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,salesdata:[],locationsdata:[],userid:"",dialog:!1,saveBrand:{brand_name:"",area_pincode:"",gst:"",poc_name:"",poc_phone:"",owner_name:"",owner_phone:"",location:"",address:"",status:"",brand_connect:"",brand_category:"",email_id:"",created_by:"",bk_brand_poc:"",city_id:"",location_id:""},storerules:[a=>!!a||"Store Address is required"],uidrules:[a=>!!a||"UID is required"],namerules:[a=>!!a||"Name is required"],BrandBKrules:[a=>!!a||"Brand POC From BK is required"],namerules1:[a=>!!a||"Name is required",a=>/^[a-z A-Z]+$/.test(a)||"Only letters are allowed in the name"],gstrules:[a=>!!a||"GST is required"],locationrules:[a=>!!a||"City Name is required"],locationrules2:[a=>!!a||"City Location Name is required"],pinrules:[a=>!!a||"PIN is required",a=>a&&/^\d{6}$/.test(a)||"PIN must be 6 digits"],emailRules:[a=>!!a||"Email is required",a=>/.+@.+\..+/.test(a)||"The email must be valid with the correct format: @ and . symbols"],phonerules:[a=>!!a||" Mobile  is required",a=>/^[0-9]+$/.test(a)||"only number are accepted",a=>a&&a.length<=10&&a.length>=10||"Mobile must be  10 number"]}},mounted(){this.userid=localStorage.getItem("user_id"),this.getBranchnames()},methods:{handleBrandSelection(a){console.log("check hjandle",a),this.getCitylocation(a).then(e=>{this.cityLoaction=e.data.data.map(i=>({value:i.location_id,text:i.location}))})},getBranchnames(){this.Locationdata().then(a=>{this.locationsdata=a.data.data.map(e=>({value:e.city_id,text:e.city})),console.log("ceck tye res",this.locationsdata)})},validateForm(){this.$refs.purchaseOrderForm.validate().then(a=>{a.valid==!0?this.saveMerchants():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},saveMerchants(){const a={brand_name:this.saveBrand.brand_name,area_pincode:this.saveBrand.area_pincode,gst:this.saveBrand.gst,poc_name:this.saveBrand.poc_name,poc_phone:this.saveBrand.poc_phone,owner_name:this.saveBrand.owner_name,owner_phone:this.saveBrand.owner_phone,location:this.saveBrand.location,address:this.saveBrand.address,brand_connect:this.saveBrand.brand_connect,brand_category:this.saveBrand.brand_category,email_id:this.saveBrand.email_id,created_by:this.userid,bk_brand_poc:this.saveBrand.bk_brand_poc,city_id:this.saveBrand.city_id,location_id:this.saveBrand.location_id};this.Addbranddata(a).then(e=>{console.log("resp",e),e.data.status==1?(this.snackbarText=e.data.message,this.color="primary",this.snackbar=!0,this.saveBrand={}):(this.snackbarText=e.data.message,this.color="on-background",this.snackbar=!0)})},deleteRow(a){const e=this.data.indexOf(a);e!==-1&&this.data.splice(e,1)},openproductdialog(){this.dialog=!0},closeDialog(){this.dialog=!1}}};function R(a,e,i,V,r,p){return u(),c("div",null,[l(b,null,{default:s(()=>[l(o,{cols:"12"},{default:s(()=>[l(B,{title:"Add Brand",class:"mb-4"},{default:s(()=>[l(f,null,{default:s(()=>[l(A,{class:"mt-6",ref:"purchaseOrderForm"},{default:s(()=>[l(b,null,{default:s(()=>[l(o,{cols:"12",md:"6"},{default:s(()=>[l(N,{modelValue:this.saveBrand.city_id,"onUpdate:modelValue":e[0]||(e[0]=t=>this.saveBrand.city_id=t),label:"City Names",items:r.locationsdata,"item-title":"text","item-value":"value",rules:r.locationrules,required:"","menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),l(o,{cols:"12",md:"6"},{default:s(()=>[l(d,{modelValue:this.saveBrand.brand_name,"onUpdate:modelValue":e[1]||(e[1]=t=>this.saveBrand.brand_name=t),label:"Brand Name",rules:r.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),l(o,{cols:"12",md:"6"},{default:s(()=>[l(d,{modelValue:this.saveBrand.email_id,"onUpdate:modelValue":e[2]||(e[2]=t=>this.saveBrand.email_id=t),label:"Email Id",rules:r.emailRules,required:""},null,8,["modelValue","rules"])]),_:1}),l(o,{md:"6",cols:"12"},{default:s(()=>[l(d,{modelValue:this.saveBrand.gst,"onUpdate:modelValue":e[3]||(e[3]=t=>this.saveBrand.gst=t),label:"GST",rules:r.gstrules,required:""},null,8,["modelValue","rules"])]),_:1}),l(o,{md:"6",cols:"12"},{default:s(()=>[l(d,{modelValue:this.saveBrand.area_pincode,"onUpdate:modelValue":e[4]||(e[4]=t=>this.saveBrand.area_pincode=t),label:"Area Pincode",rules:r.pinrules,type:"number",required:""},null,8,["modelValue","rules"])]),_:1}),l(o,{md:"6",cols:"12"},{default:s(()=>[l(d,{modelValue:this.saveBrand.owner_name,"onUpdate:modelValue":e[5]||(e[5]=t=>this.saveBrand.owner_name=t),type:"text",label:"Owner Name",rules:r.namerules1,required:""},null,8,["modelValue","rules"])]),_:1}),l(o,{md:"6",cols:"12"},{default:s(()=>[l(d,{modelValue:this.saveBrand.owner_phone,"onUpdate:modelValue":e[6]||(e[6]=t=>this.saveBrand.owner_phone=t),label:"Owner Phone",rules:r.phonerules,required:""},null,8,["modelValue","rules"])]),_:1}),l(o,{md:"6",cols:"12"},{default:s(()=>[l(d,{modelValue:this.saveBrand.poc_name,"onUpdate:modelValue":e[7]||(e[7]=t=>this.saveBrand.poc_name=t),label:"POC Name",rules:r.namerules1,required:""},null,8,["modelValue","rules"])]),_:1}),l(o,{md:"6",cols:"12"},{default:s(()=>[l(d,{modelValue:this.saveBrand.poc_phone,"onUpdate:modelValue":e[8]||(e[8]=t=>this.saveBrand.poc_phone=t),label:"POC Phone",rules:r.phonerules,required:""},null,8,["modelValue","rules"])]),_:1}),l(o,{md:"6",cols:"12"},{default:s(()=>[l(d,{modelValue:this.saveBrand.location,"onUpdate:modelValue":e[9]||(e[9]=t=>this.saveBrand.location=t),label:"Location"},null,8,["modelValue"])]),_:1}),l(o,{md:"6",cols:"12"},{default:s(()=>[l(d,{modelValue:this.saveBrand.brand_connect,"onUpdate:modelValue":e[10]||(e[10]=t=>this.saveBrand.brand_connect=t),label:"Brand Connect"},null,8,["modelValue"])]),_:1}),l(o,{md:"6",cols:"12"},{default:s(()=>[l(d,{modelValue:this.saveBrand.brand_category,"onUpdate:modelValue":e[11]||(e[11]=t=>this.saveBrand.brand_category=t),label:"Brand Category"},null,8,["modelValue"])]),_:1}),l(o,{md:"6",cols:"12"},{default:s(()=>[l(d,{modelValue:this.saveBrand.address,"onUpdate:modelValue":e[12]||(e[12]=t=>this.saveBrand.address=t),label:"Brand Address",rules:r.storerules},null,8,["modelValue","rules"])]),_:1}),l(o,{md:"6",cols:"12"},{default:s(()=>[l(d,{modelValue:this.saveBrand.bk_brand_poc,"onUpdate:modelValue":e[13]||(e[13]=t=>this.saveBrand.bk_brand_poc=t),label:"Brand POC From BK",rules:r.BrandBKrules},null,8,["modelValue","rules"])]),_:1}),l(o,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:s(()=>[l(h,{onClick:e[14]||(e[14]=t=>p.validateForm())},{default:s(()=>[m("Save")]),_:1}),l(h,{color:"secondary",variant:"tonal",type:"reset"},{default:s(()=>[m(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),l(F,{modelValue:r.snackbar,"onUpdate:modelValue":e[15]||(e[15]=t=>r.snackbar=t),timeout:3500,color:r.color},{default:s(()=>[m(v(r.snackbarText),1)]),_:1},8,["modelValue","color"])])}const D=_(L,[["render",R]]),K={components:{Addbrandproducts:D},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Add Brand ",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=g(),this.activeTab=y(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function M(a,e,i,V,r,p){const t=q("Addbrandproducts");return u(),c("div",null,[l(O,{modelValue:r.activeTab,"onUpdate:modelValue":e[0]||(e[0]=n=>r.activeTab=n),"show-arrows":""},{default:s(()=>[(u(!0),c(k,null,w(r.tabs,n=>(u(),T(I,{key:n.icon,value:n.tab},{default:s(()=>[l(U,{size:"20",start:"",icon:n.icon},null,8,["icon"]),m(" "+v(n.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),l(x),l(S,{modelValue:r.activeTab,"onUpdate:modelValue":e[1]||(e[1]=n=>r.activeTab=n),class:"mt-5 disable-tab-transition",touch:!1},{default:s(()=>[l(P,{value:"account"},{default:s(()=>[l(t)]),_:1})]),_:1},8,["modelValue"])])}const Y=_(K,[["render",M]]);export{Y as default};