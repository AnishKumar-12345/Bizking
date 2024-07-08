import{_,o as u,c,g as t,w as s,i as r,j as M,k as g,l as p,m as v,b as m,t as b,v as y,e as x,F as q,q as w,s as U,r as k,f as T,u as L}from"./index.871767d0.js";import{s as S}from"./Services.d06bbe8b.js";import{V as O}from"./VForm.33d3da31.js";import{V}from"./VAutocomplete.da11b3e2.js";import{V as n}from"./VTextField.aaf29b18.js";import{V as C}from"./VSelect.dcb7acbd.js";import{V as N}from"./VSnackbar.2c6d9b4a.js";import{V as B,a as F,b as I,c as P}from"./VWindowItem.db87fc1a.js";import"./VCheckboxBtn.230e21ce.js";import"./VChip.f2e91746.js";const z={mixins:[S],data(){return{snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,salesdata:[],userid:"",dialog:!1,saveMerchant:{merchant_uid:"",merchant_name:"",store_address:"",gst:"",area_pincode:"",poc_name:"",poc_phone:"",owner_name:"",owner_phone:"",shop_size:"",shop_type:"",location:"",created_by:"",sales_person:"",longitude:"",latitude:"",city_id:"",location_id:"",billing_address:""},locationsdata:[],cityLoaction:[],Logitude:[a=>!!a||"Longitude is required",a=>/^\s*-?(\d+(\.\d+)?|[0-8]?\d(\.\d+)?|90(\.0+)?)\s*$/.test(a)||"Invalid Longitude Format"],latitude:[a=>!!a||"Latitude is required",a=>/^\s*-?([0-8]?\d(\.\d+)?|90(\.0+)?|[1-8]?\d(\.\d+)?|89(\.999+)?|[1-8]\d(\.\d+)?|90\.0+?)\s*$/.test(a)||"Invalid Latitude Format"],storerules:[a=>!!a||"Store Address is required"],uidrules:[a=>!!a||"UID is required"],namerules:[a=>!!a||"Name is required",a=>/^[a-z A-Z]+$/.test(a)||"Only letters are allowed in the name"],namerulesm:[a=>!!a||"Name is required"],salespersonr:[a=>!!a||"Name is required"],gstrules:[a=>!!a||"GST is required"],locationrules:[a=>!!a||"City Name is required"],locationrules2:[a=>!!a||"City Location Name is required"],pinrules:[a=>!!a||"PIN is required",a=>a&&/^\d{6}$/.test(a)||"PIN must be 6 digits"],phonerules:[a=>!!a||" Mobile  is required",a=>/^[0-9]+$/.test(a)||"only number are accepted",a=>a&&a.length<=10&&a.length>=10||"Mobile must be  10 number"]}},mounted(){this.getAllsales(),this.userid=localStorage.getItem("user_id"),this.getBranchnames()},methods:{handleBrandSelection(a){console.log("check hjandle",a),this.getCitylocation(a).then(e=>{this.cityLoaction=e.data.data.map(d=>({value:d.location_id,text:d.location}))})},getBranchnames(){this.Locationdata().then(a=>{this.locationsdata=a.data.data.map(e=>({value:e.city_id,text:e.city})),console.log("ceck tye res",this.locationsdata)})},validateForm(){this.$refs.purchaseOrderForm.validate().then(a=>{a.valid==!0?this.saveMerchants():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},saveMerchants(){const a={merchant_uid:this.saveMerchant.merchant_uid,merchant_name:this.saveMerchant.merchant_name,store_address:this.saveMerchant.store_address,gst:this.saveMerchant.gst,area_pincode:this.saveMerchant.area_pincode,poc_name:this.saveMerchant.poc_name,poc_phone:this.saveMerchant.poc_phone,owner_name:this.saveMerchant.owner_name,owner_phone:this.saveMerchant.owner_phone,shop_size:this.saveMerchant.shop_size,shop_type:this.saveMerchant.shop_type,location:this.saveMerchant.location,created_by:this.userid,sales_person:this.saveMerchant.sales_person,latitude:this.saveMerchant.latitude,longitude:this.saveMerchant.longitude,city_id:this.saveMerchant.city_id,location_id:this.saveMerchant.location_id,billing_address:this.saveMerchant.billing_address};console.log({postData:a}),this.addOnboardmerchant(a).then(e=>{console.log("resp",e),e.data.status==1?(this.snackbarText=e.data.message,this.color="primary",this.snackbar=!0,this.saveMerchant={}):(this.snackbarText=e.data.message,this.color="on-background",this.snackbar=!0)})},getAllsales(){this.getsalesperson().then(a=>{this.salesdata=a.data.data,this.salesdata=this.salesdata.map(e=>({value:e.user_id,text:e.name})),console.log("sales",this.salesdata)})},deleteRow(a){const e=this.data.indexOf(a);e!==-1&&this.data.splice(e,1)},openproductdialog(){this.dialog=!0},closeDialog(){this.dialog=!1}}};function A(a,e,d,f,o,h){return u(),c("div",null,[t(p,null,{default:s(()=>[t(r,{cols:"12"},{default:s(()=>[t(M,{title:"Onboard Merchant",class:"mb-4"},{default:s(()=>[t(g,null,{default:s(()=>[t(O,{class:"mt-6",ref:"purchaseOrderForm"},{default:s(()=>[t(p,null,{default:s(()=>[t(r,{cols:"12",md:"6"},{default:s(()=>[t(V,{modelValue:this.saveMerchant.city_id,"onUpdate:modelValue":[e[0]||(e[0]=l=>this.saveMerchant.city_id=l),e[1]||(e[1]=l=>h.handleBrandSelection(this.saveMerchant.city_id))],label:"City Names",items:o.locationsdata,"item-title":"text","item-value":"value",rules:o.locationrules,required:"","menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(V,{modelValue:this.saveMerchant.location_id,"onUpdate:modelValue":e[2]||(e[2]=l=>this.saveMerchant.location_id=l),label:"City Location",items:this.cityLoaction,"item-value":"value","item-title":"text",rules:o.locationrules2,"menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),t(r,{cols:"12",md:"6"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.merchant_uid,"onUpdate:modelValue":e[3]||(e[3]=l=>this.saveMerchant.merchant_uid=l),label:"Merchant UID",rules:o.uidrules,required:""},null,8,["modelValue","rules"])]),_:1}),t(r,{cols:"12",md:"6"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.merchant_name,"onUpdate:modelValue":e[4]||(e[4]=l=>this.saveMerchant.merchant_name=l),label:"Merchant Name",rules:o.namerulesm,required:""},null,8,["modelValue","rules"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.gst,"onUpdate:modelValue":e[5]||(e[5]=l=>this.saveMerchant.gst=l),label:"GST",rules:o.gstrules,required:""},null,8,["modelValue","rules"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.area_pincode,"onUpdate:modelValue":e[6]||(e[6]=l=>this.saveMerchant.area_pincode=l),label:"Area Pincode",rules:o.pinrules,required:""},null,8,["modelValue","rules"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.owner_name,"onUpdate:modelValue":e[7]||(e[7]=l=>this.saveMerchant.owner_name=l),label:"Owner Name",rules:o.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.owner_phone,"onUpdate:modelValue":e[8]||(e[8]=l=>this.saveMerchant.owner_phone=l),label:"Owner Phone",rules:o.phonerules,required:""},null,8,["modelValue","rules"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.poc_name,"onUpdate:modelValue":e[9]||(e[9]=l=>this.saveMerchant.poc_name=l),label:"POC Name",rules:o.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.poc_phone,"onUpdate:modelValue":e[10]||(e[10]=l=>this.saveMerchant.poc_phone=l),label:"POC Phone",rules:o.phonerules,required:""},null,8,["modelValue","rules"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.shop_size,"onUpdate:modelValue":e[11]||(e[11]=l=>this.saveMerchant.shop_size=l),label:"Shop Size"},null,8,["modelValue"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.shop_type,"onUpdate:modelValue":e[12]||(e[12]=l=>this.saveMerchant.shop_type=l),label:"Shop Type"},null,8,["modelValue"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.location,"onUpdate:modelValue":e[13]||(e[13]=l=>this.saveMerchant.location=l),label:"Location"},null,8,["modelValue"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(C,{modelValue:this.saveMerchant.sales_person,"onUpdate:modelValue":e[14]||(e[14]=l=>this.saveMerchant.sales_person=l),label:"Sales Person",items:this.salesdata,"item-value":"value","item-title":"text",rules:o.salespersonr,required:""},null,8,["modelValue","items","rules"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.latitude,"onUpdate:modelValue":e[15]||(e[15]=l=>this.saveMerchant.latitude=l),label:"Latitude",rules:o.latitude},null,8,["modelValue","rules"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.longitude,"onUpdate:modelValue":e[16]||(e[16]=l=>this.saveMerchant.longitude=l),label:"Longitude",rules:o.Logitude},null,8,["modelValue","rules"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.store_address,"onUpdate:modelValue":e[17]||(e[17]=l=>this.saveMerchant.store_address=l),label:"Store Address",rules:o.storerules},null,8,["modelValue","rules"])]),_:1}),t(r,{md:"6",cols:"12"},{default:s(()=>[t(n,{modelValue:this.saveMerchant.billing_address,"onUpdate:modelValue":e[18]||(e[18]=l=>this.saveMerchant.billing_address=l),label:"Billing Address"},null,8,["modelValue"])]),_:1}),t(r,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:s(()=>[t(v,{onClick:e[19]||(e[19]=l=>h.validateForm())},{default:s(()=>[m("Save")]),_:1}),t(v,{color:"secondary",variant:"tonal",type:"reset"},{default:s(()=>[m(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),t(N,{modelValue:o.snackbar,"onUpdate:modelValue":e[20]||(e[20]=l=>o.snackbar=l),timeout:3500,color:o.color},{default:s(()=>[m(b(o.snackbarText),1)]),_:1},8,["modelValue","color"])])}const D=_(z,[["render",A]]),R={components:{Onboardmerchantdetails:D},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Brand",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=y(),this.activeTab=x(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function j(a,e,d,f,o,h){const l=k("Onboardmerchantdetails");return u(),c("div",null,[t(B,{modelValue:o.activeTab,"onUpdate:modelValue":e[0]||(e[0]=i=>o.activeTab=i),"show-arrows":""},{default:s(()=>[(u(!0),c(q,null,w(o.tabs,i=>(u(),T(P,{key:i.icon,value:i.tab},{default:s(()=>[t(L,{size:"20",start:"",icon:i.icon},null,8,["icon"]),m(" "+b(i.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),t(U),t(I,{modelValue:o.activeTab,"onUpdate:modelValue":e[1]||(e[1]=i=>o.activeTab=i),class:"mt-5 disable-tab-transition",touch:!1},{default:s(()=>[t(F,{value:"account"},{default:s(()=>[t(l)]),_:1})]),_:1},8,["modelValue"])])}const $=_(R,[["render",j]]);export{$ as default};
