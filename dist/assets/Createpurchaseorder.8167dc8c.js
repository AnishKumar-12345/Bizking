import{_ as F,o as _,c as p,g as s,b5 as D,b6 as x,w as d,i as h,j as v,k as V,l as b,s as k,a,F as A,q as S,t as u,b as m,m as g,u as P,br as w,bn as G,v as N,e as q,r as U,f as I}from"./index.80000cb6.js";import{s as R}from"./Services.46164876.js";import{V as C}from"./VForm.9f5e4f07.js";import{V as M}from"./VAutocomplete.21f90a74.js";import{V as f}from"./VTextField.2ad9d52f.js";import{V as B}from"./VSelect.fc86fc3c.js";import{V as O}from"./VTable.6ea43112.js";import{V as y}from"./VChip.eef75cd8.js";import{V as Q}from"./VSnackbar.9611439c.js";import{V as L}from"./VDialog.ba959f05.js";import{V as z,a as E,b as Y,c as H}from"./VWindowItem.db07c762.js";import"./index.2bd8ddc8.js";import"./VCheckboxBtn.6606658e.js";const K={mixins:[R],components:{},data(){return{loading:!0,loading2:!1,searchQuery:"",BrandRules:[t=>!!t||"Brand is required"],dateRules:[t=>!!t||"Date is required"],Statusrules:[t=>!!t||"Status Is Required"],quantityrules:[t=>!!t||"Quantity Is Required"],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,formData:{brand_id:"",user_id:"",created_date:this.getFormattedDate(new Date),delivery_date:"",po_status:"",total_cgst:"",total_sgst:"",you_saved:"",total_quantity:"","sub_total(taxable_amount_total)":"",total_so_amount:"",products:[{brand_product_id:"",sku_name:"",hsn_code:"",mrp:"",quantity:"",uom:"",price_per_unit:"",taxable_amount:"",cgst:"",sgst:"",amount:"",total_give_margin:"",sgst_percentage:"",cgst_percentage:"",margin_amount:""}]},quantityInput:0,AllBrandproducts:[],createdBy:"",userIds:"",Brandname:[],totals:{Quantity:0,TaxableAmmount:0,CGST:0,SGST:0,Ammount:0},today:this.getFormattedDate(new Date),landscape:!1,noTitle:!1,selectedPurchaseOrder:null,dialog:!1,headers:[{text:"Product Name",value:"sku_name"},{text:"UOM",value:"uom"},{text:"HSN",value:"hsn_code"},{text:"MRP",value:"mrp"},{text:"Quantity",value:"quantity"},{text:"Price/Unit",value:"calculatedPricePerUnit"},{text:"TaxableAmount",value:"calculatedTaxableAmount"},{text:"CGST",value:"calculatedCGSTAmount"},{text:"SGST",value:"calculatedSGSTAmount"},{text:"Amount",value:"calculateTotalamount"},{text:"Actions",value:"action"}]}},computed:{filteredBrandProducts(){return this.AllBrandproducts.filter(t=>t.quantity!==void 0)},filteredPurchaseOrder(){const t=this.searchQuery.toLowerCase().trim();return console.log("log in",t),this.filteredBrandProducts.filter(e=>e.sku_name&&e.sku_name.toLowerCase().includes(t)||e.hsn_code&&e.hsn_code.toLowerCase().includes(t)||e.mrp&&e.mrp.toString().toLowerCase().includes(t)||e.quantity&&e.quantity.toString().toLowerCase().includes(t)||e.uom&&e.uom.toLowerCase().includes(t)||e.total_given_margin&&e.total_given_margin.toString().toLowerCase().includes(t)||e.cgst&&e.cgst.toString().toLowerCase().includes(t)||e.sgst&&e.sgst.toString().toLowerCase().includes(t))},totalIndividualAmount(){return this.AllBrandproducts.reduce((t,e)=>{const n=parseFloat(e.mrp),o=parseFloat(e.quantity);if(!isNaN(n)&&!isNaN(o)){const l=n*o;return t+l}return t},0)},savedamount(){const t=parseFloat(this.allAmmount),e=this.totalIndividualAmount-(isNaN(t)?0:t);return Math.max(0,e).toFixed(2)},allAmmount(){const t=this.calculateTotalamount.reduce((e,n)=>e+parseFloat(n),0);return parseFloat(t.toFixed(2))},allSGSTAmount(){const t=this.calculatedSGSTAmount.reduce((e,n)=>e+parseFloat(n),0);return parseFloat(t.toFixed(2))},allCGSTAmount(){const t=this.calculatedCGSTAmount.reduce((e,n)=>e+parseFloat(n),0);return parseFloat(t.toFixed(2))},allTaxableAmmount(){const t=this.calculatedTaxableAmount.reduce((e,n)=>e+parseFloat(n),0);return parseFloat(t.toFixed(2))},allQuantity(){const t=this.AllBrandproducts.reduce((e,n)=>{const o=parseFloat(n.quantity);return isNaN(o)?e:e+o},0);return isNaN(t)?0:t.toFixed(0)},calculateTotalamount(){return this.AllBrandproducts.map((t,e)=>{const n=parseFloat(this.calculatedTaxableAmount[e]),o=parseFloat(this.calculatedCGSTAmount[e]),l=parseFloat(this.calculatedSGSTAmount[e]),r=n+o+l;return isNaN(r)?0:r.toFixed(2)})},calculatedSGSTAmount(){return this.AllBrandproducts.map((t,e)=>{const n=parseFloat(this.calculatedTaxableAmount[e]),o=parseFloat(t.sgst.replace("%","")),l=n*o/100;return isNaN(l)?0:l.toFixed(2)})},calculatedCGSTAmount(){return this.AllBrandproducts.map((t,e)=>{const n=parseFloat(this.calculatedTaxableAmount[e]),o=parseFloat(t.cgst.replace("%","")),l=n*o/100;return isNaN(l)?0:l.toFixed(2)})},calculateMargin(){return this.AllBrandproducts.map((t,e)=>{const n=parseFloat(t.mrp),o=parseFloat(t.total_given_margin.replace("%","")),l=n*o/100;return isNaN(l)?0:l.toFixed(2)})},calculatedPricePerUnit(){return this.AllBrandproducts.map((t,e)=>{const n=parseFloat(t.mrp),o=parseFloat(this.calculateMargin[e]),l=n-o;return isNaN(l)?0:l.toFixed(2)})},calculatedTaxableAmount(){return this.AllBrandproducts.map((t,e)=>{const n=parseFloat(t.quantity),o=this.calculatedPricePerUnit[e],l=parseFloat(t.cgst.replace("%","")),r=parseFloat(t.sgst.replace("%","")),c=parseFloat(o);if(n===0||isNaN(n)||isNaN(c))return 0;const i=o/(100+(l+r))*100*n;return isNaN(i)?0:i.toFixed(2)})},brandNames(){return this.Brandname.map(t=>t.brand_name)}},mounted(){this.getBrandsdata().then(()=>{this.loading=!1}).catch(t=>{console.error("Error fetching merchants:",t)}),this.createdBy=localStorage.getItem("createdby"),this.userIds=localStorage.getItem("userId")},methods:{validateNumericInput(t){const e=t.target.value.replace(/[^0-9]/g,"");this.item.quantity=e},getFormattedDate(t){const e=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0");return`${e}-${n}-${o}`},resetdetails(){this.AllBrandproducts.map(t=>t.quantity="")},validateForm(){this.$refs.purchaseOrderForm.validate().then(t=>{t.valid==!0?this.allQuantity>=1?this.saveData():(this.snackbar=!0,this.snackbarText="Please give Quantities",this.color="primary"):(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},preventPaste(t){const n=(t.clipboardData||window.clipboardData).getData("text");/^[0-9]+$/.test(n)||t.preventDefault()},preventDecimal(t){(t.key==="."||t.key===","||t.key==="+"||t.key==="-"||t.keyCode===189||t.keyCode===109)&&t.preventDefault()},saveData(){const t={Draft:1,Created:2,Shared:3,Acknowledged:4,Received:5};console.log("check the ammounts",this.AllBrandproducts.map((o,l)=>({taxable_amount:`${this.calculatedTaxableAmount[l]}`,price_per_unit:`${this.calculatedPricePerUnit[l]}`,csgt:`${this.calculatedCGSTAmount[l]}`,sgst:`${this.calculatedSGSTAmount[l]}`,amount:`${this.calculateTotalamount[l]}`,total_give_margin:o.total_given_margin})));const e=this.AllBrandproducts.filter(o=>o.quantity>0);console.log("t",e);const n={brand_id:this.selectedBrandId,user_id:this.userIds,created_date:this.formData.created_date,delivery_date:this.formData.delivery_date,po_status:t[this.formData.po_status],total_cgst:`${this.allCGSTAmount}`,total_sgst:`${this.allSGSTAmount}`,you_saved:`${this.savedamount}`,sub_total:`${this.allTaxableAmmount}`,total_po_amount:`${this.allAmmount}`,total_quantity:`${this.allQuantity}`,products:e.map((o,l)=>{const r=this.AllBrandproducts.findIndex(c=>c===o);return{brand_product_id:o.brand_product_id,sku_name:o.sku_name,hsn_code:o.hsn_code,mrp:o.mrp,quantity:`${o.quantity}`,uom:`${o.uom}`,sgst_percentage:o.sgst.includes("%")?`${o.sgst}`:`${o.sgst}%`,cgst_percentage:o.cgst.includes("%")?`${o.cgst}`:`${o.cgst}%`,price_per_unit:`${this.calculatedPricePerUnit[r]}`,taxable_amount:`${this.calculatedTaxableAmount[r]}`,csgt:`${this.calculatedCGSTAmount[r]}`,sgst:`${this.calculatedSGSTAmount[r]}`,amount:`${this.calculateTotalamount[r]}`,total_give_margin:o.total_given_margin}})};console.log("check the post data",n),this.postPurchaseorder(n).then(o=>{console.log("check the response",o),o.status==1?(this.snackbar=!0,this.color="primary",this.formData={},this.snackbarText=o.message,setTimeout(()=>{window.location.reload(!0)},1300)):(this.snackbar=!0,this.color="on-background")})},colorTGMmargin(t){return t?{color:"success"}:{color:"error"}},colorSGSTmargin(t){return t?{color:"success"}:{color:"error"}},colorCGSTmargin(t){return t?{color:"success"}:{color:"error"}},handleBrandSelection(){const t=this.Brandname.find(e=>e.brand_name===this.selectedPurchaseOrder);t&&(this.selectedBrandId=t.brand_id,this.loading2=!0,this.getBrandproducts(this.selectedBrandId).then(e=>{this.AllBrandproducts=e.data,this.loading2=!1,console.log("BrandID",this.AllBrandproducts)}))},getBrandsdata(){return new Promise((t,e)=>{this.getBrands().then(n=>{this.Brandname=n.data,t()}).catch(n=>{console.error("Error fetching merchants:",n),e(n)})})},onDateChange(){},deleteRow(t){const e=this.AllBrandproducts.indexOf(t);e!==-1&&this.AllBrandproducts.splice(e,1)},openproductdialog(){this.dialog=!0},closeDialog(){this.dialog=!1}}},W={key:0,class:"loading-container"},j={key:0,id:"app"},J=a("div",{id:"loading-bg"},[a("div",{class:"loading-logo"},[a("img",{src:G,height:"60",width:"68",alt:"Logo"})]),a("div",{class:"loading"},[a("div",{class:"effect-1 effects"}),a("div",{class:"effect-2 effects"}),a("div",{class:"effect-3 effects"})])],-1),X=[J],Z={style:{"max-width":"400px"}},$={key:0},tt=a("td",{colspan:"16",class:"text-center"},[a("h1",null,"No data found !")],-1),et=[tt],at={class:"text-center"},lt={class:"text-center"},st={class:"text-center"},ot={class:"text-center"},rt={class:"text-center"},nt={class:"text-center"},ct=a("br",null,null,-1),dt={class:"text-center"},ut={class:"text-center"},it=a("br",null,null,-1),mt={class:"text-center"},_t=a("br",null,null,-1),ht={class:"text-center"},pt=a("td",{class:"text-center"},"Total",-1),gt=a("td",null,null,-1),ft=a("td",null,null,-1),xt=a("td",null,null,-1),bt={class:"text-center"},yt=a("td",null,null,-1),At={class:"text-center"},St={class:"text-center"},Tt={class:"text-center"},vt={class:"text-center"},Vt=a("td",null,null,-1),Ct=a("tr",null,[a("td",{class:"text-left",style:{"font-weight":"Bold"}},"Tax Details:"),a("td",{colspan:"4",class:"text-right"}),a("td",{colspan:"4",class:"text-left",style:{"font-weight":"Bold"}},"Amounts:"),a("td",{colspan:"4",class:"text-center"})],-1),Bt=a("td",{class:"text-left"},"CGST",-1),Ft={colspan:"4",class:"text-right"},kt=a("td",{colspan:"4",class:"text-left"},"SubTotal",-1),Pt={colspan:"4",class:"text-center"},Dt=a("td",{class:"text-left"},"SGST",-1),wt={colspan:"4",class:"text-right"},Gt=a("td",{colspan:"4",class:"text-left"},"Total",-1),Nt={colspan:"4",class:"text-center"},qt=a("td",{class:"text-left"},null,-1),Ut=a("td",{colspan:"4",class:"text-right"},null,-1),It=a("td",{colspan:"4",class:"text-left"},"Advance",-1),Rt={colspan:"4",class:"text-center"},Mt=a("td",{class:"text-left"},null,-1),Ot=a("td",{colspan:"4",class:"text-right"},null,-1),Qt=a("td",{colspan:"4",class:"text-left"},"Balance",-1),Lt={colspan:"4",class:"text-center"},zt=a("td",{class:"text-left"},null,-1),Et=a("td",{colspan:"4",class:"text-right"},null,-1),Yt=a("td",{colspan:"4",class:"text-left"},"You Saved",-1),Ht={colspan:"4",class:"text-center"};function Kt(t,e,n,o,l,r){return _(),p("div",null,[l.loading?(_(),p("div",W,[s(D,{height:"5",color:"primary",indeterminate:"",class:"custom-loader","full-width":""})])):x("",!0),s(b,null,{default:d(()=>[s(h,{cols:"12"},{default:d(()=>[s(v,{title:"Purchase Order",class:"mb-4"},{default:d(()=>[s(V,null,{default:d(()=>[s(C,{class:"mt-6",ref:"purchaseOrderForm"},{default:d(()=>[s(b,null,{default:d(()=>[s(h,{md:"6",cols:"12"},{default:d(()=>[s(M,{modelValue:l.selectedPurchaseOrder,"onUpdate:modelValue":[e[0]||(e[0]=c=>l.selectedPurchaseOrder=c),r.handleBrandSelection],label:"Brand or Manufacturer",items:r.brandNames,rules:l.BrandRules,"menu-props":{maxHeight:200}},null,8,["modelValue","items","rules","onUpdate:modelValue"])]),_:1}),s(h,{cols:"12",md:"6"},{default:d(()=>[s(f,{modelValue:l.createdBy,"onUpdate:modelValue":e[1]||(e[1]=c=>l.createdBy=c),label:"Created By",readonly:""},null,8,["modelValue"])]),_:1}),s(h,{cols:"12",md:"6"},{default:d(()=>[s(f,{modelValue:l.formData.created_date,"onUpdate:modelValue":e[2]||(e[2]=c=>l.formData.created_date=c),type:"date",label:"Order Date",min:l.today,rules:l.dateRules,readonly:""},null,8,["modelValue","min","rules"])]),_:1}),s(h,{md:"6",cols:"12"},{default:d(()=>[s(B,{modelValue:l.formData.po_status,"onUpdate:modelValue":e[3]||(e[3]=c=>l.formData.po_status=c),label:"PO Status",items:["Draft","Created","Shared","Acknowledged"],rules:l.Statusrules},null,8,["modelValue","rules"])]),_:1}),s(h,{md:"6",cols:"12"},{default:d(()=>[s(f,{modelValue:l.formData.delivery_date,"onUpdate:modelValue":e[4]||(e[4]=c=>l.formData.delivery_date=c),type:"date",label:"Delivery Date",min:l.today,rules:l.dateRules},null,8,["modelValue","min","rules"])]),_:1}),s(k),l.loading2?(_(),p("div",j,X)):x("",!0),s(h,{cols:"12"},{default:d(()=>[a("div",Z,[s(f,{class:"mb-3",modelValue:l.searchQuery,"onUpdate:modelValue":e[5]||(e[5]=c=>l.searchQuery=c),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),s(O,{headers:l.headers,items:r.filteredBrandProducts},{default:d(()=>[a("thead",null,[a("tr",null,[(_(!0),p(A,null,S(l.headers,c=>(_(),p("th",{class:"text-center",key:c},u(c.text),1))),128))])]),a("tbody",null,[r.filteredPurchaseOrder.length===0?(_(),p("tr",$,et)):x("",!0),(_(!0),p(A,null,S(r.filteredPurchaseOrder,(c,i)=>(_(),p("tr",{key:i},[a("td",at,u(c.sku_name),1),a("td",lt,u(c.uom),1),a("td",st,u(c.hsn_code),1),a("td",ot," \u20B9"+u(c.mrp),1),a("td",rt,[s(f,{onKeydown:r.preventDecimal,onPaste:r.preventPaste,modelValue:c.quantity,"onUpdate:modelValue":T=>c.quantity=T,type:"number",min:"0",style:{"min-width":"80px"}},null,8,["onKeydown","onPaste","modelValue","onUpdate:modelValue"])]),a("td",nt,[m(" \u20B9 "+u(r.calculatedPricePerUnit[i])+" ",1),ct,s(y,{color:r.colorTGMmargin(c.total_given_margin).color,class:"font-weight-medium",size:"small"},{default:d(()=>[m(" ("+u(c.total_given_margin)+") ",1)]),_:2},1032,["color"])]),a("td",dt," \u20B9"+u(r.calculatedTaxableAmount[i]),1),a("td",ut,[m(" \u20B9"+u(r.calculatedCGSTAmount[i])+" ",1),it,s(y,{color:r.colorCGSTmargin(c.cgst).color,class:"font-weight-medium",size:"small"},{default:d(()=>[m(" ("+u(c.cgst)+") ",1)]),_:2},1032,["color"])]),a("td",mt,[m(" \u20B9"+u(r.calculatedSGSTAmount[i])+" ",1),_t,s(y,{color:r.colorSGSTmargin(c.sgst).color,class:"font-weight-medium",size:"small"},{default:d(()=>[m(" ("+u(c.sgst)+") ",1)]),_:2},1032,["color"])]),a("td",ht," \u20B9"+u(r.calculateTotalamount[i]),1),a("td",null,[s(g,{icon:"",variant:"text",color:"error",class:"me-2",size:"small",onClick:T=>r.deleteRow(c)},{default:d(()=>[s(P,{icon:"mdi-minus-circle-outline",size:"24"})]),_:2},1032,["onClick"])])]))),128))]),a("tfoot",null,[a("tr",null,[pt,gt,ft,xt,a("td",bt,u(r.allQuantity),1),yt,a("td",At," \u20B9"+u(r.allTaxableAmmount),1),a("td",St," \u20B9"+u(r.allCGSTAmount),1),a("td",Tt," \u20B9"+u(r.allSGSTAmount),1),a("td",vt," \u20B9"+u(r.allAmmount),1),Vt]),Ct,a("tr",null,[Bt,a("td",Ft,"\u20B9"+u(r.allCGSTAmount),1),kt,a("td",Pt,"\u20B9"+u(r.allAmmount),1)]),a("tr",null,[Dt,a("td",wt,"\u20B9"+u(r.allSGSTAmount),1),Gt,a("td",Nt,"\u20B9"+u(r.allAmmount),1)]),a("tr",null,[qt,Ut,It,a("td",Rt,"\u20B9"+u(l.totals.Quantity),1)]),a("tr",null,[Mt,Ot,Qt,a("td",Lt,"\u20B9"+u(r.allAmmount),1)]),a("tr",null,[zt,Et,Yt,a("td",Ht,"\u20B9"+u(r.savedamount),1)])])]),_:1},8,["headers","items"])]),_:1}),s(h,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:d(()=>[s(g,{onClick:r.validateForm},{default:d(()=>[m("Save")]),_:1},8,["onClick"]),s(g,{color:"secondary",variant:"tonal",onClick:e[6]||(e[6]=c=>r.resetdetails())},{default:d(()=>[m(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),s(Q,{modelValue:l.snackbar,"onUpdate:modelValue":e[7]||(e[7]=c=>l.snackbar=c),timeout:3500,color:l.color},{default:d(()=>[m(u(l.snackbarText),1)]),_:1},8,["modelValue","color"]),s(L,{modelValue:l.dialog,"onUpdate:modelValue":e[8]||(e[8]=c=>l.dialog=c),"max-width":"600"},{default:d(()=>[s(v,{title:"Add Your Product"},{default:d(()=>[s(V,null,{default:d(()=>[s(C,{class:"mt-6"},{default:d(()=>[s(b,null,{default:d(()=>[s(h,{md:"6",cols:"12"},{default:d(()=>[s(B,{label:"Products",items:["Normal Eggs","Premium Eggs","Poori","Methi Chapathi","Ragi Chapathi"]})]),_:1}),s(h,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:d(()=>[s(g,null,{default:d(()=>[m("Add")]),_:1}),s(g,{color:"secondary",variant:"tonal",type:"reset",onClick:r.closeDialog},{default:d(()=>[m(" Close ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1}),s(w)]),_:1})]),_:1},8,["modelValue"])])}const Wt=F(K,[["render",Kt]]),jt={components:{Addpurchaseorders:Wt},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Create Purchase Order",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=N(),this.activeTab=q(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function Jt(t,e,n,o,l,r){const c=U("Addpurchaseorders");return _(),p("div",null,[s(z,{modelValue:l.activeTab,"onUpdate:modelValue":e[0]||(e[0]=i=>l.activeTab=i),"show-arrows":""},{default:d(()=>[(_(!0),p(A,null,S(l.tabs,i=>(_(),I(H,{key:i.icon,value:i.tab},{default:d(()=>[s(P,{size:"20",start:"",icon:i.icon},null,8,["icon"]),m(" "+u(i.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),s(k),s(Y,{modelValue:l.activeTab,"onUpdate:modelValue":e[1]||(e[1]=i=>l.activeTab=i),class:"mt-5 disable-tab-transition",touch:!1},{default:d(()=>[s(E,{value:"account"},{default:d(()=>[s(c)]),_:1})]),_:1},8,["modelValue"])])}const ue=F(jt,[["render",Jt]]);export{ue as default};