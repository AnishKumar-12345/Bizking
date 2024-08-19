import{x as R,I as b,W as k,aw as U,D as i,a6 as q,Z as y,J as h,g as v,am as G,ax as z,O as J,U as N,a1 as Q,az as W,e as S,ai as X,a4 as Z,a5 as H,u as K,R as g,a8 as Y,X as p,av as w,P as ee,a_ as D,Q as le}from"./index.0a02293b.js";import{h as ne}from"./VCounter.0e4a7297.js";const T=Symbol.for("vuetify:selection-control-group");R({name:"VSelectionControlGroup",props:{disabled:Boolean,id:String,inline:Boolean,name:String,falseIcon:b,trueIcon:b,multiple:{type:Boolean,default:null},readonly:Boolean,type:String,modelValue:null},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:s}=l;const n=k(e,"modelValue"),o=U(),t=i(()=>e.id||`v-selection-control-group-${o}`),c=i(()=>e.name||t.value);return q(T,{disabled:y(e,"disabled"),inline:y(e,"inline"),modelValue:n,multiple:i(()=>!!e.multiple||e.multiple==null&&Array.isArray(n.value)),name:c,falseIcon:y(e,"falseIcon"),trueIcon:y(e,"trueIcon"),readonly:y(e,"readonly"),type:y(e,"type")}),h(()=>{var a;return v("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline}],"aria-labelled-by":e.type==="radio"?t.value:void 0,role:e.type==="radio"?"radiogroup":void 0},[(a=s.default)==null?void 0:a.call(s)])}),{}}});const j=G({color:String,disabled:Boolean,error:Boolean,id:String,inline:Boolean,label:String,falseIcon:b,trueIcon:b,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:Boolean,trueValue:null,falseValue:null,modelValue:null,type:String,value:null,valueComparator:{type:Function,default:z},...J(),...N()});function te(e){const l=Y(T,void 0),{densityClasses:s}=p(e),n=k(e,"modelValue"),o=i(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),t=i(()=>e.falseValue!==void 0?e.falseValue:!1),c=i(()=>(l==null?void 0:l.multiple.value)||!!e.multiple||e.multiple==null&&Array.isArray(n.value)),a=i({get(){const r=l?l.modelValue.value:n.value;return c.value?r.some(u=>e.valueComparator(u,o.value)):e.valueComparator(r,o.value)},set(r){if(e.readonly)return;const u=r?o.value:t.value;let d=u;c.value&&(d=r?[...w(n.value),u]:w(n.value).filter(V=>!e.valueComparator(V,o.value))),l?l.modelValue.value=d:n.value=d}}),{textColorClasses:m,textColorStyles:I}=ee(i(()=>a.value&&!e.error&&!e.disabled?e.color:void 0)),C=i(()=>{var r,u;return a.value?(r=l==null?void 0:l.trueIcon.value)!=null?r:e.trueIcon:(u=l==null?void 0:l.falseIcon.value)!=null?u:e.falseIcon});return{group:l,densityClasses:s,trueValue:o,falseValue:t,model:a,textColorClasses:m,textColorStyles:I,icon:C}}const ae=Q()({name:"VSelectionControl",directives:{Ripple:W},inheritAttrs:!1,props:j(),emits:{"update:modelValue":e=>!0},setup(e,l){let{attrs:s,slots:n}=l;const{densityClasses:o,group:t,icon:c,model:a,textColorClasses:m,textColorStyles:I,trueValue:C}=te(e),r=U(),u=i(()=>e.id||`input-${r}`),d=S(!1),V=S(!1),x=S();function B(f){d.value=!0,(!D||D&&f.target.matches(":focus-visible"))&&(V.value=!0)}function P(){d.value=!1,V.value=!1}function E(f){a.value=f.target.checked}return h(()=>{var F,O;var f,_;const A=n.label?n.label({label:e.label,props:{for:u.value}}):e.label,$=(F=t==null?void 0:t.type.value)!=null?F:e.type,[L,M]=X(s);return v("div",g({class:["v-selection-control",{"v-selection-control--dirty":a.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":d.value,"v-selection-control--focus-visible":V.value,"v-selection-control--inline":(t==null?void 0:t.inline.value)||e.inline},o.value]},L),[v("div",{class:["v-selection-control__wrapper",m.value],style:I.value},[(f=n.default)==null?void 0:f.call(n),Z(v("div",{class:["v-selection-control__input"]},[c.value&&v(K,{key:"icon",icon:c.value},null),v("input",g({ref:x,checked:a.value,disabled:e.disabled,id:u.value,onBlur:P,onFocus:B,onInput:E,"aria-readonly":e.readonly,type:$,value:C.value,name:(O=t==null?void 0:t.name.value)!=null?O:e.name,"aria-checked":$==="checkbox"?a.value:void 0},M),null),(_=n.input)==null?void 0:_.call(n,{model:a,textColorClasses:m,props:{onFocus:B,onBlur:P,id:u.value}})]),[[H("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),A&&v(ne,{for:u.value},{default:()=>[A]})])}),{isFocused:d,input:x}}}),oe=G({indeterminate:Boolean,indeterminateIcon:{type:b,default:"$checkboxIndeterminate"},...j({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})}),ue=R({name:"VCheckboxBtn",props:oe(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,l){let{slots:s,emit:n}=l;const o=k(e,"indeterminate");function t(m){o.value&&(o.value=!1),n("update:modelValue",m)}const c=i(()=>e.indeterminate?e.indeterminateIcon:e.falseIcon),a=i(()=>e.indeterminate?e.indeterminateIcon:e.trueIcon);return h(()=>v(ae,g(e,{class:"v-checkbox-btn",type:"checkbox",inline:!0,"onUpdate:modelValue":t,falseIcon:c.value,trueIcon:a.value,"aria-checked":e.indeterminate?"mixed":void 0}),s)),{}}});function ce(e){return le(e,Object.keys(ue.props))}export{ue as V,ce as f,oe as m};
