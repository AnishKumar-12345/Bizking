import{_ as b,o as l,c as u,g as a,w as r,i as d,j as v,k as m,l as w,m as f,b as n,t as V,v as C,e as k,F as g,q as _,s as x,r as T,f as y,u as N}from"./index.80000cb6.js";import{s as F}from"./Services.46164876.js";import{V as I}from"./VForm.9f5e4f07.js";import{V as p}from"./VTextField.2ad9d52f.js";import{V as U}from"./VSnackbar.9611439c.js";import{V as B,a as S,b as q,c as D}from"./VWindowItem.db07c762.js";import"./index.2bd8ddc8.js";const M={mixins:[F],data(){return{Newpasswordrules:[o=>!!o||"New Password is required"],Conpasswordrules:[o=>!!o||"Confirm Password is required"],newPassword:"",confirmPassword:"",isNewPasswordVisible:!1,isConfirmPasswordVisible:!1,userIddata:"",snackbar:!1,snackbarText:"",timeout:6e3,color:"",top:!1,bottom:!0,left:!1,right:!1}},mounted(){this.userIddata=localStorage.getItem("user_id")},methods:{validateForm(){this.$refs.purchaseOrderForm.validate().then(o=>{o.valid==!0?this.passwordsMatch()?this.changepassworddetails():(this.snackbar=!0,this.snackbarText="New Password and Confirm Password do not match",this.color="error"):(this.snackbar=!0,this.snackbarText="Please fill in all mandatory fields",this.color="error")})},passwordsMatch(){return this.newPassword===this.confirmPassword},changepassworddetails(){const o={user_id:this.userIddata,new_password:this.newPassword};console.log("chec password",o),this.Changepasswords(o).then(e=>{e.data.status==1?(this.snackbar=!0,this.snackbarText=e.data.message,this.color="primary",this.newPassword="",this.confirmPassword=""):(this.snackbar=!0,this.snackbarText=e.data.message,this.color="on-background",this.newPassword="",this.confirmPassword="")})}}};function O(o,e,h,P,s,c){return l(),u("div",null,[a(w,null,{default:r(()=>[a(d,{cols:"12"},{default:r(()=>[a(v,{title:"Change Password"},{default:r(()=>[a(I,{class:"mt-6",ref:"purchaseOrderForm"},{default:r(()=>[a(m,null,{default:r(()=>[a(w,null,{default:r(()=>[a(d,{cols:"12",md:"6"},{default:r(()=>[a(p,{modelValue:s.newPassword,"onUpdate:modelValue":e[0]||(e[0]=t=>s.newPassword=t),rules:s.Newpasswordrules,type:s.isNewPasswordVisible?"text":"password","append-inner-icon":s.isNewPasswordVisible?"mdi-eye-off-outline":"mdi-eye-outline",label:"New Password","onClick:appendInner":e[1]||(e[1]=t=>s.isNewPasswordVisible=!s.isNewPasswordVisible)},null,8,["modelValue","rules","type","append-inner-icon"])]),_:1}),a(d,{cols:"12",md:"6"},{default:r(()=>[a(p,{modelValue:s.confirmPassword,"onUpdate:modelValue":e[2]||(e[2]=t=>s.confirmPassword=t),rules:s.Conpasswordrules,type:s.isConfirmPasswordVisible?"text":"password","append-inner-icon":s.isConfirmPasswordVisible?"mdi-eye-off-outline":"mdi-eye-outline",label:"Confirm New Password","onClick:appendInner":e[3]||(e[3]=t=>s.isConfirmPasswordVisible=!s.isConfirmPasswordVisible)},null,8,["modelValue","rules","type","append-inner-icon"])]),_:1})]),_:1})]),_:1}),a(m,{class:"d-flex flex-wrap gap-4"},{default:r(()=>[a(f,{onClick:e[4]||(e[4]=t=>c.validateForm())},{default:r(()=>[n("Save changes")]),_:1}),a(f,{type:"reset",color:"secondary",variant:"tonal"},{default:r(()=>[n(" Reset ")]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1}),a(U,{modelValue:s.snackbar,"onUpdate:modelValue":e[5]||(e[5]=t=>s.snackbar=t),timeout:3500,color:s.color},{default:r(()=>[n(V(s.snackbarText),1)]),_:1},8,["modelValue","color"])])}const W=b(M,[["render",O]]),j={components:{Changepassworddetails:W},data(){return{currentroute:"",activeTab:"",tabs:[{title:"Change Password",icon:"mdi-account-outline",tab:"account"}]}},mounted(){this.currentroute=C(),this.activeTab=k(this.currentroute.params.tab),this.activeTab=this.tabs[0].tab}};function z(o,e,h,P,s,c){const t=T("Changepassworddetails");return l(),u("div",null,[a(B,{modelValue:s.activeTab,"onUpdate:modelValue":e[0]||(e[0]=i=>s.activeTab=i),"show-arrows":""},{default:r(()=>[(l(!0),u(g,null,_(s.tabs,i=>(l(),y(D,{key:i.icon,value:i.tab},{default:r(()=>[a(N,{size:"20",start:"",icon:i.icon},null,8,["icon"]),n(" "+V(i.title),1)]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"]),a(x),a(q,{modelValue:s.activeTab,"onUpdate:modelValue":e[1]||(e[1]=i=>s.activeTab=i),class:"mt-5 disable-tab-transition",touch:!1},{default:r(()=>[a(S,{value:"account"},{default:r(()=>[a(t)]),_:1})]),_:1},8,["modelValue"])])}const K=b(j,[["render",z]]);export{K as default};
