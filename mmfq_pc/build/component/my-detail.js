"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var l=t[a];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,a,l){return a&&e(t.prototype,a),l&&e(t,l),t}}(),R_MyDetail=function(e){function t(){_classCallCheck(this,t);var e=_possibleConstructorReturn(this,Object.getPrototypeOf(t).call(this));return e.state={data:[],orderDetailResponse:[],pic_img:[],combination:[]},e}return _inherits(t,e),_createClass(t,[{key:"getDetail",value:function(e){var t=this,a={orderId:e};$.ajax({type:"post",url:"/pc/computer/query_order_detail",data:a,dataType:"json",success:function(e){console.log(e),t.setState({data:e,orderDetailResponse:e.data.orderDetailResponse,combination:e.data.orderDetailResponse.combination})}})}},{key:"getType",value:function(e){switch(e){case"1":return"待支付";case"2":return"已支付";case"3":return"已完成";case"4":return"已取消";case"5":return"退款审核中";case"6":return"退款成功"}}},{key:"componentDidMount",value:function(){var e=this.getUrl("id");this.look_informed_consent(e),this.getDetail(e)}},{key:"getUrl",value:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(t);return null!=a?unescape(a[2]):null}},{key:"doUpload",value:function(){var e=new FormData($("#uploadForm")[0]),t={informedConsentPic:e};$.ajax({url:"/pc/computer/upload_informed_consent",type:"POST",data:t,async:!1,success:function(e){alert(e)},error:function(e){alert(e)}})}},{key:"toPay",value:function(e){$.ajax({url:"/pc/computer/to_pay_order",type:"post",data:{orderId:e},dataType:"json",success:function(e){"0"==e.result&&(console.log(e),window.open("my-order-detail.html?orderId="+e.data.orderInfo.orderId+"&orderNo="+e.data.orderInfo.orderNo+"&orderName="+e.data.orderInfo.orderName+"&downpayAmount="+e.data.orderInfo.downpayAmount+"&creditPay="+e.data.orderInfo.creditPay+"&telephone="+e.data.orderInfo.telephone+"&starPhone="+e.data.orderInfo.starPhone))}.bind(this)})}},{key:"_uploadBtn",value:function(){}},{key:"look_informed_consent",value:function(e){var t={orderId:e};$.ajax({url:"/pc/computer/query_informed_consent",type:"post",data:t,dataType:"json",success:function(e){"0"==e.result&&this.setState({pic_img:e.data.informedConsent})}.bind(this)})}},{key:"render",value:function(){var e=this.state.orderDetailResponse;console.log(e);var t="";return this.state.combination&&(t=this.state.combination.map(function(e,t){return React.createElement("div",{key:t},React.createElement("span",null,"类型:",e.combinationName),"     ",React.createElement("span",null,"属性:",e.combinationValue))})),console.log(this.state.combination),React.createElement("div",{style:{float:"left"}},React.createElement("div",{className:"wrap-content"},React.createElement("div",{className:"wrap-content-right"},React.createElement("div",null,React.createElement("div",{className:"top"},React.createElement("ul",null,React.createElement("li",null,"订单详情"))),React.createElement("div",{className:"top-content"},React.createElement("div",{className:"order-info"},"订单信息"),React.createElement("div",{className:"order-info-content",style:{display:"3"==e.orderStatus?"block":"none"}},React.createElement("div",{className:"left"},React.createElement("div",{style:{paddingTop:"0"}},React.createElement("ul",{style:{padding:"0",margin:"0"}},React.createElement("li",null,"订单状态:",React.createElement("span",{style:{color:"#3399eb"}},this.getType(e.orderStatus))),React.createElement("li",null,"订单号:",React.createElement("span",null,e.orderNo)),React.createElement("li",null,"下单时间:",React.createElement("span",null,e.createTime)))),React.createElement("div",{className:"two"},"1.你还可以购买该项目",React.createElement("div",{className:"_btn btn_btn",style:{marginLeft:"10px"}},React.createElement("a",{href:"goods-detail.html?goodsId="+e.goodsId,target:"_blank"},"去购买"))))),React.createElement("div",{className:"order-info-content",style:{display:"4"==e.orderStatus?"block":"none"}},React.createElement("div",{className:"left"},React.createElement("div",{style:{paddingTop:"0"}},React.createElement("ul",{style:{padding:"0",margin:"0"}},React.createElement("li",null,"订单状态:",React.createElement("span",{style:{color:"#ff802c"}},this.getType(e.orderStatus))),React.createElement("li",null,"订单号: ",React.createElement("span",null,e.orderNo)),React.createElement("li",null,"下单时间:",React.createElement("span",null,e.createTime)))),React.createElement("div",{className:"one"},"1.你已取消该订单，如有什么疑问，请致电美眉分期电话：400-2635-599"))),React.createElement("div",{className:"order-info-content",style:{display:"2"==e.orderStatus?"block":"none"}},React.createElement("div",{className:"left"},React.createElement("div",{style:{paddingTop:"0"}},React.createElement("ul",{style:{padding:"0",margin:"0"}},React.createElement("li",null,"订单状态:",React.createElement("span",{style:{color:"#3399eb"}},this.getType(e.orderStatus))),React.createElement("li",null,"订单号:",React.createElement("span",null,e.orderNo)),React.createElement("li",null,"下单时间:",React.createElement("span",null,e.createTime)))),React.createElement("div",{className:"one"},"1.您已成功支付该订单，扫描美眉分期公众号或者下载美眉分期APP ",React.createElement("br",null),"2.到医院签署知情同意书，并通过公众号或者APP上传 ",React.createElement("br",null),"3.如有疑问请致电：400-711-8898 ",React.createElement("br",null),"4.为防止医院价格变动，请在一周之内尽快去消费该项目 ",React.createElement("br",null)),React.createElement("div",{style:{padding:"10px 0"}},"查看该医院: ",React.createElement("span",null,e.hospital)),React.createElement(R_Upload,{projectReviewStatus:e.projectReviewStatus,orderId:e.orderId}),React.createElement("div",{className:"",style:{display:1==e.projectReviewStatus?"inline":"none"}},React.createElement("div",null,"审核状态:待审核"),React.createElement("div",null,this.state.pic_img.map(function(e){return React.createElement("img",{src:e,alt:"",style:{width:"150px",height:"160px",margin:"5px"}})}))),React.createElement("div",{className:"",style:{display:3==e.projectReviewStatus?"inline":"none"}},React.createElement("div",null,"知情同意书审核不通过")),React.createElement("div",{className:"",style:{display:2==e.projectReviewStatus?"inline":"none"}},React.createElement("div",null,"审核状态:审核通过"),React.createElement("div",null,this.state.pic_img.map(function(e){return React.createElement("img",{src:e,alt:"",style:{width:"150px",height:"160px"}})})))),React.createElement("div",{className:"right"},React.createElement("div",null,React.createElement("img",{src:"../static/images/app.jpg",alt:""})))),React.createElement("div",{className:"order-info-content",style:{display:"1"==e.orderStatus?"block":"none"}},React.createElement("div",{className:"left"},React.createElement("div",{style:{paddingTop:"0"}},React.createElement("ul",{style:{padding:"0",margin:"0"}},React.createElement("li",null,"订单状态:",React.createElement("span",{style:{color:"#3399eb"}},this.getType(e.orderStatus))),React.createElement("li",null,"订单号:",React.createElement("span",null,e.orderNo)),React.createElement("li",null,"下单时间:",React.createElement("span",null,e.createTime)))),React.createElement("div",{style:{padding:"10px 0"}},"请在1小时内完成支付，否则该订单将会取消"),React.createElement("div",{className:"_btn btn_btn",onClick:this.toPay.bind(this,e.orderId)},"去支付"))),React.createElement("div",{className:"order-info-content",style:{display:"6"==e.orderStatus?"block":"none"}},React.createElement("div",{className:"left"},React.createElement("div",{style:{paddingTop:"0"}},React.createElement("ul",{style:{padding:"0",margin:"0"}},React.createElement("li",null,"订单状态: ",React.createElement("span",{style:{color:"#2ca8fe"}},this.getType(e.orderStatus))),React.createElement("li",null,"订单号: ",React.createElement("span",null,e.orderNo)),React.createElement("li",null,"下单时间: ",React.createElement("span",null,e.createTime)))),React.createElement("div",{style:{padding:"10px 0"}},"1.该订单已经进入退款流程，退款金额：",e.downpay_amount,"，信用额度：",e.credit_payment," ",React.createElement("br",null),"2.如有支付保险费用，则不能退还，如有疑问请致电：400-2635-599"))),React.createElement("div",{className:"order-info-content",style:{display:"5"==e.orderStatus?"block":"none"}},React.createElement("div",{className:"left"},React.createElement("div",{style:{paddingTop:"0"}},React.createElement("ul",{style:{padding:"0",margin:"0"}},React.createElement("li",null,"订单状态: ",React.createElement("span",{style:{color:"#2ca8fe"}},this.getType(e.orderStatus))),React.createElement("li",null,"订单号: ",React.createElement("span",null,e.orderNo)),React.createElement("li",null,"下单时间: ",React.createElement("span",null,e.createTime)))),React.createElement("div",{style:{padding:"10px 0"}},"1.退款金额：",e.downpay_amount,"，信用额度：",e.credit_payment))),React.createElement("div",{className:"project-info"},"项目信息"),React.createElement("div",null,React.createElement("table",{cellSpacing:"0",cellPadding:"0",width:"100%"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{style:{width:350}},"项目名称"),React.createElement("th",{style:{width:230}},"所属医院"),React.createElement("th",{style:{width:150}},"规格"),React.createElement("th",{style:{width:185}},"项目价格(元)"))),React.createElement("tbody",null,React.createElement("tr",{className:"bg_bd"},React.createElement("td",null,React.createElement("div",{className:"goods-info"},React.createElement("div",{className:"goods-info-left"},React.createElement("img",{src:e.goodsPic,width:"100%",height:"100%"})),React.createElement("div",{className:"goods-info-right"},React.createElement("li",null,e.goodsName)))),React.createElement("td",null,React.createElement("li",{style:{color:"#999999"}},e.hospital)),React.createElement("td",null,React.createElement("li",{style:{color:"#999999"}},t)),React.createElement("td",null,React.createElement("li",{style:{color:"#fc657a",fontSize:"20px"}},e.orderPrice)))))),React.createElement("div",{className:"information"},"分期信息"),React.createElement("div",null,React.createElement("table",{cellSpacing:"0",cellPadding:"0"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{className:"width-20"},"首付比例"),React.createElement("th",{className:"width-20"},"首付金额"),React.createElement("th",{className:"width-20"},"信用支付"),React.createElement("th",{className:"width-20"},"分期数"),React.createElement("th",{className:"width-20"},"月供"))),React.createElement("tbody",null,React.createElement("tr",{className:"bg_bd"},React.createElement("td",null,React.createElement("li",null,e.downpayPercentage)),React.createElement("td",null,React.createElement("li",null,e.downpay_amount)),React.createElement("td",null,React.createElement("li",null,e.credit_payment)),React.createElement("td",null,React.createElement("li",null,e.stating)),React.createElement("td",null,React.createElement("li",{style:{color:"#fc657a",fontSize:"20px"}},e.monthPay),React.createElement("li",{style:{color:"#999999"}},"(每月包含服务费",e.monthServicePay,"元)")))))),React.createElement("div",{className:"information"},"保险 ",React.createElement("span",{style:{color:"#FF647a"}},"(貌美如花意外险)")),React.createElement("div",null,React.createElement("table",{cellSpacing:"0",cellPadding:"0"},React.createElement("thead",null,React.createElement("tr",null,React.createElement("th",{className:"width-20"},"被保险人"),React.createElement("th",{className:"width-20"},"身份证"),React.createElement("th",{className:"width-20"},"保费(元)"),React.createElement("th",{className:"width-20"},"保单号"),React.createElement("th",{className:"width-20"},"保险时间"))),React.createElement("tbody",null,React.createElement("tr",{className:"bg_bd"},React.createElement("td",null,React.createElement("li",null,e.insuredName)),React.createElement("td",null,React.createElement("li",null,e.insuredIdentitycode)),React.createElement("td",null,React.createElement("li",null,e.insuranceOrderAmount)),React.createElement("td",null,React.createElement("li",null,e.insuranceNumber)),React.createElement("td",null,React.createElement("li",null,e.insuranceBeginDate)))))))))))}}]),t}(React.Component);