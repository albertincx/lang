var k=Object.defineProperty;var T=(c,r,e)=>r in c?k(c,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[r]=e;var o=(c,r,e)=>(T(c,typeof r!="symbol"?r+"":r,e),e);import{r as x,R as f,j as t,S as u}from"./index-b55c25b3.js";class b extends x.Component{constructor(e){super(e);o(this,"uplForm");o(this,"dropEl");o(this,"filEl");o(this,"getFile",e=>{const{upload:s}=this.props;if(s){const n=e.target,i=[];if("files"in n&&n.files.length>0)for(let l=0;l<n.files.length;l+=1)i.push(this.readFileContent(n.files[l]));Promise.all(i).then(l=>s(l,n.files))}});o(this,"dragLeave",()=>{this.dropEl.current&&this.dropEl.current.classList.remove("over")});o(this,"dropEnter",()=>{this.dropEl.current&&this.dropEl.current.classList.add("over")});o(this,"handleSubmit",e=>{e.preventDefault()});o(this,"btnClick",()=>{this.filEl&&this.filEl.current.click()});this.uplForm=f.createRef(),this.dropEl=f.createRef(),this.filEl=f.createRef()}readFileContent(e){const s=new FileReader,n=!1;return new Promise(i=>{s.onload=l=>{const a=l.target.result,d="",m={bstr:a,rABS:n,filename:e.name,form:this.uplForm,error:d};i(m)},s.readAsText(e,"utf8")})}renderInput({onChange:e,type:s,multiple:n}){return t.jsx("div",{onDragEnter:this.dropEnter,ref:this.dropEl,onDragLeave:this.dragLeave,children:t.jsx("input",{onChange:e,ref:this.filEl,type:"file",style:{display:"none"},multiple:n,accept:s,tabIndex:-1})})}render(){const{label:e="",type:s,isSingle:n}=this.props,i="btn btn-primary";return t.jsxs("div",{className:"btn-wrap",children:[t.jsx("form",{onSubmit:this.handleSubmit,ref:this.uplForm,encType:"multipart/form-data",children:this.renderInput({onChange:this.getFile,type:s,multiple:!n})}),t.jsx("button",{title:"Загрузить файлы",type:"button",className:i,onClick:this.btnClick,children:t.jsx("div",{children:e})})]})}}const D=/([0-9]+):([0-9]+):([0-9]+),([0-9]+)/g,V=/([0-9]+):([0-9]+):([0-9]+),([0-9]+)/,R=/\n[0-9]{1,6}\n/,M=/\n[0-9]{1,6}?\s\n/;function j(c){var n;const r=c.match(D);if(!r)return 0;const e=[];if(r.length){const i=new Date,l=(n=r[0].match(V))==null?void 0:n.map(Number);l&&i.setHours(Number(l[1]),l[2],l[3],l[4]),e.push(i)}const s=new Date;return s.setHours(0,0,0,0),e.push(s),e[0].getTime()-e[1].getTime()}let g=0;function I(c,r){const e=j(c);let s="";for(let n=g;n<r.length;n+=1){const i=j(r[n]);if(e-i<500){g=n,s=r[n];break}}return s}function L(c){g=0;const[r,e]=c;let s=R,n=r.bstr.split(s),i=e.bstr.split(s);n.length===1&&(s=M,n=r.bstr.split(s),i=e.bstr.split(s));const l=[];for(let d=0;d<n.length;d+=1)l.push(I(n[d],i));const a={bstr:l.join(`

`),filename:e.filename,fixed:!0};return{subs:[r,a],sepVariant:s}}function w(c){return c.replace(/<i>|<\/i>/gu,"")}const A=[{filename:"demoRU.srt",bstr:`184
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
`}];function C(){const c=document.getElementById("voice");if(!c)return;speechSynthesis.getVoices().forEach(function(e,s){const n=document.createElement("option");n.value=e.name,n.innerHTML=e.name,c.appendChild(n)})}function U(){const c=document.getElementById("msg");c&&("speechSynthesis"in window?c.innerHTML="Your browser <strong>supports</strong> speech synthesis.":(c.innerHTML='Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="https://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.',c.classList.add("not-supported"))),C(),window.speechSynthesis.onvoiceschanged=function(r){C()}}class B extends x.Component{constructor(){super(...arguments);o(this,"state",{error:""});o(this,"voiceSettings",e=>{const{name:s,value:n}=e.target;this.setState({[s]:n})});o(this,"voiceSettingSave",()=>{this.props.voiceSettingSave(this.state)})}componentDidMount(){U()}render(){const{voice:e,rate:s,pitch:n,volume:i,togglePopup:l}=this.props;return t.jsx("div",{className:"lang-subs",children:t.jsx("div",{id:"filenames",className:"modal-window",children:t.jsxs("div",{children:[t.jsx("a",{href:"",title:"Close",className:"modal-close",onClick:a=>l(a,!1),children:"Close"}),t.jsx("h1",{children:"Web Speech Synthesis Demo"}),t.jsx("div",{children:t.jsx("br",{})}),t.jsxs("div",{id:"page-wrapper",children:[t.jsx("p",{id:"msg"}),t.jsxs("div",{className:"option",children:[t.jsx("label",{htmlFor:"voice",children:"Voice"})," ",t.jsx("select",{name:"voice",id:"voice",value:e,onChange:this.voiceSettings})]}),t.jsxs("div",{className:"option",children:[t.jsx("label",{htmlFor:"volume",children:"Volume"}),t.jsx("input",{type:"range",min:"0",max:"1",step:"0.1",name:"volume",id:"volume",value:i,onChange:this.voiceSettings})]}),t.jsxs("div",{className:"option",children:[t.jsx("label",{htmlFor:"rate",children:"Rate"}),t.jsx("input",{type:"range",min:"0.1",max:"10",step:"0.1",name:"rate",id:"rate",value:s,onChange:this.voiceSettings})]}),t.jsxs("div",{className:"option",children:[t.jsx("label",{htmlFor:"pitch",children:"Pitch"}),t.jsx("input",{type:"range",min:"0",max:"2",step:"0.1",name:"pitch",id:"pitch",value:n,onChange:this.voiceSettings})]}),this.state.error?t.jsx("div",{color:"red",children:this.state.error}):null,t.jsx("div",{children:t.jsx("button",{className:"btn",onClick:this.voiceSettingSave,children:"Save"})})]}),t.jsx("div",{children:t.jsx("a",{href:"",title:"Close",className:"modal-close bottom",onClick:a=>l(a,!1),children:"Close"})})]})})})}}const N="langscroll",y="srt",P="POPUP_DISCUSS",E="POPUP_SETTINGS",v="langbysubs_settings",O={SAME:"Files same, please upload different filename",EMPTY:"One of uploaded file has empty content, please upload another file"};function F(c){const{voice:r,rate:e=1,volume:s=1,pitch:n=1}=u.getJ(v)||{},i=new SpeechSynthesisUtterance;i.text=c,i.volume=parseFloat(String(s)),i.rate=parseFloat(String(e)),i.pitch=parseFloat(String(n)),r&&(i.voice=speechSynthesis.getVoices().filter(function(l){return l.name===r})[0]),window.speechSynthesis.speak(i)}class _ extends x.Component{constructor(e){super(e);o(this,"sepVariant");o(this,"buttonPressTimer");o(this,"getSubs",(e=!0)=>{let s=u.getJ("subs");return!s&&e&&(s=this.getDef()),s.sepVariant&&(s.sepVariant=new RegExp(s.sepVariant.replace(/\//g,""))),s});o(this,"getDef",()=>({subs:[],sepVariant:""}));o(this,"getItems",e=>{if(!e||e.length===0)return{items:[],filenames:[]};const s=[e[0].filename];let n=[];if(e[0]){const i=e[0].fixed?`

`:this.sepVariant;n=[e[0].bstr.split(i)]}if(e[1]){s.push(e[1].filename);const i=e[1].fixed?`

`:this.sepVariant;n.push(e[1].bstr.split(i))}return{items:n,filenames:s}});o(this,"upload",e=>{const{filenames:s}=this.state,n=s.length===2||e.length===2;if(s.length===1&&e[0].filename===s[0])return this.setState({error:"SAME"});let i=this.getDef();if(!n){const p=this.getSubs(!1);p&&(i=p)}const{setVariant:l}=i;let{subs:a=[]}=i,d="";l&&(this.sepVariant=l);for(let p=0;p<e.length;p+=1)e[p].bstr.trim()?a.push({bstr:e[p].bstr,filename:e[p].filename}):d="EMPTY";if(a.length){if(a.length===2){const{subs:p,sepVariant:S}=L(a);S&&(this.sepVariant=S),a=p,a[0].bstr=w(a[0].bstr),a[1].bstr=w(a[1].bstr)}u.setJ("subs",{subs:a,sepVariant:`${this.sepVariant}`})}const{items:m,filenames:h}=this.getItems(a);this.setState({items:m,showStr:"",error:d,filenames:h})});o(this,"clear",()=>{u.rm("subs"),this.setState({filenames:[],items:[],showPopupFiles:!1,showStr:"",error:""})});o(this,"replace",e=>{const{sepVariant:s,subs:n}=this.getSubs();let i=n;if(i.length<=1)return;i=[i[1],i[0]],u.setJ("subs",{subs:i,sepVariant:`${s}`});const{items:l}=this.getItems(i);this.setState({items:l})});o(this,"show",e=>{const s=e.target.getAttribute("data-ind"),{items:n,isShown:i,ind:l}=this.state;let a=i;const[,d]=n;if(d[s]){a=s!==l||!a;let m="";a&&(m=d[s]),this.setState({showStr:m,ind:s,isShown:a})}});o(this,"handleButtonRelease",()=>{this.buttonPressTimer&&clearTimeout(this.buttonPressTimer)});o(this,"handleScroll",()=>{u.set(N,window.scrollY)});o(this,"getStr",e=>{const s=e.split(/>\s[0-9]+:[0-9]+:[0-9]+,[0-9]+/);return s[1]&&(e=s[1]),e});o(this,"renderRow",(e,s)=>{const{voice:n}=this.state;return e=this.getStr(e),t.jsx("div",{onTouchEnd:this.handleButtonRelease,onMouseDown:this.show,onMouseUp:this.handleButtonRelease,"data-ind":s,children:t.jsxs("div",{"data-ind":s,children:[e,t.jsx("span",{className:"tooltiptext",children:t.jsx("button",{onClick:n?()=>F(e):this.voiceSetting,className:"icon speech-voice"})})]})},`${e}${s}`)});o(this,"demo",e=>{e.preventDefault(),this.upload(A)});o(this,"togglePopup",(e,s=!0)=>{e.preventDefault(),this.setState({showPopupFiles:s,modal:""})});o(this,"toggleDiscuss",e=>{e.preventDefault(),this.setState({modal:P})});o(this,"closeModal",()=>{this.setState({modal:""})});o(this,"voiceSetting",e=>{e.preventDefault(),this.setState({modal:E})});o(this,"voiceSettingSave",e=>{const{voice:s,rate:n,pitch:i,volume:l}=e;if(!s){this.setState({error:"Select voice please"});return}u.setJ(v,{voice:s,rate:n,pitch:i,volume:l}),this.setState({modal:"",voice:s,rate:n,pitch:i,volume:l})});const{subs:s,sepVariant:n}=this.getSubs();this.sepVariant=n,this.buttonPressTimer=void 0;const{items:i=[],filenames:l=[]}=this.getItems(s),{voice:a,rate:d=1,volume:m=1,pitch:h=1}=u.getJ(v)||{};this.state={showStr:"",ind:"",isShown:-1,error:"",filenames:l,items:i,showPopupFiles:!1,modal:"",voice:a,rate:d,volume:m,pitch:h}}componentDidMount(){const e=u.get(N,!1);e&&window.scrollTo(0,e),window.addEventListener("scroll",this.handleScroll)}componentWillUnmount(){window.removeEventListener("scroll",this.handleScroll)}render(){const{items:e,showStr:s,error:n,filenames:i,showPopupFiles:l,modal:a,voice:d}=this.state,m=`folder${e.length?"-fill":""}`;return t.jsxs("div",{className:"lang-subs",children:[l?t.jsx("div",{id:"filenames",className:"modal-window",children:t.jsxs("div",{children:[t.jsx("a",{href:"",title:"Close",className:"modal-close",onClick:h=>this.togglePopup(h,!1),children:"Close"}),t.jsx("h1",{children:"Files"}),t.jsxs("div",{children:[t.jsxs("div",{children:[i.map((h,p)=>t.jsxs("div",{children:[p+1," File ",h]},h)),t.jsx("div",{children:t.jsx("button",{className:"btn",onClick:this.clear,children:"Delete all"})})]}),t.jsx("a",{href:"",title:"Close",className:"modal-close bottom",onClick:h=>this.togglePopup(h,!1),children:"Close"})]})]})}):null,a===P?t.jsx("div",{id:"filenames",className:"modal-window",children:t.jsxs("div",{children:[t.jsx("a",{href:"",title:"Close",className:"modal-close",onClick:h=>this.togglePopup(h,!1),children:"Close"}),t.jsx("h1",{children:"Subs"}),t.jsxs("div",{children:["Upload your subs in channel:",t.jsx("a",{href:"tg://resolve?domain=langbysubs",children:" @langbysubs"})]}),t.jsx("div",{children:t.jsx("a",{href:"",title:"Close",className:"modal-close bottom",onClick:h=>this.togglePopup(h,!1),children:"Close"})})]})}):null,s?t.jsx("div",{className:"tooltip1",children:t.jsxs("span",{className:"tooltiptext",children:[this.getStr(s),t.jsx("button",{onClick:d?()=>F(this.getStr(s)):this.voiceSetting,className:"icon speech-voice"})]})}):null,t.jsx("div",{children:e.length===2?t.jsxs("div",{className:"buttons",children:[t.jsx("button",{className:`icon ${m}-icon`,onClick:this.togglePopup}),t.jsx("button",{className:"icon earth-search",onClick:this.toggleDiscuss}),t.jsx("button",{className:"icon speech-voice-setting",onClick:this.voiceSetting}),t.jsx("button",{className:"icon replace-icon",onClick:this.replace})]}):null}),t.jsxs("div",{className:"lang-items",children:[e.length?null:t.jsxs("div",{children:[t.jsx("div",{children:"Please upload two .srt files with different languages"}),t.jsx("p",{}),t.jsxs("div",{className:"flexible",children:[t.jsx(b,{type:y,upload:this.upload,label:"Add files"}),t.jsx("div",{className:"btn btn-ghost-success",children:"or"}),t.jsx("button",{className:"btn",onClick:this.demo,children:"TRY DEMO"})]})]}),e.length===1?t.jsxs("div",{className:"load-step",children:[n?t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"alert alert-danger",children:O[n]}),t.jsx("br",{})]}):null,t.jsxs("div",{children:["1 File ",i[0],t.jsx("span",{className:"green",children:" loaded"})]}),t.jsxs("div",{children:["2 File ",t.jsx("span",{className:"gray",children:"not loaded"})]}),t.jsx(b,{upload:this.upload,type:y,label:"Add second subtitles file",isSingle:!0}),t.jsx("br",{}),t.jsx("div",{children:t.jsx("button",{className:"btn",onClick:this.clear,children:"Delete all"})})]}):null,e.length===2?e[0].map((h,p)=>this.renderRow(h,p)):null]}),a===E?t.jsx(B,{closeModal:this.closeModal,voice:this.state.voice,rate:this.state.rate,pitch:this.state.pitch,volume:this.state.volume,togglePopup:this.togglePopup,voiceSettingSave:this.voiceSettingSave}):null]})}}const H=_,Y=()=>t.jsx(H,{});export{Y as default};
