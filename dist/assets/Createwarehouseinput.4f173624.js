import{_ as v,o as d,c,g as o,w as n,i as p,j as g,k as x,l as V,a as l,F as b,q as y,t as k,bg as S,m as q,b as f,v as D,e as T,s as I,r as w,f as P,u as R}from"./index.9e8238bc.js";import{s as U}from"./Services.a0afbe6c.js";import{V as C,a as _}from"./VTextField.d627febb.js";import{V as F}from"./VTable.47b87660.js";import{V as Q}from"./VSnackbar.e16afacf.js";import{V as O,a as N,b as E,c as M}from"./VWindowItem.c8530ca1.js";import"./index.2bd8ddc8.js";const B={mixins:[U],props:["po_id"],data(){return{receivedquantity:[a=>a===0||!!a&&`${a}`.trim()!==""||"Received Quantity Is Required"],rtm1:[a=>a===0||!!a&&`${a}`.trim()!==""||"Rtm Quantity Is Required"],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,today:this.getFormattedDate(new Date),inputStock:{brand_id:"",stock_updated_date:this.getFormattedDate(new Date),received_quantity:"",po_status:"",po_id:"",remarks:"",rtm:"",products:[{brand_id:"",brand_product_id:"",received_quantity:"",rtm:"",remarks:""}]},PoId:"",InputStockDetails:[],selectedPurchaseOrder:null,dialog:!1,headers:[{text:"Product Name",value:"brand_name"},{text:"UOM",value:"uom"},{text:"Ordered Quantity",value:"quantity"},{text:"Received Quantity",value:"quantity"},{text:"RTM",value:"carbs"},{text:"Remarks",value:"protein"}]}},computed:{filteredDesserts(){return this.selectedPurchaseOrder,this.desserts.filter(a=>a.purchaseOrder===this.selectedPurchaseOrder)}},mounted(){this.PoId=this.$route.query.po_id,console.log("Received po_id:",this.PoId),this.getInputstockdetails()},methods:{isrtmQuantityExceeded(a,e,u){console.log("check valids",e,u),u>e&&(this.snackbar=!0,this.color="on-background",this.snackbarText="RTM quantity cannot exceed item quantity.")},isQuantityExceeded(a,e){a>e&&(this.snackbar=!0,this.color="on-background",this.snackbarText="Received quantity cannot exceed item quantity.")},preventPaste(a){const u=(a.clipboardData||window.clipboardData).getData("text");/^[0-9]+$/.test(u)||a.preventDefault()},preventDecimal(a){(a.key==="."||a.key===","||a.key==="+"||a.key==="-"||a.keyCode===189||a.keyCode===109)&&a.preventDefault()},validateForm(){this.$refs.purchaseOrderForm.validate().then(a=>{console.log("form valid",a.valid),a.valid==!0?this.saveInputstock():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},saveInputstock(){const a={Draft:1,Created:2,Shared:3,Acknowledged:4,Received:5},e={brand_name:this.inputStock.brand_name,po_number:this.inputStock.po_number,brand_id:this.inputStock.brand_id,stock_updated_date:this.inputStock.stock_updated_date,recieved_date:this.inputStock.stock_updated_date,po_id:this.inputStock.po_id,po_status:a[this.inputStock.po_status],products:this.inputStockproducts.map((t,r)=>({brand_product_id:t.brand_product_id,received_quantity:`${t.received_quantity}`,rtm:`${t.rtm}`,sku_name:t.sku_name,remarks:t.remarks,quantity:t.quantity,hsn_code:t.hsn_code,mrp:t.mrp,uom:t.uom,price_per_unit:t.price_per_unit,taxable_amount:t.taxable_amount,csgt:t.csgt,sgst:t.sgst,amount:t.amount,sgst_percentage:t.sgst_percentage,cgst_percentage:t.cgst_percentage,total_give_margin:t.total_give_margin}))};if(console.log("check the post data",e),!e.products.some(t=>t.received_quantity>0||t.rtm>0)){this.snackbar=!0,this.color="on-background",this.snackbarText="Received Quantity or RTM must be greater than 0 for at least one product.";return}const m=e.products.filter(t=>{console.log("check the post data",t.rtm>t.quantity);const r=Number(t.received_quantity)+Number(t.rtm);return this.isQuantityExceeded(t.received_quantity,t.quantity)||t.received_quantity===0&&t.rtm>t.quantity||t.received_quantity===t.quantity&&t.rtm>t.quantity||r>t.quantity});console.log("valid errors",m),m.length===0?this.PostInputstock(e).then(t=>{console.log("check the response",t),console.log("check the response",t.status),t.status==1?(this.snackbar=!0,this.color="primary",this.formData={},this.snackbarText=t.message,setTimeout(()=>{this.$router.push({name:"Viewpurchasehistory"})},2e3)):(this.snackbar=!0,this.color="on-background")}):(this.snackbar=!0,this.color="on-background",this.snackbarText="your quantities are exceeded")},getFormattedDate(a){const e=a.getFullYear(),u=String(a.getMonth()+1).padStart(2,"0"),m=String(a.getDate()).padStart(2,"0");return`${e}-${u}-${m}`},getInputstockdetails(){this.getInputstock(this.PoId).then(a=>{this.InputStockDetails=a.data,console.log("check input dtock",this.InputStockDetails),this.InputStockDetails.forEach(e=>{this.inputStock.brand_id=e.brand_id,this.inputStock.po_id=e.po_id,this.inputStock.po_number=e.po_number,this.inputStock.brand_name=e.brand_name,this.inputStock.po_status="Received",this.inputStockproducts=e.products,this.inputStock.received_quantity=e.received_quantity,this.inputStock.remarks=e.remarks,this.inputStock.rtm=e.rtm,console.log("inputStockproducts",this.inputStockproducts)})})}}},K={class:"text-center"},W={class:"text-center"},Z={class:"text-center"},j={class:"text-center"},z={key:0},A={class:"text-center"},L={class:"text-center"};function Y(a,e,u,m,t,r){return d(),c("div",null,[o(V,null,{default:n(()=>[o(p,{cols:"12"},{default:n(()=>[o(g,{title:"Input Stock",class:"mb-4"},{default:n(()=>[o(x,null,{default:n(()=>[o(C,{class:"mt-6",ref:"purchaseOrderForm"},{default:n(()=>[o(V,null,{default:n(()=>[o(p,{md:"6",cols:"12"},{default:n(()=>[o(_,{modelValue:this.inputStock.po_number,"onUpdate:modelValue":e[0]||(e[0]=s=>this.inputStock.po_number=s),label:"Purchase Order",readonly:""},null,8,["modelValue"])]),_:1}),o(p,{cols:"12",md:"6"},{default:n(()=>[o(_,{modelValue:this.inputStock.brand_name,"onUpdate:modelValue":e[1]||(e[1]=s=>this.inputStock.brand_name=s),label:"Order To",readonly:""},null,8,["modelValue"])]),_:1}),o(p,{cols:"12",md:"6"},{default:n(()=>[o(_,{modelValue:this.inputStock.stock_updated_date,"onUpdate:modelValue":e[2]||(e[2]=s=>this.inputStock.stock_updated_date=s),type:"date",label:"Date",min:t.today,rules:a.dateRules,readonly:""},null,8,["modelValue","min","rules"])]),_:1}),o(p,{md:"6",cols:"12"},{default:n(()=>[o(_,{modelValue:this.inputStock.po_status,"onUpdate:modelValue":e[3]||(e[3]=s=>this.inputStock.po_status=s),label:"PO Status",readonly:""},null,8,["modelValue"])]),_:1}),o(p,{cols:"12"},{default:n(()=>[o(F,{headers:t.headers,items:t.InputStockDetails},{default:n(()=>[l("thead",null,[l("tr",null,[(d(!0),c(b,null,y(t.headers,s=>(d(),c("th",{class:"text-center",key:s},k(s.text),1))),128))])]),l("tbody",null,[(d(!0),c(b,null,y(this.inputStockproducts,(s,i)=>(d(),c("tr",{key:i},[l("td",K,k(s.sku_name),1),l("td",W,k(s.uom),1),l("td",Z,k(s.quantity),1),l("td",j,[o(_,{modelValue:s.received_quantity,"onUpdate:modelValue":h=>s.received_quantity=h,outlined:"",dense:"",onKeydown:r.preventDecimal,onPaste:r.preventPaste,type:"number",min:"0",max:s.quantity,rules:t.receivedquantity},null,8,["modelValue","onUpdate:modelValue","onKeydown","onPaste","max","rules"]),r.isQuantityExceeded(s.received_quantity,s.quantity)?(d(),c("span",z)):S("",!0)]),l("td",A,[o(_,{onKeydown:r.preventDecimal,onPaste:r.preventPaste,type:"number",min:"0",max:"20000",modelValue:s.rtm,"onUpdate:modelValue":h=>s.rtm=h,outlined:"",dense:"",rules:t.rtm1},null,8,["onKeydown","onPaste","modelValue","onUpdate:modelValue","rules"])]),l("td",L,[o(_,{modelValue:s.remarks,"onUpdate:modelValue":h=>s.remarks=h,outlined:"",dense:"",required:""},null,8,["modelValue","onUpdate:modelValue"])])]))),128))])]),_:1},8,["headers","items"])]),_:1}),o(p,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:n(()=>[o(q,{onClick:e[4]||(e[4]=s=>r.validateForm())},{default:n(()=>[f("Save")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),o(Q,{modelValue:t.snackbar,"onUpdate:modelValue":e[5]||(e[5]=s=>t.snackbar=s),timeout:3e3,color:t.color},{default:n(()=>[f(k(t.snackbarText),1)]),_:1},8,["modelValue","color"])])}const $=v(B,[["render",Y]]),G={components:{Inputstock:$},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Create Input Stock",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=D(),this.activeTab=T(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function H(a,e,u,m,t,r){const s=w("Inputstock");return d(),c("div",null,[o(O,{modelValue:t.activeTab,"onUpdate:modelValue":e[0]||(e[0]=i=>t.activeTab=i),"show-arrows":""},{default:n(()=>[(d(!0),c(b,null,y(t.tabs,i=>(d(),P(M,{key:i.icon,value:i.tab},{default:n(()=>[o(R,{size:"20",start:"",icon:i.icon},null,8,["icon"]),f(" "+k(i.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),o(I),o(E,{modelValue:t.activeTab,"onUpdate:modelValue":e[1]||(e[1]=i=>t.activeTab=i),class:"mt-5 disable-tab-transition",touch:!1},{default:n(()=>[o(N,{value:"account"},{default:n(()=>[o(s)]),_:1})]),_:1},8,["modelValue"])])}const nt=v(G,[["render",H]]);export{nt as default};
