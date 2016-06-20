/**
 * Created by sheldon on 2016/4/19.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/orderService.js')(app);
        require('services/alipayService.js')(app);
        require('services/wxpayService.js')(app);
        app.register.controller('OrderDetailCtrl', ['$scope', '$location', 'OrderDetails', 'Alipay', 'Wxpay', 'CancelOrder',
            function ($scope, $location, OrderDetails, Alipay, Wxpay, CancelOrder) {


                //$scope.appToken = encodeURI('MMFQ:hfB4RC9zM80eD1ZbGaD84axUSr/eVHSjf2coCBqm+Sg7y7qP3cxXNrFPbOxmsf2R');
                //$scope.orderId = $location.search().orderId;
                //$scope.orderDetail = OrderDetails.query({
                //    orderId: 2171,
                //    appToken: $scope.appToken
                //});
                //
                //$scope.orderDetail.$promise.then(function (res) {
                //    if (res.result != 0) {
                //        Toast(res.msg, 3000);
                //        $scope.loadError = true;
                //    }
                //});


                if (myBridge) {
                    myBridge.callHandler('sendMessageToApp', {type: 8, data: {}}, function (response) {
                        $scope.$apply(function () {
                            $scope.appToken = response;
                            $scope.orderId = $location.search().orderId;
                            $scope.orderDetail = OrderDetails.query({
                                orderId: $scope.orderId,
                                appToken: $scope.appToken
                            });

                            $scope.orderDetail.$promise.then(function (res) {
                                if (res.result != 0) {
                                    Toast(res.msg, 3000);
                                    $scope.loadError = true;
                                    return
                                }

                                $scope.goToGoods = function () {
                                    if (myBridge) {
                                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/goods?goodsId=' + res.data.orderDetailResponse.goodsId);
                                        myBridge.callHandler('sendMessageToApp', {
                                            type: 2, data: {
                                                url: jumpUrl,
                                                leftNavItems: [1],
                                                title: '产品详情',
                                                rightNavItems: [0]
                                            }
                                        }, function (response) {
                                            //todo custom
                                        });
                                    }
                                };

                                $scope.goToInsurance = function () {
                                    if (myBridge) {
                                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/insurance/details?orderId=' + $scope.orderId);
                                        myBridge.callHandler('sendMessageToApp', {
                                            type: 2, data: {
                                                url: jumpUrl,
                                                leftNavItems: [1],
                                                title: '保险详情'
                                            }
                                        }, function (response) {
                                            //todo custom
                                        });
                                    }
                                };

                                $scope.goToServiceContact = function (x) {
                                    if (myBridge) {
                                        var jumpUrl = encodeURI(x);
                                        myBridge.callHandler('sendMessageToApp', {
                                            type: 2, data: {
                                                url: jumpUrl,
                                                leftNavItems: [1],
                                                title: '服务合同'
                                            }
                                        }, function (response) {
                                            //todo custom
                                        });
                                    }
                                };

                                $scope.goToLoanContact = function (x) {
                                    if (myBridge) {
                                        var jumpUrl = encodeURI(x);
                                        myBridge.callHandler('sendMessageToApp', {
                                            type: 2, data: {
                                                url: jumpUrl,
                                                leftNavItems: [1],
                                                title: '借款合同'
                                            }
                                        }, function (response) {
                                            //todo custom
                                        });
                                    }
                                };

                                $scope.goToBill = function () {
                                    if (myBridge) {
                                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/bill/detail?billId=' + res.data.orderDetailResponse.billId);
                                        myBridge.callHandler('sendMessageToApp', {
                                            type: 2, data: {
                                                url: jumpUrl,
                                                leftNavItems: [1],
                                                title: '账单详情'
                                            }
                                        }, function (response) {
                                            //todo custom
                                        });
                                    }
                                };

                                $scope.hideQrCodeImg = function () {
                                    document.getElementById('qrCodeDialog').style.display = 'none';
                                };

                                $scope.showQrCodeImg = function () {
                                    document.getElementById('qrCodeDialog').style.display = 'block';
                                };

                                $scope.goToPay = function () {
                                    if ($scope.payWay == 'alipay') {
                                        var alipay = Alipay.query({
                                            orderId: res.data.orderDetailResponse.orderId,
                                            downpayAmount: res.data.orderDetailResponse.downpay_amount
                                        });
                                        alipay.$promise.then(function (result) {
                                            console.log(result);
                                            //alipay
                                            if (myBridge) {
                                                myBridge.callHandler('sendMessageToApp', {
                                                    type: 3, data: {
                                                        'notify_url': result.data.notify_url,
                                                        'out_trade_no': result.data.out_trade_no,
                                                        'subject': result.data.subject,
                                                        'total_fee': result.data.total_fee
                                                    }
                                                }, function (response) {

                                                });
                                            }
                                        })
                                    } else if ($scope.payWay == 'wxpay') {
                                        var wxpay = Wxpay.query({
                                            orderId: res.data.orderDetailResponse.orderId,
                                            downpayAmount: res.data.orderDetailResponse.downpay_amount
                                        });
                                        wxpay.$promise.then(function (result) {
                                            console.log(result);
                                            //wxpay
                                            if (myBridge) {
                                                myBridge.callHandler('sendMessageToApp', {
                                                    type: 4, data: {
                                                        'appid': result.data.resPar.parameters.appid,
                                                        'partnerid': result.data.resPar.parameters.partnerid,
                                                        'sign': result.data.resPar.parameters.sign,
                                                        'timestamp': result.data.resPar.parameters.timestamp,
                                                        'noncestr': result.data.resPar.parameters.noncestr,
                                                        'prepayid': result.data.resPar.parameters.prepayid
                                                    }
                                                }, function (response) {
                                                });
                                            }
                                        })
                                    }
                                };

                                $scope.goToInform = function () {
                                    if (myBridge) {
                                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/order/inform?orderId=' + $scope.orderId);
                                        myBridge.callHandler('sendMessageToApp', {
                                            type: 2, data: {
                                                url: jumpUrl,
                                                leftNavItems: [1],
                                                title: '知情同意书',
                                            }
                                        }, function (response) {
                                            //todo custom
                                        });
                                    }
                                };

                                $scope.cancelOrder = function () {
                                    $scope.cancelOrder = CancelOrder.query({
                                        orderId: $scope.orderId,
                                        appToken: $scope.appToken
                                    });
                                    $scope.cancelOrder.$promise.then(function (res) {
                                        if (res.result == 0) {
                                            Toast('取消成功', 2000);
                                            location.reload();
                                        } else {
                                            Toast(res.msg, 2000);
                                        }
                                    }).catch(function (error) {
                                        Toast(error, 2000);
                                    })
                                };

                                $scope.showConfirm = function () {
                                    document.getElementById('confirmDialogContainer').style.display = 'block';
                                };

                                $scope.hideConfirm = function () {
                                    document.getElementById('confirmDialogContainer').style.display = 'none';
                                };

                                $scope.choosePayWay = function () {
                                    if (res.data.orderDetailResponse.downpay_amount > 0 || res.data.orderDetailResponse.insuranceBuyBool == true) {
                                        var choosePayWayContainer = document.getElementById('choosePayWayDialogContainer');
                                        choosePayWayContainer.style.display = 'block';
                                    } else {
                                        if (myBridge) {
                                            var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/pay/allCredit?orderId=' + res.data.orderDetailResponse.orderId + '&telephone=' + res.data.orderDetailResponse.telphone);
                                            myBridge.callHandler('sendMessageToApp', {
                                                type: 2, data: {
                                                    url: jumpUrl,
                                                    title: '信用额度支付',
                                                    leftNavItems: [1]
                                                }
                                            }, function (response) {
                                                //todo custom
                                            });
                                        }
                                    }
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

                            }).catch(function (error) {
                                Toast('服务器错误，请重新进入页面再试一次', 2000);
                                $scope.loadError = true;
                            });
                        });
                    })
                }

                //$scope.appToken = 'MMFQ:hfB4RC9zM80v4ZI5ANbXiVVKyivU3TTJIZnhZfqx5btQzwgzDUxlgdnqjQDPw85z';

                var checkedImgSrc = 'modules/pay/img/checked.png';
                var uncheckedImgSrc = 'modules/pay/img/unchecked.png';
                $scope.alipayImg = checkedImgSrc;
                $scope.wxpayImg = uncheckedImgSrc;
                $scope.payWay = 'alipay';

            }])
    }
});