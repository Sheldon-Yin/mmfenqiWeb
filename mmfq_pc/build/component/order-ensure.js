"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),R_OrderEnsure=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,Object.getPrototypeOf(t).apply(this,arguments))}return _inherits(t,e),_createClass(t,[{key:"componentWillMount",value:function(){this.order=JSON.parse(window.localStorage.orderData),console.log(this.order)}},{key:"createOrderConfirm",value:function(){var e=this.order;$.ajax({type:"post",url:"/pc/computer/user_goods_confirm_order",data:e,dataType:"json",success:function(e){if(console.log(e),0==e.result){var t="?",r=e.data.goodsConfirmOrderResponse.order;console.log(JSON.stringify(e.data.goodsConfirmOrderResponse)),window.localStorage.midOrder=JSON.stringify(e.data.goodsConfirmOrderResponse);var n=e.data.goodsConfirmOrderResponse.userInfo;t=t+"orderId="+r.orderId+"&orderNo="+r.orderNo+"&orderName="+r.orderName+"&downpayAmount="+(r.downpayAmount+(e.data.goodsConfirmOrderResponse.isInsuranceBuy?parseInt(e.data.goodsConfirmOrderResponse.insuranceAmount):0))+"&creditPay="+e.data.goodsConfirmOrderResponse.creditPayment+"&telephone="+n.telephone+"&startPhone="+n.telephone.substring(0,3)+"****"+n.telephone.substring(7,11),window.location.href="my-order-detail.html"+t}else 1013==e.result?(window.location.href="login.html",window.localStorage.referer=window.location.href):alert(e.msg)}})}},{key:"render",value:function(){return React.createElement("div",{style:{flexGrow:"1",width:"100%",backgroundRepeat:"no-repeat",backgroundSize:"100% 100%",minHeight:780,display:"flex",flexDirection:"column",justifyContent:"center"}},React.createElement("div",{className:"wrap",style:{width:1e3}},React.createElement("div",{style:{backgroundColor:"#fff",height:650,width:998,border:"1px solid #e2e2e2"}},React.createElement("div",{style:{height:48,borderBottom:"1px solid #e2e2e2",backgroundColor:"#FCFCFC",textIndent:"24px",lineHeight:"48px",fontSize:"16px"}},"确认项目信息"),React.createElement("div",{style:{height:600,width:958,padding:20}},React.createElement("div",{style:{fontSize:"14px",fontWeight:"bolder",margin:"5px 0"}},"项目信息"),React.createElement("table",{className:"orderTable",style:{width:958,border:"1px solid #eee",textAlign:"center"}},React.createElement("tbody",null,React.createElement("tr",{style:{height:30}},React.createElement("th",null,"项目名称"),React.createElement("th",null,"价格"),React.createElement("th",null,"数量"),React.createElement("th",null,"总价")),React.createElement("tr",{style:{height:60}},React.createElement("td",null,this.order.orderName),React.createElement("td",null,0!=this.order.fenqiObj.shoufuId?100*this.order.fenqiObj.shoufu/this.order.fenqiObj.shoufuId:this.order.orderAmount),React.createElement("td",null,"1"),React.createElement("td",null,0!=this.order.fenqiObj.shoufuId?100*this.order.fenqiObj.shoufu/this.order.fenqiObj.shoufuId:this.order.orderAmount)))),this.order.isInsuranceBuy?React.createElement("div",null,React.createElement("div",{style:{backgroundColor:"#eee",height:1,width:958,margin:"20px 0"}}),React.createElement("div",{style:{fontSize:"14px",fontWeight:"bolder",margin:"5px 0"}},"保险"),React.createElement("div",null,this.order.insuranceAmount,"元")):"",React.createElement("div",{style:{backgroundColor:"#eee",height:1,width:958,margin:"20px 0"}}),React.createElement("div",{style:{fontSize:"14px",fontWeight:"bolder",margin:"5px 0"}},"分期方式"),React.createElement("div",null,React.createElement("table",{className:"orderTable",style:{width:958,textAlign:"center"}},React.createElement("tbody",null,React.createElement("tr",{style:{height:30}},React.createElement("th",null,"首付比例"),React.createElement("th",null,"首付金额(元)"),React.createElement("th",null,"信用支付(元)"),React.createElement("th",null,"分期数"),React.createElement("th",null,"月供(元)")),React.createElement("tr",{style:{height:100}},React.createElement("td",null,this.order.fenqiObj.shoufuId,"%"),React.createElement("td",null,this.order.fenqiObj.shoufu,"元"),React.createElement("td",{style:{color:"#25a9f4"}},"-",0!=this.order.fenqiObj.shoufuId?this.order.fenqiObj.shoufu*(100-this.order.fenqiObj.shoufuId)/this.order.fenqiObj.shoufuId:this.order.orderAmount),React.createElement("td",null,this.order.fenqiObj.paymentId,"月"),React.createElement("td",null,React.createElement("p",{style:{color:"#ff6678"}},this.order.fenqiObj.yuefu),React.createElement("p",{style:{color:"#999"}},"(包含服务费",this.order.fenqiObj.interest,"元/月)")))))),React.createElement("div",{style:{backgroundColor:"#eee",height:1,width:958,margin:"20px 0"}}),React.createElement("div",{style:{fontSize:"14px",fontWeight:"bolder",margin:"5px 0"}},"分期计算器"),React.createElement("div",{style:{textAlign:"right"}},React.createElement("div",null,"自付金额：",React.createElement("span",{style:{color:"#ff6678"}},this.order.fenqiObj.shoufu+parseFloat(this.order.isInsuranceBuy?this.order.insuranceAmount:0)),"元"),React.createElement("div",null,"信用支付金额：",React.createElement("span",{style:{color:"#25a9f4"}},"-",0!=this.order.fenqiObj.shoufuId?this.order.fenqiObj.shoufu*(100-this.order.fenqiObj.shoufuId)/this.order.fenqiObj.shoufuId:this.order.orderAmount),"元")))),React.createElement("div",{style:{float:"right"}},React.createElement("div",{onClick:this.createOrderConfirm.bind(this),style:{padding:10,backgroundColor:"#FD657A",color:"white",fontSize:"16px",width:"80px",margin:"15px 0",textAlign:"center"}},"确认支付"))))}}]),t}(React.Component);