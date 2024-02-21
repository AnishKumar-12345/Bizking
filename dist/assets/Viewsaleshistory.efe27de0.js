import{_ as x,o as r,c as u,g as a,bg as h,bj as y,f as _,w as l,i as w,j as k,k as C,b as f,l as T,a as n,F as g,q as V,t as d,m as b,u as v,v as z,e as I,s as D,r as O}from"./index.932c584e.js";import{s as L}from"./Services.ed5d9645.js";import{V as P}from"./VTextField.08a83681.js";import{V as A,a as F}from"./VAlert.e3624d7e.js";import{V as B}from"./VChip.670d4bda.js";import{V as Q}from"./VTable.ac4f1758.js";import{V as H}from"./VPagination.33a460d5.js";import{V as N,a as U,b as R,c as j}from"./VWindowItem.beef0345.js";import"./index.2bd8ddc8.js";const q={mixins:[L],data(){return{page:1,pageSize:10,loading2:!1,loaded:!1,loading:!0,saleshistory:[],searchQuery:"",headers:[{text:"Sales Order",value:"so_number"},{text:"Order Date",value:"created_date"},{text:"Status",value:"so_status"},{text:"Order From",value:"merchant_name"},{text:"Shipped To",value:"merchant_name"},{text:"Order Value",value:"total_so_amount"},{text:"Action",value:"actions",sortable:!1}]}},computed:{filteredSalesHistory(){const s=this.searchQuery.toLowerCase().trim();return this.saleshistory.filter(e=>{const m=e.so_number&&e.so_number.toLowerCase().includes(s)||e.created_date&&e.created_date.toLowerCase().includes(s)||e.so_status&&e.so_status.toLowerCase().includes(s)||e.merchant_name&&e.merchant_name.toLowerCase().includes(s)||e.total_so_amount&&e.total_so_amount.toString().includes(s),p=e.so_status==="Acknowledged"||e.so_status==="Delivered"||e.so_status==="Received"||e.so_status==="Shipped";return m&&p})},paginatedItems(){const s=(this.page-1)*this.pageSize,e=s+this.pageSize;return this.filteredSalesHistory.slice(s,e)}},mounted(){this.getSalesorderdetails(),setTimeout(()=>{this.loading=!1},2500)},methods:{updatePagination(s){this.page=s},getPDFupdate(s){this.loading2=!0,window.open(s,"_blank"),this.loading2=!1},outputstock(s){console.log("check the detials",s.so_id),this.$router.push({name:"Createwarehouseoutput",query:{so_id:s.so_id}})},resolveStatusVariant(s){return s=="Acknowledged"?{color:"warning"}:{color:"success"}},getSalesorderdetails(){this.getSalesorders().then(s=>{this.saleshistory=s.data,this.saleshistory.reverse(),console.log("check rhe res",this.saleshistory)})}}},W={key:0,style:{"max-width":"400px"}},E={key:1,class:"loading-container"},M={key:2,class:"loading-container"},G=n("p",{class:"mb-0"}," The system is not retrieving the Sales Orders. Please ensure that you have applied for Sales Orders !",-1),J={class:"text-center"},K={class:"text-center"},X={class:"text-center"},Y={class:"text-center"},Z={class:"text-center"},$={class:"text-center"},ee={class:"text-center"};function te(s,e,m,p,o,c){return r(),u("div",null,[this.saleshistory!=null?(r(),u("div",W,[a(P,{class:"mb-3",modelValue:o.searchQuery,"onUpdate:modelValue":e[0]||(e[0]=t=>o.searchQuery=t),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])])):h("",!0),o.loading?(r(),u("div",E,[a(y,{height:"5",color:"primary",indeterminate:"",class:"custom-loader","full-width":""})])):h("",!0),o.loading2?(r(),u("div",M,[a(y,{height:"5",color:"primary",indeterminate:"",class:"custom-loader","full-width":""})])):h("",!0),this.saleshistory==null?(r(),_(T,{key:3},{default:l(()=>[a(w,{cols:"12"},{default:l(()=>[a(k,{title:"Sales Order View"},{default:l(()=>[a(C,null,{default:l(()=>[a(A,{color:"warning",variant:"tonal",class:"mb-4",border:"top"},{default:l(()=>[a(F,{class:"mb-1"},{default:l(()=>[f(" Are you sure you gave Sales Orders? ")]),_:1}),G]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})):h("",!0),this.saleshistory!=null?(r(),_(Q,{key:4,headers:o.headers,items:c.paginatedItems,class:"table-rounded",height:"500","fixed-header":""},{default:l(()=>[n("thead",null,[n("tr",null,[(r(!0),u(g,null,V(o.headers,t=>(r(),u("th",{class:"text-center",key:t},d(t.text),1))),128))])]),n("tbody",null,[(r(!0),u(g,null,V(this.paginatedItems,(t,i)=>(r(),u("tr",{key:i},[n("td",J,d(t.so_number),1),n("td",K,d(t.created_date),1),n("td",X,[a(B,{color:c.resolveStatusVariant(t.so_status).color,class:"font-weight-medium",size:"small"},{default:l(()=>[f(d(t.so_status),1)]),_:2},1032,["color"])]),n("td",Y,d(t.merchant_name),1),n("td",Z,d(t.merchant_name),1),n("td",$,d(t.total_so_amount),1),n("td",ee,[t.so_status!="Shipped"&&t.so_status!="Delivered"?(r(),_(b,{key:0,icon:"",variant:"text",color:"success",class:"me-2",size:"small"},{default:l(()=>[a(v,{icon:"mdi-invoice-receive-outline",color:"success",size:"30",onClick:S=>c.outputstock(t)},null,8,["onClick"])]),_:2},1024)):h("",!0),t.so_status=="Shipped"||t.so_status=="Delivered"?(r(),_(b,{key:1,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:S=>c.getPDFupdate(t.delivery_challan_file)},{default:l(()=>[a(v,{color:"error",icon:"iwwa:file-pdf",size:"26"})]),_:2},1032,["onClick"])):h("",!0)])]))),128))])]),_:1},8,["headers","items"])):h("",!0),a(H,{modelValue:o.page,"onUpdate:modelValue":e[1]||(e[1]=t=>o.page=t),length:Math.ceil(c.filteredSalesHistory.length/o.pageSize),onInput:c.updatePagination},null,8,["modelValue","length","onInput"])])}const se=x(q,[["render",te]]),ae={components:{Saleshistory:se},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Sales History",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=z(),this.activeTab=I(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function oe(s,e,m,p,o,c){const t=O("Saleshistory");return r(),u("div",null,[a(N,{modelValue:o.activeTab,"onUpdate:modelValue":e[0]||(e[0]=i=>o.activeTab=i),"show-arrows":""},{default:l(()=>[(r(!0),u(g,null,V(o.tabs,i=>(r(),_(j,{key:i.icon,value:i.tab},{default:l(()=>[a(v,{size:"20",start:"",icon:i.icon},null,8,["icon"]),f(" "+d(i.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),a(D),a(R,{modelValue:o.activeTab,"onUpdate:modelValue":e[1]||(e[1]=i=>o.activeTab=i),class:"mt-5 disable-tab-transition",touch:!1},{default:l(()=>[a(U,{value:"account"},{default:l(()=>[a(t)]),_:1})]),_:1},8,["modelValue"])])}const me=x(ae,[["render",oe]]);export{me as default};