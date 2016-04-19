/**
 * Created by sheldon on 2016/4/18.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        app.register.controller('FirstPay', ['$scope',
            function ($scope) {
                $scope.goBack = function () {
                    window.history.back(-1);
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

                $scope.goToPay = function () {
                    if ($scope.payWay == 'alipay') {

                        //alipay
                        if (myBridge) {
                            myBridge.callHandler('sendMessage', {
                                type: 3, data: {
                                    'notify_url': 'www.baidu.com',
                                    'out_trade_no': '123',
                                    'subject': 'haha',
                                    'total_fee': 666
                                }
                            }, function (response) {
                                
                            });
                        }
                    } else if ($scope.payWay == 'wxpay') {
                        //wxpay
                        if (myBridge) {
                            myBridge.callHandler('sendMessage', {
                                type: 4, data: {
                                    'appid': 'mmfenqi',
                                    'partnerid': 'mmfenqi',
                                    'sign': '110119',
                                    'timestamp': 10912789237,
                                    'noncestr': 'okokok'
                                }
                            }, function (response) {

                            });
                        }
                    }
                }

            }])
    }
});