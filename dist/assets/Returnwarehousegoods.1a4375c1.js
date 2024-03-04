import{_ as C,o as i,c as V,a as r,g as a,f as h,w as o,i as d,j as b,k as R,b as g,l as T,b6 as m,F as y,q as x,t as u,m as v,u as w,s as k,bv as D,bc as q,v as B,e as F,r as L}from"./index.89c3bcd2.js";import{s as N}from"./Services.7881b1f6.js";import{V as n}from"./VTextField.2bb12e56.js";import{V as I,a as z}from"./VAlert.2a4b18c3.js";import{V as W}from"./VChip.2a54a4ff.js";import{V as Q}from"./VTable.40471282.js";import{V as O}from"./VPagination.9a0a5039.js";import{V as P}from"./VForm.2a801050.js";import{V as A}from"./VSelect.a4e0af3a.js";import{V as S}from"./VDialog.c30677bb.js";import{V as G}from"./VSnackbar.ed58e230.js";import{V as M,a as Y,b as K,c as j}from"./VWindowItem.598181d2.js";import"./index.2bd8ddc8.js";import"./VCheckboxBtn.7fb327e2.js";const E={mixins:[N],data(){return{dateRules:[s=>!!s||"Date is required"],maxPaginationPages:5,snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,loading:!0,searchQuery:"",GoodsStatus:null,PostRTV:{rtv_id:"",goods_status:"",quantity:"",warehouse_updated_date:"",send_to_brand_date:"",rtv_reason:"",type:"",merchant_product_id:""},getRTV:{so_number:"",brand_name:"",sku_name:"",uom:"",goods_status:"",delivery_person:"",rtv_reason:"",collected_date:"",quantity:"",warehouse_updated_date:"",send_to_brand_date:""},dialog2:!1,page:1,pageSize:10,today:this.getFormattedDate(new Date),dialog:!1,RTVdata:[],headers:[{text:"SoNo",value:"so_number"},{text:"Brand Name",value:"brand_name"},{text:"SKU.",value:"sku_name"},{text:"UOM",value:"uom"},{text:"Goods Status",value:"goods_status"},{text:"Delivery Person",value:"delivery_person"},{text:"RTV Reason",value:"rtv_reason"},{text:"Goods Type",value:"type"},{text:"Collected Date",value:"collected_date"},{text:"Quantity",value:"quantity"},{text:"Warehouse UpdateDate",value:"warehouse_updated_date"},{text:"Send to BrandDate",value:"send_to_brand_date"},{text:"Action",value:"actions"}]}},computed:{filteredRTV(){const s=this.searchQuery.toLowerCase().trim();return this.RTVdata.filter(e=>e.so_number&&e.so_number.toLowerCase().includes(s)||e.brand_name&&e.brand_name.toLowerCase().includes(s)||e.sku_name&&e.sku_name.toLowerCase().includes(s)||e.uom&&e.uom.toLowerCase().includes(s)||e.goods_status&&e.goods_status.toLowerCase().includes(s)||e.delivery_person&&e.delivery_person.toLowerCase().includes(s)||e.rtv_reason&&e.rtv_reason.toLowerCase().includes(s)||e.collected_date&&e.collected_date.toLowerCase().includes(s)||e.quantity&&e.quantity.toLowerCase().includes(s)||e.warehouse_updated_date&&e.warehouse_updated_date.toLowerCase().includes(s)||e.send_to_brand_date&&e.send_to_brand_date.toLowerCase().includes(s))},paginatedItems(){const s=(this.page-1)*this.pageSize,e=s+this.pageSize;return this.filteredRTV.slice(s,e)}},mounted(){this.getRTVdatas(),setTimeout(()=>{this.loading=!1},4e3)},methods:{viewrow(s){console.log("chec",s),this.dialog2=!0,this.getRTV.so_number=s.so_number,this.getRTV.brand_name=s.brand_name,this.getRTV.sku_name=s.sku_name,this.getRTV.uom=s.uom,this.getRTV.goods_status=s.goods_status,this.getRTV.delivery_person=s.delivery_person,this.getRTV.rtv_reason=s.rtv_reason,this.getRTV.collected_date=s.collected_date,this.getRTV.quantity=s.quantity,this.getRTV.warehouse_updated_date=s.warehouse_updated_date,this.getRTV.send_to_brand_date=s.send_to_brand_date},closedialog2(){this.dialog2=!1},updatePagination(s){this.page=s},validateForm(){this.$refs.purchaseOrderForm.validate().then(s=>{s.valid==!0?this.saveeditRTVproducts():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},saveeditRTVproducts(){if(this.PostRTV.type==="return"&&this.PostRTV.goods_status==="Send To Brand")this.snackbar=!0,this.snackbarText="You Can't move Not Moving products to Brand",this.color="on-background",this.PostRTV={},this.dialog=!1;else{const s={goods_status:this.PostRTV.goods_status,quantity:this.PostRTV.quantity,warehouse_updated_date:this.PostRTV.warehouse_updated_date,send_to_brand_date:this.PostRTV.send_to_brand_date,rtv_id:this.PostRTV.rtv_id,rtv_reason:this.PostRTV.rtv_reason,type:this.PostRTV.type,merchant_product_id:this.PostRTV.merchant_product_id};console.log("RTV",s),this.editrtvproducts(s).then(e=>{e.data.status==1?(this.snackbar=!0,this.color="primary",this.PostRTV={},this.snackbarText=e.data.message,this.dialog=!1,this.getRTVdatas()):(this.snackbar=!0,this.color="on-background",this.snackbarText=e.data.message)})}},getFormattedDate(s){const e=s.getFullYear(),p=String(s.getMonth()+1).padStart(2,"0"),f=String(s.getDate()).padStart(2,"0");return`${e}-${p}-${f}`},closedialog(){this.dialog=!1},editrow(s){console.log("check",s),this.dialog=!0,this.PostRTV={merchant_product_id:s.merchant_product_id,rtv_id:s.rtv_id,goods_status:s.goods_status,quantity:s.quantity,rtv_reason:s.rtv_reason,type:s.type,warehouse_updated_date:s.warehouse_updated_date!="N/A"?this.convertDateFormat(s.warehouse_updated_date):"",send_to_brand_date:s.send_to_brand_date!="N/A"?this.convertDateFormat(s.send_to_brand_date):""}},convertDateFormat(s){const e=new Date(s),p=e.getFullYear(),f=String(e.getMonth()+1).padStart(2,"0"),l=String(e.getDate()).padStart(2,"0");return`${p}-${f}-${l}`},colorgoodsstatus(s){return s=="Collected"?{color:"warning"}:s=="Reached Warehouse"||s=="Send To Brand"?{color:"success"}:{color:"error"}},getRTVdatas(){this.getrtvproducts().then(s=>{this.RTVdata=s.data.data,console.log("check the rtv2",this.RTVdata),this.RTVdata.reverse()})}}},H={style:{"max-width":"400px"}},J=r("p",{class:"mb-0"}," The system is trying to retrieving the RTV. Please ensure that you have RTV !",-1),X={key:1,id:"app"},Z=D('<div id="loading-bg"><div class="loading-logo"><img src="'+q+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),$=[Z],ee={class:"text-center"},te={class:"text-center"},ae={class:"text-center"},se={class:"text-center"},oe={class:"text-center"},le={class:"text-center"},de={class:"text-center"},re={class:"text-center"},ne={class:"text-center"},ue={class:"text-center"},ie={class:"text-center"},_e={class:"text-center"},ce={class:"text-center"};function Ve(s,e,p,f,l,_){return i(),V("div",null,[r("div",H,[a(n,{class:"mb-3",modelValue:l.searchQuery,"onUpdate:modelValue":e[0]||(e[0]=t=>l.searchQuery=t),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),_.paginatedItems==null?(i(),h(T,{key:0},{default:o(()=>[a(d,{cols:"12"},{default:o(()=>[a(b,{title:"Sales Order View"},{default:o(()=>[a(R,null,{default:o(()=>[a(I,{color:"warning",variant:"tonal",class:"mb-4",border:"top"},{default:o(()=>[a(z,{class:"mb-1"},{default:o(()=>[g(" Are you sure you have RTV ? ")]),_:1}),J]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})):m("",!0),l.loading?(i(),V("div",X,$)):m("",!0),_.paginatedItems!=null?(i(),h(Q,{key:2,headers:l.headers,items:this.paginatedItems,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:o(()=>[r("thead",null,[r("tr",null,[(i(!0),V(y,null,x(l.headers,t=>(i(),V("th",{class:"text-center",key:t},u(t.text),1))),128))])]),r("tbody",null,[(i(!0),V(y,null,x(this.paginatedItems,(t,c)=>(i(),V("tr",{key:c},[r("td",ee,u(t.so_number),1),r("td",te,u(t.brand_name),1),r("td",ae,u(t.sku_name),1),r("td",se,u(t.uom),1),r("td",oe,[a(W,{color:_.colorgoodsstatus(t.goods_status).color,class:"font-weight-medium",size:"small"},{default:o(()=>[g(u(t.goods_status),1)]),_:2},1032,["color"])]),r("td",le,u(t.delivery_person),1),r("td",de,u(t.rtv_reason),1),r("td",re,u(t.type),1),r("td",ne,u(t.collected_date),1),r("td",ue,u(t.quantity),1),r("td",ie,u(t.warehouse_updated_date),1),r("td",_e,u(t.send_to_brand_date),1),r("td",ce,[t.goods_status!=="Send To Brand"&&!(t.type==="return"&&t.goods_status==="Reached Warehouse")?(i(),h(v,{key:0,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:U=>_.editrow(t)},{default:o(()=>[a(w,{color:"warning",icon:"ri-pencil-line",size:"22"})]),_:2},1032,["onClick"])):m("",!0),t.type==="return"&&t.goods_status==="Reached Warehouse"||t.goods_status==="Send To Brand"?(i(),h(v,{key:1,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:U=>_.viewrow(t)},{default:o(()=>[a(w,{color:"warning",icon:"basil:eye-outline",size:"22"})]),_:2},1032,["onClick"])):m("",!0)])]))),128))])]),_:1},8,["headers","items"])):m("",!0),a(O,{modelValue:l.page,"onUpdate:modelValue":e[1]||(e[1]=t=>l.page=t),length:Math.ceil(_.filteredRTV.length/l.pageSize),onInput:_.updatePagination,max:l.maxPaginationPages},null,8,["modelValue","length","onInput","max"]),a(S,{modelValue:l.dialog,"onUpdate:modelValue":e[8]||(e[8]=t=>l.dialog=t),"max-width":"1000"},{default:o(()=>[a(b,{title:"Purchase Order",class:"mb-2"},{default:o(()=>[a(R,null,{default:o(()=>[a(T,null,{default:o(()=>[a(d,{cols:"12"},{default:o(()=>[a(P,{class:"mt-6",ref:"purchaseOrderForm"},{default:o(()=>[a(T,null,{default:o(()=>[a(d,{md:"6",cols:"12"},{default:o(()=>[a(A,{label:"Select Good Status",modelValue:this.PostRTV.goods_status,"onUpdate:modelValue":e[2]||(e[2]=t=>this.PostRTV.goods_status=t),items:["Reached Warehouse","Send To Brand"]},null,8,["modelValue"])]),_:1}),a(d,{md:"6",cols:"12"},{default:o(()=>[a(n,{label:"Quantity",modelValue:this.PostRTV.quantity,"onUpdate:modelValue":e[3]||(e[3]=t=>this.PostRTV.quantity=t)},null,8,["modelValue"])]),_:1}),a(d,{md:"6",cols:"12"},{default:o(()=>[this.PostRTV.goods_status=="Send To Brand"?(i(),h(n,{key:0,modelValue:this.PostRTV.send_to_brand_date,"onUpdate:modelValue":e[4]||(e[4]=t=>this.PostRTV.send_to_brand_date=t),type:"date",label:"Send To Brand Date",min:l.today,rules:l.dateRules},null,8,["modelValue","min","rules"])):m("",!0),this.PostRTV.goods_status=="Reached Warehouse"?(i(),h(n,{key:1,modelValue:this.PostRTV.warehouse_updated_date,"onUpdate:modelValue":e[5]||(e[5]=t=>this.PostRTV.warehouse_updated_date=t),type:"date",label:"Warehouse Update Date",min:l.today,rules:l.dateRules},null,8,["modelValue","min","rules"])):m("",!0)]),_:1}),a(k),a(d,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[a(v,{onClick:e[6]||(e[6]=t=>_.validateForm()),disabled:this.PostRTV.goods_status=="Collected"},{default:o(()=>[g("Save")]),_:1},8,["disabled"]),a(v,{color:"secondary",variant:"tonal",onClick:e[7]||(e[7]=t=>_.closedialog())},{default:o(()=>[g(" Close ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(S,{modelValue:l.dialog2,"onUpdate:modelValue":e[21]||(e[21]=t=>l.dialog2=t),"max-width":"1000"},{default:o(()=>[a(b,{title:"View RTV Details",class:"mb-2"},{default:o(()=>[a(R,null,{default:o(()=>[a(T,null,{default:o(()=>[a(d,{cols:"12"},{default:o(()=>[a(P,{class:"mt-6",ref:"purchaseOrderForm"},{default:o(()=>[a(T,null,{default:o(()=>[a(d,{md:"6",cols:"12"},{default:o(()=>[a(n,{label:"So No",modelValue:this.getRTV.so_number,"onUpdate:modelValue":e[9]||(e[9]=t=>this.getRTV.so_number=t),readonly:""},null,8,["modelValue"])]),_:1}),a(d,{md:"6",cols:"12"},{default:o(()=>[a(n,{label:"BrandName",modelValue:this.getRTV.brand_name,"onUpdate:modelValue":e[10]||(e[10]=t=>this.getRTV.brand_name=t),readonly:""},null,8,["modelValue"])]),_:1}),a(d,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:this.getRTV.sku_name,"onUpdate:modelValue":e[11]||(e[11]=t=>this.getRTV.sku_name=t),readonly:"",label:"SKU Name"},null,8,["modelValue"])]),_:1}),a(d,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:this.getRTV.uom,"onUpdate:modelValue":e[12]||(e[12]=t=>this.getRTV.uom=t),readonly:"",label:"UOM"},null,8,["modelValue"])]),_:1}),a(d,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:this.getRTV.goods_status,"onUpdate:modelValue":e[13]||(e[13]=t=>this.getRTV.goods_status=t),label:"Goods Status",readonly:""},null,8,["modelValue"])]),_:1}),a(d,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:this.getRTV.delivery_person,"onUpdate:modelValue":e[14]||(e[14]=t=>this.getRTV.delivery_person=t),label:"Delivery Person",readonly:""},null,8,["modelValue"])]),_:1}),a(d,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:this.getRTV.rtv_reason,"onUpdate:modelValue":e[15]||(e[15]=t=>this.getRTV.rtv_reason=t),readonly:"",label:"RTV Reason"},null,8,["modelValue"])]),_:1}),a(d,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:this.getRTV.collected_date,"onUpdate:modelValue":e[16]||(e[16]=t=>this.getRTV.collected_date=t),readonly:"",label:"Collected Date"},null,8,["modelValue"])]),_:1}),a(d,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:this.getRTV.quantity,"onUpdate:modelValue":e[17]||(e[17]=t=>this.getRTV.quantity=t),readonly:"",label:"Quantity"},null,8,["modelValue"])]),_:1}),a(d,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:this.getRTV.warehouse_updated_date,"onUpdate:modelValue":e[18]||(e[18]=t=>this.getRTV.warehouse_updated_date=t),readonly:"",label:"WareHouse Updated Date"},null,8,["modelValue"])]),_:1}),a(d,{md:"6",cols:"12"},{default:o(()=>[a(n,{modelValue:this.getRTV.send_to_brand_date,"onUpdate:modelValue":e[19]||(e[19]=t=>this.getRTV.send_to_brand_date=t),readonly:"",label:"Send To Brand Date"},null,8,["modelValue"])]),_:1}),a(k),a(d,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:o(()=>[a(v,{color:"secondary",variant:"tonal",onClick:e[20]||(e[20]=t=>_.closedialog2())},{default:o(()=>[g(" Close ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(G,{modelValue:l.snackbar,"onUpdate:modelValue":e[22]||(e[22]=t=>l.snackbar=t),timeout:3500,color:l.color},{default:o(()=>[g(u(l.snackbarText),1)]),_:1},8,["modelValue","color"])])}const me=C(E,[["render",Ve]]),he={components:{UpdateRTV:me},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Return Goods",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=B(),this.activeTab=F(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function ge(s,e,p,f,l,_){const t=L("UpdateRTV");return i(),V("div",null,[a(M,{modelValue:l.activeTab,"onUpdate:modelValue":e[0]||(e[0]=c=>l.activeTab=c),"show-arrows":""},{default:o(()=>[(i(!0),V(y,null,x(l.tabs,c=>(i(),h(j,{key:c.icon,value:c.tab},{default:o(()=>[a(w,{size:"20",start:"",icon:c.icon},null,8,["icon"]),g(" "+u(c.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),a(k),a(K,{modelValue:l.activeTab,"onUpdate:modelValue":e[1]||(e[1]=c=>l.activeTab=c),class:"mt-5 disable-tab-transition",touch:!1},{default:o(()=>[a(Y,{value:"account"},{default:o(()=>[a(t)]),_:1})]),_:1},8,["modelValue"])])}const De=C(he,[["render",ge]]);export{De as default};