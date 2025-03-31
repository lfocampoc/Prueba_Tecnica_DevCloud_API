import{A as te,C as I,D as oe,E as re,G as ne,a as O,b as M,d as U,e as G,h as B,i as P,j as V,k as u,m as A,n as z,p as H,r as W,s as X,t as K,v as Z,x as $,y as J,z as Q}from"./chunk-KDMNBDSA.js";import{Y,Z as ee,_ as ie,j as q,l as D,m as d,o as b}from"./chunk-ML634Y4W.js";import"./chunk-IX6G3U3V.js";import{Ab as h,Ac as k,Cb as E,Cc as x,Fb as N,Ob as s,Pb as _,Sa as m,Ta as c,Z as w,_ as v,ca as F,da as R,ha as T,ia as g,ib as S,mb as a,sb as t,tb as n,ub as l,zc as j}from"./chunk-6MIPTKOA.js";var p=class e{constructor(r){this.serviceUtils=r}doLogin(r){return this.serviceUtils.buildRequest(te.loginUsers,"post",r)}static \u0275fac=function(o){return new(o||e)(F(I))};static \u0275prov=w({token:e,factory:e.\u0275fac,providedIn:"root"})};function se(e,r){e&1&&(t(0,"div"),l(1,"mat-icon",24),n())}function le(e,r){e&1&&(t(0,"div"),l(1,"mat-icon",25),n())}function ce(e,r){if(e&1&&(t(0,"p"),s(1),n()),e&2){let o=r.$implicit;m(),_(o)}}function pe(e,r){if(e&1&&(t(0,"div",26),S(1,ce,2,1,"p",27),n()),e&2){let o=E();m(),a("ngForOf",o.errorService)}}var f=class e{constructor(r,o,i,C,ve){this.customIconService=r;this.loginService=o;this.router=i;this.sessionService=C;this.fb=ve;this.customIconService.init()}themeService=R(q);showPassword;formLogin;errorLogin;errorService=[];changueTheme(){this.themeService.updateTheme()}ngOnInit(){this.formLogin=this.fb.group({email:[null,u.compose([u.required,u.email])],password:[null,u.required]})}processLogin(r){let o={email:r.email,password:r.password};this.loginService.doLogin(o).subscribe(i=>{i.success?(this.sessionService.saveSessionData(i.data),this.sessionService.saveSessionToken(i.data.token),this.router.navigateByUrl("/virtualmachine")):(this.errorLogin=!0,this.errorService=i.errors)})}static \u0275fac=function(o){return new(o||e)(c(ie),c(p),c(D),c(b),c(Z))};static \u0275cmp=T({type:e,selectors:[["screen-login"]],decls:38,vars:9,consts:[[1,"login"],[1,"section-theme"],[3,"click"],[4,"ngIf"],[1,"login-section"],[1,"row","col-6","card-login"],[1,"col-6"],["src","https://media.istockphoto.com/id/136636516/photo/network-server-room.jpg?s=612x612&w=0&k=20&c=XTxDGs-1WzGB8H5zR8CKk29vbhm46faW7hzZ13A2HDU=","alt","",2,"width","100%"],[1,"title"],[1,"pt-4"],["src","/assets/img/programmer.png","alt","",2,"width","18%"],[3,"ngSubmit","formGroup"],[1,"form-login"],[1,"user-field"],[1,"label-detail"],[1,"input-form",3,"floatLabel"],["matInput","","required","","placeholder","ejemplo@ejemplo.com","id","email","name","email","formControlName","email",1,"custom-input"],[1,"mat-error"],["matInput","","required","","placeholder","Ingrese su contrase\xF1a","name","password","formControlName","password",1,"custom-input",3,"type"],["matSuffix","",2,"cursor","pointer",3,"click"],["class","errorLogin",4,"ngIf"],[1,"form-submit"],[1,"section-button"],["mat-raised-button","","color","primary","type","submit",3,"disabled"],["svgIcon","sun"],["svgIcon","moon"],[1,"errorLogin"],[4,"ngFor","ngForOf"]],template:function(o,i){o&1&&(t(0,"section",0)(1,"div",1)(2,"p")(3,"mat-slide-toggle",2),h("click",function(){return i.changueTheme()}),S(4,se,2,0,"div",3)(5,le,2,0,"div",3),n()()(),t(6,"div",4)(7,"div",5)(8,"div",6),l(9,"img",7),n(),t(10,"div",6)(11,"h1",8),s(12,"IFX Prueba Tecnica"),n(),t(13,"div",9),l(14,"img",10),n(),t(15,"form",11),h("ngSubmit",function(){return i.processLogin(i.formLogin.value)}),t(16,"div",12)(17,"div",13)(18,"label",14),s(19,"Correo Electronico"),n(),t(20,"mat-form-field",15),l(21,"input",16),t(22,"mat-error",17),s(23,"Correo electronico requerido"),n()()(),t(24,"div",13)(25,"label",14),s(26,"Contrase\xF1a"),n(),t(27,"mat-form-field",15),l(28,"input",18),t(29,"mat-icon",19),h("click",function(){return i.showPassword=!i.showPassword}),s(30),n(),t(31,"mat-error",17),s(32,"Campo requerido"),n()()(),S(33,pe,2,1,"div",20),t(34,"div",21)(35,"div",22)(36,"button",23),s(37,"Conectarme"),n()()()()()()()()()),o&2&&(m(4),a("ngIf",i.themeService.themeSignal()==="dark"),m(),a("ngIf",i.themeService.themeSignal()!=="dark"),m(10),a("formGroup",i.formLogin),m(5),a("floatLabel","always"),m(7),a("floatLabel","always"),m(),N("type",i.showPassword?"text":"password"),m(2),_(i.showPassword?"visibility_off":"visibility"),m(3),a("ngIf",i.errorLogin),m(3),a("disabled",i.formLogin.status==="INVALID"))},dependencies:[j,k,O,B,U,G,J,H,V,A,z,K,W,X,Y,oe],encapsulation:2})};var de=[{path:"",component:f}],L=class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=g({type:e});static \u0275inj=v({imports:[d.forChild(de),d]})};var ue=[x,L,M,P,Q,$,d,ne,M,ee,re],fe=[p,I,b],me=class e{static \u0275fac=function(o){return new(o||e)};static \u0275mod=g({type:e});static \u0275inj=v({providers:fe,imports:[ue]})};export{me as LoginModule};
