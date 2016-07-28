/**
 * Created by sheldon on 2016/4/25.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/billService.js')(app);
        require('services/alipayService.js')(app);
        require('services/wxpayService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('BillPayCtrl', ['$scope', '$location', 'BillPay', 'Alipay', 'Wxpay', 'Bridge',
            function ($scope, $location, BillPay, Alipay, Wxpay, Bridge) {
                //$scope.goBack = function () {
                //    if (myBridge) {
                //        myBridge.callHandler('sendMessage', {type: 1, data: {}}, function (response) {
                //            alert(response);
                //        })
                //    }
                //};

                var checkedImgSrc = 'modules/pay/img/checked.png';
                var uncheckedImgSrc = 'modules/pay/img/unchecked.png';
                $scope.wxpayImg = checkedImgSrc;
                $scope.payWay = 'wxpay';

                $scope.setAliPay = function () {
                    $scope.alipayImg = checkedImgSrc;
                    $scope.wxpayImg = uncheckedImgSrc;

                };

                $scope.setWxPay = function () {
                    $scope.alipayImg = uncheckedImgSrc;
                    $scope.wxpayImg = checkedImgSrc;
                };


                Bridge.appToken(function (response) {

                    $scope.appToken = response;
                    $scope.payment = BillPay.query({
                        appToken: $scope.appToken,
                        repaymentPlanId: $location.search().repaymentPlanId
                    });
                    $scope.payment.$promise.then(function (res) {
                        if (res.result != 0) {
                            Toast(res.msg, 3000);
                            $scope.loadError = true;
                            return
                        }
                        console.log(res);
                        $scope.goToPay = function () {
                            if ($scope.payWay == 'wxpay') {
                                var wxpay = Wxpay.query({
                                    orderId: res.data.orderId,
                                    downpayAmount: res.data.bill_amount,
                                    type: 1,
                                    payType: 0,
                                    orderName: '美眉分期还款',
                                    appToken: $scope.appToken
                                });
                                wxpay.$promise.then(function (result) {
                                    //wxpay
                                    if (result.result == 0) {
                                        Bridge.weChatPay(result, function (response) {
                                            if (response.err_msg == "get_brand_wcpay_request:ok") {
                                                Toast('支付成功');
                                                window.localStorage.appStatus = 3;
                                                Bridge.jumpTo($location.absUrl().split('#')[0])
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
                                    Toast(error);
                                });
                            }
                        };

                    }).catch(function (error) {
                        Toast('没有返回数据', 2000);
                        $scope.loadError = true;
                    });

                });

            }])
    }
});