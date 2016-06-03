/**
 * Created by sheldon on 2016/5/30.
 */
define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        require('services/wxpayService.js')(app);
        require('services/treasureService.js')(app);
        app.register.controller('TreasureRechargeCtrl', ['$scope', 'Treasure', 'Wxpay', 'WeChat', '$location',
            function ($scope, Treasure, Wxpay, WeChat, $location) {

                console.log('recharge');
                $scope.channel = 0;//代表微信
                $scope.type = 2;//代表一元夺宝

                $scope.targetUrl = $location.absUrl();

                $scope.wxConfig = WeChat.query({
                    targetUrl: $scope.targetUrl.split('#')[0]
                });

                $scope.wxConfig.$promise.then(function (res) {
                    if (res.result == 0) {
                        wx.config({
                            debug: false,
                            appId: res.data.jsSDKConfig.appId,
                            timestamp: res.data.jsSDKConfig.timestamp,
                            nonceStr: res.data.jsSDKConfig.nonceStr,
                            signature: res.data.jsSDKConfig.signature,
                            jsApiList: [
                                'chooseWXPay'
                            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });

                        wx.ready(function () {
                            console.log('ready')
                        });
                        wx.error(function (res) {
                            console.log(res.errMsg);
                        });
                    } else {
                        Toast(res);
                    }
                }).catch(function (error) {
                    console.log(error)
                });


                $scope.setMoneyDiy = function () {
                    $scope.money = -1;
                };

                $scope.goToRecharge = function () {
                    if ($scope.money == undefined) {
                        $scope.amount = 0;
                    } else if ($scope.money == -1) {
                        $scope.amount = $scope.otherPrice;
                    } else {
                        $scope.amount = $scope.money
                    }

                    if ($scope.amount > 0) {
                        $scope.goToPay()
                    } else {
                        Toast('请选择正确的价格')
                    }
                };

                $scope.goToPay = function () {



                    console.log($scope.amount);
                    $scope.treasurePay = Treasure.treasurePay().save({
                        amount: $scope.amount,
                        channel: 0
                    });

                    $scope.treasurePay.$promise.then(function (res) {
                        console.log(res);
                        if (res.result == 0) {

                            if(!!res.data.url){
                                window.location.href = res.data.url;
                                return
                            }

                            $scope.order = res.data;

                            var wxpay = Wxpay.query({
                                orderName: $scope.order.orderName,
                                orderId: $scope.order.orderId,
                                downpayAmount: $scope.order.amount,
                                type: 2,
                                payType: 0
                            });

                            wxpay.$promise.then(function (res) {
                                //wx.chooseWXPay({
                                //    "appId": res.data.resPar.appId, // 公众号名称，由商户传入
                                //    "timeStamp": res.data.resPar.timeStamp, // 时间戳，自// 1970// 年以来的秒数
                                //    "nonceStr": res.data.resPar.nonceStr, // 随机串
                                //    "package": res.data.resPar.package,
                                //    "signType": res.data.resPar.signType, // 微信签名方式:
                                //    "paySign": res.data.resPar.sign,// 微信签名
                                //    success: function (res) {
                                //        // 支付成功后的回调函数
                                //    }
                                //});

                                function onBridgeReady() {
                                    WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest', {
                                            "appId": res.data.resPar.appId, // 公众号名称，由商户传入
                                            "timeStamp": res.data.resPar.timeStamp, // 时间戳，自// 1970// 年以来的秒数
                                            "nonceStr": res.data.resPar.nonceStr, // 随机串
                                            "package": res.data.resPar.package,
                                            "signType": res.data.resPar.signType, // 微信签名方式:
                                            "paySign": res.data.resPar.sign
                                        },
                                        function (res) {
                                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                                Toast('支付成功')
                                            } else if(res.err_msg == "get_brand_wcpay_request:cancel"){
                                                Toast('支付取消')
                                            } else{
                                                Toast('支付失败')
                                            }

                                        }
                                    );
                                }

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


                            }).catch(function (error) {
                                Toast('服务器返回失败');
                                console.log(error);
                            })

                        } else if (res.result == 1013) {
                            window.location.href = window.location.href = '/promote/toCredit';
                        } else {
                        }
                    }).catch(function (error) {
                        console.log(error);
                        Toast(error)
                    })
                }

            }])
    }
});
