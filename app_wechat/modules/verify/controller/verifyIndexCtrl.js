/**
 * Created by sheldon on 2016/5/23.
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function (app) {
        require('services/verifyService.js')(app);
        require('services/weChatService.js')(app);
        app.register.controller('VerifyIndexCtrl', ['$scope', '$location', 'Verify', 'WeChatTitle',
            function ($scope, $location, Verify, WeChatTitle) {

                WeChatTitle('我的信用额度');
                $scope.businessRemark = '电商信用授权';
                $scope.bankRemark = '银行流水认证';
                $scope.fastRemark = '信用信息审核';

                $scope.initStatus = function () {
                    $scope.queryVerifyStatus = Verify.queryVerifyStatus().query();
                    $scope.$root.loading = true;
                    $scope.queryVerifyStatus.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        console.log(res);
                        if (res.result == 0) {

                            $scope.zmStatus = res.data.zmCredit.creditStatus;
                            $scope.businessStatus = res.data.onlineRetailersCredit.creditStatus;
                            $scope.bankStatus = res.data.bankStatementCredit.creditStatus;
                            $scope.fastStatus = res.data.fastCredit.creditStatus;

                            if ($scope.businessStatus == 2) {
                                $scope.businessRemark = res.data.onlineRetailersCredit.remark;
                            }

                            if ($scope.bankStatus == 2) {
                                $scope.bankRemark = res.data.bankStatementCredit.remark;
                            }

                            if ($scope.fastStatus == 2) {
                                $scope.fastRemark = res.data.fastCredit.remark;
                            }

                            $scope.userType = res.data.userType;
                            $scope.realLoanMoney = res.data.realloanmoney;
                            $scope.availableMoney = res.data.availableMoney;

                            if($scope.userType == 0){
                                $scope.firstMoney = 8000;
                                $scope.secondMoney = 15000;
                                $scope.thirdMoney = 2000;
                                $scope.forthMoney = 5000;
                            }else if($scope.userType == 6){
                                $scope.firstMoney = 20000;
                                $scope.secondMoney = 20000;
                                $scope.thirdMoney = 5000;
                                $scope.forthMoney = 5000;
                            }
                        } else if (res.result == 1013) {
                            window.location.href = './#/login/telephone';
                        } else {
                            Toast(res.msg)
                        }
                        console.log(res)
                    }).catch(function (error) {
                        $scope.$root.loading = false;
                        console.log(error)
                    });
                };

                $scope.isRealName = Verify.isRealName().query();
                $scope.$root.loading = true;
                $scope.isRealName.$promise.then(function (res) {
                    $scope.$root.loading = false;
                    if (res.result == 0) {
                        $scope.realNameStatus = res.data.isIdentityAuth;
                        $scope.initStatus();
                    } else if (res.result == 1013) {
                        window.location.href = './#/login/telephone';
                    } else {
                        Toast(res.msg)
                    }
                    console.log(res);
                }).catch(function (error) {
                    $scope.$root.loading = false;
                    console.log(error)
                });

                $scope.goToZmVerify = function (x) {

                    if ($scope.fastStatus != '1' && $scope.fastStatus != '3') {
                        Toast('请先进行基础认证');
                        return
                    }

                    if (x == '1' || x == '3') return;

                    if ($scope.realNameStatus == 0 || $scope.realNameStatus == 2) {
                        $location.path('/verify/real-name');
                        return
                    }

                    $scope.zmUrl = Verify.zmVerifyUrl().save();
                    $scope.$root.loading = true;
                    $scope.zmUrl.$promise.then(function (res) {
                        $scope.$root.loading = false;
                        $scope.initStatus();
                        if (res.result == 0) {
                            Toast('获取成功');
                            if (!!res.data.url) {
                                window.location.href = res.data.url
                            } else {
                                $scope.initStatus();
                            }
                        } else if (res.result == 1013) {
                            window.location.href = './#/login/telephone';
                        } else {
                            Toast(res.msg)
                        }
                        console.log(res)
                    }).catch(function (error) {
                        $scope.$root.loading = false;
                        console.log(error)
                    });
                };

                $scope.goToFastVerify = function (x) {

                    if (x == '1' || x == '3') return;
                    if (!x){
                        return
                    }

                    if ($scope.realNameStatus == 0 || $scope.realNameStatus == 2) {
                        $location.path('/verify/real-name');
                        return
                    }

                    if ($scope.userType == 0){
                        $location.path('/verify/fast-student')
                    }else if ($scope.userType == 6){
                        $location.path('/verify/fast')
                    }


                };

                $scope.goToBankVerify = function (x) {

                    if ($scope.fastStatus != '1' && $scope.fastStatus != '3') {
                        Toast('请先进行基础认证');
                        return
                    }

                    if (x == '1' || x == '3') return;

                    if ($scope.realNameStatus == 0 || $scope.realNameStatus == 2) {
                        $location.path('/verify/real-name');
                        return
                    }

                    $location.path('/verify/bank')
                };

                $scope.goToTaobaoVerify = function (x) {

                    if ($scope.fastStatus != '1' && $scope.fastStatus != '3') {
                        Toast('请先进行基础认证');
                        return
                    }

                    if (x == '1' || x == '3') return;

                    if ($scope.realNameStatus == 0 || $scope.realNameStatus == 2) {
                        $location.path('/verify/real-name');
                        return
                    }

                    $location.path('/verify/taobao')
                }

            }])
    }
});