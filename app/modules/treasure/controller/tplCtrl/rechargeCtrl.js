/**
 * Created by sheldon on 2016/5/30.
 */
define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/wxpayService.js')(app);
        require('services/alipayService.js')(app);
        app.register.controller('TreasureRechargeCtrl', ['$scope', 'Treasure', 'Wxpay', 'Alipay', '$location', 'Bridge',
            function ($scope, Treasure, Wxpay, Alipay, $location, Bridge) {

                console.log('recharge');
                $scope.baseUrl = $location.absUrl().split('#')[0];

                //$scope.channel = 0;//代表微信
                $scope.channel = 1;//代表支付宝
                $scope.type = 2;//代表一元夺宝

                $scope.setChannel = function (x) {
                    $scope.channel = Number(x);
                };

                $scope.targetUrl = $location.absUrl();

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

                Bridge.appToken(function (response) {
                    $scope.appToken = encodeURIComponent(response);

                    $scope.goToPay = function () {
                        console.log($scope.amount);
                        $scope.treasurePay = Treasure.treasurePay().save({
                            amount: $scope.amount,
                            channel: $scope.channel,
                            appToken: $scope.appToken
                        });

                        $scope.treasurePay.$promise.then(function (res) {
                            if (res.result == 0) {

                                if ($scope.channel == 1) {
                                    var alipay = Alipay.query({
                                        orderId: res.data.orderId,
                                        downpayAmount: res.data.amount,
                                        type: 2
                                    });
                                    alipay.$promise.then(function (res) {

                                        console.log(res);
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
                                            if (response == 0){
                                                Toast('支付成功')
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
                                        type: 2
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
                                            if (response == 0){
                                                Toast('支付成功')
                                            }
                                        });

                                    }).catch(function (error) {
                                        alert('服务器返回失败');
                                        console.log(error);
                                    })
                                }
                            } else {
                                Toast(res.msg)
                            }
                        }).catch(function (error) {
                            console.log(error);
                            Toast(error)
                        })

                    }

                })


            }])
    }
});
