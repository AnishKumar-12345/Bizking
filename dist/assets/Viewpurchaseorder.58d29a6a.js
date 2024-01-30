import{_ as U,o as m,c as h,g as l,w as d,a as t,F as g,s as b,t as r,f as D,n as f,v as S,b0 as B,j as C,k as F,l as A,i as p,m as v,u as w,b as x,b1 as N,b2 as I,x as q,e as O,r as M}from"./index.54857599.js";import{s as R}from"./Services.e63b2123.js";import{V as y}from"./VTable.8b61df50.js";import{V as P}from"./VForm.064411c2.js";import{V as T}from"./VSelect.578aa0b6.js";import{V as k}from"./VChip.ef64106c.js";import{V as G}from"./VDialog.ce83705d.js";import{V as z}from"./VSnackbar.de4bad60.js";import{V as Q,a as H,b as K,c as W}from"./VWindowItem.cfd7410a.js";import"./index.2bd8ddc8.js";import"./VCheckboxBtn.6ac29c36.js";const j={mixins:[R],data(){return{snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,dialog2:!1,viewProduct:[],combinedProducts:[],totals:{Quantity:0,TaxableAmmount:0,CGST:0,SGST:0,Ammount:0},AllBrandproducts:[],selectedBrandId:"",Brandname:[],editProduct:[],VproductData:{brand_id:"",user_id:"",created_date:"",po_status:"",total_cgst:"",total_sgst:"",you_saved:"",po_id:"",po_number:"","sub_total(taxable_amount_total)":"",total_so_amount:"",products:[{brand_product_id:"",sku_name:"",hsn_code:"",mrp:"",quantity:"",uom:"",price_per_unit:"",taxable_amount:"",cgst:"",sgst:"",amount:"",total_give_margin:""}]},productData:{brand_id:"",user_id:"",created_date:"",po_status:"",total_cgst:"",total_sgst:"",you_saved:"",po_id:"",po_number:"","sub_total(taxable_amount_total)":"",total_so_amount:"",products:[{brand_product_id:"",sku_name:"",hsn_code:"",mrp:"",quantity:"",uom:"",price_per_unit:"",taxable_amount:"",cgst:"",sgst:"",amount:"",total_give_margin:""}]},dialog:!1,purchaseorders:[],userIds:"",userRoles:"",createdBy:"",headers:[{text:"Purchase Order",value:"po_number"},{text:"Order Date",value:"created_date"},{text:"Status",value:"po_status"},{text:"Order To",value:"brand_name"},{text:"Shipped To",value:"brand_name"},{text:"Total",value:"total_po_amount"},{text:"Action",value:"actions",sortable:!1}],headers2:[{text:"Product Name",value:"sku_name"},{text:"HSN",value:"hsn_code"},{text:"MRP",value:"mrp"},{text:"Quantity",value:"quantity"},{text:"UOM",value:"uom"},{text:"Price/Unit",value:"price_per_unit"},{text:"TaxableAmount",value:"taxable_amount"},{text:"CGST",value:"csgt"},{text:"SGST",value:"sgst"},{text:"Amount",value:"amount"}],headers3:[{text:"Product Name",value:"sku_name"},{text:"HSN",value:"hsn_code"},{text:"MRP",value:"mrp"},{text:"Quantity",value:"quantity"},{text:"UOM",value:"uom"},{text:"Price/Unit",value:"price_per_unit"},{text:"TaxableAmount",value:"taxable_amount"},{text:"CGST",value:"csgt"},{text:"SGST",value:"sgst"},{text:"Amount",value:"amount"}]}},computed:{totalIndividualAmount(){return this.AllBrandproducts.reduce((e,s)=>{const u=parseFloat(s.mrp),o=parseFloat(s.quantity),n=u*o;return console.log("check",e+n),e+n},0)},savedamount(){const e=this.totalIndividualAmount-parseFloat(this.allAmmount);return console.log("totalsave",e),isNaN(e)?0:Math.max(0,e).toFixed(2)},allAmmount(){const e=this.calculateTotalamount.reduce((s,u)=>s+parseFloat(u),0);return parseFloat(e.toFixed(2))},allSGSTAmount(){const e=this.calculatedSGSTAmount.reduce((s,u)=>s+parseFloat(u),0);return parseFloat(e.toFixed(2))},allCGSTAmount(){const e=this.calculatedCGSTAmount.reduce((s,u)=>s+parseFloat(u),0);return parseFloat(e.toFixed(2))},allTaxableAmmount(){const e=this.calculatedTaxableAmount.reduce((s,u)=>s+parseFloat(u),0);return parseFloat(e.toFixed(2))},allQuantity(){const e=this.AllBrandproducts.reduce((s,u)=>s+parseFloat(u.quantity),0);return isNaN(e)?0:e.toFixed(0)},calculateTotalamount(){return this.AllBrandproducts.map((e,s)=>{const u=parseFloat(this.calculatedTaxableAmount[s]),o=parseFloat(this.calculatedCGSTAmount[s]),n=parseFloat(this.calculatedSGSTAmount[s]),c=u+o+n;return isNaN(c)?0:c.toFixed(2)})},calculatedSGSTAmount(){return this.AllBrandproducts.map((e,s)=>{const u=parseFloat(this.calculatedTaxableAmount[s]),o=parseFloat(e.sgst.replace("%","")),n=u*o/100;return isNaN(n)?0:n.toFixed(2)})},calculatedCGSTAmount(){return this.AllBrandproducts.map((e,s)=>{const u=parseFloat(this.calculatedTaxableAmount[s]),o=parseFloat(e.cgst.replace("%","")),n=u*o/100;return isNaN(n)?0:n.toFixed(2)})},calculatedPricePerUnit(){return this.AllBrandproducts.map(e=>{const s=parseFloat(e.mrp),u=parseFloat(e.total_given_margin.replace("%","")),o=s-s*u/100;return isNaN(o)?0:o.toFixed(2)})},calculatedTaxableAmount(){return this.AllBrandproducts.map((e,s)=>{const u=parseFloat(e.quantity),o=this.calculatedPricePerUnit[s],n=parseFloat(o);if(isNaN(n))return console.log(`Invalid value at index ${s}: ${o}`),0;const c=u*n;return isNaN(c)?0:c.toFixed(2)})}},mounted(){this.createdBy=localStorage.getItem("createdby"),this.userIds=localStorage.getItem("userId"),this.userRoles=localStorage.getItem("userRole"),this.getPurchaseorderdetails(),this.getBrands()},methods:{deleteRow(e){const s=this.AllBrandproducts.indexOf(e);s!==-1&&this.AllBrandproducts.splice(s,1)},saveProducteditData(){const e={Draft:"1",Created:"2",Shared:"3",Acknowledged:"4"},s=this.editProduct.map(o=>o.brand_product_id),u={brand_id:this.selectedBrandId,user_id:this.userIds,created_date:this.productData.created_date,po_status:e[this.productData.po_status],total_cgst:`${this.allCGSTAmount}`,total_sgst:`${this.allSGSTAmount}`,you_saved:`${this.savedamount}`,sub_total:`${this.allTaxableAmmount}`,total_po_amount:`${this.allAmmount}`,po_id:this.productData.po_id,po_number:this.productData.po_number,products:this.AllBrandproducts.filter(o=>o.quantity>0).map((o,n)=>({brand_product_id:o.brand_product_id,sku_name:o.sku_name,hsn_code:o.hsn_code,mrp:o.mrp,quantity:`${o.quantity}`,uom:o.uom,price_per_unit:`${this.calculatedPricePerUnit[n]}`,taxable_amount:`${this.calculatedTaxableAmount[n]}`,csgt:`${this.calculatedCGSTAmount[n]}`,sgst:`${this.calculatedSGSTAmount[n]}`,amount:`${this.calculateTotalamount[n]}`,total_give_margin:o.total_given_margin})).concat(this.editProduct.filter(o=>!s.includes(o.brand_product_id)).map(o=>({brand_product_id:o.brand_product_id,sku_name:o.sku_name,hsn_code:o.hsn_code,mrp:o.mrp,quantity:o.quantity,uom:o.uom,price_per_unit:o.price_per_unit,taxable_amount:o.taxable_amount,csgt:o.cgst,sgst:o.sgst,amount:o.amount,total_give_margin:o.total_give_margin})))};console.log("check the post data",u),this.postupdatePurchaseorder(u).then(o=>{console.log("check the response",o),console.log("check the response",o.status),o.status==1?(this.snackbar=!0,this.color="success",this.formData={},this.snackbarText=o.message,this.getPurchaseorderdetails(),this.dialog=!1):(this.snackbar=!0,this.color="error")})},preventPaste(e){const u=(e.clipboardData||window.clipboardData).getData("text");/^[0-9]+$/.test(u)||e.preventDefault()},preventDecimal(e){(e.key==="."||e.key===","||e.keyCode===189||e.keyCode===109)&&e.preventDefault()},colorTGMmargin(e){return e?{color:"success"}:{color:"error"}},colorSGSTmargin(e){return e?{color:"success"}:{color:"error"}},colorCGSTmargin(e){return e?{color:"success"}:{color:"error"}},getBrandsdata(){this.getBrands().then(e=>{this.Brandname=e.data})},viewrow(e){console.log("check the dialog",e),this.dialog2=!0,this.VproductData.brand_name=e.brand_name,this.VproductData.created_date=e.created_date,this.VproductData.po_status=e.po_status,this.VproductData.po_number=e.po_number,this.VproductData.po_id=e.po_id,this.viewProduct=e.products},editrow(e){console.log("check the dialog",e),this.dialog=!0,this.productData.brand_name=e.brand_name,this.productData.created_date=e.created_date,this.productData.po_status=e.po_status,this.productData.po_number=e.po_number,this.productData.po_id=e.po_id,this.editProduct=e.products,this.productData.brand_name===e.brand_name&&(this.selectedBrandId=e.brand_id,this.getBrandproducts(this.selectedBrandId).then(s=>{this.AllBrandproducts=s.data,console.log("Branddetails",this.AllBrandproducts),console.log("text",this.AllBrandproducts),this.AllBrandproducts=this.AllBrandproducts.map(u=>{const o=this.editProduct.find(n=>n.brand_product_id==u.brand_product_id);return{...u,quantity:o?o.quantity:0}}),console.log("Filtered editProduct",this.AllBrandproducts)}))},closeDialog(){this.dialog=!1},getPurchaseorderdetails(){this.getPurchaseorder(this.userIds,this.userRoles).then(e=>{console.log("check the view purchase order",e),this.purchaseorders=e.data})},resolveStatusVariant(e){return e=="Created"?{color:"primary",text:"Created"}:e=="Draft"?{color:"success",text:"Draft"}:e=="Acknowledged"?{color:"warning",text:"Acknowledged"}:{color:"info",text:"Shared"}}}},i=e=>(N("data-v-8c1268c6"),e=e(),I(),e),E={class:"text-center"},L={class:"text-center"},Y={class:"text-center"},J={class:"text-center"},X={class:"text-center"},Z={class:"text-center"},$={class:"text-center"},tt={class:"text-center"},et={class:"text-center"},at={class:"text-center"},st={class:"text-center"},lt={class:"text-center"},ot={class:"text-center"},rt=i(()=>t("br",null,null,-1)),nt={class:"text-center"},dt={class:"text-center"},ct=i(()=>t("br",null,null,-1)),ut={class:"text-center"},it=i(()=>t("br",null,null,-1)),_t={class:"text-center"},mt=i(()=>t("td",{class:"text-center"},"Total",-1)),ht=i(()=>t("td",null,null,-1)),pt=i(()=>t("td",null,null,-1)),xt={class:"text-center"},gt=i(()=>t("td",null,null,-1)),bt=i(()=>t("td",null,null,-1)),ft={class:"text-center"},vt={class:"text-center"},Vt={class:"text-center"},At={class:"text-center"},Tt=i(()=>t("td",null,null,-1)),St=i(()=>t("tr",null,[t("td",{class:"text-left",style:{"font-weight":"Bold"}},"Tax Details:"),t("td",{colspan:"4",class:"text-right"}),t("td",{colspan:"4",class:"text-left",style:{"font-weight":"Bold"}},"Amounts:"),t("td",{colspan:"4",class:"text-center"})],-1)),yt=i(()=>t("td",{class:"text-left"},"CGST",-1)),kt={colspan:"4",class:"text-right"},Dt=i(()=>t("td",{colspan:"4",class:"text-left"},"SubTotal",-1)),wt={colspan:"4",class:"text-center"},Bt=i(()=>t("td",{class:"text-left"},"SGST",-1)),Ct={colspan:"4",class:"text-right"},Ft=i(()=>t("td",{colspan:"4",class:"text-left"},"Total",-1)),Pt={colspan:"4",class:"text-center"},Gt=i(()=>t("td",{class:"text-left"},null,-1)),Ut=i(()=>t("td",{colspan:"4",class:"text-right"},null,-1)),Nt=i(()=>t("td",{colspan:"4",class:"text-left"},"Advance",-1)),It={colspan:"4",class:"text-center"},qt=i(()=>t("td",{class:"text-left"},null,-1)),Ot=i(()=>t("td",{colspan:"4",class:"text-right"},null,-1)),Mt=i(()=>t("td",{colspan:"4",class:"text-left"},"Balance",-1)),Rt={colspan:"4",class:"text-center"},zt=i(()=>t("td",{class:"text-left"},null,-1)),Qt=i(()=>t("td",{colspan:"4",class:"text-right"},null,-1)),Ht=i(()=>t("td",{colspan:"4",class:"text-left"},"You Saved",-1)),Kt={colspan:"4",class:"text-center"},Wt={class:"text-center"},jt={class:"text-center"},Et={class:"text-center"},Lt={class:"text-center"},Yt={class:"text-center"},Jt={class:"text-center"},Xt={class:"text-center"},Zt={class:"text-center"},$t={class:"text-center"},te={class:"text-center"},ee=i(()=>t("td",{class:"text-center"},"Total",-1)),ae=i(()=>t("td",null,null,-1)),se=i(()=>t("td",null,null,-1)),le={class:"text-center"},oe=i(()=>t("td",null,null,-1)),re=i(()=>t("td",null,null,-1)),ne=i(()=>t("td",null,null,-1)),de={class:"text-center"},ce={class:"text-center"},ue={class:"text-center"},ie=i(()=>t("td",null,null,-1));function _e(e,s,u,o,n,c){return m(),h("div",null,[l(y,{headers:n.headers,items:this.purchaseorders,"item-key":"dessert",class:"table-rounded",height:"400","fixed-header":""},{default:d(()=>[t("thead",null,[t("tr",null,[(m(!0),h(g,null,b(n.headers,a=>(m(),h("th",{class:"text-center",key:a},r(a.text),1))),128))])]),t("tbody",null,[(m(!0),h(g,null,b(this.purchaseorders,(a,_)=>(m(),h("tr",{key:_},[t("td",E,r(a.po_number),1),t("td",L,r(a.created_date),1),t("td",Y,r(a.po_status),1),t("td",J,r(a.brand_name),1),t("td",X,r(a.brand_name),1),t("td",Z,r(a.total_po_amount),1),t("td",$,[a.po_status!="Acknowledged"&&a.po_status!="Shared"?(m(),D(f,{key:0,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:V=>c.editrow(a)},{default:d(()=>[l(S,{icon:"ri-pencil-line",size:"22"})]),_:2},1032,["onClick"])):B("",!0),a.po_status=="Acknowledged"||a.po_status=="Shared"?(m(),D(f,{key:1,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:V=>c.viewrow(a)},{default:d(()=>[l(S,{icon:"basil:eye-outline",size:"22"})]),_:2},1032,["onClick"])):B("",!0)])]))),128))])]),_:1},8,["headers","items"]),l(G,{modelValue:n.dialog,"onUpdate:modelValue":s[5]||(s[5]=a=>n.dialog=a),"max-width":"1000"},{default:d(()=>[l(C,{title:"Purchase Order",class:"mb-2"},{default:d(()=>[l(F,null,{default:d(()=>[l(A,null,{default:d(()=>[l(p,{cols:"12"},{default:d(()=>[l(P,{class:"mt-6",ref:"purchaseOrderForm"},{default:d(()=>[l(A,null,{default:d(()=>[l(p,{md:"6",cols:"12"},{default:d(()=>[l(T,{modelValue:this.productData.brand_name,"onUpdate:modelValue":s[0]||(s[0]=a=>this.productData.brand_name=a),label:"Brand or Manufacturer",readonly:""},null,8,["modelValue"])]),_:1}),l(p,{cols:"12",md:"6"},{default:d(()=>[l(v,{modelValue:this.createdBy,"onUpdate:modelValue":s[1]||(s[1]=a=>this.createdBy=a),label:"Created By",readonly:""},null,8,["modelValue"])]),_:1}),l(p,{cols:"12",md:"6"},{default:d(()=>[l(v,{modelValue:this.productData.created_date,"onUpdate:modelValue":s[2]||(s[2]=a=>this.productData.created_date=a),type:"date",label:"Date"},null,8,["modelValue"])]),_:1}),l(p,{md:"6",cols:"12"},{default:d(()=>[l(T,{modelValue:this.productData.po_status,"onUpdate:modelValue":s[3]||(s[3]=a=>this.productData.po_status=a),label:"PO Status",items:["Draft","Created","Shared","Acknowledged"]},null,8,["modelValue"])]),_:1}),l(w),l(p,{cols:"12"},{default:d(()=>[l(y,{headers:n.headers2,items:n.AllBrandproducts},{default:d(()=>[t("thead",null,[t("tr",null,[(m(!0),h(g,null,b(n.headers2,a=>(m(),h("th",{class:"text-center",key:a},r(a.text),1))),128))])]),t("tbody",null,[(m(!0),h(g,null,b(this.AllBrandproducts,(a,_)=>(m(),h("tr",{key:_},[t("td",tt,r(a.sku_name),1),t("td",et,r(a.hsn_code),1),t("td",at," \u20B9"+r(a.mrp),1),t("td",st,[l(v,{onKeydown:c.preventDecimal,onPaste:c.preventPaste,type:"number",modelValue:a.quantity,"onUpdate:modelValue":V=>a.quantity=V,style:{"min-width":"80px"}},null,8,["onKeydown","onPaste","modelValue","onUpdate:modelValue"])]),t("td",lt,r(a.uom),1),t("td",ot,[x(" \u20B9 "+r(c.calculatedPricePerUnit[_])+" ",1),rt,l(k,{color:c.colorTGMmargin(a.total_given_margin).color,class:"font-weight-medium",size:"small"},{default:d(()=>[x(" ("+r(a.total_given_margin)+") ",1)]),_:2},1032,["color"])]),t("td",nt," \u20B9"+r(c.calculatedTaxableAmount[_]),1),t("td",dt,[x(" \u20B9"+r(c.calculatedCGSTAmount[_])+" ",1),ct,l(k,{color:c.colorCGSTmargin(a.cgst).color,class:"font-weight-medium",size:"small"},{default:d(()=>[x(" ("+r(a.cgst)+") ",1)]),_:2},1032,["color"])]),t("td",ut,[x(" \u20B9"+r(c.calculatedSGSTAmount[_])+" ",1),it,l(k,{color:c.colorSGSTmargin(a.sgst).color,class:"font-weight-medium",size:"small"},{default:d(()=>[x(" ("+r(a.sgst)+") ",1)]),_:2},1032,["color"])]),t("td",_t," \u20B9"+r(c.calculateTotalamount[_]),1),t("td",null,[l(f,{icon:"",variant:"text",color:"error",class:"me-2",size:"small",onClick:V=>c.deleteRow(a)},{default:d(()=>[l(S,{icon:"mdi-minus-circle-outline",size:"24"})]),_:2},1032,["onClick"])])]))),128))]),t("tfoot",null,[t("tr",null,[mt,ht,pt,t("td",xt,r(c.allQuantity),1),gt,bt,t("td",ft," \u20B9"+r(c.allTaxableAmmount),1),t("td",vt," \u20B9"+r(c.allCGSTAmount),1),t("td",Vt," \u20B9"+r(c.allSGSTAmount),1),t("td",At," \u20B9"+r(c.allAmmount),1),Tt]),St,t("tr",null,[yt,t("td",kt,"\u20B9"+r(c.allCGSTAmount),1),Dt,t("td",wt,"\u20B9"+r(c.allAmmount),1)]),t("tr",null,[Bt,t("td",Ct,"\u20B9"+r(c.allSGSTAmount),1),Ft,t("td",Pt,"\u20B9"+r(c.allAmmount),1)]),t("tr",null,[Gt,Ut,Nt,t("td",It,"\u20B9"+r(n.totals.Quantity),1)]),t("tr",null,[qt,Ot,Mt,t("td",Rt,"\u20B9"+r(c.allAmmount),1)]),t("tr",null,[zt,Qt,Ht,t("td",Kt,"\u20B9"+r(c.savedamount),1)])])]),_:1},8,["headers","items"])]),_:1}),l(p,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:d(()=>[l(f,{onClick:c.saveProducteditData},{default:d(()=>[x("Save")]),_:1},8,["onClick"]),l(f,{color:"secondary",variant:"tonal",onClick:s[4]||(s[4]=a=>c.closeDialog())},{default:d(()=>[x(" Close ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(G,{modelValue:n.dialog2,"onUpdate:modelValue":s[10]||(s[10]=a=>n.dialog2=a),"max-width":"1000"},{default:d(()=>[l(C,{title:"Purchase Order",class:"mb-2"},{default:d(()=>[l(F,null,{default:d(()=>[l(A,null,{default:d(()=>[l(p,{cols:"12"},{default:d(()=>[l(P,{class:"mt-6",ref:"purchaseOrderForm"},{default:d(()=>[l(A,null,{default:d(()=>[l(p,{md:"6",cols:"12"},{default:d(()=>[l(T,{modelValue:this.VproductData.brand_name,"onUpdate:modelValue":s[6]||(s[6]=a=>this.VproductData.brand_name=a),label:"Brand or Manufacturer",readonly:""},null,8,["modelValue"])]),_:1}),l(p,{cols:"12",md:"6"},{default:d(()=>[l(v,{modelValue:this.createdBy,"onUpdate:modelValue":s[7]||(s[7]=a=>this.createdBy=a),label:"Created By",readonly:""},null,8,["modelValue"])]),_:1}),l(p,{cols:"12",md:"6"},{default:d(()=>[l(v,{modelValue:this.VproductData.created_date,"onUpdate:modelValue":s[8]||(s[8]=a=>this.VproductData.created_date=a),type:"date",label:"Date",readonly:""},null,8,["modelValue"])]),_:1}),l(p,{md:"6",cols:"12"},{default:d(()=>[l(T,{modelValue:this.VproductData.po_status,"onUpdate:modelValue":s[9]||(s[9]=a=>this.VproductData.po_status=a),label:"PO Status",readonly:""},null,8,["modelValue"])]),_:1}),l(w),l(p,{cols:"12"},{default:d(()=>[l(y,{headers:n.headers3,items:n.viewProduct},{default:d(()=>[t("thead",null,[t("tr",null,[(m(!0),h(g,null,b(n.headers3,a=>(m(),h("th",{class:"text-center",key:a},r(a.text),1))),128))])]),t("tbody",null,[(m(!0),h(g,null,b(this.viewProduct,(a,_)=>(m(),h("tr",{key:_},[t("td",Wt,r(a.sku_name),1),t("td",jt,r(a.hsn_code),1),t("td",Et,r(a.mrp),1),t("td",Lt,r(a.quantity),1),t("td",Yt,r(a.uom),1),t("td",Jt,r(a.price_per_unit),1),t("td",Xt,r(a.taxable_amount),1),t("td",Zt,r(a.csgt),1),t("td",$t,r(a.sgst),1),t("td",te,r(a.amount),1)]))),128))]),t("tfoot",null,[(m(!0),h(g,null,b(this.viewProduct,(a,_)=>(m(),h("tr",{key:_},[ee,ae,se,t("td",le,r(a.total_po_amount),1),oe,re,ne,t("td",de," \u20B9"+r(a.total_cgst),1),t("td",ce," \u20B9"+r(a.total_sgst),1),t("td",ue," \u20B9"+r(a.total_po_amount),1),ie]))),128))])]),_:1},8,["headers","items"])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(z,{modelValue:n.snackbar,"onUpdate:modelValue":s[11]||(s[11]=a=>n.snackbar=a),timeout:2e3,color:n.color},{default:d(()=>[x(r(n.snackbarText),1)]),_:1},8,["modelValue","color"])])}const me=U(j,[["render",_e],["__scopeId","data-v-8c1268c6"]]),he={components:{Viewpurchaseorders:me},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Purchase Order",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=q(),this.activeTab=O(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function pe(e,s,u,o,n,c){const a=M("Viewpurchaseorders");return m(),h("div",null,[l(Q,{modelValue:n.activeTab,"onUpdate:modelValue":s[0]||(s[0]=_=>n.activeTab=_),"show-arrows":""},{default:d(()=>[(m(!0),h(g,null,b(n.tabs,_=>(m(),D(W,{key:_.icon,value:_.tab},{default:d(()=>[l(S,{size:"20",start:"",icon:_.icon},null,8,["icon"]),x(" "+r(_.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),l(w),l(K,{modelValue:n.activeTab,"onUpdate:modelValue":s[1]||(s[1]=_=>n.activeTab=_),class:"mt-5 disable-tab-transition",touch:!1},{default:d(()=>[l(H,{value:"account"},{default:d(()=>[l(a)]),_:1})]),_:1},8,["modelValue"])])}const De=U(he,[["render",pe]]);export{De as default};
