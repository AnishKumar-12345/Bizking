import{_ as k,o as h,c as p,g as s,w as n,i as _,j as v,k as V,l as x,m as g,u as D,a,F as A,s as S,t as u,b as m,n as f,v as F,aZ as C,x as P,e as G,r as N,f as w}from"./index.4ba6e09e.js";import{s as q}from"./Services.8ccc7918.js";import{V as B}from"./VForm.ce948013.js";import{V as b}from"./VSelect.ab378d35.js";import{V as U}from"./VTable.658b1e60.js";import{V as T}from"./VChip.7e7c907c.js";import{V as I}from"./VSnackbar.c3a3331b.js";import{V as R}from"./VDialog.1caeeb6a.js";import{V as O,a as M,b as Q,c as z}from"./VWindowItem.5917a1e6.js";import"./index.2bd8ddc8.js";import"./VCheckboxBtn.d8b7733e.js";const E={mixins:[q],components:{},data(){return{BrandRules:[t=>!!t||"Brand is required"],dateRules:[t=>!!t||"Date is required"],Statusrules:[t=>!!t||"Status Is Required"],quantityrules:[t=>!!t||"Quantity Is Required"],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,formData:{brand_id:"",user_id:"",created_date:this.getFormattedDate(new Date),delivery_date:"",po_status:"",total_cgst:"",total_sgst:"",you_saved:"",total_quantity:"","sub_total(taxable_amount_total)":"",total_so_amount:"",products:[{brand_product_id:"",sku_name:"",hsn_code:"",mrp:"",quantity:"",uom:"",price_per_unit:"",taxable_amount:"",cgst:"",sgst:"",amount:"",total_give_margin:"",sgst_percentage:"",cgst_percentage:"",margin_amount:""}]},quantityInput:0,AllBrandproducts:[],createdBy:"",userIds:"",Brandname:[],totals:{Quantity:0,TaxableAmmount:0,CGST:0,SGST:0,Ammount:0},today:this.getFormattedDate(new Date),landscape:!1,noTitle:!1,selectedPurchaseOrder:null,dialog:!1,headers:[{text:"Product Name",value:"sku_name"},{text:"HSN",value:"hsn_code"},{text:"MRP",value:"mrp"},{text:"Quantity",value:"quantity"},{text:"UOM",value:"uom"},{text:"Price/Unit",value:"calculatedPricePerUnit"},{text:"TaxableAmount",value:"calculatedTaxableAmount"},{text:"CGST",value:"calculatedCGSTAmount"},{text:"SGST",value:"calculatedSGSTAmount"},{text:"Amount",value:"calculateTotalamount"},{text:"Actions",value:"action"}]}},computed:{filteredBrandProducts(){return this.AllBrandproducts.filter(t=>t.quantity!==void 0)},totalIndividualAmount(){return this.AllBrandproducts.reduce((t,e)=>{const l=parseFloat(e.mrp),d=parseFloat(e.quantity);if(!isNaN(l)&&!isNaN(d)){const o=l*d;return t+o}return t},0)},savedamount(){const t=parseFloat(this.allAmmount),e=this.totalIndividualAmount-(isNaN(t)?0:t);return Math.max(0,e).toFixed(2)},allAmmount(){const t=this.calculateTotalamount.reduce((e,l)=>e+parseFloat(l),0);return parseFloat(t.toFixed(2))},allSGSTAmount(){const t=this.calculatedSGSTAmount.reduce((e,l)=>e+parseFloat(l),0);return parseFloat(t.toFixed(2))},allCGSTAmount(){const t=this.calculatedCGSTAmount.reduce((e,l)=>e+parseFloat(l),0);return parseFloat(t.toFixed(2))},allTaxableAmmount(){const t=this.calculatedTaxableAmount.reduce((e,l)=>e+parseFloat(l),0);return parseFloat(t.toFixed(2))},allQuantity(){const t=this.AllBrandproducts.reduce((e,l)=>{const d=parseFloat(l.quantity);return isNaN(d)?e:e+d},0);return isNaN(t)?0:t.toFixed(0)},calculateTotalamount(){return this.AllBrandproducts.map((t,e)=>{const l=parseFloat(this.calculatedTaxableAmount[e]),d=parseFloat(this.calculatedCGSTAmount[e]),o=parseFloat(this.calculatedSGSTAmount[e]),r=l+d+o;return isNaN(r)?0:r.toFixed(2)})},calculatedSGSTAmount(){return this.AllBrandproducts.map((t,e)=>{const l=parseFloat(this.calculatedTaxableAmount[e]),d=parseFloat(t.sgst.replace("%","")),o=l*d/100;return isNaN(o)?0:o.toFixed(2)})},calculatedCGSTAmount(){return this.AllBrandproducts.map((t,e)=>{const l=parseFloat(this.calculatedTaxableAmount[e]),d=parseFloat(t.cgst.replace("%","")),o=l*d/100;return isNaN(o)?0:o.toFixed(2)})},calculatedPricePerUnit(){return this.AllBrandproducts.map(t=>{const e=parseFloat(t.mrp),l=parseFloat(t.total_given_margin.replace("%","")),d=e-e*l/100;return isNaN(d)?0:d.toFixed(2)})},calculatedTaxableAmount(){return this.AllBrandproducts.map((t,e)=>{const l=parseFloat(t.quantity),d=this.calculatedPricePerUnit[e],o=parseFloat(d);if(l===0)return 0;if(isNaN(l)||isNaN(o))return console.log(`Invalid quantity or price at index ${e}`),0;const r=l*o;return isNaN(r)?0:r.toFixed(2)})},brandNames(){return this.Brandname.map(t=>t.brand_name)}},mounted(){this.getBrandsdata(),this.createdBy=localStorage.getItem("createdby"),this.userIds=localStorage.getItem("userId")},methods:{validateNumericInput(t){const e=t.target.value.replace(/[^0-9]/g,"");this.item.quantity=e},getFormattedDate(t){const e=t.getFullYear(),l=String(t.getMonth()+1).padStart(2,"0"),d=String(t.getDate()).padStart(2,"0");return`${e}-${l}-${d}`},resetdetails(){this.AllBrandproducts.map(t=>t.quantity="")},validateForm(){this.$refs.purchaseOrderForm.validate().then(t=>{console.log("form valid",t.valid),t.valid==!0?this.allQuantity>=1?this.saveData():(this.snackbar=!0,this.snackbarText="Please give Quantities",this.color="error"):(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="error")})},preventPaste(t){const l=(t.clipboardData||window.clipboardData).getData("text");/^[0-9]+$/.test(l)||t.preventDefault()},preventDecimal(t){(t.key==="."||t.key===","||t.key==="+"||t.key==="-"||t.keyCode===189||t.keyCode===109)&&t.preventDefault()},saveData(){console.log("check the CGST Amount",this.allCGSTAmount);const t={Draft:1,Created:2,Shared:3,Acknowledged:4,Received:5},e={brand_id:this.selectedBrandId,user_id:this.userIds,created_date:this.formData.created_date,delivery_date:this.formData.delivery_date,po_status:t[this.formData.po_status],total_cgst:`${this.allCGSTAmount}`,total_sgst:`${this.allSGSTAmount}`,you_saved:`${this.savedamount}`,sub_total:`${this.allTaxableAmmount}`,total_po_amount:`${this.allAmmount}`,total_quantity:`${this.allQuantity}`,products:this.AllBrandproducts.filter(l=>l.quantity>0).map((l,d)=>({brand_product_id:l.brand_product_id,sku_name:l.sku_name,hsn_code:l.hsn_code,mrp:l.mrp,quantity:`${l.quantity}`,uom:`${l.uom}`,sgst_percentage:l.sgst.includes("%")?`${l.sgst}`:`${l.sgst}%`,cgst_percentage:l.cgst.includes("%")?`${l.cgst}`:`${l.cgst}%`,price_per_unit:`${this.calculatedPricePerUnit[d]}`,taxable_amount:`${this.calculatedTaxableAmount[d]}`,csgt:`${this.calculatedCGSTAmount[d]}`,sgst:`${this.calculatedSGSTAmount[d]}`,amount:`${this.calculateTotalamount[d]}`,total_give_margin:l.total_given_margin}))};console.log("check the post data",e),this.postPurchaseorder(e).then(l=>{console.log("check the response",l),console.log("check the response",l.status),l.status==1?(this.snackbar=!0,this.color="success",this.formData={},this.snackbarText=l.message,setTimeout(()=>{window.location.reload(!0)},1300)):(this.snackbar=!0,this.color="error")})},colorTGMmargin(t){return t?{color:"success"}:{color:"error"}},colorSGSTmargin(t){return t?{color:"success"}:{color:"error"}},colorCGSTmargin(t){return t?{color:"success"}:{color:"error"}},handleBrandSelection(){console.log("Brand changed:",this.selectedPurchaseOrder);const t=this.Brandname.find(e=>e.brand_name===this.selectedPurchaseOrder);console.log("Select Brand Details",t),t&&(this.selectedBrandId=t.brand_id,console.log("check the brandId",this.selectedBrandId),this.getBrandproducts(this.selectedBrandId).then(e=>{this.AllBrandproducts=e.data,console.log("BrandID",this.AllBrandproducts)}))},getBrandsdata(){this.getBrands().then(t=>{this.Brandname=t.data,console.log("check the response",this.Brandname)})},onDateChange(){console.log("Selected date:",this.selectedDate)},deleteRow(t){const e=this.AllBrandproducts.indexOf(t);e!==-1&&this.AllBrandproducts.splice(e,1)},openproductdialog(){console.log("check the dialog"),this.dialog=!0},closeDialog(){this.dialog=!1}}},Y={class:"text-center"},K={class:"text-center"},W={class:"text-center"},j={class:"text-center"},H={class:"text-center"},L={class:"text-center"},Z=a("br",null,null,-1),J={class:"text-center"},X={class:"text-center"},$=a("br",null,null,-1),tt={class:"text-center"},et=a("br",null,null,-1),at={class:"text-center"},lt=a("td",{class:"text-center"},"Total",-1),st=a("td",null,null,-1),ot=a("td",null,null,-1),rt={class:"text-center"},nt=a("td",null,null,-1),ct=a("td",null,null,-1),dt={class:"text-center"},ut={class:"text-center"},it={class:"text-center"},mt={class:"text-center"},_t=a("td",null,null,-1),ht=a("tr",null,[a("td",{class:"text-left",style:{"font-weight":"Bold"}},"Tax Details:"),a("td",{colspan:"4",class:"text-right"}),a("td",{colspan:"4",class:"text-left",style:{"font-weight":"Bold"}},"Amounts:"),a("td",{colspan:"4",class:"text-center"})],-1),pt=a("td",{class:"text-left"},"CGST",-1),ft={colspan:"4",class:"text-right"},gt=a("td",{colspan:"4",class:"text-left"},"SubTotal",-1),xt={colspan:"4",class:"text-center"},bt=a("td",{class:"text-left"},"SGST",-1),Tt={colspan:"4",class:"text-right"},At=a("td",{colspan:"4",class:"text-left"},"Total",-1),St={colspan:"4",class:"text-center"},yt=a("td",{class:"text-left"},null,-1),vt=a("td",{colspan:"4",class:"text-right"},null,-1),Vt=a("td",{colspan:"4",class:"text-left"},"Advance",-1),Bt={colspan:"4",class:"text-center"},kt=a("td",{class:"text-left"},null,-1),Dt=a("td",{colspan:"4",class:"text-right"},null,-1),Ft=a("td",{colspan:"4",class:"text-left"},"Balance",-1),Ct={colspan:"4",class:"text-center"},Pt=a("td",{class:"text-left"},null,-1),Gt=a("td",{colspan:"4",class:"text-right"},null,-1),Nt=a("td",{colspan:"4",class:"text-left"},"You Saved",-1),wt={colspan:"4",class:"text-center"};function qt(t,e,l,d,o,r){return h(),p("div",null,[s(x,null,{default:n(()=>[s(_,{cols:"12"},{default:n(()=>[s(v,{title:"Purchase Order",class:"mb-4"},{default:n(()=>[s(V,null,{default:n(()=>[s(B,{class:"mt-6",ref:"purchaseOrderForm"},{default:n(()=>[s(x,null,{default:n(()=>[s(_,{md:"6",cols:"12"},{default:n(()=>[s(b,{modelValue:o.selectedPurchaseOrder,"onUpdate:modelValue":[e[0]||(e[0]=c=>o.selectedPurchaseOrder=c),r.handleBrandSelection],label:"Brand or Manufacturer",items:r.brandNames,rules:o.BrandRules},null,8,["modelValue","items","rules","onUpdate:modelValue"])]),_:1}),s(_,{cols:"12",md:"6"},{default:n(()=>[s(g,{modelValue:o.createdBy,"onUpdate:modelValue":e[1]||(e[1]=c=>o.createdBy=c),label:"Created By",readonly:""},null,8,["modelValue"])]),_:1}),s(_,{cols:"12",md:"6"},{default:n(()=>[s(g,{modelValue:o.formData.created_date,"onUpdate:modelValue":e[2]||(e[2]=c=>o.formData.created_date=c),type:"date",label:"Order Date",min:o.today,rules:o.dateRules,readonly:""},null,8,["modelValue","min","rules"])]),_:1}),s(_,{md:"6",cols:"12"},{default:n(()=>[s(b,{modelValue:o.formData.po_status,"onUpdate:modelValue":e[3]||(e[3]=c=>o.formData.po_status=c),label:"PO Status",items:["Draft","Created","Shared","Acknowledged","Received"],rules:o.Statusrules},null,8,["modelValue","rules"])]),_:1}),s(_,{md:"6",cols:"12"},{default:n(()=>[s(g,{modelValue:o.formData.delivery_date,"onUpdate:modelValue":e[4]||(e[4]=c=>o.formData.delivery_date=c),type:"date",label:"Delivery Date",min:o.today,rules:o.dateRules},null,8,["modelValue","min","rules"])]),_:1}),s(D),s(_,{cols:"12"},{default:n(()=>[s(U,{headers:o.headers,items:r.filteredBrandProducts},{default:n(()=>[a("thead",null,[a("tr",null,[(h(!0),p(A,null,S(o.headers,c=>(h(),p("th",{class:"text-center",key:c},u(c.text),1))),128))])]),a("tbody",null,[(h(!0),p(A,null,S(r.filteredBrandProducts,(c,i)=>(h(),p("tr",{key:i},[a("td",Y,u(c.sku_name),1),a("td",K,u(c.hsn_code),1),a("td",W," \u20B9"+u(c.mrp),1),a("td",j,[s(g,{onKeydown:r.preventDecimal,onPaste:r.preventPaste,modelValue:c.quantity,"onUpdate:modelValue":y=>c.quantity=y,type:"number",min:"1",style:{"min-width":"80px"}},null,8,["onKeydown","onPaste","modelValue","onUpdate:modelValue"])]),a("td",H,u(c.uom),1),a("td",L,[m(" \u20B9 "+u(r.calculatedPricePerUnit[i])+" ",1),Z,s(T,{color:r.colorTGMmargin(c.total_given_margin).color,class:"font-weight-medium",size:"small"},{default:n(()=>[m(" ("+u(c.total_given_margin)+") ",1)]),_:2},1032,["color"])]),a("td",J," \u20B9"+u(r.calculatedTaxableAmount[i]),1),a("td",X,[m(" \u20B9"+u(r.calculatedCGSTAmount[i])+" ",1),$,s(T,{color:r.colorCGSTmargin(c.cgst).color,class:"font-weight-medium",size:"small"},{default:n(()=>[m(" ("+u(c.cgst)+") ",1)]),_:2},1032,["color"])]),a("td",tt,[m(" \u20B9"+u(r.calculatedSGSTAmount[i])+" ",1),et,s(T,{color:r.colorSGSTmargin(c.sgst).color,class:"font-weight-medium",size:"small"},{default:n(()=>[m(" ("+u(c.sgst)+") ",1)]),_:2},1032,["color"])]),a("td",at," \u20B9"+u(r.calculateTotalamount[i]),1),a("td",null,[s(f,{icon:"",variant:"text",color:"error",class:"me-2",size:"small",onClick:y=>r.deleteRow(c)},{default:n(()=>[s(F,{icon:"mdi-minus-circle-outline",size:"24"})]),_:2},1032,["onClick"])])]))),128))]),a("tfoot",null,[a("tr",null,[lt,st,ot,a("td",rt,u(r.allQuantity),1),nt,ct,a("td",dt," \u20B9"+u(r.allTaxableAmmount),1),a("td",ut," \u20B9"+u(r.allCGSTAmount),1),a("td",it," \u20B9"+u(r.allSGSTAmount),1),a("td",mt," \u20B9"+u(r.allAmmount),1),_t]),ht,a("tr",null,[pt,a("td",ft,"\u20B9"+u(r.allCGSTAmount),1),gt,a("td",xt,"\u20B9"+u(r.allAmmount),1)]),a("tr",null,[bt,a("td",Tt,"\u20B9"+u(r.allSGSTAmount),1),At,a("td",St,"\u20B9"+u(r.allAmmount),1)]),a("tr",null,[yt,vt,Vt,a("td",Bt,"\u20B9"+u(o.totals.Quantity),1)]),a("tr",null,[kt,Dt,Ft,a("td",Ct,"\u20B9"+u(r.allAmmount),1)]),a("tr",null,[Pt,Gt,Nt,a("td",wt,"\u20B9"+u(r.savedamount),1)])])]),_:1},8,["headers","items"])]),_:1}),s(_,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:n(()=>[s(f,{onClick:r.validateForm},{default:n(()=>[m("Save")]),_:1},8,["onClick"]),s(f,{color:"secondary",variant:"tonal",onClick:e[5]||(e[5]=c=>r.resetdetails())},{default:n(()=>[m(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),s(I,{modelValue:o.snackbar,"onUpdate:modelValue":e[6]||(e[6]=c=>o.snackbar=c),timeout:3500,color:o.color},{default:n(()=>[m(u(o.snackbarText),1)]),_:1},8,["modelValue","color"]),s(R,{modelValue:o.dialog,"onUpdate:modelValue":e[7]||(e[7]=c=>o.dialog=c),"max-width":"600"},{default:n(()=>[s(v,{title:"Add Your Product"},{default:n(()=>[s(V,null,{default:n(()=>[s(B,{class:"mt-6"},{default:n(()=>[s(x,null,{default:n(()=>[s(_,{md:"6",cols:"12"},{default:n(()=>[s(b,{label:"Products",items:["Normal Eggs","Premium Eggs","Poori","Methi Chapathi","Ragi Chapathi"]})]),_:1}),s(_,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:n(()=>[s(f,null,{default:n(()=>[m("Add")]),_:1}),s(f,{color:"secondary",variant:"tonal",type:"reset",onClick:r.closeDialog},{default:n(()=>[m(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1}),s(C)]),_:1})]),_:1},8,["modelValue"])])}const Ut=k(E,[["render",qt]]),It={components:{Addpurchaseorders:Ut},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Create Purchase Order",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=P(),this.activeTab=G(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function Rt(t,e,l,d,o,r){const c=N("Addpurchaseorders");return h(),p("div",null,[s(O,{modelValue:o.activeTab,"onUpdate:modelValue":e[0]||(e[0]=i=>o.activeTab=i),"show-arrows":""},{default:n(()=>[(h(!0),p(A,null,S(o.tabs,i=>(h(),w(z,{key:i.icon,value:i.tab},{default:n(()=>[s(F,{size:"20",start:"",icon:i.icon},null,8,["icon"]),m(" "+u(i.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),s(D),s(Q,{modelValue:o.activeTab,"onUpdate:modelValue":e[1]||(e[1]=i=>o.activeTab=i),class:"mt-5 disable-tab-transition",touch:!1},{default:n(()=>[s(M,{value:"account"},{default:n(()=>[s(c)]),_:1})]),_:1},8,["modelValue"])])}const Zt=k(It,[["render",Rt]]);export{Zt as default};
