import{_ as k,o as d,c as i,g as a,b7 as M,b8 as w,w as l,i as p,j as y,k as T,l as b,s as x,a as o,F as g,q as f,t as m,m as I,b as _,a5 as S,b9 as C,ac as P,v as U,e as D,r as F,f as N,u as A}from"./index.08705643.js";import{s as B}from"./Services.f9e4372b.js";import{V as L}from"./VForm.eec84c64.js";import{V as z}from"./VAutocomplete.457394fd.js";import{V}from"./VTextField.0584a3e6.js";import{V as Q}from"./VTable.eda8fa83.js";import{V as R}from"./VCheckbox.472fa542.js";import{V as E}from"./VPagination.f3ba474e.js";import{V as W}from"./VSnackbar.89c018e7.js";import{V as q,a as O,b as G,c as j}from"./VWindowItem.2d182e11.js";import"./VCounter.d136124c.js";import"./VSelect.00b3ff1f.js";import"./VCheckboxBtn.770726d6.js";import"./VChip.cd0ade04.js";const H={mixins:[B],components:{},data(){return{selectedItems:[],postMerchant:{merchant_id:"",products:[{brand_product_id:"",margin:"",created_date:"",updated_date:"",status:"",selling_price:"",brand_id:""}]},marginrules:[t=>!!t||"Margin is required"],selectedMerchantId:"",selectAll:!1,loading:!0,searchQuery:"",page:1,pageSize:10,snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,isProgress:!1,marchantstocksdata:[],selectedmerchants:null,merchantName:[],stockUpdatedate:null,merchantBrand:[],cityID:null,headers:[{text:"Brand Name",value:"brand_name"},{text:"SKU",value:"sku_name"},{text:"UOM",value:"uom"},{text:"MRP",value:"mrp"},{text:"Margin",value:"margin"}]}},computed:{filteredMerchant(){const t=this.searchQuery.toLowerCase().trim();return this.marchantstocksdata.filter(e=>e.brand_name&&e.brand_name.toLowerCase().includes(t)||e.sku_name&&e.sku_name.toLowerCase().includes(t)||e.uom&&e.uom.toLowerCase().includes(t)||e.mrp&&e.mrp.toLowerCase().includes(t)||e.margin&&e.margin.toLowerCase().includes(t))},paginatedItems(){const t=(this.page-1)*this.pageSize,e=t+this.pageSize;return this.filteredMerchant.slice(t,e)},merchants(){return this.merchantName.map(t=>t.merchant_uid)},allFilteredItems(){return this.filteredMerchant}},mounted(){this.cityID=localStorage.getItem("city_id"),this.getMerchantdetails(),setTimeout(()=>{this.loading=!1},6e3)},methods:{computedmarginRules(){const t=e=>/^(0|([1-9]\d*))(?:\.\d+)?%$/.test(String(e));return[e=>!!e||"Margin is required",e=>e.startsWith("0%")?e==="0%"||"Give numerical value with percentage ":t(e)||"Give numerical value with percentage "]},updatemargin(t){t==="0%"||t==="0"?this.Addbrand.total_given_margin="0%":t.startsWith("0%")?t="0%":t=t},validateForm(){this.$refs.purchaseOrderForm.validate().then(t=>{t.valid==!0?this.saveMerchants():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},saveMerchants(){const t=this.marchantstocksdata.filter(n=>n.selected).map(n=>({brand_product_id:n.brand_product_id,margin:`${n.margin}`,created_date:"",updated_date:"",status:"",selling_price:"",brand_id:n.brand_id})),e={merchant_id:this.selectedMerchantId,products:t};console.log("check brand da",e),this.isProgress=!0,this.postmerchantbrandproducts(e).then(n=>{this.isProgress=!1,console.log("Saved items:",n),n.data.status==1?(this.snackbarText=n.data.message,this.color="primary",this.snackbar=!0,setTimeout(()=>{window.location.reload(!0)},1300)):(this.isProgress=!0,this.snackbarText=n.data.message,this.color="on-background",this.snackbar=!0)}).catch(n=>{console.error("Error saving items:",n),this.snackbarText="Error saving items.",this.color="error",this.snackbar=!0})},handleMerchantSelection(){console.log("Selected Merchant:",this.selectedmerchants);const t=this.merchantName.find(e=>e.merchant_uid===this.selectedmerchants);console.log("Selected Brand Details:",t),t&&(this.selectedMerchantId=t.merchant_id,this.locationdata=t.location_id,console.log("Selected Merchant ID:",this.selectedMerchantId,this.locationdata),this.getmerchantbrandproducts(this.selectedMerchantId,this.locationdata).then(e=>{console.log("Merchant Products:",e),e.data.status==1?(this.snackbarText=e.data.message,this.color="success",this.marchantstocksdata=e.data.data.map(n=>({...n,selected:n.checked==="checked"})),console.log("Merchant Products:",this.marchantstocksdata)):(this.marchantstocksdata=[],this.snackbar=!0,this.snackbarText=e.data.message,this.color="on-background")}).catch(e=>{console.error("Error fetching merchant products:",e)}))},getMerchantdetails(){this.getMerchants(this.cityID).then(t=>{this.merchantName=t.data.data})}}},K={key:0,class:"loading-container"},J={style:{"max-width":"400px"}},X=o("th",{class:"text-center"},null,-1),Y={class:"text-center"},Z={class:"text-center"},$={class:"text-center"},ee={class:"text-center"},te={class:"text-center"},ae={class:"text-center"};function se(t,e,n,v,r,u){return d(),i("div",null,[r.loading?(d(),i("div",K,[a(M,{height:"5",color:"primary",indeterminate:"",class:"custom-loader","full-width":""})])):w("",!0),a(b,null,{default:l(()=>[a(p,{cols:"12"},{default:l(()=>[a(y,{title:"Merchant vs Products Mapping",class:"mb-4"},{default:l(()=>[a(T,null,{default:l(()=>[a(L,{class:"mt-6",ref:"purchaseOrderForm"},{default:l(()=>[a(b,null,{default:l(()=>[a(p,{md:"6",cols:"12"},{default:l(()=>[a(z,{modelValue:r.selectedmerchants,"onUpdate:modelValue":[e[0]||(e[0]=s=>r.selectedmerchants=s),u.handleMerchantSelection],label:"Store or Merchant",items:u.merchants,"menu-props":{maxHeight:200}},null,8,["modelValue","items","onUpdate:modelValue"])]),_:1}),a(x),a(p,{cols:"12"},{default:l(()=>[o("div",J,[a(V,{class:"mb-3",modelValue:r.searchQuery,"onUpdate:modelValue":e[1]||(e[1]=s=>r.searchQuery=s),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),a(Q,{headers:r.headers,items:this.paginatedItems},{default:l(()=>[o("thead",null,[o("tr",null,[X,(d(!0),i(g,null,f(r.headers,s=>(d(),i("th",{class:"text-center",key:s},m(s.text),1))),128))])]),o("tbody",null,[(d(!0),i(g,null,f(this.paginatedItems,(s,c)=>(d(),i("tr",{key:c},[o("td",Y,[a(R,{modelValue:s.selected,"onUpdate:modelValue":h=>s.selected=h},null,8,["modelValue","onUpdate:modelValue"])]),o("td",Z,m(s.brand_name),1),o("td",$,m(s.sku_name),1),o("td",ee,m(s.uom),1),o("td",te," \u20B9"+m(s.mrp),1),o("td",ae,[a(V,{modelValue:s.margin,"onUpdate:modelValue":h=>s.margin=h,style:{"min-width":"80px"},rules:u.computedmarginRules(),onInput:e[2]||(e[2]=h=>u.updatemargin())},null,8,["modelValue","onUpdate:modelValue","rules"])])]))),128))])]),_:1},8,["headers","items"]),a(E,{modelValue:r.page,"onUpdate:modelValue":e[3]||(e[3]=s=>r.page=s),length:Math.ceil(u.filteredMerchant.length/r.pageSize),onInput:t.updatePagination},null,8,["modelValue","length","onInput"])]),_:1}),a(p,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:l(()=>[a(I,{onClick:e[4]||(e[4]=s=>u.validateForm())},{default:l(()=>[_("Save")]),_:1}),S(a(C,{size:50,color:"primary",indeterminate:""},null,512),[[P,r.isProgress]])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),a(W,{modelValue:r.snackbar,"onUpdate:modelValue":e[5]||(e[5]=s=>r.snackbar=s),timeout:3500,color:r.color},{default:l(()=>[_(m(r.snackbarText),1)]),_:1},8,["modelValue","color"])])}const re=k(H,[["render",se]]),ne={components:{Addmerchant:re},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Add Merchant Products",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=U(),this.activeTab=D(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function le(t,e,n,v,r,u){const s=F("Addmerchant");return d(),i("div",null,[a(O,{modelValue:r.activeTab,"onUpdate:modelValue":e[0]||(e[0]=c=>r.activeTab=c),"show-arrows":""},{default:l(()=>[(d(!0),i(g,null,f(r.tabs,c=>(d(),N(q,{key:c.icon,value:c.tab},{default:l(()=>[a(A,{size:"20",start:"",icon:c.icon},null,8,["icon"]),_(" "+m(c.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),a(x),a(j,{modelValue:r.activeTab,"onUpdate:modelValue":e[1]||(e[1]=c=>r.activeTab=c),class:"mt-5 disable-tab-transition",touch:!1},{default:l(()=>[a(G,{value:"account"},{default:l(()=>[a(s)]),_:1})]),_:1},8,["modelValue"])])}const xe=k(ne,[["render",le]]);export{xe as default};