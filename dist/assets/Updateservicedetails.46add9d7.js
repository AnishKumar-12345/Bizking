import{_ as c,o as r,c as i,g as s,w as o,a as u,F as d,q as m,t as p,v,e as h,s as g,r as x,f as V,u as T,b as k}from"./index.208ee2c9.js";import{s as y}from"./Services.8f842359.js";import{V as q}from"./VTable.762c7446.js";import{V as N,a as U,b as w,c as B}from"./VWindowItem.14b0b4aa.js";import"./index.2bd8ddc8.js";const S={mixins:[y],data(){return{maxPaginationPages:5,storerules:[e=>!!e||"Store Address is required"],mrprules:[e=>!!e||"MRP is required"],namerules:[e=>!!e||"Name is required"],uomRules:[e=>!!e||"UOM is required"],pinrules:[e=>!!e||"PIN is required"],phonerules:[e=>!!e||" Mobile  is required",e=>/^[0-9]+$/.test(e)||"only number are accepted",e=>e&&e.length<=10&&e.length>=10||"Mobile must be  10 number"],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,dialog:!1,loading:!0,searchQuery:"",page:1,pageSize:10,products:[],saveProduct:{merchant_uid:"",brand_name:"",sku_name:"",uom:"",hsn_code:"",mrp:"",status:"",brand_id:"",brand_product_id:"",total_given_margin:"",sgst:"",cgst:"",pitch_from:"",final_retail_cp:"",final_ret:"",bk_profit:"",bizkingz_cp_final:"",bc_margin_amt:"",bc_margin:""},salesdata:[],BrandNames:[],selectedBrand:null,userRole:"",createdby:"",headers:[{text:"Lead",value:"brand_name"},{text:"Type",value:"sku_name"},{text:"Store Name",value:"uom"},{text:"Address",value:"hsn_code"},{text:"Location",value:"mrp"},{text:"Status",value:"status"},{text:"Action",value:"actions"}]}}};function P(e,n,_,b,t,f){return r(),i("div",null,[s(q,{headers:t.headers,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:o(()=>[u("thead",null,[u("tr",null,[(r(!0),i(d,null,m(t.headers,l=>(r(),i("th",{class:"text-center",key:l},p(l.text),1))),128))])])]),_:1},8,["headers"])])}const z=c(S,[["render",P]]),A={components:{Updateservice:z},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Add Service",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=v(),this.activeTab=h(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function M(e,n,_,b,t,f){const l=x("Updateservice");return r(),i("div",null,[s(N,{modelValue:t.activeTab,"onUpdate:modelValue":n[0]||(n[0]=a=>t.activeTab=a),"show-arrows":""},{default:o(()=>[(r(!0),i(d,null,m(t.tabs,a=>(r(),V(B,{key:a.icon,value:a.tab},{default:o(()=>[s(T,{size:"20",start:"",icon:a.icon},null,8,["icon"]),k(" "+p(a.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),s(g),s(w,{modelValue:t.activeTab,"onUpdate:modelValue":n[1]||(n[1]=a=>t.activeTab=a),class:"mt-5 disable-tab-transition",touch:!1},{default:o(()=>[s(U,{value:"account"},{default:o(()=>[s(l)]),_:1})]),_:1},8,["modelValue"])])}const D=c(A,[["render",M]]);export{D as default};