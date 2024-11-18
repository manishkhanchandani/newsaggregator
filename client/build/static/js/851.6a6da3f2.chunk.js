"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[851],{9851:(e,l,n)=>{n.r(l),n.d(l,{default:()=>q,fetchNews:()=>U,getTotalPages:()=>R});var t=n(5043);const i=n(6213).A.create({baseURL:"http://parseserver.us:4001",timeout:6e4,headers:{"Content-Type":"application/json"}});var s=n(4194),o=n(9135),a=n(4535),r=n(7353),d=n(1596),c=n(7067),u=n(5795),h=n(1906),p=n(9190),x=n(8988),v=n(6980),g=n(3561),m=n(579);const j=e=>{let{value:l,handleChange:n,options:t,name:i,label:s}=e;return(0,m.jsx)(r.A,{sx:{minWidth:120},children:(0,m.jsxs)(v.A,{fullWidth:!0,children:[(0,m.jsx)(p.A,{id:`label_${i}`,children:s}),(0,m.jsxs)(g.A,{labelId:`label_${i}`,name:i,value:l,label:s,onChange:n,children:[(0,m.jsx)(x.A,{value:"",children:"Select"}),null===t||void 0===t?void 0:t.map((e=>(0,m.jsx)(x.A,{value:e.key,children:e.label},e.key)))]})]})})},y=(0,a.Ay)(d.A)((e=>{let{theme:l}=e;return{backgroundColor:"#fff",...l.typography.body2,padding:l.spacing(1),textAlign:"center",color:l.palette.text.secondary,...l.applyStyles("dark",{backgroundColor:"#1A2027"})}})),f=e=>{let{setVars:l}=e;const[n,i]=t.useState({province:"",topic:"",q:""}),s=e=>{i((l=>({...l,[e.target.name]:e.target.value})))},o=e=>{e.preventDefault(),l(n)};return(0,m.jsx)(r.A,{sx:{flexGrow:1},children:(0,m.jsx)("form",{onSubmit:o,children:(0,m.jsxs)(c.A,{container:!0,spacing:2,children:[(0,m.jsx)(c.A,{size:{xs:6,md:3},children:(0,m.jsx)(y,{children:(0,m.jsx)(j,{name:"province",label:"State",options:[{key:"california",label:"California"},{key:"indiana",label:"Indiana"}],value:n.province,handleChange:s})})}),(0,m.jsx)(c.A,{size:{xs:6,md:3},children:(0,m.jsx)(y,{children:(0,m.jsx)(j,{name:"topic",label:"Topic",options:[{key:"business",label:"Business"},{key:"entertainment",label:"Entertainment"},{key:"general",label:"General"},{key:"health",label:"Health"},{key:"sports",label:"Sports"},{key:"technology",label:"Technology"}],value:n.topic,handleChange:s})})}),(0,m.jsx)(c.A,{size:{xs:6,md:3},children:(0,m.jsx)(y,{children:(0,m.jsx)(u.A,{name:"q",label:"Keyword",variant:"outlined",type:"search",placeholder:"keyword to search",value:n.q,onChange:s,fullWidth:!0})})}),(0,m.jsx)(c.A,{size:{xs:6,md:3},children:(0,m.jsx)(y,{children:(0,m.jsx)(h.A,{variant:"contained",fullWidth:!0,type:"submit",onClick:o,sx:{height:55},children:"Search"})})})]})})})};var b=n(7122),w=n(1637);function A(){return(0,m.jsx)(r.A,{sx:{display:"flex",marginTop:5,marginBottom:5,justifyContent:"center"},children:(0,m.jsx)(w.A,{})})}var C=n(3774),k=n(7020);(0,C.eU)({});const S=(0,k.tG)("newsObjectLS",{});var I=n(6178),T=n.n(I);const $=e=>{var l;let{record:n}=e;return(0,m.jsx)("li",{style:{marginBottom:"30px"},children:(0,m.jsxs)("div",{style:{display:"flex",gap:"16px"},children:[(0,m.jsx)("div",{style:{maxWidth:"150px",position:"relative"},children:(0,m.jsx)("img",{src:null!==(l=n.urlToImage)&&void 0!==l?l:"https://www.pngitem.com/pimgs/m/439-4390399_placeholder-image-newsletter-clipart-hd-png-download.png",alt:"",style:{width:"100%"}})}),(0,m.jsxs)("div",{style:{flex:1,display:"flex",flexDirection:"column"},children:[(0,m.jsx)("div",{style:{fontWeight:"bold",fontSize:"14px",marginBottom:"10px"},children:n.title}),(0,m.jsx)("div",{style:{fontSize:"12px",marginBottom:"10px"},children:n.description}),(0,m.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"baseline",fontSize:"11px"},children:T()(n.publishedAt).fromNow()})]})]})})},R=(e,l)=>Math.floor(e/l),U=async e=>{let{q:l,province:n,topic:t,page:s}=e;const o=`/news?province=${encodeURIComponent(n)}&topic=${encodeURIComponent(t)}&search=${encodeURIComponent(l)}&page=${s}`;return(await i.get(o)).data},q=()=>{var e,l,n,i,a,r,d,c;const[u,h]=(0,b.fp)(S),[p,x]=t.useState(),[v,g]=t.useState({q:"",province:"",topic:""}),[j,y]=t.useState(!1),[w,C]=t.useState(0),[k,I]=t.useState(!1),[T,R]=t.useState(null),q=t.useMemo((()=>{var e,l;return null!==p&&void 0!==p&&null!==(e=p.results)&&void 0!==e&&e.totalPages?null===p||void 0===p||null===(l=p.results)||void 0===l?void 0:l.totalPages:0}),[null===p||void 0===p||null===(e=p.results)||void 0===e?void 0:e.totalPages]),z=t.useMemo((()=>{let e=`${w}_100`;return v.province&&(e+=`_${encodeURIComponent(v.province)}`),v.topic&&(e+=`_${encodeURIComponent(v.topic)}`),v.q&&(e+=`_${encodeURIComponent(v.q)}`),e}),[w,v]),_=(0,t.useCallback)(((e,l)=>{h((n=>({...n,[e]:l})))}),[h]),W=t.useCallback((async e=>{try{if(!j)return;if(I(!0),R(null),u[z]&&!e){var l;const e=(new Date).getTime(),n=null===(l=u[z])||void 0===l?void 0:l.expiryRef;if(n){const l=e-n;if(Math.round(l/1e3)<=7200)return console.log("data from cache: ",z,", ",u[z]),void x(u[z])}}console.log("fresh data: ",z);const n=await U({page:w,...v});_(z,{...n,expiryRef:(new Date).getTime(),stateKey:z}),x(n)}catch(n){n instanceof Error?R(n.message):"string"===typeof n&&R(n)}finally{I(!1)}}),[w,v,z,_,u,j]);return t.useEffect((()=>{W()}),[W]),t.useEffect((()=>{y(!0)}),[]),(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{id:"filter-box",children:(0,m.jsx)(f,{setVars:g})}),(0,m.jsxs)("div",{id:"content",children:[T&&(0,m.jsx)("div",{children:(0,m.jsx)(s.A,{severity:"error",children:T})}),k&&(0,m.jsx)(A,{}),(null===p||void 0===p||null===(l=p.results)||void 0===l?void 0:l.rows)&&(null===p||void 0===p||null===(n=p.results)||void 0===n||null===(i=n.rows)||void 0===i?void 0:i.length)>0&&(0,m.jsxs)(m.Fragment,{children:[" ",(0,m.jsx)("ul",{children:null===p||void 0===p||null===(a=p.results)||void 0===a||null===(r=a.rows)||void 0===r?void 0:r.map((e=>(0,m.jsx)($,{record:e},e.objectId)))}),(0,m.jsx)("div",{children:(0,m.jsx)(o.A,{count:q,page:w+1,onChange:(e,l)=>{C(l-1),window.scrollTo(0,0)}})})]}),(!(null!==p&&void 0!==p&&null!==(d=p.results)&&void 0!==d&&d.rows)||0===(null===p||void 0===p||null===(c=p.results)||void 0===c?void 0:c.rows.length))&&!k&&!T&&(0,m.jsx)("div",{style:{marginTop:20},children:(0,m.jsx)(s.A,{severity:"warning",children:"No News Found."})})]})]})}}}]);
//# sourceMappingURL=851.6a6da3f2.chunk.js.map