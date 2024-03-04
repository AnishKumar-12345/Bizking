import{_ as F,o as h,c as p,g as o,w as u,i as _,j as A,k as v,l as x,s as B,a,F as y,q as S,t as d,b as m,m as g,u as k,bi as D,v as P,e as w,r as G,f as N}from"./index.89c3bcd2.js";import{s as q}from"./Services.7881b1f6.js";import{V}from"./VForm.2a801050.js";import{V as U}from"./VAutocomplete.a602cfa1.js";import{V as f}from"./VTextField.2bb12e56.js";import{V as C}from"./VSelect.a4e0af3a.js";import{V as I}from"./VTable.40471282.js";import{V as b}from"./VChip.2a54a4ff.js";import{V as R}from"./VSnackbar.ed58e230.js";import{V as M}from"./VDialog.c30677bb.js";import{V as O,a as Q,b as L,c as z}from"./VWindowItem.598181d2.js";import"./index.2bd8ddc8.js";import"./VCheckboxBtn.7fb327e2.js";const E={mixins:[q],components:{},data(){return{searchQuery:"",BrandRules:[t=>!!t||"Brand is required"],dateRules:[t=>!!t||"Date is required"],Statusrules:[t=>!!t||"Status Is Required"],quantityrules:[t=>!!t||"Quantity Is Required"],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,formData:{brand_id:"",user_id:"",created_date:this.getFormattedDate(new Date),delivery_date:"",po_status:"",total_cgst:"",total_sgst:"",you_saved:"",total_quantity:"","sub_total(taxable_amount_total)":"",total_so_amount:"",products:[{brand_product_id:"",sku_name:"",hsn_code:"",mrp:"",quantity:"",uom:"",price_per_unit:"",taxable_amount:"",cgst:"",sgst:"",amount:"",total_give_margin:"",sgst_percentage:"",cgst_percentage:"",margin_amount:""}]},quantityInput:0,AllBrandproducts:[],createdBy:"",userIds:"",Brandname:[],totals:{Quantity:0,TaxableAmmount:0,CGST:0,SGST:0,Ammount:0},today:this.getFormattedDate(new Date),landscape:!1,noTitle:!1,selectedPurchaseOrder:null,dialog:!1,headers:[{text:"Product Name",value:"sku_name"},{text:"HSN",value:"hsn_code"},{text:"MRP",value:"mrp"},{text:"Quantity",value:"quantity"},{text:"UOM",value:"uom"},{text:"Price/Unit",value:"calculatedPricePerUnit"},{text:"TaxableAmount",value:"calculatedTaxableAmount"},{text:"CGST",value:"calculatedCGSTAmount"},{text:"SGST",value:"calculatedSGSTAmount"},{text:"Amount",value:"calculateTotalamount"},{text:"Actions",value:"action"}]}},computed:{filteredBrandProducts(){return this.AllBrandproducts.filter(t=>t.quantity!==void 0)},filteredPurchaseOrder(){const t=this.searchQuery.toLowerCase().trim();return console.log("log in",t),this.filteredBrandProducts.filter(e=>e.sku_name&&e.sku_name.toLowerCase().includes(t)||e.hsn_code&&e.hsn_code.toLowerCase().includes(t)||e.mrp&&e.mrp.toString().toLowerCase().includes(t)||e.quantity&&e.quantity.toString().toLowerCase().includes(t)||e.uom&&e.uom.toLowerCase().includes(t)||e.total_given_margin&&e.total_given_margin.toString().toLowerCase().includes(t)||e.cgst&&e.cgst.toString().toLowerCase().includes(t)||e.sgst&&e.sgst.toString().toLowerCase().includes(t))},totalIndividualAmount(){return this.AllBrandproducts.reduce((t,e)=>{const l=parseFloat(e.mrp),c=parseFloat(e.quantity);if(!isNaN(l)&&!isNaN(c)){const s=l*c;return t+s}return t},0)},savedamount(){const t=parseFloat(this.allAmmount),e=this.totalIndividualAmount-(isNaN(t)?0:t);return Math.max(0,e).toFixed(2)},allAmmount(){const t=this.calculateTotalamount.reduce((e,l)=>e+parseFloat(l),0);return parseFloat(t.toFixed(2))},allSGSTAmount(){const t=this.calculatedSGSTAmount.reduce((e,l)=>e+parseFloat(l),0);return parseFloat(t.toFixed(2))},allCGSTAmount(){const t=this.calculatedCGSTAmount.reduce((e,l)=>e+parseFloat(l),0);return parseFloat(t.toFixed(2))},allTaxableAmmount(){const t=this.calculatedTaxableAmount.reduce((e,l)=>e+parseFloat(l),0);return parseFloat(t.toFixed(2))},allQuantity(){const t=this.AllBrandproducts.reduce((e,l)=>{const c=parseFloat(l.quantity);return isNaN(c)?e:e+c},0);return isNaN(t)?0:t.toFixed(0)},calculateTotalamount(){return this.AllBrandproducts.map((t,e)=>{const l=parseFloat(this.calculatedTaxableAmount[e]),c=parseFloat(this.calculatedCGSTAmount[e]),s=parseFloat(this.calculatedSGSTAmount[e]),n=l+c+s;return isNaN(n)?0:n.toFixed(2)})},calculatedSGSTAmount(){return this.AllBrandproducts.map((t,e)=>{const l=parseFloat(this.calculatedTaxableAmount[e]),c=parseFloat(t.sgst.replace("%","")),s=l*c/100;return isNaN(s)?0:s.toFixed(2)})},calculatedCGSTAmount(){return this.AllBrandproducts.map((t,e)=>{const l=parseFloat(this.calculatedTaxableAmount[e]),c=parseFloat(t.cgst.replace("%","")),s=l*c/100;return isNaN(s)?0:s.toFixed(2)})},calculateMargin(){return this.AllBrandproducts.map((t,e)=>{const l=parseFloat(t.mrp),c=parseFloat(t.total_given_margin.replace("%","")),s=l*c/100;return isNaN(s)?0:s.toFixed(2)})},calculatedPricePerUnit(){return this.AllBrandproducts.map((t,e)=>{const l=parseFloat(t.mrp),c=parseFloat(this.calculateMargin[e]),s=l-c;return isNaN(s)?0:s.toFixed(2)})},calculatedTaxableAmount(){return this.AllBrandproducts.map((t,e)=>{const l=parseFloat(t.quantity),c=this.calculatedPricePerUnit[e],s=parseFloat(t.cgst.replace("%","")),n=parseFloat(t.sgst.replace("%","")),r=parseFloat(c);if(l===0||isNaN(l)||isNaN(r))return 0;const i=c/(100+(s+n))*100*l;return isNaN(i)?0:i.toFixed(2)})},brandNames(){return this.Brandname.map(t=>t.brand_name)}},mounted(){this.getBrandsdata(),this.createdBy=localStorage.getItem("createdby"),this.userIds=localStorage.getItem("userId")},methods:{validateNumericInput(t){const e=t.target.value.replace(/[^0-9]/g,"");this.item.quantity=e},getFormattedDate(t){const e=t.getFullYear(),l=String(t.getMonth()+1).padStart(2,"0"),c=String(t.getDate()).padStart(2,"0");return`${e}-${l}-${c}`},resetdetails(){this.AllBrandproducts.map(t=>t.quantity="")},validateForm(){this.$refs.purchaseOrderForm.validate().then(t=>{t.valid==!0?this.allQuantity>=1?this.saveData():(this.snackbar=!0,this.snackbarText="Please give Quantities",this.color="primary"):(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},preventPaste(t){const l=(t.clipboardData||window.clipboardData).getData("text");/^[0-9]+$/.test(l)||t.preventDefault()},preventDecimal(t){(t.key==="."||t.key===","||t.key==="+"||t.key==="-"||t.keyCode===189||t.keyCode===109)&&t.preventDefault()},saveData(){const t={Draft:1,Created:2,Shared:3,Acknowledged:4,Received:5},e={brand_id:this.selectedBrandId,user_id:this.userIds,created_date:this.formData.created_date,delivery_date:this.formData.delivery_date,po_status:t[this.formData.po_status],total_cgst:`${this.allCGSTAmount}`,total_sgst:`${this.allSGSTAmount}`,you_saved:`${this.savedamount}`,sub_total:`${this.allTaxableAmmount}`,total_po_amount:`${this.allAmmount}`,total_quantity:`${this.allQuantity}`,products:this.AllBrandproducts.filter(l=>l.quantity>0).map((l,c)=>({brand_product_id:l.brand_product_id,sku_name:l.sku_name,hsn_code:l.hsn_code,mrp:l.mrp,quantity:`${l.quantity}`,uom:`${l.uom}`,sgst_percentage:l.sgst.includes("%")?`${l.sgst}`:`${l.sgst}%`,cgst_percentage:l.cgst.includes("%")?`${l.cgst}`:`${l.cgst}%`,price_per_unit:`${this.calculatedPricePerUnit[c]}`,taxable_amount:`${this.calculatedTaxableAmount[c]}`,csgt:`${this.calculatedCGSTAmount[c]}`,sgst:`${this.calculatedSGSTAmount[c]}`,amount:`${this.calculateTotalamount[c]}`,total_give_margin:l.total_given_margin}))};this.postPurchaseorder(e).then(l=>{l.status==1?(this.snackbar=!0,this.color="primary",this.formData={},this.snackbarText=l.message,setTimeout(()=>{window.location.reload(!0)},1300)):(this.snackbar=!0,this.color="on-background")})},colorTGMmargin(t){return t?{color:"success"}:{color:"error"}},colorSGSTmargin(t){return t?{color:"success"}:{color:"error"}},colorCGSTmargin(t){return t?{color:"success"}:{color:"error"}},handleBrandSelection(){const t=this.Brandname.find(e=>e.brand_name===this.selectedPurchaseOrder);t&&(this.selectedBrandId=t.brand_id,this.getBrandproducts(this.selectedBrandId).then(e=>{this.AllBrandproducts=e.data}))},getBrandsdata(){this.getBrands().then(t=>{this.Brandname=t.data})},onDateChange(){},deleteRow(t){const e=this.AllBrandproducts.indexOf(t);e!==-1&&this.AllBrandproducts.splice(e,1)},openproductdialog(){this.dialog=!0},closeDialog(){this.dialog=!1}}},Y={style:{"max-width":"400px"}},H={class:"text-center"},K={class:"text-center"},W={class:"text-center"},j={class:"text-center"},J={class:"text-center"},X={class:"text-center"},Z=a("br",null,null,-1),$={class:"text-center"},tt={class:"text-center"},et=a("br",null,null,-1),at={class:"text-center"},lt=a("br",null,null,-1),st={class:"text-center"},ot=a("td",{class:"text-center"},"Total",-1),rt=a("td",null,null,-1),nt=a("td",null,null,-1),ut={class:"text-center"},ct=a("td",null,null,-1),dt=a("td",null,null,-1),it={class:"text-center"},mt={class:"text-center"},_t={class:"text-center"},ht={class:"text-center"},pt=a("td",null,null,-1),gt=a("tr",null,[a("td",{class:"text-left",style:{"font-weight":"Bold"}},"Tax Details:"),a("td",{colspan:"4",class:"text-right"}),a("td",{colspan:"4",class:"text-left",style:{"font-weight":"Bold"}},"Amounts:"),a("td",{colspan:"4",class:"text-center"})],-1),ft=a("td",{class:"text-left"},"CGST",-1),xt={colspan:"4",class:"text-right"},bt=a("td",{colspan:"4",class:"text-left"},"SubTotal",-1),yt={colspan:"4",class:"text-center"},St=a("td",{class:"text-left"},"SGST",-1),Tt={colspan:"4",class:"text-right"},At=a("td",{colspan:"4",class:"text-left"},"Total",-1),vt={colspan:"4",class:"text-center"},Vt=a("td",{class:"text-left"},null,-1),Ct=a("td",{colspan:"4",class:"text-right"},null,-1),Ft=a("td",{colspan:"4",class:"text-left"},"Advance",-1),Bt={colspan:"4",class:"text-center"},kt=a("td",{class:"text-left"},null,-1),Dt=a("td",{colspan:"4",class:"text-right"},null,-1),Pt=a("td",{colspan:"4",class:"text-left"},"Balance",-1),wt={colspan:"4",class:"text-center"},Gt=a("td",{class:"text-left"},null,-1),Nt=a("td",{colspan:"4",class:"text-right"},null,-1),qt=a("td",{colspan:"4",class:"text-left"},"You Saved",-1),Ut={colspan:"4",class:"text-center"};function It(t,e,l,c,s,n){return h(),p("div",null,[o(x,null,{default:u(()=>[o(_,{cols:"12"},{default:u(()=>[o(A,{title:"Purchase Order",class:"mb-4"},{default:u(()=>[o(v,null,{default:u(()=>[o(V,{class:"mt-6",ref:"purchaseOrderForm"},{default:u(()=>[o(x,null,{default:u(()=>[o(_,{md:"6",cols:"12"},{default:u(()=>[o(U,{modelValue:s.selectedPurchaseOrder,"onUpdate:modelValue":[e[0]||(e[0]=r=>s.selectedPurchaseOrder=r),n.handleBrandSelection],label:"Brand or Manufacturer",items:n.brandNames,rules:s.BrandRules,"menu-props":{maxHeight:200}},null,8,["modelValue","items","rules","onUpdate:modelValue"])]),_:1}),o(_,{cols:"12",md:"6"},{default:u(()=>[o(f,{modelValue:s.createdBy,"onUpdate:modelValue":e[1]||(e[1]=r=>s.createdBy=r),label:"Created By",readonly:""},null,8,["modelValue"])]),_:1}),o(_,{cols:"12",md:"6"},{default:u(()=>[o(f,{modelValue:s.formData.created_date,"onUpdate:modelValue":e[2]||(e[2]=r=>s.formData.created_date=r),type:"date",label:"Order Date",min:s.today,rules:s.dateRules,readonly:""},null,8,["modelValue","min","rules"])]),_:1}),o(_,{md:"6",cols:"12"},{default:u(()=>[o(C,{modelValue:s.formData.po_status,"onUpdate:modelValue":e[3]||(e[3]=r=>s.formData.po_status=r),label:"PO Status",items:["Draft","Created","Shared","Acknowledged"],rules:s.Statusrules},null,8,["modelValue","rules"])]),_:1}),o(_,{md:"6",cols:"12"},{default:u(()=>[o(f,{modelValue:s.formData.delivery_date,"onUpdate:modelValue":e[4]||(e[4]=r=>s.formData.delivery_date=r),type:"date",label:"Delivery Date",min:s.today,rules:s.dateRules},null,8,["modelValue","min","rules"])]),_:1}),o(B),o(_,{cols:"12"},{default:u(()=>[a("div",Y,[o(f,{class:"mb-3",modelValue:s.searchQuery,"onUpdate:modelValue":e[5]||(e[5]=r=>s.searchQuery=r),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),o(I,{headers:s.headers,items:n.filteredBrandProducts},{default:u(()=>[a("thead",null,[a("tr",null,[(h(!0),p(y,null,S(s.headers,r=>(h(),p("th",{class:"text-center",key:r},d(r.text),1))),128))])]),a("tbody",null,[(h(!0),p(y,null,S(n.filteredPurchaseOrder,(r,i)=>(h(),p("tr",{key:i},[a("td",H,d(r.sku_name),1),a("td",K,d(r.hsn_code),1),a("td",W," \u20B9"+d(r.mrp),1),a("td",j,[o(f,{onKeydown:n.preventDecimal,onPaste:n.preventPaste,modelValue:r.quantity,"onUpdate:modelValue":T=>r.quantity=T,type:"number",min:"0",style:{"min-width":"80px"}},null,8,["onKeydown","onPaste","modelValue","onUpdate:modelValue"])]),a("td",J,d(r.uom),1),a("td",X,[m(" \u20B9 "+d(n.calculatedPricePerUnit[i])+" ",1),Z,o(b,{color:n.colorTGMmargin(r.total_given_margin).color,class:"font-weight-medium",size:"small"},{default:u(()=>[m(" ("+d(r.total_given_margin)+") ",1)]),_:2},1032,["color"])]),a("td",$," \u20B9"+d(n.calculatedTaxableAmount[i]),1),a("td",tt,[m(" \u20B9"+d(n.calculatedCGSTAmount[i])+" ",1),et,o(b,{color:n.colorCGSTmargin(r.cgst).color,class:"font-weight-medium",size:"small"},{default:u(()=>[m(" ("+d(r.cgst)+") ",1)]),_:2},1032,["color"])]),a("td",at,[m(" \u20B9"+d(n.calculatedSGSTAmount[i])+" ",1),lt,o(b,{color:n.colorSGSTmargin(r.sgst).color,class:"font-weight-medium",size:"small"},{default:u(()=>[m(" ("+d(r.sgst)+") ",1)]),_:2},1032,["color"])]),a("td",st," \u20B9"+d(n.calculateTotalamount[i]),1),a("td",null,[o(g,{icon:"",variant:"text",color:"error",class:"me-2",size:"small",onClick:T=>n.deleteRow(r)},{default:u(()=>[o(k,{icon:"mdi-minus-circle-outline",size:"24"})]),_:2},1032,["onClick"])])]))),128))]),a("tfoot",null,[a("tr",null,[ot,rt,nt,a("td",ut,d(n.allQuantity),1),ct,dt,a("td",it," \u20B9"+d(n.allTaxableAmmount),1),a("td",mt," \u20B9"+d(n.allCGSTAmount),1),a("td",_t," \u20B9"+d(n.allSGSTAmount),1),a("td",ht," \u20B9"+d(n.allAmmount),1),pt]),gt,a("tr",null,[ft,a("td",xt,"\u20B9"+d(n.allCGSTAmount),1),bt,a("td",yt,"\u20B9"+d(n.allAmmount),1)]),a("tr",null,[St,a("td",Tt,"\u20B9"+d(n.allSGSTAmount),1),At,a("td",vt,"\u20B9"+d(n.allAmmount),1)]),a("tr",null,[Vt,Ct,Ft,a("td",Bt,"\u20B9"+d(s.totals.Quantity),1)]),a("tr",null,[kt,Dt,Pt,a("td",wt,"\u20B9"+d(n.allAmmount),1)]),a("tr",null,[Gt,Nt,qt,a("td",Ut,"\u20B9"+d(n.savedamount),1)])])]),_:1},8,["headers","items"])]),_:1}),o(_,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:u(()=>[o(g,{onClick:n.validateForm},{default:u(()=>[m("Save")]),_:1},8,["onClick"]),o(g,{color:"secondary",variant:"tonal",onClick:e[6]||(e[6]=r=>n.resetdetails())},{default:u(()=>[m(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),o(R,{modelValue:s.snackbar,"onUpdate:modelValue":e[7]||(e[7]=r=>s.snackbar=r),timeout:3500,color:s.color},{default:u(()=>[m(d(s.snackbarText),1)]),_:1},8,["modelValue","color"]),o(M,{modelValue:s.dialog,"onUpdate:modelValue":e[8]||(e[8]=r=>s.dialog=r),"max-width":"600"},{default:u(()=>[o(A,{title:"Add Your Product"},{default:u(()=>[o(v,null,{default:u(()=>[o(V,{class:"mt-6"},{default:u(()=>[o(x,null,{default:u(()=>[o(_,{md:"6",cols:"12"},{default:u(()=>[o(C,{label:"Products",items:["Normal Eggs","Premium Eggs","Poori","Methi Chapathi","Ragi Chapathi"]})]),_:1}),o(_,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:u(()=>[o(g,null,{default:u(()=>[m("Add")]),_:1}),o(g,{color:"secondary",variant:"tonal",type:"reset",onClick:n.closeDialog},{default:u(()=>[m(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1}),o(D)]),_:1})]),_:1},8,["modelValue"])])}const Rt=F(E,[["render",It]]),Mt={components:{Addpurchaseorders:Rt},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Create Purchase Order",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=P(),this.activeTab=w(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function Ot(t,e,l,c,s,n){const r=G("Addpurchaseorders");return h(),p("div",null,[o(O,{modelValue:s.activeTab,"onUpdate:modelValue":e[0]||(e[0]=i=>s.activeTab=i),"show-arrows":""},{default:u(()=>[(h(!0),p(y,null,S(s.tabs,i=>(h(),N(z,{key:i.icon,value:i.tab},{default:u(()=>[o(k,{size:"20",start:"",icon:i.icon},null,8,["icon"]),m(" "+d(i.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),o(B),o(L,{modelValue:s.activeTab,"onUpdate:modelValue":e[1]||(e[1]=i=>s.activeTab=i),class:"mt-5 disable-tab-transition",touch:!1},{default:u(()=>[o(Q,{value:"account"},{default:u(()=>[o(r)]),_:1})]),_:1},8,["modelValue"])])}const te=F(Mt,[["render",Ot]]);export{te as default};