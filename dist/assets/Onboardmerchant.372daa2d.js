import{_ as b,o as d,c as p,g as a,w as o,i as r,j as g,k as y,l as v,m as V,b as m,t as f,v as x,e as S,r as q,F as U,q as w,f as k,u as T,s as O}from"./index.08705643.js";import{s as C}from"./Services.f9e4372b.js";import{V as L}from"./VForm.eec84c64.js";import{V as h}from"./VAutocomplete.457394fd.js";import{V as n}from"./VTextField.0584a3e6.js";import{V as _}from"./VSelect.00b3ff1f.js";import{V as N}from"./VSnackbar.89c018e7.js";import{V as I,a as D,b as P,c as A}from"./VWindowItem.2d182e11.js";import"./VCounter.d136124c.js";import"./VCheckboxBtn.770726d6.js";import"./VChip.cd0ade04.js";const B={mixins:[C],data(){return{snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,salesdata:[],userid:"",dialog:!1,saveMerchant:{merchant_uid:"",merchant_name:"",store_address:"",gst:"",area_pincode:"",poc_name:"",poc_phone:"",owner_name:"",owner_phone:"",shop_size:"",shop_type:"",location:"",created_by:"",sales_person:"",longitude:"",latitude:"",city_id:"",location_id:"",billing_address:"",payment_type:"",entity_id:""},cityID:"",locationsdata:[],cityLoaction:[],Soperson:[],Sodata:[],Logitude:[l=>!!l||"Longitude is required",l=>/^\s*-?(\d+(\.\d+)?|[0-8]?\d(\.\d+)?|90(\.0+)?)\s*$/.test(l)||"Invalid Longitude Format"],latitude:[l=>!!l||"Latitude is required",l=>/^\s*-?([0-8]?\d(\.\d+)?|90(\.0+)?|[1-8]?\d(\.\d+)?|89(\.999+)?|[1-8]\d(\.\d+)?|90\.0+?)\s*$/.test(l)||"Invalid Latitude Format"],storerules:[l=>!!l||"Store Address is required"],salespersonrules:[l=>!!l||"Agree Payment Mode is required"],uidrules:[l=>!!l||"UID is required"],namerules:[l=>!!l||"Name is required",l=>/^[a-z A-Z]+$/.test(l)||"Only letters are allowed in the name"],namerulesm:[l=>!!l||"Name is required"],salespersonr:[l=>!!l||"Name is required"],gstrules:[l=>!!l||"GST is required"],locationrules:[l=>!!l||"City Name is required"],locationrules2:[l=>!!l||"City Location Name is required"],pinrules:[l=>!!l||"PIN is required",l=>l&&/^\d{6}$/.test(l)||"PIN must be 6 digits"],phonerules:[l=>!!l||" Mobile  is required",l=>/^[0-9]+$/.test(l)||"only number are accepted",l=>l&&l.length<=10&&l.length>=10||"Mobile must be  10 number"]}},mounted(){this.cityID=localStorage.getItem("city_id"),this.getAllsales(),this.userid=localStorage.getItem("user_id");const l=localStorage.getItem("sodetails");if(l)try{this.Soperson=JSON.parse(l),this.Sodata=this.Soperson.map(t=>({value:t.entity_id,text:t.name})),Array.isArray(this.Soperson)||(this.Soperson=[])}catch{this.Soperson=[]}this.getBranchnames()},methods:{handleBrandSelection(l){this.getCitylocation(l).then(t=>{this.cityLoaction=t.data.data.map(u=>({value:u.location_id,text:u.location}))})},getBranchnames(){this.Locationdata().then(l=>{this.locationsdata=l.data.data.map(t=>({value:t.city_id,text:t.city}))})},validateForm(){this.$refs.purchaseOrderForm.validate().then(l=>{l.valid==!0?this.saveMerchants():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},saveMerchants(){const l={merchant_uid:this.saveMerchant.merchant_uid,merchant_name:this.saveMerchant.merchant_name,store_address:this.saveMerchant.store_address,gst:this.saveMerchant.gst,area_pincode:this.saveMerchant.area_pincode,poc_name:this.saveMerchant.poc_name,poc_phone:this.saveMerchant.poc_phone,owner_name:this.saveMerchant.owner_name,owner_phone:this.saveMerchant.owner_phone,shop_size:this.saveMerchant.shop_size,shop_type:this.saveMerchant.shop_type,location:this.saveMerchant.location,created_by:this.userid,sales_person:this.saveMerchant.sales_person,latitude:this.saveMerchant.latitude,longitude:this.saveMerchant.longitude,city_id:this.saveMerchant.city_id,location_id:this.saveMerchant.location_id,billing_address:this.saveMerchant.billing_address,payment_type:this.saveMerchant.payment_type,entity_id:this.saveMerchant.entity_id};this.addOnboardmerchant(l).then(t=>{t.data.status==1?(this.snackbarText=t.data.message,this.color="primary",this.snackbar=!0,this.saveMerchant={}):(this.snackbarText=t.data.message,this.color="on-background",this.snackbar=!0)})},getAllsales(){this.getSalesassociate(this.cityID).then(l=>{this.salesdata=l.data.data,this.salesdata=this.salesdata.map(t=>({value:t.user_id,text:t.name}))})},deleteRow(l){const t=this.data.indexOf(l);t!==-1&&this.data.splice(t,1)},openproductdialog(){this.dialog=!0},closeDialog(){this.dialog=!1}}};function F(l,t,u,M,e,c){return d(),p("div",null,[a(v,null,{default:o(()=>[a(r,{cols:"12"},{default:o(()=>[a(g,{title:"Onboard Merchant",class:"mb-4"},{default:o(()=>[a(y,null,{default:o(()=>[a(L,{ref:"purchaseOrderForm",class:"mt-6"},{default:o(()=>[a(v,null,{default:o(()=>[a(r,{cols:"12",md:"6"},{default:o(()=>[a(h,{modelValue:e.saveMerchant.city_id,"onUpdate:modelValue":[t[0]||(t[0]=s=>e.saveMerchant.city_id=s),t[1]||(t[1]=s=>c.handleBrandSelection(e.saveMerchant.city_id))],label:"City Names",items:e.locationsdata,"item-title":"text","item-value":"value",rules:e.locationrules,required:"","menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(h,{modelValue:e.saveMerchant.location_id,"onUpdate:modelValue":t[2]||(t[2]=s=>e.saveMerchant.location_id=s),label:"City Location",items:e.cityLoaction,"item-value":"value","item-title":"text",rules:e.locationrules2,"menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),a(r,{cols:"12",md:"6"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.merchant_uid,"onUpdate:modelValue":t[3]||(t[3]=s=>e.saveMerchant.merchant_uid=s),label:"Merchant UID",rules:e.uidrules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{cols:"12",md:"6"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.merchant_name,"onUpdate:modelValue":t[4]||(t[4]=s=>e.saveMerchant.merchant_name=s),label:"Merchant Name",rules:e.namerulesm,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.gst,"onUpdate:modelValue":t[5]||(t[5]=s=>e.saveMerchant.gst=s),label:"GST",rules:e.gstrules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.area_pincode,"onUpdate:modelValue":t[6]||(t[6]=s=>e.saveMerchant.area_pincode=s),label:"Area Pincode",rules:e.pinrules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.owner_name,"onUpdate:modelValue":t[7]||(t[7]=s=>e.saveMerchant.owner_name=s),label:"Owner Name",rules:e.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.owner_phone,"onUpdate:modelValue":t[8]||(t[8]=s=>e.saveMerchant.owner_phone=s),label:"Owner Phone",rules:e.phonerules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.poc_name,"onUpdate:modelValue":t[9]||(t[9]=s=>e.saveMerchant.poc_name=s),label:"POC Name",rules:e.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.poc_phone,"onUpdate:modelValue":t[10]||(t[10]=s=>e.saveMerchant.poc_phone=s),label:"POC Phone",rules:e.phonerules,required:""},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.shop_size,"onUpdate:modelValue":t[11]||(t[11]=s=>e.saveMerchant.shop_size=s),label:"Shop Size"},null,8,["modelValue"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.shop_type,"onUpdate:modelValue":t[12]||(t[12]=s=>e.saveMerchant.shop_type=s),label:"Shop Type"},null,8,["modelValue"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.location,"onUpdate:modelValue":t[13]||(t[13]=s=>e.saveMerchant.location=s),label:"Location"},null,8,["modelValue"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(_,{modelValue:e.saveMerchant.sales_person,"onUpdate:modelValue":t[14]||(t[14]=s=>e.saveMerchant.sales_person=s),label:"Sales Person",items:e.salesdata,"item-value":"value","item-title":"text",rules:e.salespersonr,required:"","menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.latitude,"onUpdate:modelValue":t[15]||(t[15]=s=>e.saveMerchant.latitude=s),label:"Latitude",rules:e.latitude},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.longitude,"onUpdate:modelValue":t[16]||(t[16]=s=>e.saveMerchant.longitude=s),label:"Longitude",rules:e.Logitude},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.store_address,"onUpdate:modelValue":t[17]||(t[17]=s=>e.saveMerchant.store_address=s),label:"Store Address",rules:e.storerules},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:e.saveMerchant.billing_address,"onUpdate:modelValue":t[18]||(t[18]=s=>e.saveMerchant.billing_address=s),label:"Billing Address"},null,8,["modelValue"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(_,{modelValue:e.saveMerchant.payment_type,"onUpdate:modelValue":t[19]||(t[19]=s=>e.saveMerchant.payment_type=s),label:"Payment Type ",items:["Cash On Delivery","Credit","GRN","POD"],rules:e.salespersonrules,required:"","menu-props":{maxHeight:200}},null,8,["modelValue","rules"])]),_:1}),a(r,{md:"6",cols:"12"},{default:o(()=>[a(h,{modelValue:e.saveMerchant.entity_id,"onUpdate:modelValue":t[20]||(t[20]=s=>e.saveMerchant.entity_id=s),label:"Billing From",items:e.Sodata,"item-value":"value","item-title":"text","menu-props":{maxHeight:200}},null,8,["modelValue","items"])]),_:1}),a(r,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[a(V,{onClick:c.validateForm},{default:o(()=>[m(" Save ")]),_:1},8,["onClick"]),a(V,{color:"secondary",variant:"tonal",type:"reset"},{default:o(()=>[m(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),a(N,{modelValue:e.snackbar,"onUpdate:modelValue":t[21]||(t[21]=s=>e.snackbar=s),timeout:3500,color:e.color},{default:o(()=>[m(f(e.snackbarText),1)]),_:1},8,["modelValue","color"])])}const z=b(B,[["render",F]]),H={components:{Onboardmerchantdetails:z},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Brand",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=x(),this.activeTab=S(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function R(l,t,u,M,e,c){const s=q("Onboardmerchantdetails");return d(),p("div",null,[a(D,{modelValue:e.activeTab,"onUpdate:modelValue":t[0]||(t[0]=i=>e.activeTab=i),"show-arrows":""},{default:o(()=>[(d(!0),p(U,null,w(e.tabs,i=>(d(),k(I,{key:i.icon,value:i.tab},{default:o(()=>[a(T,{size:"20",start:"",icon:i.icon},null,8,["icon"]),m(" "+f(i.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),a(O),a(A,{modelValue:e.activeTab,"onUpdate:modelValue":t[1]||(t[1]=i=>e.activeTab=i),class:"mt-5 disable-tab-transition",touch:!1},{default:o(()=>[a(P,{value:"account"},{default:o(()=>[a(s)]),_:1})]),_:1},8,["modelValue"])])}const ee=b(H,[["render",R]]);export{ee as default};
