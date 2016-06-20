/**
 * Created by sheldon on 2016/6/7.
 */
define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/treasureService.js')(app);
        require('services/bridgeService.js')(app);
        require('services/wxpayService.js')(app);
        require('services/alipayService.js')(app);
        app.register.controller('TreasurePayWayCtrl', ['$scope', 'Treasure', 'Bridge', '$location', 'Wxpay', 'Alipay',
            function ($scope, Treasure, Bridge, $location, Wxpay, Alipay) {

                $scope.channel = 2;

                $scope.baseUrl = $location.absUrl().split('#')[0];

                $scope.setChannel = function (x) {
                    $scope.channel = x;
                };

                Bridge.appToken(function (response) {
                    $scope.appToken = response;

                    $scope.getPayInfo = Treasure.toPay().save({
                        appToken: $scope.appToken,
                        id: $location.search().id,
                        amount: $location.search().count,
                        count: $location.search().count
                    });

                    $scope.getPayInfo.$promise.then(function (res) {
                        if (res.result == 0) {

                            $scope.amount = res.data.amount;

                            $scope.goToPay = function () {
                                $scope.ensurePay = Treasure.ensurePay().save({
                                    appToken: $scope.appToken,
                                    sweepStakesId: res.data.sweepStakesId,
                                    amount: res.data.amount,
                                    count: res.data.count,
                                    channel: $scope.channel
                                });
                                $scope.ensurePay.$promise.then(function (res) {
                                    if (res.result == 0) {
                                        if ($scope.channel == 2) {

                                            Toast('支付成功，即将跳转');
                                            setTimeout(function () {
                                                Bridge.jumpRootTo($scope.baseUrl + '#/treasure', '一元夺宝')
                                            }, 1000)

                                        } else {
                                            if ($scope.channel == 1) {
                                                var alipay = Alipay.query({
                                                    orderId: res.data.orderId,
                                                    downpayAmount: res.data.amount,
                                                    type: 3
                                                });
                                                alipay.$promise.then(function (res) {

                                                    //alipay

                                                    myBridge.callHandler('sendMessageToApp', {
                                                        type: 3, data: {
                                                            'notify_url': res.data.notify_url,
                                                            'out_trade_no': res.data.out_trade_no,
                                                            'subject': res.data.subject,
                                                            'total_fee': res.data.total_fee,
                                                            'customer_action': 1
                                                        }
                                                    }, function (response) {
                                                        if (response == 0) {
                                                            Toast('支付成功，即将跳转');
                                                            setTimeout(function () {
                                                                Bridge.jumpRootTo($scope.baseUrl + '#/treasure', '一元夺宝')
                                                            }, 1000)
                                                        }
                                                    });

                                                }).catch(function (error) {
                                                    alert('服务器返回失败');
                                                    console.log(error);
                                                })
                                            } else if ($scope.channel == 0) {
                                                var wxpay = Wxpay.query({
                                                    orderId: res.data.orderId,
                                                    downpayAmount: res.data.amount,
                                                    type: 3
                                                });
                                                wxpay.$promise.then(function (res) {
                                                    //wxpay
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
                                                        if (response == 0) {
                                                            Toast('支付成功，即将跳转');
                                                            setTimeout(function () {
                                                                Bridge.jumpRootTo($scope.baseUrl + '#/treasure', '一元夺宝')
                                                            }, 1000)
                                                        }
                                                    });

                                                }).catch(function (error) {
                                                    alert('服务器返回失败');
                                                    console.log(error);
                                                })
                                            }
                                        }
                                    } else {
                                        Toast(res.msg)
                                    }
                                }).catch(function (error) {
                                    Toast(error)
                                })
                            }


                        } else {
                            Toast(res.msg)
                        }
                    }).catch(function (error) {
                        Toast(error)
                    })

                });

            }])
    }
});