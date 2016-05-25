/**
 * Created by sheldon on 2016/4/25.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/billService.js')(app);
        app.register.controller('BillDetailCtrl', ['$scope', '$location', 'BillDetail',
            function ($scope, $location, BillDetail) {
                //$scope.goBack = function () {
                //    if (myBridge) {
                //        myBridge.callHandler('sendMessage', {type: 1, data: {}}, function (response) {
                //            alert(response);
                //        })
                //    }
                //};

                $scope.selectedPrice = 0;

                if (myBridge) {
                    myBridge.callHandler('sendMessageToApp', {type: 8, data: {}}, function (response) {
                        $scope.$apply(function () {
                            $scope.appToken = encodeURI(response);
                            $scope.bill = BillDetail.query({
                                appToken: $scope.appToken,
                                billId: $location.search().billId
                            });
                            $scope.bill.$promise.then(function (res) {
                                if (res.result != 0) {
                                    Toast(res.msg, 3000);
                                    $scope.loadError = true;
                                    return
                                }
                                $scope.isSelectAll = false;
                                $scope.couldSelect = 0;
                                $scope.hasSelect = 0;
                                $scope.allMoney = 0;
                                $scope.repaymentPlanIds = [];
                                angular.forEach(res.data.billDetailResponse.repaymentList, function (each) {
                                    each.isChecked = false;
                                    if (each.repayment_status != 1) {
                                        $scope.couldSelect += 1;
                                        $scope.allMoney += each.repaymentAmount;
                                    }
                                });

                                $scope.refreshRepaymentPlanId = function () {
                                    $scope.repaymentPlanIds = [];

                                    angular.forEach(res.data.billDetailResponse.repaymentList, function (each) {
                                        if (each.repayment_status != 1 && each.isChecked == true) {
                                            $scope.repaymentPlanIds.push(each.repaymentPlanId)
                                        }
                                    });

                                    console.log($scope.repaymentPlanIds);
                                };

                                $scope.selectAll = function () {
                                    if ($scope.isSelectAll == false) {
                                        angular.forEach(res.data.billDetailResponse.repaymentList, function (each) {
                                            each.isChecked = true;
                                            $scope.isSelectAll = true;
                                            $scope.hasSelect = $scope.couldSelect;
                                            $scope.selectedPrice = $scope.allMoney;
                                        });
                                    } else {
                                        angular.forEach(res.data.billDetailResponse.repaymentList, function (each) {
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
                                        console.log(x);
                                        if (x.isChecked) {
                                            $scope.selectedPrice += x.repaymentAmount;
                                            $scope.hasSelect += 1;
                                            $scope.isSelectAll = ($scope.hasSelect == $scope.couldSelect);
                                        } else if (!x.isChecked) {
                                            $scope.selectedPrice -= x.repaymentAmount;
                                            $scope.hasSelect -= 1;
                                            $scope.isSelectAll = ($scope.hasSelect == $scope.couldSelect);
                                        }
                                        $scope.refreshRepaymentPlanId();
                                    }
                                };

                                $scope.goToPay = function () {
                                    if ($scope.repaymentPlanIds.length > 0) {
                                        if (myBridge) {
                                            var jumpUrl = encodeURI($location.absUrl().split('#')[0] + '#/bill/pay?repaymentPlanId=' + $scope.repaymentPlanIds);
                                            myBridge.callHandler('sendMessageToApp', {
                                                type: 2, data: {
                                                    url: jumpUrl,
                                                    leftNavItems: [1],
                                                    title: '账单还款'
                                                }
                                            }, function (response) {
                                                //todo custom
                                            });
                                        }
                                    } else {
                                        Toast('请选择要付款的项目', 2000);
                                    }
                                }
                            }).catch(function (error) {
                                $scope.loadError = true;
                            });
                        });
                    })
                }

                //$scope.appToken = 'MMFQ:hfB4RC9zM80v4ZI5ANbXiVVKyivU3TTJIZnhZfqx5btQzwgzDUxlgdnqjQDPw85z';


                //console.log($scope.bill);
            }])
    }
});