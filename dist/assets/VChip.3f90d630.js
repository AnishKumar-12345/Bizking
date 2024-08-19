import{x as A,ax as J,z as N,y as P,O as B,ay as _,a2 as x,C as O,$ as X,Z as C,J as q,g as l,az as H,I as g,aA as K,U,aB as W,N as Z,aC as j,M as Q,aD as Y,aE as ee,aF as ae,X as le,aG as te,aH as se,aI as ne,W as ie,a9 as ue,aJ as oe,a4 as b,a5 as de,aK as ce,au as o,aL as re,u as d,ac as ve,aM as S}from"./index.0a02293b.js";const G=Symbol.for("vuetify:v-chip-group");A({name:"VChipGroup",props:{column:Boolean,filter:Boolean,valueComparator:{type:Function,default:J},...N({selectedClass:"v-chip--selected"}),...P(),...B(),..._({variant:"tonal"})},emits:{"update:modelValue":e=>!0},setup(e,c){let{slots:s}=c;const{themeClasses:r}=x(e),{isSelected:t,select:v,next:f,prev:p,selected:m}=O(e,G);return X({VChip:{color:C(e,"color"),filter:C(e,"filter"),variant:C(e,"variant")}}),q(()=>{var n;return l(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},r.value]},{default:()=>[(n=s.default)==null?void 0:n.call(s,{isSelected:t,select:v,next:f,prev:p,selected:m.value})]})}),{}}});const pe=A({name:"VChip",directives:{Ripple:H},props:{activeClass:String,appendAvatar:String,appendIcon:g,closable:Boolean,closeIcon:{type:g,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:Boolean,pill:Boolean,prependAvatar:String,prependIcon:g,ripple:{type:Boolean,default:!0},text:String,modelValue:{type:Boolean,default:!0},...K(),...U(),...W(),...Z(),...j(),...Q(),...Y(),...P({tag:"span"}),...B(),..._({variant:"tonal"})},emits:{"click:close":e=>!0,"update:active":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0},setup(e,c){let{attrs:s,emit:r,slots:t}=c;const{borderClasses:v}=ee(e),{colorClasses:f,colorStyles:p,variantClasses:m}=ae(e),{densityClasses:n}=le(e),{elevationClasses:D}=te(e),{roundedClasses:$}=se(e),{sizeClasses:z}=ne(e),{themeClasses:R}=x(e),k=ie(e,"modelValue"),a=ue(e,G,!1),h=oe(e,s);function E(i){k.value=!1,r("click:close",i)}return()=>{var i;const T=h.isLink.value?"a":e.tag,F=!!(t.append||e.appendIcon||e.appendAvatar),L=!!(t.close||e.closable),V=!!(t.filter||e.filter)&&a,M=!!(t.prepend||e.prependIcon||e.prependAvatar),y=!a||a.isSelected.value,u=!e.disabled&&(!!a||h.isClickable.value||e.link),w=e.link?e.link:a==null?void 0:a.toggle;return k.value&&b(l(T,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":u,"v-chip--filter":V,"v-chip--pill":e.pill},R.value,v.value,y?f.value:void 0,n.value,D.value,$.value,z.value,m.value,a==null?void 0:a.selectedClass.value],style:[y?p.value:void 0],disabled:e.disabled||void 0,draggable:e.draggable,href:h.href.value,onClick:u&&w},{default:()=>{var I;return[ce(u,"v-chip"),V&&l(o,{key:"filter",defaults:{VIcon:{icon:e.filterIcon}}},{default:()=>[l(re,null,{default:()=>[b(l("div",{class:"v-chip__filter"},[t.filter?t.filter():l(d,null,null)]),[[ve,a.isSelected.value]])]})]}),M&&l(o,{key:"prepend",defaults:{VAvatar:{image:e.prependAvatar},VIcon:{icon:e.prependIcon}}},{default:()=>[t.prepend?l("div",{class:"v-chip__prepend"},[t.prepend()]):e.prependAvatar?l(S,{start:!0},null):e.prependIcon?l(d,{start:!0},null):void 0]}),(I=(i=t.default)==null?void 0:i.call(t,{isSelected:a==null?void 0:a.isSelected.value,selectedClass:a==null?void 0:a.selectedClass.value,select:a==null?void 0:a.select,toggle:a==null?void 0:a.toggle,value:a==null?void 0:a.value.value,disabled:e.disabled}))!=null?I:e.text,F&&l(o,{key:"append",defaults:{VAvatar:{image:e.appendAvatar},VIcon:{icon:e.appendIcon}}},{default:()=>[t.append?l("div",{class:"v-chip__append"},[t.append()]):e.appendAvatar?l(S,{end:!0},null):e.appendIcon?l(d,{end:!0},null):void 0]}),L&&l(o,{key:"close",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},{default:()=>[l("div",{class:"v-chip__close",onClick:E},[t.close?t.close():l(d,null,null)])]})]}}),[[de("ripple"),u&&e.ripple,null]])}}});export{pe as V};
