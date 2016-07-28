/**
 * Created by sheldon on 2016/5/24.
 */
define(function (require, exports, module) {
    'use strict';
    console.log('service');
    module.exports = function (app) {
        app.register.factory('WeChat', ['$resource',
            function ($resource) {
                return $resource('/weixin/getJsSDKConfig', {}, {
                    query: {
                        method: 'GET', params: {}
                    }
                });
            }]);
        app.register.factory('WeChatTitle',
            function () {
                return function (title) {
                    var body = document.getElementsByTagName('body')[0];
                    document.title = title;
                    var iframe = document.createElement("iframe");
                    iframe.style.display = 'none';
                    iframe.setAttribute("src", "img/empty.png");

                    iframe.addEventListener('load', function () {
                        setTimeout(function () {
                            iframe.removeEventListener('load', function () {
                                console.log('removed')
                            });
                            document.body.removeChild(iframe);
                        }, 0);
                    });
                    document.body.appendChild(iframe);
                }
            });
        app.register.factory('Bridge', ['$resource', '$location',
            function ($resource, $location) {
                return {
                    login: function (cb) {

                        window.localStorage.referer = window.location.href;

                        var login = function () {
                            window.location.href = $location.absUrl().split('#')[0] + '#?/login/telephone'
                        };
                        return login()
                    },
                    logOut: function (cb) {
                        window.localStorage.removeItem("appToken");
                        var exp = new Date();
                        exp.setTime(exp.getTime() - 1);
                        function setCookie(cname, cvalue, exdays) {
                            var d = new Date();
                            d.setTime(d.getTime() + (exdays*24*60*60*1000));
                            var expires = "expires="+d.toUTCString();
                            document.cookie = cname + "=" + cvalue + "; " + expires;
                        }
                        setCookie('appToken', "", -1);
                        window.localStorage.referer = $location.absUrl().split('#')[0];
                        console.log('登出成功')
                    },
                    appToken: function (cb) {

                        var login = function () {
                            window.location.href = $location.absUrl().split('#')[0] + '#?/login/telephone'
                        };

                        if (!!window.localStorage.appToken) {
                            return cb(window.localStorage.appToken)
                        } else {
                            window.localStorage.referer = window.location.href;
                            return login();
                        }

                    },
                    saveAppToken: function (appToken, cb) {
                        window.localStorage.appToken = appToken;
                        var exdate=new Date();
                        exdate.setDate(exdate.getDate()+30);
                        document.cookie = 'appToken=' +escape(appToken)+
                            (";expires="+exdate.toGMTString()) +(";path=/");
                        return cb(1);
                    },
                    jumpTo: function (url, title, cb) {
                        window.location.href = url;

                        var body = document.getElementsByTagName('body')[0];
                        document.title = title ? title : '美眉分期';
                        var iframe = document.createElement("iframe");
                        iframe.style.display = 'none';
                        iframe.setAttribute("src", "img/empty.png");

                        iframe.addEventListener('load', function () {
                            setTimeout(function () {
                                iframe.removeEventListener('load', function () {
                                    console.log('removed')
                                });
                                document.body.removeChild(iframe);
                            }, 0);
                        });
                        document.body.appendChild(iframe);

                        return cb;
                    },
                    jumpRootTo: function (url, title, cb) {
                        if (!myBridge) return;
                        return myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                'url': url,
                                'leftNavItems': [1],
                                'title': title,
                                'pop_to_root': 1
                            }
                        }, cb);
                    },
                    goBack: function (cb) {
                        history.go(-1);
                        if (typeof cb == 'function') {
                            return cb()
                        }
                    },
                    share: function (description, title, url, imageUrl, cb) {
                        wx.onMenuShareAppMessage({
                            title: title,
                            desc: description,
                            link: url,
                            imgUrl: imageUrl,
                            type: '',
                            dataUrl: '',
                            success: function () {
                                return cb()
                            },
                            cancel: function () {
                            }
                        });
                        wx.onMenuShareTimeline({
                            title: title,
                            link: url,
                            imgUrl: imageUrl,
                            success: function () {
                                return cb()
                            },
                            cancel: function () {
                            }
                        });
                    },
                    uploadImgFromCamera: function (cb) {
                        wx.chooseImage({
                            count: 1, // 默认9
                            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                            success: function (preRes) {
                                wx.uploadImage({
                                    localId: preRes.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                    isShowProgressTips: 1, // 默认为1，显示进度提示
                                    success: function (mediaRes) {
                                        return cb(preRes.localIds[0], mediaRes.serverId)
                                    },
                                    fail: function (res) {
                                        alert(JSON.stringify(res));
                                    }
                                });
                            },
                            fail: function (res) {
                                alert(JSON.stringify(res));
                            }
                        });
                    },
                    uploadImgFromAlbum: function (cb) {
                        wx.chooseImage({
                            count: 1, // 默认9
                            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                            sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                            success: function (preRes) {
                                wx.uploadImage({
                                    localId: preRes.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                    isShowProgressTips: 1, // 默认为1，显示进度提示
                                    success: function (mediaRes) {
                                        return cb(preRes.localIds[0], mediaRes.serverId)
                                    },
                                    fail: function (res) {
                                        alert(JSON.stringify(res));
                                    }
                                });
                            },
                            fail: function (res) {
                                alert(JSON.stringify(res));
                            }
                        });
                    },
                    uploadImgFromCameraOrAlbum: function (cb) {
                        wx.chooseImage({
                            count: 1, // 默认9
                            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                            success: function (preRes) {
                                wx.uploadImage({
                                    localId: preRes.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                    isShowProgressTips: 1, // 默认为1，显示进度提示
                                    success: function (mediaRes) {
                                        return cb(preRes.localIds[0], mediaRes.serverId)
                                    },
                                    fail: function (res) {
                                        alert(JSON.stringify(res));
                                    }
                                });
                            },
                            fail: function (res) {
                                alert(JSON.stringify(res));
                            }
                        });
                    },
                    getContacts: function (cb) {
                        myBridge.callHandler('sendMessageToApp', {
                            type: 13
                        }, cb)
                    },
                    realName: function (cb) {
                        window.localStorage.referer = window.location.href;

                        var realName = function () {
                            $location.url('/verify/real-name');
                        };

                        return realName();
                    },
                    weChatPay: function (res, cb) {
                        if (typeof WeixinJSBridge == "undefined") {
                            if (document.addEventListener) {
                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                            } else if (document.attachEvent) {
                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                            }
                        } else {
                            onBridgeReady();
                        }
                        function onBridgeReady() {
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                    "appId": (res.data.resPar.appId).toString(), // 公众号名称，由商户传入
                                    "timeStamp": (res.data.resPar.timeStamp).toString(), // 时间戳，自// 1970// 年以来的秒数
                                    "nonceStr": (res.data.resPar.nonceStr).toString(), // 随机串
                                    "package": (res.data.resPar.package).toString(),
                                    "signType": (res.data.resPar.signType).toString(), // 微信签名方式:
                                    "paySign": (res.data.resPar.sign).toString()
                                },
                                function (response) {
                                    return cb(response);
                                }
                            );
                        }
                    },
                    getCity: function (cb) {
                        var city = window.localStorage.cityName;
                        return cb(!!city ? city : '全国')
                    },
                    saveCity: function (res) {
                        window.localStorage.cityName = res;
                    },
                    getLocation: function () {

                    }
                }
            }])
    }
});