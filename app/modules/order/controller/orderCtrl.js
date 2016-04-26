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
                    myBridge.callHandler('sendMessage', {type: 8, data: {}}, function (response) {
                        $scope.$apply(function () {
                            $scope.appToken = response;
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
                    if (res.result == 1) {
                        Toast(res.msg, 2000);
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


                $scope.goBack = function () {
                    window.history.go(-1);
                };

                $scope.showConfirm = function () {
                    if (myBridge) {
                        myBridge.callHandler('sendMessage', {type: 8, data: {}}, function (response) {
                            if (response.length > 0) {
                                document.getElementById('confirmDialogContainer').style.display = 'block';
                            } else {
                                //TODO
                            }
                        })
                    }
                    //document.getElementById('confirmDialogContainer').style.display = 'block';
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

                        document.getElementById('confirmDialogContainer').style.display = 'none';

                        $scope.ensure.$promise.then(function (res) {
                            if (res.result == 0) {
                                window.location.href = encodeURI('#/pay/allCredit?appToken=' + $scope.appToken + '&goodsId=' + $scope.info.goodsId +
                                    '&orderAmount=' + $scope.info.orderAmount + '&storeGoodsCombinationId=' + $scope.info.storeGoodsCombinationId +
                                    '&goodsNumber=1&shoufuId=' + $scope.selectedFirstRatio.shoufuId + '&configId=' + $scope.selectedConfigId + '&telephone='+res.data.goodsConfirmInfoResponse.telphone);
                            } else {
                                Toast(res.msg, 2000);
                            }
                        }).catch(function (error) {
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
                                window.location.href = encodeURI('#/pay/firstPay?appToken=' + $scope.appToken + '&goodsId=' + $scope.info.goodsId +
                                    '&orderAmount=' + $scope.info.orderAmount + '&storeGoodsCombinationId=' + $scope.info.storeGoodsCombinationId +
                                    '&goodsNumber=1&shoufuId=' + $scope.selectedFirstRatio.shoufuId + '&configId=' + $scope.selectedConfigId);
                            } else {
                                Toast(res.msg, 2000);
                            }
                        }).catch(function (error) {
                            Toast('服务器返回错误', 2000);
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