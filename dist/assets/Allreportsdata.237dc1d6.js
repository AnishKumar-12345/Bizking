import{_ as U,o as d,c as S,g as e,b5 as T,b6 as p,w as a,i,j as _,k as V,m as f,b as u,bc as D,a as h,l as g,f as b,s as k,a4 as x,bd as w,ac as y,t as R,be as A,bf as P,v as N,e as O,F as L,q as B,r as j,u as z}from"./index.208ee2c9.js";import{s as E}from"./Services.8f842359.js";import{V as C}from"./VForm.c8f9c8bb.js";import{V as I}from"./VAutocomplete.9104bd84.js";import{V as v}from"./VTextField.d4b3ce95.js";import{V as F}from"./VSelect.55921e49.js";import{V as M}from"./VDialog.db8ca400.js";import{V as q}from"./VSnackbar.e4cebd30.js";import{V as G,a as Y,b as H,c as K}from"./VWindowItem.14b0b4aa.js";import"./index.2bd8ddc8.js";import"./VCheckboxBtn.1ac99ac6.js";import"./VChip.216c27c4.js";const W={mixins:[E],components:{},data(){return{selectSales:null,snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,isProgress:!1,isProgress2:!1,loading:!0,dialog2:!1,dialog3:!1,selectdatepicker:null,merchantName:[],reportsMerchant:[],selectAll:!1,selectedmerchants:null,salesRules:[s=>!!s||"Sales is required"],storeMerchant:[s=>!!s||"Store & Merchant is required"],selectDate:[s=>!!s||"Select Date is required"],reportsdata:{merchant_id:"",date_filter:"",start_date:"",end_date:""},today:this.getFormattedDate(new Date),todays:this.getFormattedDates(new Date),maxDate:this.getFormattedDate(new Date),minDate:"1900-01-01",maxDate1:this.getFormattedDate(new Date),minDate1:"1900-01-01",jsonfields:[{label:"Closing",field:"Closing"},{label:"Date",field:"Date"},{label:"Merchant Name",field:"Merchant Name"},{label:"Merchant UID",field:"Merchant UID"},{label:"Opening",field:"Opening"},{label:"Physical SOH",field:"Physical SOH"},{label:"SA Name",field:"SA Name"},{label:"SKU Name",field:"SKU Name"},{label:"Sale",field:"Sale"}]}},watch:{"reportsdata.start_date":function(s){this.maxDate=s||this.getFormattedDate(new Date)}},computed:{},mounted(){this.getMerchantdetails(),setTimeout(()=>{this.loading=!1},3e3)},methods:{validateForm1(){this.$refs.purchaseOrderForm1.validate().then(s=>{s.valid==!0?this.getReport():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},validateForm2(){this.$refs.purchaseOrderForm2.validate().then(s=>{s.valid==!0?this.getSales():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},openSales(){this.dialog3=!0},closeSales(){this.dialog3=!1,this.selectSales=null},getFormattedDates(s){const t=s.getFullYear(),n=String(s.getMonth()+1).padStart(2,"0"),o=String(s.getDate()).padStart(2,"0");return`${t}-${n}-${o}`},closereport(){this.dialog2=!1,this.reportsdata={},this.selectedmerchants=""},selectAllMerchants(){this.selectAll?this.selectedmerchants=["all",...this.merchantName.map(s=>s.value)]:this.selectedmerchants=[]},getFormattedDate(s){const t=s.getFullYear(),n=String(s.getMonth()+1).padStart(2,"0"),o=String(s.getDate()).padStart(2,"0");return`${t}-${n}-${o}`},downloadExcel(){console.log("download excel")},getSales(){this.selectSales==="All"?this.selectSales="all":this.selectSales==="Acknowledged"?this.selectSales="3":this.selectSales==="Shipped"?this.selectSales="4":this.selectSales==="Delivered"&&(this.selectSales="5"),console.log("check ",this.selectSales),this.isProgress2=!0,this.salesstocksreport(this.selectSales).then(s=>{if(console.log("check the response",s),s.data.status==0)this.isProgress2=!1,this.dialog3=!1,this.selectSales=null,this.snackbar=!0,this.color="on-background",this.snackbarText=s.data.message;else{this.isProgress2=!1,this.dialog3=!1,this.selectSales=null;const t=new Blob([s.data],{type:"text/csv"}),n=window.URL.createObjectURL(t),o=document.createElement("a");o.href=n,o.setAttribute("download","Sales Report.csv"),document.body.appendChild(o),o.click(),o.parentNode.removeChild(o),window.URL.revokeObjectURL(n),this.snackbar=!0,this.color="primary",this.snackbarText="Reports downloaded successfully."}})},getReport(){this.reportsdata.date_filter==="Custom"?this.reportsdata.date_filter="custom":this.reportsdata.date_filter==="Current Year"?(this.reportsdata.date_filter="this_year",this.reportsdata.start_date=this.getFormattedDate(new Date),this.reportsdata.end_date=this.getFormattedDate(new Date)):this.reportsdata.date_filter==="Current Month"&&(this.reportsdata.date_filter="this_month",this.reportsdata.start_date=this.getFormattedDate(new Date),this.reportsdata.end_date=this.getFormattedDate(new Date)),this.isProgress=!0,this.storestocksreport(this.selectedmerchants,this.reportsdata.date_filter,this.reportsdata.start_date,this.reportsdata.end_date).then(s=>{if(s.data.status==0)this.isProgress=!1,this.dialog2=!1,this.reportsdata={},this.selectedmerchants="",this.snackbar=!0,this.color="on-background",this.snackbarText=s.data.message;else{this.isProgress=!1,this.dialog2=!1,this.reportsdata={},this.selectedmerchants="",this.reportsMerchant=s.data;const t=new Blob([s.data],{type:"text/csv"}),n=window.URL.createObjectURL(t),o=document.createElement("a");o.href=n,o.setAttribute("download","Merchant Report.csv"),document.body.appendChild(o),o.click(),o.parentNode.removeChild(o),window.URL.revokeObjectURL(n),this.snackbar=!0,this.color="primary",this.snackbarText="Reports downloaded successfully."}})},openMPS(){this.dialog2=!0},getMerchantdetails(){this.getMerchants().then(s=>{this.merchantName=[{value:"all",text:"All"},...s.data.data.map(t=>({value:t.merchant_id,text:t.merchant_uid}))],console.log("mer",this.merchantName)})}}},J={key:0,class:"loading-container"},Q=h("h4",{class:"text-4xl font-weight-medium text-primary"}," 2 ",-1),X=h("p",null,"\u{1F389}",-1),Z=h("img",{src:A,class:"trophy1"},null,-1),$=["src"],ee=h("h4",{class:"text-4xl font-weight-medium text-primary"}," 2 ",-1),te=h("p",null,"\u{1F389}",-1),le=h("img",{src:P,class:"trophy4"},null,-1);function se(s,t,n,o,l,m){return d(),S("div",null,[l.loading?(d(),S("div",J,[e(T,{height:"5",color:"primary",indeterminate:"",class:"custom-loader","full-width":""})])):p("",!0),e(g,null,{default:a(()=>[e(i,{cols:"12",md:"4"},{default:a(()=>[e(_,{title:"Sales",class:"position-relative"},{default:a(()=>[e(V,null,{default:a(()=>[Q,X,e(f,{size:"small",onClick:t[0]||(t[0]=r=>m.openSales())},{default:a(()=>[u(" Get Reports ")]),_:1})]),_:1}),e(D,{src:s.triangleBg,class:"triangle-bg flip-in-rtl"},null,8,["src"]),Z,h("img",{src:s.avatarg,class:"avatarg"},null,8,$)]),_:1})]),_:1}),e(i,{cols:"12",md:"4"},{default:a(()=>[e(_,{title:"Merchant Product Sales",class:"position-relative"},{default:a(()=>[e(V,null,{default:a(()=>[ee,te,e(f,{size:"small",onClick:t[1]||(t[1]=r=>m.openMPS())},{default:a(()=>[u(" Get Reports ")]),_:1})]),_:1}),e(D,{src:s.triangleBg,class:"triangle-bg flip-in-rtl"},null,8,["src"]),le]),_:1})]),_:1})]),_:1}),e(M,{modelValue:l.dialog2,"onUpdate:modelValue":t[9]||(t[9]=r=>l.dialog2=r),"max-width":"1000"},{default:a(()=>[e(_,{title:"Merchant Product Sales",class:"mb-2"},{default:a(()=>[e(V,null,{default:a(()=>[e(g,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>[e(C,{class:"mt-6",ref:"purchaseOrderForm1"},{default:a(()=>[e(g,null,{default:a(()=>[e(i,{md:"6",cols:"12"},{default:a(()=>[l.selectAll?p("",!0):(d(),b(I,{key:0,modelValue:l.selectedmerchants,"onUpdate:modelValue":t[2]||(t[2]=r=>l.selectedmerchants=r),items:l.merchantName,"item-value":"value","item-title":"text",rules:l.storeMerchant,label:"Store or Merchant","menu-props":{maxHeight:200},"no-underline":""},null,8,["modelValue","items","rules"])),l.selectAll?(d(),b(v,{key:1,modelValue:l.selectedmerchants,"onUpdate:modelValue":t[3]||(t[3]=r=>l.selectedmerchants=r),label:"Store or Merchant",disabled:""},null,8,["modelValue"])):p("",!0)]),_:1}),e(i,{md:"6",cols:"12"},{default:a(()=>[e(F,{rules:l.selectDate,modelValue:l.reportsdata.date_filter,"onUpdate:modelValue":t[4]||(t[4]=r=>l.reportsdata.date_filter=r),items:["Custom","Current Year","Current Month"],label:"Select Date"},null,8,["rules","modelValue"])]),_:1}),l.reportsdata.date_filter=="Custom"?(d(),b(i,{key:0,md:"6",cols:"12"},{default:a(()=>[e(v,{modelValue:l.reportsdata.start_date,"onUpdate:modelValue":t[5]||(t[5]=r=>l.reportsdata.start_date=r),type:"date",label:"Start Date",min:l.minDate,max:l.maxDate},null,8,["modelValue","min","max"])]),_:1})):p("",!0),l.reportsdata.date_filter=="Custom"?(d(),b(i,{key:1,md:"6",cols:"12"},{default:a(()=>[e(v,{modelValue:l.reportsdata.end_date,"onUpdate:modelValue":t[6]||(t[6]=r=>l.reportsdata.end_date=r),type:"date",label:"End Date",min:l.minDate1,max:l.maxDate1},null,8,["modelValue","min","max"])]),_:1})):p("",!0),e(k),e(i,{cols:"12"}),e(i,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:a(()=>[e(f,{onClick:t[7]||(t[7]=r=>m.validateForm1())},{default:a(()=>[u("Get")]),_:1}),e(f,{onClick:t[8]||(t[8]=r=>m.closereport())},{default:a(()=>[u("Close")]),_:1}),x(e(w,{size:50,color:"primary",indeterminate:""},null,512),[[y,l.isProgress]])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(M,{modelValue:l.dialog3,"onUpdate:modelValue":t[13]||(t[13]=r=>l.dialog3=r),"max-width":"1000"},{default:a(()=>[e(_,{title:"Sales",class:"mb-2"},{default:a(()=>[e(V,null,{default:a(()=>[e(g,null,{default:a(()=>[e(i,{cols:"12"},{default:a(()=>[e(C,{class:"mt-6",ref:"purchaseOrderForm2"},{default:a(()=>[e(g,null,{default:a(()=>[e(i,{md:"6",cols:"12"},{default:a(()=>[e(F,{modelValue:l.selectSales,"onUpdate:modelValue":t[10]||(t[10]=r=>l.selectSales=r),items:["All","Acknowledged","Shipped","Delivered"],label:"Select",rules:l.salesRules},null,8,["modelValue","rules"])]),_:1}),e(k),e(i,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:a(()=>[e(f,{onClick:t[11]||(t[11]=r=>m.validateForm2())},{default:a(()=>[u("Get")]),_:1}),e(f,{onClick:t[12]||(t[12]=r=>m.closeSales())},{default:a(()=>[u("Close")]),_:1}),x(e(w,{size:50,color:"primary",indeterminate:""},null,512),[[y,l.isProgress2]])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(q,{modelValue:l.snackbar,"onUpdate:modelValue":t[14]||(t[14]=r=>l.snackbar=r),timeout:3500,color:l.color},{default:a(()=>[u(R(l.snackbarText),1)]),_:1},8,["modelValue","color"])])}const ae=U(W,[["render",se]]),re={components:{Allreports:ae},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Reports",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=N(),this.activeTab=O(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function oe(s,t,n,o,l,m){const r=j("Allreports");return d(),S("div",null,[e(G,{modelValue:l.activeTab,"onUpdate:modelValue":t[0]||(t[0]=c=>l.activeTab=c),"show-arrows":""},{default:a(()=>[(d(!0),S(L,null,B(l.tabs,c=>(d(),b(K,{key:c.icon,value:c.tab},{default:a(()=>[e(z,{size:"20",start:"",icon:c.icon},null,8,["icon"]),u(" "+R(c.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),e(k),e(H,{modelValue:l.activeTab,"onUpdate:modelValue":t[1]||(t[1]=c=>l.activeTab=c),class:"mt-5 disable-tab-transition",touch:!1},{default:a(()=>[e(Y,{value:"account"},{default:a(()=>[e(r)]),_:1})]),_:1},8,["modelValue"])])}const Ve=U(re,[["render",oe]]);export{Ve as default};
