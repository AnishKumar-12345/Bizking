import{x as j,ah as q,W as K,D as V,e as d,aT as Q,H as v,aS as X,J as Y,ai as Z,g as a,R as P,F as I,a4 as _,a5 as ee,bd as te,ag as ae,af as p,al as ne,ae as le,L as oe}from"./index.0a02293b.js";import"./VTextField.a38e65d3.js";import{a as re,b as ie,f as ue,d as se,V as ce,e as de,g as fe}from"./VCounter.0e4a7297.js";const ge=j({name:"VTextarea",directives:{Intersect:q},inheritAttrs:!1,props:{autoGrow:Boolean,autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,hint:String,persistentHint:Boolean,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,noResize:Boolean,rows:{type:[Number,String],default:5,validator:e=>!isNaN(parseFloat(e))},maxRows:{type:[Number,String],validator:e=>!isNaN(parseFloat(e))},suffix:String,...re(),...ie()},emits:{"click:control":e=>!0,"update:modelValue":e=>!0},setup(e,N){let{attrs:y,emit:T,slots:i}=N;const n=K(e,"modelValue"),$=V(()=>typeof e.counterValue=="function"?e.counterValue(n.value):(n.value||"").toString().length),z=V(()=>{if(y.maxlength)return y.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function D(t,l){var o,r;!e.autofocus||!t||(o=l[0].target)==null||(r=o.focus)==null||r.call(o)}const b=d(),x=d(),u=d(!1),R=d(""),m=d(),S=V(()=>u.value||e.persistentPlaceholder),A=V(()=>e.messages.length?e.messages:S.value||e.persistentHint?e.hint:"");function C(){if(m.value!==document.activeElement){var t;(t=m.value)==null||t.focus()}u.value||(u.value=!0)}function G(t){C(),T("click:control",t)}function M(t){t.stopPropagation(),C(),p(()=>{n.value="",ne(e["onClick:clear"],t)})}function U(t){n.value=t.target.value}const s=d();function c(){!e.autoGrow||p(()=>{if(!s.value||!x.value)return;const t=getComputedStyle(s.value),l=getComputedStyle(x.value.$el),o=parseFloat(t.getPropertyValue("--v-field-padding-top"))+parseFloat(t.getPropertyValue("--v-input-padding-top"))+parseFloat(t.getPropertyValue("--v-field-padding-bottom")),r=s.value.scrollHeight,F=parseFloat(t.lineHeight),w=Math.max(parseFloat(e.rows)*F+o,parseFloat(l.getPropertyValue("--v-input-control-height"))),k=parseFloat(e.maxRows)*F+o||1/0;R.value=le(oe(r!=null?r:0,w,k))})}Q(c),v(n,c),v(()=>e.rows,c),v(()=>e.maxRows,c),v(()=>e.density,c);let g;return v(s,t=>{if(t)g=new ResizeObserver(c),g.observe(s.value);else{var l;(l=g)==null||l.disconnect()}}),X(()=>{var t;(t=g)==null||t.disconnect()}),Y(()=>{const t=!!(i.counter||e.counter||e.counterValue),l=!!(t||i.details),[o,r]=Z(y),[{modelValue:F,...w}]=ue(e),[k]=se(e);return a(fe,P({ref:b,modelValue:n.value,"onUpdate:modelValue":f=>n.value=f,class:["v-textarea v-text-field",{"v-textarea--prefixed":e.prefix,"v-textarea--suffixed":e.suffix,"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-textarea--auto-grow":e.autoGrow,"v-textarea--no-resize":e.noResize||e.autoGrow,"v-text-field--flush-details":["plain","underlined"].includes(e.variant)}],"onClick:prepend":e["onClick:prepend"],"onClick:append":e["onClick:append"]},o,w,{messages:A.value}),{...i,default:f=>{let{isDisabled:h,isDirty:H,isReadonly:E,isValid:J}=f;return a(ce,P({ref:x,style:{"--v-textarea-control-height":R.value},"onClick:control":G,"onClick:clear":M,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},k,{active:S.value||H.value,dirty:H.value||e.dirty,focused:u.value,error:J.value===!1}),{...i,default:L=>{let{props:{class:B,...O}}=L;return a(I,null,[e.prefix&&a("span",{class:"v-text-field__prefix"},[e.prefix]),_(a("textarea",P({ref:m,class:B,value:n.value,onInput:U,autofocus:e.autofocus,readonly:E.value,disabled:h.value,placeholder:e.placeholder,rows:e.rows,name:e.name,onFocus:C,onBlur:()=>u.value=!1},O,r),null),[[ee("intersect"),{handler:D},null,{once:!0}]]),e.autoGrow&&_(a("textarea",{class:[B,"v-textarea__sizer"],"onUpdate:modelValue":W=>n.value=W,ref:s,readonly:!0,"aria-hidden":"true"},null),[[te,n.value]]),e.suffix&&a("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:l?f=>{var h;return a(I,null,[(h=i.details)==null?void 0:h.call(i,f),t&&a(I,null,[a("span",null,null),a(de,{active:e.persistentCounter||u.value,value:$.value,max:z.value},i.counter)])])}:void 0})}),ae({},b,x,m)}});export{ge as V};
