/**
 * Created by sheldon on 2016/4/25.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/billService.js')(app);
        require('services/alipayService.js')(app);
        require('services/wxpayService.js')(app);
        app.register.controller('BillPayCtrl', ['$scope', '$location', 'BillPay','Alipay','Wxpay',
            function ($scope, $location, BillPay,Alipay,Wxpay) {
                $scope.goBack = function () {
                    window.history.back(-1);
                };

                var checkedImgSrc = 'modules/pay/img/checked.png';
                var uncheckedImgSrc = 'modules/pay/img/unchecked.png';
                $scope.alipayImg = checkedImgSrc;
                $scope.wxpayImg = uncheckedImgSrc;
                $scope.payWay = 'alipay';

                $scope.setAliPay = function () {
                    $scope.alipayImg = checkedImgSrc;
                    $scope.wxpayImg = uncheckedImgSrc;

                };

                $scope.setWxPay = function () {
                    $scope.alipayImg = uncheckedImgSrc;
                    $scope.wxpayImg = checkedImgSrc;
                };


                if (myBridge) {
                    myBridge.callHandler('sendMessage', {type: 8, data: {}}, function (response) {
                        $scope.$apply(function () {
                            $scope.appToken = response;
                        });
                    })
                }
                //$scope.appToken = 'MMFQ:hfB4RC9zM80v4ZI5ANbXiVVKyivU3TTJIZnhZfqx5btQzwgzDUxlgdnqjQDPw85z';


                $scope.payment = BillPay.query({
                    appToken: $scope.appToken,
                    repaymentPlanId: $location.search().repaymentPlanId
                });

                $scope.payment.$promise.then(function (res) {
                    console.log(res);
                    $scope.goToPay = function () {

                        if(res.result!=0){
                            Toast(res.msg, 2000);
                            return;
                        }

                        if ($scope.payWay == 'alipay') {
                            var alipay = Alipay.query({
                                orderId: res.data.orderId,
                                downpayAmount: res.data.bill_amount
                            });
                            alipay.$promise.then(function (result) {
                                console.log(result);
                                //alipay
                                if (myBridge) {
                                    myBridge.callHandler('sendMessage', {
                                        type: 3, data: {
                                            'notify_url': result.notify_url,
                                            'out_trade_no': result.out_trade_no,
                                            'subject': result.subject,
                                            'total_fee': result.total_fee
                                        }
                                    }, function (response) {

                                    });
                                }
                            })
                        } else if ($scope.payWay == 'wxpay') {
                            var wxpay = Wxpay.query({
                                orderId: res.data.orderId,
                                downpayAmount: res.data.bill_amount
                            });
                            wxpay.$promise.then(function (result) {
                                console.log(result);
                                //wxpay
                                if (myBridge) {
                                    myBridge.callHandler('sendMessage', {
                                        type: 4, data: {
                                            'appid': result.resPar.parameters.appid,
                                            'partnerid': result.resPar.parameters.partnerid,
                                            'sign': result.resPar.parameters.sign,
                                            'timestamp': result.resPar.parameters.timestamp,
                                            'noncestr': result.resPar.parameters.noncestr
                                        }
                                    }, function (response) {
                                    });
                                }
                            })
                        }
                    };

                });


            }])
    }
});