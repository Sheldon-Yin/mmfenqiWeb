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
                        });
                    })
                }

                //$scope.appToken = 'MMFQ:hfB4RC9zM80v4ZI5ANbXiVVKyivU3TTJIZnhZfqx5btQzwgzDUxlgdnqjQDPw85z';

                $scope.info = $location.search();
                console.log($scope.info);
                $scope.orderInfo = CreateOrder.get(
                    $scope.info
                );
                $scope.total = $location.search().orderAmount;

                $scope.getFenqiMode = function () {
                    angular.forEach($scope.mmfenqiMode, function (each) {
                        if (each.paymentId == $scope.selectedStage && each.shoufuId == $scope.selectedFirstRatio.ratio) {
                            $scope.selectedMode = each;
                        }
                    })
                };

                console.log($scope.orderInfo);
                $scope.orderInfo.$promise.then(function (res) {
                    if (res.result != 0){
                        Toast(response.msg,3000);
                        $scope.loadError = true;
                    } else {
                        $scope.firstRatio = res.data.goodsStagingInfoResponse.fenqiShowfuInfoList;
                        $scope.stages = res.data.goodsStagingInfoResponse.fenqiConfigList;
                        $scope.mmfenqiMode = res.data.goodsStagingInfoResponse.fenqiObj;
                        $scope.selectedFirstRatio = $scope.firstRatio[0];
                        $scope.stages[0].isSelectedStage = true;
                        $scope.selectedStage = $scope.stages[0].staging;
                        $scope.selectedConfigId = $scope.stages[0].configId;
                        $scope.getFenqiMode();
                    }
                });

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

                $scope.goToPay = function () {
                    if ($scope.selectedFirstRatio.ratio == 0) {

                        $scope.ensure = OrderInfoForEnsure.query({
                            appToken: $scope.appToken,
                            goodsId: $scope.info.goodsId,
                            orderAmount: $scope.info.orderAmount,
                            shoufuId: $scope.selectedFirstRatio.shoufuId,
                            configId: $scope.selectedConfigId,
                            storeGoodsCombinationId: $scope.info.storeGoodsCombinationId,
                            goodsNumber: 1
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
                        });

                    } else if ($scope.selectedFirstRatio.ratio != 0) {

                        $scope.ensure = OrderInfoForEnsure.query({
                            appToken: $scope.appToken,
                            goodsId: $scope.info.goodsId,
                            orderAmount: $scope.info.orderAmount,
                            shoufuId: $scope.selectedFirstRatio.shoufuId,
                            configId: $scope.selectedConfigId,
                            storeGoodsCombinationId: $scope.info.storeGoodsCombinationId,
                            goodsNumber: 1
                        });

                        document.getElementById('confirmDialogContainer').style.display = 'none';

                        $scope.ensure.$promise.then(function (res) {
                            if (res.result == 0) {
                                var response = res.data.goodsConfirmOrderResponse;
                                if (myBridge) {
                                    var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/pay/firstPay?realName='+response.userInfo.realName+'&telephone='+response.userInfo.telephone+
                                        '&hrefPic='+response.goodsItem.hrefPic+'&hotItemName='+response.goodsItem.hotItemName+'&presentPrice='+response.goodsItem.presentPrice+
                                        '&shoufuAmt='+response.fenqi.shoufuAmt+'&monthPay='+response.fenqi.monthPay+'&totalAmount='+response.fenqi.totalAmount+'&staging='+response.fenqi.staging+
                                        '&orderId='+response.orderId+'&orderAmount='+response.orderAmount+'&creditPayment='+response.creditPayment);
                                    myBridge.callHandler('sendMessageToApp', {
                                        type: 2, data: {
                                            url: jumpUrl,
                                            title: '订单首付',
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
                            $scope.selectedStage = each.staging;
                            $scope.selectedConfigId = each.configId;
                            $scope.getFenqiMode();
                        } else {
                            each.isSelectedStage = false;
                        }
                    });
                }

            }])
    }
});