import{_ as f,o as r,c as i,g as e,w as t,i as o,j as _,k as V,l as n,m as p,b as c,v as b,e as S,F as x,q as D,s as h,r as g,f as w,u as A,t as P}from"./index.fe0f4396.js";import{V as k}from"./VForm.e88938f6.js";import{V as C}from"./VSelect.53493482.js";import{V as u}from"./VTextField.a9260b85.js";import{V as F,a as y,b as $,c as B}from"./VWindowItem.29924bf5.js";import"./VCheckboxBtn.7877dafe.js";import"./VChip.d98fb3cc.js";const R={data(){return{dialog:!1,data:[{po:"PO001",ODate:"2024.01.12",status:"Draft",OT:24,ST:4,total:5},{po:"PO002",ODate:"2024.01.12",status:"Created",OT:24,ST:4,total:5},{po:"PO003",ODate:"2024.01.12",status:"Created",OT:24,ST:4,total:5},{po:"PO004",ODate:"2024.01.12",status:"Draft",OT:24,ST:4,total:5},{po:"PO005",ODate:"2024.01.12",status:"Shared",OT:24,ST:4,total:5},{po:"PO006",ODate:"2024.01.12",status:"Acknowledged",OT:24,ST:4,total:5},{po:"PO007",ODate:"2024.01.12",status:"Acknowledged",OT:24,ST:4,total:5},{po:"PO008",ODate:"2024.01.12",status:"Acknowledged",OT:24,ST:4,total:5}],headers:[{text:"Purchase Order",value:"po"},{text:"Order Date",value:"ODate"},{text:"Status",value:"status"},{text:"Order To",value:"OT"},{text:"Shipped To",value:"ST"},{text:"Total",value:"total"},{text:"Action",value:"actions",sortable:!1}]}},methods:{deleteRow(d){const a=this.data.indexOf(d);a!==-1&&this.data.splice(a,1)},openproductdialog(){this.dialog=!0},closeDialog(){this.dialog=!1}}};function N(d,a,m,v,l,T){return r(),i("div",null,[e(n,null,{default:t(()=>[e(o,{cols:"12"},{default:t(()=>[e(_,{title:"Add Service",class:"mb-4"},{default:t(()=>[e(V,null,{default:t(()=>[e(k,{class:"mt-6"},{default:t(()=>[e(n,null,{default:t(()=>[e(o,{md:"6",cols:"12"},{default:t(()=>[e(C,{label:"Service Type",items:["Margin","Margin + Fee","Fee"]})]),_:1}),e(o,{cols:"12",md:"6"},{default:t(()=>[e(u,{label:"Service Name"})]),_:1}),e(o,{cols:"12",md:"6"},{default:t(()=>[e(u,{label:"Service Value"})]),_:1}),e(o,{md:"6",cols:"12"},{default:t(()=>[e(u,{label:"Service Details"})]),_:1}),e(o,{cols:"12",class:"d-flex flex-wrap gap-4"},{default:t(()=>[e(p,null,{default:t(()=>[c("Save")]),_:1}),e(p,{color:"secondary",variant:"tonal",type:"reset"},{default:t(()=>[c(" Reset ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])}const I=f(R,[["render",N]]),M={components:{Addservice:I},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Add Service",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=b(),this.activeTab=S(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function U(d,a,m,v,l,T){const O=g("Addservice");return r(),i("div",null,[e(F,{modelValue:l.activeTab,"onUpdate:modelValue":a[0]||(a[0]=s=>l.activeTab=s),"show-arrows":""},{default:t(()=>[(r(!0),i(x,null,D(l.tabs,s=>(r(),w(B,{key:s.icon,value:s.tab},{default:t(()=>[e(A,{size:"20",start:"",icon:s.icon},null,8,["icon"]),c(" "+P(s.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),e(h),e($,{modelValue:l.activeTab,"onUpdate:modelValue":a[1]||(a[1]=s=>l.activeTab=s),class:"mt-5 disable-tab-transition",touch:!1},{default:t(()=>[e(y,{value:"account"},{default:t(()=>[e(O)]),_:1})]),_:1},8,["modelValue"])])}const H=f(M,[["render",U]]);export{H as default};