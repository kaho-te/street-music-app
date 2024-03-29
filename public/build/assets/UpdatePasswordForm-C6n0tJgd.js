import{r as u,W as h,j as s}from"./app-BhpkOes0.js";import{T as n,I as c}from"./TextInput-ChwOuY-1.js";import{I as d}from"./InputLabel-CfnZYMjy.js";import{P as v}from"./PrimaryButton-DMoYLwYE.js";import{q as _}from"./transition-mrqDUb2-.js";function C({className:m=""}){const p=u.useRef(),l=u.useRef(),{data:e,setData:a,errors:o,put:w,reset:t,processing:f,recentlySuccessful:x}=h({current_password:"",password:"",password_confirmation:""}),j=r=>{r.preventDefault(),w(route("password.update"),{preserveScroll:!0,onSuccess:()=>t(),onError:i=>{i.password&&(t("password","password_confirmation"),p.current.focus()),i.current_password&&(t("current_password"),l.current.focus())}})};return s.jsxs("section",{className:m,children:[s.jsx("header",{children:s.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"パスワード"})}),s.jsxs("form",{onSubmit:j,className:"mt-6 space-y-6",children:[s.jsxs("div",{children:[s.jsx(d,{htmlFor:"current_password",value:"現在のパスワード"}),s.jsx(n,{id:"current_password",ref:l,value:e.current_password,onChange:r=>a("current_password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"current-password"}),s.jsx(c,{message:o.current_password,className:"mt-2"})]}),s.jsxs("div",{children:[s.jsx(d,{htmlFor:"password",value:"新しいパスワード"}),s.jsx(n,{id:"password",ref:p,value:e.password,onChange:r=>a("password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s.jsx(c,{message:o.password,className:"mt-2"})]}),s.jsxs("div",{children:[s.jsx(d,{htmlFor:"password_confirmation",value:"新しいパスワード（確認）"}),s.jsx(n,{id:"password_confirmation",value:e.password_confirmation,onChange:r=>a("password_confirmation",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s.jsx(c,{message:o.password_confirmation,className:"mt-2"})]}),s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx(v,{disabled:f,children:"Save"}),s.jsx(_,{show:x,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:s.jsx("p",{className:"text-sm text-gray-600",children:"Saved."})})]})]})]})}export{C as default};