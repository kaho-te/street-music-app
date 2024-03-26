import{j as e,d as ne,c as y,r,W as ie}from"./app-DoXcT2EI.js";import{r as R,i as _}from"./ButtonBase-BN4DkJN0.js";import{R as ce,a as le}from"./RecordRTC-DUbwg6C8.js";import{B as de,R as ue,F as D,a as L,d as me,b as xe}from"./Stop-DLKxXFWt.js";import{I as k,B as T,M as he,T as l,a as ve,s as je}from"./mui-file-input.es-GZ59ryEe.js";const fe=s=>e.jsxs("div",{className:"fixed py-3 w-full flex items-center justify-center bg-pink-200 z-10",children:[e.jsx(ne,{className:"px-6 absolute left-0",href:"/posts",children:"戻る"}),e.jsx("div",{className:"",children:s.header})]});var C={},ge=_;Object.defineProperty(C,"__esModule",{value:!0});var P=C.default=void 0,pe=ge(R()),z=y();P=C.default=(0,pe.default)([(0,z.jsx)("path",{d:"M14 9c0-2.04 1.24-3.79 3-4.57V4c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h9c1.1 0 2-.9 2-2v-2.42c-1.76-.78-3-2.53-3-4.58m-4 5H6v-2h4zm3-3H6V9h7zm0-3H6V6h7z"},"0"),(0,z.jsx)("path",{d:"M20 6.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V3h2V1h-4z"},"1")],"LyricsRounded");var N={},be=_;Object.defineProperty(N,"__esModule",{value:!0});var U=N.default=void 0,ye=be(R()),Re=y();U=N.default=(0,ye.default)((0,Re.jsx)("path",{d:"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3m-4.4 15.55-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05"}),"FavoriteBorder");var S={},_e=_;Object.defineProperty(S,"__esModule",{value:!0});var E=S.default=void 0,Ce=_e(R()),Ne=y();E=S.default=(0,Ce.default)((0,Ne.jsx)("path",{d:"m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"}),"Favorite");const Se=()=>{const s=new Date,d=s.getFullYear(),o=s.getMonth()+1,n=s.getDate(),x=s.getHours(),h=s.getMinutes(),u=s.getSeconds();return`${d}${o}${n}${x}${h}${u}`},ke=s=>{const d="../storage/audio/",o=s.post,[n,x]=r.useState(null),[h,u]=r.useState(!1),[we,I]=r.useState(""),[O,V]=r.useState([]),[w,q]=r.useState("record");r.useState();const[M,H]=r.useState([]),[i,v]=r.useState(),[$,j]=r.useState(),[A,f]=r.useState(!1),{data:Me,setData:g,post:p}=ie({text:"",music:"",post_id:s.post.id,user_id:s.auth.user.id});r.useEffect(()=>{H(s.post.comments)},[M]);const c=r.useRef(null),b=r.useRef(null);function W(){f(!0)}function G(){f(!1)}const J=t=>{v(t);const a=URL.createObjectURL(t);j(a),g("music",t)},Y=({isRecording:t,stopCallback:a,startCallback:m})=>e.jsx("button",{className:"rounded-full w-20 h-20 shadow-lg bg-[#E5671D] hover:bg-[#FFB2A9] duration-300 transition drop-shadow-md active:translate-y-3",onClick:t?a:m,type:"button",children:t?e.jsx(me,{fontSize:"large"}):e.jsx(xe,{fontSize:"large"})}),K=async()=>{try{n&&n.destroy();const t=await navigator.mediaDevices.getUserMedia({audio:!0,video:!1}),a=new ce(t.clone(),{type:"audio",recorderType:le.StereoAudioRecorder,mimeType:"audio/wav"});a.startRecording(),F(),x(a),u(!0)}catch(t){t instanceof Error&&I("録音の開始に失敗しました: "+t.message)}},Q=()=>{ee(),n&&n.stopRecording(()=>{const t=Se(),a=n.getBlob(),m=new File([a],"audio_"+t+".wav",{type:"audio/wav"}),B=URL.createObjectURL(a);u(!1);const ae=Math.random().toString(32).substring(2)+new Date().getTime().toString(32),oe={audioURL:B,blob:a,id:ae,recDate:t};V([...O,oe]),j(B),v(m),g("music",m)})},X=t=>{s.isLike?p(route("like.destroy",s.post),{preserveScroll:!0}):p(route("like.store",s.post))},Z=t=>{q(t.target.value)},F=()=>{c.current.volume=.3,c.current.play()},ee=()=>{c.current.pause(),c.current.currentTime=0},te=()=>{b.current.volume=.3,b.current.play()},se=()=>{te(),setTimeout(()=>{F()},100)},re=t=>{console.log("コメント投稿"),t.preventDefault(),v(),j(),f(!1),p(route("comment.store"))};return e.jsxs("div",{children:[e.jsx(fe,{header:"再生"}),e.jsxs("div",{className:"mx-3 pt-12 border-dotted border-b-2 border-gray-400",children:[e.jsxs("div",{className:"flex items-center mt-2",children:[e.jsx("img",{className:"mr-2 w-12 h-12",style:{borderRadius:"50%"},src:`../storage/image/${s.post.user.account.icon}`,alt:"アイコン"}),e.jsxs("div",{children:[e.jsx("div",{children:o.user.name}),e.jsx("div",{children:o.created_at})]})]}),e.jsx("div",{className:"mt-2",children:o.address}),e.jsx("div",{className:"mt-2",children:o.story}),e.jsx("audio",{id:"main",ref:c,controls:!0,src:d+o.user_id+"/"+o.music,className:"mt-2"}),e.jsxs("div",{className:"flex justify-around my-3 mx-3",children:[e.jsx(k,{type:"button",onClick:X,children:s.isLike?e.jsx(E,{style:{color:"#eb3495"}}):e.jsx(U,{})}),e.jsx(k,{type:"button",onClick:W,children:e.jsx(P,{})})]})]}),M.map((t,a)=>e.jsxs("div",{className:"mx-3 py-3 border-dotted border-b-2 border-gray-400",children:[e.jsxs("div",{className:"mt-2 flex items-center",children:[e.jsx("img",{className:"mr-2 w-12 h-12",style:{borderRadius:"50%"},src:`../storage/image/${t.user.account.icon}`,alt:"アイコン"}),e.jsxs("div",{children:[e.jsx("div",{children:t.user.name}),e.jsx("div",{children:t.created_at})]})]}),e.jsx("div",{className:"mt-2",children:t.text}),e.jsx("audio",{className:"my-2",ref:b,controls:!0,src:d+t.user_id+"/"+t.music}),e.jsx(T,{variant:"outlined",onClick:se,style:{color:"#eb3495",borderColor:"#eb3495"},children:"Session"})]},a)),e.jsx("div",{children:e.jsx(he,{className:"",open:A,onClose:G,children:e.jsx("div",{className:"bg-white absolute bottom-0 w-full h-2/3 px-3 overflow-y-scroll",children:e.jsxs(de,{component:"form",onSubmit:re,encType:"multipart/form-data",className:"px-3",children:[e.jsxs("div",{className:"py-3 w-full flex items-center justify-center",children:[e.jsx("div",{className:"",children:"コメントを書く"}),e.jsx("div",{className:"mr-3 absolute right-0",children:e.jsx(T,{variant:"outlined",color:"inherit",type:"submit",children:"投稿"})})]}),e.jsx(l,{variant:"body1",component:"h6",mt:3,gutterBottom:!0,children:"コメント"}),e.jsx(ve,{variant:"standard",multiline:!0,className:"text w-full",onChange:t=>g("text",t.target.value)}),e.jsx(l,{variant:"body1",component:"h6",mt:5,gutterBottom:!0,children:"投稿方法"}),e.jsxs(ue,{defaultValue:"record",row:!0,onChange:Z,children:[e.jsx(D,{value:"record",control:e.jsx(L,{}),label:"録音"}),e.jsx(D,{value:"file",control:e.jsx(L,{}),label:"ファイルアップロード"})]}),w==="record"&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mt-3",children:e.jsx("audio",{controls:!0,src:$})}),e.jsx("div",{className:"flex flex-col justify-center items-center z-50 py-8",children:e.jsx(Y,{type:"button",isRecording:h,stopCallback:Q,startCallback:K})})]}),w==="file"&&e.jsxs(e.Fragment,{children:[e.jsx(l,{variant:"body1",component:"h6",mt:3,gutterBottom:!0,children:"ファイル選択"}),e.jsx(je,{value:i,onChange:J,variant:"standard"}),e.jsx("br",{}),e.jsx(l,{variant:"caption",component:"div",gutterBottom:!0,children:"MP3/WAV ファイルのみ。"}),i&&!(i.type==="audio/mpeg"||i.type==="audio/wav"||i.type==="audio/webm")&&e.jsx(l,{variant:"caption",component:"div",color:"error.main",gutterBottom:!0,children:"このファイルタイプはサポートしていません。"}),e.jsx("div",{className:"mt-3",children:e.jsx("audio",{controls:!0,src:$})})]})]})})})})]})};export{ke as default};
