import{q as e,j as s,y as r,d as a}from"./app-au_dz3zB.js";import{H as o,S as l}from"./Header-DAP3acc2.js";import{B as i}from"./Box-DcZVPe1H.js";import{B as c}from"./Button-C46Gqqjc.js";import"./ButtonBase-Fhvr62SK.js";import"./createSvgIcon-Cu8M6P0d.js";const u=()=>{const t=e().props.auth.user;return s.jsxs("div",{children:[s.jsx(o,{header:"アカウント"}),s.jsxs(i,{className:"mx-3 pt-12",children:[s.jsxs("div",{className:"text-center",children:[s.jsx("img",{className:"mx-auto my-3 w-32",style:{borderRadius:"50%"},src:`../storage/image/${t.account.icon}`}),s.jsx(c,{variant:"outlined",onClick:()=>r.visit(route("profile.edit"),{method:"get"}),style:{color:"#f7576b",borderColor:"#f7576b"},children:"プロフィールを編集する"})]}),s.jsx("table",{className:"mt-5",children:s.jsxs("tbody",{children:[s.jsxs("tr",{className:"",children:[s.jsx("th",{className:"text-left w-28 py-3",children:"名前"}),s.jsx("td",{children:t.name})]}),s.jsxs("tr",{children:[s.jsx("th",{className:"text-left w-28 py-3",children:"Email"}),s.jsx("td",{children:t.email})]}),s.jsxs("tr",{children:[s.jsx("th",{className:"text-left w-28 py-3",children:"プロフィール"}),s.jsx("td",{className:"whitespace-pre-wrap",children:t.account.profile})]})]})}),s.jsx(a,{href:route("logout"),method:"post",as:"button",className:"mt-8 font-bold",style:{color:"#f7576b"},children:"ログアウト"})]}),s.jsx(l,{})]})};export{u as default};