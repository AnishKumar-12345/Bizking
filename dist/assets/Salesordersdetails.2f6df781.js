import{_ as l,v as u,e as d,o as r,c as n,g as t,w as o,F as b,q as m,s as f,r as _,f as p,u as V,b as v,t as T}from"./index.472db999.js";import{V as h,a as w,b as S,c as x}from"./VWindowItem.ce73296d.js";const g={};function k(c,a){return" Will Integrate Shortly "}const y=l(g,[["render",k]]),B={components:{Salesorders:y},data(){return{currentroute:"",activeTab:"",tabs:[{title:"View Sales Orders",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=u(),this.activeTab=d(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function I(c,a,W,C,s,D){const i=_("Salesorders");return r(),n("div",null,[t(h,{modelValue:s.activeTab,"onUpdate:modelValue":a[0]||(a[0]=e=>s.activeTab=e),"show-arrows":""},{default:o(()=>[(r(!0),n(b,null,m(s.tabs,e=>(r(),p(x,{key:e.icon,value:e.tab},{default:o(()=>[t(V,{size:"20",start:"",icon:e.icon},null,8,["icon"]),v(" "+T(e.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),t(f),t(S,{modelValue:s.activeTab,"onUpdate:modelValue":a[1]||(a[1]=e=>s.activeTab=e),class:"mt-5 disable-tab-transition",touch:!1},{default:o(()=>[t(w,{value:"account"},{default:o(()=>[t(i)]),_:1})]),_:1},8,["modelValue"])])}const U=l(B,[["render",I]]);export{U as default};