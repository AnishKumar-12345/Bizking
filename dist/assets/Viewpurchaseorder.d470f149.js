import{_ as N,o as h,c as g,a as e,g as l,b7 as x,b6 as O,f as V,w as o,i as p,j as A,k as w,b as _,l as b,F as S,q as T,t as d,m as f,u as k,s as B,bv as U,bw as q,bE as I,bo as M,v as R,e as z,r as Q}from"./index.8efe7a96.js";import{s as L}from"./Services.de44bfa3.js";import{V as v}from"./VTextField.eec9f2df.js";import{V as E,a as Y}from"./VAlert.2bd16266.js";import{V as y}from"./VChip.41f23f7b.js";import{V as F}from"./VTable.60522f6d.js";import{V as K}from"./VPagination.34bb12b6.js";import{V as C}from"./VForm.57018c6e.js";import{V as G}from"./VSelect.f733f5b2.js";import{V as P}from"./VDialog.659383d4.js";import{V as j}from"./VTextarea.979f894a.js";import{V as H}from"./VSnackbar.86552cbe.js";import{V as W,a as Z,b as J,c as X}from"./VWindowItem.ce038142.js";import"./VCheckboxBtn.92971116.js";const $={mixins:[L],data(){return{cancelOrderdetails:{po_id:"",cancel_reason:"",po_status:6},workingRules:[t=>!!t||"Cancel Reason is required"],dialog3:!1,dialog4:!1,cancelOrder:{},maxPaginationPages:5,searchQuery:"",page:1,pageSize:10,today:this.getFormattedDate(new Date),loading:!0,loading2:!1,Viewtotals:{total_po_amount:"",total_taxableammout:"",total_cgst:"",total_sgst:""},Statusrules:[t=>!!t||"Status Is Required"],quantityrules:[t=>!!t||"Quantity Is Required"],dateRules:[t=>!!t||"Date is required"],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,dialog2:!1,viewProduct:[],combinedProducts:[],totals:{Quantity:0,TaxableAmmount:0,CGST:0,SGST:0,Ammount:0},AllBrandproducts:[],selectedBrandId:"",Brandname:[],editProduct:[],VproductData:{brand_id:"",user_id:"",created_date:"",po_status:"",total_cgst:"",total_sgst:"",you_saved:"",po_id:"",po_number:"",delivery_date:"",sub_total:"",total_so_amount:"",total_quantity:"",products:[{brand_product_id:"",sku_name:"",hsn_code:"",mrp:"",quantity:"",uom:"",price_per_unit:"",taxable_amount:"",cgst:"",sgst:"",amount:"",total_give_margin:""}]},productData:{brand_id:"",user_id:"",created_date:"",po_status:"",total_cgst:"",total_sgst:"",you_saved:"",po_id:"",po_number:"",delivery_date:"","sub_total(taxable_amount_total)":"",total_so_amount:"",total_quantity:"",products:[{brand_product_id:"",sku_name:"",hsn_code:"",mrp:"",quantity:"",uom:"",price_per_unit:"",taxable_amount:"",cgst:"",sgst:"",amount:"",total_give_margin:""}]},dialog:!1,purchaseorders:[],userIds:"",userRoles:"",createdBy:"",headers:[{text:"Purchase Order",value:"po_number"},{text:"Order Date",value:"created_date"},{text:"Status",value:"po_status"},{text:"Order To",value:"brand_name"},{text:"Shipped To",value:"brand_name"},{text:"Total",value:"total_po_amount"},{text:"Action",value:"actions",sortable:!1}],headers2:[{text:"Product Name",value:"sku_name"},{text:"UOM",value:"uom"},{text:"HSN",value:"hsn_code"},{text:"MRP",value:"mrp"},{text:"Quantity",value:"quantity"},{text:"Price/Unit",value:"price_per_unit"},{text:"TaxableAmount",value:"taxable_amount"},{text:"CGST",value:"csgt"},{text:"SGST",value:"sgst"},{text:"Amount",value:"amount"}],headers3:[{text:"Product Name",value:"sku_name"},{text:"UOM",value:"uom"},{text:"HSN",value:"hsn_code"},{text:"MRP",value:"mrp"},{text:"Quantity",value:"quantity"},{text:"Price/Unit",value:"price_per_unit"},{text:"TaxableAmount",value:"taxable_amount"},{text:"CGST",value:"csgt"},{text:"SGST",value:"sgst"},{text:"Amount",value:"amount"}]}},computed:{filteredPurchaseOrder(){const t=this.searchQuery.toLowerCase().trim();return this.purchaseorders.filter(s=>s.po_number&&s.po_number.toLowerCase().includes(t)||s.created_date&&s.created_date.toLowerCase().includes(t)||s.po_status&&s.po_status.toLowerCase().includes(t)||s.brand_name&&s.brand_name.toLowerCase().includes(t)||s.total_po_amount&&s.total_po_amount.toString().includes(t))},paginatedItems(){const t=(this.page-1)*this.pageSize,s=t+this.pageSize;return this.filteredPurchaseOrder.slice(t,s)},totalIndividualAmount(){return this.AllBrandproducts.reduce((t,s)=>{const c=parseFloat(s.mrp),i=parseFloat(s.quantity);if(!isNaN(c)&&!isNaN(i)){const n=c*i;return t+n}return t},0)},savedamount(){const t=parseFloat(this.allAmmount),s=this.totalIndividualAmount-(isNaN(t)?0:t);return Math.max(0,s).toFixed(2)},allAmmount(){const t=this.calculateTotalamount.reduce((s,c)=>s+parseFloat(c),0);return parseFloat(t.toFixed(2))},allSGSTAmount(){const t=this.calculatedSGSTAmount.reduce((s,c)=>s+parseFloat(c),0);return parseFloat(t.toFixed(2))},allCGSTAmount(){const t=this.calculatedCGSTAmount.reduce((s,c)=>s+parseFloat(c),0);return parseFloat(t.toFixed(2))},allTaxableAmmount(){const t=this.calculatedTaxableAmount.reduce((s,c)=>s+parseFloat(c),0);return parseFloat(t.toFixed(2))},allQuantity(){const t=this.AllBrandproducts.reduce((s,c)=>{const i=parseFloat(c.quantity);return isNaN(i)?s:s+i},0);return isNaN(t)?0:t.toFixed(0)},calculateTotalamount(){return this.AllBrandproducts.map((t,s)=>{const c=parseFloat(this.calculatedTaxableAmount[s]),i=parseFloat(this.calculatedCGSTAmount[s]),n=parseFloat(this.calculatedSGSTAmount[s]),r=c+i+n;return isNaN(r)?0:r.toFixed(2)})},calculatedSGSTAmount(){return this.AllBrandproducts.map((t,s)=>{const c=parseFloat(this.calculatedTaxableAmount[s]),i=parseFloat(t.sgst.replace("%","")),n=c*i/100;return isNaN(n)?0:n.toFixed(2)})},calculatedCGSTAmount(){return this.AllBrandproducts.map((t,s)=>{const c=parseFloat(this.calculatedTaxableAmount[s]),i=parseFloat(t.cgst.replace("%","")),n=c*i/100;return isNaN(n)?0:n.toFixed(2)})},calculateMargin(){return this.AllBrandproducts.map((t,s)=>{const c=parseFloat(t.mrp),i=parseFloat(t.total_given_margin.replace("%","")),n=c*i/100;return isNaN(n)?0:n.toFixed(2)})},calculatedPricePerUnit(){return this.AllBrandproducts.map((t,s)=>{const c=parseFloat(t.mrp),i=parseFloat(this.calculateMargin[s]),n=c-i;return isNaN(n)?0:n.toFixed(2)})},calculatedTaxableAmount(){return this.AllBrandproducts.map((t,s)=>{const c=parseFloat(t.quantity),i=this.calculatedPricePerUnit[s],n=parseFloat(t.cgst.replace("%","")),r=parseFloat(t.sgst.replace("%","")),a=parseFloat(i);if(c===0||isNaN(c)||isNaN(a))return 0;const m=i/(100+(n+r))*100*c;return isNaN(m)?0:m.toFixed(2)})}},mounted(){this.createdBy=localStorage.getItem("createdby"),this.userIds=localStorage.getItem("userId"),this.userRoles=localStorage.getItem("userRole"),this.getPurchaseorderdetails().then(()=>{this.loading=!1}).catch(t=>{console.error("Error fetching merchants:",t)})},methods:{validateForm8(){this.$refs.purchaseOrderForm5.validate().then(t=>{t.valid==!0?this.cancelordersata():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},cancelordersata(){console.log("check te data",this.cancelOrder.po_id);const t={po_id:this.cancelOrder.po_id,cancel_reason:this.cancelOrderdetails.cancel_reason,po_status:6};console.log("check the data",t),this.Cancelpurchaseorder(t).then(s=>{console.log("details data",s),s.data.status==1?(this.snackbar=!0,this.color="primary",this.cancelOrderdetails={},this.snackbarText=s.data.message,this.getPurchaseorderdetails().then(()=>{this.loading=!1}).catch(c=>{console.error("Error fetching merchants:",c)}),this.dialog4=!1):(this.snackbar=!0,this.color="on-background",this.dialog4=!1)})},cancelstock(t){this.dialog3=!0,console.log("test",t),this.cancelOrder=t},validateFormopen(){this.dialog4=!0,this.dialog3=!1},closeDialogform(){this.dialog3=!1},updatePagination(t){this.page=t},getFormattedDate(t){const s=t.getFullYear(),c=String(t.getMonth()+1).padStart(2,"0"),i=String(t.getDate()).padStart(2,"0");return`${s}-${c}-${i}`},colorTGMmargin(t){return t?{color:"success"}:{color:"error"}},colorSGSTmargin(t){return t?{color:"success"}:{color:"error"}},colorCGSTmargin(t){return t?{color:"success"}:{color:"error"}},getPDFupdate(t){this.loading2=!0,this.getPurchasePDF(t).then(s=>{const c=s.data.po_file;this.loading2=!1,window.open(c,"_blank")})},DownloadPDF(t){if(t==null)this.snackbar=!0,this.snackbarText="PDF is not available",this.color="on-background";else{const s=t;window.open(s,"_blank")}},closedialog2(){this.dialog2=!1},validateForm(){this.$refs.purchaseOrderForm.validate().then(t=>{t.valid==!0?this.allQuantity>=1?this.saveProducteditData():(this.snackbar=!0,this.snackbarText="Please give Quantities",this.color="on-background"):(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},deleteRow(t){const s=this.AllBrandproducts.indexOf(t);s!==-1&&this.AllBrandproducts.splice(s,1)},saveProducteditData(){const t={Draft:1,Created:2,Shared:3,Acknowledged:4,Received:5},s=Math.max(this.AllBrandproducts.length,this.calculatedPricePerUnit.length,this.calculatedTaxableAmount.length,this.calculatedCGSTAmount.length,this.calculatedSGSTAmount.length,this.calculateTotalamount.length),c=[];for(let r=0;r<s;r++){const a=this.AllBrandproducts[r];!a||a.quantity<=0||c.push({brand_product_id:a.brand_product_id,sku_name:a.sku_name,hsn_code:a.hsn_code,mrp:a.mrp,quantity:`${a.quantity}`,uom:a.uom,price_per_unit:this.calculatedPricePerUnit[r]||"0",taxable_amount:this.calculatedTaxableAmount[r]||"0",csgt:this.calculatedCGSTAmount[r]||"0",sgst:this.calculatedSGSTAmount[r]||"0",amount:this.calculateTotalamount[r]||"0",sgst_percentage:a.sgst.includes("%")?`${a.sgst}`:`${a.sgst}%`,cgst_percentage:a.cgst.includes("%")?`${a.cgst}`:`${a.cgst}%`,total_give_margin:a.total_given_margin})}const i=this.editProduct.map(r=>r.brand_product_id),n={brand_id:this.selectedBrandId,user_id:this.userIds,created_date:this.productData.created_date,delivery_date:this.productData.delivery_date,po_status:t[this.productData.po_status],total_cgst:`${this.allCGSTAmount}`,total_sgst:`${this.allSGSTAmount}`,you_saved:`${this.savedamount}`,sub_total:`${this.allTaxableAmmount}`,total_po_amount:`${this.allAmmount}`,total_quantity:`${this.allQuantity}`,po_id:this.productData.po_id,po_number:this.productData.po_number,products:c.concat(this.editProduct.filter(r=>!i.includes(r.brand_product_id)).map(r=>({brand_product_id:r.brand_product_id,sku_name:r.sku_name,hsn_code:r.hsn_code,mrp:r.mrp,quantity:r.quantity,uom:r.uom,price_per_unit:r.price_per_unit,taxable_amount:r.taxable_amount,csgt:r.cgst,sgst:r.sgst,amount:r.amount,total_give_margin:r.total_give_margin})))};this.postupdatePurchaseorder(n).then(r=>{r.status==1?(this.snackbar=!0,this.color="primary",this.formData={},this.snackbarText=r.message,this.getPurchaseorderdetails(),this.dialog=!1):(this.snackbar=!0,this.color="on-background")})},preventPaste(t){const c=(t.clipboardData||window.clipboardData).getData("text");/^[0-9]+$/.test(c)||t.preventDefault()},preventDecimal(t){(t.key==="."||t.key===","||t.key==="+"||t.key==="-"||t.keyCode===189||t.keyCode===109)&&t.preventDefault()},colorTGMmargin(t){return t?{color:"success"}:{color:"error"}},colorSGSTmargin(t){return t?{color:"success"}:{color:"error"}},colorCGSTmargin(t){return t?{color:"success"}:{color:"error"}},getBrandsdata(){this.getBrands().then(t=>{this.Brandname=t.data})},viewrow(t){this.dialog2=!0,this.VproductData.brand_name=t.brand_name,this.VproductData.created_date=t.created_date,this.VproductData.po_status=t.po_status,this.VproductData.po_number=t.po_number,this.VproductData.po_id=t.po_id,this.VproductData.total_po_amount=t.total_po_amount,this.VproductData.total_cgst=t.total_cgst,this.VproductData.total_sgst=t.total_sgst,this.VproductData.you_saved=t.you_saved,this.VproductData.total_quantity=t.total_quantity,this.VproductData.sub_total=t.sub_total,this.VproductData.delivery_date=t.delivery_date,this.viewProduct=t.products},editrow(t){this.dialog=!0,this.productData.brand_name=t.brand_name,this.productData.created_date=t.created_date,this.productData.delivery_date=t.delivery_date,this.productData.po_status=t.po_status,this.productData.po_number=t.po_number,this.productData.po_id=t.po_id,this.editProduct=t.products,this.productData.brand_name===t.brand_name&&(this.selectedBrandId=t.brand_id,this.getBrandproducts(this.selectedBrandId).then(s=>{this.AllBrandproducts=s.data,this.AllBrandproducts=this.AllBrandproducts.map(c=>{const i=this.editProduct.find(n=>n.brand_product_id==c.brand_product_id);return{...c,quantity:i?i.quantity:0}})}))},closeDialog(){this.dialog=!1},getPurchaseorderdetails(){return new Promise((t,s)=>{this.getPurchaseorder(this.userIds,this.userRoles).then(c=>{this.purchaseorders=c.data,this.purchaseorders.reverse(),t()}).catch(c=>{console.error("Error fetching merchants:",c),s(c)})})},colorPOstatus(t){return t=="Created"?{color:"primary"}:t=="Draft"?{color:"success"}:t=="Acknowledged"?{color:"warning"}:t=="Received"?{color:"success"}:t=="Shared"?{color:"info"}:{color:"error"}}}},u=t=>(U("data-v-f1e35ac7"),t=t(),q(),t),tt={style:{"max-width":"400px"}},et={key:0,id:"app"},at=I('<div id="loading-bg" data-v-f1e35ac7><div class="loading-logo" data-v-f1e35ac7><img src="'+M+'" height="60" width="68" alt="Logo" data-v-f1e35ac7></div><div class="loading" data-v-f1e35ac7><div class="effect-1 effects" data-v-f1e35ac7></div><div class="effect-2 effects" data-v-f1e35ac7></div><div class="effect-3 effects" data-v-f1e35ac7></div></div></div>',1),st=[at],lt={key:1,class:"loading-container"},ot=u(()=>e("p",{class:"mb-0"}," The system is not retrieving the Purchase Orders. Please ensure that you have applied for Purchase Orders !",-1)),rt={key:0},nt=u(()=>e("td",{colspan:"16",class:"text-center"},[e("h1",null,"No data found !")],-1)),dt=[nt],ct={class:"text-center"},ut={class:"text-center"},it={class:"text-center"},_t={class:"text-center"},ht={class:"text-center"},pt={class:"text-center"},mt={class:"text-center",style:{display:"flex","justify-content":"center","align-items":"center"}},gt={class:"text-center"},ft={class:"text-center"},xt={class:"text-center"},bt={class:"text-center"},vt={class:"text-center"},yt={class:"text-center"},Vt=u(()=>e("br",null,null,-1)),St={class:"text-center"},Tt={class:"text-center"},Dt=u(()=>e("br",null,null,-1)),kt={class:"text-center"},At=u(()=>e("br",null,null,-1)),wt={class:"text-center"},Ct=u(()=>e("td",{class:"text-center"},"Total",-1)),Pt=u(()=>e("td",null,null,-1)),Ft=u(()=>e("td",null,null,-1)),Gt=u(()=>e("td",null,null,-1)),Bt={class:"text-center"},Nt=u(()=>e("td",null,null,-1)),Ot={class:"text-center"},Ut={class:"text-center"},qt={class:"text-center"},It={class:"text-center"},Mt=u(()=>e("td",null,null,-1)),Rt=u(()=>e("tr",null,[e("td",{class:"text-left",style:{"font-weight":"Bold"}}," Tax Details: "),e("td",{colspan:"4",class:"text-right"}),e("td",{colspan:"4",class:"text-left",style:{"font-weight":"Bold"}}," Amounts: "),e("td",{colspan:"4",class:"text-center"})],-1)),zt=u(()=>e("td",{class:"text-left"},"CGST",-1)),Qt={colspan:"4",class:"text-right"},Lt=u(()=>e("td",{colspan:"4",class:"text-left"}," SubTotal ",-1)),Et={colspan:"4",class:"text-center"},Yt=u(()=>e("td",{class:"text-left"},"SGST",-1)),Kt={colspan:"4",class:"text-right"},jt=u(()=>e("td",{colspan:"4",class:"text-left"}," Total ",-1)),Ht={colspan:"4",class:"text-center"},Wt=u(()=>e("td",{class:"text-left"},null,-1)),Zt=u(()=>e("td",{colspan:"4",class:"text-right"},null,-1)),Jt=u(()=>e("td",{colspan:"4",class:"text-left"}," Advance ",-1)),Xt={colspan:"4",class:"text-center"},$t=u(()=>e("td",{class:"text-left"},null,-1)),te=u(()=>e("td",{colspan:"4",class:"text-right"},null,-1)),ee=u(()=>e("td",{colspan:"4",class:"text-left"}," Balance ",-1)),ae={colspan:"4",class:"text-center"},se=u(()=>e("td",{class:"text-left"},null,-1)),le=u(()=>e("td",{colspan:"4",class:"text-right"},null,-1)),oe=u(()=>e("td",{colspan:"4",class:"text-left"}," You Saved ",-1)),re={colspan:"4",class:"text-center"},ne={class:"text-center"},de={class:"text-center"},ce={class:"text-center"},ue={class:"text-center"},ie={class:"text-center"},_e={class:"text-center"},he={class:"text-center"},pe={class:"text-center"},me={class:"text-center"},ge={class:"text-center"},fe=u(()=>e("td",{class:"text-center"},"Total",-1)),xe=u(()=>e("td",null,null,-1)),be=u(()=>e("td",null,null,-1)),ve=u(()=>e("td",null,null,-1)),ye={class:"text-center"},Ve=u(()=>e("td",null,null,-1)),Se={class:"text-center"},Te={class:"text-center"},De={class:"text-center"},ke={class:"text-center"},Ae=u(()=>e("td",null,null,-1)),we=u(()=>e("tr",null,[e("td",{class:"text-left",style:{"font-weight":"Bold"}}," Tax Details: "),e("td",{colspan:"4",class:"text-right"}),e("td",{colspan:"4",class:"text-left",style:{"font-weight":"Bold"}}," Amounts: "),e("td",{colspan:"4",class:"text-center"})],-1)),Ce=u(()=>e("td",{class:"text-left"},"CGST",-1)),Pe={colspan:"4",class:"text-right"},Fe=u(()=>e("td",{colspan:"4",class:"text-left"}," SubTotal ",-1)),Ge={colspan:"4",class:"text-center"},Be=u(()=>e("td",{class:"text-left"},"SGST",-1)),Ne={colspan:"4",class:"text-right"},Oe=u(()=>e("td",{colspan:"4",class:"text-left"}," Total ",-1)),Ue={colspan:"4",class:"text-center"},qe=u(()=>e("td",{class:"text-left"},null,-1)),Ie=u(()=>e("td",{colspan:"4",class:"text-right"},null,-1)),Me=u(()=>e("td",{colspan:"4",class:"text-left"}," Advance ",-1)),Re={colspan:"4",class:"text-center"},ze=u(()=>e("td",{class:"text-left"},null,-1)),Qe=u(()=>e("td",{colspan:"4",class:"text-right"},null,-1)),Le=u(()=>e("td",{colspan:"4",class:"text-left"}," Balance ",-1)),Ee={colspan:"4",class:"text-center"},Ye=u(()=>e("td",{class:"text-left"},null,-1)),Ke=u(()=>e("td",{colspan:"4",class:"text-right"},null,-1)),je=u(()=>e("td",{colspan:"4",class:"text-left"}," You Saved ",-1)),He={colspan:"4",class:"text-center"};function We(t,s,c,i,n,r){return h(),g("div",null,[e("div",tt,[l(v,{class:"mb-3",modelValue:n.searchQuery,"onUpdate:modelValue":s[0]||(s[0]=a=>n.searchQuery=a),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),n.loading?(h(),g("div",et,st)):x("",!0),n.loading2?(h(),g("div",lt,[l(O,{height:"5",color:"error",indeterminate:"",class:"custom-loader","full-width":""})])):x("",!0),this.purchaseorders==null?(h(),V(b,{key:2},{default:o(()=>[l(p,{cols:"12"},{default:o(()=>[l(A,{title:"Purchase Order View"},{default:o(()=>[l(w,null,{default:o(()=>[l(E,{color:"warning",variant:"tonal",class:"mb-4",border:"top"},{default:o(()=>[l(Y,{class:"mb-1"},{default:o(()=>[_(" Are you sure you gave Purchase Orders? ")]),_:1}),ot]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})):x("",!0),this.purchaseorders!=null?(h(),V(F,{key:3,headers:n.headers,items:this.paginatedItems,class:"table-rounded",height:"500","fixed-header":""},{default:o(()=>[e("thead",null,[e("tr",null,[(h(!0),g(S,null,T(n.headers,a=>(h(),g("th",{class:"text-center",key:a},d(a.text),1))),128))])]),e("tbody",null,[r.filteredPurchaseOrder.length===0?(h(),g("tr",rt,dt)):x("",!0),(h(!0),g(S,null,T(this.paginatedItems,(a,m)=>(h(),g("tr",{key:m},[e("td",ct,d(a.po_number),1),e("td",ut,d(a.created_date),1),e("td",it,[l(y,{color:r.colorPOstatus(a.po_status).color,class:"font-weight-medium",size:"small"},{default:o(()=>[_(d(a.po_status),1)]),_:2},1032,["color"])]),e("td",_t,d(a.brand_name),1),e("td",ht,d(a.brand_name==a.brand_name?"Mouriya Spiritual & Naturals(BIZKINGZ)":a.brand_name),1),e("td",pt,"\u20B9"+d(a.total_po_amount),1),e("td",mt,[a.po_status!="Acknowledged"&&a.po_status!="Shared"&&a.po_status!="Received"&&a.po_status!="Cancelled"?(h(),V(f,{key:0,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:D=>r.editrow(a)},{default:o(()=>[l(k,{color:"warning",icon:"ri-pencil-line",size:"22"})]),_:2},1032,["onClick"])):x("",!0),a.po_status=="Acknowledged"||a.po_status=="Shared"||a.po_status=="Received"||a.po_status=="Cancelled"?(h(),V(f,{key:1,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:D=>r.viewrow(a)},{default:o(()=>[l(k,{color:"success",icon:"basil:eye-outline",size:"22"})]),_:2},1032,["onClick"])):x("",!0),a.po_status=="Acknowledged"||a.po_status=="Shared"||a.po_status=="Received"?(h(),V(f,{key:2,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:D=>r.getPDFupdate(a.po_id)},{default:o(()=>[l(k,{color:"error",icon:"iwwa:file-pdf",size:"26"})]),_:2},1032,["onClick"])):x("",!0),a.po_status=="Acknowledged"||a.po_status=="Shared"||a.po_status=="Draft"?(h(),V(f,{key:3,icon:"",variant:"text",color:"error",class:"me-2",size:"small",onClick:D=>r.cancelstock(a)},{default:o(()=>[l(k,{icon:"material-symbols:cancel-outline",color:"error",size:"30"})]),_:2},1032,["onClick"])):x("",!0)])]))),128))])]),_:1},8,["headers","items"])):x("",!0),l(K,{modelValue:n.page,"onUpdate:modelValue":s[1]||(s[1]=a=>n.page=a),length:Math.ceil(r.filteredPurchaseOrder.length/n.pageSize),onInput:r.updatePagination,max:n.maxPaginationPages},null,8,["modelValue","length","onInput","max"]),l(P,{modelValue:n.dialog,"onUpdate:modelValue":s[8]||(s[8]=a=>n.dialog=a),"max-width":"1000"},{default:o(()=>[l(A,{title:"Purchase Order",class:"mb-2"},{default:o(()=>[l(w,null,{default:o(()=>[l(b,null,{default:o(()=>[l(p,{cols:"12"},{default:o(()=>[l(C,{class:"mt-6",ref:"purchaseOrderForm"},{default:o(()=>[l(b,null,{default:o(()=>[l(p,{md:"6",cols:"12"},{default:o(()=>[l(v,{modelValue:this.productData.brand_name,"onUpdate:modelValue":s[2]||(s[2]=a=>this.productData.brand_name=a),label:"Brand or Manufacturer",readonly:""},null,8,["modelValue"])]),_:1}),l(p,{cols:"12",md:"6"},{default:o(()=>[l(v,{modelValue:this.createdBy,"onUpdate:modelValue":s[3]||(s[3]=a=>this.createdBy=a),label:"Created By",readonly:""},null,8,["modelValue"])]),_:1}),l(p,{cols:"12",md:"6"},{default:o(()=>[l(v,{modelValue:this.productData.created_date,"onUpdate:modelValue":s[4]||(s[4]=a=>this.productData.created_date=a),type:"date",label:"Date",readonly:""},null,8,["modelValue"])]),_:1}),l(p,{md:"6",cols:"12"},{default:o(()=>[l(G,{modelValue:this.productData.po_status,"onUpdate:modelValue":s[5]||(s[5]=a=>this.productData.po_status=a),label:"PO Status",items:["Draft","Created","Shared","Acknowledged"],rules:n.Statusrules},null,8,["modelValue","rules"])]),_:1}),l(p,{md:"6",cols:"12"},{default:o(()=>[l(v,{modelValue:this.productData.delivery_date,"onUpdate:modelValue":s[6]||(s[6]=a=>this.productData.delivery_date=a),type:"date",label:"Delivery Date",min:n.today,rules:n.dateRules},null,8,["modelValue","min","rules"])]),_:1}),l(B),l(p,{cols:"12"},{default:o(()=>[l(F,{headers:n.headers2,items:n.AllBrandproducts},{default:o(()=>[e("thead",null,[e("tr",null,[(h(!0),g(S,null,T(n.headers2,a=>(h(),g("th",{class:"text-center",key:a},d(a.text),1))),128))])]),e("tbody",null,[(h(!0),g(S,null,T(this.AllBrandproducts,(a,m)=>(h(),g("tr",{key:m},[e("td",gt,d(a.sku_name),1),e("td",ft,d(a.uom),1),e("td",xt,d(a.hsn_code),1),e("td",bt,"\u20B9"+d(a.mrp),1),e("td",vt,[l(v,{onKeydown:r.preventDecimal,onPaste:r.preventPaste,type:"number",min:"0",max:"20000",modelValue:a.quantity,"onUpdate:modelValue":D=>a.quantity=D,style:{"min-width":"80px"}},null,8,["onKeydown","onPaste","modelValue","onUpdate:modelValue"])]),e("td",yt,[_(" \u20B9 "+d(r.calculatedPricePerUnit[m])+" ",1),Vt,l(y,{color:r.colorTGMmargin(a.total_given_margin).color,class:"font-weight-medium",size:"small"},{default:o(()=>[_(" ("+d(a.total_given_margin)+") ",1)]),_:2},1032,["color"])]),e("td",St,"\u20B9"+d(r.calculatedTaxableAmount[m]),1),e("td",Tt,[_(" \u20B9"+d(r.calculatedCGSTAmount[m])+" ",1),Dt,l(y,{color:r.colorCGSTmargin(a.cgst).color,class:"font-weight-medium",size:"small"},{default:o(()=>[_(" ("+d(a.cgst)+") ",1)]),_:2},1032,["color"])]),e("td",kt,[_(" \u20B9"+d(r.calculatedSGSTAmount[m])+" ",1),At,l(y,{color:r.colorSGSTmargin(a.sgst).color,class:"font-weight-medium",size:"small"},{default:o(()=>[_(" ("+d(a.sgst)+") ",1)]),_:2},1032,["color"])]),e("td",wt,"\u20B9"+d(r.calculateTotalamount[m]),1),e("td",null,[l(f,{icon:"",variant:"text",color:"error",class:"me-2",size:"small",onClick:D=>r.deleteRow(a)},{default:o(()=>[l(k,{icon:"mdi-minus-circle-outline",size:"24"})]),_:2},1032,["onClick"])])]))),128))]),e("tfoot",null,[e("tr",null,[Ct,Pt,Ft,Gt,e("td",Bt,d(r.allQuantity),1),Nt,e("td",Ot,"\u20B9"+d(r.allTaxableAmmount),1),e("td",Ut,"\u20B9"+d(r.allCGSTAmount),1),e("td",qt,"\u20B9"+d(r.allSGSTAmount),1),e("td",It,"\u20B9"+d(r.allAmmount),1),Mt]),Rt,e("tr",null,[zt,e("td",Qt," \u20B9"+d(r.allCGSTAmount),1),Lt,e("td",Et," \u20B9"+d(r.allAmmount),1)]),e("tr",null,[Yt,e("td",Kt," \u20B9"+d(r.allSGSTAmount),1),jt,e("td",Ht," \u20B9"+d(r.allAmmount),1)]),e("tr",null,[Wt,Zt,Jt,e("td",Xt," \u20B9"+d(n.totals.Quantity),1)]),e("tr",null,[$t,te,ee,e("td",ae," \u20B9"+d(r.allAmmount),1)]),e("tr",null,[se,le,oe,e("td",re," \u20B9"+d(r.savedamount),1)])])]),_:1},8,["headers","items"])]),_:1}),l(p,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[l(f,{onClick:r.validateForm},{default:o(()=>[_("Save")]),_:1},8,["onClick"]),l(f,{color:"secondary",variant:"tonal",onClick:s[7]||(s[7]=a=>r.closeDialog())},{default:o(()=>[_(" Close ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(P,{modelValue:n.dialog2,"onUpdate:modelValue":s[15]||(s[15]=a=>n.dialog2=a),"max-width":"1000"},{default:o(()=>[l(A,{title:"Purchase Order",class:"mb-2"},{default:o(()=>[l(w,null,{default:o(()=>[l(b,null,{default:o(()=>[l(p,{cols:"12"},{default:o(()=>[l(C,{class:"mt-6"},{default:o(()=>[l(b,null,{default:o(()=>[l(p,{md:"6",cols:"12"},{default:o(()=>[l(G,{modelValue:this.VproductData.brand_name,"onUpdate:modelValue":s[9]||(s[9]=a=>this.VproductData.brand_name=a),label:"Brand or Manufacturer",readonly:""},null,8,["modelValue"])]),_:1}),l(p,{cols:"12",md:"6"},{default:o(()=>[l(v,{modelValue:this.createdBy,"onUpdate:modelValue":s[10]||(s[10]=a=>this.createdBy=a),label:"Created By",readonly:""},null,8,["modelValue"])]),_:1}),l(p,{cols:"12",md:"6"},{default:o(()=>[l(v,{modelValue:this.VproductData.created_date,"onUpdate:modelValue":s[11]||(s[11]=a=>this.VproductData.created_date=a),type:"date",label:"Date",readonly:""},null,8,["modelValue"])]),_:1}),l(p,{md:"6",cols:"12"},{default:o(()=>[l(G,{modelValue:this.VproductData.po_status,"onUpdate:modelValue":s[12]||(s[12]=a=>this.VproductData.po_status=a),label:"PO Status",readonly:""},null,8,["modelValue"])]),_:1}),l(p,{md:"6",cols:"12"},{default:o(()=>[l(v,{modelValue:this.VproductData.delivery_date,"onUpdate:modelValue":s[13]||(s[13]=a=>this.VproductData.delivery_date=a),type:"date",label:"Delivery Date",readonly:""},null,8,["modelValue"])]),_:1}),l(B),l(p,{cols:"12"},{default:o(()=>[l(F,{headers:n.headers3,items:n.viewProduct},{default:o(()=>[e("thead",null,[e("tr",null,[(h(!0),g(S,null,T(n.headers3,a=>(h(),g("th",{class:"text-center",key:a},d(a.text),1))),128))])]),e("tbody",null,[(h(!0),g(S,null,T(this.viewProduct,(a,m)=>(h(),g("tr",{key:m},[e("td",ne,d(a.sku_name),1),e("td",de,d(a.uom),1),e("td",ce,d(a.hsn_code),1),e("td",ue," \u20B9"+d(a.mrp),1),e("td",ie,d(a.quantity),1),e("td",_e,[_(" \u20B9"+d(a.price_per_unit)+" ",1),l(y,{color:r.colorTGMmargin(a.total_give_margin).color,class:"font-weight-medium",size:"small"},{default:o(()=>[_(" ("+d(a.total_give_margin)+") ",1)]),_:2},1032,["color"])]),e("td",he," \u20B9"+d(a.taxable_amount),1),e("td",pe,[_(" \u20B9"+d(a.csgt)+" ",1),l(y,{color:r.colorTGMmargin(a.cgst_percentage).color,class:"font-weight-medium",size:"small"},{default:o(()=>[_(" ("+d(a.cgst_percentage)+") ",1)]),_:2},1032,["color"])]),e("td",me,[_(" \u20B9"+d(a.sgst)+" ",1),l(y,{color:r.colorTGMmargin(a.sgst_percentage).color,class:"font-weight-medium",size:"small"},{default:o(()=>[_(" ("+d(a.sgst_percentage)+") ",1)]),_:2},1032,["color"])]),e("td",ge," \u20B9"+d(a.amount),1)]))),128))]),e("tfoot",null,[e("tr",null,[fe,xe,be,ve,e("td",ye,d(this.VproductData.total_quantity),1),Ve,e("td",Se,"\u20B9"+d(this.VproductData.sub_total),1),e("td",Te,"\u20B9"+d(this.VproductData.total_cgst),1),e("td",De,"\u20B9"+d(this.VproductData.total_sgst),1),e("td",ke,"\u20B9"+d(this.VproductData.total_po_amount),1),Ae]),we,e("tr",null,[Ce,e("td",Pe," \u20B9"+d(this.VproductData.total_cgst),1),Fe,e("td",Ge," \u20B9"+d(this.VproductData.total_po_amount),1)]),e("tr",null,[Be,e("td",Ne," \u20B9"+d(this.VproductData.total_sgst),1),Oe,e("td",Ue," \u20B9"+d(this.VproductData.total_po_amount),1)]),e("tr",null,[qe,Ie,Me,e("td",Re," \u20B9"+d(n.totals.Quantity),1)]),e("tr",null,[ze,Qe,Le,e("td",Ee," \u20B9"+d(this.VproductData.total_po_amount),1)]),e("tr",null,[Ye,Ke,je,e("td",He," \u20B9"+d(this.VproductData.you_saved),1)])])]),_:1},8,["headers","items"])]),_:1}),l(p,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[l(f,{color:"primary",onClick:s[14]||(s[14]=a=>r.closedialog2())},{default:o(()=>[_(" Close ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(P,{modelValue:n.dialog3,"onUpdate:modelValue":s[17]||(s[17]=a=>n.dialog3=a),"max-width":"400",persistent:""},{default:o(()=>[l(A,{title:"Cancel Order",class:"mb-2"},{default:o(()=>[l(w,null,{default:o(()=>[l(b,null,{default:o(()=>[l(p,{cols:"12"},{default:o(()=>[l(C,{class:"mt-4",ref:"purchaseOrderForm"},{default:o(()=>[l(b,null,{default:o(()=>[l(p,{md:"12",cols:"12"},{default:o(()=>[_(" Are you sure want to cancel the order ? ")]),_:1}),l(p,{md:"12",cols:"12"},{default:o(()=>[l(f,{onClick:r.validateFormopen},{default:o(()=>[_("Yes")]),_:1},8,["onClick"]),_(" \xA0 "),l(f,{color:"secondary",variant:"tonal",onClick:s[16]||(s[16]=a=>r.closeDialogform())},{default:o(()=>[_(" No ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(P,{modelValue:n.dialog4,"onUpdate:modelValue":s[20]||(s[20]=a=>n.dialog4=a),"max-width":"500",persistent:""},{default:o(()=>[l(A,{title:"Cancel Order",class:"mb-2"},{default:o(()=>[l(w,null,{default:o(()=>[l(b,null,{default:o(()=>[l(p,{cols:"12"},{default:o(()=>[l(C,{class:"mt-4",ref:"purchaseOrderForm5"},{default:o(()=>[l(b,null,{default:o(()=>[l(p,{md:"12",cols:"12"},{default:o(()=>[l(j,{modelValue:this.cancelOrderdetails.cancel_reason,"onUpdate:modelValue":s[18]||(s[18]=a=>this.cancelOrderdetails.cancel_reason=a),label:"Cancel Reason","row-height":"30",rows:"4",variant:"filled","auto-grow":"",shaped:"",rules:n.workingRules},null,8,["modelValue","rules"])]),_:1}),l(p,{md:"12",cols:"12"},{default:o(()=>[l(f,{onClick:r.validateForm8},{default:o(()=>[_("Save")]),_:1},8,["onClick"]),_(" \xA0 "),l(f,{color:"secondary",variant:"tonal",onClick:s[19]||(s[19]=a=>t.closeDialog4())},{default:o(()=>[_(" No ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),l(H,{modelValue:n.snackbar,"onUpdate:modelValue":s[21]||(s[21]=a=>n.snackbar=a),timeout:2e3,color:n.color},{default:o(()=>[_(d(n.snackbarText),1)]),_:1},8,["modelValue","color"])])}const Ze=N($,[["render",We],["__scopeId","data-v-f1e35ac7"]]),Je={components:{Viewpurchaseorders:Ze},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Purchase Order",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=R(),this.activeTab=z(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function Xe(t,s,c,i,n,r){const a=Q("Viewpurchaseorders");return h(),g("div",null,[l(W,{modelValue:n.activeTab,"onUpdate:modelValue":s[0]||(s[0]=m=>n.activeTab=m),"show-arrows":""},{default:o(()=>[(h(!0),g(S,null,T(n.tabs,m=>(h(),V(X,{key:m.icon,value:m.tab},{default:o(()=>[l(k,{size:"20",start:"",icon:m.icon},null,8,["icon"]),_(" "+d(m.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),l(B),l(J,{modelValue:n.activeTab,"onUpdate:modelValue":s[1]||(s[1]=m=>n.activeTab=m),class:"mt-5 disable-tab-transition",touch:!1},{default:o(()=>[l(Z,{value:"account"},{default:o(()=>[l(a)]),_:1})]),_:1},8,["modelValue"])])}const ha=N(Je,[["render",Xe]]);export{ha as default};
