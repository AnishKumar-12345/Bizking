import{_ as T,o as r,c as f,g as a,b7 as z,b8 as v,w as l,k as x,l as k,i as _,a4 as N,ac as F,j as S,a as i,F as D,q as w,t as u,b as m,f as p,m as d,u as y,bE as P,bo as H,v as R,e as U,s as G,r as L}from"./index.871767d0.js";import{s as A}from"./Services.d06bbe8b.js";import{V}from"./VForm.33d3da31.js";import{V as C}from"./VAutocomplete.da11b3e2.js";import{V as B}from"./VSelect.dcb7acbd.js";import{V as O}from"./VTextField.aaf29b18.js";import{V as Q}from"./VChip.f2e91746.js";import{V as q}from"./VTable.cd435fce.js";import{V as I}from"./VDialog.e7293739.js";import{V as E}from"./VSnackbar.2c6d9b4a.js";import{V as M}from"./VPagination.6a80a0b8.js";import{V as W,a as Y,b as j,c as J}from"./VWindowItem.db87fc1a.js";import"./VCheckboxBtn.230e21ce.js";const K={mixins:[A],data(){return{filterlocation:!0,today:this.getFormattedDate(new Date),Deliverydata:{so_id:"",shipped_date:"",delivery_person:""},SOid:null,SOid2:null,locationdata:"",cityLoaction:[],snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,selectsales:null,page:1,pageSize:10,loading2:!1,loaded:!1,loading:!1,saleshistory:[],GRNhistory:[],searchQuery:"",deliveryPerson:[],deliverydata:[],dialog:!1,dater:[t=>!!t||"Date is required"],person:[t=>!!t||"Assign Delivery Person is required"],dialog2:!1,cityID:"",locationID:"",headers:[{text:"Sales Order",value:"so_number"},{text:"Order Date",value:"created_date"},{text:"Status",value:"so_status"},{text:"Delivery Person",value:"delivery_person"},{text:"Order From",value:"merchant_name"},{text:"Shipped To",value:"merchant_name"},{text:"Order Value",value:"total_so_amount"},{text:"POD",value:"pod_image"},{text:"Delivery Challan",value:"delivery_challan_file"},{text:"Invoice",value:"invoice_file"},{text:"GRN No",value:"grn_number"},{text:"GRN Image",value:"grn_image"},{text:"Action",value:"actions",sortable:!1}]}},computed:{computedHeaders(){const t=[...this.headers];if(this.selectsales==="Shipped"){const e=t.findIndex(g=>g.value==="pod_image");e!==-1&&t.splice(e,1);const c=t.findIndex(g=>g.value==="actions");c!==-1&&t.splice(c,1)}return t},filteredSalesHistory(){const t=this.searchQuery.toLowerCase().trim();return this.saleshistory.filter(e=>{const c=e.so_number&&e.so_number.toLowerCase().includes(t)||e.created_date&&e.created_date.toLowerCase().includes(t)||e.so_status&&e.so_status.toLowerCase().includes(t)||e.merchant_name&&e.merchant_name.toLowerCase().includes(t)||e.total_so_amount&&e.total_so_amount.toString().includes(t)||e.delivery_person&&e.delivery_person.toLowerCase().includes(t),g=e.so_status==="Delivered"||e.so_status==="Shipped"||e.so_status==="On Hold"||e.so_status==="Cancelled";return c&&g})},paginatedItems(){const t=(this.page-1)*this.pageSize,e=t+this.pageSize;return this.filteredSalesHistory.slice(t,e)},showNoSalesAlert(){return!this.saleshistory.some(t=>t.so_status==="Delivered"||t.so_status==="Shipped"||t.so_status==="On Hold"||t.so_status==="Cancelled")},combinedData(){return{locationdata:this.locationdata,selectsales:this.selectsales}}},watch:{combinedData(t){t.locationdata&&t.selectsales?this.locationdetails():this.getSalesorderdetails()}},mounted(){const t=localStorage.getItem("deliverydetails");if(t)try{this.Deliveryperson=JSON.parse(t),this.deliverydata=this.Deliveryperson.map(e=>({value:e.delivery_person,text:e.name})),Array.isArray(this.Deliveryperson)||(this.Deliveryperson=[])}catch(e){console.error("Error parsing sodetails from localStorage:",e),this.Deliveryperson=[]}this.cityID=localStorage.getItem("city_id"),this.locationID=localStorage.getItem("location_id"),this.cityID!==""&&this.locationID!==""&&(this.filterlocation=!1),this.handleBrandSelection()},methods:{genaratePDFinvoice(t){this.createInvoice(t).then(e=>{window.location.reload(!0)})},handleBrandSelection(){this.getCitylocation(this.cityID).then(t=>{this.cityLoaction=t.data.data.map(e=>({value:e.location_id,text:e.location}))})},locationdetails(){const t={All:"all",Shipped:"4",Delivered:"5",Onhold:"7",Cancelled:"0"};this.selectsales!=="GRN Sales Orders"&&this.locationdata?(this.loading=!0,this.getSalesorders(t[this.selectsales],this.cityID,this.locationdata).then(e=>{console.log("response",e),e.status==1?(this.loading=!1,this.snackbarText=e.message,this.saleshistory=e.data,this.saleshistory.reverse(),this.color="primary",this.snackbar=!0):(this.snackbar=!0,this.color="on-background",this.loading=!1,this.saleshistory=[],this.snackbarText=e.message)})):(this.loading=!0,this.getGRN(this.cityID,this.locationdata).then(e=>{console.log("response",e),e.data.status==1?(this.loading=!1,this.saleshistory=e.data.data,this.saleshistory.reverse(),this.snackbarText=e.data.message,this.color="primary",this.snackbar=!0):(this.snackbar=!0,this.color="on-background",this.loading=!1,this.saleshistory=[],this.snackbarText="Select the status")}))},closeUnhold(){this.dialog2=!1},getFormattedDate(t){const e=t.getFullYear(),c=String(t.getMonth()+1).padStart(2,"0"),g=String(t.getDate()).padStart(2,"0");return`${e}-${c}-${g}`},deleteRow(t){console.log("perk",t.so_id),this.SOid2=t.so_id,this.dialog2=!0},cancelunhold(){console.log("SOid2",this.SOid2),this.CancelUnholddata(this.SOid2).then(t=>{t.data.status==1?(this.dialog2=!1,this.snackbar=!0,this.color="primary",this.snackbarText=t.data.message,this.getSalesorderdetails()):(this.dialog2=!1,this.snackbar=!0,this.color="on-background",this.snackbarText=t.data.message)})},validateForm(){this.$refs.purchaseOrderForm.validate().then(t=>{t.valid==!0?this.updateOnhold():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},updateOnhold(){const t={so_id:this.SOid,shipped_date:this.Deliverydata.shipped_date,delivery_person:this.Deliverydata.delivery_person};console.log("po",t),this.UpdateUnholddata(t).then(e=>{console.log("set",e),e.data.status==1?(this.dialog=!1,this.snackbar=!0,this.color="primary",this.Deliverydata={},this.snackbarText=e.data.message,this.getSalesorderdetails()):(this.dialog=!1,this.snackbar=!0,this.color="on-background",this.Deliverydata={},this.snackbarText=e.data.message)})},closeDialog(){this.dialog=!1,this.Deliverydata={}},editrow(t){console.log("ids",t.so_id),this.Getsalesperson().then(e=>{console.log("getperson",e),e.data.status==1?(this.deliveryPerson=e.data.data.map(c=>({value:c.delivery_person,text:c.name})),this.dialog=!0,this.SOid=t.so_id):(this.deliveryPerson=[],this.dialog=!1)})},updatePagination(t){this.page=t},getImageupdate(t){this.loading2=!0,window.open(t,"_blank"),this.loading2=!1},getPDFinvoice(t){this.loading2=!0,window.open(t,"_blank"),this.loading2=!1},getGRNImage(t){this.loading2=!0,window.open(t,"_blank"),this.loading2=!1},getPDFupdate(t){this.loading2=!0,window.open(t,"_blank"),this.loading2=!1},outputstock(t){this.$router.push({name:"Createwarehouseoutput",query:{so_id:t.so_id}})},resolveStatusVariant(t){return t=="Acknowledged"?{color:"warning"}:t=="On Hold"?{color:"warning"}:t=="Cancelled"?{color:"error"}:{color:"success"}},getSalesorderdetails(){const t={All:"all",Shipped:"4",Delivered:"5",Onhold:"7",Cancelled:"0"};this.cityID!==""&&this.locationID!==""&&this.selectsales!=="GRN Sales Orders"?(this.loading=!0,this.getSalesorders(t[this.selectsales],this.cityID,this.locationID).then(e=>{console.log("response",e),e.status==1?(this.loading=!1,this.snackbarText=e.message,this.color="primary",this.saleshistory=e.data,this.saleshistory.reverse(),this.snackbar=!0):(this.snackbar=!0,this.color="on-background",this.loading=!1,this.saleshistory=[],this.snackbarText=e.message)})):(this.loading=!0,this.getGRN(this.cityID,this.locationID).then(e=>{console.log("response",e),e.data.status==1?(this.loading=!1,this.saleshistory=e.data.data,this.saleshistory.reverse(),this.snackbarText=e.data.message,this.color="primary",this.snackbar=!0):(this.snackbar=!0,this.color="on-background",this.loading=!1,this.snackbarText="Select the status")}))}}},X={key:0,class:"loading-container"},Z={style:{"max-width":"400px"}},$={key:1,id:"app"},ee=P('<div id="loading-bg"><div class="loading-logo"><img src="'+H+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),te=[ee],se={key:0},ae=i("td",{colspan:"16",class:"text-center"},[i("h1",null,"No data found !")],-1),le=[ae],oe={class:"text-center"},ie={class:"text-center"},re={class:"text-center"},ne={class:"text-center"},de={class:"text-center"},ce={class:"text-center"},ue={class:"text-center"},he={class:"text-center"},_e={class:"text-center"},me={class:"text-center"},fe={class:"text-center"},ge={class:"text-center"},ve={class:"text-center"};function pe(t,e,c,g,o,n){return r(),f("div",null,[o.loading2?(r(),f("div",X,[a(z,{height:"5",color:"primary",indeterminate:"",class:"custom-loader","full-width":""})])):v("",!0),a(S,{class:"mb-2"},{default:l(()=>[a(x,null,{default:l(()=>[a(k,null,{default:l(()=>[a(_,{cols:"12"},{default:l(()=>[a(V,{class:"mt-6",ref:"purchaseOrderForm8"},{default:l(()=>[a(k,null,{default:l(()=>[N(a(_,{md:"6",cols:"12"},{default:l(()=>[a(C,{modelValue:o.locationdata,"onUpdate:modelValue":e[0]||(e[0]=s=>o.locationdata=s),label:"Location",items:this.cityLoaction,"item-value":"value","item-title":"text","menu-props":{maxHeight:200}},null,8,["modelValue","items"])]),_:1},512),[[F,o.filterlocation]]),a(_,{md:"6",cols:"12"},{default:l(()=>[a(B,{modelValue:o.selectsales,"onUpdate:modelValue":e[1]||(e[1]=s=>o.selectsales=s),items:["Shipped","Delivered","Onhold","Cancelled","GRN Sales Orders"],label:"Please Select The Status"},null,8,["modelValue"])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),i("div",Z,[a(O,{class:"mb-3",modelValue:o.searchQuery,"onUpdate:modelValue":e[2]||(e[2]=s=>o.searchQuery=s),density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),o.loading?(r(),f("div",$,te)):v("",!0),a(q,{headers:n.computedHeaders,items:n.paginatedItems,class:"table-rounded",height:"500","fixed-header":""},{default:l(()=>[i("thead",null,[i("tr",null,[(r(!0),f(D,null,w(o.headers,s=>(r(),f("th",{class:"text-center",key:s},u(s.text),1))),128))])]),i("tbody",null,[this.saleshistory.length===0?(r(),f("tr",se,le)):v("",!0),(r(!0),f(D,null,w(this.paginatedItems,(s,h)=>(r(),f("tr",{key:h},[i("td",oe,u(s.so_number),1),i("td",ie,u(s.created_date),1),i("td",re,[a(Q,{color:n.resolveStatusVariant(s.so_status).color,class:"font-weight-medium",size:"small"},{default:l(()=>[m(u(s.so_status),1)]),_:2},1032,["color"])]),i("td",ne,u(s.delivery_person),1),i("td",de,u(s.merchant_name),1),i("td",ce,u(s.merchant_name),1),i("td",ue,u(s.total_so_amount),1),i("td",he,[s.so_status=="Delivered"?(r(),p(d,{key:0,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:b=>n.getImageupdate(s.pod_image)},{default:l(()=>[a(y,{color:"success",icon:"ic:twotone-photo-camera-back",size:"26"})]),_:2},1032,["onClick"])):v("",!0)]),i("td",_e,[(s.so_status=="Shipped"||s.so_status=="Delivered"||s.so_status=="On Hold"||s.so_status=="Cancelled")&&o.selectsales!=="GRN Sales Orders"?(r(),p(d,{key:0,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:b=>n.getPDFupdate(s.delivery_challan_file)},{default:l(()=>[a(y,{color:"error",icon:"iwwa:file-pdf",size:"26"})]),_:2},1032,["onClick"])):v("",!0)]),i("td",me,[(s.so_status==="Shipped"||s.so_status==="Delivered"||s.so_status==="On Hold"||s.so_status==="Cancelled")&&s.invoice_file!==""?(r(),p(d,{key:0,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:b=>n.getPDFinvoice(s.invoice_file)},{default:l(()=>[a(y,{color:"error",icon:"iwwa:file-pdf",size:"26"})]),_:2},1032,["onClick"])):(r(),p(d,{key:1,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small"},{default:l(()=>[a(y,{left:"",color:"error",icon:"wpf:create-new",size:"26",onClick:b=>n.genaratePDFinvoice(s.so_id)},null,8,["onClick"])]),_:2},1024))]),i("td",fe,u(s.grn_number),1),i("td",ge,[o.selectsales=="GRN Sales Orders"?(r(),p(d,{key:0,icon:"",variant:"text",color:"default",class:"me-2",size:"x-small",onClick:b=>n.getGRNImage(s.grn_image)},{default:l(()=>[a(y,{color:"success",icon:"ic:twotone-photo-camera-back",size:"26"})]),_:2},1032,["onClick"])):v("",!0)]),i("td",ve,[s.so_status!="Shipped"&&s.so_status!="Delivered"&&s.so_status!="On Hold"&&s.so_status!="Cancelled"?(r(),p(d,{key:0,icon:"",variant:"text",color:"success",class:"me-2",size:"small"},{default:l(()=>[a(y,{icon:"mdi-invoice-receive-outline",color:"success",size:"30",onClick:b=>n.outputstock(s)},null,8,["onClick"])]),_:2},1024)):v("",!0),s.so_status=="On Hold"?(r(),p(d,{key:1,icon:"",variant:"text",color:"error",class:"me-2",size:"x-small"},{default:l(()=>[a(y,{icon:"ri-pencil-line",size:"30",color:"primary",onClick:b=>n.editrow(s)},null,8,["onClick"])]),_:2},1024)):v("",!0),s.so_status=="On Hold"?(r(),p(d,{key:2,icon:"",variant:"text",color:"error",class:"me-2",size:"x-small"},{default:l(()=>[a(y,{icon:"material-symbols:cancel-outline",size:"30",color:"error",onClick:b=>n.deleteRow(s)},null,8,["onClick"])]),_:2},1024)):v("",!0)])]))),128))])]),_:1},8,["headers","items"]),a(I,{modelValue:o.dialog,"onUpdate:modelValue":e[6]||(e[6]=s=>o.dialog=s),"max-width":"400",persistent:""},{default:l(()=>[a(S,{title:"Assign Delivery Person",class:"mb-2"},{default:l(()=>[a(x,null,{default:l(()=>[a(k,null,{default:l(()=>[a(_,{cols:"12"},{default:l(()=>[a(V,{class:"mt-4",ref:"purchaseOrderForm"},{default:l(()=>[a(k,null,{default:l(()=>[a(_,{md:"12",cols:"12"},{default:l(()=>[a(C,{modelValue:o.Deliverydata.delivery_person,"onUpdate:modelValue":e[3]||(e[3]=s=>o.Deliverydata.delivery_person=s),items:this.deliverydata,"item-value":"value","item-title":"text",label:"Assign Delivery Person",rules:o.person,"menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),a(_,{md:"12",cols:"12"},{default:l(()=>[a(O,{modelValue:o.Deliverydata.shipped_date,"onUpdate:modelValue":e[4]||(e[4]=s=>o.Deliverydata.shipped_date=s),type:"date",label:"Start Date",min:o.today,rules:o.dater},null,8,["modelValue","min","rules"])]),_:1}),a(_,{md:"12",cols:"12"},{default:l(()=>[a(d,{onClick:n.validateForm},{default:l(()=>[m("Save")]),_:1},8,["onClick"]),m(" \xA0 "),a(d,{color:"secondary",variant:"tonal",onClick:e[5]||(e[5]=s=>n.closeDialog())},{default:l(()=>[m(" Close ")]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(I,{modelValue:o.dialog2,"onUpdate:modelValue":e[7]||(e[7]=s=>o.dialog2=s),"max-width":"400",persistent:""},{default:l(()=>[a(S,{title:"Cancel Onhold",class:"mb-2"},{default:l(()=>[a(x,null,{default:l(()=>[a(k,null,{default:l(()=>[a(_,{cols:"12"},{default:l(()=>[a(V,{class:"mt-4",ref:"purchaseOrderForm2"},{default:l(()=>[a(k,null,{default:l(()=>[a(_,{md:"12",cols:"12"},{default:l(()=>[m(" Are you sure want to cancel the Onhold Sales Order ? ")]),_:1}),a(_,{md:"12",cols:"12"},{default:l(()=>[a(d,{onClick:n.cancelunhold},{default:l(()=>[m("Yes")]),_:1},8,["onClick"]),m(" \xA0 "),a(d,{color:"secondary",variant:"tonal",onClick:n.closeUnhold},{default:l(()=>[m(" No ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),a(E,{modelValue:o.snackbar,"onUpdate:modelValue":e[8]||(e[8]=s=>o.snackbar=s),timeout:2e3,color:o.color},{default:l(()=>[m(u(o.snackbarText),1)]),_:1},8,["modelValue","color"]),a(M,{modelValue:o.page,"onUpdate:modelValue":e[9]||(e[9]=s=>o.page=s),length:Math.ceil(n.filteredSalesHistory.length/o.pageSize),onInput:n.updatePagination},null,8,["modelValue","length","onInput"])])}const ye=T(K,[["render",pe]]),be={components:{Saleshistory:ye},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Sales History",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=R(),this.activeTab=U(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function ke(t,e,c,g,o,n){const s=L("Saleshistory");return r(),f("div",null,[a(W,{modelValue:o.activeTab,"onUpdate:modelValue":e[0]||(e[0]=h=>o.activeTab=h),"show-arrows":""},{default:l(()=>[(r(!0),f(D,null,w(o.tabs,h=>(r(),p(J,{key:h.icon,value:h.tab},{default:l(()=>[a(y,{size:"20",start:"",icon:h.icon},null,8,["icon"]),m(" "+u(h.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),a(G),a(j,{modelValue:o.activeTab,"onUpdate:modelValue":e[1]||(e[1]=h=>o.activeTab=h),class:"mt-5 disable-tab-transition",touch:!1},{default:l(()=>[a(Y,{value:"account"},{default:l(()=>[a(s)]),_:1})]),_:1},8,["modelValue"])])}const He=T(be,[["render",ke]]);export{He as default};
