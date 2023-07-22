var L=Object.defineProperty;var $=(r,o,e)=>o in r?L(r,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[o]=e;var h=(r,o,e)=>($(r,typeof o!="symbol"?o+"":o,e),e);import{r as S,R as b,j as t,S as m}from"./index-d9b9b00e.js";class N extends S.Component{constructor(e){super(e);h(this,"uplForm");h(this,"dropEl");h(this,"filEl");h(this,"getFile",e=>{const{upload:s}=this.props;if(s){const n=e.target,i=[];if("files"in n&&n.files.length>0)for(let l=0;l<n.files.length;l+=1)i.push(this.readFileContent(n.files[l]));Promise.all(i).then(l=>s(l))}});h(this,"dragLeave",()=>{this.dropEl.current&&this.dropEl.current.classList.remove("over")});h(this,"dropEnter",()=>{this.dropEl.current&&this.dropEl.current.classList.add("over")});h(this,"handleSubmit",e=>{e.preventDefault()});h(this,"btnClick",()=>{this.filEl&&this.filEl.current.click()});this.uplForm=b.createRef(),this.dropEl=b.createRef(),this.filEl=b.createRef()}readFileContent(e){const s=new FileReader,n=!1;return new Promise(i=>{s.onload=l=>{const c=l.target.result,a="",d={bstr:c,rABS:n,filename:e.name,form:this.uplForm,error:a};i(d)},s.readAsText(e,"utf8")})}renderInput({onChange:e,type:s,multiple:n}){const i="btn btn-primary";return t.jsx("div",{onDragEnter:this.dropEnter,ref:this.dropEl,onDragLeave:this.dragLeave,children:t.jsx("input",{placeholder:"Choose or Drop files",className:i,onChange:e,ref:this.filEl,type:"file",multiple:n,accept:s,tabIndex:-1,id:"files"})})}render(){const{label:e="",type:s,isSingle:n}=this.props;return t.jsx("div",{className:"btn-wrap",children:t.jsx("form",{onSubmit:this.handleSubmit,ref:this.uplForm,encType:"multipart/form-data",children:this.renderInput({onChange:this.getFile,type:s,multiple:!n})})})}}const I=/([0-9]+):([0-9]+):([0-9]+)[,.]([0-9]+)/g,A=/([0-9]+):([0-9]+):([0-9]+)[,.]([0-9]+)/,J=/\n[0-9]{1,6}\n/,U=/\n[0-9]{1,6}?\s\n/;function y(r){var n;const o=r.match(I);if(!o)return 0;const e=[];if(o.length){const i=new Date,l=(n=o[0].match(A))==null?void 0:n.map(Number);l&&i.setHours(Number(l[1]),l[2],l[3],l[4]),e.push(i)}const s=new Date;return s.setHours(0,0,0,0),e.push(s),e[0].getTime()-e[1].getTime()}let w=0;function B(r,o){const e=y(r);let s="";for(let n=w;n<o.length;n+=1){const i=y(o[n]),l=e-i;if(l<500||l<50){console.log(l,r,o[n]),w=n,s=o[n];break}}return s}function E(r){let o=r.bstr.split(`
`);return o=o.filter(e=>e.match("Dialogue: ")).map((e,s)=>{const n=e.split("Dialogue: ")[1].split(",");let[i,l,c,a,d,p,f,v,u,g]=n;return l.match(/^0:/)&&(l=`0${l}`),c.match(/^0:/)&&(c=`0${c}`),`
${s}
${l} --> ${c}
${g}
`}),o.join("")}function _(r){w=0;let[o,e]=r;o.filename.match(/\.ass$/)&&(o.bstr=E(o)),e.filename.match(/\.ass$/)&&(e.bstr=E(e));let s=J,n=o.bstr.split(s),i=e.bstr.split(s);n.length===1&&(s=U,n=o.bstr.split(s),i=e.bstr.split(s));const l=[];for(let a=0;a<n.length;a+=1)l.push(B(n[a],i));const c={bstr:l.join(`

`),filename:e.filename,fixed:!0};return{subs:[o,c],sepVariant:s}}function F(r){return r.replace(/<i>|<\/i>/gu,"")}const H=[{filename:"demoRU.srt",bstr:`184
00:11:37,691 --> 00:11:39,234
Какой размер файла?

185
00:11:40,276 --> 00:11:42,570
1,2 мегабайта? Не может быть.

186
00:11:43,571 --> 00:11:44,322
Ого, а качество не сниженное.

188
00:11:48,743 --> 00:11:50,276
Файл в половину меньше.

189
00:11:50,745 --> 00:11:52,539
И смотри, какая скорость.

190
00:11:54,666 --> 00:11:58,003
Охренеть. Как он
так быстро нашел?

191
00:11:59,045 --> 00:12:02,257
Он ищет по архивам?..

192
00:12:03,133 --> 00:12:04,342
Не может быть.
`},{filename:"demoEN.srt",bstr:`241
00:11:37,739 --> 00:11:39,782
What is this file size?

242
00:11:40,367 --> 00:11:42,451
1 .2 megabytes? No way.

243
00:11:43,620 --> 00:11:46,413
Wow, that doesn't sound at all downgraded.

244
00:11:48,708 --> 00:11:50,376
The file size is like, half.

245
00:11:50,752 --> 00:11:52,836
And look how fast this search is.

246
00:11:54,714 --> 00:11:57,925
Holy shit, how did it
find a match that fast?

247
00:11:59,010 --> 00:12:02,096
It's like it's searching compressed files?

248
00:12:03,139 --> 00:12:04,765
No way.
`}];function P(r){const o=document.getElementById("voice");if(!o)return;const e=speechSynthesis.getVoices(),s=document.createElement("option");s.value="",s.innerHTML="",o.appendChild(s),e.forEach(function(n,i){const l=document.createElement("option");l.value=n.name,l.innerHTML=n.name,n.name===r&&(l.selected=!0),o.appendChild(l)})}function O(r){const o=document.getElementById("msg");o&&("speechSynthesis"in window?o.innerHTML="Your browser <strong>supports</strong> speech synthesis.":(o.innerHTML='Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="https://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.',o.classList.add("not-supported"))),P(r),window.speechSynthesis.onvoiceschanged=function(e){P(r)}}const Y={voice:""},W=({voice:r,rate:o,error:e,pitch:s,volume:n,togglePopup:i,voiceSettingSave:l})=>{const[c,a]=S.useState(Y),d=f=>{const{name:v,value:u}=f.target;a({[v]:u})};S.useEffect(()=>{O(r)},[]);const p=f=>{if(!(!r&&!c.voice))return l(c),f.preventDefault(),!1};return t.jsx("div",{className:"lang-subs",children:t.jsx("div",{id:"filenames",className:"modal-window",children:t.jsx("div",{children:t.jsxs("form",{onSubmit:()=>!1,children:[t.jsx("a",{href:"",title:"Close",className:"modal-close",onClick:f=>i(f,!1),children:"Close"}),t.jsx("h1",{children:"Web Speech Synthesis Demo"}),t.jsx("div",{children:t.jsx("br",{})}),t.jsxs("div",{id:"page-wrapper",children:[t.jsx("p",{id:"msg"}),t.jsxs("div",{className:"option",children:[t.jsx("label",{htmlFor:"voice",children:"Voice"})," ",t.jsx("select",{required:!0,name:"voice",id:"voice",value:r||"",onChange:d})]}),t.jsxs("div",{className:"option",children:[t.jsx("label",{htmlFor:"volume",children:"Volume"}),t.jsx("input",{type:"range",min:"0",max:"1",step:"0.1",name:"volume",id:"volume",value:n,onChange:d})]}),t.jsxs("div",{className:"option",children:[t.jsx("label",{htmlFor:"rate",children:"Rate"}),t.jsx("input",{type:"range",min:"0.1",max:"10",step:"0.1",name:"rate",id:"rate",value:o,onChange:d})]}),t.jsxs("div",{className:"option",children:[t.jsx("label",{htmlFor:"pitch",children:"Pitch"}),t.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",name:"pitch",id:"pitch",value:s,onChange:d})]}),e?t.jsx("div",{color:"red",children:e}):null,t.jsx("div",{children:t.jsx("button",{className:"btn",onClick:p,children:"Save"})})]}),t.jsx("div",{children:t.jsx("a",{href:"",title:"Close",className:"modal-close bottom",onClick:f=>i(f,!1),children:"Close"})})]})})})})},x="langBS_history",j="subs",R=({filenames:r,upload:o})=>{const[e,s]=S.useState(r||m.getJ(x)),n=(i,l=!1)=>()=>{let c;if(l){const d=e[i];d&&(c=d.subs)}let a=[...e.filter((d,p)=>p!==i)];m.setJ(x,a),l&&c?o(c,!0):s(a)};return!e||!e.length?null:t.jsx("div",{id:"filenames",className:"modal-window1",children:t.jsxs("div",{children:[t.jsx("h1",{children:"History"}),t.jsx("div",{children:t.jsx("div",{children:e&&e.map((i,l)=>t.jsxs("div",{children:[t.jsx("br",{}),i.subs.map((c,a)=>t.jsx("div",{children:t.jsxs("div",{children:[a+1," File ",`${c.filename}`]})},`${c.filename}${a}1`)),t.jsx("br",{}),t.jsxs("div",{children:[t.jsx("button",{className:"btn",onClick:n(l,!0),children:"restore"}),t.jsx("button",{className:"btn",onClick:n(l),children:"Delete"})]})]},`subs${l}1`))})})]})})},G=({clear:r,filenames:o,togglePopup:e,upload:s})=>{const n=m.getJ(x);return t.jsx("div",{id:"filenames",className:"modal-window",children:t.jsxs("div",{children:[t.jsx("a",{href:"",title:"Close",className:"modal-close",onClick:i=>e(i,!1),children:"Close"}),t.jsx("h1",{children:"Files"}),t.jsx("div",{children:t.jsxs("div",{children:[o.map((i,l)=>t.jsxs("div",{children:[l+1," File ",i]},i)),t.jsx("div",{children:t.jsx("button",{className:"btn",onClick:r,children:"Delete"})})]})}),n.length?t.jsx(R,{filenames:n,upload:s}):null,t.jsx("div",{children:t.jsx("a",{href:"",title:"Close",className:"modal-close bottom",onClick:i=>e(i,!1),children:"Close"})})]})})},D="langscroll",T="srt, ass",k="POPUP_DISCUSS",V="POPUP_SETTINGS",C="langbysubs_settings",z={SAME:"Files same, please upload different filename",EMPTY:"One of uploaded file has empty content, please upload another file"};function M(r){const{voice:o,rate:e=1,volume:s=1,pitch:n=1}=m.getJ(C)||{},i=new SpeechSynthesisUtterance;i.text=r,i.volume=parseFloat(String(s)),i.rate=parseFloat(String(e)),i.pitch=parseFloat(String(n)),o&&(i.voice=speechSynthesis.getVoices().filter(function(l){return l.name===o})[0]),window.speechSynthesis.speak(i)}class q extends S.Component{constructor(e){super(e);h(this,"sepVariant");h(this,"buttonPressTimer");h(this,"getSubs",(e=!0)=>{let s=m.getJ(j);return!s&&e&&(s=this.getDef()),s.sepVariant&&(s.sepVariant=new RegExp(s.sepVariant.replace(/\//g,""))),s});h(this,"getDef",()=>({subs:[],sepVariant:""}));h(this,"getItems",e=>{if(!e||e.length===0)return{items:[],filenames:[]};const s=[e[0].filename];let n=[];if(e[0]){const i=e[0].fixed?`

`:this.sepVariant;n=[e[0].bstr.split(i)]}if(e[1]){s.push(e[1].filename);const i=e[1].fixed?`

`:this.sepVariant;n.push(e[1].bstr.split(i))}return{items:n,filenames:s}});h(this,"upload",(e,s=!1)=>{const{filenames:n}=this.state,i=n.length===2||e.length===2;if(n.length===1&&e[0].filename===n[0])return this.setState({error:"SAME"});let l=this.getDef();if(!i){const u=this.getSubs(!1);u&&(l=u)}const{setVariant:c}=l;let{subs:a=[]}=l,d="";c&&(this.sepVariant=c);for(let u=0;u<e.length;u+=1)e[u].bstr.trim()?a.push({bstr:e[u].bstr,filename:e[u].filename}):d="EMPTY";if(a.length){if(s&&(a=e),a.length===2&&!s){const{subs:u,sepVariant:g}=_(a);g&&(this.sepVariant=g),a=u,a[0].bstr=F(a[0].bstr),a[1].bstr=F(a[1].bstr)}m.setJ(j,{subs:a,sepVariant:`${this.sepVariant}`})}const{items:p,filenames:f}=this.getItems(a);let v=m.getJ(x)||[];if(v.length){const u=v.filter(g=>g.subs[0].filename!==a[0].filename||g.subs[0].filename!==a[1].filename);v.length!==u.length&&m.setJ(x,u)}this.setState({items:p,showStr:"",error:d,filenames:f})});h(this,"clear",()=>{const e=m.getJ(x)||[];e.push(m.getJ(j)),m.setJ(x,e),m.rm(j),this.setState({filenames:[],items:[],showPopupFiles:!1,showStr:"",error:""})});h(this,"replace",e=>{const{sepVariant:s,subs:n}=this.getSubs();let i=n;if(i.length<=1)return;i=[i[1],i[0]],m.setJ(j,{subs:i,sepVariant:`${s}`});const{items:l}=this.getItems(i);this.setState({items:l})});h(this,"show",e=>{const s=e.target.getAttribute("data-ind"),{items:n,isShown:i,ind:l}=this.state;let c=i;const[,a]=n;if(a[s]){c=s!==l||!c;let d="";c&&(d=a[s]),this.setState({showStr:d,ind:s,isShown:c})}});h(this,"handleButtonRelease",()=>{this.buttonPressTimer&&clearTimeout(this.buttonPressTimer)});h(this,"handleScroll",()=>{m.set(D,window.scrollY)});h(this,"getStr",e=>{const s=e.split(/>\s[0-9]+:[0-9]+:[0-9]+[.,][0-9]+/);return s[1]&&(e=s[1]),e});h(this,"renderRow",(e,s)=>{const{voice:n}=this.state;return e=this.getStr(e),e?t.jsx("div",{onTouchEnd:this.handleButtonRelease,onMouseDown:this.show,onMouseUp:this.handleButtonRelease,"data-ind":s,children:t.jsxs("div",{"data-ind":s,children:[e,t.jsx("span",{className:"tooltiptext",children:e?t.jsx("button",{onClick:n?()=>M(e):this.voiceSetting,className:"icon speech-voice"}):null})]})},`${e}${s}`):null});h(this,"demo",e=>{e.preventDefault(),this.upload(H)});h(this,"togglePopup",(e,s=!0)=>{e.preventDefault(),this.setState({showPopupFiles:s,modal:""})});h(this,"toggleDiscuss",e=>{e.preventDefault(),this.setState({modal:k})});h(this,"closeModal",()=>{this.setState({modal:""})});h(this,"voiceSetting",e=>{e.preventDefault(),this.setState({modal:V})});h(this,"voiceSettingSave",e=>{const{voice:s,rate:n,pitch:i,volume:l}=e;if(this.state.voice===s||!s&&this.state.voice)return this.closeModal();m.setJ(C,{voice:s,rate:n,pitch:i,volume:l}),this.setState({modal:"",voice:s,rate:n,pitch:i,volume:l})});const{subs:s,sepVariant:n}=this.getSubs();this.sepVariant=n,this.buttonPressTimer=void 0;const{items:i=[],filenames:l=[]}=this.getItems(s),{voice:c,rate:a=1,volume:d=1,pitch:p=1}=m.getJ(C)||{};this.state={showStr:"",ind:"",isShown:-1,error:"",filenames:l,items:i,showPopupFiles:!1,modal:"",voice:c,rate:a,volume:d,pitch:p}}componentDidMount(){const e=m.get(D,!1);e&&window.scrollTo(0,e),window.addEventListener("scroll",this.handleScroll)}componentWillUnmount(){window.removeEventListener("scroll",this.handleScroll)}render(){const{items:e,showStr:s,error:n,filenames:i,showPopupFiles:l,modal:c,voice:a}=this.state,d=`folder${e.length?"-fill":""}`;return t.jsxs("div",{className:"lang-subs",children:[l?t.jsx(t.Fragment,{children:t.jsx(G,{filenames:i,togglePopup:this.togglePopup,clear:this.clear,upload:this.upload})}):null,c===k?t.jsx("div",{id:"filenames",className:"modal-window",children:t.jsxs("div",{children:[t.jsx("a",{href:"",title:"Close",className:"modal-close",onClick:p=>this.togglePopup(p,!1),children:"Close"}),t.jsx("h1",{children:"Subs"}),t.jsxs("div",{children:["Upload your subs in channel:",t.jsx("a",{href:"tg://resolve?domain=langbysubs",children:" @langbysubs"})]}),t.jsx("div",{children:t.jsx("a",{href:"",title:"Close",className:"modal-close bottom",onClick:p=>this.togglePopup(p,!1),children:"Close"})})]})}):null,s?t.jsx("div",{className:"tooltip1",children:t.jsxs("span",{className:"tooltiptext",children:[this.getStr(s),t.jsx("button",{onClick:a?()=>M(this.getStr(s)):this.voiceSetting,className:"icon speech-voice"})]})}):null,t.jsx("div",{children:e.length===2?t.jsxs("div",{className:"buttons",children:[t.jsx("button",{className:`icon ${d}-icon`,onClick:this.togglePopup}),t.jsx("button",{className:"icon earth-search",onClick:this.toggleDiscuss}),t.jsx("button",{className:"icon speech-voice-setting",onClick:this.voiceSetting}),t.jsx("button",{className:"icon replace-icon",onClick:this.replace})]}):null}),t.jsxs("div",{className:"lang-items",children:[e.length?null:t.jsxs("div",{children:[t.jsx("div",{children:"Please upload two (.srt, .ass) files with different languages"}),t.jsx("p",{}),t.jsxs("div",{className:"flexible",children:[t.jsx(N,{type:T,upload:this.upload,label:"Add files"}),t.jsx("div",{className:"btn btn-ghost-success",children:"or"}),t.jsx("button",{className:"btn",onClick:this.demo,children:"TRY DEMO"})]}),t.jsx(R,{upload:this.upload})]}),e.length===1?t.jsxs("div",{className:"load-step",children:[n?t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"alert alert-danger",children:z[n]}),t.jsx("br",{})]}):null,t.jsxs("div",{children:["1 File ",i[0],t.jsx("span",{className:"green",children:" loaded"})]}),t.jsxs("div",{children:["2 File ",t.jsx("span",{className:"gray",children:"not loaded"})]}),t.jsx(N,{upload:this.upload,type:T,label:"Add second subtitles file",isSingle:!0}),t.jsx("br",{}),t.jsx("div",{children:t.jsx("button",{className:"btn",onClick:this.clear,children:"Delete all"})})]}):null,e.length===2?e[0].map((p,f)=>this.renderRow(p,f)):null]}),c===V?t.jsx(W,{closeModal:this.closeModal,voice:this.state.voice,rate:this.state.rate,pitch:this.state.pitch,volume:this.state.volume,error:this.state.error,togglePopup:this.togglePopup,voiceSettingSave:this.voiceSettingSave}):null]})}}const K=q,Z=()=>t.jsx(K,{});export{Z as default};
