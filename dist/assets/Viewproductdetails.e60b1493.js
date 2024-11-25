import{_ as S,o as m,c as g,g as r,b8 as p,f as V,w as l,i,j as k,k as w,b as f,l as v,a as n,F as y,q as x,t as u,m as P,u as C,bp as T,bq as U,v as B,e as z,r as I,s as M}from"./index.08705643.js";import{s as D}from"./Services.f9e4372b.js";import{V as c}from"./VTextField.0584a3e6.js";import{V as q,a as L}from"./VAlert.f038ed8b.js";import{V as N}from"./VChip.cd0ade04.js";import{V as G}from"./VTable.eda8fa83.js";import{V as F}from"./VPagination.f3ba474e.js";import{V as R}from"./VForm.eec84c64.js";import{V as b}from"./VAutocomplete.457394fd.js";import{V as K}from"./VSelect.00b3ff1f.js";import{V as W}from"./VDialog.54dfbcf0.js";import{V as A}from"./VSnackbar.89c018e7.js";import{V as O,a as H,b as Q,c as E}from"./VWindowItem.2d182e11.js";import"./VCounter.d136124c.js";import"./VCheckboxBtn.770726d6.js";const j={mixins:[D],data(){return{cityID:"",locationid:"",maxPaginationPages:5,storerules:[t=>!!t||"Store Address is required"],mrprules:[t=>!!t||"MRP is required"],namerules:[t=>!!t||"Name is required"],uomRules:[t=>!!t||"UOM is required"],locationrules:[t=>!!t||"City Name is required"],locationrules2:[t=>!!t||"City Location Name is required"],pinrules:[t=>!!t||"PIN is required"],phonerules:[t=>!!t||" Mobile  is required",t=>/^[0-9]+$/.test(t)||"only number are accepted",t=>t&&t.length<=10&&t.length>=10||"Mobile must be  10 number"],cityLoaction:[],locationsdata:[],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,UserType:"",dialog:!1,loading:!0,searchQuery:"",page:1,pageSize:10,products:[],saveProduct:{merchant_uid:"",brand_name:"",sku_name:"",uom:"",hsn_code:"",mrp:"",status:"",brand_id:"",brand_product_id:"",total_given_margin:"",sgst:"",cgst:"",pitch_from:"",final_retail_cp:"",final_ret:"",bk_profit:"",bizkingz_cp_final:"",bc_margin_amt:"",city_id:"",location_id:"",bc_margin:""},salesdata:[],BrandNames:[],selectedBrand:null,userRole:"",createdby:"",headers:[{text:"City Name",value:"city"},{text:"Location",value:"location"},{text:"Brand Name",value:"brand_name"},{text:"SKU Name",value:"sku_name"},{text:"UOM",value:"uom"},{text:"HSN Code",value:"hsn_code"},{text:"MRP",value:"mrp"},{text:"Status",value:"status"},{text:"Total Given Margin",value:"total_given_margin"},{text:"SGST",value:"sgst"},{text:"CGST",value:"cgst"},{text:"Pitch From",value:"pitch_from"},{text:"Final Retail CP",value:"final_retail_cp"},{text:"Final Retail",value:"final_ret"},{text:"BK Profit",value:"bk_profit"},{text:"Bizking CP Final",value:"bizkingz_cp_final"},{text:"BC Margin Amount",value:"bc_margin_amt"},{text:"BC Margin",value:"bc_margin"},{text:"Action",value:"actions"}]}},computed:{filteredProducts(){const t=this.searchQuery.toLowerCase().trim();return this.products.filter(e=>e.city&&e.city.toLowerCase().includes(t)||e.location&&e.location.toLowerCase().includes(t)||e.brand_name&&e.brand_name.toLowerCase().includes(t)||e.sku_name&&e.sku_name.toLowerCase().includes(t)||e.uom&&e.uom.toLowerCase().includes(t)||e.hsn_code&&e.hsn_code.toString().includes(t)||e.mrp&&e.mrp.toString().includes(t)||e.status&&e.status.toLowerCase().includes(t)||e.total_given_margin&&e.total_given_margin.toString().includes(t)||e.sgst&&e.sgst.toLowerCase().includes(t)||e.cgst&&e.cgst.toLowerCase().includes(t)||e.pitch_from&&e.pitch_from.toLowerCase().includes(t)||e.final_retail_cp&&e.final_retail_cp.toString().includes(t)||e.final_ret&&e.final_ret.toLowerCase().includes(t)||e.bk_profit&&e.bk_profit.toString().includes(t)||e.bizkingz_cp_final&&e.bizkingz_cp_final.toString().includes(t)||e.bc_margin_amt&&e.bc_margin_amt.toString().includes(t)||e.bc_margin&&e.bc_margin.toLowerCase().includes(t))},paginatedItems(){const t=(this.page-1)*this.pageSize,e=t+this.pageSize;return this.filteredProducts.slice(t,e)}},watch:{"saveProduct.city_id":function(t,e){t!==e&&this.handleBrandSelection(t)}},mounted(){this.cityID=localStorage.getItem("city_id"),this.locationID=localStorage.getItem("location_id"),this.userRole=localStorage.getItem("userRole"),this.UserType=localStorage.getItem("user_type"),console.log("check the user type",this.UserType),this.getBranchnames(),this.getBranddetails(),this.getProductsdata().then(()=>{this.loading=!1}).catch(t=>{console.error("Error fetching merchants:",t)})},methods:{handleBrandSelection(t){console.log("check hjandle",t),this.getCitylocation(t).then(e=>{this.cityLoaction=e.data.data.map(d=>({value:d.location_id,text:d.location})),console.log("ceck tye res",this.cityLoaction)})},getBranchnames(){this.Locationdata().then(t=>{this.locationsdata=t.data.data.map(e=>({value:e.city_id,text:e.city})),console.log("ceck tye res",this.locationsdata)})},preventPaste(t){const d=(t.clipboardData||window.clipboardData).getData("text");/^[0-9]+$/.test(d)||t.preventDefault()},preventDecimal(t){(t.key===","||t.key==="+"||t.key==="-"||t.keyCode===189||t.keyCode===109)&&t.preventDefault()},computedbcmargin(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"BC margin is required",e=>e.startsWith("0%")?e==="0%"||"Must include a numerical value with a percentage symbol.":t(e)||"Must include a numerical value with a percentage symbol"]},updatebcmargin(t){t==="0%"||t==="0"?this.saveProduct.bc_margin="0%":t.startsWith("0%")?this.saveProduct.bc_margin="0%":this.saveProduct.bc_margin=t},computedSGST(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"SGST is required",e=>e.startsWith("0%")?e==="0%"||"Must include a numerical value with a percentage symbol.":t(e)||"Must include a numerical value with a percentage symbol"]},updateSGST(t){t==="0%"||t==="0"?this.saveProduct.sgst="0%":t.startsWith("0%")?this.saveProduct.sgst="0%":this.saveProduct.sgst=t},computedCGST(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"CGST is required",e=>e.startsWith("0%")?e==="0%"||"Must include a numerical value with a percentage symbol.":t(e)||"Must include a numerical value with a percentage symbol"]},updateCGST(t){t==="0%"||t==="0"?this.saveProduct.cgst="0%":t.startsWith("0%")?this.saveProduct.cgst="0%":this.saveProduct.cgst=t},computedFinalret(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"Final Ret is required",e=>e.startsWith("0%")?e==="0%"||"Must include a numerical value with a percentage symbol.":t(e)||"Must include a numerical value with a percentage symbol"]},updateFinalret(t){t==="0%"||t==="0"?this.saveProduct.final_ret="0%":t.startsWith("0%")?this.saveProduct.final_ret="0%":this.saveProduct.final_ret=t},computedPitchRules(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"Pitch From is required",e=>e.startsWith("0%")?e==="0%"||"Must include a numerical value with a percentage symbol.":t(e)||"Must include a numerical value with a percentage symbol"]},updatePitchfrom(t){t==="0%"||t==="0"?this.saveProduct.pitch_from="0%":t.startsWith("0%")?this.saveProduct.pitch_from="0%":this.saveProduct.pitch_from=t},computedTGMRules(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"Total Given Margin is required",e=>e.startsWith("0%")?e==="0%"||"Must include a numerical value with a percentage symbol.":t(e)||"Must include a numerical value with a percentage symbol"]},updateTotalGivenMargin(t){t==="0%"||t==="0"?this.saveProduct.total_given_margin="0%":t.startsWith("0%")?this.saveProduct.total_given_margin="0%":this.saveProduct.total_given_margin=t},validateForm(){this.$refs.purchaseOrderForm.validate().then(t=>{t.valid==!0?this.UpdateProduct():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},UpdateProduct(){const t={brand_id:this.saveProduct.brand_id,brand_name:this.saveProduct.brand_name,brand_product_id:this.saveProduct.brand_product_id,sku_name:this.saveProduct.sku_name,uom:this.saveProduct.uom,hsn_code:this.saveProduct.hsn_code,mrp:this.saveProduct.mrp,total_given_margin:this.saveProduct.total_given_margin,bizkingz_cp_final:this.saveProduct.bizkingz_cp_final,pitch_from:this.saveProduct.pitch_from,final_ret:this.saveProduct.final_ret,final_retail_cp:this.saveProduct.final_retail_cp,bc_margin:this.saveProduct.bc_margin,bc_margin_amt:this.saveProduct.bc_margin_amt,bk_profit:this.saveProduct.bk_profit,cgst:this.saveProduct.cgst,sgst:this.saveProduct.sgst,city_id:this.saveProduct.city_id,location_id:this.saveProduct.location_id,status:this.saveProduct.status==="Active"?"1":"0"};console.log("post",t),this.updateProducts(t).then(e=>{e.data.status==1?(this.snackbarText=e.data.message,this.color="primary",this.snackbar=!0,this.dialog=!1,this.saveProduct={},this.getProductsdata()):(this.snackbarText=e.data.message,this.color="on-background",this.snackbar=!0)})},closeDialog(){this.dialog=!1},editProduct(t){var e,d;console.log("check the edit",t),this.dialog=!0,this.saveProduct.city_id=((e=this.locationsdata.find(_=>_.value===t.city_id))==null?void 0:e.value)||t.city_id,this.saveProduct.location_id=((d=this.cityLoaction.find(_=>_.value===t.location_id))==null?void 0:d.value)||t.location_id,this.saveProduct.brand_name=t.brand_name,this.saveProduct.brand_id=t.brand_id,this.saveProduct.brand_product_id=t.brand_product_id,this.saveProduct.sku_name=t.sku_name,this.saveProduct.uom=t.uom,this.saveProduct.hsn_code=t.hsn_code,this.saveProduct.mrp=t.mrp,this.saveProduct.status=t.status==1?"Active":"Inactive",this.saveProduct.total_given_margin=t.total_given_margin,this.saveProduct.sgst=t.sgst,this.saveProduct.cgst=t.cgst,this.saveProduct.pitch_from=t.pitch_from,this.saveProduct.final_retail_cp=t.final_retail_cp,this.saveProduct.final_ret=t.final_ret,this.saveProduct.bk_profit=t.bk_profit,this.saveProduct.bizkingz_cp_final=t.bizkingz_cp_final,this.saveProduct.bc_margin_amt=t.bc_margin_amt,this.saveProduct.bc_margin=t.bc_margin},resolveStatusVariant(t){return t==1?{color:"success"}:{color:"error"}},updatePagination(t){this.page=t},getBranddetails(){this.getBrands(this.cityID,this.locationID).then(t=>{this.BrandNames=t.data,this.BrandNames=this.BrandNames.map(e=>({value:e.brand_id,text:e.brand_name})),console.log("mer",this.BrandNames)})},getProductsdata(){const t={location:this.userType==="Business Head"?all:this.cityID};return new Promise((e,d)=>{this.getProducts(t.location).then(_=>{this.products=_.data.data,this.products.reverse(),e()}).catch(_=>{console.error("Error fetching merchants:",_),d(_)})})}}},J={key:0,style:{"max-width":"400px"}},X={key:1,id:"app"},Y=T('<div id="loading-bg"><div class="loading-logo"><img src="'+U+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),Z=[Y],$=n("p",{class:"mb-0"}," The system is not retrieving the Purchase Histories from Purchase Orders. Please ensure that you have applied for Purchase Orders ! ",-1),ee={class:"text-center"},te={class:"text-center"},ae={class:"text-center"},se={class:"text-center"},re={class:"text-center"},le={class:"text-center"},oe={class:"text-center"},ne={class:"text-center"},ie={class:"text-center"},ue={class:"text-center"},de={class:"text-center"},ce={class:"text-center"},me={class:"text-center"},_e={class:"text-center"},ge={class:"text-center"},he={class:"text-center"},pe={class:"text-center"},fe={class:"text-center"},ve={key:0,class:"text-center"},Pe={key:0},be=n("td",{colspan:"16",class:"text-center"},[n("h1",null,"No data found !")],-1),Ve=[be];function ye(t,e,d,_,a,o){return m(),g("div",null,[a.products!=null?(m(),g("div",J,[r(c,{modelValue:a.searchQuery,"onUpdate:modelValue":e[0]||(e[0]=s=>a.searchQuery=s),class:"mb-3",density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])])):p("",!0),a.loading?(m(),g("div",X,Z)):p("",!0),a.products==null?(m(),V(v,{key:2},{default:l(()=>[r(i,{cols:"12"},{default:l(()=>[r(k,{title:"Purchase Order View"},{default:l(()=>[r(w,null,{default:l(()=>[r(q,{color:"warning",variant:"tonal",class:"mb-4",border:"top"},{default:l(()=>[r(L,{class:"mb-1"},{default:l(()=>[f(" Are you sure you gave Purchase Orders? ")]),_:1}),$]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})):p("",!0),a.products!=null?(m(),V(G,{key:3,headers:a.headers,items:o.paginatedItems,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:l(()=>[n("thead",null,[n("tr",null,[(m(!0),g(y,null,x(a.headers,s=>(m(),g("th",{key:s,class:"text-center"},u(s.text),1))),128))])]),n("tbody",null,[(m(!0),g(y,null,x(o.paginatedItems,(s,h)=>(m(),g("tr",{key:h},[n("td",ee,u(s.city),1),n("td",te,u(s.location),1),n("td",ae,u(s.brand_name),1),n("td",se,u(s.sku_name),1),n("td",re,u(s.uom),1),n("td",le,u(s.hsn_code),1),n("td",oe,u(s.mrp),1),n("td",ne,[r(N,{color:o.resolveStatusVariant(s.status).color,class:"font-weight-medium",size:"small"},{default:l(()=>[f(u(s.status==1?"Active":"Inactive"),1)]),_:2},1032,["color"])]),n("td",ie,u(s.total_given_margin),1),n("td",ue,u(s.sgst),1),n("td",de,u(s.cgst),1),n("td",ce,u(s.pitch_from),1),n("td",me,u(s.final_retail_cp),1),n("td",_e,u(s.final_ret),1),n("td",ge,u(s.bk_profit),1),n("td",he,u(s.bizkingz_cp_final),1),n("td",pe,u(s.bc_margin_amt),1),n("td",fe,u(s.bc_margin),1),a.UserType=="Business Head"||a.UserType=="manager"||a.UserType=="City Operations Manager"?(m(),g("td",ve,[r(P,{icon:"",variant:"text",color:"default",class:"mb-1 mt-2",size:"x-small",style:{"margin-left":"auto",display:"block"},onClick:Se=>o.editProduct(s)},{default:l(()=>[r(C,{icon:"ri-pencil-line",size:"22",color:"#BA8B32"})]),_:2},1032,["onClick"])])):p("",!0)]))),128)),o.filteredProducts.length===0?(m(),g("tr",Pe,Ve)):p("",!0)])]),_:1},8,["headers","items"])):p("",!0),r(F,{modelValue:a.page,"onUpdate:modelValue":e[1]||(e[1]=s=>a.page=s),length:Math.ceil(o.filteredProducts.length/a.pageSize),max:a.maxPaginationPages,onInput:o.updatePagination},null,8,["modelValue","length","max","onInput"]),r(W,{modelValue:a.dialog,"onUpdate:modelValue":e[21]||(e[21]=s=>a.dialog=s),"max-width":"1000"},{default:l(()=>[r(k,{title:"Update Product",class:"mb-2"},{default:l(()=>[r(w,null,{default:l(()=>[r(v,null,{default:l(()=>[r(i,{cols:"12"},{default:l(()=>[r(R,{ref:"purchaseOrderForm",class:"mt-6"},{default:l(()=>[r(v,null,{default:l(()=>[r(i,{cols:"12",md:"6"},{default:l(()=>[r(b,{modelValue:a.saveProduct.city_id,"onUpdate:modelValue":[e[2]||(e[2]=s=>a.saveProduct.city_id=s),e[3]||(e[3]=s=>o.handleBrandSelection())],label:"City",items:a.locationsdata,"item-value":"value","item-title":"text",rules:a.locationrules,"menu-props":{maxHeight:200},required:""},null,8,["modelValue","items","rules"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(b,{modelValue:a.saveProduct.location_id,"onUpdate:modelValue":e[4]||(e[4]=s=>a.saveProduct.location_id=s),label:"Location",items:a.cityLoaction,"item-value":"value","item-title":"text",rules:a.locationrules2,"menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),r(i,{cols:"12",md:"6"},{default:l(()=>[r(b,{modelValue:a.saveProduct.brand_name,"onUpdate:modelValue":e[5]||(e[5]=s=>a.saveProduct.brand_name=s),label:"Brand Name",items:a.BrandNames,"item-value":"value","item-title":"text",rules:a.namerules,"menu-props":{maxHeight:200},required:""},null,8,["modelValue","items","rules"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.sku_name,"onUpdate:modelValue":e[6]||(e[6]=s=>a.saveProduct.sku_name=s),label:"SKU Name",rules:a.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.uom,"onUpdate:modelValue":e[7]||(e[7]=s=>a.saveProduct.uom=s),label:"UOM",rules:a.uomRules,required:""},null,8,["modelValue","rules"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.hsn_code,"onUpdate:modelValue":e[8]||(e[8]=s=>a.saveProduct.hsn_code=s),min:"0",label:"HSN Code",type:"number",required:"",onKeydown:o.preventDecimal,onPaste:o.preventPaste},null,8,["modelValue","onKeydown","onPaste"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.mrp,"onUpdate:modelValue":e[9]||(e[9]=s=>a.saveProduct.mrp=s),min:"0",label:"MRP",rules:a.mrprules,required:"",onKeydown:o.preventDecimal,onPaste:o.preventPaste},null,8,["modelValue","rules","onKeydown","onPaste"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.total_given_margin,"onUpdate:modelValue":e[10]||(e[10]=s=>a.saveProduct.total_given_margin=s),rules:o.computedTGMRules(),label:"Total Given Margin",required:"",onInput:o.updateTotalGivenMargin},null,8,["modelValue","rules","onInput"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.bizkingz_cp_final,"onUpdate:modelValue":e[11]||(e[11]=s=>a.saveProduct.bizkingz_cp_final=s),min:"0",label:"Bizking CP Final",onKeydown:o.preventDecimal,onPaste:o.preventPaste},null,8,["modelValue","onKeydown","onPaste"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.pitch_from,"onUpdate:modelValue":e[12]||(e[12]=s=>a.saveProduct.pitch_from=s),rules:o.computedPitchRules(),label:"Pitch From",onInput:o.updatePitchfrom},null,8,["modelValue","rules","onInput"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.final_ret,"onUpdate:modelValue":e[13]||(e[13]=s=>a.saveProduct.final_ret=s),min:"0",label:"Final Retail",onKeydown:o.preventDecimal,onPaste:o.preventPaste},null,8,["modelValue","onKeydown","onPaste"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.final_retail_cp,"onUpdate:modelValue":e[14]||(e[14]=s=>a.saveProduct.final_retail_cp=s),min:"0",label:"Final Retail CP",onKeydown:o.preventDecimal,onPaste:o.preventPaste},null,8,["modelValue","onKeydown","onPaste"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.bc_margin,"onUpdate:modelValue":e[15]||(e[15]=s=>a.saveProduct.bc_margin=s),rules:o.computedbcmargin(),label:"BC margin ",onInput:o.updatebcmargin},null,8,["modelValue","rules","onInput"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.bc_margin_amt,"onUpdate:modelValue":e[16]||(e[16]=s=>a.saveProduct.bc_margin_amt=s),label:"BC margin Amount",min:"0",onKeydown:o.preventDecimal,onPaste:o.preventPaste},null,8,["modelValue","onKeydown","onPaste"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.bk_profit,"onUpdate:modelValue":e[17]||(e[17]=s=>a.saveProduct.bk_profit=s),min:"0",label:"BK Profit",onKeydown:o.preventDecimal,onPaste:o.preventPaste},null,8,["modelValue","onKeydown","onPaste"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.cgst,"onUpdate:modelValue":e[18]||(e[18]=s=>a.saveProduct.cgst=s),rules:o.computedCGST(),label:"CGST",onInput:o.updateCGST},null,8,["modelValue","rules","onInput"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(c,{modelValue:a.saveProduct.sgst,"onUpdate:modelValue":e[19]||(e[19]=s=>a.saveProduct.sgst=s),rules:o.computedSGST(),label:"SGST",required:"",onInput:o.updateSGST},null,8,["modelValue","rules","onInput"])]),_:1}),r(i,{md:"6",cols:"12"},{default:l(()=>[r(K,{modelValue:a.saveProduct.status,"onUpdate:modelValue":e[20]||(e[20]=s=>a.saveProduct.status=s),label:"Status",items:["Active","Inactive"],required:""},null,8,["modelValue"])]),_:1}),r(i,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:l(()=>[r(P,{onClick:o.validateForm},{default:l(()=>[f(" Save ")]),_:1},8,["onClick"]),r(P,{color:"secondary",variant:"tonal",onClick:o.closeDialog},{default:l(()=>[f(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),r(A,{modelValue:a.snackbar,"onUpdate:modelValue":e[22]||(e[22]=s=>a.snackbar=s),timeout:3500,color:a.color},{default:l(()=>[f(u(a.snackbarText),1)]),_:1},8,["modelValue","color"])])}const xe=S(j,[["render",ye]]),ke={components:{Viewproduct:xe},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Products",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=B(),this.activeTab=z(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function we(t,e,d,_,a,o){const s=I("Viewproduct");return m(),g("div",null,[r(H,{modelValue:a.activeTab,"onUpdate:modelValue":e[0]||(e[0]=h=>a.activeTab=h),"show-arrows":""},{default:l(()=>[(m(!0),g(y,null,x(a.tabs,h=>(m(),V(O,{key:h.icon,value:h.tab},{default:l(()=>[r(C,{size:"20",start:"",icon:h.icon},null,8,["icon"]),f(" "+u(h.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),r(M),r(E,{modelValue:a.activeTab,"onUpdate:modelValue":e[1]||(e[1]=h=>a.activeTab=h),class:"mt-5 disable-tab-transition",touch:!1},{default:l(()=>[r(Q,{value:"account"},{default:l(()=>[r(s)]),_:1})]),_:1},8,["modelValue"])])}const We=S(ke,[["render",we]]);export{We as default};