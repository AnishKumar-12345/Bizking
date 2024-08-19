import{_ as V,o as m,c as b,g as a,b7 as k,b8 as g,w as l,i as s,j as P,k as v,l as f,f as A,m as _,b as c,t as y,v as S,e as x,F as T,q as B,s as w,r as C,u as M}from"./index.0a02293b.js";import{s as q}from"./Services.9766e40c.js";import{V as D}from"./VForm.cf677e9c.js";import{V as p}from"./VAutocomplete.90a8efe2.js";import{V as i}from"./VTextField.a38e65d3.js";import{V as U}from"./VSnackbar.47b8f9db.js";import{V as I,a as G,b as F,c as N}from"./VWindowItem.47cd302a.js";import"./VCounter.0e4a7297.js";import"./VSelect.e762c033.js";import"./VCheckboxBtn.1c3b42ae.js";import"./VChip.3f90d630.js";const R={mixins:[q],components:{},data(){return{namerules:[t=>!!t||"Name is required"],storerules:[t=>!!t||"Brand Name is required"],bcrules:[t=>!!t||"BC Margin is required"],cpfinal:[t=>!!t||"Bizking CP Final is required"],mrprules:[t=>!!t||"MRP is required"],bcmrules:[t=>!!t||"BC Margin is required"],bcmarules:[t=>!!t||"BC Margin Amount is required"],uomrules:[t=>!!t||"UOM is required"],retailsrules:[t=>!!t||"Final Retails CP is required"],Bkprules:[t=>!!t||"BK Profit is required"],hsnrules:[t=>!!t||"HSN is required"],cgstrules:[t=>!!t||"CGST is required"],sgstrules:[t=>!!t||"SGST is required"],loading:!0,searchQuery:"",page:1,pageSize:10,snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,marchantstocksdata:[],selectedBrand:null,BrandNames:[],userRole:"",locationsdata:[],locationrules:[t=>!!t||"City Name is required"],locationrules2:[t=>!!t||"City Location Name is required"],cityLoaction:[],cityID:"",locationid:"",Addbrand:{sku_name:"",uom:"",hsn_code:"",mrp:"",total_given_margin:"0%",bizkingz_cp_final:"",pitch_from:"0%",final_ret:"0%",final_retail_cp:"",bc_margin:"0%",bc_margin_amt:"",bk_profit:"",cgst:"0%",sgst:"0%",city_id:"",location_id:""}}},computed:{},mounted(){this.getBranchnames(),this.userRole=localStorage.getItem("userRole"),this.cityID=localStorage.getItem("city_id"),this.locationID=localStorage.getItem("location_id"),this.getBranddetails(),setTimeout(()=>{this.loading=!1},4e3)},methods:{handleBrandSelection(t){console.log("check hjandle",t),this.getCitylocation(t).then(e=>{this.cityLoaction=e.data.data.map(o=>({value:o.location_id,text:o.location})),console.log("ceck tye res",this.cityLoaction)})},getBranchnames(){this.Locationdata().then(t=>{this.locationsdata=t.data.data.map(e=>({value:e.city_id,text:e.city})),console.log("ceck tye res",this.locationsdata)})},computedbcmargin(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"BC margin is required",e=>e.startsWith("0%")?e==="0%"||"Must include a numerical value with a percentage symbol.":t(e)||"Must include a numerical value with a percentage symbol"]},updatebcmargin(t){t==="0%"||t==="0"?this.Addbrand.bc_margin="0%":t.startsWith("0%")?this.Addbrand.bc_margin="0%":this.Addbrand.bc_margin=t},computedSGST(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"SGST is required",e=>e.startsWith("0%")?e==="0%"||"Must include a numerical value with a percentage symbol.":t(e)||"Must include a numerical value with a percentage symbol"]},updateSGST(t){t==="0%"||t==="0"?this.Addbrand.sgst="0%":t.startsWith("0%")?this.Addbrand.sgst="0%":this.Addbrand.sgst=t},computedCGST(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"CGST is required",e=>e.startsWith("0%")?e==="0%"||"Must include a numerical value with a percentage symbol.":t(e)||"Must include a numerical value with a percentage symbol"]},updateCGST(t){t==="0%"||t==="0"?this.Addbrand.cgst="0%":t.startsWith("0%")?this.Addbrand.cgst="0%":this.Addbrand.cgst=t},computedFinalret(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"Final Ret is required",e=>e.startsWith("0%")?e==="0%"||"Must include a numerical value with a percentage symbol.":t(e)||"Must include a numerical value with a percentage symbol"]},updateFinalret(t){t==="0%"||t==="0"?this.Addbrand.final_ret="0%":t.startsWith("0%")?this.Addbrand.final_ret="0%":this.Addbrand.final_ret=t},computedPitchRules(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"Pitch From is required",e=>e.startsWith("0%")?e==="0%"||"Must include a numerical value with a percentage symbol.":t(e)||"Must include a numerical value with a percentage symbol"]},updatePitchfrom(t){t==="0%"||t==="0"?this.Addbrand.pitch_from="0%":t.startsWith("0%")?this.Addbrand.pitch_from="0%":this.Addbrand.pitch_from=t},computedTGMRules(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"Total Given Margin is required",e=>e.startsWith("0%")?e==="0%"||"Must include a numerical value with a percentage symbol.":t(e)||"Must include a numerical value with a percentage symbol"]},updateTotalGivenMargin(t){t==="0%"||t==="0"?this.Addbrand.total_given_margin="0%":t.startsWith("0%")?this.Addbrand.total_given_margin="0%":this.Addbrand.total_given_margin=t},preventPaste(t){const o=(t.clipboardData||window.clipboardData).getData("text");/^[0-9]+$/.test(o)||t.preventDefault()},preventDecimal(t){(t.key===","||t.key==="+"||t.key==="-"||t.keyCode===189||t.keyCode===109)&&t.preventDefault()},validateForm(){this.$refs.purchaseOrderForm.validate().then(t=>{t.valid==!0?this.saveBrands():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},saveBrands(){const t={brand_id:this.selectedBrand,sku_name:this.Addbrand.sku_name,uom:this.Addbrand.uom,hsn_code:this.Addbrand.hsn_code,mrp:this.Addbrand.mrp,total_given_margin:this.Addbrand.total_given_margin===""?"0%":this.Addbrand.total_given_margin,bizkingz_cp_final:this.Addbrand.bizkingz_cp_final,pitch_from:this.Addbrand.pitch_from===""?"0%":this.Addbrand.pitch_from,final_ret:this.Addbrand.final_ret===""?"0%":this.Addbrand.final_ret,final_retail_cp:this.Addbrand.final_retail_cp,bc_margin:this.Addbrand.bc_margin,bc_margin_amt:this.Addbrand.bc_margin_amt,bk_profit:this.Addbrand.bk_profit,city_id:this.Addbrand.city_id,location_id:this.Addbrand.location_id,cgst:this.Addbrand.cgst===""?"0%":this.Addbrand.cgst,sgst:this.Addbrand.sgst===""?"0%":this.Addbrand.sgst};console.log("post data",t),this.Addbrandproductdata(t).then(e=>{console.log("resp",e),e.data.status==1?(this.snackbarText=e.data.message,this.color="primary",this.snackbar=!0,this.Addbrand={}):(this.snackbarText=e.data.message,this.color="on-background",this.snackbar=!0)})},getBranddetails(){this.getBrands(this.cityID,this.locationID).then(t=>{this.BrandNames=t.data,this.BrandNames=this.BrandNames.map(e=>({value:e.brand_id,text:e.brand_name})),console.log("mer",this.BrandNames)})}}},K={key:0,class:"loading-container"};function z(t,e,o,h,n,d){return m(),b("div",null,[n.loading?(m(),b("div",K,[a(k,{height:"5",color:"primary",indeterminate:"",class:"custom-loader","full-width":""})])):g("",!0),a(f,null,{default:l(()=>[a(s,{cols:"12"},{default:l(()=>[a(P,{title:"Add Product",class:"mb-4"},{default:l(()=>[a(v,null,{default:l(()=>[a(D,{class:"mt-6",ref:"purchaseOrderForm"},{default:l(()=>[a(f,null,{default:l(()=>[a(s,{md:"6",cols:"12"},{default:l(()=>[a(p,{modelValue:this.Addbrand.city_id,"onUpdate:modelValue":[e[0]||(e[0]=r=>this.Addbrand.city_id=r),e[1]||(e[1]=r=>d.handleBrandSelection(this.Addbrand.city_id))],label:"City",items:this.locationsdata,"item-value":"value","item-title":"text",rules:n.locationrules,"menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(p,{modelValue:this.Addbrand.location_id,"onUpdate:modelValue":e[2]||(e[2]=r=>this.Addbrand.location_id=r),label:"Location",items:this.cityLoaction,"item-value":"value","item-title":"text",rules:n.locationrules2,"menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(p,{modelValue:n.selectedBrand,"onUpdate:modelValue":e[3]||(e[3]=r=>n.selectedBrand=r),label:"Brand Name",items:this.BrandNames,"item-value":"value","item-title":"text",rules:n.storerules,"menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),a(s,{cols:"12",md:"6"},{default:l(()=>[a(i,{modelValue:this.Addbrand.sku_name,"onUpdate:modelValue":e[4]||(e[4]=r=>this.Addbrand.sku_name=r),label:"SKU Name",rules:n.namerules,required:""},null,8,["modelValue","rules"])]),_:1}),a(s,{cols:"12",md:"6"},{default:l(()=>[a(i,{modelValue:this.Addbrand.uom,"onUpdate:modelValue":e[5]||(e[5]=r=>this.Addbrand.uom=r),label:"UOM",rules:n.uomrules},null,8,["modelValue","rules"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(i,{modelValue:this.Addbrand.hsn_code,"onUpdate:modelValue":e[6]||(e[6]=r=>this.Addbrand.hsn_code=r),label:"HSN Code",rules:n.hsnrules,type:"number",min:"0",onKeydown:d.preventDecimal,onPaste:d.preventPaste},null,8,["modelValue","rules","onKeydown","onPaste"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(i,{modelValue:this.Addbrand.mrp,"onUpdate:modelValue":e[7]||(e[7]=r=>this.Addbrand.mrp=r),label:"MRP",rules:n.mrprules,type:"number",min:"0",onKeydown:d.preventDecimal,onPaste:d.preventPaste},null,8,["modelValue","rules","onKeydown","onPaste"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(i,{modelValue:this.Addbrand.total_given_margin,"onUpdate:modelValue":e[8]||(e[8]=r=>this.Addbrand.total_given_margin=r),rules:d.computedTGMRules(),label:"Total Given Margin",onInput:d.updateTotalGivenMargin,required:""},null,8,["modelValue","rules","onInput"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(i,{modelValue:this.Addbrand.bizkingz_cp_final,"onUpdate:modelValue":e[9]||(e[9]=r=>this.Addbrand.bizkingz_cp_final=r),rules:n.cpfinal,type:"number",label:"Bizking CP Final",min:"0",onKeydown:d.preventDecimal,onPaste:d.preventPaste},null,8,["modelValue","rules","onKeydown","onPaste"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(i,{modelValue:this.Addbrand.pitch_from,"onUpdate:modelValue":e[10]||(e[10]=r=>this.Addbrand.pitch_from=r),rules:d.computedPitchRules(),label:"Pitch from",onInput:d.updatePitchfrom},null,8,["modelValue","rules","onInput"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(i,{modelValue:this.Addbrand.final_ret,"onUpdate:modelValue":e[11]||(e[11]=r=>this.Addbrand.final_ret=r),rules:d.computedFinalret(),label:"Final Retail",onInput:d.updateFinalret},null,8,["modelValue","rules","onInput"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(i,{modelValue:this.Addbrand.final_retail_cp,"onUpdate:modelValue":e[12]||(e[12]=r=>this.Addbrand.final_retail_cp=r),type:"number",rules:n.retailsrules,min:"0",onKeydown:d.preventDecimal,onPaste:d.preventPaste,label:"Final Retail CP"},null,8,["modelValue","rules","onKeydown","onPaste"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(i,{modelValue:this.Addbrand.bc_margin,"onUpdate:modelValue":e[13]||(e[13]=r=>this.Addbrand.bc_margin=r),rules:d.computedbcmargin(),label:"BC Margin",onInput:d.updatebcmargin},null,8,["modelValue","rules","onInput"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(i,{modelValue:this.Addbrand.bc_margin_amt,"onUpdate:modelValue":e[14]||(e[14]=r=>this.Addbrand.bc_margin_amt=r),min:"0",onKeydown:d.preventDecimal,onPaste:d.preventPaste,type:"number",label:"BC Margin Amount",rules:n.bcmarules},null,8,["modelValue","onKeydown","onPaste","rules"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(i,{modelValue:this.Addbrand.bk_profit,"onUpdate:modelValue":e[15]||(e[15]=r=>this.Addbrand.bk_profit=r),type:"number",label:"BK Profit",min:"0",rules:n.Bkprules,onKeydown:d.preventDecimal,onPaste:d.preventPaste},null,8,["modelValue","rules","onKeydown","onPaste"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(i,{modelValue:this.Addbrand.cgst,"onUpdate:modelValue":e[16]||(e[16]=r=>this.Addbrand.cgst=r),rules:d.computedCGST(),label:"CGST",onInput:d.updateCGST},null,8,["modelValue","rules","onInput"])]),_:1}),a(s,{md:"6",cols:"12"},{default:l(()=>[a(i,{modelValue:this.Addbrand.sgst,"onUpdate:modelValue":e[17]||(e[17]=r=>this.Addbrand.sgst=r),rules:d.computedSGST(),onInput:d.updateSGST,label:"SGST"},null,8,["modelValue","rules","onInput"])]),_:1}),n.userRole!="Sales Associate"?(m(),A(s,{key:0,cols:"12",class:"d-flex flex-wrap gap-4"},{default:l(()=>[a(_,{onClick:e[18]||(e[18]=r=>d.validateForm())},{default:l(()=>[c("Save")]),_:1}),a(_,{color:"secondary",variant:"tonal",type:"reset"},{default:l(()=>[c(" Reset ")]),_:1})]),_:1})):g("",!0)]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),a(U,{modelValue:n.snackbar,"onUpdate:modelValue":e[19]||(e[19]=r=>n.snackbar=r),timeout:3500,color:n.color},{default:l(()=>[c(y(n.snackbarText),1)]),_:1},8,["modelValue","color"])])}const W=V(R,[["render",z]]),L={components:{Addproducts:W},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Add Products",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=S(),this.activeTab=x(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function H(t,e,o,h,n,d){const r=C("Addproducts");return m(),b("div",null,[a(I,{modelValue:n.activeTab,"onUpdate:modelValue":e[0]||(e[0]=u=>n.activeTab=u),"show-arrows":""},{default:l(()=>[(m(!0),b(T,null,B(n.tabs,u=>(m(),A(N,{key:u.icon,value:u.tab},{default:l(()=>[a(M,{size:"20",start:"",icon:u.icon},null,8,["icon"]),c(" "+y(u.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),a(w),a(F,{modelValue:n.activeTab,"onUpdate:modelValue":e[1]||(e[1]=u=>n.activeTab=u),class:"mt-5 disable-tab-transition",touch:!1},{default:l(()=>[a(G,{value:"account"},{default:l(()=>[a(r)]),_:1})]),_:1},8,["modelValue"])])}const ae=V(L,[["render",H]]);export{ae as default};
