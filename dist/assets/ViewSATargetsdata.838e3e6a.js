import{_ as b,o as d,c as u,g as s,w as l,i as g,j as S,k as T,l as V,m as w,b as h,a as i,b8 as v,F as p,q as _,t as m,bp as k,bq as y,v as A,e as C,s as I,r as U,f as D,u as E}from"./index.a69bedf2.js";import{s as F}from"./Services.9aacc6f2.js";import{V as N}from"./VForm.e0766810.js";import{V as q}from"./VAutocomplete.fe4e8b17.js";import{V as f}from"./VTextField.fb4408de.js";import{V as z}from"./VChip.68a1889e.js";import{V as L}from"./VTable.abd3f669.js";import{V as P}from"./VPagination.1db389a4.js";import{V as B}from"./VSnackbar.13133128.js";import{V as Q,a as M,b as G,c as R}from"./VWindowItem.7b1d0a98.js";import"./VCounter.1847cb25.js";import"./VSelect.ad083822.js";import"./VCheckboxBtn.8ca5aade.js";const W={mixins:[F],data(){return{snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1,salesdata:[],satargetuserid:"",cityID:"",Startdate:"",Enddate:"",viewSATragetsdata:[],searchQuery:"",page:1,pageSize:10,loading:!1,salesr:[a=>!!a||"Sales Associate is required"],startr:[a=>!!a||"Start Date is required"],endr:[a=>!!a||"End date is required"],headers:[{text:"User Name",value:"user_name"},{text:"Merchant UID",value:"merchant_uid"},{text:"Target Amount",value:"target_amount"},{text:"Achieved Target",value:"achieved_target"},{text:"Achieved Percentage",value:"achieved_percentage"}]}},computed:{filteredSAwisetarget(){const a=this.searchQuery.toLowerCase().trim();return this.viewSATragetsdata.filter(e=>e.merchant_uid&&e.merchant_uid.toLowerCase().includes(a)||e.target_amount&&e.target_amount.toLowerCase().includes(a)||e.achieved_target&&e.achieved_target.toString().includes(a)||e.achieved_percentage&&e.achieved_percentage.toString().includes(a)||e.user_name&&e.user_name.toLowerCase().includes(a))},paginatedItems(){const a=(this.page-1)*this.pageSize,e=a+this.pageSize;return this.filteredSAwisetarget.slice(a,e)}},mounted(){this.cityID=localStorage.getItem("city_id"),this.getAllsales()},methods:{colorTGMmargin(a){return a>100?{color:"success"}:{color:"error"}},updatePagination(a){this.page=a},validateForm(){this.$refs.tripform.validate().then(a=>{a.valid==!0?this.getSATargetsdata():(this.snackbar=!0,this.snackbarText="Please give all mandatory fields",this.color="on-background")})},getSATargetsdata(){return new Promise((a,e)=>{this.loading=!0,this.getSATargets(this.satargetuserid,this.Startdate,this.Enddate).then(n=>{n.data.status==1?(this.viewSATragetsdata=n.data.data,a(),this.snackbar=!0,this.loading=!1,this.color="primary",this.snackbarText=n.data.message):(this.loading=!1,this.snackbar=!0,this.color="on-background",this.viewSATragetsdata=[],this.snackbarText=n.data.message)}).catch(n=>{console.error("Error fetching merchants:",n),e(n)})})},getAllsales(){this.getSalesassociate(this.cityID).then(a=>{this.salesdata=a.data.data,this.salesdata=this.salesdata.map(e=>({value:e.user_id,text:e.name}))})}}},j={style:{"max-width":"400px"}},H={key:0,id:"app"},J=k('<div id="loading-bg"><div class="loading-logo"><img src="'+y+'" height="60" width="68" alt="Logo"></div><div class="loading"><div class="effect-1 effects"></div><div class="effect-2 effects"></div><div class="effect-3 effects"></div></div></div>',1),K=[J],O={key:0},X=i("td",{colspan:"16",class:"text-center"},[i("h1",null,"No data found !")],-1),Y=[X],Z={class:"text-center"},$={class:"text-center"},ee={class:"text-center"},te={class:"text-center"},ae={class:"text-center"};function se(a,e,n,x,t,c){return d(),u("div",null,[s(V,null,{default:l(()=>[s(g,{cols:"12"},{default:l(()=>[s(S,{title:"View SA Targets",class:"mb-4"},{default:l(()=>[s(T,null,{default:l(()=>[s(N,{ref:"tripform",class:"mt-6"},{default:l(()=>[s(V,null,{default:l(()=>[s(g,{cols:"12",md:"6"},{default:l(()=>[s(q,{modelValue:t.satargetuserid,"onUpdate:modelValue":e[0]||(e[0]=r=>t.satargetuserid=r),label:"Sales Associate",items:t.salesdata,"item-value":"value","item-title":"text","menu-props":{maxHeight:200},rules:t.salesr,required:""},null,8,["modelValue","items","rules"])]),_:1}),s(g,{cols:"12",md:"6"},{default:l(()=>[s(f,{modelValue:t.Startdate,"onUpdate:modelValue":e[1]||(e[1]=r=>t.Startdate=r),type:"date",label:"Start Date",rules:t.startr},null,8,["modelValue","rules"])]),_:1}),s(g,{cols:"12",md:"6"},{default:l(()=>[s(f,{modelValue:t.Enddate,"onUpdate:modelValue":e[2]||(e[2]=r=>t.Enddate=r),type:"date",label:"End Date",rules:t.endr},null,8,["modelValue","rules"])]),_:1}),s(g,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:l(()=>[s(w,{onClick:c.validateForm},{default:l(()=>[h(" Get ")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1})]),_:1}),i("div",j,[s(f,{modelValue:t.searchQuery,"onUpdate:modelValue":e[3]||(e[3]=r=>t.searchQuery=r),class:"mb-3",density:"compact",variant:"solo",label:"Search","append-inner-icon":"mdi-magnify","single-line":"","hide-details":""},null,8,["modelValue"])]),t.loading?(d(),u("div",H,K)):v("",!0),s(L,{headers:t.headers,items:c.paginatedItems,"item-key":"dessert",class:"table-rounded",height:"500","fixed-header":""},{default:l(()=>[i("thead",null,[i("tr",null,[(d(!0),u(p,null,_(t.headers,r=>(d(),u("th",{key:r,class:"text-center"},m(r.text),1))),128))])]),i("tbody",null,[c.filteredSAwisetarget.length===0?(d(),u("tr",O,Y)):v("",!0),(d(!0),u(p,null,_(c.paginatedItems,(r,o)=>(d(),u("tr",{key:o},[i("td",Z,m(r.user_name),1),i("td",$,m(r.merchant_uid),1),i("td",ee,m(r.target_amount),1),i("td",te,m(r.achieved_target),1),i("td",ae,[s(z,{color:c.colorTGMmargin(r.achieved_percentage).color,class:"font-weight-medium",size:"small"},{default:l(()=>[h(" ( "+m(r.achieved_percentage.toFixed(2)+"%")+") ",1)]),_:2},1032,["color"])])]))),128))])]),_:1},8,["headers","items"]),s(P,{modelValue:t.page,"onUpdate:modelValue":e[4]||(e[4]=r=>t.page=r),length:Math.ceil(c.filteredSAwisetarget.length/t.pageSize),onInput:c.updatePagination},null,8,["modelValue","length","onInput"]),s(B,{modelValue:t.snackbar,"onUpdate:modelValue":e[5]||(e[5]=r=>t.snackbar=r),timeout:3500,color:t.color},{default:l(()=>[h(m(t.snackbarText),1)]),_:1},8,["modelValue","color"])])}const re=b(W,[["render",se]]),le={components:{Viewsatargets:re},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View SA Tragets",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=A(),this.activeTab=C(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function ie(a,e,n,x,t,c){const r=U("Viewsatargets");return d(),u("div",null,[s(Q,{modelValue:t.activeTab,"onUpdate:modelValue":e[0]||(e[0]=o=>t.activeTab=o),"show-arrows":""},{default:l(()=>[(d(!0),u(p,null,_(t.tabs,o=>(d(),D(R,{key:o.icon,value:o.tab},{default:l(()=>[s(E,{size:"20",start:"",icon:o.icon},null,8,["icon"]),h(" "+m(o.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),s(I),s(G,{modelValue:t.activeTab,"onUpdate:modelValue":e[1]||(e[1]=o=>t.activeTab=o),class:"mt-5 disable-tab-transition",touch:!1},{default:l(()=>[s(M,{value:"account"},{default:l(()=>[s(r)]),_:1})]),_:1},8,["modelValue"])])}const be=b(le,[["render",ie]]);export{be as default};
