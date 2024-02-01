import{bi as A,y as D,I as L,W as E,bj as z,aD as R,b3 as j,b4 as w,aE as F,z as M,P as O,aA as H,X as J,E as n,a3 as N,aH as Q,Y as W,bk as X,aI as Y,b5 as q,b6 as G,aJ as K,Q as U,$ as Z,a4 as p,g as a,aM as ee,as as u,v as te,n as ae}from"./index.a09c0f04.js";const le=A("v-alert-title"),se=["success","info","warning","error"],oe=D({name:"VAlert",props:{border:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["top","end","bottom","start"].includes(e)},borderColor:String,closable:Boolean,closeIcon:{type:L,default:"$close"},closeLabel:{type:String,default:"$vuetify.close"},icon:{type:[Boolean,String,Function,Object],default:null},modelValue:{type:Boolean,default:!0},prominent:Boolean,title:String,text:String,type:{type:String,validator:e=>se.includes(e)},...E(),...z(),...R(),...j(),...w(),...F(),...M(),...O(),...H({variant:"flat"})},emits:{"update:modelValue":e=>!0},setup(e,d){let{slots:t}=d;const o=J(e,"modelValue"),s=n(()=>{var l;if(e.icon!==!1)return e.type?(l=e.icon)!=null?l:`$${e.type}`:e.icon}),v=n(()=>{var l;return{color:(l=e.color)!=null?l:e.type,variant:e.variant}}),{themeClasses:m}=N(e),{colorClasses:y,colorStyles:b,variantClasses:f}=Q(v),{densityClasses:P}=W(e),{dimensionStyles:V}=X(e),{elevationClasses:k}=Y(e),{locationStyles:C}=q(e),{positionClasses:x}=G(e),{roundedClasses:g}=K(e),{textColorClasses:S,textColorStyles:_}=U(Z(e,"borderColor")),{t:$}=p(),r=n(()=>({"aria-label":$(e.closeLabel),onClick(l){o.value=!1}}));return()=>{var l,i;const T=!!(t.prepend||s.value),h=!!(t.title||e.title),B=!!(e.text||t.text),I=!!(t.close||e.closable);return o.value&&a(e.tag,{class:["v-alert",e.border&&{"v-alert--border":!!e.border,[`v-alert--border-${e.border===!0?"start":e.border}`]:!0},{"v-alert--prominent":e.prominent},m.value,y.value,P.value,k.value,x.value,g.value,f.value],style:[b.value,V.value,C.value],role:"alert"},{default:()=>[ee(!1,"v-alert"),e.border&&a("div",{key:"border",class:["v-alert__border",S.value],style:_.value},null),T&&a(u,{key:"prepend",defaults:{VIcon:{density:e.density,icon:s.value,size:e.prominent?44:28}}},{default:()=>[a("div",{class:"v-alert__prepend"},[t.prepend?t.prepend():s.value&&a(te,null,null)])]}),a("div",{class:"v-alert__content"},[h&&a(le,{key:"title"},{default:()=>[t.title?t.title():e.title]}),B&&(t.text?t.text():e.text),(l=t.default)==null?void 0:l.call(t)]),t.append&&a("div",{key:"append",class:"v-alert__append"},[t.append()]),I&&a(u,{key:"close",defaults:{VBtn:{icon:e.closeIcon,size:"x-small",variant:"text"}}},{default:()=>{var c;return[a("div",{class:"v-alert__close"},[(c=(i=t.close)==null?void 0:i.call(t,{props:r.value}))!=null?c:a(ae,r.value,null)])]}})]})}}});export{oe as V,le as a};
