/**
 * Created by sheldon on 2016/4/18.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/orderService.js')(app);
        app.register.controller('OrderCtrl', ['$scope', '$location', 'CreateOrder', 'OrderInfoForEnsure',
            function ($scope, $location, CreateOrder, OrderInfoForEnsure) {

               if (myBridge) {
                    myBridge.callHandler('sendMessageToApp', {type: 8, data: {}}, function (response) {
                        $scope.$apply(function () {
                            $scope.appToken = encodeURI(response);
                            $scope.info = $location.search();
                            console.log($scope.info);
                            $scope.orderInfo = CreateOrder.get(
                                {
                                    goodsId: $scope.info.goodsId,
                                    appToken: $scope.appToken,
                                    storeGoodsCombinationId: $scope.info.storeGoodsCombinationId,
                                    customProjectId: $scope.info.customProjectId
                                }
                            );
                            console.log($scope.orderInfo);
                            $scope.orderInfo.$promise.then(function (res) {
                                if (res.result != 0){
                                    Toast(res.msg,3000);
                                    $scope.loadError = true;
                                } else {
                                    $scope.firstRatio = res.data.goodsStagingInfoResponse.fenqiShowfuInfoList;
                                    $scope.stages = res.data.goodsStagingInfoResponse.fenqiConfigList;
                                    $scope.mmfenqiMode = res.data.goodsStagingInfoResponse.fenqiObj;
                                    $scope.insuranceAmount = res.data.goodsStagingInfoResponse.insuranceAmountList;
                                    $scope.customProjectId = res.data.goodsStagingInfoResponse.customProjectId;
                                    $scope.selectedFirstRatio = $scope.firstRatio[0];
                                    $scope.stages[0].isSelectedStage = true;
                                    $scope.insuranceAmount[0].isSelectedInsurance = true;
                                    $scope.selectedConfigId = $scope.stages[0].configId;
                                    $scope.selectedStage = ($scope.selectedFirstRatio.shoufuId == 100) ? 0 : $scope.stages[0].staging;
                                    $scope.selectedInsurance = $scope.insuranceAmount[0].price;
                                    $scope.isInsuranceBuy = false;
                                    $scope.getFenqiMode();
                                }
                            }).catch(function (error) {
                                Toast('服务器返回错误', 2000);
                                $scope.loadError = true;
                            });
                        });
                    })
                }

                $scope.total = Number($scope.isInsuranceBuy?$scope.selectedInsurance:0) + Number($location.search().orderAmount);

                $scope.getFenqiMode = function () {
                    angular.forEach($scope.mmfenqiMode, function (each) {
                        if ($scope.selectedStage == 0 && $scope.selectedFirstRatio.ratio != 100){
                            $scope.selectedStage = $scope.stages[0].staging;
                        }
                        if (each.paymentId == $scope.selectedStage && each.shoufuId == $scope.selectedFirstRatio.ratio) {
                            $scope.selectedMode = each;
                            if ($scope.selectedMode.shoufuId == 100){
                                $scope.selectedStage = 0;
                            }
                            console.log($scope.selectedMode);
                            console.log(($scope.selectedMode.shoufuId==100));
                        }
                    })
                };

                //$scope.goBack = function () {
                //    window.history.go(-1);
                //};

                $scope.showConfirm = function () {
                    if (myBridge) {
                        myBridge.callHandler('sendMessageToApp', {type: 8, data: {}}, function (response) {
                            if (response.length > 0) {
                                document.getElementById('confirmDialogContainer').style.display = 'block';
                            } else {
                                //TODO
                            }
                        })
                    }
                };
                
                $scope.goToInsuranceIntroduce = function () {
                    if (myBridge) {
                        var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/insurance/introduce');
                        myBridge.callHandler('sendMessageToApp', {
                            type: 2, data: {
                                url: jumpUrl,
                                title: '保险说明',
                                leftNavItems: [1]
                            }
                        }, function (response) {
                            //todo custom
                        });
                    }
                };

                $scope.goToPay = function () {
                    if ($scope.selectedFirstRatio.ratio == 0 && $scope.isInsuranceBuy == false) {

                        $scope.ensure = OrderInfoForEnsure.query({
                            appToken: $scope.appToken,
                            goodsId: $scope.info.goodsId,
                            orderAmount: $scope.info.orderAmount,
                            shoufuId: $scope.selectedFirstRatio.shoufuId,
                            configId: $scope.selectedConfigId,
                            storeGoodsCombinationId: $scope.info.storeGoodsCombinationId,
                            goodsNumber: 1,
                            isInsuranceBuy: $scope.isInsuranceBuy,
                            insuranceAmount: $scope.isInsuranceBuy ? $scope.selectedInsurance : 0,
                            customProjectId: $scope.customProjectId
                        });

                        $scope.ensure.$promise.then(function (res) {
                            document.getElementById('confirmDialogContainer').style.display = 'none';
                            if (res.result == 0) {
                                if (myBridge) {
                                    var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/pay/allCredit?orderId='+res.data.goodsConfirmOrderResponse.orderId+'&telephone='+res.data.goodsConfirmOrderResponse.userInfo.telephone);
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
                            } else {
                                Toast(res.msg, 2000);
                            }
                        }).catch(function (error) {
                            document.getElementById('confirmDialogContainer').style.display = 'none';
                            Toast('服务器返回错误', 2000);
                            $scope.loadError = true;
                        });

                    } else {

                        $scope.ensure = OrderInfoForEnsure.query({
                            appToken: $scope.appToken,
                            goodsId: $scope.info.goodsId,
                            orderAmount: $scope.info.orderAmount,
                            shoufuId: $scope.selectedFirstRatio.shoufuId,
                            configId: $scope.selectedConfigId,
                            storeGoodsCombinationId: $scope.info.storeGoodsCombinationId,
                            goodsNumber: 1,
                            isInsuranceBuy: $scope.isInsuranceBuy,
                            insuranceAmount: $scope.isInsuranceBuy ? $scope.selectedInsurance : 0,
                            customProjectId: $scope.customProjectId
                        });

                        document.getElementById('confirmDialogContainer').style.display = 'none';

                        $scope.ensure.$promise.then(function (res) {
                            if (res.result == 0) {
                                var response = res.data.goodsConfirmOrderResponse;
                                if (myBridge) {
                                    var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/pay/firstPay?realName='+response.userInfo.realName+'&telephone='+response.userInfo.telephone+
                                        '&hrefPic='+response.goodsItem.hrefPic+'&hotItemName='+response.goodsItem.hotItemName+'&presentPrice='+response.goodsItem.presentPrice+
                                        '&shoufuAmt='+response.fenqi.shoufuAmt+'&monthPay='+response.fenqi.monthPay+'&totalAmount='+response.fenqi.totalAmount+'&staging='+response.fenqi.staging+
                                        '&orderId='+response.orderId+'&orderAmount='+response.orderAmount+'&creditPayment='+response.creditPayment+'&insuranceAmount='+($scope.isInsuranceBuy ? $scope.selectedInsurance : 0) );
                                    myBridge.callHandler('sendMessageToApp', {
                                        type: 2, data: {
                                            url: jumpUrl,
                                            title: '订单支付',
                                            leftNavItems: [1]
                                        }
                                    }, function (response) {
                                        //todo custom
                                    });
                                }
                            } else {
                                Toast(res.msg, 2000);
                            }
                        }).catch(function (error) {
                            Toast('服务器返回错误', 2000);
                            $scope.loadError = true;
                        });
                    }
                };

                $scope.updateStage = function (x) {
                    angular.forEach($scope.stages, function (each) {
                        if (x.staging == each.staging) {
                            each.isSelectedStage = true;
                            $scope.selectedConfigId = each.configId;
                            $scope.selectedStage = each.staging;
                            $scope.getFenqiMode();
                        } else {
                            each.isSelectedStage = false;
                        }
                    });
                };

                $scope.updateInsurance = function (x) {
                    angular.forEach($scope.insuranceAmount, function (each) {
                        if (x.price == each.price) {
                            each.isSelectedInsurance = true;
                            $scope.selectedInsurance = each.price;
                            $scope.total = Number($scope.isInsuranceBuy?$scope.selectedInsurance:0) + Number($location.search().orderAmount);
                        } else {
                            each.isSelectedInsurance = false;
                        }
                    });
                };

                $scope.updateTotal = function () {
                    $scope.total = Number($scope.isInsuranceBuy?$scope.selectedInsurance:0) + Number($location.search().orderAmount);
                };

                ////与优惠券选择页面交互
                //$scope.iframeWindow = document.getElementById("ii").contentWindow;
                ////setInterval(function () {
                ////    console.log($scope.coupon.scope.test)
                ////},1000);
                //var subIframe = document.getElementById("ii");
                //subIframe. onload = subIframe. onreadystatechange = iframeload;
                //subIframe.src = '#/coupon';
                //$scope.couponBtn = '不使用优惠券';
                //
                //function iframeload() {
                //    if (!subIframe.readyState || subIframe.readyState == "complete") {
                //        setTimeout(function () {
                //            $scope.iframeWindow.scope.$watch('couponInput', function(newValue, oldValue) {
                //                console.log(newValue);
                //                $scope.couponPrice = newValue;
                //                if (!!newValue){
                //                    $scope.$apply(function () {
                //                        $scope.couponBtn = '优惠：' + newValue +'元';
                //                    });
                //                }
                //            });
                //        },1)
                //    }
                //}
                //
                //$scope.chooseCoupon = function () {
                //    $scope.isChooseCoupon = true;
                //};
                //
                //$scope.closeCoupon = function () {
                //    $scope.isChooseCoupon = false;
                //};
                //
                //$scope.setCoupon = function () {
                //    $scope.selectedCoupon = $scope.couponPrice;
                //    $scope.isChooseCoupon = false;
                //}

            }])
    }
});