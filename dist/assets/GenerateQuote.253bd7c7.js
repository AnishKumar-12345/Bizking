import{s as p}from"./Services.46164876.js";import{_ as f,o,c as l,b6 as x,a as s,g as d,w as b,F as m,q as h,t as i,bD as V,bn as v}from"./index.d9ab8f17.js";import{V as _}from"./VTextField.d22e7bb8.js";import{V as k}from"./VCheckbox.e2300af3.js";import{V as y}from"./VTable.819c9359.js";import{V as P}from"./VPagination.e10920c0.js";const q={mixins:[p],data(){return{quotesdata:[],maxPaginationPages:5,storerules:[e=>!!e||"Store Address is required"],mrprules:[e=>!!e||"MRP is required"],namerules:[e=>!!e||"Name is required"],uomRules:[e=>!!e||"UOM is required"],pinrules:[e=>!!e||"PIN is required"],phonerules:[e=>!!e||" Mobile  is required",e=>/^[0-9]+$/.test(e)||"only number are accepted",e=>e&&e.length<=10&&e.length>=10||"Mobile must be  10 number"],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,dialog:!1,loading:!0,searchQuery:"",page:1,pageSize:10,products:[],saveProduct:{merchant_uid:"",brand_name:"",sku_name:"",uom:"",hsn_code:"",mrp:"",status:"",brand_id:"",brand_product_id:"",total_given_margin:"",sgst:"",cgst:"",pitch_from:"",final_retail_cp:"",final_ret:"",bk_profit:"",bizkingz_cp_final:"",bc_margin_amt:"",bc_margin:""},salesdata:[],BrandNames:[],selectedBrand:null,userRole:"",createdby:"",loading:!0,headers:[{text:"Select",value:"actions"},{text:"Brand Name",value:"brand_name"},{text:"Product Name",value:"sku_name"},{text:"UOM",value:"uom"},{text:"Final Retails",value:"final_ret"},{text:"Pitch From",value:"pitch_from"},{text:"Margin",value:"inputs"}]}},computed:{marginrules(){},filteredProducts(){const e=this.searchQuery.toLowerCase().trim();return this.quotesdata.filter(a=>a.brand_name&&a.brand_name.toLowerCase().includes(e)||a.sku_name&&a.sku_name.toLowerCase().includes(e)||a.uom&&a.uom.toLowerCase().includes(e))},paginatedItems(){const e=(this.page-1)*this.pageSize,a=e+this.pageSize;return this.filteredProducts.slice(e,a)}},mounted(){this.getQuotesdata().then(()=>{this.loading=!1}).catch(e=>{console.error("Error fetching merchants:",e)})},methods:{updatePagination(e){this.page=e},getQuotesdata(){return new Promise((e,a)=>{this.Quotesdata().then(n=>{console.log("check",n),this.quotesdata=n.data.data,this.quotesdata.reverse(),e()}).catch(n=>{console.error("Error fetching merchants:",n),a(n)})})}}},w={key:0,id:"app"},N=V('<div id="loading-bg"><div class="loading-logo"><img src="'+v+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),Q=[N],S={style:{"max-width":"400px"}},C={class:"text-center"},U={class:"text-center"},I={class:"text-center"},M={class:"text-center"},z={class:"text-center"},B={class:"text-center"},L={class:"text-center"};function F(e,a,n,R,r,u){return o(),l("div",null,[r.loading?(o(),l("div",w,Q)):x("",!0),s("div",S,[d(_,{class:"mb-3",modelValue:r.searchQuery,"onUpdate:modelValue":a[0]||(a[0]=t=>r.searchQuery=t),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),d(y,{headers:r.headers,items:e.oppitems,"item-key":"brand_name",class:"table-rounded",height:"500","fixed-header":""},{default:b(()=>[s("thead",null,[s("tr",null,[(o(!0),l(m,null,h(r.headers,t=>(o(),l("th",{class:"text-center",key:t},i(t.text),1))),128))])]),s("tbody",null,[(o(!0),l(m,null,h(u.paginatedItems,(t,g)=>(o(),l("tr",{key:g},[s("td",C,[d(k,{modelValue:t.selected,"onUpdate:modelValue":c=>t.selected=c,color:"primary"},null,8,["modelValue","onUpdate:modelValue"])]),s("td",U,i(t.brand_name),1),s("td",I,i(t.sku_name),1),s("td",M,i(t.uom),1),s("td",z,i(t.final_ret),1),s("td",B,i(t.pitch_from),1),s("td",L,[d(_,{modelValue:t.inputs,"onUpdate:modelValue":c=>t.inputs=c,rules:u.marginrules},null,8,["modelValue","onUpdate:modelValue","rules"])])]))),128))])]),_:1},8,["headers","items"]),d(P,{modelValue:r.page,"onUpdate:modelValue":a[1]||(a[1]=t=>r.page=t),length:Math.ceil(u.filteredProducts.length/r.pageSize),onInput:u.updatePagination,max:r.maxPaginationPages},null,8,["modelValue","length","onInput","max"])])}const j=f(q,[["render",F]]);export{j as G};
