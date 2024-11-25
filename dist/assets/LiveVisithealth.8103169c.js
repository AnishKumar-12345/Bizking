import{_ as L,r as A,o,c as d,g as i,w as n,k as N,l as Q,i as T,a as l,b as c,t as u,j as x,b8 as v,F as h,q as _,bt as w,bv as k,m as C,bp as U,bq as z,v as P,e as E,f as M,u as F,s as B}from"./index.08705643.js";import{s as W}from"./Services.f9e4372b.js";import{V as q}from"./VAutocomplete.457394fd.js";import{V}from"./VTextField.0584a3e6.js";import{V as I}from"./VChip.cd0ade04.js";import{V as b}from"./VTable.eda8fa83.js";import{V as y}from"./VPagination.f3ba474e.js";import{V as D}from"./VDialog.54dfbcf0.js";import{V as G}from"./VSnackbar.89c018e7.js";import{V as R,a as H,b as Y,c as O}from"./VWindowItem.2d182e11.js";import"./VSelect.00b3ff1f.js";import"./VCheckboxBtn.770726d6.js";import"./VCounter.d136124c.js";const j={mixins:[W],data(){return{searchQuery:"",searchQuery2:"",searchQuery3:"",searchQuery4:"",snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,loading:!1,visithealth:[],visitagegap3:[],visitagegap5:[],visitagegapabove5:[],interval:null,cityID:"",page:1,pageSize:10,page2:1,pageSize2:10,dialog:!1,dialog2:!1,dialog3:!1,locationsdata:[],page3:1,pageSize3:10,page4:1,pageSize4:10,headers:[{text:"Retail Chain",value:"brand_name"},{text:"Stores Count",value:"sku_name"},{text:"Visit Age < 3Days",value:"uom"},{text:"Visit Age < 5Days",value:"hsn_code"},{text:"Visit Age >= 5Days",value:"available_qty"}],headers2:[{text:"Merchant Name",value:"brand_name"},{text:"Merchant UID",value:"sku_name"},{text:"Last Visited Date",value:"uom"}],headers3:[{text:"Merchant Name",value:"brand_name"},{text:"Merchant UID",value:"sku_name"},{text:"Last Visited Date",value:"uom"}],headers4:[{text:"Merchant Name",value:"brand_name"},{text:"Merchant UID",value:"sku_name"},{text:"Last Visited Date",value:"uom"}]}},computed:{todaysoldquanity(){const t=this.visithealth.reduce((e,m)=>{const p=parseFloat(m.stores_count);return isNaN(p)?e:e+p},0);return isNaN(t)?0:t.toFixed(0)},filteredvisitagegapabove5(){const t=this.searchQuery4.toLowerCase().trim();return this.visitagegapabove5.filter(e=>e.merchant_name&&e.merchant_name.toLowerCase().includes(t)||e.merchant_uid&&e.merchant_uid.toLowerCase().includes(t)||e.last_visited_date&&e.last_visited_date.toLowerCase().includes(t))},sortedItems3(){return this.filteredvisitagegapabove5.slice().sort((t,e)=>new Date(e.last_visited_date)-new Date(t.last_visited_date))},paginatedItems4(){const t=(this.page4-1)*this.pageSize4,e=t+this.pageSize4;return this.sortedItems3.slice(t,e)},filteredvisitagegap5(){const t=this.searchQuery3.toLowerCase().trim();return this.visitagegap5.filter(e=>e.merchant_name&&e.merchant_name.toLowerCase().includes(t)||e.merchant_uid&&e.merchant_uid.toLowerCase().includes(t)||e.last_visited_date&&e.last_visited_date.toLowerCase().includes(t))},sortedItems2(){return this.filteredvisitagegap5.slice().sort((t,e)=>new Date(e.last_visited_date)-new Date(t.last_visited_date))},paginatedItems3(){const t=(this.page3-1)*this.pageSize3,e=t+this.pageSize3;return this.sortedItems2.slice(t,e)},filteredvisitagegap3(){const t=this.searchQuery2.toLowerCase().trim();return this.visitagegap3.filter(e=>e.merchant_name&&e.merchant_name.toLowerCase().includes(t)||e.merchant_uid&&e.merchant_uid.toLowerCase().includes(t)||e.last_visited_date&&e.last_visited_date.toLowerCase().includes(t))},sortedItems(){return this.filteredvisitagegap3.slice().sort((t,e)=>new Date(e.last_visited_date)-new Date(t.last_visited_date))},paginatedItems2(){const t=(this.page2-1)*this.pageSize2,e=t+this.pageSize2;return this.sortedItems.slice(t,e)},filteredvisithealth(){const t=this.searchQuery.toLowerCase().trim();return this.visithealth.filter(e=>e.merchant_name&&e.merchant_name.toLowerCase().includes(t)||e.sa_delivery_age_gap_3&&e.sa_delivery_age_gap_3.toString().includes(t)||e.sa_delivery_age_gap_5&&e.sa_delivery_age_gap_5.toString().includes(t)||e.sa_delivery_age_gap_above&&e.sa_delivery_age_gap_above.toString().includes(t)||e.stores_count&&e.stores_count.toString().includes(t))},paginatedItems(){const t=(this.page-1)*this.pageSize,e=t+this.pageSize;return this.filteredvisithealth.slice(t,e)}},mounted(){this.getBranchnames()},beforeUnmount(){this.interval&&clearInterval(this.interval)},methods:{openDialog(t){this.dialog=!0,this.visitagegap3=t},openDialog2(t){this.dialog2=!0,this.visitagegap5=t},openDialog3(t){this.dialog3=!0,this.visitagegapabove5=t},getvisithealthdata(t){this.visithealth=[],this.loading=!0,this.getVisithealth(t).then(e=>{console.log({response:e}),e.data.status==1?(this.snackbarText=e.data.message,this.color="primary",this.snackbar=!0,this.visithealth=e.data.data,this.loading=!1):(this.snackbarText=e.data.message,this.color="on-background",this.snackbar=!0,this.loading=!1)})},updatePagination(t){this.page=t},updatePagination2(t){this.page2=t},updatePagination3(t){this.page3=t},updatePagination4(t){this.page4=t},getBranchnames(){this.Locationdata().then(t=>{this.locationsdata=t.data.data.map(e=>({value:e.city_id,text:e.city})),console.log("ceck tye res",this.locationsdata)})}}},J={class:"stores-count"},K={style:{color:"rgb(13, 180, 13)"}},X={style:{"max-width":"400px"}},Z={key:0,id:"app"},$=U('<div id="loading-bg"><div class="loading-logo"><img src="'+z+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),ee=[$],te={key:0},ae=l("td",{colspan:"16",class:"text-center"},[l("h1",null,"No data found !")],-1),se=[ae],le={class:"text-center"},ie={class:"text-center"},ne={class:"text-center"},oe=["onClick"],re={class:"text-center"},de=["onClick"],ue={class:"text-center"},ce=["onClick"],he=l("span",{style:{"background-color":"#bf9442","border-radius":"8px",padding:"10px","box-shadow":"0 2px 5px rgba(185, 178, 178, 0.1)",color:"#ffffff"}}," VISIT AGE GAP LESS THAN 3 DAYS ",-1),_e={style:{"max-width":"400px",padding:"20px"}},ge={key:0},pe=l("td",{colspan:"16",class:"text-center"},[l("h1",null,"No Data Found !")],-1),me=[pe],fe={class:"text-center"},ve={class:"text-center"},xe={class:"text-center"},Ve=l("span",{style:{"background-color":"#bf9442","border-radius":"8px",padding:"10px","box-shadow":"0 2px 5px rgba(185, 178, 178, 0.1)",color:"#ffffff"}},"VISIT AGE GAP LESS THAN 5 DAYS",-1),be={style:{"max-width":"400px",padding:"20px"}},ye={key:0},we=l("td",{colspan:"16",class:"text-center"},[l("h1",null,"No Data Found !")],-1),ke=[we],Ce={class:"text-center"},Ie={class:"text-center"},De={class:"text-center"},Se=l("span",{style:{"background-color":"#bf9442","border-radius":"8px",padding:"10px","box-shadow":"0 2px 5px rgba(185, 178, 178, 0.1)",color:"#ffffff"}},"VISIT AGE GAP GREATER THAN EQUAL AND EQUAL TO 5 DAYS",-1),Te={style:{"max-width":"400px",padding:"20px"}},Le={key:0},Ae=l("td",{colspan:"16",class:"text-center"},[l("h1",null,"No Data Found !")],-1),Ne=[Ae],Qe={class:"text-center"},Ue={class:"text-center"},ze={class:"text-center"};function Pe(t,e,m,p,s,r){const f=A("VCardContent");return o(),d("div",null,[i(x,{class:"mb-4"},{default:n(()=>[i(N,null,{default:n(()=>[i(Q,null,{default:n(()=>[i(T,{cols:"12",md:"6"},{default:n(()=>[i(q,{modelValue:s.cityID,"onUpdate:modelValue":[e[0]||(e[0]=a=>s.cityID=a),e[1]||(e[1]=a=>r.getvisithealthdata(s.cityID))],label:"City Names",items:s.locationsdata,"item-title":"text","item-value":"value",rules:t.locationrules,required:"","menu-props":{maxHeight:200}},null,8,["modelValue","items","rules"])]),_:1}),i(T,{cols:"12",md:"6"},{default:n(()=>[l("h2",J,[c(" STORES COUNT "),l("span",K,u(r.todaysoldquanity),1)])]),_:1})]),_:1})]),_:1})]),_:1}),l("div",X,[i(V,{modelValue:s.searchQuery,"onUpdate:modelValue":e[2]||(e[2]=a=>s.searchQuery=a),class:"mb-3",density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),s.loading?(o(),d("div",Z,ee)):v("",!0),i(b,{headers:s.headers,items:r.paginatedItems,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:n(()=>[l("thead",null,[l("tr",null,[(o(!0),d(h,null,_(s.headers,a=>(o(),d("th",{key:a,class:"text-center"},u(a.text),1))),128))])]),l("tbody",null,[r.filteredvisithealth.length===0?(o(),d("tr",te,se)):v("",!0),(o(!0),d(h,null,_(r.paginatedItems,(a,g)=>(o(),d("tr",{key:g},[l("td",le,u(a.merchant_name),1),l("td",ie,u(a.stores_count),1),l("td",ne,[l("a",{onClick:S=>r.openDialog(a.sa_visit_age_gap_3_merchants)},[i(I,{color:"success",class:"font-weight-medium",size:"small"},{default:n(()=>[c(u(a.sa_visit_age_gap_3),1)]),_:2},1024)],8,oe)]),c(),l("td",re,[l("a",{onClick:S=>r.openDialog2(a.sa_visit_age_gap_5_merchants)},[i(I,{color:"warning",class:"font-weight-medium",size:"small"},{default:n(()=>[c(u(a.sa_visit_age_gap_5),1)]),_:2},1024)],8,de)]),c(),l("td",ue,[l("a",{onClick:S=>r.openDialog3(a.sa_visit_age_gap_above_merchants)},[i(I,{color:"error",class:"font-weight-medium",size:"small"},{default:n(()=>[c(u(a.sa_visit_age_gap_above),1)]),_:2},1024)],8,ce)])]))),128))])]),_:1},8,["headers","items"]),i(y,{modelValue:s.page,"onUpdate:modelValue":e[3]||(e[3]=a=>s.page=a),length:Math.ceil(r.filteredvisithealth.length/s.pageSize),onInput:r.updatePagination},null,8,["modelValue","length","onInput"]),i(D,{modelValue:s.dialog,"onUpdate:modelValue":e[7]||(e[7]=a=>s.dialog=a),"max-width":"1000px"},{default:n(()=>[i(x,null,{default:n(()=>[i(w,{class:"mt-5 text-h5 text-center"},{default:n(()=>[he]),_:1}),i(f,null,{default:n(()=>[l("div",_e,[i(V,{modelValue:s.searchQuery2,"onUpdate:modelValue":e[4]||(e[4]=a=>s.searchQuery2=a),class:"mb-3",density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),i(b,{headers:s.headers},{default:n(()=>[l("thead",null,[l("tr",null,[(o(!0),d(h,null,_(s.headers2,a=>(o(),d("th",{key:a,class:"text-center"},u(a.text),1))),128))])]),l("tbody",null,[r.filteredvisitagegap3.length===0?(o(),d("tr",ge,me)):v("",!0),(o(!0),d(h,null,_(r.paginatedItems2,(a,g)=>(o(),d("tr",{key:g},[l("td",fe,u(a.merchant_name),1),l("td",ve,u(a.merchant_uid),1),l("td",xe,u(a.last_visited_date),1)]))),128))])]),_:1},8,["headers"]),i(y,{modelValue:s.page2,"onUpdate:modelValue":e[5]||(e[5]=a=>s.page2=a),length:Math.ceil(r.filteredvisitagegap3.length/s.pageSize2),onInput:r.updatePagination2},null,8,["modelValue","length","onInput"])]),_:1}),i(k,null,{default:n(()=>[i(C,{variant:"elevated",onClick:e[6]||(e[6]=a=>s.dialog=!1)},{default:n(()=>[c(" Close ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),i(D,{modelValue:s.dialog2,"onUpdate:modelValue":e[11]||(e[11]=a=>s.dialog2=a),"max-width":"1000px"},{default:n(()=>[i(x,null,{default:n(()=>[i(w,{class:"mt-5 text-h5 text-center"},{default:n(()=>[Ve]),_:1}),i(f,null,{default:n(()=>[l("div",be,[i(V,{modelValue:s.searchQuery3,"onUpdate:modelValue":e[8]||(e[8]=a=>s.searchQuery3=a),class:"mb-3",density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),i(b,{headers:s.headers},{default:n(()=>[l("thead",null,[l("tr",null,[(o(!0),d(h,null,_(s.headers3,a=>(o(),d("th",{key:a,class:"text-center"},u(a.text),1))),128))])]),l("tbody",null,[r.filteredvisitagegap5.length===0?(o(),d("tr",ye,ke)):v("",!0),(o(!0),d(h,null,_(r.paginatedItems3,(a,g)=>(o(),d("tr",{key:g},[l("td",Ce,u(a.merchant_name),1),l("td",Ie,u(a.merchant_uid),1),l("td",De,u(a.last_visited_date),1)]))),128))])]),_:1},8,["headers"]),i(y,{modelValue:s.page3,"onUpdate:modelValue":e[9]||(e[9]=a=>s.page3=a),length:Math.ceil(r.filteredvisitagegap5.length/s.pageSize3),onInput:r.updatePagination3},null,8,["modelValue","length","onInput"])]),_:1}),i(k,null,{default:n(()=>[i(C,{variant:"elevated",onClick:e[10]||(e[10]=a=>s.dialog2=!1)},{default:n(()=>[c(" Close ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),i(D,{modelValue:s.dialog3,"onUpdate:modelValue":e[15]||(e[15]=a=>s.dialog3=a),"max-width":"1000px"},{default:n(()=>[i(x,null,{default:n(()=>[i(w,{class:"mt-5 text-h5 text-center"},{default:n(()=>[Se]),_:1}),i(f,null,{default:n(()=>[l("div",Te,[i(V,{modelValue:s.searchQuery4,"onUpdate:modelValue":e[12]||(e[12]=a=>s.searchQuery4=a),class:"mb-3",density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),i(b,{headers:s.headers},{default:n(()=>[l("thead",null,[l("tr",null,[(o(!0),d(h,null,_(s.headers4,a=>(o(),d("th",{key:a,class:"text-center"},u(a.text),1))),128))])]),l("tbody",null,[r.filteredvisitagegapabove5.length===0?(o(),d("tr",Le,Ne)):v("",!0),(o(!0),d(h,null,_(r.paginatedItems4,(a,g)=>(o(),d("tr",{key:g},[l("td",Qe,u(a.merchant_name),1),l("td",Ue,u(a.merchant_uid),1),l("td",ze,u(a.last_visited_date),1)]))),128))])]),_:1},8,["headers"]),i(y,{modelValue:s.page4,"onUpdate:modelValue":e[13]||(e[13]=a=>s.page4=a),length:Math.ceil(r.filteredvisitagegapabove5.length/s.pageSize4),onInput:r.updatePagination4},null,8,["modelValue","length","onInput"])]),_:1}),i(k,null,{default:n(()=>[i(C,{variant:"elevated",onClick:e[14]||(e[14]=a=>s.dialog3=!1)},{default:n(()=>[c(" Close ")]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),i(G,{modelValue:s.snackbar,"onUpdate:modelValue":e[16]||(e[16]=a=>s.snackbar=a),timeout:3500,color:s.color},{default:n(()=>[c(u(s.snackbarText),1)]),_:1},8,["modelValue","color"])])}const Ee=L(j,[["render",Pe]]);const Me={components:{Visithealth:Ee},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Retail chain level Visit Health status",icon:"fluent-mdl2:party-leader",tab:"account"}],currentDate:""}},computed:{tabsWithDate(){return this.currentDate=this.formatDate(new Date),this.tabs.map(t=>({...t,title:t.title}))}},mounted(){this.currentroute=P(),this.activeTab=E(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab},methods:{formatDate(t){const e=t.getDate(),m=t.toLocaleString("default",{month:"long"}),p=t.getFullYear();return`${this.getDayWithSuffix(e)} ${m} ${p}`},getDayWithSuffix(t){if(t>3&&t<21)return t+"th";switch(t%10){case 1:return t+"st";case 2:return t+"nd";case 3:return t+"rd";default:return t+"th"}}}},Fe={class:"title-text"},Be={class:"date-text"};function We(t,e,m,p,s,r){const f=A("Visithealth");return o(),d("div",null,[i(H,{modelValue:s.activeTab,"onUpdate:modelValue":e[0]||(e[0]=a=>s.activeTab=a),"show-arrows":""},{default:n(()=>[(o(!0),d(h,null,_(r.tabsWithDate,a=>(o(),M(R,{key:a.icon,value:a.tab},{default:n(()=>[i(F,{size:"30",start:"",icon:a.icon},null,8,["icon"]),l("h2",null,[l("span",Fe,u(a.title),1),c(" \xA0\xA0 "),l("span",Be,"["+u(s.currentDate)+"]",1)])]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),i(B),i(O,{modelValue:s.activeTab,"onUpdate:modelValue":e[1]||(e[1]=a=>s.activeTab=a),class:"mt-5 disable-tab-transition",touch:!1},{default:n(()=>[i(Y,{value:"account"},{default:n(()=>[i(f)]),_:1})]),_:1},8,["modelValue"])])}const tt=L(Me,[["render",We]]);export{tt as default};
