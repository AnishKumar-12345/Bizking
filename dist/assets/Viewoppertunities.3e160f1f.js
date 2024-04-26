import{_ as y,o as l,c as d,f as h,w as i,g as o,i as x,j as V,k as w,b as f,l as C,b7 as _,a,F as g,q as m,t as n,m as P,u as b,bE as k,bo as T,v as L,e as S,s as z,r as N}from"./index.c6e55d50.js";import{s as O}from"./Services.7c8f92fc.js";import{V as I,a as B}from"./VAlert.65989a9a.js";import{V as q}from"./VTextField.a33c464e.js";import{V as A}from"./VChip.7976f28d.js";import{V as Q}from"./VTable.b8e8adce.js";import{V as M}from"./VPagination.501d14dc.js";import{V as R,a as U,b as D,c as E}from"./VWindowItem.42eb66e9.js";const F={mixins:[O],data(){return{page:1,pageSize:10,loading:!0,searchQuery:"",maxPaginationPages:5,storerules:[e=>!!e||"Store Address is required"],mrprules:[e=>!!e||"MRP is required"],namerules:[e=>!!e||"Name is required"],uomRules:[e=>!!e||"UOM is required"],pinrules:[e=>!!e||"PIN is required"],phonerules:[e=>!!e||" Mobile  is required",e=>/^[0-9]+$/.test(e)||"only number are accepted",e=>e&&e.length<=10&&e.length>=10||"Mobile must be  10 number"],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,dialog:!1,loading:!0,searchQuery:"",page:1,pageSize:10,products:[],saveProduct:{merchant_uid:"",brand_name:"",sku_name:"",uom:"",hsn_code:"",mrp:"",status:"",brand_id:"",brand_product_id:"",total_given_margin:"",sgst:"",cgst:"",pitch_from:"",final_retail_cp:"",final_ret:"",bk_profit:"",bizkingz_cp_final:"",bc_margin_amt:"",bc_margin:""},selectedBrand:null,userRole:"",createdby:"",userid:"",leadData:[],opportunity:[],headers:[{text:"Type",value:"lead_type"},{text:"Created By",value:"created_by"},{text:"Decision Authority",value:"decision_authority"},{text:"Name",value:"name"},{text:"Address",value:"address"},{text:"Status",value:"status"},{text:"GST",value:"gst"},{text:"Owner Name",value:"owner_name"},{text:"Owner Phone",value:"owner_phone"},{text:"Poc Name",value:"poc_name"},{text:"Poc Phone",value:"poc_phone"},{text:"PinCode",value:"pincode"},{text:"Action",value:"actions"}]}},computed:{filteredProducts(){const e=this.searchQuery.toLowerCase().trim();return this.opportunity.filter(t=>t.lead_type&&t.lead_type.toLowerCase().includes(e)||t.name&&t.name.toLowerCase().includes(e)||t.address&&t.address.toLowerCase().includes(e)||t.created_by&&t.created_by.toLowerCase().includes(e)||t.location&&t.location.toLowerCase().includes(e)||t.status&&t.status.toLowerCase().includes(e)||t.gst&&t.gst.toLowerCase().includes(e)||t.owner_name&&t.owner_name.toLowerCase().includes(e)||t.owner_phone&&t.owner_phone.toLowerCase().includes(e)||t.poc_name&&t.poc_name.toLowerCase().includes(e)||t.poc_phone&&t.poc_phone.toString().includes(e)||t.pincode&&t.pincode.toLowerCase().includes(e)||t.decision_authority&&t.decision_authority.toLowerCase().includes(e))},paginatedItems(){const e=(this.page-1)*this.pageSize,t=e+this.pageSize;return this.filteredProducts.slice(e,t)}},mounted(){this.getOpportunitiesdata().then(()=>{this.loading=!1}).catch(e=>{console.error("Error fetching merchants:",e)})},methods:{resolveStatusVariant(e){return e=="Partially interested"||e=="partially interested"?{color:"warning"}:e=="Closed"||e=="closed"?{color:"success"}:e=="Created"||e=="created"?{color:"primary"}:{color:"error"}},updatePagination(e){this.page=e},getOpportunitiesdata(){return new Promise((e,t)=>{this.getOppertunities().then(p=>{this.opportunity=p.data.data,this.opportunity.reverse(),e()}).catch(p=>{console.error("Error fetching merchants:",p),t(p)})})},editProduct(e){this.$store.commit("setSelectedItem",e),console.log("check id",e),this.$router.push({name:"Oppertunitybasicdataview",query:{opportunity_id:e.opportunity_id}})}}},W=a("p",{class:"mb-0"}," The system is not retrieving the Opportunity. Please ensure that you have applied for Opportunity !",-1),j={key:1,style:{"max-width":"400px"}},G={key:2,id:"app"},H=k('<div id="loading-bg"><div class="loading-logo"><img src="'+T+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),J=[H],K={key:0},X=a("td",{colspan:"16",class:"text-center"},[a("h1",null,"No data found !")],-1),Y=[X],Z={class:"text-center"},$={class:"text-center"},ee={class:"text-center"},te={class:"text-center"},se={class:"text-center"},ae={class:"text-center"},oe={class:"text-center"},re={class:"text-center"},ne={class:"text-center"},le={class:"text-center"},ie={class:"text-center"},ce={class:"text-center"},de={class:"text-center"};function ue(e,t,p,v,r,u){return l(),d("div",null,[this.opportunity==null?(l(),h(C,{key:0},{default:i(()=>[o(x,{cols:"12"},{default:i(()=>[o(V,{title:"Lead View"},{default:i(()=>[o(w,null,{default:i(()=>[o(I,{color:"warning",variant:"tonal",class:"mb-4",border:"top"},{default:i(()=>[o(B,{class:"mb-1"},{default:i(()=>[f(" Are you sure you gave Opportunity? ")]),_:1}),W]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})):_("",!0),this.opportunity!=null?(l(),d("div",j,[o(q,{class:"mb-3",modelValue:r.searchQuery,"onUpdate:modelValue":t[0]||(t[0]=s=>r.searchQuery=s),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])])):_("",!0),r.loading?(l(),d("div",G,J)):_("",!0),this.opportunity!=null?(l(),h(Q,{key:3,headers:r.headers,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:i(()=>[a("thead",null,[a("tr",null,[(l(!0),d(g,null,m(r.headers,s=>(l(),d("th",{class:"text-center",key:s},n(s.text),1))),128))])]),a("tbody",null,[u.filteredProducts.length===0?(l(),d("tr",K,Y)):_("",!0),(l(!0),d(g,null,m(u.paginatedItems,(s,c)=>(l(),d("tr",{key:c},[a("td",Z,n(s.lead_type),1),a("td",$,n(s.created_by),1),a("td",ee,n(s.decision_authority),1),a("td",te,n(s.name),1),a("td",se,n(s.address),1),a("td",ae,[o(A,{color:u.resolveStatusVariant(s.status).color,class:"font-weight-medium",size:"small"},{default:i(()=>[f(n(s.status),1)]),_:2},1032,["color"])]),a("td",oe,n(s.gst),1),a("td",re,n(s.owner_name),1),a("td",ne,n(s.owner_phone),1),a("td",le,n(s.poc_name),1),a("td",ie,n(s.poc_phone),1),a("td",ce,n(s.pincode),1),a("td",de,[o(P,{icon:"",variant:"text",color:"default",class:"mb-1 mt-2",size:"x-small",onClick:fe=>u.editProduct(s)},{default:i(()=>[o(b,{icon:"ri-pencil-line",size:"22",color:"#BA8B32"})]),_:2},1032,["onClick"])])]))),128))])]),_:1},8,["headers"])):_("",!0),o(M,{modelValue:r.page,"onUpdate:modelValue":t[1]||(t[1]=s=>r.page=s),length:Math.ceil(u.filteredProducts.length/r.pageSize),onInput:u.updatePagination,max:r.maxPaginationPages},null,8,["modelValue","length","onInput","max"])])}const pe=y(F,[["render",ue]]),_e={components:{Viewoppertunity:pe},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Opportunity",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=L(),this.activeTab=S(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function he(e,t,p,v,r,u){const s=N("Viewoppertunity");return l(),d("div",null,[o(R,{modelValue:r.activeTab,"onUpdate:modelValue":t[0]||(t[0]=c=>r.activeTab=c),"show-arrows":""},{default:i(()=>[(l(!0),d(g,null,m(r.tabs,c=>(l(),h(E,{key:c.icon,value:c.tab},{default:i(()=>[o(b,{size:"20",start:"",icon:c.icon},null,8,["icon"]),f(" "+n(c.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),o(z),o(D,{modelValue:r.activeTab,"onUpdate:modelValue":t[1]||(t[1]=c=>r.activeTab=c),class:"mt-5 disable-tab-transition",touch:!1},{default:i(()=>[o(U,{value:"account"},{default:i(()=>[o(s)]),_:1})]),_:1},8,["modelValue"])])}const Ce=y(_e,[["render",he]]);export{Ce as default};
