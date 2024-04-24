import{e as n,D as m,be as x,o as I,c as T,g as a,w as s,bp as P,k as p,n as S,l as C,i as h,ao as i,m as B,b as f,j as D,bh as c,t as E,a as u,bo as N,bI as R,a$ as M,bJ as j}from"./index.8231191f.js";import{c as q,d as A,b as U,a as z}from"./auth-v1-tree.54ebfcea.js";import{b as g}from"./route-block.011d1056.js";import{V as F}from"./VForm.5023f7bf.js";import{V as _}from"./VTextField.88c661ca.js";import{V as L}from"./VSnackbar.feaa5578.js";const Z={class:"auth-wrapper d-flex align-center justify-center pa-4"},$=u("div",{class:"d-flex"},[u("img",{src:N,width:"80",height:"80"})],-1),G=u("h5",{class:"text-h5 font-weight-semibold mb-1"},"Welcome to BIZKINGZ! \u{1F44B}\u{1F3FB}",-1),J=u("p",{class:"mb-0"},"Please sign-in to your account and start the adventure",-1),K=u("br",null,null,-1),W=u("br",null,null,-1),H={__name:"login",setup(O){const b=R(),o=n({email:"",password:"",remember:!1,timeout:6e3}),v=m(()=>{const t=[];return t.push(e=>!!e||"Email is required"),t.push(e=>/.+@.+\..+/.test(e)||"Email must be valid"),t}),V=m(()=>{const t=[];return t.push(e=>!!e||"Password is required"),t}),l=n({show:!1,message:"",color:""}),w=x(),y=m(()=>w.global.name.value==="light"?q:A),d=n(!1),k=()=>{if(!o.value.email||!o.value.password){l.value={show:!0,message:"Please give mandatory fields",color:"error"};return}const t={email:o.value.email,password:o.value.password};M.post("http://216.10.250.149/bizkingz/services/api/auth/login",t).then(e=>{console.log("API Response:",e),e.data.status==1?(setTimeout(()=>{b.push("/Dashboardhome")},1e3),localStorage.setItem("createdby",e.data.data.name),localStorage.setItem("userId",e.data.data.user_id),localStorage.setItem("userRole",e.data.data.user_role),localStorage.setItem("user_id",e.data.data.user_id),j.commit("setNotifications",e.data.notifications_details),l.value={show:!0,message:e.data.message,color:"primary"}):l.value={show:!0,message:e.data.message,color:"error"}}).catch(e=>{console.error("API Error:",e),l.value={show:!0,message:"An error occurred while logging in. Please try again.",color:"error"}})};return(t,e)=>(I(),T("div",Z,[a(D,{class:"auth-card pa-4 pt-7","max-width":"448"},{default:s(()=>[a(P,{class:"justify-center"},{prepend:s(()=>[$]),_:1}),a(p,{class:"pt-2"},{default:s(()=>[G,J]),_:1}),a(p,null,{default:s(()=>[a(F,{onSubmit:S(k,["prevent"])},{default:s(()=>[a(C,null,{default:s(()=>[a(h,{cols:"12"},{default:s(()=>[a(_,{modelValue:o.value.email,"onUpdate:modelValue":e[0]||(e[0]=r=>o.value.email=r),label:"Email",type:"email",rules:i(v)},null,8,["modelValue","rules"])]),_:1}),a(h,{cols:"12"},{default:s(()=>[a(_,{modelValue:o.value.password,"onUpdate:modelValue":e[1]||(e[1]=r=>o.value.password=r),label:"Password",type:d.value?"text":"password","append-inner-icon":d.value?"mdi-eye-off-outline":"mdi-eye-outline","onClick:appendInner":e[2]||(e[2]=r=>d.value=!d.value),rules:i(V)},null,8,["modelValue","type","append-inner-icon","rules"]),K,W,a(B,{block:"",type:"submit"},{default:s(()=>[f(" Login ")]),_:1})]),_:1})]),_:1})]),_:1},8,["onSubmit"])]),_:1})]),_:1}),a(c,{class:"auth-footer-start-tree d-none d-md-block",src:i(U),width:250},null,8,["src"]),a(c,{src:i(z),class:"auth-footer-end-tree d-none d-md-block",width:350},null,8,["src"]),a(c,{class:"auth-footer-mask d-none d-md-block",src:i(y)},null,8,["src"]),a(L,{modelValue:l.value.show,"onUpdate:modelValue":e[3]||(e[3]=r=>l.value.show=r),color:l.value.color,top:"",timeout:1e3},{default:s(()=>[f(E(l.value.message),1)]),_:1},8,["modelValue","color"])]))}};typeof g=="function"&&g(H);export{H as default};