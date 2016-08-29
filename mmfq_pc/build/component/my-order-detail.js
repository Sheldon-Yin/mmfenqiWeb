"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),R_MyOrderDetail=function(e){function t(e){_classCallCheck(this,t);var a=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this,e));return a.state={isxingyong:!1,orderId:"",orderNo:"",downpayAmount:"",orderName:"",creditPay:"",url:"",smsCode:"",telephone:"",starPhone:"",disabled:!1,text:"获取验证码",timer:60},a}return _inherits(t,e),_createClass(t,[{key:"init",value:function(e){var t={timer:null,init:function(e){var t=this;this.setShowTime(e.endtime,e.done),this.timer=setInterval(function(){t.setShowTime(e.endtime,e.done,e.callback)},1e3)},getCountdown:function(e){var t=this.getSecond(e)-this.getSecond();if(t<0)return[0,"00","00","00"];var a=parseInt(t%60),n=parseInt(t/3600/24),r=parseInt(t/3600)-24*n,s=parseInt((t-3600*parseInt(t/3600))/60);return r=r>9?r:"0"+r,a=a>9?a:"0"+a,s=s>9?s:"0"+s,[n,r,s,a]},getSecond:function(e){if(e){var t=parseInt(e.slice(0,4)),a=parseInt(e.match(/-\d*/gi)[0].replace("-","")-1),n=parseInt(e.match(/-\d*/gi)[1].replace("-","")),r=parseInt(e.match(/\d*:/)[0].replace(":","")),s=parseInt(e.match(/:\d*/)[0].replace(":",""));return new Date(t,a,n,r,s,0).getTime()/1e3}return(new Date).getTime()/1e3},setShowTime:function(e,t,a){var n=this,r=this.getCountdown(e)[0],s=this.getCountdown(e)[1],i=this.getCountdown(e)[2],c=this.getCountdown(e)[3];t([r,s,i,c]),0==r&&"00"==s&&"00"==i&&"00"==c&&(clearInterval(n.timer),n.timer=null,a&&a())}};t.init({endtime:e,done:function(e){document.getElementById("time2").innerHTML=e[1]+"小时"+e[2]+"分"+e[3]+"秒"},callback:function(){}})}},{key:"timeStamp2String",value:function(e){var t=new Date;t.setTime(e);var a=t.getFullYear(),n=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,r=t.getDate()<10?"0"+t.getDate():t.getDate(),s=t.getHours()<10?"0"+t.getHours():t.getHours(),i=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),c=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds();return a+"-"+n+"-"+r+" "+s+":"+i+":"+c}},{key:"handleClick",value:function(e){if(!this.state.disabled){$.ajax({type:"post",url:"/pc/computer/user_getcode",dataType:"json",data:{smsFmtId:"payCredit",telephone:this.state.telephone||e},error:function(){},timeout:6e4,success:function(e){}}),this.setState({disabled:!0,text:"59s后重新获取",timer:59});var t=this,a=setInterval(function(){var e=t.state.timer-1;return e<=0?(t.setState({disabled:!1,text:"获取验证码",timer:60}),void clearInterval(a)):void t.setState({disabled:!0,text:e+"s后重新获取",timer:e})},1e3)}}},{key:"weixinMchPay",value:function(e,t){var a={downpayAmount:e,orderId:t,type:"0",payType:"1"};$.ajax({type:"post",url:"/pc/weixin/weixinMchPay",data:a,dataType:"json",success:function(e){"0"==e.result?this.setState({url:"/pc/weixin/getQRCode?codeUrl="+e.data.resPar.codeUrl}):alert(e.msg)}.bind(this)})}},{key:"alipayTrade",value:function(){var e=this.getUrl("downpayAmount"),t=this.getUrl("orderId");window.location.href="/pc/alipayWeb/alipayTrade?downpayAmount="+e+"&orderId="+t+"&type=0"}},{key:"getUrl",value:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(t);return a?decodeURIComponent(a[2]):null}},{key:"componentDidMount",value:function(){var e=new Date;e.setHours(e.getHours()+1);var t=this.timeStamp2String(e);this.init(t);var a=this.getUrl("orderId"),n=this.getUrl("orderNo"),r=this.getUrl("downpayAmount"),s=decodeURIComponent(this.getUrl("orderName")),i=this.getUrl("creditPay"),c=this.getUrl("telephone"),o=this.getUrl("startPhone");0==r?(this.setState({isxingyong:!0,orderId:a,orderNo:n,downpayAmount:r,orderName:s,creditPay:i,telephone:c,starPhone:o}),this.handleClick(c)):(this.setState({isxingyong:!1,orderId:a,orderNo:n,downpayAmount:r,orderName:s,creditPay:i,telephone:c,starPhone:o}),this.weixinMchPay(r,a));var l=this;setInterval(function(){l.check_order_pay_success(a)},1e3)}},{key:"handleChange",value:function(e){this.setState({smsCode:e.target.value})}},{key:"userOrder",value:function(e){$.ajax({type:"post",url:"/pc/computer/user_Order_Confirm_Pay",dataType:"json",data:{smsCode:this.state.smsCode,orderId:this.state.orderId},error:function(){},timeout:6e4,success:function(e){console.log(e),"0"==e.result?window.location.href="my-order.html":alert(e.msg)}})}},{key:"check_order_pay_success",value:function(e){$.ajax({type:"post",url:"/pc/computer/check_order_pay_success",data:{orderId:e},dataType:"json",success:function(t){console.log(t),"0"==t.result&&t.data.isPaySuccess&&(window.location.href="pay-success.html?orderId="+e)}})}},{key:"render",value:function(){return React.createElement("div",{className:"order-detail-main"},React.createElement("div",{className:"main"},React.createElement("div",{className:"order-content"},React.createElement("div",{className:"o-t"},"订单详情"),React.createElement("div",{className:"o-info"},React.createElement("div",null,"商品名称:",this.state.orderName),React.createElement("div",null,"订单号:",this.state.orderNo),React.createElement("div",{className:"info-pay"},React.createElement("div",{className:"left"},React.createElement("div",null," "),React.createElement("div",null,"请在",React.createElement("span",{style:{color:"#fd657a",fontSize:"20px"}},React.createElement("span",{id:"time2"}))," 完成支付 ",React.createElement("span",{style:{color:"#c6c6c6"}},"(逾期将会取消订单)"))),React.createElement("div",{className:"right"},React.createElement("div",null,"本次自付金额:",React.createElement("span",{style:{color:"#fd657a",fontSize:"20px"}},this.state.downpayAmount),"元"),React.createElement("div",null,"本次信用支付: ",React.createElement("span",{style:{color:"#25a9f4",fontSize:"20px"}},this.state.creditPay),"元")))),React.createElement("div",{className:"_sub",style:{display:this.state.isxingyong?"none":"block"}},React.createElement("div",{className:"pay-method"},"选择支付方式"),React.createElement("div",{className:"pay-content"},React.createElement("div",{className:"weChatPay"},React.createElement("div",{className:"good"},React.createElement("img",{src:"../static/images/my-pay/my-pay.png",alt:""})),React.createElement("div",{className:"we-title"},React.createElement("div",null,React.createElement("img",{src:"../static/images/my-pay/pay2.png",alt:""}))),React.createElement("div",{className:"weixinma"},React.createElement("div",null,React.createElement("img",{src:this.state.url,style:{width:"100%",height:"100%"}})),React.createElement("p",null,"请使用微信扫描下方的二维码完成支付"))),React.createElement("div",{className:"alipay"},React.createElement("div",{style:{paddingLeft:"40px",width:"778px"}},React.createElement("img",{src:"../static/images/my-pay/pay1.png",alt:""})),React.createElement("div",{className:"_btn btn_btn",onClick:this.alipayTrade.bind(this),style:{padding:"7px",borderRadius:"0"}},"去支付")))),React.createElement("div",{className:"_sub",style:{display:this.state.isxingyong?"block":"none"}},React.createElement("div",{className:"pay-method"},"选择支付方式"),React.createElement("div",{className:"pay-content"},React.createElement("div",{className:"xinyong-pay"},React.createElement("div",{className:"note"},"短信验证码已发送到您的手机"),React.createElement("div",{className:"phone"},this.state.starPhone),React.createElement("div",{className:"yzm"},React.createElement("div",null,React.createElement("input",{type:"text",value:this.state.smsCode,onChange:this.handleChange.bind(this),placeholder:"请输入短信验证码"})),React.createElement("div",{ref:"info",onClick:this.handleClick.bind(this),disabled:this.state.disabled},this.state.text)),React.createElement("div",null,React.createElement("div",{className:"_btn btn_btn",onClick:this.userOrder.bind(this),style:{borderRadius:"0",padding:"8px 0",fontSize:"14px",width:"210px"}},"确定并信用支付"))))),React.createElement("div",{className:"knowing-agreeing"},React.createElement("img",{src:"../static/images/kown.png",alt:""}),React.createElement("div",null,"确认支付即表示您已阅读并同意 ",React.createElement("a",{href:"../static/pdf/stagingServiceContact.pdf",target:"_blank"},"《分期服务协议》"),"、",React.createElement("a",{href:"../static/pdf/loanContact.pdf",target:"_blank"},"《借款协议》"),"、",React.createElement("a",{href:"../static/pdf/insuranceContact.pdf",target:"_blank"},"《医疗意外保险》"))))))}}]),t}(React.Component);