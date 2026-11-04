import{l as qt,n as kt,p as Yt,r as x,M as vt,q as Qt,t as Ct,v as St,x as Me,c as M,j as e,y as ce,z as w,A as de,E as $,F as Y,G as Zt,H as Jt,d as I,w as Kt,i as it,u as H,I as Ye,J as Mt,C as rt,X as Qe,e as be,K as We,L as es,N as ts,O as ss,P as as,Q as ns,R as De,B as is,o as rs,S as At,T as ls,D as os}from"./index-CVLljmmv.js";import{L as oe}from"./loader-circle-DN6uYraU.js";import{S as cs}from"./search-jow8XQHv.js";import{S as ds}from"./sparkles-Co_2M5nk.js";import{C as ae}from"./check-BS3qalfJ.js";import{h as xs,u as Be,d as hs,f as us,n as ms,a as ps,e as K,p as gs,C as fs,c as bs}from"./CatFace-CbD7fJJW.js";import{D as js}from"./download-BBs_Qca8.js";import{P as Ze}from"./play-j_2k2-ao.js";import{M as ws}from"./feed-oeDbU_yY.js";import{_ as ys,y as Ns,i as lt,s as ks,a1 as vs,M as F,j as Cs,Z as Ss,a0 as Ms,k as ot}from"./three.module-CUjkK1mn.js";import{P as Tt}from"./plus-vk532uRI.js";import{a as Et}from"./index-C-avJtwM.js";function As(...t){const s=!Array.isArray(t[0]),a=s?0:-1,n=t[0+a],i=t[1+a],l=t[2+a],o=t[3+a],r=qt(i,l,o);return s?r(n):r}function we(t){const s=kt(()=>Yt(t)),{isStatic:a}=x.useContext(vt);if(a){const[,n]=x.useState(t);x.useEffect(()=>s.on("change",n),[])}return s}function Pt(t,s){const a=we(s()),n=()=>a.set(s());return n(),Qt(()=>{const i=()=>St.preRender(n,!1,!0),l=t.map(o=>o.on("change",i));return()=>{l.forEach(o=>o()),Ct(n)}}),a}function Ts(t){Me.current=[],t();const s=Pt(Me.current,t);return Me.current=void 0,s}function k(t,s,a,n){if(typeof t=="function")return Ts(t);const l=typeof s=="function"?s:As(s,a,n),o=Array.isArray(t)?ct(t,l):ct([t],([h])=>l(h)),r=Array.isArray(t)?void 0:t.accelerate;return r&&!r.isTransformed&&typeof s!="function"&&Array.isArray(a)&&(n==null?void 0:n.clamp)!==!1&&(o.accelerate={...r,times:[0,...s,1],keyframes:[a[0],...a,a[a.length-1]],isTransformed:!0}),o}function ct(t,s){const a=kt(()=>[]);return Pt(t,()=>{a.length=0;const n=t.length;for(let i=0;i<n;i++)a[i]=t[i].get();return s(a)})}function Es(t){const s=x.useRef(0),{isStatic:a}=x.useContext(vt);x.useEffect(()=>{if(a)return;const n=({timestamp:i,delta:l})=>{s.current||(s.current=i),t(i-s.current,l)};return St.update(n,!0),()=>Ct(n)},[t])}function Ps(){const t=we(0);return Es(s=>t.set(s)),t}/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=M("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=M("ArrowUpRight",[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fs=M("Cat",[["path",{d:"M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z",key:"x6xyqk"}],["path",{d:"M8 14v.5",key:"1nzgdb"}],["path",{d:"M16 14v.5",key:"1lajdz"}],["path",{d:"M11.25 16.25h1.5L12 17l-.75-.75Z",key:"12kq1m"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $s=M("ClipboardList",[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=M("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ft=M("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ls=M("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _s=M("Grid3x3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Is=M("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=M("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt=M("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rs=M("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ws=M("Package",[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["path",{d:"m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7",key:"yx3hmr"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ds=M("Printer",[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _t=M("RotateCcw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bs=M("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=M("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Os=M("Truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=M("UserRound",[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]]),me="https://www.instagram.com/pradip.png/",Ae={avatar:"/instagram/avatar.webp",posts:[{image:"/instagram/1.webp",link:me,kind:"album",alt:"A birthday cake with candles spelling happy birthday"},{image:"/instagram/2.webp",link:me,kind:"photo",alt:"Me on the rocks by the sea on a sunny day"},{image:"/instagram/3.webp",link:me,kind:"photo",alt:"Me at the water's edge at sunset"},{image:"/instagram/4.webp",link:me,kind:"photo",alt:"Me smiling at a café table with two coffees"}]},dt=3500;function Wt({url:t,title:s,poster:a,embedOnlyOn:n,width:i=1280,hold:l=!1}){const o=x.useRef(null),[r,h]=x.useState({w:0,h:0}),[c,d]=x.useState("loading"),f=!!n&&!n.includes(window.location.origin),p=t.replace(/^https?:\/\/(www\.)?/,"").replace(/\/$/,"");x.useEffect(()=>{const u=o.current;if(!u)return;const b=new ResizeObserver(([C])=>h({w:C.contentRect.width,h:C.contentRect.height}));return b.observe(u),()=>b.disconnect()},[]),x.useEffect(()=>{if(d("loading"),l)return;const u=window.setTimeout(()=>d(b=>b==="loading"?"live":b),dt);return()=>window.clearTimeout(u)},[t,l]),x.useEffect(()=>{if(c!=="live")return;const u=window.setTimeout(()=>d("settled"),3200);return()=>window.clearTimeout(u)},[c]);const j=c!=="loading",y=r.w>0?Math.min(1,r.w/i):1;return e.jsxs("div",{ref:o,"data-lenis-prevent":!0,className:"relative h-full w-full overflow-hidden bg-white",children:[a&&e.jsx("img",{src:a,alt:"",className:`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${j&&!f?"opacity-0":"opacity-100"}`}),f?e.jsx("div",{className:"absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/30 to-transparent p-6",children:e.jsxs("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"btn btn-dark shadow-lg",children:["Open the live site ",e.jsx(Ne,{className:"h-4 w-4","aria-hidden":"true"})]})}):r.w>0&&!l&&e.jsx("iframe",{src:t,title:`${s}, the live site`,onLoad:()=>d(u=>u==="loading"?"live":u),referrerPolicy:"strict-origin-when-cross-origin",sandbox:"allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox",className:`absolute left-0 top-0 origin-top-left border-0 bg-white transition-opacity duration-500 ${j?"opacity-100":"opacity-0"}`,style:{width:r.w/y,height:r.h/y,transform:y<1?`scale(${y})`:void 0}},t),!f&&e.jsx("div",{className:`pointer-events-none absolute inset-0 grid place-items-center bg-white/65 transition-opacity duration-500 ${j?"opacity-0":"opacity-100"}`,"aria-hidden":j,children:e.jsxs("div",{className:"mx-4 w-full max-w-[19rem] rounded-2xl bg-white p-5 text-center shadow-[0_10px_40px_-12px_rgba(0,0,0,0.3)] ring-1 ring-black/5",children:[e.jsxs("p",{className:"flex items-center justify-center gap-2 text-[15px] font-semibold",children:[e.jsx(oe,{className:"h-4 w-4 animate-spin text-accent","aria-hidden":"true"})," Loading the live site"]}),e.jsx("p",{className:"mt-1 truncate text-[13px] text-muted",children:p}),e.jsx("div",{className:"mt-4 h-1 overflow-hidden rounded-full bg-black/[0.06]",children:e.jsx("div",{className:"h-full rounded-full bg-accent transition-[width] ease-out",style:{width:j?"100%":"0%",transitionDuration:j?"300ms":`${dt}ms`},ref:u=>{u&&!j&&requestAnimationFrame(()=>u.style.width="90%")}})}),e.jsx("p",{className:"mt-3 text-[12px] leading-snug text-muted",children:"This is the real site, not a picture. It takes a few seconds."})]})}),c==="live"&&!f&&e.jsx("div",{className:"pointer-events-none absolute inset-x-0 bottom-4 flex justify-center",children:e.jsxs("span",{className:"inline-flex items-center gap-2 rounded-full bg-fg/90 px-4 py-2 text-[13px] font-medium text-bg shadow-lg backdrop-blur",children:[e.jsx("span",{className:"h-2 w-2 rounded-full bg-emerald-400","aria-hidden":"true"})," Live. Scroll and click around."]})})]})}function Dt({width:t,height:s,scale:a,children:n}){return e.jsx("div",{className:"@container absolute left-0 top-0 origin-top-left",style:{width:t,height:s,transform:`scale(${a})`},children:n})}function zs({width:t,height:s,children:a}){const n=x.useRef(null),[i,l]=x.useState({w:0,h:0});x.useEffect(()=>{const r=n.current;if(!r)return;const h=new ResizeObserver(([c])=>l({w:c.contentRect.width,h:c.contentRect.height}));return h.observe(r),()=>h.disconnect()},[]);const o=Math.min(i.w/t,i.h/s);return e.jsx("div",{ref:n,className:"absolute inset-0 grid place-items-center bg-surface p-4",children:o>0&&e.jsx("div",{className:"relative overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5",style:{width:t*o,height:s*o},children:e.jsx(Dt,{width:t,height:s,scale:o,children:a})})})}const Hs=({className:t="w-5 h-5"})=>e.jsxs("svg",{viewBox:"0 0 48 48",className:t,"aria-hidden":"true",children:[e.jsx("path",{fill:"#4285F4",d:"M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"}),e.jsx("path",{fill:"#34A853",d:"M6.3 14.7l7 5.1C15.1 15.1 19.2 12 24 12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 15.1 2 7.5 7.4 4.3 14.7z"}),e.jsx("path",{fill:"#FBBC04",d:"M24 46c5.4 0 10.5-2.1 14.3-5.6l-6.6-5.4c-2 1.5-4.7 2.5-7.7 2.5-6 0-11.1-3.7-13.1-9l-6.7 5.2C7.5 40.2 15 46 24 46z"}),e.jsx("path",{fill:"#EA4335",d:"M44.5 20H24v8.5h11.8c-.6 2.7-2.1 4.9-4.1 6.5l6.6 5.4C42.4 36.4 45 30.7 45 24c0-1.3-.2-2.7-.5-4z"})]}),Te=async(t,s,{retries:a=1,backoffMs:n=600}={})=>{for(let i=0;i<=a;i++)try{const l=await fetch(t,s);if(!l.ok&&l.status>=500&&i<a){await new Promise(o=>setTimeout(o,n*(i+1)));continue}return l}catch(l){if(l.name==="AbortError")throw l;if(i<a){await new Promise(o=>setTimeout(o,n*(i+1)));continue}throw l}throw new Error("Network unavailable")},Ee=[{id:"restaurant",label:"Restaurant",reviewer:"Sarah M.",stars:5,review:"Best Italian food in town. The pasta was perfect and the staff were so friendly.",replies:{friendly:"Thanks so much, Sarah! We're thrilled you loved the pasta and the team. See you again soon.",professional:"Thank you for your review, Sarah. We appreciate your feedback and look forward to serving you again.",luxury:"We are delighted to hear you enjoyed the experience, Sarah. It would be our pleasure to welcome you back."}},{id:"salon",label:"Hair salon",reviewer:"Emily R.",stars:5,review:"Loved the cut and the color. The team listened and nailed the style.",replies:{friendly:"Thanks Emily! We're so happy you loved the result. See you next time.",professional:"Thank you, Emily. We appreciate your feedback and are glad the style matched your vision.",luxury:"We are thrilled you loved your look, Emily. We would be delighted to welcome you back soon."}},{id:"hotel",label:"Hotel",reviewer:"Nina V.",stars:2,review:"The room was clean but check-in took too long and the noise at night made it hard to sleep.",replies:{friendly:"Thanks for the honest feedback, Nina. We're sorry about the delays and noise. We're already working on it.",professional:"Thank you, Nina. We apologize for the check-in delay and noise issues. Our team is addressing this immediately.",luxury:"We are truly sorry your stay fell short, Nina. Please accept our apologies and allow us to make it right."}}],Us=["friendly","professional","luxury"];function Vs(t){const s=ce(),[a,n]=x.useState(0);return x.useEffect(()=>{if(!t)return n(0);if(s)return n(t.length);n(0);const i=Math.max(1,Math.round(t.length/60)),l=window.setInterval(()=>{n(o=>(o+i>=t.length&&window.clearInterval(l),Math.min(t.length,o+i)))},18);return()=>window.clearInterval(l)},[t,s]),t?t.slice(0,a):""}const Pe=async(t,s)=>{try{return await t.json()}catch{throw new Error(s)}},Bt=t=>t.split(" ").map(s=>s[0]).join("").slice(0,2),Gs=()=>{var at,nt;const[t,s]=x.useState("sample"),[a,n]=x.useState("friendly"),[i,l]=x.useState("restaurant"),o=Ee.find(m=>m.id===i)??Ee[0],[r,h]=x.useState(""),[c,d]=x.useState([]),[f,p]=x.useState(!1),[j,y]=x.useState(null),[u,b]=x.useState(null),[C,N]=x.useState(!1),[T,E]=x.useState(null),[B,S]=x.useState(null),[P,L]=x.useState(null),[xe,_]=x.useState(!1),[ne,Q]=x.useState(null),[R,O]=x.useState(!1),G=Vs(P),X=x.useRef(0),ie=x.useMemo(()=>((u==null?void 0:u.reviews)??[]).filter(m=>m.text&&m.text.trim()).sort((m,A)=>m.text.length-A.text.length).slice(0,3),[u]),Z=ie.find(m=>m.id===B)??null,W=()=>{X.current++,L(null),_(!1),Q(null),O(!1)};x.useEffect(()=>{if(t!=="live"||u)return;const m=r.trim();if(m.length<2){d([]),y(null),p(!1);return}const A=new AbortController,z=window.setTimeout(async()=>{try{p(!0),y(null);const J=await Te(`/api/places-autocomplete?input=${encodeURIComponent(m)}`,{signal:A.signal}),Se=await Pe(J,"Couldn't search right now. Try a sample review instead.");if(!J.ok||Se.error)throw new Error(Se.error||"Couldn't search right now.");d(Se.predictions||[])}catch(J){if(J.name==="AbortError")return;y(J instanceof Error?J.message:"Couldn't search right now."),d([])}finally{p(!1)}},250);return()=>{window.clearTimeout(z),A.abort()}},[r,t,u]);const he=async m=>{d([]),h(m.primaryText),S(null),W();try{N(!0),E(null);const A=await Te(`/api/place-details?placeId=${encodeURIComponent(m.placeId)}`),z=await Pe(A,"Couldn't load that business. Try another one.");if(!A.ok||z.error)throw new Error(z.error||"Couldn't load that business.");b(z.place)}catch(A){E(A instanceof Error?A.message:"Couldn't load that business."),b(null)}finally{N(!1)}},Ce=()=>{b(null),h(""),S(null),E(null),W()},g=async()=>{W();const m=++X.current;if(_(!0),t==="sample"){await new Promise(A=>setTimeout(A,500)),m===X.current&&L(o.replies[a]),_(!1);return}if(!u||!Z)return _(!1);try{const A=await Te("/api/review-reply",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({businessName:u.name,reviewText:Z.text,rating:Z.rating,tone:a})}),z=await Pe(A,"Couldn't write a reply right now. Try again in a moment.");if(!A.ok||z.error)throw new Error(z.error||"Couldn't write a reply right now.");m===X.current&&L(z.reply)}catch(A){m===X.current&&Q(A instanceof Error?A.message:"Couldn't write a reply right now.")}finally{m===X.current&&_(!1)}},v=()=>{var m;P&&((m=navigator.clipboard)==null||m.writeText(P).catch(()=>{}),O(!0),window.setTimeout(()=>O(!1),1500))},ue=t==="sample"||!!Z;return e.jsx("div",{className:"min-h-full bg-white font-sans text-fg",children:e.jsxs("div",{className:"mx-auto max-w-5xl px-5 py-6 @md:px-8 @md:py-8",children:[e.jsxs("header",{className:"flex flex-wrap items-center justify-between gap-4",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"text-[24px] font-semibold tracking-tight @md:text-[28px]",children:["Easy",e.jsx("span",{className:"text-accent",children:"ReviewReply"})]}),e.jsx("p",{className:"text-[14px] text-muted",children:"Replies to Google reviews that sound like you."})]}),e.jsx(Fe,{label:"Where the review comes from",value:t,onChange:m=>{s(m),W()},options:[{value:"sample",label:"Sample reviews"},{value:"live",label:"Your business"}]})]}),e.jsxs("div",{className:"mt-6 grid gap-5 @md:grid-cols-[1.1fr_1fr] @md:gap-6",children:[e.jsxs("div",{className:"space-y-5",children:[t==="sample"?e.jsxs(e.Fragment,{children:[e.jsx(ee,{n:1,title:"Pick a business",children:e.jsx(Fe,{label:"Sample business",value:i,onChange:m=>{l(m),W()},options:Ee.map(m=>({value:m.id,label:m.label})),full:!0})}),e.jsx(ee,{n:2,title:"The review",children:e.jsx(xt,{author:o.reviewer,rating:o.stars,text:o.review,meta:"on Google"})})]}):e.jsxs(e.Fragment,{children:[e.jsx(ee,{n:1,title:"Find your business",children:u?e.jsxs("div",{className:"flex items-center gap-3 rounded-2xl bg-surface p-3",children:[(at=u.photos)!=null&&at[0]?e.jsx("img",{src:`/api/place-photo?ref=${encodeURIComponent(u.photos[0].ref)}&w=200`,alt:"",className:"h-12 w-12 shrink-0 rounded-xl object-cover"}):e.jsx("span",{className:"grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-[15px] font-semibold",children:Bt(u.name)}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"truncate text-[15px] font-semibold",children:u.name}),e.jsxs("p",{className:"flex items-center gap-1 text-[13px] text-muted",children:[e.jsx(It,{className:"h-3.5 w-3.5 fill-amber-400 text-amber-400","aria-hidden":"true"}),((nt=u.rating)==null?void 0:nt.toFixed(1))??"No rating",u.reviewCount!=null&&` · ${u.reviewCount.toLocaleString()} reviews`]})]}),e.jsx("button",{type:"button",onClick:Ce,className:"text-[13px] font-medium text-accent hover:underline",children:"Change"})]}):e.jsxs("div",{children:[e.jsxs("label",{className:"flex items-center gap-2 rounded-2xl bg-surface px-4 py-3 ring-accent focus-within:ring-2",children:[e.jsx(cs,{className:"h-4 w-4 shrink-0 text-muted","aria-hidden":"true"}),e.jsx("input",{type:"text",value:r,onChange:m=>h(m.target.value),placeholder:"Search any business on Google","aria-label":"Search for a business",className:"w-full bg-transparent text-[15px] outline-none placeholder:text-muted focus-visible:ring-0 focus-visible:ring-offset-0"}),(f||C)&&e.jsx(oe,{className:"h-4 w-4 animate-spin text-muted","aria-hidden":"true"})]}),c.length>0&&e.jsx("ul",{className:"mt-2 divide-y divide-line overflow-hidden rounded-2xl ring-1 ring-black/[0.06]",children:c.slice(0,5).map(m=>e.jsx("li",{children:e.jsxs("button",{type:"button",onClick:()=>he(m),className:"flex w-full items-start gap-2.5 px-4 py-2.5 text-left hover:bg-surface",children:[e.jsx(Rs,{className:"mt-0.5 h-4 w-4 shrink-0 text-muted","aria-hidden":"true"}),e.jsxs("span",{className:"min-w-0",children:[e.jsx("span",{className:"block truncate text-[14px] font-medium",children:m.primaryText}),m.secondaryText&&e.jsx("span",{className:"block truncate text-[12px] text-muted",children:m.secondaryText})]})]})},m.placeId))}),(j||T)&&e.jsx("p",{className:"mt-2 text-[13px] text-rose-600",children:j||T}),!f&&r.trim().length>=2&&c.length===0&&!j&&!C&&e.jsx("p",{className:"mt-2 text-[13px] text-muted",children:"No businesses found."}),e.jsxs("p",{className:"mt-2 flex items-center gap-1.5 text-[12px] text-muted",children:[e.jsx(Hs,{className:"h-3.5 w-3.5"})," Live from Google Places"]})]})}),e.jsx(ee,{n:2,title:"Pick a review",dim:!u,children:u?ie.length===0?e.jsx("p",{className:"rounded-2xl bg-surface px-4 py-5 text-[14px] text-muted",children:"This business has no public reviews yet."}):e.jsx("ul",{className:"space-y-2",role:"radiogroup","aria-label":"Reviews",children:ie.map(m=>e.jsx("li",{children:e.jsx("button",{type:"button",role:"radio","aria-checked":B===m.id,onClick:()=>{S(m.id),W()},className:`w-full rounded-2xl text-left ring-1 transition-shadow ${B===m.id?"ring-2 ring-accent":"ring-black/[0.06] hover:ring-black/20"}`,children:e.jsx(xt,{author:m.author,photo:m.authorPhoto,rating:m.rating,text:m.text,meta:m.relativeTime,bare:!0})})},m.id))}):e.jsx("p",{className:"rounded-2xl bg-surface px-4 py-5 text-[14px] text-muted",children:"Its latest reviews show here."})})]}),e.jsx(ee,{n:3,title:"Pick a tone",children:e.jsx(Fe,{label:"Tone",value:a,onChange:m=>{n(m),W()},options:Us.map(m=>({value:m,label:m[0].toUpperCase()+m.slice(1)})),full:!0})})]}),e.jsxs(ee,{n:4,title:"Get the reply",className:"@md:sticky @md:top-4 @md:self-start",children:[e.jsxs("div",{className:"rounded-2xl bg-surface p-5",children:[e.jsx("div",{className:"min-h-[132px]","aria-live":"polite",children:P?e.jsxs(e.Fragment,{children:[e.jsxs("p",{className:"text-[12px] font-medium text-muted",children:["Reply · ",a,t==="live"?" · written by OpenAI just now":" · sample"]}),e.jsxs("p",{className:"mt-2 text-[17px] leading-relaxed",children:[G,G.length<P.length&&e.jsx("span",{className:"ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 animate-pulse bg-accent"})]})]}):xe?e.jsxs("p",{className:"flex items-center gap-2 text-[15px] text-muted",children:[e.jsx(oe,{className:"h-4 w-4 animate-spin","aria-hidden":"true"})," Writing a reply"]}):ne?e.jsx("p",{className:"text-[14px] text-rose-600",children:ne}):e.jsx("p",{className:"text-[15px] text-muted",children:ue?"Your reply appears here, in 50 words or fewer.":"Pick a review first."})}),e.jsxs("div",{className:"mt-4 flex flex-wrap gap-2",children:[e.jsxs("button",{type:"button",onClick:g,disabled:!ue||xe,className:"btn btn-primary disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-muted",children:[P?e.jsx(_t,{className:"h-4 w-4","aria-hidden":"true"}):e.jsx(ds,{className:"h-4 w-4","aria-hidden":"true"}),P?"Write another":"Write the reply"]}),P&&e.jsxs("button",{type:"button",onClick:v,className:"btn bg-white text-fg ring-1 ring-black/[0.08] hover:bg-white/70",children:[R?e.jsx(ae,{className:"h-4 w-4 text-emerald-600","aria-hidden":"true"}):e.jsx(Je,{className:"h-4 w-4","aria-hidden":"true"}),R?"Copied":"Copy"]})]})]}),e.jsx("p",{className:"mt-3 text-[13px] leading-snug text-muted",children:t==="sample"?"Sample replies are written in advance. Switch to Your business for a live one.":"Live replies come from OpenAI with a capped cost per request. Nothing is posted to Google."})]})]})]})})};function ee({n:t,title:s,dim:a=!1,className:n="",children:i}){return e.jsxs("section",{className:`${a?"opacity-60":""} ${n}`,children:[e.jsxs("h4",{className:"mb-2.5 flex items-center gap-2 text-[14px] font-semibold",children:[e.jsx("span",{className:"grid h-5 w-5 place-items-center rounded-full bg-fg text-[11px] text-bg",children:t}),s]}),i]})}function Fe({label:t,value:s,onChange:a,options:n,full:i=!1}){return e.jsx("div",{role:"radiogroup","aria-label":t,className:`inline-flex rounded-full bg-surface p-1 ${i?"flex w-full":""}`,children:n.map(l=>e.jsx("button",{type:"button",role:"radio","aria-checked":s===l.value,onClick:()=>a(l.value),className:`flex-1 whitespace-nowrap rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${s===l.value?"bg-white text-fg shadow-sm ring-1 ring-black/5":"text-muted hover:text-fg"}`,children:l.label},l.value))})}function xt({author:t,photo:s,rating:a,text:n,meta:i,bare:l=!1}){return e.jsxs("div",{className:`p-4 ${l?"":"rounded-2xl bg-white ring-1 ring-black/[0.06]"}`,children:[e.jsxs("div",{className:"flex items-center gap-3",children:[s?e.jsx("img",{src:s,alt:"",className:"h-9 w-9 shrink-0 rounded-full object-cover"}):e.jsx("span",{className:"grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface text-[13px] font-semibold",children:Bt(t)}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"truncate text-[14px] font-semibold",children:t}),e.jsxs("div",{className:"flex items-center gap-1.5",children:[e.jsx("span",{className:"flex gap-0.5","aria-label":`${a} out of 5 stars`,children:Array.from({length:5},(o,r)=>e.jsx(It,{className:`h-3 w-3 ${r<a?"fill-amber-400 text-amber-400":"text-black/15"}`,"aria-hidden":"true"},r))}),i&&e.jsx("span",{className:"text-[12px] text-muted",children:i})]})]})]}),e.jsx("p",{className:"mt-2.5 text-[14px] leading-relaxed text-fg/85",children:n})]})}const Xs=[{group:"Front end",items:["React","TypeScript","JavaScript"]},{group:"Back end",items:["Node.js","Express","PHP","REST APIs"]},{group:"Sites & stores",items:["WordPress","WooCommerce"]},{group:"Data",items:["PostgreSQL","Prisma","MySQL"]},{group:"Money",items:["Stripe","Xero"]},{group:"Phones",items:["Twilio","Google APIs"]},{group:"Hardware",items:["Android tablets","Thermal printers","Barcode scanners","NFC"]}],se=[{org:"Shine Motor",title:"Accounts & System Automation Specialist",place:"Ingleburn, NSW",start:"2026-08",note:"I look after every system the yard runs on, and I built them.",built:["The website that brings sellers to the yard, with a price guide the team updates themselves","The docket and invoice system the counter runs on all day, on tablets that print receipts","Bills, purchase orders and invoices that post to Xero on their own, and never twice","Nightly backups that restore themselves to prove they work"],stack:["React","Node.js","Express","PostgreSQL","Prisma","Xero","Android tablets","Thermal printers"],project:"shine-motor"},{org:"IPMA Australia",title:"Web developer, freelance",place:"Sydney",start:"2025-10",note:"A training platform for pain medicine specialists, and the store behind its workshops.",built:["Workshop registration from start to finish: accounts, checkout and confirmation emails","Procedure pages laid out the way clinicians learn, with video and diagrams","Custom plugins for events and teaching material, and updates ever since launch"],stack:["WordPress","WooCommerce","PHP","MySQL","Stripe"],project:"ipma"},{org:"Global Psychics Association",title:"Front-end developer",place:"Sydney",start:"2025-05",end:"2026-05",note:"A spiritual services platform built from nothing, bookable by phone as well as online.",built:["The marketplace, workshops, events and readers' portals","A phone line that answers, routes calls and books readings, with SMS follow-ups","Live phone top-ups that land in one dashboard","Stripe payments and Google Calendar scheduling"],stack:["React","TypeScript","Node.js","REST APIs","Twilio","Stripe","Google APIs"],project:"global-psychics"},{org:"Tap2Access",title:"Lead developer, NFC",place:"Sydney",start:"2024-06",end:"2025-10",note:"A platform that puts a profile on an NFC tag or QR code, ready to share with a tap.",built:["Profiles for business, pets, medical details and socials","A tool that programs the cards and tags, with no special kit needed","Contact cards that save straight to a phone, plus the admin side"],stack:["WordPress","PHP","JavaScript","MySQL","NFC"]},{org:"Down Under Wholesalers",title:"Web developer & e-commerce specialist",place:"Sydney",start:"2024-01",end:"2026-05",note:"A wholesaler selling through four online stores, all from one warehouse.",built:["Stock that stays in sync across three retail stores and the wholesale site","The warehouse system the team picks, packs and ships with every day, barcodes and all","Plugins for invoices, packing slips, barcode scanning and auctions","Trade and retail accounts, each with its own prices"],stack:["WordPress","WooCommerce","PHP","JavaScript","MySQL","REST APIs","Barcode scanners"],project:"down-under"}],qs=[{school:"Kaplan Business School",degree:"Master of IT, Analytics",start:"2023-10",end:"2025-10"},{school:"Coventry University",degree:"BSc (Hons) Computing",start:"2019-03",end:"2023-02"}],U=(t,s,a)=>Math.min(1,Math.max(0,(t-s)/(a-s))),V=(t,s,a,n,i)=>Math.min(U(t,s,a),1-U(t,n,i));function ke(t,s){const a=Ps(),n=ce();return k(a,i=>n?s:i/1e3/t%1)}function ve({caption:t,children:s}){return e.jsxs("figure",{className:"flex flex-col overflow-hidden rounded-2xl bg-surface",children:[e.jsx("div",{className:"relative h-[104px] overflow-hidden","aria-hidden":"true",children:s}),e.jsx("figcaption",{className:"px-3.5 pb-3 pt-1 text-[14px] font-medium leading-tight",children:t})]})}function $e({p:t,at:s,x:a,y:n,text:i}){const l=k(t,r=>V(r,s,s+.07,.54,.62)),o=k(l,r=>.6+.4*r);return e.jsx(w.span,{className:"absolute whitespace-nowrap rounded-xl rounded-bl-sm bg-white px-2.5 py-1 font-hand text-[19px] leading-none text-fg shadow-sm ring-1 ring-black/[0.05]",style:{left:a,top:n,opacity:l,scale:o,originX:0,originY:1},children:i})}function Ys(){const t=ke(4.2,.7),s=k(t,n=>V(n,.58,.65,.88,.96)),a=k(t,n=>.4+.75*U(n,.58,.65)-.15*U(n,.65,.71));return e.jsxs(ve,{caption:"I ask a lot of questions",children:[e.jsx($e,{p:t,at:.05,x:"8%",y:"8%",text:"why?"}),e.jsx($e,{p:t,at:.2,x:"26%",y:"36%",text:"how often?"}),e.jsx($e,{p:t,at:.35,x:"10%",y:"64%",text:"what if?"}),e.jsx(w.span,{className:"absolute left-[calc(50%-22px)] top-[calc(50%-22px)] grid h-11 w-11 place-items-center rounded-full bg-[#FDE68A] text-[#92400E] shadow-[0_0_24px_6px_rgba(253,230,138,0.7)]",style:{opacity:s,scale:a},children:e.jsx($t,{className:"h-5 w-5"})})]})}function Qs({p:t,i:s,className:a}){const n=k(t,i=>1-V(i,.32+s*.025,.4+s*.025,.9,.98));return e.jsx(w.span,{className:`block rounded-full ${a}`,style:{opacity:n,scale:n}})}function Zs(){const t=ke(4.6,.75),s=k(t,i=>V(i,.5,.6,.88,.94)),a=k(s,i=>6*(1-i)),n=["w-10 h-2 bg-fg/25","w-6 h-2 bg-fg/15","w-8 h-2 bg-accent/40","w-12 h-2 bg-fg/15","w-5 h-2 bg-fg/25","w-9 h-2 bg-fg/15","w-7 h-2 bg-[#C2410C]/35","w-10 h-2 bg-fg/15","w-6 h-2 bg-fg/25","w-11 h-2 bg-fg/15"];return e.jsx(ve,{caption:"I like simple screens",children:e.jsxs("div",{className:"absolute inset-x-[14%] bottom-2 top-4 rounded-lg bg-white shadow-sm ring-1 ring-black/[0.05]",children:[e.jsx("div",{className:"flex gap-1 px-2 pt-1.5",children:[0,1,2].map(i=>e.jsx("span",{className:"h-1.5 w-1.5 rounded-full bg-fg/15"},i))}),e.jsx("div",{className:"flex flex-wrap content-start gap-1.5 px-2.5 pt-2",children:n.map((i,l)=>e.jsx(Qs,{p:t,i:l,className:i},l))}),e.jsxs(w.div,{className:"absolute inset-0 flex flex-col items-center justify-center gap-2",style:{opacity:s,y:a},children:[e.jsx("span",{className:"h-2 w-16 rounded-full bg-fg/70"}),e.jsx("span",{className:"rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-white",children:"Save"})]})]})})}function Js(){const t=ke(4.4,.7),s=k(t,c=>5*(1-U(c,.36,.5))+5*U(c,.9,.97)),a=k(t,c=>V(c,.1,.2,.84,.92)),n=k(t,c=>1-U(c,.46,.52)),i=k(t,c=>U(c,.46,.52)),l=k(t,c=>V(c,.18,.24,.36,.42)),o=k(t,c=>V(c,.5,.56,.84,.92)),r=k([a,n],([c,d])=>c*d),h=k([a,i],([c,d])=>c*d);return e.jsx(ve,{caption:"I sweat the small stuff",children:e.jsx("div",{className:"absolute inset-x-[12%] bottom-3 top-5 rounded-lg bg-white shadow-sm ring-1 ring-black/[0.05]",children:e.jsxs("div",{className:"relative mt-[30px] flex justify-center gap-1.5",children:[e.jsx(w.span,{className:"absolute -inset-x-2 top-0 border-t border-dashed border-[#DC2626]",style:{opacity:r}}),e.jsx(w.span,{className:"absolute -inset-x-2 top-0 border-t border-dashed border-[#16A34A]",style:{opacity:h}}),e.jsx("span",{className:"h-5 w-8 rounded-full bg-fg/80 @sm:w-10"}),e.jsx(w.span,{className:"h-5 w-8 rounded-full bg-accent @sm:w-10",style:{y:s}}),e.jsx("span",{className:"h-5 w-8 rounded-full bg-fg/15 @sm:w-10"}),e.jsx(w.span,{className:"absolute -top-5 left-[calc(50%+2px)] text-[10px] font-semibold text-[#DC2626]",style:{opacity:l},children:"2px"}),e.jsx(w.span,{className:"absolute -right-1 -top-[26px] grid h-4 w-4 place-items-center rounded-full bg-[#16A34A] text-white",style:{opacity:o,scale:o},children:e.jsx(ae,{className:"h-3 w-3",strokeWidth:3})})]})})})}const je=5,D=t=>.06+t*.14;function Ks({p:t,i:s}){const a=k(t,i=>V(i,D(s),D(s)+.05,.9,.97)),n=k(t,i=>i>=D(s)&&(s===je-1||i<D(s+1))?1:0);return e.jsxs(w.span,{className:"relative h-[13px] flex-1 overflow-hidden rounded-t-[5px] bg-[#E3E3E8]",style:{opacity:a,scaleX:a,originX:0},children:[e.jsx(w.span,{className:"absolute inset-0 bg-white",style:{opacity:n}}),e.jsx("span",{className:"absolute left-1.5 top-[5px] h-[3px] w-[55%] rounded-full bg-fg/25"})]})}function ea(){const t=ke(5,.75),s=k(t,r=>{let h=-1;for(let c=0;c<je;c++)r>=D(c)&&(h=c);return h<0?0:U(r,D(h),D(h)+.06)}),a=k(t,r=>{let h=0;for(let c=0;c<je;c++)r>=D(c)&&(h=c);return h}),n=k(s,r=>8*(1-r)),i=k(t,r=>V(r,D(0),D(0)+.05,.9,.97)),l=k(a,r=>`${[62,48,70,54,66][r]}%`),o=k(a,r=>`${[80,90,72,86,78][r]}%`);return e.jsx(ve,{caption:"Always exploring new tech",children:e.jsxs("div",{className:"absolute inset-x-[12%] bottom-3 top-4 overflow-hidden rounded-lg bg-[#F0F0F3] shadow-sm ring-1 ring-black/[0.05]",children:[e.jsx("div",{className:"flex gap-[3px] px-1.5 pt-1.5",children:Array.from({length:je},(r,h)=>e.jsx(Ks,{p:t,i:h},h))}),e.jsx(w.div,{className:"h-full bg-white px-2.5 pt-2.5",style:{opacity:i},children:e.jsxs(w.div,{style:{opacity:s,y:n},children:[e.jsx("span",{className:"inline-block rounded-full bg-accent px-1.5 py-[1px] text-[9px] font-semibold uppercase tracking-wide text-white",children:"New"}),e.jsx(w.span,{className:"mt-1.5 block h-[6px] rounded-full bg-fg/60",style:{width:l}}),e.jsx(w.span,{className:"mt-1.5 block h-[4px] rounded-full bg-fg/15",style:{width:o}}),e.jsx("span",{className:"mt-1 block h-[4px] w-[60%] rounded-full bg-fg/15"})]})})]})})}function ta(){return e.jsxs("div",{className:"grid grid-cols-2 gap-2.5",children:[e.jsx(Ys,{}),e.jsx(Zs,{}),e.jsx(Js,{}),e.jsx(ea,{})]})}function sa(){return e.jsxs("p",{className:"inline-flex items-center gap-2 rounded-full bg-[#ECFDF3] px-3 py-1.5 text-[13px] font-medium text-[#166534]",children:[e.jsxs("span",{className:"relative flex h-2 w-2","aria-hidden":"true",children:[e.jsx("span",{className:"absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60 motion-reduce:hidden"}),e.jsx("span",{className:"relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]"})]}),"Open to full-time roles, and freelance too"]})}function aa(){return e.jsx("span",{className:"relative grid h-11 w-11 shrink-0 place-items-end justify-center overflow-hidden rounded-xl bg-white ring-1 ring-black/[0.04]",children:e.jsxs(w.svg,{viewBox:"0 0 24 24",className:"mb-1 h-5 w-5",animate:{y:[0,-14,0],rotate:[0,120,240]},transition:{duration:.9,repeat:1/0,ease:["easeOut","easeIn"],times:[0,.5,1]},"aria-hidden":"true",children:[e.jsx("circle",{cx:"12",cy:"12",r:"10",fill:"#FFFFFF",stroke:"#1D1D1F",strokeWidth:"1.6"}),e.jsx("path",{d:"M12 7.5l3.2 2.3-1.2 3.8h-4l-1.2-3.8z",fill:"#1D1D1F"}),e.jsx("path",{d:"M12 7.5V3M15.2 9.8l4-1.6M14 13.6l2.6 3.6M10 13.6l-2.6 3.6M8.8 9.8l-4-1.6",stroke:"#1D1D1F",strokeWidth:"1.2"})]})})}function na(){const t=s=>e.jsxs("g",{transform:`rotate(${s} 12 12)`,children:[e.jsx("path",{d:"M12 2.5v13",stroke:"#1D1D1F",strokeWidth:"1.4",strokeLinecap:"round"}),e.jsx("path",{d:"M9.6 15.5h4.8",stroke:"#1D1D1F",strokeWidth:"1.6",strokeLinecap:"round"}),e.jsx("path",{d:"M12 16v5",stroke:"#16A34A",strokeWidth:"2.4",strokeLinecap:"round"})]});return e.jsxs("span",{className:"relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-black/[0.04]",children:[e.jsxs("svg",{viewBox:"0 0 24 24",className:"h-7 w-7","aria-hidden":"true",children:[t(-40),t(40),t(0)]}),e.jsx(w.span,{className:"absolute inset-y-0 w-3 -skew-x-12 bg-gradient-to-r from-transparent via-white/90 to-transparent",animate:{x:[-30,40]},transition:{duration:.7,repeat:1/0,repeatDelay:2.4,ease:"easeInOut"},"aria-hidden":"true"})]})}function ia(){return e.jsxs("div",{className:"rounded-2xl bg-surface p-5",children:[e.jsx("p",{className:"text-[13px] font-medium text-muted",children:"Off the clock"}),e.jsxs("div",{className:"mt-3 flex items-center gap-3",children:[e.jsx(aa,{}),e.jsxs("span",{children:[e.jsx("span",{className:"block text-[14px] font-medium leading-tight",children:"Football"}),e.jsx("span",{className:"block text-[12px] text-muted",children:"Ronaldo, always. SIUUU."})]})]}),e.jsxs("div",{className:"mt-3 flex items-center gap-3",children:[e.jsx(na,{}),e.jsxs("span",{children:[e.jsx("span",{className:"block text-[14px] font-medium leading-tight",children:"Anime"}),e.jsx("span",{className:"block text-[12px] text-muted",children:"One Piece and Naruto"})]})]})]})}const ra=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Oe=t=>{const[s,a]=t.split("-").map(Number);return s*12+a-1},ze=t=>{const[s,a]=t.split("-").map(Number);return`${ra[a-1]} ${s}`},He=new Date,Ke=He.getFullYear()*12+He.getMonth(),Ot=Ke+(He.getDate()-1)/30,le=Oe("2023-01"),et=Ke+3,Ue=t=>`${(t-le)/(et-le)*100}%`,ht=(t,s)=>{const a=Math.max(t,le),n=t<le?"linear-gradient(to right, transparent, black 40px)":void 0;return{left:Ue(a),width:`${(s-a)/(et-le)*100}%`,maskImage:n,WebkitMaskImage:n}},la=Array.from({length:8},(t,s)=>2023+s).filter(t=>t*12<et-2),Ve=t=>{const s=Oe(t.start),a=(t.end?Oe(t.end):Ke)+1;return{start:s,bar:t.end?a:Ot,months:a-s}},ut=(t,s)=>`${t} ${s}${t===1?"":"s"}`,zt=t=>{const s=Math.floor(t/12),a=t%12;return[s&&ut(s,"year"),a&&ut(a,"month")].filter(Boolean).join(" ")},oa=t=>`${ze(t.start)} to ${t.end?ze(t.end):"now"}`,pe=de.find(t=>t.slug==="easyreviewreply");function ca({onOpenProject:t,onOpenCase:s}){return e.jsxs("div",{className:"px-5 pb-10 pt-6 @md:px-10 @md:pt-9",children:[e.jsxs("div",{className:"grid gap-8 @md:grid-cols-[minmax(0,1fr)_320px] @md:gap-10",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("img",{src:"/about/pradip.webp",alt:"Sahil Singla",width:88,height:88,className:"h-[72px] w-[72px] shrink-0 rounded-full object-cover ring-1 ring-black/5 @md:h-[88px] @md:w-[88px]"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-[22px] font-semibold tracking-tight",children:"Pradip Dhakal"}),e.jsx("p",{className:"text-[14px] text-muted",children:"AI automation developer, Sydney"})]})]}),e.jsx("h2",{className:"mt-6 text-[26px] font-semibold leading-[1.15] tracking-tight @md:text-[30px]",children:"Curious first, developer second."}),e.jsx("p",{className:"mt-3 max-w-[34rem] text-[15px] leading-relaxed text-fg/75",children:"My favourite part of the job is sitting next to someone, watching how they really work, and spotting the step that eats their afternoon."}),e.jsxs("div",{className:"mt-4 flex flex-wrap items-center gap-2",children:[e.jsx(sa,{}),e.jsxs("a",{href:"/Pradip-Dhakal-CV.pdf",download:"Pradip Dhakal CV.pdf",className:"inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[13px] font-medium text-fg ring-1 ring-black/[0.06] transition-colors hover:bg-[#EBEBEF]",children:[e.jsx(js,{className:"h-3.5 w-3.5","aria-hidden":"true"})," Download my CV"]})]}),e.jsx("div",{className:"mt-6",children:e.jsx(ta,{})})]}),e.jsxs("div",{className:"flex flex-col gap-3 self-start",children:[e.jsx(da,{}),e.jsx(ia,{})]})]}),e.jsx(xa,{onOpenCase:s}),pe&&e.jsx(ha,{project:pe,onOpen:()=>t(pe),onCase:()=>s(pe)})]})}function da(){const t=se[0];return e.jsxs("div",{className:"rounded-2xl bg-surface p-5",children:[e.jsxs("p",{className:"flex items-center gap-2 text-[13px] font-medium text-accent",children:[e.jsxs("span",{className:"relative flex h-2 w-2","aria-hidden":"true",children:[e.jsx("span",{className:"absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50 motion-reduce:hidden"}),e.jsx("span",{className:"relative inline-flex h-2 w-2 rounded-full bg-accent"})]}),"Now"]}),e.jsx("p",{className:"mt-2 text-[20px] font-semibold tracking-tight",children:t.org}),e.jsxs("p",{className:"text-[14px] text-muted",children:[t.title,", since ",ze(t.start)]})]})}function xa({onOpenCase:t}){const[s,a]=x.useState(se[0].org),n=se.find(i=>i.org===s)??se[0];return e.jsxs("section",{className:"mt-10 border-t border-black/[0.06] pt-8","aria-labelledby":"where-heading",children:[e.jsxs("div",{className:"flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1",children:[e.jsx("h3",{id:"where-heading",className:"text-[19px] font-semibold tracking-tight",children:"Where I've worked"}),e.jsx("p",{className:"text-[13px] text-muted",children:"Choose a role to see what I built there."})]}),e.jsxs("div",{className:"relative mt-5 pb-7",children:[e.jsxs("div",{className:"pointer-events-none absolute inset-y-0 left-2 right-2 @md:left-[272px]","aria-hidden":"true",children:[la.map(i=>e.jsx("span",{className:"absolute inset-y-0 w-px bg-black/[0.07]",style:{left:Ue(i*12)},children:e.jsx("span",{className:"absolute left-1.5 top-0 text-[12px] tabular-nums text-muted",children:i})},i)),e.jsx("span",{className:"absolute inset-y-0 w-px bg-accent/60",style:{left:Ue(Ot)},children:e.jsx("span",{className:"absolute bottom-0 right-1.5 text-[12px] font-medium text-accent",children:"Today"})})]}),e.jsxs("ul",{className:"relative space-y-1 pt-7",children:[se.map((i,l)=>{const o=Ve(i),r=i.org===n.org,h=!i.end;return e.jsxs("li",{children:[e.jsxs("button",{type:"button",onClick:()=>a(i.org),"aria-pressed":r,className:`group grid w-full gap-2 rounded-xl px-2 py-2.5 text-left transition-colors duration-200 @md:grid-cols-[256px_1fr] @md:items-center @md:py-2 ${r?"bg-surface":"hover:bg-surface/60"}`,children:[e.jsxs("span",{className:"flex min-w-0 items-baseline justify-between gap-3 @md:block",children:[e.jsx("span",{className:`block min-w-0 truncate text-[15px] ${r?"font-semibold":"font-medium text-fg/80"}`,children:i.org}),e.jsxs("span",{className:"block shrink-0 truncate text-[13px] text-muted",children:[e.jsx("span",{className:"@md:hidden",children:zt(o.months)}),e.jsx("span",{className:"hidden @md:inline",children:i.title})]})]}),e.jsx("span",{className:"relative block h-3",children:e.jsx(w.span,{className:`absolute inset-y-0 rounded-full transition-colors duration-300 ${h?r?"bg-accent":"bg-accent/45":r?"bg-fg":"bg-fg/20 group-hover:bg-fg/40"}`,style:{...ht(o.start,o.bar),originX:0},initial:{scaleX:0},animate:{scaleX:1},transition:{duration:.9,ease:$,delay:.3+l*.08}})})]}),e.jsx(Y,{initial:!1,children:r&&e.jsx(w.div,{className:"overflow-hidden @md:hidden",initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.35,ease:$},children:e.jsx("div",{className:"bg-white px-2 pb-5 pt-3",children:e.jsx(mt,{role:i,compact:!0,onOpenCase:t})})},"details")})]},i.org)}),e.jsx("li",{className:"px-2 pb-1 pt-4 text-[13px] font-medium text-muted",children:"Study"}),qs.map((i,l)=>{const o=Ve(i);return e.jsxs("li",{className:"grid gap-2 px-2 py-2.5 @md:grid-cols-[256px_1fr] @md:items-center @md:py-2",children:[e.jsxs("span",{className:"block min-w-0",children:[e.jsx("span",{className:"block truncate text-[15px] font-medium text-fg/80",children:i.school}),e.jsxs("span",{className:"block truncate text-[13px] text-muted",children:[i.degree,", ",i.start.slice(0,4)," to ",i.end.slice(0,4)]})]}),e.jsx("span",{className:"relative block h-3",children:e.jsx(w.span,{className:"absolute inset-y-0 rounded-full bg-[repeating-linear-gradient(135deg,rgb(var(--fg)/0.22)_0_3px,rgb(var(--fg)/0.06)_3px_7px)]",style:{...ht(o.start,o.bar),originX:0},initial:{scaleX:0},animate:{scaleX:1},transition:{duration:.9,ease:$,delay:.3+(se.length+l)*.08}})})]},i.school)})]})]}),e.jsx("div",{className:"mt-6 hidden border-t border-black/[0.06] pt-7 @md:block",children:e.jsx(Y,{mode:"wait",initial:!1,children:e.jsx(w.div,{initial:{opacity:0,y:8},animate:{opacity:1,y:0},exit:{opacity:0,y:-4,transition:{duration:.15}},transition:{duration:.35,ease:$},children:e.jsx(mt,{role:n,onOpenCase:t})},n.org)})})]})}function mt({role:t,compact:s=!1,onOpenCase:a}){const n=Ve(t),i=t.project?Zt(t.project):void 0;return e.jsxs("div",{className:s?"":"grid grid-cols-2 gap-10",children:[e.jsxs("div",{children:[!s&&e.jsx("p",{className:"text-[22px] font-semibold tracking-tight",children:t.org}),e.jsx("p",{className:`text-[15px] ${s?"font-medium":"mt-0.5 text-fg/80"}`,children:t.title}),e.jsxs("p",{className:"mt-0.5 text-[13px] text-muted",children:[oa(t)," · ",zt(n.months)," · ",t.place]}),e.jsx("p",{className:"mt-3 text-[15px] leading-relaxed text-fg/80",children:t.note}),e.jsx("ul",{className:"mt-2.5 space-y-2",children:t.built.map(l=>e.jsxs("li",{className:"flex gap-3 text-[14px] leading-snug text-muted",children:[e.jsx("span",{className:"mt-[8px] h-1 w-1 shrink-0 rounded-full bg-fg/40","aria-hidden":"true"}),l]},l))}),i&&e.jsxs("button",{type:"button",onClick:()=>a(i),className:"mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-accent hover:underline",children:["Read the case study ",e.jsx(ye,{className:"h-4 w-4","aria-hidden":"true"})]})]}),e.jsxs("div",{className:s?"mt-5":"",children:[e.jsx("p",{className:"text-[13px] font-medium text-muted",children:"Built with"}),e.jsx("p",{className:"sr-only",children:t.stack.join(", ")}),s?e.jsx("p",{className:"mt-2 flex flex-wrap gap-1.5","aria-hidden":"true",children:t.stack.map(l=>e.jsx("span",{className:"rounded-full bg-surface px-2.5 py-1 text-[13px] font-medium",children:l},l))}):e.jsx("dl",{className:"mt-3 space-y-2","aria-hidden":"true",children:Xs.map(l=>e.jsxs("div",{className:"grid grid-cols-[104px_1fr] items-baseline gap-3",children:[e.jsx("dt",{className:"text-[13px] text-muted",children:l.group}),e.jsx("dd",{className:"flex flex-wrap gap-1.5",children:l.items.map(o=>{const r=t.stack.includes(o);return e.jsx("span",{className:`rounded-full px-2.5 py-1 text-[13px] font-medium transition-colors duration-300 ${r?"bg-fg text-bg":"bg-surface text-fg/30"}`,children:o},o)})})]},l.group))})]})]})}function ha({project:t,onOpen:s,onCase:a}){return e.jsxs("section",{className:"mt-8 flex flex-col gap-4 rounded-2xl bg-surface p-5 @sm:flex-row @sm:items-center","aria-label":"My own product",children:[e.jsx("img",{src:t.logo,alt:"",width:52,height:52,className:"h-[52px] w-[52px] shrink-0 rounded-[22%] ring-1 ring-black/[0.06]"}),e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"text-[13px] font-medium text-muted",children:"My own product"}),e.jsx("p",{className:"text-[17px] font-semibold tracking-tight",children:t.name}),e.jsx("p",{className:"text-[14px] leading-snug text-muted",children:t.short})]}),e.jsxs("div",{className:"flex shrink-0 gap-2",children:[e.jsx("button",{type:"button",onClick:s,className:"btn btn-dark h-10 px-4 text-[14px]",children:"Try it here"}),e.jsx("button",{type:"button",onClick:a,className:"btn h-10 bg-white px-4 text-[14px] text-fg ring-1 ring-black/[0.06] hover:bg-white/70",children:"Case study"})]})]})}const ua=t=>t.replace(/^https?:\/\//,"").replace(/\/$/,""),ma={"shine-motor":{src:"/desk/tablet.webp",kind:"tablet"},"miami-motors":{src:"/desk/phone.webp",kind:"phone"}};function pa({project:t,onSeePart:s,onNext:a}){var o;const n=(o=t.parts.find(r=>r.url))==null?void 0:o.url,i=Jt(t.slug),l=ma[t.slug];return e.jsxs("article",{className:"mx-auto max-w-[900px] px-6 pb-14 pt-9 @md:px-12",children:[e.jsxs("header",{className:"text-center",children:[e.jsx("img",{src:t.logo,alt:"",width:56,height:56,className:"mx-auto mb-4 h-14 w-14 rounded-[22%] shadow-sm ring-1 ring-black/[0.06]"}),e.jsxs("p",{className:"text-[14px] font-medium",style:{color:t.ink},children:[t.kind,t.year&&` · ${t.year}`]}),e.jsx("h1",{className:"mt-2 text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] @md:text-[44px]",children:t.name}),e.jsx("p",{className:"mx-auto mt-3 max-w-[38rem] text-[16px] leading-relaxed text-muted @md:text-[18px]",children:t.oneLiner}),e.jsxs("div",{className:"mt-6 flex flex-wrap justify-center gap-2.5",children:[e.jsxs("button",{type:"button",onClick:()=>s(ga(t)),className:"btn btn-primary h-10 px-4 text-[14px]",children:[e.jsx(Ze,{className:"h-3.5 w-3.5 fill-current","aria-hidden":"true"})," See it running"]}),n&&e.jsxs("a",{href:n,target:"_blank",rel:"noopener noreferrer",className:"btn btn-secondary h-10 px-4 text-[14px]",children:[ua(n)," ",e.jsx(Ne,{className:"h-4 w-4","aria-hidden":"true"})]})]})]}),e.jsx("div",{className:"relative mt-9 overflow-hidden rounded-[22px] px-5 pt-7 @md:px-12 @md:pt-10",style:{background:t.tint},children:e.jsxs("div",{className:"relative mx-auto max-w-[680px]",children:[e.jsxs("div",{className:"overflow-hidden rounded-t-xl bg-white shadow-[0_24px_60px_-28px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.06]",children:[e.jsx("div",{className:"flex h-6 items-center gap-1 bg-[#F4F4F5] px-3","aria-hidden":"true",children:[0,1,2].map(r=>e.jsx("span",{className:"h-2 w-2 rounded-full bg-black/15"},r))}),e.jsx("img",{src:t.cover,alt:`${t.name}, home page`,className:"block aspect-[16/9] w-full object-cover object-top"})]}),l&&e.jsx("div",{className:`absolute bottom-4 right-[-5%] overflow-hidden bg-[#111] shadow-[0_24px_50px_-18px_rgba(0,0,0,0.55)] ${l.kind==="phone"?"w-[21%] rounded-[22px] p-[5px]":"w-[40%] rounded-[16px] p-[6px]"}`,"aria-hidden":"true",children:e.jsx("img",{src:l.src,alt:"",className:`block w-full object-cover object-top ${l.kind==="phone"?"aspect-[390/840] rounded-[17px]":"aspect-[1180/783] rounded-[11px]"}`})})]})}),t.facts&&e.jsx("dl",{className:"mt-5 grid grid-cols-2 gap-3 @md:grid-cols-4",children:t.facts.map(r=>e.jsxs("div",{className:"flex flex-col-reverse rounded-[18px] bg-surface p-5",children:[e.jsx("dt",{className:"mt-1 text-[13px] text-muted",children:r.label}),e.jsx("dd",{className:"text-[26px] font-semibold leading-none tracking-[-0.02em]",children:r.value})]},r.label))}),e.jsxs("section",{"aria-labelledby":"problem-heading",className:"py-14 text-center",children:[e.jsx("h2",{id:"problem-heading",className:"text-[13px] font-medium uppercase tracking-[0.08em] text-muted",children:"The problem"}),e.jsx("p",{className:"mx-auto mt-3 max-w-[40rem] text-[22px] font-semibold leading-[1.25] tracking-[-0.01em] @md:text-[26px]",children:t.problem})]}),t.parts.map((r,h)=>e.jsxs("section",{"aria-labelledby":`case-part-${h}`,className:"border-t border-line py-12",children:[e.jsx("p",{className:"text-[13px] font-medium uppercase tracking-[0.08em] text-muted",children:t.parts.length>1?`Part ${h+1} of ${t.parts.length}`:"What I built"}),e.jsx("h2",{id:`case-part-${h}`,className:"mt-2 text-[26px] font-semibold tracking-[-0.015em]",children:r.title}),e.jsx("p",{className:"mt-2 max-w-[40rem] text-[16px] leading-relaxed text-muted",children:r.summary}),e.jsx("ul",{className:"mt-6 grid gap-2.5 @sm:grid-cols-2",children:r.built.map(c=>e.jsxs("li",{className:"flex gap-2.5 rounded-[16px] bg-surface p-4 text-[14px] leading-snug",children:[e.jsx(ae,{className:"mt-0.5 h-4 w-4 shrink-0 text-accent","aria-hidden":"true"}),e.jsx("span",{children:c})]},c))}),e.jsx(fa,{media:r.media,name:t.name,onSee:()=>s(h)})]},r.title)),t.underTheHood&&e.jsxs("section",{"aria-labelledby":"hood-heading",className:"-mx-6 bg-surface px-6 py-12 @md:-mx-12 @md:px-12",children:[e.jsx("p",{className:"text-[13px] font-medium uppercase tracking-[0.08em] text-muted",children:"Under the hood"}),e.jsx("h2",{id:"hood-heading",className:"mt-2 text-[26px] font-semibold tracking-[-0.015em]",children:"The parts you don't see."}),e.jsx("ul",{className:"mt-6 grid gap-3 @md:grid-cols-2",children:t.underTheHood.map(r=>e.jsx("li",{className:"rounded-[18px] bg-white p-5 text-[15px] leading-relaxed ring-1 ring-black/[0.04]",children:r},r))})]}),e.jsx(ba,{project:t}),e.jsxs("button",{type:"button",onClick:()=>a(i),className:"group mt-4 flex w-full items-center gap-5 overflow-hidden rounded-[22px] p-6 text-left @md:p-8",style:{background:i.tint},children:[e.jsxs("div",{className:"min-w-0 flex-1",children:[e.jsx("p",{className:"text-[13px] font-medium",style:{color:i.ink},children:"Next project"}),e.jsx("p",{className:"mt-1 text-[26px] font-semibold tracking-[-0.015em]",children:i.name}),e.jsx("p",{className:"mt-1 text-[15px] text-fg/70",children:i.short}),e.jsxs("span",{className:"mt-4 inline-flex items-center gap-1 text-[15px] font-medium text-accent",children:["Read its case study",e.jsx(ye,{className:"h-4 w-4 transition-transform duration-200 group-hover:translate-x-1","aria-hidden":"true"})]})]}),i.cover&&e.jsx("img",{src:i.cover,alt:"",loading:"lazy",className:"hidden w-[42%] translate-y-6 rounded-t-lg object-cover object-top shadow-[0_20px_40px_-20px_rgba(0,0,0,0.4)] ring-1 ring-black/[0.06] transition-transform duration-500 group-hover:translate-y-4 @md:block"})]})]})}const ga=t=>Math.max(0,t.parts.findIndex(s=>s.media.kind!=="gallery"));function fa({media:t,name:s,onSee:a}){if(t.kind==="gallery"){const[i,...l]=t.images;return e.jsxs("div",{className:"mt-7",children:[e.jsxs("div",{className:"grid gap-3 @md:grid-cols-2",children:[e.jsx("img",{src:i.src,alt:i.alt,loading:"lazy",className:"w-full rounded-xl ring-1 ring-black/[0.06] @md:col-span-2"}),l.map(o=>e.jsx("img",{src:o.src,alt:o.alt,loading:"lazy",className:"aspect-[16/10] w-full rounded-xl object-cover object-top ring-1 ring-black/[0.06]"},o.src))]}),e.jsxs("button",{type:"button",onClick:()=>I.open("tablet"),className:"btn btn-dark mt-4 h-10 px-4 text-[14px]",children:["Try it on the tablet ",e.jsx(ye,{className:"h-4 w-4","aria-hidden":"true"})]})]})}const n=t.kind==="live"?t.poster:t.kind==="capture"?t.tiles[0]:void 0;return e.jsxs("div",{className:"mt-7",children:[n&&e.jsx("img",{src:n,alt:`${s}, as it looks`,loading:"lazy",className:"w-full rounded-xl ring-1 ring-black/[0.06]"}),e.jsxs("button",{type:"button",onClick:a,className:"btn btn-dark mt-4 h-10 px-4 text-[14px]",children:[e.jsx(Ze,{className:"h-3.5 w-3.5 fill-current","aria-hidden":"true"})," ",t.kind==="review-demo"?"Try it in the other tab":"See it running in the other tab"]})]})}function ba({project:t}){const s=[{label:"Client",value:t.client},{label:"Sector",value:t.sector},{label:"Where",value:t.location},{label:"Built with",value:t.stack.join(", ")},{label:"My role",value:"Everything, on my own: design, build, hosting and support"},{label:"Year",value:t.year}].filter(a=>a.value);return e.jsxs("section",{"aria-labelledby":"specs-heading",className:"py-12",children:[e.jsx("p",{className:"text-[13px] font-medium uppercase tracking-[0.08em] text-muted",children:"How it's built"}),e.jsx("h2",{id:"specs-heading",className:"mt-2 text-[26px] font-semibold tracking-[-0.015em]",children:"The specs."}),e.jsx("dl",{className:"mt-6 divide-y divide-line border-y border-line",children:s.map(a=>e.jsxs("div",{className:"grid gap-1 py-4 @sm:grid-cols-[150px_1fr] @sm:gap-6",children:[e.jsx("dt",{className:"text-[14px] font-medium text-muted",children:a.label}),e.jsx("dd",{className:"text-[15px]",children:a.value})]},a.label))})]})}class ja extends ys{constructor(){super();const s=new Ns;s.deleteAttribute("uv");const a=new lt({side:ks}),n=new lt,i=new vs(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);const l=new F(s,a);l.position.set(-.757,13.219,.717),l.scale.set(31.713,28.305,28.591),this.add(l);const o=new F(s,n);o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),this.add(o);const r=new F(s,n);r.position.set(-5.607,-.754,-.758),r.rotation.set(0,.994,0),r.scale.set(1.97,1.534,3.955),this.add(r);const h=new F(s,n);h.position.set(6.167,.857,7.803),h.rotation.set(0,.561,0),h.scale.set(3.927,6.285,3.687),this.add(h);const c=new F(s,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);const d=new F(s,n);d.position.set(2.291,-.756,-2.621),d.rotation.set(0,-.286,0),d.scale.set(1.546,1.552,1.496),this.add(d);const f=new F(s,n);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);const p=new F(s,te(50));p.position.set(-16.116,14.37,8.208),p.scale.set(.1,2.428,2.739),this.add(p);const j=new F(s,te(50));j.position.set(-16.109,18.021,-8.207),j.scale.set(.1,2.425,2.751),this.add(j);const y=new F(s,te(17));y.position.set(14.904,12.198,-1.832),y.scale.set(.15,4.265,6.331),this.add(y);const u=new F(s,te(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const b=new F(s,te(20));b.position.set(3.235,11.486,-12.541),b.scale.set(2.5,2,.1),this.add(b);const C=new F(s,te(100));C.position.set(0,20,0),C.scale.set(1,.1,1),this.add(C)}dispose(){const s=new Set;this.traverse(a=>{a.isMesh&&(s.add(a.geometry),s.add(a.material))});for(const a of s)a.dispose()}}function te(t){const s=new Cs;return s.color.setScalar(t),s}function wa({className:t=""}){const s=x.useRef({x:0,y:0,seen:!1,over:!1,travel:0,strokedAt:0,meow:-10,purrUntil:0}),a=x.useRef(null);return x.useEffect(()=>{const n=i=>Object.assign(s.current,{x:i.clientX,y:i.clientY,seen:!0});return window.addEventListener("pointermove",n),()=>window.removeEventListener("pointermove",n)},[]),e.jsx("div",{className:`relative cursor-pointer touch-none select-none ${t}`,onPointerEnter:()=>{s.current.over=!0,Kt()},onPointerLeave:()=>{s.current.over=!1,a.current=null},onPointerMove:n=>{const i=s.current;a.current&&(i.travel+=Math.hypot(n.clientX-a.current.x,n.clientY-a.current.y)),a.current={x:n.clientX,y:n.clientY};const l=performance.now()/1e3;l-i.strokedAt>.8&&(i.travel=Math.min(i.travel,40)),!(i.travel<90)&&(i.travel=0,i.strokedAt=l,l>i.purrUntil-.5&&(it("purr",{gain:.8,seconds:2.6,vary:.02}),i.purrUntil=l+2.6))},onClick:()=>{const n=s.current,i=performance.now()/1e3;i-n.meow<1.2||(n.meow=i,it("hello",{gain:.85}))},role:"img","aria-label":"My cat's head. It follows your pointer; tap it and it says hello.",children:e.jsxs(xs,{dpr:[1,2],camera:{fov:24,position:[0,.02,1.75]},gl:{antialias:!0,alpha:!0},onCreated:n=>{n.gl.toneMapping=Ss},style:{position:"absolute",inset:0},resize:{offsetSize:!0},children:[e.jsx(ya,{}),e.jsx(Na,{pointer:s})]})})}function ya(){const t=Be(a=>a.gl),s=Be(a=>a.scene);return x.useEffect(()=>{const a=new Ms(t),n=a.fromScene(new ja,.04);return s.environment=n.texture,s.environmentIntensity=.7,a.dispose(),()=>{s.environment=null,n.dispose()}},[t,s]),e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.35}),e.jsx("directionalLight",{position:[-1.2,2,2.4],intensity:1.6})]})}function Na({pointer:t}){const[s,a]=x.useState(null);x.useEffect(()=>{let h=!0;return hs().then(c=>h&&a(c.head)),()=>void(h=!1)},[]);const n=x.useMemo(us,[]),i=x.useRef(ms()),l=x.useRef(null),o=Be(h=>h.gl),r=x.useRef({turn:0,tilt:0,roll:0,lid:0,pupil:.45,ears:.6,blink:2,slowBlink:7,twitch:{at:3,ear:0}});return ps((h,c)=>{const d=r.current,f=t.current,p=h.clock.elapsedTime,j=performance.now()/1e3,y=Math.min(c,.1),u=j<f.purrUntil;let b=Math.sin(p*.45)*.35,C=Math.sin(p*.31)*.08;if(f.seen){const S=o.domElement.getBoundingClientRect(),P=(f.x-(S.left+S.width/2))/Math.max(S.width,1),L=(f.y-(S.top+S.height/2))/Math.max(S.height,1);b=ot.clamp(P*.75,-.75,.75),C=ot.clamp(L*.45,-.4,.45)}K.damp(d,"turn",u?0:b,.18,y),K.damp(d,"tilt",u?.15:C,.18,y),K.damp(d,"roll",u?.18*Math.sin(p*1.3):-d.turn*.12,.3,y),p>d.blink+.14&&(d.blink=p+2.2+Math.random()*3.5);const N=p>d.blink&&p<d.blink+.14,T=p>d.slowBlink&&p<d.slowBlink+1.4?Math.sin((p-d.slowBlink)/1.4*Math.PI):0;p>d.slowBlink+1.4&&(d.slowBlink=p+7+Math.random()*7),K.damp(d,"lid",u||N?1:Math.max(.08,T*.92),N?.03:.09,y),K.damp(d,"pupil",f.over?1:.45,.3,y),K.damp(d,"ears",f.over&&!u?1:u?.3:.65,.15,y),p>d.twitch.at+.18&&(d.twitch={at:p+2+Math.random()*4,ear:Math.random()<.5?0:1});const E=S=>p>d.twitch.at&&d.twitch.ear===S?Math.sin((p-d.twitch.at)/.18*Math.PI)*.4:0,B=j-f.meow<.9?Math.sin((j-f.meow)/.9*Math.PI):0;gs(i.current,{lid:d.lid,pupil:d.pupil,ears:d.ears,flick:[E(0),E(1)],listen:[0,0],yawning:0,meowing:B,licking:0,t:p}),l.current&&(l.current.position.y=-.066+Math.sin(p*2.4)*.006+B*.025+(u?Math.sin(p*70)*.0015:0),l.current.rotation.set(d.tilt-B*.12,d.turn,d.roll,"YXZ"))}),e.jsx("group",{ref:l,scale:1.05,children:e.jsx(fs,{head:s,fur:n,face:i.current})})}const ka=t=>new Date(t).toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric",timeZone:"Australia/Sydney"});function va({meal:t}){const s=t==="feast"?3:t==="dinner"?2:1;return e.jsxs("svg",{width:"22",height:"16",viewBox:"0 0 22 16","aria-hidden":"true",children:[e.jsx("path",{d:"M1 7h20l-2 7H3z",fill:"#fff",stroke:"#D2D2D7"}),e.jsx("path",{d:"M1 7h20",stroke:"#2F5BEA",strokeWidth:"1.6"}),Array.from({length:s},(a,n)=>e.jsx("ellipse",{cx:7+n*4,cy:5.2-n%2,rx:"2.2",ry:"1.6",fill:"#C9692A"},n))]})}function Ht({size:t=13}){return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24","aria-hidden":"true",className:"shrink-0",children:[e.jsx("path",{fill:"#2F5BEA",d:"M12 1.5l2.4 1.8 3-.2 1 2.8 2.6 1.6-.6 2.9 1.4 2.6-2 2.2.1 3-2.9.9-1.5 2.6-2.9-.7-2.6 1.4-2.2-2-3 .1-.9-2.9-2.6-1.5.7-2.9L1.5 12l2-2.2-.1-3 2.9-.9 1.5-2.6 2.9.7z"}),e.jsx("path",{d:"M7.5 12.3l3 3 6-6.2",fill:"none",stroke:"#fff",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round"})]})}function Ca(){return e.jsx("svg",{width:"100%",height:"8",viewBox:"0 0 100 8",preserveAspectRatio:"none","aria-hidden":"true",className:"block",children:e.jsx("path",{d:`M0 0H100V2${Array.from({length:20},(t,s)=>`L${100-s*5-2.5} 8L${100-s*5-5} 2`).join("")}Z`,fill:"#fff"})})}const pt=[-1.2,.8,-.5,1,-.8,.6,-1,.5];function Sa({meal:t,index:s}){const a=ws[t.meal];return e.jsxs("li",{className:"drop-shadow-[0_6px_10px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out hover:!rotate-0 hover:-translate-y-0.5",style:{rotate:`${pt[s%pt.length]}deg`},children:[e.jsxs("div",{className:"rounded-t-md bg-white px-3.5 pb-2.5 pt-3.5",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-[10.5px] font-semibold uppercase tracking-[0.06em] text-muted",children:"Fed the cat"}),e.jsx(va,{meal:t.meal})]}),e.jsx("p",{className:"mt-2 truncate text-[18px] font-semibold tracking-[-0.01em]",children:t.name||"Someone"}),e.jsx("p",{className:"text-[13px] font-semibold text-[#A4521A]",children:a[0].toUpperCase()+a.slice(1)}),e.jsx("p",{className:"mt-2 min-h-[38px] break-words text-[13.5px] leading-snug",children:t.note||e.jsx("span",{className:"text-muted",children:"No note."})}),e.jsxs("div",{className:"mt-2.5 flex items-center justify-between border-t-[1.5px] border-dashed border-[#D2D2D7] pt-2 text-[11.5px] text-muted",children:[e.jsx("span",{children:ka(t.at)}),e.jsxs("span",{className:"flex items-center gap-1 font-semibold text-accent",children:[e.jsx(Ht,{})," Paid"]})]})]}),e.jsx(Ca,{})]})}function Ma(){return e.jsx("li",{className:"-rotate-1 transition-transform duration-300 ease-out hover:rotate-0",children:e.jsxs("button",{type:"button",onClick:()=>I.set({feeding:!0}),className:"block w-full rounded-md border-[1.5px] border-dashed border-[#C7C7CC] bg-white/70 px-3.5 pb-2.5 pt-3.5 text-left",children:[e.jsxs("span",{className:"flex items-center justify-between",children:[e.jsx("span",{className:"text-[10.5px] font-semibold uppercase tracking-[0.06em] text-muted",children:"Fed the cat"}),e.jsx("span",{className:"rounded-full bg-[#767680]/[0.12] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted",children:"Example"})]}),e.jsx("span",{className:"mt-2 block text-[18px] font-semibold tracking-[-0.01em] text-fg/35",children:"Your name here"}),e.jsx("span",{className:"block text-[13px] font-semibold text-[#A4521A]/60",children:"Dinner"}),e.jsx("span",{className:"mt-2 block min-h-[38px] text-[13.5px] leading-snug",children:"Be the first to feed the cat."}),e.jsx("span",{className:"mt-2.5 block border-t-[1.5px] border-dashed border-[#D2D2D7] pt-2 text-[11.5px] font-semibold text-accent",children:"Feed the cat"})]})})}function Aa({sheet:t=!1}){const[s,a]=x.useState(null),[n,i]=x.useState(!1);x.useEffect(()=>{fetch("/api/feed?wall=1").then(d=>d.ok?d.json():Promise.reject()).then(d=>a(d)).catch(()=>i(!0))},[]);const l=(s==null?void 0:s.count)??0,o=l===0?"Nobody has fed the cat yet. You could be the first.":`Fed ${l===1?"once":`${l} times`} so far. Every meal keeps the cat happy and me building things like this desk.`,r=e.jsxs("div",{className:t?"px-5 pb-2 pt-5":"w-[320px] shrink-0 border-r border-black/[0.06] px-7 py-8",children:[e.jsx(wa,{className:`w-full overflow-hidden rounded-[18px] bg-surface ${t?"aspect-[16/9]":"aspect-[264/220]"}`}),e.jsx("h2",{className:"mt-5 text-[24px] font-semibold tracking-[-0.02em]",children:"My cat"}),e.jsx("p",{className:"mt-1.5 text-[15px] leading-relaxed text-muted",children:s||n?o:" "}),e.jsx("button",{type:"button",onClick:()=>I.set({feeding:!0}),className:"btn btn-primary mt-5 h-11 w-full text-[15px]",children:"Feed the cat"}),e.jsx("p",{className:"mt-3 text-center text-[12px] text-muted",children:"A snack $1 · Dinner $5 · A feast $10"})]}),h=e.jsxs("p",{className:"flex items-center gap-1.5 text-[12.5px] text-muted",children:[e.jsx(Ht,{size:14})," Every name here is a real payment, checked with Stripe."]}),c=e.jsxs("div",{"data-lenis-prevent":!0,className:`bg-surface ${t?"px-5 pb-8 pt-5":"min-h-0 flex-1 overflow-y-auto px-8 py-7"}`,children:[e.jsxs("div",{className:t?"flex flex-col gap-1.5":"flex items-baseline justify-between gap-4",children:[e.jsx("p",{className:"text-[12px] font-semibold uppercase tracking-[0.06em] text-muted",children:"Who fed it"}),h]}),!s&&!n&&e.jsx("div",{className:"grid h-40 place-items-center text-muted",children:e.jsx(oe,{className:"h-5 w-5 animate-spin","aria-hidden":"true"})}),n&&e.jsx("p",{className:"mt-4 text-[15px] text-muted",children:"Couldn't load the wall just now. Try again in a minute."}),e.jsxs("ul",{className:`mt-4 grid gap-x-3.5 gap-y-4 ${t?"grid-cols-2":"grid-cols-3"}`,children:[(s==null?void 0:s.meals.length)===0&&e.jsx(Ma,{}),s==null?void 0:s.meals.map((d,f)=>e.jsx(Sa,{meal:d,index:f},d.id))]})]});return t?e.jsxs("div",{children:[r,c]}):e.jsxs("div",{className:"flex h-full",children:[r,c]})}const gt=t=>{const s=t.replace(/^The /,"");return s[0].toUpperCase()+s.slice(1)},Ge=t=>Math.max(0,t.parts.findIndex(s=>s.media.kind!=="gallery"));function ft(t){if(t===es)return{kind:"about"};if(t===ts)return{kind:"contact"};if(t===ss)return{kind:"instagram"};if(t===as)return{kind:"cat"};if(t===ns)return{kind:"work"};const s=t.startsWith(De),a=de.find(n=>n.slug===(s?t.slice(De.length):t));return a?{kind:"site",slug:a.slug,part:Ge(a),tab:s?"case":"site",caseOpen:s}:{kind:"work"}}function Ta({sheet:t=!1}){const[s,a]=x.useState(()=>ft(I.get().laptopProject??"")),n=H(r=>r.laptopAsk),i=x.useRef(n);x.useEffect(()=>{n!==i.current&&(i.current=n,a(ft(I.get().laptopProject??"")))},[n]);const l=r=>a({kind:"site",slug:r.slug,part:Ge(r),tab:"site",caseOpen:!1}),o=r=>a({kind:"site",slug:r.slug,part:Ge(r),tab:"case",caseOpen:!0});return e.jsxs("div",{className:"relative h-full w-full select-none overflow-hidden bg-[#EEF1F7] text-fg",children:[e.jsx(Ea,{}),!t&&e.jsx(Pa,{onOpen:a}),!t&&e.jsxs("div",{className:"absolute right-7 top-[60px] flex flex-col gap-6",children:[e.jsx(re,{label:"Work",onOpen:()=>a({kind:"work"}),children:e.jsx(Ls,{className:"h-7 w-7 text-accent","aria-hidden":"true"})}),e.jsx(re,{label:"About me",onOpen:()=>a({kind:"about"}),children:e.jsx(Rt,{className:"h-7 w-7 text-fg","aria-hidden":"true"})}),e.jsx(re,{label:"Contact",onOpen:()=>a({kind:"contact"}),children:e.jsx(Ye,{className:"h-7 w-7 text-fg","aria-hidden":"true"})}),e.jsx(re,{label:"Instagram",onOpen:()=>a({kind:"instagram"}),children:e.jsx(Mt,{size:56})}),e.jsx(re,{label:"My cat",onOpen:()=>a({kind:"cat"}),children:e.jsx(Ut,{size:56})})]}),e.jsx(Y,{mode:"wait",children:s&&e.jsxs(w.div,{className:t?"absolute inset-0 flex flex-col overflow-hidden bg-white":"absolute left-[64px] top-[46px] flex h-[640px] w-[1064px] flex-col overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_30px_70px_-20px_rgba(0,0,0,0.35)]",initial:{opacity:0,scale:.97,y:8},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.98,transition:{duration:.12}},transition:{duration:.28,ease:$},children:[t&&s.kind!=="site"&&e.jsx($a,{current:s.kind,onOpen:a}),s.kind==="work"&&e.jsx(ge,{title:"Work",bare:t,onClose:()=>a(null),children:e.jsx(La,{onOpen:l})}),s.kind==="site"&&e.jsx(_a,{win:s,project:de.find(r=>r.slug===s.slug),onChange:r=>a({...s,...r}),onNext:o,onBack:()=>a({kind:"work"}),sheet:t}),s.kind==="about"&&e.jsx(ge,{title:"About me",bare:t,onClose:()=>a(null),children:e.jsx(ca,{onOpenProject:l,onOpenCase:o})}),s.kind==="contact"&&e.jsx(ge,{title:"Contact",bare:t,onClose:()=>a(null),children:e.jsx(Ra,{})}),s.kind==="instagram"&&e.jsx(Ba,{sheet:t,onClose:()=>a(null)}),s.kind==="cat"&&e.jsx(ge,{title:"My cat",bare:t,onClose:()=>a(null),children:e.jsx(Aa,{sheet:t})})]},s.kind==="site"?`site-${s.slug}`:s.kind)}),!t&&e.jsx(Wa,{onProject:l,onOpen:a})]})}function Ea(){return e.jsxs("div",{"aria-hidden":"true",className:"absolute inset-0",children:[e.jsx("div",{className:"absolute -left-[10%] -top-[20%] h-[80%] w-[60%] rounded-full bg-[#D9E3FF] blur-[90px]"}),e.jsx("div",{className:"absolute -right-[5%] top-[10%] h-[70%] w-[50%] rounded-full bg-[#FBE3D3] blur-[100px]"}),e.jsx("div",{className:"absolute bottom-[-30%] left-[25%] h-[70%] w-[55%] rounded-full bg-[#E6F1E4] blur-[100px]"})]})}function Pa({onOpen:t}){const s=bs();return e.jsxs("div",{className:"absolute inset-x-0 top-0 z-10 flex h-8 items-center justify-between bg-white/55 px-4 text-[13px] backdrop-blur-xl",children:[e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsx("span",{className:"font-semibold",children:"Pradip Dhakal"}),e.jsx("button",{type:"button",className:"hover:text-accent",onClick:()=>t({kind:"work"}),children:"Work"}),e.jsx("button",{type:"button",className:"hover:text-accent",onClick:()=>t({kind:"about"}),children:"About"}),e.jsx("button",{type:"button",className:"hover:text-accent",onClick:()=>t({kind:"contact"}),children:"Contact"}),e.jsx("button",{type:"button",className:"hover:text-accent",onClick:()=>t({kind:"instagram"}),children:"Instagram"}),e.jsx("button",{type:"button",className:"hover:text-accent",onClick:()=>t({kind:"cat"}),children:"My cat"})]}),e.jsxs("span",{className:"tabular-nums text-fg/80",children:["Sydney ",s]})]})}const Fa=[{kind:"work",label:"Work"},{kind:"about",label:"About me"},{kind:"contact",label:"Contact"},{kind:"instagram",label:"Instagram"},{kind:"cat",label:"My cat"}];function $a({current:t,onOpen:s}){const a=x.useRef(null);return x.useEffect(()=>{var i;const n=(i=a.current)==null?void 0:i.querySelector("[aria-pressed=true]");n&&a.current&&(a.current.scrollLeft=n.offsetLeft-(a.current.clientWidth-n.offsetWidth)/2)},[t]),e.jsx("div",{ref:a,className:"flex shrink-0 gap-1 overflow-x-auto border-b border-black/[0.06] px-3 py-2",role:"group","aria-label":"Laptop windows",children:Fa.map(n=>e.jsx("button",{type:"button",onClick:()=>s({kind:n.kind}),"aria-pressed":t===n.kind,className:`h-9 shrink-0 rounded-full px-4 text-[14px] font-medium transition-colors ${t===n.kind?"bg-fg text-bg":"text-fg/70 hover:bg-black/[0.04]"}`,children:n.label},n.kind))})}function re({label:t,onOpen:s,children:a}){return e.jsxs("button",{type:"button",onClick:s,className:"group flex w-20 flex-col items-center gap-1.5",children:[e.jsx("span",{className:"grid h-14 w-14 place-items-center rounded-2xl bg-white/80 shadow-sm ring-1 ring-black/5 backdrop-blur transition-transform duration-200 group-hover:scale-105",children:a}),e.jsx("span",{className:"rounded px-1.5 text-[12px] font-medium text-fg/90",children:t})]})}function tt({children:t,onClose:s}){return e.jsxs("div",{className:"flex h-11 shrink-0 items-center gap-3 border-b border-black/[0.06] bg-[#F7F7F8] px-4",children:[s&&e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{type:"button",onClick:s,"aria-label":"Close window",className:"h-3 w-3 rounded-full bg-[#FF5F57] ring-1 ring-black/10"}),e.jsx("span",{className:"h-3 w-3 rounded-full bg-black/10","aria-hidden":"true"}),e.jsx("span",{className:"h-3 w-3 rounded-full bg-black/10","aria-hidden":"true"})]}),t]})}function ge({title:t,onClose:s,bare:a=!1,children:n}){return e.jsxs(e.Fragment,{children:[!a&&e.jsx(tt,{onClose:s,children:e.jsx("p",{className:`flex-1 text-center text-[13px] font-semibold text-fg/80 ${s?"pr-14":""}`,children:t})}),e.jsx("div",{"data-lenis-prevent":!0,className:"min-h-0 flex-1 overflow-y-auto",children:n})]})}function st({project:t,size:s=44}){return e.jsx("img",{src:t.logo,alt:"",width:s,height:s,className:"shrink-0 rounded-[22%] shadow-[0_1px_2px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06]",style:{width:s,height:s}})}function La({onOpen:t}){return e.jsxs("div",{className:"px-8 pb-10 pt-7",children:[e.jsx("h2",{className:"text-[28px] font-semibold tracking-tight",children:"Eight projects, all running."}),e.jsx("p",{className:"mt-1 text-[15px] text-muted",children:"Open one to use the real site. Everything here was built by me alone."}),e.jsx("ul",{className:"mt-6 grid grid-cols-2 gap-x-5 gap-y-6 @sm:grid-cols-4",children:de.map(s=>e.jsx("li",{children:e.jsxs("button",{type:"button",onClick:()=>t(s),className:"group w-full text-left",children:[e.jsx("span",{className:"block aspect-[16/10] overflow-hidden rounded-lg ring-1 ring-black/[0.08] transition-shadow duration-200 group-hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.35)]",style:{background:s.tint},children:s.cover?e.jsx("img",{src:s.cover,alt:"",className:"h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"}):e.jsx("span",{className:"grid h-full place-items-center",children:e.jsx(st,{project:s,size:56})})}),e.jsx("span",{className:"mt-2.5 block text-[15px] font-semibold leading-tight",children:s.name}),e.jsx("span",{className:"mt-0.5 block text-[13px] text-muted",children:s.kind})]})},s.slug))})]})}function _a({win:t,project:s,onChange:a,onNext:n,onBack:i,sheet:l}){var C;const{part:o,tab:r,caseOpen:h}=t,c=s.parts[o],d=s.parts.map((N,T)=>({p:N,i:T})).filter(({p:N})=>N.media.kind!=="gallery"),f=((C=c.url)==null?void 0:C.replace(/^https?:\/\/(www\.)?/,""))??s.name,p=r==="case",j=p?`sahildesk.local/work/${s.slug}`:f,y=()=>a({tab:"case",caseOpen:!0}),u=N=>a({tab:"site",part:s.parts[N].media.kind==="gallery"?o:N}),b=e.jsxs("div",{className:"relative min-h-0 flex-1",children:[e.jsx("div",{className:p?"invisible":"contents",children:e.jsx(Ia,{media:c.media,title:s.name,siteWidth:l?390:1280})}),p&&e.jsx("div",{"data-lenis-prevent":!0,className:"absolute inset-0 overflow-y-auto overscroll-contain bg-white",children:e.jsx(pa,{project:s,onSeePart:u,onNext:n},s.slug)})]});return l?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"shrink-0 border-b border-black/[0.06] bg-[#F7F7F8] px-2 py-1.5",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsxs("button",{type:"button",onClick:i,className:"inline-flex h-10 shrink-0 items-center rounded-lg pl-1 pr-2 text-[14px] font-medium text-fg/80",children:[e.jsx(rt,{className:"h-5 w-5","aria-hidden":"true"})," Work"]}),e.jsxs("div",{className:"min-w-0 flex-1 text-center leading-tight",children:[e.jsx("p",{className:"truncate text-[14px] font-semibold",children:s.name}),e.jsx("p",{className:"truncate text-[11px] text-muted",children:j})]}),e.jsx("span",{className:"w-[72px] shrink-0","aria-hidden":"true"})]}),e.jsxs("div",{className:"mt-1 flex rounded-lg bg-black/[0.05] p-0.5 text-[13px] font-medium",children:[d.map(({p:N,i:T})=>e.jsx("button",{type:"button",onClick:()=>a({tab:"site",part:T}),className:`h-8 flex-1 rounded-md ${!p&&T===o?"bg-white shadow-sm":"text-fg/60"}`,children:d.length>1?gt(N.title):"Site"},N.title)),e.jsx("button",{type:"button",onClick:y,className:`h-8 flex-1 rounded-md ${p?"bg-white shadow-sm":"text-fg/60"}`,children:"Case study"})]})]}),b]}):e.jsxs(e.Fragment,{children:[e.jsxs(tt,{onClose:i,children:[e.jsxs("button",{type:"button",onClick:i,className:"inline-flex items-center gap-0.5 rounded-md px-1.5 py-1 text-[13px] font-medium text-fg/80 hover:bg-black/5",children:[e.jsx(rt,{className:"h-4 w-4","aria-hidden":"true"})," All work"]}),e.jsxs("div",{className:"mx-auto flex h-7 min-w-0 max-w-md flex-1 items-center justify-center gap-1.5 rounded-md bg-black/[0.05] px-3 text-[13px] text-fg/70",children:[e.jsx(Lt,{className:"h-3 w-3 shrink-0","aria-hidden":"true"}),e.jsx("span",{className:"truncate",children:j})]}),d.length>1&&!p&&e.jsx("div",{className:"flex rounded-md bg-black/[0.05] p-0.5 text-[12px] font-medium",children:d.map(({p:N,i:T})=>e.jsx("button",{type:"button",onClick:()=>a({part:T}),className:`rounded px-2.5 py-1 ${T===o?"bg-white shadow-sm":"text-fg/60 hover:text-fg"}`,children:gt(N.title)},N.title))}),!p&&e.jsx("button",{type:"button",onClick:y,className:"inline-flex items-center gap-1 rounded-md px-2 py-1 text-[13px] font-medium text-accent hover:bg-accent/10",children:"Case study"}),c.url&&!p&&e.jsx("a",{href:c.url,target:"_blank",rel:"noopener noreferrer","aria-label":`Open ${f} in a new tab`,className:"grid h-7 w-7 place-items-center rounded-md text-fg/70 hover:bg-black/5",children:e.jsx(Ne,{className:"h-4 w-4","aria-hidden":"true"})})]}),h&&e.jsxs("div",{className:"flex shrink-0 gap-1 border-b border-black/[0.06] bg-[#ECECEF] px-2 pt-1.5",role:"tablist","aria-label":"Tabs",children:[e.jsx(bt,{active:!p,onClick:()=>a({tab:"site"}),icon:e.jsx(st,{project:s,size:16}),children:s.name}),e.jsxs(bt,{active:p,onClick:y,icon:e.jsx(Ft,{className:"h-3.5 w-3.5 text-accent","aria-hidden":"true"}),onClose:()=>a({tab:"site",caseOpen:!1}),children:["Case study · ",s.name]})]}),b]})}function bt({active:t,onClick:s,onClose:a,icon:n,children:i}){return e.jsxs("div",{className:`group flex h-8 min-w-0 max-w-[260px] flex-1 items-center gap-2 rounded-t-lg px-3 text-[12px] font-medium ${t?"bg-white text-fg":"text-fg/60 hover:bg-white/50"}`,children:[e.jsxs("button",{type:"button",role:"tab","aria-selected":t,onClick:s,className:"flex min-w-0 flex-1 items-center gap-2 text-left",children:[n,e.jsx("span",{className:"truncate",children:i})]}),a&&e.jsx("button",{type:"button",onClick:a,"aria-label":"Close the case study",className:"grid h-5 w-5 shrink-0 place-items-center rounded text-fg/50 hover:bg-black/5 hover:text-fg",children:e.jsx(Qe,{className:"h-3 w-3","aria-hidden":"true"})})]})}function Ia({media:t,title:s,siteWidth:a}){switch(t.kind){case"live":return e.jsx(Wt,{url:t.url,title:s,poster:t.poster,embedOnlyOn:t.embedOnlyOn,width:a});case"capture":return e.jsxs("div",{"data-lenis-prevent":!0,className:"absolute inset-0 overflow-y-auto overscroll-contain bg-white",children:[t.tiles.map((n,i)=>e.jsx("img",{src:n,alt:i===0?`${s}, home page`:"",loading:i<2?"eager":"lazy",className:"block w-full"},n)),e.jsxs("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",className:"btn btn-dark sticky bottom-4 left-full mr-4 shadow-lg",children:["A full-page capture · open the live site ",e.jsx(Ne,{className:"h-4 w-4","aria-hidden":"true"})]})]});case"review-demo":return e.jsx("div",{"data-lenis-prevent":!0,className:"absolute inset-0 overflow-y-auto overscroll-contain",children:e.jsx(Gs,{})});default:return null}}function Ra(){return e.jsxs("div",{className:"flex h-full flex-col items-center justify-center px-10 py-12 text-center",children:[e.jsx("p",{className:"text-[28px] font-semibold tracking-tight",children:"Let's build something your business runs on."}),e.jsx("p",{className:"mt-2 text-[15px] text-muted",children:"Freelance projects and full-time roles, in Sydney or remote."}),e.jsxs("a",{href:`mailto:${be.email}?subject=Hello%20Pradip`,className:"btn btn-primary mt-7 h-12 px-6 text-[16px]",children:[e.jsx(Ye,{className:"h-4 w-4","aria-hidden":"true"})," ",be.email]}),e.jsx("div",{className:"mt-5 flex flex-wrap justify-center gap-2",children:be.links.map(t=>e.jsx("a",{href:t.href,...We(),className:"btn btn-secondary h-10",children:t.label},t.label))})]})}function Wa({onProject:t,onOpen:s}){return e.jsxs("div",{className:"absolute bottom-3 left-1/2 flex -translate-x-1/2 items-end gap-2.5 rounded-[24px] bg-white/55 p-2.5 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_10px_30px_-10px_rgba(0,0,0,0.25)] backdrop-blur-2xl",children:[de.map(a=>e.jsxs("button",{type:"button",onClick:()=>t(a),title:a.name,className:"transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-110",children:[e.jsx(st,{project:a,size:46}),e.jsx("span",{className:"sr-only",children:a.name})]},a.slug)),e.jsx("span",{className:"mx-1 h-10 w-px self-center bg-black/10","aria-hidden":"true"}),e.jsxs("button",{type:"button",onClick:()=>s({kind:"about"}),title:"About me",className:"grid h-[46px] w-[46px] place-items-center rounded-[22%] bg-white ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1.5 hover:scale-110",children:[e.jsx(Rt,{className:"h-5 w-5","aria-hidden":"true"}),e.jsx("span",{className:"sr-only",children:"About me"})]}),e.jsxs("button",{type:"button",onClick:()=>s({kind:"instagram"}),title:"Instagram",className:"transition-transform duration-200 hover:-translate-y-1.5 hover:scale-110",children:[e.jsx(Mt,{size:46,className:"ring-1 ring-black/5"}),e.jsx("span",{className:"sr-only",children:"Instagram"})]}),e.jsxs("button",{type:"button",onClick:()=>s({kind:"cat"}),title:"My cat",className:"transition-transform duration-200 hover:-translate-y-1.5 hover:scale-110",children:[e.jsx(Ut,{size:46,className:"ring-1 ring-black/5"}),e.jsx("span",{className:"sr-only",children:"My cat"})]}),e.jsxs("button",{type:"button",onClick:()=>s({kind:"contact"}),title:"Contact",className:"grid h-[46px] w-[46px] place-items-center rounded-[22%] bg-accent text-white ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1.5 hover:scale-110",children:[e.jsx(Ye,{className:"h-5 w-5","aria-hidden":"true"}),e.jsx("span",{className:"sr-only",children:"Contact"})]})]})}function Ut({size:t,className:s=""}){return e.jsx("span",{className:`grid place-items-center rounded-[22%] bg-[#F08A3E] text-white ${s}`,style:{width:t,height:t},children:e.jsx(Fs,{style:{width:t*.5,height:t*.5},strokeWidth:2.2,"aria-hidden":"true"})})}function Da({className:t=""}){return e.jsx("svg",{viewBox:"0 0 24 24",className:`fill-current ${t}`,"aria-hidden":"true",children:e.jsx("path",{d:is.instagram})})}function Ba({sheet:t,onClose:s}){const a=be.instagram,[n,i]=x.useState(!1),l=()=>{rs(a.href),i(!0)},o=e.jsx("div",{"data-lenis-prevent":!0,className:"min-h-0 flex-1 overflow-y-auto",children:e.jsxs("div",{className:`mx-auto w-full max-w-[640px] ${t?"px-5 pb-8 pt-6":"px-8 pb-10 pt-9"}`,children:[e.jsxs("div",{className:`flex gap-7 ${t?"flex-col items-center text-center":"items-center"}`,children:[e.jsx("img",{src:Ae.avatar,alt:"Sahil Singla",className:"h-28 w-28 shrink-0 rounded-full object-cover ring-1 ring-black/[0.08] ring-offset-4 ring-offset-white"}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("p",{className:"text-[22px] font-semibold tracking-tight",children:"Pradip Dhakal"}),e.jsx("p",{className:"mt-0.5 text-[15px] text-muted",children:a.handle}),e.jsx("p",{className:"mt-1.5 text-[15px] leading-snug text-fg/80",children:"portfolio:deployed. life:beta."}),e.jsxs("div",{className:`mt-4 flex gap-2 ${t?"justify-center":""}`,children:[e.jsxs("button",{type:"button",onClick:l,className:"btn btn-primary h-10 px-5 text-[15px]",children:[e.jsx(Da,{className:"h-4 w-4"})," ",n?"Open Instagram again":"Follow on Instagram"]}),e.jsx("a",{href:a.message,...We(),className:"btn btn-secondary h-10 px-4 text-[15px]",children:"Message"})]}),e.jsx(Y,{children:n&&e.jsx(w.p,{className:"mt-3 text-[14px] text-muted",initial:{opacity:0,y:4},animate:{opacity:1,y:0},transition:{duration:.25,ease:$},children:"Instagram opened in a new tab. Thanks for following, it means a lot."})})]})]}),Ae.posts.length>0&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mt-8 flex justify-center border-t border-black/[0.08]",children:e.jsxs("span",{className:"-mt-px flex items-center gap-1.5 border-t border-fg pt-3 text-[12px] font-semibold uppercase tracking-[0.08em]",children:[e.jsx(_s,{className:"h-3.5 w-3.5","aria-hidden":"true"})," Posts"]})}),e.jsx("div",{className:`mt-3 grid gap-1 ${t?"grid-cols-3":"grid-cols-4"}`,children:Ae.posts.map(r=>e.jsxs("a",{href:r.link,...We(),className:"group relative block overflow-hidden bg-surface",children:[e.jsx("img",{src:r.image,alt:r.alt,loading:"lazy",className:"aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"}),r.kind!=="photo"&&e.jsx("span",{className:"absolute right-2 top-2 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]","aria-label":r.kind==="album"?"Several photos":"Video",children:r.kind==="album"?e.jsx(Je,{className:"h-4 w-4","aria-hidden":"true"}):e.jsx(Ze,{className:"h-4 w-4 fill-current","aria-hidden":"true"})}),e.jsx("span",{className:"absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/20","aria-hidden":"true"})]},r.image))})]})]})});return t?o:e.jsxs(e.Fragment,{children:[e.jsxs(tt,{onClose:s,children:[e.jsxs("div",{className:"mx-auto flex h-7 min-w-0 max-w-md flex-1 items-center justify-center gap-1.5 rounded-md bg-black/[0.05] px-3 text-[13px] text-fg/70",children:[e.jsx(Lt,{className:"h-3 w-3 shrink-0","aria-hidden":"true"}),e.jsxs("span",{className:"truncate",children:["instagram.com/",a.handle]})]}),e.jsx("span",{className:"w-14 shrink-0","aria-hidden":"true"})]}),o]})}const Oa=[{id:"bright",name:"Bright copper wire",price:11.6,range:[4,40]},{id:"no1",name:"No. 1 copper",price:11.1,range:[8,60]},{id:"brass",name:"Mixed brass",price:6.6,range:[10,80]},{id:"rims",name:"Aluminium rims",price:2.7,range:[20,120]},{id:"ss304",name:"Stainless 304",price:1.4,range:[30,200]},{id:"batteries",name:"Car batteries",price:.6,range:[40,260]}],za="Riverbend Demolition",Vt=44813;let Le=Vt;const Ha=5,Ua=26,_e=(t,s)=>{const a=Number(t.replace(/[^0-9.]/g,""));return t.trim()!==""&&Number.isFinite(a)&&a>0&&a<=s?a:null},fe=t=>Math.round(t*10)/10,Ie=t=>Math.round(t*100)/100,q=t=>t.toLocaleString("en-AU",{style:"currency",currency:"AUD"}),Va=()=>new Intl.DateTimeFormat("en-AU",{timeZone:"Australia/Sydney",day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(new Date);function Ga(t,s,a,n,i,l){return["DEMO METALS PTY LTD",`PURCHASE DOCKET 0${s}`,Va(),`Seller: ${i.trim().replace(/\s+/g," ")||"Walk-in seller"}`,"--",...t.flatMap(o=>[o.name,`  ${o.kg} kg x $${o.price.toFixed(2)}	${q(o.value)}`]),"--",`TOTAL	${q(a)}`,`GST included	${q(n)}`,`PAID	${l.toUpperCase()}`,"--","Weighed in front of you. Thank you."]}function AmbientCanvas({ effect, accent }) {
  const canvasRef = x.useRef(null);
  x.useEffect(() => {
    if (!effect || effect === "off") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth || 1180;
        canvas.height = canvas.parentElement.clientHeight || 783;
      } else {
        canvas.width = 1180;
        canvas.height = 783;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let r = 167, g = 139, b = 250;
    if (accent && accent.startsWith("#")) {
      const hex = accent.replace("#", "");
      const num = parseInt(hex.length === 3 ? hex.split("").map(c => c + c).join("") : hex, 16);
      r = (num >> 16) & 255;
      g = (num >> 8) & 255;
      b = num & 255;
    }

    const E = (min, max) => min + Math.random() * (max - min);
    const count = effect === "rain" ? 180 : effect === "bubbles" ? 45 : effect === "stars" ? 90 : 80;
    const particles = [];

    for (let i = 0; i < count; i++) {
      if (effect === "rain") {
        particles.push({
          x: E(0, canvas.width || 1200),
          y: E(-60, canvas.height || 800),
          vx: 1.5,
          vy: E(14, 24),
          len: E(24, 46),
          r: E(1.2, 2.2),
          a: E(0.35, 0.8)
        });
      } else if (effect === "bubbles") {
        particles.push({
          x: E(0, canvas.width || 1200),
          y: E(0, canvas.height || 800),
          vx: E(-0.25, 0.25),
          vy: E(-0.8, -1.8),
          r: E(6, 18),
          a: E(0.3, 0.7),
          wobble: E(0, 6.28)
        });
      } else if (effect === "stars") {
        particles.push({
          x: E(0, canvas.width || 1200),
          y: E(0, canvas.height || 800),
          vy: E(0.02, 0.08),
          r: E(1.2, 3),
          a: E(0.4, 1),
          phase: E(0, 6.28)
        });
      } else { // motes
        particles.push({
          x: E(0, canvas.width || 1200),
          y: E(0, canvas.height || 800),
          vx: E(-0.35, 0.35),
          vy: E(-0.4, -1.2),
          r: E(1.5, 4),
          a: E(0.4, 0.95)
        });
      }
    }

    function renderFrame() {
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      if (effect === "rain") {
        for (const p of particles) {
          ctx.strokeStyle = "rgba(" + r + "," + g + "," + b + "," + p.a + ")";
          ctx.lineWidth = p.r;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 3, p.y + p.len);
          ctx.stroke();

          p.x += p.vx;
          p.y += p.vy;
          if (p.y > ch + 40) {
            p.y = -50;
            p.x = E(0, cw);
          }
        }
      } else if (effect === "bubbles") {
        for (const p of particles) {
          p.wobble += 0.03;
          const ox = p.x + Math.sin(p.wobble) * 3;
          ctx.beginPath();
          ctx.arc(ox, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (p.a * 0.22) + ")";
          ctx.fill();
          ctx.lineWidth = 1.4;
          ctx.strokeStyle = "rgba(255, 255, 255," + (p.a * 0.7) + ")";
          ctx.stroke();

          // Bubble specular reflection shine
          ctx.beginPath();
          ctx.arc(ox - p.r * 0.32, p.y - p.r * 0.32, p.r * 0.22, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255," + (p.a * 0.8) + ")";
          ctx.fill();

          p.y += p.vy;
          p.x += p.vx;
          if (p.y < -p.r - 10) {
            p.y = ch + p.r + 10;
            p.x = E(0, cw);
          }
        }
      } else if (effect === "stars") {
        const time = Date.now() * 0.003;
        for (const p of particles) {
          const pulse = 0.5 + 0.5 * Math.sin(time + p.phase);
          ctx.fillStyle = "rgba(255, 255, 255," + (p.a * pulse) + ")";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();

          p.y += p.vy;
          if (p.y > ch) {
            p.y = 0;
            p.x = E(0, cw);
          }
        }
      } else { // motes
        ctx.shadowBlur = 14;
        ctx.shadowColor = "rgba(" + r + "," + g + "," + b + ", 0.9)";
        for (const p of particles) {
          ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + p.a + ")";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -15) { p.y = ch + 15; p.x = E(0, cw); }
          if (p.x < -15) p.x = cw + 15;
          if (p.x > cw + 15) p.x = -15;
        }
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(renderFrame);
    }

    animId = requestAnimationFrame(renderFrame);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [effect, accent]);

  if (!effect || effect === "off") return null;
  return e.jsx("canvas", {
    ref: canvasRef,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 4
    }
  });
}

function Xa({sheet:t=!1,onPrint:s}){
  const engine = window.PomodoroEngine;
  const [pomo, setPomo] = x.useState(engine ? engine.getState() : {
    mode: "focus", timeLeft: 1500, totalTime: 1500, isRunning: false, sessions: 0, streak: 1,
    focusMin: 25, shortMin: 5, longMin: 15, quote: "“It always seems impossible until it’s done.”",
    theme: "fantasy", accent: "#a78bfa", ambientEffect: "off", customBgUrl: null,
    tasks: [
      { id: 1, title: 'Study Three.js 3D shaders & lighting', completed: true, est: 2, act: 2, prio: 'high' },
      { id: 2, title: 'Build Pomodoro focus session clone', completed: false, est: 4, act: 1, prio: 'high' },
      { id: 3, title: 'Configure ambient lo-fi soundscapes', completed: false, est: 3, act: 0, prio: 'medium' }
    ],
    activeTaskId: 2
  });

  const [tasksOpen, setTasksOpen] = x.useState(false);
  const [themesOpen, setThemesOpen] = x.useState(false);
  const [settingsOpen, setSettingsOpen] = x.useState(false);
  const [photosOpen, setPhotosOpen] = x.useState(false);
  const [editingQuote, setEditingQuote] = x.useState(false);
  const [quoteInput, setQuoteInput] = x.useState(pomo.quote);
  const [taskFilter, setTaskFilter] = x.useState("all");
  const [newTaskTitle, setNewTaskTitle] = x.useState("");
  const [newTaskEst, setNewTaskEst] = x.useState(2);
  const [newTaskPrio, setNewTaskPrio] = x.useState("medium");
  const fileInputRef = x.useRef(null);

  x.useEffect(() => {
    if (!engine) return;
    const unsub = engine.subscribe((newState) => {
      setPomo({ ...newState });
    });
    return () => unsub();
  }, [engine]);

  const accent = pomo.accent || "#a78bfa";
  const mins = Math.floor(pomo.timeLeft / 60);
  const secs = pomo.timeLeft % 60;
  const timeFormatted = String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");

  const progress = Math.min(1, Math.max(0, 1 - pomo.timeLeft / pomo.totalTime));
  const radius = 132;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * progress;

  const activeTask = (pomo.tasks || []).find(tk => tk.id === pomo.activeTaskId);

  const filteredTasks = (pomo.tasks || []).filter(tk => {
    if (taskFilter === "active") return !tk.completed;
    if (taskFilter === "completed") return tk.completed;
    return true;
  });

  const handleAddTask = (ev) => {
    ev.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      completed: false,
      est: Number(newTaskEst) || 1,
      act: 0,
      prio: newTaskPrio
    };
    pomo.tasks.push(newTask);
    if (!pomo.activeTaskId) pomo.activeTaskId = newTask.id;
    setNewTaskTitle("");
    if (engine) engine.renderToCanvas();
    setPomo({ ...pomo });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (re) => {
        const url = re.target.result;
        if (engine && engine.setCustomBg) engine.setCustomBg(url);
        pomo.theme = "custom";
        pomo.customBgUrl = url;
        setPomo({ ...pomo });
        setPhotosOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentBgUrl = pomo.theme === "custom" && pomo.customBgUrl
    ? pomo.customBgUrl
    : pomo.theme === "pastel"
    ? "/bg-pastel.webp"
    : pomo.theme === "lofi"
    ? "/bg-lofi.webp"
    : pomo.theme === "cyberpunk"
    ? "/bg-cyberpunk.webp"
    : "/bg-fantasy.webp";

  const scenes = [
    { id: "fantasy", label: "Fantasy", thumb: "/bg-fantasy-thumb.webp" },
    { id: "pastel", label: "Pastel", thumb: "/bg-pastel-thumb.webp" },
    { id: "lofi", label: "Lofi", thumb: "/bg-lofi-thumb.webp" },
    { id: "cyberpunk", label: "Cyberpunk", thumb: "/bg-cyberpunk-thumb.webp" }
  ];

  const swatches = [
    { label: "Blue", color: "#60a5fa" },
    { label: "Violet", color: "#a78bfa" },
    { label: "Teal", color: "#2dd4bf" },
    { label: "Lime", color: "#a3e635" },
    { label: "Rose", color: "#fb7185" },
    { label: "Amber", color: "#f2c879" }
  ];

  const ambientEffects = [
    { id: "off", label: "Off" },
    { id: "motes", label: "Motes" },
    { id: "stars", label: "Stars" },
    { id: "rain", label: "Rain" },
    { id: "bubbles", label: "Bubbles" }
  ];

  return e.jsxs("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      minHeight: "740px",
      overflow: "hidden",
      backgroundColor: "#07060e",
      color: "#ffffff",
      fontFamily: "'Space Grotesk', Figtree, sans-serif",
      userSelect: "none"
    },
    children: [
      /* DYNAMIC LIVING WALLPAPER: REAL VIDEO FOR LOFI, WEBP FOR OTHERS */
      pomo.theme === "lofi" ? e.jsx("video", {
        src: "/bg-lofi.mp4",
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        disablePictureInPicture: true,
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.85)",
          pointerEvents: "none"
        }
      }) : e.jsx("div", {
        style: {
          position: "absolute",
          inset: 0,
          backgroundImage: "url(" + currentBgUrl + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.85)",
          transition: "background-image 0.4s ease, filter 0.4s ease"
        }
      }),

      /* RADIAL VIGNETTE SCRIM */
      e.jsx("div", {
        style: {
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 45%, rgba(7,6,14,0.2) 0%, rgba(7,6,14,0.68) 70%, rgba(7,6,14,0.96) 100%)",
          pointerEvents: "none"
        }
      }),

      /* CANVAS-DRIVEN ANIMATED AMBIENT EFFECTS (100% REPLICA OF POMODOROTIMER.ONLINE) */
      e.jsx(AmbientCanvas, { effect: pomo.ambientEffect || "off", accent: accent }),

      /* TOPBAR BRAND & SHORTCUTS (EXACT 1:1 WITH CANVAS TEXTURE) */
      e.jsxs("div", {
        style: {
          position: "absolute",
          top: "22px",
          left: "32px",
          right: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10
        },
        children: [
          e.jsx("div", {
            style: { fontSize: "21px", fontWeight: "700", letterSpacing: "-0.02em", color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif" },
            children: "Pomodoro Timer"
          }),
          e.jsxs("div", {
            style: { display: "flex", alignItems: "center", gap: "10px" },
            children: [
              e.jsxs("div", {
                style: {
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "999px",
                  padding: "6px 14px",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backdropFilter: "blur(8px)"
                },
                children: [e.jsx("span", { children: "🔥" }), e.jsx("span", { children: pomo.streak })]
              }),
              e.jsxs("button", {
                type: "button",
                onClick: () => setThemesOpen(!themesOpen),
                style: {
                  background: themesOpen ? "rgba(167, 139, 250, 0.24)" : "rgba(255, 255, 255, 0.08)",
                  border: themesOpen ? "1px solid " + accent : "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "999px",
                  padding: "6px 14px",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.15s ease"
                },
                children: [e.jsx("span", { children: "🎨" }), e.jsx("span", { children: "Aesthetics" })]
              }),
              e.jsxs("button", {
                type: "button",
                onClick: () => setSettingsOpen(!settingsOpen),
                style: {
                  background: settingsOpen ? "rgba(255, 255, 255, 0.16)" : "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "999px",
                  padding: "6px 14px",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.15s ease"
                },
                children: [e.jsx("span", { children: "⚙️" }), e.jsx("span", { children: "Settings" })]
              })
            ]
          })
        ]
      }),

      /* VERTICAL LEFT NAV DOCK */
      e.jsxs("div", {
        style: {
          position: "absolute",
          left: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          background: "rgba(14, 10, 22, 0.72)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "16px",
          padding: "8px",
          zIndex: 35,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)"
        },
        children: [
          e.jsx("button", {
            type: "button",
            title: "Today's challenge",
            "aria-label": "Today's challenge",
            style: {
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "18px",
              transition: "all 0.15s ease"
            },
            children: "🏆"
          }),
          e.jsxs("button", {
            type: "button",
            title: pomo.streak + "-day focus streak",
            "aria-label": pomo.streak + "-day focus streak",
            style: {
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "transparent",
              border: "none",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "700",
              transition: "all 0.15s ease"
            },
            children: [
              e.jsx("span", { style: { fontSize: "14px", lineHeight: "1" }, children: "🔥" }),
              e.jsx("span", { style: { fontSize: "11px", opacity: 0.9, marginTop: "1px" }, children: pomo.streak })
            ]
          }),
          e.jsx("button", {
            type: "button",
            onClick: () => setThemesOpen(!themesOpen),
            title: "Aesthetics",
            "aria-label": "Aesthetics",
            style: {
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: themesOpen ? "rgba(167, 139, 250, 0.22)" : "transparent",
              border: themesOpen ? "1px solid " + accent : "none",
              color: themesOpen ? accent : "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "18px",
              transition: "all 0.15s ease"
            },
            children: "🎨"
          }),
          e.jsx("button", {
            type: "button",
            onClick: () => setSettingsOpen(!settingsOpen),
            title: "Settings",
            "aria-label": "Settings",
            style: {
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: settingsOpen ? "rgba(255, 255, 255, 0.15)" : "transparent",
              border: "none",
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "18px",
              transition: "all 0.15s ease"
            },
            children: "⚙️"
          })
        ]
      }),

      /* AUTHENTIC AESTHETICS POPOVER PANEL */
      themesOpen ? e.jsxs("section", {
        className: "preference-panel",
        style: {
          position: "absolute",
          left: "86px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "368px",
          maxHeight: "calc(100% - 60px)",
          color: "#ffffff",
          backgroundColor: "rgba(16, 12, 26, 0.94)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "20px",
          backdropFilter: "blur(24px)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 45
        },
        children: [
          e.jsxs("header", {
            style: {
              flex: "0 0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 16px 12px 20px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
            },
            children: [
              e.jsx("h2", {
                style: {
                  fontSize: "17px",
                  fontWeight: "600",
                  color: "#ffffff",
                  margin: 0,
                  fontFamily: "'Space Grotesk', sans-serif"
                },
                children: "Aesthetics"
              }),
              e.jsx("button", {
                type: "button",
                onClick: () => setThemesOpen(false),
                "aria-label": "Close panel",
                style: {
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "all 0.15s ease"
                },
                children: "✕"
              })
            ]
          }),

          e.jsxs("div", {
            style: {
              padding: "16px 20px 20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            },
            children: [
              /* 1. Background Group */
              e.jsxs("fieldset", {
                style: { border: "none", margin: 0, padding: 0 },
                children: [
                  e.jsx("legend", {
                    style: { fontSize: "13px", fontWeight: "500", color: "#94a3b8", marginBottom: "10px" },
                    children: "Background"
                  }),
                  e.jsx("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      gap: "10px"
                    },
                    children: scenes.map((sc) => {
                      const isSelected = pomo.theme === sc.id;
                      return e.jsxs("button", {
                        key: sc.id,
                        type: "button",
                        "aria-pressed": isSelected,
                        onClick: () => {
                          if (engine && engine.setTheme) engine.setTheme(sc.id);
                          pomo.theme = sc.id;
                          setPomo({ ...pomo });
                        },
                        style: {
                          borderRadius: "12px",
                          backgroundColor: isSelected ? "rgba(167, 139, 250, 0.2)" : "rgba(255, 255, 255, 0.05)",
                          border: isSelected ? "1.5px solid " + accent : "1px solid rgba(255, 255, 255, 0.08)",
                          position: "relative",
                          overflow: "hidden",
                          cursor: "pointer",
                          padding: 0,
                          textAlign: "left",
                          transition: "all 0.15s ease"
                        },
                        children: [
                          e.jsx("img", {
                            src: sc.thumb,
                            alt: sc.label,
                            style: { width: "100%", height: "64px", objectFit: "cover", display: "block" }
                          }),
                          e.jsx("span", {
                            style: {
                              display: "block",
                              fontSize: "13px",
                              fontWeight: isSelected ? "600" : "500",
                              color: isSelected ? "#ffffff" : "#cbd5e1",
                              padding: "7px 10px"
                            },
                            children: sc.label
                          }),
                          isSelected ? e.jsx("span", {
                            style: {
                              position: "absolute",
                              top: "6px",
                              right: "6px",
                              width: "22px",
                              height: "22px",
                              borderRadius: "999px",
                              backgroundColor: accent,
                              color: "#0f0a1c",
                              display: "grid",
                              placeItems: "center",
                              fontSize: "12px",
                              fontWeight: "bold",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.5)"
                            },
                            children: "✓"
                          }) : null
                        ]
                      });
                    })
                  }),
                  e.jsxs("button", {
                    type: "button",
                    onClick: () => setPhotosOpen(true),
                    style: {
                      borderRadius: "10px",
                      backgroundColor: pomo.theme === "custom" ? "rgba(167, 139, 250, 0.2)" : "rgba(255, 255, 255, 0.05)",
                      border: pomo.theme === "custom" ? "1.5px solid " + accent : "1px solid rgba(255, 255, 255, 0.08)",
                      width: "100%",
                      minHeight: "44px",
                      fontSize: "13px",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "10px",
                      padding: "8px 12px",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.15s ease"
                    },
                    children: [
                      e.jsx("span", { style: { fontSize: "16px" }, children: "🖼️" }),
                      e.jsx("span", { style: { flex: "1 1 0%", fontWeight: "500" }, children: "Your photos" }),
                      e.jsx("span", {
                        style: {
                          color: accent,
                          fontSize: "11px",
                          fontWeight: "700",
                          backgroundColor: "rgba(167, 139, 250, 0.18)",
                          padding: "2px 6px",
                          borderRadius: "4px"
                        },
                        children: "New"
                      }),
                      e.jsx("span", { style: { color: "#94a3b8", fontSize: "14px" }, children: "›" })
                    ]
                  })
                ]
              }),

              /* 2. Accent Group */
              e.jsxs("fieldset", {
                style: { border: "none", margin: 0, padding: 0 },
                children: [
                  e.jsx("legend", {
                    style: { fontSize: "13px", fontWeight: "500", color: "#94a3b8", marginBottom: "10px" },
                    children: "Accent"
                  }),
                  e.jsx("div", {
                    style: { display: "flex", justifyContent: "space-between", gap: "6px" },
                    children: swatches.map((sw) => {
                      const isSelected = accent.toLowerCase() === sw.color.toLowerCase();
                      return e.jsx("button", {
                        key: sw.label,
                        type: "button",
                        "aria-label": sw.label,
                        "aria-pressed": isSelected,
                        onClick: () => {
                          if (engine && engine.setAccent) engine.setAccent(sw.color);
                          pomo.accent = sw.color;
                          setPomo({ ...pomo });
                        },
                        style: {
                          width: "44px",
                          height: "44px",
                          borderRadius: "10px",
                          backgroundColor: "rgba(255, 255, 255, 0.04)",
                          border: "none",
                          display: "grid",
                          placeItems: "center",
                          cursor: "pointer",
                          padding: 0,
                          transition: "all 0.15s ease"
                        },
                        children: e.jsx("span", {
                          style: {
                            width: "26px",
                            height: "26px",
                            borderRadius: "999px",
                            backgroundColor: sw.color,
                            display: "grid",
                            placeItems: "center",
                            color: "#0f0a1c",
                            fontSize: "12px",
                            fontWeight: "bold",
                            outline: isSelected ? "2px solid #ffffff" : "none",
                            outlineOffset: "3px",
                            transform: isSelected ? "scale(1.08)" : "scale(1)",
                            transition: "all 0.15s ease"
                          },
                          children: isSelected ? "✓" : ""
                        })
                      });
                    })
                  })
                ]
              }),

              /* 3. Ambient Effect Group */
              e.jsxs("fieldset", {
                style: { border: "none", margin: 0, padding: 0 },
                children: [
                  e.jsx("legend", {
                    style: { fontSize: "13px", fontWeight: "500", color: "#94a3b8", marginBottom: "10px" },
                    children: "Ambient effect"
                  }),
                  e.jsx("div", {
                    style: { display: "flex", flexWrap: "wrap", gap: "6px" },
                    children: ambientEffects.map((eff) => {
                      const isSelected = (pomo.ambientEffect || "off") === eff.id;
                      return e.jsxs("button", {
                        key: eff.id,
                        type: "button",
                        "aria-pressed": isSelected,
                        onClick: () => {
                          if (engine && engine.setAmbientEffect) engine.setAmbientEffect(eff.id);
                          pomo.ambientEffect = eff.id;
                          setPomo({ ...pomo });
                        },
                        style: {
                          borderRadius: "8px",
                          backgroundColor: isSelected ? "rgba(167, 139, 250, 0.24)" : "rgba(255, 255, 255, 0.05)",
                          border: isSelected ? "1.5px solid " + accent : "1px solid rgba(255, 255, 255, 0.08)",
                          minHeight: "40px",
                          color: isSelected ? "#ffffff" : "#cbd5e1",
                          fontSize: "13px",
                          fontWeight: isSelected ? "600" : "500",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "6px",
                          padding: "6px 14px",
                          display: "flex",
                          cursor: "pointer",
                          flex: "1 1 calc(33% - 6px)",
                          transition: "all 0.15s ease"
                        },
                        children: [
                          isSelected ? e.jsx("span", { style: { color: accent, fontSize: "11px", fontWeight: "bold" }, children: "✓" }) : null,
                          e.jsx("span", { children: eff.label })
                        ]
                      });
                    })
                  })
                ]
              })
            ]
          })
        ]
      }) : null,

      /* YOUR PHOTOS UPLOADER MODAL */
      photosOpen ? e.jsxs("div", {
        style: {
          position: "absolute",
          inset: 0,
          zIndex: 50,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        },
        children: [
          e.jsxs("div", {
            style: {
              width: "440px",
              backgroundColor: "rgba(16, 12, 26, 0.95)",
              border: "1.5px dashed " + accent,
              borderRadius: "20px",
              padding: "36px 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "16px",
              cursor: "pointer",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9)"
            },
            onClick: () => fileInputRef.current && fileInputRef.current.click(),
            children: [
              e.jsx("input", {
                ref: fileInputRef,
                type: "file",
                accept: "image/jpeg,image/png,image/webp",
                onChange: handlePhotoUpload,
                style: { display: "none" }
              }),
              e.jsx("div", {
                style: {
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(167, 139, 250, 0.15)",
                  color: accent,
                  display: "grid",
                  placeItems: "center",
                  fontSize: "26px"
                },
                children: "🖼️"
              }),
              e.jsxs("div", {
                children: [
                  e.jsx("div", { style: { fontSize: "16px", fontWeight: "700", color: "#ffffff", marginBottom: "6px" }, children: "Drop an image, or click to browse" }),
                  e.jsx("div", { style: { fontSize: "12px", color: "#94a3b8" }, children: "JPEG, PNG or WebP, up to 20 MB, stays on your device" })
                ]
              }),
              e.jsx("button", {
                type: "button",
                onClick: (ev) => {
                  ev.stopPropagation();
                  setPhotosOpen(false);
                },
                style: {
                  marginTop: "8px",
                  padding: "8px 20px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer"
                },
                children: "Cancel"
              })
            ]
          })
        ]
      }) : null,

      /* CENTER STAGE (DIAL & QUOTE) */
      e.jsxs("div", {
        style: {
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5
        },
        children: [
          /* SEGMENTED MODE TABS */
          e.jsxs("div", {
            style: {
              display: "inline-flex",
              gap: "28px",
              padding: "6px 16px",
              marginBottom: "24px",
              position: "relative"
            },
            children: [
              e.jsxs("button", {
                type: "button",
                onClick: () => engine && engine.setMode("focus"),
                style: {
                  background: "none",
                  border: "none",
                  color: pomo.mode === "focus" ? "#ffffff" : "rgba(255, 255, 255, 0.55)",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                  position: "relative",
                  paddingBottom: "8px"
                },
                children: [
                  "Focus ",
                  e.jsx("span", { style: { opacity: 0.8 }, children: pomo.sessions }),
                  pomo.mode === "focus" ? e.jsx("span", {
                    style: {
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2.5px",
                      backgroundColor: accent,
                      boxShadow: "0 0 10px " + accent,
                      borderRadius: "999px"
                    }
                  }) : null
                ]
              }),
              e.jsxs("button", {
                type: "button",
                onClick: () => engine && engine.setMode("short"),
                style: {
                  background: "none",
                  border: "none",
                  color: pomo.mode === "short" ? "#ffffff" : "rgba(255, 255, 255, 0.55)",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                  position: "relative",
                  paddingBottom: "8px"
                },
                children: [
                  "Short Break 0",
                  pomo.mode === "short" ? e.jsx("span", {
                    style: {
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2.5px",
                      backgroundColor: accent,
                      boxShadow: "0 0 10px " + accent,
                      borderRadius: "999px"
                    }
                  }) : null
                ]
              }),
              e.jsxs("button", {
                type: "button",
                onClick: () => engine && engine.setMode("long"),
                style: {
                  background: "none",
                  border: "none",
                  color: pomo.mode === "long" ? "#ffffff" : "rgba(255, 255, 255, 0.55)",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                  position: "relative",
                  paddingBottom: "8px"
                },
                children: [
                  "Long Break 0",
                  pomo.mode === "long" ? e.jsx("span", {
                    style: {
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2.5px",
                      backgroundColor: accent,
                      boxShadow: "0 0 10px " + accent,
                      borderRadius: "999px"
                    }
                  }) : null
                ]
              })
            ]
          }),

          /* DIAL (CIRCULAR TIMER) */
          e.jsxs("div", {
            style: {
              position: "relative",
              width: "320px",
              height: "320px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: [
              e.jsxs("svg", {
                style: { position: "absolute", inset: 0, width: "100%", height: "100%", transform: "rotate(-90deg)" },
                viewBox: "0 0 300 300",
                children: [
                  e.jsxs("defs", {
                    children: [
                      e.jsxs("linearGradient", {
                        id: "rgClone",
                        x1: "0%", y1: "0%", x2: "100%", y2: "100%",
                        children: [
                          e.jsx("stop", { offset: "0%", stopColor: "#ffffff", stopOpacity: "0.95" }),
                          e.jsx("stop", { offset: "100%", stopColor: accent })
                        ]
                      })
                    ]
                  }),
                  e.jsx("circle", {
                    cx: "150", cy: "150", r: radius,
                    stroke: "rgba(255,255,255,0.12)", strokeWidth: "7", fill: "none"
                  }),
                  e.jsx("circle", {
                    cx: "150", cy: "150", r: radius,
                    stroke: "url(#rgClone)", strokeWidth: "8", strokeLinecap: "round", fill: "none",
                    strokeDasharray: circumference, strokeDashoffset: strokeDashoffset,
                    style: { filter: "drop-shadow(0 0 8px " + accent + ")", transition: "stroke-dashoffset 0.6s ease" }
                  })
                ]
              }),
              e.jsxs("div", {
                style: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
                children: [
                  e.jsx("div", {
                    style: {
                      fontSize: "82px",
                      fontWeight: "800",
                      letterSpacing: "-0.04em",
                      color: "#ffffff",
                      fontFamily: "'Space Grotesk', sans-serif",
                      lineHeight: "1"
                    },
                    children: timeFormatted
                  }),
                  e.jsxs("div", {
                    style: {
                      marginTop: "14px",
                      padding: "5px 16px",
                      borderRadius: "999px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      fontSize: "13px",
                      color: "rgba(255, 255, 255, 0.85)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    },
                    children: [
                      e.jsx("span", {
                        style: {
                          width: "6px",
                          height: "6px",
                          borderRadius: "999px",
                          backgroundColor: pomo.isRunning ? "#34d399" : accent,
                          boxShadow: pomo.isRunning ? "0 0 6px #34d399" : "none"
                        }
                      }),
                      e.jsx("span", { children: pomo.isRunning ? "Focus in progress" : "Focus session" })
                    ]
                  })
                ]
              })
            ]
          }),

          /* ACTIVE TASK TARGET BAR */
          activeTask ? e.jsxs("div", {
            onClick: () => setTasksOpen(true),
            style: {
              marginTop: "14px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.07)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px"
            },
            children: [
              e.jsx("span", { children: "🎯" }),
              e.jsxs("span", { style: { fontWeight: "600", color: "#ffffff" }, children: ["Focusing on: ", activeTask.title] }),
              e.jsxs("span", { style: { opacity: 0.7 }, children: ["🍅 ", activeTask.act, "/", activeTask.est] })
            ]
          }) : null,

          /* GREETING / QUOTE */
          e.jsx("div", {
            style: { marginTop: "20px", cursor: "pointer", textAlign: "center", maxWidth: "480px" },
            onClick: () => setEditingQuote(!editingQuote),
            children: editingQuote ? e.jsx("input", {
              type: "text",
              value: quoteInput,
              onChange: (ev) => {
                setQuoteInput(ev.target.value);
                if (engine) engine.setQuote(ev.target.value);
              },
              onBlur: () => setEditingQuote(false),
              autoFocus: true,
              style: {
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: "8px",
                padding: "6px 12px",
                color: "#fff",
                fontSize: "18px",
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                textAlign: "center",
                outline: "none"
              }
            }) : e.jsx("p", {
              style: {
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "24px",
                color: "rgba(255, 255, 255, 0.9)",
                margin: 0,
                textShadow: "0 2px 10px rgba(0,0,0,0.5)"
              },
              children: pomo.quote
            })
          })
        ]
      }),

      /* SESSION DOCK (BOTTOM FLOATING CAPSULE) */
      e.jsxs("div", {
        style: {
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          zIndex: 10,
          background: "rgba(14, 10, 22, 0.7)",
          backdropFilter: "blur(14px)",
          padding: "6px 12px",
          borderRadius: "999px",
          border: "1px solid rgba(255, 255, 255, 0.12)"
        },
        children: [
          e.jsx("button", {
            type: "button",
            onClick: () => engine && engine.reset(),
            title: "Reset Timer",
            style: {
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              padding: "8px 14px",
              borderRadius: "999px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            },
            children: "↺"
          }),

          e.jsx("button", {
            type: "button",
            onClick: () => engine && engine.toggle(),
            style: {
              background: accent,
              color: "#0d1e2b",
              fontWeight: "700",
              fontSize: "15px",
              padding: "10px 34px",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 20px " + accent + "80",
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.02em",
              transition: "all 0.15s ease"
            },
            children: pomo.isRunning ? "Pause" : "Start"
          }),

          e.jsxs("button", {
            type: "button",
            onClick: () => setTasksOpen(true),
            style: {
              background: "none",
              border: "none",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: "600",
              padding: "8px 16px",
              borderRadius: "999px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            },
            children: [
              e.jsx("span", { children: "📋" }),
              e.jsxs("span", { children: ["Tasks (", (pomo.tasks || []).filter(x => !x.completed).length, ")"] })
            ]
          })
        ]
      }),

      /* TASKS DRAWER */
      tasksOpen ? e.jsxs("div", {
        style: {
          position: "absolute",
          inset: 0,
          zIndex: 40,
          backgroundColor: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(8px)",
          display: "flex",
          justifyContent: "flex-end"
        },
        children: [
          e.jsx("div", { style: { flex: 1 }, onClick: () => setTasksOpen(false) }),
          e.jsxs("div", {
            style: {
              width: "400px",
              height: "100%",
              backgroundColor: "#110d1e",
              borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box"
            },
            children: [
              e.jsxs("div", {
                style: { display: "flex", flexDirection: "column", gap: "14px", overflowY: "auto", flex: 1 },
                children: [
                  e.jsxs("div", {
                    style: { display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)" },
                    children: [
                      e.jsxs("div", {
                        style: { display: "flex", alignItems: "center", gap: "8px" },
                        children: [
                          e.jsx("span", { style: { fontSize: "18px" }, children: "📋" }),
                          e.jsx("h3", { style: { margin: 0, fontSize: "17px", fontWeight: "700", color: "#fff" }, children: "Tasks" })
                        ]
                      }),
                      e.jsx("button", {
                        type: "button",
                        onClick: () => setTasksOpen(false),
                        style: { padding: "4px 8px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", cursor: "pointer" },
                        children: "✕"
                      })
                    ]
                  }),

                  /* FILTER TABS */
                  e.jsxs("div", {
                    style: { display: "flex", gap: "6px" },
                    children: ["all", "active", "completed"].map((f) => e.jsx("button", {
                      key: f,
                      type: "button",
                      onClick: () => setTaskFilter(f),
                      style: {
                        padding: "6px 14px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: "600",
                        textTransform: "capitalize",
                        border: "none",
                        cursor: "pointer",
                        backgroundColor: taskFilter === f ? accent : "rgba(255, 255, 255, 0.08)",
                        color: taskFilter === f ? "#0d1e2b" : "#cbd5e1"
                      },
                      children: f
                    }))
                  }),

                  /* ADD TASK FORM */
                  e.jsxs("form", {
                    onSubmit: handleAddTask,
                    style: { display: "flex", flexDirection: "column", gap: "10px", padding: "14px", borderRadius: "14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" },
                    children: [
                      e.jsx("input", {
                        type: "text",
                        placeholder: "What are you working on?",
                        value: newTaskTitle,
                        onChange: (ev) => setNewTaskTitle(ev.target.value),
                        style: { width: "100%", padding: "10px 12px", borderRadius: "10px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }
                      }),
                      e.jsxs("div", {
                        style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" },
                        children: [
                          e.jsxs("div", {
                            style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.7)" },
                            children: [
                              e.jsx("span", { children: "🍅 Est:" }),
                              e.jsx("input", {
                                type: "number", min: "1", max: "10",
                                value: newTaskEst,
                                onChange: (ev) => setNewTaskEst(ev.target.value),
                                style: { width: "44px", padding: "4px", borderRadius: "6px", background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", textAlign: "center" }
                              })
                            ]
                          }),
                          e.jsxs("div", {
                            style: { display: "flex", alignItems: "center", gap: "6px" },
                            children: [
                              e.jsxs("select", {
                                value: newTaskPrio,
                                onChange: (ev) => setNewTaskPrio(ev.target.value),
                                style: { padding: "5px 8px", borderRadius: "8px", background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", fontSize: "12px", outline: "none" },
                                children: [
                                  e.jsx("option", { value: "low", style: { color: "#000" }, children: "Low" }),
                                  e.jsx("option", { value: "medium", style: { color: "#000" }, children: "Medium" }),
                                  e.jsx("option", { value: "high", style: { color: "#000" }, children: "High" })
                                ]
                              }),
                              e.jsx("button", {
                                type: "submit",
                                style: { padding: "6px 16px", borderRadius: "8px", background: accent, border: "none", color: "#0d1e2b", fontSize: "12px", fontWeight: "700", cursor: "pointer" },
                                children: "Add"
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),

                  /* TASKS LIST */
                  e.jsx("div", {
                    style: { display: "flex", flexDirection: "column", gap: "8px" },
                    children: filteredTasks.map((tk) => e.jsxs("div", {
                      key: tk.id,
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "12px 14px",
                        borderRadius: "12px",
                        backgroundColor: pomo.activeTaskId === tk.id ? "rgba(167, 139, 250, 0.15)" : "rgba(255, 255, 255, 0.05)",
                        border: pomo.activeTaskId === tk.id ? "1px solid " + accent : "1px solid rgba(255, 255, 255, 0.08)",
                        gap: "10px"
                      },
                      children: [
                        e.jsxs("div", {
                          style: { display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 },
                          children: [
                            e.jsx("input", {
                              type: "checkbox",
                              checked: tk.completed,
                              onChange: () => {
                                tk.completed = !tk.completed;
                                if (engine) engine.renderToCanvas();
                                setPomo({ ...pomo });
                              },
                              style: { width: "16px", height: "16px", cursor: "pointer" }
                            }),
                            e.jsxs("div", {
                              style: { display: "flex", flexDirection: "column", minWidth: 0, cursor: "pointer" },
                              onClick: () => {
                                pomo.activeTaskId = tk.id;
                                if (engine) engine.renderToCanvas();
                                setPomo({ ...pomo });
                              },
                              children: [
                                e.jsx("span", {
                                  style: {
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    color: "#fff",
                                    textDecoration: tk.completed ? "line-through" : "none",
                                    opacity: tk.completed ? 0.5 : 1,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                  },
                                  children: tk.title
                                }),
                                e.jsxs("span", {
                                  style: { fontSize: "11px", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" },
                                  children: [
                                    e.jsxs("span", { children: ["🍅 ", tk.act, "/", tk.est] }),
                                    e.jsx("span", {
                                      style: {
                                        padding: "1px 5px",
                                        borderRadius: "4px",
                                        fontSize: "9px",
                                        textTransform: "uppercase",
                                        fontWeight: "700",
                                        backgroundColor: tk.prio === "high" ? "rgba(244, 63, 94, 0.2)" : tk.prio === "medium" ? "rgba(245, 158, 11, 0.2)" : "rgba(59, 130, 246, 0.2)",
                                        color: tk.prio === "high" ? "#fb7185" : tk.prio === "medium" ? "#fcd34d" : "#93c5fd"
                                      },
                                      children: tk.prio
                                    })
                                  ]
                                })
                              ]
                            })
                          ]
                        }),
                        e.jsx("button", {
                          type: "button",
                          onClick: () => {
                            pomo.tasks = pomo.tasks.filter(x => x.id !== tk.id);
                            if (engine) engine.renderToCanvas();
                            setPomo({ ...pomo });
                          },
                          style: { padding: "4px", background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "13px" },
                          children: "🗑"
                        })
                      ]
                    }))
                  })
                ]
              }),
              e.jsx("button", {
                type: "button",
                onClick: () => setTasksOpen(false),
                style: { width: "100%", padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.08)", border: "none", color: "#fff", fontSize: "13px", fontWeight: "600", cursor: "pointer", marginTop: "12px" },
                children: "Close Tasks"
              })
            ]
          })
        ]
      }) : null,

      /* SETTINGS MODAL */
      settingsOpen ? e.jsxs("div", {
        style: { position: "absolute", inset: 0, zIndex: 40, backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" },
        children: [
          e.jsxs("div", {
            style: { width: "360px", backgroundColor: "#151025", border: "1px solid rgba(255, 255, 255, 0.12)", borderRadius: "20px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.8)" },
            children: [
              e.jsxs("div", {
                style: { display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.1)" },
                children: [
                  e.jsxs("div", {
                    style: { display: "flex", alignItems: "center", gap: "8px" },
                    children: [
                      e.jsx("span", { style: { fontSize: "18px" }, children: "⚙️" }),
                      e.jsx("h3", { style: { margin: 0, fontSize: "16px", fontWeight: "700", color: "#ffffff" }, children: "Timer Preferences" })
                    ]
                  }),
                  e.jsx("button", {
                    type: "button",
                    onClick: () => setSettingsOpen(false),
                    style: { padding: "4px 8px", borderRadius: "8px", backgroundColor: "rgba(255, 255, 255, 0.08)", border: "none", color: "#cbd5e1", cursor: "pointer" },
                    children: "✕"
                  })
                ]
              }),
              e.jsxs("div", {
                style: { display: "flex", flexDirection: "column", gap: "10px", fontSize: "12px" },
                children: [
                  e.jsxs("div", {
                    style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "10px", backgroundColor: "rgba(255, 255, 255, 0.05)" },
                    children: [
                      e.jsx("span", { style: { color: "#cbd5e1" }, children: "Focus Time (minutes)" }),
                      e.jsx("input", {
                        type: "number", min: "1", max: "90",
                        value: pomo.focusMin,
                        onChange: (ev) => {
                          const v = Number(ev.target.value) || 25;
                          pomo.focusMin = v;
                          if (pomo.mode === "focus" && !pomo.isRunning) {
                            pomo.timeLeft = v * 60;
                            pomo.totalTime = v * 60;
                            if (engine) engine.renderToCanvas();
                          }
                          setPomo({ ...pomo });
                        },
                        style: { width: "48px", padding: "4px", borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.1)", border: "none", color: "#ffffff", textAlign: "center", fontWeight: "700" }
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "10px", backgroundColor: "rgba(255, 255, 255, 0.05)" },
                    children: [
                      e.jsx("span", { style: { color: "#cbd5e1" }, children: "Short Break (minutes)" }),
                      e.jsx("input", {
                        type: "number", min: "1", max: "30",
                        value: pomo.shortMin,
                        onChange: (ev) => {
                          const v = Number(ev.target.value) || 5;
                          pomo.shortMin = v;
                          if (pomo.mode === "short" && !pomo.isRunning) {
                            pomo.timeLeft = v * 60;
                            pomo.totalTime = v * 60;
                            if (engine) engine.renderToCanvas();
                          }
                          setPomo({ ...pomo });
                        },
                        style: { width: "48px", padding: "4px", borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.1)", border: "none", color: "#ffffff", textAlign: "center", fontWeight: "700" }
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "10px", backgroundColor: "rgba(255, 255, 255, 0.05)" },
                    children: [
                      e.jsx("span", { style: { color: "#cbd5e1" }, children: "Long Break (minutes)" }),
                      e.jsx("input", {
                        type: "number", min: "1", max: "60",
                        value: pomo.longMin,
                        onChange: (ev) => {
                          const v = Number(ev.target.value) || 15;
                          pomo.longMin = v;
                          if (pomo.mode === "long" && !pomo.isRunning) {
                            pomo.timeLeft = v * 60;
                            pomo.totalTime = v * 60;
                            if (engine) engine.renderToCanvas();
                          }
                          setPomo({ ...pomo });
                        },
                        style: { width: "48px", padding: "4px", borderRadius: "6px", backgroundColor: "rgba(255, 255, 255, 0.1)", border: "none", color: "#ffffff", textAlign: "center", fontWeight: "700" }
                      })
                    ]
                  })
                ]
              }),
              e.jsx("button", {
                type: "button",
                onClick: () => setSettingsOpen(false),
                style: { width: "100%", padding: "10px", borderRadius: "10px", background: accent, border: "none", color: "#0d1e2b", fontSize: "13px", fontWeight: "700", cursor: "pointer" },
                children: "Save Preferences"
              })
            ]
          })
        ]
      }) : null
    ]
  });
}
const Nt={url:"https://stockist.jdmmiamimotors.com",poster:"/desk/phone.webp"},Xe={laptop:{w:1280,h:800},tablet:{w:1180,h:783},phone:{w:390,h:839}},Qa=t=>new Promise(s=>{I.print(t);const a=I.subscribe(()=>{I.get().printing||(a(),s())})});function qe({id:t,sheet:s,onDesk:a=!1,hold:n=!1}){return t==="laptop"?e.jsx(Ta,{sheet:s}):t==="tablet"?e.jsx(Xa,{sheet:s,onPrint:a?Qa:void 0}):e.jsx(Wt,{url:Nt.url,title:"Miami Motors stock catalog",poster:Nt.poster,width:390,hold:n})}function mn({sheet:t,onDesk:s}){const a=H(d=>d.focus),n=H(d=>d.arrived),i=H(d=>d.rect),l=H(d=>d.printing),o=At("(max-width: 767px)");if(!a)return null;if(t)return e.jsx(Za,{id:a,onDesk:s});const r=n&&!!i&&!l,h=Xe[a],c=i??{left:-1e4,top:0,width:h.w,height:h.h,radius:0};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"absolute z-20 overflow-hidden transition-opacity duration-300 ease-out",style:{left:c.left,top:c.top,width:c.width,height:c.height,borderRadius:c.radius,opacity:r?1:0,pointerEvents:r?"auto":"none",backgroundColor:a==="tablet"?"#0c0817":"#ffffff"},children:e.jsx(Dt,{width:h.w,height:h.h,scale:c.width/h.w,children:e.jsx(qe,{id:a,sheet:!1,onDesk:!0,hold:o&&!r})})}),e.jsx(Y,{children:a==="phone"&&r&&i&&e.jsx(Ka,{rect:i},"notes")})]})}function Za({id:t,onDesk:s}){var u;const a=os[t],n=At("(max-width: 899px)"),i=ce(),l=H(b=>b.arrived),o=H(b=>b.rect),r=H(b=>b.printing),[h,c]=x.useState(!1),[d,f]=x.useState(!s),p=x.useRef("inset(50% 50% 50% 50% round 24px)");if(o){const b=(u=document.getElementById("desk"))==null?void 0:u.getBoundingClientRect(),C=((b==null?void 0:b.top)??0)+o.top,N=((b==null?void 0:b.left)??0)+o.left,T=window.innerWidth-N-o.width,E=window.innerHeight-C-o.height;p.current=`inset(${C}px ${T}px ${E}px ${N}px round ${o.radius}px)`}const j=!s||l&&!!o&&!r&&!h,y=()=>{if(!s||i)return I.close();f(!1),c(!0)};return e.jsxs(w.div,{className:"fixed inset-0 z-50 flex flex-col bg-white",initial:s?{clipPath:p.current,opacity:0}:{y:"100%"},animate:s?j?{clipPath:"inset(0px 0px 0px 0px round 0px)",opacity:1}:{clipPath:p.current,opacity:0}:{y:0},transition:{duration:i?0:.55,ease:$,delay:s?0:.2},onAnimationComplete:()=>h?I.close():j&&f(!0),style:{pointerEvents:j?"auto":"none"},role:"dialog","aria-label":a.runs,"aria-hidden":!j,children:[e.jsxs("div",{className:"flex h-14 shrink-0 items-center justify-between border-b border-line px-3",children:[e.jsxs("button",{type:"button",onClick:y,className:"btn h-10 px-3 text-fg",children:[e.jsx(ls,{className:"h-4 w-4","aria-hidden":"true"})," Desk"]}),e.jsx("p",{className:"text-[15px] font-semibold",children:a.runs}),t==="phone"?e.jsx(Xt,{}):e.jsx("span",{className:"w-[72px]","aria-hidden":"true"})]}),e.jsx("div",{className:"@container relative min-h-0 flex-1",children:n||t==="phone"?e.jsx(qe,{id:t,sheet:n,onDesk:s,hold:!d}):e.jsx(zs,{width:Xe[t].w,height:Xe[t].h,children:e.jsx(qe,{id:t,sheet:!1,onDesk:s,hold:!d})})})]})}const Ja=["Do you have a 1KD-FTV engine?","Send me photos of a Hilux half cut","Which gearboxes fit a Land Cruiser?"];function Gt(){return e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"eyebrow",children:"Miami Motors · live stock catalog"}),e.jsx("h2",{className:"mt-2 text-[26px] font-semibold leading-tight tracking-tight",children:"Ask the yard about an engine."}),e.jsx("p",{className:"mt-3 text-[15px] leading-relaxed text-muted",children:"This is the real sales assistant buyers use. Tap the chat button on the phone and ask the way a buyer would."}),e.jsx("ul",{className:"mt-4 space-y-2",children:Ja.map(t=>e.jsx(en,{text:t},t))}),e.jsxs("div",{className:"mt-6 border-t border-line pt-5",children:[e.jsx("p",{className:"text-[15px] font-semibold",children:"I can build this for your business"}),e.jsxs("ul",{className:"mt-2 space-y-1.5 text-[14px] leading-snug text-muted",children:[e.jsx("li",{children:"On WhatsApp, Instagram and Facebook Messenger"}),e.jsx("li",{children:"Answers from your own stock and prices, day and night"}),e.jsx("li",{children:"A full sales agent that qualifies buyers and hands warm leads to your team"})]})]}),e.jsxs("button",{type:"button",onClick:()=>I.open("laptop",`${De}miami-motors`),className:"mt-6 inline-flex items-center gap-1 text-[15px] font-medium text-accent hover:underline",children:["Read the case study ",e.jsx(ye,{className:"h-4 w-4","aria-hidden":"true"})]})]})}function Ka({rect:t}){const a=t.left-340-64;return a<16?e.jsx("div",{className:"absolute inset-x-0 bottom-5 z-20 flex justify-center",children:e.jsx(Xt,{})}):e.jsx(w.aside,{className:"absolute z-20",style:{left:a,top:t.top+t.height/2,width:340},initial:{opacity:0,x:-12,y:"-50%"},animate:{opacity:1,x:0,y:"-50%"},exit:{opacity:0,transition:{duration:.15}},transition:{duration:.45,ease:$,delay:.15},children:e.jsx("div",{className:"rounded-3xl bg-white/90 p-7 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_24px_60px_-24px_rgba(0,0,0,0.3)] ring-1 ring-black/5 backdrop-blur-xl",children:e.jsx(Gt,{})})})}function Xt(){const[t,s]=x.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs("button",{type:"button",onClick:()=>s(!0),className:"btn btn-dark h-10 px-4 text-[14px]",children:[e.jsx($t,{className:"h-4 w-4","aria-hidden":"true"})," What to ask"]}),e.jsx(Y,{children:t&&e.jsx(w.div,{className:"fixed inset-0 z-[60] flex items-end justify-center bg-black/30",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:()=>s(!1),children:e.jsxs(w.div,{role:"dialog","aria-label":"What to ask",className:"max-h-[85svh] w-full max-w-lg overflow-y-auto rounded-t-[28px] bg-white px-6 pb-10 pt-3",initial:{y:"100%"},animate:{y:0},exit:{y:"100%"},transition:{duration:.35,ease:$},onClick:a=>a.stopPropagation(),children:[e.jsx("div",{className:"mx-auto mb-3 h-1 w-10 rounded-full bg-black/15","aria-hidden":"true"}),e.jsx("div",{className:"mb-2 flex justify-end",children:e.jsx("button",{type:"button",autoFocus:!0,onClick:()=>s(!1),className:"grid h-10 w-10 place-items-center rounded-full bg-surface","aria-label":"Close",children:e.jsx(Qe,{className:"h-4 w-4","aria-hidden":"true"})})}),e.jsx(Gt,{})]})})})]})}function en({text:t}){const[s,a]=x.useState(!1);return e.jsx("li",{children:e.jsxs("button",{type:"button",onClick:()=>{var n;(n=navigator.clipboard)==null||n.writeText(t).catch(()=>{}),a(!0),window.setTimeout(()=>a(!1),1500)},className:"flex w-full items-center justify-between gap-3 rounded-xl bg-surface px-3.5 py-2.5 text-left text-[14px] transition-colors hover:bg-[#EBEBEF]",children:[e.jsx("span",{children:t}),s?e.jsx(ae,{className:"h-4 w-4 shrink-0 text-emerald-600","aria-label":"Copied"}):e.jsx(Je,{className:"h-4 w-4 shrink-0 text-muted","aria-label":"Copy"})]})})}export{mn as ScreenOverlay};
