import{_ as b,o as c,c as d,a4 as k,ac as x,g as s,w as l,k as w,l as p,i as g,j as S,a as i,b8 as v,F as m,q as _,t as r,b as f,bo as I,bp as C,v as D,e as T,s as L,r as A,f as q,u as N}from"./index.29ae4a8e.js";import{s as Q}from"./Services.7406fd05.js";import{V as B}from"./VForm.0656b613.js";import{V as U}from"./VAutocomplete.4b72ac3c.js";import{V as z}from"./VTextField.1c951582.js";import{V}from"./VChip.5c10713d.js";import{V as F}from"./VTable.813445d6.js";import{V as P}from"./VPagination.1ea2a1a2.js";import{V as E,a as H,b as M,c as R}from"./VWindowItem.20b992ec.js";import"./VCounter.c77ecd08.js";import"./VSelect.119c8a48.js";import"./VCheckboxBtn.aed2973f.js";const W={mixins:[Q],data(){return{filterlocation:!0,locationdata:"",cityLoaction:[],searchQuery:"",page:1,pageSize:10,loading:!1,Allstocks:[],cityID:"",locationID:"",headers:[{text:"Brand Name",value:"brand_name"},{text:"SKU Name",value:"sku_name"},{text:"UOM",value:"uom"},{text:"HSN Code",value:"hsn_code"},{text:"Available Quantity",value:"available_qty"},{text:"Bad Quantity",value:"bad_quantity"},{text:"Stock Updated Date",value:"stock_updated_date"}]}},computed:{filteredStocks(){const e=this.searchQuery.toLowerCase().trim();return this.Allstocks.filter(t=>t.brand_name&&t.brand_name.toLowerCase().includes(e)||t.sku_name&&t.sku_name.toLowerCase().includes(e)||t.uom&&t.uom.toLowerCase().includes(e)||t.hsn_code&&t.hsn_code.toString().includes(e)||t.available_qty&&t.available_qty.toString().includes(e)||t.stock_updated_date&&t.stock_updated_date.toLowerCase().includes(e))},paginatedItems(){const e=(this.page-1)*this.pageSize,t=e+this.pageSize;return this.filteredStocks.slice(e,t)}},mounted(){this.cityID=localStorage.getItem("city_id"),this.locationID=localStorage.getItem("location_id"),this.handleBrandSelection(),console.log("view stock view"),this.getstocksdetails().then(()=>{this.loading=!1}).catch(e=>{console.error("Error fetching merchants:",e)})},methods:{handleBrandSelection(){this.getCitylocation(this.cityID).then(e=>{this.cityLoaction=e.data.data.map(t=>({value:t.location_id,text:t.location}))})},locationdetails(){this.loading=!0,this.getAllstocks(this.cityID,this.locationdata).then(e=>{console.log("check the get res",e),e.data.status==1?(this.Allstocks=e.data.data,this.Allstocks.reverse(),this.loading=!1):this.loading=!1})},updatePagination(e){this.page=e},getstocksdetails(){return new Promise((e,t)=>{this.cityID!=""&&this.locationID!==""&&(this.loading=!0,this.filterlocation=!1,this.getAllstocks(this.cityID,this.locationID).then(u=>{this.Allstocks=u.data.data,this.Allstocks.reverse(),e()}).catch(u=>{console.error("Error fetching merchants:",u),t(u)}))})},colorQuantity(e){return e>=10?{color:"success"}:{color:"error"}}}},j={style:{"max-width":"400px"}},K={key:0,id:"app"},O=I('<div id="loading-bg"><div class="loading-logo"><img src="'+C+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),G=[O],J={key:0},X=i("td",{colspan:"16",class:"text-center"},[i("h1",null,"No data found !")],-1),Y=[X],Z={class:"text-center"},$={class:"text-center"},tt={class:"text-center"},et={class:"text-center"},at={class:"text-center"},st={class:"text-center"},ot={class:"text-center"};function lt(e,t,u,y,o,h){return c(),d("div",null,[k(s(S,{class:"mb-2"},{default:l(()=>[s(w,null,{default:l(()=>[s(p,null,{default:l(()=>[s(g,{cols:"12"},{default:l(()=>[s(B,{class:"mt-6"},{default:l(()=>[s(p,null,{default:l(()=>[s(g,{md:"6",cols:"12"},{default:l(()=>[s(U,{modelValue:o.locationdata,"onUpdate:modelValue":[t[0]||(t[0]=a=>o.locationdata=a),t[1]||(t[1]=a=>h.locationdetails())],label:"Location",items:this.cityLoaction,"item-value":"value","item-title":"text","menu-props":{maxHeight:200}},null,8,["modelValue","items"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},512),[[x,o.filterlocation]]),i("div",j,[s(z,{class:"mb-3",modelValue:o.searchQuery,"onUpdate:modelValue":t[2]||(t[2]=a=>o.searchQuery=a),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),o.loading?(c(),d("div",K,G)):v("",!0),s(F,{headers:o.headers,items:this.paginatedItems,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:l(()=>[i("thead",null,[i("tr",null,[(c(!0),d(m,null,_(o.headers,a=>(c(),d("th",{class:"text-center",key:a},r(a.text),1))),128))])]),i("tbody",null,[h.filteredStocks.length===0?(c(),d("tr",J,Y)):v("",!0),(c(!0),d(m,null,_(this.paginatedItems,(a,n)=>(c(),d("tr",{key:n},[i("td",Z,r(a.brand_name),1),i("td",$,r(a.sku_name),1),i("td",tt,r(a.uom),1),i("td",et,r(a.hsn_code),1),i("td",at,[s(V,{color:h.colorQuantity(a.available_qty).color,class:"font-weight-medium",size:"small"},{default:l(()=>[f(r(a.available_qty>=0?a.available_qty:0),1)]),_:2},1032,["color"])]),i("td",st,[s(V,{color:"error",class:"font-weight-medium",size:"small"},{default:l(()=>[f(r(a.bad_quantity),1)]),_:2},1024)]),i("td",ot,r(a.stock_updated_date),1)]))),128))])]),_:1},8,["headers","items"]),s(P,{modelValue:o.page,"onUpdate:modelValue":t[3]||(t[3]=a=>o.page=a),length:Math.ceil(h.filteredStocks.length/o.pageSize),onInput:h.updatePagination},null,8,["modelValue","length","onInput"])])}const it=b(W,[["render",lt]]),nt={components:{Viewstocks:it},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Stock",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=D(),this.activeTab=T(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function ct(e,t,u,y,o,h){const a=A("Viewstocks");return c(),d("div",null,[s(E,{modelValue:o.activeTab,"onUpdate:modelValue":t[0]||(t[0]=n=>o.activeTab=n),"show-arrows":""},{default:l(()=>[(c(!0),d(m,null,_(o.tabs,n=>(c(),q(R,{key:n.icon,value:n.tab},{default:l(()=>[s(N,{size:"20",start:"",icon:n.icon},null,8,["icon"]),f(" "+r(n.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),s(L),s(M,{modelValue:o.activeTab,"onUpdate:modelValue":t[1]||(t[1]=n=>o.activeTab=n),class:"mt-5 disable-tab-transition",touch:!1},{default:l(()=>[s(H,{value:"account"},{default:l(()=>[s(a)]),_:1})]),_:1},8,["modelValue"])])}const yt=b(nt,[["render",ct]]);export{yt as default};
