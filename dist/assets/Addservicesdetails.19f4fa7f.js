import{_ as f,o as r,c as u,g as e,w as t,i as l,j as _,k as V,l as n,m as p,b as c,v as b,e as S,F as x,q as D,s as h,r as g,f as w,u as A,t as P}from"./index.0a02293b.js";import{V as k}from"./VForm.cf677e9c.js";import{V as C}from"./VSelect.e762c033.js";import{V as i}from"./VTextField.a38e65d3.js";import{V as F,a as y,b as $,c as B}from"./VWindowItem.47cd302a.js";import"./VCounter.0e4a7297.js";import"./VCheckboxBtn.1c3b42ae.js";import"./VChip.3f90d630.js";const R={data(){return{dialog:!1,data:[{po:"PO001",ODate:"2024.01.12",status:"Draft",OT:24,ST:4,total:5},{po:"PO002",ODate:"2024.01.12",status:"Created",OT:24,ST:4,total:5},{po:"PO003",ODate:"2024.01.12",status:"Created",OT:24,ST:4,total:5},{po:"PO004",ODate:"2024.01.12",status:"Draft",OT:24,ST:4,total:5},{po:"PO005",ODate:"2024.01.12",status:"Shared",OT:24,ST:4,total:5},{po:"PO006",ODate:"2024.01.12",status:"Acknowledged",OT:24,ST:4,total:5},{po:"PO007",ODate:"2024.01.12",status:"Acknowledged",OT:24,ST:4,total:5},{po:"PO008",ODate:"2024.01.12",status:"Acknowledged",OT:24,ST:4,total:5}],headers:[{text:"Purchase Order",value:"po"},{text:"Order Date",value:"ODate"},{text:"Status",value:"status"},{text:"Order To",value:"OT"},{text:"Shipped To",value:"ST"},{text:"Total",value:"total"},{text:"Action",value:"actions",sortable:!1}]}},methods:{deleteRow(d){const a=this.data.indexOf(d);a!==-1&&this.data.splice(a,1)},openproductdialog(){this.dialog=!0},closeDialog(){this.dialog=!1}}};function N(d,a,m,v,o,T){return r(),u("div",null,[e(n,null,{default:t(()=>[e(l,{cols:"12"},{default:t(()=>[e(_,{title:"Add Service",class:"mb-4"},{default:t(()=>[e(V,null,{default:t(()=>[e(k,{class:"mt-6"},{default:t(()=>[e(n,null,{default:t(()=>[e(l,{md:"6",cols:"12"},{default:t(()=>[e(C,{label:"Service Type",items:["Margin","Margin + Fee","Fee"]})]),_:1}),e(l,{cols:"12",md:"6"},{default:t(()=>[e(i,{label:"Service Name"})]),_:1}),e(l,{cols:"12",md:"6"},{default:t(()=>[e(i,{label:"Service Value"})]),_:1}),e(l,{md:"6",cols:"12"},{default:t(()=>[e(i,{label:"Service Details"})]),_:1}),e(l,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[e(p,null,{default:t(()=>[c("Save")]),_:1}),e(p,{color:"secondary",variant:"tonal",type:"reset"},{default:t(()=>[c(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])}const I=f(R,[["render",N]]),M={components:{Addservice:I},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Add Service",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=b(),this.activeTab=S(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function U(d,a,m,v,o,T){const O=g("Addservice");return r(),u("div",null,[e(F,{modelValue:o.activeTab,"onUpdate:modelValue":a[0]||(a[0]=s=>o.activeTab=s),"show-arrows":""},{default:t(()=>[(r(!0),u(x,null,D(o.tabs,s=>(r(),w(B,{key:s.icon,value:s.tab},{default:t(()=>[e(A,{size:"20",start:"",icon:s.icon},null,8,["icon"]),c(" "+P(s.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),e(h),e($,{modelValue:o.activeTab,"onUpdate:modelValue":a[1]||(a[1]=s=>o.activeTab=s),class:"mt-5 disable-tab-transition",touch:!1},{default:t(()=>[e(y,{value:"account"},{default:t(()=>[e(O)]),_:1})]),_:1},8,["modelValue"])])}const J=f(M,[["render",U]]);export{J as default};