import"./rolldown-runtime.CNC7AqOf.js";import{t as e}from"./react.L3lu-Fez.js";import{$a as t,Co as n,Fo as r,Io as i,Jo as a,Mo as o,Oo as s,Po as c,Yo as l,eo as u,hl as d,jo as f,mn as p,ss as m}from"./index2.DDrW0gsH.js";import{t as h}from"./jsx-runtime.zpEpnqWL.js";import{t as g}from"./compiler-runtime.C3NBEG06.js";import{F as _,H as v,Ot as y,R as b,_t as x,kt as S,wt as C}from"./dist.CncQJzJz.js";import"./react.CoBqaK8F.js";import{t as w}from"./client.DwWuAX9z.js";var T=h(),E=g();e(),d(),i(),r(),s(),a(),c(),o(),f(),m(),l(),n(),w();var D=1,O=3,k=S(b).withConfig({displayName:`RootFlex`,componentId:`sc-1y8zfkj-0`})(({theme:e})=>y`
    min-height: 100%;

    @media (max-width: ${e.sanity.media[O]}px) {
      position: relative;
    }
  `),A=S(v).withConfig({displayName:`SidebarMotionLayer`,componentId:`sc-1y8zfkj-1`})(({theme:e})=>{let t=e.sanity.media;return y`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 360px;
    border-left: 1px solid var(--card-border-color);
    box-sizing: border-box;
    overflow: hidden;

    box-shadow:
      0px 6px 8px -4px var(--card-shadow-umbra-color),
      0px 12px 17px -1px var(--card-shadow-penumbra-color);

    @media (max-width: ${t[O]}px) {
      bottom: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    @media (max-width: ${t[D]}px) {
      border-left: 0;
      min-width: 100%;
      left: 0;
    }
  `});function j(e){let t=(0,E.c)(12),n=x(),{state:r}=u(),{isOpen:i}=r,a=n<=D&&i?`hidden`:`auto`,o;t[0]===e?o=t[1]:(o=e.renderDefault(e),t[0]=e,t[1]=o);let s;t[2]!==a||t[3]!==o?(s=(0,T.jsx)(_,{flex:1,height:`fill`,overflow:a,children:o}),t[2]=a,t[3]=o,t[4]=s):s=t[4];let c;t[5]===i?c=t[6]:(c=i&&(0,T.jsx)(A,{zOffset:100,height:`fill`,children:(0,T.jsx)(p,{})}),t[5]=i,t[6]=c);let l;t[7]===c?l=t[8]:(l=(0,T.jsx)(C,{initial:!1,children:c}),t[7]=c,t[8]=l);let d;return t[9]!==s||t[10]!==l?(d=(0,T.jsxs)(k,{sizing:`border`,height:`fill`,children:[s,l]}),t[9]=s,t[10]=l,t[11]=d):d=t[11],d}function M(e){let n=(0,E.c)(4),{enabled:r}=t();if(!r){let t;return n[0]===e?t=n[1]:(t=e.renderDefault(e),n[0]=e,n[1]=t),t}let i;return n[2]===e?i=n[3]:(i=(0,T.jsx)(j,{...e}),n[2]=e,n[3]=i),i}export{M as TasksStudioActiveToolLayout};