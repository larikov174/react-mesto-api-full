(this["webpackJsonpreact-mesto"]=this["webpackJsonpreact-mesto"]||[]).push([[0],{19:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),i=n(11),o=n.n(i),r=n(6),s=(n(19),n(14)),u=n(5),l=n.n(u),p=n(7),d=n(2),j=n(3),b=c.a.createContext(),h=c.a.createContext(),m=n(0);var O=function(e){var t=e.children;return c.a.useContext(h)?t:Object(m.jsx)(j.a,{to:"./sign-in",replace:!0})},f=n(12),_=n(13),v=new(function(){function e(t){var n=t.token,a=t.link;Object(f.a)(this,e),this._handleResponse=function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))},this._token=n,this._link=a}return Object(_.a)(e,[{key:"_getInitCards",value:function(){return fetch("".concat(this._link,"cards"),{headers:{Authorization:this._token}}).then(this._handleResponse)}},{key:"_getUserInfo",value:function(){return fetch("".concat(this._link,"users/me"),{headers:{Authorization:this._token}}).then(this._handleResponse)}},{key:"setUserInfo",value:function(e){return fetch("".concat(this._link,"users/me"),{method:"PATCH",headers:{Authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:e.name,about:e.about})}).then(this._handleResponse)}},{key:"postCard",value:function(e){return fetch("".concat(this._link,"cards"),{method:"POST",headers:{Authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:e.name,link:e.link})}).then(this._handleResponse)}},{key:"removeCard",value:function(e){return fetch("".concat(this._link,"cards/").concat(e._id),{method:"DELETE",headers:{authorization:this._token}}).then(this._handleResponse)}},{key:"setLike",value:function(e){return fetch("".concat(this._link,"cards/likes/").concat(e._id),{method:"PUT",headers:{authorization:this._token}}).then(this._handleResponse)}},{key:"removeLike",value:function(e){return fetch("".concat(this._link,"cards/likes/").concat(e._id),{method:"DELETE",headers:{authorization:this._token}}).then(this._handleResponse)}},{key:"uploadAvatar",value:function(e){return fetch("".concat(this._link,"users/me/avatar"),{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then(this._handleResponse)}},{key:"getInitData",value:function(){return Promise.all([this._getUserInfo(),this._getInitCards()])}}]),e}())({token:"c4b6220d-e8d9-4ddd-adea-4fda80f87475",link:"https://api.larikov.nomoredomains.rocks/"});var x=function(){var e="https://api.larikov.nomoredomains.rocks/",t=function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))};return{signUp:function(n){var a=n.password,c=n.email;return fetch("".concat(e,"signup"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:a,email:c})}).then(t)},signIn:function(n){var a=n.password,c=n.email;return fetch("".concat(e,"signin"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:a,email:c})}).then(t)},checkToken:function(n){return fetch("".concat(e,"users/me"),{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer ".concat(n)}}).then(t)}}};var g=function(e){var t=e.onSignOut,n=Object(j.f)().pathname,i=c.a.useContext(h),o=Object(a.useState)("/sign-in"),s=Object(d.a)(o,2),u=s[0],l=s[1],p=Object(a.useState)(),b=Object(d.a)(p,2),O=b[0],f=b[1],_=Object(a.useState)(!1),v=Object(d.a)(_,2),x=v[0],g=v[1],k=localStorage.getItem("email"),C=function(){g(!1),t()};return Object(a.useEffect)((function(){i||"/sign-in"!==n?i||"/sign-up"!==n?(f("\u0412\u044b\u0439\u0442\u0438"),l("/sign-in")):(f("\u0412\u043e\u0439\u0442\u0438"),l("/sign-in")):(f("\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"),l("/sign-up"))})),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{className:"burger ".concat(x?"burger_type_active":""),children:[Object(m.jsxs)("p",{className:"burger__text",children:[k,"\xa0"]}),Object(m.jsx)(r.b,{className:"burger__link",to:u,onClick:C,children:O})]}),Object(m.jsxs)("header",{className:"header",children:[Object(m.jsx)("div",{className:"header__logo",title:"Mesto"}),Object(m.jsxs)("div",{className:"header__actions",children:[Object(m.jsxs)("p",{className:"header__text",children:[k,"\xa0"]}),Object(m.jsx)(r.b,{to:u,className:"header__link ".concat(i&&"header__link_idle-on-mobile"),onClick:C,children:O}),Object(m.jsx)("button",{className:"".concat(i?"header__burger":"header__burger_idle"," ").concat(x?"header__burger_type_close":"","\n            "),type:"button",onClick:function(){return g(!x)}})]})]})]})};var k=function(e){var t=e.card,n=e.onCardClick,a=e.onCardLike,i=e.onCardDelete,o=c.a.useContext(b),r=t.likes.some((function(e){return e._id===o._id})),s="card__like-button ".concat(r&&"card__like-button_active"),u=t.owner._id===o._id,l="card__delete-button ".concat(u?"card__delete-button_visible":"card__delete-button_hidden");return Object(m.jsxs)("li",{className:"card",children:[Object(m.jsx)("img",{className:"card__image",src:t.link,alt:t.name}),Object(m.jsx)("div",{role:"presentation",className:"card__overlay",onClick:function(){n({src:t.link,title:t.name})}}),Object(m.jsx)("button",{className:l,type:"button",onClick:function(){i(t)}}),Object(m.jsxs)("div",{className:"card__items",children:[Object(m.jsx)("h2",{className:"card__caption",children:t.name}),Object(m.jsxs)("div",{className:"card__like-block",children:[Object(m.jsx)("button",{className:s,type:"button",onClick:function(){a(t,r)}}),Object(m.jsx)("p",{className:"card__like-counter",children:t.likes.length})]})]})]})};var C=function(e){var t=e.cards,n=e.onEditProfile,a=e.onAddPlace,i=e.onEditAvatar,o=e.onCardClick,r=e.onCardLike,s=e.onCardDelete,u=c.a.useContext(b),l=u.name,p=u.about,d=u.avatar;return Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)("main",{children:[Object(m.jsxs)("section",{className:"profile",children:[Object(m.jsx)("div",{className:"profile__avatar-overlay",onClick:i,role:"presentation",children:Object(m.jsx)("img",{className:"profile__avatar",src:d,alt:"\u0410\u0432\u0430\u0442\u0430\u0440"})}),Object(m.jsxs)("div",{className:"profile__info",children:[Object(m.jsx)("h1",{className:"profile__title",children:l}),Object(m.jsx)("p",{className:"profile__subtitle",children:p}),Object(m.jsx)("button",{className:"profile__edit-button",type:"button",onClick:n})]}),Object(m.jsx)("button",{className:"profile__add-button",type:"button",onClick:a})]}),Object(m.jsx)("section",{children:Object(m.jsx)("ul",{className:"cards",children:t.map((function(e){return Object(m.jsx)(k,{card:e,cardId:e._id,onCardClick:o,onCardLike:r,onCardDelete:s},e._id)}))})})]})})};function N(e){var t=e.children,n=e.onSubmit,a=Object(j.f)().pathname,c=Object(m.jsxs)("div",{className:"login__actions",children:[Object(m.jsx)("p",{className:"login__text",children:"\u0423\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043d\u044b?\xa0"}),Object(m.jsx)(r.b,{className:"login__link",to:"/sign-in",children:"\u0412\u043e\u0439\u0442\u0438"})]});return Object(m.jsxs)("form",{className:"login",onSubmit:n,children:[t,"/sign-up"===a&&c]})}function y(e){var t=e.onLogin,n=Object(a.useState)(),c=Object(d.a)(n,2),i=c[0],o=c[1],r=Object(a.useState)(),s=Object(d.a)(r,2),u=s[0],l=s[1],p=Object(a.useState)("\u0412\u043e\u0439\u0442\u0438"),j=Object(d.a)(p,2),b=j[0],h=j[1];return Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)(N,{className:"login",onSubmit:function(e){e.preventDefault(),h("\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430..."),t({password:u,email:i})},children:[Object(m.jsx)("h2",{className:"login__title",children:"\u0412\u0445\u043e\u0434"}),Object(m.jsx)("input",{className:"login__input",onChange:function(e){return o(e.target.value)},name:"email",type:"email",title:"email",value:i||"",placeholder:"Email",required:!0}),Object(m.jsx)("input",{className:"login__input",onChange:function(e){return l(e.target.value)},name:"password",type:"password",title:"\u041f\u0430\u0440\u043e\u043b\u044c",value:u||"",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",required:!0}),Object(m.jsx)("button",{className:"login__button",type:"submit",children:b})]})})}function S(e){var t=e.onSignUp,n=Object(a.useState)(),c=Object(d.a)(n,2),i=c[0],o=c[1],r=Object(a.useState)(),s=Object(d.a)(r,2),u=s[0],l=s[1],p=Object(a.useState)("\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"),j=Object(d.a)(p,2),b=j[0],h=j[1];return Object(m.jsx)(m.Fragment,{children:Object(m.jsxs)(N,{className:"login",onSubmit:function(e){e.preventDefault(),h("\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430..."),t({password:u,email:i})},children:[Object(m.jsx)("h2",{className:"login__title",children:"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044f"}),Object(m.jsx)("input",{className:"login__input",onChange:function(e){return o(e.target.value)},name:"email",type:"email",title:"email",value:i||"",placeholder:"Email",required:!0}),Object(m.jsx)("input",{className:"login__input",onChange:function(e){return l(e.target.value)},name:"password",type:"password",title:"\u041f\u0430\u0440\u043e\u043b\u044c",value:u||"",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",required:!0}),Object(m.jsx)("button",{className:"login__button",type:"submit",children:b})]})})}var w=function(){return Object(m.jsx)("footer",{className:"footer",children:Object(m.jsx)("h2",{className:"footer__copyright",children:"\xa9 2021 Mesto Russia"})})};var T=function(e){var t=e.title,n=e.name,a=e.children,c=e.isOpen,i=e.onClose,o=e.btnCaption,r=e.onSubmit;return Object(m.jsx)("div",{id:n,className:"popup ".concat(c?"popup_opened":""),role:"presentation",onClick:function(e){return e.target===e.currentTarget&&i()},children:Object(m.jsx)("form",{className:"popup__container popup__container_data",name:n,onSubmit:r,children:Object(m.jsxs)("div",{className:"popup__window",children:[Object(m.jsx)("button",{className:"popup__close-button",type:"button",name:"closePopup",onClick:i}),Object(m.jsx)("h2",{className:"popup__title",children:t}),a,Object(m.jsx)("button",{className:"popup__submit-button",type:"submit",name:"submitPopup",children:o})]})})})};var P=function(e){var t=e.isOpen,n=e.onClose,c=e.onUpdateUser,i=Object(a.useContext)(b),o=Object(a.useState)("\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"),r=Object(d.a)(o,2),s=r[0],u=r[1],l=Object(a.useState)(i.name),p=Object(d.a)(l,2),j=p[0],h=p[1],O=Object(a.useState)(i.about),f=Object(d.a)(O,2),_=f[0],v=f[1];return Object(a.useEffect)((function(){h(i.name),v(i.about)}),[i,t]),Object(m.jsxs)(T,{name:"profileForm",title:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c",isOpen:t,onClose:n,onSubmit:function(e){e.preventDefault(),u("\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430..."),c({name:j,about:_}).then((function(){return u("\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c")})).catch((function(){return u("\u041e\u0448\u0438\u0431\u043a\u0430!")}))},btnCaption:s,children:[Object(m.jsx)("input",{id:"inputProfileName",className:"popup__input",name:"name",value:j||"",onChange:function(e){return h(e.target.value)},type:"text",title:"\u0438\u043c\u044f \u0430\u0432\u0442\u043e\u0440\u0430",placeholder:"\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043c\u044f \u0430\u0432\u0442\u043e\u0440\u0430",minLength:"2",maxLength:"40",required:!0}),Object(m.jsx)("input",{id:"inputProfileWork",className:"popup__input",name:"work",value:_||"",onChange:function(e){return v(e.target.value)},type:"text",title:"\u0432\u0438\u0434 \u0434\u0435\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438",placeholder:"\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0438\u0434 \u0434\u0435\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438",minLength:"2",maxLength:"200",required:!0})]})};var L=function(e){var t=e.isOpen,n=e.onClose,a=e.onUpdateAvatar,i=c.a.useState("\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"),o=Object(d.a)(i,2),r=o[0],s=o[1],u=c.a.useRef();return Object(m.jsx)(T,{name:"avatarForm",title:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440",isOpen:t,onClose:n,onSubmit:function(e){e.preventDefault(),s("\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430..."),a({avatar:u.current.value}).then((function(){return u.current.value="",void s("\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c")})).catch((function(){return s("\u041e\u0448\u0438\u0431\u043a\u0430!")}))},btnCaption:r,children:Object(m.jsx)("input",{id:"inputLink",className:"popup__input",name:"link",type:"url",title:"\u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u043f\u0443\u0442\u044c",ref:u,placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",required:!0})})};var I=function(e){var t=e.isOpen,n=e.onClose,c=e.onAddPlace,i=Object(a.useState)(""),o=Object(d.a)(i,2),r=o[0],s=o[1],u=Object(a.useState)(""),l=Object(d.a)(u,2),p=l[0],j=l[1],b=Object(a.useState)("\u0421\u043e\u0437\u0434\u0430\u0442\u044c"),h=Object(d.a)(b,2),O=h[0],f=h[1];return Object(m.jsxs)(T,{name:"placeForm",title:"\u041d\u043e\u0432\u043e\u0435 \u043c\u0435\u0441\u0442\u043e",isOpen:t,onClose:n,onSubmit:function(e){e.preventDefault(),f("\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430..."),c({name:r,link:p}).then((function(){return s(""),j(""),void f("\u0421\u043e\u0437\u0434\u0430\u0442\u044c")})).catch((function(){return f("\u041e\u0448\u0438\u0431\u043a\u0430!")}))},btnCaption:O,children:[Object(m.jsx)("input",{id:"inputPlaceName",className:"popup__input",name:"name",type:"text",value:r||"",onChange:function(e){return s(e.target.value)},title:"\u043d\u0430\u0437\u043e\u0432\u0438\u0442\u0435 \u043c\u0435\u0441\u0442\u043e",placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",minLength:"2",maxLength:"30",required:!0}),Object(m.jsx)("input",{id:"inputPlaceLink",className:"popup__input",name:"link",type:"url",value:p||"",onChange:function(e){return j(e.target.value)},title:"\u0443\u043a\u0430\u0436\u0438\u0442\u0435 \u043f\u0443\u0442\u044c",placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",required:!0})]})};var E=function(e){var t=e.isOpen,n=e.onClose,a=e.onCardDelete,i=c.a.useState("\u0414\u0430"),o=Object(d.a)(i,2),r=o[0],s=o[1];return Object(m.jsx)(T,{name:"cardDeleteForm",title:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?",isOpen:t,onClose:n,onSubmit:function(e){e.preventDefault(),s("\u041e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430..."),a().then((function(){return s("\u0414\u0430")})).catch((function(){return s("\u041e\u0448\u0438\u0431\u043a\u0430!")}))},btnCaption:r})};var A=function(e){var t=e.card,n=e.isOpen,a=e.onClose;return Object(m.jsx)("div",{id:"imageWindow",className:"popup ".concat(n?"popup_opened":""),role:"presentation",onClick:function(e){return e.target===e.currentTarget&&a()},children:Object(m.jsxs)("div",{className:"popup__container",children:[Object(m.jsx)("button",{className:"popup__close-button",type:"button",onClick:a}),Object(m.jsxs)("figure",{className:"popup__figure",children:[Object(m.jsx)("img",{className:"popup__pic",src:t.src,alt:t.title}),Object(m.jsx)("figcaption",{className:"popup__figcaption",children:t.title})]})]})})};function D(e){var t=e.isOpen,n=e.onClose,a=e.noteType,c="\u0412\u044b \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u043b\u0438\u0441\u044c!",i="\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a! \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.";return Object(m.jsx)("div",{id:"infoTooltip",className:"popup ".concat(t?"popup_opened":""),role:"presentation",onClick:function(e){return e.target===e.currentTarget&&n()},children:Object(m.jsx)("div",{className:"popup__container popup__container_data",children:Object(m.jsxs)("div",{className:"popup__window",children:[Object(m.jsx)("button",{className:"popup__close-button",type:"button",name:"closePopup",onClick:n}),Object(m.jsx)("div",{className:"popup__toolTip-image ".concat(!a&&"popup__toolTip-image_fail")}),Object(m.jsx)("h2",{className:"popup__title popup__toolTip-title",children:a?c:i})]})})})}var U=function(){var e=Object(a.useState)(!1),t=Object(d.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(!1),o=Object(d.a)(i,2),r=o[0],u=o[1],f=Object(a.useState)(!1),_=Object(d.a)(f,2),k=_[0],N=_[1],T=Object(a.useState)(!1),U=Object(d.a)(T,2),F=U[0],R=U[1],q=Object(a.useState)(!1),z=Object(d.a)(q,2),J=z[0],B=z[1],M=Object(a.useState)(!1),H=Object(d.a)(M,2),W=H[0],G=H[1],K=Object(a.useState)(!1),Q=Object(d.a)(K,2),V=Q[0],X=Q[1],Y=Object(a.useState)({}),Z=Object(d.a)(Y,2),$=Z[0],ee=Z[1],te=Object(a.useState)({}),ne=Object(d.a)(te,2),ae=ne[0],ce=ne[1],ie=Object(a.useState)([]),oe=Object(d.a)(ie,2),re=oe[0],se=oe[1],ue=function(e){return console.error(e)},le=x(),pe=le.checkToken,de=le.signIn,je=le.signUp,be=Object(a.useState)(!1),he=Object(d.a)(be,2),me=he[0],Oe=he[1],fe=localStorage.getItem("token"),_e=Object(j.g)(),ve=function(){c(!1),u(!1),R(!1),B(!1),N(!1),G(!1)};Object(a.useEffect)((function(){null!==fe&&pe(fe).then((function(e){localStorage.setItem("_id",e.data._id),localStorage.setItem("email",e.data.email),Oe(!0),_e("/main")})).catch(ue),v.getInitData().then((function(e){var t=Object(d.a)(e,2),n=t[0],a=t[1];ce(n),se(a)})).catch(ue);var e=function(e){return"Escape"===e.key&&ve()};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[]);var xe=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.setUserInfo(t).then((function(e){ce(e),ve()})).catch(ue);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ge=function(){var e=Object(p.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.avatar,e.next=3,v.uploadAvatar(n).then((function(e){ce(e),ve()})).catch(ue);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ke=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.postCard(t).then((function(e){se([e].concat(Object(s.a)(re))),ve()})).catch(ue);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Ce=function(){var e=Object(p.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.removeCard($).then((function(){se((function(e){return e.filter((function(e){return e._id!==$._id}))})),ve()})).catch(ue);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ne=function(){var e=Object(p.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.password,a=t.email,e.next=3,de({password:n,email:a}).then((function(e){Oe(!0),localStorage.setItem("email",a),localStorage.setItem("token",e.token),_e("/main")})).catch((function(){Oe(!1),X(!1),G(!0)}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ye=function(){var e=Object(p.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.password,a=t.email,e.next=3,je({password:n,email:a}).then((function(){X(!0),G(!0),_e("/sign-in")})).catch((function(){Oe(!1),X(!1),G(!0)}));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(m.jsx)("div",{className:"body",children:Object(m.jsx)("div",{className:"page",children:Object(m.jsx)(b.Provider,{value:ae,children:Object(m.jsxs)(h.Provider,{value:me,children:[Object(m.jsx)(g,{onSignOut:function(){localStorage.removeItem("token"),localStorage.removeItem("email"),localStorage.removeItem("_id"),Oe(!1)}}),Object(m.jsxs)(j.d,{children:[Object(m.jsx)(j.b,{path:"/sign-in",element:Object(m.jsx)(y,{onLogin:Ne})}),Object(m.jsx)(j.b,{path:"/sign-up",element:Object(m.jsx)(S,{onSignUp:ye})}),Object(m.jsx)(j.b,{path:"/*",element:Object(m.jsx)(O,{children:Object(m.jsx)(C,{onEditProfile:function(){c(!0)},onAddPlace:function(){u(!0)},onEditAvatar:function(){R(!0)},onCardClick:function(e){ee(e),B(!0)},onCardLike:function(e,t){var n=function(t){se(re.map((function(n){return n._id===e._id?t:n})))};return t?v.removeLike(e).then(n).catch(ue):v.setLike(e).then(n).catch(ue)},onCardDelete:function(e){ee(e),N(!0)},cards:re})})})]}),Object(m.jsx)(w,{}),Object(m.jsx)(P,{isOpen:n,onUpdateUser:xe,onClose:ve}),Object(m.jsx)(L,{isOpen:F,onUpdateAvatar:ge,onClose:ve}),Object(m.jsx)(I,{isOpen:r,onAddPlace:ke,onClose:ve}),Object(m.jsx)(E,{isOpen:k,onCardDelete:Ce,onClose:ve}),Object(m.jsx)(A,{card:$,isOpen:J,onClose:ve}),Object(m.jsx)(D,{isOpen:W,onClose:ve,noteType:V})]})})})})},F=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,23)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),i(e),o(e)}))};o.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(r.a,{children:Object(m.jsx)(U,{})})}),document.getElementById("root")),F()}},[[22,1,2]]]);
//# sourceMappingURL=main.3c8c8deb.chunk.js.map