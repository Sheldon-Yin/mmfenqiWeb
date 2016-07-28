/**
 * Created by sheldon on 2016/4/19.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/orderService.js')(app);
        require('services/alipayService.js')(app);
        require('services/wxpayService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('OrderDetailCtrl', ['$scope', '$location', 'OrderDetails', 'Alipay', 'Wxpay', 'CancelOrder', 'Bridge',
            function ($scope, $location, OrderDetails, Alipay, Wxpay, CancelOrder, Bridge) {

                Bridge.appToken(function (response) {

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

                            Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/goods?goodsId=' + res.data.orderDetailResponse.goodsId), '产品详情')

                        };

                        $scope.goToInsurance = function () {

                            Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/insurance/details?orderId=' + $scope.orderId), '保险详情')

                        };

                        $scope.goToServiceContact = function (x) {

                            x = !!x ? x : encodeURI($location.absUrl().split('#')[0] + '#?/contact/service');

                            Bridge.jumpTo(encodeURI(x), '服务合同')

                        };

                        $scope.goToLoanContact = function (x) {

                            x = !!x ? x : encodeURI($location.absUrl().split('#')[0] + '#?/contact/loan');

                            Bridge.jumpTo(encodeURI(x), '借款合同')
                        };

                        $scope.goToBill = function () {
                            Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/bill/detail?billId=' + res.data.orderDetailResponse.billId), '账单详情')
                        };

                        $scope.hideQrCodeImg = function () {
                            document.getElementById('qrCodeDialog').style.display = 'none';
                        };

                        $scope.showQrCodeImg = function () {
                            document.getElementById('qrCodeDialog').style.display = 'block';
                        };

                        $scope.goToPay = function () {
                            if ($scope.payWay == 'wxpay') {
                                var wxpay = Wxpay.query({
                                    orderId: res.data.orderDetailResponse.orderId,
                                    downpayAmount: res.data.orderDetailResponse.downpay_amount,
                                    appToken: $scope.appToken,
                                    payType: 0,
                                    type: 0,
                                    orderName: res.data.orderDetailResponse.goodsDescription
                                });
                                wxpay.$promise.then(function (result) {
                                    console.log(result);
                                    //wxpay
                                    Bridge.weChatPay(result, function () {

                                    })
                                })
                            }
                        };

                        $scope.goToInform = function () {

                            Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/order/inform?orderId=' + $scope.orderId), '知情同意书')

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

                                Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/pay/allCredit?orderId=' + res.data.orderDetailResponse.orderId + '&telephone=' + res.data.orderDetailResponse.telphone), '信用额度支付')

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

                var checkedImgSrc = 'modules/pay/img/checked.png';
                var uncheckedImgSrc = 'modules/pay/img/unchecked.png';
                $scope.wxpayImg = checkedImgSrc;
                $scope.payWay = 'wxpay';

            }])
    }
});