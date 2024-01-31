import{_ as p,o as c,c as n,g as a,w as l,a as r,F as h,s as _,t as i,b as m,n as V,v as b,x,e as y,u as g,r as w,f as k}from"./index.64325b43.js";import{s as T}from"./Services.e73a1808.js";import{V as H}from"./VChip.5298ec56.js";import{V as I}from"./VTable.a6af340d.js";import{V as P,a as S,b as B,c as C}from"./VWindowItem.2921a6d0.js";import"./index.2bd8ddc8.js";const z={mixins:[T],data(){return{purchaseHistory:[],userIds:"",createdBy:"",headers:[{text:"PO Number",value:"po_number"},{text:"Order Date",value:"created_date"},{text:"Status",value:"po_status"},{text:"Order To",value:"brand_name"},{text:"Shipped To",value:"brand_name"},{text:"Action",value:"actions"}]}},computed:{filteredPurchaseHistory(){return this.purchaseHistory.filter(e=>e.po_status==="Acknowledged"||e.po_status==="Shared")}},mounted(){this.createdBy=localStorage.getItem("createdby"),this.userIds=localStorage.getItem("userId"),this.getPurchasehistorydetails()},methods:{inputstock(e){console.log("check the detials",e.po_id),this.$router.push({name:"Createwarehouseinput",query:{po_id:e.po_id}})},getPurchasehistorydetails(){this.getPurchaseorder(this.userIds,this.userRoles).then(e=>{console.log("check the view purchase order",e.data),this.purchaseHistory=e.data,console.log("check the view purchase History",this.purchaseHistory)})},resolveStatusVariant(e){return e=="Acknowledged"?{color:"warning"}:{color:"info"}}}},N={class:"text-center"},A={class:"text-center"},D={class:"text-center"},O={class:"text-center"},F={class:"text-center"},R={class:"text-center"};function U(e,u,f,v,o,d){return c(),n("div",null,[a(I,{headers:o.headers,items:d.filteredPurchaseHistory,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:l(()=>[r("thead",null,[r("tr",null,[(c(!0),n(h,null,_(o.headers,t=>(c(),n("th",{class:"text-center",key:t},i(t.text),1))),128))])]),r("tbody",null,[(c(!0),n(h,null,_(d.filteredPurchaseHistory,(t,s)=>(c(),n("tr",{key:s},[r("td",N,i(t.po_number),1),r("td",A,i(t.created_date),1),r("td",D,[a(H,{color:d.resolveStatusVariant(t.po_status).color,class:"font-weight-medium",size:"small"},{default:l(()=>[m(i(t.po_status),1)]),_:2},1032,["color"])]),r("td",O,i(t.brand_name),1),r("td",F,i(t.brand_name),1),r("td",R,[a(V,{icon:"",variant:"text",color:"success",class:"me-2",size:"small"},{default:l(()=>[a(b,{icon:"bitcoin-icons:receive-filled",color:"success",size:"30",onClick:L=>d.inputstock(t)},null,8,["onClick"])]),_:2},1024)])]))),128))])]),_:1},8,["headers","items"])])}const W=p(z,[["render",U]]),q={components:{Viewpurchasehistories:W},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Purchase History",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=x(),this.activeTab=y(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function E(e,u,f,v,o,d){const t=w("Viewpurchasehistories");return c(),n("div",null,[a(P,{modelValue:o.activeTab,"onUpdate:modelValue":u[0]||(u[0]=s=>o.activeTab=s),"show-arrows":""},{default:l(()=>[(c(!0),n(h,null,_(o.tabs,s=>(c(),k(C,{key:s.icon,value:s.tab},{default:l(()=>[a(b,{size:"20",start:"",icon:s.icon},null,8,["icon"]),m(" "+i(s.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),a(g),a(B,{modelValue:o.activeTab,"onUpdate:modelValue":u[1]||(u[1]=s=>o.activeTab=s),class:"mt-5 disable-tab-transition",touch:!1},{default:l(()=>[a(S,{value:"account"},{default:l(()=>[a(t)]),_:1})]),_:1},8,["modelValue"])])}const Q=p(q,[["render",E]]);export{Q as default};
