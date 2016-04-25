/**
 * Created by sheldon on 2016/4/14.
 */

var myBridge;

document.addEventListener('WebViewJavascriptBridgeReady', function (event) {
    var bridge = event.bridge;
    bridge.init(function (message, responseCallback) {
        responseCallback(data)
    });
    myBridge = bridge;
}, false);