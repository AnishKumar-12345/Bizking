import{_,o as u,c,g as a,w as l,i as r,j as M,k as g,l as p,m as v,b as m,t as b,v as y,e as x,F as q,q as w,s as k,r as U,f as T,u as L}from"./index.fe0f4396.js";import{s as S}from"./Services.9c2b0029.js";import{V as O}from"./VForm.e88938f6.js";import{V}from"./VAutocomplete.c3fd70c4.js";import{V as n}from"./VTextField.a9260b85.js";import{V as C}from"./VSelect.53493482.js";import{V as N}from"./VSnackbar.0de1d98b.js";import{V as F,a as B,b as I,c as P}from"./VWindowItem.29924bf5.js";import"./VCheckboxBtn.7877dafe.js";import"./VChip.d98fb3cc.js";const z={mixins:[S],data(){return{snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,salesdata:[],userid:"",dialog:!1,saveMerchant:{merchant_uid:"",merchant_name:"",store_address:"",gst:"",area_pincode:"",poc_name:"",poc_phone:"",owner_name:"",owner_phone:"",shop_size:"",shop_type:"",location:"",created_by:"",sales_person:"",longitude:"",latitude:"",city_id:"",location_id:""},locationsdata:[],cityLoaction:[],Logitude:[t=>!!t||"Longitude is required",t=>/^\s*-?(\d+(\.\d+)?|[0-8]?\d(\.\d+)?|90(\.0+)?)\s*$/.test(t)||"Invalid Longitude Format"],latitude:[t=>!!t||"Latitude is required",t=>/^\s*-?([0-8]?\d(\.\d+)?|90(\.0+)?|[1-8]?\d(\.\d+)?|89(\.999+)?|[1-8]\d(\.\d+)?|90\.0+?)\s*$/.test(t)||"Invalid Latitude Format"],storerules:[t=>!!t||"Store Address is required"],uidrules:[t=>!!t||"UID is required"],namerules:[t=>!!t||"Name is required",t=>/^[a-z A-Z]+$/.test(t)||"Only letters are allowed in the name"],namerulesm:[t=>!!t||"Name is required"],salespersonr:[t=>!!t||"Name is required"],gstrules:[t=>!!t||"GST is required"],locationrules:[t=>!!t||"City Name is required"],locationrules2:[t=>!!t||"City Location Name is required"],pinrules:[t=>!!t||"PIN is required",t=>t&&/^\d{6}$/.test(t)||"PIN must be 6 digits"],phonerules:[t=>!!t||" Mobile  is required",t=>/^[0-9]+$/.test(t)||"only number are accepted",t=>t&&t.length<=10&&t.length>=10||"Mobile must be  10 number"]}},mounted(){this.getAllsales(),this.userid=localStorage.getItem("user_id"),this.getBranchnames()},methods:{handleBrandSelection(t){console.log("check hjandle",t),this.getCitylocation(t).then(e=>{this.cityLoaction=e.data.data.map(d=>({value:d.location_id,text:d.location}))})},getBranchnames(){this.Locationdata().then(t=>{this.locationsdata=t.data.data.map(e=>({value:e.city_id,text:e.city})),console.log("ceck tye res",this.locationsdata)})},validateForm(){this.$refs.purchaseOrderForm.validate().then(t=>{t.valid==!0?this.saveMerchants():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},saveMerchants(){const t={merchant_uid:this.saveMerchant.merchant_uid,merchant_name:this.saveMerchant.merchant_name,store_address:this.saveMerchant.store_address,gst:this.saveMerchant.gst,area_pincode:this.saveMerchant.area_pincode,poc_name:this.saveMerchant.poc_name,poc_phone:this.saveMerchant.poc_phone,owner_name:this.saveMerchant.owner_name,owner_phone:this.saveMerchant.owner_phone,shop_size:this.saveMerchant.shop_size,shop_type:this.saveMerchant.shop_type,location:this.saveMerchant.location,created_by:this.userid,sales_person:this.saveMerchant.sales_person,latitude:this.saveMerchant.latitude,longitude:this.saveMerchant.longitude,city_id:this.saveMerchant.city_id,location_id:this.saveMerchant.location_id};this.addOnboardmerchant(t).then(e=>{console.log("resp",e),e.data.status==1?(this.snackbarText=e.data.message,this.color="primary",this.snackbar=!0,this.saveMerchant={}):(this.snackbarText=e.data.message,this.color="on-background",this.snackbar=!0)})},getAllsales(){this.getsalesperson().then(t=>{this.salesdata=t.data.data,this.salesdata=this.salesdata.map(e=>({value:e.user_id,text:e.name})),console.log("sales",this.salesdata)})},deleteRow(t){const e=this.data.indexOf(t);e!==-1&&this.data.splice(e,1)},openproductdialog(){this.dialog=!0},closeDialog(){this.dialog=!1}}};function A(t,e,d,f,o,h){return u(),c("div",null,[a(p,null,{default:l(()=>[a(r,{cols:"12"},{default:l(()=>[a(M,{title:"Onboard Merchant",class:"mb-4"},{default:l(()=>[a(g,null,{default:l(()=>[a(O,{class:"mt-6",ref:"purchaseOrderForm"},{default:l(()=>[a(p,null,{default:l(()=>[a(r,{cols:"12",md:"6"},{default:l(()=>[a(V,{modelValue:this.saveMerchant.city_id,"onUpdate:modelValue":[e[0]||(e[0]=s=>this.saveMerchant.city_id=s),e[1]||(e[1]=s=>h.handleBrandSelection(this.saveMerchant.city_id))],label:"City Names",items:o.locationsdata,"item-title":"text","item-value":"value",rules:o.locationrules,required:"","menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(V,{modelValue:this.saveMerchant.location_id,"onUpdate:modelValue":e[2]||(e[2]=s=>this.saveMerchant.location_id=s),label:"City Location",items:this.cityLoaction,"item-value":"value","item-title":"text",rules:o.locationrules2,"menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),a(r,{cols:"12",md:"6"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.merchant_uid,"onUpdate:modelValue":e[3]||(e[3]=s=>this.saveMerchant.merchant_uid=s),label:"Merchant UID",rules:o.uidrules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{cols:"12",md:"6"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.merchant_name,"onUpdate:modelValue":e[4]||(e[4]=s=>this.saveMerchant.merchant_name=s),label:"Merchant Name",rules:o.namerulesm,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.gst,"onUpdate:modelValue":e[5]||(e[5]=s=>this.saveMerchant.gst=s),label:"GST",rules:o.gstrules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.area_pincode,"onUpdate:modelValue":e[6]||(e[6]=s=>this.saveMerchant.area_pincode=s),label:"Area Pincode",rules:o.pinrules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.owner_name,"onUpdate:modelValue":e[7]||(e[7]=s=>this.saveMerchant.owner_name=s),label:"Owner Name",rules:o.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.owner_phone,"onUpdate:modelValue":e[8]||(e[8]=s=>this.saveMerchant.owner_phone=s),label:"Owner Phone",rules:o.phonerules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.poc_name,"onUpdate:modelValue":e[9]||(e[9]=s=>this.saveMerchant.poc_name=s),label:"POC Name",rules:o.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.poc_phone,"onUpdate:modelValue":e[10]||(e[10]=s=>this.saveMerchant.poc_phone=s),label:"POC Phone",rules:o.phonerules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.shop_size,"onUpdate:modelValue":e[11]||(e[11]=s=>this.saveMerchant.shop_size=s),label:"Shop Size"},null,8,["modelValue"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.shop_type,"onUpdate:modelValue":e[12]||(e[12]=s=>this.saveMerchant.shop_type=s),label:"Shop Type"},null,8,["modelValue"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.location,"onUpdate:modelValue":e[13]||(e[13]=s=>this.saveMerchant.location=s),label:"Location"},null,8,["modelValue"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(C,{modelValue:this.saveMerchant.sales_person,"onUpdate:modelValue":e[14]||(e[14]=s=>this.saveMerchant.sales_person=s),label:"Sales Person",items:this.salesdata,"item-value":"value","item-title":"text",rules:o.salespersonr,required:""},null,8,["modelValue","items","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.latitude,"onUpdate:modelValue":e[15]||(e[15]=s=>this.saveMerchant.latitude=s),label:"Latitude",rules:o.latitude},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.longitude,"onUpdate:modelValue":e[16]||(e[16]=s=>this.saveMerchant.longitude=s),label:"Longitude",rules:o.Logitude},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:l(()=>[a(n,{modelValue:this.saveMerchant.store_address,"onUpdate:modelValue":e[17]||(e[17]=s=>this.saveMerchant.store_address=s),label:"Store Address",rules:o.storerules},null,8,["modelValue","rules"])]),_:1}),a(r,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:l(()=>[a(v,{onClick:e[18]||(e[18]=s=>h.validateForm())},{default:l(()=>[m("Save")]),_:1}),a(v,{color:"secondary",variant:"tonal",type:"reset"},{default:l(()=>[m(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),a(N,{modelValue:o.snackbar,"onUpdate:modelValue":e[19]||(e[19]=s=>o.snackbar=s),timeout:3500,color:o.color},{default:l(()=>[m(b(o.snackbarText),1)]),_:1},8,["modelValue","color"])])}const D=_(z,[["render",A]]),R={components:{Onboardmerchantdetails:D},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Brand",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=y(),this.activeTab=x(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function j(t,e,d,f,o,h){const s=U("Onboardmerchantdetails");return u(),c("div",null,[a(F,{modelValue:o.activeTab,"onUpdate:modelValue":e[0]||(e[0]=i=>o.activeTab=i),"show-arrows":""},{default:l(()=>[(u(!0),c(q,null,w(o.tabs,i=>(u(),T(P,{key:i.icon,value:i.tab},{default:l(()=>[a(L,{size:"20",start:"",icon:i.icon},null,8,["icon"]),m(" "+b(i.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),a(k),a(I,{modelValue:o.activeTab,"onUpdate:modelValue":e[1]||(e[1]=i=>o.activeTab=i),class:"mt-5 disable-tab-transition",touch:!1},{default:l(()=>[a(B,{value:"account"},{default:l(()=>[a(s)]),_:1})]),_:1},8,["modelValue"])])}const $=_(R,[["render",j]]);export{$ as default};