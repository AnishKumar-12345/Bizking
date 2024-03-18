import{_ as w,o as c,c as h,g as s,b6 as V,f as y,w as r,a as o,F as f,q as g,t as n,b as p,m as M,u as C,j as k,k as S,l as b,i as d,bC as U,bm as T,v as L,e as z,s as I,r as q}from"./index.e2aae198.js";import{s as P}from"./Services.fded68ed.js";import{V as i}from"./VTextField.e0cf5325.js";import{V as A}from"./VChip.90dec6b0.js";import{V as N}from"./VTable.075b3be2.js";import{V as D}from"./VPagination.b5904d2d.js";import{V as O}from"./VForm.2eb7376c.js";import{V as x}from"./VSelect.6cf16e7e.js";import{V as B}from"./VDialog.3fb73319.js";import{V as F}from"./VSnackbar.6637c2b7.js";import{V as Q,a as G,b as R,c as W}from"./VWindowItem.75ebe5c9.js";import"./index.2bd8ddc8.js";import"./VCheckboxBtn.96077063.js";const j={mixins:[P],data(){return{storerules:[a=>!!a||"Store Address is required"],uidrules:[a=>!!a||"UID is required"],namerules:[a=>!!a||"Name is required"],gstrules:[a=>!!a||"GST is required"],pinrules:[a=>!!a||"PIN is required",a=>a&&/^\d{6}$/.test(a)||"PIN must be 6 digits"],phonerules:[a=>!!a||" Mobile  is required",a=>/^[0-9]+$/.test(a)||"only number are accepted",a=>a&&a.length<=10&&a.length>=10||"Mobile must be  10 number"],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,dialog:!1,loading:!0,searchQuery:"",page:1,pageSize:10,merchants:[],saveMerchant:{merchant_uid:"",merchant_name:"",merchant_id:"",merchant_code:"",store_address:"",gst:"",area_pincode:"",poc_name:"",poc_phone:"",owner_name:"",owner_phone:"",shop_size:"",shop_type:"",location:"",sales_person:"",created_date:"",status:"",created_by:""},salesdata:[],createdby:"",headers:[{text:"Sales Associate",value:"sales_person"},{text:"Merchant Name",value:"merchant_name"},{text:"Merchant UID",value:"merchant_uid"},{text:"Owner Name",value:"owner_name"},{text:"Owner Phone",value:"owner_phone"},{text:"POC Name",value:"poc_name"},{text:"POC Phone",value:"poc_phone"},{text:"Shop Size",value:"shop_size"},{text:"Shop Type",value:"shop_type"},{text:"Status",value:"status"},{text:"GST",value:"gst"},{text:"Update Date",value:"updated_date"},{text:"Created By",value:"created_by"},{text:"Created Date",value:"created_date"},{text:"Store Address",value:"store_address"},{text:"Location",value:"location"},{text:"Area Pincode",value:"area_pincode"},{text:"Action",value:"actions"}]}},computed:{filteredMerchants(){const a=this.searchQuery.toLowerCase().trim();return this.merchants.filter(e=>e.sales_person&&e.sales_person.toLowerCase().includes(a)||e.merchant_name&&e.merchant_name.toLowerCase().includes(a)||e.merchant_uid&&e.merchant_uid.toLowerCase().includes(a)||e.owner_name&&e.owner_name.toLowerCase().includes(a)||e.owner_phone&&e.owner_phone.toLowerCase().includes(a)||e.poc_name&&e.poc_name.toLowerCase().includes(a)||e.poc_phone&&e.poc_phone.toLowerCase().includes(a)||e.shop_size&&e.shop_size.toLowerCase().includes(a)||e.shop_type&&e.shop_type.toLowerCase().includes(a)||e.status&&e.status.toLowerCase().includes(a)||e.gst&&e.gst.toLowerCase().includes(a)||e.updated_date&&e.updated_date.toLowerCase().includes(a)||e.created_date&&e.created_date.toLowerCase().includes(a)||e.decision_authority&&e.decision_authority.toLowerCase().includes(a)||e.store_address&&e.store_address.toLowerCase().includes(a)||e.location&&e.location.toLowerCase().includes(a)||e.area_pincode&&e.area_pincode.toLowerCase().includes(a))},paginatedItems(){const a=(this.page-1)*this.pageSize,e=a+this.pageSize;return this.filteredMerchants.slice().sort((v,l)=>new Date(l.created_date)-new Date(v.created_date)).slice(a,e)}},mounted(){this.getmerchants(),this.createdby=localStorage.getItem("user_id"),setTimeout(()=>{this.loading=!1},7e3),this.getAllsales()},methods:{validateForm(){this.$refs.purchaseOrderForm.validate().then(a=>{a.valid==!0?this.updatemerchant():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},updatemerchant(){const a={merchant_uid:this.saveMerchant.merchant_uid,merchant_name:this.saveMerchant.merchant_name,merchant_code:this.saveMerchant.merchant_code,store_address:this.saveMerchant.store_address,gst:this.saveMerchant.gst,status:this.saveMerchant.status==="Active"?"1":"0",area_pincode:this.saveMerchant.area_pincode,poc_name:this.saveMerchant.poc_name,poc_phone:this.saveMerchant.poc_phone,owner_name:this.saveMerchant.owner_name,owner_phone:this.saveMerchant.owner_phone,merchant_id:this.saveMerchant.merchant_id,shop_size:this.saveMerchant.shop_size,shop_type:this.saveMerchant.shop_type,location:this.saveMerchant.location,created_by:this.createdby,sales_person:this.saveMerchant.sales_person,created_date:this.saveMerchant.created_date};console.log("post",a),this.updateMerchantdetailsdata(a).then(e=>{e.data.status==1?(this.snackbarText=e.data.message,this.color="primary",this.snackbar=!0,this.dialog=!1,this.saveMerchant={},this.getmerchants()):(this.snackbarText=e.data.message,this.color="on-background",this.snackbar=!0)})},getAllsales(){this.getsalesperson().then(a=>{this.salesdata=a.data.data,this.salesdata=this.salesdata.map(e=>({value:e.user_id,text:e.name})),console.log("sales",this.salesdata)})},editmerchant(a){console.log("check the edit",a.merchant_id),this.getMerchantdetailsdata(a.merchant_id).then(e=>{console.log("set merchnt",e),e.data.status==1&&(this.dialog=!0,this.saveMerchant.merchant_uid=e.data.data.merchant_uid,this.saveMerchant.merchant_id=e.data.data.merchant_id,this.saveMerchant.created_date=e.data.data.created_date,this.saveMerchant.merchant_code=e.data.data.merchant_code,this.saveMerchant.merchant_name=e.data.data.merchant_name,this.saveMerchant.gst=e.data.data.gst,this.saveMerchant.area_pincode=e.data.data.area_pincode,this.saveMerchant.owner_name=e.data.data.owner_name,this.saveMerchant.owner_phone=e.data.data.owner_phone,this.saveMerchant.poc_name=e.data.data.poc_name,this.saveMerchant.poc_phone=e.data.data.poc_phone,this.saveMerchant.shop_size=e.data.data.shop_size,this.saveMerchant.shop_type=e.data.data.shop_type,this.saveMerchant.location=e.data.data.location,this.saveMerchant.sales_person=e.data.data.sales_person==this.salesdata.value?this.salesdata.map(_=>({value:_.user_id,text:_.name})):e.data.data.sales_person,this.saveMerchant.store_address=e.data.data.store_address,this.saveMerchant.status=e.data.data.status==1?"Active":"Inactive")})},resolveStatusVariant(a){return a==1?{color:"success"}:{color:"error"}},updatePagination(a){this.page=a},getmerchants(){this.getMerchantdetails().then(a=>{this.merchants=a.data.data,this.merchants.reverse()})}}},E={key:0,style:{"max-width":"400px"}},H={key:1,id:"app"},J=U('<div id="loading-bg"><div class="loading-logo"><img src="'+T+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),K=[J],X={class:"text-center"},Y={class:"text-center"},Z={class:"text-center"},$={class:"text-center"},ee={class:"text-center"},te={class:"text-center"},ae={class:"text-center"},se={class:"text-center"},le={class:"text-center"},re={class:"text-center"},oe={class:"text-center"},ne={class:"text-center"},de={class:"text-center"},ie={class:"text-center"},ce={class:"text-center"},ue={class:"text-center"},he={class:"text-center"},me={class:"text-center"};function _e(a,e,_,v,l,m){return c(),h("div",null,[this.merchants!=null?(c(),h("div",E,[s(i,{class:"mb-3",modelValue:l.searchQuery,"onUpdate:modelValue":e[0]||(e[0]=t=>l.searchQuery=t),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])])):V("",!0),l.loading?(c(),h("div",H,K)):V("",!0),this.merchants!=null?(c(),y(N,{key:2,headers:l.headers,items:l.merchants,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:r(()=>[o("thead",null,[o("tr",null,[(c(!0),h(f,null,g(l.headers,t=>(c(),h("th",{class:"text-center",key:t},n(t.text),1))),128))])]),o("tbody",null,[(c(!0),h(f,null,g(m.paginatedItems,(t,u)=>(c(),h("tr",{key:u},[o("td",X,n(t.sales_person),1),o("td",Y,n(t.merchant_name),1),o("td",Z,n(t.merchant_uid),1),o("td",$,n(t.owner_name),1),o("td",ee,n(t.owner_phone),1),o("td",te,n(t.poc_name),1),o("td",ae,n(t.poc_phone),1),o("td",se,n(t.shop_size),1),o("td",le,n(t.shop_type),1),o("td",re,[s(A,{color:m.resolveStatusVariant(t.status).color,class:"font-weight-medium",size:"small"},{default:r(()=>[p(n(t.status==1?"Active":"Inactive"),1)]),_:2},1032,["color"])]),o("td",oe,n(t.gst),1),o("td",ne,n(t.updated_date),1),o("td",de,n(t.created_by),1),o("td",ie,n(t.created_date),1),o("td",ce,n(t.store_address),1),o("td",ue,n(t.location),1),o("td",he,n(t.area_pincode),1),o("td",me,[s(M,{icon:"",variant:"text",color:"default",class:"mb-1 mt-2",size:"x-small",style:{"margin-left":"auto",display:"block"},onClick:fe=>m.editmerchant(t)},{default:r(()=>[s(C,{icon:"ri-pencil-line",size:"22",color:"#BA8B32"})]),_:2},1032,["onClick"])])]))),128))])]),_:1},8,["headers","items"])):V("",!0),s(D,{modelValue:l.page,"onUpdate:modelValue":e[1]||(e[1]=t=>l.page=t),length:Math.ceil(m.filteredMerchants.length/l.pageSize),onInput:m.updatePagination},null,8,["modelValue","length","onInput"]),s(B,{modelValue:l.dialog,"onUpdate:modelValue":e[17]||(e[17]=t=>l.dialog=t),"max-width":"1000"},{default:r(()=>[s(k,{title:"Update Merchant",class:"mb-2"},{default:r(()=>[s(S,null,{default:r(()=>[s(b,null,{default:r(()=>[s(d,{cols:"12"},{default:r(()=>[s(O,{class:"mt-6",ref:"purchaseOrderForm"},{default:r(()=>[s(b,null,{default:r(()=>[s(d,{cols:"12",md:"6"},{default:r(()=>[s(i,{modelValue:this.saveMerchant.merchant_uid,"onUpdate:modelValue":e[2]||(e[2]=t=>this.saveMerchant.merchant_uid=t),label:"Merchant UID",rules:l.uidrules,required:""},null,8,["modelValue","rules"])]),_:1}),s(d,{cols:"12",md:"6"},{default:r(()=>[s(i,{modelValue:this.saveMerchant.merchant_name,"onUpdate:modelValue":e[3]||(e[3]=t=>this.saveMerchant.merchant_name=t),label:"Merchant Name",rules:l.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveMerchant.gst,"onUpdate:modelValue":e[4]||(e[4]=t=>this.saveMerchant.gst=t),label:"GST",rules:l.gstrules,required:""},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveMerchant.area_pincode,"onUpdate:modelValue":e[5]||(e[5]=t=>this.saveMerchant.area_pincode=t),label:"Area Pincode",rules:l.pinrules,required:""},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveMerchant.owner_name,"onUpdate:modelValue":e[6]||(e[6]=t=>this.saveMerchant.owner_name=t),label:"Owner Name",rules:l.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveMerchant.owner_phone,"onUpdate:modelValue":e[7]||(e[7]=t=>this.saveMerchant.owner_phone=t),label:"Owner Phone",rules:l.phonerules,required:""},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveMerchant.poc_name,"onUpdate:modelValue":e[8]||(e[8]=t=>this.saveMerchant.poc_name=t),label:"POC Name",rules:l.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveMerchant.poc_phone,"onUpdate:modelValue":e[9]||(e[9]=t=>this.saveMerchant.poc_phone=t),label:"POC Phone",rules:l.phonerules,required:""},null,8,["modelValue","rules"])]),_:1}),s(d,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveMerchant.shop_size,"onUpdate:modelValue":e[10]||(e[10]=t=>this.saveMerchant.shop_size=t),label:"Shop Size"},null,8,["modelValue"])]),_:1}),s(d,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveMerchant.shop_type,"onUpdate:modelValue":e[11]||(e[11]=t=>this.saveMerchant.shop_type=t),label:"Shop Type"},null,8,["modelValue"])]),_:1}),s(d,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveMerchant.location,"onUpdate:modelValue":e[12]||(e[12]=t=>this.saveMerchant.location=t),label:"Location"},null,8,["modelValue"])]),_:1}),s(d,{md:"6",cols:"12"},{default:r(()=>[s(x,{modelValue:this.saveMerchant.sales_person,"onUpdate:modelValue":e[13]||(e[13]=t=>this.saveMerchant.sales_person=t),label:"Sales Person",items:this.salesdata,"item-value":"value","item-title":"text",rules:l.namerules,required:""},null,8,["modelValue","items","rules"])]),_:1}),s(d,{md:"6",cols:"12"},{default:r(()=>[s(x,{modelValue:this.saveMerchant.status,"onUpdate:modelValue":e[14]||(e[14]=t=>this.saveMerchant.status=t),label:"Status",items:["Active","Inactive"],required:""},null,8,["modelValue"])]),_:1}),s(d,{cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveMerchant.store_address,"onUpdate:modelValue":e[15]||(e[15]=t=>this.saveMerchant.store_address=t),label:"Store Address",rules:l.storerules},null,8,["modelValue","rules"])]),_:1}),s(d,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:r(()=>[s(M,{onClick:e[16]||(e[16]=t=>m.validateForm())},{default:r(()=>[p("Save")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),s(F,{modelValue:l.snackbar,"onUpdate:modelValue":e[18]||(e[18]=t=>l.snackbar=t),timeout:3500,color:l.color},{default:r(()=>[p(n(l.snackbarText),1)]),_:1},8,["modelValue","color"])])}const pe=w(j,[["render",_e]]),ve={components:{Viewmerchant:pe},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Merchant",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=L(),this.activeTab=z(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function Ve(a,e,_,v,l,m){const t=q("Viewmerchant");return c(),h("div",null,[s(Q,{modelValue:l.activeTab,"onUpdate:modelValue":e[0]||(e[0]=u=>l.activeTab=u),"show-arrows":""},{default:r(()=>[(c(!0),h(f,null,g(l.tabs,u=>(c(),y(W,{key:u.icon,value:u.tab},{default:r(()=>[s(C,{size:"20",start:"",icon:u.icon},null,8,["icon"]),p(" "+n(u.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),s(I),s(R,{modelValue:l.activeTab,"onUpdate:modelValue":e[1]||(e[1]=u=>l.activeTab=u),class:"mt-5 disable-tab-transition",touch:!1},{default:r(()=>[s(G,{value:"account"},{default:r(()=>[s(t)]),_:1})]),_:1},8,["modelValue"])])}const Ie=w(ve,[["render",Ve]]);export{Ie as default};