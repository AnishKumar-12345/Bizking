import{_ as g,o as c,c as r,a4 as k,ac as y,g as s,w as l,k as x,l as p,i as f,j as w,a as i,b8 as v,F as m,q as _,t as d,b as V,bE as S,bo as I,v as C,e as T,s as L,r as A,f as D,u as N}from"./index.6638298a.js";import{s as Q}from"./Services.6f255ddc.js";import{V as U}from"./VForm.2c044b6c.js";import{V as q}from"./VAutocomplete.bd8ce008.js";import{V as B}from"./VTextField.b327ba2a.js";import{V as z}from"./VChip.7c92183b.js";import{V as E}from"./VTable.427df10f.js";import{V as F}from"./VPagination.cc2d0af8.js";import{V as P,a as H,b as M,c as R}from"./VWindowItem.cd23a3f8.js";import"./VSelect.08dd14ba.js";import"./VCheckboxBtn.f968322e.js";const W={mixins:[Q],data(){return{filterlocation:!0,locationdata:"",cityLoaction:[],searchQuery:"",page:1,pageSize:10,loading:!0,Allstocks:[],cityID:"",headers:[{text:"Brand Name",value:"brand_name"},{text:"SKU Name",value:"sku_name"},{text:"UOM",value:"uom"},{text:"HSN Code",value:"hsn_code"},{text:"Available Quantity",value:"available_qty"},{text:"Stock Updated Date",value:"stock_updated_date"}]}},computed:{filteredStocks(){const e=this.searchQuery.toLowerCase().trim();return this.Allstocks.filter(t=>t.brand_name&&t.brand_name.toLowerCase().includes(e)||t.sku_name&&t.sku_name.toLowerCase().includes(e)||t.uom&&t.uom.toLowerCase().includes(e)||t.hsn_code&&t.hsn_code.toString().includes(e)||t.available_qty&&t.available_qty.toString().includes(e)||t.stock_updated_date&&t.stock_updated_date.toLowerCase().includes(e))},paginatedItems(){const e=(this.page-1)*this.pageSize,t=e+this.pageSize;return this.filteredStocks.slice(e,t)}},mounted(){this.cityID=localStorage.getItem("city_id"),this.location_id=localStorage.getItem("location_id"),this.handleBrandSelection(),console.log("view stock view"),this.getstocksdetails().then(()=>{this.loading=!1}).catch(e=>{console.error("Error fetching merchants:",e)})},methods:{handleBrandSelection(){this.getCitylocation(this.cityID).then(e=>{this.cityLoaction=e.data.data.map(t=>({value:t.location_id,text:t.location}))})},locationdetails(){this.getAllstocks(this.cityID,this.locationdata).then(e=>{this.Allstocks=e.data.data,this.Allstocks.reverse(),resolve()})},updatePagination(e){this.page=e},getstocksdetails(){return new Promise((e,t)=>{city_id!=""&&location_id!==""&&this.getAllstocks(this.cityID,this.location_id).then(u=>{this.Allstocks=u.data.data,this.Allstocks.reverse(),e()}).catch(u=>{console.error("Error fetching merchants:",u),t(u)})})},colorQuantity(e){return e>=10?{color:"success"}:{color:"error"}}}},j={style:{"max-width":"400px"}},K={key:0,id:"app"},O=S('<div id="loading-bg"><div class="loading-logo"><img src="'+I+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),G=[O],J={key:0},X=i("td",{colspan:"16",class:"text-center"},[i("h1",null,"No data found !")],-1),Y=[X],Z={class:"text-center"},$={class:"text-center"},tt={class:"text-center"},et={class:"text-center"},at={class:"text-center"},st={class:"text-center"};function ot(e,t,u,b,o,h){return c(),r("div",null,[k(s(w,{class:"mb-2"},{default:l(()=>[s(x,null,{default:l(()=>[s(p,null,{default:l(()=>[s(f,{cols:"12"},{default:l(()=>[s(U,{class:"mt-6"},{default:l(()=>[s(p,null,{default:l(()=>[s(f,{md:"6",cols:"12"},{default:l(()=>[s(q,{modelValue:o.locationdata,"onUpdate:modelValue":[t[0]||(t[0]=a=>o.locationdata=a),t[1]||(t[1]=a=>h.locationdetails())],label:"Location",items:this.cityLoaction,"item-value":"value","item-title":"text","menu-props":{maxHeight:200}},null,8,["modelValue","items"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},512),[[y,o.filterlocation]]),i("div",j,[s(B,{class:"mb-3",modelValue:o.searchQuery,"onUpdate:modelValue":t[2]||(t[2]=a=>o.searchQuery=a),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),o.loading?(c(),r("div",K,G)):v("",!0),s(E,{headers:o.headers,items:this.paginatedItems,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:l(()=>[i("thead",null,[i("tr",null,[(c(!0),r(m,null,_(o.headers,a=>(c(),r("th",{class:"text-center",key:a},d(a.text),1))),128))])]),i("tbody",null,[h.filteredStocks.length===0?(c(),r("tr",J,Y)):v("",!0),(c(!0),r(m,null,_(this.paginatedItems,(a,n)=>(c(),r("tr",{key:n},[i("td",Z,d(a.brand_name),1),i("td",$,d(a.sku_name),1),i("td",tt,d(a.uom),1),i("td",et,d(a.hsn_code),1),i("td",at,[s(z,{color:h.colorQuantity(a.available_qty).color,class:"font-weight-medium",size:"small"},{default:l(()=>[V(d(a.available_qty>=0?a.available_qty:0),1)]),_:2},1032,["color"])]),i("td",st,d(a.stock_updated_date),1)]))),128))])]),_:1},8,["headers","items"]),s(F,{modelValue:o.page,"onUpdate:modelValue":t[3]||(t[3]=a=>o.page=a),length:Math.ceil(h.filteredStocks.length/o.pageSize),onInput:h.updatePagination},null,8,["modelValue","length","onInput"])])}const lt=g(W,[["render",ot]]),it={components:{Viewstocks:lt},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Stock",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=C(),this.activeTab=T(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function nt(e,t,u,b,o,h){const a=A("Viewstocks");return c(),r("div",null,[s(P,{modelValue:o.activeTab,"onUpdate:modelValue":t[0]||(t[0]=n=>o.activeTab=n),"show-arrows":""},{default:l(()=>[(c(!0),r(m,null,_(o.tabs,n=>(c(),D(R,{key:n.icon,value:n.tab},{default:l(()=>[s(N,{size:"20",start:"",icon:n.icon},null,8,["icon"]),V(" "+d(n.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),s(L),s(M,{modelValue:o.activeTab,"onUpdate:modelValue":t[1]||(t[1]=n=>o.activeTab=n),class:"mt-5 disable-tab-transition",touch:!1},{default:l(()=>[s(H,{value:"account"},{default:l(()=>[s(a)]),_:1})]),_:1},8,["modelValue"])])}const Vt=g(it,[["render",nt]]);export{Vt as default};
