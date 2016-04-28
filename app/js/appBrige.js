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

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
setupWebViewJavascriptBridge(function(bridge) {
    myBridge = bridge;
});