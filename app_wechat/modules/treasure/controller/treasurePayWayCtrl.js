/**
 * Created by sheldon on 2016/6/7.
 */
define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/treasureService.js')(app);
        require('services/weChatService.js')(app);
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
                                                Bridge.jumpTo($scope.baseUrl + '#?/treasure/treasure-record', '夺宝记录')
                                            }, 1000)
                                        } else {
                                            if ($scope.channel == 0) {
                                                var wxpay = Wxpay.query({
                                                    orderId: res.data.orderId,
                                                    downpayAmount: res.data.amount,
                                                    appToken: $scope.appToken,
                                                    orderName: '一元夺宝',
                                                    type: 3,
                                                    payType: 0
                                                });
                                                wxpay.$promise.then(function (res) {
                                                    console.log(res);
                                                    if (res.result == 0) {
                                                        Bridge.weChatPay(res, function (response) {
                                                            if (response.err_msg == "get_brand_wcpay_request:ok") {
                                                                Toast('支付成功，即将跳转');
                                                                setTimeout(function () {
                                                                    Bridge.jumpTo($scope.baseUrl + '#?/treasure/treasure-record', '夺宝记录')
                                                                }, 1000)
                                                            } else if (response.err_msg == "get_brand_wcpay_request:cancel") {
                                                                Toast('支付取消')
                                                            } else {
                                                                Toast('支付失败')
                                                            }
                                                        })
                                                    } else {
                                                        Toast(res.msg)
                                                    }
                                                }).catch(function (error) {
                                                    alert('服务器返回失败');
                                                    console.log(error);
                                                });
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