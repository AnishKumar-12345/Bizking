import{_ as m,o as i,c,a as l,g as n,b6 as g,w as d,F as _,q as h,t as r,b as p,bv as b,bc as V,v as k,e as x,s as y,r as w,f as S,u as T}from"./index.89c3bcd2.js";import{s as C}from"./Services.7881b1f6.js";import{V as I}from"./VTextField.2bb12e56.js";import{V as L}from"./VChip.2a54a4ff.js";import{V as N}from"./VTable.40471282.js";import{V as Q}from"./VPagination.9a0a5039.js";import{V as q,a as A,b as U,c as z}from"./VWindowItem.598181d2.js";import"./index.2bd8ddc8.js";const B={mixins:[C],data(){return{searchQuery:"",page:1,pageSize:10,loading:!0,Allstocks:[],headers:[{text:"Brand Name",value:"brand_name"},{text:"SKU Name",value:"sku_name"},{text:"UOM",value:"uom"},{text:"HSN Code",value:"hsn_code"},{text:"Available Quantity",value:"available_qty"},{text:"Stock Updated Date",value:"stock_updated_date"}]}},computed:{filteredStocks(){const t=this.searchQuery.toLowerCase().trim();return this.Allstocks.filter(e=>e.brand_name&&e.brand_name.toLowerCase().includes(t)||e.sku_name&&e.sku_name.toLowerCase().includes(t)||e.uom&&e.uom.toLowerCase().includes(t)||e.hsn_code&&e.hsn_code.toString().includes(t)||e.available_qty&&e.available_qty.toString().includes(t)||e.stock_updated_date&&e.stock_updated_date.toLowerCase().includes(t))},paginatedItems(){const t=(this.page-1)*this.pageSize,e=t+this.pageSize;return this.filteredStocks.slice(t,e)}},mounted(){this.getstocksdetails(),setTimeout(()=>{this.loading=!1},4e3)},methods:{updatePagination(t){this.page=t},getstocksdetails(){this.getAllstocks().then(t=>{this.Allstocks=t.data.data,console.log("check the view ALl History",this.Allstocks)})},colorQuantity(t){return t>=10?{color:"success"}:{color:"error"}}}},D={style:{"max-width":"400px"}},F={key:0,id:"app"},P=b('<div id="loading-bg"><div class="loading-logo"><img src="'+V+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),H=[P],M={class:"text-center"},W={class:"text-center"},E={class:"text-center"},K={class:"text-center"},O={class:"text-center"},R={class:"text-center"};function j(t,e,v,f,a,u){return i(),c("div",null,[l("div",D,[n(I,{class:"mb-3",modelValue:a.searchQuery,"onUpdate:modelValue":e[0]||(e[0]=s=>a.searchQuery=s),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),a.loading?(i(),c("div",F,H)):g("",!0),n(N,{headers:a.headers,items:this.paginatedItems,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:d(()=>[l("thead",null,[l("tr",null,[(i(!0),c(_,null,h(a.headers,s=>(i(),c("th",{class:"text-center",key:s},r(s.text),1))),128))])]),l("tbody",null,[(i(!0),c(_,null,h(this.paginatedItems,(s,o)=>(i(),c("tr",{key:o},[l("td",M,r(s.brand_name),1),l("td",W,r(s.sku_name),1),l("td",E,r(s.uom),1),l("td",K,r(s.hsn_code),1),l("td",O,[n(L,{color:u.colorQuantity(s.available_qty).color,class:"font-weight-medium",size:"small"},{default:d(()=>[p(r(s.available_qty>=0?s.available_qty:0),1)]),_:2},1032,["color"])]),l("td",R,r(s.stock_updated_date),1)]))),128))])]),_:1},8,["headers","items"]),n(Q,{modelValue:a.page,"onUpdate:modelValue":e[1]||(e[1]=s=>a.page=s),length:Math.ceil(u.filteredStocks.length/a.pageSize),onInput:u.updatePagination},null,8,["modelValue","length","onInput"])])}const G=m(B,[["render",j]]),J={components:{Viewstocks:G},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Stock",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=k(),this.activeTab=x(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function X(t,e,v,f,a,u){const s=w("Viewstocks");return i(),c("div",null,[n(q,{modelValue:a.activeTab,"onUpdate:modelValue":e[0]||(e[0]=o=>a.activeTab=o),"show-arrows":""},{default:d(()=>[(i(!0),c(_,null,h(a.tabs,o=>(i(),S(z,{key:o.icon,value:o.tab},{default:d(()=>[n(T,{size:"20",start:"",icon:o.icon},null,8,["icon"]),p(" "+r(o.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),n(y),n(U,{modelValue:a.activeTab,"onUpdate:modelValue":e[1]||(e[1]=o=>a.activeTab=o),class:"mt-5 disable-tab-transition",touch:!1},{default:d(()=>[n(A,{value:"account"},{default:d(()=>[n(s)]),_:1})]),_:1},8,["modelValue"])])}const le=m(J,[["render",X]]);export{le as default};
