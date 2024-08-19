import{_ as y,o as c,c as u,g as s,b8 as p,f as w,w as r,a as o,F as B,q as g,t as d,b,m as V,u as x,j as C,k,l as f,i as l,a4 as L,b9 as P,ac as U,bo as I,bp as S,v as T,e as q,s as N,r as A}from"./index.0a02293b.js";import{s as D}from"./Services.9766e40c.js";import{V as i}from"./VTextField.a38e65d3.js";import{V as O}from"./VChip.3f90d630.js";import{V as z}from"./VTable.0b86f51f.js";import{V as F}from"./VPagination.1ff8ffb7.js";import{V as R}from"./VForm.cf677e9c.js";import{V as E}from"./VAutocomplete.90a8efe2.js";import{V as K}from"./VSelect.e762c033.js";import{V as Q}from"./VDialog.be0fa08a.js";import{V as M}from"./VSnackbar.47b8f9db.js";import{V as G,a as W,b as j,c as Z}from"./VWindowItem.47cd302a.js";import"./VCounter.0e4a7297.js";import"./VCheckboxBtn.1c3b42ae.js";const H={mixins:[D],data(){return{isProgress:!1,userRole:"",loading:!0,snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,dialog:!1,searchQuery:"",page:1,pageSize:10,Brands:[],dialog:!1,locationrules:[a=>!!a||"Branch Name is required"],locationsdata:[],saveBrand:{brand_name:"",brand_code:"",brand_category:"",brand_connect:"",email_id:"",brand_id:"",status:"",owner_name:"",owner_phone:"",poc_name:"",poc_phone:"",gst:"",updated_date:"",created_date:"",decision_authority:"",address:"",location:"",area_pincode:"",bk_brand_poc:"",city_id:""},storerules:[a=>!!a||"Store Address is required"],uidrules:[a=>!!a||"UID is required"],BrandBKrules:[a=>!!a||"Brand POC From BK is required"],namerules:[a=>!!a||"Name is required",a=>/^[a-z A-Z]+$/.test(a)||"Only letters are allowed in the name"],gstrules:[a=>!!a||"GST is required"],pinrules:[a=>!!a||"PIN is required",a=>a&&/^\d{6}$/.test(a)||"PIN must be 6 digits"],emailRules:[a=>!!a||"Email is required",a=>/.+@.+\..+/.test(a)||"The email must be valid with the correct format: @ and . symbols"],phonerules:[a=>!!a||" Mobile  is required",a=>/^[0-9]+$/.test(a)||"only number are accepted",a=>a&&a.length<=10&&a.length>=10||"Mobile must be  10 number"],cityID:"",locationid:"",headers:[{text:"City Name",value:"branch"},{text:"Brand Name",value:"brand_name"},{text:"Brand Code",value:"brand_code"},{text:"Brand Category",value:"brand_category"},{text:"Brand Connect",value:"brand_connect"},{text:"BK Brand POC",value:"bk_brand_poc"},{text:"Email",value:"email_id"},{text:"Status",value:"status"},{text:"Owner Name",value:"owner_name"},{text:"Owner Phone",value:"owner_phone"},{text:"Poc Name",value:"poc_name"},{text:"Poc Phone",value:"poc_phone"},{text:"GST",value:"gst"},{text:"Updated Date",value:"updated_date"},{text:"Onboarded Date",value:"created_date"},{text:"Address",value:"address"},{text:"Location",value:"location"},{text:"Area Pincode",value:"area_pincode"},{text:"Action",value:"actions"}]}},computed:{filteredBrands(){const a=this.searchQuery.toLowerCase().trim();return this.Brands.filter(e=>e.branch&&e.branch.toLowerCase().includes(a)||e.brand_name&&e.brand_name.toLowerCase().includes(a)||e.brand_code&&e.brand_code.toLowerCase().includes(a)||e.brand_category&&e.brand_category.toLowerCase().includes(a)||e.brand_connect&&e.brand_connect.toLowerCase().includes(a)||e.bk_brand_poc&&e.bk_brand_poc.toLowerCase().includes(a)||e.email_id&&e.email_id.toLowerCase().includes(a)||e.owner_name&&e.owner_name.toLowerCase().includes(a)||e.owner_phone&&e.owner_phone.toLowerCase().includes(a)||e.poc_name&&e.poc_name.toLowerCase().includes(a)||e.poc_phone&&e.poc_phone.toLowerCase().includes(a)||e.status&&e.status.toLowerCase().includes(a)||e.gst&&e.gst.toLowerCase().includes(a)||e.updated_date&&e.updated_date.toLowerCase().includes(a)||e.created_date&&e.created_date.toLowerCase().includes(a)||e.decision_authority&&e.decision_authority.toLowerCase().includes(a)||e.address&&e.address.toLowerCase().includes(a)||e.location&&e.location.toLowerCase().includes(a)||e.area_pincode&&e.area_pincode.toString().includes(a))},paginatedItems(){const a=(this.page-1)*this.pageSize,e=a+this.pageSize;return this.filteredBrands.slice().sort((v,n)=>new Date(n.created_date)-new Date(v.created_date)).slice(a,e)}},mounted(){this.cityID=localStorage.getItem("city_id"),this.locationID=localStorage.getItem("location_id"),this.getBranchnames(),this.userRole=localStorage.getItem("userRole"),this.getAllBrands().then(()=>{this.loading=!1}).catch(a=>{console.error("Error fetching merchants:",a)})},methods:{getcitylocationSelection(){this.getCitylocation(this.cityID).then(a=>{this.cityLoaction=a.data.data.map(e=>({value:e.location_id,text:e.location})),console.log("ceck tye res",this.cityLoaction)})},getBranchnames(){this.Locationdata().then(a=>{this.locationsdata=a.data.data.map(e=>({value:e.city_id,text:e.city})),console.log("ceck tye res",this.locationsdata)})},validateForm(){this.$refs.purchaseOrderForm.validate().then(a=>{a.valid==!0?this.UpdateBrand():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},UpdateBrand(){const a={brand_name:this.saveBrand.brand_name,area_pincode:this.saveBrand.area_pincode,gst:this.saveBrand.gst,poc_name:this.saveBrand.poc_name,poc_phone:this.saveBrand.poc_phone,owner_name:this.saveBrand.owner_name,owner_phone:this.saveBrand.owner_phone,location:this.saveBrand.location,address:this.saveBrand.address,brand_connect:this.saveBrand.brand_connect,brand_category:this.saveBrand.brand_category,email_id:this.saveBrand.email_id,bk_brand_poc:this.saveBrand.bk_brand_poc,brand_id:this.saveBrand.brand_id,city_id:this.saveBrand.city_id,status:this.saveBrand.status==="Active"?"1":"0"};console.log("post",a),this.isProgress=!0,this.updateBrands(a).then(e=>{e.data.status==1?(this.snackbarText=e.data.message,this.color="primary",this.snackbar=!0,this.dialog=!1,this.saveBrand={},this.getAllBrands(),this.isProgress=!1):(this.snackbarText=e.data.message,this.color="on-background",this.snackbar=!0,this.isProgress=!1)})},editBrand(a){var e;console.log("brand",a),this.dialog=!0,this.saveBrand.brand_name=a.brand_name,this.saveBrand.brand_code=a.brand_code,this.saveBrand.brand_id=a.brand_id,this.saveBrand.brand_category=a.brand_category,this.saveBrand.brand_connect=a.brand_connect,this.saveBrand.email_id=a.email_id,this.saveBrand.status=a.status==1?"Active":"Inactive",this.saveBrand.owner_name=a.owner_name,this.saveBrand.owner_phone=a.owner_phone,this.saveBrand.poc_name=a.poc_name,this.saveBrand.poc_phone=a.poc_phone,this.saveBrand.gst=a.gst,this.saveBrand.updated_date=a.updated_date,this.saveBrand.created_date=a.created_date,this.saveBrand.decision_authority=a.decision_authority,this.saveBrand.address=a.address,this.saveBrand.location=a.location,this.saveBrand.area_pincode=a.area_pincode,this.saveBrand.bk_brand_poc=a.bk_brand_poc,this.saveBrand.city_id=((e=this.locationsdata.find(h=>h.text===a.city))==null?void 0:e.value)||a.city},resolveStatusVariant(a){return a==1?{color:"success"}:{color:"error"}},updatePagination(a){this.page=a},getAllBrands(){return new Promise((a,e)=>{this.getBrands(this.cityID,this.locationID).then(h=>{this.Brands=h.data,this.Brands.reverse(),a()}).catch(h=>{console.error("Error fetching merchants:",h),e(h)})})}}},J={key:0,style:{"max-width":"400px"}},X={key:1,id:"app"},Y=I('<div id="loading-bg"><div class="loading-logo"><img src="'+S+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),$=[Y],ee={key:0},ae=o("td",{colspan:"16",class:"text-center"},[o("h1",null,"No data found !")],-1),te=[ae],se={class:"text-center"},ne={class:"text-center"},re={class:"text-center"},oe={class:"text-center"},de={class:"text-center"},le={class:"text-center"},ie={class:"text-center"},ce={class:"text-center"},ue={class:"text-center"},_e={class:"text-center"},he={class:"text-center"},me={class:"text-center"},pe={class:"text-center"},be={class:"text-center"},ve={class:"text-center"},Be={class:"text-center"},ge={class:"text-center"},Ve={class:"text-center"},fe={key:0,class:"text-center"};function ye(a,e,h,v,n,m){return c(),u("div",null,[this.Brands!=null?(c(),u("div",J,[s(i,{class:"mb-3",modelValue:n.searchQuery,"onUpdate:modelValue":e[0]||(e[0]=t=>n.searchQuery=t),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])])):p("",!0),n.loading?(c(),u("div",X,$)):p("",!0),this.Brands!=null?(c(),w(z,{key:2,headers:n.headers,items:a.merchants,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:r(()=>[o("thead",null,[o("tr",null,[(c(!0),u(B,null,g(n.headers,t=>(c(),u("th",{class:"text-center",key:t},d(t.text),1))),128))])]),o("tbody",null,[m.filteredBrands.length===0?(c(),u("tr",ee,te)):p("",!0),(c(!0),u(B,null,g(m.paginatedItems,(t,_)=>(c(),u("tr",{key:_},[o("td",se,d(t.city),1),o("td",ne,d(t.brand_name),1),o("td",re,d(t.brand_code),1),o("td",oe,d(t.brand_category),1),o("td",de,d(t.brand_connect),1),o("td",le,d(t.bk_brand_poc),1),o("td",ie,d(t.email_id),1),o("td",ce,[s(O,{color:m.resolveStatusVariant(t.status).color,class:"font-weight-medium",size:"small"},{default:r(()=>[b(d(t.status==1?"Active":"Inactive"),1)]),_:2},1032,["color"])]),o("td",ue,d(t.owner_name),1),o("td",_e,d(t.owner_phone),1),o("td",he,d(t.poc_name),1),o("td",me,d(t.poc_phone),1),o("td",pe,d(t.gst),1),o("td",be,d(t.updated_date),1),o("td",ve,d(t.created_date),1),o("td",Be,d(t.address),1),o("td",ge,d(t.location),1),o("td",Ve,d(t.area_pincode),1),this.userRole!="Brand Management"?(c(),u("td",fe,[s(V,{icon:"",variant:"text",color:"default",class:"mb-1 mt-2",size:"x-small",style:{"margin-left":"auto",display:"block"},onClick:ke=>m.editBrand(t)},{default:r(()=>[s(x,{icon:"ri-pencil-line",size:"22",color:"#BA8B32"})]),_:2},1032,["onClick"])])):p("",!0)]))),128))])]),_:1},8,["headers","items"])):p("",!0),s(F,{modelValue:n.page,"onUpdate:modelValue":e[1]||(e[1]=t=>n.page=t),length:Math.ceil(m.filteredBrands.length/n.pageSize),onInput:m.updatePagination},null,8,["modelValue","length","onInput"]),s(Q,{modelValue:n.dialog,"onUpdate:modelValue":e[18]||(e[18]=t=>n.dialog=t),"max-width":"1000"},{default:r(()=>[s(C,{title:"Update Brand",class:"mb-2"},{default:r(()=>[s(k,null,{default:r(()=>[s(f,null,{default:r(()=>[s(l,{cols:"12"},{default:r(()=>[s(R,{class:"mt-6",ref:"purchaseOrderForm"},{default:r(()=>[s(f,null,{default:r(()=>[s(l,{cols:"12",md:"6"},{default:r(()=>[s(E,{modelValue:this.saveBrand.city_id,"onUpdate:modelValue":e[2]||(e[2]=t=>this.saveBrand.city_id=t),label:"City Names",items:n.locationsdata,"item-title":"text","item-value":"value",rules:n.locationrules,required:"",readonly:""},null,8,["modelValue","items","rules"])]),_:1}),s(l,{cols:"12",md:"6"},{default:r(()=>[s(i,{modelValue:this.saveBrand.brand_name,"onUpdate:modelValue":e[3]||(e[3]=t=>this.saveBrand.brand_name=t),label:"Brand Name",rules:n.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),s(l,{cols:"12",md:"6"},{default:r(()=>[s(i,{modelValue:this.saveBrand.email_id,"onUpdate:modelValue":e[4]||(e[4]=t=>this.saveBrand.email_id=t),label:"Email",rules:n.emailRules,required:""},null,8,["modelValue","rules"])]),_:1}),s(l,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveBrand.gst,"onUpdate:modelValue":e[5]||(e[5]=t=>this.saveBrand.gst=t),label:"GST",rules:n.gstrules},null,8,["modelValue","rules"])]),_:1}),s(l,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveBrand.area_pincode,"onUpdate:modelValue":e[6]||(e[6]=t=>this.saveBrand.area_pincode=t),rules:n.pinrules,type:"number",label:"Area Pin Code"},null,8,["modelValue","rules"])]),_:1}),s(l,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveBrand.owner_name,"onUpdate:modelValue":e[7]||(e[7]=t=>this.saveBrand.owner_name=t),label:"Owner Name",rules:n.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),s(l,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveBrand.owner_phone,"onUpdate:modelValue":e[8]||(e[8]=t=>this.saveBrand.owner_phone=t),label:"Owner Phone",rules:n.phonerules,required:""},null,8,["modelValue","rules"])]),_:1}),s(l,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveBrand.poc_name,"onUpdate:modelValue":e[9]||(e[9]=t=>this.saveBrand.poc_name=t),rules:n.namerules,label:"POC Name"},null,8,["modelValue","rules"])]),_:1}),s(l,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveBrand.poc_phone,"onUpdate:modelValue":e[10]||(e[10]=t=>this.saveBrand.poc_phone=t),rules:n.phonerules,label:"POC Phone"},null,8,["modelValue","rules"])]),_:1}),s(l,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveBrand.location,"onUpdate:modelValue":e[11]||(e[11]=t=>this.saveBrand.location=t),label:"Location"},null,8,["modelValue"])]),_:1}),s(l,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveBrand.brand_connect,"onUpdate:modelValue":e[12]||(e[12]=t=>this.saveBrand.brand_connect=t),label:"Brand Connect",required:""},null,8,["modelValue"])]),_:1}),s(l,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveBrand.brand_category,"onUpdate:modelValue":e[13]||(e[13]=t=>this.saveBrand.brand_category=t),label:"Brand Category",required:""},null,8,["modelValue"])]),_:1}),s(l,{md:"6",cols:"12"},{default:r(()=>[s(K,{modelValue:this.saveBrand.status,"onUpdate:modelValue":e[14]||(e[14]=t=>this.saveBrand.status=t),label:"Status",items:["Active","Inactive"],required:""},null,8,["modelValue"])]),_:1}),s(l,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveBrand.address,"onUpdate:modelValue":e[15]||(e[15]=t=>this.saveBrand.address=t),label:"Brand Address"},null,8,["modelValue"])]),_:1}),s(l,{md:"6",cols:"12"},{default:r(()=>[s(i,{modelValue:this.saveBrand.bk_brand_poc,"onUpdate:modelValue":e[16]||(e[16]=t=>this.saveBrand.bk_brand_poc=t),label:"Brand POC From BK",rules:n.BrandBKrules},null,8,["modelValue","rules"])]),_:1}),s(l,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:r(()=>[s(V,{onClick:e[17]||(e[17]=t=>m.validateForm())},{default:r(()=>[b("Save")]),_:1})]),_:1}),L(s(P,{size:50,color:"primary",indeterminate:""},null,512),[[U,n.isProgress]])]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),s(M,{modelValue:n.snackbar,"onUpdate:modelValue":e[19]||(e[19]=t=>n.snackbar=t),timeout:3500,color:n.color},{default:r(()=>[b(d(n.snackbarText),1)]),_:1},8,["modelValue","color"])])}const we=y(H,[["render",ye]]),xe={components:{Viewbranddetails:we},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Brand",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=T(),this.activeTab=q(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function Ce(a,e,h,v,n,m){const t=A("Viewbranddetails");return c(),u("div",null,[s(G,{modelValue:n.activeTab,"onUpdate:modelValue":e[0]||(e[0]=_=>n.activeTab=_),"show-arrows":""},{default:r(()=>[(c(!0),u(B,null,g(n.tabs,_=>(c(),w(Z,{key:_.icon,value:_.tab},{default:r(()=>[s(x,{size:"20",start:"",icon:_.icon},null,8,["icon"]),b(" "+d(_.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),s(N),s(j,{modelValue:n.activeTab,"onUpdate:modelValue":e[1]||(e[1]=_=>n.activeTab=_),class:"mt-5 disable-tab-transition",touch:!1},{default:r(()=>[s(W,{value:"account"},{default:r(()=>[s(t)]),_:1})]),_:1},8,["modelValue"])])}const Ee=y(xe,[["render",Ce]]);export{Ee as default};
