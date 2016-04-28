/**
 * Created by sheldon on 2016/4/18.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/orderService.js')(app);
        require('services/alipayService.js')(app);
        require('services/wxpayService.js')(app);
        app.register.controller('FirstPay', ['$scope', 'OrderInfoForEnsure', '$location', 'Wxpay', 'Alipay',
            function ($scope, OrderInfoForEnsure, $location, Wxpay, Alipay) {
                $scope.goBack = function () {
                    window.history.back(-1);
                };

                $scope.order = $location.search();
                console.log($scope.order);

                $scope.goToPay = function () {
                    if ($scope.payWay == 'alipay') {
                        if (!!$scope.order) {
                            var alipay = Alipay.query({
                                orderId: $scope.order.orderId,
                                downpayAmount: $scope.order.shoufuAmt,
                                type: 0
                            });
                            alipay.$promise.then(function (res) {
                                console.log(res);
                                //alipay
                                if (myBridge) {
                                    myBridge.callHandler('sendMessageToApp', {
                                        type: 3, data: {
                                            'notify_url': res.data.notify_url,
                                            'out_trade_no': res.data.out_trade_no,
                                            'subject': res.data.subject,
                                            'total_fee': res.data.total_fee
                                        }
                                    }, function (response) {
                                    });
                                }
                            }).catch(function (error) {
                                alert('服务器返回失败');
                                console.log(error);
                            })
                        }
                    } else if ($scope.payWay == 'wxpay') {
                        if (!!$scope.order) {
                            var wxpay = Wxpay.query({
                                orderId: $scope.order.orderId,
                                downpayAmount: $scope.order.shoufuAmt,
                                type: 0
                            });
                            wxpay.$promise.then(function (res) {
                                console.log(res);
                                //wxpay
                                if (myBridge) {
                                    myBridge.callHandler('sendMessageToApp', {
                                        type: 4, data: {
                                            'appid': res.data.resPar.parameters.appid,
                                            'partnerid': res.data.resPar.parameters.partnerid,
                                            'sign': res.data.resPar.parameters.sign,
                                            'timestamp': res.data.resPar.parameters.timestamp,
                                            'noncestr': res.data.resPar.parameters.noncestr,
                                            'prepayid': res.data.resPar.parameters.prepayid
                                        }
                                    }, function (response) {
                                    });
                                }
                            }).catch(function (error) {
                                alert('服务器返回失败');
                                console.log(error);
                            })
                        }
                    }
                };

                var checkedImgSrc = 'modules/pay/img/checked.png';
                var uncheckedImgSrc = 'modules/pay/img/unchecked.png';
                $scope.alipayImg = checkedImgSrc;
                $scope.wxpayImg = uncheckedImgSrc;
                $scope.payWay = 'alipay';

                $scope.choosePayWay = function () {
                    var choosePayWayContainer = document.getElementById('choosePayWayDialogContainer');
                    choosePayWayContainer.style.display = 'block';
                };

                $scope.closeChoosePayWayDialog = function () {
                    document.getElementById('choosePayWayDialogContainer').style.display = 'none';
                };

                $scope.setAliPay = function () {
                    $scope.alipayImg = checkedImgSrc;
                    $scope.wxpayImg = uncheckedImgSrc;

                };

                $scope.setWxPay = function () {
                    $scope.alipayImg = uncheckedImgSrc;
                    $scope.wxpayImg = checkedImgSrc;
                };

            }
        ])
    }
})
;