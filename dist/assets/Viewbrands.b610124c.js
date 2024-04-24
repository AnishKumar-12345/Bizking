import{_ as w,o as u,c,g as t,b7 as m,f as x,w as n,a as d,F as B,q as V,t as o,b,m as f,u as y,j as k,k as C,l as g,i as l,a4 as P,b9 as U,ac as L,bE as T,bo as S,v as I,e as q,s as A,r as N}from"./index.8231191f.js";import{s as O}from"./Services.51a388b5.js";import{V as i}from"./VTextField.88c661ca.js";import{V as z}from"./VChip.5b7a064d.js";import{V as D}from"./VTable.f4184a6e.js";import{V as F}from"./VPagination.03487076.js";import{V as R}from"./VForm.5023f7bf.js";import{V as E}from"./VSelect.db1650e9.js";import{V as K}from"./VDialog.43bdcf52.js";import{V as Q}from"./VSnackbar.feaa5578.js";import{V as M,a as G,b as W,c as j}from"./VWindowItem.5224bc07.js";import"./VCheckboxBtn.aa38394d.js";const Z={mixins:[O],data(){return{isProgress:!1,userRole:"",loading:!0,snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,dialog:!1,searchQuery:"",page:1,pageSize:10,Brands:[],dialog:!1,saveBrand:{brand_name:"",brand_code:"",brand_category:"",brand_connect:"",email_id:"",brand_id:"",status:"",owner_name:"",owner_phone:"",poc_name:"",poc_phone:"",gst:"",updated_date:"",created_date:"",decision_authority:"",address:"",location:"",area_pincode:"",bk_brand_poc:""},storerules:[a=>!!a||"Store Address is required"],uidrules:[a=>!!a||"UID is required"],BrandBKrules:[a=>!!a||"Brand POC From BK is required"],namerules:[a=>!!a||"Name is required",a=>/^[a-z A-Z]+$/.test(a)||"Only letters are allowed in the name"],gstrules:[a=>!!a||"GST is required"],pinrules:[a=>!!a||"PIN is required",a=>a&&/^\d{6}$/.test(a)||"PIN must be 6 digits"],emailRules:[a=>!!a||"Email is required",a=>/.+@.+\..+/.test(a)||"The email must be valid with the correct format: @ and . symbols"],phonerules:[a=>!!a||" Mobile  is required",a=>/^[0-9]+$/.test(a)||"only number are accepted",a=>a&&a.length<=10&&a.length>=10||"Mobile must be  10 number"],headers:[{text:"Brand Name",value:"brand_name"},{text:"Brand Code",value:"brand_code"},{text:"Brand Category",value:"brand_category"},{text:"Brand Connect",value:"brand_connect"},{text:"BK Brand POC",value:"bk_brand_poc"},{text:"Email",value:"email_id"},{text:"Status",value:"status"},{text:"Owner Name",value:"owner_name"},{text:"Owner Phone",value:"owner_phone"},{text:"Poc Name",value:"poc_name"},{text:"Poc Phone",value:"poc_phone"},{text:"GST",value:"gst"},{text:"Updated Date",value:"updated_date"},{text:"Onboarded Date",value:"created_date"},{text:"Address",value:"address"},{text:"Location",value:"location"},{text:"Area Pincode",value:"area_pincode"},{text:"Action",value:"actions"}]}},computed:{filteredBrands(){const a=this.searchQuery.toLowerCase().trim();return this.Brands.filter(e=>e.brand_name&&e.brand_name.toLowerCase().includes(a)||e.brand_code&&e.brand_code.toLowerCase().includes(a)||e.brand_category&&e.brand_category.toLowerCase().includes(a)||e.brand_connect&&e.brand_connect.toLowerCase().includes(a)||e.bk_brand_poc&&e.bk_brand_poc.toLowerCase().includes(a)||e.email_id&&e.email_id.toLowerCase().includes(a)||e.owner_name&&e.owner_name.toLowerCase().includes(a)||e.owner_phone&&e.owner_phone.toLowerCase().includes(a)||e.poc_name&&e.poc_name.toLowerCase().includes(a)||e.poc_phone&&e.poc_phone.toLowerCase().includes(a)||e.status&&e.status.toLowerCase().includes(a)||e.gst&&e.gst.toLowerCase().includes(a)||e.updated_date&&e.updated_date.toLowerCase().includes(a)||e.created_date&&e.created_date.toLowerCase().includes(a)||e.decision_authority&&e.decision_authority.toLowerCase().includes(a)||e.address&&e.address.toLowerCase().includes(a)||e.location&&e.location.toLowerCase().includes(a)||e.area_pincode&&e.area_pincode.toString().includes(a))},paginatedItems(){const a=(this.page-1)*this.pageSize,e=a+this.pageSize;return this.filteredBrands.slice().sort((v,r)=>new Date(r.created_date)-new Date(v.created_date)).slice(a,e)}},mounted(){this.userRole=localStorage.getItem("userRole"),this.getAllBrands().then(()=>{this.loading=!1}).catch(a=>{console.error("Error fetching merchants:",a)})},methods:{validateForm(){this.$refs.purchaseOrderForm.validate().then(a=>{a.valid==!0?this.UpdateBrand():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},UpdateBrand(){const a={brand_name:this.saveBrand.brand_name,area_pincode:this.saveBrand.area_pincode,gst:this.saveBrand.gst,poc_name:this.saveBrand.poc_name,poc_phone:this.saveBrand.poc_phone,owner_name:this.saveBrand.owner_name,owner_phone:this.saveBrand.owner_phone,location:this.saveBrand.location,address:this.saveBrand.address,brand_connect:this.saveBrand.brand_connect,brand_category:this.saveBrand.brand_category,email_id:this.saveBrand.email_id,bk_brand_poc:this.saveBrand.bk_brand_poc,brand_id:this.saveBrand.brand_id,status:this.saveBrand.status==="Active"?"1":"0"};console.log("post",a),this.isProgress=!0,this.updateBrands(a).then(e=>{e.data.status==1?(this.snackbarText=e.data.message,this.color="primary",this.snackbar=!0,this.dialog=!1,this.saveBrand={},this.getAllBrands(),this.isProgress=!1):(this.snackbarText=e.data.message,this.color="on-background",this.snackbar=!0,this.isProgress=!1)})},editBrand(a){console.log("brand",a),this.dialog=!0,this.saveBrand.brand_name=a.brand_name,this.saveBrand.brand_code=a.brand_code,this.saveBrand.brand_id=a.brand_id,this.saveBrand.brand_category=a.brand_category,this.saveBrand.brand_connect=a.brand_connect,this.saveBrand.email_id=a.email_id,this.saveBrand.status=a.status==1?"Active":"Inactive",this.saveBrand.owner_name=a.owner_name,this.saveBrand.owner_phone=a.owner_phone,this.saveBrand.poc_name=a.poc_name,this.saveBrand.poc_phone=a.poc_phone,this.saveBrand.gst=a.gst,this.saveBrand.updated_date=a.updated_date,this.saveBrand.created_date=a.created_date,this.saveBrand.decision_authority=a.decision_authority,this.saveBrand.address=a.address,this.saveBrand.location=a.location,this.saveBrand.area_pincode=a.area_pincode,this.saveBrand.bk_brand_poc=a.bk_brand_poc},resolveStatusVariant(a){return a==1?{color:"success"}:{color:"error"}},updatePagination(a){this.page=a},getAllBrands(){return new Promise((a,e)=>{this.getBrands().then(p=>{this.Brands=p.data,this.Brands.reverse(),a()}).catch(p=>{console.error("Error fetching merchants:",p),e(p)})})}}},H={key:0,style:{"max-width":"400px"}},J={key:1,id:"app"},X=T('<div id="loading-bg"><div class="loading-logo"><img src="'+S+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),Y=[X],$={key:0},ee=d("td",{colspan:"16",class:"text-center"},[d("h1",null,"No data found !")],-1),ae=[ee],se={class:"text-center"},te={class:"text-center"},re={class:"text-center"},ne={class:"text-center"},de={class:"text-center"},oe={class:"text-center"},le={class:"text-center"},ie={class:"text-center"},ue={class:"text-center"},ce={class:"text-center"},_e={class:"text-center"},he={class:"text-center"},pe={class:"text-center"},me={class:"text-center"},be={class:"text-center"},ve={class:"text-center"},Be={class:"text-center"},Ve={key:0,class:"text-center"};function fe(a,e,p,v,r,h){return u(),c("div",null,[this.Brands!=null?(u(),c("div",H,[t(i,{class:"mb-3",modelValue:r.searchQuery,"onUpdate:modelValue":e[0]||(e[0]=s=>r.searchQuery=s),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])])):m("",!0),r.loading?(u(),c("div",J,Y)):m("",!0),this.Brands!=null?(u(),x(D,{key:2,headers:r.headers,items:a.merchants,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:n(()=>[d("thead",null,[d("tr",null,[(u(!0),c(B,null,V(r.headers,s=>(u(),c("th",{class:"text-center",key:s},o(s.text),1))),128))])]),d("tbody",null,[h.filteredBrands.length===0?(u(),c("tr",$,ae)):m("",!0),(u(!0),c(B,null,V(h.paginatedItems,(s,_)=>(u(),c("tr",{key:_},[d("td",se,o(s.brand_name),1),d("td",te,o(s.brand_code),1),d("td",re,o(s.brand_category),1),d("td",ne,o(s.brand_connect),1),d("td",de,o(s.bk_brand_poc),1),d("td",oe,o(s.email_id),1),d("td",le,[t(z,{color:h.resolveStatusVariant(s.status).color,class:"font-weight-medium",size:"small"},{default:n(()=>[b(o(s.status==1?"Active":"Inactive"),1)]),_:2},1032,["color"])]),d("td",ie,o(s.owner_name),1),d("td",ue,o(s.owner_phone),1),d("td",ce,o(s.poc_name),1),d("td",_e,o(s.poc_phone),1),d("td",he,o(s.gst),1),d("td",pe,o(s.updated_date),1),d("td",me,o(s.created_date),1),d("td",be,o(s.address),1),d("td",ve,o(s.location),1),d("td",Be,o(s.area_pincode),1),this.userRole!="Brand Management"?(u(),c("td",Ve,[t(f,{icon:"",variant:"text",color:"default",class:"mb-1 mt-2",size:"x-small",style:{"margin-left":"auto",display:"block"},onClick:ye=>h.editBrand(s)},{default:n(()=>[t(y,{icon:"ri-pencil-line",size:"22",color:"#BA8B32"})]),_:2},1032,["onClick"])])):m("",!0)]))),128))])]),_:1},8,["headers","items"])):m("",!0),t(F,{modelValue:r.page,"onUpdate:modelValue":e[1]||(e[1]=s=>r.page=s),length:Math.ceil(h.filteredBrands.length/r.pageSize),onInput:h.updatePagination},null,8,["modelValue","length","onInput"]),t(K,{modelValue:r.dialog,"onUpdate:modelValue":e[17]||(e[17]=s=>r.dialog=s),"max-width":"1000"},{default:n(()=>[t(k,{title:"Update Brand",class:"mb-2"},{default:n(()=>[t(C,null,{default:n(()=>[t(g,null,{default:n(()=>[t(l,{cols:"12"},{default:n(()=>[t(R,{class:"mt-6",ref:"purchaseOrderForm"},{default:n(()=>[t(g,null,{default:n(()=>[t(l,{cols:"12",md:"6"},{default:n(()=>[t(i,{modelValue:this.saveBrand.brand_name,"onUpdate:modelValue":e[2]||(e[2]=s=>this.saveBrand.brand_name=s),label:"Brand Name",rules:r.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),t(l,{cols:"12",md:"6"},{default:n(()=>[t(i,{modelValue:this.saveBrand.email_id,"onUpdate:modelValue":e[3]||(e[3]=s=>this.saveBrand.email_id=s),label:"Email",rules:r.emailRules,required:""},null,8,["modelValue","rules"])]),_:1}),t(l,{md:"6",cols:"12"},{default:n(()=>[t(i,{modelValue:this.saveBrand.gst,"onUpdate:modelValue":e[4]||(e[4]=s=>this.saveBrand.gst=s),label:"GST",rules:r.gstrules},null,8,["modelValue","rules"])]),_:1}),t(l,{md:"6",cols:"12"},{default:n(()=>[t(i,{modelValue:this.saveBrand.area_pincode,"onUpdate:modelValue":e[5]||(e[5]=s=>this.saveBrand.area_pincode=s),rules:r.pinrules,type:"number",label:"Area Pin Code"},null,8,["modelValue","rules"])]),_:1}),t(l,{md:"6",cols:"12"},{default:n(()=>[t(i,{modelValue:this.saveBrand.owner_name,"onUpdate:modelValue":e[6]||(e[6]=s=>this.saveBrand.owner_name=s),label:"Owner Name",rules:r.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),t(l,{md:"6",cols:"12"},{default:n(()=>[t(i,{modelValue:this.saveBrand.owner_phone,"onUpdate:modelValue":e[7]||(e[7]=s=>this.saveBrand.owner_phone=s),label:"Owner Phone",rules:r.phonerules,required:""},null,8,["modelValue","rules"])]),_:1}),t(l,{md:"6",cols:"12"},{default:n(()=>[t(i,{modelValue:this.saveBrand.poc_name,"onUpdate:modelValue":e[8]||(e[8]=s=>this.saveBrand.poc_name=s),rules:r.namerules,label:"POC Name"},null,8,["modelValue","rules"])]),_:1}),t(l,{md:"6",cols:"12"},{default:n(()=>[t(i,{modelValue:this.saveBrand.poc_phone,"onUpdate:modelValue":e[9]||(e[9]=s=>this.saveBrand.poc_phone=s),rules:r.phonerules,label:"POC Phone"},null,8,["modelValue","rules"])]),_:1}),t(l,{md:"6",cols:"12"},{default:n(()=>[t(i,{modelValue:this.saveBrand.location,"onUpdate:modelValue":e[10]||(e[10]=s=>this.saveBrand.location=s),label:"Location"},null,8,["modelValue"])]),_:1}),t(l,{md:"6",cols:"12"},{default:n(()=>[t(i,{modelValue:this.saveBrand.brand_connect,"onUpdate:modelValue":e[11]||(e[11]=s=>this.saveBrand.brand_connect=s),label:"Brand Connect",required:""},null,8,["modelValue"])]),_:1}),t(l,{md:"6",cols:"12"},{default:n(()=>[t(i,{modelValue:this.saveBrand.brand_category,"onUpdate:modelValue":e[12]||(e[12]=s=>this.saveBrand.brand_category=s),label:"Brand Category",required:""},null,8,["modelValue"])]),_:1}),t(l,{md:"6",cols:"12"},{default:n(()=>[t(E,{modelValue:this.saveBrand.status,"onUpdate:modelValue":e[13]||(e[13]=s=>this.saveBrand.status=s),label:"Status",items:["Active","Inactive"],required:""},null,8,["modelValue"])]),_:1}),t(l,{md:"6",cols:"12"},{default:n(()=>[t(i,{modelValue:this.saveBrand.address,"onUpdate:modelValue":e[14]||(e[14]=s=>this.saveBrand.address=s),label:"Brand Address"},null,8,["modelValue"])]),_:1}),t(l,{md:"6",cols:"12"},{default:n(()=>[t(i,{modelValue:this.saveBrand.bk_brand_poc,"onUpdate:modelValue":e[15]||(e[15]=s=>this.saveBrand.bk_brand_poc=s),label:"Brand POC From BK",rules:r.BrandBKrules},null,8,["modelValue","rules"])]),_:1}),t(l,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:n(()=>[t(f,{onClick:e[16]||(e[16]=s=>h.validateForm())},{default:n(()=>[b("Save")]),_:1})]),_:1}),P(t(U,{size:50,color:"primary",indeterminate:""},null,512),[[L,r.isProgress]])]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),t(Q,{modelValue:r.snackbar,"onUpdate:modelValue":e[18]||(e[18]=s=>r.snackbar=s),timeout:3500,color:r.color},{default:n(()=>[b(o(r.snackbarText),1)]),_:1},8,["modelValue","color"])])}const ge=w(Z,[["render",fe]]),we={components:{Viewbranddetails:ge},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Brand",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=I(),this.activeTab=q(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function xe(a,e,p,v,r,h){const s=N("Viewbranddetails");return u(),c("div",null,[t(M,{modelValue:r.activeTab,"onUpdate:modelValue":e[0]||(e[0]=_=>r.activeTab=_),"show-arrows":""},{default:n(()=>[(u(!0),c(B,null,V(r.tabs,_=>(u(),x(j,{key:_.icon,value:_.tab},{default:n(()=>[t(y,{size:"20",start:"",icon:_.icon},null,8,["icon"]),b(" "+o(_.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),t(A),t(W,{modelValue:r.activeTab,"onUpdate:modelValue":e[1]||(e[1]=_=>r.activeTab=_),class:"mt-5 disable-tab-transition",touch:!1},{default:n(()=>[t(G,{value:"account"},{default:n(()=>[t(s)]),_:1})]),_:1},8,["modelValue"])])}const ze=w(we,[["render",xe]]);export{ze as default};