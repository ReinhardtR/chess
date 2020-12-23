(this.webpackJsonpchess=this.webpackJsonpchess||[]).push([[0],{109:function(e,t,n){},110:function(e,t,n){"use strict";n.r(t);var r=n(0),l=n(1),a=n.n(l),c=n(50),s=n.n(c),o=n(5),i=n(51),u=n(52),d=n(58),m=n(57),b=n(53).io.connect("http://localhost:4000",{transports:["websocket"]}),h=Object(l.createContext)(),j=n(54),f=n.n(j),p=n(55),v=n.n(p);n(108);function x(){return(x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function O(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var g=l.createElement("g",null,l.createElement("path",{d:"M121.325,10.925l-8.5-8.399c-2.3-2.3-6.1-2.3-8.5,0l-42.4,42.399L18.726,1.726c-2.301-2.301-6.101-2.301-8.5,0l-8.5,8.5 c-2.301,2.3-2.301,6.1,0,8.5l43.1,43.1l-42.3,42.5c-2.3,2.3-2.3,6.1,0,8.5l8.5,8.5c2.3,2.3,6.1,2.3,8.5,0l42.399-42.4l42.4,42.4 c2.3,2.3,6.1,2.3,8.5,0l8.5-8.5c2.3-2.3,2.3-6.1,0-8.5l-42.5-42.4l42.4-42.399C123.625,17.125,123.625,13.325,121.325,10.925z"})),y=l.createElement("g",null),w=l.createElement("g",null),E=l.createElement("g",null),N=l.createElement("g",null),k=l.createElement("g",null),C=l.createElement("g",null),S=l.createElement("g",null),M=l.createElement("g",null),I=l.createElement("g",null),R=l.createElement("g",null),T=l.createElement("g",null),P=l.createElement("g",null),L=l.createElement("g",null),z=l.createElement("g",null),A=l.createElement("g",null);function B(e,t){var n=e.title,r=e.titleId,a=O(e,["title","titleId"]);return l.createElement("svg",x({id:"Capa_1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",width:"123.05px",height:"123.05px",viewBox:"0 0 123.05 123.05",style:{enableBackground:"new 0 0 123.05 123.05"},xmlSpace:"preserve",ref:t,"aria-labelledby":r},a),n?l.createElement("title",{id:r},n):null,g,y,w,E,N,k,C,S,M,I,R,T,P,L,z,A)}var V=l.forwardRef(B);n.p;function q(e){var t=e.errorStyle,n=e.title,l=e.handleClick,a=e.children;return e.visible&&Object(r.jsx)("div",{className:"fixed z-50 inset-0 overflow-y-auto",children:Object(r.jsxs)("div",{className:"flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0",children:[Object(r.jsx)("div",{className:"fixed inset-0 transition-opacity","aria-hidden":"true",children:Object(r.jsx)("div",{className:"absolute inset-0 bg-gray-500 opacity-75",onClick:l})}),Object(r.jsx)("span",{className:"hidden sm:inline-block sm:align-middle sm:h-screen","aria-hidden":"true",children:"\u200b"}),Object(r.jsxs)("div",{className:"".concat(t?"border-tertiary":"border-primary"," inline-block bg-white border-2 rounded-lg shadow-xl transform transition-all sm:my-8 sm:align-middle w-auto p-4"),children:[Object(r.jsxs)("span",{className:"flex absolute h-4 w-4 top-0 right-0 -mt-1 -mr-1",children:[Object(r.jsx)("span",{className:"".concat(t?"bg-tertiary":"bg-primary-gradient"," animate-ping absolute inline-flex h-full w-full rounded-full opacity-75")}),Object(r.jsx)("span",{className:"".concat(t?"bg-tertiary":"bg-primary-gradient"," relative inline-flex rounded-full h-4 w-4")})]}),Object(r.jsxs)("div",{className:"text-left flex justify-center items-center",children:[l&&Object(r.jsx)(V,{onClick:l,className:"text-neutral hover:text-secondary cursor-pointer absolute right-4 top-4 w-4 h-4 fill-current"}),Object(r.jsxs)("div",{className:"text-secondary text-3xl font-bold my-1",children:[Object(r.jsx)("div",{className:"pr-8",children:n}),a]})]})]})]})})}var D=function(e){Object(d.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(i.a)(this,n),(e=t.call(this)).onMove=function(t,n){for(var r=e.chess.moves({verbose:!0}),l=0,a=r.length;l<a;l++)-1!==r[l].flags.indexOf("p")&&r[l].from===t&&e.setState({pendingMove:[t,n],selectVisible:!0});e.chess.move({from:t,to:n,promotion:"x"})&&e.setState({fen:e.chess.fen(),lastMove:{from:t,to:n}},(function(){e.changeTurn(),e.props.room&&e.sendMoveToServer()}))},e.promotion=function(t){var n={from:e.state.pendingMove[0],to:e.state.pendingMove[1],promotion:t};e.chess.move(n),e.setState({fen:e.chess.fen(),lastMove:n,selectVisible:!1},(function(){e.changeTurn(),e.props.room&&e.sendMoveToServer()}))},e.calcMovable=function(){var t=new Map;return e.chess.SQUARES.forEach((function(n){var r=e.chess.moves({square:n,verbose:!0});r.length&&t.set(n,r.map((function(e){return e.to})))})),{free:!1,dests:t,color:e.props.room?e.props.playerColor:e.state.turn}},e.chess=new f.a,e.state={turn:"white",lastMove:void 0,pendingMove:void 0,fen:"start",selectVisible:!1},e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.context.on("move",(function(t){var n=t.move;e.chess.move(n),e.setState({turn:e.props.playerColor,lastMove:n,fen:e.chess.fen()})}))}},{key:"sendMoveToServer",value:function(){var e=this;this.context.emit("move",{room:this.props.room,move:this.state.lastMove},(function(){return e.changeTurn()}))}},{key:"changeTurn",value:function(){var e=this.props.room?this.props.playerColor:this.state.turn;this.setState({turn:"white"===e?"black":"white"})}},{key:"render",value:function(){var e=this;return Object(r.jsxs)("div",{className:"bg-white flex justify-center items-center",children:[Object(r.jsx)(v.a,{width:"100vmin",height:"100vmin",turnColor:this.state.turn,movable:this.calcMovable(),lastMove:this.lastMove,fen:this.state.fen,onMove:this.onMove,orientation:this.props.playerColor}),Object(r.jsx)(q,{visible:this.state.selectVisible,children:["q","r","b","n"].map((function(t){return Object(r.jsx)("div",{className:"group flex justify-center items-center w-24 h-24 transition-all rounded-full transform hover:bg-blue-500 hover:scale-110 text-center",children:Object(r.jsx)("div",{onClick:function(){return e.promotion(t)},className:"piece ".concat(e.state.turn,"-").concat(t," w-5/6 h-5/6 transition-all transform group-hover:-translate-y-1")})},t)}))})]})}}]),n}(a.a.Component);D.contextType=h;var J=n(4),U=n(11);function X(){return(X=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function _(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var F=l.createElement("path",{d:"M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-10 0v-4c0-2.206 1.794-4 4-4s4 1.794 4 4v4h-8z"});function G(e,t){var n=e.title,r=e.titleId,a=_(e,["title","titleId"]);return l.createElement("svg",X({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",preserveAspectRatio:"none",ref:t,"aria-labelledby":r},a),n?l.createElement("title",{id:r},n):null,F)}var Q=l.forwardRef(G);n.p;function W(e){var t=e.handleClick,n=e.children,a=Object(U.a)(e,["handleClick","children"]),c=Object(l.useContext)(h),s=Object(l.useState)([]),i=Object(o.a)(s,2),u=i[0],d=i[1];return Object(l.useEffect)((function(){c.emit("req-server-rooms")}),[c]),c.on("get-server-rooms",(function(e){d(e)})),console.log(u),Object(r.jsxs)("div",Object(J.a)(Object(J.a)({},a),{},{className:"flex flex-col w-auto h-4/5",children:[Object(r.jsx)("div",{className:"-my-2 overflow-x-auto py-2 align-middle inline-block min-w-full",children:Object(r.jsx)("div",{className:"shadow overflow-hidden border-b border-gray-200 rounded-lg",children:Object(r.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[Object(r.jsx)("thead",{className:"bg-gray-50",children:Object(r.jsxs)("tr",{className:"text-secondary text-xs font-medium text-left tracking-wider",children:[Object(r.jsx)("th",{scope:"col",className:"p-1"}),Object(r.jsx)("th",{scope:"col",className:"pr-6 py-3",children:"ROOM NAME"}),Object(r.jsx)("th",{scope:"col",className:"px-6 py-3",children:"PLAYERS"})]})}),Object(r.jsx)("tbody",{className:"bg-white divide-y divide-gray-200 px-4",children:u.length?u.map((function(e){return Object(r.jsx)(W.Item,{roomName:e.name,creator:e.creator,player:e.player,password:e.password,status:"Waiting for players",handleClick:function(){return t(e)}},e.creator)})):Object(r.jsx)("tr",{children:Object(r.jsxs)("td",{colspan:"3",className:"text-center font-medium",children:[Object(r.jsx)("div",{className:"text-tertiary m-2",children:"No rooms."}),Object(r.jsx)("div",{className:"text-secondary m-2",children:"Create a room to play online."})]})})})]})})}),n]}))}function Y(e){var t=e.extraClass,n=void 0===t?"bg-primary-gradient":t,l=e.handleClick,a=e.children,c=Object(U.a)(e,["extraClass","handleClick","children"]);return Object(r.jsx)("button",Object(J.a)(Object(J.a)({onClick:l},c),{},{className:"".concat(n," text-white font-medium rounded-full w-auto cursor-pointer p-4 transform transition hover:scale-110 focus:outline-none focus:ring focus:ring-secondary shadow-2xl"),children:a}))}function H(e){var t=e.handleSubmit,n=e.children;return Object(r.jsx)("div",{className:"block text-sm font-medium text-secondary w-96",children:Object(r.jsx)("form",{onSubmit:function(e){e.preventDefault(),t()},className:"flex flex-col space-y-4",children:n})})}function K(e){var t=e.handleSubmit,n=Object(l.useState)(""),a=Object(o.a)(n,2),c=a[0],s=a[1],i=Object(l.useState)(""),u=Object(o.a)(i,2),d=u[0],m=u[1];return Object(r.jsxs)(H,{handleSubmit:function(){return t(c,d)},children:[Object(r.jsx)(H.TextInput,{label:"Room Name",placeholder:"Name of the room",value:c,required:!0,onChange:function(e){var t=e.target;return s(t.value)}}),Object(r.jsx)(H.TextInput,{label:"Room Password",placeholder:"Public room if empty",value:d,onChange:function(e){var t=e.target;return m(t.value)}}),Object(r.jsx)(H.Submit,{value:"CREATE ROOM"})]})}function Z(){return(Z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function $(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}W.Item=function(e){var t=e.handleClick,n=e.roomName,l=e.creator,a=e.player,c=e.password;return Object(r.jsxs)("tr",{onClick:t,className:"cursor-pointer h-16",children:[Object(r.jsx)("td",{className:"px-2",children:c&&Object(r.jsx)(Q,{className:"text-tertiary block w-6 h-6 fill-current"})}),Object(r.jsx)("td",{className:"py-2 whitespace-nowrap",children:Object(r.jsx)("div",{className:"flex items-center ml-1 text-sm font-medium text-secondary",children:n})}),Object(r.jsxs)("td",{className:"px-6 py-2 whitespace-nowrap text-sm",children:[Object(r.jsx)("div",{children:l}),Object(r.jsx)("div",{children:a})]})]})},H.TextInput=function(e){var t=e.label,n=Object(U.a)(e,["label"]);return Object(r.jsxs)("div",{className:"mt-1 relative rounded-md shadow-sm flex flex-col space-y-0.5",children:[Object(r.jsx)("label",{className:"text-xl",children:t}),Object(r.jsx)("input",Object(J.a)(Object(J.a)({},n),{},{maxLength:"20",className:"text-xl focus:outline-none focus:ring-2 focus:ring-primary border border-neutral rounded-lg p-1 pl-2.5"}))]})},H.Submit=function(e){var t=e.value;return Object(r.jsx)("input",{type:"submit",value:t,className:"bg-primary-gradient text-white font-bold rounded-full w-auto self-end cursor-pointer p-4 transform transition hover:scale-110 focus:outline-none focus:ring focus:ring-secondary"})};var ee=l.createElement("g",null,l.createElement("g",null,l.createElement("path",{d:"M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12 c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028 c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265 c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z"}))),te=l.createElement("g",null),ne=l.createElement("g",null),re=l.createElement("g",null),le=l.createElement("g",null),ae=l.createElement("g",null),ce=l.createElement("g",null),se=l.createElement("g",null),oe=l.createElement("g",null),ie=l.createElement("g",null),ue=l.createElement("g",null),de=l.createElement("g",null),me=l.createElement("g",null),be=l.createElement("g",null),he=l.createElement("g",null),je=l.createElement("g",null);function fe(e,t){var n=e.title,r=e.titleId,a=$(e,["title","titleId"]);return l.createElement("svg",Z({id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",viewBox:"0 0 492.004 492.004",style:{enableBackground:"new 0 0 492.004 492.004"},xmlSpace:"preserve",ref:t,"aria-labelledby":r},a),n?l.createElement("title",{id:r},n):null,ee,te,ne,re,le,ae,ce,se,oe,ie,ue,de,me,be,he,je)}var pe=l.forwardRef(fe);n.p;function ve(){var e=Object(l.useContext)(h),t=Object(l.useState)("Guest"),n=Object(o.a)(t,2),a=n[0],c=n[1],s=Object(l.useState)(),i=Object(o.a)(s,2),u=i[0],d=i[1],m=Object(l.useState)("white"),b=Object(o.a)(m,2),j=b[0],f=b[1],p=Object(l.useState)(!0),v=Object(o.a)(p,2),x=v[0],O=v[1],g=Object(l.useState)(!1),y=Object(o.a)(g,2),w=y[0],E=y[1],N=Object(l.useState)(!1),k=Object(o.a)(N,2),C=k[0],S=k[1];return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("div",{className:"relative h-screen w-screen overflow-hidden bg-secondary",children:[Object(r.jsxs)("div",{className:"absolute flex inset-y-0 left-0 z-10  h-screen ".concat(x?"animate-slide-in":"animate-slide-out"),children:[Object(r.jsxs)("div",{className:"relative flex flex-col justify-between items-center bg-white p-4 shadow-2xl space-y-2",children:[Object(r.jsx)(H.TextInput,{label:"Username",value:a,onChange:function(e){var t=e.target;return c(t.value)}}),Object(r.jsx)("span",{className:"text-xl self-start text-secondary pt-4",children:"Rooms"}),Object(r.jsx)(W,{handleClick:function(t){return function(t){t.player?S(!0):(e.emit("join-room",{username:a,id:t.id}),d(t),f("black"))}(t)}}),Object(r.jsx)(Y,{extraClass:u?"bg-tertiary":"bg-primary-gradient",handleClick:function(){return u?(e.emit("leave-room",u),void d()):E(!0)},children:u?"LEAVE ROOM":"CREATE ROOM"})]}),Object(r.jsx)("div",{className:"relative m-2",children:Object(r.jsx)(Y,{extraClass:"bg-secondary",handleClick:function(){return O(!x)},children:Object(r.jsx)(pe,{className:"w-4 h-4 fill-current animate-rotate-".concat(x)})})})]}),Object(r.jsx)("div",{className:"absolute inset-y-0 right-0 z-0",children:Object(r.jsx)("div",{className:"flex justify-center items-center w-screen h-screen",children:Object(r.jsx)(D,{room:u,playerColor:j},u)})})]}),Object(r.jsx)(q,{visible:w||C,errorStyle:C,title:C?"Room is full":"Create a room",handleClick:function(){return w?E(!1):S(!1)},children:w&&Object(r.jsx)(K,{handleSubmit:function(t,n){!function(t){var n=t.name,r=t.password,l={id:e.id,name:n,password:r,creator:a};e.emit("create-room",l),E(!1),d(l)}({name:t,password:n})}})})]})}n(109);s.a.render(Object(r.jsx)(h.Provider,{value:b,children:Object(r.jsx)(ve,{})}),document.getElementById("root"))}},[[110,1,2]]]);
//# sourceMappingURL=main.e5591f6b.chunk.js.map