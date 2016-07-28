/**
 * Created by sheldon on 2016/4/25.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/billService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('BillListCtrl', ['$scope', 'MyBillList', '$location', 'Bridge',
            function ($scope, MyBillList, $location, Bridge) {


                Bridge.appToken(function (response) {

                    $scope.appToken = response;
                    //Toast(response,3000);
                    $scope.bill = MyBillList.get({
                        appToken: $scope.appToken
                    });

                    $scope.bill.$promise.then(function (res) {
                        if (res.result == 0) {
                            Toast('获取成功', 3000);
                            $scope.isSelectAll = false;
                            $scope.couldSelect = 0;
                            $scope.hasSelect = 0;
                            $scope.allMoney = 0;
                            $scope.repaymentPlanIds = [];
                            angular.forEach(res.data.myBillResponse, function (each) {
                                each.isChecked = false;
                                if (each.repayment_status != 1) {
                                    $scope.couldSelect += 1;
                                    $scope.allMoney += each.payAmount;
                                }
                            });

                            $scope.refreshRepaymentPlanId = function () {
                                $scope.repaymentPlanIds = [];
                                angular.forEach(res.data.myBillResponse, function (each) {
                                    if (each.repayment_status != 1 && each.isChecked == true) {
                                        $scope.repaymentPlanIds.push(each.repaymentPlanId)
                                    }
                                });

                                console.log($scope.repaymentPlanIds);
                            };

                            $scope.selectAll = function () {
                                if ($scope.isSelectAll == false) {
                                    angular.forEach(res.data.myBillResponse, function (each) {
                                        each.isChecked = true;
                                        $scope.isSelectAll = true;
                                        $scope.hasSelect = $scope.couldSelect;
                                        $scope.selectedPrice = $scope.allMoney;
                                    });
                                } else {
                                    angular.forEach(res.data.myBillResponse, function (each) {
                                        each.isChecked = false;
                                        $scope.isSelectAll = false;
                                        $scope.hasSelect = 0;
                                        $scope.selectedPrice = 0;
                                    });
                                }
                                $scope.refreshRepaymentPlanId();
                            };

                            $scope.countPrice = function (x) {
                                if (x.repayment_status != 1) {
                                    Toast('2');
                                    if (x.isChecked) {
                                        $scope.selectedPrice += x.payAmount;
                                        Toast($scope.selectedPrice, 3000);
                                        Toast($scope.selectedPrice, 3000);
                                        $scope.hasSelect += 1;
                                        $scope.isSelectAll = ($scope.hasSelect == $scope.couldSelect);
                                    } else if (!x.isChecked) {
                                        $scope.selectedPrice -= x.payAmount;
                                        Toast($scope.selectedPrice, 3000);
                                        $scope.hasSelect -= 1;
                                        $scope.isSelectAll = ($scope.hasSelect == $scope.couldSelect);
                                    }
                                    $scope.refreshRepaymentPlanId();
                                }
                            };

                            $scope.goToPay = function () {
                                if ($scope.repaymentPlanIds.length > 0) {

                                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/bill/pay?repaymentPlanId=' + $scope.repaymentPlanIds), '账单还款')

                                } else {
                                    Toast('请选择要付款的项目', 2000);
                                }
                            }
                        } else {
                            Toast(res.msg, 3000);
                            $scope.loadError = true;
                        }

                    }).catch(function (error) {
                        Toast(error, 2000);
                        $scope.loadError = true;
                    });
                });

                $scope.selectedPrice = 0;

                $scope.goToBillDetails = function (x) {

                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/bill/detail?billId=' + x.billId), '账单详情')

                };

                $scope.goToBillRecord = function () {

                    Bridge.jumpTo(encodeURI($location.absUrl().split('#')[0] + '#?/bill/record'), '还款记录')

                };


                //if (myBridge) {
                //    myBridge.registerHandler('sendMessageToHTML', function (message, callback) {
                //        if (message == 10002) {
                //            var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#?/bill/record');
                //            myBridge.callHandler('sendMessageToApp', {
                //                type: 2, data: {
                //                    url: jumpUrl,
                //                    leftNavItems: [1],
                //                    title: '还款记录'
                //                }
                //            }, function (response) {
                //                //todo custom
                //            });
                //        }
                //    });
                //}


            }])
    }
});