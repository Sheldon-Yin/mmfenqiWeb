/**
 * Created by sheldon on 2016/4/18.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/getOrderInfoForEnsureService.js')(app);
        require('services/alipayService.js')(app);
        require('services/wxpayService.js')(app);
        app.register.controller('FirstPay', ['$scope','getOrderInfoForEnsure','$location','Wxpay','Alipay',
            function ($scope,getOrderInfoForEnsure,$location,Wxpay,Alipay) {
                $scope.goBack = function () {
                    window.history.back(-1);
                };

                var data = $location.search();
                console.log(data);

                getOrderInfoForEnsure.query(data).$promise.then(function(res){
                    console.log(res);
                    if (res.result == 0){
                        $scope.order = res.data.goodsConfirmOrderResponse;
                    } else {
                        Toast(res.msg, 3000);
                    }
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

                $scope.goToPay = function () {
                    if ($scope.payWay == 'alipay') {
                        if (!!$scope.order){
                            var alipay = Alipay.query({
                                orderId: $scope.order.orderId,
                                downpayAmount: $scope.order.shoufuAmt
                            });
                            alipay.$promise.then(function(res){
                                console.log(res);
                                //alipay
                                if (myBridge) {
                                    myBridge.callHandler('sendMessage', {
                                        type: 3, data: {
                                            'notify_url': res.notify_url,
                                            'out_trade_no': res.out_trade_no,
                                            'subject': res.subject,
                                            'total_fee': res.total_fee
                                        }
                                    }, function (response) {

                                    });
                                }
                            })
                        }
                    } else if ($scope.payWay == 'wxpay') {

                        if (!!$scope.order){
                            var wxpay = Wxpay.query({
                                orderId: $scope.order.orderId,
                                downpayAmount: $scope.order.shoufuAmt
                            });
                            wxpay.$promise.then(function(res){
                                console.log(res);
                                //wxpay
                                if (myBridge) {
                                    myBridge.callHandler('sendMessage', {
                                        type: 4, data: {
                                            'appid': res.resPar.parameters.appid,
                                            'partnerid': res.resPar.parameters.partnerid,
                                            'sign': res.resPar.parameters.sign,
                                            'timestamp': res.resPar.parameters.timestamp,
                                            'noncestr': res.resPar.parameters.noncestr
                                        }
                                    }, function (response) {
                                    });
                                }
                            })
                        }


                    }

                }

            }])
    }
});