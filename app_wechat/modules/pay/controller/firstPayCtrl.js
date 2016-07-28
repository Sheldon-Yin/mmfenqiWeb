/**
 * Created by sheldon on 2016/4/18.
 */

'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/orderService.js')(app);
        require('services/alipayService.js')(app);
        require('services/wxpayService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('FirstPayCtrl', ['$scope', 'OrderInfoForEnsure', '$location', 'Wxpay', 'Alipay','$rootScope','Bridge',
            function ($scope, OrderInfoForEnsure, $location, Wxpay, Alipay,$rootScope,Bridge) {

                $scope.order = $location.search();
                $scope.order.shoufuAmt = Number($scope.order.shoufuAmt);
                $scope.order.insuranceAmount = Number($scope.order.insuranceAmount);
                $scope.order.hrefPic = window.localStorage.hrefPic;
                console.log($scope.order);
                var checkedImgSrc = 'modules/pay/img/checked.png';
                var uncheckedImgSrc = 'modules/pay/img/unchecked.png';
                $scope.wxpayImg = checkedImgSrc;
                $scope.payWay = 'wxpay';

                Bridge.appToken(function (response) {
                    $scope.appToken = response;

                    $scope.goToPay = function () {
                        if ($scope.payWay == 'wxpay') {
                            if (!!$scope.order) {
                                var wxpay = Wxpay.query({
                                    orderId: $scope.order.orderId,
                                    downpayAmount: $scope.order.shoufuAmt,
                                    appToken: $scope.appToken,
                                    orderName: $scope.order.hotItemName,
                                    type: 0,
                                    payType: 0
                                });
                                wxpay.$promise.then(function (res) {
                                    console.log(res);
                                    if (res.result == 0) {
                                        Bridge.weChatPay(res, function (response) {
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
                                    alert('服务器返回失败');
                                    console.log(error);
                                })
                            }
                        }
                    };

                });

                $scope.choosePayWay = function () {
                    var choosePayWayContainer = document.getElementById('choosePayWayDialogContainer');
                    choosePayWayContainer.style.display = 'block';
                };

                $scope.closeChoosePayWayDialog = function () {
                    document.getElementById('choosePayWayDialogContainer').style.display = 'none';
                };

                $scope.goToServiceContact = function () {
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/contact/service'),'服务合同');
                };

                $scope.goToLoanContact = function () {
                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/contact/loan'),'借款合同');
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