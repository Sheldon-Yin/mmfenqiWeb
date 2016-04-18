
/*
javascript api

sendMessage(message, responseCallback);

messgae {
	'type':[intger value],
	'data': {}
}

type
	Share = 0,
	    data { 'description','title','url','imageUrl' }
    GoHome = 1,
    GoBack = 2,
    GoTo = 3,
        data { 'url', 'title' }
    Alipay = 4,
        data { 'notify_url', 'out_trade_no', 'subject', 'total_fee' }
    XinPay = 5,
        data { 'appid', 'partnerid', 'sign', 'timestamp', 'noncestr' }
    Login = 6

//example
*/
//
//document.addEventListener('WebViewJavascriptBridgeReady', fucnction(event){
//	var bridge = event.bridge;
//	bridge.init(function(message, responseCallback) {
//		responseCallback(data)
//	});
//    $('#share_button').on('click', function(){
//    	bridge.callHandler('sendMessage', {type: 0, data:{description:"", title:"", url:"", imageUrl:"" }}, function(response) {
//			//response data
//		});
//    })
//}, false);
//
