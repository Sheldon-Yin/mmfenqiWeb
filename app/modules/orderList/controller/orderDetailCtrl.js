/**
 * Created by sheldon on 2016/4/19.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/orderService.js')(app);
        require('services/alipayService.js')(app);
        require('services/wxpayService.js')(app);
        app.register.controller('OrderDetailCtrl', ['$scope','$location','OrderDetails','Alipay','Wxpay','CancelOrder',
            function ($scope,$location,OrderDetails,Alipay,Wxpay,CancelOrder) {
                $scope.goBack = function () {
                    window.history.back(-1);
                };

                if (myBridge) {
                    myBridge.callHandler('sendMessage', {type: 8, data: {}}, function (response) {
                        $scope.$apply(function () {
                            $scope.appToken = response;
                        });
                    })
                }
                //$scope.appToken = 'MMFQ:hfB4RC9zM80v4ZI5ANbXiVVKyivU3TTJIZnhZfqx5btQzwgzDUxlgdnqjQDPw85z';
                $scope.orderId = $location.search().orderId;
                $scope.orderDetail = OrderDetails.query({
                    orderId: $scope.orderId,
                    appToken: $scope.appToken
                });

                $scope.orderDetail.$promise.then(function (res) {

                    console.log(res);

                    $scope.goToGoods = function () {
                        window.location.href = '#/goods?goodsId=' + res.data.goodsId;
                    };

                    $scope.goToBill = function () {
                        window.location.href = '#/bill/detail?billId='+ res.data.billId;
                    };

                    $scope.goToPay = function () {
                        if(res.result!=0){
                            Toast(res.msg, 2000);
                            return;
                        }

                        if ($scope.payWay == 'alipay') {
                            var alipay = Alipay.query({
                                orderId: res.data.orderDetailResponse.orderId,
                                downpayAmount: res.data.orderDetailResponse.downpay_amount
                            });
                            alipay.$promise.then(function (result) {
                                console.log(result);
                                //alipay
                                if (myBridge) {
                                    myBridge.callHandler('sendMessage', {
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
                                    myBridge.callHandler('sendMessage', {
                                        type: 4, data: {
                                            'appid': result.data.resPar.parameters.appid,
                                            'partnerid': result.data.resPar.parameters.partnerid,
                                            'sign': result.data.resPar.parameters.sign,
                                            'timestamp': result.data.resPar.parameters.timestamp,
                                            'noncestr': result.data.resPar.parameters.noncestr
                                        }
                                    }, function (response) {
                                    });
                                }
                            })
                        }
                    };

                    $scope.cancelOrder = function () {
                        $scope.cancelOrder = CancelOrder.query({
                            orderId: $scope.orderId,
                            appToken: $scope.appToken
                        });
                        $scope.cancelOrder.$promise.then(function (res) {
                            Toast(res.msg,2000);
                        }).catch(function (error) {
                            Toast('服务器暂时无法返回数据',2000);
                        })
                    };

                }).catch(function (error) {
                    Toast('服务器错误，请重新进入页面再试一次',2000);
                });


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

            }])
    }
});