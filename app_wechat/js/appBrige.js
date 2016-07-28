/**
 * Created by sheldon on 2016/4/14.
 */


var url = window.location.href;
var targetUrl = url.split('#')[0];
console.log(targetUrl);
var timeStamp = new Date();
function initWx() {
    var req = new XMLHttpRequest();
    if (req) {
        req.open("GET", "/weixin/getJsSDKConfig?targetUrl=" + targetUrl + '&timeStamp=' + timeStamp, true);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var resText = req.responseText;
                    var res = JSON.parse(resText);
                    console.log(res);
                    if (res.result == 0) {
                        wx.config({
                            debug: false,
                            appId: res.data.jsSDKConfig.appId,
                            timestamp: res.data.jsSDKConfig.timestamp,
                            nonceStr: res.data.jsSDKConfig.nonceStr,
                            signature: res.data.jsSDKConfig.signature,
                            jsApiList: [
                                'chooseImage',
                                'uploadImage',
                                'chooseWXPay',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage'
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(function () {
                            console.log('ready')
                        });
                        wx.error(function (res) {
                            alert(res.errMsg);
                        });
                    } else {
                        console.log(res);
                        setTimeout(function () {
                            initWx();
                        }, 3000)
                    }
                } else {
                    //Toast('获取微信配置失败');
                    setTimeout(function () {
                        initWx();
                    }, 3000)
                }
            }
        };
        req.send(null);
    }
}
setTimeout(function () {
    initWx();
}, 500);