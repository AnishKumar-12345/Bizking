import{_,o as n,c as u,g as s,w as r,i as m,j as x,k as v,l as V,a as i,F as h,q as p,t as d,b8 as y,b as f,v as S,e as k,r as w,f as T,u as I,s as C}from"./index.08705643.js";import{s as B}from"./Services.f9e4372b.js";import{V as N}from"./VForm.eec84c64.js";import{V as U}from"./VAutocomplete.457394fd.js";import{V as z}from"./VTextField.0584a3e6.js";import{V as D}from"./VTable.eda8fa83.js";import{V as F}from"./VPagination.f3ba474e.js";import{V as H}from"./VSnackbar.89c018e7.js";import{V as Q,a as R,b as A,c as L}from"./VWindowItem.2d182e11.js";import"./VCounter.d136124c.js";import"./VSelect.00b3ff1f.js";import"./VCheckboxBtn.770726d6.js";import"./VChip.cd0ade04.js";const P={mixins:[B],data(){return{salesdata:[],routedata:[],searchQuery:"",snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,page:1,pageSize:10,cityID:"",routeuserid:"",headers:[{text:"Route Name",value:"route_name"},{text:"Status",value:"status"},{text:"Stores Count",value:"stores_count"},{text:"Visited Stores Count",value:"visited_stores_count"}]}},computed:{filteredSalesHistory(){const o=this.searchQuery.toLowerCase().trim();return this.routedata.filter(e=>e.route_name&&e.route_name.toLowerCase().includes(o)||e.status&&e.status.toLowerCase().includes(o)||e.stores_count&&e.stores_count.toString().includes(o)||e.visited_stores_count&&e.visited_stores_count.toString().includes(o))},paginatedItems(){const o=(this.page-1)*this.pageSize,e=o+this.pageSize;return this.filteredSalesHistory.slice(o,e)}},mounted(){this.cityID=localStorage.getItem("city_id"),this.getAllsales()},methods:{updatePagination(o){this.page=o},handleBrandSelection(o){this.viewroutes(o).then(e=>{console.log({response:e}),e.data.status==1?(this.routedata=e.data.data,this.snackbar=!0,this.snackbarText=e.data.message,this.color="primary"):(this.snackbar=!0,this.snackbarText=e.data.message,this.color="on-background",this.routedata=[])})},getAllsales(){this.getSalesassociate(this.cityID).then(o=>{this.salesdata=o.data.data,this.salesdata=this.salesdata.map(e=>({value:e.user_id,text:e.name}))})}}},q={style:{"max-width":"400px"}},W={key:0},j=i("td",{colspan:"16",class:"text-center"},[i("h1",null,"No data found !")],-1),E=[j],M={class:"text-center"},O={class:"text-center"},G={class:"text-center"},J={class:"text-center"};function K(o,e,b,g,t,c){return n(),u("div",null,[s(V,null,{default:r(()=>[s(m,{cols:"12"},{default:r(()=>[s(x,{title:"View Routes",class:"mb-4"},{default:r(()=>[s(v,null,{default:r(()=>[s(N,{class:"mt-6",ref:"purchaseOrderForm"},{default:r(()=>[s(V,null,{default:r(()=>[s(m,{cols:"12",md:"6"},{default:r(()=>[s(U,{modelValue:t.routeuserid,"onUpdate:modelValue":[e[0]||(e[0]=a=>t.routeuserid=a),e[1]||(e[1]=a=>c.handleBrandSelection(t.routeuserid))],label:"Sales Associate",items:this.salesdata,"item-value":"value","item-title":"text","menu-props":{maxHeight:200},required:""},null,8,["modelValue","items"])]),_:1})]),_:1}),s(m,null,{default:r(()=>[i("div",q,[s(z,{class:"mb-3",modelValue:t.searchQuery,"onUpdate:modelValue":e[2]||(e[2]=a=>t.searchQuery=a),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),s(D,{headers:t.headers,items:c.paginatedItems,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:r(()=>[i("thead",null,[i("tr",null,[(n(!0),u(h,null,p(t.headers,a=>(n(),u("th",{class:"text-center",key:a},d(a.text),1))),128))])]),i("tbody",null,[c.filteredSalesHistory.length===0?(n(),u("tr",W,E)):y("",!0),(n(!0),u(h,null,p(this.paginatedItems,(a,l)=>(n(),u("tr",{key:l},[i("td",M,d(a.route_name),1),i("td",O,d(a.status),1),i("td",G,d(a.stores_count),1),i("td",J,d(a.visited_stores_count),1)]))),128))])]),_:1},8,["headers","items"])]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),s(F,{modelValue:t.page,"onUpdate:modelValue":e[3]||(e[3]=a=>t.page=a),length:Math.ceil(c.filteredSalesHistory.length/t.pageSize),onInput:c.updatePagination},null,8,["modelValue","length","onInput"]),s(H,{modelValue:t.snackbar,"onUpdate:modelValue":e[4]||(e[4]=a=>t.snackbar=a),timeout:2e3,color:t.color},{default:r(()=>[f(d(t.snackbarText),1)]),_:1},8,["modelValue","color"])])}const X=_(P,[["render",K]]),Y={components:{Viewroutes:X},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Routes",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=S(),this.activeTab=k(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function Z(o,e,b,g,t,c){const a=w("Viewroutes");return n(),u("div",null,[s(R,{modelValue:t.activeTab,"onUpdate:modelValue":e[0]||(e[0]=l=>t.activeTab=l),"show-arrows":""},{default:r(()=>[(n(!0),u(h,null,p(t.tabs,l=>(n(),T(Q,{key:l.icon,value:l.tab},{default:r(()=>[s(I,{size:"20",start:"",icon:l.icon},null,8,["icon"]),f(" "+d(l.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),s(C),s(L,{modelValue:t.activeTab,"onUpdate:modelValue":e[1]||(e[1]=l=>t.activeTab=l),class:"mt-5 disable-tab-transition",touch:!1},{default:r(()=>[s(A,{value:"account"},{default:r(()=>[s(a)]),_:1})]),_:1},8,["modelValue"])])}const me=_(Y,[["render",Z]]);export{me as default};