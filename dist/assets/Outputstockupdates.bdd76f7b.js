import{_ as R,o as d,c as h,a4 as D,ac as O,g as a,w as o,k as w,l as y,i as _,j as q,a as i,b7 as E,b8 as p,F as S,q as b,t as c,b as f,f as k,m as g,u as x,b9 as I,bz as F,bo as L,bw as N,bx as B,bp as Q,v as H,e as M,s as K,r as W}from"./index.0b981731.js";import{s as j}from"./Services.41adf274.js";import{V as P}from"./VForm.ffbb7042.js";import{V as A}from"./VAutocomplete.baffc24f.js";import{V as v}from"./VTextField.5301b3c7.js";import{V as C}from"./VChip.dcf0b2f8.js";import{V as T}from"./VTable.37b3df2d.js";import{V as Y}from"./VTextarea.624ff563.js";import{V as z}from"./VDialog.e918b5ea.js";import{V as G}from"./VSelect.4e0971e9.js";import{V as J}from"./VSnackbar.f2a1d5cd.js";import{V as X}from"./VPagination.ec26f610.js";import{V as Z,a as $,b as ee,c as te}from"./VWindowItem.50fa3838.js";import"./VCounter.34721c52.js";import"./VCheckboxBtn.caec2b01.js";const se={mixins:[j],data(){return{canAcksales:{so_id:"",not_delivered_reason:"",remarks:"",so_status:0},savingOutputStock:!1,validquan:!1,PersonRules:[e=>!!e||"Delivery Person is required"],DateRules:[e=>!!e||"Shipped date is required"],RemarkRules:[e=>!!e||"Remark is required"],Reasonrules:[e=>!!e||"Reason is required"],shippedexchange:[e=>e===0||!!e&&`${e}`.trim()!==""||"shippedexchange Quantity Is Required"],shippedquantity:[e=>e===0||!!e&&`${e}`.trim()!==""||"shipped Quantity Is Required"],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,loading3:!1,isProgress:!1,isProgress2:!1,SOID:"",SOSTATUS:"",selectedPurchaseOrder:null,dialog:!1,dialog2:!1,Soid:"",OutputStockDetails:[],filteredsalesdata:[],Salesorderdetails:[],today:this.getFormattedDate(new Date),locationdata:null,outputStock:{so_id:"",so_number:"",merchant_id:"",merchant_code:"",merchant_name:"",total_cgst:"",total_sgst:"",sub_total:"",total_margin:"",total_so_amount:"",total_quantity:"",po_number:"",created_date:"",shipped_date:this.getFormattedDate(new Date),so_status:"",products:[{merchant_product_id:"",sku_name:"",hsn_code:"",mrp:"",margin:"",ordered_quantity:"",warehouse_quantity:"",uom:"",price_per_unit:"",taxable_amount:"",cgst:"",sgst:"",amount:"",sgst_percentage:"",cgst_percentage:"",exchange:"",return:"",shipped_ordered:"",shipped_exchange:""}],delivery_user_details:[{delivery_person:"",name:""}]},outputStockproducts:[],headers2:[{text:"Brand Name",value:"brand_name"},{text:"SKU Name",value:"sku_name"},{text:"UOM",value:"uom"},{text:"Ordered Quantity",value:"quantity"},{text:"Exchange Quantity",value:"exchange_quantity"},{text:"Return",value:"return"},{text:"Available",value:"warehouse_quantity"},{text:"Shipped Ordered",value:"shipped_ordered"},{text:"Shipped Exchanged",value:"shipped_exchange"}],selectedDeliveryPerson:null,deliveryPersons:[],deliveryUserDetails:[],filtereddata:[],page:1,pageSize:10,loading2:!1,loaded:!1,loading:!1,saleshistory:[],salesdata:{},searchQuery:"",dialog:!1,cityID:"",cityLoaction:[],filterlocation:!0,Deliveryperson:[],deliverydata:[],headers:[{text:"Sales Order",value:"so_number"},{text:"Order Date",value:"created_date"},{text:"Status",value:"so_status"},{text:"Order From",value:"merchant_name"},{text:"Shipped To",value:"merchant_name"},{text:"Order Value",value:"total_so_amount"},{text:"Action",value:"actions",sortable:!1}]}},computed:{outputSalesOrders(){return this.$store.state.outputSalesOrders},totalshippedorder(){return this.Salesorderdetails.reduce((e,t)=>e+parseFloat(t.shipped_ordered||0),0)},totalshippedexchange(){return this.Salesorderdetails.reduce((e,t)=>e+parseFloat(t.shipped_exchange||0),0)},filteredOutputstocks(){return this.Salesorderdetails.filter(e=>e.exchange_quantity>0||e.quantity>0)},filteredSalesHistory(){const e=this.searchQuery.toLowerCase().trim();return this.filteredsalesdata.filter(t=>t.so_number&&t.so_number.toLowerCase().includes(e)||t.created_date&&t.created_date.toLowerCase().includes(e)||t.so_status&&t.so_status.toLowerCase().includes(e)||t.merchant_name&&t.merchant_name.toLowerCase().includes(e)||t.total_so_amount&&t.total_so_amount.toString().includes(e))},paginatedItems(){const e=(this.page-1)*this.pageSize,t=e+this.pageSize;return this.filteredSalesHistory.slice(e,t)},showNoSalesAlert(){return!this.saleshistory.some(e=>e.so_status==="Acknowledged"||e.so_status==="On Hold")}},mounted(){this.Soid=this.$route.query.so_id,this.cityID=localStorage.getItem("city_id"),this.handleBrandSelection()},created(){this.fetchOutputSalesOrders().then(()=>{this.loading=!1}).catch(e=>{console.error("Error fetching merchants:",e)})},methods:{locationdetails(){const e=localStorage.getItem("city_id"),t=this.locationdata;return this.loading=!0,new Promise((u,r)=>{this.$store.dispatch("getOutputSaleOrdersdata2",{city_id:e,location_id:t}).then(l=>{console.log("check locationdata",l),l.status==1?(this.filteredsalesdata=l.data,this.filteredsalesdata.reverse(),this.loading=!1,u(l)):(this.filteredsalesdata=[],this.loading=!1)}).catch(l=>{console.error("Error fetching output sales orders:",l),this.loading=!1,r(l)})})},handleBrandSelection(){this.getCitylocation(this.cityID).then(e=>{this.cityLoaction=e.data.data.map(t=>({value:t.location_id,text:t.location})),console.log("ceck tye res",this.cityLoaction)})},fetchOutputSalesOrders(){const e=localStorage.getItem("city_id"),t=localStorage.getItem("location_id");return new Promise((u,r)=>{e!=""&&t!==""&&(this.loading=!0,this.filterlocation=!1,this.$store.dispatch("getOutputSaleOrdersdata2",{city_id:e,location_id:t}).then(l=>{console.log("check details",l),this.filteredsalesdata=l.data,this.filteredsalesdata.reverse(),this.loading=!1,u(l)}).catch(l=>{console.error("Error fetching output sales orders:",l),this.loading=!1,r(l)}))})},validateForm2(){this.$refs.purchaseOrderForm2.validate().then(e=>{e.valid==!0?this.cancelAcksalesordersdata():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},cancelAcksalesordersdata(){const e={Acknowledged:0},t={so_id:this.SOID,not_delivered_reason:this.canAcksales.not_delivered_reason,remarks:this.canAcksales.remarks,so_status:e[this.SOSTATUS]};this.CancelAcksalesorders(t).then(u=>{u.data.status==1?(this.snackbar=!0,this.color="primary",this.snackbarText=u.data.message,this.dialog2=!1,window.location.reload(!0)):(this.snackbar=!0,this.color="on-background",this.snackbarText=u.data.message,this.dialog2=!1)})},validateForm(){this.$refs.purchaseOrderForm.validate().then(e=>{e.valid==!0?this.saveOutputstock():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},preventPaste(e){const u=(e.clipboardData||window.clipboardData).getData("text");/^[0-9]+$/.test(u)||e.preventDefault()},preventDecimal(e){(e.key==="."||e.key===","||e.key==="+"||e.key==="-"||e.keyCode===189||e.keyCode===109)&&e.preventDefault()},saveOutputstock(){const e={Draft:1,Created:2,Acknowledged:3,Shipped:4,Delivered:5},t={so_id:this.OutputStockDetails.so_id,so_number:this.outputStock.so_number,so_status:e[this.outputStock.so_status],merchant_id:this.OutputStockDetails.merchant_id,merchant_code:this.OutputStockDetails.merchant_code,merchant_name:this.outputStock.merchant_name,total_cgst:this.OutputStockDetails.total_cgst,total_sgst:this.OutputStockDetails.total_sgst,sub_total:this.OutputStockDetails.sub_total,total_margin:this.OutputStockDetails.total_margin,total_so_amount:this.OutputStockDetails.total_so_amount,total_quantity:this.OutputStockDetails.total_quantity,created_date:this.OutputStockDetails.created_date,shipped_date:this.outputStock.shipped_date,is_empty:this.outputStock.is_empty,po_number:this.outputStock.po_number,total_shipped_ordered:`${this.totalshippedorder}`,total_shipped_exchanged:`${this.totalshippedexchange}`,products:this.Salesorderdetails.map((r,l)=>({merchant_product_id:r.merchant_product_id,sku_name:r.sku_name,hsn_code:r.hsn_code,mrp:r.mrp,margin:r.margin,margin_percentage:r.margin_percentage,brand_name:r.brand_name,quantity:r.quantity,uom:r.uom,price_per_unit:r.price_per_unit,taxable_amount:r.taxable_amount,cgst:r.cgst,sgst:r.sgst,amount:r.amount,sgst_percentage:r.sgst_percentage,cgst_percentage:r.cgst_percentage,exchange:r.exchange,return:r.return,rtv_reason:r.rtv_reason,shipped_ordered:`${r.shipped_ordered}`,shipped_exchange:`${r.shipped_exchange}`})),delivery_person:this.selectedDeliveryPerson};console.log("check the post data",t);const u=this.Salesorderdetails.map(r=>(console.log("Shipped quan",r.shipped_ordered," Ordered Quan",r.quantity," Warehouse Quan",r.warehouse_quantity),this.isQuantityExceeded(r.shipped_ordered,r.quantity,r.warehouse_quantity)||this.isQuantityExceeded2(r.shipped_exchange,r.exchange,r.warehouse_quantity)));console.log("Validation Error :",u.filter(r=>r)),u.filter(r=>r).length===0?(this.loading=!0,this.savingOutputStock=!0,this.dialog=!1,this.postOutputstock(t).then(r=>{r.status==1?(this.savingOutputStock=!1,this.snackbar=!0,this.color="primary",this.formData={},this.snackbarText=r.message,this.selectedDeliveryPerson=null,this.loading=!1,this.Salesorderdetails=[],this.fetchOutputSalesOrders().then(()=>{this.loading=!1}).catch(l=>{console.error("Error fetching merchants:",l)}),this.locationdetails()):(this.savingOutputStock=!1,this.snackbar=!0,this.color="on-background",this.snackbarText="Please give proper data")})):(this.savingOutputStock=!1,this.snackbar=!0,this.color="on-background",this.snackbarText="your quantities are exceeded")},getFormattedDate(e){const t=e.getFullYear(),u=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${u}-${r}`},resolveStatusVariant2(e){return e.warehouse_quantity>=e.quantity?{color:"success"}:{color:"success"}},deleteRow(e){const t=this.desserts.indexOf(e);t!==-1&&this.desserts.splice(t,1)},openproductdialog(){this.dialog=!0},openoutputstocksforcancel(e){this.dialog2=!0,this.SOID=e.so_id,this.SOSTATUS=e.so_status},closedialogforcancel(){this.dialog2=!1},closeDialog(){this.dialog=!1},isQuantityExceeded(e,t,u){const r=Math.min(t,u);return e>r&&e!==0?(this.snackbar=!0,this.color="on-background",this.snackbarText="Shipped quantity cannot exceed ordered or warehouse quantity",!0):!1},isQuantityExceeded2(e,t,u){const r=Math.min(t,u);return e!=="0"&&e>r?(this.snackbar=!0,this.color="on-background",this.snackbarText="Shipped Exchange cannot exceed Availble quantity.",!0):!1},updatePagination(e){this.page=e},getPDFupdate(e){this.loading2=!0,window.open(e,"_blank"),this.loading2=!1},closedialog(){this.dialog=!1,this.deliveryPersons=[],this.Salesorderdetails=[],this.outputStock={}},outputstocks(e){this.dialog=!0,this.outputStock.so_number=e.so_number,this.outputStock.is_empty=e.is_empty,this.outputStock.merchant_name=e.merchant_name,this.outputStock.so_status="Shipped",this.loading3=!0,this.getOutputstock(e.so_id,this.cityID).then(t=>{this.loading3=!1,this.OutputStockDetails=t.data,this.outputStock.po_number=t.data.po_number,this.Salesorderdetails=t.data.products,this.deliveryUserDetails=t.delivery_user_details,console.log("delivery detials",this.deliveryUserDetails),this.deliveryPersons=this.deliveryUserDetails.map(u=>({value:u.delivery_person,text:u.name}))})},resolveStatusVariant(e){return e=="Acknowledged"?{color:"warning"}:{color:"error"}}}},U=e=>(N("data-v-5b1c0a57"),e=e(),B(),e),ae={style:{"max-width":"400px"}},le={key:0,class:"loading-container"},oe={key:1,class:"loader-wrapper"},re=U(()=>i("div",{class:"loader"},null,-1)),ie=[re],ne={key:2,id:"app"},de=L('<div id="loading-bg" data-v-5b1c0a57><div class="loading-logo" data-v-5b1c0a57><img src="'+Q+'" height="60" width="68" alt="Logo" data-v-5b1c0a57></div><div class="loading" data-v-5b1c0a57><div class="effect-1 effects" data-v-5b1c0a57></div><div class="effect-2 effects" data-v-5b1c0a57></div><div class="effect-3 effects" data-v-5b1c0a57></div></div></div>',1),ue=[de],ce={key:0},he=U(()=>i("td",{colspan:"16",class:"text-center"},[i("h1",null,"No data found !")],-1)),_e=[he],me={class:"text-center"},pe={class:"text-center"},ge={class:"text-center"},fe={class:"text-center"},ve={class:"text-center"},ke={class:"text-center"},ye={class:"text-center"},Se={class:"text-center"},be={class:"text-center"},xe={class:"text-center"},Ve={class:"text-center"},De={class:"text-center"},Oe={class:"text-center"},we={class:"text-center"},qe={key:0,id:"app"},Pe=U(()=>i("div",{id:"loading-bg"},[i("div",{class:"loading-logo"},[i("img",{src:Q,height:"60",width:"68",alt:"Logo"})]),i("div",{class:"loading"},[i("div",{class:"effect-1 effects"}),i("div",{class:"effect-2 effects"}),i("div",{class:"effect-3 effects"})])],-1)),Ce=[Pe],Te={class:"text-center"},Ue={class:"text-center"},Ie={class:"text-center"},Fe={class:"text-center"},Ae={class:"text-center"},ze={class:"text-center"},Re={class:"text-center"};function Qe(e,t,u,r,l,n){return d(),h("div",null,[D(a(q,{class:"mb-2"},{default:o(()=>[a(w,null,{default:o(()=>[a(y,null,{default:o(()=>[a(_,{cols:"12"},{default:o(()=>[a(P,{class:"mt-6"},{default:o(()=>[a(y,null,{default:o(()=>[a(_,{md:"6",cols:"12"},{default:o(()=>[a(A,{modelValue:l.locationdata,"onUpdate:modelValue":[t[0]||(t[0]=s=>l.locationdata=s),t[1]||(t[1]=s=>n.locationdetails())],label:"Location",items:this.cityLoaction,"item-value":"value","item-title":"text","menu-props":{maxHeight:200}},null,8,["modelValue","items"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},512),[[O,l.filterlocation]]),i("div",ae,[a(v,{class:"mb-3",modelValue:l.searchQuery,"onUpdate:modelValue":t[2]||(t[2]=s=>l.searchQuery=s),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),l.loading2?(d(),h("div",le,[a(E,{height:"5",color:"primary",indeterminate:"",class:"custom-loader","full-width":""})])):p("",!0),l.savingOutputStock?(d(),h("div",oe,ie)):p("",!0),l.loading?(d(),h("div",ne,ue)):p("",!0),a(T,null,{default:o(()=>[i("thead",null,[i("tr",null,[(d(!0),h(S,null,b(l.headers,s=>(d(),h("th",{class:"text-center",key:s},c(s.text),1))),128))])]),i("tbody",null,[n.filteredSalesHistory.length===0?(d(),h("tr",ce,_e)):p("",!0),(d(!0),h(S,null,b(n.paginatedItems,s=>(d(),h("tr",{key:s.so_status},[i("td",me,c(s.so_number),1),i("td",pe,c(s.created_date),1),i("td",ge,[a(C,{color:n.resolveStatusVariant(s.so_status).color,class:"font-weight-medium",size:"small"},{default:o(()=>[f(c(s.so_status),1)]),_:2},1032,["color"])]),i("td",fe,c(s.merchant_name),1),i("td",ve,c(s.merchant_name),1),i("td",ke,c(s.total_so_amount),1),i("td",ye,[s.so_status!="Shipped"&&s.so_status!="Delivered"?(d(),k(g,{key:0,icon:"",variant:"text",color:"success",class:"me-2",size:"small"},{default:o(()=>[a(x,{icon:"mdi-invoice-receive-outline",color:"success",size:"30",onClick:m=>n.outputstocks(s)},null,8,["onClick"])]),_:2},1024)):p("",!0),s.so_status!="Shipped"&&s.so_status!="Delivered"?(d(),k(g,{key:1,icon:"",variant:"text",color:"success",class:"me-2",size:"small"},{default:o(()=>[a(x,{icon:"material-symbols:cancel-outline",color:"error",size:"30",onClick:m=>n.openoutputstocksforcancel(s)},null,8,["onClick"])]),_:2},1024)):p("",!0),s.so_status=="Shipped"||s.so_status=="Delivered"?(d(),k(g,{key:2,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:m=>n.getPDFupdate(s.delivery_challan_file)},{default:o(()=>[a(x,{color:"error",icon:"iwwa:file-pdf",size:"26"})]),_:2},1032,["onClick"])):p("",!0)])]))),128))])]),_:1}),this.saleshistory!=""?(d(),k(T,{key:3,headers:l.headers,items:n.paginatedItems,class:"table-rounded",height:"500","fixed-header":""},{default:o(()=>[i("thead",null,[i("tr",null,[(d(!0),h(S,null,b(l.headers,s=>(d(),h("th",{class:"text-center",key:s},c(s.text),1))),128))])]),i("tbody",null,[i("tr",null,[i("td",Se,c(e.item.so_number),1),i("td",be,c(e.item.created_date),1),i("td",xe,[a(C,{color:n.resolveStatusVariant(e.item.so_status).color,class:"font-weight-medium",size:"small"},{default:o(()=>[f(c(e.item.so_status),1)]),_:1},8,["color"])]),i("td",Ve,c(e.item.merchant_name),1),i("td",De,c(e.item.merchant_name),1),i("td",Oe,c(e.item.total_so_amount),1),i("td",we,[e.item.so_status!="Shipped"&&e.item.so_status!="Delivered"?(d(),k(g,{key:0,icon:"",variant:"text",color:"success",class:"me-2",size:"small"},{default:o(()=>[a(x,{icon:"mdi-invoice-receive-outline",color:"success",size:"30",onClick:t[3]||(t[3]=s=>n.outputstocks(e.item))})]),_:1})):p("",!0),e.item.so_status=="Shipped"||e.item.so_status=="Delivered"?(d(),k(g,{key:1,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:t[4]||(t[4]=s=>n.getPDFupdate(e.item.delivery_challan_file))},{default:o(()=>[a(x,{color:"error",icon:"iwwa:file-pdf",size:"26"})]),_:1})):p("",!0)])])])]),_:1},8,["headers","items"])):p("",!0),a(z,{modelValue:l.dialog2,"onUpdate:modelValue":t[9]||(t[9]=s=>l.dialog2=s),"max-width":"500"},{default:o(()=>[a(q,{title:"Cancel SO Status",class:"mb-2"},{default:o(()=>[a(w,null,{default:o(()=>[a(y,null,{default:o(()=>[a(_,{cols:"12"},{default:o(()=>[a(P,{class:"mt-6",ref:"purchaseOrderForm2"},{default:o(()=>[a(y,null,{default:o(()=>[a(_,{md:"12",cols:"12"},{default:o(()=>[a(A,{items:["Revised Order","Fake Order","Duplicate","Logistics Unavailability"],label:"Reason",modelValue:l.canAcksales.not_delivered_reason,"onUpdate:modelValue":t[5]||(t[5]=s=>l.canAcksales.not_delivered_reason=s),rules:l.Reasonrules},null,8,["modelValue","rules"])]),_:1}),a(_,{cols:"12",md:"12"},{default:o(()=>[a(Y,{"row-height":"30",rows:"4",variant:"filled","auto-grow":"",shaped:"",label:"Remark",rules:l.RemarkRules,modelValue:l.canAcksales.remarks,"onUpdate:modelValue":t[6]||(t[6]=s=>l.canAcksales.remarks=s)},null,8,["rules","modelValue"])]),_:1}),a(_,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[a(g,{onClick:t[7]||(t[7]=s=>n.validateForm2())},{default:o(()=>[f("Save")]),_:1}),a(g,{onClick:t[8]||(t[8]=s=>n.closedialogforcancel())},{default:o(()=>[f("Close")]),_:1}),D(a(I,{size:50,color:"primary",indeterminate:""},null,512),[[O,l.isProgress2]])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(z,{modelValue:l.dialog,"onUpdate:modelValue":t[18]||(t[18]=s=>l.dialog=s),"max-width":"1000"},{default:o(()=>[a(q,{title:"Proceed To Ship Sales Orders",class:"mb-2"},{default:o(()=>[a(w,null,{default:o(()=>[a(y,null,{default:o(()=>[a(_,{cols:"12"},{default:o(()=>[a(P,{class:"mt-6",ref:"purchaseOrderForm"},{default:o(()=>[a(y,null,{default:o(()=>[a(_,{md:"6",cols:"12"},{default:o(()=>[a(v,{modelValue:this.outputStock.so_number,"onUpdate:modelValue":t[10]||(t[10]=s=>this.outputStock.so_number=s),label:"Sales Order",readonly:""},null,8,["modelValue"])]),_:1}),a(_,{cols:"12",md:"6"},{default:o(()=>[a(v,{modelValue:this.outputStock.merchant_name,"onUpdate:modelValue":t[11]||(t[11]=s=>this.outputStock.merchant_name=s),label:"Order From",readonly:""},null,8,["modelValue"])]),_:1}),a(_,{cols:"12",md:"6"},{default:o(()=>[a(v,{modelValue:this.outputStock.shipped_date,"onUpdate:modelValue":t[12]||(t[12]=s=>this.outputStock.shipped_date=s),type:"date",label:"Date",min:l.today,rules:l.DateRules},null,8,["modelValue","min","rules"])]),_:1}),a(_,{md:"6",cols:"12"},{default:o(()=>[a(v,{modelValue:this.outputStock.so_status,"onUpdate:modelValue":t[13]||(t[13]=s=>this.outputStock.so_status=s),label:"SO Status",readonly:""},null,8,["modelValue"])]),_:1}),a(_,{md:"6",cols:"12"},{default:o(()=>[a(G,{modelValue:l.selectedDeliveryPerson,"onUpdate:modelValue":t[14]||(t[14]=s=>l.selectedDeliveryPerson=s),label:"Select Delivery Person",items:this.deliveryPersons,"item-value":"value","item-title":"text",rules:l.PersonRules,"menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),a(_,{md:"6",cols:"12"},{default:o(()=>[a(v,{modelValue:this.outputStock.po_number,"onUpdate:modelValue":t[15]||(t[15]=s=>this.outputStock.po_number=s),label:"PO Number"},null,8,["modelValue"])]),_:1}),a(_,{cols:"12"},{default:o(()=>[l.loading3?(d(),h("div",qe,Ce)):p("",!0),a(T,{headers:l.headers,items:l.Salesorderdetails},{default:o(()=>[i("thead",null,[i("tr",null,[(d(!0),h(S,null,b(l.headers2,s=>(d(),h("th",{class:"text-center",key:s},c(s.text),1))),128))])]),i("tbody",null,[(d(!0),h(S,null,b(this.Salesorderdetails,(s,m)=>(d(),h("tr",{key:m},[i("td",Te,c(s.brand_name),1),i("td",Ue,c(s.sku_name),1),i("td",Ie,c(s.uom),1),i("td",Fe,c(s.quantity),1),i("td",Ae,c(s.exchange==""?0:s.exchange),1),i("td",ze,c(s.return),1),i("td",Re,[a(C,{color:n.resolveStatusVariant2(s).color,class:"font-weight-medium",size:"small"},{default:o(()=>[f(c(s.warehouse_quantity>=0?s.warehouse_quantity:0),1)]),_:2},1032,["color"])]),i("td",{class:F(["text-center",{"has-error":n.isQuantityExceeded(s.shipped_ordered,s.quantity,s.warehouse_quantity)}])},[a(v,{onKeydown:n.preventDecimal,onPaste:n.preventPaste,type:"number",min:"0",max:"20000",rules:l.shippedquantity,modelValue:s.shipped_ordered,"onUpdate:modelValue":V=>s.shipped_ordered=V,outlined:"",dense:""},null,8,["onKeydown","onPaste","rules","modelValue","onUpdate:modelValue"])],2),i("td",{class:F(["text-center",{"has-error":n.isQuantityExceeded2(s.shipped_exchange,s.exchange,s.warehouse_quantity)}])},[a(v,{onKeydown:n.preventDecimal,onPaste:n.preventPaste,type:"number",min:"0",max:"20000",rules:l.shippedexchange,modelValue:s.shipped_exchange,"onUpdate:modelValue":V=>s.shipped_exchange=V,outlined:"",dense:""},null,8,["onKeydown","onPaste","rules","modelValue","onUpdate:modelValue"])],2)]))),128))])]),_:1},8,["headers","items"])]),_:1}),a(_,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[a(g,{onClick:t[16]||(t[16]=s=>n.validateForm())},{default:o(()=>[f("Save")]),_:1}),a(g,{onClick:t[17]||(t[17]=s=>n.closedialog())},{default:o(()=>[f("Close")]),_:1}),D(a(I,{size:50,color:"primary",indeterminate:""},null,512),[[O,l.isProgress]])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(J,{modelValue:l.snackbar,"onUpdate:modelValue":t[19]||(t[19]=s=>l.snackbar=s),timeout:3e3,color:l.color},{default:o(()=>[f(c(l.snackbarText),1)]),_:1},8,["modelValue","color"]),a(X,{modelValue:l.page,"onUpdate:modelValue":t[20]||(t[20]=s=>l.page=s),length:Math.ceil(n.filteredSalesHistory.length/l.pageSize),onInput:n.updatePagination},null,8,["modelValue","length","onInput"])])}const Ee=R(se,[["render",Qe],["__scopeId","data-v-5b1c0a57"]]),Le={components:{Outputstockupdate:Ee},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Acknowledged Sales Orders",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=H(),this.activeTab=M(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function Ne(e,t,u,r,l,n){const s=W("Outputstockupdate");return d(),h("div",null,[a(Z,{modelValue:l.activeTab,"onUpdate:modelValue":t[0]||(t[0]=m=>l.activeTab=m),"show-arrows":""},{default:o(()=>[(d(!0),h(S,null,b(l.tabs,m=>(d(),k(te,{key:m.icon,value:m.tab},{default:o(()=>[a(x,{size:"20",start:"",icon:m.icon},null,8,["icon"]),f(" "+c(m.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),a(K),a(ee,{modelValue:l.activeTab,"onUpdate:modelValue":t[1]||(t[1]=m=>l.activeTab=m),class:"mt-5 disable-tab-transition",touch:!1},{default:o(()=>[a($,{value:"account"},{default:o(()=>[a(s)]),_:1})]),_:1},8,["modelValue"])])}const at=R(Le,[["render",Ne]]);export{at as default};
