/**
 * Created by sheldon on 2016/5/30.
 */
define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/weChatService.js')(app);
        require('services/wxpayService.js')(app);
        require('services/treasureService.js')(app);
        app.register.controller('TreasureRechargeCtrl', ['$scope', 'Treasure', 'Wxpay', 'WeChat', '$location', 'Bridge',
            function ($scope, Treasure, Wxpay, WeChat, $location, Bridge) {

                console.log('recharge');
                $scope.channel = 0;//代表微信
                $scope.type = 2;//代表一元夺宝

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

                $scope.goToPay = function () {


                    console.log($scope.amount);
                    $scope.treasurePay = Treasure.treasurePay().save({
                        amount: $scope.amount,
                        channel: 0
                    });

                    $scope.treasurePay.$promise.then(function (res) {
                        console.log(res);
                        if (res.result == 0) {

                            if (!!res.data.url) {
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

                                if (res.result == 0) {
                                    Bridge.weChatPay(res, function (response) {
                                        if (response.err_msg == "get_brand_wcpay_request:ok") {
                                            Toast('支付成功')
                                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                                            Toast('支付取消')
                                        } else {
                                            Toast('支付失败')
                                        }
                                    })
                                } else {
                                    Toast(res.msg)
                                }

                            }).catch(function (error) {
                                Toast('服务器返回失败');
                                console.log(error);
                            })

                        } else if (res.result == 1013) {
                            Bridge.login();
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
