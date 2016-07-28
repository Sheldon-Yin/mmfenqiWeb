/**
 * Created by sheldon on 2016/7/14.
 */
'use strict';
define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/bridgeService.js')(app);
        require('services/groupBuyService.js')(app);
        require('services/isRealNameService.js')(app);
        require('services/wxpayService.js')(app);
        app.register.controller('GroupBuyPayCtrl', ['$scope', '$location', 'Bridge', 'GroupBuy', 'IsRealName', 'Wxpay',
            function ($scope, $location, Bridge, GroupBuy, IsRealName, Wxpay) {

                $scope.channel = 0;//代表微信
                $scope.type = 2;//代表一元夺宝
                $scope.payAmount = $location.search().payAmount;

                $scope.goToPay = function () {
                    $scope.$root.loading = true;
                    Bridge.appToken(function (response) {
                        $scope.appToken = response;
                        IsRealName.get({
                            appToken: $scope.appToken
                        }).$promise.then(function (res) {
                            console.log(res);
                            if (res.result != 0) {
                                Toast(res.msg);
                                $scope.$root.loading = false;
                                return
                            }
                            if (res.data.isIdentityAuth == 1) {
                                var wxpay = Wxpay.query({
                                    orderName: $location.search().orderName,
                                    orderSn: $location.search().orderSn,
                                    downpayAmount: $location.search().payAmount,
                                    type: 5,
                                    appToken: $scope.appToken
                                });
                                wxpay.$promise.then(function (res) {
                                    if (res.result == 0) {
                                        myBridge.callHandler('sendMessageToApp', {
                                            type: 4, data: {
                                                'appid': res.data.resPar.parameters.appid,
                                                'partnerid': res.data.resPar.parameters.partnerid,
                                                'sign': res.data.resPar.parameters.sign,
                                                'timestamp': res.data.resPar.parameters.timestamp,
                                                'noncestr': res.data.resPar.parameters.noncestr,
                                                'prepayid': res.data.resPar.parameters.prepayid,
                                                'customer_action': 1
                                            }
                                        }, function (response) {
                                            $scope.$root.loading = false;
                                            if (response == 0) {
                                                Toast('支付成功,即将跳转');
                                                setTimeout(function () {
                                                    Bridge.jumpRootTo(encodeURI($location.absUrl().split('#')[0] + '#/groupbuy/mine'), '我的拼团')
                                                }, 1000)
                                            }
                                        });
                                    } else {
                                        $scope.$root.loading = false;
                                        Toast(res.msg);
                                        console.log(res)
                                    }
                                }).catch(function (error) {
                                    $scope.$root.loading = false;
                                    Toast('服务器返回失败');
                                    console.log(error);
                                })
                            } else if (res.data.isIdentityAuth == 3) {
                                $scope.$root.loading = false;
                                Toast('您的账号正在实名认证中，请耐心等候', 3000);
                            } else {
                                $scope.$root.loading = false;
                                myBridge.callHandler('sendMessageToApp', {
                                    type: 9,
                                    data: {}
                                }, function (response) {
                                    Toast('请耐心等待实名认证结果', 2000);
                                });
                            }
                        }).catch(function (error) {
                            $scope.$root.loading = false;
                            Toast(error, 2000);
                        });
                    })
                }

            }])
    }
});
