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
                //$scope.goBack = function () {
                //    if (myBridge) {
                //        myBridge.callHandler('sendMessage', {type: 1, data: {}}, function (response) {
                //            alert(response);
                //        })
                //    }
                //};

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
                    myBridge.callHandler('sendMessageToApp', {type: 8, data: {}}, function (response) {
                        $scope.$apply(function () {
                            $scope.appToken = encodeURIComponent(response);
                            $scope.payment = BillPay.query({
                                appToken: $scope.appToken,
                                repaymentPlanId: $location.search().repaymentPlanId
                            });
                            $scope.payment.$promise.then(function (res) {
                                if (res.result != 0){
                                    Toast(res.msg,3000);
                                    $scope.loadError = true;
                                    return
                                }
                                console.log(res);
                                $scope.goToPay = function () {
                                    if ($scope.payWay == 'alipay') {
                                        var alipay = Alipay.query({
                                            orderId: res.data.orderId,
                                            downpayAmount: res.data.bill_amount,
                                            type: 1
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
                                            orderId: res.data.orderId,
                                            downpayAmount: res.data.bill_amount,
                                            type: 1
                                        });
                                        wxpay.$promise.then(function (result) {
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
                                        }).catch(function (error) {
                                            Toast(error);
                                        });
                                    }
                                };

                            }).catch(function (error) {
                                Toast('没有返回数据',2000);
                                $scope.loadError = true;
                            });
                        });
                    })
                }
                //$scope.appToken = 'MMFQ:hfB4RC9zM80v4ZI5ANbXiVVKyivU3TTJIZnhZfqx5btQzwgzDUxlgdnqjQDPw85z';


            }])
    }
});